"""19-10-2026 · «5 propuestas» de Podemos (post oficial en X). Idempotente. Ejecutar después de edit_contrato_pp_20261019.py.
programas-electorales-29n: fila y párrafo en la sección Podemos (misma forma que el Contrato del PP), FAQ. NO toca title/description/H1.
salario-minimo-1800-euros: confirma 1.800 € y 30 h con fecha. partido-podemos: FAQ."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
T = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites"
X = {"label": "Podemos en X, 19-10-2026: 5 propuestas para tener paz, casa y trabajo", "href": "https://x.com/PODEMOS/status/2112121339267965036"}
MARK = "5 propuestas"
f = T / "promesas-29n.ts"; s = f.read_text()
def edit(path, fn):
    global s
    a, b = span(s, path); g = json.loads(s[a:b]); fn(g); s = s[:a] + json.dumps(g, ensure_ascii=False, indent=0) + s[b:]
def programas(g):
    est = next(x for x in g["sections"] if x["id"] == "estado")
    if not any(MARK in p for p in est["paragraphs"]):
        est["paragraphs"].insert(2, "El mismo día, Podemos publicó en su cuenta oficial «5 propuestas para tener paz, casa y trabajo». Tampoco es un programa: el partido las presenta como su plan de cinco puntos para la campaña.")
    sec = next(x for x in g["sections"] if x["id"] == "podemos")
    sec["paragraphs"] = [p.replace(" y Consejo Ciudadano Estatal en Madrid (17-10).", ", Consejo Ciudadano Estatal en Madrid (17-10) y «5 propuestas» publicadas en su cuenta oficial (19-10).") if p.startswith("Candidata:") else p for p in sec["paragraphs"]]
    if not any(MARK in p for p in sec["paragraphs"]):
        sec["paragraphs"].insert(2, "El 19 de octubre publicó «5 propuestas para tener paz, casa y trabajo» en su cuenta oficial, con un vídeo de Pablo Fernández.")
    rows = sec["table"]["rows"]
    if not any(MARK in r["cells"][1] for r in rows):
        rows.insert(0, {"cells": ["Varios temas", "Publicó «5 propuestas para tener paz, casa y trabajo»: «Las casas son para vivir»; bajar el coste de la vida; «Ni un euro para guerras»; subir el SMI a 1.800 € y jornada laboral de 30 horas; proteger lo público y políticas contra el cambio climático.", "Podemos, post oficial en X con vídeo de Pablo Fernández, 19-10-2026"], "source": X})
    for r in rows:
        if r["cells"][1].startswith("Montero propuso reducir la jornada laboral a 30 horas") and "19-10" not in r["cells"][1]:
            r["cells"][1] += " Las «5 propuestas» del partido del 19-10-2026 dicen 30 horas."
    q = next((x for x in g["faqs"] if x["q"].startswith("¿El Contrato con España")), None)
    if q and "Podemos" not in q["a"]:
        q["a"] += " Lo mismo vale para las «5 propuestas» que Podemos publicó ese día."
edit("/elecciones/programas-electorales-29n", programas)
def smi(g):
    if "19-10-2026" not in g["lead"]:
        g["lead"] = g["lead"].replace("(Irene Montero, 12-9-2026, según ABC).", "(Irene Montero, 12-9-2026, según ABC; el partido lo repitió en sus «5 propuestas» del 19-10-2026).", 1)
    que = next(x for x in g["sections"] if x["id"] == "que")
    if not any(MARK in p for p in que["paragraphs"]):
        que["paragraphs"].append("El 19 de octubre de 2026, Podemos lo incluyó como punto 4 de sus «5 propuestas para tener paz, casa y trabajo»: «Subir el SMI a 1.800€ y jornada laboral de 30h» (post oficial del partido en X). Eso confirma las 30 horas; una crónica del acto de septiembre había hablado de 35.")
    if not any(x["href"] == X["href"] for x in g["sources"]): g["sources"].append(X)
edit("/elecciones/salario-minimo-1800-euros", smi)
def ficha(g):
    q = next(x for x in g["faqs"] if x["q"].startswith("¿Ha publicado Podemos su programa"))
    if MARK not in q["a"]: q["a"] += " El 19 de octubre publicó «5 propuestas para tener paz, casa y trabajo», que no son el programa; están incorporadas aquí, tema a tema."
edit("/elecciones/promesas/partido-podemos", ficha)
f.write_text(s); print("ok")
