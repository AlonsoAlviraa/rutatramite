import { loadIndex } from "@/lib/data/load";
import { allCcaaHubs, loadTerritories } from "@/lib/geo/territories";
import { ALL_GUIDES } from "@/lib/tramites/catalog";
import { PACK_INDEX_PATH, type GuidePack } from "@/lib/tramites/types";
import { ESCENARIO_LABELS, ESCENARIO_SLUGS } from "@/lib/types";

export type SearchHit = { title: string; href: string; category: string };

const PACK_LABEL: Record<GuidePack, string> = {
  viaje: "DNI y pasaporte",
  mudanza: "Mudanza",
  extranjeria: "Extranjería",
  colegio: "Colegio",
  comedor: "Comedor",
  transporte: "Transporte",
  fp: "Formación Profesional",
  bebe: "Bebé",
  becas: "Becas",
  alquiler: "Ayudas al alquiler",
  elecciones: "Elecciones 29 de noviembre de 2026",
  "ayudas-gobierno": "Ayudas según cada gobierno",
  "promesas-29n": "Promesas del 29-N",
  modelos: "Modelos y cartas",
  trabajo: "Trabajo y prestaciones",
};

export function normalizeSearch(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function packHubEntries(): SearchHit[] {
  return (Object.keys(PACK_INDEX_PATH) as GuidePack[]).map((pack) => ({
    title: PACK_LABEL[pack],
    href: PACK_INDEX_PATH[pack],
    category: "Categoría",
  }));
}

export function guideSearchEntries(): SearchHit[] {
  return ALL_GUIDES.map((g) => ({
    title: g.h1,
    href: g.path,
    category: PACK_LABEL[g.pack],
  }));
}

export function escenarioSearchEntries(): SearchHit[] {
  return ESCENARIO_SLUGS.map((slug) => ({
    title: ESCENARIO_LABELS[slug],
    href: `/empadronarse/${slug}`,
    category: "Padrón: situación",
  }));
}

export function municipioSearchEntries(): SearchHit[] {
  return loadIndex().map((m) => ({
    title: `Empadronarse en ${m.name}`,
    href: m.path,
    category: m.province_name,
  }));
}

export function territorySearchEntries(): SearchHit[] {
  const t = loadTerritories();
  const out: SearchHit[] = [];
  for (const c of allCcaaHubs()) {
    out.push({ title: `Empadronarse en ${c.name}`, href: `/empadronarse/${c.slug}`, category: "Comunidad" });
    for (const code of c.province_codes) {
      const p = t.provinces[code];
      if (p) {
        out.push({
          title: `Empadronarse en ${p.name}`,
          href: `/empadronarse/${c.slug}/${p.slug}`,
          category: c.name,
        });
      }
    }
  }
  return out;
}

/** Full catalog for the no-JS /buscar page. Do not serialize this into home client props. */
export function allSearchEntries(): SearchHit[] {
  const seen = new Set<string>();
  const out: SearchHit[] = [];
  for (const hit of [
    { title: "Guías de trámites en España", href: "/", category: "Inicio" },
    { title: "Empadronarse en España", href: "/empadronarse", category: "Padrón" },
    { title: "Ayudas y plazos", href: "/ayudas", category: "Ayudas" },
    ...packHubEntries(),
    ...escenarioSearchEntries(),
    ...guideSearchEntries(),
    ...territorySearchEntries(),
    ...municipioSearchEntries(),
    { title: "Cómo verificamos", href: "/metodologia", category: "Editorial" },
    { title: "Fuentes", href: "/fuentes", category: "Editorial" },
  ]) {
    if (seen.has(hit.href)) continue;
    seen.add(hit.href);
    out.push(hit);
  }
  return out;
}

export function searchSite(query: string, limit = 25): SearchHit[] {
  const words = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return allSearchEntries()
    .filter((hit) => {
      const hay = normalizeSearch(`${hit.title} ${hit.category} ${hit.href}`);
      return words.every((word) => hay.includes(word));
    })
    .slice(0, limit);
}
