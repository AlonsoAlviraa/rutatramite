import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "FP: matricularse en septiembre, vacantes y convalidaciones",
  description: "Matrícula de FP fuera del plazo ordinario: extraordinario de septiembre, plazas vacantes, reservas y convalidaciones.",
  path: "/fp",
});

export default function Page() {
  return <PackIndex pack="fp" />;
}
