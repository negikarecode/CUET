import os
import json
import re

mock_dir = "mock"
subjects = [
    "physics", "chemistry", "maths", "bio", "accs",
    "eco", "bst", "history", "pol science", "geo", "psychology"
]

def determine_difficulty(subject, q):
    q_type = q.get("questionType", "conceptual")
    text = (q.get("questionText") or "").strip()
    text_lower = text.lower()
    topic = (q.get("topic") or "").lower()
    chapter = (q.get("chapter") or "").lower()
    formula = q.get("formula")
    has_diagram = q.get("hasDiagram", False)

    # 1. Level 4 (Very Difficult): High-order Case-based passage interpretation and complex multi-stage synthesis
    if q_type == "case-based" or "read the following passage" in text_lower or "read the following case" in text_lower or "read the following excerpt" in text_lower:
        # Check if the question requires deep inference or is a direct factual lookup
        if any(w in text_lower for w in ["infer", "conclude", "primary implication", "underlying cause", "evaluate", "synthesize"]):
            return 4, 80
        elif len(text) > 250:
            return 4, 75
        else:
            return 3, 65

    # 2. Level 3 (Difficult): Assertion-Reasoning, Multi-statement, Complex Numericals
    if q_type in ["assertion-reasoning", "multi-statement"]:
        return 3, 70

    if "given below are two statements" in text_lower or "statement i" in text_lower or "assertion (a)" in text_lower:
        return 3, 70

    # 3. Science & Math specific logic
    if subject in ["physics", "chemistry", "maths"]:
        if subject == "maths":
            # Direct 1-step formulas / modular arithmetic / elementary definitions
            if any(w in text_lower for w in ["least non-negative integer", "magnitude of the vector", "sure (certain) event", "principal value of", "order of", "domain of"]):
                if len(text) < 140:
                    return 1, 35
            if "\\int e^{" in text_lower or "int_{0}^{\\pi}\\sin" in text_lower or "p(s)" in text_lower:
                return 1, 35
            # Multi-step problems (Determinants 3x3, matrix multiplication, differential equation general solution, work & time)
            if any(w in text_lower for w in ["determinant", "area (in sq. units)", "can fill a cistern", "cistern", "feasible region", "differential equation", "integrating factor", "strictly increasing", "strictly decreasing"]):
                return 3, 75
            if "\\begin{bmatrix}1 & 2 & 3" in text or "\\frac{\\cos 2x - 1}" in text or "a^2 - 2a" in text_lower:
                return 3, 75
            if q_type == "direct-numerical" or "\\frac" in text or "\\int" in text:
                return 2, 55
            return 2, 50

        # Physics & Chemistry
        if q_type == "direct-numerical" or formula or "\\frac" in text or "\\int" in text or "\\sqrt" in text:
            if len(text) > 180 or "find the value" in text_lower or "evaluate" in text_lower or "shortest distance" in text_lower or "rate constant" in text_lower:
                return 3, 75
            else:
                return 2, 55

        # Level 1 Easy definitions in Science
        if any(w in text_lower for w in ["si unit of", "dimension of", "symbol of", "defined as", "formula for", "phenomenon of"]):
            if len(text) < 130:
                return 1, 35

        return 2, 50

    # 4. Biology specific logic
    if subject == "bio":
        # Direct recall / factual NCERT
        if any(w in text_lower for w in ["which enzyme", "expanded form of", "causative agent of", "known as", "termed as", "example of"]):
            return 1, 35
        elif any(w in topic for w in ["definition", "acronym", "types", "examples"]):
            return 1, 35
        # Multi-stage processes (e.g. transcription, translation, recombinant DNA)
        elif any(w in topic or w in chapter for w in ["molecular basis", "biotechnology", "pedigree", "hardy-weinberg", "linkage"]):
            return 3, 65
        else:
            return 2, 45

    # 5. Commerce (Accountancy, Economics, Business Studies)
    if subject == "accs":
        if q_type == "direct-numerical" or any(w in text_lower for w in ["calculate", "ratio", "forfeited", "capital reserve", "cash flow"]):
            return 3, 75
        elif any(w in text_lower for w in ["meaning of", "nature of", "primary objective", "called as"]):
            return 1, 35
        else:
            return 2, 50

    if subject == "eco":
        if any(w in text_lower for w in ["calculate", "multiplier", "elasticity", "mpc", "mps"]):
            return 3, 70
        elif any(w in text_lower for w in ["defined as", "formula of", "meaning of", "full form of", "which year"]):
            return 1, 35
        elif any(w in topic for w in ["meaning", "concept", "types"]):
            return 1, 35
        else:
            return 2, 50

    if subject == "bst":
        if any(w in text_lower for w in ["identify the principle", "which function of management", "technique of taylor"]):
            return 2, 45
        elif any(w in text_lower for w in ["meaning of", "father of scientific", "principles of management propounded by", "levels of management"]):
            return 1, 35
        else:
            return 2, 45

    # 6. Humanities (History, Pol Science, Geography, Psychology)
    if subject in ["history", "pol science", "geo", "psychology"]:
        if any(w in text_lower for w in ["arrange the following", "chronological", "match list"]):
            return 3, 65
        
        # Direct recall of dates, book authors, treaties, simple definitions
        is_direct_recall = any(w in text_lower for w in [
            "in which year", "who was the founder", "who coined", "author of",
            "headquarters of", "who defined", "how many", "which state has the highest",
            "which country", "iq formula", "developed the concept of"
        ])
        if is_direct_recall and len(text) < 160:
            return 1, 35
        
        # Conceptual interpretation
        if len(text) > 200 or "analyse" in text_lower or "distinction between" in text_lower:
            return 3, 60
        else:
            return 2, 45

    return 2, 50

