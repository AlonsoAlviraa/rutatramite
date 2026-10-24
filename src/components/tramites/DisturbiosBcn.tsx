import { DISTURBIOS_BCN, DISTURBIOS_UPD, INTERIOR_BALANCES } from "@/lib/tramites/disturbios-bcn";

export function DisturbiosBcn() {
  return (
    <section id="disturbios-barcelona" aria-labelledby="disturbios-title" className="mt-6 rounded-xl border-2 border-mossDark p-5 text-lg leading-relaxed" data-disturbios-bcn="">
      <p className="text-base">Actualizado el {DISTURBIOS_UPD}</p>
      <h2 id="disturbios-title" className="mt-1 font-display text-3xl text-mossDark">Orden público y protestas: cronología de disturbios en Barcelona</h2>
      <p className="mt-3">Disturbios en Barcelona antes de las elecciones del 29-N y antecedentes desde 2017, con el balance de detenidos y heridos que dio cada fuente. Incluye la concentración «Instituts Indignats» del 24 de octubre en plaza Catalunya.</p>
      <ol className="mt-4 space-y-4">
        {DISTURBIOS_BCN.map((f) => (
          <li key={f.fecha} className="border-l-4 border-mossDark pl-4">
            <p className="font-semibold">{f.fecha}</p>
            <p className="mt-1 break-words">{f.lugar}</p>
            <p className="mt-1 break-words"><strong>Balance:</strong> {f.balance}</p>
            <p className="mt-1 text-base">Fuente:{" "}
              {f.fuentes.map((s, i) => (
                <span key={s.href}>{i > 0 ? ", " : ""}<a className="underline" href={s.href}>{s.label}</a></span>
              ))}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-4">Se actualizará cuando los Mossos publiquen el balance oficial del 24 de octubre.</p>
      <p className="mt-2">Datos oficiales de delitos por municipio: <a className="underline" href={INTERIOR_BALANCES}>Balance de Criminalidad del Ministerio del Interior</a>.</p>
      <p className="mt-2 text-base">Equipo RutaTrámite</p>
    </section>
  );
}
