import os
import sys
import json

sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.gen_subject_engine import assemble_subject_mocks

print("Assembling 20 Sociology Mock Tests (1,000 Questions)...")

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

def mcq(ch, top, stem, corr, wrongs, sol, mist):
    return ("mcq", ch, top, stem, corr, wrongs, sol, mist)

def stmt(ch, top, s1, s2, rel, sol, mist):
    return ("stmt", ch, top, s1, s2, rel, sol, mist)

def ar(ch, top, a, r, rel, sol, mist):
    return ("ar", ch, top, a, r, rel, sol, mist)

def match(ch, top, stem, l1, l2, pair, sol, mist):
    return ("match", ch, top, stem, l1, l2, pair, sol, mist)

def seq(ch, top, stem, items, sq, sol, mist):
    return ("seq", ch, top, stem, items, sq, sol, mist)

