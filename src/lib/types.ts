export type Confidence = "official" | "inferred" | "unverified";
export type Status = "published" | "stub" | "draft";
export type Oleada = "A" | "B" | "C" | "D" | "E";
export type Online = true | false | "partial" | "unknown";
export type CitaPrevia = "required" | "recommended" | "walk-in" | "unknown";

export type Oficina = {
  nombre: string;
  direccion?: string | null;
  cp?: string | null;
  lat?: number | null;
  lon?: number | null;
  horario?: string | null;
  telefono?: string | null;
  cita?: boolean | null;
};

export type Municipio = {
  ine_code: string;
  name: string;
  name_official_alt: string | null;
  slug: string;
  province_code: string;
  province_name: string;
  province_slug: string;
  ccaa_name: string;
  ccaa_slug: string;
  poblacion: number | null;
  poblacion_ref: string | null;
  sede_url: string | null;
  tramite_alta_url: string | null;
  cita_url: string | null;
  certificado_url: string | null;
  online: Online;
  presencial: boolean | null;
  cita_previa: CitaPrevia;
  oficinas: Oficina[];
  tasa_alta: 0 | number;
  tasa_volante: number | null;
  tasa_certificado: number | null;
  docs_extra: string[];
  peculiaridades: string[];
  idiomas_sede: string[];
  last_verified: string;
  source_urls: string[];
  confidence: Confidence;
  status: Status;
  oleada: Oleada;
  min_words: number;
  banda?: string | null;
  path: string;
  catalog_name?: string;
};

export type MunicipioIndexEntry = {
  ine_code: string;
  name: string;
  slug: string;
  province_code: string;
  province_name: string;
  province_slug: string;
  ccaa_name: string;
  ccaa_slug: string;
  poblacion: number | null;
  status: Status;
  confidence: Confidence;
  oleada: Oleada;
  min_words: number;
  path: string;
  sede_url: string | null;
  cita_url: string | null;
  /** Copied onto the client index so the wizard checklist can use local extras without loading the full JSON. */
  docs_extra: string[];
};

export type Housing =
  | "contrato"
  | "no-contrato"
  | "propietario"
  | "sin-papeles"
  | "sin-techo";

export type Nacionalidad = "espanola" | "ue" | "resto";
export type Tramite = "alta" | "cambio" | "volante" | "certificado" | "renovacion";

export type WizardAnswers = {
  ineCode: string | null;
  housing: Housing | null;
  nacionalidad: Nacionalidad | null;
  nieTie: boolean | null;
  menores: boolean | null;
  tramite: Tramite | null;
};

export const ESCENARIO_SLUGS = [
  "con-contrato",
  "sin-contrato",
  "propietario",
  "casa-de-familiar",
  "menores",
  "extranjeros-ue",
  "extranjeros-no-ue",
  "sin-hogar",
  "volante-vs-certificado",
  "renovacion-2-anos",
  "cambio-de-domicilio",
  "baja",
  "volante-online",
  "cita-previa-madrid",
] as const;

export type EscenarioSlug = (typeof ESCENARIO_SLUGS)[number];

export const ESCENARIO_LABELS: Record<EscenarioSlug, string> = {
  "con-contrato": "Con contrato de alquiler",
  "sin-contrato": "Sin contrato de alquiler",
  propietario: "Propietario o usufructuario",
  "casa-de-familiar": "Casa de un familiar",
  menores: "Alta con menores",
  "extranjeros-ue": "Extranjeros UE / EEE / Suiza",
  "extranjeros-no-ue": "Extranjeros no comunitarios",
  "sin-hogar": "Sin hogar o infravivienda",
  "volante-vs-certificado": "Volante, certificado e histórico",
  "renovacion-2-anos": "Renovación a los 2 años",
  "cambio-de-domicilio": "Cambio de domicilio",
  baja: "Baja en el padrón",
  "volante-online": "Volante de empadronamiento por internet",
  "cita-previa-madrid": "Cita previa de empadronamiento en Madrid",
};

/** Canonical production origin. Preview/staging: set NEXT_PUBLIC_SITE_URL. */
export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rutatramite.com").replace(
  /\/$/,
  "",
);
export const PRODUCT_NAME = "RutaTrámite";
export const SITE_NAME = PRODUCT_NAME;
/** Editorial mailbox on the live host. Do not use the NXDOMAIN .es. */
export const CONTACT_EMAIL = "hola@rutatramite.com";
export const DEFAULT_OG_ALT = "RutaTrámite: guía ciudadana para empadronarse en España";

export const DISCLAIMER_SHORT =
  "Información orientativa. El padrón lo gestiona cada Ayuntamiento. Contrasta siempre con la sede electrónica oficial. No somos Administración Pública ni despacho de abogados. El alta en el padrón es gratuita. No pedimos ni guardamos tu DNI, pasaporte ni documentos.";

export const WIZARD_QUESTIONS = [
  "Municipio (escribe el nombre; el listado sale del índice INE de municipios de España).",
  "¿El contrato o la escritura está a tu nombre?",
  "Nacionalidad: española, UE-EEE-CH o resto.",
  "¿Tienes NIE o TIE?",
  "¿Hay menores en el alta?",
  "¿Quieres alta, cambio de domicilio, volante, certificado o renovación 2 años?",
] as const;
