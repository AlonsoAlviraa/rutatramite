import { describe, expect, it } from "vitest";
import { renderGuideHtml } from "@/lib/render/server";

describe("School meal access and service requests", () => {
  it("includes the rural basic-education guarantee without universalizing it", () => {
    const html = renderGuideHtml("/comedor/ies-sin-comedor");
    expect(html).toContain("artículo 82.2 de la LOE");
    expect(html).toContain("La educación básica incluye la ESO");
    expect(html).toContain("en su caso, comedor e internado");
    expect(html).toContain("no convierte cualquier desplazamiento elegido por la familia en comedor gratuito");
    expect(html).not.toContain("No hay un derecho estatal a comedor de secundaria");
  });
  it("does not promise another school's service or a nationwide outside-meal grant", () => {
    const html = renderGuideHtml("/comedor/ies-sin-comedor");
    expect(html).toContain("No des por autorizada esa asistencia ni la salida del instituto");
    expect(html).toContain("no acredita por sí sola que exista una ayuda para comer fuera");
    expect(html).not.toContain("presión organizada ha creado servicios");
  });
  it("keeps a usable model without making its proposed date self-executing", () => {
    const html = renderGuideHtml("/solicitud-comedor-escolar");
    expect(html).toContain('data-modelo="comedor"');
    expect(html).toContain("Fecha solicitada:");
    expect(html).toContain("no produce por sí sola efectos retroactivos");
    expect(html).toContain("No adjuntes por defecto nóminas, padrón, libro de familia");
    expect(html).toContain("no sustituye los formularios obligatorios");
  });
  it("separates absence, withdrawal and grant while preserving a documented linked procedure", () => {
    const html = renderGuideHtml("/solicitud-comedor-escolar");
    expect(html).toContain("Una cancelación puntual puede tener un canal y una hora límite diferentes");
    expect(html).toContain("solicitar la ayuda activa el comedor");
    expect(html).toContain("no traslades esos anexos u horarios a otro centro");
    expect(html).not.toContain("Fuera de plazo suele haber causa sobrevenida");
  });
});
