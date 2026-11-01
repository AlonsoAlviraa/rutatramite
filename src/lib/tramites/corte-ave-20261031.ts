import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Corte de la alta velocidad Madrid–Andalucía tras el accidente de Urda (Toledo), 31-10-2026.
 * Fuentes leídas el 31-10-2026 (curl 200 salvo Iryo, que bloquea curl con 403 y se leyó con WebFetch):
 * - Renfe, comunicado del accidente (cambios y anulaciones sin coste, PAVAFF 900 10 10 20, servicios por carretera 31-10 a 3-11).
 * - Renfe, nota del PAT Madrid–Andalucía: no antes del 3-11.
 * - Iryo, comunicado de asistencia económica (reembolso íntegro, buzonafectados6076@iryo.eu, SOV 900 001 403 e iryo-sov.com).
 * - Ouigo, aviso en su web: trenes Madrid–Andalucía cancelados hasta el 9-11 incluido; cambio de fecha gratis hasta el 9-11 en otras rutas.
 * - Junta de Castilla-La Mancha, nota de 31-10: 69 fallecidos (Centro Integrado de Datos), 110 ingresados, 76 altas, 34 hospitalizados (15 UCI).
 * - Ministerio de Transportes: derechos de los viajeros de ferrocarril (Reglamento (UE) 2021/782) y derechos de las víctimas.
 * NO publicado por no estar en fuente oficial: fecha de reapertura de la línea, teléfonos de atención al cliente que solo da la prensa,
 * ayudas públicas para Urda (el RDL 1/2026 es de Adamuz y Gelida), causas del accidente y cualquier dato de víctimas.
 * Sin bloques de anuncios propios en esta página.
 */

export const P_CORTE_AVE = "/transporte/corte-ave-madrid-andalucia-reembolso";
const R = "2026-10-31";
const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });

const S = {
  renfe: { href: "https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/10/comunicado-renfe-accidente-urda", label: "Renfe: comunicado sobre el accidente de Urda (Toledo)" },
  renfePat: { href: "https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/10/suspension-pat-madrid-andalucia", label: "Renfe: el plan alternativo Madrid–Andalucía no podrá empezar antes del 3 de noviembre" },
  renfeBus: { href: "https://grupo.renfe.com/content/dam/grupo-renfe/sala-de-prensa/comunicacion/comunicacion/castilla-la-mancha/pdf/pat-urda/PAT_MADRID-PUERTOLLANO.pdf", label: "Renfe: horarios del autobús Madrid–Ciudad Real–Puertollano (PDF)" },
  renfeAyuda: { href: "https://www.renfe.com/es/es/ayuda/contactar-renfe", label: "Renfe: contacto, reclamaciones e indemnizaciones" },
  iryo: { href: "https://iryo.eu/es/comunicado-asistencia-economica-accidente-en-urda", label: "Iryo: comunicado de asistencia económica tras el accidente de Urda" },
  ouigo: { href: "https://www.ouigo.com/es/preguntas-frecuentes?thematic=caso-retraso", label: "Ouigo: aviso de cancelaciones y preguntas frecuentes" },
  mitmaDerechos: { href: "https://www.transportes.gob.es/ferrocarriles/derechos-de-los-pasajeros/derechos-de-los-viajeros-de-ferrocarril-en-la-union-europea", label: "Ministerio de Transportes: derechos de los viajeros de ferrocarril en la UE" },
  mitmaVictimas: { href: "https://www.transportes.gob.es/ferrocarriles/derechos-de-los-pasajeros/derechos-de-las-victimas-de-accidentes-ferroviarios-y-sus-familiares", label: "Ministerio de Transportes: derechos de las víctimas de accidentes ferroviarios y sus familiares" },
  reglamento: { href: "https://eur-lex.europa.eu/legal-content/ES/ALL/?uri=CELEX:32021R0782", label: "EUR-Lex: Reglamento (UE) 2021/782, derechos y obligaciones de los viajeros de ferrocarril" },
  jccm: { href: "https://www.castillalamancha.es/actualidad/notasdeprensa/el-gobierno-de-castilla-la-mancha-continua-el-seguimiento-de-la-emergencia-por-el-accidente", label: "Junta de Castilla-La Mancha, 31-10-2026: seguimiento de la emergencia por el accidente" },
  ep: { href: "https://www.europapress.es/economia/transportes-00343/noticia-renfe-bloquea-venta-billetes-madrid-andalucia-diciembre-20261028180053.html", label: "Europa Press, 28-10-2026: Renfe bloquea la venta de billetes Madrid–Andalucía hasta diciembre" },
};

