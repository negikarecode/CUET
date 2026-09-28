import { NextRequest, NextResponse } from "next/server";
import { getPYQDB } from "@/lib/pyq/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const secret = process.env.PYQ_ADMIN_TOKEN;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Admin access required" }, { status: 401 });
  const db = getPYQDB();
  const rows = db.prepare(`SELECT q.*, d.filename, d.year, d.shift, s.name subject, qm.chapter, qm.topic, qm.concept, qm.question_type, qm.difficulty, qm.cognitive_level
    FROM questions q JOIN documents d ON d.id=q.document_id JOIN subjects s ON s.id=q.subject_id LEFT JOIN question_metadata qm ON qm.question_id=q.id
    ORDER BY s.name, d.filename, q.question_number`).all() as any[];
  const optQuery = db.prepare("SELECT option_key, normalized_text FROM question_options WHERE question_id=? ORDER BY option_key");
  const keyQuery = db.prepare("SELECT correct_option, source_type, confidence FROM answer_keys WHERE document_id=? AND question_number=?");
  const records = rows.map(q => ({
    id: q.id, exam: "CUET UG", subject: q.subject, year: q.year, shift: q.shift, question_number: q.question_number,
    question_text: q.normalized_question_text, raw_question_text: q.raw_question_text,
    options: Object.fromEntries((optQuery.all(q.id) as any[]).map(o => [o.option_key, o.normalized_text])),
    answer_key: keyQuery.get(q.document_id, q.question_number) || null,
    taxonomy: { chapter: q.chapter, topic: q.topic, concept: q.concept, question_type: q.question_type, difficulty: q.difficulty, cognitive_level: q.cognitive_level },
    source: { filename: q.filename, page: q.source_page },
    extraction: { method: q.extraction_method, confidence: q.extraction_confidence },
    review: { required: Boolean(q.requires_review), reasons: JSON.parse(q.review_reasons_json || "[]") },
    duplicate_status: q.duplicate_status,
  }));
  const jsonl = req.nextUrl.searchParams.get("format") === "jsonl";
  const body = jsonl ? records.map(r => JSON.stringify(r)).join("\n") : JSON.stringify(records, null, 2);
  return new NextResponse(body, { headers: { "Content-Type": jsonl ? "application/x-ndjson; charset=utf-8" : "application/json; charset=utf-8", "Content-Disposition": `attachment; filename=cuet-pyq.${jsonl ? "jsonl" : "json"}` } });
}
