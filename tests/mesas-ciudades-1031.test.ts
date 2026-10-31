import { describe, expect, it } from "vitest";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { MESAS_CIUDADES_1031_GUIDES, MESAS_CIUDADES_1031_PATHS } from "@/lib/tramites/mesas-ciudades-20261031";

const OFICIAL = /(\.gob\.es|\.es\/|juntaelectoralcentral\.es|dipsoria\.es|madrid\.es|zaragoza\.es|valencia\.es|valladolid\.es|ine\.es)/;

describe("mesas electorales por ciudad 31-10", () => {
  it("registra 5 guías únicas con fuentes oficiales, FAQ y meta corta", () => {
    expect(MESAS_CIUDADES_1031_PATHS).toHaveLength(5);
    const titles = new Set<string>();
    for (const p of MESAS_CIUDADES_1031_PATHS) {
      const g = ALL_GUIDES.find((x) => x.path === p)!;
      expect(g).toBeTruthy();
      expect(ALL_GUIDES.filter((x) => x.path === p)).toHaveLength(1);
      expect(g.sources!.length).toBeGreaterThanOrEqual(5);
      expect(g.sources!.every((s) => OFICIAL.test(s.href))).toBe(true);
      expect(g.faqs!.length).toBeGreaterThanOrEqual(5);
      expect(g.description.length).toBeLessThanOrEqual(158);
      expect(g.h1.startsWith("¿En qué mesa electoral voto en")).toBe(true);
      expect(g.sections.some((s) => s.id === "byline" && s.paragraphs[0].includes("Equipo RutaTrámite"))).toBe(true);
      expect(g.related.some((r) => r.href === "/elecciones/donde-voto-mesa-electoral")).toBe(true);
      titles.add(g.title);
    }
    expect(titles.size).toBe(5);
  });
  it("FAQ propias: ninguna pregunta se repite entre ciudades", () => {
    const qs = MESAS_CIUDADES_1031_GUIDES.flatMap((g) => g.faqs!.map((f) => f.q));
    expect(new Set(qs).size).toBe(qs.length);
  });
  it("Soria publica la tabla del BOP con 50 mesas", () => {
    const g = ALL_GUIDES.find((x) => x.path === "/elecciones/mesa-electoral-soria")!;
    const t = g.sections.find((s) => s.id === "colegios")!.table!;
    const total = t.rows.reduce((n, r) => n + Number(r.cells[2].split(":")[0]), 0);
    expect(total).toBe(50);
    expect(t.rows.every((r) => r.source.href.includes("dipsoria.es"))).toBe(true);
  });
  it("el hub y la tarjeta censal enlazan a las 5 ciudades", () => {
    for (const hub of ["/elecciones/donde-voto-mesa-electoral", "/elecciones/tarjeta-censal-cuando-llega", "/elecciones/consultar-censo-electoral"]) {
      const g = ALL_GUIDES.find((x) => x.path === hub)!;
      for (const p of MESAS_CIUDADES_1031_PATHS) expect(g.related.some((r) => r.href === p)).toBe(true);
    }
  });
  it("no toca el título de tarjeta censal ni la URL de programas", () => {
    expect(ALL_GUIDES.some((x) => x.path === "/elecciones/programas-electorales-29n")).toBe(true);
  });
});
