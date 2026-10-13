import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("con-contrato");
export default function Page() {
  return <EscenarioPage slug="con-contrato" />;
}
