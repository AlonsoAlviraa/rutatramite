import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Family authorizations: scope and supporting documents", () => {
  it("separates the Spanish travel permit from destination and airline requirements", () => {
    const guide = getGuideByPath("/autorizacion-viaje-menor")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.lead).toContain("menores españoles residentes en España");
    expect(guide.lead).toContain("no se exige ese permiso si viajan con cualquiera");
    expect(html).toContain("una sola comparecencia con la inexistencia de consentimiento");
    expect(html).toContain("los extranjeros residentes se rigen por su legislación nacional");
    expect(guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ")).toContain("NO ES UN PERMISO DE VIAJE");
    expect(guide.cta.href).toContain("tramites_ciudadania_documentacionviajar.php");
    expect(html).not.toContain("En Navidad las colas suben");
  });

  it("keeps the pickup template conditional on authority, service and the school procedure", () => {
    const guide = getGuideByPath("/autorizacion-recogida-colegio")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.lead).toContain("No garantiza que cualquier centro acepte");
    expect(html).toContain("no equivale automáticamente a entregar una fotografía íntegra");
    expect(html).toContain("No conviertas esa regla en una exigencia universal de dos firmas");
    const body = guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ");
    expect(body).toContain("Vigencia:");
    expect(body).toContain("Firma/s que correspondan");
  });

  it("does not promise universal school acceptance, telephone release or a new DNI number", () => {
    const html = renderGuideHtml("/colegio/autorizacion-recogida-menores");
    expect(html).toContain("no presupongas que una llamada de emergencia basta");
    expect(html).toContain("no presupongas que eso cambia el número personal");
    expect(html).toContain("estar en secundaria no permite dar por desaparecido");
    expect(html).toContain('href="/autorizacion-recogida-colegio"');
    expect(html).not.toContain("cualquier escrito con estos datos");
  });

  it("distinguishes the family absence statement from evidence of health attendance", () => {
    const html = renderGuideHtml("/justificante-ausencia-escolar");
    expect(html).toContain("no determina por sí solo cómo se registrará la falta");
    expect(html).toContain("no corresponde al personal sanitario emitir ese justificante escolar");
    expect(html).toContain("no se presenta como un protocolo idéntico de todas las comunidades");
    expect(html).toContain("diagnósticos innecesarios");
    expect(html).not.toContain("El colegio decide si acepta la declaración de la familia o pide parte médico");
  });
});
