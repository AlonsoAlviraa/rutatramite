import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PackIndex } from "@/components/tramites/PackIndex";
import { ALL_GUIDES, getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Becas: administrative routes and mobility conditions", () => {
  it("cites the BOE extracts for the general call and the collaboration grants on the hub", () => {
    const html = renderToStaticMarkup(createElement(PackIndex, { pack: "becas" }));
    expect(html).toContain('href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-9261"');
    expect(html).toContain('href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-16327"');
    expect(html).toContain('href="https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-24454"');
    expect(html).toContain("7 de abril al 19 de mayo de 2026");
    expect(html).toContain("2.111");
    expect(html).toContain("2.000 €");
  });

  it("separates the award result from notification status and preserves password access", () => {
    const guide = getGuideByPath("/becas/mec/estado")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toBe("https://sede.educacion.gob.es/portada.html");
    expect(guide.lead).toContain("una concesión o a una denegación");
    expect(html).toContain("usuario y la contraseña");
    expect(html).toContain("no equivale a una solicitud presentada");
    expect(html).toContain("diez días naturales sin abrirla");
    expect(html).toContain("no esperes otra notificación individual");
    expect(html).not.toMatch(/Resulta \(provisional\)|En tramitación: nada que hacer/);
  });

  it("preserves the notified deadline and does not send a judicial appeal to the scholarship unit", () => {
    const html = renderGuideHtml("/becas/mec/alegaciones");
    expect(html).toContain("Puede haber un plazo distinto");
    expect(html).toContain("recurso de reposición es potestativo");
    expect(html).toContain("órgano judicial competente");
    expect(html).toContain("resolución expresa o desestimación presunta");
    expect(html).not.toMatch(/Cada peldaña se presenta por la sede|hasta las 23:59 del último día|deja dos o tres días reales/);
  });

  it("uses the legal patrimonial threshold and explains the conflicting FAQ and distinct asset tests", () => {
    const guide = getGuideByPath("/becas/mec/denegada/por-patrimonio")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.lead).toContain("47.200 €");
    expect(guide.lead).not.toContain("47.600");
    expect(guide.sources?.some(source => source.href.includes("BOE-A-2026-5713"))).toBe(true);
    expect(guide.sources?.some(source => source.href.includes("/894743/document/1422191"))).toBe(true);
    expect(html).toContain("FAQ ministerial mostraba 47.600");
    expect(html).toContain("capital mobiliario más saldo neto positivo");
    expect(html).toContain("14.450 € por miembro computable");
    expect(html).toContain("suma supera el 100%");
    expect(html).toContain("valor catastral no es lo mismo que el valor de referencia");
    expect(html).not.toContain("Pide nota simple y certificado catastral actualizados antes");
    expect([...html.matchAll(/id="fuentes"/g)]).toHaveLength(1);
  });

  it("does not reuse GuideView reserved section ids", () => {
    const reserved = new Set(["fuentes", "formularios", "preguntas-frecuentes"]);
    for (const guide of ALL_GUIDES) {
      for (const section of guide.sections) {
        expect(reserved.has(section.id), `${guide.path}#${section.id}`).toBe(false);
      }
    }
  });

  it("does not discard Erasmus enrolment or promise the residence component", () => {
    const html = renderGuideHtml("/becas/mec/compatibilidad/erasmus");
    expect(html).toContain("todo lo matriculado en el curso");
    expect(html).toContain("referencia concreta");
    expect(html).toContain("acuerdo de aprendizaje");
    expect(html).toContain("Pasar un curso fuera no garantiza la cuantía de residencia");
    expect(html).not.toMatch(/no computan como créditos matriculados|si tu estancia es de curso completo, puedes reclamar/);
  });

  it("directs applicants to their university without predicting a national future timetable", () => {
    const guide = getGuideByPath("/becas/erasmus")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href.startsWith("https://erasmus-plus.ec.europa.eu/")).toBe(true);
    expect(html).toContain("curso de la estancia");
    expect(html).toContain("Nominación y solicitud o admisión");
    expect(html).toContain("no anticipa meses de apertura");
    expect(html).not.toMatch(/noviembre-diciembre|abre entre noviembre y enero|segundos plazos en julio/);
  });

  it("limits the Andalusian award to its institution and mobility scope with current monthly amounts", () => {
    const guide = getGuideByPath("/becas/erasmus/complemento-regional")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toBe("https://www.juntadeandalucia.es/boja/2026/151/51");
    expect(guide.lead).toContain("universidades públicas andaluzas");
    expect(guide.lead).toContain("KA131-HED");
    for (const amount of [276, 221, 213, 160, 110, 83]) expect(html).toContain(`${amount} €/mes`);
    expect(html).toContain("máximo financiable es de nueve meses");
    expect(html).toContain("La gestión corresponde a las universidades");
    expect(html).toContain("solicitado protección internacional");
    expect(html).not.toMatch(/263 €\/mes|203 €\/mes|105 €\/mes|La solicitud se presenta en la sede de la Junta/);
  });
});
