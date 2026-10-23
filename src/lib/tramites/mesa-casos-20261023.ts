import type { Guide, GuideSection } from "@/lib/tramites/types";

/**
 * Mesa electoral 29-N: casos por situación (23-10-2026, tarde).
 * Texto verificado en el BOE el 23-10-2026: Instrucción JEC 6/2011 consolidada (BOE-A-2011-7705; apartados
 * Primero.2 y .4, Segundo, Tercero, Cuarto y Quinto, con las redacciones de 1/2018, 7/2023 y 2/2025) y LOREG arts. 26, 27, 28, 31.
 * Sin relación con mesa-29n-20261023.ts salvo que este módulo es importado por él (no al revés).
 */

const LOREG = "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672";
const I611 = "https://www.boe.es/buscar/act.php?id=BOE-A-2011-7705";
export const SC = {
  primero: { href: `${I611}#primero`, label: "Instrucción 6/2011 JEC, apartado Primero: cualquier documento sirve y la lista no es cerrada" },
  segundo: { href: `${I611}#segundo`, label: "Instrucción 6/2011 JEC, apartado Segundo: causas personales" },
  tercero: { href: `${I611}#tercero`, label: "Instrucción 6/2011 JEC, apartado Tercero: causas familiares" },
  cuarto: { href: `${I611}#cuao`, label: "Instrucción 6/2011 JEC, apartado Cuarto: causas profesionales" },
  quinto: { href: `${I611}#quinto`, label: "Instrucción 6/2011 JEC, apartado Quinto: decide la Junta Electoral de Zona" },
  a26: { href: `${LOREG}#aveintiseis`, label: "LOREG, artículo 26: sorteo entre los electores de la mesa y renuncia desde los 65" },
  a27: { href: `${LOREG}#aveintisiete`, label: "LOREG, artículo 27: excusa en 7 días y aviso de 72 horas" },
  a28: { href: `${LOREG}#aveintiocho`, label: "LOREG, artículo 28: permiso retribuido de los miembros de mesa" },
  a31: { href: `${LOREG}#atreintayuno`, label: "LOREG, artículo 31: censo de residentes en España y censo de residentes ausentes (CERA)" },
  erta: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2007-21169", label: "BOE: Real Decreto 1621/2007, voto de los españoles temporalmente en el extranjero (ERTA)" },
  dep: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-21990#a18", label: "BOE: Ley 39/2006 de dependencia, artículo 18: prestación para cuidados en el entorno familiar" },
  rd605: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-8583#a13", label: "BOE: Real Decreto 605/1999, artículo 13.3: permiso de jornada completa y reducción de 5 horas el día siguiente" },
  a143: { href: `${LOREG}#acientocuarentaytres`, label: "LOREG, artículo 143: delito por no acudir a la mesa sin causa" },
  permisos: { href: "https://infoelectoral.interior.gob.es/es/proceso-electoral/miembros-de-mesa/informacion-general/permisos-y-dietas/", label: "Ministerio del Interior (Infoelectoral): permisos, turnos de noche y dietas de los miembros de mesa" },
  itss: { href: "https://oeitss.gob.es/tramites/personas-trabajadoras/comunicacion", label: "Inspección de Trabajo y Seguridad Social: buzón para comunicar irregularidades laborales" },
  et37: { href: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a37", label: "BOE: Estatuto de los Trabajadores, artículo 37: lactancia y reducción de jornada por guarda legal" },
};

const R = "2026-10-23";
export const PC = {
  fuera: "/elecciones/mesa-electoral-vivo-fuera",
  examen: "/elecciones/mesa-electoral-examen-estudiante",
  trabajo: "/elecciones/mesa-electoral-trabajo-fuera",
  cuidado: "/elecciones/mesa-electoral-cuidado-familiar-dependiente",
  hijos: "/elecciones/mesa-electoral-hijos-pequenos",
};
const M = {
  modelo: { href: "/elecciones/modelo-escrito-excusa-mesa-electoral", label: "Modelo de escrito de excusa (Word, PDF y texto)" },
  excusa: { href: "/elecciones/excusa-mesa-electoral", label: "Excusa para no ir a la mesa: causas y plazo de 7 días" },
  casos: { href: "/elecciones/mesa-electoral-casos-especiales", label: "Mesa electoral: autónomos, teletrabajo, estudiantes y más" },
  denegada: { href: "/elecciones/excusa-mesa-electoral-denegada", label: "Me han denegado la excusa: qué puedo hacer" },
  dieta: { href: "/elecciones/miembro-de-mesa-dieta-y-permisos", label: "Dieta de 75 € y permisos de la mesa" },
};
export const LC = {
  fuera: { href: PC.fuera, label: "Mesa electoral si vives fuera (otra ciudad, extranjero, Erasmus)" },
  examen: { href: PC.examen, label: "Mesa electoral si tienes un examen u oposición" },
  trabajo: { href: PC.trabajo, label: "Mesa electoral si trabajas fuera, a turnos o en un servicio esencial" },
  cuidado: { href: PC.cuidado, label: "Mesa electoral si cuidas de un familiar dependiente (aunque cobres)" },
  hijos: { href: PC.hijos, label: "Mesa electoral si tienes hijos pequeños o das el pecho" },
};
const DOCX = "/plantillas/escrito-excusa-mesa-electoral.docx";

const REVISION: GuideSection = {
  id: "como-revisamos",
  title: "Cómo revisamos esta guía",
  paragraphs: [
    "La redacta y revisa el Equipo RutaTrámite. Hemos leído el texto consolidado de la Instrucción 6/2011 de la Junta Electoral Central en el BOE (con los cambios de 2014, 2016, 2018, 2023 y 2025) y la LOREG. Cuando decimos «se acepta siempre» es porque la Instrucción usa la fórmula «en todo caso justifican, por sí solas»; cuando decimos «depende» es porque la Instrucción deja la decisión a «las circunstancias de cada caso» o porque tu situación no aparece en la lista.",
    "La lista de la Instrucción es un ejemplo, no un catálogo cerrado (apartado Primero.4): la Junta Electoral de Zona puede aceptar situaciones parecidas. No conocemos estadísticas oficiales de excusas aceptadas, así que no damos porcentajes. Si ves un error, avísanos desde Contacto.",
  ],
};

const PLAZO = "Ejemplo de plazo: si te notifican el jueves 5 de noviembre, los 7 días naturales cuentan desde el día siguiente y el último es el jueves 12 de noviembre (artículo 27.3 de la LOREG). Si la causa aparece después, avisa a la Junta al menos 72 horas antes (artículo 27.4): para el 29-N, antes de las 8:00 del jueves 26 si la causa ya la conoces.";

/** Párrafos opcionales para el escrito (punto 2), reutilizados en la web y en el DOCX/PDF. */
export const PARRAFOS_EXCUSA: { id: string; title: string; body: string }[] = [
  { id: "p-vivo-fuera", title: "Vivo en otra comunidad autónoma", body: "Que desde el [fecha] mi residencia habitual está en [municipio, provincia], en la comunidad autónoma de [comunidad], distinta de aquella en la que estoy empadronado/a, por [motivo: trabajo, estudios…]. Desplazarme a [municipio de la mesa] para estar a las 8:00 del 29 de noviembre y permanecer hasta el final del escrutinio me supone [describe la dificultad: distancia de X km, horario de trabajo del lunes 30, coste del viaje…], lo que encaja en la causa 6.ª del apartado Segundo.2 de la Instrucción 6/2011 de la Junta Electoral Central. Adjunto [contrato de alquiler / certificado de la empresa o del centro de estudios] y [otros]." },
  { id: "p-extranjero", title: "Estoy temporalmente en el extranjero (ERTA, Erasmus, trabajo)", body: "Que me encuentro temporalmente en [país] desde el [fecha] y hasta el [fecha] por [Erasmus / trabajo / estudios], de modo que el 29 de noviembre de 2026 no estaré en España. Solicito que la Junta valore esta situación como análoga a las previstas en la Instrucción 6/2011 (apartado Primero.4). Adjunto [certificado de la universidad o de la empresa de destino / contrato / billetes]." },
  { id: "p-examen", title: "Tengo un examen u oposición", body: "Que el [día] de [mes] de 2026 a las [hora] debo realizar en [ciudad] el examen de [asignatura / prueba / oposición], convocado por [centro u organismo] con fecha anterior a la convocatoria electoral y que no puede aplazarse, según acredita el documento adjunto. Formar parte de la mesa el 29 de noviembre, hasta el final del escrutinio, me impediría [presentarme / llegar / prepararme con normalidad]. Solicito que la Junta lo valore conforme al apartado Primero.4 de la Instrucción 6/2011. Adjunto [certificado del centro / convocatoria oficial con fecha]." },
  { id: "p-servicio-esencial", title: "Trabajo en un servicio esencial ese día", body: "Que el 29 de noviembre de 2026 debo prestar servicio como [puesto] en [centro, p. ej. hospital, bomberos, protección civil], servicio esencial de la comunidad, en turno de [hora] a [hora]. Adjunto informe del responsable del servicio en el que se detallan los motivos que impiden o hacen particularmente difícil mi sustitución ese día, conforme al apartado Cuarto.2.º de la Instrucción 6/2011." },
  { id: "p-trabajo-fuera", title: "Trabajo fuera o a turnos (no esencial)", body: "Que trabajo como [puesto] en [empresa], en [ciudad o país], y el 29 de noviembre de 2026 [tengo turno de … / estaré desplazado/a en …]. Adjunto certificado de la empresa sobre [el turno / el desplazamiento] y sobre la dificultad de sustituirme. Solicito que la Junta lo valore conforme al apartado Primero.4 de la Instrucción 6/2011." },
  { id: "p-aviso-empresa", title: "Aviso a tu empresa (no se presenta a la Junta)", body: "Asunto: permiso por ser miembro de mesa electoral el 29-N.\n\nComo acredito con la notificación adjunta, he sido designado/a [presidente/a | vocal] de la Mesa [identificación] para las Elecciones Generales del domingo 29 de noviembre de 2026. Conforme al artículo 28.1 de la LOREG y al artículo 13.3 del Real Decreto 605/1999, solicito: (1) permiso retribuido de jornada completa el domingo 29, en el que tengo turno de [hora] a [hora]; y (2) la reducción de cinco horas de mi jornada del lunes 30 de noviembre (turno de [hora] a [hora]), que propongo disfrutar [entrando a las … / saliendo a las …]. Después de la jornada entregaré el certificado de haber formado parte de la mesa." },
  { id: "p-acontecimiento", title: "Soy profesional en un evento ese día (autónomos)", body: "Que el 29 de noviembre de 2026 debo participar como [función] en [evento] en [lugar], previsto desde el [fecha], antes de la convocatoria electoral. No puedo ser sustituido/a y mi ausencia obligaría a suspenderlo, con perjuicios económicos relevantes, como acreditan los documentos adjuntos (apartado Cuarto.4.º de la Instrucción 6/2011)." },
  { id: "p-cuidado-familiar", title: "Cuido de un familiar dependiente (también si cobro por ello)", body: "Que tengo a mi cargo el cuidado directo y continuo de [parentesco: madre, padre, suegra, hermano…], familiar en [primer/segundo] grado, que por [edad / accidente / enfermedad] no puede valerse por sí mismo/a. Lo acredito con [copia del escrito de reducción de jornada del artículo 37.6 del Estatuto de los Trabajadores / certificación de los servicios sociales de la comunidad autónoma o del ayuntamiento, p. ej. la resolución que me reconoce como persona cuidadora]. Es la causa 3.ª del apartado Tercero.1 de la Instrucción 6/2011." },
  { id: "p-hijos", title: "Tengo hijos menores de 12 años a mi cargo", body: "Que tengo a mi cargo el cuidado directo y continuo, por guarda legal, de [número] hijo/s menor/es de doce años, nacido/s el [fecha]. Adjunto [copia del escrito de reducción de jornada por guarda legal / certificación de servicios sociales]. Es la causa 2.ª del apartado Tercero.1 de la Instrucción 6/2011." },
  { id: "p-lactancia", title: "Estoy en periodo de lactancia", body: "Que estoy al cuidado de un lactante, nacido el [fecha]. Adjunto certificación de la reducción de jornada por lactancia expedida por [la empresa / las empresas de los progenitores] y copia del libro de familia o certificado del Registro Civil. Es la causa 1.ª del apartado Tercero.1 de la Instrucción 6/2011." },
  { id: "p-monoparental", title: "Familia monoparental o el otro progenitor no puede", body: "Que soy [madre / padre] de [número] hijo/s menor/es de catorce años y [formo una familia monoparental / el otro progenitor no puede ocuparse de ellos el 29 de noviembre porque …]. Adjunto [título de familia monoparental / libro de familia / certificado de la empresa del otro progenitor / otros]. Solicito que se valore conforme a la causa 2.ª del apartado Tercero.2 de la Instrucción 6/2011." },
  { id: "p-boda", title: "Boda u otro evento familiar ese día", body: "Que el 29 de noviembre de 2026 se celebra [mi boda / la boda de mi hermana / …] en [lugar], evento familiar inaplazable [o cuyo aplazamiento causaría perjuicios económicos importantes]. Adjunto [contrato con el lugar de celebración / reserva / documento del registro civil o de la parroquia] y [justificantes de los perjuicios]. Es la causa 1.ª del apartado Tercero.2 de la Instrucción 6/2011." },
  { id: "p-salud", title: "Embarazo, baja médica u operación", body: "Que [estoy embarazada de [x] meses, con fecha probable de parto el …] / [estoy de baja por incapacidad temporal desde el …] / [tengo prevista una intervención o prueba inaplazable el … en …]. Adjunto [certificado médico / parte de baja / citación e informe del centro sanitario]. Es una causa del apartado Segundo de la Instrucción 6/2011." },
];

const parrafos = (...ids: string[]) => PARRAFOS_EXCUSA.filter((p) => ids.includes(p.id));

const sec = (id: string, title: string, paragraphs: string[], lists?: string[][]): GuideSection => ({ id, title, paragraphs, ...(lists ? { lists } : {}) });

export const MESA_CASOS_20261023_GUIDES: Guide[] = [
  {
    id: "mesa-vivo-fuera",
    pack: "elecciones",
    reviewedAt: R,
    path: PC.fuera,
    h1: "Me ha tocado mesa y vivo fuera: otra ciudad, el extranjero o Erasmus",
    title: "Mesa electoral si vives en otra ciudad, en el extranjero o de Erasmus",
    description: "Empadronado en un sitio y viviendo en otro: cuándo se acepta la excusa de la mesa del 29-N, qué pasa si eres CERA o ERTA y qué documento adjuntar.",
    lead: "Vivir en otra ciudad no te libra por sí solo de la mesa. La Instrucción 6/2011 de la Junta Electoral Central solo prevé el cambio de residencia habitual a otra comunidad autónoma, y además tienes que justificar la dificultad; aun así decide la Junta Electoral de Zona. Si vives de forma permanente en el extranjero e inscrito en el CERA, no entras en el sorteo. Si estás fuera de forma temporal (ERTA, Erasmus), sí puedes salir y tienes que excusarte.",
    cta: { href: DOCX, label: "Descargar el modelo de escrito (Word)" },
    secondaryCta: { href: M.modelo.href, label: "Ver el modelo con este párrafo" },
    sources: [SC.segundo, SC.primero, SC.quinto, SC.a26, SC.a27, SC.a31, SC.erta],
    related: [M.modelo, M.excusa, LC.trabajo, LC.examen, M.casos, M.denegada],
    faqs: [
      { q: "Estoy empadronado en mi pueblo pero vivo en otra ciudad, ¿me libro de la mesa?", a: "No automáticamente. La Instrucción 6/2011 solo recoge el cambio de residencia habitual a otra comunidad autónoma y, además, que justifiques la dificultad de formar parte de la mesa. Si la otra ciudad está en tu misma comunidad, puedes alegarlo, pero la Junta lo valora caso a caso." },
      { q: "Vivo en el extranjero, ¿me puede tocar mesa?", a: "Si estás inscrito en el CERA (censo de residentes ausentes) no: la mesa se sortea entre las personas de la lista de electores de esa mesa (artículo 26.2 de la LOREG) y nadie puede estar a la vez en el CERA y en el censo de residentes en España (artículo 31.2)." },
      { q: "Estoy de Erasmus o trabajando fuera unos meses (ERTA), ¿me puede tocar?", a: "Sí. Si sigues inscrito como residente en España, estás en la lista de tu mesa y puedes salir en el sorteo. Estar fuera el 29-N no figura como causa en la Instrucción, pero la lista no es cerrada: alégalo con un certificado de la universidad o de la empresa y la Junta decide." },
      { q: "Me ha tocado y estoy fuera, ¿quién recoge la notificación?", a: "La ley exige notificarte en 3 días (artículo 27.2) y el plazo de 7 días empieza con la notificación. Si alguien te avisa de que ha llegado, actúa ya: puedes presentar la excusa por escrito ante la Junta Electoral de Zona, que te dirá por qué canal." },
      { q: "Si me deniegan la excusa y no voy, ¿qué pasa?", a: "No acudir sin causa justificada es delito (artículo 143 de la LOREG). Si te la deniegan, tienes que ir o recurrir; mira la guía de excusa denegada." },
    ],
    sections: [
      {
        id: "veredicto",
        title: "¿Se acepta? Caso por caso",
        paragraphs: ["Por el Equipo RutaTrámite. «Se acepta siempre» solo aparece cuando la Instrucción dice que la causa justifica la excusa «en todo caso»; ninguna de estas situaciones está en ese grupo."],
        table: {
          caption: "Vivir fuera y mesa electoral del 29-N",
          head: ["Situación", "¿Se acepta?", "Qué adjuntar", "Fuente"],
          rows: [
            { cells: ["Inscrito en el CERA (vives en el extranjero)", "No te toca: no estás en la lista de la mesa", "Nada", ], source: SC.a31 },
            { cells: ["Vives en otra comunidad autónoma pero sigues empadronado en la de la mesa", "Depende: la Junta valora si justificas la dificultad", "Contrato de alquiler, certificado de empresa o de matrícula y datos de distancia o de horario", ], source: SC.segundo },
            { cells: ["Vives en otra ciudad de la misma comunidad", "Depende, y es más difícil: no figura en la Instrucción", "Lo mismo, y explica por qué no puedes ir", ], source: SC.primero },
            { cells: ["Temporalmente en el extranjero (ERTA, trabajo)", "Depende: no figura, pero la lista no es cerrada", "Certificado de la empresa o contrato, billetes", ], source: SC.primero },
            { cells: ["Erasmus u otra estancia de estudios fuera", "Depende", "Certificado de la universidad de destino o acuerdo de movilidad con fechas", ], source: SC.primero },
          ].map((r) => ({ cells: r.cells, source: r.source })),
        },
      },
      sec("texto-exacto", "Lo que dice exactamente la Instrucción 6/2011", [
        "Entre las causas que «pueden justificar la excusa […] atendiendo a las circunstancias de cada caso que corresponde valorar a la Junta Electoral de Zona», la Instrucción incluye esta: «El cambio de la residencia habitual a un lugar situado en otra Comunidad Autónoma cuando, además de dicha circunstancia, se justifique la dificultad de poder formar parte de una Mesa electoral» (apartado Segundo.2, causa 6.ª, añadida en 2023).",
        "Fíjate en las dos condiciones: otra comunidad autónoma y la dificultad justificada. Decir solo «vivo en Madrid» no basta; explica la distancia, el horario y por qué no puedes estar en el colegio a las 8:00 del domingo y quedarte hasta el final del recuento.",
      ]),
      sec("cera-erta", "CERA y ERTA: la diferencia que decide si te toca", [
        "CERA son los españoles que viven de forma estable en el extranjero e inscritos en el consulado. La LOREG separa ese censo del de residentes en España y prohíbe estar en los dos a la vez (artículo 31.2). Como la mesa se sortea entre la lista de electores de esa mesa (artículo 26.2), si eres CERA no te pueden designar.",
        "ERTA son los residentes en España que están fuera de forma temporal entre la convocatoria y la elección: Erasmus, un contrato de unos meses o un viaje largo. Siguen en el censo de su municipio, así que pueden salir en el sorteo. Votar por correo desde fuera (Real Decreto 1621/2007) no te excusa de la mesa: tienes que pedir la excusa a la Junta.",
      ]),
      sec("ejemplo", "Ejemplo con fechas para el 29-N", [
        "Lucía está empadronada en Zamora (Castilla y León) y desde marzo de 2026 vive y trabaja en Valencia (Comunitat Valenciana). Su ayuntamiento sortea el martes 3 de noviembre y le notifican en casa de sus padres el jueves 5. Tiene hasta el jueves 12 de noviembre para presentar la excusa ante la Junta Electoral de Zona de Zamora.",
        "Adjunta el contrato de alquiler de Valencia, un certificado de la empresa con su horario del lunes 30 de noviembre a las 8:00 y el trayecto (más de 500 km). Encaja en la causa 6.ª, pero la decisión es de la Junta. Si se la deniegan, tiene que ir o recurrir.",
        PLAZO,
      ]),
      { id: "parrafo", title: "Párrafo listo para tu escrito", paragraphs: ["Copia el que corresponda en el punto 2 del modelo y rellena los corchetes."], models: parrafos("p-vivo-fuera", "p-extranjero") },
      REVISION,
    ],
  },
  {
    id: "mesa-examen-estudiante",
    pack: "elecciones",
    reviewedAt: R,
    path: PC.examen,
    h1: "Me ha tocado mesa y tengo un examen: estudiantes y oposiciones",
    title: "Mesa electoral y examen u oposición: ¿puedes excusarte el 29-N?",
    description: "Ser estudiante no libra de la mesa del 29-N. Qué pasa si tienes un examen u oposición el 29 o el 30, qué documento pide la Junta y un párrafo listo.",
    lead: "Ni ser estudiante ni tener exámenes figura entre las causas de la Instrucción 6/2011 de la Junta Electoral Central. Aun así la lista no es cerrada: si tienes un examen u oposición inaplazable el domingo 29 o el lunes 30 por la mañana, alégalo con el documento del centro o la convocatoria oficial. La Junta Electoral de Zona lo valora caso a caso, así que no está garantizado.",
    cta: { href: DOCX, label: "Descargar el modelo de escrito (Word)" },
    secondaryCta: { href: M.modelo.href, label: "Ver el modelo con este párrafo" },
    sources: [SC.primero, SC.segundo, SC.quinto, SC.a27, SC.a28],
    related: [M.modelo, M.excusa, LC.fuera, M.casos, M.denegada, M.dieta],
    faqs: [
      { q: "¿Ser estudiante es causa para no ir a la mesa?", a: "No. La Instrucción 6/2011 no incluye la condición de estudiante. Si estudias en otra comunidad autónoma, mira la causa de cambio de residencia habitual (guía «vivo fuera»)." },
      { q: "Tengo un examen el lunes 30 de noviembre, ¿me libro?", a: "Depende de la Junta Electoral de Zona. No es una causa de la lista, pero puedes alegarlo con un certificado del centro o la convocatoria con fecha y hora, y explicar por qué no puedes aplazarlo. La Junta debe motivar la denegación." },
      { q: "¿Y una oposición convocada para el 29 de noviembre?", a: "Tampoco figura en la lista, pero una prueba oficial con fecha fijada antes de la convocatoria electoral, que no se puede repetir, es un argumento fuerte. Adjunta la publicación oficial de la fecha y tu admisión." },
      { q: "¿Tengo derecho a no ir a clase el lunes si soy miembro de mesa?", a: "El permiso del artículo 28 de la LOREG es para trabajadores por cuenta ajena y funcionarios. Para clases o exámenes no hay una regla general en la LOREG: pide a tu centro un justificante y pregunta si te cambian la fecha." },
    ],
    sections: [
      {
        id: "veredicto",
        title: "¿Se acepta? Caso por caso",
        paragraphs: ["Por el Equipo RutaTrámite. Ninguno de estos casos aparece en la Instrucción como causa que se acepta «en todo caso»."],
        table: {
          caption: "Estudiantes, exámenes y mesa electoral del 29-N",
          head: ["Situación", "¿Se acepta?", "Qué adjuntar", "Fuente"],
          rows: [
            { cells: ["Ser estudiante, sin más", "No", "—"], source: SC.primero },
            { cells: ["Examen u oposición el domingo 29", "Depende; es el caso más fuerte si la fecha es oficial e inaplazable", "Certificado del centro o publicación oficial de la fecha y admisión"], source: SC.primero },
            { cells: ["Examen el lunes 30 por la mañana, en otra ciudad", "Depende", "Certificado con fecha, hora y lugar; explica el desplazamiento"], source: SC.primero },
            { cells: ["Exámenes durante la semana siguiente", "Difícil: la mesa es un solo día", "—"], source: SC.quinto },
            { cells: ["Estudias y vives en otra comunidad autónoma", "Depende (causa 6.ª: residencia habitual en otra comunidad y dificultad)", "Matrícula, alquiler o certificado de residencia"], source: SC.segundo },
          ],
        },
      },
      sec("ejemplo", "Ejemplo con fechas para el 29-N", [
        "Marcos opositaba a un cuerpo de la Administración y el organismo publicó antes de la convocatoria electoral que el primer ejercicio se celebrará el domingo 29 de noviembre en Madrid. Su mesa está en Talavera. Le notifican el miércoles 4 de noviembre: tiene hasta el miércoles 11 de noviembre.",
        "Adjunta la publicación oficial con la fecha y su admisión a la prueba. Es la situación que más se parece a las que la Instrucción acepta (algo inaplazable, fijado antes de la convocatoria y documentado), pero sigue decidiendo la Junta.",
        PLAZO,
      ]),
      sec("consejos", "Cómo reforzar tu escrito", [], [[
        "Explica por qué no se puede aplazar el examen: convocatoria única, fecha oficial o reglamento del centro.",
        "Di cuándo se fijó la fecha: si fue antes de la convocatoria electoral, dilo.",
        "Pide al centro un certificado con fecha, hora y lugar; un pantallazo del campus virtual vale menos.",
        "Si además vives en otra comunidad autónoma, alega las dos cosas en el mismo escrito.",
      ]]),
      { id: "parrafo", title: "Párrafo listo para tu escrito", paragraphs: ["Copia este texto en el punto 2 del modelo y rellena los corchetes."], models: parrafos("p-examen") },
      REVISION,
    ],
  },
  {
    id: "mesa-trabajo-fuera",
    pack: "elecciones",
    reviewedAt: R,
    path: PC.trabajo,
    h1: "Me ha tocado mesa y trabajo: el domingo, el lunes a primera hora, fuera o sin contrato",
    title: "Mesa electoral si trabajas ese día, fuera o a turnos (29-N)",
    description: "Trabajar el 29-N no libra de la mesa salvo excepciones: servicios esenciales, eventos y trabajo fuera. Qué acepta la Junta y qué certificado pedir.",
    lead: "Tener que trabajar ese día no es, por sí solo, una causa para librarte de la mesa: la ley da a los asalariados un permiso retribuido para ser miembro de mesa (artículo 28 de la LOREG). La Instrucción 6/2011 sí recoge algunos casos profesionales: servicios esenciales como sanidad o bomberos, personal electoral, directores de medios y profesionales de un acontecimiento público programado antes de la convocatoria. Siempre hace falta el informe o el documento que indica la Instrucción.",
    cta: { href: DOCX, label: "Descargar el modelo de escrito (Word)" },
    secondaryCta: { href: M.modelo.href, label: "Ver el modelo con estos párrafos" },
    sources: [SC.cuarto, SC.primero, SC.segundo, SC.quinto, SC.a27, SC.a28, SC.rd605, SC.permisos, SC.a143, SC.itss],
    related: [M.modelo, M.excusa, M.dieta, LC.fuera, M.casos, M.denegada],
    faqs: [
      { q: "Entro a trabajar el lunes 30 a las 6:00, ¿qué derecho tengo?", a: "A una reducción de cinco horas de tu jornada del lunes 30 (artículo 28.1 de la LOREG y artículo 13.3 del Real Decreto 605/1999), si eres trabajador por cuenta ajena o funcionario. La norma no dice qué horas; lo práctico es pactar con la empresa entrar 5 horas más tarde. No es una causa para librarte de la mesa." },
      { q: "Trabajo ese domingo sin contrato, ¿me puedo excusar?", a: "Lo previsible es que no. La excusa debe estar justificada y documentada, y sin contrato no hay nada que acreditar; un turno normal tampoco sería causa con contrato. No ir sin causa legítima es delito, castigado con prisión de 3 meses a 1 año o multa de 6 a 24 meses (artículo 143 de la LOREG)." },
      { q: "Trabajo el domingo, ¿me libro de la mesa?", a: "En general no. Si trabajas por cuenta ajena, tu empresa debe darte permiso retribuido para la jornada electoral (artículo 28 de la LOREG). La excepción clara es trabajar en un servicio esencial, con un informe del responsable sobre por qué no te pueden sustituir." },
      { q: "¿Qué cuenta como servicio esencial?", a: "La Instrucción 6/2011 habla de «servicios esenciales de la comunidad de importancia vital, como los de carácter médico, sanitario, de protección civil, bomberos, etcétera». El «etcétera» deja margen a la Junta, que valora el informe." },
      { q: "Soy autónomo, ¿puedo excusarme?", a: "Ser autónomo no basta. Sí se recoge el caso del profesional que debe participar el día de la votación en un acontecimiento público programado antes de la convocatoria, que no puede ser sustituido y cuya ausencia obligaría a suspenderlo con perjuicios económicos relevantes." },
      { q: "Trabajo en otra provincia o en el extranjero, ¿qué hago?", a: "Si tu residencia habitual está en otra comunidad autónoma, alega la causa 6.ª con la dificultad justificada. Si estás desplazado fuera de España, no figura en la lista, pero puedes alegarlo con un certificado de la empresa y la Junta lo valora." },
      { q: "Mi empresa no me quiere dar el día, ¿es excusa?", a: "No. El permiso del artículo 28 de la LOREG es un derecho, retribuido, y además tienes 5 horas menos de jornada el lunes 30. Enseña a tu empresa la credencial o la notificación." },
    ],
    sections: [
      {
        id: "veredicto",
        title: "¿Me libro de la mesa si trabajo el 29-N? Caso por caso",
        paragraphs: ["Por el Equipo RutaTrámite. Las causas profesionales del apartado Cuarto exigen siempre un documento concreto; sin él lo normal es que se deniegue."],
        table: {
          caption: "Trabajo y mesa electoral del 29-N",
          head: ["Situación", "¿Se acepta?", "Qué adjuntar", "Fuente"],
          rows: [
            { cells: ["Servicio esencial ese día (sanidad, bomberos, protección civil…)", "Sí, si el informe acredita que es difícil sustituirte", "Informe del responsable del servicio con los motivos"], source: SC.cuarto },
            { cells: ["Trabajas para la Junta, un juzgado o una Administración con funciones electorales; notarios del artículo 91.5", "Sí, con informe", "Informe del responsable del órgano"], source: SC.cuarto },
            { cells: ["Director de un medio o jefe de informativos que cubre la jornada", "Sí", "Certificado del medio"], source: SC.cuarto },
            { cells: ["Profesional (también autónomo) de un evento público programado antes de la convocatoria", "Depende: si no te pueden sustituir, se suspendería y habría perjuicio económico relevante", "Contrato o programa con fecha, y prueba del perjuicio"], source: SC.cuarto },
            { cells: ["Turno normal el domingo 29, con contrato (hostelería, comercio, fábrica…)", "No: la empresa debe darte permiso retribuido de jornada completa", "Nada para la Junta; a la empresa, la notificación"], source: SC.a28 },
            { cells: ["Entras a trabajar el lunes 30 muy temprano (p. ej. a las 6:00)", "No es causa: tienes derecho a 5 horas menos de jornada ese día", "A la empresa, la notificación y luego el certificado de la mesa"], source: SC.rd605 },
            { cells: ["Trabajas ese domingo sin contrato", "No: no hay documento que acredite la causa", "—"], source: SC.a27 },
            { cells: ["Vives y trabajas en otra comunidad autónoma", "Depende (causa 6.ª)", "Contrato de trabajo, alquiler y por qué te resulta difícil ir"], source: SC.segundo },
            { cells: ["Desplazado por trabajo en el extranjero", "Depende: no figura en la lista", "Certificado de la empresa con fechas"], source: SC.primero },
          ],
        },
      },
      sec("texto-exacto", "Lo que dice la Instrucción 6/2011 (apartado Cuarto)", [
        "Pueden excusarse «quienes deban prestar durante la jornada electoral servicios esenciales de la comunidad de importancia vital, como los de carácter médico, sanitario, de protección civil, bomberos, etcétera». La justificación es un «informe emitido por el responsable del servicio, en el que se detallarán los motivos que impidan o hagan particularmente difícil la sustitución del interesado».",
        "Y también «los profesionales que deban participar en acontecimientos públicos a celebrar el día de la votación, que estén previstos con anterioridad a la convocatoria electoral, cuando el interesado no pueda ser sustituido y la no participación del mismo obligue a suspender el acontecimiento, produciendo perjuicios económicos relevantes».",
      ]),
      sec("ejemplo", "Ejemplo con fechas para el 29-N", [
        "Sara es enfermera de urgencias y tiene turno de 8:00 a 20:00 el domingo 29 de noviembre. Le notifican el viernes 6 de noviembre, así que tiene hasta el viernes 13. Pide a su supervisora un informe que diga que ese turno no se puede cubrir con otra persona y por qué (plantilla mínima, cuadrante cerrado).",
        "Javier es camarero y trabaja ese domingo. Su caso no está en la Instrucción: la empresa debe darle permiso retribuido (artículo 28) y la Junta probablemente denegaría una excusa basada solo en el turno.",
        PLAZO,
      ]),
      sec("domingo-con-contrato", "Trabajo el domingo 29 con contrato: qué tiene que hacer la empresa", [
        "Trabajar ese día no es una causa de excusa. A cambio, la ley te protege: «Los trabajadores por cuenta ajena y los funcionarios nombrados Presidentes o Vocales de las Mesas Electorales tienen derecho a un permiso retribuido de jornada completa durante el día de la votación, si es laboral. En todo caso, tienen derecho a una reducción de su jornada de trabajo de cinco horas el día inmediatamente posterior» (artículo 28.1 de la LOREG). El Real Decreto 605/1999 (artículo 13.3) lo repite y lo extiende a los interventores.",
        "Qué debe hacer la empresa: darte libre el domingo 29 sin descontarte el sueldo y reducirte 5 horas la jornada del lunes 30. Es un permiso retribuido: no se descuenta del sueldo. Avísala cuanto antes con la notificación y, después, entrégale el certificado de haber formado parte de la mesa. Si es un servicio esencial y no te pueden sustituir, lo que procede es el informe del responsable para la excusa (apartado Cuarto.2.º).",
        "Según el Ministerio del Interior, si eres suplente y acabas ocupando un puesto, tienes los mismos permisos y la dieta; si no llegas a formar parte de la mesa, no.",
      ]),
      sec("lunes-6", "Entro el lunes 30 a las 6:00: la reducción de 5 horas", [
        "La norma vigente es el artículo 28.1 de la LOREG y el artículo 13.3 del Real Decreto 605/1999: «una reducción de su jornada de trabajo de cinco horas el día inmediatamente posterior», es decir, el lunes 30 de noviembre. La ley dice «en todo caso», así que también la tienes si el domingo era tu día de descanso. Es para trabajadores por cuenta ajena y personal de las Administraciones; los autónomos no tienen un permiso equivalente.",
        "Lo que la norma no dice es qué 5 horas: no fija si se quitan al principio o al final del turno. Lo razonable, y lo que conviene pactar, es empezar más tarde, porque el recuento puede acabar de madrugada. No hemos encontrado ninguna norma que te dé el lunes entero libre.",
        "Turnos de noche: la Junta Electoral Central (acuerdos de 2004 y 2011, recogidos por el Ministerio del Interior) entiende que el turno de noche que empieza el sábado cuenta como jornada del día electoral. La reducción de 5 horas puede aplicarse al turno de noche siguiente, siempre que empiece el lunes.",
        "Ejemplo: Iván tiene turno de 6:00 a 14:00 el lunes 30 en un almacén. La mesa cierra el acta a la 1:30 del lunes. Con la reducción trabaja 3 horas: puede pactar entrar a las 11:00 y salir a las 14:00. Si su turno fuera de noche, de 22:00 del lunes a 6:00 del martes, la reducción iría a ese turno. Para quedar a salvo, avisa por escrito con el párrafo de abajo.",
      ]),
      sec("sin-contrato", "Trabajo ese domingo sin contrato", [
        "Dicho sin rodeos: la excusa tiene que estar «justificada y documentada» (artículo 27.3 de la LOREG). Si trabajas sin contrato ni alta, no tienes nada que acredite la causa, y además un turno normal no sería causa ni con contrato. Lo previsible es que la Junta la deniegue. No te recomendamos alegar algo que no puedas probar ni presentar documentos que no se correspondan con la realidad.",
        "No acudir a la mesa sin causa legítima es delito: «pena de prisión de tres meses a un año o multa de seis a veinticuatro meses» (artículo 143 de la LOREG). Lo que te protege es ir a la mesa ese día.",
        "Para que lo sepas: el trabajo no declarado se puede comunicar a la Inspección de Trabajo, también de forma anónima, en su buzón (oeitss.gob.es). Lo enlazamos en «Fuentes» por si te sirve; aquí no entramos a valorar cada situación.",
      ]),
      { id: "parrafo", title: "Párrafos listos para tu escrito", paragraphs: ["Elige el que encaje y cópialo en el punto 2 del modelo."], models: parrafos("p-servicio-esencial", "p-acontecimiento", "p-trabajo-fuera", "p-vivo-fuera", "p-aviso-empresa") },
      REVISION,
    ],
  },
  {
    id: "mesa-cuidado-familiar",
    pack: "elecciones",
    reviewedAt: R,
    path: PC.cuidado,
    h1: "Me ha tocado mesa y cuido de un familiar dependiente (aunque cobre por ello)",
    title: "Mesa electoral si cuidas de un familiar dependiente o cobras por cuidar",
    description: "Cuidar de un familiar dependiente libra de la mesa del 29-N si lo acreditas. Qué pasa si cobras la prestación de dependencia o eres cuidadora interna.",
    lead: "Cuidar de forma directa y continua a un familiar hasta segundo grado que no puede valerse por sí mismo es una de las causas que la Instrucción 6/2011 acepta «en todo caso», siempre que la acredites. Cobrar por ello no cambia nada: la Instrucción no menciona el pago. Lo que cuenta es el parentesco, que el cuidado sea directo y continuo y el documento. Si cuidas a alguien que no es familiar tuyo como trabajo (cuidadora profesional o empleada de hogar interna), esta causa no se aplica y decide la Junta.",
    cta: { href: DOCX, label: "Descargar el modelo de escrito (Word)" },
    secondaryCta: { href: M.modelo.href, label: "Ver el modelo con este párrafo" },
    sources: [SC.tercero, SC.primero, SC.dep, SC.et37, SC.a27, SC.quinto],
    related: [M.modelo, LC.hijos, M.excusa, M.casos, M.denegada],
    faqs: [
      { q: "Cobro la prestación por cuidados en el entorno familiar, ¿me puedo excusar?", a: "Sí, por el cuidado de un familiar hasta segundo grado que no puede valerse por sí mismo. La prestación no te quita la excusa: la Instrucción 6/2011 no dice nada del pago. Además, el reconocimiento como persona cuidadora lo emiten los servicios sociales, que es uno de los documentos que admite la Instrucción." },
      { q: "¿Qué familiares cuentan?", a: "Hasta el segundo grado de consanguinidad o afinidad: padres, hijos, abuelos, nietos y hermanos, y los mismos parientes de tu pareja casada (suegros, cuñados). Tíos y primos quedan fuera de esta causa." },
      { q: "Soy cuidadora profesional o empleada de hogar interna de una persona mayor que no es familiar, ¿me libro?", a: "Esta causa no se aplica porque no es familiar tuyo. Es tu trabajo y la Instrucción no lo recoge. Puedes alegarlo con un escrito de la familia o de la entidad que explique que nadie puede sustituirte; la Junta lo valora caso a caso y no está garantizado." },
      { q: "No tengo reducción de jornada ni certificado de servicios sociales, ¿qué adjunto?", a: "La Instrucción dice que «podrá aportarse» uno de esos dos documentos y, en general, que vale cualquier documento. Adjunta la resolución de dependencia de tu familiar, el libro de familia y una declaración tuya. Al no ser uno de los documentos de la Instrucción, la Junta lo valora con más margen." },
    ],
    sections: [
      {
        id: "veredicto",
        title: "¿Se acepta? Caso por caso",
        paragraphs: ["Por el Equipo RutaTrámite. La causa está en el apartado Tercero.1, causa 3.ª, entre las que «en todo caso justifican, por sí solas» la excusa."],
        table: {
          caption: "Cuidados y mesa electoral del 29-N",
          head: ["Situación", "¿Se acepta?", "Qué adjuntar", "Fuente"],
          rows: [
            { cells: ["Cuidas a tu madre, padre, suegro, abuela, hermano… dependiente", "Sí, si lo acreditas", "Reducción de jornada del artículo 37.6 del Estatuto o certificado de servicios sociales (CCAA o ayuntamiento)"], source: SC.tercero },
            { cells: ["Igual, y cobras la prestación para cuidados en el entorno familiar", "Sí: el pago no cambia la causa", "Resolución o certificado de servicios sociales que te reconoce como persona cuidadora"], source: SC.dep },
            { cells: ["Cuidas a un tío, primo o amigo", "Depende: no está en la causa (pasa del segundo grado)", "Resolución de dependencia y por qué nadie más puede cuidarle"], source: SC.primero },
            { cells: ["Cuidadora profesional o empleada de hogar interna de alguien que no es familiar", "Depende: es trabajo y no figura en la lista", "Contrato y escrito de la familia o de la entidad sobre la imposibilidad de sustituirte"], source: SC.primero },
            { cells: ["Hijo con discapacidad bajo tu guarda legal", "Sí (causa 2.ª)", "Reducción de jornada por guarda legal o certificado de servicios sociales"], source: SC.tercero },
          ],
        },
      },
      sec("texto-exacto", "Lo que dice exactamente la Instrucción", [
        "Justifica «en todo caso» la excusa: «El cuidado directo y continuo de familiar hasta el segundo grado de consanguinidad o afinidad que por razones de edad, accidente o enfermedad, no pueda valerse por sí mismo». Para acreditarlo «podrá aportarse o bien copia del escrito en que se reconozca la reducción de jornada de trabajo prevista para tal finalidad en el artículo 37.6 ET […] o bien certificación de las unidades responsables de los servicios sociales de la Comunidad Autónoma o de la entidad local correspondiente» (apartado Tercero.1, causa 3.ª).",
        "La prestación económica para cuidados en el entorno familiar está en el artículo 18 de la Ley 39/2006 de dependencia y la reconoce la comunidad autónoma. Por eso su resolución suele ser el documento más útil: viene de servicios sociales y dice quién cuida a quién.",
      ]),
      sec("ejemplo", "Ejemplo con fechas para el 29-N", [
        "Carmen cuida a su madre, con grado II de dependencia, y cobra la prestación por cuidados en el entorno familiar. Su ayuntamiento sortea el sábado 31 de octubre y le notifican el lunes 2 de noviembre, así que tiene hasta el lunes 9 de noviembre.",
        "Adjunta la resolución de la comunidad autónoma que la reconoce como persona cuidadora no profesional y una copia del libro de familia para el parentesco. Es una causa que se acepta en todo caso si la Junta da por acreditados el parentesco y el cuidado.",
        PLAZO,
      ]),
      { id: "parrafo", title: "Párrafo listo para tu escrito", paragraphs: ["Copia este texto en el punto 2 del modelo y rellena los corchetes."], models: parrafos("p-cuidado-familiar") },
      REVISION,
    ],
  },
  {
    id: "mesa-hijos-pequenos",
    pack: "elecciones",
    reviewedAt: R,
    path: PC.hijos,
    h1: "Me ha tocado mesa y tengo hijos pequeños: menores de 12, lactancia y familias monoparentales",
    title: "Mesa electoral con hijos pequeños o lactancia: cuándo te libras",
    description: "Hijos menores de 12, lactancia o familia monoparental: qué acepta la Junta para no ir a la mesa del 29-N, qué documento adjuntar y párrafo para el escrito.",
    lead: "Tres causas de la Instrucción 6/2011 tienen que ver con los hijos. Se aceptan siempre, si las acreditas, el cuidado del lactante y el cuidado directo y continuo por guarda legal de menores de 12 años. En cambio, ser madre o padre de menores de 14 en una familia monoparental, o cuando el otro progenitor no puede quedarse con ellos, depende de la Junta. «No tengo con quién dejarlos» solo funciona si encaja en alguna de estas causas y lo documentas.",
    cta: { href: DOCX, label: "Descargar el modelo de escrito (Word)" },
    secondaryCta: { href: M.modelo.href, label: "Ver el modelo con estos párrafos" },
    sources: [SC.tercero, SC.et37, SC.primero, SC.a27, SC.quinto],
    related: [M.modelo, LC.cuidado, M.excusa, M.casos, M.denegada],
    faqs: [
      { q: "Tengo un hijo de 8 años, ¿me libro de la mesa?", a: "Sí, si acreditas el cuidado directo y continuo por guarda legal de un menor de 12 años. La Instrucción menciona como documentos la reducción de jornada por guarda legal o un certificado de servicios sociales. Sin uno de ellos, adjunta lo que tengas (libro de familia y explicación); la Junta lo valorará." },
      { q: "Estoy dando el pecho, ¿tengo que ir?", a: "El cuidado del lactante es causa aceptada siempre. La Instrucción pide la certificación de la reducción de jornada por lactancia de las empresas de los progenitores y el libro de familia o certificado del Registro Civil." },
      { q: "Soy familia monoparental, ¿es excusa?", a: "Con hijos menores de 14 años puede serlo, pero se valora caso a caso (apartado Tercero.2, causa 2.ª). Adjunta el título de familia monoparental o documentos que lo prueben." },
      { q: "Mi pareja trabaja ese domingo y no tengo con quién dejar a los niños", a: "Con hijos menores de 14 años, la Instrucción recoge el caso en que «el otro progenitor no puede ocuparse del menor durante la jornada electoral». Se valora: adjunta un certificado de la empresa de tu pareja con el turno del 29-N." },
      { q: "¿Puedo llevar a mi hijo a la mesa?", a: "La LOREG no lo regula. La jornada empieza a las 8:00 y acaba de madrugada; no es una solución que puedas dar por buena sin preguntar a la Junta." },
    ],
    sections: [
      {
        id: "veredicto",
        title: "¿Se acepta? Caso por caso",
        paragraphs: ["Por el Equipo RutaTrámite. Las dos primeras filas son causas que «en todo caso justifican, por sí solas» la excusa; las demás dependen de la Junta Electoral de Zona."],
        table: {
          caption: "Hijos y mesa electoral del 29-N",
          head: ["Situación", "¿Se acepta?", "Qué adjuntar", "Fuente"],
          rows: [
            { cells: ["Cuidado del lactante (progenitores, adoptantes, guardadores o acogedores)", "Sí", "Certificación de la reducción de jornada por lactancia de las empresas y libro de familia o certificado del Registro Civil"], source: SC.tercero },
            { cells: ["Guarda legal y cuidado directo y continuo de menores de 12 años", "Sí, si lo acreditas", "Reducción de jornada por guarda legal (artículo 37.6 del Estatuto) o certificado de servicios sociales"], source: SC.tercero },
            { cells: ["Familia monoparental con hijos menores de 14", "Depende", "Título de familia monoparental, libro de familia o sentencia"], source: SC.tercero },
            { cells: ["El otro progenitor no puede ocuparse de hijos menores de 14 ese día", "Depende", "Certificado de la empresa del otro progenitor con su turno, o lo que lo pruebe"], source: SC.tercero },
            { cells: ["Hijos de 14 años o más, sin otra circunstancia", "En principio no", "—"], source: SC.primero },
          ],
        },
      },
      sec("texto-exacto", "Lo que dice exactamente la Instrucción", [
        "Justifican «en todo caso» la excusa: «El cuidado del lactante por sus progenitores, adoptantes, guardadores o acogedores» y «El cuidado directo y continuo, por razones de guarda legal, de menores de doce años o de personas con discapacidad física, psíquica o sensorial» (apartado Tercero.1, causas 1.ª y 2.ª).",
        "Pueden justificarla, según las circunstancias: «La condición de madre o padre de menores de catorce años, cuando se acredite que se trata de una familia monoparental o que el otro progenitor no puede ocuparse del menor durante la jornada electoral» (apartado Tercero.2, causa 2.ª, redacción de la Instrucción 2/2025).",
      ]),
      sec("sin-reduccion", "Si no tienes reducción de jornada", [
        "Mucha gente con hijos menores de 12 no tiene reducción de jornada: trabaja a tiempo completo, es autónoma o no trabaja. La Instrucción dice que la causa «podrá» acreditarse con esos documentos, y su apartado Primero.2 acepta cualquier documento. Adjunta el libro de familia, explica quién cuida a los niños y por qué no hay otra persona, y añade lo que lo pruebe (por ejemplo, el turno de tu pareja). Ten en cuenta que, sin el documento típico, la Junta decide con más margen.",
      ]),
      sec("ejemplo", "Ejemplo con fechas para el 29-N", [
        "Ana tiene una hija de 5 meses y disfruta de la reducción de jornada por lactancia. Le notifican el martes 3 de noviembre, así que tiene hasta el martes 10 de noviembre. Adjunta el certificado de su empresa sobre la reducción por lactancia y la copia del libro de familia: es una causa que se acepta siempre.",
        "Pablo es padre de dos niños de 9 y 13 años y su pareja trabaja de 7:00 a 15:00 el domingo 29 en un hospital. El de 9 años encaja en la causa de menores de 12 si acredita la guarda y el cuidado directo. Para reforzarlo, adjunta además el certificado del turno de su pareja.",
        PLAZO,
      ]),
      { id: "parrafo", title: "Párrafos listos para tu escrito", paragraphs: ["Elige el que encaje y cópialo en el punto 2 del modelo."], models: parrafos("p-lactancia", "p-hijos", "p-monoparental") },
      REVISION,
    ],
  },
];

/** Secciones profundas añadidas a /elecciones/mesa-electoral-casos-especiales. */
export const CASOS_EXTRA_SECTIONS: GuideSection[] = [
  {
    id: "mas-casos",
    title: "Boda, viaje, embarazo, enfermedad, 65 años y candidatos",
    paragraphs: ["Por el Equipo RutaTrámite. Texto de la Instrucción 6/2011 y de la LOREG; «siempre» quiere decir que la norma la acepta «en todo caso» si la acreditas."],
    table: {
      caption: "Otras causas frecuentes para el 29-N",
      head: ["Situación", "¿Se acepta?", "Qué adjuntar", "Fuente"],
      rows: [
        { cells: ["Tu boda o la de un familiar hasta segundo grado el 29-N", "Depende: evento familiar «de especial relevancia» e inaplazable o con perjuicios económicos importantes si se aplaza", "Contrato o reserva con fecha y prueba de que no se puede mover o de lo que cuesta moverlo"], source: SC.tercero },
        { cells: ["Viaje de vacaciones ya pagado", "Depende, y es difícil: no figura en la lista", "Reserva con fecha anterior a la convocatoria y coste de cancelación"], source: SC.primero },
        { cells: ["Embarazo desde el sexto mes, o descanso por nacimiento, adopción o acogida", "Sí", "Certificado médico o escrito de suspensión o de la prestación"], source: SC.segundo },
        { cells: ["Riesgo durante el embarazo o la lactancia", "Depende", "Certificado médico con las limitaciones"], source: SC.segundo },
        { cells: ["Baja por incapacidad temporal", "Sí", "Parte de baja"], source: SC.segundo },
        { cells: ["Enfermedad o lesión sin baja", "Depende: si impide o hace particularmente penoso el cargo", "Certificado médico con las limitaciones"], source: SC.segundo },
        { cells: ["Operación o prueba inaplazable el 29, los días antes o el 30", "Depende", "Citación e informe del médico o del centro"], source: SC.segundo },
        { cells: ["Tener de 65 a 69 años", "Sí: renuncia en 7 días", "Copia del DNI"], source: SC.a26 },
        { cells: ["Ser candidato el 29-N", "Sí: los candidatos no pueden ser miembros de mesa", "Credencial o proclamación"], source: SC.a27 },
        { cells: ["Ser apoderado o interventor de una candidatura", "No figura en la Instrucción: alégalo con la credencial y decide la Junta", "Credencial"], source: SC.primero },
      ],
    },
  },
  {
    id: "mas-casos-detalle",
    title: "Detalle y ejemplos de estos casos",
    paragraphs: [
      "Boda: Elena se casa el sábado 28 de noviembre y celebra la comida el domingo 29 con un contrato firmado en junio. La Instrucción exige que seas protagonista o pariente hasta segundo grado y que acredites que el evento no se puede aplazar o el perjuicio económico de aplazarlo. Adjunta el contrato y la cláusula de cancelación.",
      "Viaje pagado: no está en la lista. Si reservaste antes de la convocatoria electoral y cancelarlo te cuesta dinero, alégalo con la reserva y el coste; la Junta puede aceptarlo por analogía o denegarlo. No compres un viaje después de que te toque contando con que te libras.",
      "Salud: el embarazo a partir del sexto mes y la baja médica se aceptan siempre con su documento. Una dolencia sin baja, el riesgo durante el embarazo o una operación cercana dependen de un certificado médico que explique por qué no puedes estar en la mesa de 8:00 a la noche.",
      "Mayores de 65: el artículo 26.2 de la LOREG permite renunciar «en el plazo de siete días» desde los 65 años. A partir de los 70 no entras en el sorteo.",
      "Candidatos y personas que trabajan para una candidatura: el artículo 27.1 impide a los candidatos ser miembros de mesa. Para apoderados e interventores la Instrucción no dice nada; alégalo con la credencial.",
    ],
    models: parrafos("p-boda", "p-salud"),
  },
];
