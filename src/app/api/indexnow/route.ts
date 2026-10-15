export const dynamic = "force-dynamic";

// Submissions stay in scripts/ping-indexnow.mjs. This route must not call IndexNow.
function closed() {
  return new Response(null, {
    status: 405,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

export function GET() {
  return closed();
}

export function POST() {
  return closed();
}