import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import mcq, stmt, ar, match, seq

CH_MARKET = "The Market as a Social Institution"
CH_INEQ = "Patterns of Social Inequality and Exclusion"

def build_slot(ch, items):
    res = []
    for itm in items:
        qtype = itm[0]
        if qtype == "mcq":
            _, top, stem, corr, wrongs, expl = itm
            res.append(mcq(ch, top, stem, corr, wrongs, expl))
        elif qtype == "stmt":
            _, top, s1, s2, rel, expl = itm
            res.append(stmt(ch, top, s1, s2, rel, expl))
        elif qtype == "ar":
            _, top, a, r, rel, expl = itm
            res.append(ar(ch, top, a, r, rel, expl))
        elif qtype == "match":
            _, top, stem, l1, l2, pair, expl = itm
            res.append(match(ch, top, stem, l1, l2, pair, expl))
        elif qtype == "seq":
            _, top, stem, items_list, order_str, expl = itm
            res.append(seq(ch, top, stem, items_list, order_str, expl))
    assert len(res) == 20, f"Slot has {len(res)} items instead of 20"
    return res

# Import from append_slots_13_20.py
import scripts.subject_generators.append_slots_13_20 as s13_20
SLOT17 = s13_20.slots[17]
SLOT18 = s13_20.slots[18]
SLOT19 = s13_20.slots[19]
SLOT20 = s13_20.slots[20]

print("Slots 17 to 20 loaded.")
EOF
