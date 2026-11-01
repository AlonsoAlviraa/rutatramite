"""Genera src/lib/tramites/voto-nulo-casos.ts: «qué pasa si…» con el voto (hub + 4 casos), 19-10-2026.
Fuentes leídas: LOREG arts. 86, 95, 96, 97 y 163 (BOE consolidado), Instrucción JEC 1/2012 (modifica 12/2007),
Infoelectoral (Ministerio del Interior), y prensa fechada para casos reales (El Periódico 2011, Verne/El País 2016, ABC 2023)."""
import json, pathlib
REV = "2026-10-19"
LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672"
def loreg(a, l): return {"label": f"LOREG, {l}", "href": f"{LOREG}#{a}"}
A96 = loreg("anoventayseis", "artículo 96: votos nulos y en blanco")
A95 = loreg("anoventaycinco", "artículo 95: escrutinio en la mesa")
A97 = loreg("anoventaysiete", "artículo 97: protestas y papeletas que se guardan")
A86 = loreg("aochentayseis", "artículo 86: el voto es secreto")
A163 = loreg("acientosesentaytres", "artículo 163: barrera del 3 %")
JEC12 = {"label": "BOE: Instrucción 1/2012 de la Junta Electoral Central, sobre el artículo 96.2", "href": "https://www.boe.es/buscar/doc.php?id=BOE-A-2012-3859"}
INFO = {"label": "Ministerio del Interior (Infoelectoral): cuándo un voto es válido, nulo o en blanco", "href": "https://infoelectoral.interior.gob.es/es/proceso-electoral/preguntas-frecuentes/sistema-electoral/"}
CHORIZO11 = {"label": "El Periódico, 21-11-2011: la papeleta con una rodaja de chorizo en Val do Dubra", "href": "https://www.elperiodico.com/es/politica/20111121/descuido-o-mensaje-subliminal-1231846"}
VERNE16 = {"label": "Verne (El País), 24-06-2016: los votos nulos del 26-J más allá del chorizo", "href": "https://verne.elpais.com/verne/2016/06/24/articulo/1466802877_894682.html"}
ABC23 = {"label": "ABC, 02-08-2023: lo que había en los votos nulos de Madrid del 23-J", "href": "https://www.abc.es/espana/dibujos-eroticos-chistes-votos-nulos-23j-20230802190823-nt.html"}
JEC211 = {"label": "Junta Electoral Central, Acuerdo 226/2024 (cita el 211/2024): grabaciones en el escrutinio", "href": "https://www.juntaelectoralcentral.es/cs/ContentServer?c=Page&childpagename=JEC%2FJEC_Layout&packedargs=anyosesion%3D2024%26idacuerdoinstruccion%3D132735%26idsesion%3D1080%26template%3DDoctrina%252FJEC_Detalle&pagename=jec%2Fwrapper%2FJEC_Wrapper&rendermode=preview"}
P = "/elecciones/"
L = {
 "hub": {"href": P+"voto-nulo-ejemplos", "label": "Voto nulo: 10 ejemplos y si cuentan"},
 "dos": {"href": P+"dos-papeletas-en-el-mismo-sobre", "label": "Dos papeletas en el mismo sobre"},
 "rota": {"href": P+"papeleta-rota-voto-nulo", "label": "Papeleta rota: ¿es voto nulo?"},
 "escribir": {"href": P+"escribir-en-la-papeleta", "label": "Si escribes o dibujas en la papeleta"},
 "objeto": {"href": P+"objeto-en-el-sobre-de-votacion", "label": "Un chorizo u otro objeto en el sobre"},
 "blanco": {"href": P+"a-quien-beneficia-el-voto-en-blanco", "label": "¿A quién beneficia el voto en blanco?"},
 "nulo": {"href": P+"voto-nulo-y-voto-en-blanco", "label": "Voto nulo y voto en blanco: diferencias"},
 "novoto": {"href": P+"que-pasa-si-no-voto", "label": "¿Qué pasa si no voto?"},
 "resultados": {"href": P+"resultados-y-escrutinio", "label": "Resultados y escrutinio"},
 "senado": {"href": P+"como-votar-al-senado", "label": "Cómo se vota al Senado"},
 "eleccioneshub": {"href": "/elecciones", "label": "Todas las guías de las elecciones"},
 "interventores": {"href": P+"interventores-y-apoderados", "label": "Interventores y apoderados"},
}
def rel(*k): return [L[x] for x in k]
def row(c, s): return {"cells": c, "source": s}
EFECTO = {"id": "efecto", "title": "Qué efecto tiene en el resultado", "paragraphs": ["Un voto nulo se cuenta en el acta, pero no es un voto válido: no entra en el cálculo de la barrera del 3 % ni en el reparto de escaños. El voto en blanco sí es válido y cuenta para calcular ese 3 % en cada provincia, aunque no da escaños a nadie (artículos 96.5 y 163 de la LOREG)."]}
MESA = {"id": "quien-decide", "title": "Quién lo decide", "paragraphs": ["En el recuento, el presidente de la mesa saca los sobres uno a uno, lee el voto y enseña cada papeleta a vocales, interventores y apoderados. Un representante de candidatura que tenga dudas puede pedir la papeleta para examinarla (artículo 95). Las protestas las resuelve la mesa por mayoría, y las papeletas declaradas nulas o reclamadas no se destruyen: se unen al acta (artículo 97)."]}
G = []

