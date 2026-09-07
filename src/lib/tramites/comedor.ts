import { EDUCACION_URL } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedComedor = [
  { href: "/comedor/beca-comedor-fuera-de-plazo", label: "Beca comedor fuera de plazo" },
  { href: "/comedor/no-puedo-pagar-comedor-escolar", label: "No puedo pagar el comedor" },
  { href: "/comedor/documentos-alergia-comedor-escolar", label: "Alergias: documentos" },
  { href: "/empadronarse", label: "Padrón (baremo de ayudas)" },
];

export const COMEDOR_GUIDES: Guide[] = [
  {
    id: "beca-fuera-plazo",
    pack: "comedor",
    path: "/comedor/beca-comedor-fuera-de-plazo",
    h1: "Beca de comedor fuera de plazo: qué se puede hacer",
    title: "Beca comedor fuera de plazo: qué se puede hacer",
    description:
      "Cerró el plazo ordinario de la beca de comedor: segundas ventanas reales por comunidad (CyL y Barcelona en septiembre), circunstancias sobrevenidas, ayudas municipales y fraccionamiento.",
    lead:
      "Depende de tu comunidad. Cerrado el plazo ordinario, la mayoría de convocatorias solo admiten solicitudes por circunstancias sobrevenidas: pérdida de empleo, cambio de domicilio o situación de vulnerabilidad. Consulta la convocatoria vigente en la sede electrónica de tu consejería y, si la necesidad es urgente, acude a servicios sociales del ayuntamiento.",
    cta: { href: EDUCACION_URL, label: "Educación (convocatorias por CCAA)" },
    related: [
      { href: "/comedor/no-puedo-pagar-comedor-escolar", label: "No puedo pagar el comedor" },
      { href: "/comedor/impago-comedor-escolar", label: "Impago del comedor" },
      { href: "/empadronarse", label: "Padrón (requisito habitual)" },
    ],
    sections: [
      {
        id: "segunda-ventana",
        title: "La segunda ventana existe (pero no en todas partes)",
        paragraphs: [
          "Varias administraciones abren periodo extraordinario o segunda ventana: Castilla y León admite solicitudes de nueva matrícula del 1 al 22 de septiembre; Barcelona ciudad abrió un segundo período del 8 al 27 de septiembre; Andalucía convocó plazo propio para concertados a principios de septiembre. Otras, como la Comunidad de Madrid, cerraron la ordinaria en mayo y solo han publicado fase de subsanación: ahí la vía es la sobrevenida o el plan B.",
        ],
      },
      {
        id: "sobrevenida",
        title: "La vía de las circunstancias sobrevenidas",
        paragraphs: [
          "Cuando la situación familiar cambia después del cierre (desempleo, pérdida de ingresos, mudanza), varias convocatorias y muchos ayuntamientos admiten solicitud fuera de calendario con la justificación. La prueba típica: informe de vida laboral, certificado de empresa o el empadronamiento nuevo. Empieza por dos sitios a la vez: la unidad de comedor de tu consejería y los servicios sociales de tu ayuntamiento, que además pueden activar cobertura del menú en situación de vulnerabilidad.",
        ],
      },
      {
        id: "plan-b",
        title: "El plan B mientras llega la ayuda",
        paragraphs: ["Si este curso no hay beca, la factura del comedor se puede bajar:"],
        lists: [
          [
            "Fraccionamiento del precio público: pídelo al organismo gestor (ayuntamiento o consejería).",
            "Ayudas municipales propias: muchos ayuntamientos convocan las suyas en septiembre-octubre.",
            "Deducción por gastos de guardería en el IRPF del año que viene si el pequeño está en primer ciclo.",
            "Servicios sociales: en exclusión social pueden hacerse cargo del menú.",
          ],
        ],
      },
    ],
  },
  {
    id: "no-puedo-pagar",
    pack: "comedor",
    path: "/comedor/no-puedo-pagar-comedor-escolar",
    h1: "No puedo pagar el comedor escolar: qué pasa",
    title: "No puedo pagar el comedor escolar: qué pasa",
    description:
      "Un impago puntual no implica automáticamente que el menor pierda el servicio, pero la ordenanza puede prever su suspensión y la deuda sigue siendo exigible. Beca, fraccionamiento y servicios sociales, en orden.",
    lead:
      "Un impago puntual no suele producir una suspensión inmediata, pero la deuda sigue siendo exigible y el organismo gestor puede suspender el servicio conforme a la ordenanza. Si no puedes pagar, solicita la beca-comedor de tu comunidad o acude a servicios sociales: algunas administraciones cubren el menú en situaciones de vulnerabilidad.",
    cta: { href: EDUCACION_URL, label: "Educación (beCAS por CCAA)" },
    related: [
      { href: "/comedor/impago-comedor-escolar", label: "Impago: consecuencias" },
      { href: "/comedor/beca-comedor-fuera-de-plazo", label: "Beca fuera de plazo" },
    ],
    sections: [
      {
        id: "que-pasa",
        title: "Qué pasa de verdad",
        paragraphs: [
          "Las ordenanzas municipales suelen prever la suspensión temporal del servicio cuando se acumula impago: el niño deja de usar el comedor hasta regularizar, y la deuda se reclama por vía administrativa con posibles recargos. La prensa ha recogido casos extremos (un niño sin almuerzo por una deuda de 8 euros) que provocaron escándalo y rectificación: el menor no paga la crisis, pero el servicio se puede suspender. La salida es administrativa, no de laguna: beca, fraccionamiento o servicios sociales.",
        ],
      },
      {
        id: "orden",
        title: "Qué hacer esta semana",
        paragraphs: ["El orden importa para no perder el servicio:"],
        lists: [
          [
          "Avisa por escrito a la secretaría o al organismo de comedor y pide que te indiquen los plazos aplicables.",
            "Pide fraccionamiento de la deuda y de la mensualidad.",
            "Presenta solicitud de beca comedor aunque el plazo ordinario esté cerrado (sobrevenida) y ayuda municipal si existe.",
            "Si hay vulnerabilidad social, servicios sociales del ayuntamiento: pueden cubrir el menú.",
          ],
        ],
      },
      {
        id: "beca-urgente",
        title: "La beca como solución estructural",
        paragraphs: [
          "La beca de comedor es una de las vías que pueden resolver el coste más allá del mes en curso. Si el plazo de tu comunidad está cerrado, la guía de beca fuera de plazo recoge segundas ventanas y la vía sobrevenida de 2026-27. El empadronamiento vigente es un requisito habitual: revísalo antes de solicitar.",
        ],
      },
    ],
  },
  {
    id: "alergias",
    pack: "comedor",
    path: "/comedor/documentos-alergia-comedor-escolar",
    h1: "Alergia en el comedor: documentos que pide el colegio",
    title: "Alergia en el comedor: documentos que pide el colegio",
    description:
      "Qué papel activa el menú adaptado: certificado médico oficial con los alimentos a evitar, protocolo de alérgenos del servicio y solicitud del centro. Sin consejo dietético.",
    lead:
      "El comedor no cambia el menú por una nota de los padres: hace falta certificado médico oficial que especifique los alimentos a evitar. Con él, el servicio activa el menú adaptado y su protocolo de alérgenos. Esta guía es estrictamente documental: qué papel, quién lo emite y dónde se entrega.",
    cta: { href: EDUCACION_URL, label: "Educación (protocolos por CCAA)" },
    related: relatedComedor,
    sections: [
      {
        id: "papel",
        title: "El papel que lo activa todo",
        paragraphs: [
          "El certificado médico (del pediatra del sistema público o del especialista) debe concretar la alergia o intolerancia y los alimentos implicados. Varios servicios de comedor reparten un modelo propio con apartados cerrados: pídelo en secretaría antes de la cita médica para que el profesional lo rellene bien a la primera. La Ley de seguridad alimentaria (artículo 40 de la Ley 17/2011) obliga a los comedores escolares a ofrecer menús adaptados: el certificado es la llave que abre ese derecho.",
        ],
      },
      {
        id: "entrega",
        title: "Dónde se entrega y cuándo",
        paragraphs: [
          "En la secretaría del centro al formalizar el alta en el servicio de comedor (o en cuanto se diagnostique la alergia, si surge con el curso empezado). El centro lo traslada a la empresa concesionaria, que adapta el menú y marca el protocolo interno de cocina y vigilancia. Renueva el certificado cuando caduque o cuando el diagnóstico cambie: los servicios suelen pedir actualización anual.",
        ],
      },
      {
        id: "mientras",
        title: "Mientras llega el certificado",
        paragraphs: [
          "Sin el documento, el servicio no puede modificar el menú por seguridad: el niño recibe el estándar o, según las reglas del centro, la familia puede llevar opción de casa transitoriamente. Es una decisión de cada consejo escolar, no una norma estatal: pregúntalo en secretaría y que la respuesta conste por escrito. Esta guía no sustituye al consejo de tu pediatra ni fija pautas dietéticas: solo ordena los papeles.",
        ],
      },
    ],
  },
  {
    id: "impago",
    pack: "comedor",
    path: "/comedor/impago-comedor-escolar",
    h1: "Impago del comedor escolar: qué puede pasar",
    title: "Impago del comedor escolar: qué puede pasar",
    description:
      "Una mensualidad impagada puede suspender el servicio según la ordenanza municipal; la deuda se reclama con recargos. Fraccionamiento, beca y servicios sociales como salidas.",
    lead:
      "El impago de una mensualidad causa la suspensión temporal del servicio hasta abonar la deuda en muchas ordenanzas municipales; la deuda sigue reclamándose por vía administrativa. No es una multa, pero tiene recargos si acaba en vía de apremio.",
    cta: { href: EDUCACION_URL, label: "Educación (comedores por CCAA)" },
    related: [
      { href: "/comedor/no-puedo-pagar-comedor-escolar", label: "No puedo pagar el comedor" },
      { href: "/comedor/beca-comedor-fuera-de-plazo", label: "Beca fuera de plazo" },
    ],
    sections: [
      {
        id: "mecanica",
        title: "La mecánica del impago",
        paragraphs: [
          "El patrón habitual de las ordenanzas: recibo devuelto, un plazo de un mes para abonar, recordatorio o reclamación y, si sigue impagado, suspensión del servicio. La deuda no prescribe por el hecho de dejar el comedor: la gestión de cobro sigue su curso. Cada ayuntamiento o consejería tiene su ordenanza de precios públicos: la tuya está publicada en la sede electrónica municipal, y es el documento que manda.",
        ],
      },
      {
        id: "salidas",
        title: "Las tres salidas legales",
        paragraphs: [
          "Fraccionamiento de la deuda (solicítalo por escrito antes del vencimiento), beca comedor para el resto del curso (la guía de beca fuera de plazo abre la vía) y servicios sociales cuando hay vulnerabilidad social: pueden hacerse cargo del menú o mediar con el organismo gestor. Ninguna pasa por ignorar los avisos: la suspensión llega igual y la plaza puede perderse si hay lista de espera.",
        ],
      },
    ],
  },
  {
    id: "ies-sin-comedor",
    pack: "comedor",
    path: "/comedor/ies-sin-comedor",
    h1: "El instituto no tiene comedor: qué opciones hay",
    title: "El instituto no tiene comedor: qué opciones hay",
    description:
      "Muchos institutos de secundaria no tienen comedor: comedores en centros cercanos, ayudas para comedor fuera del centro, horario partido y qué reivindicar ante AMPA y consejería.",
    lead:
      "Buena parte de los institutos de Educación Secundaria no ofrecen comedor: el servicio se concentró en infantil y primaria. Las familias con jornadas imposibles se las arreglan con comedores de otros centros, autorizaciones para salir del centro y, donde existe, la ayuda para comedor fuera del centro de la comunidad.",
    cta: { href: EDUCACION_URL, label: "Educación (servicios complementarios)" },
    related: relatedComedor,
    sections: [
      {
        id: "porque",
        title: "Por qué pasa",
        paragraphs: [
          "El comedor escolar es un servicio complementario asociado sobre todo a primaria; en los IES la oferta es muy desigual y depende de la comunidad y del municipio. No hay un derecho estatal a comedor de secundaria: hay convocatorias de ayudas y planes municipales que cubren parte del hueco. Si el IES no tiene servicio, las opciones reales son las siguientes.",
        ],
      },
      {
        id: "opciones",
        title: "Opciones reales",
        paragraphs: ["Lo que hacen las familias que se organizan con el instituto sin comedor:"],
        lists: [
          [
            "Comedor en un centro público cercano: algunos ayuntamientos y consejerías admiten alumnos de IES en comedores de primaria del entorno; pregúntalo en la unidad de comedor, no en el IES.",
            "Autorización para salir del centro a mediodía: la regla la fija el propio instituto.",
            "Ayudas para comedor fuera del centro que convocan algunas comunidades para casos con jornada lectiva partida.",
            "AMPA y concejalía de educación: presión organizada ha creado servicios municipales en municipios medianos.",
          ],
        ],
      },
    ],
  },
];
