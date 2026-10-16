import {
  CITA_DNI_HOST,
  CITA_DNI_URL,
  SEDE_AAPP_URL,
  TASA_DNI_LABEL,
  TASA_PASAPORTE_LABEL,
  DOCUMENT_PAYMENT_NOTE,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedDniNichos2 = [
  { href: "/dni/cita-previa", label: "Cita previa del DNI, la oficial" },
  { href: "/dni/no-hay-citas", label: "No hay citas para el DNI" },
  { href: "/dni/paginas-clon-cita", label: "Páginas clon de la cita" },
];

const relatedExNichos2 = [
  { href: "/extranjeria/cita-huellas-tie", label: "Cita de huellas y TIE" },
  { href: "/extranjeria/nie", label: "NIE" },
];

export const IDENTIDAD_NICHOS2_GUIDES: Guide[] = [
  {
    id: "consultarCitaDni",
    pack: "viaje",
    path: "/dni/consultar-cita",
    h1: "Consultar o anular tu cita del DNI",
    title: "Consultar, cambiar o anular la cita del DNI",
    description:
      "Consulta o anula tu cita de DNI y pasaporte en el portal oficial. Comprueba personas incluidas, confirmación y opciones de acceso antes de cancelar.",
    lead: `Consulta o anula tu cita de DNI y pasaporte en ${CITA_DNI_HOST}, utilizando los datos con los que la reservaste. Conserva el justificante y sigue las opciones que muestre el portal. La gestión de cita y el pago de la tasa del documento son operaciones distintas.`,
    reviewedAt: "2026-09-16",
    sources: [
      { label: "Policía: opciones públicas de acceso a cita DNI y pasaporte", href: "https://www.citapreviadnie.es/citaPreviaDni/Inicio.action" },
      { label: "Policía: manual público, consulta y anulación (apartado 2.7)", href: "https://www.citapreviadnie.es/citaPreviaDni/doc/43CITAPREVIAnivelinternet.pdf" },
      { label: "Interior: cita previa del DNI y pasaporte", href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/" },
      { label: "BOE: pago telemático de las tasas de DNI y pasaporte", href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2017-1206" },
    ],
    cta: { href: CITA_DNI_URL, label: `Gestionar tu cita en ${CITA_DNI_HOST}` },
    related: [
      { href: "/dni/viajar-reino-unido", label: "Viajar a Reino Unido con DNI" },
      ...relatedDniNichos2,
    ],
    sections: [
      {
        id: "gestion",
        title: "Dónde se consulta (y qué hace falta)",
        paragraphs: [
          `La entrada de citapreviadnie.es ofrece acceso con datos de DNI/NIE y, como alternativa, con DNI electrónico. Para la primera opción no necesitas utilizar el certificado del DNIe. Accede con el documento usado para la reserva y sigue los campos y avisos actuales; después utiliza la opción de consulta de citas.`,
          "Comprueba el documento o documentos incluidos en tu reserva, la oficina, la fecha y la hora. Si reservaste para varias personas, revisa también quiénes están incluidos. Guarda los justificantes que facilite el sistema.",
        ],
      },
      {
        id: "anular",
        title: "Antes de confirmar la anulación",
        paragraphs: [
          "Selecciona la cita que quieras cancelar, revisa sus datos y confirma la anulación solo cuando estés seguro. El manual público del DNI describe la selección y confirmación; no traslades automáticamente a este portal los campos de justificante exigidos por la cita de extranjería. Sigue las instrucciones que muestre tu sesión.",
          "El manual advierte de que, al anular una cita múltiple con acompañantes, también se anulan sus citas. Comprueba quiénes están incluidos y conserva la confirmación. Antes de cambiar de fecha, revisa las opciones y disponibilidad del portal; esta guía no garantiza un hueco alternativo.",
        ],
      },
      {
        id: "pdf",
        title: "Consultar los datos y conservar el justificante",
        paragraphs: [
          "El manual muestra una opción para imprimir en PDF al confirmar la reserva y una pantalla de consulta con oficina, fecha, hora y número de cita. Sus imágenes corresponden a una versión anterior: comprueba las opciones actuales para guardar o imprimir y no presupongas que siempre se puede recuperar el mismo PDF desde cualquier pantalla. Revisa también las confirmaciones que conserves.",
          "El justificante identifica la reserva y no sustituye a tu documento de identidad ni a la documentación de expedición. Comprueba los requisitos de tu caso antes de acudir y conserva, si procede, el justificante del pago telemático.",
        ],
      },
      {
        id: "sinDatos",
        title: "Si perdiste todos los datos de la reserva",
        paragraphs: [
          "La página de entrada incluye una opción para quien no dispone de los datos por pérdida o sustracción del DNI. Sigue ese enlace si corresponde a tu caso; no garantiza por sí solo recuperar una reserva concreta. Si no consigues localizarla, consulta la ayuda oficial o el 060, cuya llamada tiene coste. No uses datos de identidad inventados ni documentos de otra persona.",
          `La tasa general del DNI es ${TASA_DNI_LABEL} y la del pasaporte ${TASA_PASAPORTE_LABEL}, salvo exención. ${DOCUMENT_PAYMENT_NOTE} Consulta la guía de tasas para distinguir el pago oficial de los cobros de intermediarios.`,
        ],
      },
    ],
  },
  {
    id: "dniReinoUnido",
    pack: "viaje",
    path: "/dni/viajar-reino-unido",
    h1: "Viajar a Reino Unido con DNI: cuándo no basta",
    title: "Viajar a Reino Unido con DNI: pasaporte, ETA y excepciones",
    description:
      "Para una visita desde España: qué documento de viaje y permiso necesitas, y cuándo el Reino Unido admite un documento nacional de identidad según tu situación.",
    lead:
      "Para una visita ordinaria de una persona española sin estatus migratorio británico, el DNI por sí solo no basta: lleva un pasaporte válido y comprueba si necesitas ETA o visado según el motivo del viaje. El Gobierno británico contempla excepciones para algunas personas con permiso de residencia o con el EU Settlement Scheme.",
    reviewedAt: "2026-09-16",
    sources: [
      { label: "GOV.UK: documentos para entrar en Reino Unido", href: "https://www.gov.uk/uk-border-control/before-you-leave-for-the-uk" },
      { label: "GOV.UK: cuándo no se necesita ETA", href: "https://www.gov.uk/eta/when-not-need-eta" },
      { label: "GOV.UK: solicitar y comprobar la ETA", href: "https://www.gov.uk/eta/apply" },
      { label: "Interior: tasa y exención del pasaporte", href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/index.html" },
      { label: "Interior: tasa y exenciones del DNI", href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/" },
      { label: "GOV.UK: qué permite una ETA", href: "https://www.gov.uk/eta/what-you-can-cannot-do" },
    ],
    cta: { href: CITA_DNI_URL, label: `Renovar el pasaporte en ${CITA_DNI_HOST}` },
    secondaryCta: { href: "https://www.gov.uk/eta/apply", label: "Solicitar o comprobar la ETA (GOV.UK)" },
    related: [
      { href: "/dni/consultar-cita", label: "Consultar o anular tu cita del DNI" },
      { href: "/pasaporte/renovar-antes-caducar", label: "Con cuánta antelación renovar el pasaporte" },
      { href: "/pasaporte/urgente", label: "Pasaporte urgente" },
      { href: "/dni/caducado-viajar-ue", label: "Viajar con DNI caducado" },
    ],
    sections: [
      {
        id: "brexit",
        title: "Para una visita ordinaria, el pasaporte es la regla",
        paragraphs: [
          "Para la visita ordinaria de una persona española, el Gobierno británico indica que se necesita un pasaporte válido para toda la estancia. Una tarjeta nacional de identidad puede admitirse en supuestos concretos, como ciertos titulares de settled o pre-settled status, un permiso familiar del EU Settlement Scheme o un Frontier Worker permit. Comprueba que tu caso aparece en la lista oficial antes de viajar.",
          "Si tienes settled o pre-settled status, comprueba que el pasaporte o DNI con el que viajarás está vinculado a tu cuenta UKVI. GOV.UK también pide esta vinculación en otros supuestos que enumera, como solicitudes válidas del EU Settlement Scheme pendientes de decisión.",
          "La compañía puede comprobar la documentación antes del embarque y la decisión de entrada corresponde a las autoridades británicas. Mira la fecha de caducidad del pasaporte y las condiciones de la ruta antes de comprar el billete.",
        ],
      },
      {
        id: "eta",
        title: "La ETA: el permiso electrónico que se pide antes de volar",
        paragraphs: [
          "La ETA no se exige a todas las personas: depende de la nacionalidad, del motivo del viaje y de si ya tienes permiso para entrar o residir. Para una visita que sí la requiera, se solicita en línea y debe estar concedida antes de viajar. Comprueba el importe y las excepciones en GOV.UK.",
          "La ETA queda vinculada al pasaporte usado en la solicitud. Si renuevas ese pasaporte, comprueba la autorización correspondiente al documento nuevo antes de viajar. Espera el correo que confirma la concesión; enviar la solicitud no equivale a tenerla aprobada.",
          "Una ETA permite viajar, pero no garantiza la entrada. Si tu viaje tiene otro propósito, necesitas comprobar si corresponde un visado distinto.",
        ],
      },
      {
        id: "pasaporte",
        title: "El plan del pasaporte, a tiempo",
        paragraphs: [
          `Si necesitas renovar el pasaporte, consulta la disponibilidad en citapreviadnie.es. La tasa ordinaria es ${TASA_PASAPORTE_LABEL}; la del DNI es ${TASA_DNI_LABEL}, salvo exención. ${DOCUMENT_PAYMENT_NOTE}`,
          "Puedes renovar en cualquier oficina de expedición del territorio nacional, no solo en tu provincia: ampliar municipios puede ayudarte a encontrar una fecha anterior. Si el viaje ya está encima, la guía del pasaporte urgente explica qué documentación presentar y cómo consultar la atención excepcional de cada unidad; un billete por sí solo no garantiza prioridad.",
        ],
      },
      {
        id: "errores",
        title: "Tres comprobaciones antes de reservar",
        paragraphs: [
          "Antes de reservar el viaje, revisa estos tres puntos:",
        ],
        lists: [
          [
            "Comprueba el pasaporte y la vigencia exigida para tu viaje antes de reservar.",
            "Si quieres viajar con DNI, comprueba que tu caso encaja en una excepción británica.",
            "Comprueba si tu estatus, nacionalidad y motivo del viaje requieren ETA, permiten una exención o exigen visado.",
          ],
        ],
      },
      {
        id: "cierre",
        title: "Documentación y permiso antes de salir",
        paragraphs: [
          `Para una visita ordinaria desde España, comprueba pasaporte válido y el permiso británico que corresponda (ETA o visado). Una ETA no garantiza la entrada y el DNI solo puede usarse en excepciones concretas. Renovar el pasaporte cuesta ${TASA_PASAPORTE_LABEL} y la cita es gratuita en citapreviadnie.es; el DNI (con su tasa de ${TASA_DNI_LABEL} cuando toque renovarlo) sigue sirviendo para identificarte en España.`,
        ],
      },
    ],
  },
  {
    "id": "nieVerde",
    "pack": "extranjeria",
    "path": "/extranjeria/nie-verde",
    "h1": "NIE verde, TIE y certificado digital: qué acredita cada uno",
    "title": "NIE verde, TIE y certificado digital: qué acredita cada uno",
    "description": "El NIE es un número; el certificado de registro UE acredita inscripción, la TIE documenta la situación administrativa y el certificado digital sirve en internet.",
    "lead": "El llamado «NIE verde» es el certificado de registro de ciudadano de la Unión. El NIE es el número que figura en él y puede haber sido asignado antes. La TIE y el certificado digital tienen funciones diferentes.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_certificadoregistro_ciudadanoue.php",
        "label": "Policía: certificado de registro UE"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/ciudadanos-de-la-union-europea/numero-de-Identidad-de-extranjero-nie/",
        "label": "Interior: asignación de NIE"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-3442#a13",
        "label": "BOE: artículo 13, acreditación de identidad de extranjeros"
      },
      {
        "href": "https://www.sede.fnmt.gob.es/certificados/persona-fisica",
        "label": "FNMT: certificado electrónico de ciudadano"
      }
    ],
    "cta": {
      "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_certificadoregistro_ciudadanoue.php",
      "label": "Consultar el certificado de registro UE"
    },
    "related": [
      {
        "href": "/extranjeria/certificado-registro-ue",
        "label": "Solicitud del registro UE"
      },
      {
        "href": "/extranjeria/nie",
        "label": "Asignación de NIE"
      },
      {
        "href": "/extranjeria/nie-vs-nif",
        "label": "NIE y NIF"
      },
      {
        "href": "/extranjeria/certificado-digital-nie",
        "label": "Solicitar certificado digital con NIE"
      }
    ],
    "sections": [
      {
        "id": "numero",
        "title": "El NIE puede existir antes del registro",
        "paragraphs": [
          "Interior contempla asignarlo por intereses económicos, profesionales o sociales. Si ya tienes NIE al solicitar el registro UE, no nace un número nuevo por esa inscripción. Conserva el identificador que te corresponde."
        ]
      },
      {
        "id": "registro",
        "title": "El certificado de registro UE",
        "paragraphs": [
          "Acredita la inscripción de ciudadanos UE, EEE o Suiza para residencias superiores a tres meses. El certificado no acredita la identidad por sí solo: para identificarte, conserva el pasaporte o documento de identidad del país de origen. El artículo 13 de la Ley Orgánica 4/2015 distingue esa documentación de la que acredita la situación regular en España.",
          "No deduzcas sus efectos del color o de que sea una hoja de determinado tamaño. Comprueba tus datos y el procedimiento que necesitas: inscripción, cambios o reconocimiento de residencia permanente."
        ]
      },
      {
        "id": "tarjeta",
        "title": "La tarjeta de residencia de familiar",
        "paragraphs": [
          "Para familiares que carecen de nacionalidad UE/EEE, el régimen comunitario contempla una tarjeta cuando se cumplen sus condiciones. No se obtiene por ser familiar sin comprobar el ámbito aplicable. Consulta el tipo de autorización y su vigencia; el certificado de registro del ciudadano UE no sustituye la tarjeta de su familiar."
        ]
      },
      {
        "id": "digital",
        "title": "El certificado electrónico de la FNMT",
        "paragraphs": [
          "Es una credencial para identificarte y firmar electrónicamente en servicios compatibles. Su solicitud no concede residencia ni reemplaza los documentos exigidos para una gestión presencial. La guía enlazada explica la modalidad software con acreditación presencial para personas con NIE."
        ]
      }
    ]
  },
  {
    "id": "nieVsNif",
    "pack": "extranjeria",
    "path": "/extranjeria/nie-vs-nif",
    "h1": "NIE y NIF: qué número usar y cuándo pedir el NIF M",
    "title": "NIE y NIF: qué número usar y cuándo pedir el NIF M",
    "description": "Para una persona extranjera, el NIF es generalmente su NIE. Qué ocurre sin NIE, cuándo existe el NIF M y cómo distinguir el número del alta censal.",
    "lead": "El NIE identifica administrativamente a la persona extranjera. El NIF es su identificador fiscal: para una persona extranjera con NIE, ambos números coinciden con carácter general. Para una persona española con DNI, el NIF corresponde a ese DNI, no a un NIE.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/solicitar-nif/nif-persona-fisica.html",
        "label": "Agencia Tributaria: NIF de persona física"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/solicitar-nif/nif-fisica.html",
        "label": "Agencia Tributaria: NIF M y comunicación del NIE"
      },
      {
        "href": "https://sede.agenciatributaria.gob.es/Sede/procedimientoini/GZ38.shtml",
        "label": "Agencia Tributaria: asignación de NIF y alta censal"
      }
    ],
    "cta": {
      "href": "https://sede.agenciatributaria.gob.es/Sede/censos-nif-domicilio-fiscal/solicitar-nif/nif-persona-fisica.html",
      "label": "Consultar mi caso en la Agencia Tributaria"
    },
    "related": [
      {
        "href": "/extranjeria/nie",
        "label": "Solicitar NIE"
      },
      {
        "href": "/extranjeria/nie-verde",
        "label": "Número y documentos de extranjería"
      },
      {
        "href": "/extranjeria/certificado-digital-nie",
        "label": "Certificado digital con NIE"
      }
    ],
    "sections": [
      {
        "id": "numero",
        "title": "Si ya tienes NIE",
        "paragraphs": [
          "Cuando el formulario tributario de una persona extranjera pida su NIF, usa el NIE completo que le corresponde. Un número fiscal no acredita por sí solo la identidad, la residencia o el cumplimiento de los requisitos de otra operación."
        ]
      },
      {
        "id": "sinNie",
        "title": "Si todavía no tienes NIE",
        "paragraphs": [
          "Si necesitas identificación tributaria y no tienes NIE, la AEAT contempla el NIF con letra inicial M. Puede ser transitorio mientras obtienes el NIE al que estás obligado, o definitivo si no estás obligado a disponer de él. No es una vía reservada exclusivamente a no residentes."
        ]
      },
      {
        "id": "cambio",
        "title": "Si tenías NIF M y después obtienes NIE",
        "paragraphs": [
          "Comunica el cambio a la Agencia Tributaria y a las personas o entidades ante las que deba constar el nuevo NIF. La AEAT indica dos meses para comunicarlo; no mantengas ambos números como si fueran intercambiables."
        ]
      },
      {
        "id": "censo",
        "title": "Número asignado y alta censal",
        "paragraphs": [
          "La AEAT ofrece gestiones distintas para asignar NIF y para dar de alta en el censo a personas con DNI o NIE. Si una gestión no reconoce tus datos, comprueba la situación censal y el procedimiento correspondiente a tu actividad. Tener NIE no demuestra por sí solo que todas tus obligaciones censales estén cumplidas."
        ]
      }
    ]
  },
  {
    "id": "huellasQueLlevar",
    "pack": "extranjeria",
    "path": "/extranjeria/huellas-que-llevar",
    "h1": "Huellas de la TIE: documentos según tu solicitud",
    "title": "Huellas de la TIE: documentos según tu solicitud",
    "description": "Documentación para expedir TIE: EX-17, tasa 790-012, identificación, foto y requisitos de primera tarjeta, renovación o duplicado.",
    "lead": "Prepara los documentos según sea primera tarjeta, renovación o duplicado. Para expedir la TIE debe existir la autorización o el derecho correspondiente: el resguardo de una renovación todavía pendiente no equivale a una resolución favorable.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/regimen-general/tarjeta-de-identidad-de-extranjero/",
        "label": "Interior: documentación por supuesto de TIE"
      },
      {
        "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_tarjeta_residencia_residenciaytrabajo.php",
        "label": "Policía: EX-17 y tasa 790-012"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a2-21",
        "label": "BOE: artículo 209"
      }
    ],
    "cta": {
      "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/regimen-general/tarjeta-de-identidad-de-extranjero/",
      "label": "Consultar la lista oficial de documentos"
    },
    "related": [
      {
        "href": "/extranjeria/cita-huellas-tie",
        "label": "Pedir cita para huellas"
      },
      {
        "href": "/extranjeria/tie-recogida-cuanto-tarda",
        "label": "Recoger la TIE"
      },
      {
        "href": "/extranjeria/mercurio",
        "label": "Consultar la autorización"
      }
    ],
    "sections": [
      {
        "id": "base",
        "title": "Documentos de base",
        "paragraphs": [
          "Revisa la lista oficial del supuesto elegido y las instrucciones de la cita."
        ],
        "lists": [
          [
            "EX-17 cumplimentado y firmado, y justificante de la tasa 790 código 012 correspondiente.",
            "Documento de identificación original y vigente admitido para tu caso; fotografía reciente en color, tamaño carné y fondo blanco.",
            "Primera tarjeta: revisa los requisitos de entrada, visado, concesión y alta en Seguridad Social que correspondan.",
            "Renovación: si has cambiado de domicilio, volante o certificado de empadronamiento emitido hace menos de tres meses.",
            "Duplicado: denuncia de robo o pérdida, o tarjeta inutilizada; si cambió el domicilio, la acreditación padronal indicada."
          ]
        ]
      },
      {
        "id": "tasa",
        "title": "Formulario y justificante de pago",
        "paragraphs": [
          "La ficha de Policía enlaza el EX-17 y el impreso 790-012 e identifica las entidades donde abonar la tasa. Generar o descargar el impreso no acredita el pago: conserva su justificante y selecciona el concepto de tu tarjeta."
        ]
      },
      {
        "id": "presencia",
        "title": "Originales y comparecencia",
        "paragraphs": [
          "Interior exige presentar originales para su comprobación. Los menores deben acudir con el acompañamiento y la representación acreditada que detalla la ficha. Consulta cualquier duda documental con la dependencia antes de la cita.",
          "Guarda el resguardo y las instrucciones de recogida que recibas. No describimos prácticas particulares de comisarías sin una instrucción oficial identificada."
        ]
      }
    ],
    "secondaryCta": {
      "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus",
      "label": "Acceder a la cita de extranjería"
    }
  },
  {
    "id": "tieRecogidaPlazos",
    "pack": "extranjeria",
    "path": "/extranjeria/tie-recogida-cuanto-tarda",
    "h1": "TIE después de las huellas: consulta y recogida",
    "title": "TIE después de las huellas: consulta y recogida",
    "description": "Cómo consultar la recogida de la TIE, seguir las instrucciones de tu oficina y distinguir el resguardo de la tarjeta y de un documento de viaje.",
    "lead": "Consulta la recogida en la dependencia que tramita tu TIE y sigue las instrucciones del resguardo. Las fuentes generales revisadas no permiten prometer un mismo número de días de fabricación para todas las oficinas.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a2-21",
        "label": "BOE: artículo 209, expedición y entrega de TIE"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/regimen-general/tarjeta-de-identidad-de-extranjero/",
        "label": "Interior: competencia y entrega de la TIE"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a5",
        "label": "BOE: artículo 5, autorización de regreso"
      }
    ],
    "cta": {
      "href": "https://sede.policia.gob.es/portalCiudadano/_es/dependencias_localizador_accesible.php",
      "label": "Localizar la dependencia de Policía"
    },
    "related": [
      {
        "href": "/extranjeria/huellas-que-llevar",
        "label": "Documentos para huellas"
      },
      {
        "href": "/extranjeria/cita-huellas-tie",
        "label": "Cita de expedición"
      },
      {
        "href": "/extranjeria/autorizacion-regreso",
        "label": "Condiciones de la autorización de regreso"
      }
    ],
    "sections": [
      {
        "id": "plazos",
        "title": "Qué fecha debes comprobar",
        "paragraphs": [
          "El plazo del artículo 209 para solicitar la TIE no es un plazo de fabricación desde las huellas. Conserva la fecha o instrucción de consulta que te dé la oficina. Si no te indicaron cómo comprobar que está lista, contacta con esa dependencia antes de desplazarte."
        ]
      },
      {
        "id": "recogida",
        "title": "Cita e identificación al recogerla",
        "paragraphs": [
          "Sigue el sistema de entrega indicado por tu oficina. Si requiere cita, utiliza el procedimiento de recogida que señale, conservando la confirmación. No confundas esa reserva con una nueva cita de huellas.",
          "El artículo 209 atribuye al titular las actuaciones para la entrega y exige acreditar que es el destinatario. Prepara tu identificación y el resguardo conforme a las instrucciones recibidas. No des por hecho que una autorización escrita permite que cualquier persona recoja la TIE por ti; consulta las condiciones aplicables si se trata de un menor o de otra situación específica."
        ]
      },
      {
        "id": "resguardo",
        "title": "Conserva las instrucciones del resguardo",
        "paragraphs": [
          "El resguardo documenta la gestión realizada. Su fecha no debe interpretarse como una caducidad universal de la autorización de residencia: comprueba qué acto o plazo describe. Si no puedes seguir una instrucción de recogida, consulta a la dependencia."
        ]
      },
      {
        "id": "viaje",
        "title": "Si necesitas salir de España",
        "paragraphs": [
          "El resguardo de huellas no sustituye un documento de viaje. Comprueba si procede autorización de regreso: hay requisitos distintos para renovación, duplicado o primera autorización concedida. La guía enlazada explica esos supuestos; disponer de huellas tomadas no concede automáticamente autorización para regresar."
        ]
      }
    ]
  },
  {
    "id": "autorizacionRegresoEx13",
    "pack": "extranjeria",
    "path": "/extranjeria/autorizacion-regreso-ex13",
    "h1": "Autorización de regreso EX-13: documentos y tasa",
    "title": "Autorización de regreso EX-13: documentos y tasa",
    "description": "Prepara el EX-13, original y copia, la tasa 790-012 y las pruebas de tu supuesto: renovación, duplicado o autorización inicial favorable excepcional.",
    "lead": "Para solicitar autorización de regreso, prepara el EX-13 y los documentos de tu supuesto. Puede proceder por renovación o prórroga iniciada en plazo, por duplicado de una TIE en vigor o, excepcionalmente, tras una autorización inicial favorable. Tener un expediente pendiente no basta para todos los casos.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_autorizacionregreso.php",
        "label": "Policía: autorización de regreso y EX-13"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/regimen-general/salidas-voluntarias-y-prohibiciones-de-salida",
        "label": "Interior: documentos según el supuesto"
      },
      {
        "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tasas.php",
        "label": "Policía: importe de la tasa de regreso"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a5",
        "label": "BOE: artículo 5, requisitos y vigencia"
      }
    ],
    "cta": {
      "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_autorizacionregreso.php",
      "label": "Consultar el EX-13 y el trámite oficial"
    },
    "related": [
      {
        "href": "/extranjeria/autorizacion-regreso",
        "label": "Comprobar si procede autorización de regreso"
      },
      {
        "href": "/extranjeria/tie-caducada-viajar",
        "label": "Documentos según el viaje"
      },
      {
        "href": "/extranjeria/autorizacion-regreso-navidad",
        "label": "Planificar la salida y la vuelta"
      }
    ],
    "sections": [
      {
        "id": "base",
        "title": "Formulario y documentos comunes",
        "paragraphs": [
          "Interior pide el EX-13 cumplimentado y firmado, en original y copia. Los originales de los demás documentos se presentan para cotejar las copias. Prepara el pasaporte completo, cédula de inscripción o título de viaje vigente que corresponda."
        ]
      },
      {
        "id": "supuesto",
        "title": "Añade la documentación de tu caso",
        "paragraphs": [
          "La lista oficial distingue estos supuestos; revisa las opciones de comprobación por la Administración cuando estén previstas."
        ],
        "lists": [
          [
            "Renovación o prórroga: autorización y solicitud de renovación. Debe haberse iniciado dentro del plazo legal; Interior contempla que la Administración compruebe esos datos con tu consentimiento.",
            "Duplicado de TIE en vigor: comprobante de haberlo solicitado y acreditación de haber comunicado a las fuerzas de seguridad el robo o extravío, si ese es el motivo.",
            "Primera autorización favorable, con tarjeta en expedición: resolución favorable, salvo comprobación consentida, y pruebas de necesidad del viaje y circunstancias excepcionales."
          ]
        ]
      },
      {
        "id": "tasa",
        "title": "Tasa 790 código 012",
        "paragraphs": [
          "La tabla de Policía consultada el 16 de septiembre de 2026 fija 10,72 € para la autorización de regreso. Comprueba el concepto y el importe al generar el impreso; se abona antes de expedir la autorización.",
          "La ficha oficial indica pago en bancos, cajas de ahorro y cooperativas de crédito mediante el documento de ingreso. Descargar el modelo no acredita el abono: conserva el justificante."
        ]
      },
      {
        "id": "presentacion",
        "title": "Presentación y fechas concedidas",
        "paragraphs": [
          "Consulta con la Oficina de Extranjería o dependencia policial de tu provincia las instrucciones de presentación. Guarda el justificante y revisa las fechas de la autorización entregada.",
          "El máximo de 90 días tiene distintos puntos de inicio según el supuesto y el momento de solicitud. No equivale siempre a 90 días desde la salida. La entrada con este documento debe efectuarse por un paso fronterizo español habilitado; revisa también escalas y requisitos del destino."
        ]
      }
    ],
    "secondaryCta": {
      "href": "/extranjeria/autorizacion-regreso",
      "label": "Requisitos y supuestos de regreso"
    }
  },
  {
    "id": "certificadoDigitalNie",
    "pack": "extranjeria",
    "path": "/extranjeria/certificado-digital-nie",
    "h1": "Certificado FNMT con NIE y acreditación presencial",
    "title": "Certificado FNMT con NIE y acreditación presencial",
    "description": "Certificado software FNMT con NIE: Configurador, código por correo, acreditación presencial y descarga desde el mismo equipo y usuario.",
    "lead": "Esta guía explica el certificado software de persona física de la FNMT mediante acreditación presencial. Con NIE, prepara el equipo, solicita el código, acredita tu identidad y descarga el certificado. La FNMT admite mayores de 18 años y menores emancipados; otras modalidades tienen sus propias condiciones.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.sede.fnmt.gob.es/certificados/persona-fisica/obtener-certificado-software",
        "label": "FNMT: proceso con acreditación presencial"
      },
      {
        "href": "https://www.sede.fnmt.gob.es/certificados/persona-fisica/obtener-certificado-software/configuracion-previa",
        "label": "FNMT: Configurador y equipo de solicitud"
      },
      {
        "href": "https://www.sede.fnmt.gob.es/certificados/persona-fisica/obtener-certificado-software/solicitar-certificado",
        "label": "FNMT: solicitud y contraseña"
      },
      {
        "href": "https://www.sede.fnmt.gob.es/certificados/persona-fisica/obtener-certificado-software/acreditar-identidad",
        "label": "FNMT: documentación y oficinas"
      },
      {
        "href": "https://www.sede.fnmt.gob.es/certificados/persona-fisica/obtener-certificado-software/descargar-certificado",
        "label": "FNMT: descarga desde el mismo equipo y usuario"
      }
    ],
    "cta": {
      "href": "https://www.sede.fnmt.gob.es/certificados/persona-fisica/obtener-certificado-software",
      "label": "Iniciar el proceso oficial de la FNMT"
    },
    "related": [
      {
        "href": "/extranjeria/nie",
        "label": "Asignación de NIE"
      },
      {
        "href": "/extranjeria/nie-verde",
        "label": "Certificado de registro y documentos de identidad"
      },
      {
        "href": "/extranjeria/nie-vs-nif",
        "label": "NIE y NIF"
      }
    ],
    "sections": [
      {
        "id": "equipo",
        "title": "1. Instala el Configurador FNMT-RCM",
        "paragraphs": [
          "Instala el software indicado por la FNMT para tu sistema operativo y utiliza un navegador compatible. La FNMT exige realizar el proceso desde el mismo equipo y el mismo usuario; no formatees entre solicitud y descarga."
        ]
      },
      {
        "id": "solicitud",
        "title": "2. Solicita el código y conserva la contraseña",
        "paragraphs": [
          "Introduce tus datos en el formulario oficial. El código de solicitud llega al correo electrónico y se usa tanto en la acreditación como en la descarga.",
          "Durante la solicitud crearás una contraseña que se volverá a pedir al descargar. La FNMT advierte que no puede recuperarse si se olvida y que en ese caso hay que iniciar una nueva solicitud."
        ]
      },
      {
        "id": "identidad",
        "title": "3. Acredita la identidad en una oficina admitida",
        "paragraphs": [
          "Lleva el código y la combinación de documentos que la FNMT exige según tu nacionalidad. Para ciudadanos de la UE, contempla documento de NIE, certificado de registro o documento oficial de concesión del NIF/NIE, acompañado de pasaporte en vigor o documento de identidad del país de origen admitido.",
          "Para otros ciudadanos extranjeros, contempla las tarjetas de identificación que enumera o el documento oficial de concesión del NIF/NIE, junto con pasaporte en vigor. La documentación que acredita el NIE tiene reglas de vigencia distintas de la documentación de identidad: consulta la lista exacta de la FNMT.",
          "Localiza una oficina admitida y comprueba si exige cita. La FNMT excluye Correos para este certificado. Si no puedes acudir, describe una vía con legitimación notarial de la firma; no la sustituyas por una autorización informal."
        ]
      },
      {
        "id": "descarga",
        "title": "4. Descarga y guarda una copia",
        "paragraphs": [
          "Descarga desde el mismo ordenador y usuario de la solicitud, introduciendo los datos como entonces y la contraseña del proceso. Sigue las instrucciones para instalar el certificado y conservar una copia de seguridad protegida.",
          "El certificado permite identificación y firma electrónica en los servicios que lo admitan. Obtenerlo no concede residencia ni sustituye la documentación exigida en un trámite presencial."
        ]
      }
    ]
  },

];
