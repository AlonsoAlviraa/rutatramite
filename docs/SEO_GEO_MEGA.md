# SEO + GEO mega — qué cambió y cómo operarlo

Este documento describe el trabajo de crawlability, GEO, velocidad de portada y fontanería SEO. **No promete tráfico, posiciones ni un salto de indexación.** El dominio es joven; GSC puede seguir mostrando descubiertas-no-indexadas durante semanas. El código solo hace el sitio más fácil de descubrir, entender y citar.

## A) SEO técnico (Next App Router)

- `metadataBase` sigue siendo `SITE_ORIGIN` (`NEXT_PUBLIC_SITE_URL` o `https://rutatramite.com`).
- Canonical + Open Graph + Twitter en `pageMetadata`.
- **hreflang honesto:** `es` y `x-default` (el sitio es solo es-ES). No hay locales inventados.
- `src/app/robots.ts`: `Allow: /` explícito para Googlebot, Bingbot y bots de búsqueda/citas de IA (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Applebot, Applebot-Extended, Google-Extended, etc.). Siguen fuera `/api/` y `/borrador/`. Bytespider queda en `Disallow: /` (tier de entrenamiento agresivo). **No hay noindex global.**
- Sitemap:
  - `src/app/sitemap.ts` + `src/lib/seo/sitemapEntries.ts` (hubs primero, `lastModified` solo cuando hay fecha editorial o `last_verified`).
  - `public/sitemap.xml` se regenera con `npm run sitemaps` (`scripts/build_sitemaps.py`). Un solo urlset; no hay sitemapindex.
  - `/buscar` está en `noindex` (herramienta) y **no** entra en el sitemap.
- JSON-LD:
  - WebSite + Organization en el layout (Organization con `publishingPrinciples` → `/metodologia`, email editorial).
  - WebSite `SearchAction` apunta a `/buscar?q={search_term_string}` (página SSR real).
  - BreadcrumbList en fichas, pilar, guías, escenarios y ahora también hubs CCAA/provincia.
  - FAQPage / HowTo solo donde el contenido es realmente FAQ o pasos (fichas y pilar). Las guías no inventan HowTo.

## B) GEO / descubrimiento para IA

- `public/llms.txt` (y ruta `src/app/llms.txt`) sigue el patrón llmstxt.org: H1, blockquote, secciones con enlaces Markdown, &lt;200 líneas.
- `src/app/llms-full.txt`: índice generado del catálogo (todas las guías + escenarios + pilares).
- `public/.well-known/ai.txt`, `/ai/summary.json`, `/ai/faq.json` (FAQ nacionales del pilar de padrón).
- Citabilidad ligera (AutoGEO, sin reescribir cada ficha): bloque `data-geo-lead` al inicio de portada, pilar, packs, guías y hubs territoriales.

## C) IndexNow (Bing / Yandex / otros)

Google sigue yendo por sitemap + Search Console. IndexNow es un ping de cambio, no un ranking.

- Clave pública (así está diseñado el protocolo): `b7e4c91a0f3d28e65a1c47b90d2e8f36`
- Ficheros: `https://rutatramite.com/b7e4c91a0f3d28e65a1c47b90d2e8f36.txt` y alias `/indexnow.txt`
- `keyLocation`: `https://rutatramite.com/b7e4c91a0f3d28e65a1c47b90d2e8f36.txt`

Tras un deploy o un cambio editorial de pilares:

```bash
NEXT_PUBLIC_SITE_URL=https://rutatramite.com npm run indexnow
```

El script POST a `https://api.indexnow.org/indexnow` la portada y los pilares. **Falla suave** (exit 0) salvo `--strict`. También existe `POST /api/indexnow` (robots lo excluye; misma política fail-soft).

No commitear otros secretos. Esta clave es pública por diseño.

## D) Portada / Core Web Vitals (notas de bundle, no field data)

No hay cifras de CrUX/Lighthouse de campo en este PR; no se inventan.

Cambios de peso:

- El buscador de portada ya **no** serializa las 769 fichas municipales al cliente. Solo las guías. Municipios: `/empadronarse`, asistente o `/buscar` (SSR).
- El asistente recibe un índice recortado (`slimClientIndex`: ine, nombre, path, sede, docs).
- El buscador es un `<form action="/buscar">`: el HTML sirve sin JS.
- `next/font` (Public Sans + Newsreader, `display: swap`) se mantiene. No hay LCP de imagen en portada; no se marca `priority` en ningún `next/image` inventado.
- El asistente sigue en HTML (preguntas en texto) para que el crawl no dependa de hidratar un wizard vacío.

Medir después del deploy: PageSpeed / Lighthouse de laboratorio sobre `https://rutatramite.com/`. Comparar peso de HTML y JS de portada con el build anterior; no atribuir un LCP de laboratorio a IndexNow ni a `llms.txt`.

## E) Capa de datos SEO

- Títulos/descripciones de hubs CCAA y provincia salen de `buildCcaaHub` / `buildProvinciaHub` (únicos por territorio), no de una plantilla genérica distinta del H1.
- Enlaces internos: pilares ↔ escenarios en hubs; packs enlazan padrón/DNI/extranjería/modelos; portada sigue cruzando categorías y casos.
- Fichas no verificadas siguen `noindex` (`isFichaIndexable`). No se han generado páginas finas nuevas.

## F) Operación: sitemap, GSC, expectativas

1. `NEXT_PUBLIC_SITE_URL=https://rutatramite.com npm run sitemaps`
2. Tests + `NEXT_PUBLIC_SITE_URL=https://rutatramite.com npm run build`
3. Release slot2 según `docs/VPS_DESPLIEGUE.md` (no tocar Caddy ni VisionSetil :8000).
4. En GSC: volver a enviar `https://rutatramite.com/sitemap.xml` si hace falta. La cola de indexación es de Google, no del código.
5. `npm run indexnow` para avisar a Bing/IndexNow de portada + pilares.
6. Comprobar en producción: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/.well-known/ai.txt`, `/{key}.txt`.

**Qué no hace este PR:** no acelera el ageing del dominio, no repara un historial HTTPS roto, no obliga a Google a indexar cientos de URLs descubiertas, no crea citas en ChatGPT/Perplexity.

## Inspiraciones (patrones, no copias)

| Fuente | Qué se adaptó |
| --- | --- |
| [zubair-trabzada/geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude) | Tiers de crawlers IA, citabilidad, llms.txt, schema técnico |
| [Auriti-Labs/geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill) | Allow de bots de cita vs bloqueo de Bytespider; profundidad llms-full; `.well-known/ai.txt`, `/ai/summary.json`, `/ai/faq.json` |
| [mykpono/ultimate-seo-geo](https://github.com/mykpono/ultimate-seo-geo) | IndexNow (clave + ping), validación llms, entity/contact, social/OG ya existentes |
| [fawzy0z/seo-optimizer-nextjs](https://github.com/fawzy0z/seo-optimizer-nextjs) | App Router: `metadataBase`, `generateMetadata`, `sitemap.ts`, `robots.ts`, OG |
| [cxcscmu/AutoGEO](https://github.com/cxcscmu/AutoGEO) (ICLR’26) | Bloque respuesta al inicio en plantillas hub/pilar/pack; no reescritura masiva de MD |
