import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Hub «Votar en situaciones especiales» (26-10-2026). Verificado el 26-10-2026:
 * LOREG (BOE-A-1985-11672, texto consolidado): arts. 2, 3.2 (redacción LO 2/2018), 4, 5, 72.c, 73.2, 85, 86, 87.1, 91, 93.
 * JEC: Acuerdo 531/2023 (camisetas, art. 93, electores), Acuerdo 127/2017 (miembros de mesa e interventores),
 * Acuerdo 211/2024 citado en el 226/2024 (particulares no pueden grabar a quienes intervienen en votación y escrutinio).
 * Infoelectoral (Ministerio del Interior), FAQ «Desarrollo de la votación» (persona de confianza; el voto es personal).
 * Omitido por no encontrar norma o acuerdo oficial específico: «ir a votar con hijos» y cualquier multa por fotografiar la papeleta.
 * «Cumplir 18 antes del 29-N» ya está cubierto en /elecciones/votar-por-primera-vez (enlazado; no se duplica).
 */

const R = "2026-10-26";
const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });
const BYLINE = "Por Equipo RutaTrámite. Última revisión: 26 de octubre de 2026, con el texto consolidado de la Ley Orgánica del Régimen Electoral General (LOREG) en el BOE.";

const S = {
  loreg: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672", label: "BOE: Ley Orgánica 5/1985, del Régimen Electoral General (texto consolidado)" },
  a3: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#atercero", label: "BOE: LOREG, artículo 3 (redacción de la Ley Orgánica 2/2018)" },
  lo2018: { href: "https://www.boe.es/buscar/doc.php?id=BOE-A-2018-16672", label: "BOE: Ley Orgánica 2/2018, para garantizar el derecho de sufragio de todas las personas con discapacidad" },
  a72: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#asetentaydos", label: "BOE: LOREG, artículo 72 (voto por correo y solicitud por otra persona)" },
  a87: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#aochentaysiete", label: "BOE: LOREG, artículo 87 (persona de confianza)" },
  a86: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#aochentayseis", label: "BOE: LOREG, artículo 86 (el voto es secreto; cabina)" },
  a93: { href: "https://www.juntaelectoralcentral.es/cs/jec/loreg/contenido?idContenido=2740448", label: "Junta Electoral Central: LOREG, artículo 93 (propaganda en los colegios)" },
  jec531: { href: "https://www.juntaelectoralcentral.es/cs/jec/doctrina", label: "Junta Electoral Central: doctrina (Acuerdo 531/2023, camisetas; Acuerdo 127/2017, mesas e interventores)" },
  jec226: { href: "https://www.juntaelectoralcentral.es/cs/jec/doctrina/acuerdos?anyosesion=2024&idacuerdoinstruccion=132735&idsesion=1080&template=Doctrina%2FJEC_Detalle", label: "Junta Electoral Central: Acuerdo 226/2024 (grabaciones en el colegio electoral)" },
  jecInfo: { href: "https://www.juntaelectoralcentral.es/cs/jec/informacion", label: "Junta Electoral Central: información para electores" },
  infoel: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/preguntas-frecuentes/desarrollo-de-la-votacion/", label: "Infoelectoral (Ministerio del Interior): desarrollo de la votación" },
  correos: { href: "https://www.correos.com/sala-prensa/ya-se-puede-solicitar-el-voto-por-correo-para-las-elecciones-generales-del-29-de-noviembre/", label: "Correos, 6 de octubre de 2026: plazos del voto por correo del 29-N" },
};

