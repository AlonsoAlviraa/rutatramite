# MEGA GOAL AMPLIADO — Empadronamiento en todos los municipios ≥10.000 habitantes

## Qué tiene que existir cuando el agente termine

Una web en producción (canónico propuesto: `rutatramite.es`) que resuelva, en cualquier municipio español de 10.000 habitantes o más, esta frase:

«Vivo aquí, tengo (o no) contrato, soy español / UE / no UE / irregular, quiero el alta, el volante o el certificado. Dime exactamente dónde lo pido, con qué papeles, si hay cita, si se puede online, y qué hago si el funcionario me dice que no.»

No es un post de blog. No es un directorio de teléfonos. Es el GPS del padrón municipal con cobertura nacional real.

## Ámbito numérico (no negociable)

España tiene 8.132 municipios (INE, relación a 1 de enero de 2026). Este pack obliga a publicar ficha larga e indexable en todos los de 10.000 habitantes o más.

En el dataset incluido hay 769 municipios extraídos del listado público de población a 1 de enero de 2025 (Madrid 3.506.730 hasta Mengíbar 10.041). La tabla INE de tamaños municipales puede dar alrededor de 783. El agente reconcilia con pobmun oficial y no se queda en 20 ni en 200.

Esos 770-783 municipios concentran la mayor parte de la población residente. Cubrirlos bien es cubrir el país. Los menores de 10.000 habitantes existen en el seed INE como stub noindex. No son el encargo de esta versión.

### Oleadas de calidad

| Oleada | Umbral | Municipios en este pack | Palabras mínimas visibles | Verificación de sede |
|---|---|---|---|---|
| A | ≥100.000 | 67 | 1.800 | Manual, sede leída |
| B | 50.000–99.999 | 84 | 1.400 | Manual o scrape asistido |
| C | 20.000–49.999 | 272 | 1.200 | Scrape + plantilla larga |
| D | 10.000–19.999 | 346 | 1.200 | Plantilla larga + sede si aparece |

## Qué significa «texto grande» aquí

El usuario pidió textos mucho más largos. Eso no es repetir «el empadronamiento es muy importante» 771 veces. Cada página de municipio ≥10k debe contener, como mínimo:

1. Respuesta directa de 80–120 palabras (GEO / AI Overviews): canal + órgano + documentos clave + fecha de verificación.
2. Contexto de ese municipio (población INE 2025, provincia, si es capital o corona metropolitana, si suele haber cita saturada).
3. Quién puede empadronarse (español, UE, no UE, irregular, menor, sin techo) con cita al artículo 15 de la Ley 7/1985.
4. Tablas de documentos de identidad y de vivienda, con hueco para peculiaridad local.
5. HowTo real del canal de ese ayuntamiento (online y/o presencial), 8–12 pasos.
6. Bloque largo de «sin contrato / habitación / familiar».
7. Volante frente a certificado frente a histórico (extranjería, colegio, sanidad, IMV, abono transporte).
8. Renovación a 2 años de no comunitarios sin residencia de larga duración.
9. Errores frecuentes en este tipo de municipio (grande frente a mediano).
10. FAQ de 12–15 preguntas, cada respuesta 80–150 palabras, con el nombre del municipio en la pregunta.
11. Fuentes, last_verified, disclaimer largo.
12. Enlaces a sede oficial, hub provincial, 3 escenarios y 5 municipios vecinos ≥10k.

El marco legal estatal se incluye por componente. No se reescribe la Ley 7/1985 setecientas veces. La unicidad está en los bloques 1, 2, 5, 6, 9 y 10.

## Producto mínimo además de las 769 fichas

- Pilar /empadronarse de 3.000 a 5.000 palabras.
- 12 escenarios nacionales de 2.000 a 3.500 palabras cada uno.
- 50 hubs de provincia + Ceuta + Melilla + 17 CCAA, cada hub con la lista completa de municipios ≥10k de ese territorio y un texto de 800 a 1.200 palabras.
- Wizard de 6 preguntas, sin PII al servidor.
- JSON-LD HowTo + FAQPage + GovernmentService en cada ficha publicada.
- Metodología pública: de dónde salen los datos y qué hacer si la sede cambió.

## Lo que está prohibido

Inventar oficina, teléfono, URL de cita o «en este pueblo piden factura de la luz» sin fuente. Publicar thin programmatic de 300 palabras por 769 URLs. Cobrar el alta (es gratuita) o vender citas. Imitar sede.gob.es, Policía o 060. Decir que el ayuntamiento puede negar el padrón por estar irregular. Pedir DNI, pasaporte o fotos del usuario. Copiar blogs competidores.

## Criterio de «mejor web»

Ganamos si un usuario en WhatsApp pega rutatramite.es/empadronarse/madrid/getafe y resuelve. Perdemos si Getafe tiene el teléfono de Leganés.

## KPI a 90 días

Treinta ciudades de oleada A en top 10 para «empadronarse {ciudad}». Cero incidencias P0 de dato falso. Al menos una citación en AI Overview o Perplexity para una query de ciudad grande. Las 769 URLs indexables superan 1.200 palabras visibles o no se indexan.
