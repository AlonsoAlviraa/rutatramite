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
  if (registration && (answers.housing === "no-contrato" || answers.housing === "sin-papeles")) {
    extras.push("casa-de-familiar");
  }

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
    items.push("Comprueba que te corresponde la renovación: afecta al grupo ENCSARP, extranjeros no comunitarios sin residencia de larga duración, excluidos los titulares de tarjeta de régimen comunitario. Esta guía no conoce tu régimen de residencia; consulta el aviso del ayuntamiento. Los dos años se cuentan desde el alta o la última renovación expresa.");
    items.push("Prepara la identificación y la solicitud o declaración de renovación que indique tu ayuntamiento. No es una renovación de la TIE ni una nueva alta.");
    if (answers.menores) items.push("Para un menor, consulta cómo debe acreditar su representación quien realiza la renovación.");
    for (const extra of municipio?.procedure_docs?.renovacion ?? []) items.push(`Peculiaridad local (${municipio!.name}): ${extra}`);
    if (!municipio?.procedure_docs?.renovacion) items.push("La documentación local de renovación está pendiente de comprobación. Consulta el aviso y la sede municipal.");
    return items;
  }

  items.push("Hoja padronal o solicitud del ayuntamiento, firmada por todos los mayores de edad que se inscriben.");

  if (nat === "espanola") {
    items.push("Desde los 14 años, DNI en vigor. El pasaporte español se admite en los supuestos previstos para residentes en el extranjero hasta obtener el DNI. Por debajo de 14 años: libro de familia o certificado de nacimiento si carecen de los documentos de identidad previstos, y DNI si lo tienen.");
  } else if (nat === "ue") {
    items.push("Pasaporte o documento nacional de identidad en vigor del país de la UE/EEE/Suiza, junto con el certificado de registro con NIE si dispones de él. El padrón acredita residencia efectiva, no concede residencia legal.");
  } else if (nat === "resto") {
    if (nie === false) {
      items.push("Pasaporte en vigor. La TIE no es un requisito estatal para el alta: el artículo 15 de la Ley 7/1985 obliga a inscribir la residencia real. El documento identifica; no filtra.");
    } else {
      items.push("TIE o, en su defecto, pasaporte en vigor. El ayuntamiento identifica a la persona; no puede convertir el padrón en un permiso de residencia.");
    }
  } else {
    items.push("Documento de identidad en vigor según tu nacionalidad (DNI, documento UE, TIE o pasaporte).");
  }

  items.push("Los documentos caducados requieren la solicitud de renovación en los términos de las instrucciones padronales. Existen otros documentos admitidos con condiciones específicas; consulta la guía de identidad correspondiente si tu caso no encaja en esta lista.");

  if (answers.housing === "propietario") {
    items.push("Escritura, nota simple o último recibo de IBI, con referencia catastral cuando exista.");
  } else if (answers.housing === "contrato") {
    items.push("Contrato vigente de alquiler de vivienda habitual y documentación de pago. Confirma los documentos del procedimiento municipal; si faltan títulos, puede comprobarse la residencia por otros medios.");
  } else if (answers.housing === "sin-techo") {
    items.push("Acude a Servicios Sociales del municipio. Para un domicilio de referencia deben conocer tu residencia habitual, cumplir las condiciones de integración o coordinación pública, indicar la dirección y comprometerse a intentar las notificaciones. El informe social no sustituye por sí solo la identificación.");
  } else {
    items.push("Si ya hay personas empadronadas, la autorización debe firmarla un adulto ya inscrito en el domicilio que disponga de título de posesión efectiva. Acredita ambas condiciones y usa el modelo municipal cuando corresponda. Si no puedes obtener autorización, solicita comprobación de tu residencia real.");
  }

  if (answers.menores) {
    items.push("Identificación de cada menor según edad y nacionalidad; por debajo de 14 años se admite libro de familia o certificado de nacimiento si no dispone de los documentos previstos. Acredita representación y los consentimientos o autorización judicial que correspondan. La custodia exclusiva no sustituye por sí sola el consentimiento: los anexos I y II exigen sus supuestos concretos. Consulta también las actuaciones permitidas desde los 16 años.");
  }

  if (answers.tramite === "cambio") {
    items.push("Dentro del mismo municipio solicita cambio de domicilio. Si te trasladas a otro municipio de España, solicita el alta en destino: la coordinación padronal comunica la baja de origen, sin una baja previa que debas tramitar tú. Si te corresponde renovación bienal, el cambio solo la incluye cuando se realiza también la renovación expresa.");
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
