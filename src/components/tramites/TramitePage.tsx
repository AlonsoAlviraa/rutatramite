import { notFound } from "next/navigation";
import { GuideView } from "@/components/tramites/GuideView";
import { pageMetadata } from "@/lib/seo/meta";
import { LAST_VERIFIED } from "@/lib/tramites/facts";
import { getGuideByPath } from "@/lib/tramites/catalog";
import type { Metadata } from "next";

export function tramiteMetadata(path: string): Metadata {
  const g = getGuideByPath(path);
  if (!g) return { robots: { index: false, follow: true } };
  return pageMetadata({
    title: g.title,
    description: g.description,
    path: g.path,
    type: "article",
    modified: g.reviewedAt ?? LAST_VERIFIED,
    keywords: [],
  });
}

export function TramitePage({ path }: { path: string }) {
  const g = getGuideByPath(path);
  if (!g) notFound();
  return <GuideView guide={g} />;
}
