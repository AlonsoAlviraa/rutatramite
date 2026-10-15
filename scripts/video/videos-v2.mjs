// Serie 2 de vídeos (9:16, «más vistosos»): imágenes documentales del trayecto
// migratorio (Wikimedia Commons, licencia libre, créditos más abajo) seguidas de
// capturas reales de rutatramite.com que muestran el paso del trámite en la web.
// Las fotos son documentales: no afirman representar la ruta exacta del espectador
// ni una escena concreta de España salvo la valla de Ceuta.

export const MARCA_V2 = {
  sitio: "rutatramite.com",
  notaFoto: "Imágenes documentales · Wikimedia Commons",
};

// Apodos de foto → crédito completo (se copia también a creditos.json al renderizar).
export const CREDITOS_FOTOS = {
  lesbos1: {
    archivo: "fotos/lesbos1.jpg",
    titulo: "Syrians and Iraq refugees arrive at Skala Sykamias, Lesvos (Grecia), 2015",
    autor: "Ggia",
    licencia: "CC BY-SA 4.0",
    pagina: "https://commons.wikimedia.org/wiki/File:20151030_Syrians_and_Iraq_refugees_arrive_at_Skala_Sykamias_Lesvos_Greece_1.jpg",
  },
  lesbos2: {
    archivo: "fotos/lesbos2.jpg",
    titulo: "Syrians and Iraq refugees arrive at Skala Sykamias, Lesvos (Grecia), 2015",
    autor: "Ggia",
    licencia: "CC BY-SA 4.0",
    pagina: "https://commons.wikimedia.org/wiki/File:20151030_Syrians_and_Iraq_refugees_arrive_at_Skala_Sykamias_Lesvos_Greece_2.jpg",
  },
  seawatch1: {
    archivo: "fotos/seawatch1.jpg",
    titulo: "Rescate en el Mediterráneo (Sea-Watch 1)",
    autor: "Ruben Neugebauer / Sea-Watch.org",
    licencia: "CC BY-SA 4.0",
    pagina: "https://commons.wikimedia.org/wiki/File:1_Neugebauer_Sea-Watch_1_LoRes_02-2.jpg",
  },
  valla_vertical: {
    archivo: "fotos/valla_vertical.jpg",
    titulo: "Valla fronteriza de Ceuta",
    autor: "Youtryandyoutry",
    licencia: "CC BY-SA 4.0",
    pagina: "https://commons.wikimedia.org/wiki/File:CeutaBorderFence.jpg",
  },
  valla_paisaje: {
    archivo: "fotos/valla_paisaje.jpg",
    titulo: "Valla de Ceuta",
    autor: "Xemenendura",
    licencia: "CC BY-SA 3.0",
    pagina: "https://commons.wikimedia.org/wiki/File:Valla_de_Ceuta.jpg",
  },
};

