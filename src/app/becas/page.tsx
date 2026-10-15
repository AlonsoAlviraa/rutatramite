import type { Metadata } from "next";
import { PACK_DOCUMENT_HEADINGS, PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: PACK_DOCUMENT_HEADINGS.becas,
  description: "Beca MEC 2026-27: consulta el estado y la resolución, plazos, cobro, denegadas y devolución. También colaboración y autonómicas. Sedes oficiales.",
  path: "/becas",
});

export default function Page() {
  return <PackIndex pack="becas" />;
}
