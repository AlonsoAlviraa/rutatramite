import { DISCLAIMER_SHORT, ESCENARIO_LABELS, ESCENARIO_SLUGS } from "@/lib/types";
import { escenarioPath } from "@/lib/geo/paths";

export type PilarFaq = { q: string; a: string };
export type PilarSection = { id: string; title: string; paragraphs: string[]; links?: { href: string; label: string }[]; lists?: string[][]; tables?: { headers: string[]; rows: string[][] }[] };

export function buildPilarModel() {
  const faqs: PilarFaq[] = [
    {
      q: "¿Qué es el padrón municipal y para qué sirve?",
      a: "Es el registro administrativo de los vecinos de un municipio. Prueba la residencia y el domicilio habitual. Las certificaciones tienen carácter de documento público (artículo 16.1 de la Ley 7/1985). En la práctica abre centro de salud, colegio, muchas ayudas, abono transporte en algunas comunidades y el certificado que pide extranjería. No es un permiso de residencia ni un título de propiedad.",
    },
    {
      q: "¿Quién está obligado a empadronarse?",
      a: "Toda persona que viva en España, en el municipio donde reside habitualmente (artículo 15 LBRL). Si vives en varios, en el que más tiempo pasas al año. La obligación no depende de tener TIE, contrato visado o vivienda 'en regla' urbanísticamente.",
    },
    {
      q: "¿Dónde se pide el alta?",
      a: "En el ayuntamiento del municipio donde está tu vivienda. Busca el nombre de tu localidad y comprueba la provincia antes de abrir la sede. Si vives en Móstoles, por ejemplo, el alta corresponde a Móstoles y no al municipio de Madrid.",
    },
    {
      q: "¿Cuánto cuesta el alta?",
      a: "Cero euros. El alta ordinaria es gratuita. Nadie puede cobrarte el padrón ni venderte la cita. El volante suele ser gratis. El certificado puede tener tasa si lo dice la ordenanza local; la ficha municipal solo la publica si está leída.",
    },
    {
      q: "¿Puedo empadronarme sin contrato de alquiler?",
      a: "Sí. Autorización del titular, comprobación de oficio o Servicios Sociales. El padrón registra un hecho, no un contrato. El escenario /empadronarse/sin-contrato lo desarrolla. Mentir en una autorización es delito.",
    },
    {
      q: "¿Puedo empadronarme si estoy irregular?",
      a: "Sí. La inscripción es independiente de la situación jurídico-administrativa. El ayuntamiento identifica (pasaporte, TIE, cédula, título de viaje, resguardo de protección internacional). No puede negar el alta por estar irregular. Así lo recuerdan las instrucciones INE.",
    },
    {
      q: "¿Hace falta TIE para el alta?",
      a: "No como requisito nacional. La TIE identifica a quien la tiene. Si no la tienes, el pasaporte u otro documento previsto por el INE. Esta web no afirma que el ayuntamiento pueda exigir TIE para el alta como norma.",
    },
    {
      q: "¿Qué diferencia hay entre volante, certificado e histórico?",
      a: "Volante: informativo, rápido. Certificado: documento público fehaciente. Histórico: movimientos y fechas, el que suele pedir un arraigo. No hay una caducidad legal única de tres meses para todo uso; quien te lo pide suele exigir fecha reciente.",
    },
    {
      q: "¿El padrón cambia el domicilio fiscal?",
      a: "No automáticamente. Hacienda va por modelo 030 u otros cauces. Empadronarte y comunicar el domicilio fiscal son trámites distintos. Cada año hay quien se enfada al hacer la renta.",
    },
    {
      q: "¿Tengo que darme de baja en el pueblo de origen?",
      a: "No como trámite previo. El alta nueva dispara la coordinación INE y la baja en origen. Si te mudas dentro del mismo municipio, es cambio de domicilio.",
    },
    {
      q: "¿Los no comunitarios tienen que renovar a los dos años?",
      a: "Sí, si no tienen autorización de residencia de larga duración o permanente. Si no renuevan, puede haber caducidad y baja. No es renovar la TIE. Escenario: /empadronarse/renovacion-2-anos.",
    },
    {
      q: "¿Cómo detecto un clon de cita?",
      a: "Accede al apartado de cita desde la web oficial de tu ayuntamiento. Un nombre parecido o un anuncio no acreditan que una página sea municipal. Comprueba el organismo y el procedimiento antes de introducir datos o reservar.",
    },
    {
      q: "¿Qué puede exigir el ayuntamiento y qué no?",
      a: "Puede identificar, pedir prueba razonable de vivienda, usar sus modelos, exigir cita, ofrecer Cl@ve, cruzar catastro, denegar un alta falsa. No puede cobrar el alta, filtrar irregulares, exigir que el contrato esté a nombre de todos, ni urbanismo como condición del hecho de residir.",
    },
    {
      q: "¿RutaTrámite es la Administración?",
      a: "No. Somos una guía ciudadana independiente. El trámite se hace en el ayuntamiento. No pedimos DNI, pasaporte ni fotos, ni vendemos citas. Los enlaces oficiales permiten continuar el trámite ante la administración competente.",
    },
    {
      q: "¿De dónde salen los datos de las 769 fichas?",
      a: "El directorio utiliza el catálogo de municipios y sus códigos INE. Cada ficha distingue la información municipal comprobada de los datos pendientes de revisión. Comprueba la fecha y el aviso de verificación antes de preparar la documentación o desplazarte.",
    },
  ];

  const escenarioBlurb: Record<string, string> = {
    "con-contrato": "Contrato a tu nombre, firmado. Recibo o duración mínima solo si esa sede lo publica. No es dogma INE.",
    "sin-contrato": "Autorización del titular, habitación, verbal. El padrón no exige un alquiler visado. Mentir en la autorización es delito.",
    propietario: "Escritura, nota simple o IBI. Referencia catastral cuando exista (art. 16 LBRL).",
    "casa-de-familiar": "Autorización del familiar titular o ya empadronado. Residencia real, no plaza escolar de favor.",
    menores: "Guarda, anexos INE, consentimiento del otro progenitor o resolución judicial. El ayuntamiento no inventa la custodia.",
    "extranjeros-ue": "Documento nacional o pasaporte UE/EEE/CH. El certificado de registro identifica, no filtra el alta.",
    "extranjeros-no-ue": "TIE o pasaporte. Irregularidad no bloquea el padrón. Renovación a 2 años si no hay larga duración.",
    "sin-hogar": "Servicios Sociales, domicilio de referencia, infravivienda. El registro no puede dejar a nadie fuera por no tener techo.",
    "volante-vs-certificado": "Volante informa, certificado hace fe, histórico cuenta el tiempo. Extranjería suele querer los dos últimos.",
    "renovacion-2-anos": "No comunitarios sin larga duración: cada dos años. No es la TIE. La baja por caducidad existe.",
    "cambio-de-domicilio": "Se pide en el ayuntamiento nuevo. La baja en origen la coordina el INE.",
    baja: "Baja por traslado, caducidad o inclusión indebida. No es un trámite de pago ni un 'castigo'.",
  };

  const sections: PilarSection[] = [
    {
      id: "respuesta",
      title: "La respuesta directa",
      paragraphs: [
        "El padrón municipal es el registro de vecinos. Quien vive en España debe inscribirse en el ayuntamiento del municipio donde reside habitualmente. El alta ordinaria cuesta 0 €. Se pide en tu ayuntamiento, no en esta web. RutaTrámite te dice dónde y con qué papeles; el trámite se hace en el consistorio. Identidad más prueba de uso de la vivienda. Estar irregular no impide el alta (artículo 15 de la Ley 7/1985 e instrucciones INE). No somos Administración Pública ni despacho de abogados.",
      ],
    },
    {
      id: "tramites",
      title: "Tabla de trámites",
      paragraphs: [
        "No mezcles botones. Cada fila es un procedimiento distinto, aunque a veces se pidan en la misma OAC.",
      ],
      tables: [
        {
          headers: ["Trámite", "Qué es", "Dónde"],
          rows: [
            ["Alta", "Inscripción como vecino. Gratuita.", "Ayuntamiento del domicilio"],
            ["Cambio de domicilio", "Mudanza dentro del mismo municipio o, en la práctica, el alta en destino.", "Ayuntamiento nuevo"],
            ["Volante", "Informativo, rápido.", "Sede, OAC, a veces 010 local"],
            ["Certificado", "Documento público fehaciente.", "Sede o secretaría"],
            ["Histórico", "Movimientos y fechas.", "Sede; útil para arraigo"],
            ["Renovación 2 años", "No comunitarios sin larga duración.", "Misma sede del alta"],
            ["Baja", "Traslado, caducidad, inclusión indebida.", "Coordinación INE / ayuntamiento"],
          ],
        },
      ],
    },
    {
      id: "identidad",
      title: "Documentos-marco de identidad",
      paragraphs: [
        "El documento sirve para identificar. No sirve para filtrar a quien está irregular. Tabla larga, todos los perfiles. Originales en presencial.",
      ],
      tables: [
        {
          headers: ["Perfil", "Documento"],
          rows: [
            ["Español mayor de 14", "DNI o pasaporte"],
            ["Español menor de 14", "Libro de familia o nacimiento; DNI si lo tiene"],
            ["UE / EEE / Suiza", "Pasaporte o documento nacional; certificado de registro si existe"],
            ["Resto con TIE", "TIE en vigor"],
            ["Resto sin TIE", "Pasaporte u otro previsto por el INE (cédula, título de viaje, resguardo de protección internacional, documentación de MENA mientras lo sea)"],
            ["Representante", "Ley 39/2015 art. 5: documentos de ambos"],
          ],
        },
      ],
    },
    {
      id: "vivienda",
      title: "Documentos-marco de vivienda (cinco vías)",
      paragraphs: [
        "El ayuntamiento puede comprobar que la vivienda existe y que la persona reside. Comprobar no es exigir un contrato de seis meses ante notario.",
      ],
      tables: [
        {
          headers: ["Vía", "Qué"],
          rows: [
            ["Propietario", "Escritura, nota simple, IBI, referencia catastral cuando exista"],
            ["Alquiler a nombre", "Contrato completo firmado. Recibo o duración mínima: peculiaridad local, no dogma INE"],
            ["Habitación", "Autorización del titular + su documento + prueba de ocupación del titular"],
            ["Familiar", "Autorización del familiar titular o empadronado"],
            ["Sin papeles / sin techo", "Autorización, oficio o Servicios Sociales. No hay truco de factura de la luz a escala nacional"],
          ],
        },
      ],
    },
    {
      id: "municipio-real",
      title: "Cómo saber tu municipio real (Móstoles no es Madrid)",
      paragraphs: [
        "España tiene 8.132 municipios (relación INE). El padrón es de término municipal, no de área metropolitana, no de provincia, no de 'yo vivo en Madrid' cuando el portal dice Móstoles, Getafe, Cornellà o Hospitalet. El error número uno retrasa el alta y, a veces, escolariza al niño en el distrito equivocado.",
        "El directorio contiene 769 municipios del catálogo disponible. Escribe el nombre en el buscador y comprueba la provincia y la comunidad, especialmente si existen localidades con nombres iguales o parecidos. La cobertura es parcial.",
        "Getafe no hereda el teléfono de Leganés. Barcelona no empadrona a quien vive en L'Hospitalet. Valencia ciudad no es l'Eliana. La ficha de cada municipio lo dice en la primera frase: canal, órgano, fecha de verificación.",
      ],
    },
    {
      id: "cita",
      title: "Cómo pedir cita y detectar un clon",
      paragraphs: [
        "La cita, cuando existe, se pide en el dominio del ayuntamiento. Hosts típicos: sede.*, seuelectronica, ayto, .gob.es municipales, .cat, .gal, .eus. No en un anuncio que cobra 40 € por 'hueco mañana'. No en un 807. No en un WhatsApp de gestor con enchufe.",
        "Abre la sede desde la ficha de tu municipio y busca el procedimiento de padrón. Si falta el enlace de cita o la ficha indica que está pendiente de revisión, consulta directamente al ayuntamiento. La disponibilidad de una oficina no sirve para otro municipio.",
        "Antes de reservar, comprueba cuántas personas admite cada cita y qué oficina puede atenderte. Si no encuentras hueco, consulta las alternativas que publique tu ayuntamiento y evita reservar en otro municipio por proximidad.",
      ],
    },
    {
      id: "clave",
      title: "Online con Cl@ve: qué esperar, qué no",
      paragraphs: [
        "Cl@ve, certificado electrónico o DNIe identifican al solicitante en muchas sedes. Adjunta PDFs nítidos: contrato entero, autorización firmada, DNI de ambas caras si lo piden. Guarda el justificante de registro. Eso no es el volante todavía.",
        "Qué no esperar: que 'te lo aprueben en 24 h' como eslogan. Que una instancia genérica de registro sea un trámite de padrón específico. Que Cl@ve sustituya la comprobación de la vivienda. Que el alta online cambie tu domicilio fiscal.",
        "Si no puedes completar la solicitud electrónica, consulta el canal presencial y la ayuda que ofrezca la sede. Una ficha pendiente de verificación no confirma los horarios ni la disponibilidad de un trámite por internet.",
      ],
    },
    {
      id: "escenarios",
      title: "Los 12 escenarios",
      paragraphs: [
        "Cada escenario es una guía nacional de más de dos mil palabras. La ficha municipal no la copia: enlaza y añade el canal local. Elige la tuya y vuelve al buscador.",
      ],
    },
    {
      id: "cobertura",
      title: "Mapa de cobertura: 769 municipios ≥10.000",
      paragraphs: [
        "Elige tu comunidad o ciudad autónoma para consultar sus directorios territoriales y localidades disponibles. Cada ficha indica qué información municipal se ha comprobado. Si tu municipio no aparece, utiliza directamente su web oficial.",
      ],
    },
    {
      id: "volante-resumen",
      title: "Volante frente a certificado frente a histórico",
      paragraphs: [
        "El volante informa. El certificado hace fe. El histórico cuenta el tiempo. Extranjería, notarios y algunas becas quieren certificado o histórico reciente. El colegio y el centro de salud a menudo se conforman con volante. No hay una caducidad legal única. Desarrollado en /empadronarse/volante-vs-certificado.",
      ],
    },
    {
      id: "otros",
      title: "Relación con extranjería, sanidad, colegio, IMV, abono, Hacienda",
      paragraphs: [
        "Extranjería: certificado o histórico, no siempre el volante. El padrón no concede la TIE.",
        "Sanidad: el centro de salud se asigna por domicilio padronal en la mayoría de comunidades.",
        "Colegio: el distrito escolar mira el padrón. Empadronar al niño en casa de la abuela 'por la plaza' es un uso frecuente y un riesgo de comprobación.",
        "IMV y ayudas: muchas piden padrón reciente. Lee la convocatoria, no esta frase como si fuera la ley de la ayuda.",
        "Abono transporte: en 2026 la Comunidad de Madrid ha vinculado títulos bonificados al padrón. No copies ese modelo a Barcelona, Valencia, Bilbao o Sevilla.",
        "Hacienda: modelo 030. Empadronarse no mueve solo el domicilio fiscal.",
      ],
    },
    {
      id: "puede-no",
      title: "Qué puede y qué no puede exigir un ayuntamiento",
      paragraphs: [
        "Puede: identificar; pedir prueba razonable de que vives en una vivienda del término; usar sus modelos; exigir cita; ofrecer canal electrónico; cruzar catastro; denegar un alta manifiestamente falsa.",
        "No puede: convertir el padrón en permiso de residencia; cobrar el alta ordinaria; exigir que el contrato esté visado 'porque sí' si resides; rechazar a un menor cuando cabe declaración responsable; inventar tasas sobre el volante si su ordenanza no existe; exigir autorización de residencia como requisito de alta; exigir que el contrato esté a nombre de todos; exigir que la vivienda cumpla normas urbanísticas para inscribir el hecho de la residencia.",
        "Empadronarse no legaliza una ocupación. No crea título civil. Hay que decirlo para no alimentar el bulo. Si una sede local se pasa de frenada, la ficha lo describe como práctica local y enlaza la norma estatal. No blanqueamos. No llamamos a juicio al funcionario en la landing.",
      ],
    },
    {
      id: "errores",
      title: "Errores nacionales más caros",
      paragraphs: ["Los que más retrasan, en cualquier provincia:"],
      lists: [
        [
          "Empadronarte en la capital cuando el piso está en el municipio de al lado.",
          "Pedir cita en un clon de pago o en extranjería.",
          "Llevar solo el móvil con una foto del pasaporte.",
          "Autorización genérica sin dirección ni DNI del titular.",
          "Menor sin consentimiento o anexo INE.",
          "Confundir volante y certificado.",
          "Pensar que el alta cambia el domicilio fiscal.",
          "Creer que sin TIE no hay padrón.",
          "Copiar el teléfono de Getafe en la ficha de Leganés — aquí no se hace.",
          "Pagar a alguien por un trámite gratuito.",
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
        { label: "INE: información sobre el padrón municipal", href: "https://idapadron.ine.es/" },
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

  return {
    editedAt: "2026-09-14",
    h1: "Empadronarse en España: documentos y pasos",
    title: "Requisitos para empadronarse: documentos, pasos y cita 2026",
    description:
      "Qué necesitas para empadronarte en España: documentos de identidad y vivienda, pasos del alta y cómo encontrar la sede de tu ayuntamiento.",
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
