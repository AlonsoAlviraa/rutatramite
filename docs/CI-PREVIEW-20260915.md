# Previsualización de paquetes CI: 15 de septiembre de 2026

Instalados `activate.py` y `preview.py` en `/opt/ruta-ci/config`, conservando copia anterior y usando el bloqueo de publicación existente. Se mantienen la exigencia de ejecución completa aprobada, SHA vigente de main y huella del paquete en `publish.py`/`release_gate.py`.

Los ensayos arrancaron los paquetes **ya publicados**, mediante el comando de activación en modo preview. No equivalen a una nueva compilación completa de Jenkins ni autorizan el corte de Actions.

| Ensayo | Resultado |
| --- | --- |
| Infraestructura Linux | 34 pruebas aprobadas; incluye fallo deliberado que detiene el servidor y conserva su recibo |
| RutaTrámite, build `mc2BEFYMW13Izl_iG8j50` | 258 páginas del sitemap con metadatos, 31 recursos y 33 PDF con huellas/cabeceras; ruta desconocida 404 |
| VisionSetil, SHA `8505bc583fb9c5e039ef2835bfa8dc1704db1b62` | 1.252 respuestas HTML contrastadas con los archivos del paquete y ocho recursos; identidad del manifiesto comprobada |
| Finalización | Ambos procesos detenidos y ambas versiones de producción conservadas |

Los procesos temporales usan usuario dinámico, sistema de archivos protegido, métricas privadas temporales para RutaTrámite, límite de 512 MiB y duración máxima de diez minutos. Escuchan exclusivamente en loopback. VisionSetil usa otra instancia de Caddy con su interfaz administrativa deshabilitada. No se recarga Caddy de producción. Los recibos identifican unidad, paquete, comprobaciones, logs y finalización.

La prueba de VisionSetil cubre los archivos estáticos y la portada prerenderizada. No reproduce las reglas completas de rutas de producción ni prueba la API o interacciones de navegador. Las suites de aplicación, recorridos y Android siguen pendientes de recursos en Windows.

El log de RutaTrámite conserva cuatro errores `EROFS` al intentar actualizar la caché prerenderizada dentro del paquete protegido y un `NoFallbackError`. Las respuestas exigidas por el ensayo fueron correctas, incluida la ruta desconocida 404; no se ha establecido la causa de ese último mensaje. Esta prueba no acredita persistencia de la regeneración. Queda pendiente ensayar una caché temporal escribible sin modificar el paquete original y revisar el mensaje de fallback. No se han suprimido los logs ni se presentan como libres de errores.

Se retiraron once previsualizaciones desechables del 7 de septiembre, tras comprobar rutas, ausencia de unidades activas y enlace publicado. Se recuperaron aproximadamente 2,8 GiB, suficientes para superar la reserva previa de 10 GiB y ejecutar ambos ensayos. Se conservaron todas las publicaciones y versiones para rollback.

Recibos originales: [RutaTrámite](ci-preview-ruta-20260915.json), [VisionSetil](ci-preview-vision-20260915.json), [instalación](ci-preview-install-20260915.json), [pruebas Linux](ci-preview-tests-20260915.log), [limpieza](ci-preview-cache-20260915.json).

La consulta de Jenkins de las 18:13 UTC mantiene `visionsetil-full #1` abierto, Android y recorridos esperando su ejecutor, y `rutatramite-full #1` terminado como ABORTED. No se han lanzado duplicados. La clave de la GitHub App sigue sin descargarse según la confirmación del usuario. Faltan autenticación/eventos reales, suites completas, arranque de restauración, actualización de sondas, instalación del receptor mejorado y corte final.
