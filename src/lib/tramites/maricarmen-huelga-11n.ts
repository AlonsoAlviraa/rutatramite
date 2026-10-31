import type { Guide } from "@/lib/tramites/types";

/** 22-10-2026 · Caso Maricarmen (vivienda) y huelga general del 11-N (derechos por perfil). Hechos atribuidos a su fuente; partidos por votos de 2023; sin adjetivos. */
const ELPAIS = { href: "https://elpais.com/espana/madrid/2026-10-07/cronologia-del-caso-maricarmen-de-cuatro-intentos-de-desahucio-a-un-movimiento-nacional-por-la-vivienda.html", label: "El País, 7-10-2026: cronología del caso Maricarmen" };
const BBC = { href: "https://www.bbc.com/mundo/articles/c5djvg3nvj7yo", label: "BBC Mundo, 7-10-2026: muere Maricarmen Abascal" };
const MIN20 = { href: "https://www.20minutos.es/nacional/maricarmen-una-vida-entre-las-paredes-sainz-baranda-secretaria-jubilada-ser-desahuciada-sus-87-anos_7046288_0.html", label: "20minutos: Maricarmen, de secretaria jubilada a desahuciada a los 87 años" };
const OKD = { href: "https://okdiario.com/espana/maricarmen-fue-administradora-unica-luego-consejera-empresa-dedicada-inversion-inmuebles-explotacion-alquileres-20602568", label: "OKDIARIO, 22-10-2026: cargos de Maricarmen en FIEBA S.A. y JINUR S.A. (Registro Mercantil)" };
const TM = { href: "https://www.telemadrid.es/programas/telenoticias-1/Maricarmen-fue-inversora-inmobiliaria-segun-OKDiario-2-2937026283--20261022023446.html", label: "Telemadrid, 22-10-2026: la información de OKDIARIO" };
const RDL29 = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-20823", label: "BOE: Real Decreto-ley 29/2026, de 6 de octubre (función social de la vivienda), en vigor desde el 8-10-2026" };
const MONCLOA = { href: "https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/vivienda-agenda-urbana/paginas/2026/decreto-vivienda-medidas.aspx", label: "La Moncloa, 8-10-2026: medidas del decreto de vivienda" };
const MIVAU = { href: "https://www.mivau.gob.es/vivienda/medidas-urgentes-por-la-vivienda", label: "Ministerio de Vivienda: medidas urgentes por la vivienda" };
const LEC = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2000-323", label: "BOE: Ley de Enjuiciamiento Civil (art. 441.7, vulnerabilidad en desahucios)" };
const JG = { href: "https://www.mjusticia.gob.es/es/ciudadania/tramites/asistencia-juridica-gratuita", label: "Ministerio de Justicia: asistencia jurídica gratuita" };

