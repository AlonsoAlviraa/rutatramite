"""Rutina SEO 20-10-2026 (idempotente). Cambios de contenido con fuente:
1) /elecciones/encuestas-29n: Sigma Dos/El Mundo del 19-10 (sigmados.com, ficha técnica) y Hamalgama Métrica/Vozpópuli del 11-10.
2) /trabajo/vida-laboral: title/description orientados a «vida laboral por SMS» (GSC: pos ~10, 0 clics) + pasos, qué incluye y FAQ
   (Import@ss, Seguridad Social). H1 sin tocar.
3) /trabajo/revalorizacion-pensiones-2026: subida de 2027 con los 10 datos oficiales del IPC ya publicados (INE, serie IPC290750).
   jubilacion-2026.ts es GENERADO por gen_pensiones_20261018.py: si se regenera, volver a ejecutar este script.
4) /elecciones/cambio-de-domicilio-y-censo: el plazo de reclamación del censo ya terminó.
"""
import json, pathlib, re, sys
R = pathlib.Path(__file__).resolve().parent.parent
T = R / "src/lib/tramites"
def rep(path, pairs):
    p = T / path; s = p.read_text()
    for a, b in pairs:
        if b in s: continue
        assert s.count(a) == 1, f"{path}: no encuentro una sola vez: {a[:90]}"
        s = s.replace(a, b)
    p.write_text(s)

# 1) Encuestas
SIGMA = '  sigma1019: { href: "https://www.sigmados.com/noticia?id=EIJOKGN2GFZmhHt", label: "Sigma Dos, 19 de octubre de 2026: estimación para El Mundo y ficha técnica" },\n'
HAMA = '  hamalgama1011: { href: "https://www.vozpopuli.com/espana/politica/el-psoe-no-consigue-rentabilizar-sus-decretos-de-vivienda-y-perderia-16-millones-de-votantes-y-18-escanos.html", label: "Vozpópuli, 11 de octubre de 2026: encuesta de Hamalgama Métrica y ficha técnica (PP 33,4 % según laSexta, 19-10-2026)" },\n'
rep("encuestas-29n.ts", [
 ('  dsevilla: {', SIGMA + HAMA + '  dsevilla: {'),
 ('type Base = Omit<Guide, "pack" | "reviewedAt" | "disclaimer"> & { disclaimer?: string };',
  'type Base = Omit<Guide, "pack" | "reviewedAt" | "disclaimer"> & { disclaimer?: string; reviewedAt?: string };'),
 ('    { cells: ["CIS, barómetro de octubre (publicado el 14-10-2026)"',
  '    { cells: ["Sigma Dos para El Mundo (19-10-2026)", "1 al 14 de octubre", "3.007, teléfono (CATI) e internet (CAWI)", "31,5 %", "25,3 %", "19,5 %"], source: S.sigma1019 },\n    { cells: ["CIS, barómetro de octubre (publicado el 14-10-2026)"'),
 ('    { cells: ["Sigma Dos para El Mundo (11-10-2026)"',
  '    { cells: ["Hamalgama Métrica para Vozpópuli (11-10-2026)", "5 al 8 de octubre", "1.000, teléfono (CATI)", "33,4 %", "25,3 %", "19,6 %"], source: S.hamalgama1011 },\n    { cells: ["Sigma Dos para El Mundo (11-10-2026)"'),
 ('    id: "29n-encuestas-hub",\n', '    id: "29n-encuestas-hub",\n    reviewedAt: "2026-10-20",\n'),
 ('"Todas las encuestas del 29-N de octubre de 2026 con campo, muestra y fuente: CIS, GAD3, Sigma Dos, NC Report, 40dB y DYM. Por qué el CIS da otro ganador."',
  '"Encuestas del 29-N de octubre de 2026 con campo, muestra y fuente: CIS, Sigma Dos, GAD3, Hamalgama, NC Report, 40dB y DYM. Por qué el CIS difiere."'),
 ('"Las cinco encuestas privadas de octubre de 2026 ponen primero al PP (entre el 31,4 % y el 34,1 %) y el barómetro del CIS pone primero al PSOE (34 %). Vox aparece tercero en todas, entre el 17,1 % y el 19,1 %.',
  '"Las siete encuestas privadas publicadas en octubre de 2026 (dos de ellas de Sigma Dos, la última el 19 de octubre) ponen primero al PP, entre el 31,4 % y el 34,1 %, y el barómetro del CIS pone primero al PSOE (34 %). Vox aparece tercero en todas, entre el 17,1 % y el 19,6 %.'),
 ('a: "En las privadas de octubre de 2026, el PP: GAD3 31,4 %, Sigma Dos 31,9 %, NC Report 34,1 %, 40dB 31,9 % y DYM 34 %.',
  'a: "En las privadas de octubre de 2026, el PP: Sigma Dos 31,5 % (19-10) y 31,9 % (11-10), GAD3 31,4 %, Hamalgama 33,4 %, NC Report 34,1 %, 40dB 31,9 % y DYM 34 %.'),
 ('PP y Vox suman entre 189 y 212 escaños.',
  'PP y Vox suman entre 189 y 212 escaños. La de Sigma Dos del 19 de octubre les da entre 197 y 205 (132–137 el PP y 65–68 Vox).'),
 ('"Vox es tercero en todas, con un rango estrecho: del 17,1 % (CIS) al 19,1 % (Sigma Dos).",',
  '"Vox es tercero en todas, con un rango estrecho: del 17,1 % (CIS) al 19,6 % (Hamalgama).",'),
 ('"También cambia el canal: teléfono (GAD3), internet (40dB, DYM) o mixto (Sigma Dos, NC Report).',
  '"También cambia el canal: teléfono (GAD3, Hamalgama), internet (40dB, DYM) o mixto (Sigma Dos, NC Report).'),
 ('    sources: [S.cis3582, S.cis3582avance, S.gad3, S.doble, S.dsevilla, S.euronews, S.jec, L69],',
  '    sources: [S.sigma1019, S.hamalgama1011, S.cis3582, S.cis3582avance, S.gad3, S.doble, S.dsevilla, S.euronews, S.jec, L69],'),
])

