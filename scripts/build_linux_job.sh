#!/usr/bin/env bash
set -euo pipefail
mkdir -p docs
npm ci --no-audit --no-fund
python3 scripts/release_inputs.py
npm run build
python3 scripts/release_inputs.py --check
python3 scripts/audit_build.py --build-dir .next --output docs/audit-build-editorial.json
python3 scripts/audit_fragment_references.py --build-dir .next --output docs/audit-fragment-references.json
python3 - <<'PY'
import json
from pathlib import Path
report=json.loads(Path('docs/audit-build-editorial.json').read_text())
assert report['html_pages']>=900 and not report['issues'] and not report['issue_counts']
PY
python3 scripts/pack_release.py --build-dir .next
printf 'LINUX_BUILD_OK\n'
