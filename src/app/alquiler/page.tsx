import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const revalidate = 3600;
export const metadata = pageMetadata({ title: "Ayudas al alquiler 2026: Bono Joven 250 € y plazos", description: "¿Qué ayuda al alquiler puedes pedir en 2026? Bono Alquiler Joven (250 €/mes), Plan de Vivienda 2026-2030 y plazos comprobados por comunidad.", path: "/alquiler" });
export default function Page() { return <PackIndex pack="alquiler" />; }
