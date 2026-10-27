import type { Guide } from "@/lib/tramites/types";

const UPD = "27 de octubre de 2026, 09:30 (hora peninsular)";

const RTVE_CRONICA = { href: "https://www.rtve.es/play/noticias/20261022/pedro-sanchez-truco-recomendaron-moncloa-proteger-movil/17279368.shtml", label: "RTVE, 22-10-2026: crónica de la entrevista de Pedro Sánchez en La Revuelta" };
const RTVE_DIRECTO = { href: "https://www.rtve.es/play/noticias/20261022/pedro-sanchez-revuelta-broncano-directo-video-cronica/17278843.shtml", label: "RTVE Play: La Revuelta con Pedro Sánchez (vídeo)" };
const RTVE_ANUNCIO = { href: "https://www.rtve.es/rtve/20261021/pedro-sanchez-invitado-revuelta-este-jueves/17277673.shtml", label: "RTVE, 21-10-2026: Pedro Sánchez, invitado de La Revuelta" };
const EC = { href: "https://www.elconfidencial.com/espana/2026-10-21/elecciones-generales-29-n-encuestas-directo_4449404/", label: "El Confidencial, directo del 22-10-2026 (citas de la entrevista)" };
const ELDIARIO_X = { href: "https://x.com/eldiarioes/status/2113365550797553759", label: "elDiario.es en X, 22-10-2026" };
const VOX_ACTOS = { href: "https://www.voxespana.es/proximos-actos", label: "Vox: próximos actos (web oficial)" };
const SANCHEZ_VITORIA = { href: "https://www.infobae.com/espana/agencias/2026/10/22/sanchez-celebrara-un-acto-de-precampana-el-jueves-en-vitoria-para-llamar-a-la-movilizacion-de-los-vascos/", label: "Europa Press (vía Infobae), 22-10-2026: acto de Sánchez en Vitoria" };
const DEBATES_EE = { href: "https://www.europapress.es/nacional/noticia-sanchez-acepta-cara-cara-feijoo-quiere-debate-cuatro-26-noviembre-sea-tve-20261022175207.html", label: "Europa Press, 22-10-2026: el PSOE acepta el cara a cara del 16-N y pide el debate a cuatro en TVE; el PP lo rechaza" };
const LASEXTA = { href: "https://www.europapress.es/sociedad/noticia-lasexta-emitira-dos-debates-ana-pastor-portavoces-psoe-pp-vox-frente-amplio-noviembre-20261021145644.html", label: "Europa Press, 21-10-2026: laSexta, debates del 2 y 9 de noviembre" };
const VOX_CYL = { href: "https://www.europapress.es/castilla-y-leon/noticia-abascal-tendra-actos-precampana-martes-zamora-miercoles-28-valladolid-20261022190251.html", label: "Europa Press, 22-10-2026 (act. 23-10): actos de Abascal en Zamora, Santander, Valladolid y Ávila" };
const FEIJOO_VALENCIA = { href: "https://www.eldebate.com/espana/comunidad-valenciana/20261023/pp-confirma-llevara-feijoo-plaza-toros-valencia-no-vamos-llenar-vamos-reventar_473293.html", label: "El Debate, 23-10-2026: el PP confirma el mitin de Feijóo en la Plaza de Toros de Valencia (22-11)" };
const FEIJOO_VALENCIA_VP = { href: "https://valenciaplaza.com/valenciaplaza/comunitat-valenciana1/mompo-anuncia-que-el-pp-celebrara-un-mitin-en-la-plaza-de-toros-de-valencia-no-la-vamos-a-llenar-la-vamos-a-reventar", label: "Valencia Plaza, 23-10-2026: Mompó anuncia el mitin en la Plaza de Toros" };
const FEIJOO_CORUNA = { href: "https://www.laopinioncoruna.es/coruna/2026/10/26/feijoo-protagonizara-sabado-acto-precampana-135760718.html", label: "La Opinión A Coruña, 26-10-2026: acto de Feijóo en ExpoCoruña el sábado 31" };
const FEIJOO_CORUNA_ABC = { href: "https://www.abc.es/espana/galicia/feijoo-vuelve-galicia-segundo-fin-semana-consecutivo-20261026122251-nt.html", label: "ABC, 26-10-2026: Feijóo vuelve a Galicia el sábado 31" };
const WILD_FORMATO_EC = { href: "https://www.elconfidencial.com/espana/2026-10-26/jordi-wild-pedro-sanchez-colau-feijoo-1qrt_4452950/", label: "El Confidencial, 26-10-2026: condiciones de las entrevistas de Jordi Wild" };
const WILD_FORMATO_ABC = { href: "https://www.abc.es/espana/entrevistas-jordi-wild-sanchez-feijoo-abascal-colau-20261026104234-nt.html", label: "ABC, 26-10-2026: así serán las entrevistas de The Wild Project" };
const WILD_MARCA = { href: "https://www.marca.com/tiramillas/sociedad/2026/10/22/jordi-wild-sigo-noticias-pedro-sanchez-manana-ultimo-dia2.html", label: "Marca, 22-10-2026: Jordi Wild, sin respuesta de Sánchez y publicación el 13 de noviembre" };
const SANCHEZ_WILD_HORM = { href: "https://www.elplural.com/extratele/pedro-sanchez-visitara-jordi-wild-el-hormiguero-anecdota-pablo-motos-gracia_802166102", label: "El Plural, 22-10-2026: qué dijo Sánchez en La Revuelta sobre Jordi Wild y El Hormiguero" };
const COLAU_TVE = { href: "https://www.elperiodico.com/es/politica/20261023/colau-lanza-turne-televisiva-recuperar-135643168", label: "El Periódico, 23-10-2026: Colau, entrevistada en el programa de Manu Sánchez en TVE" };
const WILD = { href: "https://www.europapress.es/nacional/noticia-jordi-wild-recibe-si-feijoo-abascal-colau-queda-espera-sanchez-20261020175837.html", label: "Europa Press, 20-10-2026: The Wild Project y los candidatos" };
const REVUELTA_INV = { href: "https://www.eldiario.es/vertele/noticias/pedro-sanchez-acepta-invitacion-revuelta-sera-entrevistado-jueves-broncano-rtve_1_13604934.html", label: "elDiario.es (verTele), 22-10-2026: invitaciones de La Revuelta" };
const COLAU_REVUELTA = { href: "https://www.marca.com/tiramillas/television/2026/10/22/ada-colau-confirma-ira-revuelta-acuerda-feijoo-te-traigo-pizza.html", label: "Marca, 22-10-2026: Ada Colau acepta ir a La Revuelta" };

