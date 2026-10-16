import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { PageShell } from "@/components/ui/PageShell";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { escenarioReview } from "@/lib/data/escenarios-editorial";
import { descargasForGuide } from "@/lib/descargas";
import { ESCENARIO_LABELS, type EscenarioSlug } from "@/lib/types";

export function EscenarioView({ slug, markdown }: { slug: EscenarioSlug; markdown: string }) {
  const label = ESCENARIO_LABELS[slug];
  const path = `/empadronarse/${slug}`;
  const review = escenarioReview(slug);
  const forms = descargasForGuide(path);
  return (
    <PageShell as="article" className="md-body" data-escenario={slug}>
      <JsonLd
        data={articleJsonLd({
          headline: review?.h1 ?? `${label}: guía para empadronarse`,
          description: review?.description ?? `${label}. Guía nacional. El alta es gratuita. RutaTrámite no es Administración.`,
          path,
          dateModified: review?.reviewedAt ?? "2026-09-03",
          sources: review?.requiredLinks.filter(href => href.startsWith("https://")),
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Empadronarse", path: "/empadronarse" },
          { name: label, path },
        ]}
      />
      <ReactMarkdown skipHtml remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      {forms.length > 0 && <section id="formularios" className="mt-8 space-y-3">
        <h2>Formularios del Ayuntamiento de Madrid</h2>
        {forms.map(form => <div key={form.file} className="space-y-2"><h3><a href={`/${form.file}`}>{form.title} (PDF)</a></h3><p>{form.purpose}</p><p className="text-sm">Revisión del archivo: <time dateTime={form.verified}>{form.verified}</time> · <a href={form.source_url}>Fuente oficial</a></p></div>)}
        <p><a href="/descargas">Catálogo de formularios y guías oficiales</a></p>
      </section>}
      {review && <p className="text-sm">Revisión editorial: <time dateTime={review.reviewedAt}>{review.reviewedAt}</time>. <a href="/metodologia">Cómo revisamos</a> · <a href="/contacto">Avisar de un error</a>.</p>}
      <Disclaimer className="mt-10" />
    </PageShell>
  );
}
