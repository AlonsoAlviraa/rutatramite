import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PackIndex } from "@/components/tramites/PackIndex";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";

describe("School admission: scope, documentation and protection", () => {
  it("cites LOE article 84 on the hub and does not set a national fee or deadline", () => {
    const html = renderToStaticMarkup(createElement(PackIndex, { pack: "colegio" }));
    expect(html).toContain('href="https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899#a84"');
    expect(html).toContain("Administraciones educativas regulan la admisión");
    expect(html).toContain("administración educativa correspondiente");
    expect(html).toContain('href="/colegio/escuela-infantil-publica"');
    expect(html).not.toMatch(/plazo nacional|cuesta \d+ €|tasa de \d+/i);
  });

  it("preserves preferences and school submission in extraordinary admission", () => {
    const html = renderGuideHtml("/colegio/cambiar-de-colegio-fuera-de-plazo");
    expect(html).toContain("cuatro centros por orden de prioridad");
    expect(html).toContain("no descartes el colegio como lugar de presentación");
    expect(html).toContain("no garantiza obtenerlas");
    expect(html).not.toContain("Fuera de plazo no eliges centro");
    expect(html).not.toContain("2.300");
  });

  it("distinguishes relocation from automatic transfer and general preference", () => {
    const guide = getGuideByPath("/colegio/cambio-de-colegio-por-mudanza")!;
    expect(guide.lead).toContain("no impone automáticamente cambiar");
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("No atribuyas esa preferencia a toda mudanza voluntaria");
    expect(html).toContain("implica perder la reserva anterior");
    expect(html).toContain("a petición de este");
  });

  it("separates supplied documents, data queries and the statutory transfer record", () => {
    const html = renderGuideHtml("/colegio/documentos-matricula-colegio");
    expect(html).toContain("no existe una lista nacional");
    expect(html).toContain("consultas electrónicas de identidad y padrón");
    expect(html).toContain("no es una garantía genérica de matrícula condicional");
    expect(html).toContain("Tampoco se presume inscripción de nacimiento de oficio");
    expect(html).not.toContain("Los tres atascos típicos");
  });

  it("does not equate a pending application with enrollment or immunity from attendance monitoring", () => {
    const guide = getGuideByPath("/colegio/no-he-matriculado-a-mi-hijo")!;
    expect(guide.lead).toContain("no convierte una solicitud pendiente en matrícula");
    const html = renderGuideHtml(guide.path);
    expect(html).toContain("no garantiza que no se active seguimiento");
    expect(html).not.toContain("Ninguna consejería persigue");
    expect(html).not.toContain("es tu escudo documental");
  });

  it("requires case-specific continuity instead of a universal reservation or waiting period", () => {
    const html = renderGuideHtml("/colegio/cambiar-de-colegio-a-mitad-de-curso");
    expect(html).toContain("No todos los procedimientos mantienen la misma reserva");
    expect(html).toContain("No existe un plazo nacional de resolución");
    expect(html).toContain("no conviertas el consejo de conservar plaza");
    expect(html).not.toContain("las listas de espera del proceso ordinario ya no juegan");
  });

  it("activates protection on indications without requiring a registered letter or completed transfer case", () => {
    const guide = getGuideByPath("/colegio/cambio-de-colegio-por-acoso")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.lead).toContain("no depende de que la familia registre primero un escrito");
    expect(html).toContain("900 018 018");
    expect(html).toContain("No retrases una alerta para conseguir un sello");
    expect(html).toContain("no se prescribe permanecer físicamente en una situación peligrosa");
    expect(html).toContain("no garantiza cambio automático");
    expect(html).toContain("referencia a las autonomías");
  });
});
