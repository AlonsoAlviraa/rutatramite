import { escenarioPath } from "@/lib/geo/paths";
import { isFichaIndexable } from "@/lib/seo/localSignals";
import { fichaSeo } from "@/lib/seo/meta";
import type { Municipio, MunicipioIndexEntry } from "@/lib/types";
import { DISCLAIMER_SHORT, ESCENARIO_LABELS, PRODUCT_NAME } from "@/lib/types";

export type FaqItem = { q: string; a: string };
export type HowToStep = { name: string; text: string };
export type FichaSection = { id: string; title: string; paragraphs: string[]; links?: { href: string; label: string }[]; lists?: string[][]; tables?: { caption: string; headers: string[]; rows: string[][] }[] };

export type FichaModel = {
  municipio: Municipio;
  h1: string;
  title: string;
  description: string;
  geoLead: string;
  organo: string;
  canalPhrase: string;
  unverified: boolean;
  sections: FichaSection[];
  faqs: FaqItem[];
  howto: { name: string; steps: HowToStep[] };
  neighbors: { name: string; path: string; poblacion: number | null }[];
  escenarios: { slug: string; label: string; href: string }[];
  disclaimer: string;
  jsonld: unknown[];
};

function fmtNum(n: number | null): string {
  if (n == null) return "cifra INE a contrastar";
  return n.toLocaleString("es-ES");
}

function canalPhrase(m: Municipio): string {
  if (m.online === true && m.cita_previa === "required") {
    return "por sede electrónica con identificación y, en presencial, con cita previa";
  }
  if (m.online === true) return "por sede electrónica del ayuntamiento, y también de forma presencial";
  if (m.cita_previa === "required") return "de forma presencial con cita previa";
  if (m.cita_previa === "walk-in") return "de forma presencial, en ventanilla, según horario municipal";
  if (m.sede_url) return "en el Ayuntamiento, según el canal que publique su sede (online, cita o ventanilla)";
  return "en el Ayuntamiento; el canal concreto (online, cita o ventanilla) debe confirmarse en la web municipal porque esta ficha aún no ha leído un procedimiento local cerrado";
}

function organo(m: Municipio): string {
  return `Ayuntamiento de ${m.name}`;
}

function isCapital(m: Municipio): boolean {
  const capitals = new Set([
    "28079", "08019", "46250", "41091", "50297", "29067", "30030", "07040", "35016", "03014",
    "48020", "14021", "47186", "01059", "18087", "33044", "04013", "11012", "23050", "21041",
    "09059", "37274", "24089", "02003", "06015", "25120", "43148", "17079", "32054", "27028",
    "15078", "39075", "26089", "31201", "38038", "12040", "20069",
  ]);
  return capitals.has(m.ine_code);
}

function metroNote(m: Municipio): string {
  if (m.ccaa_slug === "comunidad-de-madrid" && m.ine_code !== "28079") {
    return ` ${m.name} no es el municipio de Madrid: el padrón se pide en el Ayuntamiento de ${m.name}, no en Línea Madrid. Vivir «en Madrid» cuando el piso está en ${m.name} es el error más caro de esta corona.`;
  }
  if (m.ccaa_slug === "cataluna" && m.ine_code !== "08019" && m.province_slug === "barcelona") {
    return ` El área metropolitana de Barcelona no unifica el padrón: cada término tiene su ayuntamiento. Si el piso está en ${m.name}, el alta se pide aquí, no en el Ayuntamiento de Barcelona.`;
  }
  if (m.ine_code === "28079") {
    return " Madrid ofrece atención presencial en las oficinas Línea Madrid y tramitación electrónica con identificación. Consulta las condiciones de representación y la documentación de todas las personas incluidas en la solicitud.";
  }
  if (m.ine_code === "08019") {
    return " Barcelona publica el trámite en su sede y advierte con frecuencia sobre autorizaciones y copias. El titular de la vivienda y el modelo municipal importan más que un WhatsApp del casero.";
  }
  return "";
}

