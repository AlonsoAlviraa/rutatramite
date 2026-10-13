# ENTREGABLE — Research de nichos trámites España · E1–E8
rutatramite.es · Corrida: 2026-09-04 · Horizonte: Q4 2026 + mapa 2027
Método: Trends ES real (pytrends, 13 seeds), autocomplete ES real (43 seeds + YouTube), ~150 WebSearch/WebFetch de industria, keywords y plazos. **Cero volúmenes inventados** (vol: ? en todo lo no fuente); plazos citados o "por confirmar". Vacunas: solo ángulo administrativo. Nunca venta de citas.

**Artefactos de la corrida** (en `research/`): `trends-autocomplete-2026-09-ES.md` (+4 JSON) · `industria-mapas-1-y-2.md` · `keywords-clusters-A-D.md` · `keywords-clusters-E-H.md` · `keywords-becas.md` · `fichas-capa-I-A-D.md` (18) · `fichas-capa-I-E-H.md` (19) · `fichas-capa-I-becas.md` (18).

---

## 0) Resumen ejecutivo

1. **La demanda Q4 está en pasaporte (pico dic), comedor/beca comedor (pico sep), FP/matricula (sep-jun) y beca MEC (pico nov: resoluciones/pagos/alegaciones)**. Empadronamiento es plano-alto todo el año: el wedge actual no tiene temporada y puede escalar en paralelo.
2. **Becas es el territorio con mayor momentum medible**: "beca mec 26 27" rising +451.650%, "beca comedor 26 27" +10.700%, "axudas comedor xunta" +17.300%. Ventanas ABIERTAS esta semana: modificación datos MEC (7-28 sep), colaboración MEC (cierra 22 sep), ACNEAE (cierra 10 sep), MUFACE (31 oct), Unizar (10 sep), Ayto. Zaragoza/Fuentes de Ebro (22-25 sep).
3. **La industria a romper es débil exactamente donde duele**: clusters E (cole), F (comedor) y la capa becas-denegada/cobro no tienen NINGÚN competidor comercial solvente; en C/D (citas/extranjería) dominan vendedores de citas (29-350 €) con contenido thin o EN. Nadie puede copiar "sede oficial primero + nunca vendemos citas" sin canibalizar su modelo.
4. **Acción más urgente**: actualizar YA `/extranjeria/subsanar-regularizacion-correos` (cierra 30-sep-2026, verificado en Correos: 383 oficinas, 8:30-17:30) y publicar las 25 P0 de abajo.

---

# E1. MAPA DE INDUSTRIA (≥40 filas)

Condensado de los dos mapas completos (`industria-mapas-1-y-2.md`, 66 filas con URLs). Á = ángulo; Cal = calidad.

### Oficiales canónicos (no son competencia, son la fuente)
| Dominio | Clusters | Á | Cal | Hueco que deja |
|---|---|---|---|---|
| sede.administracion.gob.es / ICP+ | C,D | canónico | ok | no dice qué hacer cuando no hay citas ni esperas por oficina |
| administracion.gob.es (060) | C | canónico | ok | sin disponibilidad por trámite; 060 saturado sin alternativa |
| citapreviadnie.es | B,C | canónico | ok (Trustpilot 1,6/5) | sin alerta de "sin citas", sin rutas urgencia, UX opaca |
| dnielectronico.es / sede.policia | B,C | canónico | bueno | pasaporte urgente aeropuerto sin requisitos paso a paso |
| interior.gob.es | B,C | canónico | ok | caducidad + viaje inminente: remite al 060 y nada más |
| aena.es | B | oficial infra | ok | describe comisarías T4/T1 pero NO requisitos ni tasa del urgente |
| sede.dgt.gob.es | C | canónico | bueno | sin demoras por Jefatura; caducidad del permiso esperando examen |
| sede.agenciatributaria.gob.es (030) | A | canónico | bueno | cruce NIE→NIF→030 del regularizado no es un recorrido |
| sede.seg-social.gob.es | H,D | canónico | bueno | solo TSE; nadie une padrón→INSS→TSI |
| sepe.es | C | canónico | bueno | advierte clones sin publicar disponibilidad |
| inclusion.gob.es | D | canónico | bueno | post-subsanación (silencio, resolución) sin URL clara |
| correos.es | D | operador | bueno | no explica qué pasa tras el 30-sep ni resguardo perdido |
| ine.es / idapadron | A | canónico | ok | instrucciones para ayuntamientos, no ciudadanos |
| boe.es | A,D | normativo | bueno | cero capa ciudadana |
| sanidad.gob.es | H | canónico | bueno | calendario "común" sin comparativa CCAA |
| comunidad.madrid | F,G,H | CCAA | bueno | comedor cerrado sin decir qué hacer si llegaste tarde |
| gencat.cat / edubcn / catsalut | F,G,H | CCAA | bueno | comedor repartido en consells/AMB: nadie centraliza |
| juntadeandalucia.es | F,G,H | CCAA | bueno | doble plazo comedor (jun/jul) que confunde |
| gva.es | F,G,H | CCAA | bueno | comedor como deducción en factura poco explicado |
| xunta.gal / sergas | F,G,H | CCAA | bueno | ayuda fija 150€ sin compatibilidades |
| educa.jcyl.es / sacyl | F,G,H | CCAA | bueno | doble calendario comedor sin comparativa |
| euskadi.eus / osakidetza | G,H | CCAA | ok | jangela repartida Gobierno/diputaciones: hueco agregación |
| gobiernodecanarias.org | F,G,H | CCAA | ok | novedades vacunales dispersas SCS/BOC/prensa |
| caib.es / ibsalut | F,G,H | CCAA | bueno | ventanas por centro sin unificar |

