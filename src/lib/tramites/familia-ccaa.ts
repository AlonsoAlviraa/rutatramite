import { DISCLAIMER_MEDICO } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const REVIEWED = "2026-10-10";

const MINISTRY_CALENDAR =
  "https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/calendario/home.htm";
const MINISTRY_CCAA =
  "https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/calendario/calendario/Calendario_CCAA.htm";

const NO_TABLA =
  "Esta guía no copia la tabla de edades ni dice qué vacuna corresponde a una persona. El documento oficial de la comunidad y el centro de salud son la fuente para un caso concreto.";

const SIN_FICHA = [
  "Asturias",
  "Illes Balears",
  "Canarias",
  "Cantabria",
  "Castilla-La Mancha",
  "Extremadura",
  "País Vasco",
  "La Rioja",
  "Ceuta",
  "Melilla",
];

const hubRelated = [
  { href: "/bebe/calendario-vacunal-por-comunidad", label: "Calendario según la comunidad" },
  { href: "/bebe/calendario-vacunal-madrid", label: "Calendario de Madrid" },
  { href: "/bebe/calendario-vacunal-castilla-y-leon", label: "Calendario de Castilla y León" },
  { href: "/bebe/cartilla-de-vacunacion-donde-se-saca", label: "Cartilla de vacunación" },
];

