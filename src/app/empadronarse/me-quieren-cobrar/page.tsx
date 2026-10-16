import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";

export const metadata = tramiteMetadata("/empadronarse/me-quieren-cobrar");

export default function Page() {
  return <TramitePage path="/empadronarse/me-quieren-cobrar" />;
}
