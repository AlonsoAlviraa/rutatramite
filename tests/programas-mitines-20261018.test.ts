import { describe, expect, it } from "vitest";
import { ELECCIONES_EXPLICADORES_GUIDES } from "@/lib/tramites/promesas-29n";
import { renderGuideHtml } from "@/lib/render/server";

const g = ELECCIONES_EXPLICADORES_GUIDES.find((x) => x.path === "/elecciones/programas-electorales-29n")!;
const ORDER = ["pp", "psoe", "vox", "frente-amplio", "podemos", "erc", "junts", "eh-bildu", "pnv", "bng", "cc", "upn", "democracia-21"];

describe("programas-electorales-29n: mítines (actualizado 19-oct)", () => {
  it("opens saying no programme has been published", () => {
    expect(g.lead).toMatch(/ningún partido ha publicado todavía su programa/);
    expect(g.lead).toMatch(/a 26 de octubre de 2026/);
    expect(g.sections[0].id).toBe("estado");
    expect(g.sections[1].id).toBe("aviso");
    expect(g.sections[1].paragraphs[0]).toMatch(/No son el programa electoral oficial/);
  });
  it("keeps title, H1, description (CTR) and the «cuándo salen» FAQ", () => {
    expect(g.title).toBe("Programas electorales del 29-N: cuándo salen y dónde verlos");
    expect(g.h1).toBe("Programas electorales del 29-N: cuándo se publican y dónde leerlos");
    expect(g.description).toContain("A 18 de octubre ningún partido ha publicado el suyo");
    expect(g.faqs![0].q).toBe("¿Cuándo salen los programas electorales del 29-N?");
  });
  it("one section per party, same structure, fixed order", () => {
    const parties = g.sections.filter((s) => ORDER.includes(s.id));
    expect(parties.map((s) => s.id)).toEqual(ORDER);
    for (const s of parties) {
      expect(s.title).toMatch(/: qué ha propuesto en mítines y actos$/);
      expect(s.paragraphs[1]).toBe("Programa del 29-N: no publicado a 26 de octubre de 2026.");
      if (s.table) {
        expect(s.table.head).toEqual(["Tema", "Qué propuso o dijo", "Quién, dónde y cuándo", "Fuente"]);
        for (const r of s.table.rows) {
          expect(r.source.href).toMatch(/^https:\/\//);
          expect(r.cells[2]).toMatch(/\d{2}-\d{2}-2026|\(octubre de 2026\)/); // documentos sin fecha exacta de presentación: mes
        }
      } else {
        expect(s.paragraphs[2]).toBe("No hemos encontrado propuestas concretas verificables en mítines a fecha de 26 de octubre.");
      }
    }
  });
  it("includes Feijóo Barcelona antiokupación 48h (RTVE)", () => {
    const pp = g.sections.find((s) => s.id === "pp")!;
    const row = pp.table!.rows.find((r) => r.cells[1].includes("48 horas"));
    expect(row).toBeTruthy();
    expect(row!.source.href).toContain("rtve.es");
  });
  it("renders tables and FAQPage with reviewedAt 19-oct", () => {
    const h = renderGuideHtml(g.path);
    expect(h).toContain("data-guide-table");
    expect(h).toContain('"FAQPage"');
    expect(h).toContain("2026-10-21");
    expect(h).toContain("48 horas");
  });
});
