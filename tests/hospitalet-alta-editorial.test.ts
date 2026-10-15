import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en L'Hospitalet de Llobregat", () => {
  it("enlaza la ficha de alta y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("08101"));
    expect(html).toContain("seuelectronica.l-h.cat/tramits/r/detallTramit_2.aspx");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).toContain("VÀLid");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
