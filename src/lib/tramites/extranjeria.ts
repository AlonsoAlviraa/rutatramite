import {
  RD_ARRAIGO,
  SEDE_AAPP_URL,
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
    "id": "correos",
    "pack": "extranjeria",
    "path": "/extranjeria/subsanar-regularizacion-correos",
    "h1": "Subsanar la regularización en Correos: servicio hasta el 30 de septiembre",
    "title": "Regularización en Correos: subsanación y plazo individual",
    "description": "Correos recibe documentación hasta el 30 de septiembre de 2026. Distingue el plazo del requerimiento y consulta el horario de la oficina habilitada.",
    "lead": "Correos anuncia un servicio de aportación documental hasta el 30 de septiembre de 2026 para solicitudes de regularización presentadas en plazo. Esa fecha no amplía el plazo de tu requerimiento. Comprueba primero la notificación y después la oficina y el horario del mes.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://www.correos.es/es/es/particulares/para-el-ciudadano/regularizacion-extraordinaria-personas-migrantes",
      "label": "Consultar oficinas y condiciones de Correos"
    },
    "secondaryCta": {
      "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/expedientes_extranjeria",
      "label": "Consultar el estado del expediente"
    },
    "sources": [
      {
        "href": "https://www.correos.es/es/es/particulares/para-el-ciudadano/regularizacion-extraordinaria-personas-migrantes",
        "label": "Correos: servicio y listados mensuales de oficinas"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#da-20",
        "label": "BOE: disposición adicional 20, apartados 3 y 6"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#da-21",
        "label": "BOE: disposición adicional 21, apartados 4 y 6"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a30",
        "label": "BOE: cómputo de plazos administrativos"
      }
    ],
    "related": [
      {
        "href": "/extranjeria/regularizacion-2026-resolucion",
        "label": "Plazo de resolución y habilitación provisional"
      },
      {
        "href": "/extranjeria/mercurio",
        "label": "Presentación, consulta y notificación"
      },
      {
        "href": "/modelo-subsanacion",
        "label": "Preparar una respuesta al requerimiento"
      }
    ],
    "disclaimer": "No somos Administración Pública ni presentamos tu expediente. Esta información no sustituye el requerimiento, la resolución o el asesoramiento sobre tu caso.",
    "sections": [
      {
        "id": "ventana",
        "title": "Servicio de Correos y plazo del expediente",
        "paragraphs": [
          "La información de Correos se dirige a quienes solicitaron la regularización entre el 16 de abril y el 30 de junio de 2026 y necesitan aportar documentos por iniciativa propia o responder a un requerimiento. La atención posterior no abre un nuevo plazo de solicitud.",
          "Las disposiciones adicionales 20 y 21 del Reglamento de Extranjería establecen que, si la solicitud está incompleta, el requerimiento indicará el plazo de subsanación, que no puede superar quince días. Debes atender al plazo concreto notificado; no puedes sustituirlo por el 30 de septiembre.",
          "Para contar días, aplica las reglas de la notificación y del artículo 30 de la Ley 39/2015: como regla general son hábiles y se cuentan desde el día siguiente a la notificación, excluyendo sábados, domingos y festivos. No confundas quince días de subsanación con tres meses de resolución."
        ]
      },
      {
        "id": "oficina",
        "title": "Consulta el horario de tu oficina",
        "paragraphs": [
          "Correos anuncia 383 oficinas y publica listados separados para julio, agosto y septiembre. La franja de mañana es 8:30–14:30; las tardes dependen de la oficina: 14:30–17:30, 16:30–19:30 o sin servicio. No todas atienden de forma continua de 8:30 a 17:30.",
          "El listado de septiembre indica que no hay servicio los sábados ni los domingos. Comprueba dirección, turnos y condiciones de atención en el listado oficial del mes y con la oficina antes de desplazarte; esta guía no acredita disponibilidad en tiempo real."
        ]
      },
      {
        "id": "preparar",
        "title": "Prepara la aportación y conserva el resguardo",
        "paragraphs": [
          "Ten localizados el justificante de la solicitud, el número de expediente y la notificación recibida, si existe. Revisa qué documentación concreta pide el requerimiento y qué identificación y condiciones exige el canal elegido; esta lista de preparación no reemplaza las instrucciones oficiales.",
          "Al presentar, comprueba que la aportación queda asociada al expediente correcto y conserva el justificante con su fecha. Si ya tienes representante, coordina la respuesta para saber qué se ha presentado. Consultar el estado del expediente no acredita haber registrado documentos."
        ]
      },
      {
        "id": "despues",
        "title": "Si el plazo ha vencido o falta documentación",
        "paragraphs": [
          "La norma prevé que el requerimiento advierta del desistimiento y archivo si no se subsana en plazo. No equivale a afirmar que cualquier documento ausente cause automáticamente una denegación de fondo: revisa el acto y el estado de tu expediente.",
          "Si no puedes conseguir un documento a tiempo o el plazo ha vencido, consulta cuanto antes al órgano tramitador o a tu representante sobre la actuación procedente. No presupongas una ampliación por seguir abierto el servicio de Correos. Si recibes una resolución, atiende a las vías y plazos de recurso indicados."
        ]
      }
    ]
  },
  {
    "id": "mercurio",
    "pack": "extranjeria",
    "path": "/extranjeria/mercurio",
    "h1": "Mercurio y consulta de expedientes de extranjería",
    "title": "Mercurio: presentar documentos y consultar el expediente",
    "description": "Distingue presentación en Mercurio, consulta informativa y notificación. Conserva el registro y usa el canal de documentación que corresponda a tu nacionalidad.",
    "lead": "Mercurio sirve para presentar las solicitudes de extranjería admitidas por la aplicación y aportar documentos a expedientes en trámite. El servicio de consulta permite comprobar su estado. Consultar el estado no equivale a presentar documentación ni a recibir una notificación oficial.",
    "reviewedAt": "2026-09-16",
    "cta": {
      "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/expedientes_extranjeria",
      "label": "Consultar el estado del expediente"
    },
    "secondaryCta": {
      "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/mercurio2",
      "label": "Presentar solicitud o documentación en Mercurio"
    },
    "sources": [
      {
        "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/mercurio2",
        "label": "Sede: Mercurio, presentación y resguardo"
      },
      {
        "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/expedientes_extranjeria",
        "label": "Sede: consulta de expedientes"
      },
      {
        "href": "https://www.inclusion.gob.es/es/web/migraciones/informacion-util/tramites",
        "label": "Migraciones: consulta informativa y notificaciones"
      },
      {
        "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/ayuda_extranjeria",
        "label": "Sede: ayuda de extranjería"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/",
        "label": "Interior: alcance del pasaporte español"
      }
    ],
    "related": [
      {
        "href": "/extranjeria/cita-huellas-tie",
        "label": "Cita de huellas TIE"
      },
      {
        "href": "/extranjeria/nie",
        "label": "NIE y documentos de identidad"
      },
      {
        "href": "/extranjeria/no-hay-citas",
        "label": "Si no hay cita de extranjería"
      }
    ],
    "disclaimer": "No somos Administración Pública ni presentamos tu expediente. Esta guía no accede a tus datos, no cobra tasas y no sustituye la resolución o el requerimiento oficial.",
    "sections": [
      {
        "id": "elegir",
        "title": "Elige la operación",
        "paragraphs": [
          "Para una solicitud nueva, renovación o aportación, accede a Mercurio y comprueba el trámite habilitado, quién puede presentarlo y la documentación exigida. No selecciones otra autorización solo porque aparezca disponible.",
          "Para conocer la situación de un expediente ya presentado, entra en el servicio de consulta y sigue la identificación que indique. Comprueba los datos frente al resguardo; si no aparece, consulta la ayuda de la sede o la oficina competente. No deduzcas una denegación de un resultado de búsqueda vacío."
        ]
      },
      {
        "id": "presentar",
        "title": "Firmar, registrar y guardar el justificante",
        "paragraphs": [
          "La ficha de Mercurio describe la firma con certificado digital y AutoFirma antes del registro, y la obtención posterior de un resguardo electrónico en PDF. Comprueba los requisitos técnicos en la aplicación y su ayuda vigente. Guardar un borrador o adjuntar archivos no acredita por sí solo que estén registrados.",
          "Verifica que el justificante corresponde al expediente y a los documentos que querías enviar. Si aportas documentación por un requerimiento, sigue su canal y plazo. Para tasas, identifica el modelo aplicable y su forma de pago en las instrucciones oficiales; no uses las tasas de DNI o pasaporte como importe de una autorización de extranjería."
        ]
      },
      {
        "id": "notificacion",
        "title": "Consultar el estado y recibir una notificación",
        "paragraphs": [
          "Migraciones advierte que la consulta del estado tiene carácter informativo. No sustituye la notificación de un requerimiento o resolución. Comprueba el medio de notificación correspondiente a tu expediente y accede al documento oficial cuando se ponga a disposición.",
          "Lee lo solicitado, la fecha relevante y los plazos del acto. No calcules un plazo de respuesta únicamente por el día en que consultaste la pantalla de estado. Conserva resolución, requerimiento y justificantes de acceso o entrega que correspondan."
        ]
      },
      {
        "id": "documentos",
        "title": "Pasaporte extranjero, DNI español y TIE son trámites distintos",
        "paragraphs": [
          "La cita de DNI y pasaporte españoles no sirve para renovar un pasaporte extranjero. Si necesitas renovar ese documento, consulta a la autoridad emisora o a la representación consular competente y verifica las condiciones de tu caso. La TIE tampoco sustituye al pasaporte.",
          "La toma de huellas de la TIE tiene su propio procedimiento y cita policial, que se explica en la guía enlazada. Mercurio no es una reserva de cita de huellas. RutaTrámite no tramita solicitudes ni realiza pagos por ti."
        ]
      }
    ]
  },
  {
    "id": "huellas",
    "pack": "extranjeria",
    "path": "/extranjeria/cita-huellas-tie",
    "h1": "Cita de huellas TIE: portal y trámite correcto",
    "title": "Cita de huellas TIE: portal y trámite correcto",
    "description": "Acceso oficial a la cita de huellas TIE: provincia, procedimiento, autorización previa y preparación de documentos. La recogida es una gestión posterior.",
    "lead": "La cita para expedir la TIE se solicita en el portal de cita de extranjería. Antes de reservar, comprueba que corresponde expedir tu tarjeta: presentar una renovación de residencia no equivale a tenerla concedida.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/regimen-general/tarjeta-de-identidad-de-extranjero/",
        "label": "Interior: solicitud y documentación de la TIE"
      },
      {
        "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_tarjeta_residencia_residenciaytrabajo.php",
        "label": "Policía: tarjeta inicial y renovación"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a2-21",
        "label": "BOE: artículo 209, tarjeta de identidad de extranjero"
      }
    ],
    "cta": {
      "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus",
      "label": "Abrir la cita oficial de extranjería"
    },
    "related": [
      {
        "href": "/extranjeria/huellas-que-llevar",
        "label": "Documentos para las huellas"
      },
      {
        "href": "/extranjeria/tie-recogida-cuanto-tarda",
        "label": "Consultar la recogida"
      },
      {
        "href": "/extranjeria/mercurio",
        "label": "Consultar el expediente"
      }
    ],
    "sections": [
      {
        "id": "antes",
        "title": "Comprueba la autorización",
        "paragraphs": [
          "Para renovar la TIE, la ficha de Policía sitúa la solicitud después de la notificación favorable de la renovación de residencia. Revisa también si la eficacia de tu autorización depende del alta en la Seguridad Social. El resguardo de haber presentado la renovación no sustituye a su concesión.",
          "El artículo 209 fija un mes para solicitar la TIE desde la entrada, la concesión o la eficacia de la autorización, según el supuesto. Es un plazo para solicitarla, no una promesa de fabricación de la tarjeta en un mes."
        ]
      },
      {
        "id": "portal",
        "title": "Selecciona provincia y procedimiento",
        "paragraphs": [
          "Entra mediante el acceso oficial, elige la provincia de tu domicilio y lee las instrucciones del procedimiento de expedición de TIE o toma de huellas que corresponda a tu autorización. Comprueba la oficina y conserva la confirmación. No selecciones un trámite distinto solo porque ofrezca cita.",
          "Si no aparecen citas o no identificas el procedimiento, consulta las instrucciones y el contacto de la dependencia. Esta página no comprueba disponibilidad en tiempo real ni permite fijar una hora de apertura de citas."
        ]
      },
      {
        "id": "documentos",
        "title": "Prepara la solicitud y la siguiente visita",
        "paragraphs": [
          "Consulta la guía de documentos enlazada: distingue primera tarjeta, renovación y duplicado. El trámite presencial requiere la intervención del titular; en menores se aplican las condiciones de acompañamiento.",
          "Tras presentar la solicitud, conserva el resguardo y las instrucciones de entrega. La recogida posterior tiene su propio procedimiento; reservar huellas no acredita que una tarjeta anterior esté lista."
        ]
      }
    ]
  },
  {
    "id": "registro-ue",
    "pack": "extranjeria",
    "path": "/extranjeria/certificado-registro-ue",
    "h1": "Certificado de registro UE: requisitos y solicitud EX-18",
    "title": "Certificado de registro UE: requisitos y solicitud EX-18",
    "description": "Registro de ciudadanos UE, EEE y Suiza para residir más de tres meses: plazo, EX-18, tasa y documentación según trabajo, recursos, estudios o familia.",
    "lead": "Si eres ciudadano de la UE, del EEE o de Suiza y vas a residir en España más de tres meses, solicita personalmente la inscripción en el Registro Central de Extranjeros dentro de los tres meses desde tu entrada. Prepara la documentación de tu supuesto antes de la cita.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_certificadoregistro_ciudadanoue.php",
        "label": "Policía: certificado de registro UE y formulario EX-18"
      },
      {
        "href": "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/ciudadanos-de-la-union-europea/estancia-y-residencia/",
        "label": "Interior: requisitos según la situación del solicitante"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2007-4184#a7",
        "label": "BOE: residencia superior a tres meses"
      }
    ],
    "cta": {
      "href": "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_certificadoregistro_ciudadanoue.php",
      "label": "Consultar requisitos y formulario EX-18"
    },
    "related": [
      {
        "href": "/extranjeria/nie-verde",
        "label": "Qué acredita el certificado de registro"
      },
      {
        "href": "/extranjeria/nie",
        "label": "Asignación de NIE"
      },
      {
        "href": "/empadronarse/extranjeros-ue",
        "label": "Padrón para ciudadanos UE"
      }
    ],
    "sections": [
      {
        "id": "documentos",
        "title": "Formulario, identificación y tasa",
        "paragraphs": [
          "La ficha de Policía reúne el EX-18 y la tasa 790 código 012. Presenta pasaporte o documento nacional de identidad vigente; si está caducado, la ficha admite copia junto con la solicitud de renovación. Añade las pruebas correspondientes a tu situación."
        ]
      },
      {
        "id": "supuestos",
        "title": "Qué cambia según tu situación",
        "paragraphs": [
          "Los requisitos del artículo 7 son alternativas según el caso; no debe pedirse el mismo conjunto de trabajo, ahorros y seguro privado a todas las personas."
        ],
        "lists": [
          [
            "Trabajo por cuenta ajena: acredita el empleo. Por cuenta propia: acredita la actividad. Interior detalla los documentos y las comprobaciones de datos admitidas.",
            "Sin actividad laboral: acredita recursos suficientes para ti y tu familia y cobertura sanitaria pública o privada en España.",
            "Estudios: matrícula en un centro admitido, cobertura sanitaria y declaración u otro medio equivalente sobre recursos suficientes.",
            "Familia: acredita el vínculo y las condiciones del ciudadano al que acompañas o con quien te reúnes. El alcance varía según el familiar y el supuesto; consulta el artículo 7."
          ]
        ]
      },
      {
        "id": "presentacion",
        "title": "Dónde se presenta y qué recibes",
        "paragraphs": [
          "Se presenta en la Oficina de Extranjería de la provincia de residencia o, en su defecto, en la comisaría correspondiente. Consulta la cita y sus instrucciones. La ficha prevé expedición inmediata al cumplir los requisitos; no garantiza una cita inmediata ni la aprobación de una solicitud incompleta.",
          "El certificado recoge la inscripción y el NIE. El padrón es un registro municipal distinto y no sustituye esta solicitud."
        ]
      }
    ],
    "secondaryCta": {
      "href": "https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus",
      "label": "Consultar cita de extranjería"
    }
  },
  {
    id: "nie",
    reviewedAt: "2026-09-16",
    sources: [{ label: "Policía Nacional: asignación de NIE a instancia de interesado", href: "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_asignacion_nie.php" }],
    pack: "extranjeria",
    path: "/extranjeria/nie",
    h1: "Asignación de NIE",
    title: "Asignación de NIE: solicitud EX-15 y canales oficiales",
    description: "Cómo solicitar la asignación de NIE por intereses económicos, profesionales o sociales: EX-15, tasa 790-012 y canales en España o desde el extranjero.",
    lead: "La asignación de NIE identifica a las personas extranjeras que se relacionan con España por intereses económicos, profesionales o sociales. Comprueba que necesitas este procedimiento y consulta su ficha oficial antes de preparar la solicitud.",
    cta: { href: "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_asignacion_nie.php", label: "Policía Nacional: solicitar la asignación de NIE" },
    secondaryCta: { href: SEDE_AAPP_URL, label: "Portal oficial de cita de extranjería" },
    related: relatedEx,
    sections: [
      {
        id: "donde",
        title: "Dónde se solicita",
        paragraphs: [
          "Se solicita a la Dirección General de la Policía, directamente o mediante oficinas de extranjería o comisarías. Si estás fuera de España, la ficha oficial contempla la solicitud a través de las oficinas consulares españolas. Revisa las instrucciones de la oficina sobre presentación y cita.",
        ],
      },
      {
        id: "documentos",
        title: "Formulario y tasa",
        paragraphs: [
          "La ficha identifica el modelo EX-15 y el justificante de pago del modelo 790 código 012. Consulta en ella las condiciones y documentación aplicables; el PDF descargable de esta página no presenta la solicitud. No hay disponibilidad de citas verificada en tiempo real en RutaTrámite.",
        ],
      },
    ],
  },
  {
    id: "arraigo",
    reviewedAt: "2026-09-16",
    sources: [
      { label: "Migraciones: arraigo social y pruebas de permanencia", href: "https://www.inclusion.gob.es/web/migraciones/w/autorizacion-residencia-temporal-por-circunstancias-excepcionales.-arraigo-social" },
      { label: "BOE: Reglamento de extranjería, artículo 126", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a1-38" },
    ],
    pack: "extranjeria",
    path: "/extranjeria/arraigo-padron",
    h1: "Arraigo y padrón: cómo acreditar la permanencia en España",
    title: "Arraigo y padrón: permanencia y otras pruebas admitidas",
    description: "El padrón es una prueba de permanencia para el arraigo, pero no la única. Distingue la fecha de empadronamiento y los requisitos de cada modalidad.",
    lead: `El ${RD_ARRAIGO} regula varias modalidades de arraigo. La permanencia en España y la antigüedad del padrón no son lo mismo: haberte empadronado recientemente no descarta por sí solo una permanencia anterior que puedas acreditar.`,
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
          "El artículo 126 establece, para las modalidades sujetas a ese requisito, una permanencia continuada mínima de dos años. El arraigo familiar no exige ese mínimo. Además, existen reglas específicas de cómputo: no basta con cumplir dos años de padrón para reunir todos los requisitos de una autorización.",
        ],
      },
      {
        id: "padron",
        title: "Qué pruebas puedes reunir",
        paragraphs: [
          "La hoja oficial de arraigo social admite documentación de empadronamiento y otras pruebas identificadas, como documentos de hospitalización, consultas de la sanidad pública o documentación de administraciones españolas que acredite tu presencia. Conserva los originales y sus fechas; corresponde a la oficina valorar las pruebas de tu expediente.",
          "Puedes solicitar el certificado histórico de padrón al ayuntamiento para documentar los periodos que consten inscritos. Si hay periodos anteriores o interrupciones, reúne las demás pruebas y consulta los requisitos de tu modalidad. La inscripción padronal por sí sola no concede una autorización de residencia.",
        ],
      },
    ],
  },
  {
    id: "regreso",
    reviewedAt: "2026-09-16",
    sources: [
      { label: "Policía Nacional: autorización de regreso", href: "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_autorizacionregreso.php" },
      { label: "BOE: artículo 5 del Reglamento de extranjería", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a5" },
    ],
    pack: "extranjeria",
    path: "/extranjeria/autorizacion-regreso",
    h1: "Autorización de regreso si la TIE está en trámite",
    title: "Autorización de regreso 2026: viajar con la TIE en trámite",
    description: "Cuándo puedes solicitar la autorización de regreso: renovación, duplicado y casos excepcionales. Vigencia, entrada por España, EX-13 y trámite oficial.",
    lead: "Tener la TIE en trámite no basta por sí solo para obtener una autorización de regreso. Comprueba el supuesto aplicable y los documentos antes de organizar la salida y la vuelta a España.",
    cta: { href: "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_autorizacionregreso.php", label: "Policía Nacional: requisitos y solicitud de regreso" },
    related: [{ href: "/extranjeria/autorizacion-regreso-ex13", label: "Preparar el EX-13 y la tasa" }, { href: "/extranjeria/tie-caducada-viajar", label: "Comprobar los documentos según el viaje" }, ...relatedEx],
    sections: [
      {
        id: "cuando",
        title: "Cuándo sirve",
        paragraphs: [
          "La renovación o prórroga debe haberse iniciado dentro del plazo legal. También se contempla el duplicado solicitado de una TIE en vigor por pérdida, robo, destrucción o inutilización. Para una autorización inicial favorable, se exigen además necesidad del viaje y razones excepcionales.",
        ],
      },
      {
        id: "no-dni",
        title: "Vigencia y ruta de entrada",
        paragraphs: [
          "La vigencia máxima es de 90 días, cuyo inicio depende del supuesto y del momento de solicitud. Comprueba las fechas concedidas. Permite varias entradas y salidas durante su validez, con entrada por pasos fronterizos españoles habilitados; no la uses como garantía de entrada por otro país Schengen.",
        ],
      },
      {
        id: "solicitud",
        title: "Preparar la solicitud",
        paragraphs: [
          "La ficha de Policía enlaza el EX-13 y la tasa 790 código 012. Revisa con la oficina la documentación que acredita tu supuesto y el canal de atención. La guía del EX-13 enlazada abajo amplía la preparación del formulario; conserva el justificante de presentación.",
        ],
      },
    ],
  },
];
