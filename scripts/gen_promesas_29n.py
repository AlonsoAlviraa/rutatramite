import json, re
D = json.load(open('data/promesas-29n/promises.json'))
UPD = D['updated']
P = {p['id']: p for p in D['parties']}
ORDER = [p['id'] for p in D['parties']]
TOP = D['topics']
PR = D['promises']
BASE = '/elecciones/promesas'
RD = {"label": "BOE: Real Decreto 806/2026, convocatoria del 29-N", "href": "https://www.boe.es/eli/es/rd/2026/10/05/806"}
NOTE = ("Contenido informativo y neutral. Mismo formato para todos los partidos, ordenados por votos en las generales de 2023. "
        "Cada medida enlaza a su fuente con fecha; si un partido no ha publicado nada, lo indicamos como «pendiente de programa». "
        "No recomendamos ningún voto.")
STYPE = {"oficial-partido": "web oficial del partido", "oficial-gobierno": "fuente oficial del Gobierno", "prensa": "prensa (sin documento oficial del partido)"}
PROFILES = {
 "estudiante": ("Estudiantes", "estudiantes", "/ayudas-por-gobierno/estudiantes"),
 "familia": ("Familias con hijos", "familias con hijos", "/ayudas-por-gobierno/familias"),
 "joven-alquiler": ("Jóvenes y alquiler", "jóvenes que alquilan o quieren comprar", "/ayudas-por-gobierno/jovenes-alquiler"),
 "jubilado": ("Jubilados y pensionistas", "jubilados y pensionistas", "/ayudas-por-gobierno/jubilados"),
 "autonomo": ("Autónomos", "autónomos", "/ayudas-por-gobierno/autonomos"),
 "parado": ("Personas en paro", "personas en paro", "/ayudas-por-gobierno/desempleados"),
 "dependencia": ("Discapacidad y dependencia", "personas con discapacidad o dependencia", "/ayudas-por-gobierno/discapacidad-dependencia"),
}
CCAA = [
 ("andalucia","Andalucía",60,"comun"),("aragon","Aragón",13,"comun"),("asturias","Asturias",7,"comun"),("illes-balears","Illes Balears",8,"comun"),
 ("canarias","Canarias",15,"canarias"),("cantabria","Cantabria",5,"comun"),("castilla-y-leon","Castilla y León",31,"comun"),
 ("castilla-la-mancha","Castilla-La Mancha",21,"comun"),("cataluna","Cataluña",48,"comun"),("comunitat-valenciana","Comunitat Valenciana",33,"comun"),
 ("extremadura","Extremadura",9,"comun"),("galicia","Galicia",23,"comun"),("madrid","Comunidad de Madrid",38,"comun"),("murcia","Región de Murcia",10,"comun"),
 ("navarra","Navarra",5,"foral"),("pais-vasco","País Vasco",18,"foral"),("la-rioja","La Rioja",4,"comun"),("ceuta","Ceuta",1,"ceutamelilla"),("melilla","Melilla",1,"ceutamelilla")]
assert sum(c[2] for c in CCAA) == 350
LOIRPF = "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764"
LIVA = "https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740"
REGIME = {
 "comun": "Régimen fiscal común: el IRPF tiene un tramo estatal y otro autonómico, y el Impuesto de Transmisiones (ITP) de la vivienda usada lo fija la comunidad. Vivienda, educación y sanidad son competencias de la comunidad.",
 "foral": "Régimen foral: la Hacienda foral tiene su propio IRPF e ITP, así que las rebajas del IRPF estatal no se aplican directamente aquí. Vivienda, educación y sanidad son competencias propias.",
 "canarias": "Canarias no aplica el IVA, sino el IGIC (impuesto canario). Las rebajas de IVA no se trasladan solas: haría falta un cambio del IGIC. El IRPF y el ITP funcionan como en el régimen común.",
 "ceutamelilla": "Ceuta y Melilla no aplican el IVA, sino el IPSI, y sus residentes tienen una deducción especial en el IRPF (art. 68.4 de la Ley del IRPF). La sanidad y la educación las gestiona el Estado, no la ciudad.",
}
def apply_in(pr, reg):
    tax = pr.get('tax') or ''; lvl = pr['level']
    if 'itp' in tax and 'iva' in tax:
        return "En parte: el ITP depende de " + ("la Hacienda foral" if reg == 'foral' else "la comunidad") + ("; y aquí no hay IVA, sino " + ("IGIC" if reg == 'canarias' else "IPSI") + "." if reg in ('canarias', 'ceutamelilla') else "; el IVA es estatal.")
    if 'iva' in tax and reg in ('canarias', 'ceutamelilla'):
        return "No aplica tal cual: aquí no hay IVA (" + ("IGIC" if reg == 'canarias' else "IPSI") + ")."
    if 'irpf' in tax and reg == 'foral':
        return "No directamente: el IRPF es foral; dependería de la Hacienda foral."
    if 'itp' in tax:
        return "En parte: el ITP lo fija " + ("la Hacienda foral." if reg == 'foral' else "la comunidad autónoma.")
    if 'autonómica' in lvl:
        return "Sí, pero necesita a la comunidad: la vivienda y la gestión son competencia autonómica."
    return "Sí: es una medida estatal, igual en toda España."
