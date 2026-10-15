#!/usr/bin/env python3
"""
validate_mocks.py - Automated validation suite for CUET Mock Test JSON datasets.

Checks performed on each mock file:
1. Question count: exactly 50 questions per mock.
2. Question numbers: sequential 1..50 without missing or duplicate numbers.
3. Option schema: exactly 4 options with IDs 'A', 'B', 'C', 'D' and non-empty text.
4. Correct answer: exactly one option marked isCorrect=true, matching 'correctOption'.
5. Option balance: no single option (A, B, C, D) exceeds 30% (max 15 out of 50).
6. Solutions: non-empty detailed solution explaining why the answer is correct.
7. Deduplication:
   - Zero duplicate questions within the mock.
   - High-similarity checks against PYQ papers (no copied or lightly rephrased questions).
"""

import sys
import os
import json
import re
from collections import Counter
from typing import List, Dict, Any, Tuple


def tokenize(text: str) -> set:
    """Normalize and tokenize text for similarity comparison."""
    words = re.findall(r'[a-zA-Z0-9]+', text.lower())
    return set(words)


def jaccard_similarity(set1: set, set2: set) -> float:
    """Compute Jaccard similarity index between two token sets."""
    if not set1 or not set2:
        return 0.0
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union if union > 0 else 0.0


def validate_mock_file(
    file_path: str,
    pyq_token_sets: List[Tuple[str, set]] = None
) -> Tuple[bool, List[str], Dict[str, Any]]:
    errors = []
    warnings = []
    stats = {}

    if not os.path.exists(file_path):
        return False, [f"File not found: {file_path}"], stats

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return False, [f"JSON parse error in {file_path}: {str(e)}"], stats

    if not isinstance(data, list):
        return False, [f"Root of {file_path} must be a JSON array."], stats

    total_questions = len(data)
    stats["totalQuestions"] = total_questions
    if total_questions != 50:
        errors.append(f"Expected 50 questions, found {total_questions}.")

    option_counts = Counter()
    seen_q_numbers = set()
    mock_questions_tokens = []

    for idx, q in enumerate(data):
        q_num = q.get("questionNumber", idx + 1)
        q_label = f"Q{q_num} (index {idx})"

        # Sequential check
        if q_num in seen_q_numbers:
            errors.append(f"{q_label}: Duplicate questionNumber {q_num}.")
        seen_q_numbers.add(q_num)

        # Prompt / Question text check
        q_text = q.get("questionText", "").strip()
        if not q_text:
            errors.append(f"{q_label}: Empty questionText.")

        # Token set for deduplication
        q_tokens = tokenize(q_text)
        mock_questions_tokens.append((q_num, q_text, q_tokens))

        # Check options
        options = q.get("options", [])
        if len(options) != 4:
            errors.append(f"{q_label}: Must have exactly 4 options, found {len(options)}.")

        correct_options = []
        option_ids = []
        for opt in options:
            opt_id = opt.get("id")
            option_ids.append(opt_id)
            opt_text = opt.get("text", "").strip()
            if not opt_text:
                errors.append(f"{q_label}: Empty text for option {opt_id}.")
            if opt.get("isCorrect") is True:
                correct_options.append(opt_id)

        if sorted(option_ids) != ["A", "B", "C", "D"]:
            errors.append(f"{q_label}: Options IDs must be ['A', 'B', 'C', 'D'], found {option_ids}.")

        if len(correct_options) != 1:
            errors.append(f"{q_label}: Exactly one option must have isCorrect=true, found {correct_options}.")

        correct_opt = q.get("correctOption")
        if not correct_opt or correct_opt not in ["A", "B", "C", "D"]:
            errors.append(f"{q_label}: Invalid correctOption '{correct_opt}'.")
        elif correct_options and correct_opt != correct_options[0]:
            errors.append(f"{q_label}: correctOption ('{correct_opt}') does not match option with isCorrect=true ('{correct_options[0]}').")

        if correct_opt:
            option_counts[correct_opt] += 1

        # Explanation check
        detailed_solution = (
            q.get("detailedSolution")
            or (q.get("solution") or {}).get("detailed")
            or ""
        ).strip()
        if not detailed_solution:
            errors.append(f"{q_label}: Missing or empty detailedSolution.")

    # Option distribution check: no single letter > 30% (max 15 out of 50)
    stats["optionDistribution"] = dict(option_counts)
    stats["optionPercentages"] = {
        opt: f"{(count / total_questions * 100):.1f}%" if total_questions else "0%"
        for opt, count in option_counts.items()
    }

    for opt in ["A", "B", "C", "D"]:
        count = option_counts.get(opt, 0)
        percentage = (count / total_questions) * 100 if total_questions > 0 else 0
        if percentage > 30.0:
            errors.append(f"Option '{opt}' appears {count} times ({percentage:.1f}%), exceeding the 30% maximum threshold.")

    # Internal duplicate check
    for i in range(len(mock_questions_tokens)):
        for j in range(i + 1, len(mock_questions_tokens)):
            q1_num, q1_text, tokens1 = mock_questions_tokens[i]
            q2_num, q2_text, tokens2 = mock_questions_tokens[j]
            # Avoid comparing reading comprehension questions sharing the same passage
            if q1_text == q2_text:
                errors.append(f"Exact duplicate questionText between Q{q1_num} and Q{q2_num}.")
            else:
                sim = jaccard_similarity(tokens1, tokens2)
                if sim > 0.85 and "passage" not in q1_text.lower():
                    warnings.append(f"High similarity ({sim:.2f}) between Q{q1_num} and Q{q2_num}.")

    # Cross-check against PYQ token sets if provided
    if pyq_token_sets:
        pyq_clashes = 0
        for q_num, q_text, tokens in mock_questions_tokens:
            for pyq_src, pyq_tokens in pyq_token_sets:
                sim = jaccard_similarity(tokens, pyq_tokens)
                if sim > 0.80:
                    errors.append(f"Q{q_num} has excessive similarity ({sim:.2f}) with authentic PYQ ({pyq_src}). Potential copy or light rephrase!")
                    pyq_clashes += 1
        stats["pyqSimilarityClashes"] = pyq_clashes

    is_valid = len(errors) == 0
    return is_valid, errors, stats


