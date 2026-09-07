# Tasas de DNI y pasaporte y coste del 060

Revisión parcial del 7 de septiembre de 2026 sobre el bloque compartido por once guías de viaje.

Se retiran la supuesta exención por primeras pérdidas y la instrucción de confirmar un modelo 790 para estos documentos. Se distinguen las exenciones del DNI de las del pasaporte y se indican los canales de pago publicados. Reservar cita es gratuito; llamar al 060 tiene coste. El aviso compartido aclara esta diferencia también en las otras páginas que lo utilizan.

Fuentes consultadas:

- [Interior: DNI](https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/dni/).
- [Interior: pasaporte](https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/tasas/pasaporte/index.html).
- [BOE: tarificación del 060](https://www.boe.es/buscar/doc.php?id=BOE-A-2023-18093).

También se eliminan instrucciones de posicionamiento visibles («query», «long-tail»), una previsión de esperas sin fuente y la conclusión injustificada de que sin anuncio municipal no existe equipo móvil.

La fecha de contraste corresponde exclusivamente al bloque de tasas. No se marca cada guía como revisada íntegramente: siguen pendientes los requisitos de menores, afirmaciones sobre viajes, urgencias y unidades móviles. Pasan las 63 pruebas de la suite completa.

Publicado el build `F5HxVkR76tC3rbTqcxsE5`, release `/srv/tenants/slot2/releases/20260907T144807Z`; anterior conservado `20260907T142816Z`. Compilación Linux completada en `/srv/tenants/slot2/builds/20260907T144332Z`. Paquete de 268.369.920 bytes, SHA-256 `629e690f9ee7a75636e4ec856dd7d541d80202346d8e44ff5d978fbc52e18701`.

Prepublicación: 997 HTML sin incidencias, 228 páginas del sitemap y 12 recursos comprobados. Después de activar, `scripts/check_travel_fees.py` comprueba las once guías públicas: HTTP 200, fuentes visibles, coste telefónico, pérdida sin exención automática y retirada de instrucciones incorrectas. Todas pasan: `travel-fees-public-smoke.json`. No se atribuye a este cambio una revisión visual o editorial completa.

## Siguiente revisión identificada

El archivo `viaje.ts` todavía equipara libro de familia y certificado de nacimiento en la primera expedición y resume el consentimiento de pasaporte como «cuando toque». Deben revisarse junto con `/pasaporte/bebe` (localizar su ruta exacta en el catálogo), evitando mezclar autorización para viajar y consentimiento para expedir pasaporte.

- [Interior: documentación de DNI](https://interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/dni/documentacion-necesaria-para-su-tramitacion/index.html).
- [Regulación del DNI de 2025](https://www.boe.es/eli/es/rd/2025/04/01/255): comprobar Registro Individual y disposición transitoria antes de simplificar la documentación.
- [Interior: expedición de pasaporte](https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/procedimiento-de-expedicion/).
- [Interior: condiciones y consentimiento](https://interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/pasaporte/condiciones-para-su-obtencion/).

Estas fuentes se localizaron durante la compilación; todavía no justifican dar esos contenidos por corregidos.
