import { NextRequest, NextResponse } from "next/server";
import { editQuestion, getIngestionStats, getQuestionDetail, getQuestionsList, updateQuestionReview } from "@/lib/pyq/db";

export const runtime = "nodejs";

function authorized(req: NextRequest) {
  const expected = process.env.PYQ_ADMIN_TOKEN;
  return Boolean(expected && req.headers.get("authorization") === `Bearer ${expected}`);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Admin access required. Configure PYQ_ADMIN_TOKEN." }, { status: 401 });
  try {
    const params = req.nextUrl.searchParams;
    const id = params.get("id");
    if (id) return NextResponse.json({ question: getQuestionDetail(id) });
    if (params.get("stats") === "1") return NextResponse.json({ stats: getIngestionStats() });
    return NextResponse.json(getQuestionsList({
      subject: params.get("subject") || undefined, status: params.get("status") || "review",
      search: params.get("search") || undefined, limit: Math.min(100, Number(params.get("limit") || 50)),
      offset: Math.max(0, Number(params.get("offset") || 0)),
    }));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "PYQ database unavailable" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Admin access required" }, { status: 401 });
  try {
    const body = await req.json();
    if (body.action === "approve" || body.action === "flag") return NextResponse.json(updateQuestionReview(body.id, body.action, body.notes));
    const valid = typeof body.id === "string" && typeof body.question_text === "string" && body.options && ["A", "B", "C", "D"].every((k) => typeof body.options[k] === "string");
    if (!valid) return NextResponse.json({ error: "Question text and four options are required" }, { status: 400 });
    return NextResponse.json(editQuestion(body.id, body));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save review" }, { status: 400 });
  }
}
