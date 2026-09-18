import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.psy_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, make_multi_statement_question,
    rotate_options, normalize_text, get_pyq_normalized_set
)

pyq_seen = get_pyq_normalized_set()
unit7_seen = set()
unit7_qs = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in unit7_seen:
        raise ValueError(f"Duplicate in Unit 7: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in Unit 7: {q['questionText'][:80]}")
    unit7_seen.add(norm)
    assert len(q["options"]) == 4, f"Options length error: {q['questionText'][:40]}"
    assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option: {q['questionText'][:40]}"
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"], f"Missing solution: {q['questionText'][:40]}"
    unit7_qs.append(q)

CHAPTER = "Social Influence and Group Processes"

# --- PART 1: NATURE, FORMATION & STRUCTURE OF GROUPS (Q1 - Q40) ---

# Q1: Definition of a Group
opts, c, s = rotate_options(
    "Two or more individuals who interact, are interdependent, share common goals, and perceive themselves as belonging together",
    ["Any random collection of people standing silently at a red pedestrian crossing", "A group of passengers asleep on an international airplane flight", "People reading books in a library who have never spoken to each other"],
    "A",
    "A psychological group is defined by interaction, mutual interdependence, shared norms and goals, and a collective identity ('we-feeling'), distinguishing it from a mere collection of individuals.\nHence, Option {{CORR}} is correct.",
    "Defines a psychological group."
)
add_q(make_question(CHAPTER, "Nature and Formation of Groups", "How is a 'Group' formally distinguished from a mere collection of individuals in social psychology?", opts, c, s, 1))

# Q2: Distinction: Group vs Crowd vs Mob vs Audience
opts, c, s = rotate_options(
    "Crowds are temporary without structure; Mobs are energized crowds with destructive intent; Audiences are passive spectators; Groups possess structure and interdependence",
    ["Crowds have elected presidents; Mobs are peaceful study circles; Audiences are sports teams; Groups are temporary", "All four terms are completely identical synonyms", "Mobs are legally recognized government councils"],
    "B",
    "A crowd is an unstructured, temporary gathering brought together by a common focus (e.g. traffic accident); a mob is an emotionally polarized, aggressive crowd with a specific destructive objective; an audience is a passive collection gathered to watch a performance; a group has enduring structure, roles, and interdependence.\nHence, Option {{CORR}} is correct.",
    "Distinguishes group, crowd, mob, and audience."
)
add_q(make_question(CHAPTER, "Nature and Formation of Groups", "In social psychology, how are the concepts of 'Group', 'Crowd', 'Mob', and 'Audience' differentiated?", opts, c, s, 2))

# Q3: Match Social Collectives
add_q(make_match_question(
    CHAPTER, "Nature and Formation of Groups",
    "Match List I (Collective Type) with List II (Key Characteristic):",
    [("A", "Psychological Group"), ("B", "Crowd"), ("C", "Mob"), ("D", "Audience")],
    [("I", "Unstructured collection gathered around an accidental street event"), ("II", "Interdependent members with shared norms and mutual goals"), ("III", "Passive spectators gathered to watch a musical theatrical play"), ("IV", "Highly aroused, emotionally polarized gathering with destructive intent")],
    "A-II, B-I, C-IV, D-III", "A",
    "Psychological Group: interdependent with shared norms (A-II); Crowd: unstructured gathering around accidental event (B-I); Mob: emotionally aroused with destructive intent (C-IV); Audience: passive spectators watching a performance (D-III).",
    "Matches social collective terms to diagnostic characteristics."
))

# Q4: Why People Join Groups: Core Reasons
opts, c, s = rotate_options(
    "Security, status, self-esteem, satisfaction of psychological/social needs, goal achievement, and information acquisition",
    ["Because government laws make solitary living illegal across all nations", "Strictly to avoid paying commercial taxes to financial institutions", "Purely due to biological reflexes triggered during childhood sleep"],
    "B",
    "NCERT identifies key reasons individuals join groups: (1) Security (reduces vulnerability), (2) Status (feeling recognized), (3) Self-esteem (boosts positive self-concept), (4) Satisfaction of psychological needs (belongingness), (5) Goal achievement (synergy), and (6) Knowledge/information.\nHence, Option {{CORR}} is correct.",
    "Identifies reasons people join groups."
)
add_q(make_question(CHAPTER, "Nature and Formation of Groups", "According to NCERT, what are the primary psychological motivations driving individuals to join groups?", opts, c, s, 4))

# Q5: Bruce Tuckman's 5 Stages of Group Formation
add_q(make_sequence_question(
    CHAPTER, "Nature and Formation of Groups",
    "Arrange Bruce Tuckman's five stages of group development in their correct chronological sequence:",
    [
        ("A", "Forming"),
        ("B", "Storming"),
        ("C", "Norming"),
        ("D", "Performing"),
        ("E", "Adjourning")
    ],
    "A, B, C, D, E",
    "C",
    "Bruce Tuckman's 5 stages of group development: (1) Forming (orientation and testing), (2) Storming (intragroup conflict and resistance), (3) Norming (cohesiveness and shared standards), (4) Performing (task execution), and (5) Adjourning (group disbandment/wrapping up).",
    "Sequences Tuckman's stages of group formation."
))

# Q6: Tuckman's Forming Stage
opts, c, s = rotate_options(
    "Members experience uncertainty about group purpose, structure, and leadership, testing acceptable behaviors",
    ["Members engage in intense physical boxing matches to claim leadership", "Members dissolve the group permanently and go home", "Members achieve maximum synergy and finalize complex projects"],
    "D",
    "In the 'Forming' stage, members display cautious politeness and anxiety, exploring interpersonal boundaries and figuring out the group's purpose, rules, and expectations.\nHence, Option {{CORR}} is correct.",
    "Defines Tuckman's Forming stage."
)
add_q(make_question(CHAPTER, "Nature and Formation of Groups", "What characterizes the 'Forming' stage in Bruce Tuckman's model of group development?", opts, c, s, 6))

# Q7: Tuckman's Storming Stage
opts, c, s = rotate_options(
    "Intragroup conflict, interpersonal friction, and resistance to control over who will direct the group",
    ["Complete mutual harmony and total consensus on all decisions", "Celebration of task completion and distributing diplomas", "Total silence where no members communicate for weeks"],
    "A",
    "The 'Storming' stage is marked by interpersonal conflict, struggle for power, resistance to group control, and clashes over roles and leadership hierarchy before cohesion is achieved.\nHence, Option {{CORR}} is correct.",
    "Defines Tuckman's Storming stage."
)
add_q(make_question(CHAPTER, "Nature and Formation of Groups", "In Bruce Tuckman's developmental model, which stage is primarily characterized by intragroup conflict and power struggles?", opts, c, s, 7))

# Q8: Tuckman's Norming Stage
opts, c, s = rotate_options(
    "Development of close relationships, group cohesion, shared expectations, and a common sense of group identity",
    ["Disbandment of the team due to irreconcilable ethical disputes", "Random selection of a single member to complete all assignments alone", "Severe paranoia where members suspect each other of treason"],
    "B",
    "In the 'Norming' stage, conflicts subside, close relationships develop, group cohesiveness solidifies, and shared expectations (norms) regarding acceptable conduct become established.\nHence, Option {{CORR}} is correct.",
    "Defines Tuckman's Norming stage."
)
add_q(make_question(CHAPTER, "Nature and Formation of Groups", "What is the hallmark of the 'Norming' stage of group development?", opts, c, s, 8))

# Q9: Tuckman's Performing and Adjourning Stages
opts, c, s = rotate_options(
    "Performing: energy is channeled into productive task accomplishment; Adjourning: wrapping up activities and disbanding",
    ["Performing: screaming at colleagues; Adjourning: filing lawsuits", "Performing: learning alphabets; Adjourning: repeating kindergarten", "Performing: passive sleep; Adjourning: starting the forming stage again"],
    "C",
    "In 'Performing', the group structure is fully functional and accepted, focusing energy on executing the task. In 'Adjourning' (for temporary groups), activities wrap up and the group dissolves.\nHence, Option {{CORR}} is correct.",
    "Contrasts Performing and Adjourning stages."
)
add_q(make_question(CHAPTER, "Nature and Formation of Groups", "How are the 'Performing' and 'Adjourning' stages of group development characterized in Tuckman's framework?", opts, c, s, 9))

# Q10: Four Elements of Group Structure
opts, c, s = rotate_options(
    "Roles, Norms, Status, and Cohesiveness",
    ["Sattva, Rajas, Tamas, and Ahankara", "Sensory, Short-term, Working, and Long-term memory", "Id, Ego, Superego, and Libido"],
    "D",
    "Group structure comprises four foundational elements: (1) Roles (expected behavioral patterns for positions), (2) Norms (unwritten behavioral standards), (3) Status (relative social ranking/prestige), and (4) Cohesiveness (forces binding members together).\nHence, Option {{CORR}} is correct.",
    "Identifies four elements of group structure."
)
add_q(make_question(CHAPTER, "Group Structure", "What are the four fundamental components that constitute 'Group Structure'?", opts, c, s, 10))

