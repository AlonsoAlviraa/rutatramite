import { HubView } from "@/components/empadronamiento/HubView";
import { loadIndex } from "@/lib/data/load";
import { ccaaBySlug, loadTerritories } from "@/lib/geo/territories";
import { buildProvinciaHub, HUB_REVIEWED_AT } from "@/lib/hub/buildHub";
import { pageMetadata } from "@/lib/seo/meta";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  const t = loadTerritories();
  const out: { ccaa: string; provincia: string }[] = [];
  for (const c of t.ccaa) {
    for (const code of c.province_codes) {
      const p = t.provinces[code];
      if (p) out.push({ ccaa: c.slug, provincia: p.slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ccaa: string; provincia: string }>;
}): Promise<Metadata> {
  const { ccaa, provincia } = await params;
  const t = loadTerritories();
  const c = ccaaBySlug(ccaa);
  const p = Object.values(t.provinces).find((x) => x.slug === provincia);
  if (!c || !p || !c.province_codes.includes(p.code)) return {};
  const model = buildProvinciaHub(p.name, c.name, loadIndex().filter(m => m.ccaa_slug === c.slug && m.province_slug === p.slug));
  return pageMetadata({
    title: model.title,
    description: model.description,
    path: `/empadronarse/${c.slug}/${p.slug}`,
    type: "article",
    modified: HUB_REVIEWED_AT,
  });
}

export default async function ProvinciaPage({
  params,
}: {
  params: Promise<{ ccaa: string; provincia: string }>;
}) {
  const { ccaa, provincia } = await params;
  const t = loadTerritories();
  const c = ccaaBySlug(ccaa);
  const p = Object.values(t.provinces).find((x) => x.slug === provincia);
  if (!c || !p || !c.province_codes.includes(p.code)) notFound();
  const index = loadIndex();
  const municipios = index.filter((m) => m.ccaa_slug === c.slug && m.province_slug === p.slug);
  const model = buildProvinciaHub(p.name, c.name, municipios);
  return <HubView model={model} ccaaSlug={c.slug} provinceSlug={p.slug} />;
}
