#!/usr/bin/env bash
set -Eeuo pipefail
[[ "${3:-}" =~ ^[a-f0-9]{40}$ ]] || exit 2
export GITHUB_SHA="$3" SITE_ORIGIN=https://visionsetil.com
set -Eeuo pipefail

policy_script="$1"
activator_source="$2"
config='/etc/caddy/Caddyfile'
activator_target='/usr/local/sbin/visionsetil-activate-frontend-release'
# Linux protected_regular can refuse root opening a file created by
# another user in sticky /tmp. Create both files as root because all
# subsequent reads/writes are intentionally privileged.
candidate="$(sudo mktemp /tmp/visionsetil-caddyfile-patched.XXXXXX)"
backup="$(sudo mktemp /tmp/visionsetil-caddyfile-backup.XXXXXX)"
activator_backup="$(sudo mktemp /tmp/visionsetil-activator-backup.XXXXXX)"
activator_next="${activator_target}.next"
installed=0
activator_installed=0

rollback_if_needed() {
  if test "$activator_installed" = '1'; then
    sudo install -o root -g root -m 755 "$activator_backup" "$activator_target" || true
  fi
  if test "$installed" = '1'; then
    sudo install -o root -g root -m 644 "$backup" "$config" || true
    sudo systemctl reload caddy || true
  fi
}
cleanup() {
  result=$?
  if test "$result" -ne 0; then rollback_if_needed; fi
  sudo rm -f -- "$candidate" "$backup" "$activator_backup" "$activator_next"
  rm -f -- "$policy_script" "$activator_source"
  exit "$result"
}
trap cleanup EXIT

sudo test -f "$config"
sudo test -r "$config"
sudo test -f "$activator_target"
sudo cp -- "$activator_target" "$activator_backup"
test -f "$policy_script"
test -f "$activator_source"
PYTHONDONTWRITEBYTECODE=1 python3 -c \
  'import pathlib, sys; compile(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"), sys.argv[1], "exec")' \
  "$policy_script"
bash -n "$activator_source"

sudo python3 "$policy_script" "$config" "$candidate"
sudo caddy validate --config "$candidate" --adapter caddyfile
sudo cp -- "$config" "$backup"
sudo install -o root -g root -m 644 "$candidate" "$config"
installed=1

if ! sudo systemctl reload caddy; then
  echo 'Caddy reload failed; restoring the previous configuration.' >&2
  exit 5
fi
sudo systemctl is-active --quiet caddy

# Verify the changed content negotiation before leaving rollback scope.
html_headers="$(curl --max-time 20 --silent --show-error --dump-header - --output /dev/null -H 'Accept: text/html' https://visionsetil.com/ruta-auditoria-no-existe-9f42a0)"
printf '%s\n' "$html_headers"
printf '%s\n' "$html_headers" | grep -Eq '^HTTP/[0-9.]+ 404'
printf '%s\n' "$html_headers" | grep -Eqi '^content-type:[[:space:]]*text/html'
# Explicit Markdown requests go through @wantMarkdown first. A missing
# representation has always returned 406 (try_files ... =406).
md_headers="$(curl --max-time 20 --silent --show-error --dump-header - --output /dev/null -H 'Accept: text/markdown' https://visionsetil.com/ruta-auditoria-no-existe-9f42a0)"
printf '%s\n' "$md_headers"
printf '%s\n' "$md_headers" | grep -Eq '^HTTP/[0-9.]+ 406'
printf '%s\n' "$md_headers" | grep -Eqi '^content-type:[[:space:]]*text/markdown'
fallback_headers="$(curl --max-time 20 --silent --show-error --dump-header - --output /dev/null -H 'Accept: */*' https://visionsetil.com/ruta-auditoria-no-existe-9f42a0)"
printf '%s\n' "$fallback_headers"
printf '%s\n' "$fallback_headers" | grep -Eq '^HTTP/[0-9.]+ 404'
printf '%s\n' "$fallback_headers" | grep -Eqi '^content-type:[[:space:]]*text/markdown'

sudo install -o root -g root -m 755 "$activator_source" "$activator_next"
sudo bash -n "$activator_next"
sudo mv -f -- "$activator_next" "$activator_target"
activator_installed=1
manifest_headers="$(curl --fail --silent --show-error --head "$SITE_ORIGIN/manifest.webmanifest")"
printf '%s\n' "$manifest_headers"
printf '%s\n' "$manifest_headers" | grep -Eqi '^content-type:[[:space:]]*application/manifest\+json([;[:space:]]|$)'

page_headers="$(curl --fail --silent --show-error --head "$SITE_ORIGIN/enciclopedia/amanita-phalloides")"
printf '%s\n' "$page_headers"
printf '%s\n' "$page_headers" | grep -Eqi '^cache-control:[[:space:]]*max-age=120,[[:space:]]*must-revalidate'

media_headers="$(curl --fail --silent --show-error --head "$SITE_ORIGIN/media/species/amanita-muscaria/card.webp")"
printf '%s\n' "$media_headers"
printf '%s\n' "$media_headers" | grep -Eqi '^cache-control:[[:space:]]*public,[[:space:]]*max-age=86400,[[:space:]]*stale-while-revalidate=604800'

artifact_headers="$(curl --silent --show-error --dump-header - --output /dev/null "$SITE_ORIGIN/prerendered/core/home.html")"
printf '%s\n' "$artifact_headers"
printf '%s\n' "$artifact_headers" | grep -Eq '^HTTP/[0-9.]+ 404'
printf '%s\n' "$artifact_headers" | grep -Eqi '^x-robots-tag:[[:space:]]*noindex,[[:space:]]*nofollow'

missing_asset_headers="$(curl --silent --show-error --dump-header - --output /dev/null "$SITE_ORIGIN/assets/visionsetil-missing-${GITHUB_SHA}.js")"
printf '%s\n' "$missing_asset_headers"
printf '%s\n' "$missing_asset_headers" | grep -Eq '^HTTP/[0-9.]+ 404'
! printf '%s\n' "$missing_asset_headers" | grep -Eqi '^content-type:[[:space:]]*text/html'
