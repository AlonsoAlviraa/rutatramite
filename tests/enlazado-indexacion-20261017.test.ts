import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import { renderLlmsTxt } from "@/lib/seo/llms";
import { HOME_PRIORITY_LINKS } from "@/lib/seo/priorityLinks";
import { RELATED_LINKS } from "@/lib/seo/relatedLinks";
import { buildSitemapEntries } from "@/lib/seo/sitemapEntries";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { SITE_ORIGIN } from "@/lib/types";

const sitemapPaths = new Set(
  buildSitemapEntries().map((e) => (e.url === `${SITE_ORIGIN}/` ? "/" : e.url.slice(SITE_ORIGIN.length))),
);

describe("enlazado e indexación 2026-10-17", () => {
  it("la portada enlaza entre 20 y 30 guías prioritarias, todas del sitemap y sin duplicados", () => {
    const hrefs = HOME_PRIORITY_LINKS.flatMap((g) => g.links.map((l) => l.href));
    expect(hrefs.length).toBeGreaterThanOrEqual(20);
    expect(hrefs.length).toBeLessThanOrEqual(30);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const h of hrefs) expect(sitemapPaths.has(h), h).toBe(true);
    const home = fs.readFileSync(path.join(process.cwd(), "src/app/page.tsx"), "utf8");
    expect(home).toContain("HOME_PRIORITY_LINKS");
    expect(home).toContain('aria-labelledby="respuestas-rapidas-title"');
  });

  it("los enlaces relacionados de los hubs apuntan a guías del catálogo", () => {
    const guides = new Set(ALL_GUIDES.map((g) => g.path));
    for (const [hub, list] of Object.entries(RELATED_LINKS)) {
      for (const p of list) expect(guides.has(p), `${hub} -> ${p}`).toBe(true);
    }
  });

  it("llms.txt incluye todas las URL canónicas indexables del sitemap", () => {
    const txt = renderLlmsTxt();
    for (const e of buildSitemapEntries()) expect(txt, e.url).toContain(`(${e.url})`);
    expect(txt.split("\n").length).toBeLessThan(200);
    expect(fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf8")).toBe(txt);
  });

  it("Organization JSON-LD declara el canal de YouTube en sameAs", () => {
    const org = organizationJsonLd() as unknown as { sameAs: string[] };
    expect(org.sameAs).toContain("https://www.youtube.com/@rutatramitebot");
    expect(org.sameAs).toContain("https://www.youtube.com/channel/UCMya0aRWeiB-4tSefDaeKUQ");
  });
});
