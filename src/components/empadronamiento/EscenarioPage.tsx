import { EscenarioView } from "@/components/empadronamiento/EscenarioView";
import { loadEscenarioMarkdown } from "@/lib/data/load";
import { pageMetadata } from "@/lib/seo/meta";
import { ESCENARIO_LABELS, type EscenarioSlug } from "@/lib/types";
import type { Metadata } from "next";

export function escenarioMetadata(slug: EscenarioSlug): Metadata {
  const label = ESCENARIO_LABELS[slug];
  return pageMetadata({
    title: `${label}: guía para empadronarse 2026`,
    description: `${label} en España: documentos, pasos y sede del ayuntamiento. Alta gratuita. RutaTrámite no es Administración.`,
    path: `/empadronarse/${slug}`,
    type: "article",
    modified: "2026-09-03",
  });
}

export function EscenarioPage({ slug }: { slug: EscenarioSlug }) {
  const markdown = loadEscenarioMarkdown(slug);
  return <EscenarioView slug={slug} markdown={markdown} />;
}
