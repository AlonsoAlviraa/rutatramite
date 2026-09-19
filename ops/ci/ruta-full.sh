#!/usr/bin/env bash
set -euo pipefail
bash scripts/build_linux_job.sh
python - <<'PY'
import json, shutil
from pathlib import Path
manifest=json.loads(Path('docs/release-manifest.json').read_text())
shutil.copy2(manifest['archive'], 'ci-results/release.tar')
PY
npx tsc --noEmit
npx playwright install --with-deps chromium firefox webkit
PORT=8199 HOSTNAME=127.0.0.1 npm run start > ci-results/preview.log 2>&1 &
preview_pid=$!
trap 'kill "$preview_pid" 2>/dev/null || true' EXIT
for attempt in $(seq 1 60); do
  if curl --fail --silent http://127.0.0.1:8199/ > /dev/null; then break; fi
  sleep 1
done
curl --fail --silent http://127.0.0.1:8199/ > /dev/null
E2E_RUN=ci E2E_WORKERS=1 E2E_BASE=http://127.0.0.1:8199 npx playwright test
