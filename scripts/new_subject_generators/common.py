import re
import json
import os
import random
from collections import Counter

def normalize_text(text):
    if not text:
        return ""
    t = text.lower()
    t = re.sub(r"\[cite:[^\]]+\]", "", t)
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    t = re.sub(r"[\$\\\{\}\(\)\[\]_^\s\.,;:\-\+=\*\/<>\"']+", "", t)
    return t

def rotate_options(correct_text, wrong_texts, target_id, solution_template, mistake_analysis_correct, wrong_traps_and_mistakes=None):
    opt_ids = ["A", "B", "C", "D"]
    target_idx = opt_ids.index(target_id)
    
    if wrong_traps_and_mistakes is None:
        wrong_traps_and_mistakes = [
            ("Conceptual Conflation Trap", "Conflates core domain concepts or theories with adjacent terminology."),
            ("Factual Misattribution Trap", "Attributes historical facts, dates, authors, or mechanisms to an incorrect entity."),
            ("Overgeneralization Trap", "Adopts an over-generalized or inaccurate interpretation contradictory to syllabus facts.")
        ]
        
    options = []
    w_idx = 0
    for i, oid in enumerate(opt_ids):
        if i == target_idx:
            options.append({
                "id": oid,
                "text": correct_text,
                "isCorrect": True,
                "studentSelectionTrap": None,
                "mistakeAnalysis": f"Correct answer. {mistake_analysis_correct}"
            })
        else:
            w_text = wrong_texts[w_idx % len(wrong_texts)]
            trap, mist = wrong_traps_and_mistakes[w_idx % len(wrong_traps_and_mistakes)]
            options.append({
                "id": oid,
                "text": w_text,
                "isCorrect": False,
                "studentSelectionTrap": trap,
                "mistakeAnalysis": f"Incorrect option '{w_text}'. {mist}"
            })
            w_idx += 1
            
    solution = solution_template.replace("{{CORR}}", target_id).replace("{{ANS}}", str(correct_text))
    return options, target_id, solution

def make_question(
    subject_prefix: str,
    mock_num: int,
    question_number: int,
    chapter: str,
    topic: str,
    text: str,
    options_data: list,
    correct_opt: str,
    detailed_solution: str
):
    return {
        "id": f"{subject_prefix}-mock{mock_num}-q{question_number}",
        "questionNumber": question_number,
        "chapter": chapter,
        "topic": topic,
        "questionText": text,
        "options": options_data,
        "correctOption": correct_opt,
        "detailedSolution": detailed_solution
    }

def make_match_question(subject_prefix, mock_num, question_number, chapter, topic, stem, list1, list2, correct_pairing, target_opt, explanation, mistake_corr, traps=None):
    q_text = stem + "\n\n"
    q_text += "List I:\n"
    for code, item in list1:
        q_text += f"({code}) {item}\n"
    q_text += "\nList II:\n"
    for code, item in list2:
        q_text += f"({code}) {item}\n"
    q_text += "\nChoose the correct answer from the options given below:"

    parts = [p.strip() for p in correct_pairing.split(",")]
    l2_codes = [p.split("-")[1] for p in parts]
    
    # Generate 3 distinct plausible wrong permutations
    w1 = f"A-{l2_codes[1]}, B-{l2_codes[0]}, C-{l2_codes[2]}, D-{l2_codes[3]}"
    w2 = f"A-{l2_codes[0]}, B-{l2_codes[2]}, C-{l2_codes[3]}, D-{l2_codes[1]}"
    w3 = f"A-{l2_codes[3]}, B-{l2_codes[1]}, C-{l2_codes[0]}, D-{l2_codes[2]}"
    
    wrong_opts = [w1, w2, w3]
    opts, corr, sol = rotate_options(
        correct_pairing,
        wrong_opts,
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        mistake_corr,
        traps
    )
    return make_question(subject_prefix, mock_num, question_number, chapter, topic, q_text, opts, corr, sol)

def make_sequence_question(subject_prefix, mock_num, question_number, chapter, topic, stem, items, correct_seq_str, target_opt, explanation, mistake_corr, traps=None):
    q_text = stem + "\n"
    for code, itm in items:
        q_text += f"({code}) {itm}\n"
    q_text += "\nChoose the correct chronological/logical sequence from the options given below:"

    tokens = [t.strip() for t in correct_seq_str.split(",")]
    if len(tokens) == 3:
        w1 = f"{tokens[1]}, {tokens[0]}, {tokens[2]}"
        w2 = f"{tokens[0]}, {tokens[2]}, {tokens[1]}"
        w3 = f"{tokens[2]}, {tokens[1]}, {tokens[0]}"
    elif len(tokens) == 4:
        w1 = f"{tokens[1]}, {tokens[0]}, {tokens[2]}, {tokens[3]}"
        w2 = f"{tokens[0]}, {tokens[2]}, {tokens[1]}, {tokens[3]}"
        w3 = f"{tokens[3]}, {tokens[1]}, {tokens[2]}, {tokens[0]}"
    elif len(tokens) >= 5:
        w1 = f"{tokens[1]}, {tokens[0]}, {tokens[2]}, {tokens[3]}, " + ", ".join(tokens[4:])
        w2 = f"{tokens[0]}, {tokens[2]}, {tokens[1]}, {tokens[3]}, " + ", ".join(tokens[4:])
        w3 = f"{tokens[3]}, {tokens[1]}, {tokens[2]}, {tokens[0]}, " + ", ".join(tokens[4:])
    else:
        w1 = ", ".join(reversed(tokens))
        w2 = tokens[0] if len(tokens) == 1 else f"{tokens[1]}, {tokens[0]}"
        w3 = ", ".join(tokens)

    opts, corr, sol = rotate_options(
        correct_seq_str,
        [w1, w2, w3],
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        mistake_corr,
        traps
    )
    return make_question(subject_prefix, mock_num, question_number, chapter, topic, q_text, opts, corr, sol)

