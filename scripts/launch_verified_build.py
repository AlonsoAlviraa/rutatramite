"""Launch one isolated Linux build and retain the authoritative systemd handle."""
import json
import os
from datetime import datetime, timezone
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
HELPER_ROOT = Path(os.environ.get('RUTATRAMITE_VPS_HELPER_ROOT', str(ROOT.parent / 'VISIONSETIL')))
HELPER = [str(HELPER_ROOT / '.venv-ci/Scripts/python.exe'), '-X', 'utf8', str(HELPER_ROOT / 'tmp/vps.py')]

def run(args):
    return subprocess.run(args, cwd=ROOT, check=True, capture_output=True, text=True, encoding='utf-8').stdout

def main():
    live = run(HELPER + ['exec', "sudo systemctl list-units --state=activating,active --no-legend 'slot2-build-*'"])
    if live.strip():
        raise SystemExit('A build unit is active; inspect it before launching another: ' + live)
    free = int(run(HELPER + ['exec', 'df --output=avail -B1 /srv/tenants/slot2']).splitlines()[-1].strip())
    if free < 4 * 1024**3:
        raise SystemExit('Build requires at least 4 GiB free. Inspect and clean inactive build caches before retrying; preserve active and rollback releases.')
    run([sys.executable, 'scripts/release_inputs.py'])
    run([sys.executable, 'scripts/pack_source.py'])
    manifest = json.loads((ROOT / 'docs/source-bundle.json').read_text(encoding='utf-8'))
    remote = '/tmp/rutatramite-source-' + manifest['sha256'][:16] + '.tar.gz'
    run(HELPER + ['put', manifest['archive'], remote])
    launcher = '/tmp/rutatramite-build-' + manifest['sha256'][:16] + '.sh'
    run(HELPER + ['put', str(ROOT / 'scripts/build_linux.sh'), launcher])
    # Persist intent before launch; a lost SSH response must be investigated, not retried blindly.
    record = { 'source': manifest, 'remote_archive': remote, 'launcher': launcher, 'status': 'launching' }
    target = ROOT / ('docs/build-' + datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ') + '-handle.json')
    target.write_text(json.dumps(record, indent=2), encoding='utf-8')
    output = run(HELPER + ['exec', f"bash -n {launcher} && bash {launcher} {remote} {manifest['sha256']}"])
    record.update(status='launched', output=output)
    target.write_text(json.dumps(record, indent=2), encoding='utf-8')
    print(output)

if __name__ == '__main__':
    main()
