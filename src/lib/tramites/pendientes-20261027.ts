import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Tanda pendientes (27-10-2026). Verificado el 27-10-2026 en fuentes oficiales:
 * - RD 605/1999 art. 13 (BOE-A-1999-8583): permiso retribuido para votar.
 * - LGSS (BOE-A-2015-11724): arts. 58 (revalorización), 207-208 y DT 7.ª (jubilación anticipada; edades 2026),
 *   308.1.c (regularización de autónomos), 363 y 369 (pensiones no contributivas).
 * - RD 241/2026 (BOE-A-2026-6977) art. 21: PNC 2026 = 8.803,20 €/año.
 * - Ley 39/2015 art. 43 (BOE-A-2015-10565): notificaciones electrónicas, 10 días naturales.
 * - RD 609/2026 (BOE-A-2026-16010): Programa Auto+; sede Mintur IdProcedimiento=308 (plazo 04/08/2026-31/12/2026).
 * - INE calendario 2026: IPC avance 27-11-2026, IPC definitivo 15-12-2026.
 * Omitido: cifras de revalorización 2027 (aún no existen), carta del IMV (sin fuente oficial verificable),
 * fechas de envío de las regularizaciones de autónomos (no publicadas).
 */

const R = "2026-10-27";
const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const BY = (q: string) => `Por Equipo RutaTrámite. Última revisión: 27 de octubre de 2026, con ${q}.`;