const P = {
  hub: "/elecciones/votar-en-situaciones-especiales",
  residencia: "/elecciones/votar-en-residencia-o-dependiente",
  intelectual: "/elecciones/votar-con-discapacidad-intelectual",
  confianza: "/elecciones/votar-con-persona-de-confianza",
  camiseta: "/elecciones/ir-a-votar-con-camiseta-o-chapa",
  foto: "/elecciones/hacer-foto-al-voto",
};
const L = {
  hub: { href: P.hub, label: "Votar en situaciones especiales: guía completa" },
  residencia: { href: P.residencia, label: "Votar si vives en una residencia o eres dependiente" },
  intelectual: { href: P.intelectual, label: "Votar con discapacidad intelectual: tu derecho" },
  confianza: { href: P.confianza, label: "Votar acompañado de una persona de confianza" },
  camiseta: { href: P.camiseta, label: "¿Se puede ir a votar con camiseta o chapa de un partido?" },
  foto: { href: P.foto, label: "¿Puedo hacer una foto a mi voto?" },
  braille: { href: "/elecciones/voto-accesible-braille", label: "Voto en braille (plazo hasta el 2-N)" },
  hospital: { href: "/elecciones/votar-hospitalizado-o-enfermo", label: "Votar si estás enfermo u hospitalizado" },
  correo: { href: "/elecciones/voto-por-correo", label: "Voto por correo: solicitud hasta el 19-N" },
  domicilio: { href: "/elecciones/cambio-de-domicilio-y-censo", label: "Me he mudado: ¿dónde voto?" },
  primera: { href: "/elecciones/votar-por-primera-vez", label: "Cumplo 18 antes del 29-N: votar por primera vez" },
  elecciones: { href: "/elecciones", label: "Elecciones 29-N: todas las guías" },
  llevar: { href: "/elecciones/que-llevar-a-votar", label: "Qué llevar a votar" },
};
export const SITUACIONES_ESPECIALES_PATHS = Object.values(P);

const base = { pack: "elecciones" as const, reviewedAt: R };

