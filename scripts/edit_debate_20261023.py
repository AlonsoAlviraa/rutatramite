"""23-10-2026 · /elecciones/debate-electoral-29n con las respuestas del 22-10 (idempotente). Reejecutar tras regenerar cuando-29n.ts
(después de rutina_contenido_20261022.py). NO toca title, description ni H1 (test de CTR medido el 29-10 y el 5-11).
- PSOE (comunicado de Ferraz, 22-10): acepta el cara a cara del lunes 16-11 «organizado por medios privados» y el debate a cuatro de RTVE el jueves 26-11;
  deja en el aire el de portavoces del 23-11 (Europa Press, El País, 22-10).
- PP (22-10): «No habrá debate a cuatro en RTVE»; mantiene 16-11 en Mediaset y 26-11 en Atresmedia (Europa Press, 22-10).
- Atresmedia mantiene su oferta de cara a cara y debate a cuatro (laSexta, 22-10).
- laSexta Debate, 2 y 9 de noviembre, Ana Pastor, representantes de PSOE, PP, Vox y Frente Amplio (Europa Press, 21-10)."""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
C = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/cuando-29n.ts"
s = C.read_text()
OP = ' {\n  "id": "'
EP = {"label": "Europa Press, 22-10-2026: Sánchez acepta el cara a cara y pide el debate a cuatro en TVE; el PP lo rechaza", "href": "https://www.europapress.es/nacional/noticia-sanchez-acepta-cara-cara-feijoo-quiere-debate-cuatro-26-noviembre-sea-tve-20261022175207.html"}
ELP = {"label": "El País, 22-10-2026: el PSOE acepta un cara a cara con Feijóo el 16 de noviembre", "href": "https://elpais.com/espana/elecciones-generales/2026-10-22/el-psoe-acepta-un-cara-a-cara-con-feijoo-el-16-de-noviembre.html"}
L6A = {"label": "laSexta, 22-10-2026: Atresmedia mantiene su oferta de cara a cara y debate a cuatro", "href": "https://www.lasexta.com/elecciones/generales/atresmedia-mantiene-oferta-organizar-debate-cara-cara-otro-cuatro-principales-partidos_202610226ada62db658beb674b23cc50.html"}
L6D = {"label": "Europa Press, 21-10-2026: laSexta emitirá dos debates el 2 y el 9 de noviembre", "href": "https://www.europapress.es/sociedad/noticia-lasexta-emitira-dos-debates-ana-pastor-portavoces-psoe-pp-vox-frente-amplio-noviembre-20261021145644.html"}
def edit(path, fn):
    global s
    a, b = span(s, path, opener=OP); g = json.loads(s[a + 1:b]); fn(g)
    txt = json.dumps(g, ensure_ascii=False, indent=1).replace("\n", "\n ")
    s = s[:a] + " " + txt + s[b:]
LEAD = ("Respuesta corta: a 23 de octubre de 2026 no hemos encontrado ningún debate con fecha cerrada por la cadena y por todos los participantes, pero hay avances: el PSOE y el PP han aceptado un cara a cara entre Pedro Sánchez y Alberto Núñez Feijóo el lunes 16 de noviembre en una cadena privada (el PP la sitúa en Mediaset). "
        "Los dos aceptan también un debate a cuatro el jueves 26, pero no se ponen de acuerdo en la cadena: el PSOE acepta el de RTVE y el PP dice que «no habrá debate a cuatro en RTVE» y lo quiere en Atresmedia. "
        "RTVE propone además uno de portavoces el lunes 23, que el PP acepta y el PSOE no ha confirmado. Antes de la campaña, laSexta emitirá dos debates con representantes de PSOE, PP, Vox y Frente Amplio el 2 y el 9 de noviembre. "
        "La campaña va del 13 al 27 de noviembre.")
