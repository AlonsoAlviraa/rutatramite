"""Pin and verify one source generation for the lifetime of a lightweight job."""
import argparse
import json
import os
import subprocess
from datetime import datetime,timezone
from pathlib import Path
import probe_sources


def confirmed_source(sha=''):
    source=(probe_sources.ROOT/'current').resolve(strict=True)
    if source.parent!=probe_sources.ROOT.resolve():raise ValueError('Source pointer leaves the managed directory')
    manifest=probe_sources.verify(source,sha or None)
    installation=json.loads((source/'installation.json').read_text())
    age=(datetime.now(timezone.utc)-datetime.fromisoformat(installation['installed_at'])).total_seconds()
    if age<0 or age>600:raise RuntimeError('Source confirmation is older than ten minutes; refresh from GitHub before running')
    return source,manifest,installation


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('mode',choices=['operational','species'])
    parser.add_argument('--sha',default='');parser.add_argument('--require-identify',action='store_true')
    args=parser.parse_args()
    record={'mode':args.mode,'status':'starting','at':datetime.now(timezone.utc).isoformat()}
    receipt=Path('probe-source.json');receipt.write_text(json.dumps(record))
    Path(args.mode+'.json').write_text(json.dumps({'status':'not_run','at':record['at'],'source_receipt':'probe-source.json'}))
    try:
        source,manifest,installation=confirmed_source(args.sha)
        record.update(source=str(source),sha=manifest['sha'],files=manifest['files'],installation=installation)
        receipt.write_text(json.dumps(record,indent=2))
        environment=dict(os.environ,PYTHONDONTWRITEBYTECODE='1',SITE_ORIGIN='https://visionsetil.com',REQUIRE_IDENTIFY_AVAILABLE='true' if args.require_identify else 'false')
        if args.mode=='operational':
            with Path('operational.json').open('w') as output:
                code=subprocess.run(['node',str(source/'frontend/scripts/verify-production-operational.mjs')],env=environment,stdout=output).returncode
        else:
            code=subprocess.run(['python3','-B',str(source/'scripts/build_species_index_join.py'),'--out',str(Path('species.json').resolve())],env=environment).returncode
        probe_sources.verify(source,manifest['sha'])
        record.update(status='passed' if code==0 else 'failed',exit_code=code)
    except Exception as error:
        record.update(status='failed',error=type(error).__name__+': '+str(error));raise
    finally:
        record['finished_at']=datetime.now(timezone.utc).isoformat();receipt.write_text(json.dumps(record,indent=2))
    raise SystemExit(code)


if __name__=='__main__':main()
