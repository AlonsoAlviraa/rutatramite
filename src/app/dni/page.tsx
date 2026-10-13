import type { Metadata } from "next";
import { PACK_DOCUMENT_HEADINGS, PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: PACK_DOCUMENT_HEADINGS.viaje,
  description: "Renovar el DNI cuesta 12 € y el pasaporte 30 €, salvo exención. Casos gratuitos, cómo pagar y qué documentos preparar antes de pedir la cita oficial, que es gratuita.",
  path: "/dni",
  keywords: [],
});

export default function Page() {
  return <PackIndex pack="viaje" />;
}
