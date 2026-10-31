import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Cluster empadronamiento (27-10-2026). Verificado el 27-10-2026 en el BOE:
 * - Resolución de 17-2-2020 INE / DG Cooperación Autonómica y Local (BOE-A-2020-4784): apdo. 1 (obligación, documento público),
 *   2.1 (identidad: documentos en vigor; Libro de Familia o certificado de nacimiento hasta 14 años), 2.3 (título de la vivienda:
 *   escritura, contrato de arrendamiento vigente con último recibo; el ayuntamiento puede aceptar otros y comprobar),
 *   3.3 (infravivienda), plazo de 3 meses (art. 21.3 Ley 39/2015), silencio positivo (art. 24), fecha de alta (art. 39.3),
 *   denegación motivada (art. 35).
 * - Ley 7/1985 LBRL (BOE-A-1985-5392) arts. 15-16.
 * - LOREG (BOE-A-1985-11672) arts. 35 (actualización mensual del censo con el padrón) y 39 (censo cerrado el día 1 del segundo
 *   mes anterior a la convocatoria; para el 29-N, 1-8-2026, ya publicado en el sitio).
 * - Ayuntamiento de València (PDF oficial de preguntas frecuentes): la inscripción es gratuita.
 * Omitido: tasas de certificados por municipio, plazos de cita de ayuntamientos concretos (no verificados uno a uno).
 */

const R = "2026-10-27";
const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const BY = "Por Equipo RutaTrámite. Última revisión: 27 de octubre de 2026, con la Resolución de 17 de febrero de 2020 sobre gestión del Padrón y la Ley 7/1985 en el BOE.";

const S = {
  res: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2020-4784", label: "BOE: Resolución de 17 de febrero de 2020, instrucciones técnicas sobre la gestión del Padrón municipal" },
  lbrl15: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a15", label: "BOE: Ley 7/1985, artículo 15 (obligación de empadronarse)" },
  lbrl16: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a16", label: "BOE: Ley 7/1985, artículo 16 (padrón y datos)" },
  l39: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a24", label: "BOE: Ley 39/2015, artículo 24 (silencio administrativo)" },
  loreg35: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#atreintaycinco", label: "BOE: LOREG, artículo 35 (actualización mensual del censo)" },
  loreg39: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#atreintaynueve", label: "BOE: LOREG, artículo 39 (censo de cada elección)" },
  vlc: { href: "https://www.valencia.es/documents/20142/20609056/PREGUNTAS+FRECUENTES+PADRON.pdf/95395fb7-6f62-224a-9471-a1b6dda7ddbe", label: "Ayuntamiento de València: preguntas frecuentes del padrón (PDF)" },
  ine: { href: "https://sede.ine.gob.es/", label: "Sede electrónica del INE (consulta censal)" },
};

const P = {
  docs: "/empadronarse/documentos-necesarios",
  plazo: "/empadronarse/cuanto-tarda-plazo",
  voto: "/empadronarse/padron-y-voto-29n",
};
const L = {
  docs: { href: P.docs, label: "Documentos necesarios para empadronarse" },
  plazo: { href: P.plazo, label: "Cuánto tarda el empadronamiento: plazo de 3 meses y silencio positivo" },
  voto: { href: P.voto, label: "Padrón y voto el 29-N: si te empadronaste después del 1 de agosto" },
  pilar: { href: "/empadronarse", label: "Cómo empadronarse en España: guía completa" },
  con: { href: "/empadronarse/con-contrato", label: "Empadronarse con contrato de alquiler" },
  sin: { href: "/empadronarse/sin-contrato", label: "Empadronarse sin contrato" },
  fam: { href: "/empadronarse/casa-de-familiar", label: "Empadronarse en casa de un familiar" },
  men: { href: "/empadronarse/menores", label: "Empadronar a menores" },
  cobro: { href: "/empadronarse/me-quieren-cobrar", label: "¿Me pueden cobrar por empadronarme?" },
  vol: { href: "/empadronarse/volante-vs-certificado", label: "Volante o certificado de empadronamiento" },
  baja: { href: "/empadronarse/baja", label: "Darse de baja del padrón" },
  aut: { href: "/autorizacion-empadronamiento", label: "Modelo de autorización de empadronamiento" },
  censo: { href: "/elecciones/cambio-de-domicilio-y-censo", label: "Me he mudado: ¿dónde voto el 29-N?" },
  correo: { href: "/elecciones/voto-por-correo", label: "Voto por correo el 29-N" },
};
export const EMPADRONAMIENTO_1027_PATHS = Object.values(P);
const base = { pack: "mudanza" as const, reviewedAt: R };

