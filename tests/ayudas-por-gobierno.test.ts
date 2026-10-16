import { describe, expect, it } from "vitest";
import { AYUDAS_GOBIERNO_GUIDES } from "@/lib/tramites/ayudas-por-gobierno";
import { ALL_GUIDES, getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";
import { renderLlmsTxt } from "@/lib/seo/llms";

const GOVS = ["Aznar", "Zapatero", "Rajoy", "Sánchez"];

describe("ayudas según cada gobierno (2026-10-12)", () => {
  it("publishes 7 persona guides under /ayudas-por-gobierno with BOE sources per row", () => {
    expect(AYUDAS_GOBIERNO_GUIDES).toHaveLength(7);
    expect(new Set(ALL_GUIDES.map((g) => g.path)).size).toBe(ALL_GUIDES.length);
    expect(new Set(ALL_GUIDES.map((g) => g.title)).size).toBe(ALL_GUIDES.length);
    for (const g of AYUDAS_GOBIERNO_GUIDES) {
      expect(g.path.startsWith("/ayudas-por-gobierno/"), g.path).toBe(true);
      expect(g.pack).toBe("ayudas-gobierno");
      expect(g.reviewedAt).toBe("2026-10-12");
      expect(g.description.length, g.path).toBeGreaterThanOrEqual(110);
      expect(g.description.length, g.path).toBeLessThanOrEqual(158);
      expect(getGuideByPath(g.path)).toBe(g);
      const table = g.sections.find((s) => s.table)?.table;
      expect(table, g.path).toBeTruthy();
      for (const row of table!.rows) expect(row.source.href, g.path).toMatch(/^https:\/\/www\.boe\.es\//);
      // every government appears in every persona timeline (symmetry)
      for (const gov of GOVS) expect(table!.rows.some((r) => r.cells[0].startsWith(gov)), `${g.path} ${gov}`).toBe(true);
      expect(g.disclaimer).toContain("no partidista");
      expect(g.faqs?.length ?? 0).toBeGreaterThanOrEqual(3);
    }
  });

  it("uses no value judgements", () => {
    const text = JSON.stringify(AYUDAS_GOBIERNO_GUIDES).toLowerCase();
    for (const w of ["mejor gobierno", "peor gobierno", "vota a", "votar a", "regalo", "ataque", "desastre"]) expect(text).not.toContain(w);
  });

  it("renders the table and verified amounts", () => {
    expect(renderGuideHtml("/ayudas-por-gobierno/familias")).toContain("2.500 €");
    expect(renderGuideHtml("/ayudas-por-gobierno/jovenes-alquiler")).toContain("250 € al mes");
    expect(renderGuideHtml("/ayudas-por-gobierno/jubilados")).toContain("0,25 %");
    expect(renderGuideHtml("/ayudas-por-gobierno/estudiantes")).toContain("data-guide-table");
  });

  it("features the hub in llms.txt", () => {
    expect(renderLlmsTxt()).toContain("https://rutatramite.com/ayudas-por-gobierno");
  });
});
