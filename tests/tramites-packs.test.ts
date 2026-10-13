import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { renderGuideHtml, renderPilarHtml } from "@/lib/render/server";
import { TRAVEL_PATHS, getGuideByPath } from "@/lib/tramites/catalog";
import { CITA_DNI_HOST, CITA_DNI_URL, DNI_RENOVACION_DIAS, MIDNI_HOST, MIDNI_URL, RD_ARRAIGO, REGULARIZACION_CORREOS_HASTA, TASA_DNI_LABEL, TASA_PASAPORTE_LABEL } from "@/lib/tramites/facts";
import { VIAJE_GUIDES } from "@/lib/tramites/viaje";

describe("travel / moving / extranjería packs (shipped GuideView)", () => {
  it("publishes 11 travel pieces with official cita host and 2026 tasas", () => {
    expect(VIAJE_GUIDES).toHaveLength(11);
    expect(TRAVEL_PATHS).toHaveLength(11);
    for (const p of TRAVEL_PATHS) {
      const html = renderGuideHtml(p);
      expect(html, p).toContain(CITA_DNI_HOST);
      expect(html, p).toContain(TASA_DNI_LABEL);
      expect(html, p).toContain(TASA_PASAPORTE_LABEL);
      expect(html, p).toContain("gratuita");
      expect(html.toLowerCase(), p).not.toContain("checkout");
      expect(html.toLowerCase(), p).not.toContain("stripe");
    }
    const renovar = renderGuideHtml("/dni/renovar-caducado");
    expect(renovar).toContain(String(DNI_RENOVACION_DIAS));
    expect(renovar).toMatch(/180/);
  });

  it("same-cita piece says DNI and pasaporte can be done together", () => {
    const html = renderGuideHtml("/dni/misma-cita-pasaporte");
    expect(html.toLowerCase()).toMatch(/misma cita/);
    expect(html).toContain("DNI y pasaporte");
    expect(getGuideByPath("/dni/misma-cita-pasaporte")?.cta.href).toBe(CITA_DNI_URL);
  });

  it("MiDNI points at midni.gob.es and is not a border substitute", () => {
    const html = renderGuideHtml("/dni/midni");
    expect(html).toContain(MIDNI_HOST);
    expect(getGuideByPath("/dni/midni")?.cta.href).toBe(MIDNI_URL);
    expect(html.toLowerCase()).toMatch(/no (es|reemplaza|sustituye).{0,80}(frontera|f[ií]sico|pasaporte)/);
    expect(html).toContain(CITA_DNI_HOST);
  });

  it("moving pack: DNI domicilio free, modelo 030, links to padrón", () => {
    const dniDom = renderGuideHtml("/dni/cambio-domicilio");
    expect(dniDom.toLowerCase()).toMatch(/gratuit/);
    expect(dniDom).toContain("/empadronarse/cambio-de-domicilio");
    const m030 = renderGuideHtml("/hacienda/modelo-030");
    expect(m030).toMatch(/modelo 030/i);
    expect(m030).toContain("/empadronarse");
    const hub = renderGuideHtml("/mudanza");
    expect(hub).toContain("/empadronarse");
    expect(hub).toContain("030");
  });

  it("extranjería names RD 1155/2024 and Correos 30 sep window", () => {
    const arraigo = renderGuideHtml("/extranjeria/arraigo-padron");
    expect(arraigo).toContain(RD_ARRAIGO);
    expect(arraigo).toContain("1155/2024");
    const correos = renderGuideHtml("/extranjeria/subsanar-regularizacion-correos");
    expect(correos).toContain(REGULARIZACION_CORREOS_HASTA);
    expect(correos).toMatch(/30 de septiembre/);
  });

  it("tramite modules do not POST identity and do not sell citas", () => {
    const dir = path.join(process.cwd(), "src/lib/tramites");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
    for (const f of files) {
      const src = fs.readFileSync(path.join(dir, f), "utf8");
      expect(src, f).not.toMatch(/fetch\s*\(/);
      expect(src, f).not.toMatch(/XMLHttpRequest/);
      expect(src, f).not.toMatch(/checkout/i);
      expect(src, f).not.toMatch(/stripe/i);
    }
    const view = fs.readFileSync(path.join(process.cwd(), "src/components/tramites/GuideView.tsx"), "utf8");
    expect(view).not.toMatch(/fetch\s*\(/);
    expect(view).not.toMatch(/type=["']file["']/);
    const facts = fs.readFileSync(path.join(process.cwd(), "src/lib/tramites/facts.ts"), "utf8");
    expect(facts).toContain("citapreviadnie.es");
    expect(renderGuideHtml("/dni/cita-previa")).toContain("citapreviadnie.es");
  });

  it("padrón pilar still ships after the new packs", () => {
    const html = renderPilarHtml();
    expect(html).toContain("RutaTrámite");
    expect(html).toMatch(/gratuita/);
  });
});