function ccaaExtras(m: Municipio): string {
  if (m.ccaa_slug === "comunidad-de-madrid") {
    return `En la Comunidad de Madrid el padrón condiciona, entre otros, el abono transporte bonificado (criterio autonómico 2026), la tarjeta sanitaria de zona y el distrito escolar. Empadronarse en ${m.name} no es un trámite cosmética: mueve colegio, centro de salud y, si aplica, tarifa de transporte. El domicilio fiscal de Hacienda sigue yendo por el modelo 030, no por esta hoja padronal.`;
  }
  if (m.ccaa_slug === "cataluna") {
    return `En Cataluña el padrón de ${m.name} alimenta el empadronamiento que usan salud, escuela y muchos trámites de la Generalitat. La sede puede estar en catalán y castellano. Eso no cambia la Ley 7/1985: la obligación de inscribirse es estatal.`;
  }
  if (m.ccaa_slug === "comunidad-valenciana") {
    return `En la Comunidad Valenciana el padrón de ${m.name} es la llave habitual de centro de salud, escolarización y ayudas autonómicas. La referencia catastral aparece en muchas hojas padronales; no es un capricho local, está en el artículo 16 de la LBRL.`;
  }
  if (m.ccaa_slug === "pais-vasco") {
    return `En Euskadi, ${m.name} gestiona el padrón como el resto de ayuntamientos españoles, con idiomas de sede que pueden incluir euskera. El marco estatal (LBRL + instrucciones INE) sigue siendo el que decide quién tiene derecho a constar.`;
  }
  if (m.ccaa_slug === "galicia") {
    return `En Galicia el Ayuntamiento de ${m.name} puede atender en gallego y castellano. El padrón sigue siendo municipal y estatal en su régimen jurídico: no lo sustituye la diputación ni la Xunta.`;
  }
  if (m.ccaa_slug === "canarias" || m.ccaa_slug === "illes-balears") {
    return `En un territorio insular como ${m.ccaa_name}, el término municipal de ${m.name} es el que cuenta. Empadronarse «en la isla» no existe: o es este ayuntamiento o es el del pueblo de al lado.`;
  }
  return `En ${m.ccaa_name} el padrón de ${m.name} es el registro que usan sanidad, escuela y buena parte de las ayudas. No lo pide la diputación: lo pide este ayuntamiento.`;
}

function errores(m: Municipio): string[] {
  const common = [
    `Pedir cita en un clon de pago o en extranjería para un trámite que es del Ayuntamiento de ${m.name}.`,
    `Llevar solo el móvil con una foto del pasaporte. En ventanilla piden original y, a menudo, fotocopia. En ${m.name} no des por hecho que hay fotocopiadora.`,
    `Confundir volante y certificado. El volante informa; el certificado es documento público. Extranjería, notarios y algunas becas piden el segundo.`,
    `Creer que el alta en ${m.name} cambia el domicilio fiscal. Eso va por modelo 030 en la AEAT.`,
    `Pensar que sin TIE no hay padrón. El artículo 15 de la Ley 7/1985 y las instrucciones INE dicen lo contrario: se identifica, no se filtra la situación administrativa.`,
  ];
  if (m.oleada === "A") {
    return [
      ...common,
      `En ciudades de oleada A como ${m.name} el cuello de botella es la cita y la saturación de la OAC central. Prueba otras oficinas del mismo término, no el municipio vecino.`,
      `Una cita, un domicilio. No intentes colar a un amigo empadronado en otro barrio de ${m.name} en tu hueco.`,
      `Usar la sede de la comunidad autónoma o de la diputación cuando el trámite es municipal.`,
    ];
  }
  if (m.oleada === "B") {
    return [
      ...common,
      `En ${m.name} (banda 50–100k) la sede electrónica a veces es una instancia genérica, no un trámite de padrón específico. Lee el procedimiento antes de adjuntar PDFs a ciegas.`,
      `Si vas sin cita, consulta en la sede el horario y si exige turno; el último día del mes no tiene una regla estatal distinta.`,
    ];
  }
  if (m.oleada === "E") {
    return [
      ...common,
      `En un municipio como ${m.name}, el padrón puede tramitarse en el registro general u otro canal local. Confirma el horario y los requisitos en la web del ayuntamiento; esta ficha no inventa teléfono ni cita.`,
      `No copies el teléfono ni la cita de un pueblo vecino. Cada ficha de ${PRODUCT_NAME} omite el teléfono si no está verificado para ${m.name}.`,
    ];
  }
  return [
    ...common,
    `En municipios de ${m.oleada === "C" ? "20 a 50 mil" : "10 a 20 mil"} habitantes como ${m.name}, la sede puede canalizar el alta mediante un registro general o un procedimiento específico. Comprueba el horario y el canal que publique el ayuntamiento.`,
    `No copies el teléfono ni la cita de un pueblo vecino. Cada ficha de ${PRODUCT_NAME} omite el teléfono si no está verificado para ${m.name}.`,
  ];
}

function viviendaRows(m: Municipio): string[][] {
  const extra = m.docs_extra.length
    ? m.docs_extra.join("; ")
    : `Este municipio no ha publicado un extra local; aplica el marco INE. Confirma el modelo en la sede de ${m.name}.`;
  return [
    ["Propietario o usufructuario", "Escritura, nota simple o IBI, con referencia catastral cuando exista."],
    ["Alquiler a tu nombre", "Contrato completo firmado. Recibo o duración mínima solo si la sede de " + m.name + " lo dice."],
    ["Habitación o subarriendo", "Autorización del titular + su documento + prueba de que el titular ocupa la vivienda."],
    ["Casa de familiar", "Autorización del familiar empadronado o titular, más su DNI/NIE y, si lo piden, su volante."],
    ["Sin papeles de la casa / sin techo", "No improvises un truco. Autorización, comprobación de oficio o Servicios Sociales de " + m.name + "."],
    ["Override local", extra],
  ];
}