def src(pr):
    return {"label": f"{pr['source_title']} ({fmtdate(pr['source_date'])}, {STYPE[pr['source_type']]})", "href": pr['source_url']}
MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
def fmtdate(s):
    p = s.split('-')
    if len(p) == 2: return f"{MESES[int(p[1])-1]} de {p[0]}"
    return f"{int(p[2])} de {MESES[int(p[1])-1]} de {p[0]}"
def pname(pid): return P[pid]['name']
def short(pid): return {"pp":"PP","psoe":"PSOE","vox":"Vox","frente-amplio":"Frente Amplio","podemos":"Podemos"}[pid]
def fitdesc(s):
    s = re.sub(r'\s+', ' ', s).strip()
    pad = " Fuentes y fecha de cada medida."
    if len(s) < 110: s = s + pad
    if len(s) < 110: s = s + " Neutral y actualizado."
    if len(s) > 158: s = s[:155].rsplit(' ', 1)[0].rstrip(',;:') + "…"
    assert 110 <= len(s) <= 158, (len(s), s)
    return s
def impact_text(pr):
    k = pr.get('impact')
    if k == 'iva6':
        return ("Cálculo: pasar del 10 % al 4 % ahorra el 6 % del precio de una vivienda nueva. Con 150.000 € serían 9.000 €; con 200.000 €, 12.000 €; con 250.000 €, 15.000 €. "
                "Solo vale para vivienda nueva comprada al promotor (la usada paga ITP, no IVA) y no aplica en Canarias, Ceuta ni Melilla, que no tienen IVA. Base legal del IVA: Ley 37/1992.")
    if k == 'tucasa':
        return ("Cálculo: el préstamo es el 20 % del valor con un tope de 50.000 €. Para 150.000 € serían 30.000 €; para 200.000 €, 40.000 €; desde 250.000 €, 50.000 €. "
                "Es un préstamo al 0 % que se devuelve, no una ayuda a fondo perdido; los requisitos finales los fija un acuerdo posterior del Consejo de Ministros.")
    if k == 'alquiler10':
        return ("Cálculo: el 10 % del alquiler pagado en el año. Con 600 € al mes (7.200 € al año) serían 720 €; con 800 € al mes, 960 €. Solo para rentas inferiores a 33.007,20 € al año. "
                "La nota oficial no detalla un tope de deducción: compruébalo en el BOE. En País Vasco y Navarra no aplica, porque su IRPF es foral.")
    return None
G = []
def guide(slug, h1, title, desc, lead, sections, faqs, related, sources, cta=None, pack="promesas-29n", path=None):
    g = {"id": "p29n-" + slug, "pack": pack, "reviewedAt": UPD, "path": path or f"{BASE}/{slug}", "h1": h1, "title": title,
         "description": fitdesc(desc), "lead": lead, "cta": cta or {"href": f"{BASE}", "label": "Ver todas las promesas del 29-N"},
         "secondaryCta": {"href": "/elecciones", "label": "Guía para votar el 29-N"}, "sources": sources, "related": related,
         "disclaimer": NOTE, "faqs": faqs, "sections": sections}
    G.append(g); return g
def rows_for(prs, cols):
    return [{"cells": c(pr), "source": {"label": fmtdate(pr['source_date']), "href": pr['source_url']}} for pr in prs for c in [cols]]
def uniq_sources(prs):
    seen = {}; 
    for pr in prs: seen.setdefault(pr['source_url'], src(pr))
    return [RD] + list(seen.values())
