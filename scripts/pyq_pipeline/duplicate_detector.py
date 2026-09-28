"""
Duplicate Detection Engine for Stage 1 CUET UG PYQ Ingestion.
Calculates text hashes, normalized token fingerprints, and identifies exact and near duplicates.
Never deletes duplicates; groups and assigns duplicate_group_id for historical traceability.
"""

import re
import hashlib
from typing import Dict, Any, List, Optional, Tuple

class DuplicateDetector:
    def __init__(self):
        # In-memory index of known fingerprints for quick matching during batch run
        self.exact_hashes: Dict[str, str] = {} # text_hash -> question_id
        self.token_sets: Dict[str, Tuple[str, set]] = {} # question_id -> (dup_group_id, set_of_tokens)
        self.group_counter = 1

    def seed_existing(self, records: List[Dict[str, Any]]) -> None:
        """Load persisted questions so duplicate matching spans ingestion runs."""
        for record in records:
            qid = record["id"]
            text = record.get("normalized_question_text") or ""
            digest = self.compute_text_hash(text)
            group = record.get("duplicate_group_id") or f"DG_{self.group_counter:04d}"
            words = set(re.findall(r"\b[a-z]{3,}\b", text.lower()))
            self.exact_hashes.setdefault(digest, qid)
            self.token_sets[qid] = (group, words)
            self.group_counter += 1

    def compute_text_hash(self, text: str) -> str:
        """
        MD5 of normalized text (lowercase, alphanumeric only).
        """
        normalized = re.sub(r"[^a-z0-9]", "", text.lower())
        return hashlib.md5(normalized.encode("utf-8")).hexdigest()

    def compute_semantic_fingerprint(self, text: str) -> str:
        """
        Sorted distinctive tokens hash for fuzzy/near-duplicate detection.
        """
        words = re.findall(r"\b[a-z]{3,}\b", text.lower())
        unique_sorted = sorted(set(words))
        token_str = " ".join(unique_sorted)
        return hashlib.sha256(token_str.encode("utf-8")).hexdigest()[:16]

    def check_duplicate(
        self,
        q_id: str,
        question_text: str
    ) -> Tuple[str, Optional[str], Optional[str], float]:
        """
        Checks if question matches any previously ingested question.
        Returns: (duplicate_status, duplicate_group_id, duplicate_of_id, similarity_score)
        """
        text_hash = self.compute_text_hash(question_text)
        words = set(re.findall(r"\b[a-z]{3,}\b", question_text.lower()))

        # 1. Exact duplicate check
        if text_hash in self.exact_hashes:
            dup_of_id = self.exact_hashes[text_hash]
            if dup_of_id == q_id:
                group_id = self.token_sets.get(q_id, (f"DG_{self.group_counter:04d}", set()))[0]
                return "unique", group_id, None, 0.0
            group_id = self.token_sets.get(dup_of_id, (f"DG_{self.group_counter:04d}", set()))[0]
            self.exact_hashes[text_hash] = dup_of_id
            self.token_sets[q_id] = (group_id, words)
            return "duplicate", group_id, dup_of_id, 1.0

        # 2. Near-duplicate check using Jaccard token similarity
        if len(words) >= 5:
            for existing_id, (existing_group, existing_tokens) in self.token_sets.items():
                if existing_id == q_id:
                    continue
                if len(existing_tokens) == 0:
                    continue
                intersection = len(words & existing_tokens)
                union = len(words | existing_tokens)
                similarity = intersection / max(1, union)

                if similarity >= 0.88:
                    self.exact_hashes[text_hash] = existing_id
                    self.token_sets[q_id] = (existing_group, words)
                    return "near_duplicate", existing_group, existing_id, round(similarity, 3)

        # 3. Unique question
        new_group_id = f"DG_{self.group_counter:04d}"
        self.group_counter += 1
        self.exact_hashes[text_hash] = q_id
        self.token_sets[q_id] = (new_group_id, words)
        return "unique", new_group_id, None, 0.0
