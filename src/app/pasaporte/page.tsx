import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Pasaporte 2026: cita, urgente, tasa 30 €",
  description: "El pasaporte cuesta 30 € en España, salvo exención. Consulta cómo pagar, cuándo es gratuito por familia numerosa y cómo pedir la cita oficial.",
  path: "/pasaporte",
});

export default function Page() {
  return <PackIndex pack="viaje" focus="pasaporte" />;
}
