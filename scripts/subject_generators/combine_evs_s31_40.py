import sys, os
sys.path.insert(0, os.getcwd())

header = '''import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import mcq, stmt, ar, match, seq

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

CH_ECONOMICS = "Environmental and Natural Resource Economics"
CH_TREATIES = "International Environmental Treaties and Indian Policy"
'''

with open('scripts/subject_generators/make_evs_s31_35.py', 'r') as f:
    text1 = f.read()
s_idx1 = text1.find("s31_to_35 = '''") + len("s31_to_35 = '''")
e_idx1 = text1.rfind("'''")
code1 = text1[s_idx1:e_idx1]

with open('scripts/subject_generators/make_evs_s36_40.py', 'r') as f:
    text2 = f.read()
s_idx2 = text2.find("s36_to_40 = '''") + len("s36_to_40 = '''")
e_idx2 = text2.rfind("'''")
code2 = text2[s_idx2:e_idx2]

footer = '''
SLOTS_31_40 = {
    31: build_slot(CH_ECONOMICS, s31_raw),
    32: build_slot(CH_ECONOMICS, s32_raw),
    33: build_slot(CH_ECONOMICS, s33_raw),
    34: build_slot(CH_ECONOMICS, s34_raw),
    35: build_slot(CH_ECONOMICS, s35_raw),
    36: build_slot(CH_TREATIES, s36_raw),
    37: build_slot(CH_TREATIES, s37_raw),
    38: build_slot(CH_TREATIES, s38_raw),
    39: build_slot(CH_TREATIES, s39_raw),
    40: build_slot(CH_TREATIES, s40_raw),
}

if __name__ == "__main__":
    assert len(SLOTS_31_40) == 10
    total_q = sum(len(v) for v in SLOTS_31_40.values())
    assert total_q == 200, f"Expected 200 Qs, got {total_q}"
    print(f"Environmental Studies Slots 31 to 40 compiled successfully: {len(SLOTS_31_40)} slots ({total_q} questions).")
'''

full_code = header + code1 + code2 + footer

with open('scripts/subject_generators/evs_s31_40.py', 'w') as f:
    f.write(full_code)

print("evs_s31_40.py written successfully. Total length:", len(full_code))
