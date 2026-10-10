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
  | "modelos";

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
  modelos: "/modelos",
};

export type GuideModelBlock = {
  id: string;
  title: string;
  body: string;
};

export type GuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  lists?: string[][];
  models?: GuideModelBlock[];
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
};
