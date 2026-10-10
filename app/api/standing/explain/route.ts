import { NextRequest, NextResponse } from "next/server";
import { getStandingExplanation, StandingExplanationRequest } from "@/lib/ai/standing-explainer";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as StandingExplanationRequest;

    if (!body || !body.targetCollege || !body.courseName || !body.band) {
      return NextResponse.json(
        { error: "Missing required parameters for standing explanation." },
        { status: 400 }
      );
    }

    const explanation = await getStandingExplanation(body);
    return NextResponse.json(explanation);
  } catch (err: any) {
    console.error("Error in /api/standing/explain:", err);
    return NextResponse.json(
      { error: "Internal server error generating explanation." },
      { status: 500 }
    );
  }
}
