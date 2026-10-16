import { HubView } from "@/components/empadronamiento/HubView";
import { loadIndex } from "@/lib/data/load";
import { allCcaaHubs, ccaaBySlug, loadTerritories } from "@/lib/geo/territories";
import { buildCcaaHub, HUB_REVIEWED_AT } from "@/lib/hub/buildHub";
import { pageMetadata } from "@/lib/seo/meta";
import { ESCENARIO_SLUGS } from "@/lib/types";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allCcaaHubs()
    .filter((c) => !(ESCENARIO_SLUGS as readonly string[]).includes(c.slug))
    .map((c) => ({ ccaa: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ ccaa: string }> }): Promise<Metadata> {
  const { ccaa } = await params;
  const c = ccaaBySlug(ccaa);
  if (!c) return {};
  const model = buildCcaaHub(c.name, c.slug, loadIndex().filter(m => m.ccaa_slug === c.slug), c.province_codes.map(code => loadTerritories().provinces[code]?.name).filter(Boolean));
  return pageMetadata({
    title: model.title,
    description: model.description,
    path: `/empadronarse/${c.slug}`,
    type: "article",
    modified: HUB_REVIEWED_AT,
  });
}

export default async function CcaaPage({ params }: { params: Promise<{ ccaa: string }> }) {
  const { ccaa } = await params;
  const c = ccaaBySlug(ccaa);
  if (!c) notFound();
  const index = loadIndex();
  const municipios = index.filter((m) => m.ccaa_slug === c.slug);
  const t = loadTerritories();
  const provinceNames = c.province_codes.map((code) => t.provinces[code]?.name).filter(Boolean);
  const model = buildCcaaHub(c.name, c.slug, municipios, provinceNames);
  return <HubView model={model} ccaaSlug={c.slug} />;
}
