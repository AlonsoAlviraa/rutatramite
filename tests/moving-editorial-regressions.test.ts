import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Moving: census scope, deadlines and actual submission", () => {
  it("does not route every taxpayer through 030 and preserves the earlier IRPF deadline", () => {
    const html = renderGuideHtml("/hacienda/modelo-030");
    expect(html).toContain("modelo 036");
    expect(html).toContain("tres meses desde el cambio");
    expect(html).toContain("Si antes termina el plazo de la declaración de IRPF");
    expect(html).toContain("salvo que ya lo hayas comunicado");
    expect(html).toContain("un mes desde el día siguiente al cambio");
  });

  it("allows municipal DGT channels only with an agreement and separates the two addresses", () => {
    const guide = getGuideByPath("/mudanza")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("dirección para notificaciones como el domicilio fiscal");
    expect(html).toContain("15 días");
    expect(html).toContain("ayuntamiento con convenio");
    expect(html).toContain("no todos ofrecen este servicio");
    expect(guide.sources?.some(s => s.href.endsWith("/ayuntamientos-colaboradores/"))).toBe(true);
    expect(html).not.toContain("no en el ayuntamiento");
  });

  it("gets proof after submission and does not treat the preview as a filed declaration", () => {
    const html = renderGuideHtml("/modelo-030-cambio-domicilio");
    expect(html).toContain("borrador que no sirve como declaración presentada");
    expect(html).toContain("se obtiene después del envío");
    expect(html).toContain("puede no ser inmediata");
    expect(html).toContain("apoderamiento");
    expect(html).toContain("correo certificado");
  });

  it("supports separate administrative communications without inventing a mandatory DNI-first sequence", () => {
    const html = renderGuideHtml("/mudanza");
    expect(html).toContain("no hace falta esperar a renovar el DNI");
    expect(html).toContain("servicio público de comunicación de domicilio");
    expect(html).toContain("no te autoriza por sí solo a firmar por otro adulto");
    expect(html).not.toContain("Septiembre es el mes del cambio de piso");
    expect(getGuideByPath("/hacienda/modelo-030")?.sources?.some(s => s.href.includes("/modificaciones-censales.html"))).toBe(true);
  });
});
