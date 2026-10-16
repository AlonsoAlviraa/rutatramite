import { describe, expect, it } from "vitest";
import { renderGuideHtml } from "@/lib/render/server";

describe("DNI appointment management", () => {
  it("uses the DNI workflow and warns about companions before cancellation", () => {
    const html = renderGuideHtml("/dni/consultar-cita");
    expect(html).toContain("también se anulan sus citas");
    expect(html).toContain("no traslades automáticamente a este portal");
    expect(html).toContain("como alternativa, con DNI electrónico");
    expect(html).toContain("43CITAPREVIAnivelinternet.pdf");
    expect(html).not.toContain("medio minuto");
    expect(html).not.toContain("debes entrar con los mismos datos de la reserva y usar su número de justificante");
    expect(html).not.toContain("Si lo borraste, no pasa nada");
  });
  it("distinguishes private charges from impersonation and points to official help", () => {
    const html = renderGuideHtml("/dni/paginas-clon-cita");
    expect(html).toContain("que cobre no demuestra por sí solo una suplantación");
    expect(html).toContain("/ciudadania/ayuda/reporte-de-fraude");
    expect(html).toContain("no garantiza recuperar el dinero");
    expect(html).not.toContain("son el mismo negocio");
    expect(html).not.toContain("de los clones que cobran");
  });
});
