import { EscenarioView } from "@/components/empadronamiento/EscenarioView";
import { loadEscenarioMarkdown } from "@/lib/data/load";
import { escenarioReview } from "@/lib/data/escenarios-editorial";
import { pageMetadata } from "@/lib/seo/meta";
import { ESCENARIO_LABELS, type EscenarioSlug } from "@/lib/types";
import type { Metadata } from "next";

export function escenarioMetadata(slug: EscenarioSlug): Metadata {
  const label = ESCENARIO_LABELS[slug];
  const review = escenarioReview(slug);
  return pageMetadata({
    title: review?.title ?? `${label}: guía para empadronarse 2026`,
    description: review?.description ?? `${label} en España: documentos, pasos y sede del ayuntamiento. Alta gratuita. RutaTrámite no es Administración.`,
    path: `/empadronarse/${slug}`,
    type: "article",
    modified: review?.reviewedAt ?? "2026-09-03",
  });
}

export function EscenarioPage({ slug }: { slug: EscenarioSlug }) {
  const markdown = loadEscenarioMarkdown(slug);
  return <EscenarioView slug={slug} markdown={markdown} />;
}