### Media / legal / consumidor
| Dominio | Clusters | Á | Cal | Hueco |
|---|---|---|---|---|
| ocu.org | C | consumidor | ok | denuncia sin solución práctica |
| legalitas.com | D | legal comercial | ok | no explica subsanación paso a paso |
| confilegal.com | D,B | legal | thin | NO cubre regularización ni colapso citas |
| consejogestores.org | C | sectorial | ok | su solución es "contrata un gestor" |
| elpais.com | B/C,D | medio | bueno | cronología sin "qué hago yo mañana" |
| elperiodico.com | B,C | medio | bueno | atasco Cataluña sin rutas alternativas |
| larazon.es | B,C | medio | ok | DNI Exprés sin directorio vigente |
| 20minutos.es | B,C | medio | ok | evergreen con precios antiguos |
| cadenaser.com | D,B | medio | ok | cobertura fragmentada por emisoras |

### SEO de trámites / extranjería / expats (la industria a romper)
| Dominio | Cl. | Á | Cal | Geo | Hueco |
|---|---|---|---|---|---|
| citaex.com | C+D | vende cita (robot) | ok | nacional | precio oculto, sin razón social, no enlaza sede |
| extranjeriasimple.com | C+D | vende cita 29€ | ok | nacional | sin plazos por provincia |
| robotcita.com | C | vende cita | thin | nacional | 100% producto, cero contenido |
| extranjeriaclara.com | C+D | vende gestoría | ok | nacional | FAQs solo títulos |
| gestoriadeextranjeria.es | C+D | vende gestoría | thin | nacional | una landing |
| everestabogados.com | C+D | miedo+despacho | ok | Madrid | "truco" sin fecha ni capturas |
| asesoresjuridicosbarcelona.com | C+D | abogados | thin | BCN | poco profundo |
| migralis.com | C+D | vende gestoría | bueno | nacional | sin URL exacta del portal |
| infoinmigrantes.es | D+A | info+display | thin-ok | nacional | 350-900 palabras, sin schema/fecha |
| solucionesextranjeria.com | D | vende abogados | ok | nacional | cero guía SEO |
| evitalios.com | B+C | anti-burocracia | ok | nacional | contradice multas 100 vs 600 € |
| generardni.com | B | thin scraper | thin | nacional | sin fuentes ni fecha |
| madridactiva.es | A | local útil | ok | Madrid | sin renovación no UE ni fecha |
| rodrigueznavarroabogadosalicante | A+D | lead gen | ok | Alicante | un artículo; hueco provincial |
| aedashomes.com | A | content inmo | ok | nacional | sin paso a paso municipal |
| illanpanos.com | A | blog personal | thin | Madrid | autoridad mínima |
| fotocasa.es | A | portal inmo | ok | nacional | "pregunta a tu ayuntamiento" |
| eldiario.es (somos) | A | periodismo | bueno | Madrid | no actualizable como guía |
| e-residence.com | D (EN) | vende gestoría | bueno | nacional EN | sin ES, precio oculto, dateModified autoupdate |
| spainguru.es | D (EN) | lead gen expat | bueno | nacional EN | ~600 palabras, cero español |
| easytospain / hilivsolution / spainora / vive.legal / mamsolicitors | D (EN) | gestoría | ok | nacional EN | sin ES |
| justlandedbcn / nie.cat | A+D | relocation | thin | BCN | service pages |
| burntheboats.es | D+H (EN) | guía familias | bueno | nacional EN | ángulo "orden correcto de pasos" que nadie copia en ES |
| anchorless.io | C+D | fintech expat | bueno | nacional | sin municipal/familiar |
| mapfre / caixabank / skyscanner | B | content marca | bueno | nacional | cubren "qué", no "conseguir cita cuando no hay" |
| cesurformacion / fpsuperiorufv / prometeo | G | venden FP | ok | Madrid | proceso público fuera de plazo sin explicar |
| educaweb / explorafp / didactys | G | educativo | ok | nacional | admisión FP desconectada de trámites previos |
| farmacialavapies / viamedsalud | H | content salud | thin | nacional | sin cadena completa del bebé |
| milanuncios + IG/TikTok | C | venta citas | thin | nacional | opacidad 250-350 €, cero E-E-A-T |

**Conclusión E1**: clusters E (cole) y F (comedor) sin competidor comercial relevante (solo oficiales y PDFs). En becas, bancos y blogs academias llenan huecos neutrales. 8 semillas del brief no existen o no rankean (dontramite ES, certificadosweb, settlr, movetospain, tramitesespana, noticita; infoinmigrantes es .es; citaex existe).

---

# E2. RANKING DE NICHOS — 25 P0 (slug / title / h1 / gap)

vol: ? en todas (regla dura). Dificultad según top 3 real visto. **P0 = publicar esta semana** (ventanas de septiembre + evergreen con top 3 roto).

