import { NextRequest, NextResponse } from "next/server";
import { editQuestion, getIngestionStats, getQuestionDetail, getQuestionsList, updateQuestionReview, getPYQDB } from "@/lib/pyq/db";

import crypto from "crypto";

export const runtime = "nodejs";

function authorized(req: NextRequest) {
  const expected = process.env.PYQ_ADMIN_TOKEN;
  if (!expected || expected.trim() === "") return false;
  const authHeader = req.headers.get("authorization") || "";
  const expectedHeader = `Bearer ${expected}`;
  const authBuf = Buffer.from(authHeader);
  const expBuf = Buffer.from(expectedHeader);
  return authBuf.length === expBuf.length && crypto.timingSafeEqual(authBuf, expBuf);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Admin access required. Configure PYQ_ADMIN_TOKEN." }, { status: 401 });
  try {
    const params = req.nextUrl.searchParams;
    const isExport = params.get("export") === "1" || params.has("format");
    if (isExport) {
      const db = getPYQDB();
      const rows = db.prepare(`SELECT q.*, d.filename, d.year, d.shift, s.name subject, qm.chapter, qm.topic, qm.concept, qm.question_type, qm.difficulty, qm.cognitive_level
        FROM questions q JOIN documents d ON d.id=q.document_id JOIN subjects s ON s.id=q.subject_id LEFT JOIN question_metadata qm ON qm.question_id=q.id
        ORDER BY s.name, d.filename, q.question_number`).all() as any[];
      const optQuery = db.prepare("SELECT option_key, normalized_text FROM question_options WHERE question_id=? ORDER BY option_key");
      const keyQuery = db.prepare("SELECT correct_option, source_type, confidence FROM answer_keys WHERE document_id=? AND question_number=?");
      const records = rows.map((q) => ({
        id: q.id, exam: "CUET UG", subject: q.subject, year: q.year, shift: q.shift, question_number: q.question_number,
        question_text: q.normalized_question_text, raw_question_text: q.raw_question_text,
        options: Object.fromEntries((optQuery.all(q.id) as any[]).map((o) => [o.option_key, o.normalized_text])),
        answer_key: keyQuery.get(q.document_id, q.question_number) || null,
        taxonomy: { chapter: q.chapter, topic: q.topic, concept: q.concept, question_type: q.question_type, difficulty: q.difficulty, cognitive_level: q.cognitive_level },
        source: { filename: q.filename, page: q.source_page },
        extraction: { method: q.extraction_method, confidence: q.extraction_confidence },
        review: { required: Boolean(q.requires_review), reasons: JSON.parse(q.review_reasons_json || "[]") },
        duplicate_status: q.duplicate_status,
      }));
      const jsonl = params.get("format") === "jsonl";
      const body = jsonl ? records.map((r) => JSON.stringify(r)).join("\n") : JSON.stringify(records, null, 2);
      return new NextResponse(body, {
        headers: {
          "Content-Type": jsonl ? "application/x-ndjson; charset=utf-8" : "application/json; charset=utf-8",
          "Content-Disposition": `attachment; filename=cuet-pyq.${jsonl ? "jsonl" : "json"}`,
        },
      });
    }

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
