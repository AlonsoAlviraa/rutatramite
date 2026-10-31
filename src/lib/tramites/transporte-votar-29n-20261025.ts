import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Cómo llegar a votar el 29-N (25-10-2026). Verificado el 25-10-2026:
 * LOREG (BOE consolidado): art. 4.1 (se vota en tu sección), 23.2 y 23.6 (cada municipio tiene al menos una sección;
 * mesas por población diseminada según menor distancia), 24.4 (relación definitiva de locales 10 días antes, en internet),
 * 39.7 (tarjeta censal), 72 (voto por correo), 87.1 (persona de confianza), 146.1.a (delito de pedir el voto con dádivas).
 * RD 422/2011 art. 3.1-3.3 (locales accesibles; reclamación por art. 24.3). Los apartados 3.4-3.6 (RD 707/2026) entran en vigor el 2-1-2027: NO aplican al 29-N.
 * Doctrina JEC sobre transporte de electores: Acuerdos 437/1994 y 222/2004, leídos en una recopilación doctrinal
 * (no en la ficha JEC); por eso se citan con enlace al buscador oficial de doctrina.
 * Anuncio oficial 29-N verificado: Ayuntamiento de Alicante (traslado de personas mayores, enfermas o con discapacidad).
 * Precedentes 23-J 2023 en webs municipales: Crevillent, Sant Andreu de Llavaneres, San Juan de Alicante.
 * NO verificado y por tanto no publicado: transporte gratuito general, refuerzos de Renfe/metro/EMT para el 29-N, descuentos de taxi o VTC.
 */

const R = "2026-10-25";
const LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672";
const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const lo = (a: string, label: string) => ({ href: `${LOREG}#${a}`, label: `BOE: LOREG, ${label}` });

