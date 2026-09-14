#!/usr/bin/env bash
set -euo pipefail
umask 077
ROOT=/srv/tenants/slot2
REPORTS="$ROOT/metrics/reports"
mkdir -p "$REPORTS"
export GSC_TOKEN_PATH="$ROOT/secrets/gsc/token.json"
export GSC_CLIENT_PATH="$ROOT/secrets/gsc/client_secrets.json"
python3 "$ROOT/ops/report_metrics.py" --db "$ROOT/metrics/events.sqlite" --output "$REPORTS/events-latest.json"
python3 "$ROOT/ops/measure_growth.py" --output-dir "$REPORTS"
