"""
Exporter Module for Stage 1 CUET UG PYQ Ingestion.
Exports extracted dataset to JSON, JSONL, and CSV formats, along with
Ingestion Reports, Review Reports, and Duplicate Analysis Reports.
"""

import os
import csv
import json
from typing import Dict, Any, List
from scripts.pyq_pipeline.db import PYQDatabase

class PYQExporter:
    def __init__(self, db: PYQDatabase, export_dir: str = "data/pyq_exports"):
        self.db = db
        self.export_dir = export_dir
        os.makedirs(self.export_dir, exist_ok=True)

    def export_all(self) -> Dict[str, str]:
        """
        Exports all ingested questions and reports into JSON, JSONL, and CSV.
        """
        conn = self.db.get_connection()

        # Fetch all questions with joined metadata and options
        cur = conn.execute("""
            SELECT q.*, d.filename, d.year, d.shift, d.exam_date, d.time_slot, s.name as subject_name
            FROM questions q
            JOIN documents d ON q.document_id = d.id
            JOIN subjects s ON q.subject_id = s.id
            ORDER BY q.subject_id ASC, q.document_id ASC, q.question_number ASC
        """)
        q_rows = cur.fetchall()

        all_records = []
        for r in q_rows:
            q_id = r["id"]

            # Options
            opt_rows = conn.execute("""
                SELECT option_key, raw_text, normalized_text, is_correct, distractor_reason
                FROM question_options WHERE question_id = ? ORDER BY option_key ASC
            """, (q_id,)).fetchall()
            options = {opt["option_key"]: opt["normalized_text"] for opt in opt_rows}
            raw_options = {opt["option_key"]: opt["raw_text"] for opt in opt_rows}

            # Metadata
            meta_row = conn.execute("SELECT * FROM question_metadata WHERE question_id = ?", (q_id,)).fetchone()
            meta = dict(meta_row) if meta_row else {}

            answer_row = conn.execute("SELECT correct_option, source_type, confidence, raw_data_json FROM answer_keys WHERE document_id = ? AND question_number = ?", (r["document_id"], r["question_number"])).fetchone()

            record = {
                "question_id": q_id,
                "exam": "CUET UG",
                "year": r["year"],
                "shift": r["shift"],
                "subject": r["subject_name"],
                "question_number": r["question_number"],
                "question_text": r["normalized_question_text"],
                "raw_question_text": r["raw_question_text"],
                "options": options,
                "raw_options": raw_options,
                "answer_key": dict(answer_row) if answer_row else {"correct_option": None, "source_type": "none", "confidence": 0.0, "raw_data_json": None},
                "has_image": bool(r["has_image"]),
                "image_path": r["image_path"],
                "image_description": r["image_description"],
                "has_table": bool(r["has_table"]),
                "table_data": json.loads(r["table_data_json"]) if r["table_data_json"] else None,
                "chapter": meta.get("chapter"),
                "topic": meta.get("topic"),
                "subtopic": meta.get("subtopic"),
                "concept": meta.get("concept"),
                "taxonomy_source": meta.get("taxonomy_source"),
                "taxonomy_confidence": meta.get("taxonomy_confidence"),
                "question_type": meta.get("question_type"),
                "difficulty": meta.get("difficulty"),
                "cognitive_level": meta.get("cognitive_level"),
                "requires_calculation": bool(meta.get("requires_calculation")),
                "requires_reading": bool(meta.get("requires_reading")),
                "requires_diagram": bool(meta.get("requires_diagram")),
                "requires_table": bool(meta.get("requires_table")),
                "source": {
                    "filename": r["filename"],
                    "page": r["source_page"],
                    "question_number": r["question_number"]
                },
                "extraction": {
                    "method": r["extraction_method"],
                    "confidence": r["extraction_confidence"]
                },
                "validation": {
                    "requires_review": bool(r["requires_review"]),
                    "issues": json.loads(r["review_reasons_json"]) if r["review_reasons_json"] else []
                },
                "duplicate_info": {
                    "group_id": r["duplicate_group_id"],
                    "status": r["duplicate_status"]
                }
            }
            all_records.append(record)

        # 1. JSON Export
        json_path = os.path.join(self.export_dir, "cuet_pyq_dataset.json")
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(all_records, f, indent=2, ensure_ascii=False)

        # 2. JSONL Export
        jsonl_path = os.path.join(self.export_dir, "cuet_pyq_dataset.jsonl")
        with open(jsonl_path, "w", encoding="utf-8") as f:
            for rec in all_records:
                f.write(json.dumps(rec, ensure_ascii=False) + "\n")

        # 3. CSV Export
        csv_path = os.path.join(self.export_dir, "cuet_pyq_dataset.csv")
        with open(csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "question_id", "subject", "year", "shift", "question_number",
                "question_text", "option_A", "option_B", "option_C", "option_D",
                "question_type", "difficulty", "cognitive_level", "chapter", "topic",
                "has_image", "has_table", "extraction_confidence", "requires_review",
                "source_filename", "source_page"
            ])
            for rec in all_records:
                writer.writerow([
                    rec["question_id"],
                    rec["subject"],
                    rec["year"],
                    rec["shift"],
                    rec["question_number"],
                    rec["question_text"],
                    rec["options"].get("A", ""),
                    rec["options"].get("B", ""),
                    rec["options"].get("C", ""),
                    rec["options"].get("D", ""),
                    rec["question_type"],
                    rec["difficulty"],
                    rec["cognitive_level"],
                    rec["chapter"],
                    rec["topic"],
                    rec["has_image"],
                    rec["has_table"],
                    rec["extraction"]["confidence"],
                    rec["validation"]["requires_review"],
                    rec["source"]["filename"],
                    rec["source"]["page"]
                ])

        # 4. Ingestion Report
        summary = self.db.get_ingestion_summary()
        report_path = os.path.join(self.export_dir, "ingestion_report.json")
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2)

        # 5. Review Report
        review_rows = conn.execute("""
            SELECT q.id, q.document_id, q.question_number, q.requires_review, q.review_reasons_json,
                   d.filename, s.name as subject_name
            FROM questions q
            JOIN documents d ON q.document_id = d.id
            JOIN subjects s ON q.subject_id = s.id
            WHERE q.requires_review = 1
        """).fetchall()
        review_records = [dict(r) for r in review_rows]
        rev_report_path = os.path.join(self.export_dir, "review_report.json")
        with open(rev_report_path, "w", encoding="utf-8") as f:
            json.dump(review_records, f, indent=2)

        conn.close()

        return {
            "json": json_path,
            "jsonl": jsonl_path,
            "csv": csv_path,
            "ingestion_report": report_path,
            "review_report": rev_report_path
        }
