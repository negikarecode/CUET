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
unit1_seen = set()
unit1_qs = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in unit1_seen:
        raise ValueError(f"Duplicate in Unit 1: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in Unit 1: {q['questionText'][:80]}")
    unit1_seen.add(norm)
    assert len(q["options"]) == 4, f"Options length error: {q['questionText'][:40]}"
    assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option: {q['questionText'][:40]}"
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"], f"Missing solution: {q['questionText'][:40]}"
    unit1_qs.append(q)

CHAPTER = "Variations in Psychological Attributes"

# --- SECTION 1: ASSESSMENT & ATTRIBUTES (Q1 - Q15) ---

# Q1: Definition of Psychological Assessment
opts, c, s = rotate_options(
    "Psychological assessment uses systematic testing procedures to evaluate abilities, behaviours, and personal qualities of individuals",
    ["Assessment is an informal, subjective guess of a person's future fortune", "Assessment is strictly limited to measuring biological reflex speeds", "Assessment involves diagnosing physical viral diseases through interviews"],
    "A",
    "Psychological assessment refers to the systematic testing procedures used to evaluate an individual's abilities, behaviours, and personal characteristics across standardized norms.\nHence, Option {{CORR}} is correct.",
    "Correctly defines psychological assessment according to NCERT."
)
add_q(make_question(CHAPTER, "Assessment Methods", "Which of the following best defines the scientific nature of psychological assessment?", opts, c, s, 1))

# Q2: Formal vs Informal Assessment
opts, c, s = rotate_options(
    "Formal assessment is objective, standardized, and organized, whereas informal assessment varies from case to case and is open to subjective interpretations",
    ["Formal assessment is based on casual conversations, while informal assessment uses strict statistical manuals", "Formal assessment only applies to animals, while informal assessment applies to humans", "Formal assessment has no objective scoring, while informal assessment uses standardized tests"],
    "B",
    "Formal assessment is characterized by objectivity, standardization, and structured administration, whereas informal assessment is subjective and context-dependent.\nHence, Option {{CORR}} is correct.",
    "Distinguishes between formal and informal assessment accurately."
)
add_q(make_question(CHAPTER, "Assessment Methods", "What is the primary distinction between formal and informal psychological assessment?", opts, c, s, 2))

# Q3: Attributes assessed: Interest vs Aptitude
opts, c, s = rotate_options(
    "Aptitude indicates an individual's underlying capacity to acquire skills with training, while interest is a preference for specific activities",
    ["Aptitude is an individual's present achievement, while interest is their genetic IQ", "Aptitude refers to moral values, while interest refers to motor reflexes", "Aptitude is acquired solely after age 30, while interest is present at birth"],
    "C",
    "Aptitude refers to an individual's potential or capacity to acquire specific skills through training, whereas interest reflects a person's preferences or liking for engaging in particular activities.\nHence, Option {{CORR}} is correct.",
    "Accurately contrasts aptitude and interest."
)
add_q(make_question(CHAPTER, "Psychological Attributes", "In psychological appraisal, how are aptitude and interest fundamentally distinguished?", opts, c, s, 3))

# Q4: Psychological Test Definition
opts, c, s = rotate_options(
    "An objective and standardized measure of an individual's mental and/or behavioural characteristics",
    ["A subjective essay scored without any scoring key or norms", "A clinical surgical procedure examining brain tissue directly", "An arbitrary collection of riddles designed to test speed of handwriting"],
    "D",
    "A psychological test is defined by Anastasi and NCERT as an objective and standardized measure of an individual's mental or behavioural characteristics.\nHence, Option {{CORR}} is correct.",
    "Identifies the standard definition of a psychological test."
)
add_q(make_question(CHAPTER, "Assessment Methods", "A psychological test is formally defined as:", opts, c, s, 4))

# Q5: Case Study Method
opts, c, s = rotate_options(
    "An in-depth, comprehensive study of an individual in terms of psychological attributes and psychosocial history",
    ["A rapid statistical survey administered to thousands of anonymous respondents online", "A laboratory experiment manipulating independent variables under strict animal conditions", "A standardized pencil-and-paper group test evaluating arithmetic speed"],
    "A",
    "The case study method involves an intensive, in-depth investigation of an individual's psychological history, psychosocial context, and personal experiences.\nHence, Option {{CORR}} is correct.",
    "Correctly characterizes the case study method."
)
add_q(make_question(CHAPTER, "Assessment Methods", "Which feature accurately describes the psychological assessment method known as a case study?", opts, c, s, 5))

# Q6: Observation Method
opts, c, s = rotate_options(
    "Employing systematic, organized, and objective procedures to record natural behavioural occurrences in real-time",
    ["Asking subjects to imagine hypothetical scenarios while dreaming", "Relying on retroactive rumours and subjective gossip from neighbours", "Administering a multiple-choice personality questionnaire"],
    "B",
    "Observation involves employing systematic, planned, and objective procedures to record behavioural phenomena occurring naturally in real time.\nHence, Option {{CORR}} is correct.",
    "Identifies systematic objective recording as the hallmark of observation."
)
add_q(make_question(CHAPTER, "Assessment Methods", "The observational method of psychological assessment is characterized by:", opts, c, s, 6))

# Q7: Self-Report Method
opts, c, s = rotate_options(
    "The individual provides factual information, beliefs, opinions, or descriptions about themselves",
    ["The psychologist observes the person through a one-way mirror without their knowledge", "A brain scanner records neural electrical frequencies during sleep", "Peer ratings are collected anonymously from school classmates"],
    "C",
    "In a self-report method, an individual provides factual information or personal reflections regarding themselves, their beliefs, and their behavioural habits.\nHence, Option {{CORR}} is correct.",
    "Identifies self-report as information provided directly by the individual about themselves."
)
add_q(make_question(CHAPTER, "Assessment Methods", "In psychological assessment, a self-report measure relies primarily on which procedure?", opts, c, s, 7))

# Q8: Match Assessment Methods
add_q(make_match_question(
    CHAPTER, "Assessment Methods",
    "Match List I (Assessment Method) with List II (Core Operational Characteristic):",
    [("A", "Psychological Test"), ("B", "Interview"), ("C", "Case Study"), ("D", "Self-Report")],
    [("I", "In-depth study of an individual's psychosocial and developmental history"), ("II", "Objective and standardized measure of mental or behavioural attributes"), ("III", "Individual provides factual information and ratings about themselves"), ("IV", "One-to-one purposeful verbal interaction seeking specific information")],
    "A-II, B-IV, C-I, D-III", "A",
    "A psychological test is an objective standardized tool (A-II); Interview is purposeful verbal interaction (B-IV); Case study is in-depth individual history (C-I); Self-report is individual's self-description (D-III).",
    "Correctly links assessment methods with their operational definitions."
))

# Q9: Wechsler's definition of intelligence
opts, c, s = rotate_options(
    "The global and aggregate capacity of an individual to act purposefully, think rationally, and deal effectively with their environment",
    ["The ability to perform abstract mathematical manipulations within limited time", "The power of creative artistic expression through subconscious symbols", "The speed of physiological neural transmissions across cerebral synapses"],
    "A",
    "David Wechsler defined intelligence as 'the global and aggregate capacity of an individual to act purposefully, to think rationally, and to deal effectively with his/her environment.'\nHence, Option {{CORR}} is correct.",
    "Identifies David Wechsler's classic definition of intelligence."
)
add_q(make_question(CHAPTER, "Definitions of Intelligence", "Who defined intelligence as 'the global and aggregate capacity of an individual to act purposefully, to think rationally, and to deal effectively with his/her environment'?", opts, c, s, 9))

# Q10: Alfred Binet's definition of intelligence
opts, c, s = rotate_options(
    "The ability to judge well, understand well, and reason well",
    ["The capacity for sensory discrimination and reaction time", "The manifestation of eight independent modular intelligences", "The unconscious resolution of psychosexual developmental conflicts"],
    "B",
    "Alfred Binet was one of the earliest psychologists to define intelligence conceptually, describing it as the ability to judge well, understand well, and reason well.\nHence, Option {{CORR}} is correct.",
    "Correctly identifies Alfred Binet's definition of intelligence."
)
add_q(make_question(CHAPTER, "Definitions of Intelligence", "Alfred Binet conceptualized intelligence primarily as:", opts, c, s, 10))

# Q11: Psychometric vs Information Processing approaches
opts, c, s = rotate_options(
    "Psychometric approaches view intelligence as an aggregate of abilities expressed in a single index, whereas information-processing approaches describe the underlying cognitive processes involved in intellectual activity",
    ["Psychometric approaches only study infants, while information-processing approaches study elderly adults", "Psychometric approaches focus on unconscious desires, while information-processing approaches focus on genetics", "Psychometric approaches reject all quantitative scoring, while information-processing approaches use standardized tests only"],
    "C",
    "The psychometric approach considers intelligence as an aggregate of abilities and expresses performance in a single index (like IQ), while the information-processing approach focuses on how an individual acts and processes information.\nHence, Option {{CORR}} is correct.",
    "Contrasts psychometric and information-processing approaches to intelligence."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "How do psychometric and information-processing approaches to intelligence fundamentally differ?", opts, c, s, 11))

# Q12: Binet's Uni-Factor Theory
opts, c, s = rotate_options(
    "A single, general set of intellectual abilities used for solving all cognitive problems",
    ["Two opposing factors representing verbal ability and physical dexterity", "Seven distinct mental faculties functioning with complete independence", "A three-dimensional cube comprising operations, contents, and products"],
    "D",
    "Alfred Binet conceptualized a Uni-Factor (or One-Factor) Theory of intelligence, proposing that all individuals possess one similar general set of abilities that can be used for solving all problems in their environment.\nHence, Option {{CORR}} is correct.",
    "Identifies Binet's Uni-factor theory."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "Alfred Binet's theory of intelligence is known as the Uni-factor or One-factor theory because it conceptualized intelligence as:", opts, c, s, 12))

# Q13: Spearman Two-factor g and s
opts, c, s = rotate_options(
    "The 'g-factor' is a general mental energy common to all tasks, while 's-factors' are specific abilities unique to particular tasks",
    ["The 'g-factor' represents genetic traits, while 's-factors' represent social manners", "The 'g-factor' represents group conformity, while 's-factors' represent selfish impulses", "The 'g-factor' represents gender-specific abilities, while 's-factors' represent sensory thresholds"],
    "A",
    "Spearman's two-factor theory states that general mental energy ('g-factor') enters into all cognitive activities, while specific abilities ('s-factors') allow individuals to excel in specific domains like music, painting, or athletics.\nHence, Option {{CORR}} is correct.",
    "Accurately explains the g-factor and s-factor."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "In Charles Spearman's two-factor theory, how are the 'g-factor' and 's-factors' differentiated?", opts, c, s, 13))

