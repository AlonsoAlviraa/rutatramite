import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("volante-online");
export default function Page() {
  return <EscenarioPage slug="volante-online" />;
}
