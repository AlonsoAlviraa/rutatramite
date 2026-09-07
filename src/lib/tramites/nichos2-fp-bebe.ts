import {
  DISCLAIMER_MEDICO,
  JUSTICIA_NACIMIENTO_URL,
  SANIDAD_CALENDARIO_URL,
  SEDE_SEG_SOCIAL_URL,
  TODOFP_URL,
} from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

export const FP_BEBE_NICHOS2_GUIDES: Guide[] = [
  {
    id: "cambiarInstitutoMitadDeCurso",
    pack: "fp",
    path: "/fp/cambiar-de-instituto-a-mitad-de-curso",
    h1: "Cambiar de instituto a mitad de curso en FP: cómo se hace",
    title: "Cambiar de instituto a mitad de curso (FP): trámites",
    description:
      "Sin abandonar la matrícula: traslado de expediente, solicitud ante la consejería y causas sobrevenidas. La vía correcta de cambiar de instituto con el curso empezado.",
    lead:
      "Cambiar de instituto con el curso empezado no pasa por renunciar a la matrícula y \"volver el año que viene\": pasa por un traslado de expediente justificado por una causa sobrevenida. Esta guía ordena los pasos reales (centro de destino, consejería, documentación) y los errores que dejan a un alumno sin plaza en los dos sitios a la vez.",
    cta: { href: TODOFP_URL, label: "Todofp (oficial)" },
    secondaryCta: { href: "/colegio/cambiar-de-colegio-a-mitad-de-curso", label: "Guía: cambiar de colegio a mitad de curso" },
    related: [
      { href: "/colegio/cambiar-de-colegio-a-mitad-de-curso", label: "Cambiar de colegio a mitad de curso" },
      { href: "/fp/reserva-de-plaza-fp", label: "Reserva de plaza en FP" },
      { href: "/fp/matricula-fp-en-septiembre", label: "Matricularse en FP en septiembre" },
      { href: "/colegio/cambio-de-colegio-por-mudanza", label: "Cambio de colegio por mudanza" },
    ],
    sections: [
      {
        id: "no-abandones",
        title: "Lo primero: no abandones la matrícula",
        paragraphs: [
          "El error clásico es anular la matrícula para \"empezar de cero\" en otro sitio. Si renuncias, dejas de ser alumno de ese ciclo y la plaza se libera al momento; para volver a entrar tendrás que esperar al siguiente proceso de admisión o a que queden vacantes, sin garantía ninguna. A mitad de curso no existe proceso ordinario: el acceso depende de plazas vacantes y de la decisión de la consejería. Conserva tu matrícula y tu plaza hasta que el cambio te lo confirmen por escrito en el centro de destino.",
        ],
      },
      {
        id: "traslado",
        title: "La vía correcta: el traslado de expediente",
        paragraphs: [
          "El mecanismo ordinario con el curso iniciado es el traslado de expediente. Primero, confirma con la secretaría del instituto de destino que hay vacante en tu ciclo y curso: sin hueco no hay traslado posible. Segundo, presenta la solicitud que exija tu comunidad: en varias administraciones se dirige a la consejería competente en FP, y en otras basta con el visto bueno de la dirección del centro de destino. Tercero, el centro de origen remite el expediente académico y la matrícula se traslada, no se extingue. El modelo concreto de solicitud y el órgano exacto cambian por comunidad: confírmalo en tu comunidad antes de mover ninguna pieza.",
        ],
      },
      {
        id: "causas",
        title: "Causas sobrevenidas: qué cuenta y qué no",
        paragraphs: [
          "A mitad de curso las consejerías no admiten cambios por preferencia de horario o de claustro: piden una causa sobrevenida que justifique la petición. Las habituales son el cambio de domicilio, el traslado laboral de la familia o circunstancias que afecten al alumno y queden acreditadas. Cada comunidad regula sus supuestos y la documentación que los prueba (nuevo empadronamiento, contrato de trabajo, informe del centro). Reunir esos papeles antes de pedir cita en secretaría ahorra semanas de idas y vueltas: presentar la solicitud sin justificante suele acabar en un archivo directo.",
        ],
      },
      {
        id: "sin-plaza",
        title: "¿Y si en el instituto de destino no hay plaza?",
        paragraphs: [
          "Si no hay vacante, el traslado no procede y toca gestionar alternativas sin perder la posición actual: entrar en la lista de espera del centro de destino, valorar la FP a distancia o semipresencial (misma titulación oficial, calendario más flexible) o terminar el curso donde estás y solicitar el cambio para el siguiente. La regla de oro se repite en todos los escenarios: no sueltes la matrícula que tienes hasta tener por escrito la nueva. Si lo que necesitas es el trámite equivalente en Primaria o Secundaria, está en la guía de cambiar de colegio a mitad de curso.",
        ],
      },
    ],
  },
  {
    id: "documentosMatriculaEso",
    pack: "fp",
    path: "/fp/documentos-matricula-eso",
    h1: "Documentos para la matrícula en ESO e instituto",
    title: "Documentos matrícula ESO e instituto: checklist",
    description:
      "Identidad, certificado académico o informe de promoción, empadronamiento y foto: el checklist de la matrícula en ESO, la secretaría virtual y los casos de traslado de comunidad.",
    lead:
      "La matrícula en ESO se atasca casi siempre por lo mismo: un documento que falta. Aquí tienes el checklist completo (identidad, informe de promoción, empadronamiento, foto), cómo funciona la secretaría virtual que ya ofrecen varias comunidades y qué añadir si el alumno viene de otra comunidad, de un centro privado o de un sistema educativo extranjero.",
    cta: { href: TODOFP_URL, label: "Todofp (oficial)" },
    secondaryCta: { href: "/colegio/documentos-matricula-colegio", label: "Guía: documentos de matrícula en colegio" },
    related: [
      { href: "/colegio/documentos-matricula-colegio", label: "Documentos matrícula de colegio" },
      { href: "/fp/reserva-de-plaza-fp", label: "Reserva de plaza en FP" },
      { href: "/fp/cambiar-de-instituto-a-mitad-de-curso", label: "Cambiar de instituto a mitad de curso" },
      { href: "/becas/mec", label: "Beca MEC" },
    ],
    sections: [
      {
        id: "checklist",
        title: "El checklist de la matrícula",
        paragraphs: ["Lo que pide la secretaría de cualquier instituto, con ligeras variantes por comunidad:"],
        lists: [
          [
            "Identidad del alumno: DNI si lo tiene o certificado literal de nacimiento; y DNI de quien ejerce la patria potestad.",
            "Certificado académico o informe de promoción del curso anterior: lo emite el centro de origen y acredita el curso al que se accede.",
            "Volante o certificado de empadronamiento: varias comunidades lo exigen para asignar centro por zona de escolarización.",
            "Fotografía tipo carné del alumno, en el formato que indique la secretaría.",
            "Número de cuenta bancaria y datos económicos si vais a solicitar beca o bonificación de comedor.",
            "Autorizaciones firmadas del primer paquete de documentos: salidas, comedor, derecho de imagen.",
          ],
        ],
      },
      {
        id: "informe-promocion",
        title: "El informe de promoción, la pieza que más retrasa",
        paragraphs: [
          "El certificado académico o informe de promoción es el documento que prueba que el alumno promociona al curso siguiente, y sin él la secretaría no puede cerrar la matrícula en el curso correcto. Se pide en el centro donde se cursó el año anterior, normalmente en junio junto con las notas finales. Si vais a cambiar de comunidad o de ciudad, solicítalo antes de irte: pedirlo a distancia después es posible, pero añade semanas. Para alumnos que llegan de un sistema extranjero, lo que se pide es la homologación o convalidación de estudios: es un trámite del Ministerio con su propio plazo, así que arráncalo cuanto antes y confírmalo en tu comunidad.",
        ],
      },
      {
        id: "secretaria-virtual",
        title: "Matrícula sin pisar el instituto: la secretaría virtual",
        paragraphs: [
          "Varias comunidades ya tramitan la matrícula de ESO en la secretaría virtual de sus centros educativos: se suben los documentos escaneados y se firma digitalmente, sin colas en septiembre. Andalucía, por ejemplo, lleva años tramitando por esta vía con su secretaría virtual de centros. Necesitarás identificación digital (certificado electrónico o Cl@ve) y los PDF legibles de todo el checklist. Ojo con dos detalles: las fechas de la ventanilla virtual son las mismas que las presenciales, y si un documento se rechaza te llega un aviso a la notificación del expediente, no un teléfono: revisa el estado del trámite cada pocos días hasta que conste como admitido.",
        ],
      },
      {
        id: "admision-vs-matricula",
        title: "No confundas admisión con matrícula",
        paragraphs: [
          "La admisión es el proceso previo con el que se adjudica plaza (solicitud, baremación, sorteo, lista de admitidos); la matrícula es el trámite posterior en el que presentas los documentos de este checklist y formalizas la plaza en el centro que te ha tocado. Si el alumno ya tiene plaza adjudicada en el instituto, solo toca la segunda parte. Si no presentaste solicitud o llegáis de otra ciudad, consulta la guía de qué hacer cuando no se ha matriculado al hijo. Y para primeras edades o centros concertados, el checklist detallado por tramos está en la guía de documentos de matrícula de colegio.",
        ],
      },
    ],
  },
  {
    id: "reservaPlazaFp",
    pack: "fp",
    path: "/fp/reserva-de-plaza-fp",
    h1: "Reserva de plaza en FP: cómo funciona de verdad",
    title: "Reserva de plaza en FP: adjudicación y plazos",
    description:
      "Qué significa plaza adjudicada y reserva en FP: formalizar dentro del plazo o perderla a favor del siguiente, plazas reservadas para discapacidad ≥33% y listas de espera.",
    lead:
      "Conseguir plaza en FP es solo la mitad del trabajo: la plaza se conserva formalizando la matrícula dentro del plazo publicado, y si dejas pasar la fecha, pasa al siguiente de la lista sin reclamación posible. Esta guía explica el orden de adjudicación, qué es exactamente la reserva, las plazas reservadas para discapacidad igual o superior al 33% y cómo se mueven las listas de espera.",
    cta: { href: TODOFP_URL, label: "Todofp (oficial)" },
    secondaryCta: { href: "/fp/matricula-fp-en-septiembre", label: "Guía: matricularse en FP en septiembre" },
    related: [
      { href: "/fp/matricula-fp-en-septiembre", label: "Matricularse en FP en septiembre" },
      { href: "/fp/convalidaciones-fp", label: "Convalidaciones de FP" },
      { href: "/fp/documentos-matricula-eso", label: "Documentos matrícula ESO" },
      { href: "/fp/cambiar-de-instituto-a-mitad-de-curso", label: "Cambiar de instituto a mitad de curso" },
    ],
    sections: [
      {
        id: "adjudicacion-y-reserva",
        title: "Adjudicación y reserva: dos palabras distintas",
        paragraphs: [
          "En el proceso de admisión de FP, cada comunidad ordena las solicitudes según criterios públicos (el expediente académico en la mayoría de ellas, con sus ponderaciones publicadas) y publica las listas de adjudicación: ahí aparece quién obtiene plaza en cada ciclo y centro. La palabra \"reserva\" designa esa plaza bloqueada a tu nombre mientras formalizas la matrícula: la tienes ganada, pero no es tuya hasta que presentas la documentación en el plazo. La cita exacta que importa es la de la notificación de adjudicación: contiene la fecha límite de matrícula, y esa fecha no se negocia en la secretaría del centro.",
        ],
      },
      {
        id: "formalizar-o-perder",
        title: "No formalizar a tiempo equivale a perder la plaza",
        paragraphs: [
          "Es la regla menos popular y la más estricta: si te adjudican plaza y no formalizas la matrícula dentro del plazo indicado, la plaza se ofrece automáticamente al siguiente solicitante de la lista y tu solicitud queda agotada. No existe la matrícula \"con retraso justificado\" fuera del calendario: el sistema necesita rellenar los huecos antes de que empiece el curso. Añade a tu calendario la fecha límite el mismo día en que veas la lista de admitidos, y si te es imposible acudir en persona, comprueba si tu comunidad permite la matrícula electrónica en la secretaría virtual del centro. Si ya la has perdido, la vía es el proceso extraordinario de septiembre, no la reclamación.",
        ],
      },
      {
        id: "plazas-discapacidad",
        title: "Plazas reservadas: discapacidad igual o superior al 33%",
        paragraphs: [
          "La normativa de FP reserva un porcentaje de plazas de cada ciclo para solicitantes con discapacidad reconocida igual o superior al 33%, y en varios procesos existe además una bolsa de reserva para estos efectos. Para optar a la reserva hay que acreditar el grado de discapacidad con el certificado correspondiente en el momento de presentar la solicitud, no después de la adjudicación. Si las plazas reservadas quedan desiertas, la comunidad decide si se liberan al turno general según sus propias instrucciones: confírmalo en tu comunidad. Y si optas por el turno ordinario teniendo reconocida la discapacidad, revisa qué baremo aplica tu consejería en cada caso.",
        ],
      },
      {
        id: "listas-de-espera",
        title: "Listas de espera: cómo se mueven de verdad",
        paragraphs: [
          "Cada ciclo y centro publica su lista de espera ordenada con los mismos criterios de adjudicación, y las posiciones suben por dos motivos: renuncias de adjudicatarios y plazas no formalizadas dentro de plazo. El movimiento se concentra entre julio y octubre, con un pico final en las primeras semanas de septiembre, cuando caen las matrículas de quienes eligieron otra opción. Si estás en lista, mira tu número pero también el histórico de movimientos del ciclo (varias consejerías lo publican): da una idea realista de si te llegará. Mientras esperas, no dejes pasar la matrícula extraordinaria de septiembre ni descartes la FP a distancia como red de seguridad.",
        ],
      },
    ],
  },
  {
    id: "calendarioVacunalMadrid",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-madrid",
    h1: "Calendario vacunal de la Comunidad de Madrid: dónde está el oficial",
    title: "Calendario vacunal Comunidad de Madrid: enlace oficial",
    description:
      "Dónde está el calendario vacunal oficial de Madrid, cómo se pide cita en el centro de salud y qué documento puede pedir el colegio (informativo, nunca condición de matrícula).",
    lead:
      "Esta guía es solo administrativa: dónde está el calendario vacunal oficial de la Comunidad de Madrid, cómo se pide cita en el centro de salud y qué papel puede pedir un colegio. Para cualquier decisión clínica, el documento oficial de la comunidad y tu pediatra son la referencia, y aquí no encontrarás pautas ni edades.",
    cta: { href: SANIDAD_CALENDARIO_URL, label: "Calendario vacunal oficial (Sanidad)" },
    related: [
      { href: "/bebe/calendario-vacunal-castilla-y-leon", label: "Calendario vacunal Castilla y León" },
      { href: "/bebe/certificado-vacunacion-descargar", label: "Descargar el certificado de vacunación" },
      { href: "/bebe/cartilla-vacunacion-digital", label: "Cartilla de vacunación digital" },
      { href: "/bebe/tarjeta-sanitaria-bebe", label: "Tarjeta sanitaria del bebé" },
    ],
    disclaimer: DISCLAIMER_MEDICO,
    sections: [
      {
        id: "donde-esta-oficial",
        title: "Dónde está el calendario oficial de Madrid",
        paragraphs: [
          "El Ministerio de Sanidad publica en su web la página que enlaza los calendarios vacunales de todas las comunidades autónomas: es el punto de partida fiable, y está enlazada en el botón de arriba. La Comunidad de Madrid publica además el suyo propio en el portal de su consejería de Sanidad, con el documento oficial que actualiza cada temporada. Lo que no debes fiar es de los resúmenes que circulan por grupos de WhatsApp ni de blogs sin fecha: un calendario caducado administrativamente vale menos que ninguno. Cuando cambie el año escolar o sanitario, vuelve a comprobar la versión vigente: las comunidades revisan su calendario con periodicidad y la que vale es siempre la actual, no la captura que guardaste en el móvil.",
        ],
      },
      {
        id: "cita-centro-salud",
        title: "Cómo se pide cita en el centro de salud",
        paragraphs: [
          "En Madrid, como en el resto de comunidades, la vacunación del calendario se gestiona en atención primaria: en el centro de salud que corresponde a tu domicilio y con el pediatra asignado al bebé. La cita se pide por los canales de cita previa de la sanidad madrileña (portal web y teléfono) o en el mostrador administrativo del propio centro. Lleva la tarjeta sanitaria del bebé; si aún no la ha recibido, el primer paso es el alta como beneficiario en la Seguridad Social y la tarjeta en el centro de salud, un trámite que ordena la guía de la tarjeta sanitaria del bebé. Si el canal de cita no ofrece hueco, prueba también por teléfono de tu centro concreto y en franjas distintas: la disponibilidad depende de la agenda publicada por cada centro y puede cambiar.",
        ],
      },
      {
        id: "que-pide-el-cole",
        title: "Qué papel pide el colegio (y qué no puede hacer)",
        paragraphs: [
          "En la matrícula y en los formularios de inicio de curso, los centros pueden pedir la cartilla o el certificado de vacunación como documentación informativa: sirve al equipo del centro para conocer la situación administrativa del alumno. Como regla general, la cartilla no es un requisito de acceso a la enseñanza obligatoria, pero el formulario y las excepciones se comprueban en la comunidad y el centro concretos. Si te plantean \"todas las vacunas al día\" como condición de matrícula, pide que te indiquen la base normativa y, si persiste el impedimento, reclámalo por escrito ante la dirección y la consejería competente.",
        ],
      },
      {
        id: "documento-oficial",
        title: "El papel con valor oficial",
        paragraphs: [
          "El certificado de vacunación es el documento que suele emitir la comunidad a partir de su registro nominal; en Madrid puedes obtenerlo por las vías de salud digital o en tu centro de salud. La guía de descarga detalla las opciones y qué hacer si te mudaste de comunidad y el registro está en otra. Esta página no reproduce pautas, dosis ni edades: el contenido clínico del calendario debe consultarse en el documento oficial y con tu pediatra.",
        ],
      },
    ],
  },
  {
    id: "calendarioVacunalCastillaYLeon",
    pack: "bebe",
    path: "/bebe/calendario-vacunal-castilla-y-leon",
    h1: "Calendario vacunal de Castilla y León (Sacyl): enlace oficial",
    title: "Calendario vacunal Castilla y León: enlace oficial",
    description:
      "Dónde está el calendario vacunal oficial de Castilla y León (saludcastillayleon.es), cómo usar SACYL Conecta para la cita y qué documento pide el colegio. Guía administrativa.",
    lead:
      "Guía estrictamente administrativa del calendario vacunal de Castilla y León: dónde publica Sacyl el documento oficial, cómo funciona SACYL Conecta como vía digital para la cita y qué papel puede pedir el colegio (informativo, nunca condición de matrícula). Sin pautas clínicas: para eso están el calendario oficial y tu pediatra.",
    cta: { href: "https://www.saludcastillayleon.es/", label: "Sanidad de Castilla y León (Sacyl)" },
    related: [
      { href: "/bebe/calendario-vacunal-madrid", label: "Calendario vacunal Madrid" },
      { href: "/bebe/certificado-vacunacion-descargar", label: "Descargar el certificado de vacunación" },
      { href: "/bebe/cartilla-vacunacion-digital", label: "Cartilla de vacunación digital" },
      { href: "/bebe/tarjeta-sanitaria-bebe", label: "Tarjeta sanitaria del bebé" },
    ],
    disclaimer: DISCLAIMER_MEDICO,
    sections: [
      {
        id: "donde-esta-oficial-cyl",
        title: "Dónde está el calendario oficial de CyL",
        paragraphs: [
          "El calendario vacunal de Castilla y León lo publica el servicio de salud de la comunidad en su portal oficial, saludcastillayleon.es, que es el enlace del botón de arriba. El Ministerio de Sanidad mantiene además la página que agrega los calendarios de todas las comunidades, útil para comparar si acabas de llegar de otra región. La regla es la misma para todos: el documento que vale es el oficial y vigente de la consejería, no resúmenes de terceros. Si el PDF que tienes guardado es de una temporada anterior, descarga la versión actual antes de planificar nada: las comunidades actualizan sus calendarios con periodicidad y confírmalo siempre en tu comunidad.",
        ],
      },
      {
        id: "sacyl-conecta",
        title: "SACYL Conecta: la vía digital",
        paragraphs: [
          "SACYL Conecta es el canal digital de la sanidad castellanoleonesa: su aplicación y su web permiten identificarte, gestionar cita de atención primaria y consultar información de tu historia clínica desde el móvil. Para lo que aquí importa, su función es administrativa: localizar tu centro de salud, pedir la cita y consultar los documentos que Sacyl ponga a tu disposición en cada momento. Si no usas aplicaciones o no tienes certificado digital, el mostrador administrativo de tu centro de salud hace exactamente lo mismo en persona: la vía digital es una opción de comodidad, no una obligación. Y si al identificarte el sistema no te localiza, revisa primero que tus datos de filiación estén actualizados en el centro.",
        ],
      },
      {
        id: "cita-y-papel-del-cole",
        title: "La cita en el centro de salud y el papel del cole",
        paragraphs: [
          "La vacunación del calendario se gestiona en atención primaria: en el centro de salud que te corresponde por domicilio y con el pediatra asignado al bebé, previa cita por cualquiera de los canales de Sacyl. En la matrícula escolar, el colegio puede pedir la cartilla o el certificado de vacunación como documento informativo para el expediente del alumno; ningún centro puede rechazar la escolarización por no presentarla, y si te lo plantean como condición, reclámalo por escrito ante la dirección y la consejería. El papel con valor oficial es el certificado de vacunación: cómo descargarlo por las tres vías (incluido el cambio de comunidad) está en la guía de descarga del certificado.",
        ],
      },
    ],
  },
  {
    id: "certificadoVacunacionDescargar",
    pack: "bebe",
    path: "/bebe/certificado-vacunacion-descargar",
    h1: "Descargar el certificado de vacunación: vías por comunidad",
    title: "Certificado de vacunación: cómo descargarlo",
    description:
      "Cómo descargar el certificado de vacunación en cada comunidad: carpeta de salud digital, app sanitaria regional o centro de salud en papel. Para matrícula y extraescolares.",
    lead:
      "El certificado de vacunación es el papel que piden colegios, guarderías y organizadores de extraescolares, y descargarlo es trámite de administración sanitaria, no de pediatría. Estas son las tres vías para conseguirlo en España, qué hacer si cambiaste de comunidad (se pide en la de origen) y cómo pedirlo en papel cuando lo digital falla.",
    cta: { href: SANIDAD_CALENDARIO_URL, label: "Calendario vacunal oficial (Sanidad)" },
    secondaryCta: { href: "/bebe/cartilla-de-vacunacion-donde-se-saca", label: "Guía: dónde se saca la cartilla" },
    related: [
      { href: "/bebe/cartilla-de-vacunacion-donde-se-saca", label: "Dónde se saca la cartilla" },
      { href: "/bebe/cartilla-vacunacion-digital", label: "Cartilla de vacunación digital" },
      { href: "/bebe/calendario-vacunal-madrid", label: "Calendario vacunal Madrid" },
      { href: "/bebe/tarjeta-sanitaria-bebe", label: "Tarjeta sanitaria del bebé" },
    ],
    disclaimer: DISCLAIMER_MEDICO,
    sections: [
      {
        id: "tres-vias",
        title: "Las tres vías para conseguirlo",
        paragraphs: ["El certificado oficial se obtiene por alguna de estas vías, según lo que ofrezca tu comunidad:"],
        lists: [
          [
            "Carpeta de salud digital de tu comunidad: entra con certificado electrónico, Cl@ve o el sistema de identidad regional y busca el certificado o informe de vacunación descargable.",
            "App sanitaria regional: donde la comunidad la tenga, el documento aparece en el apartado de documentos o historia de salud de la aplicación.",
            "En papel en el centro de salud: la unidad administrativa o tu profesional de primaria lo emiten en el propio centro, con cita o en el mostrador según la organización de cada servicio de salud.",
          ],
        ],
      },
      {
        id: "para-que-sirve",
        title: "Para qué te lo van a pedir",
        paragraphs: [
          "Los usos administrativos habituales son la matrícula escolar, la inscripción en guarderías y algunas extraescolares o actividades municipales. El organismo puede pedir la cartilla, un certificado o un formato propio; confirma qué acepta antes de entregar la documentación. El certificado oficial acredita los datos que constan en el registro de tu comunidad, pero no sustituye automáticamente cualquier formulario local.",
        ],
      },
      {
        id: "cambiaste-de-comunidad",
        title: "Si cambiaste de comunidad, pídelo en la de origen",
        paragraphs: [
          "Los registros nominales de vacunación son autonómicos y el historial no viaja solo de una comunidad a otra: si el bebé se vacunó en una comunidad y ahora vivís en otra, el certificado completo se pide en la comunidad donde se administraron las dosis, por sus propias vías digitales o en su centro de salud. Después puedes entregar ese documento donde te lo pidan, o aportarlo a tu nuevo centro de salud para que conste en la nueva historia. No pidas el certificado en la comunidad de destino esperando que traiga los datos de la anterior: te emitirán solo lo que consta en su registro, y si está vacío no es un error del sistema, es que los datos siguen en el registro de origen.",
        ],
      },
      {
        id: "si-falla-lo-digital",
        title: "Si la vía digital te falla",
        paragraphs: [
          "No tienes certificado digital, la app no te reconoce o el documento no aparece: la solución es presencial, en tu centro de salud, donde pueden emitirlo en papel a partir del registro nominal. Que hayas perdido la cartilla física no es impedimento: lo administrado por el sistema público de tu comunidad consta en su registro, y el certificado puede expedirse en cualquier momento. Los pasos completos de dónde se entrega la cartilla y quién la rellena están en la guía de la cartilla de vacunación.",
        ],
      },
    ],
  },
  {
    id: "cartillaVacunacionDigital",
    pack: "bebe",
    path: "/bebe/cartilla-vacunacion-digital",
    h1: "Cartilla de vacunación digital: qué comunidades la tienen",
    title: "Cartilla de vacunación digital por comunidades",
    description:
      "Qué es la cartilla de vacunación digital, en qué comunidades está disponible en la app sanitaria, por qué el papel sigue siendo válido y cómo pedir un duplicado.",
    lead:
      "La cartilla de vacunación digital es el documento de siempre consultado en la app sanitaria de tu comunidad: en lugar de sellos en papel, el registro nominal de vacunas visto en pantalla. Esta guía explica qué comunidades la ofrecen, por qué el papel sigue siendo plenamente válido y qué trámite sustituye a la cartilla si la perdiste. Estrictamente administrativa: sin pautas ni consejo clínico.",
    cta: { href: SANIDAD_CALENDARIO_URL, label: "Calendario vacunal oficial (Sanidad)" },
    related: [
      { href: "/bebe/certificado-vacunacion-descargar", label: "Descargar el certificado de vacunación" },
      { href: "/bebe/cartilla-de-vacunacion-donde-se-saca", label: "Dónde se saca la cartilla" },
      { href: "/bebe/calendario-vacunal-castilla-y-leon", label: "Calendario vacunal Castilla y León" },
      { href: "/bebe/tarjeta-sanitaria-bebe", label: "Tarjeta sanitaria del bebé" },
    ],
    disclaimer: DISCLAIMER_MEDICO,
    sections: [
      {
        id: "que-es",
        title: "Qué es y qué comunidades la ofrecen",
        paragraphs: [
          "No existe una cartilla digital única a nivel nacional: cada servicio de salud decide si muestra el registro de vacunas en su app o portal sanitario y con qué nombre lo llama. Varias comunidades ya lo incluyen entre los documentos de su historia de salud digital; otras, en cambio, solo emiten el certificado de vacunación a petición del interesado. Si quieres usarla, búscala en el apartado de documentos o historia de tu app sanitaria regional y, si no aparece, confírmalo en tu comunidad: la disponibilidad cambia entre servicios de salud y no siempre está anunciada en portada.",
        ],
      },
      {
        id: "papel-sigue-valido",
        title: "El papel sigue siendo válido",
        paragraphs: [
          "Que tu comunidad ofrezca cartilla digital no invalida por sí solo la cartilla física que te entregaron en el centro de salud. La aceptación del papel, la app o un certificado descargado depende del organismo que te lo pida; confirma el formato si es para matrícula, guardería o una actividad. No hay una obligación general de migrar a la versión digital.",
        ],
      },
      {
        id: "duplicado",
        title: "¿Perdiste la cartilla? El duplicado es el certificado",
        paragraphs: [
          "Si pierdes la cartilla, pregunta por el certificado oficial de vacunación: suele descargarse desde la salud digital de tu comunidad o solicitarse en el centro de salud. Su utilidad y el formato aceptado dependen del organismo que te lo pida. Las dosis administradas por el sistema público suelen constar en el registro nominal de la comunidad, aunque puede ser necesario corregir datos o pedir información a la comunidad de origen. La guía de descarga recorre las vías disponibles y el caso de una mudanza.",
        ],
      },
      {
        id: "errores-de-registro",
        title: "Si el registro muestra un dato mal",
        paragraphs: [
          "Un apunte puramente administrativo: si al abrir la cartilla digital falta un registro o un dato aparece mal escrito, la corrección se pide en el propio centro de salud, que es quien accede al registro nominal y tramita la subsanación ante el servicio de salud. Es una rectificación de expediente, igual que corregir un apellido mal escrito en cualquier documento oficial. Lo que no procede es arrastrar el error: un certificado con datos incompletos puede dar problemas justo en la ventanilla del colegio o de la extraescolar que lo pida.",
        ],
      },
    ],
  },
  {
    id: "libroFamiliaVigente",
    pack: "bebe",
    path: "/bebe/libro-de-familia-vigente",
    h1: "Libro de familia: ¿sigue vigente en 2026?",
    title: "Libro de familia en 2026: vigencia y sustitutos",
    description:
      "El libro de familia ya no se expide desde la digitalización del Registro Civil (2021), pero los emitidos siguen válidos. Los certificados electrónicos lo sustituyen en todo trámite.",
    lead:
      "Si te han dicho que el libro de familia \"ya no vale\", te lo han contado a medias: desde la digitalización del Registro Civil en 2021 no se expiden ejemplares nuevos, pero los ya emitidos siguen siendo válidos para todo. Lo que ha cambiado es el punto de partida de los nacidos después: certificados individuales electrónicos que sustituyen al libro en cualquier trámite. Aquí tienes el panorama completo y qué hacer si perdiste el tuyo.",
    cta: { href: JUSTICIA_NACIMIENTO_URL, label: "Sede del Registro Civil (Justicia)" },
    related: [
      { href: "/bebe/inscripcion-nacimiento-registro-civil", label: "Registro Civil del nacimiento" },
      { href: "/bebe/prestacion-por-nacimiento", label: "Prestación por nacimiento" },
      { href: "/bebe/tarjeta-sanitaria-bebe", label: "Tarjeta sanitaria del bebé" },
      { href: "/pasaporte/bebe", label: "Pasaporte del bebé" },
    ],
    sections: [
      {
        id: "vigente-pero-no-se-expide",
        title: "Vigente, pero ya no se fabrica",
        paragraphs: [
          "Desde la puesta en marcha del nuevo Registro Civil electrónico en 2021, los nacimientos se inscriben directamente en el registro informatizado y ya no se entrega libro de familia a las familias: el documento que se obtiene es el certificado, en formato electrónico y con validez inmediata. Eso no invalida el libro que tienes en el cajón: los ejemplares emitidos antes de la digitalización siguen siendo plenamente válidos en 2026 y no hay fecha de caducidad anunciada para ellos. La excepción práctica: si un trámite te exige un documento con fecha reciente, bastará con pedir el certificado electrónico, que se emite al momento.",
        ],
      },
      {
        id: "certificados-electronicos",
        title: "Los certificados electrónicos que lo sustituyen",
        paragraphs: [
          "Lo que antes se acreditaba con el libro ahora se acredita con certificados individuales electrónicos: el certificado literal de nacimiento (qué consta en la inscripción), el de filiación y los demás que expide el Registro Civil. Se piden en la sede electrónica del Ministerio de Justicia o en el propio registro, se descargan con código seguro de verificación y las administraciones pueden comprobar su autenticidad en línea. Sustituyen al libro de familia para todo trámite: Seguridad Social, pasaporte y DNI del bebé, escolarización, prestaciones. Si naciste o inscribiste a tu hijo después de la digitalización, estos certificados son \"el libro\" que existe en tu caso.",
        ],
      },
      {
        id: "si-lo-perdiste",
        title: "Si perdiste el libro de familia",
        paragraphs: [
          "Nada dramático ni caro: la pieza que hace el trabajo del libro perdido es el certificado literal de nacimiento, que se pide en el Registro Civil donde consta la inscripción, por vía electrónica o presencialmente, y es gratuito. Con ese certificado resuelves matrículas, prestaciones y cualquier ventanilla que en su día pedía el libro. Si además necesitas acreditar la filiación o otros extremos del registro, son certificados del mismo mostrador. Y si no recuerdas en qué registro consta la inscripción, la sede de Justicia permite localizarlo a partir de los datos básicos.",
        ],
      },
      {
        id: "que-piden-hoy",
        title: "Qué piden hoy en la práctica",
        paragraphs: [
          "Las administraciones aceptan las dos vías: si tienes libro de familia, sigue sirviendo; si no lo tienes (por pérdida o porque ya no se expide), sirve el certificado electrónico. Para los bebés nacidos en 2026 el flujo es íntegramente digital: inscripción en el Registro Civil electrónico, certificado literal descargable y, a partir de ahí, alta en la Seguridad Social, tarjeta sanitaria y pasaporte. El orden completo de esa cadena, con plazos y documentos de cada paso, está en la guía de la inscripción del nacimiento en el Registro Civil.",
        ],
      },
    ],
  },
  {
    id: "prestacionPorNacimiento",
    pack: "bebe",
    path: "/bebe/prestacion-por-nacimiento",
    h1: "Prestación por nacimiento: cuantía y plazo real",
    title: "Prestación por nacimiento: cuantía, plazo y solicitud",
    description:
      "La prestación por nacimiento se puede pedir hasta 5 años después (RD-ley 5/2023): cuantía del 100% del IPREM mensual, exenta de IRPF, solicitud en la Sede de la Seguridad Social.",
    lead:
      "El miedo de los \"seis meses para pedirla o la pierdes\" está desmentido: desde el RD-ley 5/2023 la prestación por nacimiento se puede solicitar hasta cinco años después del nacimiento. Es un pago único del 100% del IPREM mensual vigente (un mes del indicador público), exenta de IRPF, y se pide en la Sede electrónica de la Seguridad Social. Aquí tienes cuantía, plazo y trámite sin mitos.",
    cta: { href: SEDE_SEG_SOCIAL_URL, label: "Sede electrónica de la Seguridad Social" },
    related: [
      { href: "/bebe/inscripcion-nacimiento-registro-civil", label: "Registro Civil del nacimiento" },
      { href: "/bebe/libro-de-familia-vigente", label: "Libro de familia en 2026" },
      { href: "/bebe/tarjeta-sanitaria-bebe", label: "Tarjeta sanitaria del bebé" },
      { href: "/bebe/cartilla-de-vacunacion-donde-se-saca", label: "Cartilla de vacunación" },
    ],
    sections: [
      {
        id: "plazo-cinco-anios",
        title: "El plazo real: hasta cinco años",
        paragraphs: [
          "La regla vigente es generosa y poco conocida: la prestación por nacimiento puede solicitarse hasta cinco años después del nacimiento, tal y como fijó el RD-ley 5/2023 al reformar el sistema. El famoso \"plazo de seis meses\" que todavía repiten foros y hasta algún artículo es un recorte del pasado sin efecto hoy: si tu hijo nació hace dos años y nunca la pediste, sigues a tiempo dentro de esa ventana de cinco años. La contrapartida lógica: no esperes al borde, porque el cómputo es desde el nacimiento y no admite prolongaciones. Y si el nacimiento fue anterior a la reforma, revisa tu caso concreto en la propia sede antes de descartar nada.",
        ],
      },
      {
        id: "cuantia",
        title: "Cuantía: un mes del indicador, sin letra pequeña",
        paragraphs: [
          "La prestación es un pago único equivalente al 100% del IPREM mensual vigente (el indicador público de renta de efectos múltiples que usa la Administración como referencia): en román paladino, un mes del indicador en el momento del reconocimiento. Está exenta de IRPF, así que no tributa en la declaración de la renta ni modifica el tramo: entra íntegra. No la confundas con otras prestaciones familiares de la Seguridad Social (la asignación por hijo a cargo, de pago mensual y con reglas de renta distintas): son trámites diferentes con formularios diferentes. La cuantía exacta en euros figura siempre en la resolución que emite la Seguridad Social al concederla.",
        ],
      },
      {
        id: "donde-pedirla",
        title: "Dónde y cómo se solicita",
        paragraphs: [
          "La solicitud se presenta en la Sede electrónica de la Seguridad Social (enlazada arriba), identificándote con certificado digital o Cl@ve; también se puede presentar presencialmente en los cauces de la Seguridad Social que correspondan. Necesitarás el certificado literal de nacimiento del bebé o el documento que acredite la filiación, tu identificación y los datos del titular que da derecho a la prestación. Los requisitos concretos (situación de alta o asimilada, convivencia, rentas en su caso) figuran en la propia descripción del trámite de la sede: confírmalos allí antes de presentar, porque son los que aplica la entidad gestora. La resolución llega por notificación electrónica a tu buzón de la sede.",
        ],
      },
      {
        id: "orden-tramites",
        title: "En qué punto de la cadena estás",
        paragraphs: [
          "La prestación por nacimiento es un eslabón posterior a la inscripción en el Registro Civil: sin esa inscripción (y su certificado literal) no hay solicitud que resolver. Si estás empezando de cero con un bebé de 2026, el orden eficiente es: inscripción del nacimiento, alta como beneficiario en la Seguridad Social y tarjeta sanitaria, empadronamiento, y prestación por nacimiento con su margen de cinco años. Las guías de este site cubren cada paso: la del Registro Civil del nacimiento, la de la tarjeta sanitaria del bebé y la del libro de familia y sus sustitutos digitales.",
        ],
      },
    ],
  },
];
