import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Nichos territoriales del 29-N (25-10-2026). Verificado el 25-10-2026:
 * LOREG texto consolidado (API BOE): art. 75 (versión LO 12/2022, BOE-A-2022-16018: envío de oficio, sin solicitud;
 * envío del día 18 al 24 tras la convocatoria; urna del 8.º al 3.er día anterior; correo hasta el 5.º día anterior),
 * arts. 69.7, 72, 84, 88, 161.2 y 165.2 (LO 2/2026, BOE-A-2026-14329, BOE 2-7-2026), 162.2, 165.3, 166.1.a.
 * Calendario JEC eg2026 (PDF): CERA 24-30 oct, papeletas 4-8 nov (6-14 con recursos), descargables 2-7 nov,
 * urna 21-26 nov, correo al consulado hasta 24 nov. JEC acuerdos 352/2000 y 400/2019 (abiertos).
 * RD 605/1999 art. 4.6 (bilingüe; Navarra: zonas vascoparlantes de la Ley Foral 18/1986).
 * No abiertos y por tanto no citados: acuerdos JEC 154/2008 y 255/2015. Sin dato oficial de electores CERA por país.
 */

const R = "2026-10-25";
const LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672";
const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const lo = (a: string, label: string) => ({ href: `${LOREG}#${a}`, label: `BOE: LOREG, ${label}` });

