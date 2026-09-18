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
unit6_seen = set()
unit6_qs = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in unit6_seen:
        raise ValueError(f"Duplicate in Unit 6: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in Unit 6: {q['questionText'][:80]}")
    unit6_seen.add(norm)
    assert len(q["options"]) == 4, f"Options length error: {q['questionText'][:40]}"
    assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option: {q['questionText'][:40]}"
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"], f"Missing solution: {q['questionText'][:40]}"
    unit6_qs.append(q)

CHAPTER = "Attitude and Social Cognition"

# --- SECTION 1: ATTITUDE COMPONENTS, FORMATION & CHANGE THEORIES (Q1 - Q40) ---

# Q1: Definition of Attitude
opts, c, s = rotate_options(
    "A state of readiness, a learned mental tendency to evaluate people, issues, or objects positively or negatively",
    ["An involuntary physiological reflex such as blinking when bright light appears", "A genetic biological code determining eye color and blood type", "An acute temporary panic attack lasting two minutes in an elevator"],
    "A",
    "In social psychology, an attitude is a learned, enduring predisposition or state of readiness to respond favorably or unfavorably toward a specific object, person, group, or idea.\nHence, Option {{CORR}} is correct.",
    "Defines attitude."
)
add_q(make_question(CHAPTER, "Nature of Attitudes", "How is an 'attitude' formally defined in social psychology?", opts, c, s, 1))

# Q2: The A-B-C Components of Attitude
opts, c, s = rotate_options(
    "Affective component (emotional feelings), Behavioural component (action tendency), and Cognitive component (beliefs and knowledge)",
    ["Aptitude, Behavior, and Conditioning", "Anxiety, Bipolarity, and Catatonia", "Alarm, Barrier, and Conflict"],
    "B",
    "The tripartite A-B-C model conceptualizes attitude as comprising: Affective component (emotional response, liking/disliking), Behavioural component (tendency to act), and Cognitive component (evaluative beliefs and thoughts).\nHence, Option {{CORR}} is correct.",
    "Lists the A-B-C components of attitude."
)
add_q(make_question(CHAPTER, "Nature of Attitudes", "What do the three letters represent in the 'A-B-C model' of attitude structure?", opts, c, s, 2))

# Q3: Example of A-B-C Components
opts, c, s = rotate_options(
    "Cognitive: believing green tea is healthy; Affective: enjoying the taste; Behavioural: drinking green tea daily",
    ["Cognitive: running five miles; Affective: calculating taxes; Behavioural: sleeping", "Cognitive: breathing air; Affective: pumping blood; Behavioural: digesting food", "All three components are completely identical with zero operational difference"],
    "C",
    "A concrete illustration of the A-B-C model: Cognitive (believing green tea contains antioxidants and is good for health), Affective (feeling pleasant emotions and liking its aroma), and Behavioural (purchasing and drinking green tea daily).\nHence, Option {{CORR}} is correct.",
    "Applies the A-B-C model to a concrete behavioral example."
)
add_q(make_question(CHAPTER, "Nature of Attitudes", "Which scenario accurately illustrates the three (A-B-C) components of an attitude?", opts, c, s, 3))

# Q4: Four Features of Attitudes (Valence, Extremeness, Simplicity, Centrality)
opts, c, s = rotate_options(
    "Valence (positivity/negativity), Extremeness (how far from neutral), Simplicity/Complexity (multiplexity), and Centrality (importance in attitude system)",
    ["Vision, Hearing, Smell, and Taste", "Orality, Anality, Phallicity, and Genitality", "Sattva, Rajas, Tamas, and Moksha"],
    "D",
    "Attitudes are characterized across four core structural features: (1) Valence (direction: positive or negative), (2) Extremeness (intensity/strength), (3) Simplicity-Complexity (multiplexity: number of underlying elements), and (4) Centrality (role and prominence in the broader attitude system).\nHence, Option {{CORR}} is correct.",
    "Identifies the four structural features of attitudes."
)
add_q(make_question(CHAPTER, "Nature of Attitudes", "Which set comprises the four fundamental structural features of attitudes described in NCERT?", opts, c, s, 4))

# Q5: Valence of an Attitude
opts, c, s = rotate_options(
    "The direction of the attitude, indicating whether an evaluation is positive, neutral, or negative toward the attitude object",
    ["The physical speed at which an individual speaks words during an argument", "The number of hours a person spends meditating in quiet rooms", "The genetic inheritance of biological blood type from parents"],
    "A",
    "Valence refers to the directionality of an attitude along a positive-to-negative continuum (e.g. an attitude toward environmental conservation can be positive, neutral, or negative).\nHence, Option {{CORR}} is correct.",
    "Defines the valence feature of attitudes."
)
add_q(make_question(CHAPTER, "Nature of Attitudes", "In attitude structure, what does 'Valence' specifically indicate?", opts, c, s, 5))

# Q6: Extremeness of an Attitude
opts, c, s = rotate_options(
    "How strongly positive or strongly negative an attitude is, scored as distance from the neutral midpoint on a rating scale",
    ["Whether an attitude is written in ink or typed on a computer keyboard", "Whether an individual belongs to a sports team or a chess club", "How many calories an individual consumes during breakfast"],
    "B",
    "Extremeness indicates the intensity or magnitude of an attitude: on a 1-to-5 scale (where 3 is neutral), a rating of 1 or 5 represents extreme attitudes, whereas ratings of 2 or 4 represent moderate attitudes.\nHence, Option {{CORR}} is correct.",
    "Defines the extremeness feature of attitudes."
)
add_q(make_question(CHAPTER, "Nature of Attitudes", "What does 'Extremeness' signify as a structural property of an attitude?", opts, c, s, 6))

# Q7: Simplicity vs Complexity (Multiplexity) of Attitudes
opts, c, s = rotate_options(
    "Refers to how many distinct ideas, beliefs, or constituent elements make up the attitude system",
    ["Refers to whether an attitude was learned in kindergarten or in college", "Refers to the physical grammatical length of the sentence expressing the attitude", "Refers to whether the attitude was taught by a mother or a father"],
    "C",
    "Simplicity-complexity (multiplexity) refers to the number of attitudes or beliefs within a broader attitude system; a simple attitude consists of only one or two beliefs, whereas a complex (multiplex) attitude system contains numerous interconnected beliefs.\nHence, Option {{CORR}} is correct.",
    "Defines simplicity vs complexity (multiplexity) of attitudes."
)
add_q(make_question(CHAPTER, "Nature of Attitudes", "The 'Simplicity vs Complexity' (or multiplexity) feature of an attitude system denotes:", opts, c, s, 7))

# Q8: Centrality of an Attitude
opts, c, s = rotate_options(
    "The significance, prominence, and core role of a specific attitude within an individual's overall attitude constellation, making it resistant to change",
    ["Whether an attitude is held by citizens living in the central geographic capital city", "Whether an attitude is printed in the exact physical center of a textbook page", "The chronological age at which a child speaks their very first word"],
    "D",
    "Centrality refers to the pivotal position and interconnectedness of an attitude within the broader attitude network; central attitudes are deeply tied to personal identity, exert widespread influence on other attitudes, and are highly resistant to change.\nHence, Option {{CORR}} is correct.",
    "Defines attitude centrality."
)
add_q(make_question(CHAPTER, "Nature of Attitudes", "In social psychology, what is meant by the 'Centrality' of an attitude?", opts, c, s, 8))

# Q9: Match Attitude Features with Definitions
add_q(make_match_question(
    CHAPTER, "Nature of Attitudes",
    "Match List I (Attitude Structural Feature) with List II (Descriptive Property):",
    [("A", "Valence"), ("B", "Extremeness"), ("C", "Simplicity-Complexity"), ("D", "Centrality")],
    [("I", "The number of diverse beliefs and cognitive elements comprising the attitude"), ("II", "The degree of positive or negative evaluation (direction of attitude)"), ("III", "The core position and resistance to change within the broader attitude system"), ("IV", "How intensely far an evaluation lies from the neutral midpoint on a scale")],
    "A-II, B-IV, C-I, D-III", "A",
    "Valence: positive/negative direction (A-II); Extremeness: intensity from neutral (B-IV); Simplicity-complexity: number of beliefs (C-I); Centrality: core position and resistance (D-III).",
    "Correctly matches attitude structural features to definitions."
))

# Q10: Attitude Formation through Classical Conditioning (Association)
opts, c, s = rotate_options(
    "A positive or negative attitude develops because an attitude object is repeatedly paired with an already pleasant or unpleasant stimulus",
    ["An attitude is formed by receiving monetary cash salaries from an employer", "An attitude is inherited directly through chromosomes from grandparents", "An attitude is produced by surgical operation on cerebral brain lobes"],
    "A",
    "Attitude formation through association occurs via classical conditioning: an initially neutral object (e.g. a new teacher) paired repeatedly with pleasant stimuli (warmth, praise) acquires positive affective valence.\nHence, Option {{CORR}} is correct.",
    "Explains attitude formation through association."
)
add_q(make_question(CHAPTER, "Attitude Formation", "How does attitude formation occur through the learning process of 'Association' (Classical Conditioning)?", opts, c, s, 10))