const S = {
  rd605: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-8583#a13", label: "BOE: Real Decreto 605/1999, artículo 13 (permiso para votar)" },
  a58: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a58", label: "BOE: LGSS, artículo 58 (revalorización de pensiones)" },
  a207: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a207", label: "BOE: LGSS, artículo 207 (jubilación anticipada involuntaria)" },
  a208: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a208", label: "BOE: LGSS, artículo 208 (jubilación anticipada voluntaria)" },
  dt7: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#dtseptima", label: "BOE: LGSS, disposición transitoria 7.ª (edad de jubilación por años)" },
  a308: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a308", label: "BOE: LGSS, artículo 308 (cotización de autónomos y regularización)" },
  a363: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a363", label: "BOE: LGSS, artículo 363 (límite de rentas)" },
  a369: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724#a369", label: "BOE: LGSS, artículo 369 (pensión no contributiva de jubilación)" },
  rd241: { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-6977", label: "BOE: Real Decreto 241/2026 (cuantías de pensiones 2026)" },
  l39: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-10565#a43", label: "BOE: Ley 39/2015, artículo 43 (notificaciones electrónicas)" },
  dehu: { href: "https://dehu.redsara.es/", label: "Dirección Electrónica Habilitada única (DEHú)" },
  sedeSS: { href: "https://sede.seg-social.gob.es/", label: "Sede electrónica de la Seguridad Social" },
  cert: { href: "https://prestaciones.seg-social.es/servicio/certificado-revalorizacion-pensiones.html", label: "Seguridad Social: certificado de revalorización de pensiones" },
  ine: { href: "https://www.ine.es/dynt3/Calendario/en/calenHTML.htm?q=2026", label: "INE: calendario de publicaciones 2026" },
  imserso: { href: "https://imserso.es/", label: "Imserso (pensiones no contributivas)" },
  autoPres: { href: "https://www.mintur.gob.es/es-es/GabinetePrensa/NotasPrensa/2026/Paginas/El-Programa-Auto+-ayudara-con-hasta-4.500-euros-a-la-compra-de-vehiculos-electricos-y-europeos.aspx", label: "Ministerio de Industria: nota de 3-2-2026 (dotación de 400 millones de euros para 2026)" },
  autoRd: { href: "https://www.mintur.gob.es/es-es/GabinetePrensa/NotasPrensa/2026/Paginas/Jordi-Hereu-anuncia-la-aprobaci%C3%B3n-del-Real-Decreto-que-da-luz-verde-al-Programa-Auto+.aspx", label: "Ministerio de Industria: nota sobre la aprobación del Real Decreto del Programa Auto+ (hasta 6.000 € y 7.500 € para autónomos y pequeñas empresas)" },
  autoBdns: { href: "https://www.boe.es/boe/dias/2026/08/04/pdfs/BOE-B-2026-26062.pdf", label: "BOE-B-2026-26062: extracto de la convocatoria Línea 1 (350 millones de euros)" },
  autoPlazo: { href: "https://www.mintur.gob.es/es-es/GabinetePrensa/NotasPrensa/2026/Paginas/industria-abre-plazo-solicitar-ayudas-programa-auto-plus-vehiculos-electricos.aspx", label: "Ministerio de Industria: apertura del plazo de solicitud del Programa Auto+" },
  auto: { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-16010", label: "BOE: Real Decreto 609/2026 (Programa Auto+)" },
  sedeMin: { href: "https://sede.serviciosmin.gob.es/es-es/procedimientoselectronicos/Paginas/detalle-procedimientos.aspx?IdProcedimiento=308", label: "Sede del Ministerio de Industria: solicitud de la ayuda Auto+" },
};

const P = {
  reg: "/trabajo/regularizacion-cuotas-autonomos-notificacion",
  carta: "/trabajo/carta-revalorizacion-pensiones-2027",
  auto: "/trabajo/plan-auto-plus-ayuda-coche-electrico",
  anti: "/trabajo/jubilacion-anticipada-2026",
  pnc: "/trabajo/pension-no-contributiva-2026",
};
const L = {
  reg: { href: P.reg, label: "Regularización de cuotas de autónomos: cómo leer la notificación" },
  carta: { href: P.carta, label: "Carta de revalorización de pensiones 2027" },
  auto: { href: P.auto, label: "Plan Auto+: ayuda para coche eléctrico" },
  anti: { href: P.anti, label: "Jubilación anticipada 2026: requisitos" },
  pnc: { href: P.pnc, label: "Pensión no contributiva 2026: requisitos y cuantía" },
  reval: { href: "/trabajo/revalorizacion-pensiones-2026", label: "Revalorización de pensiones 2026" },
  base: { href: "/trabajo/autonomos-cambio-base-cotizacion-2027", label: "Autónomos: cambiar la base de cotización para 2027" },
  vf: { href: "/trabajo/verifactu-obligatorio-1-enero-2027", label: "Verifactu obligatorio desde el 1 de enero de 2027" },
  vida: { href: "/trabajo/vida-laboral", label: "Informe de vida laboral" },
  permiso: { href: "/elecciones/permiso-trabajo-para-votar", label: "Permiso en el trabajo para ir a votar" },
  trabajo: { href: "/trabajo", label: "Trabajo: todas las guías" },
};
export const PENDIENTES_1027_PATHS = Object.values(P);
const base = { pack: "trabajo" as const, reviewedAt: R };

export const PENDIENTES_1027_GUIDES: Guide[] = [
  {
    ...base,
    id: "regularizacion-cuotas-autonomos-notificacion",
    path: P.reg,
    h1: "Regularización de cuotas de autónomos: cómo leer la notificación y qué hacer",
    title: "Regularización de autónomos: qué hacer si te llega",
    description: "¿Cotizaste por debajo de tu tramo? Pagas la diferencia sin recargo hasta fin del mes siguiente. ¿Por encima? Te devuelven de oficio. Artículo 308 LGSS.",
    lead: "Respuesta corta: la Seguridad Social compara lo que cotizaste en el año con tus rendimientos reales, que le comunica Hacienda. Si tu base quedó por debajo del mínimo del tramo que te corresponde, tendrás que pagar la diferencia; si quedó por encima del máximo, te devuelven lo cotizado de más sin que lo pidas. La notificación llega de forma electrónica: abre la sede o la DEHú a tiempo.",
    cta: { href: S.sedeSS.href, label: "Entrar en la sede de la Seguridad Social" },
    secondaryCta: { href: S.dehu.href, label: "Ver notificaciones en la DEHú" },
    sources: [S.a308, S.l39, S.sedeSS, S.dehu],
    related: [L.base, L.vf, L.vida, L.trabajo],
    disclaimer: "Información general basada en el artículo 308 de la LGSS. No publicamos fechas de envío de las regularizaciones porque la Seguridad Social no las ha anunciado de forma oficial. Revisa tu notificación concreta.",
    faqs: [
      { q: "¿Qué plazo tengo para pagar?", a: "Hasta el último día del mes siguiente al de la notificación de la regularización, sin intereses ni recargo si pagas dentro de ese plazo (artículo 308.1.c de la LGSS)." },
      { q: "¿Y si me sale a devolver?", a: "La Tesorería devuelve la diferencia de oficio y sin intereses, antes del 30 de abril del año siguiente a aquel en que Hacienda comunica tus rendimientos." },
      { q: "¿Qué rendimientos cuentan?", a: "El rendimiento neto de tu actividad más las cuotas de autónomo (en estimación directa), con una deducción por gastos genéricos del 7 % (3 % en algunos casos de autónomos societarios o colaboradores)." },
      { q: "¿Y si no abro la notificación?", a: "Si estás obligado a recibir notificaciones electrónicas o lo elegiste, se entiende rechazada a los 10 días naturales desde que se pone a tu disposición sin que accedas, y el procedimiento sigue (artículo 43 de la Ley 39/2015)." },
      { q: "¿Me devuelven cuotas que no pagué?", a: "No. La ley excluye de la regularización las cuotas provisionales que no se ingresaron en plazo." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY("el texto consolidado de la Ley General de la Seguridad Social y de la Ley 39/2015 en el BOE")]),
      sec("como-leer", "Cómo leer la notificación", ["Busca en el documento tres datos: los rendimientos computables que Hacienda comunicó, el tramo que te corresponde por ellos (con su base mínima y máxima) y la base por la que cotizaste. La regularización solo existe si tu base quedó fuera de ese rango."], [["Base por debajo del mínimo del tramo → pagas la diferencia", "Base por encima del máximo del tramo → te devuelven la diferencia", "Base dentro del rango → no hay nada que regularizar"]]),
      sec("que-hacer", "Qué hacer", ["Comprueba que los rendimientos coinciden con tu declaración de la Renta. Si sale a pagar, ingresa antes del último día del mes siguiente a la notificación para evitar recargo. Si crees que hay un error, consulta la propia notificación: indica cómo presentar alegaciones o recurso."]),
      sec("notificacion", "Dónde llega la notificación", ["Las notificaciones electrónicas se consultan en la sede de la Seguridad Social o en la Dirección Electrónica Habilitada única (DEHú). Se considera practicada cuando accedes a su contenido. Si no accedes en 10 días naturales y la notificación electrónica es obligatoria para ti o la elegiste, se entiende rechazada."]),
      sec("evitar", "Cómo evitar sorpresas el año que viene", ["Si prevés ganar más o menos, puedes cambiar tu base de cotización durante el año para acercarla a tus rendimientos reales."], [["Guía: autónomos, cambio de base de cotización para 2027"]]),
    ],
  },
  {
    ...base,
    id: "carta-revalorizacion-pensiones-2027",
    path: P.carta,
    h1: "Carta de revalorización de pensiones 2027: cómo se calcula y cuándo se sabe",
    title: "Carta de revalorización de pensiones 2027: cómo se calcula",
    description: "La subida de 2027 será la media del IPC interanual de diciembre de 2025 a noviembre de 2026 (art. 58 LGSS). El INE da el dato el 27-nov (avance) y el 15-dic.",
    lead: "Respuesta corta: las pensiones contributivas suben cada enero según la media de las tasas de IPC interanual de los doce meses anteriores a diciembre del año previo (artículo 58 de la LGSS). Para 2027, eso son los IPC de diciembre de 2025 a noviembre de 2026. El INE publica el avance del IPC de noviembre el 27 de noviembre de 2026 y el dato definitivo el 15 de diciembre. Hasta entonces no hay cifra oficial para 2027.",
    cta: { href: S.cert.href, label: "Descargar el certificado de revalorización" },
    secondaryCta: { href: S.a58.href, label: "Leer el artículo 58 en el BOE" },
    sources: [S.a58, S.ine, S.cert, S.sedeSS, S.rd241],
    related: [L.reval, L.anti, L.pnc, L.vida, L.trabajo],
    disclaimer: "Aún no existe porcentaje oficial de revalorización para 2027. Los ejemplos de esta página son hipotéticos y solo sirven para entender el cálculo.",
    faqs: [
      { q: "¿Cuánto subirán las pensiones en 2027?", a: "Todavía no se sabe. Será la media de los IPC interanuales de diciembre de 2025 a noviembre de 2026; el último dato lo publica el INE el 27 de noviembre (avance) y el 15 de diciembre de 2026 (definitivo)." },
      { q: "¿Y si la media del IPC es negativa?", a: "La pensión no baja: el artículo 58.3 dice que se mantiene el importe del año anterior." },
      { q: "¿Suben también la máxima y las mínimas?", a: "Sí, según el artículo 58 la pensión máxima y las mínimas se actualizan con el mismo porcentaje a través de la Ley de Presupuestos." },
      { q: "¿Dónde consigo el certificado con mi nueva pensión?", a: "En la sede de la Seguridad Social, servicio «Certificado de revalorización de pensiones». Da el certificado del año en curso, así que el de 2027 estará disponible cuando se aplique la subida." },
      { q: "¿Puedo reclamar si veo un error?", a: "La sede tiene un servicio de «Solicitud de revisión de la última revalorización y paga única»." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY("el artículo 58 de la LGSS en el BOE y el calendario oficial del INE")]),
      sec("formula", "Cómo se calcula", ["Se suman las doce tasas de variación interanual del IPC de diciembre de 2025 a noviembre de 2026 y se divide entre doce. Ese porcentaje se aplica a las pensiones contributivas, incluido el complemento de brecha de género."]),
      sec("fechas", "Fechas clave", ["Datos del calendario oficial del INE para 2026."], [["27 de noviembre de 2026: IPC adelantado de noviembre", "15 de diciembre de 2026: IPC definitivo de noviembre", "Enero de 2027: se aplica la revalorización"]]),
      sec("ejemplo", "Ejemplo hipotético (no es la cifra de 2027)", ["EJEMPLO: si la media saliera del 2 %, una pensión de 1.000 € al mes pasaría a 1.020 €. Es un supuesto para ilustrar el cálculo; no es una previsión."]),
      sec("2026", "Referencia: lo que pasó en 2026", ["En 2026 las pensiones contributivas subieron un 2,7 %. Consulta la guía de revalorización 2026 para ver la pensión máxima y las mínimas vigentes."]),
    ],
  },
  {
    ...base,
    id: "plan-auto-plus-ayuda-coche-electrico",
    path: P.auto,
    h1: "Plan Auto+: ayuda para comprar un coche eléctrico en 2026",
    title: "Plan Auto+: ayuda de hasta 4.500 € para coche eléctrico",
    description: "Programa Auto+ (RD 609/2026): hasta 4.500 € por un turismo con etiqueta CERO, según tipo, precio y montaje en la UE. Se pide en Industria hasta el 31-dic.",
    lead: "Respuesta corta: el Programa Auto+ (Real Decreto 609/2026) ayuda a comprar vehículos con etiqueta CERO. Para particulares, el máximo es 4.500 € en turismos y 5.000 € en furgonetas N1, y la cantidad real depende del tipo de vehículo, del precio y de si se montó en la Unión Europea. Se pide en la sede del Ministerio de Industria, con certificado digital o a través del concesionario, hasta el 31 de diciembre de 2026 o hasta agotar el presupuesto.",
    cta: { href: S.sedeMin.href, label: "Solicitar la ayuda en la sede de Industria" },
    secondaryCta: { href: S.auto.href, label: "Leer el Real Decreto 609/2026 en el BOE" },
    sources: [S.auto, S.sedeMin, S.autoPres, S.autoRd, S.autoBdns, S.autoPlazo],
    related: [L.trabajo],
    disclaimer: "Resumen del Real Decreto 609/2026. Las cuantías y requisitos exactos dependen del vehículo; comprueba la ficha del procedimiento antes de comprar.",
    faqs: [
      { q: "¿Quién puede pedirla?", a: "Línea 1: personas mayores de edad sin actividad económica con residencia legal en España. Línea 2: empresas y autónomos (compra, leasing o renting)." },
      { q: "¿Cuánto es para un eléctrico puro de menos de 35.000 €?", a: "Si se montó en la UE: 50 % + 25 % + 15 % = 90 % de 4.500 €, es decir 4.050 €. Con la batería también ensamblada en la UE (y el resto de condiciones), el 100 %: 4.500 €." },
      { q: "¿Y para un híbrido enchufable?", a: "Un PHEV de hasta 35.000 € montado en la UE: 25 % + 25 % + 15 % = 65 % de 4.500 €, es decir 2.925 €." },
      { q: "¿Hay precio máximo?", a: "Sí: 45.000 € para turismos y 10.000 € para motos, antes de impuestos y tras descuentos, extras incluidos." },
      { q: "¿Cuánto dinero hay en total?", a: "El Ministerio de Industria anunció una dotación de 400 millones de euros para 2026 (nota de prensa del 3 de febrero de 2026). La convocatoria para particulares (Línea 1) cuenta con 350 millones, según su extracto en el BOE (BOE-B-2026-26062). Las solicitudes se atienden por orden de presentación hasta agotar los fondos." },
      { q: "¿Cuánto pueden recibir autónomos y pymes?", a: "En la Línea 2, un autónomo o una microempresa puede recibir hasta 6.000 € por un turismo y 7.500 € por una furgoneta (nota del Ministerio de Industria y Real Decreto 609/2026). Las demás empresas, hasta 4.500 € y 5.000 €." },
      { q: "¿Tengo que quedarme el coche?", a: "Sí, al menos 2 años (artículo 10 del real decreto)." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY("el Real Decreto 609/2026 en el BOE y la ficha del procedimiento en la sede del Ministerio de Industria")]),
      sec("maximos", "Importes máximos para particulares (Línea 1)", ["Anexo II del Real Decreto 609/2026."], [["Turismos (M1): 4.500 €", "Furgonetas (N1): 5.000 €", "Motos L3e, L4e, L5e: 1.100 €", "Cuadriciclos L6e, L7e: 1.500 €"]]),
      sec("porcentajes", "Cómo se calcula el porcentaje", ["La ayuda suma tres componentes, en porcentaje del máximo."], [["Tipo: eléctrico puro 50 %; autonomía extendida o enchufable 25 %", "Precio: turismo hasta 35.000 € 25 %; de 35.000 a 45.000 € 15 %; otros vehículos 25 %", "Montaje: montaje final en la UE 15 %, más 10 % si la batería se ensambló en la UE"]]),
      sec("como", "Cómo se pide", ["La solicitud se presenta en la sede electrónica del Ministerio de Industria con certificado digital. El concesionario puede presentarla en tu nombre como representante. Si falta algo, tienes 10 días para subsanar. El plazo indicado en la sede va del 4 de agosto al 31 de diciembre de 2026."]),
      sec("linea2", "Autónomos y empresas (Línea 2): hasta 6.000 € y 7.500 €", ["Según la nota del Ministerio de Industria sobre la aprobación del real decreto, la ayuda puede llegar a 6.000 € para autónomos y empresas de hasta diez trabajadores, y a 7.500 € en furgonetas. El artículo del Real Decreto 609/2026 sobre importes de la Línea 2 lo concreta así:"], [["Autónomos y microempresas: turismos (M1) 6.000 €; furgonetas (N1) 7.500 €; motos L3e-L5e 1.100 €; cuadriciclos L6e-L7e 1.500 €", "Otras empresas: turismos 4.500 €; furgonetas 5.000 €; motos 1.100 €; cuadriciclos 1.500 €", "Autónomos y microempresas de las actividades CNAE que fije cada convocatoria (programa de transporte ligero profesional, Fondo Social para el Clima): turismos 7.000 €; furgonetas 12.000 €"]]),
      sec("presupuesto", "Presupuesto: 400 millones para 2026", ["El Ministerio de Industria fijó una dotación de 400 millones de euros para 2026, con efecto retroactivo desde el 1 de enero de 2026 (nota de prensa del 3 de febrero de 2026). La Línea 1, para particulares, tiene 350 millones según el extracto de la convocatoria publicado en el BOE (BOE-B-2026-26062), con plazo hasta las 14:00 (hora peninsular) del 31 de diciembre de 2026. Las ayudas se conceden por orden de presentación hasta agotar los fondos, así que conviene no dejarlo para el final."]),
    ],
  },
  {
    ...base,
    id: "jubilacion-anticipada-2026",
    path: P.anti,
    h1: "Jubilación anticipada en 2026: requisitos y edad",
    title: "Jubilación anticipada 2026: requisitos, edad y recortes",
    description: "Voluntaria: hasta 2 años antes con 35 cotizados. Involuntaria: hasta 4 años antes con 33 y 6 meses en el paro. Edad ordinaria 2026: 65 o 66 y 10 meses.",
    lead: "Respuesta corta: en 2026 la edad ordinaria de jubilación es 65 años si tienes 38 años y 3 meses cotizados o más, y 66 años y 10 meses si tienes menos. La jubilación anticipada voluntaria permite adelantarla hasta 2 años con 35 años cotizados; la involuntaria (por despido u otra causa ajena a ti), hasta 4 años con 33 años cotizados.",
    cta: { href: S.sedeSS.href, label: "Simular y pedir la jubilación en la sede" },
    secondaryCta: { href: S.a208.href, label: "Leer el artículo 208 en el BOE" },
    sources: [S.a208, S.a207, S.dt7, S.sedeSS],
    related: [L.vida, L.reval, L.carta, L.pnc, L.trabajo],
    disclaimer: "Resumen de la LGSS vigente a 27-10-2026. Hay regímenes especiales y jubilaciones con coeficientes reductores de la edad que no se recogen aquí.",
    faqs: [
      { q: "¿Cuántos años tengo que haber cotizado?", a: "35 años de cotización efectiva para la voluntaria y 33 para la involuntaria, sin contar pagas extra. El servicio militar o la prestación social sustitutoria cuentan como máximo un año." },
      { q: "¿Cuánto se recorta la pensión?", a: "Depende de los meses que adelantes y de tus años cotizados. En la voluntaria, adelantar 24 meses con menos de 38 años y 6 meses cotizados reduce un 21 %; con 44 años y 6 meses o más, un 13 % (cuadro del artículo 208.2)." },
      { q: "¿Qué cuenta como causa involuntaria?", a: "Entre otras, despido colectivo, despido objetivo, extinción por resolución judicial en concurso, muerte o jubilación del empresario individual y fuerza mayor (artículo 207). Además debes llevar 6 meses inscrito como demandante de empleo." },
      { q: "¿Hay algún requisito más en la voluntaria?", a: "Sí: la pensión resultante tiene que ser mayor que la pensión mínima que te correspondería a los 65 años." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY("los artículos 207 y 208 y la disposición transitoria 7.ª de la LGSS en el BOE")]),
      sec("edad", "Edad ordinaria en 2026", ["Disposición transitoria 7.ª de la LGSS."], [["38 años y 3 meses cotizados o más: 65 años", "Menos de 38 años y 3 meses: 66 años y 10 meses", "Desde 2027: 65 años con 38 años y 6 meses o más; 67 años con menos"]]),
      sec("modalidades", "Las dos modalidades", ["La edad mínima se calcula restando a tu edad ordinaria el adelanto máximo."], [["Voluntaria: hasta 2 años antes, 35 años cotizados", "Involuntaria: hasta 4 años antes, 33 años cotizados, 6 meses como demandante de empleo"]]),
      sec("ejemplo", "Ejemplo", ["Si en 2026 tienes 37 años cotizados, tu edad ordinaria es 66 años y 10 meses. En la voluntaria podrías jubilarte desde los 64 años y 10 meses, con la reducción que marque el cuadro del artículo 208."]),
    ],
  },
  {
    ...base,
    id: "pension-no-contributiva-2026",
    path: P.pnc,
    h1: "Pensión no contributiva de jubilación 2026: requisitos y cuantía",
    title: "Pensión no contributiva 2026: 8.803,20 € al año",
    description: "En 2026 la pensión no contributiva es de 8.803,20 € al año (628,80 € en 14 pagas). Requisitos: 65 años, 10 de residencia y no superar el límite de rentas.",
    lead: "Respuesta corta: la pensión no contributiva de jubilación de 2026 es de 8.803,20 € al año, que en 14 pagas son 628,80 € al mes (Real Decreto 241/2026). Pueden pedirla las personas de 65 años o más que vivan legalmente en España, hayan residido aquí 10 años desde los 16 (2 de ellos justo antes de pedirla) y no tengan rentas por encima del límite legal.",
    cta: { href: S.imserso.href, label: "Información del Imserso" },
    secondaryCta: { href: S.a369.href, label: "Leer el artículo 369 en el BOE" },
    sources: [S.rd241, S.a369, S.a363, S.imserso],
    related: [L.anti, L.reval, L.carta, L.trabajo],
    disclaimer: "La solicitud la gestionan las comunidades autónomas (o el Imserso en Ceuta y Melilla). El límite de rentas cambia si convives con otras personas.",
    faqs: [
      { q: "¿Cuánto cobro al mes?", a: "La cuantía íntegra en 2026 es 8.803,20 € al año; en 14 pagas, 628,80 €. Si tienes algunos ingresos, la pensión puede ser menor." },
      { q: "¿Cuál es el límite de ingresos?", a: "Para una persona sola, tener rentas anuales inferiores a la propia cuantía de la pensión (8.803,20 € en 2026). Si convives con familiares, se suman los ingresos de la unidad económica y el límite es mayor (artículo 363)." },
      { q: "¿Desde cuándo se cobra?", a: "Desde el primer día del mes siguiente al de la solicitud (artículo 371)." },
      { q: "¿Hay complemento por alquiler?", a: "Sí, en 2026 son 525 € al año para quien no tiene vivienda en propiedad y vive de alquiler, con requisitos (artículo 21.2 del Real Decreto 241/2026)." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", [BY("el Real Decreto 241/2026 y los artículos 363 y 369 de la LGSS en el BOE")]),
      sec("requisitos", "Requisitos", ["Artículo 369 de la LGSS."], [["Tener 65 años o más", "Residir legalmente en España", "Haber residido 10 años entre los 16 y la edad de solicitud, 2 de ellos seguidos e inmediatamente antes", "No superar el límite de rentas del artículo 363"]]),
      sec("cuantia", "Cuantía 2026", ["8.803,20 € anuales (artículo 21.1 del Real Decreto 241/2026), en 14 pagas de 628,80 €. Complemento de alquiler: 525 € anuales."]),
      sec("donde", "Dónde se pide", ["En los servicios sociales de tu comunidad autónoma, o en el Imserso si vives en Ceuta o Melilla."]),
    ],
  },
];

