# Fases (el agente no salta de fase)

## Fase 0 — Arranque (día 0–1)

- Repo, lint, preview local.
- Dominio / staging.
- Layout, disclaimer, 404, robots.txt, llms.txt informativo (no “hack”).
- Ingesta INE + provincias + CCAA → `_index.json`.
- Design tokens: no imitar sede.gob.es.

**Exit:** `npm run dev` enseña home + pilar vacío + 1 ficha de ejemplo (Madrid) con datos reales.

## Fase 1 — Pilar y casos (día 1–3)

Publicar:

- `/empadronarse`
- 8 casos (ver sitemap)
- 17 CCAA hubs
- 52 provincia hubs
- Top 20 municipios con ficha verificada a mano (no scrape ciego)

**Exit:** Lighthouse móvil ≥ 90 en pilar. Wizard funciona para Madrid y un pueblo.

## Fase 2 — Top 150 (día 4–14)

- Extractor de sedes para municipios > ~50k hab.
- Publicar solo si pasan umbral de 5 datos únicos.
- Internal linking provincia ↔ municipio ↔ casos.
- JSON-LD HowTo + FAQ + GovernmentService.

**Exit:** ≥ 120 fichas `confidence: high|medium` con `last_verified`.

## Fase 3 — Cobertura larga (día 15–30)

- 20k–50k hab.
- Pueblos con sede electrónica detectada.
- Resto en `draft` + `noindex`.
- Pipeline de recrawl 30 días.

**Exit:** dataset completo 8.132 filas. Publicado solo lo verificado.

## Fase 4 — GEO + calidad

- Preguntas extraíbles, tablas, dateModified.
- `sources.json` por ficha.
- QA legal (ver `10_qa`).
- Página “cómo verificamos”.

No hay Fase “8.131 artículos”. Eso es un anti-goal.
