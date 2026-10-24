import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Cartas del 29-N (24-10-2026): notificación de mesa, tarjeta censal y documentación del voto por correo.
 * Verificado el 24-10-2026: calendario JEC eg2026 (sorteo 31-oct a 4-nov, notificación en 3 días, alegaciones 7 días,
 * resolución 5 días, aviso 72 h); LOREG arts. 26, 27, 28, 73; RD 605/1999 art. 13.3; Orden INT/650/2026 (dieta 75 €);
 * INE nota EG2026 (tarjetas desde el 2-nov); Infoelectoral y La Moncloa 20-10-2026 (envío desde el 9-nov, certificado,
 * recogida personal, depósito hasta el 25-nov, no se vota en persona tras la anotación).
 * Sin cifra nacional de miembros de mesa: no hay dato oficial publicado (descartado el «~180.000»).
 */

const R = "2026-10-24";
const LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672";
const S = {
  jec: { href: "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf", label: "Junta Electoral Central: calendario electoral de las generales del 29-N" },
  a26: { href: `${LOREG}#aveintiseis`, label: "LOREG, artículo 26: sorteo de los miembros de mesa" },
  a27: { href: `${LOREG}#aveintisiete`, label: "LOREG, artículo 27: notificación en 3 días, excusa en 7 días y aviso de 72 horas" },
  a28: { href: `${LOREG}#aveintiocho`, label: "LOREG, artículo 28: permiso de los miembros de mesa" },
  a73: { href: `${LOREG}#asetentaytres`, label: "LOREG, artículo 73: envío certificado y recogida personal del voto por correo" },
  a143: { href: `${LOREG}#acientocuarentaytres`, label: "LOREG, artículo 143: no acudir a la mesa sin causa" },
  rd605: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-8583#a13", label: "BOE: Real Decreto 605/1999, artículo 13: permisos para votar y para la mesa" },
  dieta: { href: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-13948", label: "BOE: Orden INT/650/2026, dieta de 75 € de los miembros de mesa" },
  mesasInfo: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/preguntas-frecuentes/las-mesas-electorales/", label: "Ministerio del Interior (Infoelectoral): preguntas sobre las mesas electorales" },
  ine: { href: "https://www.ine.es/dyngs/Prensa/EG2026.htm", label: "INE: nota de la Oficina del Censo Electoral para el 29-N (tarjetas desde el 2 de noviembre)" },
  ineSede: { href: "https://sede.ine.gob.es/tramite/censo_electoral/", label: "Sede del INE: consulta de tu inscripción en el censo" },
  procedimientos: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/procedimientos-de-votacion/", label: "Ministerio del Interior (Infoelectoral): procedimientos de votación y voto por correo" },
  moncloa: { href: "https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/interior/paginas/voto-por-correo-elecciones-generales-29n.aspx", label: "La Moncloa (Interior), 20-10-2026: voto por correo para el 29-N" },
  jecElectores: { href: "https://www.juntaelectoralcentral.es/cs/jec/informacion", label: "Junta Electoral Central: información para electores" },
  votoInfo: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/preguntas-frecuentes/como-votar/voto-presencial-voto-en-mesa/", label: "Ministerio del Interior (Infoelectoral): votar en la mesa" },
};

const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });

