import { aidDataset } from "@/lib/aid-data";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return Response.json(aidDataset(), { headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex",
  } });
}
