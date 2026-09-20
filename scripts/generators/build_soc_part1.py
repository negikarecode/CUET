import json, os, sys
sys.path.insert(0, os.getcwd())
from scripts.generators.concept_factory import raw_mcq, raw_stmt, raw_ar, raw_match, raw_seq

os.makedirs("mock_units/sociology", exist_ok=True)

CH_DEMO = "The Demographic Structure of the Indian Society"
CH_INST = "Social Institutions: Continuity and Change"
CH_MARKET = "The Market as a Social Institution"
CH_INEQ = "Patterns of Social Inequality and Exclusion"

print("Building Unit 1 to Unit 4 for Sociology...")
