"""Verify the published flight-document correction."""
import json
import re
from pathlib import Path
from urllib.request import urlopen

with urlopen("https://rutatramite.com/dni/perdido-volar", timeout=30) as response:
    html = response.read().decode()
    status = response.status
html = re.sub(r"<script\b[^>]*>[\s\S]*?</script>", "", html, flags=re.I)
checks = {
    "status_200": status == 200,
    "report_not_identification": "La denuncia de pérdida o robo no acredita" in html,
    "nationality_scope": "personas de nacionalidad española" in html,
    "no_report_and_photo_claim": "algunas la denuncia más otro documento" not in html,
    "no_blanket_passport_claim": "sin pasaporte no hay embarque" not in html,
    "current_aviation_source": "BOE-A-2026-814" in html,
    "aena_source": "aena.es/es/pasajeros/documentacion-visados/documentacion-para-viajar.html" in html,
    "review_date": "2026-09-07" in html,
}
Path("docs/lost-dni-public-smoke.json").write_text(json.dumps(checks, indent=2), encoding="utf-8")
print(json.dumps(checks))
assert all(checks.values()), checks
