import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Corte de la alta velocidad Madrid–Andalucía tras el accidente de Urda (Toledo), 31-10-2026.
 * Fuentes leídas el 31-10-2026 (curl 200 salvo Iryo, que bloquea curl con 403 y se leyó con WebFetch):
 * - Renfe, comunicado del accidente (cambios y anulaciones sin coste, PAVAFF 900 10 10 20, servicios por carretera 31-10 a 3-11).
 * - Renfe, nota del PAT Madrid–Andalucía: no antes del 3-11.
 * - Iryo, comunicado de asistencia económica (reembolso íntegro, buzonafectados6076@iryo.eu, SOV 900 001 403 e iryo-sov.com).
 * - OUIGO, aviso consultado el 8-11-2026: servicios Madrid–Andalucía suspendidos hasta el 15-11 por cierre de línea. No se confirma el cambio gratuito en otras rutas.
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
  renfePat: { href: "https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/10/suspension-pat-madrid-andalucia", label: "Renfe, 29 de octubre de 2026 (histórica): el plan alternativo no podía empezar antes del 3 de noviembre" },
  renfeBus: { href: "https://grupo.renfe.com/content/dam/grupo-renfe/sala-de-prensa/comunicacion/comunicacion/castilla-la-mancha/pdf/pat-urda/PAT_MADRID-PUERTOLLANO.pdf", label: "Renfe: PDF de horarios del autobús Madrid–Ciudad Real–Puertollano (anterior a la prórroga)" },
  renfeBusNov: { href: "https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/11/renfe-prorroga-plan-alternativo-transporte-por-carretera-entre-madrid-ciudad-real-puertollano", label: "Renfe, nota consultada el 8 de noviembre de 2026: prórroga del autobús Madrid–Ciudad Real–Puertollano" },
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
  "Por Equipo RutaTrámite. Comprobación parcial del 8 de noviembre de 2026: aviso de OUIGO, nota de Renfe sobre el autobús Madrid–Ciudad Real–Puertollano y artículos 15 y 18 del Reglamento (UE) 2021/782. La revisión del 31 de octubre de 2026, a las 18:00 (hora peninsular), sigue siendo la fecha de los comunicados de aquel día y de las cifras de la Junta de Castilla-La Mancha, que no se han revalidado aquí.",
]);

