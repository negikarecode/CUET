import re
import json
import os

def normalize_text(text):
    if not text:
        return ""
    t = text.lower()
    t = re.sub(r"\[cite:[^\]]+\]", "", t)
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    t = re.sub(r"[\$\\\{\}\(\)\[\]_^\s\.,;:\-\+=\*\/<>]+", "", t)
    return t

def get_pyq_normalized_set():
    pyq_file = "pyq_accounts_temp.json"
    seen = set()
    if os.path.exists(pyq_file):
        with open(pyq_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                norm = normalize_text(item.get("raw", ""))
                if norm:
                    seen.add(norm)
    return seen

def make_question(
    chapter: str,
    topic: str,
    text: str,
    options_data: list,
    correct_opt: str,
    detailed_solution: str
):
    options = []
    opt_ids = ["A", "B", "C", "D"]
    for i, opt_id in enumerate(opt_ids):
        item = options_data[i]
        is_corr = (opt_id == correct_opt)
        if isinstance(item, tuple):
            opt_text, trap, mistake = item
        elif isinstance(item, dict):
            opt_text = item["text"]
            trap = item.get("trap", None if is_corr else "Accounting Principle Trap")
            mistake = item.get("mistake", "Correct NCERT principle" if is_corr else "Incorrect calculation or treatment")
        else:
            opt_text = str(item)
            trap = None if is_corr else "Distractor Choice Trap"
            mistake = (
                "Correct answer. Conforms to standard NCERT Accountancy principles and accounting standards."
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
    options_list: list,
    correct_opt: str,
    solution: str,
    traps: list = None
):
    text_lines = [stem, ""]
    text_lines.append("List I                                | List II")
    text_lines.append("--------------------------------------|--------------------------------------")
    for (code_i, item_i), (code_ii, item_ii) in zip(list_i, list_ii):
        text_lines.append(f"{code_i.ljust(6)} {item_i.ljust(30)} | {code_ii.ljust(6)} {item_ii}")
    text_lines.append("")
    text_lines.append("Choose the correct answer from the options given below:")
    full_text = "\n".join(text_lines)

    opts = []
    opt_ids = ["A", "B", "C", "D"]
    for i, opt_id in enumerate(opt_ids):
        is_corr = (opt_id == correct_opt)
        opt_str = options_list[i]
        trap = None if is_corr else (traps[i] if traps else "Cross-Column Misalignment Trap")
        mistake = (
            "Correct answer. Correctly pairs each item in List I with its corresponding match in List II."
            if is_corr
            else "Incorrect pairing. Confuses one or more paired attributes in the matching matrix."
        )
        opts.append({
            "id": opt_id,
            "text": opt_str,
            "isCorrect": is_corr,
            "studentSelectionTrap": trap,
            "mistakeAnalysis": mistake
        })

    return {
        "chapter": chapter,
        "topic": topic,
        "questionText": full_text,
        "hasDiagram": False,
        "diagramDescription": None,
        "options": opts,
        "correctOption": correct_opt,
        "detailedSolution": solution
    }

def make_sequence_question(
    chapter: str,
    topic: str,
    stem: str,
    steps: list,
    options_list: list,
    correct_opt: str,
    solution: str,
    traps: list = None
):
    text_lines = [stem, ""]
    letters = ["(A)", "(B)", "(C)", "(D)", "(E)"]
    for i, step in enumerate(steps):
        text_lines.append(f"{letters[i]} {step}")
    text_lines.append("")
    text_lines.append("Choose the correct answer from the options given below:")
    full_text = "\n".join(text_lines)

    opts = []
    opt_ids = ["A", "B", "C", "D"]
    for i, opt_id in enumerate(opt_ids):
        is_corr = (opt_id == correct_opt)
        opt_str = options_list[i]
        trap = None if is_corr else (traps[i] if traps else "Accounting Step Inversion Trap")
        mistake = (
            "Correct answer. Follows the precise accounting chronological sequence."
            if is_corr
            else "Inverts or scrambles the intermediate accounting procedure stages."
        )
        opts.append({
            "id": opt_id,
            "text": opt_str,
            "isCorrect": is_corr,
            "studentSelectionTrap": trap,
            "mistakeAnalysis": mistake
        })

    return {
        "chapter": chapter,
        "topic": topic,
        "questionText": full_text,
        "hasDiagram": False,
        "diagramDescription": None,
        "options": opts,
        "correctOption": correct_opt,
        "detailedSolution": solution
    }

def make_statement_question(
    chapter: str,
    topic: str,
    statement_1: str,
    statement_2: str,
    correct_opt: str,
    solution: str
):
    text = (
        f"Given below are two statements:\n"
        f"Statement I: {statement_1}\n"
        f"Statement II: {statement_2}\n\n"
        f"In light of the above statements, choose the correct answer from the options given below:"
    )
    standard_opts = [
        ("Both Statement I and Statement II are correct", "Statement Verification Error", "Student mistakenly believed both statements were valid"),
        ("Both Statement I and Statement II are incorrect", "Dual Rejection Error", "Student rejected both statements erroneously"),
        ("Statement I is correct but Statement II is incorrect", "Statement II Blindspot", "Failed to identify the inaccuracy in Statement II"),
        ("Statement I is incorrect but Statement II is correct", "Statement I Blindspot", "Failed to identify the inaccuracy in Statement I")
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
            "mistakeAnalysis": "Correct answer. Correctly evaluates truth value of both statements according to NCERT and Companies Act." if is_corr else mistake
        })

    return {
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
    solution: str
):
    text = (
        f"Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\n"
        f"Assertion (A): {assertion}\n"
        f"Reason (R): {reason}\n\n"
        f"In light of the above statements, choose the correct answer from the options given below:"
    )
    standard_opts = [
        ("Both (A) and (R) are true and (R) is the correct explanation of (A)", "Causality Confusion", "Student assumed Reason explains Assertion without causal link"),
        ("Both (A) and (R) are true but (R) is NOT the correct explanation of (A)", "Causality Blindspot", "Student failed to notice that Reason explains the mechanism directly"),
        ("(A) is true but (R) is false", "Reason Acceptance Trap", "Student accepted an incorrect Reason as true"),
        ("(A) is false but (R) is true", "Assertion Acceptance Trap", "Student accepted an incorrect Assertion as true")
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
            "mistakeAnalysis": "Correct answer. Correctly evaluates validity of Assertion, Reason and causal linkage." if is_corr else mistake
        })

    return {
        "chapter": chapter,
        "topic": topic,
        "questionText": text,
        "hasDiagram": False,
        "diagramDescription": None,
        "options": opts,
        "correctOption": correct_opt,
        "detailedSolution": solution
    }
