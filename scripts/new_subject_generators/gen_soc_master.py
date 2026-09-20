import os
import sys
import json
import random
from collections import Counter

sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.builder_framework import build_mock_from_specs, get_balanced_target_keys
from scripts.new_subject_generators.common import verify_and_save_mock

PREFIX = "soc"
OUT_DIR = "mock/sociology"
os.makedirs(OUT_DIR, exist_ok=True)
global_seen = set()

print("Generating 20 CUET UG Mock Tests for SOCIOLOGY (1,000 Questions)...")

# CHAPTER NAMES
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

# We define 50 slots. Each slot has exactly 20 distinct question specifications.
# Mock m takes item m-1 from each slot.
slots = [[] for _ in range(50)]

