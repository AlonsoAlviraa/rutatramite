"""Rutina 27-10: +4 encuestas privadas (Sigma Dos 26-10, NC Report 26-10, SocioMétrica 25-10, Winston 26-10)."""
from pathlib import Path
p = Path(__file__).resolve().parents[1] / "src/lib/tramites/encuestas-29n.ts"
s = p.read_text()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (a[:80], s.count(a)); s = s.replace(a, b)
rep('  ateneo1025: {', '''  sigma1026: { href: "https://www.sigmados.com/noticia?id=OUze2FxEIVfARtu3", label: "Sigma Dos, 26 de octubre de 2026: estimación para El Mundo y ficha técnica" },
  ncreport1026: { href: "https://www.larazon.es/espana/18-votantes-socialistas-apoyan-hoy-vox_202610266adea62a3eef771e1ac8d43d.html", label: "La Razón, 26 de octubre de 2026: encuesta de NC Report" },
  socio1025: { href: "https://www.elespanol.com/espana/politica/20261025/izquierda-no-remonta-sanchez-gana-escanos-costa-frente-podemos-sondeo-noche/1003744434105_0.html", label: "El Español, 25 de octubre de 2026: encuesta de SocioMétrica y ficha técnica" },
  winston1026: { href: "https://www.articulo14.es/politica/encuesta-articulo14-el-psoe-se-coloca-6-escanos-del-pp-que-mantiene-una-mayoria-de-190-escanos-con-vox-20261026.html", label: "Artículo14, 26 de octubre de 2026: barómetro de Winston" },
  ateneo1025: {''')
rep('''  rows: [
    { cells: ["Ateneo del Dato para elDiario.es (25-10-2026)"''', '''  rows: [
    { cells: ["Sigma Dos para El Mundo (26-10-2026)", "8 al 22 de octubre", "3.122, teléfono (CATI) e internet (CAWI)", "30,6 %", "26,1 %", "19,9 %"], source: S.sigma1026 },
    { cells: ["NC Report para La Razón (26-10-2026)", "22 al 24 de octubre", "1.000 entrevistas", "32,9 %", "25,8 %", "19 %"], source: S.ncreport1026 },
    { cells: ["Winston para Artículo14 (26-10-2026)", "21 al 23 de octubre", "1.200 entrevistas", "29,4 %", "27,1 %", "19,2 %"], source: S.winston1026 },
    { cells: ["SocioMétrica para El Español (25-10-2026)", "Seguimiento acumulado desde el 1 de septiembre", "3.223, panel por internet (CAWI)", "32,4 % (con UPN)", "27 %", "18,6 %"], source: S.socio1025 },
    { cells: ["Ateneo del Dato para elDiario.es (25-10-2026)"''')
rep('caption: "Rango de las once encuestas privadas de octubre de 2026 (barra) y barómetro del CIS de octubre (marca).",', 'caption: "Rango de las diecisiete encuestas privadas de octubre de 2026 (barra) y barómetro del CIS de octubre (marca).",')
rep('{ label: "PP", min: 28.7, max: 34.1, marker: 22.2', '{ label: "PP", min: 28.5, max: 34.1, marker: 22.2')
rep('{ label: "Vox", min: 18.2, max: 19.6, marker: 17.1', '{ label: "Vox", min: 18.2, max: 20, marker: 17.1')
rep('''    reviewedAt: "2026-10-24",
    path: "/elecciones/encuestas-29n",''', '''    reviewedAt: "2026-10-27",
    path: "/elecciones/encuestas-29n",''')
rep('"Las trece encuestas privadas publicadas en octubre de 2026 que recogemos (dos de Sigma Dos y dos de IMOP; la última, de Ateneo del Dato, el 25 de octubre) ponen primero al PP',
    '"Las diecisiete encuestas privadas publicadas en octubre de 2026 que recogemos (tres de Sigma Dos y dos de IMOP, SocioMétrica y NC Report; las últimas, de Sigma Dos, NC Report y Winston, el 26 de octubre) ponen primero al PP')
rep('sources: [S.ateneo1025, S.imop1023,', 'sources: [S.sigma1026, S.ncreport1026, S.winston1026, S.socio1025, S.ateneo1025, S.imop1023,')
rep('a: "En las privadas de octubre de 2026, el PP: Ateneo del Dato 31,1 % (25-10), Sigma Dos 31,5 % (19-10) y 31,9 % (11-10), GAD3 31,4 %, GESOP 28,7 %, IMOP 28,5 % (23-10) y 30 % (9-10), SocioMétrica 32,6 %, Target Point 32 %, Hamalgama 33,4 %, NC Report 34,1 %, 40dB 31,9 % y DYM 34 %.',
    'a: "En las privadas de octubre de 2026, el PP: Sigma Dos 30,6 % (26-10), 31,5 % (19-10) y 31,9 % (11-10), NC Report 32,9 % (26-10) y 34,1 % (8-10), Winston 29,4 % (26-10), SocioMétrica 32,4 % (25-10, con UPN) y 32,6 % (11-10), Ateneo del Dato 31,1 % (25-10), GAD3 31,4 %, GESOP 28,7 %, IMOP 28,5 % (23-10) y 30 % (9-10), Target Point 32 %, Hamalgama 33,4 %, 40dB 31,9 % y DYM 34 %.')
rep('y la de Ateneo del Dato del 25 de octubre, entre 183 y 211 (119–134 el PP y 64–77 Vox).',
    'la de Ateneo del Dato del 25 de octubre, entre 183 y 211 (119–134 el PP y 64–77 Vox); la de SocioMétrica del 25 de octubre, 200 (135 el PP, 2 UPN y 63 Vox); la de Sigma Dos del 26 de octubre, entre 191 y 200 (125–131 y 66–69); la de NC Report del 26 de octubre, entre 205 y 209 (141–143 y 64–66), y la de Winston del 26 de octubre, 190 (121 y 69).')
rep('"Vox es tercero en todas, con un rango estrecho: del 17,1 % (CIS) al 19,6 % (Hamalgama).",', '"Vox es tercero en todas, con un rango estrecho: del 17,1 % (CIS) al 20 % (IMOP, 23-10).",')
rep('Sin el CIS, el rango es 28,7–34,1 % (de GESOP a NC Report).",', 'Sin el CIS, el rango es 28,5–34,1 % (de IMOP del 23-10 a NC Report del 8-10).",')
rep('La más corta entre las privadas es la de GESOP: 2,6 puntos.",', 'La más corta entre las privadas es la de IMOP del 23 de octubre: 1,4 puntos (Winston, 26-10: 2,3).",')
p.write_text(s); print("ok")
