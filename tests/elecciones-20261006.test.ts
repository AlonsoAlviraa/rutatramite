import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { NAV_LINKS } from "@/components/empadronamiento/SiteNav";
import { PackIndex } from "@/components/tramites/PackIndex";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";
import { buildSitemapEntries } from "@/lib/seo/sitemapEntries";

const PATHS = [
  "/elecciones/voto-por-correo",
  "/elecciones/calendario-29-noviembre",
  "/elecciones/quien-puede-votar",
  "/elecciones/nuevo-partido-coalicion",
  "/elecciones/huelga-general-sindicatos",
  "/alquiler/decretos-vivienda-derogados-octubre-2026",
  "/alquiler/propuestas-vivienda-6-octubre-2026",
] as const;

describe("guías de actualidad 6 de octubre de 2026", () => {
  it("renders the mail-vote guide with the Correos dates and the official links", () => {
    const html = renderGuideHtml("/elecciones/voto-por-correo");
    expect(html).toContain("19 de noviembre de 2026");
    expect(html).toContain("25 de noviembre de 2026");
    expect(html).toContain("9 de noviembre");
    expect(html).toContain("https://www.correos.es/es/es/particulares/para-el-ciudadano/voto-por-correo");
    expect(html).toContain("https://www.boe.es/eli/es/rd/2026/10/05/806");
    expect(html).toContain("https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#asetentaydos");
  });

  it("renders the decree calendar and the census distinction from the shipped guide", () => {
    const calendar = renderGuideHtml("/elecciones/calendario-29-noviembre");
    expect(calendar).toContain("13 de noviembre");
    expect(calendar).toContain("27 de noviembre");
    expect(calendar).toContain("23 de diciembre de 2026");
    expect(calendar).toContain("Real Decreto 806/2026");

    const census = renderGuideHtml("/elecciones/quien-puede-votar");
    expect(census).toContain("artículo 176");
    expect(census).toContain("https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#acientosetentayseis");
    expect(census).toContain("https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#asetentaycinco");
  });

  it("renders both housing derogations and keeps the 2026-2030 plan as a different norm", () => {
    const html = renderGuideHtml("/alquiler/decretos-vivienda-derogados-octubre-2026");
    expect(html).toContain("BOE-A-2026-20526");
    expect(html).toContain("BOE-A-2026-20527");
    expect(html).toContain("Real Decreto-ley 26/2026");
    expect(html).toContain("Real Decreto-ley 27/2026");
    expect(html).toContain("https://www.boe.es/eli/es/rd/2026/04/22/326");
    const guide = getGuideByPath("/alquiler/decretos-vivienda-derogados-octubre-2026");
    expect(guide?.reviewedAt).toBe("2026-10-06");
    expect(guide?.pack).toBe("alquiler");
  });

  it("renders the coalition, the strike and the housing proposals from the shipped guides", () => {
    const coalition = renderGuideHtml("/elecciones/nuevo-partido-coalicion");
    expect(coalition).toContain("Frente Amplio");
    expect(coalition).toContain("Registro de Partidos Políticos");
    expect(coalition).toContain("artículo 44.2");
    expect(coalition).toContain("https://infoelectoral.interior.gob.es/es/proceso-electoral/preguntas-frecuentes/candidatos-y-candidaturas/");
    expect(getGuideByPath("/elecciones/nuevo-partido-coalicion")?.faqs?.[1]?.a).toContain("Ada Colau");

    const strike = renderGuideHtml("/elecciones/huelga-general-sindicatos");
    expect(strike).toContain("24 horas");
    expect(strike).toContain("11 de noviembre");
    expect(strike).toContain("cinco días naturales");
    expect(strike).toContain("29 de noviembre de 2026");
    expect(strike).toContain("https://ugt.es/ugt-y-ccoo-acuerdan-la-convocatoria-de-una-huelga-general-este-otono");
    expect(strike).toContain("https://www.boe.es/buscar/doc.php?id=BOE-A-1977-6061");

    const housing = renderGuideHtml("/alquiler/propuestas-vivienda-6-octubre-2026");
    expect(housing).toContain("21 medidas");
    expect(housing).toContain("Diputación Permanente");
    expect(housing).toContain("50.000 euros");
    expect(housing).toContain("Real Decreto 326/2026");
    expect(housing).toContain("Ese resumen no es la norma");
    expect(housing).toContain("https://www.lamoncloa.gob.es/consejodeministros/resumenes/paginas/2026/061026-rueda-prensa-ministros.aspx");
    expect(housing).toContain("https://www.boe.es/boe/dias/2026/10/06/");
  });

  it("lists the actualidad guides in the sitemap builder", () => {
    const urls = buildSitemapEntries().map((entry) => entry.url);
    for (const path of PATHS) {
      expect(urls).toContain(`https://rutatramite.com${path}`);
    }
    expect(urls).toContain("https://rutatramite.com/elecciones");
  });

  it("renders the elections hub and lists it in the site nav", () => {
    const html = renderToStaticMarkup(createElement(PackIndex, { pack: "elecciones" }));
    expect(html).toContain("Elecciones del 29 de noviembre de 2026");
    expect(html).toContain('href="/elecciones/voto-por-correo"');
    expect(html).toContain('href="/elecciones/quien-puede-votar"');
    expect(html).toContain('href="/elecciones/nuevo-partido-coalicion"');
    expect(html).toContain('href="/elecciones/huelga-general-sindicatos"');
    expect(NAV_LINKS.some((link) => link.href === "/elecciones" && link.label === "Elecciones")).toBe(true);
  });
});
