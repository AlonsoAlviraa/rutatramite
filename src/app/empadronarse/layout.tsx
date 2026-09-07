import type { Metadata } from "next";

export const metadata: Metadata = {
  keywords: [
    "empadronarse",
    "empadronamiento",
    "padrón municipal",
    "volante de empadronamiento",
    "certificado de empadronamiento",
    "empadronarse sin contrato",
  ],
};

export default function EmpadronarseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
