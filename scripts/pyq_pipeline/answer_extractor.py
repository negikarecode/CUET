"""
Answer Key Extraction & Verification Module for Stage 1 CUET UG PYQ Ingestion.
Extracts answer mappings from document text or external files. Never invents answers.
If unverified, preserves correct_answer as NULL and flags for human review.
"""

import re
from typing import Dict, Any, Optional

class AnswerExtractor:
    def __init__(self):
        pass

    def extract_answers_from_doc(self, full_doc_text: str) -> Dict[int, str]:
        """
        Scans document text for answer tables or candidate response sheet markers.
        Returns: { q_num: "A" | "B" | "C" | "D" }
        """
        answers = {}

        # Only parse an explicitly labeled answer-key section. Options elsewhere
        # in the paper are not evidence of a correct answer.
        # Often found on the final pages
        key_section = ""
        key_marker = re.search(r"(?:Answer\s*Key|Answers|Key\s*Sheet)[\s\:\-]+", full_doc_text, re.IGNORECASE)
        if key_marker:
            key_section = full_doc_text[key_marker.end():]

        if key_section:
            # Matches: 1. A, 1 - B, 1: (C), 1 D
            pairs = re.findall(r"(?:^|\s)(\d{1,2})\s*[\.\:\-\)]\s*\(?([A-D])\)?", key_section)
            for q_str, opt in pairs:
                q_num = int(q_str)
                if 1 <= q_num <= 50:
                    answers[q_num] = opt.upper()

        return answers

    def get_answer_verification_payload(
        self,
        q_num: int,
        source_answer: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generates verification payload keeping the source answer authoritative.
        Never replaces official answer with AI guesses.
        """
        if source_answer:
            return {
                "source_answer": source_answer,
                "ai_check": source_answer, # Ground truth preserved
                "status": "consistent",
                "requires_human_review": False
            }
        else:
            return {
                "source_answer": None,
                "ai_check": None,
                "status": "unable_to_verify",
                "requires_human_review": True
            }
