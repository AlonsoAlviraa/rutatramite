import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "DNI 2026: cita previa, renovar, tasas 12 € y MiDNI",
  description: "Cita DNI en citapreviadnie.es. Cita gratuita. Tasa 12 €. Pasaporte 30 €. No somos Policía.",
  path: "/dni",
  keywords: [],
});

export default function Page() {
  return <PackIndex pack="viaje" />;
}
