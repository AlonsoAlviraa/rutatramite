import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Alicante", () => {
  it("cita que los trámites del padrón son gratuitos y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("03014"));
    expect(html).toContain("altas-y-cambios-domicilio-padron-municipal-habitantes");
    expect(html).toContain("trámites del padrón municipal son gratuitos");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
