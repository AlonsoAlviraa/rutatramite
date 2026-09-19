import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { REVIEWS, validateReviewed } from "../scripts/gen/escenarios-revisados.mjs";
import { escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";
import { MODELOS_VIVIENDA } from "@/lib/tramites/modelos-vivienda";
import { FP_BEBE_NICHOS2_GUIDES } from "@/lib/tramites/nichos2-fp-bebe";
import type { EscenarioSlug } from "@/lib/types";
import { renderEscenarioHtml } from "@/lib/render/server";

describe("revisiones editoriales de las páginas rastreadas sin indexar", () => {
  it("rechaza la pérdida de fuentes, decisiones y pasos de una revisión", () => {
    for (const slug of Object.keys(REVIEWS)) {
      const md = fs.readFileSync(`content/escenarios/${slug}.md`, "utf8");
      expect(validateReviewed(slug, md).errors).toEqual([]);
      const withoutLinks = md.replace(/\]\([^)]+\)/g, "]");
      expect(validateReviewed(slug, withoutLinks).errors.length).toBeGreaterThan(0);
      const withoutSteps = md.replace(/^\d+\. /gm, "");
      expect(validateReviewed(slug, withoutSteps).errors).toContain("Faltan pasos o tabla de decisiones");
      const metadata = escenarioMetadata(slug as EscenarioSlug);
      expect(metadata.description).toBe(REVIEWS[slug].description);
      const html = renderEscenarioHtml(slug as EscenarioSlug);
      expect(html).not.toContain("escenario nacional");
      expect(html).not.toContain("&lt;!--");
    }
  });

  it("la fianza distingue el saldo y las deducciones e incluye entrega de llaves", () => {
    const guide = MODELOS_VIVIENDA.find(g => g.id === "inventario-fianza-alquiler")!;
    expect(guide.lead).toContain("saldo");
    const models = guide.sections.flatMap(s => s.models ?? []);
    expect(models.find(m => m.id === "inventario")!.body).toContain("Entrega de llaves: [fecha y hora]");
    const claim = models.find(m => m.id === "fianza")!.body;
    expect(claim).toContain("Incluir solo si procede");
    expect(claim).toContain("documentación justificativa");
    expect(claim).not.toContain("descontando solo desperfectos");
    expect(guide.reviewedAt).toBe("2026-09-14");
  });

  it("Sacyl enlaza el calendario regional y no promete un certificado en la app", () => {
    const guide = FP_BEBE_NICHOS2_GUIDES.find(g => g.id === "calendarioVacunalCastillaYLeon")!;
    expect(guide.cta.href).toContain("/vacunaciones/nuevo-calendario-");
    expect(guide.sources?.some(s => s.href.endsWith("/es/citaprevia"))).toBe(true);
    expect(guide.lead).toContain("2026");
    expect(JSON.stringify(guide)).not.toMatch(/ningún centro puede rechazar|nunca condición/);
    expect(JSON.stringify(guide)).toContain("no es un certificado personal");
  });
});
