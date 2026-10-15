import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en València", () => {
  it("cita que los trámites de padrón son gratuitos y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("46250"));
    expect(html).toContain("PA.GP.11");
    expect(html).toContain("trámites de padrón son gratuitos");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