| # | slug | title ≤60 | h1 | cluster | gap que cubre |
|---|---|---|---|---|---|
| 1 | /extranjeria/subsanar-regularizacion-correos | Subsanación Correos: queda hasta el 30 de septiembre | Subsanar la regularización en Correos (actualización) | D | ACTUALIZAR YA: cierra 30-sep-26; 383 oficinas, 8:30-17:30; qué se puede subsanar; qué pasa después |
| 2 | /comedor/beca-comedor-fuera-de-plazo | Beca comedor fuera de plazo: qué se puede hacer | Beca de comedor fuera de plazo | F | Segundas ventanas reales (CyL 1-22 sep, BCN 8-27 sep, Andalucía concertados), sobrevenidas, servicios sociales |
| 3 | /comedor/no-puedo-pagar-comedor-escolar | No puedo pagar el comedor escolar: qué pasa | No puedo pagar el comedor escolar | F | Derecho del menor vs suspensión del servicio; beca urgente; fraccionamiento |
| 4 | /fp/matricula-fp-en-septiembre | Matricularse en FP en septiembre: se puede todavía | ¿Se puede matricular uno en FP en septiembre? | G | Extraordinarios por CCAA (CyL 2-4 sep), 2.931 vacantes reales, fuera de plazo todo el 1er trimestre |
| 5 | /colegio/cambiar-de-colegio-fuera-de-plazo | Cambiar de colegio fuera de plazo: guía 2026 | Cambiar de colegio fuera de plazo: qué se puede hacer | E | Plaza garantizada por comisión de escolarización (2.300+ casos/año en Navarra); a quién dirigirse |
| 6 | /colegio/cambio-de-colegio-por-mudanza | Cambio de colegio por mudanza: pasos y documentos | Cambiar de colegio por mudanza | E | Top 3 no responde España (LatAm/comerciales); empadronamiento nuevo como hecho causante |
| 7 | /colegio/documentos-matricula-colegio | Documentos para matricular a un niño: lista España | Documentos que pide el colegio para matricular | E | SERP dominada por gob.pe/Mineduc CL/Bogotá; checklist España por etapa |
| 8 | /colegio/autorizacion-recogida-menores | Autorización para recoger niños del colegio: modelo | Autorización de recogida de menores: modelo y pasos | E | Scribd y blogs en top 3; modelo + quién firma (ambos tutores) + DNI |
| 9 | /becas/mec/modificar-datos | Modificar datos beca MEC: plazo del 7 al 28 de septiembre | Modificar tu solicitud de beca MEC | BECAS | Ventana ABIERTA 7-28 sep; CaixaBank en top 3: hueco neutral (qué se puede cambiar y qué no) |
| 10 | /becas/colaboracion | Becas de colaboración 2026: plazo hasta el 22 de septiembre | Becas de colaboración del Ministerio | BECAS | CIERRA 22-sep; 2.000 €, 2.111 plazas, notas de corte por rama |
| 11 | /becas/mec/ | Beca MEC 2026-27: plazos, estado y cobro explicados | Beca MEC 2026-27: guía completa del trámite | BECAS | Pilar hub: rising +451.650%; nadie une convocatoria→resolución→cobro en una ruta |
| 12 | /becas/mec/cuando-se-cobra | Cuándo se cobra la beca MEC 2026-27: calendario | Cuándo se cobra la beca MEC | BECAS | 0 oficiales en top 3; fija Q4-26/Q1-27, variable 2 fases; matrícula se paga a la universidad |
| 13 | /dni/no-hay-citas | No hay citas para el DNI: qué hacer hoy | No encuentro cita para el DNI: guía de salidas | C | Forocoches/Trustpilot rankean; patrón 6:00-9:00, municipios cercanos, 060, bloqueo por reintentos |
| 14 | /dni/a-que-hora-se-liberan-citas | A qué hora se liberan las citas del DNI | Horario real de liberación de citas del DNI | C | Nadie tiene página propia; consolidar patrón real sin vender nada |
| 15 | /dni/paginas-clon-cita | Páginas clon de la cita del DNI: cómo evitarlas | Cita del DNI: webs oficiales y clones que cobran | C | Anti-fraude alineado con marca: dominio exacto, reclamar cobros, la cita es gratis |
| 16 | /dni/urgente-sin-cita | DNI urgente sin cita: opciones reales hoy | Cómo renovar el DNI urgente sin cita previa | B | Vías reales: 060, cupos de urgencia, comisaría con billete; nada de gestores |
| 17 | /dni/perdido-volar | He perdido el DNI y vuelo mañana: qué hacer | Perder el DNI antes de un vuelo: plan de emergencia | B | Flujo hora a hora: denuncia online, 060, qué acepta cada aerolínea |
| 18 | /extranjeria/no-hay-citas | No hay citas de extranjería: qué funciona de verdad | No encuentro cita de extranjería: opciones legales | C/D | Reddit llena el hueco; tácticas legales + por qué no comprar citas + queja 060 |
| 19 | /extranjeria/huellas-sin-citas-barcelona | Citas de huellas Barcelona: cómo salir del atasco | No hay citas de huellas en Barcelona: qué hacer | D | Certificado digital al identificarse, oficinas de toda la provincia, error de inasistencias |
| 20 | /extranjeria/tie-caducada-viajar | Viajar con la TIE caducada: los 3 escenarios | ¿Puedo viajar con la TIE caducada? | D/I | El resguardo NO vale para reentrar; UE/fuera UE/nacionalidad; puente a autorización de regreso |
| 21 | /empadronarse/volante-online | Volante de empadronamiento online: cómo descargarlo | Descargar el volante de empadronamiento por internet | A | Rastreador por ciudades: quién lo emite en un clic (Murcia), sin identificación (Málaga) o con cita |
| 22 | /empadronarse/cita-previa-madrid | Cita empadronamiento Madrid: cómo conseguirla antes | Cita previa para empadronarse en Madrid | A | Rising "citas empadronamiento madrid" +60%; dónde sale cita ANTES (Línea Madrid vs distritos) |
| 23 | /bebe/tarjeta-sanitaria-bebe | Tarjeta sanitaria del bebé: cómo sacarla paso a paso | Cómo sacar la tarjeta sanitaria del bebé | H | Los 2 pasos (P1 en TuSS + centro de salud) explicados con enlaces oficiales; SIP provisional GVA |
| 24 | /bebe/cartilla-de-vacunacion-donde-se-saca | Cartilla de vacunación: dónde se saca en España | Dónde se saca la cartilla de vacunación | H | SERP dominada por México; en España: centro de salud al asignar pediatra; duplicado/certificado; SOLO admin |
| 25 | /bebe/inscripcion-nacimiento-registro-civil | Inscripción del nacimiento: plazo y documentos | Inscribir al bebé en el Registro Civil | H | 72h hospital + 10 días familia (Ley 20/2011 arts. 46-47 verificados); fuera de plazo = expediente registral |

