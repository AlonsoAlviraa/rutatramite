"use client";
import { useState } from "react";
import { type Aid } from "@/lib/ayudas";
import { AID_TERRITORIES, filterAids, aidTerritory } from "@/lib/aid-coverage";
export function AidFilters({ rows, statuses, now, category }: { rows: Aid[]; statuses: Record<string,string>; now: string; category?: "becas" | "alquiler" }) {
  const [territory, setTerritory] = useState("");
  const [chosenCategory, setCategory] = useState(category ?? "");
  const [phase, setPhase] = useState("");
  const visible = filterAids(rows, { territory, category: chosenCategory, phase }, new Date(now));
  return <><div className="mt-5 grid gap-4 sm:grid-cols-3">
    <label className="space-y-2">Comunidad autónoma<select className="block w-full rounded border p-3" value={territory} onChange={e=>setTerritory(e.target.value)}><option value="">Todos los territorios</option>{AID_TERRITORIES.map(t=><option key={t.slug} value={t.slug}>{t.name}</option>)}</select></label>
    {!category && <label className="space-y-2">Categoría<select className="block w-full rounded border p-3" value={chosenCategory} onChange={e=>setCategory(e.target.value as typeof chosenCategory)}><option value="">Todas</option><option value="becas">Becas</option><option value="alquiler">Alquiler</option></select></label>}
    <label className="space-y-2">Fase<select className="block w-full rounded border p-3" value={phase} onChange={e=>setPhase(e.target.value)}><option value="">Todas las fases</option><option value="solicitud">Solicitud</option><option value="modificacion">Modificación</option><option value="cerrada">Cerrada</option><option value="normativa">Normativa</option></select></label>
  </div><p className="mt-4" role="status">{visible.length} registros de esta selección.</p>
  {territory && <p className="mt-3 text-sm">Se incluyen referencias estatales para contrastar su ámbito. Elegir una comunidad no confirma que cumplas los requisitos. <a className="underline" href="/recursos#cobertura-territorial">Consultar la cobertura territorial revisada</a>.</p>}
  {visible.length===0 && <p className="mt-4">No hay registros que coincidan con estos filtros. Puede haber otras ayudas fuera de esta selección. Cambia los filtros o consulta el organismo de tu comunidad.</p>}
  <ul className="mt-5 divide-y divide-sand">{visible.map(a=><li key={a.id} className="py-5" data-aid={a.id}><p className="text-sm font-semibold text-mossDark">{statuses[a.id]}</p><h3 className="mt-2 text-xl font-semibold"><a className="underline underline-offset-4" href={a.path}>{a.name}</a></h3><p className="mt-2 text-sm text-ink/75">{a.territory}{territory && aidTerritory(a)==="estatal" ? " · Referencia estatal: comprobar ámbito" : ""}</p><p className="mt-2">{a.summary}</p><p className="mt-2 font-medium">{a.deadline}</p><p className="mt-3 text-sm"><a className="underline" href={a.source.href}>{a.source.label}</a> · Comprobado el <time dateTime={a.checkedAt}>{a.checkedAt}</time></p></li>)}</ul></>;
}
