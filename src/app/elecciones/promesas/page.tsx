import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata = pageMetadata({
  title: "Promesas electorales del 29-N: qué propone cada partido",
  description:
    "Qué proponen PP, PSOE, Vox, Frente Amplio y Podemos para el 29-N, por tema, comunidad y perfil, con la cita y la fuente de cada medida. Neutral, sin valorar.",
  path: "/elecciones/promesas",
});

export default function Page() {
  return <PackIndex pack="promesas-29n" />;
}
