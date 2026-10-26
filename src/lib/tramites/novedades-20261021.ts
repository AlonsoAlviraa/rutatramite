import type { Guide } from "@/lib/tramites/types";

/** Novedades del 21-10-2026: voto CERA por la «ley de nietos» tras el TC y dos cambios del Real Decreto-ley 31/2026 (BOE-A-2026-21872). Cifras comprobadas en el texto del BOE. */

const RDL = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-21872", label: "BOE-A-2026-21872: Real Decreto-ley 31/2026, de 20 de octubre (BOE de 21 de octubre)" };
const LGSS221 = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a221", label: "BOE: Ley General de la Seguridad Social, artículo 221 (viudedad de parejas de hecho), texto consolidado" };
const RD1618 = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-21500", label: "BOE: Real Decreto 1618/2007, Fondo de Garantía del Pago de Alimentos, texto consolidado" };
const RD1618_ORIG = { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2007-21500", label: "BOE: Real Decreto 1618/2007, texto original (100 €, 18 meses, 5 años de residencia)" };
const SEGSOC = { href: "https://sede.seg-social.gob.es/", label: "Sede electrónica de la Seguridad Social" };
const DISC = "No somos la Administración. Cada cifra enlaza al BOE o a la fuente oficial; si cambia, manda la fuente oficial.";

export const NOVEDADES_20261021_GUIDES: Guide[] = [
  {
    id: "29n-ley-de-nietos-cera",
    pack: "elecciones",
    reviewedAt: "2026-10-21",
    path: "/elecciones/votar-ley-de-nietos-29n",
    h1: "¿Puedo votar el 29-N si me nacionalicé por la «ley de nietos»?",
    title: "Ley de nietos y voto el 29-N: sigue suspendido salvo excepción",
    description: "El voto CERA de los nacionalizados por la Ley de Memoria Democrática sigue suspendido tras el TC (21-10). Excepción: certificado consular de exilio.",
    lead: "Respuesta corta: a 21 de octubre de 2026, no, salvo una excepción. El Tribunal Supremo suspendió de forma cautelar el voto en el CERA de quienes obtuvieron la nacionalidad de origen por la disposición adicional 8.ª de la Ley 20/2022 de Memoria Democrática (autos de 10 de septiembre y 12 de octubre). El 21 de octubre el Tribunal Constitucional inadmitió el recurso de amparo del Defensor del Pueblo por prematuro, así que la suspensión sigue. Sí pueden votar quienes consigan en su consulado una certificación de que su padre, madre, abuelo o abuela sufrió exilio y perdió o renunció a la nacionalidad española.",
    cta: { href: "https://www.exteriores.gob.es/Consulados/santiagodechile/es/Comunicacion/Noticias/Paginas/Articulos/20261013_NOT1.aspx", label: "Exteriores: lo que dice el auto del Supremo (nota consular, 13-10)" },
    secondaryCta: { href: "/elecciones/voto-residentes-extranjero-cera", label: "Cómo se vota desde el extranjero (CERA)" },
    sources: [
      { href: "https://www.exteriores.gob.es/Consulados/santiagodechile/es/Comunicacion/Noticias/Paginas/Articulos/20261013_NOT1.aspx", label: "Exteriores, Consulado General en Santiago de Chile, 13-10-2026: información del Auto 1015/2026 del Tribunal Supremo" },
      { href: "https://www.poderjudicial.es/cgpj/es/Poder-Judicial/Tribunal-Supremo/Noticias-Judiciales/El-Tribunal-Supremo-desestima-el-recurso-de-la-Abogacia-del-Estado-contra-la-medida-cautelar-en-relacion-con-las-inscripciones-en-el-Censo-de-residentes-ausentes-en-el-extranjero", label: "Poder Judicial: el Supremo desestima el recurso de la Abogacía del Estado y mantiene la medida cautelar sobre el CERA" },
      { href: "https://www.defensordelpueblo.es/noticias/recurso-de-amparo-al-tc-voto-nacionalizados/", label: "Defensor del Pueblo, 21-10-2026: respeta la decisión del Pleno del TC sobre su recurso de amparo" },
      { href: "https://www.rtve.es/noticias/20261021/constitucional-voto-ley-nietos/17272287.shtml", label: "RTVE, 21-10-2026: el TC inadmite el recurso por prematuro (10 votos a 2)" },
      { href: "https://elpais.com/espana/elecciones-generales/2026-10-21/tras-la-decision-del-constitucional-sobre-la-ley-de-nietos-sigue-suspendido-el-voto-podran-participar-el-29-n.html", label: "El País, 21-10-2026: ¿sigue suspendido el voto? ¿Podrán participar el 29-N?" },
    ],
    related: [
      { href: "/elecciones/voto-residentes-extranjero-cera", label: "Votar si vives en el extranjero (CERA)" },
      { href: "/elecciones/consultar-censo-electoral", label: "Consultar si estás en el censo electoral" },
      { href: "/elecciones/voto-temporalmente-fuera-erta", label: "Votar si estás fuera una temporada (ERTA)" },
      { href: "/elecciones/calendario-29-noviembre", label: "Calendario electoral del 29-N" },
    ],
    disclaimer: DISC,
    faqs: [
      { q: "¿A quién afecta la suspensión?", a: "A quienes obtuvieron la nacionalidad española de origen por el derecho de opción de la disposición adicional 8.ª.1 (inciso primero) de la Ley 20/2022. Si ya estaban en el CERA, se suspenden los efectos electorales de su inscripción para el 29-N; si no lo estaban, la Oficina del Censo Electoral no puede inscribirlos. Según RTVE, son 163.020 personas." },
      { q: "¿Qué tengo que pedir para poder votar?", a: "Una certificación del Registro Civil Consular de que, a 1 de agosto de 2026, eras hijo o nieto, nacido fuera de España, de un español de origen que sufrió exilio por razones políticas, ideológicas, de creencia o de orientación e identidad sexual y que perdió o renunció a la nacionalidad, sin aplicar la presunción de la Instrucción de la DGSJFP de 25 de octubre de 2022." },
      { q: "¿Qué decidió el Constitucional el 21 de octubre?", a: "Inadmitió el recurso de amparo del Defensor del Pueblo por prematuro, porque el procedimiento sigue abierto en la Sala Tercera del Supremo. No entró en el fondo. Según RTVE, la decisión fue por 10 votos a 2." },
      { q: "¿Puede cambiar antes del 29-N?", a: "Sí. Es una medida cautelar y el Supremo dio a los afectados plazo hasta el 22 de octubre para personarse y alegar, según RTVE y Público. Revisaremos esta página cuando haya una nueva resolución." },
      { q: "¿Me afecta si me nacionalicé por otra vía?", a: "No. La suspensión solo se refiere al derecho de opción de la disposición adicional 8.ª.1 de la Ley de Memoria Democrática. Si eres español por otra vía y estás en el CERA, votas como cualquier residente en el extranjero." },
    ],
    sections: [
      {
        id: "tu-caso",
        title: "Tu caso en una tabla",
        paragraphs: [],
        table: {
          caption: "Voto el 29-N de los nacionalizados por la Ley 20/2022, a 21-10-2026",
          head: ["Situación", "¿Puede votar?", "Fuente"],
          rows: [
            { cells: ["Ya inscrito en el CERA, sin certificación consular de exilio", "No: la inscripción no tiene efectos electorales en estas elecciones"], source: { href: "https://www.exteriores.gob.es/Consulados/santiagodechile/es/Comunicacion/Noticias/Paginas/Articulos/20261013_NOT1.aspx", label: "Auto 1015/2026 (nota consular)" } },
            { cells: ["Aún no inscrito en el CERA", "No: la Oficina del Censo Electoral no puede inscribirle"], source: { href: "https://www.exteriores.gob.es/Consulados/santiagodechile/es/Comunicacion/Noticias/Paginas/Articulos/20261013_NOT1.aspx", label: "Auto 1015/2026 (nota consular)" } },
            { cells: ["Con certificación consular de ascendiente exiliado, a 1-8-2026", "Sí: no rige la suspensión"], source: { href: "https://www.exteriores.gob.es/Consulados/santiagodechile/es/Comunicacion/Noticias/Paginas/Articulos/20261013_NOT1.aspx", label: "Auto 1015/2026 (nota consular)" } },
            { cells: ["Español por otra vía, inscrito en el CERA", "Sí, con el procedimiento normal"], source: { href: "https://www.exteriores.gob.es/es/Paginas/Elecciones.aspx", label: "Exteriores: votar desde el extranjero" } },
          ],
        },
      },
      {
        id: "ejemplo",
        title: "Dos ejemplos",
        paragraphs: [
          "Lucía vive en Buenos Aires y es española desde 2024 por la Ley 20/2022: su abuelo emigró en 1950 por motivos económicos. Su solicitud se tramitó con la presunción de exilio de la Instrucción de 2022. Sin certificación consular de exilio, el 29-N no podrá votar.",
          "Martín vive en México y su abuelo salió de España en 1939 como exiliado republicano y perdió la nacionalidad. Si su consulado le expide la certificación de exilio, a fecha de 1 de agosto de 2026, la suspensión no le afecta y vota por el CERA.",
        ],
      },
      {
        id: "que-hacer",
        title: "Qué puedes hacer ahora",
        paragraphs: [],
        lists: [[
          "Pregunta en tu consulado si te pueden expedir la certificación de exilio de tu ascendiente: la expiden los encargados de los Registros Consulares bajo su responsabilidad.",
          "Si te la dan, comprueba con el consulado que tu inscripción en el CERA queda activa para el 29-N.",
          "Sigue los plazos del voto CERA: envío por correo al consulado hasta el 24 de noviembre o voto en urna del 21 al 26 de noviembre.",
        ]],
      },
    ],
  },
  {
    id: "trabajo-viudedad-pareja-hecho-hijos",
    pack: "trabajo",
    reviewedAt: "2026-10-26",
    path: "/trabajo/pension-viudedad-pareja-de-hecho-con-hijos",
    h1: "Pensión de viudedad si erais pareja de hecho con hijos y no estabais registrados",
    title: "Viudedad sin registrar la pareja de hecho: 2 años y con hijos",
    description: "Desde el 21-10-2026, con hijos en común basta acreditar 2 años de convivencia con el padrón, sin registro (RDL 31/2026). Fallecidos antes: 12 meses.",
    lead: "Respuesta corta: desde el 21 de octubre de 2026, si tenías hijos en común con tu pareja fallecida, ya no hace falta haber inscrito la pareja de hecho en un registro ni ante notario. Basta con acreditar, con el certificado de empadronamiento, al menos dos años de convivencia estable e ininterrumpida justo antes del fallecimiento (Real Decreto-ley 31/2026, que modifica el artículo 221 de la Ley General de la Seguridad Social). Si el fallecimiento fue antes de esa fecha y entonces no pudiste cobrar, tienes 12 meses para pedirla.",
    cta: RDL,
    secondaryCta: SEGSOC,
    sources: [RDL, LGSS221, SEGSOC,
      { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a223", label: "BOE: Ley General de la Seguridad Social, artículo 223.2 (extinción por nuevo matrimonio o pareja de hecho)" },
      { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1967-2876", label: "BOE: Orden de 13 de febrero de 1967, artículo 11 (cuándo se mantiene la viudedad)" }],
    related: [
      { href: "/trabajo/fondo-garantia-pago-alimentos-300-euros", label: "Fondo de Garantía de Alimentos: anticipo de 300 €" },
      { href: "/trabajo/vida-laboral", label: "Descargar la vida laboral" },
      { href: "/trabajo/revalorizacion-pensiones-2026", label: "Subida de las pensiones en 2026" },
      { href: "/empadronarse", label: "Empadronarse: cómo y con qué papeles" },
    ],
    disclaimer: DISC,
    faqs: [
      { q: "¿Desde cuándo se aplica?", a: "Desde el 21 de octubre de 2026, día de su publicación en el BOE (disposición final cuarta del Real Decreto-ley 31/2026)." },
      { q: "¿Qué cambia si no teníamos hijos en común?", a: "Nada. Sin hijos en común siguen haciendo falta cinco años de convivencia y la inscripción en un registro o el documento público con al menos dos años de antelación al fallecimiento." },
      { q: "¿Cómo demuestro los dos años?", a: "Con el certificado de empadronamiento: la norma dice que la convivencia «deberá ser acreditada mediante el correspondiente certificado de empadronamiento». Pide uno histórico o colectivo que muestre que vivíais juntos." },
      { q: "Mi pareja murió en 2025 y me denegaron la pensión. ¿Puedo pedirla?", a: "Sí, si ahora cumples los requisitos: la nueva disposición transitoria 48.ª de la Ley General de la Seguridad Social da 12 meses desde el 21 de octubre de 2026 para pedirla. Se cobra desde el día 1 del mes siguiente a la solicitud, no con atrasos." },
      { q: "¿Pierdo la viudedad si me vuelvo a casar o formo pareja de hecho?", a: "Por regla general, sí: se extingue (artículo 223.2 de la Ley General de la Seguridad Social). Pero la mantienes si cumples a la vez tres condiciones: tener más de 61 años (o menos si cobras una incapacidad permanente absoluta o gran invalidez o tienes una discapacidad del 65 % o más), que la viudedad sea al menos el 75 % de tus ingresos y que los ingresos de la nueva pareja, contando la pensión, no pasen del doble del salario mínimo anual (artículo 11 de la Orden de 13 de febrero de 1967)." },
      { q: "¿Se aplica a funcionarios de Clases Pasivas?", a: "Sí. El Real Decreto-ley hace el mismo cambio en el artículo 38 de la Ley de Clases Pasivas, con su propia disposición transitoria y el mismo plazo de 12 meses." },
    ],
    sections: [
      {
        id: "antes-ahora",
        title: "Antes y ahora",
        paragraphs: [],
        table: {
          caption: "Requisitos para que se reconozca la pareja de hecho a efectos de viudedad (art. 221.2 LGSS)",
          head: ["Requisito", "Con hijos en común", "Sin hijos en común", "Fuente"],
          rows: [
            { cells: ["Convivencia previa al fallecimiento", "2 años ininterrumpidos", "5 años ininterrumpidos"], source: RDL },
            { cells: ["Inscripción en registro o documento público", "No se exige", "Sí, con 2 años de antelación"], source: RDL },
            { cells: ["Cómo se prueba la convivencia", "Certificado de empadronamiento", "Certificado de empadronamiento"], source: RDL },
          ],
        },
      },
      {
        id: "ejemplo",
        title: "Ejemplo",
        paragraphs: [
          "Ana y Jorge vivían juntos en Zaragoza desde marzo de 2023, con una hija nacida en 2024, y nunca se registraron como pareja de hecho. Jorge muere en diciembre de 2026. Ana tiene más de dos años de convivencia en el padrón y una hija en común, así que puede pedir la pensión de viudedad aunque no hubiera registro.",
          "Si Jorge hubiera muerto en mayo de 2026 y a Ana le hubieran denegado la pensión por no estar registrados, Ana puede pedirla ahora dentro de los 12 meses siguientes al 21 de octubre de 2026. La cobraría desde el día 1 del mes siguiente a su nueva solicitud.",
        ],
      },
      {
        id: "nuevo-matrimonio",
        title: "Si te vuelves a casar o formas una nueva pareja de hecho",
        paragraphs: [
          "Por regla general, la pensión de viudedad se acaba si te casas o constituyes una pareja de hecho (artículo 223.2 de la Ley General de la Seguridad Social). La misma ley deja excepciones, que están en el artículo 11 de la Orden de 13 de febrero de 1967. Para mantenerla tienes que cumplir las tres condiciones a la vez:",
        ],
        lists: [[
          "Tener más de 61 años. Si tienes menos, debes cobrar también una pensión de incapacidad permanente absoluta o de gran invalidez, o tener una discapacidad del 65 % o más.",
          "Que la viudedad sea tu principal o única fuente de ingresos: al menos el 75 % de lo que ingresas al año, contando el complemento a mínimos. Se miran los ingresos del año anterior.",
          "Que los ingresos anuales de la nueva pareja, de cualquier tipo y contando la viudedad, no pasen del doble del salario mínimo interprofesional anual vigente.",
        ]],
      },
      {
        id: "nuevo-matrimonio-detalles",
        title: "Qué más debes saber",
        paragraphs: [
          "Si cumples las dos primeras condiciones pero entre los dos superáis ese límite de ingresos, no pierdes la pensión: te la reducen lo justo para no superarlo.",
          "Si tu nueva pareja fallece y eso te da derecho a otra viudedad, no puedes cobrar las dos: tienes que elegir una.",
          "Ejemplo: Carmen tiene 66 años y su única renta es la viudedad. Se casa con Pedro, que no tiene ingresos. Cumple la edad, la viudedad es el 100 % de sus ingresos y, si la pensión no pasa del doble del salario mínimo, la mantiene. Si Pedro cobrara una jubilación y entre los dos superaran ese límite, a Carmen le reducirían la viudedad lo necesario.",
          "Esto vale para las pensiones de la Seguridad Social. Si cobras la viudedad de Clases Pasivas (funcionarios), consulta sus reglas propias.",
        ],
      },
      {
        id: "como-pedirla",
        title: "Cómo pedirla",
        paragraphs: [
          "Se pide al INSS en la sede electrónica de la Seguridad Social o con cita previa. Prepara el certificado de empadronamiento que acredite la convivencia, el certificado de defunción y el libro de familia o el certificado de nacimiento de los hijos en común.",
          "El cambio no toca el resto de requisitos: el fallecido debía cumplir los requisitos de cotización del artículo 219 y siguen aplicándose las condiciones de ingresos para las parejas de hecho del artículo 221.",
        ],
      },
    ],
  },
  {
    id: "trabajo-fondo-garantia-alimentos-300",
    pack: "trabajo",
    reviewedAt: "2026-10-21",
    path: "/trabajo/fondo-garantia-pago-alimentos-300-euros",
    h1: "Fondo de Garantía del Pago de Alimentos: anticipo de hasta 300 € al mes",
    title: "Fondo de Garantía de Alimentos: hasta 300 € al mes por hijo",
    description: "Si no te pagan la pensión de alimentos de tus hijos, el Estado anticipa hasta 300 € al mes por hijo desde el 1-11-2026, sin límite de 18 meses (RDL 31/2026).",
    lead: "Respuesta corta: si el otro progenitor no paga la pensión de alimentos fijada por un juez, el Fondo de Garantía del Pago de Alimentos te adelanta hasta 300 € al mes por hijo (antes, 100 €). Lo cobras mientras exista la obligación de alimentos, no solo 18 meses como antes. La nueva cuantía se aplica desde el 1 de noviembre de 2026, y quien ya lo cobra no tiene que pedir nada: se revisa de oficio. Lo fija el Real Decreto-ley 31/2026, que modifica el Real Decreto 1618/2007.",
    cta: RDL,
    secondaryCta: RD1618,
    sources: [RDL, RD1618, RD1618_ORIG],
    related: [
      { href: "/trabajo/pension-viudedad-pareja-de-hecho-con-hijos", label: "Viudedad de parejas de hecho con hijos" },
      { href: "/trabajo/ingreso-minimo-vital", label: "Ingreso mínimo vital" },
      { href: "/ayudas-por-gobierno", label: "Ayudas según cada gobierno" },
      { href: "/trabajo", label: "Trámites de trabajo y Seguridad Social" },
    ],
    disclaimer: DISC,
    faqs: [
      { q: "¿Cuánto me adelantan?", a: "La cantidad que fijó el juez, con un máximo de 300 € al mes por cada hijo (artículo 8.3 del Real Decreto 1618/2007, en la redacción del Real Decreto-ley 31/2026). Si el juez fijó menos, cobras lo que fijó el juez." },
      { q: "Ya cobro 100 €. ¿Tengo que volver a pedirlo?", a: "No. El órgano gestor revisa de oficio los anticipos vigentes a 21 de octubre de 2026, y la nueva cuantía se aplica desde el primer día del mes siguiente: el 1 de noviembre de 2026 (disposición transitoria segunda)." },
      { q: "Lo pedí y aún no me han contestado. ¿Qué cuantía me toca?", a: "La nueva. Las solicitudes pendientes de resolver se resuelven con el máximo de 300 € (disposición transitoria segunda, apartado 3)." },
      { q: "¿Sigue habiendo un máximo de 18 meses?", a: "No. Ahora se cobra mientras exista la obligación de alimentos, sin perjuicio de las causas de extinción del artículo 22 (artículo 9 nuevo)." },
      { q: "¿Qué cambia para hijos extranjeros?", a: "Para menores de fuera de la Unión Europea, basta con residir legalmente en España los dos años inmediatamente anteriores a la solicitud; antes eran cinco años, dos de ellos inmediatamente anteriores. Si quien tiene la custodia es español, basta con que el menor resida legalmente en España." },
    ],
    sections: [
      {
        id: "antes-ahora",
        title: "Qué cambia",
        paragraphs: [],
        table: {
          caption: "Fondo de Garantía del Pago de Alimentos: antes y después del Real Decreto-ley 31/2026",
          head: ["Concepto", "Antes", "Ahora", "Fuente"],
          rows: [
            { cells: ["Anticipo máximo por hijo", "100 € al mes", "300 € al mes (desde el 1-11-2026)"], source: RDL },
            { cells: ["Duración máxima", "18 meses", "Mientras exista la obligación de alimentos"], source: RDL },
            { cells: ["Residencia de menores no UE", "5 años, 2 inmediatamente anteriores", "2 años inmediatamente anteriores"], source: RDL },
            { cells: ["Límite de ingresos de la familia", "IPREM × 1,5 con un hijo, +0,25 por cada hijo más", "SMI × 1,75 con un hijo, +0,25 por cada hijo más"], source: RDL },
          ],
        },
      },
      {
        id: "ejemplo",
        title: "Ejemplo",
        paragraphs: [
          "Marta tiene dos hijos y una sentencia que obliga al padre a pagar 250 € al mes por cada uno, pero lleva meses sin pagar. Con las reglas nuevas, el Fondo puede adelantarle 250 € por hijo, 500 € al mes en total, porque los 250 € no superan el máximo de 300 € por hijo. Con las anteriores, le adelantaban 100 € por hijo durante 18 meses como mucho.",
          "Para el límite de ingresos con dos hijos, el coeficiente es 2: los ingresos anuales de la unidad familiar no pueden superar el doble del SMI vigente cuando se pide el anticipo (artículo 6).",
        ],
      },
      {
        id: "requisitos",
        title: "Requisitos básicos",
        paragraphs: [],
        lists: [[
          "Una resolución judicial que reconozca el derecho de alimentos y que esté impagada.",
          "Que el beneficiario sea menor de edad: español, de otro país de la UE residente en España o, si es de fuera de la UE, con residencia legal (artículo 4).",
          "Que los ingresos anuales de la unidad familiar no superen el SMI multiplicado por el coeficiente que corresponda (1,75 con un hijo, 2 con dos, 2,25 con tres…).",
          "Lo gestiona el Ministerio de Inclusión, Seguridad Social y Migraciones, a través de la Dirección General de Ordenación de la Seguridad Social.",
        ]],
      },
    ],
  },
];