const BYLINE = sec("byline", "Autoría y revisión", [
  "Por Equipo RutaTrámite. Última revisión: 31 de octubre de 2026, a las 18:00 (hora peninsular), con los comunicados de Renfe, Iryo y Ouigo, la nota de la Junta de Castilla-La Mancha y las páginas del Ministerio de Transportes. Volveremos a revisarla el 3 de noviembre, fecha en la que Renfe dice que informará de su plan alternativo.",
]);

export const CORTE_AVE_1031_GUIDES: Guide[] = [
  {
    id: "corte-ave-madrid-andalucia-reembolso", pack: "transporte", reviewedAt: R, path: P_CORTE_AVE,
    h1: "Corte del AVE Madrid–Andalucía: reembolso, cambio de billete y cómo reclamar",
    title: "AVE Madrid–Andalucía cortado: reembolso y cambio de billete",
    description: "La alta velocidad Madrid–Andalucía sigue cortada tras el accidente de Urda. Cómo pedir el reembolso o cambiar el billete en Renfe, Iryo y Ouigo, y reclamar.",
    lead: "Respuesta corta, a 31 de octubre de 2026: la línea de alta velocidad entre Madrid y Andalucía sigue cortada desde el accidente del 28 de octubre cerca de Urda (Toledo). Ningún comunicado oficial consultado da fecha de reapertura. Si tenías billete, no lo pierdes: Renfe permite cambios y anulaciones sin coste, Iryo devuelve el importe íntegro y Ouigo ha cancelado sus trenes Madrid–Andalucía hasta el 9 de noviembre incluido. Aquí tienes qué hacer con cada compañía, qué derechos tienes y cómo reclamar si no te contestan.",
    cta: S.renfeAyuda,
    secondaryCta: S.iryo,
    sources: [S.renfe, S.renfePat, S.renfeBus, S.renfeAyuda, S.iryo, S.ouigo, S.mitmaDerechos, S.mitmaVictimas, S.reglamento, S.jccm, S.ep],
    related: [
      { href: "/elecciones/voto-por-correo", label: "Voto por correo si no puedes viajar el 29-N" },
      { href: "/elecciones/transporte-para-ir-a-votar-29n", label: "Cómo ir a votar el 29-N" },
      { href: "/elecciones/enviar-voto-por-correo", label: "Cómo enviar el voto por correo" },
      { href: "/transporte", label: "Abonos y tarjetas de transporte" },
    ],
    disclaimer: "No somos Renfe, Iryo, Ouigo ni Adif. Esta página resume sus comunicados oficiales a 31-10-2026 y puede quedar desfasada en horas: antes de viajar o reclamar, mira el aviso de tu compañía. No tratamos las causas del accidente, que están en investigación.",
    faqs: [
      { q: "¿Me devuelven el dinero si mi AVE a Andalucía se ha cancelado?", a: "Sí. Renfe ha habilitado cambios y anulaciones sin coste para los afectados por el corte, Iryo devuelve el importe íntegro del billete y Ouigo ha cancelado sus trenes en esa línea. Además, el Reglamento (UE) 2021/782 te da derecho a elegir entre el reembolso total o viajar por otra vía. Lo pides en el canal de tu compañía (abajo, una a una)." },
      { q: "¿Cuándo vuelve el AVE entre Madrid y Andalucía?", a: "A 31 de octubre de 2026 no hay fecha oficial. Renfe dice que su plan alternativo de transporte no podrá empezar antes del 3 de noviembre y que informará antes de esa fecha. Ouigo ha cancelado sus trenes en esa línea hasta el 9 de noviembre incluido." },
      { q: "¿Hay autobuses de Renfe mientras tanto?", a: "Del 31 de octubre al 3 de noviembre, Renfe tiene autobuses Madrid–Ciudad Real–Puertollano. Salen de Madrid Puerta de Atocha a las 8:00, 10:30, 12:00, 14:00, 16:30, 18:00, 20:00 y 22:30, según su comunicado. También tiene servicios por vía convencional entre esas ciudades, con unos 90 minutos más de viaje." },
      { q: "Viajaba en el tren de Iryo: ¿qué gastos me pagan?", a: "Iryo devuelve el billete y, si por razones justificadas no pudiste usar su transporte alternativo, los gastos de transporte y, si hizo falta, alojamiento y manutención. Se pide en buzonafectados6076@iryo.eu con el certificado de titularidad de la cuenta y las facturas o justificantes." },
      { q: "Compré el billete en una web de viajes: ¿a quién reclamo?", a: "Empieza por quien te vendió el billete, que es quien tiene tu reserva. Si no te resuelve, el Reglamento (UE) 2021/782 te deja reclamar a la empresa ferroviaria. Guarda siempre el localizador y el justificante de pago." },
      { q: "La compañía no me contesta: ¿qué hago?", a: "Tiene un mes para darte una respuesta motivada, o para decirte cuándo contestará, sin pasar de tres meses. Si no lo hace o no estás de acuerdo, puedes acudir a los organismos de aplicación del Reglamento (Ministerio de Transportes, departamento de transportes de tu comunidad o consumo) o a la Junta Arbitral del Transporte del origen, el destino o el lugar de compra." },
      { q: "Soy familiar de una víctima: ¿dónde llamo?", a: "Renfe tiene el teléfono de atención a víctimas y familiares 900 10 10 20 (plan PAVAFF). Iryo atiende las prestaciones del seguro obligatorio de viajeros en el 900 001 403 y en el formulario de iryo-sov.com. La Junta de Castilla-La Mancha mantiene un Centro de Atención a Familiares en Toledo." },
    ],
    sections: [
      sec("que-ha-pasado", "Qué ha pasado, en pocas líneas", [
        "El miércoles 28 de octubre de 2026, a las 8:53, un AVE de Renfe y un tren de Iryo chocaron en el entorno de Urda (Toledo), en la línea de alta velocidad Madrid–Andalucía, según el comunicado de Renfe. La circulación está interrumpida desde entonces.",
        "Cifras oficiales provisionales a 31 de octubre, de la Junta de Castilla-La Mancha: el Centro Integrado de Datos mantiene en 69 el número de fallecidos; de 110 personas ingresadas en hospitales de la región, 76 han recibido el alta y 34 siguen hospitalizadas, 15 de ellas en UCI.",
        "La investigación está abierta. Esta página no trata causas ni responsabilidades: solo explica qué puedes hacer si tenías billete o tienes que viajar.",
      ]),
      sec("estado-servicio", "Estado del servicio a 31 de octubre de 2026 (18:00)", [
        "Esto es lo que dicen los canales oficiales de las compañías. Lo revisaremos el 3 de noviembre o antes si hay un aviso oficial.",
      ], [[
        "Línea de alta velocidad Madrid–Andalucía: cortada. Ningún comunicado oficial consultado da fecha de reapertura.",
        "Renfe: servicios especiales por vía convencional entre Madrid, Ciudad Real y Puertollano, con unos 90 minutos más de viaje.",
        "Renfe: autobuses Madrid–Ciudad Real–Puertollano del 31 de octubre al 3 de noviembre. Desde Madrid Puerta de Atocha, a las 8:00, 10:30, 12:00, 14:00, 16:30, 18:00, 20:00 y 22:30. Desde Puertollano, a las 4:45 (solo el martes 3), 6:45, 8:15, 10:00, 12:00, 15:30, 18:15 y 20:15.",
        "Renfe: el plan alternativo de transporte Madrid–Andalucía no podrá empezar antes del martes 3 de noviembre. Renfe informará antes de esa fecha de horarios, recorridos y servicios.",
        "Renfe: según fuentes de la compañía citadas por Europa Press, no vende billetes de alta velocidad en el corredor hasta el 13 de diciembre. Eso no significa que la línea vaya a estar cerrada hasta entonces.",
        "Ouigo: todos sus trenes entre Madrid y Andalucía, cancelados hasta el 9 de noviembre incluido.",
        "Iryo: su comunicado a los afectados no da fecha de vuelta. Mira el estado de tu tren en iryo.eu o en su app.",
      ]]),
      sec("renfe", "Renfe (AVE, Avlo, Alvia): cambio o anulación sin coste", [
        "Renfe ha habilitado cambios y anulaciones sin coste para los viajeros afectados por la suspensión de la línea de alta velocidad. Lo dice su comunicado oficial del accidente.",
        "Hazlo en el mismo canal donde compraste el billete: la web o la app de Renfe, una taquilla o la agencia o web de viajes que te lo vendió. Ten a mano el localizador o el número de billete.",
        "Si quieres reclamar algo más (por ejemplo, gastos), usa la página de contacto y reclamaciones de Renfe y guarda el justificante de que lo has enviado.",
      ]),
      sec("iryo", "Iryo: reembolso íntegro y gastos con justificante", [
        "Iryo devuelve a todos los viajeros el importe íntegro del billete. Se pide escribiendo a buzonafectados6076@iryo.eu con el certificado de titularidad de la cuenta bancaria donde quieres cobrar.",
        "Si viajabas en el tren afectado y, por razones justificadas, no pudiste usar el transporte alternativo que organizó Iryo, te reembolsa también el transporte y, si hizo falta, el alojamiento y la manutención. Añade al correo las facturas o justificantes de pago.",
        "Los familiares de fallecidos o heridos graves pueden pedir el transporte de ida y vuelta al lugar del accidente, el alojamiento y la manutención. Hace falta acreditar el vínculo familiar y los gastos.",
      ]),
      sec("ouigo", "Ouigo: trenes cancelados hasta el 9 de noviembre", [
        "Ouigo avisa en su web de que ha cancelado todos sus trenes entre Madrid y Andalucía hasta el 9 de noviembre incluido. En sus otras rutas puedes cambiar gratis la fecha del viaje hasta el 9 de noviembre.",
        "Tu reserva se gestiona en «Mis reservas» de ouigo.com/es, y los vales en «Mis vales de compra». Si tu tren está cancelado, el reglamento europeo te da derecho a elegir entre el reembolso total del billete o viajar por otra vía en condiciones comparables.",
      ]),
      sec("victimas", "Si eres víctima o familiar", [
        "Renfe tiene activado el Plan de Asistencia a las Víctimas de Accidentes Ferroviarios y a sus Familiares (PAVAFF) y el teléfono de atención a víctimas y familiares 900 10 10 20.",
        "Iryo tramita las prestaciones del Seguro Obligatorio de Viajeros (asistencia sanitaria, indemnizaciones, gastos de familiares) por teléfono en el 900 001 403 o con el formulario de iryo-sov.com. También paga anticipos a los heridos y a los familiares de los fallecidos, según el artículo 15 del Reglamento (UE) 2021/782; se piden en buzonafectados6076@iryo.eu.",
        "La Junta de Castilla-La Mancha mantiene un Centro de Atención a Familiares en Toledo, con atención psicológica. El Ministerio de Transportes resume los derechos de las víctimas y sus familias en su web.",
      ]),
      sec("derechos", "Tus derechos como viajero (Reglamento (UE) 2021/782)", [
        "Este reglamento europeo se aplica a los trenes nacionales de larga distancia. El Ministerio de Transportes lo resume así:",
      ], [[
        "Si se prevé que llegarás con más de 60 minutos de retraso, puedes elegir entre el reembolso total del billete o seguir el viaje por otra vía, en condiciones comparables, en la fecha que te venga bien.",
        "Si decides seguir el viaje con retraso, tienes una indemnización mínima del 25 % del billete por 60 a 119 minutos y del 50 % por 120 minutos o más. Se paga en un mes desde que la pides.",
        "No hay indemnización por retraso si te informaron del retraso antes de comprar el billete.",
        "Con más de una hora de retraso, comida y bebida razonables; si el tren queda bloqueado, la compañía debe organizar tu traslado.",
        "En caso de muerte o lesiones, la compañía debe pagar un anticipo en un plazo de 15 días para las necesidades inmediatas.",
      ]]),
      sec("reclamar", "Cómo reclamar, paso a paso", [
        "Primero, a la compañía. Por escrito, con el localizador, tus datos, lo que pides (reembolso, cambio, gastos) y los justificantes. Guarda el número o la copia de la reclamación.",
        "La compañía tiene un mes para responder de forma motivada o para decirte cuándo lo hará, y nunca más de tres meses desde tu reclamación.",
        "Si no contesta o no estás de acuerdo, el Ministerio de Transportes indica dos vías: los organismos de aplicación del reglamento (el propio Ministerio, el departamento de transportes de tu comunidad autónoma y la autoridad de consumo) y las Juntas Arbitrales del Transporte. A la Junta Arbitral puedes ir en el lugar de origen, en el de destino o en el de compra del billete.",
      ], [[
        "Localizador o número de billete.",
        "Justificante de pago y, si compraste en una agencia o web, su nombre.",
        "Certificado de titularidad de la cuenta (Iryo lo pide).",
        "Facturas de taxi, autobús, hotel o comidas, si reclamas gastos.",
        "Copia de lo que envías y fecha de envío.",
      ]]),
      sec("votar", "Si el corte te impide viajar a votar el 29-N", [
        "Si estás inscrito en el censo en Andalucía y estás en Madrid (o al revés) y pensabas ir en tren a votar, el voto por correo no depende de que reabra la línea. Lo pides hasta el 19 de noviembre y lo depositas en Correos hasta el 25 de noviembre, según el calendario de la Junta Electoral Central. Te lo contamos en la guía de voto por correo.",
      ]),
      BYLINE,
    ],
  },
];

