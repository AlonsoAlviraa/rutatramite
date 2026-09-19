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

El primer ensayo registró cuatro errores `EROFS` al intentar actualizar la caché dentro del paquete protegido. Se corrigió el entorno de preview: `preview_runtime.py` copia `.next` y los archivos raíz a un directorio privado temporal y enlaza las dependencias y datos de lectura. La nueva pasada volvió a comprobar las 258 páginas, 31 recursos y 33 PDF; `/recursos`, `/ayudas`, `/becas` y `/alquiler` escribieron su HTML regenerado en la copia, sin errores de caché. La suite de infraestructura pasó 35 pruebas, incluida la conservación del archivo original al escribir en la copia. La corrección quedó instalada a las 18:19 UTC. [Ensayo posterior](ci-preview-cache-fixed-20260915.json), [instalación](ci-preview-cache-install-20260915.json), [pruebas](ci-preview-cache-tests-20260915.log).

Se aisló `NoFallbackError` con peticiones secuenciales: portada 200 sin mensaje, ruta inexistente 404 con mensaje, repetición 404 con mensaje y portada 200 sin mensaje. La ruta `[slug]` usa `force-static` y `dynamicParams=false`; el código compilado lanza ese error cuando no dispone de fallback. Se conserva el log del framework: el mensaje acompaña al 404 deliberado y no acredita un fallo HTTP de las páginas válidas. [Diagnóstico específico](ci-preview-fallback-20260915.json). Este ensayo de cuatro peticiones no se contabiliza como otra auditoría completa.

Se retiraron once previsualizaciones desechables del 7 de septiembre, tras comprobar rutas, ausencia de unidades activas y enlace publicado. Se recuperaron aproximadamente 2,8 GiB, suficientes para superar la reserva previa de 10 GiB y ejecutar ambos ensayos. Se conservaron todas las publicaciones y versiones para rollback.

Recibos originales: [RutaTrámite](ci-preview-ruta-20260915.json), [VisionSetil](ci-preview-vision-20260915.json), [instalación](ci-preview-install-20260915.json), [pruebas Linux](ci-preview-tests-20260915.log), [limpieza](ci-preview-cache-20260915.json).

La consulta de Jenkins de las 18:29 UTC mantiene `visionsetil-full #1` abierto, Android y recorridos esperando su ejecutor, y `rutatramite-full #1` terminado como ABORTED. No se han lanzado duplicados. La clave de la GitHub App sigue sin descargarse según la confirmación del usuario. Faltan autenticación/eventos reales, suites completas, rollback real, actualización de sondas, instalación del receptor mejorado y corte final. El [arranque de restauración](CI-RESTORE-20260915.md) ya pasó.
