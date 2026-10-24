#!/usr/bin/env python3
"""Mejoras 24-10 fase 1 (auditoría SEO/GEO 24-10, aprobado por Alonso): enlaces a promesas desde home y /elecciones,
sorteo de mesa (title + «cómo saber si me ha tocado»), /becas (fecha visible, resolución a 24-10, Article dateModified),
/dni (bloque de precio de renovación arriba; title intacto por el test en curso). Fuentes verificadas el 24-10-2026."""
from pathlib import Path
def sub(path, old, new, count=1):
    p = Path(path); s = p.read_text()
    assert s.count(old) >= 1, (path, old[:80])
    p.write_text(s.replace(old, new, count))

# 1) Sorteo de mesa
C = "src/lib/tramites/cuando-29n.ts"
s = Path(C).read_text(); i = s.index('"path": "/elecciones/sorteo-mesa-electoral-29n"'); j = s.index('"id": "c29n-excusa-mesa"', i)
blk = s[i:j]
nb = blk.replace('"title": "Sorteo mesa electoral 29-N: fechas y cómo saber si te toca"',
                 '"title": "Sorteo mesa electoral 29-N (31 oct-4 nov): ¿me ha tocado?"')
nb = nb.replace('"description": "Sorteo de mesas del 29-N: del 31 de octubre al 4 de noviembre; te lo notifican en 3 días. Plazo para alegar, renuncia con 65 años y dieta de 75 €."',
                '"description": "Sorteo de mesas del 29-N: 31 de octubre a 4 de noviembre. Cómo saber si te ha tocado: notificación personal en 3 días (hasta el 7-N). Dieta de 75 €."')
nb = nb.replace('"lead": "Respuesta corta: los ayuntamientos sortean',
                '"lead": "Respuesta corta: sabrás si te ha tocado mesa cuando te llegue la notificación personal; no hay una lista pública en internet. Los ayuntamientos sortean')
faq_new = '''   {
    "q": "¿Cómo sé si me ha tocado mesa electoral?",
    "a": "Por la notificación personal que te entrega el ayuntamiento en los 3 días siguientes al sorteo, junto con el manual de instrucciones (artículo 27.2 de la LOREG). No existe una consulta estatal por internet. Si no te han notificado nada a 7 de noviembre de 2026, lo normal es que no te haya tocado; si tienes dudas, pregunta en tu ayuntamiento."
   },
   {
    "q": "¿Me pueden avisar por teléfono, correo electrónico o WhatsApp?",
    "a": "La designación vale con la notificación oficial, que normalmente se entrega en mano en tu domicilio y se firma al recibirla. Desconfía de mensajes que pidan datos o pagos para «consultar» si te ha tocado mesa: el trámite es gratuito."
   },
   {
    "q": "¿Cuándo es el sorteo de mesas del 29-N?",'''
nb = nb.replace('''   {
    "q": "¿Cuándo es el sorteo de mesas del 29-N?",''', faq_new, 1)
sec_new = '''"sections": [
   {
    "id": "como-saber",
    "title": "Cómo saber si me ha tocado mesa",
    "paragraphs": [
     "La única forma válida es la notificación personal. El ayuntamiento hace el sorteo en público entre el 31 de octubre y el 4 de noviembre de 2026 y tiene 3 días para notificar a las personas designadas, así que todas las notificaciones deben estar entregadas como tarde el 7 de noviembre (calendario de la Junta Electoral Central y artículos 26 y 27 de la LOREG).",
     "No hay una lista nacional ni un buscador oficial por internet. Si quieres saber qué día sortea tu ayuntamiento, puedes preguntarlo allí: el acto es público. Si a 7 de noviembre no has recibido nada, lo habitual es que no te haya tocado."
    ],
    "lists": [
     [
      "Revisa tu buzón y avisa en casa: la notificación suele entregarse en mano y hay que firmar el recibí.",
      "Comprueba en la notificación el cargo (presidente, vocal o suplente), la sección, la mesa y el local.",
      "Si tienes una causa para no ir, el plazo de 7 días empieza a contar desde que te notifican."
     ]
    ]
   },'''
nb = nb.replace('"sections": [', sec_new, 1)
nb = nb.replace('"reviewedAt": "2026-10-19"', '"reviewedAt": "2026-10-24"')
s = s[:i] + nb + s[j:]
# reviewedAt sits before path: update the one right before i
k = s.rfind('"reviewedAt": "', 0, i); s = s[:k] + '"reviewedAt": "2026-10-24"' + s[k + len('"reviewedAt": "2026-10-19"'):]
Path(C).write_text(s)