G.append({"id": "vn-hub", "pack": "elecciones", "reviewedAt": REV, "path": L["hub"]["href"],
 "h1": "Voto nulo: 10 ejemplos de qué pasa con tu voto (insultos, chorizo, dos papeletas…)",
 "title": "Voto nulo: 10 ejemplos y qué pasa con tu voto en cada caso",
 "description": "¿Es nulo si escribes en la papeleta, metes dos o un chorizo en el sobre? 10 casos resueltos con la ley electoral, la Junta Electoral Central y casos reales.",
 "lead": "Respuesta corta: casi cualquier cosa que añadas a la papeleta la convierte en voto nulo: escribir, dibujar, tachar o romperla a propósito. Hay excepciones que sorprenden: dos papeletas iguales en el sobre valen como un voto, una pequeña cruz junto a un candidato del Congreso puede valer, y el sobre vacío es voto en blanco, que sí es válido.",
 "cta": L["nulo"], "secondaryCta": L["blanco"],
 "sources": [A96, JEC12, INFO, A95, A97, A163, A86, CHORIZO11, VERNE16, ABC23],
 "related": rel("dos", "rota", "escribir", "objeto", "blanco", "novoto", "resultados", "senado", "eleccioneshub"),
 "faqs": [
  {"q": "¿Qué pasa si escribo un insulto en la papeleta?", "a": "El voto es nulo. El artículo 96.2 de la LOREG anula las papeletas en las que se haya introducido «cualquier leyenda o expresión», y la Junta Electoral Central incluye expresiones o lemas en el anverso o en el reverso."},
  {"q": "¿Y si meto un chorizo en el sobre?", "a": "La ley no habla de objetos. La mesa decide si hay una alteración que anula el voto. En Val do Dubra (A Coruña), en 2011, una papeleta con una rodaja de chorizo se contó primero como nula y después como válida, y un partido presentó reclamación."},
  {"q": "¿Meter dos papeletas iguales anula el voto?", "a": "No. Si son de la misma candidatura cuenta como un solo voto válido. Si son de candidaturas distintas, es nulo (artículo 96.1)."},
  {"q": "¿El voto nulo beneficia a alguien?", "a": "No entra en el reparto ni en el cálculo del 3 %. El voto en blanco sí cuenta para ese 3 %, aunque no da escaños."},
  {"q": "¿Puedo hacer una foto a mi papeleta?", "a": "No hemos encontrado un artículo de la LOREG ni un acuerdo de la Junta Electoral Central que prohíba fotografiar tu propia papeleta. El voto es secreto (artículo 86) y la Junta sí ha dicho que los particulares no pueden grabar a quienes intervienen en la votación y el escrutinio."},
  {"q": "¿Quién decide si un voto es nulo?", "a": "La mesa electoral, por mayoría, durante el recuento. Los interventores pueden protestar y las papeletas discutidas se guardan con el acta."},
 ],
 "sections": [
  {"id": "tabla", "title": "Los 10 casos, de un vistazo", "paragraphs": ["Para las generales: sobre blanco para el Congreso, sobre sepia para el Senado."],
   "table": {"caption": "Qué pasa con tu voto en cada caso", "head": ["Caso", "Resultado", "Por qué", "Fuente"], "rows": [
     row(["Escribes un insulto, una frase o un dibujo en la papeleta", "Nulo", "«Cualquier leyenda o expresión» anula el voto"], A96),
     row(["Metes un objeto en el sobre (una rodaja de chorizo, una foto)", "Lo decide la mesa", "La ley no menciona objetos; la mesa valora si hay alteración"], A96),
     row(["Dos papeletas iguales del mismo partido", "Vale, como un voto", "Se computa como un solo voto válido"], A96),
     row(["Dos papeletas de partidos distintos", "Nulo", "Sobre con papeletas de distinta candidatura"], A96),
     row(["Tachas o añades nombres en la papeleta del Congreso", "Nulo", "Lista modificada o con nombres añadidos"], A96),
     row(["Pequeña cruz junto a un candidato del Congreso", "Puede valer", "Si no altera la papeleta ni expresa reproche"], JEC12),
     row(["Más de 3 cruces en el Senado (2 o 1 en algunas islas, Ceuta y Melilla)", "Nulo", "Límite de nombres del artículo 96.3"], A96),
     row(["Sobre vacío, o papeleta del Senado sin cruces", "En blanco, válido", "Artículo 96.5"], A96),
     row(["Papeleta sin sobre", "Nulo", "Artículo 96.1"], A96),
     row(["Papeleta rota o rasgada a propósito", "Nulo", "La Junta lo incluye entre las alteraciones no accidentales"], JEC12),
     row(["Papeleta de otro tono o tamaño, o con una errata de imprenta", "Vale", "Las pequeñas diferencias no alteran la validez"], INFO),
   ]}},
  MESA, EFECTO,
  {"id": "casos-reales", "title": "Lo que se ha encontrado en las urnas", "paragraphs": [
    "En Val do Dubra (A Coruña), en las generales de 2011, una mesa encontró una papeleta con una rodaja de chorizo pegada. Se anotó como nula, los interventores pidieron que se validara porque se veía a qué partido iba, se contó como válida y otro partido presentó reclamación (El Periódico, 21-11-2011).",
    "Tras el 26-J de 2016, Verne recopiló votos nulos compartidos en redes: embutidos, referencias literarias y hasta preservativos (Verne, 24-06-2016).",
    "Tras el 23-J de 2023, trabajadores de la Junta Electoral Provincial de Madrid contaron a ABC que entre los nulos había dibujos, chistes, alineaciones de fútbol y listas inventadas con nombres de famosos (ABC, 02-08-2023).",
  ]},
 ]})