PEND = "Pendiente de programa: a {d} no hemos encontrado ninguna medida concreta de este partido sobre este tema en su web oficial ni en declaraciones públicas fechadas."
COMMON_REL = [{"href": BASE, "label": "Promesas del 29-N: todas las medidas"}, {"href": f"{BASE}/metodologia", "label": "Cómo elaboramos esta comparativa"}, {"href": "/elecciones", "label": "Elecciones del 29-N: cómo votar"}, {"href": "/ayudas-por-gobierno", "label": "Ayudas según cada gobierno desde 1996"}]
def party_table(prs, cap, extra=None):
    head = ["Partido", "Medida", "Tipo de fuente"] + ([extra[0]] if extra else []) + ["Fuente"]
    rows = []
    for pr in prs:
        cells = [short(pr['party']), pr['measure'], STYPE[pr['source_type']]] + ([extra[1](pr)] if extra else [])
        rows.append({"cells": cells, "source": {"label": f"{pr['source_title']}, {fmtdate(pr['source_date'])}", "href": pr['source_url']}})
    return {"caption": cap, "head": head, "rows": rows}
dU = fmtdate(UPD)
# ---- topics (comparators)
TOPIC_SLUG = {"vivienda":"vivienda","impuestos":"impuestos","empleo":"empleo-y-salarios","inmigracion":"inmigracion","administracion":"burocracia-y-cita-previa","pensiones":"pensiones"}
for t, tname in TOP.items():
    prs = [p for p in PR if p['topic'] == t]
    secs = []
    for pid in ORDER:
        mine = [p for p in prs if p['party'] == pid]
        paras = [f"Candidato o líder: {P[pid]['leader']}. Programa para el 29-N: {P[pid]['programa29n']}."]
        if mine:
            paras += [f"«{p['quote']}» ({p['source_title']}, {fmtdate(p['source_date'])})." for p in mine]
            for p in mine:
                it = impact_text(p)
                if it: paras.append(it)
            sec = {"id": pid, "title": f"{pname(pid)}", "paragraphs": paras, "table": party_table(mine, f"{short(pid)}: medidas sobre {tname.lower()}")}
        else:
            sec = {"id": pid, "title": f"{pname(pid)}", "paragraphs": paras + [PEND.format(d=dU)]}
        secs.append(sec)
    n = len({p['party'] for p in prs})
    secs.append({"id": "como-leer", "title": "Cómo leer esta comparativa", "paragraphs": [D['order_rule'], "Que un partido tenga más filas no significa que su propuesta sea mejor: solo refleja cuántas medidas concretas ha publicado hasta ahora. Las marcadas como «prensa» no tienen todavía un documento oficial del partido."]})
    G.append(None); G.pop()
    guide(f"que-propone-cada-partido-{TOPIC_SLUG[t]}",
          f"Qué propone cada partido sobre {tname.lower()} para el 29-N",
          f"{tname}: qué propone cada partido el 29-N",
          f"{tname} en las elecciones del 29 de noviembre: qué propone PP, PSOE, Vox, Frente Amplio y Podemos, con la cita y la fuente de cada medida.",
          f"Respuesta corta: {n} de los 5 partidos principales han concretado algo sobre {tname.lower()} a {dU}; ningún programa completo del 29-N está publicado aún. Abajo, cada partido con sus medidas citadas o marcado como «pendiente de programa».",
          secs,
          [{"q": f"¿Qué partido propone más sobre {tname.lower()}?", "a": "No lo valoramos. Mostramos todas las medidas concretas que cada partido ha publicado o anunciado, con la misma estructura para todos."},
           {"q": "¿Están ya los programas electorales del 29-N?", "a": f"A {dU} ningún partido principal ha publicado su programa completo para el 29-N. Actualizamos esta página cada día."},
           {"q": "¿Por qué algunas medidas pone «prensa»?", "a": "Porque el anuncio solo aparece en medios y no en un documento oficial del partido. Lo indicamos para que sepas cuánto peso darle."}],
          COMMON_REL + [{"href": f"{BASE}/perfil-joven-alquiler", "label": "Cómo te afecta si eres joven y alquilas"}],
          uniq_sources(prs))
