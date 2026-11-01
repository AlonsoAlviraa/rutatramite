/** Diputados por circunscripción el 29-N (Real Decreto 806/2026, anexo) y población oficial a 1-1-2025 (Real Decreto 1117/2025, anexo). */
export const VOTO_PROVINCIA_ROWS: { circ: string; diputados: number; poblacion: number }[] = [
  { circ: "Albacete", diputados: 4, poblacion: 390406 },
  { circ: "Alicante/Alacant", diputados: 12, poblacion: 2030037 },
  { circ: "Almería", diputados: 6, poblacion: 773577 },
  { circ: "Araba/Álava", diputados: 4, poblacion: 342161 },
  { circ: "Asturias", diputados: 7, poblacion: 1013529 },
  { circ: "Badajoz", diputados: 5, poblacion: 663886 },
  { circ: "Balears (Illes)", diputados: 8, poblacion: 1237480 },
  { circ: "Barcelona", diputados: 32, poblacion: 5983325 },
  { circ: "Bizkaia", diputados: 8, poblacion: 1166816 },
  { circ: "Burgos", diputados: 4, poblacion: 361556 },
  { circ: "Cantabria", diputados: 5, poblacion: 593964 },
  { circ: "Castellón/Castelló", diputados: 5, poblacion: 627173 },
  { circ: "Ceuta", diputados: 1, poblacion: 83595 },
  { circ: "Ciudad Real", diputados: 5, poblacion: 494407 },
  { circ: "Coruña (A)", diputados: 8, poblacion: 1135612 },
  { circ: "Cuenca", diputados: 3, poblacion: 198216 },
  { circ: "Cáceres", diputados: 4, poblacion: 387752 },
  { circ: "Cádiz", diputados: 8, poblacion: 1257041 },
  { circ: "Córdoba", diputados: 6, poblacion: 772153 },
  { circ: "Gipuzkoa", diputados: 6, poblacion: 733365 },
  { circ: "Girona", diputados: 6, poblacion: 832026 },
  { circ: "Granada", diputados: 7, poblacion: 942618 },
  { circ: "Guadalajara", diputados: 3, poblacion: 285390 },
  { circ: "Huelva", diputados: 5, poblacion: 535703 },
  { circ: "Huesca", diputados: 3, poblacion: 230624 },
  { circ: "Jaén", diputados: 5, poblacion: 617604 },
  { circ: "León", diputados: 4, poblacion: 446771 },
  { circ: "Lleida", diputados: 4, poblacion: 456106 },
  { circ: "Lugo", diputados: 4, poblacion: 325759 },
  { circ: "Madrid", diputados: 38, poblacion: 7137031 },
  { circ: "Melilla", diputados: 1, poblacion: 86780 },
  { circ: "Murcia", diputados: 10, poblacion: 1589138 },
  { circ: "Málaga", diputados: 11, poblacion: 1791092 },
  { circ: "Navarra", diputados: 5, poblacion: 683500 },
  { circ: "Ourense", diputados: 4, poblacion: 305573 },
  { circ: "Palencia", diputados: 3, poblacion: 158687 },
  { circ: "Palmas (Las)", diputados: 8, poblacion: 1167555 },
  { circ: "Pontevedra", diputados: 7, poblacion: 946225 },
  { circ: "Rioja (La)", diputados: 4, poblacion: 327286 },
  { circ: "Salamanca", diputados: 4, poblacion: 328779 },
  { circ: "Santa Cruz de Tenerife", diputados: 7, poblacion: 1082421 },
  { circ: "Segovia", diputados: 3, poblacion: 158470 },
  { circ: "Sevilla", diputados: 12, poblacion: 1976624 },
  { circ: "Soria", diputados: 2, poblacion: 90234 },
  { circ: "Tarragona", diputados: 6, poblacion: 874808 },
  { circ: "Teruel", diputados: 3, poblacion: 136197 },
  { circ: "Toledo", diputados: 6, poblacion: 750815 },
  { circ: "Valencia/València", diputados: 16, poblacion: 2758633 },
  { circ: "Valladolid", diputados: 5, poblacion: 528841 },
  { circ: "Zamora", diputados: 3, poblacion: 165275 },
  { circ: "Zaragoza", diputados: 7, poblacion: 991991 },
  { circ: "Ávila", diputados: 3, poblacion: 159887 },
];
export const VP_TOTAL_POB = VOTO_PROVINCIA_ROWS.reduce((a, r) => a + r.poblacion, 0);
export const VP_MEDIA = VP_TOTAL_POB / 350;
export const vpRanked = () =>
  VOTO_PROVINCIA_ROWS.map((r) => ({ ...r, porDiputado: Math.round(r.poblacion / r.diputados), peso: VP_MEDIA / (r.poblacion / r.diputados) }))
    .sort((a, b) => a.porDiputado - b.porDiputado);
export function votoProvinciaCsv(): string {
  const head = "circunscripcion,diputados_29n,poblacion_oficial_2025,habitantes_por_diputado,peso_relativo_media_100,fuente_diputados,fuente_poblacion";
  return [head, ...vpRanked().map((r) => [`"${r.circ}"`, r.diputados, r.poblacion, r.porDiputado, Math.round(r.peso * 100), "BOE-A-2026-20742", "BOE-A-2025-25362"].join(","))].join("\n") + "\n";
}
