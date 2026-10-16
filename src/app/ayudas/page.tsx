import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { AidCalendar } from "@/components/tramites/AidCalendar";
import { pageMetadata } from "@/lib/seo/meta";

export const revalidate = 3600;
export const metadata = pageMetadata({ title: "Ayudas a estudiantes y alquiler 2026: plazos y convocatorias", description: "Consulta becas y ayudas al alquiler con su convocatoria, territorio, fuente oficial y fecha de revisión. Distingue solicitudes abiertas, modificaciones y cierres.", path: "/ayudas" });

export default function Page() {
  return <PageShell as="article">
    <Breadcrumbs items={[{ name: "Inicio", path: "/" }, { name: "Ayudas y plazos", path: "/ayudas" }]} />
    <h1 className="mt-2 font-display text-4xl text-mossDark">Ayudas a estudiantes y al alquiler en 2026</h1>
    <p className="mt-4 text-lg">Encuentra la convocatoria que corresponde a tus estudios o a la comunidad donde vives. Una ayuda anunciada en redes puede tener el plazo cerrado, pertenecer a otro territorio o estar pendiente de convocatoria.</p>
    <nav aria-label="Guías de ayudas" className="mt-5 flex flex-wrap gap-5"><a className="underline" href="/becas/ayudas-estudiantes">Qué ayudas revisar si estudias</a><a className="underline" href="/alquiler">Ayudas al alquiler</a><a className="underline" href="/becas">Todas las guías de becas</a></nav>
    <AidCalendar />
    <section className="mt-10 border-t border-sand pt-5"><h2 className="font-display text-2xl">Antes de empezar</h2><p className="mt-3">Comprueba quién puede solicitar, qué gastos cubre, las incompatibilidades y la fecha límite. Abre el enlace oficial y guarda el justificante de presentación. RutaTrámite no tramita ayudas ni garantiza la concesión.</p><p className="mt-3"><a className="underline" href="/metodologia">Cómo comprobamos las fuentes</a> · <a className="underline" href="/contacto">Comunicar un cambio</a></p></section>
  </PageShell>;
}
