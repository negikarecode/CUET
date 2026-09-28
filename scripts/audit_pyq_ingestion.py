"""Audit the SQLite export against source PDF text and relational invariants."""
import json
import re
import sqlite3
import sys
from collections import Counter
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "cuet_pyq_master.db"
EXPORT_PATH = ROOT / "data" / "pyq_exports" / "cuet_pyq_dataset.json"
STOP = {"the", "and", "for", "with", "from", "that", "this", "which", "what", "when", "where", "into", "are", "was", "were", "has", "have", "had", "following", "correct", "option", "following", "given", "according"}


def terms(text):
    return {w for w in re.findall(r"[a-z0-9]+", text.casefold()) if len(w) > 2 and w not in STOP}


def main():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    pdf_paths = [p for p in (ROOT / "cuet_ug_pyqs").rglob("*") if p.is_file() and p.suffix.lower() == ".pdf"]
    pdfs = {p.name: p for p in pdf_paths}
    documents = conn.execute("SELECT * FROM documents").fetchall()
    questions = conn.execute("""SELECT q.*, d.filename,d.filepath,d.year doc_year,d.shift doc_shift,d.status doc_status FROM questions q
      JOIN documents d ON d.id=q.document_id ORDER BY d.filename,q.question_number""").fetchall()
    options = conn.execute("SELECT * FROM question_options").fetchall()
    option_map = {}
    for opt in options:
        option_map.setdefault(opt["question_id"], {})[opt["option_key"]] = opt
    key_map = {(r["document_id"], r["question_number"]): r for r in conn.execute("SELECT * FROM answer_keys")}
    meta_map = {r["question_id"]: r for r in conn.execute("SELECT * FROM question_metadata")}
    issues = Counter()
    issue_examples = {}
    source_cache = {}
    page_text_cache = {}
    records = []

    def issue(name, qid, detail=""):
        issues[name] += 1
        issue_examples.setdefault(name, []).append({"id": qid, "detail": detail})

    seen_questions = {}
    for q in questions:
        seen_questions.setdefault(q["document_id"], set()).add(q["question_number"])
    for doc in documents:
        nums = seen_questions.get(doc["id"], set())
        if nums:
            expected_nums = set(range(1, max(nums) + 1))
            if nums != expected_nums:
                issue("question_number_gaps", doc["filename"], sorted(expected_nums - nums))
        source_page_rows = conn.execute("SELECT raw_text,ocr_text FROM pages WHERE document_id=?", (doc["id"],)).fetchall()
        markers = set()
        for page in source_page_rows:
            text = "\n".join([page["raw_text"] or "", page["ocr_text"] or ""])
            markers.update(int(n) for n in re.findall(r"(?im)^\s*(?:Q\.?\s*|Question\s*)(\d{1,3})\b", text))
        if markers:
            missing = sorted(set(range(1, max(markers) + 1)) - nums)
            if missing:
                issue("question_boundaries_missing_from_source", doc["filename"], missing)

    for q in questions:
        qid = q["id"]
        opts = option_map.get(qid, {})
        if set(opts) != {"A", "B", "C", "D"}:
            issue("option_rows_not_four", qid, sorted(opts))
        empty = [k for k in "ABCD" if not opts.get(k) or not (opts[k]["raw_text"] or "").strip()]
        if empty:
            issue("empty_options", qid, empty)
        if not (q["raw_question_text"] or "").strip():
            issue("empty_question_text", qid)
        if q["source_page"] < 1:
            issue("invalid_source_page", qid, q["source_page"])
        if not 0 <= q["extraction_confidence"] <= 1:
            issue("invalid_confidence", qid, q["extraction_confidence"])
        reasons = json.loads(q["review_reasons_json"] or "[]")
        if q["extraction_confidence"] < 0.85 and not q["requires_review"]:
            issue("low_confidence_not_flagged", qid, q["extraction_confidence"])
        if "missing_source_answer_key" in reasons and not q["requires_review"]:
            issue("missing_answer_not_flagged", qid)
        key = key_map.get((q["document_id"], q["question_number"]))
        marked = [k for k, o in opts.items() if o["is_correct"]]
        if key and key["correct_option"]:
            if marked != [key["correct_option"]]:
                issue("answer_key_option_mismatch", qid, {"key": key["correct_option"], "marked": marked})
        elif marked:
            issue("invented_or_unbacked_correct_option", qid, marked)
        if q["has_image"] and (not q["image_path"] or not (ROOT / "public" / q["image_path"].lstrip("/")).exists()):
            issue("question_image_missing", qid, q["image_path"])

        src_path = Path(q["filepath"])
        if not src_path.is_absolute():
            src_path = ROOT / src_path
        if not src_path.exists():
            src_path = pdfs.get(q["filename"], src_path)
        if not src_path.exists():
            issue("source_pdf_missing", qid, str(src_path))
        else:
            if str(src_path) not in source_cache:
                source_cache[str(src_path)] = fitz.open(src_path)
            pdf = source_cache[str(src_path)]
            if q["source_page"] > len(pdf):
                issue("source_page_out_of_range", qid, {"page": q["source_page"], "pages": len(pdf)})
            else:
                source_pages = json.loads(q["source_pages_json"] or "[]")
                source_text = "\n".join(pdf[p - 1].get_text("text") for p in source_pages if 1 <= p <= len(pdf))
                for page_no in source_pages:
                    page_key = (q["document_id"], page_no)
                    if page_key not in page_text_cache:
                        page_row = conn.execute("SELECT raw_text,ocr_text FROM pages WHERE document_id=? AND page_number=?", page_key).fetchone()
                        page_text_cache[page_key] = "\n".join([page_row["raw_text"] or "", page_row["ocr_text"] or ""]) if page_row else ""
                source_text += "\n" + "\n".join(page_text_cache[(q["document_id"], p)] for p in source_pages)
                q_terms = terms(q["raw_question_text"])
                src_terms = terms(source_text)
                overlap = len(q_terms & src_terms) / max(1, len(q_terms))
                # Tiny stems and OCR-only image pages have a noisier direct-text score.
                if len(q_terms) >= 5 and overlap < 0.45:
                    issue("weak_question_match_to_pdf_text", qid, round(overlap, 3))
                for k, o in opts.items():
                    option_terms = terms(o["raw_text"] or "")
                    if len(option_terms) >= 3:
                        option_overlap = len(option_terms & src_terms) / len(option_terms)
                        if option_overlap < 0.40:
                            issue("weak_option_match_to_pdf_text", qid, {"option": k, "overlap": round(option_overlap, 3)})

        meta = meta_map.get(qid)
        if meta:
            if meta["year"] != q["doc_year"] or meta["shift"] != q["doc_shift"]:
                issue("document_metadata_mismatch", qid, {"doc_year": q["doc_year"], "meta_year": meta["year"], "doc_shift": q["doc_shift"], "meta_shift": meta["shift"]})
            if meta["difficulty"] not in (None, "easy", "medium", "hard"):
                issue("invalid_difficulty_label", qid, meta["difficulty"])
            if meta["cognitive_level"] not in (None, "recall", "understand", "apply", "analyze"):
                issue("invalid_cognitive_level", qid, meta["cognitive_level"])
            for confidence_field in ("taxonomy_confidence", "cognitive_level_confidence", "difficulty_confidence"):
                if meta[confidence_field] is not None and not 0 <= meta[confidence_field] <= 1:
                    issue("invalid_metadata_confidence", qid, {confidence_field: meta[confidence_field]})
            if meta["taxonomy_source"] == "AI_INFERRED":
                issue("mislabelled_taxonomy_source", qid, meta["taxonomy_source"])
        records.append({
            "question_id": qid, "exam": "CUET UG", "year": meta["year"] if meta else None,
            "shift": meta["shift"] if meta else None, "subject": meta["subject"] if meta else None,
            "question_number": q["question_number"], "question_text": q["normalized_question_text"],
            "raw_question_text": q["raw_question_text"],
            "options": {k: opts[k]["normalized_text"] for k in "ABCD" if k in opts},
            "raw_options": {k: opts[k]["raw_text"] for k in "ABCD" if k in opts},
            "source": {"filename": q["filename"], "page": q["source_page"], "question_number": q["question_number"]},
            "extraction": {"method": q["extraction_method"], "confidence": q["extraction_confidence"]},
            "answer_key": ({"correct_option": key["correct_option"], "source_type": key["source_type"], "confidence": key["confidence"]} if key else None),
            "validation": {"requires_review": bool(q["requires_review"]), "issues": reasons},
        })

    for pdf in source_cache.values():
        pdf.close()
    conn.close()
    exported = []
    if EXPORT_PATH.exists():
        exported = json.loads(EXPORT_PATH.read_text(encoding="utf-8"))
        exported_ids = [r.get("question_id") for r in exported]
        if len(exported) != len(questions):
            issue("json_export_count_mismatch", "export", {"export": len(exported), "database": len(questions)})
        if len(exported_ids) != len(set(exported_ids)):
            issue("duplicate_ids_in_json_export", "export")
        db_by_id = {q["id"]: q for q in questions}
        export_by_id = {r.get("question_id"): r for r in exported}
        for qid, q in db_by_id.items():
            rec = export_by_id.get(qid)
            if not rec:
                issue("question_missing_from_json_export", qid)
                continue
            if rec.get("question_text") != q["normalized_question_text"]:
                issue("json_question_text_mismatch", qid)
            if rec.get("raw_question_text") != q["raw_question_text"]:
                issue("json_raw_text_mismatch", qid)
            source = rec.get("source", {})
            if source.get("filename") != q["filename"] or source.get("page") != q["source_page"]:
                issue("json_source_reference_mismatch", qid)
            extraction = rec.get("extraction", {})
            if extraction.get("confidence") != q["extraction_confidence"]:
                issue("json_confidence_mismatch", qid)
            exp_opts = rec.get("options", {})
            for key, opt in option_map.get(qid, {}).items():
                if exp_opts.get(key) != opt["normalized_text"]:
                    issue("json_option_mismatch", qid, key)
            key = key_map.get((q["document_id"], q["question_number"]))
            exported_key = (rec.get("answer_key") or {}).get("correct_option")
            if exported_key != (key["correct_option"] if key else None):
                issue("json_answer_key_mismatch", qid, {"export": exported_key, "database": key["correct_option"] if key else None})
    else:
        issue("json_export_missing", "export", str(EXPORT_PATH))
    jsonl_path = EXPORT_PATH.with_suffix(".jsonl")
    if jsonl_path.exists():
        jsonl_ids = [json.loads(line).get("question_id") for line in jsonl_path.read_text(encoding="utf-8").splitlines() if line.strip()]
        if jsonl_ids != [r.get("question_id") for r in exported]:
            issue("jsonl_order_or_content_mismatch", "export")
    else:
        issue("jsonl_export_missing", "export", str(jsonl_path))
    report = {
        "pdf_files_available": len(pdf_paths), "documents_in_db": len(documents),
        "documents_by_status": dict(Counter(d["status"] for d in documents)),
        "questions_exported": len(records), "review_required": sum(bool(q["requires_review"]) for q in questions),
        "answer_keys_present": sum(bool(k["correct_option"]) for k in key_map.values()),
        "source_pdfs_checked": len(source_cache), "issue_counts": dict(issues),
        "issue_examples": {k: v[:20] for k, v in issue_examples.items()},
        "exports": [str(EXPORT_PATH), str(EXPORT_PATH.parent / "cuet_pyq_dataset.jsonl")],
    }
    (EXPORT_PATH.parent / "source_audit_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(json.dumps(report, indent=2))
    return 1 if issues else 0


if __name__ == "__main__":
    sys.exit(main())
