import { EscenarioPage, escenarioMetadata } from "@/components/empadronamiento/EscenarioPage";

export const metadata = escenarioMetadata("sin-hogar");
export default function Page() {
  return <EscenarioPage slug="sin-hogar" />;
}
