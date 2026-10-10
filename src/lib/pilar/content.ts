import { DISCLAIMER_SHORT, ESCENARIO_LABELS, ESCENARIO_SLUGS, PRODUCT_NAME } from "@/lib/types";
import { escenarioPath } from "@/lib/geo/paths";

export type PilarFaq = { q: string; a: string };
export type PilarSection = { id: string; title: string; paragraphs: string[]; lists?: string[][]; tables?: { headers: string[]; rows: string[][] }[] };

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
      a: "En el ayuntamiento del término donde está la vivienda. No en Policía, no en extranjería, no en el 060, no en RutaTrámite. Si vives en Móstoles, no te empadronas en Madrid. El buscador de este site cruza el índice INE.",
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
      a: "La cita se pide en el dominio del ayuntamiento (sede.*, ayto*, .gob.es municipales, .cat, .gal, .eus). No en un 807, no en un anuncio que cobra por 'hueco mañana'. Si esta ficha no tiene cita_url, no inventamos el enlace.",
    },
    {
      q: "¿Qué puede exigir el ayuntamiento y qué no?",
      a: "Puede identificar, pedir prueba razonable de vivienda, usar sus modelos, exigir cita, ofrecer Cl@ve, cruzar catastro, denegar un alta falsa. No puede cobrar el alta, filtrar irregulares, exigir que el contrato esté a nombre de todos, ni urbanismo como condición del hecho de residir.",
    },
    {
      q: "¿RutaTrámite es la Administración?",
      a: "No. Somos una guía ciudadana independiente. El trámite se hace en el ayuntamiento. No pedimos DNI, pasaporte ni fotos. No vendemos citas. Paleta propia: no imitamos sede.gob.es, Policía ni 060.",
    },
    {
      q: "¿De dónde salen los datos de las 769 fichas?",
      a: "Catálogo de municipios ≥10.000 habitantes (población pública 1-ene-2025), códigos INE, sedes leídas cuando el GET a la web municipal funciona, y el marco legal estatal. Si no hay sede leída, la ficha es larga pero lleva badge de no verificada y no inventa teléfono.",
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
        "Este site cubre los 769 municipios de 10.000 habitantes o más del catálogo (población pública a 1 de enero de 2025). Escribe el nombre en el buscador. El código INE de cinco dígitos es el identificador estable. Si dos pueblos se llaman igual, la URL lleva siempre la provincia y la comunidad.",
        "Getafe no hereda el teléfono de Leganés. Barcelona no empadrona a quien vive en L'Hospitalet. Valencia ciudad no es l'Eliana. La ficha de cada municipio lo dice en la primera frase: canal, órgano, fecha de verificación.",
      ],
    },
    {
      id: "cita",
      title: "Cómo pedir cita y detectar un clon",
      paragraphs: [
        "La cita, cuando existe, se pide en el dominio del ayuntamiento. Hosts típicos: sede.*, seuelectronica, ayto, .gob.es municipales, .cat, .gal, .eus. No en un anuncio que cobra 40 € por 'hueco mañana'. No en un 807. No en un WhatsApp de gestor con enchufe.",
        "RutaTrámite solo muestra botón de cita si el JSON del municipio tiene cita_url verificada. Si no está, no la inventamos. Madrid, por ejemplo, publica citaprevia en madrid.es; esa URL está en la ficha porque sale del sample oficial del pack y de la sede. El pueblo de al lado no reutiliza ese enlace.",
        "Una cita, un domicilio, a menudo una persona o una unidad convivencial. En grandes ciudades (oleada A, 67 municipios ≥100.000) el cuello de botella es la saturación. Prueba juntas de distrito del mismo término, no el municipio vecino.",
      ],
    },
    {
      id: "clave",
      title: "Online con Cl@ve: qué esperar, qué no",
      paragraphs: [
        "Cl@ve, certificado electrónico o DNIe identifican al solicitante en muchas sedes. Adjunta PDFs nítidos: contrato entero, autorización firmada, DNI de ambas caras si lo piden. Guarda el justificante de registro. Eso no es el volante todavía.",
        "Qué no esperar: que 'te lo aprueben en 24 h' como eslogan. Que una instancia genérica de registro sea un trámite de padrón específico. Que Cl@ve sustituya la comprobación de la vivienda. Que el alta online cambie tu domicilio fiscal.",
        "Si la sede es un laberinto, el canal presencial sigue existiendo. Si robots.txt bloquea a un bot de verificación, la ficha queda como no verificada: badge visible, sin teléfono inventado.",
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
        "Oleada A: 67 ciudades de 100.000 habitantes o más. Ficha de 1.800 palabras o más, sede leída cuando el GET a la web municipal responde, JSON-LD HowTo + FAQPage + GovernmentService (el proveedor es el ayuntamiento, no RutaTrámite).",
        "Oleada B: 84 municipios de 50.000 a 99.999. Oleadas C y D: 272 + 346. Todas las fichas indexables del catálogo tienen plantilla larga (≥1.200 palabras visibles). Unverified permitido; thin de 300 palabras, no. Municipios de menos de 10.000 no se publican como landings indexables en esta versión.",
        "Hay hub por cada comunidad autónoma y por cada provincia (más Ceuta y Melilla). Cada hub lista todos los municipios ≥10k del catálogo en ese territorio. El pilar enlaza las 17 comunidades. Las URLs geo son /empadronarse/{ccaa}/{provincia}/{municipio}.",
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
      title: "Metodología de datos",
      paragraphs: [
        "Los municipios salen del INE y del catálogo del pack (769 filas ≥10.000 habitantes a 1-ene-2025). Los códigos de cinco dígitos se reconcilian con CodeForSpain. Los nombres en forma castellana antigua (Hospitalet, La Coruña, Fuenterrabía) se resuelven a la forma oficial (L'Hospitalet de Llobregat, A Coruña, Hondarribia) sin inventar el ente.",
        "Las URLs de sede de oleada A se toman de la web oficial del municipio (Wikidata P856 u origen de pack) y se comprueban con GET e User-Agent identificable RutaTramiteBot/0.1. Si el GET falla o robots bloquea, no se inventa el enlace ni el teléfono. Badge de no verificada. Madrid usa el sample del pack (sede.madrid.es y cita en madrid.es).",
        "Git es la fuente de verdad. JSON por municipio, Ajv contra municipio.schema.json, tasa_alta siempre 0, source_urls ≥ 1. Detalle en /metodologia y /fuentes.",
      ],
    },
    {
      id: "fuentes",
      title: "Fuentes BOE e INE",
      paragraphs: [
        "Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local: https://www.boe.es/buscar/act.php?id=BOE-A-1985-5392",
        "Instrucciones técnicas a los ayuntamientos, Resolución de 30 de enero de 2015: https://www.boe.es/buscar/doc.php?id=BOE-A-2015-3109",
        "Resolución de 17 de febrero de 2020 (BOE-A-2020-4784) y consolidado posterior.",
        "Repositorio de modelos INE: https://idapadron.ine.es/",
        "Relación de municipios INE: https://www.ine.es/dyngs/INEbase/operacion.htm?c=Estadistica_C&cid=1254736177031",
        "RD 1690/1986 (población y padrón). Cifras 1-ene-2025 (RD 1117/2025, BOE-A-2025-25362) a contrastar en ine.es.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer",
      paragraphs: [DISCLAIMER_SHORT],
    },
  ];

  // Expand FAQs to ~100 words each for the 3000-word floor, and add long-form legal narrative.
  const longLegal: PilarSection[] = [
    {
      id: "pasos-nacionales",
      title: "Cómo se hace, paso a paso (versión nacional)",
      paragraphs: [
        "Uno. Identifica el municipio real. El buscador de esta web cruza el índice de 769 municipios ≥10.000 habitantes y el código INE de cinco dígitos. Vivir «en Madrid» cuando el contrato dice Móstoles, Getafe, Leganés, Parla o Rivas es el error número uno. Lo mismo en el área de Barcelona (L'Hospitalet, Badalona, Cornellà) o en l'Horta de València. El padrón es de término municipal.",
        "Dos. Abre la ficha de ese municipio. Mira sede_url, cita_previa, online y last_verified. Si hay badge de no verificada, el marco estatal sigue valiendo y el teléfono no se inventa. La primera frase nombra canal, órgano y fecha: es la frase pensada para que un modelo de lenguaje cite sin alucinar.",
        "Tres. Elige escenario. Contrato a tu nombre, autorización, propietario, familiar, menores, UE, no UE, sin hogar, volante, certificado, renovación a dos años, cambio de domicilio o baja. Cada guía nacional supera las dos mil palabras. La ficha local no las copia.",
        "Cuatro. Si hay canal electrónico y tienes Cl@ve, certificado o DNIe, úsalo. Adjunta PDFs legibles: contrato entero, autorización con dirección y documento del titular, identidad. Guarda el justificante de registro. Eso aún no es el volante.",
        "Cinco. Si es presencial, pide cita en la URL municipal. No en un clon 807. No pagues la cita. Una cita, un domicilio. En oleada A prueba oficinas de distrito del mismo término, no el pueblo de al lado.",
        "Seis. Lleva originales y fotocopias. En muchas OAC no hay fotocopiadora. El móvil con una foto del pasaporte no basta. Firman los mayores de edad que se inscriben.",
        "Siete. Si el escenario es sin contrato, lleva la autorización del titular y al titular o su documentación bastante. Pregunta en la ficha si el titular debe acudir. Un papel de tres líneas en el bar no es un modelo municipal.",
        "Ocho. Al salir, pide volante. Pregunta cómo se pide el certificado si lo necesitas para extranjería. Revisa nombre, documento y dirección. Un error de letra persigue el censo electoral y el histórico.",
        "Nueve. Si te lo deniegan, pide el motivo por escrito. Contrasta con el artículo 15 y con el escenario. Recurso o nueva cita con el papel que faltaba. No pagues a un gestor que «tiene enchufe».",
        "Diez. Si te has mudado de verdad, comunica también el domicilio fiscal (modelo 030). El padrón no lo hace por ti. Si eres no comunitario sin larga duración, anota la renovación a los dos años.",
        "Once. Menores: anexos INE, consentimiento o resolución. Representación: Ley 39/2015 artículo 5. Sin techo: Servicios Sociales. Violencia de género: domicilio que indiquen SS.SS. Infravivienda: puede ser domicilio a efectos de padrón.",
        "Doce. Contrasta siempre la sede. Esta guía se desactualiza. La sede gana para el cómo; la ley gana para el quién tiene derecho. RutaTrámite no presenta escritos por ti.",
      ],
    },
    {
      id: "ley-larga",
      title: "El marco legal, sin recitar el BOE entero en cada pueblo",
      paragraphs: [
        "El artículo 15 de la Ley 7/1985 dice que toda persona que viva en España está obligada a inscribirse en el Padrón del municipio en el que resida habitualmente. Quien viva en varios municipios debe inscribirse en aquel en el que habite durante más tiempo al año. El que se traslada solicita la baja; en la práctica, el alta nueva dispara la coordinación INE y la baja en origen. La frase crítica para este producto: la inscripción padronal es independiente de la situación jurídico-administrativa de la persona en España.",
        "El artículo 16 detalla los datos obligatorios: nombre y apellidos, sexo, domicilio habitual con referencia catastral cuando exista (o código equivalente en territorio foral), nacionalidad, lugar y fecha de nacimiento, número de DNI o, en extranjeros, el que corresponda (NIE, TIE, pasaporte, documento del país en UE/EEE/Suiza), título escolar o académico, y los datos precisos para el censo electoral. La referencia catastral no es un capricho de Valencia o Madrid: está en el 16.2.c vigente.",
        "La inscripción de extranjeros no comunitarios sin autorización de residencia de larga duración o permanente se renueva cada dos años. Si no, puede declararse la caducidad y la baja. El Real Decreto 1690/1986 desarrolla población y padrón: gestión, comprobación, control, altas por omisión, bajas, coordinación con el INE. El ayuntamiento puede comprobar que la vivienda existe y que la persona reside. Algunas sedes se pasan de frenada. Otras aplican el padrón de forma laxa. La ficha describe lo que la sede publica.",
        "La Resolución de 30 de enero de 2015 (BOE-A-2015-3109) y la línea 2020 (BOE-A-2020-4784) dictan instrucciones técnicas. Identidad: español mayor de 14, DNI; menor, libro de familia o nacimiento; UE, pasaporte o documento nacional; resto, TIE o pasaporte; alternativos previstos. Vivienda: escritura, nota simple, IBI, contrato, autorización del titular, informe de servicios sociales. Facturas de suministro: solo si esa sede lo dice. Menores: consentimiento, resolución o declaración responsable. Representación: Ley 39/2015 artículo 5. Sin techo: el empadronamiento no puede quedar bloqueado porque la persona no tenga contrato.",
        "El volante es informativo. El certificado es documento público. El histórico acredita movimientos. No existe una caducidad legal única de tres meses para todo uso. Empadronarse no cambia por arte de magia el domicilio fiscal en la AEAT. El padrón tampoco es la TIE, ni el NIE, ni la tarjeta sanitaria, ni el censo electoral en sentido estricto, aunque alimenta el censo.",
        "Infravivienda y sin techo: chabola, caravana, cueva o ausencia total de techo pueden ser domicilio. Si no hay dirección a la que notificar, Servicios Sociales fija una con referencia al callejero. Violencia de género: se puede inscribir en la dirección que indiquen SS.SS. por seguridad. Baja previa en origen: no es requisito. Empadronarse no crea título civil de ocupación: hay que decirlo para no alimentar el bulo de que el padrón legaliza una okupación.",
        `${PRODUCT_NAME} cita estas normas. No improvisa doctrina. No convierte un rumor de oficina en norma estatal. Si una sede municipal contradice este marco en un requisito de canal (cita, Cl@ve, modelo propio), gana la sede para el cómo y gana la ley para el quién tiene derecho.`,
      ],
    },
  ];

  const heading = "Cómo empadronarse en España: gratis, requisitos y pasos";
  return {
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
