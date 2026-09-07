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

describe("visible word floors on shipped render", () => {
  it("pilar /empadronarse has ≥3000 visible words from PilarView", () => {
    const html = renderPilarHtml();
    const words = countVisibleWords(html);
    expect(html).toContain("RutaTrámite");
    expect(words).toBeGreaterThanOrEqual(3000);
  });

  it("each of the 12 pack escenarios has ≥2000 visible words from the shipped markdown view", () => {
    for (const slug of ESCENARIO_SLUGS) {
      const html = renderEscenarioHtml(slug);
      const words = countVisibleWords(html);
      expect(html, slug).toContain("empadron");
      expect(words, slug).toBeGreaterThanOrEqual(2000);
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
