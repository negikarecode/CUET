import os

code = '''import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.generators.concept_factory import raw_mcq, raw_stmt, raw_ar, raw_match, raw_seq

CH_DEMO = "The Demographic Structure of the Indian Society"
CH_INST = "Social Institutions: Continuity and Change"
CH_MARKET = "The Market as a Social Institution"
CH_INEQ = "Patterns of Social Inequality and Exclusion"

# ==============================================================================
# UNIT 1: DEMOGRAPHIC STRUCTURE (25 Concepts x 4 = 100 Questions)
# ==============================================================================
u1_data = []

def add_concept(q_list, ch, top, mcq_args, stmt_args, ar_args, match_or_seq_args):
    q_list.append(raw_mcq(ch, top, *mcq_args))
    q_list.append(raw_stmt(ch, top, *stmt_args))
    q_list.append(raw_ar(ch, top, *ar_args))
    if match_or_seq_args[0] == "match":
        q_list.append(raw_match(ch, top, *match_or_seq_args[1:]))
    else:
        q_list.append(raw_seq(ch, top, *match_or_seq_args[1:]))

print("Building Unit 1 questions...")
'''
print("Template ready, lines:", len(code.splitlines()))