export const SITUACIONES_ESPECIALES_GUIDES: Guide[] = [
  {
    ...base,
    id: "votar-situaciones-especiales",
    path: P.hub,
    h1: "Votar en situaciones especiales el 29-N: residencia, discapacidad, acompañante y más",
    title: "Votar en situaciones especiales el 29-N: guía con la ley",
    description: "Residencia, dependencia, discapacidad intelectual, persona de confianza, braille, hospital, mudanza, camisetas y fotos: qué dice la ley electoral para votar el 29-N.",
    lead: "Respuesta corta: casi todas las situaciones especiales tienen solución en la ley electoral. Si no puedes ir al colegio, vota por correo (pídelo hasta el 19 de noviembre). Si necesitas ayuda para votar, puedes ir con una persona de tu confianza. Toda persona con discapacidad, también intelectual, tiene derecho a votar desde 2018. Y en el colegio no se puede hacer propaganda, ni siquiera con una camiseta.",
    cta: { href: S.infoel.href, label: "Preguntas oficiales sobre la votación (Interior)" },
    secondaryCta: { href: S.loreg.href, label: "Leer la ley electoral en el BOE" },
    sources: [S.loreg, S.lo2018, S.a72, S.a87, S.a93, S.jec531, S.jec226, S.infoel, S.correos],
    related: [L.residencia, L.intelectual, L.confianza, L.camiseta, L.foto, L.braille, L.hospital, L.correo, L.domicilio, L.primera, L.elecciones],
    disclaimer: "Información general basada en la LOREG y en documentos de la Junta Electoral Central y del Ministerio del Interior. En el colegio, el presidente de la mesa resuelve las dudas concretas (artículo 91 de la LOREG).",
    faqs: [
      { q: "No puedo ir al colegio el 29-N, ¿cómo voto?", a: "Por correo. Se pide en Correos hasta el 19 de noviembre de 2026 y el voto se deposita en Correos hasta el 25 de noviembre. Si por enfermedad o discapacidad no puedes pedirlo en persona, puede hacerlo otra persona con autorización notarial y certificado médico oficial (artículo 72.c de la LOREG)." },
      { q: "¿Puede votar alguien por mí?", a: "No. El voto es personal (artículo 4 de la LOREG). Lo que sí permite la ley es que una persona de confianza te ayude a elegir la papeleta, meterla en el sobre y entregarla si no sabes leer o tienes una discapacidad que te lo impide (artículo 87.1)." },
      { q: "¿Una persona con discapacidad intelectual puede votar?", a: "Sí. Desde la Ley Orgánica 2/2018 nadie pierde el derecho de voto por su discapacidad. El artículo 3.2 de la LOREG dice que toda persona puede votar de forma consciente, libre y voluntaria, comunicándolo como pueda y con los apoyos que necesite." },
      { q: "¿Puedo ir con la camiseta de un partido?", a: "No. El artículo 93 de la LOREG prohíbe la propaganda electoral en los colegios y en sus alrededores, y la Junta Electoral Central ha dicho que eso incluye las camisetas con símbolos partidistas que lleven los electores." },
      { q: "Cumplo 18 años justo antes del 29-N, ¿puedo votar?", a: "Sí, si los cumples el 29 de noviembre de 2026 o antes. Las listas del censo incluyen a quienes son mayores de edad en la fecha de la votación (artículo 85.2 de la LOREG)." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BYLINE], [[
        "No puedes desplazarte (residencia, dependencia, enfermedad): voto por correo, hasta el 19-N.",
        "Necesitas ayuda para votar: persona de confianza (artículo 87.1 de la LOREG).",
        "Discapacidad intelectual: derecho pleno a votar desde la LO 2/2018 (artículo 3.2).",
        "Ceguera o discapacidad visual: voto en braille, se pide hasta el 2 de noviembre.",
        "Camisetas, chapas o símbolos de partidos: prohibidos en el colegio (artículo 93).",
      ]]),
      {
        id: "tabla-situaciones",
        title: "Qué hacer en cada situación",
        paragraphs: ["Cada fila enlaza con la norma que la regula."],
        table: {
          caption: "Situaciones especiales para votar el 29 de noviembre de 2026",
          head: ["Situación", "Qué hacer", "Norma"],
          rows: [
            { cells: ["Vives en una residencia o eres dependiente", "Voto por correo; si no puedes ir a Correos, lo pide otra persona con poder notarial y certificado médico", "LOREG, art. 72"], source: S.a72 },
            { cells: ["Discapacidad intelectual", "Votas como cualquier elector, con los apoyos que necesites", "LOREG, art. 3.2"], source: S.a3 },
            { cells: ["No sabes leer o no puedes manejar la papeleta", "Te acompaña una persona de tu confianza", "LOREG, art. 87.1"], source: S.a87 },
            { cells: ["Camiseta, chapa o símbolo de un partido", "No está permitido en el colegio ni en sus inmediaciones", "LOREG, art. 93"], source: S.a93 },
            { cells: ["Grabar o fotografiar en el colegio", "Los particulares no pueden grabar a quienes intervienen en la votación", "JEC, Acuerdo 226/2024"], source: S.jec226 },
          ],
        },
      },
      sec("ejemplos", "Ejemplos", [
        "Carmen tiene 88 años y vive en una residencia. No puede ir a Correos. Su hijo va al notario con un certificado médico oficial y gratuito, obtiene una autorización solo para ella y pide el voto por correo antes del 19 de noviembre.",
        "Luis tiene una discapacidad intelectual. Va a su colegio con su DNI, entra solo en la cabina o con su hermana, si necesita ayuda para coger la papeleta, y entrega el sobre al presidente.",
      ]),
    ],
  },
  {
    ...base,
    id: "votar-residencia-dependiente",
    path: P.residencia,
    h1: "Votar si vives en una residencia o eres dependiente el 29-N",
    title: "Votar en una residencia o siendo dependiente: cómo (29-N)",
    description: "Si no puedes ir al colegio, vota por correo hasta el 19-N. Si no puedes ir a Correos, otra persona puede pedirlo con poder notarial y certificado médico (art. 72 LOREG).",
    lead: "Respuesta corta: si vives en una residencia o eres dependiente y no puedes ir al colegio, la vía es el voto por correo. Se pide en Correos hasta el 19 de noviembre de 2026. Si tampoco puedes ir a Correos, otra persona puede pedirlo por ti con una autorización notarial individual y un certificado médico oficial y gratuito (artículo 72.c de la LOREG). Si puedes ir al colegio pero necesitas ayuda, puedes votar con una persona de confianza.",
    cta: { href: S.correos.href, label: "Plazos oficiales del voto por correo (Correos)" },
    secondaryCta: { href: S.a72.href, label: "Artículo 72 de la LOREG en el BOE" },
    sources: [S.a72, S.loreg, S.a87, S.correos, S.infoel],
    related: [L.hub, L.hospital, L.correo, L.confianza, L.intelectual, L.elecciones],
    disclaimer: "La Junta Electoral comprueba cada autorización (artículo 72.c). Si tienes dudas sobre el trámite notarial, pregunta en la notaría o en la Oficina del Censo Electoral de tu provincia.",
    faqs: [
      { q: "¿Puede la residencia pedir el voto por correo por todos los residentes?", a: "No. La ley exige un documento individual por cada elector, y una misma persona no puede representar a más de un elector (artículo 72.c de la LOREG)." },
      { q: "¿Qué certificado médico hace falta?", a: "Una certificación médica oficial y gratuita que acredite la enfermedad o incapacidad que impide pedir el voto en persona." },
      { q: "¿Quién recoge la documentación si no puedo firmar en casa?", a: "El aviso de recibo lo firma el elector. Si no está en su domicilio, puede recogerla en Correos él mismo o la persona autorizada notarialmente (artículo 73.2 de la LOREG)." },
      { q: "¿Hasta cuándo se puede enviar el voto?", a: "Según Correos, el voto por correo se deposita en una oficina de Correos hasta el 25 de noviembre de 2026. El sobre dirigido a la mesa no necesita sello." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BYLINE], [[
        "Plazo para pedirlo: hasta el 19 de noviembre de 2026.",
        "Si no puedes ir a Correos: autorización notarial individual + certificado médico oficial y gratuito.",
        "Envío del voto: hasta el 25 de noviembre en Correos, sin sello.",
        "Si puedes ir al colegio: puedes ir acompañado de una persona de confianza.",
      ]]),
      sec("pasos", "Paso a paso si no puedes ir a Correos", [
        "La persona que te ayuda pide un certificado médico oficial que acredite que no puedes hacer la solicitud en persona. Después va al notario, que extiende una autorización solo para ti. Con ambos documentos y tu DNI pide el voto por correo en cualquier oficina de Correos antes del 19 de noviembre.",
        "Cuando llegue la documentación, eliges la papeleta, la metes en el sobre de votación, lo cierras y lo metes en el sobre dirigido a la mesa junto con el certificado. Ese sobre se lleva a Correos antes del 25 de noviembre (artículo 73.3 de la LOREG).",
      ]),
      sec("ejemplo", "Ejemplo", ["Antonio, de 91 años, está encamado en casa. Su sobrina obtiene el certificado médico y la autorización notarial el 10 de noviembre y pide el voto ese mismo día. La documentación llega a casa; Antonio vota y su sobrina deposita el sobre en Correos el 20 de noviembre."]),
    ],
  },
  {
    ...base,
    id: "votar-discapacidad-intelectual",
    path: P.intelectual,
    h1: "Votar con discapacidad intelectual: derecho y apoyos el 29-N",
    title: "Votar con discapacidad intelectual: tu derecho (LO 2/2018)",
    description: "Desde la LO 2/2018 nadie pierde el voto por su discapacidad: toda persona puede votar de forma consciente, libre y voluntaria, con los apoyos que necesite (art. 3.2 LOREG).",
    lead: "Respuesta corta: sí, puedes votar. Desde la Ley Orgánica 2/2018, la discapacidad, incluida la intelectual, ya no es causa para perder el derecho de voto. El artículo 3.2 de la LOREG dice que toda persona puede votar de forma consciente, libre y voluntaria, cualquiera que sea su forma de comunicarlo y con los medios de apoyo que requiera. La única causa que queda para no poder votar es una condena firme a la pena de privación del derecho de sufragio.",
    cta: { href: S.a3.href, label: "Artículo 3 de la LOREG en el BOE" },
    secondaryCta: { href: S.lo2018.href, label: "Ley Orgánica 2/2018 en el BOE" },
    sources: [S.a3, S.lo2018, S.a87, S.loreg, S.infoel],
    related: [L.hub, L.confianza, L.residencia, L.braille, L.llevar, L.elecciones],
    disclaimer: "Nadie puede obligarte ni coaccionarte para votar ni para revelar tu voto (artículo 5 de la LOREG).",
    faqs: [
      { q: "Antes no podía votar porque estaba incapacitado, ¿y ahora?", a: "La Ley Orgánica 2/2018 suprimió las letras b) y c) del artículo 3.1 de la LOREG, que permitían retirar el voto por resolución judicial. Ahora toda persona puede votar con los apoyos que necesite." },
      { q: "¿Puede alguien acompañarme a la cabina?", a: "Sí, si no sabes leer o tu discapacidad te impide elegir la papeleta, meterla en el sobre o entregarla, puedes ir con una persona de tu confianza (artículo 87.1 de la LOREG)." },
      { q: "¿Puede otra persona decidir mi voto?", a: "No. El voto es personal, libre y secreto. La persona de confianza te ayuda con la operación, pero no vota por ti." },
      { q: "¿Qué documento llevo?", a: "DNI, pasaporte o carné de conducir con tu fotografía, aunque estén caducados, según el Ministerio del Interior." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BYLINE], [[
        "Derecho a votar: sí, desde el 7 de diciembre de 2018 (Ley Orgánica 2/2018).",
        "Apoyos: los que necesites, y una persona de confianza en la cabina si hace falta.",
        "Nadie puede votar por ti ni obligarte a votar algo concreto.",
      ]]),
      sec("ejemplo", "Ejemplo", ["Marta tiene síndrome de Down y vive con sus padres. Practica en casa con papeletas de ejemplo. El 29-N va con su madre, que la ayuda a encontrar la papeleta que Marta elige y a meterla en el sobre. Marta entrega el sobre al presidente de la mesa."]),
    ],
  },
  {
    ...base,
    id: "votar-persona-confianza",
    path: P.confianza,
    h1: "Votar acompañado de una persona de confianza: quién puede y cómo",
    title: "Votar con una persona de confianza: quién puede (art. 87)",
    description: "Si no sabes leer o una discapacidad te impide elegir la papeleta, meterla en el sobre o entregarla, puedes ir con una persona de tu confianza (art. 87.1 LOREG). Nadie vota por ti.",
    lead: "Respuesta corta: el artículo 87.1 de la LOREG permite que los electores que no sepan leer, o que por discapacidad no puedan elegir la papeleta, meterla en el sobre o entregarla al presidente de la mesa, se ayuden de una persona de su confianza. Esa persona te acompaña en todo el proceso, pero no puede votar en tu lugar: el voto es personal e intransferible.",
    cta: { href: S.infoel.href, label: "Respuesta oficial del Ministerio del Interior" },
    secondaryCta: { href: S.a87.href, label: "Artículo 87 de la LOREG en el BOE" },
    sources: [S.a87, S.infoel, S.loreg, S.jecInfo],
    related: [L.hub, L.intelectual, L.braille, L.residencia, L.llevar, L.elecciones],
    disclaimer: "La ley no exige un trámite previo para ir con una persona de confianza. Las dudas en el colegio las resuelve el presidente de la mesa.",
    faqs: [
      { q: "¿Hay que pedirlo antes?", a: "La LOREG no prevé ninguna solicitud previa para ir con una persona de confianza." },
      { q: "¿Quién puede ser la persona de confianza?", a: "La ley solo dice que sea «una persona de su confianza»; no exige parentesco." },
      { q: "¿Puede entregar el sobre por mí?", a: "Sí: el artículo 87.1 incluye elegir la papeleta, colocarla en el sobre y entregarla al presidente de la mesa. Lo que no puede es votar en tu nombre." },
      { q: "Soy ciego, ¿tengo otra opción?", a: "Sí. Si conoces el braille, puedes pedir el voto accesible, que garantiza el secreto sin ayuda de nadie. El plazo acaba el 2 de noviembre de 2026." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BYLINE], [[
        "Quién: electores que no saben leer o con una discapacidad que les impide manejar la papeleta.",
        "Qué hace el acompañante: ayuda a elegir, meter en el sobre y entregar la papeleta.",
        "Qué no puede hacer: votar en tu lugar.",
      ]]),
      sec("ejemplo", "Ejemplo", ["Rosa, de 80 años, no sabe leer. Va al colegio con su vecina, que le lee los nombres de las candidaturas en la cabina. Rosa elige y su vecina la ayuda a cerrar el sobre."]),
    ],
  },
  {
    ...base,
    id: "camiseta-chapa-votar",
    path: P.camiseta,
    h1: "¿Se puede ir a votar con camiseta, chapa o símbolos de un partido?",
    title: "¿Puedo ir a votar con camiseta o chapa de un partido?",
    description: "No: el art. 93 de la LOREG prohíbe la propaganda en los colegios y sus inmediaciones, y la Junta Electoral Central lo aplica a camisetas con símbolos partidistas de los electores.",
    lead: "Respuesta corta: no. El artículo 93 de la LOREG prohíbe hacer propaganda electoral de cualquier tipo en los colegios y en sus inmediaciones. La Junta Electoral Central ha dicho que esta prohibición también afecta a los electores y que incluye llevar camisetas con símbolos de carácter partidista (Acuerdo 531/2023). El presidente de la mesa puede tomar las medidas que considere, incluso pedir ayuda a la policía.",
    cta: { href: S.a93.href, label: "Artículo 93 de la LOREG (Junta Electoral Central)" },
    secondaryCta: { href: S.jec531.href, label: "Doctrina de la Junta Electoral Central" },
    sources: [S.a93, S.jec531, S.infoel, S.loreg],
    related: [L.hub, L.foto, L.llevar, L.elecciones],
    disclaimer: "La Junta Electoral Central valora cada símbolo según el contexto de la campaña. Ante la duda, ve a votar con ropa sin mensajes políticos.",
    faqs: [
      { q: "¿Y una chapa o un pin?", a: "Si lleva el nombre, logo o símbolos de una candidatura, entra en la prohibición de propaganda del artículo 93. La decisión en el colegio es del presidente de la mesa." },
      { q: "¿Por qué los interventores llevan el logo del partido?", a: "La Junta Electoral Central admite que interventores y apoderados lleven una identificación simple con el nombre y las siglas de su formación, solo para identificarse; no camisetas ni uniformes (Acuerdo 127/2017)." },
      { q: "¿Pueden los miembros de la mesa llevar símbolos?", a: "No. La Junta Electoral Central exige completa neutralidad política a los miembros de las mesas (Acuerdo 127/2017)." },
      { q: "¿Qué pasa si voy con una camiseta así?", a: "El presidente de la mesa vela por que el colegio esté libre de propaganda y puede pedirte que te la tapes o te la quites, y requerir a la policía si es necesario (artículos 91 y 93 de la LOREG)." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BYLINE], [[
        "Camisetas, chapas o banderas con símbolos de partidos: no, ni dentro ni en las inmediaciones.",
        "Interventores y apoderados: solo una identificación simple con nombre y siglas.",
        "Miembros de mesa: neutralidad total.",
      ]]),
      sec("ejemplo", "Ejemplo", ["Pablo va a votar con una camiseta con el logo de un partido. El presidente de la mesa le pide que se ponga la chaqueta cerrada antes de entrar. Pablo lo hace y vota con normalidad."]),
    ],
  },
  {
    ...base,
    id: "foto-al-voto",
    path: P.foto,
    h1: "¿Puedo hacer una foto a mi voto o grabar en el colegio electoral?",
    title: "¿Puedo hacer una foto a mi voto? Lo que dice la ley",
    description: "El voto es secreto y nadie puede obligarte a revelarlo. La JEC ha dicho que los particulares no pueden grabar a quienes intervienen en la votación. Qué conviene hacer.",
    lead: "Respuesta corta: la LOREG no tiene un artículo específico sobre fotografiar tu propia papeleta, pero sí dice que el voto es secreto (artículo 86.1) y que nadie puede ser obligado a revelarlo (artículo 5). La Junta Electoral Central ha señalado que los particulares no pueden grabar imágenes de quienes intervienen en la votación y el escrutinio, y que solo los medios acreditados pueden grabar dentro del colegio. Lo prudente es no sacar el móvil en la cabina ni ante la mesa.",
    cta: { href: S.jec226.href, label: "Acuerdo 226/2024 de la Junta Electoral Central" },
    secondaryCta: { href: S.a86.href, label: "Artículo 86 de la LOREG en el BOE" },
    sources: [S.a86, S.loreg, S.jec226, S.infoel, S.jecInfo],
    related: [L.hub, L.camiseta, L.llevar, L.elecciones],
    disclaimer: "No hemos encontrado una sanción específica en la LOREG por fotografiar la propia papeleta, así que no la indicamos. El presidente de la mesa tiene autoridad exclusiva en el local (artículo 91).",
    faqs: [
      { q: "¿Es delito hacer una foto a mi papeleta?", a: "La LOREG no recoge una sanción específica para eso. Aun así, el voto es secreto y el presidente de la mesa puede pedirte que guardes el móvil para mantener el orden y la libertad de los electores." },
      { q: "¿Puedo grabar a los miembros de la mesa?", a: "No. La Junta Electoral Central señaló en 2024 que los particulares no pueden grabar imágenes de quienes intervienen en los actos de votación y escrutinio, ni difundirlas." },
      { q: "¿Pueden pedirme que enseñe a quién he votado?", a: "No. Nadie puede ser obligado o coaccionado a revelar su voto (artículo 5 de la LOREG)." },
      { q: "¿Y los periodistas?", a: "Los medios acreditados pueden grabar imágenes generales de la votación sin interferir en ella, según el Ministerio del Interior." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [BYLINE], [[
        "El voto es secreto y nadie puede obligarte a enseñarlo.",
        "Grabar a miembros de mesa u otros electores: no (Junta Electoral Central).",
        "Foto a tu propia papeleta: sin norma específica; mejor no hacerlo dentro del colegio.",
      ]]),
      sec("ejemplo", "Ejemplo", ["Lucía quiere compartir que ha votado. En lugar de fotografiar la papeleta en la cabina, se hace una foto fuera del colegio después de votar."]),
    ],
  },
];