# Q14: Statement on Thurstone Primary Mental Abilities
add_q(make_statement_question(
    CHAPTER, "Theories of Intelligence",
    "Louis Thurstone proposed that intelligence consists of seven primary mental abilities that are relatively independent of one another.",
    "Thurstone's seven primary mental abilities include Verbal Comprehension, Numerical Ability, Spatial Relations, and Inductive Reasoning.",
    1, "A",
    "Both statements are correct. Thurstone proposed the Theory of Primary Mental Abilities consisting of 7 distinct abilities: Verbal Comprehension, Numerical Ability, Spatial Relations, Perceptual Speed, Word Fluency, Memory, and Inductive Reasoning.",
    "Validates Thurstone's Primary Mental Abilities model."
))

# Q15: Thurstone 7 PMAs identification
opts, c, s = rotate_options(
    "Verbal Comprehension, Numerical Ability, Spatial Relations, Perceptual Speed, Word Fluency, Memory, and Inductive Reasoning",
    ["Analytical intelligence, Creative intelligence, Practical intelligence, Emotional intelligence, and Social intelligence", "Bodily-kinaesthetic, Musical, Spatial, Interpersonal, Intrapersonal, Naturalistic, and Existential", "Planning, Arousal, Simultaneous processing, Successive processing, and Sensory registration"],
    "B",
    "Thurstone's 7 Primary Mental Abilities (PMAs) are: (1) Verbal Comprehension, (2) Numerical Ability, (3) Spatial Relations, (4) Perceptual Speed, (5) Word Fluency, (6) Memory, and (7) Inductive Reasoning.\nHence, Option {{CORR}} is correct.",
    "Lists all seven of Thurstone's primary mental abilities correctly."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "Which of the following complete sets comprises Louis Thurstone's seven Primary Mental Abilities?", opts, c, s, 15))

# Q16: Arthur Jensen Hierarchical Model
opts, c, s = rotate_options(
    "Level I (associative learning) involves memory recall where output resembles input, while Level II (cognitive competence) involves higher-order transformation and problem-solving",
    ["Level I involves unconscious primal instincts, while Level II involves conscious linguistic speech", "Level I occurs during old age, while Level II occurs strictly during infancy", "Level I involves motor reflexes, while Level II involves emotional empathy"],
    "C",
    "Arthur Jensen proposed that intelligence operates at two levels: Level I (associative learning, where output is very similar to input, e.g., rote recall) and Level II (cognitive competence, involving transformation and manipulation of input to solve complex problems).\nHence, Option {{CORR}} is correct.",
    "Accurately explains Jensen's Level I and Level II abilities."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "According to Arthur Jensen's hierarchical model of intelligence, how are Level I and Level II abilities defined?", opts, c, s, 16))

# Q17: J.P. Guilford Structure-of-Intellect
opts, c, s = rotate_options(
    "Operations (what the respondent does), Contents (nature of information), and Products (form in which information is processed)",
    ["Inputs, Filters, and Retentive memories", "Sensory, Short-term, and Long-term cognitive stores", "Reflexive, Conscious, and Autonomous executive systems"],
    "D",
    "Guilford's Structure-of-Intellect model organizes intellectual traits across three dimensions: Operations (6), Contents (5), and Products (6), creating 180 cells in the revised model.\nHence, Option {{CORR}} is correct.",
    "Correctly identifies Guilford's three dimensions."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "J.P. Guilford's Structure-of-Intellect model classifies intellectual abilities across which three dimensions?", opts, c, s, 17))

# Q18: Guilford's total cells in revised model
opts, c, s = rotate_options(
    "180 cells (6 Operations × 5 Contents × 6 Products)",
    ["120 cells (4 Operations × 5 Contents × 6 Products)", "100 cells (10 Operations × 10 Contents)", "64 cells (8 Operations × 8 Products)"],
    "A",
    "In the revised Structure-of-Intellect model proposed by Guilford, there are 6 Operations, 5 Contents, and 6 Products, resulting in 6 × 5 × 6 = 180 distinct cells or intellectual abilities.\nHence, Option {{CORR}} is correct.",
    "Identifies 180 cells in Guilford's revised model."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "In the revised Structure-of-Intellect model developed by J.P. Guilford, how many distinct categories/cells of intellectual abilities are postulated?", opts, c, s, 18))

# Q19: Howard Gardner Multiple Intelligences count
opts, c, s = rotate_options(
    "Eight distinct types of intelligences that are independent of each other and operate as separate neuro-functional modules",
    ["A single general factor of intelligence that dominates all specific abilities", "Three interacting intelligence dimensions consisting of analytical, creative, and practical", "Two hierarchical tiers divided into associative learning and abstract thinking"],
    "B",
    "Howard Gardner's Theory of Multiple Intelligences proposes eight distinct and relatively autonomous types of intelligence, each linked to specific neural modules in the human brain.\nHence, Option {{CORR}} is correct.",
    "Identifies Gardner's 8 independent intelligences."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "Howard Gardner's Theory of Multiple Intelligences posits that intelligence is:", opts, c, s, 19))

# Q20: Match Gardner's Intelligences with Examples
add_q(make_match_question(
    CHAPTER, "Theories of Intelligence",
    "Match List I (Gardner's Intelligence Type) with List II (Exemplary Professional Group):",
    [("A", "Linguistic Intelligence"), ("B", "Spatial Intelligence"), ("C", "Interpersonal Intelligence"), ("D", "Naturalistic Intelligence")],
    [("I", "Architects, pilots, and sculptors"), ("II", "Botanists, zoologists, and farmers"), ("III", "Poets, writers, and orators"), ("IV", "Psychologists, counselors, and political leaders")],
    "A-III, B-I, C-IV, D-II", "A",
    "Linguistic: poets/writers (A-III); Spatial: architects/pilots (B-I); Interpersonal: psychologists/leaders (C-IV); Naturalistic: botanists/farmers (D-II).",
    "Accurately maps Gardner's intelligences to representative careers."
))

# Q21: Interpersonal vs Intrapersonal
opts, c, s = rotate_options(
    "Interpersonal intelligence is understanding others' motives and feelings, while intrapersonal intelligence is understanding one's own inner self and desires",
    ["Interpersonal intelligence is knowing foreign languages, while intrapersonal is knowing ancient scripts", "Interpersonal intelligence is mathematical speed, while intrapersonal is physical agility", "Interpersonal intelligence is playing musical instruments, while intrapersonal is painting landscapes"],
    "A",
    "Interpersonal intelligence is the ability to perceive and understand others' motives, feelings, and behaviours, whereas intrapersonal intelligence involves knowledge of one's own internal strengths, weaknesses, and emotional desires.\nHence, Option {{CORR}} is correct.",
    "Distinguishes interpersonal from intrapersonal intelligence."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "How did Howard Gardner distinguish between interpersonal intelligence and intrapersonal intelligence?", opts, c, s, 21))

# Q22: Naturalistic Intelligence definition
opts, c, s = rotate_options(
    "Awareness of and sensitivity to features of the natural world, flora, fauna, and environmental ecosystems",
    ["Ability to manipulate abstract algebraic formulas in laboratory physics", "Skill in playing brass and percussion musical instruments", "Capacity to communicate non-verbally through bodily gestures in theatre"],
    "B",
    "Naturalistic intelligence involves sensitivity to features of the natural environment, flora, fauna, and recognizing subtle nuances in ecological patterns (e.g. hunters, farmers, botanists).\nHence, Option {{CORR}} is correct.",
    "Defines naturalistic intelligence correctly."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "Which description characterizes 'naturalistic intelligence' in Howard Gardner's theory?", opts, c, s, 22))

# Q23: Robert Sternberg Triarchic Theory Components
opts, c, s = rotate_options(
    "Componential (analytical), Experiential (creative), and Contextual (practical)",
    ["Logical-mathematical, Bodily-kinaesthetic, and Musical", "Planning, Attention, and Simultaneous processing", "Associative memory, Divergent production, and Convergent evaluation"],
    "C",
    "Sternberg's Triarchic Theory conceptualizes three aspects of intelligence: Componential (analytical), Experiential (creative), and Contextual (practical intelligence).\nHence, Option {{CORR}} is correct.",
    "Identifies Sternberg's three types of intelligence."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "Robert Sternberg's Triarchic Theory views intelligence as comprising which three distinct aspects?", opts, c, s, 23))

# Q24: Componential Intelligence Subcomponents
opts, c, s = rotate_options(
    "Meta-components (executive control), Performance components (action execution), and Knowledge-acquisition components (learning new information)",
    ["Arousal, Simultaneous processing, and Successive processing", "Operations, Contents, and Products", "Sensory encoding, Short-term rehearsal, and Long-term retrieval"],
    "D",
    "Componential intelligence in Sternberg's model has three subcomponents: Meta-components (planning and executive decisions), Performance components (executing the task), and Knowledge-acquisition components (learning and acquiring new information).\nHence, Option {{CORR}} is correct.",
    "Identifies the three subcomponents of componential intelligence."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "In Sternberg's Triarchic Theory, componential or analytical intelligence consists of which three constituent components?", opts, c, s, 24))

# Q25: Contextual Intelligence ("Street Smartness")
opts, c, s = rotate_options(
    "Adapting to the environment, modifying or shaping the environment, or selecting a new environment to achieve personal and societal goals",
    ["Solving high-level calculus theorems under timed examination constraints", "Composing a multi-movement symphony using orchestral instruments", "Remembering long telephone directories through mnemonic rhymes"],
    "A",
    "Contextual intelligence (or practical intelligence / 'street smartness') involves adapting to present environments, selecting alternative environments, or shaping the environment to fit one's needs.\nHence, Option {{CORR}} is correct.",
    "Accurately defines contextual/practical intelligence."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "What does 'contextual intelligence' in Robert Sternberg's Triarchic Theory involve?", opts, c, s, 25))

