import sys, os
sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.builder_framework import build_mock_from_specs, get_balanced_target_keys
from scripts.new_subject_generators.common import verify_and_save_mock, normalize_text

print("Testing environment ready.")
