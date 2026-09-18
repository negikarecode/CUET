import json
import re

with open("qa-flags.json") as f:
    flags = json.load(f)

num_flags = [x for x in flags if "POTENTIAL_OVERLAPPING_NUMERICAL_OPTIONS" in x.get("qaFlags", [])]
print(f"Total numerical flags: {len(num_flags)}")

q_map = {}
for item in num_flags:
    s = item["subject"]
    m = item["mockId"]
    qid = item["questionId"]
    if qid not in q_map:
        with open(f"mock/{s}/{m}.json") as fp:
            data = json.load(fp)
        for q in data:
            q_map[q.get("questionId")] = q

sample_indices = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 680]
for idx in sample_indices:
    item = num_flags[idx]
    qid = item["questionId"]
    q = q_map.get(qid)
    subj = item["subject"]
    print(f"\n--- [{idx}] {qid} ({subj}) ---")
    print("Q:", q.get("questionText")[:120], "...")
    for o in q.get("options", []):
        mark = "*" if o.get("isCorrect") else " "
        print(f"  [{o.get('id')}] {mark} {o.get('text')}")