# Q11: Attitude Formation through Operant Conditioning (Reward/Punishment)
opts, c, s = rotate_options(
    "Attitudes that are reinforced or praised by parents and peers are strengthened, while penalized attitudes are suppressed or extinguished",
    ["Attitudes are formed by observing animals running in circles in laboratories", "Attitudes are created by memorizing telephone numbers from phonebooks", "Attitudes are formed strictly during deep non-REM dreaming sleep"],
    "B",
    "Operant conditioning influences attitudes through reinforcement contingencies: when children express attitudes approved or praised by parents/culture, those attitudes are strengthened; when penalized, they weaken.\nHence, Option {{CORR}} is correct.",
    "Explains attitude formation through reward and punishment."
)
add_q(make_question(CHAPTER, "Attitude Formation", "How do reinforcement and punishment (Operant Conditioning) shape attitude formation in developing children?", opts, c, s, 11))

# Q12: Attitude Formation through Modelling (Observational Learning)
opts, c, s = rotate_options(
    "Individuals observe the attitudes, opinions, and behaviours displayed by role models (parents, teachers, admired celebrities) and internalize them",
    ["Individuals read dictionaries backwards to acquire vocabulary", "Individuals undergo physical electrical shock therapy to change beliefs", "Individuals are hypnotized into repeating political slogans"],
    "C",
    "Albert Bandura's observational learning principles explain that children observe and imitate the attitudes, political leanings, and social prejudices exhibited by admired role models without needing direct personal reinforcement.\nHence, Option {{CORR}} is correct.",
    "Explains attitude formation through observational learning."
)
add_q(make_question(CHAPTER, "Attitude Formation", "Observational learning (Modelling) contributes to attitude formation primarily when:", opts, c, s, 12))

# Q13: Fritz Heider's Balance Theory (P-O-X Triangle)
opts, c, s = rotate_options(
    "P represents the Person, O represents another Person, and X represents the Attitude Object; balance occurs when the product of the three signs is positive",
    ["P represents Parents, O represents Offspring, and X represents Xenophobia", "P represents Past, O represents Present, and X represents Future", "P represents Pain, O represents Outcome, and X represents Execution"],
    "D",
    "Fritz Heider formulated Balance Theory based on the P-O-X triangle: Person (P), Other person (O), and Topic/Object (X). A state of cognitive balance exists when the product of the three relationship signs is positive (either three positive signs, or two negative and one positive sign).\nHence, Option {{CORR}} is correct.",
    "Details Fritz Heider's Balance Theory and the P-O-X triangle."
)
add_q(make_question(CHAPTER, "Attitude Change", "In Fritz Heider's Balance Theory, what do P, O, and X represent, and when is cognitive balance achieved?", opts, c, s, 13))

# Q14: Example of Heider's Cognitive Balance
opts, c, s = rotate_options(
    "P likes O (+), P likes X (+), and O likes X (+); all three signs are positive resulting in balance",
    ["P likes O (+), P likes X (+), but O hates X (-); product is negative resulting in balance", "P hates O (-), P hates X (-), and O hates X (-); product is negative resulting in balance", "Balance is impossible in human relationships and never occurs mathematically"],
    "A",
    "In Heider's model, when P likes O (+), P likes X (+), and O also likes X (+), the product is (+)(+)(+) = positive, creating cognitive balance with no psychological pressure for attitude change.\nHence, Option {{CORR}} is correct.",
    "Illustrates cognitive balance in Heider's theory."
)
add_q(make_question(CHAPTER, "Attitude Change", "Which triad of relationships in Fritz Heider's P-O-X model constitutes a state of cognitive balance?", opts, c, s, 14))

# Q15: Heider's Cognitive Imbalance and Attitude Change
opts, c, s = rotate_options(
    "Imbalance generates uncomfortable psychological tension, compelling the individual to change one of the relationships to restore balance",
    ["Imbalance produces immediate physical blindness in both optical retinas", "Imbalance has zero psychological effect and is completely unnoticed", "Imbalance forces an individual to move to a foreign continent"],
    "B",
    "When a P-O-X triad is in imbalance (e.g. P likes O, P likes X, but O detests X, product is negative), the resulting psychological discomfort motivates P to change their attitude toward O, toward X, or convince O to change, restoring balance.\nHence, Option {{CORR}} is correct.",
    "Explains how cognitive imbalance drives attitude change in Heider's theory."
)
add_q(make_question(CHAPTER, "Attitude Change", "According to Fritz Heider, why does a state of cognitive imbalance motivate an attitude change?", opts, c, s, 15))

# Q16: Leon Festinger's Cognitive Dissonance Theory
opts, c, s = rotate_options(
    "Occurs when an individual holds two psychologically contradictory cognitions (beliefs) or acts contrary to their attitude, creating tension that drives attitude change",
    ["Occurs when an individual listens to two discordant musical notes on a piano", "Occurs when an individual fails an arithmetic mathematics examination", "Occurs when an individual suffers from clinical bacterial pneumonia"],
    "C",
    "Leon Festinger proposed Cognitive Dissonance Theory: when a person holds conflicting cognitions (e.g. 'Smoking is lethal' and 'I smoke two packs daily'), the resulting unpleasant state of dissonance drives cognitive adjustments or rationalizations to restore consonance.\nHence, Option {{CORR}} is correct.",
    "Defines Festinger's Cognitive Dissonance Theory."
)
add_q(make_question(CHAPTER, "Attitude Change", "What is the core premise of Leon Festinger's Cognitive Dissonance Theory?", opts, c, s, 16))

# Q17: Classic Festinger and Carlsmith $1 vs $20 Experiment
opts, c, s = rotate_options(
    "Subjects paid $1 experienced high dissonance (insufficient justification) and changed their attitude to genuinely believe the boring task was fun, while subjects paid $20 did not",
    ["Subjects paid $20 loved the task, while subjects paid $1 became violently angry", "Both groups reported identical attitudes with zero psychological difference", "All subjects refused to accept any money and walked out of the laboratory"],
    "D",
    "Festinger and Carlsmith (1959) had subjects perform a boring peg-turning task and paid them either $1 or $20 to tell the next participant it was enjoyable. Those paid $1 experienced high dissonance (lying for a trivial reward) and changed their internal attitude to resolve the conflict, rating the task as genuinely fun.\nHence, Option {{CORR}} is correct.",
    "Summarizes Festinger and Carlsmith's famous $1 vs $20 experiment on cognitive dissonance."
)
add_q(make_question(CHAPTER, "Attitude Change", "In Festinger and Carlsmith's famous $1 versus $20 experiment on cognitive dissonance, why did subjects paid $1 rate the boring task as significantly more enjoyable?", opts, c, s, 17))

# Q18: S.M. Mohsin's Two-Step Concept of Attitude Change
opts, c, s = rotate_options(
    "Step 1: The target identifies with the source; Step 2: The target changes their attitude toward the attitude object to match the source's attitude",
    ["Step 1: The target is hypnotized; Step 2: The target is given electroconvulsive therapy", "Step 1: The source pays money; Step 2: The target signs a legal contract", "Step 1: The target learns grammar; Step 2: The target memorizes vocabulary"],
    "A",
    "Indian psychologist S.M. Mohsin formulated the Two-Step Concept: In Step 1, the target person identifies with the source (establishing positive affective identification); In Step 2, the target internalizes the source's attitude and changes their own attitude toward the attitude object.\nHence, Option {{CORR}} is correct.",
    "Details S.M. Mohsin's two-step concept of attitude change."
)
add_q(make_question(CHAPTER, "Attitude Change", "What are the two sequential steps in Indian psychologist S.M. Mohsin's 'Two-Step Concept' of attitude change?", opts, c, s, 18))

# Q19: Source Characteristics in Persuasion
opts, c, s = rotate_options(
    "High credibility (expertise and trustworthiness), attractiveness, and perceived similarity enhance persuasion",
    ["Low intelligence, dishonesty, and unkempt appearance maximize persuasion", "Speaking in complete silence without looking at the audience maximizes persuasion", "Demanding large cash payments from listeners maximizes persuasion"],
    "B",
    "Research in persuasion demonstrates that messages produce greater attitude change when delivered by a source who is perceived as highly credible (expert and trustworthy), physically attractive, or similar to the target audience.\nHence, Option {{CORR}} is correct.",
    "Identifies effective source characteristics in persuasion."
)
add_q(make_question(CHAPTER, "Attitude Change", "Which source characteristics significantly increase the persuasiveness of a message and foster attitude change?", opts, c, s, 19))

# Q20: Message Characteristics: Rational vs Emotional and Fear Appeals
opts, c, s = rotate_options(
    "Moderate fear appeals coupled with clear constructive recommendations are most effective; extreme fear triggers defensive avoidance and denial",
    ["Extreme paralyzing terror without any solution produces 100% permanent attitude change", "Emotional appeals are completely useless compared to complex mathematical equations", "One-sided messages are always superior to two-sided messages across all audiences"],
    "C",
    "In persuasion: Moderate fear appeals motivate attitude change only when accompanied by specific, actionable recommendations; excessively high fear triggers defensive denial, avoidance, and rejection of the message.\nHence, Option {{CORR}} is correct.",
    "Explains the effectiveness of fear appeals in persuasive messaging."
)
add_q(make_question(CHAPTER, "Attitude Change", "What does social psychological research reveal regarding the effectiveness of 'fear appeals' in changing attitudes?", opts, c, s, 20))

