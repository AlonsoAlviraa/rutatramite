import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "FP: admisión, vacantes y convalidaciones",
  description: "Admisión en FP, vacantes, reservas y convalidaciones. El calendario lo marca la convocatoria de cada comunidad.",
  path: "/fp",
});

export default function Page() {
  return <PackIndex pack="fp" />;
}
