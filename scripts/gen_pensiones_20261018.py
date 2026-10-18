"""Genera src/lib/tramites/pensiones-29n.ts (verificación «¿Quiere X quitar las pensiones?») y
src/lib/tramites/jubilacion-2026.ts (guías de pensiones para mayores de 55). Solo datos con fuente fechada."""
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
RV = "2026-10-18"
D18 = "18 de octubre de 2026"
S = {
 "elpais_bxl": ("El País, 15-10-2026: Feijóo en Bruselas sobre las pensiones", "https://elpais.com/espana/elecciones-generales/2026-10-15/feijoo-se-compromete-a-actualizar-las-pensiones-con-el-ipc-sin-descartar-reformarlas.html"),
 "ep_zgz": ("Europa Press, 14-10-2026: Sánchez en Zaragoza", "https://www.europapress.es/aragon/noticia-pedro-sanchez-promete-zaragoza-cuatro-anos-mas-revalorizacion-pensiones-conforme-ipc-20261014200020.html"),
 "ep_fuen": ("Europa Press, 17-10-2026: Sánchez en Fuenlabrada", "https://www.europapress.es/nacional/noticia-sanchez-lanza-precampana-apelando-movilizacion-alertando-contra-motosierra-pensiones-20261017133128.html"),
 "ep_estepona": ("Europa Press, 11-10-2026: Abascal en Estepona", "https://www.europapress.es/nacional/noticia-abascal-dice-vox-pensiones-pagaran-habra-vivienda-sea-sigue-llamando-voto-presencial-20261011195906.html"),
 "vox_estepona": ("voxespana.es, 11-10-2026: acto de Estepona (web oficial)", "https://www.voxespana.es/abascal/abascal-reivindica-la-remigracion-la-desregulacion-y-la-prioridad-nacional-como-ejes-de-vox-para-el-29n-20261011"),
 "eldiario_fa": ("elDiario.es, 17-10-2026: presentación del Frente Amplio en Madrid", "https://www.eldiario.es/politica/frente-amplio-pide-unidad-frente-fascismo-pasa-pagina-crisis-si-alguien-no-quiere-sentar-mesa-no-le-obligar_1_13593637.html"),
 "debate_pl": ("El Debate, 22-09-2026: el Congreso toma en consideración la ley de Podemos sobre jubilación anticipada", "https://www.eldebate.com/economia/20260922/congreso-aprueba-tramitar-no-penalizar-jubilacion-anticipada-40-anos-cotizados_461700.html"),
 "bi_pl": ("Business Insider, 22-09-2026: coste y votación previa de la propuesta", "https://www.businessinsider.es/economia/prejubilacion-con-40-anos-cotizados-sin-penalizacion-propuesta-que-volvera-votar-congreso_7039104_0.html"),
 "ep_d21": ("Europa Press, 10-10-2026: presentación de Democracia 21", "https://www.europapress.es/nacional/noticia-democracia-21-presenta-elecciones-madrid-barcelona-abogada-miriam-gonzalez-candidata-20261010151421.html"),
 "jec_coal": ("Junta Electoral Central: coaliciones constituidas para las generales del 29-N", "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales"),
 "rdl3": ("BOE: Real Decreto-ley 3/2026, de 3 de febrero (revalorización de pensiones 2026)", "https://www.boe.es/eli/es/rdl/2026/02/03/3"),
 "rd241": ("BOE: Real Decreto 241/2026, de 25 de marzo (revalorización de pensiones 2026)", "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-6977"),
 "lgss": ("BOE: Ley General de la Seguridad Social, artículo 58", "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a58"),
 "ce": ("BOE: Constitución Española, artículo 50", "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a50"),
 "rd806": ("BOE: Real Decreto 806/2026, convocatoria del 29-N", "https://www.boe.es/eli/es/rd/2026/10/05/806"),
 "ss_req": ("Seguridad Social: requisitos de la pensión de jubilación (edad y cotización)", "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10963/28393/28396/28472"),
 "ss_hc": ("Seguridad Social: hecho causante y efectos de la jubilación", "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10963/4b590fd3-7bc7-486d-b42a-ced5299da6fc"),
 "ss_sol": ("Revista de la Seguridad Social, 12-01-2024: cómo solicitar tu jubilación", "https://revista.seg-social.es/-/c%C3%B3mo-solicitar-tu-jubilaci%C3%B3n"),
 "ss_sim": ("Revista de la Seguridad Social, 18-06-2024: simulador de jubilación", "https://revista.seg-social.es/-/calcule-su-jubilaci%C3%B3n"),
}
def s(k): l, h = S[k]; return {"label": l, "href": h}
def row(cells, k): return {"cells": cells, "source": s(k)}

# ---------------- verificación por partido ----------------
HUB = "/elecciones/quiere-algun-partido-quitar-las-pensiones"
LEY = ["La Constitución obliga a los poderes públicos a garantizar «pensiones adecuadas y periódicamente actualizadas» a las personas mayores (artículo 50).",
       "La Ley General de la Seguridad Social (artículo 58) fija que las pensiones contributivas se revalorizan cada año con la media del IPC de los doce meses previos a diciembre. Cambiar esa regla exige una norma con rango de ley aprobada o convalidada por el Congreso.",
       "En 2026 las pensiones contributivas subieron un 2,7 % (Real Decreto-ley 3/2026, de 3 de febrero, y Real Decreto 241/2026, de 25 de marzo)."]
