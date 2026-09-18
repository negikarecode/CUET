import json
import os
import re
from collections import Counter

subjects = [
    "physics", "chemistry", "maths", "bio", "accs",
    "eco", "bst", "history", "pol science", "geo", "psychology"
]

total_questions = 0
explanations = []
explanation_texts = {}
stale_option_letters = []
generic_explanations = []
short_explanations = []

for s in subjects:
    for m in range(1, 21):
        fpath = f"mock/{s}/{m}.json"
        if not os.path.exists(fpath): continue
        with open(fpath, "r", encoding="utf-8") as fp:
            data = json.load(fp)
            
        for q in data:
            total_questions += 1
            qid = q.get("questionId")
            sol = q.get("detailedSolution") or ""
            quick = (q.get("solution") or {}).get("quick", "")
            conc = (q.get("solution") or {}).get("concept", "")
            det = (q.get("solution") or {}).get("detailed", "")
            full = f"{sol} {quick} {conc} {det}".strip()
            
            corr = q.get("correctOption") or q.get("correctOptionId")
            
            explanations.append(full)
            norm_full = re.sub(r'\s+', ' ', full.lower())
            explanation_texts[qid] = norm_full
            
            # Check length
            if len(full) < 40:
                short_explanations.append((qid, full))
                
            # Check for generic filler like "Correct answer" only
            if norm_full in ["correct answer.", "correct option.", "the answer is correct.", ""]:
                generic_explanations.append((qid, full))
                
            # Check for stale option letters
            concl_matches = re.finditer(r'(?:Hence,?\s+(?:Option\s+)?|Therefore,?\s+(?:Option\s+)?|Thus,?\s+(?:Option\s+)?|Correct\s+option\s+is\s+|In\s+option\s+)([A-D])\b', full, re.IGNORECASE)
            for cm in concl_matches:
                mentioned = cm.group(1).upper()
                snip = full[max(0, cm.start()-15):min(len(full), cm.end()+35)].replace('\n', ' ')
                if any(w in snip.lower() for w in ["incorrect", "wrong", "false", "cannot be", "rejected"]):
                    continue
                if "is correct" in snip.lower() or "in option" in snip.lower():
                    if mentioned != corr:
                        stale_option_letters.append((qid, mentioned, corr, snip))

# Check exact duplicate explanations
counts = Counter(explanations)
exact_duplicates = sum(count - 1 for text, count in counts.items() if count > 1)

print(f"Total Explanations Audited: {total_questions}")
print(f"Exact Duplicate Explanations: {exact_duplicates}")
print(f"Short Explanations (<40 chars): {len(short_explanations)}")
print(f"Generic Filler Explanations: {len(generic_explanations)}")
print(f"Stale Option Letter Contradictions: {len(stale_option_letters)}")

if stale_option_letters:
    print("\nStale option letters found:")
    for sol in stale_option_letters:
        print(sol)
