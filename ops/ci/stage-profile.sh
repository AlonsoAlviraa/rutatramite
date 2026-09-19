#!/usr/bin/env bash
set -Eeuo pipefail
stage="$1"
[[ "$stage" =~ ^[a-z][a-z-]+$ ]] && [[ -f "/ci/$stage.sh" ]]
finish() {
  result=$?
  CI_STAGE="$stage" PROFILE_EXIT="$result" python3 - <<'PY'
import json, os
from pathlib import Path
report = {'stage': os.environ['CI_STAGE'], 'exit_code': int(os.environ['PROFILE_EXIT'])}
for name in ('memory.peak', 'memory.events', 'memory.max'):
    path = Path('/sys/fs/cgroup') / name
    report[name] = path.read_text().strip() if path.exists() else None
target = Path('/workspace/ci-results')
target.mkdir(exist_ok=True)
(target / ('resources-' + report['stage'] + '.json')).write_text(json.dumps(report, indent=2))
PY
  exit "$result"
}
trap finish EXIT
bash "/ci/$stage.sh"