export const FAMILIA_CCAA_GUIDES: Guide[] = [
  {
    id: "calendarioVacunalPorComunidad",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-por-comunidad",
    reviewedAt: REVIEWED,
    h1: "Calendario vacunal según la comunidad autónoma",
    title: "Calendario vacunal por comunidad: dónde está el oficial",
    description:
      "El calendario común del Ministerio no sustituye al de cada comunidad. Enlaces abiertos el 10 de octubre de 2026 y comunidades sin ficha propia en esta revisión.",
    lead:
      "El Ministerio de Sanidad publica el calendario común de vacunación a lo largo de toda la vida 2026 del Consejo Interterritorial. La misma página dice que establecer, ejecutar y evaluar el calendario en cada territorio corresponde a las comunidades autónomas. Abre el documento de tu comunidad. Esta guía no reproduce pautas ni dosis.",
    cta: { href: MINISTRY_CALENDAR, label: "Abrir el calendario común del Ministerio de Sanidad" },
    secondaryCta: { href: MINISTRY_CCAA, label: "Índice ministerial de calendarios autonómicos" },
    disclaimer: DISCLAIMER_MEDICO,
    sources: [
      { href: MINISTRY_CALENDAR, label: "Ministerio de Sanidad: calendario común a lo largo de toda la vida 2026" },
      { href: MINISTRY_CCAA, label: "Ministerio de Sanidad: calendarios de las comunidades autónomas" },
    ],
    faqs: [
      {
        q: "¿El calendario del Ministerio vale en todas las comunidades?",
        a: "Es el calendario común acordado en el Consejo Interterritorial. La página del Ministerio indica que la aplicación en cada territorio corresponde a la comunidad autónoma. Consulta el documento autonómico y el centro de salud.",
      },
      {
        q: "¿Qué hago si mi comunidad no tiene ficha en esta web?",
        a: "Asturias, Illes Balears, Canarias, Cantabria, Castilla-La Mancha, Extremadura, País Vasco, La Rioja, Ceuta y Melilla no tienen ficha propia en la revisión del 10 de octubre de 2026. Usa el índice del Ministerio y pregunta en el centro de salud. No hay una URL autonómica inventada para esos territorios.",
      },
    ],
    sections: [
      {
        id: "comun-y-autonomico",
        title: "Calendario común y calendario de la comunidad",
        paragraphs: [
          "En la página del Ministerio, el calendario común de 2026 está publicado como PDF, junto con documentos de grupos de riesgo y un calendario acelerado actualizado en enero de 2025. No copies una captura antigua: vuelve a la página y abre el archivo desde allí.",
          NO_TABLA,
        ],
      },
      {
        id: "fichas-abiertas",
        title: "Comunidades con página abierta en esta revisión",
        paragraphs: [
          "El 10 de octubre de 2026 se abrieron las páginas de Andalucía, Aragón, Cataluña, la Comunitat Valenciana, Murcia, Galicia y Navarra, además de las guías ya publicadas de Madrid y Castilla y León. Cada ficha enlaza el documento que se vio ese día y dice qué no se ha copiado.",
          "Cataluña es un caso distinto: su página de Canal Salut dice que el calendario sistemático vigente sigue siendo el de 2025. No trates un calendario de 2026 de otra comunidad como si fuera el de Cataluña.",
        ],
        lists: [
          [
            "Andalucía: instrucción DSGPyOF-1/2026, de 26 de enero de 2026, en Andavac.",
            "Aragón: orden SAN/1023/2024, de 2 de septiembre, en vigor desde el 14 de septiembre de 2024. La página se actualizó el 6 de agosto de 2026 y no es una orden de 2026.",
            "Cataluña: calendario sistemático de 2025, orden SLT/261/2024. Las vacunas recomendadas en ese calendario son gratuitas, según Canal Salut.",
            "Comunitat Valenciana: resolución de 13 de marzo de 2026 del calendario sistemático a lo largo de la vida.",
            "Región de Murcia: calendario 2026 y orden publicada en el BORM del 29 de septiembre de 2026.",
            "Galicia: instrucción 1/2026 del programa gallego, en el catálogo del Sergas con fecha 24 de agosto de 2026.",
            "Navarra: PDF oficial titulado calendario de vacunaciones e inmunizaciones a lo largo de toda la vida, Navarra, 2026.",
            "Madrid y Castilla y León: guías ya publicadas, con sus propias fechas de revisión.",
          ],
        ],
      },
      {
        id: "sin-ficha",
        title: "Comunidades sin ficha propia",
        paragraphs: [
          `En esta revisión no se abrió la página autonómica de ${SIN_FICHA.join(", ")}. El índice del Ministerio las nombra, pero esta guía no les asigna una dirección que no se haya abierto. Para una campaña estacional de gripe o covid, busca el anuncio de tu servicio de salud: no es lo mismo que el calendario sistemático.`,
          "Si te mudas, lleva la cartilla o el informe del servicio anterior y pregunta en el centro cómo consta el registro. Una ausencia en una aplicación no demuestra, por sí sola, que una vacuna no se administró.",
        ],
      },
    ],
    related: [
      { href: "/bebe/calendario-vacunal-andalucia", label: "Andalucía" },
      { href: "/bebe/calendario-vacunal-aragon", label: "Aragón" },
      { href: "/bebe/calendario-vacunal-cataluna", label: "Cataluña" },
      { href: "/bebe/calendario-vacunal-comunitat-valenciana", label: "Comunitat Valenciana" },
      { href: "/bebe/calendario-vacunal-murcia", label: "Región de Murcia" },
      { href: "/bebe/calendario-vacunal-galicia", label: "Galicia" },
      { href: "/bebe/calendario-vacunal-navarra", label: "Navarra" },
      { href: "/bebe/calendario-vacunal-madrid", label: "Madrid" },
      { href: "/bebe/calendario-vacunal-castilla-y-leon", label: "Castilla y León" },
      { href: "/bebe/apoyo-lactancia", label: "Apoyo a la lactancia" },
    ],
  },
  {
    id: "calendarioVacunalAndalucia",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-andalucia",
    reviewedAt: REVIEWED,
    h1: "Calendario vacunal de Andalucía 2026: documento oficial",
    title: "Calendario vacunal Andalucía 2026: instrucción en Andavac",
    description:
      "Andavac publica el calendario de vacunaciones e inmunizaciones de Andalucía 2026, instrucción DSGPyOF-1/2026, con fecha 26 de enero de 2026.",
    lead:
      "Andavac, del Plan de Vacunaciones de Andalucía, reúne el calendario de 2026 en la instrucción DSGPyOF-1/2026, fechada el 26 de enero de 2026. La ficha lo presenta como guía para profesionales. Ábrela y, para el caso de una persona concreta, consulta el centro de salud.",
    cta: {
      href: "https://www.andavac.es/documentos/calendario-de-vacunaciones-de-andalucia-2026-instruccion-dsgpyof-1-2026/",
      label: "Abrir la ficha de Andavac del calendario 2026",
    },
    disclaimer: DISCLAIMER_MEDICO,
    sources: [
      {
        href: "https://www.andavac.es/documentos/calendario-de-vacunaciones-de-andalucia-2026-instruccion-dsgpyof-1-2026/",
        label: "Andavac: instrucción DSGPyOF-1/2026, 26 de enero de 2026",
      },
      { href: MINISTRY_CALENDAR, label: "Ministerio de Sanidad: calendario común 2026" },
    ],
    sections: [
      {
        id: "donde",
        title: "Dónde está el documento",
        paragraphs: [
          "La ficha de Andavac se titula Calendario de Vacunaciones de Andalucía 2026 (Instrucción DSGPyOF-1/2026). Indica la Consejería de Sanidad, Presidencia y Emergencias, la fecha 26 de enero de 2026 y un PDF de acceso. Guarda el enlace de la ficha, no solo una copia del archivo.",
          NO_TABLA,
        ],
      },
      {
        id: "centro",
        title: "Qué preguntar en el centro",
        paragraphs: [
          "Pide cita en el centro de salud que corresponda al menor o a la persona adulta y lleva la cartilla o los informes que ya tengas. Si el documento que te piden es un certificado individual, el calendario publicado no lo sustituye.",
        ],
      },
    ],
    related: hubRelated,
  },
  {
    id: "calendarioVacunalAragon",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-aragon",
    reviewedAt: REVIEWED,
    h1: "Calendario vacunal de Aragón: orden de 2024 aún citada",
    title: "Calendario vacunal Aragón: orden SAN/1023/2024",
    description:
      "La página del Gobierno de Aragón, actualizada el 6 de agosto de 2026, cita la orden SAN/1023/2024, en vigor desde el 14 de septiembre de 2024.",
    lead:
      "El Gobierno de Aragón mantiene una página del calendario infantil cuya última actualización visible es el 6 de agosto de 2026. El calendario que enlaza es el de la orden SAN/1023/2024, de 2 de septiembre, en vigor desde el 14 de septiembre de 2024. No es una orden de 2026.",
    cta: {
      href: "https://www.aragon.es/-/calendario-infantil-unificado-de-vacunaciones",
      label: "Abrir el calendario infantil del Gobierno de Aragón",
    },
    disclaimer: DISCLAIMER_MEDICO,
    sources: [
      {
        href: "https://www.aragon.es/-/calendario-infantil-unificado-de-vacunaciones",
        label: "Gobierno de Aragón: calendario infantil, actualización 6 de agosto de 2026",
      },
      {
        href: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VEROBJ&MLKOB=1350780160909",
        label: "BOA: orden SAN/1023/2024, de 2 de septiembre",
      },
    ],
    sections: [
      {
        id: "orden",
        title: "Qué norma cita la página",
        paragraphs: [
          "La página titula el bloque como calendario de vacunaciones en edad pediátrica en Aragón, orden de 2 de septiembre de 2024, en vigor desde el 14 de septiembre de 2024, y enlaza la orden SAN/1023/2024. También hay PDFs de la tabla y del calendario de mano de 2024, además de calendarios anteriores.",
          "No describimos aquí los cambios respecto de 2019 que enumera esa página. Ábrelos en el original si necesitas el detalle, y contrasta con el centro de salud qué consta en el registro de la persona.",
        ],
      },
      {
        id: "centro",
        title: "Centro de salud",
        paragraphs: [
          NO_TABLA,
          "Si conservas un calendario de otro año, no lo uses como si fuera el vigente. Vuelve a la página del Gobierno de Aragón y comprueba la fecha de actualización.",
        ],
      },
    ],
    related: hubRelated,
  },
  {
    id: "calendarioVacunalCataluna",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-cataluna",
    reviewedAt: REVIEWED,
    h1: "Calendario vacunal de Cataluña: sigue vigente el de 2025",
    title: "Calendario vacunal Cataluña: el sistemático vigente es el de 2025",
    description:
      "Canal Salut dice que el calendario sistemático vigente sigue siendo el de 2025, orden SLT/261/2024. Las vacunas recomendadas en ese calendario son gratuitas.",
    lead:
      "La página de Canal Salut del calendario sistemático dice, de forma expresa, que el calendario vigente continúa siendo el de 2025. Lo actualiza la orden SLT/261/2024, de 26 de diciembre. La misma página indica que las vacunas recomendadas en el calendario de Cataluña son gratuitas. No afirmes que Cataluña ya aplica un calendario sistemático de 2026.",
    cta: {
      href: "https://canalsalut.gencat.cat/ca/salut-a-z/v/vacunacions/calendari/",
      label: "Abrir el calendario sistemático en Canal Salut",
    },
    disclaimer: DISCLAIMER_MEDICO,
    sources: [
      {
        href: "https://canalsalut.gencat.cat/ca/salut-a-z/v/vacunacions/calendari/",
        label: "Canal Salut: calendario sistemático vigente de 2025, actualización 21 de marzo de 2025",
      },
      {
        href: "https://dogc.gencat.cat/ca/document-del-dogc/?documentId=1003286",
        label: "DOGC: orden SLT/261/2024, de 26 de diciembre",
      },
    ],
    sections: [
      {
        id: "vigente-2025",
        title: "El sistemático que la página da por vigente",
        paragraphs: [
          "El texto de Canal Salut, con fecha de actualización 21 de marzo de 2025, remite al PDF del calendario y a la orden SLT/261/2024. También enumera novedades de ese calendario. No las reproducimos: léelas en la página oficial.",
          "Una campaña de otoño de gripe o covid es un anuncio distinto. No la confundas con este calendario sistemático.",
          NO_TABLA,
        ],
      },
      {
        id: "documento-individual",
        title: "Documento de una persona",
        paragraphs: [
          "El calendario no acredita las vacunas registradas de un menor. Para un PDF del estado vacunal en La Meva Salut, sigue la guía de descarga ya publicada: hace falta el perfil del menor y, entre los 16 y los 18 años, el consentimiento que explica el servicio.",
        ],
      },
    ],
    related: [
      ...hubRelated,
      { href: "/bebe/certificado-vacunacion-descargar", label: "Documento de vacunación en Cataluña" },
    ],
  },
  {
    id: "calendarioVacunalValencia",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-comunitat-valenciana",
    reviewedAt: REVIEWED,
    h1: "Calendario vacunal de la Comunitat Valenciana 2026",
    title: "Calendario vacunal Comunitat Valenciana: resolución de marzo de 2026",
    description:
      "La Conselleria de Sanidad publica el calendario a lo largo de la vida y la resolución de 13 de marzo de 2026 que lo actualiza.",
    lead:
      "La página en castellano de Vacunaciones de la Conselleria de Sanidad muestra el calendario de vacunación a lo largo de la vida y enlaza la resolución de 13 de marzo de 2026, por la que se actualiza el calendario de vacunaciones sistemáticas a lo largo de la vida (2026) en la Comunitat Valenciana.",
    cta: {
      href: "https://vacunaciones.san.gva.es/es/calendario-vacunaciones",
      label: "Abrir el calendario de la Conselleria de Sanidad",
    },
    disclaimer: DISCLAIMER_MEDICO,
    sources: [
      {
        href: "https://vacunaciones.san.gva.es/es/calendario-vacunaciones",
        label: "Conselleria de Sanidad: calendario y resolución de 13 de marzo de 2026",
      },
    ],
    sections: [
      {
        id: "resolucion",
        title: "Página y resolución",
        paragraphs: [
          "Abre la página HTML, no un cartel guardado en el móvil. Desde ahí están el cartel, la resolución de 13 de marzo de 2026 y un dosier. El histórico de calendarios infantiles y de adultos es otro material.",
          NO_TABLA,
        ],
      },
      {
        id: "campana",
        title: "Campaña de otoño e invierno",
        paragraphs: [
          "El menú de la misma web separa el calendario sistemático de las campañas. La campaña de otoño-invierno 2026-2027 tiene su propia página. No la uses como si fuera el calendario de toda la vida.",
        ],
      },
    ],
    related: hubRelated,
  },
  {
    id: "calendarioVacunalMurcia",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-murcia",
    reviewedAt: REVIEWED,
    h1: "Calendario vacunal de la Región de Murcia 2026",
    title: "Calendario vacunal Murcia 2026: página oficial y BORM",
    description:
      "MurciaSalud enlaza el calendario 2026 a lo largo de toda la vida y la orden publicada en el BORM del 29 de septiembre de 2026.",
    lead:
      "La página de vacunación de MurciaSalud para la Región de Murcia enlaza el calendario de vacunaciones e inmunizaciones a lo largo de toda la vida 2026 y la orden de la Consejería de Salud publicada en el BORM del 29 de septiembre de 2026.",
    cta: {
      href: "https://www.murciasalud.es/web/vacunacion/murcia",
      label: "Abrir la página de vacunación de la Región de Murcia",
    },
    disclaimer: DISCLAIMER_MEDICO,
    sources: [
      {
        href: "https://www.murciasalud.es/web/vacunacion/murcia",
        label: "MurciaSalud: calendario 2026 y orden en el BORM de 29 de septiembre de 2026",
      },
    ],
    sections: [
      {
        id: "pagina",
        title: "Qué enlaza la página regional",
        paragraphs: [
          "En la ficha de la Región de Murcia aparecen el calendario 2026, un calendario gráfico, una evolución histórica con última actualización del 3 de noviembre de 2025 y la orden del BORM del 29 de septiembre de 2026. Entra por la página HTML para ver el enlace vigente.",
          NO_TABLA,
        ],
      },
    ],
    related: hubRelated,
  },
  {
    id: "calendarioVacunalGalicia",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-galicia",
    reviewedAt: REVIEWED,
    h1: "Calendario vacunal de Galicia: instrucción 1/2026 del Sergas",
    title: "Calendario vacunal Galicia: instrucción 1/2026 en el catálogo del Sergas",
    description:
      "El catálogo de publicaciones del Sergas lista, el 24 de agosto de 2026, la instrucción 1/2026 del programa gallego de vacunación.",
    lead:
      "El catálogo de publicaciones de la Consellería de Sanidade y del Servizo Galego de Saúde lista, con fecha 24 de agosto de 2026, el título «Calendario de inmunización a lo largo de toda la vida. Programa gallego de vacunación. Instrucción 1/2026». Abre esa ficha del catálogo. No reproducimos aquí los cambios de pauta.",
    cta: {
      href: "https://extranet.sergas.es/catpb/publicaciones/NovidadesPublicacion.aspx?Idioma=es&IdPaxina=40008",
      label: "Abrir el catálogo del Sergas donde figura la instrucción",
    },
    secondaryCta: {
      href: "https://extranet.sergas.es/catpb/Publicaciones/DetallePublicacion.aspx?IdPaxina=40008&IDCatalogo=3364",
      label: "Ficha de la instrucción 1/2026 en el catálogo",
    },
    disclaimer: DISCLAIMER_MEDICO,
    sources: [
      {
        href: "https://extranet.sergas.es/catpb/publicaciones/NovidadesPublicacion.aspx?Idioma=es&IdPaxina=40008",
        label: "Sergas: novedades del catálogo, entrada del 24 de agosto de 2026",
      },
    ],
    sections: [
      {
        id: "catalogo",
        title: "Cómo localizar la instrucción",
        paragraphs: [
          "En el listado de novedades, la entrada del 24 de agosto de 2026 lleva al detalle con identificador de catálogo 3364. El mismo listado incluye otras instrucciones de campañas, por ejemplo gripe y covid o virus respiratorio sincitial. Esas campañas no sustituyen al calendario de toda la vida.",
          NO_TABLA,
        ],
      },
    ],
    related: hubRelated,
  },
  {
    id: "calendarioVacunalNavarra",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-navarra",
    reviewedAt: REVIEWED,
    h1: "Calendario vacunal de Navarra 2026: documento oficial",
    title: "Calendario vacunal Navarra 2026: PDF oficial, sin copiar la tabla",
    description:
      "El PDF oficial se titula calendario de vacunaciones e inmunizaciones a lo largo de toda la vida, Navarra, 2026. Esta guía no copia la tabla.",
    lead:
      "El documento oficial publicado por Navarra se titula «Calendario de vacunaciones e inmunizaciones a lo largo de toda la vida. Navarra, 2026». Es una tabla con notas. Aquí solo indicamos dónde está. El calendario acelerado de 2026 y la campaña de gripe son documentos distintos.",
    cta: {
      href: "http://www.navarra.es/NR/rdonlyres/BE860C50-9050-46F3-A996-B22F965FC978/494293/2026_03CalendariodevacunacionesNavarra2026TablaRes.pdf",
      label: "Abrir el PDF oficial del calendario de Navarra 2026",
    },
    disclaimer: DISCLAIMER_MEDICO,
    sources: [
      {
        href: "http://www.navarra.es/NR/rdonlyres/BE860C50-9050-46F3-A996-B22F965FC978/494293/2026_03CalendariodevacunacionesNavarra2026TablaRes.pdf",
        label: "Navarra: PDF del calendario a lo largo de toda la vida, 2026",
      },
      {
        href: "https://portalsalud.navarra.es/documents/11746728/58599564/2026-03.+Calendario+de+vacunaciones+Navarra+2026+%281%29.pdf/88a5428d-463a-35ef-efca-11a1697ea9fc",
        label: "Portal Salud: calendario de Navarra 2026, que cita la orden foral 310E/2023 y cambios posteriores",
      },
    ],
    sections: [
      {
        id: "pdf",
        title: "El PDF y lo que no copiamos",
        paragraphs: [
          "El archivo del Gobierno de Navarra es la tabla resumen. El PDF del Portal Salud repite el título de 2026 y explica que la orden foral 310E/2023 estableció el calendario oficial, con modificaciones posteriores, entre ellas las novedades que el propio documento detalla para 2026. Esas novedades se leen en el PDF, no en esta página.",
          NO_TABLA,
        ],
      },
    ],
    related: hubRelated,
  },
  {
    id: "apoyoLactancia",
    pack: "bebe",
    path: "/bebe/apoyo-lactancia",
    reviewedAt: REVIEWED,
    h1: "Dónde pedir apoyo a la lactancia materna",
    title: "Apoyo a la lactancia: centro de salud y páginas del Ministerio",
    description:
      "El Ministerio indica que muchos centros de salud tienen grupos de lactancia y publica las recomendaciones de la OMS y UNICEF. No es una pauta para un caso concreto.",
    lead:
      "La página de recursos del Ministerio de Sanidad dice que en muchos centros de salud hay grupos de lactancia y que también existen asociaciones locales y nacionales. Otra página del mismo sitio recoge lo que recomiendan la OMS y UNICEF. Léelas allí. Esta guía no convierte esas líneas en una pauta para una madre o un bebé concretos.",
    cta: {
      href: "https://estilosdevidasaludable.sanidad.gob.es/alimentacionSaludable/lactancia/lactanciaMaterna/recursos/home.htm",
      label: "Ministerio: recursos de apoyo a la lactancia",
    },
    secondaryCta: {
      href: "https://estilosdevidasaludable.sanidad.gob.es/alimentacionSaludable/lactancia/lactanciaMaterna/recomendaciones/home.htm",
      label: "Ministerio: recomendaciones de la OMS y UNICEF",
    },
    disclaimer: DISCLAIMER_MEDICO,
    sources: [
      {
        href: "https://estilosdevidasaludable.sanidad.gob.es/alimentacionSaludable/lactancia/lactanciaMaterna/recursos/home.htm",
        label: "Ministerio de Sanidad: recursos de apoyo a la lactancia",
      },
      {
        href: "https://estilosdevidasaludable.sanidad.gob.es/alimentacionSaludable/lactancia/lactanciaMaterna/recomendaciones/home.htm",
        label: "Ministerio de Sanidad: recomendaciones y claves de lactancia materna",
      },
      {
        href: "https://www.ihan.es/grupos-de-apoyo/",
        label: "IHAN: grupos de apoyo, enlace citado por el Ministerio",
      },
      {
        href: "https://localizasalud.sanidad.gob.es/",
        label: "LOCALIZA salud, enlace citado por el Ministerio",
      },
    ],
    faqs: [
      {
        q: "¿Hay un directorio de grupos por comunidad en esta guía?",
        a: "No. El Ministerio remite a los grupos de muchos centros de salud, al buscador LOCALIZA salud y al listado de grupos de la IHAN. No hemos comprobado un directorio autonómico completo.",
      },
    ],
    sections: [
      {
        id: "donde-preguntar",
        title: "Dónde preguntar",
        paragraphs: [
          "Empieza por el centro de salud o el hospital donde atienden al bebé y pregunta si hay grupo de lactancia, cómo se apunta una persona y si hace falta cita. El Ministerio también enlaza los grupos de apoyo de la asociación IHAN y el buscador LOCALIZA salud.",
          "No hay en esta revisión un listado verificado de grupos por comunidad autónoma. Una sala de lactancia de un centro concreto no es una norma para toda España.",
        ],
      },
      {
        id: "que-dice-el-ministerio",
        title: "Qué recomienda la página del Ministerio, no un caso concreto",
        paragraphs: [
          "La página de recomendaciones dice que la OMS, UNICEF y las principales sociedades científicas recomiendan el inicio inmediato de la lactancia en la primera hora de vida, la lactancia exclusiva durante los primeros seis meses y, a partir de entonces, alimentos complementarios seguros junto con la lactancia hasta los dos años o más, o hasta que la madre y el bebé lo deseen.",
          "Eso es lo que publica el Ministerio. No es una instrucción para una familia determinada ni sustituye la consulta con el profesional o el grupo del centro. La misma web tiene más claves de acompañamiento: léelas en el original.",
        ],
      },
    ],
    related: [
      { href: "/bebe/tarjeta-sanitaria-bebe", label: "Tarjeta sanitaria del bebé" },
      { href: "/bebe/calendario-vacunal-por-comunidad", label: "Calendario vacunal por comunidad" },
      { href: "/colegio/escuela-infantil-publica", label: "Escuela infantil pública 0-3" },
    ],
  },
  {
    id: "escuelaInfantilPublica",
    pack: "colegio",
    path: "/colegio/escuela-infantil-publica",
    reviewedAt: REVIEWED,
    h1: "Escuela infantil pública 0-3: plaza, baremo y plazo",
    title: "Escuela infantil pública 0-3: qué fija la ley y qué fija tu comunidad",
    description:
      "El primer ciclo de Infantil es voluntario. La plaza, el baremo y el plazo los publica la comunidad o el ayuntamiento. No hay un plazo nacional de 2026.",
    lead:
      "El Real Decreto 95/2022 ordena la Educación Infantil desde el nacimiento hasta los seis años, en dos ciclos, y la declara voluntaria. El segundo ciclo es gratuito. El primero tiende a una oferta pública suficiente y a extender su gratuidad, con prioridad para el alumnado en riesgo de pobreza o exclusión, pero esa norma no lo declara gratuito en toda España ni fija el plazo de solicitud.",
    cta: {
      href: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-1654#a5",
      label: "BOE: Real Decreto 95/2022, principios de la etapa",
    },
    secondaryCta: {
      href: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a84",
      label: "BOE: Ley de Educación, admisión de alumnado",
    },
    sources: [
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-1654#a3",
        label: "RD 95/2022, artículo 3: etapa de 0 a 6 años y dos ciclos",
      },
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-2022-1654#a5",
        label: "RD 95/2022, artículo 5: voluntaria; segundo ciclo gratuito; gratuidad progresiva del primero",
      },
      {
        href: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a84",
        label: "LOE, artículo 84: la Administración educativa regula la admisión",
      },
    ],
    faqs: [
      {
        q: "¿Hay un plazo único para pedir plaza de escuela infantil en 2026?",
        a: "No consta en el Real Decreto 95/2022 ni en el artículo 84 de la Ley de Educación. El plazo, el baremo y la red (autonómica, municipal u otra) los publica la administración que convoca las plazas.",
      },
    ],
    sections: [
      {
        id: "que-es",
        title: "Qué dice la norma estatal",
        paragraphs: [
          "El artículo 3 del Real Decreto 95/2022 dice que la Educación Infantil atiende desde el nacimiento hasta los seis años y se ordena en dos ciclos: el primero hasta los tres años y el segundo de los tres a los seis. El artículo 5.1 la declara voluntaria. El artículo 5.2 declara gratuito el segundo ciclo y, para el primero, una tendencia a la oferta pública suficiente y a la extensión de la gratuidad, priorizando el acceso del alumnado en situación de riesgo de pobreza y exclusión social y la situación de baja tasa de escolarización.",
          "El texto consolidado del BOE es informativo. Para un uso jurídico, contrasta la publicación oficial.",
        ],
      },
      {
        id: "admision",
        title: "Quién regula la plaza cuando no hay sitio para todos",
        paragraphs: [
          "El artículo 84.1 de la Ley Orgánica 2/2006 encarga a las Administraciones educativas la admisión en centros públicos y privados concertados, con igualdad y libertad de elección de centro. El artículo 84.2 dice que, cuando no hay plazas suficientes, son criterios prioritarios los hermanos o hermanas ya matriculados en el centro, la proximidad del domicilio o del lugar de trabajo de alguno de los padres, madres o tutores legales, y la renta per cápita de la unidad familiar. Añade otras circunstancias, entre ellas familia numerosa, monoparental, acogimiento, discapacidad y víctima de violencia de género o de terrorismo. Ningún criterio es excluyente ni puede superar el 30 % de la puntuación máxima, salvo la proximidad al domicilio, que puede superar ese límite.",
          "Esos criterios no son un baremo con puntos ya calculados. Cada convocatoria publica la puntuación, los desempates, los documentos y el plazo. Una regla del Ayuntamiento de Madrid no se aplica sola en otro municipio.",
        ],
      },
      {
        id: "ejemplo-madrid",
        title: "Ejemplo ya publicado: lista de espera en Madrid",
        paragraphs: [
          "La guía de lista de espera de escuela infantil recoge, como ejemplo, la convocatoria 2026/2027 de la red autonómica de Madrid y la diferencia de la red del Ayuntamiento de Madrid. Esas cifras y fechas no son un baremo nacional. Si la plaza que buscas es de otra comunidad, abre su sede educativa.",
        ],
      },
    ],
    related: [
      { href: "/colegio/lista-espera-escuela-infantil", label: "Ejemplo: lista de espera en Madrid" },
      { href: "/colegio", label: "Colegio" },
      { href: "/bebe/apoyo-lactancia", label: "Apoyo a la lactancia" },
      { href: "/bebe", label: "Bebé" },
    ],
  },
];
