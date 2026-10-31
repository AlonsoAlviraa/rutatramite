"""21-10-2026 · PP Sevilla (vivienda), idempotente. Ejecutar al final de la cadena, después de edit_programas_mitines_20261021.py.
/elecciones/programas-electorales-29n: filas de vivienda del PP (acto en Sevilla, 21-10) y mención en la FAQ. NO toca title/description/H1."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
PPW = {"label": "pp.es, 21-10-2026: acto sobre vivienda en Sevilla (web oficial)", "href": "https://www.pp.es/actualidad/articulos/feijoo-anuncia-deducciones-para-alquileres-y-aprobara-en-sus-cien-dias-las-leyes-para-construir-un-millon-de-viviendas-y-desalojar-okupas/"}
ELP = {"label": "El País, 21-10-2026: Feijóo en Sevilla (silencio administrativo y deducciones)", "href": "https://elpais.com/espana/2026-10-21/feijoo-propone-el-silencio-administrativo-positivo-en-90-dias-para-conceder-licencias-de-construccion.html"}
WHO = "Feijóo, acto sobre vivienda en Sevilla con Juanma Moreno, 21-10-2026"
ROWS = [
 ["Vivienda", "Feijóo prometió deducciones fiscales para inquilinos y propietarios que prorroguen el contrato de alquiler hasta tres años con subidas por debajo del IPC. La cuantía está sin concretar.", WHO, PPW],
 ["Vivienda", "Feijóo propuso el silencio administrativo positivo a los 90 días para las licencias de construcción y aprobar en los primeros 100 días la Ley del Suelo, una ley contra la ocupación (desalojo en 48 horas) y la reforma de la Ley de Propiedad Horizontal. Objetivo: un millón de viviendas en la legislatura.", WHO, PPW],
 ["Vivienda", "Para menores de 40 años: rebaja del 60 % del IVA y del ITP en la primera vivienda, avales de hasta el 100 %, aplazar esos impuestos mientras dure la hipoteca, «Hucha Hogar Joven» y bonificaciones en el IRPF los primeros cuatro años de cotización.", WHO, PPW],
]
a, b = span(s, "/elecciones/programas-electorales-29n"); g = json.loads(s[a:b])
keep = (g["title"], g["description"], g["h1"])
pp = next(x for x in g["sections"] if x["id"] == "pp")
if "Sevilla" not in pp["paragraphs"][0]:
    pp["paragraphs"][0] = pp["paragraphs"][0].replace("en Madrid (19-10).", "en Madrid (19-10) y acto sobre vivienda en Sevilla con Juanma Moreno (21-10).")
rows = pp["table"]["rows"]
for c0, c1, c2, src in ROWS:
    if not any(r["cells"][1] == c1 for r in rows):
        k = max(n for n, r in enumerate(rows) if r["cells"][0] == "Vivienda") + 1
        rows.insert(k, {"cells": [c0, c1, c2], "source": src})
for f in g["faqs"]:
    if f["q"].startswith("¿Qué han propuesto") and "Sevilla, 21-10" not in f["a"]:
        old = "el PP, una ley antiokupación con desalojo en 48 horas (Barcelona, 18-10)"
        assert old in f["a"]
        f["a"] = f["a"].replace(old, old + ", deducciones a quien prorrogue el alquiler con subidas por debajo del IPC y rebajas del IVA y el ITP a menores de 40 años (Sevilla, 21-10)")
for y in (PPW, ELP):
    if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
assert (g["title"], g["description"], g["h1"]) == keep
s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
F.write_text(s); print("ok PP Sevilla programas")
