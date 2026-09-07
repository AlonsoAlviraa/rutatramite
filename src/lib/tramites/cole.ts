import { EDUCACION_URL, SEDE_AAPP_URL } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedCole = [
  { href: "/colegio/cambio-de-colegio-por-mudanza", label: "Cambio de colegio por mudanza" },
  { href: "/colegio/documentos-matricula-colegio", label: "Documentos de matrícula" },
  { href: "/colegio/autorizacion-recogida-menores", label: "Autorización de recogida" },
  { href: "/mudanza", label: "Mudanza: todos los trámites" },
];

export const COLE_GUIDES: Guide[] = [
  {
    id: "fuera-de-plazo",
    pack: "colegio",
    path: "/colegio/cambiar-de-colegio-fuera-de-plazo",
    h1: "Cambiar de colegio fuera de plazo: qué se puede hacer",
    title: "Cambiar de colegio fuera de plazo: guía 2026",
    description:
      "Se cerró el proceso ordinario de admisión y no tienes plaza: la comisión de escolarización te asigna una, con vacantes, en enseñanza obligatoria. A quién dirigirse y con qué papeles.",
    lead:
      "Sí se puede: en España ningún menor en edad obligatoria se queda sin plaza. Fuera de plazo no eliges centro: la comisión de escolarización de tu comunidad te asigna uno con vacantes. Presenta la solicitud en la sede electrónica de tu consejería o en la delegación territorial, con el empadronamiento del domicilio actual.",
    cta: { href: EDUCACION_URL, label: "Ministerio de Educación (portales CCAA)" },
    related: relatedCole,
    sections: [
      {
        id: "garantia",
        title: "La garantía legal que juega a tu favor",
        paragraphs: [
          "La escolarización en enseñanza básica es obligatoria y gratuita: la administración está obligada a darte puesto escolar aunque llegues tarde, en septiembre o en pleno curso. Lo que pierdes fuera de plazo es la elección de centro: el reparto lo hace la comisión de escolarización entre los centros con vacantes de tu zona. No es una rabieta burocrática: en Navarra, por ejemplo, se atendieron más de 2.300 solicitudes fuera de plazo en un solo curso.",
        ],
      },
      {
        id: "como",
        title: "Cómo se pide",
        paragraphs: [
          "Cada comunidad publica su procedimiento cuando termina el proceso ordinario: algunas lo mantienen abierto todo el curso (La Rioja, por ejemplo, lo abre en julio y no lo cierra), otras lo gestionan por ventanas. El canal suele ser la consejería o su delegación territorial; en algunos municipios también intervienen la comisión de escolarización o la secretaría del centro. El colegio puede orientarte, pero la plaza se adjudica por el procedimiento que marque tu administración educativa.",
        ],
        lists: [
          [
            "Certificado o volante de empadronamiento del menor en el domicilio actual: es el documento que fija tu zona.",
            "Documento de identidad del menor (DNI o certificado literal de nacimiento) y DNI de quien ejerce la patria potestad.",
            "Informe o certificado del centro de origen si vienes de otro colegio.",
            "Si hay causa sobrevenida (mudanza, cambio familiar), la justificas: el empadronamiento nuevo es la prueba típica.",
          ],
        ],
      },
      {
        id: "no-conviene",
        title: "Si la asignación no te convence",
        paragraphs: [
          "Puedes presentar reclamación ante la propia comisión y quedar en la lista de espera de los centros que pediste: en septiembre hay movimiento por renuncias. Lo que no funciona es no matricularse en el centro asignado a la espera de algo mejor: el menor debe quedar escolarizado desde el primer día. Y un aviso honesto: empadronar al niño donde no vive para colarse en otra zona es fraude documental y puede costar la plaza y algo peor.",
        ],
      },
    ],
  },
  {
    id: "por-mudanza",
    pack: "colegio",
    path: "/colegio/cambio-de-colegio-por-mudanza",
    h1: "Cambiar de colegio por mudanza",
    title: "Cambio de colegio por mudanza: pasos y documentos",
    description:
      "Te mudas de municipio o de barrio y el cole tiene que cambiar: empadronamiento nuevo, solicitud ante la consejería y expediente del centro de origen. En orden.",
    lead:
      "La plaza se gestiona en la Consejería o delegación de Educación de tu comunidad, no en el colegio directamente. Necesitas certificado de empadronamiento del nuevo domicilio, DNI y certificado literal de nacimiento o libro de familia. El expediente académico lo envía el centro de origen tras confirmar la admisión.",
    cta: { href: EDUCACION_URL, label: "Ministerio de Educación (portales CCAA)" },
    related: relatedCole,
    sections: [
      {
        id: "orden",
        title: "El orden correcto de los papeles",
        paragraphs: [
          "Uno: empadronamiento en el nuevo domicilio. Es el hecho que dispara todo lo demás y el que barema la zona escolar. Dos: solicitud de cambio de centro (el procedimiento de tu CCAA: en Andalucía, por ejemplo, es un impreso específico presentado durante el curso). Tres: el centro de origen libera el expediente cuando la nueva plaza está confirmada: pide el informe personal por el cauce oficial, no lleves papeles sueltos a mano.",
        ],
      },
      {
        id: "plazos",
        title: "¿Y si la mudanza es en pleno curso?",
        paragraphs: [
          "La mudanza es la causa sobrevenida por excelencia: las administraciones la contemplan fuera del calendario ordinario de admisión. La prueba es el certificado de empadronamiento con la fecha del alta. Si el cambio es dentro del mismo municipio pero de zona escolar, el criterio de la comisión puede exigir que la mudanza sea efectiva (no solo la intención).",
        ],
      },
      {
        id: "bateria",
        title: "La batería completa de trámites de la mudanza",
        paragraphs: [
          "El colegio es una pieza más: cambio de padrón, domicilio del DNI (gratis si solo es eso), modelo 030 para Hacienda, tarjeta sanitaria de la nueva zona y, si toca, comedor y transporte. La guía de mudanza de esta web las ordena todas con sus plazos reales.",
        ],
      },
    ],
  },
  {
    id: "documentos-matricula",
    pack: "colegio",
    path: "/colegio/documentos-matricula-colegio",
    h1: "Documentos que pide el colegio para matricular",
    title: "Documentos para matricular a un niño: lista España",
    description:
      "La lista real de documentos de matrícula en España: empadronamiento del menor, identidad, libro de familia y certificado académico si cambia de etapa. Por comunidad.",
    lead:
      "Lo esencial: volante o certificado de empadronamiento del menor, DNI de tutores, documento de identidad del niño (DNI o certificado literal de nacimiento) e informe de promoción o certificado académico si cambia de etapa. El impreso varía por comunidad: descárgalo siempre de la sede electrónica de tu consejería.",
    cta: { href: EDUCACION_URL, label: "Sedes de Educación por CCAA" },
    related: relatedCole,
    sections: [
      {
        id: "lista",
        title: "La lista que sirve en toda España",
        paragraphs: ["Secretarías y sedes electrónicas piden combinaciones de estos cinco bloques:"],
        lists: [
          [
            "Empadronamiento del menor en el domicilio (volante suele bastar; certificado si lo piden).",
            "Identidad del menor: DNI si lo tiene; en su defecto, certificado literal de nacimiento o libro de familia.",
            "Identidad de quien ejerce la patria potestad: DNI, NIE o pasaporte.",
            "Vacunas: suelen pedirse con carácter informativo; confirma el formulario y las reglas de tu comunidad. La cartilla no suele ser un requisito de acceso a la enseñanza obligatoria (guía de vacunas y escolarización).",
            "Expediente: certificado académico o informe de promoción si vienes de otro centro o etapa.",
          ],
        ],
      },
      {
        id: "variaciones",
        title: "Lo que varía por comunidad",
        paragraphs: [
          "El impreso y el canal (sede electrónica, secretaría del centro, oficina de escolarización) cambian de una comunidad a otra; algunas piden además la solicitud de admisión con centro ordenado y otras incorporan la tarjeta sanitaria para el comedor o el informe de convivencia si vienes de otro centro. La regla práctica: descarga siempre el impreso vigente de la sede de tu consejería del año en curso, porque los PDF de años anteriores circulan por internet y caducan.",
        ],
      },
      {
        id: "frecuentes",
        title: "Los tres atascos típicos",
        paragraphs: [
          "Primero: el niño no está empadronado en el domicilio real (el padrón viejo puntúa en la zona equivocada). Segundo: falta el certificado literal de nacimiento y llega con retraso del Registro Civil (los recién nacidos de hospitales suelen estar inscritos de oficio). Tercero: el certificado académico del centro de origen no llega a tiempo: el nuevo colegio puede matricular en condicional y regularizar después, pero pregúntalo en secretaría y que quede anotado.",
        ],
      },
    ],
  },
  {
    id: "autorizacion-recogida",
    pack: "colegio",
    path: "/colegio/autorizacion-recogida-menores",
    h1: "Autorización de recogida de menores: modelo y pasos",
    title: "Autorización para recoger niños del colegio: modelo",
    description:
      "Qué debe contener la autorización para que abuelos o cuidadores recojan al niño del cole, quién la firma (ambos tutores) y qué hace el centro si no está registrada.",
    lead:
      "Es un escrito firmado por el tutor legal que identifica al menor, su aula, a la persona autorizada (nombre y DNI) y la vigencia (puntual o curso completo). El centro no puede entregar el niño a quien no figure en secretaría. Muchos colegios tienen modelo propio; si no, sirve cualquier escrito con estos datos.",
    cta: { href: SEDE_AAPP_URL, label: "Administración (modelos por administración educativa)" },
    related: relatedCole,
    sections: [
      {
        id: "datos-autorizacion",
        title: "Qué debe contener",
        paragraphs: ["Los datos mínimos que toda secretaría acepta:"],
        lists: [
          [
            "Identificación del menor: nombre completo, curso y aula.",
            "Identificación de la persona autorizada: nombre completo y número de DNI (el centro lo comprueba en la primera recogida).",
            "Ámbito: recogida diaria de todo el curso, o autorización puntual para un día concreto.",
            "Firma de quien ejerce la patria potestad; con patria potestad compartida, lo habitual es que firmen ambos.",
            "Teléfono de contacto para verificación.",
          ],
        ],
      },
      {
        id: "practica",
        title: "Cómo funciona en la práctica",
        paragraphs: [
          "En infantil y primaria el centro solo entrega a tutores legales o a personas con autorización registrada en secretaría. Si surge un imprevisto y no hay autorización, la mayoría de centros verifican por teléfono con los padres antes de entregar; si nadie localizable aparece, el protocolo del centro puede acabar en servicios sociales. En secundaria, lo habitual es que los alumnos salgan solos del centro (los menores, con autorización de sus familias): el problema casi desaparece.",
        ],
      },
      {
        id: "cambio",
        title: "Cambiarla o ampliarla",
        paragraphs: [
          "Se puede entregar o actualizar en cualquier momento del curso: no hay plazo cerrado. Si la persona autorizada cambia de DNI por pérdida, recuerda actualizar el número en secretaría. Y para excursiones y actividades fuera del centro, el centro usa su propia autorización específica por actividad: no vale la de recogida diaria.",
        ],
      },
    ],
  },
  {
    id: "no-matriculado",
    pack: "colegio",
    path: "/colegio/no-he-matriculado-a-mi-hijo",
    h1: "No he matriculado a mi hijo a tiempo: qué hacer",
    title: "No he matriculado a mi hijo: qué hacer ahora",
    description:
      "Se pasó el plazo de matrícula y el curso empieza: no se queda sin escolarización. Comisión de escolarización, ventanas fuera de plazo y qué NO hacer (no esperar a matricular en el centro por tu cuenta).",
    lead:
      "Respira: ningún menor en edad de enseñanza obligatoria se queda sin puesto escolar por llegar tarde al papeleo. Pierdes la elección de centro y ganas una plaza asignada con vacantes. Lo que no puedes hacer es esperar: cada semana de septiembre sin gestionar es una semana sin colegio.",
    cta: { href: EDUCACION_URL, label: "Ministerio de Educación (portales CCAA)" },
    related: relatedCole,
    sections: [
      {
        id: "primer-paso",
        title: "El primer paso de esta semana",
        paragraphs: [
          "Localiza el procedimiento de escolarización fuera de plazo de tu comunidad (sede de la consejería o municipal en ciudades con gestión propia, como Barcelona o Madrid capital) y presenta la solicitud con el empadronamiento vigente. En enseñanza obligatoria el proceso está abierto durante todo el curso: te adjudican en días o semanas según la zona. Si el pequeño es de 0 a 3 años (educación infantil primer ciclo, no obligatoria), el fuera de plazo te lleva a lista de espera por baremo: la guía de lista de espera de guardería explica cómo puntúa.",
        ],
      },
      {
        id: "absentismo",
        title: "El reloj del absentismo",
        paragraphs: [
          "En edad obligatoria, no escolarizar a un menor activa los protocolos de absentismo escolar: primero llamadas y cartas, después servicios sociales. Ninguna consejería persigue a las familias que están tramitando: persiguen la inacción. La solicitud presentada, aunque la plaza llegue con retraso, es tu escudo documental.",
        ],
      },
      {
        id: "consejos",
        title: "Tres consejos que evitan repeticiones",
        paragraphs: [
          "Empadrona al niño donde realmente vive (los baremos de zona lo premian). Guarda copia sellada o justificante electrónico de la solicitud. Y si te asignan un centro que no querías, matricula igualmente y apunta al niño a la lista de espera del que prefieras: las renuncias de septiembre mueven listas más de lo que parece.",
        ],
      },
    ],
  },
];
