import os
import sys
import json

sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.builder_framework import build_mock_from_specs, get_balanced_target_keys
from scripts.new_subject_generators.common import verify_and_save_mock

PREFIX = "soc"
OUT_DIR = "mock/sociology"
os.makedirs(OUT_DIR, exist_ok=True)
global_seen = set()

print(f"Building 20 Mocks (1,000 Questions) for SOCIOLOGY in {OUT_DIR}...")

CH_DEMO = "The Demographic Structure of the Indian Society"
CH_INST = "Social Institutions: Continuity and Change"
CH_MARKET = "The Market as a Social Institution"
CH_INEQ = "Patterns of Social Inequality and Exclusion"
CH_DIV = "The Challenges of Cultural Diversity"
CH_STRUC = "Structural Change"
CH_CULT = "Cultural Change"
CH_DEMOC = "The Story of Indian Democracy"
CH_RURAL = "Change and Development in Rural Society"
CH_INDUS = "Change and Development in Industrial Society"
CH_GLOB = "Globalisation and Social Change"
CH_MEDIA = "Mass Media and Communications"
CH_MOV = "Social Movements"

