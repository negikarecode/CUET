#!/usr/bin/env python3
"""
scripts/repair_match_headers.py
Normalizes OCR header artifacts in match-the-following questions:
- Strips OCR scanning noise at the start (e.g. 'L=—— eee O78', '°')
- Standardizes 'List-I' and 'List-II' headers
- Fixes OCR typos like List-I1, List-Il, List-ll, List-It, List-IL, List-IT
- Fixes mock/maths/12.json Q50 prompt
"""

import os
import json
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def clean_stem_headers(text):
    if not text:
        return text

    modified = text

    # Special case: mock/maths/12.json Q50
    if "derivative–integral identity" in modified or "derivative-integral identity" in modified:
        modified = re.sub(
            r"Match the following derivative[–-]integral identity and find the correct value of",
            r"Evaluate the derivative of the integral:",
            modified
        )
        return modified

    # Strip OCR scanning lines like L=—— eee O78
    modified = re.sub(r"^L=[—\-\s]*eee\s*O78\s*", "", modified, flags=re.MULTILINE)
    modified = re.sub(r"^°\s*", "", modified, flags=re.MULTILINE)

    # Standardize 'Match List-I with List-I' typos to 'Match List-I with List-II'
    modified = re.sub(r"Match List-I with List-I\b(?!\s*I)", "Match List-I with List-II", modified, flags=re.IGNORECASE)
    modified = re.sub(r"Match List-1 with List-1\b(?!\s*1)", "Match List-I with List-II", modified, flags=re.IGNORECASE)

    # Standardize List II typos
    # List-2, List-I1, List-Il, List-ll, List-It, List-IL, List-IT, List-(I1), List -II, List - II
    modified = re.sub(r"\b(?:List|Column)[\s\-–—]+(?:2|I1|Il|ll|It|IL|IT|\(I1\)|\(I1)\b", "List-II", modified)
    modified = re.sub(r"\bList\s+-[I|1]{2}\b", "List-II", modified)
    modified = re.sub(r"\bList\s*-\s*II\b", "List-II", modified)

    # Standardize List I typos
    # List -I, List-1, List-(1), List-l, lList-1, lList-I, IList-1, flise-1
    modified = re.sub(r"\b(?:[lI]List|flise)[\s\-–—]+(?:1|I|l|\(1\))\b", "List-I", modified)
    modified = re.sub(r"\bList\s+-[I|1]\b", "List-I", modified)
    modified = re.sub(r"\bList\s*-\s*I\b", "List-I", modified)
    modified = re.sub(r"\bList-1\b", "List-I", modified)

    return modified

def main():
    print("Repairing match-the-following stem header artifacts...")
    repaired_count = 0
    modified_files = set()

    for base in ["mock", "pyq", "practice"]:
        base_dir = os.path.join(ROOT_DIR, base)
        for root, dirs, files in os.walk(base_dir):
            for file in sorted(files):
                if not file.endswith(".json") or file == "pyq_manifest.json":
                    continue
                path = os.path.join(root, file)
                if os.path.islink(path):
                    continue

                try:
                    with open(path, "r", encoding="utf-8") as fp:
                        data = json.load(fp)
                except:
                    continue

                if not isinstance(data, list):
                    continue

                file_changed = False
                for q in data:
                    stem = q.get("questionText") or q.get("prompt")
                    if stem and "match" in stem.lower():
                        cleaned = clean_stem_headers(stem)
                        if cleaned != stem:
                            if "questionText" in q:
                                q["questionText"] = cleaned
                            if "prompt" in q:
                                q["prompt"] = cleaned
                            file_changed = True
                            repaired_count += 1

                if file_changed:
                    with open(path, "w", encoding="utf-8") as fp:
                        json.dump(data, fp, indent=2, ensure_ascii=False)
                    modified_files.add(path)

    print(f"Repaired {repaired_count} match question headers across {len(modified_files)} files.")

if __name__ == "__main__":
    main()
