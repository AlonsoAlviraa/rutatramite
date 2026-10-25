"""25-10-2026 · Serie «¿Quiere [partido] quitar las pensiones?»: propuestas de Frente Amplio del 24-10 (idempotente).
Colau y Delgado (manifestación por las pensiones, Madrid, 24-10): ninguna pensión por debajo del SMI y edad máxima de jubilación 65 años.
Fuentes: Europa Press 24-10 (declaraciones) e Infobae 24-10 (coste y financiación según el partido). Hub y página de Frente Amplio."""
import json, pathlib
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/pensiones-29n.ts"
s = F.read_text(); h = "export const PENSIONES_29N_GUIDES: Guide[] = "
a = s.index(h) + len(h); G, end = json.JSONDecoder().raw_decode(s, a)
EP = {"label": "Europa Press, 24-10-2026: Frente Amplio propone que ninguna pensión esté por debajo del SMI y jubilación como máximo a los 65", "href": "https://www.europapress.es/nacional/noticia-frente-amplio-propone-ninguna-pension-debajo-smi-fijar-65-anos-edad-maxima-jubilacion-20261024130942.html"}
INF = {"label": "Infobae, 24-10-2026: coste y financiación del plan de pensiones de Frente Amplio", "href": "https://www.infobae.com/espana/2026/10/24/frente-amplio-presenta-su-plan-de-pensiones-jubilacion-a-los-65-anos-y-cuantia-minima-igual-al-smi/"}
OLD_FA = "Frente Amplio dice que no permitirá que se «cargue» el sistema público"
NEW_FA = "Frente Amplio propone que ninguna pensión baje del salario mínimo y fijar en 65 años la edad máxima de jubilación (24-10)"
def addsrc(g, *xs):
    for y in xs:
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
P = {g["path"]: g for g in G}
hub = P["/elecciones/quiere-algun-partido-quitar-las-pensiones"]
def fixhub(t):
    return t.replace("a 21 de octubre de 2026 no hemos", "a 25 de octubre de 2026 no hemos").replace("A 21 de octubre de 2026 no hemos", "A 25 de octubre de 2026 no hemos").replace(OLD_FA, NEW_FA)
hub["lead"] = fixhub(hub["lead"])
for f in hub["faqs"]: f["a"] = fixhub(f["a"])
for x in hub["sections"]:
    x["paragraphs"] = [fixhub(p) for p in x.get("paragraphs", [])]
    for r in x.get("table", {}).get("rows", []):
        if r["cells"][0] == "Frente Amplio" and "24-10-2026" not in r["cells"][2]:
            r["cells"][2] = "Colau: que ninguna pensión esté por debajo del salario mínimo y jubilación como máximo a los 65 años (24-10-2026). Urtasun: no permitirán que se «cargue» el sistema público de pensiones (17-10-2026)."
            r["source"] = EP
assert NEW_FA in hub["lead"]
hub["reviewedAt"] = "2026-10-25"; addsrc(hub, EP)
fa = P["/elecciones/quiere-frente-amplio-quitar-las-pensiones"]
R = ("Según las declaraciones con fuente que hemos encontrado, no. El 24 de octubre de 2026, en la manifestación por las pensiones en Madrid, Ada Colau propuso que ninguna pensión esté por debajo del salario mínimo (hoy 1.221 € al mes en 14 pagas) y fijar en 65 años la edad máxima de jubilación. "
     "Ernest Urtasun dijo el 17 de octubre que no van a permitir que se «cargue» el sistema público de pensiones.")
fa["lead"] = "Respuesta corta: " + R[0].lower() + R[1:]
fa["faqs"][0]["a"] = R
for f in fa["faqs"]:
    if f["q"].startswith("¿Qué ha dicho Frente Amplio sobre subir"):
        f["a"] = "Colau dijo el 24 de octubre de 2026: «Si sube el SMI, lo lógico es que las pensiones suban al mismo ritmo y que ninguna esté por debajo» (Europa Press). Urtasun dijo el 17 de octubre que no permitirán que se «cargue» el sistema público de pensiones (elDiario.es)."
    if f["q"].startswith("¿Ha publicado Frente Amplio su programa"):
        f["a"] = "A 25 de octubre de 2026, no. Cuando lo publique, añadiremos aquí lo que diga sobre pensiones, con el enlace."
if not any(q["q"].startswith("¿Cuánto costaría") for q in fa["faqs"]):
    fa["faqs"].insert(2, {"q": "¿Cuánto costaría la propuesta de Frente Amplio sobre pensiones?", "a": "Según el partido, unos 10.000 millones de euros al año cada medida (pensión mínima igual al SMI y jubilación a los 65), 20.000 millones en total. La primera la pagaría con tributación mínima a grandes empresas y un impuesto del 2 % a patrimonios de más de un millón de euros; la segunda, quitando de forma progresiva el tope máximo de cotización y con una aportación de las empresas más automatizadas (Infobae, 24-10-2026). Son cifras del partido, no estimaciones oficiales."})
for x in fa["sections"]:
    if x["id"] == "respuesta": x["paragraphs"] = [R]
    if x["id"] == "que-ha-dicho":
        x["paragraphs"] = ["Declaraciones públicas con fuente y fecha, revisadas el 25 de octubre de 2026."]
        rows = x["table"]["rows"]; W = "Ada Colau y Emilio Delgado, manifestación por las pensiones, Madrid, 24-10-2026"
        new = [{"cells": ["Que ninguna pensión esté por debajo del salario mínimo y que las pensiones mínimas suban al mismo ritmo que el SMI: «Si sube el SMI, lo lógico es que las pensiones suban al mismo ritmo y que ninguna esté por debajo». Hoy el SMI es de 1.221 € al mes en 14 pagas.", W], "source": EP},
               {"cells": ["Fijar en 65 años la edad máxima de jubilación, «y no ir más allá». Hoy a los 65 solo se jubila sin recorte quien tiene 38 años y 3 meses cotizados; el resto, a los 66 años y 10 meses.", W], "source": EP},
               {"cells": ["Coste y financiación según el partido: unos 10.000 millones al año cada medida, con impuestos a grandes empresas y patrimonios de más de un millón y quitando de forma progresiva el tope máximo de cotización.", "Frente Amplio, 24-10-2026"], "source": INF}]
        for r in reversed(new):
            if not any(o["cells"][0] == r["cells"][0] for o in rows): rows.insert(0, r)
    if x["id"] == "programa":
        x["paragraphs"] = [p.replace("no publicado a 19 de octubre de 2026", "no publicado a 25 de octubre de 2026") for p in x["paragraphs"]]
fa["reviewedAt"] = "2026-10-25"; addsrc(fa, EP, INF)
s = s[:a] + json.dumps(G, ensure_ascii=False, indent=1) + s[end:]
F.write_text(s); print("ok pensiones FA 25-10")
