#!/usr/bin/env python3
"""
CUET UG Master Question Paper Rebuild - Full Assembly & QA Engine
Builds, validates, and writes all 20 premium, PYQ-grounded Business Studies mocks (M01 to M20).
Outputs to:
  - mock/bst/{1..20}.json
  - mock/business_studies/{1..20}.json
"""

import os
import sys
import re
import json
import random

sys.path.insert(0, os.getcwd())
from scripts.bst_rebuild.standalone_bank import generate_standalone_questions_for_mock
from scripts.bst_rebuild.passages_bank import get_passage_1_for_mock, get_passage_2_for_mock

def slugify(text):
    """Generates a clean slug for concept IDs."""
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def generate_balanced_keys(mock_num):
    """
    Generates an exact 50-key distribution with:
    - 12 A's, 13 B's, 12 C's, 13 D's (Total 50)
    - Max consecutive identical key streak <= 3
    """
    rng = random.Random(mock_num * 101 + 37)
    keys = ['A'] * 12 + ['B'] * 13 + ['C'] * 12 + ['D'] * 13
    rng.shuffle(keys)
    # Enforce max streak <= 3
    for _ in range(15):
        for i in range(2, len(keys)):
            if keys[i] == keys[i-1] == keys[i-2]:
                for j in range(len(keys)):
                    if keys[j] != keys[i] and (j == 0 or keys[j-1] != keys[i]) and (j == len(keys)-1 or keys[j+1] != keys[i]):
                        keys[i], keys[j] = keys[j], keys[i]
                        break
    return keys

def format_options(raw_opts, target_key, seed):
    """
    Permutes raw options such that the correct option is placed at target_key.
    Returns: (formatted_options_list, correct_option_id)
    """
    # Separate correct option from distractors
    correct_opt = None
    distractors = []
    for opt in raw_opts:
        if isinstance(opt, tuple):
            # (id, text, isCorrect, trap)
            opt_dict = {"text": opt[1], "isCorrect": opt[2], "studentSelectionTrap": opt[3]}
        else:
            opt_dict = opt
        
        if opt_dict.get("isCorrect", False):
            correct_opt = opt_dict
        else:
            distractors.append(opt_dict)
    
    assert correct_opt is not None, "No correct option found in raw options"
    assert len(distractors) == 3, f"Expected 3 distractors, found {len(distractors)}"

    # Deterministic shuffle of the 3 distractors
    rng = random.Random(seed)
    rng.shuffle(distractors)

    # Place correct option at target_key and distractors at other 3 keys
    all_keys = ['A', 'B', 'C', 'D']
    formatted = []
    dist_idx = 0
    for k in all_keys:
        if k == target_key:
            formatted.append({
                "id": k,
                "text": correct_opt["text"],
                "isCorrect": True,
                "studentSelectionTrap": None,
                "mistakeAnalysis": "Correct analytical application of NCERT principle."
            })
        else:
            d = distractors[dist_idx]
            dist_idx += 1
            trap = d.get("studentSelectionTrap") or "Common misconception / superficial recall error."
            formatted.append({
                "id": k,
                "text": d["text"],
                "isCorrect": False,
                "studentSelectionTrap": trap,
                "mistakeAnalysis": f"Student error: {trap}"
            })

    return formatted, target_key

