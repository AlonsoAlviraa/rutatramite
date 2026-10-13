import { AID_SOURCES } from "@/lib/ayudas";
import {
  BECAS_URL,
  DISCLAIMER_GENERICO,
  MEC_ACNEAE_HASTA,
  MEC_COLABORACION_HASTA,
  MEC_MODIFICACION_VENTANA,
  MEC_PLAZO_2627,
  MEC_RESIDENCIA_EUR,
  MUFACE_HASTA,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relMec = [
  { href: "/becas/mec/plazo", label: "Plazo de la beca MEC" },
  { href: "/becas/mec/modificar-datos", label: "Modificar datos (septiembre)" },
  { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra" },
  { href: "/becas/mec/estado", label: "Consultar el estado" },
];

export const BECAS_GUIDES: Guide[] = [
  {
    id: "mec-hub",
    reviewedAt: "2026-09-16",
    sources: [{ label: "Convocatoria general 2026-27: artículos 48 y 68 (PDF)", href: "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191" }, AID_SOURCES.ministry, { label: "Ministerio: requisitos y componentes", href: "https://www.becaseducacion.gob.es/becas-y-ayudas/universidad-grado-master/que-necesitas.html" }, { label: "BOE: prórroga del plazo de solicitud 2026-27", href: "https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-16327" }],
    pack: "becas",
    path: "/becas/mec",
    h1: "Beca MEC 2026-27: guía completa del trámite",
    title: "Beca MEC 2026-27: plazos, estado y cobro explicados",
    description:
      "Beca general del Ministerio 2026-27: plazo ordinario cerrado, excepciones, modificación en septiembre y seguimiento. Comprueba la administración competente.",
    lead: `El plazo ordinario de la beca general del Ministerio 2026-27 fue del ${MEC_PLAZO_2627}. Si ya presentaste la solicitud, consulta la modificación de datos y las notificaciones. Hay supuestos excepcionales para solicitar fuera de plazo y reglas territoriales que debes comprobar antes de elegir la sede.`,
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: [...relMec, { href: "/ayudas", label: "Calendario de ayudas" }, { href: "/becas/ayudas-estudiantes", label: "Ayudas para estudiantes" }],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      { id: "administracion", title: "Qué administración tramita tu convocatoria", paragraphs: ["Para 2026-27, quienes tienen el domicilio familiar en Cataluña deben consultar la convocatoria de la Generalitat. La referencia es el domicilio de los sustentadores principales a 31 de diciembre de 2025; estudiar en Cataluña con domicilio familiar fuera de ella no te excluye por sí solo de la convocatoria estatal.", "El artículo 68 también distingue los supuestos del País Vasco: vecindad administrativa para estudios universitarios y superiores no universitarios, y ubicación del centro para los no universitarios. Si hay custodia compartida, solicitudes en ambas convocatorias o cambios de unidad familiar, consulta las reglas específicas y tu Unidad de Becas antes de cambiar de procedimiento."] },
      {
        id: "fases",
        title: "Las fases del curso 2026-27",
        paragraphs: [
          `Solicitud ordinaria: cerrada el 19 de mayo a las 15:00, hora peninsular, tras la prórroga oficial. La ventana de modificación de datos es del ${MEC_MODIFICACION_VENTANA}. Revisa después las notificaciones de tu expediente: la resolución y el pago no tienen una fecha única para todos los solicitantes.`,
        ],
      },
      {
        id: "que-cubre",
        title: "Qué cubre (y qué es la matrícula)",
        paragraphs: [
          `Los componentes dependen de los estudios, la matrícula y los requisitos económicos y académicos: matrícula, cantidades fijas y cuantía variable. La cuantía general de residencia es de ${MEC_RESIDENCIA_EUR}, sujeta a requisitos y límites; una matrícula parcial puede dar acceso a componentes reducidos. La beca de matrícula universitaria se compensa a la universidad. Si ya pagaste, consulta allí qué importes cubre y cómo tramitar su devolución. La solicitud de beca es gratuita.`,
        ],
      },
      {
        id: "si-llegaste-tarde",
        title: "Si llegaste tarde en mayo",
        paragraphs: [
          `La modificación de septiembre no sustituye la solicitud inicial. El artículo 48.2 permite solicitar hasta el 31 de diciembre de 2026 en dos supuestos sobrevenidos después del plazo ordinario: fallecimiento del sustentador principal o jubilación forzosa que no se deba a cumplir la edad reglamentaria. Exige acreditar los hechos y la nueva situación económica; consulta el procedimiento con la comunidad autónoma o universidad donde corresponda estudiar. Las ayudas de apoyo educativo ACNEAE también cerraron el ${MEC_ACNEAE_HASTA}. Las becas de colaboración tienen como fecha límite el ${MEC_COLABORACION_HASTA}; consulta su convocatoria y las ayudas autonómicas o municipales que correspondan a tu caso. Cada una tiene requisitos propios; no todas sirven para los mismos estudios o situaciones.`,
        ],
      },
    ],
  },
  {
    id: "mec-plazo",
    reviewedAt: "2026-09-16",
    sources: [{ label: "Convocatoria general 2026-27: artículos 48 y 68 (PDF)", href: "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191" }, AID_SOURCES.ministry, AID_SOURCES.neae, AID_SOURCES.collaboration, { label: "MUFACE: becas de estudio para mutualistas 2025-26", href: "https://muface.es/actualidad/noticias/2026/mayo/convocatoria-becas-estudio" }, { label: "BOE: prórroga del plazo hasta el 19 de mayo", href: "https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-16327" }],
    pack: "becas",
    path: "/becas/mec/plazo",
    h1: "Plazo de la beca MEC 2026-27: qué está abierto ahora",
    title: "Plazo beca MEC 2026-27: qué está abierto ahora",
    description:
      "Plazo ordinario MEC 2026-27 cerrado el 19 de mayo. Modificación del 7 al 28 de septiembre y supuestos excepcionales hasta diciembre: condiciones y canales.",
    lead: `El plazo ordinario de solicitud de la beca general del Ministerio 2026-27 fue del ${MEC_PLAZO_2627}, con cierre a las 15:00, hora peninsular, tras la prórroga publicada en el BOE. La modificación de septiembre corresponde a solicitudes ya presentadas. Si no la solicitaste, comprueba los supuestos excepcionales del artículo 48.2 y otras convocatorias que correspondan a tu situación.`,
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: [...relMec, { href: "/ayudas", label: "Calendario de ayudas" }, { href: "/becas/ayudas-estudiantes", label: "Ayudas para estudiantes" }],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      { id: "fuera-plazo", title: "Solicitudes excepcionales hasta el 31 de diciembre de 2026", paragraphs: ["El artículo 48.2 contempla el fallecimiento del sustentador principal de la familia o su jubilación forzosa que no se produzca por cumplir la edad reglamentaria, ocurridos después del plazo ordinario. Haber olvidado solicitar la beca o un cambio de estudios no figura entre esos supuestos.", "La solicitud se presenta directamente en la comunidad autónoma o universidad en la que corresponda estudiar. Debes exponer y acreditar documentalmente los hechos y la nueva situación económica familiar. Consulta allí el canal y los documentos; el límite de diciembre no garantiza la concesión ni reabre el formulario ordinario para todos."] },
      { id: "ambito", title: "Calendario de la convocatoria del Ministerio", paragraphs: ["Estas fechas no se trasladan automáticamente a las convocatorias autonómicas. En Cataluña se toma como referencia el domicilio familiar de los sustentadores principales a 31 de diciembre de 2025; el artículo 68 recoge también los supuestos del País Vasco. Comprueba la administración que corresponde a tus estudios antes de usar un plazo o formulario."] },
      {
        id: "abierto",
        title: "Calendario de septiembre y octubre de 2026",
        paragraphs: [
          `Modificación de datos: del ${MEC_MODIFICACION_VENTANA} (universidad, titulación, domicilio, cuenta). Ayudas de apoyo educativo ACNEAE: solicitud cerrada el ${MEC_ACNEAE_HASTA}. Becas de colaboración: hasta el ${MEC_COLABORACION_HASTA}. Becas de estudio de MUFACE para mutualistas, curso 2025-26: la convocatoria publica hasta el ${MUFACE_HASTA}; consulta su sede y el cómputo aplicable al último día. Las autonómicas y municipales tienen calendario propio; comprueba cada convocatoria.`,
        ],
      },
      {
        id: "2027",
        title: "La convocatoria 2027-28",
        paragraphs: [
          "Las fechas de 2027-28 deben confirmarse cuando se publique su convocatoria. Puedes preparar el acceso a la sede y anotar los estudios que prevés cursar. Sigue las instrucciones de la solicitud sobre los datos económicos; no encargues certificados antes de comprobar si son necesarios.",
        ],
      },
    ],
  },
  {
    id: "mec-modificar",
    sources: [AID_SOURCES.ministry, { label: "Ministerio: tramitación y actualización de datos", href: "https://www.becaseducacion.gob.es/dudas/asi-de-facil.html" }, { label: "Ministerio: cambios de cuenta y consultas", href: "https://www.becaseducacion.gob.es/dudas/faqs.html" }],
    reviewedAt: "2026-09-16",
    pack: "becas",
    path: "/becas/mec/modificar-datos",
    h1: "Modificar datos de la beca MEC (7-28 de septiembre)",
    title: "Modificar datos beca MEC: plazo del 7 al 28 de septiembre",
    description:
      "Universidad, titulación, domicilio o cuenta bancaria: el septiembre de la beca MEC tiene ventana propia del 7 al 28. Qué se puede cambiar y qué pasa fuera de plazo.",
    lead: `Del ${MEC_MODIFICACION_VENTANA}, con apertura a las 08:00 del día 7 y cierre a las 15:00 del día 28 (hora peninsular), puedes actualizar una solicitud ya presentada en la convocatoria del Ministerio 2026-27 en la sede electrónica del Ministerio: universidad, titulación, domicilio o cuenta bancaria. Esta ventana no sirve para pedir la beca por primera vez. Si tu expediente pertenece a otra administración, sigue su convocatoria y sus avisos. Fuera de plazo, consulta con tu Unidad de Becas cómo comunicar el cambio.`,
    cta: { href: AID_SOURCES.ministry.href, label: "Instrucciones oficiales para modificar datos" },
    related: [{ href: "/becas/mec", label: "Convocatoria y administración competente" }, ...relMec, { href: "/ayudas", label: "Calendario de ayudas" }, { href: "/becas/ayudas-estudiantes", label: "Ayudas para estudiantes" }],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "que-cambia",
        title: "Qué se puede cambiar (y qué no)",
        paragraphs: [
          "Si no ha cambiado ningún dato, el Ministerio indica que no es preciso volver a entrar para modificarlo; revisa igualmente las notificaciones por si requieren alguna actuación. El aviso permite actualizar datos académicos, estudios y cuenta corriente, y también aportar documentación o presentar alegaciones. Si discrepas de la información económica, sigue las instrucciones de tu notificación para alegar; no confundas un dato contrastado por la Administración con la imposibilidad de reclamar un error.",
        ],
      },
      {
        id: "checklist",
        title: "Lista de comprobación de la ventana de septiembre",
        paragraphs: ["Antes del 28 de septiembre, repasa esta lista contra tu expediente:"],
        lists: [
          [
            "¿La universidad y titulación de la solicitud son las de tu matrícula real? Si hubo adjudicación distinta en julio o septiembre, este es el momento de corregirla.",
            "¿Los créditos matriculados coinciden con lo declarado? La evaluación académica usa la matrícula definitiva.",
            "¿La cuenta de cobro sigue activa y a tu nombre? Comprueba los datos antes de que se ordenen los pagos.",
            "¿El domicilio y, en su caso, los datos del alojamiento durante el curso son correctos? Comprueba los campos de la solicitud y las instrucciones de tu notificación.",
          ],
        ],
      },
      {
        id: "fuera",
        title: "Si te pasas del 28",
        paragraphs: [
          "Comunica cuanto antes el cambio a la Unidad de Becas que figure en tu expediente y sigue sus instrucciones. No hay en las fuentes consultadas una garantía general de que cualquier cambio de cuenta se acepte hasta el día del pago. Para una nueva cuenta, la FAQ ministerial pide seguir las indicaciones de la Unidad y acreditar al estudiante como titular o cotitular. Conserva la comunicación y el justificante de lo aportado.",
        ],
      },
    ],
  },
  {
    id: "mec-cobro",
    faqs: [
      { q: "¿Tengo garantizado el ingreso en cuatro o cinco semanas?", a: "No. Es el tiempo habitual que publica el Ministerio desde el aviso de disponibilidad de la credencial, no una fecha garantizada para cada expediente." },
      { q: "¿Recibiré la beca de matrícula en mi cuenta?", a: "Si solo te han concedido matrícula universitaria, su importe se abona a la universidad, no a tu cuenta bancaria." },
    ],
    reviewedAt: "2026-09-16",
    sources: [{ label: "Ministerio: preguntas frecuentes sobre cobro", href: "https://www.becaseducacion.gob.es/dudas/faqs.html" }, { label: "Ministerio: tramitación y pagos", href: "https://www.becaseducacion.gob.es/dudas/asi-de-facil.html" }],
    pack: "becas",
    path: "/becas/mec/cuando-se-cobra",
    h1: "Cuándo se cobra la beca MEC 2026-27",
    title: "Cuándo se cobra la beca MEC 2026-27: calendario",
    description:
      "Consulta cómo se abona la beca MEC, qué revisar en la notificación y dónde preguntar si el ingreso no llega.",
    lead:
      "La beca puede abonarse en varios pagos. La notificación de concesión permite comprobar qué cantidades te corresponden; no establece por sí sola el día del ingreso.",
    cta: { href: "https://sede.educacion.gob.es/portada.html", label: "Consultar el expediente en la sede del Ministerio" },
    related: [
      { href: "/becas/mec/estado", label: "Consultar el estado" },
      { href: "/becas/mec/no-cobrada", label: "Beca sin cobrar: qué hacer" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "calendario",
        title: "Qué plazo orientativo publica el Ministerio",
        paragraphs: [
          "El Ministerio indica un tiempo habitual de cuatro o cinco semanas desde el aviso de disponibilidad de la credencial de concesión. Es una orientación, no una garantía de pago en una fecha concreta. Si solo te conceden matrícula universitaria, no recibirás ese importe en tu cuenta: se paga a la universidad.",
        ],
      },
      {
        id: "fija-variable",
        title: "Distingue las cantidades concedidas",
        paragraphs: [
          "Compara cada ingreso con la cantidad que figure en tu notificación. Un primer pago no significa necesariamente que hayas recibido toda la beca. Consulta el expediente para distinguir la concesión de las distintas partes y los pagos pendientes.",
        ],
      },
      {
        id: "cuenta",
        title: "Mantén activa la cuenta de cobro",
        paragraphs: [
          "Si has cambiado de cuenta, comunícalo a tu Unidad de Becas. No canceles la cuenta indicada hasta recibir toda la cuantía variable.",
        ],
      },
    ],
  },
  {
    "id": "mec-estado",
    "pack": "becas",
    "path": "/becas/mec/estado",
    "h1": "Consultar el estado de la beca MEC y sus notificaciones",
    "title": "Consultar el estado de la beca MEC y sus notificaciones",
    "description": "Consulta el expediente de la beca MEC, distingue sus estados de las notificaciones y comprueba qué hacer ante documentación pendiente o una resolución.",
    "lead": "Entra en la sede del Ministerio con los datos del solicitante y consulta la convocatoria y el curso correctos. Revisa tanto el expediente como las notificaciones: un estado de tramitación no sustituye la lectura de un requerimiento. «Resuelta» puede corresponder a una concesión o a una denegación.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.becaseducacion.gob.es/dudas/que-significa.html",
        "label": "Ministerio: significado de los estados"
      },
      {
        "href": "https://www.becaseducacion.gob.es/dudas/faqs.html",
        "label": "Ministerio: acceso y consultas"
      },
      {
        "href": "https://www.becaseducacion.gob.es/dudas/como-reclamar.html",
        "label": "Ministerio: notificaciones y reclamaciones"
      }
    ],
    "cta": {
      "href": "https://sede.educacion.gob.es/portada.html",
      "label": "Entrar en la sede del Ministerio"
    },
    "related": [
      {
        "href": "/becas/mec/subsanacion",
        "label": "Responder a un requerimiento"
      },
      {
        "href": "/becas/mec/alegaciones",
        "label": "Alegaciones y recursos"
      },
      {
        "href": "/becas/mec/cuando-se-cobra",
        "label": "Consultar un pago pendiente"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "acceso",
        "title": "Entrar y localizar la solicitud",
        "paragraphs": [
          "Puedes acceder con el usuario y la contraseña registrados en la sede o mediante los sistemas de identificación electrónica que ofrezca. Busca Mis expedientes y Mis notificaciones. Si solo guardaste un borrador, no equivale a una solicitud presentada: comprueba el justificante.",
          "Si no puedes entrar o no localizas la solicitud, utiliza la ayuda de la sede o contacta con tu Unidad de Becas. No deduzcas que no hay trámites pendientes por un problema de acceso."
        ]
      },
      {
        "id": "estados",
        "title": "Estados del expediente y qué comprobar",
        "paragraphs": [
          "Estas son situaciones descritas por el Ministerio; el texto de la notificación determina la actuación concreta."
        ],
        "lists": [
          [
            "Presentada: la solicitud consta enviada. Conserva el justificante y revisa las comunicaciones.",
            "En trámite en tu Unidad de Becas: se está revisando la solicitud. Comprueba también si hay documentación requerida.",
            "En trámite en el Ministerio: continúan las comprobaciones, incluidas las económicas. No significa que la ayuda esté concedida.",
            "Pendiente de documentación: abre el requerimiento y aporta lo indicado por el canal y en el plazo que señale.",
            "Resuelta: consulta la notificación para conocer el resultado, los importes o el motivo de denegación y las posibilidades de reclamación."
          ]
        ]
      },
      {
        "id": "notificaciones",
        "title": "Una notificación caducada también puede producir efectos",
        "paragraphs": [
          "Los estados de una notificación —por ejemplo, nueva, vista o caducada— no son el resultado de la beca. El Ministerio explica que, si pasan diez días naturales sin abrirla, se considera comunicada y el plazo para alegar comienza al día siguiente.",
          "Las alegaciones suelen tener diez días hábiles desde el día siguiente a consultar o descargar la notificación, pero puede establecer otro plazo: sigue el que figure en ella. No confundas días naturales de acceso con días hábiles de respuesta."
        ]
      },
      {
        "id": "definitiva",
        "title": "Resolución definitiva y pago",
        "paragraphs": [
          "En la beca general, la resolución definitiva se publica en la web del Ministerio con los listados de beneficiarios; no esperes otra notificación individual. Comprueba esa publicación aunque el expediente no muestre un cambio reciente.",
          "Una concesión no acredita que el dinero esté ingresado. Compara los componentes concedidos con tu cuenta y consulta con la Unidad de Becas si hay una incidencia. Esta guía no fija una fecha garantizada de cobro."
        ]
      }
    ]
  },
  {
    id: "mec-subsanacion",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Ministerio: notificaciones y documentación pendiente", href: "https://www.becaseducacion.gob.es/dudas/que-significa.html" },
      { label: "BOE: subsanación, artículo 68", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a68" },
    ],
    pack: "becas",
    path: "/becas/mec/subsanacion",
    h1: "Subsanar la beca MEC: plazo de 10 días hábiles",
    title: "Subsanación beca MEC: plazo y cómo hacerlo",
    description:
      "Cómo atender un requerimiento de beca MEC: diez días hábiles, notificación, documentos y justificante de presentación.",
    lead:
      "Si te solicitan documentos, lee el requerimiento completo: indica qué aportar, dónde y en qué plazo. El Ministerio señala diez días hábiles para presentar la documentación en la Unidad de Becas. Guarda el justificante de entrega.",
    cta: { href: "https://www.becaseducacion.gob.es/dudas/que-significa.html", label: "Consultar las instrucciones del Ministerio" },
    related: [
      { href: "/becas/mec/estado", label: "Consultar el estado" },
      { href: "/becas/mec/alegaciones", label: "Alegaciones" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "reloj",
        title: "Cómo contar el plazo",
        paragraphs: [
          "Los diez días hábiles se cuentan desde el día siguiente a leer o descargar la notificación, sin sábados, domingos ni festivos. No son diez días naturales. Revisa las fechas y las instrucciones que constan en tu notificación.",
          "No abrirla no detiene el procedimiento. Consulta también las notificaciones caducadas: pueden haberse dado por comunicadas. Si tienes dudas sobre la fecha límite, contacta cuanto antes con tu Unidad de Becas.",
        ],
      },
      {
        id: "documentos",
        title: "Qué suelen pedir",
        paragraphs: [
          "Aporta los documentos concretos que enumera el requerimiento. Comprueba que son legibles, completos y corresponden al curso y expediente indicados. Sigue el canal de presentación señalado y conserva el resguardo; enviar una consulta no equivale a entregar la documentación.",
        ],
      },
      {
        id: "si-caduca",
        title: "Si ya caducó",
        paragraphs: [
          "Consulta inmediatamente el estado con tu Unidad de Becas. El artículo 68 prevé que, si no subsanas una solicitud incompleta, se te tenga por desistido mediante resolución. No hay una segunda oportunidad automática: si recibes una resolución, revisa qué alegaciones o recursos permite y su plazo.",
        ],
      },
    ],
  },
  {
    "id": "mec-alegaciones",
    "pack": "becas",
    "path": "/becas/mec/alegaciones",
    "h1": "Alegaciones a la beca MEC: plazos, escrito y recursos",
    "title": "Alegaciones a la beca MEC: plazos, escrito y recursos",
    "description": "Comprueba el plazo de tu notificación y dónde presentar alegaciones. Distingue el recurso de reposición de la vía judicial contra la resolución definitiva.",
    "lead": "Antes de reclamar, identifica el acto: una propuesta provisional permite alegaciones; la resolución definitiva tiene sus propias vías de recurso. El plazo y el canal de la notificación son la referencia para responder. El recurso de reposición es potestativo: no es un paso obligatorio antes de acudir a la vía judicial.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.becaseducacion.gob.es/dudas/como-reclamar.html",
        "label": "Ministerio: cómo reclamar la beca"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a123",
        "label": "BOE: artículo 123, reposición potestativa"
      }
    ],
    "cta": {
      "href": "https://www.becaseducacion.gob.es/dudas/como-reclamar.html",
      "label": "Consultar modelos y vías de reclamación"
    },
    "related": [
      {
        "href": "/becas/mec/denegada/por-patrimonio",
        "label": "Revisar una denegación por patrimonio"
      },
      {
        "href": "/becas/mec/estado",
        "label": "Consultar expediente y notificaciones"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "provisional",
        "title": "Alegaciones frente a una propuesta provisional",
        "paragraphs": [
          "El Ministerio indica normalmente diez días hábiles desde el día siguiente a consultar o descargar la notificación. Puede haber un plazo distinto: comprueba el documento recibido. Si pasan diez días naturales sin abrirlo, se considera comunicado y el plazo para alegar empieza al día siguiente.",
          "Usa el modelo o la hoja indicada en tu expediente. Los días hábiles excluyen sábados, domingos y festivos aplicables; un puente no convierte diez días hábiles en dos o tres días de respuesta."
        ]
      },
      {
        "id": "presentacion",
        "title": "Preparar y presentar el escrito",
        "paragraphs": [
          "Incluye identificación, número de expediente, acto o motivo que impugnas, hechos que pides corregir, pruebas y petición concreta. Relaciona cada documento con el error alegado: un escrito genérico no explica por qué el dato del expediente es incorrecto.",
          "Para alegaciones y reposición, la información ministerial remite a tu Unidad de Becas y a las vías de registro admitidas. La presentación electrónica se usa cuando esté indicada; también describe registros y envío por Correos en sobre abierto conforme al procedimiento administrativo. Comprueba las instrucciones y el horario del canal elegido y guarda el justificante."
        ]
      },
      {
        "id": "definitiva",
        "title": "Resolución definitiva: reposición o recurso judicial",
        "paragraphs": [
          "La orientación ministerial señala un mes para el recurso potestativo de reposición, contado desde el día siguiente a la publicación de la resolución definitiva. La Unidad de Becas tramita su remisión al Ministerio.",
          "También cabe acudir directamente a la jurisdicción contencioso-administrativa: el Ministerio señala dos meses desde el día siguiente a la publicación. El recurso judicial se presenta ante el órgano judicial competente, no como un escrito dirigido a la Unidad de Becas.",
          "Si eliges reposición, el artículo 123 impide interponer el contencioso hasta su resolución expresa o desestimación presunta. No sumes automáticamente «un mes más dos meses»: el cómputo posterior depende de esa situación y debe verificarse para tu recurso."
        ]
      },
      {
        "id": "pruebas",
        "title": "La prueba depende del motivo",
        "paragraphs": [
          "Contrasta los miembros computables, datos económicos, matrícula o documentación con lo que realmente utilizó la Administración. Si el origen es un dato fiscal o catastral incorrecto, consulta su rectificación y aporta la prueba pertinente dentro del plazo de la beca. Iniciar otra gestión no debe hacerte perder ese plazo."
        ]
      }
    ]
  },
  {
    id: "mec-no-cobrada",
    reviewedAt: "2026-09-16",
    sources: [{ label: "Ministerio: preguntas frecuentes sobre cobro", href: "https://www.becaseducacion.gob.es/dudas/faqs.html" }, { label: "Ministerio: tramitación y pagos", href: "https://www.becaseducacion.gob.es/dudas/asi-de-facil.html" }],
    pack: "becas",
    path: "/becas/mec/no-cobrada",
    h1: "No he cobrado la beca MEC: qué hacer",
    title: "Beca MEC sin cobrar: qué hacer y a quién reclamar",
    description:
      "Revisa la credencial, los movimientos bancarios y la cuenta de tu solicitud. Consulta con tu Unidad de Becas si el ingreso sigue pendiente.",
    lead:
      "Si no ves el ingreso, revisa primero la notificación y los movimientos de tu cuenta. No atribuyas el retraso a una causa concreta sin consultar tu expediente.",
    cta: { href: "https://sede.educacion.gob.es/portada.html", label: "Revisar el expediente en la sede del Ministerio" },
    related: [
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra" },
      { href: "/becas/mec/estado", label: "Consultar el estado" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "pasos",
        title: "Los pasos en orden",
        paragraphs: ["Comprobaciones antes de consultar un pago pendiente:"],
        lists: [
          [
            "Comprueba el estado y las notificaciones en Mis expedientes; guarda la credencial de concesión.",
            "Si solo te han concedido matrícula universitaria, ese importe se abona a la universidad: no esperes un ingreso en tu cuenta por ese componente.",
            "Verifica la cuenta de la solicitud: debe estar activa y a nombre del estudiante (o cotitular).",
            "Si hay error de cuenta, comunícalo cuanto antes a la Unidad de Becas, aunque ya se haya intentado el pago, y sigue sus instrucciones.",
            "Si el ingreso sigue pendiente, pregunta a tu Unidad de Becas e indica la referencia del expediente y la fecha de la notificación.",
          ],
        ],
      },
      {
        id: "variable",
        title: "Si falta parte de la beca",
        paragraphs: [
          "Revisa si las notificaciones recibidas corresponden a diferentes componentes de la beca. Para aclarar una diferencia entre lo concedido y lo ingresado, utiliza los datos de contacto oficiales de tu Unidad de Becas.",
        ],
      },
    ],
  },
  {
    "id": "mec-denegada-patrimonio",
    "pack": "becas",
    "path": "/becas/mec/denegada/por-patrimonio",
    "h1": "Beca denegada por patrimonio: límites 2026-27 y reclamación",
    "title": "Beca denegada por patrimonio: límites 2026-27 y reclamación",
    "description": "Umbrales patrimoniales de la beca general 2026-27: 47.200 € para fincas urbanas, coeficientes, fincas rústicas y suma de porcentajes. Qué revisar si te deniegan.",
    "lead": "Para 2026-27, el artículo 11 del Real Decreto 179/2026 y el artículo 20 de la convocatoria fijan 47.200 € para fincas urbanas, excluida la vivienda habitual y aplicando los coeficientes previstos. Se examina el patrimonio a 31 de diciembre de 2025. Tener renta baja no evita una denegación si se superan los límites patrimoniales.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2026-5713#a1-3",
        "label": "BOE: artículo 11, umbrales patrimoniales 2026-27"
      },
      {
        "href": "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191",
        "label": "Convocatoria 2026-27: artículo 20, páginas 16-17 (PDF)"
      },
      {
        "href": "https://www.becaseducacion.gob.es/dudas/como-reclamar.html",
        "label": "Ministerio: alegaciones y recursos"
      }
    ],
    "cta": {
      "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2026-5713#a1-3",
      "label": "Consultar los límites en el BOE"
    },
    "related": [
      {
        "href": "/becas/mec/alegaciones",
        "label": "Plazo y presentación de la reclamación"
      },
      {
        "href": "/becas/mec/requisitos",
        "label": "Requisitos de renta y estudios"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "umbrales",
        "title": "Qué se compara con cada umbral",
        "paragraphs": [
          "Los límites se aplican al conjunto de miembros computables, con las reglas y deducciones de la convocatoria."
        ],
        "lists": [
          [
            "Fincas urbanas: 47.200 € de valores catastrales, excluida la vivienda habitual. Se aplican coeficientes según el año de la última revisión; Navarra tiene un coeficiente específico.",
            "Construcciones en fincas rústicas, incluidos los bienes inmuebles de características especiales: 47.200 €, excluida la construcción que constituya la vivienda habitual, con los coeficientes correspondientes.",
            "Fincas rústicas sin el valor de las construcciones: 14.450 € por miembro computable.",
            "Rendimientos netos reducidos del capital mobiliario más saldo neto positivo de ganancias y pérdidas patrimoniales: 1.900 €. No equivale a cualquier aumento del valor del patrimonio; la norma enumera cantidades excluidas."
          ]
        ]
      },
      {
        "id": "conjunto",
        "title": "Hay una regla conjunta y deducciones",
        "paragraphs": [
          "Cuando hay varios elementos patrimoniales, se calcula qué porcentaje representa cada uno respecto de su umbral: si la suma supera el 100%, se deniega la beca aunque ninguno lo rebase por separado. La convocatoria también establece el límite de 172.000 € para los ingresos de actividades económicas que especifica.",
          "Para el cómputo patrimonial se deduce el 50% del valor de los elementos de miembros computables que no sean sustentadores principales. Revisa también las exclusiones del cálculo de capital mobiliario y ganancias: entre ellas figuran determinadas ayudas de vivienda y el Bono Cultural Joven. Consulta la lista completa antes de calcular."
        ]
      },
      {
        "id": "discrepancia-faq",
        "title": "Discrepancia con la FAQ ministerial",
        "paragraphs": [
          "En la consulta del 16 de septiembre de 2026, la FAQ ministerial mostraba 47.600 € para fincas urbanas. Esta guía utiliza los 47.200 € coincidentes en el real decreto y la convocatoria original enlazados. Comprueba el curso de la norma y cualquier modificación posterior."
        ]
      },
      {
        "id": "reclamar",
        "title": "Qué revisar antes de alegar",
        "paragraphs": [
          "Identifica el inmueble, titularidad y participación, valor catastral, año de revisión, miembros computables y ejercicio utilizados en el expediente. El valor catastral no es lo mismo que el valor de referencia: evita intercambiarlos. Los coeficientes forman parte del cálculo inicial, no son una bonificación reservada a quien recurre.",
          "Si detectas un dato incorrecto, reúne la prueba que lo acredite y sigue el canal y plazo de tu notificación. No hace falta pedir indiscriminadamente documentos de pago: la prueba depende del error concreto. Consulta con la Unidad de Becas cómo aportar una rectificación fiscal o catastral sin dejar vencer el plazo de reclamación."
        ]
      }
    ]
  },
  {
    "id": "mec-erasmus",
    "pack": "becas",
    "path": "/becas/mec/compatibilidad/erasmus",
    "h1": "Beca MEC y Erasmus: compatibilidad, matrícula y residencia",
    "title": "Beca MEC y Erasmus: compatibilidad, matrícula y residencia",
    "description": "La beca general y Erasmus son compatibles. Revisa matrícula, reconocimiento de la movilidad y condiciones de residencia sin dar por concedido ningún componente.",
    "lead": "La beca general del Ministerio es compatible con Erasmus. Esa compatibilidad permite combinar las ayudas si cumples sus requisitos; no concede automáticamente todos los componentes de la beca MEC. Antes de salir, comprueba con tu universidad la matrícula, el acuerdo de aprendizaje y los datos que recibirá la Unidad de Becas.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.becaseducacion.gob.es/dudas/faqs.html",
        "label": "Ministerio: compatibilidad de becas"
      },
      {
        "href": "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191",
        "label": "Convocatoria 2026-27: artículos 7 y 55 (PDF)"
      },
      {
        "href": "https://erasmus-plus.ec.europa.eu/es/opportunities/individuals/students/studying-abroad",
        "label": "Comisión Europea: acuerdo de aprendizaje y reconocimiento"
      },
      {
        "href": "https://polisocio.ugr.es/internacionalizacion/movilidad-internacional/movilidad-saliente",
        "label": "Universidad de Granada: matrícula de movilidad y beca MEC"
      }
    ],
    "cta": {
      "href": "https://www.becaseducacion.gob.es/dudas/faqs.html",
      "label": "Consultar la compatibilidad en el Ministerio"
    },
    "related": [
      {
        "href": "/becas/erasmus",
        "label": "Encontrar la convocatoria Erasmus"
      },
      {
        "href": "/becas/erasmus/complemento-regional",
        "label": "Complemento de Andalucía 2026-27"
      },
      {
        "href": "/becas/mec/requisitos",
        "label": "Requisitos de la beca general"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "compatibilidad",
        "title": "Dos ayudas con condiciones propias",
        "paragraphs": [
          "La compatibilidad con Erasmus figura en el artículo 55 de la convocatoria general 2026-27 y en la FAQ ministerial. Para determinar los componentes se consideran las circunstancias de la universidad en la que estás matriculado.",
          "Si solicitas otra ayuda, revisa sus bases y el procedimiento de compatibilidad que indica el Ministerio. No extrapoles la compatibilidad MEC-Erasmus a cualquier complemento o ayuda de alojamiento."
        ]
      },
      {
        "id": "creditos",
        "title": "Matrícula y reconocimiento de la movilidad",
        "paragraphs": [
          "El reconocimiento de las asignaturas cursadas en Erasmus no permite concluir que todos esos créditos dejen de contar como matriculados para la beca MEC. Como referencia concreta, la Facultad de Ciencias Políticas y Sociología de la UGR indica que su cómputo mínimo incluye todo lo matriculado en el curso, tanto para cursar fuera como en la UGR.",
          "Firma el acuerdo de aprendizaje con las instituciones de origen y destino y conserva la certificación de resultados. La Comisión Europea explica que la institución de origen debe reconocer los créditos completados conforme al acuerdo e incorporarlos al expediente. Confirma con tu coordinador y la Unidad de Becas cómo constarán tu matrícula y resultados en tu caso.",
          "Los requisitos para obtener o renovar beca y las causas de reintegro se comprueban por separado. No apliques un único porcentaje a cualquier estudio o situación."
        ]
      },
      {
        "id": "residencia",
        "title": "La estancia Erasmus no concede por sí sola residencia",
        "paragraphs": [
          "Pasar un curso fuera no garantiza la cuantía de residencia. El artículo 7 exige, entre otras condiciones, acreditar la necesidad de residir fuera del domicilio familiar durante todo el curso y gastos de alquiler u hospedaje; también se aplican condiciones de estudios, matrícula y renta.",
          "Consulta con la Unidad de Becas qué documentación corresponde a tu matrícula y movilidad. Conserva contrato y justificantes de alojamiento y comprueba el importe concedido en la notificación. No presupongas que el alojamiento en destino basta para reconocer este componente."
        ]
      }
    ]
  },
  {
    id: "colaboracion", reviewedAt: "2026-09-14", pack: "becas", path: "/becas/colaboracion",
    h1: "Becas de colaboración 2026-27: requisitos y plazo",
    title: "Becas de colaboración 2026-27: solicitud y requisitos",
    description: "Becas de colaboración de 2.000 € para último curso de grado o primero de máster. Plazo hasta el 22 de septiembre de 2026 y proyecto de departamento.",
    lead: "La convocatoria 2026-27 ofrece 2.111 becas de 2.000 € para colaboración en departamentos universitarios. La solicitud finaliza el 22 de septiembre a las 15:00, hora peninsular. Se dirige a último curso de grado o primero de máster oficial, con requisitos distintos según los estudios.",
    cta: { ...AID_SOURCES.collaboration, label: "Consultar convocatoria y solicitud oficial" },
    sources: [AID_SOURCES.collaboration],
    related: [{ href: "/ayudas", label: "Calendario de ayudas" }, { href: "/becas/mec", label: "Beca general" }],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      { id: "requisitos", title: "Comprueba los requisitos de grado o máster", paragraphs: ["No apliques al máster las condiciones de créditos del grado. Abre el apartado de requisitos de la convocatoria y localiza tu modalidad; comprueba matrícula, rendimiento académico y las condiciones sobre titulaciones previas."] },
      { id: "proyecto", title: "Prepara el proyecto con el departamento", paragraphs: ["La solicitud incluye una plantilla con el proyecto, que evalúa el departamento. Descárgala desde la convocatoria y comprueba que está cumplimentada antes de adjuntarla."], lists: [["Contacta con el departamento con tiempo para acordar el proyecto.", "Revisa que todos los archivos se abran y sean legibles.", "Completa el registro y conserva el justificante de presentación."]] },
      { id: "seguimiento", title: "Después del registro", paragraphs: ["Guarda una copia del proyecto que presentaste y revisa las notificaciones de la sede. El número de registro acredita la presentación, pero no equivale a una concesión. Si recibes un requerimiento, responde a lo que pide tu expediente dentro del plazo indicado."] },
    ],
  },
  {
    "id": "beca-salario-gva",
    "pack": "becas",
    "path": "/becas/autonomicas/beca-salario-gva",
    "h1": "Beca Manuela Solís GVA: curso y estado de la convocatoria",
    "title": "Beca Manuela Solís GVA: curso y estado de la convocatoria",
    "description": "Consulta la beca Manuela Solís, procedimiento GVA 95885. Curso 2025-26, solicitud cerrada y diferencia entre solicitud, subsanación y recursos.",
    "lead": "La ficha oficial de la beca Manuela Solís consultada el 16 de septiembre de 2026 corresponde al curso 2025-26 y muestra la solicitud cerrada: estuvo abierta del 14 de noviembre al 15 de diciembre de 2025. Una fase de subsanación disponible no permite presentar una solicitud nueva.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.gva.es/es/inicio/procedimientos?id_proc=95885",
        "label": "Generalitat: procedimiento 95885, Manuela Solís"
      }
    ],
    "cta": {
      "href": "https://www.gva.es/es/inicio/procedimientos?id_proc=95885",
      "label": "Consultar la convocatoria y sus trámites en GVA"
    },
    "related": [
      {
        "href": "/becas/mec",
        "label": "Beca general del Ministerio"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "estudios",
        "title": "Qué estudios comprende",
        "paragraphs": [
          "La convocatoria incluye grados universitarios, másteres habilitantes y grados en enseñanzas artísticas superiores en modalidad presencial, dentro de su ámbito valenciano. Incluye universidades públicas y privadas; no todos los másteres ni todos los estudios superiores.",
          "Consulta en la ficha los requisitos económicos, académicos y personales y el importe aplicable. No basta con estudiar en la Comunitat Valenciana para tener derecho a la ayuda."
        ]
      },
      {
        "id": "fase",
        "title": "Comprobar la fase y presentar documentación",
        "paragraphs": [
          "Selecciona el trámite que corresponda a tu expediente: solicitud, subsanación, aportación o recurso. Verifica el plazo concreto y conserva el resguardo electrónico. Las fechas de recursos no reabren la solicitud.",
          "Para 2026-27, comprueba que exista convocatoria de ese curso antes de usar fechas o requisitos anteriores. Esta guía no anticipa su calendario."
        ]
      }
    ]
  },
  {
    id: "ayudas-jcyl",
    reviewedAt: "2026-09-16",
    pack: "becas",
    path: "/becas/autonomicas/ayudas-estudio-cyl",
    h1: "Ayudas al estudio de Castilla y León: requisitos y convocatoria",
    title: "Ayudas al estudio JCyL: requisitos y convocatoria",
    description: "Las ayudas universitarias de Castilla y León 2025-26 complementaban la beca MEC. Requisitos y consulta de nuevas convocatorias, sin anticipar fechas.",
    lead: "La convocatoria 2025-2026 exigía haber obtenido beca del Ministerio para ese curso. No era una alternativa general para quien perdió el plazo MEC. Para otro curso, consulta sus propias bases y fechas.",
    cta: { href: "https://www.educa.jcyl.es/universidad/es/becas_universitarias/ayudas-estudio", label: "Consultar convocatorias en JCyL" },
    sources: [{ label: "JCyL: modalidades y convocatoria 2025-2026", href: "https://www.educa.jcyl.es/universidad/es/destacados/ayudas-estudio-alumnado-universitario-grado-master-universi" }, { label: "Universidad de Burgos: convocatoria 2025-2026", href: "https://www.ubu.es/te-interesa/ayudas-al-estudio-de-la-junta-de-castilla-y-leon-para-alumnos-de-grado-y-master" }],
    related: [{ href: "/becas/mec", label: "Beca MEC" }],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "coordinacion",
        title: "Requisitos de la convocatoria 2025-2026",
        paragraphs: ["Se dirigía a estudiantes empadronados en Castilla y León, matriculados en grado o máster oficial en una universidad de la comunidad y con beca del Ministerio. En grado había modalidades de renta y aprovechamiento académico; en máster, de aprovechamiento académico. La convocatoria distingue umbrales económicos y créditos de matrícula según estudios y duración del plan."],
      },
      {
        id: "calendario",
        title: "Consultar el calendario del curso",
        paragraphs: ["El plazo 2025-2026 fue del 21 de octubre al 17 de noviembre de 2025 y está cerrado. Esas fechas no confirman el calendario de 2026-2027. Comprueba la convocatoria publicada, conserva el justificante y revisa las notificaciones del expediente. La Junta advierte que cumplimentar el formulario no equivale a registrarlo: comprueba que obtuviste el resguardo de presentación."],
      },
    ],
  },
];
