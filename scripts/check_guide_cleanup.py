"""Public HTML checks for the shared guide/footer cleanup."""
import json
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_script = False
        self.in_footer = False
        self.visible = []
        self.footer = []
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.in_script = True
        if tag == "footer":
            self.in_footer = True
        if tag == "a":
            self.hrefs.append(dict(attrs).get("href"))

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.in_script = False
        if tag == "footer":
            self.in_footer = False

    def handle_data(self, data):
        if not self.in_script:
            self.visible.append(data)
            if self.in_footer:
                self.footer.append(data)

reports = []
for path in ("/modelo-baja-voluntaria", "/dni/cita-previa", "/comedor/t16-como-solicitar", "/"):
    page = Page()
    with urlopen("https://rutatramite.com" + path, timeout=30) as response:
        page.feed(response.read().decode())
    visible = " ".join(page.visible)
    footer = " ".join(page.footer)
    checks = {
        "no_related_filler": "Guía relacionada en RutaTrámite." not in visible,
        "footer_has_no_padron_notice": "El padrón lo gestiona" not in footer,
        "footer_independence": "No somos Administración Pública" in footer,
    }
    if path == "/modelo-baja-voluntaria":
        checks["no_self_recommendation"] = page.hrefs.count(path) == 0
        checks["model_source_context"] = "antes de adaptar y utilizar el modelo" in visible
        checks["no_padron_notice"] = "El padrón lo gestiona" not in visible
    if path == "/comedor/t16-como-solicitar":
        checks["no_dni_fallback"] = "La cita de DNI y pasaporte se pide" not in visible
    reports.append({"path": path, "checks": checks})

report = {"checked_at": datetime.now(timezone.utc).isoformat(), "pages": reports}
Path("docs/guide-cleanup-public-smoke.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False))
assert all(all(item["checks"].values()) for item in reports), reports
