"""programas-electorales-29n (19-10-2026): añade Feijóo Barcelona antiokupación (RTVE) y Bendodo Granada (pp.es);
pasa fechas de contenido/FAQ/reviewedAt a 19 de octubre. NO toca title, description ni h1 (test CTR)."""
import json, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/promesas-29n.ts"
s = P.read_text()
i = s.find('"path": "/elecciones/programas-electorales-29n"')
a = s.rfind('{\n"id": "', 0, i)
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
g = json.loads(s[a:j + 1])
keep = (g["title"], g["description"], g["h1"])
assert "A 18 de octubre" in g["description"]  # CTR: description stays

D19 = "19 de octubre de 2026"
D19_short = "19 de octubre"
RTVE = {"label": "RTVE, 18-10-2026: Feijóo en Barcelona (ley antiokupación)", "href": "https://www.rtve.es/noticias/20261018/feijoo-mitin-pp-barcelona-elecciones-generales-directo-cronica/17271485.shtml"}
BEND = {"label": "pp.es, 16-10-2026: Bendodo en Granada (autónomos)", "href": "https://www.pp.es/actualidad/articulos/bendodo-promete-dos-anos-de-cuota-cero-para-los-nuevos-autonomos-y-eliminar-el-iva-para-quienes-facturen-menos-de-85-000-euros/"}

sec = {x["id"]: x for x in g["sections"]}

# Dates in body (not description)
g["reviewedAt"] = "2026-10-19"
g["lead"] = (
    "Respuesta corta: a 19 de octubre de 2026 ningún partido ha publicado todavía su programa electoral para el 29-N. "
    "Mientras tanto, aquí tienes lo que han propuesto en mítines y actos de precampaña, por tema, con quién lo dijo, dónde, cuándo y la fuente."
)
if "estado" in sec:
    sec["estado"]["title"] = "Estado a 19 de octubre: ningún programa publicado"
    paras = sec["estado"]["paragraphs"]
    paras[0] = (
        "Ningún partido con diputados en el Congreso ha publicado todavía su programa para las generales del 29 de noviembre. "
        "Lo comprobamos el 19 de octubre en sus webs oficiales y en la prensa (comparadores como eleccionesenespana.es seguían en «Pendiente» el 17-10; pp.es sin PDF del 29-N). "
        "Las webs de PSOE, Vox, Podemos y ERC no permiten la comprobación automática; en esos casos revisamos sus notas y las noticias."
    )
    # keep Vox thematic note and calendar para if present

def bump_dates(text: str) -> str:
    return (text
            .replace("a 18 de octubre de 2026", f"a {D19}")
            .replace("A 18 de octubre de 2026", f"A {D19}")
            .replace("a fecha de 18 de octubre", f"a fecha de {D19_short}")
            .replace("a 18 de octubre", f"a {D19_short}")
            .replace("A 18 de octubre", f"A {D19_short}"))

for f in g["faqs"]:
    f["a"] = bump_dates(f["a"])
    # Enrich FAQ about mitines with Barcelona if present
    if f["q"].startswith("¿Qué han propuesto") and "antiokupación" not in f["a"]:
        f["a"] = f["a"].replace(
            "el PP, bajar el IRPF y un IVA del 0 % en alimentos básicos",
            "el PP, una ley antiokupación con desalojo en 48 horas (Barcelona, 18-10) y bajar el IRPF y un IVA del 0 % en alimentos básicos",
        )

# NOPROP strings in party sections without tables
for pid, sx in sec.items():
    sx["paragraphs"] = [bump_dates(p) for p in sx.get("paragraphs", [])]
    if "lists" in sx:
        sx["lists"] = [[bump_dates(x) for x in lst] for lst in sx["lists"]]

# PP: add Barcelona + Bendodo rows; update actos line
pp = sec["pp"]
pp["paragraphs"][0] = (
    "Candidato: Alberto Núñez Feijóo. Actos revisados: acto en Ceuta (07-10), simposio sanitario con Carmen Fúnez (07-10), "
    "mitin en Madrid (10-10), comparecencia en Bruselas (15-10), acto en Toledo (16-10), Bendodo en Granada (16-10) "
    "y acto en Barcelona con Xavier García Albiol (18-10)."
)
rows = pp.setdefault("table", {"caption": "PP: propuestas en mítines y actos, por tema", "head": ["Tema", "Qué propuso o dijo", "Quién, dónde y cuándo", "Fuente"], "rows": []})["rows"]

def has_cell(substr):
    return any(substr in r["cells"][1] for r in rows)

def insert_vivienda(row):
    # after existing Vivienda rows, before next tema
    if any("48 horas" in r["cells"][1] for r in rows):
        return
    k = 0
    for n, r in enumerate(rows):
        if r["cells"][0] == "Vivienda":
            k = n + 1
    rows.insert(k, row)

def insert_tema(tema, row, after_temas=None):
    if any(row["cells"][1][:40] in r["cells"][1] for r in rows):
        return
    # find last row of same tema or insert before Otros/end
    k = next((n for n, x in enumerate(rows) if x["cells"][0].startswith("Otros")), len(rows))
    for n, x in enumerate(rows):
        if x["cells"][0] == tema:
            k = n + 1
    rows.insert(k, row)

insert_vivienda({
    "cells": [
        "Vivienda",
        "Feijóo encargó a Xavier García Albiol una ley antiokupación: «Tolerancia cero con los okupas, fuera en 48 horas sí o sí». Dijo que Albiol será ponente de la ley tras el 29-N.",
        "Feijóo, acto de precampaña en Barcelona con Xavier García Albiol, 18-10-2026",
    ],
    "source": RTVE,
})
insert_tema("Empleo y salarios", {
    "cells": [
        "Empleo y salarios",
        "Bendodo anunció tarifa o cuota cero durante los dos primeros años para nuevos autónomos menores de 35 años.",
        "Elías Bendodo, acto con jóvenes empresarios en Granada, 16-10-2026",
    ],
    "source": BEND,
})
insert_tema("Impuestos", {
    "cells": [
        "Impuestos",
        "Bendodo recordó el plan para que unos 1,4 millones de autónomos no paguen el IVA si facturan menos de 85.000 euros al año.",
        "Elías Bendodo, acto con jóvenes empresarios en Granada, 16-10-2026",
    ],
    "source": BEND,
})
insert_tema("Otros: burocracia", {
    "cells": [
        "Otros: burocracia",
        "Bendodo propuso reducir las declaraciones de los autónomos de cuatro al año a dos o incluso una.",
        "Elías Bendodo, acto con jóvenes empresarios en Granada, 16-10-2026",
    ],
    "source": BEND,
})

# por-tema list: ensure Vivienda still lists PP (already does)
L = sec.get("por-tema", {}).get("lists", [[]])[0]
# no structural change needed

for src in [RTVE, BEND]:
    if not any(y["href"] == src["href"] for y in g["sources"]):
        g["sources"].append(src)

assert (g["title"], g["description"], g["h1"]) == keep
assert "A 18 de octubre" in g["description"]
s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[j + 1:]
P.write_text(s)
print("ok programas", "pp rows", len(rows), "reviewedAt", g["reviewedAt"])