function identityRows(m: Municipio): string[][] {
  return [
    ["Español/a mayor de 14", "DNI en vigor o pasaporte. Original en presencial en " + m.name + "."],
    ["Español/a menor de 14", "Libro de familia o certificado de nacimiento, y DNI si lo tiene."],
    ["UE / EEE / Suiza", "Pasaporte o documento nacional del país. Certificado de registro si existe, sin convertirlo en filtro."],
    ["Resto de países", "TIE o, en su defecto, pasaporte. Alternativos INE: cédula de inscripción, título de viaje, resguardo de protección internacional."],
    ["Situación administrativa", "El Ayuntamiento de " + m.name + " identifica. La situación administrativa irregular no es causa legal de denegación del alta (art. 15 LBRL e instrucciones INE)."],
  ];
}

function howto(m: Municipio): HowToStep[] {
  const sede = m.sede_url
    ? `Abre la sede del Ayuntamiento de ${m.name}: ${m.sede_url}. No uses un buscador de citas de pago.`
    : `Busca «empadronamiento sede ${m.name} ${m.province_name}» en la web municipal. Esta ficha no inventa la URL.`;
  const cita = m.cita_url
    ? `Pide cita solo en la URL municipal (${m.cita_url}). Una cita, un domicilio.`
    : `Si la sede exige cita, pídela en el dominio del ayuntamiento. Si no hay dato de cita en esta ficha, no inventamos el enlace.`;
  const online =
    m.online === true
      ? `Si tienes Cl@ve, certificado o DNIe, usa el canal electrónico de ${m.name}, adjunta PDFs legibles y guarda el justificante de registro.`
      : `No damos por hecho un trámite online específico en ${m.name} hasta leerlo en la sede. Si solo hay instancia genérica, úsala con el asunto «alta padronal» y pregunta el código del procedimiento.`;
  return [
    { name: "Confirma el municipio real", text: `Comprueba que el piso está en el término de ${m.name} (${m.province_name}), no en un vecino. El INE identifica este ente con el código ${m.ine_code}.` },
    { name: "Lee esta ficha y el marco estatal", text: `El alta es gratuita. Identidad + uso de la vivienda. Estar irregular no impide el alta. El órgano es el ${organo(m)}.` },
    { name: "Abre la sede oficial", text: sede },
    { name: "Elige canal", text: online },
    { name: "Cita presencial si aplica", text: cita },
    { name: "Reúne identidad", text: `Original y copia. El perfil (español, UE, resto) cambia el documento, no el derecho a constar en ${m.name}.` },
    { name: "Reúne vivienda", text: `Escritura, contrato, autorización del titular o vía de Servicios Sociales. Lleva el modelo municipal si ${m.name} lo publica.` },
    { name: "Menores y representación", text: `Si hay menores, anexos INE o consentimiento. Si alguien te representa, Ley 39/2015 art. 5: documentos de ambos.` },
    { name: "Firma y revisa", text: `Firman los mayores de edad que se inscriben. Revisa nombre, documento y dirección de ${m.name} antes de salir.` },
    { name: "Pide volante y pregunta el certificado", text: `El volante acredita de forma rápida. El certificado o el histórico son los que suele pedir extranjería. En ${m.name} pregunta el canal (Cl@ve, OAC, 010 local si existe).` },
    { name: "Si hay denegación", text: `Pide el motivo por escrito. Contrasta con el artículo 15 y con los escenarios de ${PRODUCT_NAME}. No pagues a quien «tenga enchufe» en ${m.name}.` },
  ];
}

