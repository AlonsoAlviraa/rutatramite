import type { Guide } from "@/lib/tramites/types";

const REVIEWED = "2026-10-10";

const BOE_ART15 = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a15";
const SEVILLA_ALTA =
  "https://www.sevilla.org/servicios/empadronamiento/informacion-cambio-en-el-padron-de-habitantes-de-sevilla";
const SEVILLA_BAJA =
  "https://www.sevilla.org/servicios/servicio-de-estadistica/bajas-por-inscripcion-indebida-bajas-de-oficio/que-es-una-baja";
const CORDOBA_ALTA =
  "https://www.cordoba.es/sede/tramites/padron-de-habitantes/alta-o-inscripcion-y-traslado-de-domicilio-en-el-padron-municipal-de-habitantes";
const CORDOBA_CERT = "https://www.cordoba.es/sede/tramites/padron-de-habitantes/certificados-de-padron";
const INCIBE_AVISO =
  "https://www.incibe.es/ciudadania/avisos/la-policia-nacional-no-esta-mandando-citaciones-para-que-regules-tu-expediente";
const INCIBE_DENUNCIA = "https://www.incibe.es/ciudadania/ayuda/denuncia";
const FNMT = "https://www.sede.fnmt.gob.es/certificados/persona-fisica";
const FNMT_1038 =
  "https://www.sede.fnmt.gob.es/preguntas-frecuentes/certificado-de-persona-fisica/-/asset_publisher/eIal9z2VE0Kb/content/1038-son-gratuitos-todos-estos-tramites-";
const PAG_FNMT =
  "https://administracion.gob.es/tramites-electronicos/servicioselectronicosfrecuentes/obtencion-certificado-electronico-fnmt";
const BECAS_DUDAS = "https://www.becaseducacion.gob.es/dudas.html";
const POLICIA_TASAS = "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tasas.php";

const SIN_PRECIO_NACIONAL =
  "El artículo 15 de la Ley 7/1985 obliga a quien vive en España a inscribirse en el padrón del municipio de residencia habitual. El artículo 16 define el padrón como el registro administrativo de ese municipio y atribuye carácter de documento público a sus certificaciones. Esa ley no publica un precio nacional del alta.";

const relatedCobros = [
  { href: "/empadronarse/me-quieren-cobrar", label: "Me quieren cobrar por empadronarme" },
  { href: "/empadronarse/cobro-en-el-contrato", label: "Me añaden dinero al contrato" },
  { href: "/dni/paginas-clon-cita", label: "Páginas clon de la cita del DNI" },
  { href: "/extranjeria/aviso-citacion-expediente", label: "Citación para regular el expediente" },
  { href: "/extranjeria/certificado-quien-cobra", label: "Certificado FNMT y cobros" },
  { href: "/becas/cobro-al-presentar", label: "Cobro al presentar la beca" },
];

