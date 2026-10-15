import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Employment requests: qualifying conditions and deadlines", () => {
  it("checks the interval between voluntary leaves and retains vacancy-based reentry", () => {
    const guide = getGuideByPath("/modelo-excedencia-voluntaria")!;
    expect(guide.lead).toContain("cuatro años desde el final");
    expect(guide.lead).toContain("vacantes de igual o similar categoría");
    const body = guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ");
    expect(body).toContain("hace al menos cuatro años");
    expect(renderGuideHtml(guide.path)).toContain("no fija un preaviso general");
  });

  it("includes daily reduction limits, both dates and the direct dispute route", () => {
    const guide = getGuideByPath("/modelo-reduccion-jornada")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.lead).toContain("jornada diaria entre un octavo y la mitad");
    const body = guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ");
    expect(body).toContain("12,5 % y 50 %");
    expect(body).toContain("Finalización: [fecha]");
    expect(html).toContain("exceptuado de conciliación o mediación previa obligatoria");
    expect(html).toContain("Salvo fuerza mayor");
  });

  it("separates vacation notification from filing deadlines and preserves sickness exceptions", () => {
    const html = renderGuideHtml("/solicitud-vacaciones");
    expect(html).toContain("no es una regla nacional");
    expect(html).toContain("aunque termine el año");
    expect(html).toContain("dieciocho meses desde el final del año");
    expect(html).toContain("si no está señalada, la demanda");
    expect(html).toContain("exceptuado de conciliación previa obligatoria");
  });

  it("counts each wage debt separately and does not require ten days of waiting", () => {
    const guide = getGuideByPath("/reclamacion-salarios-modelo")!;
    expect(guide.lead).toContain("artículo 59.2");
    expect(guide.lead).toContain("desde que cada cantidad pudo reclamarse");
    const body = guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ");
    expect(body).not.toMatch(/en 10 días|En caso contrario/);
    expect(renderGuideHtml(guide.path)).toContain("contenido y recepción");
    expect(guide.sources?.some(s => s.href.endsWith("#art1973"))).toBe(true);
  });

  it("requires the applicable cause without treating every accident or personal day alike", () => {
    const html = renderGuideHtml("/solicitud-permiso-retribuido");
    expect(html).toContain("convenio o un pacto aplicable");
    expect(html).toContain("No basta con escribir «accidente de familiar»");
    expect(html).toContain("no exige que una emergencia se haya previsto");
    expect(html).toContain("régimen funcionarial requiere");
  });
});
