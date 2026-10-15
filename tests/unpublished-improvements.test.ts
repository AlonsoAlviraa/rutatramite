import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import FuentesPage from "@/app/fuentes/page";
import MetodologiaPage from "@/app/metodologia/page";
import { loadMunicipio } from "@/lib/data/load";
import {
  renderCcaaHubHtml,
  renderEscenarioHtml,
  renderFichaHtml,
  renderGuideHtml,
  renderProvinciaHubHtml,
} from "@/lib/render/server";
import { isFichaIndexable } from "@/lib/seo/localSignals";
import { fichaPageMetadata } from "@/lib/seo/meta";

describe("unpublished 16-sep editorial improvements on shipped renderers", () => {
  it("Mercurio HTML does not send foreign-passport renewal to Spanish DNI appointment", () => {
    const html = renderGuideHtml("/extranjeria/mercurio");
    expect(html).toContain("no sirve para renovar un pasaporte extranjero");
    expect(html).toContain("autoridad emisora o a la representación consular competente");
    expect(html).toContain("/directorio/mercurio2");
    expect(html).not.toContain("citapreviadnie.es");
    expect(html).not.toContain("tasas 2026: DNI 12 €");
  });

  it("regularization HTML keeps the individual deadline and drops the duplicated office count", () => {
    const correos = renderGuideHtml("/extranjeria/subsanar-regularizacion-correos");
    expect(correos).toContain("Esa fecha no amplía el plazo de tu requerimiento");
    expect(correos).toContain("no puede superar quince días");
    expect(correos).not.toContain("383 oficinas oficinas");
    const resolution = renderGuideHtml("/extranjeria/regularizacion-2026-resolucion");
    expect(resolution).toContain("tres meses para resolver y notificar");
    expect(resolution).toContain("el mero silencio no la extingue");
    expect(resolution).toContain("report_20260722-criterio-interpretativo-rd-316-2026-def");
  });

  it("family-padrón scenario HTML requires effective residence, not a co-owner veto", () => {
    const html = renderEscenarioHtml("casa-de-familiar");
    expect(html).toContain("residencia efectiva");
    expect(html).toContain("idapadron.ine.es/repositorio/legislacion/A290426.HTML");
    expect(html).toContain("BOE-A-2020-4784");
    expect(html).toContain("No atribuyas a un copropietario un veto automático");
    expect(html).toContain("Una mudanza prevista no equivale a residir allí");
    expect(html).not.toContain("intención de mudarse");
  });

  it("fuentes and metodología HTML split INE codes from population and keep municipal noindex", () => {
    const fuentes = renderToStaticMarkup(createElement(FuentesPage));
    expect(fuentes).toContain("cid=1254736177031");
    expect(fuentes).toContain("cid=1254736177011");
    expect(fuentes).toContain("cifras de habitantes");
    const metodologia = renderToStaticMarkup(createElement(MetodologiaPage));
    expect(metodologia).toContain("769 municipios");
    expect(metodologia).toContain("datos definitivos del INE");
    expect(metodologia).toContain("fuera del sitemap y se marcan para no ser indexadas");
    const madrid = loadMunicipio("28079");
    const alamo = loadMunicipio("28004");
    expect(isFichaIndexable(madrid)).toBe(true);
    expect(isFichaIndexable({ ...madrid, evidence: {} })).toBe(false);
    expect(isFichaIndexable({ ...madrid, docs_extra: [] })).toBe(false);
    expect(isFichaIndexable(alamo)).toBe(false);
    expect(fichaPageMetadata(alamo).robots).toEqual({ index: false, follow: true });
    expect(renderFichaHtml(alamo)).toContain("Pendiente de verificación local");
    const robots = renderFichaHtml(alamo);
    expect(robots).not.toMatch(/<meta[^>]+name="robots"[^>]+content="index, follow"/i);
  });

  it("autonomous-city directory HTML does not invent a province or empty INE catalogue", () => {
    const ccaa = renderCcaaHubHtml("Ceuta", "ceuta", ["Ceuta"]);
    expect(ccaa).toContain("Aún no hemos incorporado fichas");
    expect(ccaa).not.toContain("No hay municipios del catálogo INE");
    expect(ccaa.toLowerCase()).not.toContain("provincia de ceuta");
    const html = renderProvinciaHubHtml("Ceuta", "Ceuta", "ceuta", "ceuta");
    expect(html).toContain("ciudad autónoma");
    expect(html).not.toContain("No hay municipios del catálogo INE");
    expect(html).not.toContain('type="search"');
  });
});
