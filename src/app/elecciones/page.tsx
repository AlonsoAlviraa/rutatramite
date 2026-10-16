import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata = pageMetadata({
  title: "Elecciones 29-N: consulta el censo hasta el 19 de octubre",
  description:
    "Últimos días: consulta y reclamaciones del censo electoral del 12 al 19 de octubre (JEC). Luego voto por correo hasta el 19/25 de noviembre.",
  path: "/elecciones",
});

export default function Page() {
  return <PackIndex pack="elecciones" />;
}
