"""23-10-2026 · agenda-mitines-29n y podcasts-entrevistas-candidatos-29n (idempotente; sanchez-la-revuelta-29n no se toca salvo constantes compartidas).
Fuentes: Europa Press 21-10 (Feijóo Salamanca), Europa Press 20-10 (Sánchez Granada), Cadena SER 20-10 (Sánchez Gijón), voxespana.es/proximos-actos (23-10),
Europa Press / laSexta 21-22-10 (debates), Marca 22-10 (Jordi Wild), El Plural 22-10 (Sánchez en La Revuelta sobre Wild y El Hormiguero), El Periódico 23-10 (Colau en TVE)."""
import pathlib
P = pathlib.Path(__file__).resolve().parent.parent / "src/lib/tramites/agenda-29n.ts"
s = P.read_text()
if 'const FEIJOO_SALAMANCA' in s:
    print("ya aplicado"); raise SystemExit
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:80]); s = s.replace(a, b)
rep('const UPD = "22 de octubre de 2026, 23:30 (hora peninsular)";', 'const UPD = "23 de octubre de 2026, 9:00 (hora peninsular)";')
rep('const DEBATES_EE = { href: EC.href, label: "El Confidencial, 22-10-2026: propuestas de debates de PSOE y PP" };',
    'const DEBATES_EE = { href: "https://www.europapress.es/nacional/noticia-sanchez-acepta-cara-cara-feijoo-quiere-debate-cuatro-26-noviembre-sea-tve-20261022175207.html", label: "Europa Press, 22-10-2026: el PSOE acepta el cara a cara del 16-N y pide el debate a cuatro en TVE; el PP lo rechaza" };')
rep('const LASEXTA = { href: EC.href, label: "El Confidencial, 22-10-2026: laSexta, debates del 2 y 9 de noviembre" };',
    'const LASEXTA = { href: "https://www.europapress.es/sociedad/noticia-lasexta-emitira-dos-debates-ana-pastor-portavoces-psoe-pp-vox-frente-amplio-noviembre-20261021145644.html", label: "Europa Press, 21-10-2026: laSexta, debates del 2 y 9 de noviembre" };\n'
    'const FEIJOO_SALAMANCA = { href: "https://www.europapress.es/castilla-y-leon/noticia-feijoo-visitara-salamanca-domingo-participar-acto-pp-caem-20261021183139.html", label: "Europa Press, 21-10-2026: Feijóo, acto en Salamanca el domingo 25" };\n'
    'const SANCHEZ_GRANADA = { href: "https://www.europapress.es/andalucia/noticia-pedro-sanchez-participa-sabado-granada-acto-precampana-generales-20261020150449.html", label: "Europa Press, 20-10-2026: Sánchez, acto en Granada el sábado 24" };\n'
    'const SANCHEZ_GIJON = { href: "https://cadenaser.com/asturias/2026/10/20/pedro-sanchez-dara-un-mitin-en-gijon-el-proximo-lunes-en-la-precampana-de-las-elecciones-generales-ser-gijon/", label: "Cadena SER, 20-10-2026: Sánchez, mitin en Gijón el lunes 26" };\n'
    'const WILD_MARCA = { href: "https://www.marca.com/tiramillas/sociedad/2026/10/22/jordi-wild-sigo-noticias-pedro-sanchez-manana-ultimo-dia2.html", label: "Marca, 22-10-2026: Jordi Wild, sin respuesta de Sánchez y publicación el 13 de noviembre" };\n'
    'const SANCHEZ_WILD_HORM = { href: "https://www.elplural.com/extratele/pedro-sanchez-visitara-jordi-wild-el-hormiguero-anecdota-pablo-motos-gracia_802166102", label: "El Plural, 22-10-2026: qué dijo Sánchez en La Revuelta sobre Jordi Wild y El Hormiguero" };\n'
    'const COLAU_TVE = { href: "https://www.elperiodico.com/es/politica/20261023/colau-lanza-turne-televisiva-recuperar-135643168", label: "El Periódico, 23-10-2026: Colau, entrevistada en el programa de Manu Sánchez en TVE" };')
