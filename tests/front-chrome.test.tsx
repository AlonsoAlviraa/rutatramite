import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { SiteHeader } from "@/components/empadronamiento/SiteHeader";
import { SiteFooter } from "@/components/empadronamiento/SiteFooter";
import { PackIndex } from "@/components/tramites/PackIndex";
import PassportPage from "@/app/pasaporte/page";
import { renderFichaHtml, renderPilarHtml, renderEscenarioHtml, renderGuideHtml } from "@/lib/render/server";
import { loadMunicipio } from "@/lib/data/load";
import { PRODUCT_NAME, WIZARD_QUESTIONS } from "@/lib/types";

describe("front chrome and homepage hierarchy (shipped views)", () => {
  it("passport route has its own heading and relevant directory", () => {
    const html = renderToStaticMarkup(createElement(PassportPage));
    expect(html).toContain("Pasaporte: cita, documentos y renovación");
    expect(html).toContain('href="/pasaporte/cita-previa"');
    expect(html).toContain('href="/dni/primera-expedicion-menor"');
    expect(html).not.toContain('href="/dni/caducado-banco"');
    expect(html).not.toContain("El padrón lo gestiona cada Ayuntamiento");
  });
  it("header + portada: product, 6 wizard questions, assistant marker, nav, pack cards not only ul", () => {
    const html = renderToStaticMarkup(
      createElement(Fragment, null, createElement(SiteHeader), createElement(HomePage)),
    );
    expect(html).toContain(PRODUCT_NAME);
    expect(html).toContain("data-home-wizard");
    expect(html).toContain("data-wizard");
    expect(html).toContain("/empadronarse");
    expect(html).toContain("/dni");
    expect(html).toContain("/extranjeria");
    for (const q of WIZARD_QUESTIONS) {
      expect(html).toContain(q);
    }
    expect(html).toContain("data-pack-card");
    expect(html).toContain("data-pack-grid");
    const homePacks = html.match(/data-pack-card/g) ?? [];
    expect(homePacks.length).toBeGreaterThanOrEqual(8);
    expect(html).toContain('id="asistente"');
    expect(html).toContain("Menú");
  });

  it("footer lists packs and the independent-guide disclaimer", () => {
    const html = renderToStaticMarkup(createElement(SiteFooter));
    expect(html).toContain(PRODUCT_NAME);
    expect(html).toContain("/empadronarse");
    expect(html).toContain("/dni");
    expect(html).toContain("/extranjeria");
    expect(html).toContain("No somos Administración Pública");
  });

  it("pack indexes and primary templates keep CTA, crumbs and disclaimer chrome", () => {
    const dni = renderToStaticMarkup(createElement(PackIndex, { pack: "viaje" }));
    expect(dni).toContain('data-pack-index="viaje"');
    expect(dni).toContain("data-pack-card");
    expect(dni).toContain('aria-label="Migas de pan"');
    expect(dni).toContain("citapreviadnie.es");

    const extranjeria = renderToStaticMarkup(createElement(PackIndex, { pack: "extranjeria" }));
    expect(extranjeria).toContain("data-pack-card");
    expect(extranjeria).toContain("No somos Administración");

    const pilar = renderPilarHtml();
    expect(pilar).toContain('aria-label="Migas de pan"');
    expect(pilar).toContain("No somos Administración Pública");
    expect(pilar).toContain("data-pack-card");

    const escenario = renderEscenarioHtml("sin-contrato");
    expect(escenario).toContain('aria-label="Migas de pan"');
    expect(escenario).toContain("No somos Administración Pública");

    const ficha = renderFichaHtml(loadMunicipio("28079"));
    expect(ficha).toContain("data-official-cta");
    expect(ficha).toContain("sede.madrid.es");
    expect(ficha).toContain('aria-label="Migas de pan"');
    expect(ficha).toContain("No somos Administración Pública");

    const cita = renderGuideHtml("/dni/cita-previa");
    expect(cita).toContain("citapreviadnie.es");
    expect(cita).toContain("data-official-cta");
    expect(cita).toContain("No somos Administración Pública");
  });
});