const S = {
  a4: lo("acuarto", "artículo 4: se vota en la sección y mesa que te corresponde"),
  a23: lo("aveintitres", "artículo 23: secciones y mesas (población diseminada)"),
  a24: lo("aveinticuatro", "artículo 24: relación de secciones, mesas y locales"),
  a39: lo("atreintaynueve", "artículo 39.7: la tarjeta censal"),
  a72: lo("asetentaydos", "artículo 72: voto por correo"),
  a87: lo("aochentaysiete", "artículo 87: votar con ayuda de una persona de confianza"),
  a146: lo("acientocuarentayseis", "artículo 146: delito de pedir el voto a cambio de dádivas"),
  rd422: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2011-5714#a3", label: "BOE: Real Decreto 422/2011, artículo 3 (locales electorales accesibles)" },
  local: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/visitas-virtuales/el-local-electoral/", label: "Ministerio del Interior (Infoelectoral): el local electoral" },
  jec: { href: "https://www.juntaelectoralcentral.es/cs/jec/doctrina/buscador", label: "Junta Electoral Central: buscador de doctrina (Acuerdos 437/1994 y 222/2004)" },
  cal: { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario electoral de las generales del 29-N" },
  ine: { href: "https://www.ine.es/oficina_censo/", label: "INE, Oficina del Censo Electoral: consulta tu colegio y mesa" },
  alicante: { href: "https://www.alicante.es/es/noticias/elecciones-29n-servicio-municipal-traslado-colegios-electorales", label: "Ayuntamiento de Alicante: servicio de traslado a los colegios el 29-N" },
  crevillent: { href: "https://crevillent.es/el-ayuntamiento-de-crevillent-y-cruz-roja-ofrecen-transporte-adaptado-para-personas-con-problemas-de-movilidad-para-poder-votar-el-23j/", label: "Ayuntamiento de Crevillent: transporte adaptado el 23-J de 2023 (precedente)" },
  llavaneres: { href: "https://ajllavaneres.cat/19690", label: "Ajuntament de Sant Andreu de Llavaneres: bus urbano especial el 23-J de 2023 (precedente)" },
  sanjuan: { href: "https://www.ayto-sanjuan.es/es/actualidad/eventos/Bando-municipal-servicio-traslado-personas-mayores-y-o-con-movilidad-reducida-durante-la-jornada-electoral/", label: "Ayuntamiento de San Juan de Alicante: traslado de mayores el 23-J de 2023 (precedente)" },
};

export const P_TRANSPORTE = "/elecciones/transporte-para-ir-a-votar-29n";
const L = {
  correo: { href: "/elecciones/voto-por-correo", label: "Voto por correo: pídelo hasta el 19 de noviembre" },
  correoInternet: { href: "/elecciones/pedir-voto-por-correo-por-internet", label: "Pedir el voto por correo por internet" },
  tarjeta: { href: "/elecciones/tarjeta-censal-cuando-llega", label: "Tarjeta censal: cuándo llega y qué pone" },
  donde: { href: "/elecciones/donde-voto-mesa-electoral", label: "Dónde voto: mesa y colegio electoral" },
  braille: { href: "/elecciones/voto-accesible-braille", label: "Voto accesible en braille" },
  enfermo: { href: "/elecciones/votar-hospitalizado-o-enfermo", label: "Votar si estás hospitalizado o enfermo" },
  domicilio: { href: "/elecciones/cambio-de-domicilio-y-censo", label: "Me he mudado: ¿dónde voto?" },
  mesa: { href: "/elecciones/miembro-de-mesa", label: "Me ha tocado mesa electoral: qué hago" },
  permiso: { href: "/elecciones/permiso-trabajo-para-votar", label: "Permiso en el trabajo para ir a votar" },
  canarias: { href: "/elecciones/hora-canarias-29n", label: "La hora de Canarias el 29-N" },
  cruces: { href: "/elecciones/cuantas-cruces-senado-provincia-isla", label: "Cuántas cruces en el Senado, por provincia e isla" },
  llevar: { href: "/elecciones/que-llevar-a-votar", label: "Qué documento llevar a votar" },
};
const BY = "Por Equipo RutaTrámite. Última revisión: 25 de octubre de 2026.";

export const TRANSPORTE_29N_GUIDES: Guide[] = [
  {
    id: "29n-transporte-votar",
    pack: "elecciones",
    reviewedAt: R,
    path: P_TRANSPORTE,
    h1: "Cómo llegar a votar el 29-N: autobuses, taxis y ayudas si vives en un pueblo o lejos del colegio",
    title: "Transporte para ir a votar el 29-N: autobús, taxi y pueblos",
    description: "No hay transporte gratuito general para votar el 29-N. Qué sí existe: traslados municipales para mayores, voto por correo hasta el 19-nov y ayuda en la mesa.",
    lead: "Respuesta corta: a 25 de octubre de 2026 no hay ningún transporte gratuito general anunciado para ir a votar el 29 de noviembre, ni la ley obliga a ponerlo. Lo que sí existe: algunos ayuntamientos organizan traslados para personas mayores, enfermas o con movilidad reducida (Alicante ya lo ha anunciado), puedes votar por correo sin moverte de casa si lo pides hasta el 19 de noviembre, y en la mesa puedes ir con una persona de confianza. Si vives en un pueblo, tu colegio está en tu propio municipio: la ley no permite que una sección mezcle dos municipios.",
    cta: L.correo,
    secondaryCta: S.ine,
    sources: [S.a4, S.a23, S.a24, S.a39, S.a72, S.a87, S.a146, S.rd422, S.local, S.jec, S.cal, S.ine, S.alicante, S.crevillent, S.llavaneres, S.sanjuan],
    related: [L.correo, L.correoInternet, L.tarjeta, L.donde, L.enfermo, L.braille, L.domicilio, L.permiso, L.llevar, L.mesa, L.canarias, L.cruces],
    faqs: [
      { q: "¿El autobús o el metro son gratis el día de las elecciones?", a: "No con carácter general. En España ninguna ley obliga a que el transporte público sea gratuito el día de votación, y a 25 de octubre de 2026 no consta ningún anuncio oficial de gratuidad general para el 29-N. Algunos ayuntamientos han reforzado o habilitado líneas en otras elecciones; si el tuyo lo hace, lo publicará en su web." },
      { q: "Vivo en un pueblo pequeño: ¿tendré que ir a votar a otro municipio?", a: "No. El artículo 23 de la LOREG dice que cada municipio tiene al menos una sección electoral y que ninguna sección comprende áreas de distintos municipios. Votas en tu propio municipio. Si vives en una pedanía o en población dispersa, el colegio puede estar en el núcleo principal." },
      { q: "¿Hay ayudas o descuentos en el taxi para ir a votar?", a: "No hemos encontrado ningún descuento oficial de taxi o VTC para el 29-N. Puedes ir en taxi, en tu coche o con un familiar con total normalidad. Algunos ayuntamientos ofrecen un traslado gratuito para mayores o personas con movilidad reducida: pregunta en el tuyo." },
      { q: "¿Puede un partido llevarme en coche o en autobús a votar?", a: "La Junta Electoral Central ha admitido que se pongan vehículos para llevar a los electores a las mesas siempre que sea en igualdad para todos y sin hacer campaña (criterio recogido, por ejemplo, en el Acuerdo 222/2004). Lo que es delito es pedir el voto a cambio de dádivas o promesas (artículo 146 de la LOREG). Nadie puede condicionar el viaje a que votes a alguien." },
      { q: "No puedo desplazarme: ¿cómo voto?", a: "Pide el voto por correo hasta el 19 de noviembre. Si por enfermedad o discapacidad no puedes ir a Correos, otra persona puede pedirlo por ti con un poder notarial y un certificado médico (artículo 72 de la LOREG). Si quieres votar en persona, puedes ir acompañado de alguien de confianza (artículo 87)." },
      { q: "¿Cómo sé a qué colegio me toca y si me queda lejos?", a: "Lo pone la tarjeta censal que envía la Oficina del Censo Electoral (artículo 39.7). También lo puedes consultar en la web del INE o en tu ayuntamiento. La lista definitiva de locales se publica en internet dentro de los 10 días anteriores a la votación (artículo 24.4)." },
      { q: "Mi colegio no es accesible, ¿qué hago?", a: "Los locales electorales deben ser accesibles (Real Decreto 422/2011, artículo 3). Si no lo es, puedes reclamar ante la Junta Electoral Provincial por el procedimiento del artículo 24.3 de la LOREG. El plazo es de seis días desde la publicación de la relación de locales en el boletín provincial, así que para el 29-N ya ha pasado. Ese día, pide ayuda a la mesa o vota por correo si lo pides a tiempo." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BY], [[
        "Transporte gratuito general el 29-N: no anunciado a 25-10-2026, y la ley no lo obliga.",
        "Traslados para mayores, enfermos o personas con movilidad reducida: los organizan algunos ayuntamientos. Alicante ya lo ha anunciado para el 29-N.",
        "Si no puedes ir: voto por correo, pídelo hasta el 19 de noviembre.",
        "En un pueblo votas en tu propio municipio; tu colegio y tu mesa vienen en la tarjeta censal.",
        "Taxis y VTC: sin descuentos oficiales conocidos.",
      ]]),
      {
        id: "que-existe",
        title: "Qué existe y qué no existe para ir a votar el 29-N",
        paragraphs: ["Esta tabla resume lo comprobado en fuentes oficiales a 25 de octubre de 2026. La actualizamos si algún organismo anuncia algo."],
        table: {
          caption: "Transporte y alternativas para votar el 29 de noviembre de 2026",
          head: ["Opción", "¿Existe?", "Detalle"],
          rows: [
            { cells: ["Transporte público gratuito en toda España", "No", "Ninguna ley lo obliga y no hay anuncio oficial para el 29-N."], source: S.cal },
            { cells: ["Refuerzo de Renfe, metro o autobuses urbanos", "Sin anuncio", "No consta ningún anuncio oficial a 25-10-2026. Lo revisamos cada día."], source: S.cal },
            { cells: ["Traslado municipal de mayores, enfermos o personas con discapacidad", "En algunos municipios", "Alicante lo ofrece el 29-N con Protección Civil y Cruz Roja. Pregunta en tu ayuntamiento."], source: S.alicante },
            { cells: ["Descuentos en taxi o VTC", "No conocidos", "No hemos encontrado ninguno oficial."], source: S.cal },
            { cells: ["Votar sin desplazarte", "Sí", "Voto por correo: solicitud hasta el 19 de noviembre."], source: S.a72 },
            { cells: ["Ayuda en el colegio", "Sí", "Puedes ir con una persona de confianza si no puedes votar solo."], source: S.a87 },
          ],
        },
      },
      sec("pueblos", "Si vives en un pueblo, una pedanía o una casa aislada", [
        "Votas siempre en tu municipio. Según el artículo 23 de la LOREG, «cada término municipal cuenta al menos con una Sección» y «ninguna sección comprende áreas pertenecientes a distintos términos municipales».",
        "Cuando la población está diseminada, la Oficina del Censo puede crear más mesas, a propuesta del ayuntamiento, repartiendo a los electores «atendiendo a la menor distancia entre el domicilio del elector y la correspondiente Mesa» (artículo 23.6). Aun así, si vives en un núcleo pequeño, tu mesa puede estar en el pueblo principal.",
        "Qué hacer si te queda lejos y no tienes cómo ir: pregunta en tu ayuntamiento si organiza algún transporte ese día; pide a un familiar o vecino que te lleve; o pide el voto por correo antes del 19 de noviembre y vota desde casa.",
      ]),
      sec("precedentes", "Qué han hecho los ayuntamientos en otras elecciones", [
        "No es obligatorio, pero varios ayuntamientos lo han hecho. Son ejemplos de las generales del 23 de julio de 2023, no anuncios para este año:",
      ], [[
        "Crevillent (Alicante): vehículo adaptado para personas con problemas de movilidad, y traslado con Cruz Roja.",
        "Sant Andreu de Llavaneres (Barcelona): refuerzo de la línea C22 de bus urbano ese domingo para facilitar el acceso a votar.",
        "San Juan de Alicante: traslado de personas mayores o con movilidad reducida por Protección Civil.",
      ]]),
      sec("partidos", "¿Puede llevarte un partido? Lo que dice la Junta Electoral", [
        "La Junta Electoral Central ha dicho que se pueden poner vehículos a disposición de los electores para ir a las mesas siempre que se haga en igualdad para todos y sin hacer campaña (Acuerdo 222/2004, que lo llama «criterio reiterado»). En 1994 aplicó la misma regla a un transporte organizado por una comunidad autónoma en zonas de población dispersa (Acuerdo 437/1994).",
        "Lo que está prohibido: pedir el voto a cambio de «recompensa, dádivas, remuneraciones o promesas», o presionar con violencia o intimidación. Es delito, castigado con prisión de seis meses a tres años o multa (artículo 146 de la LOREG). Nadie puede pedirte a quién vas a votar para llevarte.",
        "Si ves algo irregular, puedes dirigirte a la Junta Electoral de Zona de tu localidad.",
      ]),
      sec("no-puedo-ir", "Si no puedes desplazarte: voto por correo y ayuda en la mesa", [
        "Voto por correo: lo pides en Correos o por internet hasta el 19 de noviembre (artículo 72 de la LOREG y calendario de la Junta Electoral Central). Si por enfermedad o discapacidad no puedes ir a Correos, puede pedirlo otra persona con poder notarial y certificado médico oficial.",
        "Ayuda en la mesa: quien no sepa leer o, por discapacidad, no pueda elegir la papeleta, meterla en el sobre o entregarla, puede servirse de una persona de su confianza (artículo 87.1).",
        "Locales accesibles: los ayuntamientos deben proponer locales accesibles; si no hay ninguno, la Junta Electoral debe adoptar medidas para que lo sean durante la jornada (Real Decreto 422/2011, artículo 3).",
      ]),
      sec("colegio", "Cómo saber a qué colegio te toca", [
        "Tarjeta censal: la Oficina del Censo Electoral la envía a todos los electores con tu sección, mesa y local (artículo 39.7).",
        "Internet: consulta en la web de la Oficina del Censo Electoral del INE, o en la sede de tu ayuntamiento.",
        "Lista definitiva: dentro de los 10 días anteriores a la votación se publica en internet y se expone en los ayuntamientos (artículo 24.4).",
      ]),
      sec("taxis", "Taxis, VTC y coche propio", [
        "No existe ningún descuento oficial de taxi o VTC para votar del que tengamos constancia. Si un ayuntamiento lo anuncia, lo añadiremos con su fuente.",
        "Si necesitas un taxi adaptado, pídelo con antelación a tu servicio de taxi local. No publicamos teléfonos que no hayamos verificado en la web oficial de cada ayuntamiento.",
        "Puedes ir en tu coche o con un familiar sin ninguna restricción.",
      ]),
      sec("ejemplos", "Ejemplos", [
        "Carmen, 84 años, vive en Alicante y no conduce: puede pedir el traslado municipal llamando al Departamento de Estadística del ayuntamiento (965 92 35 07, según la web municipal), o pedir el voto por correo antes del 19 de noviembre.",
        "Antonio vive en una pedanía a 8 km del núcleo donde está su colegio y no hay autobús el domingo: puede preguntar en su ayuntamiento si habrá transporte, ir con un vecino o votar por correo.",
        "Lucía estudia en otra provincia y no puede volver: el transporte no se lo pagará nadie, pero puede votar por correo desde donde esté.",
      ]),
    ],
  },
];

