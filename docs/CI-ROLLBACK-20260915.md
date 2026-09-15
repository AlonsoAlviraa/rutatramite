# Reversión e identidad de publicación: 15 de septiembre de 2026

Instalado `activate.py` con protección contra recibos antiguos y verificación de la identidad servida. Pasaron 48 pruebas de infraestructura Linux y seis casos con servicios reales en el VPS. Los enlaces públicos de RutaTrámite y VisionSetil conservaron sus versiones durante ambos ensayos.

## Cambio

El rollback exige un recibo de publicación completada con esquema `ruta-ci.activation.v2`, SHA, digest e identidades anterior y activa. Verifica que la versión activa siga siendo la del recibo y que el destino esté dentro del proyecto y conserve su identidad. No reutiliza automáticamente recibos antiguos sin esos datos.

La comprobación HTTP de RutaTrámite contrasta el identificador Next del HTML con `.next/BUILD_ID`. VisionSetil contrasta el SHA del manifiesto servido. HTTP 200 por sí solo ya no basta. Si durante un fallo se observa otra publicación activa, la recuperación se niega a sustituirla. Las pruebas unitarias incluyen esa interferencia, un recibo obsoleto, un destino modificado y respuestas 200 de otra versión.

Se escribe un recibo de operación antes de actuar; su actualización usa archivo temporal y sustitución atómica. Los fallos conservan el error y el enlace observado. `last-success.json` solo se actualiza al completar una publicación. El bloqueo de CI serializa sus operaciones; este ensayo no demuestra coordinación con publicadores externos que no respeten ese bloqueo.

## Ensayo con servicios reales

`rehearse_rollback.py` preparó dos entornos aislados con paquetes ya publicados, puertos exclusivamente locales y métricas temporales. Usó enlaces duros para los archivos de lectura y copias privadas para la caché de Node; no modificó los archivos compartidos de origen. No ejecutó el publicador sobre los enlaces públicos.

| Proyecto | Reversión comprobada por HTTP | Otros casos |
| --- | --- | --- |
| RutaTrámite | `mc2BEFYMW13Izl_iG8j50` → `KV7Uq4eM6hwFir1Irn3wO` | Recibo obsoleto rechazado; salida real de Node con código 7 y recuperación automática |
| VisionSetil | `4242986869d59b9abc6d218b6cfeaafea1a5ea13` → `6e6c774119790b3c98d36c7808242edc73d822a4` | Recibo obsoleto rechazado; portada ausente con 404 real de Caddy y recuperación automática |

La primera pasada y la final terminaron correctamente. La repetición final corresponde al código con las protecciones añadidas, cuya huella se conserva en el recibo y coincide con la instalada. Se detuvieron los servicios temporales y se retiraron sus directorios. Los errores provocados permanecen en los logs; no se presentan como errores de producción.

Recibos: [primer ensayo](ci-rollback-first-20260915.json), [ensayo final](ci-rollback-final-20260915.json), [Node](ci-rollback-final-rutatramite-20260915.log), [Caddy](ci-rollback-final-visionsetil-20260915.log), [48 pruebas](ci-rollback-tests-20260915.log), [instalación](ci-rollback-install-20260915.json).

Falta el flujo completo de publicación y reversión desde Jenkins de una suite aprobada del main vigente. No hay todavía `last-success.json` de una publicación realizada mediante este publicador CI. Los ensayos no acreditan esa aceptación, ni suites completas, Android o corte de Actions.

## Autenticación

El navegador volvió a conectar y se confirmó el acceso a la configuración de GitHub. La generación de una nueva clave añadió una segunda clave a la App, pero Chrome bloqueó su descarga con `ERR_BLOCKED_BY_CLIENT`. No se recuperó ningún PEM ni se eludió el bloqueo. Se dejó abierta la página y se pidió al usuario descargar una clave manualmente e indicar solo su ruta. Las dos claves inaccesibles deberán revocarse después de comprobar la clave operativa; no se han cambiado permisos ni habilitado eventos.