# Q11: Roles in Group Structure
opts, c, s = rotate_options(
    "Socially defined expectations regarding the rights, duties, and behaviors of individuals occupying specific positions within the group",
    ["Physical printed costumes worn by theatrical stage performers", "Legal criminal punishments handed down by judicial magistrates", "Biological DNA sequences found in bodily blood cells"],
    "A",
    "Roles are socially defined expectations about what behaviors, responsibilities, and privileges belong to an individual occupying a particular position in a group (e.g. captain, secretary, treasurer).\nHence, Option {{CORR}} is correct.",
    "Defines roles in group structure."
)
add_q(make_question(CHAPTER, "Group Structure", "In the analysis of group structure, how is a 'Role' formally defined?", opts, c, s, 11))

# Q12: Norms in Group Structure
opts, c, s = rotate_options(
    "Shared, unwritten or explicit standards and rules of acceptable conduct that guide member behavior within the group",
    ["The physical temperature recorded inside a corporate meeting hall", "The number of hours employees sleep during night hours", "The mathematical calculation of company annual financial profits"],
    "B",
    "Norms are shared standards, rules, or guidelines that inform group members about what behaviors are expected, accepted, or disapproved of within the group culture.\nHence, Option {{CORR}} is correct.",
    "Defines norms in group structure."
)
add_q(make_question(CHAPTER, "Group Structure", "What constitutes a 'Norm' within the structural framework of a psychological group?", opts, c, s, 12))

# Q13: Status in Group Structure
opts, c, s = rotate_options(
    "The relative social position, prestige, authority, and prominence assigned to a particular role or member within the group hierarchy",
    ["A member's marital status registered on a marriage certificate", "Whether a member possesses a valid international passport", "The speed at which a member can run a 100-meter sprint"],
    "C",
    "Status refers to the relative prestige, social rank, power, and respect accorded to a specific position or member within a group's social hierarchy.\nHence, Option {{CORR}} is correct.",
    "Defines status in group structure."
)
add_q(make_question(CHAPTER, "Group Structure", "In social psychology, 'Status' within a group refers to:", opts, c, s, 13))

# Q14: Cohesiveness in Group Structure
opts, c, s = rotate_options(
    "The strength of mutual attraction, solidarity, and 'we-feeling' that binds group members together and prevents dissolution",
    ["The physical adhesive glue used to stick posters to conference walls", "The legal contract binding corporate executives to corporate headquarters", "The number of electrical appliances operating inside an office"],
    "D",
    "Cohesiveness refers to the interpersonal attraction, mutual commitment, team pride, and shared solidarity ('we-feeling') that keeps members attached to the group.\nHence, Option {{CORR}} is correct.",
    "Defines group cohesiveness."
)
add_q(make_question(CHAPTER, "Group Structure", "What is meant by 'Group Cohesiveness'?", opts, c, s, 14))

# Q15: Match Group Structural Elements
add_q(make_match_question(
    CHAPTER, "Group Structure",
    "Match List I (Structural Element) with List II (Definition/Example):",
    [("A", "Roles"), ("B", "Norms"), ("C", "Status"), ("D", "Cohesiveness")],
    [("I", "Shared expectations regarding appropriate dress code during formal meetings"), ("II", "The social rank, privileges, and respect accorded to the senior chairperson"), ("III", "Behavioral duties expected of the designated team treasurer"), ("IV", "The strong sense of 'we-feeling' and interpersonal attraction binding teammates")],
    "A-III, B-I, C-II, D-IV", "A",
    "Roles: behavioral duties of treasurer (A-III); Norms: shared dress code expectation (B-I); Status: rank and prestige of chairperson (C-II); Cohesiveness: we-feeling binding teammates (D-IV).",
    "Matches group structural elements to concrete examples."
))

# Q16: Primary Groups vs Secondary Groups (Charles Horton Cooley)
opts, c, s = rotate_options(
    "Primary groups involve intimate, face-to-face, enduring emotional bonds (e.g. family); Secondary groups involve impersonal, formal, goal-oriented associations (e.g. political party)",
    ["Primary groups exist in elementary schools; Secondary groups exist in high schools", "Primary groups are illegal; Secondary groups are legally registered", "Primary groups are online; Secondary groups are face-to-face only"],
    "B",
    "Sociologist C.H. Cooley differentiated: Primary groups (characterized by intimate, warm, face-to-face interaction, emotional support, like family and close peers) vs Secondary groups (larger, impersonal, contractual, task-specific, like corporations or labor unions).\nHence, Option {{CORR}} is correct.",
    "Distinguishes primary from secondary groups."
)
add_q(make_question(CHAPTER, "Types of Groups", "How did Charles Horton Cooley distinguish between 'Primary Groups' and 'Secondary Groups'?", opts, c, s, 16))

# Q17: Formal vs Informal Groups
opts, c, s = rotate_options(
    "Formal groups have explicit official rules, defined hierarchy, and designated roles; Informal groups arise spontaneously from personal friendships and social interaction",
    ["Formal groups wear business suits; Informal groups wear casual sportswear", "Formal groups meet in government offices; Informal groups meet in city parks", "Both terms represent identical structures with zero difference"],
    "C",
    "Formal groups are intentionally created by organizations with explicit regulations, formal leadership, and rigid hierarchies (e.g. university faculty committee); Informal groups emerge spontaneously based on mutual liking and social affinity (e.g. lunch club of coworkers).\nHence, Option {{CORR}} is correct.",
    "Distinguishes formal from informal groups."
)
add_q(make_question(CHAPTER, "Types of Groups", "What distinguishes a 'Formal Group' from an 'Informal Group' in organizational psychology?", opts, c, s, 17))

# Q18: Ingroups vs Outgroups (William Graham Sumner)
opts, c, s = rotate_options(
    "Ingroups are groups to which individuals feel they belong ('we'); Outgroups are perceived as different or external ('they')",
    ["Ingroups live inside houses; Outgroups live outside in tents", "Ingroups have high income; Outgroups have zero income", "Ingroups are composed of children; Outgroups are composed of elderly retirees"],
    "D",
    "William Graham Sumner established the distinction: Ingroup refers to 'us' (groups with which an individual identifies and feels solidarity), whereas Outgroup refers to 'them' (groups perceived as distinct, competitive, or foreign, often subject to stereotyping).\nHence, Option {{CORR}} is correct.",
    "Defines ingroup vs outgroup."
)
add_q(make_question(CHAPTER, "Types of Groups", "In the sociological theory of William Graham Sumner, how are 'Ingroups' and 'Outgroups' differentiated?", opts, c, s, 18))

# Q19: Social Loafing (Latané, Harkins, & Petty)
opts, c, s = rotate_options(
    "The tendency of individuals to exert less physical or cognitive effort when working collectively in a group than when working individually",
    ["The tendency of people to eat bread while resting in living rooms", "The habit of taking vacations without notifying employer managers", "An increase in individual effort when performing difficult mathematical puzzles in public"],
    "A",
    "Social loafing refers to the reduction in individual effort when people pool their contributions toward a common group task compared to when they perform alone (e.g. pulling a rope in tug-of-war, clapping in an audience).\nHence, Option {{CORR}} is correct.",
    "Defines social loafing."
)
add_q(make_question(CHAPTER, "Influence of Group on Individual Behaviour", "What is 'Social Loafing' in group performance?", opts, c, s, 19))

# Q20: Causes of Social Loafing
opts, c, s = rotate_options(
    "Diffused responsibility, lack of individual accountability, feeling that one's personal contribution is dispensable, and low task attractiveness",
    ["Extremely high pay bonuses offered to individual performers", "Intense video surveillance monitoring every individual movement", "Performing tasks where individual scores are published publicly on scoreboards"],
    "B",
    "Social loafing occurs because: (1) individual output cannot be evaluated separately, (2) members feel unmotivated because individual effort is anonymous, (3) members believe their contribution is redundant, and (4) diffusion of responsibility across the collective.\nHence, Option {{CORR}} is correct.",
    "Identifies underlying causes of social loafing."
)
add_q(make_question(CHAPTER, "Influence of Group on Individual Behaviour", "Which psychological conditions promote the emergence of 'Social Loafing' in collective tasks?", opts, c, s, 20))

# Q21: Ways to Reduce Social Loafing
opts, c, s = rotate_options(
    "Making individual efforts identifiable and evaluable, highlighting the unique importance of each member's input, and strengthening group cohesiveness",
    ["Making the group as large as possible with 1,000 anonymous participants", "Hiding all individual task scores and forbidding performance evaluations", "Eliminating all team meetings and assigning tasks in total secrecy"],
    "C",
    "Social loafing can be effectively reduced by: (1) making individual efforts identifiable and measurable, (2) emphasizing the indispensability of each member's role, (3) keeping groups small, and (4) enhancing group cohesiveness and task meaningfulness.\nHence, Option {{CORR}} is correct.",
    "Outlines strategies to reduce social loafing."
)
add_q(make_question(CHAPTER, "Influence of Group on Individual Behaviour", "Which strategy is most effective in eliminating or minimizing 'Social Loafing' among team members?", opts, c, s, 21))

