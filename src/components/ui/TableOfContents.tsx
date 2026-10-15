export function TableOfContents({ items }: { items: { id: string; title: string }[] }) {
  return <nav className="guide-toc min-w-0 max-w-full" aria-label="En esta página">
    <p className="rt-kicker">En esta página</p>
    <ol>{items.map((item, i) => <li key={item.id} className="min-w-0"><a className="min-w-0" href={`#${item.id}`}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{item.title}</a></li>)}</ol>
  </nav>;
}
