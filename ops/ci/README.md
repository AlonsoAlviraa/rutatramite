# CI privada: RutaTrámite y VisionSetil

Estado: migración en validación; GitHub Actions todavía habilitado. No activar el corte hasta completar la lista de aceptación de este documento.

Actualización del 15 de septiembre: App configurada y validada en PC/VPS; clonación de ambos repositorios privados y estados de autenticación comprobados. Refresco periódico de fuentes instalado y ejecutado correctamente. 49 pruebas de infraestructura aprobadas. Las suites pesadas siguen esperando RAM; webhook, despachador y corte pendientes. [Evidencia y límites](../../docs/CI-GITHUB-APP-20260915.md).

GitHub conserva código y propuestas. Jenkins vive en el VPS existente, en <https://ci.rutatramite.com/>, y los trabajos pesados se ejecutan en contenedores Linux del PC Windows. No se ha contratado ningún servicio adicional. El PC necesita estar encendido y con la sesión de Mariano iniciada; si no está disponible los trabajos esperan. Publicar, revertir, cambiar Caddy y generar Android son operaciones manuales. No se sube automáticamente a Google Play.

## Componentes instalados

| Componente | Configuración |
| --- | --- |
| Controlador | Jenkins 2.568.3, Java 21, cero ejecutores, máximo 1.5 GiB y una CPU |
| Acceso | HTTPS privado, registro deshabilitado, sin lectura anónima, noindex |
| Windows | `windows-ci`, un ejecutor, WebSocket, tarea `RutaCI-Agent` al iniciar sesión |
| Etapas de PR VisionSetil | Docker, dos CPU, máximo 3 GiB sin swap adicional; mínimo de 2 GiB libres en Windows y 20 GiB de disco. Frontend medido; las demás etapas se validan con ese límite |
| Otros trabajos pesados | Conservan seis CPU, 6 GiB y reserva previa de 8 GiB libres; no se declaran dimensionados por el ensayo de frontend |
| Comprobaciones ligeras | `vps-probe`, usuario sin sudo, 512 MiB, media CPU; Node 22/Python 3.12 del VPS |
| Eventos | Firma HMAC-SHA256, dos repositorios permitidos, SHA exacto, propuestas del mismo repositorio |
| GitHub App | `RutaTramite VisionSetil CI`, App 4945898, instalación 161748368 |
| Permisos App | Código/metadatos/PR de lectura, estados de commit de escritura |
| Retención | Logs y resultados 30 días; paquetes publicados, AAB y recibos en archivo independiente |
| Recuperación | Copia diaria 03:30 UTC, siete copias VPS; copia al PC a las 07:00 y al iniciar sesión |

Las versiones de imágenes, dependencias Windows y plugins están en los archivos `*.lock.*`. El controlador ejecuta definiciones administradas; no ejecuta Jenkinsfiles aportados por una propuesta. Los contenedores de prueba no reciben el socket Docker, el perfil del usuario ni las credenciales de GitHub. Android recibe la firma únicamente para el SHA actual de main; comprueba además la huella del certificado histórico.

## Equivalencia con Actions

Actualización del 16 de septiembre: el frontend usa Node 22, dos procesos
Vitest y URL de producción fuera de las pruebas del estado sin configurar.
Las mediciones de cada etapa quedan en `ci-results/resources-*.json`.
Los resultados de CI se excluyen localmente de Git para no marcar como
modificado el código con el que se genera el manifiesto de publicación.

La compilación web se conserva antes de generar la versión móvil, que
reutiliza `dist-app` y elimina sus archivos SEO. Tras validar la versión
móvil se restaura el paquete web; el empaquetado exige manifiesto del SHA
esperado, sitemap y portada prerenderizada. Las pruebas comprueban que
la salida nativa no sustituya a la web que se va a publicar.

| Workflow anterior de VisionSetil | Sustitución |
| --- | --- |
| `ci.yml` | `visionsetil-pr`, `visionsetil-full` |
| `deploy-frontend-production.yml` | `visionsetil-publish`, paquete de una ejecución completa aprobada |
| `mobile-android-release.yml` | `visionsetil-android`, AAB firmado conservado en el PC |
| `mobile-ios-smoke.yml` | Pendiente de Mac; no se declara compilación iOS en Windows |
| `production-journeys.yml` | `visionsetil-journeys`, navegadores en el PC |
| `production-operational-probe.yml` | `visionsetil-operational`, VPS |
| `species-index-join-nightly.yml` | `visionsetil-species`, VPS; informe, no garantía de cobertura |
| `reload-caddy-manifest-mime.yml` | `visionsetil-caddy`, manual, con comprobaciones y restauración |

RutaTrámite añade `rutatramite-pr`, `rutatramite-full`, `rutatramite-publish` y `rutatramite-rollback`. Los temporizadores existentes de Search Console y crecimiento siguen independientes. Los horarios nuevos de comprobación aún están desactivados para evitar duplicarlos con Actions.

## Uso

