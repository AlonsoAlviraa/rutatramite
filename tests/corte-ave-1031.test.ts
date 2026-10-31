import { describe, expect, it } from "vitest";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { P_CORTE_AVE, CORTE_AVE_1031_UPDATED } from "@/lib/tramites/corte-ave-20261031";

const all = (p: string) => ALL_GUIDES.filter((g) => g.path === p);
const text = (p: string) => JSON.stringify(all(p)[0]);

describe("corte AVE Madrid–Andalucía 31-10", () => {
  it("guía única en /transporte con meta corta, firma, FAQ y fuentes", () => {
    expect(all(P_CORTE_AVE)).toHaveLength(1);
    const g = all(P_CORTE_AVE)[0];
    expect(g.pack).toBe("transporte");
    expect(g.description.length).toBeLessThanOrEqual(158);
    expect(g.title.length).toBeLessThanOrEqual(62);
    expect(g.faqs!.length).toBeGreaterThanOrEqual(6);
    expect(g.sources!.length).toBeGreaterThanOrEqual(8);
    expect(g.sources!.every((s) => s.href.startsWith("https://"))).toBe(true);
    expect(g.sections.some((s) => s.id === "byline" && s.paragraphs[0].includes("Por Equipo RutaTrámite"))).toBe(true);
    for (const id of ["estado-servicio", "renfe", "iryo", "ouigo", "derechos", "reclamar"]) expect(g.sections.some((s) => s.id === id)).toBe(true);
  });
  it("no publica datos no verificados", () => {
    const t = text(P_CORTE_AVE);
    for (const bad of ["912 320 320", "14 de noviembre", "Movelia", "200 %", "Real Decreto-ley 1/2026"]) expect(t.includes(bad)).toBe(false);
  });
  it("amplía las 3 guías una sola vez, con fecha y enlaces cruzados", () => {
    expect(CORTE_AVE_1031_UPDATED).toHaveLength(3);
    for (const p of CORTE_AVE_1031_UPDATED) {
      const g = all(p)[0];
      expect(g.reviewedAt).toBe("2026-10-31");
      const ids = g.sections.map((s) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(new Set(g.faqs!.map((f) => f.q)).size).toBe(g.faqs!.length);
    }
    for (const p of ["/elecciones/voto-por-correo", "/elecciones/transporte-para-ir-a-votar-29n"]) {
      const g = all(p)[0];
      expect(g.related.some((r) => r.href === P_CORTE_AVE)).toBe(true);
      expect(g.sections.find((s) => s.id === "corte-ave")!.paragraphs.join(" ") + JSON.stringify(g.sections.find((s) => s.id === "corte-ave")!.lists)).toMatch(/19 de noviembre[\s\S]*25/);
    }
    const f = all("/elecciones/ficha-tecnica-encuesta")[0];
    expect(f.sections.some((s) => s.id === "declaracion-no-es-encuesta")).toBe(true);
  });
  it("mantiene intactos los títulos protegidos", () => {
    expect(all("/elecciones/voto-por-correo")[0].title).toBe("Voto por correo: solicitud hasta el 19 de noviembre");
  });
});
