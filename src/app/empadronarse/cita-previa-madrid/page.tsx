import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("cita-previa-madrid");
export default function Page() {
  return <EscenarioPage slug="cita-previa-madrid" />;
}
