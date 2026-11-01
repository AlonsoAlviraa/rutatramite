"""Rutina 27-10: agenda (quitar actos del 26-10, añadir Feijóo A Coruña 31-10) y formato Wild Project."""
from pathlib import Path
p = Path(__file__).resolve().parents[1] / "src/lib/tramites/agenda-29n.ts"
s = p.read_text()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (a[:90], s.count(a)); s = s.replace(a, b)
rep('const UPD = "26 de octubre de 2026, 08:30 (hora peninsular)";', 'const UPD = "27 de octubre de 2026, 09:30 (hora peninsular)";')
rep('const SANCHEZ_GIJON =', '''const FEIJOO_CORUNA = { href: "https://www.laopinioncoruna.es/coruna/2026/10/26/feijoo-protagonizara-sabado-acto-precampana-135760718.html", label: "La Opinión A Coruña, 26-10-2026: acto de Feijóo en ExpoCoruña el sábado 31" };
const FEIJOO_CORUNA_ABC = { href: "https://www.abc.es/espana/galicia/feijoo-vuelve-galicia-segundo-fin-semana-consecutivo-20261026122251-nt.html", label: "ABC, 26-10-2026: Feijóo vuelve a Galicia el sábado 31" };
const WILD_FORMATO_EC = { href: "https://www.elconfidencial.com/espana/2026-10-26/jordi-wild-pedro-sanchez-colau-feijoo-1qrt_4452950/", label: "El Confidencial, 26-10-2026: condiciones de las entrevistas de Jordi Wild" };
const WILD_FORMATO_ABC = { href: "https://www.abc.es/espana/entrevistas-jordi-wild-sanchez-feijoo-abascal-colau-20261026104234-nt.html", label: "ABC, 26-10-2026: así serán las entrevistas de The Wild Project" };
const SANCHEZ_GIJON =''')
rep('''    reviewedAt: "2026-10-26",
    disclaimer: "",
    path: "/elecciones/agenda-mitines-29n",''', '''    reviewedAt: "2026-10-27",
    disclaimer: "",
    path: "/elecciones/agenda-mitines-29n",''')
rep('sources: [FEIJOO_VALENCIA, FEIJOO_VALENCIA_VP, SANCHEZ_GIJON, SANCHEZ_VITORIA,', 'sources: [FEIJOO_CORUNA, FEIJOO_CORUNA_ABC, FEIJOO_VALENCIA, FEIJOO_VALENCIA_VP, SANCHEZ_VITORIA,')
rep('''            { cells: ["PP · Alberto Núñez Feijóo", "Domingo 22 de noviembre (hora no publicada)", "Valencia", "Plaza de Toros"], source: FEIJOO_VALENCIA },
            { cells: ["PSOE · Pedro Sánchez", "Lunes 26 de octubre, 18:00", "Gijón (Asturias)", "Pabellón central del recinto ferial Luis Adaro (Feria de Muestras)"], source: SANCHEZ_GIJON },
''', '''            { cells: ["PP · Alberto Núñez Feijóo", "Sábado 31 de octubre, 12:00", "A Coruña", "ExpoCoruña (entrada libre)"], source: FEIJOO_CORUNA },
            { cells: ["PP · Alberto Núñez Feijóo", "Domingo 22 de noviembre (hora no publicada)", "Valencia", "Plaza de Toros"], source: FEIJOO_VALENCIA },
''')
rep('''            { cells: ["Vox · Santiago Abascal", "Lunes 26 de octubre (hora no publicada)", "Talavera de la Reina (Toledo)", "Presentación de candidatos (lugar no publicado)"], source: VOX_ACTOS },
''', '')
# Entrevistas
rep('''    reviewedAt: "2026-10-24",
    disclaimer: "",
    path: "/elecciones/podcasts-entrevistas-candidatos-29n",''', '''    reviewedAt: "2026-10-27",
    disclaimer: "",
    path: "/elecciones/podcasts-entrevistas-candidatos-29n",''')
rep('sources: [WILD_TWEET, WILD_JORDI_44, WILD_JORDI_PLAN,', 'sources: [WILD_TWEET, WILD_JORDI_44, WILD_JORDI_PLAN, WILD_FORMATO_EC, WILD_FORMATO_ABC,')
rep('''      ...WILD_FAQS,
''', '''      ...WILD_FAQS,
      { q: "¿Cuánto durarán las entrevistas de Jordi Wild a los candidatos?", a: "Entre 60 y 90 minutos cada una, según escribió Jordi Wild en X («Las charlas serán mucho más cortas que mi formato habitual: 60-90 minutos»), recogido por El Confidencial y ABC el 26 de octubre. Serán individuales: ha descartado un debate a cuatro." },
''')
rep('''          "En la tabla de abajo están las entrevistas y pódcast de todos los candidatos, con su fuente.",''', '''          "Formato anunciado por Jordi Wild en X (recogido por El Confidencial y ABC el 26 de octubre): cuatro entrevistas individuales de 60 a 90 minutos, sin debate a cuatro («Descarto el gran debate a cuatro»), y dos periodistas verificadores en el plató («No están a mi favor, sino a favor de lo veraz»). Según ABC, los equipos de campaña no conocerán antes las preguntas y las entrevistas se publicarán íntegras, sin recortes.",
          "En la tabla de abajo están las entrevistas y pódcast de todos los candidatos, con su fuente.",''')
p.write_text(s); print("ok")
