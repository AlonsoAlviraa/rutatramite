import type { ClientMunicipio } from "@/lib/wizard/clientIndex";

/** Public catalog GET for the wizard typeahead. Never sends answers or identity. */
export async function loadRemoteClientIndex(): Promise<ClientMunicipio[]> {
  const res = await fetch("/api/municipios-index");
  if (!res.ok) return [];
  const rows = (await res.json()) as ClientMunicipio[];
  return Array.isArray(rows) ? rows : [];
}
