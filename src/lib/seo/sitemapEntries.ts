import type { MetadataRoute } from "next";
import { loadIndex, loadMunicipio } from "@/lib/data/load";
import { allCcaaHubs, loadTerritories } from "@/lib/geo/territories";
import { isFichaIndexable } from "@/lib/seo/localSignals";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { LAST_VERIFIED } from "@/lib/tramites/facts";
import { PACK_INDEX_PATH } from "@/lib/tramites/types";
import { ESCENARIO_SLUGS, SITE_ORIGIN } from "@/lib/types";

export const EDITORIAL_LASTMOD = "2026-09-07";

const STATIC_HUBS = [
  "/",
  "/empadronarse",
  "/dni",
  "/pasaporte",
  "/extranjeria",
  "/mudanza",
  "/colegio",
  "/comedor",
  "/fp",
  "/bebe",
  "/becas",
  "/modelos",
  "/metodologia",
  "/fuentes",
  "/aviso-legal",
  "/privacidad",
  "/contacto",
] as const;

function loc(path: string): string {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const push = (path: string, lastModified?: string) => {
    const url = loc(path);
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({
      url,
      ...(lastModified ? { lastModified } : {}),
    });
  };

  for (const path of STATIC_HUBS) {
    push(path, path === "/empadronarse" ? LAST_VERIFIED : EDITORIAL_LASTMOD);
  }
  for (const slug of ESCENARIO_SLUGS) {
    push(`/empadronarse/${slug}`, LAST_VERIFIED);
  }
  for (const pack of Object.values(PACK_INDEX_PATH)) {
    push(pack, EDITORIAL_LASTMOD);
  }
  for (const guide of ALL_GUIDES) {
    push(guide.path, guide.reviewedAt ?? LAST_VERIFIED);
  }

  const t = loadTerritories();
  for (const c of allCcaaHubs()) {
    push(`/empadronarse/${c.slug}`, EDITORIAL_LASTMOD);
    for (const code of c.province_codes) {
      const p = t.provinces[code];
      if (p) push(`/empadronarse/${c.slug}/${p.slug}`, EDITORIAL_LASTMOD);
    }
  }

  for (const row of loadIndex()) {
    const rec = loadMunicipio(row.ine_code);
    if (isFichaIndexable(rec)) push(rec.path, rec.last_verified);
  }

  return entries;
}

export function sitemapXml(entries: MetadataRoute.Sitemap = buildSitemapEntries()): string {
  const urls = entries
    .map((e) => {
      const modified =
        e.lastModified != null
          ? `<lastmod>${typeof e.lastModified === "string" ? e.lastModified : e.lastModified.toISOString().slice(0, 10)}</lastmod>`
          : "";
      return `  <url><loc>${e.url}</loc>${modified}</url>`;
    })
    .join("\n");
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls +
    "\n</urlset>\n"
  );
}
