import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Zaragoza", () => {
  it("enlaza la ficha presencial y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("50297"));
    expect(html).toContain("https://zaragoza.es/sede/servicio/tramite/3317");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).toContain("El alta es presencial");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
