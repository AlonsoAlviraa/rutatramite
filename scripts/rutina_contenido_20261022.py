"""Rutina SEO 22-10-2026 (idempotente). Ejecutar al final, después de rutina_contenido_20261021.py.
cuando-29n.ts es GENERADO por gen_cuando_29n_20261019.py: si se regenera, volver a ejecutar rutina_mesa_dieta_20261020,
rutina_contenido_20261021 y este script.
1) /elecciones/encuestas-29n (+ /elecciones/como-se-hace-una-encuesta-electoral): GESOP/Prensa Ibérica (12-10, campo 6–8 oct, 1.000
   tel.+online, ±3,1) e IMOP/El Confidencial (9-10, campo 5–7 oct, 900 CATI+CAWI, ±3,3), con su ficha técnica. Sin medias propias.
   InvyMark/laSexta (9-10) NO se añade: la fuente no publica muestra ni método.
2) /elecciones/debate-electoral-29n: title y description con las fechas (CTR: 61 impr., 1 clic, pos. 6,2 en datos provisionales
   hasta el 21-10). H1 sin tocar. Fechas sin cambios a 22-10 (Mediaset 16-11, RTVE 23-11, a cuatro 26-11).
3) /elecciones/candidaturas-29n-boe: plazo abierto (21–26 oct), lo que se sabe a 22-10 (PSOE ya ha presentado listas en seis
   provincias andaluzas; PSOE y Frente Amplio, candidaturas conjuntas solo al Senado; PP y Vox negocian una fórmula para el Senado).
   Title y description (74 impr., 2 clics, pos. 6,8). H1 sin tocar.
"""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from _jsonspan import span
R = pathlib.Path(__file__).resolve().parent.parent
def rep(rel, pairs):
    p = R / rel; s = p.read_text()
    for a, b in pairs:
        if b in s: continue
        assert s.count(a) == 1, f"{rel}: no encuentro una sola vez: {a[:100]}"
        s = s.replace(a, b)
    p.write_text(s)

