import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("cambio-de-domicilio");
export default function Page() {
  return <EscenarioPage slug="cambio-de-domicilio" />;
}
