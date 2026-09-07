import type { Metadata } from "next";
import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata: Metadata = pageMetadata({
  title: "Modelos y cartas para copiar: baja, padrón, alquiler y colegio",
  description:
    "Cartas de baja voluntaria, finiquito, padrón, alquiler y colegio. Textos para copiar. RutaTrámite no es Administración ni despacho.",
  path: "/modelos",
});

export default function Page() {
  return <PackIndex pack="modelos" />;
}
