import fs from "node:fs";
import path from "node:path";

export type Ccaa = {
  name: string;
  slug: string;
  province_codes: string[];
  autonomous_city?: boolean;
};

export type Province = { code: string; name: string; slug: string };

export type Territories = {
  ccaa: Ccaa[];
  provinces: Record<string, Province>;
};

let cache: Territories | null = null;

export function loadTerritories(): Territories {
  if (cache) return cache;
  const p = path.join(process.cwd(), "data", "geo", "territories.json");
  cache = JSON.parse(fs.readFileSync(p, "utf8")) as Territories;
  return cache;
}

export function ccaaBySlug(slug: string): Ccaa | undefined {
  return loadTerritories().ccaa.find((c) => c.slug === slug);
}

export function provinceBySlug(slug: string): (Province & { ccaa: Ccaa }) | undefined {
  const t = loadTerritories();
  for (const [code, p] of Object.entries(t.provinces)) {
    if (p.slug === slug) {
      const ccaa = t.ccaa.find((c) => c.province_codes.includes(code));
      if (ccaa) return { ...p, ccaa };
    }
  }
  return undefined;
}

export function seventeenCcaa(): Ccaa[] {
  return loadTerritories().ccaa.filter((c) => !c.autonomous_city);
}

export function allCcaaHubs(): Ccaa[] {
  return loadTerritories().ccaa;
}
