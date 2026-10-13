"use client";

import { useEffect, useState } from "react";
import { DirectorySearch, type SearchEntry } from "@/components/ui/DirectorySearch";

export function NotFoundSearch() {
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/guias", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Search index unavailable");
        return response.json();
      })
      .then((data: SearchEntry[]) => setEntries(data))
      .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, []);

  if (!entries) return <p role="status" className="mt-6 text-sm">{failed
    ? "El buscador no está disponible. Puedes continuar en el directorio de trámites."
    : "Cargando buscador…"}</p>;

  return <DirectorySearch
    entries={entries}
    label="Busca otra guía"
    placeholder="Por ejemplo, renovar DNI o becas"
    hint="Busca por tema o por el nombre del trámite."
  />;
}
