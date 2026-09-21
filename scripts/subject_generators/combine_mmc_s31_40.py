#!/usr/bin/env python3
"""
combine_mmc_s31_40.py
Combines mmc_s31_35.py and mmc_s36_40.py into mmc_s31_40.py.
"""

import sys, os

out_path = "scripts/subject_generators/mmc_s31_40.py"

with open("scripts/subject_generators/mmc_s31_35.py", "r", encoding="utf-8") as f:
    text35 = f.read()

with open("scripts/subject_generators/mmc_s36_40.py", "r", encoding="utf-8") as f:
    text40 = f.read()

header = '''# Mass Media & Mass Communication (Code 318) - Slots 31 to 40 (200 Questions)
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import mcq, stmt, ar, match, seq

SLOTS_31_40 = {}
'''

# In text35, extract after header and replace SLOTS_31_35 with SLOTS_31_40
p35 = text35[text35.find("# SLOT 31:"):]
p35 = p35[:p35.find("print(\"Mass Media Slots 31 to 35")]
p35 = p35.replace("SLOTS_31_35[", "SLOTS_31_40[")

# In text40, extract after header and replace SLOTS_36_40 with SLOTS_31_40
p40 = text40[text40.find("# SLOT 36:"):]
p40 = p40[:p40.find("print(\"Mass Media Slots 36 to 40")]
p40 = p40.replace("SLOTS_36_40[", "SLOTS_31_40[")

full = header + "\n" + p35 + "\n" + p40 + "\n" + 'print("Mass Media Slots 31 to 40 compiled successfully: 10 slots (200 questions).")\n'

with open(out_path, "w", encoding="utf-8") as f:
    f.write(full)

print(f"Generated {out_path} ({len(full)} bytes)")
