import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { PROMESAS_EXPORT, promesasDatasetJsonLd, promesasMatrix } from "@/lib/promesas-data";

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
export function fechaLarga(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
}

/** Sello de actualización + descargas + Dataset JSON-LD, igual en todas las páginas de promesas. */
export function PromesasDataBar() {
  const u = PROMESAS_EXPORT.updated;
  return (
    <>
      <JsonLd data={promesasDatasetJsonLd()} />
      <p className="mt-3 rounded border border-sand p-3 text-sm" data-promesas-updated="">
        <strong>Última actualización de los datos: <time dateTime={u}>{fechaLarga(u)}</time>.</strong>{" "}
        Cada medida lleva cita, enlace y fecha de su fuente. Descargar datos:{" "}
        <a className="underline" href="/datos/promesas-29n.csv">CSV</a> · <a className="underline" href="/datos/promesas-29n.json">JSON</a> ·{" "}
        <a className="underline" href="/elecciones/promesas/metodologia">Metodología</a>
      </p>
    </>
  );
}

/** Tabla partido × tema (solo recuento; mismo formato para todos). */
export function PromesasMatrix() {
  const m = promesasMatrix();
  return (
    <section id="matriz" className="mt-8" data-promesas-matrix="">
      <h2 className="font-display text-2xl text-mossDark">Cuántas medidas con fuente ha anunciado cada partido, por tema</h2>
      <p className="mt-2 text-sm">Datos a {fechaLarga(PROMESAS_EXPORT.updated)}. Orden por votos en las generales de 2023. «0» significa pendiente de programa en ese tema. Un número mayor no indica una propuesta mejor: solo cuántas medidas concretas se han publicado.</p>
      <div className="promesas-matrix-wrap mt-3" data-guide-table="" role="region" aria-label="Tabla de medidas por partido y tema" tabIndex={0}>
        <table className="promesas-matrix">
          <caption className="mb-2 text-left font-semibold">Promesas del 29-N: medidas con fuente por partido y tema</caption>
          <thead><tr><th scope="col">Partido</th>{m.topics.map(([, n]) => <th key={n} scope="col">{n}</th>)}<th scope="col">Programa del 29-N</th></tr></thead>
          <tbody>
            {m.rows.map((r) => (
              <tr key={r.id}>
                <th scope="row"><a href={`/elecciones/promesas/partido-${r.id}`}>{r.name}</a></th>
                {r.counts.map((c, i) => <td key={i} data-label={m.topics[i][1]}>{c}</td>)}
                <td data-label="Programa del 29-N">{r.programa.startsWith("http") ? <a className="underline" href={r.programa}>Programa oficial</a> : <>{r.programa} (<a className="underline" href={r.web}>web oficial</a>)</>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