## E2 (continuación) — Top 80: P1 octubre (28)
| keyword | cl | slug | gap/esencia |
|---|---|---|---|
| beca denegada por patrimonio | BECAS | /becas/mec/denegada/por-patrimonio | top 3 roto (wordpress/FB); umbrales 26-27: urbanos 47.600 €, rústicos 14.450 €/miembro, suma >100% |
| beca denegada por superar umbrales de renta | BECAS | /becas/mec/denegada/por-renta | renta discrecional vs IRPF con ejemplo |
| beca denegada por valores catastrales | BECAS | /becas/mec/denegada/valores-catastrales | solo univ. regionales en top |
| alegaciones beca mec | BECAS | /becas/mec/alegaciones | 10 días hábiles + modelo + Unidad de Becas (pico nov) |
| subsanación beca mec | BECAS | /becas/mec/subsanacion | 10 días hábiles, "Mis notificaciones", DNI renovado 24-48h |
| beca mec consulta (estado) | BECAS | /becas/mec/estado | tabla estado→acción; un BANCO explica estados: hueco neutral |
| beca mec 2026 resolución | BECAS | /becas/mec/resolucion | orden de resoluciones por CCAA/uni (pic nov) |
| beca mec y trabajo | BECAS | /becas/mec/compatibilidad/trabajo | Reddit en top 3; computa renta, no horas |
| compatibilidad beca mec y erasmus | BECAS | /becas/mec/compatibilidad/erasmus | 0 oficiales en top; créditos transferidos NO computan |
| requisitos para no devolver la beca mec | BECAS | /becas/mec/no-devolver | 50/40%, excepción matrícula, casos |
| cambiar de carrera con beca mec | BECAS | /becas/mec/cambio-estudios | Google Sites en top 3; regla +30/60 créditos |
| renuncia beca mec | BECAS | /becas/mec/renuncia | visión nacional; renunciar a tiempo corta el reintegro |
| ayudas al estudio muface | BECAS | /becas/muface | ABIERTA hasta 31-oct; BOE-A-2026-10876 |
| beca residencia universitaria | BECAS | /becas/residencia | blog de residencia privada en top; componente 2.700 € |
| multa por DNI caducado | B | /dni/caducado-multa | cifras reales LO 4/2015 art. 36.6 (601-30.000 negativa identificación); prensa confunde |
| el banco me bloquea por DNI caducado | B | /dni/caducado-banco | autocomplete "caixabank/bbva"; antilavado; resguardo de cita |
| DNI urgente por viaje | B | /dni/urgente-por-viaje | billete como justificante; DNI exprés |
| pasaporte para un bebé | B | /pasaporte/bebe | validez 2/5/10 por edades; quién acompaña |
| renovar pasaporte antes de caducar | B | /pasaporte/renovar-antes-caducar | regla 1 año; países 6 meses |
| consultar/anular cita DNI | B | /dni/consultar-cita | recuperar cita sin certificado; anular libera hueco |
| viajar a Reino Unido con DNI (ETA) | B | /dni/viajar-reino-unido | Brexit+ETA operativo; DNI no sirve |
| salvoconducto | B | /pasaporte/salvoconducto | requisitos por consulado; gratuito, intransferible |
| ICP+ qué es | C/D | /extranjeria/icp-plus | flujo con capturas; errores típicos |
| cita para empadronarse (genérica) | C/A | /empadronarse/cita-previa | cada ayuntamiento su sistema; cuándo NO hace falta |
| qué pasa si no empadrono a mi hijo | A/I | /empadronarse/no-empadronar-hijo-consecuencias | checklist en cascada (cole, TSI, becas) |
| empadronar recién nacido | A/H | /empadronarse/recien-nacido | "de oficio a los 3 meses" (València); qué hacer si no aparece |
| certificado empadronamiento caduca 3 meses | A | /empadronarse/certificado-caduca-3-meses | no caduca legalmente; extranjería suele exigir <3 meses |
| calendario vacunal {madrid,cyl} 2026 | H | /bebe/calendario-vacunal-{ccaa} | solo enlace al oficial (cero consejo médico); patrón "calendario vacunal {ccaa}" fuerte |

## E2 (continuación) — P2 nov-dic (27)
viajar con TIE caducada (→P0 ya listada) · autorización de regreso Navidad (publicar oct; verificar si se repite entrada excepcional 24-nov→11-ene) · volar Vueling DNI caducado · huellas sin citas Madrid · cuánto tarda la TIE · regularización 2026 resolución · NIE verde · NIE vs NIF · certificado digital con NIE · huecos padrón arraigo · padrón vs 030 · empadronarse situación irregular · baja padrón al irse · volante colectivo · DNI bloqueo citas · bots Telegram citas · /dgt/cita-previa · cambio instituto mitad de curso · convalidaciones FP · reserva plaza FP · expediente académico digital · matrícula universidad septiembre · beca salario GVA (ventana nov!) · ayudas jcyl (21-oct→17-nov, crítico) · axudas comedor xunta · erasmus convocatoria (agregador nov-dic).

---

# E3. SLUG MAP — 40 URLs prioritarias
(25 P0 de E2 + 15 P1; columnas: slug | cluster | temporada | página_madre | gap)

