import type { Municipio } from "@/lib/types";

/** Playbook anti-thin: ≥5 of these 7 local signals, or the ficha is a stub. */
export const LOCAL_SIGNAL_IDS = [
  "sede_url",
  "canal",
  "cita",
  "oficina",
  "contacto_municipal",
  "docs_extra",
  "last_verified_fuente",
] as const;

export type LocalSignalId = (typeof LOCAL_SIGNAL_IDS)[number];

const AYUNTAMIENTO_HOST_RE = /^https?:\/\//i;

function isAyuntamientoUrl(url: string | null | undefined): boolean {
  if (!url || !AYUNTAMIENTO_HOST_RE.test(url)) return false;
  return !/rutatramite\.(com|es)/i.test(url);
}

export function localSignals(m: Municipio): LocalSignalId[] {
  const out: LocalSignalId[] = [];
  if (isAyuntamientoUrl(m.sede_url)) out.push("sede_url");
  const canalKnown =
    m.online === true ||
    m.online === false ||
    m.online === "partial" ||
    m.cita_previa === "required" ||
    m.cita_previa === "recommended" ||
    m.cita_previa === "walk-in";
  if (canalKnown) out.push("canal");
  if (m.cita_url || m.cita_previa === "walk-in") out.push("cita");
  if (m.oficinas?.some((o) => (o.direccion ?? "").trim().length > 0)) out.push("oficina");
  if (m.oficinas?.some((o) => (o.telefono ?? "").trim().length > 0)) out.push("contacto_municipal");
  if ((m.docs_extra?.length ?? 0) > 0) out.push("docs_extra");
  if (m.last_verified && (m.source_urls?.length ?? 0) > 0) out.push("last_verified_fuente");
  return out;
}

export function localSignalCount(m: Municipio): number {
  return localSignals(m).length;
}

/** Indexable only when published and the playbook anti-thin bar is met. */
export function isFichaIndexable(m: Municipio): boolean {
  return m.status === "published" && m.confidence === "official" && localSignalCount(m) >= 5;
}
