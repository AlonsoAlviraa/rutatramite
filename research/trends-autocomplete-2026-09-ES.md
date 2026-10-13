# Datos crudos — Google Trends ES + Autocomplete ES
Corrida de research de nichos · fecha de captura: 2026-09-04 · Método: pytrends 4.9.2 (series reales, sin números inventados) + endpoint `suggestqueries.google.com` (client=firefox, hl=es, gl=es).

## 1. Comparativa de interés (12 meses, sep-2025 → ago-2026, geo=ES)

Escala relativa 0–100 dentro de cada lote. Los 8 seeds se compararon en 2 lotes de 5 con `pasaporte` como término puente (factor de reescalado b2→b1 = ×1,00, así que los valores son directamente comparables).

**Media anual (escala común):**

| Seed | Media | Pico | Lectura |
|---|---|---|---|
| pasaporte | 81,4 | 100 (ago-26) | El head term más grande de la comparativa |
| empadronamiento | 66,3 | 90 | Volumen alto y sostenido todo el año |
| tarjeta sanitaria | 45,5 | 57 | Alto y plano |
| cita previa dni | 29,4 | 45 | Medio |
| beca comedor | 4,0 | 15 | Long-tail muy estacional |
| comedor escolar | 3,5 | 10 | Long-tail muy estacional |
| vacunas bebe | 0,9 | 1 | Sin señal como head term (se busca "cartilla/calendario vacunal") |
| matricula instituto | 0,5 | 3 | Sin señal como head term (se busca por CCAA o "matrícula FP/ESO") |

**Estacionalidad por mes del año (media 5 años, % del máximo de cada seed):**

| Seed | ene | feb | mar | abr | may | jun | jul | ago | sep | oct | nov | dic | Pico |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| pasaporte | 84 | 68 | 58 | 55 | 56 | 57 | 58 | 56 | 51 | 49 | 88 | **100** | dic (Navidad) |
| empadronamiento | 94 | 96 | **100** | 92 | 94 | 93 | 89 | 84 | 96 | 88 | 86 | 71 | mar (Renta usa padrón) / plano-alto |
| cita previa dni | 94 | 90 | 94 | 98 | **100** | 99 | 97 | 82 | 92 | 84 | 74 | 70 | abr–jun (pre-verano) |
| comedor escolar | 0 | 0 | 4 | 18 | 43 | 74 | 0 | 21 | **100** | 58 | 23 | 0 | sep + jun |
| beca comedor | 0 | 5 | 9 | 5 | 48 | **100** | 43 | 23 | 75 | 14 | 15 | 0 | jun + sep |
| matricula instituto | 0 | 0 | 0 | 0 | 0 | **100** | 0 | 0 | 0 | 0 | 0 | 0 | solo jun |
| tarjeta sanitaria | 87 | 86 | 82 | 74 | 80 | 93 | **100** | 82 | 72 | 68 | 75 | 71 | plano, leve pico jul |
| vacunas bebe | — | — | — | — | — | — | — | — | — | — | — | — | sin señal 5y |

Lecturas operativas (Q4):
- **Nov–dic es la temporada de pasaporte** (nov 88, dic 100 en 5y): las guías de "cita pasaporte Navidad" hay que publicarlas en oct-nov, no en diciembre.
- **Sep es el pico anual de comedor escolar** (100) y segundo pico de beca comedor (75): el contenido de comedor/beca fuera de plazo y lista de espera rinde YA (primera quincena de sep).
- **Empadronamiento es plano-alto**: el wedge actual no tiene temporada, pero su mínimo es dic y su máximo mar (Renta). Q4 es buen momento para escalar fichas municipales.
- **cita previa dni** cae en nov-dic (74/70): la gente asume que no hay citas y busca alternativas → ángulo "sin cita / unidades móviles / aeropuerto".
- **vacunas bebe y matricula instituto como head terms no existen**: la demanda real está en "calendario vacunal {ccaa} 2026" y "matrícula {FP|ESO} {ccaa}" (ver autocomplete).

