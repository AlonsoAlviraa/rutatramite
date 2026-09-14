import { describe, expect, it } from "vitest";
import { renderGuideHtml } from "@/lib/render/server";
import { ALL_GUIDES, guidesByPack, guidesIn } from "@/lib/tramites/catalog";
import { BEBE_GUIDES } from "@/lib/tramites/bebe";
import { BECAS_GUIDES } from "@/lib/tramites/becas";
import { AYUDAS_2026_GUIDES } from "@/lib/tramites/ayudas-2026";
import { COLE_GUIDES } from "@/lib/tramites/cole";
import { COMEDOR_GUIDES } from "@/lib/tramites/comedor";
import { DNI_NICHOS_GUIDES } from "@/lib/tramites/nichos-dni";
import { EXTRANJERIA_NICHOS_GUIDES } from "@/lib/tramites/nichos-extranjeria";
import { FP_GUIDES } from "@/lib/tramites/fp";
import { BECAS_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-becas";
import { IDENTIDAD_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-identidad";
import { COLE_COMEDOR_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-cole-comedor";
import { FP_BEBE_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-fp-bebe";
import { CITA_DNI_HOST, TASA_DNI_LABEL, TASA_PASAPORTE_LABEL } from "@/lib/tramites/facts";

const NEW_GUIDES: (typeof ALL_GUIDES)[number][] = [
  ...DNI_NICHOS_GUIDES,
  ...EXTRANJERIA_NICHOS_GUIDES,
  ...COLE_GUIDES,
  ...COMEDOR_GUIDES,
  ...FP_GUIDES,
  ...BEBE_GUIDES,
  ...BECAS_GUIDES,
  ...BECAS_NICHOS2_GUIDES,
  ...IDENTIDAD_NICHOS2_GUIDES,
  ...COLE_COMEDOR_NICHOS2_GUIDES,
  ...FP_BEBE_NICHOS2_GUIDES,
];

describe("nichos Q4 2026: cinco pilares nuevos y ampliación de packs", () => {
  it("publica el backlog de la corrida (conteos por pack)", () => {
    expect(DNI_NICHOS_GUIDES).toHaveLength(11);
    expect(EXTRANJERIA_NICHOS_GUIDES).toHaveLength(5);
    expect(COLE_GUIDES).toHaveLength(5);
    expect(COMEDOR_GUIDES).toHaveLength(5);
    expect(FP_GUIDES).toHaveLength(2);
    expect(BEBE_GUIDES).toHaveLength(3);
    expect(BECAS_GUIDES).toHaveLength(13);
    expect(NEW_GUIDES).toHaveLength(79);
    expect(BECAS_NICHOS2_GUIDES).toHaveLength(10);
    expect(IDENTIDAD_NICHOS2_GUIDES).toHaveLength(8);
    expect(COLE_COMEDOR_NICHOS2_GUIDES).toHaveLength(8);
    expect(FP_BEBE_NICHOS2_GUIDES).toHaveLength(9);
  });

  it("every guide path is unique and lives under its pillar index", () => {
    const paths = ALL_GUIDES.map((g) => g.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const g of NEW_GUIDES) {
      const index =
        g.pack === "viaje"
          ? undefined // viaje pack legitimately spans /dni/* and /pasaporte/*
          : `/${g.pack}`;
      if (index) {
        expect(g.path === index || g.path.startsWith(index + "/"), g.path).toBe(true);
      } else {
        expect(g.path.startsWith("/dni/") || g.path.startsWith("/pasaporte/"), g.path).toBe(true);
      }
    }
    // slug routing: single-segment [slug] packs cannot contain deeper nesting
    for (const g of [...COLE_GUIDES, ...COMEDOR_GUIDES, ...FP_GUIDES, ...BEBE_GUIDES]) {
      expect(g.path.split("/").length, g.path).toBeLessThanOrEqual(3);
    }
  });

  it("new DNI/passport guides keep the official-cita contract", () => {
    for (const g of DNI_NICHOS_GUIDES) {
      const html = renderGuideHtml(g.path);
      expect(html, g.path).toContain(CITA_DNI_HOST);
      expect(html, g.path).toContain(TASA_DNI_LABEL);
      expect(html, g.path).toContain(TASA_PASAPORTE_LABEL);
      expect(html, g.path).toContain("gratuita");
      expect(html.toLowerCase(), g.path).not.toContain("checkout");
    }
  });

  it("every new guide renders with disclaimer, https CTA and substantive sections", () => {
    for (const g of NEW_GUIDES) {
      const html = renderGuideHtml(g.path);
      expect(html, g.path).toContain("data-disclaimer");
      expect(html, g.path).toContain("No somos Administración Pública");
      expect(g.cta.href.startsWith("https://"), g.path).toBe(true);
      expect(html.toLowerCase(), g.path).not.toContain("localhost");
      expect(g.sections.length, g.path).toBeGreaterThan(0);
      expect(g.sections.every((section) => section.paragraphs.some((text) => text.trim())), g.path).toBe(true);
    }
  });

  it("becas: ventanas verificadas de septiembre de 2026", () => {
    const modificar = renderGuideHtml("/becas/mec/modificar-datos");
    expect(modificar).toContain("28 de septiembre");
    expect(modificar).toContain("7 al 28");
    const hub = renderGuideHtml("/becas/mec");
    expect(hub).toContain("7 de abril");
    expect(hub).toContain("19 de mayo");
    expect(hub).toContain("2.700");
    const cobro = renderGuideHtml("/becas/mec/cuando-se-cobra");
    expect(cobro).toContain("cuatro o cinco semanas");
    expect(cobro).toContain("no una garantía de pago");
    expect(cobro).not.toContain("45 días");
    expect(cobro).toContain("https://www.becaseducacion.gob.es/dudas/faqs.html");
    const colaboracion = renderGuideHtml("/becas/colaboracion");
    expect(colaboracion).toContain("22 de septiembre");
    expect(colaboracion).toContain("2.000");
    const patrimonio = renderGuideHtml("/becas/mec/denegada/por-patrimonio");
    expect(patrimonio).toContain("47.600");
    expect(patrimonio).toContain("14.450");
  });

  it("becas packs live under /becas including the nested catch-all tree", () => {
    expect(guidesIn("/becas").map(g => g.path).sort()).toEqual([
      ...BECAS_GUIDES, ...BECAS_NICHOS2_GUIDES, ...AYUDAS_2026_GUIDES.filter(g => g.pack === "becas"),
    ].map(g => g.path).sort());
    expect(renderGuideHtml("/becas/mec/denegada/por-patrimonio")).toContain("patrimonio");
    expect(renderGuideHtml("/becas/mec/compatibilidad/erasmus")).toContain("Erasmus");
    expect(renderGuideHtml("/becas/erasmus/complemento-regional")).toContain("complemento");
    expect(renderGuideHtml("/becas/muface")).toContain("31 de octubre");
  });

  it("bebe: vacunas stays strictly administrative (medical guard)", () => {
    const cartilla = renderGuideHtml("/bebe/cartilla-de-vacunacion-donde-se-saca");
    expect(cartilla).toContain("consejo médico");
    expect(cartilla).toContain("calendario oficial");
    expect(cartilla).toContain("centro de salud");
    expect(cartilla).not.toMatch(/pontea|dosificaci[oó]n|vacuna que debes poner/i);
    const alergias = renderGuideHtml("/comedor/documentos-alergia-comedor-escolar");
    expect(alergias).toContain("certificado médico");
    expect(alergias).not.toMatch(/dieta recomendada|men[uú] que debes/i);
  });

  it("colegio / comedor / fp / extranjería: los gaps de la corrida quedan respondidos", () => {
    expect(renderGuideHtml("/colegio/cambiar-de-colegio-fuera-de-plazo")).toContain("comisión de escolarización");
    expect(renderGuideHtml("/colegio/no-he-matriculado-a-mi-hijo")).toContain("absentismo");
    expect(renderGuideHtml("/comedor/beca-comedor-fuera-de-plazo")).toContain("sobrevenid");
    expect(renderGuideHtml("/comedor/no-puedo-pagar-comedor-escolar")).toContain("servicios sociales");
    expect(renderGuideHtml("/fp/matricula-fp-en-septiembre")).toContain("vacantes");
    expect(renderGuideHtml("/extranjeria/tie-caducada-viajar")).toContain("autorización de regreso");
    expect(renderGuideHtml("/extranjeria/huellas-sin-citas-barcelona")).toContain("provincia");
    const availability = renderGuideHtml("/dni/no-hay-citas");
    expect(availability).toContain("citapreviadnie.es");
    expect(availability).toContain("hora verificada");
    expect(availability).not.toContain("6:00");
  });

  it("subsanación Correos dice la ventana y las 383 oficinas verificadas", () => {
    const html = renderGuideHtml("/extranjeria/subsanar-regularizacion-correos");
    expect(html).toContain("30 de septiembre");
    expect(html).toContain("383");
    expect(html).toContain("8:30");
  });

  it("PackIndex breadcrumbs resolve for every pack in the catalog", () => {
    const packs = new Set(ALL_GUIDES.map((g) => g.pack));
    expect(packs.has("colegio")).toBe(true);
    expect(packs.has("comedor")).toBe(true);
    expect(packs.has("fp")).toBe(true);
    expect(packs.has("bebe")).toBe(true);
    expect(packs.has("becas")).toBe(true);
    for (const pack of packs) {
      expect(guidesByPack(pack).length, pack).toBeGreaterThan(0);
    }
  });
});
