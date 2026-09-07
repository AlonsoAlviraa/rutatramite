/**
 * Client-safe wizard logic. No network, no PII fields, no server POST.
 * Imported by the Wizard UI and by tests.
 */
import type { EscenarioSlug, Municipio, MunicipioIndexEntry, WizardAnswers } from "@/lib/types";
import { ESCENARIO_LABELS } from "@/lib/types";

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
  if (answers.housing === "no-contrato" && primary !== "sin-contrato") extras.push("sin-contrato");
  if (answers.housing === "sin-techo" && primary !== "sin-hogar") extras.push("sin-hogar");

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
};

export function buildChecklist(answers: WizardAnswers, municipio: WizardMunicipio | null): string[] {
  const items: string[] = [];
  const nat = answers.nacionalidad;
  const nie = answers.nieTie;

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

  if (answers.tramite === "certificado") {
    items.push("Identifícate para pedir el certificado (documento público fehaciente). No lo confundas con el volante informativo.");
  } else if (answers.tramite === "volante") {
    items.push("El volante es informativo y suele bastar para trámites internos; extranjería suele pedir certificado o histórico reciente.");
  } else if (answers.tramite === "renovacion") {
    items.push("La renovación a dos años aplica a extranjeros no comunitarios sin autorización de residencia de larga duración o permanente. No es lo mismo que renovar la TIE.");
  } else if (answers.tramite === "cambio") {
    items.push("El cambio de domicilio se pide en el ayuntamiento del nuevo domicilio. La baja en origen la coordina el INE; no es un trámite previo que debas cerrar tú.");
  }

  if (municipio?.docs_extra?.length) {
    for (const extra of municipio.docs_extra) items.push(`Peculiaridad local (${municipio.name}): ${extra}`);
  } else {
    items.push("Este municipio no ha publicado documentos extra frente al marco INE. Confirma el modelo de solicitud en la sede o en la OAC.");
  }

  items.push("El alta en el padrón es gratuita (tasa 0 €). No pagues la cita ni un intermediario que venda turnos.");
  return items;
}

export function runWizard(answers: WizardAnswers, municipio: WizardMunicipio | Municipio | MunicipioIndexEntry | null): WizardResult {
  const { primary, extras } = detectCaso(answers);
  const checklist = buildChecklist(answers, municipio);
  const sedeUrl = municipio?.sede_url ?? null;
  const citaUrl = municipio?.cita_url ?? null;
  const name = municipio?.name ?? "tu municipio";
  return {
    primary,
    extras,
    label: ESCENARIO_LABELS[primary],
    municipioPath: municipio?.path ?? null,
    checklist,
    sedeUrl,
    citaUrl,
    confidence: municipio?.confidence ?? "unknown",
    searchHint: sedeUrl
      ? null
      : `Busca «empadronamiento sede ${name} ${municipio?.province_name ?? ""}» en la web del ayuntamiento. No uses clónicos de cita de pago.`,
  };
}

/** Guard used by tests: this module must never POST identity fields. */
export const WIZARD_NETWORK_POLICY = "client-only-no-pii" as const;
