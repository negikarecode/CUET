import json
import os
import re
import sys
from collections import Counter

sys.path.insert(0, os.getcwd())
from scripts.psy_generators.common import get_pyq_normalized_set, normalize_text

def verify():
    pyq_seen = get_pyq_normalized_set()
    all_seen = set()
    total_qs = 0
    grand_opts = Counter()
    
    for m in range(1, 21):
        path = f"mock/psychology/{m}.json"
        assert os.path.exists(path), f"File missing: {path}"
        with open(path, "r", encoding="utf-8") as f:
            qs = json.load(f)
            
        assert len(qs) == 50, f"Mock {m} has {len(qs)} questions instead of 50!"
        m_opts = Counter()
        
        for idx, q in enumerate(qs, start=1):
            total_qs += 1
            expected_id = f"psy-mock{m}-q{idx}"
            assert q["id"] == expected_id, f"ID mismatch: got {q['id']}, expected {expected_id}"
            
            # Check unique text
            norm = normalize_text(q["questionText"])
            assert norm not in all_seen, f"Cross-mock duplicate question in mock {m} Q{idx}: {q['questionText'][:60]}"
            assert norm not in pyq_seen, f"PYQ overlap in mock {m} Q{idx}: {q['questionText'][:60]}"
            all_seen.add(norm)
            
            # Check options
            assert len(q["options"]) == 4, f"Mock {m} Q{idx} has {len(q['options'])} options instead of 4"
            opt_ids = [opt["id"] for opt in q["options"]]
            assert opt_ids == ["A", "B", "C", "D"], f"Mock {m} Q{idx} option ids mismatch: {opt_ids}"
            
            corr_opt = q["correctOption"]
            assert corr_opt in ["A", "B", "C", "D"], f"Mock {m} Q{idx} invalid correctOption: {corr_opt}"
            
            # Check isCorrect flags
            true_opts = [opt["id"] for opt in q["options"] if opt.get("isCorrect")]
            assert true_opts == [corr_opt], f"Mock {m} Q{idx} isCorrect mismatch: {true_opts} vs {corr_opt}"
            
            # Check detailed solution
            sol = q["detailedSolution"]
            assert sol, f"Mock {m} Q{idx} missing detailedSolution"
            expected_ending = f"Hence, Option {corr_opt} is correct."
            assert expected_ending in sol, f"Mock {m} Q{idx} solution ending mismatch: expected '{expected_ending}' in '{sol[-60:]}'"
            
            # Check distractor traps
            for opt in q["options"]:
                if not opt["isCorrect"]:
                    assert "studentSelectionTrap" in opt and opt["studentSelectionTrap"], f"Mock {m} Q{idx} missing studentSelectionTrap on option {opt['id']}"
                    assert "mistakeAnalysis" in opt and opt["mistakeAnalysis"], f"Mock {m} Q{idx} missing mistakeAnalysis on option {opt['id']}"
            
            m_opts[corr_opt] += 1
            
            # Q41-50 should be passage questions
            if idx >= 41:
                assert "Read the following case study and answer the question" in q["questionText"], f"Mock {m} Q{idx} expected passage question text"
                
        # Per-mock option balance check: each option should be 12 or 13
        for opt in ["A", "B", "C", "D"]:
            assert 12 <= m_opts[opt] <= 13, f"Mock {m} option {opt} count out of range: {m_opts[opt]}"
            
        grand_opts.update(m_opts)
        
    assert total_qs == 1000, f"Expected 1000 questions, verified {total_qs}"
    assert grand_opts == {"A": 250, "B": 250, "C": 250, "D": 250}, f"Grand option distribution mismatch: {grand_opts}"
    
    print("=" * 60)
    print("ALL VERIFICATION CHECKS PASSED!")
    print(f"- Total Mocks: 20")
    print(f"- Total Questions: {total_qs}")
    print(f"- Unique Question Texts: {len(all_seen)}")
    print(f"- Zero Overlap with PYQs: Verified")
    print(f"- Grand Option Distribution: {dict(grand_opts)}")
    print(f"- Per-mock Balance: 12-13 of each option across all 20 mocks")
    print(f"- Option Traps & Explanations: 100% verified")
    print("=" * 60)

if __name__ == "__main__":
    verify()
