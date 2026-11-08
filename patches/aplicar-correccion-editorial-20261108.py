#!/usr/bin/env python3
"""Sustituciones literales de la corrección editorial del 8 de noviembre de 2026.

No despliega nada. No es una predicción de recuperación en buscadores.

Árbol de git `prod-20261031` y release `20261108T072734Z` no coinciden.
Este script aplica el mismo criterio en los dos, porque varias frases de OUIGO
tienen dos redacciones previas. Falla si el literal no está o está repetido
fuera de lo previsto. No hace reemplazos aproximados.

Uso, en la raíz del release (no encima de esta rama ya corregida):

    python3 patches/aplicar-correccion-editorial-20261108.py --root . --release --dry-run
    python3 patches/aplicar-correccion-editorial-20261108.py --root . --release

`--release` exige además la celda de Sigma Dos del 2 de noviembre, que no está
en el snapshot git del 31 de octubre.

Consulta de fuentes: 8 de noviembre de 2026.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

E1_OLD = "La diferencia entre el CIS y el resto viene sobre todo del método de estimación, no de la fecha."
E1_NEW = (
    "No atribuimos las diferencias entre encuestas a una sola causa: hay que comparar sus fechas de campo, "
    "muestras, canales de entrevista y métodos de estimación. La ficha de Sigma Dos del 2 de noviembre sitúa "
    "su trabajo de campo el 29 y el 30 de octubre, después del accidente de Urda, y declara un error de muestreo "
    "absoluto de ±2,1 % al 95,5 % para dos categorías igualmente distribuidas. Ese sondeo no permite aislar por "
    "sí solo el efecto de cada factor."
)
E2_OLD = "Una diferencia menor que el margen de error (unos ±3 puntos con 1.000 entrevistas) es un empate."
E2_NEW = (
    "Una encuesta es una estimación, no un resultado electoral. Revisa su ficha técnica antes de interpretar "
    "diferencias pequeñas: Sigma Dos declara para su sondeo del 2 de noviembre un error de muestreo absoluto de "
    "±2,1 %, con un nivel de confianza del 95,5 % y bajo el supuesto de dos categorías igualmente distribuidas. "
    "Esa cifra no es una garantía de acierto ni convierte automáticamente una diferencia entre partidos en un empate."
)
SIGMA_OLD = "2.505, teléfono (CATI) e internet (CAWI)"
SIGMA_NEW = (
    "2.505 entrevistas, teléfono (CATI) e internet (CAWI). Error declarado: ±2,1 %, al 95,5 % y para dos "
    "categorías igualmente distribuidas."
)

LEAD_PROD = (
    "Respuesta corta, a 31 de octubre de 2026: la línea de alta velocidad entre Madrid y Andalucía sigue cortada "
    "desde el accidente del 28 de octubre cerca de Urda (Toledo). Ningún comunicado oficial consultado da fecha de "
    "reapertura. Si tenías billete, no lo pierdes: Renfe permite cambios y anulaciones sin coste, Iryo devuelve el "
    "importe íntegro y Ouigo ha cancelado sus trenes Madrid–Andalucía hasta el 9 de noviembre incluido. Aquí tienes "
    "qué hacer con cada compañía, qué derechos tienes y cómo reclamar si no te contestan."
)
LEAD_LIVE = (
    "Respuesta corta, a 31 de octubre de 2026: la línea de alta velocidad entre Madrid y Andalucía sigue cortada "
    "desde el accidente del 28 de octubre cerca de Urda (Toledo). Ningún comunicado oficial consultado da fecha de "
    "reapertura. Si tenías billete, no lo pierdes: Renfe permite cambios y anulaciones sin coste, Iryo devuelve el "
    "importe íntegro y Ouigo canceló todos sus trenes Madrid–Andalucía hasta el 2 de noviembre incluido (en otras "
    "rutas deja cambiar gratis la fecha hasta el 9 de noviembre). Aquí tienes qué hacer con cada compañía, qué "
    "derechos tienes y cómo reclamar si no te contestan."
)
LEAD_NEW = (
    "Comprobación del 8 de noviembre de 2026: OUIGO informa en su web de que sus servicios Madrid–Andalucía están "
    "suspendidos hasta el 15 de noviembre por cierre de línea. Ese aviso no garantiza una reapertura el día 16 ni "
    "el estado de cada tren de Renfe o Iryo. Renfe, en la nota consultada ese día, mantiene cambios y anulaciones "
    "gratuitos para los viajeros afectados y prorroga en principio hasta el 12 de noviembre el autobús "
    "Madrid–Ciudad Real–Puertollano. Antes de desplazarte, comprueba tu reserva. Si tu tren está cancelado o se "
    "prevé un retraso de al menos 60 minutos en el destino final, el artículo 18 del Reglamento (UE) 2021/782 "
    "permite elegir entre reintegro o transporte alternativo."
)

H2_ESTADO_OLD = "Estado del servicio a 31 de octubre de 2026 (18:00)"
H2_ESTADO_NEW = "Estado del servicio: avisos del 8 de noviembre e información anterior"
INTRO_OLD = "Esto es lo que dicen los canales oficiales de las compañías. Lo revisaremos el 3 de noviembre o antes si hay un aviso oficial."
INTRO_NEW = (
    "Los avisos siguientes no están todos comprobados el mismo día. El 8 de noviembre de 2026 se han contrastado "
    "el aviso de OUIGO y la nota de Renfe que prorroga el autobús Madrid–Ciudad Real–Puertollano. La nota de Renfe "
    "del 29 de octubre, que situaba el 3 de noviembre como primera fecha posible de otro plan alternativo, es "
    "histórica y no describe por sí sola los servicios de hoy."
)
LINEA_OLD = "Línea de alta velocidad Madrid–Andalucía: cortada. Ningún comunicado oficial consultado da fecha de reapertura."
LINEA_NEW = (
    "Línea de alta velocidad Madrid–Andalucía: OUIGO dice, en el aviso consultado el 8 de noviembre, que sus "
    "servicios están suspendidos hasta el 15 de noviembre por cierre de línea. Renfe explica su autobús por la "
    "interrupción de la circulación. Ninguna de esas dos fuentes fija una fecha de reapertura de la infraestructura "
    "ni el estado de cada tren de Iryo."
)
CONVENCIONAL_OLD = "Renfe: servicios especiales por vía convencional entre Madrid, Ciudad Real y Puertollano, con unos 90 minutos más de viaje."
CONVENCIONAL_NEW = (
    "Renfe: la nota consultada el 8 de noviembre no mantiene como servicio vigente el recorrido especial por vía "
    "convencional. Describe el dispositivo desde el 4 de noviembre como íntegramente por carretera. El dato de "
    "unos 90 minutos más queda como información anterior, no como horario actual."
)
BUS_OLD = (
    "Renfe: autobuses Madrid–Ciudad Real–Puertollano del 31 de octubre al 3 de noviembre. Desde Madrid Puerta de "
    "Atocha, a las 8:00, 10:30, 12:00, 14:00, 16:30, 18:00, 20:00 y 22:30. Desde Puertollano, a las 4:45 (solo el "
    "martes 3), 6:45, 8:15, 10:00, 12:00, 15:30, 18:15 y 20:15."
)
BUS_NEW = (
    "Renfe: en la nota consultada el 8 de noviembre, el plan por carretera Madrid–Ciudad Real–Puertollano que "
    "empezó el 31 de octubre sigue, en principio, hasta el 12 de noviembre inclusive y, desde el 4 de noviembre, "
    "se presta íntegramente por carretera. Salidas desde Madrid-Atocha Cercanías (calle Méndez Álvaro) a las 8:00, "
    "10:30, 12:00, 14:00, 16:30, 18:00, 20:00 y 22:30. Desde Puertollano, a las 4:45 (solo laborables), 6:45, 8:15, "
    "10:00, 12:00, 15:30, 18:15 y 20:15. La nota mantiene cambios y anulaciones gratuitos para los viajeros "
    "afectados. No es un plan hasta todas las capitales andaluzas."
)
PAT_OLD = (
    "Renfe: el plan alternativo de transporte Madrid–Andalucía no podrá empezar antes del martes 3 de noviembre. "
    "Renfe informará antes de esa fecha de horarios, recorridos y servicios."
)
PAT_NEW = (
    "Renfe, nota del 29 de octubre (histórica): el plan alternativo entonces previsto para la línea "
    "Madrid–Andalucía no podía empezar antes del 3 de noviembre. Esa nota no confirma qué circula el 8 de noviembre."
)
OUIGO_BULLET_PROD = "Ouigo: todos sus trenes entre Madrid y Andalucía, cancelados hasta el 9 de noviembre incluido."
OUIGO_BULLET_LIVE = (
    "Ouigo: todos sus trenes entre Madrid y Andalucía, cancelados hasta el 2 de noviembre incluido (aviso de su "
    "web, consultado el 2 de noviembre). En otras rutas, cambio de fecha gratis hasta el 9 de noviembre."
)
OUIGO_BULLET_NEW = (
    "OUIGO: el aviso consultado el 8 de noviembre dice que los servicios Madrid–Andalucía están suspendidos hasta "
    "el 15 de noviembre por cierre de línea. Comprueba tu reserva y las opciones que te ofrezca la compañía. En "
    "esta revisión no hemos confirmado que siga vigente el cambio gratuito de fecha en otras rutas que la guía "
    "llegó a recoger."
)
H2_OUIGO_PROD = "Ouigo: trenes cancelados hasta el 9 de noviembre"
H2_OUIGO_LIVE = "Ouigo: trenes cancelados hasta el 2 de noviembre"
H2_OUIGO_NEW = "OUIGO: suspensión anunciada hasta el 15 de noviembre"
OUIGO_P_PROD = (
    "Ouigo avisa en su web de que ha cancelado todos sus trenes entre Madrid y Andalucía hasta el 9 de noviembre "
    "incluido. En sus otras rutas puedes cambiar gratis la fecha del viaje hasta el 9 de noviembre."
)
OUIGO_P_LIVE = (
    "Ouigo avisa en su web (consultada el 2 de noviembre) de que ha cancelado todos sus trenes entre Madrid y "
    "Andalucía hasta el 2 de noviembre incluido. En sus otras rutas puedes cambiar gratis la fecha del viaje "
    "hasta el 9 de noviembre. Para un tren posterior, mira su estado en ouigo.com/es."
)
OUIGO_P_NEW = (
    "OUIGO informa, en el aviso consultado el 8 de noviembre de 2026, de que sus servicios Madrid–Andalucía están "
    "suspendidos hasta el 15 de noviembre por cierre de línea. Comprueba en «Mis reservas» el estado de tu tren y "
    "las opciones disponibles. En esta revisión no hemos confirmado la vigencia del cambio gratuito en otras rutas "
    "que esta guía recogía antes."
)
OUIGO_REGLAMENTO_OLD = (
    "Tu reserva se gestiona en «Mis reservas» de ouigo.com/es, y los vales en «Mis vales de compra». Si tu tren "
    "está cancelado, el reglamento europeo te da derecho a elegir entre el reembolso total del billete o viajar "
    "por otra vía en condiciones comparables."
)
OUIGO_REGLAMENTO_NEW = (
    "Tu reserva se gestiona en «Mis reservas» de ouigo.com/es, y los vales en «Mis vales de compra». Si tu tren "
    "está cancelado o se prevé un retraso de al menos 60 minutos en el destino final, el artículo 18 del "
    "Reglamento (UE) 2021/782 te deja elegir entre el reintegro en las condiciones de ese artículo o continuar "
    "por una vía alternativa comparable."
)
IRYO_H2_OLD = "Iryo: reembolso íntegro y gastos con justificante"
IRYO_H2_NEW = "Iryo: asistencia del comunicado por el accidente de Urda"
IRYO_P_OLD = (
    "Iryo devuelve a todos los viajeros el importe íntegro del billete. Se pide escribiendo a "
    "buzonafectados6076@iryo.eu con el certificado de titularidad de la cuenta bancaria donde quieres cobrar."
)
IRYO_P_NEW = (
    "El comunicado de Iryo dirigido a quienes sufren el accidente de Urda dice que devolverá a todos los viajeros "
    "el importe íntegro de su billete. Se pide escribiendo a buzonafectados6076@iryo.eu con el certificado de "
    "titularidad de la cuenta bancaria donde quieres cobrar. Ese texto no acredita el mismo reembolso para "
    "cualquier otro billete cancelado más adelante: en ese caso, comprueba tu reserva y el artículo 18."
)
T5_OLD = (
    "Si se prevé que llegarás con más de 60 minutos de retraso, puedes elegir entre el reembolso total del "
    "billete o seguir el viaje por otra vía, en condiciones comparables, en la fecha que te venga bien."
)
T5_NEW = (
    "Si se prevé un retraso de al menos 60 minutos en el destino final del contrato de transporte, puedes elegir "
    "entre el reintegro del billete de las partes no efectuadas —y de las ya efectuadas si el viaje ha perdido su "
    "razón de ser, con regreso al origen cuando proceda— o continuar por una vía alternativa, en condiciones "
    "comparables, lo antes posible o en una fecha posterior que te convenga. Lo establece el artículo 18 del "
    "Reglamento (UE) 2021/782."
)
ASISTENCIA_OLD = "Con más de una hora de retraso, comida y bebida razonables; si el tren queda bloqueado, la compañía debe organizar tu traslado."
ASISTENCIA_NEW = (
    "Si el retraso en la salida o en la llegada es de al menos 60 minutos, o si el servicio se cancela, la empresa "
    "ferroviaria debe ofrecer gratuitamente comidas y refrigerios en una medida adecuada al tiempo de espera, "
    "cuando puedan suministrarse de forma razonable, y, si el tren queda bloqueado en la vía, el transporte hasta "
    "la estación, un punto de partida alternativo o el destino final, siempre que sea físicamente posible."
)
T6_OLD = "En caso de muerte o lesiones, la compañía debe pagar un anticipo en un plazo de 15 días para las necesidades inmediatas."
T6_NEW = (
    "En caso de muerte o lesiones, la empresa ferroviaria debe abonar los anticipos para necesidades económicas "
    "inmediatas sin demora y, como máximo, quince días después de identificar a la persona con derecho a "
    "indemnización, conforme al artículo 15 del Reglamento (UE) 2021/782."
)
FAQ_VUELVE_PROD = (
    "A 31 de octubre de 2026 no hay fecha oficial. Renfe dice que su plan alternativo de transporte no podrá "
    "empezar antes del 3 de noviembre y que informará antes de esa fecha. Ouigo ha cancelado sus trenes en esa "
    "línea hasta el 9 de noviembre incluido."
)
FAQ_VUELVE_LIVE = (
    "A 31 de octubre de 2026 no hay fecha oficial. Renfe dice que su plan alternativo de transporte no podrá "
    "empezar antes del 3 de noviembre y que informará antes de esa fecha. Ouigo canceló sus trenes en esa línea "
    "hasta el 2 de noviembre incluido; mira en su web si tu tren posterior circula."
)
FAQ_VUELVE_NEW = (
    "El aviso de OUIGO consultado el 8 de noviembre anuncia la suspensión de sus servicios Madrid–Andalucía hasta "
    "el 15 de noviembre por cierre de línea. No confirma una reapertura el día 16. La nota de Renfe del 29 de "
    "octubre sobre una primera fecha posible de su plan alternativo es histórica. La nota de Renfe consultada el "
    "8 de noviembre prorroga, en principio hasta el 12 de noviembre inclusive, el autobús Madrid–Ciudad "
    "Real–Puertollano; no acredita la reapertura de la alta velocidad. Comprueba el estado de tu tren con tu operador."
)
FAQ_BUS_OLD = (
    "Del 31 de octubre al 3 de noviembre, Renfe tiene autobuses Madrid–Ciudad Real–Puertollano. Salen de Madrid "
    "Puerta de Atocha a las 8:00, 10:30, 12:00, 14:00, 16:30, 18:00, 20:00 y 22:30, según su comunicado. También "
    "tiene servicios por vía convencional entre esas ciudades, con unos 90 minutos más de viaje."
)
FAQ_BUS_NEW = (
    "Según la nota de Renfe consultada el 8 de noviembre de 2026, el autobús Madrid–Ciudad Real–Puertollano que "
    "empezó el 31 de octubre continúa, en principio, hasta el 12 de noviembre inclusive. Desde el 4 de noviembre "
    "el dispositivo se presta íntegramente por carretera. Las salidas desde Madrid-Atocha Cercanías (calle Méndez "
    "Álvaro) son a las 8:00, 10:30, 12:00, 14:00, 16:30, 18:00, 20:00 y 22:30, y desde Puertollano a las 4:45 "
    "(solo laborables), 6:45, 8:15, 10:00, 12:00, 15:30, 18:15 y 20:15. El recorrido anterior por vía convencional, "
    "con unos 90 minutos más, no queda confirmado como servicio vigente en esa nota. Comprueba tu billete en Renfe "
    "antes de salir: esta alternativa no cubre por sí sola todas las capitales andaluzas."
)
FAQ_DINERO_OLD = (
    "Sí. Renfe ha habilitado cambios y anulaciones sin coste para los afectados por el corte, Iryo devuelve el "
    "importe íntegro del billete y Ouigo ha cancelado sus trenes en esa línea. Además, el Reglamento (UE) 2021/782 "
    "te da derecho a elegir entre el reembolso total o viajar por otra vía. Lo pides en el canal de tu compañía "
    "(abajo, una a una)."
)
FAQ_DINERO_NEW = (
    "Depende del operador y del billete. La nota de Renfe consultada el 8 de noviembre mantiene cambios y "
    "anulaciones gratuitos para los viajeros afectados por la interrupción. El comunicado de Iryo a los afectados "
    "por el accidente de Urda dice que devolverá el importe íntegro del billete; no describe por sí solo cualquier "
    "otro billete cancelado. OUIGO anuncia sus servicios Madrid–Andalucía suspendidos hasta el 15 de noviembre. "
    "Si el tren está cancelado o se prevé un retraso de al menos 60 minutos en el destino final, el artículo 18 "
    "del Reglamento (UE) 2021/782 permite elegir entre reintegro o transporte alternativo. Pídelo en el canal de "
    "tu compañía."
)
BYLINE_OLD = (
    "Por Equipo RutaTrámite. Última revisión: 31 de octubre de 2026, a las 18:00 (hora peninsular), con los "
    "comunicados de Renfe, Iryo y Ouigo, la nota de la Junta de Castilla-La Mancha y las páginas del Ministerio de "
    "Transportes. Volveremos a revisarla el 3 de noviembre, fecha en la que Renfe dice que informará de su plan "
    "alternativo."
)
BYLINE_NEW = (
    "Por Equipo RutaTrámite. Comprobación parcial del 8 de noviembre de 2026: aviso de OUIGO, nota de Renfe sobre "
    "el autobús Madrid–Ciudad Real–Puertollano y artículos 15 y 18 del Reglamento (UE) 2021/782. La revisión del "
    "31 de octubre de 2026, a las 18:00 (hora peninsular), sigue siendo la fecha de los comunicados de aquel día y "
    "de las cifras de la Junta de Castilla-La Mancha, que no se han revalidado aquí."
)
DISCLAIMER_OLD = (
    "No somos Renfe, Iryo, Ouigo ni Adif. Esta página resume sus comunicados oficiales a 31-10-2026 y puede quedar "
    "desfasada en horas: antes de viajar o reclamar, mira el aviso de tu compañía. No tratamos las causas del "
    "accidente, que están en investigación."
)
DISCLAIMER_NEW = (
    "No somos Renfe, Iryo, Ouigo ni Adif. Antes de viajar o reclamar, mira el aviso de tu compañía: esta página "
    "puede quedar desfasada en horas. La comprobación del 8 de noviembre de 2026 alcanza el aviso de OUIGO, la "
    "prórroga del autobús de Renfe y los artículos 15 y 18 del Reglamento (UE) 2021/782. No revalida aquí las "
    "cifras de víctimas ni las causas del accidente, que están en investigación."
)

MADRID_PREFIX = "elige 38 de los 350 diputados del Congreso, el 10,9 % del total. "
THRESHOLD_OLD = (
    "Cada circunscripción reparte sus escaños por separado: solo cuentan las candidaturas que superan el 3 % de "
    "los votos válidos en esa provincia y después se aplica la fórmula D'Hondt (artículo 163 de la LOREG)."
)
THRESHOLD_NEW = (
    "Cada circunscripción reparte sus escaños por separado: se tienen en cuenta las candidaturas que obtienen al "
    "menos el 3 % de los votos válidos emitidos en ella y después se aplica la fórmula D'Hondt (artículo 163.1.a "
    "y 163.1.c de la LOREG). Alcanzar ese porcentaje permite participar en el reparto, pero no garantiza un escaño."
)
COMP_OLD = "Vivienda, educación y sanidad son competencias de la comunidad."
COMP_NEW = (
    "La Comunidad de Madrid tiene competencia exclusiva en ordenación del territorio, urbanismo y vivienda "
    "(artículo 26.1.4 del Estatuto de Autonomía). En enseñanza le corresponde el desarrollo legislativo y la "
    "ejecución, con los límites del artículo 27 de la Constitución, de las leyes orgánicas que lo desarrollan, "
    "del artículo 149.1.30 y de la Alta Inspección (artículo 29 del Estatuto). En sanidad e higiene, el desarrollo "
    "legislativo, la potestad reglamentaria y la ejecución se ejercen en el marco de la legislación básica del "
    "Estado (artículo 27.4 del Estatuto). El Estado conserva, entre otras materias, las bases y la coordinación "
    "general de la sanidad (artículo 149.1.16 de la Constitución) y las normas básicas para el desarrollo del "
    "artículo 27 (artículo 149.1.30). Hay que examinar el instrumento jurídico de cada propuesta antes de afirmar "
    "cómo se aplicaría en Madrid. Lectura de estas normas: 8 de noviembre de 2026. No se ha revalidado aquí la "
    "tabla de promesas ni su fecha de corte."
)


class PatchError(SystemExit):
    pass


def replace_exact(text: str, old: str, new: str, label: str, expected: int = 1) -> str:
    found = text.count(old)
    if found != expected:
        raise PatchError(f"{label}: se esperaban {expected} coincidencias literales y hay {found}.")
    return text.replace(old, new)


def replace_one_of(text: str, options: list[str], new: str, label: str) -> str:
    found = [old for old in options if old in text]
    if len(found) != 1 or text.count(found[0]) != 1:
        counts = {old[:48]: text.count(old) for old in options}
        raise PatchError(f"{label}: hace falta exactamente una redacción previa. Recuentos: {counts}.")
    return text.replace(found[0], new, 1)


def replace_optional(text: str, old: str, new: str, label: str) -> str:
    found = text.count(old)
    if found == 0:
        print(f"  aviso: {label} no está; no se toca", file=sys.stderr)
        return text
    if found != 1:
        raise PatchError(f"{label}: coincidencias {found}, se esperaba 0 o 1.")
    return text.replace(old, new, 1)


def patch_madrid_slice(text: str) -> str:
    start = text.find('"id": "p29n-comunidad-madrid"')
    end = text.find('"id": "p29n-', start + 10)
    if start < 0 or end < 0:
        raise PatchError("No se localiza el objeto de Comunidad de Madrid en promesas-29n.ts.")
    chunk = text[start:end]
    if chunk.count(COMP_OLD) != 1:
        raise PatchError(f"Competencias de Madrid: coincidencias {chunk.count(COMP_OLD)}.")
    chunk = chunk.replace(COMP_OLD, COMP_NEW, 1)
    anchor = '"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740"\n}\n],'
    extra = (
        '"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1992-28740"\n'
        "},\n"
        "{\n"
        '"label": "BOE: LOREG, artículo 163.1 (umbral del 3 % y regla D\'Hondt)",\n'
        '"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672#acientosesentaytres"\n'
        "},\n"
        "{\n"
        '"label": "BOE: Estatuto de Autonomía de la Comunidad de Madrid",\n'
        '"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1983-6317"\n'
        "},\n"
        "{\n"
        '"label": "BOE: Constitución, artículo 149.1.16 y 149.1.30",\n'
        '"href": "https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229#a149"\n'
        "}\n],"
    )
    if chunk.count(anchor) != 1:
        raise PatchError("No se localiza el cierre de fuentes de Madrid para añadir BOE.")
    chunk = chunk.replace(anchor, extra, 1)
    return text[:start] + chunk + text[end:]


def apply_tree(root: Path, release: bool) -> tuple[list[str], dict[Path, str]]:
    notes: list[str] = []
    encuestas = root / "src/lib/tramites/encuestas-29n.ts"
    corte = root / "src/lib/tramites/corte-ave-20261031.ts"
    promesas = root / "src/lib/tramites/promesas-29n.ts"
    mejoras = root / "src/lib/tramites/mejoras-20261024.ts"
    for path in (encuestas, corte, promesas, mejoras):
        if not path.is_file():
            raise PatchError(f"Falta {path}. No se ha escrito nada.")

    e = encuestas.read_text(encoding="utf-8")
    e = replace_exact(e, E1_OLD, E1_NEW, "E1 entradilla")
    e = replace_exact(e, E2_OLD, E2_NEW, "E2 margen")
    if SIGMA_OLD in e:
        if e.count(SIGMA_OLD) != 1:
            raise PatchError(f"Celda Sigma Dos: coincidencias {e.count(SIGMA_OLD)}.")
        e = e.replace(SIGMA_OLD, SIGMA_NEW, 1)
        notes.append("celda Sigma Dos del 2 de noviembre actualizada")
    elif release:
        raise PatchError("Modo release: no está la celda «2.505, teléfono (CATI) e internet (CAWI)».")
    else:
        notes.append("celda Sigma Dos del 2 de noviembre ausente en este árbol; no se inventa la fila")

    c = corte.read_text(encoding="utf-8")
    c = replace_one_of(c, [LEAD_PROD, LEAD_LIVE], LEAD_NEW, "entradilla transporte")
    c = replace_exact(c, H2_ESTADO_OLD, H2_ESTADO_NEW, "H2 estado")
    c = replace_exact(c, INTRO_OLD, INTRO_NEW, "intro estado")
    c = replace_exact(c, LINEA_OLD, LINEA_NEW, "viñeta línea")
    c = replace_exact(c, CONVENCIONAL_OLD, CONVENCIONAL_NEW, "viñeta vía convencional")
    c = replace_exact(c, BUS_OLD, BUS_NEW, "viñeta autobús")
    c = replace_exact(c, PAT_OLD, PAT_NEW, "viñeta PAT histórico")
    c = replace_one_of(c, [OUIGO_BULLET_PROD, OUIGO_BULLET_LIVE], OUIGO_BULLET_NEW, "viñeta OUIGO")
    c = replace_one_of(c, [H2_OUIGO_PROD, H2_OUIGO_LIVE], H2_OUIGO_NEW, "H2 OUIGO")
    c = replace_one_of(c, [OUIGO_P_PROD, OUIGO_P_LIVE], OUIGO_P_NEW, "párrafo OUIGO")
    c = replace_exact(c, OUIGO_REGLAMENTO_OLD, OUIGO_REGLAMENTO_NEW, "párrafo reglamento OUIGO")
    c = replace_exact(c, IRYO_H2_OLD, IRYO_H2_NEW, "H2 Iryo")
    c = replace_exact(c, IRYO_P_OLD, IRYO_P_NEW, "párrafo Iryo")
    c = replace_exact(c, T5_OLD, T5_NEW, "artículo 18")
    c = replace_exact(c, ASISTENCIA_OLD, ASISTENCIA_NEW, "asistencia 60 minutos")
    c = replace_exact(c, T6_OLD, T6_NEW, "artículo 15")
    c = replace_one_of(c, [FAQ_VUELVE_PROD, FAQ_VUELVE_LIVE], FAQ_VUELVE_NEW, "FAQ vuelta")
    c = replace_exact(c, FAQ_BUS_OLD, FAQ_BUS_NEW, "FAQ autobuses")
    c = replace_exact(c, FAQ_DINERO_OLD, FAQ_DINERO_NEW, "FAQ reembolso")
    c = replace_exact(c, BYLINE_OLD, BYLINE_NEW, "byline")
    c = replace_exact(c, DISCLAIMER_OLD, DISCLAIMER_NEW, "disclaimer")
    c = replace_exact(
        c,
        'description: "La alta velocidad Madrid–Andalucía sigue cortada tras el accidente de Urda. Cómo pedir el reembolso o cambiar el billete en Renfe, Iryo y Ouigo, y reclamar.",',
        'description: "Reembolso o cambio si se cancela tu tren Madrid–Andalucía: qué han anunciado Renfe, Iryo y OUIGO, y el Reglamento (UE) 2021/782.",',
        "description",
    )
    c = replace_exact(
        c,
        'id: "corte-ave-madrid-andalucia-reembolso", pack: "transporte", reviewedAt: R, path: P_CORTE_AVE,',
        'id: "corte-ave-madrid-andalucia-reembolso", pack: "transporte", reviewedAt: "2026-11-08", path: P_CORTE_AVE,',
        "reviewedAt transporte",
    )
    c = replace_exact(
        c,
        'renfeBus: { href: "https://grupo.renfe.com/content/dam/grupo-renfe/sala-de-prensa/comunicacion/comunicacion/castilla-la-mancha/pdf/pat-urda/PAT_MADRID-PUERTOLLANO.pdf", label: "Renfe: horarios del autobús Madrid–Ciudad Real–Puertollano (PDF)" },',
        'renfeBus: { href: "https://grupo.renfe.com/content/dam/grupo-renfe/sala-de-prensa/comunicacion/comunicacion/castilla-la-mancha/pdf/pat-urda/PAT_MADRID-PUERTOLLANO.pdf", label: "Renfe: PDF de horarios del autobús Madrid–Ciudad Real–Puertollano (anterior a la prórroga)" },\n'
        '  renfeBusNov: { href: "https://grupo.renfe.com/es/es/sala-de-prensa/noticias/2026/11/renfe-prorroga-plan-alternativo-transporte-por-carretera-entre-madrid-ciudad-real-puertollano", label: "Renfe, nota consultada el 8 de noviembre de 2026: prórroga del autobús Madrid–Ciudad Real–Puertollano" },',
        "fuente autobús",
    )
    c = replace_exact(
        c,
        "sources: [S.renfe, S.renfePat, S.renfeBus, S.renfeAyuda, S.iryo, S.ouigo, S.mitmaDerechos, S.mitmaVictimas, S.reglamento, S.jccm, S.ep],",
        "sources: [S.renfe, S.renfePat, S.renfeBus, S.renfeBusNov, S.renfeAyuda, S.iryo, S.ouigo, S.mitmaDerechos, S.mitmaVictimas, S.reglamento, S.jccm, S.ep],",
        "lista de fuentes",
    )
    c = replace_exact(
        c,
        'label: "Renfe: el plan alternativo Madrid–Andalucía no podrá empezar antes del 3 de noviembre"',
        'label: "Renfe, 29 de octubre de 2026 (histórica): el plan alternativo no podía empezar antes del 3 de noviembre"',
        "etiqueta nota histórica",
    )
    c = replace_optional(
        c,
        " * - Ouigo, aviso en su web: trenes Madrid–Andalucía cancelados hasta el 9-11 incluido; cambio de fecha gratis hasta el 9-11 en otras rutas.",
        " * - OUIGO, aviso consultado el 8-11-2026: servicios Madrid–Andalucía suspendidos hasta el 15-11 por cierre de línea. No se confirma el cambio gratuito en otras rutas.",
        "comentario OUIGO",
    )

    p = promesas.read_text(encoding="utf-8")
    before = p.count(COMP_OLD)
    p = patch_madrid_slice(p)
    after = p.count(COMP_OLD)
    if before - after != 1:
        raise PatchError(f"Competencias: el recuento global pasó de {before} a {after}.")

    m = mejoras.read_text(encoding="utf-8")
    madrid_threshold = MADRID_PREFIX + THRESHOLD_OLD
    if m.count(madrid_threshold) != 1:
        raise PatchError(f"Umbral de Madrid: coincidencias {m.count(madrid_threshold)}.")
    others = m.count(THRESHOLD_OLD)
    m = m.replace(madrid_threshold, MADRID_PREFIX + THRESHOLD_NEW, 1)
    if m.count(THRESHOLD_OLD) != others - 1:
        raise PatchError("El umbral del 3 % se ha modificado fuera de Madrid.")

    return_files = {
        encuestas: e,
        corte: c,
        promesas: p,
        mejoras: m,
    }
    return notes, return_files


def self_test() -> None:
    sample = "\n".join([LEAD_LIVE, H2_OUIGO_LIVE, OUIGO_P_LIVE, OUIGO_BULLET_LIVE, FAQ_VUELVE_LIVE, SIGMA_OLD, E1_OLD, E2_OLD])
    assert LEAD_NEW not in sample
    out = sample
    out = replace_one_of(out, [LEAD_PROD, LEAD_LIVE], LEAD_NEW, "lead")
    out = replace_one_of(out, [H2_OUIGO_PROD, H2_OUIGO_LIVE], H2_OUIGO_NEW, "h2")
    out = replace_one_of(out, [OUIGO_P_PROD, OUIGO_P_LIVE], OUIGO_P_NEW, "p")
    out = replace_one_of(out, [OUIGO_BULLET_PROD, OUIGO_BULLET_LIVE], OUIGO_BULLET_NEW, "b")
    out = replace_one_of(out, [FAQ_VUELVE_PROD, FAQ_VUELVE_LIVE], FAQ_VUELVE_NEW, "f")
    out = replace_exact(out, SIGMA_OLD, SIGMA_NEW, "sigma")
    out = replace_exact(out, E1_OLD, E1_NEW, "e1")
    out = replace_exact(out, E2_OLD, E2_NEW, "e2")
    for gone in (LEAD_LIVE, "hasta el 2 de noviembre", E1_OLD, E2_OLD, SIGMA_OLD):
        if gone in out:
            raise PatchError(f"La autoprueba aún contiene: {gone}")
    for needed in ("15 de noviembre", "±2,1 %", "ni convierte automáticamente", "12 de noviembre"):
        if needed not in out:
            raise PatchError(f"La autoprueba no contiene: {needed}")
    print("autoprueba de literales del release: ok")


def main() -> None:
    parser = argparse.ArgumentParser(description="Aplica la corrección editorial literal del 8 de noviembre de 2026.")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--release", action="store_true", help="Exige la celda de Sigma Dos del release 20261108.")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    notes, files = apply_tree(args.root, args.release)
    for note in notes:
        print(note)
    if args.dry_run:
        print(f"dry-run ok sobre {args.root} ({len(files)} archivos, sin escribir)")
        return
    for path, text in files.items():
        path.write_text(text, encoding="utf-8")
        print(f"escrito {path.relative_to(args.root)}")


if __name__ == "__main__":
    main()