# 2) Vida laboral
rep("gestiones-clave-2026.ts", [
 ('const g = (x: Omit<Guide, "reviewedAt" | "disclaimer">): Guide => ({ reviewedAt, disclaimer: DISCLAIMER, ...x });',
  'const g = (x: Omit<Guide, "reviewedAt" | "disclaimer"> & { reviewedAt?: string }): Guide => ({ reviewedAt, disclaimer: DISCLAIMER, ...x });'),
 ('    id: "vida-laboral",\n    pack: "trabajo",', '    id: "vida-laboral",\n    reviewedAt: "2026-10-20",\n    pack: "trabajo",'),
 ('    title: "Vida laboral: cómo descargarla gratis en 2026 (SMS o Cl@ve)",',
  '    title: "Vida laboral por SMS: descárgala gratis paso a paso (2026)",'),
 ('    description: "Descarga tu informe de vida laboral en Import@ss: con un SMS al móvil registrado, con Cl@ve o con certificado digital. Gratis y al momento en PDF.",',
  '    description: "Descarga la vida laboral por SMS en Import@ss con tu DNI o NIE, fecha de nacimiento y móvil registrado. Qué hacer si tu móvil no está dado de alta.",'),
  ('      { q: "¿Tiene coste?", a: "No. El informe es gratuito en la web oficial." },\n    ],\n    sections: [\n      { id: "vias", title: "Tres formas de obtenerla"',
  '      { q: "¿Tiene coste?", a: "No. El informe es gratuito en la web oficial." },\n'
  '      { q: "¿Aparecen los años trabajados en el extranjero o la mili?", a: "No. El informe de vida laboral no recoge periodos en el extranjero, el servicio militar ni la prestación social sustitutoria. Si nunca has estado de alta en la Seguridad Social, no hay informe que descargar." },\n'
  '      { q: "¿Me la pueden mandar a casa?", a: "Sí. En Import@ss puedes pedir que te envíen el informe por correo al domicilio que tengas comunicado a la Tesorería General de la Seguridad Social, y consultar después el estado de la solicitud." },\n'
  '      { q: "Falta una empresa en mi vida laboral, ¿qué hago?", a: "Desde la misma página de Import@ss puedes solicitar la incorporación o modificación de datos si detectas errores. Guarda nóminas o contratos de ese periodo por si te los piden." },\n'
  '    ],\n    sections: [\n'
  '      { id: "sms-pasos", title: "Vida laboral por SMS, paso a paso", paragraphs: ["Es la vía más rápida si no tienes Cl@ve ni certificado. Solo funciona si tu móvil está registrado en la Seguridad Social."], lists: [["Entra en Import@ss y busca «Informe de tu vida laboral» dentro de «Vida laboral e informes».", "Elige identificarte con la opción Vía SMS.", "Escribe tu DNI o NIE, tu fecha de nacimiento y el móvil que tienes registrado.", "Introduce el código que te llega por SMS.", "Descarga el PDF: puedes pedir la vida laboral completa o acotada a unas fechas."]] },\n'
  '      { id: "que-incluye", title: "Qué incluye el informe", paragraphs: ["Todas tus situaciones de alta y baja en los distintos regímenes de la Seguridad Social y el número de días que has estado de alta. Puedes pedirlo en cualquier momento."], lists: [["No incluye periodos trabajados en el extranjero.", "No incluye el servicio militar ni la prestación social sustitutoria.", "Si nunca has estado de alta, no se puede obtener."]] },\n'
  '      { id: "vias", title: "Tres formas de obtenerla"'),
])

