import { describe, expect, it } from "vitest";
import { PENSIONES_29N_GUIDES } from "@/lib/tramites/pensiones-29n";
import { JUBILACION_2026_GUIDES } from "@/lib/tramites/jubilacion-2026";
import { PROMESAS_29N_GUIDES } from "@/lib/tramites/promesas-29n";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

const PARTY_SECTIONS = ["respuesta", "que-ha-dicho", "votaciones", "programa", "ley-actual", "criterio"];
const parties = PENSIONES_29N_GUIDES.filter((g) => g.id !== "pens29n-hub");

describe("serie «¿Quiere [partido] quitar las pensiones?»", () => {
  it("one page per party with identical structure", () => {
    expect(parties.map((g) => g.id)).toEqual(["pens29n-pp", "pens29n-psoe", "pens29n-vox", "pens29n-frente-amplio", "pens29n-podemos"]);
    for (const g of parties) {
      expect(g.sections.map((s) => s.id)).toEqual(PARTY_SECTIONS);
      expect(g.sections[0].paragraphs[0]).toMatch(/^Según las declaraciones con fuente que hemos encontrado, /);
      expect(g.faqs![0].q).toMatch(/^¿Quiere .+ quitar las pensiones\?$/);
      const t = g.sections[1].table!;
      expect(t.head).toEqual(["Qué dijo", "Quién, dónde y cuándo", "Fuente"]);
      for (const r of t.rows) {
        expect(r.source.href).toMatch(/^https:\/\//);
        expect(r.cells[1]).toMatch(/\d{2}-\d{2}-2026/);
      }
      expect(g.related.some((r) => r.href === "/elecciones/quiere-algun-partido-quitar-las-pensiones")).toBe(true);
    }
  });
  it("hub lists every party, Democracia 21 included, same columns", () => {
    const hub = PENSIONES_29N_GUIDES.find((g) => g.id === "pens29n-hub")!;
    const rows = hub.sections.find((s) => s.id === "tabla")!.table!.rows;
    expect(rows.map((r) => r.cells[0])).toEqual(["PP", "PSOE", "Vox", "Frente Amplio", "Podemos", "Democracia 21"]);
    for (const p of parties) expect(hub.related.some((r) => r.href === p.path)).toBe(true);
  });
  it("pages are registered, unique and render FAQPage", () => {
    for (const g of [...PENSIONES_29N_GUIDES, ...JUBILACION_2026_GUIDES]) {
      expect(ALL_GUIDES.filter((x) => x.path === g.path)).toHaveLength(1);
      expect(g.description.length).toBeLessThanOrEqual(160);
      const h = renderGuideHtml(g.path);
      expect(h).toContain('"FAQPage"');
      expect(h).toMatch(/2026-10-(1[89]|2[01])/);
    }
  });
});

describe("pensiones para mayores de 55", () => {
  it("revalorización cites the BOE figures", () => {
    const g = JUBILACION_2026_GUIDES.find((x) => x.path === "/trabajo/revalorizacion-pensiones-2026")!;
    expect(g.lead).toContain("2,7 %");
    expect(g.lead).toContain("3.359,60 €");
    expect(g.sources!.some((s) => s.href === "https://www.boe.es/eli/es/rdl/2026/02/03/3")).toBe(true);
  });
  it("jubilación gives the 2026 ages from the Seguridad Social", () => {
    const g = JUBILACION_2026_GUIDES.find((x) => x.path === "/trabajo/como-pedir-la-jubilacion")!;
    expect(g.faqs![0].a).toContain("66 años y 10 meses");
    expect(g.sources!.every((s) => /^https:\/\/(www\.seg-social\.es|revista\.seg-social\.es|www\.boe\.es)\//.test(s.href))).toBe(true);
  });
});

describe("comparativas por tema con Democracia 21", () => {
  for (const path of ["/elecciones/promesas/que-propone-cada-partido-inmigracion", "/elecciones/promesas/que-propone-cada-partido-pensiones"]) {
    it(`${path}: same structure for every party`, () => {
      const g = PROMESAS_29N_GUIDES.find((x) => x.path === path)!;
      expect(g.sections.map((s) => s.id)).toEqual(["pp", "psoe", "vox", "frente-amplio", "podemos", "democracia-21", "como-leer"]);
      for (const s of g.sections.slice(0, 6)) {
        expect(s.paragraphs[0]).toContain("Programa para el 29-N: no publicado a 19 de octubre de 2026.");
        if (s.table) expect(s.table.head).toEqual(["Medida o declaración", "Quién, dónde y cuándo", "Tipo de fuente", "Fuente"]);
        else expect(s.paragraphs[1]).toMatch(/^No hemos encontrado/);
      }
    });
  }
});
