import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import HomePage from "@/app/page";
import { BuscarView } from "@/components/ui/BuscarView";
import { GET as llmsFull } from "@/app/llms-full.txt/route";
import { GET as llmsShort } from "@/app/llms.txt/route";
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
    expect(rules.some((row) => row.disallow === "/")).toBe(false);
    const bytespider = rules.find((row) => row.userAgent === "Bytespider");
    expect(bytespider?.allow).toBe("/");
    expect(bytespider?.disallow).toEqual(expect.arrayContaining(["/api/", "/borrador/"]));
    expect(JSON.stringify(r)).not.toMatch(/noindex/i);
  });

  it("WebSite JSON-LD does not point SearchAction at noindex /buscar", () => {
    const web = JSON.stringify(websiteJsonLd());
    expect(web).not.toContain("SearchAction");
    expect(web).not.toContain("/buscar?q=");
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

  it("CORE, public sitemap.xml and Next entries include the same hubs", () => {
    const py = fs.readFileSync(path.join(process.cwd(), "scripts/build_sitemaps.py"), "utf8");
    const coreBody = py.match(/CORE = \[([\s\S]*?)\]\n/);
    expect(coreBody, "CORE list").toBeTruthy();
    const core = [...(coreBody?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((match) => match[1]);
    const xml = fs.readFileSync(path.join(process.cwd(), "public/sitemap.xml"), "utf8");
    const xmlPaths = [...xml.matchAll(/<loc>https:\/\/rutatramite\.com([^<]*)<\/loc>/g)].map((match) =>
      match[1] === "" ? "/" : match[1],
    );
    const entryPaths = buildSitemapEntries().map((entry) => {
      const rest = entry.url.slice(SITE_ORIGIN.length);
      return rest === "" ? "/" : rest;
    });
    const isHub = (hubPath: string) =>
      hubPath === "/" ||
      hubPath === "/recursos/padron-municipal" ||
      hubPath.split("/").filter(Boolean).length === 1;
    const unique = (paths: string[]) => [...new Set(paths.filter(isHub))].sort();
    const coreHubs = unique(core);
    expect(unique(xmlPaths)).toEqual(coreHubs);
    expect(unique(entryPaths)).toEqual(coreHubs);
    for (const hub of ["/elecciones", "/ayudas", "/alquiler", "/transporte", "/recursos", "/recursos/padron-municipal"]) {
      expect(coreHubs, hub).toContain(hub);
    }
    for (const hubPath of core) {
      expect(xmlPaths, hubPath).toContain(hubPath);
      expect(entryPaths, hubPath).toContain(hubPath);
    }
    expect(xmlPaths).not.toContain("/buscar");
    expect(entryPaths).not.toContain("/buscar");
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
    expect(publicShort).toBe(short);
    expect(publicShort).toContain("citapreviadnie.es");
    expect(publicShort).toContain("No somos Administración");
    expect(publicShort).toContain(`${SITE_ORIGIN}/llms-full.txt`);
    expect(publicShort).toContain(`${SITE_ORIGIN}/elecciones`);
    expect(publicShort).toContain(`${SITE_ORIGIN}/sitemap.xml`);
    expect(fs.existsSync(path.join(process.cwd(), "public/.well-known/ai.txt"))).toBe(true);
  });

  it("llms.txt route returns the same hub directory as public/llms.txt", async () => {
    const publicShort = fs.readFileSync(path.join(process.cwd(), "public/llms.txt"), "utf8");
    const route = llmsShort();
    expect(route.headers.get("content-type")).toMatch(/text\/plain/);
    expect(await route.text()).toBe(publicShort);
    expect(publicShort).toBe(renderLlmsTxt());
    const directory = publicShort.split("## Directorio de trámites")[1]?.split("## ")[0] ?? "";
    for (const hub of ["elecciones", "ayudas", "alquiler", "transporte"]) {
      expect(directory, hub).toContain(`${SITE_ORIGIN}/${hub}`);
      expect(fs.existsSync(path.join(process.cwd(), "src/app", hub, "page.tsx")), hub).toBe(true);
    }
    expect(publicShort).not.toMatch(/\b(impresiones|clics|tr[a\u00e1]fico|visitas)\b/i);
    expect(publicShort).not.toMatch(/citad[oa]s? por/i);
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
