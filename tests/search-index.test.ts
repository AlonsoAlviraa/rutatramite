import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { searchSite } from "@/lib/seo/siteSearch";
import { SITE_ORIGIN } from "@/lib/types";

const KEY = "b7e4c91a0f3d28e65a1c47b90d2e8f36";

describe("search engine + GEO discovery files (shipped public/)", () => {
  it("IndexNow key is hosted at the site root as a plain text file", () => {
    const root = process.cwd();
    const keyFile = fs.readFileSync(path.join(root, "public", `${KEY}.txt`), "utf8").trim();
    const alias = fs.readFileSync(path.join(root, "public", "indexnow.txt"), "utf8").trim();
    expect(keyFile).toBe(KEY);
    expect(alias).toBe(KEY);
    expect(KEY.length).toBeGreaterThanOrEqual(8);
    expect(KEY.length).toBeLessThanOrEqual(128);
    expect(KEY).toMatch(/^[a-f0-9]+$/i);
  });

  it("robots allows Google/Bing/AI crawlers and points sitemap at SITE_ORIGIN", () => {
    const r = robots();
    expect(r.sitemap).toBe(`${SITE_ORIGIN}/sitemap.xml`);
    expect(r.host).toBe(SITE_ORIGIN.replace(/^https?:\/\//, ""));
    const rules = r.rules as { userAgent: string; allow?: string; disallow?: string[] }[];
    for (const agent of ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "UnknownBot"]) {
      // Specific groups override '*'; each effective group must retain exclusions.
      const effective = rules.find((rule) => rule.userAgent === agent) ?? rules.find((rule) => rule.userAgent === "*");
      expect(effective?.allow).toBe("/");
      expect(effective?.disallow).toContain("/api/");
      expect(effective?.disallow).toContain("/borrador/");
    }
  });

  it("llms.txt is UTF-8 Spanish GEO with canonical host and geo URL pattern", () => {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "llms.txt"));
    const txt = buf.toString("utf8");
    expect(txt).toContain("RutaTrámite");
    expect(txt).not.toContain("RutaTrÃ¡mite");
    expect(txt).toContain("https://rutatramite.com");
    expect(txt).toContain("/empadronarse/{ccaa}/{provincia}/{municipio}");
    expect(txt).toContain("/dni/{guia}");
    expect(txt).toContain("/extranjeria/{guia}");
    expect(txt).toContain("citapreviadnie.es");
    expect(txt).toContain("No somos Administración");
    expect(txt).not.toContain("localhost");
  });

  it("audit_build counts App Router /page routes so dynamic /buscar is not a missing target", () => {
    const src = fs.readFileSync(path.join(process.cwd(), "scripts", "audit_build.py"), "utf8");
    expect(src).toContain("app-paths-manifest.json");
    expect(src).toContain("routes-manifest.json");
    expect(src).toContain("endswith('/page')");
    expect(src).toContain("removesuffix('/page')");
  });

  it("site search finds transport and DNI hubs without requiring JavaScript catalog", () => {
    const t16 = searchSite("t16 barcelona", 10);
    expect(t16.some((hit) => hit.href === "/transporte/t16-como-solicitar")).toBe(true);
    const dni = searchSite("cita dni", 10);
    expect(dni.some((hit) => hit.href === "/dni" || hit.href.startsWith("/dni/"))).toBe(true);
  });
});
