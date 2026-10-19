import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rateLimit, rateLimitResponse, getClientRateLimitIdentifier } from "@/lib/security/rateLimiter";
import { tokenLogger } from "@/lib/ai/token-logger";
import Groq from "groq-sdk";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const {
      message,
      userId = "student",
      studentContext = {
        weakTopics: [],
        strongTopics: [],
        recentMistakes: [],
        subject: "General",
      },
    } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // 1. Authenticate & Check Server-Side Rate Limit
    let authUserId: string | null = null;
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) authUserId = authUser.id;
    } catch {}

    const { getUserEntitlement } = await import("@/lib/payments/entitlements");
    const entitlement = await getUserEntitlement(authUserId || userId);
    if (!entitlement.isPremium) {
      return NextResponse.json(
        {
          error: "Unlock this feature with CUETMate Premium.",
          code: "PAYWALL_FEATURE_LOCKED",
          feature: "doubt_solver",
        },
        { status: 403 }
      );
    }

    const clientIdentifier = getClientRateLimitIdentifier(req, authUserId || userId, "ai:doubt_solver");
    const rateCheck = await rateLimit("ai:doubt_solver", clientIdentifier);
    if (!rateCheck.success) {
      return rateLimitResponse(rateCheck);
    }

    // 2. Format grounding facts
    const weakList = (studentContext.weakTopics || []).slice(0, 5).join(", ") || "None diagnosed yet";
    const strongList = (studentContext.strongTopics || []).slice(0, 5).join(", ") || "None recorded";
    const recentErrors = (studentContext.recentMistakes || [])
      .slice(0, 4)
      .map((m: any) => `- Q: ${m.prompt} | Student selected: ${m.userAnswer} | Correct: ${m.correctAnswer} | Concept: ${m.chapter || studentContext.subject}`)
      .join("\n");

    const systemPrompt = `You are the CUET AI Grounded Doubt Solver.
RULES:
1. Ground your answers ONLY in the student's telemetry, their recorded mistakes, and standard CUET/NCERT syllabus for ${studentContext.subject || "Domain Subjects"}.
2. CRITICAL CONSTRAINT: If the user asks something outside the student's syllabus or you lack reliable factual grounding to be 100% sure, REFUSE TO GUESS. State clearly: "I'm not sure, here's how to check: ..." and provide the specific NCERT chapter or resource to verify.
3. Keep answers concise, direct, and under 120 words. No fluffy pleasantries.
4. If the question relates to an error the student made in practice, reference their mistake directly to help them understand.

STUDENT TELEMETRY FACTS:
- Active Domain: ${studentContext.subject || "General"}
- Diagnosed Weak Topics: ${weakList}
- Calibrated Strengths: ${strongList}
- Recent Logged Mistakes:
${recentErrors || "No recent mistakes logged"}`;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      // Deterministic rule-based response
      let fallbackText = `Based on your practice in ${studentContext.subject}: For core definitions in ${weakList}, ensure you review the exact terminology and boundary conditions in the official NCERT textbook.`;
      if (message.toLowerCase().includes("not sure") || message.toLowerCase().includes("how")) {
        fallbackText = `I'm not sure about that specific edge case. Here's how to check: Consult the NCERT chapter summary and review the official CUET syllabus guidelines.`;
      }
      return NextResponse.json({
        success: true,
        reply: fallbackText,
        grounded: true,
        source: "Deterministic syllabus engine",
        remainingQuota: rateCheck.remaining,
      });
    }

    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.2,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content || "I'm not sure, here's how to check: Refer to your NCERT textbook chapter summary.";
    const usage = completion.usage;

    tokenLogger.logUsage({
      userId,
      feature: "doubt_solver",
      model: "llama-3.1-8b-instant",
      promptTokens: usage?.prompt_tokens || 180,
      completionTokens: usage?.completion_tokens || 80,
      latencyMs: Date.now() - startTime,
    });

    return NextResponse.json({
      success: true,
      reply,
      grounded: true,
      remainingQuota: rateCheck.remaining,
    });
  } catch (error: any) {
    console.error("Doubt solver API error:", error);
    return NextResponse.json(
      { error: "Failed to resolve doubt.", details: error?.message },
      { status: 500 }
    );
  }
}