LEY_SRC = ["ce", "lgss", "rdl3", "rd241"]
CRIT = ["Recogemos solo lo que el partido o su candidato han dicho en público sobre pensiones, con quién, dónde, cuándo y la fuente, y lo que han votado en el Congreso cuando una fuente lo detalla. No recogemos lo que otros partidos dicen de él.",
        "Todas las páginas de esta serie tienen las mismas secciones en el mismo orden. Si no encontramos declaraciones verificables, lo decimos. No valoramos las propuestas ni recomendamos ningún voto."]
NOPROG = f"Programa del 29-N: no publicado a {D18}. Cuando se publique, añadiremos lo que diga sobre pensiones."
H = ["Qué dijo", "Quién, dónde y cuándo", "Fuente"]

PARTIES = [
 dict(id="pp", short="el PP", name="PP", slug="quiere-el-pp-quitar-las-pensiones",
  title="¿Quiere el PP quitar las pensiones? Lo que ha dicho Feijóo",
  h1="¿Quiere el PP quitar las pensiones? Lo que ha dicho y votado",
  desc="¿Quiere el PP quitar las pensiones? Feijóo dijo el 15-10-2026 que se actualizarán con el IPC. Sus frases, sus votos y lo que dice la ley, con fuentes.",
  answer="Según las declaraciones con fuente que hemos encontrado, no. Su candidato, Alberto Núñez Feijóo, dijo el 15 de octubre de 2026 que «las pensiones se actualizarán con el IPC» y que su viabilidad y su actualización conforme al IPC «son innegociables». No aclaró si haría otras reformas del sistema. Antes, la portavoz del PP en el Congreso, Ester Muñoz, había dicho que el sistema «va a petar» y que hay que cambiarlo de forma «valiente», según recoge El País.",
  rows=[row(["«Las pensiones se actualizarán con el IPC»; «Garantizaremos el sistema público de pensiones, su viabilidad»; «La viabilidad y la actualización conforme al IPC de las pensiones son innegociables».", "Alberto Núñez Feijóo, comparecencia en Bruselas, 15-10-2026"], "elpais_bxl"),
        row(["Dijo que el sistema de pensiones «va a petar» y que hay que cambiarlo de forma «valiente».", "Ester Muñoz, portavoz del PP en el Congreso (recogido por El País el 15-10-2026)"], "elpais_bxl"),
        row(["«El sistema de pensiones es viable si tenemos la economía adecuada».", "Juan Bravo, vicesecretario de Hacienda del PP, 15-10-2026"], "elpais_bxl")],
  votes="El 22 de septiembre de 2026 el PP se abstuvo en la toma en consideración de la proposición de ley de Podemos para no recortar la pensión a quien se jubila anticipadamente con 40 años o más cotizados, que salió adelante con 178 votos a favor, 136 abstenciones y 33 en contra (El Debate). Según Business Insider, en junio una iniciativa con el mismo objetivo fue rechazada con los votos de PP y PSOE y la abstención de Vox.",
  vsrc=["debate_pl", "bi_pl"],
  faq_said="Feijóo dijo el 15 de octubre de 2026 que las pensiones «se actualizarán con el IPC» y que esa actualización es «innegociable» (El País)."),
 dict(id="psoe", short="el PSOE", name="PSOE", slug="quiere-el-psoe-quitar-las-pensiones",
  title="¿Quiere el PSOE quitar las pensiones? Lo que ha dicho Sánchez",
  h1="¿Quiere el PSOE quitar las pensiones? Lo que ha dicho y votado",
  desc="¿Quiere el PSOE quitar las pensiones? Sánchez prometió el 14-10-2026 revalorizarlas con el IPC cuatro años más. Sus frases y votos, con fuentes.",
  answer="Según las declaraciones con fuente que hemos encontrado, no. Su candidato, Pedro Sánchez, prometió el 14 de octubre de 2026 «cuatro años más de revalorización de las pensiones conforme al IPC» y dijo el 17 de octubre que «las pensiones no se tocan».",
  rows=[row(["Prometió «cuatro años más de Gobierno progresista, cuatro años más de avances sociales y cero recortes y cuatro años más de revalorización de las pensiones conforme al IPC». Dijo que el sistema público de pensiones «goza de una extraordinaria salud».", "Pedro Sánchez, acto en Zaragoza, 14-10-2026"], "ep_zgz"),
        row(["Dijo que «las pensiones no se tocan».", "Pedro Sánchez, mitin en Fuenlabrada (Madrid), 17-10-2026"], "ep_fuen")],
  votes="El 22 de septiembre de 2026 el PSOE votó a favor de tomar en consideración la proposición de ley de Podemos para no recortar la pensión a quien se jubila anticipadamente con 40 años o más cotizados (El Debate). Según Business Insider, en junio una iniciativa con el mismo objetivo fue rechazada con los votos de PP y PSOE y la abstención de Vox.",
  vsrc=["debate_pl", "bi_pl"],
  faq_said="Sánchez prometió el 14 de octubre de 2026 «cuatro años más de revalorización de las pensiones conforme al IPC» (Europa Press)."),
 dict(id="vox", short="Vox", name="Vox", slug="quiere-vox-quitar-las-pensiones",
  title="¿Quiere Vox quitar las pensiones? Lo que ha dicho Abascal",
  h1="¿Quiere Vox quitar las pensiones? Lo que ha dicho y votado",
  desc="¿Quiere Vox quitar las pensiones? Abascal dijo el 11-10-2026 que se pagarán «al precio que sea». Lo que ha dicho, cómo ha votado y la ley, con fuentes.",
  answer="Según las declaraciones con fuente que hemos encontrado, no. Su candidato, Santiago Abascal, dijo el 11 de octubre de 2026 que las pensiones «se van a pagar al precio que sea y como sea» y negó que Vox vaya a privatizarlas, según Europa Press. También dijo «nos da igual el modelo y la fórmula», sin concretar cómo se revalorizarían.",
  rows=[row(["«Nos da igual el modelo y la fórmula, pero las pensiones de los mayores que las han ganado después de trabajar toda una vida se van a pagar al precio que sea y como sea». Negó que Vox vaya a privatizar las pensiones.", "Santiago Abascal, mitin en Estepona (Málaga), 11-10-2026"], "ep_estepona"),
        row(["Garantizar el pago de las pensiones, sin detallar la fórmula de revalorización.", "Santiago Abascal, acto de Estepona, 11-10-2026 (web oficial de Vox)"], "vox_estepona")],
  votes="El 22 de septiembre de 2026 Vox votó en contra de tomar en consideración la proposición de ley de Podemos para no recortar la pensión a quien se jubila anticipadamente con 40 años o más cotizados; fueron los 33 votos en contra (El Debate). Según Business Insider, en junio Vox se abstuvo en una iniciativa con el mismo objetivo, que fue rechazada.",
  vsrc=["debate_pl", "bi_pl"],
  faq_said="Abascal dijo el 11 de octubre de 2026 que las pensiones «se van a pagar al precio que sea y como sea» y que le da igual «el modelo y la fórmula» (Europa Press)."),
 dict(id="frente-amplio", short="Frente Amplio", name="Frente Amplio", slug="quiere-frente-amplio-quitar-las-pensiones",
  title="¿Quiere Frente Amplio quitar las pensiones? Lo que ha dicho",
  h1="¿Quiere Frente Amplio quitar las pensiones? Lo que ha dicho y votado",
  desc="¿Quiere Frente Amplio quitar las pensiones? Lo que ha dicho en la precampaña del 29-N, lo que no ha concretado y lo que dice la ley, con fuentes.",
  answer="Según las declaraciones con fuente que hemos encontrado, no. Ernest Urtasun dijo el 17 de octubre de 2026, en la presentación del Frente Amplio, que no van a permitir que se «cargue» el sistema público de pensiones. No hemos encontrado propuestas concretas suyas sobre pensiones.",
  rows=[row(["Dijo que el Frente Amplio no va a permitir que se «cargue» el sistema público de pensiones.", "Ernest Urtasun, mitin de presentación en Madrid, 17-10-2026"], "eldiario_fa")],
  votes="Las fuentes que hemos consultado sobre la votación del 22 de septiembre de 2026 (proposición de ley de Podemos sobre jubilación anticipada con 40 años cotizados) no detallan el voto de los diputados del espacio que hoy forma el Frente Amplio, así que no lo afirmamos.",
  vsrc=["debate_pl"],
  faq_said="Urtasun dijo el 17 de octubre de 2026 que no permitirán que se «cargue» el sistema público de pensiones (elDiario.es)."),
 dict(id="podemos", short="Podemos", name="Podemos", slug="quiere-podemos-quitar-las-pensiones",
  title="¿Quiere Podemos quitar las pensiones? Su propuesta y sus votos",
  h1="¿Quiere Podemos quitar las pensiones? Lo que ha dicho y votado",
  desc="¿Quiere Podemos quitar las pensiones? Su ley para jubilarse antes sin recorte con 40 años cotizados, lo que ha dicho y lo que dice la ley, con fuentes.",
  answer="Según las declaraciones con fuente que hemos encontrado, no. Podemos impulsa una proposición de ley para que quien se jubile anticipadamente con 40 años o más cotizados no vea recortada su pensión por los coeficientes reductores. El Congreso aceptó tramitarla el 22 de septiembre de 2026.",
  rows=[row(["Proposición de ley para eliminar los coeficientes reductores en la jubilación anticipada con 40 años o más cotizados, con posible recálculo de pensiones ya reconocidas. Ione Belarra: «Cómo es posible que hayas cotizado durante 40 años y veas penalizada tu pensión».", "Ione Belarra, debate de toma en consideración en el Congreso, 22-09-2026"], "debate_pl"),
        row(["Según Business Insider, el Ministerio de Hacienda calcula que la medida costaría 3.358 millones de euros al año.", "Business Insider, 22-09-2026"], "bi_pl")],
  votes="Podemos es quien presentó la proposición de ley que el Congreso tomó en consideración el 22 de septiembre de 2026 con 178 votos a favor, 136 abstenciones y 33 en contra (El Debate). Según Business Insider, en junio una iniciativa con el mismo objetivo fue rechazada con los votos de PP y PSOE y la abstención de Vox.",
  vsrc=["debate_pl", "bi_pl"],
  faq_said="Podemos defiende que quien se jubile antes con 40 años o más cotizados no tenga recorte en la pensión (proposición de ley tomada en consideración el 22-09-2026)."),
]

