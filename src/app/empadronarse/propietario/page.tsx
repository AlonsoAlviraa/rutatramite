import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("propietario");
export default function Page() {
  return <EscenarioPage slug="propietario" />;
}
