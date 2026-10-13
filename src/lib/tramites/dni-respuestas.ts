/**
 * Respuestas directas para /dni (consultas GSC 2026-10: precio/tasa DNI y pasaporte, renovar DNI, cita DNI).
 * Fuentes: BOE Ley 84/1978 art. 6 (12 €), Ley 48/2015 art. 74.4 (familia numerosa 0 €), RD 255/2025 (validez y documentos), Interior y Policía.
 */
export const DNI_REVIEWED_AT = "2026-10-13";

export const DNI_SOURCES = {
  ley84: { label: "BOE: Ley 84/1978, artículo 6 (tasa del DNI: 12 €)", href: "https://www.boe.es/buscar/act.php?id=BOE-A-1979-867" },
  ley48: { label: "BOE: Ley 48/2015, artículo 74.4 (familia numerosa: 0 €)", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11644" },
  rd255: { label: "BOE: Real Decreto 255/2025, artículo 7 (validez del DNI)", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2025-6601" },
  interiorTasa: { label: "Interior: tasa y exenciones del DNI", href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/" },
  policiaPasaporte: { label: "Policía: tasas del pasaporte (30 €)", href: "https://www.dnielectronico.es/PortalDNIe/PRF1_Cons02.action?id_menu=55&pag=REF_1086" },
} as const;

export const DNI_DOCUMENTOS: string[] = [
  "Renovación: el DNI anterior y una fotografía reciente en color, de 32 × 26 mm, con fondo blanco liso y sin gafas oscuras.",
  "Cambio de domicilio: además, un certificado o volante de empadronamiento reciente.",
  "Pérdida o robo: una fotografía. Si no recuerdas tus datos, la oficina te identifica con las huellas.",
  "Primera vez: certificado literal de nacimiento del Registro Civil, una fotografía y el certificado de empadronamiento.",
];

export const DNI_PASOS: string[] = [
  "Pide cita gratis en citapreviadnie.es o en el 060 (la llamada tiene coste).",
  "Paga los 12 € por internet al pedir la cita o en la oficina, en efectivo o con tarjeta.",
  "Ve en persona con la foto y los documentos: allí te toman las huellas y la firma.",
  "Normalmente te entregan el DNI nuevo en la misma visita.",
];

export const DNI_FAQS: { q: string; a: string }[] = [
  { q: "¿Cuánto cuesta renovar el DNI en 2026?", a: "12 €, según el artículo 6 de la Ley 84/1978 (BOE). Es gratis para familias numerosas, para renovar un DNI en vigor por cambio de domicilio o de datos y para menores de 14 años de hogares que piden el ingreso mínimo vital." },
  { q: "¿Cuánto cuestan el DNI y el pasaporte juntos?", a: "42 €: 12 € el DNI y 30 € el pasaporte. Puedes hacer los dos en la misma cita si la reservas para ambos documentos. Para familias numerosas los dos son gratis." },
  { q: "¿Se puede renovar el DNI por internet?", a: "No. Por internet solo puedes pedir la cita y pagar la tasa. Tienes que ir en persona a una unidad de documentación, porque te toman las huellas y la firma." },
  { q: "¿Qué documentos necesito para renovar el DNI?", a: "El DNI anterior y una fotografía reciente en color de 32 × 26 mm con fondo blanco. Si cambias de domicilio, lleva también el certificado de empadronamiento." },
  { q: "¿Cuánto dura el DNI?", a: "2 años si tienes menos de 5; 5 años de 5 a 29; 10 años de 30 a 69; y más de 10 años, con fecha de caducidad, desde los 70 (Real Decreto 255/2025, art. 7). Puedes renovarlo en los últimos 180 días de vigencia." },
  { q: "¿Cómo pido o consulto la cita del DNI?", a: "En citapreviadnie.es o en el 060. La cita es gratuita; ninguna web privada puede cobrarte por reservarla. Desde el mismo portal puedes consultar o anular la cita." },
  { q: "¿Puedo votar con el DNI caducado?", a: "Sí. Interior admite el DNI caducado si es el original y lleva tu foto. No sirve el resguardo de renovación." },
];
