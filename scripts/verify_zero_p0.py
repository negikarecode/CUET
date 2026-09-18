import os
import json
import re

mock_dir = "mock"
subjects = [
    "physics", "chemistry", "maths", "bio", "accs",
    "eco", "bst", "history", "pol science", "geo", "psychology"
]

p0_issues = []
p1_issues = []
p2_issues = []

total_audited = 0

for s in subjects:
    s_dir = os.path.join(mock_dir, s)
    for m in range(1, 21):
        fpath = os.path.join(s_dir, f"{m}.json")
        if not os.path.exists(fpath): continue
        with open(fpath, "r", encoding="utf-8") as fp:
            data = json.load(fp)
            
        for q in data:
            total_audited += 1
            qid = q.get("questionId")
            options = q.get("options", [])
            corr = q.get("correctOption") or q.get("correctOptionId")
            text = q.get("questionText", "").strip()
            
            # P0: Wrong / Multiple / No answer
            correct_opts = [o for o in options if o.get("isCorrect") is True]
            if len(correct_opts) != 1:
                p0_issues.append((qid, f"Multiple or zero correct options: {len(correct_opts)}"))
            elif correct_opts[0].get("id") != corr:
                p0_issues.append((qid, f"Key mismatch: declared {corr} vs isCorrect {correct_opts[0].get('id')}"))
                
            if len(options) != 4:
                p0_issues.append((qid, f"Option count is {len(options)} instead of 4"))
                
            # P0: Stale letter contradiction in solution
            sol = f"{q.get('detailedSolution', '')} {json.dumps(q.get('solution', {}))}"
            concl_matches = re.finditer(r'(?:Hence,?\s+(?:Option\s+)?|Therefore,?\s+(?:Option\s+)?|Thus,?\s+(?:Option\s+)?|Correct\s+option\s+is\s+|In\s+option\s+)([A-D])\b', sol, re.IGNORECASE)
            for cm in concl_matches:
                mentioned = cm.group(1).upper()
                snip = sol[max(0, cm.start()-15):min(len(sol), cm.end()+35)].replace('\n', ' ')
                if any(w in snip.lower() for w in ["incorrect", "wrong", "false", "cannot be", "rejected"]):
                    continue
                if "is correct" in snip.lower() or "in option" in snip.lower():
                    if mentioned != corr:
                        p0_issues.append((qid, f"Explanation letter contradiction: mentions {mentioned} but key is {corr}"))
                        break

            # P1: Missing explanation or empty question text
            if not text:
                p1_issues.append((qid, "Empty questionText"))
            if not q.get("detailedSolution") and not q.get("solution"):
                p1_issues.append((qid, "Missing solution object"))

print(f"Total Questions Audited for P0/P1: {total_audited}")
print(f"P0 Critical Errors: {len(p0_issues)}")
print(f"P1 Major Errors: {len(p1_issues)}")

if p0_issues:
    print("\nP0 issues detail:")
    for p in p0_issues:
        print(p)
if p1_issues:
    print("\nP1 issues detail:")
    for p in p1_issues:
        print(p)
