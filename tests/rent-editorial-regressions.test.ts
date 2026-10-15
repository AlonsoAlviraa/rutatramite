import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Rental models: contract term, notices and payment demand", () => {
  it("calculates a stipulated withdrawal payment over the remaining contract, not just the current year", () => {
    const html = renderGuideHtml("/preaviso-fin-alquiler");
    expect(html).toContain("cada año del contrato que reste por cumplir");
    expect(html).toContain("800 × 1,5 = 1.200 €");
    expect(html).toContain("Indemnización solo si está pactada");
    expect(html).not.toContain("se calcula según el tiempo que reste de la anualidad en curso");
  });

  it("distinguishes the tenant's 30-day, two-month and annual-extension notices", () => {
    const html = renderGuideHtml("/preaviso-fin-alquiler");
    expect(html).toContain("Artículo 9.1");
    expect(html).toContain("dos meses para el inquilino y cuatro para el arrendador");
    expect(html).toContain("evitar la siguiente anualidad avisando con un mes");
    expect(html).toContain("No confundas un mes con 30 días");
  });

  it("does not give the landlord an unrestricted right to end an annual extension", () => {
    const guide = getGuideByPath("/no-renovacion-alquiler")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("hasta tres anualidades adicionales obligatorias para el arrendador");
    expect(html).toContain("contrato es anterior a marzo de 2019");
    expect(html).toContain("publicado el 30 de abril de 2026");
    expect(guide.sources?.some(s => s.href.includes("BOE-A-2026-9359"))).toBe(true);
    expect(guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ")).not.toContain("con un preaviso superior a cuatro meses");
  });

  it("separates the proposed payment date from the rule on enervation before filing", () => {
    const guide = getGuideByPath("/requerimiento-impago-alquiler")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("Quince días no es un plazo legal universal");
    expect(html).toContain("treinta días de antelación a la demanda");
    expect(html).toContain("no se había pagado al presentarla");
    expect(guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ")).toContain("[fecha propuesta]");
  });

  it("does not certify a debt demand as satisfying pre-action negotiation", () => {
    const guide = getGuideByPath("/requerimiento-impago-alquiler")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("no acredita automáticamente que se haya cumplido ese requisito");
    expect(html).toContain("confidencialidad");
    expect(guide.sources?.some(s => s.href.includes("BOE-A-2025-76"))).toBe(true);
    expect(guide.reviewedAt).toBe("2026-09-16");
    expect(getGuideByPath("/inventario-fianza-alquiler")?.reviewedAt).toBe("2026-09-14");
  });
});
