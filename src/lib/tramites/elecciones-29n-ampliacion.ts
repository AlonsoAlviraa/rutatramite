import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Ampliación del 18-10-2026 de las guías prácticas del 29-N.
 * Solo añade secciones, preguntas y fuentes verificadas (LOREG, RD 806/2026, RD 605/1999,
 * calendario de la Junta Electoral Central, nota del INE e Infoelectoral). No sustituye el contenido base.
 */
const LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672";
const src = {
  rd: { href: "https://www.boe.es/eli/es/rd/2026/10/05/806", label: "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre" },
  jec: { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario electoral de las elecciones generales 2026" },
  ine: { href: "https://www.ine.es/dyngs/Prensa/EG2026.htm", label: "INE: nota de prensa de la Oficina del Censo Electoral para el 29 de noviembre" },
  votoInfo: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/preguntas-frecuentes/como-votar/voto-presencial-voto-en-mesa/", label: "Ministerio del Interior (Infoelectoral): voto presencial en la mesa" },
  rd605: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-8583", label: "BOE: Real Decreto 605/1999, artículo 13 y anexo de papeletas" },
  lo2026: { href: "https://www.boe.es/eli/es/lo/2026/06/30/2", label: "BOE: Ley Orgánica 2/2026, un senador para Ibiza y otro para Formentera" },
  loreg: (anchor: string, label: string) => ({ href: `${LOREG}#${anchor}`, label: `LOREG, ${label}` }),
};

type Ampliacion = {
  reviewedAt: string;
  sections: GuideSection[];
  faqs?: { q: string; a: string }[];
  sources?: { href: string; label: string }[];
};

const R18 = "2026-10-18";

export const AMPLIACION_29N: Record<string, Ampliacion> = {
  "/elecciones/miembro-de-mesa": {
    reviewedAt: R18,
    sources: [src.loreg("aveintiseis", "artículo 26: sorteo y requisitos"), src.loreg("aochenta", "artículo 80: constitución de la mesa a las 8:00"), src.loreg("acientocuarentaytres", "artículo 143: no acudir a la mesa")],
    sections: [
      {
        id: "quien-puede-tocar",
        title: "A quién le puede tocar",
        paragraphs: [
          "El sorteo es público y se hace entre todas las personas de la lista de electores de esa mesa que sepan leer y escribir y tengan menos de 70 años (artículo 26 de la LOREG).",
          "Para presidir hace falta el título de Bachiller o de FP de segundo grado o, en su defecto, el de Graduado Escolar o equivalente. Los vocales no necesitan título.",
          "Por cada puesto se sortean dos suplentes. Quien se presenta como candidato no puede formar parte de una mesa (artículo 27.1).",
        ],
      },
      {
        id: "dia-29-mesa",
        title: "Qué haces el 29 de noviembre",
        paragraphs: [],
        lists: [[
          "A las 8:00 te presentas en el local con los demás titulares y suplentes (artículo 80).",
          "La mesa no puede constituirse sin un presidente y dos vocales; si falta alguien, le sustituyen los suplentes en el orden que fija la ley.",
          "De 9:00 a 20:00 se vota. Si a las 20:00 queda gente dentro del local, puede votar.",
          "Después se cuentan los votos en público y se firman las actas.",
        ]],
      },
      {
        id: "si-no-vas",
        title: "Si no vas sin causa justificada",
        paragraphs: [
          "El artículo 143 de la LOREG castiga a quien deja de acudir o abandona la mesa sin causa legítima, o incumple sin causa justificada la obligación de excusarse o avisar, con prisión de tres meses a un año o multa de seis a veinticuatro meses.",
          "Por eso, si no puedes ir, alega a tiempo ante la Junta Electoral de Zona y guarda el justificante.",
        ],
      },
    ],
    faqs: [
      { q: "¿Qué pasa si no voy a la mesa?", a: "Si no acudes sin causa legítima, el artículo 143 de la LOREG prevé prisión de tres meses a un año o multa de seis a veinticuatro meses. Si tienes una causa, alégala ante la Junta Electoral de Zona." },
      { q: "¿A qué hora tengo que estar?", a: "A las 8:00 del 29 de noviembre de 2026, en el local de tu mesa, según el artículo 80 de la LOREG." },
    ],
  },

  "/elecciones/permiso-trabajo-para-votar": {
    reviewedAt: R18,
    sources: [src.rd605, src.loreg("aveintiocho", "artículo 28: permiso de los miembros de mesa")],
    sections: [
      {
        id: "que-dice-la-norma",
        title: "Qué dice la norma",
        paragraphs: [
          "El artículo 13 del Real Decreto 605/1999 dice que quien trabaja el día de las elecciones puede disponer, dentro de su horario laboral, de hasta cuatro horas libres para votar, y que esas horas son retribuidas.",
          "Si trabajas a jornada reducida, el permiso se reduce en proporción. Las medidas concretas las adopta la Administración laboral para cada elección.",
        ],
      },
      {
        id: "casos",
        title: "Casos frecuentes",
        paragraphs: [],
        lists: [[
          "Trabajas lejos de tu domicilio el 29: tienes hasta cuatro horas libres para pedir en persona el voto por correo y para enviarlo (artículo 13.2 del Real Decreto 605/1999).",
          "Te ha tocado mesa: permiso retribuido de jornada completa el día 29 si es laborable y cinco horas menos de jornada el lunes 30 (artículo 28 de la LOREG).",
          "Eres interventor acreditado: el mismo artículo 13 remite a la LOREG para darte permiso durante el día de la votación.",
          "Necesitas demostrar que has votado: pide el justificante en la mesa ese mismo día.",
        ]],
      },
      {
        id: "pasos-empresa",
        title: "Cómo organizarlo con tu empresa",
        paragraphs: [
          "Avisa con antelación de la hora a la que irás a votar y pide en la mesa el justificante. Las horas no se descuentan del salario.",
          "Si tu turno no coincide con el horario de votación (de 9:00 a 20:00), no hay horas que pedir: puedes votar fuera de tu jornada.",
        ],
      },
    ],
    faqs: [
      { q: "¿Me pueden descontar las horas del sueldo?", a: "No. El artículo 13 del Real Decreto 605/1999 dice que las horas libres para votar son retribuidas." },
    ],
  },

  "/elecciones/que-llevar-a-votar": {
    reviewedAt: R18,
    sources: [src.votoInfo],
    sections: [
      {
        id: "lo-que-acepta-la-mesa",
        title: "Lo que acepta la mesa, según Interior",
        paragraphs: [
          "Infoelectoral enumera el DNI, el pasaporte con fotografía y el permiso de conducir con fotografía. Pueden estar caducados, pero tienen que ser originales.",
          "No sirve el resguardo del DNI en trámite, porque no lleva tu fotografía. Tampoco valen fotocopias.",
        ],
      },
      {
        id: "si-hay-dudas",
        title: "Si la mesa duda de tu identidad",
        paragraphs: [
          "El artículo 85.4 de la LOREG dice que, si la mesa duda de la identidad de quien vota, decide por mayoría a la vista de los documentos y de lo que digan los electores presentes.",
          "Lo práctico es llevar un documento con una foto en la que se te reconozca bien.",
        ],
      },
      {
        id: "que-no-hace-falta",
        title: "Lo que no hace falta llevar",
        paragraphs: [],
        lists: [[
          "La tarjeta censal: solo te informa de tu mesa.",
          "Las papeletas: las tienes en el colegio. Puedes llevarlas de casa si te las han enviado.",
          "Un certificado de empadronamiento: votas porque estás en el censo, no por el padrón.",
        ]],
      },
    ],
    faqs: [
      { q: "¿Vale el DNI caducado?", a: "Sí. Infoelectoral indica que no importa que el documento esté caducado, siempre que sea el original y lleve tu fotografía." },
      { q: "¿Vale el resguardo del DNI?", a: "No. Infoelectoral explica que el resguardo del DNI en trámite no sirve porque no aparece tu fotografía." },
    ],
  },

  "/elecciones/donde-voto-mesa-electoral": {
    reviewedAt: R18,
    sources: [src.votoInfo],
    sections: [
      {
        id: "tres-formas",
        title: "Tres formas de saber dónde votas",
        paragraphs: [],
        lists: [[
          "La tarjeta censal: el INE la envía a partir del 2 de noviembre de 2026 con tu sección, tu mesa y el local.",
          "La consulta de locales y mesas en la web del INE: según Infoelectoral, no hace falta certificado digital.",
          "Tus datos individuales en la sede del INE: aquí sí necesitas certificado digital, Cl@ve o DNI electrónico.",
        ]],
      },
      {
        id: "telefono-oce",
        title: "Si no te llega la tarjeta o hay un error",
        paragraphs: [
          "La tarjeta censal no es necesaria para votar. Si no te llega, consulta tu mesa por internet o llama a la Oficina del Censo Electoral: el INE indica el teléfono 900 343 232.",
          "Si la tarjeta muestra un domicilio antiguo, lee la guía de cambio de domicilio: en las generales, un traslado a otra provincia después del cierre del censo no cambia tu mesa.",
        ],
      },
    ],
    faqs: [
      { q: "¿Hay un teléfono para preguntar por mi mesa?", a: "Sí. Según la nota del INE, las delegaciones provinciales de la Oficina del Censo Electoral atienden consultas en el 900 343 232." },
    ],
  },

  "/elecciones/cambio-de-domicilio-y-censo": {
    reviewedAt: R18,
    sources: [src.jec],
    sections: [
      {
        id: "regla",
        title: "La regla del cierre del censo",
        paragraphs: [
          "El artículo 39.1 de la LOREG dice que el censo vigente es el cerrado el día 1 del segundo mes anterior a la convocatoria. La convocatoria es de octubre de 2026, así que el cierre es el 1 de agosto de 2026.",
          "El artículo 39.3 añade que no se atienden los cambios de residencia de una circunscripción a otra hechos después de esa fecha: votas en la sección de tu domicilio anterior.",
          "Los cambios de domicilio dentro de la misma circunscripción se reclaman en el plazo de consulta del censo, del 12 al 19 de octubre.",
        ],
      },
      {
        id: "opciones",
        title: "Tus opciones si ya no vives allí",
        paragraphs: [],
        lists: [[
          "Votar en persona el 29 de noviembre en tu mesa antigua, de 9:00 a 20:00.",
          "Pedir el voto por correo hasta el 19 de noviembre e indicar tu dirección actual para recibir la documentación.",
          "Si estás fuera de España una temporada, pedir el voto como temporalmente ausente (ERTA) hasta el 31 de octubre.",
        ]],
      },
    ],
    faqs: [
      { q: "Me mudé a otra provincia en septiembre, ¿dónde voto?", a: "En tu sección anterior. El artículo 39.3 de la LOREG no tiene en cuenta los cambios entre circunscripciones posteriores al cierre del censo, que para esta convocatoria es el 1 de agosto de 2026. Puedes votar por correo desde tu nueva dirección." },
    ],
  },

  "/elecciones/como-se-reparten-los-escanos": {
    reviewedAt: R18,
    sources: [src.loreg("acientosesentaydos", "artículo 162: 350 diputados y mínimo por provincia"), src.loreg("anoventayseis", "artículo 96: voto en blanco y nulo")],
    sections: [
      {
        id: "ejemplo-loreg",
        title: "El ejemplo oficial de la ley",
        paragraphs: [
          "El propio artículo 163 de la LOREG trae un ejemplo: 480.000 votos válidos en una circunscripción que elige ocho diputados, repartidos entre seis candidaturas. Los ocho cocientes más altos son 168.000, 104.000, 84.000, 72.000, 64.000, 56.000, 52.000 y 42.000.",
        ],
        table: {
          caption: "Ejemplo del artículo 163 de la LOREG: 8 escaños",
          head: ["Candidatura", "Votos", "Cocientes que obtienen escaño", "Escaños"],
          rows: [
            { cells: ["A", "168.000", "168.000, 84.000, 56.000 y 42.000", "4"], source: src.loreg("acientosesentaytres", "artículo 163") },
            { cells: ["B", "104.000", "104.000 y 52.000", "2"], source: src.loreg("acientosesentaytres", "artículo 163") },
            { cells: ["C", "72.000", "72.000", "1"], source: src.loreg("acientosesentaytres", "artículo 163") },
            { cells: ["D", "64.000", "64.000", "1"], source: src.loreg("acientosesentaytres", "artículo 163") },
            { cells: ["E", "40.000", "Ninguno (su mayor cociente no está entre los 8 primeros)", "0"], source: src.loreg("acientosesentaytres", "artículo 163") },
            { cells: ["F", "32.000", "Ninguno", "0"], source: src.loreg("acientosesentaytres", "artículo 163") },
          ],
        },
      },
      {
        id: "reglas",
        title: "Las reglas que conviene saber",
        paragraphs: [],
        lists: [[
          "El Congreso tiene 350 diputados. Cada provincia parte de un mínimo de dos; Ceuta y Melilla eligen uno cada una (artículo 162).",
          "Solo entran en el reparto las candidaturas con al menos el 3 % de los votos válidos de la circunscripción (artículo 163.1.a).",
          "El voto en blanco es válido (artículo 96.5), así que cuenta para calcular ese 3 %. El voto nulo no cuenta.",
          "Si dos cocientes empatan, el escaño va a la candidatura con más votos totales; si también empatan, se sortea (artículo 163.1.d).",
        ]],
      },
      {
        id: "por-provincia",
        title: "Por qué el resultado cambia según la provincia",
        paragraphs: [
          "El reparto se hace provincia a provincia. Con pocos escaños (Soria elige 2), una candidatura necesita un porcentaje alto para entrar. Con muchos (Madrid elige 38), entran más candidaturas.",
          "Esta guía explica el método. No hace previsiones ni simula resultados de ningún partido.",
        ],
      },
    ],
    faqs: [
      { q: "¿El voto en blanco favorece a algún partido?", a: "La ley solo dice que el voto en blanco es válido (artículo 96.5) y que el umbral del 3 % se calcula sobre los votos válidos (artículo 163). Así, el voto en blanco sube el número de votos necesario para llegar al 3 %." },
    ],
  },

  "/elecciones/como-votar-al-senado": {
    reviewedAt: R18,
    sources: [src.loreg("acientosesentaycinco", "artículo 165: senadores por circunscripción"), src.loreg("anoventayseis", "artículo 96.3: nulidad por exceso de marcas"), src.lo2026, src.rd605],
    sections: [
      {
        id: "cuantas-cruces",
        title: "Cuántas cruces puedes poner en tu territorio",
        paragraphs: ["Según el artículo 3 del Real Decreto 806/2026 y el artículo 166 de la LOREG."],
        table: {
          caption: "Senadores que se eligen y cruces máximas por circunscripción (29-N)",
          head: ["Circunscripción", "Senadores", "Cruces máximas"],
          rows: [
            { cells: ["Cada provincia peninsular, Asturias, Cantabria, Murcia, Navarra y La Rioja incluidas", "4", "3"], source: src.rd },
            { cells: ["Gran Canaria, Mallorca y Tenerife", "3", "2"], source: src.rd },
            { cells: ["Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote y La Palma", "1", "1"], source: src.rd },
            { cells: ["Ceuta y Melilla", "2", "2"], source: src.rd },
          ],
        },
      },
      {
        id: "novedad-2026",
        title: "Novedad de 2026: Ibiza y Formentera, por separado",
        paragraphs: [
          "La Ley Orgánica 2/2026, de 30 de junio, adaptó la LOREG a la reforma del artículo 69.3 de la Constitución: Ibiza y Formentera eligen ahora un senador cada una. Antes compartían uno.",
          "Con el reparto del Real Decreto 806/2026 se eligen directamente 209 senadores: 188 en las 47 provincias que eligen cuatro, 17 en las islas y 4 en Ceuta y Melilla. Los parlamentos autonómicos designan el resto (artículo 165.4 de la LOREG).",
        ],
      },
      {
        id: "papeleta-sepia",
        title: "La papeleta del Senado",
        paragraphs: [
          "Es de color sepia, según el anexo del Real Decreto 605/1999, y la del Congreso es blanca. En la del Senado aparecen los candidatos agrupados por partido, con una casilla para cada uno.",
          "Puedes marcar candidatos de partidos distintos. Si marcas más de los permitidos, el voto es nulo (artículo 96.3). Si no marcas a nadie, es voto en blanco (artículo 96.5).",
        ],
      },
    ],
    faqs: [
      { q: "¿Puedo votar a senadores de partidos distintos?", a: "Sí. Es una lista abierta: puedes repartir tus cruces entre candidatos de distintas candidaturas, siempre que no superes el máximo de tu circunscripción." },
      { q: "¿Cuántos senadores elige Ibiza?", a: "Uno. Desde la Ley Orgánica 2/2026, Ibiza y Formentera eligen un senador cada una; el Real Decreto 806/2026 ya lo aplica." },
    ],
  },

  "/elecciones/votar-por-primera-vez": {
    reviewedAt: R18,
    sources: [src.ine, src.loreg("aochentaycinco", "artículo 85.2: mayores de edad en la fecha de la votación"), src.rd605],
    sections: [
      {
        id: "cuantos",
        title: "No eres el único: 1,6 millones de primeros votantes",
        paragraphs: [
          "Según el INE, 1.615.127 electores residentes en España votan por primera vez en unas generales, porque han cumplido 18 años desde las de julio de 2023.",
          "El artículo 85.2 de la LOREG dice que las listas de la mesa incluyen a quienes son mayores de edad en la fecha de la votación. Si cumples 18 años el mismo 29 de noviembre, puedes votar.",
        ],
      },
      {
        id: "dos-papeletas",
        title: "Dos papeletas, dos sobres",
        paragraphs: [],
        lists: [[
          "Congreso: papeleta blanca con una lista cerrada. Eliges una candidatura y la metes, sin tachar ni añadir nada, en su sobre.",
          "Senado: papeleta sepia con lista abierta. Marcas con una cruz hasta tres candidatos en una provincia, aunque sean de partidos distintos.",
          "Si tachas nombres o escribes algo en la papeleta del Congreso, el voto es nulo (artículo 96.2 de la LOREG).",
          "Un sobre sin papeleta es voto en blanco, que es válido.",
        ]],
      },
      {
        id: "paso-a-paso",
        title: "En el colegio, paso a paso",
        paragraphs: [],
        lists: [[
          "Busca tu mesa con la tarjeta censal o en la web del INE.",
          "Coge las papeletas y los sobres; usa la cabina si quieres intimidad.",
          "Da tu nombre y enseña el DNI, pasaporte o carné de conducir original.",
          "Entrega los sobres cerrados al presidente; él los introduce en las urnas.",
        ]],
      },
    ],
    faqs: [
      { q: "Cumplo 18 años el 29 de noviembre, ¿puedo votar?", a: "Sí. El artículo 85.2 de la LOREG incluye en las listas a los mayores de edad en la fecha de la votación." },
      { q: "¿Puedo votar por correo si estudio fuera?", a: "Sí. Pide el voto por correo en Correos hasta el 19 de noviembre de 2026 e indica la dirección donde estés." },
    ],
  },
};

function mergeSources(a: Guide["sources"] = [], b: Guide["sources"] = []) {
  const seen = new Set(a.map((s) => s.href));
  return [...a, ...b.filter((s) => !seen.has(s.href) && seen.add(s.href))];
}

export function ampliar29n(g: Guide): Guide {
  const x = AMPLIACION_29N[g.path];
  if (!x) return g;
  return {
    ...g,
    reviewedAt: x.reviewedAt,
    sections: [...g.sections, ...x.sections],
    faqs: [...(g.faqs ?? []), ...(x.faqs ?? [])],
    sources: mergeSources(g.sources, x.sources),
  };
}
