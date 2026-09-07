import {
  CORREOS_OFICINAS_REGULARIZACION,
  CORREOS_REGULARIZACION_URL,
  SEDE_AAPP_URL,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedExNicho = [
  { href: "/extranjeria/cita-huellas-tie", label: "Cita de huellas y TIE" },
  { href: "/extranjeria/autorizacion-regreso", label: "Autorización de regreso" },
  { href: "/extranjeria/nie", label: "NIE" },
  { href: "/empadronarse", label: "Padrón" },
];

export const EXTRANJERIA_NICHOS_GUIDES: Guide[] = [
  {
    id: "no-hay-citas-extranjeria",
    pack: "extranjeria",
    path: "/extranjeria/no-hay-citas",
    h1: "No hay citas de extranjería: qué puedes hacer",
    title: "No hay citas de extranjería: opciones legales",
    description:
      "Qué comprobar si no hay citas de extranjería, cómo contactar con la oficina y dónde comunicar un error técnico del portal oficial.",
    lead:
      "Si aparece el mensaje de que no hay citas disponibles, la ayuda oficial indica que las citas de esa oficina están ocupadas y recomienda consultar más adelante. La disponibilidad depende de cada oficina; no hay una hora de apertura verificada en esta guía.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Sede: preguntas frecuentes de cita previa", href: "https://sede.administracionespublicas.gob.es/ayuda/faq/extranjeria" },
      { label: "Sede: asistencia e incidencias técnicas", href: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/ayuda_cita_previa" },
    ],
    cta: { href: SEDE_AAPP_URL, label: "Portal de cita (oficial)" },
    related: relatedExNicho,
    sections: [
      {
        id: "que-funciona",
        title: "Comprueba el trámite y la oficina",
        paragraphs: [
          "Revisa la provincia, el procedimiento seleccionado y las instrucciones antes de reservar. Una cita para otro procedimiento puede no servir. Si la oficina no aparece o tienes dudas sobre dónde te corresponde acudir, consulta con ella; no todas usan este sistema de cita previa.",
          "Conserva el mensaje y la fecha de los intentos para explicar la incidencia. No des por ampliado un plazo por guardar capturas o por no encontrar cita: consulta las instrucciones de tu resolución y contacta con la oficina competente si el vencimiento se aproxima.",
        ],
      },
      {
        id: "mercado",
        title: "Falta de citas o error técnico",
        paragraphs: [
          "Si el portal funciona pero no muestra disponibilidad, vuelve a consultar más adelante. Para dudas sobre la cita, contacta con la oficina o con el 060. Si falla la aplicación, utiliza el formulario de incidencias técnicas enlazado en las fuentes y selecciona Cita Previa; ese canal no atiende consultas sobre el estado del expediente. La llamada al 060 tiene coste según tu operador.",
          "Si no puedes acudir a una cita reservada, entra con los mismos datos de identidad y usa la opción de anulación con su número de justificante. Guarda el justificante de cualquier nueva reserva.",
        ],
      },
      {
        id: "dni",
        title: "No mezcles canales",
        paragraphs: [
          "Utiliza el portal oficial de cita de extranjería y sigue las instrucciones del procedimiento. citapreviadnie.es corresponde al DNI y al pasaporte españoles; no es el canal para reservar la toma de huellas de la TIE.",
        ],
      },
    ],
  },
  {
    id: "huellas-barcelona",
    pack: "extranjeria",
    path: "/extranjeria/huellas-sin-citas-barcelona",
    h1: "No hay citas de huellas en Barcelona: qué hacer",
    title: "Sin cita de huellas en Barcelona: oficina y ayuda oficial",
    description:
      "Revisa la provincia y el procedimiento de TIE en Barcelona. Qué hacer si no hay citas o si falla la aplicación, con enlaces de ayuda oficial.",
    lead:
      "Para buscar cita de huellas de la TIE en Barcelona, selecciona la provincia y comprueba las instrucciones del trámite policial. Esta página no muestra disponibilidad en tiempo real ni un horario verificado de publicación de citas.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Sede: preguntas frecuentes de cita previa", href: "https://sede.administracionespublicas.gob.es/ayuda/faq/extranjeria" },
      { label: "Sede: asistencia e incidencias técnicas", href: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/ayuda_cita_previa" },
      { label: "Policía: tarjeta inicial o renovación de residencia", href: "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_tarjeta_residencia_residenciaytrabajo.php/index.php" },
    ],
    cta: { href: SEDE_AAPP_URL, label: "Cita de extranjería (oficial)" },
    related: relatedExNicho,
    sections: [
      {
        id: "provincia",
        title: "Elige una oficina que tramite tu solicitud",
        paragraphs: [
          "Lee las condiciones de las oficinas que ofrece el portal para tu procedimiento. No se ha comprobado en esta guía que todas las comisarías de Barcelona atiendan cualquier solicitud de TIE ni que la recogida pueda hacerse en otra oficina. Si tienes dudas, confirma con la dependencia que figura en las instrucciones o en tu resguardo.",
        ],
      },
      {
        id: "errores",
        title: "Si no aparecen citas o falla la aplicación",
        paragraphs: [
          "La disponibilidad depende de cada oficina. Consulta más adelante si las citas están ocupadas. Para un error de funcionamiento, comunica el mensaje exacto mediante el formulario de incidencias de la sede. No confundas la falta de disponibilidad con una sanción por inasistencia o con un bloqueo de tu identidad.",
          "Cuando reserves, guarda el justificante y revisa la documentación específica antes de acudir. Si necesitas anular, accede con los mismos datos y el número de justificante. Entrar con certificado digital no debe presentarse como una garantía de conseguir más citas.",
        ],
      },
    ],
  },
  {
    id: "tie-caducada-viajar",
    pack: "extranjeria",
    path: "/extranjeria/tie-caducada-viajar",
    h1: "Viajar con la TIE caducada: los 3 escenarios",
    title: "Viajar con la TIE caducada o en renovación",
    description:
      "El resguardo de renovación no sustituye por sí solo a la autorización de regreso. Tres escenarios de viaje y qué confirmar antes de comprar el billete.",
    lead:
      "Con la TIE caducada o en trámite de renovación, el resguardo acredita el procedimiento pero no sustituye por sí solo al documento que permite volver a España. La autorización de regreso (EX-13, tasa de 10,72 euros según la orden vigente) puede ser necesaria si cumples sus requisitos. Antes de salir, confirma la ruta, tu nacionalidad, el visado que te exigirían y las instrucciones de la oficina.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "BOE: artículo 5 del Reglamento de extranjería", href: "https://www.boe.es/eli/es/rd/2024/11/19/1155/" },
      { label: "BOE: tasa de autorización de regreso", href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2025-12056" },
      { label: "Policía Nacional: trámites de extranjería", href: "https://www.policia.es/_es/extranjeria_extranjeros.php/1000" },
    ],
    cta: { href: SEDE_AAPP_URL, label: "Sede de administraciones públicas" },
    secondaryCta: { href: "/extranjeria/autorizacion-regreso", label: "Guía: autorización de regreso (EX-13)" },
    related: relatedExNicho,
    sections: [
      {
        id: "escenarios",
        title: "Los tres escenarios",
        paragraphs: ["Antes de reservar billete, identifica en cuál estás:"],
        lists: [
          [
            "Vuelo nacional (España): el resguardo de renovación más pasaporte válido suele bastar ante la aerolínea; no cruzas frontera.",
            "Espacio Schengen: no hay control fronterizo interior sistemático, pero pueden existir comprobaciones y la compañía puede pedir documentación. El resguardo no equivale a una TIE válida; confirma las condiciones con la compañía y la oficina.",
            "Fuera de Schengen: la reentrada depende de tu autorización, de la autorización de regreso cuando proceda, de tu pasaporte y de las reglas de visado aplicables. La autorización de regreso solo permite entrar por pasos fronterizos españoles habilitados.",
          ],
        ],
      },
      {
        id: "regreso",
        title: "La autorización de regreso, en dos ideas",
        paragraphs: [
          "Se solicita cuando la renovación o prórroga se ha iniciado dentro del plazo legal y se cumplen los requisitos, con el modelo EX-13 y la tasa del modelo 790 código 012 (10,72 euros según la orden vigente). El Reglamento prevé una vigencia máxima de 90 días en los supuestos aplicables y varias entradas y salidas durante su vigencia, con entrada por pasos fronterizos españoles habilitados. La oficina confirma la documentación y la fecha concretas.",
        ],
      },
      {
        id: "navidad",
        title: "Si es para Navidad",
        paragraphs: [
          "Para un viaje navideño, consulta con antelación la oficina que expide la autorización y deja margen para recibir instrucciones y el documento. No hay un calendario nacional verificado ni una medida de tolerancia que pueda darse por supuesta para 2026.",
        ],
      },
    ],
  },
  {
    id: "regreso-navidad",
    pack: "extranjeria",
    path: "/extranjeria/autorizacion-regreso-navidad",
    h1: "Autorización de regreso en Navidad: guía 2026-27",
    title: "Navidad con la TIE en trámite: autorización de regreso",
    description:
      "Planifica un viaje de Navidad con la TIE en renovación: documentos, autorización de regreso y comprobaciones oficiales. Sin fechas de cita inventadas ni rumores de prórrogas.",
    lead:
      "Si tu TIE está en trámite y piensas salir de España en Navidad, consulta con antelación la oficina que tramita la autorización de regreso. EX-13, tasa 790-012 (10,72 € según la orden vigente) y una vigencia máxima que puede llegar a 90 días en los supuestos previstos. No planifiques sobre rumores de tolerancia navideña.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "BOE: artículo 5 del Reglamento de extranjería", href: "https://www.boe.es/eli/es/rd/2024/11/19/1155/" },
      { label: "BOE: tasa de autorización de regreso", href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2025-12056" },
    ],
    cta: { href: SEDE_AAPP_URL, label: "Portal de extranjería (oficial)" },
    secondaryCta: { href: "/extranjeria/autorizacion-regreso", label: "Guía: cómo pedir la EX-13" },
    related: relatedExNicho,
    sections: [
      {
        id: "calendario",
        title: "El calendario que funciona",
        paragraphs: [
          "Antes de reservar: comprueba que tu renovación está presentada y conserva su justificante. Pregunta a la oficina cómo solicitar la autorización y qué documentos exige; deja tiempo para obtenerla antes de volar. Viaja solo con la autorización y el pasaporte que la oficina y la compañía consideren válidos para tu ruta.",
        ],
      },
      {
        id: "sin-rumores",
        title: "Sin rumores de amnistía navideña",
        paragraphs: [
          "En temporadas anteriores se dieron medidas excepcionales de reentrada. Fueron decisiones publicadas y fechadas, no una costumbre. Esta guía no anticipa ninguna: si se publica una medida oficial para estas fechas, se actualizará con la fuente. Hasta entonces, consulta la autorización de regreso y las condiciones de tu caso.",
        ],
      },
    ],
  },
  {
    id: "regularizacion-resolucion",
    pack: "extranjeria",
    path: "/extranjeria/regularizacion-2026-resolucion",
    h1: "Regularización 2026: cuánto tarda la resolución",
    title: "Regularización 2026: plazos tras la subsanación",
    description:
      "Subsanaste en Correos (o te quedaste fuera): qué viene ahora. Plazos de resolución, qué mirar en el expediente y qué NO está verificado. Sin invenciones.",
    lead:
      "Presentada la solicitud (abril-junio) y subsanada la documentación (hasta el 30 de septiembre en Correos), la resolución de la regularización extraordinaria llega por expediente. Esta guía separa lo verificado de lo que corre en blogs: ni plazos mágicos ni prórrogas inventadas.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Correos: fase de subsanación de la regularización", href: "https://www.correos.es/es/es/particulares/para-el-ciudadano/regularizacion-extraordinaria-personas-migrantes" },
      { label: "Ministerio de Inclusión: cierre de solicitudes", href: "https://www.inclusion.gob.es/ca/w/el-plazo-de-presentacion-de-solicitud-para-la-regularizacion-extraordinaria-concluye-con-1.174.978-solicitudes-recibidas" },
    ],
    cta: { href: CORREOS_REGULARIZACION_URL, label: "Correos: regularización (oficial)" },
    secondaryCta: { href: "/extranjeria/mercurio", label: "Consultar tu expediente" },
    related: relatedExNicho,
    sections: [
      {
        id: "verificado",
        title: "Lo verificado a fecha de esta guía",
        paragraphs: [
          `La fase de presentación cerró el 30 de junio de 2026 con 1.174.978 solicitudes, según el Ministerio. Correos mantiene la subsanación hasta el 30 de septiembre en ${CORREOS_OFICINAS_REGULARIZACION} para quienes presentaron en plazo y necesitan aportar documentación. La fuente primaria consultada no publica una fecha única de resolución para todos los expedientes; consulta el canal y el justificante de tu solicitud.`,
        ],
      },
      {
        id: "si-no-subsanaste",
        title: "Si no subsanaste a tiempo",
        paragraphs: [
          "Si no aportaste la documentación, no podemos afirmar desde esta guía cuál será la consecuencia en tu expediente. Revisa el requerimiento individual, el justificante y el estado oficial; si el plazo venció o recibes una resolución, consulta las vías y plazos de recurso que indique el propio acto administrativo.",
        ],
      },
      {
        id: "despues",
        title: "Cuando llegue la resolución favorable",
        paragraphs: [
          "Lo siguiente será cita para huellas y TIE en las oficinas habilitadas (otro atasco conocido: la guía de citas de extranjería te prepara). Si dependes de DNI o pasaporte de tu país, vigila su vigencia para la cita. Y el padrón: si te mudas o te dan de baja por no renovar a los 2 años, la guía del padrón te explica cómo no perder la trazabilidad.",
        ],
      },
    ],
  },
];
