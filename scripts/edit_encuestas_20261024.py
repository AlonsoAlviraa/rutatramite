"""24-10-2026 · IMOP Insights para El Confidencial, segunda oleada (publicada el 23-10, campo 13–16 oct, 1.000 entrevistas CATI/CAWI 45/55,
±3,3; PP 28,5 % y 123 escaños con UPN, PSOE 27,1 % y 113, Vox 20 % y 72). Sin medias propias en /elecciones/encuestas-29n.
El mapa de voto útil (escenario 2026, una encuesta por empresa, la más reciente) se regenera con scripts/mapa-voto-util/compute.py."""
import pathlib
F = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/encuestas-29n.ts"
s = F.read_text()
def rep(a, b):
    global s
    if b in s: return
    assert a in s, a[:90]; s = s.replace(a, b, 1)
rep('  imop1009: {', '  imop1023: { href: "https://www.elconfidencial.com/espana/2026-10-23/encuesta-imop-elecciones-29n-bloque-psoe-frente-amplio_4450302/", label: "El Confidencial, 23 de octubre de 2026: encuesta de IMOP Insights (segunda oleada) y ficha técnica" },\n  imop1009: {')
rep('  rows: [\n    { cells: ["Sigma Dos para El Mundo (19-10-2026)"',
    '  rows: [\n    { cells: ["IMOP Insights para El Confidencial (23-10-2026)", "13 al 16 de octubre", "1.000, teléfono (CATI) e internet (CAWI)", "28,5 %", "27,1 %", "20 %"], source: S.imop1023 },\n    { cells: ["Sigma Dos para El Mundo (19-10-2026)"')
rep('"Las once encuestas privadas publicadas en octubre de 2026 que recogemos (dos de ellas de Sigma Dos, la última el 19 de octubre) ponen primero al PP, entre el 28,7 % y el 34,1 %, y el barómetro del CIS pone primero al PSOE (34 %). Vox aparece tercero en todas, entre el 17,1 % y el 19,6 %.',
    '"Las doce encuestas privadas publicadas en octubre de 2026 que recogemos (dos de Sigma Dos y dos de IMOP, la última el 23 de octubre) ponen primero al PP, entre el 28,5 % y el 34,1 %, y el barómetro del CIS pone primero al PSOE (34 %). Vox aparece tercero en todas, entre el 17,1 % y el 20 %.')
rep('GESOP 28,7 %, IMOP 30 %,', 'GESOP 28,7 %, IMOP 28,5 % (23-10) y 30 % (9-10),')
rep('y la de SocioMétrica del 11 de octubre, 205 (141 y 64).', 'la de SocioMétrica del 11 de octubre, 205 (141 y 64), y la de IMOP del 23 de octubre, 195 (123 el PP, con UPN, y 72 Vox).')
rep('            { cells: ["IMOP / El Confidencial", "900",',
    '            { cells: ["IMOP / El Confidencial (2.ª oleada)", "1.000", "Teléfono (CATI, 70 % móviles) e internet (CAWI), 45/55", "13 al 16 de octubre", "±3,3"], source: S.imop1023 },\n            { cells: ["IMOP / El Confidencial", "900",')
rep('sources: [S.sigma1019, S.socio1011, S.target1011, S.gesop1012, S.imop1009,', 'sources: [S.imop1023, S.sigma1019, S.socio1011, S.target1011, S.gesop1012, S.imop1009,')
i = s.find('path: "/elecciones/encuestas-29n"'); j = s.rfind('reviewedAt: "', 0, i)
if s[j:j+24] != 'reviewedAt: "2026-10-24"': s = s[:j] + 'reviewedAt: "2026-10-24"' + s[j+24:]
rep('    path: "/elecciones/como-se-hace-una-encuesta-electoral",\n    h1:', '    path: "/elecciones/como-se-hace-una-encuesta-electoral",\n    reviewedAt: "2026-10-24",\n    h1:')
F.write_text(s); print("ok encuestas 24-10 (IMOP 2.ª oleada)")
