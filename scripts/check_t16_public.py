"""Confirm the published T-16 corrections and INE source destination."""
import json
from datetime import datetime, timezone
from html import unescape
from pathlib import Path
from urllib.request import urlopen

base = "https://rutatramite.com"
with urlopen(base + "/comedor/t16-como-solicitar", timeout=30) as response:
    guide = unescape(response.read().decode())
    guide_status = response.status
with urlopen(base + "/fuentes", timeout=30) as response:
    sources = unescape(response.read().decode())
    sources_status = response.status
checks = {
    "age_and_expiry": "desde los 4 años hasta seis meses después de cumplir los 16" in guide,
    "online_application": "puede tramitarla online" in guide,
    "child_attendance_optional": "El menor no tiene que asistir" in guide,
    "support_cost": "emitir la tarjeta cuesta 4,50" in guide,
    "specific_official_link": "t-mobilitat/bonificaciones-y-descuentos/t-16-t-jove" in guide,
    "review_date": "2026-09-07" in guide,
    "no_language_claim": "solo se publica en catalán" not in guide,
    "ine_corrected": "INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177031&idp=1254735976614&menu=ultiDatos" in sources,
}
report = {"checked_at": datetime.now(timezone.utc).isoformat(), "url": base,
          "status": {"guide": guide_status, "sources": sources_status}, "checks": checks}
Path("docs/t16-public-smoke.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False))
assert all(checks.values()), checks
