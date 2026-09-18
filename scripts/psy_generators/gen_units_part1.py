import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.psy_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, make_multi_statement_question,
    rotate_options, normalize_text, get_pyq_normalized_set
)

pyq_seen = get_pyq_normalized_set()
global_seen = set()

def validate_and_collect(q_list, target_seen, unit_name):
    for idx, q in enumerate(q_list, 1):
        norm = normalize_text(q["questionText"])
        if norm in target_seen:
            raise ValueError(f"Duplicate within {unit_name} at index {idx}: {q['questionText'][:80]}")
        if norm in global_seen:
            raise ValueError(f"Cross-unit duplicate in {unit_name} at index {idx}: {q['questionText'][:80]}")
        if norm in pyq_seen:
            raise ValueError(f"PYQ duplicate in {unit_name} at index {idx}: {q['questionText'][:80]}")
        target_seen.add(norm)
        global_seen.add(norm)
        assert len(q["options"]) == 4, f"Options length error in {unit_name} Q{idx}"
        assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option in {unit_name} Q{idx}"
        assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"]), f"Mismatch in {unit_name} Q{idx}"
        assert q["detailedSolution"], f"Missing solution in {unit_name} Q{idx}"

print("gen_units_part1 loader ready.")
