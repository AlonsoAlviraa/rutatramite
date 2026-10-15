import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Elche", () => {
  it("cita que el pago de tasas es ninguna y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("03065"));
    expect(html).toContain("DETALLE=6269000000564034799500");
    expect(html).toContain("el pago de tasas es ninguna");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
