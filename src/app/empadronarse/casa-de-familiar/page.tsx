import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("casa-de-familiar");
export default function Page() {
  return <EscenarioPage slug="casa-de-familiar" />;
}