const S = {
  jec: { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario electoral de las generales del 29-N" },
  rd: { href: "https://www.boe.es/eli/es/rd/2026/10/05/806", label: "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre (BOE del 6 de octubre)" },
  lo2: { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-14329", label: "BOE: Ley Orgánica 2/2026, de 30 de junio (BOE del 2 de julio de 2026)" },
  lo12: { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2022-16018", label: "BOE: Ley Orgánica 12/2022 (suprime el «voto rogado»)" },
  a75: lo("asetentaycinco", "artículo 75: voto de quienes residen en el extranjero"),
  a69: lo("asesentaynueve", "artículo 69.7: prohibición de publicar sondeos"),
  a72: lo("asetentaydos", "artículo 72: voto por correo"),
  a84: lo("aochentaycuatro", "artículo 84: la votación, de 9:00 a 20:00"),
  a161: lo("acientosesentayuno", "artículo 161: circunscripciones (islas)"),
  a162: lo("acientosesentaydos", "artículo 162: diputados de Ceuta y Melilla"),
  a165: lo("acientosesentaycinco", "artículo 165: senadores de cada circunscripción"),
  a166: lo("acientosesentayseis", "artículo 166: cuántos candidatos puedes marcar en el Senado"),
  jec352: { href: "https://www.juntaelectoralcentral.es/cs/jec/doctrina/acuerdos?anyosesion=2000&idacuerdoinstruccion=22968&idsesion=526&template=Doctrina%2FJEC_Detalle", label: "Junta Electoral Central: Acuerdo 352/2000 (estimaciones en Canarias antes de las 21:00 peninsulares)" },
  jec400: { href: "https://www.juntaelectoralcentral.es/cs/Satellite?c=Page&childpagename=JEC%2FJEC_layout_HTML&packedargs=esinstruccion%3Dfalse%26idacuerdoinstruccion%3D68387%26materias%3D0%26numExpediente%3D183%26operadoracuerdo%3D-1%26operadorobjeto%3D-1%26sPag%3D1%26template%3DDoctrina%252FJEC_DetalleHTML%26tipoExpediente%3D339%26tiposautor%3D0%26total%3D1&pagename=jec%2Fwrapper%2FJEC_Wrapper", label: "Junta Electoral Central: Acuerdo 400/2019 («doctrina reiterada»: resultados no antes de las 21:00)" },
  ext: { href: "https://www.exteriores.gob.es/es/Paginas/Elecciones.aspx", label: "Ministerio de Asuntos Exteriores: votar desde el extranjero el 29-N" },
  infoelectoral: { href: "https://infoelectoral.interior.gob.es/", label: "Ministerio del Interior: Infoelectoral" },
  rd605: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-8583#a4", label: "BOE: Real Decreto 605/1999, artículo 4.6 (papeletas y sobres bilingües)" },
};

export const P_CANARIAS = "/elecciones/hora-canarias-29n";
export const P_CRUCES = "/elecciones/cuantas-cruces-senado-provincia-isla";
export const P_CEUTA = "/elecciones/ceuta-melilla-29n";
export const P_BILINGUE = "/elecciones/papeletas-bilingues-29n";
export const P_FORMENTERA = "/elecciones/formentera-senador-propio-29n";
const P_CERA = "/elecciones/voto-residentes-extranjero-cera";
const L = {
  canarias: { href: P_CANARIAS, label: "La hora de Canarias el 29-N: cierre a las 21:00 peninsulares" },
  formentera: { href: P_FORMENTERA, label: "Formentera elige por primera vez su propio senador" },
  cera: { href: P_CERA, label: "Votar desde el extranjero (CERA): plazos del 29-N" },
  erta: { href: "/elecciones/voto-temporalmente-fuera-erta", label: "Fuera una temporada (ERTA): pide el voto hasta el 31-oct" },
  senado: { href: "/elecciones/como-votar-al-senado", label: "Cómo se vota al Senado" },
  encuestas: { href: "/elecciones/encuestas-prohibidas", label: "Encuestas prohibidas del 24 al 28 de noviembre" },
  resultados: { href: "/elecciones/resultados-y-escrutinio", label: "Resultados y escrutinio del 29-N" },
  calendario: { href: "/elecciones/calendario-29-noviembre", label: "Calendario completo del 29-N" },
  correo: { href: "/elecciones/voto-por-correo", label: "Cómo pedir el voto por correo" },
  candidaturas: { href: "/elecciones/candidaturas-29n-boe", label: "Listas del 29-N: cuándo salen en el BOE" },
  nietos: { href: "/elecciones/votar-ley-de-nietos-29n", label: "¿Puedo votar si me nacionalicé por la ley de nietos?" },
  cruces: { href: P_CRUCES, label: "Cuántas cruces en el Senado, por provincia e isla" },
  ceuta: { href: P_CEUTA, label: "Ceuta y Melilla: 1 diputado y 2 senadores" },
  bilingue: { href: P_BILINGUE, label: "Papeletas bilingües: dónde y si cuenta el voto" },
  nulo: { href: "/elecciones/voto-nulo-ejemplos", label: "Voto nulo: ejemplos" },
  reflexion: { href: "/elecciones/jornada-de-reflexion", label: "Jornada de reflexión: 28 de noviembre" },
};
const BY = "Por Equipo RutaTrámite. Última revisión: 25 de octubre de 2026.";

export const TERRITORIO_29N_GUIDES: Guide[] = [
  {
    id: "29n-hora-canarias",
    pack: "elecciones",
    reviewedAt: R,
    path: P_CANARIAS,
    h1: "La hora de Canarias el 29-N: se vota de 9:00 a 20:00 hora canaria (21:00 peninsular)",
    title: "Hora de Canarias el 29-N: cierre a las 21:00 peninsulares",
    description: "En Canarias se vota de 9:00 a 20:00 hora local, las 21:00 en la península. Por eso la Junta Electoral pide no dar resultados ni estimaciones antes. Senado: cuántas cruces por isla.",
    lead: "Respuesta corta: en Canarias los colegios abren a las 9:00 y cierran a las 20:00, en hora canaria, igual que en el resto de España (artículo 84 de la LOREG). Como Canarias va una hora por detrás, allí se cierra cuando en la península son las 21:00. Por eso la Junta Electoral Central sostiene desde hace años que no se deben difundir estimaciones ni resultados en Canarias antes de las 21:00 hora peninsular.",
    cta: S.jec352,
    secondaryCta: S.a84,
    sources: [S.a84, S.jec352, S.jec400, S.a165, S.a166, S.a69, S.jec],
    related: [L.resultados, L.encuestas, L.senado, L.formentera, L.reflexion, L.calendario],
    faqs: [
      { q: "¿A qué hora cierran los colegios en Canarias el 29 de noviembre?", a: "A las 20:00 hora canaria, que son las 21:00 en la península. Abren a las 9:00 hora canaria (las 10:00 peninsulares)." },
      { q: "¿Se pueden dar resultados antes de que cierre Canarias?", a: "La Junta Electoral Central ha dicho en varios acuerdos (por ejemplo, el 352/2000 y el 400/2019, que habla de «doctrina reiterada») que no deben difundirse estimaciones ni resultados en Canarias antes de las 21:00 hora peninsular, para no influir en quien aún puede votar allí." },
      { q: "¿Las encuestas a pie de urna se pueden publicar a las 20:00 en la península?", a: "La doctrina de la Junta se refiere a su difusión en el ámbito de Canarias antes de las 21:00 peninsulares. Si dudas sobre un caso concreto, lo que vale es el acuerdo que publique la Junta Electoral Central para esta elección." },
      { q: "¿Cuántas cruces pongo en el Senado si voto en Canarias?", a: "Depende de la isla: hasta 2 en Gran Canaria y Tenerife (que eligen 3 senadores), y solo 1 en Fuerteventura, Lanzarote, La Palma, La Gomera y El Hierro (que eligen 1 cada una). Artículos 165.2 y 166.1.a de la LOREG." },
      { q: "¿Las fechas de plazo (voto por correo, encuestas) son distintas en Canarias?", a: "No. Las fechas son las mismas para toda España: voto por correo hasta el 19 de noviembre y prohibición de publicar sondeos del 24 al 28 de noviembre." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BY], [[
        "Votación: de 9:00 a 20:00 hora canaria (de 10:00 a 21:00 hora peninsular).",
        "Resultados y estimaciones: la Junta Electoral Central pide no difundirlos en Canarias antes de las 21:00 peninsulares.",
        "Senado: 2 cruces como máximo en Gran Canaria y Tenerife; 1 en el resto de islas.",
        "Plazos iguales que en la península: voto por correo hasta el 19-nov; sondeos prohibidos del 24 al 28-nov.",
      ]]),
      {
        id: "tabla-horas",
        title: "Las horas del 29-N, en Canarias y en la península",
        paragraphs: ["El artículo 84 de la LOREG fija la votación «a las nueve horas» y «hasta las veinte horas» en cada mesa, en la hora local de cada sitio."],
        table: {
          caption: "Domingo 29 de noviembre de 2026",
          head: ["Momento", "Hora canaria", "Hora peninsular"],
          rows: [
            { cells: ["Constitución de las mesas", "8:00", "9:00"], source: S.jec },
            { cells: ["Abren los colegios", "9:00", "10:00"], source: S.a84 },
            { cells: ["Cierran los colegios (península)", "19:00", "20:00"], source: S.a84 },
            { cells: ["Cierran los colegios (Canarias)", "20:00", "21:00"], source: S.a84 },
            { cells: ["Desde cuándo pueden difundirse resultados en Canarias, según la JEC", "20:00", "21:00"], source: S.jec352 },
          ],
        },
      },
      sec("por-que", "Por qué la Junta Electoral pide esperar a las 21:00", [
        "En el Acuerdo 352/2000 la Junta Electoral Central dijo que, «en aras de salvaguardar la objetividad y transparencia del proceso electoral y el principio de igualdad», la información sobre estimaciones de resultados «no debe emitirse en el ámbito de la Comunidad Autónoma de Canarias antes de las 21 horas, hora peninsular».",
        "En el Acuerdo 400/2019 lo repitió como «doctrina reiterada»: no deben difundirse los resultados hasta las 21:00, «que es la hora prevista de cierre de los colegios electorales en las Islas Canarias».",
        "No es un artículo de la LOREG, sino un criterio de la Junta basado en su artículo 8. Si la Junta publica un acuerdo específico para el 29-N, lo añadiremos aquí.",
      ]),
      {
        id: "senado-islas",
        title: "Senado en Canarias: cuántos senadores y cuántas cruces por isla",
        paragraphs: ["Cada isla es su propia circunscripción para el Senado (artículo 161.2). Puedes marcar menos cruces de las permitidas, pero no más."],
        table: {
          caption: "Senado en Canarias, 29-N",
          head: ["Isla", "Senadores que elige", "Cruces como máximo"],
          rows: [
            { cells: ["Gran Canaria", "3", "2"], source: S.a166 },
            { cells: ["Tenerife", "3", "2"], source: S.a166 },
            { cells: ["Fuerteventura", "1", "1"], source: S.a166 },
            { cells: ["Lanzarote", "1", "1"], source: S.a166 },
            { cells: ["La Palma", "1", "1"], source: S.a166 },
            { cells: ["La Gomera", "1", "1"], source: S.a166 },
            { cells: ["El Hierro", "1", "1"], source: S.a166 },
          ],
        },
      },
      sec("ejemplos", "Ejemplos", [
        "Vives en Las Palmas de Gran Canaria: votas hasta las 20:00 (hora canaria). En la papeleta sepia del Senado puedes marcar 1 o 2 nombres, de la misma o de distintas candidaturas.",
        "Vives en Arrecife (Lanzarote): en el Senado solo puedes marcar 1 nombre.",
        "Ves la tele a las 20:30 hora peninsular en Tenerife: allí son las 19:30 y los colegios siguen abiertos.",
      ]),
      sec("en-penisula", "Si eres canario y votas desde la península o el extranjero", [
        "Si estás empadronado en Canarias pero estarás en otro sitio el 29-N, puedes pedir el voto por correo hasta el 19 de noviembre (artículo 72 de la LOREG y calendario de la Junta). Si vives fuera de España y estás en el CERA, te llega la documentación sin pedirla.",
      ]),
    ],
  },
  {
    id: "29n-formentera-senador",
    pack: "elecciones",
    reviewedAt: R,
    path: P_FORMENTERA,
    h1: "Formentera elige por primera vez su propio senador el 29-N",
    title: "Formentera elige su propio senador el 29-N: qué cambia",
    description: "Por la Ley Orgánica 2/2026 (BOE del 2-7-2026), Ibiza y Formentera dejan de compartir senador: cada isla elige uno. En la papeleta marcas 1 cruz. Qué cambia y cuándo salen los candidatos.",
    lead: "Respuesta corta: sí, el 29 de noviembre de 2026 es la primera vez que Formentera elige un senador solo para ella. Hasta ahora Ibiza y Formentera formaban una única circunscripción que elegía un senador. La Ley Orgánica 2/2026, publicada en el BOE el 2 de julio de 2026, separa las dos islas: Ibiza elige uno y Formentera otro. En la papeleta del Senado puedes marcar un solo nombre.",
    cta: S.lo2,
    secondaryCta: S.a165,
    sources: [S.lo2, S.a161, S.a165, S.a166, S.rd, S.jec],
    related: [L.senado, L.canarias, L.candidaturas, L.calendario, L.correo],
    faqs: [
      { q: "¿Cuántos senadores eligen ahora Ibiza y Formentera?", a: "Uno cada isla: dos en total. Antes elegían uno entre las dos (artículo 165.2 de la LOREG, en la redacción de la Ley Orgánica 2/2026)." },
      { q: "¿Cuántas cruces pongo en la papeleta del Senado en Formentera?", a: "Una. El artículo 166.1.a de la LOREG permite marcar un candidato en las circunscripciones insulares que no son Gran Canaria, Mallorca ni Tenerife." },
      { q: "¿Por qué ha cambiado?", a: "Primero se reformó el artículo 69.3 de la Constitución, que ahora da a Ibiza y a Formentera un senador propio a cada una. La Ley Orgánica 2/2026 adapta la ley electoral a esa reforma, según su preámbulo." },
      { q: "¿Cambia algo en el Congreso?", a: "No. Para el Congreso, Formentera sigue votando dentro de la circunscripción de Illes Balears." },
      { q: "¿Quiénes son los candidatos al Senado por Formentera?", a: "Los oficiales serán los que proclame la Junta Electoral Provincial el 2 de noviembre y publique el BOE el 3 de noviembre. Hasta entonces no los publicamos." },
      { q: "¿Cuántos senadores se eligen en total el 29-N?", a: "Sumando el artículo 165 de la LOREG: 188 en las 47 provincias (4 cada una), 9 en Gran Canaria, Mallorca y Tenerife, 8 en el resto de islas (ahora con Formentera) y 4 en Ceuta y Melilla. En total, 209 elegidos por los votantes. A ellos se suman los que designan los parlamentos autonómicos." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BY], [[
        "Antes: Ibiza y Formentera, una circunscripción, 1 senador.",
        "Ahora (Ley Orgánica 2/2026, en vigor desde el 3 de julio de 2026): Ibiza, 1 senador; Formentera, 1 senador.",
        "En Formentera marcas como máximo 1 nombre en la papeleta sepia del Senado.",
        "Congreso: nada cambia; Formentera vota en Illes Balears.",
        "Candidatos oficiales: BOE del 3 de noviembre.",
      ]]),
      {
        id: "antes-despues",
        title: "Qué cambia en la ley, artículo por artículo",
        paragraphs: ["La Ley Orgánica 2/2026, de 30 de junio, tiene un artículo único que modifica dos apartados de la LOREG."],
        table: {
          caption: "LOREG antes y después de la Ley Orgánica 2/2026",
          head: ["Artículo", "Antes", "Ahora"],
          rows: [
            { cells: ["161.2 (circunscripciones del Senado en las islas)", "Ibiza-Formentera era una sola circunscripción", "Ibiza y Formentera son dos circunscripciones distintas"], source: S.a161 },
            { cells: ["165.2 (senadores por isla)", "Ibiza-Formentera: 1 senador", "Ibiza: 1. Formentera: 1"], source: S.a165 },
            { cells: ["166.1.a (cruces)", "1 cruz en Ibiza-Formentera", "Sin cambios en el texto: 1 cruz en cada isla"], source: S.a166 },
          ],
        },
      },
      sec("mallorca-menorca", "El resto de Baleares", [
        "Mallorca elige 3 senadores y puedes marcar hasta 2 nombres. Menorca elige 1 y marcas 1. Ibiza elige 1 y marcas 1 (artículos 165.2 y 166.1.a).",
      ]),
      sec("ejemplo", "Ejemplo", [
        "Vives en Sant Francesc Xavier (Formentera). El 29-N recibes en tu mesa la papeleta del Congreso de Illes Balears (blanca) y una papeleta sepia del Senado solo con las candidaturas de Formentera. Marcas un nombre, o ninguno si quieres votar en blanco al Senado. Si marcas dos, el voto al Senado puede ser nulo.",
      ]),
      sec("cuando-candidatos", "Cuándo sabrás quién se presenta", [
        "Según el calendario de la Junta Electoral Central, el BOE publica las candidaturas presentadas el 28 de octubre, se proclaman el 2 de noviembre y el BOE publica las proclamadas el 3 de noviembre. Actualizaremos esta página con la lista oficial de Formentera ese día.",
      ]),
    ],
  },
  {
    id: "29n-cruces-senado-territorio",
    pack: "elecciones",
    reviewedAt: R,
    path: P_CRUCES,
    h1: "¿Cuántas cruces puedo poner en el Senado? Tabla por provincia e isla (29-N)",
    title: "Cuántas cruces en el Senado el 29-N: provincia por provincia",
    description: "Hasta 3 cruces en las provincias; 2 en Gran Canaria, Mallorca, Tenerife, Ceuta y Melilla; 1 en el resto de islas, también Formentera. Artículo 166 de la LOREG.",
    lead: "Respuesta corta: en las 47 provincias que votan al Senado como provincia (todas salvo las insulares) puedes marcar hasta 3 nombres en la papeleta sepia del Senado; en Gran Canaria, Mallorca, Tenerife, Ceuta y Melilla, hasta 2; en Ibiza, Formentera, Menorca, Fuerteventura, Lanzarote, La Palma, La Gomera y El Hierro, solo 1. Lo dice el artículo 166.1.a de la LOREG.",
    cta: S.a166,
    secondaryCta: S.a165,
    sources: [S.a166, S.a165, S.a161, S.lo2, S.rd],
    related: [L.senado, L.formentera, L.canarias, L.ceuta, L.nulo, L.calendario],
    faqs: [
      { q: "¿Puedo marcar menos cruces de las permitidas?", a: "Sí. Puedes marcar una, varias o ninguna, siempre sin pasar del máximo de tu circunscripción." },
      { q: "¿Qué pasa si pongo más cruces de las permitidas?", a: "El voto al Senado puede considerarse nulo. Tu voto al Congreso, que va en otro sobre, no se ve afectado." },
      { q: "¿Puedo marcar candidatos de partidos distintos?", a: "Sí. En el Senado votas a personas, y puedes repartir tus cruces entre distintas candidaturas." },
      { q: "¿Por qué en Formentera solo 1?", a: "Porque desde la Ley Orgánica 2/2026 Formentera elige un único senador propio, y en las islas que eligen uno se marca un nombre." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BY]),
      {
        id: "tabla",
        title: "Senadores y cruces por tipo de circunscripción",
        paragraphs: ["En cada circunscripción se pueden marcar menos nombres que senadores elige: así la minoría también puede tener representación."],
        table: {
          caption: "Senado 29-N: cuántos nombres puedes marcar (art. 165 y 166.1.a LOREG)",
          head: ["Dónde votas", "Senadores que elige", "Cruces como máximo"],
          rows: [
            { cells: ["Cualquiera de las 47 provincias (todas salvo Illes Balears, Las Palmas y Santa Cruz de Tenerife, que votan por islas)", "4", "3"], source: S.a166 },
            { cells: ["Gran Canaria, Mallorca, Tenerife", "3", "2"], source: S.a166 },
            { cells: ["Ceuta, Melilla", "2", "2"], source: S.a166 },
            { cells: ["Ibiza, Formentera, Menorca, Fuerteventura, Lanzarote, La Palma, La Gomera, El Hierro", "1", "1"], source: S.a166 },
          ],
        },
      },
      sec("suma", "Cuántos senadores se eligen en total", [
        "Sumando el artículo 165 de la LOREG: 47 provincias × 4 = 188; Gran Canaria, Mallorca y Tenerife, 3 × 3 = 9; las otras 8 islas, 8; Ceuta y Melilla, 2 + 2 = 4. Total: 209 senadores elegidos directamente. Los parlamentos autonómicos designan además otros senadores, que no se votan el 29-N.",
      ]),
      sec("ejemplos", "Ejemplos", [
        "Votas en Soria: puedes marcar 1, 2 o 3 nombres.",
        "Votas en Palma (Mallorca): hasta 2 nombres.",
        "Votas en Melilla: hasta 2 nombres, aunque la ciudad elige 2 senadores.",
        "Votas en Formentera o en El Hierro: 1 nombre.",
      ]),
    ],
  },
  {
    id: "29n-ceuta-melilla",
    pack: "elecciones",
    reviewedAt: R,
    path: P_CEUTA,
    h1: "Ceuta y Melilla el 29-N: 1 diputado y 2 senadores cada una",
    title: "Ceuta y Melilla el 29-N: diputados, senadores y cruces",
    description: "Ceuta y Melilla eligen 1 diputado y 2 senadores cada una. En el Senado puedes marcar hasta 2 nombres. Fechas, voto por correo y fuentes oficiales.",
    lead: "Respuesta corta: Ceuta y Melilla son cada una una circunscripción que elige 1 diputado (artículo 162.2 de la LOREG) y 2 senadores (artículo 165.3). En la papeleta del Senado puedes marcar hasta 2 nombres (artículo 166.1.a). Como solo hay un escaño en el Congreso, se lo lleva la candidatura con más votos.",
    cta: S.a162,
    secondaryCta: S.a165,
    sources: [S.a162, S.a165, S.a166, S.rd, S.jec],
    related: [L.cruces, L.senado, L.correo, L.calendario, L.candidaturas],
    faqs: [
      { q: "¿Cuántos diputados eligen Ceuta y Melilla?", a: "Uno cada una (artículo 162.2 de la LOREG)." },
      { q: "¿Cuántos senadores?", a: "Dos cada una (artículo 165.3). Puedes marcar hasta 2 nombres." },
      { q: "¿Las fechas son distintas?", a: "No. Voto por correo hasta el 19 de noviembre, campaña del 13 al 27, votación el 29 de 9:00 a 20:00." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BY], [[
        "Congreso: 1 diputado por Ceuta y 1 por Melilla.",
        "Senado: 2 senadores por cada ciudad; hasta 2 cruces.",
        "Mismas fechas que en el resto de España.",
      ]]),
      sec("un-escano", "Qué significa elegir un solo diputado", [
        "Con un solo escaño, el reparto proporcional no tiene efecto práctico: con la fórmula del artículo 163 de la LOREG, el único escaño va a la candidatura más votada en la ciudad.",
      ]),
      sec("ejemplo", "Ejemplo", [
        "Votas en Ceuta: en la papeleta blanca eliges una lista para el Congreso; en la sepia marcas hasta 2 personas para el Senado, de la misma o de distintas candidaturas.",
      ]),
    ],
  },
  {
    id: "29n-papeletas-bilingues",
    pack: "elecciones",
    reviewedAt: R,
    path: P_BILINGUE,
    h1: "Papeletas y sobres bilingües el 29-N: dónde y si cuenta el voto",
    title: "Papeletas bilingües el 29-N: dónde se usan y qué vale",
    description: "En las comunidades con lengua cooficial, papeletas y sobres van en castellano y en esa lengua (RD 605/1999, art. 4.6). En Navarra, en la zona vascófona.",
    lead: "Respuesta corta: en las comunidades autónomas con otra lengua oficial además del castellano, las papeletas y los sobres oficiales se imprimen en las dos lenguas. En Navarra, en los municipios de la zona vascófona de la Ley Foral 18/1986. Lo dice el artículo 4.6 del Real Decreto 605/1999. Votar con la papeleta en una lengua u otra no cambia nada: el voto vale igual.",
    cta: S.rd605,
    secondaryCta: S.jec,
    sources: [S.rd605, S.a166, S.jec],
    related: [L.nulo, L.senado, L.cruces, L.correo],
    faqs: [
      { q: "¿Dónde son bilingües las papeletas?", a: "En las comunidades autónomas con lengua cooficial (Cataluña, Comunitat Valenciana, Illes Balears, Galicia y País Vasco) y, en Navarra, en la zona vascófona de la Ley Foral 18/1986." },
      { q: "¿Mi voto es nulo si uso una papeleta solo en castellano?", a: "No por la lengua. La papeleta tiene que ser la oficial de tu circunscripción; si dudas, usa las que hay en el colegio." },
      { q: "¿Y el voto por correo?", a: "Recibes las papeletas y sobres oficiales de tu circunscripción, con el mismo criterio de lengua." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BY], [[
        "Bilingües: papeletas y sobres en comunidades con lengua cooficial y en la zona vascófona de Navarra.",
        "En el resto de España: solo en castellano.",
        "La lengua de la papeleta no cambia el valor del voto.",
      ]]),
      sec("que-revisar", "Qué sí puede anular tu voto", [
        "Usar una papeleta que no es el modelo oficial, meter papeletas de distintas candidaturas en el sobre del Congreso, tachar o añadir nombres, o pasar del número de cruces en el Senado. La lengua no es una de esas causas.",
      ]),
    ],
  },
];

