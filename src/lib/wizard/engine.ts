/**
 * Client-safe wizard logic. No network, no PII fields, no server POST.
 * Imported by the Wizard UI and by tests.
 */
import type { EscenarioSlug, Municipio, MunicipioIndexEntry, WizardAnswers } from "@/lib/types";
import { ESCENARIO_LABELS } from "@/lib/types";
import { isFichaIndexable } from "@/lib/seo/localSignals";

export type WizardResult = {
  primary: EscenarioSlug;
  extras: EscenarioSlug[];
  label: string;
  municipioPath: string | null;
  checklist: string[];
  sedeUrl: string | null;
  citaUrl: string | null;
  confidence: Municipio["confidence"] | "unknown";
  searchHint: string | null;
};

export function detectCaso(answers: WizardAnswers): { primary: EscenarioSlug; extras: EscenarioSlug[] } {
  const extras: EscenarioSlug[] = [];
  let primary: EscenarioSlug = "con-contrato";

  if (answers.tramite === "cambio") {
    primary = "cambio-de-domicilio";
  } else if (answers.tramite === "volante" || answers.tramite === "certificado") {
    primary = "volante-vs-certificado";
  } else if (answers.tramite === "renovacion") {
    primary = "renovacion-2-anos";
  } else if (answers.housing === "sin-techo") {
    primary = "sin-hogar";
  } else if (answers.housing === "propietario") {
    primary = "propietario";
  } else if (answers.housing === "sin-papeles" || answers.housing === "no-contrato") {
    primary = "sin-contrato";
  } else {
    primary = "con-contrato";
  }

  if (answers.nacionalidad === "ue") extras.push("extranjeros-ue");
  if (answers.nacionalidad === "resto") extras.push("extranjeros-no-ue");
  if (answers.menores) extras.push("menores");
  const registration = answers.tramite === "alta" || answers.tramite === "cambio";
  if (registration && answers.housing === "no-contrato" && primary !== "sin-contrato") extras.push("sin-contrato");
  if (registration && answers.housing === "sin-techo" && primary !== "sin-hogar") extras.push("sin-hogar");

  const uniq = extras.filter((s) => s !== primary);
  return { primary, extras: uniq };
}

/** Fields the shipped Wizard actually has: the client index row, not the full JSON. */
export type WizardMunicipio = {
  name: string;
  docs_extra?: string[] | null;
  sede_url?: string | null;
  cita_url?: string | null;
  path?: string | null;
  confidence?: Municipio["confidence"] | null;
  province_name?: string | null;
  local_verified?: boolean;
  procedure_docs?: Municipio["procedure_docs"];
  certificado_url?: string | null;
  tramite_alta_url?: string | null;
};

