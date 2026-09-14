#!/usr/bin/env python3
import json
import os
import re
import sys
from collections import defaultdict

def normalize_text(text):
    if not text:
        return ""
    t = text.lower()
    t = re.sub(r"\[cite:[^\]]+\]", "", t)
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    t = re.sub(r"[\$\\\{\}\(\)\[\]_^\s\.,;:\-\+=\*\/<>]+", "", t)
    return t

def check_subject(subj):
    subj_dir = f"./mock/{subj}"
    if not os.path.exists(subj_dir):
        print(f"Directory {subj_dir} not found!")
        return False

    seen = {}
    dupes = []
    total = 0
    errors = []

    for m in range(1, 21):
        p = f"{subj_dir}/{m}.json"
        if not os.path.exists(p):
            errors.append(f"Mock file {p} does not exist!")
            continue
        try:
            with open(p, "r", encoding="utf-8") as f:
                qs = json.load(f)
        except Exception as e:
            errors.append(f"JSON error in {p}: {e}")
            continue

        if not isinstance(qs, list) or len(qs) != 50:
            errors.append(f"Mock {m} has {len(qs) if isinstance(qs, list) else 'invalid'} questions instead of 50!")

        for q in qs:
            total += 1
            qn = q.get("questionNumber")
            raw_t = q.get("questionText", "")
            norm = normalize_text(raw_t)
            
            # Check required fields
            if not q.get("options") or len(q.get("options", [])) != 4:
                errors.append(f"Mock {m} Q{qn} does not have 4 options!")
            if q.get("correctOption") not in ["A", "B", "C", "D"]:
                errors.append(f"Mock {m} Q{qn} invalid correctOption: {q.get('correctOption')}")
            if not q.get("chapter") or not q.get("topic"):
                errors.append(f"Mock {m} Q{qn} missing chapter or topic!")

            if norm in seen:
                orig_m, orig_qn = seen[norm]
                dupes.append((m, qn, orig_m, orig_qn, raw_t[:70]))
            else:
                seen[norm] = (m, qn)

    print(f"\n=== RESULTS FOR {subj.upper()} ===")
    print(f"Total questions: {total}")
    print(f"Format/Schema errors: {len(errors)}")
    for err in errors[:10]:
        print(f"  [ERROR] {err}")
    print(f"Duplicate question instances: {len(dupes)}")
    for m, qn, om, oqn, txt in dupes[:15]:
        print(f"  [DUPLICATE] Mock {m} Q{qn} is a duplicate of Mock {om} Q{oqn}: {txt}...")
    if len(dupes) > 15:
        print(f"  ... and {len(dupes) - 15} more duplicates.")

    if len(errors) == 0 and len(dupes) == 0:
        print(f"\nSUCCESS: All 20 mocks in {subj} are 100% unique and valid!\n")
        return True
    else:
        print(f"\nFAILED: {len(dupes)} duplicates and {len(errors)} errors found in {subj}.\n")
        return False

if __name__ == "__main__":
    subj = sys.argv[1] if len(sys.argv) > 1 else "maths"
    success = check_subject(subj)
    sys.exit(0 if success else 1)