# Q26: Experiential Intelligence
opts, c, s = rotate_options(
    "Integrating past experiences creatively to handle novel situations and making problem-solving processes automatic",
    ["Following routine repetitive instructions without making creative changes", "Recalling rote multiplication tables in elementary school classrooms", "Maintaining balanced dietary habits to prevent cardiovascular illnesses"],
    "B",
    "Experiential (or creative) intelligence involves using past experiences creatively to deal with novel tasks and developing automatization in solving recurring problems.\nHence, Option {{CORR}} is correct.",
    "Identifies experiential/creative intelligence."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "According to Robert Sternberg, an individual high on 'experiential intelligence' excels in:", opts, c, s, 26))

# Q27: PASS Model Components
opts, c, s = rotate_options(
    "Planning, Attention-Arousal, Simultaneous Processing, and Successive Processing",
    ["Perception, Assimilation, Storage, and Synthesis", "Psychometric testing, Aptitude assessment, Standardized scoring, and Skill development", "Performance, Action, Socialization, and Self-actualisation"],
    "C",
    "The PASS model stands for Planning, Attention-Arousal, Simultaneous processing, and Successive processing, developed by Das, Naglieri, and Kirby.\nHence, Option {{CORR}} is correct.",
    "Identifies the four processes in the PASS model."
)
add_q(make_question(CHAPTER, "Information Processing Theories", "What does the acronym PASS represent in the intelligence model developed by J.P. Das, Jack Naglieri, and J.R. Kirby?", opts, c, s, 27))

# Q28: PASS Model - Simultaneous vs Successive
opts, c, s = rotate_options(
    "Simultaneous processing integrates relations between stimuli into a unified pattern, whereas successive processing occurs when information is remembered in a serial, step-by-step order",
    ["Simultaneous processing occurs in childhood, while successive processing only occurs in old age", "Simultaneous processing is purely emotional, while successive processing is motor-based", "Simultaneous processing involves verbal grammar, while successive processing involves visual art"],
    "D",
    "Simultaneous processing integrates stimuli into a unified meaningful pattern (e.g. solving Raven's Progressive Matrices), while successive processing operates serially where recall of one item leads to recall of the next (e.g. reciting multiplication tables or alphabet).\nHence, Option {{CORR}} is correct.",
    "Accurately distinguishes simultaneous from successive processing."
)
add_q(make_question(CHAPTER, "Information Processing Theories", "In the PASS model of intelligence, how are simultaneous processing and successive processing distinguished?", opts, c, s, 28))

# Q29: Cognitive Assessment System (CAS)
opts, c, s = rotate_options(
    "A standardized test battery developed by J.P. Das and Jack Naglieri to assess the four PASS cognitive processes in children aged 5 to 18",
    ["A projective personality test utilizing ambiguous inkblots and thematic pictures", "A medical brain-imaging apparatus measuring cerebral oxygenation during stress", "A self-report questionnaire measuring moral and spiritual development in adults"],
    "A",
    "The Cognitive Assessment System (CAS) was developed by Das and Naglieri (1997) to measure the four cognitive processes of the PASS model in individuals aged 5 to 18.\nHence, Option {{CORR}} is correct.",
    "Identifies the Cognitive Assessment System (CAS)."
)
add_q(make_question(CHAPTER, "Information Processing Theories", "The Cognitive Assessment System (CAS) developed by J.P. Das and Jack Naglieri is designed to:", opts, c, s, 29))

# Q30: Assertion-Reason on Arousal and Attention in PASS
add_q(make_assertion_question(
    CHAPTER, "Information Processing Theories",
    "An optimal state of arousal is essential for attending to incoming sensory stimuli.",
    "Too much or too little arousal interferes with effective attention and cognitive focus.",
    1, "A",
    "Both Assertion (A) and Reason (R) are true, and (R) correctly explains (A). The arousal/attention system of the PASS model dictates that an optimal level of arousal enables an individual to focus attention on relevant stimuli, whereas excessive or insufficient arousal disrupts attentional focus.",
    "Validates the arousal-attention dynamic in the PASS model."
))

# Q31: Heredity vs Environment - Twin correlation values
opts, c, s = rotate_options(
    "r = 0.90 for identical twins reared together and r = 0.72 for identical twins reared apart",
    ["r = 0.50 for identical twins reared together and r = 0.10 for identical twins reared apart", "r = 0.70 for identical twins reared together and r = 0.90 for identical twins reared apart", "r = 1.00 for identical twins reared together and r = 0.20 for identical twins reared apart"],
    "B",
    "Extensive twin studies reveal a correlation of approximately 0.90 between intelligence scores of identical twins reared together and 0.72 between identical twins reared apart, demonstrating the powerful influence of both genetics and environment.\nHence, Option {{CORR}} is correct.",
    "Recalls the correlation figures for identical twins reared together vs apart."
)
add_q(make_question(CHAPTER, "Individual Differences in Intelligence", "What correlation coefficients are reported for the intelligence scores of identical twins reared together versus identical twins reared apart?", opts, c, s, 31))

# Q32: Fraternal twins correlation
opts, c, s = rotate_options(
    "Approximately 0.60 for fraternal twins reared together",
    ["Approximately 0.95 for fraternal twins reared together", "Approximately 0.10 for fraternal twins reared together", "Approximately 0.30 for fraternal twins reared together"],
    "C",
    "The intelligence correlation between fraternal twins reared together is approximately 0.60, which is lower than identical twins (0.90) but higher than unrelated children reared together.\nHence, Option {{CORR}} is correct.",
    "Recalls the correlation coefficient for fraternal twins reared together."
)
add_q(make_question(CHAPTER, "Individual Differences in Intelligence", "In behavioral genetics research, the correlation coefficient between the intelligence scores of fraternal twins reared together is approximately:", opts, c, s, 32))

# Q33: Siblings correlation reared together vs apart
opts, c, s = rotate_options(
    "r = 0.50 for siblings reared together and r = 0.25 for siblings reared apart",
    ["r = 0.80 for siblings reared together and r = 0.70 for siblings reared apart", "r = 0.30 for siblings reared together and r = 0.45 for siblings reared apart", "r = 0.10 for siblings reared together and r = 0.05 for siblings reared apart"],
    "D",
    "Research indicates that siblings reared together show an IQ correlation of about 0.50, while siblings reared apart show a correlation of approximately 0.25.\nHence, Option {{CORR}} is correct.",
    "Recalls correlation values for siblings reared together vs apart."
)
add_q(make_question(CHAPTER, "Individual Differences in Intelligence", "What are the observed intelligence correlation coefficients for biological siblings reared together compared to biological siblings reared apart?", opts, c, s, 33))

# Q34: Reaction Range Concept
opts, c, s = rotate_options(
    "Heredity sets upper and lower potential limits (range), while the environment determines where within that range the individual's actual IQ develops",
    ["Environment sets genetic chromosomes, while heredity provides school education", "Heredity completely determines exactly 100% of intelligence with zero environmental influence", "Environment eliminates all genetic differences, making all human beings genetically identical"],
    "A",
    "The concept of reaction range establishes that heredity provides a range of potential development, and the environmental opportunities and stimulation determine where an individual's phenotypic intelligence falls within that range.\nHence, Option {{CORR}} is correct.",
    "Correctly explains the concept of reaction range."
)
add_q(make_question(CHAPTER, "Individual Differences in Intelligence", "In the nature versus nurture debate on intelligence, what does the concept of 'reaction range' imply?", opts, c, s, 34))

# Q35: William Stern IQ Formula Calculation
opts, c, s = rotate_options(
    "IQ = 125, calculated as (10 / 8) × 100",
    ["IQ = 80, calculated as (8 / 10) × 100", "IQ = 100, calculated as 10 + 8 × 10", "IQ = 150, calculated as (10 × 8) / 100"],
    "A",
    "Using William Stern's formula: IQ = (Mental Age / Chronological Age) × 100. Here, MA = 10 and CA = 8, so IQ = (10 / 8) × 100 = 1.25 × 100 = 125.\nHence, Option {{CORR}} is correct.",
    "Calculates IQ correctly using the Stern formula."
)
add_q(make_question(CHAPTER, "Assessment of Intelligence", "If a child has a Chronological Age (CA) of 8 years and a Mental Age (MA) of 10 years, what is the child's Intelligence Quotient (IQ)?", opts, c, s, 35))

# Q36: IQ Calculation with MA < CA
opts, c, s = rotate_options(
    "IQ = 80, calculated as (12 / 15) × 100",
    ["IQ = 125, calculated as (15 / 12) × 100", "IQ = 90, calculated as 15 - 12 × 10", "IQ = 100, calculated as average of 15 and 12"],
    "B",
    "Using Stern's formula: IQ = (MA / CA) × 100. For MA = 12 and CA = 15: IQ = (12 / 15) × 100 = 0.80 × 100 = 80.\nHence, Option {{CORR}} is correct.",
    "Calculates IQ for MA less than CA."
)
add_q(make_question(CHAPTER, "Assessment of Intelligence", "A student aged 15 years performs on an intelligence test at the mental level of a 12-year-old. What is the student's IQ score?", opts, c, s, 36))

# Q37: Normal Distribution of IQ
opts, c, s = rotate_options(
    "A symmetrical bell-shaped curve with a mean of 100 and a standard deviation of 15",
    ["A positively skewed curve with a mean of 50 and standard deviation of 5", "A flat uniform rectangular distribution with equal probabilities across all scores", "A bimodal distribution with separate peaks for males and females"],
    "C",
    "IQ scores in the general population follow a normal distribution (bell-shaped curve) that is symmetrical around a mean of 100, with a standard deviation (SD) of 15.\nHence, Option {{CORR}} is correct.",
    "Identifies the parameters of the normal IQ curve (mean 100, SD 15)."
)
add_q(make_question(CHAPTER, "Assessment of Intelligence", "In standard psychometric assessment, the distribution of IQ scores in the general population conforms to:", opts, c, s, 37))

# Q38: Percentage of Population with Average IQ (90-110)
opts, c, s = rotate_options(
    "Approximately 50% of the population",
    ["Approximately 2.2% of the population", "Approximately 95% of the population", "Approximately 16% of the population"],
    "D",
    "According to the normal distribution of IQ scores, approximately 50% of people in the general population fall within the average IQ range of 90 to 109.\nHence, Option {{CORR}} is correct.",
    "Identifies that approximately 50% of the population falls in the average IQ bracket."
)
add_q(make_question(CHAPTER, "Assessment of Intelligence", "Approximately what percentage of the general population has an IQ score falling within the average range of 90 to 109?", opts, c, s, 38))

