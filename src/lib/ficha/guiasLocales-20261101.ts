/**
 * Guías locales de padrón (lote de calidad 01-11-2026).
 * Solo datos leídos el 01-11-2026 en la fuente oficial enlazada (respuesta HTTP 200 con curl).
 * Madrid queda fuera: sus sedes devolvieron 403 a la comprobación automática ese día.
 */
export type GuiaLocal = {
  reviewedOn: string;
  intro: string[];
  ejemplo: { titulo: string; pasos: string[] };
  datos: [string, string, string][];
  faqs: { q: string; a: string }[];
  enlaces: { href: string; label: string }[];
};

const BCN_T135 = "https://seuelectronica.ajuntament.barcelona.cat/APPS/portaltramits/es/ciudadano/descripcio/T135i/PTCIU.html";
const BCN_IW = "https://www.barcelona.cat/internationalwelcome/ca/tramit/alta-al-padro-dhabitants-de-barcelona";
const SVQ_DOC = "https://www.sevilla.org/servicios/empadronamiento/informacion-cambio-en-el-padron-de-habitantes-de-sevilla";
const SVQ_MED = "https://www.sevilla.org/servicios/empadronamiento/informacion-empadronamiento/medios-de-empadronamiento";
const ZGZ_3317 = "https://www.zaragoza.es/sede/servicio/tramite/3317";
const ZGZ_M005 = "https://www.zaragoza.es/contenidos/tramites/impresos/Padron-M005.pdf";
const MLG_SEDE = "https://sede.malaga.eu/es/tramitacion/detalle-del-tramite/index.html?id=112";
const MLG_DOC = "https://gestrisam.malaga.eu/export/sites/gestrisam/.galleries/Documentos-General/Documentacion-necesaria-17062026_1.pdf";
const VLC_PA = "https://sede.valencia.es/sede/registro/procedimiento/PA.GP.11?lang=1";
const ALC = "https://www.alicante.es/es/tramites/altas-y-cambios-domicilio-padron-municipal-habitantes";
const MUR_3662 = "https://sede.murcia.es/ficha-procedimiento/3662";
const MUR_PDF = "https://sede.murcia.es/sites/default/files/doctramites/doc4901DC.pdf";
const PMI_02 = "https://seuelectronica.palma.cat/es/-/poblaci%C3%B3n.02-alta-en-el-padr%C3%B3n-municipal-de-habitantes-para-personas-procedentes-de-otros-municipios-o-del-extranjero";
const PMI_HOJA = "https://seuelectronica.palma.cat/documents/39058/14038318/Hoja+informativa+sobre+el+empadronamiento+en+Palma.pdf/fab8369c-32b1-1ccc-ecd2-3eaf90cf94cd?t=1740485495586";

const host = (u: string) => new URL(u).hostname;

