import { NextResponse } from "next/server";
import { getStandingExplanation, StandingExplanationRequest } from "@/lib/ai/standing-explainer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as StandingExplanationRequest;

    if (!body || !body.targetCollege || !body.courseName) {
      return NextResponse.json(
        { error: "targetCollege and courseName are required." },
        { status: 400 }
      );
    }

    const result = await getStandingExplanation(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[Standing Explain API Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to generate standing explanation." },
      { status: 500 }
    );
  }
}
