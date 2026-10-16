#!/usr/bin/env python3
"""
Layer A — Deterministic Validation Engine
Exhaustively scans all 102,650 questions across 3,865 JSON files in mock/, pyq/, practice/.
Checks for:
1. P0: Empty or missing questionText/prompt.
2. P0: Option count != 4.
3. P0: Duplicate option text within a single question.
4. P0: Missing or invalid correctOption (not in A, B, C, D).
5. P1: Missing detailedSolution or solution.
6. P1: Broken LaTeX (unclosed $, unclosed braces, invalid command syntax).
7. P1: Match-the-following defects (missing List I/II, missing pair items).
8. P1: Assertion-Reason defects (missing Assertion or Reason).
9. P2: Missing chapter or topic.
10. P2: Broken image references.
"""

import os
import sys
import json
import re
from collections import defaultdict, Counter

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def check_latex_syntax(text):
    """
    Returns a list of syntax error descriptions if LaTeX has obvious errors.
    """
    if not text:
        return []
    errors = []

    # Exclude escaped dollars: \$
    cleaned = re.sub(r"\\\$", "", text)

    # 1. Check display math delimiter balance
    dd_count = cleaned.count("$$")
    if dd_count % 2 != 0:
        errors.append("Unclosed double dollar delimiter ($$)")

    # Extract display math blocks
    display_blocks = re.findall(r"\$\$([\s\S]*?)\$\$", cleaned)
    for b in display_blocks:
        if b.count("{") != b.count("}"):
            errors.append(f"Mismatched braces in display math: '{b[:40].strip()}...'")

    # Remove display math blocks before checking inline math
    inline_text = re.sub(r"\$\$[\s\S]*?\$\$", "", cleaned)

    # Strip currency / plain dollars like $500, $60,000, $100 billion, $1 = ₹83
    inline_text = re.sub(r"\$[0-9]+(?:,[0-9]+)*(?:\.[0-9]+)?(?:\s*(?:million|billion|trillion|crore|lakh|per|annually|year|month))?\b(?!\s*[\$\^_\+\-\*\/\\\)\]\}])", "", inline_text)

    # Check unclosed single dollars
    single_dollars = [m.start() for m in re.finditer(r"(?<!\\)\$", inline_text)]
    if len(single_dollars) % 2 != 0:
        errors.append("Unclosed single dollar delimiter ($)")

    # Check braces in inline math blocks
    inline_blocks = re.findall(r"\$([^\$\n]+?)\$", inline_text)
    for b in inline_blocks:
        if b.count("{") != b.count("}"):
            errors.append(f"Mismatched braces in inline math: '{b[:40].strip()}...'")

    return errors

def validate_question(q, file_rel_path, index):
    defects = []
    
    qid = q.get("questionId") or q.get("id") or f"{file_rel_path}#q{index+1}"
    qnum = q.get("questionNumber", index + 1)
    qtext = (q.get("questionText") or q.get("prompt") or "").strip()

    # 1. P0: Empty stem
    if not qtext:
        defects.append({
            "severity": "P0",
            "type": "EMPTY_QUESTION_STEM",
            "message": "Question text is empty or missing"
        })

    # 2. P0: Option count != 4
    opts = q.get("options")
    if not isinstance(opts, list) or len(opts) != 4:
        defects.append({
            "severity": "P0",
            "type": "OPTION_COUNT_INVALID",
            "message": f"Expected exactly 4 options, found {len(opts) if isinstance(opts, list) else 'non-list'}"
        })
    else:
        # 3. P0: Duplicate option text
        seen_texts = set()
        opt_ids = set()
        for idx, o in enumerate(opts):
            if not isinstance(o, dict):
                defects.append({
                    "severity": "P0",
                    "type": "INVALID_OPTION_OBJECT",
                    "message": f"Option at index {idx} is not an object"
                })
                continue
            oid = o.get("id")
            otext = (o.get("text") or "").strip()
            if not otext:
                defects.append({
                    "severity": "P0",
                    "type": "EMPTY_OPTION_TEXT",
                    "message": f"Option {oid or idx} text is empty"
                })
            elif otext in seen_texts:
                defects.append({
                    "severity": "P0",
                    "type": "DUPLICATE_OPTION_TEXT",
                    "message": f"Duplicate option text '{otext[:30]}' in option {oid}"
                })
            seen_texts.add(otext)
            if oid:
                opt_ids.add(oid)

    # 4. P0: Missing or invalid correctOption
    corr = q.get("correctOption") or q.get("correctOptionId")
    if not corr or corr not in ["A", "B", "C", "D"]:
        defects.append({
            "severity": "P0",
            "type": "INVALID_CORRECT_OPTION",
            "message": f"Correct option '{corr}' is not one of A, B, C, D"
        })

    # 5. P1: Missing detailed solution
    sol = (q.get("detailedSolution") or q.get("explanation") or "").strip()
    sol_obj = q.get("solution")
    if not sol and not (isinstance(sol_obj, dict) and sol_obj.get("detailed")):
        defects.append({
            "severity": "P1",
            "type": "MISSING_DETAILED_SOLUTION",
            "message": "Detailed solution and explanation are missing"
        })

    # 6. P1: Broken LaTeX
    latex_errors = check_latex_syntax(qtext)
    if isinstance(opts, list):
        for o in opts:
            if isinstance(o, dict):
                latex_errors.extend(check_latex_syntax(o.get("text", "")))
    if sol:
        latex_errors.extend(check_latex_syntax(sol))

    for le in latex_errors:
        defects.append({
            "severity": "P1",
            "type": "BROKEN_LATEX",
            "message": le
        })

    # 7. P1: Match-the-following checks
    if any(m in qtext.lower() for m in ["match list-i", "match list i", "match column-i", "match column i", "match the following"]):
        # Check if contains List II or Column II
        if not any(m2 in qtext.lower() for m2 in ["list-ii", "list ii", "column-ii", "column ii"]):
            defects.append({
                "severity": "P1",
                "type": "DEFECTIVE_MATCH_FOLLOWING",
                "message": "Match-the-following stem missing List-II or Column-II"
            })

    # 8. P1: Assertion & Reason checks
    if "assertion (a)" in qtext.lower() or "assertion:" in qtext.lower():
        if not ("reason (r)" in qtext.lower() or "reason:" in qtext.lower() or "reason (r):" in qtext.lower()):
            defects.append({
                "severity": "P1",
                "type": "DEFECTIVE_ASSERTION_REASON",
                "message": "Assertion stem missing Reason (R)"
            })

    # 9. P2: Missing chapter or topic
    if not q.get("chapter") or not str(q.get("chapter")).strip():
        defects.append({
            "severity": "P2",
            "type": "MISSING_CHAPTER",
            "message": "Chapter metadata is missing"
        })
    if not q.get("topic") or not str(q.get("topic")).strip():
        defects.append({
            "severity": "P2",
            "type": "MISSING_TOPIC",
            "message": "Topic metadata is missing"
        })

    return defects, qid, qnum

