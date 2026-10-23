import type { Guide } from "@/lib/tramites/types";

const UPD = "22 de octubre de 2026, 23:30 (hora peninsular)";

const RTVE_CRONICA = { href: "https://www.rtve.es/play/noticias/20261022/pedro-sanchez-truco-recomendaron-moncloa-proteger-movil/17279368.shtml", label: "RTVE, 22-10-2026: crónica de la entrevista de Pedro Sánchez en La Revuelta" };
const RTVE_DIRECTO = { href: "https://www.rtve.es/play/noticias/20261022/pedro-sanchez-revuelta-broncano-directo-video-cronica/17278843.shtml", label: "RTVE Play: La Revuelta con Pedro Sánchez (vídeo)" };
const RTVE_ANUNCIO = { href: "https://www.rtve.es/rtve/20261021/pedro-sanchez-invitado-revuelta-este-jueves/17277673.shtml", label: "RTVE, 21-10-2026: Pedro Sánchez, invitado de La Revuelta" };
const EC = { href: "https://www.elconfidencial.com/espana/2026-10-21/elecciones-generales-29-n-encuestas-directo_4449404/", label: "El Confidencial, directo del 22-10-2026 (citas de la entrevista)" };
const ELDIARIO_X = { href: "https://x.com/eldiarioes/status/2113365550797553759", label: "elDiario.es en X, 22-10-2026" };
const VOX_ACTOS = { href: "https://www.voxespana.es/proximos-actos", label: "Vox: próximos actos (web oficial)" };
const FEIJOO_VIGO = { href: "https://www.elconfidencial.com/espana/2026-10-21/elecciones-generales-29-n-encuestas-directo_4449404/", label: "El Confidencial, 21-10-2026: Feijóo, acto en Vigo el 24 de octubre" };
const SANCHEZ_VITORIA = { href: "https://www.infobae.com/espana/agencias/2026/10/22/sanchez-celebrara-un-acto-de-precampana-el-jueves-en-vitoria-para-llamar-a-la-movilizacion-de-los-vascos/", label: "Europa Press (vía Infobae), 22-10-2026: acto de Sánchez en Vitoria" };
const DEBATES_EE = { href: EC.href, label: "El Confidencial, 22-10-2026: propuestas de debates de PSOE y PP" };
const LASEXTA = { href: EC.href, label: "El Confidencial, 22-10-2026: laSexta, debates del 2 y 9 de noviembre" };
const WILD = { href: "https://www.europapress.es/nacional/noticia-jordi-wild-recibe-si-feijoo-abascal-colau-queda-espera-sanchez-20261020175837.html", label: "Europa Press, 20-10-2026: The Wild Project y los candidatos" };
const REVUELTA_INV = { href: "https://www.eldiario.es/vertele/noticias/pedro-sanchez-acepta-invitacion-revuelta-sera-entrevistado-jueves-broncano-rtve_1_13604934.html", label: "elDiario.es (verTele), 22-10-2026: invitaciones de La Revuelta" };
const COLAU_REVUELTA = { href: "https://www.marca.com/tiramillas/television/2026/10/22/ada-colau-confirma-ira-revuelta-acuerda-feijoo-te-traigo-pizza.html", label: "Marca, 22-10-2026: Ada Colau acepta ir a La Revuelta" };

const AGENDA = { href: "/elecciones/agenda-mitines-29n", label: "Agenda de mítines del 29-N" };
const ENTREV = { href: "/elecciones/podcasts-entrevistas-candidatos-29n", label: "Entrevistas y pódcast de los candidatos" };
const ARTIC = { href: "/elecciones/sanchez-la-revuelta-29n", label: "Lo que dijo Sánchez en La Revuelta" };
const DEBATE = { href: "/elecciones/debate-electoral-29n", label: "Debates electorales del 29-N" };
const CAMPANA = { href: "/elecciones/campana-y-precampana", label: "Campaña y precampaña: fechas" };
const ELEC = { href: "/elecciones", label: "Elecciones generales del 29-N" };

