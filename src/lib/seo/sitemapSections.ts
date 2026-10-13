import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "@/lib/seo/sitemapEntries";
import { SITE_ORIGIN } from "@/lib/types";

/** Thematic child sitemaps (2026-10-13) so Search Console shows indexation per section. */
export const SITEMAP_SECTIONS = ["promesas", "elecciones", "ayudas", "becas", "trabajo", "dni", "empadronamiento", "extranjeria", "familia", "modelos", "general"] as const;
export type SitemapSection = (typeof SITEMAP_SECTIONS)[number];

export function sectionOf(url: string): SitemapSection {
  const p = url.replace(SITE_ORIGIN, "") || "/";
  const seg = p.split("/")[1] ?? "";
  if (p.startsWith("/elecciones/promesas")) return "promesas";
  if (seg === "elecciones") return "elecciones";
  if (["ayudas", "ayudas-por-gobierno", "alquiler"].includes(seg)) return "ayudas";
  if (seg === "becas") return "becas";
  if (seg === "trabajo") return "trabajo";
  if (["dni", "pasaporte"].includes(seg)) return "dni";
  if (["empadronarse", "recursos"].includes(seg)) return "empadronamiento";
  if (seg === "extranjeria") return "extranjeria";
  if (["bebe", "colegio", "comedor", "fp", "transporte", "mudanza", "hacienda"].includes(seg)) return "familia";
  if (["", "metodologia", "fuentes", "aviso-legal", "privacidad", "contacto", "descargas"].includes(seg)) return "general";
  return "modelos";
}

function day(d: MetadataRoute.Sitemap[number]["lastModified"]): string | undefined {
  if (d == null) return undefined;
  return typeof d === "string" ? d.slice(0, 10) : d.toISOString().slice(0, 10);
}

export function sectionEntries(section: SitemapSection): MetadataRoute.Sitemap {
  return buildSitemapEntries().filter((e) => sectionOf(e.url) === section);
}

export function sitemapIndexXml(): string {
  const all = buildSitemapEntries();
  const rows = SITEMAP_SECTIONS.map((s) => {
    const dates = all.filter((e) => sectionOf(e.url) === s).map((e) => day(e.lastModified)).filter(Boolean).sort() as string[];
    const last = dates.at(-1);
    return `  <sitemap><loc>${SITE_ORIGIN}/sitemaps/${s}.xml</loc>${last ? `<lastmod>${last}</lastmod>` : ""}</sitemap>`;
  });
  return '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + rows.join("\n") + "\n</sitemapindex>\n";
}
