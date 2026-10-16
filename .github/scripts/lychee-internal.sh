#!/usr/bin/env bash
# Write a lychee config that checks internal links of the running site.
# Same-site absolute URLs are remapped to the local server. Other hosts are ignored.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

PORT="${PORT:-3000}"
BASE="http://127.0.0.1:${PORT}"
OUT="${1:-lychee.ci.toml}"

if ! curl -sf -o /dev/null "${BASE}/"; then
  echo "No server at ${BASE}; skipping link check."
  exit 0
fi

python3 - "$OUT" "$BASE" <<'PY'
import json
import re
import sys
import urllib.request
from urllib.parse import urlparse

out, base = sys.argv[1:]
html = urllib.request.urlopen(base + "/", timeout=20).read().decode("utf-8", "replace")
patterns = [
    r'<link[^>]*rel=["\']canonical["\'][^>]*>',
    r'<link[^>]*href=["\']https?://[^"\']+["\'][^>]*rel=["\']canonical["\'][^>]*>',
]
tag = ""
for pattern in patterns:
    match = re.search(pattern, html, re.I)
    if match:
        tag = match.group(0)
        break
href_match = re.search(r'href=["\']([^"\']+)', tag)
origin = ""
if href_match:
    parsed = urlparse(href_match.group(1))
    if parsed.scheme and parsed.netloc:
        origin = f"{parsed.scheme}://{parsed.netloc}"

includes = [r"^https?://(127\.0\.0\.1|localhost)(:\d+)?($|/)"]
remaps = []
if origin:
    host = origin.split("://", 1)[1]
    includes.append(rf"^https?://{re.escape(host)}($|/)")
    remaps.append(f"{re.escape(origin)} {base}")
    alternate = host[4:] if host.startswith("www.") else "www." + host
    remaps.append(f"{re.escape('https://' + alternate)} {base}")

def toml_str(value: str) -> str:
    return json.dumps(value)

lines = [
    'verbose = "info"',
    "no_progress = true",
    "include_mail = false",
    "max_concurrency = 8",
    "timeout = 20",
    "max_retries = 1",
    "include = [" + ", ".join(toml_str(item) for item in includes) + "]",
]
if remaps:
    lines.append("remap = [" + ", ".join(toml_str(item) for item in remaps) + "]")
with open(out, "w", encoding="utf-8") as handle:
    handle.write("\n".join(lines) + "\n")
print(f"Wrote {out}")
if origin:
    print(f"Remapping {origin} -> {base}")
PY
