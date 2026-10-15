import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Valladolid", () => {
  it("cita que los costes no aplican y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("47186"));
    expect(html).toContain("tipo=procedure&valor=APM_01");
    expect(html).toContain("los costes no aplican");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
