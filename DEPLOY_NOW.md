# Deploy now (slot2)

SEO/GEO mega from PR #1 is on `main`.

- **SHA on `main` after merge:** `c4976d3bee50997e7fbde6305da2e17999229f75`
- Merge parents: `a2f3fee3057ed1c05a1f625fffea25827e055463` (previous `main`) + `0fb6308989a839c54f3d336b94999e6f87b84054` (PR head `cursor/seo-geo-mega-543f`)
- Live root: `/srv/tenants/slot2` (`app` → `releases/<stamp>`, service `slot2-app.service`, `PORT=8100`)

This file is the command list. Longer context: `docs/VPS_DESPLIEGUE.md`. Do not invent credentials; the existing helper (`../VISIONSETIL/tmp/vps.py`) reads its own private config.

No GSC index counts or rankings are claimed here. After activate, Google still uses sitemap + Search Console on its own queue.

## A — Build a release tarball (local / CI tree)

From the repo at the SHA above:

```bash
python3 scripts/release_inputs.py
NEXT_PUBLIC_SITE_URL=https://rutatramite.com npm ci --no-audit --no-fund
NEXT_PUBLIC_SITE_URL=https://rutatramite.com npm test
NEXT_PUBLIC_SITE_URL=https://rutatramite.com npm run build
python3 scripts/release_inputs.py --check
python3 scripts/audit_build.py --build-dir .next --output docs/audit-build-editorial.json
python3 scripts/pack_release.py --build-dir .next
```

`pack_release.py` writes `docs/release-manifest.json` (`archive`, `sha256`, `bytes`, `build_id`). The tar is a temp path such as `/tmp/rutatramite-release-<id>/release.tar`.

`activate_release.sh` only accepts `/tmp/rutatramite-*.tar`. Copy before activate:

```bash
# substitute archive, sha256, build_id from docs/release-manifest.json
cp "$ARCHIVE" "/tmp/rutatramite-${BUILD_ID}.tar"
```

## B — Same tarball via VPS job (`build_linux.sh` + `build_linux_job.sh`)

`build_linux_job.sh` is not run by hand; `build_linux.sh` starts it as `slot2` under `/srv/tenants/slot2/builds/<stamp>`.

```bash
python3 scripts/release_inputs.py
python3 scripts/pack_source.py
```

`pack_source.py` writes `docs/source-bundle.json` (`archive`, `sha256`). `build_linux.sh` only accepts `/tmp/rutatramite-source-*.tar.gz`:

```bash
# substitute archive + sha256 from docs/source-bundle.json; pick any new id (date or git short SHA)
cp "$SOURCE_ARCHIVE" /tmp/rutatramite-source-<id>.tar.gz
bash scripts/build_linux.sh /tmp/rutatramite-source-<id>.tar.gz "$SOURCE_SHA256"
```

The job prints `LINUX_BUILD_DIR=/srv/tenants/slot2/builds/<stamp>` and `LINUX_BUILD_UNIT=slot2-build-<stamp>.service`. It runs `npm ci`, snapshots inputs, `npm run build` (with `NEXT_PUBLIC_SITE_URL=https://rutatramite.com` from `build_linux.sh`), audits, then `python3 scripts/pack_release.py --build-dir .next`. Wait for `LINUX_BUILD_OK` in that build’s `docs/` / job log. Then take `archive` + `sha256` from that tree’s `docs/release-manifest.json` and copy to `/tmp/rutatramite-*.tar` as in A.

## C — Activate on `/srv/tenants/slot2`

Upload the release tar to `/tmp/rutatramite-<id>.tar` and `scripts/activate_release.sh` to `/tmp/rutatramite-activate.sh` (helper `put` / `exec` if you already use them). Then on the VPS:

```bash
bash -n /tmp/rutatramite-activate.sh
bash /tmp/rutatramite-activate.sh /tmp/rutatramite-<id>.tar <sha256-from-manifest>
```

The script checks the SHA-256, extracts to `/srv/tenants/slot2/releases/<utc-stamp>`, atomically retargets `/srv/tenants/slot2/app`, restarts only `slot2-app.service`, and curls `http://127.0.0.1:8100/` plus `/sitemap.xml` with `Host: rutatramite.com`. On HTTP failure it rolls the symlink back. It does not restart Caddy or other tenants.

Success line: `ACTIVE=/srv/tenants/slot2/releases/<stamp>`.

Optional private preview (does not switch live `app`): `scripts/check_release.sh` with the same `/tmp/rutatramite-*.tar` + SHA-256; look for `PREVIEW_OK`.

## D — After activate (indexing plumbing, not GSC scores)

```bash
python3 scripts/audit_site.py --base https://rutatramite.com --output docs/audit-production-after.json
NEXT_PUBLIC_SITE_URL=https://rutatramite.com npm run indexnow
```

Check live: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/.well-known/ai.txt`, `/b7e4c91a0f3d28e65a1c47b90d2e8f36.txt`. Re-submit `https://rutatramite.com/sitemap.xml` in GSC if needed. IndexNow pings Bing/others; Google remains sitemap + GSC.