1. Para comprobar una propuesta, indicar SHA y BASE_SHA completos. `SOURCE=github` usa la App; `SOURCE=local` queda reservado para validar la migración. Cambios compartidos o una base ausente ejecutan todas las comprobaciones pertinentes.
2. Antes de publicar, ejecutar `<repositorio>-full` contra el SHA actual de main. El resultado tiene que ser SUCCESS, con todas las etapas aprobadas y paquete SHA256 verificado.
3. Cuando el usuario pida publicar, abrir `<repositorio>-publish`, indicar el número de esa ejecución y seleccionar la operación. `preview` verifica y extrae el paquete, arranca un servidor aislado en loopback, comprueba sus respuestas HTTP y lo detiene dejando un recibo. `publish` activa exactamente el paquete, comprueba salud y restaura el anterior si falla. La previsualización de VisionSetil comprueba los archivos estáticos y la portada prerenderizada; los recorridos, la API y las reglas de rutas de producción se validan aparte.
4. Para revertir, ejecutar `<repositorio>-rollback`; exige el recibo completo de la última publicación válida y que su versión siga activa. Comprueba la identidad de la versión anterior y la servida por HTTP. Si detecta una publicación posterior, rechaza el recibo. Los trabajos manuales comparten el bloqueo de producción/Caddy. Los recibos antiguos sin identidades no se aceptan automáticamente.
5. Para Android, ejecutar `visionsetil-android` con el SHA actual de main. El AAB y la identidad quedan en `C:/Users/Mariano/CI/archive/android`. La subida a Play requiere una operación distinta.

Las sondas usan generaciones inmutables en `/opt/ruta-ci/probe-sources`, con SHA y huellas por archivo. Antes de una ejecución manual, ejecutar desde el PC `python ops/ci/upload_probe_sources.py --sha <SHA-actual-de-main>` con el intérprete de `CI/runtime`; la herramienta contrasta main en GitHub antes y después de preparar el paquete. El job fija una generación y rechaza una confirmación de más de diez minutos. `SOURCE_SHA` permite exigir un commit concreto; `REQUIRE_IDENTIFY_AVAILABLE` conserva la opción equivalente del workflow anterior. El publicador de VisionSetil actualiza también las sondas después de validar el paquete y antes de activarlo.

El refresco periódico con la App está instalado y activo mediante `probe_refresh.py --github` y `ruta-ci-probe-refresh.service/.timer`; su ejecución real pasó el 15 de septiembre. Los horarios de las dos sondas siguen apagados. No se presenta la actualización manual como sincronización automática ya operativa. [Ensayos y resultados](../../docs/CI-PROBES-20260915.md).

## Rutas y recuperación

El directorio del PC es `C:/Users/Mariano/CI`; el del servidor es `/opt/ruta-ci`. Las credenciales están exclusivamente en sus carpetas privadas `secrets`. La contraseña del panel está en `secrets/jenkins-password` del PC. No pegar contraseñas, PEM, keystore ni copias de recuperación en GitHub o en comentarios.

`ssh_transport.py` carga `secrets/vps.json` y `secrets/known_hosts`: rechaza claves de host desconocidas. Ya no depende de los scripts temporales del proyecto original. En otro PC hay que restaurar estos archivos privados y sus permisos, instalar las dependencias fijadas y ajustar las rutas de las tareas.

`sync_backup.py` descarga una pareja de copias con la misma fecha, valida la extracción segura, las configuraciones XML de todos los trabajos y la presencia de la clave maestra separada. Guarda el recibo en `archive/controller/latest-verified.json`. Esta prueba todavía no acredita el arranque de un controlador restaurado.

`sudo python3 /opt/ruta-ci/config/restore_boot.py AAAAMMDDTHHMMSSZ.tar.gz` ensaya adicionalmente el arranque de una pareja existente en un contenedor sin red. Aparta cola, agentes e historiales exclusivamente en la copia temporal, deshabilita trabajos y valida plugins, configuraciones, acceso HTTP y una clave ya presente en esa copia. Detiene el contenedor y retira la copia al aprobar. El ensayo del 15 de septiembre pasó con 14 trabajos y 71 plugins; [recibos y límites](../../docs/CI-RESTORE-20260915.md). No prueba la reanudación de ejecuciones antiguas ni conecta agentes reales.

Para una recuperación real: detener el controlador, conservar su directorio averiado, restaurar `jenkins` y `config` de la copia de metadatos, restaurar `jenkins-master.key` como `jenkins/secrets/master.key` y las credenciales del paquete privado en `secrets`, restaurar propietarios y permisos, y arrancar Compose desde `/opt/ruta-ci/config`. Reponer los servicios systemd de agente, webhook y copia, y verificar acceso, agentes, eventos y una ejecución de aceptación antes de reactivar horarios. Usar las versiones fijadas del controlador y plugins. Nunca sobreescribir el Jenkins activo para ensayar una recuperación.

Los scripts `provision_*.py` generan solicitudes administrativas revisables en `CI/migration`; no se ejecutan desde propuestas. `jenkins_api.py` permite aplicarlas por el canal administrativo del VPS. La definición manual de Caddy instalada también está conservada en las copias del controlador. `archive_actions.py` descarga artefactos de Actions, verifica ZIP y SHA256, y no borra originales.

