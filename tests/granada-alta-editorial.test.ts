import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Granada", () => {
  it("enlaza la sede del procedimiento y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("18087"));
    expect(html).toContain("DETALLE=6269000012810236607717");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).toContain("solicitud en línea con certificado");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
