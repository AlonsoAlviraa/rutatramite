import type { Guide } from "@/lib/tramites/types";

const BOE2023 = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-18907", label: "BOE: resultados oficiales de las generales del 23 de julio de 2023 (Junta Electoral Central)" };
const L162 = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#acientosesentaydos", label: "BOE: LOREG, artículo 162 (350 diputados, mínimo de 2 por provincia)" };
const L163 = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#acientosesentaytres", label: "BOE: LOREG, artículo 163 (barrera del 3 % y regla D'Hondt)" };
const RD806 = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742", label: "BOE: Real Decreto 806/2026, convocatoria del 29-N (diputados por circunscripción)" };
const RD1117 = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-25362", label: "BOE: Real Decreto 1117/2025, población oficial a 1-1-2025" };

const ESTUDIO = { href: "/elecciones/cuanto-vale-tu-voto-por-provincia-29n", label: "Estudio: cuánto vale tu voto en cada provincia" };
const DHONDT = { href: "/elecciones/como-se-reparten-los-escanos", label: "Cómo se reparten los escaños del Congreso" };
const PROV = { href: "/elecciones/diputados-por-provincia-29n", label: "Diputados por provincia el 29-N" };
const BARRERA = { href: "/elecciones/barrera-del-3-por-ciento-y-voto-util", label: "La barrera del 3 %, con el cálculo de Madrid" };
const NULO = { href: "/elecciones/voto-nulo-y-voto-en-blanco", label: "Voto nulo y voto en blanco: diferencias" };
const AGENDA = { href: "/elecciones/agenda-mitines-29n", label: "Agenda de mítines del 29-N" };

