import type { MunicipioIndexEntry } from "@/lib/types";

/** Fields the wizard + typeahead actually read. Avoid shipping the full index row twice on the home payload. */
export type ClientMunicipio = {
  ine_code: string;
  name: string;
  path: string;
  province_name: string;
  ccaa_name: string;
  docs_extra: string[];
  sede_url: string | null;
  cita_url: string | null;
  confidence: MunicipioIndexEntry["confidence"];
  search_alias?: string;
};

export function slimClientIndex(index: MunicipioIndexEntry[]): ClientMunicipio[] {
  return index.map((m) => ({
    ine_code: m.ine_code,
    name: m.name,
    path: m.path,
    province_name: m.province_name,
    ccaa_name: m.ccaa_name,
    docs_extra: m.docs_extra,
    sede_url: m.sede_url,
    cita_url: m.cita_url,
    confidence: m.confidence,
    ...(m.search_alias ? { search_alias: m.search_alias } : {}),
  }));
}