const CE = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a28", label: "BOE: Constitución, artículo 28.2 (derecho de huelga)" };
const RDL17 = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1977-6061", label: "BOE: Real Decreto-ley 17/1977, sobre relaciones de trabajo (huelga)" };
const STC11 = { href: "https://hj.tribunalconstitucional.es/es-ES/Resolucion/Show/11", label: "Tribunal Constitucional: STC 11/1981, de 8 de abril" };
const TREBEP = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719#a15", label: "BOE: Estatuto Básico del Empleado Público, artículo 15" };
const ET = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a11", label: "BOE: Estatuto de los Trabajadores, artículo 11 (contrato formativo)" };
const LODE = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-12978#a8", label: "BOE: Ley Orgánica 8/1985 (LODE), artículo 8" };
const SMI = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-3815", label: "BOE: Real Decreto 126/2026, salario mínimo interprofesional para 2026" };
const UGT = { href: "https://www.ugt.es/ugt-registra-la-convocatoria-de-huelga-general-del-11-de-noviembre-para-reclamar-soluciones-la", label: "UGT, 19-10-2026: registro de la convocatoria de huelga general del 11-N" };
const HPV = { href: "https://huelgaporlavivienda.org/", label: "Sindicato de Inquilinas: huelgaporlavivienda.org" };
const EDIARIO = { href: "https://www.eldiario.es/economia/sindicatos-mayoritarios-minoritarios-mano-inquilinas-paro-general-11n-huelga-gente_1_13596026.html", label: "elDiario.es, 19-10-2026: registro del paro en el Ministerio de Trabajo" };
const RTVE = { href: "https://www.rtve.es/noticias/20261014/estudiantes-huelga-general-11-noviembre/17266929.shtml", label: "VerificaRTVE, 14-10-2026: ¿pueden hacer huelga los estudiantes el 11-N?" };
const SE = { href: "https://www.sindicatodeestudiantes.net/index.php/noticias/movimiento-estudiantil/a-la-huelga-general", label: "Sindicato de Estudiantes: convocatoria del 11-N en institutos y universidades" };
const STC40 = { href: "https://www.boe.es/boe/dias/2026/06/24/pdfs/BOE-A-2026-13752.pdf", label: "BOE: STC 40/2026 (anula el mandato del RDL 32/2021 para el Estatuto del Becario)" };
const LGSS = { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724", label: "BOE: Ley General de la Seguridad Social (disposición adicional 52.ª, prácticas formativas)" };

const FESMC = { href: "https://www.fesmcugt.org/noticias/actualidad/ricardo-casas-los-servicios-minimos-en-el-transporte-tienen-que-garantizar-lo-esencial-no-garantizar-la-normalidad", label: "FeSMC-UGT, 22-10-2026: UGT y CCOO presentan a Transportes su propuesta de servicios mínimos" };

const MITMA = { href: "https://www.transportes.gob.es/transporte-terrestre/resoluciones-de-servicios-minimos-ferroviarios", label: "Ministerio de Transportes: resoluciones de servicios mínimos ferroviarios (consultado el 26-10-2026)" };

const row = (cells: string[], source: { href: string; label: string }) => ({ cells, source });

export const MARICARMEN_HUELGA_GUIDES: Guide[] = [
  {
    id: "alquiler-caso-maricarmen",
    pack: "alquiler",
    reviewedAt: "2026-10-22",
    path: "/alquiler/caso-maricarmen-desahucio",
    h1: "Caso Maricarmen: qué pasó, quién era y qué ha cambiado para los inquilinos",
    title: "Caso Maricarmen: cronología, quién era y qué cambió",
    description: "Maricarmen Abascal, 87 años, desahuciada en Retiro el 23-9-2026 y fallecida el 7-10. Cronología, qué dice el decreto de vivienda en vigor y qué hacer si te van a desahuciar.",
    lead: "Respuesta corta: Maricarmen Abascal, de 87 años, fue desahuciada el 23 de septiembre de 2026 del piso de la calle Alcalde Sainz de Baranda (Retiro, Madrid) en el que vivía desde que su padre lo alquiló en 1956. Era el cuarto intento de desahucio. El 28 de septiembre la propietaria, Urbagestión, aceptó un contrato de ocho años, pero ella murió el 7 de octubre en el hospital Gregorio Marañón antes de volver. Su caso precedió a la acampada de Sol, a la votación de dos decretos de vivienda que el Congreso rechazó el 1 de octubre y al adelanto electoral al 29-N. Desde el 8 de octubre está en vigor el Real Decreto-ley 29/2026, que suspende hasta 2030 ciertos desahucios de personas vulnerables sin alternativa habitacional.",
    cta: RDL29,
    secondaryCta: { href: "/elecciones/promesas/que-propone-cada-partido-vivienda", label: "Qué propone cada partido sobre vivienda el 29-N" },
    sources: [ELPAIS, BBC, MIN20, OKD, TM, RDL29, MONCLOA, MIVAU, LEC, JG],
    related: [
      { href: "/trabajo/huelga-general-11-noviembre", label: "Huelga general del 11-N: tus derechos según tu situación" },
      { href: "/alquiler/decretos-vivienda-derogados-octubre-2026", label: "Los decretos de vivienda derogados en octubre" },
      { href: "/elecciones/promesas/que-propone-cada-partido-vivienda", label: "Vivienda: qué propone cada partido" },
      { href: "/alquiler/ayudas-por-comunidad", label: "Ayudas al alquiler por comunidad" },
    ],
    disclaimer: "Esta página resume lo publicado por los medios citados y el BOE; no es asesoramiento jurídico. Ante un desahucio, pide abogado de oficio cuanto antes.",
    faqs: [
      { q: "¿Quién era Maricarmen?", a: "María del Carmen Abascal, nacida en 1938, vivía en el mismo piso de Retiro desde 1956. Según la BBC trabajó 32 años como secretaria en una empresa farmacéutica y se jubiló en 1998; 20minutos precisa que fue secretaria del consejo de administración y auxiliar administrativa de esa empresa. Su pensión era de unos 1.400 € al mes." },
      { q: "¿Es verdad que trabajó en una empresa inmobiliaria?", a: "OKDIARIO publicó el 22 de octubre de 2026, a partir del Registro Mercantil de Madrid, que fue administradora única de FIEBA S.A. y, del 1 de julio de 1994 al 1 de julio de 1995, consejera y vicesecretaria del consejo de JINUR S.A., cuyo objeto social era invertir en inmuebles y alquilarlos. Ese mismo diario indica que los documentos no aclaran si tenía acciones. No consta un desmentido ni una confirmación de otras fuentes a 22 de octubre." },
      { q: "¿Por qué la desahuciaron si pagaba el alquiler?", a: "Según El País, la Audiencia Provincial de Madrid sentenció en 2022 que la segunda subrogación de un contrato de renta antigua (del padre a la madre y de la madre a ella) solo duraba dos años salvo discapacidad del 65 %. El Supremo no admitió el recurso y la sentencia quedó firme. Ella siguió pagando unos 500 € al mes." },
      { q: "¿Qué cambió el decreto de vivienda?", a: "El Real Decreto-ley 29/2026 (BOE del 7-10, en vigor el 8-10) suspende hasta el 31-12-2030 los desahucios de personas vulnerables sin alternativa habitacional cuando quien demanda es una entidad que compra inmuebles o carteras de préstamos impagados. Con otros propietarios, la suspensión dura como máximo tres años, con revisión, y puede haber compensación. En impagos, la comunidad autónoma tiene dos meses para dar alternativa o pagar la deuda." },
      { q: "¿Este decreto habría parado el desahucio de Maricarmen?", a: "No se puede afirmar. Depende de si el juez la considerase vulnerable sin alternativa y del tipo de demandante, y su caso no era por impago sino por extinción del contrato. Ningún tribunal se ha pronunciado sobre ello." },
      { q: "¿Qué partidos votaron contra los decretos del 1 de octubre?", a: "Según El País, PP, Vox y Junts votaron en contra de los dos decretos, que no salieron adelante." },
    ],
    sections: [
      {
        id: "cronologia",
        title: "Cronología del caso",
        paragraphs: ["Fechas según la cronología de El País (7-10-2026), salvo donde se indica otra fuente."],
        table: {
          caption: "Del contrato de 1956 al decreto de vivienda",
          head: ["Fecha", "Qué pasó", "Fuente"],
          rows: [
            row(["1956", "Su padre alquila un sexto piso en Alcalde Sainz de Baranda, 46 (Retiro). Al morir él, el contrato pasa a la madre."], ELPAIS),
            row(["2005", "Muere la madre y el contrato pasa a Maricarmen, entonces de 66 años; paga unos 500 € entre renta y gastos."], ELPAIS),
            row(["2018-2020", "El País sitúa la compra por Urbagestión Desarrollo e Inversión S.L. en 2018; la BBC dice que en 2018 compró Renta Corporación, que le ofreció el piso por 247.000 €, y que lo vendió a Urbagestión en 2020."], BBC),
            row(["2020", "La propietaria le comunica que debe dejar la vivienda: considera que la segunda subrogación solo valía dos años."], ELPAIS),
            row(["2020-2024", "El juzgado le da la razón; la Audiencia Provincial, en sentencia de 30-6-2022, no. El Supremo no admite el recurso. La empresa le ofrece un alquiler de unos 1.600 € (El País; la BBC cita 2.650 € y después 1.650 €)."], ELPAIS),
            row(["Otoño 2025 y verano 2026", "Tres intentos de desahucio suspendidos tras movilizaciones vecinales; entre ellos, una petición de la ONU para frenar el lanzamiento."], ELPAIS),
            row(["23-9-2026", "Cuarto intento: sale en silla de ruedas y la trasladan en camilla al hospital Gregorio Marañón."], ELPAIS),
            row(["26-9-2026", "Manifestación en Madrid y primeras tiendas de la acampada en la Puerta del Sol."], ELPAIS),
            row(["28-9-2026", "Acuerdo entre Urbagestión, su abogada, el Sindicato de Inquilinas y el Ayuntamiento: contrato de ocho años con renta similar a la anterior."], ELPAIS),
            row(["1-10-2026", "El Congreso rechaza los dos decretos de vivienda (votan en contra PP, Vox y Junts). El Sindicato de Inquilinas pide una huelga general."], ELPAIS),
            row(["5-10-2026", "El presidente del Gobierno anuncia elecciones el 29 de noviembre. UGT y CCOO se suman a la huelga general del 11 de noviembre."], ELPAIS),
            row(["7-10-2026", "Maricarmen muere en el Gregorio Marañón. Iba a firmar el contrato el 8 de octubre; el 2 de noviembre habría cumplido 88 años."], ELPAIS),
            row(["8-10-2026", "Entra en vigor el Real Decreto-ley 29/2026 sobre la función social de la vivienda."], RDL29),
          ],
        },
      },
      {
        id: "quien-era",
        title: "Quién era Maricarmen",
        paragraphs: [
          "María del Carmen Abascal Martín vivió casi toda su vida en el mismo piso de Retiro. La BBC escribe que «trabajó durante 32 años como secretaria en una empresa farmacéutica y se jubiló en 1998». 20minutos añade que estudió taquimecanografía y secretariado y que en esa empresa fue secretaria del consejo de administración y auxiliar administrativa; también señala que no hay pruebas de que fuera funcionaria, versión que circuló en redes. Ningún medio consultado da el nombre de la farmacéutica.",
          "El 22 de octubre de 2026, OKDIARIO publicó, con notas del Registro Mercantil de Madrid, que fue administradora única de FIEBA S.A. durante varios años y que el 1 de julio de 1994 fue nombrada consejera de JINUR S.A., sociedad dedicada a «inversiones en bienes inmuebles y su explotación en forma de arrendamiento», de cuyo consejo fue vicesecretaria hasta el 1 de julio de 1995. Según ese diario, JINUR tenía en 1994 un capital de 950 millones de pesetas y se integró en 2000 en BASCADI S.A. OKDIARIO recoge que esos cargos no permiten saber si tenía acciones. Telemadrid se hizo eco de la información citándola como de OKDIARIO. A 22 de octubre no hemos encontrado una respuesta de su familia, su abogada o el Sindicato de Inquilinas.",
          "Cuando murió, la BBC señaló que las causas del fallecimiento no se conocían. Su abogada, Beatriz Duro, dijo en la SER que hace un año «caminaba, cantaba y era completamente autónoma» y que su salud se deterioró durante el proceso (BBC).",
        ],
      },
      {
        id: "que-cambia",
        title: "Qué cambió para los inquilinos: el Real Decreto-ley 29/2026",
        paragraphs: ["Publicado en el BOE del 7 de octubre de 2026 y en vigor desde el 8. Lo esencial sobre desahucios, según el propio texto y la nota de La Moncloa:"],
        lists: [[
          "Si quien desahucia es una entidad que compra inmuebles o carteras de préstamos hipotecarios impagados, el juzgado suspende el procedimiento hasta el 31-12-2030 si la persona es vulnerable y no tiene alternativa habitacional (artículo 2.1).",
          "Con otros propietarios, la suspensión dura como máximo tres años desde que se acuerda, con revisión periódica, si además la Administración no ha ofrecido vivienda. Si el propietario es persona física o una entidad de alquiler asequible, la Administración le compensa la renta, los suministros y las costas (artículo 2.2).",
          "No se suspende si el propietario acredita que también es vulnerable y tiene dos viviendas o menos.",
          "En desahucios por impago de inquilinos vulnerables, la comunidad autónoma tiene dos meses para ofrecer alternativa o pagar la deuda (enervación extraordinaria); mientras, el proceso queda suspendido.",
          "La vulnerabilidad se acredita con informe de los servicios sociales y la valora el juez con los criterios del artículo 441.7 de la Ley de Enjuiciamiento Civil (por ejemplo, alquiler y suministros por encima del 30 % de los ingresos e ingresos inferiores a 3 veces el IPREM, con límites mayores en algunos casos).",
        ]],
      },
      {
        id: "partidos",
        title: "Qué proponen los partidos sobre vivienda y desahucios",
        paragraphs: [
          "Orden por votos en las generales de 2023. El PP propone en su «Contrato con España» un millón de viviendas y una ley para desalojar a ocupantes ilegales en 48 horas, que aprobaría en sus primeros 100 días (pp.es, 21-10-2026). El PSOE, que gobierna con Sumar, aprobó el Real Decreto-ley 29/2026. Las propuestas de Vox, Sumar, Podemos y el resto, con su fuente y fecha, están en el comparador de vivienda, que actualizamos cada día.",
        ],
      },
      {
        id: "que-hacer",
        title: "Si te van a desahuciar: qué hacer",
        paragraphs: ["Ejemplo: Ana, 70 años, recibe la notificación de lanzamiento de un fondo propietario. Pide cita urgente en servicios sociales de su ayuntamiento para el informe de vulnerabilidad, solicita abogado de oficio y, con ese informe, pide al juzgado la suspensión del artículo 2 del Real Decreto-ley 29/2026."],
        lists: [[
          "No ignores la notificación del juzgado: los plazos para contestar u oponerse son cortos.",
          "Pide asistencia jurídica gratuita (abogado de oficio) en tu Colegio de Abogados o en el juzgado.",
          "Acude a los servicios sociales de tu ayuntamiento y pide un informe de vulnerabilidad para el juzgado.",
          "Si debes rentas, pregunta en el juzgado por la enervación: pagar lo debido para que el contrato siga.",
          "Consulta en tu comunidad autónoma las ayudas al alquiler y los programas de vivienda de emergencia.",
        ]],
      },
    ],
  },
  {
    id: "trabajo-huelga-general-11n",
    pack: "trabajo",
    reviewedAt: "2026-10-26",
    path: "/trabajo/huelga-general-11-noviembre",
    h1: "Huelga general del 11 de noviembre: tus derechos si eres trabajador, funcionario, autónomo, becario o estudiante",
    title: "Huelga general 11-N: derechos, descuento y servicios mínimos",
    description: "Huelga general del 11-11-2026 por la vivienda y los salarios: quién la convoca, horario y qué derechos tienes según seas asalariado, funcionario, autónomo, becario o estudiante. Ejemplos de descuento.",
    lead: "Respuesta corta: la huelga general es el miércoles 11 de noviembre de 2026, 24 horas. La registraron el 19 de octubre en el Ministerio de Trabajo UGT y CCOO junto con CGT, CNT, Co.Bas, Intersindical, la Unión de Actores y Actrices, Solidaridad Obrera y la Confederación de Sindicatos de Inquilinas (UGT). Si trabajas por cuenta ajena, hacer huelga es un derecho fundamental (artículo 28.2 de la Constitución): no te pueden despedir ni sancionar, no tienes que avisar a la empresa y solo pierdes el salario de ese día. Los funcionarios también pueden. Los autónomos y los becarios sin contrato no tienen derecho de huelga laboral, y los estudiantes desde 3.º de ESO pueden no ir a clase sin sanción si la decisión es colectiva y se comunica al centro.",
    cta: RDL17,
    secondaryCta: { href: "/alquiler/caso-maricarmen-desahucio", label: "El caso Maricarmen, origen de la movilización" },
    sources: [UGT, FESMC, MITMA, EDIARIO, HPV, CE, RDL17, STC11, TREBEP, ET, LGSS, STC40, LODE, RTVE, SE, SMI],
    related: [
      { href: "/alquiler/caso-maricarmen-desahucio", label: "Caso Maricarmen: cronología y qué cambió" },
      { href: "/trabajo/vida-laboral", label: "Vida laboral: cómo pedirla" },
      { href: "/elecciones/salario-minimo-1800-euros", label: "Salario mínimo: propuestas del 29-N" },
      { href: "/trabajo", label: "Trámites de trabajo y Seguridad Social" },
    ],
    disclaimer: "Los servicios mínimos de cada sector los fija la autoridad competente en los días previos; consulta tu convenio y al comité de empresa.",
    faqs: [
      { q: "¿Hay ya servicios mínimos para la huelga del 11-N?", a: "A 26-10-2026 no se han publicado. UGT y CCOO presentaron el 22-10 al Ministerio de Transportes su propuesta para el transporte; cada administración fija los suyos y suelen conocerse en los días previos." },
      { q: "¿Me pueden despedir por hacer huelga el 11-N?", a: "No. El artículo 6.1 del Real Decreto-ley 17/1977 dice que ejercer el derecho de huelga no extingue el contrato ni puede dar lugar a sanción, salvo que el trabajador incurra en falta laboral durante ella. Un despido por secundarla sería nulo por vulnerar un derecho fundamental." },
      { q: "¿Tengo que avisar a mi empresa de que voy a hacer huelga?", a: "No. El preaviso lo dan los convocantes (5 días, o 10 en servicios públicos, artículo 4 del Real Decreto-ley 17/1977). El trabajador no tiene que comunicar antes si la secunda." },
      { q: "¿Cuánto me descuentan?", a: "El salario del día y la parte proporcional de pagas extra y descanso semanal. Una forma de calcularlo es dividir el salario anual bruto entre 365. Con 1.800 € brutos en 14 pagas (25.200 € al año) son unos 69,04 €; con el salario mínimo de 2026 (1.221 € en 14 pagas, 17.094 € al año), unos 46,83 €. Las vacaciones no se tocan." },
      { q: "¿Y la cotización?", a: "Durante la huelga estás en situación de alta especial en la Seguridad Social (artículo 6.3 del Real Decreto-ley 17/1977): no se cotiza ese día, pero no causas baja." },
      { q: "¿Pueden contratar a alguien para sustituirme?", a: "No. El artículo 6.5 del Real Decreto-ley 17/1977 prohíbe sustituir a los huelguistas por trabajadores que no estuvieran vinculados a la empresa al comunicarse la huelga." },
      { q: "Estoy de becario, ¿puedo hacer huelga?", a: "Depende. Con contrato formativo eres trabajador y tienes derecho de huelga. Si haces prácticas curriculares o extracurriculares con beca, no hay relación laboral: no tienes derecho de huelga laboral, aunque coticen por ti desde 2024. El Estatuto del Becario no llegó a aprobarse: el proyecto decayó con la disolución de las Cortes." },
      { q: "¿Pueden los estudiantes hacer huelga?", a: "No es una huelga laboral, sino el derecho a decidir colectivamente no ir a clase (artículo 8 de la LODE). Desde 3.º de ESO no es falta ni se sanciona si se comunica antes a la dirección; el Supremo (18-12-2014) dijo que no requiere autorización de los padres. En 1.º y 2.º de ESO decide la familia según las normas del centro." },
    ],
    sections: [
      {
        id: "convocatoria",
        title: "Quién convoca, cuándo y por qué",
        paragraphs: [
          "Fecha: miércoles 11 de noviembre de 2026, 24 horas. Convocantes registrados en el Ministerio de Trabajo el 19-10-2026, según UGT: UGT, CCOO, CGT, CNT, Co.Bas, Intersindical, la Unión de Actores y Actrices, Solidaridad Obrera y la Confederación de Sindicatos de Inquilinas. elDiario.es cita también el apoyo de ELA y LAB en Euskadi y de la CIG en Galicia.",
          "Motivos, tal como los exponen los convocantes: UGT pide control de los precios del alquiler, protección frente a desahucios, frenar la concentración de vivienda en fondos de inversión y vivienda protegida en alquiler, además de una subida de al menos el 7 % del salario mínimo para 2027, desbloquear la negociación colectiva y reducir la jornada. El Sindicato de Inquilinas, que había pedido la huelga el 1 de octubre tras el rechazo de los decretos de vivienda, resume sus motivos en huelgaporlavivienda.org: vivienda, salarios y pensiones, jornada y servicios públicos.",
          "Según la BBC y El País, la convocatoria nace tras el desahucio de Maricarmen Abascal y la acampada de Sol.",
        ],
      },
      {
        id: "perfiles",
        title: "Tus derechos según tu situación",
        paragraphs: [],
        table: {
          caption: "Huelga del 11-N: qué puedes hacer y qué pasa",
          head: ["Perfil", "¿Derecho de huelga?", "Qué pasa", "Fuente"],
          rows: [
            row(["Trabajador por cuenta ajena", "Sí, derecho fundamental", "Contrato suspendido ese día: sin salario ni cotización, sin sanción ni despido. No hay que avisar. Prohibido sustituirte."], RDL17),
            row(["Funcionario o personal laboral público", "Sí (artículo 15 del EBEP)", "Descuento proporcional del día, sin carácter de sanción. Si te designan para servicios mínimos, debes cumplirlos."], TREBEP),
            row(["Servicios mínimos", "Obligatorios para los designados", "Los fija la autoridad gubernativa en servicios esenciales; la empresa solo nombra a quién los cubre. El TC exige que sean proporcionados (STC 11/1981)."], STC11),
            row(["Autónomo", "No (no es trabajador por cuenta ajena)", "Puede cerrar su negocio de forma voluntaria en apoyo; pierde los ingresos del día y sigue pagando su cuota."], CE),
            row(["Becario con contrato formativo", "Sí", "Es trabajador: mismos derechos que el resto de la plantilla."], ET),
            row(["Becario en prácticas curriculares o extracurriculares", "No hay derecho de huelga laboral", "No hay contrato de trabajo. La ausencia se rige por el convenio de prácticas y las normas de su centro. Cotizar (desde 2024) no le convierte en trabajador."], LGSS),
            row(["Estudiante de 3.º de ESO en adelante", "Inasistencia colectiva", "No es falta ni sanción si la decisión es colectiva y se comunica antes a la dirección. Cada comunidad y centro concreta el procedimiento."], LODE),
            row(["Estudiante de 1.º o 2.º de ESO o primaria", "No por sí mismo", "Decide la familia según las normas del centro; quien vaya a clase tiene derecho a recibirla."], RTVE),
          ],
        },
      },
      {
        id: "servicios-minimos",
        title: "Servicios mínimos del 11-N: estado a 26 de octubre",
        paragraphs: [
          "A 26-10-2026 no se ha publicado ninguna resolución oficial de servicios mínimos para el 11-N: la página de resoluciones ferroviarias del Ministerio de Transportes no recoge ninguna para esa fecha. Los fija cada administración competente (el Ministerio de Transportes en el transporte estatal, las comunidades autónomas en sus servicios) y suelen publicarse en los días previos a la huelga.",
          "Referencia reciente: para las huelgas generales del 15 de octubre de 2025, el Ministerio de Transportes firmó las resoluciones de servicios mínimos ferroviarios (Renfe, Ouigo, Iryo y empresas auxiliares) el 13 de octubre de 2025, dos días antes del paro. Si se repite ese calendario, las del 11-N llegarían hacia el 9 de noviembre.",
          "El 22-10-2026, FeSMC-UGT y FSC-CCOO presentaron al Ministerio de Transportes y Movilidad Sostenible su propuesta de servicios mínimos para el transporte. Según FeSMC-UGT, piden que sean proporcionados y que garanticen los servicios esenciales sin impedir el seguimiento de la huelga.",
          "Si tu empresa te designa para cubrir servicios mínimos, debes acudir; si no te designa, puedes hacer huelga con normalidad. Esta sección se actualizará cuando se publiquen las resoluciones.",
        ],
      },
      {
        id: "descuento",
        title: "Cuánto te descuentan: ejemplos",
        paragraphs: [
          "Al suspenderse el contrato, no cobras el día ni su parte de pagas extra y descanso semanal. Las vacaciones no se reducen. Cálculo aproximado: salario bruto anual (con pagas extra) entre 365.",
          "Ejemplo 1: Laura cobra 1.800 € brutos en 14 pagas, 25.200 € al año. 25.200 / 365 = 69,04 € menos en su nómina de noviembre (o repartido entre nómina y paga extra si no está prorrateada).",
          "Ejemplo 2: Javier cobra el salario mínimo de 2026, 1.221 € en 14 pagas: 17.094 € / 365 = 46,83 €.",
          "Ejemplo 3: Marta trabaja a media jornada por 750 € en 12 pagas con extras prorrateadas: 9.000 € / 365 = 24,66 €.",
          "Tu convenio puede fijar otra fórmula de cálculo; la nómina debe reflejar el descuento como ausencia por huelga.",
        ],
      },
      {
        id: "piquetes",
        title: "Piquetes y libertad de trabajo",
        paragraphs: [
          "Los huelguistas pueden informar y hacer publicidad de la huelga de forma pacífica (artículo 6.6 del Real Decreto-ley 17/1977). También debe respetarse la libertad de trabajo de quien no quiera secundarla (artículo 6.4). Impedir trabajar con violencia o intimidación es delito.",
        ],
      },
    ],
  },
];
