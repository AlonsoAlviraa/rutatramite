import { ALL_GUIDES } from "@/lib/tramites/catalog";
import type { Guide } from "@/lib/tramites/types";

/** Newest/updated guides by reviewedAt (desc), stable by catalog order. Used by home block and /feed.xml. */
export function latestGuides(n: number): (Guide & { reviewedAt: string })[] {
  return ALL_GUIDES.map((g, i) => ({ g, i }))
    .filter((x): x is { g: Guide & { reviewedAt: string }; i: number } => typeof x.g.reviewedAt === "string")
    .sort((a, b) => (a.g.reviewedAt < b.g.reviewedAt ? 1 : a.g.reviewedAt > b.g.reviewedAt ? -1 : a.i - b.i))
    .slice(0, n)
    .map((x) => x.g);
}
