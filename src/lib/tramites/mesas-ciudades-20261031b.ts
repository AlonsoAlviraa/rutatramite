import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Lote 2 del 31-10-2026: «¿En qué mesa electoral voto en <ciudad>?» para 20 ciudades más, y el índice
 * /elecciones/mesa-electoral-por-ciudad con las 25 (5 del lote 1 + estas 20).
 * Cada ciudad solo entra con una página municipal o un boletín oficial del 29-N abierto el 31-10-2026 (curl 200; Granada
 * leída con WebFetch porque su servidor rechaza curl) y su Junta Electoral de Zona sacada del directorio de la JEC.
 * Cifras de mesas: del Ayuntamiento o de nuestro recuento de la relación de la OCE publicada en boletín. Sin fuente, sin cifra.
 * Descartadas hoy: Sevilla y Alicante (timeout), Bilbao y Oviedo (403), Gijón (web solo JavaScript), Málaga (solo páginas de
 * las autonómicas), Santa Cruz de Tenerife (504), Tarragona (web de 2024), A Coruña (403), Salamanca, Burgos, Albacete,
 * Toledo, Huesca, Teruel, Huelva y Lugo (sin página municipal verificada del 29-N).
 */

const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const by = (fuente: string) => sec("byline", "Autoría y revisión", [`Por Equipo RutaTrámite. Última revisión: 31 de octubre de 2026, con ${fuente}.`]);
type L = { href: string; label: string };
type Row = [string, string, string];

