import { PackIndex } from "@/components/tramites/PackIndex";
import { pageMetadata } from "@/lib/seo/meta";

export const metadata = pageMetadata({
  title: "Trabajo, paro y prestaciones: vida laboral, SEPE e IMV",
  description: "Guías gratis y con fuentes oficiales: descargar la vida laboral, pedir cita en el SEPE o el paro por internet y el ingreso mínimo vital 2026.",
  path: "/trabajo",
});

export default function Page() {
  return <PackIndex pack="trabajo" />;
}
