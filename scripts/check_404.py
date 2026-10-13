"""Check missing-route status, metadata and recovery UI across route families."""
import json
import re
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import urlopen
from audit_site import Page

paths = ["/ruta-inexistente-auditoria", "/dni/ruta-inexistente-auditoria",
         "/becas/ruta-inexistente-auditoria", "/empadronarse/ruta-inexistente-auditoria",
         "/empadronarse/comunidad-de-madrid/madrid/ruta-inexistente-auditoria"]
results = []
for path in paths:
    try:
        response = urlopen("https://rutatramite.com" + path, timeout=20)
    except HTTPError as error:
        response = error
    html = response.read().decode()
    html = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", "", html, flags=re.I)
    page = Page()
    page.feed(html)
    checks = {"http_404": response.code == 404,
              "noindex": "noindex" in page.meta.get("robots", ""),
              "single_h1": len(page.h1) == 1,
              "search_loading_state": "Cargando buscador" in html,
              "directory_link": 'href="/#tramites"' in html}
    results.append({"path": path, "checks": checks, "canonicals": page.canonicals,
                    "title": page.title})
Path("docs/404-public-smoke.json").write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(results, ensure_ascii=False))
assert all(all(r["checks"].values()) for r in results), results
