import {
  CITA_DNI_HOST,
  CITA_DNI_URL,
  SNAPSHOT_ESPERAS,
  TASA_DNI_LABEL,
  TASA_PASAPORTE_LABEL,
  TELEFONO_CITA,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedDni = [
  { href: "/dni/cita-previa", label: "Cita previa del DNI, la oficial" },
  { href: "/dni/paginas-clon-cita", label: "Páginas clon de la cita" },
  { href: "/dni/renovar-caducado", label: "Renovar el DNI caducado" },
  { href: "/dni/caducado-viajar-ue", label: "Viajar con DNI caducado" },
];

const relatedPas = [
  { href: "/pasaporte/cita-previa", label: "Cita del pasaporte, la oficial" },
  { href: "/pasaporte/urgente", label: "Pasaporte urgente" },
  { href: "/dni/misma-cita-pasaporte", label: "DNI y pasaporte en la misma cita" },
];

export const DNI_NICHOS_GUIDES: Guide[] = [
  {
    id: "no-hay-citas",
    reviewedAt: "2026-09-07",
    sources: [{ href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/", label: "Interior: canales de cita previa" }],
    pack: "viaje",
    path: "/dni/no-hay-citas",
    h1: "No hay citas para el DNI: qué hacer hoy",
    title: "No hay citas para el DNI: qué hacer hoy",
    description:
      "Qué comprobar si no encuentras cita para DNI o pasaporte: oficinas, fechas, mensajes del portal y consulta por el 060.",
    lead: `Si no encuentras una fecha adecuada, consulta otras oficinas y fechas en citapreviadnie.es. También puedes pedir cita por el ${TELEFONO_CITA}. Esta guía no dispone de un calendario en directo ni de una hora verificada de publicación de nuevos huecos.`,
    cta: { href: CITA_DNI_URL, label: `Pedir cita en ${CITA_DNI_HOST} (oficial)` },
    related: relatedDni,
    sections: [
      {
        id: "panorama",
        title: "Comprobar la disponibilidad",
        paragraphs: [
          `${SNAPSHOT_ESPERAS}`,
          `Interior identifica ${CITA_DNI_HOST} y el ${TELEFONO_CITA} como canales de cita. La reserva es gratuita; la llamada tiene coste. Para tasas, exenciones y pago, consulta la guía de documentos y tasas.`,
        ],
      },
      {
        id: "patron",
        title: "Antes de volver a intentarlo",
        paragraphs: [
          "Distingue entre un calendario sin disponibilidad y un mensaje de error. Guarda el texto del aviso para poder explicar la incidencia. No atribuyas el problema a un bloqueo o una penalización si el portal no lo indica.",
        ],
        lists: [
          [
            "Prepara el documento y sigue los campos que solicite el portal oficial.",
            "Comprueba oficinas a las que puedas desplazarte y el trámite disponible en cada una.",
            "Para equipos móviles, consulta el anuncio vigente del ayuntamiento y su canal de reserva.",
            `Si viajas en días: llama al ${TELEFONO_CITA} y explica la urgencia con el billete a mano.`,
            "Si cambias de cita, conserva la nueva confirmación y comprueba qué reserva sigue activa.",
          ],
        ],
      },
      {
        id: "urgente",
        title: "Si el viaje es inminente",
        paragraphs: [
          "Consulta con la unidad de documentación cómo acreditar tu situación. No hay atención inmediata garantizada por presentar un billete. La guía de DNI urgente explica los límites de la atención excepcional y la diferencia respecto a pasaportes de emergencia.",
          "Comprueba la documentación admitida para tu nacionalidad, destino y compañía. El resguardo de una cita no sustituye un documento de viaje.",
        ],
      },
      {
        id: "no-pagar",
        title: "Lo que no debes hacer",
        paragraphs: [
          "Accede desde el enlace de Interior y comprueba la dirección antes de introducir datos. RutaTrámite no reserva citas ni necesita copias de tu documento. Desconfía de una promesa de disponibilidad que no puedas confirmar en el portal oficial.",
        ],
      },
    ],
  },
  {
    id: "hora-liberacion",
    reviewedAt: "2026-09-07",
    sources: [{ href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/", label: "Interior: cita por internet y teléfono" }],
    pack: "viaje",
    path: "/dni/a-que-hora-se-liberan-citas",
    h1: "A qué hora se liberan las citas del DNI",
    title: "A qué hora se liberan las citas del DNI",
    description:
      "No tenemos verificado un horario nacional de liberación de citas del DNI. Consulta disponibilidad y avisos en los canales oficiales.",
    lead:
      "No tenemos verificada una hora común a todas las oficinas para liberar citas del DNI. La página de Interior consultada identifica los canales de reserva, pero no publica ese horario. No podemos recomendar una franja como garantía de conseguir cita.",
    cta: { href: CITA_DNI_URL, label: `Entrar en ${CITA_DNI_HOST}` },
    related: relatedDni,
    sections: [
      {
        id: "ventana",
        title: "Horario de atención y publicación de citas",
        paragraphs: [
          "El horario de apertura de una unidad no indica cuándo se actualiza su calendario de citas. Si encuentras un anuncio de una oficina concreta, comprueba su fecha y alcance antes de aplicarlo a otro municipio.",
        ],
      },
      {
        id: "checklist",
        title: "Qué puedes comprobar",
        paragraphs: ["Utiliza la disponibilidad que muestra el portal en el momento de la consulta:"],
        lists: [
          [
            "Selecciona el trámite y compara las oficinas y fechas que ofrezca el sistema.",
            "Comprueba que puedes acudir antes de confirmar una fecha.",
            "Si aparece un aviso, sigue sus instrucciones; no hay aquí un plazo de desbloqueo verificado.",
            `Alternativa telefónica: ${TELEFONO_CITA}, sobre todo con viaje justificado.`,
          ],
        ],
      },
      {
        id: "bloqueo",
        title: "Por qué a veces ni siquiera te deja elegir",
        paragraphs: [
          "Un fallo de acceso no demuestra que se hayan agotado las citas ni que exista una sanción por una ausencia anterior. Conserva el mensaje y consulta por el canal oficial si persiste. Esta guía no puede diagnosticar tu sesión.",
          "La reserva de cita es gratuita. El 060 tiene coste de llamada. Las tasas del documento y sus formas de pago se explican en la guía de documentos y tasas.",
        ],
      },
    ],
  },
  {
    id: "clones",
    pack: "viaje",
    path: "/dni/paginas-clon-cita",
    h1: "Páginas clon de la cita del DNI: cómo evitarlas",
    title: "Páginas clon de la cita del DNI: cómo evitarlas",
    description:
      "Cómo distinguir la web oficial de la cita (citapreviadnie.es) de los clones que cobran, cómo reclamar lo pagado y qué hacer si ya diste tus datos.",
    lead:
      "La única web oficial para la cita de DNI y pasaporte es citapreviadnie.es, enlazada desde interior.gob.es; el teléfono oficial es el 060. Las páginas que cobran por gestionar la cita son clones: la cita es gratuita. Comprueba el dominio exacto antes de teclear tus datos.",
    cta: { href: CITA_DNI_URL, label: "Portal oficial (gratuito)" },
    related: relatedDni,
    sections: [
      {
        id: "detectar",
        title: "Cómo se detecta un clon",
        paragraphs: [
          "El clon imita colores y formularios del portal oficial, pero el dominio no es exactamente citapreviadnie.es: añade guiones, palabras como gestion o cita, o termina en .com cuando el oficial es .es. Segunda señal inequívoca: pide pago por adelantado (tarjeta, transferencia o Bizum). La cita oficial no cuesta nada; solo pagas la tasa del documento al recogerlo (DNI 12 €, pasaporte 30 €).",
        ],
        lists: [
          [
            "Dominio exacto: citapreviadnie.es, sin adornos. Si dudas, entra desde interior.gob.es o llama al 060.",
            "Pago previo = clon. La cita es gratuita, siempre.",
            "Ojo también con los SMS y correos que anuncian huecos a cambio de suscripción: son el mismo negocio.",
          ],
        ],
      },
      {
        id: "reclamar",
        title: "Si ya pagaste: cómo reclamar",
        paragraphs: [
          "Primero, comprueba si la cita que te dieron existe de verdad en el portal oficial (consulta o anulación de cita). Después, reclama el pago a tu banco alegando servicio no solicitado o publicidad engañosa: los bancos pueden revertir cargos por servicios no prestados. Denuncia la web en la Oficina Virtual de Denuncias de la Policía o personándote en comisaría: estas webs operan a escala y cada denuncia cuenta. Si además entregaste copia de tu DNI o pasaporte al clon, vigila movimientos y considera el aviso a tu banco.",
        ],
      },
      {
        id: "bots",
        title: "Y los bots de Telegram",
        paragraphs: [
          "Comprueba la disponibilidad directamente en el portal oficial o consulta el 060. Esta guía no acredita un horario de publicación de citas ni valida servicios externos de alertas o reserva.",
        ],
      },
    ],
  },
  {
    id: "urgente-sin-cita",
    reviewedAt: "2026-09-07",
    sources: [
      { href: "https://www.boe.es/eli/es/rd/2025/04/01/255", label: "BOE: expedición excepcional del DNI, artículo 6" },
      { href: "https://www.aena.es/es/adolfo-suarez-madrid-barajas/servicios-del-aeropuerto/categorias-y-terminales/seguridad.html", label: "Aena: Policía y pasaportes de emergencia en Madrid" },
    ],
    pack: "viaje",
    path: "/dni/urgente-sin-cita",
    h1: "DNI urgente sin cita: qué puedes consultar",
    title: "DNI urgente sin cita: unidades de documentación y límites",
    description:
      "Consulta citas y atención excepcional para DNI. Un viaje próximo no garantiza expedición inmediata ni un cupo de urgencia.",
    lead: `Consulta la disponibilidad en citapreviadnie.es o en el ${TELEFONO_CITA}. La norma permite expedir el DNI excepcionalmente sin cita, pero no garantiza atención inmediata por presentar un billete. Explica tu situación a la unidad de documentación y confirma cómo proceder.`,
    cta: { href: CITA_DNI_URL, label: "Buscar hueco (oficial)" },
    related: relatedDni,
    sections: [
      {
        id: "vias",
        title: "Consultar disponibilidad y atención excepcional",
        paragraphs: [
          "Comprueba otras oficinas y fechas en el portal oficial. No hay en las fuentes consultadas una hora nacional de liberación de citas ni un cupo oculto garantizado por teléfono. El artículo 6 del Real Decreto 255/2025 contempla atención excepcional sin cita, vinculada a los recursos disponibles.",
        ],
      },
      {
        id: "aeropuerto",
        title: "Pasaporte de emergencia y DNI son servicios distintos",
        paragraphs: [
          "Aena informa de pasaportes de emergencia en la oficina policial de la T4 de Madrid-Barajas y exige presentar el pasaje y la documentación correspondiente. También describe puntos de actualización del DNI electrónico en T1 y T4. Actualizar el chip no equivale a renovar el documento físico: no presupongas que una oficina de aeropuerto expide DNI por disponer de Policía o de un punto de actualización.",
        ],
      },
      {
        id: "credito",
        title: "Mientras tanto, qué documenta tu urgencia",
        paragraphs: [
          "Prepara el billete y los documentos de tu caso para explicar la urgencia. Un resguardo de cita no sustituye un documento de viaje válido. Antes de desplazarte, confirma el servicio, sus condiciones y la documentación exigida; esta guía no garantiza resolverlo en 24 o 48 horas.",
        ],
      },
    ],
  },
  {
    id: "perdido-volar",
    pack: "viaje",
    path: "/dni/perdido-volar",
    h1: "He perdido el DNI y vuelo mañana: qué hacer",
    title: "DNI perdido antes de volar: documentos y pasos",
    description:
      "Qué revisar si pierdes el DNI antes de volar: documentos para vuelos nacionales e internacionales y por qué la denuncia no acredita tu identidad para embarcar.",
    lead:
      "Si has perdido el DNI, comprueba qué otro documento válido tienes para tu trayecto y contacta con la aerolínea. La denuncia de pérdida o robo no acredita por sí misma tu identidad para embarcar. Esta guía se dirige a personas de nacionalidad española.",
    cta: { href: CITA_DNI_URL, label: "Reponer el DNI (cita oficial)" },
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Aena: documentación para viajar", href: "https://www.aena.es/es/pasajeros/documentacion-visados/documentacion-para-viajar.html" },
      { label: "BOE: Programa Nacional de Seguridad para la Aviación Civil (2026)", href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2026-814" },
      { label: "BOE: pasaporte provisional y salvoconducto", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24098" },
    ],
    related: [
      { href: "/pasaporte/salvoconducto", label: "Salvoconducto (en el extranjero)" },
      { href: "/dni/checklist", label: "Lista de comprobación del DNI" },
      ...relatedDni.slice(0, 2),
    ],
    sections: [
      {
        id: "hora-a-hora",
        title: "Comprueba los documentos de tu trayecto",
        paragraphs: ["La compañía comprueba la documentación de viaje. Indícale tu nacionalidad, edad, destino y escalas al consultar tu caso."],
        lists: [
          [
            "Dentro de España: Aena recoge DNI o pasaporte no necesariamente en vigor para pasajeros españoles mayores de 14 años. También indica el permiso de conducir expedido en España; confirma su aceptación con la aerolínea.",
            "Hacia un país Schengen: para pasajeros españoles, Aena indica DNI o pasaporte en vigor. Si has perdido el DNI y conservas un pasaporte válido, comprueba que cumple los requisitos del viaje.",
            "Otros destinos: consulta las condiciones del país, incluidas escalas, visados y vigencia del pasaporte. Estar fuera de Schengen no significa automáticamente que el DNI esté excluido en todos los países.",
          ],
        ],
      },
      {
        id: "denuncia",
        title: "La denuncia no es un documento de embarque",
        paragraphs: [
          "El Programa Nacional de Seguridad para la Aviación Civil establece que la denuncia no acredita la identidad del pasajero. Contempla que un agente de las fuerzas de seguridad pueda acreditarla para verificar la identidad en la puerta de embarque de un vuelo nacional. Esa posibilidad no convierte la denuncia en documento de viaje ni garantiza que puedas volar: consulta con la compañía y la Policía del aeropuerto.",
        ],
      },
      {
        id: "que-no",
        title: "Si no tienes documentación válida",
        paragraphs: [
          "Contacta con la Policía para consultar cómo reponer el documento y con la compañía para conocer tus opciones respecto al vuelo. Esta guía no puede garantizar una expedición urgente ni el embarque.",
          "Si estás en el extranjero, consulta con la oficina consular española. Según las circunstancias, puede tramitar documentación de viaje; el salvoconducto está previsto para el regreso a España, no como sustituto general del pasaporte para continuar unas vacaciones.",
        ],
      },
    ],
  },
  {
    id: "caducado-multa",
    pack: "viaje",
    path: "/dni/caducado-multa",
    h1: "Multa por DNI caducado: cuándo te la ponen",
    title: "Multa por DNI caducado: cuándo te la ponen",
    description:
      "Llevar el DNI caducado no se multa por sí solo; lo que se sanciona es negarte a identificarte ante la Policía: de 601 a 30.000 € (LO 4/2015). Cifras y matices.",
    lead:
      "Llevar el DNI caducado no se multa por sí solo, pero equivale a ir sin documento: si la Policía te requiere y no te identificas, la sanción por desobediencia va de 601 a 30.000 euros. Perderlo o estropearlo de forma reiterada: 100 a 600 euros. Renovarlo cuesta 12 euros.",
    cta: { href: CITA_DNI_URL, label: "Pedir cita para renovar" },
    related: relatedDni,
    sections: [
      {
        id: "cifras",
        title: "Las cifras, sin mitos",
        paragraphs: [
          "La Ley Orgánica 4/2015 de protección de la seguridad ciudadana, artículo 36.6, sanciona como infracción grave la negativa a colaborar o la resistencia a la identificación: multa de 601 a 30.000 euros. La pérdida o deterioro reiterado del documento se sanciona entre 100 y 600 euros. Pero la caducidad en sí no está tipificada como infracción: no existe la multa automática por llevar el DNI vencido. El problema real es práctico: bancos, notarías, aerolíneas y fronteras.",
        ],
      },
      {
        id: "practica",
        title: "Lo que te vas a encontrar de verdad",
        paragraphs: [
          "El banco puede bloquear la operativa mientras tu DNI conste caducado (normativa antilavado). En vuelos nacionales, varias aerolíneas aceptan el DNI caducado; para cruzar una frontera, comprueba el documento y las reglas del destino porque no debes darlo por válido. Y para casi todo contrato te pedirán documento en vigor. Renovar sale más barato que cualquier multa: la tasa es de 12 euros y se puede pedir cita dentro de los 180 días previos a la caducidad.",
        ],
        lists: [["Tasa de renovación del DNI: 12 € (2026).", "Pasaporte: 30 €.", "La cita: gratuita, solo en citapreviadnie.es."]],
      },
      {
        id: "renovar",
        title: "La opción más segura: renovar",
        paragraphs: [
          "La renovación con DNI caducado existe, no lleva recargo y usa el mismo circuito que cualquier renovación: cita en citapreviadnie.es, foto reciente, el documento anterior y la tasa. Puedes renovar en cualquier oficina de expedición del territorio nacional, no necesariamente en tu provincia, lo que en épocas de atasco abre el abanico de municipios cercanos. Si la caducidad coincide con un viaje inminente, la guía de DNI urgente sin cita explica los límites de la atención excepcional y cómo consultar a la unidad de documentación.",
          "Un último apunte de convivencia: la sanción por negativa a identificarse se aplica por la conducta (desatender el requerimiento policial), no por el papel vencido. Identificarte por cualquier vía válida aunque el DNI esté caducado (pasaporte, comprobación en el acto) cierra el episodio sin multa. El marco legal está en la Ley Orgánica 4/2015; el sentido común, en renovar en los 180 días previos y ahorrarse la conversación.",
        ],
      },
    ],
  },
  {
    id: "caducado-banco",
    pack: "viaje",
    path: "/dni/caducado-banco",
    h1: "DNI caducado en el banco: te pueden bloquear",
    title: "El banco y el DNI caducado: qué hacer",
    description:
      "CaixaBank, BBVA y demás entidades pueden limitar la operativa si tu DNI consta caducado (antiblanqueo). Cómo evitarlo y qué aceptan mientras renovas.",
    lead:
      "Tu banco puede bloquear la operativa si el DNI consta caducado: la normativa antilavado le obliga a tener tus datos actualizados. CaixaBank y BBVA suelen avisar antes por la app. Pide cita ya y guarda el resguardo: algunas entidades lo aceptan temporalmente.",
    cta: { href: CITA_DNI_URL, label: "Pedir cita (oficial)" },
    related: relatedDni,
    sections: [
      {
        id: "porque",
        title: "Por qué te lo hacen",
        paragraphs: [
          "Las entidades de crédito están obligadas a mantener identificación vigente de sus clientes (prevención de blanqueo de capitales). Cuando tu DNI vence, dejan de tener un documento válido y reaccionan limitando operaciones: desde la contratación online hasta movimientos sensibles. No es un castigo: es cumplimiento. Pero te afecta igual.",
        ],
      },
      {
        id: "plan",
        title: "El plan en tres pasos",
        paragraphs: [
          "Primero, acepta el aviso de la app o del correo oficial y comprueba la fecha límite que te dan (suelen dar semanas, no días). Segundo, pide cita en citapreviadnie.es: recuerda que puedes renovar dentro de los 180 días previos a la caducidad, así que el bloqueo es casi siempre evitable con un mínimo de antelación. Tercero, si la cita te queda lejos, pregunta en tu oficina si aceptan el resguardo de solicitud mientras llega el nuevo DNI: algunas entidades lo admiten como documento en trámite.",
        ],
      },
      {
        id: "ya-bloqueado",
        title: "Si ya te han bloqueado",
        paragraphs: [
          "Con la cita pedida y el justificante en la mano, la oficina puede reactivar la operativa o al menos las gestiones básicas. Si no ceden, pide la hoja de reclamaciones y presenta queja por servicio: el bloqueo es legal, pero la entidad debe documentar el motivo y ofrecer cauce. La renovación del DNI cuesta 12 euros; la del pasaporte, 30.",
        ],
      },
    ],
  },
  {
    id: "caducado-vueling",
    reviewedAt: "2026-09-07",
    sources: [{ href: "https://help.vueling.com/hc/es/articles/19798843861393-Documentaci%C3%B3n-para-viajar", label: "Vueling: documentación según nacionalidad y destino" }],
    pack: "viaje",
    path: "/dni/caducado-vueling",
    h1: "¿Vueling acepta el DNI caducado?",
    title: "Vueling con DNI caducado: cuándo te deja volar",
    description:
      "Documentación de Vueling para españoles: vuelos nacionales, DNI físico para Schengen y excepciones publicadas para pasaportes caducados.",
    lead:
      "Para pasajeros de nacionalidad española, Vueling admite DNI o pasaporte caducados en vuelos dentro de España. Para Schengen pide DNI físico o pasaporte vigente y publica excepciones concretas para pasaportes caducados. No confundas esas excepciones con una aceptación general del DNI caducado en el extranjero.",
    cta: { href: CITA_DNI_URL, label: "Renovar antes de volar" },
    related: relatedDni,
    sections: [
      {
        id: "regla",
        title: "La regla por tipo de vuelo",
        paragraphs: [
          "Consulta la tabla de tu nacionalidad y destino en la ayuda oficial. Las condiciones resumidas aquí corresponden a españoles y no deben aplicarse a todas las nacionalidades.",
        ],
        lists: [
          [
            "Dentro de España: la tabla admite DNI o pasaporte caducados y carné de conducir físico expedido en España.",
            "Schengen: DNI físico o pasaporte vigente. Vueling enumera destinos que admiten pasaporte español caducado hasta cinco años; comprueba la lista y tu trayecto concreto.",
            "Fuera de Schengen: consulta el documento y, si procede, visado exigidos. Vueling recoge expresamente la alternativa de DNI vigente para Irlanda.",
          ],
        ],
      },
      {
        id: "practico",
        title: "Antes de arriesgarte",
        paragraphs: [
          "Comprueba también los requisitos de entrada y tránsito de tu itinerario. Si necesitas renovar, consulta una unidad de documentación: disponer de un billete no garantiza una expedición urgente.",
        ],
      },
      {
        id: "otras",
        title: "Y las otras aerolíneas",
        paragraphs: [
          "Esta revisión corresponde a Vueling. Si opera otra compañía, consulta su documentación publicada y las condiciones de cada tramo.",
        ],
      },
    ],
  },
  {
    id: "pasaporte-bebe",
    reviewedAt: "2026-09-07",
    sources: [
      { href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/", label: "Interior: expedición y consentimiento" },
      { href: "https://www.boe.es/eli/es/rd/2003/07/11/896/con", label: "BOE: requisitos y validez del pasaporte" },
      { href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/index.html", label: "Interior: tasa y exención" },
    ],
    pack: "viaje",
    path: "/pasaporte/bebe",
    h1: "Pasaporte para bebés: requisitos y cita previa",
    title: "Pasaporte para bebés: requisitos y cita",
    description:
      "Sacar el pasaporte a un bebé: validez por edades, quién debe acompañar, la foto, la cita y la tasa de 30 €. La vía oficial, paso a paso.",
    lead:
      "Para solicitar un pasaporte español a un bebé en una unidad de documentación en España, reserva cita a su nombre en citapreviadnie.es. Debe acudir personalmente y contar con el consentimiento de quienes ejercen la patria potestad o tutela. No necesita obtener antes un DNI si aún no está obligado a tenerlo.",
    cta: { href: CITA_DNI_URL, label: "Pedir cita (oficial)" },
    secondaryCta: { href: "/dni/primera-expedicion-menor", label: "DNI del menor" },
    related: relatedPas,
    sections: [
      {
        id: "validez",
        title: "Cuánto dura según la edad",
        paragraphs: [
          "La validez ordinaria es de dos años antes de cumplir cinco, cinco años desde los cinco hasta antes de cumplir treinta, y diez años desde los treinta. Puede limitarse en los supuestos previstos por la norma. Comprueba la fecha impresa y los requisitos de entrada del destino antes de viajar.",
        ],
      },
      {
        id: "quien",
        title: "Quién va a la cita (y con qué)",
        paragraphs: ["El bebé debe estar presente. Prepara los documentos correspondientes a su situación:"],
        lists: [
          [
            "Si tiene DNI, llévalo en vigor. Si no lo tiene por no estar obligado, certificación literal de nacimiento de los últimos seis meses emitida para pasaporte; la mención de finalidad no se exige en certificados DICIREG con código personal.",
            "Si renuevas un pasaporte expedido por la Policía para el que ya aportaste esa certificación, Interior permite presentar el pasaporte anterior en su lugar. Esta opción no se aplica a pasaportes expedidos por consulados.",
            "Documentos vigentes de identidad de quienes prestan el consentimiento y prueba oficial del parentesco o tutela. El libro de familia puede acreditar el parentesco; no sustituye automáticamente la certificación de nacimiento.",
            "Foto reciente de 32 × 26 mm, de frente, con fondo blanco y el rostro visible. No se exige otra foto si obtuvo o renovó el DNI ese mismo día.",
            "Tasa de 30 €, salvo exención por familia numerosa acreditada. Interior permite pago en efectivo, con tarjeta en la unidad o mediante el pago telemático oficial.",
          ],
        ],
      },
      {
        id: "consentimiento",
        title: "Si uno de los representantes no puede acudir",
        paragraphs: [
          "El consentimiento corresponde a todas las personas que ejercen la patria potestad o tutela, no solo a quien tiene la custodia. Pueden formalizarlo por separado ante las unidades de documentación. Consulta previamente cómo dejarlo acreditado si acudirán en momentos o unidades distintos.",
          "También existen vías notariales y consulares; si falta el consentimiento exigido, puede ser necesaria autorización judicial. Revisa los requisitos oficiales para tu situación. La autorización para que un menor viaje al extranjero es un trámite diferente.",
        ],
      },
      {
        id: "cita",
        title: "Reservar la cita",
        paragraphs: [
          "Utiliza citapreviadnie.es o el 060 y comprueba que la reserva incluye al bebé como solicitante. Si también necesitas tramitar tu documento, confirma que ambos trámites están reservados. La reserva es gratuita; llamar al 060 tiene coste.",
        ],
      },
    ],
  },
  {
    id: "salvoconducto",
    pack: "viaje",
    path: "/pasaporte/salvoconducto",
    h1: "Salvoconducto español: cómo pedirlo en el consulado",
    title: "Salvoconducto: volver a España sin pasaporte",
    description:
      "Pierdes el pasaporte en el extranjero y tienes que volver: denuncia, consulado de España y salvoconducto (documento de viaje único de regreso). Requisitos reales.",
    lead:
      "El salvoconducto es el documento de viaje que expide el consulado de España para un regreso concreto cuando has perdido o te han robado el pasaporte en el extranjero. Es individual, intransferible y gratuito. Primero denuncia, luego consulado.",
    cta: { href: "https://www.exteriores.gob.es/", label: "Ministerio de Exteriores (consulados)" },
    related: [
      { href: "/dni/perdido-volar", label: "Perder el DNI y volar" },
      { href: "/pasaporte/urgente", label: "Pasaporte urgente" },
      ...relatedPas.slice(0, 2),
    ],
    sections: [
      {
        id: "pasos",
        title: "Los tres pasos, en orden",
        paragraphs: [
          "Uno: denuncia ante la policía local del país donde estés (o la comisaría española si estás en España antes de un vuelo de conexión: ahí la solución es otra). Dos: cita o presencia en el consulado u embajada de España más cercana, con la denuncia, dos fotos tipo carnet y tu DNI si lo conservas. Tres: el consulado valora tu caso y expide el salvoconducto para el viaje de regreso, o directamente un pasaporte ordinario si el plazo lo permite.",
        ],
      },
      {
        id: "limites",
        title: "Qué es y qué no es",
        paragraphs: [
          "El salvoconducto sirve para volver a España en una fecha e itinerario concretos: no sirve para seguir viajando, no es renovable y no lo recibes si el consulado comprueba que puedes obtener pasaporte a tiempo. Es gratuito. Y ojo: el DNI no se expide en el extranjero, así que si perdiste el DNI (no el pasaporte), la vía consular es la misma: pasaporte para volver y renovación del DNI al llegar.",
        ],
      },
      {
        id: "prevencion",
        title: "Antes de viajar: la prevención que ahorra el trámite",
        paragraphs: [
          "La causa número uno de salvoconductos es la vigencia olvidada: muchos países exigen al pasaporte seis meses de validez restante a la entrada, y la gente descubre la regla en el mostrador de embarque. La guía de con cuánta antelación renovar el pasaporte resume la regla y los destinos más exigentes. La segunda causa es el robo en destino: una fotocopia del pasaporte guardada separada del original (o una foto en el móvil con la página de datos legible) acelera mucho la gestión consular, porque identifica el número de documento en el primer trámite.",
          "Con el documento a salvo, el salvoconducto casi nunca es necesario: es el paracaídas del viajero, no un trámite rutinario. Si tu consulado ofrece cita electrónica, pídela nada más descubrir la pérdida: en temporada alta (julio, agosto y Navidad) las agendas consulares se comportan como las de las comisarías españolas, y el billete de vuelta no espera al número de la sala.",
        ],
      },
    ],
  },
  {
    id: "renovar-antes",
    pack: "viaje",
    path: "/pasaporte/renovar-antes-caducar",
    h1: "Renovar el pasaporte antes de que caduque",
    title: "Con cuánta antelación renovar el pasaporte",
    description:
      "Cuándo conviene renovar el pasaporte antes de su caducidad, la regla de los 6 meses de validez del destino y qué pasa con la validez restante. Tasa 30 €.",
    lead:
      "Puedes renovar el pasaporte en cualquier momento, y la Policía recomienda hacerlo con margen: muchas webs aconsejan hasta seis meses antes de caducar porque buena parte del mundo exige al menos seis meses de validez restante a la entrada. Al renovar, la validez anterior no se suma.",
    cta: { href: CITA_DNI_URL, label: "Pedir cita (oficial)" },
    related: relatedPas,
    sections: [
      {
        id: "regla",
        title: "La regla que de verdad importa: la del destino",
        paragraphs: [
          "España no te exige renovar con antelación mínima; el requisito de seis meses lo ponen los países de destino (y a veces la aerolínea al embarcarte). Con un pasaporte que caduca en cinco meses puedes volar a muchos sitios de la UE, pero quedarte en tierra con destino a buena parte de Asia o América. Antes de reservar, comprueba la validez exigida en la web del consulado o embajada del país, o en la información oficial de viaje del Ministerio de Exteriores.",
        ],
      },
      {
        id: "practico",
        title: "Detalles prácticos de la renovación",
        paragraphs: [
          "La renovación es igual que la expedición: cita en citapreviadnie.es, foto reciente, el pasaporte anterior y 30 euros de tasa. La validez restante del documento anterior se pierde (no se acumula). Si viajas en noviembre-diciembre, recuerda que es la temporada en la que las citas se agotan antes: con dos meses de margen no sueles tener problema; con dos semanas, revisa la disponibilidad real y las instrucciones de Interior; esta guía no presupone un cupo especial ni atención en aeropuerto.",
        ],
      },
      {
        id: "calendario",
        title: "El calendario del viajero organizado",
        paragraphs: [
          "Un cuadro mental que evita sustos: pasaporte con más de seis meses de validez, viajas casi a cualquier destino sin mirar nada; entre seis y tres meses, comprueba el requisito del país en fuentes oficiales antes de reservar; menos de tres meses con viaje extra-Schengen previsto, renueva ya. Dentro de la UE y con DNI en vigor, el pasaporte ni siquiera es necesario en la mayoría de trayectos: la combinación DNI vigente para Europa y pasaporte para el resto reparte el desgaste de los dos documentos.",
          "Y una nota sobre menores: sus pasaportes caducan antes (dos o cinco años según la edad), así que la regla de los seis meses les pilla más a menudo. Si el viaje familiar es a un destino exigente, revisa primero los pasaportes de los peques: son los que suelen derribar la reserva en el mostrador. La guía del pasaporte para bebés detalla validez por edades y quién debe acompañar a la cita.",
        ],
      },
    ],
  },
];
