import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Lote 27-10-2026 (noche): formularios de empadronamiento por ciudad. Verificado el 27-10-2026 en webs municipales:
 * Barcelona (seu electrònica T135i), Sevilla (sevilla.org, hoja padronal v6), Zaragoza (sede, trámite 3317 e impresos M001-M005),
 * Málaga (sede trámite 112, hoja de empadronamiento y «Documentación necesaria» de GESTRISAM).
 * Valencia y otras ciudades: no incluidas (sin hoja descargable verificada o fuera del máximo de 4).
 */

const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const by = (fuente: string) => sec("byline", "Autoría y revisión", [`Por Equipo RutaTrámite. Última revisión: 27 de octubre de 2026, con ${fuente}.`]);

const BCN = { href: "https://seuelectronica.ajuntament.barcelona.cat/APPS/portaltramits/es/ciudadano/descripcio/T135i/PTCIU.html", label: "Ajuntament de Barcelona: alta en el Padrón municipal de habitantes (sede electrónica)" };
const BCN_IW = { href: "https://www.barcelona.cat/internationalwelcome/ca/tramit/alta-al-padro-dhabitants-de-barcelona", label: "Ajuntament de Barcelona: alta al Padró (vías presencial, telemática y 010)" };
const SEV = { href: "https://www.sevilla.org/servicios/empadronamiento/informacion-cambio-en-el-padron-de-habitantes-de-sevilla", label: "Ayuntamiento de Sevilla: documentación necesaria para empadronarse" };
const SEV_HOJA = { href: "https://www.sevilla.org/servicios/empadronamiento/hoja-padronal-v6-formulario-web-1.pdf", label: "Ayuntamiento de Sevilla: hoja padronal (PDF)" };
const SEV_TEL = { href: "https://www.sevilla.org/servicios/empadronamiento/informacion-empadronamiento/medios-de-empadronamiento", label: "Ayuntamiento de Sevilla: requisitos del empadronamiento telemático" };
const ZGZ = { href: "https://www.zaragoza.es/sede/servicio/tramite/3317", label: "Ayuntamiento de Zaragoza: Padrón, altas (sede)" };
const ZGZ_M005 = { href: "https://www.zaragoza.es/contenidos/tramites/impresos/Padron-M005.pdf", label: "Ayuntamiento de Zaragoza: impreso M005, autorización para inscribirse en el domicilio de otra persona (PDF)" };
const ZGZ_M004 = { href: "https://www.zaragoza.es/contenidos/tramites/impresos/Padron-M004.pdf", label: "Ayuntamiento de Zaragoza: impreso M004, autorización para hacer gestiones en nombre de otra persona (PDF)" };
const MLG = { href: "https://sede.malaga.eu/es/tramitacion/detalle-del-tramite/index.html?id=112", label: "Sede del Ayuntamiento de Málaga: empadronamiento y cambios de domicilio" };
const MLG_HOJA = { href: "https://www.malaga.eu/visorcontenido/SGTDocumentDisplayer/47495/DocumentoTramite47495", label: "Ayuntamiento de Málaga: hoja de empadronamiento (PDF autorrellenable)" };
const MLG_DOC = { href: "https://gestrisam.malaga.eu/export/sites/gestrisam/.galleries/Documentos-General/Documentacion-necesaria-17062026_1.pdf", label: "Ayuntamiento de Málaga (GESTRISAM): documentación necesaria (PDF)" };

const P = (c: string) => `/empadronarse/formulario-empadronamiento-${c}`;
export const FORM_CIUDADES_1027_PATHS = ["barcelona", "sevilla", "zaragoza", "malaga"].map(P);
const P_MAD = "/empadronarse/formulario-empadronamiento-madrid";

