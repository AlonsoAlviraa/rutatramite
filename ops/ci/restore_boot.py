"""Boot a recovery pair in a networkless controller; never resume saved jobs."""
import argparse
import base64
import fcntl
import hashlib
import json
import os
import re
import shutil
import subprocess
import tarfile
import time
import urllib.parse
import uuid
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path
from jenkins_api import api

ROOT=Path('/opt/ruta-ci')


def command(args, **kwargs):
    return subprocess.check_output(args,text=True,**kwargs).strip()


def extract(archive, destination):
    with tarfile.open(archive) as package:package.extractall(destination,filter='data')


def digest(path):
    with path.open('rb') as source:return hashlib.file_digest(source,'sha256').hexdigest()


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('backup')
    args=parser.parse_args()
    if not re.fullmatch(r'\d{8}T\d{6}Z\.tar\.gz',args.backup):parser.error('Invalid backup filename')
    lock=open('/run/lock/ruta-ci-restore-test.lock','w');fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
    metadata=ROOT/'backups'/args.backup; recovery=ROOT/'secrets'/('recovery-'+args.backup)
    with tarfile.open(metadata) as package:required=sum(item.size for item in package)
    if shutil.disk_usage(ROOT).free<10*1024**3+required+200*1024**2:raise RuntimeError('Restore test would consume the disk reserve')
    stamp=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')+'-'+uuid.uuid4().hex[:8]
    name='ruta-ci-restore-'+stamp.lower(); base=ROOT/'restore-tests'/stamp
    base.mkdir(parents=True,mode=0o700,exist_ok=False)
    receipts=ROOT/'receipts';receipt=receipts/('restore-'+stamp+'.json')
    record={'status':'preparing','backup':args.backup,'metadata_sha256':digest(metadata),'recovery_sha256':digest(recovery),'container_name':name,'started_at':stamp,'scope':'Controller boot, restored jobs/plugins/account and key decryption. Saved builds/queue/agents quarantined in test copy; execution resumption is not tested.'}
    def save():receipt.write_text(json.dumps(record,indent=2))
    save();created=False
    try:
        extract(metadata,base);extract(recovery,base/'private')
        home=base/'jenkins';quarantine=base/'quarantine';quarantine.mkdir()
        shutil.copyfile(base/'private/jenkins-master.key',home/'secrets/master.key')
        expected=sorted(path.parent.name for path in (home/'jobs').glob('*/config.xml'))
        for path in list(home.glob('queue.xml*'))+[home/'org.jenkinsci.plugins.workflow.flow.FlowExecutionList.xml',home/'nodes',home/'init.groovy.d']:
            if path.exists():path.rename(quarantine/path.name)
        histories=quarantine/'builds';histories.mkdir()
        for path in (home/'jobs').glob('*/builds'):path.rename(histories/path.parent.name)
        for path in (home/'jobs').glob('*/config.xml'):
            tree=ET.parse(path);root=tree.getroot();disabled=root.find('disabled')
            if disabled is None:disabled=ET.SubElement(root,'disabled')
            disabled.text='true';tree.write(path,encoding='utf-8',xml_declaration=True)
        tree=ET.parse(home/'config.xml');tree.getroot().find('numExecutors').text='0';tree.write(home/'config.xml',encoding='utf-8',xml_declaration=True)
        validation=home/'.restore-validation';validation.mkdir()
        nonce='restore-proof-'+uuid.uuid4().hex
        key_id='jenkins.slaves.JnlpSlaveAgentProtocol.secret'
        assert (home/'secrets'/key_id).is_file(),'Challenge key must already exist in this backup'
        assert digest(home/'secrets'/key_id)==digest(ROOT/'jenkins/secrets'/key_id),'Backed-up challenge key differs from the live key'
        script='println groovy.json.JsonOutput.toJson(new jenkins.security.HMACConfidentialKey('+json.dumps(key_id)+').mac('+json.dumps(nonce)+'))'
        expected_mac=json.loads(api('scriptText',urllib.parse.urlencode({'script':script}).encode(),'application/x-www-form-urlencoded'))
        (validation/'key-proof.json').write_text(json.dumps({'nonce':nonce,'key_id':key_id,'expected_mac':expected_mac}))
        password=(base/'private/admin-password').read_text().strip()
        authorization=base64.b64encode(('mariano:'+password).encode()).decode()
        (validation/'http.conf').write_text('silent\nshow-error\nfail\ngloboff\nheader = "Authorization: Basic '+authorization+'"\n')
        init=home/'init.groovy.d';init.mkdir()
        (init/'99-restore-validation.groovy').write_text('''import jenkins.model.Jenkins
import groovy.json.JsonSlurper
import groovy.json.JsonOutput
def j=Jenkins.get()
j.setNumExecutors(0)
j.setSlaveAgentPort(-1)
j.doQuietDown()
def proof=new JsonSlurper().parse(new File(j.rootDir,'.restore-validation/key-proof.json'))
def report=[jobs:j.getAllItems(hudson.model.Job).collect{it.fullName}.sort(),failed_plugins:j.pluginManager.failedPlugins.collect{it.name},plugins:j.pluginManager.plugins.collectEntries{[(it.shortName):it.version]},master_key_decryption: new jenkins.security.HMACConfidentialKey(proof.key_id).checkMac(proof.nonce,proof.expected_mac),executors:j.numExecutors,agents:j.nodes.size(),quiet:j.isQuietingDown(),security_realm:j.securityRealm.class.name]
new File(j.rootDir,'.restore-validation/boot.json').text=JsonOutput.toJson(report)
''')
        for path in [home,*home.rglob('*')]:
            if not path.is_symlink():os.chown(path,1000,1000)
        image=command(['docker','image','inspect','ruta-ci-controller:20260914','--format','{{.Id}}'])
        record.update(status='starting',image=image,expected_jobs=expected);save()
        cid=command(['docker','create','--name',name,'--label','ruta-ci.restore='+stamp,'--network','none','--memory','1g','--cpus','0.75','--pids-limit','256','--cap-drop','ALL','--security-opt','no-new-privileges','--read-only','--tmpfs','/tmp:rw,nosuid,size=256m','--user','1000:1000','--mount','type=bind,source='+str(home)+',target=/var/jenkins_home','--env','JENKINS_HOME=/var/jenkins_home','--entrypoint','java',image,'-Djenkins.install.runSetupWizard=false','-Xms128m','-Xmx512m','-jar','/usr/share/jenkins/jenkins.war','--httpListenAddress=127.0.0.1','--httpPort=8080'])
        created=True;record['container_id']=cid;save();command(['docker','start',cid])
        deadline=time.monotonic()+240
        while time.monotonic()<deadline:
            if (validation/'boot.json').exists():break
            state=json.loads(command(['docker','inspect',cid]))[0]['State']
            if not state['Running']:raise RuntimeError('Restored controller stopped before boot validation')
            time.sleep(2)
        else:raise TimeoutError('Restored controller did not complete initialization')
        report=json.loads((validation/'boot.json').read_text())
        record['boot']=report;save()
        assert report['jobs']==expected and not report['failed_plugins'] and report['master_key_decryption']
        assert report['executors']==0 and report['agents']==0 and report['quiet']
        authenticated=None
        while time.monotonic()<deadline:
            result=subprocess.run(['docker','exec',cid,'curl','--config','/var/jenkins_home/.restore-validation/http.conf','http://127.0.0.1:8080/api/json?tree=jobs[name],quietingDown'],capture_output=True,text=True)
            if result.returncode==0:
                authenticated=json.loads(result.stdout);break
            time.sleep(2)
        assert authenticated is not None,'Restored admin authentication failed'
        assert sorted(job['name'] for job in authenticated['jobs'])==expected and authenticated['quietingDown']
        anonymous=command(['docker','exec',cid,'curl','-s','-o','/dev/null','-w','%{http_code}','http://127.0.0.1:8080/api/json'])
        assert anonymous in ['401','403'],'Anonymous access unexpectedly allowed'
        inspection=json.loads(command(['docker','inspect',cid]))[0]
        assert inspection['HostConfig']['NetworkMode']=='none' and not inspection['HostConfig']['PortBindings']
        assert len(inspection['Mounts'])==1 and inspection['Mounts'][0]['Source']==str(home)
        record.update(status='passed',boot=report,authenticated_http=True,anonymous_http_status=int(anonymous),network='none',published_ports=0)
    except Exception as error:
        record.update(status='failed',error=type(error).__name__+': '+str(error));raise
    finally:
        if created:
            logs=subprocess.run(['docker','logs',record['container_id']],capture_output=True,text=True)
            log=receipt.with_suffix('.log');log.write_text(logs.stdout+logs.stderr);log.chmod(0o600);record['log']=str(log)
            subprocess.run(['docker','stop','--time','20',record['container_id']],capture_output=True,timeout=35)
            state=json.loads(command(['docker','inspect',record['container_id']]))[0]
            record['stopped']=not state['State']['Running']
            if record['stopped']:
                assert state['Config']['Labels']['ruta-ci.restore']==stamp
                command(['docker','rm',record['container_id']]);record['container_removed']=True
            else:record['status']='failed'
        record['finished_at']=datetime.now(timezone.utc).isoformat();save()
        if record['status']=='passed' and record.get('container_removed'):
            assert base.resolve().parent==(ROOT/'restore-tests').resolve() and not base.is_symlink()
            shutil.rmtree(base);record['temporary_copy_removed']=True;save()
    if record['status']!='passed':raise RuntimeError('Restoration validation did not finish successfully; inspect receipt')
    print(json.dumps(dict(record,receipt=str(receipt))))


if __name__=='__main__':main()
