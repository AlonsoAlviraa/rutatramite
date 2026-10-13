import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Comedor escolar y beca comedor 2026-27",
  description: "Ayudas de comedor, dificultades de pago, menús especiales y acceso al servicio. Consulta requisitos y procedimientos con fuentes oficiales.",
  path: "/comedor",
});

export default function Page() {
  return <PackIndex pack="comedor" />;
}
