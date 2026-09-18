import json
import os

subjects = [
    "physics", "chemistry", "maths", "bio", "accs",
    "eco", "bst", "history", "pol science", "geo", "psychology"
]

with open("qa-flags.json", "r", encoding="utf-8") as f:
    flags = json.load(f)
flagged_qids = set(x["questionId"] for x in flags)

human_queue = []

for s in subjects:
    candidates = []
    for m in range(1, 21):
        fpath = f"mock/{s}/{m}.json"
        if not os.path.exists(fpath): continue
        with open(fpath, "r", encoding="utf-8") as fp:
            data = json.load(fp)
            
        for q in data:
            qid = q.get("questionId")
            diff = q.get("difficulty", 2)
            q_type = q.get("questionType", "conceptual")
            has_diag = q.get("hasDiagram", False)
            prompt = q.get("questionText", "")
            
            # Score candidates by priority:
            # 1. Level 4 / 3
            # 2. Case study or diagram
            # 3. Direct numerical
            # 4. Previously flagged
            priority_score = 0
            reasons = []
            
            if qid in flagged_qids:
                priority_score += 10
                reasons.append("Previously Flagged in Editorial QA")
            if diff == 4:
                priority_score += 8
                reasons.append("High Cognitive Difficulty (Level 4)")
            elif diff == 3:
                priority_score += 5
                reasons.append("Cognitive Difficulty (Level 3)")
            if q_type == "case-based":
                priority_score += 6
                reasons.append("Case Study / Passage Context")
            elif q_type == "direct-numerical":
                priority_score += 5
                reasons.append("Numerical Calculation")
            elif has_diag:
                priority_score += 5
                reasons.append("Diagram / Graphical Representation")
                
            candidates.append({
                "score": priority_score,
                "reasons": reasons,
                "question": q,
                "mockId": m,
                "subject": s
            })
            
    # Sort candidates by score descending and diversify across mocks
    candidates.sort(key=lambda x: x["score"], reverse=True)
    
    # Pick top 10 ensuring mock diversification
    selected_for_sub = []
    used_mocks = set()
    for c in candidates:
        if len(selected_for_sub) == 10: break
        m_id = c["mockId"]
        if m_id not in used_mocks:
            selected_for_sub.append(c)
            used_mocks.add(m_id)
            
    # If fewer than 10 due to mock constraint, pick next highest
    if len(selected_for_sub) < 10:
        for c in candidates:
            if len(selected_for_sub) == 10: break
            if c not in selected_for_sub:
                selected_for_sub.append(c)
                
    for item in selected_for_sub:
        q = item["question"]
        human_queue.append({
            "questionId": q.get("questionId"),
            "subject": item["subject"],
            "mockId": item["mockId"],
            "chapter": q.get("chapter"),
            "topic": q.get("topic"),
            "difficulty": q.get("difficulty"),
            "questionType": q.get("questionType"),
            "questionText": q.get("questionText"),
            "options": q.get("options"),
            "correctOptionId": q.get("correctOption") or q.get("correctOptionId"),
            "detailedSolution": q.get("detailedSolution"),
            "reviewStatus": "HUMAN_REVIEW_REQUIRED",
            "priorityScore": item["score"],
            "priorityReasons": item["reasons"],
            "editorialGuideline": "Expert human subject matter verification of academic rigor, conceptual clarity, distractor plausibility, and NCERT alignment."
        })

print(f"Total human review queue items created: {len(human_queue)}")
subject_counts = {}
for q in human_queue:
    subject_counts[q["subject"]] = subject_counts.get(q["subject"], 0) + 1
print("Counts by subject:", subject_counts)

with open("qa-human-review-queue.json", "w", encoding="utf-8") as out:
    json.dump(human_queue, out, indent=2, ensure_ascii=False)
print("Saved to qa-human-review-queue.json")
