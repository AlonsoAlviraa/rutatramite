import { describe, expect, it } from "vitest";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { MESAS_CIUDADES_1031_GUIDES } from "@/lib/tramites/mesas-ciudades-20261031";
import { CIUDADES_MESA, INDICE_MESAS, MESAS_CIUDADES_1031B_GUIDES, MESAS_CIUDADES_1031B_PATHS } from "@/lib/tramites/mesas-ciudades-20261031b";

const OFICIAL = /(\.gob\.es|\.es[\/?]|\.es$|\.cat\/|\.org\/|\.eus\/|\.gal\/|juntaelectoralcentral\.es|ine\.es)/;

describe("mesas electorales por ciudad, lote 2 (31-10)", () => {
  it("registra 20 guías únicas con fuentes oficiales, 5 FAQ y meta corta", () => {
    expect(MESAS_CIUDADES_1031B_PATHS).toHaveLength(20);
    for (const p of MESAS_CIUDADES_1031B_PATHS) {
      const g = ALL_GUIDES.find((x) => x.path === p)!;
      expect(g, p).toBeTruthy();
      expect(ALL_GUIDES.filter((x) => x.path === p)).toHaveLength(1);
      expect(g.sources!.length, p).toBeGreaterThanOrEqual(5);
      for (const s of g.sources!) expect(OFICIAL.test(s.href), s.href).toBe(true);
      expect(g.faqs!.length).toBeGreaterThanOrEqual(5);
      expect(g.description.length, p).toBeLessThanOrEqual(158);
      expect(g.title.length, p).toBeLessThanOrEqual(70);
      expect(g.h1.startsWith("¿En qué mesa electoral voto en")).toBe(true);
      expect(g.sections.some((s) => s.id === "byline" && s.paragraphs[0].includes("Equipo RutaTrámite"))).toBe(true);
      expect(g.related.some((r) => r.href === INDICE_MESAS)).toBe(true);
    }
  });
  it("títulos, descripciones, leads y FAQ no se repiten con el lote 1", () => {
    const all = [...MESAS_CIUDADES_1031_GUIDES, ...MESAS_CIUDADES_1031B_GUIDES];
    for (const k of ["title", "description", "lead"] as const) expect(new Set(all.map((g) => g[k])).size).toBe(all.length);
    const qs = all.flatMap((g) => g.faqs!.map((f) => f.q));
    expect(new Set(qs).size).toBe(qs.length);
  });
  it("cada fila de la tabla de Santander cita la sede municipal", () => {
    const t = ALL_GUIDES.find((x) => x.path === "/elecciones/mesa-electoral-santander")!.sections.find((s) => s.id === "colegios")!.table!;
    expect(t.rows.every((r) => r.source.href.includes("santander.es"))).toBe(true);
  });
  it("el índice lista las 25 ciudades y está enlazado desde los hubs", () => {
    const idx = ALL_GUIDES.find((x) => x.path === INDICE_MESAS)!;
    expect(CIUDADES_MESA).toHaveLength(25);
    for (const c of CIUDADES_MESA) expect(idx.related.some((r) => r.href === `/elecciones/mesa-electoral-${c.c}`)).toBe(true);
    for (const hub of ["/elecciones/donde-voto-mesa-electoral", "/elecciones/tarjeta-censal-cuando-llega", "/elecciones/consultar-censo-electoral"]) {
      expect(ALL_GUIDES.find((x) => x.path === hub)!.related.some((r) => r.href === INDICE_MESAS), hub).toBe(true);
    }
    const dv = ALL_GUIDES.find((x) => x.path === "/elecciones/donde-voto-mesa-electoral")!;
    for (const p of MESAS_CIUDADES_1031B_PATHS) expect(dv.related.some((r) => r.href === p)).toBe(true);
  });
  it("todos los enlaces relacionados de las páginas nuevas existen", () => {
    const paths = new Set(ALL_GUIDES.map((g) => g.path));
    for (const g of [...MESAS_CIUDADES_1031B_GUIDES, ALL_GUIDES.find((x) => x.path === INDICE_MESAS)!])
      for (const r of g.related) if (r.href.startsWith("/elecciones/")) expect(paths.has(r.href), `${g.path} -> ${r.href}`).toBe(true);
  });
});