ELE_DISC = "Contenido informativo y neutral: mismas secciones y mismo orden para todos los partidos. Recogemos lo que cada partido ha dicho y votado, con fuente y fecha; no valoramos las propuestas ni recomendamos ningún voto."
ELE_REL_BASE = [{"href": HUB, "label": "¿Quiere algún partido quitar las pensiones?"},
                {"href": "/elecciones/promesas/que-propone-cada-partido-pensiones", "label": "Pensiones: qué propone cada partido el 29-N"},
                {"href": "/trabajo/revalorizacion-pensiones-2026", "label": "Subida de las pensiones en 2026"}]

def uniq(keys):
    out, seen = [], set()
    for k in keys:
        if S[k][1] not in seen: out.append(s(k)); seen.add(S[k][1])
    return out

guides = []
for p in PARTIES:
    others = [{"href": f"/elecciones/{o['slug']}", "label": f"¿Quiere {o['short']} quitar las pensiones?"} for o in PARTIES if o["id"] != p["id"]]
    srcs = uniq([r["source"]["href"] and k for r in [] for k in []] + [k for k in S if any(S[k][1] == r["source"]["href"] for r in p["rows"])] + p["vsrc"] + LEY_SRC + ["rd806"])
    guides.append({
     "id": f"pens29n-{p['id']}", "pack": "elecciones", "reviewedAt": RV, "path": f"/elecciones/{p['slug']}",
     "h1": p["h1"], "title": p["title"], "description": p["desc"],
     "lead": "Respuesta corta: " + p["answer"][0].lower() + p["answer"][1:],
     "cta": {"href": HUB, "label": "Ver qué ha dicho cada partido"},
     "secondaryCta": {"href": "/elecciones/programas-electorales-29n", "label": "Programas y mítines del 29-N"},
     "sources": srcs, "related": ELE_REL_BASE + others, "disclaimer": ELE_DISC,
     "faqs": [
      {"q": f"¿Quiere {p['short']} quitar las pensiones?", "a": p["answer"]},
      {"q": f"¿Qué ha dicho {p['short']} sobre subir las pensiones con el IPC?", "a": p["faq_said"]},
      {"q": f"¿Ha publicado {p['short']} su programa para el 29-N?", "a": f"A {D18}, no. Cuando lo publique, añadiremos aquí lo que diga sobre pensiones, con el enlace."},
      {"q": "¿Puede un Gobierno dejar de subir las pensiones por su cuenta?", "a": "La subida anual con el IPC está en el artículo 58 de la Ley General de la Seguridad Social. Para cambiarla hace falta una norma con rango de ley aprobada o convalidada por el Congreso."},
     ],
     "sections": [
      {"id": "respuesta", "title": "Respuesta corta", "paragraphs": [p["answer"]]},
      {"id": "que-ha-dicho", "title": f"Qué ha dicho {p['short']} sobre las pensiones", "paragraphs": [f"Declaraciones públicas con fuente y fecha, revisadas el {D18}."],
       "table": {"caption": f"{p['name']}: declaraciones sobre pensiones", "head": H, "rows": p["rows"]}},
      {"id": "votaciones", "title": "Qué ha votado en el Congreso", "paragraphs": [p["votes"]]},
      {"id": "programa", "title": "Programa electoral", "paragraphs": [NOPROG]},
      {"id": "ley-actual", "title": "Qué dice la ley hoy", "paragraphs": LEY},
      {"id": "criterio", "title": "Cómo hemos hecho esta verificación", "paragraphs": CRIT},
     ],
    })

