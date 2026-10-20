"""Idempotente: 4 guías nuevas del cluster «mesa electoral» (20-10-2026). Fuentes: Orden INT/650/2026, LOREG 26-28, 80, 84, 95, 143; AEAT; Infoelectoral."""
from pathlib import Path
p=Path("src/lib/tramites/elecciones-29n-guias.ts");s=p.read_text()
S_ADD='''  aeatMesa: { href: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2025/7-cumplimentacion-irpf/7_1-rendimientos-trabajo-personal/7_1_1-rendimientos-integros/7_1_1_2-dietas-gastos-viaje/reglas-especiales/miembros-mesas-electorales.html", label: "Agencia Tributaria, manual de la renta: cantidades de los miembros de las mesas electorales" },
'''
if "aeatMesa:" not in s:
    s=s.replace("  loreg: (anchor: string, label: string) =>", S_ADD+"  loreg: (anchor: string, label: string) =>",1)
M={"mesa":'{ href: "/elecciones/miembro-de-mesa", label: "Me ha tocado mesa electoral: qué hago" }',
   "dieta":'{ href: "/elecciones/miembro-de-mesa-dieta-y-permisos", label: "Dieta de 75 € y permisos de la mesa" }',
   "cobro":'{ href: "/elecciones/cuando-se-cobra-la-dieta-de-mesa", label: "Cuándo y cómo se cobra la dieta de mesa" }',
   "vol":'{ href: "/elecciones/voluntario-mesa-electoral", label: "¿Se puede pedir ser mesa? Lo que dice la ley" }',
   "noir":'{ href: "/elecciones/que-pasa-si-no-voy-a-la-mesa", label: "Qué pasa si te toca mesa y no vas" }',
   "horario":'{ href: "/elecciones/horario-mesa-electoral", label: "Horario de la mesa electoral y permiso del lunes" }',
   "sorteo":'{ href: "/elecciones/sorteo-mesa-electoral-29n", label: "¿Me toca mesa? Cuándo es el sorteo" }',
   "excusa":'{ href: "/elecciones/excusa-mesa-electoral", label: "Excusas para la mesa electoral" }'}
