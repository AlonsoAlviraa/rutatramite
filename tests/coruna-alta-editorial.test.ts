import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en A Coruña", () => {
  it("cita la ficha de padrón y no le pone un importe de tasa", () => {
    const html = renderFichaHtml(loadMunicipio("15030"));
    expect(html).toContain("padron-de-habitantes");
    expect(html).toContain("no publica un importe de tasa del alta");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
