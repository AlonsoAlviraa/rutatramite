# Revisión de documentación local de CI — 15 de septiembre de 2026

El usuario aclaró que «Wildfire y distintos mds» se refería a esta carpeta y a otros proyectos de Documentos. No solicitaba comparar una herramienta llamada Wildfire o Windmill. La comparación externa anterior no representa esa petición.

Se localizaron los proyectos en `C:/Users/Mariano/Documents/ALONSOO` y se buscaron referencias de Jenkins, GitHub App, claves privadas y runners propios en su documentación Markdown. Se revisaron además las carpetas de documentación Codex y Cline. La investigación fue de lectura; no se modificaron proyectos ajenos ni se reutilizaron sus credenciales.

| Proyecto o documentación | Resultado pertinente |
| --- | --- |
| WildfireFrontDynamics | `docs/archive/REPO_ANALYSIS.md` describe CI con Actions. Los archivos actuales `.github/workflows/ci.yml` y `codeql.yml` usan `ubuntu-latest`; no aportan una migración a Jenkins ni una clave de esta App. |
| RutaTrámite y copia aislada de CI | `ops/ci/README.md` documenta Jenkins, autenticación mediante App y aceptación pendiente. |
| VisionSetil y copia aislada de CI | Documentación de publicación y migración; comparte la instalación prevista con RutaTrámite. |
| BUNKERS | Las coincidencias de `self-hosted` se refieren a WordPress, no a runners de CI. |
| APU/Poly | Las coincidencias de claves privadas corresponden a sus integraciones propias; no se copiaron ni mostraron credenciales. |
| NUDO, VERIAGENT, APRENDER, TRAD, Codex y Cline | La búsqueda realizada no identificó una configuración reutilizable de esta GitHub App. No es una auditoría exhaustiva de todos sus archivos. |

Después de esta aclaración, el usuario descargó la clave correcta en Descargas. Se validó y configuró para la infraestructura existente: [autenticación comprobada](CI-GITHUB-APP-20260915.md). Ya no hace falta buscar una clave de RutaTrámite en otros proyectos.

La migración permanece en Jenkins. La App funciona en PC/VPS; el refresco periódico de fuentes está activo; 49 pruebas de infraestructura aprobadas. Los ensayos anteriores de preview, restauración y rollback se conservan en sus informes. Faltan webhook/despachador reales, suites completas con RAM suficiente, aceptación del flujo de publicación y corte de Actions. No se ha contratado otra plataforma.
