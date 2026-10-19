import type { Guide, GuideTable } from "@/lib/tramites/types";

/**
 * Precampaña 29-N (19-10-2026): bloque de encuestas y explicadores.
 * Cada cifra sale de un documento citado (CIS, BOE/JEC, Constitución, LOREG) o de un medio con fecha.
 * No se publica ninguna proyección propia. Neutralidad: mismas reglas para todos los partidos y encuestadoras.
 */
const reviewedAt = "2026-10-19";
const LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672";
const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";

const S = {
  cis3582: { href: "https://www.cis.es/documents/d/guest/3582_estimacion-pdf", label: "CIS: estimación de voto del Barómetro de octubre 2026 (estudio 3582)" },
  cis3582avance: { href: "https://www.cis.es/es/w/avance-de-resultados-del-estudio-3582-bar%C3%B3metro-de-octubre-2026-", label: "CIS: avance de resultados del estudio 3582, octubre 2026" },
  cis3411: { href: "https://www.cis.es/documents/d/cis/3411_Estimacionpdf", label: "CIS: estimación de voto del preelectoral de las generales 2023 (estudio 3411)" },
  cis3411nota: { href: "https://www.cis.es/es/w/nota-informativa-sobre-la-encuesta-preelectoral-elecciones-generales-2023-", label: "CIS, 5 de julio de 2023: nota del preelectoral de las generales 2023" },
  cis3242: { href: "https://www.cis.es/documents/20117/1556851/3242_Estimacionpdf.pdf", label: "CIS: estimación del macrobarómetro preelectoral de marzo 2019 (estudio 3242)" },
  cis3263: { href: "https://www.cis.es/documents/20117/1557011/3263_Estimacion.pdf", label: "CIS: estimación del macrobarómetro preelectoral de octubre 2019 (estudio 3263)" },
  boe2023: { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-18907", label: "BOE: resultados oficiales de las generales del 23 de julio de 2023 (Junta Electoral Central)" },
  boe2019a: { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2019-8070", label: "BOE: resultados oficiales de las generales del 28 de abril de 2019 (Junta Electoral Central)" },
  boe2019n: { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2019-17344", label: "BOE: resultados oficiales de las generales del 10 de noviembre de 2019 (Junta Electoral Central)" },
  infoelectoral: { href: "https://infoelectoral.interior.gob.es/es/elecciones-celebradas/resultados-electorales", label: "Ministerio del Interior (Infoelectoral): resultados electorales" },
  euronews: { href: "https://es.euronews.com/2026/10/14/cis-psoe-una-subida-34-saca-casi-12-puntos-al-pp-a-mes-y-medio-del-29n", label: "Euronews, 14 de octubre de 2026: CIS de octubre frente a GAD3 y 40dB" },
  rtve2026: { href: "https://www.rtve.es/noticias/20261014/cis-dispara-a-118-puntos-ventaja-del-psoe-con-pp-tras-caida-del-decreto-maricarmen/17265537.shtml", label: "RTVE, 14 de octubre de 2026: barómetro del CIS de octubre" },
  eldiario2023: { href: "https://www.eldiario.es/politica/encuestas-fallaron-inflaron-pp-14-escanos-resultado-final-23j_1_10403177.html", label: "elDiario.es, 24 de julio de 2023: encuestas del 23J frente al resultado" },
  rtve2018: { href: "https://www.rtve.es/noticias/20181026/por-encuestas-del-cis-estan-ojo-del-huracan/1827067.shtml", label: "RTVE, 26 de octubre de 2018: por qué las encuestas del CIS son polémicas" },
  m20_2018: { href: "https://www.20minutos.es/noticia/3474770/0/cis-tezanos-explica-cocina-cis-reglas-tres-simpatia/", label: "20minutos, 2018: el CIS explica su estimación con voto y simpatía" },
  jec: { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario electoral de las elecciones generales 2026" },
  rd: { href: "https://www.boe.es/eli/es/rd/2026/10/05/806", label: "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre" },
  cisWeb: { href: "https://www.cis.es/", label: "Centro de Investigaciones Sociológicas (CIS)" },
  loreg: (anchor: string, label: string) => ({ href: `${LOREG}#${anchor}`, label: `LOREG, ${label}` }),
  ce: (anchor: string, label: string) => ({ href: `${CE}#${anchor}`, label: `Constitución, ${label}` }),
};

const DISCLAIMER =
  "Las encuestas no son resultados. Citamos cada cifra con su fuente y su fecha, no hacemos estimaciones propias y aplicamos las mismas reglas a todas las encuestadoras y a todos los partidos.";

const R = {
  hub: { href: "/elecciones/encuestas-29n", label: "Últimas encuestas del 29-N con fuente y fecha" },
  cis: { href: "/elecciones/miente-el-cis", label: "¿Miente el CIS? Lo que dicen los datos" },
  cocina: { href: "/elecciones/cocina-de-las-encuestas", label: "Qué es la «cocina» de una encuesta" },
  hacer: { href: "/elecciones/como-se-hace-una-encuesta-electoral", label: "Cómo se hace una encuesta electoral" },
  directa: { href: "/elecciones/intencion-directa-vs-estimacion-de-voto", label: "Intención directa y estimación de voto" },
  margen: { href: "/elecciones/margen-de-error-encuestas", label: "Margen de error de una encuesta" },
  barometro: { href: "/elecciones/barometro-cis-que-es", label: "Qué es el barómetro del CIS" },
  historico: { href: "/elecciones/aciertos-y-fallos-de-las-encuestas", label: "Aciertos y fallos de las encuestas" },
  leer: { href: "/elecciones/como-leer-una-encuesta", label: "Cómo leer una encuesta sin que te engañen" },
  ficha: { href: "/elecciones/ficha-tecnica-encuesta", label: "Ficha técnica de una encuesta" },
  indecisos: { href: "/elecciones/indecisos-y-voto-oculto", label: "Indecisos y voto oculto" },
  pieUrna: { href: "/elecciones/encuesta-a-pie-de-urna", label: "Encuesta a pie de urna" },
  escanosEnc: { href: "/elecciones/por-que-las-encuestas-dan-horquillas-de-escanos", label: "Por qué las encuestas dan horquillas de escaños" },
  falsas: { href: "/elecciones/encuestas-falsas-en-redes", label: "Encuestas falsas en redes" },
  mayoria: { href: "/elecciones/mayoria-absoluta-176-escanos", label: "Mayoría absoluta: 176 escaños" },
  repeticion: { href: "/elecciones/repeticion-electoral", label: "Qué pasa si nadie consigue gobernar" },
  campana: { href: "/elecciones/campana-y-precampana", label: "Campaña y precampaña: qué cambia" },
  barrera: { href: "/elecciones/barrera-del-3-por-ciento-y-voto-util", label: "Barrera del 3 % y voto útil" },
  blanco: { href: "/elecciones/a-quien-beneficia-el-voto-en-blanco", label: "¿A quién beneficia el voto en blanco?" },
  comparar: { href: "/elecciones/como-comparar-programas-electorales", label: "Cómo comparar programas electorales" },
  // Páginas ya existentes
  prohibidas: { href: "/elecciones/encuestas-prohibidas", label: "Encuestas prohibidas del 24 al 28 de noviembre" },
  dhondt: { href: "/elecciones/como-se-reparten-los-escanos", label: "Cómo se reparten los escaños" },
  presidente: { href: "/elecciones/como-se-elige-presidente-gobierno", label: "Cómo se elige al presidente" },
  nulo: { href: "/elecciones/voto-nulo-y-voto-en-blanco", label: "Voto nulo y voto en blanco" },
  programas: { href: "/elecciones/programas-electorales-29n", label: "Programas electorales del 29-N" },
  promesas: { href: "/elecciones/promesas", label: "Promesas de todos los partidos" },
  bulos: { href: "/elecciones/bulos-y-fraudes-electorales", label: "Bulos y fraudes en elecciones" },
  calendario: { href: "/elecciones/calendario-29-noviembre", label: "Calendario del 29 de noviembre" },
  reflexion: { href: "/elecciones/jornada-de-reflexion", label: "Jornada de reflexión" },
  provincias: { href: "/elecciones/diputados-por-provincia-29n", label: "Diputados por provincia el 29-N" },
};

type Base = Omit<Guide, "pack" | "reviewedAt" | "disclaimer">;
const g = (x: Base): Guide => ({ pack: "elecciones", reviewedAt, disclaimer: DISCLAIMER, ...x });

const TABLA_CIS: GuideTable = {
  caption: "Estimación final del CIS antes de cada elección general y resultado oficial (porcentaje sobre voto válido)",
  head: ["Elección", "Partido", "CIS (estimación)", "Resultado oficial", "Fuente"],
  rows: [
    { cells: ["28-A 2019", "PSOE", "30,2 %", "28,7 %"], source: S.cis3242 },
    { cells: ["28-A 2019", "PP", "17,2 %", "16,7 %"], source: S.cis3242 },
    { cells: ["28-A 2019", "Ciudadanos", "13,6 %", "15,9 %"], source: S.cis3242 },
    { cells: ["28-A 2019", "Vox", "11,9 %", "10,3 %"], source: S.cis3242 },
    { cells: ["10-N 2019", "PSOE", "32,2 %", "28,0 %"], source: S.cis3263 },
    { cells: ["10-N 2019", "PP", "18,1 %", "20,8 %"], source: S.cis3263 },
    { cells: ["10-N 2019", "Vox", "7,9 %", "15,1 %"], source: S.cis3263 },
    { cells: ["10-N 2019", "Ciudadanos", "10,6 %", "6,8 %"], source: S.cis3263 },
    { cells: ["23-J 2023", "PP", "31,4 %", "33,1 %"], source: S.cis3411 },
    { cells: ["23-J 2023", "PSOE", "31,2 %", "31,7 %"], source: S.cis3411 },
    { cells: ["23-J 2023", "Vox", "10,6 %", "12,4 %"], source: S.cis3411 },
    { cells: ["23-J 2023", "Sumar", "16,4 %", "12,3 %"], source: S.cis3411 },
  ],
};

const TABLA_ESCANOS: GuideTable = {
  caption: "Horquilla de escaños del CIS antes del 23-J de 2023 y escaños oficiales",
  head: ["Partido", "Horquilla CIS", "Escaños oficiales", "Fuente"],
  rows: [
    { cells: ["PP", "122 a 140", "137"], source: S.cis3411 },
    { cells: ["PSOE", "115 a 135", "121"], source: S.cis3411 },
    { cells: ["Sumar", "43 a 50", "31"], source: S.cis3411 },
    { cells: ["Vox", "21 a 29", "33"], source: S.cis3411 },
  ],
};

const TABLA_OCT26: GuideTable = {
  caption: "Encuestas publicadas en octubre de 2026 para el 29-N (estimación sobre voto válido; no son resultados)",
  head: ["Encuesta", "Trabajo de campo", "PSOE", "PP", "Vox", "Fuente"],
  rows: [
    { cells: ["CIS, barómetro de octubre (5.025 entrevistas)", "1 al 6 de octubre", "34 %", "22,2 %", "17,1 %"], source: S.cis3582 },
    { cells: ["40dB para El País y la SER", "7 y 8 de octubre", "28,1 %", "31,9 %", "18,9 %"], source: S.euronews },
    { cells: ["GAD3 para ABC", "Según Euronews, publicado antes del 14 de octubre", "26,4 %", "31,4 %", "18,2 %"], source: S.euronews },
  ],
};

export const ENCUESTAS_29N_GUIDES: Guide[] = [
  g({
    id: "29n-encuestas-hub",
    path: "/elecciones/encuestas-29n",
    h1: "Encuestas de las elecciones del 29-N: las últimas, con fuente y fecha",
    title: "Encuestas elecciones 29-N: últimas, con fuente y fecha",
    description:
      "Qué dicen las últimas encuestas para el 29 de noviembre de 2026: CIS, 40dB y GAD3, con su fecha y su fuente. Por qué no coinciden y cuándo dejan de publicarse.",
    lead:
      "A 19 de octubre de 2026, el CIS sitúa primero al PSOE y las encuestas privadas citadas por Euronews (40dB y GAD3) sitúan primero al PP. Son estimaciones hechas semanas antes de votar, no resultados. Abajo tienes cada cifra con su fecha y su fuente, y la explicación de por qué difieren.",
    cta: S.cis3582,
    secondaryCta: { href: "/elecciones/miente-el-cis", label: "¿Miente el CIS? Lo que dicen los datos" },
    sources: [S.cis3582, S.cis3582avance, S.euronews, S.rtve2026, S.jec, S.loreg("asesentaynueve", "artículo 69: encuestas")],
    related: [R.cis, R.directa, R.margen, R.leer, R.historico, R.prohibidas],
    faqs: [
      { q: "¿Quién va primero en las encuestas del 29-N?", a: "Depende de la encuesta. El barómetro del CIS de octubre de 2026 pone primero al PSOE (34 %), y 40dB y GAD3, según Euronews del 14 de octubre, ponen primero al PP (31,9 % y 31,4 %). Son estimaciones, no resultados." },
      { q: "¿Hasta cuándo se publican encuestas?", a: "Hasta el 23 de noviembre. Del 24 al 28 de noviembre de 2026 no se pueden publicar ni difundir sondeos, según el artículo 69 de la LOREG y el calendario de la Junta Electoral Central." },
      { q: "¿Por qué el CIS da datos tan distintos a los privados?", a: "Usan métodos distintos para pasar de lo que la gente responde a una estimación. El CIS aplica su propio modelo de escenarios y las privadas suelen ponderar por recuerdo de voto. Lo explicamos en «¿Miente el CIS?»." },
    ],
    sections: [
      {
        id: "tabla",
        title: "Encuestas publicadas en octubre de 2026",
        paragraphs: [
          "Solo incluimos encuestas con fecha y fuente que hemos podido comprobar. Actualizaremos esta tabla cuando salgan nuevas.",
        ],
        table: TABLA_OCT26,
      },
      {
        id: "cis-detalle",
        title: "El barómetro del CIS de octubre, en detalle",
        paragraphs: [
          "El estudio 3582 se hizo del 1 al 6 de octubre con 5.025 entrevistas. Además de PSOE, PP y Vox, estima a SUMAR/Frente Amplio en el 6,1 %, a Podemos en el 3,1 %, a ERC en el 3,0 % y a Se Acabó la Fiesta en el 1,8 %.",
          "El propio CIS advierte que su medición «no posee intención prospectiva»: describe el momento de la encuesta, no predice el resultado.",
          "En voto directo (lo que la gente contesta, sobre el total del censo) el PSOE tiene un 25,3 %, el PP un 14,7 % y Vox un 11,6 %. La diferencia entre ese dato y la estimación es el modelo.",
        ],
      },
      {
        id: "por-que-difieren",
        title: "Por qué no coinciden",
        paragraphs: [
          "Las encuestas difieren por la fecha del trabajo de campo, por el tamaño y el tipo de muestra (teléfono o internet) y, sobre todo, por cómo reparten a los indecisos y corrigen la muestra.",
          "Mira siempre la fecha del trabajo de campo, no la de publicación, y compara una encuesta con la anterior de la misma empresa, no con otra distinta.",
        ],
      },
    ],
  }),

  g({
    id: "29n-miente-cis",
    path: "/elecciones/miente-el-cis",
    h1: "¿Miente el CIS? Qué dicen los datos y qué dice cada parte",
    title: "¿Miente el CIS? Datos de 2019 y 2023 y su método",
    description:
      "Comparamos las estimaciones finales del CIS con los resultados oficiales de 2019 y 2023, explicamos su método y recogemos las críticas y la postura del CIS.",
    lead:
      "No podemos decir si el CIS «miente»: es una acusación, no un dato. Lo que sí se puede comprobar es cuánto se acercó. En 2023 su estimación del PSOE quedó a medio punto del resultado y la de Sumar, cuatro puntos por encima. En noviembre de 2019 sobreestimó al PSOE en 4,2 puntos y se quedó 7,2 por debajo de Vox. Aquí tienes los datos, el método y las dos posturas.",
    cta: S.cis3411,
    secondaryCta: S.boe2023,
    sources: [S.loreg("asesentaynueve", "artículo 69.8: encuestas de organismos públicos"), S.cis3242, S.cis3263, S.cis3411, S.cis3411nota, S.boe2019a, S.boe2019n, S.boe2023, S.cis3582, S.rtve2018, S.m20_2018, S.euronews, S.eldiario2023],
    related: [R.cocina, R.directa, R.historico, R.barometro, R.hub, R.margen],
    faqs: [
      { q: "¿Acertó el CIS en 2023?", a: "En parte. Estimó al PP en 31,4 % (sacó 33,1 %) y al PSOE en 31,2 % (sacó 31,7 %), pero dio a Sumar un 16,4 % (sacó 12,3 %) y a Vox un 10,6 % (sacó 12,4 %). Fuentes: estudio 3411 del CIS y resultados oficiales en el BOE." },
      { q: "¿Y en 2019?", a: "En abril de 2019 dio al PSOE un 30,2 % (sacó 28,7 %). En noviembre de 2019 le dio un 32,2 % (sacó 28,0 %) y a Vox un 7,9 % (sacó 15,1 %). Fuentes: estudios 3242 y 3263 del CIS y BOE." },
      { q: "¿Qué dice el CIS de las críticas?", a: "Que su modelo mide el estado del electorado en el momento de la encuesta y no pretende pronosticar, y que publica los microdatos para que cualquiera aplique otro modelo." },
      { q: "¿Qué dicen sus críticos?", a: "Desde 2018 parte de los analistas y medios critican que el CIS dejara de ponderar por recuerdo de voto y use la simpatía, lo que según ellos favorece al PSOE. El PP presentó en mayo de 2026 una querella contra su presidente, según Euronews. Es una acusación, no una condena." },
    ],
    sections: [
      {
        id: "datos",
        title: "Estimación final del CIS frente al resultado oficial",
        paragraphs: [
          "Comparamos la última encuesta preelectoral del CIS antes de cada elección general con el resultado oficial publicado en el BOE. Los porcentajes oficiales están redondeados a un decimal.",
        ],
        table: TABLA_CIS,
      },
      {
        id: "escanos-2023",
        title: "En escaños, en 2023",
        paragraphs: [
          "El CIS da horquillas amplias. En 2023 el PP y el PSOE quedaron dentro de la suya; Sumar quedó por debajo y Vox por encima.",
        ],
        table: TABLA_ESCANOS,
      },
      {
        id: "metodo",
        title: "Qué cambió en el método",
        paragraphs: [
          "Tradicionalmente, el CIS corregía las respuestas con el recuerdo de voto (lo que cada persona dice que votó la última vez) y otros ajustes: es la llamada «cocina».",
          "Desde 2018, con José Félix Tezanos como presidente, el CIS cambió el método: empezó combinando el voto directo con la simpatía hacia un partido y desde 2019 aplica un modelo de escenarios que llama «modelo bidimensional inercia-incertidumbre Alaminos-Tezanos».",
          "Ese cambio rompió la comparación con su serie anterior, como explicaron RTVE y otros medios en 2018.",
        ],
      },
      {
        id: "dos-posturas",
        title: "Las dos posturas",
        paragraphs: [],
        lists: [[
          "Críticas: el PP acusa al CIS de sobreestimar a la izquierda y Tezanos fue durante décadas militante del PSOE y miembro de su Ejecutiva Federal (Euronews, 14 de octubre de 2026). Analistas citados por RTVE en 2018 señalaron que la simpatía podía favorecer al partido del Gobierno.",
          "Regla legal: si un organismo público hace encuestas de intención de voto en periodo electoral, debe dar los resultados a los partidos que los pidan en 48 horas (artículo 69.8 de la LOREG).",
          "Postura del CIS: su estimación «no posee intención prospectiva», es una foto del momento, y publica los microdatos de todos sus estudios para que cualquiera calcule su propia estimación.",
          "Lo comprobable: en 2023 el CIS estuvo más cerca del resultado del PSOE que algunas encuestas privadas, según elDiario.es; en noviembre de 2019 se alejó mucho en PSOE y Vox. Las privadas también fallan: lo verás en «Aciertos y fallos de las encuestas».",
        ]],
      },
    ],
  }),

  g({
    id: "29n-cocina-encuestas",
    path: "/elecciones/cocina-de-las-encuestas",
    h1: "Qué es la «cocina» de una encuesta electoral",
    title: "La «cocina» de las encuestas: qué es y por qué existe",
    description:
      "La cocina es el paso de lo que responde la gente a la estimación de voto: ponderar, repartir indecisos y corregir sesgos. Qué hace cada encuestadora y el CIS.",
    lead:
      "La «cocina» es el conjunto de ajustes con que una encuestadora convierte las respuestas brutas en una estimación de voto. Existe porque la muestra nunca es perfecta: hay gente que no contesta, que no ha decidido o que no dice lo que votará. No es trampa en sí misma, pero cada cocina da un resultado distinto.",
    cta: S.cis3582,
    secondaryCta: S.rtve2018,
    sources: [S.cis3582, S.cis3242, S.rtve2018, S.m20_2018],
    related: [R.directa, R.cis, R.indecisos, R.hacer, R.ficha],
    faqs: [
      { q: "¿La cocina es manipular?", a: "No necesariamente. Es un modelo estadístico para corregir la muestra. El problema aparece cuando no se explica o cuando el modelo elegido sesga el resultado. Por eso conviene mirar la ficha técnica y el voto directo." },
      { q: "¿El CIS hace cocina?", a: "El CIS aplica un modelo de estimación propio. En 2019 lo describía como una combinación de filtrado, ponderación e imputación con 108 variables (estudio 3242); hoy usa su modelo de escenarios." },
    ],
    sections: [
      {
        id: "ingredientes",
        title: "Los ingredientes habituales",
        paragraphs: [],
        lists: [[
          "Ponderar la muestra por sexo, edad, territorio o tamaño de municipio para que se parezca a la población.",
          "Ponderar por recuerdo de voto: si en la muestra hay más votantes de un partido de los que hubo en las últimas elecciones, se les da menos peso.",
          "Repartir a los indecisos según su simpatía, su ideología o su valoración de líderes.",
          "Estimar quién irá de verdad a votar (participación).",
        ]],
      },
      {
        id: "ejemplo",
        title: "Un ejemplo real del CIS",
        paragraphs: [
          "En el barómetro de octubre de 2026, el PSOE tiene un 25,3 % de voto directo sobre el censo y un 34 % de estimación sobre voto válido. El PP pasa del 14,7 % al 22,2 % y Vox del 11,6 % al 17,1 % (estudio 3582).",
          "Todos suben porque la estimación se calcula sobre voto válido y quita abstención, indecisos y «no contesta». Cuánto sube cada uno depende del modelo.",
        ],
      },
    ],
  }),

  g({
    id: "29n-como-se-hace-encuesta",
    path: "/elecciones/como-se-hace-una-encuesta-electoral",
    h1: "Cómo se hace una encuesta electoral, paso a paso",
    title: "Cómo se hace una encuesta electoral paso a paso",
    description:
      "Muestra, cuestionario, trabajo de campo, ponderación y estimación: así se hace una encuesta electoral y qué debe contar su ficha técnica según la LOREG.",
    lead:
      "Una encuesta electoral pregunta a una muestra de personas, corrige esa muestra para que se parezca a la población y estima el voto. Tiene cinco pasos: diseñar la muestra, preguntar, recoger las respuestas, ponderar y estimar. Si una encuesta no explica estos pasos en su ficha técnica, desconfía.",
    cta: S.cis3582,
    secondaryCta: S.loreg("asesentaynueve", "artículo 69"),
    sources: [S.cis3582, S.cis3411, S.loreg("asesentaynueve", "artículo 69: publicación de encuestas")],
    related: [R.ficha, R.margen, R.cocina, R.directa, R.hub],
    faqs: [
      { q: "¿Cuántas personas hacen falta para una encuesta fiable?", a: "Depende del detalle que quieras. Con unas 1.000 entrevistas bien seleccionadas el margen teórico es de unos ±3,1 puntos para el total nacional. El CIS hizo 5.025 en octubre de 2026 y 29.201 en su preelectoral de 2023." },
      { q: "¿Se hacen por teléfono o por internet?", a: "Las dos cosas. Cada encuestadora lo indica en su ficha técnica. El método influye en quién responde." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Los cinco pasos",
        paragraphs: [],
        lists: [[
          "Muestra: se elige quién responde, normalmente con cuotas de sexo, edad y territorio.",
          "Cuestionario: se pregunta a quién votarías, a quién votaste la última vez, simpatía, ideología y valoración de líderes.",
          "Trabajo de campo: unos días de entrevistas. Su fecha importa más que la de publicación.",
          "Ponderación: se corrige la muestra para que se parezca a la población.",
          "Estimación: se pasa del voto declarado a un porcentaje sobre voto válido y, a veces, a escaños.",
        ]],
      },
      {
        id: "ley",
        title: "Qué exige la ley al publicarla",
        paragraphs: [
          "El artículo 69.1 de la LOREG obliga a acompañar todo sondeo publicado de quién lo ha hecho y quién lo encarga, el sistema de muestreo, el tamaño de la muestra, el margen de error, el nivel de representatividad, cómo se eligió a los encuestados, la fecha del trabajo de campo y el texto íntegro de las preguntas con cuántos no contestaron. La Junta Electoral Central vela por que se cumpla (artículo 69.2).",
        ],
      },
    ],
  }),

  g({
    id: "29n-directa-vs-estimacion",
    path: "/elecciones/intencion-directa-vs-estimacion-de-voto",
    h1: "Intención directa de voto y estimación de voto: la diferencia",
    title: "Intención directa vs estimación de voto: diferencia",
    description:
      "La intención directa es lo que responde la gente; la estimación es el cálculo final. Ejemplo real con el barómetro del CIS de octubre de 2026.",
    lead:
      "La intención directa es el porcentaje de entrevistados que dice que votará a cada partido, calculado sobre todos (incluidos indecisos y abstencionistas). La estimación es el porcentaje que la encuestadora calcula sobre el voto válido, después de su modelo. Por eso la estimación siempre es más alta y es la que sale en los titulares.",
    cta: S.cis3582,
    secondaryCta: S.cis3411,
    sources: [S.cis3582, S.cis3411],
    related: [R.cocina, R.cis, R.indecisos, R.leer, R.hub],
    faqs: [
      { q: "¿Qué dato es más fiable?", a: "Ninguno es el resultado. La intención directa no tiene modelo, pero incluye a los que no votarán o no saben. La estimación intenta parecerse al resultado, pero depende del modelo." },
    ],
    sections: [
      {
        id: "ejemplo",
        title: "Ejemplo: CIS de octubre de 2026",
        paragraphs: [],
        table: {
          caption: "Voto directo (sobre censo) y estimación (sobre voto válido), estudio 3582 del CIS",
          head: ["Partido", "Voto directo", "Estimación", "Fuente"],
          rows: [
            { cells: ["PSOE", "25,3 %", "34 %"], source: S.cis3582 },
            { cells: ["PP", "14,7 %", "22,2 %"], source: S.cis3582 },
            { cells: ["Vox", "11,6 %", "17,1 %"], source: S.cis3582 },
            { cells: ["SUMAR / Frente Amplio", "4,5 %", "6,1 %"], source: S.cis3582 },
            { cells: ["Podemos", "2,2 %", "3,1 %"], source: S.cis3582 },
          ],
        },
      },
      {
        id: "2023",
        title: "Lo mismo en 2023",
        paragraphs: [
          "En el preelectoral de 2023 el CIS midió un 25,4 % de voto directo para el PP y un 24,6 % para el PSOE, con un 14,1 % de «no sabe». Su estimación fue del 31,4 % y el 31,2 % (estudio 3411).",
        ],
      },
    ],
  }),

  g({
    id: "29n-margen-error",
    path: "/elecciones/margen-de-error-encuestas",
    h1: "El margen de error de una encuesta, explicado",
    title: "Margen de error de una encuesta: qué significa",
    description:
      "Qué significa «±3 puntos», por qué un empate dentro del margen no es una ventaja y cómo calcular el margen teórico según el tamaño de la muestra.",
    lead:
      "El margen de error dice cuánto puede moverse un dato solo por haber preguntado a una muestra y no a todo el mundo. Con 1.000 entrevistas aleatorias y un 95 % de confianza es de unos ±3,1 puntos. Si dos partidos están separados por menos de eso, la encuesta no sabe quién va delante.",
    cta: S.cis3582,
    secondaryCta: S.cis3411,
    sources: [S.cis3582, S.cis3411],
    related: [R.leer, R.ficha, R.hacer, R.escanosEnc, R.hub],
    faqs: [
      { q: "¿Qué es un empate técnico?", a: "Cuando la diferencia entre dos partidos es menor que el margen de error. El CIS llamó así en 2023 a su estimación de PP (31,4 %) y PSOE (31,2 %)." },
      { q: "¿El margen de error incluye todos los errores?", a: "No. Solo el error de muestreo. No cubre sesgos como que un tipo de votante conteste menos o que la gente cambie de opinión." },
    ],
    sections: [
      {
        id: "tabla",
        title: "Margen teórico según la muestra",
        paragraphs: [
          "Calculado para el caso más desfavorable (p = q = 50 %) y un 95 % de confianza, con la fórmula 1,96 × √(0,25 / n). Es un cálculo matemático, no un dato de ninguna encuesta.",
        ],
        lists: [[
          "500 entrevistas: ±4,4 puntos.",
          "1.000 entrevistas: ±3,1 puntos.",
          "2.000 entrevistas: ±2,2 puntos.",
          "5.000 entrevistas: ±1,4 puntos.",
        ]],
      },
      {
        id: "lo-que-no-cubre",
        title: "Lo que el margen no cubre",
        paragraphs: [
          "Las encuestas por cuotas o por internet no son aleatorias en sentido estricto, así que el margen es orientativo. Y en una provincia el margen es mucho mayor que en el total, porque hay menos entrevistas.",
        ],
      },
    ],
  }),

  g({
    id: "29n-barometro-cis",
    path: "/elecciones/barometro-cis-que-es",
    h1: "Qué es el barómetro del CIS y cómo leerlo",
    title: "Barómetro del CIS: qué es, cuándo sale y cómo leerlo",
    description:
      "El CIS es un organismo público que publica barómetros mensuales con estimación de voto. Qué contiene, cuántas entrevistas tiene y dónde ver los datos.",
    lead:
      "El Centro de Investigaciones Sociológicas (CIS) es un organismo público que hace encuestas. Su barómetro es una encuesta periódica que incluye estimación de voto, valoración de líderes y principales problemas. El de octubre de 2026 se publicó el 14 de octubre, con 5.025 entrevistas hechas del 1 al 6 de octubre.",
    cta: S.cisWeb,
    secondaryCta: S.cis3582,
    sources: [S.cis3582, S.cis3582avance, S.euronews],
    related: [R.cis, R.directa, R.hub, R.ficha],
    faqs: [
      { q: "¿Dónde se ven los datos del barómetro?", a: "En la web del CIS (cis.es): cada estudio tiene su avance de resultados, la estimación de voto y los microdatos descargables." },
      { q: "¿Habrá encuesta preelectoral del CIS para el 29-N?", a: "El CIS suele publicar una encuesta preelectoral antes de cada elección general, como hizo en 2019 y 2023. Cuando la publique la añadiremos con su fecha." },
    ],
    sections: [
      {
        id: "que-trae",
        title: "Qué trae el barómetro de octubre de 2026",
        paragraphs: [],
        lists: [[
          "Estimación de voto: PSOE 34 %, PP 22,2 %, Vox 17,1 %, SUMAR/Frente Amplio 6,1 %.",
          "Principal problema: la vivienda, citada por el 55,7 % (Euronews, 14 de octubre de 2026).",
          "Preferido como presidente: Pedro Sánchez 39,3 %, Alberto Núñez Feijóo 14,7 %, Santiago Abascal 13,8 % (nota del CIS).",
        ]],
      },
      {
        id: "como-leer",
        title: "Cómo leerlo bien",
        paragraphs: [
          "Compáralo con el barómetro anterior del propio CIS, no con encuestas de otras empresas. Mira el voto directo junto a la estimación y fíjate en el porcentaje de «no sabe».",
        ],
      },
    ],
  }),

  g({
    id: "29n-aciertos-fallos",
    path: "/elecciones/aciertos-y-fallos-de-las-encuestas",
    h1: "Aciertos y fallos de las encuestas en las últimas generales",
    title: "Aciertos y fallos de las encuestas: 2019 y 2023",
    description:
      "Qué dijeron el CIS y las encuestas privadas antes de 2019 y 2023 y qué pasó. Ninguna acierta siempre: datos con fuentes oficiales.",
    lead:
      "Ninguna encuestadora acierta siempre. En 2023 la mayoría de privadas dio al PP más escaños de los que sacó y el CIS sobreestimó a Sumar. En noviembre de 2019 el CIS se quedó muy por debajo de Vox. Aquí están los datos comprobados.",
    cta: S.boe2023,
    secondaryCta: S.eldiario2023,
    sources: [S.cis3242, S.cis3263, S.cis3411, S.boe2019a, S.boe2019n, S.boe2023, S.eldiario2023],
    related: [R.cis, R.pieUrna, R.margen, R.indecisos, R.hub],
    faqs: [
      { q: "¿Qué encuesta acertó más en 2023?", a: "Según elDiario.es, 40dB dio al PP 135 escaños y Simple Lógica entre 130 y 138; el PP sacó 136 en el recuento de la noche y 137 en el oficial. GAD3, a pie de urna, le dio 150." },
    ],
    sections: [
      {
        id: "2023",
        title: "2023: las privadas",
        lists: [[
          "40dB (El País y SER), última encuesta: PP 135 escaños y 32,9 %.",
          "Simple Lógica (elDiario.es), campo del 11 al 13 de julio: PP entre 130 y 138 escaños; PP y Vox entre 164 y 178.",
          "GAD3, encuesta a pie de urna para RTVE y Forta: PP 150, PSOE 112, Sumar 21.",
          "Sigma Dos, a pie de urna: PP entre 145 y 150, PSOE entre 113 y 118.",
          "Resultado oficial: PP 137, PSOE 121, Vox 33, Sumar 31. PP y Vox sumaron 170, sin mayoría absoluta.",
        ]],
        paragraphs: [
          "Fuente de las encuestas privadas: elDiario.es, 24 de julio de 2023. Resultado: BOE.",
        ],
      },
      {
        id: "cis",
        title: "El CIS en 2019 y 2023",
        paragraphs: [],
        table: TABLA_CIS,
      },
      {
        id: "leccion",
        title: "Qué enseñan estos datos",
        paragraphs: [
          "Los errores grandes suelen venir de partidos que crecen o caen deprisa y de la gente que decide en la última semana, justo cuando ya no se pueden publicar encuestas.",
        ],
      },
    ],
  }),

  g({
    id: "29n-leer-encuesta",
    path: "/elecciones/como-leer-una-encuesta",
    h1: "Cómo leer una encuesta electoral sin que te engañen",
    title: "Cómo leer una encuesta electoral sin que te engañen",
    description:
      "Siete comprobaciones antes de creerte un titular sobre encuestas: fecha de campo, muestra, margen, quién la paga, voto directo, tendencia y escaños.",
    lead:
      "Antes de creerte un titular sobre encuestas, mira siete cosas: quién la hace y quién la paga, la fecha del trabajo de campo, la muestra, el margen de error, el voto directo, la tendencia frente a la anterior y si habla de votos o de escaños.",
    cta: S.loreg("asesentaynueve", "artículo 69"),
    secondaryCta: S.cis3582,
    sources: [S.loreg("asesentaynueve", "artículo 69"), S.cis3582],
    related: [R.ficha, R.margen, R.directa, R.falsas, R.escanosEnc, R.hub],
    faqs: [
      { q: "¿Sirve una encuesta de Twitter o de un periódico digital donde vota quien quiere?", a: "No es una encuesta representativa: responde quien quiere y puede votar varias veces. Mira «Encuestas falsas en redes»." },
    ],
    sections: [
      {
        id: "checklist",
        title: "Las siete comprobaciones",
        paragraphs: [],
        lists: [[
          "Quién la hace y quién la encarga. La ley obliga a decirlo (artículo 69.1 de la LOREG).",
          "Fecha del trabajo de campo: una encuesta de hace tres semanas no recoge lo último.",
          "Tamaño y tipo de muestra: teléfono, internet o presencial.",
          "Margen de error: si la diferencia es menor, es un empate.",
          "Voto directo y «no sabe»: si los indecisos son muchos, la estimación es frágil.",
          "Tendencia: compárala con la anterior de la misma empresa.",
          "Votos o escaños: los escaños dependen de cada provincia y tienen más incertidumbre.",
        ]],
      },
    ],
  }),

  g({
    id: "29n-ficha-tecnica",
    path: "/elecciones/ficha-tecnica-encuesta",
    h1: "Ficha técnica de una encuesta: qué mirar",
    title: "Ficha técnica de una encuesta: qué debe incluir",
    description:
      "Qué es la ficha técnica de un sondeo, qué datos exige la LOREG al publicarlo en periodo electoral y cómo usarla para valorar la encuesta.",
    lead:
      "La ficha técnica es el cuadro que explica cómo se hizo la encuesta: quién, cuándo, a cuántas personas, cómo y con qué margen de error. El artículo 69 de la LOREG obliga a publicarla junto con el sondeo. Si no aparece, la encuesta no se puede valorar.",
    cta: S.loreg("asesentaynueve", "artículo 69"),
    secondaryCta: S.cis3582,
    sources: [S.loreg("asesentaynueve", "artículo 69"), S.cis3582],
    related: [R.leer, R.margen, R.hacer, R.falsas],
    faqs: [
      { q: "¿Quién vigila que se cumpla?", a: "La Junta Electoral Central, según el artículo 69 de la LOREG." },
    ],
    sections: [
      {
        id: "que-incluye",
        title: "Qué datos debes encontrar",
        paragraphs: [],
        lists: [[
          "Empresa que la hace y medio o entidad que la encarga.",
          "Universo (por ejemplo, residentes en España con derecho a voto).",
          "Tamaño de la muestra y cómo se ha seleccionado.",
          "Método de entrevista: teléfono, internet o presencial.",
          "Fechas del trabajo de campo.",
          "Margen de error y nivel de confianza.",
          "Texto íntegro de las preguntas y cuántas personas no contestaron a cada una (artículo 69.1.c).",
        ]],
      },
      {
        id: "ejemplo",
        title: "Ejemplo: el CIS de octubre",
        paragraphs: [
          "El estudio 3582 indica 5.025 entrevistas del 1 al 6 de octubre de 2026, el margen de cada partido (±1,2 puntos para PSOE y PP en voto directo) y el modelo usado. El CIS publica además los microdatos.",
        ],
      },
    ],
  }),

  g({
    id: "29n-indecisos",
    path: "/elecciones/indecisos-y-voto-oculto",
    h1: "Indecisos y voto oculto: lo que las encuestas no ven",
    title: "Indecisos y voto oculto: por qué fallan las encuestas",
    description:
      "Cuántos indecisos detecta el CIS, qué es el voto oculto y por qué la gente que decide tarde complica las encuestas. Datos de 2019 y 2023.",
    lead:
      "Los indecisos son quienes aún no saben a quién votarán; el voto oculto es el de quienes no quieren decirlo. En abril de 2019 el 25,3 % de los entrevistados del CIS dijo que aún no lo tenía decidido. Cómo reparte cada encuestadora a esa gente explica buena parte de sus diferencias.",
    cta: S.cis3242,
    secondaryCta: S.cis3411,
    sources: [S.cis3242, S.cis3263, S.cis3411],
    related: [R.cocina, R.directa, R.historico, R.hub],
    faqs: [
      { q: "¿Cuántos indecisos hay?", a: "Varía. En el preelectoral del CIS de 2023, un 14,1 % respondió «no sabe». En el de octubre de 2019, un 20,3 % no lo tenía decidido (estudios 3411 y 3263)." },
    ],
    sections: [
      {
        id: "datos",
        title: "Indecisos en los preelectorales del CIS",
        paragraphs: [],
        lists: [[
          "Marzo de 2019 (para el 28-A): 25,3 % «no lo tiene decidido aún» y 4,5 % «no sabe».",
          "Septiembre-octubre de 2019 (para el 10-N): 20,3 % «no lo tiene decidido aún» y 3,2 % «no sabe».",
          "Junio de 2023 (para el 23-J): 14,1 % «no sabe».",
        ]],
      },
      {
        id: "voto-oculto",
        title: "Qué es el voto oculto",
        paragraphs: [
          "Es el voto de quien no declara su partido por vergüenza o desconfianza. Las encuestadoras intentan corregirlo con el recuerdo de voto o con preguntas indirectas, y no siempre lo consiguen.",
        ],
      },
    ],
  }),

  g({
    id: "29n-pie-de-urna",
    path: "/elecciones/encuesta-a-pie-de-urna",
    h1: "Encuesta a pie de urna: qué es y cuánto acierta",
    title: "Encuesta a pie de urna: qué es y cuánto acierta",
    description:
      "La encuesta a pie de urna pregunta a la salida del colegio y se difunde al cierre. Cómo funciona y qué pasó con las de 2023.",
    lead:
      "La encuesta a pie de urna se hace el mismo día de la votación, preguntando a personas que acaban de votar, y se difunde al cerrar los colegios. No es el recuento. En 2023 la de GAD3 para RTVE y Forta dio al PP 150 escaños y sacó 137.",
    cta: S.eldiario2023,
    secondaryCta: S.boe2023,
    sources: [S.eldiario2023, S.boe2023, S.loreg("asesentaynueve", "artículo 69")],
    related: [R.historico, R.prohibidas, R.margen, R.hub],
    faqs: [
      { q: "¿Por qué falla si pregunta a quien ya ha votado?", a: "Porque no recoge el voto por correo, porque hay gente que no contesta o no dice la verdad, y porque los escaños dependen de márgenes pequeños en cada provincia." },
    ],
    sections: [
      {
        id: "2023",
        title: "Lo que pasó en 2023",
        lists: [[
          "GAD3 (RTVE y Forta): PP 150, PSOE 112, Sumar 21.",
          "Sigma Dos (RTVE y Forta): PP entre 145 y 150, PSOE entre 113 y 118.",
          "Resultado oficial: PP 137, PSOE 121, Sumar 31.",
        ]],
        paragraphs: ["Fuentes: elDiario.es, 24 de julio de 2023, y BOE."],
      },
      {
        id: "29n",
        title: "El 29 de noviembre",
        paragraphs: [
          "Los colegios cierran a las 20:00. Hasta que llegue el recuento oficial del Ministerio del Interior, cualquier dato es una encuesta.",
        ],
      },
    ],
  }),

  g({
    id: "29n-horquillas-escanos",
    path: "/elecciones/por-que-las-encuestas-dan-horquillas-de-escanos",
    h1: "Por qué las encuestas dan horquillas de escaños",
    title: "Por qué las encuestas dan horquillas de escaños",
    description:
      "Los escaños se reparten provincia a provincia con D'Hondt, así que un mismo porcentaje puede dar muchos escaños distintos. Ejemplo del CIS en 2023.",
    lead:
      "Los 350 diputados se reparten en 52 circunscripciones con el sistema D'Hondt. Un partido puede ganar o perder un escaño en una provincia por pocos votos, así que las encuestas dan horquillas. En 2023 el CIS dio al PP entre 122 y 140 escaños: 18 de diferencia.",
    cta: S.cis3411,
    secondaryCta: S.loreg("acientosesentaytres", "artículo 163: reparto de escaños"),
    sources: [S.cis3411, S.boe2023, S.loreg("acientosesentaytres", "artículo 163")],
    related: [R.dhondt, R.provincias, R.barrera, R.margen, R.mayoria],
    faqs: [
      { q: "¿Más votos siempre son más escaños?", a: "No necesariamente. En 2023 Vox (12,4 %) sacó 33 escaños y Sumar (12,3 %) 31, con una diferencia de votos muy pequeña. Depende de dónde estén los votos." },
    ],
    sections: [
      {
        id: "ejemplo",
        title: "Horquillas del CIS en 2023 y resultado",
        paragraphs: [],
        table: TABLA_ESCANOS,
      },
    ],
  }),

  g({
    id: "29n-encuestas-falsas",
    path: "/elecciones/encuestas-falsas-en-redes",
    h1: "Encuestas falsas en redes: cómo detectarlas",
    title: "Encuestas falsas en redes: cómo detectarlas",
    description:
      "Capturas sin fuente, sondeos de Twitter y «encuestas» en días prohibidos: cómo distinguir una encuesta real de un bulo antes del 29-N.",
    lead:
      "Una encuesta real tiene empresa, fecha de campo, muestra y ficha técnica. Una captura sin fuente, un sondeo de redes donde vota quien quiere o una «encuesta» que circula del 24 al 28 de noviembre no son fiables. Si no encuentras la fuente original, no la compartas.",
    cta: S.jec,
    secondaryCta: S.loreg("asesentaynueve", "artículo 69"),
    sources: [S.jec, S.loreg("asesentaynueve", "artículo 69")],
    related: [R.bulos, R.prohibidas, R.ficha, R.leer],
    faqs: [
      { q: "¿Es delito publicar una encuesta del 24 al 28 de noviembre?", a: "La LOREG prohíbe publicar y difundir sondeos electorales en los cinco días anteriores a la votación (artículo 69). Las infracciones las sanciona la Junta Electoral." },
    ],
    sections: [
      {
        id: "senales",
        title: "Señales de alarma",
        paragraphs: [],
        lists: [[
          "No aparece la empresa ni el medio que la encarga.",
          "No hay fecha de trabajo de campo ni tamaño de muestra.",
          "Es una votación abierta en una red social o una web.",
          "Circula entre el 24 y el 28 de noviembre, cuando está prohibido difundir sondeos.",
          "Los porcentajes no suman o no coinciden con la web de la encuestadora.",
        ]],
      },
    ],
  }),

  g({
    id: "29n-mayoria-absoluta",
    path: "/elecciones/mayoria-absoluta-176-escanos",
    h1: "Mayoría absoluta: por qué son 176 escaños",
    title: "Mayoría absoluta en el Congreso: 176 escaños",
    description:
      "El Congreso tiene 350 diputados y la mayoría absoluta son 176. Para qué hace falta y cuándo basta la mayoría simple en la investidura.",
    lead:
      "El Congreso tiene 350 diputados, así que la mayoría absoluta es 176 (la mitad más uno). Hace falta para investir presidente en la primera votación. En la segunda, 48 horas después, basta con más votos a favor que en contra (artículo 99 de la Constitución).",
    cta: S.ce("a99", "artículo 99"),
    secondaryCta: S.boe2023,
    sources: [S.ce("a99", "artículo 99: investidura"), S.ce("a68", "artículo 68: el Congreso"), S.boe2023],
    related: [R.presidente, R.repeticion, R.dhondt, R.escanosEnc],
    faqs: [
      { q: "¿Alguien sacó mayoría absoluta en 2023?", a: "No. El partido con más escaños, el PP, sacó 137. Ninguno llegó a 176 (BOE)." },
      { q: "¿Qué otras cosas necesitan mayoría absoluta?", a: "Por ejemplo, aprobar leyes orgánicas en votación final sobre el conjunto del proyecto (artículo 81 de la Constitución)." },
    ],
    sections: [
      {
        id: "cuentas",
        title: "Las cuentas",
        paragraphs: [
          "350 / 2 = 175. Para tener más de la mitad hacen falta 176.",
          "Si nadie llega solo, la investidura depende de los apoyos o abstenciones de otros grupos.",
        ],
      },
    ],
  }),

  g({
    id: "29n-repeticion",
    path: "/elecciones/repeticion-electoral",
    h1: "Qué pasa si nadie consigue ser investido: repetición electoral",
    title: "Repetición electoral: qué pasa si nadie es investido",
    description:
      "Si en dos meses desde la primera votación de investidura nadie obtiene la confianza del Congreso, se disuelven las Cortes y se repiten las elecciones (art. 99.5 CE).",
    lead:
      "Si pasan dos meses desde la primera votación de investidura y ningún candidato ha obtenido la confianza del Congreso, el Rey disuelve las Cortes y convoca nuevas elecciones (artículo 99.5 de la Constitución). Ya pasó en 2019: las elecciones del 28 de abril se repitieron el 10 de noviembre.",
    cta: S.ce("a99", "artículo 99"),
    secondaryCta: S.boe2019n,
    sources: [S.ce("a99", "artículo 99"), S.boe2019a, S.boe2019n],
    related: [R.presidente, R.mayoria, R.calendario],
    faqs: [
      { q: "¿Hay un plazo antes de la primera votación?", a: "La Constitución no fija un plazo para la primera votación de investidura; el reloj de dos meses empieza con ella." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Los pasos",
        paragraphs: [],
        lists: [[
          "El Rey consulta a los grupos y propone un candidato.",
          "Primera votación: necesita 176 votos.",
          "Segunda votación, 48 horas después: más síes que noes.",
          "Si fracasa, se pueden proponer nuevos candidatos.",
          "A los dos meses de la primera votación sin investidura: disolución y nuevas elecciones.",
        ]],
      },
    ],
  }),

  g({
    id: "29n-campana-precampana",
    path: "/elecciones/campana-y-precampana",
    h1: "Campaña y precampaña: fechas del 29-N y qué cambia",
    title: "Campaña y precampaña 29-N: fechas y qué cambia",
    description:
      "La campaña electoral va del 13 al 27 de noviembre de 2026. La precampaña no existe en la ley: qué se puede hacer antes y qué prohíbe la LOREG.",
    lead:
      "La campaña oficial del 29-N empieza el viernes 13 de noviembre a las 0:00 y termina el viernes 27 a las 24:00 (Real Decreto 806/2026). La «precampaña» no es una figura legal: es el periodo entre la convocatoria y la campaña. En él los partidos pueden hacer sus actividades ordinarias, pero el artículo 53 de la LOREG prohíbe la publicidad electoral en carteles, soportes comerciales, prensa, radio y otros medios digitales.",
    cta: S.rd,
    secondaryCta: S.jec,
    sources: [S.rd, S.jec, S.loreg("acincuenta", "artículo 50"), S.loreg("acincuentaytres", "artículo 53")],
    related: [R.calendario, R.reflexion, R.prohibidas, R.promesas],
    faqs: [
      { q: "¿Cuándo empieza la campaña?", a: "El 13 de noviembre de 2026 a las 0:00 y termina el 27 a las 24:00." },
      { q: "¿Pueden los partidos hacer mítines antes de la campaña?", a: "El artículo 53 de la LOREG deja a salvo las actividades ordinarias de los partidos, pero desde la convocatoria hasta el inicio de la campaña prohíbe la publicidad o propaganda electoral en carteles, soportes comerciales e inserciones en prensa, radio u otros medios digitales. Las dudas las resuelve la Junta Electoral." },
      { q: "¿Y después de la campaña?", a: "Desde que termina la campaña (27 de noviembre a las 24:00) no puede difundirse propaganda ni hacerse actos de campaña (artículo 53)." },
    ],
    sections: [
      {
        id: "fechas",
        title: "Fechas clave",
        paragraphs: [],
        lists: [[
          "Campaña: del 13 al 27 de noviembre de 2026.",
          "Prohibición de publicar encuestas: del 24 al 28 de noviembre.",
          "Jornada de reflexión: sábado 28 de noviembre.",
          "Votación: domingo 29 de noviembre, de 9:00 a 20:00.",
        ]],
      },
      {
        id: "gobiernos",
        title: "Límites para los gobiernos",
        paragraphs: [
          "Desde la convocatoria, el artículo 50 de la LOREG prohíbe a los poderes públicos hacer campañas institucionales que destaquen sus logros e inaugurar obras o servicios públicos.",
        ],
      },
    ],
  }),

  g({
    id: "29n-barrera-voto-util",
    path: "/elecciones/barrera-del-3-por-ciento-y-voto-util",
    h1: "La barrera del 3 % y el voto útil, explicados",
    title: "Barrera del 3 % y voto útil: cómo funcionan",
    description:
      "En cada provincia no reparten escaños las listas con menos del 3 % del voto válido. Qué significa en la práctica y qué es el voto útil.",
    lead:
      "En el Congreso, las candidaturas que no llegan al 3 % de los votos válidos de su provincia no entran en el reparto de escaños (artículo 163.1.a de la LOREG). En la práctica, en las provincias pequeñas hace falta mucho más del 3 % para sacar un diputado. El «voto útil» es votar a quien tiene opciones de escaño en tu provincia en lugar de a tu primera preferencia.",
    cta: S.loreg("acientosesentaytres", "artículo 163"),
    secondaryCta: S.boe2023,
    sources: [S.loreg("acientosesentaytres", "artículo 163"), S.boe2023],
    related: [R.dhondt, R.blanco, R.provincias, R.escanosEnc],
    faqs: [
      { q: "¿El 3 % es nacional?", a: "No. Se calcula en cada circunscripción (provincia, Ceuta y Melilla) sobre los votos válidos, que incluyen el voto en blanco." },
    ],
    sections: [
      {
        id: "practica",
        title: "En la práctica",
        paragraphs: [
          "En provincias grandes como Madrid (37 escaños en 2023) la barrera del 3 % es la que más pesa. En provincias pequeñas como Soria (2 escaños) hace falta mucho más: en 2023 allí los dos escaños fueron para PP y PSOE (BOE).",
          "Votar con criterio de voto útil o de preferencia es una decisión personal. Aquí solo explicamos cómo cuenta cada voto.",
        ],
      },
    ],
  }),

  g({
    id: "29n-voto-blanco-beneficia",
    path: "/elecciones/a-quien-beneficia-el-voto-en-blanco",
    h1: "¿A quién beneficia el voto en blanco? Blanco, nulo y abstención",
    title: "¿A quién beneficia el voto en blanco? Efecto real",
    description:
      "El voto en blanco cuenta como válido y sube la barrera del 3 %; el nulo y la abstención no. Qué efecto tiene cada uno en el reparto de escaños.",
    lead:
      "El voto en blanco cuenta como voto válido, así que sube el número de votos que necesita una lista para llegar al 3 % de su provincia; no da escaños a nadie. El voto nulo y la abstención no cuentan para ese cálculo. En la mayoría de provincias el efecto es pequeño, pero puede afectar a partidos cerca del 3 %.",
    cta: S.loreg("acientosesentaytres", "artículo 163"),
    secondaryCta: R.nulo,
    sources: [S.loreg("acientosesentaytres", "artículo 163"), S.boe2023],
    related: [R.nulo, R.barrera, R.dhondt],
    faqs: [
      { q: "¿El voto en blanco va al partido más votado?", a: "No. No se asigna a ningún partido. Solo cuenta para calcular el 3 %." },
      { q: "¿Y el voto nulo?", a: "No cuenta como válido: no influye en el reparto." },
    ],
    sections: [
      {
        id: "tabla",
        title: "Efecto de cada opción",
        paragraphs: [],
        lists: [[
          "Voto a una candidatura: cuenta para el 3 % y para el reparto D'Hondt.",
          "Voto en blanco: cuenta para el 3 %, no para el reparto.",
          "Voto nulo: no cuenta en ninguno de los dos.",
          "Abstención: no cuenta en ninguno de los dos.",
        ]],
      },
    ],
  }),

  g({
    id: "29n-comparar-programas",
    path: "/elecciones/como-comparar-programas-electorales",
    h1: "Cómo comparar programas electorales cuando se publiquen",
    title: "Cómo comparar programas electorales: guía práctica",
    description:
      "Cinco pasos para comparar programas del 29-N: fuente oficial, coste, plazo, competencia y lo que dijeron antes. Mientras tanto, las promesas con fecha.",
    lead:
      "A 19 de octubre de 2026, nuestra página de programas indica que ningún partido ha publicado aún su programa para el 29-N. Cuando salgan, compáralos con el mismo método para todos: lee la fuente oficial, busca cuánto cuesta y cómo se paga, cuándo se haría, quién tiene la competencia y si encaja con lo que ese partido ha votado.",
    cta: { href: "/elecciones/programas-electorales-29n", label: "Estado de los programas del 29-N" },
    secondaryCta: { href: "/elecciones/promesas", label: "Promesas con fecha y fuente" },
    sources: [S.rd, S.ce("a149", "artículo 149: competencias del Estado")],
    related: [R.programas, R.promesas, R.bulos, R.campana],
    faqs: [
      { q: "¿Dónde leo los programas?", a: "En la web oficial de cada partido. En nuestra página de programas enlazaremos cada uno cuando se publique." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Cinco preguntas para cada propuesta",
        paragraphs: [],
        lists: [[
          "¿Está en el programa oficial o solo en un mitin?",
          "¿Dice cuánto cuesta y cómo se paga?",
          "¿Tiene plazo?",
          "¿Es competencia del Estado o de las comunidades autónomas?",
          "¿Qué votó ese partido sobre lo mismo en el Congreso?",
        ]],
      },
    ],
  }),
];
