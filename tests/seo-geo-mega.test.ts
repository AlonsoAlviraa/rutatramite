import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import HomePage from "@/app/page";
import { BuscarView } from "@/components/ui/BuscarView";
import { GET as llmsFull } from "@/app/llms-full.txt/route";
import { GET as aiSummary } from "@/app/ai/summary.json/route";
import { GET as aiFaq } from "@/app/ai/faq.json/route";
import { GET as municipiosIndex } from "@/app/api/municipios-index/route";
import { SEARCH_CITATION_BOTS } from "@/lib/seo/crawlers";
import { localeAlternates } from "@/lib/seo/hreflang";
import {
  INDEXNOW_KEY,
  indexNowKeyLocation,
  indexNowUrlList,
  pingIndexNow,
} from "@/lib/seo/indexnow";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { renderLlmsFullTxt, renderLlmsTxt } from "@/lib/seo/llms";
import { pageMetadata } from "@/lib/seo/meta";
import { searchSite } from "@/lib/seo/siteSearch";
import { buildSitemapEntries } from "@/lib/seo/sitemapEntries";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { SITE_ORIGIN } from "@/lib/types";
import { slimClientIndex } from "@/lib/wizard/clientIndex";
import { loadIndex } from "@/lib/data/load";
import { renderCcaaHubHtml } from "@/lib/render/server";

