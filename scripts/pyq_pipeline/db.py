"""
Database Manager for Stage 1 CUET UG PYQ Ingestion.
Provides thread-safe access, transaction helpers, and CRUD operations.
"""

import os
import json
import sqlite3
from typing import Dict, Any, List, Optional, Tuple
from scripts.pyq_pipeline.schema import SCHEMA_SQL

DEFAULT_DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "cuet_pyq_master.db")

class PYQDatabase:
    def __init__(self, db_path: str = DEFAULT_DB_PATH):
        self.db_path = db_path
        os.makedirs(os.path.dirname(os.path.abspath(self.db_path)), exist_ok=True)
        self.init_db()

    def get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON;")
        conn.execute("PRAGMA journal_mode = WAL;")
        return conn

    def init_db(self):
        with self.get_connection() as conn:
            conn.executescript(SCHEMA_SQL)
            conn.commit()

    # ==========================================
    # Subject Operations
    # ==========================================
    def upsert_subject(self, subject_id: str, name: str, code: str = None, stream: str = None, slug: str = None):
        if not slug:
            slug = subject_id.replace("_", "-")
        with self.get_connection() as conn:
            conn.execute("""
                INSERT INTO subjects (id, code, name, stream, slug)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name=excluded.name,
                    code=COALESCE(excluded.code, subjects.code),
                    stream=COALESCE(excluded.stream, subjects.stream),
                    slug=excluded.slug;
            """, (subject_id, code, name, stream, slug))
            conn.commit()

    # ==========================================
    # Document Operations
    # ==========================================
    def upsert_document(self, doc: Dict[str, Any]):
        with self.get_connection() as conn:
            conn.execute("""
                INSERT INTO documents (
                    id, filename, filepath, subject_id, year, shift,
                    exam_date, time_slot, page_count, file_size_bytes,
                    md5_hash, layout_type, status, metadata_json,
                    has_conflict, conflict_notes, updated_at
                ) VALUES (
                    ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?, CURRENT_TIMESTAMP
                )
                ON CONFLICT(id) DO UPDATE SET
                    filename=excluded.filename,
                    filepath=excluded.filepath,
                    subject_id=excluded.subject_id,
                    year=excluded.year,
                    shift=excluded.shift,
                    exam_date=excluded.exam_date,
                    time_slot=excluded.time_slot,
                    page_count=excluded.page_count,
                    file_size_bytes=excluded.file_size_bytes,
                    md5_hash=excluded.md5_hash,
                    layout_type=excluded.layout_type,
                    status=excluded.status,
                    metadata_json=excluded.metadata_json,
                    has_conflict=excluded.has_conflict,
                    conflict_notes=excluded.conflict_notes,
                    updated_at=CURRENT_TIMESTAMP;
            """, (
                doc["id"], doc["filename"], doc["filepath"], doc["subject_id"],
                doc.get("year"), doc.get("shift"), doc.get("exam_date"), doc.get("time_slot"),
                doc.get("page_count", 0), doc.get("file_size_bytes", 0),
                doc.get("md5_hash"), doc.get("layout_type", "standard_cbt"),
                doc.get("status", "pending"),
                json.dumps(doc.get("metadata_json", {})) if isinstance(doc.get("metadata_json"), (dict, list)) else doc.get("metadata_json"),
                doc.get("has_conflict", 0), doc.get("conflict_notes")
            ))
            conn.commit()

    def get_document(self, doc_id: str) -> Optional[Dict[str, Any]]:
        with self.get_connection() as conn:
            cur = conn.execute("SELECT * FROM documents WHERE id = ?", (doc_id,))
            row = cur.fetchone()
            return dict(row) if row else None

    def upsert_answer_key(self, document_id: str, question_number: int, answer: Optional[str], source_type: str, confidence: float, raw_data: Dict[str, Any]):
        with self.get_connection() as conn:
            conn.execute("""INSERT INTO answer_keys (id, document_id, question_number, correct_option, source_type, confidence, raw_data_json)
                VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(document_id, question_number) DO UPDATE SET
                correct_option=excluded.correct_option, source_type=excluded.source_type,
                confidence=excluded.confidence, raw_data_json=excluded.raw_data_json
                WHERE answer_keys.source_type != 'verified_manual'""",
                (f"ANS_{document_id}_{question_number}", document_id, question_number, answer, source_type, confidence, json.dumps(raw_data)))
            conn.commit()

    def get_answer_key(self, document_id: str, question_number: int) -> Optional[Dict[str, Any]]:
        with self.get_connection() as conn:
            row = conn.execute("SELECT * FROM answer_keys WHERE document_id=? AND question_number=?", (document_id, question_number)).fetchone()
            return dict(row) if row else None

    def upsert_duplicate_link(self, question_id: str, duplicate_of_id: str, group_id: str, similarity: float, duplicate_type: str):
        with self.get_connection() as conn:
            conn.execute("""INSERT INTO question_duplicates (id, question_id, duplicate_of_id, duplicate_group_id, similarity_score, duplicate_type)
                VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET similarity_score=excluded.similarity_score,
                duplicate_group_id=excluded.duplicate_group_id, duplicate_type=excluded.duplicate_type""",
                (f"DUP_{question_id}", question_id, duplicate_of_id, group_id, similarity, duplicate_type))
            conn.commit()

    def clear_duplicate_link(self, question_id: str):
        with self.get_connection() as conn:
            conn.execute("DELETE FROM question_duplicates WHERE question_id = ?", (question_id,))
            conn.commit()

    # ==========================================
    # Page Operations
    # ==========================================
    def upsert_page(self, page_data: Dict[str, Any]):
        with self.get_connection() as conn:
            conn.execute("""
                INSERT INTO pages (
                    id, document_id, page_number, raw_text, ocr_text,
                    has_images, image_count, page_image_path, extraction_method,
                    quality_score, status, error_message
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(document_id, page_number) DO UPDATE SET
                    raw_text=excluded.raw_text,
                    ocr_text=excluded.ocr_text,
                    has_images=excluded.has_images,
                    image_count=excluded.image_count,
                    page_image_path=excluded.page_image_path,
                    extraction_method=excluded.extraction_method,
                    quality_score=excluded.quality_score,
                    status=excluded.status,
                    error_message=excluded.error_message;
            """, (
                page_data["id"], page_data["document_id"], page_data["page_number"],
                page_data.get("raw_text", ""), page_data.get("ocr_text", ""),
                page_data.get("has_images", 0), page_data.get("image_count", 0),
                page_data.get("page_image_path"), page_data.get("extraction_method", "pdf_text"),
                page_data.get("quality_score", 1.0), page_data.get("status", "extracted"),
                page_data.get("error_message")
            ))
            conn.commit()

    # ==========================================
    # Question Operations
    # ==========================================
    def upsert_question_record(
        self,
        question: Dict[str, Any],
        options: Dict[str, Dict[str, Any]],
        metadata: Dict[str, Any],
        review_reasons: List[str] = None
    ):
        with self.get_connection() as conn:
            # 1. Insert/Update question
            table_json = json.dumps(question.get("table_data")) if question.get("table_data") else None
            pages_json = json.dumps(question.get("source_pages", [question.get("source_page", 1)]))
            reasons_json = json.dumps(review_reasons or [])

            conn.execute("""
                INSERT INTO questions (
                    id, document_id, subject_id, question_number,
                    raw_question_text, normalized_question_text,
                    has_image, image_path, image_description,
                    has_table, table_data_json, source_page, source_pages_json,
                    extraction_method, extraction_confidence, text_hash,
                    semantic_fingerprint, duplicate_group_id, duplicate_status,
                    requires_review, review_reasons_json, updated_at
                ) VALUES (
                    ?, ?, ?, ?,
                    ?, ?,
                    ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?, ?,
                    ?, ?, ?,
                    ?, ?, CURRENT_TIMESTAMP
                )
                ON CONFLICT(document_id, question_number) DO UPDATE SET
                    raw_question_text=excluded.raw_question_text,
                    normalized_question_text=excluded.normalized_question_text,
                    has_image=excluded.has_image,
                    image_path=excluded.image_path,
                    image_description=excluded.image_description,
                    has_table=excluded.has_table,
                    table_data_json=excluded.table_data_json,
                    source_page=excluded.source_page,
                    source_pages_json=excluded.source_pages_json,
                    extraction_method=excluded.extraction_method,
                    extraction_confidence=excluded.extraction_confidence,
                    text_hash=excluded.text_hash,
                    semantic_fingerprint=excluded.semantic_fingerprint,
                    duplicate_group_id=excluded.duplicate_group_id,
                    duplicate_status=excluded.duplicate_status,
                    requires_review=excluded.requires_review,
                    review_reasons_json=excluded.review_reasons_json,
                    updated_at=CURRENT_TIMESTAMP;
            """, (
                question["id"], question["document_id"], question["subject_id"], question["question_number"],
                question.get("raw_question_text", ""), question.get("normalized_question_text", ""),
                question.get("has_image", 0), question.get("image_path"), question.get("image_description"),
                question.get("has_table", 0), table_json, question.get("source_page", 1), pages_json,
                question.get("extraction_method", "direct_text"), question.get("extraction_confidence", 0.0),
                question.get("text_hash", ""), question.get("semantic_fingerprint", ""),
                question.get("duplicate_group_id"), question.get("duplicate_status", "unique"),
                1 if review_reasons else question.get("requires_review", 0),
                reasons_json
            ))

            # 2. Options
            for opt_key, opt_data in options.items():
                opt_id = f"{question['id']}_{opt_key}"
                conn.execute("""
                    INSERT INTO question_options (
                        id, question_id, option_key, raw_text, normalized_text,
                        is_correct, distractor_reason
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(question_id, option_key) DO UPDATE SET
                        raw_text=excluded.raw_text,
                        normalized_text=excluded.normalized_text,
                        is_correct=excluded.is_correct,
                        distractor_reason=excluded.distractor_reason;
                """, (
                    opt_id, question["id"], opt_key,
                    opt_data.get("raw_text", ""), opt_data.get("normalized_text", ""),
                    opt_data.get("is_correct", 0), opt_data.get("distractor_reason")
                ))

            # 3. Question Metadata
            dna_json = json.dumps(metadata.get("question_dna", {}))
            verif_json = json.dumps(metadata.get("answer_verification", {}))

            conn.execute("""
                INSERT INTO question_metadata (
                    id, question_id, exam, year, shift, subject,
                    chapter, topic, subtopic, concept, taxonomy_source, taxonomy_confidence,
                    question_type, cognitive_level, cognitive_level_confidence,
                    difficulty, difficulty_confidence,
                    requires_calculation, requires_reading, requires_diagram, requires_table,
                    question_dna_json, answer_verification_json
                ) VALUES (
                    ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?,
                    ?, ?, ?,
                    ?, ?,
                    ?, ?, ?, ?,
                    ?, ?
                )
                ON CONFLICT(question_id) DO UPDATE SET
                    year=excluded.year,
                    shift=excluded.shift,
                    subject=excluded.subject,
                    chapter=excluded.chapter,
                    topic=excluded.topic,
                    subtopic=excluded.subtopic,
                    concept=excluded.concept,
                    taxonomy_source=excluded.taxonomy_source,
                    taxonomy_confidence=excluded.taxonomy_confidence,
                    question_type=excluded.question_type,
                    cognitive_level=excluded.cognitive_level,
                    cognitive_level_confidence=excluded.cognitive_level_confidence,
                    difficulty=excluded.difficulty,
                    difficulty_confidence=excluded.difficulty_confidence,
                    requires_calculation=excluded.requires_calculation,
                    requires_reading=excluded.requires_reading,
                    requires_diagram=excluded.requires_diagram,
                    requires_table=excluded.requires_table,
                    question_dna_json=excluded.question_dna_json,
                    answer_verification_json=excluded.answer_verification_json;
            """, (
                f"META_{question['id']}", question["id"],
                metadata.get("exam", "CUET UG"), metadata.get("year"), metadata.get("shift"),
                metadata.get("subject", question["subject_id"]),
                metadata.get("chapter"), metadata.get("topic"), metadata.get("subtopic"), metadata.get("concept"),
                metadata.get("taxonomy_source", "AI_INFERRED"), metadata.get("taxonomy_confidence", 0.0),
                metadata.get("question_type"), metadata.get("cognitive_level"), metadata.get("cognitive_level_confidence", 0.0),
                metadata.get("difficulty"), metadata.get("difficulty_confidence", 0.0),
                metadata.get("requires_calculation", 0), metadata.get("requires_reading", 0),
                metadata.get("requires_diagram", 0), metadata.get("requires_table", 0),
                dna_json, verif_json
            ))

            # 4. Review Queue if required
            conn.execute("DELETE FROM review_queue WHERE question_id = ? AND status = 'pending'", (question["id"],))
            if review_reasons:
                for r in review_reasons:
                    rev_id = f"REV_{question['id']}_{hash(r) % 1000000}"
                    conn.execute("""
                        INSERT OR IGNORE INTO review_queue (id, question_id, reason, status)
                        VALUES (?, ?, ?, 'pending');
                    """, (rev_id, question["id"], r))

            conn.commit()

    # ==========================================
    # Review Queue & Auditing Operations
    # ==========================================
    def update_question_review_status(
        self,
        question_id: str,
        status: str,
        notes: str = None,
        assigned_to: str = None
    ):
        with self.get_connection() as conn:
            conn.execute("""
                UPDATE review_queue
                SET status = ?, notes = COALESCE(?, notes), assigned_to = COALESCE(?, assigned_to), resolved_at = CURRENT_TIMESTAMP
                WHERE question_id = ?;
            """, (status, notes, assigned_to, question_id))

            if status == "approved":
                conn.execute("UPDATE questions SET requires_review = 0 WHERE id = ?", (question_id,))
            elif status == "flagged":
                conn.execute("UPDATE questions SET requires_review = 1 WHERE id = ?", (question_id,))
            conn.commit()

    # ==========================================
    # Analytics & Aggregates
    # ==========================================
    def get_ingestion_summary(self) -> Dict[str, Any]:
        with self.get_connection() as conn:
            docs_count = conn.execute("SELECT COUNT(*) FROM documents").fetchone()[0]
            pages_count = conn.execute("SELECT COUNT(*) FROM pages").fetchone()[0]
            questions_count = conn.execute("SELECT COUNT(*) FROM questions").fetchone()[0]
            validated_count = conn.execute("SELECT COUNT(*) FROM questions WHERE requires_review = 0").fetchone()[0]
            review_count = conn.execute("SELECT COUNT(*) FROM questions WHERE requires_review = 1").fetchone()[0]
            duplicates_count = conn.execute("SELECT COUNT(*) FROM questions WHERE duplicate_status = 'duplicate'").fetchone()[0]
            avg_conf_row = conn.execute("SELECT AVG(extraction_confidence) FROM questions").fetchone()[0]
            avg_conf = round((avg_conf_row or 0.0) * 100, 1)

            # Subject breakdown
            sub_rows = conn.execute("""
                SELECT s.id, s.name, COUNT(DISTINCT d.id) as doc_count, COUNT(q.id) as question_count
                FROM subjects s
                LEFT JOIN documents d ON d.subject_id = s.id
                LEFT JOIN questions q ON q.document_id = d.id
                GROUP BY s.id, s.name
                ORDER BY s.name ASC;
            """).fetchall()

            subjects_stat = [dict(r) for r in sub_rows]

            return {
                "total_documents": docs_count,
                "total_pages": pages_count,
                "total_questions": questions_count,
                "validated_questions": validated_count,
                "needs_review": review_count,
                "duplicates": duplicates_count,
                "average_confidence": avg_conf,
                "subjects": subjects_stat
            }

    def get_question_detail(self, question_id: str) -> Optional[Dict[str, Any]]:
        with self.get_connection() as conn:
            q_row = conn.execute("""
                SELECT q.*, d.filename, d.year, d.shift, d.exam_date, d.time_slot, s.name as subject_name
                FROM questions q
                JOIN documents d ON q.document_id = d.id
                JOIN subjects s ON q.subject_id = s.id
                WHERE q.id = ?
            """, (question_id,)).fetchone()

            if not q_row:
                return None

            q_data = dict(q_row)

            # Get Options
            opt_rows = conn.execute("""
                SELECT option_key, raw_text, normalized_text, is_correct, distractor_reason
                FROM question_options
                WHERE question_id = ?
                ORDER BY option_key ASC
            """, (question_id,)).fetchall()

            q_data["options"] = {r["option_key"]: dict(r) for r in opt_rows}

            # Get Metadata
            meta_row = conn.execute("SELECT * FROM question_metadata WHERE question_id = ?", (question_id,)).fetchone()
            q_data["metadata"] = dict(meta_row) if meta_row else {}

            # Get Review items
            rev_rows = conn.execute("SELECT * FROM review_queue WHERE question_id = ?", (question_id,)).fetchall()
            q_data["review_items"] = [dict(r) for r in rev_rows]

            # Get source page image path
            page_row = conn.execute("SELECT page_image_path FROM pages WHERE document_id = ? AND page_number = ?",
                                   (q_data["document_id"], q_data["source_page"])).fetchone()
            q_data["source_page_image"] = page_row["page_image_path"] if page_row else None

            return q_data
