import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Lote 27-10-2026 (tarde). Verificado el 27-10-2026:
 * - INE, nota de prensa EG2026: tarjetas censales desde el 2-11 (ya en el sitio); teléfono OCE 900 343 232.
 * - INE sede: consulta de inscripción con Cl@ve, resultado «podrá ser impreso» (SIA 993414); consulta de mesas y locales
 *   sin autenticación (SIA 288324). No hay procedimiento oficial de «duplicado» de tarjeta censal: no se inventa.
 * - Ayuntamiento de Madrid, sede electrónica, ficha «Padrón Municipal. Empadronamiento (altas y cambios de domicilio)».
 */

const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });

const INE_CENSO = { href: "https://sede.ine.gob.es/tramite/censo_electoral/", label: "Sede del INE: consulta de inscripción en el censo electoral (Cl@ve)" };
const INE_MESAS = { href: "https://sede.ine.gob.es/tramite/consulta_mesas_locales/", label: "Sede del INE: consulta de mesas y locales electorales (sin identificación)" };
const INE_NOTA = { href: "https://www.ine.es/dyngs/Prensa/EG2026.htm", label: "INE: nota de prensa de las elecciones generales del 29 de noviembre de 2026" };
const MAD = { href: "https://sede.madrid.es/portal/site/tramites/menuitem.62876cb64654a55e2dbd7003a8a409a0/?vgnextchannel=775ba38813180210VgnVCM100000c90da8c0RCRD&vgnextfmt=default&vgnextoid=3e3debb41f6e2410VgnVCM2000000c205a0aRCRD", label: "Sede del Ayuntamiento de Madrid: empadronamiento (altas y cambios de domicilio)" };
const HOJA = { href: "https://sede.madrid.es/UnidadesDescentralizadas/UDCEstadistica/TramitesMunicipales/Ficheros/Hoja_padronal.pdf", label: "Ayuntamiento de Madrid: hoja padronal (PDF)" };

const P_MAD = "/empadronarse/formulario-empadronamiento-madrid";
export const TARJETA_MADRID_1027_PATHS = [P_MAD];

export const TARJETA_MADRID_1027_GUIDES: Guide[] = [
  {
    id: "formulario-empadronamiento-madrid",
    pack: "mudanza",
    reviewedAt: "2026-10-27",
    path: P_MAD,
    h1: "Formulario de empadronamiento en Madrid: hoja padronal y documentos",
    title: "Formulario de empadronamiento Madrid: hoja padronal y papeles",
    description: "En Madrid el formulario es la hoja padronal, firmada a mano por los mayores de edad. Documentos, declaración responsable, baja y cita previa.",
    lead: "Respuesta corta: el formulario para empadronarse en Madrid es la hoja padronal, que se descarga en la sede del Ayuntamiento. Se rellena en mayúsculas y la firman a mano todas las personas mayores de edad que se empadronan. En persona hace falta cita previa; en línea se hace con identificación electrónica y no necesitas la hoja en papel.",
    cta: { href: HOJA.href, label: "Descargar la hoja padronal (PDF oficial)" },
    secondaryCta: { href: MAD.href, label: "Ficha del trámite en la sede de Madrid" },
    sources: [MAD, HOJA],
    related: [
      { href: "/empadronarse/cita-previa-madrid", label: "Cita previa para el padrón en Madrid" },
      { href: "/empadronarse/documentos-necesarios", label: "Documentos necesarios para empadronarse" },
      { href: "/empadronarse/cuanto-tarda-plazo", label: "Cuánto tarda: plazo de 3 meses" },
      { href: "/empadronarse/padron-y-voto-29n", label: "Padrón y voto el 29-N" },
      { href: "/empadronarse/baja", label: "Darse de baja del padrón" },
      { href: "/empadronarse", label: "Cómo empadronarse en España" },
    ],
    disclaimer: "Resumen de la ficha oficial del Ayuntamiento de Madrid consultada el 27-10-2026. Si cambia, manda la sede municipal.",
    faqs: [
      { q: "¿Dónde descargo el formulario de empadronamiento de Madrid?", a: "En la sede electrónica del Ayuntamiento, apartado «Modelos de formularios» de la ficha de empadronamiento: es la hoja padronal (PDF)." },
      { q: "¿Quién tiene que firmar la hoja padronal?", a: "Todas las personas mayores de edad que se empadronan, con firma manuscrita. Si no está firmada, no se admite." },
      { q: "¿Cuándo hace falta la declaración responsable?", a: "Cuando en la vivienda siguen empadronadas personas que ya no viven allí. A esas personas el Ayuntamiento les abre un expediente de baja por inscripción indebida." },
      { q: "¿Qué contrato de alquiler aceptan?", a: "Contrato en vigor de vivienda o habitación, firmado por todas las partes, con duración mínima de seis meses y referencia catastral (o un documento complementario con ella). En contratos prorrogados o firmados electrónicamente, también el último recibo." },
      { q: "¿Cómo me doy de baja del padrón de Madrid?", a: "Al empadronarte en otro municipio, la nueva inscripción da de baja la anterior. Para personas que ya no viven en tu casa se usa la declaración responsable (baja por inscripción indebida). En la cita previa, la categoría es «Padrón» y el trámite «Altas, Bajas y Cambio de domicilio en Padrón»." },
      { q: "Me empadroné en Madrid en agosto, ¿dónde voto el 29-N?", a: "El Ayuntamiento indica que las altas y cambios de domicilio formalizados el 31 de julio o después no están en el censo de estas elecciones: votas donde estabas empadronado antes." },
    ],
    sections: [
      sec("byline", "Autoría y revisión", ["Por Equipo RutaTrámite. Última revisión: 27 de octubre de 2026, con la ficha de empadronamiento de la sede electrónica del Ayuntamiento de Madrid."]),
      sec("papeles", "Qué presentar", ["La ficha municipal enumera seis bloques:"], [["Solicitud de empadronamiento (hoja padronal)", "Declaración responsable, si hay empadronados que ya no viven allí", "Documentos de identidad (originales y en vigor; menores de 14: libro de familia o certificado de nacimiento)", "Documento de uso de la vivienda con la dirección y el nombre de al menos una persona que se empadrona", "Autorización o representación, si presenta otra persona", "Documentación complementaria: autorización del titular o declaración de residencia (apartados de la propia hoja padronal)"]]),
      sec("como", "En línea o en persona", ["En línea, con identificación electrónica: si el trámite requiere consentimientos de otras personas, tienen 5 días naturales para darlos o la solicitud se cancela. En persona, con cita previa obligatoria (en línea, en el 010 o en el 914 800 010). No se pueden usar las dos vías a la vez.", "El empadronamiento no es inmediato: el plazo máximo para resolver es de tres meses (artículo 21.3 de la Ley 39/2015). En la tramitación presencial te pueden dar el certificado en la misma cita."]),
      sec("menores", "Menores", ["Cualquier gestión del padrón de un menor la autorizan ambos progenitores. Con un solo progenitor, hace falta la autorización del otro (puede firmar en la propia hoja), una resolución judicial o, si tienes la custodia exclusiva y no es posible el consentimiento, la declaración responsable específica para menores."]),
      sec("censo", "Padrón de Madrid y elecciones del 29-N", ["Según el Ayuntamiento, el censo de estas elecciones recoge los movimientos del padrón hasta el 30 de julio. Si te empadronaste o cambiaste de domicilio en Madrid el 31 de julio o después, votas donde estabas inscrito antes."]),
    ],
  },
];

