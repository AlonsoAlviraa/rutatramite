import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Lote 2 (27-10-2026): formularios de empadronamiento en Valencia, Alicante, Murcia y Palma.
 * Verificado el 27-10-2026 con curl en webs municipales: sede.valencia.es (PA.GP.11, información a 14/11/2025),
 * alicante.es (ficha de altas y cambios, hoja y PDF de documentación), sede.murcia.es (ficha 3662 y solicitud),
 * seuelectronica.palma.cat (Población.02, hoja informativa V_18_0 febrero 2026, hoja de inscripción).
 * Omitidas: Bilbao (la ficha oficial no devolvió contenido a WebFetch/curl hoy) y Valladolid (sin hoja ni lista oficial de documentos verificable hoy).
 */

const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const by = (fuente: string) => sec("byline", "Autoría y revisión", [`Por Equipo RutaTrámite. Última revisión: 27 de octubre de 2026, con ${fuente}.`]);

const VLC = { href: "https://sede.valencia.es/sede/registro/procedimiento/PA.GP.11?lang=1", label: "Ayuntamiento de València: altas y cambios de domicilio en el Padrón (PA.GP.11, sede)" };
const ALC = { href: "https://www.alicante.es/es/tramites/altas-y-cambios-domicilio-padron-municipal-habitantes", label: "Ayuntamiento de Alicante: altas y cambios de domicilio en el Padrón" };
const ALC_HOJA = { href: "https://www.alicante.es/sites/default/files/documentos/202005/hoja-alta-y-cambios-empadronamiento_1.pdf", label: "Ayuntamiento de Alicante: hoja de inscripción o modificación (PDF)" };
const ALC_PROP = { href: "https://www.alicante.es/sites/default/files/documentos/202504/empadronamiento-vivienda-propiedad_1.pdf", label: "Ayuntamiento de Alicante: documentación en vivienda en propiedad (PDF)" };
const ALC_AUT = { href: "https://www.alicante.es/sites/default/files/documentos/202504/empadronamiento-autorizacion_1.pdf", label: "Ayuntamiento de Alicante: documentación con autorización del propietario (PDF)" };
const MUR = { href: "https://sede.murcia.es/ficha-procedimiento/3662", label: "Sede del Ayuntamiento de Murcia: alta y cambio de domicilio en el Padrón (código 3662)" };
const MUR_SOL = { href: "https://sede.murcia.es/sites/default/files/doctramites/doc4901DC.pdf", label: "Ayuntamiento de Murcia: solicitud de alta / cambio de domicilio con hoja de inscripción (PDF)" };
const PMI = { href: "https://seuelectronica.palma.cat/es/-/poblaci%C3%B3n.02-alta-en-el-padr%C3%B3n-municipal-de-habitantes-para-personas-procedentes-de-otros-municipios-o-del-extranjero", label: "Sede de Palma: Población.02, alta en el Padrón Municipal" };
const PMI_INFO = { href: "https://seuelectronica.palma.cat/documents/39058/14038318/Hoja+informativa+sobre+el+empadronamiento+en+Palma.pdf/fab8369c-32b1-1ccc-ecd2-3eaf90cf94cd?t=1740485495586", label: "Ajuntament de Palma: hoja informativa sobre el empadronamiento (PDF)" };
const PMI_HOJA = { href: "https://palma.sedipualba.es/carpetaciudadana/documentoplantillaficheroapresentar.aspx?id=10730&idioma=ca", label: "Ajuntament de Palma: hoja de inscripción padronal (PDF)" };

const P = (c: string) => `/empadronarse/formulario-empadronamiento-${c}`;
export const FORM_CIUDADES2_1027_PATHS = ["valencia", "alicante", "murcia", "palma"].map(P);
const CIUDADES: [string, string][] = [["madrid", "Madrid"], ["barcelona", "Barcelona"], ["sevilla", "Sevilla"], ["zaragoza", "Zaragoza"], ["malaga", "Málaga"], ["valencia", "Valencia"], ["alicante", "Alicante"], ["murcia", "Murcia"], ["palma", "Palma"]];
const cityLink = ([c, n]: [string, string]) => ({ href: P(c), label: `Formulario de empadronamiento en ${n}` });

const relComunes = (self: string) => [
  ...CIUDADES.filter(([c]) => P(c) !== self).map(cityLink),
  { href: "/empadronarse/documentos-necesarios", label: "Documentos necesarios para empadronarse" },
  { href: "/empadronarse/cuanto-tarda-plazo", label: "Cuánto tarda: plazo de 3 meses" },
  { href: "/empadronarse", label: "Cómo empadronarse en España" },
];
const disc = (n: string) => `Resumen de la información oficial del Ayuntamiento de ${n} consultada el 27-10-2026. Si cambia, manda la web municipal.`;

