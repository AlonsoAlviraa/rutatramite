import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Comedor escolar y beca comedor 2026-27",
  description: "Beca de comedor fuera de plazo, impago, alergias (qué papel pide el centro) e IES sin comedor. Con sedes oficiales.",
  path: "/comedor",
});

export default function Page() {
  return <PackIndex pack="comedor" />;
}
