"""Package a completed standalone build without deleting or copying existing trees."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tarfile
import tempfile
from release_inputs import fingerprint, RECORD

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--build-dir', default='.next')
    args = parser.parse_args()
    if not RECORD.exists() or json.loads(RECORD.read_text()) != fingerprint():
        raise SystemExit('Release inputs are not verified; snapshot before building and check afterward')
    build = (ROOT / args.build_dir).resolve()
    if build.parent != ROOT or not build.name.startswith('.next'):
        raise SystemExit('Build must be a .next directory directly inside the workspace')
    standalone = build / 'standalone'
    required = [standalone/'server.js', build/'BUILD_ID', ROOT/'public/sitemap.xml', ROOT/'data/municipios/_index.json', ROOT/'content/escenarios/sin-contrato.md']
    for path in required:
        if not path.is_file(): raise SystemExit(f'Missing release input: {path}')
    if (build/'BUILD_ID').stat().st_mtime_ns < RECORD.stat().st_mtime_ns:
        raise SystemExit('Selected build predates the recorded release inputs')
    server = (standalone/'server.js').read_text(encoding='utf-8')
    if build.name not in server: raise SystemExit('Standalone config does not match the selected build directory')
    # 19-10-2026: a local test server writes runtime ISR entries (incl. 404s) here; never ship them.
    if (standalone/build.name/'server'/'route-cache').exists():
        raise SystemExit(f'Remove {standalone/build.name/"server"/"route-cache"} (runtime cache from a local test server) before packing')
    output = Path(tempfile.mkdtemp(prefix='rutatramite-release-')) / 'release.tar'
    print(f'Packaging {build.name} into {output}', flush=True)
    replaced = {'public', 'data', 'content'}
    children = [child for child in standalone.iterdir() if child.name not in replaced]
    native_tar = shutil.which('tar.exe') if os.name == 'nt' else None
    if native_tar:
        print('Using native Windows tar', flush=True)
        subprocess.run([native_tar, '-cf', str(output), '-C', str(standalone),
                        *[child.name for child in children], '-C', str(ROOT),
                        f'{build.name}/static', *sorted(replaced)], check=True)
    else:
        with tarfile.open(output, 'w') as archive:
            for child in children:
                print(f'Adding {child.name}', flush=True)
                archive.add(child, arcname=child.name)
            archive.add(build/'static', arcname=f'{build.name}/static')
            for name in sorted(replaced): archive.add(ROOT/name, arcname=name)
    if json.loads(RECORD.read_text()) != fingerprint():
        raise SystemExit('Release inputs changed while packaging; archive must not be deployed')
    with output.open('rb') as source:
        digest = hashlib.file_digest(source, 'sha256').hexdigest()
    report = {'archive':str(output), 'sha256':digest, 'bytes':output.stat().st_size, 'build_dir':build.name, 'build_id':(build/'BUILD_ID').read_text().strip()}
    (ROOT/'docs/release-manifest.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    print(json.dumps(report))


if __name__ == '__main__': main()
