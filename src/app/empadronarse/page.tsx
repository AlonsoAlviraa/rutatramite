import { PilarView } from "@/components/empadronamiento/PilarView";
import { loadIndex } from "@/lib/data/load";
import { buildPilarModel } from "@/lib/pilar/content";
import { pageMetadata } from "@/lib/seo/meta";
import type { Metadata } from "next";

const pilar = buildPilarModel();

export const metadata: Metadata = pageMetadata({
  title: pilar.title,
  description: pilar.description,
  path: "/empadronarse",
  type: "article",
  modified: pilar.editedAt,
});

export default function PilarPage() {
  const index = loadIndex();
  return <PilarView index={index} />;
}
