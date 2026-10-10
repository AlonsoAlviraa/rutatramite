import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { GET as goneCore } from "@/app/sitemap-core.xml/route";
import { GET as goneMun } from "@/app/sitemap-municipios.xml/route";
import { GET as goneProv } from "@/app/sitemap-provincias.xml/route";
import robots from "@/app/robots";
import { generateMetadata as fichaGenerateMetadata } from "@/app/empadronarse/[ccaa]/[provincia]/[municipio]/page";
import AvisoLegalPage from "@/app/aviso-legal/page";
import ContactoPage from "@/app/contacto/page";
import { loadIndex, loadMunicipio } from "@/lib/data/load";
import { absoluteUrl } from "@/lib/geo/paths";
import { renderFichaHtml, renderGuideHtml, renderPilarHtml } from "@/lib/render/server";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { indexNowUrlList } from "@/lib/seo/indexnow";
import { renderLlmsTxt } from "@/lib/seo/llms";
import { buildPilarModel } from "@/lib/pilar/content";
import { isFichaIndexable } from "@/lib/seo/localSignals";
import { clipMeta, fichaPageMetadata, fichaSeo, pageMetadata } from "@/lib/seo/meta";
import { canonicalSiteOrigin, withoutLegacyEsHost } from "@/lib/seo/origin";
import { sitemapXml } from "@/lib/seo/sitemapEntries";
import { CONTACT_EMAIL, SITE_ORIGIN } from "@/lib/types";

function jsonLdBlocks(html: string): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const re = /<script type="application\/ld\+json">([^<]*)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1]) as unknown;
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item && typeof item === "object") out.push(item as Record<string, unknown>);
        }
      } else if (parsed && typeof parsed === "object") {
        out.push(parsed as Record<string, unknown>);
      }
    } catch {
      /* skip torn */
    }
  }
  return out;
}

