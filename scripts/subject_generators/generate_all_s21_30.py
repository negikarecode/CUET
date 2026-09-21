#!/usr/bin/env python3
"""
generate_all_s21_30.py
Generates scripts/subject_generators/mmc_s21_30.py cleanly.
"""

import sys, os

out_path = "scripts/subject_generators/mmc_s21_30.py"

# Read s21, s22, s23 from make_mmc_s21_30.py safely using string slicing
with open("scripts/subject_generators/make_mmc_s21_30.py", "r", encoding="utf-8") as f:
    text = f.read()

# Extract from '# ==============================================================================\n# SLOT 21:' up to 'slots_code.append(s23)'
start_s21 = text.find("# SLOT 21:")
end_s23 = text.find("slots_code.append(s23)")

# Extract s24 and s25 from create_mmc_s21_30.py
with open("scripts/subject_generators/create_mmc_s21_30.py", "r", encoding="utf-8") as f:
    c_text = f.read()

start_s24 = c_text.find("# SLOT 24:")
end_s25 = c_text.find("f.write(slot24_25")

# Extract s26 to s30 from append_mmc_s26_30.py
with open("scripts/subject_generators/append_mmc_s26_30.py", "r", encoding="utf-8") as f:
    a_text = f.read()

start_s26 = a_text.find("# SLOT 26:")
end_s30 = a_text.find("with open(out_path, \"a\"")

header = '''# Mass Media & Mass Communication (Code 318) - Slots 21 to 30 (200 Questions)
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import mcq, stmt, ar, match, seq

SLOTS_21_30 = {}
'''

# Clean up any quote markers or variable assignments
part_21_23 = text[start_s21:end_s23]
part_21_23 = part_21_23.replace("slots_code.append(s21)", "").replace("slots_code.append(s22)", "").replace("slots_code.append(s23)", "")
part_21_23 = part_21_23.replace("s21 = '''", "").replace("s22 = '''", "").replace("s23 = '''", "").replace("'''", "")

part_24_25 = c_text[start_s24:end_s25]
part_24_25 = part_24_25.replace("'''", "")

part_26_30 = a_text[start_s26:end_s30]
part_26_30 = part_26_30.replace("'''", "")

full_code = header + "\n" + part_21_23 + "\n" + part_24_25 + "\n" + part_26_30 + "\n" + 'print("Mass Media Slots 21 to 30 compiled successfully: 10 slots (200 questions).")\n'

with open(out_path, "w", encoding="utf-8") as f:
    f.write(full_code)

print(f"Generated {out_path} ({len(full_code)} bytes)")