# Q21: One-Sided vs Two-Sided Messages
opts, c, s = rotate_options(
    "One-sided messages work best when the audience is initially favorable; two-sided messages work best when the audience is initially opposed or well-informed",
    ["One-sided messages work best for professors, while two-sided messages work best for infants", "Two-sided messages are illegal in commercial advertising across all countries", "Both types of messages produce identical results across all audience types"],
    "D",
    "A one-sided message (presenting only supporting arguments) is most effective when the audience already agrees with the viewpoint; a two-sided message (acknowledging and refuting counterarguments) is superior when the audience is initially hostile or highly educated.\nHence, Option {{CORR}} is correct.",
    "Contrasts one-sided and two-sided persuasive messages."
)
add_q(make_question(CHAPTER, "Attitude Change", "Under which conditions are 'two-sided messages' more persuasive than 'one-sided messages'?", opts, c, s, 21))

# Q22: Target Characteristics Influencing Persuasion
opts, c, s = rotate_options(
    "Persuasibility, self-esteem (moderate self-esteem is most changeable), intelligence, and prior commitment to existing attitudes",
    ["Physical body height, foot shoe size, and blood group", "Number of siblings born in the same family", "Speed of typing on computer keyboards"],
    "A",
    "Characteristics of the target audience affecting attitude change include: persuasibility, level of self-esteem (individuals with moderate self-esteem change attitudes more readily than those with extremely high or low self-esteem), cognitive complexity, and prior public commitment.\nHence, Option {{CORR}} is correct.",
    "Lists target characteristics influencing persuasion."
)
add_q(make_question(CHAPTER, "Attitude Change", "Which characteristics of the target audience influence how readily their attitudes can be changed?", opts, c, s, 22))

# Q23: Prejudice vs Stereotype vs Discrimination
opts, c, s = rotate_options(
    "Prejudice is an affective negative attitude; Stereotype is a cognitive overgeneralized belief; Discrimination is overt negative behaviour",
    ["Prejudice is behavior; Stereotype is emotion; Discrimination is thought", "Prejudice is genetic; Stereotype is linguistic; Discrimination is dietary", "All three terms are completely identical synonyms with zero psychological distinction"],
    "B",
    "In social psychology: Prejudice is an affective negative prejudgment/attitude toward a group; Stereotype is the cognitive component (rigid, oversimplified cluster of beliefs); Discrimination is the behavioural component (unfair, unequal differential action).\nHence, Option {{CORR}} is correct.",
    "Distinguishes prejudice, stereotype, and discrimination."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "How are 'Prejudice', 'Stereotype', and 'Discrimination' conceptually distinguished within the A-B-C framework?", opts, c, s, 23))

# Q24: Match Prejudice, Stereotype, and Discrimination
add_q(make_match_question(
    CHAPTER, "Prejudice and Discrimination",
    "Match List I (Social Construct) with List II (Specific Example):",
    [("A", "Stereotype"), ("B", "Prejudice"), ("C", "Discrimination"), ("D", "Scapegoating")],
    [("I", "Refusing to rent an apartment to members of a minority community"), ("II", "Believing that all members of a particular ethnic group are inherently lazy"), ("III", "Blaming innocent minority groups for national economic unemployment"), ("IV", "Experiencing strong negative gut feelings of dislike and hostility toward a social group")],
    "A-II, B-IV, C-I, D-III", "A",
    "Stereotype: cognitive belief all members lazy (A-II); Prejudice: affective gut dislike (B-IV); Discrimination: behavioural refusal to rent apartment (C-I); Scapegoating: blaming minority for national problems (D-III).",
    "Accurately links social concepts to illustrative real-world scenarios."
))

# Q25: Scapegoating
opts, c, s = rotate_options(
    "Blaming an innocent, powerless minority outgroup for the frustrations, economic failures, or misfortunes experienced by the dominant ingroup",
    ["Sacrificing animals during ancient religious harvest rituals", "Promoting corporate employees based strictly on objective merit", "Praising colleagues for their high intellectual accomplishments"],
    "B",
    "Scapegoating occurs when a frustrated group, unable to vent its anger on the real source of frustration, redirects its hostility onto an innocent, vulnerable, and defenseless minority outgroup.\nHence, Option {{CORR}} is correct.",
    "Defines scapegoating."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "In the social psychology of intergroup conflict, what does 'Scapegoating' entail?", opts, c, s, 25))

# Q26: Kernel of Truth Hypothesis
opts, c, s = rotate_options(
    "The proposition that stereotypes may originate from a small grain of historical or cultural truth that has been grossly exaggerated and distorted",
    ["The theory that all humans possess a genetic seed of pure altruism", "The belief that physical agriculture creates democratic governments", "The hypothesis that mental illness is caused by dietary wheat grains"],
    "C",
    "The 'kernel of truth' hypothesis suggests that stereotypes may sometimes be traced back to some historical, occupational, or economic reality that once existed in small measure, but has since been generalized, magnified, and frozen into rigid dogma.\nHence, Option {{CORR}} is correct.",
    "Defines the kernel of truth hypothesis."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "What is the core argument of the 'kernel of truth' hypothesis regarding stereotypes?", opts, c, s, 26))

# Q27: Self-Fulfilling Prophecy in Prejudice
opts, c, s = rotate_options(
    "Prejudiced expectations lead the dominant group to treat the target group in ways that inadvertently cause the target group to confirm the original stereotype",
    ["An ancient astrological prophecy that always comes true with 100% accuracy", "A person who predicts the winning numbers of a financial lottery ticket", "A medical doctor who accurately diagnoses a patient's physical bacterial fever"],
    "D",
    "A self-fulfilling prophecy occurs when an initially false expectation leads to behaviors that cause the expectation to come true (e.g. assuming a group is unfriendly leads to cold treatment, causing them to withdraw, confirming the unfriendliness).\nHence, Option {{CORR}} is correct.",
    "Explains the self-fulfilling prophecy mechanism in prejudice."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "How does a 'self-fulfilling prophecy' perpetuate social stereotypes and prejudice?", opts, c, s, 27))

# Q28: Strategies for Handling Prejudice: Intergroup Contact Hypothesis
opts, c, s = rotate_options(
    "Contact between groups reduces prejudice when it involves equal status, institutional support, cooperative interdependence, and common superordinate goals",
    ["Forcing hostile groups to fight competitive athletic boxing matches against each other", "Isolating different ethnic groups behind physical concrete barrier walls", "Banning all conversation and interaction between diverse communities"],
    "A",
    "Gordon Allport's Contact Hypothesis specifies that intergroup contact effectively dismantles prejudice only under optimal conditions: equal status between groups, cooperative interaction, institutional/normative support, and pursuit of common superordinate goals.\nHence, Option {{CORR}} is correct.",
    "States Allport's conditions for the Intergroup Contact Hypothesis."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "Under what conditions does direct contact between opposing social groups successfully diminish prejudice according to Gordon Allport?", opts, c, s, 28))

# Q29: Superordinate Goals in Prejudice Reduction
opts, c, s = rotate_options(
    "Compelling goals that cannot be achieved by any single group alone and require the cooperative, joint effort of both rival groups (as demonstrated in Sherif's Robbers Cave experiment)",
    ["Competitive goals where one group wins a gold trophy and the other group is eliminated", "Individualistic goals where each person works in total solitary isolation", "Secret goals concealed from other members of the community"],
    "B",
    "Muzafer Sherif demonstrated in the classic Robbers Cave experiment that introducing 'superordinate goals'—mutually desirable objectives that neither group can achieve without cooperation—successfully eliminated bitter intergroup hostility.\nHence, Option {{CORR}} is correct.",
    "Explains superordinate goals in prejudice reduction."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "What are 'Superordinate Goals', and how do they reduce intergroup hostility according to Muzafer Sherif?", opts, c, s, 29))

# Q30: Schemas in Social Cognition
opts, c, s = rotate_options(
    "Mental cognitive frameworks or organized structures of knowledge that represent and guide our processing of information about people, roles, and events",
    ["Physical biological nerve fibers connecting the spinal cord to skeletal muscles", "Standardized psychological testing forms printed on commercial paper", "Financial accounting spreadsheets tracking corporate business budgets"],
    "C",
    "A schema is a cognitive structure or mental framework that organizes and interprets information about concepts, people, roles (role schemas), and situations (scripts), acting as an efficient cognitive filter.\nHence, Option {{CORR}} is correct.",
    "Defines schemas in social cognition."
)
add_q(make_question(CHAPTER, "Social Cognition", "In social cognition, a 'Schema' is formally defined as:", opts, c, s, 30))

