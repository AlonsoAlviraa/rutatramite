import type { Guide, GuideChart, GuideTable } from "@/lib/tramites/types";

/**
 * Precampaña 29-N: bloque de encuestas y explicadores (v2, 19-10-2026).
 * Cada cifra sale de un documento citado (CIS, BOE/JEC, Constitución, LOREG, fichas de las encuestadoras)
 * o es un cálculo aritmético hecho a la vista sobre esos datos. Sin proyecciones propias.
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
  gad3: { href: "https://www.gad3.com/barometro-abc-estimacion-de-voto-nacional-octubre-2026/", label: "GAD3, 12 de octubre de 2026: Barómetro ABC y ficha técnica" },
  sigma1019: { href: "https://www.sigmados.com/noticia?id=EIJOKGN2GFZmhHt", label: "Sigma Dos, 19 de octubre de 2026: estimación para El Mundo y ficha técnica" },
  hamalgama1011: { href: "https://www.vozpopuli.com/espana/politica/el-psoe-no-consigue-rentabilizar-sus-decretos-de-vivienda-y-perderia-16-millones-de-votantes-y-18-escanos.html", label: "Vozpópuli, 11 de octubre de 2026: encuesta de Hamalgama Métrica y ficha técnica (PP 33,4 % según laSexta, 19-10-2026)" },
  socio1011: { href: "https://www.elespanol.com/espana/politica/20261011/sanchez-no-funciona-apropiarse-maricarmen-huelga-oposicion-cae-sondeo-noche/1003744416762_0.html", label: "El Español, 11 de octubre de 2026: encuesta de SocioMétrica y ficha técnica" },
  target1011: { href: "https://www.eldebate.com/espana/20261011/izquierda-apenas-reacciona-adelanto-frente-derecha-le-saca-casi-15-puntos_468080.html", label: "El Debate, 11 de octubre de 2026: encuesta de Target Point y ficha técnica" },
  dsevilla: { href: "https://www.diariodesevilla.es/espana/elecciones/encuestas-elecciones-generales-29-n_0_2008155768.html", label: "Diario de Sevilla, 14 de octubre de 2026: todas las encuestas del 29-N" },
  doble: { href: "https://doblelectura.es/guia/encuestas-elecciones-generales-2026", label: "Doble Lectura: fichas técnicas de las encuestas de octubre de 2026" },
  euronews: { href: "https://es.euronews.com/2026/10/14/cis-psoe-una-subida-34-saca-casi-12-puntos-al-pp-a-mes-y-medio-del-29n", label: "Euronews, 14 de octubre de 2026: CIS de octubre frente a GAD3 y 40dB" },
  eldiario2023: { href: "https://www.eldiario.es/politica/encuestas-fallaron-inflaron-pp-14-escanos-resultado-final-23j_1_10403177.html", label: "elDiario.es, 24 de julio de 2023: encuestas del 23J frente al resultado" },
  rtve2018: { href: "https://www.rtve.es/noticias/20181026/por-encuestas-del-cis-estan-ojo-del-huracan/1827067.shtml", label: "RTVE, 26 de octubre de 2018: por qué las encuestas del CIS son polémicas" },
  m20_2018: { href: "https://www.20minutos.es/noticia/3474770/0/cis-tezanos-explica-cocina-cis-reglas-tres-simpatia/", label: "20minutos, 2018: el CIS explica su estimación con voto y simpatía" },
  jec: { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario electoral de las elecciones generales 2026" },
  rd: { href: "https://www.boe.es/eli/es/rd/2026/10/05/806", label: "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre" },
  rd2019: { href: "https://www.boe.es/eli/es/rd/2019/09/24/551", label: "BOE: Real Decreto 551/2019, disolución y convocatoria del 10 de noviembre de 2019" },
  congreso: { href: "https://www.congreso.es/", label: "Congreso de los Diputados: diario de sesiones y votaciones de investidura" },
  cisWeb: { href: "https://www.cis.es/", label: "Centro de Investigaciones Sociológicas (CIS)" },
  loreg: (anchor: string, label: string) => ({ href: `${LOREG}#${anchor}`, label: `LOREG, ${label}` }),
  ce: (anchor: string, label: string) => ({ href: `${CE}#${anchor}`, label: `Constitución, ${label}` }),
};
const L69 = S.loreg("asesentaynueve", "artículo 69: encuestas");
const L163 = S.loreg("acientosesentaytres", "artículo 163: barrera del 3 % y D'Hondt");
const L162 = S.loreg("acientosesentaydos", "artículo 162: 350 diputados");

const R = {
  hub: { href: "/elecciones/encuestas-29n", label: "Últimas encuestas del 29-N con fuente y fecha" },
  cis: { href: "/elecciones/miente-el-cis", label: "¿Miente el CIS? Lo que dicen los datos" },
  cocina: { href: "/elecciones/cocina-de-las-encuestas", label: "Qué es la «cocina» de una encuesta" },
  hacer: { href: "/elecciones/como-se-hace-una-encuesta-electoral", label: "Cómo se hace una encuesta electoral" },
  directa: { href: "/elecciones/intencion-directa-vs-estimacion-de-voto", label: "Intención directa y estimación de voto" },
  margen: { href: "/elecciones/margen-de-error-encuestas", label: "Margen de error de una encuesta" },
  barometro: { href: "/elecciones/barometro-cis-que-es", label: "Qué es el barómetro del CIS" },
  historico: { href: "/elecciones/aciertos-y-fallos-de-las-encuestas", label: "Aciertos y fallos de las encuestas" },
  estudio: { href: "/elecciones/estudio-error-cis-generales", label: "Estudio: cuánto se equivocó el CIS en 12 estimaciones (2019–2023)" },
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
  resultados: { href: "/elecciones/resultados-y-escrutinio", label: "Resultados y escrutinio" },
  pensiones: { href: "/elecciones/quiere-algun-partido-quitar-las-pensiones", label: "¿Quiere algún partido quitar las pensiones?" },
  jec: { href: "/elecciones/junta-electoral-central", label: "Qué es la Junta Electoral Central" },
};

type Base = Omit<Guide, "pack" | "reviewedAt" | "disclaimer"> & { disclaimer?: string; reviewedAt?: string };
/** Sin aviso genérico: la nota de método va en «Fuentes y comprobación». Solo el hub lleva una línea propia. */
const g = (x: Base): Guide => ({ pack: "elecciones", reviewedAt, disclaimer: "", ...x });

const TABLA_OCT26: GuideTable = {
  caption: "Encuestas publicadas para el 29-N con trabajo de campo en octubre de 2026 (estimación sobre voto válido)",
  head: ["Encuesta y medio", "Campo", "Muestra y método", "PP", "PSOE", "Vox", "Fuente"],
  rows: [
    { cells: ["Sigma Dos para El Mundo (19-10-2026)", "1 al 14 de octubre", "3.007, teléfono (CATI) e internet (CAWI)", "31,5 %", "25,3 %", "19,5 %"], source: S.sigma1019 },
    { cells: ["CIS, barómetro de octubre (publicado el 14-10-2026)", "1 al 6 de octubre", "5.025 entrevistas", "22,2 %", "34 %", "17,1 %"], source: S.cis3582 },
    { cells: ["SocioMétrica para El Español (11-10-2026)", "10 y 11 de octubre", "1.000, panel por internet (CAWI)", "32,6 %", "26,2 %", "18,8 %"], source: S.socio1011 },
    { cells: ["Target Point para El Debate (11-10-2026)", "6 al 9 de octubre", "1.002, panel por internet (CAWI)", "32 %", "25,9 %", "18,7 %"], source: S.target1011 },
    { cells: ["GAD3 para ABC (12-10-2026)", "6 al 8 de octubre", "1.077, teléfono (926 móviles y 151 fijos)", "31,4 %", "26,4 %", "18,2 %"], source: S.gad3 },
    { cells: ["Hamalgama Métrica para Vozpópuli (11-10-2026)", "5 al 8 de octubre", "1.000, teléfono (CATI)", "33,4 %", "25,3 %", "19,6 %"], source: S.hamalgama1011 },
    { cells: ["Sigma Dos para El Mundo (11-10-2026)", "1 al 8 de octubre", "2.017, teléfono e internet", "31,9 %", "25,3 %", "19,1 %"], source: S.doble },
    { cells: ["NC Report para La Razón (8-10-2026)", "1 al 6 de octubre", "1.000, mitad teléfono y mitad internet", "34,1 %", "25 %", "18,2 %"], source: S.doble },
    { cells: ["40dB para El País y la SER (sondeo flash)", "7 y 8 de octubre", "800, internet", "31,9 %", "28,1 %", "18,9 %"], source: S.dsevilla },
    { cells: ["DYM para el Grupo Joly", "5 al 7 de octubre", "1.011, internet", "34 %", "28,2 %", "18,2 %"], source: S.dsevilla },
  ],
};

const TABLA_CIS: GuideTable = {
  caption: "Estimación final del CIS antes de cada elección general y resultado oficial (porcentaje sobre voto válido)",
  head: ["Elección", "Partido", "CIS", "Resultado oficial", "Diferencia", "Fuente"],
  rows: [
    { cells: ["28-A 2019", "PSOE", "30,2 %", "28,7 %", "+1,5"], source: S.cis3242 },
    { cells: ["28-A 2019", "PP", "17,2 %", "16,7 %", "+0,5"], source: S.cis3242 },
    { cells: ["28-A 2019", "Ciudadanos", "13,6 %", "15,9 %", "−2,3"], source: S.cis3242 },
    { cells: ["28-A 2019", "Vox", "11,9 %", "10,3 %", "+1,6"], source: S.cis3242 },
    { cells: ["10-N 2019", "PSOE", "32,2 %", "28,0 %", "+4,2"], source: S.cis3263 },
    { cells: ["10-N 2019", "PP", "18,1 %", "20,8 %", "−2,7"], source: S.cis3263 },
    { cells: ["10-N 2019", "Vox", "7,9 %", "15,1 %", "−7,2"], source: S.cis3263 },
    { cells: ["10-N 2019", "Ciudadanos", "10,6 %", "6,8 %", "+3,8"], source: S.cis3263 },
    { cells: ["23-J 2023", "PP", "31,4 %", "33,1 %", "−1,7"], source: S.cis3411 },
    { cells: ["23-J 2023", "PSOE", "31,2 %", "31,7 %", "−0,5"], source: S.cis3411 },
    { cells: ["23-J 2023", "Vox", "10,6 %", "12,4 %", "−1,8"], source: S.cis3411 },
    { cells: ["23-J 2023", "Sumar", "16,4 %", "12,3 %", "+4,1"], source: S.cis3411 },
  ],
};

const E = (label: string, value: number, group: string) => ({ label, value, group });
/** Diferencia CIS − resultado oficial (puntos), de TABLA_CIS. Partidos en el orden de votos de 2023. */
const CHART_CIS: GuideChart = {
  kind: "bars",
  unit: " p.",
  caption: "Diferencia entre la estimación final del CIS y el resultado oficial, en puntos (positivo: el CIS dio más de lo que salió).",
  note: "Fuente: estudios 3242, 3263 y 3411 del CIS y resultados oficiales publicados en el BOE.",
  rows: [
    E("PP", 0.5, "Abril de 2019"), E("PSOE", 1.5, "Abril de 2019"), E("Vox", 1.6, "Abril de 2019"), E("Ciudadanos", -2.3, "Abril de 2019"),
    E("PP", -2.7, "Noviembre de 2019"), E("PSOE", 4.2, "Noviembre de 2019"), E("Vox", -7.2, "Noviembre de 2019"), E("Ciudadanos", 3.8, "Noviembre de 2019"),
    E("PP", -1.7, "Julio de 2023"), E("PSOE", -0.5, "Julio de 2023"), E("Vox", -1.8, "Julio de 2023"), E("Sumar", 4.1, "Julio de 2023"),
  ],
};
const CHART_ERROR_MEDIO: GuideChart = {
  kind: "bars",
  unit: " p.",
  caption: "Error medio del CIS en los cuatro partidos principales de cada elección general, en puntos.",
  note: "Media de las diferencias sin signo; datos del CIS y del BOE.",
  rows: [
    { label: "Abril de 2019", value: 1.5 },
    { label: "Noviembre de 2019", value: 4.5 },
    { label: "Julio de 2023", value: 2.0 },
  ],
};
const CHART_OCT26: GuideChart = {
  kind: "ranges",
  unit: " %",
  caption: "Rango de las nueve encuestas privadas de octubre de 2026 (barra) y barómetro del CIS de octubre (marca).",
  note: "Datos de la tabla de esta página, con la fuente de cada encuesta.",
  rows: [
    { label: "PP", min: 31.4, max: 34.1, marker: 22.2, markerLabel: "CIS" },
    { label: "PSOE", min: 25, max: 28.2, marker: 34, markerLabel: "CIS" },
    { label: "Vox", min: 18.2, max: 19.6, marker: 17.1, markerLabel: "CIS" },
  ],
};

