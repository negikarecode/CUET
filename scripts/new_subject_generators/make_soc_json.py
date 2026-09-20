import os, sys, json, re, random
from collections import Counter

sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.common import (
    normalize_text, rotate_options, get_balanced_target_keys, verify_and_save_mock
)

PREFIX = "soc"
OUT_DIR = "mock/sociology"
os.makedirs(OUT_DIR, exist_ok=True)
global_seen = set()

print("Building 20 Mocks (1,000 Questions) for Sociology...")
