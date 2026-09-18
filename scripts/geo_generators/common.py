import re
import json
import os

def normalize_text(text):
    if not text:
        return ""
    t = text.lower()
    t = re.sub(r"\[cite:[^\]]+\]", "", t)
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    t = re.sub(r"[\$\\\{\}\(\)\[\]_^\s\.,;:\-\+=\*\/<>\"']+", "", t)
    return t

def get_pyq_normalized_set():
    pyq_set = set()
    pyq_file = "scripts/parsed_geo_pyqs.json"
    if os.path.exists(pyq_file):
        with open(pyq_file, "r", encoding="utf-8") as f:
            for item in json.load(f):
                pyq_set.add(normalize_text(item.get("questionText", "")))
    return pyq_set

DEFAULT_GEO_TRAPS = [
    ("Spatial / Topographical Confusion Trap", "Confuses geographical locations, river basins, state boundaries, or regional coordinates."),
    ("Determinism vs Possibilism Conflation Trap", "Conflates environmental determinism, possibilism, and neo-determinism (stop-and-go determinism)."),
    ("Demographic Indicator Misinterpretation Trap", "Confuses demographic metrics, formula definitions (e.g. sex ratio calculation methods), or age-sex pyramid shapes."),
    ("Economic Activity Classification Trap", "Misclassifies primary, secondary, tertiary, quaternary, or quinary activities."),
    ("Trade Corridor & Transit Network Trap", "Confuses major ocean routes, national waterways, major ports, or trans-continental railways.")
]

def rotate_options(correct_text, wrong_texts, target_id, solution_template, mistake_analysis_correct, wrong_traps_and_mistakes=None):
    opt_ids = ["A", "B", "C", "D"]
    target_idx = opt_ids.index(target_id)
    
    if wrong_traps_and_mistakes is None:
        wrong_traps_and_mistakes = DEFAULT_GEO_TRAPS
        
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
            w_text = wrong_texts[w_idx]
            trap, mist = wrong_traps_and_mistakes[w_idx % len(wrong_traps_and_mistakes)]
            options.append({
                "id": oid,
                "text": w_text,
                "isCorrect": False,
                "studentSelectionTrap": trap,
                "mistakeAnalysis": f"Incorrect option '{w_text}'. {mist}"
            })
            w_idx += 1
            
    solution = solution_template.replace("{{CORR}}", target_id).replace("{{ANS}}", correct_text)
    return options, target_id, solution

def make_question(
    chapter: str,
    topic: str,
    text: str,
    options_data: list,
    correct_opt: str,
    detailed_solution: str,
    question_number: int = 1
):
    if options_data and isinstance(options_data[0], dict) and "id" in options_data[0]:
        options = options_data
    else:
        options = []
        opt_ids = ["A", "B", "C", "D"]
        for i, opt_id in enumerate(opt_ids):
            item = options_data[i]
            is_corr = (opt_id == correct_opt)
            if isinstance(item, tuple):
                opt_text, trap, mistake = item
            elif isinstance(item, dict):
                opt_text = item["text"]
                trap = item.get("trap", None if is_corr else "Conceptual Distractor")
                mistake = item.get("mistake", "Correct NCERT Geography concept" if is_corr else "Incorrect application")
            else:
                opt_text = str(item)
                trap = None if is_corr else "Distractor Choice Trap"
                mistake = (
                    "Correct answer. Conforms to standard NCERT Geography syllabus."
                    if is_corr
                    else f"Incorrect option. Confuses geographical concepts with distractor '{opt_text}'."
                )

            options.append({
                "id": opt_id,
                "text": opt_text,
                "isCorrect": is_corr,
                "studentSelectionTrap": None if is_corr else trap,
                "mistakeAnalysis": (
                    f"Correct answer. {mistake}" if is_corr and not mistake.startswith("Correct") else mistake
                )
            })

    return {
        "id": f"geo-q-{question_number}-{abs(hash(text)) % 1000000}",
        "questionNumber": question_number,
        "chapter": chapter,
        "topic": topic,
        "questionText": text,
        "options": options,
        "correctOption": correct_opt,
        "detailedSolution": detailed_solution
    }

