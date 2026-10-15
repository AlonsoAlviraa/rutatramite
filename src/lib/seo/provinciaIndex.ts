import { loadIndex, loadMunicipio } from "@/lib/data/load";
import { isFichaIndexable } from "@/lib/seo/localSignals";

/**
 * 2026-10-13: provincia hubs are thin near-duplicates. Only those that lead to at least one
 * indexable municipal ficha (capitals) stay indexable; the rest are noindex,follow and out of the sitemap.
 * Keep in lockstep with scripts/build_sitemaps.py (provincia_indexable).
 */
let cache: Set<string> | null = null;
export function indexableProvincias(): Set<string> {
  if (cache) return cache;
  const out = new Set<string>();
  for (const row of loadIndex()) {
    if (isFichaIndexable(loadMunicipio(row.ine_code))) out.add(`${row.ccaa_slug}/${row.province_slug}`);
  }
  cache = out;
  return out;
}
export function isProvinciaIndexable(ccaa: string, provincia: string): boolean {
  return indexableProvincias().has(`${ccaa}/${provincia}`);
}
