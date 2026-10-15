import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Abonos y tarjetas de transporte",
  description:
    "T-16 de Barcelona, Abono Joven de Madrid y títulos equivalentes. Consulta edad, zona y solicitud en el operador oficial.",
  path: "/transporte",
});

export default function Page() {
  return <PackIndex pack="transporte" />;
}
