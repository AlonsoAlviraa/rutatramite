export type GuidePack =
  | "viaje"
  | "mudanza"
  | "extranjeria"
  | "colegio"
  | "comedor"
  | "transporte"
  | "fp"
  | "bebe"
  | "becas"
  | "alquiler"
  | "elecciones"
  | "ayudas-gobierno"
  | "promesas-29n"
  | "modelos"
  | "trabajo";

/** Index path of each pack (breadcrumbs and PackIndex). */
export const PACK_INDEX_PATH: Record<GuidePack, string> = {
  viaje: "/dni",
  mudanza: "/mudanza",
  extranjeria: "/extranjeria",
  colegio: "/colegio",
  comedor: "/comedor",
  transporte: "/transporte",
  fp: "/fp",
  bebe: "/bebe",
  becas: "/becas",
  alquiler: "/alquiler",
  elecciones: "/elecciones",
  "ayudas-gobierno": "/ayudas-por-gobierno",
  "promesas-29n": "/elecciones/promesas",
  modelos: "/modelos",
  trabajo: "/trabajo",
};

export type GuideModelBlock = {
  id: string;
  title: string;
  body: string;
};

export type GuideTable = {
  caption: string;
  head: string[];
  rows: { cells: string[]; source: { label: string; href: string } }[];
};

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  lists?: string[][];
  models?: GuideModelBlock[];
  /** Optional data table; the last column links each row to its source. */
  table?: GuideTable;
  /** Optional static inline SVG chart (no JS). Values come from the section table or cited sources. */
  chart?: GuideChart;
};

export type GuideChart = {
  caption: string;
  /** "bars": signed values from 0; "ranges": min–max bar with optional marker. */
  kind: "bars" | "ranges";
  unit: string;
  rows: { label: string; value?: number; min?: number; max?: number; marker?: number; markerLabel?: string; group?: string }[];
  note?: string;
};

export type GuideCta = { href: string; label: string };

export type Guide = {
  reviewedAt?: string;
  sources?: { label: string; href: string }[];
  /** Editorial questions and answers, never inferred from section headings. */
  faqs?: { q: string; a: string }[];
  id: string;
  pack: GuidePack;
  path: string;
  h1: string;
  title: string;
  description: string;
  lead: string;
  cta: GuideCta;
  secondaryCta?: GuideCta;
  sections: GuideSection[];
  related: { href: string; label: string }[];
  /** Optional guide-specific notice; the default is independent of the topic. */
  disclaimer?: string;
  /** Optional schema.org Dataset JSON-LD for original data studies. */
  dataset?: Record<string, unknown>;
};
