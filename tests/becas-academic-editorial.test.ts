import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Becas: academic history and repayment", () => {
  it("includes Sciences in the lower repayment threshold and separates other study levels", () => {
    const guide = getGuideByPath("/becas/mec/no-devolver")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.lead).toContain("40% en las ramas de Ciencias y enseñanzas técnicas");
    expect(html).toContain("Alcanzar exactamente el 50%");
    expect(html).toContain("no universitarios hay reglas propias");
    expect(html).toContain("violencia de género o sexual");
    expect(html).toContain("salvo el de matrícula");
    expect(html).not.toContain("precisamente porque el rendimiento reconocido en esas titulaciones es menor");
  });

  it("counts previous scholarship enrolment rather than a made-up pass-rate table", () => {
    const html = renderGuideHtml("/becas/mec/cambio-estudios");
    expect(html).toContain("al menos 30 créditos más que los cursados con beca");
    expect(html).toContain("no solo los aprobados");
    expect(html).toContain("entre 30 y 59");
    expect(html).toContain("artículo 25.8");
    expect(html).toContain("7 al 28 de septiembre de 2026");
    expect(html).not.toMatch(/los que te falten más 60|no conlleva penalización en convocatorias futuras|debes matricular los créditos que te falten/);
  });

  it("keeps formal withdrawal separate from repayment and requires an official payment document", () => {
    const guide = getGuideByPath("/becas/mec/renuncia")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toBe("https://sede.educacion.gob.es/portada.html");
    expect(html).toContain("actuaciones distintas");
    expect(html).toContain("carta de pago de ingresos no tributarios");
    expect(html).toContain("deje de contar para límites de duración o cambio de estudios");
    expect(guide.sources?.some(source => source.href.includes("/894743/document/1422191"))).toBe(true);
  });

  it("does not describe an old closed GVA application as an open new award", () => {
    const guide = getGuideByPath("/becas/autonomicas/beca-salario-gva")!;
    expect(guide.lead).toContain("curso 2025-26");
    expect(guide.lead).toContain("solicitud cerrada");
    expect(guide.lead).toContain("no permite presentar una solicitud nueva");
    expect(guide.cta.href).toContain("id_proc=95885");
    expect(renderGuideHtml(guide.path)).toContain("másteres habilitantes");
  });
});