const PERMISO_SECTIONS: GuideSection[] = [
  sec("ejemplos-turno", "Ejemplos por turno (27-10-2026)", ["Artículo 13 del Real Decreto 605/1999: hasta 4 horas libres retribuidas dentro de la jornada si coincide con el horario de votación (9:00 a 20:00). Con jornada reducida, el permiso se reduce en proporción."], [[
    "Turno de 8:00 a 16:00 (jornada completa): coincide con las urnas, hasta 4 horas retribuidas.",
    "Turno de 15:00 a 23:00: coincide de 15:00 a 20:00, también hasta 4 horas.",
    "Turno de noche de 22:00 a 6:00: no coincide con el horario de votación, así que no hay permiso para votar.",
    "Media jornada (50 %) que coincide con las urnas: el permiso se reduce en proporción, hasta 2 horas.",
  ]]),
  sec("correo-trabajo", "Si trabajas fuera de tu municipio", ["El artículo 13.2 da hasta 4 horas libres retribuidas para pedir el certificado de inscripción en el censo y enviar el voto por correo, si trabajas lejos de tu domicilio."]),
  sec("mesa", "Si te toca mesa o eres interventor", ["El artículo 13.3 da el día completo retribuido si no es tu día de descanso semanal y una reducción de jornada el día siguiente."]),
];