# Q22: Ringelmann Effect
opts, c, s = rotate_options(
    "Max Ringelmann observed that as the size of a tug-of-war team increased, the average pulling force exerted by each individual member progressively declined",
    ["Ringelmann observed that athletes run twice as fast when running in rainstorms", "Ringelmann observed that memory recall triples when listening to classical music", "Ringelmann demonstrated that group size has zero effect on mechanical work"],
    "D",
    "Max Ringelmann (1913) conducted classic rope-pulling experiments demonstrating that individual effort declined as group size increased (a 2-person group pulled at 93% of individual capacity, while an 8-person group pulled at only 49% per person).\nHence, Option {{CORR}} is correct.",
    "Summarizes the Ringelmann Effect."
)
add_q(make_question(CHAPTER, "Influence of Group on Individual Behaviour", "What did agricultural engineer Max Ringelmann discover in his classic rope-pulling experiments that laid the foundation for social loafing?", opts, c, s, 22))

# Q23: Group Polarization (Moscovici & Zavalloni)
opts, c, s = rotate_options(
    "The tendency of group discussion to strengthen and shift members' initial pre-existing attitudes toward a more extreme position in that same direction",
    ["The tendency of groups to always adopt a moderate, middle-of-the-road compromise", "The process of electing polar opposite co-captains for athletic teams", "The total collapse of group communication due to intense language barriers"],
    "A",
    "Group polarization refers to the phenomenon where post-discussion group decisions or opinions become significantly more extreme than the initial average inclinations of individual members in the same direction (whether risky or cautious).\nHence, Option {{CORR}} is correct.",
    "Defines group polarization."
)
add_q(make_question(CHAPTER, "Group Decision Making", "What occurs during the process of 'Group Polarization'?", opts, c, s, 23))

# Q24: Causes of Group Polarization
opts, c, s = rotate_options(
    "Informational influence (hearing persuasive novel arguments in favor of initial leanings) and Normative influence (social comparison to gain group approval)",
    ["Neurosurgical stimulation of temporal brain lobes during discussions", "Severe nutritional starvation altering cognitive neurotransmitters", "Physical exhaustion caused by twenty-four hours of nonstop running"],
    "B",
    "Group polarization is driven by two main processes: (1) Informational influence (persuasive arguments pool: members hear novel arguments supporting their viewpoint), and (2) Normative social comparison (members adjust positions to appear suitably committed and favorable relative to peers).\nHence, Option {{CORR}} is correct.",
    "Explains causes of group polarization."
)
add_q(make_question(CHAPTER, "Group Decision Making", "Why does group discussion typically lead to group polarization?", opts, c, s, 24))

# Q25: Groupthink (Irving Janis)
opts, c, s = rotate_options(
    "A mode of thinking in highly cohesive groups where the drive for unanimous consensus overrides realistic appraisal of alternative courses of action",
    ["A computer software algorithm designed to calculate team productivity", "A creative brainstorming technique designed to generate 500 new ideas", "An educational curriculum designed to teach collaborative philosophy in schools"],
    "C",
    "Irving Janis coined 'Groupthink' to describe a defective decision-making process in cohesive groups where members suppress dissent, rationalize errors, and seek complete harmony at the expense of critical evaluation (e.g. Bay of Pigs invasion).\nHence, Option {{CORR}} is correct.",
    "Defines Groupthink by Irving Janis."
)
add_q(make_question(CHAPTER, "Group Decision Making", "What is 'Groupthink' as formulated by Irving Janis?", opts, c, s, 25))

# Q26: Symptoms of Groupthink
opts, c, s = rotate_options(
    "Illusion of invulnerability, collective rationalization, self-censorship, illusion of unanimity, and emergence of self-appointed mindguards",
    ["Encouraging aggressive independent dissent and inviting rival critics to review plans", "Conducting anonymous surveys and hiring neutral outside auditors to veto policies", "Total absence of cohesiveness and frequent personal physical fights"],
    "D",
    "Irving Janis identified key symptoms of Groupthink: (1) Illusion of invulnerability, (2) Unquestioned belief in group morality, (3) Collective rationalization, (4) Stereotyping outgroups, (5) Self-censorship, (6) Illusion of unanimity, (7) Direct pressure on dissenters, and (8) Self-appointed 'mindguards'.\nHence, Option {{CORR}} is correct.",
    "Identifies symptoms of Groupthink."
)
add_q(make_question(CHAPTER, "Group Decision Making", "Which collection of behavioral indicators constitutes the classic symptoms of 'Groupthink'?", opts, c, s, 26))

# Q27: Preventing Groupthink
opts, c, s = rotate_options(
    "Designating a devil's advocate, encouraging critical evaluation, inviting outside independent experts, and holding second-chance review meetings",
    ["Demanding complete blind loyalty and firing any member who expresses doubts", "Isolating the group in a secret underground bunker without outside communication", "Allowing the leader to state their preferred conclusion before any discussion begins"],
    "A",
    "To prevent Groupthink, Janis recommended: (1) leaders should remain impartial initially, (2) assigning a designated 'devil's advocate' to challenge consensus, (3) inviting external experts to critique plans, and (4) breaking into independent subgroups to evaluate options.\nHence, Option {{CORR}} is correct.",
    "Lists methods to prevent Groupthink."
)
add_q(make_question(CHAPTER, "Group Decision Making", "Which organizational practice is most effective in safeguarding a cohesive committee against 'Groupthink'?", opts, c, s, 27))

# Q28: Social Influence: Kelman's Three Processes
opts, c, s = rotate_options(
    "Compliance (yielding to external rewards/punishments), Identification (conforming to maintain an admired relationship), and Internalization (integrating beliefs into personal values)",
    ["Conditioning, Cognition, and Catharsis", "Compensation, Compromise, and Conversion", "Castration, Fixation, and Regression"],
    "B",
    "Herbert Kelman delineated three distinct levels of social influence: (1) Compliance (superficial behavioral conformity driven by rewards or avoidance of punishment), (2) Identification (adopting attitudes to maintain a desirable bond with an admired agent), and (3) Internalization (deep, enduring acceptance because values align with one's own system).\nHence, Option {{CORR}} is correct.",
    "Lists Kelman's three processes of social influence."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "What are the three distinct processes of social influence identified by Herbert Kelman?", opts, c, s, 28))

# Q29: Match Kelman's Social Influence Processes
add_q(make_match_question(
    CHAPTER, "Social Influence Processes",
    "Match List I (Influence Process) with List II (Psychological Mechanism):",
    [("A", "Compliance"), ("B", "Identification"), ("C", "Internalization"), ("D", "Obedience")],
    [("I", "Adopting beliefs deeply because they are genuinely congruent with personal value systems"), ("II", "Conforming externally to an explicit request to secure praise or avoid punishment"), ("III", "Complying with a direct command issued by a perceived legitimate authority figure"), ("IV", "Emulating an admired mentor's behavior to maintain a positive self-defining relationship")],
    "A-II, B-IV, C-I, D-III", "A",
    "Compliance: conforming externally for praise/punishment avoidance (A-II); Identification: emulating admired mentor to maintain relationship (B-IV); Internalization: adopting beliefs congruent with personal values (C-I); Obedience: following direct command from authority (D-III).",
    "Matches social influence processes to operational descriptions."
))

# Q30: Solomon Asch's Classic Conformity Study
opts, c, s = rotate_options(
    "Approximately 75% of participants conformed at least once to the unanimously incorrect line-length judgments announced by confederates",
    ["Zero participants ever conformed, demonstrating 100% complete stubborn independence", "All participants immediately became violent and destroyed the visual stimuli cards", "Participants accurately guessed line lengths using microscopic measuring tools"],
    "C",
    "Solomon Asch (1951) placed naive participants among confederates who unanimously gave incorrect answers on simple line-matching trials; 75% conformed at least once, and participants conformed on about one-third of all critical trials.\nHence, Option {{CORR}} is correct.",
    "Summarizes Solomon Asch's line judgment conformity study."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "In Solomon Asch's landmark line-judgment experiments, what did researchers observe regarding participant conformity to a unanimous majority?", opts, c, s, 30))

# Q31: Determinants of Conformity: Group Size and Unanimity
opts, c, s = rotate_options(
    "Conformity increases with group size up to approximately 3-4 members and levels off; the presence of even a single non-conforming dissenter drastically cuts conformity",
    ["Conformity requires a minimum of 5,000 members before any individual will yield", "Having a dissenter triples the amount of conformity among participants", "Group size has zero statistical relationship with conformity rates"],
    "D",
    "Asch showed that conformity peaks with a unanimous majority of 3 to 4 people; further increases produce diminishing returns. Crucially, the presence of just one confederate who dissents from the majority reduces conformity by up to 80%.\nHence, Option {{CORR}} is correct.",
    "Identifies effects of group size and unanimity on conformity."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "How do 'Group Size' and 'Majority Unanimity' influence conformity levels in social psychological experiments?", opts, c, s, 31))

