import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata = pageMetadata({
  title: "Elecciones del 29 de noviembre de 2026: voto por correo y plazos",
  description:
    "Voto por correo: solicitud hasta el 19 de noviembre y envío hasta el 25 (calendario de la Junta Electoral Central). Censo: reclamaciones del 12 al 19 de octubre.",
  path: "/elecciones",
});

export default function Page() {
  return <PackIndex pack="elecciones" />;
}