# Q31: Prototypes in Social Cognition
opts, c, s = rotate_options(
    "A mental ideal exemplar or average model that best represents the definitive features of a particular social category",
    ["An early physical working model of an industrial mechanical automobile engine", "A standardized questionnaire used to measure intelligence quotient", "A biological microscopic slide showing white blood cell division"],
    "D",
    "In social cognition, a prototype is an idealized mental representation or schema of the 'typical' or representative member of a social category (e.g. prototype of a 'college professor' or 'marathon runner').\nHence, Option {{CORR}} is correct.",
    "Defines prototypes in social cognition."
)
add_q(make_question(CHAPTER, "Social Cognition", "What is a 'Prototype' within the context of social cognitive categorization?", opts, c, s, 31))

# Q32: Impression Formation: Primacy Effect vs Recency Effect
opts, c, s = rotate_options(
    "Primacy effect: information presented first has a stronger impact on impression formation; Recency effect: information presented last has a stronger impact",
    ["Primacy effect applies to adults; Recency effect applies to infants", "Primacy effect is emotional; Recency effect is purely muscular", "Both terms describe types of classical Pavlovian conditioning"],
    "A",
    "In impression formation: The Primacy Effect demonstrates that information received first exerts a dominant, disproportionate influence on the overall impression; The Recency Effect occurs when later information is given greater weight (often when time has elapsed).\nHence, Option {{CORR}} is correct.",
    "Distinguishes primacy effect from recency effect."
)
add_q(make_question(CHAPTER, "Impression Formation", "In the psychology of impression formation, how are the 'Primacy Effect' and 'Recency Effect' distinguished?", opts, c, s, 32))

# Q33: Halo Effect in Impression Formation
opts, c, s = rotate_options(
    "The cognitive tendency to assume that a person who possesses one outstanding positive characteristic (e.g. physical attractiveness) also possesses other positive traits (e.g. intelligence, kindness)",
    ["The tendency to blame innocent victims for being robbed in street crimes", "The tendency to believe that all colleagues are plotting corporate sabotage", "The tendency to forget all autobiographical memories from early childhood"],
    "B",
    "The Halo Effect occurs when a single positive trait (such as physical beauty or charisma) creates an overall favorable impression, leading perceivers to unconsciously attribute other unrelated virtues (honesty, competence) to that person.\nHence, Option {{CORR}} is correct.",
    "Defines the halo effect in impression formation."
)
add_q(make_question(CHAPTER, "Impression Formation", "What is the 'Halo Effect' in impression formation?", opts, c, s, 33))

# Q34: Attribution Theory (Fritz Heider / Harold Kelley)
opts, c, s = rotate_options(
    "The psychological process through which individuals infer, interpret, and explain the underlying causes of their own and others' behaviour",
    ["The process of calculating mathematical percentages on standardized tests", "The biological process of digesting dietary nutrients in the gastrointestinal tract", "The legal procedure of sentencing criminal offenders in judicial courtrooms"],
    "C",
    "Attribution theory deals with how social perceivers explain the causes of behaviour and events: whether an observed action is attributed to internal (dispositional) factors or external (situational) factors.\nHence, Option {{CORR}} is correct.",
    "Defines attribution in social psychology."
)
add_q(make_question(CHAPTER, "Attribution of Causality", "In social psychology, 'Attribution' refers specifically to:", opts, c, s, 34))

# Q35: Internal (Dispositional) vs External (Situational) Attribution
opts, c, s = rotate_options(
    "Internal attribution assigns cause to factors within the person (ability, traits, effort); External attribution assigns cause to environmental circumstances (luck, task difficulty, weather)",
    ["Internal attribution assigns cause to food; External attribution assigns cause to water", "Internal attribution only occurs while asleep; External attribution occurs while awake", "Both terms describe types of physical neurological brain twitches"],
    "D",
    "Internal (dispositional) attribution locates causality within the actor's internal traits, motives, or abilities ('He was late because he is lazy'); External (situational) attribution locates causality in environmental factors ('He was late because of a traffic jam').\nHence, Option {{CORR}} is correct.",
    "Distinguishes internal from external attributions."
)
add_q(make_question(CHAPTER, "Attribution of Causality", "How do psychologists differentiate between 'Internal (Dispositional)' and 'External (Situational)' attributions?", opts, c, s, 35))

# Q36: Fundamental Attribution Error (FAE)
opts, c, s = rotate_options(
    "The pervasive tendency to overestimate internal dispositional factors and underestimate external situational influences when explaining others' behaviour",
    ["The tendency to overestimate situational factors when judging other people", "The tendency to believe that all human beings are physically identical", "The tendency to accurately calculate arithmetic statistics without errors"],
    "A",
    "The Fundamental Attribution Error (FAE, Lee Ross) is the universal cognitive bias to over-attribute other people's actions to internal dispositions, character flaws, or motives while ignoring or discounting powerful situational pressures.\nHence, Option {{CORR}} is correct.",
    "Defines the Fundamental Attribution Error (FAE)."
)
add_q(make_question(CHAPTER, "Attribution of Causality", "What is the 'Fundamental Attribution Error' (FAE) in social cognition?", opts, c, s, 36))

# Q37: Actor-Observer Effect
opts, c, s = rotate_options(
    "The tendency to attribute our own actions to external situational causes, while attributing other people's identical actions to internal dispositional flaws",
    ["The tendency of actors in theatrical dramas to forget their memorized lines", "The tendency of observers to fall asleep while watching sports tournaments", "The tendency to treat friends with unconditional positive warmth at all times"],
    "B",
    "The Actor-Observer Effect shows an asymmetry in attribution: when explaining our own behavior (as actor), we emphasize situational factors ('I tripped because the floor was slippery'); when observing others (as observer), we emphasize disposition ('He tripped because he is clumsy').\nHence, Option {{CORR}} is correct.",
    "Explains the Actor-Observer Effect."
)
add_q(make_question(CHAPTER, "Attribution of Causality", "Which cognitive bias explains why an individual attributes their own tardiness to a traffic jam, but attributes a colleague's tardiness to irresponsibility?", opts, c, s, 37))

# Q38: Social Facilitation and Social Inhibition
opts, c, s = rotate_options(
    "Social facilitation is the enhancement of performance on simple or well-learned tasks in the presence of others; social inhibition is performance impairment on complex novel tasks",
    ["Social facilitation is giving money; social inhibition is stealing money", "Social facilitation occurs only in infants; social inhibition occurs only in animals", "Both terms describe types of criminal legal punishments"],
    "C",
    "Norman Triplett and Robert Zajonc demonstrated that the presence of an audience increases arousal: this enhances performance on simple, dominant, well-rehearsed tasks (Social Facilitation), but impairs performance on complex, difficult, novel tasks (Social Inhibition).\nHence, Option {{CORR}} is correct.",
    "Contrasts social facilitation with social inhibition."
)
add_q(make_question(CHAPTER, "Explaining Social Behaviour", "How does the presence of an audience affect individual task performance according to the concepts of Social Facilitation and Social Inhibition?", opts, c, s, 38))

# Q39: Pro-Social Behaviour (Altruism)
opts, c, s = rotate_options(
    "Voluntary actions intended to help, benefit, or care for others without expecting any external reward or personal gain",
    ["Actions undertaken strictly to win commercial financial bonuses from employers", "Mandatory legal civic duties enforced by police officers", "Aggressive competitive fighting to establish territorial dominance"],
    "D",
    "Pro-social behaviour (altruism) refers to voluntary, helpful, and caring actions performed to benefit other people or society as a whole, motivated by empathy and concern without anticipation of personal reciprocity or material rewards.\nHence, Option {{CORR}} is correct.",
    "Defines pro-social behaviour (altruism)."
)
add_q(make_question(CHAPTER, "Explaining Social Behaviour", "In social psychology, 'Pro-social Behaviour' (or altruism) is formally characterized as:", opts, c, s, 39))

# Q40: Bystander Effect (Darley and Latané)
opts, c, s = rotate_options(
    "The presence of multiple bystanders inhibits individual helping behavior during an emergency due to diffusion of responsibility",
    ["The presence of bystanders triples the speed at which individuals provide CPR", "Bystanders are legally required to arrest criminal offenders immediately", "Bystanders always experience acute panic attacks lasting twenty-four hours"],
    "A",
    "John Darley and Bibb Latané demonstrated the Bystander Effect: an individual is significantly less likely to intervene and help a victim in an emergency when other passive onlookers are present, due to diffusion of responsibility and pluralistic ignorance.\nHence, Option {{CORR}} is correct.",
    "Explains the Bystander Effect by Darley and Latané."
)
add_q(make_question(CHAPTER, "Explaining Social Behaviour", "What is the 'Bystander Effect' demonstrated by Darley and Latané in emergency situations?", opts, c, s, 40))



# --- SECTION 2: ATTRIBUTIONS, SOCIAL INFLUENCE, PREJUDICE REDUCTION & HELPING (Q41 - Q80) ---

