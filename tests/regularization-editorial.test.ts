import { describe, expect, it } from "vitest";
import { renderGuideHtml } from "@/lib/render/server";

describe("Regularization: individual deadlines and provisional status", () => {
  it("does not turn the Correos service window into an individual deadline or a universal office schedule", () => {
    const html = renderGuideHtml("/extranjeria/subsanar-regularizacion-correos");
    expect(html).toContain("Esa fecha no amplía el plazo de tu requerimiento");
    expect(html).toContain("no puede superar quince días");
    expect(html).toContain("sin servicio");
    expect(html).toContain("16:30–19:30");
    expect(html).toContain("no hay servicio los sábados ni los domingos");
    expect(html).not.toContain("383 oficinas oficinas");
    expect(html).not.toContain("y sin cita previa (verificado");
  });
  it("explains the resolution clock, suspensions and the limited effect of negative silence", () => {
    const html = renderGuideHtml("/extranjeria/regularizacion-2026-resolucion");
    expect(html).toContain("tres meses para resolver y notificar");
    expect(html).toContain("registro del órgano competente");
    expect(html).toContain("no inicia automáticamente otros tres meses desde cero");
    expect(html).toContain("el mero silencio no la extingue");
    expect(html).toContain("no deduzcas esa habilitación del solo justificante");
    expect(html).toContain("report_20260722-criterio-interpretativo-rd-316-2026-def");
  });
  it("distinguishes post-grant TIE requirements and does not tell an asylum applicant to withdraw early", () => {
    const html = renderGuideHtml("/extranjeria/regularizacion-2026-resolucion");
    expect(html).toContain("mes inmediatamente posterior a la concesión");
    expect(html).toContain("No hagas ese desistimiento anticipadamente");
    expect(html).toContain("disposición adicional 21 no lleva ese mismo requisito de asilo");
  });
});
