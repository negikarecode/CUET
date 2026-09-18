import json
import re

with open("qa-flags.json") as f:
    flags = json.load(f)

len_flags = [x for x in flags if "EXTREME_LENGTH_BIAS" in x.get("qaFlags", [])]
print(f"Total length flags: {len(len_flags)}")

q_map = {}
for item in len_flags:
    s = item["subject"]
    m = item["mockId"]
    qid = item["questionId"]
    if qid not in q_map:
        with open(f"mock/{s}/{m}.json", "r", encoding="utf-8") as fp:
            data = json.load(fp)
        for q in data:
            q_map[q.get("questionId")] = (s, m, q)

ratios = []
high_risk = []
medium_risk = []
low_risk = []

for item in len_flags:
    qid = item["questionId"]
    s, m, q = q_map[qid]
    options = q.get("options", [])
    corr_opt = q.get("correctOption") or q.get("correctOptionId")
    
    corr_text = ""
    distractor_texts = []
    for o in options:
        if o.get("id") == corr_opt:
            corr_text = (o.get("text") or "").strip()
        else:
            distractor_texts.append((o.get("text") or "").strip())
            
    corr_len = len(corr_text)
    avg_dist_len = sum(len(dt) for dt in distractor_texts) / max(1, len(distractor_texts))
    ratio = corr_len / max(1, avg_dist_len)
    
    ratios.append(ratio)
    
    # Analyze heuristic risk:
    # Does the correct option have appended parenthetical definitions?
    has_parens = bool(re.search(r'\(.*?\)', corr_text)) and not any(re.search(r'\(.*?\)', dt) for dt in distractor_texts)
    # Is ratio > 3.5?
    if ratio >= 3.5:
        high_risk.append((qid, s, m, ratio, corr_len, avg_dist_len, corr_text, distractor_texts))
    elif ratio >= 2.8 or has_parens:
        medium_risk.append((qid, s, m, ratio, corr_len, avg_dist_len, corr_text, distractor_texts))
    else:
        low_risk.append((qid, s, m, ratio, corr_len, avg_dist_len, corr_text, distractor_texts))

print(f"Ratio stats: Min={min(ratios):.2f}, Max={max(ratios):.2f}, Mean={sum(ratios)/len(ratios):.2f}")
print(f"High Risk (>= 3.5x): {len(high_risk)}")
print(f"Medium Risk (2.8x - 3.5x): {len(medium_risk)}")
print(f"Low Risk (< 2.8x): {len(low_risk)}")

if high_risk:
    print("\nHigh risk items:")
    for h in high_risk[:5]:
        print(f"[{h[0]}] {h[1]} M{h[2]}: Ratio={h[3]:.2f}, CorrLen={h[4]}, AvgDistLen={h[5]:.1f}")
        print(f"  Corr: {h[6]}")
        print(f"  Dists: {h[7]}")
