import json
import random
import re
from collections import Counter

def test_randomization():
    with open("mock/physics/1.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    
    seed = "physics_1_cuet_test"
    rng = random.Random(seed)
    
    # 50 target letters: 13 A, 13 B, 12 C, 12 D
    targets = ["A"] * 13 + ["B"] * 13 + ["C"] * 12 + ["D"] * 12
    rng.shuffle(targets)
    
    letter_to_idx = {"A": 0, "B": 1, "C": 2, "D": 3}
    idx_to_letter = {0: "A", 1: "B", 2: "C", 3: "D"}
    
    before_texts = {}
    
    for q_idx, q in enumerate(data):
        curr_corr = q.get("correctOption", "A")
        old_opts = q.get("options", [])
        
        # Identify correct option object and distractors
        correct_obj = None
        distractor_objs = []
        for opt in old_opts:
            if opt.get("id") == curr_corr or opt.get("isCorrect") is True:
                correct_obj = opt
            else:
                distractor_objs.append(opt)
                
        if not correct_obj:
            correct_obj = old_opts[0]
            distractor_objs = old_opts[1:]
            
        before_texts[q_idx] = correct_obj["text"]
        
        target_letter = targets[q_idx]
        target_idx = letter_to_idx[target_letter]
        
        new_opts = [None] * 4
        new_opts[target_idx] = correct_obj
        
        # Place distractors in remaining slots
        dist_idx = 0
        for i in range(4):
            if new_opts[i] is None:
                new_opts[i] = distractor_objs[dist_idx]
                dist_idx += 1
                
        # Update option IDs and isCorrect
        for i in range(4):
            let = idx_to_letter[i]
            new_opts[i]["id"] = let
            new_opts[i]["isCorrect"] = (let == target_letter)
            
        q["options"] = new_opts
        q["correctOption"] = target_letter
        
        # Verify text of correct option still matches original correct text
        new_correct_text = new_opts[target_idx]["text"]
        assert new_correct_text == before_texts[q_idx], f"Mismatch in Q{q_idx+1}"
        
        # Update solution ending if it mentions "Option X"
        sol = q.get("detailedSolution", "")
        # Update patterns like "Hence, Option A is correct" or "Therefore, option A is correct"
        sol_updated = re.sub(
            r'([Hh]ence|[Tt]herefore|[Tt]hus|[Ss]o),?\s+([Oo]ption|[Cc]hoice)\s*\*?\*?[A-D]\*?\*?\s+(is\s+(?:the\s+)?correct(?:\s+answer)?)',
            rf'\1 \2 {target_letter} \3',
            sol
        )
        sol_updated = re.sub(
            r'([Tt]he\s+correct\s+(?:option|answer|choice)\s+is)\s*\*?\*?[A-D]\*?\*?',
            rf'\1 {target_letter}',
            sol_updated
        )
        q["detailedSolution"] = sol_updated

    dist = Counter(q["correctOption"] for q in data)
    print("New distribution in Physics Mock 1:", dict(dist))
    print("Verification passed! Correct answer texts were 100% preserved.")
    
    # Print sample Q1
    q1 = data[0]
    print(f"\nSample Q1 new correctOption: {q1['correctOption']}")
    for opt in q1["options"]:
        print(f"  [{opt['id']}] {opt['text'][:40]}... (isCorrect: {opt.get('isCorrect')})")
    print(f"  Solution tail: {q1['detailedSolution'][-80:]}")

if __name__ == "__main__":
    test_randomization()
