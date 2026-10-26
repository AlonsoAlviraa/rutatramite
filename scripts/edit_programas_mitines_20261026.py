"""26-10-2026 · Propuestas del 25-10 y documento de Vox (idempotente). Ejecutar al final de la cadena, después de edit_programas_mitines_20261025.py.
- /elecciones/programas-electorales-29n: fechas del cuerpo, FAQ y reviewedAt → 26 de octubre; actos revisados del 25-10
  (PP Salamanca, PSOE entrevista en El País, FA Móstoles); Vox: documento «Recuperar España» (remesas, burka y niqab,
  IMV, impuestos cero a la primera vivienda); FA: impuestos a especuladores de vivienda. NO toca title, description ni H1
  (test CTR 25-oct / 1-nov). Comprobado el 26-10: ningún partido ha publicado su programa completo para el 29-N."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
VOX = {"label": "voxespana.es: documento «Recuperar España» (PDF, octubre de 2026)", "href": "https://www.voxespana.es/wp-content/uploads/2026/10/RECUPERAR-ESPANA-A4.pdf"}
EP = {"label": "Europa Press, 25-10-2026: mitin de Frente Amplio en Móstoles", "href": "https://www.europapress.es/nacional/noticia-colau-llama-llenar-calles-poner-cuerpo-frente-politicos-solo-usan-piquito-oro-20261025140652.html"}
GAC = {"label": "La Gaceta de Salamanca, 25-10-2026: acto de Feijóo en Salamanca", "href": "https://www.lagacetadesalamanca.es/salamanca/feijoo-lanza-salamanca-promesa-cambio-impuestos-millon-20261025132329-nt.html"}
D = "26 de octubre"
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
def bump(t):
    for a, b in [("a 25 de octubre de 2026", f"a {D} de 2026"), ("A 25 de octubre de 2026", f"A {D} de 2026"),
                 ("a fecha de 25 de octubre", f"a fecha de {D}"), ("A 25 de octubre,", f"A {D},"),
                 ("Estado a 25 de octubre", f"Estado a {D}"), ("Lo comprobamos el 25 de octubre", f"Lo comprobamos el {D}"),
                 ("a 25 de octubre el partido", f"a {D} el partido")]:
        t = t.replace(a, b)
    return t
def add_row(sec, topic_after, cells, src):
    rows = sec["table"]["rows"]
    if any(r["cells"][1] == cells[1] for r in rows): return
    idx = [n for n, r in enumerate(rows) if r["cells"][0] == topic_after]
    rows.insert((max(idx) + 1) if idx else len(rows), {"cells": cells, "source": src})
def acto(sec, mark, text):
    if mark not in sec["paragraphs"][0]:
        sec["paragraphs"][0] = sec["paragraphs"][0].rstrip().rstrip(".") + text
def programas(g):
    keep = (g["title"], g["description"], g["h1"])
    g["reviewedAt"] = "2026-10-26"
    g["lead"] = bump(g["lead"])
    for x in g["sections"]:
        x["title"] = bump(x["title"])
        x["paragraphs"] = [bump(p) for p in x.get("paragraphs", [])]
        if "lists" in x: x["lists"] = [[bump(i) for i in l] for l in x["lists"]]
    sec = {x["id"]: x for x in g["sections"]}
    acto(sec["pp"], "Salamanca (25-10)", ". Acto en Salamanca con los cabezas de lista (25-10): bajada «inmediata» de impuestos a los trabajadores, un millón de viviendas y pensiones, sin cifras nuevas.")
    acto(sec["psoe"], "El País (25-10)", ". Entrevista a Sánchez en El País (25-10), sin medidas nuevas.")
    acto(sec["vox"], "Recuperar España", ". Documento «Recuperar España» en voxespana.es (octubre), de 6 páginas: resume sus prioridades, no es el programa electoral.")
    acto(sec["frente-amplio"], "Móstoles (25-10)", ", y mitin en Móstoles (25-10).")
    add_row(sec["vox"], "Impuestos", ["Impuestos", "Un impuesto sobre las remesas, el dinero que se envía al extranjero: «el dinero generado en España ha de redundar en mejores servicios aquí». No concreta el tipo.", "Documento «Recuperar España» (octubre de 2026)"], VOX)
    add_row(sec["vox"], "Vivienda", ["Vivienda", "«Impuestos cero a tu primera vivienda», junto con liberar suelo e invertir en vivienda protegida. No detalla qué impuestos (hoy, ITP en vivienda usada o IVA del 10 % en nueva).", "Documento «Recuperar España» (octubre de 2026)"], VOX)
    add_row(sec["vox"], "Inmigración", ["Inmigración", "Que el Ingreso Mínimo Vital sea «solo para los españoles necesitados» (hoy pueden pedirlo extranjeros con un año de residencia legal) y prohibir el burka y el niqab en espacios públicos.", "Documento «Recuperar España» (octubre de 2026)"], VOX)
    add_row(sec["frente-amplio"], "Vivienda", ["Vivienda", "«Freír a impuestos a los especuladores» de vivienda y expropiar pisos a fondos buitre. No detalló qué impuestos ni el procedimiento.", "Toni Valero (IU, n.º 3 por Madrid), mitin en Móstoles, 25-10-2026"], EP)
    for f in g["faqs"]:
        f["a"] = bump(f["a"])
        if f["q"].startswith("¿Qué han propuesto") and "remesas" not in f["a"]:
            reps = [("y vivienda para quien trabaja en Ibiza y Formentera (Ibiza, 24-10);",
                     "y vivienda para quien trabaja en Ibiza y Formentera (Ibiza, 24-10), y un impuesto a las remesas e «impuestos cero» a la primera vivienda (documento «Recuperar España»);"),
                    ("con jubilación como máximo a los 65 años (Madrid, 24-10);",
                     "con jubilación como máximo a los 65 años (Madrid, 24-10) y más impuestos a los especuladores de vivienda (Móstoles, 25-10);")]
            for a, b in reps:
                assert a in f["a"], a[:40]
                f["a"] = f["a"].replace(a, b)
    for y in (VOX, EP, GAC):
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
    assert (g["title"], g["description"], g["h1"]) == keep and "A 18 de octubre" in g["description"]
edit("/elecciones/programas-electorales-29n", programas)
F.write_text(s); print("ok 26-10: programas (Vox Recuperar España, FA Móstoles, PP Salamanca, PSOE El País)")