# Q41: Diffusion of Responsibility
opts, c, s = rotate_options(
    "The psychological belief that others will intervene or share the accountability, reducing personal felt obligation to act",
    ["A physical chemical reaction where gases disperse evenly in a laboratory flask", "The legal process of transferring company shares between corporate stockbrokers", "A mental disorder characterized by sudden total amnesia of personal name"],
    "B",
    "Diffusion of responsibility is the socio-psychological phenomenon where each bystander assumes that someone else will call for help or intervene, which dilutes individual moral responsibility and decreases the probability of any single person taking action.\nHence, Option {{CORR}} is correct.",
    "Defines diffusion of responsibility in bystander intervention."
)
add_q(make_question(CHAPTER, "Explaining Social Behaviour", "In emergency bystander intervention, what is meant by 'Diffusion of Responsibility'?", opts, c, s, 41))

# Q42: Pluralistic Ignorance
opts, c, s = rotate_options(
    "Bystanders rely on the calm, unreactive expressions of other onlookers to falsely conclude that the ambiguous event is not a genuine emergency",
    ["Ignorance caused by lack of access to formal school education in rural areas", "A severe neurological condition resulting in complete loss of sensory speech perception", "The refusal of citizens to vote in national parliamentary elections"],
    "C",
    "Pluralistic ignorance occurs when individuals in an ambiguous situation look to others' outwardly calm reactions to interpret the event, leading everyone to falsely conclude that no emergency exists because no one else looks alarmed.\nHence, Option {{CORR}} is correct.",
    "Explains pluralistic ignorance in emergency intervention."
)
add_q(make_question(CHAPTER, "Explaining Social Behaviour", "What role does 'Pluralistic Ignorance' play in delaying or preventing bystander assistance during an ambiguous crisis?", opts, c, s, 42))

# Q43: Sequence of Bystander Intervention (Darley & Latané 5-stage model)
add_q(make_sequence_question(
    CHAPTER, "Explaining Social Behaviour",
    "Arrange the five cognitive and decision-making steps in Darley and Latané's model of bystander intervention in their correct chronological order:",
    [
        ("A", "Noticing that something unusual is happening"),
        ("B", "Interpreting the ambiguous event as an emergency"),
        ("C", "Assuming personal responsibility to provide assistance"),
        ("D", "Deciding on the specific form of helpful action to take"),
        ("E", "Implementing the chosen helping behavior and offering aid")
    ],
    "A, B, C, D, E",
    "C",
    "Darley and Latané's 5-step intervention model: (1) Notice the event (A), (2) Interpret as emergency (B), (3) Assume personal responsibility (C), (4) Decide on the form of help (D), and (5) Implement the decision to aid (E).",
    "Orders the five stages of bystander intervention."
))

# Q44: Statement Question: Norm of Reciprocity vs Norm of Social Responsibility
add_q(make_statement_question(
    CHAPTER, "Explaining Social Behaviour",
    "The norm of reciprocity dictates that we should help those who have previously helped us.",
    "The norm of social responsibility prescribes that people should help those in need, regardless of past exchanges or future expectations.",
    1, "A",
    "Both statements are correct. The norm of reciprocity is an expectation that people will help, not hurt, those who have helped them. The norm of social responsibility is a universal societal expectation that individuals should assist dependents and those who need help without expecting reciprocity.",
    "Distinguishes reciprocity and social responsibility norms."
))

# Q45: Batson's Empathy-Altruism Hypothesis
opts, c, s = rotate_options(
    "Experiencing genuine empathy (feeling the victim's suffering) elicits truly selfless, altruistic motivation to alleviate the victim's distress rather than one's own discomfort",
    ["Altruism is driven entirely by fear of judicial police prosecution", "People only help others when offered substantial cash rewards", "Empathy leads exclusively to aggressive panic attacks"],
    "D",
    "C. Daniel Batson's Empathy-Altruism hypothesis posits that when perceivers feel true empathy for a person in need, they are motivated by selfless altruism to relieve that person's distress, even when escape from the situation is easy.\nHence, Option {{CORR}} is correct.",
    "Defines Batson's empathy-altruism hypothesis."
)
add_q(make_question(CHAPTER, "Explaining Social Behaviour", "According to C. Daniel Batson's 'Empathy-Altruism Hypothesis', what is the fundamental driver of pure altruism?", opts, c, s, 45))

# Q46: Determinants of Pro-social Behaviour
opts, c, s = rotate_options(
    "Being in a positive mood, perceiving the victim as similar to oneself, clarity of the emergency, and absence of other distracting bystanders",
    ["Extremely loud construction noise, darkness, and intense competitive jealousy", "High hostility, severe clinical depression, and presence of 500 passive onlookers", "Low intelligence, high psychopathy, and intense territorial rivalry"],
    "A",
    "Factors that significantly increase pro-social helping include: positive emotional mood, empathy, perceived similarity to the victim, unambiguous cues of distress, and being alone or in the presence of proactive helpful models.\nHence, Option {{CORR}} is correct.",
    "Identifies situational and personal factors fostering pro-social behavior."
)
add_q(make_question(CHAPTER, "Explaining Social Behaviour", "Which cluster of factors reliably increases the likelihood that an individual will engage in pro-social helping behaviour?", opts, c, s, 46))

# Q47: Richard LaPiere's Classic 1934 Study
opts, c, s = rotate_options(
    "Almost all establishments served the Chinese couple courteously in person, yet over 90% later stated in a written questionnaire that they would refuse service",
    ["Establishments violently assaulted the Chinese couple at every single location", "Establishments refused service in person but welcomed them warmly via written mail", "Questionnaires and observed behaviors were 100% perfectly identical in every instance"],
    "B",
    "Richard LaPiere (1934) traveled across the USA with a Chinese couple; out of 250 establishments, only one refused service. However, when polled by mail months later, over 90% stated they would not accept Chinese guests, demonstrating that expressed attitudes do not always predict actual behaviour.\nHence, Option {{CORR}} is correct.",
    "Summarizes Richard LaPiere's 1934 attitude-behavior inconsistency study."
)
add_q(make_question(CHAPTER, "Attitude-Behaviour Relationship", "What paradoxical discrepancy did Richard LaPiere's famous 1934 investigation with a Chinese couple reveal regarding attitudes and actual behaviour?", opts, c, s, 47))

# Q48: Conditions for Attitude-Behaviour Consistency
opts, c, s = rotate_options(
    "When the attitude is strong, central to self-concept, easily accessible in memory, and matched specifically to the target behaviour under low situational constraints",
    ["When the attitude was formed 50 years ago and completely forgotten by the individual", "When severe peer pressure violently forces the person to act oppositely", "When the attitude is extremely vague, weak, and entirely peripheral"],
    "C",
    "Attitudes consistently predict behavior when: (1) the attitude is strong and central, (2) it is highly accessible in memory, (3) the attitude is measured at the same level of specificity as the behavior (Fishbein & Ajzen), and (4) external social pressures/situational constraints are minimal.\nHence, Option {{CORR}} is correct.",
    "Outlines conditions under which attitudes strongly predict behavior."
)
add_q(make_question(CHAPTER, "Attitude-Behaviour Relationship", "Under which psychological conditions do attitudes exert a powerful, consistent predictive influence on actual behaviour?", opts, c, s, 48))

# Q49: Congruent vs Incongruent Attitude Change
opts, c, s = rotate_options(
    "Congruent change moves in the same existing direction (e.g. positive becomes more positive); Incongruent change moves in the opposite direction (e.g. positive becomes negative)",
    ["Congruent change occurs in children; Incongruent change occurs only in animals", "Congruent change involves surgery; Incongruent change involves medications", "Congruent change is always illegal; Incongruent change is always legally protected"],
    "D",
    "Congruent attitude change occurs when an attitude shifts further in its original direction (a moderately positive attitude becomes strongly positive). Incongruent attitude change occurs when an attitude flips to the opposite valence (a positive attitude becomes negative or vice versa).\nHence, Option {{CORR}} is correct.",
    "Distinguishes congruent from incongruent attitude change."
)
add_q(make_question(CHAPTER, "Attitude Change", "In social psychology, how are 'Congruent' and 'Incongruent' attitude changes defined?", opts, c, s, 49))

# Q50: Assertion-Reason: Difficulty of Incongruent Attitude Change
add_q(make_assertion_question(
    CHAPTER, "Attitude Change",
    "Incongruent attitude change is generally much more difficult to achieve than congruent attitude change.",
    "Incongruent change requires an individual to abandon existing evaluative beliefs and adopt a diametrically opposed cognitive and emotional stance.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Shifting an attitude to the opposite direction (incongruent change) faces intense cognitive inertia, dissonance, and psychological resistance because it requires reversing previously held cognitive beliefs and emotional attachments.",
    "Explains why incongruent attitude change is harder than congruent change."
))

