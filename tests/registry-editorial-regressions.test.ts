import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Administrative registry: authority, receipt and correction", () => {
  it("limits the copied authority and makes notification handling an explicit instruction", () => {
    const guide = getGuideByPath("/autorizacion-representacion-tramite")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("no garantizan por sí solos su aceptación");
    expect(html).toContain("apoderamiento apud acta");
    const copied = guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ");
    expect(copied).toContain("exclusivamente para");
    expect(copied).toContain("No autorizo mediante este escrito a desistir");
    expect(copied).toContain("notificaciones se practiquen al interesado");
    expect(copied).not.toContain("a presentarme y a recibir notificaciones");
  });

  it("separates public registry evidence from private delivery and administrative approval", () => {
    const html = renderGuideHtml("/acuse-de-recibo-modelo");
    expect(html).toContain("no que el trámite esté aprobado");
    expect(html).toContain("empresa privada");
    expect(html).toContain("no garantiza que hayas elegido el canal correcto");
    expect(html).toContain("puede haber un asiento recuperable");
    expect(html).not.toContain("el trámite «no existió»");
  });

  it("uses withdrawal by resolution instead of automatic expiry and explains business-day counting", () => {
    const html = renderGuideHtml("/modelo-subsanacion");
    expect(html).toContain("desistido, previa resolución");
    expect(html).toContain("no es una caducidad automática");
    expect(html).toContain("excluyendo sábados, domingos y festivos");
    expect(html).toContain("salvo procedimientos selectivos o de concurrencia competitiva");
    expect(html).toContain("No es una ampliación automática");
  });

  it("does not preserve a paper filing date for an electronic-only applicant or preassert timeliness", () => {
    const guide = getGuideByPath("/modelo-subsanacion")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("considera fecha de presentación la de esa subsanación");
    expect(html).toContain("no sustituye formularios obligatorios");
    expect(html).toContain("Un recurso contra una resolución tiene su vía y plazo propios");
    expect(guide.sections.flatMap(s => s.models ?? []).map(m => m.body).join(" ")).not.toContain("Dentro de plazo");
    expect(guide.sources?.some(s => s.href.endsWith("#a68"))).toBe(true);
  });
});
