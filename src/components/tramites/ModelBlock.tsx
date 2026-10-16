"use client";

import { useId, useState } from "react";
import type { GuideModelBlock } from "@/lib/tramites/types";
import { sendMetric } from "@/lib/metrics/events";

export function ModelBlock({ model }: { model: GuideModelBlock }) {
  const captionId = useId();
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  async function copyModel() {
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(model.body);
      setStatus("copied");
      sendMetric("model_copy");
    } catch {
      setStatus("error");
    }
  }

  return (
    <figure data-modelo={model.id} aria-labelledby={captionId} className="border border-sand bg-white p-4">
      <figcaption className="flex flex-wrap items-center justify-between gap-3">
        <span id={captionId} className="font-semibold text-mossDark">{model.title}</span>
        <button
          type="button"
          onClick={copyModel}
          disabled={status === "copying"}
          aria-label={`Copiar modelo: ${model.title}`}
          className="min-h-11 rounded border border-moss px-3 py-2 text-sm font-semibold text-mossDark hover:bg-mist disabled:opacity-60"
        >
          {status === "copying" ? "Copiando…" : "Copiar texto"}
        </button>
      </figcaption>
      <p role="status" aria-atomic="true" className="mt-2 min-h-6 text-sm text-ink/80">
        {status === "copied" && "Texto copiado. Sustituye los campos entre corchetes antes de utilizarlo."}
        {status === "error" && "No se pudo copiar. Selecciona el texto del modelo y cópialo manualmente."}
      </p>
      <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">{model.body}</pre>
    </figure>
  );
}
