import { describe, expect, it } from "vitest";
import { GESTIONES_CLAVE_GUIDES } from "@/lib/tramites/gestiones-clave-2026";
import { ALL_GUIDES, getGuideByPath, guidesIn } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";
import { DNI_FAQS } from "@/lib/tramites/dni-respuestas";

describe("gestiones clave 2026-10-13 (Cl@ve, FNMT, vida laboral, SEPE, IMV)", () => {
  it("publishes 5 unique guides with official sources and FAQs", () => {
    expect(GESTIONES_CLAVE_GUIDES).toHaveLength(5);
    expect(new Set(ALL_GUIDES.map((g) => g.path)).size).toBe(ALL_GUIDES.length);
    expect(new Set(ALL_GUIDES.map((g) => g.title)).size).toBe(ALL_GUIDES.length);
    for (const g of GESTIONES_CLAVE_GUIDES) {
      expect(getGuideByPath(g.path)).toBe(g);
      expect(g.description.length, g.path).toBeLessThanOrEqual(170);
      expect(g.sources!.length).toBeGreaterThan(0);
      for (const s of g.sources!) expect(s.href, g.path).toMatch(/^https:\/\/(www\.|sede\.|portal\.)?(boe\.es|clave\.gob\.es|sede\.fnmt\.gob\.es|fnmt\.gob\.es|seg-social\.(es|gob\.es)|sepe\.gob\.es|sede\.sepe\.gob\.es)\//);
      expect(g.faqs!.length).toBeGreaterThanOrEqual(3);
      const html = renderGuideHtml(g.path);
      expect(html).toContain('"@type":"FAQPage"');
      expect(html).toContain(g.h1);
    }
    expect(guidesIn("/trabajo").map((g) => g.path).sort()).toEqual(["/trabajo/autonomos-cambio-base-cotizacion-2027", "/trabajo/cita-previa-sepe", "/trabajo/como-pedir-la-jubilacion", "/trabajo/fondo-garantia-pago-alimentos-300-euros", "/trabajo/huelga-general-11-noviembre", "/trabajo/ingreso-minimo-vital", "/trabajo/pension-viudedad-pareja-de-hecho-con-hijos", "/trabajo/revalorizacion-pensiones-2026", "/trabajo/salario-minimo-irpf-2026", "/trabajo/verifactu-obligatorio-1-enero-2027", "/trabajo/vida-laboral"]);
  });
  it("DNI validity follows RD 255/2025 (no 'permanente')", () => {
    const v = DNI_FAQS.find((f) => f.q.includes("Cuánto dura"))!;
    expect(v.a).toContain("255/2025");
    expect(v.a).not.toContain("permanente");
  });
});