def make_statement_question(subject_prefix, mock_num, question_number, chapter, topic, st1, st2, correct_relation, target_opt, explanation, mistake_corr, traps=None):
    q_text = (
        f"Given below are two statements:\n"
        f"Statement I: {st1}\n"
        f"Statement II: {st2}\n\n"
        f"In the light of the above statements, choose the most appropriate answer from the options given below:"
    )
    rel_map = {
        1: "Both Statement I and Statement II are correct",
        2: "Both Statement I and Statement II are incorrect",
        3: "Statement I is correct but Statement II is incorrect",
        4: "Statement I is incorrect but Statement II is correct"
    }
    corr_text = rel_map[correct_relation]
    wrong_texts = [v for k, v in rel_map.items() if k != correct_relation]
    
    opts, corr, sol = rotate_options(
        corr_text,
        wrong_texts,
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        mistake_corr,
        traps
    )
    return make_question(subject_prefix, mock_num, question_number, chapter, topic, q_text, opts, corr, sol)

def make_assertion_question(subject_prefix, mock_num, question_number, chapter, topic, assertion, reason, correct_relation, target_opt, explanation, mistake_corr, traps=None):
    q_text = (
        f"Given below are two statements, one is labelled as Assertion (A) and the other is labelled as Reason (R):\n"
        f"Assertion (A): {assertion}\n"
        f"Reason (R): {reason}\n\n"
        f"In the light of the above statements, choose the correct answer from the options given below:"
    )
    rel_map = {
        1: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
        2: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
        3: "(A) is true but (R) is false",
        4: "(A) is false but (R) is true"
    }
    corr_text = rel_map[correct_relation]
    wrong_texts = [v for k, v in rel_map.items() if k != correct_relation]
    
    opts, corr, sol = rotate_options(
        corr_text,
        wrong_texts,
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        mistake_corr,
        traps
    )
    return make_question(subject_prefix, mock_num, question_number, chapter, topic, q_text, opts, corr, sol)

def make_mcq_question(subject_prefix, mock_num, question_number, chapter, topic, stem, correct_text, wrong_texts, target_opt, explanation, mistake_corr, traps=None):
    opts, corr, sol = rotate_options(
        correct_text,
        wrong_texts,
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        mistake_corr,
        traps
    )
    return make_question(subject_prefix, mock_num, question_number, chapter, topic, stem, opts, corr, sol)

def make_case_question(subject_prefix, mock_num, question_number, chapter, topic, passage_header, prompt, correct_text, wrong_texts, target_opt, explanation, mistake_corr, traps=None):
    full_prompt = f"{passage_header}\n\nQuestion: {prompt}"
    opts, corr, sol = rotate_options(
        correct_text,
        wrong_texts,
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        mistake_corr,
        traps
    )
    return make_question(subject_prefix, mock_num, question_number, chapter, topic, full_prompt, opts, corr, sol)

def get_balanced_target_keys(seed, count=50):
    rng = random.Random(seed)
    base = ["A", "B", "C", "D"] * (count // 4)
    rem = count % 4
    for i in range(rem):
        base.append(["A", "B", "C", "D"][i])
    rng.shuffle(base)
    return base

def verify_and_save_mock(questions, out_dir, mock_num, global_seen, subject_prefix):
    assert len(questions) == 50, f"Mock {mock_num} has {len(questions)} questions instead of 50"
    for q_idx, q in enumerate(questions, start=1):
        assert q["questionNumber"] == q_idx, f"Mock {mock_num} Q{q_idx} mismatch number"
        assert len(q["options"]) == 4, f"Mock {mock_num} Q{q_idx} has {len(q['options'])} options"
        assert q["correctOption"] in ["A", "B", "C", "D"]
        corr_opts = [o for o in q["options"] if o.get("isCorrect")]
        assert len(corr_opts) == 1, f"Mock {mock_num} Q{q_idx} must have 1 correct option"
        assert corr_opts[0]["id"] == q["correctOption"], f"Mock {mock_num} Q{q_idx} key mismatch"
        
        # Verify solution mentions correct option
        sol = q["detailedSolution"]
        assert f"Option {q['correctOption']} is correct" in sol, f"Mock {mock_num} Q{q_idx} solution mismatch: {sol}"
        
        # Uniqueness
        norm = normalize_text(q["questionText"])
        if norm in global_seen:
            raise ValueError(f"Duplicate question detected in Mock {mock_num} Q{q_idx}: {q['questionText'][:60]}")
        global_seen.add(norm)
        
    # Check key distribution
    keys = Counter(q["correctOption"] for q in questions)
    for k in ["A", "B", "C", "D"]:
        assert keys[k] <= 20, f"Mock {mock_num} option {k} count {keys[k]} > 20"
        assert keys[k] >= 5, f"Mock {mock_num} option {k} count {keys[k]} < 5"

    os.makedirs(out_dir, exist_ok=True)
    fpath = os.path.join(out_dir, f"{mock_num}.json")
    with open(fpath, "w", encoding="utf-8") as fp:
        json.dump(questions, fp, indent=2, ensure_ascii=False)
    print(f"[{subject_prefix}] Mock {mock_num} saved ({len(questions)} Qs, keys: {dict(keys)})")