function faqs(m: Municipio): FaqItem[] {
  const sedeLine = m.sede_url
    ? `La sede de referencia en esta ficha es ${m.sede_url}.`
    : `Todavía no hay una URL de sede leída para ${m.name}: confirma el procedimiento en la web del ayuntamiento.`;
  const citaLine = m.cita_url
    ? `Hay un enlace de cita municipal verificado (${m.cita_url}). Úsalo; no pagues la cita.`
    : `Esta ficha no publica un enlace de cita porque no está verificado para ${m.name}. Si la sede lo exige, pídela en su dominio.`;
  const pop = fmtNum(m.poblacion);

  return [
    {
      q: `¿Puedo empadronarme en ${m.name} sin contrato de alquiler?`,
      a: `Sí, el padrón registra un hecho de residencia, no un contrato visado. En ${m.name} la vía habitual sin contrato a tu nombre es la autorización del titular de la vivienda (mejor en modelo municipal) más el documento del titular y prueba de que ese titular ocupa la casa. Si no hay papeles de ningún tipo, no inventes un recibo: pregunta comprobación de oficio o Servicios Sociales. Las instrucciones INE (resolución de 17 de febrero de 2020, texto consolidado) detallan identidad y domicilio. Un rumor de foro no deroga el artículo 15 de la Ley 7/1985. ${sedeLine} El alta sigue siendo gratuita.`,
    },
    {
      q: `¿Hace falta cita previa para empadronarse en ${m.name}?`,
      a: `Depende del canal que publique el Ayuntamiento de ${m.name}, no de una norma estatal única. El campo de esta ficha vale hoy «${m.cita_previa}». ${citaLine} En oleada ${m.oleada} (${m.banda ?? "banda local"}) la disponibilidad depende de la agenda y del canal que publique el ayuntamiento. No pidas hora en el pueblo de al lado ni en un 807. Si hay canal electrónico con Cl@ve, úsalo y guarda el justificante.`,
    },
    {
      q: `¿El volante de empadronamiento de ${m.name} vale para extranjería?`,
      a: `A menudo no. El volante es informativo y rápido. El certificado es documento público fehaciente; el histórico acredita movimientos y fechas, que es lo que suele pedir un arraigo o una renovación. En ${m.name} pregunta en la sede cómo se expide cada uno y si hay tasa de certificado (el alta, en cambio, es 0 €). No existe una caducidad legal única de «tres meses» para todo uso: quien te lo pide suele exigir fecha reciente. ${sedeLine}`,
    },
    {
      q: `¿Puedo empadronarme en ${m.name} si estoy en situación irregular?`,
      a: `Sí. La inscripción padronal es independiente de la situación jurídico-administrativa en España. Lo dice el artículo 15 de la Ley 7/1985 y lo recuerdan las instrucciones técnicas del INE a los ayuntamientos. El Ayuntamiento de ${m.name} puede y debe identificarte (pasaporte, TIE, cédula, título de viaje, resguardo de protección internacional). No puede convertir el padrón en un permiso de residencia ni negarte el alta «porque estás irregular». Si una ventanilla lo hace, pide el motivo por escrito y contrasta con la norma estatal. Esta guía no litiga por ti.`,
    },
    {
      q: `¿Hace falta TIE para el alta en el padrón de ${m.name}?`,
      a: `No como requisito nacional. La TIE es un documento de identidad para quien la tiene; no es la llave del padrón. Si no tienes TIE, el pasaporte u otro documento previsto por el INE identifica. Presentar la TIE como condición sine qua non en ${m.name} es una práctica local que esta ficha no blanquea como si fuera la ley. El producto ${PRODUCT_NAME} no afirma que el ayuntamiento pueda exigir TIE para el alta. Identifícate con lo que tengas previsto en las instrucciones y acredita la vivienda.`,
    },
    {
      q: `¿Cuánto cuesta empadronarse en ${m.name}?`,
      a: `El alta ordinaria en el padrón es gratuita en toda España. En los datos de ${m.name} la tasa de alta es 0 €. Nadie puede cobrarte el alta ni venderte la cita. El volante suele ser gratis. El certificado o el histórico pueden tener tasa si lo dice la ordenanza municipal; esta ficha solo publicaría esa cifra si estuviera leída en fuente. Desconfía de gestoras que ofrezcan «empadronamiento express» de pago en ${m.name}.`,
    },
    {
      q: `¿Puedo incluir menores en el alta de ${m.name}?`,
      a: `Sí. Quien tenga la guarda inscribe al menor en ${m.name}. Hace falta el documento del menor (libro de familia o nacimiento, DNI si lo tiene) y el consentimiento del otro progenitor, una resolución judicial o la declaración responsable de los anexos INE. Un ayuntamiento no puede inventar un régimen de custodia. Empadronar al niño en casa de un familiar «por la plaza de colegio» en ${m.name} es un uso frecuente y un riesgo: pueden comprobar la residencia real.`,
    },
    {
      q: `¿Cómo pido el certificado de empadronamiento en ${m.name}?`,
      a: `En la misma administración que gestiona el padrón: el Ayuntamiento de ${m.name}. Canales típicos, cuando existen: sede con Cl@ve, OAC, teléfono municipal (solo si está verificado; aquí no se inventa) o correo. ${sedeLine} El certificado lo firma quien tiene competencia. Para extranjería pide fecha reciente y, si te piden trayectoria, el histórico. No mezcles este botón con el de la TIE ni con el de Hacienda.`,
    },
    {
      q: `¿Qué pasa con mi padrón anterior al empadronarme en ${m.name}?`,
      a: `No tienes que «darte de baja» antes en el municipio de origen. El alta en ${m.name} dispara la coordinación con el INE y la baja en origen. Si vives en varios sitios, te inscribes donde habitas más tiempo al año. Si te mudas dentro del mismo ${m.name}, es un cambio de domicilio, no un alta nueva. Conserva volantes antiguos si estás armando un histórico para un arraigo.`,
    },
    {
      q: `¿Puedo empadronarme online en ${m.name} con Cl@ve?`,
      a: `Solo si la sede del Ayuntamiento de ${m.name} ofrece ese canal, no una instancia genérica disfrazada. El campo online de esta ficha es «${String(m.online)}». ${sedeLine} Cl@ve, certificado o DNIe identifican al solicitante. Adjunta PDFs nítidos, no fotos nocturnas del contrato. Guarda el justificante. Si la sede es JS-only o está caída, el canal presencial sigue existiendo.`,
    },
    {
      q: `¿El padrón de ${m.name} cambia mi domicilio fiscal?`,
      a: `No automáticamente. Empadronarte en ${m.name} acredita residencia habitual a efectos de padrón y de muchos trámites municipales y autonómicos. El domicilio fiscal se comunica a la AEAT por sus cauces (modelo 030 u otros). Cada año hay quien se enfada con Hacienda por haber confundido las dos cosas. Haz los dos trámites si te has mudado de verdad. Esta ficha no es asesoramiento tributario personalizado.`,
    },
    {
      q: `¿Cada cuánto deben renovar el padrón los extranjeros no comunitarios en ${m.name}?`,
      a: `Cada dos años si no tienen autorización de residencia de larga duración o permanente. Si no se renueva, puede declararse la caducidad y la baja. El Ayuntamiento de ${m.name} suele avisar; no lo des por hecho. Esta renovación no es renovar la TIE ni el NIE. El cauce suele ser el mismo que el alta. Mira el escenario nacional de renovación a 2 años y confirma el modelo en la sede local.`,
    },
    {
      q: `¿Qué hago si el Ayuntamiento de ${m.name} me deniega el alta?`,
      a: `Pide que te indiquen el motivo y los documentos que faltan. Si no hay citas, consulta al Ayuntamiento de ${m.name} qué oficinas y canales admite para ese procedimiento: una sede electrónica general no confirma que el alta esté disponible por internet. Ante una resolución desfavorable, revisa su notificación y los plazos y vías de recurso indicados. Si necesitas valorar tu caso, busca orientación jurídica. ${PRODUCT_NAME} no presenta recursos por ti.`,
    },
    {
      q: `¿Puedo empadronarme en ${m.name} en casa de un familiar?`,
      a: `Sí, si resides allí habitualmente. El familiar titular o ya empadronado autoriza, aporta su documento y, a menudo, su propio volante o escritura. En ${m.name} no conviertas esto en un empadronamiento de favor para una plaza escolar: el ayuntamiento puede comprobar. El escenario nacional «casa de familiar» desarrolla el marco; esta ficha solo añade el canal local cuando está verificado.`,
    },
    {
      q: `¿Cuánto tarda el alta en el padrón de ${m.name}?`,
      a: `Puede ser inmediata en ventanilla o tardar días si hay comprobación de la vivienda. ${m.name} tiene ${pop} habitantes de referencia a 1 de enero de 2025 (${m.poblacion_ref}). En ciudades grandes la espera está en la cita; en medianas, en el registro. El efecto frente a terceros (colegio, salud, extranjería) depende de que los datos estén bien: un error de letra en el apellido persigue el censo. Pide volante al salir y revisa la dirección.`,
    },
  ];
}

