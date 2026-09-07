# Mapa del site (URLs inmutables)

Dominio: `https://rutatramite.es`

## Núcleo

| URL | Tipo |
|---|---|
| `/` | Home: wizard + 4 casos + buscador municipio |
| `/empadronarse` | Pilar nacional |
| `/metodologia` | Cómo verificamos |
| `/fuentes` | BOE, INE, sedes |
| `/aviso-legal` | Disclaimer largo |
| `/privacidad` | Sin PII de trámites |
| `/contacto` | Email, no WhatsApp de citas |

## Casos (spokes legales, se escriben UNA vez)

- `/empadronarse/con-contrato`
- `/empadronarse/sin-contrato`
- `/empadronarse/propietario`
- `/empadronarse/casa-de-familiar`
- `/empadronarse/menores`
- `/empadronarse/extranjeros-ue`
- `/empadronarse/extranjeros-no-ue`
- `/empadronarse/sin-hogar`
- `/empadronarse/volante-vs-certificado`
- `/empadronarse/renovacion-2-anos`
- `/empadronarse/cambio-de-domicilio`
- `/empadronarse/baja`

## Geo

- `/empadronarse/{ccaa}`
- `/empadronarse/{ccaa}/{provincia}`
- `/empadronarse/{ccaa}/{provincia}/{municipio}`
- `/empadronarse/{ccaa}/{provincia}/{municipio}/cita` (solo si hay dato real de cita)
- `/oficinas/{ccaa}/{provincia}/{municipio}` (solo si hay ≥1 oficina geocodificada)

Slug = nombre INE normalizado (`ñ→n`, minúsculas, espacios→`-`).  
ID estable = `ine_code` de 5 dígitos. Si cambia el nombre, 301.

Colisión de nombres (Hinojosa en dos provincias): la provincia va SIEMPRE en la URL.

## Qué no existe

- `/empadronarse/madrid/madrid/2026` (nada de fechas en slug).
- Subdominios por ciudad.
- URLs que imiten `sede.administracion.gob.es`.
