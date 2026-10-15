import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("DNI: documentary sources and scope of administrative rules", () => {
  it("preserves the guide-specific municipal sources instead of overwriting them", () => {
    const guide = getGuideByPath("/dni/unidades-moviles")!;
    expect(guide.sources?.some(source => source.href.startsWith("https://aytocabanillas.org/"))).toBe(true);
    expect(guide.sources?.some(source => source.href.startsWith("https://www.pielagos.es/"))).toBe(true);
    expect(renderGuideHtml(guide.path)).toContain("https://aytocabanillas.org/eventos/vidoc-en-cabanillas/");
    const unchanged = getGuideByPath("/dni/primera-expedicion-menor")!;
    expect(unchanged.sources?.some(source => source.href.includes("documentacion-necesaria-para-su-tramitacion"))).toBe(true);
  });

  it("does not direct every mobile appointment to the national portal", () => {
    const guide = getGuideByPath("/dni/unidades-moviles")!;
    expect(guide.lead).toContain("no se gestiona siempre en citapreviadnie.es");
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("sede electrónica");
    expect(html).toContain("teléfono municipal");
    expect(html).toContain("No acreditan que queden plazas");
  });

  it("allows the documented two-booking exception without claiming cancellation as a sanction", () => {
    const html = renderGuideHtml("/dni/misma-cita-pasaporte");
    expect(html).toContain("determinados servicios móviles se exigen dos reservas");
    expect(html).toContain("Piélagos");
    expect(html).toContain("no hace falta aportar otra fotografía");
    expect(html).not.toMatch(/saturas la cola y te pueden anular|Mucha gente no lo sabe/);
  });

  it("does not make the last 180 days an automatic loss of the address-change exemption", () => {
    const guide = getGuideByPath("/dni/cambio-domicilio")!;
    expect(guide.lead).toContain("ni elimina por sí solo esa exención");
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("como máximo tres meses");
    expect(html).toContain("Si no hay conexión");
    expect(renderGuideHtml("/mudanza")).not.toContain("Si está caducado o a 180 días");
    expect(guide.sources?.some(source => source.href.endsWith("/tasas/dni/"))).toBe(true);
  });

  it("distinguishes legal digital identification from cross-border travel and future online features", () => {
    const html = renderGuideHtml("/dni/midni");
    expect(html).toContain("misma eficacia jurídica");
    expect(html).toContain("terminó en abril de 2026");
    expect(html).toContain("requiere conexión");
    expect(html).toContain("Un anuncio de futuras funciones no acredita que estén disponibles");
    expect(html).not.toContain("Si un establecimiento acepta MiDNI, perfecto");
  });

  it("preserves the EU border safeguard without promising boarding on an expired ID", () => {
    const html = renderGuideHtml("/dni/caducado-viajar-ue");
    expect(html).toContain("posibilidades razonables");
    expect(html).toContain("no una autorización general para embarcar");
    expect(html).toContain("origen y destino en España");
    expect(html).not.toContain("Algunos países y algunas compañías han sido flexibles");
  });
});
