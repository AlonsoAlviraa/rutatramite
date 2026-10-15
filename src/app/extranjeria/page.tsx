import type { Metadata } from "next";
import { PACK_DOCUMENT_HEADINGS, PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: PACK_DOCUMENT_HEADINGS.extranjeria,
  description: "Guías de TIE, NIE, arraigo, regreso y regularización. Distingue cita, presentación y consulta del expediente, con fuentes y enlaces oficiales.",
  path: "/extranjeria",
});

export default function Page() {
  return <PackIndex pack="extranjeria" />;
}