function geoLead(m: Municipio): string {
  const fecha = m.last_verified;
  const canal = canalPhrase(m);
  const org = organo(m);
  const sede = m.sede_url
    ? `Contrasta la sede: ${m.sede_url}.`
    : `Contrasta la sede buscando «empadronamiento sede ${m.name} ${m.province_name}»; esta ficha no inventa la URL.`;
  const pop = m.poblacion != null ? `${fmtNum(m.poblacion)} habitantes a 1 de enero de 2025` : "población INE a contrastar";
  const verifiedBit = isFichaIndexable(m)
    ? `, según la sede del ayuntamiento (verificada ${fecha})`
    : `. El procedimiento local concreto está pendiente de verificación y esta ficha no afirma un canal cerrado`;
  return `En ${m.name} el alta en el padrón se hace ${canal} en el ${org}${verifiedBit}. El alta es gratuita. Hace falta identidad y prueba de uso de la vivienda. Estar irregular no impide el alta (artículo 15 de la Ley 7/1985). ${sede} Población de referencia: ${pop}. Código INE ${m.ine_code}. Provincia de ${m.province_name}, ${m.ccaa_name}.`;
}

function whatIs(m: Municipio): string[] {
  return [
    `El Padrón municipal es el registro administrativo de los vecinos. En ${m.name} lo gestiona el ${organo(m)}, no ${PRODUCT_NAME}, no la Policía Nacional y no el 060. Los datos prueban la residencia y el domicilio habitual (artículo 16.1 de la Ley 7/1985). Las certificaciones tienen carácter de documento público.`,
    `Si necesitas acreditar tu domicilio para otra solicitud, comprueba qué documento exige el organismo que la recibe: volante, certificado o histórico. Los requisitos de una ayuda o servicio deben consultarse en su propia convocatoria; esta ficha no confirma que cumplas sus condiciones.`,
  ];
}

