import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import normalize_text

unit_files = [
    ("mock/eco_units/unit1.json", 2),     # Q1-Q2: Intro to Microeconomics (40 questions)
    ("mock/eco_units/unit2.json", 6),     # Q3-Q8: Consumer Behaviour & Demand (120 questions)
    ("mock/eco_units/unit3.json", 6),     # Q9-Q14: Production and Costs (120 questions)
    ("mock/eco_units/unit4.json", 3),     # Q15-Q17: Theory of Firm & Market Structures (60 questions)
    ("mock/eco_units/unit5.json", 3),     # Q18-Q20: Market Equilibrium & Applications (60 questions)
    ("mock/eco_units/unit6.json", 5),     # Q21-Q25: National Income & Aggregates (100 questions)
    ("mock/eco_units/unit7.json", 4),     # Q26-Q29: Money and Banking (80 questions)
    ("mock/eco_units/unit8.json", 5),     # Q30-Q34: Determination of Income & Employment (100 questions)
    ("mock/eco_units/unit9.json", 3),     # Q35-Q37: Government Budget & the Economy (60 questions)
    ("mock/eco_units/unit10.json", 3),    # Q38-Q40: Balance of Payments & Foreign Exchange (60 questions)
    ("mock/eco_units/passages.json", 10)  # Q41-Q50: Case Study Passages (200 questions: 2 passages × 5 qs)
]

units_data = []
for fpath, q_per_mock in unit_files:
    with open(fpath, "r", encoding="utf-8") as f:
        data = json.load(f)
        expected = q_per_mock * 20
        assert len(data) == expected, f"{fpath} expected {expected} questions, got {len(data)}"
        units_data.append((data, q_per_mock, fpath))

out_dir = "mock/eco"
os.makedirs(out_dir, exist_ok=True)

print("Assembling 20 Economics mock tests (50 questions each, 1000 total)...")

global_seen = set()

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
            
            # Verify uniqueness
            norm = normalize_text(q_copy["questionText"])
            if norm in global_seen:
                raise ValueError(f"Duplicate detected in Mock {m}, Q{q_num}: {q_copy['questionText'][:70]}")
            global_seen.add(norm)
            
            # Validate options
            assert len(q_copy["options"]) == 4, f"Mock {m} Q{q_num} has {len(q_copy['options'])} options"
            assert q_copy["correctOption"] in ["A", "B", "C", "D"], f"Mock {m} Q{q_num} invalid correctOption"
            
            mock_qs.append(q_copy)
            q_num += 1

    assert len(mock_qs) == 50, f"Mock {m} expected 50 questions, got {len(mock_qs)}"
    out_file = os.path.join(out_dir, f"{m}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(mock_qs, f, indent=2, ensure_ascii=False)
    print(f"Saved Mock {m} with 50 questions to {out_file}")

print(f"\nAll 20 Economics mock tests successfully assembled!")
print(f"Total unique questions across all 20 mocks: {len(global_seen)}")
