"""Rutina SEO 21-10-2026 (idempotente). Ejecutar al final, después de la cadena de promesas, de gen_cuando_29n y de rutina_mesa_dieta_20261020.
1) /elecciones/quiere-vox-quitar-las-pensiones (+ fila Vox del hub de la serie): Abascal en Ponferrada (20-10, RTVE) y
   José María Figaredo (entrevista en El Debate del 5-10, según Newtral 9-10): «modelo mixto» reparto + capitalización; negó «privatizar».
   Description nueva (CTR: 93 impr., pos. 6,4, 3 clics en la ventana provisional 15–20 oct). Title y H1 sin tocar.
2) /elecciones/encuestas-29n: SocioMétrica/El Español (11-10, campo 10–11 oct, 1.000 CAWI) y Target Point/El Debate (11-10, campo 6–9 oct,
   1.002 CAWI) con su ficha técnica. Sin medias propias. Rangos sin cambio (los dos valores caen dentro).
3) /elecciones/sorteo-mesa-electoral-29n: title y description orientados a «sorteo mesa electoral» (151 impr., pos. 7,5, 0 clics). H1 sin tocar.
   cuando-29n.ts es GENERADO por gen_cuando_29n_20261019.py: si se regenera, volver a ejecutar rutina_mesa_dieta_20261020 y este script.
4) /becas: FAQ visible + FAQPage (estado, orden de la resolución según el Ministerio, resolución definitiva, Cataluña).
5) /elecciones/promesas: la FAQ JSON-LD usaba «A 18 de octubre» fijo; ahora usa PROMESAS_29N_UPDATED.
"""
import pathlib
R = pathlib.Path(__file__).resolve().parent.parent
def rep(rel, pairs):
    p = R / rel; s = p.read_text()
    for a, b in pairs:
        if b in s: continue
        assert s.count(a) == 1, f"{rel}: no encuentro una sola vez: {a[:100]}"
        s = s.replace(a, b)
    p.write_text(s)

