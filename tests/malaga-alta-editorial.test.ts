import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Málaga", () => {
  it("enlaza el anexo oficial y no le pone un importe al alta", () => {
    const html = renderFichaHtml(loadMunicipio("29067"));
    expect(html).toContain("Documentacion-necesaria-17062026_1.pdf");
    expect(html).toContain("id=112");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
