import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "DNI 2026: cita previa, renovar, tasas 12 € y MiDNI",
  description: "Renovar el DNI cuesta 12 €, salvo exención. Consulta los casos gratuitos, cómo pagar y qué documentos preparar antes de pedir cita en el portal oficial.",
  path: "/dni",
  keywords: [],
});

export default function Page() {
  return <PackIndex pack="viaje" />;
}