# Q32: Informational vs Normative Social Influence
opts, c, s = rotate_options(
    "Informational influence stems from the desire to be right and accurate; Normative influence stems from the desire to be liked and accepted by the group",
    ["Informational influence is illegal; Normative influence is legally mandatory", "Informational influence applies only to mathematics; Normative influence applies to food", "Both terms mean identical things with zero theoretical distinction"],
    "A",
    "Morton Deutsch and Harold Gerard distinguished: Informational Social Influence (relying on others as a source of evidence about reality when uncertain, motivated by desire to be correct) vs Normative Social Influence (conforming to positive expectations of others, motivated by desire for social approval and fear of rejection).\nHence, Option {{CORR}} is correct.",
    "Contrasts informational and normative social influence."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "In social influence theory, how are 'Informational Social Influence' and 'Normative Social Influence' differentiated?", opts, c, s, 32))

# Q33: Foot-in-the-Door Technique (Freedman & Fraser)
opts, c, s = rotate_options(
    "Securing agreement to a small, trivial request first, which significantly increases the likelihood of compliance with a subsequent larger target request",
    ["Placing a physical shoe inside an apartment door to prevent it from closing", "Demanding an impossibly large favor first and then becoming angry when rejected", "Refusing to speak to neighbors unless they offer monetary payments"],
    "B",
    "Jonathan Freedman and Scott Fraser demonstrated the Foot-in-the-Door technique: inducing compliance with a minor initial request (e.g. signing a safe-driving petition) establishes a self-image of helpfulness, making the person far more likely to agree to a large subsequent request (installing an unsightly billboard).\nHence, Option {{CORR}} is correct.",
    "Defines the Foot-in-the-Door compliance technique."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "What is the operational principle underlying the 'Foot-in-the-Door' compliance technique?", opts, c, s, 33))

# Q34: Door-in-the-Face Technique (Robert Cialdini)
opts, c, s = rotate_options(
    "Preceding the target request with an extreme, unreasonable request that is sure to be refused, making the subsequent smaller target request seem reasonable by comparison",
    ["Slamming an office door shut during an argument with a supervisor", "Offering a massive discount on commercial electronics after customers leave", "Inviting 100 strangers into a home to attend a birthday celebration"],
    "C",
    "Robert Cialdini's Door-in-the-Face technique relies on reciprocal concessions: the requester begins with an extreme demand that is predictably rejected; when the requester scales back to the moderate target request, the target feels reciprocal obligation to compromise.\nHence, Option {{CORR}} is correct.",
    "Defines the Door-in-the-Face compliance technique."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "How does the 'Door-in-the-Face' technique operate to secure compliance from targets?", opts, c, s, 34))

# Q35: Low-Ball Technique (Robert Cialdini)
opts, c, s = rotate_options(
    "Inducing commitment to an initial attractive offer, and then revealing hidden costs or worsening the terms after the psychological commitment has been made",
    ["Throwing a sports ball at low physical speed during baseball games", "Demanding that athletes practice gymnastics at ground level", "Offering completely free products to all citizens forever"],
    "D",
    "In the Low-Ball technique, an individual agrees to an attractive proposition (e.g. purchasing a car at an apparent bargain); once committed, the salesperson reveals that a calculation error occurred or fees were omitted, yet the customer frequently follows through because of prior psychological commitment.\nHence, Option {{CORR}} is correct.",
    "Defines the Low-Ball compliance technique."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "In the psychology of persuasion, what is the 'Low-Ball Technique'?", opts, c, s, 35))

# Q36: Match Compliance Techniques
add_q(make_match_question(
    CHAPTER, "Social Influence Processes",
    "Match List I (Compliance Technique) with List II (Sequential Strategy):",
    [("A", "Foot-in-the-Door"), ("B", "Door-in-the-Face"), ("C", "Low-Ball"), ("D", "That's-Not-All")],
    [("I", "Starting with an exorbitant request that is refused, followed by the intended moderate request"), ("II", "Securing agreement to a small initial favor, followed by a much larger target request"), ("III", "Sweetening an initial offer with unexpected bonus extras before the target has decided"), ("IV", "Securing verbal agreement on favorable terms before revealing hidden costs or altered conditions")],
    "A-II, B-I, C-IV, D-III", "A",
    "Foot-in-the-Door: small favor first, then large request (A-II); Door-in-the-Face: exorbitant request refused, then moderate request (B-I); Low-Ball: agreement on favorable terms before revealing hidden costs (C-IV); That's-Not-All: sweetening deal before decision (D-III).",
    "Matches compliance techniques to operational mechanisms."
))

# Q37: Stanley Milgram's Classic Obedience Experiment
opts, c, s = rotate_options(
    "65% of normal adult participants obeyed the experimenter's commands fully, administering maximum shocks up to the lethal 450-volt mark",
    ["100% of participants immediately refused to obey on the very first shock", "Only participants diagnosed with clinical psychopathy administered high shocks", "Participants rebelled, arrested the experimenter, and called police officers"],
    "B",
    "Stanley Milgram's 1963 Yale experiment revealed that 65% of ordinary citizens complied fully with authoritative commands to deliver severe, ostensibly lethal electric shocks (up to 450 volts) to an innocent learner, demonstrating the immense power of perceived legitimate authority.\nHence, Option {{CORR}} is correct.",
    "Summarizes Milgram's classic obedience experiment."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "What was the astonishing finding of Stanley Milgram's classic obedience experiments conducted at Yale University?", opts, c, s, 37))

# Q38: Factors Influencing Milgram's Obedience
opts, c, s = rotate_options(
    "Physical proximity of the authority figure, physical distance from the victim, perceived legitimacy of authority, and absence of dissenting peers",
    ["Physical height of the participant, shoe size, and blood cholesterol levels", "Whether the experiment took place during morning or evening hours", "The brand of clothing worn by the learner strapped into the chair"],
    "C",
    "Factors modulating obedience in Milgram's paradigms: (1) Proximity of authority (obedience dropped when orders were given by phone), (2) Proximity of victim (obedience dropped when learner was in same room or hand was held), (3) Institutional legitimacy (Yale vs run-down office), and (4) Presence of rebellious peers (drastically lowered obedience to 10%).\nHence, Option {{CORR}} is correct.",
    "Lists situational factors modulating obedience in Milgram's studies."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "Which situational determinants were shown to significantly decrease obedience rates in variations of Milgram's shock paradigm?", opts, c, s, 38))

# Q39: Cooperation vs Competition (Promotive vs Contrient Interdependence)
opts, c, s = rotate_options(
    "Cooperation involves promotive interdependence where individual goal attainment facilitates others; Competition involves contrient interdependence where one's gain is another's loss",
    ["Cooperation occurs only in sports; Competition occurs only in business", "Cooperation is involuntary; Competition is mandatory by civil law", "Both terms describe identical interpersonal dynamics with zero conflict"],
    "D",
    "Morton Deutsch distinguished: Cooperative interdependence (promotive: individuals sink or swim together, one's success helps others achieve their goal) vs Competitive interdependence (contrient: zero-sum reward structure where one person's goal attainment directly blocks others from winning).\nHence, Option {{CORR}} is correct.",
    "Distinguishes cooperative from competitive interdependence."
)
add_q(make_question(CHAPTER, "Cooperation and Competition", "How did Morton Deutsch conceptually differentiate between 'Cooperative' and 'Competitive' interdependence?", opts, c, s, 39))

# Q40: Determinants of Cooperation and Competition
opts, c, s = rotate_options(
    "Reward structure, interpersonal communication, reciprocity norms, and group size",
    ["Room wallpaper color, ceiling fan speed, and carpet thickness", "Number of vowels in members' last names", "Whether participants write using blue ink or black ink"],
    "A",
    "Factors influencing cooperation vs competition: (1) Reward structure (independent, cooperative, or competitive), (2) Communication (open communication fosters mutual trust and cooperation), (3) Reciprocity (tit-for-tat strategies), and (4) Group size (larger groups invite more exploitation and defection).\nHence, Option {{CORR}} is correct.",
    "Lists determinants of cooperation and competition."
)
add_q(make_question(CHAPTER, "Cooperation and Competition", "Which core situational variables determine whether interacting individuals will adopt cooperative or competitive strategies?", opts, c, s, 40))

# --- PART 2: INTERGROUP CONFLICT, ROBBERS CAVE & RESOLUTION (Q41 - Q80) ---

