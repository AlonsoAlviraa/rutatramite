import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";
import { guidesIn } from "@/lib/tramites/catalog";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return guidesIn("/bebe").map((g) => ({
    slug: g.path.slice("/bebe/".length),
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => tramiteMetadata(`/bebe/${slug}`));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TramitePage path={`/bebe/${slug}`} />;
}
