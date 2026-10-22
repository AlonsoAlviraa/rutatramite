import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("officially checked birth benefits and residence evidence", () => {
  it("distinguishes three birth benefits without promising a universal IPREM payment", () => {
    const guide = getGuideByPath("/bebe/prestacion-por-nacimiento")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("100 % de la base reguladora");
    expect(html).toContain("Modalidad no contributiva");
    expect(html).toContain("Ayuda familiar de pago único");
    expect(html).toContain("límites de ingresos");
    expect(html).toContain("tres meses anteriores");
    expect(html).not.toMatch(/Es un pago único del 100% del IPREM|RD-ley 5\/2023|el cómputo.*no admite prolongaciones/);
    expect(guide.cta.href).not.toBe(guide.secondaryCta?.href);
    for (const source of guide.sources!) expect(html).toContain(source.href.replaceAll("&", "&amp;"));
  });

  it("allows proof of presence before registration and preserves the family exception", () => {
    const guide = getGuideByPath("/extranjeria/arraigo-padron")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("permanencia anterior que puedas acreditar");
    expect(html).toContain("hospitalización");
    expect(html).toContain("El arraigo familiar no exige ese mínimo");
    expect(html).not.toMatch(/el reloj empieza ahora|padrón de dos años se construye/);
    expect(guide.sources?.some(s => s.href.includes("inclusion.gob.es"))).toBe(true);
    expect(guide.sources?.some(s => s.href.includes("BOE-A-2024-24099"))).toBe(true);
    expect(html).toContain("Revisado");
  });

  it("gives NIE channels without fabricated appointment scarcity or scam verdicts", () => {
    const guide = getGuideByPath("/extranjeria/nie")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("oficinas consulares");
    expect(html).toContain("EX-15");
    expect(html).toContain("790 código 012");
    expect(html).not.toMatch(/sin hueco fácil|80 €|es un clon/);
    expect(guide.cta.href).toContain("tramite_asignacion_nie.php");
  });

  it("explains the limits of return authorization and links its distinct form guide", () => {
    const guide = getGuideByPath("/extranjeria/autorizacion-regreso")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("dentro del plazo legal");
    expect(html).toContain("razones excepcionales");
    expect(html).toContain("pasos fronterizos españoles habilitados");
    expect(html).not.toContain("No hay un bot legal");
    expect(html).toContain('href="/extranjeria/autorizacion-regreso-ex13"');
    expect(guide.cta.href).toContain("tramite_autorizacionregreso.php");
  });
});
