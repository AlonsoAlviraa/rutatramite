import { describe, expect, it } from "vitest";
import { MESA_29N_20261023_GUIDES } from "@/lib/tramites/mesa-29n-20261023";
import { ALL_GUIDES, getGuideByPath } from "@/lib/tramites/catalog";
import { RELATED_LINKS } from "@/lib/seo/relatedLinks";
import { readFileSync, existsSync } from "node:fs";

const OFFICIAL = /^https:\/\/(www\.)?(boe\.es|juntaelectoralcentral\.es|infoelectoral\.interior\.gob\.es|ine\.es|elcorreoweb\.es)\//;

describe("clúster mesa electoral 29-N (23-10-2026)", () => {
  it("five new pages, registered once, sourced, with FAQs and «Cómo revisamos»", () => {
    expect(MESA_29N_20261023_GUIDES).toHaveLength(10);
    for (const g of MESA_29N_20261023_GUIDES) {
      expect(getGuideByPath(g.path)).toBe(g);
      expect(ALL_GUIDES.filter((x) => x.path === g.path)).toHaveLength(1);
      expect(ALL_GUIDES.filter((x) => x.title === g.title)).toHaveLength(1);
      expect(g.reviewedAt).toBe("2026-10-23");
      expect(g.description.length).toBeGreaterThanOrEqual(110);
      expect(g.description.length).toBeLessThanOrEqual(158);
      expect(g.faqs.length).toBeGreaterThanOrEqual(3);
      expect(g.sections.some((s) => s.id === "como-revisamos")).toBe(true);
      for (const s of g.sources ?? []) expect(s.href).toMatch(OFFICIAL);
    }
  });
  it("existing pages are expanded and link to the new ones", () => {
    const ex = getGuideByPath("/elecciones/excusa-mesa-electoral")!;
    expect(ex.reviewedAt).toBe("2026-10-23");
    expect(ex.related.some((r) => r.href === "/elecciones/modelo-escrito-excusa-mesa-electoral")).toBe(true);
    expect(RELATED_LINKS["/elecciones/excusa-mesa-electoral"]).toContain("/elecciones/excusa-mesa-electoral-denegada");
  });
  it("model letter ships as DOCX and PDF and is in the sitemap list", () => {
    expect(existsSync("public/plantillas/escrito-excusa-mesa-electoral.docx")).toBe(true);
    expect(existsSync("public/plantillas/escrito-excusa-mesa-electoral.pdf")).toBe(true);
    const sm = readFileSync("scripts/build_sitemaps.py", "utf8");
    for (const g of MESA_29N_20261023_GUIDES) expect(sm).toContain(`"${g.path}"`);
  });
});