G.append({"id": "vn-dos-papeletas", "pack": "elecciones", "reviewedAt": REV, "path": L["dos"]["href"],
 "h1": "Dos papeletas en el mismo sobre: cuándo vale y cuándo es nulo",
 "title": "Dos papeletas en el mismo sobre: ¿voto nulo o válido?",
 "description": "Dos papeletas iguales en el mismo sobre valen como un solo voto; si son de partidos distintos, el voto es nulo. Lo que dice el artículo 96 de la LOREG.",
 "lead": "Respuesta corta: depende de si son iguales. Dos papeletas del mismo partido en un sobre cuentan como un solo voto válido. Si son de partidos distintos, el voto es nulo. En el Senado la regla es la misma: varias papeletas con los mismos nombres marcados valen como una.",
 "cta": L["hub"], "secondaryCta": L["nulo"],
 "sources": [A96, INFO, A95, A97, A163],
 "related": rel("hub", "rota", "escribir", "blanco", "novoto", "resultados", "eleccioneshub"),
 "faqs": [
  {"q": "¿Es nulo meter dos papeletas iguales?", "a": "No. El artículo 96.1 de la LOREG dice que si el sobre contiene más de una papeleta de la misma candidatura se computa como un solo voto válido."},
  {"q": "¿Y dos papeletas de partidos diferentes?", "a": "Es nulo: el mismo artículo anula el sobre que contiene más de una papeleta de distinta candidatura."},
  {"q": "¿Cuentan como dos votos?", "a": "No. Varias papeletas iguales valen como un único voto."},
  {"q": "¿Y si meto la del Congreso y la del Senado en el mismo sobre?", "a": "La LOREG no contempla ese caso de forma expresa y no hemos encontrado un criterio publicado de la Junta Electoral Central. Usa cada sobre para su papeleta: blanco para el Congreso y sepia para el Senado."},
 ],
 "sections": [
  {"id": "regla", "title": "La regla, en dos líneas", "paragraphs": [],
   "table": {"caption": "Varias papeletas en un sobre", "head": ["Qué hay en el sobre", "Resultado", "Fuente"], "rows": [
     row(["Dos o más papeletas del mismo partido", "Un voto válido para ese partido"], A96),
     row(["Papeletas de partidos distintos", "Nulo"], A96),
     row(["Varias papeletas iguales del Senado", "Un voto válido"], INFO),
   ]}},
  MESA, EFECTO,
 ]})