export function buildChecklist(answers: WizardAnswers, municipio: WizardMunicipio | null): string[] {
  const items: string[] = [];
  const nat = answers.nacionalidad;
  const nie = answers.nieTie;

  // Existing certificates and renewal do not require a new registration checklist.
  if (answers.tramite === "certificado" || answers.tramite === "volante") {
    items.push("Identifícate para solicitar tus datos padronales por el canal que ofrece el ayuntamiento. Comprueba qué identificación admite la sede electrónica o la oficina.");
    items.push(answers.tramite === "certificado"
      ? "Indica si necesitas certificado individual, colectivo o histórico y para qué organismo. Comprueba el tipo de documento que te han solicitado."
      : "Comprueba que el organismo destinatario acepta un volante; si exige certificado o histórico, solicita ese documento.");
    if (answers.menores) items.push("Para solicitar datos de un menor, consulta cómo acreditar la representación y qué autorizaciones requiere ese ayuntamiento.");
    items.push("Si actúa otra persona, consulta la autorización o representación exigida para obtener información padronal. Comprueba los canales, plazos y posibles tasas de este documento.");
    for (const extra of municipio?.procedure_docs?.[answers.tramite] ?? []) items.push(`Peculiaridad local (${municipio!.name}): ${extra}`);
    if (!municipio?.procedure_docs?.[answers.tramite]) items.push("La documentación local de este procedimiento está pendiente de comprobación en esta guía. Consulta su ficha oficial.");
    return items;
  }
  if (answers.tramite === "renovacion") {
    if (nat === "espanola" || nat === "ue") return ["La renovación padronal cada dos años no corresponde a personas españolas o de la UE/EEE/Suiza. Si has recibido un requerimiento municipal, consulta el procedimiento que indica antes de actuar."];
    items.push("Comprueba que te corresponde la renovación: afecta a extranjeros no comunitarios sin residencia de larga duración. Esta guía no conoce el tipo de tu autorización; sigue el aviso del ayuntamiento.");
    items.push("Prepara la identificación y la solicitud o declaración de renovación que indique tu ayuntamiento. No es una renovación de la TIE ni una nueva alta.");
    if (answers.menores) items.push("Para un menor, consulta cómo debe acreditar su representación quien realiza la renovación.");
    for (const extra of municipio?.procedure_docs?.renovacion ?? []) items.push(`Peculiaridad local (${municipio!.name}): ${extra}`);
    if (!municipio?.procedure_docs?.renovacion) items.push("La documentación local de renovación está pendiente de comprobación. Consulta el aviso y la sede municipal.");
    return items;
  }

  items.push("Hoja padronal o solicitud del ayuntamiento, firmada por todos los mayores de edad que se inscriben.");

  if (nat === "espanola") {
    items.push("Documento nacional de identidad en vigor (mayores de 14 años) o pasaporte. Menores: libro de familia o certificado de nacimiento, y DNI si lo tienen.");
  } else if (nat === "ue") {
    items.push("Pasaporte o documento nacional de identidad del país de la UE/EEE/Suiza. Certificado de registro de ciudadano de la Unión si ya lo tienes (no es un filtro de extranjería para el alta).");
  } else if (nat === "resto") {
    if (nie === false) {
      items.push("Pasaporte en vigor. La TIE no es un requisito estatal para el alta: el artículo 15 de la Ley 7/1985 obliga a inscribir la residencia real. El documento identifica; no filtra.");
    } else {
      items.push("TIE o, en su defecto, pasaporte en vigor. El ayuntamiento identifica a la persona; no puede convertir el padrón en un permiso de residencia.");
    }
  } else {
    items.push("Documento de identidad en vigor según tu nacionalidad (DNI, documento UE, TIE o pasaporte).");
  }

  if (answers.housing === "propietario") {
    items.push("Escritura, nota simple o último recibo de IBI, con referencia catastral cuando exista.");
  } else if (answers.housing === "contrato") {
    items.push("Contrato de alquiler completo, firmado por ambas partes. Algunos ayuntamientos piden el último recibo: solo si esa sede lo publica.");
  } else if (answers.housing === "sin-techo") {
    items.push("Acude a Servicios Sociales del municipio. El padrón no puede quedar bloqueado por no tener techo: informe social o domicilio de referencia que fije SS.SS.");
  } else {
    items.push("Autorización firmada del titular de la vivienda + documento del titular + prueba de que el titular ocupa esa casa (su padrón, escritura o contrato). Preferible el modelo municipal si existe.");
  }

  if (answers.menores) {
    items.push("Documentación de cada menor (libro de familia o nacimiento, DNI si lo tiene) y consentimiento del otro progenitor, resolución judicial o declaración responsable de los anexos INE.");
  }

  if (answers.tramite === "cambio") {
    items.push("El cambio de domicilio se pide en el ayuntamiento del nuevo domicilio. La baja en origen la coordina el INE; no es un trámite previo que debas cerrar tú.");
  }

  const localDocs = municipio?.procedure_docs?.[answers.tramite ?? "alta"] ?? (answers.tramite === "alta" ? municipio?.docs_extra : undefined);
  if (localDocs?.length) {
    for (const extra of localDocs) items.push(`Peculiaridad local (${municipio!.name}): ${extra}`);
  } else {
    items.push("No hemos comprobado los documentos específicos de este procedimiento en tu municipio. La revisión local está pendiente: confirma los requisitos y el modelo en la sede o en la OAC.");
  }

  items.push("El alta en el padrón es gratuita (tasa 0 €). No pagues la cita ni un intermediario que venda turnos.");
  return items;
}

export function runWizard(answers: WizardAnswers, municipio: WizardMunicipio | Municipio | MunicipioIndexEntry | null): WizardResult {
  const { primary, extras } = detectCaso(answers);
  const checklist = buildChecklist(answers, municipio);
  const documentRequest = answers.tramite === "certificado" || answers.tramite === "volante";
  const sedeUrl = (documentRequest ? municipio?.certificado_url : answers.tramite === "alta" || answers.tramite === "cambio" ? municipio?.tramite_alta_url : null) || municipio?.sede_url || null;
  const citaUrl = documentRequest || answers.tramite === "renovacion" ? null : municipio?.cita_url ?? null;
  const verified = (municipio && "local_verified" in municipio ? municipio.local_verified : undefined) ?? (municipio && "online" in municipio ? isFichaIndexable(municipio as Municipio) : false);
  const name = municipio?.name ?? "tu municipio";
  return {
    primary,
    extras,
    label: ESCENARIO_LABELS[primary],
    municipioPath: municipio?.path ?? null,
    checklist,
    sedeUrl,
    citaUrl,
    confidence: !municipio ? "unknown" : verified ? "official" : "unverified",
    searchHint: sedeUrl
      ? null
      : `Busca «empadronamiento sede ${name} ${municipio?.province_name ?? ""}» en la web del ayuntamiento. No uses clónicos de cita de pago.`,
  };
}

/** Guard used by tests: this module must never POST identity fields. */
export const WIZARD_NETWORK_POLICY = "client-only-no-pii" as const;
