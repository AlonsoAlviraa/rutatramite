# Deploy now (slot2) — actualizado 2026-10-31

Este archivo sustituye a la versión de PR #2 (SHA `c4976d3…`), que ya no describe producción.

- **Release activa:** `20261031T141354Z` (tag `20261031T141116Z-mesas2`, build `qNleLJIbC3h2fcyV5zs1-`, commit `70ff8c2`, 479 URLs en sitemap): 20 páginas más de mesa electoral por ciudad y el índice `/elecciones/mesa-electoral-por-ciudad` (25 ciudades en total).
- **Rollback de referencia:** `20261031T133405Z` (anterior: `20261031T112030Z`).
- Raíz en el VPS: `/srv/tenants/slot2` (`app` → `releases/<stamp>`, servicio `slot2-app.service`, puerto 8100).
- No hay credenciales en este repo. Los helpers de acceso leen su propia configuración privada fuera del árbol.

## Reglas
1. **Un solo desplegador.** Antes de nada: `pgrep -af "rel.sh|vps_put|rutina"` debe salir vacío.
2. **Nunca desplegar desde un árbol que no coincida con la release activa.** `python3 scripts/predeploy_check.py` compara `data/ content/ public/` con la release activa (md5) y aborta si falta algún archivo o si el sitemap candidato pierde alguna URL viva.
3. `test ! -L node_modules` (instalar con `npm ci`, nunca enlazar).

## Pasos
```bash
set -e
pgrep -af "rel.sh|vps_put|rutina" && exit 1 || true
python3 scripts/build_sitemaps.py
python3 scripts/predeploy_check.py            # ABORT si árbol viejo o sitemap con menos URLs
npx vitest run
python3 scripts/release_inputs.py
rm -rf .next && npm run build
python3 scripts/release_inputs.py --check
python3 scripts/content_dates.py --html .next/server/app --check   # lastmod = dateModified real
python3 scripts/pack_release.py && python3 scripts/audit_build.py
# subir el tar a /tmp/rutatramite-<TAG>.tar y activate_release.sh, y en el VPS:
sudo bash /tmp/act-<TAG>.sh /tmp/rutatramite-<TAG>.tar <SHA256>
```

## Qué comprueba `activate_release.sh`
- SHA256 del tar, rutas seguras, `server.js`, `public/sitemap.xml`, `data/municipios/_index.json`.
- **Antes de activar:** el sitemap candidato contiene todas las `<loc>` de la release anterior (si no, borra el candidato y sale sin tocar producción).
- **Después de reiniciar:** `/`, `/elecciones`, `/elecciones/tarjeta-censal-cuando-llega`, `/elecciones/programas-electorales-29n` y `/sitemap.xml` deben dar **200** y el sitemap servido debe tener ≥ URLs que el anterior. Si algo falla → rollback automático a la release previa.

## Después
- Verificar en vivo (a través de Cloudflare) las 4 URLs clave y el número de `<loc>`.
- IndexNow solo para las URLs cambiadas; Bing con la cola diaria (cuota 100/día).
- La nueva release pasa a ser la referencia de rollback.
