# Stack mínimo

Objetivo: un agente solo puede terminar esto en 14 días si el stack es aburrido.

## Web

- Next.js App Router + TypeScript
- SSG de páginas publicadas. ISR 7 días top 200, 30 días stubs.
- Componentes en `/components/empadronamiento/*`
- `next-intl` preparado, v1 solo `es`
- Buscador de municipios: MiniSearch o Pagefind sobre `_index.json`
- Mapas: Leaflet + OSM, solo si hay lat/lon reales
- Estilos: Tailwind. Paleta propia. **Prohibido** imitar sede.gob.es

## Datos

- Git = source of truth
- JSON por municipio en `data/municipios/{ine_code}.json`
- Índice `data/municipios/_index.json` (id, name, slugs, población, status)
- Validación: Ajv contra `municipio.schema.json`
- No CMS en v1

## Ingesta

- Python 3.12
- httpx + selectolax
- Playwright solo si la sede es JS-only
- 1 petición / 3 s, User-Agent identificable (`RutaTramiteBot/0.1 +url`)
- Respetar robots.txt. Si bloquea, ficha stub y cola manual

## Deploy

- Vercel o Cloudflare Pages
- Preview por PR
- Plausible o GA4 + Search Console

## PII

- Wizard 100 % client-side
- Cero uploads de pasaporte
- Cero cuentas de usuario en v1

## Scripts a crear

```
scripts/seed_ine.py
scripts/normalize_slugs.py
scripts/validate_schema.py
scripts/enrich_sede.py
scripts/build_sitemaps.py
scripts/qa_sample.py
```
