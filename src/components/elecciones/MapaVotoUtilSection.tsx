import { MapaVotoUtil } from "@/components/elecciones/MapaVotoUtil";
import { pollsAllowed } from "@/lib/datos/mapa-voto-util";
import { MAPA_Y26_RAW } from "@/lib/datos/mapa-voto-util-2026";

/** Servidor: el escenario de encuestas solo entra en el HTML si el build es anterior al 24-11-2026 (LOREG art. 69). */
export function MapaVotoUtilSection() {
  return <MapaVotoUtil y26={pollsAllowed() ? MAPA_Y26_RAW : null} />;
}
