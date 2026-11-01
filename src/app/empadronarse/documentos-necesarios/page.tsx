import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";

export const metadata = tramiteMetadata("/empadronarse/documentos-necesarios");
export default function Page() {
  return <TramitePage path="/empadronarse/documentos-necesarios" />;
}
