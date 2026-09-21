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

CH_POLLUTION = "Monitoring the Environment and Pollution"
CH_SUSTAINABLE = "Third World Development and Sustainable Agriculture"
'''

with open('scripts/subject_generators/make_evs_s21_25.py', 'r') as f:
    text1 = f.read()
s_idx1 = text1.find("s21_to_25 = '''") + len("s21_to_25 = '''")
e_idx1 = text1.rfind("'''")
code1 = text1[s_idx1:e_idx1]

with open('scripts/subject_generators/make_evs_s26_30.py', 'r') as f:
    text2 = f.read()
s_idx2 = text2.find("s26_to_30 = '''") + len("s26_to_30 = '''")
e_idx2 = text2.rfind("'''")
code2 = text2[s_idx2:e_idx2]

footer = '''
SLOTS_21_30 = {
    21: build_slot(CH_POLLUTION, s21_raw),
    22: build_slot(CH_POLLUTION, s22_raw),
    23: build_slot(CH_POLLUTION, s23_raw),
    24: build_slot(CH_SUSTAINABLE, s24_raw),
    25: build_slot(CH_SUSTAINABLE, s25_raw),
    26: build_slot(CH_SUSTAINABLE, s26_raw),
    27: build_slot(CH_SUSTAINABLE, s27_raw),
    28: build_slot(CH_SUSTAINABLE, s28_raw),
    29: build_slot(CH_SUSTAINABLE, s29_raw),
    30: build_slot(CH_SUSTAINABLE, s30_raw),
}

if __name__ == "__main__":
    assert len(SLOTS_21_30) == 10
    total_q = sum(len(v) for v in SLOTS_21_30.values())
    assert total_q == 200, f"Expected 200 Qs, got {total_q}"
    print(f"Environmental Studies Slots 21 to 30 compiled successfully: {len(SLOTS_21_30)} slots ({total_q} questions).")
'''

full_code = header + code1 + code2 + footer

with open('scripts/subject_generators/evs_s21_30.py', 'w') as f:
    f.write(full_code)

print("evs_s21_30.py written successfully. Total length:", len(full_code))
