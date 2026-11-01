#!/usr/bin/env bash
# Run on the VPS with: bash activate_release.sh /tmp/release.tar SHA256
set -euo pipefail
ARCHIVE=${1:?archive path required}
EXPECTED=${2:?SHA256 required}
ROOT=/srv/tenants/slot2
case "$ARCHIVE" in /tmp/rutatramite-*.tar) ;; *) echo 'Unexpected archive path' >&2; exit 1;; esac
[[ "$EXPECTED" =~ ^[a-f0-9]{64}$ ]] || exit 1
printf '%s  %s\n' "$EXPECTED" "$ARCHIVE" | sha256sum --check --status
sudo test -L "$ROOT/app"
PREVIOUS=$(sudo readlink -f "$ROOT/app")
case "$PREVIOUS" in "$ROOT"/releases/*) ;; *) echo 'Unexpected live release' >&2; exit 1;; esac
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
RELEASE="$ROOT/releases/$STAMP"
sudo mkdir "$RELEASE"
# The package is produced by pack_release.py; reject paths that escape the release.
tar -tf "$ARCHIVE" | awk '/^\// || /(^|\/)\.\.($|\/)/ { bad=1 } END { exit bad }'
sudo tar --no-same-owner -xf "$ARCHIVE" -C "$RELEASE"
sudo test -f "$RELEASE/server.js"
sudo test -f "$RELEASE/public/sitemap.xml"
sudo test -f "$RELEASE/data/municipios/_index.json"
# 2026-10-31 guard: the candidate sitemap must keep every URL of the live release.
LIVE_LOCS=$(sudo grep -o '<loc>[^<]*</loc>' "$PREVIOUS/public/sitemap.xml" | sort -u)
NEW_LOCS=$(sudo grep -o '<loc>[^<]*</loc>' "$RELEASE/public/sitemap.xml" | sort -u)
LOST=$(comm -23 <(echo "$LIVE_LOCS") <(echo "$NEW_LOCS") | wc -l)
echo "SITEMAP live=$(echo "$LIVE_LOCS" | grep -c loc) candidate=$(echo "$NEW_LOCS" | grep -c loc) lost=$LOST"
if [ "$LOST" -ne 0 ]; then echo 'ABORT: candidate sitemap drops live URLs; nothing activated' >&2; sudo rm -rf "$RELEASE"; exit 1; fi
sudo chown -R slot2:slot2 "$RELEASE"
sudo chmod -R u=rwX,go= "$RELEASE"
sudo chmod 750 "$RELEASE"
NEXT_LINK="$ROOT/app-$STAMP"
sudo ln -s "$RELEASE" "$NEXT_LINK"
sudo chown -h slot2:slot2 "$NEXT_LINK"
rollback() {
  sudo ln -s "$PREVIOUS" "$ROOT/rollback-$STAMP"
  sudo chown -h slot2:slot2 "$ROOT/rollback-$STAMP"
  sudo mv -Tf "$ROOT/rollback-$STAMP" "$ROOT/app"
  sudo systemctl restart slot2-app.service
  echo "Rolled back to $PREVIOUS" >&2
}
sudo mv -Tf "$NEXT_LINK" "$ROOT/app"
trap 'rollback' ERR
sudo systemctl restart slot2-app.service
for attempt in $(seq 1 20); do
  if curl --fail --silent --max-time 5 -H 'Host: rutatramite.com' http://127.0.0.1:8100/ >/dev/null; then break; fi
  sleep 1
done
curl --fail --silent --max-time 15 -H 'Host: rutatramite.com' http://127.0.0.1:8100/ >/dev/null
curl --fail --silent --max-time 15 -H 'Host: rutatramite.com' http://127.0.0.1:8100/sitemap.xml >/dev/null
# 2026-10-31 guard: key URLs must answer 200 (no redirect, no error) or we roll back.
for key in / /elecciones /elecciones/tarjeta-censal-cuando-llega /elecciones/programas-electorales-29n /sitemap.xml; do
  code=$(curl --silent --output /dev/null --max-time 15 --write-out '%{http_code}' -H 'Host: rutatramite.com' "http://127.0.0.1:8100$key")
  echo "CHECK $key $code"
  [ "$code" = "200" ] || false
done
SERVED=$(curl --fail --silent --max-time 15 -H 'Host: rutatramite.com' http://127.0.0.1:8100/sitemap.xml | grep -o '<loc>' | wc -l)
echo "SERVED_SITEMAP=$SERVED"
[ "$SERVED" -ge "$(echo "$LIVE_LOCS" | grep -c loc)" ] || false
sudo systemctl is-active slot2-app.service
trap - ERR
printf 'ACTIVE=%s\nPREVIOUS=%s\n' "$RELEASE" "$PREVIOUS"