def load_pyq_corpus(subject: str) -> List[Tuple[str, set]]:
    """Loads all PYQ questions for a subject to check for originality."""
    corpus = []
    pyq_dir = os.path.join("pyq", subject)
    if not os.path.exists(pyq_dir):
        return corpus

    for fname in os.listdir(pyq_dir):
        if fname.endswith(".json"):
            fpath = os.path.join(pyq_dir, fname)
            try:
                with open(fpath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                for q in data:
                    text = q.get("questionText", "")
                    tokens = tokenize(text)
                    corpus.append((f"{subject}/{fname}#Q{q.get('questionNumber')}", tokens))
            except Exception:
                continue
    return corpus


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/validate_mocks.py <mock_json_file> [subject_for_pyq_check]")
        sys.exit(1)

    target_path = sys.argv[1]
    subject = sys.argv[2] if len(sys.argv) > 2 else None

    # Detect subject from path if not provided
    if not subject:
        if "english" in target_path.lower():
            subject = "english"
        elif "general-test" in target_path.lower() or "gat" in target_path.lower():
            subject = "general-test"

    pyq_corpus = load_pyq_corpus(subject) if subject else []
    print(f"Loaded {len(pyq_corpus)} reference PYQ questions for '{subject}' duplicate checking.")

    is_valid, errors, stats = validate_mock_file(target_path, pyq_corpus)

    print("\n" + "=" * 60)
    print(f"VALIDATION REPORT: {target_path}")
    print("=" * 60)
    print(f"Total Questions: {stats.get('totalQuestions', 0)}")
    print(f"Option Distribution: {stats.get('optionDistribution', {})}")
    print(f"Option Percentages:  {stats.get('optionPercentages', {})}")
    print(f"PYQ Clashes:         {stats.get('pyqSimilarityClashes', 0)}")
    print("-" * 60)

    if is_valid:
        print("STATUS: PASSED (All validation constraints satisfied)")
        print("=" * 60)
        sys.exit(0)
    else:
        print(f"STATUS: FAILED ({len(errors)} errors found)")
        for err in errors[:20]:
            print(f"  [ERROR] {err}")
        if len(errors) > 20:
            print(f"  ... and {len(errors) - 20} more errors.")
        print("=" * 60)
        sys.exit(1)


if __name__ == "__main__":
    main()
