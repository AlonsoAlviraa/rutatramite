// Guiones de vídeo cortos (9:16) para llegar a personas inmigrantes y llevarlas a rutatramite.com.
// Fuente única de verdad del renderizador `render-videos.mjs`.
// Cada afirmación procede de la guía indicada en `fuente`; no añadir promesas,
// cifras ni experiencias no contrastadas con esas páginas.

export const MARCA = {
  sitio: "rutatramite.com",
  titulo: "RutaTrámite",
  nota: "Guía independiente · el alta en el padrón es gratuita",
};

export const VIDEOS = [
  {
    id: "sin-papeles-si-puedes",
    audiencia: "Personas en situación administrativa irregular (no UE)",
    kicker: "Empadronamiento · extranjeros no UE",
    hook: {
      texto: "¿Estás en España sin papeles? Sí puedes empadronarte.",
      enfasis: ["sin papeles", "sí puedes"],
    },
    beats: [
      {
        titulo: "Tu situación irregular no impide el alta",
        cuerpo: "El ayuntamiento comprueba identidad y residencia; con este trámite no concede ni deniega autorizaciones de extranjería.",
      },
      {
        titulo: "Te identificas con pasaporte vigente",
        cuerpo: "Si ya tienes NIE o tarjeta de identidad de extranjero, se usa ese documento. Un resguardo genérico de la TIE no basta.",
      },
      {
        titulo: "Sin contrato propio también hay vías",
        cuerpo: "Vivienda de un familiar con autorización, establecimiento colectivo o comprobación municipal de tu residencia real.",
      },
      {
        titulo: "Ojo: el padrón no te regulariza",
        cuerpo: "Acredita residencia municipal; no concede permiso de residencia ni de trabajo. Sí puede servirte como prueba en otros expedientes.",
      },
    ],
    cta: {
      titulo: "Qué documento sirve en tu caso",
      url: "https://rutatramite.com/empadronarse/extranjeros-no-ue",
      ruta: "rutatramite.com/empadronarse/extranjeros-no-ue",
    },
    caption:
      "¿Estás en España sin papeles? El empadronamiento es posible: el ayuntamiento comprueba identidad y residencia, no tu autorización. Te explicamos con qué documento presentarte y por qué el padrón no es un permiso. Guía gratuita con fuentes oficiales.",
    hashtags: ["empadronamiento", "sinpapeles", "extranjeria", "inmigrantesenespaña", "vivirenespaña"],
    fuente: "content/escenarios/extranjeros-no-ue.md",
  },
  {
    id: "ue-no-esperes-certificado",
    audiencia: "Ciudadanos de la UE, EEE o Suiza recién llegados",
    kicker: "Empadronamiento · ciudadanos UE",
    hook: {
      texto: "¿Eres de la UE? No esperes al certificado de registro para empadronarte.",
      enfasis: ["No esperes", "empadronarte"],
    },
    beats: [
      {
        titulo: "Tu pasaporte o DNI de origen basta",
        cuerpo: "Acredita tu identidad conforme a las instrucciones padronales y puedes solicitar el alta donde resides habitualmente.",
      },
      {
        titulo: "¿Ya tienes certificado de registro UE?",
        cuerpo: "Se consigna su NIE y lo acompañas de tu pasaporte o DNI. Pero tenerlo no es requisito previo para pedir el padrón.",
      },
      {
        titulo: "No hay que traer contrato de trabajo",
        cuerpo: "No existe un requisito nacional de contrato laboral de tres meses. Lo que se comprueba es dónde vives.",
      },
      {
        titulo: "Como UE no renovas cada 2 años",
        cuerpo: "Pero el ayuntamiento puede hacer comprobaciones periódicas de residencia. Responde sus avisos con la gestión que indiquen.",
      },
    ],
    cta: {
      titulo: "Guía completa para ciudadanos UE",
      url: "https://rutatramite.com/empadronarse/extranjeros-ue",
      ruta: "rutatramite.com/empadronarse/extranjeros-ue",
    },
    caption:
      "¿Europeo recién llegado? No esperes al certificado de registro para empadronarte: tu pasaporte o DNI de tu país basta para pedir el alta. Y no, no hace falta contrato de trabajo. Guía gratuita paso a paso.",
    hashtags: ["empadronamiento", "ueenespaña", "extranjeria", "mudanzaespaña", "europeosenespaña"],
    fuente: "content/escenarios/extranjeros-ue.md",
  },
  {
    id: "padron-caduca-2-anos",
    audiencia: "Extranjeros no UE con padrón dado de alta o próximo a vencer",
    kicker: "Renovación bienal · padrón",
    hook: {
      texto: "«El padrón caduca a los 2 años»: cierto, pero no para todos.",
      enfasis: ["cierto, pero no para todos"],
    },
    beats: [
      {
        titulo: "Sí renovan cada 2 años",
        cuerpo: "Extranjeros no comunitarios sin autorización de residencia de larga duración.",
      },
      {
        titulo: "No renovan así",
        cuerpo: "UE, EEE y Suiza; titulares de tarjeta de régimen comunitario y de residencia de larga duración: tienen comprobaciones distintas.",
      },
      {
        titulo: "¿Desde cuándo se cuentan?",
        cuerpo: "Dos años desde el alta o desde tu última renovación expresa. Conserva ese justificante, no solo el primero.",
      },
      {
        titulo: "No esperes la carta",
        cuerpo: "El preaviso es potestativo. Si vence y no renuevas, el ayuntamiento puede declarar la baja por caducidad, con resolución notificada.",
      },
    ],
    cta: {
      titulo: "Comprueba si te toca renovar",
      url: "https://rutatramite.com/empadronarse/renovacion-2-anos",
      ruta: "rutatramite.com/empadronarse/renovacion-2-anos",
    },
    caption:
      "¿Te dijeron que el padrón caduca a los 2 años? Cierto para extracomunitarios sin larga duración, pero UE y tarjeta comunitaria no siguen ese ciclo. Mira desde qué fecha se cuenta y por qué no conviene esperar la carta.",
    hashtags: ["empadronamiento", "renovacionpadron", "extranjeria", "nie", "tie"],
    fuente: "content/escenarios/renovacion-2-anos.md",
  },
  {
    id: "casa-de-familiar-si-puedes",
    audiencia: "Personas que viven en vivienda de familiar o pareja, sin contrato propio",
    kicker: "Empadronamiento · sin contrato",
    hook: {
      texto: "¿Vives en casa de un familiar? Sí puedes empadronarte.",
      enfasis: ["casa de un familiar", "sí puedes"],
    },
    beats: [
      {
        titulo: "Alguien empadronado puede autorizarte",
        cuerpo: "Una persona adulta inscrita en esa vivienda, con contrato o propiedad a su nombre, firma tu autorización por escrito.",
      },
      {
        titulo: "¿Alquilas una habitación?",
        cuerpo: "Si tienes documento propio de la habitación, revisa esa vía concreta en la sede de tu ayuntamiento.",
      },
      {
        titulo: "¿Acuerdo verbal o sin autorización?",
        cuerpo: "Presenta las pruebas que tengas y explica tu residencia real: el ayuntamiento puede comprobarla por otros medios.",
      },
      {
        titulo: "Nunca inventes firmas ni contratos",
        cuerpo: "No pidas una firma que afirme una convivencia que no existe. Expón tu situación y pide la vía alternativa.",
      },
    ],
    cta: {
      titulo: "Cómo empadronarte sin contrato",
      url: "https://rutatramite.com/empadronarse/sin-contrato",
      ruta: "rutatramite.com/empadronarse/sin-contrato",
    },
    caption:
      "¿Vives con tu familia o tu pareja y crees que no puedes empadronarte sin contrato? Te explicamos quién puede autorizar tu alta y qué hacer si no consigues autorización. Guía gratuita.",
    hashtags: ["empadronamiento", "sincontrato", "casadefamiliares", "alquiler", "tramitesespaña"],
    fuente: "content/escenarios/sin-contrato.md",
  },
  {
    id: "padron-arraigo-verdad",
    audiencia: "Personas que preparan un arraigo y valoran el papel del padrón",
    kicker: "Extranjería · arraigo y padrón",
    hook: {
      texto: "El padrón NO te regulariza. Pero para el arraigo importa mucho.",
      enfasis: ["NO te regulariza", "importa mucho"],
    },
    beats: [
      {
        titulo: "Prueba de permanencia, no permiso",
        cuerpo: "El padrón acredita residencia municipal. Es una prueba dentro del expediente de arraigo; no decide por sí solo el resultado.",
      },
      {
        titulo: "Fecha de alta y permanencia no son lo mismo",
        cuerpo: "Empadronarte tarde no descarta una permanencia anterior que puedas acreditar por otras vías.",
      },
      {
        titulo: "Mantén el padrón vivo",
        cuerpo: "Si te corresponde renovar cada 2 años, hacerlo conserva la continuidad de tu inscripción. Guarda cada justificante.",
      },
      {
        titulo: "Cada modalidad exige lo suyo",
        cuerpo: "Arraigo social, laboral y demás modalidades tienen requisitos propios. Revisa la tuya antes de presentar nada.",
      },
    ],
    cta: {
      titulo: "Padrón y arraigo, sin mitos",
      url: "https://rutatramite.com/extranjeria/arraigo-padron",
      ruta: "rutatramite.com/extranjeria/arraigo-padron",
    },
    caption:
      "Verdad incómoda: el padrón NO regulariza. Pero sí es prueba de permanencia para el arraigo, y renovarlo a tiempo conserva tu continuidad. Te lo explicamos sin mitos, con fuentes oficiales.",
    hashtags: ["arraigoespaña", "arraigosocial", "empadronamiento", "extranjeria", "regularizacion"],
    fuente: "content/escenarios/extranjeros-no-ue.md y src/lib/tramites/extranjeria.ts (arraigo-padron)",
  },
  {
    id: "cita-madrid-oficinas",
    audiencia: "Personas que se empadronan en Madrid capital",
    kicker: "Cita previa · Madrid capital",
    hook: {
      texto: "Cita para empadronarte en Madrid: no compliques la búsqueda.",
      enfasis: ["Madrid", "no compliques"],
    },
    beats: [
      {
        titulo: "Todo sale de la sede oficial",
        cuerpo: "En la ficha de empadronamiento de Madrid, opción presencial: «Cita previa para Padrón». Ahí están los formularios.",
      },
      {
        titulo: "Cualquier oficina de Línea Madrid",
        cuerpo: "Las oficinas atienden el padrón con cita con independencia de tu distrito de empadronamiento. No te encierres en una sola.",
      },
      {
        titulo: "Reserva a nombre del adulto que intervenga",
        cuerpo: "Guarda el justificante con oficina, dirección, fecha y gestión, y compruébalo antes de desplazarte.",
      },
      {
        titulo: "¿Sin huecos o ya iniciaste por internet?",
        cuerpo: "Revisa otras oficinas y no mantengas el mismo trámite por internet y presencial a la vez. La cita no es el alta: conserva después el justificante.",
      },
    ],
    cta: {
      titulo: "Cita de padrón en Madrid, paso a paso",
      url: "https://rutatramite.com/empadronarse/cita-previa-madrid",
      ruta: "rutatramite.com/empadronarse/cita-previa-madrid",
    },
    caption:
      "Si te empadronas en Madrid capital: la cita se pide en la ficha oficial de la sede, y puedes elegir cualquier oficina de Línea Madrid, no solo la de tu distrito. Ojo: si faltan consentimientos en la vía online, tienes 5 días naturales.",
    hashtags: ["cita_previa", "madrid", "empadronamiento", "lineamadrid", "tramitesmadrid"],
    fuente: "content/escenarios/cita-previa-madrid.md",
  },
];
