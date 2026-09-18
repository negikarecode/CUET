import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "history_generators"))
from common import normalize_text, get_pyq_normalized_set

unit_files = [
    ("mock/history_units/unit1.json", 3),     # Q1-Q3: Harappan Civilisation (60 Qs)
    ("mock/history_units/unit2.json", 4),     # Q4-Q7: Kings, Farmers and Towns (80 Qs)
    ("mock/history_units/unit3.json", 3),     # Q8-Q10: Kinship, Caste and Class (60 Qs)
    ("mock/history_units/unit4.json", 4),     # Q11-Q14: Thinkers, Beliefs and Buildings (80 Qs)
    ("mock/history_units/unit5.json", 3),     # Q15-Q17: Through the Eyes of Travellers (60 Qs)
    ("mock/history_units/unit6.json", 4),     # Q18-Q21: Bhakti-Sufi Traditions (80 Qs)
    ("mock/history_units/unit7.json", 3),     # Q22-Q24: Vijayanagara Empire (60 Qs)
    ("mock/history_units/unit8.json", 4),     # Q25-Q28: Peasants, Zamindars and the State (80 Qs)
    ("mock/history_units/unit9.json", 3),     # Q29-Q31: Colonialism and Countryside (60 Qs)
    ("mock/history_units/unit10.json", 3),    # Q32-Q34: Rebels and the Raj (60 Qs)
    ("mock/history_units/unit11.json", 4),    # Q35-Q38: Mahatma Gandhi & Nationalist Movement (80 Qs)
    ("mock/history_units/unit12.json", 2),    # Q39-Q40: Colonial Cities, Partition & Constitution (40 Qs)
    ("mock/history_units/passages.json", 10)  # Q41-Q50: Source Excerpt Case Studies (200 Qs: 2 passages x 5 Qs)
]

units_data = []
for fpath, q_per_mock in unit_files:
    with open(fpath, "r", encoding="utf-8") as f:
        data = json.load(f)
        expected = q_per_mock * 20
        assert len(data) == expected, f"{fpath} expected {expected} questions, got {len(data)}"
        units_data.append((data, q_per_mock, fpath))

out_dir = "mock/history"
os.makedirs(out_dir, exist_ok=True)

print("Assembling 20 History mock tests (50 questions each, 1000 total)...")

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
            q_copy["id"] = f"hist-mock{m}-q{q_num}"
            
            # Verify uniqueness across all mocks
            norm = normalize_text(q_copy["questionText"])
            if norm in global_seen:
                raise ValueError(f"Duplicate detected in Mock {m}, Q{q_num}: {q_copy['questionText'][:70]}")
            if norm in pyq_seen:
                raise ValueError(f"PYQ duplicate detected in Mock {m}, Q{q_num}: {q_copy['questionText'][:70]}")
            global_seen.add(norm)
            
            # Validate options and schema
            assert len(q_copy["options"]) == 4, f"Mock {m} Q{q_num} has {len(q_copy['options'])} options"
            correct_opts = [opt for opt in q_copy["options"] if opt.get("isCorrect")]
            assert len(correct_opts) == 1, f"Mock {m} Q{q_num} must have exactly one correct option"
            assert q_copy["correctOption"] in ["A", "B", "C", "D"]
            
            mock_qs.append(q_copy)
            q_num += 1

    assert len(mock_qs) == 50, f"Mock {m} has {len(mock_qs)} questions instead of 50"
    
    mock_file = os.path.join(out_dir, f"{m}.json")
    with open(mock_file, "w", encoding="utf-8") as f:
        json.dump(mock_qs, f, indent=2, ensure_ascii=False)
    print(f"Mock {m}: Successfully written 50 questions to {mock_file}")

print("\nAll 20 History Mocks Successfully Assembled!")
print(f"Total Unique Questions Assembled: {len(global_seen)}")
assert len(global_seen) == 1000, f"Expected 1000 unique questions, got {len(global_seen)}"
