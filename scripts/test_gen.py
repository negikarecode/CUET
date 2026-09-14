import json

def q(text, ch, top, opts, ans, sol, trap="Misapplication of formula", anal="Student computed value incorrectly"):
    return {
        "chapter": ch,
        "topic": top,
        "questionText": text,
        "hasDiagram": False,
        "diagramDescription": "",
        "options": [
            {
                "id": opt_id,
                "text": opt_text,
                "isCorrect": (opt_id == ans),
                "studentSelectionTrap": trap if opt_id != ans else "Direct application of NCERT formula",
                "mistakeAnalysis": anal if opt_id != ans else "Accurate reasoning"
            }
            for opt_id, opt_text in zip(["A", "B", "C", "D"], opts)
        ],
        "correctOption": ans,
        "detailedSolution": sol
    }

print("Test helper defined.")
