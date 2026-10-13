import {
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
    "id": "tie-caducada-viajar",
    "pack": "extranjeria",
    "path": "/extranjeria/tie-caducada-viajar",
    "h1": "Viajar con la TIE caducada o en renovación",
    "title": "Viajar con la TIE caducada o en renovación",
    "description": "Distingue vuelo nacional, viaje Schengen y regreso desde otro país. Comprueba pasaporte, autorización y escalas antes de salir con la TIE caducada.",
    "lead": "Una TIE caducada y el resguardo de renovación no equivalen a una tarjeta vigente para cualquier viaje. Comprueba por separado la documentación de embarque, la entrada al destino y el retorno a España. La autorización de regreso tiene requisitos y límites propios.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.aena.es/es/pasajeros/documentacion-visados/documentacion-para-viajar.html",
        "label": "Aena: documentación para vuelos nacionales e internacionales"
      },
      {
        "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_autorizacionregreso.php",
        "label": "Policía: requisitos de la autorización de regreso"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a5",
        "label": "BOE: vigencia y frontera de entrada"
      }
    ],
    "cta": {
      "href": "https://www.aena.es/es/pasajeros/documentacion-visados/documentacion-para-viajar.html",
      "label": "Consultar la documentación de vuelo"
    },
    "related": [
      {
        "href": "/extranjeria/autorizacion-regreso",
        "label": "Cuándo procede la autorización de regreso"
      },
      {
        "href": "/extranjeria/autorizacion-regreso-ex13",
        "label": "Preparar el EX-13"
      },
      {
        "href": "/extranjeria/tie-recogida-cuanto-tarda",
        "label": "Consultar la recogida de la TIE"
      }
    ],
    "sections": [
      {
        "id": "nacional",
        "title": "Vuelo con origen y destino en España",
        "paragraphs": [
          "Para pasajeros de terceros países, Aena incluye entre los documentos admitidos el pasaporte o documento de viaje válido y vigente, el permiso de residencia español o Schengen vigente y el carné de conducir expedido en España. Consulta la documentación de tu caso con la aerolínea, que realiza la comprobación.",
          "El resguardo de renovación no figura en esa lista como sustituto de una TIE. No debe presentarse como un requisito que siempre deba acompañar al pasaporte ni como una garantía de embarque."
        ]
      },
      {
        "id": "schengen",
        "title": "Viaje a otro país Schengen",
        "paragraphs": [
          "Comprueba los requisitos de entrada y estancia del país al que viajas y los documentos que pide la compañía. La autorización de regreso española no garantiza la entrada por otro país Schengen: su validez para entrar se limita a pasos fronterizos españoles habilitados.",
          "Revisa también la vuelta si aterrizas primero en otro país y después continúas a España. No deduzcas que el último destino del billete convierte el primer control de entrada en una frontera española."
        ]
      },
      {
        "id": "exterior",
        "title": "Salida a un país fuera de Schengen",
        "paragraphs": [
          "Verifica el pasaporte o título de viaje, visados del destino y tránsito, y el documento que utilizarás para volver. Cuando tu autorización está en renovación o prórroga, comprueba si cumples el supuesto de regreso por solicitud presentada en plazo.",
          "La guía de autorización de regreso distingue además duplicados y primeras autorizaciones favorables excepcionales. No basta con tener cualquier expediente abierto ni con haber reservado las huellas."
        ]
      },
      {
        "id": "antes",
        "title": "Antes de cerrar el itinerario",
        "paragraphs": [
          "Comprueba las fechas concedidas de la autorización de regreso y cada escala con la oficina y las autoridades competentes del destino o tránsito. La información de embarque de la aerolínea no sustituye los requisitos migratorios."
        ]
      }
    ],
    "secondaryCta": {
      "href": "/extranjeria/autorizacion-regreso",
      "label": "Comprobar los requisitos de regreso"
    }
  },
  {
    "id": "regreso-navidad",
    "pack": "extranjeria",
    "path": "/extranjeria/autorizacion-regreso-navidad",
    "h1": "Viaje de Navidad con TIE en trámite: preparar el regreso",
    "title": "Viaje de Navidad con TIE en trámite: preparar el regreso",
    "description": "Planifica las fechas de salida y vuelta, la vigencia de la autorización de regreso y las escalas. Consulta los requisitos oficiales antes de viajar en Navidad.",
    "lead": "Para un viaje de Navidad con la TIE en trámite, revisa primero si puedes solicitar autorización de regreso y después encaja salida, vuelta y escalas en su vigencia. El artículo 5 no establece una excepción automática por viajar durante las fiestas.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a5",
        "label": "BOE: requisitos y cómputo de la vigencia"
      },
      {
        "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_autorizacionregreso.php",
        "label": "Policía: solicitud de autorización de regreso"
      }
    ],
    "cta": {
      "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_autorizacionregreso.php",
      "label": "Consultar el trámite oficial de regreso"
    },
    "related": [
      {
        "href": "/extranjeria/autorizacion-regreso",
        "label": "Requisitos de regreso"
      },
      {
        "href": "/extranjeria/autorizacion-regreso-ex13",
        "label": "Documentos y tasa del EX-13"
      },
      {
        "href": "/extranjeria/tie-caducada-viajar",
        "label": "Revisar el itinerario y las escalas"
      }
    ],
    "sections": [
      {
        "id": "preparar",
        "title": "Orden de las comprobaciones",
        "paragraphs": [
          "Usa esta secuencia para preparar el viaje; no es un calendario de citas ni una predicción de cuánto tardará la oficina."
        ],
        "lists": [
          [
            "Identifica el supuesto: renovación o prórroga presentada en plazo, duplicado solicitado de TIE en vigor o primera autorización favorable con necesidad y razones excepcionales.",
            "Consulta la oficina competente y reúne el EX-13 y las pruebas de tu supuesto. Tener billete no acredita por sí solo que se concederá la autorización.",
            "Comprueba las fechas del documento que te expidan y la fecha real de regreso a España, aunque caiga en enero.",
            "Revisa por qué país entrarás y cada escala. La autorización de regreso solo es válida para entrar por pasos fronterizos españoles habilitados."
          ]
        ]
      },
      {
        "id": "fechas",
        "title": "Desde cuándo se cuentan los 90 días",
        "paragraphs": [
          "En renovación o prórroga, si se solicita antes de caducar la autorización, el máximo se cuenta desde esa caducidad; si se solicita después, desde la concesión del regreso. Para la primera autorización favorable excepcional, se cuenta desde la concesión del regreso. Comprueba siempre el periodo efectivamente autorizado.",
          "Solicitarla antes no significa que cubra cualquier vuelta posterior. Si cambias el viaje, vuelve a contrastar las fechas y el itinerario."
        ]
      },
      {
        "id": "instrucciones",
        "title": "Comprueba las instrucciones aplicables al viaje",
        "paragraphs": [
          "No se acredita en esta guía una medida especial para Navidad de 2026. Si recibes información sobre una excepción, comprueba la publicación oficial, su vigencia y a quién se aplica antes de basar el viaje en ella. El artículo 5 y la ficha de Policía son las referencias utilizadas aquí."
        ]
      }
    ]
  },
  {
    "id": "regularizacion-resolucion",
    "pack": "extranjeria",
    "path": "/extranjeria/regularizacion-2026-resolucion",
    "h1": "Regularización 2026: plazo de resolución y silencio administrativo",
    "title": "Regularización 2026: tres meses, suspensiones y resolución",
    "description": "Plazo individual de resolución, posibles suspensiones, silencio negativo y vigencia de la habilitación provisional. Qué revisar antes de pedir la TIE.",
    "lead": "Las dos vías extraordinarias reguladas en las disposiciones adicionales 20 y 21 tienen un plazo máximo de tres meses para resolver y notificar, con posibles suspensiones legales. No es una fecha común para todos ni una garantía de recibir respuesta en ese tiempo. El silencio negativo tampoco extingue por sí solo la habilitación provisional ya reconocida.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/expedientes_extranjeria",
      "label": "Consultar el estado oficial del expediente"
    },
    "secondaryCta": {
      "href": "https://www.correos.es/es/es/particulares/para-el-ciudadano/regularizacion-extraordinaria-personas-migrantes",
      "label": "Oficinas para aportar documentación"
    },
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#da-20",
        "label": "BOE: vía para solicitantes de protección internacional"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#da-21",
        "label": "BOE: arraigo extraordinario"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a22",
        "label": "BOE: suspensión del plazo de resolución"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a24",
        "label": "BOE: efectos del silencio administrativo"
      },
      {
        "href": "https://www.inclusion.gob.es/documents/d/migraciones/report_20260722-criterio-interpretativo-rd-316-2026-def",
        "label": "Migraciones: criterio sobre habilitación provisional, julio de 2026"
      },
      {
        "href": "https://www.correos.es/es/es/particulares/para-el-ciudadano/regularizacion-extraordinaria-personas-migrantes",
        "label": "Correos: aportación de documentación"
      }
    ],
    "related": [
      {
        "href": "/extranjeria/subsanar-regularizacion-correos",
        "label": "Aportar documentación en Correos"
      },
      {
        "href": "/extranjeria/mercurio",
        "label": "Consultar, presentar y recibir notificaciones"
      },
      {
        "href": "/extranjeria/cita-huellas-tie",
        "label": "Preparar la cita de huellas TIE"
      }
    ],
    "disclaimer": "No somos Administración Pública ni presentamos tu expediente. Esta información no sustituye el requerimiento, la resolución o el asesoramiento sobre tu caso.",
    "sections": [
      {
        "id": "plazo",
        "title": "Desde cuándo se cuentan los tres meses",
        "paragraphs": [
          "Las disposiciones adicionales 20.3 y 21.4 del Reglamento fijan tres meses para resolver y notificar, contados desde el día siguiente a la entrada de la solicitud en el registro del órgano competente para tramitarla. Comprueba esa fecha en la documentación del expediente.",
          "El plazo puede suspenderse en los supuestos del artículo 22 de la Ley 39/2015. Un requerimiento puede afectar al cómputo durante el intervalo legal correspondiente: revisa las comunicaciones y las fechas de cumplimiento. Aportar documentos no inicia automáticamente otros tres meses desde cero.",
          "El cierre de solicitudes el 30 de junio y el servicio de Correos hasta el 30 de septiembre son fechas distintas del vencimiento individual para resolver. No uses esos días como calendario de respuesta de todos los expedientes."
        ]
      },
      {
        "id": "silencio",
        "title": "Silencio negativo y trabajo provisional",
        "paragraphs": [
          "Agotado el plazo máximo aplicable sin notificación, la norma prevé silencio administrativo desestimatorio. Permite recurrir la falta de resolución; no equivale a una resolución denegatoria expresa ni libera a la Administración de resolver.",
          "El criterio de Migraciones firmado el 22 de julio de 2026 distingue dos situaciones. Si recibiste la comunicación de inicio que reconoce la habilitación provisional para residir y trabajar, esta se mantiene hasta la notificación de la resolución expresa; el mero silencio no la extingue. Si aún no la recibiste, no deduzcas esa habilitación del solo justificante de presentación o de la espera.",
          "Conserva la comunicación de inicio y comprueba las notificaciones. Ante una denegación expresa, sigue sus efectos y vías de recurso. Si necesitas actuar por silencio, revisa el cómputo y la vía procedente con el órgano competente o asistencia jurídica; esta guía no calcula el vencimiento de tu expediente."
        ]
      },
      {
        "id": "subsanar",
        "title": "Un requerimiento tiene su propio plazo",
        "paragraphs": [
          "El requerimiento por solicitud incompleta fija un plazo que no puede superar quince días y advierte de desistimiento y archivo si no se atiende. Sigue la fecha y el canal indicados y conserva el resguardo. La disponibilidad del servicio de Correos hasta el 30 de septiembre no amplía ese plazo.",
          "La consulta de estado es informativa: abre y lee la notificación oficial. Si hay incidencias o una documentación que no puedes obtener, no esperes a una fecha general publicada en una guía para pedir orientación sobre tu caso."
        ]
      },
      {
        "id": "favorable",
        "title": "Tras la concesión: tarjeta de identidad de extranjero",
        "paragraphs": [
          "Ambas disposiciones prevén solicitar la TIE durante el mes inmediatamente posterior a la concesión. Sigue la resolución y las instrucciones policiales para la cita y la documentación. No atribuyas a la falta de cita una ampliación automática del plazo.",
          "En la vía de la disposición adicional 20, tras la resolución favorable debe desistirse de la solicitud de protección internacional o del recurso pendiente y acreditarse ese desistimiento al solicitar la TIE. No hagas ese desistimiento anticipadamente por el solo hecho de haber pedido la regularización. La vía de la disposición adicional 21 no lleva ese mismo requisito de asilo.",
          "La autorización produce derechos desde su concesión; la expedición física de la TIE es una actuación posterior. Revisa la vigencia y condiciones que constan en tu resolución."
        ]
      }
    ]
  },

];
