import { NextRequest, NextResponse } from "next/server";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import { sanitizeQuestionForActiveExam } from "@/lib/store/useCBTStore";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const { testMeta, questions } = getQuestionsForTest(params.testId);
    // Sanitize questions server-side before sending to client during active test
    const sanitizedQuestions = questions.map(sanitizeQuestionForActiveExam);

    return NextResponse.json({
      testMeta,
      questions: sanitizedQuestions,
    });
  } catch (err: any) {
    console.error("[Test Fetch Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to retrieve test" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action } = body;

    // Reveal authentic answer keys and solutions upon verified submission
    if (action === "reveal" || action === "submit") {
      const { testMeta, questions } = getQuestionsForTest(params.testId);
      return NextResponse.json({
        success: true,
        testMeta,
        questions,
      });
    }

    return NextResponse.json(
      { error: "Invalid action. Expected 'reveal' or 'submit'." },
      { status: 400 }
    );
  } catch (err: any) {
    console.error("[Test Reveal Error]:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to process test action" },
      { status: 500 }
    );
  }
}
