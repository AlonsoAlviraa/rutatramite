import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Public_Sans: () => ({ variable: "--font-source-sans" }),
  Newsreader: () => ({ variable: "--font-display" }),
}));
import type { Metadata } from "next";
import HomePage, { metadata as homeMetadata } from "@/app/page";
import DniPage, { metadata as dniMetadata } from "@/app/dni/page";
import PassportPage, { metadata as passportMetadata } from "@/app/pasaporte/page";
import BecasPage, { metadata as becasMetadata } from "@/app/becas/page";
import ExtranjeriaPage, { metadata as extranjeriaMetadata } from "@/app/extranjeria/page";
import CcaaPage, { generateMetadata as ccaaMetadata } from "@/app/empadronarse/[ccaa]/page";
import RecursosPage from "@/app/recursos/page";
import PadronResource from "@/app/recursos/padron-municipal/page";
import { metadata as buscarMetadata } from "@/app/buscar/page";
import { metadata as rootMetadata } from "@/app/layout";
import { SiteNav } from "@/components/empadronamiento/SiteNav";
import { aidDataset } from "@/lib/aid-data";
import { loadMunicipio } from "@/lib/data/load";
import { padronDataset } from "@/lib/padron-data";
import { fichaPageMetadata } from "@/lib/seo/meta";
import { websiteJsonLd } from "@/lib/seo/jsonld";
import { isFichaIndexable } from "@/lib/seo/localSignals";
import { CITA_DNI_URL, SEDE_AAPP_URL } from "@/lib/tramites/facts";
import { PRODUCT_NAME } from "@/lib/types";

// Experimento 2026-10-10 (titleExperiment.ts): las rutas tratadas pueden publicar { absolute } sin sufijo
// cuando title + « · RutaTrámite» supera 60 caracteres; el texto del title sigue siendo igual al H1.
function heading(meta: Metadata): string {
  if (typeof meta.title === "string") return meta.title;
  if (meta.title && typeof meta.title === "object" && "absolute" in meta.title && typeof meta.title.absolute === "string") return meta.title.absolute;
  throw new Error("la ruta no publica un title de texto");
}

function h1(html: string): string {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/);
  if (!match) throw new Error("falta el H1");
  return match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function before(html: string, marker: string): string {
  const start = html.indexOf("<h1");
  const end = html.indexOf(marker);
  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);
  return html.slice(start, end);
}