# ---- parties
for pid in ORDER:
    mine = [p for p in PR if p['party'] == pid]
    secs = [{"id": "ficha", "title": "Ficha", "paragraphs": [f"Líder o candidato: {P[pid]['leader']}.", f"Resultado en 2023: {P[pid]['votes2023']}.", f"Programa para el 29-N: {P[pid]['programa29n']}.", "Las candidaturas se proclaman el 2 de noviembre y se publican en el BOE el 3 de noviembre: hasta entonces no hay candidatos oficiales."]}]
    for t, tname in TOP.items():
        m = [p for p in mine if p['topic'] == t]
        if m:
            secs.append({"id": t, "title": tname, "paragraphs": [p['measure'] for p in m] + [x for x in (impact_text(p) for p in m) if x], "table": party_table(m, f"{short(pid)}: {tname.lower()}")})
        else:
            secs.append({"id": t, "title": tname, "paragraphs": [PEND.format(d=dU)]})
    guide(f"partido-{pid}", f"{pname(pid)}: qué promete para el 29-N",
          f"{short(pid)}: promesas y medidas para el 29-N",
          f"Qué propone {short(pid)} para las elecciones del 29 de noviembre: vivienda, impuestos, empleo, pensiones y más, con la fuente y la fecha de cada medida.",
          f"Respuesta corta: {short(pid)} ha concretado {len(mine)} medida{'s' if len(mine)!=1 else ''} con fuente a {dU}; su programa completo para el 29-N está pendiente. Mismo formato y mismos temas que el resto de partidos.",
          secs,
          [{"q": f"¿Ha publicado {short(pid)} su programa para el 29-N?", "a": f"A {dU}, no. Recogemos lo que ha anunciado con fuente y fecha, y lo sustituiremos por el programa en cuanto se publique."},
           {"q": "¿Cómo eligen qué medidas aparecen?", "a": "Aparecen todas las medidas concretas que hemos encontrado con fuente fechada. No seleccionamos por relevancia ni por afinidad."},
           {"q": "¿Por qué este orden de partidos?", "a": D['order_rule']}],
          COMMON_REL + [{"href": f"{BASE}/partido-{o}", "label": f"Qué promete {short(o)}"} for o in ORDER if o != pid][:3],
          uniq_sources(mine) + [{"label": f"Web oficial de {short(pid)}", "href": P[pid]['web']}])
# ---- otros
guide("otros-partidos", "Otros partidos del 29-N: ERC, Junts, Bildu, PNV, BNG y más", "Otros partidos del 29-N: qué proponen",
      "ERC, Junts, EH Bildu, PNV, BNG, Coalición Canaria, UPN y nuevos partidos en el 29-N: estado de sus programas y cuándo se conocerán las candidaturas.",
      f"Respuesta corta: a {dU} ninguno de estos partidos ha publicado su programa para el 29-N. Los añadiremos con el mismo formato cuando lo hagan o cuando el BOE publique las candidaturas proclamadas (3 de noviembre).",
      [{"id": "lista", "title": "Estado de cada partido", "paragraphs": [f"{o}: pendiente de programa." for o in D['others']]},
       {"id": "criterio", "title": "Por qué no tienen ficha propia todavía", "paragraphs": ["Damos ficha propia a los partidos con grupo estatal relevante en 2023. Los partidos que solo se presentan en algunas provincias aparecerán en las páginas de su comunidad en cuanto publiquen medidas."]}],
      [{"q": "¿Cuándo se sabe qué partidos se presentan?", "a": "Las candidaturas se presentan del 21 al 26 de octubre y el BOE publica las proclamadas el 3 de noviembre."},
       {"q": "¿Aparecen en mi papeleta los partidos que solo van en otras provincias?", "a": "No: en las generales cada provincia tiene sus propias listas, así que solo verás las candidaturas presentadas en la tuya."}],
      COMMON_REL, [RD])