export const COBROS_AVISOS_GUIDES: Guide[] = [
  {
    id: "cobro-padron",
    pack: "mudanza",
    path: "/empadronarse/me-quieren-cobrar",
    h1: "Me quieren cobrar por empadronarme",
    title: "Me quieren cobrar por empadronarme: quién pide el pago",
    description:
      "Separa el alta del padrón, el volante, un anuncio privado y una línea del contrato. Sevilla y Córdoba publican su criterio. La ley no fija un precio nacional.",
    lead:
      "Pregunta quién cobra y qué concepto pone en el recibo. El alta la tramita el ayuntamiento del municipio donde vives. Una web, un gestor o el casero no son ese ayuntamiento. La Ley 7/1985 no fija un precio nacional del alta.",
    reviewedAt: REVIEWED,
    cta: { href: SEVILLA_ALTA, label: "Aviso del Ayuntamiento de Sevilla" },
    secondaryCta: { href: CORDOBA_ALTA, label: "Ficha del alta en Córdoba" },
    sources: [
      { href: BOE_ART15, label: "BOE: Ley 7/1985, artículo 15" },
      { href: SEVILLA_ALTA, label: "Sevilla: el empadronamiento es gratuito" },
      { href: CORDOBA_ALTA, label: "Córdoba: alta no sujeta a tasas" },
      { href: CORDOBA_CERT, label: "Córdoba: certificados de padrón" },
    ],
    related: [
      { href: "/empadronarse", label: "Empadronarse en España" },
      { href: "/empadronarse/volante-vs-certificado", label: "Volante y certificado" },
      { href: "/empadronarse/cobro-en-el-contrato", label: "Cobro dentro del contrato" },
      { href: "/empadronarse/con-contrato", label: "Alta con contrato de alquiler" },
      ...relatedCobros.filter((link) => link.href !== "/empadronarse/me-quieren-cobrar"),
    ],
    faqs: [
      {
        q: "¿Me hacen pagar por empadronarme?",
        a: "Depende de quién cobra y de qué municipio. La Ley 7/1985 no fija un precio nacional del alta. En Sevilla, el Ayuntamiento dice que el empadronamiento es gratuito y que cualquier pago que le exijan para empadronarse es un fraude. En Córdoba, la ficha del alta marca que no está sujeta a tasas. Pide el concepto y el recibo del ayuntamiento.",
      },
      {
        q: "¿Me añaden dinero al contrato por empadronarme?",
        a: "Una línea del contrato de alquiler es un precio entre particulares. No es la tasa del ayuntamiento. Esta guía no declara nula esa cláusula y no publica un importe. La guía del cobro en el contrato explica qué pedir por escrito.",
      },
      {
        q: "¿Cualquier pago de un trámite es un fraude?",
        a: "No. La reserva de la cita del DNI en el portal oficial es gratuita y la tasa del documento es otra gestión. La sede de la Policía publica tasas de extranjería. El certificado de ciudadano de la FNMT es gratuito y la vídeo identificación tiene un precio publicado aparte. Un ingreso a un particular que dice ser el ayuntamiento no es ninguno de esos pagos.",
      },
    ],
    sections: [
      {
        id: "quien-cobra",
        title: "Quién te está pidiendo el dinero",
        paragraphs: [
          "Anota el nombre de quien cobra, el concepto y si el justificante es del ayuntamiento. El alta, el volante y el certificado son gestiones distintas. Una ordenanza puede publicar una tasa por expedir un documento y, a la vez, no publicar un precio del alta. Esta página no copia importes de ordenanzas que no ha leído.",
          SIN_PRECIO_NACIONAL,
        ],
      },
      {
        id: "sevilla-cordoba",
        title: "Lo que dicen Sevilla y Córdoba",
        paragraphs: [
          "En la página de documentación para empadronarse, el Ayuntamiento de Sevilla escribe: «El empadronamiento es gratuito. Cualquier pago que le exijan para empadronarse es un FRAUDE.» Esa frase es del Ayuntamiento de Sevilla. No es una norma leída para el resto de municipios.",
          "En Córdoba, la ficha del alta o inscripción marca «Está sujeto a tasas» con el valor «No». La ficha de certificados de padrón repite esa misma casilla, también con «No». Las dos fichas son del Ayuntamiento de Córdoba.",
        ],
      },
      {
        id: "otros-tramites",
        title: "El mismo patrón en otros trámites",
        paragraphs: [
          "DNI y pasaporte. La guía de páginas clon separa la reserva en citapreviadnie.es, que es gratuita, de la tasa del documento en el portal oficial, y de un intermediario de pago. Que exista un precio oficial no acredita el cobro de una web imitadora.",
          "Extranjería. INCIBE publicó el 19 de diciembre de 2024 un aviso sobre correos que suplantan a la Policía Nacional con la excusa de regular un expediente. Las tasas de extranjería que sí existen están en la sede de la Policía, con sus importes en esa sede.",
          "Certificado de la FNMT. La sede dice que el certificado de persona física se obtiene de forma gratuita. El Punto de Acceso General añade un coste de 2,99 € más impuestos solo para la vídeo identificación.",
          "Beca del Ministerio. La solicitud se presenta en su sede electrónica. En la página de dudas, el recurso de reposición no tiene coste para la persona interesada y el recurso contencioso-administrativo sí tendrá costes. Esta lectura no incluye una frase que declare gratuita la presentación de la solicitud.",
          "Colegio, comedor, escuela infantil, vacunas, ayuda al alquiler y abono de transporte. En las páginas oficiales leídas el 10 de octubre de 2026 no hay una frase que declare gratuitos, en toda España, la plaza de escuela infantil, el menú, la vacuna, la ayuda al alquiler o el título de transporte. Los hubs de colegio y de comedor de este sitio tampoco fijan una tasa nacional. Quien te cobre por reservar la plaza o por presentar la ayuda te cobra su servicio: la convocatoria está en la administración que la publica.",
        ],
        lists: [
          [
            "Abre la sede del organismo y comprueba el dominio antes de pagar.",
            "Conserva el concepto del recibo y el nombre de quien cobra.",
            "Si el mensaje urge a descargar un archivo o a ingresar en una cuenta particular, para y contrasta por el canal oficial.",
            "La residencia que declares en el padrón tiene que ser la habitual. Esta página no sirve para inscribir un domicilio que no lo es.",
          ],
        ],
      },
    ],
  },
  {
    id: "cobro-contrato",
    pack: "mudanza",
    path: "/empadronarse/cobro-en-el-contrato",
    h1: "Me añaden dinero al contrato por empadronarme",
    title: "Me añaden dinero al contrato por empadronarme",
    description:
      "Una línea del alquiler no es la tasa del padrón. Qué pedir por escrito y qué dice Sevilla si te aseguran que el ayuntamiento cobra el alta.",
    lead:
      "Una cantidad añadida al contrato, a la fianza o a una gestión de empadronamiento es un precio entre particulares. El alta la resuelve el ayuntamiento. Esta guía no declara nula esa cláusula y no publica un importe.",
    reviewedAt: REVIEWED,
    cta: { href: "/empadronarse/me-quieren-cobrar", label: "Quién puede pedir un pago" },
    secondaryCta: { href: SEVILLA_ALTA, label: "Frase del Ayuntamiento de Sevilla" },
    sources: [
      { href: SEVILLA_ALTA, label: "Sevilla: pago exigido para empadronarse" },
      { href: SEVILLA_BAJA, label: "Sevilla: alta y baja para alterar la convivencia" },
      { href: BOE_ART15, label: "BOE: Ley 7/1985, artículo 15" },
    ],
    related: [
      { href: "/empadronarse/con-contrato", label: "Empadronarse con contrato" },
      { href: "/empadronarse/casa-de-familiar", label: "Casa de un familiar" },
      { href: "/empadronarse/me-quieren-cobrar", label: "Me quieren cobrar el alta" },
      { href: "/alquiler", label: "Ayudas al alquiler" },
    ],
    faqs: [
      {
        q: "¿Me añaden dinero al contrato por empadronarme?",
        a: "Esa línea es un precio del contrato, no la tasa municipal del alta. Pide quién cobra, el concepto y si hay un recibo del ayuntamiento. Esta guía no declara nula la cláusula y no publica un importe.",
      },
      {
        q: "¿Y si me dicen que el ayuntamiento cobra el alta?",
        a: "Abre la página de ese ayuntamiento. En Sevilla, el Ayuntamiento dice que el empadronamiento es gratuito y que cualquier pago que le exijan para empadronarse es un fraude. Esa frase es de Sevilla.",
      },
    ],
    sections: [
      {
        id: "linea-privada",
        title: "La línea del contrato y el alta municipal",
        paragraphs: [
          "Pide por escrito tres datos: quién cobra, qué concepto figura y si existe un recibo emitido por el ayuntamiento. Si el anuncio dice que el ayuntamiento cobra el alta, contrasta la página de ese municipio. En Sevilla, la página de documentación para empadronarse dice que el empadronamiento es gratuito y que cualquier pago que le exijan para empadronarse es un fraude.",
          "No hay, en las normas leídas para esta guía, un artículo que anule por sí solo una cláusula privada de gestión. Por eso esta página no declara nula la cláusula y no convierte un anuncio en una tasa municipal.",
        ],
      },
      {
        id: "convivencia",
        title: "Alta o baja para cambiar quién figura en la vivienda",
        paragraphs: [
          "El Ayuntamiento de Sevilla advierte de que el uso de los procedimientos de baja y alta para alterar artificialmente la unidad de convivencia, con el fin de obtener ayudas económicas, becas o subsidios, puede constituir un fraude de ley. El Ayuntamiento dice que hace controles de veracidad y que esas prácticas pueden conllevar la denegación de las ayudas y responsabilidades legales.",
          "La inscripción corresponde al municipio de residencia habitual. Esta guía se queda en el aviso del Ayuntamiento y no da pasos para cambiar la unidad de convivencia.",
        ],
      },
    ],
  },
  {
    id: "aviso-expediente",
    pack: "extranjeria",
    path: "/extranjeria/aviso-citacion-expediente",
    h1: "Me escriben para regular mi expediente",
    title: "Citación para regular el expediente: aviso de INCIBE",
    description:
      "INCIBE avisó el 19 de diciembre de 2024 de correos que suplantan a la Policía Nacional. Qué hacer con el mensaje y dónde está la tasa oficial.",
    lead:
      "INCIBE publicó el 19 de diciembre de 2024, con importancia alta, que la Policía Nacional no está mandando citaciones para que regules tu expediente. El aviso describe una suplantación por correo y un enlace para descargar documentación.",
    reviewedAt: REVIEWED,
    cta: { href: INCIBE_AVISO, label: "Aviso de INCIBE del 19 de diciembre de 2024" },
    secondaryCta: { href: INCIBE_DENUNCIA, label: "INCIBE: denunciar y línea 017" },
    sources: [
      { href: INCIBE_AVISO, label: "INCIBE: citaciones para regular el expediente" },
      { href: INCIBE_DENUNCIA, label: "INCIBE: línea 017 y denuncia" },
      { href: POLICIA_TASAS, label: "Policía: tasas oficiales de extranjería" },
    ],
    related: [
      { href: "/dni/paginas-clon-cita", label: "Páginas clon de la cita del DNI" },
      { href: "/extranjeria", label: "Extranjería" },
      { href: "/descargas", label: "Formularios con fuente oficial" },
      { href: "/empadronarse/me-quieren-cobrar", label: "Cobros del padrón" },
    ],
    faqs: [
      {
        q: "¿La Policía me cita por correo para regular el expediente?",
        a: "INCIBE dice que la Policía Nacional no está mandando esas citaciones. El aviso es del 19 de diciembre de 2024. No abras el enlace ni el archivo. Contrasta el aviso en la página de INCIBE o pregunta en el 017.",
      },
      {
        q: "¿Hay pagos oficiales de extranjería?",
        a: "Sí. La sede de la Policía publica las tasas de extranjería y sus importes. Un mensaje que pide un ingreso a un particular no es esa sede.",
      },
    ],
    sections: [
      {
        id: "aviso",
        title: "Qué describe el aviso",
        paragraphs: [
          "INCIBE explica una campaña de suplantación a la Policía Nacional, por correo, con la excusa de una citación para regular el estado del expediente y un enlace para descargar la documentación. Cita asuntos del tipo «Notificación oficial: Expediente» y direcciones que imitan el dominio de la Policía.",
          "No abras el enlace ni el archivo del mensaje. Lee el aviso en la página de INCIBE. En la página de denuncia, INCIBE ofrece la línea de ayuda en ciberseguridad 017 y la describe como gratuita. También indica WhatsApp 900 116 117 y Telegram @INCIBE017.",
        ],
      },
      {
        id: "tasa-oficial",
        title: "La tasa oficial está en otra sede",
        paragraphs: [
          "Las tasas de extranjería se consultan en la sede de la Policía. Esta guía no copia sus importes. Un bizum, una cuenta particular o una web que no sea esa sede no quedan acreditados por el hecho de mencionar un expediente.",
          "La reserva de cita del DNI en citapreviadnie.es es otro trámite. Su diferencia con la tasa del documento y con las páginas imitadoras está en la guía de páginas clon.",
        ],
      },
    ],
  },
  {
    id: "certificado-quien-cobra",
    pack: "extranjeria",
    path: "/extranjeria/certificado-quien-cobra",
    h1: "¿Me cobran por el certificado de la FNMT?",
    title: "Certificado FNMT: gratuito y vídeo identificación de pago",
    description:
      "La FNMT dice que el certificado de persona física no genera coste. El Punto de Acceso General publica 2,99 € más impuestos por la vídeo identificación.",
    lead:
      "La sede de la FNMT dice que el certificado de persona física se solicita y se obtiene de forma gratuita. El Punto de Acceso General repite que es gratuito y publica, aparte, 2,99 € más impuestos por la vídeo identificación.",
    reviewedAt: REVIEWED,
    cta: { href: FNMT, label: "Certificado de persona física en la FNMT" },
    secondaryCta: { href: PAG_FNMT, label: "Punto de Acceso General: coste" },
    sources: [
      { href: FNMT, label: "FNMT: certificado de ciudadano" },
      { href: FNMT_1038, label: "FNMT: pregunta 1038, sin coste de expedición" },
      { href: PAG_FNMT, label: "Punto de Acceso General: 2,99 € de la vídeo identificación" },
    ],
    related: [
      { href: "/extranjeria/certificado-digital-nie", label: "Acreditación presencial con NIE" },
      { href: "/extranjeria/aviso-citacion-expediente", label: "Aviso de citación falsa" },
      { href: "/dni/paginas-clon-cita", label: "Páginas clon de la cita" },
    ],
    faqs: [
      {
        q: "¿El certificado de la FNMT es de pago?",
        a: "La sede de la FNMT dice que se obtiene de forma gratuita. La pregunta 1038 dice que el registro de usuarios y la expedición del certificado de persona física no generan coste económico para la persona interesada. La vídeo identificación es un servicio distinto: el Punto de Acceso General publica 2,99 € más impuestos.",
      },
    ],
    sections: [
      {
        id: "gratuito",
        title: "Lo que la FNMT llama gratuito",
        paragraphs: [
          "En la ficha del certificado de ciudadano, la FNMT escribe que cualquier ciudadano español o extranjero, mayor de edad o menor emancipado, con DNI o NIE, puede solicitar y obtener su certificado digital de forma gratuita. La pregunta 1038 añade que las prestaciones de registro de usuarios y de expedición de certificados de persona física no generarán coste económico para los interesados.",
        ],
      },
      {
        id: "video",
        title: "El precio que sí está publicado",
        paragraphs: [
          "El Punto de Acceso General responde que el certificado de ciudadano de la FNMT es gratuito y que, únicamente si se obtiene con vídeo identificación, hay que abonar 2,99 € más impuestos por ese servicio. Ese importe no es una tasa del padrón, de la beca ni del DNI.",
          "Una web que no sea sede.fnmt.gob.es ni administracion.gob.es y que cobre por hacerte el certificado está prestando otro servicio, o suplantando el trámite. El proceso con NIE y acreditación presencial está en la guía específica. Esta página no repite esos pasos.",
        ],
      },
    ],
  },
  {
    id: "beca-cobro",
    pack: "becas",
    path: "/becas/cobro-al-presentar",
    h1: "Me cobran por presentar la beca",
    title: "Me cobran por presentar la beca del Ministerio",
    description:
      "La solicitud se presenta en la sede del Ministerio. El recurso de reposición no tiene coste para ti. El contencioso sí tendrá costes.",
    lead:
      "La beca general se pide en la sede electrónica del Ministerio de Educación, Formación Profesional y Deportes. Un gestor que cobre por presentarla no es el Ministerio. En la página de dudas, el recurso de reposición no tiene coste para ti.",
    reviewedAt: REVIEWED,
    cta: { href: BECAS_DUDAS, label: "Dudas oficiales de la beca" },
    secondaryCta: { href: "/becas", label: "Guías de becas" },
    sources: [{ href: BECAS_DUDAS, label: "Ministerio: tu beca en nueve pasos y recursos" }],
    related: [
      { href: "/becas", label: "Becas" },
      { href: "/becas/mec", label: "Beca del Ministerio" },
      { href: "/empadronarse/me-quieren-cobrar", label: "Cobros que no son el trámite" },
    ],
    faqs: [
      {
        q: "¿Me hacen pagar por presentar la beca?",
        a: "La presentación es un formulario de la sede del Ministerio. Esta guía no ha leído una frase que diga que esa presentación sea gratuita ni una que prohíba a un gestor cobrar su servicio. El recurso de reposición no tiene coste para ti. El recurso contencioso-administrativo sí tendrá costes, porque requiere abogado y procurador.",
      },
    ],
    sections: [
      {
        id: "sede",
        title: "Dónde se presenta y qué recurso tiene coste",
        paragraphs: [
          "El Ministerio explica la solicitud en becaseducacion.gob.es y la sede electrónica. En la misma página de dudas dice que, tras la resolución, hay un mes para el recurso de reposición, que es administrativo y no tiene coste para ti, y dos meses para el recurso contencioso-administrativo, que sí tendrá costes.",
          "Guarda el justificante de la sede. Un cobro por rellenar el formulario es el precio de quien te ayuda, con su nombre y su concepto. No lo conviertas en una tasa del Ministerio si el recibo no es del Ministerio.",
        ],
      },
    ],
  },
];