function whoCan(m: Municipio): string[] {
  return [
    `Cualquier persona que viva habitualmente en el término de ${m.name} está obligada a inscribirse: española, de la UE/EEE/Suiza, del resto de países, con o sin autorización de residencia. Quien viva en varios municipios se inscribe donde más tiempo pasa al año.`,
    `El Ayuntamiento de ${m.name} identifica a la persona. No filtra extranjería. Un menor se inscribe por quien tenga la guarda. Quien no tiene techo no queda fuera del registro: Servicios Sociales puede fijar un domicilio de referencia. Infravivienda, chabola, caravana o cueva pueden ser domicilio a estos efectos.`,
    `La Resolución de la Presidencia del INE de 17 de febrero de 2020 insiste: el documento de identidad comprueba datos, no filtra irregulares. ${m.name} no puede exigir autorización de residencia como requisito de alta, ni que el contrato esté a nombre de todos, ni que la vivienda cumpla normas urbanísticas para inscribir el hecho de residir. Empadronarse no crea título civil de ocupación.`,
  ];
}

function howOnline(m: Municipio): string[] {
  if (m.online === true) {
    return [
      `Hay canal electrónico verificado en ${m.name}. Identifícate con Cl@ve, certificado o DNIe. Adjunta el contrato o la autorización en PDF legible. Descarga el justificante. Si la sede pide la referencia catastral, no es un invento de ${m.name}: está en el artículo 16.2.c de la LBRL.`,
    ];
  }
  if (m.sede_url) {
    return [
      `Hay web municipal leída (${m.sede_url}) pero esta ficha no afirma un trámite de padrón online específico hasta ver el procedimiento. Entra, busca «padrón» o «empadronamiento» y no adjuntes documentos a un registro genérico sin leer las instrucciones de ${m.name}.`,
    ];
  }
  return [
    `No hay URL de sede leída para ${m.name}. No inventamos el enlace. Busca la sede en el dominio del ayuntamiento y desconfía de anuncios de cita de pago. El marco estatal (identidad + vivienda) aplica igual.`,
  ];
}

function howPresencial(m: Municipio): string[] {
  const oficinas = m.oficinas.filter((o) => o.nombre);
  const oficinaTxt = oficinas.length
    ? oficinas
        .map((o) => {
          const bits = [o.nombre];
          if (o.direccion) bits.push(o.direccion);
          if (o.horario) bits.push(o.horario);
          if (o.telefono) bits.push(`tel. ${o.telefono}`);
          return bits.join(" — ");
        })
        .join(" ")
    : `Registro u OAC del Ayuntamiento de ${m.name}. Confirma dirección y horario en la web municipal. Esta ficha no copia el teléfono de un municipio vecino.`;
  return [
    `Cita previa: ${{ required: "obligatoria según la información de la ficha", recommended: "recomendada", "walk-in": "atención sin cita según horario", unknown: "pendiente de confirmar" }[m.cita_previa]}. Consulta qué originales o copias se necesitan y si puede presentar la solicitud una persona representante. No todas las personas incluidas en el alta tienen que acudir necesariamente en persona: comprueba las autorizaciones admitidas por ${m.name}.`,
    oficinaTxt,
  ];
}

function volante(m: Municipio): string[] {
  return [
    `El volante de ${m.name} es informativo. Sirve para muchos trámites internos y para acreditar de forma rápida que estás padronado. No exige las formalidades del certificado.`,
    `El certificado es documento público fehaciente. Lo piden extranjería, notarios, algunas becas, algunos colegios y algunas ayudas. Pregunta en ${m.name} si se obtiene con Cl@ve en el acto o si hay espera.`,
    `El histórico acredita altas, bajas, domicilios anteriores y fechas. Para un arraigo suele ser el documento útil, no el volante de ayer. Tasas: alta 0 €; volante ${m.tasa_volante == null ? "no publicada en esta ficha" : `${m.tasa_volante} €`}; certificado ${m.tasa_certificado == null ? "no publicada en esta ficha" : `${m.tasa_certificado} €`}.`,
  ];
}

