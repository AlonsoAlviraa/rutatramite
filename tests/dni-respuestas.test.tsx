import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PackIndex, PACK_DOCUMENT_HEADINGS } from "@/components/tramites/PackIndex";
import { DNI_FAQS, DNI_SOURCES } from "@/lib/tramites/dni-respuestas";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { TASA_DNI_LABEL, TASA_PASAPORTE_LABEL } from "@/lib/tramites/facts";

describe("/dni respuestas directas (2026-10-13)", () => {
  const html = renderToStaticMarkup(<PackIndex pack="viaje" />);
  it("answers price, renewal and documents near the top with BOE source", () => {
    expect(TASA_DNI_LABEL).toBe("12 €");
    expect(TASA_PASAPORTE_LABEL).toBe("30 €");
    expect(DNI_SOURCES.ley84.href).toMatch(/^https:\/\/www\.boe\.es\//);
    const quick = html.indexOf("data-dni-quick");
    expect(quick).toBeGreaterThan(0);
    expect(quick).toBeLessThan(html.indexOf("tasas-documentos"));
    expect(html).toContain("precio del DNI 2026: 12 €");
    expect(html).toContain("No se renueva por internet");
  });
  it("emits FAQPage JSON-LD matching visible FAQs", () => {
    expect(DNI_FAQS.length).toBeGreaterThanOrEqual(6);
    expect(html).toContain('"@type":"FAQPage"');
    for (const f of DNI_FAQS) expect(html).toContain(f.q);
  });
  it("links to cita, pasaporte, descargas and DNI caducado para votar", () => {
    for (const href of ["/dni/cita-previa", "/pasaporte", "/descargas", "/elecciones/dni-caducado-votar"]) expect(html).toContain(`href="${href}"`);
  });
  it("keeps titles frozen and links /pasaporte and /dni/cita-previa back to /dni", () => {
    expect(PACK_DOCUMENT_HEADINGS.viaje).toBe("Renovar DNI y pasaporte 2026 en España: precio 12 € y 30 €, cita previa");
    const pas = renderToStaticMarkup(<PackIndex pack="viaje" focus="pasaporte" />);
    expect(pas).toContain('href="/dni"');
    expect(pas).not.toContain("data-dni-quick");
    const cita = getGuideByPath("/dni/cita-previa")!;
    expect(cita.title).toBe("Cita previa DNI en citapreviadnie.es: pedir o consultar");
    expect(cita.related[0].href).toBe("/dni");
    expect(cita.faqs!.length).toBeGreaterThanOrEqual(4);
  });
});