# Q51: Match Attitude Change Theories
add_q(make_match_question(
    CHAPTER, "Attitude Change",
    "Match List I (Attitude Change Framework) with List II (Theorist / Concept):",
    [("A", "Balance Theory"), ("B", "Cognitive Dissonance"), ("C", "Two-Step Concept"), ("D", "Elaboration Likelihood Model")],
    [("I", "Leon Festinger"), ("II", "Petty & Cacioppo"), ("III", "Fritz Heider"), ("IV", "S.M. Mohsin")],
    "A-III, B-I, C-IV, D-II", "B",
    "Balance Theory was formulated by Fritz Heider (A-III); Cognitive Dissonance by Leon Festinger (B-I); Two-Step Concept by S.M. Mohsin (C-IV); Elaboration Likelihood Model by Petty & Cacioppo (D-II).",
    "Matches persuasion and attitude change theories to theorists."
))

# Q52: Elaboration Likelihood Model (Petty & Cacioppo)
opts, c, s = rotate_options(
    "The Central Route involves thoughtful analysis of message arguments, whereas the Peripheral Route relies on superficial cues like source attractiveness or emotional music",
    ["Central route is used by children; peripheral route is used by politicians", "Central route operates through hypnosis; peripheral route operates through electrical shock", "Central route is emotional; peripheral route is purely mathematical"],
    "C",
    "Richard Petty and John Cacioppo's Elaboration Likelihood Model (ELM) posits two persuasion routes: Central Route (deep processing, systematic evaluation of argument quality) and Peripheral Route (low cognitive effort, reliance on heuristics, celebrity endorsers, or music).\nHence, Option {{CORR}} is correct.",
    "Contrasts central and peripheral routes in the Elaboration Likelihood Model."
)
add_q(make_question(CHAPTER, "Attitude Change", "According to Petty and Cacioppo's Elaboration Likelihood Model (ELM), how do the 'Central Route' and 'Peripheral Route' to persuasion differ?", opts, c, s, 52))

# Q53: The Sleeper Effect (Carl Hovland)
opts, c, s = rotate_options(
    "A delayed increase in the persuasive impact of a non-credible source's message over time, occurring because the message content is retained while the source cue is forgotten",
    ["The tendency of patients with insomnia to agree with hospital doctors", "The psychological habit of falling asleep during boring classroom lectures", "A rapid immediate change in attitude that disappears within five seconds"],
    "D",
    "Carl Hovland identified the 'Sleeper Effect': over time, people tend to remember the persuasive message but forget or dissociate it from its discounting, low-credibility source, leading to an increase in message persuasion over time.\nHence, Option {{CORR}} is correct.",
    "Defines the Sleeper Effect in persuasion research."
)
add_q(make_question(CHAPTER, "Attitude Change", "In persuasion research by Carl Hovland, what is the 'Sleeper Effect'?", opts, c, s, 53))

# Q54: Ways to Reduce Cognitive Dissonance
opts, c, s = rotate_options(
    "Changing an inconsistent attitude or behavior, acquiring new consonant information, or minimizing the perceived importance of the conflict",
    ["Undergoing neurosurgical lobotomy to eliminate emotional brain lobes", "Memorizing the periodic table of elements in reverse alphabetical order", "Drinking ten liters of water per day to flush out emotional toxins"],
    "A",
    "Festinger specified multiple strategies to reduce cognitive dissonance: (1) change the behavior, (2) change the dissonant cognition/attitude, (3) acquire new supporting cognitions to justify the behavior, or (4) trivialize/minimize the importance of the issue.\nHence, Option {{CORR}} is correct.",
    "Lists legitimate mechanisms for resolving cognitive dissonance."
)
add_q(make_question(CHAPTER, "Attitude Change", "According to Leon Festinger, which of the following represents a primary psychological mechanism through which individuals resolve cognitive dissonance?", opts, c, s, 54))

# Q55: Role Schemas vs Event Schemas (Scripts)
opts, c, s = rotate_options(
    "Role schemas are expectations about behaviors of people occupying specific social positions; Event schemas (scripts) are expected sequences of events in familiar situations",
    ["Role schemas apply to movies; Event schemas apply to sports stadiums", "Role schemas are genetic; Event schemas are linguistic", "Both terms mean identical things with zero conceptual difference"],
    "B",
    "In social cognition: Role schemas are organized cognitive structures about the behaviors, duties, and characteristics expected of individuals in specific social roles (e.g. doctor, teacher); Event schemas (scripts) dictate expected sequences of actions in specific cultural settings (e.g. ordering food at a restaurant).\nHence, Option {{CORR}} is correct.",
    "Distinguishes role schemas from event schemas (scripts)."
)
add_q(make_question(CHAPTER, "Social Cognition", "How do social psychologists distinguish between a 'Role Schema' and an 'Event Schema' (Script)?", opts, c, s, 55))

# Q56: Solomon Asch's Configural Model (Central vs Peripheral Traits)
opts, c, s = rotate_options(
    "Central traits (such as 'warm' or 'cold') powerfully reorganize and transform the overall perception of all other accompanying peripheral personality traits",
    ["Peripheral traits always override central traits in impression formation", "All personality traits have identical weight with zero difference in cognitive impact", "Central traits only apply to biological siblings living in the same home"],
    "C",
    "Solomon Asch (1946) demonstrated that 'central traits' (like 'warm' vs 'cold') exert a disproportionate organizing effect on impression formation, causing identical peripheral traits (intelligent, industrious, practical) to be perceived in a totally different light.\nHence, Option {{CORR}} is correct.",
    "Details Asch's configural model of impression formation."
)
add_q(make_question(CHAPTER, "Impression Formation", "In Solomon Asch's classic experiments on impression formation, what was discovered about the impact of 'Central Traits' (such as 'warm' versus 'cold')?", opts, c, s, 56))

# Q57: Harold Kelley's Covariation Model of Attribution
opts, c, s = rotate_options(
    "Consensus (do other people behave similarly?), Consistency (does this person behave similarly across time?), and Distinctiveness (does this person behave differently across stimuli?)",
    ["Creativity, Compassion, and Courage", "Childhood, Adolescence, and Adulthood", "Conscious, Preconscious, and Unconscious"],
    "D",
    "Harold Kelley's Covariation Model posits that people attribute causality using three informational dimensions: Consensus (extent to which other people react similarly), Consistency (extent to which the person reacts similarly across time/situations), and Distinctiveness (extent to which the person reacts uniquely to this specific entity).\nHence, Option {{CORR}} is correct.",
    "Lists Kelley's three dimensions of covariation in attribution."
)
add_q(make_question(CHAPTER, "Attribution of Causality", "What are the three criteria in Harold Kelley's Covariation Model used by social perceivers to attribute causality to internal or external sources?", opts, c, s, 57))

# Q58: Match Kelley's Attribution Criteria
add_q(make_match_question(
    CHAPTER, "Attribution of Causality",
    "Match List I (Kelley's Attribution Dimension) with List II (Operational Question):",
    [("A", "Consensus"), ("B", "Consistency"), ("C", "Distinctiveness"), ("D", "External Attribution Configuration")],
    [("I", "Does the individual respond in the same manner to this stimulus over time and on different occasions?"), ("II", "High Consensus, High Consistency, High Distinctiveness"), ("III", "Do other individuals respond in the same way to this particular stimulus?"), ("IV", "Does the individual react uniquely to this specific stimulus, or similarly to all other stimuli?")],
    "A-III, B-I, C-IV, D-II", "A",
    "Consensus: whether others react similarly (A-III); Consistency: whether person reacts similarly over time (B-I); Distinctiveness: whether reaction is unique to this stimulus (C-IV); External attribution is triggered when Consensus, Consistency, and Distinctiveness are all high (D-II).",
    "Matches Kelley's attribution dimensions to their diagnostic questions."
))

# Q59: Self-Serving Bias
opts, c, s = rotate_options(
    "The tendency to attribute our own successes to internal dispositional factors (ability, hard work) and our failures to external situational factors (bad luck, unfair rules)",
    ["The habit of giving all of one's money away to charitable organizations", "The tendency to blame oneself for all economic recessions in the country", "The cognitive ability to memorize telephone directories without errors"],
    "B",
    "The Self-Serving Bias is a motivational and cognitive distortion where individuals protect self-esteem by taking personal credit for positive outcomes ('I passed because I am brilliant') while externalizing negative outcomes ('I failed because the exam was unfair').\nHence, Option {{CORR}} is correct.",
    "Defines the Self-Serving Bias in attribution."
)
add_q(make_question(CHAPTER, "Attribution of Causality", "What is the 'Self-Serving Bias' in social attribution?", opts, c, s, 59))

# Q60: Just-World Hypothesis (Melvin Lerner)
opts, c, s = rotate_options(
    "The cognitive belief that the world is inherently fair, leading people to blame innocent victims for their misfortunes by assuming 'they must have done something to deserve it'",
    ["The belief that all judicial legal systems are corrupt across every nation", "The geographical theory that Earth has an equitable distribution of climate zones", "The psychological idea that children are born with flawless photographic memories"],
    "C",
    "Melvin Lerner's Just-World Hypothesis posits that people possess a strong need to believe the world is fundamentally just, causing them to derogate and blame innocent victims of rape, poverty, or crime to maintain psychological comfort.\nHence, Option {{CORR}} is correct.",
    "Explains Melvin Lerner's Just-World Hypothesis and victim-blaming."
)
add_q(make_question(CHAPTER, "Attribution of Causality", "How does Melvin Lerner's 'Just-World Hypothesis' explain the widespread cognitive tendency to blame innocent victims for their misfortunes?", opts, c, s, 60))

