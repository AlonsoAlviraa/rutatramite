import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Palma", () => {
  it("cita la ficha de alta y no le pone un importe de tasa", () => {
    const html = renderFichaHtml(loadMunicipio("07040"));
    expect(html).toContain("palma.sedipualba.es/carpetaciudadana/tramite.aspx?idioma=es");
    expect(html).toContain("idtramite=13898");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
