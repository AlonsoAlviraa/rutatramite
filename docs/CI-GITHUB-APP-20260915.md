# GitHub App: autenticación comprobada — 15 de septiembre de 2026

La clave descargada por el usuario pertenece a la App 4945898, instalación 161748368. Está configurada fuera de Git, en las carpetas privadas de CI del PC y del VPS. No se guardan claves ni tokens en este informe. La copia de Descargas se conserva.

Se comprobó la identidad de la App, la instalación y la restricción de cada token a un solo repositorio. Los dos repositorios son privados. Pasaron `git ls-remote`, clonación superficial sin checkout del árbol de trabajo, lectura del árbol Git y publicación/lectura del estado `jenkins/app-authentication`. Este estado acredita autenticación, no las suites de las aplicaciones.

| Repositorio | SHA comprobado | Rutas del árbol |
| --- | --- | --- |
| RutaTrámite | `80f6023ef5ca092a7409c7fff02a5317b45ebd31` | 1231 |
| VisionSetil | `4242986869d59b9abc6d218b6cfeaafea1a5ea13` | 4083 |

Se corrigió la conversión del identificador de App a texto al construir el emisor JWT. La versión instalada de PyJWT rechaza emisores numéricos. Una prueba con una clave RSA temporal comprueba firma, emisor, duración y permisos del token solicitado. Pasó en Windows; la suite completa de infraestructura pasó 49 pruebas en Linux. No se ejecutó código de las aplicaciones durante las clonaciones.

Se instaló y activó `ruta-ci-probe-refresh.timer`, cada cinco minutos. La ejecución real de su servicio terminó con `Result=success` y `ExecMainStatus=0`; actualizó la generación de fuentes de VisionSetil utilizando la App. Los horarios de los trabajos de sondas de Jenkins siguen pendientes del corte, para evitar duplicarlos con Actions.

Evidencia: [autenticación](github-app-validation-20260915.json), [integración](github-app-integration-20260915.json), [pruebas y permisos](github-app-tests-20260915.log). Los archivos privados del VPS tienen modo 600; la carpeta privada del PC limita acceso a Mariano y SYSTEM.

Quedan pendientes la entrega real de webhook, la instalación del despachador/reconciliador, las suites completas y Android, el flujo completo de publicación/reversión de Jenkins y el corte de Actions. Windows está conectado, pero a las 20:06 UTC disponía de unos 4,15 GiB frente a los 8 GiB requeridos. La revocación de las claves anteriores inaccesibles sigue pendiente; no se elimina la clave válida sin identificarla en GitHub.
