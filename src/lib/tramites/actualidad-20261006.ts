import type { Guide } from "@/lib/tramites/types";

const reviewedAt = "2026-10-06";

const votoSources = [
  {
    href: "https://www.boe.es/eli/es/rd/2026/10/05/806",
    label: "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre",
  },
  {
    href: "https://www.correos.com/sala-prensa/ya-se-puede-solicitar-el-voto-por-correo-para-las-elecciones-generales-del-29-de-noviembre/",
    label: "Correos, 6 de octubre de 2026: plazos de esta convocatoria",
  },
  {
    href: "https://www.correos.es/es/es/particulares/para-el-ciudadano/voto-por-correo",
    label: "Correos: solicitud del voto por correo",
  },
  {
    href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#asetentaydos",
    label: "LOREG, artículos 72 y 73: voto por correo desde España",
  },
];

export const ACTUALIDAD_20261006_GUIDES: Guide[] = [
  {
    id: "voto-por-correo-29n",
    pack: "elecciones",
    path: "/elecciones/voto-por-correo",
    h1: "Voto por correo para el 29 de noviembre de 2026",
    title: "Voto por correo: solicitud hasta el 19 de noviembre",
    description:
      "Correos admite la solicitud del voto por correo hasta el 19 de noviembre de 2026. El depósito termina el 25 de noviembre. Si el censo acepta la petición, ese día se vota por correo.",
    lead:
      "Correos abrió el 6 de octubre de 2026 la solicitud del voto por correo para las elecciones a las Cortes Generales del domingo 29 de noviembre. Pides el certificado de inscripción en el censo hasta el 19 de noviembre, inclusive. Si la Oficina del Censo Electoral acepta la solicitud, el 29 de noviembre votas por correo.",
    reviewedAt,
    cta: {
      href: "https://www.correos.es/es/es/particulares/para-el-ciudadano/voto-por-correo",
      label: "Solicitar el voto por correo en Correos",
    },
    secondaryCta: {
      href: "https://www.boe.es/eli/es/rd/2026/10/05/806",
      label: "Leer la convocatoria en el BOE",
    },
    sources: votoSources,
    related: [
      { href: "/elecciones/calendario-29-noviembre", label: "Calendario oficial de esta convocatoria" },
      { href: "/elecciones/quien-puede-votar", label: "Quién vota en estas elecciones" },
      { href: "/empadronarse", label: "Empadronarse" },
    ],
    disclaimer:
      "No somos Correos, la Oficina del Censo Electoral ni la Junta Electoral. Los plazos de esta página son los publicados el 6 de octubre de 2026. Una instrucción posterior de la Junta Electoral puede cambiar un plazo.",
    faqs: [
      {
        q: "¿Hasta qué día pido el voto por correo?",
        a: "Hasta el 19 de noviembre de 2026, inclusive, según la nota de Correos de ese 6 de octubre. La LOREG abre el plazo con la convocatoria y lo cierra el décimo día anterior a la votación.",
      },
      {
        q: "¿Puedo votar en la mesa si ya pedí el voto por correo?",
        a: "Cuando la Oficina del Censo Electoral anota la solicitud, el artículo 73 de la LOREG impide el voto personal en la mesa. Correos repite esa consecuencia en la página de esta convocatoria.",
      },
    ],
    sections: [
      {
        id: "dos-vias",
        title: "Pídelo por internet o en una oficina",
        paragraphs: [
          "Por internet, Correos pide firma electrónica. Acepta un certificado de persona física reconocido por el Ministerio de Industria y el DNI electrónico. La página del trámite está en correos.es.",
          "En oficina, la solicitud la formulas tú, con el DNI, el pasaporte o el permiso de conducir originales. Correos no admite la fotocopia. Hay cita previa en la web, en la app y en la Oficina Virtual.",
          "Si una enfermedad o una discapacidad te impide ir, puede presentar la solicitud una persona autorizada de forma notarial o consular. Hace falta un certificado médico oficial. La autorización es individual: un representante, un elector.",
        ],
      },
      {
        id: "despues",
        title: "La documentación sale a partir del 9 de noviembre",
        paragraphs: [
          "Correos entrega las solicitudes a las delegaciones provinciales de la Oficina del Censo Electoral. Esa oficina envía la documentación a partir del 9 de noviembre de 2026, a la dirección que hayas escrito en la solicitud. Puede ser distinta de tu domicilio habitual.",
          "El envío incluye las papeletas, el sobre de votación, el certificado de inscripción, el sobre dirigido a tu mesa y una hoja explicativa. El aviso de recibo lo firmas tú, después de acreditar la identidad. Si no estás en casa, recoges el envío en la oficina de Correos que te indiquen.",
        ],
      },
      {
        id: "deposito",
        title: "El depósito termina el 25 de noviembre",
        paragraphs: [
          "Metes la papeleta en el sobre de votación y cierras ese sobre. Juntas el sobre de votación y el certificado dentro del sobre dirigido a la mesa. Lo entregas en Correos como correo certificado. Este envío no lleva franqueo.",
          "Para estas elecciones, Correos fija el final del depósito el 25 de noviembre de 2026, en el horario de la oficina. La LOREG exige remitirlo antes del tercer día previo a la votación. Correos ha concretado esa regla en el 25 de noviembre.",
          "Quien vive en el extranjero y está inscrito en el censo de residentes ausentes sigue otro procedimiento, el del artículo 75 de la LOREG. Esta guía es la del voto por correo desde España.",
        ],
      },
    ],
  },
  {
    id: "calendario-29n",
    pack: "elecciones",
    path: "/elecciones/calendario-29-noviembre",
    h1: "Calendario de las elecciones del 29 de noviembre de 2026",
    title: "Elecciones 29 de noviembre: fechas del BOE",
    description:
      "El Real Decreto 806/2026 convoca elecciones el 29 de noviembre, abre la campaña el 13 de noviembre y reúne las Cámaras el 23 de diciembre.",
    lead:
      "El Real Decreto 806/2026, publicado en el BOE del 6 de octubre, disuelve el Congreso y el Senado elegidos el 23 de julio de 2023 y convoca elecciones para el domingo 29 de noviembre de 2026. Entró en vigor el mismo día de su publicación.",
    reviewedAt,
    cta: {
      href: "https://www.boe.es/eli/es/rd/2026/10/05/806",
      label: "Abrir el Real Decreto 806/2026",
    },
    secondaryCta: {
      href: "https://www.correos.es/es/es/particulares/para-el-ciudadano/voto-por-correo",
      label: "Ir al voto por correo de Correos",
    },
    sources: [
      votoSources[0],
      votoSources[1],
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672",
        label: "Ley Orgánica 5/1985, del Régimen Electoral General",
      },
      {
        href: "https://infoelectoral.interior.gob.es/export/sites/default/pdf/procesos_electorales/Elecciones-Generales-29-N/Calendario-mural-elecciones-Cortes-Generales-2026.pdf",
        label: "Ministerio del Interior: calendario mural de estas Cortes",
      },
    ],
    related: [
      { href: "/elecciones/voto-por-correo", label: "Cómo pedir el voto por correo" },
      { href: "/elecciones/quien-puede-votar", label: "Quién puede votar" },
      { href: "/elecciones/nuevo-partido-coalicion", label: "Coalición, Frente Amplio y candidaturas" },
      { href: "/elecciones/huelga-general-sindicatos", label: "Huelga general: el comunicado no fija el día" },
    ],
    disclaimer:
      "Las fechas de campaña y de constitución salen del real decreto. Las del voto por correo salen de la nota de Correos del 6 de octubre de 2026. Una resolución de la Junta Electoral Central puede precisar un trámite.",
    sections: [
      {
        id: "convocatoria",
        title: "Qué fija el real decreto",
        paragraphs: [
          "El artículo 1 disuelve las dos Cámaras elegidas el 23 de julio de 2023. El artículo 2 convoca las elecciones para el domingo 29 de noviembre de 2026. El artículo 6 dice que se rigen por la Ley Orgánica 5/1985 y por su desarrollo.",
          "El anexo reparte los diputados por circunscripción. Madrid elige 38 y Barcelona 32. Ceuta y Melilla eligen un diputado cada una. En el Senado, cada provincia elige cuatro senadores, con el reparto insular y de Ceuta y Melilla que detalla el artículo 3.",
        ],
      },
      {
        id: "campana",
        title: "Campaña y constitución de las Cámaras",
        paragraphs: [
          "La campaña dura quince días. Empieza a las cero horas del viernes 13 de noviembre de 2026 y termina a las veinticuatro horas del viernes 27 de noviembre.",
          "Las Cámaras elegidas se reúnen en sesión constitutiva el 23 de diciembre de 2026, a las diez de la mañana.",
        ],
      },
      {
        id: "correo",
        title: "Plazos de Correos en esta misma convocatoria",
        paragraphs: [
          "La solicitud del voto por correo desde España está abierta desde la convocatoria y, según Correos, hasta el 19 de noviembre de 2026 inclusive.",
          "La documentación empieza a enviarse el 9 de noviembre. El depósito del voto en oficina termina el 25 de noviembre de 2026.",
        ],
      },
      {
        id: "plazos-que-busca-la-gente",
        title: "Candidaturas, encuestas y jornada de reflexión",
        paragraphs: [
          "El artículo 44.2 de la LOREG da diez días siguientes a la convocatoria para comunicar una coalición a la Junta. El artículo 45 abre la presentación de candidaturas entre el decimoquinto y el vigésimo día posteriores a la convocatoria. El artículo 47.1 manda publicar las presentadas el vigésimo segundo día, y el 47.3 proclamarlas el vigésimo séptimo. La convocatoria salió en el BOE el 6 de octubre de 2026. El calendario mural del Ministerio del Interior aplica esos artículos a este proceso.",
          "El artículo 69.7 prohíbe publicar, difundir o reproducir sondeos durante los cinco días anteriores al de la votación. La votación es el 29 de noviembre, así que esa prohibición cubre del 24 al 28 de noviembre.",
          "El real decreto cierra la campaña a las veinticuatro horas del viernes 27 de noviembre. El artículo 51 de la LOREG dice que la campaña termina, en todo caso, a las cero horas del día inmediatamente anterior a la votación. El mural del Interior rotula el día siguiente como jornada de reflexión. Ese día es el sábado 28 de noviembre.",
        ],
      },
    ],
  },
  {
    id: "quien-puede-votar-29n",
    pack: "elecciones",
    path: "/elecciones/quien-puede-votar",
    h1: "Quién vota el 29 de noviembre de 2026",
    title: "Elecciones generales: censo, padrón y residencia",
    description:
      "En las elecciones a las Cortes votan los españoles mayores de edad inscritos en el censo. El padrón y el NIE son trámites distintos del sufragio de esta convocatoria.",
    lead:
      "El 29 de noviembre de 2026 se elige el Congreso y el Senado. El artículo 2 de la LOREG reconoce el sufragio a los españoles mayores de edad que no estén privados de él y que figuren en el censo electoral vigente.",
    reviewedAt,
    cta: {
      href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#asegundo",
      label: "Leer el artículo 2 de la LOREG",
    },
    secondaryCta: {
      href: "https://www.correos.es/es/es/particulares/para-el-ciudadano/voto-por-correo",
      label: "Pedir el voto por correo si te corresponde",
    },
    sources: [
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#asegundo",
        label: "LOREG, artículo 2: sufragio activo",
      },
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#acientosetentayseis",
        label: "LOREG, artículo 176: sufragio municipal de residentes extranjeros",
      },
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#asetentaycinco",
        label: "LOREG, artículo 75: españoles residentes en el extranjero",
      },
      votoSources[0],
    ],
    related: [
      { href: "/elecciones/voto-por-correo", label: "Voto por correo desde España" },
      { href: "/empadronarse", label: "Alta en el padrón municipal" },
      { href: "/extranjeria", label: "Citas y documentos de extranjería" },
    ],
    disclaimer:
      "Esta guía distingue la convocatoria del 29 de noviembre de otras elecciones. No consulta tu censo ni tu expediente. La inscripción se comprueba en la Oficina del Censo Electoral.",
    faqs: [
      {
        q: "¿El empadronamiento me incluye en el censo de estas elecciones?",
        a: "El padrón municipal y el censo electoral son registros distintos. Para votar el 29 de noviembre hace falta figurar en el censo electoral vigente. Comprueba esa inscripción en la Oficina del Censo Electoral.",
      },
      {
        q: "Vivo en España con NIE o TIE. ¿Esta convocatoria es la mía?",
        a: "El sufragio de las elecciones a las Cortes corresponde a los españoles. El artículo 176 de la LOREG reconoce sufragio en las elecciones municipales a determinados residentes extranjeros. El Real Decreto 806/2026 convoca Congreso y Senado, no elecciones municipales.",
      },
    ],
    sections: [
      {
        id: "espanoles",
        title: "Españoles mayores de edad e inscritos",
        paragraphs: [
          "El artículo 2 de la LOREG atribuye el sufragio a los españoles mayores de edad que no estén en los supuestos del artículo 3, y exige la inscripción en el censo electoral vigente. El artículo 3 aparta a quien cumple una pena de privación del derecho de sufragio.",
          "Si prevés no estar en tu localidad el 29 de noviembre, el voto por correo desde España es el trámite de Correos descrito en la guía de esta convocatoria.",
        ],
      },
      {
        id: "residencia",
        title: "Residir en España y votar son pasos distintos",
        paragraphs: [
          "El padrón acredita el domicilio municipal ante el ayuntamiento. El NIE y la TIE son documentos de extranjería. Ninguno de los dos sustituye la nacionalidad española que el artículo 2 exige para estas Cortes.",
          "El artículo 176 abre el sufragio municipal a personas residentes en España que sean ciudadanos de la Unión Europea, si reúnen los requisitos de elector y han manifestado la voluntad de votar en España, y también a residentes de países con tratado de reciprocidad. Esa regla es de las elecciones municipales.",
          "Quien ha adquirido la nacionalidad española vota como español, con inscripción en el censo. El alta en el padrón sigue siendo el trámite del ayuntamiento cuando cambia el domicilio.",
        ],
      },
      {
        id: "cera",
        title: "Españoles que viven en el extranjero",
        paragraphs: [
          "El censo electoral separa a los electores residentes en España de los residentes ausentes que viven en el extranjero. El artículo 75 regula el voto de estos últimos en las elecciones al Congreso y al Senado: la documentación la envía de oficio la Oficina del Censo Electoral.",
          "Ese procedimiento usa embajadas y oficinas consulares. No es la solicitud en una oficina de Correos de España.",
        ],
      },
    ],
  },
  {
    id: "nuevo-partido-coalicion-29n",
    pack: "elecciones",
    path: "/elecciones/nuevo-partido-coalicion",
    h1: "Nuevo partido de izquierdas o coalición: qué vale el 29 de noviembre",
    title: "Frente Amplio: coalición, no un partido inscrito",
    description:
      "Un nombre de campaña no inscribe un partido. La coalición se comunica a la Junta en los diez días siguientes a la convocatoria. Las listas oficiales salen en el BOE.",
    lead:
      "Quien busca «nuevo partido de izquierdas» o «Frente Amplio» está leyendo el nombre que varias crónicas del 5 y el 6 de octubre de 2026 atribuyen al espacio de Sumar. Ese anuncio no inscribe un partido en el Registro del Ministerio del Interior ni proclama una candidatura.",
    reviewedAt,
    cta: {
      href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/preguntas-frecuentes/candidatos-y-candidaturas/",
      label: "Leer en Interior qué es una coalición",
    },
    secondaryCta: {
      href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/Elecciones-Generales-29-N/",
      label: "Impresos oficiales de esta convocatoria",
    },
    sources: [
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#acuarentaycuatro",
        label: "LOREG, artículo 44: partidos, coaliciones y plazo de comunicación",
      },
      {
        href: "https://infoelectoral.interior.gob.es/es/formaciones-politicas/financiacion-de-partidos-politicos/informacion-especifica-para-coaliciones-electorales/",
        label: "Interior: una coalición no se inscribe en el Registro de Partidos",
      },
      {
        href: "https://www.elplural.com/politica/espana/izquierda-alternativa-asegura-estar-preparada-29-n-estamos-listas-somos-mas_800547102",
        label: "El Plural, 5 de octubre de 2026: el nombre Frente Amplio en el espacio de Sumar",
      },
      {
        href: "https://www.rtve.es/noticias/20261006/sanchez-revoluciona-tablero-politico-partidos-maquinaria-electoral/17253755.shtml",
        label: "RTVE, 6 de octubre de 2026: la presentación del candidato seguía pendiente",
      },
      votoSources[0],
    ],
    related: [
      { href: "/elecciones/calendario-29-noviembre", label: "Plazos de candidaturas, encuestas y reflexión" },
      { href: "/elecciones/quien-puede-votar", label: "Quién puede votar" },
      { href: "/elecciones/huelga-general-sindicatos", label: "Huelga general anunciada por los sindicatos" },
    ],
    disclaimer:
      "No somos la Junta Electoral ni un partido. Una crónica no proclama candidatos. La lista que cuenta es la que publique el BOE después de la proclamación.",
    faqs: [
      {
        q: "¿Frente Amplio es ya un partido nuevo?",
        a: "Interior dice que las coaliciones no se inscriben en el Registro de Partidos Políticos. Se constituyen al comunicar el pacto a la Junta. El nombre que citan las crónicas del 5 y el 6 de octubre no sustituye esa comunicación ni la proclamación de las listas.",
      },
      {
        q: "¿Quién es el candidato?",
        a: "El 6 de octubre de 2026 las crónicas decían que el candidato del espacio de Sumar seguía sin presentarse. Esta guía no nombra a nadie. El nombre oficial aparece en la candidatura proclamada.",
      },
    ],
    sections: [
      {
        id: "partido-o-coalicion",
        title: "Partido inscrito y coalición no son lo mismo",
        paragraphs: [
          "Pueden presentar listas los partidos y federaciones inscritos en el registro y las coaliciones comunicadas a la Junta. Lo dice el artículo 44.1 de la LOREG y lo repite la ficha de Interior sobre candidatos.",
          "Interior explica que no hay un registro público de coaliciones. No se inscriben en el Registro de Partidos Políticos ni hace falta registrarlas como asociación. Solo pueden integrarlas partidos y federaciones, no agrupaciones de electores. El pacto se presenta ante la Junta.",
          "La comunicación, según el artículo 44.2, se hace en los diez días siguientes a la convocatoria y debe incluir la denominación, las normas de la coalición y las personas titulares de sus órganos de dirección o coordinación. La convocatoria se publicó el 6 de octubre de 2026.",
        ],
      },
      {
        id: "lo-que-dicen-las-cronicas",
        title: "Lo que dicen las crónicas del Frente Amplio",
        paragraphs: [
          "El Plural, el 5 de octubre de 2026, escribió que partidos de Sumar confirmaban reeditar la coalición con el nombre Frente Amplio y que arrancaban sin candidato. RTVE, el 6 de octubre, escribió que ese espacio anunciaba presentar el Frente Amplio y un candidato, y que el nombre seguía sin cerrarse.",
          "Esas dos piezas son prensa. No son el impreso de coalición de la Junta ni una lista del BOE. Un partido que ya está en el registro puede presentarse solo. Quien entra en una coalición en una circunscripción no presenta allí candidatura propia si la coalición concurre a la misma elección: lo dice el artículo 44.3.",
        ],
      },
      {
        id: "cuando-hay-lista",
        title: "Cuándo hay una lista oficial",
        paragraphs: [
          "Las candidaturas se presentan entre el decimoquinto y el vigésimo día posteriores a la convocatoria, artículo 45. Se publican el vigésimo segundo día y se proclaman el vigésimo séptimo, artículo 47. El calendario mural de Interior es el cuadro de esta convocatoria.",
          "Hasta esa proclamación, un titular de periódico no coloca un nombre en la papeleta. Los impresos de coalición y de candidatura de estas Cortes están en la página de Infoelectoral del 29-N.",
        ],
      },
    ],
  },
  {
    id: "huelga-general-sindicatos-2026",
    pack: "elecciones",
    path: "/elecciones/huelga-general-sindicatos",
    h1: "Huelga general de los sindicatos por la vivienda y los salarios",
    title: "Huelga general: UGT y CCOO no han fijado el día",
    description:
      "El comunicado de UGT y CCOO del 6 de octubre de 2026 anuncia una huelga de 24 horas este otoño y deja la fecha para más adelante. El 29 de noviembre sigue siendo el día de las elecciones.",
    lead:
      "Quien busca «sindicatos huelga» o «huelga general vivienda» encuentra el acuerdo que UGT publicó el 6 de octubre de 2026 junto con CCOO: una huelga general de 24 horas este otoño, por salarios que alcancen para una vivienda. El comunicado no fija el día. Tiene que ratificarlo los órganos de dirección y la fecha se hablará con las organizaciones sociales y el Sindicato de Inquilinas.",
    reviewedAt,
    cta: {
      href: "https://ugt.es/ugt-y-ccoo-acuerdan-la-convocatoria-de-una-huelga-general-este-otono",
      label: "Leer el comunicado de UGT y CCOO",
    },
    secondaryCta: {
      href: "https://www.boe.es/buscar/doc.php?id=BOE-A-1977-6061",
      label: "Abrir el Real Decreto-ley 17/1977",
    },
    sources: [
      {
        href: "https://ugt.es/ugt-y-ccoo-acuerdan-la-convocatoria-de-una-huelga-general-este-otono",
        label: "UGT, 6 de octubre de 2026: acuerdo de huelga de 24 horas, sin fecha",
      },
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a28",
        label: "Constitución, artículo 28.2: derecho de huelga",
      },
      {
        href: "https://www.boe.es/buscar/doc.php?id=BOE-A-1977-6061",
        label: "Real Decreto-ley 17/1977: preaviso de la huelga",
      },
      votoSources[0],
    ],
    related: [
      { href: "/alquiler/propuestas-vivienda-6-octubre-2026", label: "Propuestas de vivienda del 6 de octubre" },
      { href: "/elecciones/calendario-29-noviembre", label: "El 29 de noviembre no se mueve con la huelga" },
      { href: "/elecciones/voto-por-correo", label: "Voto por correo" },
    ],
    disclaimer:
      "No somos UGT, CCOO ni la autoridad laboral. El día de la huelga es el que comuniquen los convocantes. Esta ficha se cerró el 6 de octubre de 2026, cuando el comunicado aún no traía fecha.",
    faqs: [
      {
        q: "¿Qué día es la huelga general?",
        a: "El comunicado de UGT del 6 de octubre de 2026 no da un día. Dice que la fecha se analizará con las organizaciones sociales y el Sindicato de Inquilinas, y que el acuerdo debe ratificarlo los órganos de dirección.",
      },
      {
        q: "¿La huelga cambia el día de las elecciones?",
        a: "No. El Real Decreto 806/2026 convoca las elecciones para el domingo 29 de noviembre de 2026. Una convocatoria de huelga no modifica ese real decreto.",
      },
    ],
    sections: [
      {
        id: "comunicado",
        title: "Qué dice el comunicado y qué no dice",
        paragraphs: [
          "UGT fecha la nota el 6 de octubre de 2026. El texto acuerda, pendiente de ratificación, una huelga general de 24 horas este otoño para reivindicar salarios dignos con los que acceder a una vivienda. Recuerda la propuesta sindical para el VI Acuerdo para el Empleo y la Negociación Colectiva, con incrementos de entre el 4 % y el 7 %, y un decálogo de vivienda: pacto, parque público, límite del precio del alquiler y aplicación de la Ley por el Derecho a la Vivienda.",
          "Esos porcentajes son la propuesta que el comunicado atribuye a la negociación del acuerdo de empleo. No son un salario publicado en el BOE.",
          "La nota llama a secundar la huelga en los centros de trabajo y en la calle. No nombra hora ni fecha. Hasta que los convocantes publiquen el día, una crónica que adelante noviembre o la víspera de la campaña es una previsión, no la convocatoria.",
        ],
      },
      {
        id: "preaviso",
        title: "El preaviso legal, cuando haya fecha",
        paragraphs: [
          "El artículo 28.2 de la Constitución reconoce el derecho de huelga y remite a la ley las garantías para mantener los servicios esenciales.",
          "El artículo 3 del Real Decreto-ley 17/1977 exige comunicar la huelga por escrito al empresario y a la autoridad laboral, con cinco días naturales de antelación como mínimo. La comunicación incluye los objetivos, las gestiones hechas, la fecha de inicio y la composición del comité de huelga. El artículo 4 sube ese preaviso a diez días naturales si la huelga afecta a empresas de servicios públicos, y pide dar publicidad a los usuarios antes de empezar.",
          "La sentencia del Tribunal Constitucional 11/1981 revisó partes de ese real decreto-ley. El preaviso que sigue publicado es el de esos artículos. Esta página no organiza un paro ni sustituye al comité de huelga.",
        ],
      },
      {
        id: "elecciones",
        title: "La huelga y la papeleta van por sitios distintos",
        paragraphs: [
          "El Congreso y el Senado se eligen el 29 de noviembre de 2026. La campaña del real decreto va del 13 al 27 de noviembre. Quien quiera votar y no pueda ir a la mesa tiene el voto por correo, con su propio plazo.",
          "Un día de huelga, cuando se convoque, no abre ni cierra el censo. El colegio electoral de esa convocatoria es el de la Junta y la Oficina del Censo, no el de la asamblea sindical.",
        ],
      },
    ],
  },
  {
    id: "decretos-vivienda-octubre-2026",
    pack: "alquiler",
    path: "/alquiler/decretos-vivienda-derogados-octubre-2026",
    h1: "El Congreso derogó el 2 de octubre los dos decretos de vivienda",
    title: "Decretos de vivienda derogados el 2 de octubre de 2026",
    description:
      "El BOE del 2 de octubre de 2026 publica la derogación del Real Decreto-ley 26/2026 y del Real Decreto-ley 27/2026. Un contrato se lee con la norma que siga publicada.",
    lead:
      "El 2 de octubre de 2026 el Congreso derogó el Real Decreto-ley 26/2026 y el Real Decreto-ley 27/2026, los dos de 29 de septiembre, sobre vivienda y alquiler. Las resoluciones están en el BOE de ese mismo día. Lo que un contrato pueda exigir es la norma que siga en vigor, no el texto derogado.",
    reviewedAt,
    cta: {
      href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20526",
      label: "Leer la derogación del Real Decreto-ley 26/2026",
    },
    secondaryCta: {
      href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20527",
      label: "Leer la derogación del Real Decreto-ley 27/2026",
    },
    sources: [
      {
        href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20526",
        label: "BOE, 2 de octubre de 2026: derogación del Real Decreto-ley 26/2026",
      },
      {
        href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20527",
        label: "BOE, 2 de octubre de 2026: derogación del Real Decreto-ley 27/2026",
      },
      {
        href: "https://www.boe.es/eli/es/rd/2026/04/22/326",
        label: "Real Decreto 326/2026, Plan Estatal de Vivienda 2026-2030",
      },
    ],
    related: [
      { href: "/alquiler/propuestas-vivienda-6-octubre-2026", label: "Propuestas del Consejo de Ministros del 6 de octubre" },
      { href: "/alquiler/plan-vivienda-2026-2030", label: "Plan Estatal de Vivienda 2026-2030" },
      { href: "/alquiler/bono-alquiler-joven", label: "Bono Alquiler Joven" },
      { href: "/elecciones/calendario-29-noviembre", label: "Convocatoria electoral del 29 de noviembre" },
    ],
    disclaimer:
      "No interpretamos tu contrato ni sustituimos al BOE. Esta ficha se cerró el 6 de octubre de 2026 con las dos resoluciones de derogación. Si el BOE publica después otro real decreto-ley, manda ese texto.",
    faqs: [
      {
        q: "¿Sigue en vigor el real decreto-ley de vivienda publicado a finales de septiembre?",
        a: "El BOE del 2 de octubre de 2026 publica el acuerdo del Congreso que deroga el Real Decreto-ley 26/2026 y el que deroga el Real Decreto-ley 27/2026. Un texto derogado no se aplica como norma vigente.",
      },
      {
        q: "¿El Plan Estatal de Vivienda 2026-2030 cayó con esos decretos?",
        a: "No. El Plan Estatal es el Real Decreto 326/2026, de 22 de abril. Las resoluciones del 2 de octubre derogan los reales decretos-ley 26/2026 y 27/2026. La ayuda concreta sigue dependiendo de la convocatoria de tu comunidad.",
      },
    ],
    sections: [
      {
        id: "que-cayo",
        title: "Qué publicó el BOE el 2 de octubre",
        paragraphs: [
          "La resolución del Congreso publicada como BOE-A-2026-20526 acuerda derogar el Real Decreto-ley 26/2026, de 29 de septiembre, de medidas urgentes para la protección de la función social de la vivienda y la ampliación de la oferta de vivienda asequible. Ese decreto se había publicado en el BOE número 241, de 30 de septiembre de 2026.",
          "La resolución BOE-A-2026-20527 acuerda derogar el Real Decreto-ley 27/2026, de 29 de septiembre, de medidas urgentes para reforzar la estabilidad de los contratos de arrendamiento de vivienda habitual. Ese decreto se había publicado en el BOE número 243, de 1 de octubre de 2026.",
          "Las dos resoluciones invocan el artículo 86.2 de la Constitución y llevan fecha de 2 de octubre de 2026, firmadas por la presidenta del Congreso.",
        ],
      },
      {
        id: "contrato",
        title: "Qué hacer con un contrato o una ayuda",
        paragraphs: [
          "Antes de firmar, revisar una prórroga o calcular una renta con una regla de septiembre, abre el BOE y comprueba si esa regla sigue publicada como vigente. El texto derogado explica lo que el Gobierno aprobó el 29 de septiembre. La resolución del 2 de octubre lo quitó del ordenamiento.",
          "El 6 de octubre de 2026 La Moncloa resumió un nuevo acuerdo del Consejo de Ministros. Esa nota no es el BOE. La guía de propuestas de ese día separa lo que dijo el Gobierno de la norma que sigue publicada. Hasta que el BOE publique un texto nuevo, un contrato se lee con la legislación que estas dos derogaciones dejaron en pie.",
          "Las ayudas al alquiler del Plan Estatal de Vivienda 2026-2030 y del Bono Alquiler Joven tienen su propio real decreto y su propia convocatoria autonómica. Una derogación de los decretos-ley de septiembre no abre ni cierra por sí sola el plazo de tu comunidad.",
        ],
      },
    ],
  },
  {
    id: "propuestas-vivienda-6-octubre-2026",
    pack: "alquiler",
    path: "/alquiler/propuestas-vivienda-6-octubre-2026",
    h1: "Propuestas de vivienda del Consejo de Ministros del 6 de octubre de 2026",
    title: "21 medidas de vivienda: acuerdo pendiente del BOE",
    description:
      "La Moncloa resume 21 medidas en dos reales decretos-ley. El sumario del BOE del 6 de octubre no los publica. La convalidación corresponde a la Diputación Permanente.",
    lead:
      "Quien busca «propuestas vivienda», «decreto alquiler» o «préstamo sin intereses» llega al resumen de La Moncloa del Consejo de Ministros del 6 de octubre de 2026. El Gobierno dice que aprobó dos reales decretos-ley, con 21 medidas. Ese resumen no es la norma. El sumario del BOE de ese día publica la convocatoria electoral y no un real decreto-ley nuevo de vivienda.",
    reviewedAt,
    cta: {
      href: "https://www.lamoncloa.gob.es/consejodeministros/resumenes/paginas/2026/061026-rueda-prensa-ministros.aspx",
      label: "Leer el resumen de La Moncloa",
    },
    secondaryCta: {
      href: "https://www.boe.es/boe/dias/2026/10/06/",
      label: "Abrir el sumario del BOE del 6 de octubre",
    },
    sources: [
      {
        href: "https://www.lamoncloa.gob.es/consejodeministros/resumenes/paginas/2026/061026-rueda-prensa-ministros.aspx",
        label: "La Moncloa, 6 de octubre de 2026: 21 medidas de vivienda",
      },
      {
        href: "https://www.boe.es/boe/dias/2026/10/06/",
        label: "Sumario del BOE del 6 de octubre de 2026",
      },
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a78",
        label: "Constitución, artículo 78: Diputación Permanente",
      },
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a86",
        label: "Constitución, artículo 86: convalidación de un real decreto-ley",
      },
      {
        href: "https://www.boe.es/eli/es/rd/2026/04/22/326",
        label: "Real Decreto 326/2026, Plan Estatal de Vivienda 2026-2030",
      },
    ],
    related: [
      { href: "/alquiler/decretos-vivienda-derogados-octubre-2026", label: "Los decretos del 29 de septiembre quedaron derogados" },
      { href: "/alquiler/plan-vivienda-2026-2030", label: "Plan Estatal que sí está publicado" },
      { href: "/elecciones/huelga-general-sindicatos", label: "Huelga anunciada por vivienda y salarios" },
    ],
    disclaimer:
      "No aplicamos una deducción ni un préstamo con esta ficha. Las cifras salen de la rueda de prensa resumida por La Moncloa el 6 de octubre de 2026. El texto que obliga es el que publique el BOE, si lo publica.",
    faqs: [
      {
        q: "¿Ya puedo pedir el préstamo de hasta 50.000 euros sin intereses?",
        a: "La Moncloa describe una línea del Instituto de Crédito Oficial, de 10.000 millones, con préstamos de hasta 50.000 euros sin intereses para la primera vivienda. El 6 de octubre de 2026 esa línea no aparece como real decreto-ley en el sumario del BOE. Sin ese texto y sin la convocatoria del ICO, no hay solicitud abierta en esta guía.",
      },
      {
        q: "¿Los contratos de alquiler pasan a ser indefinidos?",
        a: "La Moncloa distingue dos textos. Uno prorrogaría hasta dos años los contratos al corriente de pago y limitaría las subidas. El otro prevería la prórroga automática, salvo supuestos. El presidente dijo que no veía mayoría para convalidar el segundo, así que no entraría en vigor a la vez que el primero. Ninguno de los dos está en el sumario del BOE de ese día.",
      },
    ],
    sections: [
      {
        id: "no-es-el-boe",
        title: "Acuerdo del Gobierno y ley publicada",
        paragraphs: [
          "La Moncloa escribe que los dos reales decretos-ley mantienen la esencia de los aprobados el 29 de septiembre, que decayeron al no ser convalidados, y que incorporan medidas nuevas. El mismo 6 de octubre el BOE publicó la disolución de las Cortes. La nota dice que, por eso, la convalidación corresponde a la Diputación Permanente del Congreso.",
          "El artículo 86 de la Constitución somete el real decreto-ley a debate y votación de totalidad en el Congreso en los treinta días siguientes a su promulgación. El artículo 78 deja en la Diputación Permanente una representación de la Cámara cuando las Cortes no están reunidas. Hasta que el BOE publique el texto, las reglas de un contrato siguen siendo las que quedaron en vigor tras la derogación del 2 de octubre.",
        ],
      },
      {
        id: "cuatro-bloques",
        title: "Los cuatro bloques que enumeró La Moncloa",
        paragraphs: [
          "El resumen agrupa 21 medidas en cuatro objetivos. En el primero, el acceso al alquiler y a la compra: una deducción en el IRPF para quien paga alquiler, con el ejemplo de un alquiler de 800 euros al mes y una deducción cercana a 1.000 euros; un incentivo fiscal al pequeño propietario que alquile a precio asequible; y la línea del ICO de 10.000 millones, con préstamos de hasta 50.000 euros sin intereses para la primera vivienda.",
          "En el segundo, más oferta: 280 millones en avales para construcción industrializada, 400 millones para proveedores de vivienda social, y compras de inmuebles de la Seguridad Social por la entidad pública Casa 47.",
          "En el tercero, estabilidad: un decreto prorroga hasta dos años los contratos de quien esté al corriente y limita las subidas; el otro establece la prórroga automática salvo determinados supuestos. La Moncloa recoge que el presidente no ve hoy mayoría para convalidar esa segunda norma, y que por tanto no entraría en vigor al publicarse en el BOE, sino solo si la Diputación Permanente la convalida. El resumen añade protección de personas vulnerables sin alternativa habitacional, con garantías para el pequeño propietario.",
          "En el cuarto, especulación y alquiler de temporada o por habitaciones: límite a la compra por los llamados fondos buitre, beneficios fiscales de las socimi ligados al alquiler asequible, y pisos turísticos que tributen como negocio. Esas frases son las del resumen. El articulado, los supuestos y los importes exactos están en el texto que aún no publica el sumario.",
        ],
      },
      {
        id: "lo-que-sigue-en-pie",
        title: "Qué puedes usar mientras tanto",
        paragraphs: [
          "El Plan Estatal de Vivienda 2026-2030 es el Real Decreto 326/2026. No es uno de estos dos proyectos. El Bono Alquiler Joven sigue su propia convocatoria autonómica.",
          "Los reales decretos-ley 26/2026 y 27/2026 quedaron derogados por el Congreso el 2 de octubre. No los uses como texto vigente, y tampoco uses esta rueda de prensa como si ya los hubiera sustituido.",
        ],
      },
    ],
  },
];
