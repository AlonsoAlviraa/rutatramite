import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Colegio: matrícula y cambio de centro en 2026",
  description: "Cambiar de colegio fuera de plazo o por mudanza, documentos de matrícula y autorizaciones. Guías operativas por comunidad, sin gestores.",
  path: "/colegio",
});

export default function Page() {
  return <PackIndex pack="colegio" />;
}
