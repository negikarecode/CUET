#!/usr/bin/env python3
import os
import sys
import json
import sqlite3
import glob
from collections import defaultdict, Counter

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def scan_json_directory(base_dir):
    """
    Scans a directory containing JSON test files.
    Returns details on each test file and question.
    """
    results = {}
    if not os.path.exists(base_dir):
        return results

    for root, dirs, files in os.walk(base_dir):
        # Don't follow symlinks during os.walk to avoid double counting
        for file in sorted(files):
            if not file.endswith(".json") or file == "pyq_manifest.json":
                continue
            full_path = os.path.join(root, file)
            # check if path contains symlink component
            rel_path = os.path.relpath(full_path, ROOT_DIR)
            parts = rel_path.split(os.sep)
            
            # Check if any parent part is a symlink
            is_symlink = False
            cur = ROOT_DIR
            for p in parts[:-1]:
                cur = os.path.join(cur, p)
                if os.path.islink(cur):
                    is_symlink = True
                    break
            if is_symlink or os.path.islink(full_path):
                continue

            try:
                with open(full_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                if isinstance(data, list):
                    results[rel_path] = data
                elif isinstance(data, dict):
                    # might be wrapper object or questions list
                    if "questions" in data and isinstance(data["questions"], list):
                        results[rel_path] = data["questions"]
                    else:
                        results[rel_path] = data
            except Exception as e:
                print(f"Error reading {rel_path}: {e}", file=sys.stderr)
    return results

def analyze_questions(all_datasets):
    total_questions = 0
    subject_counts = defaultdict(lambda: {"mocks": 0, "pyqs": 0, "practice": 0, "total_questions": 0})
    schema_keys = Counter()
    question_types = Counter()
    difficulties = Counter()
    correct_option_distribution = Counter()
    diagram_count = 0
    math_count = 0
    table_count = 0
    match_count = 0
    all_q_ids = set()
    dup_q_ids = set()

    file_breakdown = []

    for rel_path, items in all_datasets.items():
        if not isinstance(items, list):
            continue
        
        # Determine category and subject
        parts = rel_path.split(os.sep)
        category = parts[0] # mock, pyq, practice
        subject = parts[1] if len(parts) > 1 else "unknown"
        
        q_count = len(items)
        total_questions += q_count

        if category == "mock":
            subject_counts[subject]["mocks"] += 1
        elif category == "pyq":
            subject_counts[subject]["pyqs"] += 1
        elif category == "practice":
            subject_counts[subject]["practice"] += 1
        subject_counts[subject]["total_questions"] += q_count

        file_breakdown.append({
            "path": rel_path,
            "category": category,
            "subject": subject,
            "questions": q_count
        })

        for q in items:
            if not isinstance(q, dict):
                continue
            
            # keys
            for k in q.keys():
                schema_keys[k] += 1
            
            qid = q.get("questionId") or q.get("id")
            if qid:
                if qid in all_q_ids:
                    dup_q_ids.add(qid)
                all_q_ids.add(qid)
            
            q_type = q.get("questionType") or "unspecified"
            question_types[str(q_type)] += 1

            diff = q.get("difficulty") or q.get("difficultyLevel") or "unspecified"
            difficulties[str(diff)] += 1

            corr = q.get("correctOption") or q.get("correctOptionId")
            correct_option_distribution[str(corr)] += 1

            text = str(q.get("questionText", "")) + " " + str(q.get("prompt", ""))
            expl = str(q.get("detailedSolution", "")) + " " + str(q.get("explanation", ""))
            full_text = text + " " + expl

            if q.get("hasDiagram") or "diagram" in q or "image" in q or ".png" in text or ".jpg" in text:
                diagram_count += 1
            
            if any(sym in full_text for sym in ["\\frac", "\\sqrt", "\\times", "\\pm", "\\int", "$", "\\alpha", "\\beta", "\\theta", "\\lambda"]):
                math_count += 1

            if any(term in text.lower() for term in ["match the following", "list-i", "list i", "column-i", "column i"]):
                match_count += 1

            if any(term in text.lower() for term in ["statement i", "statement-i", "assertion", "reason"]):
                table_count += 1

    return {
        "total_files": len(all_datasets),
        "total_questions": total_questions,
        "unique_question_ids": len(all_q_ids),
        "duplicate_ids_count": len(dup_q_ids),
        "subject_counts": dict(subject_counts),
        "schema_keys": dict(schema_keys),
        "question_types": dict(question_types),
        "difficulties": dict(difficulties),
        "correct_option_distribution": dict(correct_option_distribution),
        "diagram_count": diagram_count,
        "math_count": math_count,
        "match_count": match_count,
        "statement_assertion_count": table_count,
        "file_breakdown": file_breakdown
    }

def scan_sqlite():
    db_path = os.path.join(ROOT_DIR, "data", "cuet_pyq_master.db")
    if not os.path.exists(db_path):
        return {"exists": False}
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [t[0] for t in cur.fetchall()]
        table_counts = {}
        for t in tables:
            cur.execute(f"SELECT COUNT(*) FROM `{t}`;")
            table_counts[t] = cur.fetchone()[0]
        conn.close()
        return {"exists": True, "tables": table_counts}
    except Exception as e:
        return {"exists": True, "error": str(e)}

def main():
    print("Scanning mock/ ...")
    mocks = scan_json_directory(os.path.join(ROOT_DIR, "mock"))
    print(f"Found {len(mocks)} mock files.")

    print("Scanning pyq/ ...")
    pyqs = scan_json_directory(os.path.join(ROOT_DIR, "pyq"))
    print(f"Found {len(pyqs)} pyq files.")

    print("Scanning practice/ ...")
    practices = scan_json_directory(os.path.join(ROOT_DIR, "practice"))
    print(f"Found {len(practices)} practice files.")

    all_data = {}
    all_data.update(mocks)
    all_data.update(pyqs)
    all_data.update(practices)

    analysis = analyze_questions(all_data)
    analysis["sqlite_info"] = scan_sqlite()

    out_path = os.path.join(ROOT_DIR, "scripts", "audit_discovery_results.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(analysis, f, indent=2)

    print("\n--- SUMMARY ---")
    print(f"Total active files: {analysis['total_files']}")
    print(f"Total active questions: {analysis['total_questions']}")
    print(f"Unique question IDs: {analysis['unique_question_ids']}")
    print(f"Duplicate question IDs: {analysis['duplicate_ids_count']}")
    print(f"Diagram questions: {analysis['diagram_count']}")
    print(f"LaTeX/Math questions: {analysis['math_count']}")
    print(f"Match questions: {analysis['match_count']}")
    print(f"Assertion/Statement questions: {analysis['statement_assertion_count']}")
    print(f"SQLite DB: {analysis['sqlite_info']}")
    print(f"\nDetailed discovery saved to {out_path}")

if __name__ == "__main__":
    main()
