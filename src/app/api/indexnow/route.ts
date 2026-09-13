import { NextResponse } from "next/server";
import { pingIndexNow } from "@/lib/seo/indexnow";

export const dynamic = "force-dynamic";

/** Deploy hook. Robots disallow /api/. Always fail-soft so a ping outage cannot 500 the app. */
export async function POST() {
  const result = await pingIndexNow();
  return NextResponse.json(result, { status: 200 });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST to submit homepage + pillars to IndexNow. Fail-soft.",
  });
}
