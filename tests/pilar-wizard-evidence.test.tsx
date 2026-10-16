import { describe, expect, it } from "vitest";
import { buildPilarModel } from "@/lib/pilar/content";
import { renderPilarHtml } from "@/lib/render/server";
import { runWizard } from "@/lib/wizard/engine";
import { ESCENARIO_SLUGS, type WizardAnswers } from "@/lib/types";

const base: WizardAnswers = { ineCode: null, housing: "no-contrato", nacionalidad: "resto", nieTie: false, menores: true, tramite: "alta" };

describe("padrón: coherencia entre guía general y orientación del asistente", () => {
  it("todas las situaciones tienen una tarjeta con enlace y descripción visible", () => {
    const model = buildPilarModel();
    const html = renderPilarHtml();
    expect(model.escenarios.map(e => e.slug)).toEqual(ESCENARIO_SLUGS);
    for (const row of model.escenarios) {
      expect(row.blurb?.trim().length, row.slug).toBeGreaterThan(0);
      expect(html).toContain(`href="${row.href}"`);
      expect(html).toContain(row.blurb);
    }
    expect(html).toContain(`Guías para ${ESCENARIO_SLUGS.length} situaciones`);
    expect(html).not.toMatch(/dos mil palabras|769 municipios ≥10.000|Los 12 escenarios/);
  });

  it("las preguntas estructuradas coinciden con respuestas visibles y conservan la excepción comunitaria", () => {
    const html = renderPilarHtml();
    const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m => JSON.parse(m[1]));
    const faq = blocks.find(b => b["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(buildPilarModel().faqs.length);
    for (const item of faq.mainEntity) expect(html).toContain(item.acceptedAnswer.text);
    const renewal = faq.mainEntity.find((q: { name: string }) => q.name.includes("dos años"));
    expect(renewal.acceptedAnswer.text).toMatch(/excluidos los titulares de tarjeta de régimen comunitario/);
  });

  it("alta y cambio conservan condiciones de vivienda y menores sin aplicarlas a peticiones de certificado", () => {
    for (const tramite of ["alta", "cambio"] as const) {
      const text = runWizard({ ...base, tramite }, null).checklist.join(" ");
      expect(text).toMatch(/adulto ya inscrito.*título de posesión efectiva/);
      expect(text).toMatch(/custodia exclusiva no sustituye por sí sola el consentimiento/);
      expect(text).toMatch(/anexos I y II exigen sus supuestos concretos/);
      if (tramite === "cambio") expect(text).toContain("renovación expresa");
    }
    const certificate = runWizard({ ...base, tramite: "certificado" }, null).checklist.join(" ");
    expect(certificate).not.toMatch(/título de posesión efectiva|Hoja padronal/);
  });

  it("la renovación distingue el régimen y la falta de techo no sustituye la identificación", () => {
    const renewal = runWizard({ ...base, tramite: "renovacion" }, null).checklist.join(" ");
    expect(renewal).toContain("excluidos los titulares de tarjeta de régimen comunitario");
    expect(renewal).toContain("última renovación expresa");
    const homeless = runWizard({ ...base, housing: "sin-techo" }, null).checklist.join(" ");
    expect(homeless).toContain("comprometerse a intentar las notificaciones");
    expect(homeless).toContain("no sustituye por sí solo la identificación");
  });
});