export const GUIAS_LOCALES: Record<string, GuiaLocal> = {
  "08019": {
    reviewedOn: "2026-11-01",
    intro: [
      "En Barcelona el punto que más solicitudes frena es la duración del alquiler: la ficha T135i del Ajuntament exige que el contrato dure más de 3 meses o que la prórroga conste por escrito. Un contrato de temporada de 2 meses no sirve por sí solo.",
      "Cuando el contrato está prorrogado, es indefinido, está escaneado o firmado electrónicamente, el Ajuntament pide además una factura de suministro de los últimos 3 meses con la misma dirección codificada. Las facturas de móvil o de internet no cuentan.",
    ],
    ejemplo: {
      titulo: "Caso resuelto: habitación en Gràcia con contrato prorrogado",
      pasos: [
        "Situación: Laura alquila una habitación desde 2024; el contrato inicial era de 11 meses y se ha ido prorrogando sin papel nuevo.",
        "Problema: el contrato original ya venció, así que por sí solo no acredita la residencia actual.",
        "Qué aporta: el contrato, un documento firmado por la arrendadora que recoge la prórroga y una factura de agua, luz o gas de los últimos 3 meses con la misma dirección (calle, número, piso y puerta).",
        "Si la factura está a nombre de otra persona del piso, añade la autorización de quien tiene el título de la vivienda. La autorización vale 3 meses desde su firma.",
        "Canal: por internet, el Ajuntament indica que la confirmación llega en unos 7 días naturales.",
      ],
    },
    datos: [
      ["Duración mínima del alquiler", "Más de 3 meses, o prórroga expresa", host(BCN_T135)],
      ["Factura adicional", "Suministro de los últimos 3 meses si el contrato está prorrogado, es indefinido, escaneado o con firma electrónica; no valen móvil ni internet", host(BCN_T135)],
      ["Validez de la autorización o delegación", "3 meses", host(BCN_T135)],
      ["Respuesta por internet", "Unos 7 días naturales", host(BCN_T135)],
      ["Domicilios colectivos", "Hay autorización específica para residencias y similares", host(BCN_T135)],
    ],
    faqs: [
      { q: "¿Me sirve un contrato de 2 meses para empadronarme en Barcelona?", a: "Por sí solo, no: la ficha T135i pide un alquiler de más de 3 meses o una prórroga explícita. Si convives con quien tiene un contrato válido, la vía es su autorización." },
      { q: "¿Vale la factura de la fibra como justificante en Barcelona?", a: "No. El Ajuntament acepta facturas de suministros de la vivienda (agua, luz, gas) de los últimos 3 meses; excluye expresamente telefonía móvil e internet." },
    ],
    enlaces: [
      { href: "/empadronarse/formulario-empadronamiento-barcelona", label: "Formulario de empadronamiento de Barcelona" },
      { href: "/elecciones/mesa-electoral-barcelona", label: "Dónde voto en Barcelona el 29-N" },
      { href: BCN_T135, label: "Ficha oficial T135i (sede del Ajuntament)" },
      { href: BCN_IW, label: "Barcelona International Welcome: alta al padró" },
    ],
  },
  "41091": {
    reviewedOn: "2026-11-01",
    intro: [
      "Sevilla tiene dos exigencias que no se ven en la mayoría de ciudades: la referencia catastral es obligatoria en la hoja padronal y, como factura de suministro, solo admite la de agua de EMASESA. Las de luz o gas no valen para este fin.",
      "Si eres propietario no hace falta llevar la escritura: con la referencia catastral basta. Si alquilas, el Ayuntamiento pide además el último recibo de la renta.",
    ],
    ejemplo: {
      titulo: "Caso resuelto: pareja que alquila en Triana y lo pide por internet",
      pasos: [
        "Situación: dos adultos con contrato de alquiler a nombre de ambos; quieren hacerlo por la vía telemática.",
        "Requisito de firma: en la vía telemática, cada solicitante mayor de edad necesita firma digital. Si uno no la tiene, la alternativa es la presencial.",
        "Documentos: hoja con la referencia catastral de la vivienda (sale en el recibo del IBI o en la Sede del Catastro), contrato y último recibo del alquiler.",
        "Si el contrato está firmado electrónicamente, añade también el título del arrendador, salvo que esté visado por la Junta de Andalucía.",
        "Firmas: firman la hoja todas las personas mayores de 16 años que se inscriben.",
      ],
    },
    datos: [
      ["Referencia catastral", "Obligatoria en la hoja padronal", host(SVQ_DOC)],
      ["Factura de suministro admitida", "Solo agua de EMASESA", host(SVQ_DOC)],
      ["Propietarios", "Basta la referencia catastral; no hace falta escritura", host(SVQ_DOC)],
      ["Alquiler", "Contrato y último recibo del alquiler", host(SVQ_DOC)],
      ["Vía telemática", "Firma digital de cada solicitante y autorizante mayor de edad", host(SVQ_MED)],
      ["Menores", "Hasta 14 años, libro de familia o certificado de nacimiento; de 14 a 18, además DNI", host(SVQ_DOC)],
    ],
    faqs: [
      { q: "¿Me vale la factura de la luz para empadronarme en Sevilla?", a: "No como factura de suministro: el Ayuntamiento solo acepta la de agua de EMASESA. Si alquilas, lo que acredita la vivienda es el contrato con el último recibo." },
      { q: "¿Dónde encuentro la referencia catastral que pide Sevilla?", a: "En el recibo del IBI, en la escritura o en la Sede Electrónica del Catastro buscando la dirección. Sin ella la hoja padronal se considera incompleta." },
      { q: "¿Quién firma si el que me autoriza no vive en el piso?", a: "Si el autorizante está empadronado en la vivienda, firma en la casilla de la hoja. Si no lo está, aporta un documento de cesión de uso con su identificación y el título de la vivienda." },
    ],
    enlaces: [
      { href: "/empadronarse/formulario-empadronamiento-sevilla", label: "Formulario de empadronamiento de Sevilla" },
      { href: SVQ_DOC, label: "Ayuntamiento de Sevilla: documentación para el padrón" },
      { href: SVQ_MED, label: "Ayuntamiento de Sevilla: medios de empadronamiento" },
    ],
  },
  "50297": {
    reviewedOn: "2026-11-01",
    intro: [
      "En Zaragoza el alta en el padrón es presencial obligatoriamente: por internet, con certificado o Cl@ve, solo se tramita el cambio de domicilio de quien ya está empadronado en la ciudad.",
      "La Oficina de Relaciones con los Ciudadanos (plaza del Pilar 18) atiende sin cita; en las Juntas Municipales y Vecinales hay atención sin cita de 9:30 a 13:30 y con cita de 8:30 a 9:30. Lleva original y copia de cada documento.",
    ],
    ejemplo: {
      titulo: "Caso resuelto: llegas de Huesca un jueves por la tarde",
      pasos: [
        "Situación: te has mudado a Zaragoza para vivir aquí la mayor parte del año (es el requisito que fija el Ayuntamiento).",
        "Dónde: la Oficina de Relaciones con los Ciudadanos abre por la tarde, de 16 a 19 h, los lunes, los jueves y el primer y último viernes de cada mes; en julio y agosto, solo mañanas.",
        "Qué llevas: hoja padronal, documento de identidad y la acreditación de la vivienda, todo en original y copia.",
        "Si vives con alguien que ya está empadronado, usa el modelo de autorización del Ayuntamiento (impreso M005: autorización para inscribirse en el domicilio de otra persona).",
        "Después: el Ayuntamiento puede comprobar durante 3 meses que realmente vives en ese domicilio.",
      ],
    },
    datos: [
      ["Canal del alta", "Solo presencial", host(ZGZ_3317)],
      ["Oficina de Relaciones con los Ciudadanos", "Plaza del Pilar 18; lunes a viernes 8:30-14:00, sin cita", host(ZGZ_3317)],
      ["Tardes", "16:00-19:00 lunes, jueves y primer y último viernes del mes; julio y agosto solo mañanas", host(ZGZ_3317)],
      ["Juntas Municipales y Vecinales", "Sin cita 9:30-13:30; con cita 8:30-9:30", host(ZGZ_3317)],
      ["Impresos", "M001 a M005; el M005 es la autorización para empadronarse en el domicilio de otra persona", host(ZGZ_M005)],
      ["Recién nacidos", "Alta de oficio cuando llegan los datos del Registro Civil a través del INE", host(ZGZ_3317)],
      ["Extranjeros no UE sin residencia permanente", "Renovación antes de 2 años; si no, baja por caducidad", host(ZGZ_3317)],
    ],
    faqs: [
      { q: "¿Puedo darme de alta en el padrón de Zaragoza por internet?", a: "No. El alta es presencial. Por internet, con certificado o Cl@ve, solo se puede comunicar un cambio de domicilio dentro de la ciudad." },
      { q: "¿Necesito cita para empadronarme en Zaragoza?", a: "En la Oficina de Relaciones con los Ciudadanos de la plaza del Pilar, no. En las Juntas Municipales y Vecinales hay una franja con cita (8:30-9:30) y otra sin ella (9:30-13:30)." },
      { q: "¿Tengo que empadronar a mi bebé en Zaragoza?", a: "En la mayoría de los casos no hace falta: el Ayuntamiento hace el alta de oficio cuando recibe los datos del Registro Civil a través del INE. Puedes pedirla tú si necesitas un certificado con urgencia." },
    ],
    enlaces: [
      { href: "/empadronarse/formulario-empadronamiento-zaragoza", label: "Formulario de empadronamiento de Zaragoza" },
      { href: "/elecciones/mesa-electoral-zaragoza", label: "Dónde voto en Zaragoza el 29-N" },
      { href: ZGZ_3317, label: "Ayuntamiento de Zaragoza: trámite 3317" },
      { href: ZGZ_M005, label: "Impreso M005 (PDF oficial)" },
    ],
  },
  "29067": {
    reviewedOn: "2026-11-01",
    intro: [
      "En Málaga el padrón lo gestiona GESTRISAM, el organismo de gestión tributaria municipal (Edificio Tabacalera, avenida Sor Teresa Prat 17; teléfono 951 929 292). Su hoja de documentación, fechada en junio de 2026, es la referencia para preparar la visita.",
      "La particularidad malagueña está en el alquiler: además del contrato vigente, hay que llevar el último recibo, un contrato o factura reciente de luz, agua o gas de esa vivienda y copia del documento de identidad del arrendador (o el CIF si es una empresa).",
    ],
    ejemplo: {
      titulo: "Caso resuelto: alquiler en Teatinos a través de una inmobiliaria",
      pasos: [
        "Situación: contrato gestionado por una agencia; el propietario es una sociedad.",
        "Lo que pide GESTRISAM: contrato vigente, último recibo de la renta y una factura reciente de suministro de la vivienda, a nombre del arrendador o del inquilino.",
        "Identidad del arrendador: como es una sociedad, copia de su CIF (si fuera una persona, su documento de identidad en vigor).",
        "Si además se empadrona un menor con un solo progenitor, hace falta el consentimiento del otro con copia de su documento, o una resolución judicial.",
      ],
    },
    datos: [
      ["Organismo", "GESTRISAM, Edificio Tabacalera, av. Sor Teresa Prat 17; 951 929 292", host(MLG_DOC)],
      ["Alquiler", "Contrato vigente + último recibo + suministro reciente + documento del arrendador", host(MLG_DOC)],
      ["Propietarios", "Escritura, nota del Registro o recibo del IBI", host(MLG_DOC)],
      ["Contrato de suministro", "Luz, agua o gas; si no es actual, factura reciente", host(MLG_DOC)],
      ["Custodia compartida sin acuerdo sobre domicilio", "No se empadrona al menor hasta aportar acuerdo o nueva resolución", host(MLG_DOC)],
    ],
    faqs: [
      { q: "¿Por qué Málaga me pide el DNI del casero?", a: "Porque en el alquiler la hoja de GESTRISAM exige copia del documento de identidad en vigor del arrendador (o su CIF si es empresa), además del contrato, el último recibo y una factura de suministro." },
      { q: "Tenemos custodia compartida y la sentencia no dice dónde se empadrona el niño. ¿Qué hago en Málaga?", a: "Según GESTRISAM, no se puede empadronar hasta aportar un acuerdo entre los progenitores o una resolución judicial que fije expresamente la residencia del menor." },
    ],
    enlaces: [
      { href: "/empadronarse/formulario-empadronamiento-malaga", label: "Formulario de empadronamiento de Málaga" },
      { href: MLG_DOC, label: "GESTRISAM: documentación necesaria (PDF, 2026)" },
      { href: MLG_SEDE, label: "Sede de Málaga: ficha del trámite" },
    ],
  },
  "46250": {
    reviewedOn: "2026-11-01",
    intro: [
      "El procedimiento PA.GP.11 de València fija reglas de alquiler más estrictas que muchas ciudades: el contrato debe durar más de 6 meses y no se aceptan renovaciones mes a mes para acreditar esa duración.",
      "Si alquilas una habitación, el contrato tiene que indicar el número total de habitaciones del piso y cuál es la tuya. Los documentos se admiten en castellano o valenciano; en otro idioma, con traducción jurada o de una administración pública.",
    ],
    ejemplo: {
      titulo: "Caso resuelto: estudiante Erasmus con habitación en Benimaclet",
      pasos: [
        "Situación: contrato de habitación de 10 meses firmado en inglés.",
        "Duración: 10 meses cumple el mínimo de más de 6 meses; uno de 5 meses renovable mes a mes no lo cumpliría.",
        "Contenido del contrato: debe decir cuántas habitaciones tiene la vivienda y el número de la que alquilas.",
        "Idioma: como está en inglés, aporta original y traducción jurada (o de una administración pública).",
        "Si la vivienda tiene varios propietarios que no firman el contrato, se necesita la autorización de al menos la mayoría, con copia de sus documentos. Las autorizaciones valen un mes desde su fecha.",
      ],
    },
    datos: [
      ["Duración del alquiler", "Más de 6 meses; no valen renovaciones mes a mes", host(VLC_PA)],
      ["Habitación", "El contrato indica el total de habitaciones y cuál se alquila", host(VLC_PA)],
      ["Último recibo", "Pagado en los últimos 2 meses, con arrendador, inquilino, mes y dirección", host(VLC_PA)],
      ["Varios propietarios", "Autorización de al menos la mayoría", host(VLC_PA)],
      ["Validez de autorizaciones", "1 mes desde la fecha del documento", host(VLC_PA)],
      ["Idiomas", "Castellano o valenciano; otros, con traducción jurada", host(VLC_PA)],
    ],
    faqs: [
      { q: "¿Sirve un contrato de 3 meses para empadronarse en València?", a: "No para acreditar el alquiler: PA.GP.11 exige más de 6 meses y aclara que las renovaciones mes a mes no cuentan para alcanzar esa duración." },
      { q: "¿Qué recibo de alquiler pide València?", a: "El último pagado en los dos meses anteriores (o la transferencia), donde figuren arrendador, inquilino, mes y dirección de la vivienda." },
    ],
    enlaces: [
      { href: "/empadronarse/formulario-empadronamiento-valencia", label: "Formulario de empadronamiento de València" },
      { href: "/elecciones/mesa-electoral-valencia", label: "Dónde voto en València el 29-N" },
      { href: VLC_PA, label: "Sede de València: procedimiento PA.GP.11" },
    ],
  },
  "03014": {
    reviewedOn: "2026-11-01",
    intro: [
      "En Alicante el alta la hace la propia persona interesada en persona, en una de las dos Oficinas de Atención Ciudadana: Labradores (calle Labradores 14), con cita en el 010 o el 900 153 862, y Séneca (calle Portugal 17), con cita por internet. Es gratuita.",
      "Solo si hay causa de fuerza mayor puede ir un representante, con el modelo de autorización firmado, el justificante de la ausencia y los documentos originales de ambos.",
    ],
    ejemplo: {
      titulo: "Caso resuelto: piso en propiedad en San Blas",
      pasos: [
        "Situación: has comprado la vivienda y te mudas desde otra provincia.",
        "Acreditación: escritura o recibo del IBI, más la última factura de teléfono fijo, agua, gas o luz a tu nombre.",
        "Ojo con los recibos bancarios: Alicante no los admite como justificante, salvo el del IBI.",
        "Cita: Séneca por internet o Labradores por teléfono. Acudes tú: el trámite es personal.",
      ],
    },
    datos: [
      ["OAC Labradores", "C/ Labradores 14; cita en 010 o 900 153 862", host(ALC)],
      ["OAC Séneca", "C/ Portugal 17; cita por internet", host(ALC)],
      ["Quién acude", "La persona interesada; representante solo por fuerza mayor", host(ALC)],
      ["Recibos bancarios", "No se admiten, salvo el del IBI", host(ALC)],
      ["Alquiler sin ser titular", "Autorización de propietarios y titulares del contrato", host(ALC)],
      ["Precio", "Gratuito", host(ALC)],
    ],
    faqs: [
      { q: "¿Puede ir otra persona a empadronarme en Alicante?", a: "Solo por causa de fuerza mayor, con el modelo de autorización firmado, el justificante de la ausencia y los documentos originales del representante y del interesado." },
      { q: "¿Qué cita pido en Alicante, Labradores o Séneca?", a: "Las dos tramitan el padrón. Labradores se pide por teléfono (010 o 900 153 862) y Séneca por internet." },
    ],
    enlaces: [
      { href: "/empadronarse/formulario-empadronamiento-alicante", label: "Formulario de empadronamiento de Alicante" },
      { href: ALC, label: "Ayuntamiento de Alicante: altas y cambios de domicilio" },
    ],
  },
  "30030": {
    reviewedOn: "2026-11-01",
    intro: [
      "Murcia tramita el alta con el procedimiento 3662: formulario de solicitud más la hoja padronal firmada a mano por todas las personas que se empadronan, presentados en el Registro municipal. Es gratuito y el plazo máximo de resolución es de 3 meses.",
      "La hoja tiene una casilla propia: «la firma de la persona con mejor derecho a ocupación de la vivienda». La firma quien tiene derecho sobre la vivienda y autoriza el alta, normalmente alguien ya empadronado allí.",
    ],
    ejemplo: {
      titulo: "Caso resuelto: contrato con correcciones a boli en El Carmen",
      pasos: [
        "Situación: contrato de alquiler en vigor en el que se corrigió a mano el número de piso.",
        "Dirección exacta: la del contrato debe coincidir con la del domicilio donde te empadronas.",
        "Correcciones: cada modificación debe ir salvada con la firma del arrendador al lado.",
        "Si el contrato está prorrogado, aporta el acuerdo firmado con el arrendador que lo recoja, en el propio contrato o aparte.",
        "Factura: si la usas, debe ser la última emitida, con la misma dirección y a tu nombre.",
      ],
    },
    datos: [
      ["Procedimiento", "3662; Registro municipal; gratuito", host(MUR_3662)],
      ["Plazo de resolución", "3 meses desde la entrada en el Registro", host(MUR_3662)],
      ["Información", "Teléfono 010", host(MUR_3662)],
      ["Contrato con correcciones", "Cada cambio, salvado con la firma del arrendador", host(MUR_PDF)],
      ["Contrato prorrogado", "Acuerdo firmado de prórroga con el arrendador", host(MUR_PDF)],
      ["Firma especial", "Persona con mejor derecho a ocupar la vivienda", host(MUR_PDF)],
    ],
    faqs: [
      { q: "¿Cuánto tarda el empadronamiento en Murcia?", a: "La ficha 3662 fija un plazo máximo de resolución de 3 meses desde la entrada de la solicitud en el Registro." },
      { q: "Mi contrato tiene tachones. ¿Me lo aceptan en Murcia?", a: "Sí, si cada modificación está salvada con la firma del arrendador al lado, y la dirección coincide exactamente con la de empadronamiento." },
    ],
    enlaces: [
      { href: "/empadronarse/formulario-empadronamiento-murcia", label: "Formulario de empadronamiento de Murcia" },
      { href: "/elecciones/mesa-electoral-murcia", label: "Dónde voto en Murcia el 29-N" },
      { href: MUR_3662, label: "Sede de Murcia: procedimiento 3662" },
      { href: MUR_PDF, label: "Murcia: formulario de solicitud (PDF)" },
    ],
  },
  "07040": {
    reviewedOn: "2026-11-01",
    intro: [
      "Palma reserva canales especiales: las personas mayores de 65 años pueden darse de alta sin cita en la OAC de Son Moix, de 8:30 a 13:30, y quien tenga una urgencia acreditada puede llamar al 010 (971 225 900 o 630 308 226 desde fuera) de 14 a 23 h.",
      "Cuentan como urgencia, por ejemplo, un plazo de menos de 30 días para escolarización, bono social, subvenciones o alquiler joven, siempre con el documento que lo acredite. El alquiler debe ser de al menos 6 meses.",
    ],
    ejemplo: {
      titulo: "Caso resuelto: necesitas el padrón para matricular a tu hija en 3 semanas",
      pasos: [
        "Situación: te mudas a Palma y la matrícula escolar vence en 21 días.",
        "Canal: es un supuesto de urgencia (plazo inferior a 30 días). Llama al 010 de 14 a 23 h y ten a mano el documento del centro o de Educación que fija el plazo.",
        "Vivienda: contrato de alquiler de mínimo 6 meses y justificante de pago del mes en curso o del anterior si han pasado más de 3 meses desde la firma.",
        "Contrato firmado electrónicamente: se adjunta en PDF.",
        "Plazo: el máximo para resolver es de 3 meses, y si hay dudas el Ayuntamiento puede hacer una inspección padronal.",
      ],
    },
    datos: [
      ["Mayores de 65 años", "Sin cita en la OAC de Son Moix, 8:30-13:30", host(PMI_HOJA)],
      ["Urgencias", "010 de 14 a 23 h; plazo inferior a 30 días acreditado", host(PMI_HOJA)],
      ["Alquiler", "Mínimo 6 meses + justificante del mes en curso o el anterior", host(PMI_HOJA)],
      ["Suministro", "Última factura de gas, agua o electricidad a tu nombre", host(PMI_HOJA)],
      ["Plazo máximo", "3 meses; posible inspección padronal", host(PMI_HOJA)],
    ],
    faqs: [
      { q: "¿Hay atención sin cita para el padrón en Palma?", a: "Sí, para mayores de 65 años en la OAC de Son Moix de 8:30 a 13:30. El resto, con cita o, si hay urgencia acreditada, por el 010 de 14 a 23 h." },
      { q: "¿Qué es una urgencia para empadronarse en Palma?", a: "Un trámite con plazo inferior a 30 días, como escolarización, bono social, subvenciones o alquiler joven, siempre con documento que lo acredite. También casos de salud urgentes y cambios en zonas ACIRE, con justificante." },
    ],
    enlaces: [
      { href: "/empadronarse/formulario-empadronamiento-palma", label: "Formulario de empadronamiento de Palma" },
      { href: "/elecciones/mesa-electoral-palma", label: "Dónde voto en Palma el 29-N" },
      { href: PMI_02, label: "Sede de Palma: Población.02" },
      { href: PMI_HOJA, label: "Palma: hoja informativa del empadronamiento (PDF)" },
    ],
  },
};