| slug | cl | temporada | madre | gap |
|---|---|---|---|---|
| /extranjeria/subsanar-regularizacion-correos (ACT.) | D | sep (cierre 30) | /extranjeria | post-30-sep: desistimiento/archivo, recurso |
| /comedor/beca-comedor-fuera-de-plazo | F | sep-oct | /comedor (NUEVO) | segundas ventanas por CCAA + sobrevenidas |
| /comedor/no-puedo-pagar-comedor-escolar | F | sep | /comedor | derecho del menor vs deuda |
| /fp/matricula-fp-en-septiembre | G | sep | /fp (NUEVO) | vacantes + extraordinarios por CCAA |
| /colegio/cambiar-de-colegio-fuera-de-plazo | E | sep | /colegio (NUEVO) | comisión de escolarización paso a paso |
| /colegio/cambio-de-colegio-por-mudanza | E | sep+todo año | /colegio ↔ /mudanza | interlink mudanza↔cole |
| /colegio/documentos-matricula-colegio | E | sep+jun | /colegio | checklist ES por etapa (SERP LatAm) |
| /colegio/autorizacion-recogida-menores | E | sep | /colegio | modelo neutral (Scribd en top) |
| /becas/mec/modificar-datos | BECAS | 7-28 sep | /becas/mec | ventana abierta; qué se puede cambiar |
| /becas/colaboracion | BECAS | hasta 22 sep | /becas | 2.000 €, notas de corte por rama |
| /becas/mec/ | BECAS | todo año (pic nov+mar) | /becas | hub convocatoria→resolución→cobro |
| /becas/mec/cuando-se-cobra | BECAS | oct-dic+abr-may | /becas/mec | calendario fija/variable; 0 oficiales en top |
| /dni/no-hay-citas | C | sep+todo año | /dni | anti-desesperación sin venta |
| /dni/a-que-hora-se-liberan-citas | C | todo año | /dni/cita-previa | patrón 6:00-9:00 consolidado |
| /dni/paginas-clon-cita | C | todo año | /dni/cita-previa | anti-fraude (marca) |
| /dni/urgente-sin-cita | B | jun-jul, dic | /dni/cita-previa | vías reales gratis |
| /dni/perdido-volar | B | todo año | /dni | plan de emergencia hora a hora |
| /extranjeria/no-hay-citas | C/D | todo año | /extranjeria | opciones legales; denuncia mercado citas |
| /extranjeria/huellas-sin-citas-barcelona | D | todo año | /extranjeria/cita-huellas-tie | tácticas BCN verificadas |
| /extranjeria/tie-caducada-viajar | D | nov-dic+jul | /extranjeria/autorizacion-regreso | 3 escenarios; resguardo no vale |
| /empadronarse/volante-online | A | todo año | /empadronarse | rastreador por ciudades |
| /empadronarse/cita-previa-madrid | A | todo año | /empadronarse | rising +60%; cita antes |
| /bebe/tarjeta-sanitaria-bebe | H | todo año | /bebe (NUEVO) | 2 pasos con enlaces; provisional GVA |
| /bebe/cartilla-de-vacunacion-donde-se-saca | H | todo año | /bebe | SERP México; España paso a paso (solo admin) |
| /bebe/inscripcion-nacimiento-registro-civil | H | todo año | /bebe | 72h+10 días con BOE |
| /becas/mec/denegada/por-patrimonio | BECAS | sep-dic (pic nov) | /becas/mec | top 3 roto; umbrales 26-27 |
| /becas/mec/alegaciones | BECAS | oct-dic | /becas/mec | modelo + 10 días hábiles |
| /becas/mec/subsanacion | BECAS | sep-dic | /becas/mec | requerimientos; "Mis notificaciones" |
| /becas/mec/estado | BECAS | sep-nov | /becas/mec | estado→acción |
| /becas/mec/compatibilidad/erasmus | BECAS | feb+todo año | /becas/mec | base normativa; créditos transferidos |
| /dni/caducado-multa | B | todo año | /dni/renovar-caducado | cifras exactas LO 4/2015 |
| /dni/caducado-banco | B | todo año | /dni/renovar-caducado | antilavado; resguardo |
| /pasaporte/bebe | B | todo año | /pasaporte (NUEVO pilar) | validez por edades |
| /extranjeria/autorizacion-regreso-navidad | D | publicar oct | /extranjeria/autorizacion-regreso | verificar entrada excepcional 2026 |
| /becas/autonomicas/ayudas-estudio-cyl | BECAS | 21-oct→17-nov | /becas/autonomicas | ventana crítica; coordinación con MEC |
| /becas/autonomicas/beca-salario-gva | BECAS | ventana nov | /becas/autonomicas | 4 ventanas/año explicadas |
| /comedor/ies-sin-comedor | F | sep | /comedor | excepción documentada (muchos IES sin comedor) |
| /bebe/calendario-vacunal-madrid | H | oct | /bebe | enlace al oficial + qué pide el cole (admin) |
| /colegio/no-he-matriculado-a-mi-hijo | E | sep+jun | /colegio | nadie responde caso España |
| /empadronarse/no-empadronar-hijo-consecuencias | A/I | todo año | /empadronarse/menores | cascada de pérdidas documentada |

Pilares madre NUEVOS propuestos: `/colegio`, `/comedor`, `/fp`, `/bebe`, `/becas` (+ subpilar `/becas/mec`). Ya existentes que se refuerzan: `/dni`, `/pasaporte`, `/extranjeria`, `/empadronarse`, `/mudanza`, `/hacienda/modelo-030`.

---

# E4. FICHAS "QUÉ PASA SI NO" — 55 fichas (≥30 exigidas)

Resumen ejecutivo; detalle completo con fuentes en `fichas-capa-I-A-D.md` (18), `fichas-capa-I-E-H.md` (19), `fichas-capa-I-becas.md` (18).

