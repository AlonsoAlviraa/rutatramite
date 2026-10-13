import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";
import { MODELO_PATHS } from "@/lib/tramites/modelos";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return MODELO_PATHS.map((p) => ({ slug: p.slice(1) }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => tramiteMetadata(`/${slug}`));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TramitePage path={`/${slug}`} />;
}
