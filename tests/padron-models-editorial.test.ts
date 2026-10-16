import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Padron templates: effective residence and parental consent", () => {
  it("requires the authorizing resident's title and does not certify a planned move", () => {
    const guide = getGuideByPath("/autorizacion-empadronamiento")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("mayor de edad empadronada allí y con un título");
    expect(html).toContain("Un volante acredita la inscripción, pero no sustituye");
    const copied = guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ");
    expect(copied).toContain("a mi nombre");
    expect(copied).not.toContain("va a residir");
    expect(copied).not.toContain("una autorización falsa es delito");
  });

  it("permits municipal verification despite refusal and does not promise registration by declaration alone", () => {
    const guide = getGuideByPath("/declaracion-responsable-padron")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("Su negativa no es un veto");
    expect(html).toContain("no concede el alta automáticamente");
    expect(html).toContain("No escribas una dirección ficticia elegida por tu cuenta");
    expect(guide.sources?.some(s => s.href.endsWith("A290426.HTML"))).toBe(true);
  });

  it("distinguishes the specific parental exceptions from shared custody without agreement", () => {
    const html = renderGuideHtml("/autorizacion-empadronar-menor");
    expect(html).toContain("anexo I");
    expect(html).toContain("anexo II");
    expect(html).toContain("custodia exclusiva no equivale por sí sola a privación");
    expect(html).toContain("acuerdo documentado; si falta, una nueva resolución judicial");
    expect(html).toContain("apartado 2.2.2");
  });

  it("makes the copied consent about the child's address and links actual official annexes", () => {
    const guide = getGuideByPath("/autorizacion-empadronar-menor")!;
    const copied = guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ");
    expect(copied).toContain("presto mi consentimiento");
    expect(copied).toContain("se refiere al domicilio indicado");
    expect(copied).not.toContain("NIA");
    expect(guide.cta.href).toBe("https://www.boe.es/buscar/act.php?id=BOE-A-2020-4784");
    expect(renderGuideHtml(guide.path)).not.toContain("Una pelea de pareja");
  });
});
