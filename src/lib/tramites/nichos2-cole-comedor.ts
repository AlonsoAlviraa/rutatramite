import { EDUCACION_URL } from "@/lib/tramites/facts";
import type { Guide } from "@/lib/tramites/types";

/**
 * Segunda línea de nichos colegio + comedor (facts verificados en la corrida de research de 2026-09-04).
 * Transporte escolar-metropolitano (T-16 y abono joven) vive bajo /comedor por afinidad de audiencia familiar.
 */
export const COLE_COMEDOR_NICHOS2_GUIDES: Guide[] = [
  {
    id: "cambioMitadCurso",
    pack: "colegio",
    path: "/colegio/cambiar-de-colegio-a-mitad-de-curso",
    h1: "Cambiar de colegio a mitad de curso: cómo se hace",
    title: "Cambiar de colegio a mitad de curso: guía 2026",
    description:
      "El cambio de centro en pleno curso se pide por vía administrativa ante la comisión de escolarización o la dirección del área, alegando causa sobrevenida. Pasos y documentos.",
    lead:
      "Un cambio de colegio a mitad de curso no se hace retirando la matrícula y apareciendo en otro centro: se pide por vía administrativa ante la comisión de escolarización o la dirección del área territorial de tu comunidad, alegando una causa sobrevenida (mudanza, acoso, cambio familiar). El expediente académico lo envía el centro de origen una vez confirmada la nueva plaza.",
    cta: { href: EDUCACION_URL, label: "Ministerio de Educación (portales CCAA)" },
    secondaryCta: { href: "/colegio/cambio-de-colegio-por-mudanza", label: "Guía: cambio por mudanza" },
    related: [
      { href: "/colegio/cambio-de-colegio-por-acoso", label: "Cambio de colegio por acoso" },
      { href: "/colegio/cambio-de-colegio-por-mudanza", label: "Cambio de colegio por mudanza" },
      { href: "/comedor/beca-comedor-2026-2027", label: "Beca comedor 2026-27" },
      { href: "/colegio", label: "Colegio: todas las guías" },
      { href: "/comedor", label: "Comedor: todas las guías" },
    ],
    sections: [
      {
        id: "via-administrativa",
        title: "La vía administrativa (y el error que hay que evitar)",
        paragraphs: [
          "El error clásico es dar de baja al niño en su cole actual confiando en que otro centro lo admitirá al día siguiente. En enseñanza obligatoria el menor tiene que seguir escolarizado mientras se tramita el cambio, y el papel que lo mueve todo no lo firma el colegio de destino por su cuenta: es una solicitud de admisión en curso presentada ante el órgano que gestiona las plazas de tu zona, normalmente la comisión de escolarización o la dirección del área territorial de la consejería. Ese órgano comprueba las vacantes, resuelve y solo entonces el nuevo centro formaliza la matrícula.",
          "Mientras el expediente anda de mesa en mesa, el niño sigue yendo a su colegio de origen: una baja voluntaria previa deja al menor sin puesto escolar y a la familia expuesta al protocolo de absentismo. La regla práctica es sencilla: nadie suelta la plaza que tiene hasta que la otra está firmada.",
        ],
      },
      {
        id: "causas-sobrevenidas",
        title: "Las causas sobrevenidas que lo justifican",
        paragraphs: [
          "Fuera del proceso ordinario de admisión, el cambio en pleno curso se apoya en una causa sobrevenida: la mudanza de domicilio (la más frecuente, acreditada con el certificado de empadronamiento nuevo), una situación de acoso o de convivencia grave (con el informe o expediente que el propio centro y la inspección hayan tramitado) y los cambios familiares relevantes, como separaciones con cambio de residencia del menor, traslados laborales o acogimientos. Cada comunidad regula su lista de supuestos y su impreso: confírmalo en la tuya antes de presentar.",
        ],
        lists: [
          [
            "Mudanza: certificado o volante de empadronamiento en el nuevo domicilio; es la prueba que reubica tu zona escolar.",
            "Cambio familiar (separación, custodia, acogimiento): sentencia, convenio o documento que acredite la nueva situación y el domicilio efectivo del menor.",
            "Situación de convivencia o acoso: informe del centro o de inspección educativa; la guía de cambio de colegio por acoso detalla esa vía.",
            "Traslado laboral u otras causas: justificante documental; si tu caso no encaja en ningún supuesto, consulta a la comisión antes de presentar.",
          ],
        ],
      },
      {
        id: "expediente-origen",
        title: "El expediente lo envía el centro de origen",
        paragraphs: [
          "Una vez resuelta la admisión, el expediente académico y el informe personal del alumno circulan por el cauce oficial entre secretarías: no hace falta, y normalmente no vale, llevar papeles sueltos a mano. Lo que sí conviene hacer en el centro de origen es pedir por escrito el justificante de la baja, recuperar los originales que queden en el archivo (informes médicos, por ejemplo) y dejar un teléfono de contacto por si el nuevo centro necesita ampliar información. El historial de notas viaja por la administración, no en la mochila.",
        ],
      },
      {
        id: "plazos-efectos",
        title: "Plazos y efectos prácticos",
        paragraphs: [
          "Este procedimiento funciona durante todo el curso, sin calendario de convocatoria: se presenta cuando la causa sobreviene y la resolución suele tardar días o pocas semanas según la zona y las vacantes. Un cambio de domicilio dentro del mismo municipio pero de zona escolar puede exigir que la mudanza sea efectiva, no solo anunciada. Y si buscas un centro muy solicitado, recuerda que a mitad de curso solo hay vacantes reales: las listas de espera del proceso ordinario ya no juegan. Para el caso más típico, la mudanza, la guía de cambio de colegio por mudanza ordena los trámites alrededor (empadronamiento, DNI, Hacienda). Si además usáis comedor, revisa los plazos de la beca comedor 2026-27 para no dejarla atrás con el cambio.",
        ],
      },
    ],
  },
  {
    id: "cambioPorAcoso",
    pack: "colegio",
    path: "/colegio/cambio-de-colegio-por-acoso",
    h1: "Cambiar de colegio por acoso: la vía correcta",
    title: "Cambiar de colegio por acoso: pasos y vía administrativa",
    description:
      "Ante acoso escolar, el cambio de centro se tramita por vía administrativa: escrito al centro y su protocolo de convivencia, inspección educativa y cambio con expediente e informe. Sin que el menor salga perjudicado.",
    lead:
      "El cambio de centro por acoso escolar es una medida que la administración educativa contempla, y se tramita por vía administrativa: primero un escrito a la dirección del centro, que activa su protocolo de convivencia, y la comunicación a inspección educativa. El cambio llega con expediente e informe, y no penaliza al menor. Esta guía ordena los pasos administrativos; no es asesoramiento jurídico.",
    cta: { href: EDUCACION_URL, label: "Ministerio de Educación (protocolos CCAA)" },
    related: [
      { href: "/colegio/cambiar-de-colegio-a-mitad-de-curso", label: "Cambiar de colegio a mitad de curso" },
      { href: "/colegio/cambiar-de-colegio-fuera-de-plazo", label: "Cambiar de colegio fuera de plazo" },
      { href: "/comedor/beca-comedor-2026-2027", label: "Beca comedor 2026-27" },
      { href: "/colegio", label: "Colegio: todas las guías" },
      { href: "/comedor", label: "Comedor: todas las guías" },
    ],
    sections: [
      {
        id: "escrito-centro",
        title: "Primero: el escrito al centro",
        paragraphs: [
          "La comunicación a la dirección del colegio debe ser por escrito y con registro de entrada: hechos descritos con fechas, qué se pide (la activación del protocolo de convivencia) y firma de quien ejerce la patria potestad. El protocolo de convivencia es el procedimiento interno que el centro está obligado a tener y a aplicar ante situaciones de acoso: recaba información, entrevista a las partes, protege al menor mientras se instruye y comunica el resultado a la familia. La conversación verbal con la dirección, por desgracia, no deja rastro: sin escrito registrado no hay constancia ni plazos que contar.",
          "Guarda copia sellada de todo lo presentado y de cada respuesta recibida: esa carpeta ordenada es el expediente que después sostiene el cambio de centro.",
        ],
      },
      {
        id: "inspeccion",
        title: "Inspección educativa",
        paragraphs: [
          "En paralelo o como escalado, la situación se puede poner en conocimiento de la inspección educativa de la dirección territorial de tu consejería: es el órgano que supervisa que el centro aplique su protocolo y valora la adopción de medidas. La vía habitual es un escrito describiendo los hechos y adjuntando lo ya presentado ante el centro. Si el centro y la familia discrepan sobre lo ocurrido, la inspección instruye y propone; los cauces y los formularios cambian entre comunidades: confírmalo en la tuya.",
        ],
      },
      {
        id: "cambio-medida",
        title: "El cambio de centro como medida",
        paragraphs: [
          "El cambio de centro se materializa como una medida dentro del expediente: la administración necesita el expediente instruido y un informe, del propio centro, de inspección o del equipo de orientación, que avale la medida para adjudicar plaza en otro centro con vacantes, fuera del calendario ordinario de admisión. Lo importante para la familia: la medida está pensada para proteger al menor, no para depurar responsabilidades, y el alumno cambia de centro con su expediente académico al día, sin pérdida de curso ni de derechos escolares. Lo que no procede es desescolarizar al niño mientras se resuelve: la escolarización continúa, con las medidas de cautela que el protocolo active dentro del centro.",
        ],
      },
      {
        id: "limites",
        title: "Una nota de límites",
        paragraphs: [
          "Esta guía ordena el trámite administrativo: escrito, protocolo, inspección, expediente y cambio. No es consejo jurídico ni valora responsabilidades; si la situación requiere valoración legal o acompañamiento psicológico, esos profesionales quedan fuera de este texto. Y si el cambio se plantea fuera del proceso ordinario sin causa documentada, la guía de cambiar de colegio fuera de plazo explica cómo funciona la adjudicación con vacantes.",
        ],
      },
    ],
  },
  {
    id: "listaEsperaInfantil",
    pack: "colegio",
    path: "/colegio/lista-espera-escuela-infantil",
    h1: "Lista de espera de la escuela infantil (0-3 años): cómo funciona",
    title: "Lista de espera escuela infantil 0-3: cómo funciona",
    description:
      "Cómo se ordena la lista de espera del primer ciclo de infantil: el baremo real con ejemplos de Castilla y León y Madrid, por qué las renuncias de septiembre mueven las listas y qué cambió en Madrid capital.",
    lead:
      "En el primer ciclo de infantil (0-3 años) no hay derecho a plaza como en la enseñanza obligatoria: hay baremo, adjudicación y lista de espera ordenada por puntos. Las renuncias de septiembre mueven las listas más que cualquier reclamación. Aquí, el funcionamiento y el baremo con ejemplos reales verificados.",
    cta: { href: EDUCACION_URL, label: "Ministerio de Educación (portales CCAA)" },
    related: [
      { href: "/bebe", label: "Bebé: trámites del primer año" },
      { href: "/colegio/cambiar-de-colegio-a-mitad-de-curso", label: "Cambiar de colegio a mitad de curso" },
      { href: "/colegio/inscripcion-extraescolares-ayuntamiento", label: "Extraescolares del ayuntamiento" },
      { href: "/colegio", label: "Colegio: todas las guías" },
      { href: "/comedor", label: "Comedor: todas las guías" },
    ],
    sections: [
      {
        id: "como-funciona",
        title: "Cómo funciona de verdad la lista",
        paragraphs: [
          "La escuela infantil de primer ciclo no es obligatoria, así que la administración no garantiza puesto escolar: publica plazas, aplica un baremo y ordena. Quien no obtiene plaza queda en lista de espera, ordenada por la puntuación del baremo, y las vacantes que se liberan se ofrecen siguiendo ese orden. El movimiento grande llega en septiembre: familias que renuncian porque les salió plaza en otro centro, mudanzas de verano y cambios de plan devuelven plazas al sistema justo cuando empieza el curso. Estar localizable (teléfono y correo del expediente correctos) es parte del trámite: las plazas se ofrecen con plazo corto de aceptación.",
        ],
      },
      {
        id: "baremo-real",
        title: "El baremo, con ejemplos reales",
        paragraphs: [
          "Cada comunidad y muchos ayuntamientos publican su propio baremo; dos ejemplos verificados dan la escala típica. Castilla y León puntúa con 8 puntos tener hermano matriculado en el centro, 8 la proximidad del domicilio o del lugar de trabajo, hasta 5 la renta (por tramos sobre el IPREM) y hasta 2 puntos complementarios por empadronamiento prolongado. La Comunidad de Madrid da 15 puntos por hermanos en el centro y puntúa la renta por tramos. Con esa escala se ve el patrón de casi todas partes: hermanos y proximidad dominan, la renta desempata y el padrón antiguo empuja.",
        ],
        lists: [
          [
            "Hermanos en el centro: 8 puntos en Castilla y León, 15 en la Comunidad de Madrid; es el criterio de más peso en casi todos los baremos.",
            "Proximidad del domicilio o del lugar de trabajo: 8 puntos en CyL; en la mayoría de baremos vivir en la zona vale tanto como trabajar en ella.",
            "Renta: hasta 5 puntos en CyL según tramos sobre el IPREM; por tramos también en Madrid.",
            "Empadronamiento: máximo 2 puntos complementarios en CyL; los años de padrón cuentan donde el baremo lo recoge.",
            "Otros criterios (discapacidad, familia numerosa, acogimiento): pesos distintos en cada comunidad; confírmalo en la tuya.",
          ],
        ],
      },
      {
        id: "madrid-capital",
        title: "Madrid capital: sin lista de espera en segundo y tercero",
        paragraphs: [
          "En diciembre de 2025 el Boletín de la Comunidad de Madrid publicó la eliminación de la lista de espera para segundo y tercer curso del primer ciclo en la capital: para esas edades ya no hay cola que esperar, y las vacantes se gestionan directamente con quien las solicita en cada escuela. Traducción práctica para las familias: quien se queda fuera en la primera adjudicación no agota la lista esperando su número, sino que tiene que pedir vacante escuela por escuela. Para primer curso del ciclo, el procedimiento ordinario con lista de espera sigue como estaba; los detalles operativos del nuevo modelo, en los canales municipales de Educación Infantil.",
        ],
      },
      {
        id: "mover-fichas",
        title: "Qué puede mover una familia",
        paragraphs: [
          "Fuera del baremo, las palancas reales son pocas pero concretas: corregir el empadronamiento si el niño no figura en el domicilio real (arrastra puntos mal contados), presentar la documentación complementaria dentro del plazo cuando la convocan y, sobre todo, en septiembre, pedir vacante en varios centros y no solo en uno. Si el peque es reciente y vais con los trámites del primer año a cuestas, la guía del bebé los ordena: registro civil, tarjeta sanitaria y vacunas son también piezas previas de cualquier expediente escolar.",
        ],
      },
    ],
  },
  {
    id: "extraescolaresMunicipales",
    pack: "colegio",
    path: "/colegio/inscripcion-extraescolares-ayuntamiento",
    h1: "Extraescolares del ayuntamiento: cómo inscribirse",
    title: "Inscripción en extraescolares municipales: plazos y sorteo",
    description:
      "Las actividades extraescolares municipales no tienen fecha estatal: cada ayuntamiento abre su plazo. Ejemplos verificados (Barcelona, Rivas-Vaciamadrid), qué pasa fuera de plazo y por qué octubre y noviembre reactivan las listas.",
    lead:
      "Las extraescolares municipales (deporte, música, robótica, idiomas en instalaciones municipales o en los propios colegios) las convoca cada ayuntamiento con su calendario y su procedimiento. No hay plazo estatal: hay que vigilar la web del tuyo. Dos ejemplos verificados y las reglas comunes.",
    cta: { href: EDUCACION_URL, label: "Ministerio de Educación (portales CCAA)" },
    related: [
      { href: "/colegio/lista-espera-escuela-infantil", label: "Lista de espera infantil 0-3" },
      { href: "/comedor/beca-comedor-2026-2027", label: "Beca comedor 2026-27" },
      { href: "/colegio", label: "Colegio: todas las guías" },
      { href: "/comedor", label: "Comedor: todas las guías" },
    ],
    sections: [
      {
        id: "cada-ayuntamiento",
        title: "Cada ayuntamiento, su plazo",
        paragraphs: [
          "No existe convocatoria estatal: la actividad extraescolar en instalaciones municipales o en los centros escolares la organiza cada concejalía (deportes, educación, juventud) con su propio calendario. Dos ejemplos reales: en Barcelona la inscripción del programa de actividades extraescolares va del 15 de septiembre al 8 de octubre, y Rivas-Vaciamadrid asigna las plazas mediante sorteo cuando hay más solicitantes que huecos. La diferencia de modelo es total (ventanilla ordenada contra sorteo aleatorio), y solo la web de tu concejalía dice cuál te toca: confírmalo en tu ayuntamiento.",
        ],
      },
      {
        id: "como-inscribirse",
        title: "Cómo es la inscripción",
        paragraphs: [
          "Lo habitual es la inscripción telemática en la sede o el portal municipal, con la carpeta ciudadana ya preparada. Los requisitos típicos: estar empadronado en el municipio, identificar al menor y al titular, y elegir actividad y horario. Algunos ayuntamientos priorizan por barrio o bonifican por renta, otros son estrictos con el orden de llegada o el sorteo, como Rivas. El precio público, donde lo hay, y sus bonificaciones están en la ordenanza municipal: la tuya, publicada en la sede electrónica de tu ayuntamiento.",
        ],
        lists: [
          [
            "Localiza la convocatoria: webs municipales de deportes y educación, y los tablones de los propios centros.",
            "Empadronamiento vigente en el municipio: es un requisito frecuente; si el padrón está en otra dirección, comprueba cómo lo valora la convocatoria antes de solicitar.",
            "Alta del menor en el portal municipal: muchas actividades exigen cuenta propia del niño, no la del padre o la madre.",
            "Elige con alternativas: en sorteo o en lista, una segunda opción bien elegida es media plaza.",
          ],
        ],
      },
      {
        id: "fuera-de-plazo",
        title: "Fuera de plazo: la lista de vacantes",
        paragraphs: [
          "Perder el plazo no cierra el curso: quien no se inscribe en fechas pasa a la lista de vacantes, por orden de solicitud, y entra cuando queda un hueco. Y los huecos llegan: las bajas de octubre y noviembre (peques que abandonan la actividad, cambios de horario familiar, traslados) reactivan las listas con cierta frecuencia. La práctica que funciona: apuntarse en la lista de vacantes nada más cerrar el plazo ordinario, dejar dos o tres actividades alternativas y preguntar en la concejalía cada pocas semanas. Las plazas liberadas se ofrecen por orden y con plazo corto de aceptación, igual que en las listas de espera escolares.",
        ],
      },
      {
        id: "antes-de-apuntarte",
        title: "Antes de apuntarte, comprueba esto",
        paragraphs: [
          "Que la actividad sea municipal no la hace automática: comprueba el calendario real (muchas arrancan en octubre, cuando las familias ya dan el curso por perdido), el precio público con sus bonificaciones si te aplican, y dónde se desarrolla, porque no es lo mismo una instalación municipal que el pabellón del colegio con monitor y desplazamiento. Si la plaza no llega por la vía municipal, las AMPA y las asociaciones del barrio convocan actividades propias en fechas más flexibles: catálogo más corto, pero rescata el curso.",
        ],
      },
    ],
  },
  {
    id: "becaComedor2627",
    pack: "comedor",
    path: "/comedor/beca-comedor-2026-2027",
    h1: "Beca de comedor 2026-27: plazos por comunidad",
    title: "Beca comedor 2026-2027: plazos y segundas ventanas",
    description:
      "Los plazos de la beca de comedor 2026-27 comunidad por comunidad: ordinarios cerrados en primavera (CyL, Andalucía, Madrid, Galicia) y las segundas ventanas de septiembre aún a tiempo.",
    lead:
      "La beca de comedor 2026-27 se convocó en primavera en la mayoría de comunidades y esos plazos ya están cerrados. Quedan segundas ventanas en septiembre: Castilla y León del 1 al 22, Barcelona ciudad del 8 al 27 y Andalucía para concertados del 1 al 15. Aquí el mapa completo, con fechas verificadas.",
    cta: { href: EDUCACION_URL, label: "Educación (convocatorias por CCAA)" },
    secondaryCta: { href: "/comedor/beca-comedor-fuera-de-plazo", label: "Guía: beca fuera de plazo" },
    related: [
      { href: "/comedor/beca-comedor-fuera-de-plazo", label: "Beca comedor fuera de plazo" },
      { href: "/comedor/menu-especial-comedor", label: "Menú especial en el comedor" },
      { href: "/colegio/cambiar-de-colegio-a-mitad-de-curso", label: "Cambiar de cole a mitad de curso" },
      { href: "/comedor", label: "Comedor: todas las guías" },
      { href: "/colegio", label: "Colegio: todas las guías" },
    ],
    sections: [
      {
        id: "plazos-ordinarios",
        title: "Los plazos ordinarios (ya cerrados)",
        paragraphs: [
          "Las convocatorias ordinarias de beca o ayuda de comedor para el curso 2026-27 corrieron en primavera, y a estas alturas están cerradas. Si tu comunidad está en esta lista y no solicitaste, el ordinario se perdió: la salida son las segundas ventanas de septiembre y la vía sobrevenida que se explica más abajo.",
        ],
        lists: [
          [
            "Castilla y León: del 15 de abril al 8 de mayo de 2026.",
            "Andalucía: del 7 de abril al 19 de mayo de 2026.",
            "Comunidad de Madrid: cierre el 28 de mayo; fase de subsanación del 22 de junio al 3 de julio.",
            "Galicia: ayuda de 150 euros, del 6 de julio al 6 de agosto.",
            "Resto de comunidades: fechas propias publicadas en sus sedes; confírmalo en la tuya.",
          ],
        ],
      },
      {
        id: "segundas-ventanas",
        title: "Las segundas ventanas de septiembre",
        paragraphs: [
          "Varias administraciones reabren la solicitud en septiembre con plazos cortos: Castilla y León admite nuevas solicitudes del 1 al 22 de septiembre; Barcelona ciudad abre un segundo período del 8 al 27; y Andalucía convocó un plazo propio para centros concertados del 1 al 15 de septiembre. Estas ventanas no son una norma general: son decisiones de cada convocatoria. Si tu comunidad no aparece, quedan dos vías reales: la solicitud por circunstancias sobrevenidas (el cambio de situación familiar posterior al cierre) y las ayudas municipales propias, que muchos ayuntamientos convocan precisamente en septiembre y octubre.",
        ],
      },
      {
        id: "requisitos-tipicos",
        title: "Qué suelen pedir",
        paragraphs: [
          "Aunque cada convocatoria manda, el patrón de requisitos es estable: renta familiar por debajo de unos umbrales o puntuación en un baremo social, empadronamiento en la comunidad, y el alumno matriculado en un centro con servicio de comedor de la administración que convoca. La presentación suele ser telemática, en la sede de la consejería o del organismo gestor. Los importes van desde ayudas de cuantía fija, como los 150 euros gallegos, hasta porcentajes del precio público según tramos de renta: los detalles, en la orden de cada convocatoria.",
        ],
      },
      {
        id: "si-llegas-tarde",
        title: "Si llegas tarde a todo",
        paragraphs: [
          "Cuando ni el ordinario ni la segunda ventana son posibles, la guía de beca de comedor fuera de plazo ordena las salidas reales: circunstancias sobrevenidas, servicios sociales del ayuntamiento ante vulnerabilidad, fraccionamiento del precio público y deducciones fiscales del ejercicio siguiente. Lo que no recomienda nadie: dejar de pagar a la espera de la ayuda, porque el impago abre el expediente del servicio mientras la beca ni siquiera está solicitada.",
        ],
      },
    ],
  },
  {
    id: "menuEspecialComedor",
    pack: "comedor",
    path: "/comedor/menu-especial-comedor",
    h1: "Menú especial en el comedor escolar: cómo pedirlo",
    title: "Menú especial en el comedor: cómo pedirlo",
    description:
      "El menú adaptado del comedor escolar se activa con un certificado médico oficial que detalle los alimentos a evitar. Quién lo emite, dónde se entrega y por qué hay que renovarlo cada curso. Guía estrictamente documental.",
    lead:
      "El menú especial del comedor escolar no se pide de palabra ni con una nota de la familia: lo activa un certificado médico oficial que especifique los alimentos que el alumno debe evitar. Con ese documento, el servicio abre el menú adaptado y aplica su protocolo de alérgenos. Esta guía es estrictamente administrativa: qué papel, quién lo firma, dónde se entrega.",
    cta: { href: EDUCACION_URL, label: "Educación (protocolos por CCAA)" },
    secondaryCta: { href: "/comedor/documentos-alergia-comedor-escolar", label: "Guía: documentos de alergia" },
    related: [
      { href: "/comedor/documentos-alergia-comedor-escolar", label: "Alergias: documentos del comedor" },
      { href: "/comedor/beca-comedor-2026-2027", label: "Beca comedor 2026-27" },
      { href: "/comedor", label: "Comedor: todas las guías" },
      { href: "/colegio", label: "Colegio: todas las guías" },
    ],
    sections: [
      {
        id: "certificado",
        title: "El certificado médico que lo activa",
        paragraphs: [
          "El documento que arranca el procedimiento es un certificado médico oficial en el que conste el diagnóstico y, sobre todo, la relación concreta de alimentos a evitar: sin esa lista, el servicio de comedor no sabe qué adaptar. Lo emite el pediatra del sistema público o el especialista que lleve el caso. Varios servicios de comedor y varias consejerías publican un modelo propio con apartados cerrados para alergias e intolerancias: pídelo en secretaría antes de la cita médica y te ahorrarás una segunda visita para rellenarlo como toca.",
        ],
      },
      {
        id: "norma",
        title: "La norma que lo respalda",
        paragraphs: [
          "La obligación de ofrecer menús adaptados en los comedores escolares está en el artículo 40 de la Ley 17/2011, de seguridad alimentaria y nutrición: los comedores escolares deben disponer de menús adaptados a quienes los necesiten, y el servicio aplica además protocolos de gestión de alérgenos (etiquetado, trazabilidad y prevención de contaminación cruzada en cocina). El certificado médico es la llave que abre ese derecho en el expediente del alumno: la familia lo aporta y la administración lo hace constar. Esta página no entra en dietas ni en pautas: el diagnóstico y sus cambios los lleva siempre un profesional sanitario.",
        ],
      },
      {
        id: "entrega",
        title: "Dónde se entrega y a quién llega",
        paragraphs: [
          "El certificado se entrega en la secretaría del centro, normalmente en el momento del alta en el servicio de comedor o en cuanto se diagnostique la condición si surge con el curso empezado. La secretaría lo incorpora al expediente y lo traslada a la empresa concesionaria que gestiona el comedor, que es quien elabora el menú adaptado y marca las pautas de cocina y vigilancia en el comedor. Pide que conste por escrito la fecha de entrega: es tu prueba si algo del circuito se pierde.",
        ],
      },
      {
        id: "renovacion",
        title: "Renovación anual y cambios de diagnóstico",
        paragraphs: [
          "Los servicios de comedor suelen pedir la renovación del certificado cada curso: la exigencia típica es anual, porque el diagnóstico y las tolerancias cambian con la edad. Si el diagnóstico cambia en mitad de curso, el circuita es el mismo: nuevo certificado, entrega en secretaría y actualización del protocolo con la concesionaria. Para el detalle de los modelos y documentos que pide cada centro, la guía de documentos de alergia en el comedor los repasa uno a uno.",
        ],
      },
    ],
  },
  {
    id: "t16Solicitud",
    pack: "comedor",
    path: "/comedor/t16-como-solicitar",
    h1: "T-16: cómo solicitarla para un menor en Barcelona",
    title: "Tarjeta T-16: cómo solicitarla paso a paso",
    description:
      "T-16 del sistema integrado de Barcelona: edad, zona de uso, alta online del menor y coste de la tarjeta. Pasos y fuentes oficiales en castellano.",
    lead:
      "La T-16 permite viajar desde los 4 años hasta seis meses después de cumplir los 16, dentro de la zona tarifaria del municipio de residencia. Esta guía explica la solicitud en el sistema integrado de Barcelona a través de TMB.",
    cta: { href: "https://www.tmb.cat/es/tarifas-metro-bus-barcelona/t-mobilitat/bonificaciones-y-descuentos/t-16-t-jove", label: "Solicitar la T-16: instrucciones de TMB" },
    reviewedAt: "2026-09-07",
    sources: [
      { label: "TMB: condiciones y gestiones de la T-16", href: "https://www.tmb.cat/es/tarifas-metro-bus-barcelona/t-16" },
      { label: "TMB: alta del menor y solicitud online", href: "https://www.tmb.cat/es/tarifas-metro-bus-barcelona/t-mobilitat/bonificaciones-y-descuentos/t-16-t-jove" },
    ],
    disclaimer: "Guía independiente para la T-16 del sistema integrado de Barcelona. Confirma condiciones y tarifas en TMB antes de solicitarla. No somos Administración Pública ni operador de transporte.",
    related: [
      { href: "/comedor/abono-joven-estudiante", label: "Abono joven de transporte" },
      { href: "/comedor", label: "Comedor y vida escolar: guías" },
      { href: "/colegio", label: "Colegio: todas las guías" },
    ],
    sections: [
      {
        id: "que-es",
        title: "Dónde sirve y cuándo caduca",
        paragraphs: [
          "Es personal e intransferible. Los viajes son ilimitados en la zona para la que se emite; comprueba la de tu municipio en el mapa enlazado por TMB. Durante una inspección hay que acreditar la identidad del titular con un documento oficial vigente.",
          "La tarjeta no necesita renovaciones periódicas. Su caducidad llega seis meses después del 16.º cumpleaños: prepara otro título antes de esa fecha.",
        ],
      },
      {
        id: "alta-paso-a-paso",
        title: "El alta, paso a paso",
        paragraphs: [
          "La persona adulta responsable puede tramitarla online desde su cuenta de T-mobilitat en TMB Tickets. El título de viaje es gratuito, pero emitir la tarjeta cuesta 4,50 €.",
        ],
        lists: [
          [
            "Da de alta al menor: autoriza la comprobación administrativa o adjunta su documento de identidad y la documentación familiar que indica TMB.",
            "Comprueba que aparece en Personas a cargo y asígnale el perfil T-16.",
            "Solicita el soporte desde su apartado. TMB indica unos diez días hábiles para recibirlo en casa.",
            "Activa la tarjeta antes del primer viaje siguiendo las instrucciones oficiales.",
          ],
        ],
      },
      {
        id: "uso-y-caducidad",
        title: "Si prefieres acudir a un Punt TMB",
        paragraphs: [
          "El menor no tiene que asistir. Puede acudir su padre, madre, tutor legal o una persona adulta autorizada. Revisa en TMB los documentos originales y, si procede, la autorización que debes llevar. La cita previa es recomendable.",
        ],
      },
      {
        id: "perdida-o-mudanza",
        title: "Pérdida de la tarjeta o cambio de domicilio",
        paragraphs: [
          "Si se pierde o te la roban, bloquea y da de baja el soporte antes de pedir el duplicado, que cuesta 4,50 €. Si cambia tu domicilio, actualiza los datos; una mudanza a otra zona tarifaria puede requerir una nueva tarjeta.",
        ],
      },
    ],
  },
  {
    id: "abonoJovenEstudiante",
    pack: "comedor",
    path: "/comedor/abono-joven-estudiante",
    h1: "Abono joven de transporte: cómo pedirlo por comunidad",
    title: "Abono joven de transporte: cómo pedirlo",
    description:
      "El abono joven se pide al consorcio de tu territorio y cubre hasta cumplir los 26 (ejemplo: CRTM Madrid). Además existe el abono único estatal para menores de 26 del Ministerio de Transportes. Ambos, explicados.",
    lead:
      "El abono joven de transporte se solicita en el consorcio o autoridad de tu comunidad y mantiene sus condiciones hasta que cumples los 26 años (en Madrid, por ejemplo, lo gestiona el CRTM). A partir de ahí, tarifa de adulto con las bonificaciones estatales que sigan vigentes. Esta guía ordena las dos piezas: el abono joven de tu territorio y el abono único estatal de menos de 26.",
    cta: { href: "https://www.crtm.es/", label: "CRTM: abono joven (Madrid)" },
    related: [
      { href: "/comedor/t16-como-solicitar", label: "T-16: solicitud y edad de uso" },
      { href: "/fp", label: "FP: matrícula y convalidaciones" },
      { href: "/becas", label: "Becas: todas las guías" },
      { href: "/comedor", label: "Comedor y vida escolar: guías" },
      { href: "/colegio", label: "Colegio: todas las guías" },
    ],
    sections: [
      {
        id: "abono-joven-territorio",
        title: "El abono joven: hasta cumplir los 26",
        paragraphs: [
          "El abono joven es un título de transporte con precio reducido que cada consorcio o autoridad metropolitana define en su territorio: condiciones, zonas y canales cambian de una comunidad a otra, así que confírmalo en tu consorcio. Lo que comparten casi todos: es personal, exige la tarjeta de transporte del sistema y cubre hasta que el joven cumple los 26 años. El ejemplo más conocido es el de Madrid, gestionado por el Consorcio Regional de Transportes: el abono joven madrileño se mantiene hasta cumplir los 26 y se canaliza a través del CRTM.",
        ],
      },
      {
        id: "abono-unico-estatal",
        title: "El abono único estatal de menos de 26",
        paragraphs: [
          "Además del título de cada territorio, el Ministerio de Transportes mantiene el abono único estatal para menores de 26: un descuento aplicable en los operadores adheridos de todo el Estado, con sus propias condiciones de alta y acreditación de edad. La clave práctica: no sustituye al abono joven de tu ciudad, porque operan sobre sistemas distintos, y convive con los títulos universitarios propios de cada comunidad: unos no excluyen a los otros. Tampoco exige estar estudiando: lo que marca el acceso es la edad; los detalles operativos, en la web del Ministerio de Transportes.",
        ],
      },
      {
        id: "cumplir-26",
        title: "El cumpleaños de los 26",
        paragraphs: [
          "Al cumplir los 26 se pierde la condición de joven y el precio pasa a la tarifa de adulto del sistema que uses. La transición no es un salto al vacío: las bonificaciones estatales que estén vigentes se aplican también a los títulos de adulto, de modo que el abono sale más barato que la tarifa plena mientras esas bonificaciones se mantengan. Gestiona la renovación antes del cumpleaños para no quedarte sin título el lunes siguiente: los consorcios suelen avisar en su app, pero el calendario lo dicta la fecha de nacimiento que consta en tu expediente.",
        ],
      },
      {
        id: "donde-pedirlo",
        title: "Dónde pedirlo según tu ciudad",
        paragraphs: [
          "No hay ventanilla nacional: cada comunidad o área metropolitana tiene su consorcio y su canal (web, app, expendedores). El itinerario común: identifica tu consorcio, saca o canjea la tarjeta de transporte del sistema, acredita edad y residencia donde lo pidan y carga el título joven. Para el ejemplo de Madrid, toda la gestión del abono joven pasa por el CRTM. Y si además estudias, las guías de matrícula de FP y de becas de este site conectan con los trámites que suelen venir pegados al transporte.",
        ],
      },
    ],
  },
];