## 2. Related queries (12 meses, geo=ES) — datos reales

### empadronamiento
TOP: certificado empadronamiento (100) · certificado de empadronamiento (74) · cita empadronamiento (57) · empadronamiento madrid (38) · empadronamiento online (27) · cita de empadronamiento (20) · sacar empadronamiento (16) · pedir empadronamiento (16)
RISING: citas empadronamiento madrid (+60)

### cita previa dni
TOP: cita previa dni pasaporte (100) · pedir cita previa dni (53) · cita previa dni y pasaporte (53) · cita previa dni primera vez (42) · policia nacional cita previa dni (32) · por primera vez (23) · solicitar (23) · teléfono (21) · cambiar cita previa dni (14)
RISING: www citapreviadnie es cita previa dni (+900) · www cita previa dni (+100) · cita previa dni vigo (+60) · consultar cita previa dni (+50)

### pasaporte
TOP: cita pasaporte (100) · pasaporte españa (48) · renovar (48) · español (35) · cita para pasaporte (35) · pasaporte cita previa (33) · sacar pasaporte (25) · cita dni pasaporte (23)
RISING: (irrelevantes — tema Begoña Gómez, sep-2026)

### comedor escolar
TOP: monitor comedor escolar (100) · beca comedor escolar (95) · ayuda comedor escolar (90) · monitor (78) · becas (71) · comedor escolar comunidad de madrid (50) · precio (49) · andalucía (49) · solicitud (46)
RISING: axudas comedor escolar xunta (+17300) · el cantaro comedor escolar (+300)

### beca comedor
TOP: beca de comedor (100) · beca comedor madrid (53) · comunidad de madrid beca comedor (39) · beca comunidad de madrid (39) · beca de comedor comunidad de madrid (39) · beca comedor 2026 (21) · becas comedor (14)
RISING: beca comedor 26 27 (+10700) · beca comedor 2026 2027 (+2950) · beca comedor comunidad de madrid 2026 (+120)

### tarjeta sanitaria
TOP: solicitar tarjeta sanitaria (100) · seguridad social (65) · mi tarjeta sanitaria (51) · madrid (42) · pedir (34) · renovar (33) · europea (29) · virtual (28) · número (27)
RISING: tarjeta sanitaria virtual andalucía (+750) · TSE y certificado provisional sustitutorio (+120) · como solicitar la tarjeta sanitaria europea para mi hijo (+110) · solicitar TSE online (+110) · qué es el cipa (+60) · TSE para mi hijo (+50)

### matricula instituto / vacunas bebe
TOP: matricula instituto andalucia (100) · vacunas bebes (100) · primeras vacunas bebe (63). El resto sin señal relevante.

## 3. Autocomplete ES (capturado 2026-09-04)

NOTA METODOLÓGICA: el endpoint devuelve sugerencias geolocalizadas por IP (en esta captura, Castilla y León: Burgos/León/Palencia/Soria/Zamora dominan los seeds geo). El patrón estructural (sufijos/obstáculos) sí es señal nacional válida; los topónimos concretos deben tratarse como ejemplo del patrón "municipio + seed".

