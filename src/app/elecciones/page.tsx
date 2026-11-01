import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata = pageMetadata({
  title: "Elecciones 29-N: Pedro Sánchez irá a The Wild Project y más",
  description:
    "Pedro Sánchez irá a The Wild Project de Jordi Wild: qué es, cuándo sale y cómo verlo. Y el 29-N: voto por correo, mesas, campaña y qué propone cada partido.",
  path: "/elecciones",
});

export default function Page() {
  return <PackIndex pack="elecciones" />;
}
