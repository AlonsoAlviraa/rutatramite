# Plantilla larga de ficha municipal (≥10.000 habitantes)

Toda URL `/empadronarse/{provincia}/{municipio}` de un municipio del catálogo `data/municipios_10k.json` se publica con esta estructura. Palabras visibles mínimas: 1.200 (1.800 si oleada A). Si no llegas, ampliá FAQ y HowTo, no repitas la palabra empadronamiento.

## Estructura obligatoria

# Empadronarse en {Municipio} ({Provincia}) 2026

Párrafo GEO de 80–120 palabras: En {Municipio}, el padrón lo gestiona el Ayuntamiento. El alta es gratuita. El canal es {online / cita / ventanilla / unknown}. Hace falta identidad y prueba de uso de la vivienda. Estar irregular no impide el alta (artículo 15 de la Ley 7/1985). Contrasta la sede: {url o la frase de búsqueda}. Última verificación: {fecha}. Población de referencia: {poblacion_2025} habitantes a 1 de enero de 2025.

## Qué es el padrón en este municipio
150–200 palabras. Población INE, si es capital, corona metropolitana, por qué importa aquí (colegio, centro de salud, IMV, arraigo, abono transporte si aplica a esa CCAA).

## Quién puede empadronarse
Cualquier persona que viva habitualmente en el término: española, UE, no UE, con o sin autorización de residencia. El ayuntamiento identifica; no filtra extranjería. Menores: quien tenga la guarda. Sin techo: servicios sociales.

## Documentos de identidad
Tabla HTML. ES >14 DNI o pasaporte. ES <14 libro de familia o nacimiento. UE pasaporte o DNI del país más certificado de registro si existe. No UE TIE o pasaporte. Originales en presencial.

## Documentos de vivienda
Tabla de cinco filas: propietario; alquiler a nombre; habitación; familiar; sin contrato. Override local en `docs_extra`. Si no hay override: «este municipio no ha publicado extra; aplica el marco INE».

## Cómo hacerlo en {Municipio}
### Online
Si `online=true`, pasos Cl@ve. Si unknown, cómo buscar la sede. Nunca inventar la URL.
### Presencial
Cita required / walk-in / unknown. Qué llevar. Quién debe ir.

## Oficinas
Solo verificadas. Si no: «Registro u OAC del Ayuntamiento de {Municipio}. Confirma dirección y horario en la web municipal.»

## Volante, certificado e histórico
Tres párrafos. Validez práctica reciente. Tasa solo si existe.

## Renovación de extranjeros no comunitarios
Dos años. Aviso. Baja por caducidad.

## Plazos y efectos
Alta inmediata o días. Baja en origen la coordina el INE. El padrón no cambia el domicilio fiscal (modelo 030).

## Errores frecuentes aquí
Cinco a ocho viñetas adaptadas a oleada A (citas saturadas, distritos) o D (horario de mañana, instancia genérica).

## FAQ (12–15)
Pregunta con el nombre del municipio. Respuesta 80–120 palabras.

## HowTo
8–12 pasos del canal real. JSON-LD HowTo + FAQPage + GovernmentService (provider = Ayuntamiento de {Municipio}).

## Vecinos y provincia
Cinco municipios ≥10k del catálogo + hub provincia + tres escenarios.

## Fuentes
INE población, BOE, sede si existe, last_verified.

Disclaimer largo.

## Prohibido en esta plantilla
Padding semántico. Teléfono del pueblo de al lado. «Oficial» sin source_url. Copiar dontramite u otra guía. Venta de citas.