# Q39: Intellectual Disability IQ Cut-off
opts, c, s = rotate_options(
    "An IQ score below 70 with significant deficits in adaptive behaviour manifesting before age 18",
    ["An IQ score below 90 with mild difficulty in algebra", "An IQ score below 85 without any adaptive behavioural deficit", "An IQ score below 100 occurring after retirement at age 65"],
    "A",
    "Intellectual disability is diagnosed when an individual scores below 70 on a standardized intelligence test, exhibits significant deficits in adaptive behaviour (conceptual, social, practical), and the condition manifests before age 18.\nHence, Option {{CORR}} is correct.",
    "Identifies the IQ cutoff and criteria for intellectual disability."
)
add_q(make_question(CHAPTER, "Individual Differences in Intelligence", "Which criteria formally designate intellectual deficiency according to standard psychological classification systems?", opts, c, s, 39))

# Q40: Levels of Intellectual Disability Match
add_q(make_match_question(
    CHAPTER, "Individual Differences in Intelligence",
    "Match List I (Severity Level of Intellectual Disability) with List II (Standard IQ Score Range):",
    [("A", "Mild Intellectual Disability"), ("B", "Moderate Intellectual Disability"), ("C", "Severe Intellectual Disability"), ("D", "Profound Intellectual Disability")],
    [("I", "IQ 40 to 54"), ("II", "IQ below 25"), ("III", "IQ 55 to 69"), ("IV", "IQ 25 to 39")],
    "A-III, B-I, C-IV, D-II", "A",
    "Mild: IQ 55-69 (A-III); Moderate: IQ 40-54 (B-I); Severe: IQ 25-39 (C-IV); Profound: IQ below 25 (D-II).",
    "Accurately pairs severity levels with standard IQ ranges."
))

# Q41: Intellectual Giftedness definition
opts, c, s = rotate_options(
    "IQ of 130 and above, characterized by exceptional general ability, high creativity, and high task commitment",
    ["IQ of exactly 100 with excellent attendance in school sports", "IQ between 80 and 89 with high physical height and weight", "IQ below 70 with specialized mechanical rote memory"],
    "B",
    "Intellectual giftedness is typically defined by an IQ of 130 or higher and is characterized by Joseph Renzulli's triad: high general ability, high creativity, and high task commitment.\nHence, Option {{CORR}} is correct.",
    "Identifies the criteria for intellectual giftedness."
)
add_q(make_question(CHAPTER, "Individual Differences in Intelligence", "Which constellation of psychological traits characterizes intellectually gifted individuals?", opts, c, s, 41))

# Q42: Lewis Terman Gifted Study
opts, c, s = rotate_options(
    "A landmark longitudinal study following 1,500 children with IQs of 130 or higher throughout their lives",
    ["A short animal laboratory experiment on maze learning in rodents", "A clinical trial evaluating psychoactive medications in psychiatric wards", "A cross-sectional survey of retirement homes in South America"],
    "C",
    "In 1925, Lewis Terman initiated a famous longitudinal study tracking approximately 1,500 gifted children (with IQs 130+) into adulthood, demonstrating that gifted individuals were generally well-adjusted, healthy, and successful.\nHence, Option {{CORR}} is correct.",
    "Identifies Lewis Terman's longitudinal gifted study."
)
add_q(make_question(CHAPTER, "Individual Differences in Intelligence", "Lewis Terman's famous study of intellectually gifted individuals is renowned in psychology as:", opts, c, s, 42))

# Q43: Statement on Giftedness vs Talent
add_q(make_statement_question(
    CHAPTER, "Individual Differences in Intelligence",
    "Giftedness refers to exceptional general ability across a wide range of academic and cognitive activities.",
    "Talent is a narrower term referring to remarkable ability in a specific domain such as music, art, or athletics.",
    1, "A",
    "Both statements are correct. In psychological terminology, giftedness denotes exceptional general mental ability, whereas talent denotes outstanding ability in a specific sphere (e.g. musical prodigy, athletic skill).",
    "Distinguishes correctly between giftedness and talent."
))

# Q44: Types of Tests - Individual vs Group Tests
opts, c, s = rotate_options(
    "Individual tests are administered to one person at a time allowing clinical rapport and observation, whereas group tests are administered simultaneously to many people using standardized instructions",
    ["Individual tests are only given to babies, while group tests are only given to astronauts", "Individual tests have no correct answers, while group tests have only one question", "Individual tests cannot be scored, while group tests use open-ended discussions"],
    "B",
    "An individual test is administered by a trained examiner to one examinee at a time, facilitating observation of nuances and building rapport, while group tests can be administered to many people at once without individual examiner interaction.\nHence, Option {{CORR}} is correct.",
    "Contrasts individual and group tests accurately."
)
add_q(make_question(CHAPTER, "Types of Intelligence Tests", "How do individual intelligence tests differ from group intelligence tests?", opts, c, s, 44))

# Q45: Verbal vs Non-verbal vs Performance Tests
opts, c, s = rotate_options(
    "Verbal tests require written or spoken language responses; non-verbal tests use pictures or geometric symbols; performance tests require manipulating concrete physical objects",
    ["Verbal tests require drawing maps; non-verbal tests require singing; performance tests require sleeping", "Verbal tests are exclusively used for animals; non-verbal tests for computers; performance tests for plants", "All three tests are completely identical with no functional or operational difference"],
    "C",
    "Verbal tests require subjects to give verbal responses using language and can only be given to literates. Non-verbal tests use pictures or symbols to reduce language bias. Performance tests require active manipulation of materials (e.g. Kohs blocks).\nHence, Option {{CORR}} is correct.",
    "Accurately defines verbal, non-verbal, and performance intelligence tests."
)
add_q(make_question(CHAPTER, "Types of Intelligence Tests", "In intelligence testing, what distinguishes verbal, non-verbal, and performance tests?", opts, c, s, 45))

# Q46: Bhatia's Battery of Performance Tests Subtests
opts, c, s = rotate_options(
    "Kohs' Block Design, Alexander's Passalong, Pattern Drawing, Immediate Memory for Digits, and Picture Construction",
    ["Vocabulary, Arithmetic, Digit Symbol, Matrix Reasoning, and Block Design", "Picture Completion, Mazes, Comprehension, Object Assembly, and Coding", "Raven's Progressive Matrices, Seguin Form Board, Draw-A-Person, and Maze test"],
    "D",
    "C.M. Bhatia's Battery of Performance Tests of Intelligence consists of five subtests: (1) Kohs' Block Design Test, (2) Alexander's Passalong Test, (3) Pattern Drawing Test, (4) Immediate Memory Test for Digits, and (5) Picture Construction Test.\nHence, Option {{CORR}} is correct.",
    "Lists all five subtests of Bhatia's Battery of Performance Tests."
)
add_q(make_question(CHAPTER, "Types of Intelligence Tests", "Which of the following sets constitutes the five subtests of Bhatia's Battery of Performance Tests of Intelligence?", opts, c, s, 46))

# Q47: Culture-Fair vs Culture-Biased Tests
opts, c, s = rotate_options(
    "Culture-fair tests minimize cultural, educational, and linguistic bias so individuals from diverse backgrounds can be evaluated equitably",
    ["Culture-fair tests deliberately favor upper-class urban English speakers over rural citizens", "Culture-fair tests are written in ancient Latin to test historical knowledge", "Culture-fair tests test an individual's loyalty to a specific political ideology"],
    "A",
    "Culture-fair (or culture-free) tests are constructed with non-verbal or universal materials to minimize the influence of language, specific schooling, and cultural background (e.g. Raven's Progressive Matrices).\nHence, Option {{CORR}} is correct.",
    "Explains the principle of culture-fair intelligence tests."
)
add_q(make_question(CHAPTER, "Culture and Intelligence", "What is the primary objective behind constructing 'culture-fair' intelligence tests?", opts, c, s, 47))

# Q48: Raven's Progressive Matrices Test Type
opts, c, s = rotate_options(
    "A non-verbal, culture-fair test of abstract reasoning and general mental ability",
    ["A verbal vocabulary test measuring English literature comprehension", "A performance test requiring the manual assembly of mechanical car engines", "A clinical projective technique interpreting unconscious sexual impulses"],
    "B",
    "Raven's Progressive Matrices (RPM) is a renowned non-verbal, culture-fair test of abstract inductive reasoning consisting of geometric patterns where test-takers must select the missing piece.\nHence, Option {{CORR}} is correct.",
    "Classifies Raven's Progressive Matrices correctly."
)
add_q(make_question(CHAPTER, "Types of Intelligence Tests", "Raven's Progressive Matrices (RPM) is classified as which type of psychological test?", opts, c, s, 48))

# Q49: Western Technological Intelligence Characteristics
opts, c, s = rotate_options(
    "Emphasis on speed, cognitive analysis, abstraction, individual performance, and technological manipulation",
    ["Holistic harmony with nature, emotional suppression, and unconditional obedience", "Meditation, spiritual asceticism, and community farming without machines", "Astrological divination, herbal medicine, and oral storytelling"],
    "C",
    "Technological intelligence in Western societies focuses on cognitive speed, abstraction, individualistic achievement, analytical problem-solving, and efficient manipulation of physical environments.\nHence, Option {{CORR}} is correct.",
    "Identifies traits of Western technological intelligence."
)
add_q(make_question(CHAPTER, "Culture and Intelligence", "Which characteristics typify the Western conception of 'technological intelligence'?", opts, c, s, 49))

# Q50: Indian Concept of Buddhi (Integral Intelligence)
opts, c, s = rotate_options(
    "A holistic, integral perspective encompassing cognitive, social, emotional, and entrepreneurial competences",
    ["Strictly speed of solving mechanical mathematical equations without social context", "Total indifference to moral duties, family relationships, and social obligations", "An exclusive focus on financial greed and personal corporate dominance"],
    "D",
    "In the Indian tradition, intelligence (Buddhi) is viewed as integral intelligence, combining affective and motivational components with cognitive competence, emphasizing harmonious connection with society and nature.\nHence, Option {{CORR}} is correct.",
    "Defines the Indian concept of Buddhi as integral intelligence."
)
add_q(make_question(CHAPTER, "Culture and Intelligence", "In the Indian tradition, intelligence (Buddhi) is conceptualized as:", opts, c, s, 50))

print(f"Unit 1 halfway: {len(unit1_qs)} questions generated.")


# --- SECTION 2: BUDDHI, EMOTIONAL INTELLIGENCE, APTITUDE & CREATIVITY (Q51 - Q100) ---

