import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Vigo", () => {
  it("cita la ficha de alta y no le pone un importe de tasa", () => {
    const html = renderFichaHtml(loadMunicipio("36057"));
    expect(html).toContain("sede.vigo.org/expedientes/tramites/tramite.jsp?id_tramite=65");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
