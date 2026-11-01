#!/usr/bin/env python3
"""Pre-deploy guard (2026-10-31). Run from the worktree root BEFORE building.
1. Tree match: every file in data/ content/ public/ of the ACTIVE release must exist locally
   (a missing file means we would deploy from an older tree -> ABORT). Changed files are listed.
2. Sitemap superset: the candidate public/sitemap.xml must contain every <loc> of the active one.
Remote access only via /workspace/vps_ssh.py (no credentials read here).
Exit 0 = OK, 1 = ABORT.
"""
import hashlib, json, re, subprocess, sys
from pathlib import Path

ROOT = Path.cwd()
DIRS = ("data", "content", "public")
GENERATED = {"public/sitemap.xml", "public/llms.txt", "public/llms-full.txt"}
LOC = re.compile(r"<loc>([^<]+)</loc>")

def remote(cmd: str) -> str:
    r = subprocess.run(["python3", "/workspace/vps_ssh.py", cmd], capture_output=True, text=True, timeout=200)
    if r.returncode != 0:
        print("ABORT: remote command failed:", r.stderr.strip()[:300]); sys.exit(1)
    return r.stdout

def main() -> int:
    active = remote("sudo readlink -f /srv/tenants/slot2/app").strip()
    print("active release:", active)
    listing = remote(f"sudo bash -c 'cd {active} && find {' '.join(DIRS)} -type f -exec md5sum {{}} +'")
    rem = {}
    for line in listing.splitlines():
        h, _, p = line.partition("  ")
        if p: rem[p] = h
    missing, changed = [], []
    for p, h in sorted(rem.items()):
        f = ROOT / p
        if not f.exists():
            missing.append(p)
        elif hashlib.md5(f.read_bytes()).hexdigest() != h and p not in GENERATED:
            changed.append(p)
    local = {str(f.relative_to(ROOT)) for d in DIRS for f in (ROOT / d).rglob("*") if f.is_file()}
    added = sorted(local - set(rem))
    print(f"remote files {len(rem)} | missing locally {len(missing)} | changed {len(changed)} | new {len(added)}")
    for p in changed[:40]: print("  changed:", p)
    for p in added[:40]: print("  new:", p)
    ok = True
    if missing:
        ok = False
        print("ABORT: files present in the active release but missing locally (stale tree):")
        for p in missing[:60]: print("  missing:", p)
    live_sm = remote(f"sudo cat {active}/public/sitemap.xml")
    live = set(LOC.findall(live_sm)); cand = set(LOC.findall((ROOT / "public/sitemap.xml").read_text()))
    lost = sorted(live - cand)
    print(f"sitemap live {len(live)} | candidate {len(cand)} | lost {len(lost)}")
    if lost:
        ok = False
        print("ABORT: candidate sitemap drops live URLs:"); [print("  lost:", u) for u in lost[:60]]
    Path("/tmp/predeploy_check.json").write_text(json.dumps({"active": active, "missing": missing, "changed": changed, "new": added, "lost": lost}, indent=1))
    print("PREDEPLOY", "OK" if ok else "ABORT")
    return 0 if ok else 1

if __name__ == "__main__":
    sys.exit(main())