# 1) Pensiones · Vox
RTVE = '"label": "RTVE, 20-10-2026: Abascal en Ponferrada",\n    "href": "https://www.rtve.es/noticias/20261020/abascal-critica-feijoo-pedir-sacrificios/17275702.shtml"'
NEWTRAL = '"label": "Newtral, 9-10-2026: qué propone Vox sobre pensiones (entrevista de Figaredo en El Debate, 5-10-2026)",\n    "href": "https://www.newtral.es/pensiones-vox-publicas-privadas/20261009/"'
OLD_LEAD = "Respuesta corta: según las declaraciones con fuente que hemos encontrado, no. Su candidato, Santiago Abascal, dijo el 11 de octubre de 2026 que las pensiones «se van a pagar al precio que sea y como sea» y negó que Vox vaya a privatizarlas, según Europa Press. También dijo «nos da igual el modelo y la fórmula», sin concretar cómo se revalorizarían."
NEW_CORE = "según las declaraciones con fuente que hemos encontrado, no. Su candidato, Santiago Abascal, lo repitió el 20 de octubre de 2026 en Ponferrada: «las pensiones se van a pagar como sea, de la manera que sea», y negó que Vox quiera privatizarlas (RTVE). El 11 de octubre dijo que le da igual «el modelo y la fórmula». Su diputado José María Figaredo propuso el 5 de octubre una reforma hacia «un modelo mixto que combine el reparto con la capitalización individual» y después negó que eso sea privatizar."
OLD_CORE = OLD_LEAD.replace("Respuesta corta: según", "Según")
rep("src/lib/tramites/pensiones-29n.ts", [
 ('"description": "¿Quiere Vox quitar las pensiones? Abascal dijo el 11-10-2026 que se pagarán «al precio que sea». Lo que ha dicho, cómo ha votado y la ley, con fuentes."',
  '"description": "¿Quiere Vox quitar las pensiones? Abascal (20-10-2026): «se van a pagar como sea». Qué es el «modelo mixto» de Figaredo, qué ha votado y qué dice la ley."'),
 (f'"lead": "{OLD_LEAD}"', f'"lead": "Respuesta corta: {NEW_CORE}"'),
 (f'"a": "{OLD_CORE}"', f'"a": "{NEW_CORE[0].upper() + NEW_CORE[1:]}"'),
 (f'     "{OLD_CORE}"\n    ]', f'     "{NEW_CORE[0].upper() + NEW_CORE[1:]}"\n    ]'),
 ('"Declaraciones públicas con fuente y fecha, revisadas el 19 de octubre de 2026."\n    ],\n    "table": {\n     "caption": "Vox: declaraciones sobre pensiones",',
  '"Declaraciones públicas con fuente y fecha, revisadas el 21 de octubre de 2026."\n    ],\n    "table": {\n     "caption": "Vox: declaraciones sobre pensiones",'),
 ('     "rows": [\n      {\n       "cells": [\n        "«Nos da igual el modelo y la fórmula,',
  '     "rows": [\n      {\n       "cells": [\n        "«Las pensiones se van a pagar como sea, de la manera que sea». Negó que Vox quiera privatizarlas.",\n        "Santiago Abascal, acto de precampaña en Ponferrada (León), 20-10-2026"\n       ],\n       "source": {\n        ' + RTVE.replace("\n    ", "\n        ") + '\n       }\n      },\n      {\n       "cells": [\n        "Propuso «una reforma estructural hacia un modelo mixto que combine el reparto con la capitalización individual». En una entrevista posterior negó que Vox quiera «privatizar» las pensiones: «Nunca hemos dicho tal cosa».",\n        "José María Figaredo, diputado de Vox, entrevista en El Debate, 05-10-2026"\n       ],\n       "source": {\n        ' + NEWTRAL.replace("\n    ", "\n        ") + '\n       }\n      },\n      {\n       "cells": [\n        "«Nos da igual el modelo y la fórmula,'),
 ('    "q": "¿Ha publicado Vox su programa para el 29-N?",\n    "a": "A 19 de octubre de 2026, no.',
  '    "q": "¿Qué es el «modelo mixto» de pensiones que propone Vox?",\n    "a": "Figaredo habló el 5 de octubre de 2026 de combinar el sistema actual de reparto (las pensiones de hoy se pagan con las cotizaciones de hoy) con una parte de capitalización individual (aportaciones que se invierten para la pensión futura de cada persona). Según Newtral, el programa económico de Vox de 2025 habla de un sistema mixto «similar al de Suecia», sin detallar cómo se aplicaría. Capitalizar no implica por sí mismo gestión privada: depende de quién gestione el fondo."\n   },\n   {\n    "q": "¿Ha publicado Vox su programa para el 29-N?",\n    "a": "A 21 de octubre de 2026, no.'),
 ('     "Programa del 29-N: no publicado a 19 de octubre de 2026. Cuando se publique, añadiremos lo que diga sobre pensiones."\n    ]\n   },\n   {\n    "id": "ley-actual",\n    "title": "Qué dice la ley hoy",\n    "paragraphs": [\n     "La Constitución obliga a los poderes públicos a garantizar «pensiones adecuadas y periódicamente actualizadas» a las personas mayores (artículo 50).",\n     "La Ley General de la Seguridad Social (artículo 58) fija que las pensiones contributivas se revalorizan cada año con la media del IPC de los doce meses previos a diciembre. Cambiar esa regla exige una norma con rango de ley aprobada o convalidada por el Congreso.",\n     "En 2026 las pensiones contributivas subieron un 2,7 % (Real Decreto-ley 3/2026, de 3 de febrero, y Real Decreto 241/2026, de 25 de marzo)."\n    ]\n   },\n   {\n    "id": "criterio",\n    "title": "Cómo hemos hecho esta verificación",\n    "paragraphs": [\n     "Recogemos solo lo que el partido o su candidato han dicho en público sobre pensiones, con quién, dónde, cuándo y la fuente, y lo que han votado en el Congreso cuando una fuente lo detalla. No recogemos lo que otros partidos dicen de él.",\n     "Todas las páginas de esta serie tienen las mismas secciones en el mismo orden. Si no encontramos declaraciones verificables, lo decimos. No valoramos las propuestas ni recomendamos ningún voto."\n    ]\n   }\n  ]\n },\n {\n  "id": "pens29n-frente-amplio",',
  '     "Programa del 29-N: no publicado a 21 de octubre de 2026. El programa económico de Vox de 2025, que Figaredo dio por vigente según Newtral, propone un sistema mixto «similar al de Suecia». Cuando se publique el programa del 29-N, añadiremos lo que diga sobre pensiones."\n    ]\n   },\n   {\n    "id": "ley-actual",\n    "title": "Qué dice la ley hoy",\n    "paragraphs": [\n     "La Constitución obliga a los poderes públicos a garantizar «pensiones adecuadas y periódicamente actualizadas» a las personas mayores (artículo 50).",\n     "La Ley General de la Seguridad Social (artículo 58) fija que las pensiones contributivas se revalorizan cada año con la media del IPC de los doce meses previos a diciembre. Cambiar esa regla exige una norma con rango de ley aprobada o convalidada por el Congreso.",\n     "En 2026 las pensiones contributivas subieron un 2,7 % (Real Decreto-ley 3/2026, de 3 de febrero, y Real Decreto 241/2026, de 25 de marzo)."\n    ]\n   },\n   {\n    "id": "criterio",\n    "title": "Cómo hemos hecho esta verificación",\n    "paragraphs": [\n     "Recogemos solo lo que el partido o su candidato han dicho en público sobre pensiones, con quién, dónde, cuándo y la fuente, y lo que han votado en el Congreso cuando una fuente lo detalla. No recogemos lo que otros partidos dicen de él.",\n     "Todas las páginas de esta serie tienen las mismas secciones en el mismo orden. Si no encontramos declaraciones verificables, lo decimos. No valoramos las propuestas ni recomendamos ningún voto."\n    ]\n   }\n  ]\n },\n {\n  "id": "pens29n-frente-amplio",'),
 ('  "sources": [\n   {\n    "label": "Europa Press, 11-10-2026: Abascal en Estepona",',
  '  "sources": [\n   {\n    ' + RTVE + '\n   },\n   {\n    ' + NEWTRAL + '\n   },\n   {\n    "label": "Europa Press, 11-10-2026: Abascal en Estepona",'),
 # hub de la serie: fila Vox
 ('"Abascal: las pensiones «se van a pagar al precio que sea y como sea»; «nos da igual el modelo y la fórmula» (11-10-2026)."\n       ],\n       "source": {\n        "label": "Europa Press, 11-10-2026: Abascal en Estepona",\n        "href": "https://www.europapress.es/nacional/noticia-abascal-dice-vox-pensiones-pagaran-habra-vivienda-sea-sigue-llamando-voto-presencial-20261011195906.html"',
  '"Abascal: las pensiones «se van a pagar al precio que sea y como sea» (11-10-2026) y «se van a pagar como sea, de la manera que sea» (Ponferrada, 20-10-2026). Figaredo propuso un «modelo mixto» de reparto y capitalización (5-10-2026) y negó que sea privatizar."\n       ],\n       "source": {\n        ' + RTVE.replace("\n    ", "\n        ")),
])
# reviewedAt de la ficha Vox y del hub (solo esos dos objetos)
p = R / "src/lib/tramites/pensiones-29n.ts"; s = p.read_text()
for anchor in ('  "id": "pens29n-vox",\n  "pack": "elecciones",\n  "reviewedAt": "2026-10-19",', ):
    if anchor in s: s = s.replace(anchor, anchor.replace("2026-10-19", "2026-10-21"))
