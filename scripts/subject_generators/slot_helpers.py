import os, sys

def mcq(ch, top, stem, corr, wrongs, expl, mist=None):
    if mist is None:
        mist = f"Accurately explains {top}."
    sol = f"{expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("mcq", ch, top, stem, corr, wrongs, sol, mist)

def stmt(ch, top, s1, s2, rel, expl, mist=None):
    if mist is None:
        mist = f"Evaluates dual statements on {top} correctly."
    sol = f"{expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("stmt", ch, top, s1, s2, rel, sol, mist)

def ar(ch, top, a, r, rel, expl, mist=None):
    if mist is None:
        mist = f"Analyzes causal relationship regarding {top} correctly."
    sol = f"{expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("ar", ch, top, a, r, rel, sol, mist)

def match(ch, top, stem, l1, l2, pair, expl, mist=None):
    if mist is None:
        mist = f"Matches conceptual categories for {top} correctly."
    sol = f"{expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("match", ch, top, stem, l1, l2, pair, sol, mist)

def seq(ch, top, stem, items, order_str, expl, mist=None):
    if mist is None:
        mist = f"Correctly sequences {top}."
    sol = f"{expl}\nHence, Option {{{{CORR}}}} is correct."
    return ("seq", ch, top, stem, items, order_str, sol, mist)

def case_q(ch, top, prompt, corr, wrongs, expl, mist=None):
    if mist is None:
        mist = f"Accurately analyzes case evidence on {top}."
    sol = f"{expl}\nHence, Option {{{{CORR}}}} is correct."
    return (ch, top, prompt, corr, wrongs, sol, mist)

print("slot_helpers.py ready.")