const mergeBy = <T,>(a: T[] | undefined, b: T[] | undefined, k: (x: T) => string): T[] => {
  const out = [...(a ?? [])];
  const seen = new Set(out.map(k));
  for (const x of b ?? []) if (!seen.has(k(x))) { seen.add(k(x)); out.push(x); }
  return out;
};
const LINK = { href: P_TRANSPORTE, label: "Cómo llegar a votar: autobuses, taxis y pueblos" };
const ENTRANTES = new Set([
  "/elecciones/voto-por-correo",
  "/elecciones/tarjeta-censal-cuando-llega",
  "/elecciones/donde-voto-mesa-electoral",
  "/elecciones/voto-accesible-braille",
  "/elecciones/votar-hospitalizado-o-enfermo",
  "/elecciones/cambio-de-domicilio-y-censo",
  "/elecciones/miembro-de-mesa",
  "/elecciones/hora-canarias-29n",
  "/elecciones/cuantas-cruces-senado-provincia-isla",
  "/elecciones/permiso-trabajo-para-votar",
  "/elecciones/como-votar-el-dia-29",
]);
const HECHAS = new WeakSet<Guide>();
export function enlazarTransporte(g: Guide): Guide {
  if (HECHAS.has(g)) return g;
  HECHAS.add(g);
  if (ENTRANTES.has(g.path)) Object.assign(g, { related: mergeBy(g.related, [LINK], (r) => r.href) });
  return g;
}
