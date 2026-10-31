"""22-10-2026 · Enlaces a caso Maricarmen y huelga 11-N desde el comparador de vivienda (idempotente). Ejecutar al final de la cadena de promesas."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text(); a, b = span(s, "/elecciones/promesas/que-propone-cada-partido-vivienda"); g = json.loads(s[a:b])
for L in ({"href": "/alquiler/caso-maricarmen-desahucio", "label": "Caso Maricarmen: qué pasó y qué cambió para los inquilinos"}, {"href": "/trabajo/huelga-general-11-noviembre", "label": "Huelga general del 11-N: tus derechos"}):
    if not any(x["href"] == L["href"] for x in g["related"]): g["related"].insert(0, L)
s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]; F.write_text(s); print("ok link maricarmen/huelga")
