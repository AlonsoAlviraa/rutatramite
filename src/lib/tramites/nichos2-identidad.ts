import {
  CITA_DNI_HOST,
  CITA_DNI_URL,
  SEDE_AAPP_URL,
  TASA_DNI_LABEL,
  TASA_PASAPORTE_LABEL,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

const relatedDniNichos2 = [
  { href: "/dni/cita-previa", label: "Cita previa del DNI, la oficial" },
  { href: "/dni/no-hay-citas", label: "No hay citas para el DNI" },
  { href: "/dni/paginas-clon-cita", label: "Páginas clon de la cita" },
];

const relatedExNichos2 = [
  { href: "/extranjeria/cita-huellas-tie", label: "Cita de huellas y TIE" },
  { href: "/extranjeria/nie", label: "NIE" },
];

export const IDENTIDAD_NICHOS2_GUIDES: Guide[] = [
  {
    id: "consultarCitaDni",
    pack: "viaje",
    path: "/dni/consultar-cita",
    h1: "Consultar o anular tu cita del DNI",
    title: "Consultar, cambiar o anular la cita del DNI",
    description:
      "Tienes cita pero no recuerdas el día, quieres moverla o cancelarla: dónde consultarla en citapreviadnie.es sin certificado y cómo recuperar el PDF de confirmación.",
    lead: `La cita del DNI no se consulta por teléfono ni en la ventanilla de la comisaría: se gestiona en ${CITA_DNI_HOST}, en el apartado de gestión de citas. No hace falta certificado electrónico: con los datos con los que hiciste la reserva el sistema te localiza, y desde ahí puedes consultar tu cita, cambiarla y anularla en un par de minutos.`,
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Interior: cita previa del DNI y pasaporte", href: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/cita-previa/" },
    ],
    cta: { href: CITA_DNI_URL, label: `Gestionar tu cita en ${CITA_DNI_HOST}` },
    related: [
      { href: "/dni/viajar-reino-unido", label: "Viajar a Reino Unido con DNI" },
      ...relatedDniNichos2,
    ],
    sections: [
      {
        id: "gestion",
        title: "Dónde se consulta (y qué hace falta)",
        paragraphs: [
          `Entra en citapreviadnie.es y busca el apartado de gestión de citas, que es distinto del formulario para pedir cita nueva. El sistema no te pide certificado digital ni Cl@ve: te identifica con los datos de la reserva, los del documento con el que pediste el hueco. Con eso el portal te muestra la cita que tienes asignada, con la oficina, el día y la hora.`,
          "Si en su día reservaste DNI y pasaporte en la misma gestión, la consulta te los enseña juntos: las dos expediciones comparten expediente cuando se pidieron a la vez. Y si aparece más de una cita suelta de gestiones anteriores que no usaste, anula las que no valgan: agenda limpia, cabeza limpia.",
        ],
      },
      {
        id: "anular",
        title: "Anular: medio minuto que libera un hueco",
        paragraphs: [
          "Anular la cita evita que mantengas una reserva que ya no vas a utilizar. La ayuda oficial explica que debes entrar con los mismos datos de la reserva y usar su número de justificante. Conserva la confirmación de la anulación.",
          "Cambiar de fecha es, en la práctica, anular y volver a pedir. El orden importa: el sistema no siempre te deja mantener dos citas activas para el mismo trámite, así que la secuencia segura es consultar la que tienes, reservar la nueva cuando veas hueco mejor y anular la vieja en cuanto la nueva esté confirmada. Nunca al revés, o te puedes quedar sin ninguna.",
        ],
      },
      {
        id: "pdf",
        title: "Recuperar el PDF de confirmación",
        paragraphs: [
          "El justificante de la cita es un PDF con un código que el portal te muestra al terminar la reserva y que conviene llevar impreso o en el móvil. Si lo borraste, no pasa nada: la consulta de tu cita en el mismo apartado de gestión te permite volver a ver los datos y recuperar el PDF de confirmación para imprimirlo o guardarlo otra vez.",
          "Ese PDF no es un documento de identidad ni un resguardo de expediente: es la carta de presentación de tu cita. Lo importante es lo que contiene: comisaría, fecha y hora. El día de la cita, el documento anterior y la foto corren de tu cuenta; la tasa, no: se paga al recoger.",
        ],
      },
      {
        id: "sinDatos",
        title: "Si perdiste todos los datos de la reserva",
        paragraphs: [
          "Si no conservas ni el PDF ni el documento con el que reservaste y la consulta no te localiza, la salida práctica es pedir cita nueva desde cero: la anterior, al no usarse, caduca por sí sola cuando llegue su fecha y deja de ocupar agenda. Si el sistema te deja anularla antes, mejor; si ya no la encuentras, no te obsesiones buscando lo que el propio portal terminará descartando.",
          `Y los importes de 2026, para que nadie te las pinte: la cita en sí es gratuita, la tasa del DNI son ${TASA_DNI_LABEL} y la del pasaporte ${TASA_PASAPORTE_LABEL}, y se abonan al recoger el documento, no al reservar el hueco. Nadie legítimo te va a pedir dinero por consultar, mover o anular una cita en citapreviadnie.es.`,
        ],
      },
    ],
  },
  {
    id: "dniReinoUnido",
    pack: "viaje",
    path: "/dni/viajar-reino-unido",
    h1: "Viajar a Reino Unido con DNI: cuándo no basta",
    title: "Viajar a Reino Unido con DNI: pasaporte, ETA y excepciones",
    description:
      "Para una visita desde España: qué documento de viaje y permiso necesitas, y cuándo el Reino Unido admite una identidad nacional por un estatus migratorio.",
    lead:
      "Para una visita ordinaria de una persona española sin estatus migratorio británico, el DNI por sí solo no basta: lleva un pasaporte válido y comprueba si necesitas ETA o visado según el motivo del viaje. El Gobierno británico contempla excepciones para algunas personas con permiso de residencia o con el EU Settlement Scheme.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "GOV.UK: documentos para entrar en Reino Unido", href: "https://www.gov.uk/uk-border-control/before-you-leave-for-the-uk" },
      { label: "GOV.UK: cuándo no se necesita ETA", href: "https://www.gov.uk/eta/when-not-need-eta" },
      { label: "GOV.UK: qué permite una ETA", href: "https://www.gov.uk/eta/what-you-can-cannot-do" },
    ],
    cta: { href: CITA_DNI_URL, label: `Renovar el pasaporte en ${CITA_DNI_HOST}` },
    related: [
      { href: "/dni/consultar-cita", label: "Consultar o anular tu cita del DNI" },
      { href: "/pasaporte/renovar-antes-caducar", label: "Con cuánta antelación renovar el pasaporte" },
      { href: "/pasaporte/urgente", label: "Pasaporte urgente" },
      { href: "/dni/caducado-viajar-ue", label: "Viajar con DNI caducado" },
    ],
    sections: [
      {
        id: "brexit",
        title: "Para una visita ordinaria, el pasaporte es la regla",
        paragraphs: [
          "Para la visita ordinaria de una persona española, el Gobierno británico indica que se necesita un pasaporte válido para toda la estancia. Una tarjeta nacional de identidad puede admitirse en supuestos concretos, como ciertos titulares de settled o pre-settled status, un permiso familiar del EU Settlement Scheme o un Frontier Worker permit. Comprueba que tu caso aparece en la lista oficial antes de viajar.",
          "La compañía puede comprobar la documentación antes del embarque y la decisión de entrada corresponde a las autoridades británicas. Mira la fecha de caducidad del pasaporte y las condiciones de la ruta antes de comprar el billete.",
        ],
      },
      {
        id: "eta",
        title: "La ETA: el permiso electrónico que se pide antes de volar",
        paragraphs: [
          "La ETA no se exige a todas las personas: depende de la nacionalidad, del motivo del viaje y de si ya tienes permiso para entrar o residir. Para una visita que sí la requiera, se solicita en línea y debe estar concedida antes de viajar. Comprueba el importe y las excepciones en GOV.UK.",
          "Una ETA permite viajar, pero no garantiza la entrada. Si tu viaje tiene otro propósito, necesitas comprobar si corresponde un visado distinto.",
        ],
      },
      {
        id: "pasaporte",
        title: "El plan del pasaporte, a tiempo",
        paragraphs: [
          `Si tu pasaporte está caducado o anda justo de validez, la cita se pide en citapreviadnie.es, el único portal oficial: la cita es gratuita y la tasa del pasaporte es de ${TASA_PASAPORTE_LABEL} en 2026 (la del DNI, ${TASA_DNI_LABEL}, se abona igualmente al recoger; ninguna se paga al reservar). En temporada alta el hueco tarda en aparecer, así que no dejes la cita para la semana del vuelo.`,
          "Puedes renovar en cualquier oficina de expedición del territorio nacional, no solo en tu provincia: ampliar municipios puede ayudarte a encontrar una fecha anterior. Si el viaje ya está encima, la guía del pasaporte urgente explica qué documentación presentar y cómo consultar la atención excepcional de cada unidad; un billete por sí solo no garantiza prioridad.",
        ],
      },
      {
        id: "errores",
        title: "Los tres errores clásicos",
        paragraphs: [
          "Hay tres comprobaciones que evitan los errores más habituales:",
        ],
        lists: [
          [
            "Reservar el vuelo antes de mirar el pasaporte: si está caducado, el billete no espera a que salga tu cita.",
            "Contar con el DNI sin comprobar una excepción: la identidad nacional solo sirve en los supuestos que reconoce el Gobierno británico.",
            "Dar por hecho que necesitas ETA: comprueba primero si tu estatus, nacionalidad y motivo del viaje te eximen o te obligan a solicitar visado.",
          ],
        ],
      },
      {
        id: "cierre",
        title: "El resumen que te ahorra el susto",
        paragraphs: [
          `Para una visita ordinaria desde España, comprueba pasaporte válido y el permiso británico que corresponda (ETA o visado). Una ETA no garantiza la entrada y el DNI solo puede usarse en excepciones concretas. Renovar el pasaporte cuesta ${TASA_PASAPORTE_LABEL} y la cita es gratuita en citapreviadnie.es; el DNI (con su tasa de ${TASA_DNI_LABEL} cuando toque renovarlo) sigue sirviendo para identificarte en España.`,
        ],
      },
    ],
  },
  {
    id: "nieVerde",
    pack: "extranjeria",
    path: "/extranjeria/nie-verde",
    h1: "El «NIE verde», la TIE y el certificado digital: no son lo mismo",
    title: "«NIE verde», TIE y certificado digital: desambiguación",
    description:
      "El certificado de registro de ciudadano UE, la TIE de familiar y el certificado digital cumplen funciones distintas. Validez, renovación y uso de cada documento.",
    lead:
      "En extranjería se mezclan tres documentos distintos: el certificado de registro de ciudadano de la UE (el «verde A4»), la tarjeta de familiar de ciudadano de la Unión y el certificado digital de la FNMT. Esta guía separa su función y recuerda que la vigencia de una tarjeta depende del tipo de autorización y de si es permanente.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Administración: tarjeta de familiar de ciudadano UE", href: "https://administracion.gob.es/pagFront/buscadoractuaciones/detalleActuacion.htm?codSia=994235&retorno=true" },
      { label: "Administración: residencia permanente", href: "https://administracion.gob.es/pag_Home/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/residencia/obtencion-residencia/residencia-permanente.html" },
      { label: "Administración: certificado electrónico FNMT", href: "https://administracion.gob.es/pag_Home/Tramites/ServiciosElectronicosFrecuentes/Obtencion-Certificado-Electronico-FNMT.html" },
    ],
    cta: { href: SEDE_AAPP_URL, label: "Pedir cita de extranjería (oficial)" },
    related: [
      { href: "/extranjeria/certificado-registro-ue", label: "Certificado de registro de ciudadano UE" },
      { href: "/extranjeria/nie-vs-nif", label: "NIE y NIF: la diferencia" },
      { href: "/extranjeria/certificado-digital-nie", label: "Certificado digital con NIE" },
      ...relatedExNichos2,
    ],
    sections: [
      {
        id: "verdeA4",
        title: "El certificado de registro: el «verde A4» que no caduca",
        paragraphs: [
          "Si eres ciudadano de la Unión Europea y resides en España, tu documento es el certificado de registro de ciudadano de la Unión: la hoja verde en formato A4 que expide la oficina de extranjería. Es un certificado, no una tarjeta física; conserva el original y comprueba con la oficina qué debes hacer si cambian tus datos o tu situación de residencia.",
          "Para obtenerlo (o para pedir un duplicado por pérdida o deterioro) se pide cita en la sede electrónica de administraciones públicas. El NIE se asigna precisamente con esa inscripción: el número que llevas el resto de la vida nace en ese trámite.",
        ],
      },
      {
        id: "tieFamiliar",
        title: "La TIE de familiar de ciudadano UE: la tarjeta que sí caduca",
        paragraphs: [
          "Si eres familiar no comunitario de un ciudadano de la UE, tu documento es la tarjeta de residencia de familiar de ciudadano de la Unión. La tarjeta es física y su vigencia depende de la autorización: la tarjeta temporal no debe confundirse con la residencia permanente, que puede obtenerse tras cinco años de residencia legal continuada si cumples sus requisitos.",
          "La diferencia importa cuando un banco, una aerolínea o una oficina comprueba la vigencia del documento. Mira la fecha que figura en tu tarjeta y las instrucciones de renovación; si vas a viajar con una tarjeta caducada o en trámite, consulta la autorización de regreso y las condiciones de tu expediente.",
        ],
      },
      {
        id: "fnmt",
        title: "El certificado digital de la FNMT: una credencial, no una identidad",
        paragraphs: [
          "El tercer papel del cajón es el certificado digital de la FNMT. No lo expide extranjería y no dice nada de tu situación residencial: es una credencial que instalas en tu navegador o en un soporte físico para identificarte y firmar en internet (Hacienda, Seguridad Social, sedes electrónicas). No sustituye al NIE, al verde A4 ni a la TIE: puedes tener los tres y seguir necesitando enseñar el papel físico cuando te lo pidan en persona.",
          "Si lo que necesitas es sacarlo usando tu NIE como documento de identificación, la guía paso a paso del certificado digital con NIE explica el circuito completo: configurar el navegador, solicitar el código, validarlo en una oficina de registro o por carta y descargarlo.",
        ],
      },
      {
        id: "cualToca",
        title: "Cuál te toca, en una línea cada uno",
        paragraphs: [
          "La asignación rápida, para dejar de mezclar:",
        ],
        lists: [
          [
            "Ciudadano de la UE que reside en España: certificado de registro, el «verde A4». Conserva el certificado y consulta cambios o duplicados con la oficina.",
            "Familiar no comunitario de ciudadano de la UE: tarjeta de residencia de familiar. Comprueba su fecha y si tu autorización es temporal o permanente.",
            "Necesitas identificarte o firmar en internet: certificado digital de la FNMT. Es una credencial electrónica, no un documento de identidad.",
          ],
        ],
      },
    ],
  },
  {
    id: "nieVsNif",
    pack: "extranjeria",
    path: "/extranjeria/nie-vs-nif",
    h1: "NIE y NIF: la diferencia, con ejemplos",
    title: "NIE y NIF: qué es cada número y qué teclear",
    description:
      "El NIE identifica al extranjero ante la Administración; el NIF es el número fiscal. El NIE vale como NIF con su letra asignada: qué teclear en la IRPF, la nómina y el banco.",
    lead:
      "El NIE (número de identidad de extranjero) identifica a la persona extranjera ante la Administración española; el NIF (número de identificación fiscal) es el número con el que Hacienda te tiene localizado. Para quien vive en España con DNI, ambos coinciden; para ti, casi siempre, el número que hay que teclear es tu NIE. La explicación, con ejemplos.",
    cta: { href: SEDE_AAPP_URL, label: "Trámites de extranjería (oficial)" },
    related: [
      { href: "/extranjeria/nie", label: "NIE" },
      { href: "/extranjeria/nie-verde", label: "«NIE verde», TIE y certificado digital" },
      { href: "/extranjeria/certificado-digital-nie", label: "Certificado digital con NIE" },
    ],
    sections: [
      {
        id: "queEs",
        title: "Qué identifica cada número",
        paragraphs: [
          "El NIE lo asigna la oficina de extranjería a los extranjeros que se relacionan con España: trabajar, residir, comprar una vivienda, abrir una empresa. Empieza por X, Y o Z, seguido de números y una letra de control, y acompaña a la persona de por vida. El NIF, en cambio, es una figura fiscal: es el número de identificación ante la Agencia Tributaria, y lo tienen tanto las personas físicas como las empresas.",
          "La clave para no liarse: el NIE es identidad administrativa (quién eres ante extranjería) y el NIF es identidad tributaria (quién eres ante Hacienda). Dos registros distintos que, en tu caso concreto, apuntan al mismo número.",
        ],
      },
      {
        id: "valeComoNif",
        title: "Por qué tu NIE vale como NIF",
        paragraphs: [
          "A efectos fiscales, el NIE de una persona física extranjera hace las veces de NIF: con su letra de control asignada, es un número de identificación fiscal válido a todos los efectos. Por eso el banco te abre la cuenta con el NIE y Hacienda lo acepta en las declaraciones: no necesitas gestionar un «NIF adicional» aparte de tu NIE. Cuando un formulario pida NIF y tú solo tengas NIE, la respuesta es el propio NIE, completo y con su letra.",
          "El caso genuinamente distinto es el del extranjero que no reside en España y opera desde fuera sin NIE: a ese, Hacienda le asigna su propio número fiscal para sus operaciones con España. Si resides aquí y tienes NIE, ese no es tu camino: el tuyo ya está hecho.",
        ],
      },
      {
        id: "dondeTeclear",
        title: "Qué teclear en cada trámite: los tres clásicos",
        paragraphs: [
          "Los tres sitios donde la duda aparece siempre, resueltos:",
        ],
        lists: [
          [
            "Declaración de la Renta (IRPF): en la casilla de identificación fiscal, tu NIE completo con su letra. Hacienda lo trata directamente como tu NIF.",
            "Nómina: la empresa te pedirá tu número de identificación fiscal para el contrato y las retenciones; ese número es tu NIE.",
            "Banco: para abrir la cuenta y firmar cualquier póliza o préstamo, el NIE como identificación fiscal, acreditado con el pasaporte o la TIE como documento.",
          ],
        ],
      },
      {
        id: "reglaMental",
        title: "La regla mental y el resumen",
        paragraphs: [
          "NIE: número de identidad del extranjero, normalmente estable aunque la tarjeta o la autorización de residencia caduque. NIF: identificador fiscal que asigna Hacienda; para una persona extranjera suele coincidir con el NIE y, para quien tiene DNI, con ese DNI. En IRPF, nómina y banco, usa el número que figure en tu documento fiscal y confirma el formato si el formulario distingue NIF y NIE.",
          "Si ya tienes NIE, muchas gestiones fiscales usan ese mismo número como NIF. Hay supuestos de personas no residentes o entidades que requieren una asignación fiscal distinta, así que desconfía de quien prometa un trámite universal y comprueba tu caso en la Agencia Tributaria.",
        ],
      },
    ],
  },
  {
    id: "huellasQueLlevar",
    pack: "extranjeria",
    path: "/extranjeria/huellas-que-llevar",
    h1: "Toma de huellas de la TIE: qué llevar a la cita",
    title: "Toma de huellas TIE: checklist de documentos",
    description:
      "Checklist de la cita de huellas de la TIE: EX-17, tasa 790-012 pagada, pasaporte completo en vigor, foto, resguardo si es renovación y padrón si lo piden. Variaciones por comisaría.",
    lead:
      "La toma de huellas es la cita que materializa tu TIE: el día que la Policía Nacional registra tus datos biométricos. La documentación es corta pero estricta, y fallar en una pieza (la tasa sin pagar, el pasaporte caducado, el modelo sin firmar) te devuelve a la cola de citas. Esta es la lista que funciona, con sus variaciones por comisaría.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Policía Nacional: tarjeta inicial o renovación", href: "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_tarjeta_residencia_residenciaytrabajo.php/index.php" },
      { label: "BOE: tasas de extranjería", href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2025-12056" },
    ],
    cta: { href: SEDE_AAPP_URL, label: "Pedir la cita (oficial)" },
    secondaryCta: { href: "/extranjeria/cita-huellas-tie", label: "Cómo conseguir la cita de huellas" },
    related: [
      { href: "/extranjeria/cita-huellas-tie", label: "Cita de huellas y TIE" },
      { href: "/extranjeria/tie-recogida-cuanto-tarda", label: "TIE: cuánto tarda y cuándo recogerla" },
      { href: "/extranjeria/nie-verde", label: "«NIE verde», TIE y certificado digital" },
    ],
    sections: [
      {
        id: "checklist",
        title: "La checklist de la cita",
        paragraphs: [
          "Lo que pide la oficina de expedición en la inmensa mayoría de los casos:",
        ],
        lists: [
          [
            "Modelo EX-17 (solicitud de la tarjeta de identidad de extranjero), cumplimentado y firmado.",
            "Tasa del modelo 790 código 012 pagada: se descarga el formulario, se abona en el banco o por internet y se presenta el justificante.",
            "Pasaporte completo y en vigor: el original; por si acaso, copia de todas las páginas.",
            "Foto reciente de tamaño carné, con fondo liso.",
            "Si es una renovación: la tarjeta anterior o el resguardo que acredita el trámite en curso.",
            "Certificado de empadronamiento reciente si tu comisaría lo pide: no todas lo exigen, confírmalo antes de la cita.",
          ],
        ],
      },
      {
        id: "variaciones",
        title: "Cada comisaría tiene sus manías",
        paragraphs: [
          "La base documental es la misma en toda España, pero cada oficina de expedición añade sus matices: hay comisarías que piden dos copias de todo, otras que quieren el padrón sí o sí y alguna que fotocopia ella misma en ventanilla. La forma más rápida de no viajar en balde es llamar a la oficina o consultar su información antes del día señalado, y presentarse con una copia de más de cada documento: papel sobrante nunca estorbó en una comisaría.",
          "Otro matiz que despista a primera vista: la cita de huellas y la cita de recogida de la TIE son citas distintas. El día de las huellas no sales con la tarjeta; sales con un resguardo y con el trámite en marcha. La guía de plazos y recogida explica qué viene después.",
        ],
      },
      {
        id: "cita",
        title: "Primero está la cita (y está difícil)",
        paragraphs: [
          "Todo lo anterior presupone que el portal ofrece una cita para el procedimiento y la oficina que necesitas. La disponibilidad depende de cada oficina: consulta la sede oficial y sus instrucciones, y pregunta a la dependencia si algún requisito no está claro. No hay una hora de publicación ni un porcentaje de citas perdidas verificado en esta guía. Si ya tienes fecha, revisa la checklist y guarda el justificante.",
        ],
      },
    ],
  },
  {
    id: "tieRecogidaPlazos",
    pack: "extranjeria",
    path: "/extranjeria/tie-recogida-cuanto-tarda",
    h1: "TIE tras las huellas: cuánto tarda y cuándo recogerla",
    title: "TIE después de las huellas: plazos y recogida",
    description:
      "Qué ocurre después de las huellas, cómo consultar la recogida y por qué el resguardo no sustituye a la TIE.",
    lead:
      "Entregadas las huellas, la tarjeta se recoge en la dependencia que la expide siguiendo las instrucciones que te dé esa oficina. No hay un plazo único publicado para todas las ciudades; el resguardo acredita el trámite y no sustituye a la TIE. Comprueba en el propio resguardo cualquier fecha o instrucción de recogida.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "Policía Nacional: trámites y dependencias de extranjería", href: "https://sede.policia.gob.es/portalCiudadano/_es/tramites_extranjeria_tramite_tarjeta_residencia_residenciaytrabajo.php/index.php" },
    ],
    cta: { href: SEDE_AAPP_URL, label: "Pedir cita de recogida (oficial)" },
    related: [
      { href: "/extranjeria/huellas-que-llevar", label: "Huellas de la TIE: qué llevar" },
      { href: "/extranjeria/cita-huellas-tie", label: "Cita de huellas y TIE" },
      { href: "/extranjeria/autorizacion-regreso-ex13", label: "Autorización de regreso (EX-13)" },
      { href: "/extranjeria/tie-caducada-viajar", label: "Viajar con la TIE caducada" },
    ],
    sections: [
      {
        id: "plazos",
        title: "Cuánto tarda de verdad",
        paragraphs: [
          "No hay un plazo único garantizado para todas las oficinas. La dependencia que tomó tus huellas es quien puede decirte cuándo consultar la recogida y cómo te avisará, si ofrece aviso. No organices un viaje en torno a una fecha estimada que no figure en una instrucción oficial.",
        ],
      },
      {
        id: "recogida",
        title: "La cita de recogida",
        paragraphs: [
          "La forma de recogida depende de la oficina: puede requerir una cita específica y puede tener instrucciones propias. Sigue las indicaciones que te entreguen al tomar las huellas y consulta a la dependencia si el portal todavía no ofrece una opción de recogida.",
          "Lleva el resguardo, el pasaporte y cualquier documento que la oficina haya indicado. Si no puedes acudir tú, pregunta antes qué representación o autorización acepta; el criterio no es universal.",
        ],
      },
      {
        id: "resguardoNoTarjeta",
        title: "El resguardo no es la tarjeta (y caduca)",
        paragraphs: [
          "Mientras esperas, el resguardo acredita la toma de huellas, pero no es la TIE ni sustituye a un documento de viaje. Si vas a salir de España, consulta antes si necesitas una autorización de regreso y las condiciones de entrada aplicables a tu caso.",
          "Sigue cualquier fecha límite o instrucción que figure en el resguardo. Si no puedes recoger la tarjeta dentro del plazo indicado, consulta a la comisaría antes de que venza.",
        ],
      },
      {
        id: "mientrasTanto",
        title: "Si necesitas viajar antes de tenerla",
        paragraphs: [
          "Si necesitas viajar antes de tener la TIE, consulta la autorización de regreso y las condiciones concretas de tu expediente antes de comprar el billete. El Reglamento de extranjería limita su validez y establece que la entrada se realiza por pasos fronterizos españoles habilitados; no es una garantía para cualquier ruta o control.",
        ],
      },
    ],
  },
  {
    id: "autorizacionRegresoEx13",
    pack: "extranjeria",
    path: "/extranjeria/autorizacion-regreso-ex13",
    h1: "Autorización de regreso (EX-13): documentos y tasa",
    title: "Autorización de regreso EX-13: documentos y tasa 2026",
    description:
      "Documentos de la autorización de regreso: EX-13 por duplicado, tasa 790 código 012 (10,72 € en 2026), copia del pasaporte y justificante de renovación en trámite. Válida 90 días.",
    lead:
      "La autorización de regreso permite salir de España y solicitar el retorno mientras la autorización de residencia o estancia está en renovación o prórroga, si se cumplen sus requisitos. Se tramita con el modelo EX-13 y la tasa 790 código 012 (10,72 € según la orden vigente consultada). El Reglamento fija una vigencia máxima de 90 días en los supuestos previstos y limita la entrada a pasos fronterizos españoles habilitados. Confirma el caso y las instrucciones de tu oficina.",
    reviewedAt: "2026-09-07",
    sources: [
      { label: "BOE: artículo 5 del Reglamento de extranjería", href: "https://www.boe.es/eli/es/rd/2024/11/19/1155/" },
      { label: "BOE: tasa de autorización de regreso", href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2025-12056" },
      { label: "Policía Nacional: trámites de extranjería", href: "https://www.policia.es/_es/extranjeria_extranjeros.php/1000" },
    ],
    cta: { href: SEDE_AAPP_URL, label: "Pedir cita en comisaría (oficial)" },
    secondaryCta: { href: "/extranjeria/autorizacion-regreso", label: "Guía completa: autorización de regreso" },
    related: [
      { href: "/extranjeria/autorizacion-regreso", label: "Autorización de regreso: guía completa" },
      { href: "/extranjeria/tie-caducada-viajar", label: "Viajar con la TIE caducada" },
      { href: "/extranjeria/autorizacion-regreso-navidad", label: "Autorización de regreso en Navidad" },
      { href: "/extranjeria/tie-recogida-cuanto-tarda", label: "TIE: cuánto tarda y cuándo recogerla" },
    ],
    sections: [
      {
        id: "queEs",
        title: "Qué es (y qué no es)",
        paragraphs: [
          "La autorización de regreso es el documento para extranjeros con una renovación o trámite presentado y aún no resuelto: les permite ausentarse de España y reentrar mientras el expediente avanza. Solo procede con expediente en trámite: si tu tarjeta está caducada y no has presentado la renovación, no hay autorización que pedir; lo primero es presentar el trámite.",
          "El Reglamento permite varias entradas y salidas durante la vigencia de la autorización, con un único documento, y establece que la entrada debe hacerse por pasos fronterizos españoles habilitados. La vigencia puede ser inferior a 90 días según cuándo se solicite; no es una prórroga de estancia ni sustituye a la tarjeta.",
        ],
      },
      {
        id: "documentos",
        title: "Los documentos de la cita",
        paragraphs: [
          "La lista que pide la oficina de expedición:",
        ],
        lists: [
          [
            "Modelo EX-13 cumplimentado por duplicado: dos ejemplares, no una copia del primero.",
            "Tasa del modelo 790 código 012 pagada: 10,72 € en 2026; se descarga el formulario, se abona en el banco o por internet y se aporta el justificante.",
            "Copia del pasaporte en vigor.",
            "Justificante de que la renovación está presentada y en trámite: el resguardo de presentación del expediente.",
          ],
        ],
      },
      {
        id: "roboExtravio",
        title: "También por robo o extravío",
        paragraphs: [
          "La otra cara de la autorización de regreso es el caso agudo: te roban o pierdes la tarjeta mientras el duplicado ya está solicitado y en trámite. Con el justificante del duplicado pedido, la comisaría puede emitir la autorización que te permite moverte y reentrar mientras el duplicado llega. En estos casos la cita se busca como urgencia posible: llama a la oficina, explica el vuelo y la circunstancia, y guarda la denuncia si la hubo, que nunca sobra en ventanilla.",
        ],
      },
      {
        id: "antesDeVolar",
        title: "Antes de reservar el billete",
        paragraphs: [
          "Con la TIE caducada o en trámite, las condiciones cambian según la ruta, el documento y tu expediente. Consulta la guía de viajes y la oficina antes de reservar. No hay un calendario nacional verificado que permita afirmar que octubre sea siempre el mejor momento para pedir la autorización.",
        ],
      },
    ],
  },
  {
    id: "certificadoDigitalNie",
    pack: "extranjeria",
    path: "/extranjeria/certificado-digital-nie",
    h1: "Certificado digital con NIE: paso a paso",
    title: "Certificado digital con NIE: cómo sacarlo paso a paso",
    description:
      "Cómo obtener el certificado digital de la FNMT con NIE: configurar el navegador, solicitar el código, validar en una oficina de registro (AEAT, por ejemplo) o por carta, y errores típicos.",
    lead:
      "El certificado digital de la FNMT también se obtiene con NIE, y el circuito es el mismo que con DNI: solicitarlo en la sede de personas físicas, validar tu identidad en una oficina de registro (en una de la Agencia Tributaria, por ejemplo) o por carta, y luego descargarlo e instalarlo. La parte que hace tropezar es meter bien el NIE y el nombre. Vamos por pasos.",
    cta: { href: "https://www.sede.fnmt.gob.es/", label: "Sede electrónica de la FNMT" },
    related: [
      { href: "/extranjeria/nie", label: "NIE" },
      { href: "/extranjeria/nie-verde", label: "«NIE verde», TIE y certificado digital" },
      { href: "/extranjeria/nie-vs-nif", label: "NIE y NIF: la diferencia" },
      { href: "/extranjeria/mercurio", label: "Consultar tu expediente" },
    ],
    sections: [
      {
        id: "navegador",
        title: "Paso 1: preparar el navegador",
        paragraphs: [
          "El certificado se solicita y se descarga desde la sede electrónica de la FNMT (sede.fnmt.gob.es), en el apartado de personas físicas. Antes de nada, configura el navegador siguiendo el manual de la propia FNMT: los navegadores actuales gestionan la instalación desde sus opciones de certificados, y el paso de configuración previo evita la mitad de los errores de la descarga final.",
          "Un detalle que salva tardes enteras: la solicitud y la descarga deben hacerse con el mismo navegador y en el mismo ordenador. Si pides el código desde el portátil y luego intentas descargarlo desde el móvil, no va: la FNMT ata el certificado al entorno donde se solicitó.",
        ],
      },
      {
        id: "solicitud",
        title: "Paso 2: solicitar el certificado con tu NIE",
        paragraphs: [
          "En la sede de la FNMT, apartado de personas físicas, elige la opción de obtener el certificado (software) y acepta las condiciones. Cuando el formulario pida el documento de identificación, selecciona NIE y teclea el número completo: con la letra inicial (X, Y o Z) y la letra de control final, sin espacios de más. Al terminar, el sistema te entrega un código de solicitud: guárdalo bien, porque es la llave del paso siguiente.",
          "Los dos errores típicos nacen aquí: teclear el NIE sin la letra o con espacios mal, y escribir el nombre invertido, apellidos donde va el nombre y al revés. El sistema valida contra los datos con los que se expedidió tu NIE: si no coinciden exactamente, la validación de identidad fallará aunque seas tú.",
        ],
      },
      {
        id: "validacion",
        title: "Paso 3: validar la identidad, presencial o por carta",
        paragraphs: [
          "El certificado no se descarga hasta que la FNMT comprueba que eres tú, y hay dos vías. Presencial: con el código de solicitud y tu pasaporte o TIE, en una oficina de registro; una de la Agencia Tributaria, por ejemplo, o cualquiera de las admitidas que te resulte cercana. O por carta: pidiendo que el código de activación te llegue al domicilio. La presencial suele ser más rápida y evita sustos de correo perdido.",
          "Validada la identidad, vuelve a la sede de la FNMT con el mismo navegador y el mismo ordenador de la solicitud, teclea el código y descarga e instala el certificado. Exporta enseguida una copia de seguridad con contraseña a un USB o soporte propio: si el equipo se formatea sin copia, el certificado se pierde y toca empezar de cero.",
        ],
      },
      {
        id: "queNoEs",
        title: "Qué NO es el certificado digital",
        paragraphs: [
          "El certificado digital no es un «NIE electrónico» ni sustituye a ningún documento de identidad: es una credencial para identificarte y firmar en internet (Hacienda, Seguridad Social, sedes electrónicas). Quién eres lo sigue acreditando el pasaporte, la TIE o el certificado de registro; el digital solo te ahorra claves y colas en línea. Y no se pide en extranjería: se pide en la FNMT, que es un emisor distinto con un trámite distinto.",
          "Para el contexto completo de los papeles de extranjería (el «verde A4» que no caduca, la TIE que sí, y el NIE frente al NIF), las guías enlazadas abajo los desambiguan uno a uno, con cuál te quedas según tu situación.",
        ],
      },
    ],
  },
];
