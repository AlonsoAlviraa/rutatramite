import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("sin-contrato");
export default function Page() {
  return <EscenarioPage slug="sin-contrato" />;
}