import { WILD_FAQS, WILD_JORDI_44, WILD_JORDI_PLAN, WILD_TEXTO, WILD_TWEET, WILD_WIKI } from "@/lib/tramites/wild-29n";
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
      { q: "¿Van a ir otros candidatos?", a: "Según RTVE y elDiario.es, el programa invitó a los candidatos de PP, PSOE, Vox y Frente Amplio. Ada Colau ha aceptado; Feijóo y Abascal no habían respondido el 22 de octubre. Lo actualizamos en la página de entrevistas." },
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
        lists: [["¿Quiere algún partido quitar las pensiones?: /elecciones/quiere-algun-partido-quitar-las-pensiones", "Salario mínimo de 1.800 €: la propuesta: /elecciones/salario-minimo-1800-euros", "¿Paga IRPF el salario mínimo en 2026?: /trabajo/salario-minimo-irpf-2026", "Qué dijo Feijóo en la SER: /elecciones/feijoo-cadena-ser-29n"]],
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
    reviewedAt: "2026-10-27",
    disclaimer: "",
    path: "/elecciones/agenda-mitines-29n",
    h1: "Agenda de mítines del 29-N: próximos actos de cada candidato",
    title: "Agenda de mítines del 29-N: fechas y ciudades por candidato",
    description: "Próximos mítines y actos de Feijóo, Sánchez, Abascal y Colau antes del 29-N: fecha, ciudad, lugar y fuente. Solo actos anunciados. Se actualiza a diario.",
    lead: `Respuesta corta: estos son los próximos actos públicos anunciados por los candidatos a las elecciones del 29 de noviembre, con fecha, ciudad, lugar y la fuente donde se anunciaron. Solo incluimos actos futuros publicados por el propio partido o por un medio fiable. Los partidos van en el orden de votos de las generales de 2023. Última actualización: ${UPD}.`,
    cta: VOX_ACTOS,
    secondaryCta: { href: "/elecciones/campana-y-precampana", label: "Campaña y precampaña: qué fechas marca la ley" },
    sources: [FEIJOO_CORUNA, FEIJOO_CORUNA_ABC, FEIJOO_VALENCIA, FEIJOO_VALENCIA_VP, SANCHEZ_VITORIA, VOX_ACTOS, VOX_CYL, DEBATES_EE, LASEXTA],
    related: [{ href: "/elecciones", label: "Sánchez y Jordi Wild: cuándo sale la entrevista en The Wild Project" }, { href: "/elecciones/voto-util-29n", label: "Voto útil: derecha, izquierda y peso de tu provincia" }, ENTREV, ARTIC, DEBATE, CAMPANA, { href: "/elecciones/calendario-29-noviembre", label: "Calendario del 29-N" }, ELEC],
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
            { cells: ["PP · Alberto Núñez Feijóo", "Sábado 31 de octubre, 12:00", "A Coruña", "ExpoCoruña (entrada libre)"], source: FEIJOO_CORUNA },
            { cells: ["PP · Alberto Núñez Feijóo", "Domingo 22 de noviembre (hora no publicada)", "Valencia", "Plaza de Toros"], source: FEIJOO_VALENCIA },
            { cells: ["PSOE · Pedro Sánchez", "Jueves 29 de octubre, 18:30", "Vitoria-Gasteiz (Álava)", "Palacio Europa"], source: SANCHEZ_VITORIA },
            { cells: ["Vox · Santiago Abascal", "Martes 27 de octubre (hora no publicada)", "Plasencia (Cáceres)", "Declaración a medios (lugar no publicado)"], source: VOX_ACTOS },
            { cells: ["Vox · Santiago Abascal", "Martes 27 de octubre, 19:00", "Zamora", "Plaza de la Marina"], source: VOX_CYL },
            { cells: ["Vox · Santiago Abascal", "Miércoles 28 de octubre, 12:00", "Santander", "Jardines de Pereda (declaración a medios)"], source: VOX_CYL },
            { cells: ["Vox · Santiago Abascal", "Miércoles 28 de octubre, 19:00", "Valladolid", "Pabellón 3 de la Feria de Valladolid"], source: VOX_CYL },
            { cells: ["Vox · Santiago Abascal", "Jueves 29 de octubre, 19:00", "Ávila", "Palacio de Congresos Lienzo Norte"], source: VOX_CYL },
            { cells: ["Frente Amplio · Ada Colau", "Sin agenda publicada", "—", "—"], source: { href: EC.href, label: "El Confidencial, 22-10-2026: sin actos futuros de Frente Amplio anunciados" } },
          ],
        },
      },
      {
        id: "debates",
        title: "Debates con fecha",
        paragraphs: [
          "Pódcast: Pedro Sánchez confirmó en X el 23 de octubre que irá a The Wild Project de Jordi Wild («Ahí estaré»). Con él han aceptado los cuatro candidatos (Feijóo, Sánchez, Abascal y Colau). Según anunció Jordi Wild el 22 de octubre, las charlas se publican el 13 de noviembre. Detalle y fuentes en la página de entrevistas y pódcast.",
          "El PSOE ha aceptado un cara a cara entre Pedro Sánchez y Alberto Núñez Feijóo el lunes 16 de noviembre en una cadena privada, fecha que el PP había aceptado antes en Mediaset. Sobre el debate a cuatro del jueves 26 de noviembre no hay acuerdo de cadena: el PSOE acepta el de RTVE y el PP responde que «no habrá debate a cuatro en RTVE» y lo quiere en Atresmedia. RTVE propone además uno de portavoces el lunes 23.",
          "laSexta emitirá dos debates con representantes de PP, PSOE, Vox y Frente Amplio los días 2 y 9 de noviembre, moderados por Ana Pastor.",
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
    reviewedAt: "2026-10-27",
    disclaimer: "",
    path: "/elecciones/podcasts-entrevistas-candidatos-29n",
    h1: "Entrevistas y pódcast de los candidatos del 29-N: quién va y cuándo",
    title: "Candidatos del 29-N en pódcast y TV: La Revuelta, Jordi Wild",
    description: "Qué entrevistas y pódcast han aceptado Feijóo, Sánchez, Abascal y Colau antes del 29-N: La Revuelta, The Wild Project y más. Con fecha y fuente.",
    lead: `Última hora: Pedro Sánchez irá a The Wild Project. Lo confirmó en X el 23 de octubre a las 20:23 («Gracias por la invitación, @JordiWild. Ahí estaré») y Jordi Wild respondió «Pues ya estaría: 4/4». Los cuatro candidatos (Feijóo, Sánchez, Abascal y Colau) han aceptado. Según Jordi Wild, todas las charlas se publican el 13 de noviembre, primer día de campaña. Sánchez fue a La Revuelta el 22 de octubre. Actualizado el ${UPD}.`,
    cta: WILD,
    secondaryCta: REVUELTA_INV,
    sources: [WILD_TWEET, WILD_JORDI_44, WILD_JORDI_PLAN, WILD_FORMATO_EC, WILD_FORMATO_ABC, WILD_WIKI, WILD, WILD_MARCA, SANCHEZ_WILD_HORM, REVUELTA_INV, COLAU_REVUELTA, COLAU_TVE, RTVE_ANUNCIO],
    related: [{ href: "/elecciones", label: "Pedro Sánchez en The Wild Project: qué es y cuándo sale" }, ARTIC, AGENDA, DEBATE, CAMPANA, ELEC],
    faqs: [
      { q: "¿Va a ir Feijóo a La Revuelta?", a: "El 22 de octubre David Broncano dijo que Feijóo y Abascal estaban invitados y que no habían respondido. No hay fecha." },
      ...WILD_FAQS,
      { q: "¿Cuánto durarán las entrevistas de Jordi Wild a los candidatos?", a: "Entre 60 y 90 minutos cada una, según escribió Jordi Wild en X («Las charlas serán mucho más cortas que mi formato habitual: 60-90 minutos»), recogido por El Confidencial y ABC el 26 de octubre. Serán individuales: ha descartado un debate a cuatro." },
      { q: "¿Va a ir Sánchez a El Hormiguero?", a: "Pablo Motos dijo que Sánchez está invitado para la campaña del 29-N. En La Revuelta, según El Plural, Sánchez dijo que irá «a El Hormiguero y donde haga falta». No hay fecha publicada." },
    ],
    sections: [
      {
        id: "sanchez-the-wild-project",
        title: "Pedro Sánchez irá a The Wild Project",
        paragraphs: [
          `Confirmado por el candidato. Pedro Sánchez escribió en X el viernes 23 de octubre de 2026 a las 20:23 (hora peninsular): «${WILD_TEXTO}». Jordi Wild citó el mensaje a las 20:39: «Pues ya estaría: 4/4».`,
          "Fecha: Sánchez no la ha dado. El 22 de octubre Jordi Wild anunció en X que publicará todas las charlas el 13 de noviembre, primer día oficial de campaña, con una hora de diferencia entre una y otra, de menos a más escaños. No hay hora publicada para cada entrevista.",
          "Quién es Jordi Wild: Jorge Carrillo de Albornoz Torres, youtuber y podcaster español, autor del canal El Rincón de Giorgio (Wikipedia). Qué es The Wild Project: su pódcast de entrevistas, que empezó en 2020, con formato de charla con un invitado y una tertulia. El realizador y editor es Nacho Amela (Wikipedia).",
          "Formato anunciado por Jordi Wild en X (recogido por El Confidencial y ABC el 26 de octubre): cuatro entrevistas individuales de 60 a 90 minutos, sin debate a cuatro («Descarto el gran debate a cuatro»), y dos periodistas verificadores en el plató («No están a mi favor, sino a favor de lo veraz»). Según ABC, los equipos de campaña no conocerán antes las preguntas y las entrevistas se publicarán íntegras, sin recortes.",
          "En la tabla de abajo están las entrevistas y pódcast de todos los candidatos, con su fuente.",
        ],
      },
      {
        id: "tabla",
        title: "Entrevistas anunciadas por candidato",
        paragraphs: ["«Aceptada, sin fecha» significa que el candidato o el programa han confirmado la participación pero no el día."],
        table: {
          caption: `Entrevistas y pódcast de los candidatos del 29-N (actualizado el ${UPD})`,
          head: ["Partido y candidato", "Programa", "Estado", "Fecha", "Fuente"],
          rows: [
            { cells: ["PP · Alberto Núñez Feijóo", "The Wild Project", "Aceptada", "Publicación prevista el 13 de noviembre"], source: WILD_MARCA },
            { cells: ["PP · Alberto Núñez Feijóo", "La Revuelta (La 1)", "Invitado, sin respuesta", "—"], source: REVUELTA_INV },
            { cells: ["PSOE · Pedro Sánchez", "The Wild Project (pódcast de Jordi Wild)", "Confirmada por el candidato en X el 23 de octubre («Ahí estaré»)", "Publicación prevista el 13 de noviembre (anuncio de Jordi Wild)"], source: WILD_TWEET },
            { cells: ["PSOE · Pedro Sánchez", "La Revuelta (La 1)", "Emitida", "22 de octubre"], source: RTVE_DIRECTO },
            { cells: ["PSOE · Pedro Sánchez", "El Hormiguero (Antena 3)", "Dice que irá; sin fecha", "—"], source: SANCHEZ_WILD_HORM },
            { cells: ["Vox · Santiago Abascal", "The Wild Project", "Aceptada", "Publicación prevista el 13 de noviembre"], source: WILD_MARCA },
            { cells: ["Vox · Santiago Abascal", "La Revuelta (La 1)", "Invitado, sin respuesta", "—"], source: REVUELTA_INV },
            { cells: ["Frente Amplio · Ada Colau", "The Wild Project", "Aceptada", "Publicación prevista el 13 de noviembre"], source: WILD_MARCA },
            { cells: ["Frente Amplio · Ada Colau", "Programa de Manu Sánchez en TVE («El Perro Andaluz», grabado en Bilbao)", "Entrevistada", "22 de octubre"], source: COLAU_TVE },
            { cells: ["Frente Amplio · Ada Colau", "La Revuelta (La 1)", "Aceptada", "Sin fecha publicada"], source: COLAU_REVUELTA },
          ],
        },
      },
      {
        id: "criterios",
        title: "Criterios",
        paragraphs: [
          "Solo incluimos entrevistas confirmadas por el programa, el candidato o un medio fiable. Cuando se emiten, enlazamos el vídeo oficial y, si es relevante, un resumen con citas comprobadas como el de Sánchez en La Revuelta.",
          "Jordi Wild planteó al principio que acudieran todos o ninguno; según Europa Press, dio de plazo hasta el viernes 23 de octubre para cerrar las participaciones. Según Marca, publicará las entrevistas el 13 de noviembre y ha rechazado otras peticiones de partidos (Podemos, ERC, Junts y SALF).",
          "Los debates electorales tienen su propia página, enlazada abajo.",
        ],
      },
    ],
  },
];
