import { padronCsv } from "@/lib/padron-data";
export const dynamic = "force-static";
export function GET() { return new Response(padronCsv(), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="padron-municipal.csv"', "Access-Control-Allow-Origin": "*", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex" } }); }
