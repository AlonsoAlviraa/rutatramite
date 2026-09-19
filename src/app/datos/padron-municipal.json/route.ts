import { padronDataset } from "@/lib/padron-data";
export const dynamic = "force-static";
export function GET() { return Response.json(padronDataset(), { headers: { "Access-Control-Allow-Origin": "*", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex" } }); }