i = s.find('"path": "/elecciones/quiere-algun-partido-quitar-las-pensiones"'); j = s.rfind('"reviewedAt": "', 0, i)
if s[j:j+27] == '"reviewedAt": "2026-10-19",': s = s[:j] + '"reviewedAt": "2026-10-21",' + s[j+27:]
p.write_text(s)

# 2) Encuestas
SOCIO = '  socio1011: { href: "https://www.elespanol.com/espana/politica/20261011/sanchez-no-funciona-apropiarse-maricarmen-huelga-oposicion-cae-sondeo-noche/1003744416762_0.html", label: "El Español, 11 de octubre de 2026: encuesta de SocioMétrica y ficha técnica" },\n'
TARGET = '  target1011: { href: "https://www.eldebate.com/espana/20261011/izquierda-apenas-reacciona-adelanto-frente-derecha-le-saca-casi-15-puntos_468080.html", label: "El Debate, 11 de octubre de 2026: encuesta de Target Point y ficha técnica" },\n'
rep("src/lib/tramites/encuestas-29n.ts", [
 ('  dsevilla: {', SOCIO + TARGET + '  dsevilla: {'),
 ('    { cells: ["GAD3 para ABC (12-10-2026)", "6 al 8 de octubre"',
  '    { cells: ["SocioMétrica para El Español (11-10-2026)", "10 y 11 de octubre", "1.000, panel por internet (CAWI)", "32,6 %", "26,2 %", "18,8 %"], source: S.socio1011 },\n    { cells: ["Target Point para El Debate (11-10-2026)", "6 al 9 de octubre", "1.002, panel por internet (CAWI)", "32 %", "25,9 %", "18,7 %"], source: S.target1011 },\n    { cells: ["GAD3 para ABC (12-10-2026)", "6 al 8 de octubre"'),
 ('caption: "Rango de las siete encuestas privadas de octubre de 2026', 'caption: "Rango de las nueve encuestas privadas de octubre de 2026'),
 ('    reviewedAt: "2026-10-20",\n    path: "/elecciones/encuestas-29n",', '    reviewedAt: "2026-10-21",\n    path: "/elecciones/encuestas-29n",'),
 ('"Encuestas del 29-N de octubre de 2026 con campo, muestra y fuente: CIS, Sigma Dos, GAD3, Hamalgama, NC Report, 40dB y DYM. Por qué el CIS difiere."',
  '"Encuestas del 29-N de octubre de 2026 con campo, muestra y fuente: CIS, Sigma Dos, GAD3, SocioMétrica, Target Point, NC Report, 40dB y más."'),
 ('"Las siete encuestas privadas publicadas en octubre de 2026 (dos de ellas de Sigma Dos, la última el 19 de octubre)',
  '"Las nueve encuestas privadas publicadas en octubre de 2026 que recogemos (dos de ellas de Sigma Dos, la última el 19 de octubre)'),
 ('GAD3 31,4 %, Hamalgama 33,4 %, NC Report 34,1 %, 40dB 31,9 % y DYM 34 %.',
  'GAD3 31,4 %, SocioMétrica 32,6 %, Target Point 32 %, Hamalgama 33,4 %, NC Report 34,1 %, 40dB 31,9 % y DYM 34 %.'),
 ('La de Sigma Dos del 19 de octubre les da entre 197 y 205 (132–137 el PP y 65–68 Vox).',
  'La de Sigma Dos del 19 de octubre les da entre 197 y 205 (132–137 el PP y 65–68 Vox) y la de SocioMétrica del 11 de octubre, 205 (141 y 64).'),
 ('"También cambia el canal: teléfono (GAD3, Hamalgama), internet (40dB, DYM) o mixto (Sigma Dos, NC Report).',
  '"También cambia el canal: teléfono (GAD3, Hamalgama), internet (40dB, DYM, SocioMétrica, Target Point) o mixto (Sigma Dos, NC Report).'),
 ('    sources: [S.sigma1019, S.hamalgama1011, S.cis3582,', '    sources: [S.sigma1019, S.socio1011, S.target1011, S.hamalgama1011, S.cis3582,'),
])

