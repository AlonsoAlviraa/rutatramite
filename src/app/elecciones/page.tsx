import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata = pageMetadata({
  title: "Elecciones 29-N: voto por correo, mesas, listas y calendario",
  description:
    "Elecciones del 29 de noviembre: voto por correo hasta el 19-N, sorteo de mesas del 31-O al 4-N, candidaturas, campaña y qué propone cada partido.",
  path: "/elecciones",
});

export default function Page() {
  return <PackIndex pack="elecciones" />;
}
