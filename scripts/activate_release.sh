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
sudo systemctl is-active slot2-app.service
trap - ERR
printf 'ACTIVE=%s\nPREVIOUS=%s\n' "$RELEASE" "$PREVIOUS"