function renovacion(m: Municipio): string[] {
  return [
    `La inscripción de extranjeros no comunitarios sin autorización de residencia de larga duración o permanente debe renovarse cada dos años también en ${m.name}. Si no, puede haber caducidad y baja. El ayuntamiento suele avisar; no lo des por hecho.`,
    `Esta renovación no es renovar la TIE. El cauce suele ser la misma sede o la misma OAC del alta. Mira el escenario nacional y el modelo INE. Si ${m.name} publica un extra, estará en docs_extra; hoy: ${m.docs_extra.length ? m.docs_extra.join("; ") : "sin extra local verificado"}.`,
  ];
}

function plazos(m: Municipio): string[] {
  return [
    `El alta en ${m.name} puede ser inmediata o demorarse si comprueban la vivienda. Comprobar no es lo mismo que exigir un contrato de seis meses ante notario. La baja en origen la coordina el INE.`,
    `El padrón no cambia el domicilio fiscal (modelo 030). Tampoco es la TIE, ni el NIE, ni la tarjeta sanitaria, ni el censo electoral en sentido estricto, aunque alimenta el censo. No mezcles esos destinos en un solo botón en ${m.name}.`,
  ];
}

function peculiar(m: Municipio): string[] {
  if (m.peculiaridades?.length) {
    return m.peculiaridades.map((p) => `${m.name}: ${p}`);
  }
  return [
    `No hay peculiaridades locales leídas para ${m.name} más allá del marco INE. Eso no significa que la ventanilla no tenga un modelo propio: significa que esta ficha no lo inventa.`,
  ];
}

function legalBlock(m: Municipio): string[] {
  return [
    `Marco estatal que ${m.name} no puede saltarse. Artículo 15 LBRL: obligación de inscribirse donde se reside habitualmente; la inscripción es independiente de la situación administrativa. Artículo 16: datos obligatorios, incluida la referencia catastral cuando exista. Reglamento de Población (RD 1690/1986): gestión, comprobación, altas por omisión, bajas, coordinación INE. Instrucciones técnicas INE (BOE-A-2020-4784, texto consolidado): identidad, vivienda, menores, renovación de no comunitarios, volante y certificación.`,
    `El Ayuntamiento de ${m.name} puede identificar, pedir prueba razonable de vivienda, usar sus modelos, exigir cita, ofrecer Cl@ve, cruzar catastro y denegar un alta manifiestamente falsa. No puede cobrar el alta ordinaria, convertir el padrón en permiso de residencia, exigir que el contrato esté visado «porque sí» si la persona reside, ni rechazar a un menor cuando cabe declaración responsable. Si ves una práctica local dura, esta ficha la describiría como práctica local y enlazaría la norma. No la blanqueamos.`,
    `Fuentes de referencia: Ley 7/1985 (BOE-A-1985-5392), instrucciones de gestión del padrón (BOE-A-2020-4784, texto consolidado), modelos y relación de municipios del INE. Fecha registrada en la ficha: ${m.last_verified}. La revisión local y los aspectos pendientes se indican por separado; esta fecha no acredita que todos los requisitos o canales municipales estén comprobados.`,
  ];
}

export function neighborsOf(m: Municipio, index: MunicipioIndexEntry[], n = 5): MunicipioIndexEntry[] {
  return index
    .filter((x) => x.province_code === m.province_code && x.ine_code !== m.ine_code)
    .sort((a, b) => (b.poblacion ?? 0) - (a.poblacion ?? 0))
    .slice(0, n);
}

