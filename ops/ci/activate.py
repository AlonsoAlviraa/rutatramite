"""Activate an immutable CI package using the existing production activation paths."""
import argparse
import fcntl
import hashlib
import json
import os
import re
import shutil
import subprocess
import tarfile
import urllib.request
import uuid
from datetime import datetime, timezone
from pathlib import Path

ROOTS = {'rutatramite':Path('/srv/tenants/slot2/releases'), 'visionsetil':Path('/opt/visionsetil/releases')}
LINKS = {'rutatramite':Path('/srv/tenants/slot2/app'), 'visionsetil':Path('/opt/visionsetil/releases/current')}
ORIGINS = {'rutatramite':'https://rutatramite.com','visionsetil':'https://visionsetil.com'}
RESTART_UNITS = {'rutatramite':'slot2-app.service'}


def release_identity(repository, target):
    target=Path(target).resolve(strict=True)
    if repository=='rutatramite':
        value=(target/'.next/BUILD_ID').read_text().strip()
        if not re.fullmatch('[A-Za-z0-9_-]{1,128}',value):raise ValueError('Invalid Next build identity')
        return {'kind':'next-build','id':value}
    value=target_manifest_sha(target)
    if not re.fullmatch('[a-f0-9]{40}',value):raise ValueError('Invalid frontend commit identity')
    return {'kind':'git-sha','id':value}


def rollback_target(repository,record,sha,digest):
    if record.get('schema')!='ruta-ci.activation.v2' or record.get('status')!='passed' or record.get('action')!='publish':
        raise ValueError('Rollback requires a completed publication receipt with recorded identities')
    if record['sha']!=sha or record['digest']!=digest:raise ValueError('Rollback receipt does not match the selected release')
    current=LINKS[repository].resolve(strict=True)
    if current!=Path(record['active']).resolve(strict=True):raise ValueError('Active release changed after this receipt; rollback refused')
    root=ROOTS[repository].resolve(strict=True);target=Path(record['previous']).resolve(strict=True)
    if root not in target.parents or root not in current.parents:raise ValueError('Rollback destination is outside the tenant')
    if record.get('active_identity')!=release_identity(repository,current) or record.get('previous_identity')!=release_identity(repository,target):
        raise ValueError('Rollback identities do not match the recorded releases')
    return target


def write_receipt(path,record):
    pending=path.with_name(path.name+'.'+uuid.uuid4().hex+'.tmp')
    with pending.open('x') as output:
        json.dump(record,output,indent=2);output.flush();os.fsync(output.fileno())
    pending.replace(path)

def verify_archive(archive, expected):
    with archive.open('rb') as source:
        if hashlib.file_digest(source,'sha256').hexdigest() != expected:
            raise ValueError('Package digest mismatch')
    with tarfile.open(archive) as package:
        for item in package:
            tarfile.data_filter(item,'/tmp/ruta-ci-extract-check')

def swap(repository, destination):
    root = ROOTS[repository].resolve(strict=True)
    destination = destination.resolve(strict=True)
    if root not in destination.parents:
        raise ValueError('Release destination is outside the tenant')
    link = LINKS[repository]
    candidate = link.with_name(link.name+'.ci-next')
    if candidate.exists() or candidate.is_symlink():
        raise RuntimeError('Another activation has an outstanding link')
    candidate.symlink_to(destination)
    candidate.replace(link)
    if repository in RESTART_UNITS:
        subprocess.run(['systemctl','restart',RESTART_UNITS[repository]],check=True)

def health(repository, target=None):
    import time
    last = None
    target=Path(target or LINKS[repository]).resolve(strict=True)
    expected=release_identity(repository,target)
    for attempt in range(20):
        try:
            if LINKS[repository].resolve(strict=True)!=target:raise RuntimeError('Active release changed during health verification')
            request=urllib.request.Request(ORIGINS[repository]+'/?__ci_health='+uuid.uuid4().hex,headers={'Cache-Control':'no-cache','X-RutaTramite-Test':'1','User-Agent':'Ruta-CI-Release-Health/1.0'})
            with urllib.request.urlopen(request,timeout=10) as response:
                if response.status != 200:
                    raise RuntimeError('Homepage is not healthy')
                body=response.read()
            if repository=='rutatramite':
                if ('<!--'+expected['id']+'-->').encode() not in body:raise RuntimeError('Served Next build does not match the active release')
            else:
                request=urllib.request.Request(ORIGINS[repository]+'/RELEASE_MANIFEST.json?__ci_health='+uuid.uuid4().hex,headers={'Cache-Control':'no-cache'})
                with urllib.request.urlopen(request,timeout=10) as response:
                    if response.status!=200 or json.load(response).get('git_sha')!=expected['id']:raise RuntimeError('Served frontend commit does not match the active release')
            if LINKS[repository].resolve(strict=True)!=target:raise RuntimeError('Active release changed during health verification')
            return
        except Exception as error:
            last = error
            time.sleep(1)
    raise RuntimeError('Production health check failed') from last

