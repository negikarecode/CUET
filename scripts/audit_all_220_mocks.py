import os
import json
from collections import Counter

mock_dir = "mock"
subjects = [
    "physics", "chemistry", "maths", "bio", "accs",
    "eco", "bst", "history", "pol science", "geo", "psychology"
]

deviations = []
total_mocks = 0

for s in subjects:
    s_dir = os.path.join(mock_dir, s)
    for m in range(1, 21):
        total_mocks += 1
        fpath = os.path.join(s_dir, f"{m}.json")
        with open(fpath, "r", encoding="utf-8") as fp:
            data = json.load(fp)
        
        q_count = len(data)
        chapters = set(q.get("chapter") for q in data if q.get("chapter"))
        diffs = Counter(q.get("difficulty") for q in data)
        types = Counter(q.get("questionType") for q in data)
        keys = Counter(q.get("correctOption") or q.get("correctOptionId") for q in data)
        
        # Validation checks against NTA CUET 2026 blueprint
        mock_issues = []
        if q_count != 50:
            mock_issues.append(f"Question count is {q_count} instead of 50")
        
        if len(chapters) < 6:
            mock_issues.append(f"Narrow chapter coverage: only {len(chapters)} distinct chapters")
        
        # Check answer key balance per mock (no single key >= 25)
        for k, cnt in keys.items():
            if cnt >= 25:
                mock_issues.append(f"Answer key bias: option {k} has {cnt}/50 questions")
        
        if mock_issues:
            deviations.append({
                "subject": s,
                "mockId": m,
                "issues": mock_issues,
                "chaptersCount": len(chapters),
                "keys": dict(keys),
                "diffs": dict(diffs)
            })

print(f"Total Mocks Audited: {total_mocks}")
print(f"Mocks with Material Deviations: {len(deviations)}")
if deviations:
    for d in deviations:
        print(f"  [{d['subject']} Mock {d['mockId']}]: {d['issues']}")
else:
    print("  ✅ All 220 mocks strictly adhere to 50 questions, broad chapter coverage, and balanced answer keys.")