def rel(*k): return "["+", ".join(M[x] for x in k)+"]"
NEW=f'''  // CLUSTER MESA 2026-10-20
  g({{
    id: "29n-mesa-cobro",
    reviewedAt: "2026-10-20",
    path: "/elecciones/cuando-se-cobra-la-dieta-de-mesa",
    h1: "Cuándo y cómo se cobra la dieta de la mesa electoral",
    title: "Dieta de mesa electoral: cuándo se cobra y si tributa",
    description: "75 € por jornada para presidente y vocales titulares (Orden INT/650/2026), íntegra, sobre todo en efectivo. No tributa en el IRPF (Agencia Tributaria).",
    lead: "Respuesta corta: presidentes y vocales titulares cobran 75 € por la jornada del 29 de noviembre, íntegros aunque no estén todo el día (Orden INT/650/2026). La propia orden explica que la mayoría de los pagos se hacen en efectivo. La orden no fija un plazo de pago. La Agencia Tributaria considera esta dieta exceptuada de gravamen: no tributa en el IRPF.",
    cta: S.dieta,
    secondaryCta: S.aeatMesa,
    sources: [S.dieta, S.aeatMesa, S.mesaInfo, S.loreg("aveintiocho", "artículo 28: permisos y dieta")],
    related: {rel("dieta","mesa","horario","noir","sorteo")},
    faqs: [
      {{ q: "¿Cuánto se cobra por ser mesa el 29-N?", a: "75 € por titular y jornada electoral (artículo 1 de la Orden INT/650/2026). En 2023 eran 70 € (Orden INT/212/2023)." }},
      {{ q: "¿Cobran igual el presidente y los vocales?", a: "Sí. La orden fija la misma dieta de 75 € para el presidente y para los vocales." }},
      {{ q: "¿Los suplentes cobran?", a: "Solo si pasan a ser titulares porque falta alguien (artículo 2 de la orden). Si no llegan a ocupar su puesto, no cobran." }},
      {{ q: "¿Hay que declarar los 75 € en la renta?", a: "No. El manual de la renta de la Agencia Tributaria dice que las cantidades de los miembros de las mesas electorales están exceptuadas de gravamen." }},
      {{ q: "¿Me la quitan si me voy antes?", a: "La orden dice que se cobra íntegra con independencia del tiempo que se haya desempeñado el cargo." }},
    ],
    sections: [
      {{
        id: "quien-cobra",
        title: "Quién cobra y cuánto",
        paragraphs: [],
        table: {{
          caption: "Dieta de la mesa electoral el 29 de noviembre de 2026",
          head: ["Cargo", "Dieta", "Fuente"],
          rows: [
            {{ cells: ["Presidente titular", "75 €"], source: S.dieta }},
            {{ cells: ["Vocal titular (dos por mesa)", "75 €"], source: S.dieta }},
            {{ cells: ["Suplente que pasa a titular", "75 €"], source: S.dieta }},
            {{ cells: ["Suplente que no llega a actuar", "0 €"], source: S.dieta }},
          ],
        }},
      }},
      {{
        id: "como",
        title: "Cómo se paga",
        paragraphs: [
          "La Orden INT/650/2026 redondeó la dieta a 75 € precisamente para facilitar los pagos, que según su preámbulo se hacen mayoritariamente en efectivo. La orden no fija el día ni el canal de pago: lo organiza la Administración en cada mesa o municipio.",
          "Se cobra una sola dieta por jornada, aunque ese día coincidan varias elecciones.",
        ],
      }},
      {{
        id: "irpf",
        title: "¿Tributa en el IRPF?",
        paragraphs: ["No. La Agencia Tributaria, en su manual práctico de la renta, indica que «estarán exceptuadas de gravamen las cantidades percibidas por los miembros de las Mesas Electorales». No hay que incluirla en la declaración."],
      }},
    ],
  }}),
  g({{
    id: "29n-mesa-voluntario",
    reviewedAt: "2026-10-20",
    path: "/elecciones/voluntario-mesa-electoral",
    h1: "¿Se puede pedir ser mesa electoral? Lo que dice la ley",
    title: "¿Puedo ser voluntario de mesa electoral? Lo que dice la LOREG",
    description: "No: presidente y vocales salen por sorteo público entre los electores de cada mesa (LOREG art. 26). Requisitos: saber leer y escribir y menos de 70 años.",
    lead: "Respuesta corta: no puedes apuntarte. La LOREG (artículo 26) dice que presidente y vocales se designan por sorteo público entre todas las personas de la lista de electores de esa mesa que sepan leer y escribir y tengan menos de 70 años. Para el 29-N, los ayuntamientos sortean entre el 31 de octubre y el 4 de noviembre de 2026. Lo que sí puedes hacer es comprobar que estás en el censo y cumplir los requisitos.",
    cta: S.loreg("aveintiseis", "artículo 26: sorteo de las mesas"),
    secondaryCta: S.mesaInfo,
    sources: [S.loreg("aveintiseis", "artículo 26: sorteo de las mesas"), S.loreg("aveintisiete", "artículo 27: cargo obligatorio"), S.jec, S.mesaInfo, S.ineSede],
    related: {rel("sorteo","mesa","cobro","excusa","noir")},
    faqs: [
      {{ q: "¿Hay listas de voluntarios para ser mesa?", a: "La LOREG no las prevé: la designación es por sorteo público entre todos los electores de la mesa que cumplen los requisitos." }},
      {{ q: "¿Qué estudios hacen falta para ser presidente?", a: "Bachiller o Formación Profesional de segundo grado o, subsidiariamente, Graduado Escolar o equivalente (artículo 26.2 de la LOREG). Para vocal basta con saber leer y escribir." }},
      {{ q: "¿Puede tocarle a un candidato?", a: "No. El artículo 27 de la LOREG dice que los cargos de la mesa no pueden desempeñarlos quienes se presenten como candidatos." }},
      {{ q: "¿Puedo ir al sorteo?", a: "El artículo 26 dice que el sorteo es público. Pregunta en tu ayuntamiento el día y la hora." }},
    ],
    sections: [
      {{
        id: "requisitos",
        title: "Requisitos para que te toque",
        paragraphs: [],
        table: {{
          caption: "Quién entra en el sorteo de la mesa (LOREG, artículos 26 y 27)",
          head: ["Requisito", "Presidente", "Vocal", "Fuente"],
          rows: [
            {{ cells: ["Estar en la lista de electores de esa mesa", "Sí", "Sí"], source: S.loreg("aveintiseis", "artículo 26") }},
            {{ cells: ["Saber leer y escribir", "Sí", "Sí"], source: S.loreg("aveintiseis", "artículo 26") }},
            {{ cells: ["Edad", "Menos de 70 años (de 65 a 69 puede renunciar)", "Menos de 70 años (de 65 a 69 puede renunciar)"], source: S.loreg("aveintiseis", "artículo 26") }},
            {{ cells: ["Estudios", "Bachiller o FP de segundo grado; si no, Graduado Escolar", "No se exigen"], source: S.loreg("aveintiseis", "artículo 26") }},
            {{ cells: ["No ser candidato", "Sí", "Sí"], source: S.loreg("aveintisiete", "artículo 27") }},
          ],
        }},
      }},
      {{
        id: "que-hacer",
        title: "Qué puedes hacer si quieres ser mesa",
        paragraphs: [],
        lists: [[
          "Comprueba que estás inscrito en el censo electoral en la sede del INE.",
          "Ten a mano la dirección que figura en el censo: allí llega la notificación, en los 3 días siguientes al sorteo.",
          "Si te toca, el cargo es obligatorio y se cobra una dieta de 75 € (Orden INT/650/2026).",
        ]],
      }},
    ],
  }}),
  g({{
    id: "29n-mesa-no-ir",
    reviewedAt: "2026-10-20",
    path: "/elecciones/que-pasa-si-no-voy-a-la-mesa",
    h1: "Qué pasa si te toca mesa y no vas",
    title: "Si te toca mesa y no vas: prisión o multa (LOREG art. 143)",
    description: "No ir a la mesa sin causa legítima es delito: prisión de 3 meses a 1 año o multa de 6 a 24 meses (LOREG art. 143). Cómo excusarte a tiempo.",
    lead: "Respuesta corta: es un delito electoral. El artículo 143 de la LOREG castiga a presidentes, vocales y suplentes que no acudan, abandonen la mesa sin causa legítima o no avisen como exige la ley con prisión de 3 meses a 1 año o multa de 6 a 24 meses. Si no puedes ir, tienes 7 días desde la notificación para alegar una causa justificada ante la Junta Electoral de Zona.",
    cta: S.loreg("acientocuarentaytres", "artículo 143: delitos en las mesas electorales"),
    secondaryCta: S.mesaInfo,
    sources: [S.loreg("acientocuarentaytres", "artículo 143: delitos en las mesas electorales"), S.loreg("aveintisiete", "artículo 27: excusas y aviso"), S.loreg("aochenta", "artículo 80: constitución de la mesa"), S.mesaInfo],
    related: {rel("excusa","mesa","sorteo","horario","cobro")},
    faqs: [
      {{ q: "¿Es una multa administrativa o un delito?", a: "Un delito: el artículo 143 de la LOREG está en el capítulo de delitos electorales y prevé prisión de 3 meses a 1 año o multa de 6 a 24 meses." }},
      {{ q: "¿También afecta a los suplentes?", a: "Sí. El artículo 143 incluye a los suplentes que dejen de acudir sin causa legítima." }},
      {{ q: "¿Qué pasa si la mesa no se puede formar?", a: "La Junta Electoral de Zona designa libremente a quien la forme, incluso a electores presentes en el local, e informa al Ministerio Fiscal de quienes no comparecieron (artículo 80 de la LOREG)." }},
      {{ q: "¿Y si me pongo enfermo a última hora?", a: "Comunícalo a la Junta Electoral de Zona en cuanto lo sepas y aporta la justificación. El artículo 27 regula el aviso de quien no pueda acudir después de ser designado." }},
    ],
    sections: [
      {{
        id: "pena",
        title: "La pena, según la ley",
        paragraphs: [],
        table: {{
          caption: "Artículo 143 de la LOREG",
          head: ["Conducta", "Pena", "Fuente"],
          rows: [
            {{ cells: ["No acudir o no desempeñar las funciones sin causa legítima", "Prisión de 3 meses a 1 año o multa de 6 a 24 meses"], source: S.loreg("acientocuarentaytres", "artículo 143") }},
            {{ cells: ["Abandonar la mesa sin causa legítima", "Prisión de 3 meses a 1 año o multa de 6 a 24 meses"], source: S.loreg("acientocuarentaytres", "artículo 143") }},
            {{ cells: ["No cumplir la obligación de excusa o aviso previo", "Prisión de 3 meses a 1 año o multa de 6 a 24 meses"], source: S.loreg("acientocuarentaytres", "artículo 143") }},
          ],
        }},
      }},
      {{
        id: "evitarlo",
        title: "Cómo evitarlo",
        paragraphs: [],
        lists: [[
          "Alega tu causa en 7 días desde la notificación ante la Junta Electoral de Zona, con documentos (artículo 27.3).",
          "La Junta responde en 5 días y su decisión no admite recurso.",
          "Si después te surge un impedimento, avisa a la Junta lo antes posible (artículo 27.4).",
        ]],
      }},
    ],
  }}),
  g({{
    id: "29n-mesa-horario",
    reviewedAt: "2026-10-20",
    path: "/elecciones/horario-mesa-electoral",
    h1: "Horario de la mesa electoral el 29-N y permiso del lunes",
    title: "Horario de la mesa electoral: de 8:00 al escrutinio",
    description: "La mesa se reúne a las 8:00, se vota de 9:00 a 20:00 y después se hace el escrutinio (LOREG arts. 80, 84 y 95). El lunes 30, 5 horas menos de jornada.",
    lead: "Respuesta corta: presidente, vocales y suplentes se reúnen a las 8:00 del domingo 29 de noviembre (LOREG art. 80). La votación va de 9:00 a 20:00 sin interrupción (art. 84) y, acto seguido, empieza el escrutinio (art. 95), que termina cuando se firman las actas. Si trabajas por cuenta ajena o eres funcionario, el lunes 30 tienes 5 horas menos de jornada (art. 28).",
    cta: S.mesaInfo,
    secondaryCta: S.loreg("aochentaycuatro", "artículo 84: horario de votación"),
    sources: [S.loreg("aochenta", "artículo 80: reunión a las ocho"), S.loreg("aochentaycuatro", "artículo 84: votación de 9 a 20 h"), S.loreg("anoventaycinco", "artículo 95: escrutinio"), S.loreg("aveintiocho", "artículo 28: permisos"), S.mesaInfo],
    related: {rel("dieta","cobro","mesa","noir","excusa")},
    faqs: [
      {{ q: "¿A qué hora tengo que estar en la mesa?", a: "A las 8:00 del día de la votación, en tu local electoral (artículo 80 de la LOREG). Los suplentes también." }},
      {{ q: "¿Me puedo ir un rato?", a: "La mesa debe tener siempre al menos dos de sus miembros presentes (artículo 89 de la LOREG)." }},
      {{ q: "¿A qué hora termina?", a: "La ley no fija una hora: el escrutinio empieza al cerrar la votación a las 20:00 y la mesa termina cuando ha firmado el acta y preparado la documentación (artículos 95 a 100)." }},
      {{ q: "¿El lunes tengo que trabajar?", a: "Sí, pero con 5 horas menos de jornada si trabajas por cuenta ajena o eres funcionario (artículo 28.1 de la LOREG). Si trabajas de noche, Interior indica que la reducción se aplica al turno de noche siguiente." }},
    ],
    sections: [
      {{
        id: "horario",
        title: "La jornada, hora a hora",
        paragraphs: [],
        table: {{
          caption: "Jornada de la mesa electoral el domingo 29 de noviembre de 2026",
          head: ["Hora", "Qué pasa", "Fuente"],
          rows: [
            {{ cells: ["8:00", "Se reúnen presidente, vocales y suplentes y se constituye la mesa"], source: S.loreg("aochenta", "artículo 80") }},
            {{ cells: ["9:00", "Empieza la votación"], source: S.loreg("aochentaycuatro", "artículo 84") }},
            {{ cells: ["20:00", "Termina la votación"], source: S.loreg("aochentaycuatro", "artículo 84") }},
            {{ cells: ["Desde las 20:00", "Escrutinio público, actas y sobres de documentación"], source: S.loreg("anoventaycinco", "artículo 95") }},
            {{ cells: ["Lunes 30", "5 horas menos de jornada laboral"], source: S.loreg("aveintiocho", "artículo 28") }},
          ],
        }},
      }},
    ],
  }}),
'''
ANCHOR='  g({\n    id: "29n-permiso-votar",'
if 'id: "29n-mesa-cobro"' not in s:
    assert s.count(ANCHOR)==1; s=s.replace(ANCHOR,NEW+ANCHOR)