# Q41: Prisoner's Dilemma Game
opts, c, s = rotate_options(
    "A classic game theory paradigm where mutual cooperation yields moderate rewards, mutual defection yields severe penalties, and asymmetric betrayal yields maximum payoff for the defector",
    ["A board game where players roll dice to escape from maximum-security prisons", "A clinical diagnostic questionnaire used to detect antisocial personality disorder", "A competitive card game played exclusively in correctional institutions"],
    "B",
    "The Prisoner's Dilemma illustrates social dilemmas: both players gain if both cooperate; both suffer if both defect; but each individual faces an incentive to defect (betray) for personal gain if the other cooperates, creating conflict between individual rationality and collective welfare.\nHence, Option {{CORR}} is correct.",
    "Explains the Prisoner's Dilemma game."
)
add_q(make_question(CHAPTER, "Cooperation and Competition", "What is the strategic conflict modeled by the 'Prisoner's Dilemma Game' in social psychology?", opts, c, s, 41))

# Q42: Commons Dilemma (Tragedy of the Commons)
opts, c, s = rotate_options(
    "A situation where individuals acting independently and rationally for personal self-interest deplete or spoil a shared, limited public resource (e.g. water, pastures)",
    ["A grammatical dispute regarding common nouns versus proper nouns in literature", "A conflict among university professors over classroom lecture schedules", "An argument between siblings regarding television remote control channels"],
    "C",
    "Garrett Hardin's Tragedy of the Commons (or Commons Dilemma) occurs when individuals pursue short-term self-interest by consuming disproportionate shares of a replenishable communal resource (pasture, fishery, groundwater), ultimately exhausting it to everyone's ruin.\nHence, Option {{CORR}} is correct.",
    "Defines the Commons Dilemma."
)
add_q(make_question(CHAPTER, "Cooperation and Competition", "In social dilemmas, what characterizes a 'Commons Dilemma' (or Tragedy of the Commons)?", opts, c, s, 42))

# Q43: Public Goods Dilemma
opts, c, s = rotate_options(
    "A dilemma where individuals must contribute personal resources to establish or maintain a public benefit that everyone can enjoy regardless of contribution (tempting free-riding)",
    ["A dilemma where governments ban citizens from visiting public parks", "A legal debate over the price of commercial corporate stocks", "An examination question testing knowledge of civil law"],
    "D",
    "In a Public Goods Dilemma, members must voluntarily donate to create or sustain a resource (public television, blood banks, communal roads) accessible to everyone; individuals face the temptation to 'free-ride' without contributing, risking the collapse of the good.\nHence, Option {{CORR}} is correct.",
    "Defines Public Goods Dilemma."
)
add_q(make_question(CHAPTER, "Cooperation and Competition", "How is a 'Public Goods Dilemma' distinct from a Commons Dilemma?", opts, c, s, 43))

# Q44: Muzafer Sherif's Robbers Cave Experiment: Three Phases
add_q(make_sequence_question(
    CHAPTER, "Intergroup Conflict",
    "Arrange the three experimental stages of Muzafer Sherif's Robbers Cave experiment in their correct chronological order:",
    [
        ("A", "Ingroup Formation (Rattlers and Eagles developing internal identity and structure)"),
        ("B", "Intergroup Competition / Friction (competitive athletic tournaments producing hostility)"),
        ("C", "Intergroup Integration / Reduction of Hostility (introduction of superordinate goals)")
    ],
    "A, B, C",
    "A",
    "Muzafer Sherif's Robbers Cave experiment proceeded through three sequential stages: (1) Ingroup Formation (settling in, building norms and team identity), (2) Intergroup Friction (competitive zero-sum games inducing hostility and raids), and (3) Intergroup Integration (cooperation on superordinate goals restoring harmony).",
    "Sequences the three phases of Sherif's Robbers Cave study."
))

# Q45: Ingroup Formation in Robbers Cave
opts, c, s = rotate_options(
    "Boys were separated into two isolated cabins, engaged in joint cooperative tasks, chose team names ('Rattlers' and 'Eagles'), and established distinct leaders and norms",
    ["Boys immediately attacked each other with weapons on the very first day", "Boys refused to participate and demanded to return home to their parents", "Boys were placed in solitary isolation cells without any human contact"],
    "B",
    "In Stage 1 of Robbers Cave, boys arrived without knowing of the other group's presence; through cooperative activities (swimming, building rope bridges), they developed cohesive group identities, leadership hierarchies, and chosen emblems/names ('Rattlers' and 'Eagles').\nHence, Option {{CORR}} is correct.",
    "Details Stage 1 of the Robbers Cave experiment."
)
add_q(make_question(CHAPTER, "Intergroup Conflict", "What experimental procedures took place during Stage 1 (Ingroup Formation) of Muzafer Sherif's Robbers Cave study?", opts, c, s, 45))

# Q46: Intergroup Friction in Robbers Cave
opts, c, s = rotate_options(
    "Introducing zero-sum competitive tournaments (baseball, tug-of-war) with a trophy for the winner triggered name-calling, cabin raids, flag burning, and physical skirmishes",
    ["The two groups immediately formed a merged joint committee to share all food", "The experimenters gave every boy a personal automobile", "Both groups sat in silence and meditated for eight hours daily"],
    "C",
    "In Stage 2 (Friction), Sherif arranged competitive contests where only one group could win a trophy; this zero-sum resource competition rapidly produced intense intergroup hostility, derogatory stereotyping, cabin ransacking, and food fights.\nHence, Option {{CORR}} is correct.",
    "Explains Stage 2 of the Robbers Cave experiment."
)
add_q(make_question(CHAPTER, "Intergroup Conflict", "How was intergroup friction and hostility deliberately induced during Stage 2 of the Robbers Cave experiment?", opts, c, s, 46))

# Q47: Ineffective Hostility Reduction Methods in Robbers Cave
opts, c, s = rotate_options(
    "Mere non-competitive contact (such as eating meals together or watching movies) did not reduce hostility and often triggered fresh food fights",
    ["Superordinate goals failed completely and intensified intergroup hatred", "Dividing boys into separate countries permanently solved all psychological issues", "Giving the boys cash rewards eliminated all competitive feelings instantly"],
    "D",
    "Sherif first tested simple pleasant intergroup contact (eating together in the dining hall, watching movies); far from reducing prejudice, these situations merely provided opportunities for insults, bean-throwing, and verbal attacks.\nHence, Option {{CORR}} is correct.",
    "Identifies ineffective intergroup hostility reduction methods."
)
add_q(make_question(CHAPTER, "Intergroup Conflict", "Prior to introducing superordinate goals, which intervention did Sherif test that proved completely ineffective in reducing hostility?", opts, c, s, 47))

# Q48: Superordinate Goals in Robbers Cave
opts, c, s = rotate_options(
    "Restoring the camp's damaged drinking water supply pipe and jointly pulling a stalled food delivery truck out of mud",
    ["Competing in an ultimate winner-take-all championship football match", "Holding an individual essay writing competition evaluated by university professors", "Sending one group home while allowing the other group to stay at camp"],
    "A",
    "Sherif engineered genuine crises requiring cooperative interdependence: fixing the sabotaged water pipe that supplied camp drinking water and jointly pulling a broken-down food delivery truck, compelling Rattlers and Eagles to work shoulder-to-shoulder.\nHence, Option {{CORR}} is correct.",
    "Provides concrete examples of superordinate goals in Robbers Cave."
)
add_q(make_question(CHAPTER, "Intergroup Conflict", "Which specific superordinate goals successfully dissolved intergroup hostility and forged friendships between the Rattlers and Eagles?", opts, c, s, 48))

# Q49: Gordon Allport's Contact Hypothesis Conditions
opts, c, s = rotate_options(
    "Equal status between groups, cooperative interdependence, common goals, and institutional / normative support",
    ["One dominant group having legal authority over an enslaved subordinate group", "Competitive athletic tournaments where loser leaves town", "Contact occurring in absolute secrecy without any social norms"],
    "B",
    "Allport's Contact Hypothesis specifies four mandatory conditions for intergroup contact to dismantle prejudice: (1) equal status within the contact situation, (2) common goals, (3) cooperative interaction, and (4) institutional/legal support from authorities.\nHence, Option {{CORR}} is correct.",
    "Lists Allport's four conditions for the contact hypothesis."
)
add_q(make_question(CHAPTER, "Resolution of Intergroup Conflict", "According to Gordon Allport's Contact Hypothesis, which set of conditions is necessary for direct intergroup contact to reduce prejudice?", opts, c, s, 49))

# Q50: Redrawing Group Boundaries (Common Ingroup Identity Model)
opts, c, s = rotate_options(
    "Encouraging members of conflicting groups to recategorize themselves as members of a single, inclusive, superordinate group ('us' instead of 'us vs them')",
    ["Building physical concrete separation walls between ethnic neighborhoods", "Forbidding people from ever speaking their native mother tongues", "Assigning members to arbitrary alphabetical seats in classrooms"],
    "C",
    "Samuel Gaertner and John Dovidio's Common Ingroup Identity Model demonstrates that intergroup bias decreases when conflicting subgroups reconceptualize themselves within a broader, shared superordinate identity (e.g. students from rival high schools viewing themselves as united district scholars).\nHence, Option {{CORR}} is correct.",
    "Explains the Common Ingroup Identity Model."
)
add_q(make_question(CHAPTER, "Resolution of Intergroup Conflict", "How does 'Redrawing Group Boundaries' (Recategorization) diminish intergroup conflict?", opts, c, s, 50))

