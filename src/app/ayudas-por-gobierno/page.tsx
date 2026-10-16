import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata = pageMetadata({
  title: "Ayudas del Estado según cada gobierno desde 1996 (con el BOE)",
  description:
    "Qué ayudas estatales creó y recortó cada gobierno desde 1996 para estudiantes, familias, jóvenes, jubilados, autónomos, parados y dependencia. Con el BOE.",
  path: "/ayudas-por-gobierno",
});

export default function Page() {
  return <PackIndex pack="ayudas-gobierno" />;
}
