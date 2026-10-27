import { describe, expect, it } from "vitest";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { EMPADRONAMIENTO_1027_PATHS } from "@/lib/tramites/empadronamiento-20261027";

describe("cluster empadronamiento 27-10", () => {
  it("registra las 3 guías con fuentes, FAQ y descripción corta", () => {
    for (const p of EMPADRONAMIENTO_1027_PATHS) {
      const g = ALL_GUIDES.find((x) => x.path === p)!;
      expect(g).toBeTruthy();
      expect(g.sources!.length).toBeGreaterThan(1);
      expect(g.faqs!.length).toBeGreaterThanOrEqual(4);
      expect(g.description.length).toBeLessThanOrEqual(160);
      expect(g.related.some((r) => r.href === "/empadronarse")).toBe(true);
    }
  });
  it("enlaza desde cambio-de-domicilio-y-censo", () => {
    const g = ALL_GUIDES.find((x) => x.path === "/elecciones/cambio-de-domicilio-y-censo")!;
    expect(g.related.some((r) => r.href === "/empadronarse/padron-y-voto-29n")).toBe(true);
  });
  it("Plan Auto+ cita la fuente del presupuesto", () => {
    const g = ALL_GUIDES.find((x) => x.path === "/trabajo/plan-auto-plus-ayuda-coche-electrico")!;
    expect(g.sources!.some((s) => s.href.includes("mintur.gob.es"))).toBe(true);
  });
});
