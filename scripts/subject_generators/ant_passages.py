import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, 'scripts/subject_generators')

from ant_passages_1_10 import PASSAGES_1_10
from ant_passages_11_20 import PASSAGES_11_20

PASSAGES_20 = PASSAGES_1_10 + PASSAGES_11_20
assert len(PASSAGES_20) == 20, f"Expected 20 passage pairs, got {len(PASSAGES_20)}"

for idx, (p1, p2) in enumerate(PASSAGES_20, 1):
    assert len(p1[1]) == 5, f"Mock {idx} P1 has {len(p1[1])} questions instead of 5"
    assert len(p2[1]) == 5, f"Mock {idx} P2 has {len(p2[1])} questions instead of 5"

print(f"All 20 Anthropology passage pairs verified: {len(PASSAGES_20)} pairs (40 passages, 200 questions).")
