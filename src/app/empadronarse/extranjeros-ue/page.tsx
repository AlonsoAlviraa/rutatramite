import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("extranjeros-ue");
export default function Page() {
  return <EscenarioPage slug="extranjeros-ue" />;
}
