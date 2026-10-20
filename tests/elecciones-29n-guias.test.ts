import { describe, expect, it } from "vitest";
import { ELECCIONES_29N_GUIDES } from "@/lib/tramites/elecciones-29n-guias";
import { ALL_GUIDES, getGuideByPath } from "@/lib/tramites/catalog";
import { renderGuideHtml } from "@/lib/render/server";
import { buildSitemapEntries } from "@/lib/seo/sitemapEntries";
import { renderLlmsTxt } from "@/lib/seo/llms";

describe("guías prácticas del 29-N (2026-10-16)", () => {
  it("publishes 35 unique election guides (31 + 4 del cluster mesa, 20-10) under /elecciones with official sources", () => {
    expect(ELECCIONES_29N_GUIDES).toHaveLength(35);
    const paths = new Set(ALL_GUIDES.map((g) => g.path));
    expect(paths.size).toBe(ALL_GUIDES.length);
    const titles = new Set(ALL_GUIDES.map((g) => g.title));
    expect(titles.size).toBe(ALL_GUIDES.length);
    for (const g of ELECCIONES_29N_GUIDES) {
      expect(g.path.startsWith("/elecciones/"), g.path).toBe(true);
      expect(g.pack).toBe("elecciones");
      expect(["2026-10-16", "2026-10-18", "2026-10-20"]).toContain(g.reviewedAt);
      expect(g.sources?.length ?? 0, g.path).toBeGreaterThanOrEqual(2);
      for (const s of g.sources ?? []) expect(s.href, g.path).toMatch(/^https:\/\/(www\.)?(boe\.es|juntaelectoralcentral\.es|ine\.es|sede\.ine\.gob\.es|exteriores\.gob\.es|administracion\.gob\.es|correos\.(es|com)|infoelectoral\.interior\.gob\.es|sede\.agenciatributaria\.gob\.es)\//);
      expect(g.description.length, g.path).toBeGreaterThanOrEqual(110);
      expect(g.description.length, g.path).toBeLessThanOrEqual(158);
      expect(getGuideByPath(g.path)).toBe(g);
    }
  });

  it("renders the key official dates of the JEC calendar", () => {
    expect(renderGuideHtml("/elecciones/voto-residentes-extranjero-cera")).toContain("24 de noviembre de 2026");
    expect(renderGuideHtml("/elecciones/voto-temporalmente-fuera-erta")).toContain("31 de octubre de 2026");
    expect(renderGuideHtml("/elecciones/consultar-censo-electoral")).toContain("12 al 19 de octubre de 2026");
    expect(renderGuideHtml("/elecciones/miembro-de-mesa-dieta-y-permisos")).toContain("75 euros");
    expect(renderGuideHtml("/elecciones/encuestas-prohibidas")).toContain("24 al 28 de noviembre de 2026");
    expect(renderGuideHtml("/elecciones/enviar-voto-por-correo")).toContain("25 de noviembre de 2026");
  });

  it("lists every new guide in the sitemap and features election guides in llms.txt", () => {
    const urls = buildSitemapEntries().map((e) => e.url);
    for (const g of ELECCIONES_29N_GUIDES) expect(urls).toContain(`https://rutatramite.com${g.path}`);
    const llms = renderLlmsTxt();
    expect(llms).toContain("https://rutatramite.com/elecciones/voto-residentes-extranjero-cera");
    expect(llms.split("\n").length).toBeLessThanOrEqual(200);
  });
});
