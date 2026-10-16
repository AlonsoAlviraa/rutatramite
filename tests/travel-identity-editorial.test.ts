import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Return authorization and FNMT: consistent instructions", () => {
  it("allows the three return-authorization cases in the EX-13 preparation guide", () => {
    const guide = getGuideByPath("/extranjeria/autorizacion-regreso-ex13")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toContain("tramite_autorizacionregreso.php");
    expect(html).toContain("original y copia");
    expect(html).toContain("dentro del plazo legal");
    expect(html).toContain("Duplicado de TIE en vigor");
    expect(html).toContain("Primera autorización favorable");
    expect(html).toContain("necesidad del viaje y circunstancias excepcionales");
    expect(html).not.toMatch(/Solo procede con expediente en trámite|no una copia del primero|banco o por internet/);
  });

  it("does not turn a renewal receipt into a universal domestic flight document", () => {
    const guide = getGuideByPath("/extranjeria/tie-caducada-viajar")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.sources?.some(source => source.href.startsWith("https://www.aena.es/"))).toBe(true);
    expect(html).toContain("no figura en esa lista como sustituto de una TIE");
    expect(html).toContain("pasaporte o documento de viaje válido y vigente");
    expect(html).not.toMatch(/resguardo de renovación más pasaporte válido suele bastar|no cruzas frontera/);
  });

  it("requires checking the first entry country and actual validity dates", () => {
    const html = renderGuideHtml("/extranjeria/tie-caducada-viajar");
    expect(html).toContain("aterrizas primero en otro país");
    expect(html).toContain("fechas concedidas");
    const christmas = renderGuideHtml("/extranjeria/autorizacion-regreso-navidad");
    expect(christmas).toContain("desde esa caducidad");
    expect(christmas).toContain("desde la concesión del regreso");
    expect(christmas).toContain("aunque caiga en enero");
    expect(christmas).not.toMatch(/temporadas anteriores se dieron medidas|calendario que funciona/);
  });

  it("explains software setup, user continuity, delivery of the code and the download password", () => {
    const guide = getGuideByPath("/extranjeria/certificado-digital-nie")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href.endsWith("/obtener-certificado-software")).toBe(true);
    expect(html).toContain("Configurador FNMT-RCM");
    expect(html).toContain("mismo equipo y el mismo usuario");
    expect(html).toContain("código de solicitud llega al correo electrónico");
    expect(html).toContain("contraseña que se volverá a pedir al descargar");
    expect(html).not.toMatch(/mismo navegador|evita la mitad|errores típicos|verde A4/);
  });

  it("preserves identity evidence, age scope and the specific accredited-office procedure", () => {
    const guide = getGuideByPath("/extranjeria/certificado-digital-nie")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("mayores de 18 años y menores emancipados");
    expect(html).toContain("pasaporte en vigor");
    expect(html).toContain("legitimación notarial de la firma");
    expect(guide.sources?.some(source => source.href.endsWith("/acreditar-identidad"))).toBe(true);
    expect(html).not.toContain("Quién eres lo sigue acreditando el pasaporte, la TIE o el certificado de registro");
  });
});
