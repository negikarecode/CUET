import sys, os
sys.path.insert(0, os.getcwd())

with open('scripts/subject_generators/make_evs_s1_10.py', 'r') as f:
    part1 = f.read()

# Extract code string from part1
# In make_evs_s1_10.py, code = '''...'''
start_idx = part1.find("code = '''") + len("code = '''")
end_idx = part1.rfind("'''")
base_code = part1[start_idx:end_idx]

# Remove the trailing SLOTS_1_10 definition in base_code
cut_idx = base_code.find("SLOTS_1_10 = {")
clean_base = base_code[:cut_idx]

with open('scripts/subject_generators/append_evs_s3_6.py', 'r') as f:
    part2 = f.read()
start_idx2 = part2.find("s3_to_6 = '''") + len("s3_to_6 = '''")
end_idx2 = part2.rfind("'''")
code2 = part2[start_idx2:end_idx2]

with open('scripts/subject_generators/append_evs_s7_10.py', 'r') as f:
    part3 = f.read()
start_idx3 = part3.find("s7_to_10 = '''") + len("s7_to_10 = '''")
end_idx3 = part3.rfind("'''")
code3 = part3[start_idx3:end_idx3]

footer = '''
SLOTS_1_10 = {
    1: build_slot(CH_NATURE, s1_raw),
    2: build_slot(CH_POP_ECOL, s2_raw),
    3: build_slot(CH_NATURE, s3_raw),
    4: build_slot(CH_NATURE, s4_raw),
    5: build_slot(CH_POP_ECOL, s5_raw),
    6: build_slot(CH_POP_ECOL, s6_raw),
    7: build_slot(CH_BIODIV, s7_raw),
    8: build_slot(CH_BIODIV, s8_raw),
    9: build_slot(CH_BIODIV, s9_raw),
    10: build_slot(CH_BIODIV, s10_raw),
}

if __name__ == "__main__":
    assert len(SLOTS_1_10) == 10
    total_q = sum(len(v) for v in SLOTS_1_10.values())
    assert total_q == 200, f"Expected 200 Qs, got {total_q}"
    print(f"Environmental Studies Slots 1 to 10 compiled successfully: {len(SLOTS_1_10)} slots ({total_q} questions).")
'''

full_code = clean_base + code2 + code3 + footer

with open('scripts/subject_generators/evs_s1_10.py', 'w') as f:
    f.write(full_code)

print("evs_s1_10.py written successfully. Total length:", len(full_code))