# agenda
rep('    reviewedAt: "2026-10-22",\n    disclaimer: "",\n    path: "/elecciones/agenda-mitines-29n",', '    reviewedAt: "2026-10-23",\n    disclaimer: "",\n    path: "/elecciones/agenda-mitines-29n",')
rep('sources: [FEIJOO_VIGO, SANCHEZ_VITORIA, VOX_ACTOS, DEBATES_EE, LASEXTA],', 'sources: [FEIJOO_VIGO, FEIJOO_SALAMANCA, SANCHEZ_GRANADA, SANCHEZ_GIJON, SANCHEZ_VITORIA, VOX_ACTOS, DEBATES_EE, LASEXTA],')
rep('''            { cells: ["PSOE · Pedro Sánchez", "Jueves 29 de octubre, 18:30", "Vitoria-Gasteiz (Álava)", "Palacio Europa"], source: SANCHEZ_VITORIA },''',
'''            { cells: ["PP · Alberto Núñez Feijóo", "Domingo 25 de octubre, 12:00", "Salamanca", "Centro de Artes Escénicas y de la Música (CAEM)"], source: FEIJOO_SALAMANCA },
            { cells: ["PSOE · Pedro Sánchez", "Sábado 24 de octubre (hora no confirmada por Europa Press)", "Granada", "Palacio de Exposiciones y Congresos"], source: SANCHEZ_GRANADA },
            { cells: ["PSOE · Pedro Sánchez", "Lunes 26 de octubre, 18:00", "Gijón (Asturias)", "Pabellón central de la Feria de Muestras de Asturias"], source: SANCHEZ_GIJON },
            { cells: ["PSOE · Pedro Sánchez", "Jueves 29 de octubre, 18:30", "Vitoria-Gasteiz (Álava)", "Palacio Europa"], source: SANCHEZ_VITORIA },''')
rep('"El PSOE ha aceptado un cara a cara entre Pedro Sánchez y Alberto Núñez Feijóo el lunes 16 de noviembre en una cadena privada, fecha que el PP había aceptado antes. Sobre el debate a cuatro del jueves 26 de noviembre no hay acuerdo de cadena: el PSOE lo quiere en RTVE y el PP en una privada.",',
    '"El PSOE ha aceptado un cara a cara entre Pedro Sánchez y Alberto Núñez Feijóo el lunes 16 de noviembre en una cadena privada, fecha que el PP había aceptado antes en Mediaset. Sobre el debate a cuatro del jueves 26 de noviembre no hay acuerdo de cadena: el PSOE acepta el de RTVE y el PP responde que «no habrá debate a cuatro en RTVE» y lo quiere en Atresmedia. RTVE propone además uno de portavoces el lunes 23.",')
# entrevistas
rep('    reviewedAt: "2026-10-22",\n    disclaimer: "",\n    path: "/elecciones/podcasts-entrevistas-candidatos-29n",', '    reviewedAt: "2026-10-23",\n    disclaimer: "",\n    path: "/elecciones/podcasts-entrevistas-candidatos-29n",')
rep('lead: `Respuesta corta: Pedro Sánchez fue a La Revuelta el 22 de octubre. Feijóo, Abascal y Colau aceptaron ir al pódcast The Wild Project de Jordi Wild, sin fecha publicada; Ada Colau también aceptó ir a La Revuelta, sin fecha.',
    'lead: `Respuesta corta: Pedro Sánchez fue a La Revuelta el 22 de octubre. Feijóo, Abascal y Colau aceptaron ir al pódcast The Wild Project de Jordi Wild, que publicará todas las entrevistas el 13 de noviembre, primer día de campaña; Sánchez no había respondido a Wild el 22 de octubre («Eso ya lo responderé», dijo en La Revuelta). Ada Colau también aceptó ir a La Revuelta, sin fecha.')
