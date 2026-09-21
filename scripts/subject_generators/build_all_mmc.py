import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, 'scripts/subject_generators')

from scripts.subject_mock_engine import generate_subject_suite
from mmc_s1_10 import SLOTS_1_10
from mmc_s11_20 import SLOTS_11_20
from mmc_s21_30 import SLOTS_21_30
from mmc_s31_40 import SLOTS_31_40
from mmc_passages import PASSAGES_20

slots_dict = {}
slots_dict.update(SLOTS_1_10)
slots_dict.update(SLOTS_11_20)
slots_dict.update(SLOTS_21_30)
slots_dict.update(SLOTS_31_40)

assert len(slots_dict) == 40, f"Expected 40 slots, got {len(slots_dict)}"
slot_specs_40 = [slots_dict[i] for i in range(1, 41)]

print("Starting full generation for Mass Media & Mass Communication...")
generate_subject_suite(
    subject_key="mass_media",
    subject_prefix="mmc",
    out_dir="mock/mass_media",
    slot_specs_40=slot_specs_40,
    passage_specs_20=PASSAGES_20
)
print("Mass Media generation complete!")