# Q51: Negotiation in Conflict Resolution: Distributive vs Integrative
opts, c, s = rotate_options(
    "Distributive bargaining is zero-sum (dividing a fixed pie); Integrative bargaining is win-win (expanding the pie to create mutual gains)",
    ["Distributive bargaining is legal; Integrative bargaining is illegal", "Distributive bargaining applies only to children; Integrative bargaining applies to adults", "Both forms of bargaining always lead to corporate bankruptcy"],
    "D",
    "Negotiation involves dialogue to reach agreement: Distributive bargaining treats resources as fixed ('win-lose' zero-sum split), whereas Integrative bargaining seeks creative solutions that accommodate both parties' underlying interests ('win-win' synergy).\nHence, Option {{CORR}} is correct.",
    "Distinguishes distributive from integrative bargaining."
)
add_q(make_question(CHAPTER, "Resolution of Intergroup Conflict", "In conflict negotiation, what distinguishes 'Distributive Bargaining' from 'Integrative Bargaining'?", opts, c, s, 51))

# Q52: Third-Party Mediation vs Arbitration
opts, c, s = rotate_options(
    "A mediator facilitates communication and suggests non-binding proposals; an arbitrator holds formal authority to impose a legally binding decision",
    ["Mediators are police officers; Arbitrators are bank tellers", "Mediators decide guilty verdicts; Arbitrators serve as defense lawyers", "Both roles possess identical legal power to sentence parties to prison"],
    "A",
    "Third-party interventions: In Mediation, a neutral third party helps the disputants communicate and clarify issues to reach their own agreement; in Arbitration, the third party evaluates evidence and renders a final, binding decision.\nHence, Option {{CORR}} is correct.",
    "Contrasts mediation with arbitration."
)
add_q(make_question(CHAPTER, "Resolution of Intergroup Conflict", "How do 'Mediation' and 'Arbitration' differ as third-party conflict resolution strategies?", opts, c, s, 52))

# Q53: Statement: Primary vs Secondary Group Emotional Involvement
add_q(make_statement_question(
    CHAPTER, "Types of Groups",
    "Primary groups play a fundamental role in the development of personal values and individual identity.",
    "Secondary groups are primarily characterized by intimate, face-to-face, warm, and unconditional emotional bonds.",
    3, "C",
    "Statement I is correct (primary groups provide crucial socialization, emotional security, and shape personal identity). Statement II is incorrect because secondary groups are characterized by impersonal, formal, contractual, and goal-oriented relationships, not intimate emotional bonds.",
    "Distinguishes primary from secondary group characteristics."
))

# Q54: Assertion-Reason: Social Loafing and Individual Identifiability
add_q(make_assertion_question(
    CHAPTER, "Influence of Group on Individual Behaviour",
    "Social loafing can be significantly curtailed by implementing mechanisms that track and record individual performance contributions.",
    "When individual contributions are identifiable, members cannot hide behind collective anonymity and become accountable for their performance.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Anonymity and diffusion of responsibility are the primary drivers of social loafing; when individual output is measured and visible to peers or evaluators, personal accountability is restored.",
    "Connects performance identifiability to the reduction of social loafing."
))

# Q55: Group Polarization: Risky Shift Phenomenon
opts, c, s = rotate_options(
    "James Stoner discovered that group decisions were frequently riskier than the average of individual members' pre-discussion decisions",
    ["Stoner discovered that groups never take risks and always choose total stagnation", "Stoner proved that groups always choose the safest possible option", "Stoner demonstrated that individuals refuse to speak during committee discussions"],
    "B",
    "In 1961, James Stoner documented the 'Risky Shift' phenomenon (an early precursor to group polarization): group discussions caused individuals to recommend bolder, riskier decisions than they had recommended individually before the meeting.\nHence, Option {{CORR}} is correct.",
    "Defines the Risky Shift phenomenon."
)
add_q(make_question(CHAPTER, "Group Decision Making", "What was the 'Risky Shift' phenomenon originally documented by James Stoner in group decision-making research?", opts, c, s, 55))

# Q56: Mindguards in Groupthink
opts, c, s = rotate_options(
    "Members who actively protect the group and its leader from dissenting information or contradictory viewpoints that might shatter complacency",
    ["Security guards hired to monitor physical entrance gates of corporate buildings", "Computer firewalls preventing digital virus infections on company laptops", "Medical psychologists treating patients suffering from severe amnesia"],
    "C",
    "In Janis's Groupthink theory, 'mindguards' are group members who take it upon themselves to shield the leader and fellow members from outside criticisms or controversial facts that could disrupt consensus or question group morality.\nHence, Option {{CORR}} is correct.",
    "Defines mindguards in Groupthink."
)
add_q(make_question(CHAPTER, "Group Decision Making", "In Irving Janis's analysis of Groupthink, what function do 'Self-Appointed Mindguards' serve?", opts, c, s, 56))

# Q57: Deindividuation (Festinger, Pepitone, & Newcomb)
opts, c, s = rotate_options(
    "A psychological state of diminished self-awareness and reduced social accountability occurring in large anonymous crowds, often unleashing unrestrained behavior",
    ["The process of acquiring a new legal passport and citizenship in a foreign nation", "A surgical medical operation removing brain tumors from cerebral hemispheres", "A state of supreme mindful awareness achieved during transcendental meditation"],
    "D",
    "Deindividuation occurs in dense crowds or under anonymous conditions (darkness, masks, uniforms): individuals lose personal identity, self-restraint, and evaluation apprehension, leading to anti-normative, impulsive, or destructive collective mob actions.\nHence, Option {{CORR}} is correct.",
    "Defines deindividuation."
)
add_q(make_question(CHAPTER, "Influence of Group on Individual Behaviour", "What is 'Deindividuation' in collective crowd psychology?", opts, c, s, 57))

# Q58: Philip Zimbardo's Stanford Prison Experiment
opts, c, s = rotate_options(
    "Deindividuation and situational role assignments (guards vs prisoners) rapidly induced extreme brutality, degradation, and psychological trauma",
    ["Guards and prisoners peacefully held collaborative yoga classes every morning", "Prisoners easily convinced the guards to release them within five minutes", "The experiment proved that individual personality completely overrides all situational roles"],
    "A",
    "Philip Zimbardo's 1971 Stanford Prison simulation demonstrated that ordinary college students assigned randomly to roles of guards or prisoners rapidly adopted extreme sadistic behavior and passive helplessness, showing how situational roles and deindividuation overpower individual morality.\nHence, Option {{CORR}} is correct.",
    "Summarizes Zimbardo's Stanford Prison Experiment."
)
add_q(make_question(CHAPTER, "Influence of Group on Individual Behaviour", "What did Philip Zimbardo's famous 1971 Stanford Prison Experiment demonstrate regarding social roles and deindividuation?", opts, c, s, 58))

# Q59: Multi-statement: Tuckman's Group Development Stages
add_q(make_multi_statement_question(
    CHAPTER, "Nature and Formation of Groups",
    "Which of the following statements regarding Bruce Tuckman's group development model are correct?",
    [
        ("A", "During the Forming stage, members engage in polite testing of interpersonal boundaries and expectations"),
        ("B", "The Storming stage is characterized by intragroup conflict, emotional resistance, and struggle over leadership"),
        ("C", "In the Norming stage, cohesiveness solidifies, mutual expectations stabilize, and shared standards emerge"),
        ("D", "The Performing stage focuses group structure and collective energy toward productive task accomplishment")
    ],
    "(A), (B), (C) and (D)",
    ["(A) and (C) only", "(B) and (D) only", "(A), (B) and (D) only"],
    "A",
    "All four statements accurately summarize the psychological dynamics of Tuckman's developmental stages: Forming (orientation), Storming (conflict), Norming (cohesion/rules), and Performing (task execution).",
    "Validates comprehensive understanding of Tuckman's model."
))

# Q60: Statement: Compliance vs Internalization
add_q(make_statement_question(
    CHAPTER, "Social Influence Processes",
    "Compliance involves private acceptance of beliefs accompanied by permanent internal cognitive realignment.",
    "Internalization produces long-lasting attitude change because the content of the influence is congruent with personal values.",
    4, "D",
    "Statement I is incorrect because compliance involves superficial external acquiescence without private acceptance (often ceasing once surveillance ends). Statement II is correct because internalization involves genuine private acceptance and integration into one's personal belief system.",
    "Contrasts compliance with internalization."
))

