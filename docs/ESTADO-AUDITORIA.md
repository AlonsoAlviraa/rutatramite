# RutaTrámite: estado vigente

Actualizado el 7 de septiembre de 2026. La auditoría SEO/GEO, la limpieza editorial, el rediseño y la publicación están desplegados en la release actual.

## Publicación actual

- URL: https://rutatramite.com
- Build: tSaLmQxc_8_5ek2TQNGHB
- Release: /srv/tenants/slot2/releases/20260907T211050Z (anterior: /srv/tenants/slot2/releases/20260907T202312Z)
- Artefacto: SHA-256 `d06bab21848f7d84ac6083bcd4d8906b6441c7f0279ac599bceebacea3eb7ac4`, 242.825.216 bytes.
- Preview privado: `PREVIEW_OK`; servicio local comprobado antes de activar.

La compilación genera 1.006 rutas y la auditoría privada revisa 997 HTML, 228 páginas indexables y 228 URLs de sitemap sin incidencias. La auditoría de fragmentos cubre 16.418 enlaces y 1.190 IDs, también sin incidencias. Se corrigieron las últimas secuencias de codificación doble en textos de fichas y en el pack de municipios; la comprobación final no detecta marcadores U+00C3, U+00C2, U+00E2 ni U+FFFD.

## Cambios realizados

| Área | Resultado y evidencia |
| --- | --- |
| SEO técnico | Sitemap único de 228 URLs, canonicals coherentes, un H1 por página, idioma `es`, JSON-LD válido y fichas sin señales locales suficientes fuera de indexación. [Auditoría](AUDITORIA-SEO-GEO-UX.md). |
| Datos estructurados | HowTo genérico retirado; FAQ solo con preguntas visibles; Article en guías; sin direcciones municipales inventadas. |
| GEO y enlaces | 768 destinos internos fuera del sitemap responden 200; cero duplicados de URLs, títulos o descripciones; `llms.txt` usa enlaces Markdown. |
| Contenido | Disponibilidad de citas, horarios, tasas, canales locales y requisitos se expresa con alcance y fuente; se retiraron promesas no verificables. |
| Codificación | Cero marcadores de mojibake en fuente, datos, pack y 11 rutas públicas de smoke. |
| Diseño | Newsreader + Public Sans, fondo claro, verde cívico, filas de directorio, lectura editorial y controles sobrios. Sin gradientes, glassmorphism, desenfoques ni sombras grandes. [Reglas](../DESIGN.md). |
| UX | Buscador contextual, directorios, TOC, typeahead municipal, asistente de seis pasos, estados sin resultados, skip link y menú móvil con Escape y retorno de foco. |
| Accesibilidad estática | Auditoría global de 997 HTML y muestra pública de 8 páginas: cero IDs duplicados, controles o botones sin nombre, imágenes sin `alt` o landmarks `main` incorrectos. |
| Validación | 12 archivos y 64 tests pasan; generador de escenarios en modo `--check`; preflight privado y crawl público final sin incidencias. |

## Evidencia final

- [Auditoría SEO/GEO/UX](AUDITORIA-SEO-GEO-UX.md)
- [Crawl público final](audit-production-20260907-editorial-post-final2.json)
- [Smoke público](final-public-smoke.json)
- [Accesibilidad global del build](audit-accessibility-build-final.json)
- [Accesibilidad pública](audit-accessibility-public-final.json)
- [Riesgo editorial](editorial-risk-scan-final.json)
- [Codificación pública de las 228 URLs](audit-public-encoding-final.json)
- [Enlaces externos](audit-external-links-final.json)
- [Revisión visual](browser-visual-final.json)
- [Manifiesto y recibo de despliegue](linux-release-manifest.json)

## Cobertura que sigue requiriendo revisión humana

El escaneo de enlaces externos encuentra 57 URLs alcanzables y 25 no verificables por bloqueos, certificados o timeouts; no encuentra 404/410. El escaneo editorial es un inventario de frases variables, importes, urgencia y plazos; no convierte las coincidencias en errores automáticos. La conformidad WCAG completa, contraste con hardware real, lector de pantalla y rendimiento de campo necesitan una ronda manual. Los enlaces externos que devuelven 403 o timeout quedan documentados como no verificables por el bot, no como enlaces rotos.