# Q61: The Authoritarian Personality (Theodor Adorno)
opts, c, s = rotate_options(
    "A personality syndrome characterized by rigid adherence to conventional norms, uncritical submission to authority, aggression toward outgroups, and measured via the F-scale",
    ["A warm, empathetic individual who welcomes all immigrants with unconditional acceptance", "A clinical diagnostic category reserved exclusively for catatonic schizophrenia", "An artistic personality characterized by free-spirited bohemian creativity"],
    "D",
    "Theodor Adorno et al. (1950) identified the Authoritarian Personality: shaped by harsh, punitive parenting, such individuals exhibit blind submissiveness to authority, rigid cognitive thinking, intolerance of ambiguity, and intense outgroup prejudice (assessed by the California F-scale).\nHence, Option {{CORR}} is correct.",
    "Characterizes Adorno's Authoritarian Personality."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "What is the 'Authoritarian Personality' identified by Theodor Adorno as a major psychological root of prejudice?", opts, c, s, 61))

# Q62: Statement Question: Social Identity Theory (Henri Tajfel)
add_q(make_statement_question(
    CHAPTER, "Prejudice and Discrimination",
    "Henri Tajfel's Social Identity Theory demonstrates that mere categorization into arbitrary groups is sufficient to trigger ingroup favoritism and outgroup derogation.",
    "Individuals derive a significant component of their self-esteem and social identity from the perceived superiority of their ingroup over outgroups.",
    1, "A",
    "Both statements are correct. In Tajfel's minimal group experiments, merely categorizing participants into meaningless groups (e.g. overestimators vs underestimators) produced immediate ingroup favoritism. Social Identity Theory demonstrates that boosting ingroup status enhances personal self-esteem.",
    "Evaluates the core tenets of Tajfel's Social Identity Theory."
))

# Q63: Realistic Group Conflict Theory (Muzafer Sherif)
opts, c, s = rotate_options(
    "Intergroup hostility and prejudice inevitably arise when two or more groups compete directly for real, scarce, and zero-sum material or economic resources",
    ["Prejudice is an inherited recessive gene located on the 21st chromosome", "Hostility occurs strictly when groups share 100% identical religious doctrines", "Prejudice is caused entirely by dietary sugar deficiencies in childhood"],
    "B",
    "Realistic Group Conflict Theory (formulated by Muzafer Sherif and Donald Campbell) asserts that prejudice and discrimination stem from direct competition between social groups for scarce, valued resources (jobs, land, water, political power).\nHence, Option {{CORR}} is correct.",
    "Explains Realistic Group Conflict Theory."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "According to 'Realistic Group Conflict Theory', what is the fundamental origin of intergroup hostility and prejudice?", opts, c, s, 63))

# Q64: Elliot Aronson's Jigsaw Classroom Technique
opts, c, s = rotate_options(
    "Desegregated classroom learning where students are divided into diverse cooperative teams, each child holding one essential piece of the lesson, requiring mutual interdependence to succeed",
    ["A competitive puzzle competition where the fastest child wins a cash prize and others fail", "A solitary homework assignment completed in silence without teacher supervision", "A physical sports tournament where students wrestle for school trophies"],
    "C",
    "Elliot Aronson developed the Jigsaw Classroom technique to reduce racial prejudice: students are placed in multi-ethnic teams where each student masters one unique portion of the material and must teach it to team-mates, fostering cooperative interdependence and breaking down stereotypes.\nHence, Option {{CORR}} is correct.",
    "Details Elliot Aronson's Jigsaw Classroom method."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "How does Elliot Aronson's 'Jigsaw Classroom' technique successfully dismantle prejudice among diverse students in educational settings?", opts, c, s, 64))

# Q65: Assertion-Reason: Superordinate Goals in Intergroup Conflict
add_q(make_assertion_question(
    CHAPTER, "Prejudice and Discrimination",
    "Introducing superordinate goals in Muzafer Sherif's Robbers Cave experiment successfully replaced hostility with intergroup harmony.",
    "Superordinate goals require joint cooperative effort from both conflicting groups that neither group can achieve alone, shifting the psychological boundary from 'us versus them' to a shared 'we'.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Sherif's Robbers Cave study proved that hostile groups (Rattlers and Eagles) could overcome deep-seated prejudice only when confronted with superordinate goals (restoring broken water supply, pulling a stalled truck) demanding mutual interdependence.",
    "Connects superordinate goals to reduction of intergroup hostility."
))

# Q66: Aversive Racism and Implicit Prejudice
opts, c, s = rotate_options(
    "A subtle, often unconscious form of prejudice where individuals genuinely endorse egalitarian values yet harbor unacknowledged negative feelings or discomfort toward minority groups",
    ["Overt, violent hate crimes committed openly by extremist street gangs", "A legal government statute banning minorities from holding passports", "A neurological disease causing patients to yell racial slurs during sleep"],
    "D",
    "Aversive racism refers to modern subtle prejudice: well-intentioned individuals consciously disavow prejudice and support equality, but unconsciously harbor discomfort, avoidance, or subtle bias, which manifests in ambiguous situations where discrimination can be rationalized.\nHence, Option {{CORR}} is correct.",
    "Defines aversive racism and implicit bias."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "In modern social psychology, how is 'Aversive Racism' (or implicit prejudice) defined?", opts, c, s, 66))

# Q67: Multi-statement: Effective Strategies for Reducing Prejudice
add_q(make_multi_statement_question(
    CHAPTER, "Prejudice and Discrimination",
    "Which of the following strategies have been demonstrated by social psychological research to be effective in reducing prejudice?",
    [
        ("A", "Changing unhelpful attitudes through counter-stereotypic education and media portrayal"),
        ("B", "Fostering intergroup contact under conditions of equal status and cooperative norms"),
        ("C", "Creating shared superordinate goals requiring mutual interdependence"),
        ("D", "Emphasizing positive individual identities rather than rigid social category labels")
    ],
    "(A), (B), (C) and (D)",
    ["(A) and (C) only", "(B) and (D) only", "(A), (B) and (D) only"],
    "A",
    "All four strategies are empirically validated methods for mitigating prejudice: educational/cognitive intervention, Allport's contact hypothesis conditions, Sherif's superordinate goals, and decategorization/individuation.",
    "Identifies multiple validated methods for reducing social prejudice."
))

# Q68: Sequence: S.M. Mohsin's Two-Step Concept
add_q(make_sequence_question(
    CHAPTER, "Attitude Change",
    "Trace the psychological steps in S.M. Mohsin's 'Two-Step Concept' of attitude change from start to completion:",
    [
        ("A", "Target establishes positive identification with the source"),
        ("B", "Source expresses a clear attitude toward the attitude object"),
        ("C", "Target perceives inconsistency between their own attitude and the source's attitude"),
        ("D", "Target alters their attitude toward the object to align with the admired source")
    ],
    "A, B, C, D",
    "B",
    "S.M. Mohsin's two-step process: (1) Target identifies with source (A), (2) Source displays attitude toward object (B), (3) Target experiences imbalance/inconsistency (C), and (4) Target aligns attitude toward object to maintain harmony with the source (D).",
    "Sequences the operational stages of Mohsin's two-step model."
))

# Q69: Statement: Primacy vs Recency in Impression Formation
add_q(make_statement_question(
    CHAPTER, "Impression Formation",
    "The primacy effect occurs when traits presented early in a sequence establish an interpretive framework that colors subsequent information.",
    "The recency effect is more likely to occur when there is a significant time delay between the initial information and the final evaluation.",
    1, "A",
    "Both statements are correct. Early information creates an anchor (primacy effect) through assimilation. However, if substantial time elapses, memory for early traits decays, and recent information exerts stronger cognitive salience (recency effect).",
    "Explains temporal effects in social impression formation."
))

# Q70: Assertion-Reason: Bystander Effect in High-Density Crowds
add_q(make_assertion_question(
    CHAPTER, "Explaining Social Behaviour",
    "A collapsed heart attack victim in a packed railway concourse surrounded by 200 commuters is paradoxically less likely to receive immediate CPR than on a quiet street with a single passerby.",
    "In large crowds, diffusion of responsibility and pluralistic ignorance combine to paralyze individual bystander initiative.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). As documented in Darley and Latané's classic bystander studies, the presence of numerous passive onlookers produces diffusion of responsibility ('someone else will help') and pluralistic ignorance ('nobody looks panicked, so it must not be serious').",
    "Applies bystander effect to crowded public settings."
))

