import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";
import { guidesIn } from "@/lib/tramites/catalog";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return guidesIn("/becas")
    .filter((g) => g.path !== "/becas")
    .map((g) => ({ slug: g.path.slice("/becas/".length).split("/") }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  return params.then(({ slug }) => tramiteMetadata(`/becas/${slug.join("/")}`));
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <TramitePage path={`/becas/${slug.join("/")}`} />;
}
