import { describe, expect, it } from "vitest";
import { CUANDO_29N_GUIDES } from "@/lib/tramites/cuando-29n";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

const byPath = (p: string) => ALL_GUIDES.find((g) => g.path === p)!;

describe("guías «cuándo / qué pasa si» del 29-N (19-10-2026)", () => {
  it("nine pages, registered once, answer first, FAQPage", () => {
    expect(CUANDO_29N_GUIDES).toHaveLength(9);
    for (const g of CUANDO_29N_GUIDES) {
      expect(ALL_GUIDES.filter((x) => x.path === g.path)).toHaveLength(1);
      expect(g.description.length).toBeLessThanOrEqual(160);
      expect(g.lead).toMatch(/^Respuesta corta: /);
      expect(g.faqs!.length).toBeGreaterThanOrEqual(4);
      for (const s of g.sections) for (const r of s.table?.rows ?? []) expect(r.source.href).toMatch(/^https:\/\//);
      expect(g.related.some((r) => r.href === "/elecciones")).toBe(true);
      const h = renderGuideHtml(g.path);
      expect(h).toContain('"FAQPage"');
      expect(h).toMatch(/2026-10-(19|20|22)/);
    }
  });
  it("winner, calendar and practical guides link to the new pages", () => {
    const prog = byPath("/elecciones/programas-electorales-29n");
    expect(prog.title).toBe("Programas electorales del 29-N: cuándo salen y dónde verlos");
    expect(prog.related.some((r) => r.href === "/elecciones/debate-electoral-29n")).toBe(true);
    const cal = byPath("/elecciones/calendario-29-noviembre");
    for (const p of ["sorteo-mesa-electoral-29n", "candidaturas-29n-boe", "cuando-habra-gobierno-29n"]) expect(cal.related.some((r) => r.href === `/elecciones/${p}`)).toBe(true);
    expect(byPath("/elecciones/miembro-de-mesa").related.some((r) => r.href === "/elecciones/excusa-mesa-electoral")).toBe(true);
    for (const g of CUANDO_29N_GUIDES) expect(g.related.some((r) => r.href === "/elecciones/programas-electorales-29n" || g.cta.href === "/elecciones/programas-electorales-29n" || g.secondaryCta?.href === "/elecciones/programas-electorales-29n")).toBe(true);
  });
  it("debate page lists every party response with a dated source and no confirmed date claim", () => {
    const d = byPath("/elecciones/debate-electoral-29n");
    const rows = d.sections.find((s) => s.id === "partidos")!.table!.rows;
    for (const r of rows) expect(r.cells[2]).toMatch(/\d{2}-\d{2}-2026/);
    expect(d.lead).toMatch(/no hemos encontrado ningún debate con fecha cerrada/);
  });
});
