import json
import os
import re
import random
from collections import Counter

def reassign_correct_option(q, target_opt):
    opts = q["options"]
    curr_corr = q["correctOption"]
    if curr_corr == target_opt:
        return q

    # Find current correct option dict
    corr_idx = None
    for i, opt in enumerate(opts):
        if opt["id"] == curr_corr or opt.get("isCorrect", False):
            corr_idx = i
            break
    if corr_idx is None:
        corr_idx = 0
            
    target_idx = ["A", "B", "C", "D"].index(target_opt)
    
    # Swap in opts list
    opts[corr_idx], opts[target_idx] = opts[target_idx], opts[corr_idx]
    
    # Reassign IDs 'A', 'B', 'C', 'D'
    for i, opt in enumerate(opts):
        letter = ["A", "B", "C", "D"][i]
        opt["id"] = letter
        opt["isCorrect"] = (letter == target_opt)
        
    q["correctOption"] = target_opt
    
    # Update detailedSolution
    sol = q["detailedSolution"]
    sol = re.sub(r"Hence, Option [ABCD] is correct\.", f"Hence, Option {target_opt} is correct.", sol)
    q["detailedSolution"] = sol
    return q

def assemble_mocks():
    print("Loading unit questions...")
    units = {}
    for u in range(1, 10):
        with open(f"mock/psy_units/unit{u}.json", "r", encoding="utf-8") as f:
            units[u] = json.load(f)
        print(f"  Unit {u}: {len(units[u])} questions")
        
    with open("mock/psy_units/passages.json", "r", encoding="utf-8") as f:
        passages = json.load(f)
    print(f"  Passages: {len(passages)} questions")
    
    os.makedirs("mock/psychology", exist_ok=True)
    
    grand_option_counter = Counter()
    
    for m in range(1, 21):
        idx0 = m - 1
        mock_qs = []
        
        # Unit 1: 5 Qs
        mock_qs.extend(units[1][idx0*5 : m*5])
        # Unit 2: 6 Qs
        mock_qs.extend(units[2][idx0*6 : m*6])
        # Unit 3: 5 Qs
        mock_qs.extend(units[3][idx0*5 : m*5])
        # Unit 4: 6 Qs
        mock_qs.extend(units[4][idx0*6 : m*6])
        # Unit 5: 5 Qs
        mock_qs.extend(units[5][idx0*5 : m*5])
        # Unit 6: 4 Qs
        mock_qs.extend(units[6][idx0*4 : m*4])
        # Unit 7: 4 Qs
        mock_qs.extend(units[7][idx0*4 : m*4])
        # Unit 8: 3 Qs
        mock_qs.extend(units[8][idx0*3 : m*3])
        # Unit 9: 2 Qs
        mock_qs.extend(units[9][idx0*2 : m*2])
        # Passages: 10 Qs (Passages 2m-1 and 2m)
        mock_qs.extend(passages[idx0*10 : m*10])
        
        assert len(mock_qs) == 50, f"Mock {m} has {len(mock_qs)} questions instead of 50!"
        
        # Determine balanced target distribution
        if m % 2 == 1:
            targets = ["A", "B", "C", "D"] * 12 + ["A", "B"]
        else:
            targets = ["C", "D", "A", "B"] * 12 + ["C", "D"]
            
        rng = random.Random(100 + m)
        rng.shuffle(targets)
        
        for q_idx, q in enumerate(mock_qs, start=1):
            q["id"] = f"psy-mock{m}-q{q_idx}"
            target_opt = targets[q_idx - 1]
            reassign_correct_option(q, target_opt)
            
        # Verify mock balance
        m_counter = Counter(q["correctOption"] for q in mock_qs)
        grand_option_counter.update(m_counter)
        
        out_path = f"mock/psychology/{m}.json"
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(mock_qs, f, indent=2, ensure_ascii=False)
            
        print(f"Mock {m}: 50 Qs written to {out_path} -> Option breakdown: {dict(m_counter)}")

    print("\n--- ASSEMBLY COMPLETE ---")
    print(f"Total Mocks Generated: 20")
    print(f"Total Questions: {sum(grand_option_counter.values())}")
    print(f"Grand Option Distribution: {dict(grand_option_counter)}")
    for opt in ["A", "B", "C", "D"]:
        pct = (grand_option_counter[opt] / 1000) * 100
        print(f"  Option {opt}: {grand_option_counter[opt]} ({pct:.1f}%)")

if __name__ == "__main__":
    assemble_mocks()
