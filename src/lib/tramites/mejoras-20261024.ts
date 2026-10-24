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
