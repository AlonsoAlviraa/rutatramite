import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";

export const metadata = tramiteMetadata("/empadronarse/cobro-en-el-contrato");

export default function Page() {
  return <TramitePage path="/empadronarse/cobro-en-el-contrato" />;
}
