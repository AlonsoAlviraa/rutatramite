# Medición de memoria de VisionSetil

El requisito previo actual de 8 GiB de RAM libre se aplica a todas las etapas,
pero no procede de medir cada una. El usuario requiere una solución sin
gasto adicional.

## Cambio preparado

`ops/ci/vision-frontend.sh` limita Vitest a dos trabajadores, tanto para la
suite completa como para los controles de tienda. No se excluyen tests ni
se retiran pasos. La selección de etapas, los límites del contenedor y el
umbral del runner permanecen pendientes de medir el flujo completo.

## Evidencia y alcance

La suite completa de la PR #206 de VisionSetil, SHA
`4f8ea7b2ad400ccc4117415155dc7b69402b36b8`, pasó en un contenedor Linux con
Node 20, dos CPU, máximo de 3 GiB de memoria y sin swap adicional:
183 archivos, 1.384 tests, pico del cgroup de 1.128.484.864 bytes y ningún
evento OOM. Incluye instalación y tests, no compilación ni navegador.

Se prepara otro ensayo del script completo con la imagen Node 22 ya fijada
en `toolchain.lock.json`, porque Capacitor 8 requiere Node 22. La copia
aislada conserva el commit real y el directorio Git para validar los archivos
generados mediante los controles `git diff` existentes. No se suministran
credenciales ni se modifica la aplicación publicada.

## Resultado del ensayo autorizado

El usuario autorizó expresamente el ensayo local el 16 de septiembre.
El tercer intento del script completo terminó con código 0 en 12 minutos
y 46 segundos, con Node 22, dos CPU, límite de 3 GiB y sin swap adicional.
SHA de la aplicación: `4f8ea7b2ad400ccc4117415155dc7b69402b36b8`.

- Tipos, lint, generación SEO y comprobaciones de archivos versionados: pasan.
- Vitest: 1.384 tests en 183 archivos; Node: 14 tests; Python: tres tests.
- Controles de tienda: 17 tests antes y 17 después de la compilación móvil.
- Compilaciones de aplicación, web, edición alemana y móvil: pasan.
- Presupuesto de bundle: pasa. Chromium: 20 tests pasan.
- Pico del cgroup: 3.221.295.104 bytes, aproximadamente 3 GiB.
  `memory.events`: 2.573 eventos `max`, cero `oom` y cero `oom_kill`;
  Docker confirma `OOMKilled: false`. El navegador alcanzó el límite y hubo
  presión de memoria; no se afirma que 3 GiB dejen margen holgado.

Dos fallos de preparación se conservaron antes del intento aprobado:
el primero, CRLF en el script de Windows, corregido con LF y una regla en
`.gitattributes`; el segundo, cinco tests que necesitan la URL sin configurar
pero recibían `VITE_PUBLIC_APP_URL` del runner. Se retira esa variable solo
al ejecutar la suite principal, manteniéndola para compilar. No se cambian
las expectativas ni se omiten tests.

Evidencia en el workspace VisionSetil:
`docs/audits/seo-recovery-2026-09-15/ci-build-profile-20260916-attempt{1,2,3}.{json,log}`.
Contenedor final: `visionsetil-ci-build-20260916-r3`, detenido al terminar.

## Alcance y comprobaciones pendientes

Este resultado valida el script `vision-frontend.sh` modificado, no todos
los jobs de Jenkins. Su condición para lanzar `test:german` no se cumplió:
`sites/pilzbestimmung.com/scripts/validate-site.mjs` no existe en este SHA.
La compilación alemana sí pasó; su suite específica de navegador no se
cuenta como ejecutada. Backend, seguridad, Android/Gradle, publicación,
rollback y PR #205 no quedan validados por este ensayo.

- Sintaxis Bash del script modificado comprobada.
- La ejecución de las pruebas de infraestructura en Windows terminó con
  39 pruebas, un fallo y seis errores: hay módulos POSIX, enlaces simbólicos
  sin privilegios y una comparación de separadores de rutas. Ese resultado
  se conserva como fallo; no equivale a la suite Linux aprobada previamente
  y no se han modificado sus criterios para hacerlo pasar.
- No se ha sustituido el runner activo ni declarado aprobadas las PR de
  aplicación. Se puede dimensionar la etapa frontend usando esta evidencia,
  conservando las restantes etapas pendientes y la presión de memoria medida.
  El runner actual usa Node 20 para frontend; el ensayo aprobado usó Node 22.
