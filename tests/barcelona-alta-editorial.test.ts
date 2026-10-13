import { describe, expect, it } from "vitest";
import { loadMunicipio } from "@/lib/data/load";
import { renderFichaHtml } from "@/lib/render/server";

describe("alta en Barcelona", () => {
  it("cita que el trámite es gratuito y no le pone un importe", () => {
    const html = renderFichaHtml(loadMunicipio("08019"));
    expect(html).toContain("T135i/PTCIU.html");
    expect(html).toContain("trámite gratuito");
    expect(html).toContain("no publica un importe de tasa");
    expect(html).not.toContain("tasa de alta es 0 €");
    expect(html).not.toContain("alta 0 €");
    expect(html).not.toContain("es 0 €");
    expect(html).not.toContain("gratuita en toda España");
  });
});
