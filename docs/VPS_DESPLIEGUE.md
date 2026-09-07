# Despliegue de RutaTrámite

Estado comprobado el 7 de septiembre de 2026: producción `https://rutatramite.com`, servicio `slot2-app.service` activo y release `/srv/tenants/slot2/releases/20260907T211050Z` desplegada. El procedimiento de subida, preview, activación atómica y rastreo público ya se ejecutó para el build `tSaLmQxc_8_5ek2TQNGHB`; este documento conserva los pasos reproducibles para la siguiente release.

## Aislamiento

- Raíz: /srv/tenants/slot2
- Servicio: slot2-app.service; usuario slot2; working directory /srv/tenants/slot2/app.
- Runtime: /usr/bin/node server.js, con PORT=8100 y escucha local.
- El enlace app apunta a releases/<fecha>.
- No cambiar VisionSetil, Caddy ni otros servicios para actualizar esta aplicación.

## Preparación y verificación

Trabajar desde la carpeta TRAMITE. El helper SSH existente está en ../VISIONSETIL/tmp/vps.py; se ejecuta con ../VISIONSETIL/.venv-ci/Scripts/python.exe. Lee su configuración privada internamente. No imprimir ni copiar credenciales a informes.

1. Terminar los cambios y generar public/sitemap.xml con python scripts/build_sitemaps.py.
2. Ejecutar las pruebas y next build con NEXT_PUBLIC_SITE_URL=https://rutatramite.com. El directorio habitual es .next; NEXT_DIST_DIR permite un build aislado.
3. Esperar la salida correcta del proceso de build. Verificar el asistente y las plantillas en navegador.
4. Ejecutar python -u scripts/audit_build.py --build-dir .next --output docs/audit-build-release.json. No sobrescribir ese directorio mientras se audita.
5. Crear el tar con python scripts/pack_release.py --build-dir .next. El script usa una carpeta temporal nueva, conserva el nombre real del directorio de build e incluye standalone, static, public, data y content. Su manifiesto queda en docs/release-manifest.json.
6. Confirmar que no haya cambios de fuente o datos posteriores al build. Revisar el contenido del tar y probar su server.js antes de activarlo.

## Transferencia y activación

Subir mediante el helper put el archivo indicado por release-manifest.json a una ruta nueva /tmp/rutatramite-<identificador>.tar. Subir scripts/activate_release.sh a /tmp/rutatramite-activate.sh.

Antes de activar, validar la sintaxis del script en el VPS con bash -n /tmp/rutatramite-activate.sh. Después ejecutar bash /tmp/rutatramite-activate.sh /tmp/rutatramite-<identificador>.tar <sha256-del-manifiesto>.

El script verifica el hash, comprueba que app sea un enlace dentro del árbol de releases, extrae a un directorio nuevo y cambia el enlace mediante mv -Tf. Conserva la versión anterior. Si falla el arranque o la comprobación HTTP local, restaura el enlace anterior y reinicia solamente slot2-app.service. No borra releases ni reinicia Caddy.

## Comprobación posterior

- Comprobar la portada, guía, ficha municipal y asistente en https://rutatramite.com.
- Rastrear producción con python scripts/audit_site.py --base https://rutatramite.com --output docs/audit-production-after.json.
- Verificar HTTP a HTTPS, www a dominio principal, robots.txt, sitemap.xml y los 404 previamente detectados.
- Registrar versión activa, hash, resultados del rastreo y cualquier limitación de rendimiento o accesibilidad.
- La existencia de un script de reversión no demuestra que ya se haya ejecutado o probado en producción.
