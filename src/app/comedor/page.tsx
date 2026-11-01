import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Beca comedor 2026/2027: plazos y convocatorias",
  description: "¿Cuándo pedir la beca de comedor 2026/2027? Plazos y convocatorias por territorio, con enlace a la guía de CyL/Madrid/Barcelona.",
  path: "/comedor",
});

export default function Page() {
  return <PackIndex pack="comedor" />;
}