export const AGENDA_29N_GUIDES: Guide[] = [
  {
    id: "29n-sanchez-la-revuelta",
    pack: "elecciones",
    reviewedAt: "2026-10-22",
    disclaimer: "",
    path: "/elecciones/sanchez-la-revuelta-29n",
    h1: "Qué dijo Pedro Sánchez en La Revuelta: las frases, por temas",
    title: "Pedro Sánchez en La Revuelta: qué dijo, frase a frase",
    description: "Lo que dijo Pedro Sánchez en La Revuelta (TVE) el 22 de octubre: vivienda, Ceuta, inmigración, IA, Felipe González y Aznar. Citas con fuente y comprobación.",
    lead: "Respuesta corta: Pedro Sánchez, candidato del PSOE al 29-N, fue entrevistado por David Broncano en La Revuelta (La 1 y RTVE Play) el jueves 22 de octubre de 2026. Habló de vivienda, Ceuta e inmigración, redes sociales e inteligencia artificial, Felipe González y Aznar, y de los procesos judiciales que afectan a su familia. Abajo están sus frases literales tal y como las recogieron RTVE y El Confidencial, con el enlace a cada fuente, qué tiene que ver cada tema con tus trámites y lo que se puede comprobar con datos oficiales.",
    cta: RTVE_DIRECTO,
    secondaryCta: RTVE_CRONICA,
    sources: [RTVE_DIRECTO, RTVE_CRONICA, EC, RTVE_ANUNCIO, ELDIARIO_X],
    related: [ENTREV, AGENDA, DEBATE, { href: "/elecciones/promesas", label: "Promesas electorales del 29-N por partido" }, { href: "/elecciones/mayoria-absoluta-176-escanos", label: "Mayoría absoluta: por qué son 176 escaños" }, ELEC],
    faqs: [
      { q: "¿Cuándo fue Pedro Sánchez a La Revuelta?", a: "El jueves 22 de octubre de 2026, en La 1 y RTVE Play, a partir de las 21:45. Fue el primer candidato al 29-N que acudió al programa." },
      { q: "¿Dónde se puede ver la entrevista completa?", a: "En RTVE Play, la plataforma gratuita de RTVE. El enlace está al principio de esta página." },
      { q: "¿Van a ir otros candidatos?", a: "Según RTVE y elDiario.es, el programa invitó a los candidatos de PSOE, PP, Vox y Frente Amplio. Ada Colau ha aceptado; Feijóo y Abascal no habían respondido el 22 de octubre. Lo actualizamos en la página de entrevistas." },
      { q: "¿Qué dijo sobre la vivienda?", a: "Que «la clave no es solo construir viviendas, sino que sean asequibles» y que el problema está «en los aticazos y en los fondos buitre», según El Confidencial." },
    ],
    sections: [
      {
        id: "vivienda",
        title: "Vivienda",
        paragraphs: [
          "«La clave no es solo construir viviendas, sino que sean asequibles». Añadió que «se han construido un millón en los últimos años» y que hacen falta viviendas «asequibles para jóvenes y no tan jóvenes». (Fuente: El Confidencial)",
          "«El problema no está en los pequeños propietarios ni en los inquilinos, sino en los aticazos y en los fondos buitre». Y: «Si a mí me dieran durante un año, 176 escaños...». (Fuente: El Confidencial)",
          "Qué significa para ti: los dos decretos de vivienda que aprobó el Gobierno los derogó el Congreso el 2 de octubre. Lo que hay hoy en vigor y las ayudas que puedes pedir están en nuestras guías de alquiler, enlazadas abajo.",
        ],
        lists: [[
          "Decretos de vivienda derogados el 2 de octubre: /alquiler/decretos-vivienda-derogados-octubre-2026",
          "Ayudas al alquiler por comunidad: /alquiler/ayudas-por-comunidad",
          "Bono Alquiler Joven: /alquiler/bono-alquiler-joven",
          "Caso Maricarmen: /alquiler/caso-maricarmen-desahucio",
        ]],
      },
      {
        id: "pensiones-smi",
        title: "Pensiones, salario mínimo y críticas de Milei",
        paragraphs: [
          "Sobre el presidente argentino, Javier Milei: «Es increíble, viene a dar lecciones un tipo que ha bajado el salario mínimo interprofesional un 40%». Y: «Si me insultan, allá ellos. Yo también me acuerdo de sus madres cuando subo las pensiones o el SMI». (Fuente: RTVE)",
          "«Lo extraordinario no es que avance la ultraderecha, sino tener un gobierno progresista». (Fuente: El Confidencial)",
          "Qué significa para ti: lo que ha dicho cada partido sobre las pensiones, con fuente, está en nuestra página sobre las pensiones en el 29-N.",
        ],
        lists: [["¿Quiere algún partido quitar las pensiones?: /elecciones/quiere-algun-partido-quitar-las-pensiones", "Salario mínimo de 1.800 €: la propuesta: /elecciones/salario-minimo-1800-euros"]],
      },
      {
        id: "ceuta-inmigracion",
        title: "Ceuta e inmigración",
        paragraphs: [
          "«La frontera de Ceuta es una de las más complejas del mundo». Y: «Necesitas la colaboración de Marruecos, y cuando llega el día, tienes una decisión que tomar». (Fuente: El Confidencial)",
          "«Necesitamos migración y necesitamos políticas de integración». Sobre la criminalidad: «Tenemos una de las tasas más bajas del mundo». (Fuente: El Confidencial)",
        ],
      },
      {
        id: "tecnologia",
        title: "Redes sociales, IA y seguridad del móvil",
        paragraphs: [
          "Atribuyó parte del avance de la derecha «a los algoritmos, que hacen el engagement y dirigen la conversación». También: «Hemos pecado de ingenuos pensando que la tecnología es neutra» y «no se puede jugar con imágenes de menores con contenido sexual, como permite la inteligencia artificial». (Fuente: RTVE)",
          "Un consejo práctico que contó: «Si apagas el móvil cinco minutos al día, hace que se proteja frente a los virus». Dijo que se lo recomendó el departamento de Sistemas de la Moncloa tras el caso Pegasus. (Fuente: RTVE)",
          "«La IA es una tecnología que explota los recursos naturales y explota nuestros datos privados». (Fuente: El Confidencial)",
        ],
      },
      {
        id: "politica",
        title: "Felipe González, Aznar, Ábalos y su familia",
        paragraphs: [
          "Sobre Felipe González: «Si yo me afilié al PSOE fue por ti», pero «ahora mismo, no me siento muy identificado con sus opiniones». (Fuente: RTVE)",
          "Sobre José María Aznar, según Sánchez el primer expresidente que le llamó: «Me pongo a tu servicio». Y añadió: «Luego, nada, todo mentira». (Fuente: RTVE)",
          "Preguntado por su mayor error, citó «los casos de corrupción que he sufrido en mi partido con Ábalos». (Fuente: El Confidencial)",
          "«Se han traspasado líneas rojas que afectan a personas que yo quiero como mi mujer, Begoña Gómez y mi hermano, David Sánchez, y yo voy a defender siempre su inocencia». (Fuente: El Confidencial)",
          "Sobre las elecciones: «La gente todavía no ha votado, no ha decidido». Y al empezar: «Yo aspiro a gobernar cuatro años más, y si se quiere, cuatro años más de La Revuelta». (Fuentes: El Confidencial; elDiario.es la recoge con otras palabras: «Yo aspiro a renovar cuatro años y si 'La Revuelta' quiere, otros cuatro años más en TVE».)",
        ],
      },
      {
        id: "comprobacion",
        title: "Comprobación con datos oficiales",
        paragraphs: ["Solo comprobamos afirmaciones que se pueden contrastar con una fuente oficial española. Las demás las marcamos como no comprobables aquí."],
        table: {
          caption: "Afirmaciones de Pedro Sánchez en La Revuelta y su comprobación",
          head: ["Afirmación", "Qué dicen los datos", "Fuente"],
          rows: [
            { cells: ["«Si a mí me dieran durante un año, 176 escaños...»", "176 es la mayoría absoluta del Congreso, que tiene 350 diputados (artículo 162 de la LOREG). Es la mayoría que se necesita en la primera votación de investidura (artículo 99 de la Constitución)."], source: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a99", label: "BOE: Constitución, artículo 99" } },
            { cells: ["«Se han construido un millón [de viviendas] en los últimos años»", "No hemos podido comprobarlo: no dijo qué periodo ni qué dato (viviendas iniciadas, terminadas o visados). Lo revisaremos con la estadística oficial del Ministerio de Vivienda si su equipo concreta la cifra."], source: { href: "https://www.mivau.gob.es/vivienda/estadisticas", label: "Ministerio de Vivienda: estadísticas de vivienda" } },
            { cells: ["Milei «ha bajado el salario mínimo interprofesional un 40%»", "Es un dato de Argentina: no se puede contrastar con el BOE ni con el INE. No lo comprobamos."], source: RTVE_CRONICA },
            { cells: ["«Subo las pensiones o el SMI»", "Las pensiones y el SMI se fijan cada año por real decreto publicado en el BOE. Las cuantías de 2026 y lo que propone cada partido están en nuestra página de pensiones."], source: { href: "/elecciones/quiere-algun-partido-quitar-las-pensiones", label: "RutaTrámite: pensiones en el 29-N" } },
          ],
        },
      },
      {
        id: "metodo",
        title: "Cómo hemos hecho este artículo",
        paragraphs: [
          "Todas las frases entre comillas están tal y como las publicaron RTVE (crónica oficial del programa) y El Confidencial (directo de la entrevista). Hemos usado X solo para localizar las frases, nunca como única fuente. Si una frase no aparecía en un medio, no la hemos incluido.",
          `Última actualización: ${UPD}. Si la transcripción de RTVE cambia alguna frase, corregimos y lo indicamos aquí.`,
        ],
      },
    ],
  },
  {
    id: "29n-agenda-mitines",
    pack: "elecciones",
    reviewedAt: "2026-10-22",
    disclaimer: "",
    path: "/elecciones/agenda-mitines-29n",
    h1: "Agenda de mítines del 29-N: próximos actos de cada candidato",
    title: "Agenda de mítines del 29-N: fechas y ciudades por candidato",
    description: "Próximos mítines y actos de Feijóo, Sánchez, Abascal y Colau antes del 29-N: fecha, ciudad, lugar y fuente. Solo actos anunciados. Se actualiza a diario.",
    lead: `Respuesta corta: estos son los próximos actos públicos anunciados por los candidatos a las elecciones del 29 de noviembre, con fecha, ciudad, lugar y la fuente donde se anunciaron. Solo incluimos actos futuros publicados por el propio partido o por un medio fiable. Los partidos van en el orden de votos de las generales de 2023. Última actualización: ${UPD}.`,
    cta: VOX_ACTOS,
    secondaryCta: { href: "/elecciones/campana-y-precampana", label: "Campaña y precampaña: qué fechas marca la ley" },
    sources: [FEIJOO_VIGO, SANCHEZ_VITORIA, VOX_ACTOS, DEBATES_EE, LASEXTA],
    related: [{ href: "/elecciones/voto-util-29n", label: "Voto útil: derecha, izquierda y peso de tu provincia" }, ENTREV, ARTIC, DEBATE, CAMPANA, { href: "/elecciones/calendario-29-noviembre", label: "Calendario del 29-N" }, ELEC],
    faqs: [
      { q: "¿Cuándo empieza la campaña electoral del 29-N?", a: "A las 0:00 del viernes 13 de noviembre de 2026 y termina a las 24:00 del viernes 27 (Real Decreto 806/2026). Los actos de antes son de precampaña." },
      { q: "¿Por qué hay candidatos sin actos en la tabla?", a: "Porque ni su partido ni un medio fiable han publicado todavía la fecha y el lugar. Marcamos «sin agenda publicada» y lo revisamos cada día." },
      { q: "¿En qué orden aparecen los partidos?", a: "Por votos en las elecciones generales de 2023: PP, PSOE, Vox y Sumar (hoy en Frente Amplio)." },
      { q: "¿Se puede ir a un mitin sin ser afiliado?", a: "Los actos públicos anunciados suelen ser abiertos, pero cada partido fija el acceso. Consulta la fuente de cada acto." },
    ],
    sections: [
      {
        id: "agenda",
        title: "Próximos actos anunciados",
        paragraphs: ["Quitamos cada acto cuando ya se ha celebrado."],
        table: {
          caption: `Agenda de actos de precampaña del 29-N (actualizada el ${UPD})`,
          head: ["Partido y candidato", "Fecha", "Ciudad", "Lugar", "Fuente"],
          rows: [
            { cells: ["PP · Alberto Núñez Feijóo", "Sábado 24 de octubre, 12:00", "Vigo (Pontevedra)", "Estación Marítima, con Alfonso Rueda"], source: FEIJOO_VIGO },
            { cells: ["PSOE · Pedro Sánchez", "Jueves 29 de octubre, 18:30", "Vitoria-Gasteiz (Álava)", "Palacio Europa"], source: SANCHEZ_VITORIA },
            { cells: ["Vox · Santiago Abascal", "Viernes 23 de octubre", "Menorca", "Lugar no publicado"], source: VOX_ACTOS },
            { cells: ["Vox · Santiago Abascal", "Sábado 24 de octubre", "Ibiza", "Lugar no publicado"], source: VOX_ACTOS },
            { cells: ["Frente Amplio · Ada Colau", "Sin agenda publicada", "—", "—"], source: { href: EC.href, label: "El Confidencial, 22-10-2026: sin actos futuros de Frente Amplio anunciados" } },
          ],
        },
      },
      {
        id: "debates",
        title: "Debates con fecha",
        paragraphs: [
          "El PSOE ha aceptado un cara a cara entre Pedro Sánchez y Alberto Núñez Feijóo el lunes 16 de noviembre en una cadena privada, fecha que el PP había aceptado antes. Sobre el debate a cuatro del jueves 26 de noviembre no hay acuerdo de cadena: el PSOE lo quiere en RTVE y el PP en una privada.",
          "laSexta emitirá dos debates con representantes de PSOE, PP, Vox y Frente Amplio los días 2 y 9 de noviembre, moderados por Ana Pastor.",
          "Todos los detalles, en la página de debates.",
        ],
      },
      {
        id: "criterios",
        title: "Criterios",
        paragraphs: [
          "Incluimos solo actos futuros con fecha anunciada por el partido (web o cuenta oficial) o por un medio fiable. No incluimos rumores ni actos sin fecha. Cubrimos a los cuatro candidatos invitados a los debates; añadiremos otras candidaturas cuando publiquen agenda.",
          "Si ves un acto oficial que falta, escríbenos desde la página de contacto con el enlace a la fuente.",
        ],
      },
    ],
  },
  {
    id: "29n-entrevistas-candidatos",
    pack: "elecciones",
    reviewedAt: "2026-10-22",
    disclaimer: "",
    path: "/elecciones/podcasts-entrevistas-candidatos-29n",
    h1: "Entrevistas y pódcast de los candidatos del 29-N: quién va y cuándo",
    title: "Candidatos del 29-N en pódcast y TV: La Revuelta, Jordi Wild",
    description: "Qué entrevistas y pódcast han aceptado Feijóo, Sánchez, Abascal y Colau antes del 29-N: La Revuelta, The Wild Project y más. Con fecha y fuente.",
    lead: `Respuesta corta: Pedro Sánchez fue a La Revuelta el 22 de octubre. Feijóo, Abascal y Colau aceptaron ir al pódcast The Wild Project de Jordi Wild, sin fecha publicada; Ada Colau también aceptó ir a La Revuelta, sin fecha. Aquí está, por candidato, lo anunciado con su fuente. Los partidos van en el orden de votos de 2023. Última actualización: ${UPD}.`,
    cta: WILD,
    secondaryCta: REVUELTA_INV,
    sources: [WILD, REVUELTA_INV, COLAU_REVUELTA, RTVE_ANUNCIO],
    related: [ARTIC, AGENDA, DEBATE, CAMPANA, ELEC],
    faqs: [
      { q: "¿Va a ir Feijóo a La Revuelta?", a: "El 22 de octubre David Broncano dijo que Feijóo y Abascal estaban invitados y que no habían respondido. No hay fecha." },
      { q: "¿Cuándo son las entrevistas de Jordi Wild?", a: "Jordi Wild planteó una «semana especial de elecciones». Feijóo, Abascal y Colau han aceptado; Sánchez no había respondido el 20 de octubre y el plazo que dio Wild acaba el viernes 23. No se han publicado fechas." },
      { q: "¿Va a ir Sánchez a El Hormiguero?", a: "Pablo Motos dijo que Sánchez está invitado para la campaña del 29-N. No hay confirmación publicada." },
    ],
    sections: [
      {
        id: "tabla",
        title: "Entrevistas anunciadas por candidato",
        paragraphs: ["«Aceptada, sin fecha» significa que el candidato o el programa han confirmado la participación pero no el día."],
        table: {
          caption: `Entrevistas y pódcast de los candidatos del 29-N (actualizado el ${UPD})`,
          head: ["Partido y candidato", "Programa", "Estado", "Fecha", "Fuente"],
          rows: [
            { cells: ["PP · Alberto Núñez Feijóo", "The Wild Project (pódcast de Jordi Wild)", "Aceptada", "Sin fecha publicada"], source: WILD },
            { cells: ["PP · Alberto Núñez Feijóo", "La Revuelta (La 1)", "Invitado, sin respuesta", "—"], source: REVUELTA_INV },
            { cells: ["PSOE · Pedro Sánchez", "La Revuelta (La 1)", "Emitida", "22 de octubre"], source: RTVE_DIRECTO },
            { cells: ["PSOE · Pedro Sánchez", "The Wild Project", "Sin respuesta a 20 de octubre", "—"], source: WILD },
            { cells: ["PSOE · Pedro Sánchez", "El Hormiguero (Antena 3)", "Invitado por el programa, sin confirmar", "—"], source: REVUELTA_INV },
            { cells: ["Vox · Santiago Abascal", "The Wild Project", "Aceptada", "Sin fecha publicada"], source: WILD },
            { cells: ["Vox · Santiago Abascal", "La Revuelta (La 1)", "Invitado, sin respuesta", "—"], source: REVUELTA_INV },
            { cells: ["Frente Amplio · Ada Colau", "The Wild Project", "Aceptada", "Sin fecha publicada"], source: WILD },
            { cells: ["Frente Amplio · Ada Colau", "La Revuelta (La 1)", "Aceptada", "Sin fecha publicada"], source: COLAU_REVUELTA },
          ],
        },
      },
      {
        id: "criterios",
        title: "Criterios",
        paragraphs: [
          "Solo incluimos entrevistas confirmadas por el programa, el candidato o un medio fiable. Cuando se emiten, enlazamos el vídeo oficial y, si es relevante, un resumen con citas comprobadas como el de Sánchez en La Revuelta.",
          "Jordi Wild planteó al principio que acudieran todos o ninguno; según Europa Press, ha dado de plazo hasta el viernes 23 de octubre para cerrar las participaciones.",
          "Los debates electorales tienen su propia página, enlazada abajo.",
        ],
      },
    ],
  },
];
