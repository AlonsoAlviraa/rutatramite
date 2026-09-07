import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("extranjeros-no-ue");
export default function Page() {
  return <EscenarioPage slug="extranjeros-no-ue" />;
}
