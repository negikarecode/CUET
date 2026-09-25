"""
CUET UG Master Question Paper Rebuild - Unified Standalone Questions Pool
Combines Pool Part 1 (Ch 1-4), Part 2 (Ch 5-8), and Part 3 (Ch 9-13).
Total: Exactly 800 publication-grade standalone questions.
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from scripts.bst_rebuild.pool_part1 import get_part1_questions
from scripts.bst_rebuild.pool_part2 import get_part2_questions
from scripts.bst_rebuild.pool_part3 import get_part3_questions

def get_all_standalone_questions():
    p1 = get_part1_questions()
    p2 = get_part2_questions()
    p3 = get_part3_questions()
    
    all_qs = p1 + p2 + p3
    assert len(all_qs) == 800, f"Expected 800 standalone questions, got {len(all_qs)}"
    
    stems = set(q['stem'] for q in all_qs)
    assert len(stems) == len(all_qs), f"Duplicate stems found in standalone pool: {len(all_qs) - len(stems)}"
    
    return all_qs

if __name__ == '__main__':
    qs = get_all_standalone_questions()
    print(f"Successfully loaded {len(qs)} standalone questions with 0 duplicates.")
    from collections import Counter
    print("Chapter breakdown:")
    for ch, count in Counter(q['chapter'] for q in qs).items():
        print(f"  - {ch}: {count}")
