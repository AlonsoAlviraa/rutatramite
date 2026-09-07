import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Pasaporte 2026: cita, urgente, tasa 30 €",
  description: "Cita de pasaporte en citapreviadnie.es. Cita gratuita. Tasa 30 €. DNI 12 €.",
  path: "/pasaporte",
});

export default function Page() {
  return <PackIndex pack="viaje" focus="pasaporte" />;
}
