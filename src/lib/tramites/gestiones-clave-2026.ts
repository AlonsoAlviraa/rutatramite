import type { Guide } from "@/lib/tramites/types";

/** 5 guías de alta demanda (2026-10-13): Cl@ve, certificado FNMT, vida laboral, cita SEPE e IMV. Fuentes oficiales. */
const reviewedAt = "2026-10-13";
const DISCLAIMER = "Información orientativa. No somos la Seguridad Social, el SEPE, la FNMT ni la Administración. Los trámites son gratuitos en las webs oficiales enlazadas; si una fuente oficial cambia, manda la fuente oficial.";

const S = {
  clave: { href: "https://clave.gob.es/registro/como-puedo-registrarme", label: "Cl@ve: cómo registrarse" },
  claveVideo: { href: "https://clave.gob.es/registro/como-puedo-registrarme/registro-basico-internet-videoidentificacion-automatica", label: "Cl@ve: registro por videoidentificación en la app" },
  claveCarta: { href: "https://clave.gob.es/registro/como-puedo-registrarme/registro-basico-internet-carta-de-invitacion", label: "Cl@ve: registro con carta de invitación" },
  fnmt: { href: "https://www.sede.fnmt.gob.es/certificados/persona-fisica/obtener-certificado-software", label: "FNMT: obtener el certificado de persona física" },
  fnmtFaq: { href: "https://www.sede.fnmt.gob.es/preguntas-frecuentes/certificado-de-persona-fisica/-/asset_publisher/eIal9z2VE0Kb/content/1133-que-pasos-he-de-seguir-para-obtener-un-certificado-fnmt-de-persona-fisica-", label: "FNMT: pasos para el certificado con acreditación presencial" },
  vida: { href: "https://portal.seg-social.gob.es/wps/portal/importass/importass/Categorias/Vida+laboral+e+informes/Informes+sobre+tu+situacion+laboral/Informe+de+tu+vida+laboral", label: "Import@ss: informe de tu vida laboral" },
  sepeCita: { href: "https://sede.sepe.gob.es/portalSede/es/procedimientos-y-servicios/personas/proteccion-por-desempleo/cita-previa", label: "Sede del SEPE: cita previa de prestaciones" },
  sepeSol: { href: "https://sede.sepe.gob.es/portalSede/procedimientos-y-servicios/personas/proteccion-por-desempleo/solicitud-de-prestaciones.html", label: "Sede del SEPE: solicitud de prestaciones por internet" },
  imvReq: { href: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d68-8d06-4645-bde7-05374ee42ac7/requisitos?changeLanguage=es", label: "Seguridad Social: requisitos del ingreso mínimo vital" },
  imvSim: { href: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d68-8d06-4645-bde7-05374ee42ac7/simuladordelingresominimovital", label: "Seguridad Social: simulador del ingreso mínimo vital" },
  imvLey: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2021-21007", label: "BOE: Ley 19/2021, del ingreso mínimo vital" },
};

const g = (x: Omit<Guide, "reviewedAt" | "disclaimer">): Guide => ({ reviewedAt, disclaimer: DISCLAIMER, ...x });

export const GESTIONES_CLAVE_GUIDES: Guide[] = [
  g({
    id: "clave-registro",
    pack: "viaje",
    path: "/dni/clave-registrarse",
    h1: "Cómo registrarse en Cl@ve: app, carta de invitación u oficina",
    title: "Registrarse en Cl@ve en 2026: app, carta o videollamada",
    description: "Cómo darte de alta en Cl@ve gratis: con la app y tu DNI en vigor en minutos, con carta de invitación a casa, por videollamada o en una oficina de registro.",
    lead: "Cl@ve es la llave para hacer trámites por internet con Hacienda, la Seguridad Social, el SEPE o para pedir el voto por correo. Registrarse es gratis. Lo más rápido, si tienes DNI español en vigor, es la app Cl@ve con videoidentificación automática.",
    cta: { href: S.clave.href, label: "Registrarse en clave.gob.es" },
    secondaryCta: { href: "/dni/certificado-digital-fnmt", label: "Alternativa: certificado digital" },
    sources: [S.clave, S.claveVideo, S.claveCarta],
    related: [{ href: "/trabajo/vida-laboral", label: "Descargar la vida laboral" }, { href: "/elecciones/pedir-voto-por-correo-por-internet", label: "Pedir el voto por correo por internet" }, { href: "/dni", label: "DNI: precio y renovación" }],
    faqs: [
      { q: "¿Cuál es la forma más rápida de registrarse en Cl@ve?", a: "La app Cl@ve con videoidentificación automática, si eres español con DNI en vigor: te haces una foto del DNI y un vídeo selfie y quedas registrado en minutos con nivel básico." },
      { q: "¿Y si no puedo usar la app?", a: "Puedes pedir una carta de invitación a tu domicilio fiscal y completar el registro por internet con el código (CSV) que trae, hacerlo por videollamada en horario de oficina o ir a una oficina de registro (por ejemplo, Agencia Tributaria o Seguridad Social, normalmente con cita)." },
      { q: "¿Cuesta dinero?", a: "No. El registro en Cl@ve es gratuito. Desconfía de webs que cobren por darte de alta." },
    ],
    sections: [
      { id: "vias", title: "Las 4 formas de registrarte", paragraphs: ["Elige la que te encaje:"], lists: [["App Cl@ve con videoidentificación automática: DNI en vigor y móvil. Es la más rápida.", "Carta de invitación: la pides por internet, te llega a tu domicilio fiscal y completas el alta con su código.", "Videollamada: con DNI, móvil, correo y ordenador con cámara, en horario de lunes a viernes por la mañana.", "Presencial: en una oficina de registro, con tu documento de identidad."]] },
      { id: "despues", title: "Después de registrarte", paragraphs: ["Con Cl@ve podrás identificarte con Cl@ve Móvil (la app) o con Cl@ve PIN, según lo que admita cada web. Para algunos trámites que exigen firma necesitarás el nivel avanzado o un certificado digital."] },
    ],
  }),
  g({
    id: "certificado-fnmt",
    pack: "viaje",
    path: "/dni/certificado-digital-fnmt",
    h1: "Certificado digital FNMT: cómo obtenerlo gratis paso a paso",
    title: "Certificado digital FNMT persona física: pasos en 2026",
    description: "Pide el certificado digital de la FNMT gratis: solicitud online, acreditar tu identidad (oficina o videollamada) y descarga en el mismo ordenador y navegador.",
    lead: "El certificado digital de persona física de la FNMT es gratuito y sirve para firmar y hacer casi cualquier trámite online. Son tres pasos: lo solicitas en la web de la FNMT, acreditas tu identidad y lo descargas en el mismo ordenador y navegador.",
    cta: { href: S.fnmt.href, label: "Solicitar en la sede de la FNMT" },
    secondaryCta: { href: "/dni/clave-registrarse", label: "Alternativa: Cl@ve" },
    sources: [S.fnmt, S.fnmtFaq],
    related: [{ href: "/dni/clave-registrarse", label: "Registrarse en Cl@ve" }, { href: "/extranjeria/certificado-digital-nie", label: "Certificado digital con NIE" }, { href: "/trabajo/vida-laboral", label: "Descargar la vida laboral" }],
    faqs: [
      { q: "¿Cuánto cuesta el certificado digital de la FNMT?", a: "Nada. El certificado de persona física de la FNMT es gratuito." },
      { q: "¿Qué llevo a la oficina para acreditar mi identidad?", a: "El código de solicitud que te llega por correo y tu DNI, pasaporte o carné de conducir. Si eres extranjero, tu NIE o tarjeta de extranjero y el pasaporte." },
      { q: "¿Por qué no puedo descargarlo?", a: "Tiene que descargarse en el mismo ordenador, con el mismo usuario y el mismo navegador con los que lo solicitaste, y con el configurador de la FNMT instalado." },
    ],
    sections: [
      { id: "pasos", title: "Los 3 pasos", paragraphs: ["Así se obtiene la versión en software (archivo en tu ordenador):"], lists: [["Instala el configurador FNMT-RCM y haz la solicitud online. Te llega un código de solicitud por correo.", "Acredita tu identidad: en una oficina de acreditación (Agencia Tributaria, Seguridad Social, ayuntamientos… muchas con cita) o por videollamada si está disponible.", "Descarga el certificado desde la web de la FNMT con el código, en el mismo equipo y navegador. Haz una copia de seguridad."]] },
    ],
  }),
  g({
    id: "vida-laboral",
    pack: "trabajo",
    path: "/trabajo/vida-laboral",
    h1: "Informe de vida laboral: cómo descargarlo por SMS, Cl@ve o certificado",
    title: "Vida laboral: cómo descargarla gratis en 2026 (SMS o Cl@ve)",
    description: "Descarga tu informe de vida laboral en Import@ss: con un SMS al móvil registrado, con Cl@ve o con certificado digital. Gratis y al momento en PDF.",
    lead: "El informe de vida laboral se descarga gratis y al momento en Import@ss, el portal de la Seguridad Social. Si tienes tu móvil registrado allí, basta con un SMS. Si no, usa Cl@ve o un certificado digital.",
    cta: { href: S.vida.href, label: "Ir a Import@ss" },
    secondaryCta: { href: "/dni/clave-registrarse", label: "Registrarse en Cl@ve" },
    sources: [S.vida],
    related: [{ href: "/trabajo/cita-previa-sepe", label: "Cita previa del SEPE" }, { href: "/certificado-empresa-sepe", label: "Certificado de empresa para el SEPE" }, { href: "/trabajo/ingreso-minimo-vital", label: "Ingreso mínimo vital 2026" }],
    faqs: [
      { q: "¿Cómo saco la vida laboral sin certificado digital?", a: "Por SMS: en Import@ss elige la opción de vía SMS, escribe tu DNI o NIE, tu fecha de nacimiento y el móvil que tienes registrado en la Seguridad Social, y recibirás un código para descargar el PDF." },
      { q: "¿Y si mi móvil no está registrado en la Seguridad Social?", a: "Import@ss permite comunicarlo sin identificación electrónica, con una foto de tu documento y un selfie. Cuando lo validen, ya podrás usar la vía SMS." },
      { q: "¿Tiene coste?", a: "No. El informe es gratuito en la web oficial." },
    ],
    sections: [
      { id: "vias", title: "Tres formas de obtenerla", paragraphs: ["Todas en Import@ss, en Vida laboral e informes:"], lists: [["Vía SMS: DNI/NIE, fecha de nacimiento y móvil registrado.", "Con Cl@ve: identificación con Cl@ve Móvil o Cl@ve PIN.", "Con certificado digital o DNI electrónico."]] },
      { id: "para-que", title: "Para qué te la piden", paragraphs: ["Es habitual para pedir el paro, una hipoteca o alquiler, becas y ayudas, o para comprobar tus cotizaciones y días trabajados. Revisa que aparezcan todas tus empresas; si falta algo, consúltalo con la Seguridad Social."] },
    ],
  }),
  g({
    id: "cita-sepe",
    pack: "trabajo",
    path: "/trabajo/cita-previa-sepe",
    h1: "Cita previa del SEPE para el paro: cómo pedirla y alternativas",
    title: "Cita previa SEPE 2026: cómo pedirla para el paro",
    description: "Pide cita en el SEPE para el paro en su sede electrónica, o solicita la prestación sin cita por internet con Cl@ve, certificado o el formulario de presolicitud.",
    lead: "Para pedir el paro no siempre necesitas cita: puedes solicitarlo por internet en la sede del SEPE con Cl@ve o certificado digital, o enviar el formulario de presolicitud. Si prefieres ir a la oficina, la cita se pide en la sede electrónica del SEPE. Antes, inscríbete como demandante de empleo en tu comunidad.",
    cta: { href: S.sepeCita.href, label: "Pedir cita en la sede del SEPE" },
    secondaryCta: { href: S.sepeSol.href, label: "Pedir el paro por internet" },
    sources: [S.sepeCita, S.sepeSol],
    related: [{ href: "/certificado-empresa-sepe", label: "Certificado de empresa para el SEPE" }, { href: "/trabajo/vida-laboral", label: "Descargar la vida laboral" }, { href: "/modelo-finiquito", label: "Modelo de finiquito" }],
    faqs: [
      { q: "¿Puedo pedir el paro sin cita?", a: "Sí. Por internet en la sede del SEPE con Cl@ve, certificado digital o DNI electrónico, o con el formulario de presolicitud si no tienes identificación electrónica." },
      { q: "¿Qué tengo que hacer antes?", a: "Inscribirte como demandante de empleo en el servicio de empleo de tu comunidad autónoma." },
      { q: "¿Qué llevo a la cita?", a: "Tu DNI o NIE (y si eres extranjero, la TIE y el pasaporte). Ten a mano los datos de tu última empresa y de tu cuenta bancaria." },
    ],
    sections: [
      { id: "pasos", title: "Paso a paso", paragraphs: ["El orden habitual tras quedarte sin trabajo:"], lists: [["Inscríbete como demandante de empleo en tu comunidad.", "Comprueba que tu empresa ha enviado el certificado de empresa.", "Solicita la prestación por internet o pide cita en la sede del SEPE.", "Guarda el justificante de la solicitud."]] },
    ],
  }),
  g({
    id: "imv-2026",
    pack: "trabajo",
    path: "/trabajo/ingreso-minimo-vital",
    h1: "Ingreso mínimo vital 2026: cuánto se cobra, requisitos y cómo pedirlo",
    title: "Ingreso mínimo vital 2026: cuantía, requisitos y solicitud",
    description: "IMV 2026: renta garantizada de 733,60 € al mes para un adulto solo, según la Seguridad Social. Requisitos, cómo calcular lo que cobrarías y cómo solicitarlo.",
    lead: "El ingreso mínimo vital (IMV) completa los ingresos de tu hogar hasta una renta garantizada. Para un adulto que vive solo, la Seguridad Social indica 733,60 € al mes en 2026; cobras la diferencia entre esa cantidad y tus ingresos. Se pide en la sede de la Seguridad Social.",
    cta: { href: S.imvSim.href, label: "Simulador oficial del IMV" },
    secondaryCta: { href: S.imvReq.href, label: "Requisitos oficiales" },
    sources: [S.imvSim, S.imvReq, S.imvLey],
    related: [{ href: "/trabajo/cita-previa-sepe", label: "Cita previa del SEPE" }, { href: "/ayudas-por-gobierno/familias", label: "Ayudas a familias según cada gobierno" }, { href: "/dni", label: "DNI gratis para menores en hogares con IMV" }],
    faqs: [
      { q: "¿Cuánto se cobra del ingreso mínimo vital en 2026?", a: "Para un adulto solo, la renta garantizada es de 733,60 € al mes según la Seguridad Social. Lo que cobras es la diferencia entre esa cifra y los ingresos de tu hogar, si sale al menos 10 € al mes. Con más miembros, la cantidad sube." },
      { q: "¿Cómo sé si me corresponde?", a: "Usa el simulador oficial de la Seguridad Social: te pide los miembros del hogar, ingresos y patrimonio y te da una estimación." },
      { q: "¿Dónde se solicita?", a: "En la sede electrónica de la Seguridad Social (con o sin certificado digital) o en sus oficinas. Es gratuito." },
    ],
    sections: [
      { id: "requisitos", title: "Requisitos básicos", paragraphs: ["Resumen; la lista completa está en la web de la Seguridad Social:"], lists: [["Residencia legal y efectiva en España, en general de al menos un año.", "Estar en situación de vulnerabilidad económica según ingresos y patrimonio del hogar.", "Haber solicitado antes las prestaciones a las que tengas derecho.", "Inscribirte como demandante de empleo si tienes entre 18 y 65 años, con excepciones."]] },
      { id: "calculo", title: "Cómo se calcula", paragraphs: ["Renta garantizada de tu tipo de hogar menos los ingresos del hogar. Hay complementos, por ejemplo por hijos (complemento de ayuda para la infancia). Comprueba siempre tu caso en el simulador oficial."] },
    ],
  }),
];
