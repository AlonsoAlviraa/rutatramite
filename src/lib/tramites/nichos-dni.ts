import {
  CITA_DNI_HOST,
  CITA_DNI_URL,
  SNAPSHOT_ESPERAS,
  TASA_DNI_LABEL,
  TASA_PASAPORTE_LABEL,
  TELEFONO_CITA,
  PASAPORTE_RENOVACION_MESES,
  DOCUMENT_PAYMENT_NOTE,
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
    reviewedAt: "2026-09-14",
    sources: [{ href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/", label: "Interior: tasa y pago oficial del DNI" }, { href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/", label: "Interior: canales oficiales de cita" }],
    pack: "viaje",
    path: "/dni/paginas-clon-cita",
    h1: "Páginas clon de la cita del DNI: cómo evitarlas",
    title: "Páginas clon de la cita del DNI: cómo evitarlas",
    description:
      "Cómo distinguir la web oficial de la cita (citapreviadnie.es) de los clones que cobran, cómo reclamar lo pagado y qué hacer si ya diste tus datos.",
    lead:
      "Reserva en citapreviadnie.es, enlazada desde Interior, o consulta el 060. La reserva es gratuita, pero la tasa del documento puede pagarse anticipadamente en el portal oficial. Un intermediario de pago no es la Administración; que cobre no demuestra por sí solo una suplantación. Comprueba el dominio, quién presta el servicio y qué concepto te cobran.",
    cta: { href: CITA_DNI_URL, label: "Portal oficial (gratuito)" },
    related: relatedDni,
    sections: [
      {
        id: "detectar",
        title: "Cómo se detecta un clon",
        paragraphs: [
          "Una página que imita a la Administración puede utilizar un dominio parecido. Accede desde Interior y comprueba el destino antes de introducir datos. Distingue la reserva de cita, que es gratuita, de la tasa de expedición y de un servicio privado de intermediación. La apariencia de la página o el momento del pago no bastan para determinar su legitimidad.",
          DOCUMENT_PAYMENT_NOTE,
        ],
        lists: [
          [
            "Dominio exacto: citapreviadnie.es, sin adornos. Si dudas, entra desde interior.gob.es o llama al 060.",
            "Comprueba el concepto: reservar cita es gratuito; la tasa del documento admite pago telemático oficial.",
            "Ojo también con los SMS y correos que anuncian huecos a cambio de suscripción: son el mismo negocio.",
          ],
        ],
      },
      {
        id: "reclamar",
        title: "Si ya pagaste: cómo reclamar",
        paragraphs: [
          "Conserva la página, las condiciones del servicio y el justificante de pago. Comprueba la reserva en el portal oficial. Si el cargo no fue autorizado o el servicio no coincide con lo contratado, explica los hechos reales a tu banco y consulta cómo reclamar; no se garantiza una devolución. Si sospechas una suplantación o has entregado documentos a una web fraudulenta, contacta con la Policía y con tu banco para valorar las medidas pertinentes.",
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
    reviewedAt: "2026-09-14",
    sources: [{ href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-3442", label: "BOE: identificación e infracciones, artículos 16, 36, 37 y 39" }],
    pack: "viaje",
    path: "/dni/caducado-multa",
    h1: "Multa por DNI caducado: cuándo te la ponen",
    title: "Multa por DNI caducado: cuándo te la ponen",
    description:
      "Llevar el DNI caducado no se multa por sí solo; lo que se sanciona es negarte a identificarte ante la Policía: de 601 a 30.000 € (LO 4/2015). Cifras y matices.",
    lead:
      "La caducidad del DNI no equivale por sí misma a negarse a una identificación policial. La Ley Orgánica 4/2015 distingue las comprobaciones de identidad de conductas sancionables como la negativa a identificarse o aportar datos falsos. Si recibes una propuesta de sanción, revisa los hechos y el artículo concreto que cita.",
    cta: { href: CITA_DNI_URL, label: "Pedir cita para renovar" },
    related: relatedDni,
    sections: [
      {
        id: "cifras",
        title: "Las cifras, sin mitos",
        paragraphs: [
          "El artículo 36.6 recoge la negativa a identificarse a requerimiento de la autoridad y aportar datos falsos o inexactos, entre otras conductas. El artículo 39 establece multas de 601 a 30.000 euros para las infracciones graves. El artículo 37.11 considera negligencia en la custodia la tercera y posteriores pérdidas o extravíos en un año; las infracciones leves se sancionan con 100 a 600 euros. No se aplica esa regla automáticamente a cualquier pérdida, deterioro o documento caducado.",
        ],
      },
      {
        id: "practica",
        title: "Lo que te vas a encontrar de verdad",
        paragraphs: [
          "Comprueba los documentos aceptados en cada trámite y trayecto. Para problemas con una cuenta bancaria, consulta la guía específica: la caducidad no justifica por sí sola cualquier restricción. La renovación ordinaria del DNI puede solicitarse dentro de sus últimos 180 días de vigencia; revisa la tasa y las exenciones de tu caso.",
        ],
        lists: [["Tasa de renovación del DNI: 12 € (2026).", "Pasaporte: 30 €.", "La cita: gratuita, solo en citapreviadnie.es."]],
      },
      {
        id: "renovar",
        title: "La opción más segura: renovar",
        paragraphs: [
          "La renovación con DNI caducado existe, no lleva recargo y usa el mismo circuito que cualquier renovación: cita en citapreviadnie.es, foto reciente, el documento anterior y la tasa. Puedes renovar en cualquier oficina de expedición del territorio nacional, no necesariamente en tu provincia, lo que en épocas de atasco abre el abanico de municipios cercanos. Si la caducidad coincide con un viaje inminente, la guía de DNI urgente sin cita explica los límites de la atención excepcional y cómo consultar a la unidad de documentación.",
          "El artículo 16 permite comprobar la identidad por distintos medios en los supuestos legales. Colabora con el requerimiento y explica qué documentación tienes. Esta guía no puede garantizar el resultado de una actuación policial ni sustituye la revisión de una notificación concreta y sus plazos de alegación.",
        ],
      },
    ],
  },
  {
    id: "caducado-banco",
    reviewedAt: "2026-09-14",
    sources: [{ href: "https://clientebancario.bde.es/pcb/en/menu-horizontal/podemosayudarte/criterios/medidas-restrictivas-por-falta-de-documentacion-e-informacion.html", label: "Banco de España: proporcionalidad de las restricciones y DNI caducado" }, { href: "https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/cuentasdepositos/cuentascorriente/guia-textual/vidacuenta/Bloqueo_de_la_cuenta.html", label: "Banco de España: causas del bloqueo de cuentas" }],
    pack: "viaje",
    path: "/dni/caducado-banco",
    h1: "DNI caducado en el banco: actualización y límites del bloqueo",
    title: "El banco y el DNI caducado: qué hacer",
    description:
      "Qué comprobar si el banco solicita renovar tu identificación. El Banco de España distingue la caducidad del DNI de otras causas de restricción.",
    lead:
      "Atiende las solicitudes de actualización de identidad de tu banco y pide que te expliquen cualquier restricción. El Banco de España considera desproporcionado restringir la operativa solo por un DNI caducado, salvo razones justificadas, como no poder acreditar la identidad del cliente. La respuesta depende de los hechos y de la documentación solicitada.",
    cta: { href: CITA_DNI_URL, label: "Pedir cita (oficial)" },
    related: relatedDni,
    sections: [
      {
        id: "porque",
        title: "Por qué te lo hacen",
        paragraphs: [
          "El banco debe identificar a sus clientes y puede solicitar información para cumplir sus obligaciones de prevención de blanqueo. Desatender reiteradamente los requerimientos puede justificar restricciones, que deben valorarse con proporcionalidad. La caducidad por sí sola no equivale a incumplir todas esas obligaciones ni convierte en correcto cualquier bloqueo.",
        ],
      },
      {
        id: "plan",
        title: "El plan en tres pasos",
        paragraphs: [
          "Accede por la aplicación o web habitual del banco y verifica el requerimiento. Anota qué documento solicita, el plazo y el canal seguro de entrega. Pide cita para renovar el DNI y consulta a la entidad qué alternativa admite mientras tanto. Un resguardo de cita no garantiza que se levante una restricción.",
        ],
      },
      {
        id: "ya-bloqueado",
        title: "Si ya te han bloqueado",
        paragraphs: [
          "Pide una explicación del motivo, de las operaciones afectadas y de cómo subsanar lo requerido. Conserva las comunicaciones y los justificantes de entrega. Si discrepas, consulta el servicio de atención al cliente de la entidad y los cauces de reclamación del Banco de España. No presupongas que toda restricción es correcta o que presentar un resguardo resuelve cualquier causa.",
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
      "Si estás en el extranjero sin documentación y necesitas regresar urgentemente a España, contacta con el consulado competente. Puede valorar la expedición de un salvoconducto para ese viaje. Es gratuito; la expedición y el itinerario deben confirmarse con la oficina consular.",
    reviewedAt: "2026-09-14",
    sources: [
      { label: "BOE: expedición del salvoconducto", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24098" },
      { label: "Administración: documentación perdida en el extranjero", href: "https://administracion.gob.es/pag_Home/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/viajes/documentos/pasaportes-perdidos.html" },
    ],
    cta: { href: "https://www.exteriores.gob.es/", label: "Ministerio de Exteriores (consulados)" },
    related: [
      { href: "/dni/perdido-volar", label: "Perder el DNI y volar" },
      { href: "/pasaporte/urgente", label: "Pasaporte urgente" },
      ...relatedPas.slice(0, 2),
    ],
    sections: [
      {
        id: "pasos",
        title: "Contactar y preparar la solicitud",
        paragraphs: [
          "Comunica la pérdida o sustracción al consulado español competente y pregunta cómo presentar la solicitud. La denuncia ante la policía local es recomendable para dejar constancia de lo ocurrido. Prepara los documentos o copias que permitan comprobar tu identidad y nacionalidad, junto con los datos del viaje urgente. Confirma con esa oficina la fotografía y los demás documentos que requiere: no presupongas que todas las oficinas piden dos fotos ni que la entrega será inmediata.",
        ],
      },
      {
        id: "limites",
        title: "Qué es y qué no es",
        paragraphs: [
          "Para una persona española sin documentación, esta vía atiende el regreso urgente a España. No sustituye un pasaporte para continuar cualquier itinerario. Consulta con el consulado y la compañía las condiciones del trayecto, incluidas las escalas, y sigue las instrucciones de entrega del documento al regresar. El DNI se tramita en España; perderlo en el extranjero no implica que siempre necesites un nuevo pasaporte si conservas otro documento de viaje válido.",
        ],
      },
      {
        id: "prevencion",
        title: "Antes de viajar: la prevención que ahorra el trámite",
        paragraphs: [
          "Antes de viajar, comprueba la vigencia y los requisitos documentales del destino y del tránsito. Si pierdes el pasaporte o te lo roban, contacta con el consulado español competente para conocer la documentación y las opciones de regreso que corresponden a tu caso.",
          "Una copia puede ayudar a identificar el documento perdido, pero no sustituye el original ni garantiza una expedición inmediata. Sigue el procedimiento del consulado y confirma cómo puede afectar a tu itinerario.",
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
      `Puedes solicitar un nuevo pasaporte con la validez ordinaria cuando el anterior está en sus últimos ${PASAPORTE_RENOVACION_MESES} meses de vigencia. Existen supuestos excepcionales que deben acreditarse. Antes de viajar, comprueba los requisitos del destino y de los países de tránsito.`,
    reviewedAt: "2026-09-14",
    sources: [
      { label: "Interior: validez, renovación y sustitución del pasaporte", href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/validez/" },
      { label: "BOE: pago telemático de las tasas", href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2017-1206" },
      { label: "Exteriores: recomendaciones de viaje por país", href: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Recomendaciones-de-viaje.aspx" },
    ],
    cta: { href: CITA_DNI_URL, label: "Pedir cita (oficial)" },
    related: relatedPas,
    sections: [
      {
        id: "regla",
        title: "La regla que de verdad importa: la del destino",
        paragraphs: [
          "La validez exigida para entrar en otro país depende del destino y de tu situación. Comprueba también el tránsito en la información oficial de Exteriores y de las autoridades de destino. No hay una regla de seis meses que permita resolver todos los itinerarios.",
        ],
      },
      {
        id: "practico",
        title: "Detalles prácticos de la renovación",
        paragraphs: [
          `Consulta la documentación exigida para tu edad y situación, conserva el pasaporte anterior y comprueba la tasa y sus exenciones. ${DOCUMENT_PAYMENT_NOTE} La disponibilidad depende de la oficina; esta guía no garantiza citas con una antelación concreta.`,
        ],
      },
      {
        id: "calendario",
        title: "El calendario del viajero organizado",
        paragraphs: [
          "Tener más de seis meses de vigencia no acredita que cumplas todos los requisitos de entrada. Revisa visado o autorización electrónica, nacionalidad, motivo del viaje y tránsito en las fuentes del destino. Interior contempla una nueva expedición excepcional cuando las exigencias de validez del país se justifican; aporta los documentos que acrediten tu caso.",
          "Revisa el documento de cada menor por separado. La validez ordinaria del pasaporte es de dos años para menores de cinco años y de cinco años desde los cinco hasta antes de cumplir treinta. Consulta la documentación y los consentimientos necesarios antes de reservar la cita.",
        ],
      },
    ],
  },
];
