import { describe, expect, it } from "vitest";
import { buildSitemapEntries } from "@/lib/seo/sitemapEntries";
import { SITEMAP_SECTIONS, sectionEntries, sectionOf, sitemapIndexXml } from "@/lib/seo/sitemapSections";
import { isProvinciaIndexable, indexableProvincias } from "@/lib/seo/provinciaIndex";
import { latestGuides } from "@/lib/seo/latest";
import fs from "node:fs";

describe("crawl discovery 2026-10-13", () => {
  const all = buildSitemapEntries();
  it("child sitemaps partition every sitemap URL exactly once, with lastmod", () => {
    const sum = SITEMAP_SECTIONS.reduce((n, s) => n + sectionEntries(s).length, 0);
    expect(sum).toBe(all.length);
    for (const s of SITEMAP_SECTIONS) expect(sectionEntries(s).length, s).toBeGreaterThan(0);
    expect(sectionEntries("promesas").every((e) => e.url.includes("/elecciones/promesas"))).toBe(true);
    expect(sectionOf("https://rutatramite.com/trabajo/vida-laboral")).toBe("trabajo");
    const idx = sitemapIndexXml();
    expect(idx).toContain("<sitemapindex");
    for (const s of SITEMAP_SECTIONS) expect(idx).toContain(`/sitemaps/${s}.xml</loc><lastmod>`);
  });
  it("public/sitemap.xml (python) matches Next entries", () => {
    const xml = fs.readFileSync("public/sitemap.xml", "utf8");
    const py = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
    const ts = new Set(all.map((e) => e.url));
    expect([...ts].filter((u) => !py.has(u))).toEqual([]);
    expect([...py].filter((u) => !ts.has(u))).toEqual([]);
  });
  it("thin provincias are out; provincias with capital fichas stay", () => {
    expect(indexableProvincias().size).toBeGreaterThan(5);
    expect(isProvinciaIndexable("comunidad-de-madrid", "madrid")).toBe(true);
    const prov = all.filter((e) => /\/empadronarse\/[^/]+\/[^/]+$/.test(e.url.replace("https://rutatramite.com", "")));
    expect(prov.length).toBe(indexableProvincias().size);
  });
  it("latest guides are sorted newest first", () => {
    const l = latestGuides(12);
    expect(l).toHaveLength(12);
    for (let i = 1; i < l.length; i++) expect(l[i - 1].reviewedAt >= l[i].reviewedAt).toBe(true);
  });
});