def activate_release(repository, target, action):
    target=Path(target).resolve(strict=True)
    previous = LINKS[repository].resolve(strict=True)
    try:
        if repository == 'visionsetil' and action == 'publish':
            subprocess.run(['/usr/local/sbin/visionsetil-activate-frontend-release',str(target)],check=True)
        else:
            if repository == 'rutatramite' and action == 'publish':
                subprocess.run(['chown','-R','slot2:slot2',str(target)],check=True)
            swap(repository,target)
        health(repository,target)
        if repository == 'visionsetil' and action == 'publish':
            with urllib.request.urlopen(ORIGINS[repository]+'/RELEASE_MANIFEST.json',timeout=15) as response:
                if json.load(response)['git_sha'] != target_manifest_sha(target):
                    raise RuntimeError('Public commit identity mismatch')
    except Exception as error:
        current=LINKS[repository].resolve(strict=True)
        if current not in [target,previous]:raise RuntimeError('Another release became active; automatic rollback refused to preserve it') from error
        if current==target:swap(repository,previous)
        health(repository,previous)
        raise


def target_manifest_sha(target):
    return json.loads((target/'RELEASE_MANIFEST.json').read_text())['git_sha']

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('repository',choices=ROOTS)
    parser.add_argument('action',choices=['preview','publish','rollback'])
    parser.add_argument('sha')
    parser.add_argument('digest')
    args = parser.parse_args()
    if not re.fullmatch('[a-f0-9]{40}',args.sha) or not re.fullmatch('[a-f0-9]{64}',args.digest):
        parser.error('Invalid commit or package digest')
    lock = open('/run/lock/ruta-ci-production.lock','w')
    fcntl.flock(lock,fcntl.LOCK_EX)
    if shutil.disk_usage('/').free < 10*1024**3 and args.action != 'rollback':
        raise RuntimeError('Production reserve requires at least 10 GiB free')
    archive = Path('/opt/ruta-ci/incoming')/(args.repository+'-'+args.sha+'-'+args.digest+'.tar')
    receipts = Path('/opt/ruta-ci/receipts')/args.repository
    receipts.mkdir(parents=True,exist_ok=True)
    previous = LINKS[args.repository].resolve(strict=True)
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    if args.action == 'rollback':
        record = json.loads((receipts/'last-success.json').read_text())
        target = rollback_target(args.repository,record,args.sha,args.digest)
    else:
        verify_archive(archive,args.digest)
        root = ROOTS[args.repository] if args.action == 'publish' else Path('/opt/ruta-ci/previews')/args.repository
        target = root/('ci-'+stamp+'-'+args.sha[:12])
        target.mkdir(parents=True,exist_ok=False)
        with tarfile.open(archive) as package:
            package.extractall(target,filter='data')
        if args.repository == 'visionsetil':
            target = target/'dist-app'
            manifest = json.loads((target/'RELEASE_MANIFEST.json').read_text())
            if manifest['git_sha'] != args.sha or not (target/'prerendered/core/home.html').is_file():
                raise ValueError('Frontend package identity or prerender is invalid')
        elif not all((target/name).is_file() for name in ['server.js','public/sitemap.xml','data/municipios/_index.json']):
            raise ValueError('Standalone package is incomplete')
        if args.action == 'preview':
            from preview import run_preview
            record=run_preview(args.repository,target,args.sha,args.digest,receipts)
            if LINKS[args.repository].resolve(strict=True) != previous:
                raise RuntimeError('Production pointer changed during preview')
            print(json.dumps(record))
            return
    record = {'schema':'ruta-ci.activation.v2','status':'starting','action':args.action,'sha':args.sha,'digest':args.digest,'active':str(target),'previous':str(previous),'active_identity':release_identity(args.repository,target),'previous_identity':release_identity(args.repository,previous),'at':stamp}
    operation=receipts/(stamp+'-'+uuid.uuid4().hex[:8]+'.json')
    write_receipt(operation,record)
    try:
        activate_release(args.repository,target,args.action)
    except Exception as error:
        record.update(status='failed',error=type(error).__name__+': '+str(error),observed_active=str(LINKS[args.repository].resolve()))
        write_receipt(operation,record);raise
    record.update(status='passed',finished_at=datetime.now(timezone.utc).isoformat())
    write_receipt(operation,record)
    if args.action == 'publish':
        write_receipt(receipts/'last-success.json',record)
    print(json.dumps(record))

if __name__ == '__main__':
    main()