def make_match_question(chapter, topic, stem, list1, list2, correct_pairing, target_opt, explanation, mistake_corr):
    """
    list1: [ (A, itemA), (B, itemB), (C, itemC), (D, itemD) ]
    list2: [ (i, item1), (ii, item2), (iii, item3), (iv, item4) ]
    correct_pairing: e.g. "A-II, B-IV, C-I, D-III"
    """
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
    
    # Generate 3 plausible wrong permutations
    w1 = f"A-{l2_codes[1]}, B-{l2_codes[0]}, C-{l2_codes[2]}, D-{l2_codes[3]}"
    w2 = f"A-{l2_codes[0]}, B-{l2_codes[2]}, C-{l2_codes[3]}, D-{l2_codes[1]}"
    w3 = f"A-{l2_codes[3]}, B-{l2_codes[1]}, C-{l2_codes[0]}, D-{l2_codes[2]}"
    
    wrong_opts = [w1, w2, w3]
    opts, corr, sol = rotate_options(
        correct_pairing,
        wrong_opts,
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        mistake_corr
    )
    return make_question(chapter, topic, q_text, opts, corr, sol)

def make_sequence_question(chapter, topic, stem, items, correct_seq_str, target_opt, explanation, mistake_corr):
    q_text = stem + "\n\n"
    for code, itm in items:
        q_text += f"({code}) {itm}\n"
    q_text += "\nChoose the correct sequence from the options given below:"

    tokens = [t.strip() for t in correct_seq_str.split(",")]
    if len(tokens) == 3:
        w1 = f"{tokens[1]}, {tokens[0]}, {tokens[2]}"
        w2 = f"{tokens[0]}, {tokens[2]}, {tokens[1]}"
        w3 = f"{tokens[2]}, {tokens[1]}, {tokens[0]}"
    elif len(tokens) == 4:
        w1 = f"{tokens[1]}, {tokens[0]}, {tokens[2]}, {tokens[3]}"
        w2 = f"{tokens[0]}, {tokens[2]}, {tokens[1]}, {tokens[3]}"
        w3 = f"{tokens[3]}, {tokens[1]}, {tokens[2]}, {tokens[0]}"
    elif len(tokens) == 5:
        w1 = f"{tokens[1]}, {tokens[0]}, {tokens[2]}, {tokens[3]}, {tokens[4]}"
        w2 = f"{tokens[0]}, {tokens[2]}, {tokens[1]}, {tokens[3]}, {tokens[4]}"
        w3 = f"{tokens[3]}, {tokens[1]}, {tokens[2]}, {tokens[0]}, {tokens[4]}"
    else:
        w1 = ", ".join(reversed(tokens))
        w2 = f"{tokens[1]}, " + ", ".join(tokens[2:]) + f", {tokens[0]}"
        w3 = ", ".join(tokens[1:]) + f", {tokens[0]}"

    opts, corr, sol = rotate_options(
        correct_seq_str,
        [w1, w2, w3],
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        mistake_corr
    )
    return make_question(chapter, topic, q_text, opts, corr, sol)

def make_statement_question(chapter, topic, st1, st2, correct_relation, target_opt, explanation, mistake_corr):
    """
    1: Both Statement I and Statement II are correct
    2: Both Statement I and Statement II are incorrect
    3: Statement I is correct but Statement II is incorrect
    4: Statement I is incorrect but Statement II is correct
    """
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
        mistake_corr
    )
    return make_question(chapter, topic, q_text, opts, corr, sol)

def make_assertion_question(chapter, topic, assertion, reason, correct_relation, target_opt, explanation, mistake_corr):
    """
    1: Both (A) and (R) are true and (R) is the correct explanation of (A)
    2: Both (A) and (R) are true but (R) is not the correct explanation of (A)
    3: (A) is true but (R) is false
    4: (A) is false but (R) is true
    """
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
        mistake_corr
    )
    return make_question(chapter, topic, q_text, opts, corr, sol)

def make_multi_statement_question(chapter, topic, stem, statements, correct_combo, wrong_combos, target_opt, explanation, mistake_corr):
    """
    statements: [ (A, stA), (B, stB), (C, stC), (D, stD) ]
    correct_combo: e.g. "(A), (B) and (D) only"
    wrong_combos: e.g. ["(A) and (C) only", "(B) and (C) only", "(A), (B), (C) and (D)"]
    """
    q_text = stem + "\n\n"
    for code, st in statements:
        q_text += f"({code}) {st}\n"
    q_text += "\nChoose the correct answer from the options given below:"

    opts, corr, sol = rotate_options(
        correct_combo,
        wrong_combos,
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        mistake_corr
    )
    return make_question(chapter, topic, q_text, opts, corr, sol)
