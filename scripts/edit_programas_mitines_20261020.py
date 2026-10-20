"""20-10-2026 · Mítines del 19-10 (idempotente). Ejecutar al final de la cadena, después de edit_podemos_5p_20261019.py.
- /elecciones/programas-electorales-29n: fechas del cuerpo, FAQ y reviewedAt → 20 de octubre; PSOE: Sánchez en Valladolid
  (19-10, RTVE): subir el SMI «año a año» mientras gobierne. NO toca title, description ni H1 (test CTR 25-oct / 1-nov).
- /elecciones/salario-minimo-1800-euros: qué dice el PSOE del SMI (sin cifra) y FAQ. Title/description sin tocar (test del 19-10).
Comprobado el 20-10: ningún partido ha publicado su programa completo para el 29-N."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
RTVE = {"label": "RTVE, 19-10-2026: Sánchez promete que subirá el salario mínimo «todos los años»", "href": "https://www.rtve.es/noticias/20261019/sanchez-promete-subira-salario-minimo-todos-anos/17273693.shtml"}
D20 = "20 de octubre"
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
def bump(t):
    for a, b in [("a 19 de octubre de 2026", f"a {D20} de 2026"), ("A 19 de octubre de 2026", f"A {D20} de 2026"),
                 ("a fecha de 19 de octubre", f"a fecha de {D20}"), ("A 19 de octubre,", f"A {D20},"),
                 ("Estado a 19 de octubre", f"Estado a {D20}"), ("Lo comprobamos el 19 de octubre", f"Lo comprobamos el {D20}")]:
        t = t.replace(a, b)
    return t
def programas(g):
    keep = (g["title"], g["description"], g["h1"])
    g["reviewedAt"] = "2026-10-20"
    g["lead"] = bump(g["lead"])
    for x in g["sections"]:
        x["title"] = bump(x["title"])
        x["paragraphs"] = [bump(p) for p in x.get("paragraphs", [])]
        if "lists" in x: x["lists"] = [[bump(i) for i in l] for l in x["lists"]]
    for f in g["faqs"]:
        f["a"] = bump(f["a"])
        if f["q"].startswith("¿Qué han propuesto") and "salario mínimo cada año" not in f["a"]:
            old = "el PSOE, mantener los decretos de vivienda y revalorizar las pensiones con el IPC"
            assert old in f["a"], "FAQ PSOE no encontrada"
            f["a"] = f["a"].replace(old, old + " y subir el salario mínimo cada año (Valladolid, 19-10)")
    ps = next(x for x in g["sections"] if x["id"] == "psoe")
    ps["paragraphs"][0] = ps["paragraphs"][0].replace("Zaragoza (14-10) y Fuenlabrada (17-10).", "Zaragoza (14-10), Fuenlabrada (17-10) y Valladolid (19-10).")
    rows = ps["table"]["rows"]
    if not any("año a año" in r["cells"][1] for r in rows):
        k = max(n for n, r in enumerate(rows) if r["cells"][0] == "Empleo y salarios") + 1
        rows.insert(k, {"cells": ["Empleo y salarios", "Sánchez se comprometió a subir el salario mínimo «año a año» mientras gobierne. No dio cifra ni calendario.", "Sánchez, mitin de precampaña en Valladolid, 19-10-2026"], "source": RTVE})
    if not any(y["href"] == RTVE["href"] for y in g["sources"]): g["sources"].append(RTVE)
    assert (g["title"], g["description"], g["h1"]) == keep and "A 18 de octubre" in g["description"]
def smi(g):
    keep = (g["title"], g["description"])
    g["reviewedAt"] = "2026-10-20"
    que = next(x for x in g["sections"] if x["id"] == "que")
    txt = "El PSOE no ha dado una cifra. El 19 de octubre de 2026, en un mitin en Valladolid, Pedro Sánchez se comprometió a subir el SMI «año a año» mientras gobierne, sin concretar cuánto ni cuándo (RTVE)."
    if not any("Valladolid" in p for p in que["paragraphs"]): que["paragraphs"].append(txt)
    for f in g["faqs"]:
        f["a"] = bump(f["a"])
        if f["q"].startswith("¿Proponen algo los demás partidos?"):
            f["a"] = ("A 20 de octubre, el PSOE se ha comprometido a subir el salario mínimo cada año mientras gobierne (Pedro Sánchez, Valladolid, 19-10-2026, según RTVE), sin dar cifra. "
                      "No hemos encontrado otra cifra de salario mínimo para el 29-N con fuente fechada. Lo que dice cada partido sobre empleo y salarios está en la comparativa de empleo.")
    for x in g["sections"]:
        x["paragraphs"] = [bump(p) for p in x.get("paragraphs", [])]
    if not any(y["href"] == RTVE["href"] for y in g["sources"]): g["sources"].append(RTVE)
    assert (g["title"], g["description"]) == keep
edit("/elecciones/programas-electorales-29n", programas)
edit("/elecciones/salario-minimo-1800-euros", smi)
F.write_text(s); print("ok 20-10: programas + smi")
