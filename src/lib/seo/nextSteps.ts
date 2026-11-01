/**
 * Bloque «Tu siguiente paso» (22-10-2026, prompt @Jera_Value §15 «después del clic»).
 * Solo rutas existentes; anclas = consulta exacta de GSC cuando la hay. No cambia títulos en test (medición 29-10 y 5-11).
 */
export type NextStep = { href: string; label: string; why: string };

export const NEXT_STEPS: Record<string, NextStep[]> = {
  "/elecciones/tarjeta-censal-cuando-llega": [
    { href: "/elecciones/donde-voto-mesa-electoral", label: "Dónde voto y en qué mesa", why: "Si la tarjeta no llega, puedes consultar tu colegio y mesa igualmente." },
    { href: "/elecciones/que-llevar-a-votar", label: "Qué llevar a votar el 29-N", why: "La tarjeta no es obligatoria; lo que piden es identificarte." },
    { href: "/elecciones/sorteo-mesa-electoral-29n", label: "Sorteo de mesa electoral", why: "Cuándo se sortean las mesas y cuándo avisan." },
  ],
  "/elecciones/que-pasa-si-no-voto": [
    { href: "/elecciones/voto-nulo-y-voto-en-blanco", label: "Voto nulo y voto en blanco", why: "Diferencias con la abstención y cómo cuenta cada uno." },
    { href: "/elecciones/que-pasa-si-no-voy-a-la-mesa", label: "Qué pasa si no voy a la mesa electoral", why: "Ser miembro de mesa sí es obligatorio, a diferencia de votar." },
    { href: "/elecciones/voto-por-correo", label: "Voto por correo", why: "Si el 29-N no vas a estar, puedes votar antes." },
  ],
  "/elecciones/cuando-habra-gobierno-29n": [
    { href: "/elecciones/como-se-elige-presidente-gobierno", label: "Cómo se elige al presidente del Gobierno", why: "Investidura, votaciones y plazos." },
    { href: "/elecciones/mayoria-absoluta-176-escanos", label: "Mayoría absoluta: 176 escaños", why: "Qué hace falta en la primera y en la segunda votación." },
    { href: "/elecciones/repeticion-electoral", label: "Repetición electoral", why: "Qué pasa si nadie consigue la investidura en dos meses." },
  ],
  "/dni": [
    { href: "/dni/cita-previa", label: "Cita previa DNI", why: "Pide la cita gratuita en la web oficial o en el 060." },
    { href: "/dni/checklist", label: "Qué llevar para renovar el DNI", why: "Documentos, foto y tasa de 12 €." },
    { href: "/dni/urgente-sin-cita", label: "DNI urgente sin cita", why: "Opciones si viajas pronto o no hay huecos." },
  ],
};
