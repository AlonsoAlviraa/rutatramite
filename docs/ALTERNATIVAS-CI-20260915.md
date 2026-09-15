# Alternativas de CI y revisión de los Markdown — 15 de septiembre de 2026

La recomendación actual es conservar Jenkins y resolver su autenticación y capacidad de ejecución. Es una valoración basada en el sistema ya instalado y en el objetivo de salir totalmente de GitHub Actions. No se ha instalado una segunda plataforma ni cambiado el método de autenticación a raíz de esta comparación.

«Wildfire» no ha quedado identificado como una herramienta concreta de CI en los documentos revisados ni en la búsqueda realizada. Se ha solicitado el enlace o nombre completo. Windmill se compara como posibilidad, sin asumir que sea el producto al que se refiere el usuario.

| Opción | Cuota de minutos de GitHub | Autenticación y trabajo pendiente | Encaje en este proyecto |
| --- | --- | --- | --- |
| Jenkins existente | Las pruebas ejecutadas fuera de Actions no usan sus runners | Terminar la integración. La GitHub App actual requiere su PEM; Jenkins también admite tokens y claves SSH, por lo que el PEM no es una exigencia universal de Jenkins | Conserva los 14 trabajos, los paquetes y el procedimiento preparado. Opción recomendada si se mantiene la salida total de Actions |
| Actions con runners propios | La documentación vigente de GitHub indica uso gratuito de runners propios; almacenamiento de Actions tiene reglas separadas | Registrar y mantener runners; conservar workflows de Actions | Menos migración para reducir minutos, pero mantiene dependencia de Actions y no cumple la salida total solicitada |
| Woodpecker | Un despliegue propio puede ejecutar CI fuera de Actions | Su integración GitHub documentada usa una OAuth App; habría que crearla y trasladar pipelines, publicación, firma y recuperación | Alternativa de CI a evaluar si se quiere sustituir Jenkins; no elimina la necesidad de credenciales ni de recursos para compilar |
| Windmill, si era el nombre pretendido | Sus workers propios pueden ejecutar tareas fuera de Actions | Añade servidor, workers y PostgreSQL. Git Sync tiene opciones mediante su integración GitHub y también mediante CI externo | Apropiado para automatizaciones, pero sustituir la CI instalada exige reconstruir y verificar las garantías de publicación, firma y recuperación |
| Archivos Markdown de documentación | No ejecutan pruebas por sí mismos | Documentan procedimientos y decisiones | Útiles para mantener contexto; no sustituyen un ejecutor |
| GitHub Agentic Workflows en Markdown | Se compilan en workflows que ejecuta Actions | `gh aw compile` genera `.lock.yml`; también se necesita configurar el motor de IA | No elimina la dependencia de Actions ni garantiza eliminar su consumo |

