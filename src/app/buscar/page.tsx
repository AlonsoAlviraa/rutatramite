import type { Metadata } from "next";
import { BuscarView } from "@/components/ui/BuscarView";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Buscar trámites y municipios",
  description:
    "Busca guías de trámites y fichas de empadronamiento en RutaTrámite. El trámite se hace en la sede oficial.",
  path: "/buscar",
  index: false,
});

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return <BuscarView query={q.trim()} />;
}