# Q51: Facets of Buddhi in Indian tradition
opts, c, s = rotate_options(
    "Cognitive competence, Social competence, Emotional competence, and Entrepreneurial competence",
    ["Logical deduction, Spatial rotation, Musical pitch, and Bodily balance", "Analytical intelligence, Creative intelligence, and Practical intelligence", "Level I associative memory and Level II cognitive synthesis"],
    "A",
    "According to J.P. Das and the Indian tradition, Buddhi comprises four distinct competencies: Cognitive competence, Social competence, Emotional competence, and Entrepreneurial competence.\nHence, Option {{CORR}} is correct.",
    "Lists the four competencies of Buddhi in Indian tradition."
)
add_q(make_question(CHAPTER, "Culture and Intelligence", "In the Indian tradition, which four competencies constitute the multifaceted concept of Buddhi (intelligence)?", opts, c, s, 51))

# Q52: Match Facets of Buddhi
add_q(make_match_question(
    CHAPTER, "Culture and Intelligence",
    "Match List I (Competency of Buddhi) with List II (Descriptive Behavioral Indicator):",
    [("A", "Cognitive Competence"), ("B", "Social Competence"), ("C", "Emotional Competence"), ("D", "Entrepreneurial Competence")],
    [("I", "Commitment, persistence, patience, hard work, and goal-directed behaviours"), ("II", "Self-regulation, self-monitoring, honesty, politeness, and good conduct"), ("III", "Understanding, discrimination, problem-solving, and effective communication"), ("IV", "Respect for social order, commitment to elders, recognizing others' perspectives")],
    "A-III, B-IV, C-II, D-I", "A",
    "Cognitive: problem-solving/discrimination (A-III); Social: respect for social order/elders (B-IV); Emotional: self-regulation/honesty (C-II); Entrepreneurial: persistence/hard work (D-I).",
    "Correctly matches the competencies of Buddhi with their behavioral markers."
))

# Q53: Cognitive competence in Buddhi
opts, c, s = rotate_options(
    "Sensitivity to context, understanding, discrimination, rapid problem-solving, and effective communication",
    ["Rote mechanical calculation speed without comprehension", "Aggressive economic dominance over commercial competitors", "Strict social isolation from family elders and peers"],
    "A",
    "Cognitive competence in the context of Buddhi includes sensitivity to context, deep understanding, discrimination, effective communication, and intellectual problem-solving.\nHence, Option {{CORR}} is correct.",
    "Identifies cognitive competence in Buddhi."
)
add_q(make_question(CHAPTER, "Culture and Intelligence", "Under the Indian concept of Buddhi, what does 'cognitive competence' encompass?", opts, c, s, 53))

# Q54: Social competence in Buddhi
opts, c, s = rotate_options(
    "Respect for social order, commitment to elders, fulfilling family duties, and recognizing others' perspectives",
    ["Exploiting social relationships for selfish corporate promotion", "Avoiding all community gatherings to practice solitary meditation", "Conforming mindlessly to criminal gang pressures"],
    "B",
    "Social competence in Buddhi involves respect for social norms, obedience and respect toward elders, fulfilling familial responsibilities, and showing empathy toward others' viewpoints.\nHence, Option {{CORR}} is correct.",
    "Identifies social competence in Buddhi."
)
add_q(make_question(CHAPTER, "Culture and Intelligence", "Which qualities represent 'social competence' in the Indian conceptualization of Buddhi?", opts, c, s, 54))

# Q55: Emotional competence in Buddhi
opts, c, s = rotate_options(
    "Self-regulation, emotional self-monitoring, honesty, politeness, and maintaining good conduct",
    ["Uncontrolled emotional outbursts of anger in public forums", "Repressing all emotional feelings until physical illness develops", "Using emotional manipulation to deceive business clients"],
    "C",
    "Emotional competence in Buddhi involves emotional self-regulation, self-monitoring of feelings, honesty, politeness, and maintaining balanced personal conduct.\nHence, Option {{CORR}} is correct.",
    "Identifies emotional competence in Buddhi."
)
add_q(make_question(CHAPTER, "Culture and Intelligence", "In the Indian framework of integral intelligence, 'emotional competence' is evidenced by:", opts, c, s, 55))

# Q56: Entrepreneurial competence in Buddhi
opts, c, s = rotate_options(
    "Commitment, persistence, patience, hard work, and goal-directed conduct",
    ["Gambling financial savings on volatile speculative schemes", "Quitting difficult projects at the first sign of obstacle or frustration", "Delegating all personal duties to subordinates while remaining inactive"],
    "D",
    "Entrepreneurial competence in Buddhi refers to commitment, persistence, patience, sustained hard work, and goal-directed behavior when pursuing tasks.\nHence, Option {{CORR}} is correct.",
    "Identifies entrepreneurial competence in Buddhi."
)
add_q(make_question(CHAPTER, "Culture and Intelligence", "Entrepreneurial competence within the Indian model of Buddhi is manifested through:", opts, c, s, 56))

# Q57: Statement on Tribal vs Urban children study
add_q(make_statement_question(
    CHAPTER, "Culture and Intelligence",
    "Studies by J.P. Das on tribal children in Odisha revealed that children from hunting-gathering cultures develop distinct contextual competencies tailored to their ecological demands.",
    "Tribal children consistently score higher on Western culture-biased verbal intelligence tests than urban children.",
    3, "C",
    "Statement I is correct: Studies by J.P. Das demonstrated that tribal children possess specialized cognitive skills adapted to their environment. Statement II is incorrect: Tribal children often score lower on Western verbal tests because those tests rely on urban schooling and Western linguistic norms.",
    "Evaluates cross-cultural intelligence research on tribal children accurately."
))

# Q58: Ecological approach to intelligence (Berry's model)
opts, c, s = rotate_options(
    "Cultural and ecological contexts shape the development of specific cognitive skills valued by a society",
    ["Intelligence is strictly fixed at conception and cannot be modified by any environmental context", "All cultures worldwide develop identical cognitive abilities regardless of geography", "Ecological factors only determine human physical height and eye color, not cognitive processes"],
    "A",
    "John Berry's ecological approach emphasizes that culture and ecology provide a context for intelligence, shaping which specific skills (e.g. spatial skills in hunting societies) are cultivated and valued.\nHence, Option {{CORR}} is correct.",
    "Explains John Berry's ecological approach to intelligence."
)
add_q(make_question(CHAPTER, "Culture and Intelligence", "What is the core premise of John Berry's eco-cultural perspective on intellectual development?", opts, c, s, 58))

# Q59: Emotional Intelligence definition (Salovey and Mayer)
opts, c, s = rotate_options(
    "The ability to monitor one's own and others' emotions, to discriminate among them, and to use the information to guide one's thinking and actions",
    ["The ability to suppress all human feelings and behave like an unfeeling automaton", "The capacity to score above 140 on a timed non-verbal matrix reasoning test", "The skill of winning competitive political debates through emotional outbursts"],
    "A",
    "Peter Salovey and John Mayer (1990) defined emotional intelligence as 'the ability to monitor one's own and others' emotions, to discriminate among them, and to use the information to guide one's thinking and actions.'\nHence, Option {{CORR}} is correct.",
    "Identifies Salovey and Mayer's formal definition of emotional intelligence."
)
add_q(make_question(CHAPTER, "Emotional Intelligence", "How was Emotional Intelligence originally defined by Peter Salovey and John Mayer?", opts, c, s, 59))

# Q60: Popularization of Emotional Intelligence
opts, c, s = rotate_options(
    "Daniel Goleman in his 1995 book",
    ["Sigmund Freud in 1900", "Alfred Binet in 1905", "B.F. Skinner in 1953"],
    "B",
    "The concept of Emotional Intelligence was popularized worldwide by psychologist Daniel Goleman in 1995 through his bestselling book 'Emotional Intelligence: Why It Can Matter More Than IQ'.\nHence, Option {{CORR}} is correct.",
    "Attributes the popularization of emotional intelligence to Daniel Goleman in 1995."
)
add_q(make_question(CHAPTER, "Emotional Intelligence", "The concept of Emotional Intelligence was popularized globally by which psychologist in 1995?", opts, c, s, 60))

# Q61: Characteristics of Emotionally Intelligent Persons
opts, c, s = rotate_options(
    "Perceive and be sensitive to feelings, relate emotions to thoughts, understand emotion causes, and regulate personal and others' emotions",
    ["Impulsive expression of violent feelings without regard for social consequences", "Cynical manipulation of vulnerable people to gain financial advantages", "Total inability to recognize facial expressions of sadness or fear in close friends"],
    "C",
    "Emotionally intelligent individuals are sensitive to feelings in themselves and others, relate emotions to thinking, understand the causes and consequences of emotions, and regulate feelings effectively.\nHence, Option {{CORR}} is correct.",
    "Identifies hallmark traits of emotionally intelligent individuals."
)
add_q(make_question(CHAPTER, "Emotional Intelligence", "Which of the following characteristics is typically exhibited by an individual with high Emotional Intelligence (EQ)?", opts, c, s, 61))

# Q62: Assertion-Reason on EQ vs IQ in Life Success
add_q(make_assertion_question(
    CHAPTER, "Emotional Intelligence",
    "High IQ alone does not guarantee occupational success, interpersonal harmony, or life satisfaction.",
    "Emotional intelligence provides the foundational skills for managing stress, building teamwork, and resolving interpersonal conflicts effectively.",
    1, "A",
    "Both (A) and (R) are true, and (R) is the correct explanation of (A). Psychologists emphasize that academic IQ accounts for only a fraction of career success, whereas emotional intelligence (EQ) determines how well an individual manages stress, communicates, and navigates interpersonal challenges in real-world life.",
    "Validates the role of EQ alongside IQ in life success."
))

# Q63: Aptitude definition
opts, c, s = rotate_options(
    "A combination of characteristics that indicates an individual's capacity to acquire specific skills or knowledge with adequate training",
    ["The total amount of factual information a person has already memorized in school", "A temporary emotional state of excitement triggered by winning a prize", "An instinctive biological reflex shared by all mammalian species"],
    "A",
    "Aptitude is defined as a combination of characteristics indicative of an individual's capacity to acquire (with training) some specific knowledge, skill, or set of organized responses.\nHence, Option {{CORR}} is correct.",
    "Defines aptitude precisely according to NCERT."
)
add_q(make_question(CHAPTER, "Aptitude and Interest", "In psychological measurement, 'aptitude' is formally defined as:", opts, c, s, 63))