const PATH_NOTIF = "/elecciones/notificacion-mesa-electoral-que-hacer";
const L = {
  notif: { href: PATH_NOTIF, label: "Me ha llegado la notificación de mesa: qué hago" },
  excusa: { href: "/elecciones/excusa-mesa-electoral", label: "Excusas para la mesa: causas y plazo de 7 días" },
  modelo: { href: "/elecciones/modelo-escrito-excusa-mesa-electoral", label: "Modelo de escrito de excusa (Word, PDF y texto)" },
  denegada: { href: "/elecciones/excusa-mesa-electoral-denegada", label: "Me han denegado la excusa: qué puedo hacer" },
  dieta: { href: "/elecciones/miembro-de-mesa-dieta-y-permisos", label: "Dieta de 75 € y permisos de la mesa" },
  cobro: { href: "/elecciones/cuando-se-cobra-la-dieta-de-mesa", label: "Cuándo se cobra la dieta de mesa" },
  horario: { href: "/elecciones/horario-mesa-electoral", label: "Horario de la mesa y permiso del lunes" },
  noVoy: { href: "/elecciones/que-pasa-si-no-voy-a-la-mesa", label: "Qué pasa si te toca mesa y no vas" },
  suplente: { href: "/elecciones/suplente-mesa-electoral", label: "Soy suplente de mesa: qué tengo que hacer" },
  sorteo: { href: "/elecciones/sorteo-mesa-electoral-29n", label: "Sorteo de mesa del 29-N: cuándo es" },
  miembro: { href: "/elecciones/miembro-de-mesa", label: "Me ha tocado mesa electoral" },
  fuera: { href: "/elecciones/mesa-electoral-vivo-fuera", label: "Mesa si vives fuera (otra ciudad, extranjero, Erasmus)" },
  examen: { href: "/elecciones/mesa-electoral-examen-estudiante", label: "Mesa si tienes un examen u oposición" },
  trabajo: { href: "/elecciones/mesa-electoral-trabajo-fuera", label: "Mesa si trabajas ese día o fuera" },
  cuidado: { href: "/elecciones/mesa-electoral-cuidado-familiar-dependiente", label: "Mesa si cuidas de un familiar dependiente" },
  hijos: { href: "/elecciones/mesa-electoral-hijos-pequenos", label: "Mesa si tienes hijos pequeños o das el pecho" },
  casos: { href: "/elecciones/mesa-electoral-casos-especiales", label: "Mesa: autónomos, teletrabajo y otros casos" },
  tarjeta: { href: "/elecciones/tarjeta-censal-cuando-llega", label: "Tarjeta censal: cuándo llega y qué hacer si no" },
  donde: { href: "/elecciones/donde-voto-mesa-electoral", label: "Dónde voto el 29-N" },
  censo: { href: "/elecciones/consultar-censo-electoral", label: "Consultar el censo electoral" },
  noLlega: { href: "/elecciones/no-me-llega-voto-por-correo", label: "No me llega el voto por correo" },
  doc: { href: "/elecciones/documentacion-voto-por-correo", label: "Qué te llega a casa para votar por correo" },
  enviar: { href: "/elecciones/enviar-voto-por-correo", label: "Cómo enviar el voto por correo (hasta el 25-N)" },
  presencial: { href: "/elecciones/votar-en-persona-tras-pedir-correo", label: "Pedí voto por correo: ¿puedo votar en persona?" },
};

