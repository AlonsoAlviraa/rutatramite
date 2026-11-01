import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Lote 31-10-2026: «¿En qué mesa electoral voto en <ciudad>? Dónde mirarlo» (29-N).
 * Solo ciudades con fuente oficial propia comprobada el 31-10-2026 (curl 200 o, si el WAF bloquea curl, lectura con WebFetch):
 * Soria (BOP Soria extraordinario 12-10-2026, relación de la OCE), Valladolid (web municipal de las elecciones),
 * Madrid (nota del Ayuntamiento 29-10-2026 y ficha de la sede), Zaragoza (web municipal de las elecciones y Oficina de
 * Información Electoral) y València (web municipal de elecciones). Juntas Electorales de Zona: directorio de la JEC.
 * Omitidas hoy: Barcelona (el trámite municipal de consulta del colegio da «no disponible por causas técnicas»), Sevilla
 * (sevilla.org no respondió: 504/timeout), Málaga y resto (solo cifras de prensa o páginas de otras elecciones).
 * Las cifras de mesas solo se ponen cuando las publica una fuente oficial (BOP o Ayuntamiento).
 */

const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const by = (fuente: string) => sec("byline", "Autoría y revisión", [`Por Equipo RutaTrámite. Última revisión: 31 de octubre de 2026, con ${fuente}.`]);

