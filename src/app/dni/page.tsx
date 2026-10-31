import type { Metadata } from "next";
import { PACK_DOCUMENT_HEADINGS, PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: PACK_DOCUMENT_HEADINGS.viaje,
  description: "Tasa del DNI y del pasaporte 2026: renovar el DNI cuesta 12 € y el pasaporte 30 € (42 € juntos). Gratis con familia numerosa. Documentos y cita previa gratuita.",
  path: "/dni",
  keywords: [],
});

export default function Page() {
  return <PackIndex pack="viaje" />;
}
