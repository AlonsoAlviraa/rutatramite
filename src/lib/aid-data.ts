import type { Dataset, WithContext } from "schema-dts";
import { AIDS, aidPhase, aidStatus } from "@/lib/ayudas";
import { SITE_ORIGIN, PRODUCT_NAME } from "@/lib/types";
import { aidCoverage } from "@/lib/aid-coverage";
import history from "../../data/aid-history.json";
import { DATASET_LICENSE, DATASET_LICENSE_URL } from "@/lib/dataset-license";

export const AID_DATA_PATH = "/recursos";
export const AID_DATA_REVIEWED = AIDS.map(a => a.checkedAt).sort().at(-1)!;

export function aidDataset(now = new Date()) {
  return {
    schema_version: "1.2",
    coverage: aidCoverage(),
    history,
    title: "Convocatorias seleccionadas de ayudas a estudiantes y alquiler",
    publisher: PRODUCT_NAME,
    documentation_url: `${SITE_ORIGIN}${AID_DATA_PATH}`,
    license_url: DATASET_LICENSE_URL,
    generated_at: now.toISOString(),
    last_editorial_review: AID_DATA_REVIEWED,
    scope: "Selección editorial, no exhaustiva. Información orientativa; consultar cada fuente oficial.",
    records: AIDS.map(a => ({
      id: a.id, name: a.name, category: a.category, territory: a.territory,
      phase: aidPhase(a, now), status: aidStatus(a, now), checked_at: a.checkedAt,
      opens_at: a.opensAt ?? null, closes_at: a.closesAt ?? null,
      opens_on: a.opensOn ?? null, closes_on: a.closesOn ?? null,
      deadline: a.deadline, summary: a.summary,
      guide_url: `${SITE_ORIGIN}${a.path}`, source_name: a.source.label, source_url: a.source.href,
    })),
  };
}

/** Quote every cell; prevent spreadsheet formulas if an editorial field changes. */
export function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  const safe = /^[=+@\-\t\r\n]/.test(text) ? "'" + text : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function aidCsv(now = new Date()) {
  const rows = aidDataset(now).records;
  const keys = Object.keys(rows[0]) as (keyof (typeof rows)[number])[];
  return "\uFEFF" + [keys.map(csvCell).join(","), ...rows.map(row => keys.map(k => csvCell(row[k])).join(","))].join("\r\n") + "\r\n";
}

export function aidDatasetJsonLd(): WithContext<Dataset> {
  return {
    "@context": "https://schema.org", "@type": "Dataset",
    "@id": `${SITE_ORIGIN}${AID_DATA_PATH}#dataset`,
    name: "Convocatorias seleccionadas de ayudas a estudiantes y alquiler",
    description: "Selección editorial de convocatorias de becas y alquiler en España, con territorio, fase, fechas de solicitud, fecha de revisión y enlaces oficiales. No es un registro exhaustivo ni confirma concesiones individuales.",
    url: `${SITE_ORIGIN}${AID_DATA_PATH}`,
    mainEntityOfPage: `${SITE_ORIGIN}${AID_DATA_PATH}`,
    creator: { "@type": "Organization", "@id": `${SITE_ORIGIN}#organization`, name: PRODUCT_NAME, url: SITE_ORIGIN },
    inLanguage: "es", dateModified: AID_DATA_REVIEWED,
    isAccessibleForFree: true,
    license: DATASET_LICENSE,
    spatialCoverage: { "@type": "Place", name: "España" },
    citation: [...new Set(AIDS.map(a => a.source.href))],
    distribution: [
      { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${SITE_ORIGIN}/datos/ayudas.json` },
      { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE_ORIGIN}/datos/ayudas.csv` },
    ],
  };
}
