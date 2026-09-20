import os, sys

fpath = "scripts/generators/soc/slots_1_10.py"
print(f"Writing {fpath}...")

code_header = '''# Sociology Slots 1 to 10 (20 questions each = 200 questions)
# Strictly aligned with NCERT Class 12 Indian Society

CH_DEMO = "The Demographic Structure of the Indian Society"
CH_INST = "Social Institutions: Continuity and Change"

SLOTS = {}
'''

with open(fpath, "w", encoding="utf-8") as f:
    f.write(code_header)

print("Header written.")
