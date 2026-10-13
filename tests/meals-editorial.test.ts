import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PackIndex } from "@/components/tramites/PackIndex";
import { renderGuideHtml } from "@/lib/render/server";

describe("School meals: current scope and safe handling of documentation", () => {
  it("cites the special-menu decree on the hub and does not set a national grant deadline", () => {
    const html = renderToStaticMarkup(createElement(PackIndex, { pack: "comedor" }));
    expect(html).toContain('href="https://www.boe.es/buscar/act.php?id=BOE-A-2025-7659#a1-2"');
    expect(html).toContain("artículo 10: menús especiales");
    expect(html).toContain('href="/comedor/beca-comedor-2026-2027"');
    expect(html).toContain("no un plazo nacional");
    expect(html).toContain("normas estatales y autonómicas aplicables");
    expect(html).not.toMatch(/el plazo nacional es|cuesta \d+ €|tasa de \d+/i);
  });

  it("separates medical from ethical/religious requests and includes the safe family-food alternative", () => {
    const html = renderGuideHtml("/comedor/menu-especial-comedor");
    expect(html).toContain("motivos éticos o religiosos, sin exigir para estos una justificación médica");
    expect(html).toContain("medios de refrigeración y calentamiento adecuados");
    expect(html).toContain("Esto no equivale a que el servicio de comedor sea gratuito");
    expect(html).not.toContain("el certificado médico es la llave");
  });

  it("identifies the effective rules and excludes first-cycle nursery from the decree scope", () => {
    const html = renderGuideHtml("/comedor/menu-especial-comedor");
    expect(html).toContain("16 de abril de 2026");
    expect(html).toContain("públicos, concertados y privados");
    expect(html).toContain("El primer ciclo de Infantil no figura en ese ámbito");
    expect(html).toContain("Ley 17/2011");
  });

  it("does not prescribe the standard menu while a certificate is pending", () => {
    const html = renderGuideHtml("/comedor/documentos-alergia-comedor-escolar");
    expect(html).toContain("no debe darse por seguro el menú estándar");
    expect(html).toContain("Una nota familiar comunica la situación, pero no sustituye la acreditación clínica");
    expect(html).toContain("no hay una regla estatal que imponga servir el menú estándar");
    expect(html).not.toContain("el niño recibe el estándar");
    expect(html).not.toContain("Sin el documento, el servicio no puede modificar el menú");
  });

  it("limits the sample school form and avoids blanket annual renewal/public-doctor requirements", () => {
    const html = renderGuideHtml("/comedor/documentos-alergia-comedor-escolar");
    expect(html).toContain("No es una lista nacional de requisitos");
    expect(html).toContain("una actualización anual no es una obligación general");
    expect(html).toContain("ni que solo pueda emitirlo la pediatría pública");
    expect(html).toContain("no se deducen automáticamente de una solicitud de menú adaptado");
    expect(html).not.toContain("los servicios suelen pedir actualización anual");
  });
});
