"""Detect source/data changes between the start of a build and packaging."""
import argparse
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RECORD = ROOT / 'docs/release-inputs.json'


def fingerprint():
    paths = []
    for name in ('src', 'data', 'content', 'public', 'messages', 'scripts', 'tests', 'pack/rutatramite-empadronamiento-agent-pack/05_content/escenarios'):
        paths.extend(p for p in (ROOT/name).rglob('*') if p.is_file() and '__pycache__' not in p.parts and '_drafts' not in p.parts)
    paths.extend(ROOT/name for name in ('package.json', 'package-lock.json', 'next.config.ts', 'tailwind.config.ts', 'postcss.config.mjs', 'tsconfig.json', 'vitest.config.ts', 'playwright.config.ts'))
    digest = hashlib.sha256()
    for path in sorted(paths, key=lambda p: p.relative_to(ROOT).as_posix()):
        digest.update(path.relative_to(ROOT).as_posix().encode())
        digest.update(b'\0')
        digest.update(hashlib.sha256(path.read_bytes()).digest())
    return {'files':len(paths), 'sha256':digest.hexdigest()}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    current = fingerprint()
    if args.check:
        if not RECORD.exists() or json.loads(RECORD.read_text()) != current:
            raise SystemExit('Release inputs changed; rebuild before packaging')
        print('Release inputs unchanged')
    else:
        RECORD.write_text(json.dumps(current,indent=2),encoding='utf-8')
        print(json.dumps(current))
