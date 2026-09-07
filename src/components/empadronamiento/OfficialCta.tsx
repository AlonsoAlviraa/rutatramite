export function OfficialCta({
  href,
  label,
  variant = "primary",
}: {
  href: string | null | undefined;
  label: string;
  variant?: "primary" | "secondary";
}) {
  if (!href) return null;
  const cls =
    variant === "primary"
      ? "inline-flex min-h-11 items-center justify-center rounded bg-mossDark px-5 py-2.5 text-sm font-semibold text-white hover:bg-moss"
      : "inline-flex min-h-11 items-center justify-center rounded border border-moss px-5 py-2.5 text-sm font-semibold text-moss hover:bg-sand";
  return (
    <a href={href} className={cls} rel="noopener noreferrer" data-official-cta={variant}>
      {label}
    </a>
  );
}
