"""Exercise rollback against real Node/Caddy services in isolated local tenants."""
import hashlib
import json
import os
import shutil
import socket
import subprocess
import time
import uuid
from datetime import datetime,timezone
from pathlib import Path
import activate


def run(args):return subprocess.check_output(args,text=True).strip()


def main():
    stamp=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')+'-'+uuid.uuid4().hex[:8]
    base=Path('/opt/ruta-ci/rollback-tests')/stamp;base.mkdir(parents=True,exist_ok=False,mode=0o755)
    record={'status':'starting','at':stamp,'root':str(base),'scope':'Actual symlink changes, systemd restarts and HTTP identity checks using published packages in isolated tenants. No public rollback or successful Jenkins full-build publication is claimed.','cases':[],'units':[]}
    record['activate_sha256']=hashlib.sha256(Path(activate.__file__).read_bytes()).hexdigest()
    receipt=Path('/opt/ruta-ci/receipts')/('rollback-rehearsal-'+stamp+'.json')
    def save():activate.write_receipt(receipt,record)
    public=dict(activate.LINKS);record['production_before']={repo:str(path.resolve(strict=True)) for repo,path in public.items()}
    pairs={'rutatramite':(Path('/srv/tenants/slot2/releases/20260914T192535Z'),public['rutatramite'].resolve(strict=True)),
           'visionsetil':(Path('/opt/visionsetil/releases/frontend-6e6c774119790b3c98d36c7808242edc73d822a4/dist-app'),public['visionsetil'].resolve(strict=True))}
    ports={'rutatramite':18202,'visionsetil':18203};units={};originals={}
    save()
    try:
        if shutil.disk_usage('/').free<10*1024**3+600*1024**2:raise RuntimeError('Rehearsal requires disk reserve plus temporary runtime copies')
        for repository,(old_source,new_source) in pairs.items():
            with socket.socket() as probe:probe.bind(('127.0.0.1',ports[repository]))
            tenant=base/repository;releases=tenant/'releases';releases.mkdir(parents=True)
            for label,source in [('old',old_source),('new',new_source),('bad',new_source)]:
                # Hard links preserve space. The service reads these; runtime writes go to private copies.
                run(['cp','-al',str(source),str(releases/label)])
            originals[repository]={'old':activate.release_identity(repository,old_source),'new':activate.release_identity(repository,new_source)}
            assert originals[repository]['old']!=originals[repository]['new'],'The rehearsal needs two distinct published identities'
            if repository=='rutatramite':
                server=releases/'bad/server.js';server.unlink();server.write_text('process.exit(7);\n');server.chmod(0o644)
                originals['server_sha256']=hashlib.sha256((new_source/'server.js').read_bytes()).hexdigest()
            else:
                (releases/'bad/prerendered/core/home.html').unlink()
            link=tenant/'current';link.symlink_to(releases/'new')
            unit='ruta-ci-rollback-'+repository+'-'+stamp.lower();units[repository]=unit;record['units'].append(unit)
            properties=['[Unit]','Description=Isolated rollback rehearsal','[Service]','Type=exec','NoNewPrivileges=yes','PrivateTmp=yes','ProtectSystem=strict','ProtectHome=yes','MemoryMax=512M','CPUQuota=100%','TasksMax=256','RuntimeMaxSec=360','RuntimeDirectory='+unit,'WorkingDirectory='+str(tenant),'Environment=HOME=/run/'+unit,'InaccessiblePaths=-/srv/tenants -/opt/visionsetil -/opt/ruta-ci/secrets -/opt/ruta-ci/jenkins -/opt/ruta-ci/probe']
            if repository=='rutatramite':
                properties+=['User=slot2','Environment=HOSTNAME=127.0.0.1','Environment=PORT='+str(ports[repository]),'Environment=NODE_ENV=production','Environment=NODE_OPTIONS=--max-old-space-size=384','Environment=NEXT_PUBLIC_SITE_URL=https://rutatramite.com','Environment=METRICS_DB_PATH=/run/'+unit+'/metrics.sqlite','Environment=PREVIEW_RUNTIME_REPORT=/run/'+unit+'/runtime.json','ExecStart=/usr/bin/python3 /opt/ruta-ci/config/preview_runtime.py '+str(link)]
                activate.RESTART_UNITS[repository]=unit
            else:
                config=tenant/'caddy.json';config.write_text(json.dumps({'admin':{'disabled':True},'apps':{'http':{'servers':{'rehearsal':{'listen':['127.0.0.1:'+str(ports[repository])],'routes':[{'match':[{'path':['/']}],'handle':[{'handler':'rewrite','uri':'/prerendered/core/home.html'}]},{'handle':[{'handler':'file_server','root':str(link)}]}]}}}}}))
                properties+=['DynamicUser=yes','ExecStart=/usr/bin/caddy run --config '+str(config)]
            unit_file=Path('/run/systemd/system')/(unit+'.service');unit_file.write_text('\n'.join(properties)+'\n')
            activate.ROOTS[repository]=releases;activate.LINKS[repository]=link;activate.ORIGINS[repository]='http://127.0.0.1:'+str(ports[repository])
        save();run(['systemctl','daemon-reload'])
        for repository in pairs:
            run(['systemctl','start',units[repository]]);activate.health(repository)
            releases=activate.ROOTS[repository];link=activate.LINKS[repository]
            selection={'schema':'ruta-ci.activation.v2','status':'passed','action':'publish','sha':'a'*40,'digest':'b'*64,'active':str(releases/'new'),'previous':str(releases/'old'),'active_identity':originals[repository]['new'],'previous_identity':originals[repository]['old']}
            target=activate.rollback_target(repository,selection,'a'*40,'b'*64)
            activate.activate_release(repository,target,'rollback')
            assert link.resolve()==releases/'old';activate.health(repository)
            record['cases'].append({'repository':repository,'case':'real_rollback','passed':True,'served_identity':activate.release_identity(repository,link)});save()
            try:activate.rollback_target(repository,selection,'a'*40,'b'*64)
            except ValueError as error:
                assert 'Active release changed' in str(error)
            else:raise AssertionError('Stale rollback receipt was accepted')
            record['cases'].append({'repository':repository,'case':'stale_receipt_refused','passed':True});save()
            try:activate.activate_release(repository,releases/'bad','rollback')
            except (RuntimeError,subprocess.CalledProcessError):pass
            else:raise AssertionError('Broken release was accepted')
            assert link.resolve()==releases/'old';activate.health(repository)
            record['cases'].append({'repository':repository,'case':'automatic_recovery_after_real_service_failure','passed':True,'served_identity':activate.release_identity(repository,link)});save()
            run(['systemctl','stop',units[repository]])
        assert hashlib.sha256((pairs['rutatramite'][1]/'server.js').read_bytes()).hexdigest()==originals['server_sha256']
        for repo,(old,new) in pairs.items():
            assert activate.release_identity(repo,old)==originals[repo]['old'] and activate.release_identity(repo,new)==originals[repo]['new']
        record['status']='passed'
    except Exception as error:
        record.update(status='failed',error=type(error).__name__+': '+str(error));raise
    finally:
        record['services']={}
        for repository,unit in units.items():
            log=receipt.with_name(receipt.stem+'-'+repository+'.log');log.write_text(run(['journalctl','-u',unit,'--no-pager']))
            subprocess.run(['systemctl','stop',unit],capture_output=True,timeout=30)
            state=subprocess.run(['systemctl','is-active','--quiet',unit])
            stopped=state.returncode in [3,4];record['services'][repository]={'unit':unit,'stopped':stopped,'log':str(log)}
            if not stopped:record['status']='failed'
            if stopped:(Path('/run/systemd/system')/(unit+'.service')).unlink(missing_ok=True)
        run(['systemctl','daemon-reload'])
        record['production_after']={repo:str(path.resolve(strict=True)) for repo,path in public.items()}
        record['production_pointers_unchanged']=record['production_before']==record['production_after']
        record['finished_at']=datetime.now(timezone.utc).isoformat();save()
        if record['status']=='passed':
            assert base.resolve().parent==Path('/opt/ruta-ci/rollback-tests').resolve() and not base.is_symlink()
            shutil.rmtree(base);record['temporary_tenants_removed']=True;save()
    if record['status']!='passed':raise RuntimeError('Rehearsal did not finish successfully')
    print(json.dumps(dict(record,receipt=str(receipt))))


if __name__=='__main__':main()
