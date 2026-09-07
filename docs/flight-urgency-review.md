# Vueling y DNI urgente

Revisión del 7 de septiembre de 2026 de `/dni/caducado-vueling` y `/dni/urgente-sin-cita`.

Vueling publica excepciones para pasaportes españoles caducados en ciertos destinos; la guía afirmaba que solo beneficiaban a otras nacionalidades. Se corrige, se distingue DNI de pasaporte y se enlaza la tabla actual. Se retiran equivalencias universales entre compañías y la promesa de resolver la documentación en 24–48 horas.

La guía de DNI urgente elimina cupos ocultos del 060, liberación diaria a horas fijas y expedición de DNI en aeropuertos sin respaldo. El artículo 6 del RD 255/2025 contempla expedición excepcional sin cita, sin garantizar atención inmediata. Aena describe pasaportes de emergencia en T4 de Madrid y puntos de actualización electrónica del DNI; no son el mismo servicio.

Fuentes:

- [Vueling: documentación para viajar](https://help.vueling.com/hc/es/articles/19798843861393-Documentaci%C3%B3n-para-viajar).
- [Aena: seguridad y servicios policiales en Madrid](https://www.aena.es/es/adolfo-suarez-madrid-barajas/servicios-del-aeropuerto/categorias-y-terminales/seguridad.html).
- [BOE: RD 255/2025](https://www.boe.es/eli/es/rd/2025/04/01/255).

La página de seguridad de Barcelona también se consultó; no permitió corroborar los horarios ni la expedición de DNI afirmados. Su ausencia en esa página no demuestra que no exista ningún servicio.

Pasan 28 pruebas afectadas. Compilación completada en `/srv/tenants/slot2/builds/20260907T152125Z`. Publicado el build `HrMA5MNlVs_dvIXV3BCbR`, release `/srv/tenants/slot2/releases/20260907T152627Z`, anterior `20260907T151304Z`. Paquete de 268.369.920 bytes, SHA-256 `42dd0696e44ac9e76ed977a91711d1da76ddc0fc6a0e5428598f29b4d6b7971b`.

Prepublicación sin incidencias: 997 HTML, 228 páginas del sitemap y 12 recursos. Las dos páginas públicas pasan `scripts/check_flight_urgency.py`; evidencia en `flight-urgency-public-smoke.json`. Otras guías de viaje mantienen afirmaciones pendientes, entre ellas la generalización sobre pasaporte fuera de la UE en `viaje.ts`, y los horarios de liberación en las guías de disponibilidad. Esta revisión no las valida.