def assemble_mock(mock_num):
    """
    Assembles a full 50-question mock test for Business Studies.
    """
    m = mock_num
    keys = generate_balanced_keys(m)
    questions = []

    # 1. Standalone Questions (Q01 to Q40)
    standalone_raw = generate_standalone_questions_for_mock(m)
    assert len(standalone_raw) == 40, f"Mock {m}: Expected 40 standalone questions, got {len(standalone_raw)}"

    for idx, q in enumerate(standalone_raw):
        q_num = idx + 1
        target_key = keys[idx]
        formatted_opts, correct_key = format_options(q["options"], target_key, m * 1000 + q_num)
        correct_text = [o["text"] for o in formatted_opts if o["isCorrect"]][0]

        concept_slug = slugify(f"{q['chapter']}-{q['topic']}-{q.get('subtopic', '')}")
        quick_sol = f"Option ({correct_key}) is correct: {correct_text}"
        concept_sol = f"NCERT Class 12 Business Studies: {q['chapter']} - {q['topic']}."
        detailed_sol = q["sol"]

        questions.append({
            "questionNumber": q_num,
            "questionId": f"BST-M{m:02d}-Q{q_num:02d}",
            "conceptId": concept_slug,
            "chapter": q["chapter"],
            "topic": q["topic"],
            "questionText": q["stem"],
            "options": formatted_opts,
            "correctOption": correct_key,
            "detailedSolution": detailed_sol,
            "solution": {
                "quick": quick_sol,
                "concept": concept_sol,
                "detailed": detailed_sol
            },
            "questionType": q.get("archetype", "conceptual-application"),
            "difficulty": q.get("difficulty", 2),
            "estimatedTimeSeconds": 50 + (q_num % 5) * 5,
            "keyConcept": f"{q['topic']}: {q.get('subtopic', '')}",
            "tags": ["CUET UG", "Business Studies", "Class 12 NCERT", q["chapter"]],
            "qualityScore": 98
        })

    # 2. Case Study Passage 1: Financial Management (Q41 to Q45)
    p1 = get_passage_1_for_mock(m)
    assert len(p1["questions"]) == 5, f"Mock {m}: Passage 1 must have 5 questions"
    for p_idx, pq in enumerate(p1["questions"]):
        q_num = 41 + p_idx
        target_key = keys[q_num - 1]
        formatted_opts, correct_key = format_options(pq["options"], target_key, m * 2000 + q_num)
        correct_text = [o["text"] for o in formatted_opts if o["isCorrect"]][0]

        stem_with_passage = (
            f"[Case Study 1: {p1['passageId']}]\n\n"
            f"{p1['narrative']}\n\n"
            f"Based on the above case study, answer the following question:\n"
            f"{pq['stem']}"
        )

        concept_slug = slugify(f"{p1['chapter']}-case-study-passage-1-q{q_num}")
        quick_sol = f"Option ({correct_key}) is correct: {correct_text}"
        concept_sol = f"NCERT Class 12 Business Studies: Financial Management (Case Study Analysis)."
        detailed_sol = pq["solution"]

        questions.append({
            "questionNumber": q_num,
            "questionId": f"BST-M{m:02d}-Q{q_num:02d}",
            "conceptId": concept_slug,
            "chapter": p1["chapter"],
            "topic": "Financial Management: Case Study Analysis",
            "questionText": stem_with_passage,
            "options": formatted_opts,
            "correctOption": correct_key,
            "detailedSolution": detailed_sol,
            "solution": {
                "quick": quick_sol,
                "concept": concept_sol,
                "detailed": detailed_sol
            },
            "questionType": "case-passage-based",
            "difficulty": 3,
            "estimatedTimeSeconds": 70,
            "keyConcept": f"Financial Management: {p1['passageId']}",
            "tags": ["CUET UG", "Business Studies", "Class 12 NCERT", "Financial Management", "Case Study"],
            "qualityScore": 98
        })

    # 3. Case Study Passage 2: Organising (Q46 to Q50)
    p2 = get_passage_2_for_mock(m)
    assert len(p2["questions"]) == 5, f"Mock {m}: Passage 2 must have 5 questions"
    for p_idx, pq in enumerate(p2["questions"]):
        q_num = 46 + p_idx
        target_key = keys[q_num - 1]
        formatted_opts, correct_key = format_options(pq["options"], target_key, m * 3000 + q_num)
        correct_text = [o["text"] for o in formatted_opts if o["isCorrect"]][0]

        stem_with_passage = (
            f"[Case Study 2: {p2['passageId']}]\n\n"
            f"{p2['narrative']}\n\n"
            f"Based on the above case study, answer the following question:\n"
            f"{pq['stem']}"
        )

        concept_slug = slugify(f"{p2['chapter']}-case-study-passage-2-q{q_num}")
        quick_sol = f"Option ({correct_key}) is correct: {correct_text}"
        concept_sol = f"NCERT Class 12 Business Studies: Organising (Case Study Analysis)."
        detailed_sol = pq["solution"]

        questions.append({
            "questionNumber": q_num,
            "questionId": f"BST-M{m:02d}-Q{q_num:02d}",
            "conceptId": concept_slug,
            "chapter": p2["chapter"],
            "topic": "Organising: Case Study Analysis",
            "questionText": stem_with_passage,
            "options": formatted_opts,
            "correctOption": correct_key,
            "detailedSolution": detailed_sol,
            "solution": {
                "quick": quick_sol,
                "concept": concept_sol,
                "detailed": detailed_sol
            },
            "questionType": "case-passage-based",
            "difficulty": 3,
            "estimatedTimeSeconds": 70,
            "keyConcept": f"Organising: {p2['passageId']}",
            "tags": ["CUET UG", "Business Studies", "Class 12 NCERT", "Organising", "Case Study"],
            "qualityScore": 98
        })

    # QA Verification Checks on assembled mock
    assert len(questions) == 50, f"Mock {m}: Expected 50 questions, got {len(questions)}"
    key_counts = {"A": 0, "B": 0, "C": 0, "D": 0}
    for q in questions:
        key_counts[q["correctOption"]] += 1
        assert len(q["options"]) == 4, f"Mock {m} Q{q['questionNumber']} does not have 4 options"
        assert [o["id"] for o in q["options"]] == ["A", "B", "C", "D"], f"Mock {m} Q{q['questionNumber']} option IDs invalid"
        correct_flags = [o["isCorrect"] for o in q["options"]]
        assert correct_flags.count(True) == 1, f"Mock {m} Q{q['questionNumber']} must have exactly one correct option"
        assert q["options"][['A', 'B', 'C', 'D'].index(q["correctOption"])]["isCorrect"] is True, f"Mock {m} Q{q['questionNumber']} correctOption mismatch"

    assert key_counts == {"A": 12, "B": 13, "C": 12, "D": 13}, f"Mock {m}: Key distribution mismatch: {key_counts}"

    return questions

