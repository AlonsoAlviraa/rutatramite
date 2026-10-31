import { breadcrumbJsonLd, type Crumb } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/empadronamiento/JsonLd";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Migas de pan" className="not-prose text-sm text-moss">
      <JsonLd data={breadcrumbJsonLd(items)} />
      {/* Flujo de texto: el «·» va unido con espacio duro al elemento siguiente, así nunca queda solo al final o al principio de una línea. */}
      <ol className="breadcrumb-trail">
        {items.map((c, i) => (
          <li key={c.path} className="inline">
            {i > 0 ? <>{" "}<span aria-hidden="true">·</span>{"\u00a0"}</> : null}
            {i === items.length - 1 ? (
              <span aria-current="page">{c.name}</span>
            ) : (
              <a className="underline" href={c.path}>
                {c.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
