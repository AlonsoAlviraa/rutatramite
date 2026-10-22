"""22-10-2026 · Mítines y actos del 21-10 (idempotente). Ejecutar al final de la cadena, después de edit_programas_pp_sevilla_20261021.py.
- /elecciones/programas-electorales-29n: fechas del cuerpo, FAQ y reviewedAt → 22 de octubre;
  PP: Alberto Nadal (Montes de Toledo, 21-10): pacto nacional del agua y plan de choque de la red eléctrica (El Periódico);
  PSOE: Sánchez en Burgos (21-10): reforma constitucional para blindar el aborto (20minutos);
  Democracia 21: apartado de vivienda de su programa, adelantado por El Mundo (22-10). NO toca title, description ni H1 (test CTR 25-oct / 1-nov).
Comprobado el 22-10: ningún partido ha publicado su programa completo para el 29-N (democracia21.es sin programa; Onda Cero 21-10)."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = F.read_text()
ELP = {"label": "El Periódico, 21-10-2026: Alberto Nadal propone un pacto nacional del agua y un plan de choque eléctrico", "href": "https://www.elperiodico.com/es/economia/20261021/alberto-nadal-pp-propone-pacto-135590341"}
M20 = {"label": "20minutos, 21-10-2026: Sánchez en Burgos", "href": "https://www.20minutos.es/nacional/sanchez-exprime-visita-milei-para-alertar-contra-pp-vox-no-proponen-alternancia-es-una-involucion_7051777_0.html"}
DBU = {"label": "Diario de Burgos, 21-10-2026: mitin de Sánchez en Burgos", "href": "https://www.diariodeburgos.es/noticia/z61f64b5c-fead-4a55-b6097c4a33e581dd/202610/sanchez-llama-a-la-movilizacion-para-defender-los-derechos"}
ELM = {"label": "El Mundo, 22-10-2026: el programa de vivienda de Democracia 21", "href": "https://www.elmundo.es/elecciones/2026/10/22/6ad8cfa3e4d4d86f108b45da.html"}
D = "22 de octubre"
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
def bump(t):
    for a, b in [("a 21 de octubre de 2026", f"a {D} de 2026"), ("A 21 de octubre de 2026", f"A {D} de 2026"),
                 ("a fecha de 21 de octubre", f"a fecha de {D}"), ("A 21 de octubre,", f"A {D},"),
                 ("Estado a 21 de octubre", f"Estado a {D}"), ("Lo comprobamos el 21 de octubre", f"Lo comprobamos el {D}")]:
        t = t.replace(a, b)
    return t
def add_row(sec, topic_after, cells, src):
    rows = sec["table"]["rows"]
    if any(r["cells"][1] == cells[1] for r in rows): return
    idx = [n for n, r in enumerate(rows) if r["cells"][0] == topic_after]
    rows.insert((max(idx) + 1) if idx else len(rows), {"cells": cells, "source": src})
def programas(g):
    keep = (g["title"], g["description"], g["h1"])
    g["reviewedAt"] = "2026-10-22"
    g["lead"] = bump(g["lead"])
    for x in g["sections"]:
        x["title"] = bump(x["title"])
        x["paragraphs"] = [bump(p) for p in x.get("paragraphs", [])]
        if "lists" in x: x["lists"] = [[bump(i) for i in l] for l in x["lists"]]
    sec = {x["id"]: x for x in g["sections"]}
    # PP
    pp = sec["pp"]
    if "Nadal" not in pp["paragraphs"][0]:
        pp["paragraphs"][0] = pp["paragraphs"][0].rstrip(".") + " y Alberto Nadal en los Montes de Toledo (21-10)."
    add_row(pp, "Otros: instituciones", ["Otros: agua y red eléctrica",
        "Alberto Nadal, vicesecretario de Economía, propuso un pacto nacional del agua (ejecutar las infraestructuras hidráulicas pendientes y repartir el agua con mecanismos más flexibles) y un plan de choque en los primeros 18 meses de gobierno para reforzar la red eléctrica y facilitar nuevas conexiones. No concretó presupuesto ni calendario.",
        "Alberto Nadal, visita a explotaciones ganaderas de los Montes de Toledo, 21-10-2026"], ELP)
    # PSOE
    ps = sec["psoe"]
    if "Burgos" not in ps["paragraphs"][0]:
        ps["paragraphs"][0] = ps["paragraphs"][0].replace("Fuenlabrada (17-10) y Valladolid (19-10).", "Fuenlabrada (17-10), Valladolid (19-10) y Burgos (21-10).")
        assert "Burgos" in ps["paragraphs"][0]
    add_row(ps, "Otros: gasto público", ["Otros: Constitución",
        "Sánchez prometió: «En la próxima legislatura reformaremos la Constitución para blindar el derecho al aborto de las mujeres». El proyecto de reforma que estaba en el Congreso decayó con la disolución de las Cortes; una reforma constitucional necesita como mínimo tres quintos del Congreso y del Senado (artículo 167 de la Constitución).",
        "Sánchez, mitin de precampaña en Burgos, 21-10-2026"], M20)
    # Democracia 21
    d = sec["democracia-21"]
    if "El Mundo" not in d["paragraphs"][0]:
        d["paragraphs"][0] = d["paragraphs"][0].replace("Acto revisado: presentación en Madrid (10-10).", "Acto revisado: presentación en Madrid (10-10). El Mundo publicó el 22-10 el apartado de vivienda de su programa, al que dice haber tenido acceso; a 22 de octubre el partido no ha publicado el programa en democracia21.es.")
        assert "El Mundo" in d["paragraphs"][0]
    W = "Democracia 21, apartado de vivienda de su programa (adelantado por El Mundo), 22-10-2026"
    add_row(d, "Vivienda", ["Vivienda", "Límite «temporal y excepcional» de los precios del alquiler y un Servicio Social de Garantía de Arrendamientos: el Estado paga el alquiler al propietario si el inquilino es declarado vulnerable y no hay alternativa habitacional inmediata.", W], ELM)
    add_row(d, "Vivienda", ["Vivienda", "Mediación de arrendamientos gratuita y vinculante (máximo 30 días) y juzgados especializados (60 días más); tipificar como estafa firmar un contrato con intención de no pagar y el subarriendo ilegal; regular en la Ley de Arrendamientos Urbanos el alquiler por habitaciones.", W], ELM)
    add_row(d, "Vivienda", ["Vivienda", "IVA del 4 % (ahora 10 %) para construir y rehabilitar vivienda asequible; suelo público cedido hasta 75 años sin perder la titularidad pública; licencias de obra mayor en 30 días.", W], ELM)
    # Por tema
    pt = sec["por-tema"]
    pt["lists"] = [[i.replace("Otros temas (burocracia, instituciones, gasto público, defensa y coste de la vida)", "Otros temas (burocracia, instituciones, Constitución, agua y red eléctrica, gasto público, defensa y coste de la vida)") for i in l] for l in pt["lists"]]
    # FAQ
    for f in g["faqs"]:
        f["a"] = bump(f["a"])
        if f["q"].startswith("¿Qué han propuesto") and "Burgos, 21-10" not in f["a"]:
            old = "subir el salario mínimo cada año (Valladolid, 19-10)"
            assert old in f["a"], "FAQ PSOE no encontrada"
            f["a"] = f["a"].replace(old, old + " y reformar la Constitución para blindar el aborto (Burgos, 21-10)")
            old2 = "Podemos, la jornada de 30 horas semanales y un salario mínimo de 1.800 €."
            assert old2 in f["a"], "FAQ Podemos no encontrada"
            f["a"] = f["a"].replace(old2, old2[:-1] + "; Democracia 21, un tope temporal del alquiler con garantía pública de cobro para el propietario (programa adelantado por El Mundo, 22-10).")
    for y in (ELP, M20, DBU, ELM):
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
    assert (g["title"], g["description"], g["h1"]) == keep and "A 18 de octubre" in g["description"]
edit("/elecciones/programas-electorales-29n", programas)
F.write_text(s); print("ok 22-10: programas (PP Nadal, PSOE Burgos, D21 vivienda)")
