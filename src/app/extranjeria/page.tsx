import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Extranjería septiembre–octubre 2026",
  description: "Regularización Correos, Mercurio, TIE, NIE, arraigo RD 1155/2024. Solo sedes oficiales.",
  path: "/extranjeria",
});

export default function Page() {
  return <PackIndex pack="extranjeria" />;
}
