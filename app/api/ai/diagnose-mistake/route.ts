import { NextRequest, NextResponse } from "next/server";
import { diagnoseMistake } from "@/lib/ai/gemini-diagnostics";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      questionId,
      selectedOption,
      questionText,
      selectedOptionText,
      correctOption,
      correctOptionText,
      explanation,
      microTopic,
      timeSpentSeconds,
    } = body;

    if (!questionId || !selectedOption) {
      return NextResponse.json(
        { error: "questionId and selectedOption are required." },
        { status: 400 }
      );
    }

    const result = await diagnoseMistake({
      questionId,
      selectedOption,
      questionText: questionText || "CUET Exam Question",
      selectedOptionText,
      correctOption: correctOption || "A",
      correctOptionText,
      explanation,
      microTopic,
      timeSpentSeconds,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Cache": result.fromCache ? "HIT" : "MISS",
        "X-Tokens-Used": result.tokensUsed.toString(),
      },
    });
  } catch (error) {
    console.error("Mistake Diagnostic API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during mistake diagnosis." },
      { status: 500 }
    );
  }
}