export const VIDEOS_V2 = [
  {
    id: "la-ruta-completa",
    audiencia: "Personas recién llegadas a España, en especial no UE",
    caption:
      "Llegar fue lo más difícil. Ahora, el primer trámite útil: el padrón. Puedes hacerlo aunque tu situación aún no esté regularizada, es gratuito y no es un permiso de residencia. Guía gratuita con fuentes oficiales y asistente de documentos. Imágenes documentales de Wikimedia Commons.",
    hashtags: ["empadronamiento", "sinpapeles", "inmigrantesenespaña", "recienllegado", "arraigoespaña"],
    fuente: "content/escenarios/extranjeros-no-ue.md y portada/asistente de rutatramite.com",
    slides: [
      {
        tipo: "foto",
        img: "fotos/lesbos1.jpg",
        zoom: "in",
        kicker: "Tu ruta en España",
        titulo: "La parte difícil ya la hiciste: llegar.",
        enfasis: ["llegar"],
        dur: 3.4,
      },
      {
        tipo: "foto",
        img: ["fotos/seawatch1.jpg", "fotos/lesbos2.jpg"],
        zoom: "out",
        titulo: "Lo que viene ahora también cuenta. Empieza por el padrón.",
        enfasis: ["empieza por el padrón"],
        dur: 4.4,
      },
      {
        tipo: "foto",
        img: "fotos/valla_vertical.jpg",
        zoom: "in",
        titulo: "¿Sin papeles? Puedes empadronarte igual.",
        cuerpo: "Identidad y residencia reales. El alta es gratuita y no es un permiso de residencia.",
        enfasis: ["igual"],
        dur: 4.6,
      },
      {
        tipo: "captura",
        img: "sitio/guia-no-ue.png",
        banda: "Guía gratuita, paso a paso",
        cuerpo: "Qué documento sirve en tu caso, con enlaces a la sede oficial.",
        dur: 4.0,
      },
      {
        tipo: "captura",
        img: "sitio/asistente.png",
        banda: "Asistente de padrón",
        cuerpo: "Seis preguntas y tendrás la lista de documentos para tu caso.",
        dur: 4.0,
      },
      {
        tipo: "cta",
        titulo: "Tu ruta empieza aquí",
        ruta: "rutatramite.com/empadronarse/extranjeros-no-ue",
        url: "https://rutatramite.com/empadronarse/extranjeros-no-ue",
        dur: 4.6,
      },
    ],
  },
  {
    id: "padron-arraigo-ruta",
    audiencia: "Personas que preparan un arraigo en España",
    caption:
      "El padrón no regulariza: aclara qué sí prueba y qué no para tu arraigo, desde qué fecha se cuenta y por qué conviene no dejar morir la renovación bienal. Guía gratuita con fuentes oficiales. Imágenes documentales de Wikimedia Commons.",
    hashtags: ["arraigoespaña", "arraigosocial", "empadronamiento", "extranjeria", "regularizacion"],
    fuente: "content/escenarios/renovacion-2-anos.md, extranjeros-no-ue.md y /extranjeria/arraigo-padron",
    slides: [
      {
        tipo: "foto",
        img: "fotos/valla_paisaje.jpg",
        zoom: "in",
        kicker: "Extranjería · arraigo",
        titulo: "El padrón NO te regulariza. Pero sin él, todo cuesta más.",
        enfasis: ["NO te regulariza"],
        dur: 3.6,
      },
      {
        tipo: "foto",
        img: "fotos/lesbos2.jpg",
        zoom: "out",
        titulo: "Acredita dónde vives, día a día.",
        cuerpo: "Es prueba de permanencia: tu fecha de alta y tu permanencia real no son lo mismo.",
        enfasis: ["dónde vives"],
        dur: 4.4,
      },
      {
        tipo: "captura",
        img: "sitio/guia-arraigo.png",
        banda: "Padrón y arraigo, sin mitos",
        cuerpo: "Qué prueba cada modalidad y qué justificantes conservar.",
        dur: 4.2,
      },
      {
        tipo: "texto",
        numero: "01",
        titulo: "¿Te toca renovar cada dos años?",
        cuerpo: "Solo extracomunitarios sin larga duración. Renueva a tiempo: las interrupciones del padrón se valoran en el expediente.",
        dur: 4.6,
      },
      {
        tipo: "cta",
        titulo: "Arraigo y padrón, explicados",
        ruta: "rutatramite.com/extranjeria/arraigo-padron",
        url: "https://rutatramite.com/extranjeria/arraigo-padron",
        dur: 4.6,
      },
    ],
  },
  {
    id: "conoce-rutatramite",
    audiencia: "Cualquier persona que prepara un trámite y no sabe por dónde empezar",
    caption:
      "¿Trámite en España y no sabes por dónde empezar? Buscador, directorio municipal de padrón, asistente de documentos y guías con enlaces a la sede oficial. Gratis e independiente. Imágenes documentales de Wikimedia Commons.",
    hashtags: ["tramitesespaña", "empadronamiento", "inmigrantes", "guiagratis", "españa"],
    fuente: "Portada, /empadronarse y asistente de rutatramite.com",
    slides: [
      {
        tipo: "foto",
        img: ["fotos/benzu.jpg", "fotos/valla_paisaje.jpg"],
        zoom: "in",
        kicker: "rutatramite.com",
        titulo: "Tus trámites en España, explicados en claro. Y gratis.",
        enfasis: ["gratis"],
        dur: 3.6,
      },
      {
        tipo: "captura",
        img: "sitio/portada.png",
        banda: "Busca tu trámite o tu municipio",
        cuerpo: "Guía ciudadana independiente, con enlaces a la sede oficial.",
        dur: 4.0,
      },
      {
        tipo: "captura",
        img: "sitio/directorio.png",
        banda: "Directorio de padrón",
        cuerpo: "La ficha de tu ayuntamiento: formulario, canal y documentación.",
        dur: 4.0,
      },
      {
        tipo: "captura",
        img: "sitio/asistente.png",
        banda: "Asistente de padrón",
        cuerpo: "Seis respuestas y tu lista de documentos, lista para llevar.",
        dur: 4.0,
      },
      {
        tipo: "cta",
        titulo: "Empieza por el padrón",
        ruta: "rutatramite.com/empadronarse",
        url: "https://rutatramite.com/empadronarse",
        dur: 4.6,
      },
    ],
  },
];
