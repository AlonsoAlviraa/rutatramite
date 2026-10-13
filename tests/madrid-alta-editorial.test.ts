import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Madrid", () => {
  it("enlaza la ficha de altas y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("28079"));
    expect(html).toContain("vgnextoid=3e3debb41f6e2410VgnVCM2000000c205a0aRCRD");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).toContain("cinco días naturales");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
