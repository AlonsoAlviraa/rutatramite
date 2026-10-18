import { DATASET_LICENSE_ID, DATASET_LICENSE_URL, DATASET_REUSE_TERMS } from "@/lib/dataset-license";

export function DatasetReuse() {
  return <section id={DATASET_LICENSE_ID} className="space-y-3">
    <h2 className="font-display text-2xl">Condiciones de reutilización de los datos · versión 1</h2>
    {DATASET_REUSE_TERMS.map(text => <p key={text}>{text}</p>)}
    <p><a className="inline-block min-h-11 py-[10px] underline" href={DATASET_LICENSE_URL}>Enlace permanente a estas condiciones</a>.</p>
  </section>;
}
