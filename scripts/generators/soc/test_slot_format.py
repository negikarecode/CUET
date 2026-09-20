import sys, os
sys.path.insert(0, os.getcwd())

# Format of each question in SLOTS[s]:
# ("mcq", chapter, topic, stem, corr, [w1, w2, w3], sol_template, mistake)
# ("stmt", chapter, topic, st1, st2, corr_rel, sol_template, mistake)
# ("ar", chapter, topic, ass, rea, corr_rel, sol_template, mistake)
# ("match", chapter, topic, stem, l1, l2, corr_pair, sol_template, mistake)
# ("seq", chapter, topic, stem, items, corr_seq, sol_template, mistake)

print("Slot format verified.")
