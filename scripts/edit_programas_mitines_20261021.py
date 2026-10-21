"""21-10-2026 · Mítines del 20-10 (idempotente). Ejecutar al final de la cadena, después de edit_programas_mitines_20261020.py.
- /elecciones/programas-electorales-29n: fechas del cuerpo, FAQ y reviewedAt → 21 de octubre; Vox: acto de Ponferrada (20-10):
  «prioridad nacional» en ayudas sociales, ayudas al alquiler y plazas de guardería (voxespana.es) y pensiones «se van a pagar
  como sea» (RTVE). NO toca title, description ni H1 (test CTR 25-oct / 1-nov).
Comprobado el 21-10: ningún partido ha publicado su programa completo para el 29-N (Onda Cero 21-10, comparadores en «pendiente»)."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
VOXW = {"label": "voxespana.es, 20-10-2026: acto de Ponferrada (web oficial)", "href": "https://www.voxespana.es/abascal/abascal-denuncia-que-sanchez-pretender-dirigir-espana-como-si-fuera-una-dictadura-y-llama-a-llenar-las-urnas-el-29n-20261020"}
RTVE = {"label": "RTVE, 20-10-2026: Abascal en Ponferrada", "href": "https://www.rtve.es/noticias/20261020/abascal-critica-feijoo-pedir-sacrificios/17275702.shtml"}
D21 = "21 de octubre"
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
def bump(t):
    for a, b in [("a 20 de octubre de 2026", f"a {D21} de 2026"), ("A 20 de octubre de 2026", f"A {D21} de 2026"),
                 ("a fecha de 20 de octubre", f"a fecha de {D21}"), ("A 20 de octubre,", f"A {D21},"),
                 ("Estado a 20 de octubre", f"Estado a {D21}"), ("Lo comprobamos el 20 de octubre", f"Lo comprobamos el {D21}")]:
        t = t.replace(a, b)
    return t
def programas(g):
    keep = (g["title"], g["description"], g["h1"])
    g["reviewedAt"] = "2026-10-21"
    g["lead"] = bump(g["lead"])
    for x in g["sections"]:
        x["title"] = bump(x["title"])
        x["paragraphs"] = [bump(p) for p in x.get("paragraphs", [])]
        if "lists" in x: x["lists"] = [[bump(i) for i in l] for l in x["lists"]]
    for f in g["faqs"]:
        f["a"] = bump(f["a"])
        if f["q"].startswith("¿Qué han propuesto") and "plazas de guardería" not in f["a"]:
            old = "Vox, garantizar el pago de las pensiones y repatriar a quien entra de forma irregular"
            assert old in f["a"], "FAQ Vox no encontrada"
            f["a"] = f["a"].replace(old, old + " y dar prioridad a los españoles en ayudas al alquiler y plazas de guardería (Ponferrada, 20-10)")
    vx = next(x for x in g["sections"] if x["id"] == "vox")
    vx["paragraphs"][0] = vx["paragraphs"][0].replace("mitin en Estepona (11-10) y comparecencia en Ceuta (12-10).", "mitin en Estepona (11-10), comparecencia en Ceuta (12-10) y acto en Ponferrada (20-10).")
    rows = vx["table"]["rows"]
    if not any("plazas de guardería" in r["cells"][1] for r in rows):
        k = max(n for n, r in enumerate(rows) if r["cells"][0] == "Vivienda") + 1
        rows.insert(k, {"cells": ["Vivienda", "Abascal reclamó que los españoles sean «los primeros» en recibir ayudas sociales, ayudas al alquiler y plazas de guardería («prioridad nacional»).", "Abascal, acto de precampaña en Ponferrada (León), 20-10-2026"], "source": VOXW})
    if not any("Ponferrada" in r["cells"][2] and r["cells"][0] == "Pensiones" for r in rows):
        k = max(n for n, r in enumerate(rows) if r["cells"][0] == "Pensiones") + 1
        rows.insert(k, {"cells": ["Pensiones", "Abascal dijo que «las pensiones se van a pagar como sea, de la manera que sea» y negó que Vox quiera privatizarlas.", "Abascal, acto de precampaña en Ponferrada (León), 20-10-2026"], "source": RTVE})
    for y in (VOXW, RTVE):
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
    assert (g["title"], g["description"], g["h1"]) == keep and "A 18 de octubre" in g["description"]
edit("/elecciones/programas-electorales-29n", programas)
F.write_text(s); print("ok 21-10: programas (Vox Ponferrada)")