# 3) Sorteo de mesas: title + description
rep("src/lib/tramites/cuando-29n.ts", [
 ('"title": "Mesa electoral 29-N: cuándo es el sorteo y cuándo lo sabrás",', '"title": "Sorteo mesa electoral 29-N: fechas y cómo saber si te toca",'),
 ('"description": "El sorteo de mesas del 29-N es del 31 de octubre al 4 de noviembre y te lo notifican en 3 días. Plazos para alegar, renunciar con 65 años y qué hacer.",',
  '"description": "Sorteo de mesas del 29-N: del 31 de octubre al 4 de noviembre; te lo notifican en 3 días. Plazo para alegar, renuncia con 65 años y dieta de 75 €.",'),
])

# 4) /becas: FAQ visible + FAQPage
BECAS_OLD = '''      {(pack === "becas" || pack === "alquiler") && <><p className="mt-4"><a className="inline-flex min-h-11 items-center underline" href="/ayudas">'''
BECAS_FAQ = [
 ("¿Cómo consulto el estado de mi beca MEC 2026-27?", "En la sede electrónica del Ministerio de Educación, en «Mis expedientes» y «Mis notificaciones», con el DNI o NIE y la clave con la que hiciste la solicitud. Cuando hay una notificación nueva, el Ministerio avisa por correo electrónico."),
 ("¿Cuándo sale la resolución de la beca MEC 2026-27?", "No hay una fecha única. Según el Ministerio, en los meses siguientes al fin del plazo de solicitud (que fue el 19 de mayo de 2026) notifica primero si cumples los requisitos económicos; después, la concesión de la matrícula, las cuantías fijas y la cuantía variable mínima de 60 € cuando la convocatoria la prevé; más adelante, la cuantía variable, que puede llegar en dos partes."),
 ("¿Ha salido la resolución definitiva de la beca MEC 2026-27?", "A 21 de octubre de 2026, la página de novedades del Ministerio no la anuncia. La resolución definitiva se publica en la web del Ministerio con la lista de todas las personas beneficiarias, después de las notificaciones individuales. Si tu solicitud no aparece en esa lista, no está concedida."),
 ("¿Puedo pedir la beca MEC si mi familia vive en Cataluña?", "Desde el curso 2026-27, no: la competencia pasó a la Generalitat y debes pedir la beca de la convocatoria catalana. Cuenta el domicilio familiar, no dónde estudias."),
]
def jsx_esc(t): return t.replace("{", "&#123;").replace("}", "&#125;")
import json as _j
ld = ",\n".join('            { "@type": "Question", name: %s, acceptedAnswer: { "@type": "Answer", text: %s } }' % (_j.dumps(q, ensure_ascii=False), _j.dumps(a, ensure_ascii=False)) for q, a in BECAS_FAQ)
vis = "\n".join('            <p><strong>%s</strong> %s</p>' % (jsx_esc(q), jsx_esc(a)) for q, a in BECAS_FAQ)
BECAS_NEW = ('''      {pack === "becas" ? (
        <>
          <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
''' + ld + '''
          ] }} />
          <section id="preguntas" className="mt-8 space-y-3" data-becas-faq="">
            <h2 className="font-display text-2xl text-mossDark">Preguntas frecuentes sobre la beca MEC 2026-27</h2>
''' + vis + '''
            <p className="text-sm">Fuentes: <a className="underline" href="https://www.becaseducacion.gob.es/dudas/faqs.html">Ministerio de Educación: preguntas frecuentes (cómo y cuándo se resuelve)</a> · <a className="underline" href="https://www.becaseducacion.gob.es/novedades.html">Ministerio de Educación: novedades (consultado el 21-10-2026)</a> · <a className="underline" href="/becas/mec/estado">Guía: consultar el estado y las notificaciones</a></p>
          </section>
        </>
      ) : null}
''' + BECAS_OLD)
rep("src/components/tramites/PackIndex.tsx", [
 (BECAS_OLD, BECAS_NEW),
 # 5) promesas: fecha de la FAQ JSON-LD
 ('acceptedAnswer: { "@type": "Answer", text: "A 18 de octubre de 2026, no. Recogemos los anuncios y las declaraciones de mítines con fuente y fecha y marcamos lo demás como pendiente de programa." }',
  'acceptedAnswer: { "@type": "Answer", text: `A ${fechaLarga(PROMESAS_29N_UPDATED)}, no. Recogemos los anuncios y las declaraciones de mítines con fuente y fecha y marcamos lo demás como pendiente de programa.` }'),
])
print("ok rutina 21-10")

# 1b) Hub de la serie de pensiones: fecha de la respuesta general (revisada hoy para los seis partidos de la tabla)
p = R / "src/lib/tramites/pensiones-29n.ts"; s = p.read_text()
end = s.find('"id": "pens29n-pp"'); hub = s[:end]
hub = hub.replace("a 19 de octubre de 2026 no hemos encontrado ninguna declaración de PP, PSOE, Vox", "a 21 de octubre de 2026 no hemos encontrado ninguna declaración de PP, PSOE, Vox")
hub = hub.replace("A 19 de octubre de 2026 no hemos encontrado ninguna declaración de PP, PSOE, Vox", "A 21 de octubre de 2026 no hemos encontrado ninguna declaración de PP, PSOE, Vox")
p.write_text(hub + s[end:]); print("ok hub pensiones")