const AR_MESAS = { href: "https://www.aragon.es/portal-de-elecciones/mesas-electorales", label: "Gobierno de Aragón: portal de elecciones, mesas electorales" };
const INE_MESAS = { href: "https://sede.ine.gob.es/tramite/consulta_mesas_locales/", label: "Sede del INE: consulta de mesas y locales electorales (sin identificación)" };
const INE_CLAVE = { href: "https://sede.ine.gob.es/tramite/censo_electoral/", label: "Sede del INE: consulta de inscripción en el censo con Cl@ve (muestra tu mesa)" };
const INE_NOTA = { href: "https://www.ine.es/dyngs/Prensa/es/EG2026.htm", label: "INE: nota de prensa de la Oficina del Censo Electoral para el 29-N" };
const JEC_CAL = { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario de las elecciones generales 2026 (PDF)" };
const JEZ = (ccaa: string, id: number, label: string) => ({ href: `https://www.juntaelectoralcentral.es/cs/jec/admelectoral/jezona/directorio?comunidad=${ccaa}&sIdCCAA=${id}&template=Jez/JEC_Provincias`, label });

const SO_BOP = { href: "https://bop.dipsoria.es/index.php/mod.documentos/mem.descargar/fichero.documentos_BOPSoria_Extra12102026_dab94995%232E%23pdf", label: "BOP de Soria, extraordinario de 12-10-2026: relación de secciones, locales y mesas (OCE)" };
const SO_JEZ = JEZ("Castilla%20y%20Le%C3%B3n", 70, "Junta Electoral Central: Juntas Electorales de Zona de Castilla y León (Soria)");
const VA_HUB = { href: "https://www.valladolid.es/es/ayuntamiento/atencion-ciudadana/elecciones-generales-29-noviembre-2026", label: "Ayuntamiento de Valladolid: Elecciones Generales 29 de noviembre de 2026" };
const VA_MESA = { href: "https://www.valladolid.es/es/ayuntamiento/atencion-ciudadana/elecciones-generales-29-noviembre-2026/consulta-mesa-electoral-local-electoral-votacion", label: "Ayuntamiento de Valladolid: consulta de mesa y local electoral" };
const VA_CENSO = { href: "https://www.valladolid.es/es/ayuntamiento/atencion-ciudadana/elecciones-generales-29-noviembre-2026/consulta-inscripcion-censo-electoral-periodo-electoral", label: "Ayuntamiento de Valladolid: consulta del censo en periodo electoral" };
const VA_SORTEO = { href: "https://www.valladolid.es/es/ayuntamiento/atencion-ciudadana/elecciones-generales-29-noviembre-2026/sorteo-informacion-mesas-electorales", label: "Ayuntamiento de Valladolid: sorteo e información sobre mesas electorales" };
const VA_JEZ = JEZ("Castilla%20y%20Le%C3%B3n", 70, "Junta Electoral Central: Juntas Electorales de Zona de Castilla y León (Valladolid)");
const MA_NOTA = { href: "https://www.madrid.es/portales/munimadrid/es/Inicio/Actualidad/Noticias/El-Pleno-designa-a-los-integrantes-de-las-3-635-mesas-electorales-para-las-elecciones-a-las-Cortes-Generales-del-29-de-noviembre/?vgnextfmt=default&vgnextoid=7aa0dee859681a10VgnVCM100000891ecb1aRCRD&vgnextchannel=a12149fa40ec9410VgnVCM100000171f5a0aRCRD", label: "Ayuntamiento de Madrid, 29-10-2026: el Pleno designa a los integrantes de las 3.635 mesas" };
const MA_SEDE = { href: "https://sede.madrid.es/portal/site/tramites/menuitem.62876cb64654a55e2dbd7003a8a409a0/?vgnextchannel=1e88a38813180210VgnVCM100000c90da8c0RCRD&vgnextfmt=default&vgnextoid=1ec4643aa9c70110VgnVCM2000000c205a0aRCRD", label: "Sede del Ayuntamiento de Madrid: consulta del censo electoral y del local" };
const MA_GEO = { href: "https://geoportal.madrid.es/IDEAM_WBGEOPORTAL/dataset.iam?id=e56f94d6-ffb1-11e9-8448-ecb1d753f6e8", label: "Geoportal del Ayuntamiento de Madrid: mapa de locales electorales" };
const MA_JEZ = JEZ("Madrid", 74, "Junta Electoral Central: Juntas Electorales de Zona de la Comunidad de Madrid");
const ZA_HUB = { href: "https://www.zaragoza.es/sede/portal/organizacion/elecciones-cortes-generales-noviembre-2026", label: "Ayuntamiento de Zaragoza: Elecciones a Cortes Generales de 29 de noviembre de 2026" };
const ZA_OIE = { href: "https://www.zaragoza.es/sede/servicio/equipamiento/2505", label: "Ayuntamiento de Zaragoza: Oficina de Información Electoral" };
const ZA_JEZ = JEZ("Arag%C3%B3n", 64, "Junta Electoral Central: Juntas Electorales de Zona de Aragón");
const VL_HUB = { href: "https://www.valencia.es/cas/elecciones/inicio", label: "Ayuntamiento de València: Elecciones a las Cortes Generales de 29 de noviembre de 2026" };
const VL_JEZ = JEZ("Comunitat%20Valenciana", 79, "Junta Electoral Central: Juntas Electorales de Zona de la Comunitat Valenciana");

const P = (c: string) => `/elecciones/mesa-electoral-${c}`;
const CIUDADES: [string, string][] = [["soria", "Soria"], ["valladolid", "Valladolid"], ["madrid", "Madrid"], ["zaragoza", "Zaragoza"], ["valencia", "Valencia"]];
export const MESAS_CIUDADES_1031_PATHS = CIUDADES.map(([c]) => P(c));
const cityLink = ([c, n]: [string, string]) => ({ href: P(c), label: `En qué mesa voto en ${n}` });

const relComunes = (self: string) => [
  { href: "/elecciones/donde-voto-mesa-electoral", label: "Dónde voto el 29-N: mesa y colegio electoral" },
  { href: "/elecciones/tarjeta-censal-cuando-llega", label: "Tarjeta censal: cuándo llega" },
  { href: "/elecciones/que-llevar-a-votar", label: "Qué llevar a votar" },
  { href: "/elecciones/cambio-de-domicilio-y-censo", label: "Me he mudado: dónde voto" },
  { href: "/elecciones/sorteo-mesa-electoral-29n", label: "Sorteo de mesas: cuándo te avisan" },
  { href: "/empadronarse/padron-y-voto-29n", label: "Padrón y voto el 29-N" },
  ...CIUDADES.filter(([c]) => P(c) !== self).map(cityLink),
];
const disc = (n: string) => `Resumen de fuentes oficiales sobre ${n} consultadas el 31-10-2026. Lo que vale es lo que diga tu tarjeta censal o la consulta del INE.`;

const PLAZOS = (extra: string[] = []) => sec("plazos", "Fechas que importan (calendario de la JEC)", [
  "Las fechas salen del calendario oficial de la Junta Electoral Central y de la nota del INE para estas elecciones.",
], [[
  "12 de octubre: el Boletín Oficial de cada provincia publicó la relación de secciones, locales y mesas.",
  "13 a 18 de octubre: plazo para reclamar ante la Junta Electoral Provincial contra esa delimitación (ya cerrado).",
  "Desde el 2 de noviembre: el INE envía las tarjetas censales con tu mesa y tu local.",
  "19 a 28 de noviembre: los ayuntamientos exponen, y se difunden por internet, las relaciones definitivas de secciones y mesas.",
  "29 de noviembre: votación de 9:00 a 20:00.",
  ...extra,
]]);

export const MESAS_CIUDADES_1031_GUIDES: Guide[] = [
  {
    id: "mesa-electoral-soria", pack: "elecciones", reviewedAt: "2026-10-31", path: P("soria"),
    h1: "¿En qué mesa electoral voto en Soria? Dónde mirarlo",
    title: "Mesa electoral en Soria el 29-N: 50 mesas y sus colegios",
    description: "Soria capital tendrá 50 mesas en 27 secciones el 29-N, según el BOP de 12-10-2026. Lista de colegios por mesa y cómo ver la tuya en el INE.",
    lead: "Respuesta corta: en Soria capital se votará en 50 mesas repartidas en 3 distritos y 27 secciones, según la relación de la Oficina del Censo Electoral publicada en el BOP de Soria del 12 de octubre de 2026. Tu mesa exacta la dice la tarjeta censal (se envía desde el 2 de noviembre). Si no te llega, la sede del INE te la muestra con Cl@ve, y la consulta general del INE te da la mesa y el local de una dirección sin identificarte.",
    cta: INE_MESAS,
    secondaryCta: SO_BOP,
    sources: [SO_BOP, INE_MESAS, INE_CLAVE, INE_NOTA, JEC_CAL, SO_JEZ],
    related: relComunes(P("soria")),
    disclaimer: disc("Soria"),
    faqs: [
      { q: "¿Cuántas mesas electorales hay en Soria capital el 29-N?", a: "50 mesas: 14 en el distrito 01, 29 en el 02 y 7 en el 03, en 27 secciones. Es el recuento de la relación publicada por la Delegación Provincial de la Oficina del Censo Electoral en el BOP de Soria extraordinario del 12-10-2026 (municipio 42173)." },
      { q: "¿Cómo sé si me toca la mesa A, B o C?", a: "En las secciones con varias mesas, el BOP reparte a los electores por la inicial del primer apellido (por ejemplo, de la A a la K en la mesa A y de la L a la Z en la B; en las secciones con tres mesas hay tres tramos). Tu tarjeta censal o la consulta del INE te dan la mesa exacta." },
      { q: "¿Qué colegio tiene más mesas en Soria?", a: "El C.P. «Infantes de Lara» (sala de usos múltiples, calle Duques de Soria 10), con 6 mesas de las secciones 02-004 y 03-003." },
      { q: "¿A qué Junta Electoral de Zona pertenece Soria capital?", a: "A la Junta Electoral de Zona de Soria (calle Aguirre 3, 42071; teléfonos 975 234 726 y 975 234 749, según el directorio de la JEC). Allí se tramitan, por ejemplo, las excusas de los miembros de mesa." },
      { q: "¿Puedo reclamar ahora contra el local que me han asignado?", a: "El plazo de reclamación ante la Junta Electoral Provincial fue del 13 al 18 de octubre y ya está cerrado. Del 19 al 28 de noviembre se exponen las relaciones definitivas." },
    ],
    sections: [
      by("la relación de la Oficina del Censo Electoral en el BOP de Soria extraordinario de 12-10-2026, la nota del INE y el directorio de Juntas de Zona de la JEC"),
      sec("cifras", "Soria capital: 3 distritos, 27 secciones y 50 mesas", [
        "Recuento propio de las filas del municipio 42173 (Soria) en la relación oficial: distrito 01, 8 secciones y 14 mesas; distrito 02, 16 secciones y 29 mesas; distrito 03, 3 secciones y 7 mesas. En total, 14 entradas de local, que son 13 edificios distintos porque el C.P. «Fuente del Rey» aparece con dos direcciones.",
      ]),
      {
        ...sec("colegios", "Colegios electorales de Soria y sus mesas", ["Tabla copiada del BOP (local, dirección y mesas con el formato distrito-sección-mesa). Si tu sección no es la que crees, manda la tarjeta censal."]),
        table: {
          caption: "Locales de votación en Soria capital, elecciones del 29-11-2026 (BOP de Soria, 12-10-2026)",
          head: ["Local", "Dirección", "Mesas"],
          rows: [
            ["C.P. «Infantes de Lara» (sala de usos múltiples)", "C/ Duques de Soria 10", "6: 02-004-A/B/C y 03-003-A/B/C"],
            ["Instituto «Antonio Machado»", "C/ Aduana Vieja 10", "5: 01-004-A/B, 01-005-A/B y 02-001-U"],
            ["C.P. «Fuente del Rey»", "C/ Valonsadero 5", "5: 01-008-U, 02-009-A/B y 02-013-A/B"],
            ["Instituto «Castilla»", "C/ Alonso de Velázquez 1", "5: 02-006-A/B/C y 02-007-A/B"],
            ["C.P. «Fuente del Rey»", "C/ Las Casas 7", "4: 01-006-A/B y 01-007-A/B"],
            ["CIFP Pico Frentes", "C/ Gervasio Manrique de Lara 2", "4: 02-014-A/B, 02-015-U y 02-016-U"],
            ["C.P. «La Arboleda»", "Pl. Cinco Villas 3", "4: 03-001-A/B y 03-002-A/B"],
            ["Diputación Provincial", "C/ Caballeros 17", "3: 01-002-A/B y 01-003-U"],
            ["C.P. «Las Pedrizas»", "C/ Retógenes 6", "3: 02-008-U y 02-010-A/B"],
            ["C.P. «Doce Linajes»", "C/ Cristóbal Colón 13", "3: 02-011-A/B y 02-012-U"],
            ["Ayuntamiento (patio de columnas)", "Pl. Mayor 9", "2: 01-001-A/B"],
            ["Polideportivo de la Juventud", "C/ Nicolás Rabal 25", "2: 02-002-A/B"],
            ["Servicio Territorial de Educación y Cultura", "C/ Campo 5", "2: 02-003-A/B"],
            ["C.P. «Numancia»", "C/ Ronda Eloy Sanz Villa 5", "2: 02-005-A/B"],
          ].map((cells) => ({ cells, source: SO_BOP })),
        },
      },
      sec("como-mirarlo", "Cómo ver tu mesa sin esperar a la tarjeta", [
        "1) Sin identificarte: en la consulta general de mesas y locales del INE eliges provincia Soria, municipio Soria y tu calle y número; te devuelve la sección, la mesa y el local. 2) Con Cl@ve o DNI electrónico: la consulta del censo de la sede del INE muestra tu inscripción, tu mesa y la dirección del local. 3) Por teléfono: la Oficina del Censo Electoral atiende en el 900 343 232.",
        "Con la sección en la mano, busca el local en la tabla de arriba: es el mismo dato del BOP.",
      ]),
      sec("provincia", "Si votas en otro pueblo de la provincia", [
        "El mismo BOP trae la relación de todos los municipios de Soria. Además de la de Soria, en la provincia hay Juntas Electorales de Zona en Almazán (calle Antonio Machado 25) y en El Burgo de Osma (calle Universidad 21), según el directorio de la Junta Electoral Central.",
      ]),
      PLAZOS(),
    ],
  },
  {
    id: "mesa-electoral-valladolid", pack: "elecciones", reviewedAt: "2026-10-31", path: P("valladolid"),
    h1: "¿En qué mesa electoral voto en Valladolid? Dónde mirarlo",
    title: "Mesa electoral en Valladolid el 29-N: dónde mirarlo",
    description: "En Valladolid tu mesa sale en la tarjeta censal y en el INE; el día 29-N el Ayuntamiento la dice en el 010, el 983 100 105 y el 983 426 108.",
    lead: "Respuesta corta: tu mesa y tu colegio en Valladolid los dice la tarjeta censal (se envía desde el 2 de noviembre). Antes, puedes verlos en la consulta del INE por dirección, sin identificarte, o con Cl@ve en la sede del INE. El día de la votación, el 29 de noviembre, el Ayuntamiento informa de 8:00 a 20:00 en el 010 (desde el municipio), el 983 100 105 y el 983 426 108.",
    cta: VA_MESA,
    secondaryCta: INE_MESAS,
    sources: [VA_HUB, VA_MESA, VA_CENSO, VA_SORTEO, VA_JEZ, INE_MESAS, INE_CLAVE, INE_NOTA, JEC_CAL],
    related: relComunes(P("valladolid")),
    disclaimer: disc("Valladolid"),
    faqs: [
      { q: "¿Qué teléfono me dice mi colegio electoral en Valladolid?", a: "El día de la votación, de 8:00 a 20:00, el 010 si llamas desde el municipio, o el 983 100 105 y el 983 426 108, según la página municipal de consulta de mesa y local." },
      { q: "¿Ya se ha hecho el sorteo de mesas en Valladolid?", a: "Sí. El Pleno lo celebró el 29 de octubre de 2026 a las 9:00, y el Ayuntamiento publica el resultado del sorteo y el manual para los miembros de mesa en su página de elecciones." },
      { q: "¿Dónde presento una excusa si me ha tocado mesa?", a: "En la Junta Electoral de Zona de Valladolid: nuevo edificio de los Juzgados, calle Angustias 40-44, segunda planta. Teléfonos 983 458 475 y 983 458 465; de lunes a viernes de 17:00 a 19:00 y sábados, domingos y festivos de 11:00 a 13:00." },
      { q: "¿Dónde se podía consultar el censo en persona?", a: "En el Edificio de San Benito (calle San Benito 1), del 12 al 19 de octubre. Ese plazo de exposición ya terminó; ahora la consulta es por el INE." },
      { q: "¿Han cambiado los colegios respecto a 2023?", a: "La relación de 2026 se publicó en el BOP de Valladolid del 12 de octubre. No hemos podido descargar hoy ese boletín para contrastar los cambios, así que no damos cifras: mira tu tarjeta censal o la consulta del INE aunque votes siempre en el mismo sitio." },
    ],
    sections: [
      by("las páginas del Ayuntamiento de Valladolid sobre las elecciones del 29-N, la nota del INE, el calendario de la JEC y su directorio de Juntas de Zona"),
      sec("como-mirarlo", "Tres formas de saber tu mesa en Valladolid", [
        "La página municipal «Consulta de mesa electoral y local electoral de votación» enlaza dos servicios del INE: la consulta por domicilio de residencia (sin identificación) y la consulta personalizada con Cl@ve. La tercera vía es la tarjeta censal que la Oficina del Censo Electoral envía desde el 2 de noviembre.",
      ], [[
        "Sin identificarte: consulta de mesas y locales del INE, con provincia Valladolid, municipio Valladolid y tu calle y número.",
        "Con Cl@ve o DNI electrónico: consulta del censo en la sede del INE, que muestra tu mesa y la dirección del local.",
        "El 29-N por teléfono, de 8:00 a 20:00: 010 (desde el municipio), 983 100 105 o 983 426 108.",
      ]]),
      sec("mesas", "Si te ha tocado ser miembro de mesa", [
        "El sorteo municipal fue el 29 de octubre. Las alegaciones o excusas se presentan en la Junta Electoral de Zona de Valladolid (calle Angustias 40-44, 2.ª planta; 983 458 475 y 983 458 465), en el horario que publica el Ayuntamiento: de lunes a viernes de 17:00 a 19:00 y sábados, domingos y festivos de 11:00 a 13:00. La misma dirección y teléfonos figuran en el directorio de la Junta Electoral Central.",
      ]),
      sec("censo", "Censo: lo que ya pasó", [
        "El censo estuvo expuesto en el Edificio de San Benito (calle San Benito 1) del 12 al 19 de octubre. Si entonces no reclamaste y no apareces, llama a la Oficina del Censo Electoral (900 343 232).",
      ]),
      sec("bop", "La lista oficial de colegios", [
        "La relación de secciones, locales y mesas de toda la provincia se publicó en el BOP de Valladolid del 12 de octubre de 2026, y los lugares públicos para actos de campaña en el del 21 de octubre, según el Ayuntamiento. Del 19 al 28 de noviembre se exponen las relaciones definitivas.",
      ]),
      PLAZOS(),
    ],
  },
  {
    id: "mesa-electoral-madrid", pack: "elecciones", reviewedAt: "2026-10-31", path: P("madrid"),
    h1: "¿En qué mesa electoral voto en Madrid? Dónde mirarlo",
    title: "Mesa electoral en Madrid el 29-N: 3.635 mesas, dónde mirarlo",
    description: "Madrid tendrá 3.635 mesas en 437 colegios el 29-N. Cómo ver la tuya: tarjeta censal, sede del Ayuntamiento, 010, INE y mapa de locales.",
    lead: "Respuesta corta: en la ciudad de Madrid se votará en 3.635 mesas repartidas en 437 colegios electorales, según el Ayuntamiento (29-10-2026). Tu colegio y tu mesa vienen en la tarjeta censal y se pueden consultar en la sede electrónica del Ayuntamiento («Consulta del censo electoral y presentación de reclamaciones»), con o sin identificación electrónica, en el 010 (914 800 010 desde fuera) o en el INE.",
    cta: MA_SEDE,
    secondaryCta: INE_MESAS,
    sources: [MA_NOTA, MA_SEDE, MA_GEO, MA_JEZ, INE_MESAS, INE_CLAVE, INE_NOTA, JEC_CAL],
    related: [...relComunes(P("madrid")), { href: "/empadronarse/formulario-empadronamiento-madrid", label: "Empadronarse en Madrid: formulario" }],
    disclaimer: disc("Madrid"),
    faqs: [
      { q: "¿Cuántas mesas y colegios hay en Madrid el 29-N?", a: "3.635 mesas en 437 colegios, según la nota del Ayuntamiento del 29-10-2026. Son 3 colegios más que en las últimas europeas y 21 más que en las generales de julio de 2023, cuando algunos locales no pudieron usarse por obras; esta vez habrá 157 mesas más." },
      { q: "Me empadroné en Madrid en agosto, ¿dónde voto?", a: "Donde estuvieras empadronado antes. La sede municipal explica que el censo vigente es el del 1 de agosto, con movimientos del padrón hasta el 30 de julio: las altas y los cambios de domicilio desde el 31 de julio no entran y votas en tu municipio o local anterior." },
      { q: "¿Puedo ver mi colegio sin certificado digital?", a: "Sí. La sede del Ayuntamiento tiene una consulta sin identificación electrónica que solo da el local electoral, y otra con identificación que da también tus datos. El INE ofrece además una consulta por dirección sin identificarte." },
      { q: "¿Hay un mapa de colegios electorales de Madrid?", a: "Sí, el Geoportal municipal publica el conjunto de datos «Locales Electorales» con un visor de mapa y descarga. Sus metadatos son de 2023, así que úsalo para situar el edificio y confirma tu local en la tarjeta censal o en la sede." },
      { q: "Me ha tocado mesa en Madrid, ¿dónde presento la excusa?", a: "Ante la Junta Electoral de Zona de Madrid (calle Manuel Luna 29) o con el formulario de la sede del Ayuntamiento usando el código de verificación de tu notificación. Si tienes entre 65 y 70 años, la renuncia por la sede se tramita en el momento." },
    ],
    sections: [
      by("la nota del Ayuntamiento de Madrid del 29-10-2026, la ficha de la sede electrónica sobre el censo, el Geoportal municipal y la nota del INE"),
      sec("cifras", "Madrid: 3.635 mesas en 437 colegios", [
        "El Pleno extraordinario del 29 de octubre de 2026 eligió por sorteo informático a 32.715 personas (presidente y dos vocales por mesa, cada uno con dos suplentes: nueve electores por mesa). Según el Ayuntamiento, la mesa con más votantes tiene 987 electores y la que menos, 338.",
      ]),
      sec("como-mirarlo", "Dónde mirar tu colegio en Madrid", [
        "La propia nota municipal recuerda que el colegio y la mesa llegan en la tarjeta censal de la Oficina del Censo Electoral y que también se consultan en sede.madrid.es.",
      ], [[
        "Sede del Ayuntamiento: «Consulta del censo electoral y presentación de reclamaciones», con identificación electrónica (tus datos y el local) o sin ella (solo el local).",
        "Teléfono 010 (914 800 010 si llamas desde fuera del municipio) y chat de Línea Madrid.",
        "Geoportal municipal: mapa de locales electorales (datos de 2023; confirma tu local en la sede).",
        "INE: consulta por dirección sin identificarte o consulta del censo con Cl@ve.",
      ]]),
      sec("censo", "Quién vota en Madrid en estas elecciones", [
        "La sede municipal indica que el censo es el aprobado el 1 de agosto, con los movimientos del padrón hasta el 30 de julio. Si te diste de alta o cambiaste de domicilio en Madrid desde el 31 de julio, votas en el municipio o en el local de tu domicilio anterior. Las reclamaciones al censo se hicieron del 12 al 19 de octubre en las Oficinas de Atención a la Ciudadanía o en la Delegación Provincial de la Oficina del Censo Electoral (calle Trafalgar 29), y ese plazo ya está cerrado.",
      ]),
      sec("mesas", "Si te ha tocado ser miembro de mesa", [
        "La notificación llega a casa con acuse de recibo y, si recibiste un aviso por ausencia, también está disponible en la sede municipal. La excusa no te libera hasta que la Junta resuelva. Las excusas se justifican con documentos ante la Junta Electoral de Zona de Madrid (calle Manuel Luna 29; 912 729 804 y 912 729 841 según el directorio de la JEC) o con el formulario de la sede, con el código de tu notificación.",
      ]),
      PLAZOS(),
    ],
  },
  {
    id: "mesa-electoral-zaragoza", pack: "elecciones", reviewedAt: "2026-11-01", path: P("zaragoza"),
    h1: "¿En qué mesa electoral voto en Zaragoza? Dónde mirarlo",
    title: "Mesa electoral en Zaragoza el 29-N: dónde mirar tu colegio",
    description: "En Zaragoza tu colegio sale en la tarjeta censal y en el INE; la Oficina de Información Electoral de Domingo Miral 3 (976 721 777) te lo dice.",
    lead: "Respuesta corta: tu mesa y tu colegio en Zaragoza los dice la tarjeta censal, que el INE envía desde el 2 de noviembre. También los puedes ver en la consulta del INE por dirección, sin identificarte, o con Cl@ve. En persona, la Oficina de Información Electoral del Ayuntamiento (calle Domingo Miral 3, teléfono 976 721 777) informa del colegio con el DNI, pasaporte, carné de conducir o tarjeta de residencia originales.",
    cta: INE_MESAS,
    secondaryCta: ZA_OIE,
    sources: [ZA_HUB, ZA_OIE, ZA_JEZ, INE_MESAS, INE_CLAVE, INE_NOTA, JEC_CAL, AR_MESAS],
    related: [...relComunes(P("zaragoza")), { href: "/empadronarse/formulario-empadronamiento-zaragoza", label: "Empadronarse en Zaragoza: formulario" }],
    disclaimer: disc("Zaragoza"),
    faqs: [
      { q: "¿Dónde me informan en persona de mi colegio en Zaragoza?", a: "En la Oficina de Información Electoral, calle Domingo Miral 3 (50009), teléfono 976 721 777. Hay que llevar el original del DNI, pasaporte, carné de conducir o, para ciudadanos de la UE, tarjeta de residencia." },
      { q: "¿Con qué censo se vota en Zaragoza?", a: "Con el cerrado el 1 de agosto de 2026, que recoge los movimientos del padrón hasta el 30 de julio, según la página municipal de estas elecciones." },
      { q: "¿Puedo ver mi inscripción en el censo por internet?", a: "Sí, en la carpeta ciudadana del Ayuntamiento con certificado electrónico o Cl@ve, o en la sede del INE, que además muestra tu mesa y la dirección del local." },
      { q: "¿Dónde está la Junta Electoral de Zona de Zaragoza?", a: "En la Ciudad de la Justicia, edificio Fueros de Aragón, avenida Ranillas 89-97, escalera A, planta 3 (50071); teléfono 976 208 631, según el directorio de la JEC." },
      { q: "¿Me sirve la lista de colegios del Ayuntamiento o la del Gobierno de Aragón?", a: "No para el 29-N. El PDF de colegios enlazado por la Oficina de Información Electoral es de 2005 y el listado del portal de Aragón corresponde a las autonómicas del 8 de febrero de 2026. Consulta tu tarjeta censal o el INE." },
      { q: "Me empadroné en Zaragoza en septiembre. ¿Dónde voto?", a: "En tu municipio o domicilio anterior: el censo de estas elecciones recoge los movimientos del padrón hasta el 30 de julio de 2026." },
      { q: "¿Y la Delegación del Censo Electoral?", a: "La Delegación Provincial del INE está en la calle Albareda 1; teléfonos 976 590 297 y 900 343 232, según la página municipal." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", ["Por Equipo RutaTrámite. Última revisión: 1 de noviembre de 2026, con la página del Ayuntamiento de Zaragoza sobre las elecciones del 29-N, la ficha de su Oficina de Información Electoral, la página de mesas electorales del Gobierno de Aragón, la nota del INE y el directorio de la JEC."]),
      sec("como-mirarlo", "Cómo ver tu colegio en Zaragoza", [], [[
        "Tarjeta censal: llega desde el 2 de noviembre con tu mesa y tu local.",
        "INE sin identificarte: consulta de mesas y locales con provincia Zaragoza, municipio Zaragoza y tu dirección.",
        "INE con Cl@ve o carpeta ciudadana del Ayuntamiento: tu inscripción en el censo.",
        "En persona: Oficina de Información Electoral, calle Domingo Miral 3 (976 721 777), con documento original.",
      ]]),
      sec("censo", "El censo en Zaragoza: ya es definitivo", [
        "El Ayuntamiento expuso el censo del 12 al 19 de octubre en las Juntas Municipales y Vecinales, en la Casa Consistorial (plaza del Pilar) y en el Padrón de la calle Domingo Miral 3. Terminado ese plazo, la página municipal indica que el censo es definitivo; para consultas, el 010 (976 721 234 desde fuera).",
      ]),
      sec("listas-antiguas", "Dos listas de colegios que no sirven para el 29-N", [
        "Si buscas «colegios electorales Zaragoza» te puedes encontrar con dos listados oficiales que no corresponden a estas elecciones. Úsalos solo como referencia histórica:",
      ], [[
        "La «Relación de Colegios Electorales» enlazada desde la ficha de la Oficina de Información Electoral es un PDF creado en enero de 2005, según sus propios metadatos. Algunos locales han podido cambiar desde entonces.",
        "El portal de elecciones del Gobierno de Aragón (actualizado el 14 de octubre de 2026) publica secciones, mesas y locales de la provincia de Zaragoza, pero son los de las autonómicas del 8 de febrero de 2026, no los de las generales del 29-N.",
        "Para el 29-N, lo fiable es la tarjeta censal o la consulta del INE por dirección.",
      ]]),
      sec("ejemplo", "Caso resuelto: te mudaste de Delicias a Actur en agosto", [], [[
        "Situación: cambiaste tu domicilio en el padrón el 20 de agosto de 2026.",
        "Censo aplicable: el de 1 de agosto, con movimientos del padrón hasta el 30 de julio. Tu cambio llegó después, así que el 29-N figuras en tu domicilio anterior.",
        "Resultado: votas en la mesa que corresponde a tu dirección de Delicias, aunque ya vivas en Actur.",
        "Cómo confirmarlo: la tarjeta censal que envía el INE desde el 2 de noviembre o la consulta del INE con tu dirección anterior.",
        "El plazo para reclamar al censo (12 al 19 de octubre) ya está cerrado.",
      ]]),
      sec("mesas", "Si te toca ser miembro de mesa", [
        "El Ayuntamiento elige por sorteo público a un presidente y dos vocales por mesa, y a dos suplentes por cada uno; según el portal de elecciones de Aragón, la notificación se hace en un plazo de 3 días desde el sorteo. Las excusas se presentan ante la Junta Electoral de Zona de Zaragoza (Ciudad de la Justicia, avenida Ranillas 89-97; 976 208 631). Tienes 7 días desde la notificación, según el calendario de la JEC.",
      ]),
      PLAZOS(),
    ],
  },
  {
    id: "mesa-electoral-valencia", pack: "elecciones", reviewedAt: "2026-10-31", path: P("valencia"),
    h1: "¿En qué mesa electoral voto en Valencia? Dónde mirarlo",
    title: "Mesa electoral en Valencia el 29-N: dónde mirar tu colegio",
    description: "En València tu colegio sale en la tarjeta censal y en el INE; el 29-N la Oficina de Padrón de Periodista Azzati abre de 8 a 20 h para consultarlo.",
    lead: "Respuesta corta: tu mesa y tu colegio en València los dice la tarjeta censal, que el INE envía desde el 2 de noviembre; también puedes consultarlos en el INE por dirección, sin identificarte, o con Cl@ve. El 29 de noviembre la Oficina de Padrón del Ayuntamiento (calle Periodista Azzati) abre de 8:00 a 20:00 para consultar el censo y expedir certificaciones censales, y hay atención telefónica de 9:00 a 20:00 en el 010.",
    cta: INE_MESAS,
    secondaryCta: VL_HUB,
    sources: [VL_HUB, VL_JEZ, INE_MESAS, INE_CLAVE, INE_NOTA, JEC_CAL],
    related: [...relComunes(P("valencia")), { href: "/empadronarse/formulario-empadronamiento-valencia", label: "Empadronarse en Valencia: formulario" }],
    disclaimer: disc("València"),
    faqs: [
      { q: "¿Qué teléfono me dice mi colegio el día de las elecciones en Valencia?", a: "El 29 de noviembre, de 9:00 a 20:00, el 010, o el 963 100 010 si llamas desde fuera de la ciudad, y también el 962 081 705, el 962 081 093 y el 962 081 098, según la web municipal de elecciones." },
      { q: "¿Dónde voy en persona si no aparezco en el censo?", a: "El día de la votación, a la Oficina de Padrón de la calle Periodista Azzati, abierta de 8:00 a 20:00 para consultar el censo y emitir certificaciones censales específicas." },
      { q: "¿El Ayuntamiento tiene su propia consulta del colegio?", a: "Sí, en valencia.es hay una «Consulta personalizada del Censo Electoral / Colegio electoral» con formulario. La alternativa sin identificarte es la consulta del INE por dirección." },
      { q: "¿Dónde está la Junta Electoral de Zona de Valencia?", a: "En la calle Antonio Sacramento, esquina con la avenida Professor López Piñero (46013); teléfono 961 927 062, según el directorio de la JEC. Ahí van las excusas si te toca ser miembro de mesa." },
      { q: "¿Cuántas mesas hay en València?", a: "No lo publicamos porque hoy no hemos encontrado una cifra oficial del Ayuntamiento para estas elecciones. La relación completa está en el BOP de Valencia del 12 de octubre de 2026." },
    ],
    sections: [
      by("la web municipal de elecciones del Ayuntamiento de València, la nota del INE, el calendario de la JEC y su directorio de Juntas de Zona"),
      sec("como-mirarlo", "Cómo ver tu colegio en València", [], [[
        "Tarjeta censal: llega desde el 2 de noviembre con tu mesa y tu local.",
        "INE sin identificarte: consulta de mesas y locales con provincia Valencia, municipio València y tu dirección.",
        "INE con Cl@ve: consulta del censo, que muestra tu mesa y la dirección del colegio.",
        "Web municipal: consulta personalizada del censo y del colegio en valencia.es.",
        "El 29-N: Oficina de Padrón (calle Periodista Azzati) de 8:00 a 20:00, o el 010 de 9:00 a 20:00.",
      ]]),
      sec("dia-29", "El día de la votación en València", [
        "Si en tu colegio no te encuentran en la lista, la Oficina de Padrón del Ayuntamiento expide ese día certificaciones censales específicas, que solo sirven si tu inscripción es correcta pero no aparece en la lista de la mesa. Teléfonos municipales de 9:00 a 20:00: 010, 963 100 010 desde fuera de la ciudad, 962 081 705, 962 081 093 y 962 081 098.",
      ]),
      sec("mesas", "Si te toca ser miembro de mesa", [
        "Las excusas se presentan ante la Junta Electoral de Zona de Valencia (calle Antonio Sacramento, esquina con la avenida Professor López Piñero; 961 927 062). Tienes 7 días desde la notificación, según el calendario de la JEC.",
      ]),
      PLAZOS(),
    ],
  },
];

const NUEVAS = CIUDADES.map(cityLink);
const IN: Record<string, { href: string; label: string }[]> = {
  "/elecciones/donde-voto-mesa-electoral": NUEVAS,
  "/elecciones/tarjeta-censal-cuando-llega": NUEVAS,
  "/elecciones/consultar-censo-electoral": NUEVAS,
  "/elecciones/que-llevar-a-votar": NUEVAS,
  "/elecciones/sorteo-mesa-electoral-29n": NUEVAS,
  "/elecciones/cambio-de-domicilio-y-censo": NUEVAS,
};

export function enlazarMesasCiudades1031(g: Guide): Guide {
  const add = IN[g.path];
  if (add) {
    const have = new Set(g.related.map((r) => r.href));
    g.related = [...g.related, ...add.filter((r) => !have.has(r.href))];
  }
  return g;
}