export const EMPADRONAMIENTO_1027_GUIDES: Guide[] = [
  {
    ...base,
    id: "empadronarse-documentos-necesarios",
    path: P.docs,
    h1: "Documentos necesarios para empadronarse en España",
    title: "Qué se necesita para empadronarse: documentos y requisitos",
    description: "Necesitas un documento de identidad en vigor y otro que acredite que vives en la vivienda: escritura, contrato con último recibo o autorización.",
    lead: "Respuesta corta: para empadronarte necesitas dos cosas. Un documento de identidad en vigor (DNI, tarjeta de residencia o pasaporte, entre otros) y un documento que permita comprobar que vives en esa vivienda, como la escritura, el contrato de alquiler vigente con el último recibo o la autorización de quien ya está empadronado allí. El alta en sí es gratuita.",
    cta: { href: S.res.href, label: "Leer las instrucciones del Padrón en el BOE" },
    secondaryCta: { href: "/empadronarse", label: "Buscar la sede de tu ayuntamiento" },
    sources: [S.res, S.lbrl15, S.lbrl16, S.vlc],
    related: [L.pilar, L.con, L.sin, L.fam, L.men, L.aut, L.plazo, L.cobro],
    disclaimer: "Resumen de las instrucciones técnicas estatales. Cada ayuntamiento publica su formulario y su forma de presentación; consulta su sede antes de ir.",
    faqs: [
      { q: "¿Qué documento de identidad sirve?", a: "Españoles: DNI. Extranjeros: tarjeta de residencia en vigor o, en su defecto, el documento de identidad o pasaporte de su país. Tiene que estar en vigor; un documento caducado solo vale si aportas la solicitud de renovación (apartado 2.1 de la Resolución de 2020)." },
      { q: "¿Y para un niño?", a: "Hasta los 14 años la identidad puede acreditarse con el Libro de Familia o el certificado de nacimiento." },
      { q: "¿Qué papel de la vivienda piden?", a: "Escritura o título de propiedad, o el contrato de alquiler vigente acompañado del último recibo. El ayuntamiento puede aceptar otros documentos (por ejemplo, suministros) y comprobar por otros medios, como un informe de la Policía Local." },
      { q: "¿Y si vivo en casa de otra persona?", a: "Lo habitual es una autorización firmada por una persona mayor de edad empadronada en esa vivienda que tenga título para ocuparla, junto con su documento de identidad. Mira la guía de casa de familiar." },
      { q: "¿Cuánto cuesta?", a: "El alta es gratuita. El Ayuntamiento de València, por ejemplo, lo indica en sus preguntas frecuentes. Si alguien te cobra por «tramitar el padrón», consulta la guía sobre cobros." },
      { q: "¿Importa que la vivienda esté en mal estado o sea irregular?", a: "No. El padrón refleja dónde vives realmente; la inscripción es independiente de controversias sobre la titularidad y de las condiciones físicas o urbanísticas de la vivienda (apartado 3.3)." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY]),
      sec("lista", "Lista rápida", ["Lleva o adjunta en la sede:"], [["Formulario u hoja padronal del ayuntamiento, firmado", "Documento de identidad en vigor de cada persona que se empadrona", "Documento de la vivienda: escritura, contrato de alquiler vigente con último recibo, o autorización de la persona empadronada con título", "Si actúas por otra persona: acreditación de la representación", "Menores: Libro de Familia o certificado de nacimiento (hasta 14 años) y, si procede, autorización del otro progenitor"]]),
      sec("identidad", "Documentos de identidad válidos", ["La inscripción recoge nombre, apellidos, sexo, nacionalidad, lugar y fecha de nacimiento y número de documento. La Resolución de 2020 admite, además del DNI, la tarjeta de residencia y el pasaporte, otros documentos concretos como el resguardo de solicitud de protección internacional o el permiso de conducir español (completado con otro documento para los datos que no figuran)."]),
      sec("vivienda", "Cómo se acredita que vives allí", ["El título de la vivienda solo sirve como prueba de que habitas en ella. Por eso el ayuntamiento puede aceptar documentos distintos de la escritura o el contrato y comprobar la residencia por otros medios. No necesitas el permiso del casero para empadronarte si tienes un contrato vigente."]),
      sec("cuanto", "Cuánto cuesta", ["La inscripción en el padrón es gratuita. Los volantes y certificados dependen de cada ayuntamiento: consulta su ordenanza o su sede."]),
    ],
  },
  {
    ...base,
    id: "empadronarse-cuanto-tarda-plazo",
    path: P.plazo,
    h1: "¿Cuánto tarda el empadronamiento? Plazo de 3 meses y silencio positivo",
    title: "Cuánto tarda el empadronamiento: 3 meses y silencio positivo",
    description: "El ayuntamiento tiene 3 meses para resolver el alta en el padrón. Si no contesta, quedas empadronado por silencio positivo desde la fecha de la solicitud.",
    lead: "Respuesta corta: el ayuntamiento tiene un plazo máximo de tres meses para resolver tu solicitud de alta en el padrón y notificártelo. Si pasan los tres meses sin respuesta, opera el silencio positivo y quedas empadronado a todos los efectos desde la fecha en que lo pediste. Si te lo deniegan, la resolución tiene que estar motivada y puedes recurrirla.",
    cta: { href: S.res.href, label: "Leer las instrucciones del Padrón en el BOE" },
    secondaryCta: { href: S.l39.href, label: "Artículo 24 de la Ley 39/2015" },
    sources: [S.res, S.l39, S.lbrl15],
    related: [L.pilar, L.docs, L.vol, L.sin, L.voto],
    disclaimer: "Muchos ayuntamientos dan el alta en el momento si la documentación está completa. El plazo de tres meses es el máximo legal, no el habitual.",
    faqs: [
      { q: "¿Cuánto tiempo tiene el ayuntamiento?", a: "Tres meses, el plazo general del artículo 21.3 de la Ley 39/2015, según la Resolución de 17 de febrero de 2020." },
      { q: "¿Qué pasa si no me contestan?", a: "Opera el silencio positivo: quedas empadronado a todos los efectos desde la fecha de la solicitud (artículo 24 de la Ley 39/2015)." },
      { q: "¿Desde qué fecha cuenta el alta?", a: "La resolución puede fijar como fecha de alta la de la solicitud si ya vivías en el municipio ese día y no se lesionan derechos de terceros (artículo 39.3 de la Ley 39/2015)." },
      { q: "¿Pueden denegarlo?", a: "Sí, pero con resolución motivada del alcalde o de quien tenga la delegación, que puedes impugnar por las vías generales." },
      { q: "¿Qué hago mientras tanto?", a: "Guarda el justificante de presentación con su fecha: es lo que te permite acreditar cuándo lo solicitaste." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY]),
      sec("pasos", "Qué ocurre después de pedirlo", ["Apartados 11 a 14 de la Resolución de 2020."], [["El ayuntamiento comprueba los datos y puede pedirte que completes documentación", "Resuelve y te notifica en un máximo de 3 meses", "Sin respuesta en 3 meses: empadronado por silencio positivo desde la solicitud", "Denegación: siempre motivada y recurrible"]]),
      sec("justificante", "Guarda el justificante", ["Si presentas la solicitud en la sede electrónica, descarga el justificante. Si vas en persona, pide copia sellada. Te servirá para contar el plazo y, si hace falta, para acreditar el silencio positivo."]),
      sec("despues", "Después del alta", ["Cuando ya figures, pide el volante o el certificado que te exija el trámite siguiente. El padrón no cambia por sí solo tu domicilio en Hacienda ni en la Seguridad Social."]),
    ],
  },
  {
    ...base,
    id: "empadronarse-padron-y-voto-29n",
    path: P.voto,
    h1: "Padrón y voto el 29-N: dónde votas si te empadronaste hace poco",
    title: "Me empadroné hace poco: ¿dónde voto el 29-N?",
    description: "El censo del 29-N es el cerrado el 1 de agosto de 2026. Si te empadronaste en otra provincia después, votas en tu sección anterior o por correo.",
    lead: "Respuesta corta: los ayuntamientos envían cada mes los cambios del padrón a la Oficina del Censo Electoral, pero para cada elección vale el censo cerrado el día 1 del segundo mes anterior a la convocatoria. Para el 29 de noviembre de 2026 es el 1 de agosto de 2026. Si te empadronaste en otra provincia después de esa fecha, votas en tu sección anterior o puedes pedir el voto por correo.",
    cta: { href: S.ine.href, label: "Consultar tu sección en la sede del INE" },
    secondaryCta: { href: S.loreg39.href, label: "Artículo 39 de la LOREG" },
    sources: [S.loreg35, S.loreg39, S.ine],
    related: [L.censo, L.correo, L.pilar, L.plazo],
    disclaimer: "Información general y neutral sobre el censo electoral. Comprueba tu caso concreto en la sede del INE.",
    faqs: [
      { q: "¿Cómo pasa mi empadronamiento al censo?", a: "Los ayuntamientos envían a la Oficina del Censo Electoral, hasta el penúltimo día hábil de cada mes, las modificaciones del padrón de ese mes (artículo 35 de la LOREG)." },
      { q: "¿Qué censo vale para el 29-N?", a: "El cerrado el día 1 del segundo mes anterior a la convocatoria (artículo 39.1 de la LOREG): para estas elecciones, el 1 de agosto de 2026." },
      { q: "Me empadroné en septiembre en otra provincia. ¿Dónde voto?", a: "En tu sección anterior. Si te queda lejos, pide el voto por correo hasta el 19 de noviembre e indica tu dirección actual para recibir la documentación." },
      { q: "¿Puedo reclamar ahora?", a: "El plazo de reclamaciones al censo de esta elección fue del 12 al 19 de octubre de 2026 y ya ha terminado." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", ["Por Equipo RutaTrámite. Última revisión: 27 de octubre de 2026, con los artículos 35 y 39 de la LOREG en el BOE."]),
      sec("casos", "Tres casos", ["Fecha de corte para el 29-N: 1 de agosto de 2026."], [["Te empadronaste antes del 1 de agosto: votas en tu nuevo domicilio", "Te empadronaste después en otra provincia: votas en tu sección anterior o por correo", "Cambio dentro del mismo municipio después del corte: comprueba tu sección en la sede del INE"]]),
      sec("correo", "Si votas lejos de tu sección", ["El voto por correo se pide hasta el 19 de noviembre de 2026. Puedes indicar tu dirección actual para recibir la documentación."]),
    ],
  },
];

const IN: Record<string, { href: string; label: string }[]> = {
  "/elecciones/cambio-de-domicilio-y-censo": [L.voto, L.docs],
  "/mudanza": [L.docs, L.plazo],
  "/autorizacion-empadronamiento": [L.docs],
  "/declaracion-responsable-padron": [L.docs],
};

export function enlazarEmpadronamiento1027(g: Guide): Guide {
  const add = IN[g.path];
  if (!add) return g;
  const have = new Set(g.related.map((r) => r.href));
  g.related = [...g.related, ...add.filter((r) => !have.has(r.href))];
  return g;
}
