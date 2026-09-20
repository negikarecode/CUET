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

print(f"Generating 20 Mocks (1,000 Questions) for SOCIOLOGY in {OUT_DIR} via Slot Matrix...")

