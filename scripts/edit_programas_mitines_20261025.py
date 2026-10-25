"""25-10-2026 · Propuestas del 24-10 (idempotente). Ejecutar al final de la cadena, después de edit_programas_mitines_20261024.py.
- /elecciones/programas-electorales-29n: fechas del cuerpo, FAQ y reviewedAt → 25 de octubre; actos revisados del 24-10;
  PP (Vigo): mínimo familiar del IRPF; FA (Madrid): pensión mínima = SMI y jubilación a los 65; Vox (Ibiza): vivienda Pitiusas;
  Podemos (Barcelona, con ERC): expropiar pisos a fondos buitre. NO toca title, description ni H1 (test CTR 25-oct / 1-nov).
Comprobado el 25-10: ningún partido ha publicado su programa completo para el 29-N."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
PPES = {"label": "pp.es, 24-10-2026: Feijóo, mitin en Vigo (mínimo familiar)", "href": "https://www.pp.es/actualidad/articulos/feijoo-se-compromete-a-mejorar-la-exencion-del-minimo-familiar-para-que-las-familias-con-hijos-paguen-menos-impuestos/"}
EP = {"label": "Europa Press, 24-10-2026: Frente Amplio, pensiones no inferiores al SMI y jubilación a los 65", "href": "https://www.europapress.es/nacional/noticia-frente-amplio-propone-ninguna-pension-debajo-smi-fijar-65-anos-edad-maxima-jubilacion-20261024130942.html"}
INF = {"label": "Infobae, 24-10-2026: coste y financiación del plan de pensiones de Frente Amplio", "href": "https://www.infobae.com/espana/2026/10/24/frente-amplio-presenta-su-plan-de-pensiones-jubilacion-a-los-65-anos-y-cuantia-minima-igual-al-smi/"}
SER = {"label": "Cadena SER (Radio Ibiza), 24-10-2026: acto de Vox en Ibiza", "href": "https://cadenaser.com/baleares/2026/10/24/vox-promete-vivienda-para-quien-trabaje-en-ibiza-en-el-acto-de-abascal-en-la-isla-radio-ibiza/"}
ELE = {"label": "El Español (con EFE), 24-10-2026: acto de Montero y Rufián en Barcelona", "href": "https://www.elespanol.com/espana/20261024/montero-rufian-llaman-someter-psoe-izquierda-primer-acto-frente/1003744433653_0.html"}
D = "25 de octubre"
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
def bump(t):
    for a, b in [("a 24 de octubre de 2026", f"a {D} de 2026"), ("A 24 de octubre de 2026", f"A {D} de 2026"),
                 ("a fecha de 24 de octubre", f"a fecha de {D}"), ("A 24 de octubre,", f"A {D},"),
                 ("Estado a 24 de octubre", f"Estado a {D}"), ("Lo comprobamos el 24 de octubre", f"Lo comprobamos el {D}"),
                 ("a 24 de octubre el partido", f"a {D} el partido")]:
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
    g["reviewedAt"] = "2026-10-25"
    g["lead"] = bump(g["lead"])
    for x in g["sections"]:
        x["title"] = bump(x["title"])
        x["paragraphs"] = [bump(p) for p in x.get("paragraphs", [])]
        if "lists" in x: x["lists"] = [[bump(i) for i in l] for l in x["lists"]]
    sec = {x["id"]: x for x in g["sections"]}
    acto(sec["pp"], "Vigo (24-10)", ". Mitin en Vigo (24-10).")
    acto(sec["psoe"], "Granada (24-10)", ", y acto en Granada (24-10), sin medidas nuevas respecto a las ya recogidas.")
    acto(sec["vox"], "Ibiza (24-10)", ", y actos en Palma e Ibiza (24-10).")
    acto(sec["frente-amplio"], "pensiones en Madrid (24-10)", ", y manifestación por las pensiones en Madrid (24-10).")
    acto(sec["podemos"], "Barcelona con ERC (24-10)", ", y acto conjunto en Barcelona con ERC (24-10).")
    add_row(sec["pp"], "Impuestos", ["Impuestos", "Mejorar la exención del mínimo familiar del IRPF para que las familias con hijos paguen menos: «Es lo lógico y necesario en este momento». No dio cuantías; hoy el mínimo por descendientes va de 2.400 € (primer hijo) a 4.500 € (cuarto y siguientes) al año.", "Feijóo, mitin en Vigo, 24-10-2026"], PPES)
    add_row(sec["vox"], "Vivienda", ["Vivienda", "Para Ibiza y Formentera: «Vivienda para quien trabaja aquí, liberar suelo, quitar impuestos y tasas al construir, y plazos cerrados para las licencias».", "Maribel Cerezo, cabeza de lista por Baleares, acto con Abascal en Ibiza, 24-10-2026"], SER)
    FAW = "Ada Colau y Emilio Delgado, manifestación por las pensiones, Madrid, 24-10-2026"
    add_row(sec["frente-amplio"], "Pensiones", ["Pensiones", "Que ninguna pensión esté por debajo del salario mínimo (1.221 € al mes en 14 pagas): «Si sube el SMI, lo lógico es que las pensiones suban al mismo ritmo y que ninguna esté por debajo». Coste según el partido: unos 10.000 millones al año, con un impuesto del 2 % a patrimonios de más de un millón y tributación mínima a grandes empresas.", FAW], EP)
    add_row(sec["frente-amplio"], "Pensiones", ["Pensiones", "Fijar en 65 años la edad máxima de jubilación. Coste según el partido: unos 10.000 millones al año, financiados quitando de forma progresiva el tope máximo de cotización y con una aportación de las empresas más automatizadas.", FAW], INF)
    add_row(sec["podemos"], "Vivienda", ["Vivienda", "Expropiar pisos a los fondos buitre «por miles, porque las casas son para vivir y no para hacer negocio». No detalló el procedimiento.", "Irene Montero, acto con Gabriel Rufián (ERC) en Barcelona, 24-10-2026"], ELE)
    for f in g["faqs"]:
        f["a"] = bump(f["a"])
        if f["q"].startswith("¿Qué han propuesto") and "Vigo, 24-10" not in f["a"]:
            reps = [("bajar el IRPF en 2027 y que el salario mínimo no pague IRPF por ley (Valencia, 23-10) y un IVA",
                     "bajar el IRPF en 2027 y que el salario mínimo no pague IRPF por ley (Valencia, 23-10), mejorar el mínimo familiar del IRPF (Vigo, 24-10) y un IVA"),
                    ("y «recuperar Ceuta al precio que sea» (Segovia, 22-10);",
                     "y «recuperar Ceuta al precio que sea» (Segovia, 22-10) y vivienda para quien trabaja en Ibiza y Formentera (Ibiza, 24-10);"),
                    ("y una prestación universal por crianza (Barcelona, 22-10);",
                     "y una prestación universal por crianza (Barcelona, 22-10) y que ninguna pensión baje del salario mínimo, con jubilación como máximo a los 65 años (Madrid, 24-10);"),
                    ("Podemos, la jornada de 30 horas semanales y un salario mínimo de 1.800 €;",
                     "Podemos, la jornada de 30 horas semanales, un salario mínimo de 1.800 € y expropiar pisos a fondos buitre (Barcelona, 24-10);")]
            for a, b in reps:
                assert a in f["a"], a[:40]
                f["a"] = f["a"].replace(a, b)
    for y in (PPES, EP, INF, SER, ELE):
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
    assert (g["title"], g["description"], g["h1"]) == keep and "A 18 de octubre" in g["description"]
edit("/elecciones/programas-electorales-29n", programas)
F.write_text(s); print("ok 25-10: programas (PP Vigo, FA pensiones, Vox Ibiza, Podemos Barcelona)")
