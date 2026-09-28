import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "cuet_pyq_master.db");

let dbInstance: Database.Database | null = null;

export function getPYQDB(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH, {
      readonly: false,
      fileMustExist: false,
    });
    dbInstance.pragma("journal_mode = WAL");
  }
  return dbInstance;
}

export interface IngestionStats {
  total_documents: number;
  total_pages: number;
  total_questions: number;
  validated_questions: number;
  needs_review: number;
  duplicates: number;
  average_confidence: number;
  subjects: Array<{
    id: string;
    name: string;
    doc_count: number;
    question_count: number;
  }>;
}

export function getIngestionStats(): IngestionStats {
  const db = getPYQDB();
  const docs = db.prepare("SELECT COUNT(*) as c FROM documents").get() as { c: number };
  const pages = db.prepare("SELECT COUNT(*) as c FROM pages").get() as { c: number };
  const questions = db.prepare("SELECT COUNT(*) as c FROM questions").get() as { c: number };
  const validated = db.prepare("SELECT COUNT(*) as c FROM questions WHERE requires_review = 0").get() as { c: number };
  const review = db.prepare("SELECT COUNT(*) as c FROM questions WHERE requires_review = 1").get() as { c: number };
  const dups = db.prepare("SELECT COUNT(*) as c FROM questions WHERE duplicate_status = 'duplicate'").get() as { c: number };
  const avgConf = db.prepare("SELECT AVG(extraction_confidence) as a FROM questions").get() as { a: number | null };

  const subjects = db.prepare(`
    SELECT s.id, s.name, COUNT(DISTINCT d.id) as doc_count, COUNT(q.id) as question_count
    FROM subjects s
    LEFT JOIN documents d ON d.subject_id = s.id
    LEFT JOIN questions q ON q.document_id = d.id
    GROUP BY s.id, s.name
    ORDER BY s.name ASC
  `).all() as Array<{ id: string; name: string; doc_count: number; question_count: number }>;

  return {
    total_documents: docs?.c || 0,
    total_pages: pages?.c || 0,
    total_questions: questions?.c || 0,
    validated_questions: validated?.c || 0,
    needs_review: review?.c || 0,
    duplicates: dups?.c || 0,
    average_confidence: Math.round((avgConf?.a || 0) * 1000) / 10,
    subjects,
  };
}

