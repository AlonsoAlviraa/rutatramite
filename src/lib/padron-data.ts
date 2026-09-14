import fs from "node:fs";
import path from "node:path";
import { loadMunicipio } from "@/lib/data/load";
import { isFichaIndexable, localSignalCount } from "@/lib/seo/localSignals";
import { SITE_ORIGIN } from "@/lib/types";
import { csvCell } from "@/lib/aid-data";

export function padronDataset() {
  const selected = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/municipal-reviews.json"), "utf8"));
  return {
    schema_version: "1.0", documentation_url: `${SITE_ORIGIN}/recursos/padron-municipal`,
    scope: "Madrid y 20 municipios seleccionados. Revisión del alta ordinaria; no cubre todos los procedimientos ni todos los municipios.",
    records: Object.keys(selected).map(code => {
      const m = loadMunicipio(code);
      return { ine_code: code, name: m.name, territory: m.ccaa_name, guide_url: SITE_ORIGIN + m.path,
        review_status: isFichaIndexable(m) ? "verificado" : "pendiente", reviewed_on: m.reviewed_on ?? null,
        note: m.review_note ?? null, local_signals: localSignalCount(m),
        procedure_url: m.tramite_alta_url, online: m.evidence?.canal ? m.online : "unknown",
        appointment: m.evidence?.canal ? m.cita_previa : "unknown", appointment_url: m.cita_url,
        documents: m.evidence?.docs_extra ? m.docs_extra : [], evidence: m.evidence ?? {}, sources: m.source_urls };
    }).sort((a,b) => a.name.localeCompare(b.name, "es"))
  };
}

export function padronCsv() {
  const fields = ["ine_code", "name", "territory", "guide_url", "review_status", "reviewed_on", "note", "local_signals", "procedure_url", "online", "appointment", "appointment_url", "documents", "evidence", "sources"] as const;
  const quote = (value: unknown) => csvCell(typeof value === "object" && value !== null ? JSON.stringify(value) : value);
  return "\uFEFF" + [fields.join(","), ...padronDataset().records.map(row => fields.map(key => quote(row[key])).join(","))].join("\r\n") + "\r\n";
}
