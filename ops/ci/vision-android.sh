#!/usr/bin/env bash
set -euo pipefail
cd frontend
npm ci
cp mobile.env.example .env.native
npm run mobile:sync
cd android
bash ./gradlew :app:bundleRelease --no-daemon --max-workers=2
jarsigner -verify app/build/outputs/bundle/release/app-release.aab
keytool -J-Duser.language=en -printcert -jarfile app/build/outputs/bundle/release/app-release.aab > /workspace/ci-results/android-certificate.txt
python3 - <<'PY'
import json
import re
from pathlib import Path
expected = json.loads(Path('/ci/android-certificate.json').read_text())['certificate_sha256']
certificates = {value.replace(':', '').lower() for value in re.findall(r'SHA256:\s*([0-9A-Fa-f:]{95})', Path('/workspace/ci-results/android-certificate.txt').read_text())}
if certificates != {expected}:
    raise SystemExit('AAB signing certificate does not match the existing upload identity')
print('Existing Android upload certificate verified')
PY
cp app/build/outputs/bundle/release/app-release.aab /workspace/ci-results/app-release.aab
