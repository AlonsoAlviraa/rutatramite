"use client";

import MiniSearch from "minisearch";
import { useId, useMemo, useState } from "react";
import type { MunicipioIndexEntry } from "@/lib/types";

type Props = {
  index: MunicipioIndexEntry[];
  value: string | null;
  onChange: (ine: string | null) => void;
};

type Hit = MunicipioIndexEntry & { id?: string };

export function MunicipioTypeahead({ index, value, onChange }: Props) {
  const inputId = useId();
  const listId = `${inputId}-listbox`;
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const mini = useMemo(() => {
    const ms = new MiniSearch<MunicipioIndexEntry>({
      fields: ["name", "province_name", "ccaa_name", "ine_code"],
      storeFields: ["ine_code", "name", "province_name", "path", "poblacion"],
      idField: "ine_code",
      searchOptions: { prefix: true, fuzzy: 0.2 },
    });
    ms.addAll(index);
    return ms;
  }, [index]);

  const hits: Hit[] =
    open && q.trim().length >= 1 ? (mini.search(q).slice(0, 8) as unknown as Hit[]) : [];
  const selected = index.find((m) => m.ine_code === value) ?? null;

  function pick(h: Hit) {
    const ine = h.ine_code || String(h.id ?? "");
    onChange(ine);
    setQ(`${h.name} (${h.province_name})`);
    setOpen(false);
  }

  return (
    <div data-typeahead="" className="relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <label className="block text-sm font-semibold" htmlFor={inputId}>
        Municipio
      </label>
      <p className="text-xs text-ink/70">Escribe el nombre. No pedimos dirección ni DNI.</p>
      <input
        id={inputId}
        className="mt-1 w-full rounded border border-sand bg-white px-3 py-2.5"
        value={q}
        role="combobox"
        aria-expanded={hits.length > 0}
        aria-controls={hits.length ? listId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={hits[active] ? `${listId}-${hits[active].ine_code || hits[active].id}` : undefined}
        onChange={(e) => {
          setQ(e.target.value);
          if (value !== null) onChange(null);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => {
          if (q.trim() && !selected) setOpen(true);
        }}
        onKeyDown={(e) => {
          if (!hits.length) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => (i + 1) % hits.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => (i - 1 + hits.length) % hits.length);
          } else if (e.key === "Enter") {
            e.preventDefault();
            pick(hits[active] ?? hits[0]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        autoComplete="off"
        placeholder="Madrid, Getafe, L'Hospitalet…"
      />
      {hits.length > 0 ? (
        <ul id={listId} role="listbox" aria-label="Municipios" className="typeahead-panel">
          {hits.map((h, i) => {
            const ine = h.ine_code || String(h.id ?? i);
            return (
              <li key={ine} role="presentation">
                <button
                  type="button"
                  id={`${listId}-${ine}`}
                  role="option"
                  aria-selected={i === active}
                  className="typeahead-option w-full px-3 py-2.5 text-left"
                  onClick={() => pick(h)}
                >
                  <span className="font-semibold">{h.name}</span>
                  <span className="text-ink/70"> · {h.province_name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
      {open && q.trim() && !hits.length ? <p role="status" className="mt-2 text-sm">No encontramos ese municipio. Prueba otro nombre o consulta la <a href="/empadronarse" className="underline">guía nacional</a>.</p> : null}
      {selected ? (
        <p className="mt-2 text-sm">
          Seleccionado: <strong>{selected.name}</strong> ({selected.province_name})
        </p>
      ) : null}
    </div>
  );
}