### A–D (18)
| trámite | plazo clave | multa | plan B | query miedo |
|---|---|---|---|---|
| No empadronar al menor antes de secretaría | admisión en primavera | no (fraude sí) | justificantes, pero pierdes puntos | "pierde el colegio" |
| No renovar padrón no comunitario | 2 años (+3 meses margen INE) | no | re-alta + histórico | "me borraron sin avisar" |
| DNI caducado: volar | DNI en vigor para frontera | no (601-30.000 si negativa a identificarse, LO 4/2015 36.6) | nacional: aerolínea lo acepta | "dni caducado me dejan volar" |
| Pasaporte <6 meses | requisito del destino | no | renovar antes | "5 meses puedo viajar" |
| Modelo 030 tras mudanza | 3 meses (art. 48 LGT) | SÍ: 100 € fijos (art. 198 LGT) | presentarlo tarde voluntariamente | "Hacienda me multa" |
| Autorización de regreso (EX-13) | 90 días, multiuso; tasa 10,72 € | no | sin ella no reentrar | "me quedo fuera" |
| Subsanación Correos | ABIERTA hasta 30-sep-2026 | no | desistimiento/archivo si no | "perdí la regularización" |
| No empadronar recién nacido | registro civil 10 días | no | volante; cascada TSI/pediatra | "bebé sin tarjeta sanitaria" |
| Multa DNI caducado | — | no por caducado | renovar caducado | "me multan" |
| Renovar DNI tarde | ventana 180 días | no | cualquier oficina nacional | — |
| DNI perdido en extranjero | — | no | salvoconducto consular | "cómo vuelo" |
| No hay citas pasaporte | — | no | 060, municipios, urgente | "viajo ya" |
| Hueco padrón arraigo | — | no | histórico + facturas/sanidad/laboral | "anularon arraigo" |
| Mudanza sin cambiar padrón | sin plazo | no | cambio a posteriori + TSI + 030 | "perdí el médico" |
| No dar baja al irse | sin plazo | no | baja voluntaria/consulado | "sigo en el padrón" |
| Empadronarse donde no vives | — | sí (ordenanzas; penal si falsedad) | empadronarse donde duerme | "denuncia" |
| Tarjeta UE caducada | 5 años; EX-19 | no | permanente automática a los 5 | "caducó hace años" |
| Cita DNI no atendida | — | no | anular y pedir otra | "¿sanción?" |

### E–H (19)
| trámite | plazo clave | multa | plan B | query miedo |
|---|---|---|---|---|
| Beca comedor fuera de plazo | por CCAA (CyL extra 1-22 sep; BCN 8-27 sep) | no | extraordinaria + municipal + fraccionamiento + SS.SS. | "fuera de plazo 2026" |
| Matrícula FP fuera de plazo | CyL: extra 2-4 sep; fuera de plazo desde 28-sep con vacantes (2.931 en CyL) | no | reservas/distancia | "septiembre vacantes" |
| Matrícula ESO/instituto fuera de plazo | La Rioja: abierto TODO el curso | no (absentismo posible) | comisión de escolarización | "no he matriculado" |
| Vacuna no puesta y escolarización | sin plazo legal (calendario = recomendación CISNS) | no | certificado del centro de salud; colegio NO puede rechazar | "colegio pide cartilla" |
| Lista de espera 0-3 | primavera | no | renuncias de sep; baremo (CyL: padrón máx 2 pts; Madrid: hermanos 15) | "eterna" |
| Registro civil nacimiento | 72h hospital / 10 días padres (Ley 20/2011) | no | expediente registral | "72 horas" |
| Impago comedor | ordenanza municipal | no (suspensión + apremio) | fraccionamiento/SS.SS. | "expulsan al niño" |
| Alta/baja comedor mitad de curso | 1 semana antes del mes (Aragón) | no | escrito secretaría | "me siguen cobrando" |
| Alergia sin certificado | al formalizar alta | no | certificado oficial; Ley 17/2011 art. 40 | "sin certificado" |
| Beca MEC plazo perdido | 7-abr→18/19-may-26 CERRADO | no | ACNEAE (10 sep) + colaboración (22 sep) + autonómicas | "pierdo el año" |
| Matrícula universidad sept | por uni (UCM 4-8 sep; Cat 16-17 sep) | no | fase extraordinaria/UNED | "fuera de plazo" |
| Cambio CCAA cartilla vacunas | sin plazo | no | certificado origen + Carpeta Ciudadana | "me mudo" |
| TSI bebé sin sacar | sin plazo | no | SIP provisional 3 meses (GVA) | "¿puedo ir al pediatra?" |
| Prestación nacimiento | HASTA 5 AÑOS (RD-ley 5/2023) | no | margen quinquenal | "6 meses perdidos" |
| Abono joven 26 | caduca por edad | no | bonificación estatal 40/50% | "cumplo 26" |
| Transporte rural sin plaza | por consejería | no | reclamación + Defensor | "pueblo" |
| Extraescolares fuera de plazo | BCN 15-sep→8-oct | no | lista + bajas oct-nov | "lista de espera" |
| Autorización recogida | RRI del centro | no | impreso en cualquier momento | "abuela no puede recoger" |
| Empadronar estudiante | residencia efectiva | dato falso: sí | empadronarse donde vive | "por beca" |

