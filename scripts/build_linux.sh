#!/usr/bin/env bash
set -euo pipefail
ARCHIVE=${1:?archive required}
EXPECTED=${2:?sha256 required}
case "$ARCHIVE" in /tmp/rutatramite-source-*.tar.gz) ;; *) exit 1;; esac
[[ "$EXPECTED" =~ ^[a-f0-9]{64}$ ]] || exit 1
FREE_BYTES=$(df --output=avail -B1 /srv/tenants/slot2 | tail -n 1)
if (( FREE_BYTES < 4294967296 )); then
  printf 'Build requires at least 4 GiB free; inspect inactive build caches before retrying.\n' >&2
  exit 1
fi
printf '%s  %s\n' "$EXPECTED" "$ARCHIVE" | sha256sum --check --status
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
BUILD="/srv/tenants/slot2/builds/$STAMP"
sudo mkdir -p /srv/tenants/slot2/builds
sudo chown root:slot2 /srv/tenants/slot2/builds
sudo chmod 750 /srv/tenants/slot2/builds
sudo mkdir "$BUILD"
tar -tzf "$ARCHIVE" | awk '/^\// || /(^|\/)\.\.($|\/)/ { bad=1 } END { exit bad }'
sudo tar --no-same-owner -xzf "$ARCHIVE" -C "$BUILD"
sudo chown -R slot2:slot2 "$BUILD"
sudo chmod -R u=rwX,go= "$BUILD"
printf 'LINUX_BUILD_DIR=%s\n' "$BUILD"
sudo systemd-run --quiet --unit "slot2-build-$STAMP" --uid slot2 --property "WorkingDirectory=$BUILD" --property Slice=tenant-slot2.slice --property "StandardOutput=append:$BUILD/build-job.log" --property "StandardError=append:$BUILD/build-job.log" --setenv NODE_OPTIONS=--max-old-space-size=512 --setenv "NPM_CONFIG_CACHE=$BUILD/.npm-cache" --setenv NEXT_PUBLIC_SITE_URL=https://rutatramite.com /usr/bin/bash scripts/build_linux_job.sh
printf 'LINUX_BUILD_UNIT=slot2-build-%s.service\n' "$STAMP"
