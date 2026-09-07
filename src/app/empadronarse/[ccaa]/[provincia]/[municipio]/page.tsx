import { FichaView } from "@/components/empadronamiento/FichaView";
import { findByPath, loadIndex, loadMunicipio } from "@/lib/data/load";
import { buildFichaModel } from "@/lib/ficha/buildFicha";
import { fichaPageMetadata } from "@/lib/seo/meta";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return loadIndex().map((m) => ({
    ccaa: m.ccaa_slug,
    provincia: m.province_slug,
    municipio: m.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ccaa: string; provincia: string; municipio: string }>;
}): Promise<Metadata> {
  const { ccaa, provincia, municipio } = await params;
  const m = findByPath(ccaa, provincia, municipio);
  if (!m) return { robots: { index: false, follow: true } };
  return fichaPageMetadata(m);
}

export default async function MunicipioPage({
  params,
}: {
  params: Promise<{ ccaa: string; provincia: string; municipio: string }>;
}) {
  const { ccaa, provincia, municipio } = await params;
  const m = findByPath(ccaa, provincia, municipio);
  if (!m) notFound();
  const index = loadIndex();
  const full = loadMunicipio(m.ine_code);
  const model = buildFichaModel(full, index);
  return <FichaView model={model} />;
}