const relComunes = (self: string) => [
  ...[["madrid", "Madrid"], ["barcelona", "Barcelona"], ["sevilla", "Sevilla"], ["zaragoza", "Zaragoza"], ["malaga", "Málaga"]]
    .filter(([c]) => P(c) !== self)
    .map(([c, n]) => ({ href: P(c), label: `Formulario de empadronamiento en ${n}` })),
  { href: "/empadronarse/documentos-necesarios", label: "Documentos necesarios para empadronarse" },
  { href: "/empadronarse/cuanto-tarda-plazo", label: "Cuánto tarda: plazo de 3 meses" },
  { href: "/empadronarse", label: "Cómo empadronarse en España" },
];
const disc = (n: string) => `Resumen de la información oficial del Ayuntamiento de ${n} consultada el 27-10-2026. Si cambia, manda la web municipal.`;

export const FORM_CIUDADES_1027_GUIDES: Guide[] = [
  {
    id: "formulario-empadronamiento-barcelona", pack: "mudanza", reviewedAt: "2026-10-27", path: P("barcelona"),
    h1: "Formulario de empadronamiento en Barcelona: alta en el padrón",
    title: "Formulario de empadronamiento Barcelona: alta y documentos",
    description: "En Barcelona el alta se pide con el formulario en línea, por el 010 o con cita en una OAC. Documentos, contrato, plazo y coste según el Ayuntamiento.",
    lead: "Respuesta corta: en Barcelona no hay que descargar una hoja. El formulario del alta está en la Oficina Virtual de Tràmits (con idCAT Mòbil, Cl@ve, DNIe o certificado). Si llamas al 010, te envían por correo postal la hoja de solicitud. En persona, con cita previa en una Oficina de Atención Ciudadana. El trámite es gratuito.",
    cta: { href: BCN.href, label: "Ficha oficial del alta en el padrón de Barcelona" },
    secondaryCta: { href: BCN_IW.href, label: "Las tres vías: en línea, 010 y presencial" },
    sources: [BCN, BCN_IW],
    related: relComunes(P("barcelona")),
    disclaimer: disc("Barcelona"),
    faqs: [
      { q: "¿Dónde está el formulario de empadronamiento de Barcelona?", a: "En la Oficina Virtual de Tràmits del Ayuntamiento (opción «Alta en el padrón»), con identificación y firma electrónica. Si llamas al 010, te envían la hoja de solicitud por correo postal." },
      { q: "¿Cuánto tarda el alta en Barcelona?", a: "En línea, si los documentos son correctos, el Ayuntamiento confirma el alta por correo electrónico en unos 7 días naturales. En persona, el alta se hace en la misma cita. El plazo máximo de respuesta es de 3 meses." },
      { q: "¿Qué contrato de alquiler aceptan en Barcelona?", a: "Un contrato vigente a tu nombre, con duración o prórroga explícita de más de 3 meses, con tu nombre y el de la persona propietaria o administradora." },
      { q: "¿Cuánto cuesta empadronarse en Barcelona?", a: "Nada: el Ayuntamiento indica que el trámite es gratuito." },
      { q: "Si me llaman al 010, ¿cuánto tiempo tengo para devolver la hoja?", a: "Un mes desde que recibes las instrucciones: envías por correo postal la hoja firmada y la documentación." },
    ],
    sections: [
      by("la ficha del alta en el padrón de la sede electrónica del Ayuntamiento de Barcelona"),
      sec("vias", "Tres vías", [], [["En línea: Oficina Virtual de Tràmits, con idCAT Mòbil, Cl@ve, DNIe o certificado FNMT y firma electrónica. Solo personas de 18 años o más.", "Por teléfono (010): te llega por correo postal la hoja de solicitud; la devuelves firmada con los documentos en un mes.", "En persona: con cita previa en una Oficina de Atención Ciudadana; el alta se hace en el momento y te dan el volante."]]),
      sec("papeles", "Documentos", ["Documento de identidad en vigor de todas las personas que se empadronan y prueba del domicilio. Si eres titular del IBI o el Ayuntamiento puede comprobar la propiedad, no aportas documentos de la vivienda. Con alquiler: contrato vigente de más de 3 meses; si está prorrogado, es indefinido, escaneado o firmado electrónicamente, también el último pago del alquiler o una factura de luz, agua o gas de los últimos 3 meses.", "Si vives en casa de otra persona: autorización para inscribirte y su documento de identidad. La autorización o delegación vale 3 meses. Documentos en catalán o castellano, o traducidos."]),
      sec("plazo", "Plazo y coste", ["Gratuito. En línea, confirmación por correo en unos 7 días naturales si todo es correcto; plazo máximo de respuesta, 3 meses."]),
    ],
  },
  {
    id: "formulario-empadronamiento-sevilla", pack: "mudanza", reviewedAt: "2026-10-27", path: P("sevilla"),
    h1: "Formulario de empadronamiento en Sevilla: hoja padronal",
    title: "Formulario de empadronamiento Sevilla: hoja padronal y papeles",
    description: "En Sevilla el formulario es la hoja padronal: sin tachaduras, con referencia catastral y firmada por los mayores de 16. Documentos y factura de agua.",
    lead: "Respuesta corta: en Sevilla el formulario es la hoja padronal, que se descarga en la web del Ayuntamiento. Indica teléfono, correo, referencia catastral y, si vienes de otro municipio, el de procedencia. La firman todas las personas mayores de 16 años incluidas y no se admite con tachaduras ni típex.",
    cta: { href: SEV_HOJA.href, label: "Descargar la hoja padronal de Sevilla (PDF oficial)" },
    secondaryCta: { href: SEV.href, label: "Documentación necesaria (Ayuntamiento de Sevilla)" },
    sources: [SEV, SEV_HOJA, SEV_TEL],
    related: relComunes(P("sevilla")),
    disclaimer: disc("Sevilla"),
    faqs: [
      { q: "¿Dónde descargo la hoja padronal de Sevilla?", a: "En la página de documentación del padrón de sevilla.org (enlace «Descargar hoja padronal»). Es un PDF que se puede rellenar." },
      { q: "¿Quién firma la hoja padronal en Sevilla?", a: "Todas las personas mayores de 16 años incluidas; por los menores firma la madre, el padre o el tutor. Si te empadronas con autorización, firma también quien autoriza." },
      { q: "¿Sirve una factura de luz para empadronarse en Sevilla?", a: "No. El Ayuntamiento solo acepta facturas o contrato de suministro de agua (EMASESA). Las de luz o gas no son válidas." },
      { q: "¿Tengo que llevar la escritura si soy propietario?", a: "No es necesario: basta con indicar la referencia catastral en la hoja padronal." },
      { q: "¿Puedo empadronarme por internet en Sevilla?", a: "Sí, si todos los solicitantes y autorizantes mayores de edad tienen firma digital; se envía la hoja padronal firmada electrónicamente con los documentos." },
    ],
    sections: [
      by("la página de documentación del padrón y la hoja padronal del Ayuntamiento de Sevilla"),
      sec("hoja", "Cómo rellenar la hoja", [], [["Teléfono y correo electrónico (el Ayuntamiento los usa si hay incidencias)", "Referencia catastral de la vivienda", "Municipio de procedencia, si vienes de otro", "Firmas de todos los mayores de 16 años; sin tachaduras, borrones ni típex"]]),
      sec("papeles", "Documentos", ["Identidad de todas las personas incluidas (DNI; menores de 14 sin documento, libro de familia o certificado de nacimiento; extranjeros UE, certificado de registro y pasaporte o documento de identidad; resto, TIE o pasaporte).", "Vivienda, uno de estos: título de propiedad (basta la referencia catastral), contrato de alquiler con el último recibo, o contrato o última factura de agua de EMASESA. Si te autoriza otra persona, firma la casilla de autorización de la hoja o, si no vive allí, presenta el documento de autorización con su identidad y su título sobre la vivienda."]),
      sec("plazo", "Plazo", ["La hoja padronal indica que el plazo máximo para resolver es de tres meses desde la solicitud (artículo 21.3 de la Ley 39/2015)."]),
    ],
  },
  {
    id: "formulario-empadronamiento-zaragoza", pack: "mudanza", reviewedAt: "2026-10-27", path: P("zaragoza"),
    h1: "Formulario de empadronamiento en Zaragoza: alta e impresos",
    title: "Formulario de empadronamiento Zaragoza: impresos y documentos",
    description: "En Zaragoza el alta en el padrón es presencial y sin cita en la Plaza del Pilar. Impresos M004 y M005, documentos, horarios y plazo.",
    lead: "Respuesta corta: en Zaragoza el alta en el padrón se hace en persona: en la Oficina de Relaciones con la Ciudadanía (Plaza del Pilar, 18) sin cita previa, o en las Juntas Municipales y Vecinales. Si vives en casa de otra persona, usa el impreso M005; si te representa alguien, el M004.",
    cta: { href: ZGZ.href, label: "Ficha oficial del alta en el padrón de Zaragoza" },
    secondaryCta: { href: ZGZ_M005.href, label: "Impreso M005: autorización del titular (PDF)" },
    sources: [ZGZ, ZGZ_M005, ZGZ_M004],
    related: relComunes(P("zaragoza")),
    disclaimer: disc("Zaragoza"),
    faqs: [
      { q: "¿Puedo darme de alta en el padrón de Zaragoza por internet?", a: "No. Según el Ayuntamiento, el alta es obligatoriamente presencial. Otros trámites del padrón, como el cambio de domicilio, sí se pueden hacer en línea con certificado o Cl@ve." },
      { q: "¿Hace falta cita previa?", a: "No en la Oficina de Relaciones con la Ciudadanía de la Plaza del Pilar, 18. En las Juntas Municipales y Vecinales se atiende sin cita de 9:30 a 13:30 y con cita de 8:30 a 9:30." },
      { q: "Vivo en casa de un amigo sin contrato, ¿qué formulario uso?", a: "El impreso M005, «Autorización para la Inscripción Padronal en el domicilio de otra persona», firmado por los dos, con vuestros DNI y un documento que acredite que tu amigo es propietario o inquilino." },
      { q: "¿Qué horario tiene la oficina de la Plaza del Pilar?", a: "De lunes a viernes de 8:30 a 14:00, y por la tarde (16:00 a 19:00) los lunes, los jueves y el primer y último viernes de cada mes. En julio y agosto, solo por la mañana." },
      { q: "¿Llevo originales o copias?", a: "Original y copia de todos los documentos." },
    ],
    sections: [
      by("la ficha «Padrón: Altas» de la sede del Ayuntamiento de Zaragoza y sus impresos"),
      sec("donde", "Dónde y cuándo", ["Oficina de Relaciones con la Ciudadanía (Plaza del Pilar, 18): lunes a viernes de 8:30 a 14:00 y tardes de 16:00 a 19:00 los lunes, jueves y primer y último viernes de mes; julio y agosto, solo mañanas. Sin cita previa.", "Juntas Municipales y Vecinales: sin cita de 9:30 a 13:30; con cita (en línea o por teléfono) de 8:30 a 9:30."]),
      sec("papeles", "Documentos e impresos", ["Documentos de identidad de quienes se empadronan, documento que pruebe que la vivienda es tu residencia habitual y, con menores, los que acrediten la filiación. Original y copia.", "Impresos del Ayuntamiento: M005 (autorización del titular para inscribirte en su domicilio), M004 (autorización para hacer gestiones en nombre de otra persona) y M001 a M003 para menores con un solo progenitor o declaración conjunta."]),
      sec("plazo", "Plazo", ["El Ayuntamiento puede comprobar los datos y pedir más documentos durante tres meses desde la solicitud."]),
    ],
  },
  {
    id: "formulario-empadronamiento-malaga", pack: "mudanza", reviewedAt: "2026-10-27", path: P("malaga"),
    h1: "Formulario de empadronamiento en Málaga: hoja de empadronamiento",
    title: "Formulario de empadronamiento Málaga: hoja y documentos",
    description: "En Málaga el formulario es la hoja de empadronamiento autorrellenable. Se entrega en una OMAC o en Gestión Tributaria con identidad y prueba de vivienda.",
    lead: "Respuesta corta: en Málaga el formulario es la hoja de empadronamiento (PDF autorrellenable) de la sede del Ayuntamiento. Se entrega con los documentos en cualquier OMAC o en las oficinas de Gestión Tributaria, y se puede presentar en cualquier momento.",
    cta: { href: MLG_HOJA.href, label: "Descargar la hoja de empadronamiento de Málaga (PDF oficial)" },
    secondaryCta: { href: MLG.href, label: "Ficha del trámite en la sede de Málaga" },
    sources: [MLG, MLG_HOJA, MLG_DOC],
    related: relComunes(P("malaga")),
    disclaimer: disc("Málaga"),
    faqs: [
      { q: "¿Dónde descargo el formulario de empadronamiento de Málaga?", a: "En la sede electrónica, trámite «Padrón de habitantes. Empadronamiento y cambios de domicilio», apartado de impresos: «Hoja de empadronamiento (impreso autorrellenable)»." },
      { q: "¿Dónde se entrega la hoja?", a: "En cualquier OMAC (Oficinas Municipales de Atención a la Ciudadanía) o en las oficinas de Gestión Tributaria, con la documentación." },
      { q: "¿Qué documentos de vivienda aceptan en Málaga?", a: "Título de propiedad (escritura, nota del Registro o recibo del IBI), contrato de suministro de luz, agua o gas (con factura reciente si no es actual) o contrato de alquiler vigente con el último recibo, una factura de suministro y copia del documento de identidad del arrendador." },
      { q: "¿Cuánto tarda?", a: "La hoja indica un plazo máximo de tres meses para resolver desde la solicitud." },
      { q: "¿Qué pasa con el censo electoral?", a: "La sede indica que presentar la hoja implica tu conformidad para actualizar el censo electoral con esos datos." },
    ],
    sections: [
      by("la ficha de empadronamiento de la sede de Málaga, su hoja de empadronamiento y el documento «Documentación necesaria»"),
      sec("papeles", "Documentos", ["Hoja de empadronamiento cumplimentada y firmada, con documentos en vigor que acrediten la identidad de quienes se inscriben (DNI o pasaporte; menores de 14 sin documento, libro de familia o certificado de nacimiento; extranjeros UE, pasaporte o documento de identidad con el certificado de registro si lo tienen; resto, TIE o pasaporte).", "Prueba del domicilio: título de propiedad, contrato de suministro o contrato de alquiler vigente con último recibo, factura de suministro y copia del documento del arrendador. Si te autoriza una persona empadronada, su título sobre la vivienda y copia de su documento de identidad."]),
      sec("menores", "Menores", ["Con un solo progenitor hay que acreditar el consentimiento de ambos o una resolución judicial; la sede ofrece declaraciones responsables para los casos sin consentimiento de ambos."]),
    ],
  },
];

const IN: Record<string, { href: string; label: string }[]> = {
  [P_MAD]: FORM_CIUDADES_1027_PATHS.map((p) => ({ href: p, label: `Formulario de empadronamiento en ${({ barcelona: "Barcelona", sevilla: "Sevilla", zaragoza: "Zaragoza", malaga: "Málaga" } as Record<string, string>)[p.split("-").pop()!]}` })),
  "/empadronarse/documentos-necesarios": [
    { href: P("barcelona"), label: "Formulario y documentos en Barcelona" },
    { href: P("sevilla"), label: "Hoja padronal de Sevilla" },
    { href: P("zaragoza"), label: "Impresos del padrón de Zaragoza" },
    { href: P("malaga"), label: "Hoja de empadronamiento de Málaga" },
  ],
};

export function enlazarFormCiudades1027(g: Guide): Guide {
  const add = IN[g.path];
  if (add) {
    const have = new Set(g.related.map((r) => r.href));
    g.related = [...g.related, ...add.filter((r) => !have.has(r.href))];
  }
  return g;
}
