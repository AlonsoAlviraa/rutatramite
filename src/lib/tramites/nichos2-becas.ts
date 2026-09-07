/**
 * Nichos becas, segunda tanda (verificados en la corrida de research de 2026-09-04).
 * Requisitos, bachillerato, FP, devolución, cambio de estudios, renuncia,
 * MUFACE, residencia, Erasmus y complemento regional.
 */
import {
  BECAS_URL,
  DISCLAIMER_GENERICO,
  MEC_MODIFICACION_VENTANA,
  MEC_PLAZO_2627,
  MEC_RESIDENCIA_EUR,
  MUFACE_HASTA,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

export const BECAS_NICHOS2_GUIDES: Guide[] = [
  {
    id: "mecaRequisitosRentaNota",
    reviewedAt: "2026-09-07",
    sources: [{ label: "Ministerio de Educación: requisitos de grado y máster", href: "https://www.becaseducacion.gob.es/becas-y-ayudas/universidad-grado-master/que-necesitas.html" }],
    pack: "becas",
    path: "/becas/mec/requisitos",
    h1: "Requisitos de la beca MEC 2026-27: renta, patrimonio y nota",
    title: "Requisitos beca MEC 2026-27: renta, patrimonio y nota",
    description:
      "Requisitos de la beca MEC 2026-27: renta, patrimonio y rendimiento académico según tus estudios. Consulta el requisito que corresponde a tu curso.",
    lead: `La beca MEC 2026-27 se pidió del ${MEC_PLAZO_2627} y pasa por tres filtros: la renta de la unidad familiar, el patrimonio y el rendimiento académico. Aquí va cada uno explicado como concepto, sin cifras sueltas que caducan cada curso: los umbrales exactos están en la convocatoria y ahí hay que confirmarlos siempre.`,
    cta: { href: BECAS_URL, label: "Ver la convocatoria en el portal oficial" },
    related: [
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
      { href: "/becas/mec/denegada/por-patrimonio", label: "Beca denegada por patrimonio: qué hacer" },
      { href: "/becas/mec/no-devolver", label: "No devolver la beca: los créditos que debes superar" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
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
          "La matrícula completa suele ser de 60 créditos; desde 30 puede haber beca limitada. Consulta las excepciones por últimos créditos, doble grado y otras situaciones particulares.",
        ],
      },
      {
        id: "checklist",
        title: "Lista mínima antes de dar por buena tu solicitud",
        paragraphs: ["Repasa estos puntos contra tu expediente mientras esperas la resolución:"],
        lists: [
          [
            "¿Cuántos miembros computan en tu unidad familiar? El umbral de renta depende de ese número, no de una cifra fija de internet.",
            "¿Vivienda habitual fuera del patrimonio? Sí: no sumes la casa en la que resides de forma permanente.",
            "¿Has comprobado los requisitos académicos de tus estudios y curso en la convocatoria?",
            "¿60 créditos matriculados? Con 30-59 hay limitaciones: revisa qué componentes conservas según la convocatoria.",
          ],
        ],
      },
    ],
  },
  {
    id: "mecaBachilleratoNotaRenovacion",
    reviewedAt: "2026-09-07",
    sources: [{ label: "Ministerio: requisitos académicos de Bachillerato", href: "https://www.becaseducacion.gob.es/becas-y-ayudas/fp-bachillerato-otros/que-necesitas.html" }],
    pack: "becas",
    path: "/becas/mec/bachillerato",
    h1: "Beca MEC para Bachillerato: qué nota necesitas en cada curso",
    title: "Beca MEC Bachillerato: nota y requisitos por curso",
    description:
      "Beca de Bachillerato: nota mínima de acceso a primero, asignaturas aprobadas para segundo y condiciones de matrícula y repetición.",
    lead: "Para primero de Bachillerato se exige una media mínima de 5 en los estudios de acceso indicados por el Ministerio. Para segundo, haber aprobado todas las asignaturas del curso anterior salvo una; si repetiste, debes aprobarlas todas. También hay requisitos de matrícula, no repetición, renta y patrimonio.",
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: [
      { href: "/becas/fp", label: "Beca MEC para FP: requisitos, plazos y cobro" },
      { href: "/becas/mec/requisitos", label: "Requisitos de la beca MEC: renta y nota" },
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
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
          `El plazo de solicitud 2026-27 fue del ${MEC_PLAZO_2627} y está cerrado. Si ya solicitaste la beca, revisa tu expediente y sus notificaciones. Las guías de plazos y cobro explican los siguientes pasos sin garantizar una fecha de ingreso.`,
        ],
      },
    ],
  },
  {
    id: "mecaFpRequisitosPlazosCobro",
    reviewedAt: "2026-09-07",
    sources: [
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
    lead: `La beca general incluye estudios de FP. El plazo de solicitud 2026-27 fue del ${MEC_PLAZO_2627} y está cerrado. Los requisitos académicos dependen del nivel del ciclo y del curso; las ayudas autonómicas tienen sus propias bases.`,
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: [
      { href: "/fp/matricula-fp-en-septiembre", label: "Matrícula de FP en septiembre" },
      { href: "/becas/mec/requisitos", label: "Requisitos de la beca MEC" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "estatal-vs-autonomica",
        title: "Beca MEC y becas autonómicas de FP: dos cosas distintas",
        paragraphs: [
          "La beca general para FP utiliza los componentes de las enseñanzas no universitarias. No debe confundirse con la beca de matrícula universitaria. Las cantidades que correspondan dependen de la convocatoria y de tu situación.",
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
        title: "Plazos: el calendario estatal es el que manda",
        paragraphs: [
          `La solicitud de la convocatoria general 2026-27 se presentó del ${MEC_PLAZO_2627}. Si la solicitaste, revisa el expediente y las notificaciones para conocer los pasos pendientes. Las fechas de la convocatoria 2027-28 deben confirmarse cuando se publiquen; no se pueden deducir del calendario anterior.`,
          "La matrícula de FP se mueve en septiembre por la propia adjudicación de plazas: si cambiaste de ciclo o te matriculaste tarde, la guía de matrícula de FP en septiembre explica cómo reflejarlo para que la beca se evalúe con tu matrícula real.",
        ],
      },
      {
        id: "cobro",
        title: "El cobro: mismo canal que la beca universitaria",
        paragraphs: [
          "Consulta la notificación para saber qué cantidades te han concedido y compara los ingresos con ella. No hay una fecha de cobro garantizada en esta guía. Si el ingreso sigue pendiente, contacta con tu Unidad de Becas. La guía de cobro explica la orientación temporal publicada por el Ministerio y cómo revisar una incidencia.",
        ],
      },
    ],
  },
  {
    id: "mecaNoDevolverCreditos",
    pack: "becas",
    path: "/becas/mec/no-devolver",
    h1: "Requisitos para no devolver la beca MEC: créditos y normas",
    title: "No devolver la beca MEC: créditos y normas",
    description:
      "La beca MEC se devuelve si no superas el 50% de los créditos matriculados (40% en enseñanzas técnicas), computando la convocatoria extraordinaria. La excepción de la matrícula y el reintegro con intereses del RD 1721/2007.",
    lead: "Como regla general de la convocatoria, para no devolver la beca MEC debes superar al menos el 50% de los créditos matriculados (el 40% en las enseñanzas técnicas que la convocatoria incluye), contando la convocatoria extraordinaria. Si solo falla el porcentaje, la partida de matrícula puede quedar excluida del reintegro, aunque sí se reclame el resto. Anular la matrícula o causar baja puede activar un reintegro íntegro: revisa la resolución y el régimen aplicable a tu estudio.",
    cta: { href: BECAS_URL, label: "Sede electrónica de becas" },
    related: [
      { href: "/becas/mec/renuncia", label: "Renunciar a la beca MEC: cómo y consecuencias" },
      { href: "/becas/mec/cambio-estudios", label: "Cambiar de carrera con beca MEC" },
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "regla",
        title: "La regla del 50% (40% en enseñanzas técnicas)",
        paragraphs: [
          "La beca MEC está condicionada a que superes al menos el 50% de los créditos matriculados. Si te matriculaste de 60 y superaste 31, cumples; con 29, no. En las enseñanzas técnicas que la convocatoria lista expresamente el listón baja al 40%, precisamente porque el rendimiento reconocido en esas titulaciones es menor.",
          "El cómputo no se cierra en junio: la convocatoria extraordinaria de la universidad computa. Si en junio vas justo de créditos, las asignaturas de julio o septiembre pueden salvarte el porcentaje y evitar el reintegro. Es una razón de peso para presentarse en vez de dar el curso por perdido.",
        ],
      },
      {
        id: "excepcion",
        title: "Cuando falla el porcentaje: cómo se trata la matrícula",
        paragraphs: [
          "Si el único requisito que fallas es el porcentaje de créditos superados (el de rendimiento, no los económicos ni los de matrícula mínima), la convocatoria distingue lo que devuelves: no se devuelve la partida de matrícula, el importe que el Ministerio pagó a la universidad por tus asignaturas, pero sí el resto de cuantías percibidas, la fija y las variables.",
          "Traducción práctica: suspender la mitad del curso puede costarte las cuantías en metálico, pero no te deja debiendo la matrícula. Eso sí, si además fallan otros requisitos, la devolución alcanza a todo lo percibido, matrícula incluida.",
        ],
      },
      {
        id: "anulacion",
        title: "Anular la matrícula o causar baja: devolución íntegra",
        paragraphs: [
          "El escenario contrario: si anulas la matrícula o causas baja en los estudios, la beca se pierde íntegramente y procede devolver todo lo cobrado más lo que el Ministerio pagó en tu nombre. Aquí no hay excepción de matrícula, porque desaparece la condición que sostenía la beca: estar matriculado.",
          "Comunica la baja a tu Unidad de Becas. Renunciar no elimina la obligación de devolver cantidades que resulten indebidamente percibidas. Solicita las instrucciones oficiales de devolución y conserva los justificantes.",
        ],
      },
      {
        id: "reintegro",
        title: "Cómo te reclaman el dinero: intereses incluidos",
        paragraphs: [
          "El reintegro se rige por el RD 1721/2007, que regula el régimen de becas: la Administración notifica la propuesta de devolución, hay un plazo de alegaciones y, si se confirma, se paga con intereses de demora desde el cobro. No es una multa, pero el recargo por el tiempo transcurrido es real. Si te llega un requerimiento, no lo ignores: contesta en plazo y, si el motivo es el porcentaje de créditos, revisa si te aplica la excepción de la matrícula.",
        ],
      },
    ],
  },
  {
    id: "mecaCambioEstudiosReglas",
    pack: "becas",
    path: "/becas/mec/cambio-estudios",
    h1: "Cambiar de carrera con beca MEC: qué pasa con tu beca",
    title: "Cambiar de carrera con beca MEC: qué pasa",
    description:
      "Cambias de titulación y ya pediste la beca: cuántos créditos debes matricular según lo superado, la ventana de modificación de septiembre y por qué no es lo mismo no matricularse que abandonar.",
    lead: `Cambiar de estudios con la beca MEC solicitada tiene tres piezas: actualizar la solicitud en la ventana de septiembre (del ${MEC_MODIFICACION_VENTANA}), matricular los créditos que la convocatoria exige según lo que ya hayas superado, y saber que no es lo mismo pedir la beca y no matricularse (te la deniegan sin más) que matricularse y abandonar (la devuelves).`,
    cta: { href: BECAS_URL, label: "Modificar tu solicitud (sede oficial)" },
    related: [
      { href: "/becas/mec/modificar-datos", label: "Modificar datos de la beca MEC (septiembre)" },
      { href: "/becas/mec/no-devolver", label: "No devolver la beca MEC: créditos y normas" },
      { href: "/becas/mec/renuncia", label: "Renunciar a la beca MEC" },
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "creditos",
        title: "Cuántos créditos debes matricular al cambiar",
        paragraphs: [
          "La convocatoria no te deja cambiarte y matricular el mínimo: añade carga lectiva en función de tu expediente anterior. Con entre el 50% y el 75% de los créditos superados en los estudios que dejas, al matricularte en la nueva titulación debes matricular los créditos que te falten para terminarla más entre 30 y 59 créditos adicionales; con más del 75% superado, los que te falten más 60.",
          "La lógica es evitar que quien ya lleva recorrido use el cambio para matricularse de cuatro asignaturas y cobrar la beca completa. Confirma la tabla exacta en la convocatoria vigente, porque el reparto dentro de la horquilla depende de cómo se reconozcan tus créditos en el plan nuevo.",
        ],
      },
      {
        id: "ventana-septiembre",
        title: "La ventana de septiembre: actualiza la solicitud",
        paragraphs: [
          `Los cambios de universidad y titulación se reflejan en la solicitud en el plazo de modificación de datos: del ${MEC_MODIFICACION_VENTANA}, en la sede electrónica del Ministerio. Es un trámite gratuito, sin gestores, y es tu responsabilidad que la solicitud recoja la matrícula real: la evaluación se hace con los datos definitivos, no con los de abril.`,
        ],
      },
      {
        id: "pedir-y-no-matricularse",
        title: "Pedir la beca y no matricularse: denegación sin castigo",
        paragraphs: [
          "Escenario frecuente en septiembre: pediste la beca en abril y al final no te matriculas, o no te dan plaza. La consecuencia es una denegación, no una devolución: como nunca hubo matrícula ni cobro, no hay nada que reintegrar, y no conlleva penalización en convocatorias futuras. La beca se vuelve a pedir el año que vuelvas a matricularte, sin marca negativa en tu expediente de solicitante.",
        ],
      },
      {
        id: "abandonar",
        title: "Matricularse y abandonar: aquí sí hay devolución",
        paragraphs: [
          "Lo contrario es abandonar después de matricularte y cobrar: ahí la beca se pierde y procede el reintegro, porque la condición de rendimiento (superar el porcentaje de créditos) se rompe con la baja. La guía de requisitos para no devolver la beca desgrana el porcentaje exigido, la excepción de la matrícula y el procedimiento del RD 1721/2007.",
        ],
      },
    ],
  },
  {
    id: "mecaRenunciaConsecuencias",
    pack: "becas",
    path: "/becas/mec/renuncia",
    h1: "Renunciar a la beca MEC: cómo hacerlo y qué pasa después",
    title: "Renunciar a la beca MEC: cómo y consecuencias",
    description:
      "Cómo comunicar el desistimiento o la renuncia a una beca MEC y consultar sus efectos. Renunciar no elimina una posible obligación de reintegro.",
    lead: "Si no vas a continuar con la beca, comunícalo formalmente a tu Unidad de Becas. Desistir de una solicitud y renunciar a un derecho concedido son situaciones distintas. Ninguna permite conservar automáticamente cantidades que debas devolver.",
    sources: [
      { label: "BOE: desistimiento y renuncia, artículo 94", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a94" },
      { label: "BOE: causas de reintegro, artículo 37", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-20977#a37" },
    ],
    cta: { href: BECAS_URL, label: "Sede electrónica de becas" },
    related: [
      { href: "/becas/mec/no-devolver", label: "No devolver la beca MEC: créditos y normas" },
      { href: "/becas/mec/cambio-estudios", label: "Cambiar de carrera con beca MEC" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "como",
        title: "Cómo se renuncia",
        paragraphs: [
          "Identifica la Unidad de Becas que figura en tu expediente y consulta el canal para presentar un escrito firmado. Indica la convocatoria, el expediente y qué solicitas. Conserva el justificante de presentación y la respuesta.",
          "El artículo 94 de la Ley 39/2015 regula el desistimiento de la solicitud y la renuncia a derechos cuando el ordenamiento lo permita. Una consulta informativa no sustituye la presentación formal.",
        ],
      },
      {
        id: "motivos",
        title: "Motivos típicos: anulación de matrícula e incompatibilidad",
        paragraphs: [
          "Si anulas la matrícula o recibes otra ayuda, comunica el cambio y consulta sus consecuencias. La compatibilidad depende de las bases de ambas ayudas. Para corregir un dato, consulta el procedimiento de modificación o subsanación antes de renunciar.",
        ],
      },
      {
        id: "timing",
        title: "Si ya has cobrado",
        paragraphs: [
          "Renunciar no borra una obligación de reintegro ni limita la devolución a lo que hayas gastado. El incumplimiento puede exigir devolver cantidades con intereses. Pide a la Unidad de Becas el importe y el procedimiento aplicables; no hagas una transferencia sin instrucciones oficiales.",
        ],
      },
      {
        id: "futuras",
        title: "¿Penaliza en convocatorias futuras? Lo que sabemos (y lo que no)",
        paragraphs: [
          "Consulta cómo queda registrado el curso y si existen cantidades pendientes de devolución. La siguiente solicitud se valorará con sus propias bases y con tu historial académico y de becas. Pide una respuesta referida a tu expediente antes de dar por hecho que no tendrá efectos.",
        ],
      },
    ],
  },
  {
    id: "mufaceAyudasEstudio2026",
    reviewedAt: "2026-09-07",
    pack: "becas",
    path: "/becas/muface",
    h1: "Beca de estudio MUFACE 2026 para mutualistas",
    title: "Beca de estudio MUFACE 2026: requisitos y solicitud",
    description: "Ayuda para estudios propios del mutualista en 2025-26. Consulta requisitos, documentación y solicitud electrónica de MUFACE.",
    lead: `La convocatoria cubre estudios del propio mutualista, no de sus hijos por ser beneficiarios. Se solicita hasta el ${MUFACE_HASTA}.`,
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
        paragraphs: ["Debes estar de alta o situación asimilada desde el 15 de octubre de 2025 y mantenerla al solicitar. Se cubren estudios oficiales universitarios o artísticos superiores del curso 2025/2026, con requisitos académicos que debes comprobar en la convocatoria."],
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
        paragraphs: ["La ayuda reembolsa gastos admitidos hasta 300 euros. Existen incompatibilidades con ayudas coincidentes y reglas de subsidiariedad respecto a la acción social; consulta el apartado 4 antes de solicitar."],
      },
    ],
  },
  {
    id: "mecaResidenciaComponente",
    pack: "becas",
    path: "/becas/residencia",
    h1: "Beca de residencia MEC: 2.700 € y cómo solicitarla",
    title: "Beca de residencia MEC: 2.700 € y cómo solicitarla",
    description:
      "El componente de residencia de la beca MEC (2.700 € en 2026-27) se pide marcando la casilla de residir fuera del domicilio familiar. Erasmus de curso completo y residencias públicas, explicados.",
    lead: `El componente de residencia de la beca MEC llega a ${MEC_RESIDENCIA_EUR} en el curso 2026-27 y no es una beca aparte: se pide dentro de la propia solicitud MEC marcando que vas a residir fuera del domicilio familiar por los estudios. La clave está en acreditar bien el desplazamiento y saber qué pasa con Erasmus y con las residencias universitarias.`,
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: [
      { href: "/becas/mec/compatibilidad/erasmus", label: "Beca MEC y Erasmus: compatibilidad" },
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
      { href: "/becas/erasmus", label: "Erasmus+ 2026-27: plazos por universidad" },
      { href: "/becas/mec/cuando-se-cobra", label: "Cuándo se cobra la beca MEC" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "que-es",
        title: "Qué es exactamente el componente de residencia",
        paragraphs: [
          `Dentro de la beca MEC hay cuantías por concepto, y una de ellas es la residencia: ${MEC_RESIDENCIA_EUR} este curso para quien, por cursar sus estudios, vive lejos del domicilio familiar y debe mantener una residencia durante el periodo lectivo. No paga "el colegio mayor" como tal: es una partida para ti, que luego dedicas donde corresponda.`,
          "El requisito es el desplazamiento: que los estudios te obliguen a residir fuera del domicilio familiar. La convocatoria fija cómo se acredita la vinculación entre la localidad de estudios y el domicilio, y el componente se abona junto al resto de cuantías de la beca.",
        ],
      },
      {
        id: "como-se-pide",
        title: "Cómo se pide: una casilla dentro de la solicitud MEC",
        paragraphs: [
          "No hay segunda solicitud: en el formulario de la beca MEC se marca la opción de residir fuera del domicilio familiar durante el curso, y eso activa la evaluación del componente. El error típico es dejarla sin marcar, o marcarla cuando el domicilio declarado no lo justifica: el cruce con los datos censales y de matrícula es automático, y una casilla incoherente puede costarte un requerimiento o una denegación parcial.",
          `La convocatoria 2026-27 ya está cerrada (se pidió del ${MEC_PLAZO_2627}); quien la pidiera con la casilla correcta verá el componente en su resolución. Para 2027-28, la misma casilla, con los datos de domicilio preparados de antemano.`,
        ],
      },
      {
        id: "erasmus",
        title: "Erasmus de curso completo: puedes reclamarla",
        paragraphs: [
          "Un matiz que beneficia a los estudiantes de movilidad: quienes hacen un Erasmus de curso completo pueden reclamar el componente de residencia, porque el desplazamiento existe y es aún mayor que el del estudiante que simplemente estudia en otra ciudad. La guía de compatibilidad de la beca MEC con Erasmus desarrolla qué componentes se cobran estando fuera y cómo se reclama.",
        ],
      },
      {
        id: "residencias",
        title: "Ojo: las residencias públicas son otra convocatoria",
        paragraphs: [
          `El componente de ${MEC_RESIDENCIA_EUR} no te reserva plaza en ninguna residencia. Las residencias y colegios universitarios públicos dependen de cada universidad y tienen convocatorias propias, con plazos normalmente en primavera-verano y criterios de adjudicación propios (renta, expediente, distancia al domicilio familiar). Si necesitas cama, busca la convocatoria de residencias de tu universidad aparte de la beca: son dos trámites distintos que se complementan.`,
        ],
      },
    ],
  },
  {
    id: "erasmusPlazosPorUniversidad",
    pack: "becas",
    path: "/becas/erasmus",
    h1: "Erasmus+ 2026-27: los plazos los pone cada universidad",
    title: "Erasmus+ 2026-27: plazos por universidad",
    description:
      "No existe un plazo estatal para pedir Erasmus+: cada universidad abre su convocatoria. El patrón (noviembre-diciembre para salidas del año siguiente, segundos plazos en julio) y el papel de SEPIE.",
    lead: "Buscar el plazo del Erasmus en general no sirve: no hay fecha estatal única. Cada universidad abre su propia convocatoria de plazas, con el patrón repetido de noviembre-diciembre para las salidas de septiembre del año siguiente y segundos plazos en julio si quedan huecos. SEPIE publica después las resoluciones del programa.",
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    secondaryCta: { href: "https://www.sepie.es/", label: "SEPIE: convocatorias y resoluciones" },
    related: [
      { href: "/becas/mec/compatibilidad/erasmus", label: "Beca MEC y Erasmus: compatibilidad" },
      { href: "/becas/erasmus/complemento-regional", label: "Complemento regional Erasmus" },
      { href: "/becas/residencia", label: "Beca de residencia MEC" },
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "no-hay-plazo-estatal",
        title: "No hay plazo estatal: tu universidad decide",
        paragraphs: [
          "El programa Erasmus+ lo financia la Unión y lo coordina en España el SEPIE, pero la selección de estudiantes la hace cada universidad con sus plazas y su calendario. Por eso la respuesta a cuándo se pide el Erasmus es siempre otra pregunta: en qué universidad estás. La oficina de relaciones internacionales de tu centro es la fuente con la fecha concreta.",
          "El patrón de los últimos cursos: las convocatorias para salidas de septiembre del año siguiente abren entre noviembre y diciembre, con resolución en los meses siguientes. Es decir, quien quiere salir en septiembre de 2027 solicita en noviembre-diciembre de 2026. Las universidades con plazas sobrantes abren segundos plazos en julio.",
        ],
      },
      {
        id: "convocatoria-2027",
        title: "La convocatoria 2027-28: abre entre noviembre y enero",
        paragraphs: [
          "Si lees esto en el arranque del curso 2026-27, la diana es la convocatoria 2027-28: se espera que abra entre noviembre de 2026 y enero de 2027 según la universidad. Prepara ya el expediente (las notas pesan en el baremo), el nivel de idioma del destino y tu lista de países prioritaria: la selección se resuelve por puntuación y cada décima cuenta.",
        ],
      },
      {
        id: "sepie",
        title: "El papel de SEPIE: dinero y resoluciones, no plazos",
        paragraphs: [
          "El SEPIE (Servicio Español para la Internacionalización de la Educación) es el organismo nacional del programa: publica las convocatorias y resoluciones del programa, los importes por destino y transfiere los fondos a las universidades. No gestiona tu solicitud de plaza: esa es la universidad. Para importes oficiales y listados, SEPIE; para fechas, tu oficina internacional.",
        ],
      },
      {
        id: "compatibilidad",
        title: "Erasmus y beca MEC: se pueden combinar",
        paragraphs: [
          "Salir de Erasmus teniendo beca MEC es compatible, y hay componentes que se siguen cobrando fuera, incluido el de residencia en estancias de curso completo, como detalla la guía de compatibilidad con Erasmus. Revisa también si tu comunidad paga un complemento regional sobre la beca Erasmus: en la guía del complemento regional está el mapa y el aviso de qué verificar.",
        ],
      },
    ],
  },
  {
    id: "erasmusComplementoRegionalCcaa",
    pack: "becas",
    path: "/becas/erasmus/complemento-regional",
    h1: "Complemento regional Erasmus: qué comunidades lo pagan",
    title: "Complemento regional Erasmus: qué CCAA lo pagan",
    description:
      "Varias comunidades suman un complemento autonómico a la beca Erasmus: Andalucía paga 263/203/105 €/mes según destino más el especial. Importes por convocatoria anual: verifica la de tu comunidad.",
    lead: "La beca Erasmus que gestiona tu universidad no es todo lo que puedes cobrar: varias comunidades autónomas pagan un complemento regional que se suma al importe europeo. Andalucía es la más estructurada (263, 203 y 105 €/mes según destino, más un complemento especial, con una subida del 5% desde 2026-27), pero casi ninguna página agrega quién paga qué: aquí va el mapa, con el aviso honesto de que los importes salen de convocatorias anuales.",
    cta: { href: BECAS_URL, label: "Portal oficial de becas" },
    related: [
      { href: "/becas/erasmus", label: "Erasmus+ 2026-27: plazos por universidad" },
      { href: "/becas/mec/compatibilidad/erasmus", label: "Beca MEC y Erasmus: compatibilidad" },
      { href: "/becas/residencia", label: "Beca de residencia MEC" },
      { href: "/becas/mec", label: "Beca MEC: guía completa" },
    ],
    disclaimer: DISCLAIMER_GENERICO,
    sections: [
      {
        id: "que-es",
        title: "Qué es el complemento regional",
        paragraphs: [
          "Sobre la beca Erasmus+ que abona la universidad con fondos del programa, algunas comunidades autónomas convocan complementos propios: dinero autonómico para sus estudiantes en movilidad, con baremos de renta y expediente propios y una solicitud aparte, normalmente telemática en la sede de la comunidad y en fechas posteriores a la selección en la universidad.",
          "No es un derecho estatal: depende de que tu comunidad lo convoque cada año. Por eso la respuesta honesta a si te toca complemento empieza por tu comunidad de residencia y su convocatoria publicada, no por un importe genérico de internet.",
        ],
      },
      {
        id: "andalucia",
        title: "Andalucía: la convocatoria más estructurada",
        paragraphs: [
          "Andalucía paga complementos en tres tramos según el destino: 263, 203 y 105 €/mes. A eso se suma un complemento especial de 210, 152 y 79 €/mes para los perfiles que la convocatoria vincula a la beca general, y las cuantías aplican una subida del 5% desde el curso 2026-27. La solicitud se presenta en la sede de la Junta, para estudiantes con residencia en la comunidad.",
        ],
      },
      {
        id: "otras",
        title: "Otras comunidades: un mapa irregular",
        paragraphs: [
          "Fuera de Andalucía, el mapa cambia cada año: algunas comunidades pagan complementos propios, otras los limitan a estudiantes con beca general o de renta baja, y algunas no convocan nada. Los importes y requisitos se revisan en cada convocatoria anual, así que el dato útil no es una tabla congelada sino saber dónde mirar: la consejería de educación de tu comunidad y las ayudas de movilidad internacional que convoca.",
        ],
      },
      {
        id: "aviso",
        title: "El aviso honesto (y por qué esta página existe)",
        paragraphs: [
          "Nadie agrega esta información porque caduca cada año: los importes salen de la convocatoria autonómica anual y publicarlos sin fecha engaña. Por eso aquí van con su contexto, y la recomendación es verificar la convocatoria de tu comunidad antes de contar con el complemento.",
        ],
        lists: [
          [
            "Consejería de educación de tu comunidad: busca las ayudas de movilidad internacional para estudiantes.",
            "Sede electrónica autonómica: la solicitud suele ser telemática y con plazo propio, posterior a la selección Erasmus.",
            "Oficina de relaciones internacionales de tu universidad: conocen los complementos que piden sus estudiantes.",
            "Convocatoria vigente: importa la publicada este curso, con fecha, no la del año pasado.",
          ],
        ],
      },
    ],
  },
];
