import { describe, expect, it } from "vitest";
import { renderGuideHtml } from "@/lib/render/server";

describe("Expired identity documents", () => {
  it("distinguishes renewal obligations, sanctionable conduct and document fees", () => {
    const html = renderGuideHtml("/dni/caducado-multa");
    expect(html).toContain("obliga a renovarlo al caducar");
    expect(html).toContain("artículo 37.10");
    expect(html).toContain("No apliques automáticamente esos supuestos a cualquier DNI caducado");
    expect(html).toContain("no resuelve por sí solo una actuación sancionadora distinta");
    expect(html).not.toContain("lo que se sanciona es negarte");
    expect(html).not.toContain("gratuita, solo en citapreviadnie.es");
  });
  it("links the current banking criterion and keeps its scope and identity exception", () => {
    const html = renderGuideHtml("/dni/caducado-banco");
    expect(html).toContain("CCBPBAbril2026.pdf#page=49");
    expect(html).toContain("imposibilidad generalizada de operar");
    expect(html).toContain("identidad puede resultar insuficientemente acreditada");
    expect(html).not.toContain("criterios/medidas-restrictivas-por-falta-de-documentacion-e-informacion.html");
  });
});
