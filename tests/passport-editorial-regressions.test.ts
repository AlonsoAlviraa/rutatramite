import { describe, expect, it } from "vitest";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("Passport and DNI: documentary requirements and exceptional issuance", () => {
  it("starts the issuance deadline after complete documents, without promising a booking", () => {
    const html = renderGuideHtml("/pasaporte/urgente");
    expect(html).toContain("dos días hábiles desde la presentación correcta de los documentos");
    expect(html).toContain("salvo circunstancias técnicas o excepcionales");
    expect(html).toContain("No es un plazo para conseguir cita");
  });

  it("conditions the exceptional one-year passport on alternative proof of identity and nationality", () => {
    const guide = getGuideByPath("/pasaporte/urgente")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("validez temporal de un año");
    expect(html).toContain("medios alternativos para acreditar identidad y nacionalidad española");
    expect(html).toContain("obtener durante ese año el pasaporte ordinario");
    expect(guide.sources?.some(source => source.href === "https://www.boe.es/eli/es/rd/2003/07/11/896/con")).toBe(true);
  });

  it("attributes the airport service to Aena and T4 without borrowing another service's hours", () => {
    const guide = getGuideByPath("/pasaporte/urgente")!;
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("solo en la oficina policial de la Terminal T4");
    expect(html).toContain("pasaje de avión del solicitante");
    expect(html).not.toContain("24 horas");
    expect(guide.sources?.some(source => source.href.startsWith("https://www.aena.es/") && source.href.endsWith("/seguridad.html"))).toBe(true);
    expect(renderGuideHtml("/pasaporte/caducado-sin-cita")).toContain("no es una reserva garantizada por tener un billete");
  });

  it("separates early renewal from duplicate validity and requires reporting a lost DNI", () => {
    const html = renderGuideHtml("/dni/renovar-caducado");
    expect(html).toContain("no es una prórroga de 180 días después de la caducidad");
    expect(html).toContain("Si quedan 90 días o menos");
    expect(html).toContain("denuncia policial o administrativa");
    expect(html).toContain("no elimina por sí sola esa exención");
  });

  it("retains access alternatives and distinguishes passport documents from consular rules", () => {
    const dni = renderGuideHtml("/dni/cita-previa");
    expect(dni).toContain("datos DNI/NIE o con DNI electrónico");
    expect(dni).toContain("pérdida o sustracción");
    const passport = renderGuideHtml("/pasaporte/cita-previa");
    expect(passport).toContain("DICIREG con código personal");
    expect(passport).toContain("no se extiende a los expedidos por consulados");
    expect(passport).toContain("no solo quien tenga la custodia");
  });

  it("covers first issuance after nationality and conditional electronic document retrieval", () => {
    const html = renderGuideHtml("/dni/checklist");
    expect(html).toContain("TIE o certificado de registro UE con NIE");
    expect(html).toContain("recabar electrónicamente los documentos salvo oposición");
    expect(html).toContain("si no pueden obtenerse");
    expect(html).toContain("denuncia");
    expect(html).toContain("todos los titulares de patria potestad o tutela");
  });
});
