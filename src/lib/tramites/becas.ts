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
    sources: [{ label: "BOE: prórroga del plazo de solicitud 2026-27", href: "https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-16327" }],
    pack: "becas",
    path: "/becas/mec",
    h1: "Beca MEC 2026-27: guía completa del trámite",
    title: "Beca MEC 2026-27: plazos, estado y cobro explicados",
    description:
      "Beca MEC 2026-27: solicitud cerrada el 19 de mayo, modificación en septiembre y consulta del estado. Enlaces oficiales para seguir tu expediente.",
    lead: `La beca MEC 2026-27 se solicitó en la sede electrónica del Ministerio de Educación entre el ${MEC_PLAZO_2627}. El plazo está cerrado: ahora toca modificar datos, subsanar, resolver y cobrar. Te explicamos cada fase con enlaces oficiales.`,
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: relMec,
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "fases",
        title: "Las fases del curso 2026-27",
        paragraphs: [
          `Solicitud: cerrada el 19 de mayo a las 15:00, hora peninsular, tras la prórroga oficial. La ventana de modificación de datos es del ${MEC_MODIFICACION_VENTANA}. Revisa después las notificaciones de tu expediente: la resolución y el pago no tienen una fecha única para todos los solicitantes.`,
        ],
      },
      {
        id: "que-cubre",
        title: "Qué cubre (y qué es la matrícula)",
        paragraphs: [
          `La beca enlaza varios componentes: matrícula (se paga directamente a la universidad; si ya pagaste, te lo reintegran tras la resolución), cuantía fija y variable ligada a la renta, y componentes como la residencia (hasta ${MEC_RESIDENCIA_EUR} este curso). La solicitud es única y gratuita: no existe gestor oficial, y ninguna fase requiere pagar a nadie.`,
        ],
      },
      {
        id: "si-llegaste-tarde",
        title: "Si llegaste tarde en mayo",
        paragraphs: [
          `La modificación de septiembre no sustituye la solicitud inicial. Puedes consultar las ayudas de apoyo educativo ACNEAE (hasta el ${MEC_ACNEAE_HASTA}), las becas de colaboración (hasta el ${MEC_COLABORACION_HASTA}) y otras convocatorias autonómicas o municipales. Cada una tiene requisitos propios; no todas sirven para los mismos estudios o situaciones.`,
        ],
      },
    ],
  },
  {
    id: "mec-plazo",
    sources: [{ label: "BOE: prórroga del plazo hasta el 19 de mayo", href: "https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-16327" }],
    pack: "becas",
    path: "/becas/mec/plazo",
    h1: "Plazo de la beca MEC 2026-27: qué está abierto ahora",
    title: "Plazo beca MEC 2026-27: qué está abierto ahora",
    description:
      "Solicitud MEC 2026-27 cerrada el 19 de mayo a las 15:00. Modificación del 7 al 28 de septiembre para solicitudes presentadas. Otras ayudas y sus plazos.",
    lead: `El plazo de solicitud de la beca MEC 2026-27 fue del ${MEC_PLAZO_2627}, con cierre a las 15:00, hora peninsular, tras la prórroga publicada en el BOE. La modificación de septiembre corresponde a solicitudes ya presentadas. Si no la solicitaste, consulta otras convocatorias disponibles.`,
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: relMec,
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "abierto",
        title: "Lo que está abierto en estas fechas",
        paragraphs: [
          `Modificación de datos: del ${MEC_MODIFICACION_VENTANA} (universidad, titulación, domicilio, cuenta). Ayudas de apoyo educativo ACNEAE: hasta el ${MEC_ACNEAE_HASTA}. Becas de colaboración: hasta el ${MEC_COLABORACION_HASTA}. Ayudas al estudio de MUFACE: hasta el ${MUFACE_HASTA}. Y varias autonómicas y municipales con calendario propio (la guía de becas autonómicas las sigue).`,
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
    pack: "becas",
    path: "/becas/mec/modificar-datos",
    h1: "Modificar datos de la beca MEC (7-28 de septiembre)",
    title: "Modificar datos beca MEC: plazo del 7 al 28 de septiembre",
    description:
      "Universidad, titulación, domicilio o cuenta bancaria: el septiembre de la beca MEC tiene ventana propia del 7 al 28. Qué se puede cambiar y qué pasa fuera de plazo.",
    lead: `Del ${MEC_MODIFICACION_VENTANA} puedes modificar tu solicitud de beca MEC 2026-27 en la sede electrónica del Ministerio: universidad, titulación, domicilio o cuenta bancaria. Es gratuito y no necesita intermediarios. Fuera de plazo, tendrás que dirigirte a tu Unidad de Becas.`,
    cta: { href: BECAS_URL, label: "Sede electrónica del Ministerio" },
    related: relMec,
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "que-cambia",
        title: "Qué se puede cambiar (y qué no)",
        paragraphs: [
          "Sí: centro y titulación (el cambio típico tras la adjudicación de plaza en septiembre), domicilio, cuenta de cobro y datos académicos de la solicitud. No: los datos económicos de la unidad familiar del ejercicio cerrado (los contrasta la Agencia Tributaria) ni la convocatoria en sí. Si cambiaste de estudios, recuerda que la convocatoria exige matricular créditos adicionales a los que te falten: la modificación debe reflejar tu matrícula real.",
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
            "¿El domicilio es el actual? Las notificaciones electrónicas no dependen de él, pero los datos censales sí se cruzan.",
          ],
        ],
      },
      {
        id: "fuera",
        title: "Si te pasas del 28",
        paragraphs: [
          "Los cambios posteriores se gestionan directamente con la Unidad de Becas que tramita tu expediente (la que verás en tus notificaciones), y no todos son posibles: el cambio de cuenta de cobro suele admitirse hasta antes del pago, pero el cambio de estudios fuera de ventana puede dejar la evaluación con los datos antiguos. La regla práctica: si sabes que algo cambió, no esperes al 27 por la tarde.",
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
    reviewedAt: "2026-09-07",
    sources: [{ label: "Ministerio: preguntas frecuentes sobre cobro", href: "https://www.becaseducacion.gob.es/dudas/faqs.html" }, { label: "Ministerio: tramitación y pagos", href: "https://www.becaseducacion.gob.es/dudas/asi-de-facil.html" }],
    pack: "becas",
    path: "/becas/mec/cuando-se-cobra",
    h1: "Cuándo se cobra la beca MEC 2026-27",
    title: "Cuándo se cobra la beca MEC 2026-27: calendario",
    description:
      "Consulta cómo se abona la beca MEC, qué revisar en la notificación y dónde preguntar si el ingreso no llega.",
    lead:
      "La beca puede abonarse en varios pagos. La notificación de concesión permite comprobar qué cantidades te corresponden; no establece por sí sola el día del ingreso.",
    cta: { href: BECAS_URL, label: "Consultar pago (sede oficial)" },
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
    id: "mec-estado",
    pack: "becas",
    path: "/becas/mec/estado",
    h1: "Consultar el estado de tu beca MEC",
    title: "Consultar estado beca MEC: todos los estados explicados",
    description:
      "Dónde mirar el expediente (Mis expedientes, con Cl@ve o DNIe) y qué significa cada estado: en tramitación, resulta, abonada, rechazada. Tabla estado-acción.",
    lead:
      "Consulta el estado de tu beca MEC en la sede electrónica de educacion.gob.es, apartado Mis expedientes, con Cl@ve, certificado digital o DNIe. Los estados van de \"en tramitación\" a \"resulta\", \"abonada\" o \"rechazada\". Revisa también Mis notificaciones: allí llegan los requerimientos de subsanación.",
    cta: { href: BECAS_URL, label: "Sede electrónica (Mis expedientes)" },
    related: [
      { href: "/becas/mec/subsanacion", label: "Subsanar un requerimiento" },
      { href: "/becas/mec/alegaciones", label: "Alegaciones" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "tabla",
        title: "Estado y acción",
        paragraphs: ["La correspondencia práctica entre lo que ves y lo que toca:"],
        lists: [
          [
            "En tramitación: nada que hacer; si pasa mucho tiempo, revisa Mis notificaciones por si hay requerimiento esperando.",
            "Trámite de audiencia o requerimiento: plazo de 10 días hábiles para subsanar o alegar (no mirarlo no lo detiene).",
            "Resulta (provisional): lee el motivo si es denegatoria; 10 días hábiles de alegaciones.",
            "Resuelta favorable: espera la credencial y el pago (4-5 semanas).",
            "Abonada: comprueba importe; la variable puede seguir pendiente.",
            "Rechazada por la entidad bancaria: cuenta cerrada o errónea; da una nueva cuanto antes.",
          ],
        ],
      },
      {
        id: "acceso",
        title: "Si no puedes entrar",
        paragraphs: [
          "Accede con las credenciales del solicitante y comprueba que consultas el curso y la convocatoria correctos. Si no puedes entrar o no encuentras el expediente, utiliza la ayuda oficial o contacta con tu Unidad de Becas; no esperes un plazo supuesto de actualización del DNI mientras vence una notificación.",
        ],
      },
    ],
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
    id: "mec-alegaciones",
    pack: "becas",
    path: "/becas/mec/alegaciones",
    h1: "Alegaciones a la beca MEC denegada",
    title: "Alegaciones beca MEC: plazo, modelo y dónde",
    description:
      "10 días hábiles desde la resolución provisional para alegar; 1 mes de recurso de reposición tras la definitiva; 2 meses de vía contenciosa. Cómo montar el escrito y a dónde va.",
    lead:
      "Tienes 10 días hábiles desde la notificación para presentar alegaciones contra la denegación (o la cuantía) de tu beca MEC ante tu Unidad de Becas. Si no prosperan, cabe recurso de reposición. Identifica primero el motivo exacto: renta, patrimonio, valores catastrales o documentación.",
    cta: { href: BECAS_URL, label: "Presentar alegaciones (sede)" },
    related: [
      { href: "/becas/mec/denegada/por-patrimonio", label: "Denegada por patrimonio" },
      { href: "/becas/mec/estado", label: "Consultar el estado" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "escala",
        title: "La escalera de recursos",
        paragraphs: [
          "Primera: alegaciones contra la resolución provisional, 10 días hábiles. Segunda: recurso de reposición contra la definitiva, 1 mes. Tercera: contencioso-administrativo, 2 meses (aquí ya conviene valorar ayuda letrada). Cada peldaña se presenta por la sede electrónica dirigida a la Unidad de Becas que firmó tu resolución. El escrito no necesita formato sacramental: identificación, resolución impugnada, hecho que corregir, prueba y petición.",
        ],
      },
      {
        id: "plazos",
        title: "Los plazos en la práctica",
        paragraphs: [
          "Diez días hábiles son menos días de los que parecen: quita sábados, domingos y festivos (locales incluidos) y una resolución notificada en vísperas de puente deja dos o tres días reales. El cómputo arranca al día siguiente de consultar o descargar la notificación, y aunque no la consultes, a los diez días naturales figura caducada y el reloj corre igual. La presentación es electrónica y hasta las 23:59 del último día: la sede no cierra a las tres de la tarde como la ventanilla de toda la vida.",
        ],
      },
      {
        id: "motivos",
        title: "El motivo manda",
        paragraphs: [
          "Denegada por renta: revisa miembros computables de la unidad familiar (un hermano fuera de casa que sigue sumando es un clásico) y la renta del propio estudiante. Por patrimonio: la vivienda habitual está excluida; el problema suele ser el valor catastral de otras fincas (guía de denegada por patrimonio con umbrales del curso). Por documentación: si ya aportaste en otra vía, adjunta el justificante de registro. Por rendimiento: los créditos de la convocatoria extraordinaria computan.",
        ],
      },
    ],
  },
  {
    id: "mec-no-cobrada",
    reviewedAt: "2026-09-07",
    sources: [{ label: "Ministerio: preguntas frecuentes sobre cobro", href: "https://www.becaseducacion.gob.es/dudas/faqs.html" }, { label: "Ministerio: tramitación y pagos", href: "https://www.becaseducacion.gob.es/dudas/asi-de-facil.html" }],
    pack: "becas",
    path: "/becas/mec/no-cobrada",
    h1: "No he cobrado la beca MEC: qué hacer",
    title: "Beca MEC sin cobrar: qué hacer y a quién reclamar",
    description:
      "Revisa la credencial, los movimientos bancarios y la cuenta de tu solicitud. Consulta con tu Unidad de Becas si el ingreso sigue pendiente.",
    lead:
      "Si no ves el ingreso, revisa primero la notificación y los movimientos de tu cuenta. No atribuyas el retraso a una causa concreta sin consultar tu expediente.",
    cta: { href: BECAS_URL, label: "Revisar expediente (sede)" },
    related: [
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra" },
      { href: "/becas/mec/estado", label: "Consultar el estado" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "pasos",
        title: "Los pasos en orden",
        paragraphs: ["La ruta de reclamación por impago:"],
        lists: [
          [
            "Comprueba el estado y las notificaciones en Mis expedientes; guarda la credencial de concesión.",
            "Verifica la cuenta de la solicitud: debe estar activa y a nombre del estudiante (o cotitular).",
            "Si hay error de cuenta, comunícalo a la Unidad de Becas antes del siguiente pago, no después.",
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
    id: "mec-denegada-patrimonio",
    pack: "becas",
    path: "/becas/mec/denegada/por-patrimonio",
    h1: "Beca denegada por patrimonio: motivos y cómo reclamar",
    title: "Beca denegada por patrimonio: motivos y cómo reclamar",
    description:
      "Umbrales reales del curso 2026-27: fincas urbanas (no la vivienda habitual) sobre 47.600 €, rústicas 14.450 € por miembro, y denegación si la suma de porcentajes supera el 100%. Cómo alegar.",
    lead:
      "La beca MEC se deniega por patrimonio cuando la unidad familiar supera los límites de la convocatoria: en el curso 2026-27, valor catastral de fincas urbanas (sin contar la vivienda habitual) por encima de 47.600 €, fincas rústicas por encima de 14.450 € por miembro, y denegación si la suma de porcentajes supera el 100%. Si el dato catastral es erróneo, puedes alegar en 10 días hábiles.",
    cta: { href: BECAS_URL, label: "Alegar (sede electrónica)" },
    related: [
      { href: "/becas/mec/alegaciones", label: "Alegaciones: cómo montar el escrito" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "umbrales",
        title: "Los umbrales del curso (referencias verificadas)",
        paragraphs: [
          "La vivienda habitual está excluida del patrimonio. Las referencias del curso: incremento de patrimonio superior a 1.900 euros, fincas urbanas (excluida la habitual) por encima de 47.600 euros, fincas rústicas por encima de 14.450 euros por miembro computable, y la regla de la suma: se deniega si la suma de los porcentajes de cada elemento sobre su umbral supera el 100 por cien. El curso anterior manejaba 42.900 y 13.130: los umbrales se actualizan cada año y lo que manda es la convocatoria vigente.",
        ],
      },
      {
        id: "alegar",
        title: "Dónde está el error típico",
        paragraphs: [
          "El valor catastral de referencia puede estar disparado por la revisión catastral del municipio: en alegaciones se pueden aplicar coeficientes correctores según el año de revisión (la propia convocatoria los regula). Otro clásico: fincas a nombre de toda la familia heredadas y sin repartir, y actividades económicas dadas de baja pero que siguen en el dato fiscal del ejercicio. Pide nota simple y certificado catastral actualizados antes de escribir la alegación.",
        ],
      },
    ],
  },
  {
    id: "mec-erasmus",
    pack: "becas",
    path: "/becas/mec/compatibilidad/erasmus",
    h1: "¿Beca MEC y Erasmus a la vez?",
    title: "Beca MEC y Erasmus: compatibles, con matices clave",
    description:
      "La beca MEC es compatible con la beca Erasmus+ y con las de colaboración. El matiz: los créditos reconocidos no computan como matriculados, y con estancia de curso completo puedes reclamar el componente de residencia.",
    lead:
      "Sí: la beca MEC es compatible con la beca Erasmus y con las becas de colaboración, lo dice el propio FAQ del Ministerio. Los matices que se te pueden torcer: los créditos reconocidos en destino no computan como matriculados y el rendimiento se acaba evaluando; si tu estancia es de curso completo, puedes reclamar el componente de residencia.",
    cta: { href: BECAS_URL, label: "FAQ oficial de becas" },
    related: relMec,
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "compatibilidad",
        title: "Lo compatible y lo acumulable",
        paragraphs: [
          "MEC y Erasmus+ pueden cobrarse en el mismo curso, y también MEC y beca de colaboración. Con las autonómicas depende de la convocatoria de cada comunidad (la regla habitual: que no cubran la misma finalidad). Si te vas un curso completo, el Ministerio entiende que estás fuera del domicilio familiar: reclama en tu solicitud el componente de residencia.",
        ],
      },
      {
        id: "creditos",
        title: "El matiz de los créditos (el que arruina cursos)",
        paragraphs: [
          "Los créditos reconocidos, convalidados o transferidos durante la movilidad no computan como créditos matriculados a efectos de la beca: el rendimiento se evalúa con lo que conste en tu expediente de origen tras el reconocimiento. Planifica con tu coordinador académico cómo quedará el expediente en junio, porque si al final no superas el porcentaje exigido (50 de cada 100 matriculados; 40 en enseñanzas técnicas), entra la devolución.",
        ],
      },
    ],
  },
  {
    id: "colaboracion",
    pack: "becas",
    path: "/becas/colaboracion",
    h1: "Becas de colaboración 2026: plazo hasta el 22 de septiembre",
    title: "Becas de colaboración 2026: plazo hasta el 22 de septiembre",
    description:
      "2.000 euros colaborando en un departamento universitario: 2.111 plazas, nota de corte por rama (7,25 a 8,00) y cierre el 22 de septiembre de 2026. Requisitos y proyecto, paso a paso.",
    lead: `Las becas de colaboración del Ministerio se piden este curso hasta el ${MEC_COLABORACION_HASTA} a las 15:00: 2.111 plazas de 2.000 euros por colaborar en un departamento. Requisitos duros: estar en último curso, tener el 75 por cien superado y nota mínima por rama. Compatible con la beca MEC.`,
    cta: { href: BECAS_URL, label: "Solicitar (sede electrónica)" },
    related: [{ href: "/becas/mec", label: "Beca MEC" }],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "requisitos",
        title: "Los requisitos que filtran",
        paragraphs: [
          "Estar matriculado de todo lo que te falta para terminar el grado o máster en el curso de la beca, tener superado al menos el 75 por cien de créditos y la nota media mínima por rama: 7,25 en Ingeniería y Arquitectura, 7,70 en Ciencias y Sociales-Jurídicas, 7,80 en Salud, 8,00 en Artes y Humanidades. La solicitud es 100 por cien telemática y necesita un proyecto avalado y puntuado por el departamento: sin profesor que avale, no hay beca.",
        ],
      },
      {
        id: "practica",
        title: "Cómo se monta el proyecto",
        paragraphs: [
          "Habla en julio o principios de septiembre con el departamento (o centro del Ministerio) donde quieras colaborar: ellos rellenan la plantilla de proyecto que subes con la solicitud. Cuanto más concreto el proyecto y más puntúe el departamento, mejor posición en el baremo. La beca se disfruta durante el curso académico y el importe son 2.000 euros.",
        ],
      },
    ],
  },
  {
    id: "beca-salario-gva",
    pack: "becas",
    path: "/becas/autonomicas/beca-salario-gva",
    h1: "Beca Manuela Solís de la Comunitat Valenciana",
    title: "Beca Manuela Solís GVA: convocatoria y solicitud",
    description: "Consulta la beca Manuela Solís en su procedimiento oficial. Cómo distinguir solicitud, subsanación y recursos y evitar confundirla con la exención de tasas.",
    lead: "La beca Manuela Solís tiene un procedimiento propio en la Generalitat, con código 95885. La exención de tasas universitarias corresponde a otra ayuda. Consulta la convocatoria del curso que te interesa antes de dar por abierto un plazo.",
    cta: { href: "https://www.gva.es/es/inicio/procedimientos?id_proc=95885", label: "Consultar Manuela Solís en GVA" },
    sources: [{ label: "Generalitat: procedimiento 95885", href: "https://www.gva.es/es/inicio/procedimientos?id_proc=95885" }],
    related: [{ href: "/becas/mec", label: "Beca MEC" }],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "ventanas",
        title: "Identificar el plazo correcto",
        paragraphs: ["Una fecha de subsanación o recurso no abre una nueva solicitud de beca. En la ficha de la sede comprueba la fase, el curso académico y el estado del plazo; no deduzcas nuevas convocatorias a partir de los meses de años anteriores."],
      },
      {
        id: "que-cubre",
        title: "Requisitos y cuantía",
        paragraphs: ["La convocatoria 2025-2026 comprende universidades públicas y privadas del sistema valenciano y enseñanzas artísticas superiores. Revisa sus condiciones de renta, estudios y rendimiento académico, así como la cuantía aplicable a tu caso. Guarda la convocatoria y el justificante de presentación junto con tus documentos."],
      },
    ],
  },
  {
    id: "ayudas-jcyl",
    reviewedAt: "2026-09-07",
    pack: "becas",
    path: "/becas/autonomicas/ayudas-estudio-cyl",
    h1: "Ayudas al estudio de Castilla y León: requisitos y convocatoria",
    title: "Ayudas al estudio JCyL: requisitos y convocatoria",
    description: "Las ayudas universitarias de Castilla y León 2025-26 complementaban la beca MEC. Requisitos y consulta de nuevas convocatorias, sin anticipar fechas.",
    lead: "La convocatoria 2025-2026 exigía haber obtenido beca del Ministerio para ese curso. No era una alternativa general para quien perdió el plazo MEC. Para otro curso, consulta sus propias bases y fechas.",
    cta: { href: "https://www.educa.jcyl.es/universidad/es/becas_universitarias/ayudas-estudio", label: "Consultar convocatorias en JCyL" },
    sources: [{ label: "Universidad de Burgos: convocatoria 2025-2026", href: "https://www.ubu.es/te-interesa/ayudas-al-estudio-de-la-junta-de-castilla-y-leon-para-alumnos-de-grado-y-master" }],
    related: [{ href: "/becas/mec", label: "Beca MEC" }],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "coordinacion",
        title: "Requisitos de la convocatoria 2025-2026",
        paragraphs: ["Se dirigía a estudiantes empadronados en Castilla y León, matriculados en grado o máster oficial en una universidad de la comunidad y con beca del Ministerio. Incluía ayuda de renta y de aprovechamiento académico, con condiciones específicas."],
      },
      {
        id: "calendario",
        title: "Consultar el calendario del curso",
        paragraphs: ["El plazo 2025-2026 fue del 21 de octubre al 17 de noviembre de 2025 y está cerrado. Esas fechas no confirman el calendario de 2026-2027. Comprueba la convocatoria publicada, conserva el justificante y revisa las notificaciones del expediente."],
      },
    ],
  },
];
