import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FAMILIA_CCAA_GUIDES } from "@/lib/tramites/familia-ccaa";
import { getGuideByPath } from "@/lib/tramites/catalog";
import { renderLlmsTxt } from "@/lib/seo/llms";
import { renderGuideHtml } from "@/lib/render/server";

const DOSIS = /se pone|p[oó]ntela|a los 2 meses|pauta 2\+1|debes vacunar|qu[eé] toca a los/i;

describe("family guides for vaccines, public nursery and lactation", () => {
  it("points each verified community at the page opened on 10 October 2026 and copies no dose grid", () => {
    const hub = getGuideByPath("/bebe/calendario-vacunal-por-comunidad")!;
    const html = renderGuideHtml(hub.path);
    const body = JSON.stringify(FAMILIA_CCAA_GUIDES);
    expect(hub.cta.href).toContain("sanidad.gob.es/areas/promocionPrevencion/vacunaciones/calendario/home.htm");
    expect(html).toContain("DSGPyOF-1/2026");
    expect(html).toContain("SAN/1023/2024");
    expect(html).toContain("sigue siendo el de 2025");
    expect(html).toContain("13 de marzo de 2026");
    expect(html).toContain("29 de septiembre de 2026");
    expect(html).toContain("instrucción 1/2026");
    expect(html).toContain("Asturias");
    expect(html).toContain("Melilla");
    expect(html).not.toMatch(DOSIS);
    expect(body).not.toMatch(DOSIS);

    expect(getGuideByPath("/bebe/calendario-vacunal-andalucia")!.cta.href).toContain("andavac.es/documentos/calendario-de-vacunaciones-de-andalucia-2026");
    expect(getGuideByPath("/bebe/calendario-vacunal-aragon")!.cta.href).toBe("https://www.aragon.es/-/calendario-infantil-unificado-de-vacunaciones");
    expect(getGuideByPath("/bebe/calendario-vacunal-cataluna")!.lead).toContain("continúa siendo el de 2025");
    expect(getGuideByPath("/bebe/calendario-vacunal-cataluna")!.h1).not.toMatch(/2026/);
    expect(getGuideByPath("/bebe/calendario-vacunal-comunitat-valenciana")!.cta.href).toBe("https://vacunaciones.san.gva.es/es/calendario-vacunaciones");
    expect(getGuideByPath("/bebe/calendario-vacunal-murcia")!.cta.href).toBe("https://www.murciasalud.es/web/vacunacion/murcia");
    expect(getGuideByPath("/bebe/calendario-vacunal-galicia")!.cta.href).toContain("extranet.sergas.es/catpb/publicaciones/NovidadesPublicacion.aspx");
    expect(getGuideByPath("/bebe/calendario-vacunal-navarra")!.cta.href).toContain("2026_03CalendariodevacunacionesNavarra2026TablaRes.pdf");
    for (const guide of FAMILIA_CCAA_GUIDES.filter((item) => item.pack === "bebe" && item.id.startsWith("calendario"))) {
      expect(guide.disclaimer, guide.path).toMatch(/No damos consejo médico/);
      expect(renderGuideHtml(guide.path), guide.path).not.toMatch(DOSIS);
    }
  });

  it("keeps the public nursery on the state rule and refuses a national 2026 deadline", () => {
    const guide = getGuideByPath("/colegio/escuela-infantil-publica")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toContain("BOE-A-2022-1654#a5");
    expect(html).toContain("voluntaria");
    expect(html).toContain("segundo ciclo");
    expect(html).toContain("artículo 84.2");
    expect(html).toContain("30 %");
    expect(html).toContain("No consta en el Real Decreto 95/2022");
    expect(html).not.toMatch(/plazo nacional|el plazo es el \d|cuesta \d+ €/i);
    expect(html).toContain('href="/colegio/lista-espera-escuela-infantil"');
  });

  it("sends lactation questions to the ministry pages and not to a personal feeding plan", () => {
    const guide = getGuideByPath("/bebe/apoyo-lactancia")!;
    const html = renderGuideHtml(guide.path);
    expect(guide.cta.href).toContain("lactanciaMaterna/recursos/home.htm");
    expect(guide.secondaryCta?.href).toContain("lactanciaMaterna/recomendaciones/home.htm");
    expect(html).toContain("primeros seis meses");
    expect(html).toContain("No es una instrucción para una familia determinada");
    expect(html).toContain("No hay en esta revisión un listado verificado");
    expect(html).not.toMatch(/debes dar el pecho|toma cada \d+ horas/i);
  });

  it("lists the new hubs in llms.txt and the sitemap without passing 200 lines", () => {
    const short = renderLlmsTxt();
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    expect(short.split("\n").length).toBeLessThan(200);
    expect(short).toContain("/bebe/calendario-vacunal-por-comunidad");
    expect(short).toContain("/colegio/escuela-infantil-publica");
    expect(short).toContain("/bebe/apoyo-lactancia");
    expect(short).toContain("calendario de 2025");
    for (const guide of FAMILIA_CCAA_GUIDES) {
      expect(sitemap, guide.path).toContain(`${guide.path}</loc>`);
    }
  });
});
