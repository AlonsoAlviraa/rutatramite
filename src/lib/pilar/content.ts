import { DISCLAIMER_SHORT, ESCENARIO_LABELS, ESCENARIO_SLUGS, type EscenarioSlug } from "@/lib/types";
import { escenarioPath } from "@/lib/geo/paths";

export type PilarFaq = { q: string; a: string };
export type PilarSection = { id: string; title: string; paragraphs: string[]; links?: { href: string; label: string }[]; lists?: string[][]; tables?: { headers: string[]; rows: string[][] }[] };

export function buildPilarModel() {
  const faqs: PilarFaq[] = [
    {
      q: "¿Qué es el padrón municipal y para qué sirve?",
      a: "Es el registro administrativo de los vecinos de un municipio. Acredita residencia y domicilio habitual; las certificaciones tienen carácter de documento público (artículo 16.1 de la Ley 7/1985). No concede por sí solo prestaciones, permiso de residencia ni derechos sobre la vivienda.",
    },
    {
      q: "¿Quién está obligado a empadronarse?",
      a: "Toda persona que viva en España, en el municipio donde reside habitualmente (artículo 15 LBRL). Si vives en varios, en el que más tiempo pasas al año. La obligación no depende de tener autorización de residencia ni de la situación urbanística de la vivienda.",
    },
    {
      q: "¿Dónde se pide el alta?",
      a: "En el ayuntamiento del municipio donde está tu vivienda. Busca el nombre de tu localidad y comprueba la provincia antes de abrir la sede. Si vives en Móstoles, por ejemplo, el alta corresponde a Móstoles y no al municipio de Madrid.",
    },
    {
      q: "¿Cuánto cuesta el alta?",
      a: "El alta ordinaria es gratuita. El Ayuntamiento de València indica que la inscripción en el padrón es un trámite gratuito. Para volantes y certificados de otro municipio, consulta las tasas que publique su ayuntamiento. RutaTrámite no cobra ni reserva citas.",
    },
    {
      q: "¿Puedo empadronarme sin contrato de alquiler?",
      a: "Sí. Debe comprobarse la residencia efectiva. Según el caso puede haber autorización de una persona ya empadronada con título de ocupación, otros documentos o comprobación municipal. La guía sin contrato desarrolla las alternativas y sus condiciones.",
    },
    {
      q: "¿Puedo empadronarme si estoy irregular?",
      a: "Sí. Debes acreditar identidad mediante un documento admitido y residencia real. Los documentos de protección internacional tienen condiciones de validez específicas. El padrón no concede residencia legal; sus datos pueden consultarse o comunicarse en los supuestos y con las garantías previstos por la ley.",
    },
    {
      q: "¿Hace falta TIE para el alta?",
      a: "No como requisito nacional. La TIE identifica a quien la tiene. Si no la tienes, el pasaporte u otro documento previsto por el INE. Esta web no afirma que el ayuntamiento pueda exigir TIE para el alta como norma.",
    },
    {
      q: "¿Qué diferencia hay entre volante, certificado e histórico?",
      a: "El volante informa y el certificado acredita fehacientemente. Histórico describe el contenido temporal, no un tercer tipo incompatible con los anteriores. Comprueba documento y antigüedad exigidos por el destinatario: no hay un plazo de tres meses aplicable a todos los usos.",
    },
    {
      q: "¿El padrón cambia el domicilio fiscal?",
      a: "No sustituye la comunicación fiscal que corresponda. El modelo 030 sirve para determinados contribuyentes; quienes están en el censo de empresarios, profesionales y retenedores utilizan el cauce censal correspondiente. Consulta la guía de mudanza.",
    },
    {
      q: "¿Tengo que darme de baja en el pueblo de origen?",
      a: "Para trasladarte a otro municipio de España solicita el alta en destino: la coordinación padronal comunica la baja de origen. Dentro del mismo municipio se tramita un cambio de domicilio. La salida al extranjero tiene reglas diferentes.",
    },
    {
      q: "¿Todos los extranjeros no comunitarios renuevan cada dos años?",
      a: "No. La renovación bienal corresponde al grupo ENCSARP: extranjeros no comunitarios sin residencia de larga duración, excluidos los titulares de tarjeta de régimen comunitario. El plazo se cuenta desde el alta o la última renovación expresa. Los demás extranjeros pueden estar sujetos a comprobaciones de residencia distintas.",
    },
    {
      q: "¿Cómo detecto un clon de cita?",
      a: "Accede al apartado de cita desde la web oficial de tu ayuntamiento. Un nombre parecido o un anuncio no acreditan que una página sea municipal. Comprueba el organismo y el procedimiento antes de introducir datos o reservar.",
    },
    {
      q: "¿Qué puede exigir el ayuntamiento y qué no?",
      a: "Puede comprobar identidad, representación y residencia efectiva. Los documentos de vivienda permiten comprobar dónde vives: el padrón no resuelve conflictos de propiedad o alquiler ni legaliza la ocupación o la situación urbanística.",
    },
    {
      q: "¿RutaTrámite es la Administración?",
      a: "No. Somos una guía ciudadana independiente. El trámite se hace en el ayuntamiento. No pedimos DNI, pasaporte ni fotos, ni vendemos citas. Los enlaces oficiales permiten continuar el trámite ante la administración competente.",
    },
    {
      q: "¿De dónde salen los datos de las 769 fichas?",
      a: "El catálogo contiene una selección parcial de 769 municipios. La población se contrasta por separado de los procedimientos: una cifra verificada no acredita documentos, horarios o canales del padrón. Comprueba la fecha y el estado de cada ficha; la metodología explica la procedencia de los datos.",
    },
  ];

  const escenarioBlurb: Record<EscenarioSlug, string> = {
    "con-contrato": "Contrato vigente y documentación de alquiler; comprobaciones y alternativas previstas por el INE.",
    "sin-contrato": "Residencia real, autorización cuando proceda y comprobación municipal si faltan documentos.",
    propietario: "Escritura, nota simple o IBI. Referencia catastral cuando exista (art. 16 LBRL).",
    "casa-de-familiar": "Cuándo puede autorizar una persona ya empadronada y qué título de ocupación debe acreditar.",
    menores: "Identidad, representación, consentimientos y condiciones de los anexos I y II.",
    "extranjeros-ue": "Documento nacional o pasaporte UE/EEE/Suiza y certificado de registro si se dispone de él.",
    "extranjeros-no-ue": "Identificación admitida, menores y diferencia entre padrón y residencia legal.",
    "sin-hogar": "Residencia habitual, servicios sociales y condiciones del domicilio de referencia.",
    "volante-vs-certificado": "Valor del documento, contenido histórico o colectivo y condiciones de acceso a datos.",
    "renovacion-2-anos": "Quién debe renovar, desde cuándo se cuenta el plazo y cómo se comunica la baja por caducidad.",
    "cambio-de-domicilio": "Variación dentro del municipio o alta por traslado a otro: elige el procedimiento correcto.",
    "volante-online": "Canal electrónico, identificación y alternativas municipales para obtener el documento.",
    "cita-previa-madrid": "Canales, oficinas, documentos y consentimientos para presentar el alta en Madrid.",
    baja: "Traslado, salida al extranjero, caducidad e inscripción indebida: procedimientos distintos.",
  };

  const sections: PilarSection[] = [
    {
      id: "respuesta",
      title: "La respuesta directa",
      paragraphs: [
        "Quien vive en España debe inscribirse en el municipio donde reside habitualmente. El alta ordinaria es gratuita y se solicita al ayuntamiento. El Ayuntamiento de València publica que la inscripción en el padrón es un trámite gratuito; las tasas de volante o certificado, si existen, las fija cada ayuntamiento. Prepara la identificación y la documentación que permita comprobar dónde resides; si no tienes contrato o domicilio convencional, consulta las vías específicas. Estar en situación irregular no impide el alta (artículo 15 de la Ley 7/1985 e instrucciones INE). No somos Administración Pública ni despacho de abogados.",
      ],
      links: [
        { label: "Ayuntamiento de València: la inscripción en el padrón es un trámite gratuito", href: "https://www.valencia.es/documents/20142/20609056/PREGUNTAS+FRECUENTES+PADRON.pdf/95395fb7-6f62-224a-9471-a1b6dda7ddbe" },
      ],
    },
    {
      id: "tramites",
      title: "Tabla de trámites",
      paragraphs: [
        "El canal y los documentos pueden cambiar según la gestión, incluso dentro del mismo ayuntamiento.",
      ],
      tables: [
        {
          headers: ["Trámite", "Qué es", "Dónde"],
          rows: [
            ["Alta", "Inscripción como vecino. Gratuita.", "Ayuntamiento del domicilio"],
            ["Cambio de domicilio", "Variación de dirección dentro del mismo municipio.", "Tu ayuntamiento; si es otro municipio, solicita el alta en destino"],
            ["Volante", "Información de datos padronales.", "Sede, OAC, a veces 010 local"],
            ["Certificado", "Documento público fehaciente.", "Sede o secretaría"],
            ["Contenido histórico", "Periodo o movimientos que puede acreditar un volante o certificado; no es un tercer tipo de documento.", "Canal publicado por el ayuntamiento"],
            ["Renovación 2 años", "Grupo ENCSARP, con las exclusiones explicadas en la guía.", "Ayuntamiento donde estás inscrito"],
            ["Baja", "Traslado, defunción, caducidad, duplicado o inscripción indebida: cada causa tiene su procedimiento.", "Consulta la guía de bajas y el ayuntamiento"],
          ],
        },
      ],
    },
    {
      id: "identidad",
      title: "Documentos de identidad y representación",
      paragraphs: [
        "El apartado 2.1 de las instrucciones padronales regula la identidad. Como regla, los documentos deben estar en vigor; los caducados requieren la solicitud de renovación en los términos previstos. Consulta los documentos y originales que admite el canal municipal.",
      ],
      tables: [
        {
          headers: ["Perfil", "Documento"],
          rows: [
            ["Español desde los 14 años", "DNI; pasaporte en los supuestos previstos para residentes en el extranjero hasta obtener el DNI"],
            ["Menor de 14 de cualquier nacionalidad", "Libro de familia o certificado de nacimiento si carece de los documentos de identidad previstos; DNI si lo tiene"],
            ["UE / EEE / Suiza", "Pasaporte o documento nacional en vigor y certificado de registro con NIE si se dispone de él"],
            ["Resto con TIE", "TIE en vigor"],
            ["Resto sin TIE", "Pasaporte en vigor u otro documento previsto por el INE; cédula, título de viaje, protección internacional y documentación de menores no acompañados tienen condiciones específicas"],
            ["Representante", "Identificación y acreditación de la representación, además de los documentos de la persona interesada"],
          ],
        },
      ],
    },
    {
      id: "vivienda",
      title: "Cómo acreditar la residencia",
      paragraphs: [
        "La documentación sirve para comprobar la residencia. Si falta un título, el ayuntamiento puede verificarla por otros medios. La referencia catastral o equivalente foral, cuando exista, está prevista legalmente y su incorporación sigue el régimen de implantación del RD 141/2024.",
      ],
      tables: [
        {
          headers: ["Vía", "Qué"],
          rows: [
            ["Propietario", "Escritura, nota simple, IBI, referencia catastral cuando exista"],
            ["Alquiler a nombre", "Contrato vigente de vivienda habitual y documentación de pago; confirma los documentos del procedimiento municipal"],
            ["Habitación", "Si hay personas inscritas: autorización de un adulto ya empadronado con título de posesión efectiva; si falta, solicita comprobación de residencia"],
            ["Familiar", "El autorizante debe reunir las condiciones de inscripción y título de ocupación; el parentesco no basta"],
            ["Sin contrato o título", "Solicita la comprobación municipal de tu residencia efectiva; no equivale a carecer de identidad"],
            ["Sin domicilio convencional", "Domicilio de referencia: servicios sociales con las condiciones de integración pública o coordinación y supervisión, residencia habitual, dirección y compromiso de intentar notificaciones"],
          ],
        },
      ],
    },
    {
      id: "municipio-real",
      title: "Cómo saber tu municipio real (Móstoles no es Madrid)",
      paragraphs: [
        "El padrón corresponde al término municipal, no a la provincia ni al área metropolitana. Comprueba la localidad de tu domicilio antes de elegir el ayuntamiento.",
        "El directorio contiene 769 municipios del catálogo disponible. Escribe el nombre en el buscador y comprueba la provincia y la comunidad, especialmente si existen localidades con nombres iguales o parecidos. La cobertura es parcial.",
        "Los canales de una localidad no se trasladan a otra. Comprueba el estado de cada ficha: una revisión pendiente no confirma documentos, oficinas ni horarios.",
      ],
    },
    {
      id: "cita",
      title: "Cómo pedir cita y detectar un clon",
      paragraphs: [
        "Accede desde la web de tu ayuntamiento. Algunos servicios oficiales usan proveedores externos: comprueba el enlace de origen y el organismo, no solo el nombre o la extensión del dominio.",
        "Abre la sede desde la ficha de tu municipio y busca el procedimiento de padrón. Si falta el enlace de cita o la ficha indica que está pendiente de revisión, consulta directamente al ayuntamiento. La disponibilidad de una oficina no sirve para otro municipio.",
        "Antes de reservar, comprueba cuántas personas admite cada cita y qué oficina puede atenderte. Si no encuentras hueco, consulta las alternativas que publique tu ayuntamiento y evita reservar en otro municipio por proximidad.",
      ],
    },
    {
      id: "clave",
      title: "Solicitud electrónica: identificación y presentación",
      paragraphs: [
        "Consulta qué identificación y firma admite la sede: Cl@ve, certificado o DNIe no están disponibles necesariamente para todos los procedimientos. Adjunta los documentos indicados y conserva el justificante. Presentar un registro no equivale a que el alta esté aprobada ni a obtener un volante.",
        "Comprueba si estás usando el procedimiento específico y cómo se aportan firmas o consentimientos de otras personas. No se promete aprobación inmediata; la identificación electrónica tampoco sustituye la comprobación de residencia.",
        "Si no puedes completar la solicitud electrónica, consulta el canal presencial y la ayuda que ofrezca la sede. Una ficha pendiente de verificación no confirma los horarios ni la disponibilidad de un trámite por internet.",
      ],
    },
    {
      id: "escenarios",
      title: `Guías para ${ESCENARIO_SLUGS.length} situaciones`,
      paragraphs: [
        "Elige la guía que corresponde a tu caso y contrasta sus indicaciones con el procedimiento municipal.",
      ],
      links: [
        { href: "/empadronarse/documentos-necesarios", label: "Documentos necesarios para empadronarse" },
        { href: "/empadronarse/cuanto-tarda-plazo", label: "Cuánto tarda: plazo de 3 meses y silencio positivo" },
        { href: "/empadronarse/padron-y-voto-29n", label: "Padrón y voto el 29-N" },
        { href: "/empadronarse/formulario-empadronamiento-madrid", label: "Formulario de empadronamiento en Madrid" },
        { href: "/empadronarse/formulario-empadronamiento-barcelona", label: "Formulario de empadronamiento en Barcelona" },
        { href: "/empadronarse/formulario-empadronamiento-sevilla", label: "Formulario de empadronamiento en Sevilla" },
        { href: "/empadronarse/formulario-empadronamiento-zaragoza", label: "Formulario de empadronamiento en Zaragoza" },
        { href: "/empadronarse/formulario-empadronamiento-malaga", label: "Formulario de empadronamiento en Málaga" },
        { href: "/elecciones/cambio-de-domicilio-y-censo", label: "Me he mudado: ¿dónde voto el 29-N?" },
      ],
    },
    {
      id: "cobertura",
      title: "Directorio de 769 municipios: cobertura parcial",
      paragraphs: [
        "Elige tu comunidad o ciudad autónoma para consultar sus directorios territoriales y localidades disponibles. Cada ficha indica qué información municipal se ha comprobado. Si tu municipio no aparece, utiliza directamente su web oficial.",
      ],
    },
    {
      id: "volante-resumen",
      title: "Volantes, certificados y contenido histórico",
      paragraphs: [
        "El volante informa y el certificado acredita fehacientemente. Histórico describe el periodo al que se refieren los datos. Comprueba el documento y la antigüedad que pide el destinatario; no hay una caducidad única para todos los usos.",
        "Para datos de otras personas, incluidos documentos colectivos o de menores, deben comprobarse representación, consentimiento u otra base legal aplicable. Compartir dirección no basta. Consulta la guía de volantes y certificados para distinguir los supuestos.",
      ],
      links: [{ href: "/empadronarse/volante-vs-certificado", label: "Documentos y condiciones de acceso a datos" }],
    },
    {
      id: "otros",
      title: "Relación con extranjería, sanidad, colegio, IMV, abono, Hacienda",
      paragraphs: [
        "Extranjería: consulta qué documento y periodo de residencia debes acreditar. El padrón no concede una autorización de residencia.",
        "Sanidad: consulta los requisitos de acceso y asignación del servicio de salud; el padrón no sustituye por sí solo esos trámites.",
        "Colegio: comprueba las normas de admisión y acreditación de domicilio. El padrón debe reflejar residencia real, no una dirección elegida para conseguir plaza.",
        "Ayudas: comprueba requisitos, unidad de convivencia y documentos en cada procedimiento. El alta no garantiza concesión.",
        "Transporte: consulta los requisitos del título y territorio; no extrapoles condiciones de una comunidad a otra.",
        "Hacienda: comunica el domicilio por el cauce fiscal que corresponda a tu situación; consulta la guía de mudanza.",
      ],
      links: [{ href: "/mudanza", label: "Trámites para comunicar una mudanza" }],
    },
    {
      id: "puede-no",
      title: "Qué puede y qué no puede exigir un ayuntamiento",
      paragraphs: [
        "El ayuntamiento puede comprobar identidad, representación y residencia efectiva, pedir los documentos pertinentes y contrastar datos por los medios previstos legalmente.",
        "En menores, guarda exclusiva y patria potestad no son equivalentes. Los anexos I y II solo proceden en los supuestos establecidos: una declaración genérica no sustituye siempre el consentimiento ni una resolución judicial. La guía de menores explica también las actuaciones desde los 16 años.",
        "El padrón no legaliza una ocupación ni decide un litigio sobre vivienda. La autorización de residencia o el cumplimiento de normas urbanísticas no son condiciones generales para registrar el hecho de vivir en un domicilio.",
      ],
    },
    {
      id: "errores",
      title: "Antes de presentar la solicitud",
      paragraphs: ["Comprueba que evitas estas confusiones:"],
      lists: [
        [
          "Empadronarte en la capital cuando el piso está en el municipio de al lado.",
          "Pedir cita en un clon de pago o en extranjería.",
          "Llevar solo el móvil con una foto del pasaporte.",
          "Autorización sin acreditar que quien la firma reúne las condiciones exigidas.",
          "Usar una declaración responsable de menores fuera de los supuestos previstos.",
          "Confundir volante y certificado.",
          "Pensar que el alta cambia el domicilio fiscal.",
          "Creer que sin TIE no hay padrón.",
          "Usar datos de atención de otro municipio.",
          "Confundir el coste de una gestión privada con una tasa municipal del alta.",
        ],
      ],
    },
    {
      id: "metodologia",
      title: "Cómo comprobar la información de tu municipio",
      paragraphs: [
        "Comprueba que el nombre, la provincia y la comunidad corresponden a tu domicilio. Si el buscador no incluye tu localidad, acude a su web municipal: el directorio no cubre todos los municipios de España.",
        "Revisa el estado de verificación y la fecha de la ficha. Los requisitos locales, horarios y canales de atención pueden cambiar; un dato pendiente de comprobación no debe interpretarse como una confirmación del ayuntamiento.",
        "Contrasta los documentos que necesitas con el procedimiento oficial. Si encuentras una diferencia, conserva el enlace de la sede y comunícala mediante la página de contacto para que podamos revisarla.",
      ],
    },
    {
      id: "fuentes",
      title: "Fuentes BOE e INE",
      paragraphs: [
        "Los artículos 15 y 16 de la Ley de Bases del Régimen Local y las instrucciones de gestión del padrón son las referencias nacionales. Para formularios, cita y oficinas, consulta además la sede de tu ayuntamiento.",
      ],
      links: [
        { label: "BOE: Ley 7/1985, padrón y residencia habitual", href: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392" },
        { label: "BOE: instrucciones de gestión del padrón de 2020, texto consolidado", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2020-4784" },
        { label: "INE: consultas de abril de 2026 sobre gestión padronal", href: "https://idapadron.ine.es/repositorio/legislacion/A290426.HTML" },
        { label: "BOE: RD 141/2024, datos de vivienda e implantación", href: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-2248" },
        { label: "Cómo verificamos las guías", href: "/metodologia" },
        { label: "Directorio de fuentes oficiales", href: "/fuentes" },
      ],
    },
    {
      id: "disclaimer",
      title: "Alcance de esta guía",
      paragraphs: [DISCLAIMER_SHORT],
    },
  ];

  // Practical sequence; avoid repeating the same law to reach a word count.
  const longLegal: PilarSection[] = [{
    id: "pasos-nacionales",
    title: "Cómo empadronarse, paso a paso",
    paragraphs: [
      "1. Localiza tu ayuntamiento. Busca el municipio de tu domicilio, no la capital de la provincia ni otra localidad cercana.",
      "2. Consulta la ficha y la sede oficial. Revisa la fecha, el estado de verificación y los canales disponibles para el alta o el cambio de domicilio.",
      "3. Elige la guía que corresponde a tu situación: contrato a tu nombre, vivienda de un familiar, ausencia de contrato, menores u otro supuesto. Comprueba los modelos municipales y prepara la documentación que indiquen.",
      "4. Presenta la solicitud por el canal previsto. Si necesitas cita, resérvala desde el portal oficial. Si utilizas la sede electrónica, conserva el justificante de presentación y sigue los avisos del expediente.",
      "5. Comprueba el resultado. Revisa nombre y domicilio, y solicita el volante o certificado que te hayan pedido para el siguiente trámite. Si falta un documento o hay una denegación, consulta el requerimiento y su plazo de respuesta.",
    ],
  }];

  const heading = "Cómo empadronarse en España: gratis, requisitos y pasos";
  return {
    editedAt: "2026-09-16",
    h1: heading,
    title: heading,
    description:
      "Empadronarse es gratis. Requisitos en España: documentos de identidad y de vivienda, pasos del alta y cómo encontrar la sede de tu ayuntamiento.",
    lead:
      "RutaTrámite te dice dónde y con qué papeles empadronarte en tu municipio. El trámite se hace en el ayuntamiento, no aquí. El alta es gratuita. No somos Administración.",
    sections: [...sections.slice(0, 1), ...longLegal, ...sections.slice(1)],
    faqs,
    escenarios: ESCENARIO_SLUGS.map((slug) => ({
      slug,
      label: ESCENARIO_LABELS[slug],
      href: escenarioPath(slug),
      blurb: escenarioBlurb[slug],
    })),
    disclaimer: DISCLAIMER_SHORT,
  };
}
