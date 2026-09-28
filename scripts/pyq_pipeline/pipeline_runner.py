"""
Pipeline Runner Module for Stage 1 CUET UG PYQ Ingestion.
Orchestrates end-to-end ingestion across all 251 CUET UG PYQ PDFs,
supporting resumable processing, error logging, and high-fidelity output.
"""

import os
import sys
import glob
import fitz
import json
import re
import logging
from typing import Dict, Any, List, Optional

from scripts.pyq_pipeline.db import PYQDatabase
from scripts.pyq_pipeline.pdf_identifier import PDFIdentifier, SUBJECT_MAPPINGS
from scripts.pyq_pipeline.page_extractor import PageExtractor
from scripts.pyq_pipeline.ocr_engine import OCREngine
from scripts.pyq_pipeline.boundary_detector import BoundaryDetector
from scripts.pyq_pipeline.question_reconstructor import QuestionReconstructor
from scripts.pyq_pipeline.answer_extractor import AnswerExtractor
from scripts.pyq_pipeline.classifier import QuestionClassifier
from scripts.pyq_pipeline.duplicate_detector import DuplicateDetector
from scripts.pyq_pipeline.validator import QuestionValidator
from scripts.pyq_pipeline.exporter import PYQExporter

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("pyq_ingestion.log", mode="a", encoding="utf-8")
    ]
)
logger = logging.getLogger("PYQPipeline")