# Q64: Aptitude vs Achievement
opts, c, s = rotate_options(
    "Aptitude measures potentiality for future performance, whereas achievement measures past learning and current mastery of knowledge",
    ["Aptitude measures physical height, while achievement measures visual acuity", "Aptitude can only be assessed in retirement, while achievement is assessed in infancy", "There is zero distinction; aptitude and achievement are identical synonyms in psychology"],
    "B",
    "Aptitude tests assess an individual's potential or capacity to learn and perform in the future with training, whereas achievement tests measure what a person has already learned and mastered in the past.\nHence, Option {{CORR}} is correct.",
    "Distinguishes aptitude from achievement."
)
add_q(make_question(CHAPTER, "Aptitude and Interest", "What is the crucial psychometric difference between an aptitude test and an achievement test?", opts, c, s, 64))

# Q65: Interest vs Aptitude in Career Guidance
opts, c, s = rotate_options(
    "Both aptitude and interest must align, because having high interest without requisite aptitude leads to frustration and failure",
    ["Only interest matters, because passion automatically creates genetic neural abilities", "Only aptitude matters, because a person can excel happily in a career they thoroughly despise", "Neither matters; career success is purely determined by random astrological fate"],
    "C",
    "In career counseling, both aptitude and interest are vital; an individual who has interest but lacks aptitude will struggle to acquire the skills, leading to frustration, whereas having aptitude without interest leads to dissatisfaction.\nHence, Option {{CORR}} is correct.",
    "Explains the joint necessity of aptitude and interest in career guidance."
)
add_q(make_question(CHAPTER, "Aptitude and Interest", "In vocational and educational counseling, why is it essential to evaluate both aptitude and interest simultaneously?", opts, c, s, 65))

# Q66: Differential Aptitude Tests (DAT) Subtests count
opts, c, s = rotate_options(
    "Eight specialized subtests assessing distinct cognitive and occupational abilities",
    ["Two broad general tests measuring verbal IQ and performance IQ", "Twelve medical subtests assessing surgical precision and blood pressure", "Five projective tests using inkblots and sentence completion prompts"],
    "D",
    "The Differential Aptitude Tests (DAT) consists of eight independent subtests: Verbal Reasoning, Numerical Reasoning, Abstract Reasoning, Clerical Speed and Accuracy, Mechanical Reasoning, Space Relations, Spelling, and Language Usage.\nHence, Option {{CORR}} is correct.",
    "Identifies eight subtests in DAT."
)
add_q(make_question(CHAPTER, "Aptitude and Interest", "The widely utilized Differential Aptitude Tests (DAT) battery comprises how many distinct subtests?", opts, c, s, 66))

# Q67: Indian Adaptation of DAT
opts, c, s = rotate_options(
    "J.M. Ojha",
    ["C.M. Bhatia", "S.M. Mohsin", "Baqer Mehdi"],
    "A",
    "The Indian adaptation of the Differential Aptitude Tests (DAT) was developed and standardized by J.M. Ojha.\nHence, Option {{CORR}} is correct.",
    "Identifies J.M. Ojha as developer of the Indian adaptation of DAT."
)
add_q(make_question(CHAPTER, "Aptitude and Interest", "Who developed the standardized Indian adaptation of the Differential Aptitude Tests (DAT)?", opts, c, s, 67))

# Q68: Specialized vs Multiple Aptitude Batteries
opts, c, s = rotate_options(
    "Multiple aptitude batteries assess an array of varied abilities simultaneously, while specialized aptitude tests measure one specific skill like clerical or mechanical ability",
    ["Multiple aptitude batteries are only given to infants, while specialized tests are for elderly adults", "Multiple aptitude batteries test physical reflexes only, while specialized tests measure verbal vocabulary", "Multiple aptitude batteries have no scoring standards, while specialized tests use percentile norms"],
    "B",
    "Multiple aptitude batteries (such as DAT or GATB) evaluate a broad profile of diverse abilities simultaneously, whereas specialized aptitude tests assess single, specific capacities (e.g. musical aptitude, clerical aptitude, or mechanical comprehension).\nHence, Option {{CORR}} is correct.",
    "Contrasts multiple aptitude batteries with specialized aptitude tests."
)
add_q(make_question(CHAPTER, "Aptitude and Interest", "How do multiple aptitude test batteries differ from specialized aptitude tests?", opts, c, s, 68))

# Q69: General Aptitude Test Battery (GATB) Developer
opts, c, s = rotate_options(
    "The United States Employment Service (USES)",
    ["The World Health Organization (WHO)", "The British Royal Navy", "The Indian Council of Medical Research (ICMR)"],
    "C",
    "The General Aptitude Test Battery (GATB) was developed by the United States Employment Service (USES) to assist in vocational counseling and occupational placement.\nHence, Option {{CORR}} is correct.",
    "Identifies USES as developer of GATB."
)
add_q(make_question(CHAPTER, "Aptitude and Interest", "The General Aptitude Test Battery (GATB) was originally constructed by:", opts, c, s, 69))

# Q70: David's Battery of Differential Abilities (DBDA)
opts, c, s = rotate_options(
    "An Indian multi-aptitude battery developed to measure eight differential cognitive and motor abilities in adolescents and adults",
    ["A projective test evaluating repressed unconscious traumas in clinical psychiatric patients", "A clinical diagnostic inventory measuring schizophrenia and mood disorders", "An intelligence test exclusively designed for pre-school children under age four"],
    "D",
    "David's Battery of Differential Abilities (DBDA) is a popular multiple aptitude battery widely used in India for educational and vocational guidance of adolescents and young adults.\nHence, Option {{CORR}} is correct.",
    "Identifies David's Battery of Differential Abilities (DBDA)."
)
add_q(make_question(CHAPTER, "Aptitude and Interest", "What is David's Battery of Differential Abilities (DBDA) used for in psychological practice?", opts, c, s, 70))

# Q71: Convergent vs Divergent Thinking
opts, c, s = rotate_options(
    "Convergent thinking focuses on finding the single correct answer to a problem, whereas divergent thinking generates multiple, novel, and diverse solutions",
    ["Convergent thinking produces poetry, while divergent thinking solves algebra equations", "Convergent thinking occurs while asleep, while divergent thinking occurs during physical exercise", "Convergent thinking is emotional, while divergent thinking is instinctive"],
    "A",
    "Convergent thinking involves narrowing down possibilities to converge upon the single best or correct solution (typical of intelligence tests), whereas divergent thinking branches out in varied directions to produce novel, multiple ideas (hallmark of creativity).\nHence, Option {{CORR}} is correct.",
    "Distinguishes convergent from divergent thinking."
)
add_q(make_question(CHAPTER, "Creativity", "In cognitive psychology, what distinguishes 'convergent thinking' from 'divergent thinking'?", opts, c, s, 71))

# Q72: Creativity and Intelligence Relationship (Threshold Hypothesis)
opts, c, s = rotate_options(
    "A certain minimum level of intelligence is necessary for creativity, but beyond that threshold, high intelligence does not guarantee high creativity",
    ["Creativity and intelligence are completely identical with a perfect 1.00 correlation", "Highly creative individuals always have profound intellectual deficiency with IQ below 50", "Intelligence actively destroys creativity; therefore high IQ individuals can never be creative"],
    "B",
    "Psychological research (including the threshold hypothesis) demonstrates that a baseline level of intelligence is necessary for creative achievement, but beyond that threshold, higher IQ scores do not correlate strongly with increased creativity.\nHence, Option {{CORR}} is correct.",
    "Explains the threshold hypothesis linking intelligence and creativity."
)
add_q(make_question(CHAPTER, "Creativity", "What does psychological research suggest regarding the relationship between intelligence and creativity?", opts, c, s, 72))

# Q73: Terman's findings on IQ and Creativity
opts, c, s = rotate_options(
    "Persons with high IQ were not necessarily creative geniuses, demonstrating that high intelligence does not automatically produce high creativity",
    ["All children with IQ above 130 became world-renowned artistic poets and novelists", "Children with low IQ below 70 were consistently more creative than gifted children", "There was a negative correlation where higher IQ caused complete destruction of imagination"],
    "C",
    "Lewis Terman found in his longitudinal study of gifted children that although gifted children were academically accomplished, not all individuals with exceptionally high IQ scores displayed remarkable creative innovation.\nHence, Option {{CORR}} is correct.",
    "Summarizes Lewis Terman's findings on the relationship between IQ and creativity."
)
add_q(make_question(CHAPTER, "Creativity", "Lewis Terman's classic longitudinal study of gifted individuals found that:", opts, c, s, 73))

# Q74: Torrance Tests of Creative Thinking (TTCT)
opts, c, s = rotate_options(
    "E. Paul Torrance",
    ["Alfred Binet", "Raymond Cattell", "Arthur Jensen"],
    "D",
    "The Torrance Tests of Creative Thinking (TTCT), assessing fluency, flexibility, originality, and elaboration in verbal and figural modes, were developed by E. Paul Torrance.\nHence, Option {{CORR}} is correct.",
    "Attributes the Torrance Tests of Creative Thinking to E. Paul Torrance."
)
add_q(make_question(CHAPTER, "Creativity", "The Torrance Tests of Creative Thinking (TTCT), measuring verbal and figural creativity, were developed by:", opts, c, s, 74))

# Q75: Dimensions of Creative Thinking in Tests
opts, c, s = rotate_options(
    "Fluency (number of ideas), Flexibility (variety of categories), Originality (uniqueness), and Elaboration (detail)",
    ["Speed of reading, Grammatical precision, Spelling accuracy, and Vocabulary breadth", "Physical stamina, Muscular strength, Reaction speed, and Pulse stability", "Sensory threshold, Visual acuity, Auditory pitch discrimination, and Olfactory sensitivity"],
    "A",
    "Standard creativity assessments (such as Torrance's tests) evaluate divergent thinking across four core dimensions: Fluency (quantity of ideas), Flexibility (shifts across categories), Originality (novelty/uniqueness), and Elaboration (detailed development of ideas).\nHence, Option {{CORR}} is correct.",
    "Identifies the four core dimensions of creativity: fluency, flexibility, originality, elaboration."
)
add_q(make_question(CHAPTER, "Creativity", "Which four dimensions are routinely scored on standardized tests of divergent creative thinking?", opts, c, s, 75))