G.append({"id": "vn-rota", "pack": "elecciones", "reviewedAt": REV, "path": L["rota"]["href"],
 "h1": "Papeleta rota o rasgada: ¿es voto nulo?",
 "title": "Papeleta rota: ¿es voto nulo? Lo que dice la Junta Electoral",
 "description": "Una papeleta rota o rasgada a propósito es voto nulo, según la Junta Electoral Central. Si el daño es accidental, puede valer. Qué hacer si se te rompe.",
 "lead": "Respuesta corta: si está rota o rasgada a propósito, es nulo. La Junta Electoral Central considera nulo el voto en papeleta con cualquier alteración «que no sea accidental», e incluye expresamente la papeleta rota o rasgada. Si se te rompe o se mancha antes de votar, coge otra en la cabina: hay papeletas de sobra.",
 "cta": L["hub"], "secondaryCta": L["nulo"],
 "sources": [JEC12, A96, A95, A97, A163],
 "related": rel("hub", "escribir", "dos", "objeto", "blanco", "resultados", "eleccioneshub"),
 "faqs": [
  {"q": "¿Una papeleta rota es voto nulo?", "a": "Sí, si la rotura no es accidental. La Instrucción 1/2012 de la Junta Electoral Central incluye la papeleta «rota o rasgada» entre las alteraciones que anulan el voto."},
  {"q": "¿Y si está arrugada o doblada?", "a": "Doblar la papeleta para meterla en el sobre es lo normal. La Instrucción solo anula las alteraciones que no sean accidentales; en caso de duda decide la mesa."},
  {"q": "Se me ha roto en la cabina, ¿qué hago?", "a": "Deja esa y coge otra. Solo cuenta lo que entregas en el sobre."},
  {"q": "¿Quién decide si una rotura es accidental?", "a": "La mesa, durante el recuento. Los interventores pueden protestar y la papeleta discutida se guarda con el acta (artículo 97)."},
 ],
 "sections": [
  {"id": "criterio", "title": "El criterio de la Junta Electoral Central", "paragraphs": ["La Instrucción 1/2012 dice que es nulo el voto en papeleta que presente «cualquier tipo de alteración que no sea accidental», por ejemplo «porque la papeleta esté rota o rasgada». Desarrolla el artículo 96.2 de la LOREG, que anula las papeletas con alteraciones «de carácter voluntario o intencionado»."]},
  MESA, EFECTO,
 ]})