const INE_MESAS: L = { href: "https://sede.ine.gob.es/tramite/consulta_mesas_locales/", label: "Sede del INE: consulta de mesas y locales electorales (sin identificación)" };
const INE_CLAVE: L = { href: "https://sede.ine.gob.es/tramite/censo_electoral/", label: "Sede del INE: consulta de inscripción en el censo con Cl@ve (muestra tu mesa)" };
const INE_NOTA: L = { href: "https://www.ine.es/dyngs/Prensa/es/EG2026.htm", label: "INE: nota de prensa de la Oficina del Censo Electoral para el 29-N" };
const JEC_CAL: L = { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario de las elecciones generales 2026 (PDF)" };
const JEZ = (ccaa: string, id: number, donde: string): L => ({ href: `https://www.juntaelectoralcentral.es/cs/jec/admelectoral/jezona/directorio?comunidad=${ccaa}&sIdCCAA=${id}&template=Jez/JEC_Provincias`, label: `Junta Electoral Central: directorio de Juntas Electorales de Zona (${donde})` });
const BASE = [INE_MESAS, INE_CLAVE, INE_NOTA, JEC_CAL];
const AND = (d: string) => JEZ("Andaluc%C3%ADa", 63, d);
const CYL = (d: string) => JEZ("Castilla%20y%20Le%C3%B3n", 70, d);
const CAT = (d: string) => JEZ("Catalu%C3%B1a", 67, d);

export const INDICE_MESAS = "/elecciones/mesa-electoral-por-ciudad";
const P = (c: string) => `/elecciones/mesa-electoral-${c}`;

/** Las 25 ciudades con página propia, ordenadas por comunidad. */
export const CIUDADES_MESA: { c: string; n: string; ccaa: string; lote: 1 | 2 }[] = [
  { c: "cordoba", n: "Córdoba", ccaa: "Andalucía", lote: 2 },
  { c: "granada", n: "Granada", ccaa: "Andalucía", lote: 2 },
  { c: "zaragoza", n: "Zaragoza", ccaa: "Aragón", lote: 1 },
  { c: "palma", n: "Palma", ccaa: "Illes Balears", lote: 2 },
  { c: "las-palmas-de-gran-canaria", n: "Las Palmas de Gran Canaria", ccaa: "Canarias", lote: 2 },
  { c: "santander", n: "Santander", ccaa: "Cantabria", lote: 2 },
  { c: "guadalajara", n: "Guadalajara", ccaa: "Castilla-La Mancha", lote: 2 },
  { c: "avila", n: "Ávila", ccaa: "Castilla y León", lote: 2 },
  { c: "leon", n: "León", ccaa: "Castilla y León", lote: 2 },
  { c: "palencia", n: "Palencia", ccaa: "Castilla y León", lote: 2 },
  { c: "segovia", n: "Segovia", ccaa: "Castilla y León", lote: 2 },
  { c: "soria", n: "Soria", ccaa: "Castilla y León", lote: 1 },
  { c: "valladolid", n: "Valladolid", ccaa: "Castilla y León", lote: 1 },
  { c: "barcelona", n: "Barcelona", ccaa: "Cataluña", lote: 2 },
  { c: "girona", n: "Girona", ccaa: "Cataluña", lote: 2 },
  { c: "lleida", n: "Lleida", ccaa: "Cataluña", lote: 2 },
  { c: "elche", n: "Elche", ccaa: "Comunitat Valenciana", lote: 2 },
  { c: "valencia", n: "Valencia", ccaa: "Comunitat Valenciana", lote: 1 },
  { c: "caceres", n: "Cáceres", ccaa: "Extremadura", lote: 2 },
  { c: "vigo", n: "Vigo", ccaa: "Galicia", lote: 2 },
  { c: "logrono", n: "Logroño", ccaa: "La Rioja", lote: 2 },
  { c: "madrid", n: "Madrid", ccaa: "Comunidad de Madrid", lote: 1 },
  { c: "murcia", n: "Murcia", ccaa: "Región de Murcia", lote: 2 },
  { c: "pamplona", n: "Pamplona", ccaa: "Navarra", lote: 2 },
  { c: "vitoria-gasteiz", n: "Vitoria-Gasteiz", ccaa: "País Vasco", lote: 2 },
];
const NOMBRE: Record<string, string> = Object.fromEntries(CIUDADES_MESA.map((x) => [x.c, x.n]));
export const MESAS_CIUDADES_1031B_PATHS = CIUDADES_MESA.filter((x) => x.lote === 2).map((x) => P(x.c));

const rel = (vecinas: string[]): L[] => [
  { href: INDICE_MESAS, label: "Mesa electoral por ciudad: las 25 ciudades" },
  { href: "/elecciones/donde-voto-mesa-electoral", label: "Dónde voto el 29-N: mesa y colegio electoral" },
  { href: "/elecciones/tarjeta-censal-cuando-llega", label: "Tarjeta censal: cuándo llega" },
  { href: "/elecciones/que-llevar-a-votar", label: "Qué llevar a votar" },
  { href: "/elecciones/cambio-de-domicilio-y-censo", label: "Me he mudado: dónde voto" },
  { href: "/elecciones/sorteo-mesa-electoral-29n", label: "Sorteo de mesas: cuándo te avisan" },
  ...vecinas.map((c) => ({ href: P(c), label: `En qué mesa voto en ${NOMBRE[c]}` })),
];
const disc = (n: string) => `Datos de ${n} tomados de fuentes oficiales abiertas el 31-10-2026; si la relación definitiva los cambia, vale la definitiva.`;

const PLAZOS = () => sec("plazos", "Fechas que importan (calendario de la JEC)", [
  "Fechas comunes a toda España, del calendario de la Junta Electoral Central y de la nota del INE.",
], [[
  "12 de octubre: los boletines oficiales publicaron la relación de secciones, locales y mesas.",
  "31 de octubre a 4 de noviembre: los plenos municipales sortean a los miembros de mesa.",
  "Desde el 2 de noviembre: el INE envía las tarjetas censales con tu mesa y tu local.",
  "19 a 28 de noviembre: se exponen las relaciones definitivas de mesas y locales.",
  "29 de noviembre: votación de 9:00 a 20:00.",
]]);

const INE_PASOS = (prov: string, muni: string) => sec("como-mirarlo", `Tu mesa en ${muni} sin esperar a la tarjeta`, [
  `Consulta del INE: provincia de ${prov}, municipio de ${muni}, calle y número. Devuelve sección, mesa y local.`,
]);

const tabla = (id: string, title: string, intro: string, caption: string, rows: Row[], src: L): GuideSection => ({
  ...sec(id, title, [intro]),
  table: { caption, head: ["Local", "Dirección (como figura en la relación)", "Mesas"], rows: rows.map((cells) => ({ cells, source: src })) },
});

type In = Omit<Guide, "id" | "pack" | "reviewedAt" | "path" | "h1" | "disclaimer" | "related"> & { vecinas: string[] };
const G = (c: string, o: In): Guide => {
  const { vecinas, ...rest } = o;
  return { id: `mesa-electoral-${c}`, pack: "elecciones", reviewedAt: "2026-10-31", path: P(c), h1: `¿En qué mesa electoral voto en ${NOMBRE[c]}? Dónde mirarlo`, disclaimer: disc(NOMBRE[c]), related: rel(vecinas), ...rest };
};

// ---------- fuentes por ciudad (abiertas el 31-10-2026) ----------
const MU_NOT: L = { href: "https://web.murcia.es/noticia/los-ciudadanos-ya-pueden-consultar-el-censo-electoral-para-las-elecciones-del-29-de", label: "Ayuntamiento de Murcia: consulta del censo para el 29-N (electores, colegios y mesas)" };
const LP_HUB: L = { href: "https://www.laspalmasgc.es/es/ayuntamiento/elecciones/elecciones-a-cortes-generales-2026/", label: "Ayuntamiento de Las Palmas de Gran Canaria: Elecciones a Cortes Generales 2026" };
const LP_NOTA: L = { href: "https://www.laspalmasgc.es/es/ayuntamiento/prensa-y-comunicacion/notas-de-prensa/nota-de-prensa/El-Pleno-municipal-aprueba-la-designacion-de-los-miembros-de-las-mesas-electorales-del-proximo-29-de-noviembre/", label: "Ayuntamiento de Las Palmas de GC: el Pleno designa a los miembros de las mesas" };
const LP_MESA: L = { href: "https://www.laspalmasgc.es/es/ayuntamiento/elecciones/consulta-de-mesa-electoral/", label: "Ayuntamiento de Las Palmas de GC: consulta de mesa electoral" };
const VI_CONS: L = { href: "https://sede.vigo.org/expedientes/formularios/consulta_censo.jsp", label: "Sede del Concello de Vigo: consulta del censo electoral" };
const VI_ANUN: L = { href: "https://sede.vigo.org/expedientes/taboleiro/getarchivo_finpub.jsp?id=4074", label: "Concello de Vigo: anuncio de exposición del censo para el 29-N (PDF)" };
const CO_SEDE: L = { href: "https://www.cordoba.es/sede/tramites/elecciones/consulta-censo-electoral", label: "Sede del Ayuntamiento de Córdoba: consulta del censo electoral y Junta de Zona" };
const CO_BOP: L = { href: "https://bop.dipucordoba.es/visor-pdf/12-10-2026/BOP-S-2026-197.pdf", label: "BOP de Córdoba, 12-10-2026: relación de secciones, mesas y locales (OCE)" };
const GR_EL: L = { href: "https://www.granada.org/v2010.nsf/xxtod/8757DBD0C89C3AEEC1258E8A00239753?OpenDocument=&pag=ini01", label: "Ayuntamiento de Granada: Elecciones Generales 29 de noviembre de 2026" };
const GR_BOP: L = { href: "https://bop-admin.dipgra.es/export/sites/bop/.galleries/Documentos-Anuncios-en-PDF/firmado-1791759606452-final-7e597b2a.pdf", label: "BOP de Granada nº 197, 12-10-2026: relación de mesas electorales (OCE, PDF)" };
const GR_ANUN: L = { href: "https://bop-admin.dipgra.es/publica/buscador-anuncios/anuncio/Relacion-de-mesas-electorales-para-la-celebracion-de-Elecciones-Generales-de-29-de-noviembre-de-2026/", label: "BOP de Granada: anuncio de la relación de mesas para el 29-N" };
const VT_NOT: L = { href: "https://www.vitoria-gasteiz.org/wb021/was/contenidoAction.do?idioma=es&uid=u31039bda_1a18566997a__26b9", label: "Ayuntamiento de Vitoria-Gasteiz: sorteo de mesas del 29-N" };
const PA_SORT: L = { href: "https://www.pamplona.es/actualidad/noticias/el-sorteo-para-la-composicion-de-las-263-mesas-electorales-para-las-elecciones", label: "Ayuntamiento de Pamplona: sorteo de las 263 mesas" };
const PA_CENSO: L = { href: "https://www.pamplona.es/actualidad/noticias/la-ciudadania-podra-consultar-del-12-al-19-de-octubre-su-inclusion-en-el-censo", label: "Ayuntamiento de Pamplona: consulta del censo del 12 al 19 de octubre" };
const PA_SEDE: L = { href: "https://sedeelectronica.pamplona.es/FichaTramite.aspx?id=70333VA", label: "Sede de Pamplona: tarjeta censal y consulta electoral" };
const SA_TAB: L = { href: "https://sede.santander.es/publicaciones/tablon-anuncios/elecciones-generales-29-noviembre-2026", label: "Sede de Santander: tablón, Elecciones Generales 29 de noviembre de 2026" };
const SA_PDF: L = { href: "https://sede.santander.es/sites/sede.santander.es/files/secretaria_general-oficina_censo_listado_colegios_y_mesas.pdf", label: "Ayuntamiento de Santander: lista de mesas por local electoral del 29-N (PDF)" };
const SA_CONS: L = { href: "https://sede.santander.es/tramites/consulta-del-censo-electoral", label: "Sede de Santander: consulta del censo electoral" };
const LE_EXP: L = { href: "https://sede.aytoleon.es/RecursosWeb/ANUNCIO_EXPOSICION_EN_EL_AYTO_DE_LAS_SECCIONES_LOCALES_Y_MESAS_29_N.pdf", label: "Ayuntamiento de León: anuncio de exposición de secciones, locales y mesas del 29-N (PDF)" };
const LE_RECT: L = { href: "https://sede.aytoleon.es/RecursosWeb/RECTIFICACIONESDELCENSOENPERIODOELECTORAL29112026.pdf", label: "Ayuntamiento de León: rectificaciones del censo en periodo electoral (PDF)" };
const LO_NOT: L = { href: "https://logrono.es/-/el-2-de-noviembre-se-realizara-el-sorteo-publico-para-la-formacion-de-las-194-mesas-electorales-de-las-elecciones-a-cortes-generales-del-29-de-noviembre", label: "Ayuntamiento de Logroño: sorteo de las 194 mesas el 2 de noviembre" };
const LO_EL: L = { href: "https://logrono.es/elecciones", label: "Ayuntamiento de Logroño: elecciones" };
const PM_BOIB: L = { href: "https://www.caib.es/eboibfront/pdf/ca/2026/135/1230974", label: "BOIB núm. 135, 22-10-2026: modificación de un local electoral de Palma (OCE)" };
const EL_HUB: L = { href: "https://www.elche.es/elecciones-generales-29-noviembre-2026/", label: "Ayuntamiento de Elche: Elecciones Generales 29 de noviembre de 2026" };
const BC_FORM: L = { href: "https://seuelectronica.ajuntament.barcelona.cat/APPS/portaltramits/formulari/ptbconsulcoel/T104/init/es/default.html", label: "Sede del Ayuntamiento de Barcelona: consulta del colegio electoral" };
const LL_SORT: L = { href: "https://www.paeria.cat/ca/serveis/eleccionsgenerals29n/sorteig-meses-electorals", label: "La Paeria (Lleida): sorteig de meses electorals" };
const LL_INFO: L = { href: "https://www.paeria.cat/ca/serveis/eleccionsgenerals29n/informacio-del-proces-electoral", label: "La Paeria (Lleida): informació del procés electoral" };
const GI_NOT: L = { href: "https://web.girona.cat/noticies/-/asset_publisher/XSyGgXBoY2Z0/content/exposici%C3%B3-p%C3%BAblica-del-cens-electoral-i-presentaci%C3%B3-de-reclamacions-amb-motiu-de-les-eleccions-al-congr%C3%A9s-i-senat-del-29-novembre-2026", label: "Ajuntament de Girona: exposició pública del cens per al 29-N" };
const GI_CENS: L = { href: "https://www.girona.cat/cens", label: "Ajuntament de Girona: consulta dels col·legis electorals" };
const GI_MAPA: L = { href: "https://umat.girona.cat/vu/mapa/cerca_mesa/", label: "Ajuntament de Girona: cercador de mesa per adreça" };
const SG_HUB: L = { href: "https://segovia.es/elecciones-generales-2026", label: "Ayuntamiento de Segovia: Elecciones Generales 2026" };
const SG_SML: L = { href: "https://segovia.es/secciones-mesas-y-locales-electorales", label: "Ayuntamiento de Segovia: secciones, mesas y locales electorales" };
const SG_PDF: L = { href: "https://segovia.es/sites/default/files/Components/File_list/Files/Listado_Mesas_Electorales.pdf", label: "Ayuntamiento de Segovia: lista de mesas electorales del 29-N (OCE, PDF)" };
const AV_SEDE: L = { href: "https://sede.avila.es/eAdmin/Registrar.do?action=infoTramite&tipoReg=92", label: "Sede del Ayuntamiento de Ávila: consulta de inscripción en el censo" };
const AV_BOP: L = { href: "https://www.diputacionavila.es/bops/2026/12-10-2026/12-10-2026_203926.pdf", label: "BOP de Ávila, 12-10-2026: relación de secciones, locales y mesas (OCE, PDF)" };
const PL_OVC: L = { href: "https://ovc.aytopalencia.es/sta/CarpetaPublic/Public?APP_CODE=STA&PAGE_CODE=MESA_CENSO", label: "Ayuntamiento de Palencia: consulta de mesa electoral" };
const PL_BOP: L = { href: "https://www.diputaciondepalencia.es/system/files/bop/2026/20261012-bop-3-Extraordinario.pdf", label: "BOP de Palencia nº 3 extraordinario, 12-10-2026: secciones, mesas y locales (PDF)" };
const PL_BOPP: L = { href: "https://www.diputaciondepalencia.es/servicios/boletin-oficial-provincia/bop-no-3-lunes-12-octubre-2026", label: "Diputación de Palencia: BOP nº 3 extraordinario del 12-10-2026" };
const CC_MESAS: L = { href: "https://mesaselectorales.ayto-caceres.es/", label: "Ayuntamiento de Cáceres: consulta de mesa electoral" };
const CC_PLENO: L = { href: "https://www.ayto-caceres.es/plenos-municipales/convocatoria-pleno-extraordinario-3-de-noviembre-de-2026/", label: "Ayuntamiento de Cáceres: pleno extraordinario del 3-11-2026 (formación de mesas)" };
const GU_NOT: L = { href: "https://www.guadalajara.es/es/noticia/el-ayuntamiento-de-guadalajara-expone-al-publico-el-censo-electoral-para-las-elecciones-generales-del-29-de-noviembre.html", label: "Ayuntamiento de Guadalajara: exposición del censo para el 29-N" };
const GU_BOP: L = { href: "https://boletin.dguadalajara.es/boletin/pdf/pdf2026_2642.pdf", label: "BOP de Guadalajara nº 194, 12-10-2026: secciones, mesas y locales (OCE, PDF)" };
const GU_BOPP: L = { href: "https://boletin.dguadalajara.es/boletin/index.php/2-anuncios/66211-SECCIONES-MESAS-YLOCALES-ELECTORALES-ELECCIONES-GENERALES-NOVIEMBRE-2026", label: "BOP de Guadalajara: anuncio de secciones, mesas y locales del 29-N" };

export const MESAS_CIUDADES_1031B_GUIDES: Guide[] = [
  G("murcia", {
    title: "Mesa electoral en Murcia el 29-N: 521 mesas y cómo verla",
    description: "Murcia tendrá 521 mesas en 140 colegios para 344.070 electores el 29-N, según datos provisionales del Ayuntamiento. Cómo ver tu mesa.",
    lead: "Respuesta corta: según el Ayuntamiento de Murcia, el municipio vota el 29-N en 521 mesas repartidas en 140 colegios, para 344.070 electores españoles (cifras provisionales, con el padrón a 1 de agosto de 2026). Como el término incluye ciudad y pedanías, no des por hecho el colegio de siempre: tu mesa sale en la tarjeta censal o en la consulta del INE por dirección.",
    cta: INE_MESAS, secondaryCta: MU_NOT,
    sources: [MU_NOT, ...BASE, JEZ("Regi%C3%B3n%20de%20Murcia", 78, "Región de Murcia")],
    vecinas: ["elche", "valencia", "granada"],
    faqs: [
      { q: "¿Cuántos colegios electorales hay en el municipio de Murcia?", a: "140 colegios con 521 mesas, para 344.070 electores españoles, según la nota municipal sobre la consulta del censo. El Ayuntamiento las presenta como cifras provisionales, con el padrón de referencia del 1 de agosto de 2026." },
      { q: "¿Dónde se podía revisar el censo en persona en Murcia?", a: "En el Servicio de Estadística (calle Puerta Nueva 10 B), de lunes a viernes de 9:00 a 14:00 y de 15:30 a 18:00, y el sábado 17 de octubre de 10:00 a 14:00, además de en las oficinas municipales de distritos y pedanías. El plazo terminó el 19 de octubre." },
      { q: "Vivo en una pedanía de Murcia: ¿voto en la ciudad?", a: "Votas en el local que corresponde a tu sección, que puede estar en tu pedanía. Compruébalo en la consulta del INE con tu calle y número, o en la tarjeta censal." },
      { q: "¿Dónde está la Junta Electoral de Zona de Murcia?", a: "En la Ciudad de la Justicia (avenida Ciudad de la Justicia s/n, 30011). Teléfonos 608 349 075 y 699 966 363, según el directorio de la Junta Electoral Central. Ahí se presentan las excusas de los miembros de mesa." },
      { q: "¿Las 521 mesas de Murcia son la cifra definitiva?", a: "No necesariamente: es la cifra provisional del Ayuntamiento. La relación definitiva se expone del 19 al 28 de noviembre." },
    ],
    sections: [
      by("la nota del Ayuntamiento de Murcia sobre la consulta del censo, la nota del INE y el directorio de Juntas de Zona de la JEC"),
      sec("cifras", "Murcia en cifras oficiales", ["344.070 electores españoles, 140 colegios y 521 mesas en todo el término municipal, con datos provisionales. Sale una media de unas 3,7 mesas por colegio: en muchos colegios habrá varias mesas, y la tuya (A, B, C…) depende de la inicial de tu primer apellido."]),
      sec("municipal", "Qué hizo el Ayuntamiento de Murcia", ["Abrió la consulta del censo hasta el 19 de octubre en el Servicio de Estadística y en las oficinas de distritos y pedanías. Ese plazo ya está cerrado: si detectas un error ahora, llama a la Oficina del Censo Electoral (900 343 232)."]),
      INE_PASOS("Murcia", "Murcia"),
    ],
  }),
  G("las-palmas-de-gran-canaria", {
    title: "Mesa electoral en Las Palmas de GC: 537 mesas el 29-N",
    description: "Las Palmas de Gran Canaria vota el 29-N en 537 mesas y 138 colegios; el Pleno ya designó a 8.055 personas. Cómo ver tu mesa.",
    lead: "Respuesta corta: Las Palmas de Gran Canaria tendrá 537 mesas en 138 colegios y 283 secciones, para 339.213 electores, según la nota del Ayuntamiento sobre el Pleno que designó a los miembros de mesa. Tu mesa la ves en la tarjeta censal, en la consulta del INE o desde la página municipal de consulta de mesa.",
    cta: LP_MESA, secondaryCta: INE_MESAS,
    sources: [LP_HUB, LP_NOTA, LP_MESA, ...BASE, JEZ("Canarias", 68, "Canarias")],
    vecinas: ["palma", "murcia", "madrid"],
    faqs: [
      { q: "¿Cuántas personas han sido designadas para las mesas en Las Palmas de GC?", a: "8.055, a razón de 15 por mesa. De ellas, 1.611 se sentarán en las mesas el 29-N, según la nota del Ayuntamiento." },
      { q: "¿Qué distrito de Las Palmas de GC aporta más miembros de mesa?", a: "Ciudad Alta, con 2.340 designados. Le siguen Centro (1.635), Vegueta-Cono Sur-Tafira (1.455), Isleta-Puerto-Canteras-Guanarteme (1.410) y Tamaraceite-San Lorenzo-Tenoya (1.215)." },
      { q: "¿Cuántas urnas y cabinas se montan en Las Palmas de GC?", a: "1.074 urnas y 300 cabinas de votación, según la misma nota municipal." },
      { q: "¿Dónde está la Junta Electoral de Zona de Las Palmas de Gran Canaria?", a: "En la Ciudad de la Justicia, calle Málaga 2, torre 3, planta 1 (35016). Teléfonos 928 429 875 y 928 429 876, según el directorio de la JEC." },
      { q: "¿Cuántos electores hay por mesa en Las Palmas de GC?", a: "De media, unos 632: 339.213 electores entre 537 mesas. Es una media; cada mesa tiene un tramo de apellidos concreto." },
    ],
    sections: [
      by("la nota del Ayuntamiento de Las Palmas de Gran Canaria sobre la designación de mesas, su web de elecciones, la nota del INE y el directorio de la JEC"),
      sec("cifras", "Las cifras del Ayuntamiento", ["537 mesas, 138 colegios, 283 secciones y 339.213 electores. Para formar las mesas se designaron 8.055 personas, de las que 1.611 se sentarán el 29-N, y se preparan 1.074 urnas y 300 cabinas."], [[
        "Ciudad Alta: 2.340 designados.", "Centro: 1.635.", "Vegueta-Cono Sur-Tafira: 1.455.", "Isleta-Puerto-Canteras-Guanarteme: 1.410.", "Tamaraceite-San Lorenzo-Tenoya: 1.215.",
      ]]),
      sec("municipal", "La página municipal de consulta de mesa", ["El Ayuntamiento tiene un apartado de elecciones a Cortes Generales 2026 con una página propia de consulta de mesa electoral. Si no te resuelve, la consulta del INE por dirección funciona sin identificarte."]),
      INE_PASOS("Las Palmas", "Las Palmas de Gran Canaria"),
    ],
  }),
  G("vigo", {
    title: "Mesa electoral en Vigo el 29-N: consulta del Concello",
    description: "En Vigo la sede del Concello te dice colegio, distrito, sección y mesa con tu DNI. Teléfonos y hasta cuándo funciona esa consulta.",
    lead: "Respuesta corta: en Vigo la consulta del censo de la sede del Concello te devuelve tu colegio, su dirección, el distrito, la sección y la mesa con tu DNI y su letra. Según el anuncio municipal, esa base de datos deja de funcionar después del día de la votación. También tienes la tarjeta censal y la consulta del INE por dirección.",
    cta: VI_CONS, secondaryCta: INE_MESAS,
    sources: [VI_CONS, VI_ANUN, ...BASE, JEZ("Galicia", 73, "Galicia")],
    vecinas: ["leon", "santander", "palencia"],
    faqs: [
      { q: "¿Qué datos pide la consulta de censo del Concello de Vigo?", a: "Tu DNI con la letra. Devuelve colegio, dirección, distrito, sección y mesa." },
      { q: "¿Hasta cuándo funciona la consulta municipal de Vigo?", a: "Hasta el día de la elección: el anuncio del Concello avisa de que su base de datos deja de estar operativa después." },
      { q: "¿Cuándo se expuso el censo en Vigo?", a: "Del 12 al 19 de octubre: en la sede electrónica, por teléfono (986 810 132, de 9:00 a 13:30) y en persona en el Servizo de Estatística. La versión en castellano del anuncio trae una errata en la fecha final; el calendario oficial fija el 19." },
      { q: "¿Dónde está la Junta Electoral de Zona de Vigo?", a: "En la Ciudad de la Justicia, calle Padre Feijoo 1, 4ª planta (36204). Teléfonos 986 817 008 y 886 218 421, según el directorio de la JEC." },
      { q: "¿A qué teléfono general del Concello de Vigo llamo?", a: "Al 010 o al 986 810 100. El Concello está en la Praza do Rei 1." },
    ],
    sections: [
      by("la consulta de censo de la sede del Concello de Vigo, su anuncio de exposición del 09-10-2026, la nota del INE y el directorio de la JEC"),
      sec("municipal", "La consulta propia del Concello", ["La sede electrónica de Vigo tiene un formulario de consulta del censo: escribes el DNI con letra y te muestra colegio, dirección, distrito, sección y mesa. Según el anuncio de exposición, el Secretario General del Pleno actúa como delegado de la Junta Electoral de Zona."]),
      INE_PASOS("Pontevedra", "Vigo"),
    ],
  }),
  G("cordoba", {
    title: "Mesa electoral en Córdoba el 29-N: consulta y Junta de Zona",
    description: "Córdoba: tu mesa del 29-N en la tarjeta censal y el INE; la relación oficial salió en el BOP del 12-10-2026. Horario de la Junta de Zona.",
    lead: "Respuesta corta: en Córdoba tu mesa y tu colegio salen en la tarjeta censal y en las consultas del INE. La sede municipal enlaza la consulta del INE con DNI electrónico o certificado y da el horario de la Junta Electoral de Zona. La relación oficial de secciones, mesas y locales se publicó en el BOP de Córdoba del 12 de octubre (anuncio BOP-A-2026-3459).",
    cta: CO_SEDE, secondaryCta: INE_MESAS,
    sources: [CO_SEDE, CO_BOP, ...BASE, AND("Andalucía")],
    vecinas: ["granada", "caceres", "murcia"],
    faqs: [
      { q: "¿Qué horario tiene la Junta Electoral de Zona de Córdoba?", a: "De lunes a viernes de 10:00 a 13:00 y de 17:00 a 19:00, y los sábados de 10:00 a 13:00, según la sede del Ayuntamiento. Teléfono 600 156 142 y fax 957 002 487." },
      { q: "¿Dónde está la Junta de Zona de Córdoba?", a: "En la Ciudad de la Justicia de Córdoba. El teléfono 600 156 142 coincide en la sede municipal y en el directorio de la JEC." },
      { q: "¿Dónde se publicó la lista de colegios de Córdoba?", a: "En el BOP de Córdoba del 12-10-2026, anuncio BOP-A-2026-3459 de la Oficina del Censo Electoral, con las secciones, mesas y locales de la provincia. Es un documento escaneado, por eso no damos un recuento propio." },
      { q: "¿A qué teléfono del Ayuntamiento de Córdoba llamo?", a: "Al 010 de atención ciudadana, o al 957 49 99 00 y al 957 47 80 50. La sede central está en la calle Capitulares 1." },
      { q: "¿La consulta de Córdoba pide certificado digital?", a: "La sede municipal remite a la consulta del censo del INE, que pide DNI electrónico o certificado. Si no tienes ninguno, usa la consulta del INE por dirección, que no pide identificarse." },
    ],
    sections: [
      by("la sede del Ayuntamiento de Córdoba, el BOP de Córdoba del 12-10-2026, la nota del INE y el directorio de la JEC"),
      sec("municipal", "Lo que dice la sede de Córdoba", ["La ficha municipal de consulta del censo enlaza la sede del INE y añade los datos de contacto de la Junta Electoral de Zona, con horario de mañana y de tarde. Es útil si te toca mesa y quieres presentar una excusa en persona."]),
      INE_PASOS("Córdoba", "Córdoba"),
    ],
  }),
  G("granada", {
    title: "Mesa electoral en Granada el 29-N: 285 mesas y colegios",
    description: "Granada capital tendrá 285 mesas en 109 locales el 29-N, según el BOP del 12-10-2026. Los colegios con más mesas y dónde ver la tuya.",
    lead: "Respuesta corta: Granada capital votará en 285 mesas repartidas en 109 locales y 9 distritos, según nuestro recuento de la relación de la Oficina del Censo Electoral publicada en el BOP de Granada nº 197, del 12 de octubre de 2026. Tu mesa exacta la dicen la tarjeta censal y la consulta del INE.",
    cta: INE_MESAS, secondaryCta: GR_EL,
    sources: [GR_EL, GR_BOP, GR_ANUN, ...BASE, AND("Andalucía")],
    vecinas: ["cordoba", "murcia", "elche"],
    faqs: [
      { q: "¿Cuántas mesas electorales hay en Granada capital el 29-N?", a: "285 mesas en 109 locales (códigos de local distintos), 180 secciones y 9 distritos. Es el recuento de las filas del municipio de Granada en la relación del BOP del 12-10-2026." },
      { q: "¿Qué colegio de Granada tiene más mesas?", a: "El Colegio Genil (calle San Antón 87), con 8 mesas. Le sigue el Complejo Deportivo Antonio Prieto Castillo (avenida Federico García Lorca 21), con 7." },
      { q: "¿Dónde se podía consultar el censo en Granada?", a: "Del 12 al 19 de octubre, en las Juntas Municipales de Distrito, de lunes a viernes de 9:00 a 14:00. Las de Beiro y Centro abrieron también de 18:00 a 20:00 y el fin de semana de 11:00 a 13:00." },
      { q: "¿Dónde veo cómo se resolvieron las reclamaciones al censo en Granada?", a: "En la Secretaría General del Ayuntamiento, plaza del Carmen s/n, 1ª planta, de 9:00 a 14:00, según la web municipal de elecciones." },
      { q: "¿Dónde está la Junta Electoral de Zona de Granada?", a: "En el Edificio Judicial La Caleta, avenida del Sur 5 (18071). Teléfono 600 156 060, según el directorio de la JEC." },
    ],
    sections: [
      by("la web de elecciones del Ayuntamiento de Granada (leída con WebFetch, porque su servidor rechaza curl), la relación de la OCE en el BOP de Granada nº 197, la nota del INE y el directorio de la JEC"),
      tabla("colegios", "Los locales de Granada con más mesas", "Recuento propio: una mesa por fila del boletín. Nombres y direcciones como los escribe el boletín.", "Locales de Granada capital con más mesas, 29-11-2026 (BOP de Granada, 12-10-2026)", [
        ["Colegio Genil", "Calle San Antón 87", "8"],
        ["Complejo Deportivo Antonio Prieto Castillo", "Avda. Federico García Lorca 21", "7"],
        ["I.E.S. Virgen de las Nieves", "Avda. Andalucía (de) 38", "6"],
        ["I.E.S. Miguel de Cervantes", "Camino Real de los Neveros 1", "6"],
        ["Colegio San José", "Calle Tablas 13", "5"],
        ["Colegio Regina Mundi", "Calle Arabial 63", "5"],
      ], GR_BOP),
      INE_PASOS("Granada", "Granada"),
    ],
  }),
  G("vitoria-gasteiz", {
    title: "Mesa electoral en Vitoria-Gasteiz: sorteo el 2-N y consulta",
    description: "Vitoria-Gasteiz sortea sus mesas el 2 de noviembre a las 9:30 y el resultado se consulta del 3 al 5. Requisitos y plazo para alegar.",
    lead: "Respuesta corta: en Vitoria-Gasteiz tu mesa y tu colegio salen en la tarjeta censal y en la consulta del INE. Para saber si te toca formar parte de una mesa: el Ayuntamiento hace el sorteo el 2 de noviembre de 2026 a las 9:30 en la Casa Consistorial y permite consultar el resultado el 3, 4 y 5 de noviembre.",
    cta: VT_NOT, secondaryCta: INE_MESAS,
    sources: [VT_NOT, ...BASE, JEZ("Pa%C3%ADs%20Vasco", 76, "País Vasco")],
    vecinas: ["pamplona", "logrono", "santander"],
    faqs: [
      { q: "¿Cuándo es el sorteo de mesas en Vitoria-Gasteiz?", a: "El 2 de noviembre de 2026 a las 9:30, en la Casa Consistorial, según el Ayuntamiento." },
      { q: "¿Cuándo puedo consultar si me ha tocado mesa en Vitoria-Gasteiz?", a: "El 3, el 4 y el 5 de noviembre, según el Ayuntamiento. La notificación oficial llega aparte." },
      { q: "¿Qué requisitos hay para ser miembro de mesa en Vitoria-Gasteiz?", a: "Los que recuerda el Ayuntamiento: tener menos de 70 años. Para presidir hace falta el título de Bachiller o FP de segundo grado." },
      { q: "¿Qué plazo tengo para alegar en Vitoria-Gasteiz si me toca mesa?", a: "7 días naturales, ante la Junta Electoral de Zona de Vitoria-Gasteiz: avenida Gasteiz 18 (01008), teléfono 945 004 922, según el directorio de la JEC." },
      { q: "¿Hay cifras oficiales de mesas de Vitoria-Gasteiz para 2026?", a: "La nota del sorteo no da el número de mesas y la lista de locales que hay en la web municipal es de 2023. Por eso no damos cifra; usa la tarjeta censal o el INE." },
    ],
    sections: [
      by("la nota del Ayuntamiento de Vitoria-Gasteiz sobre el sorteo, la nota del INE y el directorio de la JEC"),
      sec("sorteo", "El sorteo de Vitoria-Gasteiz paso a paso", ["Sorteo el 2 de noviembre a las 9:30; consulta individual del resultado el 3, 4 y 5 de noviembre; 7 días naturales para alegar. No confundas la mesa en la que votas (sale en la tarjeta censal) con haber sido designado miembro de mesa (te lo notifican)."]),
      INE_PASOS("Araba/Álava", "Vitoria-Gasteiz"),
    ],
  }),
  G("pamplona", {
    title: "Mesa electoral en Pamplona el 29-N: 263 mesas en 27 centros",
    description: "Pamplona vota el 29-N en 263 mesas en 27 centros; el sorteo es el 4-N. Cómo consultar por web o en el 010 y cuándo llega la tarjeta censal.",
    lead: "Respuesta corta: Pamplona tendrá 263 mesas en 27 centros para 154.927 personas con derecho a voto, según el Ayuntamiento. El sorteo de los miembros de mesa es en pleno el 4 de noviembre a las 9:00, y desde ese día se puede consultar en la web municipal o en el 010 con el DNI. Para saber dónde votas, mira la tarjeta censal o la consulta del INE.",
    cta: PA_SEDE, secondaryCta: INE_MESAS,
    sources: [PA_SORT, PA_CENSO, PA_SEDE, ...BASE, JEZ("Navarra", 75, "Navarra")],
    vecinas: ["vitoria-gasteiz", "logrono", "zaragoza"],
    faqs: [
      { q: "¿Cuántas personas forman las mesas de Pamplona?", a: "2.367 designadas: 789 titulares y 1.578 suplentes, según la nota municipal del sorteo." },
      { q: "¿Cómo se hace el sorteo en Pamplona?", a: "Con 9 números aleatorios de cuatro cifras. De 154.927 personas con derecho a voto, 36.525 no pueden ser designadas; 82.652 pueden presidir y 116.742 pueden ser vocales." },
      { q: "¿Cómo se consultaba el censo en Pamplona?", a: "Del 12 al 19 de octubre, en el 010 o el 948 420 100 (de lunes a viernes de 8:00 a 19:00 y sábados de 9:30 a 13:30) o en la web, con DNI y primer apellido. No hubo exposición en papel, por protección de datos." },
      { q: "¿Cuándo llega la tarjeta censal en Pamplona?", a: "Entre el 2 y el 10 de noviembre, según la sede municipal. Es informativa: no sirve como documento de identidad para votar." },
      { q: "¿Dónde está la Junta Electoral de Zona de Pamplona?", a: "En la plaza del Juez Elío (31011). Teléfono 848 424 137, según el directorio de la JEC." },
    ],
    sections: [
      by("las notas del Ayuntamiento de Pamplona sobre el censo y el sorteo, su sede electrónica, la nota del INE y el directorio de la JEC"),
      sec("cifras", "Pamplona en cifras oficiales", ["263 mesas en 27 centros. El censo provisional de octubre era de 154.972 personas; la nota del sorteo habla ya de 154.927 con derecho a voto."]),
      sec("consulta", "Cómo consultar en Pamplona", ["Desde el día del sorteo, la web municipal y el 010 te dicen con el DNI si has sido designado. Para saber dónde votas, la tarjeta censal (2 a 10 de noviembre) o la consulta del INE."]),
      INE_PASOS("Navarra", "Pamplona"),
    ],
  }),
  G("santander", {
    title: "Mesa electoral en Santander el 29-N: 178 mesas en 43 locales",
    description: "Santander vota el 29-N en 178 mesas y 43 locales, según la lista municipal del 14-10-2026. Los locales con más mesas y dónde preguntar.",
    lead: "Respuesta corta: Santander tendrá 178 mesas en 43 locales electorales y 8 distritos, según la lista de mesas por local que publica el Ayuntamiento en su sede (fechada el 14 de octubre de 2026). Tu mesa sale en la tarjeta censal y en el INE; el día de la votación puedes preguntar en el Servicio de Estadística.",
    cta: SA_CONS, secondaryCta: SA_PDF,
    sources: [SA_TAB, SA_PDF, SA_CONS, ...BASE, JEZ("Cantabria", 69, "Cantabria")],
    vecinas: ["vitoria-gasteiz", "leon", "palencia"],
    faqs: [
      { q: "¿Cuántas mesas electorales hay en Santander?", a: "178 mesas en 43 locales, según los totales de la lista municipal de mesas por local electoral para el 29 de noviembre de 2026. Nuestro recuento fila a fila da las mismas cifras." },
      { q: "¿Qué locales de Santander tienen más mesas?", a: "El Centro Cívico Cazoña (calle Poeta Gerardo Diego 4) y el Centro Cívico «Juan de Santander» (calle Inés Diego del Noval 23 A), con 11 cada uno, y el Ayuntamiento (plaza del Ayuntamiento 1), con 9." },
      { q: "¿Dónde pregunto mi mesa en Santander el día de la votación?", a: "En el Servicio de Estadística: Edificio Ribalaigua, calle Los Escalantes 3, 2º, según la ficha municipal de consulta del censo." },
      { q: "¿Qué distrito de Santander tiene más mesas?", a: "El 08, con 48 mesas, seguido del 02 (30) y del 07 (27). El 01 tiene 10." },
      { q: "¿Dónde está la Junta Electoral de Zona de Santander?", a: "En la avenida Pedro San Martín s/n (39010). Teléfono 942 357 050, extensión 40850, según el directorio de la JEC." },
    ],
    sections: [
      by("el tablón y la lista de mesas por local de la sede del Ayuntamiento de Santander, su ficha de consulta del censo, la nota del INE y el directorio de la JEC"),
      tabla("colegios", "Los locales de Santander con más mesas", "Recuento propio de la lista municipal (36 páginas). Nombres y direcciones como figuran en ella.", "Locales de Santander con más mesas, 29-11-2026 (lista del Ayuntamiento, 14-10-2026)", [
        ["Centro Cívico Cazoña", "Calle Poeta Gerardo Diego 4", "11"],
        ["Centro Cívico «Juan de Santander»", "Calle Inés Diego del Noval 23 A", "11"],
        ["Ayuntamiento", "Plaza Ayuntamiento 1", "9"],
        ["Finca Altamira", "Paseo Altamira (de) 77", "8"],
        ["Colegio Público Cisneros", "Calle Cardenal Cisneros 71", "7"],
        ["Centro Cívico Callealtero", "Plaza Derechos Humanos (los) 1", "7"],
      ], SA_PDF),
      INE_PASOS("Cantabria", "Santander"),
    ],
  }),
  G("leon", {
    title: "Mesa electoral en León el 29-N: dónde consultar y reclamar",
    description: "En León la relación de secciones, locales y mesas se expone en la sede municipal; el censo rectificado se consulta en la OCE. Direcciones.",
    lead: "Respuesta corta: en León tu mesa sale en la tarjeta censal y en la consulta del INE. El Ayuntamiento expone en su sede la relación de secciones, locales y mesas del 29-N, y desde el 23 de octubre las rectificaciones del censo se consultan en la Oficina del Censo Electoral y en el Servicio de Información y Registro.",
    cta: INE_MESAS, secondaryCta: LE_EXP,
    sources: [LE_EXP, LE_RECT, ...BASE, CYL("Castilla y León")],
    vecinas: ["palencia", "valladolid", "avila"],
    faqs: [
      { q: "¿Dónde consulto el censo rectificado en León?", a: "Desde el 23 de octubre, en la Oficina del Censo Electoral de León (avenida Reyes Leoneses 14, 1º) y en el Servicio de Información y Registro del Ayuntamiento, de 9:00 a 14:00." },
      { q: "¿Cuántas reclamaciones al censo hubo en León?", a: "10, que el Ayuntamiento remitió a la Oficina del Censo Electoral, según su anuncio de rectificaciones." },
      { q: "¿Dónde se pudo consultar el censo en León?", a: "Del 12 al 19 de octubre en la Casa Consistorial, avenida Ordoño II 10, planta baja." },
      { q: "¿Ante quién se reclamaba la delimitación de mesas en León?", a: "Ante la Junta Electoral Provincial, del 13 al 18 de octubre, según el anuncio municipal de exposición. Ese plazo está cerrado." },
      { q: "¿Dónde está la Junta Electoral de Zona de León?", a: "En la avenida del Ingeniero Sáenz de Miera 6 (24071). Teléfono 987 296 719, según el directorio de la JEC." },
    ],
    sections: [
      by("los anuncios del Ayuntamiento de León sobre la exposición de mesas y las rectificaciones del censo, la nota del INE y el directorio de la JEC"),
      sec("municipal", "Lo que publicó el Ayuntamiento de León", ["Un anuncio de exposición de secciones, locales y mesas en la sede electrónica desde el 12 de octubre, y otro sobre las rectificaciones del censo: 10 reclamaciones remitidas a la Oficina del Censo Electoral, con consulta del resultado desde el 23 de octubre."]),
      INE_PASOS("León", "León"),
    ],
  }),
  G("logrono", {
    title: "Mesa electoral en Logroño el 29-N: 194 mesas y sorteo el 2-N",
    description: "Logroño forma 194 mesas para el 29-N y las sortea el 2 de noviembre a las 9:00. Teléfonos municipales y plazo para excusarse.",
    lead: "Respuesta corta: Logroño vota el 29-N en 194 mesas, según el Ayuntamiento, que sortea a sus miembros en pleno el lunes 2 de noviembre a las 9:00. Tu mesa sale en la tarjeta censal y en el INE; el Ayuntamiento atiende dudas en el 941 277 000 y el 010.",
    cta: LO_EL, secondaryCta: INE_MESAS,
    sources: [LO_NOT, LO_EL, ...BASE, JEZ("La%20Rioja", 77, "La Rioja")],
    vecinas: ["pamplona", "vitoria-gasteiz", "zaragoza"],
    faqs: [
      { q: "¿Cuántas personas se sortean por mesa en Logroño?", a: "9 por mesa, según la nota municipal: presidente y dos vocales, cada uno con dos suplentes." },
      { q: "¿Dónde se publicó la relación de mesas de Logroño?", a: "En el Boletín Oficial de La Rioja del 12 de octubre, según el Ayuntamiento." },
      { q: "¿Qué plazo tengo para excusarme si me toca mesa en Logroño?", a: "7 días desde la notificación, ante la Junta Electoral de Zona de Logroño, como recuerda el Ayuntamiento citando la Instrucción 2/2025 de la JEC." },
      { q: "¿Dónde está la Junta Electoral de Zona de Logroño?", a: "En la Oficina de Registro y Reparto, calle Marqués de Murrieta 45-47, planta baja. Teléfono 941 291 100, extensión 39503, según el directorio de la JEC." },
      { q: "¿Cuándo atiende en persona el Ayuntamiento de Logroño?", a: "De lunes a viernes de 9:00 a 14:00 y de 17:00 a 19:00, según su página de elecciones. Teléfonos 941 277 000 y 010." },
    ],
    sections: [
      by("la nota del Ayuntamiento de Logroño sobre el sorteo, su página de elecciones, la nota del INE y el directorio de la JEC"),
      sec("sorteo", "El sorteo de Logroño", ["Pleno el lunes 2 de noviembre a las 9:00 para formar las 194 mesas: 1.746 puestos entre titulares y suplentes si se aplican las 9 personas por mesa que indica el Ayuntamiento. Las notificaciones llegan después del sorteo."]),
      INE_PASOS("La Rioja", "Logroño"),
    ],
  }),
  G("palma", {
    title: "Mesa electoral en Palma el 29-N: cambio de local y consulta",
    description: "Palma: el colegio Verge de Lluc cambia de dirección para el 29-N (BOIB del 22-10-2026). Qué mesas afecta y cómo ver la tuya.",
    lead: "Respuesta corta: en Palma tu mesa sale en la tarjeta censal y en la consulta del INE. Ojo si votas en el Col·legi Públic Verge de Lluc: el BOIB del 22 de octubre de 2026 cambió su dirección de la calle Moreneta 2 a la calle Goya 1 para las secciones 045 y 046 del distrito 04.",
    cta: INE_MESAS, secondaryCta: PM_BOIB,
    sources: [PM_BOIB, ...BASE, JEZ("Illes%20Balears", 66, "Illes Balears")],
    vecinas: ["barcelona", "valencia", "las-palmas-de-gran-canaria"],
    faqs: [
      { q: "¿Qué mesas de Palma cambian de dirección?", a: "Las del Col·legi Públic Verge de Lluc del distrito 04: sección 045 (mesa A, apellidos A-L; mesa B, M-Z) y sección 046 (mesa A, A-L; mesa B, M-Z). Pasan de la calle Moreneta 2 a la calle Goya 1." },
      { q: "¿Quién publicó el cambio de local en Palma?", a: "La delegación de la Oficina del Censo Electoral en Illes Balears, en el BOIB núm. 135 del 22-10-2026, con firma del 20-10-2026." },
      { q: "¿Dónde está la lista completa de colegios de Palma?", a: "En el BOIB núm. 129, del 12 de octubre de 2026 (registro 10220), con la relación de secciones, locales y mesas, según el propio anuncio de corrección." },
      { q: "¿Dónde está la Junta Electoral de Zona de Palma?", a: "En la Via Alemania 5 (07003). Teléfono 971 678 603, según el directorio de la JEC." },
      { q: "¿Por qué no dais el número de mesas de Palma?", a: "Porque hoy no hemos podido leer el BOIB del 12 de octubre completo ni la consulta municipal de Palma, que no respondía. Sin fuente oficial leída, no damos cifra." },
    ],
    sections: [
      by("el BOIB núm. 135 del 22-10-2026, la nota del INE y el directorio de la JEC"),
      sec("cambio", "El cambio de local publicado en el BOIB", ["Donde decía calle Moreneta 2, ahora dice calle Goya 1, para las cuatro mesas del Col·legi Públic Verge de Lluc (04-045-A, 04-045-B, 04-046-A y 04-046-B). Si votabas allí, comprueba la dirección en la tarjeta censal antes de ir."]),
      INE_PASOS("Illes Balears", "Palma"),
    ],
  }),
  G("elche", {
    title: "Mesa electoral en Elche el 29-N: enlaces del Ayuntamiento",
    description: "Elche reúne en su web del 29-N la consulta de mesas del INE, el censo municipal y la JEC. Teléfonos de la OMAC y la Junta de Zona.",
    lead: "Respuesta corta: en Elche la página municipal de las elecciones del 29-N reúne la consulta de mesas y locales del INE, la consulta de inscripción en el censo y una consulta del censo municipal. Tu mesa también sale en la tarjeta censal. Para dudas, la OMAC atiende en el 010 (966 65 80 50).",
    cta: EL_HUB, secondaryCta: INE_MESAS,
    sources: [EL_HUB, ...BASE, JEZ("Comunitat%20Valenciana", 79, "Comunitat Valenciana")],
    vecinas: ["valencia", "murcia", "palma"],
    faqs: [
      { q: "¿Qué enlaces da la web del Ayuntamiento de Elche para el 29-N?", a: "La página de la Junta Electoral Central sobre estas elecciones, la consulta del censo municipal 2026, la consulta de mesas y locales del INE y la consulta de inscripción en el censo del INE." },
      { q: "¿A qué teléfono del Ayuntamiento de Elche llamo?", a: "A la OMAC en el 010 (966 65 80 50) o a la centralita, 966 65 80 00. El Ayuntamiento está en la Plaça de Baix 1." },
      { q: "¿Dónde está la Junta Electoral de Zona de Elche?", a: "En la Ciudad de la Justicia, calle Abogados de Atocha 21, planta baja (03203). Teléfono 966 917 521, según el directorio de la JEC." },
      { q: "¿Funciona la consulta del censo municipal de Elche?", a: "Cuando la probamos el 31 de octubre no respondía. Usa la consulta del INE por dirección, que no pide identificarte, o la tarjeta censal." },
      { q: "¿Cuántas mesas tiene Elche?", a: "La web municipal no lo dice y hoy no hemos leído el BOP de Alicante, así que no damos cifra." },
    ],
    sections: [
      by("la página del Ayuntamiento de Elche sobre las elecciones del 29-N, la nota del INE y el directorio de la JEC"),
      sec("municipal", "La página del Ayuntamiento de Elche", ["Es una página de enlaces: Junta Electoral Central, censo municipal, consulta de mesas y locales del INE y consulta de inscripción. Si solo buscas dónde votar, la consulta de mesas del INE es la más rápida."]),
      INE_PASOS("Alicante", "Elche"),
    ],
  }),
  G("barcelona", {
    title: "Mesa electoral en Barcelona el 29-N: consulta del colegio",
    description: "Barcelona tiene un trámite para consultar tu colegio electoral con tu dirección y tu NIF, pasaporte o NIE. Cómo usarlo y la Junta de Zona.",
    lead: "Respuesta corta: en Barcelona la sede del Ayuntamiento tiene un trámite de consulta del colegio electoral: escribes la dirección en la que estás empadronado y tu documento (NIF, pasaporte o NIE). También tienes la tarjeta censal y la consulta del INE por dirección.",
    cta: BC_FORM, secondaryCta: INE_MESAS,
    sources: [BC_FORM, ...BASE, CAT("Cataluña")],
    vecinas: ["girona", "lleida", "palma"],
    faqs: [
      { q: "¿Qué datos pide el trámite de Barcelona para ver mi colegio electoral?", a: "El tipo de vía, el nombre y el número de tu domicilio, y el tipo y número de documento: NIF, pasaporte o NIE." },
      { q: "¿Qué dirección pongo en la consulta de Barcelona?", a: "La de tu empadronamiento en la fecha de cierre del censo, el 1 de agosto de 2026. Si te mudaste después, lo normal es que votes según la dirección anterior; compruébalo en el INE." },
      { q: "¿Dónde está la Junta Electoral de Zona de Barcelona?", a: "En la Ciutat de la Justícia, Gran Via de les Corts Catalanes 111, edificio C, planta 1 (08071). Teléfonos 935 548 821 y 936 113 811, según el directorio de la JEC." },
      { q: "¿Por qué no dais el número de mesas de Barcelona?", a: "Porque hoy no hemos leído una fuente oficial con esa cifra. Sin fuente oficial, no hay número." },
      { q: "¿El trámite de Barcelona falló antes?", a: "En la mañana del 31 de octubre mostraba un aviso de no disponible por causas técnicas; esa misma tarde ya cargaba el formulario. Si vuelve a fallar, usa el INE." },
    ],
    sections: [
      by("el trámite de consulta del colegio electoral de la sede del Ayuntamiento de Barcelona, la nota del INE y el directorio de la JEC"),
      sec("municipal", "El trámite del Ayuntamiento de Barcelona", ["Es un formulario de un paso: domicilio (tipo de vía, nombre y número) y documento de identificación. Te devuelve el colegio que corresponde a esa dirección."]),
      INE_PASOS("Barcelona", "Barcelona"),
    ],
  }),
  G("lleida", {
    title: "Mesa electoral en Lleida el 29-N: sorteo el 2-N por YouTube",
    description: "Lleida sortea sus mesas el 2 de noviembre a las 9:30 en el Saló de sessions, con emisión en YouTube. Cómo ver tu mesa y oficinas de Correos.",
    lead: "Respuesta corta: en Lleida tu mesa sale en la tarjeta censal y en la consulta del INE. La Paeria hace el sorteo público de las mesas el 2 de noviembre de 2026 a las 9:30 en el Saló de sessions y lo emite por YouTube. El censo que vale es el cerrado el 1 de agosto de 2026.",
    cta: LL_SORT, secondaryCta: INE_MESAS,
    sources: [LL_SORT, LL_INFO, ...BASE, CAT("Cataluña")],
    vecinas: ["girona", "barcelona", "zaragoza"],
    faqs: [
      { q: "¿Cuándo es el sorteo de mesas en Lleida?", a: "El 2 de noviembre de 2026 a las 9:30, en el Saló de sessions de la Paeria, con retransmisión por YouTube." },
      { q: "¿Qué censo se usa en Lleida para el 29-N?", a: "El cerrado el 1 de agosto de 2026, con los cambios de padrón comunicados hasta el 30 de julio, según la Paeria." },
      { q: "¿Dónde pido el voto por correo en Lleida?", a: "En Correos. La Paeria cita las oficinas de Rambla Ferran 16 (973 228 748) y calle Segòvia 8 (973 268 260), de lunes a viernes de 8:30 a 20:30 y sábados de 9:30 a 13:00." },
      { q: "¿Dónde está la Junta Electoral de Zona de Lleida?", a: "En la calle Canyeret 3 (25007). Teléfono 973 700 182, según el directorio de la JEC." },
      { q: "¿Hasta cuándo se puede pedir el voto por correo en Lleida?", a: "Del 6 de octubre al 19 de noviembre de 2026, según la Paeria. Si lo pides, ya no puedes votar en persona en tu mesa." },
    ],
    sections: [
      by("las páginas de la Paeria sobre el sorteo y sobre el proceso electoral, la nota del INE y el directorio de la JEC"),
      sec("municipal", "Lo que explica la Paeria", ["La web municipal del 29-N tiene apartados de información del proceso, sorteo de mesas y voto por correo. Para saber dónde votas, la consulta del INE por dirección es la vía más directa."]),
      INE_PASOS("Lleida", "Lleida"),
    ],
  }),
  G("girona", {
    title: "Mesa electoral en Girona el 29-N: buscador y cambios de local",
    description: "Girona tiene un buscador de mesa por dirección y avisa de un cambio: la Escola Taialà pasa al Centre Cívic Ter. Cómo comprobar tu colegio.",
    lead: "Respuesta corta: en Girona el Ayuntamiento tiene un buscador propio: escribes la dirección en la que estabas empadronado y te dice tu colegio. Atención a un cambio de este año: la Escola Taialà se sustituye por el Centre Cívic Ter. También tienes la tarjeta censal y la consulta del INE.",
    cta: GI_CENS, secondaryCta: INE_MESAS,
    sources: [GI_CENS, GI_MAPA, GI_NOT, ...BASE, CAT("Cataluña")],
    vecinas: ["barcelona", "lleida", "palma"],
    faqs: [
      { q: "¿Qué colegio electoral cambia en Girona?", a: "La Escola Taialà se sustituye por el Centre Cívic Ter, según la página municipal de consulta de colegios." },
      { q: "¿Cómo funciona el buscador de mesa de Girona?", a: "Escribes la dirección de empadronamiento y te muestra el colegio. Vale la dirección en la que estabas empadronado en la fecha de cierre del censo, el 1 de agosto de 2026." },
      { q: "¿Dónde se expuso el censo en Girona?", a: "En las oficinas municipales de atención y registro (OAMR), entre ellas la de la plaça del Vi 1, del 12 al 19 de octubre. Información ciudadana: 972 419 010; centralita: 972 419 000." },
      { q: "¿Dónde está la Junta Electoral de Zona de Girona?", a: "En el edificio de los Juzgados, avenida Ramon Folch 4-6 (17004). Teléfono 972 181 706, según el directorio de la JEC." },
      { q: "¿Puedo seguir reclamando el censo en Girona?", a: "No en el Ayuntamiento: el 19 de octubre fue el último día en las OAMR. Para dudas sobre tu inscripción, llama a la Oficina del Censo Electoral (900 343 232)." },
    ],
    sections: [
      by("las páginas del Ajuntament de Girona sobre el censo y los colegios, su buscador de mesa, la nota del INE y el directorio de la JEC"),
      sec("cambios", "Cambios de ubicación en Girona", ["El Ayuntamiento avisa de cambios de colegio y cita expresamente el de la Escola Taialà, que pasa al Centre Cívic Ter. Aunque votes siempre en el mismo sitio, merece la pena pasar tu dirección por el buscador."]),
      INE_PASOS("Girona", "Girona"),
    ],
  }),
  G("segovia", {
    title: "Mesa electoral en Segovia el 29-N: 63 mesas y sus colegios",
    description: "Segovia capital vota el 29-N en 63 mesas y 24 locales, según la lista de la OCE que publica el Ayuntamiento. Colegios con más mesas.",
    lead: "Respuesta corta: Segovia capital tendrá 63 mesas en 24 locales y 7 distritos, según nuestro recuento de la lista de la Oficina del Censo Electoral que publica el Ayuntamiento. La relación se expone en la Oficina de Estadística, en el Centro Cívico de San José, y en el tablón de la sede electrónica.",
    cta: SG_SML, secondaryCta: INE_MESAS,
    sources: [SG_HUB, SG_SML, SG_PDF, ...BASE, CYL("Castilla y León")],
    vecinas: ["avila", "valladolid", "madrid"],
    faqs: [
      { q: "¿Cuántas mesas hay en Segovia capital el 29-N?", a: "63 mesas en 24 locales: 5 en el distrito 01, 3 en el 02, 10 en el 03, 18 en el 04, 13 en el 05, 7 en el 06 y 7 en el 07, según la lista de la OCE del 06-10-2026." },
      { q: "¿Qué colegio de Segovia tiene más mesas?", a: "El C.P. Diego de Colmenares (paseo del Conde de Sepúlveda 2), con 6. Después, el Colegio Público Villalpando (calle Ribera 4) y el C.P. El Peñascal (calle Ávila 4), con 5 cada uno." },
      { q: "¿Dónde se consulta el censo en Segovia?", a: "En el Centro Cívico de San José, planta 1ª, sala 5 (calle Tomasa de la Iglesia 1), de lunes a viernes de 9:00 a 14:00, durante todo el periodo electoral." },
      { q: "¿Dónde está la Junta Electoral de Zona de Segovia?", a: "En la avenida Gerardo Diego 3 (40004). Teléfonos 921 524 851 y 921 466 397, según el directorio de la JEC." },
      { q: "¿Hasta cuándo valía pedir no recibir propaganda en Segovia?", a: "Las peticiones de exclusión hechas hasta el 19 de octubre valen para estas elecciones, según el Ayuntamiento." },
    ],
    sections: [
      by("las páginas de elecciones y de secciones, mesas y locales del Ayuntamiento de Segovia, la lista de mesas de la OCE que publica, la nota del INE y el directorio de la JEC"),
      tabla("colegios", "Los colegios de Segovia con más mesas", "Recuento propio de la lista de mesas del municipio de Segovia (código 194).", "Locales de Segovia capital con más mesas, 29-11-2026 (lista de la OCE publicada por el Ayuntamiento)", [
        ["C.P. Diego de Colmenares", "Paseo Conde de Sepúlveda (del) 2", "6"],
        ["Colegio Público Villalpando", "Calle Ribera 4", "5"],
        ["C.P. El Peñascal", "Calle Ávila 4", "5"],
        ["Colegio Público Carlos de Lecea", "Calle Greco (del) 2", "4"],
        ["Instituto Giner de los Ríos", "Avda. Constitución (la) 19", "4"],
        ["Centro Cívico Nueva Segovia", "Calle Dámaso Alonso 27", "4"],
      ], SG_PDF),
      INE_PASOS("Segovia", "Segovia"),
    ],
  }),
  G("avila", {
    title: "Mesa electoral en Ávila el 29-N: 59 mesas según el BOP",
    description: "Ávila capital tendrá 59 mesas en 30 locales el 29-N, según el BOP del 12-10-2026. Los colegios con más mesas y cómo consultar el censo.",
    lead: "Respuesta corta: Ávila capital votará en 59 mesas, 30 locales y 6 distritos, según nuestro recuento de la relación de la Oficina del Censo Electoral publicada en el BOP de Ávila del 12 de octubre de 2026. Tu mesa sale en la tarjeta censal y en la consulta del INE.",
    cta: INE_MESAS, secondaryCta: AV_BOP,
    sources: [AV_SEDE, AV_BOP, ...BASE, CYL("Castilla y León")],
    vecinas: ["segovia", "valladolid", "madrid"],
    faqs: [
      { q: "¿Cuántas mesas hay en Ávila capital el 29-N?", a: "59 mesas en 30 locales: 3 en el distrito 01, 3 en el 02, 4 en el 03, 20 en el 04, 11 en el 05 y 18 en el 06, según la relación del BOP." },
      { q: "¿Qué colegios de Ávila tienen más mesas?", a: "Con 4 mesas cada uno, el Nuevo Centro Integrado de Formación Profesional (calle Giacomo Puccini 2) y el Colegio Público Claudio Sánchez Albornoz (paseo de la Estación 1)." },
      { q: "¿La sede del Ayuntamiento de Ávila tiene consulta del censo?", a: "Tiene una ficha de consulta de inscripción en el censo electoral cuyo órgano responsable es la Oficina del Censo Electoral. Teléfono del Ayuntamiento: 920 350 000." },
      { q: "¿Dónde está la Junta Electoral de Zona de Ávila?", a: "En la calle Ramón y Cajal 1, esquina Vallespín (05001). Teléfonos 920 359 000 y 920 359 014, según el directorio de la JEC." },
      { q: "¿Las 59 mesas de Ávila son definitivas?", a: "Son las de la relación publicada el 12 de octubre. La definitiva se expone del 19 al 28 de noviembre." },
    ],
    sections: [
      by("la relación de la OCE en el BOP de Ávila del 12-10-2026, la sede del Ayuntamiento de Ávila, la nota del INE y el directorio de la JEC"),
      tabla("colegios", "Los colegios de Ávila con más mesas", "Recuento propio de las filas del municipio de Ávila en el BOP.", "Locales de Ávila capital con más mesas, 29-11-2026 (BOP de Ávila, 12-10-2026)", [
        ["Nuevo Centro Integrado de Formación Profesional", "Calle Giacomo Puccini 2", "4"],
        ["Colegio Público Claudio Sánchez Albornoz", "Paseo de la Estación 1", "4"],
        ["Instituto José Luis López Aranguren", "Calle Santo Tomás 8", "3"],
        ["Conservatorio Tomás Luis de Victoria", "Avda. España (de) 7", "3"],
      ], AV_BOP),
      INE_PASOS("Ávila", "Ávila"),
    ],
  }),
  G("palencia", {
    title: "Mesa electoral en Palencia el 29-N: 97 mesas y consulta",
    description: "Palencia capital vota el 29-N en 97 mesas y 37 locales, según el BOP del 12-10-2026. El Ayuntamiento tiene consulta de mesa con el NIF.",
    lead: "Respuesta corta: Palencia capital tendrá 97 mesas en 37 locales y 7 distritos, según nuestro recuento de la relación publicada en el BOP de Palencia nº 3 extraordinario, del 12 de octubre de 2026. El Ayuntamiento tiene una consulta propia de mesa electoral en su oficina virtual, que pide el NIF con letra.",
    cta: PL_OVC, secondaryCta: INE_MESAS,
    sources: [PL_OVC, PL_BOP, PL_BOPP, ...BASE, CYL("Castilla y León")],
    vecinas: ["leon", "valladolid", "segovia"],
    faqs: [
      { q: "¿Cuántas mesas hay en Palencia capital el 29-N?", a: "97 mesas en 37 locales: 5 en cada uno de los distritos 01, 02 y 03, 12 en el 04, 27 en el 05, 13 en el 06 y 30 en el 07, según la relación del BOP." },
      { q: "¿Qué pide la consulta de mesa del Ayuntamiento de Palencia?", a: "El NIF con letra, en la oficina virtual municipal." },
      { q: "¿Qué colegios de Palencia tienen más mesas?", a: "Ninguno pasa de 4. Con 4 están, entre otros, el Colegio Tello Téllez (calle Magisterio 1), el Centro Social José María Fernández Nieto (calle Juan Antonio Bardem 67) y el Centro de Mayores San Juanillo (calle Los Robles 9)." },
      { q: "¿Dónde está la Junta Electoral de Zona de Palencia?", a: "En la plaza de los Juzgados 4, 1ª planta (34001). Teléfonos 979 168 709 y 979 168 928, según el directorio de la JEC." },
      { q: "¿Qué distrito de Palencia tiene más mesas?", a: "El 07, con 30 mesas, seguido del 05, con 27." },
    ],
    sections: [
      by("la relación del BOP de Palencia nº 3 extraordinario del 12-10-2026, la consulta de mesa del Ayuntamiento de Palencia, la nota del INE y el directorio de la JEC"),
      tabla("colegios", "Colegios de Palencia con 4 mesas", "Recuento propio de las filas del municipio de Palencia en el BOP.", "Locales de Palencia capital con 4 mesas, 29-11-2026 (BOP de Palencia, 12-10-2026)", [
        ["Colegio Tello Téllez", "Calle Magisterio 1", "4"],
        ["Centro Social José María Fernández Nieto", "Calle Juan Antonio Bardem 67", "4"],
        ["Centro de Mayores San Juanillo", "Calle Robles (los) 9", "4"],
        ["Centro Social Pan y Guindas", "Calle Quito 1", "4"],
        ["Colegio Buenos Aires", "Calle Padilla 2", "4"],
        ["Colegio Ave María", "Paseo Otero (del) 15", "4"],
      ], PL_BOP),
      INE_PASOS("Palencia", "Palencia"),
    ],
  }),
  G("caceres", {
    title: "Mesa electoral en Cáceres el 29-N: consulta con DNI y fecha",
    description: "Cáceres tiene una consulta de mesa con DNI o NIE y fecha de nacimiento. El pleno que forma las mesas del 29-N es el 3 de noviembre.",
    lead: "Respuesta corta: en Cáceres el Ayuntamiento tiene una web propia de consulta de mesa electoral: escribes tu DNI o NIE con la letra y tu fecha de nacimiento y te dice el colegio y la mesa del 29-N. El pleno extraordinario que forma las mesas está convocado para el 3 de noviembre de 2026.",
    cta: CC_MESAS, secondaryCta: INE_MESAS,
    sources: [CC_MESAS, CC_PLENO, ...BASE, JEZ("Extremadura", 72, "Extremadura")],
    vecinas: ["cordoba", "madrid", "avila"],
    faqs: [
      { q: "¿Qué datos pide la consulta de mesa de Cáceres?", a: "El DNI o NIE con la letra y la fecha de nacimiento. Devuelve el colegio y la mesa para el 29-N." },
      { q: "¿Cuándo se forman las mesas en Cáceres?", a: "En el pleno extraordinario del 3 de noviembre de 2026, convocado para formar las mesas electorales en el plazo del artículo 26 de la LOREG." },
      { q: "¿Dónde está la Junta Electoral de Zona de Cáceres?", a: "En el Palacio de Justicia, avenida de la Hispanidad s/n (10002). Teléfono 927 620 294, extensión 36071, según el directorio de la JEC." },
      { q: "¿Sirve la consulta de Cáceres si estoy inscrito en otro municipio?", a: "Es una web del Ayuntamiento de Cáceres para su municipio. Si votas en otro, usa la consulta del INE por dirección." },
      { q: "¿Cuántas mesas hay en Cáceres?", a: "Hoy no hemos leído una fuente oficial con la cifra, así que no la damos." },
    ],
    sections: [
      by("la consulta de mesa electoral del Ayuntamiento de Cáceres, la convocatoria del pleno del 3-11-2026, la nota del INE y el directorio de la JEC"),
      sec("municipal", "La consulta propia de Cáceres", ["Es una web específica del Ayuntamiento para las elecciones generales del 29 de noviembre. Pide documento y fecha de nacimiento, sin certificado digital."]),
      INE_PASOS("Cáceres", "Cáceres"),
    ],
  }),
  G("guadalajara", {
    title: "Mesa electoral en Guadalajara el 29-N: 120 mesas según el BOP",
    description: "Guadalajara capital tendrá 120 mesas en 28 colegios el 29-N, según el BOP del 12-10-2026. El colegio con más mesas y cómo ver la tuya.",
    lead: "Respuesta corta: Guadalajara capital votará en 120 mesas, 28 colegios y 5 distritos, según nuestro recuento de la relación de la Oficina del Censo Electoral en el BOP de Guadalajara nº 194, del 12 de octubre de 2026. Tu mesa sale en la tarjeta censal y en la consulta del INE.",
    cta: INE_MESAS, secondaryCta: GU_BOP,
    sources: [GU_NOT, GU_BOP, GU_BOPP, ...BASE, JEZ("Castilla-La%20Mancha", 71, "Castilla-La Mancha")],
    vecinas: ["madrid", "segovia", "zaragoza"],
    faqs: [
      { q: "¿Cuántas mesas hay en Guadalajara capital el 29-N?", a: "120 mesas en 28 colegios: 30 en el distrito 01, 40 en el 02, 23 en el 03, 19 en el 04 y 8 en el 05, según la relación del BOP." },
      { q: "¿Qué colegio de Guadalajara tiene más mesas?", a: "El Colegio Las Lomas (avenida La Salinera 12), con 12. Le siguen la Escuela Oficial de Idiomas (calle Poeta Ramón de Garciasol 7), con 9, y el I.E.S. Aguas Vivas (avenida Beleña 9), con 8." },
      { q: "¿Qué documento pedían en Guadalajara para consultar el censo?", a: "DNI, pasaporte o permiso de conducir con fotografía, y solo podía consultarlo el propio interesado, según el Ayuntamiento. El plazo fue del 12 al 19 de octubre." },
      { q: "¿Dónde está la Junta Electoral de Zona de Guadalajara?", a: "En Mirador del Balconcillo 19, 2ª planta (19071). Teléfono 949 392 847, según el directorio de la JEC." },
      { q: "¿A quién recomendaba el Ayuntamiento de Guadalajara revisar el censo?", a: "A quienes votan por primera vez y a quienes han cambiado de domicilio. El Ayuntamiento está en la plaza Mayor 7; teléfono 949 88 70 70." },
    ],
    sections: [
      by("la relación de la OCE en el BOP de Guadalajara nº 194 del 12-10-2026, la nota del Ayuntamiento de Guadalajara, la nota del INE y el directorio de la JEC"),
      tabla("colegios", "Los colegios de Guadalajara con más mesas", "Recuento propio de las filas del municipio de Guadalajara en el BOP.", "Locales de Guadalajara capital con más mesas, 29-11-2026 (BOP de Guadalajara, 12-10-2026)", [
        ["Colegio Las Lomas", "Avda. Salinera (la) 12", "12"],
        ["Escuela Oficial de Idiomas", "Calle Poeta Ramón de Garciasol 7", "9"],
        ["I.E.S. Aguas Vivas", "Avda. Beleña 9", "8"],
        ["C.P. Alvarfáñez de Minaya", "Calle Constitución 31", "6"],
        ["I.E.S. José Luis Sampedro", "Calle Zaragoza 18", "5"],
      ], GU_BOP),
      INE_PASOS("Guadalajara", "Guadalajara"),
    ],
  }),
];

// ---------- índice /elecciones/mesa-electoral-por-ciudad ----------
const porCCAA: string[] = (() => {
  const m = new Map<string, string[]>();
  for (const x of CIUDADES_MESA) m.set(x.ccaa, [...(m.get(x.ccaa) ?? []), x.n]);
  return [...m.entries()].map(([ccaa, ns]) => `${ccaa}: ${ns.join(", ")}.`);
})();

export const INDICE_MESAS_GUIDE: Guide = {
  id: "mesa-electoral-por-ciudad",
  pack: "elecciones",
  reviewedAt: "2026-10-31",
  path: INDICE_MESAS,
  h1: "Mesa electoral por ciudad: dónde mirar la tuya el 29-N",
  title: "Mesa electoral por ciudad el 29-N: 25 ciudades con fuentes",
  description: "Índice de 25 ciudades con página propia de mesa electoral para el 29-N: consulta municipal, cifras oficiales de mesas y Junta de Zona.",
  lead: "Respuesta corta: elige tu ciudad y llegas a una página con su consulta municipal (si existe), las cifras de mesas cuando hay boletín o nota oficial, y su Junta Electoral de Zona. Si tu ciudad no está, la consulta del INE por dirección sirve para cualquier municipio y no pide identificarte.",
  cta: INE_MESAS,
  secondaryCta: INE_CLAVE,
  sources: [...BASE, { href: "https://www.juntaelectoralcentral.es/cs/jec/eleccionesEnCurso/Elecciones_generales_2026?apartado=mesaselectorales", label: "Junta Electoral Central: mesas electorales en las elecciones generales 2026" }],
  related: [
    ...CIUDADES_MESA.map((x) => ({ href: P(x.c), label: `En qué mesa voto en ${x.n}` })),
    { href: "/elecciones/donde-voto-mesa-electoral", label: "Dónde voto el 29-N: mesa y colegio electoral" },
    { href: "/elecciones/tarjeta-censal-cuando-llega", label: "Tarjeta censal: cuándo llega" },
  ],
  disclaimer: "Índice de páginas por ciudad revisadas el 31-10-2026. Solo incluimos ciudades con una fuente oficial del 29-N que hemos podido abrir ese día.",
  faqs: [
    { q: "¿Por qué no está mi ciudad en el índice de mesas?", a: "Porque el 31 de octubre no pudimos abrir una página municipal o un boletín oficial del 29-N para ella: por ejemplo, Sevilla, Alicante y Santa Cruz de Tenerife no respondían, y Bilbao y Oviedo bloqueaban la lectura. Mientras tanto, usa la consulta del INE por dirección." },
    { q: "¿De dónde salen las cifras de mesas de cada ciudad?", a: "De la nota o la web del Ayuntamiento, o de nuestro recuento de la relación de la Oficina del Censo Electoral publicada en el boletín oficial. Si no hay fuente oficial, la página no da cifra." },
    { q: "¿Qué ciudades del índice tienen consulta municipal de mesa?", a: "Entre otras, Valladolid, Madrid, Vigo, Las Palmas de Gran Canaria, Barcelona, Girona, Palencia, Cáceres y Santander tienen una consulta municipal del censo o del colegio. Pamplona usa además el 010 para saber si te toca formar mesa." },
    { q: "¿Qué ciudad del índice tiene más mesas?", a: "Madrid, con 3.635 mesas según su Ayuntamiento. Entre las del lote nuevo, Las Palmas de Gran Canaria (537) y Murcia (521, cifra provisional)." },
    { q: "¿Cuándo volveréis a revisar las páginas de mesas por ciudad?", a: "Con cada novedad oficial. La próxima importante es la exposición de las relaciones definitivas, del 19 al 28 de noviembre." },
  ],
  sections: [
    by("las páginas de las 25 ciudades, la nota del INE y el calendario de la JEC"),
    sec("ciudades", "Ciudades con página propia, por comunidad", ["25 ciudades a 31 de octubre de 2026. Cada una está enlazada en «Relacionado»."], [porCCAA]),
    sec("metodo", "Cómo elegimos las ciudades", ["Empezamos por capitales de provincia y ciudades grandes. Una ciudad entra solo si ese día abrimos una fuente oficial del 29-N (página municipal o boletín) y tenemos su Junta Electoral de Zona del directorio de la JEC. Las que fallan quedan fuera hasta que su fuente responda."]),
    PLAZOS(),
  ],
};

export const MESAS_CIUDADES_1031B_ALL: Guide[] = [...MESAS_CIUDADES_1031B_GUIDES, INDICE_MESAS_GUIDE];

const IDX: L = { href: INDICE_MESAS, label: "Mesa electoral por ciudad: las 25 ciudades" };
const L2: L[] = CIUDADES_MESA.filter((x) => x.lote === 2).map((x) => ({ href: P(x.c), label: `En qué mesa voto en ${x.n}` }));
const HUBS = ["/elecciones/donde-voto-mesa-electoral", "/elecciones/tarjeta-censal-cuando-llega", "/elecciones/consultar-censo-electoral", "/elecciones/que-llevar-a-votar", "/elecciones/sorteo-mesa-electoral-29n", "/elecciones/cambio-de-domicilio-y-censo"];
const LOTE1 = CIUDADES_MESA.filter((x) => x.lote === 1).map((x) => P(x.c));

/** Enlaza el índice desde los hubs y las 5 ciudades del lote 1; el hub «dónde voto» enlaza además las 20 nuevas. */
export function enlazarMesasCiudades1031b(g: Guide): Guide {
  const add: L[] = HUBS.includes(g.path) ? [IDX, ...(g.path === HUBS[0] ? L2 : [])] : LOTE1.includes(g.path) ? [IDX] : [];
  if (!add.length) return g;
  const have = new Set(g.related.map((r) => r.href));
  g.related = [...g.related, ...add.filter((r) => !have.has(r.href))];
  return g;
}
