import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { PageShell } from "@/components/ui/PageShell";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { ESCENARIO_LABELS, type EscenarioSlug } from "@/lib/types";

export function EscenarioView({ slug, markdown }: { slug: EscenarioSlug; markdown: string }) {
  const label = ESCENARIO_LABELS[slug];
  const path = `/empadronarse/${slug}`;
  return (
    <PageShell as="article" className="md-body" data-escenario={slug}>
      <JsonLd
        data={articleJsonLd({
          headline: `${label}: guía para empadronarse`,
          description: `${label}. Guía nacional. El alta es gratuita. RutaTrámite no es Administración.`,
          path,
          dateModified: "2026-09-03",
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Empadronarse", path: "/empadronarse" },
          { name: label, path },
        ]}
      />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      <Disclaimer className="mt-10" />
    </PageShell>
  );
}
