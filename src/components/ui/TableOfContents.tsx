export function TableOfContents({ items }: { items: { id: string; title: string }[] }) {
  return <nav className="guide-toc" aria-label="En esta página">
    <p className="rt-kicker">En esta página</p>
    <ol>{items.map((item, i) => <li key={item.id}><a href={`#${item.id}`}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{item.title}</a></li>)}</ol>
  </nav>;
}