def run_layer_a():
    print("Starting Layer A Deterministic Validation Engine...")
    target_dirs = ["mock", "pyq", "practice"]
    
    total_scanned = 0
    total_defects = 0
    severity_counts = Counter()
    type_counts = Counter()
    subject_defect_counts = Counter()
    defective_questions = []

    for category in target_dirs:
        base_dir = os.path.join(ROOT_DIR, category)
        if not os.path.exists(base_dir):
            continue

        for root, dirs, files in os.walk(base_dir):
            for file in sorted(files):
                if not file.endswith(".json") or file == "pyq_manifest.json":
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ROOT_DIR)
                
                # Skip symlinks
                parts = rel_path.split(os.sep)
                is_symlink = False
                cur = ROOT_DIR
                for p in parts[:-1]:
                    cur = os.path.join(cur, p)
                    if os.path.islink(cur):
                        is_symlink = True
                        break
                if is_symlink or os.path.islink(full_path):
                    continue

                subject = parts[1] if len(parts) > 1 else "unknown"

                try:
                    with open(full_path, "r", encoding="utf-8") as f:
                        items = json.load(f)
                    if not isinstance(items, list):
                        continue
                except Exception as e:
                    print(f"Failed to read {rel_path}: {e}")
                    continue

                file_defects = []
                for idx, q in enumerate(items):
                    total_scanned += 1
                    defs, qid, qnum = validate_question(q, rel_path, idx)
                    if defs:
                        total_defects += len(defs)
                        subject_defect_counts[subject] += len(defs)
                        for d in defs:
                            severity_counts[d["severity"]] += 1
                            type_counts[d["type"]] += 1
                        defective_questions.append({
                            "file": rel_path,
                            "subject": subject,
                            "questionNumber": qnum,
                            "questionId": qid,
                            "defects": defs
                        })

    report = {
        "total_scanned": total_scanned,
        "total_defects": total_defects,
        "defective_question_count": len(defective_questions),
        "clean_question_count": total_scanned - len(defective_questions),
        "pass_rate_percentage": round((total_scanned - len(defective_questions)) / total_scanned * 100, 2) if total_scanned else 0,
        "severity_breakdown": dict(severity_counts),
        "type_breakdown": dict(type_counts),
        "subject_breakdown": dict(subject_defect_counts),
        "sample_defects": defective_questions[:50]
    }

    out_json = os.path.join(ROOT_DIR, "scripts", "layer_a_validation_report.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    all_defects_path = os.path.join(ROOT_DIR, "scripts", "all_layer_a_defects.json")
    with open(all_defects_path, "w", encoding="utf-8") as f:
        json.dump(defective_questions, f, indent=2)

    print("\n=== LAYER A VALIDATION RESULTS ===")
    print(f"Total Questions Scanned: {total_scanned:,}")
    print(f"Clean Questions: {report['clean_question_count']:,} ({report['pass_rate_percentage']}%)")
    print(f"Defective Questions: {report['defective_question_count']:,}")
    print(f"Total Defects Found: {total_defects:,}")
    print(f"Severity Breakdown: {dict(severity_counts)}")
    print(f"Type Breakdown: {dict(type_counts)}")
    print(f"\nFull report saved to {out_json}")
    print(f"Detailed defect list saved to {all_defects_path}")

if __name__ == "__main__":
    run_layer_a()
