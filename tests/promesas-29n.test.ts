import { describe, expect, it } from "vitest";
import { PROMESAS_29N_GUIDES, ELECCIONES_EXPLICADORES_GUIDES } from "@/lib/tramites/promesas-29n";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";
import data from "../data/promesas-29n/promises.json";

const PARTIES = ["pp", "psoe", "vox", "frente-amplio", "podemos"];

describe("promesas 29-N", () => {
  it("unique paths/titles and valid descriptions", () => {
    expect(new Set(ALL_GUIDES.map((g) => g.path)).size).toBe(ALL_GUIDES.length);
    expect(new Set(ALL_GUIDES.map((g) => g.title)).size).toBe(ALL_GUIDES.length);
    for (const g of [...PROMESAS_29N_GUIDES, ...ELECCIONES_EXPLICADORES_GUIDES]) {
      expect(g.description.length, g.path).toBeGreaterThanOrEqual(110);
      expect(g.description.length, g.path).toBeLessThanOrEqual(158);
      expect(g.faqs?.length ?? 0, g.path).toBeGreaterThanOrEqual(1);
      expect(g.reviewedAt).toBe("2026-10-13");
    }
  });
  it("every promise has url, date, quote and known party", () => {
    for (const p of data.promises) {
      expect(p.source_url, p.id).toMatch(/^https:\/\//);
      expect(p.source_date, p.id).toMatch(/^2026-\d\d/);
      expect(p.quote.length, p.id).toBeGreaterThan(10);
      expect(PARTIES).toContain(p.party);
    }
  });
  it("symmetry: every topic comparator and profile has a section per party in fixed order", () => {
    const sym = PROMESAS_29N_GUIDES.filter((g) => /que-propone-cada-partido|perfil-/.test(g.path));
    expect(sym.length).toBe(13);
    for (const g of sym) expect(g.sections.slice(0, 5).map((s) => s.id), g.path).toEqual(PARTIES);
    const parties = PROMESAS_29N_GUIDES.filter((g) => g.path.includes("/partido-"));
    expect(parties.length).toBe(5);
    for (const g of parties) expect(g.sections.map((s) => s.id)).toEqual(["ficha", "vivienda", "impuestos", "empleo", "inmigracion", "administracion", "pensiones"]);
  });
  it("19 territories summing 350 seats", () => {
    const cc = PROMESAS_29N_GUIDES.filter((g) => g.path.includes("/comunidad-"));
    expect(cc.length).toBe(19);
    const seats = cc.map((g) => Number(/elige (\d+) diputad/.exec(g.lead)![1])).reduce((a, b) => a + b, 0);
    expect(seats).toBe(350);
  });
  it("no value judgements or vote advice", () => {
    const text = JSON.stringify([PROMESAS_29N_GUIDES, ELECCIONES_EXPLICADORES_GUIDES]).toLowerCase();
    for (const w of ["vota a ", "votar a ", "mejor partido", "peor partido", "mentira", "bulo de"]) expect(text).not.toContain(w);
  });
  it("renders tables and IGIC note", () => {
    expect(renderGuideHtml("/elecciones/promesas/comunidad-canarias")).toContain("IGIC");
    expect(renderGuideHtml("/elecciones/promesas/que-propone-cada-partido-vivienda")).toContain("data-guide-table");
    expect(renderGuideHtml("/elecciones/iva-vivienda-4-por-ciento")).toContain("12.000");
  });
});
