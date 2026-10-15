import territories from "../../data/geo/territories.json";
import { AIDS, aidPhase, type Aid } from "@/lib/ayudas";

export const AID_TERRITORIES = territories.ccaa.filter(c => !c.province_codes.some(p => p === "51" || p === "52")).map(c=>({ name: c.name, slug: c.slug }));
const regions: Record<string,string> = { "bono-madrid": "comunidad-de-madrid", "bono-andalucia": "andalucia", "bono-catalunya": "cataluna", "lloguer-joves": "cataluna" };
export function aidTerritory(aid: Aid) { return aid.territorySlug ?? regions[aid.id] ?? "estatal"; }
export function filterAids(rows: Aid[], filters: { territory?: string; category?: string; phase?: string }, now: Date) {
  return rows.filter(a => (!filters.category || a.category === filters.category)
    && (!filters.territory || aidTerritory(a) === filters.territory || aidTerritory(a) === "estatal")
    && (!filters.phase || aidPhase(a, now) === filters.phase));
}
export function aidCoverage() {
  return AID_TERRITORIES.flatMap(territory => ["mec", "neae", "colaboracion", "alquiler-joven"].map(category => {
    const ids = category === "mec" ? ["mec-modificacion-2627"] : category === "neae" ? ["neae-2627"] : category === "colaboracion" ? ["colaboracion-2627"] : AIDS.filter(a=>aidTerritory(a)===territory.slug).map(a=>a.id);
    const regional = category === "alquiler-joven" && ids.length>0;
    const records = ids.map(id=>AIDS.find(a=>a.id===id)!);
    return { territory: territory.name, territory_slug: territory.slug, category,
      coverage: regional ? "referencia_autonomica" : category === "alquiler-joven" ? "pendiente" : "referencia_estatal",
      note: regional ? "Convocatorias seleccionadas; no acredita cobertura exhaustiva ni plazo abierto."
        : category === "alquiler-joven" ? "No se ha revisado una convocatoria de este territorio. No significa que no exista ayuda."
        : territory.slug === "cataluna" && category !== "colaboracion" ? "El Ministerio remite a la convocatoria catalana para domicilio familiar en Cataluña desde 2026-27. Pendiente revisar esa convocatoria territorial."
        : "Referencia del Ministerio. Comprobar ámbito, domicilio y centro en la convocatoria; no acredita revisión de todas las ayudas autonómicas.",
      record_ids: ids, sources: records.map(a=>a.source.href) };
  }));
}