const TABLA_ESCANOS: GuideTable = {
  caption: "Horquilla de escaños del CIS antes del 23-J de 2023 y escaños oficiales",
  head: ["Partido", "Horquilla CIS", "Anchura", "Escaños oficiales", "¿Dentro?", "Fuente"],
  rows: [
    { cells: ["PP", "122 a 140", "18", "137", "Sí"], source: S.cis3411 },
    { cells: ["PSOE", "115 a 135", "20", "121", "Sí"], source: S.cis3411 },
    { cells: ["Sumar", "43 a 50", "7", "31", "No, 12 por debajo"], source: S.cis3411 },
    { cells: ["Vox", "21 a 29", "8", "33", "No, 4 por encima"], source: S.cis3411 },
  ],
};

const TABLA_2023_PRIV: GuideTable = {
  caption: "Encuestas privadas del 23-J de 2023 frente a los escaños oficiales del PP (137)",
  head: ["Encuesta", "Tipo", "PP (escaños)", "Otros datos", "Fuente"],
  rows: [
    { cells: ["40dB (El País y SER)", "Última preelectoral", "135", "PP 32,9 %"], source: S.eldiario2023 },
    { cells: ["Simple Lógica (elDiario.es)", "Campo 11 al 13 de julio", "130 a 138", "PP + Vox: 164 a 178"], source: S.eldiario2023 },
    { cells: ["GAD3 (RTVE y Forta)", "A pie de urna, 20:00", "150", "PSOE 112, Sumar 21"], source: S.eldiario2023 },
    { cells: ["Sigma Dos (RTVE y Forta)", "A pie de urna, 20:00", "145 a 150", "PSOE 113 a 118"], source: S.eldiario2023 },
    { cells: ["Resultado oficial", "BOE", "137", "PSOE 121, Vox 33, Sumar 31"], source: S.boe2023 },
  ],
};

