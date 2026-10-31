import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { CITA_DNI_URL } from "@/lib/tramites/facts";
import { DNI_DOCUMENTOS, DNI_FAQS, DNI_PASOS, DNI_REVIEWED_AT, DNI_SOURCES } from "@/lib/tramites/dni-respuestas";

/** Respuesta rápida + pasos + documentos + FAQ (con FAQPage) para /dni. */
export function DniQuickAnswers() {
  return <>
    <section aria-labelledby="dni-respuesta-rapida" className="mt-7 space-y-3 border border-sand p-5" data-dni-quick="">
      <h2 id="dni-respuesta-rapida" className="font-display text-2xl text-mossDark">Respuesta rápida: tasas del DNI y pasaporte 2026, documentos y cita</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li><strong>Tasa / precio del DNI 2026: 12 €</strong> (<a className="underline" href={DNI_SOURCES.ley84.href}>Ley 84/1978, art. 6, BOE</a>). <strong>Pasaporte: 30 €.</strong> Los dos juntos, 42 €.</li>
        <li><strong>Gratis</strong> para familias numerosas, para cambiar el domicilio de un DNI en vigor y para menores de 14 años de hogares que piden el ingreso mínimo vital.</li>
        <li><strong>La cita es gratuita</strong> y solo se pide en <a className="underline" href={CITA_DNI_URL}>citapreviadnie.es</a> o en el 060.</li>
        <li><strong>No se renueva por internet:</strong> online solo pides la cita y pagas. Hay que ir en persona.</li>
      </ul>
    </section>
    <section aria-labelledby="dni-comparativa" className="mt-7">
      <h2 id="dni-comparativa" className="font-display text-2xl text-mossDark">DNI y pasaporte en 2026: precio, validez y cita</h2>
      <div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Comparativa del DNI y el pasaporte en 2026</caption><thead><tr><th className="p-2">Documento</th><th className="p-2">Tasa 2026</th><th className="p-2">Gratis para</th><th className="p-2">Cita</th></tr></thead><tbody>
        <tr className="border-t border-sand"><td className="p-2">DNI (renovar o primera vez)</td><td className="p-2">12 € (<a className="underline" href={DNI_SOURCES.ley84.href}>Ley 84/1978</a>)</td><td className="p-2">Familia numerosa; cambio de domicilio con DNI en vigor; menores de 14 en hogares con IMV</td><td className="p-2">Gratis en citapreviadnie.es o 060</td></tr>
        <tr className="border-t border-sand"><td className="p-2">Pasaporte ordinario</td><td className="p-2">30 € (<a className="underline" href={DNI_SOURCES.policiaPasaporte.href}>Policía Nacional</a>)</td><td className="p-2">Familia numerosa (<a className="underline" href={DNI_SOURCES.ley48.href}>Ley 48/2015</a>)</td><td className="p-2">Gratis en citapreviadnie.es o 060</td></tr>
        <tr className="border-t border-sand"><td className="p-2">Los dos en la misma cita</td><td className="p-2">42 €</td><td className="p-2">Familia numerosa: 0 €</td><td className="p-2">Una cita para ambos documentos</td></tr>
      </tbody></table></div>
    </section>
    <section aria-labelledby="dni-pasos" className="mt-7">
      <h2 id="dni-pasos" className="font-display text-2xl text-mossDark">Cómo renovar el DNI paso a paso</h2>
      <ol className="mt-3 list-decimal space-y-1 pl-5">{DNI_PASOS.map((p) => <li key={p}>{p}</li>)}</ol>
      <h3 className="mt-5 font-semibold">Documentos que tienes que llevar</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5">{DNI_DOCUMENTOS.map((d) => <li key={d}>{d}</li>)}</ul>
      <p className="mt-3 text-sm"><a className="underline" href="/dni/cita-previa">Cómo pedir, consultar o anular la cita</a> · <a className="underline" href="/dni/checklist">Lista de documentos</a> · <a className="underline" href="/pasaporte">Pasaporte: precio y cita</a> · <a className="underline" href="/elecciones/dni-caducado-votar">¿Puedo votar con el DNI caducado?</a> · <a className="underline" href="/descargas">Formularios oficiales</a> · <a className="underline" href="/dni/clave-registrarse">Registrarse en Cl@ve</a> · <a className="underline" href="/dni/certificado-digital-fnmt">Certificado digital FNMT</a></p>
    </section>
    <section id="preguntas-frecuentes" aria-labelledby="dni-faq" className="mt-7" data-dni-faq="">
      <h2 id="dni-faq" className="font-display text-2xl text-mossDark">Preguntas frecuentes sobre el DNI</h2>
      <div className="mt-3">{DNI_FAQS.map((f) => <details key={f.q} className="border-b border-sand py-3"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-3 leading-relaxed">{f.a}</p></details>)}</div>
      <p className="mt-3 text-sm">Revisado el <time dateTime={DNI_REVIEWED_AT}>22 de octubre de 2026</time>. <a className="underline" href="/metodologia">Cómo revisamos las guías</a>. Fuentes: {Object.values(DNI_SOURCES).map((s, i) => <span key={s.href}>{i ? " · " : ""}<a className="underline" href={s.href}>{s.label}</a></span>)}.</p>
    </section>
    <JsonLd data={articleJsonLd({ headline: "Cuánto cuesta renovar el DNI y el pasaporte en 2026", description: "Tasa del DNI 12 € y del pasaporte 30 € en 2026, exenciones, documentos y cita previa gratuita.", path: "/dni", dateModified: DNI_REVIEWED_AT, sources: Object.values(DNI_SOURCES).map((s) => s.href) })} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: DNI_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
  </>;
}
