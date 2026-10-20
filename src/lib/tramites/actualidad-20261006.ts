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
    reviewedAt: "2026-10-18",
    cta: {
      href: "https://www.correos.es/es/es/particulares/para-el-ciudadano/voto-por-correo",
      label: "Solicitar el voto por correo en Correos",
    },
    secondaryCta: {
      href: "https://www.boe.es/eli/es/rd/2026/10/05/806",
      label: "Leer la convocatoria en el BOE",
    },
    sources: [...votoSources, {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}],
    related: [
      { href: "/elecciones/calendario-29-noviembre", label: "Calendario oficial de esta convocatoria" },
      { href: "/elecciones/quien-puede-votar", label: "Quién vota en estas elecciones" },
      { href: "/empadronarse", label: "Empadronarse" },
    ],
    disclaimer:
      "No somos Correos, la Oficina del Censo Electoral ni la Junta Electoral. Los plazos de esta página son los de Correos (6 de octubre de 2026) y los del calendario de la Junta Electoral Central. Una instrucción posterior de la Junta Electoral puede cambiar un plazo.",
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
      {"id": "fechas-jec-correo", "title": "Las fechas del voto por correo, una a una", "paragraphs": ["Así lo recoge el calendario de la Junta Electoral Central para esta convocatoria."], "lists": [["Solicitud: del 6 de octubre al 19 de noviembre de 2026.", "Envío de la documentación por la Oficina del Censo Electoral: del 9 al 22 de noviembre.", "Remisión del voto por el elector: del 10 al 25 de noviembre, siempre antes del tercer día previo a la votación.", "Si vives en el extranjero (CERA), el voto por correo al consulado se envía hasta el 24 de noviembre y el voto en urna es del 21 al 26 de noviembre."]]},
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
  {"id": "calendario-29n", "pack": "elecciones", "path": "/elecciones/calendario-29-noviembre", "h1": "Calendario de las elecciones del 29 de noviembre de 2026", "title": "Calendario electoral del 29-N: todas las fechas clave", "description": "Fechas oficiales del 29-N según la Junta Electoral Central: candidaturas, voto por correo, sorteo de mesas, campaña, encuestas, reflexión y escrutinio.", "lead": "El Real Decreto 806/2026, publicado en el BOE del 6 de octubre, convoca elecciones al Congreso y al Senado para el domingo 29 de noviembre de 2026. La Junta Electoral Central ha publicado el calendario completo. Aquí tienes las fechas que afectan a electores y partidos, en orden y con su fuente.", "reviewedAt": "2026-10-18", "cta": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Abrir el calendario de la Junta Electoral Central"}, "secondaryCta": {"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "Abrir el Real Decreto 806/2026"}, "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre"}, {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}, {"href": "https://www.ine.es/dyngs/Prensa/EG2026.htm", "label": "INE: nota de prensa de la Oficina del Censo Electoral para el 29 de noviembre"}, {"href": "https://www.correos.com/sala-prensa/ya-se-puede-solicitar-el-voto-por-correo-para-las-elecciones-generales-del-29-de-noviembre/", "label": "Correos, 6 de octubre de 2026: plazos de esta convocatoria"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672", "label": "Ley Orgánica 5/1985, del Régimen Electoral General"}], "related": [{"href": "/elecciones/voto-por-correo", "label": "Cómo pedir el voto por correo"}, {"href": "/elecciones/miembro-de-mesa", "label": "Me ha tocado mesa electoral"}, {"href": "/elecciones/donde-voto-mesa-electoral", "label": "Dónde voto: mesa y colegio"}, {"href": "/elecciones/nuevo-partido-coalicion", "label": "Coaliciones y listas del 29-N"}, {"href": "/elecciones/huelga-general-sindicatos", "label": "Huelga general del 11 de noviembre"}, {"href": "/elecciones/programas-electorales-29n", "label": "Programas electorales del 29-N: cuándo salen"}, {"href": "/elecciones/sorteo-mesa-electoral-29n", "label": "¿Me toca mesa? Cuándo es el sorteo"}, {"href": "/elecciones/excusa-mesa-electoral", "label": "Excusas para la mesa electoral"}, {"href": "/elecciones/tarjeta-censal-cuando-llega", "label": "Tarjeta censal: cuándo llega"}, {"href": "/elecciones/candidaturas-29n-boe", "label": "Listas del 29-N: cuándo salen en el BOE"}, {"href": "/elecciones/debate-electoral-29n", "label": "Debates del 29-N: fechas y quién ha aceptado"}, {"href": "/elecciones/cuando-habra-gobierno-29n", "label": "¿Cuándo habrá Gobierno tras el 29-N?"}, {"href": "/elecciones/no-recibir-propaganda-electoral", "label": "Cómo no recibir propaganda electoral"}], "disclaimer": "Las fechas salen del calendario de la Junta Electoral Central, del Real Decreto 806/2026, de la nota del INE y de la nota de Correos del 6 de octubre de 2026. Si la Junta Electoral precisa un trámite, manda la fuente oficial.", "faqs": [{"q": "¿Cuándo empieza la campaña electoral?", "a": "A las 0:00 del viernes 13 de noviembre de 2026. Termina a las 24:00 del viernes 27 de noviembre, según el artículo 4 del Real Decreto 806/2026."}, {"q": "¿Hasta cuándo puedo pedir el voto por correo?", "a": "Hasta el 19 de noviembre de 2026. La documentación se envía del 9 al 22 de noviembre y el voto se deposita en Correos hasta el 25 de noviembre."}, {"q": "¿Cuándo sé si me toca mesa?", "a": "Los ayuntamientos hacen el sorteo del 31 de octubre al 4 de noviembre y notifican la designación en los 3 días siguientes."}, {"q": "¿Cuándo se conocen las listas definitivas?", "a": "Las Juntas Electorales Provinciales proclaman las candidaturas el 2 de noviembre y el BOE las publica el 3 de noviembre."}], "sections": [{"id": "calendario-jec-tabla", "title": "Fechas clave, de la convocatoria a la constitución", "paragraphs": ["La tabla resume el calendario de la Junta Electoral Central. La columna «Para» indica a quién afecta cada plazo."], "table": {"caption": "Calendario de las elecciones generales del 29 de noviembre de 2026", "head": ["Fecha", "Qué pasa", "Para"], "rows": [{"cells": ["6 de octubre", "El BOE publica la convocatoria. Se abre la solicitud del voto por correo y del voto en braille.", "Todos"], "source": {"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre"}}, {"cells": ["12 al 19 de octubre", "Consulta del censo en ayuntamientos, consulados y sede del INE, y reclamaciones.", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["16 de octubre", "Último día para comunicar coaliciones a la Junta Electoral.", "Partidos"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["21 al 26 de octubre", "Presentación de candidaturas ante las Juntas Electorales Provinciales.", "Partidos"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["23 de octubre", "Se exponen las rectificaciones del censo.", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["28 de octubre", "El BOE publica las candidaturas presentadas.", "Todos"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["31 de octubre", "Último día para pedir el voto si estás fuera una temporada (ERTA).", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["31 de octubre al 4 de noviembre", "Sorteo de los miembros de mesa en los ayuntamientos.", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["2 de noviembre", "Proclamación de candidaturas. Último día para pedir el voto en braille. El INE empieza a enviar las tarjetas censales.", "Todos"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["3 de noviembre", "El BOE publica las candidaturas proclamadas.", "Todos"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["9 al 22 de noviembre", "La Oficina del Censo Electoral envía la documentación del voto por correo.", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["13 al 27 de noviembre", "Campaña electoral, de las 0:00 del viernes 13 a las 24:00 del viernes 27.", "Todos"], "source": {"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre"}}, {"cells": ["19 de noviembre", "Último día para pedir el voto por correo.", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["19 al 28 de noviembre", "Los ayuntamientos exponen y publican en internet las secciones, locales y mesas definitivos.", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["21 al 26 de noviembre", "Voto en urna en los consulados para quien vive en el extranjero (CERA).", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["24 de noviembre", "Último día para que el elector CERA envíe su voto por correo al consulado.", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["24 al 28 de noviembre", "Prohibido publicar o difundir sondeos electorales.", "Todos"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["25 de noviembre", "Último día para depositar el voto por correo en una oficina de Correos.", "Electores"], "source": {"href": "https://www.correos.com/sala-prensa/ya-se-puede-solicitar-el-voto-por-correo-para-las-elecciones-generales-del-29-de-noviembre/", "label": "Correos, 6 de octubre de 2026: plazos de esta convocatoria"}}, {"cells": ["28 de noviembre", "Jornada de reflexión.", "Todos"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["29 de noviembre", "Votación, de 9:00 a 20:00.", "Electores"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["4 al 7 de diciembre", "Escrutinio general en las Juntas Electorales Provinciales.", "Juntas"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}}, {"cells": ["23 de diciembre", "Sesiones constitutivas del Congreso y del Senado, a las 10:00.", "Cortes"], "source": {"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre"}}]}}, {"id": "ya-pasado", "title": "Plazos que ya han terminado", "paragraphs": ["A 20 de octubre de 2026 ya ha terminado el plazo de coaliciones (16 de octubre). La Junta Electoral Central ha publicado nueve coaliciones válidamente constituidas.", "La consulta y reclamación del censo terminó el 19 de octubre. Las rectificaciones se exponen el 23 de octubre. Ahora solo queda revisar tu inscripción y tu mesa en la sede del INE."]}, {"id": "convocatoria", "title": "Qué fija el real decreto", "paragraphs": ["El artículo 1 disuelve las dos Cámaras elegidas el 23 de julio de 2023. El artículo 2 convoca las elecciones para el domingo 29 de noviembre de 2026. El artículo 6 dice que se rigen por la Ley Orgánica 5/1985 y por su desarrollo.", "El anexo reparte los 350 diputados por circunscripción: Madrid elige 38 y Barcelona 32; Ceuta y Melilla, uno cada una. En el Senado, cada provincia elige cuatro senadores; Gran Canaria, Mallorca y Tenerife, tres; Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote y La Palma, uno; Ceuta y Melilla, dos.", "Según el INE, pueden votar 38.728.356 electores: 35.958.711 residen en España y 2.769.645 en el extranjero.", "Las Cámaras elegidas se reúnen en sesión constitutiva el 23 de diciembre de 2026, a las diez de la mañana (artículo 5 del real decreto)."]}, {"id": "plazos-que-busca-la-gente", "title": "Encuestas, reflexión y resultados", "paragraphs": ["El artículo 69.7 de la LOREG prohíbe publicar, difundir o reproducir sondeos durante los cinco días anteriores al de la votación. En esta convocatoria, del 24 al 28 de noviembre.", "El sábado 28 de noviembre es la jornada de reflexión: ya no hay campaña. El domingo 29 se vota de 9:00 a 20:00 (artículo 84 de la LOREG).", "Los resultados de la noche electoral son provisionales. El escrutinio general lo hacen las Juntas Electorales Provinciales del 4 al 7 de diciembre, y las Cámaras se constituyen el 23 de diciembre a las 10:00."]}]},
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
    reviewedAt: "2026-10-18",
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
      {"href": "https://www.ine.es/dyngs/Prensa/EG2026.htm", "label": "INE: nota de prensa de la Oficina del Censo Electoral para el 29 de noviembre"},
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
      {"id": "cifras-ine", "title": "Cuántos electores hay el 29-N", "paragraphs": ["Según la nota del INE, pueden votar 38.728.356 electores: 35.958.711 residen en España y 2.769.645 en el extranjero.", "De los residentes en España, 1.615.127 votan por primera vez en unas generales, porque han cumplido 18 años desde las de julio de 2023.", "Los electores que viven en el extranjero votan sin solicitud previa: la Oficina del Censo Electoral les envía la documentación de oficio."]},
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
  {"id": "nuevo-partido-coalicion-29n", "pack": "elecciones", "path": "/elecciones/nuevo-partido-coalicion", "h1": "Coaliciones y listas del 29 de noviembre: qué hay registrado", "title": "Coaliciones del 29-N: las 9 registradas en la Junta Electoral", "description": "La Junta Electoral Central ha validado 9 coaliciones para el 29-N, del Frente Amplio a D21. Dónde se presenta cada una y cuándo salen las listas.", "lead": "El plazo para comunicar coaliciones terminó el 16 de octubre de 2026. La Junta Electoral Central publica nueve coaliciones válidamente constituidas para estas elecciones, entre ellas Frente Amplio y Democracia para el siglo 21 (D21). Las listas con nombres se presentan del 21 al 26 de octubre y se proclaman el 2 de noviembre.", "reviewedAt": "2026-10-18", "cta": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Ver la lista de coaliciones en la Junta Electoral Central"}, "secondaryCta": {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Calendario de candidaturas de la Junta"}, "sources": [{"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}, {"href": "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", "label": "Junta Electoral Central: calendario electoral de las elecciones generales 2026"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#acuarentaycuatro", "label": "LOREG, artículo 44: partidos, coaliciones y plazo de comunicación"}, {"href": "https://infoelectoral.interior.gob.es/es/formaciones-politicas/financiacion-de-partidos-politicos/informacion-especifica-para-coaliciones-electorales/", "label": "Interior: una coalición no se inscribe en el Registro de Partidos"}, {"href": "https://infoelectoral.interior.gob.es/es/proceso-electoral/preguntas-frecuentes/candidatos-y-candidaturas/", "label": "Interior (Infoelectoral): candidatos y candidaturas"}, {"href": "https://www.rtve.es/noticias/20261012/ada-colau-candidata-frente-amplio-elecciones/17263538.shtml", "label": "RTVE, 12 de octubre de 2026: el Frente Amplio designa a Ada Colau"}, {"href": "https://www.publico.es/politica/frente-amplio-podemos-concurriran-separado-29-noviembre-salvo-canarias-pais-valencia.html", "label": "Público, 17 de octubre de 2026: Frente Amplio y Podemos, por separado salvo en Canarias y País Valencià"}, {"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre"}], "related": [{"href": "/elecciones/calendario-29-noviembre", "label": "Calendario completo del 29-N"}, {"href": "/elecciones/promesas", "label": "Qué prometen los partidos"}, {"href": "/elecciones/como-votar-al-senado", "label": "Cómo se vota al Senado"}], "disclaimer": "No somos la Junta Electoral ni un partido. La lista de coaliciones es la publicada por la Junta Electoral Central a 18 de octubre de 2026. Las candidaturas con nombres son las que proclamen las Juntas Electorales Provinciales y publique el BOE.", "faqs": [{"q": "¿Frente Amplio es un partido?", "a": "No. Es una coalición electoral comunicada a la Junta Electoral Central. Interior explica que las coaliciones no se inscriben en el Registro de Partidos Políticos: se constituyen al comunicar el pacto a la Junta."}, {"q": "¿Quién encabeza el Frente Amplio?", "a": "Según RTVE, el 12 de octubre de 2026 Sumar, IU, Más Madrid y Comuns acordaron designar a Ada Colau como candidata a la Presidencia del Gobierno. El orden de las listas será oficial cuando se proclamen las candidaturas."}, {"q": "¿Van juntos Frente Amplio y Podemos?", "a": "Según Público (17 de octubre), solo habrá lista conjunta en Canarias y en la Comunitat Valenciana. La lista de la Junta lo refleja: Podemos está en Unidad del Pueblo Canario y Podem en Compromís."}, {"q": "¿Dónde se presenta Democracia 21?", "a": "La coalición D21 figura en la Junta Electoral Central con ámbito Congreso y Senado en Madrid y Barcelona."}], "sections": [{"id": "lista-jec", "title": "Las nueve coaliciones validadas por la Junta", "paragraphs": ["En el orden de presentación que publica la Junta Electoral Central. Los partidos que no van en coalición se presentan con sus propias siglas y no aparecen en esta lista."], "table": {"caption": "Coaliciones válidamente constituidas ante la Junta Electoral Central (29-N)", "head": ["Nº", "Coalición", "Dónde se presenta"], "rows": [{"cells": ["C1", "Democracia para el siglo 21 (D21)", "Congreso y Senado: Madrid y Barcelona"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}}, {"cells": ["C2", "Coalición Canaria-Municipalistas Primero Canarias", "Congreso: Canarias. Senado: Tenerife, Gran Canaria, Fuerteventura, Lanzarote, La Palma y La Gomera"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}}, {"cells": ["C3", "Esquerra Republicana de Catalunya-Euskal Herria Bildu", "Senado: Cataluña, País Vasco y Navarra"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}}, {"cells": ["C4", "Coalición Existe", "Congreso y Senado: Aragón"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}}, {"cells": ["C5", "Compromís: Front Valencià (Compromís, EUPV, Podem, ERPV)", "Congreso: Comunitat Valenciana"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}}, {"cells": ["C6", "Comuns-Front Ampli per la democràcia", "Senado: Cataluña"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}}, {"cells": ["C7", "Unidad del Pueblo Canario (NC-BC, Podemos, IU, Sumar)", "Congreso y Senado: Canarias"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}}, {"cells": ["C8", "Senado de Progreso (PSOE, IU, MS, MM, Compromís, CHA, Batzarre)", "Senado: 15 comunidades y Ceuta y Melilla"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}}, {"cells": ["C9", "Frente Amplio", "Congreso: toda España salvo Canarias, Illes Balears y C. Valenciana"], "source": {"href": "https://www.juntaelectoralcentral.es/cs/jec/elecciones/coalicionesJECGenerales", "label": "Junta Electoral Central: coaliciones válidamente constituidas para el 29 de noviembre"}}]}}, {"id": "lo-que-cuenta-la-prensa", "title": "Lo que cuenta la prensa sobre las alianzas", "paragraphs": ["RTVE informó el 12 de octubre de que los cuatro partidos del Frente Amplio (Sumar, IU, Más Madrid y Comuns) designaban a Ada Colau como candidata a la Presidencia. La misma pieza recoge que Podemos acordó con ERC no presentar candidatura propia en Cataluña.", "Público informó el 17 de octubre de que el Frente Amplio registró la coalición sin Podemos. Habrá una lista conjunta de ese espacio en Canarias y en la Comunitat Valenciana; en el resto, listas separadas.", "Estas son crónicas de prensa. Lo que vale para la papeleta es la candidatura proclamada."]}, {"id": "partido-o-coalicion", "title": "Partido inscrito y coalición no son lo mismo", "paragraphs": ["Pueden presentar listas los partidos y federaciones inscritos en el registro, las coaliciones comunicadas a la Junta y las agrupaciones de electores. Lo dice el artículo 44.1 de la LOREG.", "Interior explica que no hay un registro público de coaliciones. Solo pueden integrarlas partidos y federaciones, y el pacto se comunica a la Junta en los diez días siguientes a la convocatoria (artículo 44.2). Quien entra en una coalición en una circunscripción no presenta allí candidatura propia si la coalición concurre a la misma elección (artículo 44.3)."]}, {"id": "cuando-hay-lista", "title": "Cuándo hay una lista oficial con nombres", "paragraphs": [], "lists": [["21 al 26 de octubre: presentación de candidaturas ante las Juntas Electorales Provinciales.", "28 de octubre: el BOE publica las candidaturas presentadas.", "2 de noviembre: proclamación de candidaturas.", "3 de noviembre: el BOE publica las candidaturas proclamadas.", "4 y 5 de noviembre: plazo de recurso contra la proclamación ante el juzgado de lo contencioso-administrativo."]]}]},
  {"id": "huelga-general-sindicatos-2026", "pack": "elecciones", "path": "/elecciones/huelga-general-sindicatos", "h1": "Huelga general del 11 de noviembre por la vivienda y los salarios", "title": "Huelga general del 11 de noviembre: lo que se sabe", "description": "CCOO, UGT y otros sindicatos convocan huelga general de 24 horas el 11 de noviembre de 2026, por la vivienda y los salarios. Registro, preaviso y elecciones.", "lead": "CCOO y UGT, con el Sindicato de Inquilinas y otras organizaciones, han fijado una huelga general de 24 horas para el miércoles 11 de noviembre de 2026, dos días antes de que empiece la campaña electoral. Según EFE, los convocantes registran la convocatoria en el Ministerio de Trabajo el lunes 19 de octubre; después la Administración fija los servicios mínimos.", "reviewedAt": "2026-10-18", "cta": {"href": "https://www.rtve.es/noticias/20261007/huelga-general-fecha-sindicatos-ccoo-ugt-inquilinas/17256812.shtml", "label": "Leer la información de RTVE"}, "secondaryCta": {"href": "https://www.boe.es/buscar/doc.php?id=BOE-A-1977-6061", "label": "Abrir el Real Decreto-ley 17/1977"}, "sources": [{"href": "https://www.rtve.es/noticias/20261007/huelga-general-fecha-sindicatos-ccoo-ugt-inquilinas/17256812.shtml", "label": "RTVE, 7 de octubre de 2026: los sindicatos fijan la huelga general el 11 de noviembre"}, {"href": "https://www.infobae.com/espana/agencias/2026/10/16/los-sindicatos-registraran-el-lunes-en-trabajo-la-convocatoria-de-huelga-general-del-11n/", "label": "EFE (en Infobae), 16 de octubre de 2026: registro de la convocatoria el 19 de octubre"}, {"href": "https://ugt.es/ugt-y-ccoo-acuerdan-la-convocatoria-de-una-huelga-general-este-otono", "label": "UGT, 6 de octubre de 2026: acuerdo de huelga general de 24 horas"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a28", "label": "Constitución, artículo 28.2: derecho de huelga"}, {"href": "https://www.boe.es/buscar/doc.php?id=BOE-A-1977-6061", "label": "Real Decreto-ley 17/1977: preaviso de la huelga"}, {"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre"}], "related": [{"href": "/alquiler/propuestas-vivienda-6-octubre-2026", "label": "Propuestas de vivienda del 6 de octubre"}, {"href": "/elecciones/promesas/que-propone-cada-partido-vivienda", "label": "Vivienda: qué propone cada partido"}, {"href": "/elecciones/calendario-29-noviembre", "label": "Calendario completo del 29-N"}], "disclaimer": "No somos un sindicato ni la autoridad laboral. Esta ficha resume información publicada hasta el 18 de octubre de 2026. Los servicios mínimos los fija la Administración después del registro.", "faqs": [{"q": "¿Qué día es la huelga general?", "a": "El miércoles 11 de noviembre de 2026, 24 horas, según la información de RTVE del 7 de octubre. Es dos días antes del inicio de la campaña del 29-N."}, {"q": "¿Quién la convoca?", "a": "Según EFE, al registro del 19 de octubre acuden CCOO, UGT, CGT, CNT, Unión de Actores y Actrices, CO.BAS, Intersindical y la Confederación de Sindicatos de Inquilinas. RTVE añade que CIG, ELA y LAB presentan su propia convocatoria."}, {"q": "¿Habrá servicios mínimos?", "a": "Sí: tras el registro, la Administración fija los servicios mínimos. A 18 de octubre de 2026 todavía no se han publicado."}, {"q": "¿La huelga cambia el día de las elecciones?", "a": "No. El Real Decreto 806/2026 convoca las elecciones para el domingo 29 de noviembre de 2026. Una huelga no modifica ese real decreto."}], "sections": [{"id": "lo-que-se-sabe", "title": "Lo que se sabe a 18 de octubre", "paragraphs": ["RTVE informó el 7 de octubre de que CCOO y UGT, junto al Sindicato de Inquilinas, acordaban una huelga general de 24 horas el miércoles 11 de noviembre, por la vivienda y los salarios.", "EFE informó el 16 de octubre de que los secretarios generales de CCOO y UGT, Unai Sordo y Pepe Álvarez, registrarán la convocatoria en el Ministerio de Trabajo el lunes 19 de octubre. Según EFE, sería la primera huelga general de 24 horas convocada por CCOO y UGT desde 2012.", "El comunicado de UGT del 6 de octubre vinculaba la huelga a salarios con los que acceder a una vivienda y a un decálogo de vivienda: pacto de Estado, parque público, límite del precio del alquiler y aplicación de la Ley por el Derecho a la Vivienda."]}, {"id": "preaviso", "title": "El preaviso legal y los servicios mínimos", "paragraphs": ["El artículo 28.2 de la Constitución reconoce el derecho de huelga y remite a la ley las garantías para mantener los servicios esenciales.", "El artículo 3 del Real Decreto-ley 17/1977 exige comunicar la huelga por escrito al empresario y a la autoridad laboral con cinco días naturales de antelación como mínimo. El artículo 4 sube ese preaviso a diez días si afecta a servicios públicos.", "La sentencia del Tribunal Constitucional 11/1981 revisó partes de ese real decreto-ley. Esta página no organiza un paro ni sustituye al comité de huelga."]}, {"id": "elecciones", "title": "La huelga y las elecciones van por sitios distintos", "paragraphs": ["La campaña del 29-N va del 13 al 27 de noviembre. La huelga del 11 de noviembre cae antes y no mueve ninguna fecha electoral.", "El 11 de noviembre ya está en marcha el envío de la documentación del voto por correo (del 9 al 22 de noviembre, según la Junta Electoral Central). Si esperas ese envío, revisa los avisos de Correos esos días.", "La vivienda es también un tema de campaña: puedes comparar qué propone cada partido en la página de vivienda del 29-N."]}]},
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
      { href: "/elecciones/huelga-general-sindicatos", label: "Huelga general del 11 de noviembre" },
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
