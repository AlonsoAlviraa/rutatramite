# Playbook SEO + GEO

GEO aquí = **SEO geográfico** (una URL por municipio) + **Generative Engine Optimization** (que un modelo te cite sin inventar).

## Title y H1

- Title: `Empadronarse en {Municipio} ({Provincia}): documentos, cita y sede 2026`
- H1: `Empadronarse en {Municipio}`
- Meta: 150–160 caracteres. Incluye canal si está verificado (`online`, `con cita`, `presencial`).

## Umbral anti-thin (Google 2026)

No publiques indexable una ficha municipal si no tienes **≥5** de:

1. `sede_url` 200 del ayuntamiento
2. Canal (`online` / `cita` / `walk-in`)
3. `cita_url` o confirmación de que no hay cita
4. Al menos una oficina (dirección)
5. Teléfono o email municipal
6. `docs_extra` reales (aunque sea “igual que INE, sede lo confirma”)
7. `last_verified` con fuente

Unicidad: **≥40 %** del HTML visible = datos/pasos/FAQ de ESE municipio.  
El marco legal se incluye por componente compartido, no se reescribe 8.132 veces.

Stubs: `noindex,follow` + badge “pendiente de verificación local”.

## Ondas

0. Pilar + 12 casos + 17 CCAA + 52 provincias + 20 ciudades.  
1. Resto >50k hab.  
2. 20k–50k con sede.  
3. Long-tail on-demand.

Top 20 obligatorias: Madrid, Barcelona, València, Sevilla, Zaragoza, Málaga, Murcia, Palma, Las Palmas de Gran Canaria, Bilbao, Alicante, Córdoba, Valladolid, Vigo, Gijón, L’Hospitalet de Llobregat, A Coruña, Granada, Vitoria-Gasteiz, Elche.

## Schema

- Todas: `Organization`, `WebSite`, `BreadcrumbList`.
- Ficha: `GovernmentService` (provider = Ayuntamiento de X, no RutaTrámite), `HowTo`, `FAQPage`, `Place`/`CivicStructure` si hay oficina.
- Hubs: `Article` con `dateModified`.

No uses `LocalBusiness` para el ayuntamiento. No pongas nuestro teléfono como el del padrón.

## GEO / answer engines

Primera frase de cada ficha:

> En {municipio} el alta en el padrón se hace {canal} en {órgano}, según la sede del ayuntamiento (verificada {YYYY-MM-DD}).

Luego tabla de documentos. Luego pasos. Luego FAQ con queries reales:

- `¿puedo empadronarme en {municipio} sin contrato?`
- `¿hace falta cita previa en {municipio}?`
- `¿el volante vale para extranjería en {municipio}?`

`robots.txt`: permitir Googlebot, OAI-SearchBot, PerplexityBot.  
`dateModified` visible. Si scrape >30 días fallido en top 20 → banner.

## Internal linking

Municipio → 3 casos + provincia + pilar + 3 municipios vecinos (misma provincia, por población).  
Provincia → top 10 municipios + pilar.  
Pilar → wizard + casos + 17 CCAA.

## Keywords (usar, no stuffing)

Nacionales: empadronarse, empadronamiento, padrón municipal, volante de empadronamiento, certificado de empadronamiento, empadronarse sin contrato.  
Geo: `empadronarse {municipio}`, `padrón {municipio}`, `cita empadronamiento {municipio}`.