const IN: Record<string, { href: string; label: string }[]> = {
  "/hacienda/modelo-030": [L.vf, L.base],
  "/trabajo/autonomos-cambio-base-cotizacion-2027": [L.reg],
  "/trabajo/verifactu-obligatorio-1-enero-2027": [L.reg],
  "/trabajo/revalorizacion-pensiones-2026": [L.carta, L.anti, L.pnc],
  "/trabajo/vida-laboral": [L.anti],
  "/elecciones/permiso-trabajo-para-votar": [{ href: S.rd605.href, label: S.rd605.label }],
};

export function enlazarPendientes1027(g: Guide): Guide {
  if (g.path === "/elecciones/permiso-trabajo-para-votar") {
    const ids = new Set(g.sections.map((s) => s.id));
    g.sections = [...g.sections, ...PERMISO_SECTIONS.filter((s) => !ids.has(s.id))];
    g.reviewedAt = R;
    g.faqs = [...(g.faqs ?? []), { q: "¿Tengo permiso si trabajo de noche?", a: "Solo si tu turno coincide con el horario de votación (9:00 a 20:00). Un turno de 22:00 a 6:00 no coincide, así que no genera el permiso del artículo 13 del Real Decreto 605/1999." }];
    return g;
  }
  const add = IN[g.path];
  if (!add) return g;
  const have = new Set(g.related.map((r) => r.href));
  g.related = [...g.related, ...add.filter((r) => !have.has(r.href) && r.href.startsWith("/"))];
  return g;
}