export function getQuestionsList(params: {
  subject?: string;
  status?: string; // 'all', 'validated', 'review', 'duplicate'
  difficulty?: string;
  type?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const db = getPYQDB();
  const limit = params.limit || 50;
  const offset = params.offset || 0;

  const conditions: string[] = [];
  const args: any[] = [];

  if (params.subject && params.subject !== "all") {
    conditions.push("q.subject_id = ?");
    args.push(params.subject);
  }

  if (params.status === "validated") {
    conditions.push("q.requires_review = 0");
  } else if (params.status === "review") {
    conditions.push("q.requires_review = 1");
  } else if (params.status === "duplicate") {
    conditions.push("q.duplicate_status = 'duplicate'");
  }

  if (params.difficulty && params.difficulty !== "all") {
    conditions.push("qm.difficulty = ?");
    args.push(params.difficulty);
  }

  if (params.type && params.type !== "all") {
    conditions.push("qm.question_type = ?");
    args.push(params.type);
  }

  if (params.search) {
    conditions.push("(q.normalized_question_text LIKE ? OR q.id LIKE ?)");
    args.push(`%${params.search}%`, `%${params.search}%`);
  }

  const whereClause = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

  const totalCount = db.prepare(`
    SELECT COUNT(*) as c
    FROM questions q
    LEFT JOIN question_metadata qm ON qm.question_id = q.id
    ${whereClause}
  `).get(...args) as { c: number };

  const rows = db.prepare(`
    SELECT q.id, q.document_id, q.subject_id, q.question_number,
           q.normalized_question_text, q.has_image, q.has_table,
           q.source_page, q.extraction_method, q.extraction_confidence,
           q.duplicate_status, q.requires_review, q.review_reasons_json,
           d.filename, d.year, d.shift, s.name as subject_name,
           qm.question_type, qm.difficulty, qm.cognitive_level, qm.chapter
    FROM questions q
    JOIN documents d ON q.document_id = d.id
    JOIN subjects s ON q.subject_id = s.id
    LEFT JOIN question_metadata qm ON qm.question_id = q.id
    ${whereClause}
    ORDER BY q.subject_id ASC, q.document_id ASC, q.question_number ASC
    LIMIT ? OFFSET ?
  `).all(...args, limit, offset);

  return {
    total: totalCount?.c || 0,
    limit,
    offset,
    questions: rows,
  };
}

export function getQuestionDetail(id: string) {
  const db = getPYQDB();
  const q = db.prepare(`
    SELECT q.*, d.filename, d.year, d.shift, d.exam_date, d.time_slot, s.name as subject_name
    FROM questions q
    JOIN documents d ON q.document_id = d.id
    JOIN subjects s ON q.subject_id = s.id
    WHERE q.id = ?
  `).get(id) as any;

  if (!q) return null;

  const options = db.prepare(`
    SELECT option_key, raw_text, normalized_text, is_correct, distractor_reason
    FROM question_options
    WHERE question_id = ?
    ORDER BY option_key ASC
  `).all(id) as any[];

  const metadata = db.prepare(`
    SELECT * FROM question_metadata WHERE question_id = ?
  `).get(id) as any;

  const reviewItems = db.prepare(`
    SELECT * FROM review_queue WHERE question_id = ?
  `).all(id) as any[];

  const answerKey = db.prepare(`SELECT * FROM answer_keys WHERE document_id = ? AND question_number = ?`).get(q.document_id, q.question_number) as any;

  const page = db.prepare(`
    SELECT page_image_path FROM pages WHERE document_id = ? AND page_number = ?
  `).get(q.document_id, q.source_page) as any;
  let sourcePages: number[] = [q.source_page];
  try { sourcePages = JSON.parse(q.source_pages_json || "[]"); } catch { /* retain primary page */ }
  const sourcePageImages = sourcePages.map((pageNumber) => db.prepare(
    "SELECT page_number, page_image_path FROM pages WHERE document_id = ? AND page_number = ?"
  ).get(q.document_id, pageNumber) as { page_number: number; page_image_path: string } | undefined).filter(Boolean);

  return {
    ...q,
    options: options.reduce((acc, opt) => {
      acc[opt.option_key] = opt;
      return acc;
    }, {} as Record<string, any>),
    metadata: metadata || {},
    review_items: reviewItems || [],
    answer_key: answerKey || null,
    source_page_image: page?.page_image_path || null,
    source_page_images: sourcePageImages,
  };
}

export function editQuestion(id: string, input: {
  question_text: string; options: Record<string, string>; correct_option: string | null;
  chapter: string | null; topic: string | null; concept: string | null;
}) {
  const db = getPYQDB();
  const update = db.transaction(() => {
    const existing = db.prepare("SELECT document_id, question_number FROM questions WHERE id = ?").get(id) as any;
    if (!existing) throw new Error("Question not found");
    db.prepare("UPDATE questions SET normalized_question_text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(input.question_text, id);
    const opt = db.prepare("UPDATE question_options SET normalized_text = ?, is_correct = ? WHERE question_id = ? AND option_key = ?");
    for (const key of ["A", "B", "C", "D"]) opt.run(input.options[key] || "", input.correct_option === key ? 1 : 0, id, key);
    db.prepare("UPDATE question_metadata SET chapter = ?, topic = ?, concept = ? WHERE question_id = ?").run(input.chapter, input.topic, input.concept, id);
    if (input.correct_option) db.prepare(`INSERT INTO answer_keys (id, document_id, question_number, correct_option, source_type, confidence, raw_data_json)
      VALUES (?, ?, ?, ?, 'verified_manual', 1, ?) ON CONFLICT(document_id, question_number) DO UPDATE SET
      correct_option=excluded.correct_option, source_type='verified_manual', confidence=1, raw_data_json=excluded.raw_data_json`)
      .run(`MANUAL_${id}`, existing.document_id, existing.question_number, input.correct_option, JSON.stringify({ reviewed_in_admin: true }));
    else db.prepare("UPDATE answer_keys SET correct_option = NULL, source_type = 'none', confidence = 0 WHERE document_id = ? AND question_number = ?")
      .run(existing.document_id, existing.question_number);
    db.prepare("UPDATE questions SET requires_review = 1 WHERE id = ?").run(id);
    db.prepare("INSERT INTO review_queue (id, question_id, reason, severity, status, notes, resolved_at) VALUES (?, ?, 'manual_edit', 'info', 'edited', 'Edited in admin review', CURRENT_TIMESTAMP)").run(`EDIT_${id}_${Date.now()}`, id);
  });
  update();
  return { success: true, id };
}

export function updateQuestionReview(id: string, action: "approve" | "flag", notes?: string) {
  const db = getPYQDB();
  const status = action === "approve" ? "approved" : "flagged";
  const reqReview = action === "approve" ? 0 : 1;

  db.prepare(`
    UPDATE questions SET requires_review = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(reqReview, id);

  db.prepare(`
    UPDATE review_queue
    SET status = ?, notes = COALESCE(?, notes), resolved_at = CURRENT_TIMESTAMP
    WHERE question_id = ?
  `).run(status, notes || null, id);

  return { success: true, id, status };
}
