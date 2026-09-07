import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Becas 2026-27: MEC, autonómicas y municipales",
  description: "Beca MEC (plazos, estado, cobro, denegadas y devolución), becas de colaboración y autonómicas. Cero gestores, sedes oficiales.",
  path: "/becas",
});

export default function Page() {
  return <PackIndex pack="becas" />;
}