Fuentes primarias: [facturación de Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions), [credenciales admitidas por Jenkins](https://www.jenkins.io/doc/book/using/using-credentials/), [GitHub en Woodpecker](https://woodpecker-ci.org/docs/administration/configuration/forges/github), [arquitectura propia de Windmill](https://www.windmill.dev/docs/advanced/self_host), [integración Git de Windmill](https://www.windmill.dev/docs/integrations/git_repository), [compilación de workflows Markdown de GitHub](https://github.github.com/gh-aw/reference/compilation-process/).

## Evidencia local que condiciona la decisión

Se revisaron `ops/ci/README.md` de RutaTrámite, `docs/CI-MIGRATION.md` de VisionSetil y los textos preparados para las dos propuestas. Los documentos anteriores describían una migración en validación; no acreditaban un corte terminado.

La lectura actual de Jenkins confirmó que `rutatramite-full #1` terminó `ABORTED`. No se ha tratado como un proceso vivo ni se ha reiniciado ciegamente. `visionsetil-full #1`, Android y recorridos mantenían ejecuciones abiertas esperando al agente Windows desconectado.

Se inició la tarea existente `RutaCI-Agent`. Jenkins confirmó después `windows-ci` conectado y asignó de nuevo su ejecutor a `visionsetil-full #1`. El proceso de esa ejecución está vivo y conserva el estado `waiting_resources`; su log explica que aún no ha comenzado ninguna prueba. La medición posterior del PC dio **3,73 GiB disponibles**, frente a la reserva requerida de **8 GiB**. No se ha reducido ese requisito ni detenido aplicaciones ajenas.

El usuario confirmó que no ha descargado la clave privada de la App. La configuración `CI/secrets/github-app.json` tampoco existe. El método elegido aún no puede acreditar checkout privado, estados y eventos reales. Un token limitado podría sustituirlo con cambios concretos de implementación y validación; no se ha reutilizado silenciosamente una credencial personal de alcance amplio.

## Trabajo de cola preparado durante la revisión

Se implementó identificación persistente de entregas, consulta idempotente de la cola y ejecuciones de Jenkins, sustitución de revisiones anteriores de una misma propuesta, separación entre propuestas/repositorios y recuperación de respuestas perdidas. La recepción tiene un número de secuencia persistente. Una comprobación adicional consulta la revisión vigente en GitHub para rechazar primeras entregas que lleguen fuera de orden.

La suite de infraestructura pasó **28 pruebas en Linux**. El algoritmo Groovy pasó **ocho escenarios en el controlador real**, usando dos trabajos de prueba sin ejecutores disponibles ni acceso a código de las aplicaciones: envío inicial, repetición, separación de propuestas, sustitución, rechazo de una revisión anterior, duplicado simultáneo, separación de repositorios y negativa a relanzar un intento antiguo sin evidencia.

Los primeros ensayos locales detectaron conexiones SQLite abiertas; se corrigió su cierre. El conjunto completo requiere Linux por `fcntl`; su ejecución aprobada se hizo allí. Los ensayos reales previos y finales se conservan por separado en `CI/migration`.

**Implementado y probado, todavía no instalado en el receptor activo.** La nueva consulta de revisión a GitHub requiere resolver la autenticación. Los archivos del temporizador de reconciliación están preparados, pero no habilitados. La revisión de alternativas solicitada no se interpreta como autorización para eliminar la infraestructura existente ni como elección de otra plataforma.

Siguen pendientes la integración real, las suites completas y AAB con recursos suficientes, previsualización real, arranque de recuperación, actualización atómica de sondas, validación de los commits finales y corte de Actions. Cambiar de controlador no acredita ninguno de esos resultados por sí solo.


La previsualizaci?n real se instal? y ensay? despu?s con los paquetes publicados: 258 p?ginas y 33 PDF de RutaTr?mite, 1.252 p?ginas est?ticas de VisionSetil y 34 pruebas de infraestructura aprobadas. [Alcance, instalaci?n y limitaciones](CI-PREVIEW-20260915.md).


Actualizaci?n posterior: la cach? de previsualizaci?n ya regenera en una copia temporal (35 pruebas de infraestructura aprobadas) y el arranque de una copia restaurada pas? con 14 trabajos, 71 plugins, autenticaci?n y clave recuperada. Los registros anteriores describen el estado de cada ensayo. [Restauraci?n y l?mites](CI-RESTORE-20260915.md). El corte de Actions contin?a pendiente.


Las sondas se actualizaron despu?s mediante generaciones verificadas y cambio at?mico; las dos ejecuciones de Jenkins pasaron con el SHA `4242986869d59b9abc6d218b6cfeaafea1a5ea13`, y la suite de infraestructura alcanza 42 pruebas. El refresco peri?dico sigue pendiente de autenticar la App. [Resultados y l?mites](CI-PROBES-20260915.md).


El motor de rollback se corrigi? y pas? seis casos con Node/Caddy reales en entornos aislados, adem?s de 48 pruebas de infraestructura. Falta su aceptaci?n dentro de una publicaci?n completa de Jenkins. Chrome volvi? a conectar, pero bloque? la descarga de una nueva clave; se solicit? la descarga manual al usuario. [Estado y alcance](CI-ROLLBACK-20260915.md).