# ---- CCAA
for slug, name, dip, reg in CCAA:
    rows = []
    for pid in ORDER:
        mine = [p for p in PR if p['party'] == pid]
        if not mine:
            rows.append({"cells": [short(pid), "Pendiente de programa", "—"], "source": {"label": "Web del partido", "href": P[pid]['web']}})
        for p in mine:
            rows.append({"cells": [short(pid), p['measure'], apply_in(p, reg)], "source": {"label": f"{p['source_title']}, {fmtdate(p['source_date'])}", "href": p['source_url']}})
    nota = {"canarias": "En Canarias, las propuestas de bajar el IVA (vivienda nueva, alimentos) no se aplicarían tal cual.",
            "ceutamelilla": f"En {name}, las propuestas de bajar el IVA no se aplicarían tal cual, porque allí rige el IPSI.",
            "foral": f"En {name}, las rebajas del IRPF estatal (por ejemplo, para jóvenes o deflactar la tarifa) no se aplicarían directamente.",
            "comun": f"En {name} se aplican todas las medidas estatales; las de vivienda y el ITP dependen además del gobierno autonómico."}[reg]
    guide(f"comunidad-{slug}", f"Promesas del 29-N y cómo afectarían en {name}", f"Promesas electorales del 29-N en {name}",
          f"Cómo afectarían en {name} las promesas del 29-N de PP, PSOE, Vox, Frente Amplio y Podemos: impuestos, vivienda y competencias. Elige {dip} diputados.",
          f"Respuesta corta: {name} elige {dip} diputado{'s' if dip!=1 else ''} el 29-N (BOE, RD 806/2026). {nota}",
          [{"id": "que-se-vota", "title": f"Qué se vota en {name} el 29-N", "paragraphs": [f"Se eligen {dip} diputado{'s' if dip!=1 else ''} al Congreso y los senadores de la circunscripción. No hay elecciones autonómicas convocadas para ese día por el Real Decreto 806/2026."]},
           {"id": "competencias", "title": "Qué decide el Estado y qué decide tu comunidad", "paragraphs": [REGIME[reg], "Por eso una misma promesa estatal puede notarse distinto según dónde vivas. La columna «¿Se aplicaría aquí?» lo explica medida a medida."]},
           {"id": "tabla", "title": f"Todas las medidas y si se aplicarían en {name}", "paragraphs": [D['order_rule']], "table": {"caption": f"Promesas del 29-N y su aplicación en {name}", "head": ["Partido", "Medida", "¿Se aplicaría aquí?", "Fuente"], "rows": rows}}],
          [{"q": f"¿Cuántos diputados elige {name}?", "a": f"{dip}, según el anexo del Real Decreto 806/2026 de convocatoria."},
           {"q": f"¿Se vota también el parlamento de {name} el 29-N?", "a": "No. El Real Decreto 806/2026 solo convoca elecciones al Congreso y al Senado."},
           {"q": "¿Por qué una promesa no se aplicaría en mi comunidad?", "a": "Porque algunos impuestos o competencias son autonómicos o forales, o porque en tu territorio no rige el IVA (Canarias, Ceuta y Melilla)."}],
          COMMON_REL, [RD, {"label": "BOE: Ley 35/2006 del IRPF", "href": LOIRPF}, {"label": "BOE: Ley 37/1992 del IVA", "href": LIVA}])
# ---- profiles
for k, (label, lower, ayg) in PROFILES.items():
    prs = [p for p in PR if k in p['profiles']]
    secs = []
    for pid in ORDER:
        m = [p for p in prs if p['party'] == pid]
        if m:
            secs.append({"id": pid, "title": pname(pid), "paragraphs": [p['measure'] for p in m] + [x for x in (impact_text(p) for p in m) if x], "table": party_table(m, f"{short(pid)}: medidas que afectan a {lower}")})
        else:
            secs.append({"id": pid, "title": pname(pid), "paragraphs": [PEND.format(d=dU)]})
    secs.append({"id": "historia", "title": "Qué hicieron los gobiernos anteriores", "paragraphs": [f"Para comparar promesas con hechos, consulta qué ayudas creó y recortó cada gobierno desde 1996 para {lower}, con su norma del BOE: {ayg}."]})
    guide(f"perfil-{k}", f"Promesas del 29-N para {lower}: qué propone cada partido", f"29-N para {label.lower()}: qué te afectaría",
          f"Qué cambiaría para {lower} con las promesas del 29-N de PP, PSOE, Vox, Frente Amplio y Podemos, con cálculos cuando hay datos oficiales.",
          f"Respuesta corta: {len({p['party'] for p in prs})} de los 5 partidos principales tienen alguna medida publicada que afecta a {lower} a {dU}. Abajo, todas, con su fuente y, cuando se puede calcular con datos oficiales, cuánto supondría.",
          secs,
          [{"q": f"¿Qué partido es mejor para {lower}?", "a": "No hacemos esa valoración. Te mostramos qué propone cada uno y, cuando es posible, cuánto supondría, para que decidas tú."},
           {"q": "¿De dónde salen los cálculos?", "a": "Solo calculamos cuando la medida da cifras exactas (porcentajes, topes) y aplicamos la operación a precios de ejemplo. El método está en la página de metodología."},
           {"q": "¿Y si vivo en Canarias, País Vasco, Navarra, Ceuta o Melilla?", "a": "Algunas medidas fiscales no se aplican igual. Consulta la página de tu comunidad."}],
          COMMON_REL + [{"href": ayg, "label": f"Ayudas para {lower} según cada gobierno"}], uniq_sources(prs))
