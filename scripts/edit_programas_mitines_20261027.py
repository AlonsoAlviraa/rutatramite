"""27-10-2026 · Propuestas del 26-10 (idempotente). Ejecutar al final de la cadena, después de edit_programas_mitines_20261026.py.
- /elecciones/programas-electorales-29n: fechas del cuerpo, FAQ y reviewedAt → 27 de octubre; actos revisados del 26-10
  (PSOE Gijón, PP declaraciones a Vozpópuli, Vox Talavera de la Reina, FA carta sobre la IA). NO toca title, description ni H1
  (test CTR 25-oct / 1-nov). Comprobado el 27-10: ningún partido ha publicado su programa completo para el 29-N."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
EP = {"label": "Europa Press, 26-10-2026: Sánchez en Gijón", "href": "https://www.europapress.es/nacional/noticia-sanchez-promete-reformara-constitucion-blindar-subida-pensiones-conforme-ipc-20261026195312.html"}
VP = {"label": "Vozpópuli, 26-10-2026: Feijóo y la vicepresidencia de vivienda", "href": "https://www.vozpopuli.com/espana/politica/feijoo-elevara-la-vivienda-a-una-vicepresidencia-estrategica-y-nombrara-un-mando-unico-si-gobierna.html"}
ED = {"label": "elDiario.es, 26-10-2026: carta de Colau a los candidatos", "href": "https://www.eldiario.es/politica/colau-pide-carta-feijoo-sanchez-abascal-comprometan-no-ia-manera-vejatoria-campana_1_13616697.html"}
ABC = {"label": "ABC, 26-10-2026: Vox presenta candidatos en Talavera de la Reina", "href": "https://www.abc.es/espana/vox-presenta-talavera-reina-candidatos-elecciones-generales-20261026190136-nt.html"}
D = "27 de octubre"
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
def bump(t):
    for a, b in [("a 26 de octubre de 2026", f"a {D} de 2026"), ("A 26 de octubre de 2026", f"A {D} de 2026"),
                 ("a fecha de 26 de octubre", f"a fecha de {D}"), ("A 26 de octubre,", f"A {D},"),
                 ("Estado a 26 de octubre", f"Estado a {D}"), ("Lo comprobamos el 26 de octubre", f"Lo comprobamos el {D}"),
                 ("a 26 de octubre el partido", f"a {D} el partido")]:
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
    g["reviewedAt"] = "2026-10-27"
    g["lead"] = bump(g["lead"])
    for x in g["sections"]:
        x["title"] = bump(x["title"])
        x["paragraphs"] = [bump(p) for p in x.get("paragraphs", [])]
        if "lists" in x: x["lists"] = [[bump(i) for i in l] for l in x["lists"]]
    sec = {x["id"]: x for x in g["sections"]}
    acto(sec["pp"], "Vozpópuli (26-10)", ". Declaraciones a Vozpópuli (26-10): la vivienda irá a una vicepresidencia con «mando único».")
    acto(sec["psoe"], "Gijón (26-10)", ". Mitin en Gijón (26-10): reforma constitucional para blindar las pensiones y su subida con el IPC.")
    acto(sec["vox"], "Talavera de la Reina (26-10)", ". Presentación de candidatos en Talavera de la Reina (26-10), sin medidas nuevas.")
    acto(sec["frente-amplio"], "IA (26-10)", ", y carta de Colau a los demás candidatos sobre el uso de la IA (26-10).")
    add_row(sec["psoe"], "Pensiones", ["Pensiones", "Sánchez prometió: «La próxima legislatura reformaremos la Constitución para blindar las pensiones y su revalorización conforme al IPC». Hoy esa subida está en una ley (Ley 21/2021); reformar la Constitución exige tres quintos de cada Cámara (210 diputados).", "Pedro Sánchez, mitin en Gijón, 26-10-2026"], EP)
    add_row(sec["pp"], "Vivienda", ["Vivienda", "Llevar la vivienda a una vicepresidencia del Gobierno con un «mando único» sobre todos los ministerios: «No será una ventanilla donde informar, no, será un mando único indiscutible». La primera Conferencia de Presidentes se dedicaría al millón de viviendas.", "Alberto Núñez Feijóo, declaraciones a Vozpópuli, 26-10-2026"], VP)
    add_row(sec["frente-amplio"], "Sanidad", ["Otros: instituciones", "«Hay que regular legalmente el uso de la inteligencia artificial en campañas electorales». Mientras, pidió a PP, PSOE y Vox un acuerdo para no usar IA «vejatoria» ni suplantar identidades.", "Ada Colau, carta a los candidatos, 26-10-2026"], ED)
    for f in g["faqs"]:
        f["a"] = bump(f["a"])
        if f["q"].startswith("¿Qué han propuesto") and "vicepresidencia" not in f["a"]:
            reps = [("mejorar el mínimo familiar del IRPF (Vigo, 24-10) y un IVA del 0 % en alimentos básicos;",
                     "mejorar el mínimo familiar del IRPF (Vigo, 24-10), un IVA del 0 % en alimentos básicos y una vicepresidencia de vivienda con «mando único» (Vozpópuli, 26-10);"),
                    ("y reformar la Constitución para blindar el aborto (Burgos, 21-10);",
                     "y reformar la Constitución para blindar el aborto (Burgos, 21-10) y las pensiones con el IPC (Gijón, 26-10);"),
                    ("y más impuestos a los especuladores de vivienda (Móstoles, 25-10);",
                     "y más impuestos a los especuladores de vivienda (Móstoles, 25-10), y regular por ley la IA en campaña (carta de Colau, 26-10);")]
            for a, b in reps:
                assert a in f["a"], a[:40]
                f["a"] = f["a"].replace(a, b)
    for y in (EP, VP, ED, ABC):
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
    assert (g["title"], g["description"], g["h1"]) == keep and "A 18 de octubre" in g["description"]
edit("/elecciones/programas-electorales-29n", programas)
F.write_text(s); print("ok 27-10: programas (PSOE Gijón, PP Vozpópuli, Vox Talavera, FA IA)")
