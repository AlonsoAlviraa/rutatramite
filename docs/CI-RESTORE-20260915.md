# Arranque de recuperación de Jenkins: 15 de septiembre de 2026

La pareja `20260915T033001Z.tar.gz` y `recovery-20260915T033001Z.tar.gz` arrancó correctamente con la imagen instalada de Jenkins 2.568.3. Cargó los 14 trabajos y 71 plugins sin plugins fallidos. La cuenta recuperada accedió por HTTP y el acceso anónimo devolvió 403. Una comprobación HMAC verificó que la clave maestra recuperada permite usar una clave cifrada que ya estaba en la copia. Los recibos contienen las huellas de ambos archivos y de la imagen.

El contenedor tuvo red `none`, cero puertos publicados, cero agentes y ejecutores y los trabajos deshabilitados. Solo montó la copia temporal de Jenkins; no recibió el socket Docker ni los directorios de las webs. La cola, los historiales y los agentes se apartaron dentro del espacio de ensayo. Se comprobó el modo de pausa de Jenkins. No se ha probado la reanudación de builds guardados ni el trabajo de agentes reales sobre el controlador restaurado.

El contenedor terminó y se eliminó, y se retiró la copia temporal después de conservar el recibo y el log. Las copias originales permanecen separadas. La consulta posterior confirmó que el Jenkins operativo mantiene sus ejecuciones originales; no se han creado duplicados. El VPS conservó 11.212.951.552 bytes disponibles al terminar.

El primer intento falló en el diseño de la comprobación criptográfica: creó por primera vez `hudson.util.Secret` en el controlador vivo después de la fecha de la copia. Ese fichero no figuraba en el tar original. Se conservó el fallo y se sustituyó el desafío por uno basado en la clave de agentes ya respaldada, comprobando antes que su archivo cifrado coincide con el actual. El segundo intento superó el descifrado. También se corrigió la expansión de corchetes de curl en la consulta de trabajos; el proceso existente continuó tras corregir su configuración, sin relanzarlo.

El log conserva un aviso de contexto vacío y otro del monitor de disco que deja sin ejecución al nodo interno del contenedor de ensayo. Ese nodo tiene cero ejecutores y un `/tmp` limitado a 256 MiB. El resultado acredita restauración y acceso, no capacidad para ejecutar builds en ese contenedor.

Recibos: [fallo original](ci-restore-first-20260915.json), [detalle original de arranque](ci-restore-first-20260915.boot.json), [log original](ci-restore-first-20260915.log), [resultado aprobado](ci-restore-final-20260915.json), [log aprobado](ci-restore-final-20260915.log).

El procedimiento manual está instalado en `/opt/ruta-ci/config/restore_boot.py`; no se ha añadido un horario nuevo. Referencias: [validación de copias de Jenkins](https://www.jenkins.io/doc/book/system-administration/backing-up/) y [HMACConfidentialKey](https://javadoc.jenkins.io/jenkins/security/HMACConfidentialKey.html).
