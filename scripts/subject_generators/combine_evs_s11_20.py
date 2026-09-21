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

CH_BIODIV = "Biodiversity and Conservation"
CH_POLLUTION = "Monitoring the Environment and Pollution"
'''

with open('scripts/subject_generators/make_evs_s11_15.py', 'r') as f:
    text1 = f.read()
s_idx1 = text1.find("s11_to_15 = '''") + len("s11_to_15 = '''")
e_idx1 = text1.rfind("'''")
code1 = text1[s_idx1:e_idx1]

with open('scripts/subject_generators/make_evs_s16_20.py', 'r') as f:
    text2 = f.read()
s_idx2 = text2.find("s16_to_20 = '''") + len("s16_to_20 = '''")
e_idx2 = text2.rfind("'''")
code2 = text2[s_idx2:e_idx2]

with open('scripts/subject_generators/make_evs_s18_20.py', 'r') as f:
    text3 = f.read()
s_idx3 = text3.find("s18_to_20 = '''") + len("s18_to_20 = '''")
e_idx3 = text3.rfind("'''")
code3 = text3[s_idx3:e_idx3]

footer = '''
SLOTS_11_20 = {
    11: build_slot(CH_BIODIV, s11_raw),
    12: build_slot(CH_BIODIV, s12_raw),
    13: build_slot(CH_POLLUTION, s13_raw),
    14: build_slot(CH_POLLUTION, s14_raw),
    15: build_slot(CH_POLLUTION, s15_raw),
    16: build_slot(CH_POLLUTION, s16_raw),
    17: build_slot(CH_POLLUTION, s17_raw),
    18: build_slot(CH_POLLUTION, s18_raw),
    19: build_slot(CH_POLLUTION, s19_raw),
    20: build_slot(CH_POLLUTION, s20_raw),
}

if __name__ == "__main__":
    assert len(SLOTS_11_20) == 10
    total_q = sum(len(v) for v in SLOTS_11_20.values())
    assert total_q == 200, f"Expected 200 Qs, got {total_q}"
    print(f"Environmental Studies Slots 11 to 20 compiled successfully: {len(SLOTS_11_20)} slots ({total_q} questions).")
'''

full_code = header + code1 + code2 + code3 + footer

with open('scripts/subject_generators/evs_s11_20.py', 'w') as f:
    f.write(full_code)

print("evs_s11_20.py written successfully. Total length:", len(full_code))
