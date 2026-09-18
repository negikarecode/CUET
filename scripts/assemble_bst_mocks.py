import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import normalize_text, get_pyq_normalized_set

unit_files = [
    ("mock/bst_units/unit1.json", 3),     # Q1-Q3: Nature & Significance of Management (60 Qs)
    ("mock/bst_units/unit2.json", 4),     # Q4-Q7: Principles of Management (80 Qs)
    ("mock/bst_units/unit3.json", 3),     # Q8-Q10: Business Environment (60 Qs)
    ("mock/bst_units/unit4.json", 3),     # Q11-Q13: Planning (60 Qs)
    ("mock/bst_units/unit5.json", 4),     # Q14-Q17: Organising (80 Qs)
    ("mock/bst_units/unit6.json", 4),     # Q18-Q21: Staffing (80 Qs)
    ("mock/bst_units/unit7.json", 4),     # Q22-Q25: Directing (80 Qs)
    ("mock/bst_units/unit8.json", 3),     # Q26-Q28: Controlling (60 Qs)
    ("mock/bst_units/unit9.json", 3),     # Q29-Q31: Financial Management (60 Qs)
    ("mock/bst_units/unit10.json", 3),    # Q32-Q34: Financial Markets (60 Qs)
    ("mock/bst_units/unit11.json", 4),    # Q35-Q38: Marketing Management (80 Qs)
    ("mock/bst_units/unit12.json", 2),    # Q39-Q40: Consumer Protection (40 Qs)
    ("mock/bst_units/passages.json", 10)  # Q41-Q50: Case Study Passages (200 Qs: 2 passages x 5 Qs)
]

units_data = []
for fpath, q_per_mock in unit_files:
    with open(fpath, "r", encoding="utf-8") as f:
        data = json.load(f)
        expected = q_per_mock * 20
        assert len(data) == expected, f"{fpath} expected {expected} questions, got {len(data)}"
        units_data.append((data, q_per_mock, fpath))

out_dir = "mock/bst"
os.makedirs(out_dir, exist_ok=True)

print("Assembling 20 Business Studies mock tests (50 questions each, 1000 total)...")

global_seen = set()
pyq_seen = get_pyq_normalized_set()

for m in range(1, 21):
    mock_qs = []
    q_num = 1
    for data, q_per_mock, fpath in units_data:
        start_idx = (m - 1) * q_per_mock
        end_idx = m * q_per_mock
        unit_slice = data[start_idx:end_idx]
        for q in unit_slice:
            q_copy = json.loads(json.dumps(q))
            q_copy["questionNumber"] = q_num
            
            # Verify uniqueness across all mocks
            norm = normalize_text(q_copy["questionText"])
            if norm in global_seen:
                raise ValueError(f"Duplicate detected in Mock {m}, Q{q_num}: {q_copy['questionText'][:70]}")
            if norm in pyq_seen:
                raise ValueError(f"PYQ duplicate detected in Mock {m}, Q{q_num}: {q_copy['questionText'][:70]}")
            global_seen.add(norm)
            
            # Validate options and schema
            assert len(q_copy["options"]) == 4, f"Mock {m} Q{q_num} has {len(q_copy['options'])} options"
            assert q_copy["correctOption"] in ["A", "B", "C", "D"], f"Mock {m} Q{q_num} invalid correctOption"
            corr_count = sum(1 for o in q_copy["options"] if o.get("isCorrect"))
            assert corr_count == 1, f"Mock {m} Q{q_num} has {corr_count} correct options"
            assert q_copy["detailedSolution"], f"Mock {m} Q{q_num} missing detailedSolution"
            
            mock_qs.append(q_copy)
            q_num += 1

    assert len(mock_qs) == 50, f"Mock {m} expected 50 questions, got {len(mock_qs)}"
    out_file = os.path.join(out_dir, f"{m}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(mock_qs, f, indent=2, ensure_ascii=False)
    print(f"Saved Mock {m} with 50 questions to {out_file}")

print(f"\nAll 20 Business Studies mock tests successfully assembled!")
print(f"Total unique questions across all 20 mocks: {len(global_seen)}")
