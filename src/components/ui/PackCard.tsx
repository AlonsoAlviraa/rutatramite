export function PackCard({
  href,
  title,
  blurb,
  headingLevel: Heading = "h3",
}: {
  href: string;
  title: string;
  blurb: string;
  kicker?: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <a href={href} className="rt-card" data-pack-card="">
      <Heading className="rt-card-title">{title}</Heading>
      <p className="mt-2 text-sm leading-relaxed text-ink/75">{blurb}</p>
    </a>
  );
}