describe("SEO+GEO mega contracts", () => {
  it("hreflang is honest: es + x-default only", () => {
    const url = `${SITE_ORIGIN}/dni`;
    expect(localeAlternates(url)).toEqual({ es: url, "x-default": url });
    const meta = pageMetadata({ title: "T", description: "D".repeat(80), path: "/dni" });
    expect(meta.alternates?.languages).toEqual({ es: url, "x-default": url });
  });

  it("robots lists search/citation bots explicitly and does not noindex the site", () => {
    const r = robots();
    const rules = r.rules as { userAgent: string; allow?: string | string[]; disallow?: string | string[] }[];
    for (const agent of SEARCH_CITATION_BOTS) {
      const rule = rules.find((row) => row.userAgent === agent);
      expect(rule, agent).toBeTruthy();
      expect(rule?.allow).toBe("/");
      expect(rule?.disallow).toEqual(expect.arrayContaining(["/api/", "/borrador/"]));
    }
    const blocked = rules.find((row) => row.userAgent === "Bytespider");
    expect(blocked?.disallow).toBe("/");
    expect(JSON.stringify(r)).not.toMatch(/noindex/i);
  });

  it("WebSite JSON-LD has a real SearchAction target", () => {
    const web = websiteJsonLd() as { potentialAction?: { target?: { urlTemplate?: string } } };
    expect(web.potentialAction?.target?.urlTemplate).toBe(`${SITE_ORIGIN}/buscar?q={search_term_string}`);
    const org = JSON.stringify(organizationJsonLd());
    expect(org).toContain("/metodologia");
    expect(org).toContain("hola@rutatramite.com");
    expect(org).not.toContain("LocalBusiness");
  });

  it("Next sitemap lists hubs first and every published guide", () => {
    const entries = buildSitemapEntries();
    expect(entries[0]?.url).toBe(`${SITE_ORIGIN}/`);
    expect(entries[1]?.url).toBe(`${SITE_ORIGIN}/empadronarse`);
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${SITE_ORIGIN}/dni`);
    expect(urls).toContain(`${SITE_ORIGIN}/empadronarse/comunidad-de-madrid`);
    expect(urls).not.toContain(`${SITE_ORIGIN}/buscar`);
    for (const guide of ALL_GUIDES) {
      expect(urls, guide.path).toContain(`${SITE_ORIGIN}${guide.path}`);
    }
    expect(entries.some((e) => e.lastModified)).toBe(true);
  });

  it("llms.txt + llms-full.txt stay citable and list catalog paths", () => {
    const short = renderLlmsTxt();
    const full = renderLlmsFullTxt();
    expect(short.startsWith("# RutaTrámite")).toBe(true);
    expect(short).toContain("> Guía ciudadana independiente");
    expect(short).toContain("/empadronarse/{ccaa}/{provincia}/{municipio}");
    expect(short.split("\n").length).toBeLessThan(200);
    expect(full).toContain("llms.txt");
    for (const guide of ALL_GUIDES) {
      expect(full, guide.path).toContain(`${SITE_ORIGIN}${guide.path}`);
    }
    const publicShort = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf8");
    expect(publicShort).toContain("citapreviadnie.es");
    expect(publicShort).toContain("No somos Administración");
    expect(fs.existsSync(path.join(process.cwd(), "public/.well-known/ai.txt"))).toBe(true);
  });

  it("AI discovery routes return JSON / full llms", async () => {
    const full = await llmsFull();
    expect(full.headers.get("content-type")).toMatch(/text\/plain/);
    expect(await full.text()).toContain("índice completo");
    const summary = await aiSummary();
    const summaryJson = (await summary.json()) as { name: string; pillars: { url: string }[] };
    expect(summaryJson.name).toBe("RutaTrámite");
    expect(summaryJson.pillars.some((p) => p.url.endsWith("/empadronarse"))).toBe(true);
    const faq = await aiFaq();
    const faqJson = (await faq.json()) as { faqs: { q: string }[] };
    expect(faqJson.faqs.length).toBeGreaterThan(5);
  });

  it("IndexNow key location and fail-soft ping", async () => {
    expect(indexNowKeyLocation()).toBe(`${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`);
    expect(indexNowUrlList()[0]).toBe(`${SITE_ORIGIN}/`);
    const result = await pingIndexNow({
      fetchImpl: async () => {
        throw new Error("offline");
      },
    });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(0);
    expect(result.submitted).toBeGreaterThan(5);
  });

  it("home SSR keeps answer text and wizard without hydrating the municipio catalog into search", () => {
    const html = renderToStaticMarkup(createElement(HomePage));
    expect(html).toContain("data-geo-lead");
    expect(html).toContain("No somos Administración");
    expect(html).toContain("data-wizard");
    expect(html).toContain('action="/buscar"');
    expect(html).not.toContain("/empadronarse/comunidad-de-madrid/madrid/madrid");
    const slim = slimClientIndex(loadIndex());
    expect(slim[0]).toHaveProperty("ine_code");
    expect(slim[0]).not.toHaveProperty("oleada");
    expect(slim[0]).not.toHaveProperty("min_words");
  });

  it("wizard municipio index is a noindex JSON endpoint, not home HTML", async () => {
    const res = await municipiosIndex();
    expect(res.headers.get("x-robots-tag")).toMatch(/noindex/i);
    const rows = (await res.json()) as { ine_code: string; path: string }[];
    expect(rows.length).toBe(loadIndex().length);
    expect(rows.some((r) => r.path.includes("/madrid/madrid"))).toBe(true);
  });

  it("CCAA hub leads with a citable answer and breadcrumbs", () => {
    const html = renderCcaaHubHtml("Comunidad de Madrid", "comunidad-de-madrid", ["Madrid"]);
    expect(html).toContain("data-geo-lead");
    expect(html).toContain('aria-label="Migas de pan"');
    expect(html).toContain("BreadcrumbList");
    expect(html).toContain("/empadronarse/sin-contrato");
  });

  it("server search finds DNI and Madrid without client JS", async () => {
    expect(searchSite("dni cita").some((h) => h.href.includes("/dni"))).toBe(true);
    expect(searchSite("madrid").some((h) => h.href.includes("/madrid/madrid"))).toBe(true);
    const html = renderToStaticMarkup(createElement(BuscarView, { query: "dni" }));
    expect(html).toContain("/dni");
    expect(html).toContain("data-geo-lead");
  });
});
