import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Mejoras del 24-10-2026 (auditoría SEO/GEO, páginas flojas). Solo AÑADE secciones, preguntas y fuentes
 * verificadas el 24-10-2026 en el BOE (LOREG, Constitución, RDL 29/2026) y en fuentes oficiales. No sustituye
 * el contenido base, no cambia URL ni title.
 */
const LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672";
const CE = "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229";
const loreg = (anchor: string, label: string) => ({ href: `${LOREG}#${anchor}`, label: `BOE: LOREG, ${label}` });
const ce = (anchor: string, label: string) => ({ href: `${CE}#${anchor}`, label: `BOE: Constitución, ${label}` });
const RDL29 = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823", label: "BOE: Real Decreto-ley 29/2026, de 6 de octubre (texto consolidado)" };

type Sec = Omit<GuideSection, "table"> & { table?: { caption: string; head: string[]; rows: { cells: string[] }[] } };
type Mejora = { reviewedAt: string; sections: Sec[]; faqs?: { q: string; a: string }[]; sources?: { href: string; label: string }[] };
const R = "2026-10-24";

export const MEJORAS_20261024: Record<string, Mejora> = {
  "/elecciones/jornada-de-reflexion": {
    reviewedAt: R,
    sources: [loreg("acincuentaytres", "artículo 53: prohibición de campaña"), loreg("asesentaynueve", "artículo 69.7: sondeos"), loreg("acincuenta", "artículo 50: campaña institucional")],
    sections: [
      {
        id: "que-prohibe",
        title: "Qué está prohibido y qué no el sábado 28",
        paragraphs: [
          "El artículo 53 de la LOREG dice que no puede difundirse propaganda electoral ni hacerse ningún acto de campaña una vez que la campaña ha terminado legalmente. Para el 29-N eso cubre el sábado 28 de noviembre y el propio domingo de votación.",
          "La misma norma aclara que esa limitación no impide la actividad ordinaria de los partidos ni la libertad de expresión del artículo 20 de la Constitución. Lo que se prohíbe es la campaña: mítines, reparto de propaganda, anuncios o peticiones expresas de voto.",
          "Además, durante los cinco días anteriores a la votación (del 24 al 28 de noviembre) no se pueden publicar ni difundir sondeos electorales por ningún medio (artículo 69.7).",
        ],
        lists: [[
          "Prohibido: mítines, actos de campaña, buzoneo y publicidad electoral de partidos y candidaturas.",
          "Prohibido del 24 al 28: publicar o difundir encuestas de intención de voto.",
          "Permitido: hablar de política, informar como medio de comunicación y la actividad interna de los partidos.",
          "Si ves un posible incumplimiento: la competente es la Junta Electoral de Zona o la Provincial; las denuncias las resuelve la Administración electoral, no la policía local.",
        ]],
      },
    ],
    faqs: [
      { q: "¿Existe la jornada de reflexión en la ley?", a: "La LOREG no usa esa expresión: lo que establece es que la campaña dura 15 días y termina a las cero horas del día anterior a la votación, y que después no puede haber propaganda ni actos de campaña (artículos 51 y 53). Por eso el sábado 28 de noviembre funciona como jornada de reflexión." },
      { q: "¿Puede el Gobierno hacer anuncios ese día?", a: "Solo la campaña institucional que informa de la fecha de votación, cómo votar y el voto por correo, sin influir en el voto (artículo 50 de la LOREG)." },
    ],
  },
  "/elecciones/encuestas-prohibidas": {
    reviewedAt: R,
    sources: [loreg("asesentaynueve", "artículo 69 completo")],
    sections: [
      {
        id: "requisitos",
        title: "Qué tiene que incluir toda encuesta publicada antes del 24",
        paragraphs: [
          "Desde la convocatoria hasta la votación, el artículo 69 de la LOREG obliga a que cualquier sondeo publicado indique quién lo ha hecho y quién lo ha encargado, sus características técnicas y las preguntas. Es una forma rápida de distinguir una encuesta real de un bulo.",
          "La Junta Electoral Central vigila que los datos publicados no contengan falsificaciones, ocultaciones o modificaciones deliberadas y que se respete la prohibición de los cinco últimos días.",
        ],
        lists: [[
          "Entidad que lo ha hecho y quién lo ha encargado, con su domicilio.",
          "Sistema de muestreo, tamaño de la muestra, margen de error, nivel de representatividad y procedimiento de selección.",
          "Fechas del trabajo de campo.",
          "Texto íntegro de las preguntas y cuántas personas no contestaron a cada una.",
        ]],
      },
      {
        id: "organismos-publicos",
        title: "Encuestas de organismos públicos (como el CIS)",
        paragraphs: [
          "Si un organismo público hace encuestas de intención de voto en periodo electoral, los partidos que concurren pueden pedir los resultados y deben recibirlos en 48 horas (artículo 69.8). La prohibición del 24 al 28 de noviembre también les afecta: tampoco se pueden publicar en esos días.",
        ],
      },
    ],
    faqs: [
      { q: "¿Una encuesta sin ficha técnica es válida?", a: "Si se publica durante el periodo electoral, debe llevar la ficha técnica que exige el artículo 69.1 de la LOREG. Si no la lleva, desconfía y comprueba la fuente original." },
      { q: "¿Puedo compartir en redes una encuesta el 26 de noviembre?", a: "La prohibición del artículo 69.7 alcanza la publicación, difusión o reproducción de sondeos por cualquier medio de comunicación durante los cinco días anteriores. En caso de duda, no la difundas." },
    ],
  },
  "/elecciones/junta-electoral-central": {
    reviewedAt: R,
    sources: [loreg("anoveno", "artículo 9: composición de la Junta Electoral Central")],
    sections: [
      {
        id: "composicion",
        title: "Quién la forma",
        paragraphs: [
          "Según el artículo 9 de la LOREG, la Junta Electoral Central es un órgano permanente con 13 vocales: 8 magistrados del Tribunal Supremo, elegidos por sorteo (insaculación) por el Consejo General del Poder Judicial, y 5 catedráticos en activo de Derecho, Ciencias Políticas o Sociología, propuestos conjuntamente por los partidos con representación en el Congreso.",
          "Los vocales se nombran por real decreto tras cada nueva legislatura y eligen entre los magistrados al presidente y al vicepresidente.",
        ],
      },
      {
        id: "que-hace-29n",
        title: "Qué hace en estas elecciones",
        paragraphs: ["En el proceso del 29-N la Junta Electoral Central:"],
        lists: [[
          "Publica el calendario electoral oficial (sorteo de mesas del 31 de octubre al 4 de noviembre, campaña del 13 al 27 de noviembre, escrutinio general del 4 al 7 de diciembre).",
          "Dicta instrucciones que obligan a las juntas provinciales y de zona.",
          "Resuelve consultas y recursos contra decisiones de las juntas inferiores.",
          "Vigila el cumplimiento de las normas sobre encuestas y campaña (artículo 69).",
        ]],
      },
      {
        id: "a-quien-acudir",
        title: "A quién acudir según tu problema",
        paragraphs: [],
        lists: [[
          "Excusa para no ir a la mesa electoral: Junta Electoral de Zona.",
          "Incidencia en tu mesa el día 29: Presidente de la mesa y, después, Junta Electoral de Zona.",
          "Recurso contra una decisión de una junta de zona o provincial: Junta Electoral Provincial o Central, según el caso.",
          "Datos del censo o tarjeta censal: Oficina del Censo Electoral (INE), no la Junta.",
        ]],
      },
    ],
    faqs: [{ q: "¿La Junta Electoral Central depende del Gobierno?", a: "No. Es un órgano permanente formado por 8 magistrados del Tribunal Supremo y 5 catedráticos (artículo 9 de la LOREG)." }],
  },
  "/elecciones/interventores-y-apoderados": {
    reviewedAt: R,
    sources: [loreg("asetentayseis", "artículo 76: apoderados"), loreg("asetentayocho", "artículo 78: interventores")],
    sections: [
      {
        id: "como-se-nombran",
        title: "Cómo se nombra a cada uno",
        paragraphs: [
          "Apoderado: el representante de la candidatura le da un poder ante notario o ante el secretario de la Junta Electoral Provincial o de Zona, que expide la credencial. Puede ser cualquier ciudadano mayor de edad en pleno uso de sus derechos (artículo 76).",
          "Interventor: el representante de la candidatura puede nombrar hasta dos por mesa, como tarde tres días antes de la votación (el 26 de noviembre de 2026), con credenciales talonarias que se remiten a la Junta de Zona (artículo 78).",
        ],
      },
      {
        id: "derechos",
        title: "Qué pueden hacer el día 29",
        paragraphs: [],
        lists: [[
          "Apoderados: entrar libremente en los locales, observar la votación y el escrutinio, presentar reclamaciones y protestas y pedir certificaciones (artículo 77).",
          "Un apoderado puede hacer de interventor en una mesa si su candidatura no tiene allí interventor (artículo 79.4).",
          "Interventores: votan en la mesa en la que están acreditados; si no están inscritos en esa circunscripción, deben votar por correo (artículo 79.1).",
          "Los apoderados que trabajan por cuenta ajena o son funcionarios tienen derecho a un permiso retribuido el día de la votación (artículo 76.4).",
          "Tienen que llevar la credencial y el DNI para enseñarlos a la mesa (artículo 76.3).",
        ]],
      },
    ],
    faqs: [{ q: "¿Hasta cuándo se pueden nombrar interventores para el 29-N?", a: "Hasta tres días antes de la elección, es decir, hasta el 26 de noviembre de 2026 (artículo 78.1 de la LOREG)." }],
  },
  "/elecciones/resultados-y-escrutinio": {
    reviewedAt: R,
    sources: [loreg("anoventaycinco", "artículo 95: escrutinio público"), loreg("anoventayseis", "artículo 96: votos nulos y en blanco"), loreg("aciento", "artículo 100: documentación de la mesa")],
    sections: [
      {
        id: "recuento-mesa",
        title: "Cómo se cuenta en tu mesa",
        paragraphs: [
          "Al cerrar la votación empieza el escrutinio, que es público: cualquiera puede presenciarlo y no se suspende salvo fuerza mayor (artículo 95). El presidente saca los sobres uno a uno y lee en voz alta la candidatura votada. Primero se cuentan las papeletas del Congreso y después las del Senado.",
          "Los votos nulos (papeleta no oficial, varias de distintas candidaturas, tachaduras o añadidos) y en blanco (sobre vacío en el Congreso) se cuentan aparte según el artículo 96. Después la mesa prepara tres sobres con el acta y la documentación (artículo 100), que van al juzgado y a la Junta Electoral.",
        ],
      },
      {
        id: "provisional-oficial",
        title: "Resultado provisional y resultado oficial",
        paragraphs: [],
        lists: [[
          "Quién lo da: provisional, Ministerio del Interior; oficial, Juntas Electorales Provinciales.",
          "Cuándo: provisional, Noche del 29 de noviembre; oficial, Escrutinio general del 4 al 7 de diciembre de 2026.",
          "Valor jurídico: provisional, Informativo; oficial, Proclamación de electos.",
        ]],
      },
    ],
    faqs: [{ q: "¿Puedo ir a ver el recuento de mi mesa?", a: "Sí. El escrutinio es público según el artículo 95 de la LOREG. El presidente puede expulsar a quien lo perturbe." }],
  },
  "/elecciones/voto-nulo-y-voto-en-blanco": {
    reviewedAt: R,
    sources: [loreg("anoventayseis", "artículo 96 completo")],
    sections: [
      {
        id: "senado",
        title: "El caso del Senado",
        paragraphs: [
          "En el Senado se marca a los candidatos con una cruz. El artículo 96.3 de la LOREG anula la papeleta si marcas más nombres de los permitidos: más de 3 en las provincias, más de 2 en Gran Canaria, Mallorca, Tenerife, Ceuta y Melilla, y más de 1 en el resto de islas.",
          "Una papeleta del Senado sin ninguna cruz cuenta como voto en blanco.",
        ],
        lists: [[
          "Sobre vacío en el Congreso: voto en blanco, válido.",
          "Dos papeletas iguales en el mismo sobre: un voto válido.",
          "Dos papeletas de candidaturas distintas: voto nulo.",
          "Papeleta con nombres tachados, añadidos o con mensajes: voto nulo.",
          "Sobre alterado: voto nulo (artículo 96.4).",
        ]],
      },
    ],
    faqs: [{ q: "¿Cuántas cruces puedo poner en el Senado?", a: "Hasta 3 en las provincias, 2 en Gran Canaria, Mallorca, Tenerife, Ceuta y Melilla, y 1 en las demás islas. Más cruces hacen el voto nulo (artículo 96.3 de la LOREG)." }],
  },
  "/elecciones/extranjeros-pueden-votar-generales": {
    reviewedAt: R,
    sources: [ce("a13", "artículo 13.2"), loreg("asegundo", "artículo 2: derecho de sufragio")],
    sections: [
      {
        id: "base-legal",
        title: "Qué dicen la Constitución y la LOREG",
        paragraphs: [
          "El artículo 13.2 de la Constitución reserva a los españoles los derechos de participación política del artículo 23, con una única excepción: el voto (y la candidatura) en las elecciones municipales cuando lo prevea un tratado o una ley por reciprocidad.",
          "El artículo 2 de la LOREG concreta que el derecho de sufragio corresponde a los españoles mayores de edad inscritos en el censo electoral vigente. Por eso, en unas generales como las del 29 de noviembre, el voto exige la nacionalidad española.",
        ],
      },
      {
        id: "casos",
        title: "Casos habituales",
        paragraphs: [],
        lists: [[
          "Ciudadano de otro país de la UE residente en España: vota en municipales (y europeas), no en generales.",
          "Extranjero de un país con tratado de reciprocidad: vota en municipales si se inscribe en el censo; no en generales.",
          "Has obtenido la nacionalidad española: votas si estás en el censo cerrado para esta elección. Si te nacionalizaste hace muy poco, comprueba tu inscripción en la sede del INE.",
          "Español que vive fuera: vota desde el extranjero como residente ausente (CERA).",
        ]],
      },
    ],
    faqs: [{ q: "Me han dado la nacionalidad este mes, ¿puedo votar el 29-N?", a: "Depende de que figures en el censo electoral cerrado para esta elección. Compruébalo en la sede electrónica del INE con tu DNI." }],
  },
  "/elecciones/que-llevar-a-votar": {
    reviewedAt: R,
    sources: [loreg("aochentaycinco", "artículo 85 completo")],
    sections: [
      {
        id: "dudas-mesa",
        title: "Si la mesa duda de tu identidad",
        paragraphs: [
          "El artículo 85.4 de la LOREG prevé que, si la mesa tiene dudas sobre la identidad de quien se presenta a votar (por sí misma o porque lo reclama un interventor, un apoderado u otro elector), decide por mayoría a la vista de los documentos y del testimonio de los electores presentes.",
          "Los extranjeros no votan en generales, pero en las elecciones en las que sí votan pueden identificarse además con la tarjeta de residencia (artículo 85.1).",
        ],
        lists: [[
          "Lleva el original: DNI, pasaporte o permiso de conducir con foto.",
          "La tarjeta censal ayuda a encontrar tu mesa, pero no es obligatoria.",
          "Si votas por correo, el documento lo enseñas en Correos al pedir y recoger el voto, no en la mesa.",
          "Si te llevas papeletas de casa, que sean oficiales: otra papeleta anula el voto (artículo 96.1).",
        ]],
      },
    ],
    faqs: [{ q: "¿Y si no estoy en la lista de la mesa pero tengo una sentencia?", a: "El artículo 85.3 de la LOREG permite votar a quien acredite con sentencia judicial su derecho a estar inscrito en el censo de esa sección." }],
  },
  "/elecciones/dni-caducado-votar": {
    reviewedAt: R,
    sources: [loreg("aochentaycinco", "artículo 85.1: documentos para identificarse")],
    sections: [
      {
        id: "comparativa",
        title: "Qué documento vale en cada situación",
        paragraphs: ["El artículo 85.1 de la LOREG exige identificarte con DNI, pasaporte o permiso de conducir en el que aparezca tu fotografía."],
        lists: [[
          "DNI original caducado: sí, según el Ministerio del Interior.",
          "Pasaporte o carné de conducir con foto: sí.",
          "Fotocopia del DNI: no.",
          "Resguardo de solicitud del DNI: no.",
          "Tarjeta censal sola: no, porque no identifica.",
        ]],
      },
      {
        id: "renovar",
        title: "Si quieres renovarlo antes del 29",
        paragraphs: ["No hace falta para votar. Si aun así quieres renovarlo, la cita es gratuita y el precio de expedición es de 12 € (ver la guía del DNI)."],
      },
    ],
    faqs: [{ q: "¿Vale el DNI caducado para votar por correo?", a: "Para pedir el voto por correo en Correos hay que enseñar el DNI original (artículo 72 de la LOREG); no se admite fotocopia. Si tienes dudas sobre uno caducado, pregunta en la oficina de Correos antes de ir." }],
  },
  "/elecciones/votar-en-persona-tras-pedir-correo": {
    reviewedAt: R,
    sources: [loreg("asetentaydos", "artículo 72: solicitud del voto por correo"), loreg("asetentaytres", "artículo 73: envío de la documentación")],
    sections: [
      {
        id: "por-que",
        title: "Por qué no puedes votar en la mesa",
        paragraphs: [
          "Cuando pides el voto por correo, la Delegación Provincial de la Oficina del Censo Electoral anota tu solicitud en el censo «a fin de que el día de las elecciones no se realice el voto personalmente» (artículo 73.1 de la LOREG). Así se evita que nadie vote dos veces.",
          "Después te envía por correo certificado las papeletas, los sobres y el certificado de inscripción. El aviso de recibo tienes que firmarlo tú, enseñando tu identificación; si no estás en casa, te dejan aviso para recogerlo en la oficina de Correos (artículo 73.2).",
        ],
        lists: [[
          "Pedido y no recibido: reclama a la Oficina del Censo Electoral de tu provincia.",
          "Recibido y no enviado a tiempo: no podrás votar en la mesa; el plazo de envío lo marca el calendario de la Junta Electoral Central.",
          "Enfermedad que te impide ir a Correos: otra persona puede pedirlo por ti con certificado médico oficial y poder notarial o consular (artículo 72.c).",
        ]],
      },
    ],
    faqs: [{ q: "¿Me anotan en la lista de la mesa como que voto por correo?", a: "Sí. La Oficina del Censo hace la anotación en el censo para que no votes personalmente (artículo 73.1 de la LOREG)." }],
  },
  "/elecciones/como-se-elige-presidente-gobierno": {
    reviewedAt: R,
    sources: [ce("a99", "artículo 99: investidura"), ce("a68", "artículo 68: Congreso")],
    sections: [
      {
        id: "paso-a-paso",
        title: "El procedimiento del artículo 99, paso a paso",
        paragraphs: [],
        lists: [[
          "Se constituyen las Cortes: el 23 de diciembre de 2026, según el Real Decreto 806/2026.",
          "El Rey consulta a los representantes de los grupos políticos con representación y, a través de la presidencia del Congreso, propone un candidato.",
          "El candidato expone su programa y pide la confianza de la Cámara.",
          "Primera votación: necesita mayoría absoluta, 176 de 350 diputados.",
          "Si no la consigue, segunda votación 48 horas después: basta mayoría simple (más síes que noes).",
          "Si tampoco, se pueden tramitar nuevas propuestas. Si en dos meses desde la primera votación nadie es investido, el Rey disuelve las Cortes y convoca nuevas elecciones.",
        ]],
      },
      {
        id: "que-votas",
        title: "Qué votas tú el 29-N",
        paragraphs: [
          "Votas una lista de diputados de tu provincia (la circunscripción es la provincia; Ceuta y Melilla eligen un diputado cada una, artículo 68 de la Constitución) y, en otra papeleta, senadores. El nombre del candidato a presidente solo aparece en la papeleta de la provincia por la que se presenta.",
        ],
      },
    ],
    faqs: [
      { q: "¿Cuántos votos necesita un candidato para ser presidente?", a: "176 síes en la primera votación o, 48 horas después, más síes que noes (artículo 99.3 de la Constitución)." },
      { q: "¿Qué pasa si nadie consigue la investidura?", a: "Si en dos meses desde la primera votación ningún candidato obtiene la confianza, se disuelven las Cortes y se convocan nuevas elecciones (artículo 99.5)." },
    ],
  },
  "/elecciones/deduccion-alquiler-10-por-ciento": {
    reviewedAt: R,
    sources: [RDL29],
    sections: [
      {
        id: "letra-boe",
        title: "Lo que dice el BOE: límites y requisitos",
        paragraphs: [
          "El Real Decreto-ley 29/2026 (BOE de 7 de octubre de 2026, en vigor desde el 8) crea una deducción estatal del 10 % de lo pagado por el alquiler de la vivienda habitual para contribuyentes con base imponible inferior a 33.007,20 €.",
          "La base máxima es de 11.630 € al año si tu base imponible no pasa de 23.007,20 €, así que la deducción máxima es de 1.163 €. Entre 23.007,20 € y 33.007,20 €, esa base máxima baja: se le resta 1,163 por cada euro que superas los 23.007,20 €.",
          "Durante al menos la mitad del año, ni tú ni tu unidad familiar podéis ser propietarios ni tener un derecho de uso sobre otra vivienda a menos de 50 km de la alquilada, salvo resolución que impida usarla.",
        ],
        table: {
          caption: "Ejemplos de deducción con el Real Decreto-ley 29/2026",
          head: ["Base imponible", "Alquiler al año", "Deducción"],
          rows: [
            { cells: ["20.000 €", "7.200 € (600 €/mes)", "720 €"] },
            { cells: ["20.000 €", "13.200 € (1.100 €/mes)", "1.163 € (tope)"] },
            { cells: ["28.000 €", "9.600 € (800 €/mes)", "582 € (base máxima 5.823 €)"] },
          ],
        },
      },
      {
        id: "convalidacion",
        title: "Pendiente de convalidación",
        paragraphs: ["Un real decreto-ley tiene que convalidarlo el Congreso (con las Cortes disueltas, la Diputación Permanente) en los 30 días siguientes (artículo 86 de la Constitución). A 24 de octubre de 2026 esa votación no se ha celebrado. Si no se convalida, deja de aplicarse."],
      },
    ],
    faqs: [{ q: "¿Cuánto es lo máximo que me puedo deducir?", a: "1.163 € al año: el 10 % de una base máxima de 11.630 €, si tu base imponible no supera 23.007,20 € (Real Decreto-ley 29/2026)." }],
  },
  "/elecciones/prorroga-alquiler-dos-anos": {
    reviewedAt: R,
    sources: [RDL29, { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1994-26003", label: "BOE: Ley 29/1994 de Arrendamientos Urbanos" }],
    sections: [
      {
        id: "letra-boe",
        title: "Lo que dice el BOE (disposición final quinta)",
        paragraphs: [
          "La prórroga está en la disposición final quinta del Real Decreto-ley 29/2026, en vigor desde el 8 de octubre de 2026. Afecta a contratos de vivienda habitual vigentes en esa fecha cuya prórroga obligatoria (artículo 9.1 de la LAU), prórroga tácita (artículos 10.1 y 10.2) o tácita reconducción termine antes del 31 de diciembre de 2028.",
          "La pide el inquilino. Se concede por años, hasta 2 adicionales, manteniendo las condiciones del contrato. El casero tiene que aceptarla salvo que pactéis otras condiciones, firméis un contrato nuevo o haya comunicado en plazo que necesita la vivienda para él o su familia (artículo 9.3 de la LAU).",
        ],
        lists: [[
          "Estar al corriente del pago y haberlo estado cada mes durante los 8 meses anteriores.",
          "Pedirla por escrito y guardar la prueba del envío.",
          "Si ya tienes la prórroga del artículo 10.3 de la LAU, esa es preferente y no se suman.",
          "Subida de renta hasta el 31-12-2027: si no hay acuerdo, máximo 2 %; sin subida si la renta supera el índice de referencia aplicable.",
        ]],
      },
      {
        id: "convalidacion",
        title: "Pendiente de convalidación",
        paragraphs: ["El Real Decreto-ley 29/2026 debe convalidarlo la Diputación Permanente del Congreso en 30 días (artículo 86 de la Constitución). A 24 de octubre de 2026 no se ha votado. Es distinto del Real Decreto-ley 28/2026, que regula las prórrogas de cinco años y entraría en vigor el 15 de noviembre si se convalida."],
      },
    ],
    faqs: [{ q: "¿Puede negarse el casero?", a: "Solo si pactáis otras condiciones, firmáis un nuevo contrato o te ha comunicado en plazo que necesita la vivienda para él o su familia (disposición final quinta del Real Decreto-ley 29/2026)." }],
  },
  "/elecciones/prestamo-tu-casa-50000-euros": {
    reviewedAt: R,
    sources: [{ href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823#a1-11", label: "BOE: Real Decreto-ley 29/2026, artículo 19 (Línea TU CASA)" }],
    sections: [
      {
        id: "que-dice-el-articulo-19",
        title: "Qué dice exactamente el artículo 19 del Real Decreto-ley 29/2026",
        paragraphs: [
          "El artículo 19 crea la línea TU CASA para financiar el acceso a la primera vivienda habitual hipotecada, «independientemente de su edad», como complemento de la financiación privada. El préstamo cubre la cantidad menor entre el 20 % del valor de la vivienda hipotecada y 50.000 euros, a tipo de interés del cero por ciento y sin comisiones.",
          "La gestión corresponde al Instituto de Crédito Oficial (ICO), que analiza las operaciones según sus políticas de riesgos y las condiciones de elegibilidad. El objeto, los beneficiarios, los límites y el importe inicial de la línea se fijarán por Acuerdo del Consejo de Ministros, por lo que hoy no hay formulario ni plazo para pedirlo.",
          "El mismo artículo aprueba un crédito extraordinario de 10.000 millones de euros para la línea y establece que la vivienda debe destinarse a residencia habitual y queda sujeta de forma permanente a un precio máximo de transmisión: en las ventas posteriores no podrá superar el precio de compra actualizado con el IPC. Si se alquila, la renta debe quedar por debajo del índice de referencia de precios.",
        ],
        lists: [[
          "Quién lo gestiona: el ICO, como entidad colaboradora del Ministerio de Vivienda y Agenda Urbana.",
          "Qué falta: el Acuerdo del Consejo de Ministros con requisitos y procedimiento.",
          "Qué condiciona: la venta futura (precio máximo) y el alquiler (renta limitada).",
        ]],
      },
    ],
    faqs: [{ q: "¿Necesito tener menos de 35 años?", a: "No. El artículo 19 dice que el préstamo se dirige a quienes accedan a su primera vivienda habitual hipotecada «independientemente de su edad». Los demás requisitos se conocerán con el Acuerdo del Consejo de Ministros." }],
  },
  "/elecciones/bulos-y-fraudes-electorales": {
    reviewedAt: R,
    sources: [loreg("acientocuarentayseis", "artículo 146: compra de votos y coacciones"), loreg("asetentaydos", "artículo 72: voto por correo"), loreg("acientocuarentaycinco", "artículo 145: encuestas")],
    sections: [
      {
        id: "lo-que-dice-la-ley",
        title: "Lo que dice la ley sobre los engaños más repetidos",
        paragraphs: [
          "Muchos bulos se desmontan leyendo la LOREG. El voto por correo se pide en una oficina de Correos y la solicitud debe hacerse en persona, enseñando el DNI original; no se admite fotocopia (artículo 72). Solo si una enfermedad lo impide puede pedirlo otra persona con autorización notarial o consular y certificado médico oficial y gratuito.",
          "El artículo 146 castiga con prisión de seis meses a tres años o multa a quien pida el voto a cambio de recompensas, dinero o promesas, a quien presione con violencia o intimidación para que alguien vote de una forma o no vote, y a quien impida la entrada o salida de electores del colegio.",
          "Publicar encuestas incumpliendo la normativa también es delito (artículo 145), y desde el 24 de noviembre no pueden difundirse sondeos.",
        ],
        lists: [[
          "Nadie puede cobrarte por pedir o enviar el voto por correo.",
          "Ofrecer dinero o regalos a cambio del voto es delito, tanto para quien lo pide como para quien presiona.",
          "Un mensaje que te pide votar «por internet» o confirmar datos por SMS no es oficial.",
          "Si sospechas de un delito electoral, acude a la Junta Electoral de Zona, a la Fiscalía o a la policía.",
        ]],
      },
    ],
    faqs: [{ q: "¿Me pueden quitar el voto si no contesto un mensaje?", a: "No. El derecho a votar se acredita con la inscripción en el censo y tu documento de identidad en la mesa (artículo 85 de la LOREG). Ningún SMS o correo lo cambia." }],
  },
  "/elecciones/diputados-por-provincia-29n": {
    reviewedAt: R,
    sources: [{ href: "https://www.boe.es/eli/es/rd/2026/10/05/806", label: "BOE: Real Decreto 806/2026, artículo 3 y anexo" }, loreg("acientosesentaydos", "artículo 162: reparto de escaños"), loreg("acientosesentaytres", "artículo 163: fórmula D'Hondt")],
    sections: [
      {
        id: "anexo-completo",
        title: "Las 52 circunscripciones, según el anexo del Real Decreto 806/2026",
        paragraphs: [
          "El artículo 3 del Real Decreto 806/2026 remite al anexo para el número de diputados de cada circunscripción. Esta es la lista completa por orden de diputados.",
        ],
        table: {
          caption: "Diputados por circunscripción, elecciones generales del 29 de noviembre de 2026",
          head: ["Diputados", "Circunscripciones"],
          rows: [
            { cells: ["38", "Madrid"] },
            { cells: ["32", "Barcelona"] },
            { cells: ["16", "Valencia/València"] },
            { cells: ["12", "Alicante/Alacant, Sevilla"] },
            { cells: ["11", "Málaga"] },
            { cells: ["10", "Murcia"] },
            { cells: ["8", "Balears (Illes), Bizkaia, Cádiz, Coruña (A), Palmas (Las)"] },
            { cells: ["7", "Asturias, Granada, Pontevedra, Santa Cruz de Tenerife, Zaragoza"] },
            { cells: ["6", "Almería, Córdoba, Gipuzkoa, Girona, Tarragona, Toledo"] },
            { cells: ["5", "Badajoz, Cantabria, Castellón/Castelló, Ciudad Real, Huelva, Jaén, Navarra, Valladolid"] },
            { cells: ["4", "Albacete, Araba/Álava, Burgos, Cáceres, León, Lleida, Lugo, Ourense, Rioja (La), Salamanca"] },
            { cells: ["3", "Ávila, Cuenca, Guadalajara, Huesca, Palencia, Segovia, Teruel, Zamora"] },
            { cells: ["2", "Soria"] },
            { cells: ["1", "Ceuta, Melilla"] },
          ],
        },
      },
      {
        id: "umbral-3",
        title: "El umbral del 3 % y el Senado",
        paragraphs: [
          "En cada provincia no entran en el reparto las candidaturas que no lleguen al 3 % de los votos válidos, que incluyen el voto en blanco (artículo 163 de la LOREG). Después se aplica D'Hondt: se dividen los votos de cada candidatura entre 1, 2, 3… y los escaños van a los cocientes mayores.",
          "Para el Senado, el mismo real decreto fija cuatro senadores por provincia; tres en Gran Canaria, Mallorca y Tenerife; uno en Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote y La Palma, y dos en Ceuta y en Melilla.",
        ],
      },
    ],
  },
  "/elecciones/como-votar-el-dia-29": {
    reviewedAt: R,
    sources: [loreg("aochentaycuatro", "artículo 84: horario"), loreg("aochentayseis", "artículo 86: votación"), loreg("aochentayocho", "artículo 88: cierre"), loreg("aochentaysiete", "artículo 87: ayuda de una persona de confianza")],
    sections: [
      {
        id: "horario-y-cierre",
        title: "Horario, identificación y cierre según la LOREG",
        paragraphs: [
          "Los miembros de la mesa se reúnen a las 8:00 (artículo 80) y la votación empieza a las 9:00 y sigue sin interrupción hasta las 20:00 (artículo 84). A las 20:00 el presidente anuncia que va a concluir la votación; si alguien que está en el local o en el acceso todavía no ha votado, puede hacerlo, y ya no vota nadie más (artículo 88).",
          "La identificación se hace con DNI, pasaporte o permiso de conducir con fotografía (artículo 85). El voto es secreto y solo puedes votar en la mesa que te corresponde (artículo 86). Los vocales e interventores comprueban en las listas del censo que puedes votar.",
          "Si no sabes leer o tienes una discapacidad que te impide escoger la papeleta, meterla en el sobre o entregarla, puedes ir acompañado de una persona de confianza (artículo 87). Las personas ciegas que usan braille pueden usar además el voto accesible si lo solicitaron en plazo.",
        ],
        lists: [[
          "8:00: se constituye la mesa.",
          "9:00: «Empieza la votación».",
          "20:00: votan quienes ya están dentro; luego se introducen los votos por correo y votan la mesa y los interventores.",
          "Después: escrutinio público, al que puede asistir cualquiera (artículo 95).",
        ]],
      },
    ],
  },
  "/elecciones/deflactar-irpf-que-significa": {
    reviewedAt: R,
    sources: [{ href: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a63", label: "BOE: Ley 35/2006 del IRPF, artículo 63 (escala estatal)" }, { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a74", label: "BOE: Ley 35/2006 del IRPF, artículo 74 (escala autonómica)" }],
    sections: [
      {
        id: "escala-estatal",
        title: "La escala estatal que se deflactaría",
        paragraphs: [
          "El artículo 63 de la Ley del IRPF fija la escala estatal que se aplica a la base liquidable general. Esa es la parte que puede cambiar el Estado. A ella se suma la escala autonómica que aprueba cada comunidad (artículo 74), por lo que el tipo total que paga cada persona depende también de dónde vive.",
          "Deflactar consiste en subir los límites de cada tramo en un porcentaje, normalmente la inflación. Los tipos no cambian; cambia a partir de qué cantidad se aplican.",
        ],
        table: {
          caption: "Escala estatal del IRPF vigente (artículo 63.1 de la Ley 35/2006)",
          head: ["Base liquidable desde", "Hasta", "Tipo estatal"],
          rows: [
            { cells: ["0 €", "12.450 €", "9,50 %"] },
            { cells: ["12.450 €", "20.200 €", "12 %"] },
            { cells: ["20.200 €", "35.200 €", "15 %"] },
            { cells: ["35.200 €", "60.000 €", "18,50 %"] },
            { cells: ["60.000 €", "300.000 €", "22,50 %"] },
            { cells: ["300.000 €", "en adelante", "24,50 %"] },
          ],
        },
      },
    ],
    faqs: [{ q: "¿Deflactar baja los tipos?", a: "No. Los porcentajes de la tabla se mantienen; lo que sube son los importes que separan un tramo de otro." }],
  },
  "/elecciones/prioridad-nacional-que-es": {
    reviewedAt: R,
    sources: [ce("a13", "artículo 13: derechos de los extranjeros"), ce("a14", "artículo 14: igualdad"), ce("a148", "artículo 148: competencias autonómicas")],
    sections: [
      {
        id: "marco-constitucional",
        title: "Qué dice hoy la Constitución sobre extranjeros e igualdad",
        paragraphs: [
          "Para entender el debate ayuda saber qué fija hoy la Constitución. El artículo 13 dice que los extranjeros gozan en España de las libertades públicas del Título I «en los términos que establezcan los tratados y la ley», y reserva a los españoles el derecho de sufragio del artículo 23, salvo lo que se pacte por reciprocidad para las elecciones municipales.",
          "El artículo 14 establece que los españoles son iguales ante la ley sin discriminación por nacimiento, raza, sexo, religión, opinión u otra condición. El artículo 148 permite a las comunidades autónomas asumir competencias en vivienda y asistencia social, que son las materias donde el partido plantea aplicar su criterio.",
          "Cómo encajaría la propuesta en ese marco dependería del texto legal que se presentara, que a 24 de octubre de 2026 no se ha publicado. No valoramos si es o no compatible: eso corresponde, en su caso, a los tribunales.",
        ],
      },
    ],
  },
  "/elecciones/propuesta-fin-cita-previa": {
    reviewedAt: R,
    sources: [{ href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a13", label: "BOE: Ley 39/2015, artículo 13 (derechos ante la Administración)" }, { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a28", label: "BOE: Ley 39/2015, artículo 28 (documentos ya en poder de la Administración)" }, { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a24", label: "BOE: Ley 39/2015, artículo 24 (silencio administrativo)" }],
    sections: [
      {
        id: "que-dice-la-ley-hoy",
        title: "Qué dice hoy la Ley 39/2015 sobre estos temas",
        paragraphs: [
          "La ley básica del procedimiento administrativo no regula la cita previa como tal: cada administración organiza la atención presencial de sus oficinas. Sí reconoce, en su artículo 13, el derecho a ser asistido en el uso de medios electrónicos y a ser tratado con respeto y deferencia.",
          "Otras medidas del mismo programa ya tienen una base en la ley actual. El artículo 28.2 reconoce el derecho a no aportar documentos que ya tenga cualquier administración, que puede consultarlos salvo que te opongas. Y el artículo 24 fija como regla general el silencio positivo en procedimientos iniciados a petición del interesado, con excepciones cuando una ley lo establece.",
          "La propuesta iría más allá de lo vigente al prohibir exigir cita previa en todas las administraciones. Para el trámite que necesites hoy, revisa en la web oficial si la oficina atiende sin cita.",
        ],
      },
    ],
  },
  "/elecciones/voto-accesible-braille": {
    reviewedAt: R,
    sources: [{ href: "https://www.boe.es/eli/es/rd/2007/12/07/1612/con", label: "BOE: Real Decreto 1612/2007, texto consolidado" }, loreg("aochentaysiete", "artículo 87")],
    sections: [
      {
        id: "requisitos-y-kit",
        title: "Quién puede pedirlo y qué contiene el sobre",
        paragraphs: [
          "Según el artículo 3 del Real Decreto 1612/2007, en la redacción aplicable a estas elecciones, pueden usarlo las personas con discapacidad visual que conozcan el braille y tengan reconocido un grado de discapacidad igual o superior al 33 % o estén afiliadas a la ONCE. La comunicación se hace al Ministerio del Interior desde la convocatoria hasta el vigésimo séptimo día posterior. Una reforma publicada en 2026 elimina el requisito del grado o la afiliación, pero entra en vigor el 2 de enero de 2027.",
          "Tras comunicarlo recibes una confirmación que te permite recoger la documentación en tu mesa. El día de la votación te diriges al presidente de la mesa, que te entrega el material y te indica el espacio del colegio habilitado para usarlo (artículo 6).",
        ],
        lists: [[
          "Congreso: instrucciones en braille, un sobre de votación y un sobre por candidatura, rotulado en tinta y braille, con su papeleta dentro.",
          "Senado: un sobre de votación, una plantilla con ventanas troqueladas sobre la papeleta para marcar con una X y una guía en braille con los candidatos en el mismo orden.",
          "Alternativa siempre disponible: votar con ayuda de una persona de confianza (artículo 87.1 de la LOREG).",
        ]],
      },
    ],
  },
  "/elecciones/votar-hospitalizado-o-enfermo": {
    reviewedAt: R,
    sources: [loreg("asetentaydos", "artículo 72"), loreg("asetentaytres", "artículo 73: envío y recepción")],
    sections: [
      {
        id: "detalle-legal",
        title: "Los detalles que fija la LOREG",
        paragraphs: [
          "El artículo 72 exige que la solicitud se haga en persona en Correos con el DNI original, y prevé una excepción: si una enfermedad o incapacidad impide hacerlo, otra persona puede presentarla con un certificado médico oficial y gratuito y una autorización notarial o consular. Esa autorización es individual: no puede incluir a varios electores y una misma persona no puede representar a más de uno. La Junta Electoral comprueba cada caso.",
          "La documentación llega por correo certificado y el acuse debe firmarlo el propio elector tras identificarse. Si no está en casa, recibe un aviso para recogerla en la oficina de Correos, en persona o mediante la misma representación (artículo 73). El voto se envía después por correo certificado.",
        ],
        lists: [[
          "Certificado médico: oficial y gratuito.",
          "Autorización: ante notario o cónsul, una por elector.",
          "Recepción: la firma el elector; si está ingresado, conviene indicar en la solicitud el domicilio donde podrá recibirla.",
        ]],
      },
    ],
  },
  "/elecciones/promesas/comunidad-andalucia": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Andalucía el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Andalucía vota el 29 de noviembre en 8 circunscripciones (Almería, Cádiz, Córdoba, Granada, Huelva, Jaén, Málaga, Sevilla) y elige 60 de los 350 diputados del Congreso, el 17,1 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (32 en total en Andalucía) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Andalucía designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Andalucía (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Almería", "6", "4"]}, {"cells": ["Cádiz", "8", "4"]}, {"cells": ["Córdoba", "6", "4"]}, {"cells": ["Granada", "7", "4"]}, {"cells": ["Huelva", "5", "4"]}, {"cells": ["Jaén", "5", "4"]}, {"cells": ["Málaga", "11", "4"]}, {"cells": ["Sevilla", "12", "4"]}]}}]},
  "/elecciones/promesas/comunidad-aragon": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Aragón el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Aragón vota el 29 de noviembre en 3 circunscripciones (Huesca, Teruel, Zaragoza) y elige 13 de los 350 diputados del Congreso, el 3,7 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (12 en total en Aragón) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Aragón designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Aragón (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Huesca", "3", "4"]}, {"cells": ["Teruel", "3", "4"]}, {"cells": ["Zaragoza", "7", "4"]}]}}]},
  "/elecciones/promesas/comunidad-asturias": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige el Principado de Asturias el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, el Principado de Asturias vota el 29 de noviembre en una sola circunscripción (Asturias) y elige 7 de los 350 diputados del Congreso, el 2,0 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (4 en total en el Principado de Asturias) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de el Principado de Asturias designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en el Principado de Asturias (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Asturias", "7", "4"]}]}}]},
  "/elecciones/promesas/comunidad-canarias": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Canarias el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Canarias vota el 29 de noviembre en 2 circunscripciones (Palmas (Las), Santa Cruz de Tenerife) y elige 15 de los 350 diputados del Congreso, el 4,3 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado, en Canarias cada isla con Cabildo o Consejo Insular es una circunscripción (artículo 69.3 de la Constitución y artículo 3.2 del Real Decreto 806/2026). Se eligen 11 senadores: Gran Canaria: 3; Fuerteventura: 1; Lanzarote: 1; Tenerife: 3; La Gomera: 1; El Hierro: 1; La Palma: 1. En Gran Canaria, Mallorca y Tenerife puedes marcar hasta dos candidatos; en las demás islas, uno (artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Canarias designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Canarias (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Palmas (Las)", "8", "por islas (ver abajo)"]}, {"cells": ["Santa Cruz de Tenerife", "7", "por islas (ver abajo)"]}]}}]},
  "/elecciones/promesas/comunidad-cantabria": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Cantabria el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Cantabria vota el 29 de noviembre en una sola circunscripción (Cantabria) y elige 5 de los 350 diputados del Congreso, el 1,4 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (4 en total en Cantabria) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Cantabria designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Cantabria (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Cantabria", "5", "4"]}]}}]},
  "/elecciones/promesas/comunidad-castilla-la-mancha": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Castilla-La Mancha el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Castilla-La Mancha vota el 29 de noviembre en 5 circunscripciones (Albacete, Ciudad Real, Cuenca, Guadalajara, Toledo) y elige 21 de los 350 diputados del Congreso, el 6,0 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (20 en total en Castilla-La Mancha) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Castilla-La Mancha designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Castilla-La Mancha (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Albacete", "4", "4"]}, {"cells": ["Ciudad Real", "5", "4"]}, {"cells": ["Cuenca", "3", "4"]}, {"cells": ["Guadalajara", "3", "4"]}, {"cells": ["Toledo", "6", "4"]}]}}]},
  "/elecciones/promesas/comunidad-castilla-y-leon": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Castilla y León el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Castilla y León vota el 29 de noviembre en 9 circunscripciones (Ávila, Burgos, León, Palencia, Salamanca, Segovia, Soria, Valladolid, Zamora) y elige 31 de los 350 diputados del Congreso, el 8,9 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (36 en total en Castilla y León) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Castilla y León designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Castilla y León (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Ávila", "3", "4"]}, {"cells": ["Burgos", "4", "4"]}, {"cells": ["León", "4", "4"]}, {"cells": ["Palencia", "3", "4"]}, {"cells": ["Salamanca", "4", "4"]}, {"cells": ["Segovia", "3", "4"]}, {"cells": ["Soria", "2", "4"]}, {"cells": ["Valladolid", "5", "4"]}, {"cells": ["Zamora", "3", "4"]}]}}]},
  "/elecciones/promesas/comunidad-cataluna": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Cataluña el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Cataluña vota el 29 de noviembre en 4 circunscripciones (Barcelona, Girona, Lleida, Tarragona) y elige 48 de los 350 diputados del Congreso, el 13,7 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (16 en total en Cataluña) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Cataluña designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Cataluña (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Barcelona", "32", "4"]}, {"cells": ["Girona", "6", "4"]}, {"cells": ["Lleida", "4", "4"]}, {"cells": ["Tarragona", "6", "4"]}]}}]},
  "/elecciones/promesas/comunidad-ceuta": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Ceuta el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Ceuta vota el 29 de noviembre en una sola circunscripción (Ceuta) y elige 1 de los 350 diputados del Congreso, el 0,3 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "Ceuta elige 2 senadores y cada elector puede marcar hasta dos nombres en la papeleta del Senado (artículo 69.4 de la Constitución y artículo 96.3 de la LOREG). El diputado se asigna a la candidatura más votada, porque solo hay un escaño en juego."], "table": {"caption": "Escaños por circunscripción en Ceuta (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Ceuta", "1", "2"]}]}}]},
  "/elecciones/promesas/comunidad-comunitat-valenciana": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige la Comunitat Valenciana el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, la Comunitat Valenciana vota el 29 de noviembre en 3 circunscripciones (Alicante/Alacant, Castellón/Castelló, Valencia/València) y elige 33 de los 350 diputados del Congreso, el 9,4 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (12 en total en la Comunitat Valenciana) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de la Comunitat Valenciana designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en la Comunitat Valenciana (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Alicante/Alacant", "12", "4"]}, {"cells": ["Castellón/Castelló", "5", "4"]}, {"cells": ["Valencia/València", "16", "4"]}]}}]},
  "/elecciones/promesas/comunidad-extremadura": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Extremadura el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Extremadura vota el 29 de noviembre en 2 circunscripciones (Badajoz, Cáceres) y elige 9 de los 350 diputados del Congreso, el 2,6 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (8 en total en Extremadura) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Extremadura designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Extremadura (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Badajoz", "5", "4"]}, {"cells": ["Cáceres", "4", "4"]}]}}]},
  "/elecciones/promesas/comunidad-galicia": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Galicia el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Galicia vota el 29 de noviembre en 4 circunscripciones (Coruña (A), Lugo, Ourense, Pontevedra) y elige 23 de los 350 diputados del Congreso, el 6,6 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (16 en total en Galicia) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Galicia designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Galicia (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Coruña (A)", "8", "4"]}, {"cells": ["Lugo", "4", "4"]}, {"cells": ["Ourense", "4", "4"]}, {"cells": ["Pontevedra", "7", "4"]}]}}]},
  "/elecciones/promesas/comunidad-illes-balears": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige las Illes Balears el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, las Illes Balears vota el 29 de noviembre en una sola circunscripción (Balears (Illes)) y elige 8 de los 350 diputados del Congreso, el 2,3 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado, en las Illes Balears cada isla con Cabildo o Consejo Insular es una circunscripción (artículo 69.3 de la Constitución y artículo 3.2 del Real Decreto 806/2026). Se eligen 6 senadores: Mallorca: 3; Menorca: 1; Ibiza: 1; Formentera: 1. En Gran Canaria, Mallorca y Tenerife puedes marcar hasta dos candidatos; en las demás islas, uno (artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de las Illes Balears designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en las Illes Balears (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Balears (Illes)", "8", "por islas (ver abajo)"]}]}}]},
  "/elecciones/promesas/comunidad-la-rioja": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige La Rioja el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, La Rioja vota el 29 de noviembre en una sola circunscripción (Rioja (La)) y elige 4 de los 350 diputados del Congreso, el 1,1 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (4 en total en La Rioja) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de La Rioja designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en La Rioja (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Rioja (La)", "4", "4"]}]}}]},
  "/elecciones/promesas/comunidad-madrid": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige la Comunidad de Madrid el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, la Comunidad de Madrid vota el 29 de noviembre en una sola circunscripción (Madrid) y elige 38 de los 350 diputados del Congreso, el 10,9 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (4 en total en la Comunidad de Madrid) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de la Comunidad de Madrid designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en la Comunidad de Madrid (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Madrid", "38", "4"]}]}}]},
  "/elecciones/promesas/comunidad-melilla": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Melilla el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Melilla vota el 29 de noviembre en una sola circunscripción (Melilla) y elige 1 de los 350 diputados del Congreso, el 0,3 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "Melilla elige 2 senadores y cada elector puede marcar hasta dos nombres en la papeleta del Senado (artículo 69.4 de la Constitución y artículo 96.3 de la LOREG). El diputado se asigna a la candidatura más votada, porque solo hay un escaño en juego."], "table": {"caption": "Escaños por circunscripción en Melilla (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Melilla", "1", "2"]}]}}]},
  "/elecciones/promesas/comunidad-murcia": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige la Región de Murcia el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, la Región de Murcia vota el 29 de noviembre en una sola circunscripción (Murcia) y elige 10 de los 350 diputados del Congreso, el 2,9 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (4 en total en la Región de Murcia) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de la Región de Murcia designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en la Región de Murcia (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Murcia", "10", "4"]}]}}]},
  "/elecciones/promesas/comunidad-navarra": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige Navarra el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, Navarra vota el 29 de noviembre en una sola circunscripción (Navarra) y elige 5 de los 350 diputados del Congreso, el 1,4 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (4 en total en Navarra) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de Navarra designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en Navarra (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Navarra", "5", "4"]}]}}]},
  "/elecciones/promesas/comunidad-pais-vasco": {"reviewedAt": "2026-10-24", "sources": [{"href": "https://www.boe.es/eli/es/rd/2026/10/05/806", "label": "BOE: Real Decreto 806/2026, artículo 3 y anexo"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a69", "label": "BOE: Constitución, artículo 69 (Senado)"}, {"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#anoventayseis", "label": "BOE: LOREG, artículo 96 (votos nulos)"}], "sections": [{"id": "circunscripciones-29n", "title": "Diputados y senadores que elige el País Vasco el 29-N", "paragraphs": ["Según el anexo del Real Decreto 806/2026, el País Vasco vota el 29 de noviembre en 3 circunscripciones (Araba/Álava, Bizkaia, Gipuzkoa) y elige 18 de los 350 diputados del Congreso, el 5,1 % del total. Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG).", "En el Senado cada provincia elige 4 senadores (12 en total en el País Vasco) y en la papeleta puedes marcar hasta tres nombres; si marcas más, el voto es nulo (artículo 69.2 de la Constitución y artículo 96.3 de la LOREG).", "Además de los senadores que se votan el 29-N, el parlamento autonómico de el País Vasco designa un senador y otro más por cada millón de habitantes (artículo 69.5 de la Constitución). Esos no aparecen en la papeleta."], "table": {"caption": "Escaños por circunscripción en el País Vasco (Real Decreto 806/2026)", "head": ["Circunscripción", "Diputados", "Senadores elegidos"], "rows": [{"cells": ["Araba/Álava", "4", "4"]}, {"cells": ["Bizkaia", "8", "4"]}, {"cells": ["Gipuzkoa", "6", "4"]}]}}]},
  "/becas/mec/subsanacion": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a68",
        "label": "BOE: Ley 39/2015, artículo 68 (subsanación)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a30",
        "label": "BOE: Ley 39/2015, artículo 30 (cómputo de plazos)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a43",
        "label": "BOE: Ley 39/2015, artículo 43 (notificaciones electrónicas)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a124",
        "label": "BOE: Ley 39/2015, artículo 124 (plazo del recurso de reposición)"
      }
    ],
    "sections": [
      {
        "id": "plazo-legal-subsanar",
        "title": "Qué dice la Ley 39/2015 sobre el requerimiento",
        "paragraphs": [
          "El artículo 68.1 de la Ley 39/2015 establece que, si una solicitud no reúne los requisitos exigidos, la administración debe requerirte para que en un plazo de diez días subsanes la falta o aportes los documentos preceptivos. Si no lo haces, se te tiene por desistido de tu petición, previa resolución dictada en los términos del artículo 21.",
          "Esos diez días son hábiles: no cuentan sábados, domingos ni festivos, y empiezan el día siguiente a la notificación. Si la notificación te llega por vía electrónica, cuenta desde que accedes a su contenido; si no la abres en diez días naturales desde que se pone a tu disposición, se entiende rechazada y el plazo continúa igualmente."
        ],
        "lists": [
          [
            "Ley 39/2015, artículo 30: los plazos por días son hábiles salvo que una ley diga otra cosa; se excluyen sábados, domingos y festivos, y se cuentan desde el día siguiente a la notificación.",
            "Artículo 43: si la notificación electrónica es obligatoria o la elegiste, se entiende rechazada a los diez días naturales de ponerla a tu disposición sin abrirla, y el procedimiento sigue.",
            "Artículo 124: contra una resolución expresa que pone fin a la vía administrativa, el recurso potestativo de reposición se presenta en el plazo de un mes."
          ]
        ]
      }
    ]
  },
  "/becas/mec/no-cobrada": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a30",
        "label": "BOE: Ley 39/2015, artículo 30 (cómputo de plazos)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a43",
        "label": "BOE: Ley 39/2015, artículo 43 (notificaciones electrónicas)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a124",
        "label": "BOE: Ley 39/2015, artículo 124 (plazo del recurso de reposición)"
      }
    ],
    "sections": [
      {
        "id": "notificaciones-y-recursos",
        "title": "Notificaciones y plazos que conviene vigilar",
        "paragraphs": [
          "Cuando una beca se resuelve y no llega el pago, lo primero es comprobar qué te han notificado. Las notificaciones electrónicas se entienden practicadas cuando accedes a su contenido; si son obligatorias o las elegiste y no las abres en diez días naturales, se tienen por rechazadas y el procedimiento sigue su curso (artículo 43 de la Ley 39/2015).",
          "Si lo que hay es una resolución que no compartes, el plazo general del recurso de reposición contra un acto expreso es de un mes (artículo 124). Revisa el pie de la propia resolución, que indica el recurso concreto, el órgano y el plazo."
        ],
        "lists": [
          [
            "Ley 39/2015, artículo 30: los plazos por días son hábiles salvo que una ley diga otra cosa; se excluyen sábados, domingos y festivos, y se cuentan desde el día siguiente a la notificación.",
            "Artículo 43: si la notificación electrónica es obligatoria o la elegiste, se entiende rechazada a los diez días naturales de ponerla a tu disposición sin abrirla, y el procedimiento sigue.",
            "Artículo 124: contra una resolución expresa que pone fin a la vía administrativa, el recurso potestativo de reposición se presenta en el plazo de un mes."
          ]
        ]
      }
    ]
  },
  "/becas/cobro-al-presentar": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a5",
        "label": "BOE: Ley 39/2015, artículo 5 (representación)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a30",
        "label": "BOE: Ley 39/2015, artículo 30 (cómputo de plazos)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a43",
        "label": "BOE: Ley 39/2015, artículo 43 (notificaciones electrónicas)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a124",
        "label": "BOE: Ley 39/2015, artículo 124 (plazo del recurso de reposición)"
      }
    ],
    "sections": [
      {
        "id": "representacion-y-plazos",
        "title": "Si otra persona hace el trámite por ti",
        "paragraphs": [
          "La Ley 39/2015 permite actuar por medio de representante (artículo 5). Para presentar solicitudes, interponer recursos o renunciar a derechos en nombre de otra persona hay que acreditar la representación; para actos de mero trámite se presume.",
          "Desconfía de cualquier intermediario que te pida dinero por presentar una beca del Ministerio: la solicitud se hace gratis en la sede electrónica, con Cl@ve, certificado electrónico o usuario y contraseña. Si ya has pagado, guarda los justificantes y revisa tus plazos:"
        ],
        "lists": [
          [
            "Ley 39/2015, artículo 30: los plazos por días son hábiles salvo que una ley diga otra cosa; se excluyen sábados, domingos y festivos, y se cuentan desde el día siguiente a la notificación.",
            "Artículo 43: si la notificación electrónica es obligatoria o la elegiste, se entiende rechazada a los diez días naturales de ponerla a tu disposición sin abrirla, y el procedimiento sigue.",
            "Artículo 124: contra una resolución expresa que pone fin a la vía administrativa, el recurso potestativo de reposición se presenta en el plazo de un mes."
          ]
        ]
      }
    ]
  },
  "/becas/apoyo-educativo": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.becaseducacion.gob.es/becas-y-ayudas/ayudas-apoyo-educativo/como-solicitarla.htm",
        "label": "Ministerio de Educación: cómo solicitar la ayuda de apoyo educativo"
      }
    ],
    "sections": [
      {
        "id": "convocatoria-2026-2027",
        "title": "Convocatoria 2026/2027: fechas y forma de solicitud",
        "paragraphs": [
          "Según la web oficial de becas del Ministerio, la convocatoria de ayudas para alumnado con necesidad específica de apoyo educativo del curso 2026/2027 se publicó el 8 de mayo de 2026, y el plazo de solicitud fue del 19 de mayo al 10 de septiembre de 2026.",
          "Todo el proceso se hace en la sede electrónica del Ministerio, con Cl@ve, certificado electrónico o el usuario y contraseña de la sede. No se pide documentación de entrada, porque las unidades de becas consultan los datos; solo en algunos casos te requerirán un documento. Comprueba que obtienes el justificante y que la solicitud no queda en borrador, porque un borrador no es válido. Teléfono de la Oficina de Atención al Ciudadano: 910 837 937."
        ]
      }
    ]
  },
  "/becas/colaboracion": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.educacionfpydeportes.gob.es/servicios-al-ciudadano/catalogo/general/99/998142/ficha/998142-2026.html",
        "label": "Ministerio de Educación: becas de colaboración 2026-2027"
      }
    ],
    "sections": [
      {
        "id": "requisitos-2026-2027",
        "title": "Requisitos de la convocatoria 2026-2027",
        "paragraphs": [
          "La ficha oficial del Ministerio (código SIA 998142) recoge 2.111 becas de 2.000 euros para estudiantes del último curso de Grado o del primer curso de Máster oficial, destinadas a tareas de investigación en departamentos universitarios. La convocatoria se publicó en el BOE el 17 de julio de 2026 y el plazo fue del 21 de julio a las 08:00 al 22 de septiembre de 2026 a las 15:00; ya está cerrado.",
          "En Grado hay que estar matriculado de todo lo que falta para terminar y haber superado el 75 % de la carga lectiva, con estas notas medias mínimas:"
        ],
        "lists": [
          [
            "7,25: Ingeniería y Arquitectura o Enseñanzas Técnicas.",
            "7,70: Ciencias o Ciencias Experimentales y Ciencias Sociales y Jurídicas.",
            "7,80: Ciencias de la Salud.",
            "8,00: Artes y Humanidades.",
            "Todas las solicitudes llevan un proyecto de colaboración avalado y puntuado por el departamento, que se sube escaneado a la aplicación."
          ]
        ]
      }
    ]
  },
  "/becas/autonomicas/beca-salario-gva": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a68",
        "label": "BOE: Ley 39/2015, artículo 68 (subsanación)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a30",
        "label": "BOE: Ley 39/2015, artículo 30 (cómputo de plazos)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a43",
        "label": "BOE: Ley 39/2015, artículo 43 (notificaciones electrónicas)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a124",
        "label": "BOE: Ley 39/2015, artículo 124 (plazo del recurso de reposición)"
      }
    ],
    "sections": [
      {
        "id": "plazos-ley-39",
        "title": "Plazos generales si te requieren o resuelven",
        "paragraphs": [
          "Las bases de cada convocatoria autonómica fijan sus propios plazos de solicitud, pero los trámites posteriores siguen la Ley 39/2015. Si tu solicitud está incompleta, el artículo 68 da diez días para subsanar; si no lo haces, se te tiene por desistido.",
          "La Generalitat publica la convocatoria y sus resoluciones en su guía de procedimientos (gva.es); revisa allí la resolución que te afecte y el recurso que indica."
        ],
        "lists": [
          [
            "Ley 39/2015, artículo 30: los plazos por días son hábiles salvo que una ley diga otra cosa; se excluyen sábados, domingos y festivos, y se cuentan desde el día siguiente a la notificación.",
            "Artículo 43: si la notificación electrónica es obligatoria o la elegiste, se entiende rechazada a los diez días naturales de ponerla a tu disposición sin abrirla, y el procedimiento sigue.",
            "Artículo 124: contra una resolución expresa que pone fin a la vía administrativa, el recurso potestativo de reposición se presenta en el plazo de un mes."
          ]
        ]
      }
    ]
  },
  "/becas/autonomicas/ayudas-estudio-cyl": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a68",
        "label": "BOE: Ley 39/2015, artículo 68 (subsanación)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a30",
        "label": "BOE: Ley 39/2015, artículo 30 (cómputo de plazos)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a43",
        "label": "BOE: Ley 39/2015, artículo 43 (notificaciones electrónicas)"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a124",
        "label": "BOE: Ley 39/2015, artículo 124 (plazo del recurso de reposición)"
      },
      {
        "href": "https://www.educa.jcyl.es/universidad/es/becas_universitarias/ayudas-estudio",
        "label": "Junta de Castilla y León: ayudas al estudio"
      }
    ],
    "sections": [
      {
        "id": "plazos-ley-39",
        "title": "Plazos generales si te requieren o resuelven",
        "paragraphs": [
          "Las bases de cada convocatoria autonómica fijan sus propios plazos de solicitud, pero los trámites posteriores siguen la Ley 39/2015. Si tu solicitud está incompleta, el artículo 68 da diez días para subsanar; si no lo haces, se te tiene por desistido.",
          "La Junta de Castilla y León publica en su portal de educación las resoluciones de cada curso y, para 2025-2026, un acceso específico de subsanación al final de la página de ayudas al estudio."
        ],
        "lists": [
          [
            "Ley 39/2015, artículo 30: los plazos por días son hábiles salvo que una ley diga otra cosa; se excluyen sábados, domingos y festivos, y se cuentan desde el día siguiente a la notificación.",
            "Artículo 43: si la notificación electrónica es obligatoria o la elegiste, se entiende rechazada a los diez días naturales de ponerla a tu disposición sin abrirla, y el procedimiento sigue.",
            "Artículo 124: contra una resolución expresa que pone fin a la vía administrativa, el recurso potestativo de reposición se presenta en el plazo de un mes."
          ]
        ]
      }
    ]
  },
  "/extranjeria/arraigo-padron": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a1-38",
        "label": "BOE: Real Decreto 1155/2024, artículos 125 y 126"
      },
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392#a16",
        "label": "BOE: Ley 7/1985, artículo 16 (padrón)"
      }
    ],
    "sections": [
      {
        "id": "requisitos-reglamento",
        "title": "Qué exige el Reglamento de 2024",
        "paragraphs": [
          "El padrón importa porque, según el artículo 16 de la Ley 7/1985, sus datos prueban la residencia y el domicilio habitual, y sus certificados son documento público. Para extranjeros sin residencia de larga duración ajenos a la UE y el EEE, la inscripción debe renovarse cada dos años.",
          "El Real Decreto 1155/2024 prevé cinco arraigos (artículo 125): segunda oportunidad, sociolaboral, social, socioformativo y familiar. La autorización dura un año, salvo la de arraigo familiar, que dura cinco. Los requisitos generales del artículo 126 son acumulativos:"
        ],
        "lists": [
          [
            "Estar en España y no ser solicitante de protección internacional.",
            "Dos años de permanencia continuada antes de la solicitud (no se exige en el arraigo familiar).",
            "No tener antecedentes penales en España ni en los países de residencia de los cinco años anteriores.",
            "Haber pagado la tasa y no tener otra autorización ni otro procedimiento de estancia o residencia en curso (letra h, añadida por el RD 316/2026)."
          ]
        ]
      }
    ]
  },
  "/extranjeria/nie": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a2-17",
        "label": "BOE: Real Decreto 1155/2024, artículo 205 (NIE)"
      }
    ],
    "sections": [
      {
        "id": "nie-en-el-reglamento",
        "title": "Qué dice el Reglamento sobre el NIE",
        "paragraphs": [
          "El artículo 205 del Real Decreto 1155/2024 define el NIE como un número personal, único y exclusivo, que debe figurar en todos los documentos que se te expidan. La Dirección General de la Policía lo asigna de oficio cuando inicias un procedimiento para un documento que te habilite a permanecer en España.",
          "Si solo te relacionas con España por intereses económicos, profesionales o sociales, debes pedirlo tú, personalmente, en una Oficina de Extranjería o comisaría, o en un consulado si estás fuera. Además, no puedes estar en situación irregular y debes indicar el motivo. El plazo máximo para resolver es de cinco días; si no hay respuesta, la solicitud se entiende desestimada. Las mismas reglas valen para los certificados de residente y de no residente."
        ]
      }
    ]
  },
  "/extranjeria/huellas-sin-citas-barcelona": {
    "reviewedAt": R,
    "sources": [
      {
        "href": "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24099#a2-21",
        "label": "BOE: Real Decreto 1155/2024, artículo 209 (TIE)"
      }
    ],
    "sections": [
      {
        "id": "plazo-tie",
        "title": "El plazo legal para pedir la TIE",
        "paragraphs": [
          "La toma de huellas es el paso para obtener la tarjeta de identidad de extranjero (TIE). Según el artículo 209 del Real Decreto 1155/2024, quien tiene un visado o una autorización para más de seis meses tiene el derecho y el deber de obtenerla, y debe pedirla personalmente en el plazo de un mes desde la entrada en España o desde que la autorización se concede o empieza a tener efecto.",
          "La TIE es personal e intransferible y acredita tu situación legal. Incumplir las obligaciones sobre la tarjeta puede llevar a sanciones de la Ley Orgánica 4/2000. Si no encuentras cita dentro del mes, guarda las capturas de tus intentos con fecha y hora como prueba de que lo intentaste."
        ]
      }
    ]
  },
};

const APLICADAS = new WeakSet<Guide>();

export function mejorar20261024(g: Guide): Guide {
  const x = MEJORAS_20261024[g.path];
  if (!x || APLICADAS.has(g)) return g;
  APLICADAS.add(g);
  const seen = new Set((g.sources ?? []).map((s) => s.href));
  // Se modifica el objeto original para conservar la identidad (getGuideByPath, listados que importan el array de origen).
  return Object.assign(g, {
    reviewedAt: x.reviewedAt,
    sections: [
      ...g.sections,
      ...x.sections.map((sec): GuideSection => {
        const src = (x.sources ?? [])[0] ?? { href: LOREG, label: "BOE: LOREG" };
        return { ...sec, table: sec.table ? { ...sec.table, rows: sec.table.rows.map((r) => ({ ...r, source: src })) } : undefined };
      }),
    ],
    faqs: [...(g.faqs ?? []), ...(x.faqs ?? [])],
    sources: [...(g.sources ?? []), ...(x.sources ?? []).filter((s) => !seen.has(s.href))],
  });
}