export const CARTAS_29N_20261024_GUIDES: Guide[] = [
  {
    id: "mesa-notificacion-que-hacer",
    pack: "elecciones",
    reviewedAt: R,
    path: PATH_NOTIF,
    h1: "Me ha llegado la notificación de mesa electoral: ¿qué hago ahora?",
    title: "Me ha llegado la notificación de mesa electoral: qué hacer (29-N)",
    description: "Te han nombrado presidente, vocal o suplente de mesa para el 29-N. Tienes 7 días desde que te la entregan para excusarte. Fechas, pasos, dieta de 75 € y permisos.",
    lead: "Respuesta corta: si te han entregado la notificación, ya eres miembro de mesa (presidente, vocal o suplente) para el domingo 29 de noviembre. Si tienes un motivo para no ir, tienes 7 días naturales desde el día siguiente a la entrega para presentar la excusa ante la Junta Electoral de Zona. Si no tienes motivo, guarda la carta: ese día te pagan 75 € y tienes permiso en el trabajo.",
    cta: { href: L.modelo.href, label: "Descargar el modelo de excusa" },
    secondaryCta: { href: L.excusa.href, label: "Ver qué excusas se aceptan" },
    sources: [S.jec, S.a26, S.a27, S.a28, S.rd605, S.dieta, S.mesasInfo, S.a143],
    related: [L.excusa, L.modelo, L.suplente, L.dieta, L.horario, L.noVoy, L.denegada, L.fuera, L.examen, L.trabajo, L.cuidado, L.hijos, L.casos, L.sorteo],
    faqs: [
      { q: "¿Cuánto tiempo tengo para excusarme de la mesa?", a: "7 días desde que te notifican (artículo 27.3 de la LOREG y calendario de la Junta Electoral Central). Cuenta desde el día siguiente a la entrega. Ejemplo: si te la dan el jueves 5 de noviembre, el último día es el jueves 12." },
      { q: "¿Quién trae la notificación de la mesa electoral?", a: "La envía tu ayuntamiento, que es quien hace el sorteo. Se entrega en mano y te piden firmar el recibí; junto con ella te dan un manual de instrucciones para los miembros de mesa. Cómo la reparte (notificador municipal, policía local u otro medio) depende de cada ayuntamiento." },
      { q: "Soy suplente, ¿tengo que ir?", a: "Sí, a las 8:00 del 29 de noviembre al local de tu mesa, igual que los titulares. Si están todos los titulares, te puedes ir. Si falta alguno, ocupas su puesto." },
      { q: "¿Cuánto cobro por estar en la mesa?", a: "75 € de dieta por presidente o vocal (Orden INT/650/2026). Además, si trabajas por cuenta ajena, tienes permiso retribuido el domingo si te tocaba trabajar y 5 horas menos de jornada el lunes 30." },
      { q: "Tengo más de 65 años, ¿tengo que ir?", a: "Desde los 65 puedes renunciar sin dar más explicaciones, dentro de los mismos 7 días (artículo 26.2 de la LOREG). A partir de los 70 no te pueden sortear." },
      { q: "No estaba en casa cuando vinieron a notificarme, ¿qué pasa?", a: "El plazo de 7 días empieza cuando te la entregan, no antes. Si te dejan un aviso o te enteras por un vecino, llama a tu ayuntamiento o a la Junta Electoral de Zona para recogerla cuanto antes." },
      { q: "¿Y si no voy y no me he excusado?", a: "No acudir sin causa justificada es un delito castigado con prisión de 3 meses a 1 año o multa de 6 a 24 meses (artículo 143 de la LOREG). Si te surge un problema a última hora, avisa a la Junta Electoral de Zona." },
    ],
    sections: [
      sec("en-resumen", "Lo importante en 30 segundos", [
        "Por el Equipo RutaTrámite. Datos comprobados el 24 de octubre de 2026 en el calendario de la Junta Electoral Central y en la LOREG (Boletín Oficial del Estado).",
      ], [[
        "La notificación es una carta oficial de tu ayuntamiento. Dice qué cargo te ha tocado (presidente, vocal 1.º o 2.º, o suplente), tu mesa y el local donde está.",
        "Los ayuntamientos sortean entre el sábado 31 de octubre y el miércoles 4 de noviembre, y deben notificarte en los 3 días siguientes.",
        "Si quieres excusarte, tienes 7 días desde la entrega. Se presenta por escrito ante la Junta Electoral de Zona, con el documento que lo demuestra.",
        "Si no te excusas o te deniegan la excusa, tienes que estar a las 8:00 del domingo 29 de noviembre en tu local.",
        "Cobras 75 € y, si trabajas, tienes permiso pagado el domingo y 5 horas menos el lunes 30.",
      ]]),
      sec("como-es-la-carta", "Cómo es la carta y quién la entrega", [
        "La notificación la manda tu ayuntamiento, porque es quien organiza el sorteo de las mesas (artículo 26 de la LOREG). Se entrega en mano, a ti, y te pedirán firmar que la has recibido. Junto con ella te entregan un manual con las instrucciones para el día de la votación (lo indica el calendario de la Junta Electoral Central).",
        "En la carta verás tu nombre, el cargo, la identificación de la mesa (distrito, sección y mesa, por ejemplo 01-004-B), la dirección del colegio y la Junta Electoral de Zona a la que te tienes que dirigir. Guárdala: la necesitarás para el permiso del trabajo y para cobrar la dieta.",
        "Cómo la reparte cada ayuntamiento (un notificador municipal, la policía local u otro medio) no lo fija la ley. Si te llama alguien pidiendo datos bancarios o dinero por la mesa, no es oficial: la notificación nunca pide pagos.",
      ]),
      {
        id: "calendario",
        title: "Calendario con las fechas del 29-N",
        paragraphs: ["Fechas del calendario oficial de la Junta Electoral Central para las elecciones generales del 29 de noviembre de 2026."],
        table: {
          caption: "Mesa electoral del 29-N: plazos",
          head: ["Qué pasa", "Cuándo", "Fuente"],
          rows: [
            { cells: ["Sorteo en el ayuntamiento", "31 de octubre a 4 de noviembre"], source: S.jec },
            { cells: ["Te entregan la notificación y el manual", "En los 3 días siguientes al sorteo"], source: S.jec },
            { cells: ["Presentas la excusa (alegación)", "7 días desde la notificación"], source: S.a27 },
            { cells: ["La Junta Electoral de Zona te responde", "En 5 días desde que presentas la excusa"], source: S.jec },
            { cells: ["Si te surge un impedimento después", "Avisa al menos 72 horas antes: antes de las 8:00 del jueves 26 de noviembre"], source: S.a27 },
            { cells: ["Impedimento de última hora", "Hasta antes de las 8:00 del domingo 29"], source: S.jec },
            { cells: ["Día de la votación", "Domingo 29 de noviembre, a las 8:00 en tu local"], source: S.mesasInfo },
          ],
        },
      },
      sec("paso-a-paso", "Qué hacer, paso a paso", [
        "Ejemplo: si te entregan la carta el jueves 5 de noviembre, el plazo empieza el viernes 6 y el último día es el jueves 12 de noviembre.",
      ], [[
        "Mira qué cargo te ha tocado. Si eres suplente, también tienes que ir a las 8:00.",
        "Apunta el día en que te la entregaron y suma 7 días: ese es tu último día para excusarte.",
        "Decide si tienes un motivo. Las excusas que se aceptan siempre son pocas (más de 65 años, discapacidad, baja médica, embarazo de más de 6 meses, hijos pequeños con reducción de jornada…). Otras dependen de la Junta.",
        "Si te excusas, rellena el modelo de escrito, añade el documento que lo prueba (informe médico, certificado de la empresa…) y preséntalo en la Junta Electoral de Zona que aparece en la carta. Guarda la copia sellada o el justificante.",
        "Espera la respuesta. Hasta que no te digan que la aceptan, sigues nombrado.",
        "Si vas a ir, avisa en tu trabajo con la carta y pide el permiso del domingo y del lunes.",
      ]]),
      sec("tu-caso", "Busca tu caso", [
        "Tenemos una guía para cada situación frecuente, con lo que dice la Instrucción 6/2011 de la Junta Electoral Central y un párrafo listo para copiar en el escrito.",
      ], [[
        "Vivo en otra ciudad, en el extranjero o estoy de Erasmus: guía «mesa si vives fuera».",
        "Tengo un examen u oposición: guía «mesa si tienes un examen».",
        "Trabajo ese día, a turnos o fuera: guía «mesa si trabajas».",
        "Cuido de un familiar dependiente: guía «mesa si cuidas de un familiar».",
        "Tengo hijos pequeños o doy el pecho: guía «mesa si tienes hijos pequeños».",
        "Soy autónomo, teletrabajo u otro caso: guía de casos especiales.",
        "Me han denegado la excusa: guía de excusa denegada.",
      ]]),
      sec("dieta-permisos", "Lo que te corresponde si vas: 75 € y permisos", [
        "Dieta: 75 € para el presidente y los vocales que forman la mesa (Orden INT/650/2026). Se cobra entera aunque la mesa acabe pronto.",
        "Permisos si trabajas por cuenta ajena o eres funcionario: permiso retribuido de toda la jornada el domingo 29 si te tocaba trabajar, y una reducción de 5 horas de tu jornada del lunes 30 de noviembre (artículo 28 de la LOREG y artículo 13.3 del Real Decreto 605/1999). La empresa no te puede descontar ese tiempo.",
        "Pide al presidente de la mesa el certificado de haber formado parte de ella: es el justificante para tu empresa.",
      ]),
      sec("no-ir", "Si no vas sin excusa", [
        "Es delito: el artículo 143 de la LOREG castiga no acudir sin causa justificada con prisión de 3 meses a 1 año o multa de 6 a 24 meses. Si tienes un problema, aunque sea el mismo día, avisa antes de las 8:00 a la Junta Electoral de Zona y guarda la prueba.",
      ]),
      sec("como-revisamos", "Cómo hemos hecho esta guía", [
        "La escribe y revisa el Equipo RutaTrámite con el calendario oficial de la Junta Electoral Central para el 29-N, la LOREG, el Real Decreto 605/1999 y la Orden INT/650/2026, todos enlazados abajo. No sabemos cuántas personas reciben esta carta en toda España porque no hay una cifra oficial publicada, así que no la damos.",
      ]),
    ],
  },
];

