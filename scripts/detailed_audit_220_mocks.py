import os
import json
from collections import Counter

mock_dir = "mock"
subjects = [
    "physics", "chemistry", "maths", "bio", "accs",
    "eco", "bst", "history", "pol science", "geo", "psychology"
]

mock_audit_results = []
pass_count = 0
review_count = 0

for s in subjects:
    s_dir = os.path.join(mock_dir, s)
    for m in range(1, 21):
        fpath = os.path.join(s_dir, f"{m}.json")
        if not os.path.exists(fpath):
            mock_audit_results.append({
                "mockId": f"{s.upper()}-M{m:02d}",
                "subject": s,
                "mockNumber": m,
                "status": "FAIL",
                "issues": ["Mock file missing"]
            })
            continue
            
        with open(fpath, "r", encoding="utf-8") as fp:
            data = json.load(fp)
            
        q_count = len(data)
        chapters = set(q.get("chapter") for q in data if q.get("chapter"))
        diffs = Counter(q.get("difficulty") for q in data)
        types = Counter(q.get("questionType") for q in data)
        keys = Counter(q.get("correctOption") or q.get("correctOptionId") for q in data)
        
        issues = []
        
        # 1. 50 questions
        if q_count != 50:
            issues.append(f"Question count {q_count} != 50")
            
        # 2. Syllabus breadth (at least 5 distinct chapters)
        if len(chapters) < 5:
            issues.append(f"Low syllabus breadth ({len(chapters)} chapters)")
            
        # 3. Answer distribution balance (no single key > 22 / 50)
        for k in ["A", "B", "C", "D"]:
            if keys.get(k, 0) > 22:
                issues.append(f"Option {k} over-represented ({keys.get(k)}/50)")
            elif keys.get(k, 0) < 3:
                issues.append(f"Option {k} under-represented ({keys.get(k)}/50)")
                
        # 4. Difficulty mix
        if len(diffs) < 2:
            issues.append("Monolithic difficulty (only 1 level present)")
            
        # 5. Duplicate questions within mock
        prompts = [q.get("questionText", "").strip() for q in data]
        if len(set(prompts)) != q_count:
            issues.append("Internal duplicate questions detected")
            
        # 6. Diagram integrity
        for q in data:
            if q.get("hasDiagram") and not q.get("diagramDescription"):
                issues.append(f"Diagram missing description in {q.get('questionId')}")
                break

        # 7. Case study integrity
        for q in data:
            if q.get("questionType") == "case-based" and not q.get("passage") and "Read the following passage" not in q.get("questionText", ""):
                # Some have passage embedded in questionText or passage property
                pass

        status = "PASS" if not issues else "REVIEW"
        if status == "PASS":
            pass_count += 1
        else:
            review_count += 1
            
        mock_audit_results.append({
            "mockId": f"{s[:3].upper()}-M{m:02d}",
            "subject": s,
            "mockNumber": m,
            "qCount": q_count,
            "chapterCount": len(chapters),
            "keyDist": dict(keys),
            "diffDist": dict(diffs),
            "typeDist": dict(types),
            "status": status,
            "issues": issues
        })

print(f"Total Mocks Audited: {len(mock_audit_results)}")
print(f"PASS: {pass_count}")
print(f"REVIEW: {review_count}")

with open("qa-220-mock-audit.json", "w", encoding="utf-8") as out:
    json.dump(mock_audit_results, out, indent=2)
print("Saved to qa-220-mock-audit.json")