# Q76: Indian Creativity Tests
opts, c, s = rotate_options(
    "Baqer Mehdi's Test of Creative Thinking and B.K. Passi's Tests of Creativity",
    ["Bhatia's Battery of Performance Tests and Mohsin's General Intelligence Test", "David's Battery of Differential Abilities and Ojha's DAT Adaptation", "Rorschach Inkblot Test and Murray's Thematic Apperception Test"],
    "B",
    "Prominent standardized tests of creativity developed in India include Baqer Mehdi's Test of Creative Thinking (verbal and non-verbal) and B.K. Passi's Tests of Creativity.\nHence, Option {{CORR}} is correct.",
    "Identifies Baqer Mehdi and B.K. Passi as creators of Indian creativity tests."
)
add_q(make_question(CHAPTER, "Creativity", "Which of the following are recognized standardized tests of creativity developed in India?", opts, c, s, 76))

# Q77: Open-ended nature of Creativity Tests
opts, c, s = rotate_options(
    "Creativity tests have open-ended tasks with no single correct answer, whereas intelligence tests typically have one convergent correct answer",
    ["Creativity tests only use True/False questions, while intelligence tests use essays", "Creativity tests can only be taken by licensed painters, while intelligence tests are for scientists", "Creativity tests have zero reliability and can never be standardized"],
    "C",
    "Creativity tests are open-ended, permitting subjects to generate multiple diverse responses, whereas conventional intelligence tests are convergent, assessing whether an examinee can arrive at the predetermined single correct solution.\nHence, Option {{CORR}} is correct.",
    "Distinguishes open-ended creativity tests from convergent intelligence tests."
)
add_q(make_question(CHAPTER, "Creativity", "How do items on a standardized creativity test fundamentally differ from items on a traditional intelligence test?", opts, c, s, 77))

# Q78: Statement question on Spearman and Thurstone
add_q(make_statement_question(
    CHAPTER, "Theories of Intelligence",
    "Charles Spearman used factor analysis to propose that intelligence consists of a general 'g-factor' and specific 's-factors'.",
    "Louis Thurstone argued against a single general factor and asserted that intelligence is comprised of seven independent primary mental abilities.",
    1, "A",
    "Both statements are correct. Spearman identified the general factor ('g') and specific factors ('s') using factor analysis, whereas Thurstone disputed the primacy of 'g' and identified seven distinct primary mental abilities.",
    "Accurately captures the theoretical debate between Spearman and Thurstone."
))

# Q79: PASS Model Planning Process
opts, c, s = rotate_options(
    "Formulating goals, selecting strategies, monitoring execution, and evaluating task performance",
    ["Registering raw visual and auditory sensory signals at retinal photoreceptors", "Remembering telephone numbers in exact backwards chronological order", "Experiencing intense biological autonomic arousal during fight-or-flight states"],
    "A",
    "In the PASS model, Planning is the executive cognitive function that allows individuals to formulate goals, select and implement strategies, monitor ongoing performance, and evaluate outcomes.\nHence, Option {{CORR}} is correct.",
    "Defines the planning process in the PASS model."
)
add_q(make_question(CHAPTER, "Information Processing Theories", "Within the PASS model of cognitive processing, what function does the 'Planning' component perform?", opts, c, s, 79))

# Q80: Binet-Simon Scale First Revision Year
opts, c, s = rotate_options(
    "1908, when the concept of Mental Age (MA) was formally introduced",
    ["1905, when intelligence quotient was first calculated", "1916, when David Wechsler introduced performance subscales", "1939, when Cattell introduced fluid intelligence"],
    "B",
    "The first formal revision of the Binet-Simon scale occurred in 1908, during which the crucial psychological concept of Mental Age (MA) was introduced.\nHence, Option {{CORR}} is correct.",
    "Identifies 1908 as the year Binet and Simon introduced Mental Age."
)
add_q(make_question(CHAPTER, "Assessment of Intelligence", "In which year did Alfred Binet and Theodore Simon revise their original scale to introduce the concept of Mental Age (MA)?", opts, c, s, 80))

# Q81: Stanford-Binet Adaptation
opts, c, s = rotate_options(
    "Lewis Terman at Stanford University in 1916",
    ["Charles Spearman at Oxford University in 1904", "William Stern at Hamburg University in 1912", "David Wechsler at Bellevue Hospital in 1939"],
    "C",
    "In 1916, American psychologist Lewis Terman adapted the Binet-Simon scale for American populations at Stanford University, creating the famous Stanford-Binet Intelligence Scale.\nHence, Option {{CORR}} is correct.",
    "Attributes the Stanford-Binet intelligence scale to Lewis Terman in 1916."
)
add_q(make_question(CHAPTER, "Assessment of Intelligence", "Who developed the landmark Stanford-Binet Intelligence Scale in 1916 by adapting the French Binet-Simon scale?", opts, c, s, 81))

# Q82: Wechsler Intelligence Scales (WAIS and WISC)
opts, c, s = rotate_options(
    "David Wechsler, who developed separate verbal and performance subscales to eliminate excessive verbal dependence",
    ["Alfred Binet, who developed separate infant and geriatric tests", "Howard Gardner, who developed an 8-scale modular test", "J.P. Guilford, who constructed a 180-cell diagnostic matrix"],
    "D",
    "David Wechsler developed the Wechsler Adult Intelligence Scale (WAIS) and Wechsler Intelligence Scale for Children (WISC), pioneering the inclusion of performance subscales alongside verbal subscales to assess intelligence more holistically.\nHence, Option {{CORR}} is correct.",
    "Identifies David Wechsler's contribution to intelligence testing."
)
add_q(make_question(CHAPTER, "Assessment of Intelligence", "The Wechsler Adult Intelligence Scale (WAIS) was designed by David Wechsler primarily to:", opts, c, s, 82))

# Q83: Multi-statement question on Misuses of Intelligence Tests
add_q(make_multi_statement_question(
    CHAPTER, "Misuses of Intelligence Tests",
    "Which of the following represent recognized misuses or hazards associated with intelligence testing?",
    [
        ("A", "Poor performance on an intelligence test may attach a permanent stigmatizing label to a child, damaging self-esteem"),
        ("B", "Tests may create self-fulfilling prophecies where teachers form biased low expectations of labelled students"),
        ("C", "Culture-biased tests can discriminate unfairly against racial, cultural, or linguistic minority groups"),
        ("D", "Intelligence tests predict 100% of an individual's lifetime career happiness, creative genius, and marital stability with zero error")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements (A), (B), and (C) accurately describe ethical cautions and misuses of intelligence testing documented in NCERT. Statement (D) is false; intelligence tests only predict academic achievement moderately and cannot guarantee career happiness or creativity.",
    "Identifies valid ethical cautions and misuses of intelligence testing."
))

# Q84: Practical Intelligence and Street Smarts
opts, c, s = rotate_options(
    "Robert Sternberg's contextual dimension of intelligence",
    ["Howard Gardner's intrapersonal intelligence", "Charles Spearman's specific s-factor for geometry", "Arthur Jensen's Level I associative rote memory"],
    "A",
    "In Sternberg's Triarchic Theory, practical intelligence (or 'street smarts') corresponds to the contextual subtheory, where people adapt to, shape, or select real-world environments to succeed.\nHence, Option {{CORR}} is correct.",
    "Links practical intelligence / street smarts to Sternberg's contextual dimension."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "The popular notion of 'street smartness' or everyday practical problem-solving directly corresponds to which component in Robert Sternberg's Triarchic Theory?", opts, c, s, 84))

# Q85: Spatial Intelligence careers
opts, c, s = rotate_options(
    "Architects, interior decorators, surgeons, pilots, and sailors",
    ["Poets, novelists, journalists, and radio announcers", "Politicians, religious leaders, and trade union organizers", "Bank accountants, cashiers, and statistical auditors"],
    "B",
    "Spatial intelligence, involving the capacity to form visual mental images and navigate space, is critical for architects, pilots, sailors, surgeons, and painters.\nHence, Option {{CORR}} is correct.",
    "Identifies professions reliant on spatial intelligence."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "Which group of professions requires exceptionally high spatial intelligence according to Howard Gardner?", opts, c, s, 85))

# Q86: Interpersonal Intelligence in Politics and Counseling
opts, c, s = rotate_options(
    "High sensitivity to subtle shifts in facial expressions, vocal tone, body language, and motivating intentions of other people",
    ["Extraordinary athletic stamina during long-distance marathon racing", "Ability to quickly perform complex mental multi-digit division without paper", "Understanding botanical taxonomy of rare tropical rain forest plants"],
    "C",
    "Interpersonal intelligence enables psychologists, counselors, and political leaders to read subtle non-verbal cues, empathize with others' feelings, and influence interpersonal dynamics constructively.\nHence, Option {{CORR}} is correct.",
    "Explains interpersonal intelligence features."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "Why is high interpersonal intelligence crucial for successful psychologists, counselors, and political leaders?", opts, c, s, 86))

# Q87: Intrapersonal Intelligence characteristics
opts, c, s = rotate_options(
    "Deep awareness of one's own internal emotional desires, motives, identity boundaries, strengths, and vulnerabilities",
    ["Talent for composing symphony concertos on grand piano instruments", "Skill in designing multi-story bridges and suspension railway tracks", "Ability to negotiate multi-million dollar corporate contracts with strangers"],
    "D",
    "Intrapersonal intelligence is the ability to understand one's own internal feelings, motivations, identity, limitations, and desires, characteristic of philosophers, thinkers, and spiritual seekers.\nHence, Option {{CORR}} is correct.",
    "Defines intrapersonal intelligence."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "An individual possessing high intrapersonal intelligence is exceptionally skilled at:", opts, c, s, 87))

# Q88: PASS Model Neurological Basis
opts, c, s = rotate_options(
    "Unit 1 (Brainstem/Reticular system) for Arousal; Unit 2 (Posterior cortical lobes) for Simultaneous/Successive; Unit 3 (Frontal lobes) for Planning",
    ["Unit 1 for motor reflexes; Unit 2 for visual dreaming; Unit 3 for emotional digestion", "Unit 1 for linguistic grammar; Unit 2 for musical pitch; Unit 3 for sensory smell", "Unit 1 for spinal reflexes; Unit 2 for heart rate; Unit 3 for muscle coordination"],
    "A",
    "In Luria's neurofunctional mapping utilized by the PASS model: Unit 1 (Brainstem and reticular activating system) is responsible for arousal and attention; Unit 2 (Occipital, temporal, parietal lobes) handles simultaneous and successive processing; Unit 3 (Frontal and prefrontal lobes) executes planning and metacognition.\nHence, Option {{CORR}} is correct.",
    "Correctly links PASS components to Luria's three neurofunctional brain units."
)
add_q(make_question(CHAPTER, "Information Processing Theories", "How does the PASS model map its cognitive processes onto A.R. Luria's three functional brain units?", opts, c, s, 88))