# 1) Encuestas
GESOP = '  gesop1012: { href: "https://www.elperiodico.com/es/politica/20261012/encuesta-elecciones-generales-espana-2026-29n-135212729", label: "El Periódico (Prensa Ibérica), 12 de octubre de 2026: encuesta de GESOP y ficha técnica" },\n'
IMOP = '  imop1009: { href: "https://www.imop.es/encuesta-pre-electoral-para-el-confidencial-2026/", label: "IMOP Insights, 9 de octubre de 2026: encuesta preelectoral para El Confidencial y ficha técnica" },\n'
E = "src/lib/tramites/encuestas-29n.ts"
rep(E, [
 ('  dsevilla: {', GESOP + IMOP + '  dsevilla: {'),
 ('    { cells: ["Hamalgama Métrica para Vozpópuli (11-10-2026)"',
  '    { cells: ["GESOP para Prensa Ibérica (12-10-2026)", "6 al 8 de octubre", "1.000, teléfono e internet", "28,7 %", "26,1 %", "18,9 %"], source: S.gesop1012 },\n    { cells: ["Hamalgama Métrica para Vozpópuli (11-10-2026)"'),
 ('    { cells: ["NC Report para La Razón (8-10-2026)"',
  '    { cells: ["IMOP Insights para El Confidencial (9-10-2026)", "5 al 7 de octubre", "900, teléfono (CATI) e internet (CAWI)", "30 %", "26 %", "19 %"], source: S.imop1009 },\n    { cells: ["NC Report para La Razón (8-10-2026)"'),
 ('caption: "Rango de las nueve encuestas privadas de octubre de 2026', 'caption: "Rango de las once encuestas privadas de octubre de 2026'),
 ('    { label: "PP", min: 31.4, max: 34.1, marker: 22.2, markerLabel: "CIS" },', '    { label: "PP", min: 28.7, max: 34.1, marker: 22.2, markerLabel: "CIS" },'),
 ('    reviewedAt: "2026-10-21",\n    path: "/elecciones/encuestas-29n",', '    reviewedAt: "2026-10-22",\n    path: "/elecciones/encuestas-29n",'),
 ('"Las nueve encuestas privadas publicadas en octubre de 2026 que recogemos (dos de ellas de Sigma Dos, la última el 19 de octubre) ponen primero al PP, entre el 31,4 % y el 34,1 %,',
  '"Las once encuestas privadas publicadas en octubre de 2026 que recogemos (dos de ellas de Sigma Dos, la última el 19 de octubre) ponen primero al PP, entre el 28,7 % y el 34,1 %,'),
 ('Vox aparece tercero en todas, entre el 17,1 % y el 19,6 %. La diferencia', 'Vox aparece tercero en todas, entre el 17,1 % y el 19,6 %. La diferencia'),
 ('GAD3 31,4 %, SocioMétrica 32,6 %, Target Point 32 %, Hamalgama 33,4 %, NC Report 34,1 %, 40dB 31,9 % y DYM 34 %.',
  'GAD3 31,4 %, GESOP 28,7 %, IMOP 30 %, SocioMétrica 32,6 %, Target Point 32 %, Hamalgama 33,4 %, NC Report 34,1 %, 40dB 31,9 % y DYM 34 %.'),
 ('"El PP va del 22,2 % (CIS) al 34,1 % (NC Report). Sin el CIS, el rango es 31,4–34,1 %.",', '"El PP va del 22,2 % (CIS) al 34,1 % (NC Report). Sin el CIS, el rango es 28,7–34,1 % (de GESOP a NC Report).",'),
 ('"La distancia PP–PSOE va de 9,1 puntos a favor del PP (NC Report) a 11,8 a favor del PSOE (CIS).",',
  '"La distancia PP–PSOE va de 9,1 puntos a favor del PP (NC Report) a 11,8 a favor del PSOE (CIS). La más corta entre las privadas es la de GESOP: 2,6 puntos.",'),
 ('"También cambia el canal: teléfono (GAD3, Hamalgama), internet (40dB, DYM, SocioMétrica, Target Point) o mixto (Sigma Dos, NC Report).',
  '"También cambia el canal: teléfono (GAD3, Hamalgama), internet (40dB, DYM, SocioMétrica, Target Point) o mixto (Sigma Dos, NC Report, GESOP, IMOP).'),
 ('    sources: [S.sigma1019, S.socio1011, S.target1011, S.hamalgama1011,', '    sources: [S.sigma1019, S.socio1011, S.target1011, S.gesop1012, S.imop1009, S.hamalgama1011,'),
 ('            { cells: ["NC Report / La Razón", "1.000", "Mitad teléfono, mitad internet", "1 al 6 de octubre", "±3,17 (95,5 %)"], source: S.doble },',
  '            { cells: ["NC Report / La Razón", "1.000", "Mitad teléfono, mitad internet", "1 al 6 de octubre", "±3,17 (95,5 %)"], source: S.doble },\n            { cells: ["GESOP / Prensa Ibérica", "1.000", "Teléfono e internet; cuotas de sexo y edad", "6 al 8 de octubre", "±3,1 (95 %)"], source: S.gesop1012 },\n            { cells: ["IMOP / El Confidencial", "900", "Teléfono (CATI) e internet (CAWI, panel propio)", "5 al 7 de octubre", "±3,3"], source: S.imop1009 },'),
])
p = R / E; s = p.read_text()
assert s.count("S.gesop1012") >= 3 and s.count("S.imop1009") >= 3
# 2) y 3) cuando-29n.ts
C = R / "src/lib/tramites/cuando-29n.ts"; s = C.read_text()
OP = ' {\n  "id": "'
def edit(path, fn):
    global s
    a, b = span(s, path, opener=OP); g = json.loads(s[a + 1:b]); fn(g)
    txt = json.dumps(g, ensure_ascii=False, indent=1).replace("\n", "\n ")
    s = s[:a] + " " + txt + s[b:]
