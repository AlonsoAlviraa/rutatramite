import { TramitePage, tramiteMetadata } from "@/components/tramites/TramitePage";

export const metadata = tramiteMetadata("/mudanza");
export default function Page() {
  return <TramitePage path="/mudanza" />;
}