# Q61: Muzafer Sherif's Autokinetic Effect Study
opts, c, s = rotate_options(
    "When evaluating an ambiguous stationary pinpoint of light in a dark room, participants converged on an agreed-upon group norm over repeated trials",
    ["Participants discovered that light beams can transmit mathematical code", "Participants experienced acute hallucinations of physical flying monsters", "Participants refused to speak and sat in total silence for twenty hours"],
    "B",
    "Muzafer Sherif (1936) utilized the autokinetic visual illusion (a stationary light in dark appears to move) to demonstrate norm formation: in ambiguous situations, individual estimates quickly converge into a collective group norm that persists across subsequent solo trials.\nHence, Option {{CORR}} is correct.",
    "Summarizes Sherif's autokinetic conformity experiment."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "What did Muzafer Sherif demonstrate regarding social norm formation using the 'Autokinetic Effect' paradigm?", opts, c, s, 61))

# Q62: Match Intergroup Conflict Resolution Terms
add_q(make_match_question(
    CHAPTER, "Resolution of Intergroup Conflict",
    "Match List I (Resolution Strategy) with List II (Operational Description):",
    [("A", "Superordinate Goals"), ("B", "Recategorization"), ("C", "Negotiation"), ("D", "Mediation")],
    [("I", "Direct formal dialogue between conflicting parties to achieve mutually acceptable terms"), ("II", "Third-party facilitation assisting disputants to clarify issues without imposing a binding verdict"), ("III", "Compelling common objectives requiring joint cooperation that neither party can achieve alone"), ("IV", "Redefining cognitive boundaries so former outgroups become part of an inclusive ingroup")],
    "A-III, B-IV, C-I, D-II", "C",
    "Superordinate Goals: compelling shared objectives requiring joint work (A-III); Recategorization: redefining boundaries into inclusive ingroup (B-IV); Negotiation: direct formal dialogue for agreement (C-I); Mediation: third-party non-binding facilitation (D-II).",
    "Matches conflict resolution mechanisms to definitions."
))

# Q63: Ingroup Bias (Favoritism)
opts, c, s = rotate_options(
    "The systematic cognitive and behavioral tendency to favor, reward, and evaluate members of one's own ingroup more positively than members of outgroups",
    ["The habit of eating dinner with strangers at restaurant tables", "The tendency to prefer foreign products over domestic products", "The refusal to join sports clubs in local communities"],
    "D",
    "Ingroup bias (favoritism) is the pervasive human tendency to judge ingroup members as more honest, capable, and worthy, allocating greater resources and positive traits to them while evaluating outgroups unfavorably.\nHence, Option {{CORR}} is correct.",
    "Defines ingroup bias."
)
add_q(make_question(CHAPTER, "Types of Groups", "In social psychology, what is 'Ingroup Bias' (or Ingroup Favoritism)?", opts, c, s, 63))

# Q64: Outgroup Homogeneity Effect
opts, c, s = rotate_options(
    "The cognitive perception that members of an outgroup are 'all alike' and undifferentiated, while members of one's ingroup are viewed as diverse and unique",
    ["The scientific theory that all human beings share 99% identical genetic DNA", "The belief that all employees in a hospital receive identical monetary salaries", "The tendency of identical twins to express identical career choices"],
    "A",
    "The outgroup homogeneity effect is the cognitive tendency to view members of outgroups as being homogenous ('they are all the same'), while recognizing vast individuality, complexity, and distinctiveness among members of one's own ingroup ('we are diverse').\nHence, Option {{CORR}} is correct.",
    "Defines the outgroup homogeneity effect."
)
add_q(make_question(CHAPTER, "Types of Groups", "What is the 'Outgroup Homogeneity Effect' in social perception?", opts, c, s, 64))

# Q65: Assertion-Reason: Asch Conformity and Presence of a Dissenter
add_q(make_assertion_question(
    CHAPTER, "Social Influence Processes",
    "In Solomon Asch's line-judgment experiments, introducing a single confederate who gave the correct answer collapsed conformity rates by up to 80%.",
    "The presence of a lone dissenter shatters the perceived unanimity of the majority, providing social support and validating the participant's independent judgment.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Asch showed that unanimity is critical for normative social pressure; having just one ally liberates the individual to resist group conformity without fear of total social isolation.",
    "Explains how a dissenter breaks group conformity."
))

# Q66: Social Identity Theory and Intergroup Conflict
opts, c, s = rotate_options(
    "Individuals strive to maintain positive social identity by enhancing ingroup distinctiveness and derogating outgroups, generating intergroup conflict even without material competition",
    ["Conflict occurs strictly because individuals suffer from physical neurological brain damage", "Social identity theory posits that groups only fight when forced by police officers", "Groups are purely economic accounting units without any psychological meaning"],
    "B",
    "Henri Tajfel and John Turner's Social Identity Theory shows that self-esteem is inextricably tied to group membership; simply categorizing people into groups triggers competitive discrimination to boost ingroup status relative to outgroups.\nHence, Option {{CORR}} is correct.",
    "Connects Social Identity Theory to intergroup conflict."
)
add_q(make_question(CHAPTER, "Intergroup Conflict", "According to Henri Tajfel's Social Identity Theory, how does social categorization itself contribute to intergroup competition and prejudice?", opts, c, s, 66))

# Q67: Tit-for-Tat Strategy in Prisoner's Dilemma
opts, c, s = rotate_options(
    "Starting with cooperation on the first round, and subsequently mimicking whatever action the partner performed in the preceding round",
    ["Defecting on every single round without ever cooperating under any circumstance", "Cooperating blindly regardless of whether the partner constantly betrays you", "Flipping a coin randomly to determine moves on each round"],
    "C",
    "Robert Axelrod demonstrated that the 'Tit-for-Tat' strategy is extraordinarily successful in repeated Prisoner's Dilemma games: it begins by cooperating, immediately retaliates if defected against, and is forgiving (resumes cooperation as soon as the other cooperates).\nHence, Option {{CORR}} is correct.",
    "Explains the Tit-for-Tat strategy."
)
add_q(make_question(CHAPTER, "Cooperation and Competition", "In Robert Axelrod's computer tournaments of the repeated Prisoner's Dilemma, what defined the winning 'Tit-for-Tat' strategy?", opts, c, s, 67))

# Q68: GRIT Strategy (Charles Osgood)
opts, c, s = rotate_options(
    "Graduated and Reciprocated Initiatives in Tension-Reduction: a systematic strategy designed to de-escalate international hostilities through small, unilateral conciliatory steps",
    ["A military doctrine commanding massive nuclear strikes against enemy nations", "An athletic training regimen designed to build physical muscular grit", "A psychological personality trait measuring perseverance for long-term goals"],
    "D",
    "Charles Osgood proposed GRIT (Graduated and Reciprocated Initiatives in Tension-reduction) during the Cold War: one party initiates small, public, verifiable concessions to build trust, inviting reciprocal concessions while maintaining defensive readiness.\nHence, Option {{CORR}} is correct.",
    "Defines the GRIT strategy by Charles Osgood."
)
add_q(make_question(CHAPTER, "Resolution of Intergroup Conflict", "What is the 'GRIT Strategy' formulated by Charles Osgood for resolving intense intergroup or international conflict?", opts, c, s, 68))

# Q69: That's-Not-All Technique (Jerry Burger)
opts, c, s = rotate_options(
    "A sales technique where the seller presents an initial price and immediately offers an additional bonus or discount before the buyer can formulate a response",
    ["A technique where sellers insult buyers until they agree to purchase goods", "A technique where sellers secretly double the price after customers swipe credit cards", "A legal consumer protection law requiring 30-day money-back warranties"],
    "A",
    "Jerry Burger studied the 'That's-not-all' technique: by adding a bonus item or slashing the price before the customer responds to the initial offer, the seller creates a perceived concession, activating the reciprocity norm to buy.\nHence, Option {{CORR}} is correct.",
    "Defines the That's-Not-All technique."
)
add_q(make_question(CHAPTER, "Social Influence Processes", "In the psychology of compliance, how does the 'That's-Not-All' technique operate?", opts, c, s, 69))

# Q70: Statement: Groupthink vs Group Polarization
add_q(make_statement_question(
    CHAPTER, "Group Decision Making",
    "Groupthink represents an uncritical striving for consensus that overrides realistic decision appraisal in highly cohesive groups.",
    "Group polarization refers to the tendency of group discussion to neutralize strong opinions and produce an average, moderate stance.",
    3, "C",
    "Statement I is correct (Janis's definition of Groupthink). Statement II is incorrect because group polarization pushes opinions toward a more extreme position in the direction of the group's initial leanings, not toward a moderate stance.",
    "Contrasts Groupthink with Group Polarization."
))

