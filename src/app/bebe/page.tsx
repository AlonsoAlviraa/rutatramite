import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Bebé: registro civil, tarjeta sanitaria y cartilla",
  description: "Los trámites del recién nacido en orden: Registro Civil, Seguridad Social, tarjeta sanitaria, padrón y cartilla de vacunación (solo administrativo).",
  path: "/bebe",
});

export default function Page() {
  return <PackIndex pack="bebe" />;
}