def run():
    print("Recalibrating difficulty distributions based on authentic cognitive complexity...")
    stats = {}
    for s in subjects:
        diff_counts = {1: 0, 2: 0, 3: 0, 4: 0}
        s_dir = os.path.join(mock_dir, s)
        for f in sorted(os.listdir(s_dir), key=lambda x: int(x.split('.')[0]) if x.split('.')[0].isdigit() else 99):
            if not f.endswith('.json'): continue
            fpath = os.path.join(s_dir, f)
            with open(fpath, "r") as fp:
                data = json.load(fp)
            
            for q in data:
                diff, time_sec = determine_difficulty(s, q)
                q["difficulty"] = diff
                q["difficultyLevel"] = diff
                q["estimatedTimeSeconds"] = time_sec
                diff_counts[diff] += 1
            
            with open(fpath, "w") as fp:
                json.dump(data, fp, indent=2)
        stats[s] = diff_counts

    print("\n--- RECALIBRATED DIFFICULTY DISTRIBUTIONS ---")
    total_diff = {1: 0, 2: 0, 3: 0, 4: 0}
    for s, counts in stats.items():
        print(f"  {s:15}: Level 1 (Easy)={counts[1]:3}, Level 2 (Mod)={counts[2]:3}, Level 3 (Diff)={counts[3]:3}, Level 4 (Very Diff)={counts[4]:3}")
        for k in total_diff:
            total_diff[k] += counts[k]
    
    print(f"\nOVERALL BANK DISTRIBUTION:")
    print(f"  Level 1 (Easy)        : {total_diff[1]:5} ({total_diff[1]/110:.1f}%)")
    print(f"  Level 2 (Moderate)    : {total_diff[2]:5} ({total_diff[2]/110:.1f}%)")
    print(f"  Level 3 (Difficult)   : {total_diff[3]:5} ({total_diff[3]/110:.1f}%)")
    print(f"  Level 4 (Very Diff)   : {total_diff[4]:5} ({total_diff[4]/110:.1f}%)")

if __name__ == "__main__":
    run()