const mergeBy = <T,>(a: T[] | undefined, b: T[] | undefined, k: (x: T) => string): T[] => {
  const out = [...(a ?? [])];
  const seen = new Set(out.map(k));
  for (const x of b ?? []) if (!seen.has(k(x))) { seen.add(k(x)); out.push(x); }
  return out;
};
const ENTRANTES: Record<string, { href: string; label: string }[]> = {
  "/elecciones/voto-accesible-braille": [L.hub, L.confianza],
  "/elecciones/votar-hospitalizado-o-enfermo": [L.hub, L.residencia],
  "/elecciones/voto-por-correo": [L.hub, L.residencia],
  "/elecciones/cambio-de-domicilio-y-censo": [L.hub],
  "/elecciones/votar-por-primera-vez": [L.hub],
  "/elecciones/que-llevar-a-votar": [L.hub, L.camiseta, L.foto],
  "/elecciones/como-votar-el-dia-29": [L.hub, L.confianza],
};
const HECHAS = new WeakSet<Guide>();
export function enlazarSituacionesEspeciales(g: Guide): Guide {
  const add = ENTRANTES[g.path];
  if (!add || HECHAS.has(g)) return g;
  HECHAS.add(g);
  return Object.assign(g, { related: mergeBy(g.related, add, (r) => r.href) });
}
