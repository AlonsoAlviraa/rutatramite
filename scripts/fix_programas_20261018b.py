"""programas-electorales-29n (18-10-2026, tarde): corrige la jornada propuesta por Podemos (30 horas según RTVE y ABC;
la SER publicó 35), añade sanidad (PP y Frente Amplio) y enlaza las nuevas comparativas. No toca title, description ni h1."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = P.read_text()
i = s.find('"path": "/elecciones/programas-electorales-29n"'); a = s.rfind('{\n"id": "', 0, i)
d = 0; j = a; ins = False; esc = False
while True:
    c = s[j]
    if ins:
        if esc: esc = False
        elif c == '\\': esc = True
        elif c == '"': ins = False
    else:
        if c == '"': ins = True
        elif c == '{': d += 1
        elif c == '}':
            d -= 1
            if d == 0: break
    j += 1
g = json.loads(s[a:j + 1]); keep = (g["title"], g["description"], g["h1"])
RTVE = {"label": "RTVE, 12-09-2026", "href": "https://www.rtve.es/noticias/20260912/montero-se-postula-como-candidata-a-generales-anuncia-unas-primarias-abiertas-a-todo-mundo-mas-alla-podemos/17222392.shtml"}
PPS = {"label": "pp.es, 07-10-2026", "href": "https://www.pp.es/actualidad/articulos/funez-desgrana-el-proyecto-sanitario-del-futuro-gobierno-de-feijoo-y-situa-la-atencion-primaria-como-columna-del-sistema-nacional-de-salud/"}
RMFA = {"label": "Redacción Médica, 17-10-2026", "href": "https://www.redaccionmedica.com/politica/20261017/frente-amplio-nace-con-una-apuesta-firme-por-la-sanidad-pero-alejado-de-podemos/362466_0.html"}
sec = {x["id"]: x for x in g["sections"]}
for r in sec["podemos"]["table"]["rows"]:
    if "35 horas" in r["cells"][1] or "30 horas" in r["cells"][1]:
        r["cells"][1] = "Montero propuso reducir la jornada laboral a 30 horas semanales (seis al día), según RTVE y ABC. La crónica de la Cadena SER del mismo acto habla de 35 horas."
        r["source"] = RTVE
def addrow(pid, row):
    rows = sec[pid]["table"]["rows"]
    if not any(x["cells"][0] == row["cells"][0] for x in rows):
        k = next((n for n, x in enumerate(rows) if x["cells"][0].startswith("Otros")), len(rows)); rows.insert(k, row)
addrow("pp", {"cells": ["Sanidad", "Carmen Fúnez, vicesecretaria de Sanidad del PP, presentó un plan de salud mental con 10.000 profesionales y 700 millones de euros al año, y una «pieza específica» para el Sistema Nacional de Salud en la financiación autonómica.", "Carmen Fúnez (PP), VII Simposium del Observatorio de la Sanidad, 07-10-2026"], "source": PPS})
addrow("frente-amplio", {"cells": ["Sanidad", "Colau dijo que el Frente Amplio defiende la sanidad pública «frente a los recortes»; Bustinduy y Urtasun señalaron el problema de las listas de espera. Sin medidas concretas todavía.", "Ada Colau, mitin de presentación del Frente Amplio, Madrid, 17-10-2026"], "source": RMFA})
sec["pp"]["paragraphs"][0] = "Candidato: Alberto Núñez Feijóo. Actos revisados: acto en Ceuta (07-10), simposio sanitario con Carmen Fúnez (07-10), mitin en Madrid (10-10), comparecencia en Bruselas (15-10) y acto en Toledo (16-10)."
L = sec["por-tema"]["lists"][0]
L[:] = [("Sanidad: PP y Frente Amplio." if x.startswith("Sanidad") else x) for x in L]
sec["por-tema"]["paragraphs"] = ["Resumen de las tablas de abajo. Cada partido aparece solo en los temas en los que hemos encontrado una propuesta con fuente. La comparativa de promesas por tema incluye además notas oficiales de los partidos y propuestas anteriores a la convocatoria, por eso puede tener más filas."]
for f in g["faqs"]:
    f["a"] = f["a"].replace("Podemos, la jornada de 35 horas y un salario mínimo de 1.800 €", "Podemos, la jornada de 30 horas semanales y un salario mínimo de 1.800 €")
    if f["q"] == "¿Dónde comparo las propuestas?":
        f["a"] = "En la página de promesas del 29-N, por tema (vivienda, impuestos, empleo, pensiones, inmigración, sanidad, educación, instituciones y burocracia), por partido, comunidad y perfil."
for x in [RTVE | {"label": "RTVE, 12-09-2026: Montero en Madrid (jornada de 30 horas)"}, PPS | {"label": "pp.es, 07-10-2026: proyecto sanitario del PP"}, RMFA | {"label": "Redacción Médica, 17-10-2026: Frente Amplio y sanidad"}]:
    if not any(y["href"] == x["href"] for y in g["sources"]): g["sources"].append(x)
for x in [{"href": "/elecciones/promesas/que-propone-cada-partido-sanidad", "label": "Sanidad: qué propone cada partido"},
          {"href": "/elecciones/promesas/partido-democracia-21", "label": "Democracia 21: qué promete"}]:
    if not any(y["href"] == x["href"] for y in g["related"]): g["related"].append(x)
assert (g["title"], g["description"], g["h1"]) == keep
s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[j + 1:]
P.write_text(s); print("ok")
