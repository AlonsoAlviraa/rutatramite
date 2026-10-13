import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("menores");
export default function Page() {
  return <EscenarioPage slug="menores" />;
}