# 3) Pensiones 2027 (fichero generado: se edita el objeto JSON de la guía)
sys.path.insert(0, str(R / "scripts"))
from _jsonspan import span
p = T / "jubilacion-2026.ts"; s = p.read_text()
a, b = span(s, "/trabajo/revalorizacion-pensiones-2026", opener='{\n  "id": "')
g = json.loads(s[a:b])
INE = {"label": "INE: IPC, tasa de variación anual del índice general (serie IPC290750), datos de diciembre de 2025 a septiembre de 2026", "href": "https://www.ine.es/jaxiT3/Tabla.htm?t=76134"}
INE_NOTA = {"label": "INE, 14-10-2026: nota de prensa del IPC de septiembre de 2026 (4,9 %)", "href": "https://www.ine.es/dyngs/Prensa/IPC0926.htm"}
MESES = [("Diciembre 2025", "2,9 %"), ("Enero 2026", "2,3 %"), ("Febrero 2026", "2,3 %"), ("Marzo 2026", "3,4 %"), ("Abril 2026", "3,2 %"),
         ("Mayo 2026", "3,2 %"), ("Junio 2026", "3,2 %"), ("Julio 2026", "3,6 %"), ("Agosto 2026", "4,3 %"), ("Septiembre 2026", "4,9 %"),
         ("Octubre 2026", "pendiente (el INE lo publica en noviembre)"), ("Noviembre 2026", "pendiente (el INE lo publica en diciembre)")]
sec = next(x for x in g["sections"] if x["id"] == "2027")
sec["title"] = "Subida de las pensiones en 2027: lo que dicen ya los datos del IPC"
sec["paragraphs"] = [
 "El artículo 58 de la Ley General de la Seguridad Social fija la regla: las pensiones contributivas se revalorizan al comienzo de cada año con la media de las tasas de variación interanual del IPC de los doce meses previos a diciembre del año anterior. Si esa media fuera negativa, las pensiones no bajan.",
 "Para 2027 cuentan los datos de diciembre de 2025 a noviembre de 2026. A 20 de octubre de 2026 el INE ha publicado diez de los doce: suman 33,3 puntos y su media es del 3,33 %. La cifra final no se sabrá hasta el IPC de noviembre.",
 "Así se calculó la de 2026: la media de diciembre de 2024 a noviembre de 2025 fue del 2,67 %, que redondeado a un decimal da el 2,7 % del Real Decreto-ley 3/2026.",
 "Cuenta rápida para tu pensión: cada décima de subida son 1 € al mes por cada 1.000 € de pensión. Por ejemplo, si la subida final fuera del 3,3 %, una pensión de 1.000 € cobraría 33 € más al mes, en 14 pagas. Es solo un ejemplo de cálculo, no una previsión.",
]
sec["table"] = {"caption": "IPC interanual que cuenta para la subida de las pensiones de 2027 (INE)", "head": ["Mes", "Tasa anual del IPC", "Fuente"],
                "rows": [{"cells": [m, v], "source": INE} for m, v in MESES]}
for src in (INE, INE_NOTA):
    if not any(x["href"] == src["href"] for x in g["sources"]): g["sources"].append(src)
for f in g["faqs"]:
    if f["q"] == "¿Cuánto subirán en 2027?":
        f["a"] = "Se sabrá con el IPC de noviembre de 2026: la ley fija la media de las tasas interanuales del IPC de diciembre de 2025 a noviembre de 2026. Con los diez meses ya publicados por el INE (hasta septiembre), la media va en el 3,33 %; faltan octubre y noviembre."
g["reviewedAt"] = "2026-10-20"
s = s[:a] + json.dumps(g, ensure_ascii=False, indent=1).replace("\n", "\n ") + s[b:]
p.write_text(s)

# 4) Cambio de domicilio y censo
rep("elecciones-29n-ampliacion.ts", [
 ('"Los cambios de domicilio dentro de la misma circunscripción se reclaman en el plazo de consulta del censo, del 12 al 19 de octubre.",',
  '"Los cambios de domicilio dentro de la misma circunscripción se reclamaban en el plazo de consulta del censo, del 12 al 19 de octubre, que ya ha terminado.",'),
])
print("ok rutina 20-10")