export function buildFichaModel(m: Municipio, index: MunicipioIndexEntry[]): FichaModel {
  const nb = neighborsOf(m, index);
  const canal = canalPhrase(m);
  const org = organo(m);
  const unverified = !isFichaIndexable(m);
  const seo = fichaSeo(m);
  const title = seo.title;
  const description = seo.description;
  const escenarios = (["sin-contrato", "extranjeros-no-ue", "volante-vs-certificado"] as const).map((slug) => ({
    slug,
    label: ESCENARIO_LABELS[slug],
    href: escenarioPath(slug),
  }));

  const sections: FichaSection[] = [
    {
      id: "que-es",
      title: `Qué es el padrón en ${m.name}`,
      paragraphs: whatIs(m),
    },
    {
      id: "quien",
      title: "Quién puede empadronarse",
      paragraphs: whoCan(m),
    },
    {
      id: "identidad",
      title: "Documentos de identidad",
      paragraphs: [
        `Tabla-marco INE aplicada a ${m.name}. Originales en presencial. El documento identifica; no es un filtro de extranjería.`,
      ],
      tables: [{ caption: "Identidad", headers: ["Perfil", "Documento"], rows: identityRows(m) }],
    },
    {
      id: "vivienda",
      title: "Documentos de vivienda",
      paragraphs: [
        `Cinco vías más el override local. En ${m.name} no conviertas un rumor de oficina en dogma nacional. Las facturas de suministro solo cuentan si esa sede lo dice.`,
      ],
      tables: [{ caption: "Vivienda", headers: ["Vía", "Qué llevar"], rows: viviendaRows(m) }],
    },
    {
      id: "sin-contrato",
      title: `Empadronarse sin contrato en ${m.name}`,
      paragraphs: [
        `Si el contrato no está a tu nombre, el escenario nacional «sin contrato» es la guía larga. Aquí, en ${m.name}, el cruce local es: autorización del titular + su documento + prueba de ocupación, o Servicios Sociales si no hay techo. Mentir en una autorización es delito. El casero no puede «prohibirte» empadronarte si resides; otra cosa es que el ayuntamiento compruebe el hecho.`,
        `Habitación, verbal o familiar: no improvises un contrato de tres líneas en el bar. Usa el modelo de ${m.name} si existe. Enlaza el escenario nacional y vuelve a esta ficha para el canal.`,
      ],
    },
    {
      id: "como",
      title: `Cómo hacerlo en ${m.name}`,
      paragraphs: [...howOnline(m), ...howPresencial(m)],
    },
    {
      id: "oficinas",
      title: "Oficinas",
      paragraphs: howPresencial(m).slice(-1),
    },
    {
      id: "volante",
      title: "Volante, certificado e histórico",
      paragraphs: volante(m),
    },
    {
      id: "renovacion",
      title: "Renovación de extranjeros no comunitarios",
      paragraphs: renovacion(m),
    },
    {
      id: "plazos",
      title: "Plazos y efectos",
      paragraphs: plazos(m),
    },
    {
      id: "peculiaridades",
      title: "Peculiaridades locales",
      paragraphs: peculiar(m),
    },
    {
      id: "errores",
      title: `Errores frecuentes en ${m.name}`,
      paragraphs: [`Comprueba estos puntos antes de presentar tu solicitud en ${m.name}.`],
      lists: [errores(m)],
    },
    {
      id: "marco",
      title: "Normativa de referencia",
      paragraphs: legalBlock(m),
    },
    {
      id: "fuentes",
      title: "Fuentes",
      paragraphs: [
        `INE población: ${m.poblacion_ref}. Código ${m.ine_code}.`,
        `Consulta las fuentes originales antes de presentar documentos. La fecha registrada de esta ficha es ${m.last_verified}; si aparece el aviso de verificación pendiente, los requisitos municipales todavía necesitan comprobación.`,
      ],
      links: [...new Set([...(m.tramite_alta_url ? [m.tramite_alta_url] : []), ...m.source_urls])].map((href) => ({ href, label: `Fuente: ${new URL(href).hostname}` })),
    },
  ];

  const ht = howto(m);
  const faqItems = faqs(m);
  const jsonld: unknown[] = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `Empadronarse en ${m.name}`,
      description: geoLead(m),
      step: ht.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "GovernmentService",
      name: `Alta en el Padrón municipal de ${m.name}`,
      provider: { "@type": "GovernmentOrganization", name: org },
      serviceType: "Empadronamiento",
      areaServed: m.name,
      ...(m.sede_url ? { url: m.sede_url } : {}),
    },
  ];
  for (const o of m.oficinas ?? []) {
    if (!(o.direccion ?? "").trim()) continue;
    // A directory instruction is not a street address or a physical office.
    if (m.confidence !== "official" || /consultar|listado|según|pendiente|confirmar/i.test(o.direccion ?? "")) continue;
    jsonld.push({
      "@context": "https://schema.org",
      "@type": "CivicStructure",
      name: o.nombre,
      address: {
        "@type": "PostalAddress",
        streetAddress: o.direccion,
        addressLocality: m.name,
        addressCountry: "ES",
        ...(o.cp ? { postalCode: o.cp } : {}),
      },
      ...(o.telefono ? { telephone: o.telefono } : {}),
    });
  }

  return {
    municipio: m,
    h1: `Empadronarse en ${m.name}`,
    title,
    description,
    geoLead: geoLead(m),
    organo: org,
    canalPhrase: canal,
    unverified,
    sections,
    faqs: faqItems,
    howto: { name: `Cómo empadronarse en ${m.name}`, steps: ht },
    neighbors: nb.map((x) => ({ name: x.name, path: x.path, poblacion: x.poblacion })),
    escenarios,
    disclaimer: DISCLAIMER_SHORT,
    jsonld,
  };
}

export function fichaWordFloor(m: Municipio): number {
  if (m.oleada === "A") return 1800;
  if (m.oleada === "E") return 800;
  return 1200;
}
