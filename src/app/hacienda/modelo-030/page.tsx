import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";

export const metadata = tramiteMetadata("/hacienda/modelo-030");
export default function Page() {
  return <TramitePage path="/hacienda/modelo-030" />;
}