| Seed | Sugerencias (10, deduplicadas de ruido) |
|---|---|
| empadronarse sin | sin domicilio fijo · sin cédula de habitabilidad · sin contrato de alquiler · sin domicilio · sin permiso del propietario · sin domicilio fijo en {ciudad} · sin contrato · sin cita previa {ciudad} |
| volante de empadronamiento | {ciudad} · online · colectivo · **para dni** · ayuntamiento |
| certificado de empadronamiento | {ciudad} · **colectivo** · online |
| cita previa dni | {ciudad} · **y pasaporte** · **primera vez** |
| dni urgente | **sin cita** · **por viaje** · **aeropuerto** · **por pérdida** · {madrid, barcelona} · **sin cita previa {ciudad}** · **aeropuerto barcelona** |
| dni caducado | **multa** · **qué pasa** · **pero con cita** · **caixabank** · **bbva** · renovar · **vueling** · **viajar** · **se puede viajar** |
| pasaporte bebe | **cita previa** · **primera vez** · **cuánto dura** · requisitos · 1 año |
| pasaporte caducado | renovar · **y perdido** · **renovar urgente** · **qué hacer** · **se puede viajar** |
| pasaporte urgente | **aeropuerto** · **sin cita previa** · {madrid, valencia, zaragoza} · **aeropuerto madrid** · **aeropuerto barcelona** |
| cita previa extranjeria | {ciudad} · **toma de huellas** |
| nie | **qué es** · **o nif** · **cita previa** · **es dni** · **y dni es lo mismo** · **verde** · **electrónico** |
| autorizacion de regreso | **a españa** · **extranjería** · **cita** · **ex 13** · **tasa** · **formulario** · **documentos** · **policía** |
| matricula instituto | **andalucía** · **bachillerato** · **2026** · **junta de andalucia** · **eso** · **galicia** · (+ institutos concretos: patrón "mi instituto + matrícula") |
| matricula fp | **castilla y leon** · **superior** · **grado medio** · **2026** · **online** · **distancia** |
| cambio de colegio | **por cambio de domicilio** · **fuera de plazo** · **por mudanza** · **por bullying** · **al instituto** · **2026** · {clm, andalucía, valencia} |
| comedor escolar | **jcyl/educacyl** · **precio** · **declaración renta** · **2026** |
| beca comedor | **jcyl** · **castilla y leon** · **2026** · **ayuntamiento de avila** · **primer ciclo educación infantil** · **verano** · **26/27** · **comunidad de madrid** |
| cartilla de vacunacion | **niños** · **sacyl** · **descargar** · **castilla la mancha** · **madrid** · **en inglés** |
| calendario vacunal | **castilla y leon 2026** · **sacyl 2026** · **madrid 2026** · **2026** · **infantil** |
| tarjeta sanitaria bebe | **catalunya** · **andalucia** · **madrid** · **seguridad social** · **recién nacido** · **galicia/sergas** · **online** · **baleares** |
| modelo 030 | **agencia tributaria** · **hacienda** · **cambio domicilio fiscal** · **pdf** · **comunidad de madrid** · **pdf para rellenar** |
| mudanza cambio de domicilio | (sin sugerencias largas — query completa) |

### YouTube suggest (ds=yt)
- "cita previa dni": primera vez · **primera vez para niños** · y pasaporte · renovar
- "pasaporte bebe": primera vez · **recién nacido** · **foto pasaporte bebe**
- "beca comedor": comunidad de madrid · **subsanación beca comedor** · **subsanar beca comedor 2025**
- (los seeds de empadronarse sin contrato / FP fuera de plazo no devolvieron sugerencias YT)

## 4. Implicaciones para el backlog (síntesis inicial)

1. **Patrón dominante = seed + obstáculo**: "sin", "fuera de plazo", "caducado", "urgente", "qué pasa". Confirma la tesis del brief: long-tail con obstáculo > head terms.
2. **Demandas emergentes reales (rising)**: beca comedor 26/27 (+10700%), axudas comedor xunta (+17300%), tarjeta sanitaria virtual andalucía (+750%), TSE/certificado provisional para hijos (+110%), www citapreviadnie (+900% — la gente teclea el dominio a mano).
3. **Miedo-banco**: "dni caducado + {banco|aerolínea}" (caixabank, bbva, vueling) — nadie cubre "¿me pueden rechazar el DNI caducado en el banco/aviÓN?" de forma operativa.
4. **Vacunas ≠ head term**: la puerta de entrada es "calendario vacunal {ccaa} 2026" + "cartilla dónde se saca" + "qué pide el cole" (admin).
5. **La geolocalización del autocomplete confirma el patrón municipal**: cada seed se combina con ciudad → valida seguir invirtiendo en fichas municipales + hubs CCAA.

*Archivos JSON crudos: `research/trends_batches.json` (series semanales 12m+5y), `trends_related.json`, `trends_12m.json`, `autocomplete.json`.*
