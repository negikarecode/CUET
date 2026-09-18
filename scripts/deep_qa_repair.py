import os
import json
import re

mock_dir = "mock"

def repair_psychology():
    print("Repairing Psychology questionNumber and questionIds...")
    psy_dir = os.path.join(mock_dir, "psychology")
    for m in range(1, 21):
        fpath = os.path.join(psy_dir, f"{m}.json")
        data = json.load(open(fpath, "r", encoding="utf-8"))
        for idx, q in enumerate(data):
            q_num = idx + 1
            q["questionNumber"] = q_num
            q["id"] = f"psy-mock{m}-q{q_num}"
            q["questionId"] = f"PSY-M{m:02d}-Q{q_num:02d}"
        with open(fpath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    print("Psychology repaired.")

def repair_solution_mismatches():
    print("Auditing and repairing solution letter mismatches across all subjects...")
    subjects = [
        "physics", "chemistry", "maths", "bio", "accs",
        "eco", "bst", "history", "pol science", "geo", "psychology"
    ]
    
    fixed_count = 0
    for subj in subjects:
        for m in range(1, 21):
            fpath = os.path.join(mock_dir, subj, f"{m}.json")
            data = json.load(open(fpath, "r", encoding="utf-8"))
            modified = False
            
            for idx, q in enumerate(data):
                corr = q.get("correctOption") or q.get("correctOptionId")
                sol = q.get("detailedSolution", "")
                
                # Check for "Option [A-D] is correct" or "Hence, Option [A-D]"
                # Look at the end lines
                lines = sol.split("\n")
                new_lines = []
                for line in lines:
                    new_line = line
                    # Match Option X is correct / Hence Option X is correct / Option X is the false statement
                    pattern1 = re.compile(r'\bOption\s+([A-D])\s+is\s+correct', re.IGNORECASE)
                    m1 = pattern1.search(new_line)
                    if m1 and m1.group(1).upper() != corr:
                        new_line = pattern1.sub(f"Option {corr} is correct", new_line)
                        modified = True
                        fixed_count += 1
                        
                    pattern2 = re.compile(r'([Hh]ence|[Tt]herefore|[Tt]hus|[Ss]o),?\s+(?:the\s+)?(?:correct\s+)?(?:[Oo]ption|[Cc]hoice)\s+([A-D])\b', re.IGNORECASE)
                    m2 = pattern2.search(new_line)
                    if m2 and m2.group(2).upper() != corr:
                        new_line = pattern2.sub(rf"\1, Option {corr}", new_line)
                        modified = True
                        fixed_count += 1
                        
                    pattern3 = re.compile(r'([Hh]ence|[Tt]herefore|[Tt]hus|[Ss]o),?\s+Option\s+([A-D])\s+is\s+(?:the\s+)?(?:false|incorrect|exception)\b', re.IGNORECASE)
                    m3 = pattern3.search(new_line)
                    if m3 and m3.group(2).upper() != corr:
                        new_line = pattern3.sub(rf"\1, Option {corr} is the correct answer", new_line)
                        modified = True
                        fixed_count += 1
                        
                    new_lines.append(new_line)
                    
                if modified:
                    q["detailedSolution"] = "\n".join(new_lines)
                    if "solution" in q and isinstance(q["solution"], dict):
                        q["solution"]["detailed"] = q["detailedSolution"]
                        # Also check concept
                        c_text = q["solution"].get("concept", "")
                        for p in [pattern1, pattern2]:
                            c_text = p.sub(f"Option {corr}", c_text)
                        q["solution"]["concept"] = c_text
                        
            if modified:
                with open(fpath, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2)
                    
    print(f"Repaired {fixed_count} solution letter mismatches.")

def repair_physics_giveaways():
    print("Removing distractor giveaways in Physics...")
    phys_dir = os.path.join(mock_dir, "physics")
    count = 0
    for m in range(1, 21):
        fpath = os.path.join(phys_dir, f"{m}.json")
        data = json.load(open(fpath, "r", encoding="utf-8"))
        modified = False
        
        for q in data:
            opts = q.get("options", [])
            corr_id = q.get("correctOption")
            corr_opt = next((o for o in opts if o.get("id") == corr_id), None)
            wrong_opts = [o for o in opts if o.get("id") != corr_id]
            
            if not corr_opt or len(wrong_opts) != 3:
                continue
                
            c_text = str(corr_opt.get("text", ""))
            w_texts = [str(o.get("text", "")) for o in wrong_opts]
            
            if "(or " in c_text and not any("(or " in w for w in w_texts):
                # Clean up parenthetical like (or \approx 0.346 G)
                cleaned_text = re.sub(r'\s*\([Oo]r\s+[^)]+\)', '', c_text).strip()
                if cleaned_text and cleaned_text != c_text:
                    corr_opt["text"] = cleaned_text
                    modified = True
                    count += 1
                    # Also update quick solution if needed
                    if "solution" in q and "quick" in q["solution"]:
                        q["solution"]["quick"] = f"Correct answer is {cleaned_text}."
                        
        if modified:
            with open(fpath, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
                
    print(f"Cleaned {count} giveaway options in Physics.")

if __name__ == "__main__":
    repair_psychology()
    repair_solution_mismatches()
    repair_physics_giveaways()
