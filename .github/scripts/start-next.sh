#!/usr/bin/env bash
# Start `next start` (or the package start script) and wait until it answers.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

PORT="${PORT:-3000}"
HOST="${HOST:-127.0.0.1}"

if ! bash .github/scripts/pm.sh has-script start; then
  echo "No start script; cannot serve the built site."
  exit 1
fi

if [[ ! -d .next && ! -d out && ! -d dist ]]; then
  echo "No build output (.next, out, or dist)."
  exit 1
fi

if curl -sf -o /dev/null "http://${HOST}:${PORT}/"; then
  echo "A server is already listening on ${HOST}:${PORT}"
  exit 0
fi

start_script="$(node -e 'const s=require("./package.json").scripts||{}; process.stdout.write(s.start||"")')"
if [[ "$start_script" == *next* ]]; then
  bash .github/scripts/pm.sh run start -H "$HOST" -p "$PORT" > /tmp/next-start.log 2>&1 &
else
  HOST="$HOST" PORT="$PORT" bash .github/scripts/pm.sh run start > /tmp/next-start.log 2>&1 &
fi
echo $! > /tmp/next-start.pid

for _ in $(seq 1 90); do
  if curl -sf -o /dev/null "http://${HOST}:${PORT}/"; then
    echo "Server ready at http://${HOST}:${PORT}"
    exit 0
  fi
  if ! kill -0 "$(cat /tmp/next-start.pid)" 2>/dev/null; then
    echo "Server exited before becoming ready." >&2
    cat /tmp/next-start.log >&2 || true
    exit 1
  fi
  sleep 2
done

echo "Server did not become ready." >&2
cat /tmp/next-start.log >&2 || true
exit 1
