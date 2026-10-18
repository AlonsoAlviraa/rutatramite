import { breadcrumbJsonLd, type Crumb } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/empadronamiento/JsonLd";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Migas de pan" className="not-prose text-sm text-moss">
      <JsonLd data={breadcrumbJsonLd(items)} />
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1">
            {i > 0 ? <span aria-hidden="true">·</span> : null}
            {i === items.length - 1 ? (
              <span aria-current="page">{c.name}</span>
            ) : (
              <a className="inline-flex min-h-[44px] items-center underline" href={c.path}>
                {c.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
