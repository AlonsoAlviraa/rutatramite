# Pipeline operativo

```
INE / CodeForSpain
        ↓
seed_ine.py → _index.json + 8132 json stub
        ↓
enrich_sede.py (top 200, lento)
        ↓
validate_schema.py
        ↓
Next.js SSG (solo published indexable)
        ↓
sitemaps + Search Console
        ↓
cron mensual top 200
```

## Prioridad de enrich

1. Top 20 ciudades.
2. Capitales de provincia.
3. Municipios >50.000 hab.
4. Queries reales de Search Console.
5. Resto on-demand.

## Incidentes

- `sede_url` 404 → `confidence=unverified`, banner, ticket.
- Ayuntamiento cambia de dominio → 301 interno no. Actualizar JSON.
- Usuario reporta dato falso → P0, noindex hasta verificar.

## Scraping ético

- 1 req / 3 s
- UA identificable
- No atravieses captchas a lo bruto
- Cachea HTML 7 días
- No descargues PDFs enteros al repo