export const VOTO_UTIL_GUIDES: Guide[] = [
  {
    id: "29n-voto-util",
    pack: "elecciones",
    reviewedAt: "2026-10-23",
    disclaimer: "",
    path: "/elecciones/voto-util-29n",
    h1: "Voto útil el 29-N: qué es, cómo afecta a derecha e izquierda y por qué tu provincia importa",
    title: "Voto útil: qué es y por qué tu provincia importa (29-N)",
    description: "Qué es el voto útil, por qué existe (D'Hondt y provincias), cómo afectó en 2023 a PP, PSOE, Vox y Sumar con datos del BOE y por qué un voto en Soria pesa más que en Madrid.",
    lead: "Respuesta corta: se llama «voto útil» a votar a una candidatura con opciones de escaño en tu provincia en lugar de a tu primera preferencia. Existe porque el Congreso se elige en 52 circunscripciones con la regla D'Hondt: en una provincia de 2 o 3 escaños, una lista con el 15 % o el 20 % de los votos puede quedarse sin nada. En 2023, según el BOE, Vox no logró escaño en 27 provincias y Sumar en 33; entre ambos sumaron 1.098.038 votos que no se convirtieron en diputados. El efecto es el mismo para la derecha y para la izquierda: depende de si su voto se concentra en un partido o se reparte entre varios. Aquí no recomendamos a quién votar; explicamos cómo funciona.",
    cta: ESTUDIO,
    secondaryCta: BOE2023,
    sources: [BOE2023, L162, L163, RD806, RD1117],
    related: [ESTUDIO, DHONDT, PROV, BARRERA, NULO, AGENDA, { href: "/elecciones", label: "Elecciones generales del 29-N" }],
    faqs: [
      { q: "¿Qué es el voto útil?", a: "Votar a una candidatura con opciones reales de escaño en tu provincia en lugar de a tu primera preferencia. Es una decisión personal: la ley no lo menciona y cada voto cuenta igual en el recuento." },
      { q: "¿Por qué existe el voto útil en España?", a: "Porque los 350 diputados se reparten en 52 circunscripciones (artículo 162 de la LOREG) con la regla D'Hondt y una barrera del 3 % en cada una (artículo 163). En las provincias que eligen pocos diputados hace falta un porcentaje alto para lograr uno." },
      { q: "¿El voto útil afecta más a la derecha o a la izquierda?", a: "A ninguna por sí mismo. Afecta al bloque cuyo voto está más repartido entre varios partidos en cada provincia. En 2023 (BOE), Vox se quedó sin escaño en 27 provincias con 492.991 votos y Sumar en 33 provincias con 605.047 votos; PP y PSOE apenas perdieron votos así." },
      { q: "¿Cuántos votos costó un escaño en 2023?", a: "Dividiendo votos entre escaños según el BOE: PP 59.568, PSOE (con PSC) 64.642, Vox 92.636 y Sumar 98.226 votos por diputado." },
      { q: "¿Por qué mi voto vale más en Soria que en Madrid?", a: "Cada provincia tiene 2 diputados de partida y el resto se reparte por población. El 29-N, un diputado de Soria representa a 45.117 habitantes y uno de Madrid a 187.817 (Real Decreto 806/2026 y población oficial del Real Decreto 1117/2025)." },
      { q: "¿Se pierde mi voto si voto a un partido pequeño?", a: "No da escaño si la lista no llega en tu provincia, pero cuenta en los resultados oficiales y para las subvenciones electorales, que dependen de votos y escaños." },
    ],
    sections: [
      {
        id: "que-es",
        title: "Qué es el voto útil",
        paragraphs: [
          "Es una forma de decidir el voto: elegir, entre las candidaturas que te parecen aceptables, la que tiene más opciones de sacar escaño en tu provincia. No es un concepto legal; la ley solo fija cómo se cuentan los votos.",
          "Tiene sentido hablar de él porque en España no hay una única lista nacional. Votas a una lista de tu provincia, y los escaños de cada provincia se reparten solo con los votos emitidos allí.",
        ],
      },
      {
        id: "por-que-existe",
        title: "Por qué existe: provincias y regla D'Hondt",
        paragraphs: [
          "El artículo 162 de la LOREG fija 350 diputados, da 2 de partida a cada provincia y 1 a Ceuta y otro a Melilla, y reparte el resto según la población. El artículo 163 dice cómo se asignan en cada circunscripción: quedan fuera las listas con menos del 3 % de los votos válidos (que incluyen el blanco) y, entre las demás, se dividen sus votos entre 1, 2, 3… hasta el número de escaños. Los cocientes más altos se llevan los escaños.",
          "La consecuencia es que la barrera real depende del tamaño de la provincia. En Madrid basta con algo más del 3 %. En una provincia de 2 o 3 escaños hace falta mucho más, porque hay que superar el segundo o tercer cociente de las listas más votadas.",
        ],
      },
      {
        id: "ejemplo",
        title: "Ejemplo con datos reales de 2023: Soria, Teruel y Madrid",
        paragraphs: [
          "Soria (2 escaños): PP 18.895 votos, PSOE 14.966, Soria ¡Ya! 9.697, Vox 4.978 y Sumar 1.711. El primer escaño fue para el PP; el segundo para el PSOE, porque sus 14.966 votos superaban la mitad de los del PP (9.447,5). Soria ¡Ya!, con 9.697 votos, quedó sin escaño. Con estas cifras, un escaño exigió casi 15.000 votos en una provincia con unos 50.000 votos a candidaturas.",
          "Teruel (3 escaños): PP 26.586, PSOE 22.226, Coalición Existe 11.348, Vox 9.932 y Sumar 4.126. El PP logró 2 escaños y el PSOE 1. El último escaño se dio con un cociente de 13.293 (la mitad de los votos del PP). Existe, Vox y Sumar quedaron por debajo y no obtuvieron ninguno.",
          "Madrid (37 escaños en 2023): PP 1.463.183, PSOE 1.004.599, Sumar 557.780 y Vox 506.164. Reparto: PP 16, PSOE 10, Sumar 6 y Vox 5. El último escaño (el 16.º del PP) se asignó con un cociente de unos 91.449 votos; el siguiente cociente, el del PSOE, era de unos 91.327. PACMA, con 21.742 votos, no llegó al 3 %.",
          "Con D'Hondt, una lista con más votos que el último cociente entra; una lista con menos, no, aunque tenga muchos votos. En Madrid, 506.164 votos dieron 5 escaños; en Teruel, 9.932 votos no dieron ninguno.",
        ],
        table: {
          caption: "Resultados oficiales de 2023 en tres circunscripciones (votos y escaños)",
          head: ["Provincia", "Escaños", "PP", "PSOE", "Vox", "Sumar", "Último cociente que dio escaño"],
          rows: [
            { cells: ["Soria", "2", "18.895 (1)", "14.966 (1)", "4.978 (0)", "1.711 (0)", "14.966"], source: BOE2023 },
            { cells: ["Teruel", "3", "26.586 (2)", "22.226 (1)", "9.932 (0)", "4.126 (0)", "13.293"], source: BOE2023 },
            { cells: ["Madrid", "37", "1.463.183 (16)", "1.004.599 (10)", "506.164 (5)", "557.780 (6)", "≈91.449"], source: BOE2023 },
          ],
        },
      },
      {
        id: "derecha-izquierda",
        title: "Derecha e izquierda: el mismo mecanismo",
        paragraphs: [
          "El efecto no favorece a un bloque por su ideología, sino por cómo se distribuye su voto. Cuando un bloque concentra su voto en un partido, ese partido convierte mejor los votos en escaños. Cuando lo reparte entre dos o más, el partido con menos votos de cada provincia pequeña suele quedarse fuera.",
          "En 2023 se vio por igual en los dos lados. Los dos partidos más votados (PP y PSOE) casi no tuvieron votos sin escaño. Los dos siguientes (Vox y Sumar) se quedaron sin diputado en muchas provincias y necesitaron bastantes más votos por escaño.",
        ],
        table: {
          caption: "Generales 2023: votos, escaños y votos en provincias donde el partido no logró escaño (ordenado por votos)",
          head: ["Partido", "Votos", "Escaños", "Votos por escaño", "Provincias sin escaño", "Votos en esas provincias"],
          rows: [
            { cells: ["PP", "8.160.837", "137", "59.568", "3", "87.761 (1,1 %)"], source: BOE2023 },
            { cells: ["PSOE (incluye PSC)", "7.821.718", "121", "64.642", "2", "18.275 (0,2 %)"], source: BOE2023 },
            { cells: ["Vox", "3.057.000", "33", "92.636", "27", "492.991 (16,1 %)"], source: BOE2023 },
            { cells: ["Sumar", "3.044.996", "31", "98.226", "33", "605.047 (19,9 %)"], source: BOE2023 },
          ],
        },
        lists: [[
          "Votos por escaño = votos totales ÷ escaños obtenidos. Es una media nacional, no lo que costó cada escaño concreto.",
          "«Provincias sin escaño»: circunscripciones donde el partido presentó lista, obtuvo votos y ningún diputado. En Cataluña, PSOE y PSC figuran en el BOE como candidaturas distintas; aquí se suman.",
          "Hay más partidos con escaño (ERC, Junts, EH Bildu, PNV, BNG, CCa, UPN). No se incluyen porque solo se presentan en algunas comunidades.",
        ]],
      },
      {
        id: "sumar-votos",
        title: "¿Sumar los votos de dos partidos cambia el resultado? Depende de la provincia",
        paragraphs: [
          "Es una cuenta aritmética, no una predicción: los votantes no se suman de forma automática.",
          "Soria, bloque PP + Vox: 18.895 + 4.978 = 23.873 votos. Para un segundo escaño, la mitad (11.936,5) tendría que superar los 14.966 del PSOE. No llega: el reparto sería el mismo.",
          "Teruel, bloque PSOE + Sumar: 22.226 + 4.126 = 26.352 votos. Para un segundo escaño, la mitad (13.176) tendría que superar el cociente 13.293 del PP. No llega por 117 votos de cociente: el reparto también sería el mismo.",
          "En otras provincias la suma sí puede mover un escaño en uno u otro sentido. Por eso los cálculos de voto útil solo tienen sentido provincia a provincia y con datos oficiales.",
        ],
      },
      {
        id: "zonas",
        title: "Por qué en algunas zonas el voto vale más",
        paragraphs: [
          "El artículo 162 de la LOREG da 2 diputados de partida a cada provincia y 1 a Ceuta y a Melilla. Solo los 248 restantes se reparten según la población. Por eso las provincias con menos habitantes tienen más diputados en proporción.",
          "Para el 29-N, el Real Decreto 806/2026 asigna 2 diputados a Soria y 38 a Madrid. Con la población oficial del Real Decreto 1117/2025, un diputado de Soria representa a 45.117 habitantes y uno de Madrid a 187.817: el voto de Soria pesa unas 4,2 veces más en habitantes por diputado. Ceuta (83.595 habitantes) y Melilla (86.780) eligen 1 diputado cada una.",
          "Hay dos efectos que se suman. Uno es el peso: menos habitantes por diputado. El otro es la barrera: con pocos escaños, solo las listas más votadas obtienen representación. Por eso en las provincias pequeñas se habla más de voto útil, y en Madrid o Barcelona menos.",
          "El ranking de las 52 circunscripciones, con un CSV descargable, está en nuestro estudio «¿Cuánto vale tu voto en cada provincia el 29-N?».",
        ],
        table: {
          caption: "Peso del voto el 29-N en cuatro circunscripciones",
          head: ["Circunscripción", "Diputados 29-N", "Población oficial 1-1-2025", "Habitantes por diputado"],
          rows: [
            { cells: ["Soria", "2", "90.234", "45.117"], source: RD806 },
            { cells: ["Ceuta", "1", "83.595", "83.595"], source: RD806 },
            { cells: ["Melilla", "1", "86.780", "86.780"], source: RD806 },
            { cells: ["Madrid", "38", "7.137.031", "187.817"], source: RD1117 },
          ],
        },
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: [],
        lists: [[
          "Mira cuántos diputados elige tu provincia en «Diputados por provincia el 29-N».",
          "Si tu provincia elige 2 a 5 diputados, solo las listas más votadas suelen lograr escaño. Si elige más de 10, listas con menos votos también pueden entrar.",
          "El voto en blanco cuenta como válido y sube un poco la barrera del 3 %; el nulo no cuenta para el reparto.",
          "Las encuestas cambian; los escaños del 29-N solo se conocerán con el escrutinio oficial.",
        ]],
      },
      {
        id: "como-revisamos",
        title: "Cómo revisamos esta página",
        paragraphs: [
          "Por Equipo RutaTrámite. Todas las cifras de 2023 salen de los resultados oficiales publicados en el BOE (BOE-A-2023-18907). Hemos aplicado la regla D'Hondt con la barrera del 3 % a los votos de Soria, Teruel, Madrid, Ceuta y Melilla y sale el mismo reparto que publica el BOE. Los votos sin escaño se calculan sumando los votos de cada partido en las provincias donde obtuvo 0 diputados.",
          "Los datos del 29-N salen del Real Decreto 806/2026 (diputados) y del Real Decreto 1117/2025 (población). Los partidos aparecen ordenados por votos de 2023. No recomendamos ningún voto. Si ves un error, escríbenos desde la página de contacto y lo corregimos.",
        ],
      },
    ],
  },
];
