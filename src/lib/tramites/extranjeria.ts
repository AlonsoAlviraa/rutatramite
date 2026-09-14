import {
  CORREOS_OFICINAS_REGULARIZACION,
  CORREOS_URL,
  RD_ARRAIGO,
  REGULARIZACION_CORREOS_HASTA,
  SEDE_AAPP_URL,
  TASA_DNI_LABEL,
  TASA_PASAPORTE_LABEL,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedEx = [
  { href: "/extranjeria/mercurio", label: "Mercurio" },
  { href: "/extranjeria/cita-huellas-tie", label: "Huellas / TIE" },
  { href: "/extranjeria/nie", label: "NIE" },
  { href: "/empadronarse", label: "Padrón" },
];

export const EXTRANJERIA_GUIDES: Guide[] = [
  {
    id: "correos",
    reviewedAt: "2026-09-07",
    sources: [{ label: "Correos: subsanación de la regularización extraordinaria", href: "https://www.correos.es/es/es/particulares/para-el-ciudadano/regularizacion-extraordinaria-personas-migrantes" }],
    pack: "extranjeria",
    path: "/extranjeria/subsanar-regularizacion-correos",
    h1: "Subsanar la regularización en Correos (ventana hasta el 30 de septiembre)",
    title: "Subsanar regularización en Correos hasta el 30 de septiembre",
    description:
      "Subsanación de la regularización extraordinaria en 383 oficinas de Correos hasta el 30 de septiembre de 2026 (8:30-17:30, sin cita). Qué se puede aportar y qué pasa si no.",
    lead: `La fase de subsanación de la regularización extraordinaria sigue ABIERTA hasta el ${REGULARIZACION_CORREOS_HASTA} de 2026 en 383 oficinas de Correos habilitadas, en horario de 8:30 a 17:30 y sin cita previa (verificado en la web de Correos). RutaTrámite no presenta tu escrito: te decimos qué llevar y qué pasa después.`,
    cta: { href: "https://www.correos.es/es/es/particulares/para-el-ciudadano/regularizacion-extraordinaria-personas-migrantes", label: "Subsanación y oficinas habilitadas de Correos" },
    secondaryCta: { href: SEDE_AAPP_URL, label: "Sede de administraciones públicas" },
    related: [
      { href: "/extranjeria/regularizacion-2026-resolucion", label: "Regularización: cuánto tarda la resolución" },
      { href: "/extranjeria/cita-huellas-tie", label: "Huellas / TIE" },
      { href: "/empadronarse", label: "Padrón" },
    ],
    sections: [
      {
        id: "ventana",
        title: "La fecha y las condiciones, sin maquillaje",
        paragraphs: [
          `Subsanación del 1 de julio al ${REGULARIZACION_CORREOS_HASTA} de 2026 en ${CORREOS_OFICINAS_REGULARIZACION} oficinas de Correos, sin cita, con listados de oficinas y horarios publicados por mes (julio, agosto, septiembre). Solo si presentaste solicitud en plazo (la fase de presentación cerró el 30 de junio y no hubo prórroga). Lleva el resguardo de tu solicitud, tu pasaporte o documento de identidad y exactamente lo que te requerieron o lo que falte: la ventana vale para aportar documentación pendiente, voluntariamente o contra requerimiento.`,
        ],
      },
      {
        id: "despues",
        title: "Qué pasa si no subsanas",
        paragraphs: [
          "Si no aportaste la documentación, esta guía no afirma cuál será la consecuencia en tu expediente porque la página de Correos no la detalla. Revisa el requerimiento individual, el justificante y el estado oficial; si recibes una resolución, sigue las vías y plazos de recurso que indique el propio acto administrativo. No pagues a quien prometa alterar una fecha o \"colar\" la subsanación.",
        ],
      },
      {
        id: "padron",
        title: "Padrón",
        paragraphs: [
          "El padrón no es este trámite. Si te lo piden como prueba de residencia, la guía está en /empadronarse. El alta padronal es gratuita y no se niega por estar irregular (artículo 15 LBRL).",
        ],
      },
    ],
  },
  {
    id: "mercurio",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Sede: solicitudes y documentación con Mercurio", href: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/mercurio2" },
      { label: "Sede: consulta de expedientes de extranjería", href: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/expedientes_extranjeria" },
    ],
    pack: "extranjeria",
    path: "/extranjeria/mercurio",
    h1: "Mercurio y consulta de expedientes de extranjería",
    title: "Mercurio: solicitudes, documentación y consulta de expedientes",
    description: "Accede a Mercurio para presentar solicitudes y aportar documentación. Usa el servicio de consulta de extranjería para comprobar el estado del expediente.",
    lead: "Mercurio permite presentar solicitudes de autorizaciones y aportar documentos a expedientes de extranjería. La sede también ofrece un servicio específico para consultar el estado de tramitación. Elige el acceso según lo que necesites hacer.",
    cta: { href: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/expedientes_extranjeria", label: "Consultar el estado de mi expediente" },
    secondaryCta: { href: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/mercurio2", label: "Solicitudes y documentación: Mercurio" },
    related: relatedEx,
    sections: [
      {
        id: "como",
        title: "Cómo consultar",
        paragraphs: [
          "Abre el servicio de consulta de expedientes y sigue las opciones de identificación que ofrece. Si necesitas presentar una autorización o adjuntar documentos, utiliza Mercurio y revisa sus instrucciones. Conserva el justificante de cualquier presentación.",
        ],
      },
      {
        id: "no",
        title: "Qué no es",
        paragraphs: [
          "No vendemos citas. No hay pasarela de pago. DNI y pasaporte, si te los piden en vigor, van por citapreviadnie.es (tasas 2026: DNI 12 €, pasaporte 30 €).",
        ],
      },
    ],
  },
  {
    id: "huellas",
    pack: "extranjeria",
    path: "/extranjeria/cita-huellas-tie",
    h1: "Cita de huellas y TIE",
    title: "Cita huellas TIE 2026: sede oficial, sin huecos inventados",
    description: "Cita de huellas y TIE en la sede de administraciones públicas. No inventamos huecos de Madrid, Barcelona o Alicante.",
    lead: "La cita de huellas / TIE se pide en la sede de administraciones públicas (extranjería), no en citapreviadnie.es. La disponibilidad cambia por oficina y momento: esta guía no publica un cupo ni un bot de pago.",
    cta: { href: SEDE_AAPP_URL, label: "Sede de administraciones públicas" },
    related: relatedEx,
    sections: [
      {
        id: "donde",
        title: "Dónde se pide",
        paragraphs: [
          "Portal de cita de extranjería de la Administración General del Estado. Elige provincia y trámite de toma de huellas o TIE. Si no hay hueco, reintenta en el propio portal. Un 807 no es un hueco.",
        ],
      },
      {
        id: "dni",
        title: "No confundir con DNI",
        paragraphs: [
          `El TIE no se pide en citapreviadnie.es. Ese portal es DNI y pasaporte de españoles (cita gratuita; tasas ${TASA_DNI_LABEL} / ${TASA_PASAPORTE_LABEL}).`,
        ],
      },
    ],
  },
  {
    id: "registro-ue",
    pack: "extranjeria",
    path: "/extranjeria/certificado-registro-ue",
    h1: "Certificado de registro de ciudadano de la UE",
    title: "Certificado de registro UE 2026",
    description: "Certificado de registro de ciudadano UE/EEE/Suiza. Cita en extranjería (sede AAPP). El padrón es otro trámite.",
    lead: "El certificado de registro de ciudadano de la Unión se pide en extranjería (sede de administraciones públicas), no en el ayuntamiento. El padrón es aparte y gratuito.",
    cta: { href: SEDE_AAPP_URL, label: "Sede de administraciones públicas" },
    secondaryCta: { href: "/empadronarse/extranjeros-ue", label: "Empadronarse siendo UE" },
    related: relatedEx,
    sections: [
      {
        id: "docs",
        title: "Marco",
        paragraphs: [
          "Pasaporte o documento nacional, prueba de seguro y de medios o trabajo, según el caso. No convertimos el certificado en un filtro del padrón: el artículo 15 LBRL sigue valiendo.",
        ],
      },
    ],
  },
  {
    id: "nie",
    pack: "extranjeria",
    path: "/extranjeria/nie",
    h1: "Asignación de NIE",
    title: "Cita NIE 2026: sin hueco inventado en Madrid, Barcelona o Alicante",
    description: "El NIE se cita en la sede de extranjería, no en citapreviadnie.es. No publicamos huecos falsos de Madrid, BCN o Alicante.",
    lead: "La asignación de NIE sigue sin hueco fácil en Madrid, Barcelona y Alicante. Esta página no inventa uno. Cita en la sede de administraciones públicas. citapreviadnie.es es DNI/pasaporte, no NIE.",
    cta: { href: SEDE_AAPP_URL, label: "Sede de administraciones públicas" },
    related: relatedEx,
    sections: [
      {
        id: "donde",
        title: "Dónde y dónde no",
        paragraphs: [
          "Extranjería / Policía según el trámite (NIE de no residente, etc.) a través del portal de cita de la AGE. Un anuncio de “NIE mañana Madrid 80 €” es un clon. RutaTrámite no cobra por huecos.",
        ],
      },
    ],
  },
  {
    id: "arraigo",
    pack: "extranjeria",
    path: "/extranjeria/arraigo-padron",
    h1: "Arraigo y padrón de dos años (RD 1155/2024)",
    title: "Arraigo con padrón de 2 años: RD 1155/2024",
    description: "El reglamento RD 1155/2024 y el padrón de dos años en el arraigo. El padrón se pide en el ayuntamiento, no se compra.",
    lead: `El ${RD_ARRAIGO} (reglamento de extranjería) es la norma de pack para el arraigo y los plazos de residencia. El padrón de dos años se construye empadronándose de verdad, no con un volante de un día. El alta padronal es gratuita.`,
    cta: { href: "/empadronarse", label: "Guía de empadronarse" },
    secondaryCta: { href: SEDE_AAPP_URL, label: "Sede de extranjería" },
    related: [
      { href: "/empadronarse/extranjeros-no-ue", label: "Extranjeros no UE y padrón" },
      { href: "/empadronarse/volante-vs-certificado", label: "Volante vs certificado" },
      ...relatedEx,
    ],
    sections: [
      {
        id: "rd",
        title: "Qué hace el RD 1155/2024 aquí",
        paragraphs: [
          `El ${RD_ARRAIGO} reforma el reglamento de extranjería. Para un arraigo, extranjería mira residencia continuada y el resto de requisitos de la figura concreta. El padrón y el certificado o el histórico son la prueba habitual de esa residencia. No sustituyen la autorización.`,
        ],
      },
      {
        id: "padron",
        title: "Dos años de padrón no se improvisan en septiembre",
        paragraphs: [
          "Si te empadronas ahora, el reloj empieza ahora. El certificado o el histórico reciente es lo que suele pedirse, no el volante de ayer. Guía larga: /empadronarse y /empadronarse/extranjeros-no-ue.",
        ],
      },
    ],
  },
  {
    id: "regreso",
    pack: "extranjeria",
    path: "/extranjeria/autorizacion-regreso",
    h1: "Autorización de regreso si la TIE está en trámite",
    title: "Autorización de regreso 2026: viajar con la TIE en trámite",
    description: "Autorización de regreso para salir y volver con la TIE en trámite. Cita en extranjería/Policía. Sin huecos de pago.",
    lead: "Si viajas en Navidad con la TIE caducada o en renovación, la autorización de regreso se pide en Policía / extranjería (sede de administraciones públicas), no en citapreviadnie.es. No hay un bot legal de huecos.",
    cta: { href: SEDE_AAPP_URL, label: "Sede de administraciones públicas" },
    related: relatedEx,
    sections: [
      {
        id: "cuando",
        title: "Cuándo sirve",
        paragraphs: [
          "Residente con autorización en renovación o TIE en trámite, viaje puntual y vuelta a España. No sustituye el visado de quien aún no es residente. Lleva el resguardo, el pasaporte y la cita o el justificante de renovación.",
        ],
      },
      {
        id: "no-dni",
        title: "No es el pasaporte español",
        paragraphs: [
          `Pasaporte español y DNI van por citapreviadnie.es (cita gratuita; tasas ${TASA_DNI_LABEL} / ${TASA_PASAPORTE_LABEL}). La autorización de regreso es otro mostrador.`,
        ],
      },
    ],
  },
];
