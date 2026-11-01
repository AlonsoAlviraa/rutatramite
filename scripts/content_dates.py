"""Fechas reales de contenido por URL para el <lastmod> del sitemap (31-10-2026).

Fuente: el dateModified que cada página declara en su propio JSON-LD (Article, Dataset,
WebPage...), que sale de reviewedAt/fechas de revisión del contenido. No se inventa nada:
si una página no declara dateModified, no recibe lastmod por esta vía.

  python3 scripts/content_dates.py --html .next/server/app   # tras un build: escribe data/sitemap-lastmod.json
  python3 scripts/content_dates.py --html .next/server/app --check   # solo avisa si el JSON está desfasado
"""
import argparse, json, re, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data/sitemap-lastmod.json"
DM = re.compile(r'"dateModified":"(\d{4}-\d{2}-\d{2})')

def from_html(d: Path):
    res = {}
    for f in d.rglob("*.html"):
        rel = f.relative_to(d).as_posix()[:-5]
        path = "/" if rel == "index" else "/" + rel
        if path.startswith("/_") or "/_" in path: continue
        dates = DM.findall(f.read_text(errors="ignore"))
        if dates: res[path] = max(dates)
    return dict(sorted(res.items()))

if __name__ == "__main__":
    ap = argparse.ArgumentParser(); ap.add_argument("--html", required=True); ap.add_argument("--check", action="store_true")
    a = ap.parse_args()
    cur = from_html(Path(a.html))
    old = json.loads(OUT.read_text()) if OUT.exists() else {}
    diff = {p: (old.get(p), v) for p, v in cur.items() if old.get(p) != v}
    if a.check:
        print(f"content_dates: {len(cur)} páginas con dateModified; {len(diff)} distintas del JSON" + ("" if not diff else " (regenera y redespliega: " + ", ".join(list(diff)[:5]) + ")"))
    else:
        OUT.write_text(json.dumps(cur, ensure_ascii=False, indent=0) + "\n"); print(f"escritas {len(cur)} fechas; {len(diff)} cambiadas")
