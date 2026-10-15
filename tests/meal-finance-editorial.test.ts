import { describe, expect, it } from "vitest";
import { renderGuideHtml } from "@/lib/render/server";

describe("School meal grants and unpaid bills", () => {
  it("does not present a centre grant or a previous school year as a current family application", () => {
    const html = renderGuideHtml("/comedor/beca-comedor-2026-2027");
    expect(html).toContain("dirigido a determinados centros concertados");
    expect(html).toContain("corresponde al curso 2025/26");
    expect(html).not.toContain("mapa completo, con fechas verificadas");
    expect(html).not.toContain("Andalucía: del 7 de abril al 19 de mayo");
  });
  it("keeps verified Barcelona September dates and subsequent periods", () => {
    const html = renderGuideHtml("/comedor/beca-comedor-2026-2027");
    expect(html).toContain("del 8 al 27 de septiembre de 2026");
    expect(html).toContain("del 28 de septiembre al 29 de noviembre de 2026");
    expect(html).toContain("no extiendas estas fechas al resto de Cataluña");
  });
  it("limits the Castilla y Leon reopening and distinguishes the Madrid appeal stage", () => {
    const html = renderGuideHtml("/comedor/beca-comedor-2026-2027");
    expect(html).toContain("quien ya solicitó en el periodo ordinario no puede presentar una nueva solicitud");
    expect(html).toContain("recurso de reposición del 5 de septiembre al 5 de octubre de 2026");
    expect(html).toContain("no es por sí solo una nueva convocatoria");
  });
  it("does not guarantee a late application or immediate fiscal substitute", () => {
    const html = renderGuideHtml("/comedor/beca-comedor-fuera-de-plazo");
    expect(html).toContain("no cambia automáticamente la renta de referencia ni reabre el plazo");
    expect(html).toContain("familia numerosa especial");
    expect(html).toContain("no suspende automáticamente el pago");
    expect(html).not.toContain("Deducción por gastos de guardería en el IRPF");
  });
  it("does not promise social coverage or tell everyone to submit outside the deadline", () => {
    const html = renderGuideHtml("/comedor/no-puedo-pagar-comedor-escolar");
    expect(html).toContain("no des por confirmada la cobertura del menú");
    expect(html).toContain("ni paraliza por sí solo un procedimiento");
    expect(html).not.toContain("un niño sin almuerzo por una deuda de 8 euros");
    expect(html).not.toContain("Presenta solicitud de beca comedor aunque el plazo ordinario esté cerrado");
  });
  it("preserves the scoped procedure before loss of user status", () => {
    const html = renderGuideHtml("/comedor/impago-comedor-escolar");
    expect(html).toContain("dos recibos impagados");
    expect(html).toContain("diez días para alegar");
    expect(html).toContain("después resuelve el Consejo Escolar");
    expect(html).toContain("no se trasladan a otros territorios");
  });
  it("does not universalize municipal collection or automatic enforcement surcharges", () => {
    const html = renderGuideHtml("/comedor/impago-comedor-escolar");
    expect(html).toContain("No todas las facturas de comedor son ingresos municipales");
    expect(html).toContain("no se aplican recargos de apremio automáticamente");
    expect(html).not.toContain("un plazo de un mes para abonar");
    expect(html).not.toContain("la suspensión llega igual");
  });
});
