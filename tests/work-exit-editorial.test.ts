import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Work exit: notice, trial, settlement and SEPE certificate", () => {
  it("does not supply a universal 15-day notice in the copied resignation letters", () => {
    const guide = getGuideByPath("/modelo-baja-voluntaria")!;
    expect(guide.lead).toContain("ni como solución automática");
    const models = guide.sections.flatMap(s => s.models ?? []);
    expect(models.map(m => m.id)).toEqual(["seco", "cordial", "por-email"]);
    expect(models.every(m => !m.body.includes("15 días"))).toBe(true);
    expect(renderGuideHtml(guide.path)).toContain("cláusula no es válida solo por estar firmada");
  });

  it("requires a basis and calculation for a deduction rather than automatically equating it with days omitted", () => {
    const html = renderGuideHtml("/baja-voluntaria-sin-preaviso");
    expect(html).toContain("no fija un descuento automático");
    expect(html).toContain("no demuestra por sí solo que cualquier deducción sea correcta");
    expect(html).toContain("artículo 50 tiene requisitos y cauce propios");
  });

  it("checks a written valid trial and the prior employment condition for unemployment", () => {
    const html = renderGuideHtml("/baja-periodo-de-prueba");
    expect(html).toContain("pactó por escrito");
    expect(html).toContain("mismas funciones");
    expect(html).toContain("baja médica no amplía automáticamente");
    expect(html).toContain("o que hayan transcurrido tres meses");
    expect(html).toContain("No firmes una carta de desistimiento tuyo si quien decide finalizar es la empresa");
  });

  it("offers worker-representative assistance without equating a signature with payment or preserving deadlines", () => {
    const html = renderGuideHtml("/modelo-finiquito");
    expect(html).toContain("representante legal de los trabajadores");
    expect(html).toContain("No declares cobrado un importe");
    expect(html).toContain("ni conserva por sí sola los plazos para reclamar");
  });

  it("resumes the dismissal time remaining and removes the letter's seven-day waiting instruction", () => {
    const guide = getGuideByPath("/he-firmado-finiquito-puedo-reclamar")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("no con veinte días nuevos");
    expect(html).toContain("quince días hábiles sin celebrarse");
    expect(html).toContain("no son treinta días de suspensión");
    expect(html).toContain("cada acción pudo ejercitarse");
    expect(guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ")).not.toContain("7 días");
  });

  it("requires the company certificate even on resignation and preserves the vacation and missing-document paths", () => {
    const guide = getGuideByPath("/certificado-empresa-sepe")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.lead).toContain("también cuando causas baja voluntaria");
    expect(html).toContain("termina el periodo equivalente a esas vacaciones");
    expect(html).toContain("declaración de carencia de documentación");
    expect(html).toContain("no hay prestación por ese cese");
    expect(guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ")).toContain("incluida baja voluntaria");
  });
});
