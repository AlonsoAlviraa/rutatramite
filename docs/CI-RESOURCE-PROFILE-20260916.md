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

## Estado de validación

- Sintaxis Bash del script modificado comprobada.
- El arranque del ensayo completo fue rechazado automáticamente por la
  herramienta (`blocked by policy`), sin motivo específico comunicado.
  No se creó ni inició su contenedor; se solicitó confirmación concreta.
- La ejecución de las pruebas de infraestructura en Windows terminó con
  39 pruebas, un fallo y seis errores: hay módulos POSIX, enlaces simbólicos
  sin privilegios y una comparación de separadores de rutas. Ese resultado
  se conserva como fallo; no equivale a la suite Linux aprobada previamente
  y no se han modificado sus criterios para hacerlo pasar.
- No se ha sustituido el runner activo ni declarado aprobadas las PR de
  aplicación. Falta medir y validar el script completo antes de dimensionar
  sus recursos y aplicar la configuración.