FAQ = {
 "¿Cuándo es el debate electoral del 29-N?": "El único con fecha aceptada por los dos grandes partidos es el cara a cara Sánchez–Feijóo del lunes 16 de noviembre, en una cadena privada aún por cerrar. El debate a cuatro del jueves 26 tiene fecha, pero no cadena (el PSOE quiere RTVE y el PP, Atresmedia). Antes, laSexta emite dos debates de representantes de los partidos el 2 y el 9 de noviembre. Datos a 23 de octubre de 2026.",
 "¿Habrá cara a cara entre Sánchez y Feijóo?": "Sí, si se mantiene lo anunciado: el 22 de octubre el PSOE aceptó un cara a cara «organizado por medios privados» el lunes 16 de noviembre, la fecha que el PP había aceptado en Mediaset. Falta que la cadena anuncie hora y formato.",
 "¿Habrá debate a cuatro?": "Está en el aire. PSOE y PP aceptan el jueves 26 de noviembre con Vox y Frente Amplio, pero el PSOE acepta la invitación de RTVE y el PP responde que «no habrá debate a cuatro en RTVE» y defiende Atresmedia, que mantiene su oferta. Antena 3 informó el 9 de octubre de que Vox habría aceptado el 26.",
}
NEWFAQ = {"q": "¿Qué son los debates de laSexta del 2 y el 9 de noviembre?", "a": "Dos debates de «laSexta Debate: hablamos de lo que importa», moderados por Ana Pastor, con representantes (no necesariamente los candidatos) de PSOE, PP, Vox y Frente Amplio. El del 2 de noviembre trata vivienda y economía; el del 9, regeneración, inmigración y Estado de bienestar. Son antes de la campaña y tendrán público en plató."}
def debate(g):
    keep = (g["title"], g["description"], g["h1"])
    g["reviewedAt"] = "2026-10-23"
    g["lead"] = LEAD
    for f in g["faqs"]:
        if f["q"] in FAQ: f["a"] = FAQ[f["q"]]
    if not any(f["q"] == NEWFAQ["q"] for f in g["faqs"]): g["faqs"].insert(3, NEWFAQ)
    sec = {x["id"]: x for x in g["sections"]}
    rows = sec["propuestas"]["table"]["rows"]
    for r in rows:
        if r["cells"][0] == "Atresmedia" and "mantiene" not in r["cells"][2]:
            r["cells"][2] = "Ofrecía el miércoles 18; el PP pide el jueves 26. El 22-10 mantiene su oferta de cara a cara y debate a cuatro"
            r["source"] = L6A
        if r["cells"][0] == "Mediaset" and "PSOE" not in r["cells"][2]:
            r["cells"][2] = "Lunes 16 de noviembre: la plantea el PP; el PSOE acepta el 16 en «medios privados» sin citar cadena"
            r["source"] = EP
    if not any(r["cells"][0] == "laSexta" for r in rows):
        rows.append({"cells": ["laSexta", "Dos debates de representantes de PSOE, PP, Vox y Frente Amplio, moderados por Ana Pastor (vivienda y economía; regeneración, inmigración y Estado de bienestar)", "Lunes 2 y lunes 9 de noviembre (anunciados por la cadena)"], "source": L6D})
    pr = sec["partidos"]["table"]["rows"]
    if not any(r["cells"][2] == "22-10-2026" for r in pr):
        pr.insert(0, {"cells": ["PP", "«No habrá debate a cuatro en RTVE». Mantiene el 16 de noviembre en Mediaset y el 26 en Atresmedia", "22-10-2026"], "source": EP})
        pr.insert(1, {"cells": ["PSOE", "Acepta el cara a cara del lunes 16 de noviembre «organizado por medios privados» y el debate a cuatro de RTVE el jueves 26. No se pronuncia sobre el de portavoces del 23", "22-10-2026"], "source": EP})
    for y in (EP, ELP, L6A, L6D):
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
    assert (g["title"], g["description"], g["h1"]) == keep
edit("/elecciones/debate-electoral-29n", debate)
C.write_text(s); print("ok debate 23-10")
