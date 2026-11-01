"use client";
import { useEffect, useMemo, useState } from "react";
import { MAPA_PROV, MAPA_MEDIA, POLLS_DATE, pollsAllowed, type Esc, type MapaProv } from "@/lib/datos/mapa-voto-util";

type View = "peso" | "margen" | "bloques" | "ultimo";
type Bloc = "der" | "izq" | "otr";
const fmt = (n: number) => n.toLocaleString("es-ES");
const pct = (n: number) => n.toLocaleString("es-ES", { maximumFractionDigits: 2 }) + " %";
const PARTY_COLORS: Record<string, string> = {
  PP: "#1d6fb8", PSOE: "#d7282f", PSC: "#d7282f", Vox: "#5ab031", Sumar: "#d6347f", ERC: "#f2b320", Junts: "#1fb5a8",
  "EH Bildu": "#0b7a5a", "EAJ-PNV": "#2f8a3a", BNG: "#7fc4e8", CCa: "#f0d33c", UPN: "#3a4f8f",
};
const BLOC_LABEL: Record<Bloc, string> = { der: "Bloque derecha", izq: "Bloque izquierda", otr: "Otros" };
const VIEWS: { id: View; label: string }[] = [
  { id: "peso", label: "Peso del voto" },
  { id: "margen", label: "Margen del último escaño" },
  { id: "bloques", label: "Votos sin escaño por bloque" },
  { id: "ultimo", label: "Quién ganó el último escaño" },
];
function seq(t: number, hue: number) {
  const x = Math.max(0, Math.min(1, t));
  return `hsl(${hue} ${35 + x * 45}% ${92 - x * 58}%)`;
}
function seatsTxt(e: Esc) {
  return Object.entries(e.seats).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(" · ");
}