# Q89: Chronological order of Intelligence Theories
add_q(make_sequence_question(
    CHAPTER, "Theories of Intelligence",
    "Arrange the following theories of intelligence in chronological order of their original formulation:",
    [
        ("A", "Spearman's Two-Factor Theory"),
        ("B", "Thurstone's Theory of Primary Mental Abilities"),
        ("C", "Sternberg's Triarchic Theory of Intelligence"),
        ("D", "Das, Naglieri, and Kirby's PASS Model")
    ],
    "A, B, C, D", "A",
    "1. Spearman formulated the Two-Factor Theory in 1904 (A).\n2. Thurstone formulated Primary Mental Abilities in 1938 (B).\n3. Sternberg formulated Triarchic Theory in 1985 (C).\n4. Das, Naglieri, and Kirby published the PASS Model in 1994 (D).",
    "Arranges the major intelligence theories in correct chronological order."
))

# Q90: Guilford Operations dimension
opts, c, s = rotate_options(
    "Cognition, Memory recording, Memory retention, Divergent production, Convergent production, and Evaluation",
    ["Visual, Auditory, Symbolic, Semantic, and Behavioural", "Units, Classes, Relations, Systems, Transformations, and Implications", "Verbal reasoning, Numerical reasoning, Space relations, and Mechanical analysis"],
    "B",
    "In Guilford's Structure-of-Intellect model, the 6 Operations are: Cognition, Memory recording, Memory retention, Divergent production, Convergent production, and Evaluation.\nHence, Option {{CORR}} is correct.",
    "Lists the 6 operations of Guilford's Structure-of-Intellect model."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "Which set represents the six 'Operations' in J.P. Guilford's revised Structure-of-Intellect model?", opts, c, s, 90))

# Q91: Guilford Contents dimension
opts, c, s = rotate_options(
    "Visual, Auditory, Symbolic, Semantic, and Behavioural",
    ["Cognition, Memory, Divergent production, Convergent production, and Evaluation", "Units, Classes, Relations, Systems, and Transformations", "Aptitude, Interest, Intelligence, Creativity, and Personality"],
    "C",
    "In Guilford's model, the 5 Contents (nature of information) are: Visual, Auditory, Symbolic, Semantic, and Behavioural.\nHence, Option {{CORR}} is correct.",
    "Lists the 5 contents in Guilford's model."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "In J.P. Guilford's Structure-of-Intellect model, the five categories of 'Contents' are:", opts, c, s, 91))

# Q92: Guilford Products dimension
opts, c, s = rotate_options(
    "Units, Classes, Relations, Systems, Transformations, and Implications",
    ["Visual, Auditory, Symbolic, Semantic, and Sensory", "Operations, Contents, Products, Inputs, Outputs, and Feedbacks", "Planning, Arousal, Attention, Simultaneous, Successive, and Execution"],
    "D",
    "In Guilford's model, the 6 Products (form in which information is processed) are: Units, Classes, Relations, Systems, Transformations, and Implications.\nHence, Option {{CORR}} is correct.",
    "Lists the 6 products in Guilford's model."
)
add_q(make_question(CHAPTER, "Theories of Intelligence", "Which of the following sets constitutes the six 'Products' in J.P. Guilford's Structure-of-Intellect model?", opts, c, s, 92))

# Q93: S.M. Mohsin contribution
opts, c, s = rotate_options(
    "Pioneered Hindi intelligence testing by constructing the Bihar Test of Intelligence",
    ["Constructed the world's first projective inkblot personality cards", "Invented the mathematical formula for calculating Intelligence Quotient", "Formulated the eight-factor theory of multiple intelligences"],
    "A",
    "S.M. Mohsin made a landmark contribution to Indian psychological testing by constructing the famous Bihar Test of Intelligence in Hindi in the 1950s.\nHence, Option {{CORR}} is correct.",
    "Identifies S.M. Mohsin's pioneer work on the Bihar Test of Intelligence in Hindi."
)
add_q(make_question(CHAPTER, "Assessment of Intelligence", "S.M. Mohsin is renowned in Indian psychological measurement for developing:", opts, c, s, 93))

# Q94: Performance Test definition example
opts, c, s = rotate_options(
    "Kohs' Block Design Test, where the examinee arranges colored wooden blocks to replicate printed patterns",
    ["Vocabulary definition test requiring oral explanations of dictionary words", "General knowledge quiz testing recall of world history dates", "Spelling dictation test where words are spoken aloud by the examiner"],
    "A",
    "Kohs' Block Design Test is an archetypal performance test where subjects physically manipulate concrete wooden blocks to reproduce geometric patterns shown on printed cards.\nHence, Option {{CORR}} is correct.",
    "Identifies Kohs' Block Design Test as a performance test."
)
add_q(make_question(CHAPTER, "Types of Intelligence Tests", "Which of the following is a classic example of a performance test of intelligence?", opts, c, s, 94))

# Q95: Alexander Passalong Test
opts, c, s = rotate_options(
    "A performance test where examinees slide small colored blocks across a wooden tray to match target designs without lifting them",
    ["A verbal test where examinees tell creative stories about ambiguous photographs", "A written essay test assessing political philosophy arguments", "A non-verbal test requiring participants to identify musical rhythms"],
    "B",
    "The Alexander Passalong Test is a well-known performance test included in Bhatia's Battery where subjects slide colored wooden blocks inside a tray to achieve a model pattern without lifting any block.\nHence, Option {{CORR}} is correct.",
    "Describes the operational task in the Alexander Passalong Test."
)
add_q(make_question(CHAPTER, "Types of Intelligence Tests", "In Alexander's Passalong Test (included in Bhatia's Battery), what task is the examinee required to perform?", opts, c, s, 95))

# Q96: Immediate Memory for Digits in Bhatia's Battery
opts, c, s = rotate_options(
    "Digit span forward and digit span reverse, measuring short-term auditory sequential memory span",
    ["Calculating complex geometric square roots in under ten seconds", "Recognizing faces of famous historical political leaders from black-and-white photos", "Recalling personal childhood autobiographical memories from early infancy"],
    "C",
    "The Immediate Memory Test for Digits in Bhatia's Battery assesses short-term auditory memory span by requiring the examinee to repeat series of spoken digits forwards and backwards.\nHence, Option {{CORR}} is correct.",
    "Explains the digit memory subtest in Bhatia's Battery."
)
add_q(make_question(CHAPTER, "Types of Intelligence Tests", "The 'Immediate Memory for Digits' subtest in Bhatia's Intelligence Battery assesses:", opts, c, s, 96))

# Q97: Statement on Bhatia's Battery Norms
add_q(make_statement_question(
    CHAPTER, "Types of Intelligence Tests",
    "Bhatia's Battery of Performance Tests was standardized on both literate and illiterate Indian populations.",
    "Bhatia's Battery cannot be administered to individuals who do not know the English language.",
    3, "C",
    "Statement I is correct: A major advantage of Bhatia's Battery is that it was standardized for both literate and illiterate individuals in India. Statement II is incorrect: As a performance test, it does not require knowledge of English and can be administered with minimal verbal instruction.",
    "Evaluates the applicability of Bhatia's Battery to diverse Indian populations."
))

# Q98: Normal Probability Curve standard deviations
opts, c, s = rotate_options(
    "Approximately 68.26% of cases fall between ±1 standard deviation (IQ 85 to 115), and 95.44% fall between ±2 standard deviations (IQ 70 to 130)",
    ["100% of cases fall between IQ 99 and 101 with zero dispersion", "50% of cases fall above IQ 130 and 50% fall below IQ 70", "Only 10% of cases fall within two standard deviations of the mean"],
    "A",
    "In a normal bell curve with mean = 100 and SD = 15: approximately 68% of the population falls between IQ 85 and 115 (±1 SD), and approximately 95% falls between IQ 70 and 130 (±2 SD).\nHence, Option {{CORR}} is correct.",
    "Recalls standard deviation percentages under the normal curve for IQ."
)
add_q(make_question(CHAPTER, "Assessment of Intelligence", "In the normal probability distribution of IQ scores (mean = 100, SD = 15), what percentage of cases falls within ±1 and ±2 standard deviations respectively?", opts, c, s, 98))

# Q99: Exceptional General Ability vs Specific Domain Genius
opts, c, s = rotate_options(
    "Giftedness involves superior general intellectual potential across domains, whereas prodigies demonstrate extraordinary genius in one isolated domain like chess or mathematics",
    ["Giftedness is inherited only through maternal chromosomes, while prodigies acquire skill through diet", "Giftedness appears only after retirement, while prodigies lose all skill by age seven", "Giftedness and domain prodigies are medically identical terms with zero distinction"],
    "B",
    "Giftedness denotes high general mental ability across diverse tasks, whereas child prodigies exhibit astonishing, adult-level mastery within a single specific domain (e.g. musical composition, chess) without necessarily possessing universal giftedness.\nHence, Option {{CORR}} is correct.",
    "Contrasts general giftedness with domain-specific prodigies."
)
add_q(make_question(CHAPTER, "Individual Differences in Intelligence", "In developmental psychology, how is general intellectual giftedness distinguished from a domain-specific child prodigy?", opts, c, s, 99))

# Q100: Comprehensive assessment in Psychology
opts, c, s = rotate_options(
    "Using a multi-method, multi-trait assessment strategy combining standardized tests, interviews, and observations to avoid single-measure bias",
    ["Relying exclusively on a 5-minute casual astrological palm reading", "Judging an individual's total lifelong intellect solely from their shoe size and handwriting slant", "Administering a single True/False question and drawing absolute clinical conclusions"],
    "A",
    "Psychologists emphasize a multi-trait, multi-method assessment approach combining standardized psychometric tests, structured interviews, observational data, and case records to ensure fair, comprehensive, and unbiased evaluations.\nHence, Option {{CORR}} is correct.",
    "Affirms the necessity of a multi-method approach in psychological assessment."
)
add_q(make_question(CHAPTER, "Assessment Methods", "What is considered the gold standard approach for conducting ethical and accurate psychological assessments of individuals?", opts, c, s, 100))

# Validate and dump
assert len(unit1_qs) == 100, f"Expected 100 questions for Unit 1, got {len(unit1_qs)}"
os.makedirs("mock/psy_units", exist_ok=True)
out_path = "mock/psy_units/unit1.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(unit1_qs, f, indent=2, ensure_ascii=False)

print(f"Successfully generated and saved all 100 questions for Unit 1 to {out_path}!")

