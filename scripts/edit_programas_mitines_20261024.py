"""24-10-2026 · Propuestas del 23-10 (idempotente). Ejecutar al final de la cadena, después de edit_programas_mitines_20261023.py.
- /elecciones/programas-electorales-29n: fechas del cuerpo, FAQ y reviewedAt → 24 de octubre;
  PP: Feijóo en Valencia (23-10): rebaja del IRPF en 2027 y SMI sin IRPF por ley (pp.es); en la Cadena SER (23-10):
  Igualdad dentro de un ministerio con otras competencias (SER Comunicación) y reforma de la ley de eutanasia (Cadena SER).
  NO toca title, description ni H1 (test CTR 25-oct / 1-nov).
Comprobado el 24-10: ningún partido ha publicado su programa completo para el 29-N."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
PPES = {"label": "pp.es, 23-10-2026: Feijóo, rebaja del IRPF en 2027 (mitin en Valencia)", "href": "https://www.pp.es/actualidad/articulos/feijoo-asegura-que-en-2027-habra-una-rebaja-del-irpf-para-que-la-inflacion-y-los-impuestos-no-se-coman-el-salario-de-los-espanoles/"}
SERC = {"label": "SER Comunicación, 23-10-2026: resumen oficial de la entrevista a Feijóo", "href": "https://www.sercomunicacion.com/aimar-bretos-entrevista-a-alberto-nunez-feijoo-en-hoy-por-hoy/"}
SER = {"label": "Cadena SER, 23-10-2026: entrevista a Feijóo en Hoy por Hoy", "href": "https://cadenaser.com/nacional/2026/10/23/feijoo-no-descarta-gobernar-con-vox-si-los-espanoles-me-mandan-dar-estabilidad-con-la-tercera-fuerza-politica-asi-lo-hare-cadena-ser/"}
D = "24 de octubre"
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
def bump(t):
    for a, b in [("a 23 de octubre de 2026", f"a {D} de 2026"), ("A 23 de octubre de 2026", f"A {D} de 2026"),
                 ("a fecha de 23 de octubre", f"a fecha de {D}"), ("A 23 de octubre,", f"A {D},"),
                 ("Estado a 23 de octubre", f"Estado a {D}"), ("Lo comprobamos el 23 de octubre", f"Lo comprobamos el {D}"),
                 ("a 23 de octubre el partido", f"a {D} el partido")]:
        t = t.replace(a, b)
    return t
def add_row(sec, topic_after, cells, src):
    rows = sec["table"]["rows"]
    if any(r["cells"][1] == cells[1] for r in rows): return
    idx = [n for n, r in enumerate(rows) if r["cells"][0] == topic_after]
    rows.insert((max(idx) + 1) if idx else len(rows), {"cells": cells, "source": src})
def programas(g):
    keep = (g["title"], g["description"], g["h1"])
    g["reviewedAt"] = "2026-10-24"
    g["lead"] = bump(g["lead"])
    for x in g["sections"]:
        x["title"] = bump(x["title"])
        x["paragraphs"] = [bump(p) for p in x.get("paragraphs", [])]
        if "lists" in x: x["lists"] = [[bump(i) for i in l] for l in x["lists"]]
    sec = {x["id"]: x for x in g["sections"]}
    pp = sec["pp"]
    if "Valencia (23-10)" not in pp["paragraphs"][0]:
        pp["paragraphs"][0] = pp["paragraphs"][0].rstrip() + " Mitin en Valencia (23-10) y entrevista en Hoy por Hoy, de la Cadena SER."
    V = "Feijóo, mitin en el Palau de les Arts de Valencia, 23-10-2026"
    S = "Feijóo, entrevista en Hoy por Hoy (Cadena SER), 23-10-2026"
    add_row(pp, "Impuestos", ["Impuestos", "Rebajar el IRPF en 2027 «para que la inflación y los impuestos no se coman el salario de los españoles» y fijar por ley que quien cobre el salario mínimo no pague IRPF: «El umbral subirá automáticamente cada vez que suba el Salario Mínimo». Hoy quien solo cobra el SMI ya paga 0 € de IRPF por una deducción de 590,89 €.", V], PPES)
    add_row(pp, "Sanidad", ["Sanidad", "Reformar la ley de eutanasia para reforzar las garantías médicas, sin comprometerse a derogarla: «La muerte digna es un concepto con el que estoy de acuerdo».", S], SER)
    add_row(pp, "Otros: instituciones", ["Otros: instituciones", "Menos ministerios e Igualdad integrada en un ministerio con otras competencias: «Yo no voy a mantener 22 ministerios». Precisó que no elimina las políticas de igualdad.", S], SERC)
    for f in g["faqs"]:
        f["a"] = bump(f["a"])
        if f["q"].startswith("¿Qué han propuesto") and "Valencia, 23-10" not in f["a"]:
            o1 = "(plan de vivienda publicado el 22-10) y bajar el IRPF y un IVA"
            assert o1 in f["a"], "FAQ PP"
            f["a"] = f["a"].replace(o1, "(plan de vivienda publicado el 22-10), bajar el IRPF en 2027 y que el salario mínimo no pague IRPF por ley (Valencia, 23-10) y un IVA")
    for y in (PPES, SERC, SER):
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
    assert (g["title"], g["description"], g["h1"]) == keep and "A 18 de octubre" in g["description"]
edit("/elecciones/programas-electorales-29n", programas)
F.write_text(s); print("ok 24-10: programas (PP IRPF 2027/SMI, Igualdad, eutanasia)")
