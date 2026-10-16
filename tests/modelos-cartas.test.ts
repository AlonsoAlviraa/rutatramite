import { describe, expect, it } from "vitest";
import { renderGuideHtml } from "@/lib/render/server";
import { countVisibleWords } from "@/lib/render/words";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { MODELO_GUIDES, MODELO_PATHS } from "@/lib/tramites/modelos";

describe("modelos y cartas (shipped GuideView)", () => {
  it("publishes every objective slug as a unique guide with copyable model text", () => {
    expect(MODELO_PATHS).toHaveLength(26);
    expect(MODELO_GUIDES).toHaveLength(26);
    const paths = MODELO_GUIDES.map((g) => g.path);
    expect(new Set(paths).size).toBe(26);
    for (const p of MODELO_PATHS) {
      expect(paths, p).toContain(p);
      const g = getGuideByPath(p);
      expect(g, p).toBeTruthy();
      expect(g!.path).toBe(p);
      expect(g!.cta.href.startsWith("https://"), p).toBe(true);
      const html = renderGuideHtml(p);
      expect(html, p).toContain("data-disclaimer");
      expect(html, p).toContain("No somos Administración");
      expect(html, p).toMatch(/data-modelo=/);
      expect(html.toLowerCase(), p).not.toContain("checkout");
      expect(html.toLowerCase(), p).not.toContain("stripe");
      expect(countVisibleWords(html), p).toBeGreaterThanOrEqual(180);
    }
  });

  it("baja voluntaria keeps three tones and explains the conditional 15-day example", () => {
    const html = renderGuideHtml("/modelo-baja-voluntaria");
    expect(html).toContain('data-modelo="seco"');
    expect(html).toContain('data-modelo="cordial"');
    expect(html).toContain('data-modelo="por-email"');
    expect(html.toLowerCase()).toContain("tono seco");
    expect(html.toLowerCase()).toContain("tono cordial");
    expect(html.toLowerCase()).toContain("tono por email");
    expect(html).toMatch(/preaviso de 15 d[ií]as/i);
    expect(html).toMatch(/convenio/);
  });

  it("sin preaviso addresses descuento del finiquito; prueba cites art. 14 without legal notice", () => {
    const sin = renderGuideHtml("/baja-voluntaria-sin-preaviso");
    expect(sin.toLowerCase()).toMatch(/descuent/);
    expect(sin.toLowerCase()).toContain("finiquito");
    const prueba = renderGuideHtml("/baja-periodo-de-prueba");
    expect(prueba).toMatch(/art[íi]culo 14/i);
    expect(prueba.toLowerCase()).toMatch(/sin preaviso/);
    expect(prueba).toContain("14");
  });

  it("separates certificado de empresa from unemployment entitlement; 030 from padrón; and tenant withdrawal", () => {
    const cert = renderGuideHtml("/certificado-empresa-sepe");
    expect(cert.toLowerCase()).toContain("despido");
    expect(cert.toLowerCase()).toMatch(/no (hay prestaci[oó]n|tras una baja voluntaria)/);
    const m030 = renderGuideHtml("/modelo-030-cambio-domicilio");
    expect(m030.toLowerCase()).toMatch(/no es el padr[oó]n/);
    expect(m030).toContain("030");
    const alquiler = renderGuideHtml("/preaviso-fin-alquiler");
    expect(alquiler.toLowerCase()).toContain("inquilino");
    expect(alquiler).toMatch(/30 d[ií]as/);
    expect(alquiler).toMatch(/art[íi]culo 11/i);
  });
});
