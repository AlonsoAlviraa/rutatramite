import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { ADSENSE_CLIENT, CONTACT_EMAIL } from "@/lib/types";

describe("Trust & AdSense compliance requirements", () => {
  it("public/ads.txt exists with exact Google publisher ID and syntax", () => {
    const adsTxtPath = path.resolve(__dirname, "../public/ads.txt");
    expect(fs.existsSync(adsTxtPath)).toBe(true);
    const content = fs.readFileSync(adsTxtPath, "utf-8").trim();
    expect(content).toBe("google.com, pub-5984256473146677, DIRECT, f08c47fec0942fa0");
  });

  it("public/sitemap.xml includes /quienes-somos and /cookies", () => {
    const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");
    expect(fs.existsSync(sitemapPath)).toBe(true);
    const sitemap = fs.readFileSync(sitemapPath, "utf-8");
    expect(sitemap).toContain("<loc>https://rutatramite.com/quienes-somos</loc>");
    expect(sitemap).toContain("<loc>https://rutatramite.com/cookies</loc>");
  });

  it("ADSENSE_CLIENT and CONTACT_EMAIL constants are valid", () => {
    expect(ADSENSE_CLIENT).toBe("ca-pub-5984256473146677");
    expect(CONTACT_EMAIL).toBe("hola@rutatramite.com");
  });

  it("public/llms.txt includes links to Quiénes somos and Política de cookies", () => {
    const llmsPath = path.resolve(__dirname, "../public/llms.txt");
    expect(fs.existsSync(llmsPath)).toBe(true);
    const llms = fs.readFileSync(llmsPath, "utf-8");
    expect(llms).toContain("https://rutatramite.com/quienes-somos");
    expect(llms).toContain("https://rutatramite.com/cookies");
  });
});
