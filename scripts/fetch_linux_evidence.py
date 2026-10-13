"""Fetch only named build reports through the existing VPS CLI."""
import argparse
from pathlib import Path
import re,subprocess

ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser()
parser.add_argument('--build-dir',required=True)
args=parser.parse_args()
assert re.fullmatch(r'/srv/tenants/slot2/builds/\d{8}T\d{6}Z',args.build_dir)
helper_root=ROOT.parent/'VISIONSETIL'
helper=[str(helper_root/'.venv-ci/Scripts/python.exe'),'-X','utf8',str(helper_root/'tmp/vps.py')]
names=['release-manifest.json','release-inputs.json','audit-build-editorial.json',
       'audit-accessibility-static.json','audit-production-after.json',
       'linux-job.log','linux-tests.log','linux-tests-complete.log']
for name in names:
    result=subprocess.run(helper+['exec',f'sudo cat {args.build_dir}/docs/{name}'],
                          capture_output=True,text=True,encoding='utf-8',check=True)
    target=name if name.startswith('linux-') else 'linux-'+name
    (ROOT/'docs'/target).write_text(result.stdout,encoding='utf-8')
    print(f'Fetched {name}',flush=True)
