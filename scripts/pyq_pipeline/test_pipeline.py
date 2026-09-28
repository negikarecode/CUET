"""Focused regression checks using the real PDFs in cuet_ug_pyqs."""
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import fitz
from PIL import Image

from scripts.pyq_pipeline.answer_extractor import AnswerExtractor
from scripts.pyq_pipeline.boundary_detector import BoundaryDetector
from scripts.pyq_pipeline.duplicate_detector import DuplicateDetector
from scripts.pyq_pipeline.ocr_engine import OCREngine
from scripts.pyq_pipeline.page_extractor import PageExtractor
from scripts.pyq_pipeline.question_reconstructor import QuestionReconstructor



class PYQPipelineRegressionTests(unittest.TestCase):
    def test_page_top_continuation_is_merged_into_previous_question(self):
        pages = [
            {"page_number": 1, "raw_text": "Q.1\nChoose the correct answer.\n1. Alpha", "ocr_text": None},
            {"page_number": 2, "raw_text": "2. Beta\n3. Gamma\n4. Delta\nOptions 1. 1\n2. 2\n3. 3\n4. 4\nQ.2\nNext question\n1. One\n2. Two\n3. Three\n4. Four", "ocr_text": None},
        ]
        segments = BoundaryDetector().detect_question_segments_in_doc(pages)
        first = next(q for q in segments if q["question_number"] == 1)
        result = QuestionReconstructor().reconstruct("TEST", "accountancy", first)
        self.assertEqual(first["pages"], [1, 2])
        self.assertEqual([result["options"][k]["raw_text"] for k in "ABCD"], ["Alpha", "Beta", "Gamma", "Delta"])

    def test_nested_accountancy_options_remain_four_complete_choices(self):
        source = ROOT / "cuet_ug_pyqs/accountancy/shift-03-06-2025-300PM-600PM.pdf"
        with tempfile.TemporaryDirectory() as tmp, fitz.open(source) as doc:
            page = PageExtractor(str(Path(tmp) / "pages")).extract_page(doc, 1, "TEST_ACC")
            segment = next(q for q in BoundaryDetector().detect_question_segments_in_doc([page]) if q["question_number"] == 5)
            result = QuestionReconstructor(str(Path(tmp) / "images")).reconstruct("TEST_ACC", "accountancy", segment)
        self.assertIn("journal entries", result["raw_question_text"].lower())
        self.assertEqual(set(result["options"]), set("ABCD"))
        self.assertTrue(all(result["options"][key]["raw_text"].strip() for key in "ABCD"))
        self.assertIn("Share Call A/c", result["options"]["A"]["raw_text"])
        self.assertIn("Share Capital A/c", result["options"]["D"]["raw_text"])

    def test_answer_extractor_never_uses_question_options_as_the_key(self):
        extractor = AnswerExtractor()
        self.assertEqual(extractor.extract_answers_from_doc("Q.1\nChoose one\n1. A\n2. B\n3. C\n4. D"), {})
        self.assertEqual(extractor.extract_answers_from_doc("Answer Key\n1. C\n2. A"), {1: "C", 2: "A"})

    def test_targeted_ocr_uses_the_question_bbox_for_diagram_question(self):
        source = ROOT / "cuet_ug_pyqs/physics/shift-02-06-2025-3_00PM-6_00PM.pdf"
        with tempfile.TemporaryDirectory() as tmp, fitz.open(source) as doc:
            page = PageExtractor(str(Path(tmp) / "pages")).extract_page(doc, 0, "TEST_PHY")
            segment = next(q for q in BoundaryDetector().detect_question_segments_in_doc([page]) if q["question_number"] == 4)
            y0, y1 = segment["bbox_y"]
            with Image.open(page["page_image_full_path"]) as img:
                scale = img.height / page["page_rect"][3]
                result = OCREngine().ocr_page_image(page["page_image_full_path"], bbox=(0, int(y0 * scale), img.width, min(img.height, int(y1 * scale))))
        self.assertIn("circuit", result["text"].lower())
        self.assertIn("Only", result["text"])
        self.assertGreaterEqual(result["confidence"], 0.5)

    def test_image_crop_is_not_attached_to_an_adjacent_question(self):
        source = ROOT / "cuet_ug_pyqs/physics/shift-02-06-2025-3_00PM-6_00PM.pdf"
        with tempfile.TemporaryDirectory() as tmp, fitz.open(source) as doc:
            page = PageExtractor(str(Path(tmp) / "pages")).extract_page(doc, 0, "TEST_CROP")
            segments = BoundaryDetector().detect_question_segments_in_doc([page])
            by_number = {q["question_number"]: q for q in segments}
            reconstructor = QuestionReconstructor(str(Path(tmp) / "images"))
            unrelated = reconstructor.extract_and_save_question_image(
                "TEST_CROP", 2, [page], by_number[2]["full_raw_text"],
                source_page=1, bbox_y=by_number[2]["bbox_y"]
            )
            related = reconstructor.extract_and_save_question_image(
                "TEST_CROP", 4, [page], by_number[4]["full_raw_text"],
                source_page=1, bbox_y=by_number[4]["bbox_y"]
            )
        self.assertFalse(unrelated[0])
        self.assertTrue(related[0])

    def test_duplicate_detection_uses_existing_database_seed(self):
        detector = DuplicateDetector()
        detector.seed_existing([{"id": "old-q", "normalized_question_text": "A long identical question stem", "duplicate_group_id": "DG_01"}])
        status, group, duplicate_of, score = detector.check_duplicate("new-q", "A long identical question stem")
        self.assertEqual((status, group, duplicate_of, score), ("duplicate", "DG_01", "old-q", 1.0))


if __name__ == "__main__":
    unittest.main()