/* ---- Bloques añadidos a guías existentes (31-10-2026) ---- */

const JEC_CAL = { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario electoral de las elecciones generales 2026" };
const LINK_AVE = { href: P_CORTE_AVE, label: "Corte del AVE Madrid–Andalucía: reembolso y cambio de billete" };

const votoCorte = sec("corte-ave", "Si el corte del AVE Madrid–Andalucía no te deja viajar a votar", [
  "Si estás inscrito en el censo en una provincia andaluza y vives, trabajas o estudias en Madrid (o al revés) y contabas con el tren para ir a votar, el voto por correo es la forma de votar que no depende de cuándo reabra la línea. A 31 de octubre de 2026 no hay fecha oficial de reapertura.",
  "Las fechas son las del calendario oficial de la Junta Electoral Central:",
], [[
  "Pides el voto por correo hasta el 19 de noviembre: en una oficina de Correos, en persona con el DNI, o por internet con firma electrónica.",
  "En la solicitud pones la dirección donde vas a estar entre el 9 y el 22 de noviembre. Puede ser distinta de tu domicilio.",
  "La Oficina del Censo Electoral te envía la documentación del 9 al 22 de noviembre.",
  "Envías tu voto en una oficina de Correos del 10 al 25 de noviembre. No lleva franqueo.",
  "Ojo: cuando tu solicitud queda anotada, ya no puedes votar en persona en tu mesa, aunque la línea reabra antes del 29.",
]]);
const votoFaq = { q: "Estoy censado en Andalucía, vivo en Madrid y el AVE está cortado: ¿cómo voto?", a: "Pide el voto por correo antes del 19 de noviembre e indica como dirección de envío la de Madrid. Te llegará entre el 9 y el 22 de noviembre y lo depositas en Correos hasta el 25. Así no dependes de que reabra la línea." };

const transporteCorte = sec("corte-ave", "Si pensabas ir a votar en AVE entre Madrid y Andalucía", [
  "La alta velocidad Madrid–Andalucía está cortada desde el accidente del 28 de octubre cerca de Urda (Toledo) y, a 31 de octubre de 2026, ningún comunicado oficial da fecha de reapertura. Renfe dice que su plan alternativo no empezará antes del 3 de noviembre.",
  "Si tienes que ir a votar a otra provincia de ese corredor, no esperes al último día: el voto por correo se pide hasta el 19 de noviembre y se deposita en Correos hasta el 25 (calendario de la Junta Electoral Central). Si ya tenías billete, en la guía del corte del AVE te explicamos cómo pedir el reembolso o el cambio.",
]);
const transporteFaq = { q: "Tenía billete de AVE para ir a votar a Andalucía: ¿qué hago?", a: "Pide el reembolso o el cambio sin coste a tu compañía y, si no puedes asegurar el viaje, pide el voto por correo antes del 19 de noviembre. Lo depositas en Correos hasta el 25 de noviembre." };

const fichaRedes = sec("declaracion-no-es-encuesta", "Una declaración en redes no es una encuesta", [
  "Tras un suceso grave es habitual leer en redes frases como «se nota un cambio en el voto» o «esto lo va a mover todo». Aunque las escriba alguien que trabaja en un instituto de opinión, eso es una opinión, no una encuesta.",
  "Ejemplo neutral: un responsable de una empresa demoscópica publica en una red social que percibe un cambio en la intención de voto. Si no hay muestra, fechas de trabajo de campo, método, pregunta ni margen de error, no hay nada que comprobar. Cuando ese mismo instituto publique un sondeo con su ficha técnica, entonces sí podrás leerlo y compararlo con otros.",
  "Cinco preguntas para saber si lo que lees es fiable:",
], [[
  "¿Quién la ha hecho y quién la ha pagado?",
  "¿A cuántas personas y en qué fechas?",
  "¿Cómo: por teléfono, en internet, en persona?",
  "¿Cuál es el margen de error?",
  "¿Está publicada la ficha técnica completa? Si falta, no la tomes como dato.",
]]);
const fichaFaq = { q: "Un tuit de un sociólogo dice que el voto ha cambiado: ¿es una encuesta?", a: "No. Una encuesta publicada debe ir con su ficha técnica (autor, quien la encarga, muestra, fechas, método y margen de error). Una opinión en redes no tiene nada de eso, así que no se puede comprobar. Recuerda además que del 24 al 28 de noviembre está prohibido publicar sondeos." };

type Add = { section: GuideSection; before?: string; faq: { q: string; a: string }; related: { href: string; label: string }[]; sources?: { href: string; label: string }[] };
const ADD: Record<string, Add> = {
  "/elecciones/voto-por-correo": { section: votoCorte, faq: votoFaq, related: [LINK_AVE, { href: "/elecciones/transporte-para-ir-a-votar-29n", label: "Cómo ir a votar el 29-N" }], sources: [JEC_CAL] },
  "/elecciones/transporte-para-ir-a-votar-29n": { section: transporteCorte, before: "pueblos", faq: transporteFaq, related: [LINK_AVE, { href: "/elecciones/voto-por-correo", label: "Voto por correo: hasta el 19 de noviembre" }], sources: [S.renfePat, JEC_CAL] },
  "/elecciones/ficha-tecnica-encuesta": { section: fichaRedes, before: "para-ti", faq: fichaFaq, related: [{ href: "/elecciones/encuestas-prohibidas", label: "Cuándo están prohibidas las encuestas" }] },
};
export const CORTE_AVE_1031_UPDATED = Object.keys(ADD);

export function mejorarCorteAve1031(g: Guide): Guide {
  const a = ADD[g.path];
  if (!a || g.sections.some((s) => s.id === a.section.id)) return g;
  const i = a.before ? g.sections.findIndex((s) => s.id === a.before) : -1;
  const sections = [...g.sections];
  if (i >= 0) sections.splice(i, 0, a.section); else sections.push(a.section);
  const have = new Set(g.related.map((r) => r.href));
  const src = new Set((g.sources ?? []).map((s) => s.href));
  return {
    ...g,
    reviewedAt: R,
    sections,
    faqs: [...(g.faqs ?? []), a.faq],
    related: [...g.related, ...a.related.filter((r) => !have.has(r.href) && r.href !== g.path)],
    sources: [...(g.sources ?? []), ...(a.sources ?? []).filter((s) => !src.has(s.href))],
  };
}
