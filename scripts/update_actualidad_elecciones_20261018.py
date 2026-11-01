"""18-10-2026: actualiza calendario, voto por correo, quién vota, coaliciones y huelga (actualidad-20261006.ts)."""
import json, re, pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/actualidad-20261006.ts"
s = P.read_text()
if "calendario-jec-tabla" in s:
    print("ya aplicado"); raise SystemExit
J = lambda x: json.dumps(x, ensure_ascii=False)

RD = {"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre"}
JEC = {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}
INE = {"href": "https://www.ine.es/dyngs/Prensa/EG2026.htm", "label": "INE: nota de prensa de la Oficina del Censo Electoral para el 29 de noviembre"}
LOREG = {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672", "label": "Ley Orgánica 5/1985, del Régimen Electoral General"}
CORREOS = {"href": "https://www.correos.com/sala-prensa/ya-se-puede-solicitar-el-voto-por-correo-para-las-elecciones-generales-del-29-de-noviembre/", "label": "Correos, 6 de octubre de 2026: plazos de esta convocatoria"}

def row(a, b, c, src=JEC):
    return {"cells": [a, b, c], "source": src}

cal_rows = [
    row("6 de octubre", "El BOE publica la convocatoria. Se abre la solicitud del voto por correo y del voto en braille.", "Todos", RD),
    row("12 al 19 de octubre", "Consulta del censo en ayuntamientos, consulados y sede del INE, y reclamaciones.", "Electores"),
    row("16 de octubre", "Último día para comunicar coaliciones a la Junta Electoral.", "Partidos"),
    row("21 al 26 de octubre", "Presentación de candidaturas ante las Juntas Electorales Provinciales.", "Partidos"),
    row("23 de octubre", "Se exponen las rectificaciones del censo.", "Electores"),
    row("28 de octubre", "El BOE publica las candidaturas presentadas.", "Todos"),
    row("31 de octubre", "Último día para pedir el voto si estás fuera una temporada (ERTA).", "Electores"),
    row("31 de octubre al 4 de noviembre", "Sorteo de los miembros de mesa en los ayuntamientos.", "Electores"),
    row("2 de noviembre", "Proclamación de candidaturas. Último día para pedir el voto en braille. El INE empieza a enviar las tarjetas censales.", "Todos"),
    row("3 de noviembre", "El BOE publica las candidaturas proclamadas.", "Todos"),
    row("9 al 22 de noviembre", "La Oficina del Censo Electoral envía la documentación del voto por correo.", "Electores"),
    row("13 al 27 de noviembre", "Campaña electoral, de las 0:00 del viernes 13 a las 24:00 del viernes 27.", "Todos", RD),
    row("19 de noviembre", "Último día para pedir el voto por correo.", "Electores"),
    row("19 al 28 de noviembre", "Los ayuntamientos exponen y publican en internet las secciones, locales y mesas definitivos.", "Electores"),
    row("21 al 26 de noviembre", "Voto en urna en los consulados para quien vive en el extranjero (CERA).", "Electores"),
    row("24 de noviembre", "Último día para que el elector CERA envíe su voto por correo al consulado.", "Electores"),
    row("24 al 28 de noviembre", "Prohibido publicar o difundir sondeos electorales.", "Todos"),
    row("25 de noviembre", "Último día para depositar el voto por correo en una oficina de Correos.", "Electores", CORREOS),
    row("28 de noviembre", "Jornada de reflexión.", "Todos"),
    row("29 de noviembre", "Votación, de 9:00 a 20:00.", "Electores"),
    row("4 al 7 de diciembre", "Escrutinio general en las Juntas Electorales Provinciales.", "Juntas"),
    row("23 de diciembre", "Sesiones constitutivas del Congreso y del Senado, a las 10:00.", "Cortes", RD),
]

calendario = {
    "id": "calendario-29n",
    "pack": "elecciones",
    "path": "/elecciones/calendario-29-noviembre",
    "h1": "Calendario de las elecciones del 29 de noviembre de 2026",
    "title": "Calendario electoral del 29-N: todas las fechas clave",
    "description": "Fechas oficiales del 29-N según la Junta Electoral Central: candidaturas, voto por correo, sorteo de mesas, campaña, encuestas, reflexión y escrutinio.",
    "lead": "El Real Decreto 806/2026, publicado en el BOE del 6 de octubre, convoca elecciones al Congreso y al Senado para el domingo 29 de noviembre de 2026. La Junta Electoral Central ha publicado el calendario completo. Aquí tienes las fechas que afectan a electores y partidos, en orden y con su fuente.",
    "reviewedAt": "2026-10-18",
    "cta": {"href": JEC["href"], "label": "Abrir el calendario de la Junta Electoral Central"},
    "secondaryCta": {"href": RD["href"], "label": "Abrir el Real Decreto 806/2026"},
    "sources": [RD, JEC, INE, CORREOS, LOREG],
    "related": [
        {"href": "/elecciones/voto-por-correo", "label": "Cómo pedir el voto por correo"},
        {"href": "/elecciones/miembro-de-mesa", "label": "Me ha tocado mesa electoral"},
        {"href": "/elecciones/donde-voto-mesa-electoral", "label": "Dónde voto: mesa y colegio"},
        {"href": "/elecciones/nuevo-partido-coalicion", "label": "Coaliciones y listas del 29-N"},
        {"href": "/elecciones/huelga-general-sindicatos", "label": "Huelga general del 11 de noviembre"},
    ],
    "disclaimer": "Las fechas salen del calendario de la Junta Electoral Central, del Real Decreto 806/2026, de la nota del INE y de la nota de Correos del 6 de octubre de 2026. Si la Junta Electoral precisa un trámite, manda la fuente oficial.",
    "faqs": [
        {"q": "¿Cuándo empieza la campaña electoral?", "a": "A las 0:00 del viernes 13 de noviembre de 2026. Termina a las 24:00 del viernes 27 de noviembre, según el artículo 4 del Real Decreto 806/2026."},
        {"q": "¿Hasta cuándo puedo pedir el voto por correo?", "a": "Hasta el 19 de noviembre de 2026. La documentación se envía del 9 al 22 de noviembre y el voto se deposita en Correos hasta el 25 de noviembre."},
        {"q": "¿Cuándo sé si me toca mesa?", "a": "Los ayuntamientos hacen el sorteo del 31 de octubre al 4 de noviembre y notifican la designación en los 3 días siguientes."},
        {"q": "¿Cuándo se conocen las listas definitivas?", "a": "Las Juntas Electorales Provinciales proclaman las candidaturas el 2 de noviembre y el BOE las publica el 3 de noviembre."},
    ],
    "sections": [
        {
            "id": "calendario-jec-tabla",
            "title": "Fechas clave, de la convocatoria a la constitución",
            "paragraphs": [
                "La tabla resume el calendario de la Junta Electoral Central. La columna «Para» indica a quién afecta cada plazo.",
            ],
            "table": {"caption": "Calendario de las elecciones generales del 29 de noviembre de 2026", "head": ["Fecha", "Qué pasa", "Para"], "rows": cal_rows},
        },
        {
            "id": "ya-pasado",
            "title": "Plazos que ya han terminado",
            "paragraphs": [
                "A 18 de octubre de 2026 ya ha terminado el plazo de coaliciones (16 de octubre). La Junta Electoral Central ha publicado nueve coaliciones válidamente constituidas.",
                "La consulta y reclamación del censo termina el 19 de octubre. Después solo queda revisar tu inscripción en la sede del INE y, si hay un error, seguir la resolución de tu reclamación si la presentaste a tiempo.",
            ],
        },
        {
            "id": "convocatoria",
            "title": "Qué fija el real decreto",
            "paragraphs": [
                "El artículo 1 disuelve las dos Cámaras elegidas el 23 de julio de 2023. El artículo 2 convoca las elecciones para el domingo 29 de noviembre de 2026. El artículo 6 dice que se rigen por la Ley Orgánica 5/1985 y por su desarrollo.",
                "El anexo reparte los 350 diputados por circunscripción: Madrid elige 38 y Barcelona 32; Ceuta y Melilla, uno cada una. En el Senado, cada provincia elige cuatro senadores; Gran Canaria, Mallorca y Tenerife, tres; Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote y La Palma, uno; Ceuta y Melilla, dos.",
                "Según el INE, pueden votar 38.728.356 electores: 35.958.711 residen en España y 2.769.645 en el extranjero.",
            ],
        },
        {
            "id": "plazos-que-busca-la-gente",
            "title": "Encuestas, reflexión y resultados",
            "paragraphs": [
                "El artículo 69.7 de la LOREG prohíbe publicar, difundir o reproducir sondeos durante los cinco días anteriores al de la votación. En esta convocatoria, del 24 al 28 de noviembre.",
                "El sábado 28 de noviembre es la jornada de reflexión: ya no hay campaña. El domingo 29 se vota de 9:00 a 20:00 (artículo 84 de la LOREG).",
                "Los resultados de la noche electoral son provisionales. El escrutinio general lo hacen las Juntas Electorales Provinciales del 4 al 7 de diciembre, y las Cámaras se constituyen el 23 de diciembre a las 10:00.",
            ],
        },
    ],
}

voto_extra = {
    "id": "fechas-jec-correo",
    "title": "Las fechas del voto por correo, una a una",
    "paragraphs": ["Así lo recoge el calendario de la Junta Electoral Central para esta convocatoria."],
    "lists": [[
        "Solicitud: del 6 de octubre al 19 de noviembre de 2026.",
        "Envío de la documentación por la Oficina del Censo Electoral: del 9 al 22 de noviembre.",
        "Remisión del voto por el elector: del 10 al 25 de noviembre, siempre antes del tercer día previo a la votación.",
        "Si vives en el extranjero (CERA), el voto por correo al consulado se envía hasta el 24 de noviembre y el voto en urna es del 21 al 26 de noviembre.",
    ]],
}

coal_rows = [
    ["C1", "Democracia para el siglo 21 (D21)", "Congreso y Senado: Madrid y Barcelona"],
    ["C2", "Coalición Canaria-Municipalistas Primero Canarias", "Congreso: Canarias. Senado: Tenerife, Gran Canaria, Fuerteventura, Lanzarote, La Palma y La Gomera"],
    ["C3", "Esquerra Republicana de Catalunya-Euskal Herria Bildu", "Senado: Cataluña, País Vasco y Navarra"],
    ["C4", "Coalición Existe", "Congreso y Senado: Aragón"],
    ["C5", "Compromís: Front Valencià (Compromís, EUPV, Podem, ERPV)", "Congreso: Comunitat Valenciana"],
    ["C6", "Comuns-Front Ampli per la democràcia", "Senado: Cataluña"],
    ["C7", "Unidad del Pueblo Canario (NC-BC, Podemos, IU, Sumar)", "Congreso y Senado: Canarias"],
    ["C8", "Senado de Progreso (PSOE, IU, MS, MM, Compromís, CHA, Batzarre)", "Senado: 15 comunidades y Ceuta y Melilla"],
    ["C9", "Frente Amplio", "Congreso: toda España salvo Canarias, Illes Balears y C. Valenciana"],
]
JECC = {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}
RTVEC = {"href": "https://www.rtve.es/noticias/20261012/ada-colau-candidata-frente-amplio-elecciones/17263538.shtml", "label": "RTVE, 12 de octubre de 2026: el Frente Amplio designa a Ada Colau"}
PUBC = {"href": "https://www.publico.es/politica/frente-amplio-podemos-concurriran-separado-29-noviembre-salvo-canarias-pais-valencia.html", "label": "Público, 17 de octubre de 2026: Frente Amplio y Podemos, por separado salvo en Canarias y País Valencià"}

coalicion = {
    "id": "nuevo-partido-coalicion-29n",
    "pack": "elecciones",
    "path": "/elecciones/nuevo-partido-coalicion",
    "h1": "Coaliciones y listas del 29 de noviembre: qué hay registrado",
    "title": "Coaliciones del 29-N: las 9 registradas en la Junta Electoral",
    "description": "La Junta Electoral Central ha validado 9 coaliciones para el 29-N, del Frente Amplio a D21. Dónde se presenta cada una y cuándo salen las listas.",
    "lead": "El plazo para comunicar coaliciones terminó el 16 de octubre de 2026. La Junta Electoral Central publica nueve coaliciones válidamente constituidas para estas elecciones, entre ellas Frente Amplio y Democracia para el siglo 21 (D21). Las listas con nombres se presentan del 21 al 26 de octubre y se proclaman el 2 de noviembre.",
    "reviewedAt": "2026-10-18",
    "cta": {"href": JECC["href"], "label": "Ver la lista de coaliciones en la Junta Electoral Central"},
    "secondaryCta": {"href": JEC["href"], "label": "Calendario de candidaturas de la Junta"},
    "sources": [
        JECC, JEC,
        {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#acuarentaycuatro", "label": "LOREG, artículo 44: partidos, coaliciones y plazo de comunicación"},
        {"href": "https://infoelectoral.interior.gob.es/es/formaciones-politicas/financiacion-de-partidos-politicos/informacion-especifica-para-coaliciones-electorales/", "label": "Interior: una coalición no se inscribe en el Registro de Partidos"},
        RTVEC, PUBC, RD,
    ],
    "related": [
        {"href": "/elecciones/calendario-29-noviembre", "label": "Calendario completo del 29-N"},
        {"href": "/elecciones/promesas", "label": "Qué prometen los partidos"},
        {"href": "/elecciones/como-votar-al-senado", "label": "Cómo se vota al Senado"},
    ],
    "disclaimer": "No somos la Junta Electoral ni un partido. La lista de coaliciones es la publicada por la Junta Electoral Central a 18 de octubre de 2026. Las candidaturas con nombres son las que proclamen las Juntas Electorales Provinciales y publique el BOE.",
    "faqs": [
        {"q": "¿Frente Amplio es un partido?", "a": "No. Es una coalición electoral comunicada a la Junta Electoral Central. Interior explica que las coaliciones no se inscriben en el Registro de Partidos: se constituyen al comunicar el pacto a la Junta."},
        {"q": "¿Quién encabeza el Frente Amplio?", "a": "Según RTVE, el 12 de octubre de 2026 Sumar, IU, Más Madrid y Comuns acordaron designar a Ada Colau como candidata a la Presidencia del Gobierno. El orden de las listas será oficial cuando se proclamen las candidaturas."},
        {"q": "¿Van juntos Frente Amplio y Podemos?", "a": "Según Público (17 de octubre), solo habrá lista conjunta en Canarias y en la Comunitat Valenciana. La lista de la Junta lo refleja: Podemos está en Unidad del Pueblo Canario y Podem en Compromís."},
        {"q": "¿Dónde se presenta Democracia 21?", "a": "La coalición D21 figura en la Junta Electoral Central con ámbito Congreso y Senado en Madrid y Barcelona."},
    ],
    "sections": [
        {
            "id": "lista-jec",
            "title": "Las nueve coaliciones validadas por la Junta",
            "paragraphs": ["En el orden de presentación que publica la Junta Electoral Central. Los partidos que no van en coalición se presentan con sus propias siglas y no aparecen en esta lista."],
            "table": {"caption": "Coaliciones válidamente constituidas ante la Junta Electoral Central (29-N)", "head": ["Nº", "Coalición", "Dónde se presenta"], "rows": [{"cells": r, "source": JECC} for r in coal_rows]},
        },
        {
            "id": "lo-que-cuenta-la-prensa",
            "title": "Lo que cuenta la prensa sobre las alianzas",
            "paragraphs": [
                "RTVE informó el 12 de octubre de que los cuatro partidos del Frente Amplio (Sumar, IU, Más Madrid y Comuns) designaban a Ada Colau como candidata a la Presidencia. La misma pieza recoge que Podemos acordó con ERC no presentar candidatura propia en Cataluña.",
                "Público informó el 17 de octubre de que el Frente Amplio registró la coalición sin Podemos. Habrá una lista conjunta de ese espacio en Canarias y en la Comunitat Valenciana; en el resto, listas separadas.",
                "Estas son crónicas de prensa. Lo que vale para la papeleta es la candidatura proclamada.",
            ],
        },
        {
            "id": "partido-o-coalicion",
            "title": "Partido inscrito y coalición no son lo mismo",
            "paragraphs": [
                "Pueden presentar listas los partidos y federaciones inscritos en el registro, las coaliciones comunicadas a la Junta y las agrupaciones de electores. Lo dice el artículo 44.1 de la LOREG.",
                "Interior explica que no hay un registro público de coaliciones. Solo pueden integrarlas partidos y federaciones. Quien entra en una coalición en una circunscripción no presenta allí candidatura propia si la coalición concurre a la misma elección (artículo 44.3).",
            ],
        },
        {
            "id": "cuando-hay-lista",
            "title": "Cuándo hay una lista oficial con nombres",
            "paragraphs": [],
            "lists": [[
                "21 al 26 de octubre: presentación de candidaturas ante las Juntas Electorales Provinciales.",
                "28 de octubre: el BOE publica las candidaturas presentadas.",
                "2 de noviembre: proclamación de candidaturas.",
                "3 de noviembre: el BOE publica las candidaturas proclamadas.",
                "4 y 5 de noviembre: plazo de recurso contra la proclamación ante el juzgado de lo contencioso-administrativo.",
            ]],
        },
    ],
}

RTVEH = {"href": "https://www.rtve.es/noticias/20261007/huelga-general-fecha-sindicatos-ccoo-ugt-inquilinas/17256812.shtml", "label": "RTVE, 7 de octubre de 2026: los sindicatos fijan la huelga general el 11 de noviembre"}
EFEH = {"href": "https://www.infobae.com/espana/agencias/2026/10/16/los-sindicatos-registraran-el-lunes-en-trabajo-la-convocatoria-de-huelga-general-del-11n/", "label": "EFE (en Infobae), 16 de octubre de 2026: registro de la convocatoria el 19 de octubre"}
UGTH = {"href": "https://ugt.es/ugt-y-ccoo-acuerdan-la-convocatoria-de-una-huelga-general-este-otono", "label": "UGT, 6 de octubre de 2026: acuerdo de huelga general de 24 horas"}
huelga = {
    "id": "huelga-general-sindicatos-2026",
    "pack": "elecciones",
    "path": "/elecciones/huelga-general-sindicatos",
    "h1": "Huelga general del 11 de noviembre por la vivienda y los salarios",
    "title": "Huelga general del 11 de noviembre: lo que se sabe",
    "description": "CCOO, UGT y otros sindicatos convocan huelga general de 24 horas el 11 de noviembre de 2026, por la vivienda y los salarios. Registro, preaviso y elecciones.",
    "lead": "CCOO y UGT, con el Sindicato de Inquilinas y otras organizaciones, han fijado una huelga general de 24 horas para el miércoles 11 de noviembre de 2026, dos días antes de que empiece la campaña electoral. Según EFE, los convocantes registran la convocatoria en el Ministerio de Trabajo el lunes 19 de octubre; después la Administración fija los servicios mínimos.",
    "reviewedAt": "2026-10-18",
    "cta": {"href": RTVEH["href"], "label": "Leer la información de RTVE"},
    "secondaryCta": {"href": "https://www.boe.es/buscar/doc.php?id=BOE-A-1977-6061", "label": "Abrir el Real Decreto-ley 17/1977"},
    "sources": [
        RTVEH, EFEH, UGTH,
        {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a28", "label": "Constitución, artículo 28.2: derecho de huelga"},
        {"href": "https://www.boe.es/buscar/doc.php?id=BOE-A-1977-6061", "label": "Real Decreto-ley 17/1977: preaviso de la huelga"},
        RD,
    ],
    "related": [
        {"href": "/alquiler/propuestas-vivienda-6-octubre-2026", "label": "Propuestas de vivienda del 6 de octubre"},
        {"href": "/elecciones/que-propone-cada-partido-vivienda", "label": "Vivienda: qué propone cada partido"},
        {"href": "/elecciones/calendario-29-noviembre", "label": "Calendario completo del 29-N"},
    ],
    "disclaimer": "No somos un sindicato ni la autoridad laboral. Esta ficha resume información publicada hasta el 18 de octubre de 2026. Los servicios mínimos los fija la Administración después del registro.",
    "faqs": [
        {"q": "¿Qué día es la huelga general?", "a": "El miércoles 11 de noviembre de 2026, 24 horas, según la información de RTVE del 7 de octubre. Es dos días antes del inicio de la campaña del 29-N."},
        {"q": "¿Quién la convoca?", "a": "Según EFE, al registro del 19 de octubre acuden CCOO, UGT, CGT, CNT, Unión de Actores y Actrices, CO.BAS, Intersindical y la Confederación de Sindicatos de Inquilinas. RTVE añade que CIG, ELA y LAB presentan su propia convocatoria."},
        {"q": "¿Habrá servicios mínimos?", "a": "Sí: tras el registro, la Administración fija los servicios mínimos. A 18 de octubre de 2026 todavía no se han publicado."},
        {"q": "¿La huelga cambia el día de las elecciones?", "a": "No. El Real Decreto 806/2026 convoca las elecciones para el domingo 29 de noviembre de 2026. Una huelga no modifica ese real decreto."},
    ],
    "sections": [
        {
            "id": "lo-que-se-sabe",
            "title": "Lo que se sabe a 18 de octubre",
            "paragraphs": [
                "RTVE informó el 7 de octubre de que CCOO y UGT, junto al Sindicato de Inquilinas, acordaban una huelga general de 24 horas el miércoles 11 de noviembre, por la vivienda y los salarios.",
                "EFE informó el 16 de octubre de que los secretarios generales de CCOO y UGT, Unai Sordo y Pepe Álvarez, registrarán la convocatoria en el Ministerio de Trabajo el lunes 19 de octubre. Según EFE, sería la primera huelga general de 24 horas convocada por CCOO y UGT desde 2012.",
                "El comunicado de UGT del 6 de octubre vinculaba la huelga a salarios con los que acceder a una vivienda y a un decálogo de vivienda: pacto de Estado, parque público, límite del precio del alquiler y aplicación de la Ley por el Derecho a la Vivienda.",
            ],
        },
        {
            "id": "preaviso",
            "title": "El preaviso legal y los servicios mínimos",
            "paragraphs": [
                "El artículo 28.2 de la Constitución reconoce el derecho de huelga y remite a la ley las garantías para mantener los servicios esenciales.",
                "El artículo 3 del Real Decreto-ley 17/1977 exige comunicar la huelga por escrito al empresario y a la autoridad laboral con cinco días naturales de antelación como mínimo. El artículo 4 sube ese preaviso a diez días si afecta a servicios públicos.",
                "La sentencia del Tribunal Constitucional 11/1981 revisó partes de ese real decreto-ley. Esta página no organiza un paro ni sustituye al comité de huelga.",
            ],
        },
        {
            "id": "elecciones",
            "title": "La huelga y las elecciones van por sitios distintos",
            "paragraphs": [
                "La campaña del 29-N va del 13 al 27 de noviembre. La huelga del 11 de noviembre cae antes y no mueve ninguna fecha electoral.",
                "El 11 de noviembre ya está en marcha el envío de la documentación del voto por correo (del 9 al 22 de noviembre, según la Junta Electoral Central). Si esperas ese envío, revisa los avisos de Correos esos días.",
                "La vivienda es también un tema de campaña: puedes comparar qué propone cada partido en la página de vivienda del 29-N.",
            ],
        },
    ],
}

def to_ts(obj):
    return "  " + J(obj).replace("\n", "\n  ") + ","

# replace calendario, coalicion and huelga blocks
def replace_block(s, start_id, next_marker, obj):
    a = s.index('  {\n    id: "%s"' % start_id)
    b = s.index(next_marker, a + 10)
    return s[:a] + to_ts(obj) + "\n" + s[b:]

s = replace_block(s, "calendario-29n", '  {\n    id: "quien-puede-votar-29n"', calendario)
s = replace_block(s, "nuevo-partido-coalicion-29n", '  {\n    id: "decretos-vivienda-octubre-2026"', {})  # placeholder removal
s = s.replace("  {},\n", to_ts(coalicion) + "\n" + to_ts(huelga) + "\n", 1)

# voto por correo: add JEC dates section after "despues", update reviewedAt and disclaimer
a = s.index('id: "voto-por-correo-29n"'); b = s.index('"id": "calendario-29n"')
blk = s[a:b]
blk = blk.replace("    reviewedAt,\n", '    reviewedAt: "2026-10-18",\n', 1)
blk = blk.replace('    sources: votoSources,', '    sources: [...votoSources, ' + J(JEC) + '],', 1)
blk = blk.replace("Los plazos de esta página son los publicados el 6 de octubre de 2026.", "Los plazos de esta página son los de Correos (6 de octubre de 2026) y los del calendario de la Junta Electoral Central.")
marker = '      {\n        id: "deposito",'
blk = blk.replace(marker, "      " + J(voto_extra).replace("\n", "\n      ") + ",\n" + marker, 1)
s = s[:a] + blk + s[b:]

# quién puede votar: INE figures + reviewedAt
a = s.index('id: "quien-puede-votar-29n"'); b = s.index('"id": "nuevo-partido-coalicion-29n"')
blk = s[a:b]
blk = blk.replace("    reviewedAt,\n", '    reviewedAt: "2026-10-18",\n', 1)
blk = blk.replace("      votoSources[0],\n    ],", "      votoSources[0],\n      " + J(INE) + ",\n    ],", 1)
cifras = {"id": "cifras-ine", "title": "Cuántos electores hay el 29-N", "paragraphs": [
    "Según la nota del INE, pueden votar 38.728.356 electores: 35.958.711 residen en España y 2.769.645 en el extranjero.",
    "De los residentes en España, 1.615.127 votan por primera vez en unas generales, porque han cumplido 18 años desde las de julio de 2023.",
    "Los electores que viven en el extranjero votan sin solicitud previa: la Oficina del Censo Electoral les envía la documentación de oficio.",
]}
m2 = '      {\n        id: "residencia",'
blk = blk.replace(m2, "      " + J(cifras).replace("\n", "\n      ") + ",\n" + m2, 1)
s = s[:a] + blk + s[b:]
P.write_text(s)
print("ok")
