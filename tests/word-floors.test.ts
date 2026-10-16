import { describe, expect, it } from "vitest";
import { loadAllMunicipios, loadIndex } from "@/lib/data/load";
import { fichaWordFloor } from "@/lib/ficha/buildFicha";
import {
  renderEscenarioHtml,
  renderFichaHtml,
  renderPilarHtml,
} from "@/lib/render/server";
import { countVisibleWords } from "@/lib/render/words";
import { ESCENARIO_SLUGS } from "@/lib/types";
import { escenarioReview } from "@/lib/data/escenarios-editorial";

describe("visible word floors on shipped render", () => {
  it("pilar gives steps, documents, scenario links and usable official sources", () => {
    const html = renderPilarHtml();
    expect(html).toContain("RutaTrámite");
    for (const id of ["pasos-nacionales", "identidad", "vivienda", "escenarios", "fuentes"]) expect(html).toContain(`id="${id}"`);
    for (const slug of ESCENARIO_SLUGS) expect(html).toContain(`href="/empadronarse/${slug}"`);
    expect(html).toContain('href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4784"');
    expect(html).not.toMatch(/cita_url|Git es la fuente|Oleada A|User-Agent|Wikidata P856|thin de 300/);
  });

  it("shipped scenarios render their content and editorial evidence", () => {
    for (const slug of ESCENARIO_SLUGS) {
      const html = renderEscenarioHtml(slug);
      const words = countVisibleWords(html);
      expect(html, slug).toContain("empadron");
      const review = escenarioReview(slug);
      if (review) {
        expect(html, slug).toContain(review.reviewedAt);
        for (const heading of review.headings) expect(html, slug).toContain(heading);
        expect(html, slug).toContain('href="/metodologia"');
      } else {
        expect(words, slug).toBeGreaterThanOrEqual(2000);
      }
    }
  });

  it("every ≥10k ficha meets its oleada floor via FichaView", { timeout: 120_000 }, async () => {
    const all = loadAllMunicipios();
    expect(all.length).toBe(loadIndex().length);
    expect(all.length).toBe(769);
    const big = all.filter((m) => m.oleada !== "E");
    expect(big.length).toBe(769);
    const failures: string[] = [];
    for (const m of big) {
      // Let the test worker deliver progress messages during this long render loop.
      await new Promise<void>((resolve) => setImmediate(resolve));
      const html = renderFichaHtml(m);
      const words = countVisibleWords(html);
      const floor = fichaWordFloor(m);
      if (words < floor) {
        failures.push(`${m.ine_code} ${m.name} ${words}<${floor}`);
      }
      if (html.length < 800) {
        failures.push(`${m.ine_code} thin html`);
      }
    }
    expect(failures, failures.join("\n")).toEqual([]);
  });
});
