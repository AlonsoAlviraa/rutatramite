import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const revalidate = 3600;
export const metadata = pageMetadata({ title: "Ayudas al alquiler 2026: Bono Joven y convocatorias", description: "Ayudas al alquiler por comunidad, Bono Alquiler Joven y Plan de Vivienda 2026-2030. Requisitos, plazos comprobados y enlaces a las sedes oficiales.", path: "/alquiler" });
export default function Page() { return <PackIndex pack="alquiler" />; }
