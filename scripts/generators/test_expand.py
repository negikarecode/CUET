import sys, os
sys.path.insert(0, os.getcwd())
from scripts.generators.concept_factory import raw_mcq, raw_stmt, raw_ar, raw_match, raw_seq

def expand_concept(ch, c_spec):
    top, mcq, stmt, ar, ms = c_spec
    res = []
    res.append(raw_mcq(ch, top, *mcq))
    res.append(raw_stmt(ch, top, *stmt))
    res.append(raw_ar(ch, top, *ar))
    if ms[0] == "match":
        res.append(raw_match(ch, top, ms[1], ms[2], ms[3], ms[4], ms[5], ms[6]))
    else:
        res.append(raw_seq(ch, top, ms[1], ms[2], ms[3], ms[4], ms[5]))
    return res

test_spec = (
    "Malthusian Theory",
    ("According to Malthus, at what rate does population grow?", "Geometrically", ["Arithmetically", "Logarithmically", "Statically"], "Malthus stated population grows geometrically.", "Identifies geometric growth."),
    ("Malthus identified positive checks as natural events like famines and epidemics.", "Malthus advocated government cash doles to eliminate poverty.", 3, "Positive checks are natural disasters; Malthus opposed cash doles.", "Distinguishes positive checks from welfare."),
    ("Marxist thinkers rejected Malthusian population theory.", "Famines are caused by unequal distribution and colonial exploitation rather than absolute food shortage.", 1, "Marxists argued poverty is caused by structural inequality.", "Understands Marxist critique."),
    ("seq", "Arrange the Malthusian population cycle stages:", [("A", "Agricultural abundance"), ("B", "Geometric population expansion"), ("C", "Severe food scarcity"), ("D", "Positive checks contract population")], "A, B, C, D", "Cycle begins with abundance, leads to expansion, scarcity, and contraction.", "Sequences Malthusian cycle.")
)

res = expand_concept("Demography", test_spec)
print(f"Expanded {len(res)} questions. Types: {[r[0] for r in res]}")
