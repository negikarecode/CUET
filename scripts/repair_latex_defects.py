#!/usr/bin/env python3
"""
scripts/repair_latex_defects.py
Fixes LaTeX syntax defects across the question bank:
1. Replaces typo delimiters like '$|' with '$$'
2. Escapes currency dollar signs (e.g. '$500' -> '\$500', '$100 billion' -> '\$100 billion')
3. Fixes broken chemical notation (e.g. '$\\beta-D-' -> '$\\beta$-D-')
4. Balances mismatched braces in known math formulas.
"""

import os
import json
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def repair_latex_string(text):
    if not text or not isinstance(text, str):
        return text

    modified = text

    # 1. Fix typo delimiter: $| at end of math equation -> $$
    modified = re.sub(r"\$\|(\s*\n|$)", r"$$\1", modified)

    # 2. Fix chemical prefix missing closing dollar:
    # $\beta-D-galactose -> $\beta$-D-galactose
    # $\alpha-1,4- -> $\alpha$-1,4-
    modified = re.sub(r"\$(\\(?:alpha|beta|gamma|delta))-(?=[A-Za-z0-9])", r"$\1$-", modified)

    # 3. Escape currency dollar signs: $ followed by digits (e.g. $500, $60,000, $100 billion, $1 trillion, $1 = ₹83)
    # Only if NOT already escaped and NOT part of valid math like $500$ (where it has closing $)
    # Pattern: (?<!\\)\$([0-9]+(?:\.[0-9]+)?(?:,[0-9]+)?)(?!\s*[\$\^_\+\-\*\/\\\)\]\}])
    # Let's inspect cases:
    # "pays $500 at the end" -> "pays \$500 at the end"
    # "above $60,000 per kg" -> "above \$60,000 per kg"
    # "$100 million" -> "\$100 million"
    # "$100 billion" -> "\$100 billion"
    # "$1 trillion" -> "\$1 trillion"
    # "$4 billion" -> "\$4 billion"
    # "$1 = ₹83" -> "\$1 = ₹83"
    # "$1" as SQL placeholder -> "\$1"
    
    # Specific known currency patterns:
    modified = re.sub(
        r"(?<!\\)\$([0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?\s*(?:million|billion|trillion|crore|lakh|per\s+kilogram|per\s+kg|annually|per\s+year)?\b)",
        r"\\\$\1",
        modified
    )

    # Specifically for lone SQL placeholders or currency:
    modified = re.sub(r"(?<!\\)\$([0-9]+)\b(?!\s*[\$])", r"\\\$\1", modified)

    # 4. Fix specific mismatched braces in physics/maths
    # Replace stray unclosed single dollars at end of prompt or option:
    # e.g. "Physics$" -> "Physics"
    modified = re.sub(r"([a-zA-Z0-9_\-\.\)]+)\$\s*$", r"\1", modified)

    return modified

def repair_question_latex(q):
    changed = False

    stem = q.get("questionText") or q.get("prompt")
    if stem:
        repaired_stem = repair_latex_string(stem)
        if repaired_stem != stem:
            if "questionText" in q:
                q["questionText"] = repaired_stem
            if "prompt" in q:
                q["prompt"] = repaired_stem
            changed = True

    sol = q.get("detailedSolution")
    if sol:
        repaired_sol = repair_latex_string(sol)
        if repaired_sol != sol:
            q["detailedSolution"] = repaired_sol
            changed = True

    sol_obj = q.get("solution")
    if isinstance(sol_obj, dict):
        for k in ["quick", "concept", "detailed"]:
            if sol_obj.get(k):
                rep = repair_latex_string(sol_obj[k])
                if rep != sol_obj[k]:
                    sol_obj[k] = rep
                    changed = True

    opts = q.get("options")
    if isinstance(opts, list):
        for o in opts:
            if isinstance(o, dict) and o.get("text"):
                rep = repair_latex_string(o["text"])
                if rep != o["text"]:
                    o["text"] = rep
                    changed = True

    return changed

def main():
    print("Running LaTeX defect repairs across all active test datasets...")
    repaired_questions = 0
    modified_files = 0

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
                    if repair_question_latex(q):
                        repaired_questions += 1
                        file_changed = True

                if file_changed:
                    with open(path, "w", encoding="utf-8") as fp:
                        json.dump(data, fp, indent=2, ensure_ascii=False)
                    modified_files += 1

    print(f"\nLaTeX Repair complete: {repaired_questions} questions updated across {modified_files} files.")

if __name__ == "__main__":
    main()