hub_rows = [
 {"cells": ["PP", "¿Quitarlas? No hemos encontrado ninguna declaración en ese sentido", "Feijóo: «Las pensiones se actualizarán con el IPC» (15-10-2026). Ester Muñoz: el sistema «va a petar» y hay que cambiarlo de forma «valiente»."], "source": s("elpais_bxl")},
 {"cells": ["PSOE", "¿Quitarlas? No hemos encontrado ninguna declaración en ese sentido", "Sánchez: «cuatro años más de revalorización de las pensiones conforme al IPC» (14-10-2026) y «las pensiones no se tocan» (17-10-2026)."], "source": s("ep_zgz")},
 {"cells": ["Vox", "¿Quitarlas? No hemos encontrado ninguna declaración en ese sentido", "Abascal: las pensiones «se van a pagar al precio que sea y como sea»; «nos da igual el modelo y la fórmula» (11-10-2026)."], "source": s("ep_estepona")},
 {"cells": ["Frente Amplio", "¿Quitarlas? No hemos encontrado ninguna declaración en ese sentido", "Urtasun: no permitirán que se «cargue» el sistema público de pensiones (17-10-2026)."], "source": s("eldiario_fa")},
 {"cells": ["Podemos", "¿Quitarlas? No hemos encontrado ninguna declaración en ese sentido", "Proposición de ley para jubilarse antes sin recorte con 40 años cotizados, tomada en consideración el 22-09-2026."], "source": s("debate_pl")},
 {"cells": ["Democracia 21", "¿Quitarlas? No hemos encontrado ninguna declaración en ese sentido", "No hemos encontrado declaraciones sobre pensiones. En su presentación (10-10-2026) habló de vivienda, impuestos, instituciones e inmigración."], "source": s("ep_d21")},
]
hub_answer = f"A {D18} no hemos encontrado ninguna declaración de PP, PSOE, Vox, Frente Amplio, Podemos ni Democracia 21 a favor de quitar las pensiones. PP, PSOE y Vox se han comprometido a pagarlas o a actualizarlas con el IPC; Frente Amplio dice que no permitirá que se «cargue» el sistema público y Podemos propone jubilarse antes sin recorte con 40 años cotizados. Ninguno ha publicado todavía su programa para el 29-N."
guides.insert(0, {
 "id": "pens29n-hub", "pack": "elecciones", "reviewedAt": RV, "path": HUB,
 "h1": "¿Quiere algún partido quitar las pensiones? Lo que ha dicho cada uno",
 "title": "¿Quiere algún partido quitar las pensiones? Lo que dicen el 29-N",
 "description": "¿Quién quiere quitar las pensiones? Lo que han dicho PP, PSOE, Vox, Frente Amplio, Podemos y Democracia 21 antes del 29-N, con fecha y fuente de cada frase.",
 "lead": "Respuesta corta: " + hub_answer[0].lower() + hub_answer[1:],
 "cta": {"href": "/elecciones/promesas/que-propone-cada-partido-pensiones", "label": "Comparar propuestas sobre pensiones"},
 "secondaryCta": {"href": "/trabajo/revalorizacion-pensiones-2026", "label": "Cuánto han subido en 2026"},
 "sources": uniq(["elpais_bxl", "ep_zgz", "ep_fuen", "ep_estepona", "eldiario_fa", "debate_pl", "bi_pl", "ep_d21", "jec_coal"] + LEY_SRC + ["rd806"]),
 "related": [{"href": f"/elecciones/{o['slug']}", "label": f"¿Quiere {o['short']} quitar las pensiones?"} for o in PARTIES] + [
   {"href": "/elecciones/promesas/que-propone-cada-partido-pensiones", "label": "Pensiones: qué propone cada partido el 29-N"},
   {"href": "/elecciones/programas-electorales-29n", "label": "Programas y mítines del 29-N"},
   {"href": "/trabajo/revalorizacion-pensiones-2026", "label": "Subida de las pensiones en 2026"},
   {"href": "/trabajo/como-pedir-la-jubilacion", "label": "Cómo pedir la jubilación"}],
 "disclaimer": ELE_DISC,
 "faqs": [
  {"q": "¿Qué partido quiere quitar las pensiones?", "a": hub_answer},
  {"q": "¿Por qué se habla ahora de quitar las pensiones?", "a": "La polémica se abrió en la precampaña cuando la portavoz del PP en el Congreso, Ester Muñoz, dijo que el sistema «va a petar» y que hay que cambiarlo de forma «valiente», y Feijóo respondió que la actualización con el IPC es «innegociable» (El País, 15-10-2026). Abascal dijo el 11-10-2026 que le da igual «el modelo y la fórmula» pero que las pensiones se pagarán."},
  {"q": "¿Y Democracia 21?", "a": "Concurre en coalición con Ciudadanos y UCIN solo en Madrid y Barcelona, según la Junta Electoral Central. En su presentación del 10 de octubre de 2026 no habló de pensiones y no hemos encontrado otras declaraciones suyas sobre el tema."},
  {"q": "¿Y los demás partidos?", "a": f"Para ERC, Junts, EH Bildu, PNV, BNG, Coalición Canaria y UPN no hemos encontrado declaraciones sobre pensiones en esta precampaña a {D18}."},
  {"q": "¿Cuánto subieron las pensiones en 2026?", "a": "Un 2,7 %, según el Real Decreto-ley 3/2026 y el Real Decreto 241/2026."},
 ],
 "sections": [
  {"id": "respuesta", "title": "Respuesta corta", "paragraphs": [hub_answer]},
  {"id": "tabla", "title": "Partido a partido", "paragraphs": ["Mismo criterio para todos: ¿ha dicho en público que quiera quitar o dejar de pagar las pensiones? Y qué ha dicho sobre ellas, con fecha. Orden por votos en las generales de 2023; Democracia 21, que no concurrió en 2023, va al final."],
   "table": {"caption": "¿Ha dicho algún partido que quiera quitar las pensiones?", "head": ["Partido", "¿Ha dicho que quiera quitarlas?", "Qué ha dicho sobre pensiones", "Fuente"], "rows": hub_rows}},
  {"id": "otros", "title": "Otros partidos", "paragraphs": [f"ERC, Junts, EH Bildu, PNV, BNG, Coalición Canaria y UPN: no hemos encontrado declaraciones sobre pensiones en esta precampaña a {D18}.", "Democracia 21 concurre como coalición «Democracia para el siglo 21» (D21) con Ciudadanos y UCIN, solo en Madrid y Barcelona, según la lista de coaliciones de la Junta Electoral Central."]},
  {"id": "por-partido", "title": "Ficha de cada partido", "paragraphs": ["Cada ficha tiene las mismas secciones: respuesta corta, qué ha dicho, qué ha votado en el Congreso, estado del programa y qué dice la ley hoy."],
   "lists": [[f"¿Quiere {o['short']} quitar las pensiones? Ficha con sus declaraciones y votos." for o in PARTIES]]},
  {"id": "ley-actual", "title": "Qué dice la ley hoy", "paragraphs": LEY},
  {"id": "criterio", "title": "Cómo hemos hecho esta verificación", "paragraphs": CRIT},
 ],
})