export const ENCUESTAS_29N_GUIDES: Guide[] = [
  // 1 · HUB
  g({
    id: "29n-encuestas-hub",
    reviewedAt: "2026-10-21",
    path: "/elecciones/encuestas-29n",
    h1: "Encuestas de las elecciones del 29-N: las últimas, con fuente y fecha",
    title: "Encuestas elecciones 29-N: últimas, con fuente y fecha",
    description:
      "Encuestas del 29-N de octubre de 2026 con campo, muestra y fuente: CIS, Sigma Dos, GAD3, SocioMétrica, Target Point, NC Report, 40dB y más.",
    lead:
      "Las nueve encuestas privadas publicadas en octubre de 2026 que recogemos (dos de ellas de Sigma Dos, la última el 19 de octubre) ponen primero al PP, entre el 31,4 % y el 34,1 %, y el barómetro del CIS pone primero al PSOE (34 %). Vox aparece tercero en todas, entre el 17,1 % y el 19,6 %. La diferencia entre el CIS y el resto viene sobre todo del método de estimación, no de la fecha.",
    cta: S.cis3582,
    secondaryCta: S.gad3,
    disclaimer: "Encuestas, no resultados. Se pueden publicar hasta el 23 de noviembre; del 24 al 28 está prohibido (artículo 69.7 de la LOREG).",
    sources: [S.sigma1019, S.socio1011, S.target1011, S.hamalgama1011, S.cis3582, S.cis3582avance, S.gad3, S.doble, S.dsevilla, S.euronews, S.jec, L69],
    related: [R.cis, R.estudio, R.cocina, R.directa, R.margen, R.leer, R.historico, R.escanosEnc, R.mayoria, R.prohibidas],
    faqs: [
      { q: "¿Quién va primero en las encuestas del 29-N?", a: "En las privadas de octubre de 2026, el PP: Sigma Dos 31,5 % (19-10) y 31,9 % (11-10), GAD3 31,4 %, SocioMétrica 32,6 %, Target Point 32 %, Hamalgama 33,4 %, NC Report 34,1 %, 40dB 31,9 % y DYM 34 %. En el barómetro del CIS de octubre, el PSOE, con el 34 %." },
      { q: "¿Suman mayoría PP y Vox en las encuestas?", a: "En las privadas que publican escaños, sí: según el resumen de Diario de Sevilla del 14 de octubre, PP y Vox suman entre 189 y 212 escaños. La de Sigma Dos del 19 de octubre les da entre 197 y 205 (132–137 el PP y 65–68 Vox) y la de SocioMétrica del 11 de octubre, 205 (141 y 64). El barómetro del CIS no da escaños; en porcentaje, PP y Vox suman el 39,3 % y el PSOE, el 34 %." },
      { q: "¿Por qué el CIS da datos tan distintos a los privados?", a: "Porque convierte las respuestas en estimación con otro modelo. El CIS usa desde 2019 un modelo de escenarios propio; las privadas suelen ponderar por lo que cada persona votó en 2023. Con respuestas parecidas, dos modelos pueden dar ganadores distintos." },
      { q: "¿Cuál es la encuesta más fiable?", a: "Ninguna acierta siempre. En 2023 el CIS se acercó en el PSOE y falló en Sumar; 40dB casi clavó los escaños del PP y GAD3, a pie de urna, le dio 13 de más. Lo útil es mirar la tendencia de cada empresa y su ficha técnica." },
      { q: "¿Hasta cuándo se publican encuestas?", a: "Hasta el lunes 23 de noviembre. Del 24 al 28 de noviembre de 2026 no se pueden publicar ni difundir sondeos (artículo 69.7 de la LOREG y calendario de la Junta Electoral Central)." },
      { q: "¿Cuándo sale la próxima encuesta del CIS?", a: "El CIS publica un barómetro cada mes y antes de las generales suele hacer una macroencuesta preelectoral, como en 2019 y 2023. La añadiremos aquí en cuanto se publique." },
    ],
    sections: [
      {
        id: "tabla",
        title: "Todas las encuestas de octubre, con su ficha",
        paragraphs: ["Ordenadas por fecha de publicación. La columna «Campo» dice cuándo se preguntó, que es lo que importa."],
        table: TABLA_OCT26,
      },
      {
        id: "lo-que-coincide",
        title: "En qué coinciden y en qué no",
        paragraphs: [],
        chart: CHART_OCT26,
        lists: [[
          "Vox es tercero en todas, con un rango estrecho: del 17,1 % (CIS) al 19,6 % (Hamalgama).",
          "El PP va del 22,2 % (CIS) al 34,1 % (NC Report). Sin el CIS, el rango es 31,4–34,1 %.",
          "El PSOE va del 25 % (NC Report) al 34 % (CIS). Sin el CIS, 25–28,2 %.",
          "La distancia PP–PSOE va de 9,1 puntos a favor del PP (NC Report) a 11,8 a favor del PSOE (CIS).",
        ]],
      },
      {
        id: "por-que-difieren",
        title: "Por qué el CIS y las privadas no coinciden",
        paragraphs: [
          "Las respuestas brutas no están tan lejos como la estimación final. En el CIS de octubre, el voto directo es PSOE 25,3 %, PP 14,7 % y Vox 11,6 %, con un 17,3 % que no sabe. Si solo quitamos a quien no sabe, no contesta, no votaría o vota nulo, sale PSOE 34,6 %, PP 20,1 % y Vox 15,9 %. El modelo del CIS termina en 34 %, 22,2 % y 17,1 %.",
          "Las privadas corrigen además por recuerdo de voto: si en su muestra hay más votantes de un partido de 2023 de los que hubo realmente, les dan menos peso. El CIS dejó de hacerlo en 2018 y desde 2019 aplica su «modelo bidimensional inercia-incertidumbre Alaminos-Tezanos», según su nota metodológica.",
          "También cambia el canal: teléfono (GAD3, Hamalgama), internet (40dB, DYM, SocioMétrica, Target Point) o mixto (Sigma Dos, NC Report). Cada canal llega mejor a unos perfiles que a otros.",
        ],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: [],
        lists: [[
          "Compara cada encuesta con la anterior de la misma empresa: la tendencia dice más que el dato suelto.",
          "Una diferencia menor que el margen de error (unos ±3 puntos con 1.000 entrevistas) es un empate.",
          "Los escaños dependen de cada provincia: dos encuestas con el mismo porcentaje pueden dar escaños distintos.",
          "En 2019 y 2023 hubo errores de varios puntos en todas las casas: repasa los aciertos y fallos antes de dar nada por hecho.",
        ]],
      },
    ],
  }),

  // 2 · ¿MIENTE EL CIS?
  g({
    id: "29n-miente-cis",
    path: "/elecciones/miente-el-cis",
    h1: "¿Miente el CIS? Qué dicen los datos y qué dice cada parte",
    title: "¿Miente el CIS? Datos de 2019 y 2023 y su método",
    description:
      "El error del CIS frente a los resultados oficiales de 2019 y 2023, partido a partido, su cambio de método en 2018, las críticas y su respuesta.",
    lead:
      "Los datos no permiten afirmar que el CIS mienta, pero sí medir cuánto se equivoca. Su error medio en los cuatro grandes partidos fue de 1,5 puntos en abril de 2019, de 4,5 en noviembre de 2019 y de 2 en 2023. En 2023 acertó al PSOE por medio punto y sobreestimó a Sumar en 4,1.",
    cta: S.cis3411,
    secondaryCta: S.boe2023,
    sources: [S.cis3242, S.cis3263, S.cis3411, S.cis3411nota, S.cis3582, S.boe2019a, S.boe2019n, S.boe2023, S.loreg("asesentaynueve", "artículo 69.8: encuestas de organismos públicos"), S.rtve2018, S.m20_2018, S.euronews, S.eldiario2023],
    related: [R.estudio, R.cocina, R.directa, R.historico, R.barometro, R.hub, R.margen, R.indecisos],
    faqs: [
      { q: "¿Acertó el CIS en 2023?", a: "En parte. Estimó al PP en 31,4 % (sacó 33,1 %) y al PSOE en 31,2 % (sacó 31,7 %), pero dio a Sumar un 16,4 % (sacó 12,3 %) y a Vox un 10,6 % (sacó 12,4 %). PP y PSOE quedaron dentro de su horquilla de escaños; Sumar y Vox, fuera." },
      { q: "¿Y en 2019?", a: "En abril de 2019 dio al PSOE un 30,2 % (sacó 28,7 %). En noviembre le dio un 32,2 % (sacó 28,0 %) y a Vox un 7,9 % (sacó 15,1 %), su mayor error reciente." },
      { q: "¿Se equivoca siempre a favor del mismo partido?", a: "Al PSOE lo sobreestimó en 2019 (+1,5 en abril y +4,2 en noviembre) y lo subestimó ligeramente en 2023 (−0,5). Al PP lo subestimó en noviembre de 2019 y en 2023. Con tres elecciones no hay datos para hablar de una regla fija." },
      { q: "¿Qué dicen sus críticos?", a: "Que desde 2018 el CIS dejó de ponderar por recuerdo de voto y usa la simpatía y modelos propios que, según ellos, favorecen al PSOE. El PP le acusa de sobrestimar a la izquierda y en mayo de 2026 presentó una querella contra su presidente, José Félix Tezanos, ante el Supremo (Euronews). Una querella no es una condena." },
      { q: "¿Qué responde el CIS?", a: "Que su estimación «no posee intención prospectiva»: mide el estado del electorado durante el trabajo de campo, no pronostica el resultado. Y que publica los microdatos de todos sus estudios para que cualquiera aplique otro modelo." },
      { q: "¿Puedo comprobarlo yo?", a: "Sí. Descarga los microdatos en cis.es y aplica tu propia ponderación, o repite la cuenta de esta página con los PDF de estimación del CIS y los resultados del BOE enlazados abajo." },
      { q: "¿Las encuestas privadas aciertan más?", a: "Depende del año. En 2023 la mayoría dio al PP más escaños de los que sacó, y la encuesta a pie de urna de GAD3 le dio 150 frente a 137." },
    ],
    sections: [
      {
        id: "datos",
        title: "El CIS frente al resultado oficial, partido a partido",
        paragraphs: ["Última encuesta preelectoral del CIS antes de cada elección general frente al resultado del BOE, redondeado a un decimal. Diferencia en puntos: positiva si el CIS dio más de lo que salió."],
        chart: CHART_CIS,
        table: TABLA_CIS,
      },
      {
        id: "error-medio",
        title: "El error medio, calculado",
        paragraphs: ["Suma de las diferencias sin signo de los cuatro partidos, dividida entre cuatro:"],
        lists: [[
          "Abril de 2019: (1,5 + 0,5 + 2,3 + 1,6) / 4 = 1,5 puntos.",
          "Noviembre de 2019: (4,2 + 2,7 + 7,2 + 3,8) / 4 = 4,5 puntos.",
          "Julio de 2023: (1,7 + 0,5 + 1,8 + 4,1) / 4 = 2,0 puntos.",
        ]],
      },
      {
        id: "escanos-2023",
        title: "Las horquillas de escaños de 2023",
        paragraphs: ["Cuanto más ancha la horquilla, más fácil acertar. Las de PP y PSOE tenían 18 y 20 escaños de ancho."],
        table: TABLA_ESCANOS,
      },
      {
        id: "metodo",
        title: "Qué cambió en el método en 2018",
        paragraphs: [
          "Hasta 2018, el CIS corregía las respuestas con el recuerdo de voto y otros ajustes, la llamada «cocina». Con José Félix Tezanos como presidente empezó a combinar voto directo y simpatía, y desde 2019 aplica un modelo de escenarios que llama «bidimensional inercia-incertidumbre Alaminos-Tezanos».",
          "Ese cambio rompió la comparación con la serie anterior, como explicó RTVE en octubre de 2018. Por eso aquí solo comparamos elecciones con el método actual.",
        ],
      },
      {
        id: "dos-posturas",
        title: "Las dos posturas",
        paragraphs: [],
        lists: [[
          "Críticas: el PP acusa al CIS de sobrestimar a la izquierda; Tezanos fue durante décadas militante del PSOE y miembro de su Ejecutiva Federal (Euronews, 14-10-2026). Analistas citados por RTVE en 2018 señalaron que usar la simpatía podía favorecer al partido del Gobierno.",
          "CIS: su estimación es una foto del momento, no un pronóstico, y los microdatos están en abierto.",
          "La ley: si un organismo público hace encuestas de intención de voto en periodo electoral, los partidos pueden pedir los resultados y deben recibirlos en 48 horas (artículo 69.8 de la LOREG).",
        ]],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Usa el CIS como una encuesta más, con su historial: en noviembre de 2019 se alejó mucho y en 2023 quedó cerca en los dos grandes. Compáralo con su propio barómetro anterior y fíjate en el voto directo, que no depende del modelo."],
      },
    ],
  }),

  // 3 · COCINA
  g({
    id: "29n-cocina-encuestas",
    path: "/elecciones/cocina-de-las-encuestas",
    h1: "Qué es la «cocina» de una encuesta electoral",
    title: "La «cocina» de las encuestas: qué es, con un ejemplo real",
    description:
      "La cocina convierte respuestas en estimación de voto. Cómo pasó el CIS de 25,4 % a 31,4 % para el PP en 2023, paso a paso, y qué ajustes hace cada casa.",
    lead:
      "La «cocina» es el conjunto de ajustes que convierten lo que contestan los entrevistados en una estimación de voto. En el preelectoral de 2023, el PP tenía un 25,4 % de voto directo y el CIS publicó un 31,4 %: unos 6 puntos salen de quitar a indecisos y abstencionistas, y menos de medio punto, del modelo.",
    cta: S.cis3411,
    secondaryCta: S.cis3582,
    sources: [S.cis3411, S.cis3582, S.cis3242, S.rtve2018, S.m20_2018],
    related: [R.directa, R.cis, R.indecisos, R.hacer, R.ficha, R.hub],
    faqs: [
      { q: "¿La cocina es manipular?", a: "No por sí misma: es un modelo estadístico para corregir una muestra imperfecta. Se vuelve un problema si no se explica o si empuja siempre en la misma dirección. Por eso conviene ver el voto directo junto a la estimación." },
      { q: "¿Todas las encuestadoras cocinan?", a: "Todas las que publican estimación aplican un modelo. Lo que cambia es cuál: recuerdo de voto, simpatía, probabilidad de ir a votar o escenarios, como el CIS." },
      { q: "¿Cuánto mueve la cocina?", a: "En el CIS de octubre de 2026, el PP pasa del 20,1 % (solo quitando indecisos y abstención) al 22,2 % estimado, y el PSOE del 34,6 % al 34 %. En 2023 el ajuste fue de menos de un punto por partido." },
      { q: "¿Qué es el recuerdo de voto?", a: "La pregunta «¿a quién votaste en las últimas generales?». Si en la muestra hay más votantes de un partido de los que hubo en realidad, se les da menos peso. Las privadas la usan mucho; el CIS dejó de usarla para ponderar en 2018." },
      { q: "¿Por qué el voto en blanco cambia tanto?", a: "En el CIS de octubre de 2026, el 3,2 % dijo que votaría en blanco y la estimación lo deja en el 0,3 %. Es un buen ejemplo de cuánto decide el modelo." },
    ],
    sections: [
      {
        id: "ejemplo-2023",
        title: "Ejemplo real: del 25,4 % al 31,4 % (CIS, 2023)",
        paragraphs: ["Estudio 3411, con 29.201 entrevistas. Voto directo sobre el total: PP 25,4 %, PSOE 24,6 %, Sumar 12,7 %, Vox 8,8 %. Además: no sabe 14,1 %, no contesta 2,8 %, no votaría 2,3 %, nulo 0,8 %."],
        lists: [[
          "Paso 1. Quitar a quien no da un voto válido: 100 − 14,1 − 2,8 − 2,3 − 0,8 = 80 % de la muestra.",
          "Paso 2. Repartir sobre ese 80 %: PP 25,4 / 80 = 31,8 %; PSOE 24,6 / 80 = 30,8 %; Sumar 12,7 / 80 = 15,9 %; Vox 8,8 / 80 = 11 %.",
          "Paso 3. Aplicar el modelo. El CIS publicó PP 31,4 %, PSOE 31,2 %, Sumar 16,4 % y Vox 10,6 %.",
          "Conclusión: el modelo movió cada partido menos de medio punto. Casi todo el salto era aritmética.",
        ]],
      },
      {
        id: "ejemplo-2026",
        title: "El mismo cálculo con el CIS de octubre de 2026",
        paragraphs: ["Estudio 3582: no sabe 17,3 %, no contesta 2,6 %, no votaría 5,1 %, nulo 1,9 %. Queda un 73,1 % de voto válido."],
        table: {
          caption: "Del voto directo a la estimación: CIS, octubre de 2026",
          head: ["Opción", "Voto directo", "Solo aritmética", "Estimación CIS", "Efecto del modelo", "Fuente"],
          rows: [
            { cells: ["PSOE", "25,3 %", "34,6 %", "34 %", "−0,6"], source: S.cis3582 },
            { cells: ["PP", "14,7 %", "20,1 %", "22,2 %", "+2,1"], source: S.cis3582 },
            { cells: ["Vox", "11,6 %", "15,9 %", "17,1 %", "+1,2"], source: S.cis3582 },
            { cells: ["En blanco", "3,2 %", "4,4 %", "0,3 %", "−4,1"], source: S.cis3582 },
          ],
        },
      },
      {
        id: "ingredientes",
        title: "Los ingredientes habituales",
        paragraphs: [],
        lists: [[
          "Ponderar por sexo, edad y territorio para que la muestra se parezca a la población.",
          "Ponderar por recuerdo de voto, comparando con el resultado real de 2023.",
          "Asignar a los indecisos según simpatía, ideología o valoración de líderes.",
          "Estimar la participación: no todo el que dice que votará vota.",
          "En 2019, el CIS describía su estimación como filtrado, ponderación e imputación con 108 variables (estudio 3242).",
        ]],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Antes de fiarte de una estimación, busca el voto directo y el porcentaje de «no sabe». Si hay muchos indecisos, la cocina pesa más y la estimación es más frágil."],
      },
    ],
  }),

  // 4 · CÓMO SE HACE
  g({
    id: "29n-como-se-hace-encuesta",
    path: "/elecciones/como-se-hace-una-encuesta-electoral",
    h1: "Cómo se hace una encuesta electoral, paso a paso",
    title: "Cómo se hace una encuesta electoral paso a paso",
    description:
      "Muestra, cuestionario, campo, ponderación y estimación, con las fichas reales de GAD3, Sigma Dos, NC Report, 40dB y el CIS de octubre de 2026.",
    lead:
      "Se elige una muestra de entre 800 y 5.000 personas, se les pregunta en pocos días por teléfono, internet o en persona, se corrige la muestra para que se parezca al censo y se estima el voto. En octubre de 2026, GAD3 hizo 1.077 entrevistas telefónicas de 4 a 5 minutos y el CIS, 5.025.",
    cta: S.gad3,
    secondaryCta: S.cis3582,
    sources: [S.gad3, S.doble, S.dsevilla, S.cis3582, L69],
    related: [R.ficha, R.margen, R.cocina, R.directa, R.leer, R.hub],
    faqs: [
      { q: "¿Cuántas personas hacen falta?", a: "Con unas 1.000 entrevistas el margen teórico nacional es de unos ±3,1 puntos. Para dividir el margen entre dos hay que multiplicar la muestra por cuatro." },
      { q: "¿Es mejor por teléfono o por internet?", a: "Ninguno es perfecto. El teléfono llega peor a quien no coge números desconocidos; internet, a quien no está en paneles online. Por eso Sigma Dos y NC Report combinan ambos." },
      { q: "¿Me pueden llamar a mí?", a: "Sí. Las encuestadoras eligen números de móvil y fijo con cuotas por sexo, edad y territorio. Puedes negarte." },
      { q: "¿Cuánto dura una entrevista?", a: "GAD3 indica entre 4 y 5 minutos para su barómetro de octubre de 2026. Los estudios del CIS son más largos porque incluyen muchas más preguntas." },
      { q: "¿Quién paga las encuestas?", a: "Las privadas las encargan sobre todo medios: ABC (GAD3), El Mundo (Sigma Dos), La Razón (NC Report), El País y la SER (40dB). El CIS es un organismo público. La ley obliga a decir quién encarga cada sondeo publicado." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Los cinco pasos",
        paragraphs: [],
        lists: [[
          "1. Muestra: a quién preguntar, normalmente con cuotas de sexo, edad y territorio según el censo del INE.",
          "2. Cuestionario: intención de voto, recuerdo de voto de 2023, simpatía, ideología y valoración de líderes.",
          "3. Trabajo de campo: de 2 a 8 días. Es la fecha que cuenta.",
          "4. Ponderación: se corrigen los desequilibrios de la muestra.",
          "5. Estimación: del voto declarado al porcentaje sobre voto válido y, a veces, a escaños.",
        ]],
      },
      {
        id: "comparativa",
        title: "Cómo lo hicieron las encuestas de octubre de 2026",
        paragraphs: [],
        table: {
          caption: "Método de cada encuesta según su ficha técnica",
          head: ["Encuesta", "Entrevistas", "Método", "Campo", "Error declarado", "Fuente"],
          rows: [
            { cells: ["GAD3 / ABC", "1.077", "Teléfono: 926 móviles y 151 fijos", "6 al 8 de octubre", "±3,1 (95,5 %)"], source: S.gad3 },
            { cells: ["Sigma Dos / El Mundo", "2.017", "Teléfono y panel online", "1 al 8 de octubre", "±2,2 (95,5 %)"], source: S.doble },
            { cells: ["NC Report / La Razón", "1.000", "Mitad teléfono, mitad internet", "1 al 6 de octubre", "±3,17 (95,5 %)"], source: S.doble },
            { cells: ["40dB / El País y SER", "800", "Internet", "7 y 8 de octubre", "No figura en la fuente"], source: S.dsevilla },
            { cells: ["CIS", "5.025", "Ver ficha del estudio 3582", "1 al 6 de octubre", "±1,2 en PSOE y PP"], source: S.cis3582 },
          ],
        },
      },
      {
        id: "checklist",
        title: "Checklist para evaluar cómo se hizo",
        paragraphs: [],
        lists: [[
          "¿Cuántas entrevistas y por qué canal?",
          "¿Qué días se hizo el campo? ¿Pasó algo relevante esos días?",
          "¿Con qué cuotas o ponderaciones?",
          "¿Publica el texto de las preguntas? La LOREG lo exige (artículo 69.1.c); según Doble Lectura, GAD3, Sigma Dos y NC Report no lo publicaron en octubre.",
          "¿Da voto directo además de estimación?",
        ]],
      },
    ],
  }),
  // 5 · DIRECTA VS ESTIMACIÓN
  g({
    id: "29n-directa-vs-estimacion",
    path: "/elecciones/intencion-directa-vs-estimacion-de-voto",
    h1: "Intención directa de voto y estimación de voto: la diferencia",
    title: "Intención directa vs estimación de voto: diferencia",
    description:
      "Voto directo es lo que contesta la gente sobre el total; estimación, el cálculo sobre voto válido. Cómo leer las dos columnas del CIS, con datos de 2023 y 2026.",
    lead:
      "La intención directa es el porcentaje de entrevistados que nombra a cada partido, contando a quien no sabe o no votará. La estimación es el porcentaje calculado sobre voto válido tras el modelo. Por eso el PSOE tiene un 25,3 % directo y un 34 % estimado en el CIS de octubre de 2026.",
    cta: S.cis3582,
    secondaryCta: S.cis3411,
    sources: [S.cis3582, S.cis3411],
    related: [R.cocina, R.cis, R.indecisos, R.leer, R.hub, R.barometro],
    faqs: [
      { q: "¿Qué dato sale en los titulares?", a: "Casi siempre la estimación, porque tiene el formato del resultado electoral: porcentaje sobre voto válido." },
      { q: "¿Qué dato es más fiable?", a: "Ninguno es el resultado. La intención directa no tiene modelo, pero incluye a quien no votará. La estimación intenta parecerse al resultado, pero depende del modelo." },
      { q: "¿Por qué el PP sale tan bajo en voto directo en el CIS?", a: "En octubre de 2026 el PP tiene un 14,7 % directo frente al 25,3 % del PSOE. Parte de la diferencia puede deberse a quién responde a la encuesta; corregir eso es lo que hacen los modelos, cada uno a su manera." },
      { q: "¿Las privadas publican voto directo?", a: "Algunas lo dan en sus informes completos, pero las piezas en prensa suelen mostrar solo la estimación. Búscalo en la web de la encuestadora." },
      { q: "¿El voto directo suma 100?", a: "Sí, incluyendo no sabe, no contesta, abstención, nulo y blanco. La estimación suma 100 solo con partidos y blanco." },
    ],
    sections: [
      {
        id: "definiciones",
        title: "Las tres columnas que verás",
        paragraphs: [],
        lists: [[
          "Voto directo: «¿A quién votarías?». Se calcula sobre todos los entrevistados (en % sobre censo, dice el CIS).",
          "Voto + simpatía: el voto directo más quien no lo dice pero declara simpatía por un partido.",
          "Estimación: el porcentaje sobre voto válido (partidos más blanco) tras el modelo.",
        ]],
      },
      {
        id: "tabla-2026",
        title: "Octubre de 2026: las dos columnas del CIS",
        paragraphs: [],
        table: {
          caption: "Voto directo (sobre censo) y estimación (sobre voto válido), estudio 3582",
          head: ["Opción", "Voto directo", "Estimación", "Fuente"],
          rows: [
            { cells: ["PSOE", "25,3 %", "34 %"], source: S.cis3582 },
            { cells: ["PP", "14,7 %", "22,2 %"], source: S.cis3582 },
            { cells: ["Vox", "11,6 %", "17,1 %"], source: S.cis3582 },
            { cells: ["SUMAR / Frente Amplio", "4,5 %", "6,1 %"], source: S.cis3582 },
            { cells: ["Podemos", "2,2 %", "3,1 %"], source: S.cis3582 },
            { cells: ["No sabe", "17,3 %", "—"], source: S.cis3582 },
            { cells: ["No votaría", "5,1 %", "—"], source: S.cis3582 },
          ],
        },
      },
      {
        id: "tabla-2023",
        title: "Julio de 2023, para comparar",
        paragraphs: ["En el preelectoral de 2023 había menos indecisos (14,1 % «no sabe») y PP y PSOE estaban empatados también en voto directo: 25,4 % y 24,6 %. Su estimación fue 31,4 % y 31,2 %; el resultado, 33,1 % y 31,7 %."],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Si dos partidos están igualados en voto directo y muy separados en estimación, la diferencia la ha puesto el modelo. Si están separados en las dos, viene de las respuestas. El cálculo paso a paso está en «Qué es la cocina»."],
      },
    ],
  }),

  // 6 · MARGEN DE ERROR
  g({
    id: "29n-margen-error",
    path: "/elecciones/margen-de-error-encuestas",
    h1: "El margen de error de una encuesta, explicado",
    title: "Margen de error de una encuesta: qué significa",
    description:
      "Calcula el margen de error para 1.000, 3.000 y 29.201 entrevistas paso a paso, qué es un empate técnico y por qué la distancia entre dos partidos tiene más margen.",
    lead:
      "Con 1.000 entrevistas al azar, el margen de error es de ±3,1 puntos con un 95 % de confianza: 1,96 × √(0,5 × 0,5 / 1.000). Con 3.000 baja a ±1,8 y con 29.201, a ±0,6. La distancia entre dos partidos tiene un margen mayor que el de cada partido.",
    cta: S.gad3,
    secondaryCta: S.cis3411,
    sources: [S.gad3, S.doble, S.dsevilla, S.cis3411, S.cis3582],
    related: [R.leer, R.ficha, R.hacer, R.escanosEnc, R.hub, R.historico],
    faqs: [
      { q: "¿Qué es un empate técnico?", a: "Cuando la diferencia entre dos partidos es menor que su margen de error. El CIS llamó así en 2023 a su estimación de PP (31,4 %) y PSOE (31,2 %)." },
      { q: "¿Por qué unas fichas dicen 95 % y otras 95,5 %?", a: "El 95 % usa 1,96 desviaciones típicas; el 95,5 %, 2 («dos sigmas»), como GAD3 y Sigma Dos. Con 1.077 entrevistas salen ±2,99 y ±3,05 puntos; GAD3 publica ±3,1." },
      { q: "¿El margen incluye todos los errores?", a: "No. Solo el de muestreo. No cubre que un tipo de votante conteste menos, que la gente cambie de opinión o que falle el modelo de estimación. Por eso los errores reales suelen ser mayores." },
      { q: "¿Sirve el margen para una provincia?", a: "Solo con las entrevistas de esa provincia. Si una encuesta nacional de 1.000 tiene 40 en tu provincia, el margen allí es de unos ±15 puntos." },
      { q: "¿Más muestra siempre es mejor?", a: "Reduce el error de muestreo, pero no corrige sesgos. Una muestra enorme mal hecha puede fallar más que una pequeña bien hecha." },
      { q: "¿Las encuestas online tienen margen de error?", a: "Las fichas lo publican, pero la fórmula supone muestreo aleatorio y los paneles online no lo son en sentido estricto. Tómalo como orientativo." },
    ],
    sections: [
      {
        id: "formula",
        title: "La fórmula, paso a paso",
        paragraphs: ["Margen = z × √(p × (1 − p) / n), con p = 0,5 (el caso más desfavorable) y z = 1,96 para el 95 % de confianza."],
        lists: [[
          "n = 1.000: 0,25 / 1.000 = 0,00025 → √ = 0,0158 → × 1,96 = 0,031 → ±3,1 puntos.",
          "n = 3.000: 0,25 / 3.000 = 0,0000833 → √ = 0,00913 → × 1,96 = 0,0179 → ±1,8 puntos.",
          "n = 29.201 (CIS, 2023): 0,25 / 29.201 = 0,00000856 → √ = 0,00293 → × 1,96 = 0,0057 → ±0,6 puntos.",
        ]],
      },
      {
        id: "tabla",
        title: "Margen según la muestra, con encuestas reales",
        paragraphs: [],
        table: {
          caption: "Margen teórico al 95 % con p = 0,5",
          head: ["Entrevistas", "Margen", "Encuesta de referencia", "Fuente"],
          rows: [
            { cells: ["800", "±3,5", "40dB, sondeo flash de octubre de 2026"], source: S.dsevilla },
            { cells: ["1.077", "±3,0 (GAD3 publica ±3,1 al 95,5 %)", "GAD3 para ABC, octubre de 2026"], source: S.gad3 },
            { cells: ["2.017", "±2,2", "Sigma Dos para El Mundo, octubre de 2026"], source: S.doble },
            { cells: ["5.025", "±1,4", "CIS, barómetro de octubre de 2026"], source: S.cis3582 },
            { cells: ["29.201", "±0,6", "CIS, preelectoral de 2023"], source: S.cis3411 },
          ],
        },
      },
      {
        id: "distancia",
        title: "Ejemplo: ¿va de verdad el PP por delante en GAD3?",
        paragraphs: [
          "GAD3 da PP 31,4 % y PSOE 26,4 %: 5 puntos de distancia con 1.077 entrevistas. El margen de la distancia entre dos partidos es 1,96 × √((p1 + p2 − (p1 − p2)²) / n) = 1,96 × √((0,314 + 0,264 − 0,0025) / 1.077) = ±4,5 puntos.",
          "Como 5 es algo más que 4,5, la ventaja queda justo fuera del margen. La fórmula se aplica a respuestas brutas; aquí la usamos sobre la estimación publicada, así que es un cálculo orientativo.",
        ],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: [],
        lists: [[
          "Un cambio de 1 punto de un mes a otro en una encuesta de 1.000 está dentro del margen.",
          "Para saber si alguien «va delante», compara la distancia con unos 4–5 puntos en encuestas de 1.000.",
          "Los datos por provincia o por edad de una encuesta nacional tienen márgenes mucho mayores.",
        ]],
      },
    ],
  }),

  // 7 · BARÓMETRO CIS
  g({
    id: "29n-barometro-cis",
    path: "/elecciones/barometro-cis-que-es",
    h1: "Qué es el barómetro del CIS y cómo leerlo",
    title: "Barómetro del CIS: qué es, cuándo sale y cómo leerlo",
    description:
      "El barómetro del CIS de octubre de 2026: estimación, problemas, líderes, voto directo y microdatos. Qué es el CIS, quién lo dirige y cómo usar sus datos.",
    lead:
      "El barómetro es la encuesta mensual del Centro de Investigaciones Sociológicas, un organismo público. Trae estimación de voto, voto directo, principales problemas y valoración de líderes. El de octubre de 2026 (estudio 3582) se publicó el 14 de octubre, con 5.025 entrevistas hechas del 1 al 6 de octubre.",
    cta: S.cisWeb,
    secondaryCta: S.cis3582,
    sources: [S.cis3582, S.cis3582avance, S.euronews],
    related: [R.cis, R.directa, R.cocina, R.hub, R.ficha, R.indecisos],
    faqs: [
      { q: "¿Quién dirige el CIS?", a: "José Félix Tezanos lo preside desde 2018 (Euronews, 14-10-2026)." },
      { q: "¿Dónde se ven los datos?", a: "En cis.es: cada estudio tiene el avance de resultados, el PDF de estimación y los microdatos descargables." },
      { q: "¿Cuánto ha cambiado de septiembre a octubre?", a: "Según Euronews, el PSOE pasó del 31 % al 34 % y el PP del 25,5 % al 22,2 %. Vox quedó en el 17,1 %." },
      { q: "¿Cuál es el principal problema según el barómetro?", a: "La vivienda, citada por el 55,7 %, 20 puntos más que el mes anterior. Le siguen la inmigración (20,9 %) y la crisis económica (20,3 %)." },
      { q: "¿Habrá encuesta preelectoral del CIS para el 29-N?", a: "El CIS hizo macroencuestas preelectorales en 2019 (estudios 3242 y 3263) y en 2023 (3411). Si la publica, la añadiremos al hub de encuestas." },
      { q: "¿El barómetro da escaños?", a: "El de octubre de 2026 da estimación de voto, no escaños. Las macroencuestas preelectorales sí suelen dar horquillas de escaños." },
    ],
    sections: [
      {
        id: "que-trae",
        title: "Qué trae el barómetro de octubre de 2026",
        paragraphs: [],
        table: {
          caption: "Principales datos del estudio 3582 del CIS",
          head: ["Bloque", "Dato", "Fuente"],
          rows: [
            { cells: ["Estimación", "PSOE 34 %, PP 22,2 %, Vox 17,1 %, SUMAR/Frente Amplio 6,1 %, Podemos 3,1 %, ERC 3 %"], source: S.cis3582 },
            { cells: ["Voto directo", "PSOE 25,3 %, PP 14,7 %, Vox 11,6 %; no sabe 17,3 %"], source: S.cis3582 },
            { cells: ["Problemas", "Vivienda 55,7 %, inmigración 20,9 %, crisis económica 20,3 %"], source: S.euronews },
            { cells: ["Preferido como presidente", "Sánchez 39,3 %, Feijóo 14,7 %, Abascal 13,8 %, Rufián 12,3 %"], source: S.euronews },
          ],
        },
      },
      {
        id: "como-leer",
        title: "Cómo leerlo en cinco minutos",
        paragraphs: [],
        lists: [[
          "Abre el PDF de estimación: arriba están el voto directo, su margen y la estimación.",
          "Mira el «no sabe»: con un 17,3 %, uno de cada seis no ha decidido.",
          "Compáralo con el mes anterior del propio CIS, no con otra empresa.",
          "Lee la nota metodológica: explica el modelo y dice que no es un pronóstico.",
          "Si quieres ir más allá, descarga los microdatos y cruza por edad o comunidad.",
        ]],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["El barómetro destaca por su tamaño (5.025 entrevistas, más que cualquier privada de octubre) y porque lo publica todo. Su estimación es la que más se aleja del resto este mes; su voto directo y sus preguntas de problemas y líderes son datos sin modelo."],
      },
    ],
  }),

  // 8 · ACIERTOS Y FALLOS
  g({
    id: "29n-aciertos-fallos",
    path: "/elecciones/aciertos-y-fallos-de-las-encuestas",
    h1: "Aciertos y fallos de las encuestas en las últimas generales",
    title: "Aciertos y fallos de las encuestas: 2019 y 2023",
    description:
      "Qué dijeron el CIS, 40dB, Simple Lógica, GAD3 y Sigma Dos antes de 2019 y 2023 y qué pasó. Errores por partido y cinco lecciones para el 29-N.",
    lead:
      "En 2023 casi todas las privadas dieron al PP más escaños de los 137 que sacó: las más cercanas fueron 40dB (135) y Simple Lógica (130–138), y la de GAD3 a pie de urna le dio 150. El CIS casi clavó al PSOE pero sobreestimó a Sumar en 4,1 puntos. En noviembre de 2019 el CIS dio a Vox la mitad de lo que sacó.",
    cta: S.eldiario2023,
    secondaryCta: S.boe2023,
    sources: [S.eldiario2023, S.boe2023, S.cis3242, S.cis3263, S.cis3411, S.boe2019a, S.boe2019n],
    related: [R.cis, R.estudio, R.pieUrna, R.margen, R.indecisos, R.hub, R.escanosEnc],
    faqs: [
      { q: "¿Qué encuesta acertó más en 2023?", a: "En escaños del PP, 40dB (135 frente a 137) y Simple Lógica (130–138), según elDiario.es. Simple Lógica también acertó que PP y Vox no tendrían mayoría absoluta." },
      { q: "¿Por qué fallaron tanto en 2023?", a: "Casi todas inflaron al PP e infravaloraron al PSOE. El resultado se decidió por pocos puntos y en escaños provinciales ajustados, donde un error pequeño mueve mucho." },
      { q: "¿El CIS acierta más que las privadas?", a: "En 2023 se acercó más en el PSOE; en noviembre de 2019 se alejó mucho en PSOE y Vox. No hay un ganador fijo." },
      { q: "¿Qué partidos salen peor medidos?", a: "En estos datos, los que cambian deprisa: Vox en noviembre de 2019 (el CIS le dio 7,9 % y sacó 15,1 %) y Sumar en 2023 (16,4 % frente a 12,3 %)." },
      { q: "¿La encuesta a pie de urna es más fiable?", a: "No siempre. En 2023 GAD3 y Sigma Dos dieron al PP entre 145 y 150 escaños al cierre de los colegios y sacó 137." },
    ],
    sections: [
      { id: "2023", title: "2023: las privadas", paragraphs: [], table: TABLA_2023_PRIV },
      {
        id: "cis",
        title: "El CIS en 2019 y 2023",
        paragraphs: ["Error medio en los cuatro grandes partidos: 1,5 puntos (abril de 2019), 4,5 (noviembre de 2019) y 2,0 (2023). El detalle partido a partido está en «¿Miente el CIS?» y en nuestro estudio de las 12 estimaciones."],
        chart: CHART_ERROR_MEDIO,
        lists: [[
          "Mayor error: Vox en noviembre de 2019, −7,2 puntos.",
          "Menor error en 2023: el PSOE, a medio punto del resultado.",
          "Escaños 2023: dio al PP entre 122 y 140, una horquilla de 18 escaños que incluía los 137 que sacó.",
        ]],
      },
      {
        id: "leccion",
        title: "Cinco lecciones",
        paragraphs: [],
        lists: [[
          "Los partidos que crecen o caen deprisa son los peor medidos.",
          "Los escaños fallan más que los porcentajes, porque dependen de restos provinciales.",
          "La última semana no se ve: del 24 al 28 de noviembre no se publican encuestas.",
          "El consenso no garantiza nada: en 2023 casi todas fallaron en la misma dirección.",
          "Las horquillas anchas aciertan más, pero dicen menos.",
        ]],
      },
    ],
  }),
  // 9 · CÓMO LEER
  g({
    id: "29n-leer-encuesta",
    path: "/elecciones/como-leer-una-encuesta",
    h1: "Cómo leer una encuesta electoral sin que te engañen",
    title: "Cómo leer una encuesta electoral sin que te engañen",
    description:
      "Siete comprobaciones antes de creerte un titular: fecha de campo, muestra, margen, quién paga, voto directo, tendencia y escaños. Con ejemplos reales de octubre de 2026.",
    lead:
      "Antes de creerte un titular sobre encuestas, mira siete cosas: quién la hace y quién la paga, la fecha del trabajo de campo, la muestra, el margen de error, el voto directo, la tendencia frente a la anterior de la misma empresa y si habla de votos o de escaños. Lleva dos minutos y evita casi todos los malentendidos.",
    cta: L69,
    secondaryCta: S.cis3582,
    sources: [L69, S.cis3582, S.gad3, S.doble, S.dsevilla],
    related: [R.ficha, R.margen, R.directa, R.falsas, R.escanosEnc, R.hub, R.indecisos],
    faqs: [
      { q: "¿Sirve una encuesta de X o de una web donde vota quien quiere?", a: "No es representativa: responde quien quiere y a veces se puede votar varias veces. Mira «Encuestas falsas en redes»." },
      { q: "¿Puedo comparar dos encuestadoras distintas?", a: "Con cuidado. Cada una tiene su método y su modelo; lo más fiable es comparar cada empresa con su propia encuesta anterior." },
      { q: "¿Qué es más importante, el porcentaje o los escaños?", a: "El porcentaje tiene menos incertidumbre. Los escaños dependen de cómo se repartan los votos en 52 circunscripciones." },
      { q: "¿Una encuesta que encarga un partido vale?", a: "Puede estar bien hecha, pero el partido decide si la publica. Mira la ficha técnica y compárala con las demás." },
      { q: "¿Qué hago si los números no suman?", a: "Busca el informe en la web de la encuestadora. En octubre de 2026, doblelectura señaló que la suma de escaños de PP y Vox que publicó La Razón no cuadraba con su propia tabla." },
      { q: "¿Una media de encuestas es mejor?", a: "Suaviza el ruido de cada una, pero si todas fallan en la misma dirección, como en 2023, la media también falla." },
    ],
    sections: [
      {
        id: "checklist",
        title: "Las siete comprobaciones",
        paragraphs: [],
        lists: [[
          "Quién la hace y quién la encarga. La ley obliga a decirlo (artículo 69.1 de la LOREG).",
          "Fecha del trabajo de campo, no la de publicación. GAD3 hizo sus entrevistas del 6 al 8 de octubre y se publicó el 12.",
          "Tamaño y tipo de muestra: teléfono, internet o mixto. 40dB usó 800 entrevistas online; GAD3, 1.077 por teléfono.",
          "Margen de error: si la distancia entre dos partidos es menor, es un empate.",
          "Voto directo y «no sabe»: con un 17,3 % de indecisos, como el CIS de octubre, la estimación es frágil.",
          "Tendencia: compárala con la anterior de la misma empresa.",
          "Votos o escaños: los escaños tienen más incertidumbre.",
        ]],
      },
      { id: "octubre", title: "Practica con las encuestas de octubre de 2026", paragraphs: [], table: TABLA_OCT26 },
      {
        id: "trampas",
        title: "Cuatro trampas frecuentes",
        paragraphs: [],
        lists: [[
          "«Se dispara»: subir un punto en una encuesta de 1.000 está dentro del margen.",
          "Comparar una encuesta de la empresa A con la anterior de la empresa B.",
          "Dar por hecha la suma de escaños de dos partidos sin mirar la horquilla.",
          "Leer un dato por provincia o edad de una encuesta nacional: hay muy pocas entrevistas.",
        ]],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Si una encuesta pasa las siete comprobaciones, es un dato útil sobre el momento en que se hizo. Si no encuentras la ficha técnica, no tienes forma de valorarla."],
      },
    ],
  }),

  // 10 · FICHA TÉCNICA
  g({
    id: "29n-ficha-tecnica",
    path: "/elecciones/ficha-tecnica-encuesta",
    h1: "Ficha técnica de una encuesta: qué mirar",
    title: "Ficha técnica de una encuesta: qué debe incluir",
    description:
      "Qué datos exige el artículo 69 de la LOREG al publicar un sondeo y cómo comprobarlos, con la ficha real de GAD3 para ABC de octubre de 2026 punto por punto.",
    lead:
      "La ficha técnica explica cómo se hizo la encuesta: quién, cuándo, a cuántas personas, cómo y con qué margen de error. Desde la convocatoria, el artículo 69 de la LOREG obliga a publicarla con el sondeo. La de GAD3 para ABC de octubre de 2026 cumple todos los puntos: 1.077 entrevistas telefónicas del 6 al 8 de octubre, ±3,1 puntos.",
    cta: L69,
    secondaryCta: S.gad3,
    sources: [L69, S.gad3, S.cis3582, S.jec],
    related: [R.leer, R.margen, R.hacer, R.falsas, R.prohibidas, R.hub],
    faqs: [
      { q: "¿Quién vigila que se cumpla?", a: "La Junta Electoral Central (artículo 69.2 de la LOREG)." },
      { q: "¿Qué pasa si una encuesta publicada tiene errores?", a: "El artículo 69 permite pedir la rectificación a la Junta Electoral; el medio tiene que publicarla en un plazo de tres días." },
      { q: "¿La ficha debe incluir las preguntas?", a: "Sí: el texto íntegro de las preguntas y el número de personas que no contestaron a cada una (artículo 69.1.c)." },
      { q: "¿Las encuestas del CIS también cumplen el artículo 69?", a: "Sí, y además publican microdatos. El estudio 3582 detalla muestra, fechas, margen y modelo." },
      { q: "¿Qué es el «universo»?", a: "La población que se quiere representar, por ejemplo residentes en España mayores de 18 años con derecho a voto." },
    ],
    sections: [
      {
        id: "que-incluye",
        title: "Lo que exige el artículo 69.1",
        paragraphs: [],
        lists: [[
          "a) Quién ha hecho el sondeo y quién lo ha encargado.",
          "b) Sistema de muestreo, tamaño de la muestra, margen de error, nivel de representatividad, procedimiento de selección de entrevistados y fechas del trabajo de campo.",
          "c) Texto íntegro de las preguntas y número de personas que no contestaron a cada una.",
        ]],
      },
      {
        id: "ejemplo",
        title: "Ejemplo real: GAD3 para ABC, octubre de 2026",
        paragraphs: [],
        table: {
          caption: "Ficha técnica publicada por GAD3, comprobada punto por punto",
          head: ["Requisito", "Lo que dice la ficha", "Fuente"],
          rows: [
            { cells: ["Quién la hace / encarga", "GAD3 para ABC"], source: S.gad3 },
            { cells: ["Fechas de campo", "6 a 8 de octubre de 2026"], source: S.gad3 },
            { cells: ["Muestra y método", "1.077 entrevistas telefónicas (926 a móvil, 151 a fijo)"], source: S.gad3 },
            { cells: ["Margen y confianza", "±3,1 puntos al 95,5 %"], source: S.gad3 },
            { cells: ["Duración", "4 a 5 minutos por entrevista"], source: S.gad3 },
          ],
        },
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Si una noticia de encuestas no incluye ficha ni enlace a ella, búscala en la web de la encuestadora. Si no aparece, trata la cifra como una opinión."],
      },
    ],
  }),

  // 11 · INDECISOS
  g({
    id: "29n-indecisos",
    path: "/elecciones/indecisos-y-voto-oculto",
    h1: "Indecisos y voto oculto: lo que las encuestas no ven",
    title: "Indecisos y voto oculto: por qué fallan las encuestas",
    description:
      "Cuántos indecisos detecta el CIS en 2019, 2023 y octubre de 2026, qué es el voto oculto y por qué la gente que decide tarde complica las encuestas.",
    lead:
      "En el barómetro del CIS de octubre de 2026, un 17,3 % responde «no sabe» a quién votará: uno de cada seis. Cómo reparte cada encuestadora a esa gente explica buena parte de sus diferencias. El voto oculto es otra cosa: el de quien sí lo sabe pero no lo dice.",
    cta: S.cis3582,
    secondaryCta: S.cis3411,
    sources: [S.cis3582, S.cis3242, S.cis3263, S.cis3411, S.doble],
    related: [R.cocina, R.directa, R.historico, R.hub, R.leer, R.cis],
    faqs: [
      { q: "¿Hay más indecisos ahora que en 2023?", a: "En el CIS sí: 17,3 % «no sabe» en octubre de 2026 frente al 14,1 % del preelectoral de 2023. Son encuestas de distinto tipo, así que la comparación es orientativa." },
      { q: "¿Los indecisos son de un bloque concreto?", a: "Sigma Dos para El Mundo midió en octubre de 2026 un 14,7 % de indecisos entre votantes de izquierda en 2023 frente a un 5,8 % entre los de derecha (doblelectura)." },
      { q: "¿Cómo se reparten los indecisos?", a: "Cada empresa usa su método: por recuerdo de voto, por simpatía, por valoración de líderes o no los reparte. Lo explicamos en «Qué es la cocina»." },
      { q: "¿Qué es el voto oculto?", a: "El de quien no declara su partido por vergüenza o desconfianza. Se intenta corregir con el recuerdo de voto o preguntas indirectas." },
      { q: "¿Cuándo decide la gente?", a: "Una parte decide en la campaña o en la última semana, justo cuando no se pueden publicar encuestas (del 24 al 28 de noviembre)." },
    ],
    sections: [
      {
        id: "datos",
        title: "Indecisos en el CIS",
        paragraphs: [],
        table: {
          caption: "Indecisos declarados en encuestas del CIS",
          head: ["Encuesta", "Indecisos", "Fuente"],
          rows: [
            { cells: ["Preelectoral marzo 2019 (28-A)", "25,3 % no lo tiene decidido; 4,5 % no sabe"], source: S.cis3242 },
            { cells: ["Preelectoral oct. 2019 (10-N)", "20,3 % no lo tiene decidido; 3,2 % no sabe"], source: S.cis3263 },
            { cells: ["Preelectoral junio 2023 (23-J)", "14,1 % no sabe"], source: S.cis3411 },
            { cells: ["Barómetro octubre 2026", "17,3 % no sabe"], source: S.cis3582 },
          ],
        },
      },
      {
        id: "voto-oculto",
        title: "Voto oculto y quién contesta",
        paragraphs: [
          "Además de los indecisos, hay quien no quiere decir su voto y quien directamente no contesta encuestas. Si un tipo de votante responde menos, la muestra queda descompensada aunque sea grande. Las empresas lo corrigen ponderando por recuerdo de voto, y ese ajuste es una de las razones por las que sus estimaciones difieren.",
        ],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Cuantos más indecisos, más depende la estimación del modelo. Mira siempre el «no sabe» antes del titular."],
      },
    ],
  }),

  // 12 · PIE DE URNA
  g({
    id: "29n-pie-de-urna",
    path: "/elecciones/encuesta-a-pie-de-urna",
    h1: "Encuesta a pie de urna: qué es y cuánto acierta",
    title: "Encuesta a pie de urna: qué es y cuánto acierta",
    description:
      "La encuesta a pie de urna pregunta a la salida del colegio y se difunde al cierre, a las 20:00. Cómo funciona, qué dijo en 2023 y cómo seguir la noche del 29-N.",
    lead:
      "La encuesta a pie de urna se hace el mismo día, preguntando a personas que acaban de votar, y se difunde al cerrar los colegios a las 20:00. No es el recuento. En 2023 la de GAD3 para RTVE y Forta dio al PP 150 escaños; el recuento le dio 136 esa noche y 137 en el resultado oficial.",
    cta: S.eldiario2023,
    secondaryCta: S.boe2023,
    sources: [S.eldiario2023, S.boe2023, L69, S.infoelectoral],
    related: [R.historico, R.prohibidas, R.margen, R.hub, R.resultados, R.escanosEnc],
    faqs: [
      { q: "¿Por qué falla si pregunta a quien ya ha votado?", a: "No recoge el voto por correo, hay gente que no contesta o no dice la verdad, y los escaños dependen de márgenes pequeños en cada provincia." },
      { q: "¿Se puede publicar antes de las 20:00?", a: "No. La LOREG prohíbe difundir sondeos del 24 al 28 de noviembre y el día de la votación hasta el cierre de los colegios." },
      { q: "¿Qué diferencia hay entre recuento provisional y escrutinio?", a: "El recuento de la noche electoral es provisional; el resultado oficial sale del escrutinio de las juntas electorales y se publica en el BOE. En 2023 el PP pasó de 136 a 137 escaños." },
      { q: "¿Dónde sigo el recuento?", a: "En la web de resultados del Ministerio del Interior, que se actualiza durante la noche." },
      { q: "¿Las televisiones hacen su propia encuesta?", a: "Las encargan a empresas: en 2023 RTVE y Forta contaron con GAD3 y Sigma Dos." },
    ],
    sections: [
      {
        id: "como",
        title: "Cómo funciona",
        paragraphs: [],
        lists: [[
          "Se eligen colegios representativos y se entrevista a votantes a la salida a lo largo del día.",
          "Se combinan esos datos con encuestas de los días previos y, a veces, con datos del recuento.",
          "Se difunde a las 20:00, cuando cierran los colegios.",
        ]],
      },
      {
        id: "2023",
        title: "Lo que pasó en 2023",
        paragraphs: [],
        table: {
          caption: "Encuestas a pie de urna del 23-J y resultado",
          head: ["Fuente", "PP", "PSOE", "Fuente del dato"],
          rows: [
            { cells: ["GAD3 (RTVE y Forta)", "150", "112"], source: S.eldiario2023 },
            { cells: ["Sigma Dos (RTVE y Forta)", "145 a 150", "113 a 118"], source: S.eldiario2023 },
            { cells: ["Resultado oficial", "137", "121"], source: S.boe2023 },
          ],
        },
      },
      {
        id: "29n",
        title: "Qué significa para ti la noche del 29-N",
        paragraphs: ["A las 20:00 verás encuestas; poco después, el recuento provisional. Si la encuesta y el recuento no coinciden, manda el recuento, y el resultado final es el escrutinio oficial."],
      },
    ],
  }),

  // 13 · HORQUILLAS
  g({
    id: "29n-horquillas-escanos",
    path: "/elecciones/por-que-las-encuestas-dan-horquillas-de-escanos",
    h1: "Por qué las encuestas dan horquillas de escaños",
    title: "Por qué las encuestas dan horquillas de escaños",
    description:
      "Los escaños se reparten provincia a provincia con D'Hondt. Tres ejemplos reales de 2023 (Soria, Teruel y Madrid) muestran por qué un escaño se decide por pocos votos.",
    lead:
      "Los 350 diputados se reparten en 52 circunscripciones con D'Hondt, y en muchas el último escaño se decide por pocos votos. En Madrid, en 2023, el último fue para el PP con unos 1.340 votos de ventaja sobre el PSOE. Por eso las encuestas dan horquillas: el CIS dio al PP entre 122 y 140 escaños.",
    cta: L163,
    secondaryCta: S.boe2023,
    sources: [S.boe2023, S.cis3411, L163, L162, S.dsevilla],
    related: [R.dhondt, R.provincias, R.barrera, R.margen, R.mayoria, R.historico],
    faqs: [
      { q: "¿Más votos siempre son más escaños?", a: "No. En 2023 Vox (12,4 %) sacó 33 escaños y Sumar (12,3 %) 31. Depende de dónde estén los votos." },
      { q: "¿Qué horquilla tienen PP y Vox juntos en octubre de 2026?", a: "Según Diario de Sevilla (14-10-2026), entre 189 y 212 escaños en las encuestas privadas de octubre." },
      { q: "¿Por qué Soria y Madrid funcionan tan distinto?", a: "Soria elige 2 diputados y Madrid 37. Con pocos escaños hace falta mucho más porcentaje para conseguir uno." },
      { q: "¿Cuántos escaños tiene cada provincia?", a: "Dos como mínimo por provincia, uno Ceuta y otro Melilla; los 248 restantes según población (artículo 162 de la LOREG)." },
      { q: "¿Una horquilla ancha es mala señal?", a: "Es más honesta: refleja que muchos escaños están en el aire. Una cifra exacta da una precisión que no existe." },
    ],
    sections: [
      {
        id: "soria",
        title: "Soria, 2 escaños: el tercero que no existe",
        paragraphs: ["PP 18.895 votos y PSOE 14.966 se llevaron los dos escaños. Soria ¡Ya! sacó 9.697: si Soria eligiera 3 diputados, el tercero habría sido suyo, porque 9.697 supera a la mitad de los votos del PP (9.447)."],
      },
      {
        id: "teruel",
        title: "Teruel, 3 escaños: a 1.946 votos",
        paragraphs: ["PP 26.586, PSOE 22.226, Teruel Existe 11.348 y Vox 9.932. Reparto: PP 2, PSOE 1. El tercer escaño del PP salió con 13.293 (26.586 / 2); a Teruel Existe le faltaron 1.946 votos para superarlo."],
      },
      {
        id: "madrid",
        title: "Madrid, 37 escaños: a unos 1.340 votos",
        paragraphs: ["PP 1.463.183, PSOE 1.004.599, Sumar 557.780 y Vox 506.164. Reparto: PP 16, PSOE 10, Sumar 6, Vox 5. El último cociente fue el del PP (1.463.183 / 16 = 91.449) y el siguiente, el del PSOE (1.004.599 / 11 = 91.327). Con unos 1.340 votos más, el PSOE habría sacado ese escaño en lugar del PP."],
      },
      { id: "cis", title: "Horquillas del CIS en 2023 y resultado", paragraphs: [], table: TABLA_ESCANOS },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Cuando leas que un bloque «roza» los 176, mira la horquilla: con decenas de escaños decididos por pocos miles de votos, unas décimas cambian la suma. Para la mecánica completa, mira «Cómo funciona la ley D'Hondt»."],
      },
    ],
  }),

  // 14 · FALSAS
  g({
    id: "29n-encuestas-falsas",
    path: "/elecciones/encuestas-falsas-en-redes",
    h1: "Encuestas falsas en redes: cómo detectarlas",
    title: "Encuestas falsas en redes: cómo detectarlas",
    description:
      "Capturas sin fuente, sondeos de redes y «encuestas» del 24 al 28 de noviembre: cinco pasos para comprobar una encuesta antes de compartirla.",
    lead:
      "Una encuesta real tiene empresa, fecha de campo, muestra y ficha técnica, y aparece en la web de la encuestadora o del medio que la encarga. Si en cinco minutos no encuentras esa fuente original, trata la captura como no verificada.",
    cta: S.jec,
    secondaryCta: L69,
    sources: [S.jec, L69, S.doble],
    related: [R.bulos, R.prohibidas, R.ficha, R.leer, R.hub, R.reflexion],
    faqs: [
      { q: "¿Se puede publicar una encuesta del 24 al 28 de noviembre?", a: "No. La LOREG prohíbe publicar y difundir sondeos en los cinco días anteriores a la votación (artículo 69.7). Lo vigila la Junta Electoral." },
      { q: "¿Un sondeo de X o Instagram es una encuesta?", a: "No: responde quien quiere, no una muestra representativa." },
      { q: "¿Cómo compruebo una captura?", a: "Busca el nombre de la empresa y la fecha en su web o en el medio que la encargó. Compara los números uno por uno." },
      { q: "¿Dónde denuncio una encuesta ilegal?", a: "Ante la Junta Electoral competente." },
      { q: "¿Y si la cifra es real pero antigua?", a: "Es frecuente: una encuesta de hace meses que circula como nueva. Mira siempre la fecha de campo." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Cinco pasos antes de compartir",
        paragraphs: [],
        lists: [[
          "Busca la empresa y el medio. Si no aparecen, para.",
          "Encuentra la publicación original en su web.",
          "Comprueba la fecha de campo y la muestra.",
          "Compara los números: que coincidan y que sumen.",
          "Mira la fecha de hoy: del 24 al 28 de noviembre no se puede difundir ninguna encuesta en España.",
        ]],
      },
      {
        id: "senales",
        title: "Señales de alarma",
        paragraphs: [],
        lists: [[
          "No aparece la empresa ni el medio que la encarga.",
          "No hay fecha de campo ni tamaño de muestra.",
          "Es una votación abierta en una red social o una web.",
          "Los porcentajes no suman, o los escaños pasan de 350.",
          "Diseño que imita a un medio conocido pero no está en su web.",
        ]],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Hasta medios reales cometen errores: en octubre de 2026 doblelectura señaló que una suma de escaños publicada por La Razón no coincidía con su propia tabla. Contrastar con la fuente original es la mejor defensa."],
      },
    ],
  }),

  // 15 · MAYORÍA ABSOLUTA
  g({
    id: "29n-mayoria-absoluta",
    path: "/elecciones/mayoria-absoluta-176-escanos",
    h1: "Mayoría absoluta: por qué son 176 escaños",
    title: "Mayoría absoluta en el Congreso: 176 escaños",
    description:
      "350 diputados, mayoría absoluta de 176. Cuándo hace falta, cuándo basta la simple y qué pasó en las investiduras de 2023. Las cuatro mayorías absolutas de la democracia.",
    lead:
      "El Congreso tiene 350 diputados, así que la mayoría absoluta es 176. Hace falta para ser investido en la primera votación; en la segunda, 48 horas después, basta con más síes que noes (artículo 99 de la Constitución). Solo cuatro veces un partido ha llegado solo a 176: 1982, 1986, 2000 y 2011.",
    cta: S.ce("a99", "artículo 99"),
    secondaryCta: S.boe2023,
    sources: [S.ce("a99", "artículo 99: investidura"), S.ce("a81", "artículo 81: leyes orgánicas"), S.boe2023, S.congreso, S.infoelectoral],
    related: [R.presidente, R.repeticion, R.dhondt, R.escanosEnc, R.escanosEnc, R.hub],
    faqs: [
      { q: "¿Alguien sacó mayoría absoluta en 2023?", a: "No. El PP, el más votado, sacó 137. Ninguno llegó a 176 (BOE)." },
      { q: "¿Qué pasó en las investiduras de 2023?", a: "Feijóo no fue investido: 172 síes y 178 noes. Sánchez sí: 179 síes y 171 noes, en primera votación (Congreso)." },
      { q: "¿Qué más necesita mayoría absoluta?", a: "Por ejemplo, aprobar leyes orgánicas en votación final sobre el conjunto del proyecto (artículo 81)." },
      { q: "¿Cuenta la abstención en la segunda votación?", a: "Sí, porque solo se comparan síes y noes. Abstenerse facilita la investidura." },
      { q: "¿Cuáles fueron las mayorías absolutas?", a: "PSOE 202 escaños (1982) y 184 (1986); PP 183 (2000) y 186 (2011)." },
    ],
    sections: [
      {
        id: "cuentas",
        title: "Las cuentas",
        paragraphs: [],
        lists: [[
          "350 / 2 = 175. Más de la mitad son 176.",
          "Primera votación: 176 síes.",
          "Segunda votación: más síes que noes. Con 20 abstenciones, bastan 166 síes frente a 164 noes.",
        ]],
      },
      {
        id: "historia",
        title: "Las cuatro mayorías absolutas",
        paragraphs: [],
        table: {
          caption: "Partidos que superaron los 176 escaños",
          head: ["Año", "Partido", "Escaños", "Fuente"],
          rows: [
            { cells: ["1982", "PSOE", "202"], source: S.infoelectoral },
            { cells: ["1986", "PSOE", "184"], source: S.infoelectoral },
            { cells: ["2000", "PP", "183"], source: S.infoelectoral },
            { cells: ["2011", "PP", "186"], source: S.infoelectoral },
          ],
        },
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Cuando una encuesta suma escaños de dos o más partidos, compara con 176 y mira la horquilla. Llegar a 176 no es imprescindible para gobernar: en segunda votación basta con más síes que noes."],
      },
    ],
  }),

  // 16 · REPETICIÓN
  g({
    id: "29n-repeticion",
    path: "/elecciones/repeticion-electoral",
    h1: "Qué pasa si nadie consigue ser investido: repetición electoral",
    title: "Repetición electoral: qué pasa si nadie es investido",
    description:
      "Si en dos meses desde la primera votación de investidura nadie obtiene la confianza del Congreso, se repiten las elecciones (art. 99.5 CE). Los casos de 2016 y 2019, paso a paso.",
    lead:
      "Si pasan dos meses desde la primera votación de investidura sin que nadie obtenga la confianza del Congreso, el Rey disuelve las Cortes y convoca nuevas elecciones (artículo 99.5 de la Constitución). Ha pasado dos veces: las elecciones de diciembre de 2015 se repitieron en junio de 2016, y las de abril de 2019, el 10 de noviembre.",
    cta: S.ce("a99", "artículo 99"),
    secondaryCta: S.rd2019,
    sources: [S.ce("a99", "artículo 99"), S.rd2019, S.boe2019a, S.boe2019n, S.congreso],
    related: [R.presidente, R.mayoria, R.calendario, R.hub, R.campana],
    faqs: [
      { q: "¿Hay plazo antes de la primera votación?", a: "La Constitución no lo fija; el reloj de dos meses empieza con ella." },
      { q: "¿Quién convoca la repetición?", a: "El Rey, con el refrendo de la presidencia del Congreso. En 2019 fue el Real Decreto 551/2019, de 24 de septiembre." },
      { q: "¿Cuánto tiempo pasa hasta las nuevas elecciones?", a: "En 2019, el decreto se publicó el 24 de septiembre y se votó el 10 de noviembre, menos de siete semanas después." },
      { q: "¿Gobierna alguien mientras tanto?", a: "Sí: el Gobierno en funciones, que sigue hasta que toma posesión el nuevo." },
      { q: "¿Se puede repetir más de una vez?", a: "La Constitución no lo impide; nunca ha ocurrido." },
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
      {
        id: "2019",
        title: "El caso de 2019",
        paragraphs: [],
        lists: [[
          "28 de abril: elecciones generales.",
          "Julio: la investidura fracasa y empieza a contar el plazo de dos meses.",
          "24 de septiembre: Real Decreto 551/2019 de disolución y convocatoria.",
          "10 de noviembre: nuevas elecciones.",
        ]],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Si hay repetición, vuelves a votar con el mismo procedimiento: nueva tarjeta censal, nuevo plazo de voto por correo y nuevas mesas sorteadas."],
      },
    ],
  }),
  // 17 · CAMPAÑA
  g({
    id: "29n-campana-precampana",
    path: "/elecciones/campana-y-precampana",
    h1: "Campaña y precampaña: fechas del 29-N y qué cambia",
    title: "Campaña y precampaña 29-N: fechas y qué cambia",
    description:
      "La campaña del 29-N va del 13 al 27 de noviembre de 2026. Qué se puede hacer en precampaña, qué prohíbe la LOREG a partidos y gobiernos, y el calendario día a día.",
    lead:
      "La campaña oficial del 29-N empieza el viernes 13 de noviembre a las 0:00 y termina el viernes 27 a las 24:00 (Real Decreto 806/2026). La «precampaña» no es una figura legal: es el tiempo entre la convocatoria y la campaña. Los partidos pueden seguir con su actividad ordinaria, pero el artículo 53 de la LOREG prohíbe la publicidad electoral en carteles, soportes comerciales, prensa, radio y otros medios digitales.",
    cta: S.rd,
    secondaryCta: S.jec,
    sources: [S.rd, S.jec, S.loreg("acincuenta", "artículo 50"), S.loreg("acincuentaytres", "artículo 53"), L69],
    related: [R.calendario, R.reflexion, R.prohibidas, R.promesas, R.hub, R.comparar],
    faqs: [
      { q: "¿Cuándo empieza la campaña?", a: "El 13 de noviembre de 2026 a las 0:00; termina el 27 a las 24:00." },
      { q: "¿Pueden los partidos hacer mítines antes de la campaña?", a: "El artículo 53 deja a salvo las actividades ordinarias de los partidos, pero hasta el inicio de la campaña prohíbe la publicidad o propaganda electoral en carteles, soportes comerciales e inserciones en prensa, radio u otros medios digitales. Las dudas las resuelve la Junta Electoral." },
      { q: "¿Y después de la campaña?", a: "Desde el 27 de noviembre a las 24:00 no puede difundirse propaganda ni hacerse actos de campaña (artículo 53)." },
      { q: "¿Puede el Gobierno inaugurar obras ahora?", a: "No. Desde la convocatoria, el artículo 50 prohíbe a los poderes públicos inaugurar obras o servicios públicos y hacer campañas que destaquen sus logros." },
      { q: "¿Hasta cuándo se publican encuestas?", a: "Hasta el 23 de noviembre. Del 24 al 28 está prohibido (artículo 69.7)." },
      { q: "¿Qué es el «buzoneo»?", a: "El envío de propaganda electoral por correo. Forma parte de la campaña y se reparte en las semanas previas a la votación." },
    ],
    sections: [
      {
        id: "fechas",
        title: "Calendario de noviembre",
        paragraphs: [],
        table: {
          caption: "Periodos clave del 29-N",
          head: ["Periodo", "Fechas", "Qué cambia", "Fuente"],
          rows: [
            { cells: ["Precampaña", "Hasta el 12 de noviembre", "Actividad ordinaria; sin publicidad electoral en carteles ni medios"], source: S.loreg("acincuentaytres", "artículo 53") },
            { cells: ["Campaña", "13 al 27 de noviembre", "Mítines, propaganda, espacios gratuitos en medios públicos"], source: S.rd },
            { cells: ["Sin encuestas", "24 al 28 de noviembre", "No se pueden publicar ni difundir sondeos"], source: L69 },
            { cells: ["Reflexión", "28 de noviembre", "Sin propaganda ni actos de campaña"], source: S.loreg("acincuentaytres", "artículo 53") },
            { cells: ["Votación", "29 de noviembre, 9:00 a 20:00", "Se vota; sondeos a pie de urna al cierre"], source: S.rd },
          ],
        },
      },
      {
        id: "gobiernos",
        title: "Límites para los gobiernos",
        paragraphs: ["Desde la convocatoria, el artículo 50 prohíbe a los poderes públicos las campañas institucionales que destaquen sus logros y la inauguración de obras o servicios públicos. Sí se permiten campañas informativas sobre cómo votar."],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: [],
        lists: [[
          "Si vas a votar por correo, no esperes a la campaña: mira el calendario del voto por correo.",
          "Durante la campaña verás debates y espacios electorales gratuitos en medios públicos.",
          "Desde el 24 no habrá encuestas nuevas; las que veas serán anteriores o no verificables.",
        ]],
      },
    ],
  }),

  // 18 · BARRERA 3 %
  g({
    id: "29n-barrera-voto-util",
    path: "/elecciones/barrera-del-3-por-ciento-y-voto-util",
    h1: "La barrera del 3 % y el voto útil, explicados",
    title: "Barrera del 3 % y voto útil: cómo funcionan",
    description:
      "Las listas con menos del 3 % del voto válido de su provincia no reparten escaños. Cálculo real con Madrid y Soria en 2023 y qué significa el voto útil.",
    lead:
      "Las candidaturas que no llegan al 3 % de los votos válidos de su provincia no entran en el reparto de escaños (artículo 163.1.a de la LOREG). En Madrid, en 2023, eso supuso más de 107.000 votos. En provincias pequeñas la barrera real es mucho más alta: en Soria, Soria ¡Ya! sacó 9.697 votos, cerca del 19 %, y no logró escaño.",
    cta: L163,
    secondaryCta: S.boe2023,
    sources: [L163, L162, S.boe2023],
    related: [R.dhondt, R.blanco, R.provincias, R.escanosEnc, R.nulo, R.hub],
    faqs: [
      { q: "¿El 3 % es nacional?", a: "No. Se calcula en cada circunscripción sobre los votos válidos, que incluyen el voto en blanco." },
      { q: "¿En qué provincias importa el 3 %?", a: "Solo en las que reparten muchos escaños, como Madrid o Barcelona. En las demás, D'Hondt exige bastante más para lograr un escaño." },
      { q: "¿Qué es el voto útil?", a: "Votar a quien tiene opciones de escaño en tu provincia en lugar de a tu primera preferencia. Es una decisión personal." },
      { q: "¿Mi voto a un partido pequeño se pierde?", a: "No da escaño si la lista no llega, pero cuenta en los resultados y para la financiación electoral, que depende de votos y escaños." },
      { q: "¿Cuántos escaños tiene mi provincia?", a: "Mínimo dos por provincia, uno Ceuta y otro Melilla, y el resto por población (artículo 162). Mira «Escaños por provincia»." },
    ],
    sections: [
      {
        id: "madrid",
        title: "Madrid: cuánto es el 3 %",
        paragraphs: ["En 2023, los votos a candidaturas en Madrid fueron 3.579.713. El 3 % de esa cifra es 107.391; con los votos en blanco, la barrera sube un poco más. PACMA sacó 21.742 votos y quedó fuera. El último escaño costó unos 91.400 votos, así que en Madrid la barrera y el coste de un escaño son parecidos."],
      },
      {
        id: "soria",
        title: "Soria: la barrera real es D'Hondt",
        paragraphs: ["Con 2 escaños y 50.484 votos a candidaturas, el 3 % serían unos 1.500 votos, pero para el segundo escaño hacía falta superar la mitad de los votos del PP (9.447). Soria ¡Ya!, con 9.697, se quedó por detrás del PSOE (14.966)."],
      },
      {
        id: "tabla",
        title: "Comparación",
        paragraphs: [],
        table: {
          caption: "Barrera legal y coste real de un escaño, 2023",
          head: ["Provincia", "Escaños", "3 % de votos a candidaturas", "Último escaño", "Fuente"],
          rows: [
            { cells: ["Madrid", "37", "107.391", "≈91.449 votos (PP/16)"], source: S.boe2023 },
            { cells: ["Teruel", "3", "≈2.200", "13.293 votos (PP/2)"], source: S.boe2023 },
            { cells: ["Soria", "2", "≈1.515", "14.966 votos (PSOE)"], source: S.boe2023 },
          ],
        },
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Antes de pensar en voto útil, mira cuántos escaños elige tu provincia: en una de 2 o 3 escaños solo los partidos grandes suelen tener opciones; en Madrid o Barcelona basta con alrededor del 3 %."],
      },
    ],
  }),

  // 19 · VOTO EN BLANCO
  g({
    id: "29n-voto-blanco-beneficia",
    path: "/elecciones/a-quien-beneficia-el-voto-en-blanco",
    h1: "¿A quién beneficia el voto en blanco? Blanco, nulo y abstención",
    title: "¿A quién beneficia el voto en blanco? Efecto real",
    description:
      "El voto en blanco cuenta como válido y sube la barrera del 3 %; el nulo y la abstención no. Cálculo con Madrid, tabla de efectos y qué es Escaños en Blanco.",
    lead:
      "El voto en blanco no da escaños a nadie ni va al partido más votado. Cuenta como válido, así que sube un poco la barrera del 3 %: en Madrid, cada 100.000 votos en blanco la suben 3.000 votos. El voto nulo y la abstención no cuentan para ese cálculo. Solo afecta a listas cerca del 3 % en provincias grandes.",
    cta: L163,
    secondaryCta: R.nulo,
    sources: [L163, S.boe2023],
    related: [{ href: "/elecciones/voto-nulo-ejemplos", label: "Voto nulo: 10 ejemplos y si cuentan" }, R.nulo, R.barrera, R.dhondt, R.provincias, R.hub],
    faqs: [
      { q: "¿El voto en blanco va al partido más votado?", a: "No. No se asigna a ningún partido; solo cuenta para calcular el 3 %." },
      { q: "¿Y el voto nulo?", a: "No es válido: no influye en el reparto ni en la barrera." },
      { q: "¿Qué es un voto nulo?", a: "Por ejemplo, un sobre con papeletas de partidos distintos, papeletas tachadas o modificadas, o un sobre con objetos. Lo explicamos en «Voto nulo y voto en blanco»." },
      { q: "¿Qué es Escaños en Blanco?", a: "Un partido que se compromete a dejar vacíos los escaños que gane. En 2023 sacó 8.287 votos en toda España (BOE) y ningún escaño." },
      { q: "¿El blanco cambia el reparto D'Hondt?", a: "No directamente: D'Hondt reparte entre candidaturas. Solo puede dejar fuera a una lista que, sin esos blancos, habría superado el 3 %." },
    ],
    sections: [
      {
        id: "tabla",
        title: "Efecto de cada opción",
        paragraphs: [],
        table: {
          caption: "Cómo cuenta cada opción en el Congreso",
          head: ["Opción", "Cuenta para el 3 %", "Cuenta en D'Hondt", "Fuente"],
          rows: [
            { cells: ["Voto a una candidatura", "Sí", "Sí"], source: L163 },
            { cells: ["Voto en blanco", "Sí", "No"], source: L163 },
            { cells: ["Voto nulo", "No", "No"], source: L163 },
            { cells: ["Abstención", "No", "No"], source: L163 },
          ],
        },
      },
      {
        id: "calculo",
        title: "El cálculo en Madrid",
        paragraphs: ["Con 3.579.713 votos a candidaturas (2023), el 3 % es 107.391. Si se sumaran 100.000 votos en blanco, los válidos serían 3.679.713 y el 3 %, 110.391: 3.000 votos más. Solo cambia algo para una lista que esté justo en ese tramo."],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Votar en blanco expresa que no apoyas a ninguna lista y cuenta en los resultados. No ayuda a ningún partido concreto y su efecto en escaños es muy pequeño."],
      },
    ],
  }),

  // 20 · COMPARAR PROGRAMAS
  g({
    id: "29n-comparar-programas",
    path: "/elecciones/como-comparar-programas-electorales",
    h1: "Cómo comparar programas electorales cuando se publiquen",
    title: "Cómo comparar programas electorales: guía práctica",
    description:
      "Cinco preguntas para comparar programas del 29-N, qué decide el Estado y qué las comunidades, y una plantilla para hacerlo igual con todos los partidos.",
    lead:
      "Compara los programas con el mismo método para todos: lee la fuente oficial, busca cuánto cuesta cada propuesta y cómo se paga, cuándo se haría, quién tiene la competencia y si encaja con lo que ese partido ha votado. A 19 de octubre de 2026, nuestra página de programas indica que aún no se ha publicado ninguno.",
    cta: { href: "/elecciones/programas-electorales-29n", label: "Estado de los programas del 29-N" },
    secondaryCta: { href: "/elecciones/promesas", label: "Promesas con fecha y fuente" },
    sources: [S.rd, S.ce("a149", "artículo 149: competencias del Estado"), S.ce("a148", "artículo 148: competencias autonómicas"), S.euronews],
    related: [R.programas, R.promesas, R.bulos, R.campana, R.pensiones, R.hub],
    faqs: [
      { q: "¿Dónde leo los programas?", a: "En la web oficial de cada partido. Los enlazaremos en nuestra página de programas cuando se publiquen." },
      { q: "¿Las promesas sobre vivienda son del Estado?", a: "En parte. La Constitución permite a las comunidades asumir la vivienda (artículo 148.1.3); el Estado actúa con la legislación básica, fiscal y sus propios planes. La vivienda es el principal problema para el 55,7 % en el CIS de octubre." },
      { q: "¿Y las pensiones?", a: "Son competencia del Estado: la legislación básica y el régimen económico de la Seguridad Social (artículo 149.1.17)." },
      { q: "¿Qué hago si una propuesta no dice cuánto cuesta?", a: "Anótalo. Que no tenga coste no la invalida, pero no se puede comparar con otra que sí lo dice." },
      { q: "¿Cómo sé qué votó un partido?", a: "En la web del Congreso se pueden consultar las votaciones de cada iniciativa." },
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
          "¿Es competencia del Estado o de las comunidades?",
          "¿Qué votó ese partido sobre lo mismo en el Congreso?",
        ]],
      },
      {
        id: "competencias",
        title: "Quién decide qué",
        paragraphs: [],
        table: {
          caption: "Ejemplos de reparto de competencias",
          head: ["Tema", "Quién decide sobre todo", "Fuente"],
          rows: [
            { cells: ["Pensiones", "Estado (art. 149.1.17)"], source: S.ce("a149", "artículo 149") },
            { cells: ["Vivienda", "Comunidades (art. 148.1.3), con normas e impuestos estatales"], source: S.ce("a148", "artículo 148") },
            { cells: ["Impuestos estatales (IRPF, IVA)", "Estado (art. 149.1.14), con tramos cedidos"], source: S.ce("a149", "artículo 149") },
            { cells: ["Sanidad y educación", "Gestión autonómica; bases del Estado (art. 149.1.16 y 30)"], source: S.ce("a149", "artículo 149") },
          ],
        },
      },
      {
        id: "plantilla",
        title: "Plantilla para comparar",
        paragraphs: ["Haz una tabla con una fila por tema (vivienda, pensiones, impuestos, empleo...) y una columna por partido. En cada celda apunta la propuesta, el coste si lo dan, el plazo y la página del programa. Rellénala igual para todos."],
      },
      {
        id: "para-ti",
        title: "Qué significa para ti",
        paragraphs: ["Comparar con el mismo método evita fijarse solo en los titulares. Mientras se publican los programas, puedes consultar las promesas con fecha y fuente que ya han hecho los partidos."],
      },
    ],
  }),
  // 21 · ESTUDIO PROPIO: ERROR DEL CIS
  g({
    id: "29n-estudio-error-cis",
    path: "/elecciones/estudio-error-cis-generales",
    h1: "Estudio: cuánto se equivocó el CIS en las generales de 2019 y 2023",
    title: "Error del CIS en las generales 2019–2023: estudio con datos",
    description:
      "Comparamos las 12 estimaciones finales del CIS con el resultado oficial del BOE: error medio de 2,7 puntos, 6 de 12 a 2 puntos o menos y un máximo de 7,2 (Vox, 2019).",
    lead:
      "Respuesta corta: en las tres últimas generales, el error medio del CIS fue de 2,7 puntos por partido. De sus 12 estimaciones finales para los cuatro partidos principales, 6 quedaron a 2 puntos o menos del resultado oficial y 4 se desviaron más de 3. Sobreestimó en 6 casos y subestimó en otros 6. El mayor error fue Vox en noviembre de 2019: le dio un 7,9 % y sacó un 15,1 %.",
    cta: S.cis3411,
    secondaryCta: S.boe2023,
    sources: [S.cis3242, S.cis3263, S.cis3411, S.boe2019a, S.boe2019n, S.boe2023],
    related: [R.cis, R.historico, R.hub, R.margen, R.cocina, R.directa],
    faqs: [
      { q: "¿Cuál es el error medio del CIS en las generales?", a: "2,7 puntos por partido en las 12 estimaciones de abril de 2019, noviembre de 2019 y julio de 2023: 1,5 en abril de 2019, 4,5 en noviembre de 2019 y 2,0 en 2023." },
      { q: "¿El CIS se equivoca siempre hacia el mismo lado?", a: "No en estos datos: sobreestimó en 6 de las 12 estimaciones y subestimó en 6. Al PSOE lo sobreestimó en 2019 y lo subestimó por medio punto en 2023." },
      { q: "¿Puedo descargar los datos?", a: "Sí, en CSV en /datos/error-cis-generales.csv, con la fuente de cada fila. Puedes repetir la cuenta con los PDF de estimación del CIS y los resultados del BOE." },
      { q: "¿Sirve para saber cuánto fallará el 29-N?", a: "No. Son solo tres elecciones y el error cambió mucho entre ellas, de 1,5 a 4,5 puntos." },
    ],
    dataset: {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Error de la estimación final del CIS frente al resultado oficial, elecciones generales 2019–2023",
      description: "12 filas: estimación final del CIS (estudios 3242, 3263 y 3411) y resultado oficial en porcentaje sobre voto válido para los cuatro partidos principales de cada elección general, con la diferencia en puntos.",
      url: "https://rutatramite.com/elecciones/estudio-error-cis-generales",
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: { "@type": "Organization", name: "RutaTrámite", url: "https://rutatramite.com/" },
      dateModified: "2026-10-20",
      temporalCoverage: "2019-04-28/2023-07-23",
      spatialCoverage: "España",
      isBasedOn: [S.cis3242.href, S.cis3263.href, S.cis3411.href, S.boe2019a.href, S.boe2019n.href, S.boe2023.href],
      variableMeasured: ["estimación del CIS (%)", "resultado oficial (%)", "diferencia (puntos)"],
      distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: "https://rutatramite.com/datos/error-cis-generales.csv" }],
    },
    sections: [
      {
        id: "resultados",
        title: "Los resultados en cuatro cifras",
        paragraphs: [],
        lists: [[
          "Error medio: 2,7 puntos por partido (12 estimaciones).",
          "A 2 puntos o menos del resultado: 6 de 12.",
          "Más de 3 puntos de error: 4 de 12 (PSOE y Vox en noviembre de 2019, Ciudadanos en noviembre de 2019 y Sumar en 2023).",
          "Dirección: 6 sobreestimaciones y 6 subestimaciones.",
        ]],
        chart: CHART_CIS,
      },
      {
        id: "por-eleccion",
        title: "Error medio por elección",
        paragraphs: ["El error depende mucho de la elección: noviembre de 2019, con una repetición electoral y un cambio rápido en el voto a Vox y Ciudadanos, triplicó el de abril."],
        chart: CHART_ERROR_MEDIO,
      },
      {
        id: "tabla",
        title: "Los datos, fila a fila",
        paragraphs: [],
        table: TABLA_CIS,
      },
      {
        id: "metodologia",
        title: "Metodología",
        paragraphs: [
          "Para cada elección general desde que el CIS cambió de método (2019 en adelante) tomamos su última estimación de voto publicada antes de la votación: estudios 3242 (abril de 2019), 3263 (noviembre de 2019) y 3411 (julio de 2023). La comparamos con el resultado oficial en porcentaje sobre voto válido publicado en el BOE por la Junta Electoral Central, redondeado a un decimal.",
          "Usamos los cuatro partidos con más voto en cada elección. La diferencia es estimación menos resultado; el error medio es la media de las diferencias sin signo. No incluimos escaños ni encuestas privadas, que están en «Aciertos y fallos de las encuestas».",
          "Datos abiertos: descarga el CSV en /datos/error-cis-generales.csv (licencia CC BY 4.0, cita «RutaTrámite» y las fuentes oficiales).",
        ],
      },
    ],
  }),
];
