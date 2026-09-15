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
from datetime import datetime, timezone
from pathlib import Path

ROOTS = {'rutatramite':Path('/srv/tenants/slot2/releases'), 'visionsetil':Path('/opt/visionsetil/releases')}
LINKS = {'rutatramite':Path('/srv/tenants/slot2/app'), 'visionsetil':Path('/opt/visionsetil/releases/current')}
ORIGINS = {'rutatramite':'https://rutatramite.com','visionsetil':'https://visionsetil.com'}

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
    if repository == 'rutatramite':
        subprocess.run(['systemctl','restart','slot2-app.service'],check=True)

def health(repository):
    import time
    last = None
    for attempt in range(20):
        try:
            with urllib.request.urlopen(ORIGINS[repository]+'/',timeout=10) as response:
                if response.status != 200:
                    raise RuntimeError('Homepage is not healthy')
                response.read()
            return
        except Exception as error:
            last = error
            time.sleep(1)
    raise RuntimeError('Production health check failed') from last

def activate_release(repository, target, action):
    previous = LINKS[repository].resolve(strict=True)
    try:
        if repository == 'visionsetil' and action == 'publish':
            subprocess.run(['/usr/local/sbin/visionsetil-activate-frontend-release',str(target)],check=True)
        else:
            if repository == 'rutatramite' and action == 'publish':
                subprocess.run(['chown','-R','slot2:slot2',str(target)],check=True)
            swap(repository,target)
        health(repository)
        if repository == 'visionsetil' and action == 'publish':
            with urllib.request.urlopen(ORIGINS[repository]+'/RELEASE_MANIFEST.json',timeout=15) as response:
                if json.load(response)['git_sha'] != target_manifest_sha(target):
                    raise RuntimeError('Public commit identity mismatch')
    except Exception:
        swap(repository,previous)
        health(repository)
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
        if record['sha'] != args.sha or record['digest'] != args.digest:
            raise ValueError('Rollback receipt does not match the selected release')
        target = Path(record['previous'])
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
    activate_release(args.repository,target,args.action)
    record = {'action':args.action,'sha':args.sha,'digest':args.digest,'active':str(target),'previous':str(previous),'at':stamp}
    (receipts/(stamp+'.json')).write_text(json.dumps(record,indent=2))
    if args.action == 'publish':
        (receipts/'last-success.json').write_text(json.dumps(record,indent=2))
    print(json.dumps(record))

if __name__ == '__main__':
    main()