# ---------------- trabajo: jubilación y revalorización ----------------
TRAB_DISC = "No somos la Seguridad Social. Las cifras salen del BOE y de la web oficial de la Seguridad Social, enlazados en cada apartado. Tu caso concreto lo resuelve el INSS: si una fuente oficial cambia, manda la fuente oficial."
rev_rows = [
 row(["Subida general de las pensiones contributivas y de Clases Pasivas", "2,7 % sobre la cuantía a 31-12-2025, con efectos desde el 1-1-2026"], "rdl3"),
 row(["Pensión máxima", "3.359,60 € al mes (47.034,40 € al año)"], "rdl3"),
 row(["Complemento para la reducción de la brecha de género", "36,90 € al mes"], "rdl3"),
 row(["Pensión no contributiva de jubilación o invalidez", "8.803,20 € al año"], "rdl3"),
 row(["Pensión del SOVI no concurrente", "8.394,40 € al año"], "rdl3"),
]
MIN = [("Titular con 65 años o más", "17.592,40 €", "13.106,80 €", "12.441,80 €"),
       ("Titular menor de 65 años", "17.592,40 €", "12.262,60 €", "11.590,60 €"),
       ("Titular con 65 años procedente de gran incapacidad", "26.385,80 €", "19.660,20 €", "18.662,00 €")]
