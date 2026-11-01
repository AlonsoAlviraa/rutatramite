import { describe, expect, it } from "vitest";
import { GUIAS_LOCALES } from "@/lib/ficha/guiasLocales-20261101";
import { GUIA_REGIONAL } from "@/lib/hub/guiaRegional-20261101";

describe("lote de calidad 2026-11-01", () => {
  it("cada guía local tiene ejemplo, datos con fuente, FAQ propias y fecha", () => {
    expect(Object.keys(GUIAS_LOCALES).sort()).toEqual(["03014", "07040", "08019", "29067", "30030", "41091", "46250", "50297"]);
    const intros = new Set<string>();
    for (const [ine, g] of Object.entries(GUIAS_LOCALES)) {
      expect(g.reviewedOn, ine).toBe("2026-11-01");
      expect(g.ejemplo.pasos.length, ine).toBeGreaterThanOrEqual(4);
      expect(g.datos.length, ine).toBeGreaterThanOrEqual(5);
      for (const d of g.datos) expect(d[2], ine).toMatch(/\./);
      expect(g.faqs.length, ine).toBeGreaterThanOrEqual(2);
      expect(g.enlaces.some((l) => l.href.startsWith("https://")), ine).toBe(true);
      intros.add(g.intro[0]);
    }
    expect(intros.size).toBe(8);
  });
  it("las guías regionales enlazan fichas y fuentes oficiales", () => {
    for (const slug of ["extremadura", "la-rioja"]) {
      const g = GUIA_REGIONAL[slug];
      expect(g.ciudades.length).toBeGreaterThan(0);
      for (const c of g.ciudades) {
        expect(c.ficha).toMatch(new RegExp(`^/empadronarse/${slug}/`));
        expect(c.fuentes.every((f) => f.href.startsWith("https://"))).toBe(true);
      }
      expect(g.faqs.length).toBeGreaterThanOrEqual(2);
    }
  });
});
