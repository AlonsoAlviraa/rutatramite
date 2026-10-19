import { describe, expect, it } from "vitest";
import { VOTO_NULO_CASOS_GUIDES } from "@/lib/tramites/voto-nulo-casos";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

const byPath = (p: string) => ALL_GUIDES.find((g) => g.path === p)!;
const HUB = "/elecciones/voto-nulo-ejemplos";

describe("voto nulo: hub + casos (19-10-2026)", () => {
  it("five pages, registered once, answer first, LOREG cited, FAQPage", () => {
    expect(VOTO_NULO_CASOS_GUIDES).toHaveLength(5);
    for (const g of VOTO_NULO_CASOS_GUIDES) {
      expect(ALL_GUIDES.filter((x) => x.path === g.path)).toHaveLength(1);
      expect(g.description.length).toBeLessThanOrEqual(160);
      expect(g.lead).toMatch(/^Respuesta corta: /);
      expect(g.sources.some((s) => s.href.includes("BOE-A-1985-11672#anoventayseis"))).toBe(true);
      for (const s of g.sections) for (const r of s.table?.rows ?? []) expect(r.source.href).toMatch(/^https:\/\//);
      for (const p of ["/elecciones/a-quien-beneficia-el-voto-en-blanco", "/elecciones/resultados-y-escrutinio", "/elecciones"]) expect(g.related.some((r) => r.href === p)).toBe(true);
      const h = renderGuideHtml(g.path);
      expect(h).toContain('"FAQPage"');
    }
  });
  it("hub has the 10+ cases and existing guides link to it", () => {
    expect(byPath(HUB).sections.find((s) => s.id === "tabla")!.table!.rows.length).toBeGreaterThanOrEqual(10);
    for (const p of ["voto-nulo-y-voto-en-blanco", "resultados-y-escrutinio", "como-votar-al-senado", "a-quien-beneficia-el-voto-en-blanco", "que-pasa-si-no-voto"])
      expect(byPath(`/elecciones/${p}`).related.some((r) => r.href === HUB)).toBe(true);
  });
});
