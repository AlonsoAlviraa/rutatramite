"""Check published institutional copy, headings and navigation."""
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen

checks = {}
for name in ("privacidad", "contacto", "metodologia", "fuentes", "aviso-legal"):
    with urlopen(f"https://rutatramite.com/{name}", timeout=30) as response:
        html = response.read().decode()
    # Next embeds the translation dictionary in scripts, including unused notices.
    # Check rendered markup rather than treating that dictionary as page content.
    html = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", "", html, flags=re.I)
    page = {"status_200": response.status == 200,
            "no_padron_notice": "El padrón lo gestiona cada Ayuntamiento. Contrasta siempre" not in html,
            "no_internal_jargon": all(term not in html for term in ("client-side", "typeahead", "uploads", "source_urls", "sample verificado", "Dominio canónico en el marcado"))}
    if name in ("contacto", "aviso-legal"):
        page["email_link"] = 'href="mailto:hola@rutatramite.com"' in html
    if name in ("privacidad", "fuentes", "aviso-legal"):
        page["contact_link"] = 'href="/contacto"' in html
    if name != "aviso-legal":
        page["section_headings"] = "<h2" in html
    checks[name] = page
report = {"checked_at": datetime.now(timezone.utc).isoformat(), "checks": checks}
Path("docs/institutional-public-smoke.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False))
assert all(all(page.values()) for page in checks.values()), checks
