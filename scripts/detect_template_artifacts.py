import os
import json
import re
from collections import Counter

mock_dir = "mock"
subjects = [
    "physics", "chemistry", "maths", "bio", "accs",
    "eco", "bst", "history", "pol science", "geo", "psychology"
]

placeholders = []
awkward_patterns = []
repeated_starts = Counter()
fake_names = []

SUSPICIOUS_TERMS = [
    "todo", "placeholder", "insert here", "lorem ipsum", "foo bar", "foobar",
    "replace this", "dummy", "test question", "sample question text"
]

FAKE_NAME_TERMS = [
    "john doe", "jane doe", "alice and bob", "foo corp", "bar ltd"
]

total_qs = 0

for s in subjects:
    s_dir = os.path.join(mock_dir, s)
    for m in range(1, 21):
        fpath = os.path.join(s_dir, f"{m}.json")
        if not os.path.exists(fpath): continue
        with open(fpath, "r", encoding="utf-8") as fp:
            data = json.load(fp)
            
        for q in data:
            total_qs += 1
            qid = q.get("questionId")
            text = (q.get("questionText") or "").strip()
            text_lower = text.lower()
            
            # Check placeholders
            for term in SUSPICIOUS_TERMS:
                if term in text_lower:
                    placeholders.append((qid, term, text[:100]))
                    
            for term in FAKE_NAME_TERMS:
                if term in text_lower:
                    fake_names.append((qid, term, text[:100]))
                    
            # Check opening 4 words
            words = text.split()[:4]
            if len(words) >= 4:
                prefix = " ".join(words).lower()
                repeated_starts[prefix] += 1

print(f"Total Questions Audited for Template Artifacts: {total_qs}")
print(f"Placeholders Found: {len(placeholders)}")
print(f"Fake / Generic Names Found: {len(fake_names)}")
print("\nTop 10 Most Common Opening Phrases:")
for p, cnt in repeated_starts.most_common(10):
    print(f"  '{p}': {cnt} occurrences")

if placeholders:
    print("\nPlaceholders detail:")
    for p in placeholders:
        print(p)
if fake_names:
    print("\nFake names detail:")
    for f in fake_names:
        print(f)