G.append({"id": "vn-escribir", "pack": "elecciones", "reviewedAt": REV, "path": L["escribir"]["href"],
 "h1": "¿Qué pasa si escribo un insulto o dibujo algo en la papeleta?",
 "title": "Qué pasa si escribes un insulto o dibujas en la papeleta",
 "description": "Escribir, dibujar o tachar en la papeleta anula el voto, también por detrás. Solo se salva una pequeña cruz junto a un candidato. Ley y casos reales.",
 "lead": "Respuesta corta: el voto es nulo. Da igual que sea un insulto, una frase amable o un dibujo, y da igual que esté delante o detrás: la ley anula las papeletas con «cualquier leyenda o expresión». Lo único que la Junta Electoral Central permite en la del Congreso es una pequeña señal o cruz junto a un candidato que no altere la papeleta ni exprese reproche.",
 "cta": L["hub"], "secondaryCta": L["nulo"],
 "sources": [A96, JEC12, A95, A97, A163, ABC23, VERNE16],
 "related": rel("hub", "objeto", "rota", "dos", "blanco", "novoto", "resultados", "eleccioneshub"),
 "faqs": [
  {"q": "¿Es nulo escribir en la papeleta?", "a": "Sí. El artículo 96.2 de la LOREG anula las papeletas en las que se haya introducido cualquier leyenda o expresión."},
  {"q": "¿Y si escribo por detrás?", "a": "También es nulo: la Instrucción 1/2012 de la Junta Electoral Central habla de expresiones o lemas «en el anverso o en el reverso»."},
  {"q": "¿Puedo marcar con una cruz a mi candidato preferido en el Congreso?", "a": "Una cruz pequeña junto a un candidato puede valer si no altera la papeleta ni expresa reproche (Instrucción 1/2012). Tachar o añadir nombres sí lo anula."},
  {"q": "¿Me pueden sancionar por un insulto en la papeleta?", "a": "La LOREG no prevé ninguna sanción por anular tu propio voto: simplemente no cuenta. Recuerda que la papeleta la ven los miembros de la mesa y los interventores durante el recuento."},
  {"q": "¿Y en el Senado?", "a": "En el Senado se marcan cruces, así que eso no lo anula; pero sí marcar más nombres de los permitidos o escribir otras cosas."},
 ],
 "sections": [
  {"id": "ley", "title": "Qué dice la ley", "paragraphs": ["Artículo 96.2 de la LOREG: son nulos los votos en papeletas «en las que se hubieren modificado, añadido o tachado nombres de candidatos comprendidos en ellas o alterado su orden de colocación, así como aquéllas en las que se hubiera introducido cualquier leyenda o expresión, o producido cualquier otra alteración de carácter voluntario o intencionado»."]},
  {"id": "casos-reales", "title": "Lo que aparece en el recuento", "paragraphs": ["Trabajadores de la Junta Electoral Provincial de Madrid contaron a ABC que entre los votos nulos del 23-J de 2023 había dibujos, chistes, juegos de palabras, alineaciones deportivas y listas inventadas con nombres de personajes conocidos (ABC, 02-08-2023). Todos esos votos se contaron como nulos."]},
  MESA, EFECTO,
 ]})

