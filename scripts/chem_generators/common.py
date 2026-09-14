import json, re

def normalize_text(text):
    if not text: return ""
    t = text.lower()
    t = re.sub(r"\[cite:[^\]]+\]", "", t)
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    t = re.sub(r"[\$\\\{\}\(\)\[\]_^\s\.,;:\-\+=\*\/<>]+", "", t)
    return t

def make_question(chapter, topic, text, options_list, correct_opt, solution, trap_desc="Incorrect concept application", mistake_desc="Student miscalculated or applied wrong principle"):
    return {
        "chapter": chapter,
        "topic": topic,
        "questionText": text,
        "hasDiagram": False,
        "diagramDescription": "",
        "options": [
            {
                "id": opt_id,
                "text": opt_text,
                "isCorrect": (opt_id == correct_opt),
                "studentSelectionTrap": trap_desc if opt_id != correct_opt else "Correct concept and formula application",
                "mistakeAnalysis": mistake_desc if opt_id != correct_opt else "Follows standard NCERT derivation and principle"
            }
            for opt_id, opt_text in zip(["A", "B", "C", "D"], options_list)
        ],
        "correctOption": correct_opt,
        "detailedSolution": solution
    }

def get_base_seen():
    seen = set()
    for m in [1, 2, 3, 4, 5, 19, 20]:
        with open(f"mock/chemistry/{m}.json") as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))
    return seen
