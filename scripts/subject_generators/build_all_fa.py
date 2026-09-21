import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, 'scripts/subject_generators')

from scripts.subject_mock_engine import generate_subject_suite
from fa_s1_10 import SLOTS_1_10
from fa_s11_20 import SLOTS_11_20
from fa_s21_30 import SLOTS_21_30
from fa_s31_40 import SLOTS_31_40
from fa_passages import PASSAGES_20

slots_dict = {}
slots_dict.update(SLOTS_1_10)
slots_dict.update(SLOTS_11_20)
slots_dict.update(SLOTS_21_30)
slots_dict.update(SLOTS_31_40)

assert len(slots_dict) == 40, f"Expected 40 slots, got {len(slots_dict)}"
slot_specs_40 = [slots_dict[i] for i in range(1, 41)]

print("Starting full generation for Fine Arts / Visual Arts (fa)...")
generate_subject_suite(
    subject_key="fine_arts",
    subject_prefix="fa",
    out_dir="mock/fine_arts",
    slot_specs_40=slot_specs_40,
    passage_specs_20=PASSAGES_20
)
print("Fine Arts generation complete!")
