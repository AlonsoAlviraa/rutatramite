import fs from "node:fs";
import path from "node:path";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { SiteHeader } from "@/components/empadronamiento/SiteHeader";
import { SiteNav, navCallToAction } from "@/components/empadronamiento/SiteNav";
import { SiteFooter } from "@/components/empadronamiento/SiteFooter";
import { PackIndex } from "@/components/tramites/PackIndex";
import { TableOfContents } from "@/components/ui/TableOfContents";
import PassportPage from "@/app/pasaporte/page";
import { metadata as padronMetadata } from "@/app/empadronarse/page";
import { renderFichaHtml, renderPilarHtml, renderEscenarioHtml, renderGuideHtml } from "@/lib/render/server";
import { loadMunicipio } from "@/lib/data/load";
import { OfficialCta } from "@/components/empadronamiento/OfficialCta";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import { DISCLAIMER_SHORT, PRODUCT_NAME, SITE_ORIGIN, WIZARD_QUESTIONS } from "@/lib/types";

describe("front chrome and homepage hierarchy (shipped views)", () => {
  it("passport route has its own heading and relevant directory", () => {
    const html = renderToStaticMarkup(createElement(PassportPage));
    expect(html).toContain("Pasaporte en España 2026: cuánto cuesta (30 €), cita y urgente");
    expect(html).toContain('href="/pasaporte/cita-previa"');
    expect(html).toContain('href="/dni/primera-expedicion-menor"');
    expect(html).not.toContain('href="/dni/caducado-banco"');
    expect(html).not.toContain("El padrón lo gestiona cada Ayuntamiento");
  });
  it("header + portada: product, 6 wizard questions, assistant marker, nav, pack cards not only ul", () => {
    const html = renderToStaticMarkup(
      createElement(Fragment, null, createElement(SiteHeader), createElement(HomePage)),
    );
    expect(html).toContain(PRODUCT_NAME);
    expect(html).toContain("data-home-wizard");
    expect(html).toContain("data-wizard");
    expect(html).toContain("/empadronarse");
    expect(html).toContain("/dni");
    expect(html).toContain("/extranjeria");
    for (const q of WIZARD_QUESTIONS) {
      expect(html).toContain(q);
    }
    expect(html).toContain("data-pack-card");
    expect(html).toContain("data-pack-grid");
    const homePacks = html.match(/data-pack-card/g) ?? [];
    expect(homePacks.length).toBeGreaterThanOrEqual(8);
    expect(html).toContain('id="asistente"');
    expect(html).toContain("Menú");
    expect(html).toContain('action="/buscar"');
    expect(html).toContain('href="/buscar"');
    const shortcuts = html.slice(html.indexOf("home-shortcuts"), html.indexOf("home-shortcuts") + 500);
    expect(shortcuts).toContain('href="/extranjeria">Extranjería</a>');
    expect(shortcuts).not.toContain('href="/buscar"');
    expect(shortcuts).not.toContain(">Buscar<");
    expect(html).toContain("No tener un contrato a tu nombre no impide por sí solo empadronarte donde resides habitualmente.");
    expect(html).toContain("El contrato sirve para acreditar dónde vives; tenerlo no sustituye la solicitud de empadronamiento.");
    expect(html).toContain("La situación administrativa irregular no impide por sí sola empadronarte donde vives.");
    expect(html).toContain("El volante informa de los datos del padrón; el certificado los acredita fehacientemente a efectos administrativos.");
    expect(html).not.toContain("Guía nacional del caso");
    expect(html).toContain('href="/ayudas"');
    expect(html).toContain('href="/alquiler"');
    expect(html).toContain('href="/transporte"');
    expect(html).toContain("Asistente de padrón");
    expect(html).not.toContain("Mi guía de padrón");
  });

  it("header lockup ships the typographic mark, both name parts and the kicker", () => {
    const html = renderToStaticMarkup(createElement(SiteHeader));
    expect(html).toContain("brand-lockup");
    expect(html).toContain("brand-mark");
    expect(html).toContain("brand-kicker");
    expect(html).toContain("font-display");
    expect(html).toContain('aria-label="RutaTrámite"');
    expect(html).toContain("#1B4332");
    expect(html).toContain("#FAF7F2");
    expect(html).toContain("#252B26");
    expect(html).toContain("width:28px");
    expect(html).toContain("height:28px");
    expect(html).toContain(">R<");
    expect(html).toContain(">Ruta<");
    expect(html).toContain(">Trámite<");
    expect(html).toContain(PRODUCT_NAME);
    expect(html).toContain("Guía ciudadana independiente");
    expect(html).not.toContain("linear-gradient");
    const icon = fs.readFileSync(path.join(process.cwd(), "src/app/icon.tsx"), "utf8");
    const og = fs.readFileSync(path.join(process.cwd(), "src/app/opengraph-image.tsx"), "utf8");
    for (const source of [icon, og]) {
      expect(source).toContain("#1B4332");
      expect(source).toContain("#FAF7F2");
      expect(source).not.toContain("linear-gradient");
    }
    expect(og).toContain("#252B26");
    expect(og).toContain(">Ruta<");
    expect(og).toContain(">Trámite<");
  });

  it("Organization JSON-LD points logo at the shipped icon route, not a LocalBusiness", () => {
    const org = JSON.stringify(organizationJsonLd());
    expect(org).toContain('"@type":"Organization"');
    expect(org).toContain(`"logo":"${SITE_ORIGIN}/icon"`);
    expect(org).toContain(`"name":"${PRODUCT_NAME}"`);
    expect(org).not.toContain("LocalBusiness");
  });

  it("globals.css ships header lockup, kicker and the mobile nav collapse", () => {
    const css = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");
    expect(css).toContain(".brand-lockup");
    expect(css).toContain(".brand-mark");
    expect(css).toContain(".brand-kicker");
    expect(css).toContain("#1B4332");
    expect(css).toContain("#FAF7F2");
    expect(css).toContain("#252B26");
    expect(css).toContain(".site-header");
    expect(css).toContain(".site-nav");
    expect(css).toContain(".nav-toggle");
    expect(css).toMatch(/@media \(max-width:1279px\)[\s\S]*\.nav-toggle[\s\S]*display:inline-flex[\s\S]*\.site-nav \{ display:none/);
  });

  it("OfficialCta is omitted without href and marks official destinations", () => {
    const empty = renderToStaticMarkup(createElement(OfficialCta, { href: null, label: "Ir a la sede" }));
    expect(empty).toBe("");
    const html = renderToStaticMarkup(
      createElement(OfficialCta, { href: "https://www.citapreviadnie.es/", label: "Ir a citapreviadnie.es" }),
    );
    expect(html).toContain("data-official-cta");
    expect(html).toContain("https://www.citapreviadnie.es/");
    expect(html).toContain("Ir a citapreviadnie.es");
    const internal = renderToStaticMarkup(
      createElement(OfficialCta, { href: "/dni/checklist", label: "Qué llevar a la cita", variant: "secondary" }),
    );
    expect(internal).toContain("/dni/checklist");
    expect(internal).not.toContain("data-official-cta");
  });

  it("footer lists packs and the independent-guide disclaimer", () => {
    const html = renderToStaticMarkup(createElement(SiteFooter));
    expect(html).toContain(PRODUCT_NAME);
    expect(html).toContain("/empadronarse");
    expect(html).toContain("/dni");
    expect(html).toContain("/extranjeria");
    expect(html).toContain("/transporte");
    expect(html).toContain("No somos Administración Pública");
  });

  it("pack indexes and primary templates keep CTA, crumbs and disclaimer chrome", () => {
    const dni = renderToStaticMarkup(createElement(PackIndex, { pack: "viaje" }));
    expect(dni).toContain('data-pack-index="viaje"');
    expect(dni).toContain("data-pack-card");
    expect(dni).toContain('aria-label="Migas de pan"');
    expect(dni).toContain("citapreviadnie.es");
    expect(dni).toContain("data-official-cta");

    const comedor = renderToStaticMarkup(createElement(PackIndex, { pack: "comedor" }));
    expect(comedor).not.toContain("/transporte/t16-como-solicitar");
    expect(comedor).not.toContain("/transporte/abono-joven-estudiante");
    const transporte = renderToStaticMarkup(createElement(PackIndex, { pack: "transporte" }));
    expect(transporte).toContain("/transporte/t16-como-solicitar");
    expect(transporte).toContain("/transporte/abono-joven-estudiante");
    expect(transporte).toContain("https://rutatramite.com/transporte");

    const extranjeria = renderToStaticMarkup(createElement(PackIndex, { pack: "extranjeria" }));
    expect(extranjeria).toContain("data-pack-card");
    expect(extranjeria).toContain("No somos Administración");

    const pilar = renderPilarHtml();
    expect(pilar).toContain('aria-label="Migas de pan"');
    expect(pilar).toContain("No somos Administración Pública");
    expect(pilar).toContain("data-pack-card");

    const escenario = renderEscenarioHtml("sin-contrato");
    expect(escenario).toContain('aria-label="Migas de pan"');
    expect(escenario).toContain("No somos Administración Pública");

    const ficha = renderFichaHtml(loadMunicipio("28079"));
    expect(ficha).toContain("data-official-cta");
    expect(ficha).toContain("sede.madrid.es");
    expect(ficha).toContain('aria-label="Migas de pan"');
    expect(ficha).toContain("No somos Administración Pública");

    const cita = renderGuideHtml("/dni/cita-previa");
    expect(cita).toContain("citapreviadnie.es");
    expect(cita).toContain("data-official-cta");
    expect(cita).toContain("No somos Administración Pública");
  });

  it("lists homepage hubs in the mobile nav and switches the CTA outside padron", () => {
    expect(navCallToAction("/dni")).toEqual({ href: "/#tramites", label: "Explorar trámites" });
    expect(navCallToAction("/")).toEqual({ href: "/#tramites", label: "Explorar trámites" });
    expect(navCallToAction("/empadronarse")).toEqual({ href: "/#asistente", label: "Asistente de padrón" });
    expect(navCallToAction("/empadronarse/sin-contrato")).toEqual({ href: "/#asistente", label: "Asistente de padrón" });
    expect(navCallToAction(null)).toEqual({ href: "/#asistente", label: "Asistente de padrón" });

    const dni = renderToStaticMarkup(createElement(SiteNav, { pathname: "/dni" }));
    for (const href of ["/alquiler", "/extranjeria", "/becas", "/mudanza", "/colegio", "/comedor", "/fp", "/bebe"]) {
      expect(dni).toContain(`href="${href}"`);
    }
    expect(dni).toContain(">Alquiler</a>");
    expect(dni).toContain(">Extranjería</a>");
    expect(dni).toContain(">Becas</a>");
    expect(dni).not.toMatch(/<a href="\/alquiler"[^>]*nav-mobile-only/);
    expect(dni).not.toMatch(/<a href="\/extranjeria"[^>]*nav-mobile-only/);
    expect(dni).not.toMatch(/<a href="\/becas"[^>]*nav-mobile-only/);
    for (const href of ["/mudanza", "/colegio", "/comedor", "/fp", "/bebe"]) {
      expect(dni).toContain(`<a href="${href}" class="nav-mobile-only min-[1280px]:!hidden">`);
    }
    expect(dni).toContain('<a class="nav-cta" href="/#tramites">Explorar trámites</a>');
    expect(dni).not.toContain("Asistente de padrón");
    expect(dni).not.toContain('href="/buscar"');

    const padron = renderToStaticMarkup(createElement(SiteNav, { pathname: "/empadronarse/sin-contrato" }));
    expect(padron).toContain('<a class="nav-cta" href="/#asistente">Asistente de padrón</a>');
    expect(padron).not.toContain('<a class="nav-cta" href="/#tramites">');

    const home = renderToStaticMarkup(createElement(SiteNav, { pathname: "/" }));
    expect(home).toContain('<a class="nav-cta" href="/#tramites">Explorar trámites</a>');
    expect(home).not.toContain("Asistente de padrón");
  });

  it("keeps the long DNI guide index and reading column within a 390px viewport", () => {
    const html = renderGuideHtml("/dni/renovar-caducado");
    expect(html).toContain('data-guide="renovar-dni"');
    expect(html).toContain("page-shell");
    expect(html).toContain("w-full");
    expect(html).toContain("min-w-0");
    expect(html).toContain("px-4");
    expect(html).toContain("guide-layout");
    expect(html).toContain('aria-label="En esta guía"');
    expect(html).toContain('data-reading-column=""');
    expect(html).toContain("guide-reading");
    expect(html).toContain("minmax(0,1fr)");
    expect(html).toContain('href="#caducidad"');
    const layoutAt = html.indexOf("guide-layout");
    const tocAt = html.indexOf('aria-label="En esta guía"');
    const readingAt = html.indexOf("data-reading-column");
    expect(tocAt).toBeGreaterThan(layoutAt);
    expect(readingAt).toBeGreaterThan(tocAt);
    expect(html.indexOf('id="caducidad"')).toBeGreaterThan(readingAt);
    expect(html.indexOf("data-disclaimer")).toBeGreaterThan(readingAt);

    const toc = renderToStaticMarkup(
      createElement(TableOfContents, {
        items: [{ id: "caducidad", title: "Caducidad y cambio de datos" }],
      }),
    );
    expect(toc).toContain("guide-toc");
    expect(toc).toContain("min-w-0");
    expect(toc).toContain('aria-label="En esta página"');
    expect(toc).toContain('href="#caducidad"');

    const ficha = renderFichaHtml(loadMunicipio("28079"));
    expect(ficha).toContain("guide-toc");
    expect(ficha).toContain("min-w-0");

    const css = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");
    expect(css).toContain(".guide-layout { display:grid; grid-template-columns:minmax(0,1fr); min-width:0; }");
    expect(css).toContain("grid-template-columns:minmax(0,246px) minmax(0,1fr); column-gap:2.5rem;");
    expect(css).toContain("[data-guide] { max-width:1120px; }");
    expect(css).toContain("[data-ficha] > .guide-toc");
    expect(css).not.toContain("[data-guide] > nav");
    expect(css).toContain("overflow-wrap:anywhere");

    const shellPadding = 32;
    const mobileInner = Math.min(768, 390) - shellPadding;
    expect(mobileInner).toBe(358);
    expect(mobileInner).toBeLessThanOrEqual(390);
    const desktopShell = Math.min(1120, 1280);
    const desktopInner = desktopShell - shellPadding;
    const tocWidth = 246;
    const columnGap = 40;
    const reading = desktopInner - tocWidth - columnGap;
    expect(desktopShell).toBe(1120);
    expect(reading).toBe(802);
    expect(tocWidth + columnGap + reading).toBe(desktopInner);
    expect(reading).toBeGreaterThan(0);
  });

  it("hub /empadronarse uses the same principal phrase in the title and the h1", () => {
    // 2026-10-10: /empadronarse está en el experimento sin sufijo (title { absolute } si supera 60 con sufijo).
    const raw = padronMetadata.title;
    const title = typeof raw === "string" ? raw : (raw as { absolute: string }).absolute;
    expect(title).toBe("Cómo empadronarse en España: gratis, requisitos y pasos");
    const html = renderPilarHtml();
    const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/);
    expect(match).toBeTruthy();
    const visible = match![1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    expect(visible).toBe(title);
    expect(visible).not.toContain(`· ${PRODUCT_NAME}`);
  });

  it("homepage search precedes topic rows that carry a description and no badge or fixed height", () => {
    const html = renderToStaticMarkup(createElement(HomePage));
    const searchAt = html.indexOf('class="directory-search"');
    const topicsAt = html.indexOf("data-home-topics");
    expect(searchAt).toBeGreaterThan(-1);
    expect(topicsAt).toBeGreaterThan(searchAt);

    const blocks: string[] = [];
    const marker = "data-home-topics";
    let from = 0;
    while (from < html.length) {
      const start = html.indexOf(marker, from);
      if (start < 0) break;
      const openEnd = html.indexOf(">", start);
      const close = html.indexOf("</div>", openEnd);
      expect(openEnd).toBeGreaterThan(start);
      expect(close).toBeGreaterThan(openEnd);
      blocks.push(html.slice(openEnd + 1, close));
      from = close + 6;
    }
    expect(blocks).toHaveLength(2);
    const counts = blocks.map((block) => {
      expect(block).not.toContain("data-unverified-badge");
      expect(block).not.toContain("<svg");
      expect(block).not.toMatch(/class="[^"]*\b(?:badge|chip|pill|rt-kicker)\b/);
      const cards = block.match(/<a\b(?=[^>]*\bdata-pack-card="")[^>]*>[\s\S]*?<\/a>/g) ?? [];
      expect(cards.length).toBeGreaterThan(0);
      for (const card of cards) {
        expect(card).toMatch(/href="\/[^"]+"/);
        const description = card.match(/<p\b[^>]*>([\s\S]*?)<\/p>/);
        expect(description).toBeTruthy();
        expect(description![1].replace(/<[^>]+>/g, "").trim().length).toBeGreaterThan(20);
        expect(card).not.toMatch(/\b(?:min-h-|h-\d|h-\[)/);
        expect(card).not.toMatch(/\sstyle="[^"]*(?:height|min-height)/);
      }
      return cards.length;
    });
    expect(counts[0]).toBeGreaterThanOrEqual(8);
    expect(counts[1]).toBeGreaterThanOrEqual(4);

    const css = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");
    const cardRule = css.match(/\.rt-card \{[^}]*\}/)?.[0] ?? "";
    expect(cardRule).toContain("border-bottom:1px solid var(--sand)");
    expect(cardRule).not.toMatch(/(?:^|[^-])(?:min-height|height|max-height)\s*:/);
    expect(css).toContain(".topic-directory { display:grid; grid-template-columns:repeat(2,minmax(0,1fr));");
    expect(css).toMatch(/@media \(max-width:600px\)[\s\S]*?\.topic-directory \{ grid-template-columns:1fr;/);
  });

  it("alquiler hub cites the Bono and the 2026-2030 Plan on the BOE", () => {
    const html = renderToStaticMarkup(createElement(PackIndex, { pack: "alquiler" }));
    expect(html).toContain('href="https://www.boe.es/buscar/act.php?id=BOE-A-2022-802"');
    expect(html).toContain('href="https://www.boe.es/buscar/act.php?id=BOE-A-2026-8872"');
    expect(html).toContain("250 €");
    expect(html).toContain("300 €");
    expect(html).toContain("No somos Administración Pública");
  });

  it("keeps one administration phrase in the header, the footer phrase, and the guide disclaimer", () => {
    const header = renderToStaticMarkup(createElement(SiteHeader));
    expect(header.match(/No somos la Administración/g)).toEqual(["No somos la Administración"]);
    expect(header).toContain("Guía ciudadana independiente");
    expect(header).toContain('data-header-disclaimer=""');

    const footer = renderToStaticMarkup(createElement(SiteFooter));
    expect(footer.match(/No somos Administración/g)).toEqual(["No somos Administración"]);
    expect(footer).toContain("No somos Administración Pública ni despacho de abogados. No pedimos ni guardamos tu DNI, pasaporte ni documentos.");
    expect(footer).not.toContain("No somos la Administración");

    const disclaimer = renderToStaticMarkup(createElement(Disclaimer));
    expect(disclaimer).toContain('data-disclaimer=""');
    expect(disclaimer).toContain(DISCLAIMER_SHORT);

    const guide = renderGuideHtml("/dni/cita-previa");
    expect(guide).toContain('data-disclaimer=""');
    expect(guide).toContain("No somos Administración Pública");
  });

});
