"""Prepare committed main sources on the PC and install them over pinned SSH."""
import argparse
import hashlib
import json
import re
import shlex
import subprocess
import uuid
from pathlib import Path
import probe_sources
import ssh_transport

ROOT=Path('C:/Users/Mariano/CI')
GH='C:/Program Files/GitHub CLI/gh.exe'


def main_sha():
    return subprocess.check_output([GH,'api','repos/AlonsoAlviraa/VisionSetil/commits/main','--jq','.sha'],text=True).strip()


def refresh(sha):
    if not re.fullmatch('[a-f0-9]{40}',sha) or main_sha()!=sha:raise ValueError('Probe source must match current GitHub main')
    repo=ROOT/'visionsetil'
    subprocess.run(['git','-C',str(repo),'fetch','origin','main'],check=True,capture_output=True)
    entries={}
    for entry in subprocess.check_output(['git','-C',str(repo),'ls-tree','-r','-z',sha]).split(b'\0'):
        if not entry:continue
        meta,path=entry.split(b'\t',1);mode,kind,oid=meta.split()
        if kind==b'blob':entries[path.decode()]={'mode':mode,'oid':oid.decode()}
    contents={}
    for name in probe_sources.selected(entries):
        if entries[name]['mode'] not in [b'100644',b'100755']:raise ValueError('Non-regular source input')
        contents[name]=subprocess.check_output(['git','-C',str(repo),'cat-file','blob',entries[name]['oid']])
    body=probe_sources.build(sha,contents);digest=hashlib.sha256(body).hexdigest()
    archive=ROOT/'archive/probe-sources'/('visionsetil-'+sha+'-'+digest+'.tar')
    archive.parent.mkdir(parents=True,exist_ok=True);archive.write_bytes(body)
    if main_sha()!=sha:raise RuntimeError('Main advanced while preparing sources; no switch made')
    client=ssh_transport.connect()
    try:
        remote='/opt/ruta-ci/incoming/probes-'+sha+'-'+uuid.uuid4().hex+'.tar'
        client.open_sftp().put(str(archive),remote)
        arguments=['sudo','python3','/opt/ruta-ci/config/probe_refresh.py','--archive',remote,'--sha',sha,'--digest',digest]
        _,stdout,stderr=client.exec_command(shlex.join(arguments))
        raw=stdout.read();error=stderr.read()
        if stdout.channel.recv_exit_status():raise RuntimeError('Probe source installation failed: '+error.decode()[:1000])
        receipt=json.loads(raw)
        receipt_path=archive.parent/('installed-'+Path(receipt['source']).name+'.json')
        with receipt_path.open('x',encoding='utf-8') as output:json.dump(receipt,output,indent=2)
        return receipt
    finally:client.close()


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--sha',required=True)
    print(json.dumps(refresh(parser.parse_args().sha)))
