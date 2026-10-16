import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PackIndex } from "@/components/tramites/PackIndex";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("birth registration and children's health records", () => {
  it("cites the Civil Registry Act for the 72-hour and ten-day deadlines on the hub", () => {
    const html = renderToStaticMarkup(createElement(PackIndex, { pack: "bebe" }));
    expect(html).toContain('href="https://www.boe.es/buscar/act.php?id=BOE-A-2011-12628#a46"');
    expect(html).toContain("72 horas");
    expect(html).toContain("diez días desde el nacimiento");
    expect(html).toContain("No se suman ambos plazos");
  });

  it("does not add the hospital and declaration deadlines or send parents to the hospital-only service", () => {
    const guide = getGuideByPath("/bebe/inscripcion-nacimiento-registro-civil")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.lead).toContain("diez días desde el nacimiento");
    expect(guide.lead).toContain("No se suman ambos plazos");
    expect(guide.cta.href).toContain("mjusticia.gob.es/es/ciudadania/");
    expect(html).toContain("centros sanitarios autorizados");
    expect(html).not.toMatch(/A partir de ahí|no puedes tramitar DNI, tarjeta sanitaria|hasta cinco años después/);
    expect(html).toContain('href="/bebe/prestacion-por-nacimiento"');
  });

  it("separates INSS evidence from the regional card and preserves the newborn document exception", () => {
    const guide = getGuideByPath("/bebe/tarjeta-sanitaria-bebe")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toContain("asistencia-sanitaria-gestion-beneficiarios.html");
    expect(html).toContain("menor de tres meses no es obligatorio");
    expect(html).toContain("no elimina los requisitos propios de la tarjeta autonómica");
    expect(html).not.toMatch(/tarjeta provisional de tres meses|el historial sanitario viaja|obtendrás el documento P1/);
  });

  it("uses the Madrid calendar and distinguishes the individual adult portal from a baby's record", () => {
    const guide = getGuideByPath("/bebe/calendario-vacunal-madrid")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toBe("https://www.comunidad.madrid/salud/vacunas");
    expect(html).toContain("a partir de 16 años");
    expect(html).toContain("no es un certificado personal");
    expect(html).not.toContain("qué no puede hacer");
  });

  it("explains an actual download and does not promise national or automatic availability", () => {
    const guide = getGuideByPath("/bebe/certificado-vacunacion-descargar")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("Estat vacunal");
    expect(html).toContain("Justificant vacunal de COVID-19 es un documento distinto");
    expect(html).toContain("consentimiento del menor");
    expect(html).toContain("traslado de historia clínica desde otra comunidad");
    expect(html).not.toMatch(/en cada comunidad|certificado puede expedirse en cualquier momento|si está vacío no es un error/);
    expect(guide.cta.href).toContain("/ajuda/serveis/informacio-clinica");
  });

  it("keeps consultation, paper records and recipient requirements distinct", () => {
    const digital = renderGuideHtml("/bebe/cartilla-vacunacion-digital");
    const paper = renderGuideHtml("/bebe/cartilla-de-vacunacion-donde-se-saca");
    expect(digital).toContain("desde los 16 requiere consentimiento");
    expect(digital).toContain("a partir de una cartilla o de información verbal");
    expect(paper).toContain("documento, la finalidad y el formato");
    for (const html of [digital, paper]) {
      expect(html).not.toMatch(/ningún colegio puede rechazar|el duplicado es el certificado|plenamente válido/);
      expect(html).toContain("consejo médico");
    }
  });

  it("does not treat a birth certificate as universal proof or guarantee instant issuance", () => {
    const guide = getGuideByPath("/bebe/libro-de-familia-vigente")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toContain("/certificado-nacimiento");
    expect(guide.secondaryCta?.href).toContain("/certificado-matrimonio");
    expect(html).toContain("solicitud general");
    expect(html).toContain("depende de que los datos estén disponibles telemáticamente");
    expect(html).not.toMatch(/válidos para todo|íntegramente digital|se emite al momento|sustituyen al libro.*todo trámite/i);
  });
});
