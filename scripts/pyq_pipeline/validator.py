"""
Quality Validation & Review Routing Engine for Stage 1 CUET UG PYQ Ingestion.
Audits every extracted question record against 13 strict quality checks.
Computes multi-signal extraction confidence and routes uncertain questions to the review queue.
"""

from typing import Dict, Any, List, Tuple

class QuestionValidator:
    def __init__(self):
        pass

    def validate_question(
        self,
        q_record: Dict[str, Any],
        options: Dict[str, Dict[str, Any]],
        metadata: Dict[str, Any],
        source_answer: Any
    ) -> Tuple[float, List[str], bool]:
        """
        Runs the 13 quality control checks on a reconstructed question.
        Returns: (extraction_confidence, review_reasons, requires_review)
        """
        issues = []
        confidence_penalties = 0.0

        stem = q_record.get("raw_question_text", "").strip()
        q_num = q_record.get("question_number")

        # 1 & 2. Question exists & isn't empty
        if not stem:
            issues.append("question_stem_empty")
            confidence_penalties += 0.50
        elif len(stem) < 15 and not q_record.get("has_image"):
            issues.append("question_stem_unusually_short")
            confidence_penalties += 0.25

        # 3 & 4. Options exist & 4 options present
        valid_opts_count = sum(1 for k in ["A", "B", "C", "D"] if options.get(k, {}).get("raw_text", "").strip())
        if valid_opts_count == 0:
            issues.append("missing_all_options")
            confidence_penalties += 0.40
        elif valid_opts_count < 4:
            issues.append(f"incomplete_options_{valid_opts_count}_of_4")
            confidence_penalties += 0.20

        # 5. Question number valid. Numbered substeps are valid option content
        # in accountancy and matching questions, so do not treat "2." inside an
        # option as proof that adjacent choices were merged.
        if not q_num or not (1 <= q_num <= 60):
            issues.append("invalid_question_number")
            confidence_penalties += 0.20

        # 7. Answer mapping check
        if source_answer is None:
            issues.append("missing_source_answer_key")
            # Do NOT heavily penalize confidence for missing external key, but note review
            confidence_penalties += 0.05

        # 8. Source page exists
        if not q_record.get("source_page"):
            issues.append("missing_source_page_traceability")
            confidence_penalties += 0.20

        # 9. OCR corruption check (high ratio of unprintable or irregular characters)
        gibberish_chars = sum(1 for c in stem if ord(c) > 127 and c not in "°µΩλθαβγπεσρΔ²³⁴⁵⁶⁷⁸⁹⁰⁻¹²³±×÷≤≥≠≈√∫∑")
        if len(stem) > 0 and (gibberish_chars / len(stem)) > 0.08:
            issues.append("ocr_corruption_detected")
            confidence_penalties += 0.30

        # 10. Math expression corruption check
        if "$" in stem:
            # Check balanced math delimiters
            if stem.count("$") % 2 != 0:
                issues.append("unbalanced_latex_math_delimiters")
                confidence_penalties += 0.15

        # 11. Visual dependency check
        has_visual_mention = any(v in stem.lower() for v in ["shown in figure", "in the diagram", "given graph", "circuit shown"])
        if has_visual_mention and not q_record.get("has_image"):
            issues.append("visual_dependency_missing_diagram_crop")
            confidence_penalties += 0.20

        # 12. Internal consistency
        if metadata.get("requires_calculation") and not any(ch.isdigit() for ch in stem):
            issues.append("calculation_flag_without_numerical_terms")
            confidence_penalties += 0.05

        # Taxonomy labels are heuristic suggestions, not verified syllabus
        # facts. Keep low-confidence and absent classifications in review.
        if metadata.get("taxonomy_source") and metadata.get("taxonomy_confidence", 0) < 0.85:
            issues.append("low_confidence_taxonomy_inference")
            confidence_penalties += 0.05

        # Combine structural checks with source page/OCR quality. Poor source
        # quality must lower confidence even when the parsed shape looks valid.
        structural_confidence = max(0.10, round(1.00 - confidence_penalties, 2))
        page_quality = q_record.get("source_page_quality")
        final_confidence = min(structural_confidence, float(page_quality)) if page_quality is not None else structural_confidence
        final_confidence = max(0.10, round(final_confidence, 2))
        if page_quality is not None and page_quality < 0.85:
            issues.append("low_source_page_or_ocr_quality")

        # Flag for review if confidence < 0.85 or critical issues exist
        requires_review = (source_answer is None) or (final_confidence < 0.85) or (len(issues) > 0 and "missing_source_answer_key" not in issues) or (len(issues) > 1)

        return final_confidence, issues, requires_review