## Validación y corte pendiente

- [x] HTTPS, acceso privado y agentes conectados.
- [x] Ejecución de aceptación correcta; fallo deliberado visible y recuperación de cola tras reinicio.
- [x] Pruebas de HMAC, selección de etapas, retención, paquete manipulado, escape de archivo y restauración del enlace anterior en un entorno temporal.
- [x] Comprobación operativa y catálogo ejecutados en el VPS.
- [x] 595 artefactos de Actions descargados y verificados, 621450302 bytes; ninguno eliminado.
- [x] Copia independiente al PC y extracción de 14 configuraciones; claves separadas.
- [x] App instalada únicamente en los dos repositorios.
- [x] Descargar/configurar la clave de la App y validar acceso desde PC/VPS.
- [ ] Revocar las claves anteriores inaccesibles tras identificar la válida en GitHub.
- [x] Validar clonación privada y estado de commit con tokens limitados por repositorio.
- [ ] Validar entrega real de webhook de GitHub.
- [ ] Ejecutar PR, suites completas de ambos proyectos, recorridos públicos y Android firmado. Falta RAM disponible en el PC.
- [x] Servidor real de preview instalado y ensayado con los paquetes publicados de ambos proyectos. [Alcance y recibos](../../docs/CI-PREVIEW-20260915.md). Pendiente encadenarlo a una ejecución completa de Jenkins aprobada del main vigente.
- [x] Arranque aislado de una copia restaurada, plugins, cuenta y descifrado de clave respaldada comprobados.
- [x] Motor de rollback ensayado con Node, Caddy, enlaces y reinicios reales en entornos aislados: seis casos aprobados, con versiones publicadas y fallos provocados. [Alcance](../../docs/CI-ROLLBACK-20260915.md).
- [ ] Completar la publicación y reversión desde Jenkins de un paquete aprobado del main vigente; los ensayos aislados no sustituyen esa aceptación.
- [x] Generaciones de sondas verificadas y cambio atómico instalados; ambas sondas ejecutadas en Jenkins con `4242986869d59b9abc6d218b6cfeaafea1a5ea13`. El publicador incorpora la actualización previa.
- [x] Instalar y ejecutar el refresco periódico con la App.
- [ ] Encadenar el refresco al corte de horarios; la integración de publicación sigue pendiente de aceptación completa.
- [ ] Agrupar trabajos obsoletos por propuesta y reconciliar entregas de webhook que quedaron en estado `dispatching`.
- [ ] Revisar/confirmar los cambios de código, publicar las ramas y validar los checks de sus commits exactos.
- [ ] Refrescar el archivo de artefactos, esperar las ejecuciones activas, activar los horarios equivalentes y deshabilitar Actions en ambos repositorios.
- [ ] Eliminar workflows y artefactos/cachés antiguos solo después del corte aceptado y de conservar la recuperación necesaria. Borrar archivos no devuelve los minutos ya consumidos.

La línea base de RutaTrámite coincide con los 1097 archivos de entrada de la versión publicada `KV7Uq4eM6hwFir1Irn3wO`, huella `4f5162a6bc4d126bf459b0ab13c833080b89e278931983602e9df154362c466c`. `docs/ci-main-only-inputs.json` documenta los 21 archivos presentes en el main anterior que no formaban parte de esa publicación. Sus originales siguen en Git y en la carpeta compartida. No publicar el main antiguo sin integrar la línea base revisada.

La revisión de secretos encontró 26 alertas: 24 versiones públicas de plugins y dos referencias a la clave pública IndexNow, comprobadas contra el archivo servido. Se conserva el informe bruto en `CI/migration/migration-gitleaks.json`; no se han rebajado las reglas para ocultarlo.

## Entregas de webhook preparadas

`dispatch.py` conserva la intención en SQLite antes del envío. `dispatch.groovy` consulta y modifica la cola bajo el bloqueo de Jenkins, reconoce el evento en cola o en ejecuciones existentes, y sustituye exclusivamente comprobaciones automáticas de la misma propuesta/rama. Un orden persistente evita que una reconciliación antigua sustituya una entrega más reciente. La API de GitHub confirma además que el SHA, la base y el estado de la propuesta siguen vigentes antes de encolarla.

Las intenciones antiguas sin contexto de propuesta solo se concilian si sobrevive evidencia en Jenkins; una ausencia no autoriza un relanzamiento. Los archivos `ruta-ci-reconcile.service` y `.timer` preparan una revisión cada cinco minutos. La autenticación ya está validada. Siguen pendientes su instalación, el registro de los tres parámetros nuevos de los jobs y el cambio del receptor. La casilla de cola permanece pendiente por ese motivo.

La base de aplicación se amplió posteriormente con la corrección de licencia de Google, publicada como `mc2BEFYMW13Izl_iG8j50`. El estado y las huellas vigentes están en `docs/ESTADO-AUDITORIA.md`; el párrafo anterior sobre los 1097 archivos documenta la base inicial de la migración.