export function MapaVotoUtil({ y26 }: { y26: Record<string, Esc> | null }) {
  const [scen, setScen] = useState<"2023" | "2026">("2023");
  const [view, setView] = useState<View>("margen");
  const [bloc, setBloc] = useState<Bloc>("der");
  const [changes, setChanges] = useState(false);
  const [sel, setSel] = useState<string>("Madrid");
  const [allowed, setAllowed] = useState(y26 !== null);
  useEffect(() => { if (!pollsAllowed()) { setAllowed(false); setScen("2023"); } }, []);
  const has26 = allowed && y26 !== null;
  const esc = (p: MapaProv): Esc => (scen === "2026" && has26 ? y26![p.c] : p.y23);
  const seats = (p: MapaProv) => (scen === "2026" ? p.d26 : p.d23);
  const ranked = useMemo(() => MAPA_PROV.filter((p) => esc(p).shortBy != null).sort((a, b) => (esc(a).marginPct ?? 99) - (esc(b).marginPct ?? 99)), [scen, has26]); // eslint-disable-line react-hooks/exhaustive-deps
  const top5 = new Set(ranked.slice(0, 5).map((p) => p.c));
  const habMax = Math.max(...MAPA_PROV.map((p) => p.habDip)), habMin = Math.min(...MAPA_PROV.map((p) => p.habDip));
  function fill(p: MapaProv) {
    const e = esc(p);
    if (view === "peso") return seq((habMax - p.habDip) / (habMax - habMin), 200);
    if (view === "margen") return e.marginPct == null ? "#eee" : seq(1 - Math.min(e.marginPct, 3) / 3, 15);
    if (view === "bloques") return seq((e.sinEscano[bloc] / p.valid) / 0.25, bloc === "der" ? 215 : bloc === "izq" ? 350 : 45);
    return PARTY_COLORS[e.last] ?? "#9a9a9a";
  }
  const changed = (p: MapaProv) => has26 && y26![p.c].last !== p.y23.last;
  const cur = MAPA_PROV.find((p) => p.c === sel) ?? MAPA_PROV[0];
  const ce = esc(cur);
  const btn = (on: boolean) => `min-h-[44px] rounded-full border px-3 py-1 text-sm ${on ? "border-mossDark bg-mossDark text-white" : "border-sand bg-white text-ink"}`;
  const lastParties = Array.from(new Set(MAPA_PROV.map((p) => esc(p).last)));

  return (
    <section aria-labelledby="mapa-title" className="mt-8 rounded-xl border border-sand bg-white p-3 sm:p-5" data-mapa-voto-util="">
      <h2 id="mapa-title" className="font-display text-2xl text-mossDark">Mapa interactivo por provincia</h2>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Escenario">
        <button type="button" aria-pressed={scen === "2023"} className={btn(scen === "2023")} onClick={() => setScen("2023")}>2023 (resultados oficiales)</button>
        {has26 ? <button type="button" aria-pressed={scen === "2026"} className={btn(scen === "2026")} onClick={() => setScen("2026")}>2026 (media de encuestas)</button> : null}
      </div>
      <p className="mt-2 min-h-[3rem] text-sm text-ink/80" aria-live="polite">
        {scen === "2026"
          ? `Estimación a partir de encuestas, no es un resultado ni una predicción. Datos de encuestas a fecha ${POLLS_DATE}: media simple de 10 encuestas (PP ${pct(MAPA_MEDIA.PP)}, PSOE ${pct(MAPA_MEDIA.PSOE)}, Vox ${pct(MAPA_MEDIA.Vox)}), trasladada a cada provincia con un cambio uniforme y con los diputados de 2026.`
          : has26 ? "Resultados oficiales del 23-J de 2023 (BOE-A-2023-18907) con los diputados que tenía cada provincia en 2023." : "Resultados oficiales del 23-J de 2023 (BOE-A-2023-18907). El escenario de encuestas no se muestra desde el 24 de noviembre (artículo 69 de la LOREG)."}
      </p>
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Qué mostrar en el mapa">
        {VIEWS.map((v) => <button key={v.id} type="button" aria-pressed={view === v.id} className={btn(view === v.id)} onClick={() => setView(v.id)}>{v.label}</button>)}
      </div>
      <div className="mt-2 flex min-h-[44px] flex-wrap items-center gap-2">
        {view === "bloques" ? (["der", "izq", "otr"] as Bloc[]).map((b) => <button key={b} type="button" aria-pressed={bloc === b} className={btn(bloc === b)} onClick={() => setBloc(b)}>{BLOC_LABEL[b]}</button>) : null}
        {scen === "2026" && has26 ? <label className="inline-flex min-h-[44px] items-center gap-2 text-sm"><input type="checkbox" checked={changes} onChange={(e) => setChanges(e.target.checked)} /> Destacar dónde cambia el último escaño respecto a 2023</label> : null}
        <label className="ml-auto inline-flex items-center gap-2 text-sm">
          <span>Buscar provincia</span>
          <input list="mapa-provincias" className="min-h-[44px] w-40 rounded border border-sand px-2" placeholder="Ej.: Soria"
            onChange={(e) => { const m = MAPA_PROV.find((p) => p.c.toLowerCase() === e.target.value.toLowerCase() || p.c.toLowerCase().startsWith(e.target.value.toLowerCase()) && e.target.value.length > 2); if (m) setSel(m.c); }} />
          <datalist id="mapa-provincias">{MAPA_PROV.map((p) => <option key={p.c} value={p.c} />)}</datalist>
        </label>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-4 min-[900px]:grid-cols-[minmax(0,1fr)_300px]">
        <div className="relative w-full" style={{ aspectRatio: "735 / 575" }}>
          <svg viewBox="0 0 735 575" className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa de España por circunscripciones. Usa la tabla de abajo para ver los mismos datos.">
            <rect x="498" y="446" width="232" height="124" fill="none" stroke="#bbb" strokeDasharray="4 3" />
            <text x="504" y="461" fontSize="11" fill="#666">Canarias</text>
            {MAPA_PROV.map((p) => {
              const hi = (view === "margen" && top5.has(p.c)) || (changes && scen === "2026" && changed(p));
              const small = p.c === "Ceuta" || p.c === "Melilla";
              return (
                <g key={p.c} tabIndex={0} role="button" aria-label={p.c} className="cursor-pointer outline-none"
                  onMouseEnter={() => setSel(p.c)} onFocus={() => setSel(p.c)} onClick={() => setSel(p.c)}>
                  <title>{p.c}</title>
                  <path d={p.d} fill={fill(p)} stroke={hi ? "#111" : sel === p.c ? "#333" : "#fff"} strokeWidth={hi ? 2.4 : sel === p.c ? 1.8 : 0.7} />
                  {small ? <circle cx={p.cx} cy={p.cy} r={7} fill={fill(p)} stroke={hi ? "#111" : "#555"} strokeWidth={hi ? 2.4 : 1} /> : null}
                </g>
              );
            })}
          </svg>
        </div>
        <aside className="min-h-[300px] rounded-lg border border-sand p-3 text-sm" aria-live="polite" data-mapa-panel="">
          <h3 className="font-display text-xl text-mossDark">{cur.c}</h3>
          <p className="text-ink/70">{scen === "2026" ? "Escenario 2026 (estimación a partir de encuestas)" : "Resultados oficiales 2023"}</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt>Diputados</dt><dd>{seats(cur)}</dd>
            <dt>Reparto</dt><dd>{seatsTxt(ce)}</dd>
            <dt>Último escaño</dt><dd>{ce.last} (cociente {fmt(ce.lastQ)})</dd>
            <dt>Siguiente</dt><dd>{ce.next ? `${ce.next}: le faltaron ${fmt(ce.shortBy ?? 0)} votos (${pct(ce.marginPct ?? 0)} del voto válido)` : "—"}</dd>
            <dt>Votos por escaño</dt><dd>{fmt(ce.votosPorEscano)}</dd>
            <dt>Sin escaño</dt><dd>Derecha {fmt(ce.sinEscano.der)} · Izquierda {fmt(ce.sinEscano.izq)} · Otros {fmt(ce.sinEscano.otr)}</dd>
            <dt>Hab./diputado 2026</dt><dd>{fmt(cur.habDip)}</dd>
            {scen === "2026" && has26 ? <><dt>Último escaño 2023</dt><dd>{cur.y23.last}{changed(cur) ? " (cambia)" : " (igual)"}</dd></> : null}
          </dl>
        </aside>
      </div>
      <div className="mt-3 min-h-[2.5rem] text-xs text-ink/80" data-mapa-legend="">
        {view === "ultimo" ? (
          <ul className="flex flex-wrap gap-x-3 gap-y-1">{lastParties.map((k) => <li key={k} className="inline-flex items-center gap-1"><span aria-hidden className="inline-block h-3 w-3 rounded-sm" style={{ background: PARTY_COLORS[k] ?? "#9a9a9a" }} />{k}</li>)}</ul>
        ) : view === "peso" ? <p>Más oscuro: menos habitantes por diputado (el voto pesa más). De {fmt(habMin)} a {fmt(habMax)} habitantes por diputado (diputados de 2026).</p>
          : view === "margen" ? <p>Más oscuro: último escaño más reñido (votos que le faltaron al siguiente, en % del voto válido; escala hasta 3 %). Con borde negro, las 5 provincias más reñidas.</p>
          : <p>Más oscuro: más votos del {BLOC_LABEL[bloc].toLowerCase()} sin escaño, en % del voto válido de la provincia (escala hasta 25 %).</p>}
      </div>
      <h3 className="mt-4 font-semibold">Los 5 últimos escaños más reñidos ({scen === "2026" ? "estimación 2026" : "2023"})</h3>
      <ol className="mt-1 list-decimal pl-5 text-sm">
        {ranked.slice(0, 5).map((p) => { const e = esc(p); return <li key={p.c}><button type="button" className="underline underline-offset-2" onClick={() => setSel(p.c)}>{p.c}</button>: último escaño {e.last}; a {e.next} le faltaron {fmt(e.shortBy ?? 0)} votos ({pct(e.marginPct ?? 0)}).</li>; })}
      </ol>
      <details className="mt-4">
        <summary className="cursor-pointer font-semibold">Ver los datos del mapa en tabla ({scen === "2026" ? "estimación 2026" : "2023"})</summary>
        <div className="mt-2 max-w-full overflow-x-auto">
          <table className="min-w-[760px] text-left text-xs">
            <caption className="sr-only">Datos por circunscripción</caption>
            <thead><tr><th>Circunscripción</th><th>Diputados</th><th>Reparto</th><th>Último escaño</th><th>Siguiente y votos que faltaron</th><th>Votos por escaño</th><th>Sin escaño (der./izq./otros)</th><th>Hab./diputado 2026</th></tr></thead>
            <tbody>{MAPA_PROV.map((p) => { const e = esc(p); return (
              <tr key={p.c} className="border-t border-sand"><td>{p.c}</td><td>{seats(p)}</td><td>{seatsTxt(e)}</td><td>{e.last}</td><td>{e.next ? `${e.next}: ${fmt(e.shortBy ?? 0)}` : "—"}</td><td>{fmt(e.votosPorEscano)}</td><td>{fmt(e.sinEscano.der)} / {fmt(e.sinEscano.izq)} / {fmt(e.sinEscano.otr)}</td><td>{fmt(p.habDip)}</td></tr>); })}</tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