### BECAS (18)
| trámite | plazo clave | multa/reintegro | plan B | query miedo |
|---|---|---|---|---|
| Perder plazo MEC 26-27 | 7-abr→18/19-may CERRADO | no | ACNEAE 10-sep; colaboración 22-sep; autonómicas; NO hay "extraordinaria 2.500 €" | "¿hay 2500?" |
| No subsanar MEC | 10 días hábiles (cuenta aunque no leas) | no (denegación) | aportar antes de 1ª resolución / alegaciones | "caducado" |
| Denegada: alegaciones | 10 hábiles → reposición 1 mes → contencioso 2 meses | no | IRPF nuevo al año siguiente | "¿cuántos días?" |
| No superar créditos | verificación fin de curso | REINTEGRO + intereses (RD 1721/2007) | extraordinaria computa; renunciar antes; excepción matrícula | "¿la devuelvo?" |
| Cambio de estudios | modificación sept (7-28 ref.) | devolución si abandonas | matricular los que falten +30/60 créditos | "¿pierdo la beca?" |
| MEC + Erasmus | compatibles | reintegro si 50/40% | reclamar residencia curso completo | "¿pierdo la MEC?" |
| No cobrada / cuenta | pago ~4-5 semanas tras credencial | no | nueva cuenta titular/cotitular | "he cerrado la cuenta" |
| GVA exención tasas | 10-feb→9-mar cerrada; próxima ventana nov | no | MEC + reposición (plazo 31-jul→31-ago agotado) | "pago matrícula" |
| Madrid excelencia | 9-29 ene (26-27 por confirmar) | no | MEC es la vía principal | "¿lo perdí?" |
| Andalucía 6000/uni | dic-ene esperable; bonificación 99% automática | no | MEC + Santander (privada) | "¿cuándo abre?" |
| Erasmus+ sept-27 | nov-26→ene-27 por uni | no | bilaterales/SICUE | "¿cuándo solicitar?" |
| Residencia pública UV | 12-26 jun-26 | no | componente residencia MEC 2.700 € | "sin plaza" |
| Auxiliares (no es beca) | dic-ene; RENUNCIA EXCLUYE futuras | no | programas autonómicos | "¿me penaliza?" |
| Colaboración MEC | 21-jul→22-sep-26 ABIERTA | no | compatible MEC | "nota de corte" |
| Renuncia MEC | cualquier momento | no renunciar e incumplir → reintegro total | la renuncia ES el plan B | "¿o me la piden?" |
| MEC y trabajar | computa renta, no horas | datos falsos: reintegro | umbrales; independencia muy exigente | "me la quitan" |
| Denegada patrimonio | alegar 10 hábiles | no | nota simple + coeficientes; umbrales 47.600/14.450 | "casa de mis padres" |
| Municipal (Fuentes de Ebro) | 1-25 sep; padrón <1-1-2025 | no | MEC + DGA | "¿empadronado a tiempo?" |

---

# E5. CALENDARIO EDITORIAL SEP–DIC 2026 (8/mes, calidad > cantidad)

| Mes | 8 URLs | Justificación |
|---|---|---|
| **SEP** (ya) | 1. /extranjeria/subsanar-regularizacion-correos (ACTUALIZAR) · 2. /comedor/beca-comedor-fuera-de-plazo · 3. /comedor/no-puedo-pagar-comedor-escolar · 4. /fp/matricula-fp-en-septiembre · 5. /colegio/cambiar-de-colegio-fuera-de-plazo · 6. /becas/mec/modificar-datos (ventana 7-28) · 7. /becas/colaboracion (cierra 22) · 8. /dni/no-hay-citas | Correos cierra 30-sep; comedor pica sep (Trends 100); FP y cole en septiembre; ventanas MEC |
| **OCT** | 1. /becas/mec/ (hub) · 2. /becas/mec/cuando-se-cobra · 3. /becas/mec/denegada/por-patrimonio · 4. /pasaporte/bebe · 5. /dni/caducado-banco · 6. /dni/caducado-multa · 7. /extranjeria/autorizacion-regreso-navidad · 8. /becas/autonomicas/ayudas-estudio-cyl (abre ~21-oct) | Pre-nov: resoluciones MEC (pic nov); DNI/pasaporte pre-Navidad; CyL becas abre oct |
| **NOV** | 1. /becas/mec/estado · 2. /becas/mec/subsanacion · 3. /becas/mec/alegaciones · 4. /extranjeria/tie-caducada-viajar · 5. /dni/perdido-volar · 6. /pasaporte/salvoconducto · 7. /becas/autonomicas/beca-salario-gva (ventana nov) · 8. /dni/caducado-vueling | Pico beca mec nov (Trends 81); viajes Navidad con TIE/DNI; GVA abre |
| **DIC** | 1. /becas/mec/compatibilidad/erasmus · 2. /becas/mec/no-cobrada · 3. /pasaporte/renovar-antes-caducar · 4. /extranjeria/regularizacion-2026-resolucion · 5. /bebe/tarjeta-sanitaria-bebe · 6. /bebe/cartilla-de-vacunacion-donde-se-saca · 7. /empadronarse/volante-online · 8. /colegio/documentos-matricula-colegio | Pasaporte pica dic (100); pagos variable MEC; regularización post-subsanación; evergreen de bebé para enero |

(Renta NO entra en Q4, como exige el brief. Erasmus+ y preinscripción cole = P3 ene-mar 2027.)

---

# E6. ÁNGULOS QUE NADIE USA Y SÍ BUSCAN (18)

1. **"No hay citas: qué hacer hoy"** por trámite, con patrón horario real (6:00-9:00) y sin vender nada — el gap nº1 global.
2. **DNI caducado + banco/aerolínea** ("caixabank", "bbva", "vueling" en autocomplete real): tabla por entidad de qué aceptan.
3. **"Se me pasa el 30 de septiembre"** (Correos): qué pasa después — desistimiento, archivo, recurso. Nadie lo cubre.
4. **Volante vs certificado vs histórico** aplicado a cada consumidor (colegio, extranjería, banco) — quién mezcla, suspende.
5. **Padrón ≠ 030 ≠ TIE**: el ciudadano cruza los tres; los ayuntamientos que piden el 030 a extranjeros.
6. **"Beca comedor cerrada: ¿existe plan B?"** — segundas ventanas y servicios sociales, por CCAA.
7. **Matrícula FP después del corte** — vacantes reales documentadas (2.931 en CyL).
8. **La beca MEC como línea temporal** (pedí→modifiqué→subsané→resolvieron→cobré→¿devuelvo?) — nadie une las fases.
9. **"¿Cuándo cobro?"** sin bancos en la respuesta — calendario fija/variable y la matrícula que se paga a la uni.
10. **Denegada por el catastral de casa de tus padres** — umbrales 26-27 con cifras exactas y cómo alegar.
11. **Recién nacido: registro civil → SS → TSI → pediatra → padrón (orden correcto)** — burntheboats lo hace en EN; nadie en ES.
12. **Vacunas y escolarización: qué PAPEL pide el centro** (no la pauta) + un colegio no puede rechazar matrícula por cartilla.
13. **El ecosistema de citas de pago, desenmascarado por trámite** (29-350 €, robots, datos por WhatsApp) — transparencia radical de precios.
14. **"Qué NO necesitas"** — desmontar bulos: Barcelona no exige contrato; el certificado UE "verde" no caduca; la prestación por nacimiento dura 5 años, no 6 meses; el padrón da 3 meses de margen INE.
15. **Comparativa "gratis por tu cuenta vs pagando"** — nadie publica la columna "0 €" frente al mercado.
16. **Checklist según tu caso** (¿UE/no UE? ¿con contrato? ¿con hijos?) en vez de guía lineal — todos publican guías lineales.
17. **Fecha de captura verificable + changelog** ("contrastado el AAAA-MM-DD; cambió X") — los competidores ocultan fechas o hacen autoupdate falso.
18. **Municipalización sistemática** del obstáculo (cita padrón Madrid, huellas Barcelona, comedor por CCAA) — solo 2 competidores son locales y thin.