class PYQPipelineRunner:
    def __init__(self, db_path: Optional[str] = None):
        self.db = PYQDatabase(db_path) if db_path else PYQDatabase()
        self.identifier = PDFIdentifier()
        self.page_extractor = PageExtractor()
        self.ocr_engine = OCREngine()
        self.boundary_detector = BoundaryDetector()
        self.reconstructor = QuestionReconstructor()
        self.answer_extractor = AnswerExtractor()
        self.classifier = QuestionClassifier()
        self.duplicate_detector = DuplicateDetector()
        self.validator = QuestionValidator()
        self.exporter = PYQExporter(self.db)

        # Seed subjects in DB
        self._init_subjects()
        with self.db.get_connection() as conn:
            existing = [dict(row) for row in conn.execute("SELECT id, normalized_question_text, duplicate_group_id FROM questions")]
        self.duplicate_detector.seed_existing(existing)

    def _init_subjects(self):
        for s_id, s_info in SUBJECT_MAPPINGS.items():
            self.db.upsert_subject(s_id, s_info["name"], s_info["code"], s_info["stream"])

    def process_pdf(self, pdf_path: str, parent_subject: Optional[str] = None, force_reprocess: bool = False) -> Dict[str, Any]:
        """
        Executes the 12-stage extraction pipeline on a single PDF document.
        Resumable: if already completed, skips unless force_reprocess is True.
        """
        if not os.path.exists(pdf_path):
            logger.error(f"File not found: {pdf_path}")
            return {"status": "error", "error": f"File not found: {pdf_path}"}

        # Stage 1: Identification
        doc_info = self.identifier.identify_pdf(pdf_path, parent_subject)
        doc_id = doc_info["id"]

        # Resumption Check
        existing_doc = self.db.get_document(doc_id)
        if existing_doc and existing_doc["status"] == "completed" and not force_reprocess:
            logger.info(f"Skipping already completed document: {doc_info['filename']}")
            return {"status": "skipped", "doc_id": doc_id, "filename": doc_info["filename"]}

        logger.info(f"Processing PDF: {doc_info['filename']} ({doc_info['subject_name']})")
        doc_info["status"] = "processing"
        self.db.upsert_document(doc_info)

        doc = fitz.open(pdf_path)
        extracted_pages = []
        full_doc_text = ""

        try:
            # Stage 2 & 3: Page Extraction & Quality Inspection
            for page_idx in range(len(doc)):
                page_data = self.page_extractor.extract_page(doc, page_idx, doc_id, render_images=True)
                # If low quality or missing text, run OCR fallback
                if page_data["quality_score"] < 0.50 and page_data.get("page_image_full_path"):
                    ocr_res = self.ocr_engine.ocr_page_image(page_data["page_image_full_path"])
                    if ocr_res.get("text"):
                        page_data["ocr_text"] = ocr_res["text"]
                        page_data["extraction_method"] = "ocr_fallback"
                        page_data["quality_score"] = ocr_res["confidence"]

                full_doc_text += (page_data.get("ocr_text") or page_data["raw_text"]) + "\n"

                # Save page record in DB
                self.db.upsert_page(page_data)
                extracted_pages.append(page_data)

            # GAT papers frequently place complete question blocks in raster
            # figures while leaving only Q markers and the CBT option footer
            # in the PDF text layer. OCR those pages as a document-level
            # fallback when it recovers more numbered question markers.
            if doc_info["subject_id"] == "general_aptitude_test":
                marker_re = re.compile(r"(?im)^\s*(?:Q\.?\s*|Question\s*)(\d{1,3})\b")
                for page_data in extracted_pages:
                    current_text = page_data.get("ocr_text") or page_data.get("raw_text", "")
                    current_markers = set(marker_re.findall(current_text))
                    page_img = page_data.get("page_image_full_path")
                    if not page_img or not os.path.exists(page_img):
                        continue
                    ocr_result = self.ocr_engine.ocr_page_image(page_img)
                    ocr_text = ocr_result.get("text", "")
                    ocr_markers = set(marker_re.findall(ocr_text))
                    if ocr_text and len(ocr_markers) > len(current_markers):
                        page_data["ocr_text"] = ocr_text
                        page_data["extraction_method"] = "ocr_fallback"
                        page_data["quality_score"] = ocr_result.get("confidence", 0.0)
                        self.db.upsert_page(page_data)

                full_doc_text = "\n".join(
                    page.get("ocr_text") or page.get("raw_text", "")
                    for page in extracted_pages
                )

            # Stage 4: Answer Key Detection
            answer_map = self.answer_extractor.extract_answers_from_doc(full_doc_text)

            # Stage 5: Question Boundary Detection
            question_segments = self.boundary_detector.detect_question_segments_in_doc(extracted_pages)
            logger.info(f"Detected {len(question_segments)} raw questions in {doc_info['filename']}")
            source_question_numbers = set()
            for page_data in extracted_pages:
                source_text = page_data.get("ocr_text") or page_data.get("raw_text", "")
                source_question_numbers.update(int(n) for n in re.findall(r"(?im)^\s*(?:Q\.?\s*|Question\s*)(\d{1,3})\b", source_text))
            detected_question_numbers = {segment["question_number"] for segment in question_segments}
            missing_source_questions = sorted(source_question_numbers - detected_question_numbers)
            missing_sequence_questions = sorted(
                set(range(1, max(detected_question_numbers, default=0) + 1))
                - detected_question_numbers
            )
            if missing_source_questions:
                logger.warning(f"Question markers not reconstructed in {doc_info['filename']}: {missing_source_questions}")
            if missing_sequence_questions:
                logger.warning(f"Question number gaps in {doc_info['filename']}: {missing_sequence_questions}")

            # Stage 6 to 11: Reconstruction, Classification, Validation, Storage
            extracted_count = 0
            for q_seg in question_segments:
                q_num = q_seg["question_number"]
                targeted_ocr_confidence = None
                source_answer = answer_map.get(q_num)
                existing_answer = self.db.get_answer_key(doc_id, q_num)
                if existing_answer and existing_answer.get("source_type") == "verified_manual":
                    source_answer = existing_answer.get("correct_option")
                answer_source = "official_key" if answer_map.get(q_num) else "verified_manual" if source_answer else "none"
                self.db.upsert_answer_key(
                    doc_id, q_num, source_answer,
                    answer_source,
                    1.0 if source_answer else 0.0,
                    {"detected_in_document": bool(source_answer)}
                )

                # Initial reconstruction
                reconstructed = self.reconstructor.reconstruct(
                    doc_id=doc_id,
                    subject_id=doc_info["subject_id"],
                    q_item=q_seg,
                    ocr_fallback_text=None
                )

                # OCR only suspect question regions: incomplete options, visibly
                # corrupted characters, or a figure overlapping the question.
                source_page_item = extracted_pages[q_seg["source_page"] - 1] if q_seg["source_page"] <= len(extracted_pages) else None
                suspect_chars = len(re.findall(r"[^\w\s.,;:?!()$%+\-=/'\"°μΩλθαβγπεσρΔ²³⁴⁵⁶⁷⁸⁹⁰±×÷≤≥≠≈√∫∑]", reconstructed["raw_question_text"]))
                corruption_ratio = suspect_chars / max(1, len(reconstructed["raw_question_text"]))
                option_count = sum(bool(reconstructed["options"].get(k, {}).get("raw_text", "").strip()) for k in "ABCD")
                y0, y1 = q_seg.get("bbox_y", (0, 842))
                page_rect = source_page_item.get("page_rect", [0, 0, 595, 842]) if source_page_item else [0, 0, 595, 842]
                page_area = max(1, page_rect[2] * page_rect[3])
                visual_overlap = bool(source_page_item and any(
                    box["bbox"][1] < y1 and box["bbox"][3] > y0
                    and ((box["bbox"][2] - box["bbox"][0]) * (box["bbox"][3] - box["bbox"][1])) / page_area < 0.7
                    for box in source_page_item.get("image_boxes", [])
                ))
                has_local_bbox = True
                needs_targeted_ocr = visual_overlap or corruption_ratio > 0.08 or len(reconstructed["raw_question_text"].strip()) < 20 or option_count < 4
                if needs_targeted_ocr and source_page_item:
                    page_img_path = source_page_item.get("page_image_full_path")
                    if page_img_path and os.path.exists(page_img_path):
                        try:
                            from PIL import Image
                            with Image.open(page_img_path) as p_img:
                                page_height = (source_page_item.get("page_rect") or [0, 0, 595, 842])[3]
                                scale_y = p_img.height / max(1.0, float(page_height))
                                px_box = (0, max(0, int(y0 * scale_y) - 10), p_img.width, min(p_img.height, int(y1 * scale_y) + 10))
                                ocr_crop_res = self.ocr_engine.ocr_page_image(page_img_path, bbox=px_box)
                            if ocr_crop_res.get("text") and len(ocr_crop_res["text"].strip()) > 15:
                                ocr_q_item = {**q_seg, "full_raw_text": ocr_crop_res["text"]}
                                ocr_candidate = self.reconstructor.reconstruct(
                                    doc_id=doc_id, subject_id=doc_info["subject_id"],
                                    q_item=ocr_q_item, ocr_fallback_text=ocr_crop_res["text"]
                                )
                                ocr_option_count = sum(bool(ocr_candidate["options"].get(k, {}).get("raw_text", "").strip()) for k in "ABCD")
                                if ocr_option_count > option_count or (not reconstructed["raw_question_text"].strip() and ocr_candidate["raw_question_text"].strip()) or (len(ocr_candidate["raw_question_text"].strip()) > len(reconstructed["raw_question_text"].strip()) + 15):
                                    reconstructed = ocr_candidate
                                    reconstructed["extraction_method"] = "targeted_ocr"
                                    targeted_ocr_confidence = float(ocr_crop_res.get("confidence", 0.0))
                        except Exception as ocr_error:
                            logger.warning(f"Targeted OCR failed for {doc_info['filename']} Q{q_num}: {ocr_error}")

                # Classification & Taxonomy
                classification = self.classifier.analyze(
                    subject_id=doc_info["subject_id"],
                    question_text=reconstructed["normalized_question_text"],
                    options=reconstructed["options"],
                    has_image=bool(reconstructed["has_image"]),
                    has_table=bool(reconstructed["has_table"])
                )

                # Combine metadata
                meta = {
                    "exam": "CUET UG",
                    "year": doc_info["year"],
                    "shift": doc_info["shift"],
                    "subject": doc_info["subject_name"],
                    **classification,
                    "answer_verification": self.answer_extractor.get_answer_verification_payload(q_num, answer_map.get(q_num))
                }

                # Duplicate Detection
                dup_status, dup_group, dup_of, sim_score = self.duplicate_detector.check_duplicate(
                    reconstructed["id"],
                    reconstructed["normalized_question_text"]
                )
                reconstructed["duplicate_status"] = dup_status
                reconstructed["duplicate_group_id"] = dup_group
                reconstructed["text_hash"] = self.duplicate_detector.compute_text_hash(reconstructed["normalized_question_text"])
                reconstructed["semantic_fingerprint"] = self.duplicate_detector.compute_semantic_fingerprint(reconstructed["normalized_question_text"])
                source_quality = [float(p.get("quality_score", 0)) for p in q_seg.get("page_datas", [])]
                if targeted_ocr_confidence is not None:
                    source_quality.append(targeted_ocr_confidence)
                reconstructed["source_page_quality"] = min(source_quality) if source_quality else 0.0

                # Quality Validation (13 Checks)
                confidence, issues, requires_review = self.validator.validate_question(
                    reconstructed,
                    reconstructed["options"],
                    meta,
                    source_answer=answer_map.get(q_num)
                )
                reconstructed["extraction_confidence"] = confidence
                reconstructed["requires_review"] = 1 if requires_review else 0

                # Mark verified answer option if found
                correct_opt = source_answer
                if correct_opt and correct_opt in reconstructed["options"]:
                    reconstructed["options"][correct_opt]["is_correct"] = 1

                # Save complete question record
                self.db.upsert_question_record(
                    question=reconstructed,
                    options=reconstructed["options"],
                    metadata=meta,
                    review_reasons=issues if requires_review else None
                )
                self.db.clear_duplicate_link(reconstructed["id"])
                if dup_of:
                    self.db.upsert_duplicate_link(
                        reconstructed["id"], dup_of, dup_group or "",
                        sim_score, "exact" if dup_status == "duplicate" else "near"
                    )
                extracted_count += 1

            # A document with no recovered questions was not successfully
            # ingested. Keep it visible as partial so the batch can be retried.
            doc_info["status"] = "completed" if extracted_count > 0 and not missing_source_questions and not missing_sequence_questions else "partial"
            self.db.upsert_document(doc_info)
            logger.info(f"Ingested {extracted_count} questions for {doc_info['filename']} ({doc_info['status']})")

            return {
                "status": "success" if doc_info["status"] == "completed" else "partial",
                "doc_id": doc_id,
                "filename": doc_info["filename"],
                "questions_extracted": extracted_count
            }

        except Exception as e:
            logger.error(f"Error processing {pdf_path}: {str(e)}", exc_info=True)
            doc_info["status"] = "failed"
            self.db.upsert_document(doc_info)
            return {"status": "failed", "doc_id": doc_id, "error": str(e)}
        finally:
            doc.close()

    def process_catalog(self, base_dir: str = "cuet_ug_pyqs", limit_per_subject: Optional[int] = None, force_reprocess: bool = False) -> Dict[str, Any]:
        """
        Processes PDFs across all subjects in the catalog.
        """
        subjects = sorted([d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))])
        total_processed = 0
        total_failed = 0

        logger.info(f"Starting batch ingestion for {len(subjects)} subjects...")

        for sub in subjects:
            sub_dir = os.path.join(base_dir, sub)
            pdf_files = sorted(glob.glob(os.path.join(sub_dir, "*.pdf")))
            if limit_per_subject:
                pdf_files = pdf_files[:limit_per_subject]

            logger.info(f"== Processing Subject '{sub}' ({len(pdf_files)} PDFs) ==")
            for pdf_path in pdf_files:
                res = self.process_pdf(pdf_path, parent_subject=sub, force_reprocess=force_reprocess)
                if res["status"] in ["success", "skipped"]:
                    total_processed += 1
                else:
                    total_failed += 1

        # Run exports
        logger.info("Generating dataset exports and quality audit reports...")
        exports = self.exporter.export_all()

        summary = self.db.get_ingestion_summary()
        summary["exports"] = exports
        summary["processed_count"] = total_processed
        summary["failed_count"] = total_failed

        logger.info(f"Ingestion batch completed: {summary['total_questions']} questions stored.")
        return summary