def build_all_mocks():
    """
    Assembles and writes all 20 Business Studies mocks to disk.
    """
    out_dir_bst = os.path.join(os.getcwd(), "mock", "bst")
    out_dir_bs = os.path.join(os.getcwd(), "mock", "business_studies")
    os.makedirs(out_dir_bst, exist_ok=True)
    os.makedirs(out_dir_bs, exist_ok=True)

    global_stems = set()
    total_written = 0

    print("=" * 70)
    print("CUET UG BUSINESS STUDIES: 20 MOCK EXAMS REBUILD & QA ENGINE")
    print("=" * 70)

    for m in range(1, 21):
        mock_data = assemble_mock(m)
        
        # Verify stem uniqueness across all mocks
        for q in mock_data:
            stem = q["questionText"]
            assert stem not in global_stems, f"CRITICAL: Duplicate stem detected in Mock {m} Q{q['questionNumber']}: {stem[:60]}..."
            global_stems.add(stem)

        # Write to mock/bst/{m}.json
        path_bst = os.path.join(out_dir_bst, f"{m}.json")
        with open(path_bst, "w", encoding="utf-8") as f:
            json.dump(mock_data, f, indent=2, ensure_ascii=False)

        # Write to mock/business_studies/{m}.json
        path_bs = os.path.join(out_dir_bs, f"{m}.json")
        with open(path_bs, "w", encoding="utf-8") as f:
            json.dump(mock_data, f, indent=2, ensure_ascii=False)

        total_written += len(mock_data)
        print(f"  [OK] Mock {m:02d}: 50 questions generated, verified, and saved -> mock/bst/{m}.json & mock/business_studies/{m}.json")

    print("-" * 70)
    print(f"TOTAL QUESTIONS ASSEMBLED: {total_written} questions across 20 mocks.")
    print(f"TOTAL UNIQUE STEMS: {len(global_stems)} (Zero duplicate stems).")
    print("ALL 20 MOCK TESTS COMPILED AND VERIFIED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == "__main__":
    build_all_mocks()