export const CORTE_AVE_1031_GUIDES: Guide[] = [
  {
    id: "corte-ave-madrid-andalucia-reembolso", pack: "transporte", reviewedAt: "2026-11-08", path: P_CORTE_AVE,
    h1: "Corte del AVE Madrid–Andalucía: reembolso, cambio de billete y cómo reclamar",
    title: "AVE Madrid–Andalucía cortado: reembolso y cambio de billete",
    description: "Reembolso o cambio si se cancela tu tren Madrid–Andalucía: qué han anunciado Renfe, Iryo y OUIGO, y el Reglamento (UE) 2021/782.",
    lead: "Comprobación del 8 de noviembre de 2026: OUIGO informa en su web de que sus servicios Madrid–Andalucía están suspendidos hasta el 15 de noviembre por cierre de línea. Ese aviso no garantiza una reapertura el día 16 ni el estado de cada tren de Renfe o Iryo. Renfe, en la nota consultada ese día, mantiene cambios y anulaciones gratuitos para los viajeros afectados y prorroga en principio hasta el 12 de noviembre el autobús Madrid–Ciudad Real–Puertollano. Antes de desplazarte, comprueba tu reserva. Si tu tren está cancelado o se prevé un retraso de al menos 60 minutos en el destino final, el artículo 18 del Reglamento (UE) 2021/782 permite elegir entre reintegro o transporte alternativo.",
    cta: S.renfeAyuda,
    secondaryCta: S.iryo,
    sources: [S.renfe, S.renfePat, S.renfeBus, S.renfeBusNov, S.renfeAyuda, S.iryo, S.ouigo, S.mitmaDerechos, S.mitmaVictimas, S.reglamento, S.jccm, S.ep],
    related: [
      { href: "/elecciones/voto-por-correo", label: "Voto por correo si no puedes viajar el 29-N" },
      { href: "/elecciones/transporte-para-ir-a-votar-29n", label: "Cómo ir a votar el 29-N" },
      { href: "/elecciones/enviar-voto-por-correo", label: "Cómo enviar el voto por correo" },
      { href: "/transporte", label: "Abonos y tarjetas de transporte" },
    ],
    disclaimer: "No somos Renfe, Iryo, Ouigo ni Adif. Antes de viajar o reclamar, mira el aviso de tu compañía: esta página puede quedar desfasada en horas. La comprobación del 8 de noviembre de 2026 alcanza el aviso de OUIGO, la prórroga del autobús de Renfe y los artículos 15 y 18 del Reglamento (UE) 2021/782. No revalida aquí las cifras de víctimas ni las causas del accidente, que están en investigación.",
    faqs: [
      { q: "¿Me devuelven el dinero si mi AVE a Andalucía se ha cancelado?", a: "Depende del operador y del billete. La nota de Renfe consultada el 8 de noviembre mantiene cambios y anulaciones gratuitos para los viajeros afectados por la interrupción. El comunicado de Iryo a los afectados por el accidente de Urda dice que devolverá el importe íntegro del billete; no describe por sí solo cualquier otro billete cancelado. OUIGO anuncia sus servicios Madrid–Andalucía suspendidos hasta el 15 de noviembre. Si el tren está cancelado o se prevé un retraso de al menos 60 minutos en el destino final, el artículo 18 del Reglamento (UE) 2021/782 permite elegir entre reintegro o transporte alternativo. Pídelo en el canal de tu compañía." },
      { q: "¿Cuándo vuelve el AVE entre Madrid y Andalucía?", a: "El aviso de OUIGO consultado el 8 de noviembre anuncia la suspensión de sus servicios Madrid–Andalucía hasta el 15 de noviembre por cierre de línea. No confirma una reapertura el día 16. La nota de Renfe del 29 de octubre sobre una primera fecha posible de su plan alternativo es histórica. La nota de Renfe consultada el 8 de noviembre prorroga, en principio hasta el 12 de noviembre inclusive, el autobús Madrid–Ciudad Real–Puertollano; no acredita la reapertura de la alta velocidad. Comprueba el estado de tu tren con tu operador." },
      { q: "¿Hay autobuses de Renfe mientras tanto?", a: "Según la nota de Renfe consultada el 8 de noviembre de 2026, el autobús Madrid–Ciudad Real–Puertollano que empezó el 31 de octubre continúa, en principio, hasta el 12 de noviembre inclusive. Desde el 4 de noviembre el dispositivo se presta íntegramente por carretera. Las salidas desde Madrid-Atocha Cercanías (calle Méndez Álvaro) son a las 8:00, 10:30, 12:00, 14:00, 16:30, 18:00, 20:00 y 22:30, y desde Puertollano a las 4:45 (solo laborables), 6:45, 8:15, 10:00, 12:00, 15:30, 18:15 y 20:15. El recorrido anterior por vía convencional, con unos 90 minutos más, no queda confirmado como servicio vigente en esa nota. Comprueba tu billete en Renfe antes de salir: esta alternativa no cubre por sí sola todas las capitales andaluzas." },
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
      sec("estado-servicio", "Estado del servicio: avisos del 8 de noviembre e información anterior", [
        "Los avisos siguientes no están todos comprobados el mismo día. El 8 de noviembre de 2026 se han contrastado el aviso de OUIGO y la nota de Renfe que prorroga el autobús Madrid–Ciudad Real–Puertollano. La nota de Renfe del 29 de octubre, que situaba el 3 de noviembre como primera fecha posible de otro plan alternativo, es histórica y no describe por sí sola los servicios de hoy.",
      ], [[
        "Línea de alta velocidad Madrid–Andalucía: OUIGO dice, en el aviso consultado el 8 de noviembre, que sus servicios están suspendidos hasta el 15 de noviembre por cierre de línea. Renfe explica su autobús por la interrupción de la circulación. Ninguna de esas dos fuentes fija una fecha de reapertura de la infraestructura ni el estado de cada tren de Iryo.",
        "Renfe: la nota consultada el 8 de noviembre no mantiene como servicio vigente el recorrido especial por vía convencional. Describe el dispositivo desde el 4 de noviembre como íntegramente por carretera. El dato de unos 90 minutos más queda como información anterior, no como horario actual.",
        "Renfe: en la nota consultada el 8 de noviembre, el plan por carretera Madrid–Ciudad Real–Puertollano que empezó el 31 de octubre sigue, en principio, hasta el 12 de noviembre inclusive y, desde el 4 de noviembre, se presta íntegramente por carretera. Salidas desde Madrid-Atocha Cercanías (calle Méndez Álvaro) a las 8:00, 10:30, 12:00, 14:00, 16:30, 18:00, 20:00 y 22:30. Desde Puertollano, a las 4:45 (solo laborables), 6:45, 8:15, 10:00, 12:00, 15:30, 18:15 y 20:15. La nota mantiene cambios y anulaciones gratuitos para los viajeros afectados. No es un plan hasta todas las capitales andaluzas.",
        "Renfe, nota del 29 de octubre (histórica): el plan alternativo entonces previsto para la línea Madrid–Andalucía no podía empezar antes del 3 de noviembre. Esa nota no confirma qué circula el 8 de noviembre.",
        "Renfe: según fuentes de la compañía citadas por Europa Press, no vende billetes de alta velocidad en el corredor hasta el 13 de diciembre. Eso no significa que la línea vaya a estar cerrada hasta entonces.",
        "OUIGO: el aviso consultado el 8 de noviembre dice que los servicios Madrid–Andalucía están suspendidos hasta el 15 de noviembre por cierre de línea. Comprueba tu reserva y las opciones que te ofrezca la compañía. En esta revisión no hemos confirmado que siga vigente el cambio gratuito de fecha en otras rutas que la guía llegó a recoger.",
        "Iryo: su comunicado a los afectados no da fecha de vuelta. Mira el estado de tu tren en iryo.eu o en su app.",
      ]]),
      sec("renfe", "Renfe (AVE, Avlo, Alvia): cambio o anulación sin coste", [
        "Renfe ha habilitado cambios y anulaciones sin coste para los viajeros afectados por la suspensión de la línea de alta velocidad. Lo dice su comunicado oficial del accidente.",
        "Hazlo en el mismo canal donde compraste el billete: la web o la app de Renfe, una taquilla o la agencia o web de viajes que te lo vendió. Ten a mano el localizador o el número de billete.",
        "Si quieres reclamar algo más (por ejemplo, gastos), usa la página de contacto y reclamaciones de Renfe y guarda el justificante de que lo has enviado.",
      ]),
      sec("iryo", "Iryo: asistencia del comunicado por el accidente de Urda", [
        "El comunicado de Iryo dirigido a quienes sufren el accidente de Urda dice que devolverá a todos los viajeros el importe íntegro de su billete. Se pide escribiendo a buzonafectados6076@iryo.eu con el certificado de titularidad de la cuenta bancaria donde quieres cobrar. Ese texto no acredita el mismo reembolso para cualquier otro billete cancelado más adelante: en ese caso, comprueba tu reserva y el artículo 18.",
        "Si viajabas en el tren afectado y, por razones justificadas, no pudiste usar el transporte alternativo que organizó Iryo, te reembolsa también el transporte y, si hizo falta, el alojamiento y la manutención. Añade al correo las facturas o justificantes de pago.",
        "Los familiares de fallecidos o heridos graves pueden pedir el transporte de ida y vuelta al lugar del accidente, el alojamiento y la manutención. Hace falta acreditar el vínculo familiar y los gastos.",
      ]),
      sec("ouigo", "OUIGO: suspensión anunciada hasta el 15 de noviembre", [
        "OUIGO informa, en el aviso consultado el 8 de noviembre de 2026, de que sus servicios Madrid–Andalucía están suspendidos hasta el 15 de noviembre por cierre de línea. Comprueba en «Mis reservas» el estado de tu tren y las opciones disponibles. En esta revisión no hemos confirmado la vigencia del cambio gratuito en otras rutas que esta guía recogía antes.",
        "Tu reserva se gestiona en «Mis reservas» de ouigo.com/es, y los vales en «Mis vales de compra». Si tu tren está cancelado o se prevé un retraso de al menos 60 minutos en el destino final, el artículo 18 del Reglamento (UE) 2021/782 te deja elegir entre el reintegro en las condiciones de ese artículo o continuar por una vía alternativa comparable.",
      ]),
      sec("victimas", "Si eres víctima o familiar", [
        "Renfe tiene activado el Plan de Asistencia a las Víctimas de Accidentes Ferroviarios y a sus Familiares (PAVAFF) y el teléfono de atención a víctimas y familiares 900 10 10 20.",
        "Iryo tramita las prestaciones del Seguro Obligatorio de Viajeros (asistencia sanitaria, indemnizaciones, gastos de familiares) por teléfono en el 900 001 403 o con el formulario de iryo-sov.com. También paga anticipos a los heridos y a los familiares de los fallecidos, según el artículo 15 del Reglamento (UE) 2021/782; se piden en buzonafectados6076@iryo.eu.",
        "La Junta de Castilla-La Mancha mantiene un Centro de Atención a Familiares en Toledo, con atención psicológica. El Ministerio de Transportes resume los derechos de las víctimas y sus familias en su web.",
      ]),
      sec("derechos", "Tus derechos como viajero (Reglamento (UE) 2021/782)", [
        "Este reglamento europeo se aplica a los trenes nacionales de larga distancia. El Ministerio de Transportes lo resume así:",
      ], [[
        "Si se prevé un retraso de al menos 60 minutos en el destino final del contrato de transporte, puedes elegir entre el reintegro del billete de las partes no efectuadas —y de las ya efectuadas si el viaje ha perdido su razón de ser, con regreso al origen cuando proceda— o continuar por una vía alternativa, en condiciones comparables, lo antes posible o en una fecha posterior que te convenga. Lo establece el artículo 18 del Reglamento (UE) 2021/782.",
        "Si decides seguir el viaje con retraso, tienes una indemnización mínima del 25 % del billete por 60 a 119 minutos y del 50 % por 120 minutos o más. Se paga en un mes desde que la pides.",
        "No hay indemnización por retraso si te informaron del retraso antes de comprar el billete.",
        "Si el retraso en la salida o en la llegada es de al menos 60 minutos, o si el servicio se cancela, la empresa ferroviaria debe ofrecer gratuitamente comidas y refrigerios en una medida adecuada al tiempo de espera, cuando puedan suministrarse de forma razonable, y, si el tren queda bloqueado en la vía, el transporte hasta la estación, un punto de partida alternativo o el destino final, siempre que sea físicamente posible.",
        "En caso de muerte o lesiones, la empresa ferroviaria debe abonar los anticipos para necesidades económicas inmediatas sin demora y, como máximo, quince días después de identificar a la persona con derecho a indemnización, conforme al artículo 15 del Reglamento (UE) 2021/782.",
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