type Extra = { sections: GuideSection[]; faqs?: { q: string; a: string }[]; sources?: { href: string; label: string }[]; related?: { href: string; label: string }[] };

const AMPLIACION: Record<string, Extra> = {
  "/elecciones/tarjeta-censal-cuando-llega": {
    sections: [
      sec("no-me-ha-llegado", "No me ha llegado la tarjeta censal: qué hago", [
        "La Oficina del Censo Electoral empieza a enviarla el 2 de noviembre de 2026 (nota del INE) y el reparto dura varios días. Hasta mediados de noviembre es normal no tenerla.",
        "Si no te llega, no pasa nada: no la necesitas para votar. Lo que sí conviene es saber dónde votas. Lo puedes consultar en la sede electrónica del INE con tu DNI, en tu ayuntamiento o, desde el 19 de noviembre, en las listas definitivas de secciones y mesas que exponen los ayuntamientos y publican en internet.",
      ], [[
        "Comprueba en la sede del INE que estás inscrito y en qué mesa votas.",
        "Si estás inscrito, ve a votar con tu DNI, pasaporte o carné de conducir con foto.",
        "Si no apareces o la dirección es antigua, llama a la Delegación Provincial de la Oficina del Censo Electoral de tu provincia.",
      ]]),
      sec("datos-erroneos", "La tarjeta tiene datos erróneos", [
        "Si el error es pequeño (una letra del nombre, un número de portal), puedes votar igual: en la mesa te identifican con el DNI y comprueban que estás en la lista.",
        "Si sale una dirección antigua o otra mesa, la tarjeta refleja lo que figura en el censo. El plazo de reclamaciones del censo para estas elecciones fue del 12 al 19 de octubre. Después de esa fecha, consulta tu caso con la Delegación Provincial de la Oficina del Censo Electoral; en general votarás en la mesa que te indique el censo.",
      ]),
      sec("carta-otra-persona", "Me ha llegado la carta de otra persona o de un familiar fallecido", [
        "Si es de alguien que ya no vive en tu casa, no la abras. Escribe en el sobre «no reside en este domicilio» y devuélvela en un buzón o una oficina de Correos. Esa persona tiene que actualizar su padrón donde vive ahora.",
        "Si es de un familiar fallecido, el censo se actualiza con los datos del Registro Civil, pero a veces llega la carta si la defunción es reciente. Puedes devolverla igual o comunicarlo a la Delegación Provincial de la Oficina del Censo Electoral.",
      ]),
      sec("votar-sin-tarjeta", "¿Puedo votar sin la tarjeta censal?", [
        "Sí. La tarjeta es solo informativa. Para votar el 29 de noviembre basta con presentar en la mesa tu DNI, pasaporte o carné de conducir con fotografía (original, no fotocopia).",
      ]),
    ],
    faqs: [
      { q: "No me ha llegado la tarjeta censal, ¿puedo votar?", a: "Sí. La tarjeta no es obligatoria. Ve a tu mesa con el DNI, el pasaporte o el carné de conducir con foto. Para saber dónde votas, consulta la sede del INE o tu ayuntamiento." },
      { q: "¿Cuándo llega la tarjeta censal del 29-N?", a: "El INE la envía a partir del 2 de noviembre de 2026. El reparto dura varios días, así que puede llegarte hacia mediados de noviembre." },
      { q: "Me ha llegado la tarjeta censal de alguien que no vive aquí, ¿qué hago?", a: "No la abras: escribe «no reside en este domicilio» en el sobre y devuélvela por Correos. Si es de un familiar fallecido, también puedes comunicarlo a la Delegación Provincial de la Oficina del Censo Electoral." },
    ],
    sources: [S.ine, S.ineSede, S.votoInfo],
    related: [L.notif, L.donde, L.censo],
  },
  "/elecciones/no-me-llega-voto-por-correo": {
    sections: [
      sec("aviso-correos", "Me han dejado un aviso de Correos: qué hago", [
        "La documentación del voto por correo llega por correo certificado y tienes que recibirla tú en persona, enseñando tu documento de identidad (artículo 73 de la LOREG). Si el cartero no te encuentra, deja un aviso en el buzón para que la recojas en la oficina de Correos que indica.",
      ], [[
        "Ve a la oficina del aviso con el aviso y tu DNI, pasaporte o carné de conducir originales.",
        "Tiene que ir la persona que pidió el voto: no la puede recoger otra persona.",
        "Ve cuanto antes: la Oficina del Censo Electoral la envía entre el 9 y el 22 de noviembre y el último día para mandar el voto es el 25 de noviembre.",
      ]]),
      {
        id: "fechas-correo",
        title: "Fechas del voto por correo del 29-N",
        paragraphs: ["Fechas del calendario de la Junta Electoral Central y de la nota del Ministerio del Interior (20 de octubre de 2026)."],
        table: {
          caption: "Voto por correo: fechas clave",
          head: ["Qué", "Cuándo", "Fuente"],
          rows: [
            { cells: ["Último día para pedirlo", "19 de noviembre"], source: S.moncloa },
            { cells: ["Envío de la documentación (certificado)", "9 a 22 de noviembre"], source: S.jec },
            { cells: ["Último día para entregar el voto en Correos", "25 de noviembre"], source: S.moncloa },
          ],
        },
      },
      sec("votar-en-persona", "Si no me llega, ¿puedo votar en el colegio?", [
        "Si tu solicitud se registró, no. La Oficina del Censo anota en las listas que has pedido el voto por correo y ya no puedes votar en la mesa, aunque no recibas la documentación o no la envíes (Ministerio del Interior y Junta Electoral Central).",
        "Si dudas de que tu solicitud llegara a registrarse, pregunta a la Delegación Provincial de la Oficina del Censo Electoral. Solo si no consta la solicitud podrás votar en tu mesa el 29 de noviembre.",
      ]),
    ],
    faqs: [
      { q: "Me han dejado un aviso de Correos del voto, ¿quién puede recogerlo?", a: "Solo tú, con tu DNI, pasaporte o carné de conducir originales. La ley exige entregar la documentación personalmente al elector." },
      { q: "¿Cuándo llega la documentación del voto por correo?", a: "La Oficina del Censo Electoral la envía por correo certificado entre el 9 y el 22 de noviembre de 2026. Tienes hasta el 25 de noviembre para mandar el voto desde Correos." },
    ],
    sources: [S.procedimientos, S.a73, S.jecElectores],
    related: [L.doc, L.enviar, L.presencial],
  },
  "/elecciones/documentacion-voto-por-correo": {
    sections: [
      sec("si-no-estabas", "Si no estabas en casa cuando vino el cartero", [
        "El envío es certificado y solo te lo pueden entregar a ti. Si no estás, el cartero deja un aviso. Ve a la oficina de Correos que indica, con el aviso y tu DNI, pasaporte o carné de conducir originales. No lo puede recoger otra persona en tu lugar.",
      ]),
      sec("devolver", "Cuándo tienes que mandarlo de vuelta", [
        "Desde que lo recibes hasta el miércoles 25 de noviembre de 2026, en cualquier oficina de Correos, como certificado y sin pagar sello. Tienes que identificarte en la oficina.",
        "Si no puedes ir tú a entregarlo, Correos admite que lo lleve otra persona con una autorización firmada por ti y una fotocopia de tu DNI (nota del Ministerio del Interior del 20 de octubre). Correos tiene un modelo de autorización en su web.",
        "No metas ningún documento de identidad dentro del sobre de votación: el voto sería nulo.",
      ]),
      sec("en-persona", "¿Puedo votar en persona si ya pedí el voto por correo?", [
        "No. Una vez registrada tu solicitud, ya no puedes votar en la mesa el 29 de noviembre, lo envíes o no (Ministerio del Interior y Junta Electoral Central).",
      ]),
    ],
    faqs: [
      { q: "¿Puede otra persona llevar mi voto por correo a Correos?", a: "Sí, con una autorización firmada por ti y una fotocopia de tu DNI. Correos tiene un modelo de autorización. Recoger la documentación, en cambio, solo lo puedes hacer tú." },
      { q: "¿Hasta cuándo puedo enviar el voto por correo?", a: "Hasta el 25 de noviembre de 2026, en una oficina de Correos, como certificado gratuito." },
    ],
    sources: [S.procedimientos, S.a73],
    related: [L.noLlega, L.presencial, L.tarjeta],
  },
  "/elecciones/miembro-de-mesa": { sections: [], related: [L.notif] },
  "/elecciones/sorteo-mesa-electoral-29n": { sections: [], related: [L.notif] },
  "/elecciones/excusa-mesa-electoral": { sections: [], related: [L.notif] },
  "/elecciones/suplente-mesa-electoral": { sections: [], related: [L.notif] },
};

const mergeBy = <T,>(a: T[] | undefined, b: T[] | undefined, k: (x: T) => string): T[] => {
  const out = [...(a ?? [])];
  const seen = new Set(out.map(k));
  for (const x of b ?? []) if (!seen.has(k(x))) { seen.add(k(x)); out.push(x); }
  return out;
};

const HECHAS = new WeakSet<Guide>();
/** Añade secciones sin tocar title, h1 ni description (la tarjeta censal tiene un test de title abierto hasta el 16-11). */
export function ampliarCartas(g: Guide): Guide {
  const x = AMPLIACION[g.path];
  if (!x || HECHAS.has(g)) return g;
  HECHAS.add(g);
  return Object.assign(g, {
    reviewedAt: x.sections.length ? R : g.reviewedAt,
    sections: [...g.sections, ...x.sections],
    faqs: mergeBy(g.faqs, x.faqs, (f) => f.q),
    sources: mergeBy(g.sources, x.sources, (s) => s.href),
    related: mergeBy(g.related, x.related, (r) => r.href),
  });
}
