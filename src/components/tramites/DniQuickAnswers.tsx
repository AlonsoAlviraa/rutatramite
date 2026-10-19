import { JsonLd } from "@/components/empadronamiento/JsonLd";
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
      <p className="mt-3 text-sm">Revisado el <time dateTime={DNI_REVIEWED_AT}>19 de octubre de 2026</time>. <a className="underline" href="/metodologia">Cómo revisamos las guías</a>. Fuentes: {Object.values(DNI_SOURCES).map((s, i) => <span key={s.href}>{i ? " · " : ""}<a className="underline" href={s.href}>{s.label}</a></span>)}.</p>
    </section>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: DNI_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
  </>;
}
