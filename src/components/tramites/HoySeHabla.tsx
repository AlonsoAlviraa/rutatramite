// Bloque estático «Hoy se habla de» (temas del día). Server component: sin JS ni carga diferida, sin CLS.
const HOY_SE_HABLA = [
  { href: "/trabajo/salario-minimo-irpf-2026", label: "¿Paga IRPF el salario mínimo en 2026?" },
  { href: "/elecciones/feijoo-cadena-ser-29n", label: "Feijóo en la Cadena SER: lo que dijo, por temas" },
] as const;

export function HoySeHabla({ className = "mt-6" }: { className?: string }) {
  return (
    <aside aria-label="Hoy se habla de" data-hoy-se-habla="" className={`${className} rounded-md border border-ink/10 px-4 py-2 text-sm`}>
      <span className="font-semibold text-ink/80">Hoy se habla de:</span>{" "}
      {HOY_SE_HABLA.map((l, i) => (
        <span key={l.href}>
          {i > 0 ? " · " : null}
          <a className="inline-block min-h-11 py-[10px] underline" href={l.href}>{l.label}</a>
        </span>
      ))}
    </aside>
  );
}