describe("hallabilidad de las rutas de la auditoría del 22 de septiembre", () => {
  it("iguala el H1 al título y deja el sufijo de sitio solo en la plantilla", () => {
    const template = rootMetadata.title;
    expect(template).toEqual(expect.objectContaining({ template: `%s · ${PRODUCT_NAME}` }));
    const pages = [
      [homeMetadata, renderToStaticMarkup(createElement(HomePage)), /documentos y sedes oficiales/],
      [dniMetadata, renderToStaticMarkup(createElement(DniPage)), /cita previa/, /12 € y 30 €/, /España/],
      [passportMetadata, renderToStaticMarkup(createElement(PassportPage)), /30 €/, /España/],
      [becasMetadata, renderToStaticMarkup(createElement(BecasPage)), /2026-27/, /consultar estado, plazos, cobro y otras becas/],
      [extranjeriaMetadata, renderToStaticMarkup(createElement(ExtranjeriaPage)), /citas, documentos y expedientes/],
    ] as const;
    for (const [meta, html, ...terms] of pages) {
      const title = heading(meta);
      const visible = h1(html);
      expect(visible).toBe(title);
      expect(visible).not.toContain(`· ${PRODUCT_NAME}`);
      for (const term of terms) expect(visible).toMatch(term);
    }
  });

  it("experimento sin sufijo: solo rutas tratadas y solo si superan 60 caracteres con sufijo", async () => {
    const { NO_BRAND_SUFFIX_PATHS, BRAND_SUFFIX, TITLE_MAX, titleWithExperiment } = await import("@/lib/seo/titleExperiment");
    for (const control of ["/dni/cita-previa", "/extranjeria/autorizacion-regreso", "/inventario-fianza-alquiler"]) {
      expect(NO_BRAND_SUFFIX_PATHS.has(control)).toBe(false);
      expect(titleWithExperiment("x".repeat(70), control)).toBe("x".repeat(70));
    }
    expect(titleWithExperiment("Corto", "/dni")).toBe("Corto");
    const long = "y".repeat(TITLE_MAX - BRAND_SUFFIX.length + 1);
    expect(titleWithExperiment(long, "/dni")).toEqual({ absolute: long });
    expect(rootMetadata.title).toEqual(expect.objectContaining({ template: `%s · ${PRODUCT_NAME}` }));
  });

  it("iguala el H1 de los directorios de Madrid y Extremadura con su title", async () => {
    for (const slug of ["comunidad-de-madrid", "extremadura"]) {
      const meta = await ccaaMetadata({ params: Promise.resolve({ ccaa: slug }) });
      const html = renderToStaticMarkup(await CcaaPage({ params: Promise.resolve({ ccaa: slug }) }));
      const title = heading(meta);
      expect(h1(html)).toBe(title);
      expect(title).toMatch(/directorio de municipios/);
      expect(h1(html)).not.toContain(`· ${PRODUCT_NAME}`);
    }
  });

  it("sube al primer bloque los datos y enlaces que ya publicaba cada página", () => {
    const padron = renderToStaticMarkup(createElement(PadronResource));
    const cordoba = padronDataset().records.find((row) => row.ine_code === "14021");
    expect(cordoba).toBeTruthy();
    const modelo = cordoba!.documents.find((doc) => doc.includes("60-444"));
    expect(modelo).toBeTruthy();
    expect(isFichaIndexable(loadMunicipio(cordoba!.ine_code))).toBe(true);
    const padronLead = before(padron, "Municipios y evidencia");
    expect(padronLead).toContain(cordoba!.name);
    expect(padronLead).toContain(modelo!);
    expect(padronLead).toContain(`href="${cordoba!.guide_url}"`);

    const recursos = renderToStaticMarkup(createElement(RecursosPage));
    const bono = aidDataset().records.find((row) => row.id === "bono-andalucia");
    expect(bono).toBeTruthy();
    const recursosLead = before(recursos, "Registros y fuentes");
    expect(recursosLead).toContain(bono!.name);
    expect(recursosLead).toContain(bono!.status);
    expect(bono!.status).toBe("Solicitud cerrada");
    expect(recursosLead).toContain(`href="${bono!.source_url}"`);
    expect(new URL(bono!.source_url).hostname).not.toMatch(/rutatramite\.(com|es)/);

    const passport = renderToStaticMarkup(createElement(PassportPage));
    const passportLead = before(passport, "data-pack-grid");
    expect(passportLead).toContain(`href="${CITA_DNI_URL}"`);
    expect(passportLead).toContain('href="/pasaporte/caducado-sin-cita"');

    const extranjeria = renderToStaticMarkup(createElement(ExtranjeriaPage));
    const extranjeriaLead = before(extranjeria, "data-pack-grid");
    expect(extranjeriaLead).toContain(`href="${SEDE_AAPP_URL}"`);
    expect(new URL(SEDE_AAPP_URL).hostname).not.toMatch(/rutatramite\.(com|es)/);
  });

  it("conserva los no-errores que la auditoría dio por cerrados", () => {
    const home = renderToStaticMarkup(createElement(HomePage));
    expect(home).toContain('href="/ayudas"');
    expect(home).toContain('href="/alquiler"');
    const nav = renderToStaticMarkup(createElement(SiteNav));
    expect(nav).toContain("Asistente de padrón");
    expect(nav).not.toContain("Mi guía de padrón");
    expect(buscarMetadata.robots).toEqual({ index: false, follow: true });
    expect(JSON.stringify(websiteJsonLd())).not.toContain("SearchAction");
    expect(fichaPageMetadata(loadMunicipio("33024")).robots).toEqual({ index: false, follow: true });
    expect(isFichaIndexable(loadMunicipio("33024"))).toBe(false);
  });
});
