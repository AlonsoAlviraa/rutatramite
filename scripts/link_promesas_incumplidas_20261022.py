"""22-10-2026 · Enlace a /elecciones/promesas-incumplidas desde programas-electorales-29n (idempotente). Ejecutar al final de la cadena."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text(); a, b = span(s, "/elecciones/programas-electorales-29n"); g = json.loads(s[a:b])
L = {"href": "/elecciones/promesas-incumplidas", "label": "¿Cumplieron sus promesas de 2023? Lo que pasó"}
if not any(x["href"] == L["href"] for x in g["related"]): g["related"].insert(0, L)
s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]; F.write_text(s); print("ok link incumplidas")