---

# E7. LISTA NEGRA (queries que NO atacamos)

- **Venta de citas/gestoría como H1**: "comprar cita extranjería", "gestor cita dni", "cita extranjeria pago", "sacar cita por mi" con ánimo de venta. Nunca CTA de compra.
- **"Te saco el padrón por 300 €"** y variantes de empadronamiento exprés/ficticio → responder con la ley (residencia efectiva, LBRL art. 15) y el riesgo (ficha 16), jamás instrucciones para fraude.
- **Consejo médico**: pautas vacunales, "¿qué vacuna le pongo?", posología, dietas de alergias. Solo: qué documento pide el centro, dónde se saca, calendario oficial enlazado.
- **Asesoría fiscal/personalizada**: calcular casos individuales de IRPF/umbrales del usuario; modelos de asesoría. Explicar el requisito, no el caso.
- **Marca pura como H1**: "sepe", "hacienda", "citapreviadnie" (sí como FAQ "¿es oficial?" dentro de /dni/cita-previa).
- **Becas de bancos/fundaciones**: "beca santander/la caixa/kutxabank/bankinter" (solo desambiguar "beca 2.500 €" dentro de /becas/mec/ aclarando que no es estatal).
- **Otros países**: conicet/progresar/telmex/beccacece/rita cetina (LatAm), SECTEI CDMX ("beca transporte" contaminada por México), "pasaporte bebe méxico/colombia/costa rica".
- **En cuarentena** (no publicar sin verificar): "beca transporte cursos SEPE", "beca adriano", "beca bus".
- **Renta** fuera de Q4 (vuelve ene-mar 2027).

---

# E8. FUENTES (URLs reales visitadas/vistas)

**Crudos de la corrida**: `research/trends-autocomplete-2026-09-ES.md` + `trends_batches.json` (12m/5y ×13 seeds) + `trends_related.json` + `trends_becas*.json` + `autocomplete.json` (25 seeds) + `autocomplete_becas.json` (18).

**Selección esencial** (índice completo por agente en cada artefacto):
- Normativa: BOE-A-2011-12628 (Ley 20/2011 RC) · BOE-A-2003-23186 (LGT 48/198) · BOE-A-2015-3442 (LO 4/2015 36.6) · BOE-A-1996-753 (Ley 4/1996) · BOE-A-2026-8284 (RD 316/2026) · BOE-B-2026-9261 (convocatoria MEC 26-27) · BOE-A-2025-4320 · BOE-B-2026-24454 · BOE-A-2026-10876 (MUFACE) · idapadron.ine.es (a2301ext/baj/ht/A2301vol)
- Sedes: becaseducacion.gob.es (portada/faqs/cómo-reclamar/obligaciones) · sede.educacion.gob.es · educacionfpydeportes.gob.es (050130, 998142, 050520) · citapreviadnie.es · dnielectronico.es (REF_420, RD 255/2025) · sede.policia.gob.es (regreso EX-13, tasa 10,72 €) · correos.es (regularización, WebFetch) · sede.agenciatributaria.gob.es (030, 3 meses) · prestaciones.seg-social.es · sanidad.gob.es (calendario 2026) · muface.es · sede.gva.es (265, G95885) · gobiernodecanarias.org · comunidad.madrid · juntadeandalucia.es · educa.jcyl.es/fp · xunta.gal (026115; ED601C) · universitats.gencat.cat · ucm.es · larioja.org · lexnavarra.navarra.es · educa.aragon.es · fuentesdeebro.es
- Prensa fechada 2026: elperiodico.com 31-08 (DNI Cataluña) · larazon.es 01-09 (citas >1 mes) · lavanguardia.com 15-05-2026 (citas 2 meses vista) · europapress 01-07 y 09-03 · moncloa.com 23-08 (cobro MEC) · abc.es 12-06 (Andalucía becas) · 20minutos 1168429 (2.931 vacantes FP CyL)
- Competencia fetcheada (12): infoinmigrantes.es ×2 · citaex.com · e-residence.com · madridactiva.es · extranjeriaclara.com · everestabogados.com · evitalios.com · generardni.com · migralis.com · extranjeriasimple.com · spainguru.es
- Foros/UGC (prueba de dificultad baja): Reddit r/ESLegal, r/askspain, r/GoingToSpain, r/SpainAuxiliares, r/Erasmus · Forocoches t=8368625, t=9015605 · BandaAncha · Trustpilot citapreviadnie · Facebook (bcnextranjeria, grupos regularización) · TikTok/Instagram/YouTube ES

**Regla de frescura para cada ficha publicada**: "Contrasta la sede oficial. Fecha de captura: 2026-09-04."