# cluster links on existing pages
a='related: [R.dietas, R.jornada, R.interventores, R.faq, { href: "/elecciones/sorteo-mesa-electoral-29n"'
if a in s and "cuando-se-cobra-la-dieta-de-mesa\", label: \"Cuándo y cómo se cobra la dieta de mesa\" }, "+M["vol"] not in s:
    s=s.replace(a,'related: [R.dietas, '+M["cobro"]+', '+M["vol"]+', '+M["noir"]+', '+M["horario"]+', R.jornada, R.interventores, R.faq, { href: "/elecciones/sorteo-mesa-electoral-29n"',1)
a='related: [R.mesa, R.permiso, R.interventores, R.faq],'
if a in s: s=s.replace(a,'related: [R.mesa, '+M["cobro"]+', '+M["horario"]+', '+M["noir"]+', '+M["vol"]+', R.permiso, R.interventores, R.faq],',1)
a='sources: [S.dieta, S.mesaInfo, S.loreg("aveintiocho", "artículo 28: permisos y dieta de los miembros de mesa")],'
if a in s: s=s.replace(a,'sources: [S.dieta, S.mesaInfo, S.aeatMesa, S.loreg("aveintiocho", "artículo 28: permisos y dieta de los miembros de mesa")],',1)
a='"Reducción de 5 horas de jornada el día siguiente (lunes 30 de noviembre)."]]'
if a in s: s=s.replace(a,'"Reducción de 5 horas de jornada el día siguiente (lunes 30 de noviembre).", "No tributa en el IRPF: la Agencia Tributaria la considera exceptuada de gravamen."]]',1)
p.write_text(s)
q=Path("scripts/build_sitemaps.py");t=q.read_text()
if "voluntario-mesa-electoral" not in t:
    t=t.replace('    "/elecciones/miembro-de-mesa-dieta-y-permisos",\n','    "/elecciones/miembro-de-mesa-dieta-y-permisos",\n    "/elecciones/cuando-se-cobra-la-dieta-de-mesa",\n    "/elecciones/voluntario-mesa-electoral",\n    "/elecciones/que-pasa-si-no-voy-a-la-mesa",\n    "/elecciones/horario-mesa-electoral",\n',1);q.write_text(t)
print("ok")