def debate(g):
    keep = g["h1"]
    g["reviewedAt"] = "2026-10-22"
    g["title"] = "Debate electoral 29-N: 16, 23 y 26 de noviembre"
    g["description"] = "¿Cuándo es el debate electoral del 29-N? Cara a cara en Mediaset el 16-N (aceptado por el PP), portavoces en RTVE el 23 y a cuatro el 26. Lo que falta."
    g["lead"] = g["lead"].replace("Respuesta corta: a 19 de octubre de 2026 no hemos encontrado", "Respuesta corta: a 22 de octubre de 2026 no hemos encontrado")
    for f in g["faqs"]:
        f["a"] = f["a"].replace("A 19 de octubre de 2026 no hay fecha cerrada", "A 22 de octubre de 2026 no hay fecha cerrada")
    assert "22 de octubre" in g["lead"] and g["h1"] == keep
EP = {"label": "Europa Press, 21-10-2026: Frente Amplio y PSOE, listas conjuntas solo al Senado; el PSOE ya ha presentado listas en Andalucía", "href": "https://www.europapress.es/nacional/noticia-frente-amplio-aclara-no-hay-negociaciones-psoe-listas-congreso-20261021111844.html"}
A3 = {"label": "Antena 3 Noticias, 21-10-2026: PP y Vox negocian una fórmula para el Senado", "href": "https://www.antena3.com/noticias/espana/abascal-posible-pacto-senado-vamos-hacer-espectaculo-como-hecho-izquierda_202610216ad8e9cc83ad1f356c0f59c7.html"}
def candidaturas(g):
    keep = g["h1"]
    g["reviewedAt"] = "2026-10-22"
    g["title"] = "Listas del 29-N: plazo hasta el 26-oct y BOE el 28"
    g["description"] = "Plazo abierto: las candidaturas del 29-N se presentan del 21 al 26 de octubre, el BOE las publica el 28 y las definitivas el 3 de noviembre. Qué se sabe ya."
    if "el plazo está abierto" not in g["lead"]:
        g["lead"] = g["lead"].replace("Respuesta corta: los partidos presentan sus listas del 21 al 26 de octubre de 2026 y el BOE las publica el 28 de octubre.",
            "Respuesta corta: los partidos presentan sus listas del 21 al 26 de octubre de 2026 (el plazo está abierto desde el 21: termina el lunes 26) y el BOE las publica el 28 de octubre.")
        assert "el plazo está abierto" in g["lead"]
    if not any(x["id"] == "ya-presentadas" for x in g["sections"]):
        g["sections"].insert(1, {"id": "ya-presentadas", "title": "Qué se sabe a 22 de octubre",
            "paragraphs": [
              "Hasta que el BOE publique las candidaturas presentadas, el 28 de octubre, no hay lista oficial de quién se presenta en cada provincia. Lo que han comunicado los partidos hasta ahora:"],
            "lists": [[
              "PSOE: fuentes del partido dijeron el 21 de octubre que ya había presentado sus listas al Congreso en seis provincias de Andalucía, sin otros partidos (Europa Press).",
              "PSOE y Frente Amplio: van en candidaturas conjuntas al Senado en varias provincias; los dos partidos dicen que el acuerdo no incluye el Congreso (Europa Press, 21-10).",
              "PP y Vox: negocian una fórmula conjunta para el Senado; a 22 de octubre no han anunciado acuerdo (Antena 3 Noticias, 21-10).",
              "Las coaliciones se tenían que comunicar a la Junta Electoral antes de abrirse este plazo: están en la página de coaliciones registradas."]]})
    if not any(f["q"].startswith("¿Hasta cuándo pueden presentar") for f in g["faqs"]):
        g["faqs"].insert(0, {"q": "¿Hasta cuándo pueden presentar los partidos sus listas del 29-N?", "a": "Hasta el lunes 26 de octubre de 2026. El plazo se abrió el 21 de octubre (del día 15 al 20 tras la convocatoria del 6 de octubre, artículo 45 de la LOREG). Las presentadas salen en el BOE el 28 de octubre."})
    for y in (EP, A3):
        if not any(z["href"] == y["href"] for z in g["sources"]): g["sources"].append(y)
    assert g["h1"] == keep
edit("/elecciones/debate-electoral-29n", debate)
edit("/elecciones/candidaturas-29n-boe", candidaturas)
C.write_text(s)
print("ok rutina 22-10")
