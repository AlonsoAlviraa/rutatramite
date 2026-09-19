import { AIDS, aidStatus } from "@/lib/ayudas";
import { AidFilters } from "@/components/tramites/AidFilters";

export function AidCalendar({ category }: { category?: "becas" | "alquiler" }) {
  const now = new Date();
  return <section className="mt-10" aria-labelledby="calendario-ayudas">
    <h2 id="calendario-ayudas" className="font-display text-2xl text-mossDark">Convocatorias y plazos comprobados</h2>
    <p className="mt-3 text-sm">Selección de ayudas, no un listado exhaustivo. Cada entrada distingue solicitud, modificación y cierre. Consulta la fuente por si hay prórrogas o cambios.</p>
    <AidFilters rows={AIDS} statuses={Object.fromEntries(AIDS.map(a=>[a.id,aidStatus(a,now)]))} now={now.toISOString()} category={category} />
  </section>;
}
