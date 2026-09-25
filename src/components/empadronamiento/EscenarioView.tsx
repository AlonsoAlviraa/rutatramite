import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/empadronamiento/Breadcrumbs";
import { Disclaimer } from "@/components/empadronamiento/Disclaimer";
import { JsonLd } from "@/components/empadronamiento/JsonLd";
import { PageShell } from "@/components/ui/PageShell";
import { GuideShort } from "@/components/youtube/GuideShort";
import { articleJsonLd } from "@/lib/seo/jsonld";
import { ESCENARIO_LABELS, type EscenarioSlug } from "@/lib/types";

function splitMarkdownAfterIntro(markdown: string): { intro: string; rest: string } {
  const idx = markdown.search(/\n## /);
  if (idx < 0) return { intro: markdown, rest: "" };
  return { intro: markdown.slice(0, idx), rest: markdown.slice(idx + 1) };
}

export function EscenarioView({ slug, markdown }: { slug: EscenarioSlug; markdown: string }) {
  const label = ESCENARIO_LABELS[slug];
  const path = `/empadronarse/${slug}`;
  const { intro, rest } = splitMarkdownAfterIntro(markdown);
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
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro}</ReactMarkdown>
      <GuideShort path={path} />
      {rest ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{rest}</ReactMarkdown> : null}
      <Disclaimer className="mt-10" />
    </PageShell>
  );
}
