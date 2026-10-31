import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";

export const metadata = tramiteMetadata("/empadronarse/formulario-empadronamiento-murcia");
export default function Page() {
  return <TramitePage path="/empadronarse/formulario-empadronamiento-murcia" />;
}