# ---- metodologia
guide("metodologia", "Metodología de las promesas del 29-N: fuentes, orden y actualizaciones", "Metodología: cómo comparamos las promesas del 29-N",
      "Cómo elaboramos la comparativa de promesas del 29-N: qué fuentes valen, cómo ordenamos los partidos, cuándo calculamos impactos y cómo actualizamos.",
      "Respuesta corta: solo recogemos medidas concretas con fuente fechada, con el mismo formato para todos los partidos, sin valorar ni recomendar ningún voto, y revisamos los datos cada día.",
      [{"id": "que-fuentes", "title": "Qué fuentes usamos", "paragraphs": ["1) Programa electoral oficial del 29-N (cuando exista). 2) Notas de prensa y documentos en la web oficial del partido. 3) Fuentes oficiales del Gobierno o del BOE cuando la medida ya está aprobada y el partido promete mantenerla. 4) Prensa, solo si no hay documento oficial; lo marcamos como «prensa».", "Cada medida guarda: partido, tema, medida en lenguaje sencillo, cita literal, enlace, fecha, tipo de fuente, perfiles afectados, nivel de competencia (estatal, autonómica o municipal) y coste si el partido lo da."]},
       {"id": "orden", "title": "Orden y simetría", "paragraphs": [D['order_rule'], "Todos los partidos tienen las mismas secciones en el mismo orden. Si un partido no ha publicado nada sobre un tema, la sección aparece igual con «pendiente de programa»."]},
       {"id": "calculos", "title": "Cuándo calculamos el impacto", "paragraphs": ["Solo cuando la medida da cifras exactas y la operación no necesita suposiciones: por ejemplo, IVA del 10 % al 4 % (ahorro = 6 % del precio), préstamo del 20 % con tope de 50.000 € o deducción del 10 % del alquiler. Mostramos la fórmula y precios de ejemplo. En el resto, la explicación es cualitativa.", "No usamos encuestas, estimaciones de terceros ni cifras sin fuente. Si un partido da su propio cálculo, lo atribuimos al partido."]},
       {"id": "territorio", "title": "Cómo decidimos si una medida se aplica en tu comunidad", "paragraphs": ["Usamos reglas fijas: las rebajas de IVA no se aplican tal cual en Canarias (IGIC), Ceuta ni Melilla (IPSI); las del IRPF estatal no se aplican directamente en País Vasco ni Navarra (IRPF foral); el ITP y la vivienda dependen de la comunidad."]},
       {"id": "actualizacion", "title": "Actualización diaria", "paragraphs": [f"Revisamos cada día las webs oficiales de los partidos, el BOE y la Junta Electoral Central. Cuando un partido publique su programa, sustituimos sus anuncios por el texto del programa. Última revisión: {dU}.", "¿Ves un error o una medida que falta? Escríbenos desde la página de contacto con el enlace a la fuente."]}],
      [{"q": "¿Sois de algún partido?", "a": "No. RutaTrámite es una web de trámites independiente y no recomienda ningún voto."},
       {"q": "¿Por qué no aparece ClaimReview ni verificaciones?", "a": "Porque no juzgamos si una promesa es verdadera o viable: solo la explicamos y la citamos."},
       {"q": "¿Puedo reutilizar los datos?", "a": "Sí, citando a RutaTrámite y la fuente original de cada medida."}],
      [{"href": BASE, "label": "Promesas del 29-N"}, {"href": "/metodologia", "label": "Metodología general de RutaTrámite"}, {"href": "/elecciones", "label": "Elecciones del 29-N"}], [RD])
json.dump(G, open('data/promesas-29n/pages.json', 'w'), ensure_ascii=False)
paths = [g['path'] for g in G]
assert len(set(paths)) == len(paths); assert len({g['title'] for g in G}) == len(G)
print(len(G))
