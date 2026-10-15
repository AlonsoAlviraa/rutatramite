import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";
import { guidesIn } from "@/lib/tramites/catalog";
export const dynamicParams = false;
export function generateStaticParams() { return guidesIn("/alquiler").map(g => ({ slug: g.path.slice("/alquiler/".length) })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return tramiteMetadata(`/alquiler/${(await params).slug}`); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <TramitePage path={`/alquiler/${(await params).slug}`} />; }
