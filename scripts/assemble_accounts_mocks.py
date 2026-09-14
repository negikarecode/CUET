import json
import os
import sys

# Load all 7 units
unit_files = [
    ("mock/accounts_units/unit1_partnership_basics.json", 10),      # Q1-10 (200 questions)
    ("mock/accounts_units/unit2_admission_retirement_death.json", 10), # Q11-20 (200 questions)
    ("mock/accounts_units/unit3_dissolution.json", 6),              # Q21-26 (120 questions)
    ("mock/accounts_units/unit4_shares_debentures.json", 10),       # Q27-36 (200 questions)
    ("mock/accounts_units/unit5_financial_statements_ratios.json", 6), # Q37-42 (120 questions)
    ("mock/accounts_units/unit6_cash_flow.json", 6),                # Q43-48 (120 questions)
    ("mock/accounts_units/unit7_computerised_advanced.json", 2)     # Q49-50 (40 questions)
]

units_data = []
for fpath, q_per_mock in unit_files:
    with open(fpath, "r", encoding="utf-8") as f:
        data = json.load(f)
        assert len(data) == q_per_mock * 20, f"{fpath} expected {q_per_mock * 20}, got {len(data)}"
        units_data.append((data, q_per_mock))

out_dir = "mock/accs"
os.makedirs(out_dir, exist_ok=True)

print("Assembling 20 Accountancy mock tests...")

for m in range(1, 21):
    mock_qs = []
    q_num = 1
    for data, q_per_mock in units_data:
        # Take slice for mock m (0-indexed: (m-1)*q_per_mock to m*q_per_mock)
        start_idx = (m - 1) * q_per_mock
        end_idx = m * q_per_mock
        unit_slice = data[start_idx:end_idx]
        for q in unit_slice:
            # Deep copy or construct
            q_copy = json.loads(json.dumps(q))
            q_copy["questionNumber"] = q_num
            mock_qs.append(q_copy)
            q_num += 1

    assert len(mock_qs) == 50, f"Mock {m} expected 50 questions, got {len(mock_qs)}"
    out_file = os.path.join(out_dir, f"{m}.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(mock_qs, f, indent=2, ensure_ascii=False)

print("Successfully assembled all 20 Accountancy mock tests into mock/accs/{1..20}.json!")
