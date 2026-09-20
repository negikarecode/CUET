import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, 'scripts/subject_generators')

from scripts.subject_mock_engine import generate_subject_suite
from soc_s1_10 import SLOTS_1_10
from soc_s11_20_final import SLOTS_11_20
from soc_s21_25 import SLOTS_21_25
from soc_s26_30 import SLOTS_26_30
from soc_s31_35 import SLOTS_31_35
from soc_s36_40 import SLOTS_36_40
from soc_passages import PASSAGES_20

slots_dict = {}
slots_dict.update(SLOTS_1_10)
slots_dict.update(SLOTS_11_20)
slots_dict.update(SLOTS_21_25)
slots_dict.update(SLOTS_26_30)
slots_dict.update(SLOTS_31_35)
slots_dict.update(SLOTS_36_40)

slot_specs_40 = [slots_dict[i] for i in range(1, 41)]

print("Starting full generation for Sociology...")
generate_subject_suite(
    subject_key="sociology",
    subject_prefix="soc",
    out_dir="mock/sociology",
    slot_specs_40=slot_specs_40,
    passage_specs_20=PASSAGES_20
)
print("Sociology generation complete!")