# 2) Enlaces a promesas: home y /elecciones
sub("src/app/page.tsx", '''        <div className="home-grid">
          {ELECCIONES_29N.map((c) => (
            <a key={c.href} href={c.href} className="home-card">
              <span className="home-card-title">{c.title}</span>
              <span className="home-card-text">{c.blurb}</span>
            </a>
          ))}
        </div>
      </section>''', '''        <div className="home-grid">
          {ELECCIONES_29N.map((c) => (
            <a key={c.href} href={c.href} className="home-card">
              <span className="home-card-title">{c.title}</span>
              <span className="home-card-text">{c.blurb}</span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-sm" data-home-promesas="">
          <strong>Qué propone cada partido:</strong> medidas y declaraciones fechadas, con su fuente y en el mismo formato para todos.{" "}
          <a className="underline" href="/elecciones/promesas">Promesas del 29-N</a>
          {" · "}
          <a className="underline" href="/elecciones/promesas/que-propone-cada-partido-vivienda">Vivienda: qué propone cada partido</a>
          {" · "}
          <a className="underline" href="/elecciones/promesas/partido-frente-amplio">Frente Amplio: sus propuestas</a>
        </p>
      </section>''')
sub("src/components/tramites/PackIndex.tsx", '''      {pack === "elecciones" ? (
        <p className="mt-4 text-sm"><a className="underline" href="/elecciones/promesas">Promesas del 29-N: qué propone cada partido, por comunidad y perfil</a> · <a className="underline" href="/ayudas-por-gobierno">Ayudas del Estado según cada gobierno desde 1996 (informativo, no partidista)</a></p>
      ) : null}''', '''      {pack === "elecciones" ? (
        <section aria-labelledby="promesas-29n-title" className="mt-8" data-elecciones-promesas="">
          <h2 id="promesas-29n-title" className="font-display text-2xl text-mossDark">Qué propone cada partido</h2>
          <p className="mt-2">Recogemos las medidas y declaraciones de PP, PSOE, Vox, Frente Amplio, Podemos y Democracia 21 con cita, fuente y fecha, en el mismo formato para todos y sin valoraciones.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><a className="underline" href="/elecciones/promesas">Promesas del 29-N: qué propone cada partido, por comunidad y perfil</a></li>
            <li><a className="underline" href="/elecciones/promesas/que-propone-cada-partido-vivienda">Vivienda: qué propone cada partido</a></li>
            <li><a className="underline" href="/elecciones/promesas/partido-frente-amplio">Frente Amplio: sus propuestas para el 29-N</a></li>
            <li><a className="underline" href="/ayudas-por-gobierno">Ayudas del Estado según cada gobierno desde 1996 (informativo, no partidista)</a></li>
          </ul>
        </section>
      ) : null}''')

# 3) /becas: resolución a 24-10, fecha visible, Article dateModified
P = "src/components/tramites/PackIndex.tsx"
sub(P, "Abajo tienes las guías de solicitud, estado, cobro, resolución y devolución.",
    "A 24 de octubre de 2026, el Ministerio no ha anunciado la resolución definitiva. Abajo tienes las guías de solicitud, estado, cobro, resolución y devolución.")
s = Path(P).read_text(); assert s.count("A 21 de octubre de 2026, la página de novedades del Ministerio no la anuncia.") == 2
s = s.replace("A 21 de octubre de 2026, la página de novedades del Ministerio no la anuncia.", "A 24 de octubre de 2026, la página de novedades del Ministerio no la anuncia.")
s = s.replace("Ministerio de Educación: novedades (consultado el 21-10-2026)</a>", "Ministerio de Educación: novedades (consultado el 24-10-2026)</a>")
s = s.replace('''<a className="underline" href="/becas/mec/estado">Guía: consultar el estado y las notificaciones</a></p>
          </section>''', '''<a className="underline" href="/becas/mec/estado">Guía: consultar el estado y las notificaciones</a></p>
            <p className="text-sm" data-becas-reviewed="">Por Equipo RutaTrámite · Revisado el <time dateTime="2026-10-24">24 de octubre de 2026</time>.</p>
          </section>
          <JsonLd data={articleJsonLd({ headline: "Beca MEC 2026-27: cómo consultar el estado y cuándo sale la resolución", description: "Consulta del estado de la beca MEC 2026-27 en la sede del Ministerio de Educación y situación de la resolución definitiva a 24 de octubre de 2026.", path: "/becas", dateModified: "2026-10-24", sources: ["https://www.becaseducacion.gob.es/dudas/faqs.html", "https://www.becaseducacion.gob.es/novedades.html", "https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-9261"] })} />''')
s = s.replace('import { absoluteUrl } from "@/lib/geo/paths";', 'import { absoluteUrl } from "@/lib/geo/paths";\nimport { articleJsonLd } from "@/lib/seo/jsonld";', 1)
# 4) /dni: precio de renovación justo debajo de la respuesta corta (antes del botón de cita)
s = s.replace('''      <p className="mt-4 text-lg leading-relaxed">{t.lead}</p>
''', '''      <p className="mt-4 text-lg leading-relaxed">{t.lead}</p>
      {pack === "viaje" && !passport ? (
        <p className="mt-4 border border-sand p-4" data-dni-precio-renovar="">
          <strong>¿Cuánto cuesta renovar el DNI en 2026?</strong> 12 €, tanto si está en vigor como si ha caducado, y lo mismo la primera vez (<a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-1979-867">Ley 84/1978, art. 6, BOE</a>). Es gratis para familias numerosas y para cambiar el domicilio de un DNI en vigor. El pasaporte cuesta 30 €; los dos en la misma cita, 42 €.
        </p>
      ) : null}
''', 1)
Path(P).write_text(s)
print("ok")