G.append({"id": "vn-objeto", "pack": "elecciones", "reviewedAt": REV, "path": L["objeto"]["href"],
 "h1": "¿Qué pasa si meto un chorizo u otro objeto en el sobre de votación?",
 "title": "Un chorizo en el sobre de votación: ¿vale el voto?",
 "description": "La ley electoral no habla de objetos en el sobre: decide la mesa. El caso real de la rodaja de chorizo de Val do Dubra (2011) y el artículo 96 de la LOREG.",
 "lead": "Respuesta corta: la LOREG no menciona objetos dentro del sobre, así que lo decide la mesa al abrirlo. Si el objeto mancha, rompe o altera la papeleta, lo normal es que se cuente como nulo. Si el sobre no lleva papeleta, solo el objeto, la ley solo dice que el sobre sin papeleta es voto en blanco, y la mesa valorará si hay una alteración del sobre. En el caso real más conocido, una rodaja de chorizo acabó en reclamación.",
 "cta": L["hub"], "secondaryCta": L["escribir"],
 "sources": [A96, JEC12, A95, A97, CHORIZO11, VERNE16, A163],
 "related": rel("hub", "escribir", "rota", "dos", "blanco", "resultados", "eleccioneshub"),
 "faqs": [
  {"q": "¿Es nulo un voto con un chorizo en el sobre?", "a": "No hay una regla expresa. La mesa decide si hay una alteración voluntaria de la papeleta o del sobre (artículo 96, apartados 2 y 4). En Val do Dubra, en 2011, la misma papeleta se contó primero como nula y después como válida, y hubo reclamación."},
  {"q": "¿Qué pasó con la papeleta del chorizo de Val do Dubra?", "a": "Según El Periódico (21-11-2011), la mesa la anotó como nula, los interventores de un partido pidieron que se contara porque se veía a quién iba el voto, se validó y el apoderado de otro partido presentó reclamación. La noticia no recoge cómo se resolvió."},
  {"q": "¿Y una foto o una nota dentro del sobre?", "a": "Una nota escrita en la papeleta la anula (artículo 96.2). Si va suelta en el sobre, la ley no lo dice expresamente y decide la mesa."},
  {"q": "¿Pueden multarme por meter algo en el sobre?", "a": "La LOREG no prevé sanción por anular tu propio voto. Otra cosa sería alterar el orden en el colegio, que el presidente de la mesa puede atajar."},
 ],
 "sections": [
  {"id": "caso", "title": "El caso real: Val do Dubra, 2011", "paragraphs": ["En las generales de noviembre de 2011, una mesa de Val do Dubra (A Coruña) abrió un sobre con una papeleta que llevaba pegada una rodaja de chorizo. La anotó como nula; los interventores de un partido pidieron que se validara porque, pese a las manchas, se veía a quién iba el voto, y la mesa la contó como válida. El apoderado de otro partido presentó reclamación (El Periódico, 21-11-2011).", "Tras el 26-J de 2016, Verne recopiló votos nulos que usuarios compartieron en redes, con embutidos y otros objetos (Verne, 24-06-2016)."]},
  {"id": "ley", "title": "Qué dice la ley", "paragraphs": ["El artículo 96 anula los votos en papeletas o sobres que no sean del modelo oficial, las papeletas con leyendas o con cualquier alteración voluntaria, y los sobres alterados. No menciona objetos. Por eso cada mesa decide, y las papeletas reclamadas se guardan con el acta para que la Junta Electoral pueda revisarlas."]},
  MESA, EFECTO,
 ]})

out = pathlib.Path(__file__).resolve().parents[1] / "src/lib/tramites/voto-nulo-casos.ts"
out.write_text('import type { Guide } from "@/lib/tramites/types";\n\n/** «Qué pasa si…» con el voto (hub + 4 casos), revisado el 19-10-2026. GENERADO con scripts/gen_voto_nulo_20261019.py: no editar a mano. */\nexport const VOTO_NULO_CASOS_GUIDES: Guide[] = ' + json.dumps(G, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
for g in G: print(g["path"], len(g["title"]), len(g["description"]))
assert all(len(g["description"]) <= 160 for g in G)
