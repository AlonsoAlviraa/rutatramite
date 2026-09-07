# RutaTrámite

Guía ciudadana para orientarse en trámites frecuentes y empadronarse en municipios de España de 10.000 habitantes o más.

**Producción:** [rutatramite.com](https://rutatramite.com). El servicio está desplegado en un VPS con inquilino aislado. La guía explica la ruta y enlaza a la sede oficial; RutaTrámite no es una Administración Pública y el alta en el padrón es gratuita.

## Entrega actual

- Build activo: `tSaLmQxc_8_5ek2TQNGHB`
- Release activo: `/srv/tenants/slot2/releases/20260907T211050Z`
- Artefacto: `242825216` bytes · SHA-256 `d06bab21848f7d84ac6083bcd4d8906b6441c7f0279ac599bceebacea3eb7ac4`
- Generación: 1.006 rutas HTML, 997 páginas HTML y 228 URLs indexables en sitemap.
- Estado: smoke público, SEO/GEO, enlaces internos, accesibilidad estática, encoding y revisión visual responsive sin incidencias automáticas.

La auditoría consolidada está en [`docs/ESTADO-AUDITORIA.md`](docs/ESTADO-AUDITORIA.md) y [`docs/AUDITORIA-SEO-GEO-UX.md`](docs/AUDITORIA-SEO-GEO-UX.md). La dirección visual y los criterios anti-slop están documentados en [`DESIGN.md`](DESIGN.md), con las referencias de Stitch en [`research/stitch-20260907/`](research/stitch-20260907/).

## Desarrollo local

```bash
npm ci
npm test
npm run build
npm start
```

Para reconstruir datos y sitemaps:

```bash
python scripts/build_municipios.py
python scripts/build_sitemaps.py
```

Auditorías reproducibles:

```bash
node scripts/gen/generate-escenarios.mjs --check
python scripts/release_inputs.py --check
python scripts/audit_accessibility_build.py
python scripts/audit_public_encoding.py
python scripts/audit_external_links.py
```

Stack: Next.js App Router, TypeScript, Tailwind, next-intl (`es`), MiniSearch, Ajv y React Markdown.

## Despliegue

El procedimiento operativo y el rollback están en [`docs/VPS_DESPLIEGUE.md`](docs/VPS_DESPLIEGUE.md). El release anterior se conserva en el VPS para volver atrás si fuera necesario. Los requisitos oficiales, horarios y enlaces externos pueden cambiar; la revisión periódica de esas fuentes sigue siendo una tarea editorial normal.
