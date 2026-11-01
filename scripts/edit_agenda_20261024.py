"""Agenda 29-N, 24-10-2026 (idempotente). Quita Vox Menorca (23-10, ya celebrado); hora de Sánchez en Granada (11:30, Sala Federico
García Lorca, con María Jesús Montero; Europa Press 23-10); añade los actos de Abascal en Zamora (27), Santander y Valladolid (28) y Ávila (29)
(Europa Press 22-10, act. 23-10); tabla de entrevistas en orden de votos de 2023 (PP, PSOE, Vox, Frente Amplio)."""
import pathlib, re
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/agenda-29n.ts"
s = F.read_text()
def rep(a, b, must=True):
    global s
    if b and b in s: return
    if not b and a not in s: return
    assert a in s, a[:80]; s = s.replace(a, b, 1)
s = re.sub(r'const UPD = "[^"]*";', 'const UPD = "24 de octubre de 2026, 08:30 (hora peninsular)";', s)
if "SANCHEZ_GRANADA_HORA" not in s:
    rep('const SANCHEZ_GIJON =', 'const SANCHEZ_GRANADA_HORA = { href: "https://www.europapress.es/andalucia/noticia-pedro-sanchez-protagonizara-sabado-granada-segundo-gran-acto-precampana-andalucia-cara-29n-20261023163750.html", label: "Europa Press, 23-10-2026: Sánchez, acto en Granada el sábado 24 a las 11:30" };\nconst VOX_CYL = { href: "https://www.europapress.es/castilla-y-leon/noticia-abascal-tendra-actos-precampana-martes-zamora-miercoles-28-valladolid-20261022190251.html", label: "Europa Press, 22-10-2026 (act. 23-10): actos de Abascal en Zamora, Santander, Valladolid y Ávila" };\nconst SANCHEZ_GIJON =')
rep('{ cells: ["PSOE · Pedro Sánchez", "Sábado 24 de octubre (hora no confirmada por Europa Press)", "Granada", "Palacio de Exposiciones y Congresos"], source: SANCHEZ_GRANADA },',
    '{ cells: ["PSOE · Pedro Sánchez", "Sábado 24 de octubre, 11:30", "Granada", "Sala Federico García Lorca del Palacio de Congresos, con María Jesús Montero"], source: SANCHEZ_GRANADA_HORA },')
rep('            { cells: ["Vox · Santiago Abascal", "Viernes 23 de octubre", "Menorca", "Lugar no publicado"], source: VOX_ACTOS },\n', '')
rep('{ cells: ["Vox · Santiago Abascal", "Sábado 24 de octubre", "Ibiza", "Lugar no publicado"], source: VOX_ACTOS },',
    '{ cells: ["Vox · Santiago Abascal", "Sábado 24 de octubre", "Ibiza", "Lugar no publicado"], source: VOX_ACTOS },\n'
    '            { cells: ["Vox · Santiago Abascal", "Martes 27 de octubre, 19:00", "Zamora", "Plaza de la Marina"], source: VOX_CYL },\n'
    '            { cells: ["Vox · Santiago Abascal", "Miércoles 28 de octubre, 12:00", "Santander", "Jardines de Pereda"], source: VOX_CYL },\n'
    '            { cells: ["Vox · Santiago Abascal", "Miércoles 28 de octubre, 19:00", "Valladolid", "Pabellón 3 de la Feria de Valladolid"], source: VOX_CYL },\n'
    '            { cells: ["Vox · Santiago Abascal", "Jueves 29 de octubre, 19:00", "Ávila", "Palacio de Congresos Lienzo Norte"], source: VOX_CYL },')
rep('sources: [FEIJOO_VIGO, FEIJOO_SALAMANCA, SANCHEZ_GRANADA, SANCHEZ_GIJON, SANCHEZ_VITORIA, VOX_ACTOS, DEBATES_EE, LASEXTA],',
    'sources: [FEIJOO_VIGO, FEIJOO_SALAMANCA, SANCHEZ_GRANADA_HORA, SANCHEZ_GRANADA, SANCHEZ_GIJON, SANCHEZ_VITORIA, VOX_ACTOS, VOX_CYL, DEBATES_EE, LASEXTA],')
# reviewedAt de agenda y entrevistas
for p in ("/elecciones/agenda-mitines-29n", "/elecciones/podcasts-entrevistas-candidatos-29n"):
    i = s.find(f'path: "{p}"'); j = s.rfind('reviewedAt: "', 0, i)
    s = s[:j] + 'reviewedAt: "2026-10-24"' + s[j + len('reviewedAt: "2026-10-23"'):]
# orden de la tabla de entrevistas: PP, PSOE, Vox, Frente Amplio (estable dentro de cada partido)
a = s.find('caption: `Entrevistas y pódcast'); r0 = s.find("rows: [\n", a) + len("rows: [\n"); r1 = s.find("          ],\n", r0)
lines = s[r0:r1].splitlines(keepends=True)
order = ["PP ·", "PSOE ·", "Vox ·", "Frente Amplio ·"]
key = lambda l: next(n for n, o in enumerate(order) if f'cells: ["{o}' in l)
s = s[:r0] + "".join(sorted(lines, key=key)) + s[r1:]
F.write_text(s); print("ok agenda 24-10")
