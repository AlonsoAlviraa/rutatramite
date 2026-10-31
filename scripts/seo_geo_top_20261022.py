#!/usr/bin/env python3
"""SEO+GEO de las páginas top (22-10). Idempotente; reejecutar tras regenerar cuando-29n.ts o voto-nulo-casos.ts.
Inserta la sección «en-resumen» (respuesta citable de 40-60 palabras + datos clave con fecha y fuente) y reviewedAt 2026-10-22."""
import json, re
R = "2026-10-22"
DATA = {
 ('src/lib/tramites/cuando-29n.ts', '/elecciones/tarjeta-censal-cuando-llega'): (
  "La Oficina del Censo Electoral (INE) envía la tarjeta censal a partir del 2 de noviembre de 2026 para las elecciones generales del 29 de noviembre. La carta indica tu sección, tu mesa y tu colegio electoral. No es obligatoria para votar: basta el DNI, el pasaporte o el carné de conducir originales con foto.",
  ["2 de noviembre de 2026: empieza el envío de la tarjeta censal (nota del INE del 9 de octubre de 2026).",
   "29 de noviembre de 2026: elecciones generales (Real Decreto 806/2026, BOE).",
   "Para votar sin tarjeta: DNI, pasaporte o permiso de conducir originales con fotografía.",
   "Si no te llega: consulta tu mesa en la sede electrónica del INE o llama al 900 343 232.",
   "La tarjeta no comunica si te ha tocado mesa: esa notificación llega aparte tras el sorteo municipal."]),
 ('src/lib/tramites/cuando-29n.ts', '/elecciones/que-pasa-si-no-voto'): (
  "En España votar es un derecho y no una obligación: si no votas el 29 de noviembre de 2026 no hay multa ni sanción, sigues inscrito en el censo y tu abstención no se suma a ningún partido. La única obligación es la de los miembros de mesa: no acudir sin causa justificada está castigado por la LOREG.",
  ["Derecho de sufragio: artículo 23 de la Constitución Española.",
   "Abstención: no cuenta en el reparto de escaños (LOREG, artículo 163).",
   "Voto en blanco: es válido y cuenta para la barrera del 3 % de cada provincia (LOREG, artículos 96.5 y 163).",
   "Miembros de mesa: no ir sin causa se castiga con prisión de 3 meses a 1 año o multa de 6 a 24 meses (LOREG, artículo 143).",
   "Si no puedes ir el 29: voto por correo hasta el 19 de noviembre de 2026."]),
 ('src/lib/tramites/cuando-29n.ts', '/elecciones/cuando-habra-gobierno-29n'): (
  "Tras las elecciones del 29 de noviembre de 2026, el nuevo Congreso se constituye el 23 de diciembre a las 10:00. La investidura no tiene fecha fija: depende de que un candidato reúna los apoyos. En 2023 pasaron 116 días entre las elecciones y la investidura. Mientras tanto sigue el Gobierno en funciones.",
  ["23 de diciembre de 2026, 10:00: sesión constitutiva de las Cortes (Real Decreto 806/2026, BOE).",
   "Investidura: mayoría absoluta (176 de 350) en la primera votación o simple en la segunda, 48 horas después (Constitución, artículo 99.3).",
   "Si en dos meses desde la primera votación nadie es investido, se disuelven las Cortes y se repiten las elecciones (artículo 99.5).",
   "2023: elecciones el 23 de julio, Cortes el 17 de agosto e investidura de Pedro Sánchez el 16 de noviembre (La Moncloa).",
   "Hasta la toma de posesión, el Gobierno sigue en funciones (artículo 101)."]),
 ('src/lib/tramites/voto-nulo-casos.ts', '/elecciones/voto-nulo-ejemplos'): (
  "Un voto es nulo si la papeleta o el sobre se alteran: escribir, dibujar, tachar, romperla a propósito o meter papeletas de partidos distintos. Dos papeletas iguales en el mismo sobre cuentan como un voto válido y el sobre vacío es voto en blanco. Los votos nulos no cuentan para nada en el reparto de escaños.",
  ["Votos nulos y en blanco: LOREG, artículo 96.",
   "Dos papeletas de la misma candidatura en un sobre: un voto válido; de candidaturas distintas: nulo.",
   "Sobre sin papeleta: voto en blanco, que es válido (artículo 96.5).",
   "El voto en blanco cuenta para la barrera del 3 %; el nulo no (artículo 163).",
   "Criterio de la Junta Electoral Central sobre marcas en la papeleta: Instrucción 1/2012 (BOE)."]),
}
for (path, page), (summary, facts) in DATA.items():
    s = open(path, encoding='utf-8').read()
    i = s.find('"path": "%s"' % page); assert i > 0, page
    start = s.rfind('\n {\n  "id"', 0, i)
    s = s[:start] + re.sub(r'"reviewedAt": "[^"]*"', '"reviewedAt": "%s"' % R, s[start:i], count=1) + s[i:]
    i = s.find('"path": "%s"' % page)
    k = s.find('"sections": [', i) + len('"sections": [')
    nxt = s.find('\n {\n  "id"', i)
    if '"id": "en-resumen"' not in s[i:nxt if nxt > 0 else len(s)]:
        sec = {"id": "en-resumen", "title": "En resumen", "paragraphs": [summary, "Datos clave, con fecha y fuente oficial:"], "lists": [facts]}
        s = s[:k] + json.dumps(sec, ensure_ascii=False) + ', ' + s[k:]
    open(path, 'w', encoding='utf-8').write(s)
    print(page, len(summary.split()), 'palabras')
