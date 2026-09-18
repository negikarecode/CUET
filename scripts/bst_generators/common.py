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
    pyq_file = "scripts/parsed_bst_pyqs.json"
    if os.path.exists(pyq_file):
        with open(pyq_file, "r", encoding="utf-8") as f:
            for item in json.load(f):
                pyq_set.add(normalize_text(item.get("questionText", "")))
    return pyq_set

def rotate_options(correct_text, wrong_texts, target_id, solution_template, mistake_analysis_correct, wrong_traps_and_mistakes=None):
    opt_ids = ["A", "B", "C", "D"]
    target_idx = opt_ids.index(target_id)
    
    if wrong_traps_and_mistakes is None:
        wrong_traps_and_mistakes = [
            ("Management Concept Inversion Trap", "Confuses the core management function or principle with an opposing administrative concept."),
            ("Factual / Definitional Distractor Trap", "Selects a plausible-sounding management term that is contextually inaccurate according to NCERT."),
            ("Organizational Scope Misalignment Trap", "Confuses organizational hierarchy levels or functional departmental responsibilities.")
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
                mistake = item.get("mistake", "Correct NCERT principle" if is_corr else "Incorrect application")
            else:
                opt_text = str(item)
                trap = None if is_corr else "Distractor Choice Trap"
                mistake = (
                    "Correct answer. Conforms to standard NCERT Business Studies principles."
                    if is_corr
                    else f"Incorrect option. Confuses concept details with distractor '{opt_text}'."
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
        "questionNumber": question_number,
        "chapter": chapter,
        "topic": topic,
        "questionText": text,
        "hasDiagram": False,
        "diagramDescription": None,
        "options": options,
        "correctOption": correct_opt,
        "detailedSolution": detailed_solution
    }

def make_match_question(
    chapter: str,
    topic: str,
    stem: str,
    list_i: list,
    list_ii: list,
    correct_pairs: str,
    wrong_pairs_list: list,
    target_opt: str,
    solution: str,
    question_number: int = 1
):
    text_lines = [stem, ""]
    text_lines.append("List I                                | List II")
    text_lines.append("--------------------------------------|--------------------------------------")
    for (code_i, item_i), (code_ii, item_ii) in zip(list_i, list_ii):
        text_lines.append(f"{code_i.ljust(6)} {item_i.ljust(30)} | {code_ii.ljust(6)} {item_ii}")
    text_lines.append("")
    text_lines.append("Choose the correct answer from the options given below:")
    full_text = "\n".join(text_lines)

    opt_ids = ["A", "B", "C", "D"]
    target_idx = opt_ids.index(target_opt)
    
    options = []
    w_idx = 0
    traps = [
        "Cross-Column Misalignment Trap",
        "Partial Match Inversion Trap",
        "Concept Pair Scrambling Trap"
    ]
    for i, oid in enumerate(opt_ids):
        if i == target_idx:
            options.append({
                "id": oid,
                "text": correct_pairs,
                "isCorrect": True,
                "studentSelectionTrap": None,
                "mistakeAnalysis": "Correct answer. Accurately pairs each concept in List I with its definition or attribute in List II."
            })
        else:
            w_text = wrong_pairs_list[w_idx]
            options.append({
                "id": oid,
                "text": w_text,
                "isCorrect": False,
                "studentSelectionTrap": traps[w_idx % len(traps)],
                "mistakeAnalysis": f"Incorrect pairing '{w_text}'. Confuses one or more paired attributes in the matching matrix."
            })
            w_idx += 1

    return {
        "questionNumber": question_number,
        "chapter": chapter,
        "topic": topic,
        "questionText": full_text,
        "hasDiagram": False,
        "diagramDescription": None,
        "options": options,
        "correctOption": target_opt,
        "detailedSolution": solution
    }

def make_sequence_question(
    chapter: str,
    topic: str,
    stem: str,
    steps: list,
    correct_order: str,
    wrong_orders_list: list,
    target_opt: str,
    solution: str,
    question_number: int = 1
):
    text_lines = [stem, ""]
    letters = ["(A)", "(B)", "(C)", "(D)", "(E)"]
    for i, step in enumerate(steps):
        text_lines.append(f"{letters[i]} {step}")
    text_lines.append("")
    text_lines.append("Choose the correct answer from the options given below:")
    full_text = "\n".join(text_lines)

    opt_ids = ["A", "B", "C", "D"]
    target_idx = opt_ids.index(target_opt)
    
    options = []
    w_idx = 0
    traps = [
        "Chronological Inversion Trap",
        "Intermediate Step Scrambling Trap",
        "Phase Precedence Confusion Trap"
    ]
    for i, oid in enumerate(opt_ids):
        if i == target_idx:
            options.append({
                "id": oid,
                "text": correct_order,
                "isCorrect": True,
                "studentSelectionTrap": None,
                "mistakeAnalysis": "Correct answer. Accurately follows the standardized managerial process sequence according to NCERT."
            })
        else:
            w_text = wrong_orders_list[w_idx]
            options.append({
                "id": oid,
                "text": w_text,
                "isCorrect": False,
                "studentSelectionTrap": traps[w_idx % len(traps)],
                "mistakeAnalysis": f"Incorrect sequence '{w_text}'. Misplaces intermediate procedural steps."
            })
            w_idx += 1

    return {
        "questionNumber": question_number,
        "chapter": chapter,
        "topic": topic,
        "questionText": full_text,
        "hasDiagram": False,
        "diagramDescription": None,
        "options": options,
        "correctOption": target_opt,
        "detailedSolution": solution
    }

def make_statement_question(
    chapter: str,
    topic: str,
    statement_1: str,
    statement_2: str,
    correct_opt: str, # "A", "B", "C", "D"
    solution: str,
    question_number: int = 1
):
    text = (
        f"Given below are two statements:\n"
        f"Statement I: {statement_1}\n"
        f"Statement II: {statement_2}\n\n"
        f"In light of the above statements, choose the correct answer from the options given below:"
    )
    standard_opts = [
        ("Both Statement I and Statement II are true", "Dual Statement Acceptance Trap", "Erroneously accepted both statements without identifying the factual flaw."),
        ("Both Statement I and Statement II are false", "Dual Statement Rejection Trap", "Erroneously rejected both statements as invalid."),
        ("Statement I is true but Statement II is false", "Statement II Verification Trap", "Failed to identify the conceptual error in Statement II."),
        ("Statement I is false but Statement II is true", "Statement I Verification Trap", "Failed to identify the conceptual error in Statement I.")
    ]
    opts = []
    opt_ids = ["A", "B", "C", "D"]
    for i, opt_id in enumerate(opt_ids):
        is_corr = (opt_id == correct_opt)
        txt, trap, mistake = standard_opts[i]
        opts.append({
            "id": opt_id,
            "text": txt,
            "isCorrect": is_corr,
            "studentSelectionTrap": None if is_corr else trap,
            "mistakeAnalysis": "Correct answer. Accurately verifies the truth value of both statements according to NCERT Business Studies." if is_corr else mistake
        })

    return {
        "questionNumber": question_number,
        "chapter": chapter,
        "topic": topic,
        "questionText": text,
        "hasDiagram": False,
        "diagramDescription": None,
        "options": opts,
        "correctOption": correct_opt,
        "detailedSolution": solution
    }

def make_assertion_question(
    chapter: str,
    topic: str,
    assertion: str,
    reason: str,
    correct_opt: str,
    solution: str,
    question_number: int = 1
):
    text = (
        f"Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\n"
        f"Assertion (A): {assertion}\n"
        f"Reason (R): {reason}\n\n"
        f"In light of the above statements, choose the correct answer from the options given below:"
    )
    standard_opts = [
        ("Both (A) and (R) are true and (R) is the correct explanation of (A)", "Causality Presumption Trap", "Assumed Reason explained Assertion without verifying causal mechanism."),
        ("Both (A) and (R) are true but (R) is NOT the correct explanation of (A)", "Causality Blindspot Trap", "Failed to recognize that Reason directly explains Assertion."),
        ("(A) is true but (R) is false", "Reason Acceptance Trap", "Accepted an inaccurate business rationale as valid."),
        ("(A) is false but (R) is true", "Assertion Acceptance Trap", "Accepted an inaccurate business assertion as valid.")
    ]
    opts = []
    opt_ids = ["A", "B", "C", "D"]
    for i, opt_id in enumerate(opt_ids):
        is_corr = (opt_id == correct_opt)
        txt, trap, mistake = standard_opts[i]
        opts.append({
            "id": opt_id,
            "text": txt,
            "isCorrect": is_corr,
            "studentSelectionTrap": None if is_corr else trap,
            "mistakeAnalysis": "Correct answer. Rigorously verifies both Assertion and Reason and their causal linkage." if is_corr else mistake
        })

    return {
        "questionNumber": question_number,
        "chapter": chapter,
        "topic": topic,
        "questionText": text,
        "hasDiagram": False,
        "diagramDescription": None,
        "options": opts,
        "correctOption": correct_opt,
        "detailedSolution": solution
    }
