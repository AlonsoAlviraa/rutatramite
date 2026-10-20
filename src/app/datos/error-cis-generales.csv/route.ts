import { errorCisCsv } from "@/lib/datos/error-cis";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return new Response(errorCisCsv(), { headers: {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": 'attachment; filename="rutatramite-error-cis-generales-2019-2023.csv"',
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex",
  } });
}
