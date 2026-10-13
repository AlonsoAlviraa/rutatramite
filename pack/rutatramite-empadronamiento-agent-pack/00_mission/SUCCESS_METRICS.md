# Métricas de éxito

## Producto

- Tiempo a respuesta útil (municipio conocido): < 60 s.
- Wizard completa → checklist + URL oficial en 6 preguntas.
- 0 fichas publicadas con teléfono o URL inventados (bug P0).
- Disclaimer visible above the fold en móvil.

## Cobertura

| Hito | Número |
|---|---|
| Dataset municipios | 8.132 |
| Hubs CCAA + provincias | 17 + 52 |
| Fichas publicadas indexables onda 0 | 20 ciudades |
| Fichas publicadas onda 1 | ≥ 120 |
| Fichas draft noindex | el resto |

## SEO

- Title único por URL.
- 0 thin pages indexables (unicidad ≥ 40 % datos locales).
- Canonical + hreflang solo si existe EN real.
- Sitemap partido: `sitemap-core.xml`, `sitemap-provincias.xml`, `sitemap-municipios.xml`.
- Core Web Vitals móviles en verde en pilar y 10 fichas muestra.

## GEO

Cada ficha indexable empieza por una frase del tipo:

> En {municipio} el alta en el padrón se hace {online / con cita / presencial} en {órgano}, según la sede del ayuntamiento (verificada {fecha}).

Cita BOE/INE en el pilar, no en cada pueblo.

## Confianza

- `last_verified` ≤ 30 días en top 20; ≤ 90 días en el resto publicado.
- Banner “verificar en sede” si el scrape falla.
- Página `/metodologia` explica fuentes.
