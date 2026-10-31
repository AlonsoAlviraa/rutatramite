"""Genera src/lib/tramites/cuando-29n.ts: preguntas «cuándo / qué pasa si» del 29-N (19-10-2026).
Fuentes leídas: RD 806/2026, LOREG (BOE consolidado), calendario JEC eg2026, nota INE EG2026,
Instrucción JEC 6/2011 consolidada, Constitución, BOE 2023, Congreso, CIS, prensa fechada (debates)."""
import json, pathlib

REV = "2026-10-19"
LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672"
CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229"
def loreg(a, l): return {"label": f"LOREG, {l}", "href": f"{LOREG}#{a}"}
def ce(a, l): return {"label": f"Constitución Española, {l}", "href": f"{CE}#{a}"}
RD = {"label": "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre", "href": "https://www.boe.es/eli/es/rd/2026/10/05/806"}
JEC = {"label": "Junta Electoral Central: calendario electoral de las generales 2026", "href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf"}
INE = {"label": "INE, 09-10-2026: nota de la Oficina del Censo Electoral para el 29-N", "href": "https://www.ine.es/dyngs/Prensa/EG2026.htm"}
INSTR = {"label": "BOE: Instrucción 6/2011 de la Junta Electoral Central (texto consolidado)", "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2011-7705"}
RD2023 = {"label": "BOE: Real Decreto 400/2023, convocatoria del 23 de julio de 2023", "href": "https://www.boe.es/eli/es/rd/2023/05/29/400"}
CONG = {"label": "Congreso de los Diputados: sesiones de investidura", "href": "https://www.congreso.es/es/cem/sesiones-de-investidura"}
MONCLOA = {"label": "La Moncloa, 16-11-2023: Sánchez, investido por mayoría absoluta", "href": "https://www.lamoncloa.gob.es/presidente/actividades/paginas/2023/161123-sanchez-2sesion-investidura-xv-legislatura.aspx"}
BOE23P = {"label": "BOE 21-06-2023: candidaturas presentadas (BOE-A-2023-14733)", "href": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-14733"}
BOE23R = {"label": "BOE 27-06-2023: candidaturas proclamadas (BOE-A-2023-15066)", "href": "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-15066"}
CIS23 = {"label": "CIS, 05-07-2023: nota de la encuesta preelectoral de las generales 2023", "href": "https://www.cis.es/es/w/nota-informativa-sobre-la-encuesta-preelectoral-elecciones-generales-2023-"}
CIS26 = {"label": "CIS, 14-10-2026: avance del barómetro de octubre (estudio 3582)", "href": "https://www.cis.es/es/w/avance-de-resultados-del-estudio-3582-bar%C3%B3metro-de-octubre-2026-"}
CIS23JUL = {"label": "CIS: ficha del barómetro de julio de 2023 (avance el 13-07-2023)", "href": "https://www.cis.es/es/estudios/barometro-de-julio-2023"}
RTVE26 = {"label": "RTVE, 05-10-2026: propuesta de tres debates", "href": "https://www.rtve.es/noticias/20261005/propuesta-rtve-debates-campana-electoral-cara-cara-sanchez-feijoo/17254356.shtml"}
EFE26 = {"label": "EFE, 09-10-2026: el PP acepta tres debates", "href": "https://efe.com/espana/2026-10-09/pp-acepta-tres-debates-electorales-29n/"}
PAIS26 = {"label": "El País, 09-10-2026: Atresmedia ofrecía el 18 de noviembre para el debate a cuatro", "href": "https://elpais.com/espana/elecciones-generales/2026-10-09/feijoo-acepta-un-debate-cara-a-cara-con-sanchez-y-otro-a-cuatro-con-el-resto-de-candidatos.html"}
EP26 = {"label": "Europa Press, 09-10-2026: el PSOE irá «a todos los debates»", "href": "https://www.europapress.es/nacional/noticia-psoe-asegura-participara-todos-debates-electorales-advierte-feijoo-no-decide-donde-20261009113020.html"}
A3_26 = {"label": "Antena 3 Noticias, 09-10-2026: debate a cuatro de Atresmedia", "href": "https://www.antena3.com/noticias/espana/alberto-nunez-feijoo-acepta-debate-cuatro-atresmedia_202610096ac8a9376e8df44596ad2615.html"}
ATR23 = {"label": "Atresmedia, 07-07-2023: «Cara a Cara. El Debate», lunes 10 de julio a las 22:00", "href": "https://www.atresmedia.com/prensa/notas/corporativas/asi-sera-cara-cara-debate-atresmedia-unico-cara-cara-pedro-sanchez-alberto-nunez-feijoo-celebra-atresmedia-este-lunes-10-julio_2023070764a80dae1f11910001eec6cd.html"}
RTVE23 = {"label": "RTVE, 20-07-2023: crónica del 19 de julio, debate a tres", "href": "https://www.rtve.es/noticias/20230720/elecciones-generales-2023-cronica-jornada-19-julio/2451123.shtml"}
RTVE23B = {"label": "RTVE, 19-07-2023: los tres debates de la campaña del 23-J", "href": "https://www.rtve.es/noticias/20230719/feijoo-cree-debate-rtve-tambien-deberian-ir-junqueras-otegi/2452397.shtml"}

P = "/elecciones/"
L = {
 "programas": {"href": P+"programas-electorales-29n", "label": "Programas electorales del 29-N: cuándo salen"},
 "calendario": {"href": P+"calendario-29-noviembre", "label": "Calendario completo del 29-N"},
 "hub": {"href": "/elecciones", "label": "Todas las guías de las elecciones"},
 "debate": {"href": P+"debate-electoral-29n", "label": "Debates del 29-N: fechas y quién ha aceptado"},
 "sorteo": {"href": P+"sorteo-mesa-electoral-29n", "label": "¿Me toca mesa? Cuándo es el sorteo"},
 "excusa": {"href": P+"excusa-mesa-electoral", "label": "Excusas para la mesa electoral"},
 "tarjeta": {"href": P+"tarjeta-censal-cuando-llega", "label": "Tarjeta censal: cuándo llega"},
 "propaganda": {"href": P+"no-recibir-propaganda-electoral", "label": "Cómo no recibir propaganda electoral"},
 "listas": {"href": P+"candidaturas-29n-boe", "label": "Listas del 29-N: cuándo salen en el BOE"},
 "gobierno": {"href": P+"cuando-habra-gobierno-29n", "label": "¿Cuándo habrá Gobierno tras el 29-N?"},
 "cis": {"href": P+"cis-preelectoral-29n", "label": "CIS preelectoral: cuándo sale"},
 "novoto": {"href": P+"que-pasa-si-no-voto", "label": "¿Qué pasa si no voto?"},
 "mesa": {"href": P+"miembro-de-mesa", "label": "Me ha tocado mesa: qué hago"},
 "dieta": {"href": P+"miembro-de-mesa-dieta-y-permisos", "label": "Mesa electoral: dieta y permisos"},
 "dondevoto": {"href": P+"donde-voto-mesa-electoral", "label": "Dónde voto el 29-N"},
 "censo": {"href": P+"consultar-censo-electoral", "label": "Consultar el censo electoral"},
 "campana": {"href": P+"campana-y-precampana", "label": "Campaña y precampaña: fechas"},
 "encuestas": {"href": P+"encuestas-29n", "label": "Últimas encuestas del 29-N"},
 "barometro": {"href": P+"barometro-cis-que-es", "label": "Barómetro del CIS: cómo leerlo"},
 "prohibidas": {"href": P+"encuestas-prohibidas", "label": "Encuestas prohibidas del 24 al 28"},
 "presidente": {"href": P+"como-se-elige-presidente-gobierno", "label": "Cómo se elige al presidente"},
 "mayoria": {"href": P+"mayoria-absoluta-176-escanos", "label": "Mayoría absoluta: 176 escaños"},
 "repeticion": {"href": P+"repeticion-electoral", "label": "Repetición electoral"},
 "resultados": {"href": P+"resultados-y-escrutinio", "label": "Resultados y escrutinio"},
 "coaliciones": {"href": P+"nuevo-partido-coalicion", "label": "Coaliciones registradas para el 29-N"},
 "blanco": {"href": P+"a-quien-beneficia-el-voto-en-blanco", "label": "¿A quién beneficia el voto en blanco?"},
 "correo": {"href": P+"voto-por-correo", "label": "Voto por correo: hasta el 19 de noviembre"},
 "documentacion": {"href": P+"documentacion-voto-por-correo", "label": "Qué te llega para votar por correo"},
 "reflexion": {"href": P+"jornada-de-reflexion", "label": "Jornada de reflexión: 28 de noviembre"},
 "promesas": {"href": P+"promesas", "label": "Qué propone cada partido"},
}
def rel(*keys): return [L[k] for k in keys]
def row(cells, src): return {"cells": cells, "source": src}

G = []

# 1. Debates
G.append({
 "id": "c29n-debate", "pack": "elecciones", "reviewedAt": REV,
 "path": P+"debate-electoral-29n",
 "h1": "Debates electorales del 29-N: fechas propuestas, quién ha aceptado y qué falta",
 "title": "Debate electoral del 29-N: cuándo es y qué está confirmado",
 "description": "¿Cuándo es el debate electoral del 29-N? Fechas que proponen RTVE, Atresmedia y Mediaset, qué han respondido los partidos y cómo fueron los debates de 2023.",
 "lead": "Respuesta corta: a 19 de octubre de 2026 no hemos encontrado ningún debate con fecha cerrada por la cadena y por todos los participantes. El PP ha aceptado un cara a cara en Mediaset el lunes 16 de noviembre, un debate a cuatro en Atresmedia el jueves 26 y uno de portavoces en RTVE el lunes 23; el PSOE dice que irá «a todos los debates» sin fijar fechas. Cualquier debate caerá dentro de la campaña, del 13 al 27 de noviembre.",
 "cta": L["calendario"], "secondaryCta": L["programas"],
 "sources": [RD, RTVE26, EFE26, PAIS26, EP26, A3_26, RD2023, ATR23, RTVE23, RTVE23B, loreg("asesentaynueve", "artículo 69: sondeos")],
 "related": rel("programas", "calendario", "campana", "prohibidas", "encuestas", "hub"),
 "faqs": [
  {"q": "¿Cuándo es el debate electoral del 29-N?", "a": "A 19 de octubre de 2026 no hay fecha cerrada por todas las partes. Las fechas que se manejan son el 16 de noviembre (cara a cara en Mediaset, aceptado por el PP), el 17 (cara a cara propuesto por RTVE), el 23 (portavoces en RTVE) y el 26 (debate a cuatro, propuesto por RTVE y pedido por el PP a Atresmedia)."},
  {"q": "¿Habrá cara a cara entre Sánchez y Feijóo?", "a": "El PP ha aceptado el de Mediaset el lunes 16 de noviembre y RTVE propone el martes 17. El PSOE ha dicho que participará en todos los debates, pero que los organizan los medios, no los partidos; no ha anunciado una fecha."},
  {"q": "¿Habrá debate a cuatro?", "a": "RTVE lo propone para el 26 de noviembre con PP, PSOE, Vox y Frente Amplio. Atresmedia ofrecía el 18 y el PP le ha pedido el 26. Antena 3 informó el 9 de octubre de que Vox habría aceptado esa fecha."},
  {"q": "¿Cuándo fueron los debates de 2023?", "a": "El único cara a cara entre Sánchez y Feijóo fue el lunes 10 de julio de 2023 en Atresmedia, el primer lunes de campaña. El 19 de julio RTVE emitió un debate a tres con Sánchez, Díaz y Abascal, al que Feijóo no acudió."},
  {"q": "¿Puede haber debates después del 27 de noviembre?", "a": "No como acto de campaña: la campaña termina a las 24:00 del viernes 27 y el sábado 28 es jornada de reflexión."},
 ],
 "sections": [
  {"id": "propuestas", "title": "Lo que proponen las cadenas", "paragraphs": ["Son propuestas de las televisiones. Un debate solo está cerrado cuando la cadena anuncia fecha, hora y participantes confirmados."],
   "table": {"caption": "Debates propuestos para el 29-N, según la fuente de cada fila", "head": ["Cadena", "Formato", "Fecha propuesta", "Fuente"], "rows": [
     row(["RTVE", "Cara a cara Sánchez–Feijóo", "Martes 17 de noviembre"], RTVE26),
     row(["RTVE", "Portavoces de los ocho grupos del Congreso", "Lunes 23 de noviembre"], RTVE26),
     row(["RTVE", "A cuatro: PP, PSOE, Vox y Frente Amplio", "Jueves 26 de noviembre"], RTVE26),
     row(["Atresmedia", "A cuatro con los principales candidatos", "Miércoles 18 de noviembre (el PP pide el 26)"], PAIS26),
     row(["Mediaset", "Cara a cara Sánchez–Feijóo", "Lunes 16 de noviembre, fecha que plantea el PP al aceptar"], EFE26),
   ]}},
  {"id": "partidos", "title": "Qué han respondido los partidos", "paragraphs": ["Recogemos solo respuestas públicas con fecha. Si un partido no aparece es porque no hemos encontrado una respuesta suya a las propuestas."],
   "table": {"caption": "Respuestas públicas a las propuestas de debate", "head": ["Partido", "Qué ha dicho", "Fecha", "Fuente"], "rows": [
     row(["PP", "Acepta el cara a cara de Mediaset el 16, el debate a cuatro de Atresmedia pidiendo el 26 y el de portavoces de RTVE el 23", "09-10-2026"], EFE26),
     row(["PSOE", "Estará «en todos los debates electorales»; los organizan los medios y no los partidos; no fija fechas", "09-10-2026"], EP26),
     row(["Vox", "Antena 3 publicó que habría aceptado el 26 para el debate a cuatro; no hemos encontrado un comunicado propio", "09-10-2026"], A3_26),
   ]}},
  {"id": "precedente-2023", "title": "Cómo fue en 2023", "paragraphs": ["La campaña del 23-J empezó el viernes 7 de julio de 2023 y el cara a cara se celebró el lunes siguiente, el 10. En 2026 la campaña empieza el viernes 13 de noviembre, así que el primer lunes es el 16, la fecha que plantea el PP."],
   "table": {"caption": "Debates nacionales de candidatos y portavoces en la campaña de 2023", "head": ["Fecha", "Debate", "Quién fue", "Fuente"], "rows": [
     row(["Lunes 10-07-2023, 22:00", "Cara a cara en Atresmedia (Antena 3 y laSexta)", "Sánchez y Feijóo"], ATR23),
     row(["Julio de 2023", "Debate a siete de portavoces en RTVE", "PSOE, PP, Vox, Sumar, ERC, PNV y EH Bildu"], RTVE23B),
     row(["Miércoles 19-07-2023", "Debate a tres en RTVE, el último de la campaña", "Sánchez, Díaz y Abascal; Feijóo no acudió"], RTVE23),
   ]}},
  {"id": "reglas", "title": "Fechas que encuadran los debates", "paragraphs": [], "lists": [[
     "Campaña: de las 0:00 del viernes 13 a las 24:00 del viernes 27 de noviembre (artículo 4 del Real Decreto 806/2026).",
     "Del 24 al 28 de noviembre no se pueden publicar encuestas (artículo 69.7 de la LOREG). Si hay debate el 26, no habrá sondeos publicados sobre su efecto antes de votar.",
     "Sábado 28: jornada de reflexión. Domingo 29: se vota de 9:00 a 20:00.",
  ]]},
 ],
})

# 2. Sorteo mesa
G.append({
 "id": "c29n-sorteo-mesa", "pack": "elecciones", "reviewedAt": REV,
 "path": P+"sorteo-mesa-electoral-29n",
 "h1": "¿Me ha tocado mesa electoral? Cuándo es el sorteo y cuándo te avisan (29-N)",
 "title": "Mesa electoral 29-N: cuándo es el sorteo y cuándo lo sabrás",
 "description": "El sorteo de mesas del 29-N es del 31 de octubre al 4 de noviembre y te lo notifican en 3 días. Plazos para alegar, renunciar con 65 años y qué hacer.",
 "lead": "Respuesta corta: los ayuntamientos sortean las mesas entre el 31 de octubre y el 4 de noviembre de 2026, y deben notificar la designación en los 3 días siguientes al sorteo. Si tu ayuntamiento sortea el último día, la notificación debe llegar como tarde el 7 de noviembre. Desde que te notifican tienes 7 días para alegar una causa justificada.",
 "cta": L["excusa"], "secondaryCta": L["mesa"],
 "sources": [JEC, loreg("aveintiseis", "artículo 26: sorteo"), loreg("aveintisiete", "artículo 27: notificación y excusas"), loreg("aochenta", "artículo 80: constitución de la mesa"), loreg("acientocuarentaytres", "artículo 143: no acudir"), INSTR, RD],
 "related": rel("excusa", "mesa", "dieta", "calendario", "programas", "hub"),
 "faqs": [
  {"q": "¿Cuándo es el sorteo de mesas del 29-N?", "a": "Entre el 31 de octubre y el 4 de noviembre de 2026. Cada ayuntamiento elige el día dentro de ese plazo (calendario de la Junta Electoral Central y artículo 26.4 de la LOREG)."},
  {"q": "¿Cuándo me avisan si me ha tocado?", "a": "La ley da 3 días desde el sorteo para notificarte (artículo 27.2). Con la notificación te entregan un manual de instrucciones."},
  {"q": "¿Puedo saber el día del sorteo de mi ayuntamiento?", "a": "El sorteo es público (artículo 26.2), así que tu ayuntamiento puede decirte el día y la hora. Lo que te obliga es la notificación personal."},
  {"q": "Tengo más de 65 años, ¿tengo que ir?", "a": "Si te toca y tienes entre 65 y 69 años puedes renunciar en el plazo de 7 días (artículo 26.2). A partir de 70 no entras en el sorteo."},
  {"q": "¿Qué pasa si me toca y no voy?", "a": "No acudir sin causa justificada, o no excusarse ni avisar a tiempo, está castigado con prisión de 3 meses a 1 año o multa de 6 a 24 meses (artículo 143 de la LOREG)."},
 ],
 "sections": [
  {"id": "plazos", "title": "Del sorteo al 29 de noviembre, día a día", "paragraphs": [],
   "table": {"caption": "Plazos de las mesas electorales del 29-N", "head": ["Paso", "Cuándo", "Fuente"], "rows": [
     row(["Sorteo en tu ayuntamiento", "31 de octubre a 4 de noviembre"], JEC),
     row(["Notificación de la designación y entrega del manual", "En los 3 días siguientes al sorteo (como tarde el 7 de noviembre)"], loreg("aveintisiete", "artículo 27.2")),
     row(["Alegar una causa ante la Junta Electoral de Zona", "7 días desde la notificación"], loreg("aveintisiete", "artículo 27.3")),
     row(["La Junta resuelve", "5 días desde que presentas la alegación"], JEC),
     row(["Avisar de un impedimento posterior", "Al menos 72 horas antes de constituir la mesa"], loreg("aveintisiete", "artículo 27.4")),
     row(["Impedimento de última hora", "En cuanto ocurra y antes de las 8:00 del 29"], JEC),
     row(["Constitución de la mesa", "Domingo 29 de noviembre a las 8:00"], loreg("aochenta", "artículo 80")),
   ]}},
  {"id": "quien", "title": "A quién puede tocarle", "paragraphs": ["Entran en el sorteo todas las personas de la lista de electores de la mesa que sepan leer y escribir y tengan menos de 70 años. Para presidir hace falta Bachiller o FP de segundo grado o, en su defecto, Graduado Escolar o equivalente. Por cada puesto se sortean dos suplentes (artículo 26 de la LOREG)."]},
  {"id": "si-te-toca", "title": "Si te toca: qué hacer esta semana", "paragraphs": [], "lists": [[
     "Mira qué cargo te ha tocado (presidente, vocal o suplente) y en qué local.",
     "Si tienes una causa para no ir, prepara el documento que la acredita y preséntalo en 7 días ante la Junta Electoral de Zona.",
     "Si no tienes excusa, reserva el domingo 29 desde las 8:00 y revisa la dieta y los permisos.",
  ]]},
 ],
})

# 3. Excusa
G.append({
 "id": "c29n-excusa-mesa", "pack": "elecciones", "reviewedAt": REV,
 "path": P+"excusa-mesa-electoral",
 "h1": "Excusas para no ir a la mesa electoral: qué causas acepta la Junta y hasta cuándo",
 "title": "Excusa mesa electoral 29-N: plazo de 7 días y causas válidas",
 "description": "Tienes 7 días desde la notificación para alegar ante la Junta Electoral de Zona. Causas que se aceptan siempre, las que se valoran y qué documento presentar.",
 "lead": "Respuesta corta: tienes 7 días desde que te notifican para presentar ante la Junta Electoral de Zona una causa justificada y documentada. Algunas causas se aceptan siempre, como tener entre 65 y 69 años, estar de baja, una discapacidad declarada o cuidar a un menor de 12 años con reducción de jornada. Otras se estudian caso a caso. La Junta responde en 5 días y su decisión no admite recurso administrativo.",
 "cta": L["sorteo"], "secondaryCta": L["mesa"],
 "sources": [loreg("aveintisiete", "artículo 27: excusas"), loreg("aveintiseis", "artículo 26.2: renuncia a partir de 65 años"), INSTR, JEC, loreg("acientocuarentaytres", "artículo 143")],
 "related": rel("sorteo", "mesa", "dieta", "calendario", "programas", "hub"),
 "faqs": [
  {"q": "¿Hasta cuándo puedo presentar la excusa?", "a": "7 días desde la notificación (artículo 27.3 de la LOREG). Como los sorteos son del 31 de octubre al 4 de noviembre, la mayoría de los plazos vencerán en la primera quincena de noviembre."},
  {"q": "¿Dónde se presenta?", "a": "Ante la Junta Electoral de Zona que figura en tu notificación, con el documento que acredita la causa."},
  {"q": "¿Vale estar de vacaciones o tener un viaje?", "a": "No figura entre las causas de la Instrucción 6/2011. La lista no es cerrada y la Junta valora cada caso, pero un viaje de ocio no aparece como causa típica."},
  {"q": "¿Y si me rechazan la excusa?", "a": "La Junta debe motivar el rechazo. No cabe recurso administrativo electoral; sí, en su caso, recurso contencioso-administrativo (apartado quinto de la Instrucción 6/2011)."},
  {"q": "¿Los suplentes pueden excusarse?", "a": "Sí. Los criterios son los mismos para titulares y suplentes (apartado primero de la Instrucción 6/2011)."},
  {"q": "Me surge un problema después del plazo, ¿qué hago?", "a": "Avisa a la Junta Electoral de Zona al menos 72 horas antes con la justificación. Si es de última hora, avisa en cuanto ocurra y siempre antes de las 8:00 del 29 (artículo 27.4)."},
 ],
 "sections": [
  {"id": "siempre", "title": "Causas que se aceptan siempre, si las acreditas", "paragraphs": ["La Junta Electoral Central fija en su Instrucción 6/2011 las causas que justifican «por sí solas» no formar parte de la mesa."],
   "table": {"caption": "Causas aceptadas en todo caso (Instrucción 6/2011, texto consolidado)", "head": ["Causa", "Qué presentar", "Fuente"], "rows": [
     row(["Tener entre 65 y 69 años", "DNI; basta con renunciar en 7 días"], loreg("aveintiseis", "artículo 26.2")),
     row(["Discapacidad declarada, de cualquier grado", "La declaración de discapacidad"], INSTR),
     row(["Incapacidad temporal (baja)", "El parte de baja"], INSTR),
     row(["Embarazo desde el sexto mes, o permiso por nacimiento, adopción o acogimiento", "Certificado médico o escrito que reconoce el permiso"], INSTR),
     row(["Pensión de incapacidad permanente absoluta o gran invalidez", "La resolución de la pensión"], INSTR),
     row(["Haber sido miembro de mesa 3 veces en los últimos 10 años", "Se acepta si la mesa puede formarse igualmente"], INSTR),
     row(["Víctima con orden de alejamiento vigente si el investigado o condenado vota en el mismo colegio", "La resolución judicial"], INSTR),
     row(["Cuidado del lactante", "Certificado de reducción de jornada y libro de familia"], INSTR),
     row(["Guarda legal de menores de 12 años o de personas con discapacidad", "Reducción de jornada o certificado de servicios sociales"], INSTR),
     row(["Cuidado de un familiar hasta segundo grado que no puede valerse", "Reducción de jornada o certificado de servicios sociales"], INSTR),
   ]}},
  {"id": "se-valoran", "title": "Causas que la Junta valora caso a caso", "paragraphs": [], "lists": [[
     "Enfermedad o lesión que impida o haga muy penoso estar en la mesa, con certificado médico que detalle las limitaciones.",
     "Operación o pruebas médicas inaplazables el día 29, los días anteriores o el siguiente.",
     "Riesgo durante el embarazo o la lactancia, con certificado médico.",
     "Un acontecimiento familiar muy relevante e inaplazable ese día, del que seas protagonista o pariente hasta segundo grado.",
     "Madre o padre de menores de 14 años en familia monoparental o si el otro progenitor no puede ocuparse ese día.",
     "Trabajo el 29 en servicios esenciales (sanidad, bomberos, protección civil), en juntas o administraciones electorales, o en la dirección de informativos, con informe del responsable.",
     "Mudanza a otra comunidad autónoma, si además justificas la dificultad de acudir.",
  ]]},
  {"id": "como", "title": "Cómo presentarla", "paragraphs": [], "lists": [[
     "Escrito dirigido a la Junta Electoral de Zona con tus datos, la mesa y el cargo que te ha tocado.",
     "La causa, explicada en una o dos frases, y el documento que la acredita.",
     "Preséntalo dentro de los 7 días y guarda el justificante de entrega.",
     "Mientras no te comuniquen que la aceptan, sigues designado.",
  ]]},
 ],
})

# 4. Tarjeta censal
G.append({
 "id": "c29n-tarjeta-censal", "pack": "elecciones", "reviewedAt": REV,
 "path": P+"tarjeta-censal-cuando-llega",
 "h1": "Tarjeta censal del 29-N: cuándo llega la carta del censo y para qué sirve",
 "title": "Tarjeta censal 29-N: cuándo llega la carta del censo electoral",
 "description": "El INE envía la tarjeta censal desde el 2 de noviembre con tu mesa y tu colegio. No hace falta para votar. Qué otras cartas electorales pueden llegarte.",
 "lead": "Respuesta corta: la Oficina del Censo Electoral empezará a enviar la tarjeta censal a partir del 2 de noviembre de 2026. Indica tu sección, tu mesa y el local donde votas. No es obligatorio llevarla: para votar basta el DNI, el pasaporte o el carné de conducir con foto.",
 "cta": L["dondevoto"], "secondaryCta": L["calendario"],
 "sources": [INE, loreg("atreintaynueve", "artículo 39.7: tarjeta censal"), JEC, loreg("aveintisiete", "artículo 27.2")],
 "related": rel("dondevoto", "censo", "documentacion", "sorteo", "programas", "hub"),
 "faqs": [
  {"q": "¿Cuándo llega la tarjeta censal del 29-N?", "a": "El INE indica que se enviará a partir del 2 de noviembre de 2026. No da una fecha de llegada; depende del reparto postal."},
  {"q": "He recibido una carta del censo electoral, ¿qué significa?", "a": "Lo más habitual en noviembre es la tarjeta censal, que solo te informa de dónde votas. Si pediste el voto por correo, te llegará además la documentación por correo certificado. La designación como miembro de mesa la notifica la administración electoral tras el sorteo."},
  {"q": "¿Necesito la tarjeta para votar?", "a": "No. Te identificas con DNI, pasaporte o permiso de conducir originales con fotografía."},
  {"q": "No me ha llegado, ¿qué hago?", "a": "Consulta tu mesa en la sede electrónica del INE con Cl@ve o llama al 900 343 232, el teléfono de las delegaciones de la Oficina del Censo que da el INE."},
 ],
 "sections": [
  {"id": "cartas", "title": "Las cartas electorales que pueden llegarte antes del 29-N", "paragraphs": [],
   "table": {"caption": "Envíos relacionados con el 29-N y sus fechas", "head": ["Carta", "Quién la envía y cuándo", "Fuente"], "rows": [
     row(["Tarjeta censal con tu mesa y tu local", "Oficina del Censo Electoral, a partir del 2 de noviembre"], INE),
     row(["Documentación del voto por correo (si la pediste)", "Oficina del Censo Electoral, del 9 al 22 de noviembre, por correo certificado"], JEC),
     row(["Documentación para votar desde el extranjero (CERA)", "Delegaciones de la Oficina del Censo, del 24 al 30 de octubre"], JEC),
     row(["Designación como miembro de mesa", "En los 3 días siguientes al sorteo (31 de octubre a 4 de noviembre)"], loreg("aveintisiete", "artículo 27.2")),
   ]}},
  {"id": "que-dice", "title": "Qué dice la tarjeta", "paragraphs": ["El artículo 39.7 de la LOREG obliga a la Oficina del Censo a remitir a todos los electores una tarjeta con los datos actualizados de su inscripción y la sección y mesa en la que votan. También avisa a quien le cambien la sección, el local o la mesa."]},
  {"id": "si-falla", "title": "Si los datos están mal", "paragraphs": ["El plazo para reclamar los datos del censo fue del 12 al 19 de octubre. Si ves un error en tu mesa, consulta en la delegación provincial de la Oficina del Censo o en tu ayuntamiento cuanto antes."]},
 ],
})

# 5. Propaganda
G.append({
 "id": "c29n-propaganda", "pack": "elecciones", "reviewedAt": "2026-10-20",
 "path": P+"no-recibir-propaganda-electoral",
 "h1": "Cómo no recibir propaganda electoral en casa: el plazo para el 29-N terminó el 19 de octubre",
 "title": "Cómo no recibir propaganda electoral en casa (29-N)",
 "description": "Para no recibir propaganda electoral por correo el 29-N había que pedirlo hasta el 19 de octubre. Cómo se hace, qué cubre y qué pasa si lo pides más tarde.",
 "lead": "Respuesta corta: el plazo para no recibir en casa la propaganda electoral del 29-N terminó el 19 de octubre de 2026. Si lo pediste a tiempo, las candidaturas reciben una copia del censo sin tus datos y no deberían enviarte sobres. Si lo pides ahora (sede electrónica del INE con Cl@ve, ayuntamiento o delegación provincial de la Oficina del Censo), vale para las siguientes elecciones, no para estas.",
 "cta": L["censo"], "secondaryCta": L["calendario"],
 "sources": [INE, loreg("atreintaynueve", "artículo 39.3: oposición a los envíos de propaganda"), loreg("acuarentayuno", "artículo 41.5: copias del censo para las candidaturas"), JEC],
 "related": rel("censo", "campana", "tarjeta", "calendario", "programas", "hub"),
 "faqs": [
  {"q": "¿Hasta cuándo se puede pedir no recibir propaganda electoral?", "a": "Para el 29-N, hasta el 19 de octubre de 2026, el último día del plazo de consulta del censo. Ese plazo ya ha terminado: las solicitudes posteriores tienen efecto en las siguientes elecciones (nota del INE del 9 de octubre)."},
  {"q": "Lo pido hoy, ¿me sirve para el 29-N?", "a": "No. Para el 29-N solo cuentan las solicitudes presentadas hasta el 19 de octubre de 2026. La que presentes ahora se aplicará en las siguientes elecciones que se convoquen, según la nota del INE."},
  {"q": "¿Cómo se pide?", "a": "Por internet en la sede electrónica del INE con Cl@ve, o en persona en tu ayuntamiento o en la delegación provincial de la Oficina del Censo Electoral."},
  {"q": "¿Qué propaganda deja de llegar?", "a": "La que los partidos envían por correo con las copias del censo que reciben las candidaturas. No afecta a carteles, anuncios, redes sociales ni a la publicidad que se reparte sin usar el censo."},
  {"q": "¿Tengo que pedirlo en cada elección?", "a": "El INE explica que lo solicitado fuera de plazo se aplica a las siguientes elecciones. Si dudas de si tu solicitud sigue vigente, pregunta a la Oficina del Censo."},
 ],
 "sections": [
  {"id": "plazo", "title": "Fechas clave", "paragraphs": [],
   "table": {"caption": "Calendario de la exclusión de los envíos de propaganda para el 29-N", "head": ["Qué", "Cuándo", "Fuente"], "rows": [
     row(["Plazo para pedir la exclusión", "Del 12 al 19 de octubre de 2026"], INE),
     row(["Las candidaturas pueden pedir la copia del censo", "En los 2 días siguientes a su proclamación, el 2 de noviembre"], loreg("acuarentayuno", "artículo 41.5")),
     row(["Campaña: llegan los envíos de propaganda", "Del 13 al 27 de noviembre"], JEC),
   ]}},
  {"id": "por-que", "title": "Por qué funciona así", "paragraphs": ["Los partidos envían propaganda a casa con una copia del censo que la ley les permite pedir (artículo 41.5 de la LOREG). Desde la reforma de diciembre de 2018, el artículo 39.3 permite a cada elector oponerse a figurar en esas copias, dentro del plazo de consulta del censo."]},
  {"id": "ahora", "title": "Qué puedes hacer ahora", "paragraphs": ["Si no lo pediste antes del 19 de octubre, en la campaña del 13 al 27 de noviembre pueden llegarte sobres de las candidaturas que pidan la copia del censo. No es un error: la ley les permite usarla para enviar propaganda (artículo 41.5 de la LOREG)."]},
  {"id": "si-tarde", "title": "Si llegas tarde", "paragraphs": ["Tu solicitud no se pierde: según el INE, tendrá efecto en las siguientes elecciones. Para el 29-N, los envíos de las candidaturas que usen el censo pueden seguir llegando durante la campaña."]},
 ],
})

# 6. Candidaturas
G.append({
 "id": "c29n-candidaturas", "pack": "elecciones", "reviewedAt": REV,
 "path": P+"candidaturas-29n-boe",
 "h1": "Listas electorales del 29-N: cuándo se presentan y cuándo salen en el BOE",
 "title": "Candidaturas del 29-N: cuándo salen las listas en el BOE",
 "description": "Las listas del 29-N se presentan del 21 al 26 de octubre, salen en el BOE el 28 y las definitivas el 3 de noviembre. Todas las fechas y el precedente de 2023.",
 "lead": "Respuesta corta: los partidos presentan sus listas del 21 al 26 de octubre de 2026 y el BOE las publica el 28 de octubre. Tras corregir errores, las juntas provinciales las proclaman el 2 de noviembre y el BOE publica las definitivas el 3 de noviembre. En 2023 fue igual: el BOE publicó las presentadas el 21 de junio y las proclamadas el 27.",
 "cta": L["coaliciones"], "secondaryCta": L["programas"],
 "sources": [JEC, loreg("acuarentaysiete", "artículo 47: publicación y proclamación"), loreg("acuarentaynueve", "artículo 49: recursos"), BOE23P, BOE23R, RD],
 "related": rel("coaliciones", "programas", "calendario", "debate", "promesas", "hub"),
 "faqs": [
  {"q": "¿Cuándo se publican las listas del 29-N en el BOE?", "a": "Las candidaturas presentadas, el 28 de octubre de 2026. Las proclamadas, el 3 de noviembre (calendario de la Junta Electoral Central)."},
  {"q": "¿Dónde se ven las listas de mi provincia?", "a": "En el BOE de esos días, ordenadas por junta electoral provincial, con los candidatos al Congreso y al Senado."},
  {"q": "¿Puede cambiar una lista después del 28 de octubre?", "a": "Solo para corregir irregularidades: la junta provincial las comunica 2 días después de la publicación y el partido tiene 48 horas para subsanar. Después llega la proclamación del 2 de noviembre."},
  {"q": "¿Y si excluyen una candidatura?", "a": "Puede recurrirse ante el juzgado de lo contencioso-administrativo el 4 y el 5 de noviembre; el juez resuelve en 2 días y cabe amparo ante el Tribunal Constitucional."},
  {"q": "¿Cuándo salieron las listas en 2023?", "a": "Las presentadas, en el BOE del 21 de junio de 2023; las proclamadas, en el del 27 de junio, casi un mes antes del 23-J."},
 ],
 "sections": [
  {"id": "fechas", "title": "Las fechas de las listas, paso a paso", "paragraphs": [],
   "table": {"caption": "Candidaturas del 29-N: de la presentación a las listas definitivas", "head": ["Paso", "Fecha", "Fuente"], "rows": [
     row(["Presentación ante las juntas electorales provinciales", "21 a 26 de octubre"], JEC),
     row(["Publicación en el BOE de las candidaturas presentadas", "28 de octubre"], JEC),
     row(["Aviso de irregularidades y 48 horas para corregirlas", "Desde 2 días después de la publicación"], JEC),
     row(["Proclamación por las juntas provinciales", "2 de noviembre"], JEC),
     row(["Publicación en el BOE de las candidaturas proclamadas", "3 de noviembre"], JEC),
     row(["Recurso contra la proclamación", "4 y 5 de noviembre"], JEC),
   ]}},
  {"id": "precedente-2023", "title": "Precedente: las listas del 23-J", "paragraphs": ["En 2023 las elecciones se convocaron el 30 de mayo y las listas siguieron el mismo esquema legal."],
   "table": {"caption": "Publicación de las candidaturas en 2023", "head": ["Qué", "Fecha", "Fuente"], "rows": [
     row(["Candidaturas presentadas en el BOE", "21 de junio de 2023"], BOE23P),
     row(["Candidaturas proclamadas en el BOE", "27 de junio de 2023"], BOE23R),
   ]}},
  {"id": "listas-y-programas", "title": "Listas y programas no van a la vez", "paragraphs": ["La ley fija cuándo se publican las listas, pero no cuándo se publican los programas. En 2023 los programas salieron entre el 4 y el 7 de julio, después de las listas definitivas."]},
 ],
})

# 7. Gobierno
G.append({
 "id": "c29n-gobierno", "pack": "elecciones", "reviewedAt": REV,
 "path": P+"cuando-habra-gobierno-29n",
 "h1": "¿Cuándo habrá Gobierno después del 29-N? Fechas fijas y lo que pasó en 2023",
 "title": "¿Cuándo habrá Gobierno tras el 29-N? Fechas y 2023",
 "description": "Las Cortes se constituyen el 23 de diciembre de 2026; la investidura no tiene fecha fija. En 2023 pasaron 116 días entre las elecciones y la investidura.",
 "lead": "Respuesta corta: el nuevo Congreso se constituye el 23 de diciembre de 2026 a las 10:00. Desde ahí, la fecha del Gobierno depende de que un candidato consiga la investidura, y la ley no fija un día. En 2023 las Cortes se constituyeron el 17 de agosto y Pedro Sánchez fue investido el 16 de noviembre, 116 días después de votar. Mientras tanto sigue el Gobierno en funciones.",
 "cta": L["presidente"], "secondaryCta": L["programas"],
 "sources": [RD, JEC, ce("a99", "artículo 99: investidura"), ce("a101", "artículo 101: Gobierno en funciones"), RD2023, CONG, MONCLOA],
 "related": rel("presidente", "mayoria", "repeticion", "resultados", "programas", "hub"),
 "faqs": [
  {"q": "¿Cuándo habrá nuevo Gobierno tras el 29-N?", "a": "No hay fecha fija. Lo seguro es que las Cortes se constituyen el 23 de diciembre de 2026; la investidura llega después y depende de los apoyos."},
  {"q": "¿Quién gobierna mientras tanto?", "a": "El Gobierno cesa tras las elecciones y sigue en funciones hasta que toma posesión el nuevo (artículo 101 de la Constitución)."},
  {"q": "¿Cuánto tardó en 2023?", "a": "Se votó el 23 de julio, las Cortes se constituyeron el 17 de agosto, Feijóo perdió la investidura el 27 y el 29 de septiembre y Sánchez fue investido el 16 de noviembre."},
  {"q": "¿Y si nadie consigue la investidura?", "a": "Si en dos meses desde la primera votación ningún candidato obtiene la confianza del Congreso, se disuelven las Cortes y se convocan nuevas elecciones (artículo 99.5 de la Constitución)."},
  {"q": "¿Cuándo son oficiales los resultados?", "a": "El escrutinio general es del 4 al 7 de diciembre y después las juntas proclaman a los electos."},
 ],
 "sections": [
  {"id": "fechas-2026", "title": "Lo que tiene fecha y lo que no", "paragraphs": [],
   "table": {"caption": "Del 29-N a la investidura", "head": ["Paso", "Fecha", "Fuente"], "rows": [
     row(["Elecciones", "Domingo 29 de noviembre de 2026"], RD),
     row(["Escrutinio general en las juntas provinciales", "4 a 7 de diciembre"], JEC),
     row(["Constitución del Congreso y del Senado", "23 de diciembre de 2026, a las 10:00"], RD),
     row(["Consultas del Rey y propuesta de candidato", "Sin fecha fija, tras constituirse el Congreso"], ce("a99", "artículo 99.1")),
     row(["Votación de investidura", "Sin fecha fija: mayoría absoluta en la primera votación, simple 48 horas después"], ce("a99", "artículo 99.3")),
   ]}},
  {"id": "precedente-2023", "title": "Precedente: cuánto tardó en 2023", "paragraphs": [],
   "table": {"caption": "Del 23-J a la investidura de 2023", "head": ["Paso", "Fecha", "Fuente"], "rows": [
     row(["Elecciones", "23 de julio de 2023"], RD2023),
     row(["Constitución de las Cortes", "17 de agosto de 2023, a las 10:00"], RD2023),
     row(["Investidura fallida de Feijóo: 172 síes en las dos votaciones", "27 y 29 de septiembre de 2023"], CONG),
     row(["Investidura de Sánchez: 179 votos a favor y 171 en contra", "16 de noviembre de 2023"], MONCLOA),
   ]}},
  {"id": "que-significa", "title": "Qué significa para ti", "paragraphs": ["Mientras haya Gobierno en funciones, siguen vigentes las leyes actuales. Si una promesa electoral te afecta, su aplicación depende de quién forme Gobierno y de que el Congreso apruebe las leyes necesarias."]},
 ],
})

# 8. CIS preelectoral
G.append({
 "id": "c29n-cis-preelectoral", "pack": "elecciones", "reviewedAt": REV,
 "path": P+"cis-preelectoral-29n",
 "h1": "CIS preelectoral del 29-N: cuándo sale y qué se sabe",
 "title": "CIS preelectoral del 29-N: cuándo sale la encuesta",
 "description": "El CIS no ha anunciado su preelectoral del 29-N. En 2023 salió el 5 de julio, 18 días antes de votar, y desde el 24 de noviembre no se publican encuestas.",
 "lead": "Respuesta corta: a 19 de octubre de 2026 el CIS no ha anunciado la fecha de una encuesta preelectoral para el 29-N. Su último estudio con estimación es el barómetro de octubre, publicado el 14 de octubre. En 2023 la preelectoral salió el 5 de julio, 18 días antes de votar. Lo que sí es seguro: cualquier encuesta tiene que publicarse como tarde el 23 de noviembre, porque del 24 al 28 está prohibido.",
 "cta": L["encuestas"], "secondaryCta": L["barometro"],
 "sources": [CIS26, CIS23, CIS23JUL, loreg("asesentaynueve", "artículo 69.7: prohibición de sondeos"), JEC],
 "related": rel("encuestas", "barometro", "prohibidas", "debate", "programas", "hub"),
 "faqs": [
  {"q": "¿Cuándo sale el CIS preelectoral del 29-N?", "a": "El CIS no lo ha anunciado a 19 de octubre de 2026. Si se publica, tendrá que ser antes del 24 de noviembre, cuando empieza la prohibición de difundir encuestas."},
  {"q": "¿Cuándo salió en 2023?", "a": "El 5 de julio de 2023, con 29.201 entrevistas hechas del 8 al 27 de junio. El barómetro de julio salió después, con avance el 13 de julio."},
  {"q": "¿Cuál es el último CIS publicado?", "a": "El barómetro de octubre de 2026 (estudio 3582), con avance de resultados del 14 de octubre."},
  {"q": "¿Qué diferencia hay entre el barómetro y la preelectoral?", "a": "El barómetro es mensual. La preelectoral de 2023 tuvo una muestra mucho mayor, 29.201 entrevistas, y dio horquillas de escaños por provincia."},
 ],
 "sections": [
  {"id": "fechas", "title": "Fechas que importan", "paragraphs": [],
   "table": {"caption": "Encuestas del CIS y plazos legales", "head": ["Qué", "Fecha", "Fuente"], "rows": [
     row(["Barómetro de octubre de 2026 (estudio 3582)", "Avance el 14 de octubre de 2026"], CIS26),
     row(["Último día para publicar encuestas", "23 de noviembre de 2026"], JEC),
     row(["Prohibición de publicar sondeos", "24 a 28 de noviembre"], loreg("asesentaynueve", "artículo 69.7")),
   ]}},
  {"id": "precedente-2023", "title": "Precedente: la preelectoral del 23-J", "paragraphs": [],
   "table": {"caption": "CIS en la campaña de 2023", "head": ["Estudio", "Publicación", "Fuente"], "rows": [
     row(["Preelectoral de las generales 2023: 29.201 entrevistas del 8 al 27 de junio", "5 de julio de 2023 (18 días antes de votar)"], CIS23),
     row(["Barómetro de julio de 2023", "Avance el 13 de julio de 2023"], CIS23JUL),
   ]}},
  {"id": "como-leerla", "title": "Cuando salga, cómo leerla", "paragraphs": ["Mira la fecha del trabajo de campo, el tamaño de la muestra y si da escaños o solo porcentajes. Compárala con las encuestas privadas del mismo periodo, no con las de hace un mes."]},
 ],
})

# 9. Qué pasa si no voto
G.append({
 "id": "c29n-no-voto", "pack": "elecciones", "reviewedAt": REV,
 "path": P+"que-pasa-si-no-voto",
 "h1": "¿Qué pasa si no voto el 29-N? No hay multa: votar es un derecho",
 "title": "¿Qué pasa si no voto el 29-N? No hay multa ni sanción",
 "description": "En España votar es un derecho, no una obligación: no hay multa por no votar. Qué cambia en el reparto de escaños y la excepción de la mesa electoral.",
 "lead": "Respuesta corta: no pasa nada. En España votar es un derecho y no hay multa ni sanción por no hacerlo. La abstención no cuenta en el reparto de escaños. La única obligación electoral es la de los miembros de mesa: si te toca y no vas sin causa justificada, sí hay pena.",
 "cta": L["blanco"], "secondaryCta": L["programas"],
 "sources": [ce("a23", "artículo 23: derecho de sufragio"), loreg("anoventayseis", "artículo 96.5: el voto en blanco es válido"), loreg("acientosesentaytres", "artículo 163: reparto de escaños"), loreg("acientocuarentaytres", "artículo 143: miembros de mesa"), RD],
 "related": rel("blanco", "sorteo", "correo", "calendario", "programas", "hub"),
 "faqs": [
  {"q": "¿Es obligatorio votar en España?", "a": "No. La Constitución reconoce el derecho a participar en los asuntos públicos (artículo 23) y la LOREG no castiga a quien no vota."},
  {"q": "¿Me pueden multar por no votar?", "a": "No. La LOREG no prevé ninguna sanción por abstenerse. Las penas por no acudir son solo para quien ha sido designado miembro de mesa."},
  {"q": "¿A quién beneficia la abstención?", "a": "Los escaños se reparten con los votos emitidos; quien no vota no cuenta. El voto en blanco sí cuenta para la barrera del 3 % en cada provincia."},
  {"q": "Me ha tocado mesa, ¿también es voluntario?", "a": "No. Ser presidente o vocal de mesa es obligatorio (artículo 27.1) y no acudir sin causa está castigado con prisión de 3 meses a 1 año o multa de 6 a 24 meses (artículo 143)."},
  {"q": "No puedo ir el 29, ¿tengo alternativa?", "a": "Puedes pedir el voto por correo hasta el 19 de noviembre de 2026."},
 ],
 "sections": [
  {"id": "resumen", "title": "Abstención, blanco y nulo: qué cuenta", "paragraphs": [],
   "table": {"caption": "Qué efecto tiene cada opción en el reparto de escaños", "head": ["Opción", "Qué ocurre", "Fuente"], "rows": [
     row(["No votar", "No cuenta en ningún cálculo y no tiene sanción"], loreg("acientosesentaytres", "artículo 163")),
     row(["Voto en blanco", "Es válido: cuenta para calcular el 3 % de cada provincia, pero no da escaños"], loreg("anoventayseis", "artículo 96.5")),
     row(["Voto nulo", "Se registra pero no cuenta como voto válido"], loreg("acientosesentaytres", "artículo 163")),
   ]}},
  {"id": "excepcion", "title": "La excepción: la mesa electoral", "paragraphs": ["Si te notifican que eres presidente, vocal o suplente, tienes que acudir el 29 a las 8:00 o excusarte a tiempo. Es la única obligación personal de la jornada."]},
  {"id": "alternativas", "title": "Si quieres votar pero no puedes ir", "paragraphs": [], "lists": [[
     "Voto por correo: solicitud hasta el 19 de noviembre y envío hasta el 25.",
     "Si estás en el extranjero una temporada, el plazo para pedirlo como temporalmente ausente acaba el 31 de octubre.",
  ]]},
 ],
})

out = pathlib.Path(__file__).resolve().parents[1] / "src/lib/tramites/cuando-29n.ts"
body = json.dumps(G, ensure_ascii=False, indent=1)
out.write_text('import type { Guide } from "@/lib/tramites/types";\n\n/** Preguntas «cuándo / qué pasa si» del 29-N, revisadas el 19-10-2026. GENERADO con scripts/gen_cuando_29n_20261019.py: no editar a mano. */\nexport const CUANDO_29N_GUIDES: Guide[] = ' + body + ";\n", encoding="utf-8")
print("wrote", out, len(G))
for g in G:
    print(g["path"], len(g["title"]), len(g["description"]))
assert all(len(g["description"]) <= 160 for g in G)
