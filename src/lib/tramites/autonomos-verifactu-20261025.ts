import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Verifactu y cambio de base de autónomos 2027 (25-10-2026).
 * Verificado el 25-10-2026 en el BOE: RD 1007/2023 (texto consolidado, última modificación RD-ley 15/2025, publicada el 03-12-2025):
 * art. 3 (ámbito; excluidos los del SII, art. 62.6 RIVA) y DF 4.ª (sociedades antes del 1-1-2027; resto antes del 1-7-2027).
 * LGT art. 201 bis (150.000 € y 1.000 € fabricantes; 50.000 € por ejercicio tenencia). Nota de Hacienda 05-10-2026 (previsión octubre 2028).
 * Orden PJC/297/2026 art. 18 (tablas 2026, tipos 28,30 + 1,30 + 0,90 MEI; cese 0,90; FP 0,10). RD 2064/1995 art. 45 (6 cambios y plazos).
 * LGSS art. 308 (deducción 7 % / 3 %), DT MEI (1 % en 2027). Ley 20/2007 art. 38 ter (cuota reducida). Tablas 2027: no publicadas a 25-10-2026.
 * Pendiente de revisar a diario: BOE (Verifactu y tablas RETA 2027).
 */

const R = "2026-10-25";
const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });

const S = {
  rd1007: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840", label: "BOE: Real Decreto 1007/2023 (Reglamento Verifactu), texto consolidado" },
  df4: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2023-24840#dfcuarta", label: "BOE: RD 1007/2023, disposición final 4.ª (plazos de 2027)" },
  rdl15: { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2025-24446", label: "BOE: Real Decreto-ley 15/2025 (traslada los plazos a 2027)" },
  nota: { href: "https://www.hacienda.gob.es/sgt/gabsehacienda/nota-informativa-verifactu.pdf", label: "Ministerio de Hacienda, nota del 5-10-2026: previsión de aplazamiento a octubre de 2028" },
  aeat: { href: "https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu.html", label: "Agencia Tributaria: Sistemas informáticos de facturación y VERI*FACTU" },
  lgt: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186#a201bis", label: "BOE: Ley General Tributaria, artículo 201 bis (sanciones)" },
  spfe: { href: "https://sede.agenciatributaria.gob.es/Sede/todas-noticias/2026/octubre/7/solucion-publica-facturacion-electronica.html", label: "Agencia Tributaria, 7-10-2026: plazos de la factura electrónica obligatoria" },
  orden: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-7296#a18", label: "BOE: Orden PJC/297/2026, artículo 18 (bases y tipos de autónomos 2026)" },
  rd2064: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1996-1579#a45", label: "BOE: Real Decreto 2064/1995, artículo 45 (hasta 6 cambios de base al año)" },
  lgss: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a308", label: "BOE: Ley General de la Seguridad Social, artículo 308 (cotización por ingresos reales y regularización)" },
  eta: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-13409#a38ter", label: "BOE: Estatuto del Trabajo Autónomo, artículo 38 ter (cuota reducida)" },
  importass: { href: "https://portal.seg-social.gob.es/wps/portal/importass/importass/Categorias/Altas,+bajas+y+modificaciones/Bajas+y+modificaciones/BCRendimientos", label: "Import@ss: base de cotización y rendimientos (plazos y trámite)" },
  ssBases: { href: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/10721/10724/1320/1322/base+de+cotizacion", label: "Seguridad Social: base de cotización de autónomos 2026" },
  guiaAut: { href: "https://portal.seg-social.gob.es/wps/portal/importass/importass/Colectivos/Trabajo+Autonomo/guia", label: "Import@ss: guía de trabajo autónomo (tarifa plana)" },
};

const P_VF = "/trabajo/verifactu-obligatorio-1-enero-2027";
const P_BASE = "/trabajo/autonomos-cambio-base-cotizacion-2027";
const L = {
  vf: { href: P_VF, label: "¿Sigue siendo obligatorio Verifactu el 1 de enero de 2027?" },
  base: { href: P_BASE, label: "Autónomos: cambiar la base de cotización para 2027" },
  modelo030: { href: "/hacienda/modelo-030", label: "Modelo 030: cambiar tus datos en Hacienda" },
  representacion: { href: "/autorizacion-representacion-tramite", label: "Autorización para que otra persona haga un trámite" },
  smi: { href: "/trabajo/salario-minimo-irpf-2026", label: "¿Paga IRPF el salario mínimo en 2026?" },
  vida: { href: "/trabajo/vida-laboral", label: "Descargar la vida laboral" },
  huelga: { href: "/trabajo/huelga-general-11-noviembre", label: "Huelga general del 11 de noviembre" },
};

export const VF_PATH = P_VF;
export const BASE_PATH = P_BASE;

export const AUTONOMOS_VERIFACTU_20261025_GUIDES: Guide[] = [
  {
    id: "verifactu-obligatorio-2027",
    pack: "trabajo",
    reviewedAt: R,
    path: P_VF,
    h1: "¿Sigue siendo obligatorio Verifactu el 1 de enero de 2027? Estado a 25 de octubre de 2026",
    title: "¿Verifactu es obligatorio el 1 de enero de 2027? Estado a 25-10-2026",
    description: "Hacienda anunció el 5-10-2026 que quiere aplazar Verifactu a octubre de 2028, pero en el BOE siguen vigentes el 1-1-2027 (sociedades) y el 1-7-2027 (autónomos). Qué hacer ya.",
    lead: "Respuesta corta: sí, a día de hoy sigue siendo obligatorio. El 5 de octubre de 2026 el Ministerio de Hacienda anunció una «previsión» de aplazar Verifactu hasta octubre de 2028, pero ese cambio todavía no se ha publicado en el BOE. Mientras no se publique, la ley dice lo mismo que antes: las sociedades deben tener el programa de facturación adaptado antes del 1 de enero de 2027, y los autónomos y el resto antes del 1 de julio de 2027.",
    cta: { href: S.aeat.href, label: "Página oficial de Verifactu (Agencia Tributaria)" },
    secondaryCta: { href: S.nota.href, label: "Leer la nota de Hacienda del 5 de octubre" },
    sources: [S.df4, S.rd1007, S.rdl15, S.nota, S.aeat, S.lgt, S.spfe],
    related: [L.base, L.modelo030, L.representacion, L.smi, L.vida],
    disclaimer: "Última revisión: 25 de octubre de 2026. Si el BOE publica el aplazamiento, actualizaremos esta página el mismo día.",
    faqs: [
      { q: "¿Está aplazado Verifactu a 2028?", a: "Todavía no. Es un anuncio del Ministerio de Hacienda del 5 de octubre de 2026, que él mismo llama «previsión». Para que cambie la fecha hace falta una norma publicada en el BOE que modifique la disposición final 4.ª del Real Decreto 1007/2023. A 25 de octubre de 2026 esa norma no existe." },
      { q: "¿Qué fechas están vigentes hoy?", a: "Las del Real Decreto 1007/2023, tal y como quedó tras el Real Decreto-ley 15/2025: las sociedades (contribuyentes del Impuesto sobre Sociedades) antes del 1 de enero de 2027, y el resto de obligados, como los autónomos que tributan en el IRPF por actividades económicas, antes del 1 de julio de 2027." },
      { q: "Soy autónomo, ¿qué tengo que hacer ahora?", a: "Si facturas con un programa informático, pregunta a tu proveedor si el programa ya cumple el reglamento y pídele su «declaración responsable». Si facturas a mano o con un procesador de texto que no es un programa de facturación, Verifactu no se aplica a esas facturas mientras no uses un sistema informático de facturación. Tu fecha vigente es antes del 1 de julio de 2027." },
      { q: "¿Me afecta si ya estoy en el SII?", a: "No. El artículo 3.3 del reglamento excluye a quienes llevan los libros registro del IVA a través del Suministro Inmediato de Información (SII)." },
      { q: "¿Y en el País Vasco o Navarra?", a: "El Real Decreto 1007/2023 es normativa estatal. En los territorios forales rigen sus propias normas (por ejemplo, TicketBAI en el País Vasco), así que consulta a tu hacienda foral." },
      { q: "¿Cuál es la multa?", a: "La Ley General Tributaria (artículo 201 bis) fija 50.000 € por cada ejercicio para quien tenga un sistema que no cumpla o que haya sido alterado, y 150.000 € por ejercicio y tipo de programa para quien los fabrique o venda (1.000 € por cada programa vendido sin certificar). Solo se puede sancionar a partir de que la obligación sea exigible." },
      { q: "¿Hay un programa gratis de Hacienda?", a: "Sí. La Agencia Tributaria ofrece una aplicación gratuita de facturación VERI*FACTU en su sede electrónica, con una guía de uso. Está pensada para quien emite pocas facturas." },
      { q: "¿Es lo mismo Verifactu que la factura electrónica obligatoria?", a: "No. Verifactu regula cómo debe ser el programa con el que haces las facturas (que no se puedan borrar ni alterar). La factura electrónica entre empresas es otra obligación: según la Agencia Tributaria, se aplica desde el 6 de octubre de 2027 a quien factura más de 8 millones y desde el 6 de octubre de 2028 al resto. La nota de Hacienda quiere hacer coincidir Verifactu con esta segunda fecha." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [
        "Por el Equipo RutaTrámite. Última revisión: 25 de octubre de 2026, con el texto consolidado del Real Decreto 1007/2023 en el BOE y la nota del Ministerio de Hacienda.",
      ], [[
        "Vigente hoy (BOE): sociedades, antes del 1 de enero de 2027. Autónomos y resto, antes del 1 de julio de 2027.",
        "Solo anunciado: Hacienda prevé aplazar todo a octubre de 2028. No hay norma publicada, ni día concreto, ni se sabe con qué tipo de norma se hará.",
        "No te afecta si llevas el IVA por el SII o si tributas en territorio foral (País Vasco o Navarra), que tiene su propia norma.",
        "La nota de Hacienda dice que las exigencias técnicas (integridad, conservación, trazabilidad e inalterabilidad) se mantendrán en términos «sustancialmente equivalentes».",
        "Qué hacer ya: pedir a tu proveedor de software la declaración responsable de que cumple. Eso sirve con o sin aplazamiento.",
      ]]),
      {
        id: "vigente-vs-anunciado",
        title: "Qué está en vigor y qué es solo un anuncio",
        paragraphs: ["Esta tabla separa lo que ya es ley de lo que ha anunciado el Gobierno. La revisamos cada día en el BOE."],
        table: {
          caption: "Verifactu: estado a 25 de octubre de 2026",
          head: ["Qué", "Fecha", "Estado", "Fuente"],
          rows: [
            { cells: ["Sociedades (Impuesto sobre Sociedades)", "Antes del 1-1-2027 (último día: 31-12-2026)", "En vigor, publicado en el BOE"], source: S.df4 },
            { cells: ["Autónomos (IRPF por actividades), no residentes con establecimiento y entidades en atribución de rentas", "Antes del 1-7-2027 (último día: 30-6-2027)", "En vigor, publicado en el BOE"], source: S.df4 },
            { cells: ["Aplazamiento de todo lo pendiente", "Octubre de 2028 (sin día)", "Solo anunciado («previsión»), no está en el BOE"], source: S.nota },
            { cells: ["Factura electrónica entre empresas, más de 8 millones", "6-10-2027", "En vigor (otra obligación distinta)"], source: S.spfe },
            { cells: ["Factura electrónica entre empresas, resto", "6-10-2028", "En vigor (otra obligación distinta)"], source: S.spfe },
          ],
        },
      },
      sec("que-es", "Qué es Verifactu, en palabras sencillas", [
        "Verifactu es el nombre corto del reglamento que obliga a que los programas informáticos de facturación cumplan unos requisitos: que cada factura quede registrada, que no se pueda borrar ni modificar sin dejar rastro y que la Agencia Tributaria pueda leer esos registros. Lo regula el Real Decreto 1007/2023.",
        "Hay dos formas de cumplir. En la modalidad «VERI*FACTU», el programa envía cada registro de factura a la Agencia Tributaria automáticamente. En la otra, el programa guarda los registros con firma electrónica y los entrega cuando Hacienda los pide. Tu proveedor de software te dirá qué modalidad usa su programa.",
        "Verifactu no es un impuesto nuevo ni cambia lo que pagas de IVA o IRPF. Afecta a la herramienta con la que facturas.",
      ]),
      sec("a-quien", "A quién afecta y quién queda fuera", [
        "Según el artículo 3 del reglamento, afecta a quien use un sistema informático para facturar, aunque sea solo para una parte de su actividad:",
      ], [[
        "Sociedades que pagan el Impuesto sobre Sociedades (salvo las entidades totalmente exentas).",
        "Personas físicas que tributan en el IRPF por actividades económicas: autónomos y profesionales.",
        "No residentes que operan con establecimiento permanente en España.",
        "Comunidades de bienes y otras entidades en atribución de rentas con actividad económica.",
      ], [
        "Quedan fuera: quienes llevan los libros del IVA por el SII (artículo 3.3).",
        "Quedan fuera las facturas que no se hacen con un sistema informático de facturación.",
        "En País Vasco y Navarra se aplican las normas forales (TicketBAI en el País Vasco).",
      ]]),
      sec("que-hacer", "Qué tienes que hacer ahora, paso a paso", [
        "Aunque se apruebe el aplazamiento, estos pasos no se pierden, porque los requisitos técnicos se mantendrán según la propia nota de Hacienda.",
      ], [[
        "Mira cómo facturas hoy: programa de facturación, programa de contabilidad o TPV, o Word/Excel.",
        "Si usas un programa, pide al proveedor la «declaración responsable» de que cumple el Real Decreto 1007/2023 y pregunta qué modalidad usa.",
        "Si eres sociedad, apunta tu fecha vigente: tienes hasta el 31 de diciembre de 2026.",
        "Si eres autónomo, tu fecha vigente es hasta el 30 de junio de 2027.",
        "Si facturas poco, valora la aplicación gratuita de la Agencia Tributaria.",
        "Revisa esta página: si el BOE publica el aplazamiento, cambiaremos la fecha y la marcaremos como «en vigor».",
      ]]),
      sec("ejemplo", "Ejemplos resueltos", [
        "Sociedad limitada con programa de facturación: sigue obligada antes del 1 de enero de 2027 mientras no se publique el cambio. Si el proveedor ya tiene la versión adaptada, conviene instalarla en diciembre como muy tarde.",
        "Fontanera autónoma que hace las facturas en Word: hoy no usa un sistema informático de facturación en el sentido del reglamento. Si cambia a un programa de facturación, ese programa tendrá que cumplir antes del 1 de julio de 2027 (o en la fecha que fije el BOE si se aprueba el aplazamiento).",
        "Empresa que ya presenta el IVA por el SII: no está obligada por Verifactu.",
      ]),
      sec("multas", "Multas: lo que dice la ley", [
        "Las sanciones están en el artículo 201 bis de la Ley General Tributaria y son infracciones graves:",
      ], [[
        "Tener un programa que no cumple, no certificado cuando debe estarlo o alterado: 50.000 € por cada ejercicio.",
        "Fabricar o vender programas que permiten manipular la facturación: 150.000 € por ejercicio y por cada tipo de programa.",
        "Vender un programa sin el certificado obligatorio: 1.000 € por cada programa vendido.",
      ]]),
    ],
  },
  {
    id: "autonomos-cambio-base-2027",
    pack: "trabajo",
    reviewedAt: R,
    path: P_BASE,
    h1: "Autónomos: cambiar la base de cotización para 2027 (plazo del 1 de noviembre al 31 de diciembre)",
    title: "Cambiar la base de cotización de autónomo para 2027: plazos y tramos",
    description: "Si pides el cambio entre el 1-nov y el 31-dic de 2026, la nueva base se aplica el 1-1-2027. Tabla oficial de tramos 2026, cuotas, cómo se hace en Import@ss y la regularización.",
    lead: "Respuesta corta: puedes cambiar tu base de cotización hasta 6 veces al año en Import@ss. Si lo pides entre el 1 de noviembre y el 31 de diciembre de 2026, la nueva base se aplica desde el 1 de enero de 2027. Si lo pides hasta el 31 de octubre, se aplica ya el 1 de noviembre de 2026. Las tablas de tramos de 2027 todavía no se han publicado en el BOE: hoy solo hay tablas oficiales para 2026.",
    cta: { href: S.importass.href, label: "Cambiar la base en Import@ss" },
    secondaryCta: { href: S.orden.href, label: "Ver la tabla oficial de 2026 en el BOE" },
    sources: [S.rd2064, S.importass, S.orden, S.ssBases, S.lgss, S.eta, S.guiaAut],
    related: [L.vf, L.vida, L.modelo030, L.representacion, L.smi, L.huelga],
    disclaimer: "Última revisión: 25 de octubre de 2026. Cuando el BOE publique las bases de 2027, actualizaremos la tabla.",
    faqs: [
      { q: "¿Hasta cuándo puedo cambiar la base para que se aplique el 1 de enero de 2027?", a: "Entre el 1 de noviembre y el 31 de diciembre de 2026 (artículo 45 del Real Decreto 2064/1995). Si lo pides antes, hasta el 31 de octubre, el cambio se aplica el 1 de noviembre de 2026." },
      { q: "¿Cuántas veces puedo cambiar la base al año?", a: "Hasta 6 veces, una por cada periodo de dos meses: efectos el 1 de marzo, 1 de mayo, 1 de julio, 1 de septiembre, 1 de noviembre y 1 de enero del año siguiente." },
      { q: "¿Cuánto pagaré de cuota en 2027?", a: "No se sabe todavía. A 25 de octubre de 2026 no hay tablas de 2027 en el BOE. Lo único fijado por ley es que el Mecanismo de Equidad Intergeneracional sube del 0,90 % al 1 % en 2027. Las bases y cuotas de esta página son las oficiales de 2026." },
      { q: "¿Qué pasa si elijo una base demasiado baja?", a: "Al año siguiente, la Tesorería compara tu base con tus rendimientos reales, que le comunica Hacienda. Si te correspondía una base mayor, te pide la diferencia. Si te correspondía una menor, te devuelve lo pagado de más." },
      { q: "¿Qué son los rendimientos netos para elegir tramo?", a: "Son tus ingresos de la actividad menos los gastos deducibles, como en el IRPF. A ese importe se le resta un 7 % por gastos genéricos (un 3 % para socios y administradores de sociedades). El resultado se divide entre los días de alta y se multiplica por 30 para obtener el promedio mensual." },
      { q: "¿Cuánto es la tarifa plana?", a: "Al darte de alta por primera vez, o si no has estado de alta en los 2 años anteriores (3 si ya la tuviste), pagas una cuota reducida de 80 € al mes durante 12 meses, más el Mecanismo de Equidad Intergeneracional. Puede prorrogarse 12 meses más si tus rendimientos netos previstos son inferiores al salario mínimo. Se pide al darte de alta." },
      { q: "¿Necesito certificado digital?", a: "Para Import@ss puedes entrar con Cl@ve, certificado digital, o DNI electrónico. Si no puedes, un gestor o graduado social puede hacerlo por ti con autorización." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [
        "Por el Equipo RutaTrámite. Última revisión: 25 de octubre de 2026, con el BOE (Orden PJC/297/2026, Real Decreto 2064/1995 y Ley General de la Seguridad Social) y Import@ss.",
      ], [[
        "Desde 2023 los autónomos cotizan según sus rendimientos netos reales: eliges una base dentro de tu tramo y al año siguiente se regulariza.",
        "Para que la nueva base empiece el 1 de enero de 2027, pídela entre el 1 de noviembre y el 31 de diciembre de 2026.",
        "Si quieres que el cambio se note ya en noviembre, tienes hasta el sábado 31 de octubre de 2026.",
        "Se hace en Import@ss: Trabajo autónomo > Ver tus datos de autónomo > Cuota y cotización > Modificar.",
        "Las tablas de 2027 no están publicadas. Hoy la referencia oficial es la de 2026; en 2027 el Mecanismo de Equidad Intergeneracional sube al 1 % por ley.",
      ]]),
      {
        id: "plazos",
        title: "Plazos para cambiar la base: los 6 periodos",
        paragraphs: ["Artículo 45 del Real Decreto 2064/1995, tal como lo recoge Import@ss."],
        table: {
          caption: "Cuándo se aplica el cambio de base según cuándo lo pides",
          head: ["Si lo pides entre", "Se aplica desde", "Fuente"],
          rows: [
            { cells: ["1 de enero y último día de febrero", "1 de marzo"], source: S.rd2064 },
            { cells: ["1 de marzo y 30 de abril", "1 de mayo"], source: S.rd2064 },
            { cells: ["1 de mayo y 30 de junio", "1 de julio"], source: S.rd2064 },
            { cells: ["1 de julio y 31 de agosto", "1 de septiembre"], source: S.rd2064 },
            { cells: ["1 de septiembre y 31 de octubre (este periodo acaba el 31-10-2026)", "1 de noviembre de 2026"], source: S.importass },
            { cells: ["1 de noviembre y 31 de diciembre de 2026", "1 de enero de 2027"], source: S.importass },
          ],
        },
      },
      {
        id: "tabla-2026",
        title: "Tabla oficial de tramos, bases y cuotas de 2026",
        paragraphs: [
          "Bases del artículo 18 de la Orden PJC/297/2026. La cuota es la base por el 31,50 %: 28,30 % contingencias comunes, 1,30 % contingencias profesionales, 0,90 % cese de actividad, 0,10 % formación profesional y 0,90 % Mecanismo de Equidad Intergeneracional. Redondeado al céntimo.",
          "Puedes elegir cualquier base entre la mínima y la máxima de tu tramo. Las tablas de 2027 no se han publicado: no te damos cifras de 2027 porque no existen todavía.",
        ],
        table: {
          caption: "Autónomos 2026: rendimientos netos al mes, bases y cuotas al mes",
          head: ["Tramo", "Rendimientos netos/mes", "Base mínima", "Base máxima", "Cuota mínima", "Cuota máxima", "Fuente"],
          rows: [
            { cells: ["Reducida 1", "Hasta 670 €", "653,59 €", "718,94 €", "205,88 €", "226,47 €"], source: S.orden },
            { cells: ["Reducida 2", "Más de 670 y hasta 900 €", "718,95 €", "900,00 €", "226,47 €", "283,50 €"], source: S.orden },
            { cells: ["Reducida 3", "Más de 900 y menos de 1.166,70 €", "849,67 €", "1.166,70 €", "267,65 €", "367,51 €"], source: S.orden },
            { cells: ["General 1", "De 1.166,70 a 1.300 €", "950,98 €", "1.300,00 €", "299,56 €", "409,50 €"], source: S.orden },
            { cells: ["General 2", "Más de 1.300 y hasta 1.500 €", "960,78 €", "1.500,00 €", "302,65 €", "472,50 €"], source: S.orden },
            { cells: ["General 3", "Más de 1.500 y hasta 1.700 €", "960,78 €", "1.700,00 €", "302,65 €", "535,50 €"], source: S.orden },
            { cells: ["General 4", "Más de 1.700 y hasta 1.850 €", "1.143,79 €", "1.850,00 €", "360,29 €", "582,75 €"], source: S.orden },
            { cells: ["General 5", "Más de 1.850 y hasta 2.030 €", "1.209,15 €", "2.030,00 €", "380,88 €", "639,45 €"], source: S.orden },
            { cells: ["General 6", "Más de 2.030 y hasta 2.330 €", "1.274,51 €", "2.330,00 €", "401,47 €", "733,95 €"], source: S.orden },
            { cells: ["General 7", "Más de 2.330 y hasta 2.760 €", "1.356,21 €", "2.760,00 €", "427,21 €", "869,40 €"], source: S.orden },
            { cells: ["General 8", "Más de 2.760 y hasta 3.190 €", "1.437,91 €", "3.190,00 €", "452,94 €", "1.004,85 €"], source: S.orden },
            { cells: ["General 9", "Más de 3.190 y hasta 3.620 €", "1.519,61 €", "3.620,00 €", "478,68 €", "1.140,30 €"], source: S.orden },
            { cells: ["General 10", "Más de 3.620 y hasta 4.050 €", "1.601,31 €", "4.050,00 €", "504,41 €", "1.275,75 €"], source: S.orden },
            { cells: ["General 11", "Más de 4.050 y hasta 6.000 €", "1.732,03 €", "5.101,20 €", "545,59 €", "1.606,88 €"], source: S.orden },
            { cells: ["General 12", "Más de 6.000 €", "1.928,10 €", "5.101,20 €", "607,35 €", "1.606,88 €"], source: S.orden },
          ],
        },
      },
      sec("2027", "Qué se sabe de 2027 (y qué no)", [
        "La Ley General de la Seguridad Social (artículo 308) dice que las tablas se fijan cada año en los Presupuestos. A 25 de octubre de 2026 no hay en el BOE ninguna norma con las bases de autónomos para 2027.",
        "Lo único fijado por ley para 2027 es la subida del Mecanismo de Equidad Intergeneracional del 0,90 % al 1 % (disposición de la Ley General de la Seguridad Social sobre el MEI). Sobre la base mínima del tramo general 1 (950,98 €), esa décima supone unos 0,95 € más al mes, si la base no cambia.",
        "Puedes pedir ya el cambio con efectos del 1 de enero eligiendo una base de la tabla vigente. Si después se publican tablas nuevas, revisa que tu base sigue dentro de tu tramo.",
      ]),
      sec("paso-a-paso", "Cómo se cambia en Import@ss, paso a paso", [
        "El servicio se llama «Base de cotización y rendimientos».",
      ], [[
        "Entra en Import@ss (portal.seg-social.gob.es) con Cl@ve, certificado digital, o DNI electrónico.",
        "Ve a «Trabajo autónomo» > «Ver tus datos de autónomo».",
        "Entra en «Cuota y cotización» y pulsa «Modificar». Verás la fecha desde la que se aplicará el cambio.",
        "Indica tus rendimientos netos mensuales previstos. El sistema te muestra tu tramo y sus bases mínima y máxima.",
        "Elige la base. Antes de confirmar verás la cuota resultante.",
        "Firma la solicitud y descarga el justificante. Guárdalo.",
      ]]),
      sec("ejemplo", "Ejemplo resuelto con números oficiales de 2026", [
        "Lucía es diseñadora autónoma. Su rendimiento neto de 2026 (ingresos menos gastos deducibles, como en la renta) será de 20.645 €. Está de alta todo el año (365 días).",
        "1) Resta el 7 % de gastos genéricos: 20.645 × 0,93 = 19.199,85 €.",
        "2) Promedio mensual: 19.199,85 ÷ 365 × 30 = 1.578,07 € al mes. Eso cae en el tramo general 3 (más de 1.500 y hasta 1.700 €).",
        "3) En ese tramo puede elegir una base entre 960,78 € y 1.700 €. Con la mínima, la cuota es 960,78 × 31,50 % = 302,65 € al mes.",
        "4) Regularización: si Lucía hubiera cotizado todo el año por la base mínima del tramo general 1 (950,98 €, cuota de 299,56 €), habría pagado 3.594,72 €. Le correspondía como mínimo 302,65 × 12 = 3.631,80 €. La Tesorería le reclamaría la diferencia, unos 37,08 €. Si hubiera elegido una base más alta que la máxima de su tramo, le devolverían lo pagado de más.",
      ]),
      sec("regularizacion", "La regularización anual", [
        "La base que eliges durante el año es provisional. Cuando Hacienda comunica a la Tesorería tus rendimientos reales (después de la declaración de la renta), la Tesorería calcula la base que te correspondía (artículo 308.1.c de la Ley General de la Seguridad Social).",
        "Si cotizaste por debajo de la base mínima de tu tramo real, te pide la diferencia. Si cotizaste por encima de la base máxima de ese tramo, te devuelve el exceso. Si estabas entre la mínima y la máxima, no hay ajuste.",
        "Por eso conviene revisar la base cada vez que cambien mucho tus ingresos: tienes 6 oportunidades al año.",
      ]),
      sec("tarifa-plana", "Tarifa plana: si te das de alta", [
        "La cuota reducida está en el artículo 38 ter del Estatuto del Trabajo Autónomo. Según Import@ss:",
      ], [[
        "80 € al mes durante los primeros 12 meses, más el Mecanismo de Equidad Intergeneracional.",
        "Para quien no haya estado de alta como autónomo en los 2 años anteriores (3 años si ya la disfrutó).",
        "Se puede prorrogar 12 meses más si los rendimientos netos previstos son inferiores al salario mínimo interprofesional.",
        "Se pide en el momento del alta.",
      ]]),
    ],
  },
];

/** Enlaces entrantes desde guías relacionadas (añade al final de `related`, sin duplicar). */
const ENTRANTES: Record<string, { href: string; label: string }[]> = {
  "/trabajo/vida-laboral": [L.base],
  "/trabajo/salario-minimo-irpf-2026": [L.base, L.vf],
  "/trabajo/cita-previa-sepe": [L.base],
  "/elecciones/deflactar-irpf-que-significa": [L.vf],
};
export function enlazarAutonomosVerifactu(g: Guide): Guide {
  const add = ENTRANTES[g.path];
  if (!add) return g;
  const have = new Set((g.related ?? []).map((r) => r.href));
  const extra = add.filter((r) => !have.has(r.href));
  return extra.length ? Object.assign(g, { related: [...(g.related ?? []), ...extra] }) : g;
}
