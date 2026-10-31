// 2026-10-31: Ceuta y Melilla son un único municipio cada una y todavía no tienen ficha local.
// En lugar de un directorio vacío, resumimos el trámite tal como lo publica la sede de cada ciudad.
// Solo datos leídos en la fuente oficial el 31-10-2026; sin tasas ni plazos que la sede no indique.
export type CiudadPadron = {
  reviewedOn: string;
  organo: string;
  canales: string[];
  documentos: string[];
  notas: string[];
  links: { label: string; href: string }[];
};

export const CIUDADES_AUTONOMAS_PADRON: Record<string, CiudadPadron> = {
  ceuta: {
    reviewedOn: "2026-10-31",
    organo: "Ciudad Autónoma de Ceuta, que actúa como ayuntamiento. El padrón lo gestiona su servicio de Estadística.",
    canales: [
      "Por internet, en la sede electrónica de la Ciudad (trámite «Alta padrón de habitantes»), identificándote con certificado electrónico, DNI electrónico o Cl@ve.",
      "En persona, en las Oficinas de Registro y Atención al Ciudadano o en la oficina de registro de Estadística (Plaza de África, s/n, 51001 Ceuta), con la documentación.",
    ],
    documentos: [
      "Solicitud de alta en el padrón y hoja de inscripción padronal.",
      "Documento de identidad: DNI, NIE o pasaporte (y los de los miembros de la unidad familiar).",
      "Documento que acredite el uso o disfrute de la vivienda.",
      "Si te empadronas en el domicilio de otra persona: su formulario de autorización y su documento de identidad.",
      "Para menores: libro de familia o certificado literal de nacimiento.",
    ],
    notas: [
      "La misma sede tiene un trámite separado para el cambio de domicilio dentro de Ceuta.",
    ],
    links: [
      { label: "Sede de Ceuta: alta en el padrón", href: "https://sede.ceuta.es/controlador/controlador?cmd=tramite&modulo=tramites&tramite=AEPDH" },
      { label: "Sede de Ceuta: cambio de domicilio", href: "https://sede.ceuta.es/controlador/controlador?cmd=tramite&modulo=tramites&tramite=CDPDH" },
      { label: "Sede de Ceuta: trámites de padrón", href: "https://sede.ceuta.es/controlador/controlador?cmd=tramites&modulo=tramites&tema=pad" },
    ],
  },
  melilla: {
    reviewedOn: "2026-10-31",
    organo: "Ciudad Autónoma de Melilla: Consejería de Presidencia, Administración Pública e Igualdad, Negociado de Gestión de Población y Empadronamiento.",
    canales: [
      "En las oficinas del Sistema de Registro Único de la Ciudad Autónoma de Melilla, con el formulario «Solicitud de alta y modificaciones padronales (Modelo Único)».",
    ],
    documentos: [
      "Documento de identidad: DNI o pasaporte; para menores de 14 años sin documento, libro de familia o certificado de nacimiento.",
      "Ciudadanos de la UE, Islandia, Liechtenstein, Noruega y Suiza: certificado de registro de ciudadano de la Unión (con el NIE) junto al documento de identidad o pasaporte.",
      "Resto de extranjeros: tarjeta de identidad de extranjero con NIE o, en su defecto, pasaporte; según el caso, visado o permiso de residencia.",
      "Documento de la vivienda: escritura o nota simple, contrato de alquiler en vigor con el último recibo, factura de la luz (último recibo), último recibo del IBI o autorización para residir en la vivienda.",
    ],
    notas: [
      "Plazo de presentación: permanente. Si la Ciudad no resuelve en plazo, el silencio es estimatorio; contra la resolución cabe recurso de alzada.",
      "Para empadronar a menores, la Ciudad publica modelos de autorización junto al Modelo Único (actualizado el 7 de julio de 2025).",
    ],
    links: [
      { label: "Sede de Melilla: alta, modificación o baja en el padrón", href: "https://sede.melilla.es/sta/CarpetaPublic/doEvent?APP_CODE=STA&DETALLE=6269001013156938699500&PAGE_CODE=CATALOGO" },
      { label: "Melilla: Modelo Único de solicitud", href: "https://www.melilla.es/melillaportal/contenedor.jsp?codMenu=144&codMenuPN=601&codMenuSN=4&codResi=1&contenido=10807&language=es&layout=contenedor.jsp&nivel=1400&seccion=s_fdoc_d4_v1.jsp&tipo=5" },
    ],
  },
};
