import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Sevilla", () => {
  it("cita que el empadronamiento es gratuito y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("41091"));
    expect(html).toContain("https://www.sevilla.org/servicios/empadronamiento/informacion-cambio-en-el-padron-de-habitantes-de-sevilla");
    expect(html).toContain("el empadronamiento es gratuito");
    expect(html).toContain("cualquier pago exigido para empadronarse es un fraude");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
