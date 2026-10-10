# Libro de ciclos

El integrador es el único que reescribe este archivo. Los otros agentes lo leen y dejan el estado en su informe.

- Ciclo en curso: ninguno
- Último release activado por este bucle: /srv/tenants/slot2/releases/20261010T125117Z
- Bloqueo de deploy: no

## Seguridad

- S1 hecho
- S2 hecho
- S3 hecho
- S4 hecho
- S5 hecho
- S6 pendiente

## Contenido y front

- F0 hecho
- F1 hecho
- F2 hecho
- F3 hecho
- F4 pendiente
- F5 pendiente
- F6 pendiente
- E1 hecho
- E2 pendiente
- E3 pendiente
- E4 pendiente
- E5 pendiente
- E6 pendiente
- E7 pendiente
- E8 pendiente
- E9 pendiente
- E10 pendiente
- E11 pendiente
- E12 pendiente
- E13 pendiente
- E14 pendiente
- E15 pendiente
- E16 pendiente
- E17 pendiente
- E18 pendiente
- E19 pendiente
- E20 pendiente
- E21 pendiente
- E22 pendiente
- E23 pendiente
- E24 pendiente
- E25 pendiente
- E26 pendiente
- E27 pendiente
- E28 pendiente
- E29 pendiente
- E30 pendiente
- E31 pendiente
- E32 pendiente
- E33 pendiente
- E34 pendiente
- E35 pendiente
- E36 pendiente

## SEO / GEO

- G1 hecho
- G2 hecho
- G3 hecho
- G4 hecho
- G5 hecho
- G6 hecho

## Historial

- 2026-10-10: plan creado. Aún no hay ciclo ejecutado por este bucle.
- 2026-10-10: ciclo-1 cerrado sin release. S1, F1 y G1 quedan hechos tras leer el diff: cabeceras en `next.config.ts` y `tests/security-headers.test.ts` (2); nav y CTA en `SiteNav.tsx` y `tests/front-chrome.test.tsx` (9); prueba de `GET /llms.txt` en `tests/seo-geo-mega.test.ts`. Vitest pedido: 44 en verde (security-headers 2, front-chrome 9, seo-geo-mega 12, wizard 5, seo-geo 11, search-index 5). `npx tsc --noEmit` falla solo en `tests/audit-seo-geo-20260922.test.ts:105` (TS2345); no se tocó ni se debilitó. No hubo `ACTIVE=`, ni IndexNow, ni cifra de impresiones o indexación. El árbol sobre `a2f3fee` no permitió un commit acotado.
- 2026-10-10: el orquestador corrige el tipo de `sum` en `tests/audit-seo-geo-20260922.test.ts`. Las filas de consulta tienen `impressions` y no `clicks`; la suma sigue leyendo el campo pedido. `npx tsc --noEmit` pasa. El release queda para el ciclo siguiente, con las mismas compuertas.
- 2026-10-10: el ciclo 2 se canceló al cerrarse la sesión, antes de integrar. Se relanza con F0 (logo tipográfico) y E1 (portada) en el mismo corte de contenido.
- 2026-10-10: ciclo-3 integrado y publicado. S2 ya estaba en código (cupo 120 por proceso, sin identificar al cliente; 403, 413 y 400 en `src/app/api/metricas/route.ts`). S3: `GET` y `POST` de `/api/indexnow` responden 405 con cuerpo vacío y no llaman a la red; la clave pública sigue en `src/lib/seo/crawlers.ts` y en los txt de `public/`; el envío queda en `scripts/ping-indexnow.mjs`. F0: cuadrado de 28 px en la cabecera y en Open Graph; `icon.tsx` no se reescribió. E1: el atajo de portada pasa a `/extranjeria`; el formulario de búsqueda se queda; las cuatro tarjetas copian una frase de las guías ya publicadas (`content/escenarios/sin-contrato.md`, `con-contrato.md`, `extranjeros-no-ue.md`, `volante-vs-certificado.md`); DNI 12 € y pasaporte 30 € sin cambio. G1, G2 y G3 ya estaban hechos. G4 no: `PilarView` no enlaza las fichas de Madrid, Barcelona ni València; no se tocó `noindex` ni se borró ninguna URL. `npx tsc --noEmit` pasa. Vitest: 35 en verde (security-headers 5, front-chrome 9, wizard 5, seo-geo 11, search-index 5). Release `ACTIVE=/srv/tenants/slot2/releases/20261010T125117Z` (anterior `20261009T063547Z`), build `4IgQRJo8sS53wvru3y7-A`, SHA-256 del manifiesto `7be6dc88437397879d8e04bc50b3671027841a714942e17945d8ec2e4210d588`. La home pública respondió 200 con la marca y el atajo a Extranjería. El sitemap público respondió 200 con 267 URL. IndexNow devolvió HTTP 200 al enviar 14 URL; no hay cifra de impresiones ni de indexación. Caddy no se reinició.
- 2026-10-10: ciclo-4 integrado sin release. S4: el lock queda en sharp 0.35.5 y @img/sharp-libvips-linux-x64 1.3.4; `tests/security-deps.test.ts` pasa. No se volvió a ejecutar `npm audit`. S5: `release_skipped` deja `servidor.env`, `token.json`, `client_secrets.json` y claves fuera de la huella y del tar; `tests/security-secrets.test.ts` pasa, sin valores impresos. S6 no se hizo. F2: la guía `/dni/renovar-caducado` usa rejilla de 1120 px, índice de 246 px, hueco de 40 px y lectura de 802 px; a 390 px el interior es 358 px. F3: title y h1 de `/empadronarse` son «Empadronarse en España: documentos y pasos»; `/dni` no se tocó en este informe. G4: el hub enlaza Madrid, Barcelona y València con href relativo y no cambia su robots. G5: origen canónico `https://rutatramite.com`; `.es` se reescribe en `SITE_ORIGIN`, `absoluteUrl`, el sitemap de Python y las listas de IndexNow. G6: los agentes no dispararon IndexNow. `npx tsc --noEmit` pasa. Vitest local: 49 en verde (security-deps 1, security-secrets 1, front-chrome 11, wizard 5, seo-geo 13, seo-geo-mega 13, search-index 5). El build `slot2-build-20261010T132101Z` (`/srv/tenants/slot2/builds/20261010T132101Z`) falló en `npm test`: `tests/seo-geo.test.ts` hace `spawn python` y el VPS responde ENOENT (1 fallo, 285 pasaron, 3 omitidas). No hubo `LINUX_BUILD_OK` ni `ACTIVE=`. No se activó, no se reinició Caddy y no se envió IndexNow. Tras el fallo, el symlink sigue en `/srv/tenants/slot2/releases/20261010T125117Z` y `slot2-app.service` sigue active. No hay cifra de impresiones ni de indexación.
