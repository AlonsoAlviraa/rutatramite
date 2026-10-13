import type { Metadata } from "next";
import { PACK_DOCUMENT_HEADINGS, PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: PACK_DOCUMENT_HEADINGS.pasaporte,
  description: "El pasaporte cuesta 30 € en España, salvo exención (gratis con familia numerosa). Cómo pagar, cómo pedir la cita oficial y qué hacer si es urgente.",
  path: "/pasaporte",
});

export default function Page() {
  return <PackIndex pack="viaje" focus="pasaporte" />;
}
