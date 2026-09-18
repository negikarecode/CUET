import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import normalize_text, get_pyq_normalized_set

print("Running rigorous verification on all 20 Business Studies mock tests...")

pyq_seen = get_pyq_normalized_set()
print(f"Loaded {len(pyq_seen)} normalized PYQs for cross-verification.")

all_seen = set()
total_questions = 0

for m in range(1, 21):
    fpath = f"mock/bst/{m}.json"
    assert os.path.exists(fpath), f"File {fpath} does not exist!"
    
    with open(fpath, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    assert len(data) == 50, f"Mock {m} has {len(data)} questions, expected 50"
    
    for idx, q in enumerate(data, 1):
        assert q.get("questionNumber") == idx, f"Mock {m} Q{idx} has questionNumber {q.get('questionNumber')}"
        assert q.get("questionText"), f"Mock {m} Q{idx} missing questionText"
        assert len(q.get("options", [])) == 4, f"Mock {m} Q{idx} does not have 4 options"
        assert q.get("correctOption") in ["A", "B", "C", "D"], f"Mock {m} Q{idx} invalid correctOption: {q.get('correctOption')}"
        
        corr_opts = [o for o in q["options"] if o.get("isCorrect")]
        assert len(corr_opts) == 1, f"Mock {m} Q{idx} has {len(corr_opts)} correct options"
        assert corr_opts[0]["id"] == q["correctOption"], f"Mock {m} Q{idx} correctOption mismatch"
        assert q.get("detailedSolution"), f"Mock {m} Q{idx} missing detailedSolution"
        
        norm = normalize_text(q["questionText"])
        assert norm not in all_seen, f"Duplicate found in Mock {m} Q{idx}: {q['questionText'][:70]}"
        assert norm not in pyq_seen, f"PYQ duplicate found in Mock {m} Q{idx}: {q['questionText'][:70]}"
        all_seen.add(norm)
        total_questions += 1

print(f"VERIFICATION SUCCESSFUL!")
print(f"Total Mocks Verified: 20")
print(f"Total Questions: {total_questions}")
print(f"Total Unique Questions: {len(all_seen)}")
print(f"PYQ Duplicates: 0")
print(f"Schema and Data Integrity: 100% PASS")