# Q71: Illusion of Invulnerability in Groupthink
opts, c, s = rotate_options(
    "An excessive, unwarranted optimism that blinds group members to obvious risks and causes them to take extreme chances",
    ["The physical biological immunity against bacterial infectious viruses", "A clinical diagnostic delusion found exclusively in catatonic schizophrenia", "A legal diplomatic immunity granted to ambassadors in foreign embassies"],
    "B",
    "The illusion of invulnerability is a hallmark symptom of Groupthink: members develop unrealistic optimism, believing their cohesive group cannot fail, which leads them to ignore warnings and engage in reckless decision-making.\nHence, Option {{CORR}} is correct.",
    "Defines illusion of invulnerability in Groupthink."
)
add_q(make_question(CHAPTER, "Group Decision Making", "What does the 'Illusion of Invulnerability' entail within a group succumbing to Groupthink?", opts, c, s, 71))

# Q72: Devil's Advocacy in Preventing Groupthink
opts, c, s = rotate_options(
    "Formally assigning one group member the dedicated role of critically probing, challenging, and identifying flaws in proposed consensus plans",
    ["Practicing occult religious rituals before corporate business meetings", "Firing the most experienced executive in order to hire junior interns", "Forbidding all members from speaking English during committee debates"],
    "C",
    "Assigning a 'devil's advocate' is a deliberate structural remedy against Groupthink: the appointed member is explicitly mandated to raise counterarguments, expose hidden assumptions, and question popular proposals without fear of social penalty.\nHence, Option {{CORR}} is correct.",
    "Defines devil's advocacy in Groupthink prevention."
)
add_q(make_question(CHAPTER, "Group Decision Making", "How does the practice of 'Devil's Advocacy' protect decision-making groups from the hazards of Groupthink?", opts, c, s, 72))

# Q73: Assertion-Reason: Deindividuation and Mob Violence
add_q(make_assertion_question(
    CHAPTER, "Influence of Group on Individual Behaviour",
    "Individuals participating in large, anonymous mobs frequently commit acts of violence and vandalism that they would never commit when alone.",
    "Crowd anonymity and shared diffusion of responsibility induce deindividuation, dramatically lowering self-awareness, inhibitory control, and personal accountability.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Deindividuation strips away individual identity and evaluation apprehension in large mobs, causing individuals to adhere to immediate impulsive mob cues rather than personal internalized moral standards.",
    "Explains deindividuation's role in mob violence."
))

# Q74: Minimal Group Paradigm (Henri Tajfel)
opts, c, s = rotate_options(
    "An experimental methodology showing that assigning individuals to arbitrary, meaningless categories (e.g. coin flip, painting preference) is sufficient to produce ingroup favoritism",
    ["A minimal wage economic model calculating salaries in agricultural farms", "A design principle for building miniature architectural structures", "A clinical psychology technique used to minimize depressive panic episodes"],
    "D",
    "Henri Tajfel pioneered the 'Minimal Group Paradigm': even when groups were created based on trivial criteria (such as preference for Klee vs Kandinsky paintings) with zero face-to-face interaction or economic competition, participants systematically awarded more points/rewards to ingroup members.\nHence, Option {{CORR}} is correct.",
    "Summarizes the Minimal Group Paradigm."
)
add_q(make_question(CHAPTER, "Types of Groups", "What was revealed by Henri Tajfel's 'Minimal Group Paradigm' regarding the origins of intergroup bias?", opts, c, s, 74))

# Q75: Relative Deprivation in Intergroup Conflict
opts, c, s = rotate_options(
    "The subjective perception that one's group possesses less wealth, status, or opportunities compared to a salient reference group, fueling social discontent and protest",
    ["The objective physical measurement of caloric malnutrition among starving citizens", "The total absence of clean drinking water in arid geographic desert regions", "A biological loss of oxygen in blood during high-altitude mountain climbing"],
    "A",
    "Relative deprivation is not absolute poverty, but the subjective psychological gap between what a group feels it deserves and what it actually receives, evaluated in comparison to a privileged reference group, acting as a potent catalyst for collective protest and intergroup hostility.\nHence, Option {{CORR}} is correct.",
    "Defines relative deprivation in intergroup conflict."
)
add_q(make_question(CHAPTER, "Intergroup Conflict", "In the social psychology of collective protest, what is meant by 'Relative Deprivation'?", opts, c, s, 75))

# Q76: Distributive vs Procedural Justice in Conflict
opts, c, s = rotate_options(
    "Distributive justice concerns the perceived fairness of outcome allocations; Procedural justice concerns the perceived fairness of the rules and processes used to decide outcomes",
    ["Distributive justice applies to food; Procedural justice applies to sports", "Distributive justice is illegal; Procedural justice is legally protected", "Both terms represent identical judicial concepts with zero distinction"],
    "B",
    "In social justice research: Distributive Justice refers to fairness in how rewards, resources, and burdens are apportioned (equity, equality, need); Procedural Justice refers to whether the decision-making process was transparent, unbiased, consistent, and voice-providing.\nHence, Option {{CORR}} is correct.",
    "Distinguishes distributive from procedural justice."
)
add_q(make_question(CHAPTER, "Resolution of Intergroup Conflict", "How do psychologists differentiate between 'Distributive Justice' and 'Procedural Justice' in group relations?", opts, c, s, 76))

# Q77: Integrative Solutions: Logrolling
opts, c, s = rotate_options(
    "A negotiation process where parties trade off issues of differing priorities, each conceding on low-priority items to secure their high-priority demands",
    ["A physical lumberjack competition where athletes balance on floating logs in rivers", "A corrupt legal bribe handed to government inspectors to overlook building safety codes", "A psychological defense mechanism where patients roll on the floor during trauma"],
    "C",
    "Logrolling is a foundational integrative negotiation technique: when multiple issues are on the bargaining table, disputants make concessions on issues of low importance to themselves but high importance to the counterparty, achieving mutual win-win packages.\nHence, Option {{CORR}} is correct.",
    "Defines logrolling in integrative bargaining."
)
add_q(make_question(CHAPTER, "Resolution of Intergroup Conflict", "In integrative negotiation, what is meant by 'Logrolling'?", opts, c, s, 77))

# Q78: Ingroup Heterogeneity vs Outgroup Homogeneity
opts, c, s = rotate_options(
    "Perceiving our own group as composed of diverse, multifaceted individuals while perceiving outgroups as uniform and stereotypical",
    ["Perceiving all humans as physically identical in body weight and height", "Perceiving teachers as strict and students as rebellious", "Perceiving animals as intelligent and humans as irrational"],
    "D",
    "Ingroup heterogeneity effect leads people to recognize the fine-grained nuances, personal differences, and diverse talents within their own group, whereas the outgroup is dismissed with blunt overgeneralized stereotypes ('they are all identical').\nHence, Option {{CORR}} is correct.",
    "Contrasts ingroup heterogeneity with outgroup homogeneity."
)
add_q(make_question(CHAPTER, "Types of Groups", "How do the 'Ingroup Heterogeneity' and 'Outgroup Homogeneity' biases operate concurrently in social perception?", opts, c, s, 78))

# Q79: Assertion-Reason: Groupthink in Military & Foreign Policy Fiascoes
add_q(make_assertion_question(
    CHAPTER, "Group Decision Making",
    "Historic foreign policy disasters such as the 1961 Bay of Pigs invasion and the Pearl Harbor vulnerability were traced by Janis to Groupthink.",
    "Insular, highly cohesive decision-making cabinets suppressed internal dissent, rationalized flawed warnings, and operated under an illusion of invulnerability.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Irving Janis's historical case analyses demonstrated that top-level governmental groups were dominated by premature consensus seeking, where advisors self-censored doubts to maintain group solidarity, producing disastrous policy decisions.",
    "Connects Janis's Groupthink theory to historic foreign policy fiascoes."
))

# Q80: Structural Features of Groups: The Concept of Group Cohesiveness
opts, c, s = rotate_options(
    "High cohesiveness increases member satisfaction and conformity, but excessively high cohesiveness in the absence of procedural safeguards dramatically escalates the risk of Groupthink",
    ["High cohesiveness always produces corporate bankruptcy and member hatred", "High cohesiveness completely eliminates the need for team communication", "Cohesiveness is impossible to achieve in human groups and only exists in animal packs"],
    "B",
    "While group cohesiveness enhances member loyalty, morale, and performance coordination on routine tasks, Janis proved that when extreme cohesiveness combines with directive leadership and isolation, it breeds dangerous Groupthink.\nHence, Option {{CORR}} is correct.",
    "Evaluates the dual consequences of high group cohesiveness."
)
add_q(make_question(CHAPTER, "Group Structure", "What does social psychological research reveal regarding the dual consequences of 'High Group Cohesiveness' on team functioning?", opts, c, s, 80))

print(f"Total Unit 7 questions generated: {len(unit7_qs)}")
assert len(unit7_qs) == 80, f"Expected 80 questions, got {len(unit7_qs)}"

os.makedirs("mock/psy_units", exist_ok=True)
with open("mock/psy_units/unit7.json", "w", encoding="utf-8") as f:
    json.dump(unit7_qs, f, indent=2, ensure_ascii=False)
print("Saved mock/psy_units/unit7.json successfully!")
