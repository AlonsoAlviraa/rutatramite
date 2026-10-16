/**
 * Nichos becas, segunda tanda (verificados en la corrida de research de 2026-09-04).
 * Requisitos, bachillerato, FP, devolución, cambio de estudios, renuncia,
 * MUFACE, residencia, Erasmus y complemento regional.
 */
import {
  BECAS_URL,
  DISCLAIMER_GENERICO,
  MEC_PLAZO_2627,
  MEC_RESIDENCIA_EUR,
  MUFACE_HASTA,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

export const BECAS_NICHOS2_GUIDES: Guide[] = [
  {
    id: "mecaRequisitosRentaNota",
    reviewedAt: "2026-09-16",
    sources: [{ label: "BOE: umbrales y cuantías 2026-27", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-5713" }, { label: "Convocatoria general 2026-27: artículos 48 y 68 (PDF)", href: "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191" }, { label: "Ministerio de Educación: requisitos de grado y máster", href: "https://www.becaseducacion.gob.es/becas-y-ayudas/universidad-grado-master/que-necesitas.html" }],
    pack: "becas",
    path: "/becas/mec/requisitos",
    h1: "Requisitos de la beca MEC 2026-27: renta, patrimonio y nota",
    title: "Requisitos beca MEC 2026-27: renta, patrimonio y nota",
    description:
      "Requisitos de la beca MEC 2026-27: renta, patrimonio y rendimiento académico según tus estudios. Consulta el requisito que corresponde a tu curso.",
    lead: `Para la beca general del Ministerio 2026-27 debes cumplir requisitos generales, económicos y académicos. Renta y patrimonio se comprueban por separado, pero no son los únicos filtros: también importan tu situación personal, las titulaciones previas y los estudios. El plazo ordinario fue del ${MEC_PLAZO_2627}; la guía de plazos explica los supuestos excepcionales.`,
    cta: { href: BECAS_URL, label: "Ver la convocatoria en el portal oficial" },
    related: [
      { href: "/becas/mec", label: "Beca MEC: convocatoria y administración competente" },
      { href: "/becas/mec/plazo", label: "Plazo ordinario y solicitudes excepcionales" },
      { href: "/becas/fp", label: "Requisitos para FP" },
      { href: "/becas/mec/bachillerato", label: "Requisitos para Bachillerato" },
      { href: "/becas/mec/denegada/por-patrimonio", label: "Beca denegada por patrimonio: qué hacer" },
      { href: "/becas/mec/no-devolver", label: "No devolver la beca: los créditos que debes superar" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
      { href: "/alquiler", label: "Ayudas al alquiler por comunidad" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      { id: "generales", title: "Requisitos personales y convocatoria aplicable", paragraphs: ["Comprueba nacionalidad y, cuando corresponda, residencia. La información ministerial distingue la ciudadanía de la UE, la residencia permanente o el trabajo para acceder a todos los componentes universitarios, y los supuestos de personas no comunitarias. Para estas últimas señala minoría de edad o permiso de residencia a 31 de diciembre de 2025; una autorización de estancia por sí sola no basta.", "También se exige no tener un título de nivel igual o superior al de los estudios para los que solicitas beca, con las excepciones que prevea la convocatoria. Comprueba la administración competente: el artículo 68 distingue Cataluña y País Vasco. Los ejemplos académicos siguientes son de grado y máster; FP y Bachillerato tienen sus propias reglas."] },
      {
        id: "renta",
        title: "Renta: umbrales por tramos según los miembros de la unidad familiar",
        paragraphs: [
          "Los umbrales dependen de los miembros computables de la familia. Para 2026-27 se examina el ejercicio 2025, con las deducciones que establezca la convocatoria. Comprueba la tabla oficial y los datos usados en tu expediente.",
        ],
      },
      {
        id: "patrimonio",
        title: "Patrimonio: qué se mira y qué no",
        paragraphs: [
          "Renta y patrimonio se comprueban por separado. No basta con tener ingresos bajos: revisa también los límites patrimoniales de la convocatoria y el motivo concreto de cualquier denegación.",
        ],
      },
      {
        id: "nota",
        title: "Requisitos académicos: dependen de los estudios y del curso",
        paragraphs: [
          "No existe un mínimo general de 6,5 para acceder a la cuantía variable. En primero de grado se exige un 5 en la nota de acceso; en cursos posteriores se aplican porcentajes de créditos aprobados según la rama. Los másteres tienen requisitos propios.",
          "En grado y máster, la referencia general de matrícula completa es de 60 créditos; desde 30 puede haber beca limitada. Para 2026-27, una matrícula presencial de 48 a 59 créditos puede dar acceso además a 350 euros de renta y 350 de residencia, si se cumplen los requisitos de cada componente y los umbrales correspondientes. Consulta las excepciones por últimos créditos, doble grado y otras situaciones particulares.",
        ],
      },
      {
        id: "checklist",
        title: "Lista mínima antes de dar por buena tu solicitud",
        paragraphs: ["Repasa estos puntos contra tu expediente mientras esperas la resolución:"],
        lists: [
          [
            "¿Cuántos miembros computan en tu unidad familiar? El umbral de renta depende de ese número, no de una cifra fija de internet.",
            "¿Se ha excluido correctamente la vivienda habitual en el cálculo patrimonial? Comprueba qué inmuebles y valores corresponden a la unidad familiar; no confundas esa exclusión con descontar cualquier alojamiento durante el curso.",
            "¿Has comprobado los requisitos académicos de tus estudios y curso en la convocatoria?",
            "¿60 créditos matriculados? Con 30-59 hay limitaciones: revisa qué componentes conservas según la convocatoria.",
          ],
        ],
      },
    ],
  },
  {
    id: "mecaBachilleratoNotaRenovacion",
    reviewedAt: "2026-09-16",
    sources: [{ label: "Convocatoria 2026-27: artículos 7, 48 y 68 (PDF)", href: "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191" }, { label: "Ministerio: requisitos académicos de Bachillerato", href: "https://www.becaseducacion.gob.es/becas-y-ayudas/fp-bachillerato-otros/que-necesitas.html" }],
    pack: "becas",
    path: "/becas/mec/bachillerato",
    h1: "Beca MEC para Bachillerato: qué nota necesitas en cada curso",
    title: "Beca MEC Bachillerato: nota y requisitos por curso",
    description:
      "Beca de Bachillerato: nota mínima de acceso a primero, asignaturas aprobadas para segundo y condiciones de matrícula y repetición.",
    lead: "Para primero de Bachillerato se exige una media mínima de 5 en los estudios de acceso indicados por el Ministerio. Para segundo, haber aprobado todas las asignaturas del curso anterior salvo una; si repetiste, debes aprobarlas todas. También hay requisitos de matrícula, no repetición, renta y patrimonio.",
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: [
      { href: "/becas/mec/plazo", label: "Plazo ordinario y supuestos excepcionales" },
      { href: "/becas/fp", label: "Beca MEC para FP: requisitos, plazos y cobro" },
      { href: "/becas/mec/requisitos", label: "Requisitos de la beca MEC: renta y nota" },
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
      { href: "/alquiler", label: "Ayudas al alquiler por comunidad" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "primero",
        title: "1.º de Bachillerato: la nota media 5 del curso de acceso",
        paragraphs: [
          "La media mínima es 5 en cuarto de ESO o en la nota final del ciclo de grado medio o básico que haya dado acceso. No puedes estar repitiendo el curso para el que solicitas la beca.",
          "La matrícula ordinaria es de curso completo. Matricularse de al menos la mitad de las asignaturas puede permitir una beca limitada. Consulta las condiciones de tu modalidad en la convocatoria.",
        ],
      },
      {
        id: "renovacion",
        title: "Segundo: asignaturas aprobadas",
        paragraphs: [
          "Debes haber aprobado todas las asignaturas salvo una. Si has repetido, se exige aprobar todo. Comprueba además las condiciones de matrícula del curso actual y del anterior y que no estés repitiendo ahora.",
        ],
      },
      {
        id: "fp-grado-medio",
        title: "Si estudias FP",
        paragraphs: [
          "FP tiene requisitos propios según el nivel y el curso. Consulta la guía enlazada de FP; no apliques automáticamente las condiciones de Bachillerato.",
        ],
      },
      {
        id: "practico",
        title: "Cuestión práctica: plazos y dónde se pide",
        paragraphs: [
          `El plazo ordinario del Ministerio para 2026-27 fue del ${MEC_PLAZO_2627} y está cerrado. Si ya solicitaste la beca, revisa tu expediente y sus notificaciones. El artículo 48.2 contempla solicitudes excepcionales hasta el 31 de diciembre por fallecimiento del sustentador principal o determinada jubilación forzosa posteriores al plazo ordinario; la guía de plazos detalla condiciones y canal.`,
          "Esta guía describe la convocatoria del Ministerio. Para 2026-27, el domicilio familiar de los sustentadores principales a 31 de diciembre de 2025 determina el ámbito de Cataluña; para enseñanzas no universitarias, el artículo 68 excluye de esta convocatoria los estudios en centros del País Vasco. Comprueba la administración competente y sus propios plazos antes de elegir el formulario.",
        ],
      },
    ],
  },
  {
    id: "mecaFpRequisitosPlazosCobro",
    reviewedAt: "2026-09-16",
    sources: [{ label: "Convocatoria 2026-27: artículos 7, 48 y 68 (PDF)", href: "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191" },
      { label: "Ministerio: requisitos para FP y otros estudios", href: "https://www.becaseducacion.gob.es/becas-y-ayudas/fp-bachillerato-otros/que-necesitas.html" },
      { label: "Ministerio: cuantías no universitarias", href: "https://www.becaseducacion.gob.es/becas-y-ayudas/fp-bachillerato-otros/tipos-de-becas.html" },
      { label: "Ministerio: dudas sobre el cobro", href: "https://www.becaseducacion.gob.es/dudas/faqs.html" },
    ],
    pack: "becas",
    path: "/becas/fp",
    h1: "Beca MEC para FP: requisitos, plazos y cobro",
    title: "Beca MEC para FP: requisitos, plazos y cobro",
    description:
      "Beca MEC para FP: diferencias entre grado medio y superior, matrícula, rendimiento académico, convocatoria 2026-27 y consulta del cobro.",
    lead: `La beca general incluye estudios de FP. El plazo ordinario del Ministerio para 2026-27 fue del ${MEC_PLAZO_2627} y está cerrado; existen los supuestos excepcionales del artículo 48.2. Los requisitos académicos dependen del nivel del ciclo y del curso; las ayudas autonómicas tienen sus propias bases.`,
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: [
      { href: "/becas/mec/plazo", label: "Plazos y solicitudes excepcionales" },
      { href: "/fp/matricula-fp-en-septiembre", label: "Matrícula de FP en septiembre" },
      { href: "/becas/mec/requisitos", label: "Requisitos de la beca MEC" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
      { href: "/alquiler", label: "Ayudas al alquiler por comunidad" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "estatal-vs-autonomica",
        title: "Identificar la convocatoria que corresponde a tu FP",
        paragraphs: [
          "La beca general para FP utiliza los componentes de las enseñanzas no universitarias. No debe confundirse con la beca de matrícula universitaria. Las cantidades que correspondan dependen de la convocatoria y de tu situación.",
          "Esta guía describe la convocatoria del Ministerio. Para 2026-27, el domicilio familiar de los sustentadores principales a 31 de diciembre de 2025 determina el ámbito de Cataluña; para enseñanzas no universitarias, el artículo 68 excluye de esta convocatoria los estudios en centros del País Vasco. Comprueba la administración competente y sus propios plazos antes de elegir el formulario.",
          "Antes de solicitar otra ayuda, comprueba que incluya tu ciclo y revisa su régimen de compatibilidad. Una convocatoria autonómica para grados universitarios no sirve como referencia de una beca para FP.",
        ],
      },
      {
        id: "requisitos",
        title: "Requisitos según el nivel y el curso",
        paragraphs: [
          "En primero de grado medio, el resumen ministerial exige matrícula y no repetir; no establece la nota mínima de 5 que sí figura para primero de grado superior. En superior se valora la nota de la vía de acceso: segundo de Bachillerato, prueba o curso de acceso, o nota final del grado medio.",
          "Desde segundo curso, en grado medio y superior se exige haber aprobado al menos el 85% de las horas del curso anterior; si repetiste, debes aprobar todo. También hay condiciones de matrícula y de no repetición. La matrícula parcial puede limitar la beca. Revisa las condiciones completas y los requisitos generales y económicos en la fuente oficial.",
        ],
      },
      {
        id: "plazos",
        title: "Plazo ordinario y supuestos excepcionales",
        paragraphs: [
          `La solicitud ordinaria de la convocatoria general del Ministerio 2026-27 se presentó del ${MEC_PLAZO_2627}. Si la solicitaste, revisa el expediente y las notificaciones para conocer los pasos pendientes. Las fechas de la convocatoria 2027-28 deben confirmarse cuando se publiquen; no se pueden deducir del calendario anterior.`,
          "El artículo 48.2 permite solicitudes excepcionales hasta el 31 de diciembre de 2026 por fallecimiento del sustentador principal o jubilación forzosa distinta de la producida por edad reglamentaria, ocurridos después del plazo ordinario. La guía de plazos explica cómo acreditar la situación y dirigirse a la administración o universidad competente. La adjudicación tardía de una plaza de FP no es por sí sola uno de estos supuestos.",
          "La matrícula de FP se mueve en septiembre por la propia adjudicación de plazas: si cambiaste de ciclo o te matriculaste tarde, la guía de matrícula de FP en septiembre explica cómo reflejarlo para que la beca se evalúe con tu matrícula real.",
        ],
      },
      {
        id: "cobro",
        title: "Comprobar la concesión y los pagos",
        paragraphs: [
          "Consulta la notificación para saber qué cantidades te han concedido y compara los ingresos con ella. No hay una fecha de cobro garantizada en esta guía. Si el ingreso sigue pendiente, contacta con tu Unidad de Becas. La guía de cobro explica la orientación temporal publicada por el Ministerio y cómo revisar una incidencia.",
        ],
      },
    ],
  },
  {
    "id": "mecaNoDevolverCreditos",
    "pack": "becas",
    "path": "/becas/mec/no-devolver",
    "h1": "Devolver la beca MEC: créditos y causas de reintegro",
    "title": "Devolver la beca MEC: créditos y causas de reintegro",
    "description": "Beca general 2026-27: regla universitaria del 50%, excepción del 40% en Ciencias y enseñanzas técnicas, matrícula y otras causas de devolución.",
    "lead": "Para estudiantes universitarios, el artículo 43 de la convocatoria general 2026-27 exige superar al menos el 50% de los créditos computables; el mínimo es del 40% en las ramas de Ciencias y enseñanzas técnicas. Cuenta la convocatoria ordinaria o extraordinaria. Esta regla de reintegro no sustituye los requisitos para obtener beca el curso siguiente.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191",
        "label": "Convocatoria 2026-27: artículos 14 y 43-45 (PDF)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977#a37",
        "label": "BOE: causas de reintegro e intereses"
      }
    ],
    "cta": {
      "href": "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191",
      "label": "Consultar la convocatoria y el reintegro (PDF)"
    },
    "related": [
      {
        "href": "/becas/mec/renuncia",
        "label": "Desistir o renunciar y solicitar carta de pago"
      },
      {
        "href": "/becas/mec/cambio-estudios",
        "label": "Cambiar de grado"
      },
      {
        "href": "/becas/mec/requisitos",
        "label": "Requisitos para obtener beca"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "creditos",
        "title": "Cómo se calcula el rendimiento universitario",
        "paragraphs": [
          "Para este porcentaje se excluyen los créditos convalidados, reconocidos o adaptados. Confirma con tu universidad qué créditos entran en el cálculo de tu expediente; si has realizado movilidad, consulta cómo consta su matrícula y reconocimiento.",
          "Si no llegas al porcentaje exigido, el artículo 43 prevé devolver los componentes de la beca salvo el de matrícula. Alcanzar exactamente el 50%, o el 40% cuando corresponda, satisface este criterio; no es necesario superarlo. Cumplirlo no elimina otras posibles causas de reintegro."
        ]
      },
      {
        "id": "otras",
        "title": "Otros estudios y supuestos",
        "paragraphs": [
          "Anular la matrícula o abandonar de hecho los estudios constituye otra causa de incumplimiento de la finalidad de la beca. La excepción de matrícula vinculada al porcentaje no se extiende automáticamente a cualquier causa.",
          "Para estudios no universitarios hay reglas propias: asistencia, superación de asignaturas u horas y, en determinados cursos de acceso o idiomas, superación del curso completo. Las enseñanzas artísticas superiores tienen una excepción de matrícula para el incumplimiento del porcentaje. Consulta el apartado correspondiente del artículo 43.",
          "Existen regímenes especiales. El artículo 14 exime del porcentaje de superación a las personas incluidas en sus supuestos de violencia de género o sexual, con los requisitos que detalla. No apliques una regla general sin comprobar si tu caso tiene una excepción."
        ]
      },
      {
        "id": "procedimiento",
        "title": "Si recibes una reclamación de devolución",
        "paragraphs": [
          "Abre la notificación, identifica curso, motivo, componentes e importe y responde en el plazo indicado con las pruebas pertinentes. El expediente puede concluir con reintegro parcial o total o con archivo si se acredita que la beca era procedente.",
          "La convocatoria contempla intereses de demora cuando procedan; no son una cantidad fija ni un porcentaje que esta guía pueda calcular sin el expediente. Consulta la resolución y la carta de pago."
        ]
      },
      {
        "id": "voluntaria",
        "title": "Devolución voluntaria",
        "paragraphs": [
          "Para devolver voluntariamente, el artículo 45.3 indica solicitar la carta de pago de ingresos no tributarios a la administración educativa o universidad correspondiente. No hagas una transferencia a una cuenta deducida de internet. Conserva la carta y el justificante y verifica que el ingreso se vincule a tu expediente."
        ]
      }
    ]
  },
  {
    "id": "mecaCambioEstudiosReglas",
    "pack": "becas",
    "path": "/becas/mec/cambio-estudios",
    "h1": "Cambiar de carrera con beca MEC: matrícula y solicitud",
    "title": "Cambiar de carrera con beca MEC: matrícula y solicitud",
    "description": "Cambio de grado y beca MEC 2026-27: distingue estudios anteriores con o sin beca, créditos computables y actualización de datos académicos.",
    "lead": "Si cambias de grado, comprueba si recibiste beca en los estudios que dejas. La convocatoria 2026-27 establece reglas distintas para estudios cursados con beca y sin ella. La comparación no depende de haber aprobado el 50% o el 75%, ni exige matricular de golpe todos los créditos que queden para terminar la nueva carrera.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191",
        "label": "Convocatoria 2026-27: artículos 21 y 25 (PDF)"
      },
      {
        "href": "https://www.becaseducacion.gob.es/dudas/asi-de-facil.html",
        "label": "Ministerio: fases y actualización de datos académicos"
      }
    ],
    "cta": {
      "href": "https://www.becaseducacion.gob.es/dudas/asi-de-facil.html",
      "label": "Consultar cuándo actualizar los datos"
    },
    "related": [
      {
        "href": "/becas/mec/modificar-datos",
        "label": "Modificar la solicitud"
      },
      {
        "href": "/becas/mec/no-devolver",
        "label": "Causas de reintegro"
      },
      {
        "href": "/becas/mec/renuncia",
        "label": "Desistimiento y renuncia"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "con-beca",
        "title": "Si cursaste los estudios anteriores con beca",
        "paragraphs": [
          "El artículo 25.7 exige haber quedado matriculado en los nuevos estudios de al menos 30 créditos más que los cursados con beca en los estudios abandonados. Para esa comparación se cuentan todos los créditos matriculados durante los cursos becados de la titulación anterior, no solo los aprobados.",
          "Si los créditos adicionales están entre 30 y 59, se considera matrícula parcial; desde 60, completa. A estos exclusivos efectos se incluyen los créditos convalidados, reconocidos y adaptados. No traslades esta inclusión especial a cualquier otro cálculo de beca.",
          "Pide a la Unidad de Becas que contraste tu historial de cursos becados, matrícula y reconocimientos antes de decidir la matrícula nueva. Esta regla no concede beca por sí sola: también se aplican los demás requisitos y las excepciones previstas en la convocatoria."
        ]
      },
      {
        "id": "sin-beca",
        "title": "Si no recibiste beca en los estudios anteriores",
        "paragraphs": [
          "El artículo 25.8 remite al rendimiento académico que habrías tenido que obtener en el último curso de los estudios abandonados. No lo sustituye por la regla de créditos adicionales de los cursos becados.",
          "La adaptación a un nuevo plan de las mismas enseñanzas no se considera cambio de estudios a estos efectos. Para másteres y niveles no universitarios consulta sus apartados específicos; esta guía desarrolla el cambio de grado."
        ]
      },
      {
        "id": "datos",
        "title": "Actualizar universidad y titulación en la solicitud",
        "paragraphs": [
          "El Ministerio publica del 7 al 28 de septiembre de 2026 como plazo para modificar datos académicos de la convocatoria 2026-27. Comprueba tu notificación y corrige los datos que hayan cambiado; actualizar la matrícula no sustituye los requisitos del cambio de estudios.",
          "Guarda el justificante y consulta con tu Unidad de Becas si el cambio ocurre fuera de esa ventana o afecta a la unidad que debe tramitar el expediente. No supongas que otra administración ha actualizado automáticamente tu solicitud."
        ]
      },
      {
        "id": "baja",
        "title": "No matricularse, abandonar y devolver son situaciones distintas",
        "paragraphs": [
          "Si finalmente no cursas los estudios, comunícalo. Si no se concedió ni abonó ayuda, no hay un importe cobrado que devolver; si hubo concesión o pago, consulta los efectos concretos. No se puede prometer ausencia de consecuencias sin comprobar el expediente.",
          "Anular matrícula o abandonar después de obtener beca puede dar lugar a reintegro. Cambiar de carrera, renunciar y devolver cantidades tampoco borran automáticamente el historial de cursos becados."
        ]
      }
    ]
  },
  {
    "id": "mecaRenunciaConsecuencias",
    "pack": "becas",
    "path": "/becas/mec/renuncia",
    "h1": "Renunciar a la beca MEC: escrito, devolución y efectos",
    "title": "Renunciar a la beca MEC: escrito, devolución y efectos",
    "description": "Distingue desistimiento de la solicitud y renuncia a la beca concedida. Cómo comunicarlo a tu Unidad de Becas y pedir carta de pago si procede devolver.",
    "lead": "Desistir de una solicitud y renunciar a un derecho concedido son actuaciones distintas. Consulta con tu Unidad de Becas cómo presentar un escrito firmado que identifique tu expediente y lo que solicitas. Ninguna de las dos actuaciones permite conservar automáticamente cantidades que debas devolver.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a94",
        "label": "BOE: artículo 94, desistimiento y renuncia"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977#a37",
        "label": "BOE: artículo 37, causas de reintegro"
      },
      {
        "href": "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191",
        "label": "Convocatoria 2026-27: artículo 45, carta de pago (PDF)"
      }
    ],
    "cta": {
      "href": "https://sede.educacion.gob.es/portada.html",
      "label": "Consultar expediente y notificaciones en la sede"
    },
    "related": [
      {
        "href": "/becas/mec/no-devolver",
        "label": "Causas de reintegro"
      },
      {
        "href": "/becas/mec/cambio-estudios",
        "label": "Cambiar de carrera"
      },
      {
        "href": "/becas/mec/modificar-datos",
        "label": "Corregir datos de la solicitud"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "escrito",
        "title": "Qué comunicar y dónde",
        "paragraphs": [
          "Identifica la Unidad de Becas que figura en tu expediente y confirma el canal de presentación. Indica convocatoria, curso, número de expediente, identidad y si desistes de la solicitud o renuncias a una beca concedida. Firma, guarda el justificante y comprueba la respuesta.",
          "El artículo 94 de la Ley 39/2015 permite desistir de la solicitud y renunciar a derechos cuando el ordenamiento no lo prohíba. Una consulta informativa o dejar de revisar el expediente no sustituye esa actuación formal."
        ]
      },
      {
        "id": "motivo",
        "title": "Antes de renunciar por un cambio",
        "paragraphs": [
          "Si solo necesitas corregir estudios, cuenta bancaria u otro dato, consulta primero modificación o subsanación. Si has recibido otra ayuda, revisa la compatibilidad con ambas administraciones. Anular matrícula y renunciar a la beca son trámites diferentes."
        ]
      },
      {
        "id": "cobro",
        "title": "Si ya has cobrado",
        "paragraphs": [
          "Comunica qué importes has recibido y pide que se determine si procede devolución. No depende de cuánto dinero hayas gastado. El incumplimiento puede exigir reintegrar cantidades e intereses conforme al expediente.",
          "Para una devolución voluntaria, el artículo 45.3 de la convocatoria 2026-27 exige solicitar a la administración educativa o universidad la carta de pago de ingresos no tributarios. Utiliza sus instrucciones y conserva el justificante; no realices una transferencia sin esa referencia oficial."
        ]
      },
      {
        "id": "futuro",
        "title": "Consecuencias para otra convocatoria",
        "paragraphs": [
          "Consulta cómo queda registrado el curso y si hay cantidades pendientes. La siguiente solicitud se evalúa con sus bases y tu historial académico y de becas. Renunciar o devolver no garantiza que un curso anteriormente becado deje de contar para límites de duración o cambio de estudios."
        ]
      }
    ]
  },
  {
    id: "mufaceAyudasEstudio2026",
    reviewedAt: "2026-09-16",
    pack: "becas",
    path: "/becas/muface",
    h1: "Beca de estudio MUFACE 2026 para mutualistas",
    title: "Beca de estudio MUFACE 2026: requisitos y solicitud",
    description: "Ayuda para estudios propios del mutualista en 2025-26. Consulta requisitos, documentación y solicitud electrónica de MUFACE.",
    lead: `La convocatoria cubre estudios del propio mutualista, no de sus hijos por ser beneficiarios. La convocatoria publica un plazo hasta el ${MUFACE_HASTA}; comprueba en la sede el cómputo aplicable al último día y los avisos del procedimiento.`,
    cta: { href: "https://muface.sede.gob.es/procedimiento/portada?idProc=132654", label: "Solicitar en MUFACE" },
    sources: [{ label: "BOE: convocatoria de becas de estudio 2025/2026", href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-10876" }],
    related: [
      { href: "/becas/mec", label: "Beca MEC" },
      { href: "/becas/mec/plazo", label: "Plazos de otras becas" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "quien",
        title: "Requisitos",
        paragraphs: ["Debes ser mutualista en alta o situación asimilada el 15 de octubre de 2025 y mantener esa condición al solicitar. La convocatoria cubre los estudios oficiales universitarios y artísticos superiores enumerados en su anexo I para 2025/2026. También contempla estudios cursados íntegramente en 2025 que acabaran después del 31 de octubre de ese año.", "El mínimo académico general es aprobar el 50 % del resultado de dividir los créditos totales del plan entre sus años de duración; en másteres, para este cálculo se computan como máximo dos años. Puede ser el 35 % si son todos los créditos que faltan para terminar. No se calcula como la mitad de lo que decidiste matricular; revisa las exclusiones de créditos reconocidos, convalidados, adaptados o transferidos del apartado 2.C."],
      },
      {
        id: "plazo",
        title: "Solicitud y documentos",
        paragraphs: ["Presenta la solicitud electrónica con los justificantes de matrícula, créditos aprobados y situación respecto a las ayudas de acción social que exige el anexo II."],
      },
      {
        id: "cero-gestores",
        title: "Preparar el envío",
        paragraphs: ["Antes de empezar, guarda los archivos con nombres que te permitan reconocerlos. Comprueba que se leen todas las páginas y conserva una copia de lo enviado junto con el justificante. Si el formulario plantea una duda sobre tu situación, consulta a MUFACE antes de elegir una respuesta. La guía enlaza el trámite para que puedas leer sus instrucciones completas."],
      },
      {
        id: "compatible",
        title: "Cuantía y otras ayudas",
        paragraphs: ["La convocatoria fija como importe el gasto admitido realmente abonado, con un máximo de 300 euros. Si existe ayuda equivalente en el plan de acción social, la regla general exige haberla solicitado antes y no haberla obtenido; hay excepciones por límites de solicitudes y para determinados mutualistas jubilados o pensionistas. Consulta los apartados 4 y 5: una ayuda coincidente puede reducir el importe conservable o exigir reintegro.", "El apartado 6 excluye los centros no radicados en España. También deniega la beca si hubo matrícula gratuita o exención total, salvo que los otros gastos de inscripción superen 90 euros. Esa cifra se refiere a este supuesto específico; no debe interpretarse como un mínimo universal para cualquier solicitud."],
      },
    ],
  },
  {
    id: "mecaResidenciaComponente",
    reviewedAt: "2026-09-16",
    sources: [{ label: "Convocatoria 2026-27: artículos 7, 48 y 68 (PDF)", href: "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/894743/document/1422191" }, { label: "BOE: cuantías y matrícula parcial 2026-27", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-5713" }, { label: "Ministerio: componentes de la beca universitaria 2026-27", href: "https://www.becaseducacion.gob.es/becas-y-ayudas/universidad-grado-master/tipos-de-becas.html" }, { label: "Ministerio: actualización de datos", href: "https://www.becaseducacion.gob.es/novedades" }],
    pack: "becas",
    path: "/becas/residencia",
    h1: "Beca de residencia MEC 2026-27: cuantías y requisitos",
    title: "Beca de residencia MEC 2026-27: cuantías y requisitos",
    description:
      "Residencia MEC 2026-27: cuantía general, matrícula parcial, gastos de alojamiento y necesidad de vivir fuera. Cómo actualizar una solicitud presentada.",
    lead: `La cuantía general de residencia de la beca del Ministerio es de ${MEC_RESIDENCIA_EUR} en 2026-27. El importe depende de la matrícula, los requisitos y el coste real acreditado del alojamiento. Se evalúa dentro de la beca general y exige justificar la necesidad de vivir fuera del domicilio familiar durante el curso.`,
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: [
      { href: "/becas/mec/plazo", label: "Plazo ordinario y solicitudes excepcionales" },
      { href: "/becas/mec/compatibilidad/erasmus", label: "Beca MEC y Erasmus: compatibilidad" },
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
      { href: "/becas/erasmus", label: "Erasmus+ 2026-27: plazos por universidad" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
      { href: "/alquiler", label: "Ayudas al alquiler por comunidad" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "que-es",
        title: "Qué es exactamente el componente de residencia",
        paragraphs: [
          `El artículo 7 exige acreditar gastos de alquiler o de hospedaje en una pensión, residencia de estudiantes o establecimiento similar. El importe no puede superar el coste real. Los ${MEC_RESIDENCIA_EUR} son la cuantía general; para matrícula universitaria presencial parcial de 48 a 59 créditos, la norma prevé 350 euros de residencia si se cumplen las condiciones aplicables.`,
          "La necesidad de vivir fuera durante todo el curso se valora con la distancia, los transportes y los horarios lectivos. También cuentan los estudios y la modalidad de matrícula admitidos, los requisitos generales y académicos y el umbral 2 de renta. La definición de domicilio familiar para esta ayuda puede diferir del domicilio legal: revisa el artículo 7 antes de calcular distancias o gastos.",
        ],
      },
      {
        id: "como-se-pide",
        title: "Declarar y acreditar el alojamiento",
        paragraphs: [
          "Declara en la solicitud de beca general los datos del alojamiento y comprueba que corresponden al curso. Conserva el contrato y los justificantes de gasto para atender las instrucciones o requerimientos de tu Unidad de Becas. La evaluación exige acreditar las condiciones del componente; marcar la residencia no equivale a una concesión.",
          `El plazo ordinario del Ministerio 2026-27 está cerrado (fue del ${MEC_PLAZO_2627}); la guía de plazos recoge las excepciones del artículo 48.2. Si ya la presentaste, consulta las instrucciones de actualización del 7 al 28 de septiembre. Marcar la residencia no garantiza su concesión. Los formularios de 2027-28 deberán comprobarse cuando se publiquen. Consulta además qué administración corresponde a tu domicilio familiar y estudios: el artículo 68 regula los supuestos de Cataluña y País Vasco.`,
        ],
      },
      {
        id: "erasmus",
        title: "Si tienes una movilidad Erasmus",
        paragraphs: [
          "Consulta con tu Unidad de Becas cómo debes declarar la movilidad y acreditar el alojamiento. La estancia Erasmus por sí sola no prueba el derecho a un componente concreto: revisa la convocatoria y los requisitos de tu expediente.",
        ],
      },
      {
        id: "residencias",
        title: "La plaza en una residencia se solicita por separado",
        paragraphs: [
          "La concesión de una cuantía de residencia no reserva una plaza. Para alojarte en una residencia o colegio mayor, consulta al centro sus condiciones de admisión, coste y calendario y tramita la plaza por su canal. No deduzcas sus fechas de la convocatoria de la beca general.",
        ],
      },
    ],
  },
  {
    "id": "erasmusPlazosPorUniversidad",
    "pack": "becas",
    "path": "/becas/erasmus",
    "h1": "Erasmus+: cómo consultar los plazos de tu universidad",
    "title": "Erasmus+: cómo consultar los plazos de tu universidad",
    "description": "Localiza la convocatoria Erasmus de tu universidad y distingue solicitud de plaza, admisión en destino, acuerdo de aprendizaje y financiación.",
    "lead": "Para estudiar en el extranjero con Erasmus+, consulta la oficina internacional de tu universidad de origen. Su convocatoria indica plazas, requisitos y fechas de selección. No hay una fecha única de solicitud del estudiante que pueda deducirse del calendario general del programa o del de otra universidad.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://erasmus-plus.ec.europa.eu/es/opportunities/individuals/students/studying-abroad",
        "label": "Comisión Europea: cómo solicitar movilidad para estudios"
      },
      {
        "href": "https://polisocio.ugr.es/internacionalizacion/movilidad-internacional/movilidad-saliente",
        "label": "Universidad de Granada: pasos de movilidad saliente"
      }
    ],
    "cta": {
      "href": "https://erasmus-plus.ec.europa.eu/es/opportunities/individuals/students/studying-abroad",
      "label": "Consultar cómo participar en Erasmus+"
    },
    "related": [
      {
        "href": "/becas/mec/compatibilidad/erasmus",
        "label": "Combinar Erasmus y beca MEC"
      },
      {
        "href": "/becas/erasmus/complemento-regional",
        "label": "Complemento de Andalucía 2026-27"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "convocatoria",
        "title": "Localiza la convocatoria de tu centro",
        "paragraphs": [
          "En la web oficial de tu universidad, busca movilidad saliente para estudios, el nivel de tu titulación y el curso de la estancia. Comprueba que los destinos y acuerdos incluyen tu facultad o titulación. La oficina de relaciones internacionales debe poder identificar la convocatoria aplicable.",
          "Anota apertura y cierre, requisitos de idioma y su acreditación, documentación, baremo, adjudicación y aceptación. Si buscas 2027-28 y aún no está publicada, consulta cómo recibir sus avisos. Esta guía no anticipa meses de apertura ni segundos plazos sin convocatoria."
        ]
      },
      {
        "id": "etapas",
        "title": "Hay varios trámites con fechas propias",
        "paragraphs": [
          "La selección de origen no sustituye las gestiones posteriores. La secuencia concreta debe comprobarse en las instrucciones de ambas instituciones."
        ],
        "lists": [
          [
            "Solicitud y aceptación de plaza en la universidad de origen.",
            "Nominación y solicitud o admisión en la institución de destino, según su procedimiento.",
            "Acuerdo de aprendizaje y matrícula: qué vas a cursar y cómo se reconocerá.",
            "Documentos y condiciones de financiación, acreditación de estancia y resultados."
          ]
        ]
      },
      {
        "id": "ejemplo",
        "title": "Ejemplo de consulta: Universidad de Granada",
        "paragraphs": [
          "La página oficial de movilidad saliente de la Facultad de Ciencias Políticas y Sociología de la UGR enlaza la convocatoria y los destinos, explica la acreditación lingüística y remite a las instrucciones de destino. Sirve de ejemplo para localizar documentación, no de calendario común a todas las universidades."
        ]
      },
      {
        "id": "financiacion",
        "title": "Comprueba la financiación por separado",
        "paragraphs": [
          "Consulta en tu universidad el importe, los meses financiados y los justificantes exigidos. Tener plaza y recibir financiación son decisiones que debes verificar en sus documentos correspondientes.",
          "La beca MEC es compatible con Erasmus, pero conserva sus propios requisitos. El componente de residencia no se obtiene automáticamente por salir un curso completo. Los complementos autonómicos también dependen de sus bases: la guía enlazada detalla el caso de Andalucía 2026-27."
        ]
      }
    ]
  },
  {
    "id": "erasmusComplementoRegionalCcaa",
    "pack": "becas",
    "path": "/becas/erasmus/complemento-regional",
    "h1": "Complemento Erasmus de Andalucía: cuantías 2026-27",
    "title": "Complemento Erasmus de Andalucía: cuantías 2026-27",
    "description": "Complemento Erasmus 2026-27 de universidades públicas andaluzas: base de 276, 213 o 110 €/mes, aportación especial y máximo de nueve meses.",
    "lead": "La Orden de 31 de julio de 2026 fija el complemento para estudiantes de universidades públicas andaluzas en movilidad física de larga duración para estudios universitarios Erasmus+ KA131-HED. La base mensual es de 276, 213 o 110 €, según el grupo de destino, y puede añadirse la aportación especial. La gestión corresponde a las universidades.",
    "reviewedAt": "2026-09-16",
    "sources": [
      {
        "href": "https://www.juntadeandalucia.es/boja/2026/151/51",
        "label": "BOJA: Orden de 31 de julio, complemento Erasmus 2026-27"
      }
    ],
    "cta": {
      "href": "https://www.juntadeandalucia.es/boja/2026/151/51",
      "label": "Consultar la orden y sus cuantías"
    },
    "related": [
      {
        "href": "/becas/erasmus",
        "label": "Convocatoria y plazos de tu universidad"
      },
      {
        "href": "/becas/mec/compatibilidad/erasmus",
        "label": "Compatibilidad con la beca MEC"
      }
    ],
    "disclaimer": DISCLAIMER_GENERICO,
    "sections": [
      {
        "id": "alcance",
        "title": "A quién se aplica esta orden",
        "paragraphs": [
          "La referencia es estar dentro del programa y procedimiento de una universidad pública de Andalucía. No basta con residir en Andalucía ni se debe extender esta orden a cualquier centro privado, movilidad de prácticas o estudio de FP.",
          "La universidad establece la selección y distribución conforme a las condiciones del programa. Consulta su oficina internacional para conocer documentos, plazo y procedimiento: la orden no establece una solicitud individual general en la sede de la Junta."
        ]
      },
      {
        "id": "importes",
        "title": "Importes mensuales por grupo de destino",
        "paragraphs": [
          "Estas cuantías ya corresponden a 2026-27; no hay que añadirles de nuevo el incremento del 5% mencionado en la orden."
        ],
        "lists": [
          [
            "Grupo 1: base 276 €/mes y especial 221 €/mes. Incluye, por ejemplo, Dinamarca y Suecia; la orden incorpora Reino Unido en la región 14.",
            "Grupo 2: base 213 €/mes y especial 160 €/mes. Incluye, por ejemplo, Alemania, Francia e Italia.",
            "Grupo 3: base 110 €/mes y especial 83 €/mes. Incluye, por ejemplo, Polonia y Rumanía.",
            "El máximo financiable es de nueve meses. Comprueba la clasificación completa de países en el BOJA y los meses acreditados por tu universidad."
          ]
        ]
      },
      {
        "id": "especial",
        "title": "Quién puede recibir la aportación especial",
        "paragraphs": [
          "Se añade para quienes fueron beneficiarios de una beca general del Ministerio, del País Vasco o de Navarra en 2025-26. La orden también incluye a quienes acrediten condición de refugiado, protección subsidiaria o haber solicitado protección internacional en España.",
          "Acredita el supuesto mediante el procedimiento de tu universidad. La aportación especial no se concede a todos los participantes ni depende únicamente de haber solicitado una beca general."
        ]
      },
      {
        "id": "otras",
        "title": "Si estudias fuera de este ámbito",
        "paragraphs": [
          "Esta guía verifica Andalucía 2026-27 y no es un catálogo de las 17 comunidades. Consulta en la oficina internacional de tu universidad y en el portal autonómico correspondiente si existe una convocatoria aplicable. Comprueba institución, residencia si se exige, modalidad de movilidad, curso, compatibilidad y plazo antes de contar con otra ayuda."
        ]
      }
    ]
  },

];