const TARJETA_EXTRA = {
  sections: [
    sec("perdida-duplicado", "He perdido la tarjeta censal: ¿hay duplicado?", [
      "No hace falta duplicado: para votar basta con tu DNI, pasaporte o carné de conducir con foto. Si necesitas saber tu mesa, la sede del INE te deja consultar tu inscripción con Cl@ve y el resultado se puede imprimir. Sin Cl@ve, la consulta de mesas y locales electorales del INE no pide identificación; indica la mesa que corresponde a una dirección, así que la consulta con Cl@ve es la que confirma tu inscripción.",
      "Para dudas sobre la tarjeta, las delegaciones provinciales de la Oficina del Censo Electoral atienden en el 900 343 232, según la nota del INE.",
    ]),
  ],
  faqs: [{ q: "¿Puedo pedir un duplicado de la tarjeta censal?", a: "No la necesitas para votar. Para saber tu mesa, consulta e imprime tu inscripción en la sede del INE con Cl@ve, o usa la consulta de mesas y locales sin identificación. Dudas: 900 343 232." }],
  sources: [INE_CENSO, INE_MESAS, INE_NOTA],
};

const IN: Record<string, { href: string; label: string }[]> = {
  "/empadronarse/cita-previa-madrid": [{ href: P_MAD, label: "Formulario de empadronamiento en Madrid: hoja padronal" }],
  "/empadronarse/documentos-necesarios": [{ href: P_MAD, label: "Formulario y documentos en Madrid" }],
  "/empadronarse/padron-y-voto-29n": [{ href: P_MAD, label: "Madrid: altas desde el 31 de julio y voto el 29-N" }],
  "/empadronarse/baja": [{ href: P_MAD, label: "Baja en Madrid: declaración responsable" }],
};

export function enlazarTarjetaMadrid1027(g: Guide): Guide {
  if (g.path === "/elecciones/tarjeta-censal-cuando-llega") {
    const ids = new Set(g.sections.map((s) => s.id));
    if (!ids.has("perdida-duplicado")) {
      g.sections = [...g.sections, ...TARJETA_EXTRA.sections];
      g.faqs = [...(g.faqs ?? []), ...TARJETA_EXTRA.faqs];
      const hs = new Set((g.sources ?? []).map((s) => s.href));
      g.sources = [...(g.sources ?? []), ...TARJETA_EXTRA.sources.filter((s) => !hs.has(s.href))];
    }
  }
  const add = IN[g.path];
  if (add) {
    const have = new Set(g.related.map((r) => r.href));
    g.related = [...g.related, ...add.filter((r) => !have.has(r.href))];
  }
  return g;
}
