# Modelo de datos

Fuente de IDs: código INE de 5 dígitos (`municipio_id`).  
8.132 municipios a 1 de enero de 2026 (INE).

## Entidades

- `ccaa`
- `provincia`
- `municipio`
- `oficina`
- `escenario`
- `source` (URL + fecha + extractor)

Ver JSON Schema en `data/schemas/municipio.schema.json`.

## Slugs

```
name_norm = unaccent(lower(nombre oficial INE))
slug = name_norm.replace(" ", "-").strip("-")
```

Excepciones obligatorias (guardar en `data/slug_overrides.json`):

- Donostia/San Sebastián → `donostia-san-sebastian`
- Iruña/Pamplona → `pamplona`
- Palma → `palma`
- València/Valencia → `valencia`
- Castelló/Castellón → `castellon`
- L'Hospitalet de Llobregat → `lhospitalet-de-llobregat`

Si dos municipios en la misma provincia colisionan (raro): sufijo `ine_code`.

## Reglas de calidad

- `sede_url` solo si el host pertenece al ayuntamiento / diputación / sede electrónica reconocible. Nunca un directorio privado.
- `tasa_alta` = 0 siempre que no haya ordenanza en contra (el alta es gratuita).
- `confidence`: `official` (sede leída), `inferred` (hub provincial o patrón), `unverified` (solo INE).
- `status`: `published` | `stub` | `draft`.
- Prohibido teléfono de un pueblo vecino.

## Ingesta

1. CodeForSpain CSV (actualizado a INE 01/01/2026) o xlsx INE `codmun`.
2. Población: cifras oficiales padrón / censo anual INE.
3. Enrich top 200 a mano o Playwright lento (1 req / 3 s, respetar robots).
4. Resto = stub.

Script esperado: `scripts/seed_ine.py`, `scripts/enrich_sede.py`, `scripts/validate_schema.py`.