min_rows = []
for sit, c1, c2, c3 in MIN:
    min_rows += [row([f"{sit}, con cónyuge a cargo", c1], "rdl3"), row([f"{sit}, sin cónyuge (unipersonal)", c2], "rdl3"), row([f"{sit}, con cónyuge no a cargo", c3], "rdl3")]
edad_rows = [
 row(["2025", "38 años y 3 meses o más: 65 años", "Menos de 38 años y 3 meses: 66 años y 8 meses"], "ss_req"),
 row(["2026", "38 años y 3 meses o más: 65 años", "Menos de 38 años y 3 meses: 66 años y 10 meses"], "ss_req"),
 row(["Desde 2027", "38 años y 6 meses o más: 65 años", "Menos de 38 años y 6 meses: 67 años"], "ss_req"),
]
trab = [
 {"id": "trabajo-revalorizacion-pensiones-2026", "pack": "trabajo", "reviewedAt": RV, "path": "/trabajo/revalorizacion-pensiones-2026",
  "h1": "Subida de las pensiones en 2026: el 2,7 %, la pensión máxima y las mínimas",
  "title": "Subida de las pensiones 2026: 2,7 % y cuantías mínimas (BOE)",
  "description": "Las pensiones subieron un 2,7 % en 2026: pensión máxima de 3.359,60 € al mes, mínimas, no contributivas y cómo se calculará la subida de 2027. Con el BOE.",
  "lead": "Respuesta corta: en 2026 las pensiones contributivas subieron un 2,7 %, con efectos desde el 1 de enero, según el Real Decreto-ley 3/2026 (BOE de 4 de febrero). La pensión máxima es de 3.359,60 € al mes y la no contributiva de 8.803,20 € al año. La subida de 2027 dependerá de la media del IPC hasta noviembre de 2026.",
  "cta": {"href": S["rdl3"][1], "label": "Leer el Real Decreto-ley 3/2026 en el BOE"},
  "secondaryCta": {"href": "/trabajo/como-pedir-la-jubilacion", "label": "Cómo pedir la jubilación"},
  "sources": uniq(["rdl3", "rd241", "lgss"]),
  "related": [{"href": "/trabajo/como-pedir-la-jubilacion", "label": "Cómo pedir la jubilación en 2026"},
              {"href": "/trabajo/vida-laboral", "label": "Descargar la vida laboral"},
              {"href": "/ayudas-por-gobierno/jubilados", "label": "Ayudas a jubilados según cada gobierno"},
              {"href": HUB, "label": "¿Quiere algún partido quitar las pensiones?"},
              {"href": "/elecciones/promesas/que-propone-cada-partido-pensiones", "label": "Pensiones: qué propone cada partido el 29-N"}],
  "disclaimer": TRAB_DISC,
  "faqs": [
   {"q": "¿Cuánto han subido las pensiones en 2026?", "a": "Un 2,7 % las contributivas y las de Clases Pasivas, sobre la cuantía que tenían a 31 de diciembre de 2025 (Real Decreto-ley 3/2026)."},
   {"q": "¿Por qué un 2,7 %?", "a": "Porque el artículo 58 de la Ley General de la Seguridad Social manda subirlas con la media de las tasas interanuales del IPC de los doce meses previos a diciembre del año anterior, y ese valor fue el 2,7 %."},
   {"q": "¿Cuál es la pensión máxima en 2026?", "a": "3.359,60 € al mes, o 47.034,40 € al año."},
   {"q": "¿Cuánto es la pensión mínima de jubilación en 2026?", "a": "Para un titular de 65 años o más: 17.592,40 € al año con cónyuge a cargo, 13.106,80 € sin cónyuge y 12.441,80 € con cónyuge no a cargo (anexo I del Real Decreto-ley 3/2026)."},
   {"q": "¿Cuánto subirán en 2027?", "a": "Se sabrá con el IPC de noviembre de 2026: la ley fija la media de las tasas interanuales del IPC de diciembre de 2025 a noviembre de 2026. No damos una cifra antes de que exista el dato oficial."},
  ],
  "sections": [
   {"id": "cuanto", "title": "Cuánto han subido en 2026", "paragraphs": ["El Real Decreto-ley 3/2026, de 3 de febrero, fija una revalorización general del 2,7 % para las pensiones contributivas de la Seguridad Social y de Clases Pasivas, aplicada sobre la cuantía que tenían a 31 de diciembre de 2025. Entró en vigor el 4 de febrero con efectos desde el 1 de enero de 2026.", "El Real Decreto 241/2026, de 25 de marzo, desarrolla esa revalorización para 2026."],
    "table": {"caption": "Pensiones 2026: cifras del BOE", "head": ["Concepto", "Importe 2026", "Fuente"], "rows": rev_rows}},
   {"id": "minimas", "title": "Pensiones mínimas de jubilación en 2026", "paragraphs": ["Importes anuales del anexo I del Real Decreto-ley 3/2026. Para cobrar el complemento a mínimos hay un límite de ingresos: 9.442,00 € al año sin cónyuge a cargo y 11.013,00 € con cónyuge a cargo."],
    "table": {"caption": "Cuantías mínimas anuales de la pensión de jubilación contributiva, 2026", "head": ["Situación", "Importe anual", "Fuente"], "rows": min_rows}},
   {"id": "por-que-decreto", "title": "Por qué se aprobó por decreto en febrero", "paragraphs": ["Según el preámbulo del Real Decreto-ley 3/2026, no se aprobaron Presupuestos para 2026, así que siguen prorrogados los de 2023. La revalorización de las pensiones no se prorroga sola con los Presupuestos, por eso el Gobierno la aprobó con un real decreto-ley."]},
   {"id": "2027", "title": "Cómo se calculará la subida de 2027", "paragraphs": ["El artículo 58 de la Ley General de la Seguridad Social fija la regla: las pensiones contributivas se revalorizan al comienzo de cada año con la media de las tasas de variación interanual del IPC de los doce meses previos a diciembre del año anterior. Si esa media fuera negativa, las pensiones no bajan.", "Para 2027, esa media es la del IPC de diciembre de 2025 a noviembre de 2026, que publica el INE. Actualizaremos esta página con la cifra oficial cuando se conozca."]},
   {"id": "comprobar", "title": "Cómo comprobar tu pensión", "paragraphs": ["El importe concreto de cada pensionista aparece en la comunicación de revalorización y en los servicios de Tu Seguridad Social. Si vas a jubilarte, el simulador oficial calcula una estimación con tus cotizaciones."], "lists": [["Revisa tu vida laboral para ver tus cotizaciones.", "Usa el simulador de jubilación de Tu Seguridad Social.", "Si tienes dudas sobre tu importe, consulta al INSS."]]},
  ]},
 {"id": "trabajo-como-pedir-la-jubilacion", "pack": "trabajo", "reviewedAt": RV, "path": "/trabajo/como-pedir-la-jubilacion",
  "h1": "Cómo pedir la jubilación en 2026: edad, plazos, simulador y solicitud",
  "title": "Cómo pedir la jubilación en 2026: edad, plazos y simulador",
  "description": "Edad de jubilación en 2026 (65 años o 66 y 10 meses), cotización mínima, cuándo pedirla y cómo hacerlo por internet o con cita. Fuentes oficiales.",
  "lead": "Respuesta corta: en 2026 te puedes jubilar a los 65 años si has cotizado 38 años y 3 meses o más; si no, a los 66 años y 10 meses. Necesitas al menos 15 años cotizados. La solicitud se presenta en los tres meses anteriores o posteriores a la fecha en que dejas de trabajar, por internet en Tu Seguridad Social o con cita previa.",
  "cta": {"href": S["ss_sol"][1], "label": "Cómo solicitarla (Seguridad Social)"},
  "secondaryCta": {"href": S["ss_sim"][1], "label": "Simulador de jubilación"},
  "sources": uniq(["ss_req", "ss_hc", "ss_sol", "ss_sim", "lgss"]),
  "related": [{"href": "/trabajo/revalorizacion-pensiones-2026", "label": "Subida de las pensiones en 2026"},
              {"href": "/trabajo/vida-laboral", "label": "Descargar la vida laboral"},
              {"href": "/dni/clave-registrarse", "label": "Registrarse en Cl@ve"},
              {"href": "/ayudas-por-gobierno/jubilados", "label": "Ayudas a jubilados según cada gobierno"},
              {"href": HUB, "label": "¿Quiere algún partido quitar las pensiones?"}],
  "disclaimer": TRAB_DISC,
  "faqs": [
   {"q": "¿A qué edad me puedo jubilar en 2026?", "a": "A los 65 años si has cotizado 38 años y 3 meses o más; con menos cotización, a los 66 años y 10 meses. Desde 2027: 65 años con 38 años y 6 meses cotizados, o 67 años."},
   {"q": "¿Cuántos años hay que cotizar para cobrar la jubilación?", "a": "Al menos 15 años, y 2 de ellos dentro de los 15 inmediatamente anteriores a la jubilación."},
   {"q": "¿Cuándo tengo que pedir la jubilación?", "a": "En general, dentro de los tres meses anteriores o posteriores a la fecha en que dejas de trabajar. Si la pides más tarde, solo cobras con efectos de hasta tres meses antes de la solicitud."},
   {"q": "¿Puedo pedirla sin certificado digital?", "a": "Sí. La Seguridad Social tiene una plataforma segura sin certificado: te identificas con un selfie mostrando tu documento de identidad y firmas a mano en pantalla con un código que te envían."},
   {"q": "¿Cómo sé cuánto me va a quedar?", "a": "Con el simulador de jubilación de Tu Seguridad Social, que usa tus datos de cotización, permite cambiar la fecha y otras situaciones y genera un PDF con el cálculo. Es una estimación, no una resolución."},
  ],
  "sections": [
   {"id": "edad", "title": "Edad de jubilación en 2026", "paragraphs": ["La edad ordinaria depende de los años cotizados y sube de forma gradual hasta 2027. Los meses se cuentan de fecha a fecha desde tu nacimiento."],
    "table": {"caption": "Edad ordinaria de jubilación según años cotizados", "head": ["Año", "Con esta cotización", "Con menos cotización", "Fuente"], "rows": edad_rows}},
   {"id": "cotizacion", "title": "Cuánto hay que haber cotizado", "paragraphs": ["Mínimo 15 años (5.475 días), y al menos 2 dentro de los 15 años inmediatamente anteriores a la jubilación. No cuenta la parte de las pagas extra.", "Hay jubilaciones anticipadas (desde los 61 años sin condición de mutualista o desde los 60 con ella, entre otras) y jubilación parcial o flexible, con requisitos propios que explica la Seguridad Social."]},
   {"id": "cuando", "title": "Cuándo pedirla", "paragraphs": ["Con carácter general, la solicitud se presenta dentro de los tres meses anteriores o posteriores a la fecha en que dejas de trabajar, y la pensión se cobra desde el día siguiente al cese.", "Si la pides después de esos tres meses, los efectos económicos tienen una retroactividad máxima de tres meses desde la solicitud. Si cobras el paro o el subsidio para mayores de 52 años, puedes pedirla desde tres meses antes de que se extinga por cumplir la edad."]},
   {"id": "como", "title": "Cómo pedirla, paso a paso", "paragraphs": ["Por internet, sin cita, en Tu Seguridad Social. También se puede presentar en nombre de otra persona."],
    "lists": [["Con DNI electrónico, certificado digital o Cl@ve Permanente: entra en Tu Seguridad Social y rellena la solicitud de jubilación.", "Sin certificado: usa la plataforma segura de la Seguridad Social con tu correo y un selfie mostrando tu documento de identidad; firmas a mano en pantalla con un código.", "Antes de enviarla, actualiza tus datos fiscales y comprueba la cuenta bancaria. El sistema te dirá si podrías tener derecho al complemento a mínimos.", "En persona: pide cita previa en un centro de atención de la Seguridad Social (CAISS)."]]},
   {"id": "simulador", "title": "El simulador de la Seguridad Social", "paragraphs": ["El simulador de jubilación de Tu Seguridad Social calcula tus posibles fechas de jubilación y la cuantía estimada con tus datos de cotización, proyectando tu situación actual hasta la edad ordinaria.", "Permite cambiar periodos de trabajo y bases futuras, y tener en cuenta hijos, discapacidad, trabajo en el extranjero o seguir trabajando tras jubilarte. Cada cálculo se descarga en PDF. Es una estimación: la cuantía real la fija el INSS al resolver."]},
  ]},
]

def ts(name, const, items, header):
    body = json.dumps(items, ensure_ascii=False, indent=1)
    (ROOT / f"src/lib/tramites/{name}.ts").write_text(f'import type {{ Guide }} from "@/lib/tramites/types";\n\n/** {header} GENERADO con scripts/gen_pensiones_20261018.py: no editar a mano. */\nexport const {const}: Guide[] = {body};\n')
ts("pensiones-29n", "PENSIONES_29N_GUIDES", guides, "Serie «¿Quiere [partido] quitar las pensiones?» (29-N), revisada el 18-10-2026.")
ts("jubilacion-2026", "JUBILACION_2026_GUIDES", trab, "Pensiones para mayores de 55: revalorización 2026 y cómo pedir la jubilación.")
for g in guides + trab:
    assert len(g["description"]) <= 160, (g["path"], len(g["description"]))
    assert len(g["title"]) <= 66, (g["path"], len(g["title"]))
    hrefs = [x["href"] for x in g["sources"]]; assert len(hrefs) == len(set(hrefs)), g["path"]
    for sec in g["sections"]:
        k = [p[:40] for p in sec["paragraphs"]]; assert len(k) == len(set(k)), (g["path"], sec["id"])
print(len(guides), len(trab))
