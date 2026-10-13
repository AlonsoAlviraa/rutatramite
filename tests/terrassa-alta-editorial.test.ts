import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Terrassa", () => {
  it("cita la gestión gratuita y el canal vigente, sin importe", () => {
    const html = renderFichaHtml(loadMunicipio("08279"));
    expect(html).toContain("fitxa.jsp?id=141");
    expect(html).toContain("gestión del alta es gratuita");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).toContain("idCAT Móvil");
    expect(html).toContain("50 días hábiles");
    expect(html).not.toContain("suspende temporalmente el alta electrónica");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
