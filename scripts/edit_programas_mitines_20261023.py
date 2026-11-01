"""23-10-2026 · Propuestas del 22-10 (idempotente). Ejecutar al final de la cadena, después de edit_programas_mitines_20261022.py.
- /elecciones/programas-electorales-29n: fechas del cuerpo, FAQ y reviewedAt → 23 de octubre;
  PP: plan de vivienda de 23 medidas (El Español, 22-10) y Juan Bravo, segregar pisos grandes (El País, 22-10);
  Vox: Abascal en Segovia (22-10), «recuperar Ceuta al precio que sea» (voxespana.es);
  Frente Amplio: Urtasun en Barcelona (22-10), prestación universal por crianza (EFE).
  NO toca title, description ni H1 (test CTR 25-oct / 1-nov).
Comprobado el 23-10: ningún partido ha publicado su programa completo para el 29-N."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
EES = {"label": "El Español, 22-10-2026: el plan de vivienda de 23 medidas del PP", "href": "https://www.elespanol.com/espana/politica/20261022/feijoo-completa-plan-vivienda-medidas-jovenes-emancipen-lograr-espana-propietarios/1003744429961_0.html"}
ELP = {"label": "El País, 22-10-2026: el PP propone segregar pisos de gran tamaño", "href": "https://elpais.com/economia/vivienda/2026-10-22/el-pp-propone-segregar-pisos-de-gran-tamano-como-remedio-ante-la-falta-de-vivienda.html"}
VOX = {"label": "voxespana.es, 22-10-2026: Abascal en Segovia", "href": "https://www.voxespana.es/abascal/abascal-pide-confiar-en-vox-para-hacer-una-politica-distinta-y-con-sentido-comun-20261022"}
EFE = {"label": "EFE (vía Infobae), 22-10-2026: Frente Amplio plantea una prestación universal por crianza", "href": "https://www.infobae.com/espana/agencias/2026/10/22/frente-amplio-plantea-una-prestacion-universal-por-crianza-y-pide-consenso-entre-partidos/"}
D = "23 de octubre"
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
def bump(t):
    for a, b in [("a 22 de octubre de 2026", f"a {D} de 2026"), ("A 22 de octubre de 2026", f"A {D} de 2026"),
                 ("a fecha de 22 de octubre", f"a fecha de {D}"), ("A 22 de octubre,", f"A {D},"),
                 ("Estado a 22 de octubre", f"Estado a {D}"), ("Lo comprobamos el 22 de octubre", f"Lo comprobamos el {D}"),
                 ("a 22 de octubre el partido", f"a {D} el partido")]:
        t = t.replace(a, b)
    return t
def add_row(sec, topic_after, cells, src):
    rows = sec["table"]["rows"]
    if any(r["cells"][1] == cells[1] for r in rows): return
    idx = [n for n, r in enumerate(rows) if r["cells"][0] == topic_after]
    rows.insert((max(idx) + 1) if idx else len(rows), {"cells": cells, "source": src})
def programas(g):
    keep = (g["title"], g["description"], g["h1"])
    g["reviewedAt"] = "2026-10-23"
    g["lead"] = bump(g["lead"])
    for x in g["sections"]:
        x["title"] = bump(x["title"])
        x["paragraphs"] = [bump(p) for p in x.get("paragraphs", [])]
        if "lists" in x: x["lists"] = [[bump(i) for i in l] for l in x["lists"]]
    sec = {x["id"]: x for x in g["sections"]}
    pp = sec["pp"]
    if "Juan Bravo" not in pp["paragraphs"][0]:
        old = "y Alberto Nadal en los Montes de Toledo (21-10)."
        assert old in pp["paragraphs"][0]
        pp["paragraphs"][0] = pp["paragraphs"][0].replace(old, "y Alberto Nadal en los Montes de Toledo (21-10), y entrevista a Juan Bravo en À Punt Ràdio (22-10). El 22-10 El Español publicó el documento completo de su plan de vivienda (23 medidas).")
    W = "Plan de vivienda del PP (23 medidas), publicado por El Español, 22-10-2026"
    add_row(pp, "Vivienda", ["Vivienda", "Fondo Estatal de Garantía del Alquiler que cubra un porcentaje de los impagos y bonificación del 75 % en el IRPF, el primer año, a quien alquile una vivienda vacía.", W], EES)
    add_row(pp, "Vivienda", ["Vivienda", "Para jóvenes: deducción del 15 % del alquiler, aval público para la fianza de los menores de 35 años e IRPF cero el primer año de trabajo, con rebajas los tres siguientes («Plan Prepara»).", W], EES)
    add_row(pp, "Vivienda", ["Vivienda", "Juan Bravo propuso facilitar que las viviendas «de 150 o 200 metros cuadrados» se dividan en dos: «De una vivienda podemos sacar dos». Ya es posible hoy donde lo permite la normativa urbanística, que depende de ayuntamientos y comunidades autónomas.", "Juan Bravo, vicesecretario de Vivienda del PP, À Punt Ràdio, 22-10-2026"], ELP)
    vx = sec["vox"]
    if "Segovia" not in vx["paragraphs"][0]:
        old = "y acto en Ponferrada (20-10)."
        assert old in vx["paragraphs"][0]
        vx["paragraphs"][0] = vx["paragraphs"][0].replace(old, "acto en Ponferrada (20-10) y acto en Segovia (22-10).")
    add_row(vx, "Inmigración", ["Inmigración", "Abascal dijo que, si gobierna, su prioridad al día siguiente del 29-N será «recuperar Ceuta al precio que sea». No concretó medidas.", "Abascal, acto en Segovia, 22-10-2026"], VOX)
    fa = sec["frente-amplio"]
    if "22-10" not in fa["paragraphs"][0]:
        old = "y mitin de presentación en Madrid (17-10)."
        assert old in fa["paragraphs"][0]
        fa["paragraphs"][0] = fa["paragraphs"][0].replace(old, "mitin de presentación en Madrid (17-10) y declaraciones de Ernest Urtasun y Rosa Martínez en Barcelona (22-10).")
    add_row(fa, "Sanidad", ["Impuestos", "Urtasun propuso una prestación universal por crianza, concedida mediante deducciones en el IRPF, con un coste de unos 13.000 millones de euros según el partido.", "Ernest Urtasun y Rosa Martínez, Barcelona, 22-10-2026"], EFE)
    pt = sec["por-tema"]
    pt["lists"] = [[i.replace("Impuestos: PP, Vox y Democracia 21.", "Impuestos: PP, Vox, Frente Amplio y Democracia 21.") for i in l] for l in pt["lists"]]
    for f in g["faqs"]:
        f["a"] = bump(f["a"])
        if f["q"].startswith("¿Qué han propuesto") and "Segovia" not in f["a"]:
            o1 = "(Sevilla, 21-10) y bajar"
            assert o1 in f["a"], "FAQ PP"
            f["a"] = f["a"].replace(o1, "(Sevilla, 21-10), un fondo público de garantía del alquiler (plan de vivienda publicado el 22-10) y bajar")
            o2 = "plazas de guardería (Ponferrada, 20-10)"
            assert o2 in f["a"], "FAQ Vox"
            f["a"] = f["a"].replace(o2, o2 + " y «recuperar Ceuta al precio que sea» (Segovia, 22-10)")
            o3 = "invertir el 1 % del PIB en vivienda pública;"
            assert o3 in f["a"], "FAQ FA"
            f["a"] = f["a"].replace(o3, "invertir el 1 % del PIB en vivienda pública y una prestación universal por crianza (Barcelona, 22-10);")
    for y in (EES, ELP, VOX, EFE):
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
    assert (g["title"], g["description"], g["h1"]) == keep and "A 18 de octubre" in g["description"]
edit("/elecciones/programas-electorales-29n", programas)
F.write_text(s); print("ok 23-10: programas (PP vivienda 23 medidas/Bravo, Vox Segovia, FA crianza)")
