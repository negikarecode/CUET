"""Recover question text/options split across consecutive PDF pages."""
import json
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.pyq_pipeline.boundary_detector import BoundaryDetector
from scripts.pyq_pipeline.db import PYQDatabase
from scripts.pyq_pipeline.question_reconstructor import QuestionReconstructor


def main():
    db = PYQDatabase()
    conn = db.get_connection()
    conn.row_factory = sqlite3.Row
    detector = BoundaryDetector()
    reconstructor = QuestionReconstructor()
    docs = conn.execute("SELECT id,subject_id FROM documents ORDER BY id").fetchall()
    repaired = 0
    examined = 0

    for doc in docs:
        page_rows = conn.execute(
            "SELECT page_number,raw_text,ocr_text FROM pages WHERE document_id=? ORDER BY page_number",
            (doc["id"],),
        ).fetchall()
        pages = [{
            "page_number": row["page_number"], "raw_text": row["raw_text"] or "",
            "ocr_text": row["ocr_text"], "text_blocks": [], "text_lines": [],
            "page_rect": [0, 0, 595, 842], "image_boxes": [],
        } for row in page_rows]
        segments = detector.detect_question_segments_in_doc(pages)
        segment_by_number = {s["question_number"]: s for s in segments}
        questions = conn.execute(
            "SELECT * FROM questions WHERE document_id=? ORDER BY question_number", (doc["id"],)
        ).fetchall()

        for question in questions:
            option_rows = conn.execute(
                "SELECT * FROM question_options WHERE question_id=? ORDER BY option_key",
                (question["id"],),
            ).fetchall()
            current_count = sum(bool((o["raw_text"] or "").strip()) for o in option_rows)
            if current_count == 4 and (question["raw_question_text"] or "").strip():
                continue
            examined += 1
            segment = segment_by_number.get(question["question_number"])
            if not segment:
                continue
            candidate = reconstructor.reconstruct(
                doc["id"], doc["subject_id"], segment, ocr_fallback_text=None
            )
            candidate_count = sum(
                bool(candidate["options"].get(k, {}).get("raw_text", "").strip())
                for k in "ABCD"
            )
            candidate_stem = (candidate.get("raw_question_text") or "").strip()
            current_stem = (question["raw_question_text"] or "").strip()
            if not candidate_stem:
                continue
            if candidate_count <= current_count and not (not current_stem and candidate_stem):
                continue

            reasons = json.loads(question["review_reasons_json"] or "[]")
            if candidate_count == 4:
                reasons = [r for r in reasons if r not in ("missing_all_options", "missing_options")]
            if candidate_stem:
                reasons = [r for r in reasons if r != "question_stem_empty"]
            reasons.append("page_continuation_repaired_needs_review")
            reasons = list(dict.fromkeys(reasons))
            correct = conn.execute(
                "SELECT correct_option FROM answer_keys WHERE document_id=? AND question_number=?",
                (doc["id"], question["question_number"]),
            ).fetchone()
            correct_option = correct[0] if correct else None

            conn.execute("""UPDATE questions SET raw_question_text=?,normalized_question_text=?,
                source_page=?,source_pages_json=?,extraction_method='page_continuation',
                requires_review=1,review_reasons_json=?,updated_at=CURRENT_TIMESTAMP WHERE id=?""",
                (candidate_stem, candidate.get("normalized_question_text", ""),
                 segment["source_page"], json.dumps(segment["pages"]), json.dumps(reasons), question["id"]))
            for option_key in "ABCD":
                option = candidate["options"].get(option_key, {})
                conn.execute("""UPDATE question_options SET raw_text=?,normalized_text=?,is_correct=?
                    WHERE question_id=? AND option_key=?""",
                    (option.get("raw_text", ""), option.get("normalized_text", ""),
                     1 if option_key == correct_option else 0, question["id"], option_key))
            repaired += 1
        conn.commit()

    conn.close()
    print(json.dumps({"documents_checked": len(docs), "incomplete_questions_examined": examined,
                      "records_repaired": repaired}, indent=2))


if __name__ == "__main__":
    main()