describe("SEO + GEO domain-ready contracts", () => {
  it("does not index inferred or unverified local content even when fields are populated", () => {
    const madrid = loadMunicipio("28079");
    expect(isFichaIndexable(madrid)).toBe(true);
    expect(isFichaIndexable({ ...madrid, confidence: "inferred" })).toBe(false);
    expect(isFichaIndexable({ ...madrid, confidence: "unverified" })).toBe(false);
  });
  it("canonical origin is rutatramite.com unless NEXT_PUBLIC_SITE_URL is set", () => {
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      expect(SITE_ORIGIN).toBe("https://rutatramite.com");
    }
    expect(SITE_ORIGIN.startsWith("https://")).toBe(true);
    expect(SITE_ORIGIN.endsWith("/")).toBe(false);
  });

  it("canonical and og:url use https://rutatramite.com and no generator emits rutatramite.es", () => {
    expect(canonicalSiteOrigin("https://rutatramite.es")).toBe("https://rutatramite.com");
    expect(canonicalSiteOrigin("http://www.rutatramite.es/")).toBe("https://rutatramite.com");
    expect(canonicalSiteOrigin("https://rutatramite.com/")).toBe("https://rutatramite.com");
    expect(canonicalSiteOrigin("https://preview.example")).toBe("https://preview.example");
    expect(withoutLegacyEsHost("https://rutatramite.es/dni")).toBe("https://rutatramite.com/dni");
    expect(withoutLegacyEsHost("http://www.rutatramite.es/empadronarse")).toBe(
      "https://rutatramite.com/empadronarse",
    );
    expect(absoluteUrl("https://rutatramite.es/dni")).toBe("https://rutatramite.com/dni");
    expect(absoluteUrl("/dni")).toBe(`${SITE_ORIGIN}/dni`);
    expect(SITE_ORIGIN).not.toContain("rutatramite.es");

    const configured = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rutatramite.com").replace(/\/+$/, "");
    const productionHost =
      !process.env.NEXT_PUBLIC_SITE_URL ||
      configured === "https://rutatramite.com" ||
      /^https?:\/\/(?:www\.)?rutatramite\.es$/i.test(configured);
    if (productionHost) {
      expect(SITE_ORIGIN).toBe("https://rutatramite.com");
    }

    const metas = [
      pageMetadata({
        title: "Inicio",
        description: "Guia ciudadana independiente de tramites en Espana, con enlaces a las sedes oficiales.",
        path: "/",
      }),
      pageMetadata({
        title: "DNI",
        description: "Guia ciudadana independiente de tramites en Espana, con enlaces a las sedes oficiales.",
        path: "/dni",
      }),
      fichaPageMetadata(loadMunicipio("28079")),
    ];
    const expected = [
      `${SITE_ORIGIN}/`,
      `${SITE_ORIGIN}/dni`,
      `${SITE_ORIGIN}/empadronarse/comunidad-de-madrid/madrid/madrid`,
    ];
    metas.forEach((meta, i) => {
      const canonical = meta.alternates?.canonical;
      const og =
        meta.openGraph && typeof meta.openGraph === "object" && !Array.isArray(meta.openGraph) && "url" in meta.openGraph
          ? meta.openGraph.url
          : undefined;
      expect(canonical, `canonical ${expected[i]}`).toBe(expected[i]);
      expect(og, `og:url ${expected[i]}`).toBe(expected[i]);
      expect(meta.alternates?.languages).toEqual({ es: expected[i], "x-default": expected[i] });
      expect(JSON.stringify(meta)).not.toContain("rutatramite.es");
    });

    const root = process.cwd();
    const layout = fs.readFileSync(path.join(root, "src/app/layout.tsx"), "utf8");
    expect(layout).toContain("metadataBase: new URL(SITE_ORIGIN)");
    expect(layout).toContain("canonical: SITE_ORIGIN");
    expect(layout).toContain("url: SITE_ORIGIN");
    expect(layout).not.toContain("rutatramite.es");

    const generated = [
      sitemapXml(),
      fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8"),
      renderLlmsTxt(),
      fs.readFileSync(path.join(root, "public/llms.txt"), "utf8"),
      JSON.stringify(organizationJsonLd()),
      JSON.stringify(websiteJsonLd()),
      JSON.stringify(robots()),
    ].join("\n");
    expect(generated).not.toContain("rutatramite.es");
    expect(generated).toContain(`${SITE_ORIGIN}/empadronarse`);

    expect(indexNowUrlList(["/dni"], "https://www.rutatramite.es")).toEqual(["https://rutatramite.com/dni"]);
    expect(indexNowUrlList(["https://rutatramite.es/pasaporte"], "https://rutatramite.es")).toEqual([
      "https://rutatramite.com/pasaporte",
    ]);

    const pyOut = execFileSync(
      "python",
      [
        "-c",
        "import importlib.util,sys; p=sys.argv[1]; s=importlib.util.spec_from_file_location('sitemaps', p); assert s and s.loader; m=importlib.util.module_from_spec(s); s.loader.exec_module(m); print(m.canonical_origin('https://rutatramite.es')); print(m.canonical_origin('http://www.rutatramite.es/')); print(m.canonical_origin('https://preview.example'))",
        path.join(root, "scripts/build_sitemaps.py"),
      ],
      { encoding: "utf8", cwd: root },
    );
    expect(pyOut.trim().split(/\r?\n/)).toEqual([
      "https://rutatramite.com",
      "https://rutatramite.com",
      "https://preview.example",
    ]);
  });

  it("Organization and WebSite JSON-LD are honest (no LocalBusiness, no our phone as padrón)", () => {
    const org = JSON.stringify(organizationJsonLd());
    const web = JSON.stringify(websiteJsonLd());
    expect(org).toContain("Organization");
    expect(web).toContain("WebSite");
    expect(org).not.toContain("LocalBusiness");
    expect(web).not.toContain("LocalBusiness");
    expect(web).not.toContain("SearchAction");
    expect(org).toContain(SITE_ORIGIN);
    expect(org.toLowerCase()).not.toMatch(/tel:\+/);
  });

  it("ficha SEO title/meta follow the playbook and stay 120–160 chars", () => {
    const madrid = loadMunicipio("28079");
    const seo = fichaSeo(madrid);
    expect(seo.title).toBe("Empadronarse en Madrid (Madrid): documentos, cita y sede 2026");
    expect(seo.canonical).toBe(`${SITE_ORIGIN}/empadronarse/comunidad-de-madrid/madrid/madrid`);
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(160);
    expect(seo.description.toLowerCase()).toContain("gratuita");
    const clipped = clipMeta("palabra ".repeat(40), 158);
    expect(clipped.endsWith("…")).toBe(true);
    expect(clipped.length).toBeLessThanOrEqual(159);
  });

  it("shipped ficha HTML has GEO lead, breadcrumbs, HowTo, FAQ, GovernmentService=Ayuntamiento", () => {
    const madrid = loadMunicipio("28079");
    const html = renderFichaHtml(madrid);
    expect(html).toContain('data-geo-lead');
    expect(html).toMatch(/En Madrid el alta en el padrón se hace/);
    expect(html).toContain("BreadcrumbList");
    expect(html).toContain("HowTo");
    expect(html).toContain("FAQPage");
    expect(html).toContain("GovernmentService");
    expect(html).toContain("Ayuntamiento de Madrid");
    expect(html).toContain("sede.madrid.es");
    expect(html).toMatch(new RegExp(`<time (?:dateTime|datetime)="${madrid.last_verified}">`));
    expect(html).not.toContain("LocalBusiness");
    expect(html).toContain('aria-label="Migas de pan"');
    const oleadaD = loadMunicipio("28004");
    const htmlD = renderFichaHtml(oleadaD);
    expect(htmlD).toContain("GovernmentService");
    expect(htmlD).toContain("HowTo");
    const gsD = jsonLdBlocks(htmlD).find((b) => b["@type"] === "GovernmentService");
    expect(gsD, "Álamo GovernmentService").toBeTruthy();
    expect(gsD?.url, "stub must not use RutaTrámite as GovernmentService.url").toBeUndefined();
    expect(htmlD).toContain("Pendiente de verificación local");
    expect(htmlD).not.toMatch(/data-geo-lead=""[^>]*>[^<]*verificada /);
    expect(html).not.toContain("CivicStructure"); // Madrid stores an office-directory instruction, not an address.
  });

  it("pilar HTML includes HowTo + FAQPage + GovernmentService", () => {
    const html = renderPilarHtml();
    expect(html).toContain("HowTo");
    expect(html).toContain("FAQPage");
    expect(html).toContain("GovernmentService");
    expect(html).toContain("BreadcrumbList");
    expect(html).toMatch(new RegExp(`<time (?:dateTime|datetime)="${buildPilarModel().editedAt}">`));
    const gs = jsonLdBlocks(html).find((b) => b["@type"] === "GovernmentService");
    expect(gs, "pilar GovernmentService").toBeTruthy();
    expect(gs?.url, "pilar must not point GovernmentService.url at this host").toBeUndefined();
  });

  it("national padron hub links Madrid, Barcelona and Valencia with relative hrefs", () => {
    const html = renderPilarHtml();
    const rows = [
      { ine: "28079", index: true },
      { ine: "08019", index: true },
      { ine: "46250", index: true },
    ] as const;
    expect(html).toContain('aria-label="Fichas de Madrid, Barcelona y València"');
    for (const row of rows) {
      const m = loadMunicipio(row.ine);
      expect(m.path.startsWith("/"), m.name).toBe(true);
      expect(m.path.startsWith("//"), m.name).toBe(false);
      expect(html, m.name).toContain(`href="${m.path}"`);
      expect(html, m.name).not.toContain(`href="${SITE_ORIGIN}${m.path}"`);
      expect(html, m.name).not.toContain(`href="https://rutatramite.es${m.path}"`);
      expect(isFichaIndexable(m), m.name).toBe(row.index);
      expect(fichaPageMetadata(m).robots).toEqual({ index: row.index, follow: true });
    }
  });

  it("one urlset sitemap.xml lists every indexable URL (no sitemapindex hop)", () => {
    const root = process.cwd();
    const xml = fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
    expect(xml).toContain("<urlset");
    expect(xml).not.toContain("<sitemapindex");
    expect(xml).not.toContain("localhost");
    expect(xml).not.toContain("rutatramite.es");
    expect(xml).toContain("<lastmod>");
    expect(xml).toContain("https://rutatramite.com/empadronarse");
    expect(xml).toContain("https://rutatramite.com/empadronarse/comunidad-de-madrid/madrid/madrid");
    expect(xml).toContain("https://rutatramite.com/modelo-baja-voluntaria");
    expect(xml).toContain("https://rutatramite.com/preaviso-fin-alquiler");
    const idx = loadIndex();
    expect(idx.length).toBe(769);
    expect(idx.some((m) => m.oleada === "E")).toBe(false);
    expect(xml).not.toContain("alegria-dulantzi");
    const madrid = loadMunicipio("28079");
    const alamo = loadMunicipio("28004");
    expect(isFichaIndexable(madrid)).toBe(true);
    expect(isFichaIndexable(alamo)).toBe(false);
    expect(xml).toContain(`https://rutatramite.com${madrid.path}`);
    expect(xml).not.toContain(`https://rutatramite.com${alamo.path}`);
    const locs = xml.match(/<loc>/g) ?? [];
    expect(locs.length).toBeGreaterThan(200);
    expect(locs.length).toBeLessThan(2000);
    for (const leftover of ["sitemap-core.xml", "sitemap-provincias.xml", "sitemap-municipios.xml"]) {
      expect(fs.existsSync(path.join(root, "public", leftover))).toBe(false);
    }
  });

  it("ficha generateMetadata indexes Madrid and noindexes Álamo via shipped helper", async () => {
    const madrid = loadMunicipio("28079");
    const alamo = loadMunicipio("28004");
    const madridMeta = fichaPageMetadata(madrid);
    const alamoMeta = fichaPageMetadata(alamo);
    expect(madridMeta.robots).toEqual({ index: true, follow: true });
    expect(alamoMeta.robots).toEqual({ index: false, follow: true });
    const liveMadrid = await fichaGenerateMetadata({
      params: Promise.resolve({
        ccaa: "comunidad-de-madrid",
        provincia: "madrid",
        municipio: "madrid",
      }),
    });
    const liveAlamo = await fichaGenerateMetadata({
      params: Promise.resolve({
        ccaa: "comunidad-de-madrid",
        provincia: "madrid",
        municipio: "alamo-el",
      }),
    });
    expect(liveMadrid.robots).toEqual({ index: true, follow: true });
    expect(liveAlamo.robots).toEqual({ index: false, follow: true });
  });

  it("pack guides do not fabricate FAQ or procedural markup from sections", () => {
    const html = renderGuideHtml("/dni/cita-previa");
    expect(html).toContain("Article");
    expect(html).not.toContain("HowTo");
    expect(html).not.toContain("FAQPage");
    expect(html).not.toContain('href="#preguntas-frecuentes"');
    expect(html).toContain("citapreviadnie.es");
    expect(html).not.toContain("LocalBusiness");
  });

  it("contacto and aviso-legal use the live .com mailbox, not NXDOMAIN .es", () => {
    const contacto = renderToStaticMarkup(createElement(ContactoPage));
    const aviso = renderToStaticMarkup(createElement(AvisoLegalPage));
    expect(CONTACT_EMAIL).toBe("hola@rutatramite.com");
    expect(contacto).toContain(CONTACT_EMAIL);
    expect(contacto).not.toContain("hola@rutatramite.es");
    expect(aviso).toContain("rutatramite.com");
    expect(aviso).toContain(CONTACT_EMAIL);
    expect(aviso).not.toContain("rutatramite.es");
    expect(aviso).not.toContain("hola@rutatramite.es");
    expect(aviso).toContain("sobre los trámites en España");
    expect(aviso).not.toContain("sobre el trámites");
  });

  it("leftover split-sitemap routes return 404 text, not XML", async () => {
    for (const res of [goneCore(), goneProv(), goneMun()]) {
      expect(res.status).toBe(404);
      const ctype = res.headers.get("content-type") ?? "";
      expect(ctype).not.toMatch(/xml/i);
      expect(ctype).toMatch(/text\/plain/);
      const body = await res.text();
      expect(body.toLowerCase()).not.toContain("<urlset");
      expect(body.toLowerCase()).not.toContain("<sitemapindex");
    }
  });
});
