import json, os, sys

fpath = "scripts/subject_generators/soc_slots_1_20.py"

header = '''# Sociology Slots 1 to 20 (400 questions)
# Strictly aligned with NCERT Class 12 Indian Society

CH_DEMO = "The Demographic Structure of the Indian Society"
CH_INST = "Social Institutions: Continuity and Change"
CH_MARKET = "The Market as a Social Institution"
CH_INEQ = "Patterns of Social Inequality and Exclusion"

SLOTS_1_20 = {}
'''

with open(fpath, "w", encoding="utf-8") as f:
    f.write(header)

print("Header written to", fpath)