type Extra = { drop?: string[]; sections: GuideSection[]; faqs?: Guide["faqs"]; sources?: Guide["sources"]; related?: Guide["related"]; lead?: string; description?: string };
const AMPL: Record<string, Extra> = {
  [P_CERA]: {
    description: "CERA: no hay que pedir el voto, llega de oficio del 24 al 30-oct. Correo al consulado hasta el 24-nov; urna del 21 al 26-nov. Plazos calculados.",
    lead: "Si vives en el extranjero y estás inscrito en el censo de residentes ausentes (CERA), no tienes que pedir el voto ni hay plazo de solicitud: desde la Ley Orgánica 12/2022 la Oficina del Censo Electoral te envía la documentación de oficio, entre el 24 y el 30 de octubre de 2026. Puedes mandar el voto por correo al consulado hasta el 24 de noviembre o votar en urna en el consulado del 21 al 26 de noviembre.",
    sections: [
      sec("no-hay-plazo-solicitud", "Importante: no hay plazo para «pedir» el voto CERA", [
        "Antes de 2022 había que solicitar el voto (el llamado «voto rogado») como muy tarde el día 25 después de la convocatoria. La Ley Orgánica 12/2022 cambió el artículo 75 de la LOREG: ahora la Delegación Provincial de la Oficina del Censo Electoral «remitirá de oficio» la documentación a cada persona inscrita en el CERA.",
        "Si alguien te dice que el plazo para pedir el voto desde el extranjero acaba a finales de octubre, se refiere a la norma antigua o al voto ERTA (quien vive en España y está fuera una temporada), que sí se pide hasta el 31 de octubre de 2026.",
      ]),
      {
        id: "calculo-plazos",
        title: "Cálculo de los plazos con la ley (convocatoria publicada el 6 de octubre)",
        paragraphs: ["El Real Decreto 806/2026 se publicó en el BOE el 6 de octubre de 2026, que cuenta como día de la convocatoria. Los resultados coinciden con el calendario oficial de la Junta Electoral Central."],
        table: {
          caption: "Voto CERA 29-N: qué dice el artículo 75 y en qué fecha cae",
          head: ["Qué", "Regla del art. 75 LOREG", "Cálculo", "Fecha 2026"],
          rows: [
            { cells: ["Envío de sobres y certificados", "Del día 18.º y antes del 25.º tras la convocatoria", "6-oct + 18 = 24-oct; antes del 31-oct", "24 a 30 de octubre"], source: S.jec },
            { cells: ["Envío de papeletas oficiales", "Del día 29.º al 33.º (39.º si hay recursos)", "6-oct + 29 = 4-nov; + 33 = 8-nov; + 39 = 14-nov", "4 a 8 de noviembre (6 a 14 si hay recursos)"], source: S.jec },
            { cells: ["Papeletas descargables", "Tras resolver recursos y no después del 5.º día desde la proclamación", "Proclamación 2-nov + 5 = 7-nov", "2 a 7 de noviembre"], source: S.jec },
            { cells: ["Voto en urna en el consulado", "Del 8.º al 3.er día antes de la elección, ambos incluidos", "29-nov − 8 = 21-nov; 29-nov − 3 = 26-nov", "21 a 26 de noviembre"], source: S.a75 },
            { cells: ["Voto por correo al consulado", "No más tarde del 5.º día antes de la elección", "29-nov − 5 = 24-nov", "Hasta el 24 de noviembre"], source: S.a75 },
            { cells: ["Último día en que el consulado acepta sobres por correo", "No valen los que lleguen después del 2.º día antes", "29-nov − 2 = 27-nov", "Hasta el 27 de noviembre"], source: S.a75 },
          ],
        },
      },
      sec("que-hacer-ya", "Qué hacer ahora, paso a paso", [], [[
        "Comprueba en tu consulado o en la sede del INE que estás inscrito en el CERA con la dirección correcta: el sobre se envía por correo certificado a esa dirección.",
        "Espera la documentación (sale entre el 24 y el 30 de octubre). Si a mediados de noviembre no te ha llegado, pregunta en tu consulado: puedes votar en urna con los documentos que allí tienen disponibles.",
        "Las papeletas oficiales llegan aparte (4 a 8 de noviembre) o puedes descargarlas del 2 al 7 de noviembre con el enlace de la hoja informativa.",
        "Por correo: no envíes el sobre antes de la proclamación definitiva de candidaturas; no sería válido. Mándalo como muy tarde el 24 de noviembre.",
        "En urna: lleva pasaporte o DNI y uno de los certificados de inscripción, del 21 al 26 de noviembre.",
      ]]),
      sec("por-pais", "¿Y en mi país?", [
        "Las fechas son las mismas en todos los países. Los horarios y los centros habilitados para votar en urna los fija cada consulado y vienen en la documentación que recibes; también los publica Exteriores. No publicamos horarios por país porque no hay una lista oficial única.",
      ]),
    ],
    faqs: [
      { q: "¿Hasta cuándo tengo que pedir el voto si vivo en el extranjero?", a: "No tienes que pedirlo. Desde la Ley Orgánica 12/2022 el voto de los inscritos en el CERA llega de oficio. La documentación sale del 24 al 30 de octubre de 2026." },
      { q: "¿Cuándo puedo votar en el consulado?", a: "Del 21 al 26 de noviembre de 2026, ambos incluidos (del 8.º al 3.er día antes de la elección, artículo 75.4 de la LOREG)." },
    ],
    sources: [S.a75, S.lo12, S.jec, S.rd],
    related: [L.erta, L.nietos, L.canarias],
  },
  "/elecciones/encuestas-prohibidas": {
    drop: ["detalle"],
    sections: [
      sec("canarias-y-fechas", "Canarias y el resto de España: mismas fechas", [
        "El artículo 69.7 de la LOREG prohíbe publicar, difundir o reproducir sondeos por cualquier medio durante los cinco días anteriores al de la votación. Para el 29-N son del 24 al 28 de noviembre, en toda España, también en Canarias.",
        "La diferencia en Canarias está en la noche electoral: la Junta Electoral Central ha dicho en varios acuerdos que no se difundan estimaciones ni resultados allí antes de las 21:00 hora peninsular, cuando cierran sus colegios.",
        "Si ves un «sondeo» circulando esos días, comprueba quién lo firma y cuándo se hizo antes de creerlo o compartirlo.",
      ]),
    ],
    faqs: [
      { q: "¿En Canarias la prohibición de encuestas es distinta?", a: "No. Es del 24 al 28 de noviembre en toda España. Lo que cambia es la noche del 29: según la Junta Electoral Central, en Canarias no deben difundirse estimaciones ni resultados antes de las 21:00 hora peninsular." },
    ],
    sources: [S.a69, S.jec352, S.jec400],
    related: [L.canarias],
  },
  "/elecciones/cambio-de-domicilio-y-censo": {
    sections: [
      {
        id: "voto-correo-mudanza",
        title: "Si te has mudado lejos: vota por correo (hasta el 19 de noviembre)",
        paragraphs: [
          "El artículo 72 de la LOREG permite pedir el voto por correo «a partir de la fecha de la convocatoria y hasta el décimo día anterior al de la votación». Para el 29-N: del 6 de octubre al 19 de noviembre. Puedes indicar tu dirección nueva para recibir la documentación.",
        ],
        table: {
          caption: "Voto por correo si vives lejos de tu mesa",
          head: ["Paso", "Fecha", "Cálculo"],
          rows: [
            { cells: ["Pedir el voto en Correos", "Hasta el 19 de noviembre", "29-nov − 10 días (art. 72)"], source: S.a72 },
            { cells: ["Recibir la documentación en casa", "Del 9 al 22 de noviembre", "Calendario JEC"], source: S.jec },
            { cells: ["Depositar el voto en Correos", "Hasta el 25 de noviembre", "Calendario JEC"], source: S.jec },
          ],
        },
      },
      sec("si-vives-fuera", "Si te has ido a vivir al extranjero", [
        "Si te diste de alta en el consulado (CERA) antes del cierre del censo, la documentación te llega de oficio; si sigues en el censo de España y solo estás fuera una temporada, puedes pedir el voto ERTA hasta el 31 de octubre de 2026.",
      ]),
    ],
    faqs: [
      { q: "¿Hasta cuándo pido el voto por correo si me he mudado?", a: "Hasta el 19 de noviembre de 2026 (artículo 72 de la LOREG: hasta el décimo día anterior a la votación)." },
    ],
    sources: [S.a72, S.jec],
    related: [L.correo, L.cera, L.erta],
  },
};

