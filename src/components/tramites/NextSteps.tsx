import { NEXT_STEPS } from "@/lib/seo/nextSteps";

/** Bloque estático (SSR, sin JS ni medidas dinámicas: no añade CLS). */
export function NextSteps({ path }: { path: string }) {
  const steps = NEXT_STEPS[path];
  if (!steps?.length) return null;
  return (
    <nav aria-labelledby="siguiente-paso-title" className="mt-10 rounded-lg border border-sand p-5" data-next-steps="">
      <h2 id="siguiente-paso-title" className="font-display text-2xl text-mossDark">Tu siguiente paso</h2>
      <ol className="mt-3 space-y-3">
        {steps.map((s) => (
          <li key={s.href}>
            <a className="inline-flex min-h-[44px] items-center font-semibold text-mossDark underline underline-offset-4" href={s.href}>{s.label}</a>
            <p className="text-ink/80">{s.why}</p>
          </li>
        ))}
      </ol>
    </nav>
  );
}
