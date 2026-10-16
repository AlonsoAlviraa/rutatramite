import { describe, expect, it } from "vitest";
import { renderPilarHtml } from "@/lib/render/server";

const VALENCIA_FAQ =
  "https://www.valencia.es/documents/20142/20609056/PREGUNTAS+FRECUENTES+PADRON.pdf/95395fb7-6f62-224a-9471-a1b6dda7ddbe";

describe("alta del padrón en el hub nacional", () => {
  it("enlaza la fuente municipal de la inscripción gratuita y no le pone un importe", () => {
    const html = renderPilarHtml();
    expect(html).toContain(`href="${VALENCIA_FAQ}"`);
    expect(html).toContain("la inscripción en el padrón es un trámite gratuito");
    expect(html).toContain("El alta ordinaria es gratuita");
    expect(html).toContain("las fija cada ayuntamiento");
    expect(html).not.toMatch(/alta ordinaria[^<]{0,80}\d+\s*€/);
  });
});