export const FORM_CIUDADES2_1027_GUIDES: Guide[] = [
  {
    id: "formulario-empadronamiento-valencia", pack: "mudanza", reviewedAt: "2026-10-27", path: P("valencia"),
    h1: "Formulario de empadronamiento en Valencia: trámite PA.GP.11",
    title: "Formulario de empadronamiento Valencia: trámite PA.GP.11",
    description: "En Valencia no hay hoja descargable: el alta y el cambio de domicilio se piden con el trámite en línea PA.GP.11 o con cita previa. Gratuito.",
    lead: "Respuesta corta: en València no hay una hoja de empadronamiento para descargar. El formulario es el propio trámite en línea PA.GP.11 de la sede electrónica (altas y cambios de domicilio), con identificación y firma electrónica. También se puede hacer en persona con cita previa en las oficinas de gestión padronal. Todos los trámites de padrón son gratuitos.",
    cta: { href: VLC.href, label: "Trámite oficial PA.GP.11 en la sede de València" },
    sources: [VLC],
    related: relComunes(P("valencia")),
    disclaimer: disc("València"),
    faqs: [
      { q: "¿Dónde descargo la hoja de empadronamiento de Valencia?", a: "No hay hoja descargable. El Ayuntamiento tramita las altas y cambios de domicilio con el procedimiento PA.GP.11: en línea (botón «Iniciar trámite», con firma electrónica) o en persona con cita previa." },
      { q: "¿El alta en línea es automática?", a: "No. La sede avisa de que estos movimientos padronales requieren una revisión de la documentación y, si falta algo, requerimientos. El estado se puede consultar en la carpeta ciudadana." },
      { q: "¿Cuánto cuesta empadronarse en Valencia?", a: "Nada: la ficha indica que todos los trámites de padrón son gratuitos." },
      { q: "¿Cuánto vale una autorización de otra persona?", a: "Un mes desde la fecha que conste en el documento." },
      { q: "¿En qué idioma tienen que estar los documentos?", a: "En castellano o valenciano. Si no, original y traducción por traductor jurado o por una administración pública." },
    ],
    sections: [
      by("la ficha PA.GP.11 de la sede electrónica del Ayuntamiento de València (información actualizada a 14/11/2025)"),
      sec("sin-hoja", "No hay hoja descargable", ["A diferencia de otras ciudades, València no publica una hoja padronal para imprimir en esta ficha. El formulario es el trámite en línea PA.GP.11 de la sede (con identificación y firma electrónica) o la atención presencial con cita previa (web municipal o teléfono 010 / 963100010 / 962081104; una cita por persona salvo unidad familiar)."]),
      sec("papeles", "Documentos", ["Identidad de las personas mayores de edad afectadas (documentos en vigor; en presencial, originales o fotocopia compulsada) y documentación de la residencia en la vivienda. El documento de la vivienda debe incluir la referencia catastral o acompañarse de otro que la indique (último IBI, informe del catastro o nota simple). Si eres titular del IBI, el Ayuntamiento lo comprueba de oficio.", "Las copias impresas y escaneadas de documentos firmados electrónicamente no valen salvo que lleven Código Seguro de Verificación. Documentos extranjeros públicos: legalizados o apostillados, salvo los de la UE."]),
      sec("plazo", "Plazo", ["La ficha indica un plazo máximo de resolución de 3 meses y silencio estimatorio si se cumplen los requisitos esenciales."]),
    ],
  },
  {
    id: "formulario-empadronamiento-alicante", pack: "mudanza", reviewedAt: "2026-10-27", path: P("alicante"),
    h1: "Formulario de empadronamiento en Alicante: hoja de inscripción",
    title: "Formulario de empadronamiento Alicante: hoja y documentos",
    description: "En Alicante la hoja de inscripción solo se usa en la sede electrónica; en persona, con cita previa en las OAC Labradores o Séneca. Documentos.",
    lead: "Respuesta corta: en Alicante la hoja de inscripción para altas y cambios de domicilio solo se necesita para hacer el trámite en la sede electrónica (con certificado digital o DNI electrónico). En persona se va con cita previa a la OAC Labradores (C/ Labradores, 14) o a la OAC Séneca (C/ Portugal, 17) con la documentación.",
    cta: { href: ALC.href, label: "Ficha oficial de altas y cambios en el padrón de Alicante" },
    secondaryCta: { href: ALC_HOJA.href, label: "Hoja de inscripción (PDF oficial, para la sede)" },
    sources: [ALC, ALC_HOJA, ALC_PROP, ALC_AUT],
    related: relComunes(P("alicante")),
    disclaimer: disc("Alicante"),
    faqs: [
      { q: "¿Dónde descargo la hoja de empadronamiento de Alicante?", a: "En la ficha «Altas y cambios de domicilio en el Padrón Municipal de Habitantes» de alicante.es, sección «Información complementaria». El Ayuntamiento indica que es únicamente para el trámite en la sede electrónica." },
      { q: "¿Puedo empadronarme por internet en Alicante?", a: "Sí, en la sede electrónica, con certificado digital o DNI electrónico, adjuntando la hoja de inscripción y la documentación." },
      { q: "¿Cómo pido cita previa?", a: "Para la OAC Labradores, en el 010 o el 900 153 862; para la OAC Séneca, en citaprevia.alicante.es o en los mismos teléfonos." },
      { q: "¿Puede ir otra persona por mí?", a: "El Ayuntamiento pide que el trámite lo haga la persona interesada; solo por causa de fuerza mayor puede ir un representante con autorización y la documentación que indica la ficha." },
      { q: "¿Qué documentos llevo?", a: "Depende de tu caso: el Ayuntamiento publica PDF de documentación para vivienda en propiedad, con autorización del propietario y otros supuestos." },
    ],
    sections: [
      by("la ficha de altas y cambios de domicilio en el Padrón del Ayuntamiento de Alicante y sus PDF de documentación"),
      sec("vias", "Dos vías", [], [["Sede electrónica: con certificado digital o DNI electrónico; adjuntas la hoja de inscripción firmada y la documentación.", "Presencial con cita previa: OAC Labradores (C/ Labradores, 14; cita en 010 / 900 153 862) u OAC Séneca (C/ Portugal, 17; citaprevia.alicante.es o los mismos teléfonos)."]]),
      sec("hoja", "La hoja de inscripción", ["La firman todas las personas mayores de edad que se inscriben en ella. Incluye una casilla de autorización de persona ya empadronada para inscribirse en la misma vivienda."]),
      sec("menores", "Menores", ["Con un solo progenitor hay que acreditar el consentimiento de ambos o aportar resolución o autorización judicial; si procede, el modelo de declaración responsable de la ficha."]),
    ],
  },
  {
    id: "formulario-empadronamiento-murcia", pack: "mudanza", reviewedAt: "2026-10-27", path: P("murcia"),
    h1: "Formulario de empadronamiento en Murcia: solicitud y hoja",
    title: "Formulario de empadronamiento Murcia: solicitud y hoja padronal",
    description: "En Murcia el alta se pide con la solicitud del trámite 3662 y la hoja de inscripción firmada a mano. En línea, por el 010 o en oficinas. Gratuito.",
    lead: "Respuesta corta: en Murcia el formulario es la solicitud de alta o cambio de domicilio (trámite 3662 de la sede), que genera la hoja de inscripción padronal. Esa hoja se imprime, se firma a mano y se adjunta escaneada en PDF. También se puede tramitar por el teléfono 010 o en las Oficinas municipales de Información y Registro. Es gratuito.",
    cta: { href: MUR.href, label: "Ficha oficial del trámite 3662 en la sede de Murcia" },
    secondaryCta: { href: MUR_SOL.href, label: "Solicitud con hoja de inscripción (PDF oficial)" },
    sources: [MUR, MUR_SOL],
    related: relComunes(P("murcia")),
    disclaimer: disc("Murcia"),
    faqs: [
      { q: "¿Dónde está el formulario de empadronamiento de Murcia?", a: "En la ficha «Alta y cambio de domicilio en el Padrón Municipal de Habitantes» (código 3662) de sede.murcia.es, en «Modelos para descargar: Solicitud»." },
      { q: "¿Quién firma la hoja de inscripción?", a: "Según la solicitud, todos los inscritos mayores de 16 años; por los menores de 16, quienes ejerzan su custodia; y, si no se empadrona el propietario ni el arrendatario, la persona que autoriza." },
      { q: "¿Qué adjunto en la sede?", a: "Dos ficheros: la hoja de inscripción firmada y escaneada en PDF, y un único PDF con el resto (documentos de identidad en vigor de todos los inscritos mayores de 14 años y demás documentación que piden las instrucciones)." },
      { q: "¿Cuánto cuesta y cuánto tarda?", a: "Es gratuito. El plazo máximo para resolver es de tres meses desde la entrada en el Registro." },
      { q: "¿Puedo hacerlo sin certificado electrónico?", a: "Sí: por el teléfono municipal 010 o en las Oficinas municipales de Información y Registro, acreditando tu identidad con DNI, NIE o pasaporte." },
    ],
    sections: [
      by("la ficha del trámite 3662 de la sede electrónica del Ayuntamiento de Murcia y su formulario de solicitud"),
      sec("vias", "Tres vías", [], [["Sede electrónica, 24 horas, con certificado electrónico.", "Teléfono municipal de Información Ciudadana, 010.", "Oficinas municipales de Información y Registro (con DNI, NIE o pasaporte)."]]),
      sec("menores", "Menores", ["Para empadronar a un menor hace falta la firma o autorización de ambos progenitores con patria potestad, o autorización judicial; la solicitud describe los casos excepcionales y la declaración responsable que se usa."]),
    ],
  },
  {
    id: "formulario-empadronamiento-palma", pack: "mudanza", reviewedAt: "2026-10-27", path: P("palma"),
    h1: "Formulario de empadronamiento en Palma: hoja de inscripción",
    title: "Formulario de empadronamiento Palma: hoja padronal y cita",
    description: "En Palma el alta se pide con la hoja de inscripción padronal en una OAC con cita previa o por internet con firma digital. Mayores de 65, sin cita.",
    lead: "Respuesta corta: en Palma el formulario es la hoja de inscripción padronal (trámite Población.02), firmada por todos los solicitantes mayores de 18 años o de 16 emancipados. Se entrega en una OAC con cita previa o se tramita por internet con firma digital si eres mayor de edad y titular de la vivienda o tienes su autorización.",
    cta: { href: PMI.href, label: "Ficha oficial Población.02 en la sede de Palma" },
    secondaryCta: { href: PMI_INFO.href, label: "Hoja informativa del Ayuntamiento (PDF)" },
    sources: [PMI, PMI_INFO, PMI_HOJA],
    related: relComunes(P("palma")),
    disclaimer: disc("Palma"),
    faqs: [
      { q: "¿Dónde descargo la hoja de inscripción padronal de Palma?", a: "En la ficha Población.02 de la sede electrónica, apartado «Documentos»: «Hoja de inscripción padronal», que se puede rellenar en el ordenador." },
      { q: "¿Necesito cita previa?", a: "En general sí, en una OAC. Las personas mayores de 65 años pueden ir sin cita a la OAC Son Moix, de 8:30 a 13:30." },
      { q: "¿Y si es urgente?", a: "La hoja informativa admite urgencias acreditadas (plazos de menos de 30 días, tarjeta sanitaria por motivos de salud o zonas ACIRE) llamando al 010 de 14 a 23 horas; sin acreditar la urgencia no se hace el trámite." },
      { q: "¿Puedo empadronarme por internet en Palma?", a: "Sí, si eres mayor de edad, tienes firma digital y eres titular de la vivienda o tienes su autorización." },
      { q: "¿Qué identidad llevo?", a: "Originales en vigor y fotocopias: DNI para españoles; pasaporte o documento de identidad (y certificado verde si quieres figurar con NIE) para comunitarios; pasaporte o TIE para no comunitarios." },
    ],
    sections: [
      by("la ficha Población.02 de la sede de Palma y la hoja informativa sobre el empadronamiento (versión 18, febrero de 2026)"),
      sec("papeles", "Documentos", ["Hoja de inscripción padronal firmada por los solicitantes mayores de 18 años o de 16 emancipados; para menores, firma de ambos progenitores o los impresos de declaración que ofrece la sede.", "Identidad de todos los solicitantes (originales en vigor y fotocopias) y acreditación de la ocupación de la vivienda según tu caso, como detalla la hoja informativa; en caso de dudas, el Ayuntamiento puede hacer una inspección padronal."]),
    ],
  },
];

const label = (p: string) => cityLink(CIUDADES.find(([c]) => P(c) === p)!);
const NUEVAS = FORM_CIUDADES2_1027_PATHS.map(label);
const IN: Record<string, { href: string; label: string }[]> = {
  ...Object.fromEntries(["madrid", "barcelona", "sevilla", "zaragoza", "malaga"].map((c) => [P(c), NUEVAS])),
  "/empadronarse/documentos-necesarios": NUEVAS,
  "/empadronarse/cuanto-tarda-plazo": CIUDADES.map(cityLink),
};

export function enlazarFormCiudades2_1027(g: Guide): Guide {
  const add = IN[g.path];
  if (add) {
    const have = new Set(g.related.map((r) => r.href));
    g.related = [...g.related, ...add.filter((r) => !have.has(r.href))];
  }
  return g;
}