rep('sources: [WILD, REVUELTA_INV, COLAU_REVUELTA, RTVE_ANUNCIO],', 'sources: [WILD, WILD_MARCA, SANCHEZ_WILD_HORM, REVUELTA_INV, COLAU_REVUELTA, COLAU_TVE, RTVE_ANUNCIO],')
rep('{ q: "¿Cuándo son las entrevistas de Jordi Wild?", a: "Jordi Wild planteó una «semana especial de elecciones». Feijóo, Abascal y Colau han aceptado; Sánchez no había respondido el 20 de octubre y el plazo que dio Wild acaba el viernes 23. No se han publicado fechas." },',
    '{ q: "¿Cuándo son las entrevistas de Jordi Wild?", a: "Según Marca (22 de octubre), Jordi Wild publicará todas las entrevistas el viernes 13 de noviembre, primer día de campaña, con una hora de diferencia y de menos a más escaños. Feijóo, Abascal y Colau han aceptado. Sánchez no había respondido el 22 de octubre y el plazo que dio Wild acababa el viernes 23." },')
rep('{ q: "¿Va a ir Sánchez a El Hormiguero?", a: "Pablo Motos dijo que Sánchez está invitado para la campaña del 29-N. No hay confirmación publicada." },',
    '{ q: "¿Va a ir Sánchez a El Hormiguero?", a: "Pablo Motos dijo que Sánchez está invitado para la campaña del 29-N. En La Revuelta, según El Plural, Sánchez dijo que irá «a El Hormiguero y donde haga falta». No hay fecha publicada." },')
rep('{ cells: ["PP · Alberto Núñez Feijóo", "The Wild Project (pódcast de Jordi Wild)", "Aceptada", "Sin fecha publicada"], source: WILD },',
    '{ cells: ["PP · Alberto Núñez Feijóo", "The Wild Project (pódcast de Jordi Wild)", "Aceptada", "Publicación prevista el 13 de noviembre"], source: WILD_MARCA },')
rep('{ cells: ["PSOE · Pedro Sánchez", "The Wild Project", "Sin respuesta a 20 de octubre", "—"], source: WILD },',
    '{ cells: ["PSOE · Pedro Sánchez", "The Wild Project", "Sin respuesta a 22 de octubre (plazo: 23 de octubre)", "—"], source: WILD_MARCA },')
rep('{ cells: ["PSOE · Pedro Sánchez", "El Hormiguero (Antena 3)", "Invitado por el programa, sin confirmar", "—"], source: REVUELTA_INV },',
    '{ cells: ["PSOE · Pedro Sánchez", "El Hormiguero (Antena 3)", "Dice que irá; sin fecha", "—"], source: SANCHEZ_WILD_HORM },')
rep('{ cells: ["Vox · Santiago Abascal", "The Wild Project", "Aceptada", "Sin fecha publicada"], source: WILD },',
    '{ cells: ["Vox · Santiago Abascal", "The Wild Project", "Aceptada", "Publicación prevista el 13 de noviembre"], source: WILD_MARCA },')
rep('{ cells: ["Frente Amplio · Ada Colau", "The Wild Project", "Aceptada", "Sin fecha publicada"], source: WILD },',
    '{ cells: ["Frente Amplio · Ada Colau", "The Wild Project", "Aceptada", "Publicación prevista el 13 de noviembre"], source: WILD_MARCA },\n'
    '            { cells: ["Frente Amplio · Ada Colau", "Programa de Manu Sánchez en TVE («El Perro Andaluz», grabado en Bilbao)", "Entrevistada", "22 de octubre"], source: COLAU_TVE },')
rep('"Jordi Wild planteó al principio que acudieran todos o ninguno; según Europa Press, ha dado de plazo hasta el viernes 23 de octubre para cerrar las participaciones.",',
    '"Jordi Wild planteó al principio que acudieran todos o ninguno; según Europa Press, dio de plazo hasta el viernes 23 de octubre para cerrar las participaciones. Según Marca, publicará las entrevistas el 13 de noviembre y ha rechazado otras peticiones de partidos (Podemos, ERC, Junts y SALF).",')
P.write_text(s); print("ok agenda 23-10")
