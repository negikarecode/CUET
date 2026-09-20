import sys, os
sys.path.insert(0, os.getcwd())

def raw_mcq(chapter, topic, stem, corr, wrongs, sol_expl, mist):
    sol = f"{sol_expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("mcq", chapter, topic, stem, corr, wrongs, sol, mist)

def raw_stmt(chapter, topic, s1, s2, rel, sol_expl, mist):
    sol = f"{sol_expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("stmt", chapter, topic, s1, s2, rel, sol, mist)

def raw_ar(chapter, topic, a, r, rel, sol_expl, mist):
    sol = f"{sol_expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("ar", chapter, topic, a, r, rel, sol, mist)

def raw_match(chapter, topic, stem, list1, list2, correct_str, sol_expl, mist):
    sol = f"{sol_expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("match", chapter, topic, stem, list1, list2, correct_str, sol, mist)

def raw_seq(chapter, topic, stem, items, correct_str, sol_expl, mist):
    sol = f"{sol_expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("seq", chapter, topic, stem, items, correct_str, sol, mist)

def raw_case(chapter, topic, prompt, corr, wrongs, sol_expl, mist):
    sol = f"{sol_expl}\nHence, Option {{{{CORR}}}} is correct."
    return (chapter, topic, prompt, corr, wrongs, sol, mist)

print("concept_factory.py loaded successfully.")
