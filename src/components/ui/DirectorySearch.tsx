"use client";

import { useId, useMemo, useState } from "react";

export type SearchEntry = { title: string; href: string; category: string };
const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function DirectorySearch({
  entries,
  label = "¿Qué necesitas resolver?",
  placeholder = "Prueba «DNI», «becas» o tu municipio",
  hint = "Busca una guía o una ficha municipal. Sin registro.",
}: {
  entries: SearchEntry[];
  label?: string;
  placeholder?: string;
  hint?: string;
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const search = useMemo(
    () => entries.map((entry) => ({ ...entry, terms: normalize(`${entry.title} ${entry.category}`) })),
    [entries],
  );
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  const results = words.length ? search.filter((entry) => words.every((word) => entry.terms.includes(word))).slice(0, 10) : [];
  return (
    <form className="directory-search" action="/buscar" method="get" role="search">
      <label htmlFor={id}>{label}</label>
      <div className="search-field">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
        <input
          id={id}
          type="search"
          name="q"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-describedby={`${id}-status`}
          autoComplete="off"
        />
      </div>
      <p id={`${id}-status`} role="status" className="search-hint">
        {words.length
          ? results.length
            ? `${results.length === 10 ? "Primeros 10" : results.length} ${results.length === 1 ? "resultado" : "resultados"}. Selecciona un enlace o envía el formulario para ver más.`
            : "No encontramos coincidencias. Prueba con menos palabras, envía el formulario o revisa el listado de esta página."
          : hint}
      </p>
      {results.length > 0 && (
        <ul className="directory-results">
          {results.map((entry) => (
            <li key={entry.href}>
              <a href={entry.href}>
                <span>
                  {entry.title}
                  {entry.category && <small>{entry.category}</small>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
