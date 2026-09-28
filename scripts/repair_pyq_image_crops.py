"""Relink question image crops to their actual source-page question regions."""
import json
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.pyq_pipeline.boundary_detector import BoundaryDetector
from scripts.pyq_pipeline.db import PYQDatabase
from scripts.pyq_pipeline.page_extractor import PageExtractor
from scripts.pyq_pipeline.question_reconstructor import QuestionReconstructor


def main():
    db = PYQDatabase()
    conn = db.get_connection()
    docs = conn.execute("""SELECT DISTINCT d.id,d.filepath FROM documents d
        JOIN pages p ON p.document_id=d.id WHERE p.has_images=1 ORDER BY d.id""").fetchall()
    page_extractor = PageExtractor()
    reconstructor = QuestionReconstructor()
    detector = BoundaryDetector()
    update = conn.cursor()
    fixed = cleared = missing = 0

    for doc_row in docs:
        doc_id, filepath = doc_row["id"], Path(doc_row["filepath"])
        if not filepath.exists():
            missing += 1
            continue
        candidate_pages = {r[0] for r in conn.execute("SELECT page_number FROM pages WHERE document_id=? AND has_images=1", (doc_id,))}
        candidate_pages.update(r[0] for r in conn.execute("SELECT source_page FROM questions WHERE document_id=? AND has_image=1", (doc_id,)))
        questions = conn.execute("SELECT * FROM questions WHERE document_id=? AND (source_page IN (%s) OR has_image=1)" % ",".join("?" * max(1, len(candidate_pages))), (doc_id, *sorted(candidate_pages))).fetchall() if candidate_pages else []
        page_numbers = sorted(candidate_pages)
        try:
            with fitz.open(filepath) as pdf:
                page_data = [page_extractor.extract_page(pdf, p - 1, doc_id, render_images=True) for p in page_numbers if 1 <= p <= len(pdf)]
        except Exception:
            missing += 1
            continue
        segments = detector.detect_question_segments_in_doc(page_data)
        segment_map = {(s["question_number"], s["source_page"]): s for s in segments}

        for q in questions:
            segment = segment_map.get((q["question_number"], q["source_page"]))
            has_image = False
            image_path = image_description = None
            if segment:
                has_image, image_path, image_description = reconstructor.extract_and_save_question_image(
                    doc_id, q["question_number"], segment.get("page_datas", []),
                    q["raw_question_text"] or "", source_page=q["source_page"], bbox_y=segment.get("bbox_y")
                )
            update.execute("UPDATE questions SET has_image=?, image_path=?, image_description=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
                           (1 if has_image else 0, image_path, image_description, q["id"]))
            metadata_row = conn.execute("SELECT question_dna_json FROM question_metadata WHERE question_id=?", (q["id"],)).fetchone()
            if metadata_row:
                dna = json.loads(metadata_row["question_dna_json"] or "{}")
                visual_cue = any(cue in (q["raw_question_text"] or "").lower() for cue in ("diagram", "circuit", "figure", "graph", "shown below", "given below", "plotted"))
                needs_diagram = bool(has_image or visual_cue)
                dna["has_visual_dependency"] = needs_diagram
                conn.execute("UPDATE question_metadata SET requires_diagram=?,question_dna_json=? WHERE question_id=?",
                             (1 if needs_diagram else 0, json.dumps(dna), q["id"]))
            if has_image:
                fixed += 1
            else:
                cleared += 1
        conn.commit()
        print(f"Repaired {doc_id}: {len(questions)} image references")

    conn.close()
    print(json.dumps({"documents_checked": len(docs), "crops_fixed": fixed, "false_image_links_cleared": cleared, "missing_source_documents": missing}, indent=2))


if __name__ == "__main__":
    main()
