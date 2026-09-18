import os
import json
import re
from collections import defaultdict

SUBJECTS = [
    ("physics", "mock/physics"),
    ("chemistry", "mock/chemistry"),
    ("maths", "mock/maths"),
    ("biology", "mock/bio"),
    ("accountancy", "mock/accs"),
    ("economics", "mock/eco"),
    ("business-studies", "mock/bst"),
    ("history", "mock/history"),
    ("political-science", "mock/pol science"),
    ("geography", "mock/geo"),
    ("psychology", "mock/psychology"),
]

def normalize_text(text):
    # Strip whitespace, punctuation, LaTeX delimiters
    t = text.lower()
    t = re.sub(r'[\$\\_{}\^]', '', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def get_tokens(text):
    norm = normalize_text(text)
    return set(re.findall(r'\b[a-z]{3,}\b', norm))

def jaccard_similarity(set1, set2):
    if not set1 or not set2:
        return 0.0
    return len(set1 & set2) / len(set1 | set2)

def detect_duplicates():
    print("=== MULTI-LEVEL DUPLICATE DETECTION ===")
    
    total_exact = 0
    total_near = 0
    
    for subj_name, subj_dir in SUBJECTS:
        questions = []
        for mock_num in range(1, 21):
            fpath = os.path.join(subj_dir, f"{mock_num}.json")
            if not os.path.exists(fpath):
                continue
            with open(fpath, "r", encoding="utf-8") as f:
                data = json.load(f)
            for q_idx, q in enumerate(data):
                q_text = q.get("questionText", "").strip()
                questions.append({
                    "mock": mock_num,
                    "qnum": q.get("questionNumber", q_idx + 1),
                    "text": q_text,
                    "norm": normalize_text(q_text),
                    "tokens": get_tokens(q_text),
                    "chapter": q.get("chapter", ""),
                    "topic": q.get("topic", "")
                })
        
        # 1. Exact normalized matches
        exact_map = defaultdict(list)
        for q in questions:
            exact_map[q["norm"]].append(q)
        
        exact_dupes = {k: v for k, v in exact_map.items() if len(v) > 1 and k}
        exact_count = len(exact_dupes)
        total_exact += exact_count
        
        # 2. Near duplicates (Jaccard > 0.88 within same chapter)
        near_pairs = []
        by_chapter = defaultdict(list)
        for q in questions:
            by_chapter[q["chapter"]].append(q)
            
        for chap, chap_qs in by_chapter.items():
            for i in range(len(chap_qs)):
                for j in range(i + 1, len(chap_qs)):
                    q1 = chap_qs[i]
                    q2 = chap_qs[j]
                    if q1["norm"] == q2["norm"]:
                        continue # handled by exact
                    sim = jaccard_similarity(q1["tokens"], q2["tokens"])
                    if sim >= 0.88:
                        near_pairs.append((q1, q2, sim))
                        
        total_near += len(near_pairs)
        print(f"[{subj_name.upper()}]: Total Qs={len(questions)} | Exact Dupes={exact_count} | Near Dupes (Jaccard >= 0.88)={len(near_pairs)}")
        if near_pairs:
            sample = near_pairs[0]
            print(f"   Sample near dupe ({sample[2]:.2f}): M{sample[0]['mock']} Q{sample[0]['qnum']} vs M{sample[1]['mock']} Q{sample[1]['qnum']}")
            print(f"   Q1: {sample[0]['text'][:80]}...")
            print(f"   Q2: {sample[1]['text'][:80]}...")

    print(f"\nTotal Exact Across All Subjects: {total_exact}")
    print(f"Total Near Pairs Across All Subjects: {total_near}")

if __name__ == "__main__":
    detect_duplicates()
