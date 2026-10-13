#!/usr/bin/env bash
set -euo pipefail
mkdir -p docs
npm ci --no-audit --no-fund
npm test -- --reporter=dot > docs/linux-tests-complete.log 2>&1
python3 scripts/test_growth.py
python3 scripts/test_weekly_review.py
python3 scripts/release_inputs.py
npm run build
python3 scripts/release_inputs.py --check
python3 scripts/audit_build.py --build-dir .next --output docs/audit-build-editorial.json
python3 scripts/audit_fragment_references.py --build-dir .next --output docs/audit-fragment-references.json
python3 scripts/audit_accessibility_build.py
python3 scripts/audit_discoverability.py
python3 scripts/build_e2e_inventory.py
python3 - <<'PY'
import json
from pathlib import Path
report=json.loads(Path('docs/audit-build-editorial.json').read_text())
assert report['html_pages']>=900 and not report['issues'] and not report['issue_counts']
PY
python3 scripts/pack_release.py --build-dir .next
printf 'LINUX_BUILD_OK\n'
