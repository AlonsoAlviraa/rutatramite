"""Deploy the current build only after its package and HTML audit are complete.

Uses the existing VPS CLI; never reads credentials. Keeps preflight and activation
logs separate, and preserves the release receipt before the public crawl.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import time
from release_inputs import fingerprint, RECORD

ROOT=Path(__file__).resolve().parents[1]
HELPER_ROOT=ROOT.parent/'VISIONSETIL'
HELPER=[str(HELPER_ROOT/'.venv-ci/Scripts/python.exe'),str(HELPER_ROOT/'tmp/vps.py')]

def run(args, name):
    print(name,flush=True)
    with (ROOT/'docs'/name).open('w',encoding='utf-8') as log:
        result=subprocess.run(args,cwd=ROOT,stdout=log,stderr=subprocess.STDOUT)
    if result.returncode:
        raise SystemExit(f'{name} failed (exit {result.returncode}); inspect log before proceeding')

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--build-id',required=True)
    parser.add_argument('--wait',action='store_true')
    parser.add_argument('--preview-only',action='store_true')
    args=parser.parse_args()
    build_id=args.build_id
    if not re.fullmatch(r'[A-Za-z0-9_-]+',build_id): raise SystemExit('Invalid build id')
    receipt=ROOT/'docs'/f'deployed-{build_id}.json'
    if receipt.exists(): raise SystemExit('This build already has a deployment receipt')
    deadline=time.monotonic()+3600
    def await_json(path):
        while True:
            if (ROOT/'.next/BUILD_ID').read_text().strip()!=build_id:
                raise SystemExit('Build changed while awaiting release evidence')
            if path.exists():
                try: record=json.loads(path.read_text(encoding='utf-8'))
                except json.JSONDecodeError: record={}
                if record.get('build_id')==build_id: return record
            if not args.wait or time.monotonic()>deadline:
                raise SystemExit(f'No completed evidence for {build_id}: {path.name}')
            time.sleep(5)
    print(f'Awaiting completed package for {build_id}',flush=True)
    manifest=await_json(ROOT/'docs/release-manifest.json')
    if not args.preview_only and json.loads(RECORD.read_text())!=fingerprint(): raise SystemExit('Inputs changed')
    archive=Path(manifest['archive'])
    with archive.open('rb') as source:
        digest=hashlib.file_digest(source,'sha256').hexdigest()
    if digest!=manifest['sha256'] or archive.stat().st_size!=manifest['bytes']:
        raise SystemExit('Archive integrity check failed')
    remote=f'/tmp/rutatramite-{build_id}.tar'
    run(HELPER+['put',str(archive),remote],'release-upload.log')
    run(HELPER+['exec',f'bash /tmp/rutatramite-check.sh {remote} {digest}'],'release-preview.log')
    if 'PREVIEW_OK' not in (ROOT/'docs/release-preview.log').read_text():
        raise SystemExit('Private preview did not confirm success')
    if args.preview_only:
        print('Private preview passed; production was not activated',flush=True)
        return
    print('Private preview passed; awaiting matching HTML audit',flush=True)
    audit=await_json(ROOT/'docs/audit-build-editorial.json')
    if audit.get('issues') or audit.get('issue_counts') or audit.get('html_pages',0)<900:
        raise SystemExit('HTML audit has issues or incomplete coverage')
    if json.loads(RECORD.read_text())!=fingerprint(): raise SystemExit('Inputs changed before activation')
    run(HELPER+['exec',f'bash /tmp/rutatramite-activate.sh {remote} {digest}'],'release-activation.log')
    activation=(ROOT/'docs/release-activation.log').read_text()
    if 'ACTIVE=/srv/tenants/slot2/releases/' not in activation:
        raise SystemExit('Activation response missing; inspect live state before retrying')
    receipt.write_text(json.dumps({'build_id':build_id,'sha256':digest,'activation':activation},indent=2),encoding='utf-8')
    run([sys.executable,'scripts/audit_site.py','--base','https://rutatramite.com','--output','docs/audit-production-after.json'],'release-public-crawl.log')
    print(f'Deployed {build_id}; inspect audit-production-after.json for final findings',flush=True)

if __name__=='__main__': main()
