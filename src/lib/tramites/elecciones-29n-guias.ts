import type { Guide } from "@/lib/tramites/types";
import { ampliar29n } from "@/lib/tramites/elecciones-29n-ampliacion";

/** 30 guías prácticas para las elecciones a Cortes Generales del 29 de noviembre de 2026 (RD 806/2026). */
const reviewedAt = "2026-10-16";
const LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672";

const S = {
  rd: { href: "https://www.boe.es/eli/es/rd/2026/10/05/806", label: "BOE: Real Decreto 806/2026, convocatoria del 29 de noviembre" },
  jec: { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario electoral de las elecciones generales 2026" },
  ine: { href: "https://www.ine.es/dyngs/Prensa/EG2026.htm", label: "INE: nota de prensa de la Oficina del Censo Electoral para el 29 de noviembre" },
  ineSede: { href: "https://sede.ine.gob.es/tramite/censo_electoral/", label: "Sede del INE: consulta de inscripción en el censo electoral" },
  ext: { href: "https://www.exteriores.gob.es/es/Paginas/Elecciones.aspx", label: "Ministerio de Asuntos Exteriores: cómo votar desde el extranjero el 29 de noviembre" },
  pag: { href: "https://administracion.gob.es/pag_Home/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/residencia/elecciones/votar-desde-extranjero", label: "Punto de Acceso General: votar desde el extranjero" },
  correos: { href: "https://www.correos.es/es/es/particulares/para-el-ciudadano/voto-por-correo", label: "Correos: solicitud del voto por correo" },
  correosNota: { href: "https://www.correos.com/sala-prensa/ya-se-puede-solicitar-el-voto-por-correo-para-las-elecciones-generales-del-29-de-noviembre/", label: "Correos, 6 de octubre de 2026: plazos de esta convocatoria" },
  mesaInfo: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/miembros-de-mesa/informacion-general/permisos-y-dietas/", label: "Ministerio del Interior (Infoelectoral): permisos y dietas de los miembros de mesa" },
  votoInfo: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/preguntas-frecuentes/como-votar/voto-presencial-voto-en-mesa/", label: "Ministerio del Interior (Infoelectoral): voto presencial en la mesa" },
  dieta: { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-13948", label: "BOE: Orden INT/650/2026, dieta de los miembros de las mesas electorales" },
  jecElectores: { href: "https://www.juntaelectoralcentral.es/cs/jec/informacion/enlaces/Electores", label: "Junta Electoral Central: información para electores" },
  rd605: { href: "https://www.boe.es/eli/es/rd/1999/04/16/605", label: "BOE: Real Decreto 605/1999, de regulación complementaria de los procesos electorales" },
  braille: { href: "https://www.boe.es/eli/es/rd/2007/12/07/1612", label: "BOE: Real Decreto 1612/2007, voto accesible para personas ciegas" },
  erta: { href: "https://www.boe.es/eli/es/rd/2007/12/07/1621", label: "BOE: Real Decreto 1621/2007, voto de los temporalmente ausentes" },
  infoelectoral: { href: "https://infoelectoral.interior.gob.es/", label: "Ministerio del Interior: Infoelectoral" },
  loreg: (anchor: string, label: string) => ({ href: `${LOREG}#${anchor}`, label: `LOREG, ${label}` }),
};

const DISCLAIMER =
  "No somos la Junta Electoral, la Oficina del Censo Electoral, Correos ni un consulado. Las fechas salen del calendario de la Junta Electoral Central y de las notas oficiales citadas. Si una fuente oficial cambia un plazo, manda la fuente oficial.";

const R = {
  correo: { href: "/elecciones/voto-por-correo", label: "Voto por correo: plazos de esta convocatoria" },
  calendario: { href: "/elecciones/calendario-29-noviembre", label: "Calendario del 29 de noviembre" },
  quien: { href: "/elecciones/quien-puede-votar", label: "Quién puede votar el 29 de noviembre" },
  internet: { href: "/elecciones/pedir-voto-por-correo-por-internet", label: "Pedir el voto por correo por internet" },
  oficina: { href: "/elecciones/pedir-voto-por-correo-en-correos", label: "Pedir el voto por correo en una oficina" },
  documentacion: { href: "/elecciones/documentacion-voto-por-correo", label: "Qué te llega a casa para votar por correo" },
  enviar: { href: "/elecciones/enviar-voto-por-correo", label: "Cómo enviar el voto por correo" },
  noLlega: { href: "/elecciones/no-me-llega-voto-por-correo", label: "Si no te llega la documentación" },
  presencial: { href: "/elecciones/votar-en-persona-tras-pedir-correo", label: "Pedí el voto por correo: ¿puedo votar en la mesa?" },
  cera: { href: "/elecciones/voto-residentes-extranjero-cera", label: "Votar si vives en el extranjero (CERA)" },
  erta: { href: "/elecciones/voto-temporalmente-fuera-erta", label: "Votar si estás fuera de España una temporada (ERTA)" },
  censo: { href: "/elecciones/consultar-censo-electoral", label: "Consultar el censo y reclamar" },
  donde: { href: "/elecciones/donde-voto-mesa-electoral", label: "Dónde voto: mesa y colegio electoral" },
  llevar: { href: "/elecciones/que-llevar-a-votar", label: "Qué documento llevar a votar" },
  caducado: { href: "/elecciones/dni-caducado-votar", label: "¿Puedo votar con el DNI caducado?" },
  mesa: { href: "/elecciones/miembro-de-mesa", label: "Me ha tocado mesa electoral" },
  dietas: { href: "/elecciones/miembro-de-mesa-dieta-y-permisos", label: "Dieta y permisos de los miembros de mesa" },
  permiso: { href: "/elecciones/permiso-trabajo-para-votar", label: "Permiso en el trabajo para ir a votar" },
  braille: { href: "/elecciones/voto-accesible-braille", label: "Voto accesible en braille" },
  hospital: { href: "/elecciones/votar-hospitalizado-o-enfermo", label: "Votar si estás hospitalizado o enfermo" },
  primera: { href: "/elecciones/votar-por-primera-vez", label: "Votar por primera vez" },
  extranjeros: { href: "/elecciones/extranjeros-pueden-votar-generales", label: "¿Pueden votar los extranjeros el 29-N?" },
  nulo: { href: "/elecciones/voto-nulo-y-voto-en-blanco", label: "Voto nulo y voto en blanco" },
  dhondt: { href: "/elecciones/como-se-reparten-los-escanos", label: "Cómo se reparten los escaños" },
  senado: { href: "/elecciones/como-votar-al-senado", label: "Cómo se vota al Senado" },
  reflexion: { href: "/elecciones/jornada-de-reflexion", label: "Jornada de reflexión" },
  encuestas: { href: "/elecciones/encuestas-prohibidas", label: "Encuestas: cuándo no se publican" },
  interventores: { href: "/elecciones/interventores-y-apoderados", label: "Interventores y apoderados" },
  domicilio: { href: "/elecciones/cambio-de-domicilio-y-censo", label: "Me he mudado: ¿dónde voto?" },
  resultados: { href: "/elecciones/resultados-y-escrutinio", label: "Resultados y escrutinio" },
  jecGuia: { href: "/elecciones/junta-electoral-central", label: "Qué es la Junta Electoral Central" },
  bulos: { href: "/elecciones/bulos-y-fraudes-electorales", label: "Bulos y fraudes en elecciones" },
  programas: { href: "/elecciones/programas-electorales-29n", label: "Programas electorales del 29-N: cuándo salen" },
  faq: { href: "/elecciones/preguntas-frecuentes-29n", label: "Preguntas frecuentes del 29-N" },
  jornada: { href: "/elecciones/como-votar-el-dia-29", label: "Cómo se vota el día 29, paso a paso" },
};

type Base = Omit<Guide, "pack" | "reviewedAt" | "disclaimer">;
const g = (x: Base): Guide => ({ pack: "elecciones", reviewedAt, disclaimer: DISCLAIMER, ...x });

const BASE_29N_GUIDES: Guide[] = [
  g({
    id: "29n-pedir-correo-internet",
    path: "/elecciones/pedir-voto-por-correo-por-internet",
    h1: "Pedir el voto por correo por internet",
    title: "Pedir el voto por correo por internet (29-N)",
    description:
      "Pide el voto por correo en la web de Correos con certificado digital o DNI electrónico hasta el 19 de noviembre de 2026. Pasos y qué pasa después.",
    lead:
      "Sí, se puede pedir por internet: en la web de Correos, con certificado digital de persona física o con DNI electrónico, hasta el 19 de noviembre de 2026. Sin firma electrónica, tienes que ir a una oficina de Correos.",
    cta: S.correos,
    secondaryCta: S.jec,
    sources: [S.correos, S.correosNota, S.jec, S.loreg("asetentaydos", "artículo 72: solicitud del voto por correo")],
    related: [R.oficina, R.documentacion, R.enviar, R.correo],
    faqs: [
      { q: "¿Puedo pedir el voto por correo por internet sin certificado digital?", a: "No. Correos pide firma electrónica: certificado de persona física reconocido o DNI electrónico. Sin ella, la solicitud se hace en persona en una oficina de Correos." },
      { q: "¿Hasta cuándo puedo pedirlo?", a: "Hasta el 19 de noviembre de 2026, según el calendario de la Junta Electoral Central y la nota de Correos del 6 de octubre." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Pasos",
        paragraphs: ["Ten a mano tu certificado digital o tu DNI electrónico con lector o con el móvil compatible. El trámite es gratuito."],
        lists: [[
          "Entra en la página de voto por correo de Correos (enlace oficial abajo).",
          "Identifícate con tu certificado o DNI electrónico.",
          "Escribe la dirección donde quieres recibir la documentación. Puede ser distinta de tu domicilio.",
          "Firma y guarda el justificante de la solicitud.",
        ]],
      },
      {
        id: "despues",
        title: "Qué pasa después",
        paragraphs: [
          "Correos pasa la solicitud a la Oficina del Censo Electoral. Según el calendario de la Junta Electoral Central, la documentación se envía entre el 9 y el 22 de noviembre de 2026.",
          "Una vez pedido el voto por correo y anotado en el censo, ya no puedes votar en la mesa (artículo 73 de la LOREG).",
        ],
      },
    ],
  }),
  g({
    id: "29n-pedir-correo-oficina",
    path: "/elecciones/pedir-voto-por-correo-en-correos",
    h1: "Pedir el voto por correo en una oficina de Correos",
    title: "Pedir el voto por correo en Correos: qué llevar",
    description:
      "Pide el voto por correo en una oficina de Correos, en persona y con DNI, pasaporte o carné de conducir original. Plazo: hasta el 19 de noviembre de 2026.",
    lead:
      "Vas tú en persona a cualquier oficina de Correos con tu DNI, pasaporte o permiso de conducir original, hasta el 19 de noviembre de 2026. No vale fotocopia. Si estás enfermo, puede ir otra persona con autorización notarial o consular y certificado médico.",
    cta: S.correos,
    secondaryCta: S.correosNota,
    sources: [S.correos, S.correosNota, S.jec, S.loreg("asetentaydos", "artículo 72: solicitud del voto por correo")],
    related: [R.internet, R.hospital, R.documentacion, R.correo],
    faqs: [
      { q: "¿Puede ir otra persona a pedirlo por mí?", a: "Solo si tienes una enfermedad o discapacidad que te impida ir. Hace falta autorización ante notario o consulado y un certificado médico oficial. Cada representante solo puede representar a un elector." },
      { q: "¿Cuesta dinero?", a: "No. La solicitud del voto por correo es gratuita." },
    ],
    sections: [
      {
        id: "checklist",
        title: "Qué llevar",
        paragraphs: ["Comprueba esta lista antes de salir de casa."],
        lists: [["DNI, pasaporte o permiso de conducir original.", "La dirección donde quieres recibir la documentación.", "Cita previa si la oficina la pide (Correos la ofrece en su web y en su app)."]],
      },
      {
        id: "plazo",
        title: "Plazo",
        paragraphs: ["La solicitud se puede hacer desde el 6 de octubre hasta el 19 de noviembre de 2026, según el calendario de la Junta Electoral Central."],
      },
    ],
  }),
  g({
    id: "29n-documentacion-correo",
    path: "/elecciones/documentacion-voto-por-correo",
    h1: "Qué te llega a casa para votar por correo",
    title: "Qué llega a casa con el voto por correo",
    description:
      "Recibes papeletas, sobre de votación, certificado del censo, sobre para la mesa e instrucciones. Se envía del 9 al 22 de noviembre de 2026.",
    lead:
      "Te llega un envío certificado con las papeletas, el sobre de votación, el certificado de inscripción en el censo, un sobre dirigido a tu mesa y una hoja explicativa. La Oficina del Censo Electoral lo envía entre el 9 y el 22 de noviembre de 2026.",
    cta: S.correos,
    secondaryCta: S.jec,
    sources: [S.jec, S.correos, S.loreg("asetentaytres", "artículo 73: envío y remisión del voto por correo")],
    related: [R.enviar, R.noLlega, R.internet, R.correo],
    faqs: [
      { q: "¿Tengo que firmar algo al recibirlo?", a: "Sí. El envío es certificado y lo recibes tú en persona, acreditando tu identidad. Si no estás, te dejan aviso para recogerlo en la oficina de Correos." },
    ],
    sections: [
      {
        id: "que-hay-dentro",
        title: "Qué hay dentro",
        paragraphs: ["Revisa que esté todo antes de votar."],
        lists: [["Papeletas de las candidaturas de tu provincia (Congreso) y papeleta del Senado.", "Sobre de votación.", "Certificado de inscripción en el censo.", "Sobre con la dirección de tu mesa electoral.", "Hoja de instrucciones."]],
      },
      {
        id: "fechas",
        title: "Fechas",
        paragraphs: ["Envío por la Oficina del Censo Electoral: del 9 al 22 de noviembre de 2026. Puedes devolver el voto desde que lo recibes hasta el 25 de noviembre de 2026."],
      },
    ],
  }),
  g({
    id: "29n-enviar-correo",
    path: "/elecciones/enviar-voto-por-correo",
    h1: "Cómo enviar el voto por correo",
    title: "Cómo enviar el voto por correo: hasta el 25-N",
    description:
      "Papeleta en el sobre de votación, y este con el certificado en el sobre de la mesa. Entrégalo en Correos como certificado, gratis, hasta el 25 de noviembre.",
    lead:
      "Metes la papeleta en el sobre de votación, lo cierras y lo juntas con el certificado del censo dentro del sobre dirigido a tu mesa. Lo entregas en una oficina de Correos como certificado, sin pagar, como muy tarde el 25 de noviembre de 2026.",
    cta: S.correos,
    secondaryCta: S.jec,
    sources: [S.jec, S.correosNota, S.loreg("asetentaytres", "artículo 73: remisión del voto por correo")],
    related: [R.documentacion, R.noLlega, R.nulo, R.correo],
    faqs: [
      { q: "¿Hay que pagar el sello?", a: "No. Este envío no lleva franqueo; lo entregas en Correos como correo certificado." },
      { q: "¿Lo puede llevar otra persona a Correos?", a: "Consulta en Correos o en la Junta Electoral de Zona antes de delegar el envío; nuestras fuentes no lo detallan." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Paso a paso",
        paragraphs: ["Hazlo con calma y sin dejarlo para el último día."],
        lists: [[
          "Elige tu papeleta del Congreso y métela en el sobre de votación. Marca hasta tres candidatos en la papeleta del Senado si votas al Senado.",
          "Cierra el sobre de votación.",
          "Mete el sobre de votación y el certificado del censo en el sobre dirigido a la mesa.",
          "Entrégalo en Correos como certificado antes de que acabe el 25 de noviembre de 2026.",
        ]],
      },
      {
        id: "plazo",
        title: "Último día: 25 de noviembre",
        paragraphs: ["El calendario de la Junta Electoral Central fija la remisión entre el 10 y el 25 de noviembre de 2026. La ley dice «antes del tercer día previo a la elección»; para el 29 de noviembre eso es el 25."],
      },
    ],
  }),
  g({
    id: "29n-no-llega-correo",
    path: "/elecciones/no-me-llega-voto-por-correo",
    h1: "Si no te llega la documentación del voto por correo",
    title: "No me llega el voto por correo: qué hacer",
    description:
      "La documentación se envía del 9 al 22 de noviembre de 2026. Si no llega, busca el aviso de Correos y contacta con la Delegación Provincial del Censo.",
    lead:
      "La Oficina del Censo Electoral envía la documentación del 9 al 22 de noviembre de 2026. Si no te llega, mira si tienes un aviso de Correos para recogerla y, si no, pregunta a la Delegación Provincial de la Oficina del Censo Electoral de tu provincia.",
    cta: S.ine,
    secondaryCta: S.jec,
    sources: [S.jec, S.ine, S.correos, S.loreg("asetentaytres", "artículo 73")],
    related: [R.documentacion, R.presencial, R.internet, R.correo],
    faqs: [
      { q: "Si no me llega, ¿puedo votar en el colegio?", a: "La LOREG no permite votar en la mesa a quien tiene anotado el voto por correo. Consulta tu caso con la Oficina del Censo Electoral o con la Junta Electoral de Zona." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Qué revisar",
        paragraphs: ["Ve en este orden."],
        lists: [["¿Has dejado una dirección correcta en la solicitud?", "¿Tienes un aviso de Correos en el buzón? El envío es certificado y se recoge en la oficina indicada.", "¿Ya es 22 de noviembre o más tarde? Llama a la Delegación Provincial de la Oficina del Censo Electoral."]],
      },
    ],
  }),
  g({
    id: "29n-presencial-tras-correo",
    path: "/elecciones/votar-en-persona-tras-pedir-correo",
    h1: "Pedí el voto por correo: ¿puedo votar en la mesa?",
    title: "Pedí voto por correo: ¿puedo votar en persona?",
    description:
      "Si la Oficina del Censo anota tu voto por correo, la LOREG no te deja votar en la mesa el 29 de noviembre. Qué significa y qué hacer si cambian tus planes.",
    lead:
      "No. Cuando la Oficina del Censo Electoral anota tu solicitud de voto por correo, el artículo 73 de la LOREG impide votar en persona en la mesa. Si pides el voto por correo, tienes que votar por correo.",
    cta: S.correos,
    secondaryCta: S.jecElectores,
    sources: [S.loreg("asetentaytres", "artículo 73"), S.correos, S.jec],
    related: [R.enviar, R.noLlega, R.correo, R.faq],
    faqs: [
      { q: "¿Puedo anular la solicitud del voto por correo?", a: "La LOREG no prevé un trámite general para anularla. Si tienes un problema concreto, consulta a la Oficina del Censo Electoral o a tu Junta Electoral de Zona." },
    ],
    sections: [
      {
        id: "consejo",
        title: "Antes de pedirlo",
        paragraphs: ["Pide el voto por correo solo si sabes que no podrás ir a tu colegio el 29 de noviembre. Si dudas, espera: el plazo dura hasta el 19 de noviembre de 2026."],
      },
    ],
  }),
  g({
    id: "29n-cera",
    path: "/elecciones/voto-residentes-extranjero-cera",
    h1: "Votar si vives en el extranjero (CERA)",
    title: "Votar desde el extranjero el 29-N (CERA)",
    description:
      "Si vives fuera y estás en el CERA, el voto te llega sin pedirlo. Envíalo al consulado hasta el 24 de noviembre o vota en urna del 21 al 26 de noviembre.",
    lead:
      "Si vives en el extranjero y estás inscrito en el censo de residentes ausentes (CERA), no tienes que pedir el voto: la Oficina del Censo Electoral te lo envía de oficio. Puedes mandarlo por correo al consulado hasta el 24 de noviembre de 2026 o votar en urna en el consulado del 21 al 26 de noviembre.",
    cta: S.ext,
    secondaryCta: S.ine,
    sources: [S.ext, S.ine, S.jec, S.pag, S.loreg("asetentaycinco", "artículo 75: voto de los residentes ausentes")],
    related: [R.erta, R.censo, R.calendario, R.quien],
    faqs: [
      { q: "¿Sigue existiendo el voto rogado?", a: "No para estas elecciones. El INE indica que los electores residentes en el extranjero votan sin necesidad de solicitud previa." },
      { q: "¿Cuándo llegan los sobres y las papeletas?", a: "La documentación sale del 24 al 30 de octubre y las papeletas del 4 al 8 de noviembre (del 6 al 14 si hay recursos contra candidaturas). Las papeletas descargables están disponibles del 2 al 7 de noviembre." },
    ],
    sections: [
      {
        id: "dos-formas",
        title: "Dos formas de votar",
        paragraphs: [
          "Por correo: envías el voto a la oficina consular a la que estás adscrito, como muy tarde el 24 de noviembre de 2026. Exteriores avisa de que no valen los sobres recibidos antes de la proclamación definitiva de candidaturas.",
          "En urna: lo depositas en el consulado o en un centro habilitado del 21 al 26 de noviembre de 2026, ambos incluidos.",
        ],
      },
      {
        id: "sobre",
        title: "Qué va en el sobre por correo",
        paragraphs: ["Según la Junta Electoral Central, en el sobre para la Junta Electoral van el sobre de votación, un certificado de inscripción firmado y una copia del DNI o pasaporte (o certificado de nacionalidad o de inscripción consular). Ese sobre, junto con el otro certificado, va dentro del sobre dirigido al consulado."],
      },
    ],
  }),
  g({
    id: "29n-erta",
    path: "/elecciones/voto-temporalmente-fuera-erta",
    h1: "Votar si estás fuera de España una temporada (ERTA)",
    title: "Votar si estás fuera temporalmente (ERTA)",
    description:
      "Si vives en España pero estarás fuera el 29-N (Erasmus, trabajo, viaje largo), pide el voto ERTA en el consulado hasta el 31 de octubre de 2026.",
    lead:
      "Si sigues empadronado en España pero estás fuera una temporada, puedes votar desde allí como elector temporalmente ausente (ERTA). Te inscribes en el consulado como no residente y pides la documentación con el impreso oficial hasta el 31 de octubre de 2026.",
    cta: S.ext,
    secondaryCta: S.erta,
    sources: [S.ext, S.jec, S.erta, S.loreg("asetentaycuatro", "artículo 74: voto de los temporalmente ausentes")],
    related: [R.cera, R.internet, R.calendario, R.correo],
    faqs: [
      { q: "¿Y si vuelvo a España antes del 19 de noviembre?", a: "Si estás en España, puedes pedir el voto por correo normal hasta el 19 de noviembre de 2026 o votar en tu mesa." },
      { q: "¿Cuándo me mandan la documentación?", a: "La Delegación Provincial del Censo la envía del 3 al 9 de noviembre de 2026 si no hay recursos contra candidaturas. El voto se remite antes del tercer día previo a la votación." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Pasos",
        paragraphs: ["Exteriores permite hacer las dos gestiones a la vez en el consulado."],
        lists: [["Inscríbete en el consulado como no residente.", "Presenta el impreso de solicitud de voto ERTA, como muy tarde el 31 de octubre de 2026.", "Recibe la documentación y envía tu voto por correo certificado dentro de plazo."]],
      },
    ],
  }),
  g({
    id: "29n-censo",
    path: "/elecciones/consultar-censo-electoral",
    h1: "Consultar el censo electoral y reclamar",
    title: "Censo electoral 29-N: consulta y reclama hasta el 19 de octubre",
    description:
      "Quedan pocos días (12–19 oct 2026): consulta el censo en ayuntamiento, consulado o sede INE con Cl@ve y reclama inclusiones/exclusiones. Calendario JEC.",
    lead:
      "Del 12 al 19 de octubre de 2026 puedes comprobar si estás bien inscrito: en tu ayuntamiento, en la delegación de la Oficina del Censo Electoral, en el consulado si vives fuera, o por internet en la sede del INE con Cl@ve o DNI electrónico. En esas mismas fechas puedes reclamar.",
    cta: S.ineSede,
    secondaryCta: S.ine,
    sources: [S.ine, S.ineSede, S.jec, S.loreg("atreintaynueve", "artículo 39: rectificación del censo en periodo electoral")],
    related: [R.donde, R.domicilio, R.primera, R.quien, { href: "/elecciones/no-recibir-propaganda-electoral", label: "Cómo no recibir propaganda electoral" }, { href: "/elecciones/tarjeta-censal-cuando-llega", label: "Tarjeta censal: cuándo llega" }],
    faqs: [
      { q: "¿Cuánto tardan en resolver mi reclamación?", a: "La Delegación Provincial de la Oficina del Censo Electoral la resuelve en 3 días. Las rectificaciones se exponen el 23 de octubre de 2026." },
      { q: "¿Qué hago si me la rechazan?", a: "Puedes recurrir ante el Juzgado de lo Contencioso-Administrativo en 5 días desde la notificación." },
    ],
    sections: [
      {
        id: "como",
        title: "Cómo consultarlo",
        paragraphs: ["Por internet, la sede del INE muestra tus datos y, si vives en España, tu mesa y la dirección del colegio."],
        lists: [["Por internet: sede.ine.gob.es, con Cl@ve o DNI electrónico.", "En persona: ayuntamiento o Delegación Provincial de la Oficina del Censo Electoral.", "Si vives fuera: oficina consular."]],
      },
    ],
  }),
  g({
    id: "29n-donde-voto",
    path: "/elecciones/donde-voto-mesa-electoral",
    h1: "Dónde voto: mesa y colegio electoral",
    title: "Dónde voto el 29-N: mesa y colegio electoral",
    description:
      "Para saber dónde votas el 29 de noviembre mira la tarjeta censal, que se envía desde el 2 de noviembre, o consulta tu mesa en la sede del INE con Cl@ve.",
    lead:
      "Lo dice la tarjeta censal que el INE envía a partir del 2 de noviembre de 2026. También puedes verlo en la sede electrónica del INE con Cl@ve o DNI electrónico: muestra tu mesa y la dirección del colegio.",
    cta: S.ineSede,
    secondaryCta: S.ine,
    sources: [S.ine, S.ineSede, S.jec],
    related: [R.llevar, R.censo, R.jornada, R.domicilio, { href: "/elecciones/tarjeta-censal-cuando-llega", label: "Tarjeta censal: cuándo llega" }],
    faqs: [
      { q: "¿Necesito llevar la tarjeta censal para votar?", a: "No. Para votar te identificas con DNI, pasaporte o permiso de conducir con foto. La tarjeta solo te informa de tu mesa." },
    ],
    sections: [
      {
        id: "listas",
        title: "Las listas definitivas",
        paragraphs: ["Los ayuntamientos exponen y publican en internet la relación definitiva de secciones, locales y mesas del 19 al 28 de noviembre de 2026, según la Junta Electoral Central."],
      },
    ],
  }),
  g({
    id: "29n-que-llevar",
    path: "/elecciones/que-llevar-a-votar",
    h1: "Qué documento llevar a votar",
    title: "Qué llevar a votar: DNI, pasaporte o carné",
    description:
      "Para votar en la mesa necesitas el original del DNI, pasaporte o permiso de conducir con foto. No valen fotocopias ni el resguardo del DNI en trámite.",
    lead:
      "Lleva el original de tu DNI, pasaporte o permiso de conducir con fotografía. No valen fotocopias ni el resguardo del DNI en trámite. La tarjeta censal no es obligatoria.",
    cta: S.votoInfo,
    secondaryCta: S.jecElectores,
    sources: [S.votoInfo, S.jecElectores, S.loreg("aochentaycinco", "artículo 85: identificación del elector")],
    related: [R.caducado, R.donde, R.jornada, R.faq],
    faqs: [
      { q: "¿Vale el DNI en el móvil?", a: "Las fuentes oficiales citadas hablan de documentos originales con fotografía. Si quieres ir seguro, lleva el documento físico." },
    ],
    sections: [
      {
        id: "lista",
        title: "Documentos válidos",
        paragraphs: ["El artículo 85 de la LOREG enumera los documentos."],
        lists: [["DNI.", "Pasaporte.", "Permiso de conducir con fotografía."]],
      },
    ],
  }),
  g({
    id: "29n-dni-caducado",
    path: "/elecciones/dni-caducado-votar",
    h1: "¿Puedo votar con el DNI caducado?",
    title: "¿Se puede votar con el DNI caducado?",
    description:
      "Sí: según Interior, el DNI, pasaporte o carné de conducir pueden estar caducados si son originales y llevan tu foto. El resguardo del DNI no sirve.",
    lead:
      "Sí. El Ministerio del Interior indica que no importa que el documento esté caducado, siempre que sea el original y lleve tu fotografía. Lo que no sirve es el resguardo del DNI en trámite.",
    cta: S.votoInfo,
    secondaryCta: { href: "/dni", label: "Renovar el DNI" },
    sources: [S.votoInfo, S.loreg("aochentaycinco", "artículo 85")],
    related: [R.llevar, R.jornada, { href: "/dni/cita-previa", label: "Cita previa del DNI" }, { href: "/dni", label: "Renovar el DNI: precio (12 €), documentos y pasos" }, R.faq],
    faqs: [
      { q: "¿Y si he perdido el DNI?", a: "Puedes votar con el pasaporte o el permiso de conducir con foto. El resguardo de solicitud del DNI no vale porque no lleva fotografía." },
    ],
    sections: [
      {
        id: "detalle",
        title: "Lo que dice Interior",
        paragraphs: ["Los documentos pueden ser españoles o del país de origen si llevan foto. Pueden estar caducados, pero tienen que ser originales: no valen fotocopias."],
      },
    ],
  }),
  g({
    id: "29n-miembro-mesa",
    path: "/elecciones/miembro-de-mesa",
    h1: "Me ha tocado mesa electoral: qué hago",
    title: "Me ha tocado mesa electoral el 29-N",
    description:
      "Sorteo de mesas: del 31 de octubre al 4 de noviembre de 2026. Es obligatorio; tienes 7 días desde la notificación para alegar una causa justificada.",
    lead:
      "Ser presidente o vocal de mesa es obligatorio. Los ayuntamientos hacen el sorteo entre el 31 de octubre y el 4 de noviembre de 2026 y te lo notifican en 3 días. Si tienes una causa justificada, la alegas ante la Junta Electoral de Zona en 7 días desde la notificación.",
    cta: S.mesaInfo,
    secondaryCta: S.jec,
    sources: [S.jec, S.mesaInfo, S.loreg("aveintiseis", "artículos 26 y 27: formación de las mesas")],
    related: [R.dietas, R.jornada, R.interventores, R.faq, { href: "/elecciones/sorteo-mesa-electoral-29n", label: "¿Me toca mesa? Cuándo es el sorteo" }, { href: "/elecciones/excusa-mesa-electoral", label: "Excusas para la mesa electoral" }],
    faqs: [
      { q: "Tengo más de 65 años, ¿puedo renunciar?", a: "Sí. El artículo 26 de la LOREG permite a los mayores de 65 años renunciar en el plazo de siete días." },
      { q: "¿Y si me surge un problema a última hora?", a: "Debes comunicarlo a la Junta Electoral de Zona al menos 72 horas antes de constituir la mesa. Si es sobrevenido, hasta antes de las 8:00 del día de votación." },
    ],
    sections: [
      {
        id: "plazos",
        title: "Plazos",
        paragraphs: ["Fechas del calendario de la Junta Electoral Central."],
        lists: [["Sorteo: del 31 de octubre al 4 de noviembre de 2026.", "Notificación y manual: en 3 días desde el sorteo.", "Alegaciones: 7 días desde la notificación.", "Respuesta de la Junta: 5 días desde que alegas."]],
      },
      {
        id: "dia",
        title: "El día 29",
        paragraphs: ["La mesa se constituye antes de abrir. La votación va de 9:00 a 20:00. Los suplentes también deben ir a primera hora; si no hacen falta, quedan libres."],
      },
    ],
  }),
  g({
    id: "29n-mesa-dieta",
    path: "/elecciones/miembro-de-mesa-dieta-y-permisos",
    h1: "Dieta y permisos de los miembros de mesa",
    title: "Mesa electoral: dieta de 75 € y permisos",
    description:
      "Presidentes y vocales cobran 75 € de dieta (Orden INT/650/2026), permiso retribuido el día si es laborable y 5 horas menos de jornada al día siguiente.",
    lead:
      "Si eres presidente o vocal titular, cobras una dieta de 75 euros por jornada electoral (Orden INT/650/2026). Si ese día trabajas, tienes permiso retribuido de jornada completa, y en todo caso cinco horas menos de jornada el día siguiente.",
    cta: S.mesaInfo,
    secondaryCta: S.dieta,
    sources: [S.dieta, S.mesaInfo, S.loreg("aveintiocho", "artículo 28: permisos y dieta de los miembros de mesa")],
    related: [R.mesa, R.permiso, R.interventores, R.faq],
    faqs: [
      { q: "¿Los suplentes cobran?", a: "Solo si llegan a ocupar un puesto en la mesa como titulares. Entonces también tienen el permiso y la reducción de jornada." },
      { q: "¿Trabajo de noche, cómo se aplica?", a: "Interior indica que el turno de noche que empieza el día de las elecciones cuenta como jornada del día electoral, y la reducción de 5 horas se puede aplicar al turno de noche siguiente." },
    ],
    sections: [
      {
        id: "resumen",
        title: "Resumen",
        paragraphs: ["Datos de la Orden INT/650/2026 y de Infoelectoral."],
        lists: [["Dieta: 75 euros por titular y jornada, íntegra aunque no estés todo el día.", "Permiso retribuido el día de la votación si es laborable.", "Reducción de 5 horas de jornada el día siguiente (lunes 30 de noviembre)."]],
      },
    ],
  }),
  g({
    id: "29n-permiso-votar",
    path: "/elecciones/permiso-trabajo-para-votar",
    h1: "Permiso en el trabajo para ir a votar",
    title: "Permiso para votar si trabajas el 29-N",
    description:
      "Si trabajas el domingo 29 de noviembre y tu horario coincide con el de votación, tienes hasta 4 horas retribuidas para votar (Real Decreto 605/1999).",
    lead:
      "Si trabajas el 29 de noviembre y tu horario coincide con el de las urnas (9:00 a 20:00), tienes derecho a hasta cuatro horas libres retribuidas para votar. Con jornada reducida, el permiso se reduce en proporción.",
    cta: S.votoInfo,
    secondaryCta: S.rd605,
    sources: [S.votoInfo, S.rd605],
    related: [R.dietas, R.correo, R.jornada, R.faq],
    faqs: [
      { q: "¿Y si trabajo lejos de casa?", a: "Interior indica que quien trabaja lejos de su domicilio tiene hasta cuatro horas para pedir y gestionar el voto por correo." },
      { q: "¿Me pueden pedir un justificante?", a: "Puedes pedir en la mesa un justificante de haber votado, según la Junta Electoral Central." },
    ],
    sections: [
      {
        id: "detalle",
        title: "Cómo se calcula",
        paragraphs: ["El tiempo depende de cuánto coincida tu jornada con el horario de votación, con un máximo de cuatro horas. No se descuenta del sueldo."],
      },
    ],
  }),
  g({
    id: "29n-braille",
    path: "/elecciones/voto-accesible-braille",
    h1: "Voto accesible en braille",
    title: "Voto en braille el 29-N: plazo hasta el 2-N",
    description:
      "Si eres una persona ciega o con discapacidad visual que sabe braille, puedes pedir el kit de voto accesible del 6 de octubre al 2 de noviembre de 2026.",
    lead:
      "Si eres una persona ciega o con discapacidad visual y conoces el braille, puedes pedir la documentación de voto accesible. El plazo para solicitarla va del 6 de octubre al 2 de noviembre de 2026.",
    cta: S.braille,
    secondaryCta: S.jec,
    sources: [S.jec, S.braille, S.loreg("aochentaysiete", "artículo 87: voto de personas con discapacidad")],
    related: [R.hospital, R.jornada, R.correo, R.faq],
    faqs: [
      { q: "¿Las personas con discapacidad pueden votar?", a: "Sí. Desde la reforma de 2018 de la LOREG, toda persona puede ejercer el derecho de sufragio activo, con los medios de apoyo que necesite." },
    ],
    sections: [
      {
        id: "como",
        title: "Cómo funciona",
        paragraphs: ["El Real Decreto 1612/2007 regula este procedimiento. La solicitud y la entrega se gestionan por los canales oficiales; consulta la fuente oficial para el teléfono y los detalles de tu provincia."],
      },
    ],
  }),
  g({
    id: "29n-hospital",
    path: "/elecciones/votar-hospitalizado-o-enfermo",
    h1: "Votar si estás hospitalizado o enfermo",
    title: "Votar si estás enfermo u hospitalizado",
    description:
      "Si no puedes ir al colegio por enfermedad, vota por correo. Si no puedes ir a Correos, otra persona lo pide con poder notarial y certificado médico.",
    lead:
      "La vía es el voto por correo. Si la enfermedad te impide ir a Correos, puede pedirlo otra persona con autorización notarial o consular y un certificado médico oficial. El plazo acaba el 19 de noviembre de 2026.",
    cta: S.correos,
    secondaryCta: S.loreg("asetentaydos", "artículo 72"),
    sources: [S.correos, S.correosNota, S.loreg("asetentaydos", "artículo 72: solicitud por persona autorizada")],
    related: [R.oficina, R.braille, R.documentacion, R.correo],
    faqs: [
      { q: "¿Necesito ir al notario?", a: "Solo si otra persona va a pedir el voto en tu nombre. La autorización debe hacerse ante notario o cónsul y va acompañada de un certificado médico oficial." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Pasos",
        paragraphs: ["Con tiempo suficiente antes del 19 de noviembre."],
        lists: [["Consigue el certificado médico oficial.", "Otorga la autorización ante notario (o cónsul si estás fuera).", "Tu representante presenta la solicitud en Correos.", "Recibes la documentación y envías el voto antes del 25 de noviembre."]],
      },
    ],
  }),
  g({
    id: "29n-primera-vez",
    path: "/elecciones/votar-por-primera-vez",
    h1: "Votar por primera vez",
    title: "Votar por primera vez a los 18 años",
    description:
      "Votas el 29 de noviembre si cumples 18 años ese día o antes y estás en el censo. Cómo comprobarlo, dónde votas, qué llevar y cómo se vota paso a paso.",
    lead:
      "Si cumples 18 años el 29 de noviembre de 2026 o antes, puedes votar: el censo de estas elecciones incluye a quienes son mayores de edad el día de la votación. Comprueba tu inscripción, mira dónde votas y lleva tu DNI.",
    cta: S.ineSede,
    secondaryCta: S.ine,
    sources: [S.ineSede, S.ine, S.loreg("aochentaycinco", "artículo 85")],
    related: [R.censo, R.donde, R.llevar, R.jornada],
    faqs: [
      { q: "¿Tengo que inscribirme en el censo?", a: "No, si estás empadronado en España la inscripción es de oficio. Comprueba tus datos en la sede del INE." },
    ],
    sections: [
      {
        id: "checklist",
        title: "Checklist",
        paragraphs: ["Lo básico para tu primera vez."],
        lists: [["Comprueba tu inscripción en la sede del INE.", "Mira tu mesa en la tarjeta censal o en la sede del INE.", "Lleva DNI, pasaporte o carné de conducir original.", "Vota de 9:00 a 20:00 el 29 de noviembre."]],
      },
    ],
  }),
  g({
    id: "29n-extranjeros",
    path: "/elecciones/extranjeros-pueden-votar-generales",
    h1: "¿Pueden votar los extranjeros el 29 de noviembre?",
    title: "¿Pueden votar los extranjeros en las generales?",
    description:
      "No. El 29-N se eligen Congreso y Senado y solo votan españoles. Los extranjeros de la UE o con tratado de reciprocidad votan en municipales, no aquí.",
    lead:
      "No. El 29 de noviembre de 2026 se eligen el Congreso y el Senado, y en estas elecciones solo votan ciudadanos españoles. Los extranjeros residentes de la UE o de países con tratado de reciprocidad pueden votar en las municipales, no en las generales.",
    cta: S.rd,
    secondaryCta: S.loreg("acientosetentayseis", "artículo 176: sufragio de extranjeros en municipales"),
    sources: [S.rd, S.loreg("acientosetentayseis", "artículo 176"), S.pag],
    related: [R.quien, { href: "/extranjeria", label: "Extranjería" }, R.censo, R.faq],
    faqs: [
      { q: "Tengo doble nacionalidad, ¿voto?", a: "Si eres español y estás inscrito en el censo, votas como cualquier español." },
    ],
    sections: [
      {
        id: "por-que",
        title: "Por qué",
        paragraphs: ["El Real Decreto 806/2026 convoca elecciones al Congreso y al Senado. La LOREG solo abre el voto a extranjeros residentes en las elecciones municipales (artículo 176)."],
      },
    ],
  }),
  g({
    id: "29n-nulo-blanco",
    path: "/elecciones/voto-nulo-y-voto-en-blanco",
    h1: "Voto nulo y voto en blanco: diferencias",
    title: "Voto nulo y voto en blanco: en qué se diferencian",
    description:
      "Voto en blanco: sobre sin papeleta, y cuenta como válido. Voto nulo: papeleta no oficial, varias distintas o alterada. Lo que dice la LOREG, fácil.",
    lead:
      "Voto en blanco: metes el sobre vacío, sin papeleta (o la papeleta del Senado sin marcar). Es un voto válido. Voto nulo: papeleta no oficial, varias papeletas de candidaturas distintas en el sobre o papeleta tachada o alterada. No cuenta para ninguna candidatura.",
    cta: S.loreg("anoventayseis", "artículo 96: votos nulos y en blanco"),
    secondaryCta: S.infoelectoral,
    sources: [S.loreg("anoventayseis", "artículo 96"), S.loreg("acientosesentaytres", "artículo 163: reparto de escaños")],
    related: [{ href: "/elecciones/voto-nulo-ejemplos", label: "Voto nulo: 10 ejemplos y si cuentan" }, R.dhondt, R.senado, R.jornada, R.faq],
    faqs: [
      { q: "¿El voto en blanco ayuda a algún partido?", a: "Cuenta como voto válido. Por eso entra en el cálculo del 3 % mínimo que exige el artículo 163 para el reparto de escaños del Congreso." },
      { q: "¿Si meto dos papeletas iguales?", a: "Según el artículo 96, varias papeletas de la misma candidatura cuentan como un solo voto válido." },
    ],
    sections: [
      {
        id: "tabla",
        title: "Resumen rápido",
        paragraphs: ["Basado en el artículo 96 de la LOREG."],
        lists: [["Sobre sin papeleta: voto en blanco (válido).", "Papeleta de modelo no oficial: nulo.", "Papeletas de candidaturas distintas en el mismo sobre: nulo.", "Papeleta alterada, con nombres tachados o añadidos: nulo."]],
      },
    ],
  }),
  g({
    id: "29n-dhondt",
    path: "/elecciones/como-se-reparten-los-escanos",
    h1: "Cómo se reparten los escaños del Congreso",
    title: "Cómo se reparten los escaños: D'Hondt fácil",
    description:
      "Los escaños del Congreso se reparten por provincia con la regla D'Hondt, solo entre candidaturas con al menos el 3 % de los votos válidos. Con ejemplo.",
    lead:
      "En cada provincia se reparten sus diputados con la regla D'Hondt: los votos de cada candidatura se dividen entre 1, 2, 3… y los escaños van a los cocientes más altos. Solo entran las candidaturas con al menos el 3 % de los votos válidos de esa provincia.",
    cta: S.loreg("acientosesentaytres", "artículo 163: atribución de escaños"),
    secondaryCta: S.rd,
    sources: [S.loreg("acientosesentaytres", "artículo 163"), S.rd],
    related: [R.senado, R.nulo, R.resultados, R.faq],
    faqs: [
      { q: "¿Cuántos diputados elige mi provincia?", a: "El anexo del Real Decreto 806/2026 lo detalla: por ejemplo, Madrid elige 38, Barcelona 32 y Soria 2." },
    ],
    sections: [
      {
        id: "ejemplo",
        title: "Ejemplo con números inventados",
        paragraphs: ["Provincia con 3 escaños. A tiene 100 votos, B 80 y C 30. Cocientes de A: 100, 50, 33. De B: 80, 40. De C: 30. Los tres más altos son 100 (A), 80 (B) y 50 (A). Resultado: A 2 escaños, B 1."],
      },
    ],
  }),
  g({
    id: "29n-senado",
    path: "/elecciones/como-votar-al-senado",
    h1: "Cómo se vota al Senado",
    title: "Cómo se vota al Senado: hasta 3 cruces",
    description:
      "En la papeleta del Senado marcas con una cruz a quien quieras, de cualquier partido. En las provincias que eligen 4 senadores, hasta 3 cruces.",
    lead:
      "La papeleta del Senado es una lista abierta: marcas con una cruz a las personas que quieras, aunque sean de partidos distintos. En las provincias que eligen cuatro senadores puedes marcar como máximo tres.",
    cta: S.loreg("acientosesentayseis", "artículo 166: elección de senadores"),
    secondaryCta: S.rd,
    sources: [S.loreg("acientosesentayseis", "artículo 166"), S.rd],
    related: [{ href: "/elecciones/voto-nulo-ejemplos", label: "Voto nulo: 10 ejemplos y si cuentan" }, R.dhondt, R.nulo, R.jornada, R.faq],
    faqs: [
      { q: "¿Qué pasa si marco más de la cuenta?", a: "Marcar más candidatos de los permitidos puede hacer el voto nulo. Si tienes dudas, pide una papeleta nueva en el colegio." },
      { q: "¿Cuántos senadores elige mi territorio?", a: "Cuatro por provincia; tres en Gran Canaria, Mallorca y Tenerife; uno en las demás islas; dos en Ceuta y dos en Melilla (Real Decreto 806/2026)." },
    ],
    sections: [
      {
        id: "sobre",
        title: "El sobre",
        paragraphs: ["La papeleta del Senado va en su propio sobre, distinto del del Congreso. Si no marcas a nadie, es voto en blanco."],
      },
    ],
  }),
  g({
    id: "29n-reflexion",
    path: "/elecciones/jornada-de-reflexion",
    h1: "Jornada de reflexión: sábado 28 de noviembre",
    title: "Jornada de reflexión: 28 de noviembre de 2026",
    description:
      "La jornada de reflexión es el sábado 28 de noviembre de 2026: la campaña termina el viernes 27 a medianoche y ese día no se puede pedir el voto.",
    lead:
      "La jornada de reflexión es el sábado 28 de noviembre de 2026. La campaña acaba el viernes 27 a las 24:00, y el sábado los partidos no pueden hacer actos de campaña ni pedir el voto.",
    cta: S.jec,
    secondaryCta: S.rd,
    sources: [S.jec, S.rd, S.loreg("acincuentaytres", "artículo 53: periodo de campaña")],
    related: [R.encuestas, R.calendario, R.jornada, R.faq],
    faqs: [
      { q: "¿Puedo hablar de política en redes ese día?", a: "La prohibición de la LOREG se dirige a la propaganda y la campaña electoral. Si tienes dudas sobre un caso concreto, consulta a la Junta Electoral." },
    ],
    sections: [
      {
        id: "campana",
        title: "Fechas de campaña",
        paragraphs: ["La campaña dura 15 días: del viernes 13 de noviembre a las 0:00 al viernes 27 de noviembre a las 24:00 (Real Decreto 806/2026)."],
      },
    ],
  }),
  g({
    id: "29n-encuestas",
    path: "/elecciones/encuestas-prohibidas",
    h1: "Encuestas: cuándo no se pueden publicar",
    title: "Encuestas prohibidas: del 24 al 28 de noviembre",
    description:
      "Del 24 al 28 de noviembre de 2026 no se pueden publicar ni difundir sondeos electorales en España, según el calendario de la Junta Electoral Central.",
    lead:
      "Del 24 al 28 de noviembre de 2026 está prohibido publicar, difundir o reproducir sondeos electorales por cualquier medio. Es la regla de los cinco días anteriores a la votación del artículo 69 de la LOREG.",
    cta: S.jec,
    secondaryCta: S.loreg("asesentaynueve", "artículo 69: encuestas"),
    sources: [S.jec, S.loreg("asesentaynueve", "artículo 69")],
    related: [{ href: "/elecciones/encuestas-29n", label: "Últimas encuestas del 29-N con fuente y fecha" }, { href: "/elecciones/encuestas-falsas-en-redes", label: "Encuestas falsas en redes" }, R.reflexion, R.bulos, R.calendario, R.faq],
    faqs: [
      { q: "¿Hasta cuándo dura la prohibición?", a: "Según el calendario de la Junta Electoral Central, del 24 al 28 de noviembre de 2026, ambos incluidos." },
    ],
    sections: [
      {
        id: "detalle",
        title: "Qué significa para ti",
        paragraphs: ["Si en esos días ves un «sondeo» circulando, desconfía: puede ser un bulo o venir de fuera del alcance de la ley."],
      },
    ],
  }),
  g({
    id: "29n-interventores",
    path: "/elecciones/interventores-y-apoderados",
    h1: "Interventores y apoderados: quiénes son",
    title: "Interventores y apoderados: qué hacen",
    description:
      "Interventores y apoderados los nombran las candidaturas para vigilar votación y recuento. Los interventores se nombran hasta el 26 de noviembre.",
    lead:
      "Son personas que nombran los partidos y candidaturas para vigilar la votación y el recuento. Los interventores se sientan en una mesa concreta; los apoderados pueden moverse por los colegios. Los interventores se nombran hasta el 26 de noviembre de 2026.",
    cta: S.loreg("asetentayseis", "artículos 76 a 79: apoderados e interventores"),
    secondaryCta: S.jec,
    sources: [S.jec, S.loreg("asetentayseis", "artículos 76 a 79"), S.loreg("asetentaynueve", "artículo 79.2: interventores con voz pero sin voto")],
    related: [R.mesa, R.resultados, R.jornada, R.faq],
    faqs: [
      { q: "¿Puedo ser interventor?", a: "Tienes que ser elector y que te nombre una candidatura. Contacta con el partido o agrupación que te interese." },
    ],
    sections: [
      {
        id: "diferencias",
        title: "Diferencias",
        paragraphs: ["Interventor: está en una mesa, puede votar en ella (LOREG art. 79.1) y participa en sus deliberaciones con voz pero sin voto (LOREG art. 79.2). Apoderado: representa a la candidatura en los colegios y puede presenciar el escrutinio, sin sentarse en la mesa."],
      },
    ],
  }),
  g({
    id: "29n-domicilio",
    path: "/elecciones/cambio-de-domicilio-y-censo",
    h1: "Me he mudado: ¿dónde voto?",
    title: "Me he mudado: ¿dónde voto el 29-N?",
    description:
      "El censo de cada elección se cierra antes de la convocatoria. Si te empadronaste hace poco, quizá votes en tu dirección anterior. Cómo comprobarlo.",
    lead:
      "Votas donde dice el censo vigente para esta elección, que se cierra el día 1 del segundo mes anterior a la convocatoria. Si te has empadronado en otro sitio después, es posible que sigas votando en tu dirección antigua. Compruébalo en la sede del INE.",
    cta: S.ineSede,
    secondaryCta: S.ine,
    sources: [S.ineSede, S.ine, S.loreg("atreintaynueve", "artículo 39")],
    related: [R.censo, R.donde, { href: "/empadronarse", label: "Empadronarse" }, R.correo],
    faqs: [
      { q: "¿Puedo votar por correo si ahora vivo lejos?", a: "Sí. Pide el voto por correo hasta el 19 de noviembre e indica tu dirección actual para recibir la documentación." },
    ],
    sections: [
      {
        id: "que-hacer",
        title: "Qué hacer",
        paragraphs: ["Si tus datos no son correctos y no reflejan un empadronamiento anterior al cierre, puedes reclamar del 12 al 19 de octubre de 2026."],
      },
    ],
  }),
  g({
    id: "29n-resultados",
    path: "/elecciones/resultados-y-escrutinio",
    h1: "Resultados y escrutinio: cómo y cuándo",
    title: "Resultados del 29-N: cuándo y dónde verlos",
    description:
      "Los colegios cierran a las 20:00 del 29-N. Interior publica resultados provisionales esa noche; el escrutinio oficial es del 4 al 7 de diciembre.",
    lead:
      "A las 20:00 del 29 de noviembre cierran los colegios y cada mesa cuenta los votos. El Ministerio del Interior difunde resultados provisionales esa noche. El escrutinio oficial lo hacen las Juntas Electorales Provinciales del 4 al 7 de diciembre de 2026.",
    cta: S.infoelectoral,
    secondaryCta: S.jec,
    sources: [S.jec, S.infoelectoral, S.rd],
    related: [{ href: "/elecciones/voto-nulo-ejemplos", label: "Voto nulo: 10 ejemplos y si cuentan" }, R.dhondt, R.jecGuia, R.interventores, R.calendario, { href: "/elecciones/cuando-habra-gobierno-29n", label: "¿Cuándo habrá Gobierno tras el 29-N?" }],
    faqs: [
      { q: "¿Cuándo es oficial el resultado?", a: "Tras el escrutinio general y la proclamación de electos. La Junta Electoral Central publica los resultados en el BOE en los 40 días siguientes a la proclamación." },
      { q: "¿Cuándo se constituyen las Cortes?", a: "El 23 de diciembre de 2026 a las 10:00, según el Real Decreto 806/2026." },
    ],
    sections: [
      {
        id: "fases",
        title: "Fases",
        paragraphs: ["Del recuento a la constitución."],
        lists: [["29 de noviembre, 20:00: cierre y recuento en cada mesa.", "Noche electoral: resultados provisionales del Ministerio del Interior.", "4 a 7 de diciembre: escrutinio general por las Juntas Electorales Provinciales.", "23 de diciembre: sesión constitutiva de las Cámaras."]],
      },
    ],
  }),
  g({
    id: "29n-jec",
    path: "/elecciones/junta-electoral-central",
    h1: "Qué es la Junta Electoral Central",
    title: "Qué es la Junta Electoral Central y qué hace",
    description:
      "La Junta Electoral Central vela por la limpieza de las elecciones: publica el calendario, resuelve recursos y da instrucciones a las juntas.",
    lead:
      "Es el órgano permanente que garantiza que las elecciones sean limpias y transparentes. Publica el calendario electoral, dicta instrucciones, resuelve consultas y recursos y supervisa a las Juntas Electorales Provinciales y de Zona.",
    cta: { href: "https://www.juntaelectoralcentral.es/", label: "Web de la Junta Electoral Central" },
    secondaryCta: S.jec,
    sources: [S.jec, S.jecElectores, S.loreg("anueve", "artículos 8 a 9: Administración electoral")],
    related: [R.resultados, R.mesa, R.bulos, R.calendario],
    faqs: [
      { q: "¿A quién reclamo un problema en mi mesa?", a: "A la Junta Electoral de Zona que corresponde a tu municipio. La Junta Electoral Central está por encima y resuelve recursos." },
    ],
    sections: [
      {
        id: "niveles",
        title: "Los niveles de la Administración electoral",
        paragraphs: ["La LOREG organiza la Administración electoral en Junta Electoral Central, Juntas Provinciales, Juntas de Zona y las mesas electorales."],
      },
    ],
  }),
  g({
    id: "29n-bulos",
    path: "/elecciones/bulos-y-fraudes-electorales",
    h1: "Bulos y fraudes en las elecciones: cómo detectarlos",
    title: "Bulos electorales del 29-N: cómo detectarlos",
    description:
      "En España no se vota por internet ni por WhatsApp, y el voto por correo no cuesta dinero. Consejos para detectar bulos y fuentes oficiales para comprobar.",
    lead:
      "Regla rápida: en estas elecciones no se vota por internet, ni por SMS ni por WhatsApp, y pedir el voto por correo es gratis. Las únicas vías son la mesa, el voto por correo con Correos y, desde el extranjero, el consulado.",
    cta: S.infoelectoral,
    secondaryCta: S.jec,
    sources: [S.infoelectoral, S.jec, S.correos, S.loreg("aochentaycinco", "artículo 85")],
    related: [R.encuestas, R.nulo, R.correo, R.faq],
    faqs: [
      { q: "Me piden datos bancarios para el voto por correo, ¿es normal?", a: "No. La solicitud del voto por correo es gratuita y se hace en Correos o en su web oficial. Desconfía de cualquier pago." },
      { q: "¿Es verdad que un voto con una marca es nulo?", a: "Depende. El artículo 96 de la LOREG enumera los casos de nulidad. Consulta nuestra guía de voto nulo y en blanco." },
    ],
    sections: [
      {
        id: "comprobar",
        title: "Dónde comprobar",
        paragraphs: ["Antes de compartir algo, mira la fuente oficial."],
        lists: [["Junta Electoral Central: calendario y acuerdos.", "Ministerio del Interior (Infoelectoral): procedimiento y resultados.", "INE: censo y mesa.", "Correos: voto por correo.", "Exteriores: voto desde el extranjero."]],
      },
    ],
  }),
  g({
    id: "29n-faq",
    path: "/elecciones/preguntas-frecuentes-29n",
    h1: "Preguntas frecuentes de las elecciones del 29-N",
    title: "Elecciones 29-N: preguntas frecuentes",
    description:
      "Respuestas cortas sobre las elecciones del 29 de noviembre de 2026: horario, voto por correo, documentos, mesa, voto desde fuera, censo y resultados.",
    lead:
      "Las elecciones del 29 de noviembre de 2026 son al Congreso y al Senado. Se vota de 9:00 a 20:00. El voto por correo se pide hasta el 19 de noviembre y se envía hasta el 25. Aquí tienes las respuestas cortas a las dudas más comunes.",
    cta: S.jec,
    secondaryCta: S.rd,
    sources: [S.rd, S.jec, S.ine, S.ext, S.votoInfo],
    related: [R.correo, R.cera, R.llevar, R.mesa, R.programas, { href: "/elecciones/debate-electoral-29n", label: "Debates del 29-N: fechas y quién ha aceptado" }, { href: "/elecciones/sorteo-mesa-electoral-29n", label: "¿Me toca mesa? Cuándo es el sorteo" }, { href: "/elecciones/que-pasa-si-no-voto", label: "¿Qué pasa si no voto?" }],
    faqs: [
      { q: "¿Qué se vota el 29 de noviembre?", a: "Diputados y senadores de las Cortes Generales (Real Decreto 806/2026)." },
      { q: "¿A qué hora abren los colegios?", a: "La votación es de 9:00 a 20:00." },
      { q: "¿Hasta cuándo puedo pedir el voto por correo?", a: "Hasta el 19 de noviembre de 2026. Se envía en Correos hasta el 25 de noviembre." },
      { q: "¿Qué documento llevo?", a: "DNI, pasaporte o permiso de conducir originales con foto. Pueden estar caducados." },
      { q: "Vivo fuera, ¿tengo que pedir el voto?", a: "No. Si estás en el CERA, te llega de oficio. Votas por correo al consulado hasta el 24 de noviembre o en urna del 21 al 26." },
      { q: "¿Cuándo se sortean las mesas?", a: "Entre el 31 de octubre y el 4 de noviembre de 2026." },
    ],
    sections: [
      {
        id: "guias",
        title: "Guías detalladas",
        paragraphs: ["Cada respuesta tiene su guía con fuentes oficiales. Empieza por el calendario y el voto por correo si votas fuera de tu mesa."],
      },
    ],
  }),
  g({
    id: "29n-jornada",
    path: "/elecciones/como-votar-el-dia-29",
    h1: "Cómo se vota el 29 de noviembre, paso a paso",
    title: "Cómo votar el 29-N paso a paso",
    description:
      "El 29 de noviembre se vota de 9:00 a 20:00 en tu colegio: coge las papeletas, prepara los sobres, identifícate y vota. Paso a paso y sin dudas.",
    lead:
      "Vas a tu colegio entre las 9:00 y las 20:00, coges las papeletas, preparas los sobres (puedes usar la cabina), te identificas en tu mesa con DNI, pasaporte o carné de conducir y, cuando el presidente dice «Vota», metes los sobres en la urna.",
    cta: S.votoInfo,
    secondaryCta: S.jecElectores,
    sources: [S.votoInfo, S.jecElectores, S.loreg("aochentaycinco", "artículos 85 y 86: identificación y votación")],
    related: [R.llevar, R.donde, R.senado, R.nulo],
    faqs: [
      { q: "¿Y si a las 20:00 estoy en la cola dentro del colegio?", a: "Interior indica que el presidente deja votar a quien esté dentro del local en ese momento." },
      { q: "¿Puedo pedir un justificante?", a: "Sí, en la mesa al votar o en la Junta Electoral de Zona." },
    ],
    sections: [
      {
        id: "pasos",
        title: "Paso a paso",
        paragraphs: ["Así funciona en la mesa."],
        lists: [["Coge las papeletas y los sobres: uno para el Congreso y otro para el Senado.", "Prepara tu voto, en la cabina si quieres.", "Di tu nombre en tu mesa y enseña el documento.", "Entrega los sobres cerrados al presidente; él dice tu nombre y «Vota», y tú los metes en la urna."]],
      },
    ],
  }),
];

/** Guías con la ampliación del 18-10-2026 aplicada. */
export const ELECCIONES_29N_GUIDES: Guide[] = BASE_29N_GUIDES.map(ampliar29n);