const mergeBy = <T,>(a: T[] | undefined, b: T[] | undefined, k: (x: T) => string): T[] => {
  const out = [...(a ?? [])];
  const seen = new Set(out.map(k));
  for (const x of b ?? []) if (!seen.has(k(x))) { seen.add(k(x)); out.push(x); }
  return out;
};
const ENTRANTES: Record<string, { href: string; label: string }[]> = {
  "/elecciones/como-votar-al-senado": [L.cruces, L.formentera, L.canarias, L.ceuta, L.bilingue],
  "/elecciones/voto-nulo-ejemplos": [L.cruces, L.bilingue],
  "/elecciones/voto-por-correo": [L.cera, L.bilingue],
  "/elecciones/resultados-y-escrutinio": [L.canarias],
  "/elecciones/encuestas-prohibidas": [L.canarias],
  "/elecciones/calendario-29-noviembre": [L.canarias, L.formentera, L.cera, L.cruces, L.ceuta],
  "/elecciones/voto-temporalmente-fuera-erta": [L.cera],
  "/elecciones/promesas/comunidad-canarias": [L.canarias],
};
const HECHAS = new WeakSet<Guide>();
export function ampliarTerritorio(g: Guide): Guide {
  if (HECHAS.has(g)) return g;
  HECHAS.add(g);
  const x = AMPL[g.path];
  if (x) {
    Object.assign(g, {
      reviewedAt: R,
      ...(x.lead ? { lead: x.lead } : {}),
      ...(x.description ? { description: x.description } : {}),
      sections: [...x.sections, ...g.sections.filter((z) => !(x.drop ?? []).includes(z.id))],
      faqs: mergeBy(x.faqs, g.faqs, (f) => f.q),
      sources: mergeBy(g.sources, x.sources, (s) => s.href),
      related: mergeBy(g.related, x.related, (r) => r.href),
    });
  }
  const add = ENTRANTES[g.path];
  if (add) Object.assign(g, { related: mergeBy(g.related, add, (r) => r.href) });
  return g;
}
