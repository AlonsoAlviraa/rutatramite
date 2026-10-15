import exp from "../../data/promesas-29n/export.json";
import { SITE_ORIGIN } from "@/lib/types";
import { DATASET_LICENSE } from "@/lib/dataset-license";

export const PROMESAS_EXPORT = exp;
const SHORT: Record<string, string> = { pp: "PP", psoe: "PSOE", vox: "Vox", "frente-amplio": "Frente Amplio", podemos: "Podemos" };
export const partyShort = (id: string) => SHORT[id] ?? id;

const COLS = ["id", "partido", "tema", "medida", "cita_literal", "fuente_url", "fuente_titulo", "fuente_fecha", "tipo_fuente", "nivel", "perfiles", "aplicacion_regimen_comun", "aplicacion_pais_vasco_navarra", "aplicacion_canarias", "aplicacion_ceuta_melilla", "datos_actualizados"];
const esc = (v: unknown) => {
  const s = String(v ?? "");
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
export function promesasCsv(): string {
  const rows = exp.promises.map((p) => [p.id, partyShort(p.party), (exp.topics as Record<string, string>)[p.topic] ?? p.topic, p.measure, p.quote, p.source_url, p.source_title, p.source_date, p.source_type, p.level, p.profiles.join("|"), p.aplicacion.regimen_comun, p.aplicacion.pais_vasco_navarra, p.aplicacion.canarias, p.aplicacion.ceuta_melilla, exp.updated]);
  return "\uFEFF" + [COLS, ...rows].map((r) => r.map(esc).join(",")).join("\n") + "\n";
}

/** Matriz partido × tema: número de medidas con fuente (0 = pendiente de programa). */
export function promesasMatrix() {
  const topics = Object.entries(exp.topics as Record<string, string>);
  return {
    topics,
    rows: exp.parties.map((pa) => ({ id: pa.id, name: partyShort(pa.id), programa: pa.programa29n, web: pa.web, counts: topics.map(([t]) => exp.promises.filter((p) => p.party === pa.id && p.topic === t).length) })),
  };
}

export function promesasDatasetJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: exp.name,
    description: `Medidas anunciadas por PP, PSOE, Vox, Frente Amplio y Podemos para las elecciones generales del 29 de noviembre de 2026, con cita literal, enlace a la fuente, fecha, tipo de fuente y cómo se aplicaría cada medida según el régimen territorial (común, foral, Canarias, Ceuta y Melilla). Los partidos sin programa publicado figuran como «pendiente de programa».`,
    url: `${SITE_ORIGIN}/elecciones/promesas`,
    dateModified: exp.updated,
    temporalCoverage: `2026-01-01/${exp.updated}`,
    spatialCoverage: { "@type": "Place", name: "España" },
    inLanguage: "es",
    isAccessibleForFree: true,
    keywords: ["elecciones generales 29 de noviembre de 2026", "promesas electorales", "programas electorales", "comunidades autónomas"],
    license: DATASET_LICENSE,
    creator: { "@type": "Organization", name: "RutaTrámite", url: SITE_ORIGIN },
    measurementTechnique: `${SITE_ORIGIN}/elecciones/promesas/metodologia`,
    distribution: ["json", "csv"].map((f) => ({ "@type": "DataDownload", encodingFormat: f === "json" ? "application/json" : "text/csv", contentUrl: `${SITE_ORIGIN}/datos/promesas-29n.${f}` })),
  };
}
