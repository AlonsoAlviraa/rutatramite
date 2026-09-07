import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("baja");
export default function Page() {
  return <EscenarioPage slug="baja" />;
}
