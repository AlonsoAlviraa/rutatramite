/**
 * Guía regional de padrón por comunidad (lote de calidad 01-11-2026).
 * Cada dato procede de la fuente oficial enlazada, leída el 01-11-2026 con respuesta HTTP 200.
 */
export type GuiaRegional = {
  reviewedOn: string;
  titulo: string;
  intro: string[];
  ciudades: { nombre: string; ficha: string; datos: string[]; fuentes: { href: string; label: string }[] }[];
  ejemplo: { titulo: string; pasos: string[] };
  faqs: { q: string; a: string }[];
  enlaces: { href: string; label: string }[];
};

export const GUIA_REGIONAL: Record<string, GuiaRegional> = {
  extremadura: {
    reviewedOn: "2026-11-01",
    titulo: "Badajoz, Cáceres y Mérida: tres ayuntamientos, tres formas de pedir el alta",
    intro: [
      "En Extremadura cada ayuntamiento decide cómo atiende el padrón, y las tres ciudades más pobladas lo hacen de forma distinta: Badajoz trabaja con cita previa, Cáceres permite presentar la solicitud en persona o por su sede electrónica y Mérida centraliza la información en su servicio de Estadística.",
      "Lo que sí comparten es el marco común: la hoja de inscripción la firman las personas mayores de edad que se empadronan y hay que acreditar la vivienda. Lo que cambia es qué justificante admite cada oficina y cuánto tiempo puede tener.",
    ],
    ciudades: [
      {
        nombre: "Badajoz",
        ficha: "/empadronarse/extremadura/badajoz/badajoz",
        datos: [
          "Altas y cambios de domicilio con cita previa en la oficina de padrón; la cita se pide en persona o en la Oficina Virtual del Ayuntamiento.",
          "Horario transitorio publicado: lunes a viernes de 9:00 a 13:00 y lunes a jueves de 17:15 a 19:45.",
          "La hoja se firma ante el funcionario por todas las personas mayores de edad.",
          "Vivienda: escritura, recibo del IBI o contrato de alquiler vigente con el último recibo (arrendador, inquilino, dirección y fecha de pago).",
          "Extranjeros no comunitarios sin residencia permanente: renovación cada dos años, o la inscripción caduca.",
        ],
        fuentes: [
          { href: "https://www.aytobadajoz.es/es/ayto/padron-municipal/624/causar-alta-procedente-de-otro-municipio-o-el-extranjero", label: "Badajoz: alta procedente de otro municipio" },
          { href: "https://www.aytobadajoz.es/es/ayto/padron-municipal", label: "Badajoz: padrón municipal" },
        ],
      },
      {
        nombre: "Cáceres",
        ficha: "/empadronarse/extremadura/caceres/caceres",
        datos: [
          "En persona en el Negociado de Estadística (Plaza Mayor s/n, 10003), de lunes a viernes de 9 a 14 h, o por la sede electrónica.",
          "Impreso Mod-256 (hoja de inscripción o modificación), siempre.",
          "Vivienda: última factura de agua, luz o gas de como máximo 3 meses, o contrato de alquiler vigente (si está prorrogado, el último recibo pagado).",
          "Plazo de resolución: 3 meses; si no hay respuesta, el silencio es desestimatorio.",
          "Recién nacidos: inscripción de oficio con los datos del Registro Civil, con preferencia por el domicilio de la madre si los progenitores viven separados.",
        ],
        fuentes: [
          { href: "https://sede.caceres.es/sta/CarpetaPublic/doEvent?APP_CODE=STA&DETALLE=6269000000010031499500&PAGE_CODE=CATALOGO", label: "Sede de Cáceres: alta en el padrón" },
        ],
      },
      {
        nombre: "Mérida",
        ficha: "/empadronarse/extremadura/badajoz/merida",
        datos: [
          "Servicio de Estadística: teléfono 924 380 128, atención al público de lunes a viernes de 9:00 a 14:00, correo estadistica@merida.es.",
          "La sede electrónica ofrece alta, modificación, renovación de extranjeros no comunitarios, certificado y declaración jurada.",
        ],
        fuentes: [
          { href: "https://merida.es/servicios-municipales/administracion-general/estadistica/", label: "Mérida: Estadística" },
        ],
      },
    ],
    ejemplo: {
      titulo: "Caso resuelto: te trasladan de Badajoz a Cáceres con un contrato prorrogado",
      pasos: [
        "Situación: llevas dos años en un piso de Cáceres con un contrato de un año que se ha prorrogado.",
        "En Cáceres, el contrato prorrogado se acompaña del último recibo pagado del alquiler; también vale una factura de suministro de menos de 3 meses.",
        "Rellena el Mod-256; lo firman todas las personas mayores de edad que se inscriben.",
        "Preséntalo en el Negociado de Estadística (sin pedir cita en Badajoz: allí sí es obligatoria) o por la sede si tienes identificación electrónica.",
        "No tienes que darte de baja en Badajoz: según el artículo 70 del Reglamento de Población, el alta en el nuevo municipio produce la baja en el anterior.",
      ],
    },
    faqs: [
      { q: "¿Necesito cita para empadronarme en Badajoz?", a: "Sí. El Ayuntamiento de Badajoz exige cita previa para altas y cambios de domicilio; se pide en persona o a través de su Oficina Virtual." },
      { q: "¿Qué factura vale en Cáceres para el padrón?", a: "La última de agua, luz o gas, con una antigüedad máxima de 3 meses, o un contrato de suministro del último año. Si alquilas, también sirve el contrato vigente." },
      { q: "¿A quién pregunto en Mérida?", a: "Al servicio de Estadística: 924 380 128 (lunes a viernes, de 9:00 a 14:00) o estadistica@merida.es." },
    ],
    enlaces: [
      { href: "/elecciones/mesa-electoral-caceres", label: "Dónde voto en Cáceres el 29-N" },
      { href: "/empadronarse/con-contrato", label: "Empadronarse con contrato de alquiler" },
    ],
  },
  "la-rioja": {
    reviewedOn: "2026-11-01",
    titulo: "Logroño: cómo es el alta paso a paso",
    intro: [
      "En Logroño, la Unidad de Estadística publica una hoja de requisitos propia (REQUISITOS ALTA 2023). El alta la presenta en persona quien se empadrona, en la avenida de la Paz 11, de 9:00 a 14:00.",
      "Hay dos detalles que conviene conocer antes de ir: si tu contrato de alquiler tiene más de un año, también te pedirán la última factura de luz o gas; y los documentos extranjeros que no estén en español deben llevar traducción jurada o consular.",
    ],
    ciudades: [
      {
        nombre: "Logroño",
        ficha: "/empadronarse/la-rioja/la-rioja/logrono",
        datos: [
          "Impresos: solicitud de alta EST.DO.22/1 y hoja padronal EST.DO.22/3, firmados por todas las personas mayores de edad.",
          "Original y fotocopia de toda la documentación.",
          "Alquiler: contrato o, en su defecto, declaración del propietario con copia de su DNI. Pasado el primer año del contrato, también la última factura de luz o gas.",
          "Si ya hay alguien empadronado en la vivienda: declaración de la persona principal con su documento.",
          "Tras el alta puedes pedir que se actualice tu dirección en Tráfico sin ir a la Jefatura; lleva el permiso de circulación si tienes vehículo.",
        ],
        fuentes: [
          { href: "https://sedeelectronica.logrono.es/wps/portal/web/inicio/sedeElectronica/teAyudamos/buscadorTramites/tramites/?WCM_GLOBAL_CONTEXT=%2FSedeElectronica%2FSedeElectronica%2FTramites%2Faa1504804bcd050dba17ffc1117f39a7", label: "Sede de Logroño: alta en el padrón" },
          { href: "https://logrono.es/documents/20121/1624444/REQUISITOS%20ALTA%202023.pdf/57901b8046081ec2a504e744b2baff88?download=true&t=1742386639737&version=1.5", label: "Logroño: requisitos de alta (PDF)" },
        ],
      },
    ],
    ejemplo: {
      titulo: "Caso resuelto: llevas 14 meses de alquiler en Logroño y tu pareja es de fuera de la UE",
      pasos: [
        "Contrato: como ha pasado el primer año, lleva el contrato y la última factura de luz o gas de la vivienda.",
        "Impresos: EST.DO.22/1 y EST.DO.22/3, firmados por los dos.",
        "Documentos: original y fotocopia de cada uno. Si su pasaporte o cualquier certificado está en otro idioma, aporta traducción jurada o del consulado.",
        "Aprovecha la visita: al hacer el alta puedes pedir que se actualice tu dirección en Tráfico.",
      ],
    },
    faqs: [
      { q: "¿Puedo empadronarme en Logroño por internet?", a: "La ficha de la sede indica que el alta se presenta en persona por quien se empadrona, en la Unidad de Estadística (avenida de la Paz 11), de 9:00 a 14:00." },
      { q: "¿Qué factura pide Logroño con el contrato de alquiler?", a: "Solo cuando ya ha transcurrido el primer año del contrato: entonces se aporta además la última factura de luz o gas." },
    ],
    enlaces: [
      { href: "/elecciones/mesa-electoral-logrono", label: "Dónde voto en Logroño el 29-N" },
      { href: "/empadronarse/con-contrato", label: "Empadronarse con contrato de alquiler" },
    ],
  },
};
