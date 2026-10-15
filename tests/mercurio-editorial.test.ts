import { describe, expect, it } from "vitest";
import { renderGuideHtml } from "@/lib/render/server";

describe("Mercurio: operation and document jurisdiction", () => {
  it("does not route foreign passport renewal or residence fees to Spanish DNI/passport procedures", () => {
    const html = renderGuideHtml("/extranjeria/mercurio");
    expect(html).toContain("no sirve para renovar un pasaporte extranjero");
    expect(html).toContain("autoridad emisora o a la representación consular competente");
    expect(html).toContain("no uses las tasas de DNI o pasaporte como importe de una autorización de extranjería");
    expect(html).not.toContain("van por citapreviadnie.es");
    expect(html).not.toContain("tasas 2026: DNI 12 €");
  });
  it("distinguishes registered filing, informational status and official notice", () => {
    const html = renderGuideHtml("/extranjeria/mercurio");
    expect(html).toContain("Guardar un borrador o adjuntar archivos no acredita por sí solo que estén registrados");
    expect(html).toContain("No sustituye la notificación de un requerimiento o resolución");
    expect(html).toContain("No calcules un plazo de respuesta únicamente por el día en que consultaste");
    expect(html).toContain("/directorio/mercurio2");
    expect(html).toContain("/directorio/expedientes_extranjeria");
  });
});
