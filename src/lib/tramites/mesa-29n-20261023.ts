import type { Guide, GuideSection } from "@/lib/tramites/types";
import { CASOS_EXTRA_SECTIONS, LC, MESA_CASOS_20261023_GUIDES, PARRAFOS_EXCUSA } from "@/lib/tramites/mesa-casos-20261023";

/**
 * Cluster «mesa electoral» del 23-10-2026, antes del sorteo (31-10 a 4-11-2026).
 * Fuentes verificadas en el BOE el 23-10-2026: LOREG (arts. 2, 26, 27, 28, 80, 88, 89, 101, 119, 120, 143),
 * Instrucción JEC 6/2011 consolidada (BOE-A-2011-7705), Ley 39/2015 art. 30, Orden INT/650/2026 y calendario JEC.
 * Ampliaciones de guías existentes + 5 guías nuevas con intención de búsqueda distinta.
 */
const LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672";
const loreg = (anchor: string, label: string) => ({ href: `${LOREG}#${anchor}`, label: `LOREG, ${label}` });
const S = {
  a2: loreg("ados", "artículo 2: quién tiene derecho de sufragio"),
  a26: loreg("aveintiseis", "artículo 26: sorteo, requisitos y suplentes"),
  a27: loreg("aveintisiete", "artículo 27: cargo obligatorio, excusa en 7 días y aviso de 72 horas"),
  a28: loreg("aveintiocho", "artículo 28: permiso retribuido y reducción de 5 horas"),
  a80: loreg("aochenta", "artículo 80: constitución de la mesa a las 8:00 y sustituciones"),
  a88: loreg("aochentayocho", "artículo 88: los miembros de la mesa votan al final"),
  a89: loreg("aochentaynueve", "artículo 89: siempre al menos dos miembros presentes"),
  a119: loreg("acientodiecinueve", "artículo 119: plazos en días naturales e improrrogables"),
  a90: loreg("anoventa", "artículo 90: no se puede detener a los miembros de mesa salvo flagrante delito"),
  a143: loreg("acientocuarentaytres", "artículo 143: delito por no acudir o no excusarse"),
  jec611: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2011-7705", label: "BOE: Instrucción 6/2011 de la Junta Electoral Central (texto consolidado), excusas de los miembros de mesa" },
  l39: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a30", label: "BOE: Ley 39/2015, artículo 30: cómputo de plazos" },
  ljca: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1998-16718#a46", label: "BOE: Ley 29/1998 de la Jurisdicción Contencioso-administrativa, artículo 46: plazo del recurso" },
  dieta: { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-13948", label: "BOE: Orden INT/650/2026, dieta de los miembros de las mesas electorales" },
  jec: { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario electoral de las elecciones generales 2026" },
  rd: { href: "https://www.boe.es/eli/es/rd/2026/10/05/806", label: "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre" },
  mesaInfo: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/miembros-de-mesa/informacion-general/permisos-y-dietas/", label: "Ministerio del Interior (Infoelectoral): permisos y dietas de los miembros de mesa" },
  tresCantos: { href: "https://www.elcorreoweb.es/espana/2023/05/28/mesa-electoral-nadie-primeros-votar-104446258.html", label: "El Correo de Andalucía (Europa Press), 28-05-2023: mesa de Tres Cantos constituida con otros electores" },
};

const R = "2026-10-23";
const DOCX = "/plantillas/escrito-excusa-mesa-electoral.docx";
const PDF = "/plantillas/escrito-excusa-mesa-electoral.pdf";

const P = {
  hub: "/elecciones/miembro-de-mesa",
  excusa: "/elecciones/excusa-mesa-electoral",
  sorteo: "/elecciones/sorteo-mesa-electoral-29n",
  noVoy: "/elecciones/que-pasa-si-no-voy-a-la-mesa",
  dieta: "/elecciones/miembro-de-mesa-dieta-y-permisos",
  horario: "/elecciones/horario-mesa-electoral",
  modelo: "/elecciones/modelo-escrito-excusa-mesa-electoral",
  suplente: "/elecciones/suplente-mesa-electoral",
  primero: "/elecciones/primero-en-votar-mesa-electoral",
  denegada: "/elecciones/excusa-mesa-electoral-denegada",
  casos: "/elecciones/mesa-electoral-casos-especiales",
};

const L = {
  hub: { href: P.hub, label: "Me ha tocado mesa electoral: qué hago" },
  excusa: { href: P.excusa, label: "Excusa para no ir a la mesa: causas y plazo de 7 días" },
  sorteo: { href: P.sorteo, label: "Cuándo es el sorteo y cuándo te avisan" },
  noVoy: { href: P.noVoy, label: "Qué pasa si te toca mesa y no vas" },
  dieta: { href: P.dieta, label: "Dieta de 75 € y permisos de la mesa" },
  horario: { href: P.horario, label: "Horario de la mesa electoral el 29-N" },
  modelo: { href: P.modelo, label: "Modelo de escrito de excusa (Word, PDF y texto)" },
  suplente: { href: P.suplente, label: "Me ha tocado suplente: qué tengo que hacer" },
  primero: { href: P.primero, label: "¿Te ponen en la mesa si eres el primero en votar?" },
  denegada: { href: P.denegada, label: "Me han denegado la excusa: qué puedo hacer" },
  casos: { href: P.casos, label: "Mesa electoral: autónomos, teletrabajo, estudiantes y más" },
};

const COMO_REVISAMOS: GuideSection = {
  id: "como-revisamos",
  title: "Cómo revisamos esta guía",
  paragraphs: [
    "La redacta y revisa el Equipo RutaTrámite. Cada regla sale del texto consolidado del BOE (LOREG e Instrucción 6/2011 de la Junta Electoral Central) o del calendario oficial de la Junta Electoral Central para el 29-N; los enlaces están en «Fuentes».",
    "No inventamos plazos: cuando una fecha depende de tu notificación, te damos la regla y un ejemplo calculado. Lo que decide en tu caso es la Junta Electoral de Zona que figura en la notificación. Si ves un error, avísanos desde Contacto.",
  ],
};

const CALENDARIO: GuideSection = {
  id: "calendario-mesa-29n",
  title: "Calendario de la mesa electoral del 29-N",
  paragraphs: ["Fechas fijas del calendario de la Junta Electoral Central y plazos de la LOREG. Los plazos de la LOREG son en días naturales e improrrogables (artículo 119): cuentan sábados y domingos."],
  table: {
    caption: "Fechas clave para miembros de mesa y suplentes (29-N de 2026)",
    head: ["Cuándo", "Qué pasa", "Fuente"],
    rows: [
      { cells: ["31 de octubre a 4 de noviembre", "Sorteo público de presidentes, vocales y suplentes en cada ayuntamiento (días 25 a 29 tras la convocatoria)"], source: S.jec },
      { cells: ["3 días tras el sorteo (hasta el 7 de noviembre si se sortea el 4)", "Notificación en mano con el manual de instrucciones"], source: S.a27 },
      { cells: ["7 días naturales desde la notificación", "Plazo para presentar la excusa ante la Junta Electoral de Zona"], source: S.a27 },
      { cells: ["5 días desde la excusa", "La Junta resuelve, sin recurso electoral, y avisa al primer suplente si te sustituye"], source: S.a27 },
      { cells: ["72 horas antes (jueves 26 de noviembre, 8:00, si cuentas desde la constitución)", "Último momento para avisar de un impedimento nuevo; después, aviso inmediato"], source: S.a27 },
      { cells: ["Domingo 29 de noviembre, 8:00", "Titulares y suplentes se presentan en el colegio; votación de 9:00 a 20:00"], source: S.a80 },
      { cells: ["Lunes 30 de noviembre", "Reducción de 5 horas de jornada para quien trabajó en la mesa"], source: S.a28 },
    ],
  },
};

/* ---------------- Ampliaciones de guías existentes ---------------- */

type Ext = { sections: GuideSection[]; faqs?: { q: string; a: string }[]; sources?: { href: string; label: string }[]; related?: { href: string; label: string }[] };

export const AMPLIACION_MESA_20261023: Record<string, Ext> = {
  [P.excusa]: {
    sources: [S.a119, S.l39, S.a143],
    related: [L.modelo, L.denegada, L.suplente, L.casos, L.primero, LC.fuera, LC.trabajo, LC.examen, LC.cuidado, LC.hijos],
    sections: [
      {
        id: "plazo-ejemplo",
        title: "Plazo de la excusa: ejemplo con fechas",
        paragraphs: [
          "Tienes 7 días para presentar la excusa ante la Junta Electoral de Zona (artículo 27.3 de la LOREG). Son días naturales (artículo 119) y, como en todo plazo administrativo, se cuentan desde el día siguiente a la notificación (artículo 30 de la Ley 39/2015, aplicable por el artículo 120 de la LOREG).",
          "Ejemplo: si te notifican el martes 3 de noviembre, el primer día es el miércoles 4 y el último el martes 10 de noviembre. Si te notifican el sábado 7, el último día es el sábado 14: la LOREG dice que los plazos son improrrogables, así que no cuentes con que pase al lunes y preséntala antes.",
          "Pasados los 7 días, la vía es el aviso del artículo 27.4: si después te surge un impedimento, comunícalo a la Junta al menos 72 horas antes del día 29 con justificantes, o de inmediato si surge más tarde.",
        ],
      },
      {
        id: "excusa-vs-recurso",
        title: "Excusa, aviso y recurso no son lo mismo",
        paragraphs: [],
        lists: [
          [
              "Excusa (artículo 27.3): escrito con causa justificada y documentada, en 7 días desde la notificación. Es lo que hace casi todo el mundo.",
              "Aviso de impedimento (artículo 27.4): para causas que aparecen después, como una baja médica. Al menos 72 horas antes o, si surge después, de inmediato y siempre antes de que se constituya la mesa.",
              "Recurso: la decisión de la Junta no admite recurso electoral («sin ulterior recurso»), pero la Instrucción 6/2011 recuerda que cabe recurso contencioso-administrativo ante el Juzgado de lo Contencioso. En la práctica tarda más que la elección: lee la guía de excusa denegada.",
            ],
        ],
      },
      {
        id: "causas-que-no-valen",
        title: "Causas que normalmente no bastan solas",
        paragraphs: [
          "La Instrucción 6/2011 no da una lista de causas rechazadas, pero sí exige que la causa sea justificada y documentada y que las de tipo laboral o personal se valoren caso a caso. Sin documento, la Junta no tiene con qué aceptarla.",
        ],
        lists: [
          [
              "Tener plan, viaje de ocio o entradas compradas sin más justificación: no está entre las causas de la Instrucción.",
              "Trabajar el domingo por cuenta ajena: la ley ya te da permiso retribuido (artículo 28); solo cuentan los servicios esenciales con informe del responsable o los eventos públicos insustituibles que describe la Instrucción.",
              "Vivir lejos del colegio sin haber cambiado de comunidad autónoma: la Instrucción solo menciona el traslado de residencia a otra comunidad, y además hay que acreditar la dificultad.",
              "No querer o no saber: el cargo es obligatorio (artículo 27.1) y con la notificación recibes un manual.",
            ],
        ],
      },
      {
        id: "como-presentarla-paso-a-paso",
        title: "Cómo presentarla, paso a paso",
        paragraphs: [],
        lists: [
          [
              "Lee la notificación: indica tu cargo (presidente, vocal o suplente), tu mesa y la Junta Electoral de Zona que decide.",
              "Elige la causa y reúne el documento que la prueba (certificado de discapacidad, parte de baja, informe médico, certificado de reducción de jornada, informe de la empresa…).",
              "Rellena el escrito: tienes un modelo en Word, PDF y texto para copiar.",
              "Preséntalo dentro de los 7 días en el lugar o canal que indique tu notificación (Junta Electoral de Zona, normalmente en los juzgados del partido judicial, u otro registro que señale) y quédate con copia sellada o justificante.",
              "Espera la resolución (5 días). Hasta que no te digan que te sustituyen, sigues designado.",
            ],
        ],
      },
      COMO_REVISAMOS,
    ],
    faqs: [
      { q: "¿El plazo de 7 días cuenta sábados y domingos?", a: "Sí. La LOREG dice que sus plazos son siempre en días naturales e improrrogables (artículo 119). Se cuentan desde el día siguiente a la notificación." },
      { q: "¿Qué pasa si presento la excusa fuera de plazo?", a: "La LOREG no prevé una excusa tardía. Si la causa es nueva, usa el aviso del artículo 27.4 (al menos 72 horas antes, o de inmediato si surge después). Si no lo es, la Junta puede no admitirla y sigues obligado a ir." },
      { q: "¿Hay un modelo oficial de escrito de excusa?", a: "No hay un modelo único estatal en la LOREG. Algunas juntas o ayuntamientos entregan su impreso con la notificación; si no, sirve un escrito con tus datos, la mesa, la causa y los documentos. Tienes un modelo para descargar en RutaTrámite." },
    ],
  },
  [P.sorteo]: {
    sources: [S.a119, S.a80],
    related: [L.suplente, L.modelo, L.primero],
    sections: [CALENDARIO, COMO_REVISAMOS],
    faqs: [
      { q: "¿Cuándo sabré si me ha tocado suplente?", a: "Igual que a los titulares: en el sorteo del 31 de octubre al 4 de noviembre se eligen dos suplentes por cada puesto (artículo 26.3) y se notifica en 3 días. Los suplentes también deben ir a las 8:00 del 29 de noviembre." },
    ],
  },
  [P.hub]: {
    sources: [S.jec611, S.a119],
    related: [L.modelo, L.suplente, L.denegada, L.casos, L.primero],
    sections: [
      {
        id: "guias-del-cluster-mesa",
        title: "Todas las guías de la mesa electoral",
        paragraphs: [],
        lists: [
          [
              "Antes del sorteo: cuándo es el sorteo (31 de octubre a 4 de noviembre) y cuándo te avisan.",
              "Si te toca: causas de excusa, plazo de 7 días naturales y modelo de escrito en Word y PDF.",
              "Si te deniegan la excusa: qué significa «sin ulterior recurso» y qué opciones quedan.",
              "Si eres suplente: a qué hora ir, cuándo cobras y qué pasa si no vas.",
              "Casos concretos: autónomos, teletrabajo, estudiantes con exámenes, discapacidad y extranjeros.",
              "El día 29: horario, comida, dónde votas tú y el mito de no ser el primero en votar.",
            ],
        ],
      },
      CALENDARIO,
      COMO_REVISAMOS,
    ],
  },
  [P.noVoy]: {
    sources: [S.jec611],
    related: [L.suplente, L.primero, L.excusa],
    sections: [
      {
        id: "que-hace-delito",
        title: "Qué conducta castiga exactamente el artículo 143",
        lists: [
          [
              "No acudir o no desempeñar las funciones, siendo presidente, vocal o suplente.",
              "Abandonar la mesa sin causa legítima.",
              "Incumplir sin causa justificada la obligación de excusa o de aviso previo (artículos 27.3 y 27.4).",
            ],
        ],
        paragraphs: [
          "La pena es prisión de 3 meses a 1 año o multa de 6 a 24 meses. Lo decide un juez penal tras el procedimiento que corresponda; la Junta Electoral de Zona informa al Ministerio Fiscal cuando la mesa no se ha podido constituir (artículo 80.4).",
          "Lo que evita el problema es avisar: una causa sobrevenida comunicada a tiempo y con justificante no es la conducta que describe el artículo 143.",
        ],
      },
      COMO_REVISAMOS,
    ],
  },
  [P.dieta]: {
    related: [L.suplente, L.casos],
    sections: [],
  },
};

function mergeBy<T>(a: T[] | undefined, b: T[] | undefined, key: (x: T) => string): T[] {
  const out = [...(a ?? [])];
  const seen = new Set(out.map(key));
  for (const x of b ?? []) if (!seen.has(key(x))) { out.push(x); seen.add(key(x)); }
  return out;
}

export function ampliarMesa(g: Guide): Guide {
  const x = AMPLIACION_MESA_20261023[g.path];
  if (!x) return g;
  return {
    ...g,
    reviewedAt: R,
    sections: [...g.sections, ...x.sections],
    faqs: mergeBy(g.faqs, x.faqs, (f) => f.q),
    sources: mergeBy(g.sources, x.sources, (s) => s.href),
    related: mergeBy(g.related, x.related, (r) => r.href),
  };
}

/* ---------------- Guías nuevas ---------------- */

const MODELO_TEXTO = `A LA JUNTA ELECTORAL DE ZONA DE [localidad]

[Nombre y apellidos], con DNI [número], domicilio en [dirección], teléfono [teléfono] y correo electrónico [correo],

EXPONGO:

1. Que he sido designado/a [presidente/a | vocal 1.º | vocal 2.º | suplente de …] de la Mesa Electoral [distrito, sección y mesa, p. ej. 01-004-B] del municipio de [municipio] para las Elecciones Generales del 29 de noviembre de 2026, según notificación recibida el [fecha].

2. Que concurre en mí la siguiente causa que me impide aceptar el cargo, prevista en el artículo 27.3 de la LOREG y en la Instrucción 6/2011 de la Junta Electoral Central:
[Describe la causa en una o dos frases. Ejemplos: «Tengo 67 años». «Tengo reconocida una discapacidad». «Estoy de baja por incapacidad temporal desde el [fecha]». «Estoy embarazada de más de seis meses». «Tengo reducción de jornada por guarda legal de un hijo menor de 12 años». «Trabajo como [profesión] en un servicio esencial el día de la votación».]

3. Que acompaño los siguientes documentos que lo acreditan:
- [Documento 1, p. ej. copia del DNI]
- [Documento 2, p. ej. certificado de discapacidad / parte de baja / informe médico / certificado de la empresa]

Por todo ello, SOLICITO:

Que se tenga por presentada en plazo esta excusa, se acepte la causa alegada y se me releve del cargo de [cargo] de la Mesa [identificación], comunicándolo al suplente que corresponda.

En [lugar], a [fecha].

Firma: ______________________`;

const BYLINE_LEAD = "Por el Equipo RutaTrámite. ";

export const MESA_29N_20261023_GUIDES: Guide[] = [
  ...MESA_CASOS_20261023_GUIDES,
  {
    id: "mesa-modelo-excusa",
    pack: "elecciones",
    reviewedAt: R,
    disclaimer: "Modelo orientativo y gratuito. No sustituye al impreso que te entregue la Junta Electoral de Zona; si te lo dan, úsalo.",
    path: P.modelo,
    h1: "Modelo de escrito de excusa para la mesa electoral (29-N)",
    title: "Modelo de escrito de excusa de mesa electoral: Word, PDF y texto",
    description: "Modelo gratuito para alegar ante la Junta Electoral de Zona una causa para no ser miembro de mesa el 29-N: en Word, PDF o para copiar, con ejemplos.",
    lead: "Si te ha tocado mesa y tienes una causa, el escrito de excusa se presenta ante la Junta Electoral de Zona en 7 días naturales desde la notificación (artículo 27.3 de la LOREG). Aquí tienes un modelo gratuito en Word, en PDF y en texto para copiar, con qué poner en cada hueco y qué documento adjuntar según la causa.",
    cta: { href: DOCX, label: "Descargar el modelo en Word (.docx)" },
    secondaryCta: { href: PDF, label: "Descargar el modelo en PDF" },
    sources: [S.a27, S.jec611, S.a119, S.l39],
    related: [L.excusa, L.denegada, L.suplente, L.casos, L.hub, LC.fuera, LC.trabajo, LC.examen, LC.cuidado, LC.hijos],
    faqs: [
      { q: "¿Dónde presento el escrito de excusa de la mesa electoral?", a: "Ante la Junta Electoral de Zona que figura en tu notificación, en el lugar o canal que esta indique. Guarda una copia sellada o el justificante de registro." },
      { q: "¿Tengo que adjuntar documentos?", a: "Sí. La LOREG exige causa «justificada y documentada» y la Instrucción 6/2011 pide acreditar la causa con un documento. Sin él, lo normal es que se deniegue." },
      { q: "¿Puede presentarlo otra persona por mí?", a: "La LOREG no lo prohíbe. Si lo entrega otra persona, el escrito debe ir firmado por ti y con copia de tu DNI; pregunta en la Junta si piden autorización." },
      { q: "¿Sirve el modelo para suplentes?", a: "Sí. Según la Instrucción 6/2011, los suplentes pueden presentar excusa con los mismos criterios que los titulares. Indica que eres suplente y de qué puesto." },
      { q: "¿Cuánto cuesta?", a: "Nada. Presentar la excusa es gratis y el modelo de RutaTrámite también." },
    ],
    sections: [
      {
        id: "descargar",
        title: "Descargar o copiar el modelo",
        paragraphs: [
          BYLINE_LEAD + "Elige el formato: el Word (.docx) se edita en Word, LibreOffice o Google Docs; el PDF se imprime y se rellena a mano; el texto de abajo se copia con un botón y se pega en cualquier editor.",
          "Rellena todo lo que va entre corchetes y borra los ejemplos que no uses. Firma a mano o con firma electrónica si lo presentas por un registro electrónico.",
        ],
        models: [{ id: "excusa-mesa-electoral", title: "Escrito de excusa para no formar parte de la mesa electoral", body: MODELO_TEXTO }],
      },
      {
        id: "parrafos-opcionales",
        title: "Párrafos opcionales según tu causa",
        paragraphs: [
          "Si tu caso no es tan simple como «tengo 67 años», sustituye el punto 2 por el párrafo que encaje y rellena los corchetes. Están también al final del Word y del PDF. Cada uno cita el apartado de la Instrucción 6/2011 en el que se apoya; los que dicen «solicito que se valore» corresponden a causas que la Junta decide caso a caso.",
        ],
        models: PARRAFOS_EXCUSA,
      },
      {
        id: "que-poner",
        title: "Qué poner en cada apartado",
        paragraphs: [],
        lists: [
          [
              "Junta Electoral de Zona: la que aparece en la notificación (suele llevar el nombre del partido judicial, no siempre el de tu municipio).",
              "Mesa: copia el código de distrito, sección y mesa (letra) tal como viene en la notificación.",
              "Cargo: presidente, vocal 1.º, vocal 2.º o suplente (indica de qué puesto).",
              "Causa: una frase clara. No hace falta citar artículos; basta con que se entienda y encaje en la Instrucción 6/2011.",
              "Documentos: enumera lo que adjuntas. Si es un dato de salud, aporta solo lo necesario para acreditar la causa.",
            ],
        ],
      },
      {
        id: "documento-por-causa",
        title: "Qué documento adjuntar según la causa",
        paragraphs: [],
        table: {
          caption: "Causas de la Instrucción 6/2011 y documento habitual",
          head: ["Causa", "Documento que la acredita", "Fuente"],
          rows: [
            { cells: ["Tener entre 65 y 69 años", "Copia del DNI"], source: S.jec611 },
            { cells: ["Discapacidad declarada (cualquier grado)", "Resolución o certificado de discapacidad; no hace falta informe médico"], source: S.jec611 },
            { cells: ["Incapacidad temporal (baja)", "Parte de baja"], source: S.jec611 },
            { cells: ["Embarazo de más de 6 meses o permiso por nacimiento, adopción o acogimiento", "Informe médico o resolución del permiso"], source: S.jec611 },
            { cells: ["Cuidado de lactante, de hijos menores de 12 años o de un familiar dependiente", "Certificado de reducción de jornada (artículo 37.6 del Estatuto de los Trabajadores) o de servicios sociales, y libro de familia si procede"], source: S.jec611 },
            { cells: ["Haber sido miembro de mesa 3 o más veces en 10 años", "Indicación de las elecciones en que lo fuiste y copia de las designaciones si las tienes"], source: S.jec611 },
            { cells: ["Enfermedad o lesión que impida el cargo (se valora)", "Informe médico que detalle las limitaciones"], source: S.jec611 },
            { cells: ["Servicio esencial ese día: sanidad, protección civil, bomberos (se valora)", "Informe del responsable del servicio"], source: S.jec611 },
            { cells: ["Acontecimiento familiar inaplazable (se valora)", "Prueba del acontecimiento y de por qué no puede aplazarse"], source: S.jec611 },
          ],
        },
      },
      {
        id: "plazo",
        title: "Plazo: 7 días naturales",
        paragraphs: [
          "Cuenta 7 días naturales desde el día siguiente a la notificación (artículos 27.3 y 119 de la LOREG; artículo 30 de la Ley 39/2015). Ejemplo: notificación el miércoles 4 de noviembre, último día el miércoles 11.",
          "La Junta resuelve en 5 días. Si te deniega la excusa debe motivarlo, y no cabe recurso electoral; mira qué opciones quedan en la guía de excusa denegada.",
        ],
      },
      COMO_REVISAMOS,
    ],
  },
  {
    id: "mesa-suplente",
    pack: "elecciones",
    reviewedAt: R,
    disclaimer: "",
    path: P.suplente,
    h1: "Me ha tocado suplente de mesa electoral: qué tengo que hacer",
    title: "Suplente de mesa electoral el 29-N: hora, dieta y si hay que ir",
    description: "Si eres suplente de mesa el 29-N tienes que ir a las 8:00. Cuándo te quedas, si cobras los 75 €, permisos, excusa y qué pasa si no vas (LOREG).",
    lead: "Sí, el suplente tiene que ir: la LOREG cita a presidente, vocales y suplentes a las 8:00 del día de la votación (artículo 80.1). Si todos los titulares están, te vas a casa; si falta alguno, ocupas su puesto. El suplente que no va y no se excusa comete el mismo delito que el titular (artículo 143).",
    cta: { href: S.a80.href, label: "Leer el artículo 80 de la LOREG en el BOE" },
    secondaryCta: { href: P.modelo, label: "Modelo de excusa (también para suplentes)" },
    sources: [S.a26, S.a27, S.a28, S.a80, S.a143, S.jec611, S.dieta],
    related: [L.hub, L.excusa, L.modelo, L.dieta, L.noVoy, L.primero],
    faqs: [
      { q: "¿El suplente de mesa tiene que ir a votar a las 8:00?", a: "Sí. El artículo 80.1 de la LOREG cita a las 8:00 al presidente, los vocales y los respectivos suplentes. Si están todos los titulares, el suplente puede irse tras la constitución de la mesa." },
      { q: "¿Cobra la dieta el suplente?", a: "Solo si actúa como titular. La Orden INT/650/2026 fija 75 € para quienes forman parte de la mesa; el suplente que se va al constituirse la mesa no la cobra." },
      { q: "¿Qué pasa si el suplente no va?", a: "El artículo 143 de la LOREG incluye expresamente a los suplentes: no acudir sin excusa ni aviso puede castigarse con prisión de 3 meses a 1 año o multa de 6 a 24 meses." },
      { q: "¿Puede un suplente presentar excusa?", a: "Sí. La Instrucción 6/2011 de la Junta Electoral Central dice que los suplentes pueden presentar excusa con los mismos criterios que los titulares, en el mismo plazo de 7 días." },
      { q: "¿Tiene permiso en el trabajo el suplente?", a: "El artículo 28 de la LOREG da el permiso a quienes son nombrados presidentes o vocales. Si como suplente acabas actuando en la mesa, eres miembro de ella; guarda el certificado que te dé la mesa para justificarlo en la empresa." },
      { q: "¿Cuántos suplentes hay por mesa?", a: "Dos por cada miembro: dos para el presidente y dos para cada vocal, es decir, seis por mesa (artículo 26.3)." },
    ],
    sections: [
      {
        id: "que-es",
        title: "Qué es un suplente y cuántos hay",
        paragraphs: [
          BYLINE_LEAD + "En el sorteo se eligen, para cada mesa, un presidente, dos vocales y dos suplentes de cada uno de ellos: seis suplentes por mesa (artículo 26.3 de la LOREG).",
          "Te lo notifican igual que a los titulares, en 3 días tras el sorteo, que este año es del 31 de octubre al 4 de noviembre.",
        ],
      },
      {
        id: "orden-sustitucion",
        title: "Cuándo entras en la mesa: orden de sustitución",
        lists: [
          [
              "Si falta el presidente, lo sustituye su primer suplente; si falta también, el segundo suplente.",
              "Si tampoco está ninguno, preside el vocal 1.º y, si no, el 2.º.",
              "Los vocales que faltan, o que pasan a presidir, los sustituyen sus suplentes.",
              "Si aun así no hay presidente y dos vocales, se avisa a la Junta Electoral de Zona, que designa libremente (artículo 80.3 y 80.4).",
            ],
        ],
        paragraphs: ["Antes de los 7 días de plazo, si la Junta acepta la excusa de un titular, avisa al primer suplente (artículo 27.3): puedes enterarte antes del día 29 de que pasas a titular."],
      },
      {
        id: "ejemplos",
        title: "Tres ejemplos",
        paragraphs: [],
        lists: [
          [
              "Ana es 1.ª suplente del vocal 2.º. A las 8:00 están el presidente y los dos vocales: una vez constituida la mesa, se puede ir. No cobra dieta ni tiene más obligaciones.",
              "Luis es 1.º suplente del presidente, que no aparece. Luis preside toda la jornada y el recuento, cobra los 75 € y tiene permiso y reducción de 5 horas el lunes si trabaja por cuenta ajena.",
              "Marta es 2.ª suplente y no va porque «seguro que no hace falta». Faltó el titular y el primer suplente: la mesa se retrasa y la Junta informa al fiscal. Su ausencia puede encajar en el artículo 143.",
            ],
        ],
      },
      {
        id: "dieta-permisos",
        title: "Dieta y permisos del suplente",
        paragraphs: [
          "La dieta es de 75 € por jornada (Orden INT/650/2026) y la cobran quienes forman parte de la mesa. El suplente que se marcha tras la constitución no la cobra.",
          "El permiso retribuido de jornada completa (si el domingo es laboral para ti) y la reducción de 5 horas del día siguiente son para presidentes y vocales (artículo 28). Si actúas como tal, pide en la mesa un certificado de haber formado parte.",
        ],
      },
      COMO_REVISAMOS,
    ],
  },
  {
    id: "mesa-primero-en-votar",
    pack: "elecciones",
    reviewedAt: R,
    disclaimer: "",
    path: P.primero,
    h1: "«No seas el primero en votar»: ¿te pueden meter en la mesa?",
    title: "¿Te ponen en la mesa si eres el primero en votar? Lo que dice la ley",
    description: "Comprobamos el consejo de no ser el primero en votar: qué dice el artículo 80.4 de la LOREG, quién decide, cuándo pasa y qué no es verdad.",
    lead: "Respuesta corta: en parte es cierto, pero no como se cuenta. Si a las 8:00 no se puede formar la mesa ni con titulares ni con suplentes, la Junta Electoral de Zona elige libremente a quien la forme, «pudiendo incluso ordenar» que entre algún elector que esté en el local (artículo 80.4 de la LOREG). No lo decide el presidente ni va por orden de llegada, y es excepcional.",
    cta: { href: S.a80.href, label: "Leer el artículo 80 de la LOREG en el BOE" },
    secondaryCta: { href: P.suplente, label: "Cómo funcionan los suplentes" },
    sources: [S.a80, S.a27, S.a143, S.tresCantos],
    related: [L.suplente, L.horario, L.noVoy, L.hub, L.casos],
    faqs: [
      { q: "¿Es verdad que si eres el primero en votar te ponen en la mesa?", a: "No automáticamente. Solo si la mesa no se puede constituir con titulares ni suplentes, la Junta Electoral de Zona designa libremente quién la forma y puede ordenar que entre algún elector presente en el local (artículo 80.4 de la LOREG). No hay orden de llegada." },
      { q: "¿Quién decide que un votante forme parte de la mesa?", a: "La Junta Electoral de Zona. El presidente ni los demás electores pueden imponerlo; los presentes solo levantan una declaración de lo ocurrido y la envían a la Junta (artículo 80.3)." },
      { q: "¿Ha pasado alguna vez?", a: "Sí, hay casos publicados. En las elecciones del 28 de mayo de 2023, una mesa de Tres Cantos (Madrid) se constituyó con otros electores porque no se presentaron titulares ni suplentes, según Europa Press. No hay estadística oficial de cuántas veces ocurre." },
      { q: "¿A qué hora es más probable?", a: "Entre las 8:00, cuando se constituye la mesa, y la apertura a las 9:00, o poco después. Si la mesa no se ha podido constituir una hora después del inicio de la votación (a las 10:00), se convoca nueva votación en esa mesa en dos días (artículo 80.5)." },
      { q: "¿Puedo negarme si me designa la Junta?", a: "La LOREG no regula una excusa específica para este caso. Si tienes una causa (por ejemplo, de salud o de cuidado), explícala en ese momento. El cargo de miembro de mesa es obligatorio (artículo 27.1)." },
    ],
    sections: [
      {
        id: "veredicto",
        title: "Veredicto: medio verdad",
        lists: [
          [
              "Verdad: la ley permite que la Junta ponga en la mesa a un elector que esté en el local (artículo 80.4).",
              "Falso: que vaya por orden de llegada, que lo decida el presidente o que pase en cualquier mesa.",
              "Matiz: solo ocurre si fallan los 3 titulares y sus suplentes hasta no poder reunir presidente y dos vocales, que es lo excepcional.",
            ],
        ],
        paragraphs: [BYLINE_LEAD + "Lo comprobamos con el texto consolidado de la LOREG en el BOE. No damos cifras de frecuencia porque no hay estadística oficial publicada."],
      },
      {
        id: "que-dice-la-ley",
        title: "Qué dice exactamente el artículo 80",
        paragraphs: [
          "80.1: presidente, vocales y suplentes se reúnen a las 8:00 en el local.",
          "80.2: si falta alguien, entra su suplente; si no hay suplentes de presidente, preside un vocal.",
          "80.3: sin presidente y dos vocales no hay mesa. Los presentes o la autoridad gubernativa hacen una declaración de lo sucedido y avisan a la Junta de Zona.",
          "80.4: «La Junta designa, en tal caso, libremente, a las personas que habrán de constituir la Mesa Electoral, pudiendo incluso ordenar que forme parte de ella alguno de los electores que se encuentre presente en el local». Y la Junta informa al Ministerio Fiscal sobre quienes no comparecieron.",
          "80.5: si una hora después del inicio de la votación (las 10:00) sigue sin haber mesa, se vota de nuevo en esa mesa dentro de los dos días siguientes.",
        ],
      },
      {
        id: "de-donde-sale",
        title: "De dónde sale el consejo",
        paragraphs: [
          "Los electores presentes a primera hora, antes de que haya mesa, son los únicos que la Junta tiene a mano. Por eso circula el consejo de no ir a las 9:00 en punto. Pero ir a votar más tarde no te protege de nada si te ha tocado mesa por sorteo, y el riesgo de que te designen en el local depende de que esa mesa concreta se quede sin gente.",
          "Votar es un derecho: puedes ir a la hora que quieras entre las 9:00 y las 20:00. No hay motivo legal para dejar de votar temprano.",
        ],
      },
      {
        id: "si-te-pasa",
        title: "Si te pasa: qué hacer",
        paragraphs: [],
        lists: [
          [
              "Pide que te confirmen que la designación viene de la Junta Electoral de Zona.",
              "Si tienes una causa (salud, cuidado de un menor o dependiente, trabajo esencial), dila en ese momento y aporta lo que tengas.",
              "Si te quedas, eres miembro de mesa: te corresponde la dieta de 75 € y, si trabajas por cuenta ajena, la reducción de 5 horas del lunes. Pide un certificado a la mesa.",
            ],
        ],
      },
      COMO_REVISAMOS,
    ],
  },
  {
    id: "mesa-excusa-denegada",
    pack: "elecciones",
    reviewedAt: R,
    disclaimer: "Información general, no asesoramiento jurídico. Para un recurso contencioso consulta con un abogado o el colegio de abogados de tu provincia.",
    path: P.denegada,
    h1: "Me han denegado la excusa de la mesa electoral: qué puedo hacer",
    title: "Excusa de mesa electoral denegada: recurso, aviso y opciones",
    description: "Si la Junta Electoral de Zona rechaza tu excusa de mesa: qué significa «sin ulterior recurso», el contencioso, el aviso de 72 horas y qué pasa si no vas.",
    lead: "Si la Junta Electoral de Zona deniega tu excusa, la LOREG dice que resuelve «sin ulterior recurso» (artículo 27.3): no hay recurso electoral. La Instrucción 6/2011 recuerda que cabe recurso contencioso-administrativo, pero no suspende la obligación de ir el 29 de noviembre. Lo útil es revisar si tienes una causa nueva o mejor documentada para el aviso del artículo 27.4.",
    cta: { href: S.jec611.href, label: "Leer la Instrucción 6/2011 de la Junta Electoral Central" },
    secondaryCta: { href: P.modelo, label: "Modelo de escrito de excusa" },
    sources: [S.a27, S.jec611, S.a143, S.ljca],
    related: [L.excusa, L.modelo, L.noVoy, L.suplente, L.hub],
    faqs: [
      { q: "¿Se puede recurrir la denegación de la excusa de mesa electoral?", a: "No hay recurso electoral: la Junta Electoral de Zona resuelve «sin ulterior recurso» (artículo 27.3 de la LOREG). Según la Instrucción 6/2011, sí cabe recurso contencioso-administrativo ante el Juzgado de lo Contencioso, que no evita tener que ir a la mesa." },
      { q: "¿Tienen que explicarme por qué me la deniegan?", a: "Sí. La LOREG obliga a la Junta a motivar sucintamente la denegación. Si no lo hace, puedes pedir que te indiquen el motivo." },
      { q: "¿Puedo volver a presentar otra excusa?", a: "La LOREG solo prevé una excusa en 7 días y, después, el aviso de un impedimento sobrevenido (artículo 27.4). Si surge una causa nueva, comunícala al menos 72 horas antes con justificantes, o de inmediato si surge después." },
      { q: "¿Qué pasa si no voy después de que me la denieguen?", a: "Puedes incurrir en el delito del artículo 143 de la LOREG: prisión de 3 meses a 1 año o multa de 6 a 24 meses, que decide un juez." },
    ],
    sections: [
      {
        id: "que-significa",
        title: "Qué significa «sin ulterior recurso»",
        paragraphs: [
          BYLINE_LEAD + "La Junta Electoral de Zona tiene 5 días para resolver tu excusa y su decisión no se puede llevar a la Junta Provincial ni a la Junta Electoral Central (artículo 27.3 de la LOREG).",
          "La Instrucción 6/2011 de la Junta Electoral Central añade que contra esa decisión cabe recurso contencioso-administrativo ante el Juzgado de lo Contencioso-administrativo, y que la denegación tiene que estar motivada.",
        ],
      },
      {
        id: "opciones",
        title: "Tus opciones, de más a menos útil",
        paragraphs: [],
        lists: [
          [
              "Lee el motivo de la denegación. A menudo es falta de documento: un informe médico que no detalla limitaciones o un certificado de empresa genérico.",
              "Si la causa cambia o aparece otra (baja, ingreso, parto…), avisa a la Junta por el artículo 27.4: al menos 72 horas antes del 29 de noviembre o, si surge después, de inmediato y antes de que se constituya la mesa.",
              "Si eres suplente, recuerda que solo actuarás si falta el titular: ve a las 8:00 de todos modos.",
              "Recurso contencioso-administrativo: el plazo general es de 2 meses (artículo 46 de la Ley 29/1998) y puede requerir abogado. No aplaza la obligación del día 29; consulta con un profesional antes.",
            ],
        ],
      },
      {
        id: "ejemplo",
        title: "Ejemplo",
        paragraphs: [
          "Pedro alegó «problemas de espalda» con un informe de una línea y se la denegaron por no acreditar limitaciones. El 20 de noviembre su médico emite un informe que detalla que no puede estar sentado más de una hora. Pedro lo presenta a la Junta como impedimento con más de 72 horas de antelación (artículo 27.4). La Junta lo valora de nuevo; si lo acepta, avisa al suplente.",
        ],
      },
      COMO_REVISAMOS,
    ],
  },
  {
    id: "mesa-casos-especiales",
    pack: "elecciones",
    reviewedAt: R,
    disclaimer: "",
    path: P.casos,
    h1: "Mesa electoral: autónomos, teletrabajo, estudiantes y otros casos",
    title: "Mesa electoral si eres autónomo, teletrabajas o tienes exámenes",
    description: "Casos reales de la mesa del 29-N: autónomos, teletrabajo, estudiantes con exámenes, discapacidad, extranjeros, comida, dónde votas tú y horario.",
    lead: "La LOREG y la Instrucción 6/2011 de la Junta Electoral Central no hablan de «autónomos» ni de «estudiantes», pero sus reglas responden a casi todos los casos. Resumen: la discapacidad declarada es causa aceptada siempre; ser autónomo, teletrabajar o tener un examen no lo es por sí solo; los extranjeros no forman mesa en las generales.",
    cta: { href: S.jec611.href, label: "Leer la Instrucción 6/2011 (causas de excusa)" },
    secondaryCta: { href: P.modelo, label: "Modelo de escrito de excusa" },
    sources: [S.jec611, S.a2, S.a26, S.a27, S.a28, S.a88, S.a89, S.a90, S.dieta, S.mesaInfo],
    related: [L.excusa, L.modelo, L.dieta, L.horario, L.suplente, L.primero, LC.fuera, LC.trabajo, LC.examen, LC.cuidado, LC.hijos],
    faqs: [
      { q: "¿Un autónomo puede librarse de la mesa electoral?", a: "Ser autónomo no es por sí solo una causa de la Instrucción 6/2011. Sí lo es, a valorar, ser un profesional insustituible de un acontecimiento público programado antes de la convocatoria cuya ausencia lo cancelaría con perjuicio económico relevante, o trabajar en un servicio esencial." },
      { q: "¿Tengo permiso si teletrabajo?", a: "Sí. El artículo 28 de la LOREG da el permiso a los trabajadores por cuenta ajena sin distinguir dónde trabajan: jornada completa el día de la votación si es laboral y reducción de 5 horas el día siguiente." },
      { q: "¿Un examen es motivo para no ir a la mesa?", a: "No figura en la Instrucción 6/2011. La votación es en domingo; si tienes un examen oficial inaplazable ese día o la mañana del lunes, puedes alegarlo documentado y la Junta lo valorará. No está garantizado." },
      { q: "¿Una persona con discapacidad tiene que ir a la mesa?", a: "Puede excusarse siempre: la Instrucción 6/2011 acepta como causa tener una discapacidad declarada de cualquier grado, y basta con la declaración, sin informe médico. Si quiere, puede formar parte de la mesa." },
      { q: "¿Le puede tocar mesa a un extranjero?", a: "En las generales no: solo votan los españoles (artículo 2 de la LOREG) y la mesa se sortea entre los electores de esa mesa (artículo 26). Los ciudadanos de la UE votan en municipales y europeas, y los de países con acuerdo de reciprocidad, solo en municipales." },
      { q: "¿Los miembros de mesa votan en su mesa?", a: "Sí. Se sortean entre los electores de esa mesa y votan al final, después de introducir los votos por correo, junto con los interventores (artículo 88.3)." },
      { q: "¿Se puede salir a comer?", a: "La LOREG no regula la comida, pero exige que la mesa tenga en todo momento al menos dos miembros presentes (artículo 89). Os podéis turnar; lleva comida y agua." },
    ],
    sections: [
      {
        id: "tabla-casos",
        title: "Caso por caso",
        paragraphs: [BYLINE_LEAD + "Para cada caso indicamos la regla y su fuente. «Se valora» significa que decide la Junta Electoral de Zona con tu documento."],
        table: {
          caption: "Situaciones frecuentes y qué dice la norma",
          head: ["Situación", "Qué dice la norma", "Fuente"],
          rows: [
            { cells: ["Autónomo", "No es causa por sí sola. Se valora el evento público insustituible programado antes de la convocatoria o el servicio esencial"], source: S.jec611 },
            { cells: ["Teletrabajo o trabajo por cuenta ajena", "Permiso retribuido el día de la votación si es laboral y 5 horas menos el lunes 30"], source: S.a28 },
            { cells: ["Estudiante con examen", "No figura como causa; si el examen es inaplazable, alégalo documentado y se valora"], source: S.jec611 },
            { cells: ["Discapacidad declarada (cualquier grado)", "Causa aceptada siempre; basta la declaración"], source: S.jec611 },
            { cells: ["65 a 69 años", "Causa aceptada siempre (desde los 65 se puede renunciar en 7 días)"], source: S.a26 },
            { cells: ["70 años o más", "No entra en el sorteo"], source: S.a26 },
            { cells: ["Extranjero residente", "No vota en generales, así que no forma mesa"], source: S.a2 },
            { cells: ["Español que vive en otra comunidad desde hace poco", "Se valora el traslado a otra comunidad autónoma si acreditas la dificultad"], source: S.jec611 },
            { cells: ["Cuidado de hijos menores de 12 o de un familiar dependiente", "Causa aceptada si lo acreditas con reducción de jornada o servicios sociales"], source: S.jec611 },
            { cells: ["Familia monoparental con hijos menores de 14", "Se valora"], source: S.jec611 },
          ],
        },
      },
      {
        id: "dia-29",
        title: "El día 29: horario, comida, voto y dieta",
        paragraphs: [],
        lists: [
          [
              "Horario: a las 8:00 en el colegio; se vota de 9:00 a 20:00 y luego se hace el recuento y las actas. Calcula salir bien entrada la noche.",
              "Comida: la ley no la regula; la mesa no puede quedarse con menos de dos miembros (artículo 89), así que se hacen turnos.",
              "Tu voto: los miembros de la mesa votan al final, en esa misma mesa (artículo 88.3).",
              "Dieta: 75 € para quienes forman la mesa (Orden INT/650/2026).",
              "Detención: ninguna autoridad puede detener a los miembros de mesa durante sus funciones, salvo flagrante delito (artículo 90).",
            ],
        ],
      },
      ...CASOS_EXTRA_SECTIONS,
      {
        id: "guias-por-caso",
        title: "Guías detalladas por situación",
        paragraphs: ["Para estos casos tenemos una guía propia con el texto exacto de la Instrucción, los documentos, un ejemplo con fechas y un párrafo listo para el escrito."],
        lists: [[LC.fuera, LC.examen, LC.trabajo, LC.cuidado, LC.hijos].map((l) => `${l.label}: rutatramite.com${l.href}`)],
      },
      COMO_REVISAMOS,
    ],
  },
];
