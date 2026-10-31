/**
 * Respuestas directas para /dni (consultas GSC: tasa/precio DNI y pasaporte, renovar DNI, cita).
 * Fuentes: BOE Ley 84/1978 art. 6 (12 €), Ley 48/2015 art. 74.4 (familia numerosa 0 €),
 * RD 255/2025 (validez y documentos), Interior y Policía Nacional. Revisado 2026-10-19.
 */
export const DNI_REVIEWED_AT = "2026-10-22";

export const DNI_SOURCES = {
  ley84: { label: "BOE: Ley 84/1978, artículo 6 (tasa del DNI: 12 €)", href: "https://www.boe.es/buscar/act.php?id=BOE-A-1979-867" },
  ley48: { label: "BOE: Ley 48/2015, artículo 74.4 (familia numerosa: 0 €)", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11644" },
  rd255: { label: "BOE: Real Decreto 255/2025, artículo 7 (validez del DNI)", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2025-6601" },
  interiorTasa: { label: "Interior: tasa y exenciones del DNI", href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/" },
  interiorPasaporte: { label: "Interior: tasa y exención del pasaporte", href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/" },
  policiaPasaporte: { label: "Policía: tasas del pasaporte (30 €)", href: "https://www.dnielectronico.es/PortalDNIe/PRF1_Cons02.action?id_menu=55&pag=REF_1086" },
  cita: { label: "Interior: cita previa del DNI (citapreviadnie.es)", href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/" },
} as const;

export const DNI_DOCUMENTOS: string[] = [
  "Renovación: el DNI anterior y una fotografía reciente en color, de 32 × 26 mm, con fondo blanco liso y sin gafas oscuras.",
  "Cambio de domicilio: además, un certificado o volante de empadronamiento reciente.",
  "Pérdida o robo: una fotografía. Si no recuerdas tus datos, la oficina te identifica con las huellas.",
  "Primera vez: certificado literal de nacimiento del Registro Civil, una fotografía y el certificado de empadronamiento.",
];

export const DNI_PASOS: string[] = [
  "Pide cita gratis en citapreviadnie.es o en el 060 (la llamada tiene coste).",
  "Paga la tasa (12 € el DNI; 30 € el pasaporte) por internet al pedir la cita o en la oficina, en efectivo o con tarjeta.",
  "Ve en persona con la foto y los documentos: allí te toman las huellas y la firma.",
  "Normalmente te entregan el DNI nuevo en la misma visita.",
];

export const DNI_FAQS: { q: string; a: string }[] = [
  { q: "¿Cuánto cuestan la tasa del DNI y del pasaporte en 2026?", a: "La tasa del DNI es 12 € (Ley 84/1978, art. 6, BOE). La del pasaporte ordinario es 30 € (Interior y Policía Nacional). Las dos juntas suman 42 €. La reserva de cita en citapreviadnie.es es gratuita: la tasa es del documento, no de la cita." },
  { q: "¿Cuánto cuesta renovar el DNI en 2026?", a: "12 €, según el artículo 6 de la Ley 84/1978 (BOE). Es gratis para familias numerosas, para renovar un DNI en vigor por cambio de domicilio o de datos y para menores de 14 años de hogares que piden el ingreso mínimo vital." },
  { q: "¿Cuánto cuestan el DNI y el pasaporte juntos?", a: "42 €: 12 € el DNI y 30 € el pasaporte. Puedes hacer los dos en la misma cita si la reservas para ambos documentos. Para familias numerosas los dos son gratis." },
  { q: "¿Se puede renovar el DNI por internet?", a: "No. Por internet solo puedes pedir la cita y pagar la tasa. Tienes que ir en persona a una unidad de documentación, porque te toman las huellas y la firma." },
  { q: "¿Qué documentos necesito para renovar el DNI?", a: "El DNI anterior y una fotografía reciente en color de 32 × 26 mm con fondo blanco. Si cambias de domicilio, lleva también el certificado de empadronamiento." },
  { q: "¿Cuánto dura el DNI?", a: "2 años si tienes menos de 5; 5 años de 5 a 29; 10 años de 30 a 69; y más de 10 años, con fecha de caducidad, desde los 70 (Real Decreto 255/2025, art. 7). Puedes renovarlo en los últimos 180 días de vigencia." },
  { q: "¿Cómo pido o consulto la cita del DNI en citapreviadnie.es?", a: "Entra en citapreviadnie.es (enlace desde Interior) o llama al 060. La cita es gratuita; ninguna web privada puede cobrarte por reservarla. Desde el mismo portal puedes consultar o anular la cita." },
  { q: "¿Puedo votar con el DNI caducado?", a: "Sí. Interior admite el DNI caducado si es el original y lleva tu foto. No sirve el resguardo de renovación." },
  { q: "¿Cuánto cuesta el DNI por primera vez?", a: "Lo mismo que renovarlo: 12 € (Ley 84/1978, art. 6, BOE), salvo exención. Para la primera expedición necesitas además el certificado literal de nacimiento y el de empadronamiento." },
  { q: "¿Cuánto cuesta renovar el DNI caducado?", a: "12 €, igual que si estuviera en vigor: la ley no fija ningún recargo por caducidad. Pides cita, llevas el DNI anterior y una foto, y te lo entregan normalmente en la misma visita." },
  { q: "¿Es gratis renovar el DNI con familia numerosa?", a: "Sí. Los miembros de familias numerosas están exentos de la tasa del DNI y del pasaporte (Ley 48/2015, art. 74.4). Lleva el título de familia numerosa en vigor a la cita." },
  { q: "¿Se puede hacer el pasaporte sin cita previa?", a: "Con carácter general no: la cita se pide gratis en citapreviadnie.es o en el 060. Si tienes un viaje inminente que puedas acreditar, consulta la atención excepcional que explica la guía de pasaporte urgente." },
];