# Q71: Information Integration Theory (Norman Anderson)
opts, c, s = rotate_options(
    "The Averaging Model posits that perceivers compute the average value of all observed personality traits rather than simply adding their absolute weights",
    ["Perceivers multiply traits by the person's physical body weight", "Perceivers discard all positive traits and focus solely on clothing style", "Perceivers rely strictly on astrological zodiac compatibility charts"],
    "B",
    "Norman Anderson's Information Integration Theory established that impression formation primarily follows an Averaging Model: introducing moderately positive information alongside extremely positive information actually dilutes the overall impression compared to the extreme traits alone.\nHence, Option {{CORR}} is correct.",
    "Details Anderson's Averaging Model in impression formation."
)
add_q(make_question(CHAPTER, "Impression Formation", "According to Norman Anderson's Information Integration Theory, how do perceivers combine multiple traits into a unified impression?", opts, c, s, 71))

# Q72: Match Biases in Social Cognition
add_q(make_match_question(
    CHAPTER, "Attribution of Causality",
    "Match List I (Attribution Bias) with List II (Manifestation):",
    [("A", "Fundamental Attribution Error"), ("B", "Actor-Observer Effect"), ("C", "Self-Serving Bias"), ("D", "Halo Effect")],
    [("I", "Attributing our own success to skill, but our failure to bad luck"), ("II", "Assuming an attractive person is also kind, honest, and intelligent"), ("III", "Attributing another driver's sudden lane cut to reckless personality rather than an emergency"), ("IV", "Excusing one's own late arrival due to traffic while condemning a coworker's lateness as laziness")],
    "A-III, B-IV, C-I, D-II", "C",
    "Fundamental Attribution Error: blaming another's action on disposition (A-III); Actor-Observer: situational for self, dispositional for other (B-IV); Self-Serving: credit for success, blame luck for failure (C-I); Halo Effect: generalizing one positive trait to all domains (D-II).",
    "Matches core cognitive biases to everyday behavioral examples."
))

# Q73: Evaluation Apprehension in Social Facilitation
opts, c, s = rotate_options(
    "Nickolas Cottrell demonstrated that performance arousal is driven by the fear of being evaluated and judged by the audience, rather than by their mere physical presence",
    ["Arousal is caused by the room's physical temperature exceeding 40 degrees Celsius", "Arousal is entirely an auditory reaction to the sound of people breathing", "Arousal occurs only when the audience speaks in foreign languages"],
    "D",
    "Nickolas Cottrell formulated the Evaluation Apprehension Theory of social facilitation: an audience produces physiological arousal and facilitation/inhibition effects only when the performer perceives that the observers are capable of evaluating their competence.\nHence, Option {{CORR}} is correct.",
    "Explains Cottrell's evaluation apprehension theory."
)
add_q(make_question(CHAPTER, "Explaining Social Behaviour", "In social facilitation research, what modification did Nickolas Cottrell introduce to Robert Zajonc's 'mere presence' hypothesis?", opts, c, s, 73))

# Q74: Empathy vs Personal Distress in Helping
opts, c, s = rotate_options(
    "Empathy produces other-oriented compassion focused on relieving the victim's suffering, whereas personal distress produces self-oriented anxiety focused on reducing one's own discomfort",
    ["Empathy is physical; personal distress is financial", "Empathy occurs only in medical doctors; personal distress occurs in patients", "Both terms describe identical emotional states with zero psychological distinction"],
    "A",
    "Social psychologists distinguish between Empathy (other-oriented compassion and warmth, motivating altruistic helping) and Personal Distress (self-oriented feelings of alarm, upset, or discomfort, motivating egoistic escape or helping only if escape is difficult).\nHence, Option {{CORR}} is correct.",
    "Contrasts other-oriented empathy with self-oriented personal distress."
)
add_q(make_question(CHAPTER, "Explaining Social Behaviour", "How does social psychological research distinguish between 'Empathy' and 'Personal Distress' when observing a suffering victim?", opts, c, s, 74))

# Q75: Statement: Central vs Peripheral Route Persuasion Durability
add_q(make_statement_question(
    CHAPTER, "Attitude Change",
    "Attitudes formed or changed via the Central Route of the Elaboration Likelihood Model are typically enduring, resistant to counter-persuasion, and predictive of behaviour.",
    "Attitudes formed via the Peripheral Route are relatively temporary, easily swayed by counter-messages, and less predictive of actual behaviour.",
    1, "A",
    "Both statements are correct. Central route persuasion involves extensive cognitive elaboration and systematic restructuring of memory networks, creating durable attitudes. Peripheral route persuasion relies on superficial associative cues, creating fleeting and vulnerable attitudes.",
    "Evaluates the durability of central vs peripheral route attitude change."
))

# Q76: Fritz Heider's Sign Rule for Cognitive Balance
opts, c, s = rotate_options(
    "A triad is balanced if all three relationships are positive, or if two relationships are negative and one is positive",
    ["A triad is balanced if all three relationships are completely negative", "A triad is balanced if two relationships are positive and one is negative", "A triad is balanced only when people stop talking to each other"],
    "B",
    "According to Fritz Heider's Balance Theory, cognitive balance exists in a P-O-X triad when the multiplicative product of the three signs is positive: (+)(+)(+) = + (all 3 positive) or (-)(-)(+) = + (two negative, one positive). If two are positive and one is negative, product is negative (imbalance).\nHence, Option {{CORR}} is correct.",
    "States the mathematical sign rule for balance in Heider's P-O-X model."
)
add_q(make_question(CHAPTER, "Attitude Change", "What is the mathematical sign rule governing cognitive balance in Fritz Heider's P-O-X triad model?", opts, c, s, 76))

# Q77: Post-Decision Dissonance (Free Choice Paradigm)
opts, c, s = rotate_options(
    "After choosing between two similarly attractive alternatives, individuals unconsciously upgrade the chosen alternative and downgrade the rejected alternative to justify their decision",
    ["Individuals immediately return their chosen purchase and demand a refund", "Individuals experience severe amnesia regarding what item they selected", "Individuals always prefer the rejected alternative for the rest of their lives"],
    "C",
    "Post-decision dissonance (Brehm, 1956) occurs after making a difficult choice between two appealing options: to eliminate the dissonance of rejecting attractive features of the foregone alternative, people 'spread the alternatives' by enhancing the chosen option and derogating the unchosen one.\nHence, Option {{CORR}} is correct.",
    "Explains post-decision dissonance and spreading of alternatives."
)
add_q(make_question(CHAPTER, "Attitude Change", "In cognitive dissonance research, what is 'Post-Decision Dissonance' (spreading of alternatives)?", opts, c, s, 77))

# Q78: Emory Bogardus Social Distance Scale
opts, c, s = rotate_options(
    "A psychological scale measuring the degree of social closeness or acceptance an individual is willing to admit members of diverse ethnic, racial, or social groups",
    ["A physical measuring tape used to measure physical walking distances between houses", "A medical test evaluating neurological distance between motor neurons", "A financial accounting ledger tracking distances between commercial banks"],
    "D",
    "The Bogardus Social Distance Scale (1925) measures prejudice and social acceptance by asking respondents whether they would accept members of a particular group as: close kin by marriage, club members, street neighbors, fellow workers, citizens, or exclude them completely from the country.\nHence, Option {{CORR}} is correct.",
    "Defines the Emory Bogardus Social Distance Scale."
)
add_q(make_question(CHAPTER, "Prejudice and Discrimination", "What is the purpose of the 'Social Distance Scale' developed by Emory Bogardus in the study of prejudice?", opts, c, s, 78))

# Q79: Assertion-Reason: Role Schemas and Social Expectations
add_q(make_assertion_question(
    CHAPTER, "Social Cognition",
    "Role schemas allow individuals to navigate complex social environments rapidly without expending excessive cognitive effort.",
    "Role schemas provide organized, pre-existing mental expectations regarding how an occupant of a specific social status (such as a doctor or judge) ought to behave.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Schemas function as cognitive heuristics; role schemas package expected behaviors, responsibilities, and communicative patterns of specific societal roles, reducing cognitive load during social interactions.",
    "Connects role schemas to cognitive efficiency in social interaction."
))

# Q80: Structural Features of Attitudes and Resistance to Change
opts, c, s = rotate_options(
    "High centrality, extreme valence, and high cognitive multiplexity (complexity) make an attitude far more resistant to change",
    ["Attitudes that are completely neutral and formed yesterday are most resistant", "Attitudes with only one simple belief are completely impossible to change", "Attitudes held by toddlers are universally the most rigid and unchangeable"],
    "B",
    "Attitudes that occupy a central position in the self-concept, possess high extremeness (far from neutral), and are embedded in a complex, multiplex web of supportive cognitions are extraordinarily stable and resistant to persuasive counter-pressures.\nHence, Option {{CORR}} is correct.",
    "Identifies structural features that render attitudes resistant to persuasion."
)
add_q(make_question(CHAPTER, "Nature of Attitudes", "Which combination of structural features renders an attitude most resistant to persuasion and modification?", opts, c, s, 80))

print(f"Total Unit 6 questions generated: {len(unit6_qs)}")
assert len(unit6_qs) == 80, f"Expected 80 questions, got {len(unit6_qs)}"

os.makedirs("mock/psy_units", exist_ok=True)
with open("mock/psy_units/unit6.json", "w", encoding="utf-8") as f:
    json.dump(unit6_qs, f, indent=2, ensure_ascii=False)
print("Saved mock/psy_units/unit6.json successfully!")
