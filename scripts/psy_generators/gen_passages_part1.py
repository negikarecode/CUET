import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.psy_generators.common import (
    make_question, rotate_options, normalize_text, get_pyq_normalized_set
)

pyq_seen = get_pyq_normalized_set()
passages_seen = set()
part1_qs = []

def add_pq(passage_title, passage_text, q_stem, corr_text, wrong_texts, target_opt, explanation, chapter, topic):
    full_q_text = f"Read the following case study and answer the question:\n\n\"{passage_text}\"\n\n{q_stem}"
    norm = normalize_text(full_q_text)
    if norm in passages_seen:
        raise ValueError(f"Duplicate passage question: {q_stem[:60]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in passage: {q_stem[:60]}")
    passages_seen.add(norm)
    
    opts, corr, sol = rotate_options(
        corr_text,
        wrong_texts,
        target_opt,
        explanation + "\nHence, Option {{CORR}} is correct.",
        "Identifies correct application of psychological principles to the case study."
    )
    part1_qs.append(make_question(chapter, topic, full_q_text, opts, corr, sol))

# --- PASSAGE 1: Giftedness and Triarchic Intelligence (M1, P1, Q41-45) ---
P1_TEXT = (
    "Aarav, a 15-year-old student, consistently scores in the top 1 percentile in academic examinations. "
    "He demonstrates rapid information processing, exceptional abstract reasoning, and photographic memory for mathematical theorems. "
    "However, when assigned to work on collaborative science projects, Aarav struggles intensely: he dismisses teammates' ideas, "
    "becomes furious when group members make mistakes, and is unable to perceive his peers' emotional distress. "
    "A comprehensive psychological assessment reveals an IQ of 138 on the Wechsler Intelligence Scale, but significantly below-average "
    "scores on emotional intelligence measures. His school counselor notes that Aarav excels at analyzing existing logical problems, "
    "yet struggles to adapt flexibly to novel social environments or invent creative out-of-the-box solutions."
)

add_pq("Passage 1", P1_TEXT, "According to Robert Sternberg's Triarchic Theory of Intelligence, which component of intelligence is Aarav predominantly demonstrating in his academic coursework?",
    "Componential / Analytical Intelligence",
    ["Experiential / Creative Intelligence", "Contextual / Practical Intelligence", "Bodily-Kinesthetic Intelligence"],
    "A", "Sternberg's Triarchic Theory identifies Componential (Analytical) intelligence as the analysis of information to solve logical and academic problems, which Aarav clearly displays.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 1", P1_TEXT, "In light of J.P. Guilford's Structure of Intellect model, Aarav's exceptional capacity to produce a single logically correct answer to mathematical equations reflects:",
    "Convergent thinking",
    ["Divergent thinking", "Catatonic thinking", "Latent incubation"],
    "B", "Convergent thinking is the ability to generate the single correct answer to a standard problem, as in mathematics, distinct from divergent creative generation.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 1", P1_TEXT, "According to Salovey and Mayer's model of Emotional Intelligence, what core deficiency is Aarav exhibiting in his team interactions?",
    "Inability to perceive, understand, and regulate emotional expressions in himself and peers",
    ["Severe deficit in auditory sensory processing", "Loss of long-term semantic working memory", "Physical impairment of fine motor coordination"],
    "C", "Salovey and Mayer define emotional intelligence as the ability to monitor one's own and others' feelings and emotions, to discriminate among them, and to use this information to guide thinking and actions.",
    "Variations in Psychological Attributes", "Emotional Intelligence")

add_pq("Passage 1", P1_TEXT, "Based on the normal distribution curve of intelligence (mean = 100, SD = 15), Aarav's IQ of 138 formally places him in which diagnostic category?",
    "Intellectually Gifted (top 2-3% of the general population)",
    ["Borderline Intellectual Functioning", "Average Intellectual Ability", "Mild Intellectual Disability"],
    "D", "On standardized normal distribution curves, an IQ of 130 and above (more than two standard deviations above the mean) classifies an individual as intellectually gifted.",
    "Variations in Psychological Attributes", "Individual Differences in Intelligence")

add_pq("Passage 1", P1_TEXT, "To help Aarav thrive in novel, real-world social environments, his counselor should focus primarily on nurturing which aspect of Sternberg's triarchic framework?",
    "Contextual / Practical Intelligence (street smarts and social adaptation)",
    ["Rote verbal memory rehearsal", "Physical reaction time reflexes", "Unconscious psychodynamic dream recall"],
    "A", "Contextual (Practical) intelligence involves the ability to adapt, shape, and select real-world environments to meet personal and social goals.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

# --- PASSAGE 2: Type A Personality & Cardiac Vulnerability (M1, P2, Q46-50) ---
P2_TEXT = (
    "Vikram, a 44-year-old senior investment banker, works 14 hours a day and refuses to take annual vacations. "
    "He becomes violently impatient when elevators are delayed, frequently finishes other people's sentences during meetings, "
    "and views every colleague as a fierce competitor who must be outperformed. Despite his corporate promotions, Vikram feels a "
    "perpetual sense of time urgency, eating his meals while driving and answering emails during family dinners. "
    "Recently, he reported to the company physician complaining of recurrent chest tightness, chronic hypertension, and sleep disturbances. "
    "The clinical psychologist notes that Vikram exhibits intense hostility whenever minor administrative obstacles occur."
)

add_pq("Passage 2", P2_TEXT, "According to Friedman and Rosenman's personality typology, Vikram clearly exemplifies which behavioral pattern?",
    "Type A Personality",
    ["Type B Personality", "Type C Personality", "Type D Personality"],
    "B", "Friedman and Rosenman characterized Type A personality by excessive competitive drive, intense time urgency, impatience, and hostility, predisposing individuals to coronary heart disease.",
    "Self and Personality", "Type Approaches to Personality")

add_pq("Passage 2", P2_TEXT, "Research in behavioral medicine indicates that which specific emotional component of Type A personality is most lethally associated with coronary heart disease?",
    "Hostility and cynicism",
    ["High intellectual ambition", "Punctuality and neatness", "Polite speech inflection"],
    "C", "Cardiovascular research demonstrates that cynicism and chronic hostility are the primary toxic components of the Type A profile driving hypertension and myocardial infarction.",
    "Self and Personality", "Type Approaches to Personality")

add_pq("Passage 2", P2_TEXT, "In contrast to Vikram, an individual classified as possessing a 'Type B Personality' would characteristically demonstrate:",
    "A relaxed, patient, easy-going demeanor without intense time urgency or hostility",
    ["Submissive, unassertive suppression of anger (Type C)", "Chronic social inhibition and high negative affectivity (Type D)", "Acute psychotic catatonia"],
    "D", "Type B personality is characterized by a calm, unhurried, patient, and relaxed approach to life, devoid of chronic hostility or aggressive competitiveness.",
    "Self and Personality", "Type Approaches to Personality")

add_pq("Passage 2", P2_TEXT, "According to Suzanne Kobasa's concept of 'Hardiness', what protective psychological buffer is Vikram noticeably lacking?",
    "The 3 Cs: Commitment, Control, and Challenge",
    ["High caloric dietary consumption", "Suppression of all emotional communication", "Avoidance of all professional responsibilities"],
    "A", "Kobasa's personality hardiness consists of the 3 Cs: Commitment to work/values, feeling a sense of personal Control, and viewing change as an exciting Challenge rather than a threat.",
    "Meeting Life Challenges", "Stress and Health")

add_pq("Passage 2", P2_TEXT, "Which non-pharmacological clinical intervention would be most effective in modifying Vikram's maladaptive stress responses and chronic physiological arousal?",
    "Progressive Muscle Relaxation (PMR) coupled with Cognitive Behavioural Stress Inoculation Training (SIT)",
    ["Electroconvulsive Shock Therapy (ECT)", "Forced physical exhaustion through sleep deprivation", "Solitary confinement in total darkness"],
    "B", "Edmund Jacobson's Progressive Muscle Relaxation (PMR) combined with Donald Meichenbaum's Stress Inoculation Training (SIT) directly modifies physiological tension and cognitive cognitive appraisal.",
    "Meeting Life Challenges", "Stress Management Techniques")

# --- PASSAGE 3: Academic Stress & Selye's GAS (M2, P1, Q41-45) ---
P3_TEXT = (
    "Meera, a Class 12 student, is preparing for the highly competitive National Medical Entrance Examination (NEET). "
    "Six months prior to the exam, upon realizing the vast syllabus remaining, she experienced a sudden spike in heart rate, shallow breathing, "
    "and intense panic (the initial shock). Over the subsequent four months, Meera maintained an grueling 16-hour daily study routine: "
    "her body adapted to the high stress, her adrenal glands continuously secreted cortisol, and she appeared outwardly functional though "
    "perpetually drained. However, two weeks before the final exam, Meera suddenly collapsed: her immune system broke down, "
    "she developed a severe lung infection, acute depression, and could no longer retain information or sit upright."
)

add_pq("Passage 3", P3_TEXT, "Meera's physiological trajectory over the six months precisely illustrates which biological model of stress response?",
    "Hans Selye's General Adaptation Syndrome (GAS)",
    ["Richard Lazarus's Cognitive Appraisal Model", "Albert Ellis's ABCDE Framework", "B.F. Skinner's Operant Conditioning"],
    "C", "Hans Selye formulated the General Adaptation Syndrome (GAS), describing the three-stage biological response to chronic prolonged stress.",
    "Meeting Life Challenges", "General Adaptation Syndrome")

add_pq("Passage 3", P3_TEXT, "Which sequential three stages constitute Hans Selye's General Adaptation Syndrome as experienced by Meera?",
    "Alarm Reaction -> Resistance -> Exhaustion",
    ["Shock -> Rebellion -> Acceptance", "Denial -> Bargaining -> Depression", "Appraisal -> Coping -> Adaptation"],
    "D", "Selye's GAS consists of: (1) Alarm Reaction (fight-or-flight shock/countershock), (2) Resistance (body mobilizes and copes), and (3) Exhaustion (depletion of physiological resources and collapse).",
    "Meeting Life Challenges", "General Adaptation Syndrome")

add_pq("Passage 3", P3_TEXT, "Meera's physiological collapse and severe lung infection during the final stage were caused biologically by:",
    "Prolonged cortisol secretion suppressing immune T-cell and Natural Killer (NK) cell activity",
    ["Sudden destruction of all motor neurons in the spinal cord", "Complete cessation of oxygen supply to red blood cells", "Bacterial mutation resulting from reading textbooks"],
    "A", "In the Exhaustion stage of GAS, chronic hypersecretion of corticosteroids (cortisol) exhausts adrenal reserves and suppresses immune functioning (T and NK cells), leading to vulnerability to physical illness.",
    "Meeting Life Challenges", "Stress and Health")

add_pq("Passage 3", P3_TEXT, "According to Richard Lazarus, Meera's initial panic occurred during 'Primary Appraisal' because she evaluated the upcoming examination as:",
    "A severe Threat and Harm/Loss exceeding her coping resources",
    ["A completely irrelevant environmental noise", "A positive benign-positive joyful party", "A physical reflex that cannot be interpreted"],
    "B", "Primary appraisal evaluates whether an event is positive, neutral, or stressful; stressful events are further appraised as involving harm/loss, threat (potential future damage), or challenge.",
    "Meeting Life Challenges", "Stress Appraisal")

add_pq("Passage 3", P3_TEXT, "According to Endler and Parker's coping styles, which strategy would have been most adaptive for Meera to employ rather than ignoring her health?",
    "Task-oriented coping (structuring achievable daily study plans with scheduled physical rest)",
    ["Avoidance-oriented coping (sleeping 18 hours daily and playing video games)", "Emotion-oriented coping (crying continuously and blaming parents)", "Ignoring the syllabus completely and hoping for divine intervention"],
    "C", "Endler and Parker identified Task-oriented coping (focusing directly on realistic time management, problem-solving, and balancing rest) as the most effective strategy for academic stress.",
    "Meeting Life Challenges", "Coping with Stress")

# --- PASSAGE 4: Panic Disorder & Agoraphobia (M2, P2, Q46-50) ---
P4_TEXT = (
    "Sunita, a 28-year-old software architect, experienced a sudden terrifying episode while shopping in a crowded multi-level shopping mall. "
    "Without any external trigger, her heart began pounding furiously at 140 beats per minute, she felt intense chest pain, choking sensations, "
    "dizziness, and an overwhelming terror that she was about to suffer a fatal heart attack or lose her mind. "
    "Emergency room doctors found no cardiovascular pathology. Over subsequent weeks, Sunita developed intense anticipatory anxiety regarding "
    "having another attack. Consequently, she stopped riding the metro, avoided grocery markets, and eventually refused to leave her private "
    "apartment entirely, fearing she could not escape or obtain medical help if another seizure of terror struck."
)

add_pq("Passage 4", P4_TEXT, "Sunita's recurrent, unexpected surges of intense terror accompanied by physiological palpitations and fears of dying meet the DSM-5 criteria for:",
    "Panic Disorder",
    ["Generalized Anxiety Disorder (GAD)", "Schizophrenia, Catatonic Type", "Bipolar II Disorder"],
    "D", "Panic Disorder is characterized by recurrent unexpected panic attacks accompanied by persistent concern about future attacks or their consequences.",
    "Psychological Disorders", "Anxiety Disorders")

add_pq("Passage 4", P4_TEXT, "Sunita's subsequent refusal to leave her home, ride public transit, or visit crowded malls represents which comorbid disorder?",
    "Agoraphobia",
    ["Social Anxiety Disorder (Social Phobia)", "Specific Animal Phobia", "Obsessive-Compulsive Disorder"],
    "A", "Agoraphobia is marked fear and avoidance of places or situations (crowds, public transport, open/enclosed spaces) where escape might be difficult or help unavailable during panic.",
    "Psychological Disorders", "Anxiety Disorders")

add_pq("Passage 4", P4_TEXT, "In cognitive models of panic (David Clark), what catastrophic cognitive misinterpretation maintains Sunita's panic attacks?",
    "Misinterpreting normal benign physiological sensations (e.g. slight heart rate increase) as impending medical catastrophe (heart attack or death)",
    ["Believing that government spies are monitoring her laptop", "Assuming that all family members are plotting to steal her money", "Hallucinating vivid voices commanding her to sing"],
    "B", "David Clark's cognitive model posits that panic attacks are triggered and maintained by catastrophic misinterpretation of bodily sensations (e.g. accelerated pulse interpreted as impending heart failure).",
    "Psychological Disorders", "Anxiety Disorders")

add_pq("Passage 4", P4_TEXT, "How does Sunita's condition differ diagnostically from 'Generalized Anxiety Disorder' (GAD)?",
    "Panic disorder involves acute, discrete, sudden-onset surges of panic; GAD involves chronic, pervasive, non-specific 'free-floating' worry",
    ["Panic disorder only occurs in infants; GAD occurs only in the elderly", "Panic disorder is treated with antibiotics; GAD is treated with surgery", "There is zero diagnostic difference between the two disorders"],
    "C", "GAD is characterized by persistent, chronic, excessive, and uncontrollable worry lasting at least 6 months about various life domains, distinct from the discrete, acute spikes of Panic Disorder.",
    "Psychological Disorders", "Anxiety Disorders")

add_pq("Passage 4", P4_TEXT, "Which therapeutic combination represents the gold standard psychological treatment for Sunita's panic and agoraphobia?",
    "Cognitive Restructuring (challenging misinterpretations) combined with In Vivo Exposure therapy",
    ["Solitary confinement in an asylum", "Traditional psychoanalytic dream association for ten years", "Electroconvulsive shock therapy (ECT)"],
    "D", "Cognitive Behavioral Therapy (CBT) combining cognitive restructuring of catastrophic bodily interpretations with gradual in vivo exposure to feared situations is the gold standard for panic with agoraphobia.",
    "Therapeutic Approaches", "Cognitive Behaviour Therapy")

# --- PASSAGE 5: Beck's Cognitive Therapy for Depression (M3, P1, Q41-45) ---
P5_TEXT = (
    "Rohan, a 22-year-old university graduate, failed a single job interview at an IT company. "
    "Following this rejection, he withdrew to his room, stopped eating regularly, and concluded: 'I am a complete failure at everything. "
    "No company will ever hire me. My entire life is completely ruined.' When his sister pointed out that he had graduated with honors "
    "and had three other job interviews scheduled next week, Rohan dismissed her comments, stating: 'Those companies are just being polite; "
    "they will reject me the moment they see how useless I am.' Rohan's clinical psychologist identified pervasive cognitive distortions, "
    "including overgeneralization, catastrophizing, and selective abstraction, originating from a core negative cognitive schema."
)

add_pq("Passage 5", P5_TEXT, "Rohan's negative evaluations of himself ('I am a failure'), his world ('no company will hire me'), and his future ('my life is ruined') form Aaron Beck's classic concept of:",
    "The Cognitive Triad",
    ["The P-O-X Triangle", "The Id-Ego-Superego Axis", "The Three Gunas Constellation"],
    "A", "Aaron Beck's Cognitive Triad in depression consists of automatic, negative, pervasive schemas about: (1) oneself, (2) the ongoing world/experience, and (3) the future.",
    "Therapeutic Approaches", "Cognitive Therapy")

add_pq("Passage 5", P5_TEXT, "When Rohan interprets failing one interview as proof that 'I am a complete failure at everything', which cognitive distortion is he demonstrating?",
    "Overgeneralization",
    ["Dichotomous thinking", "Magnification", "Personalization"],
    "B", "Overgeneralization is a cognitive distortion where an individual draws a sweeping, negative universal conclusion based on a single isolated event.",
    "Therapeutic Approaches", "Cognitive Therapy")

add_pq("Passage 5", P5_TEXT, "In Beck's Cognitive Therapy, which structured tool is Rohan most likely assigned to record and challenge his automatic negative thoughts?",
    "Dysfunctional Thought Record (DTR)",
    ["Rorschach Inkblot Recording Sheet", "Thematic Apperception Card Deck", "Minnesota Multiphasic Scoring Template"],
    "C", "Beck's cognitive therapy utilizes the Dysfunctional Thought Record (DTR) where clients log distressing situations, automatic thoughts, emotional reactions, objective counter-evidence, and rational alternative thoughts.",
    "Therapeutic Approaches", "Cognitive Therapy")

add_pq("Passage 5", P5_TEXT, "How does Aaron Beck's Cognitive Therapy differ philosophically from Albert Ellis's Rational Emotive Behaviour Therapy (REBT)?",
    "Beck uses collaborative empiricism to test hypotheses like a scientist; Ellis uses active, forceful philosophical disputation (D)",
    ["Beck uses dream analysis; Ellis uses electrical shock", "Beck gives advice; Ellis gives hypnosis", "Both therapies are completely identical without any procedural distinction"],
    "D", "Beck employs 'collaborative empiricism' where therapist and client jointly test negative thoughts against real-world evidence, whereas Ellis uses direct, provocative, and vigorous disputation of irrational beliefs.",
    "Therapeutic Approaches", "Cognitive Therapy")

add_pq("Passage 5", P5_TEXT, "Rohan's tendency to disregard his graduation honors and focus exclusively on the single job rejection exemplifies which cognitive error?",
    "Selective Abstraction",
    ["Reaction Formation", "Sublimation", "Projection"],
    "A", "Selective abstraction occurs when a person focuses narrowly on a single negative detail taken out of context, while completely ignoring the broader positive evidence.",
    "Therapeutic Approaches", "Cognitive Therapy")

# --- PASSAGE 6: Health Campaign & Attitude Change (M3, P2, Q46-50) ---
P6_TEXT = (
    "A state public health department launched an intensive anti-tobacco campaign aimed at rural adolescents. "
    "Initially, the campaign broadcast graphic billboards displaying cancerous tumors, expecting fear alone to deter smoking; "
    "however, surveys showed rural teenagers defensively dismissed the images as 'distant Hollywood makeup'. "
    "The department revised its strategy using S.M. Mohsin's Two-Step Concept: they recruited a widely beloved local cricket captain. "
    "In Step 1, adolescents established high positive identification with the cricketer through sports workshops. "
    "In Step 2, the cricketer publicly declared his personal refusal to smoke, explaining how tobacco damages athletic lung capacity, "
    "and provided free sports kits alongside concrete behavioral tips to resist peer pressure. Following this, teen smoking rates plummeted by 42%."
)

add_pq("Passage 6", P6_TEXT, "Why did the initial campaign using purely graphic cancer imagery fail to change teenage smoking attitudes?",
    "Excessively high fear appeals without clear coping efficacy trigger defensive avoidance and denial",
    ["Adolescents do not possess biological visual sensory organs", "Teenagers prefer to contract physical lung diseases", "Billboards are illegal across all Indian states"],
    "B", "Social psychological research shows that extreme fear appeals unaccompanied by actionable, self-efficacious steps provoke defensive denial and cognitive dismissal rather than attitude change.",
    "Attitude and Social Cognition", "Attitude Change")

add_pq("Passage 6", P6_TEXT, "In S.M. Mohsin's Two-Step Concept, what occurred during Step 1 of the revised campaign?",
    "The target adolescent population developed positive emotional identification with the admired cricketer (source)",
    ["Adolescents were given monetary cash rewards to sign legal documents", "Adolescents were placed in solitary confinement for smoking", "The cricketer resigned from his sports team"],
    "C", "Mohsin's Two-Step Concept begins with Step 1: the target person develops positive identification with the source of persuasion.",
    "Attitude and Social Cognition", "Attitude Change")

add_pq("Passage 6", P6_TEXT, "What psychological mechanism in Step 2 of Mohsin's model compelled adolescents to alter their attitudes toward smoking?",
    "Cognitive pressure to align their attitude with the admired cricketer's stance to maintain consistency",
    ["Fear of being physically arrested by police officers", "Neurosurgical stimulation of temporal brain lobes", "Hypnotic trance states induced during cricket matches"],
    "D", "In Step 2 of Mohsin's model, the target feels cognitive pressure to internalize the source's attitude toward the attitude object, restoring cognitive harmony.",
    "Attitude and Social Cognition", "Attitude Change")

add_pq("Passage 6", P6_TEXT, "Which source characteristic made the local cricket captain extraordinarily effective in persuading the rural adolescent audience?",
    "High perceived attractiveness, likability, and social similarity to the target group",
    ["High knowledge of advanced organic biochemistry", "Stern military authority and legal power to imprison citizens", "Complete lack of familiarity to the rural public"],
    "A", "Persuasion research proves that sources who are perceived as attractive, admired, trustworthy, and similar to the audience produce significantly greater attitude change.",
    "Attitude and Social Cognition", "Attitude Change")

add_pq("Passage 6", P6_TEXT, "The shift in adolescents' attitude from viewing smoking as 'cool' to viewing it as 'harmful' represents which type of attitude change?",
    "Incongruent Attitude Change",
    ["Congruent Attitude Change", "Neutral Latent Change", "Genetic Biological Change"],
    "B", "Incongruent attitude change occurs when an attitude shifts to the opposite valence (from positive to negative evaluation of smoking).",
    "Attitude and Social Cognition", "Attitude Change")

# --- PASSAGE 7: Groupthink in Event Organizing Committee (M4, P1, Q41-45) ---
P7_TEXT = (
    "The student union executive committee of an elite college met to finalize the annual cultural festival budget. "
    "The union president, a charismatic senior, opened the meeting by announcing: 'We are going to sign an expensive contract with a "
    "celebrity pop singer, which will guarantee the best festival in college history.' When the treasurer attempted to point out that the "
    "contract would bankrupt the student welfare fund and violated college administrative financial caps, the president remarked: "
    "'True leaders don't worry about petty rules, and I hope everyone here is loyal to the council.' Two other members who harbored grave "
    "doubts stayed silent, assuming everyone else agreed. The committee unanimously approved the contract in ten minutes. "
    "Two weeks later, the festival was cancelled by the university rector for financial insolvency, destroying the union's reputation."
)

add_pq("Passage 7", P7_TEXT, "The flawed decision-making process demonstrated by the student union executive committee is classic evidence of:",
    "Groupthink (Irving Janis)",
    ["Social Loafing (Latané)", "Bystander Effect (Darley)", "Hawthorne Effect"],
    "C", "Irving Janis defined Groupthink as a defective mode of decision-making in cohesive groups where the desire for harmony and consensus overrides critical, realistic appraisal.",
    "Social Influence and Group Processes", "Group Decision Making")

add_pq("Passage 7", P7_TEXT, "The president's dismissal of financial caps and assertion that 'true leaders don't worry about petty rules' exemplifies which symptom of Groupthink?",
    "Illusion of invulnerability and unquestioned belief in group morality",
    ["Extreme clinical paranoia", "Catatonic stupor", "Autokinetic convergence"],
    "D", "Illusion of invulnerability (unwarranted optimism regarding risk) and unquestioned belief in the group's inherent righteousness are hallmark symptoms of Groupthink.",
    "Social Influence and Group Processes", "Group Decision Making")

add_pq("Passage 7", P7_TEXT, "The two members who withheld their severe reservations because they assumed everyone else agreed fell victim to which cognitive illusion?",
    "Illusion of Unanimity reinforced by Self-Censorship",
    ["Sleeper Effect", "Recency Effect", "Halo Effect"],
    "A", "In Groupthink, members self-censor their doubts; because nobody speaks up, the group operates under a false 'illusion of unanimity', assuming silence equals complete agreement.",
    "Social Influence and Group Processes", "Group Decision Making")

add_pq("Passage 7", P7_TEXT, "The president's warning that 'I hope everyone here is loyal to the council' illustrates which symptom of Groupthink?",
    "Direct social pressure on dissenters",
    ["Active listening", "Paraphrasing of feelings", "Unconditional positive regard"],
    "B", "Applying direct social pressure on any member who questions group consensus or expresses doubts is a definitive symptom of Groupthink.",
    "Social Influence and Group Processes", "Group Decision Making")

add_pq("Passage 7", P7_TEXT, "Which structural procedure would have most effectively prevented the committee from succumbing to Groupthink?",
    "Formally designating a 'Devil's Advocate' and inviting an independent outside auditor to evaluate the budget",
    ["Firing the treasurer immediately for raising objections", "Holding the meeting in total secrecy without taking any minutes", "Demanding that all votes be conducted by public show of hands"],
    "C", "Janis recommended appointing a designated Devil's Advocate to challenge consensus and inviting outside independent experts to evaluate decisions objectively.",
    "Social Influence and Group Processes", "Group Decision Making")

# --- PASSAGE 8: Noise & Crowding in Urban Slums (M4, P2, Q46-50) ---
P8_TEXT = (
    "A team of environmental psychologists conducted an empirical field investigation in an overcrowded urban settlement located "
    "adjacent to an active industrial railway freight corridor. The residents lived in single-room tenements housing an average of "
    "seven occupants per 120 square feet (high physical density). Freight trains rumbled past unpredictably at 95 decibels day and night. "
    "Psychological testing revealed that children in this community exhibited marked attentional deficits, lower reading comprehension scores, "
    "and high learned helplessness compared to peers from quieter, lower-density neighborhoods. "
    "Adult residents reported frequent interpersonal domestic disputes, chronic feelings of claustrophobic spatial restriction, "
    "and severe social withdrawal from neighborhood community gatherings."
)

add_pq("Passage 8", P8_TEXT, "According to Daniel Stokols, the residents' subjective distress of spatial restriction and lack of privacy in their small homes represents:",
    "Crowding (subjective psychological experience)",
    ["Density (objective physical calculation)", "Territoriality (geographical defense)", "Personal space bubble"],
    "D", "Daniel Stokols differentiated Density (objective number of persons per unit area) from Crowding (the subjective, unpleasant psychological experience of space restriction and loss of control).",
    "Psychology and Life", "Environmental Stressors")

add_pq("Passage 8", P8_TEXT, "Why did the 95-decibel freight train noise exert such a severe cognitive toll on school children's reading and attention?",
    "The noise was unpredictable, uncontrollable, and of high intensity, chronically overloading attentional capacity",
    ["Train noise cures all cognitive learning difficulties", "Children are biologically deaf to railway sounds", "The noise was completely predictable and controllable"],
    "A", "Glass and Singer showed that noise that is loud, unpredictable, and uncontrollable produces chronic cognitive after-effects, attentional overload, and impaired reading comprehension.",
    "Psychology and Life", "Environmental Stressors")

add_pq("Passage 8", P8_TEXT, "The adult residents' tendency to isolate themselves from community gatherings exemplifies which psychological coping response to high density?",
    "Social withdrawal to prevent sensory and interpersonal overload",
    ["Instrumental aggression to expand physical territory", "Cultivation of unconditional positive regard", "Conversion disorder and glove anesthesia"],
    "B", "Under intense spatial crowding, individuals experience sensory overload; social withdrawal is an adaptive psychological mechanism to minimize interpersonal friction and preserve psychological privacy.",
    "Psychology and Life", "Environmental Stressors")

add_pq("Passage 8", P8_TEXT, "The children's development of 'Learned Helplessness' in this environment occurred because:",
    "Repeated inability to terminate or escape uncontrollable environmental stressors led to the belief that outcomes are uncontrollable",
    ["Children were rewarded with cash prizes for failing school tests", "Teachers gave students photographic memory training", "Children inherited an intellectual gene from railway workers"],
    "C", "Martin Seligman's learned helplessness occurs when individuals are subjected to painful, uncontrollable environmental stressors (like relentless noise and cramped conditions), generalizing into passivity.",
    "Psychology and Life", "Poverty and Deprivation")

add_pq("Passage 8", P8_TEXT, "Which human-environment orientation is exhibited by industrial planners who locate polluting freight corridors next to vulnerable communities without regard for their well-being?",
    "Instrumentalist Perspective",
    ["Spiritual Perspective", "Transactional Perspective", "Humanistic Perspective"],
    "D", "The Instrumentalist perspective treats the physical and social environment purely as an expendable resource for economic exploitation and industrial convenience.",
    "Psychology and Life", "Human-Environment Relationship")

# --- PASSAGE 9: Clinical Intake & Counselling Ethics (M5, P1, Q41-45) ---
P9_TEXT = (
    "Kavita, a licensed clinical psychologist, conducted an intake session with Deepak, a 35-year-old corporate executive suffering from "
    "severe occupational distress and marital discord. At the start of the session, Kavita explained the therapy process, potential benefits, "
    "limits of confidentiality, and obtained Deepak's written consent. Throughout the session, Kavita maintained an open posture (SOLER), "
    "leaned forward, nodded attentively, and reflected: 'You feel utterly overwhelmed trying to meet company deadlines while feeling "
    "unsupported by your spouse.' Deepak began to weep, expressing deep shame about his failures. Rather than offering moral judgments or "
    "hasty advice, Kavita communicated genuine warmth and non-judgmental acceptance. Toward the end, Deepak revealed that he had been "
    "embezzling company funds, and offered Kavita a 20% financial partnership in an off-shore trading business if she kept quiet."
)

add_pq("Passage 9", P9_TEXT, "Kavita's restatement of Deepak's emotional state ('You feel utterly overwhelmed...') exemplifies which core counselling microskill?",
    "Reflection of Feelings and Paraphrasing",
    ["Direct disputation of irrational cognitions", "Free association and dream interpretation", "Hypnotic age regression"],
    "A", "Reflection of feelings involves identifying and verbalizing the client's underlying emotional experience, demonstrating empathetic attunement without judgment.",
    "Developing Psychological Skills", "Counselling Skills")

add_pq("Passage 9", P9_TEXT, "Kavita's non-judgmental acceptance and warmth when Deepak revealed his perceived life failures demonstrates Carl Rogers' condition of:",
    "Unconditional Positive Regard (UPR)",
    ["Congruence / Genuineness", "Aversive Conditioning", "Counter-transference"],
    "B", "Unconditional Positive Regard is warm, non-evaluative acceptance of the client's human worth, free from moralizing or conditional acceptance.",
    "Developing Psychological Skills", "Counselling Skills")

add_pq("Passage 9", P9_TEXT, "Gerard Egan's 'SOLER' framework observed in Kavita's physical posture stands for:",
    "Squarely face client, Open posture, Lean forward, Eye contact, and Relaxed demeanor",
    ["Speak clearly, Overrule client, Listen quietly, Evaluate, and Respond", "Stand upright, Observe, Lead conversation, Explain rules, and Review", "Sit backward, Open notes, Look at clock, Exit room, and Rest"],
    "C", "Egan's SOLER framework: Squarely face the client, Open posture, Lean slightly forward, Eye contact, and Relaxed posture.",
    "Developing Psychological Skills", "Communication Skills")

add_pq("Passage 9", P9_TEXT, "How must Kavita ethically respond to Deepak's offer of a 20% business financial partnership?",
    "Unequivocally decline the offer, as entering a business partnership constitutes an unethical Dual Relationship",
    ["Accept the partnership immediately to supplement clinical earnings", "Negotiate for a 35% stake in the offshore business", "Invest all of her clinic's savings into the client's offshore company"],
    "D", "Professional codes of ethics strictly prohibit Dual (Multiple) Relationships: entering a business, financial, or romantic partnership with a client exploits the therapeutic bond and destroys objectivity.",
    "Developing Psychological Skills", "Ethics in Psychology")

add_pq("Passage 9", P9_TEXT, "Under which circumstance would Kavita be legally and ethically mandated to break confidentiality regarding Deepak?",
    "If Deepak discloses a credible, imminent intention to commit suicide or inflict lethal physical violence on an identifiable individual",
    ["If Deepak confesses that he secretly dislikes his corporate supervisor", "If Deepak's wife calls the clinic asking what was discussed", "If Deepak's employer demands to view the counseling session notes"],
    "A", "The Tarasoff ruling and clinical ethical codes establish the 'Duty to Warn/Protect': confidentiality is inviolable except when the client poses an imminent, life-threatening danger to themselves or others.",
    "Developing Psychological Skills", "Ethics in Psychology")

# --- PASSAGE 10: Performance Testing & PASS Model (M5, P2, Q46-50) ---
P10_TEXT = (
    "Aman, a 12-year-old boy from a tribal hamlet in Jharkhand, was referred to a district child psychologist due to academic difficulties "
    "in his Hindi-medium school. The school suspected intellectual disability based on a standard written verbal test where Aman scored an IQ of 65. "
    "Recognizing cultural and linguistic bias, the psychologist discarded the paper-pencil verbal test and administered the Bhatia Battery of "
    "Performance Tests of Intelligence alongside the Das-Naglieri Cognitive Assessment System (CAS) based on the PASS model. "
    "Aman performed exceptionally well on the Kohs Block Design and Passalong tests, demonstrating rapid Kohs block construction and "
    "flawless simultaneous processing of spatial visual arrays. However, he struggled on sequential letter-number tasks requiring sequential processing "
    "and displayed low attention arousal in classroom lecture formats."
)

add_pq("Passage 10", P10_TEXT, "Why did the psychologist suspect that the initial verbal IQ score of 65 was invalid and culturally biased?",
    "Verbal intelligence tests heavily depend on formal schooling, vocabulary, and dominant language proficiency, penalizing non-dominant linguistic backgrounds",
    ["Written tests are only valid for adults over the age of 50", "Tribal children possess zero biological cognitive abilities", "Standardized verbal tests can only be taken online"],
    "B", "Verbal paper-pencil tests are culturally and educationally loaded: children lacking exposure to the dominant test language and formal schooling score artificially low regardless of innate cognitive capacity.",
    "Variations in Psychological Attributes", "Culture and Intelligence")

add_pq("Passage 10", P10_TEXT, "The Bhatia Battery of Performance Tests of Intelligence administered to Aman comprises which subtests?",
    "Kohs Block Design, Alexander Passalong, Pattern Drawing, Immediate Memory for Digits, and Picture Construction",
    ["Rorschach Inkblots and Thematic Apperception Cards", "Raven's Progressive Matrices and MMPI", "Word Association and Sentence Completion"],
    "C", "C.M. Bhatia's Battery of Performance Tests (developed in 1955 in India) includes 5 subtests: Kohs Block Design, Alexander Passalong, Pattern Drawing, Immediate Memory for Digits, and Picture Construction.",
    "Variations in Psychological Attributes", "Assessment of Psychological Attributes")

add_pq("Passage 10", P10_TEXT, "In the Das-Naglieri PASS Model of intelligence, what does the acronym 'PASS' represent?",
    "Planning, Attention-Arousal, Simultaneous processing, and Successive processing",
    ["Perception, Aptitude, Sensation, and Subconscious", "Primary, Affective, Secondary, and Somatic", "Physical, Analytical, Spatial, and Speed"],
    "D", "The PASS model developed by J.P. Das, Jack Naglieri, and J.R. Kirby conceptualizes intelligence through: Planning, Attention-Arousal, Simultaneous processing, and Successive (sequential) processing.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 10", P10_TEXT, "Aman's rapid assembly of Kohs blocks and spatial geometric shapes reflects superior functioning in which PASS process?",
    "Simultaneous Processing (integrating stimuli into a cohesive spatial pattern)",
    ["Successive Processing", "Verbal Encoding", "Catatonic Freezing"],
    "A", "Simultaneous processing takes place when relationships between separate items are integrated into a single unified whole or spatial pattern, as tested by Block Design and Raven's Matrices.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 10", P10_TEXT, "According to the PASS framework, which anatomical neurological block corresponds to Aman's Attention-Arousal processing?",
    "Brainstem and Reticular Activating System (RAS)",
    ["Occipital and Parietal visual cortex lobes", "Frontal and Prefrontal cerebral cortex", "Spinal cord and peripheral motor nerves"],
    "B", "In Luria and Das's neuropsychological framework, the first functional unit responsible for Attention and Arousal is located in the brainstem and the reticular activating system (RAS).",
    "Variations in Psychological Attributes", "Theories of Intelligence")

print(f"Passages Part 1 generated: {len(part1_qs)} questions across 10 passages (50 questions so far).")

# --- PASSAGE 11: Psychodynamic Defense Mechanisms (M6, P1, Q41-45) ---
P11_TEXT = (
    "Sanjay, a 32-year-old marketing manager, was passed over for a promotion in favor of a colleague. "
    "Privately harboring intense rage and unconscious hostile impulses toward his supervisor, Sanjay began professing exaggerated "
    "admiration and bringing expensive gifts to the supervisor every morning (outwardly displaying extreme reverence). "
    "At home, Sanjay accused his wife of constantly being angry and hostile toward everyone, repeatedly yelling: 'Why are you always so aggressive?' "
    "When asked by his brother why he was not promoted, Sanjay rationalized: 'I deliberately told management not to promote me because "
    "I prefer having more free time for spiritual meditation.' His psychoanalyst noted that Sanjay's ego was relying heavily on unconscious "
    "ego defense mechanisms to protect itself from overwhelming anxiety."
)

add_pq("Passage 11", P11_TEXT, "Sanjay's behavior of acting with exaggerated devotion and gift-giving toward the supervisor he unconsciously hates exemplifies which defense mechanism?",
    "Reaction Formation",
    ["Projection", "Sublimation", "Regression"],
    "C", "Reaction formation occurs when a person manages an anxiety-provoking, unacceptable impulse by unconsciously transforming it into its exact opposite outward behavior (e.g. hating someone but acting with extreme fawning devotion).",
    "Self and Personality", "Freud's Theory of Personality")

add_pq("Passage 11", P11_TEXT, "When Sanjay accuses his wife of being hostile and aggressive—attributing his own unconscious anger onto her—which defense mechanism is operating?",
    "Projection",
    ["Displacement", "Denial", "Intellectualization"],
    "D", "Projection is a defense mechanism where an individual attributes their own unacknowledged, unacceptable thoughts, motives, or feelings onto another person.",
    "Self and Personality", "Freud's Theory of Personality")

add_pq("Passage 11", P11_TEXT, "Sanjay's explanation that he 'deliberately told management not to promote me to have more spiritual time' represents:",
    "Rationalization (making socially acceptable excuses to justify an ego-threatening failure)",
    ["Reaction Formation", "Conversion Disorder", "Catatonia"],
    "A", "Rationalization occurs when a person invents plausible, logical, but false justifications to explain away an ego-threatening failure or unacceptable behavior.",
    "Self and Personality", "Freud's Theory of Personality")

add_pq("Passage 11", P11_TEXT, "According to Sigmund Freud's structural model of personality, defense mechanisms are unconsciously mobilized by which agency of the psyche?",
    "The Ego (to mediate conflicts between Id demands, Superego morality, and reality)",
    ["The Id (to maximize immediate instinctual pleasure)", "The Superego (to punish the individual with guilt)", "The Collective Unconscious archetypes"],
    "B", "Freud posited that defense mechanisms are unconscious psychological strategies deployed specifically by the Ego to protect itself from anxiety arising from Id-Superego conflicts and external reality.",
    "Self and Personality", "Freud's Theory of Personality")

add_pq("Passage 11", P11_TEXT, "If Sanjay were to channel his aggressive energies constructively into competitive boxing championships or vigorous sculpting, which mature defense mechanism would he be using?",
    "Sublimation",
    ["Repression", "Fixation", "Undoing"],
    "C", "Sublimation is considered the healthiest defense mechanism: redirecting unacceptable instinctual or aggressive impulses into socially constructive, creative, and culturally productive channels.",
    "Self and Personality", "Freud's Theory of Personality")

# --- PASSAGE 12: Burnout, Hardiness & Stress Management (M6, P2, Q46-50) ---
P12_TEXT = (
    "Priya, an emergency room nurse coordinator at a metropolitan trauma center, has worked 60-hour weeks throughout a two-year pandemic. "
    "Initially enthusiastic, Priya now experiences profound emotional exhaustion, depersonalization (referring to patients coldly by room numbers "
    "rather than names), and a pervasive feeling of personal futility, believing her medical efforts achieve nothing. "
    "A workplace stress audit by an organizational psychologist diagnosed advanced occupational burnout. "
    "In contrast, her colleague Anita, who worked identical shifts, remained remarkably resilient, viewing the crisis as an opportunity "
    "to master crisis logistics, actively committing to team welfare, and believing her proactive actions directly influenced patient recovery. "
    "The hospital introduced Donald Meichenbaum's Stress Inoculation Training (SIT) and biofeedback relaxation to rehabilitate the nursing staff."
)

add_pq("Passage 12", P12_TEXT, "Priya's cluster of symptoms—emotional exhaustion, cynicism/depersonalization, and diminished personal accomplishment—defines:",
    "Burnout",
    ["Bipolar I Disorder", "Conversion Disorder", "Agoraphobia"],
    "D", "Burnout is a state of physical, emotional, and mental exhaustion caused by chronic, long-term involvement in emotionally demanding situations, characterized by exhaustion, depersonalization, and reduced efficacy.",
    "Meeting Life Challenges", "Stress and Health")

add_pq("Passage 12", P12_TEXT, "According to Suzanne Kobasa's personality research, Priya's colleague Anita demonstrates high levels of:",
    "Hardiness (Commitment, Control, and Challenge)",
    ["Type A Hostility", "Learned Helplessness", "Catatonia"],
    "A", "Suzanne Kobasa identified 'Hardiness' as a personality style that buffers against stress, comprising the 3 Cs: Commitment to one's activities, feeling in Control of outcomes, and perceiving change as a Challenge.",
    "Meeting Life Challenges", "Stress and Health")

add_pq("Passage 12", P12_TEXT, "Anita's conviction that her actions directly influence patient recovery illustrates which psychological construct?",
    "High Internal Locus of Control and Self-Efficacy",
    ["External Locus of Control and Fatalism", "Introverted neuroticism", "Pluralistic ignorance"],
    "B", "Believing that one's personal choices and efforts determine outcomes reflects an internal locus of control, coupled with high self-efficacy (Bandura's belief in one's capacity to execute behaviors).",
    "Meeting Life Challenges", "Stress and Health")

add_pq("Passage 12", P12_TEXT, "Donald Meichenbaum's Stress Inoculation Training (SIT) administered to the nurses proceeds through which three sequential phases?",
    "Cognitive Assessment / Reconceptualization -> Skill Acquisition and Rehearsal -> Application and Follow-Through",
    ["Alarm Reaction -> Stage of Resistance -> Stage of Exhaustion", "Free Association -> Dream Analysis -> Working Through", "Desensitization -> Flooding -> Aversive Conditioning"],
    "C", "Meichenbaum's Stress Inoculation Training (SIT) follows 3 phases: (1) Cognitive conceptualization (understanding stress reactions), (2) Coping skill acquisition and rehearsal (relaxation, positive self-talk), and (3) Application in real-life graded exposure.",
    "Meeting Life Challenges", "Stress Management Techniques")

add_pq("Passage 12", P12_TEXT, "How does Biofeedback training assist exhausted healthcare workers in managing chronic physiological stress?",
    "Provides real-time physiological data (e.g. heart rate variability, galvanic skin response) allowing individuals to learn voluntary control over autonomic responses",
    ["Delivers strong electric shocks to erase painful memories", "Administers heavy sedative psychiatric injections", "Measures astrological horoscope alignments to predict stress"],
    "D", "Biofeedback monitors autonomic physiological responses (heart rate, muscle tension, skin conductance) and provides immediate sensory feedback, enabling individuals to develop voluntary self-regulation over stress arousal.",
    "Meeting Life Challenges", "Stress Management Techniques")

# --- PASSAGE 13: Neurodevelopmental Disorders: ADHD (M7, P1, Q41-45) ---
P13_TEXT = (
    "Kabir, an 8-year-old boy in Class 3, is referred for psychological evaluation due to persistent disruptions at school and home. "
    "His teacher reports that Kabir cannot sit still at his desk, constantly fidgets with his hands, climbs on furniture during lessons, "
    "and shouts out answers before questions have been completed. In tests, he fails to pay close attention to details, makes careless mistakes, "
    "and frequently loses his pencils, books, and assignments. He is unable to wait for his turn during games, constantly interrupting peers. "
    "His parents note that these behaviors have been present since age four and occur consistently at home, in the park, and at school. "
    "However, Kabir displays no cruelty toward animals, does not destroy property, and feels genuine remorse when reprimanded."
)

add_pq("Passage 13", P13_TEXT, "Kabir's pervasive pattern of inattention, hyperactivity, and impulsivity across multiple settings meets the DSM-5 criteria for:",
    "Attention-Deficit / Hyperactivity Disorder (ADHD, Combined Presentation)",
    ["Conduct Disorder", "Autism Spectrum Disorder", "Oppositional Defiant Disorder"],
    "A", "ADHD is characterized by a persistent pattern of inattention and/or hyperactivity-impulsivity that interferes with functioning or development, present across multiple settings before age 12.",
    "Psychological Disorders", "Neurodevelopmental Disorders")

add_pq("Passage 13", P13_TEXT, "What are the three core diagnostic symptom clusters of ADHD demonstrated by Kabir?",
    "Inattention, Hyperactivity, and Impulsivity",
    ["Delusions, Hallucinations, and Disorganized Speech", "Apathy, Anhedonia, and Alogia", "Obsessions, Compulsions, and Tics"],
    "B", "DSM-5 outlines three primary behavioral features of ADHD: (1) Inattention (careless mistakes, losing items), (2) Hyperactivity (fidgeting, restlessness), and (3) Impulsivity (blurting answers, inability to wait turn).",
    "Psychological Disorders", "Neurodevelopmental Disorders")

add_pq("Passage 13", P13_TEXT, "Why is Kabir's behavior differentiated from 'Conduct Disorder'?",
    "Kabir lacks aggression toward people/animals, property destruction, deceitfulness, or serious rule violations characteristic of Conduct Disorder",
    ["Conduct disorder only occurs in adults over 40 years of age", "ADHD is caused exclusively by eating candy while Conduct Disorder is genetic", "There is zero diagnostic difference between the two conditions"],
    "C", "Conduct Disorder involves repetitive, persistent violation of the basic rights of others or major societal norms (theft, assault, cruelty, vandalism), which Kabir does not exhibit.",
    "Psychological Disorders", "Neurodevelopmental Disorders")

add_pq("Passage 13", P13_TEXT, "Which multi-modal intervention is recognized as most effective for managing children with ADHD in classroom environments?",
    "Behavior modification (token economy, clear structured routines) coupled with classroom accommodations and parent training",
    ["Permanent expulsion and isolating the child at home", "Administering severe physical corporal punishment for every careless error", "Subjecting the child to classical psychoanalysis for five years"],
    "D", "Behavior modification strategies (structured routines, token economies, positive reinforcement for sustained attention) combined with classroom modifications and parent behavioral training form the empirical foundation for ADHD support.",
    "Psychological Disorders", "Neurodevelopmental Disorders")

add_pq("Passage 13", P13_TEXT, "Which neurobiological factor is most consistently implicated in the pathophysiology of ADHD?",
    "Dysregulation of dopamine and norepinephrine pathways in the prefrontal cortex",
    ["Bacterial infection of the spinal cord fluid", "Total physical absence of the cerebellum", "Hyperactivity of visual occipital rod cells"],
    "A", "Neuroimaging and pharmacological studies identify hypofunctioning in dopamine and norepinephrine catecholamine neurotransmission within prefrontal-striatal circuits regulating executive attention and impulse control.",
    "Psychological Disorders", "Neurodevelopmental Disorders")

# --- PASSAGE 14: Systematic Desensitization & Token Economy (M7, P2, Q46-50) ---
P14_TEXT = (
    "Ananya, a 26-year-old accountant, developed an intense, irrational phobia of dental procedures following a painful childhood root canal. "
    "Even smelling antiseptic or seeing a dental chair triggered tachycardia, hyperventilation, and terror, causing her to avoid dental visits "
    "for 12 years despite severe tooth decay. She sought treatment from a behavior therapist. "
    "The therapist first trained Ananya in Jacobson's Progressive Muscle Relaxation. Next, together they constructed an 11-step 'anxiety hierarchy' "
    "ranging from looking at a picture of a dentist (least feared) to sitting in a dental chair with the drill operating (most feared). "
    "Over ten sessions, the therapist paired deep muscular relaxation with imagined and in vivo exposure to each hierarchy step. "
    "Simultaneously, in a psychiatric rehabilitation ward nearby, a token economy was implemented where inpatients earned plastic chips for "
    "grooming and attending social skills classes, which could be exchanged for canteen snacks."
)

add_pq("Passage 14", P14_TEXT, "The behavior therapy technique used to treat Ananya's dental phobia is:",
    "Systematic Desensitization (Joseph Wolpe)",
    ["Aversive Conditioning", "Client-Centred Therapy", "Logotherapy"],
    "B", "Joseph Wolpe formulated Systematic Desensitization, pairing relaxation with hierarchical exposure to overcome irrational phobic anxiety.",
    "Therapeutic Approaches", "Behaviour Therapy")

add_pq("Passage 14", P14_TEXT, "What physiological and behavioral principle underlies the effectiveness of Joseph Wolpe's Systematic Desensitization?",
    "Reciprocal Inhibition (anxiety and deep relaxation are incompatible physiological states and cannot co-exist)",
    ["Operant extinction through punishment", "Catharsis of repressed sexual libido", "Cognitive restructuring of core existential schemas"],
    "C", "Wolpe's principle of Reciprocal Inhibition states that if an incompatible response (deep relaxation) is elicited in the presence of an anxiety-provoking stimulus, the anxiety response is weakened and suppressed.",
    "Therapeutic Approaches", "Behaviour Therapy")

add_pq("Passage 14", P14_TEXT, "What is the correct sequential order of the three steps in Wolpe's Systematic Desensitization as applied to Ananya?",
    "Relaxation Training -> Construction of Anxiety Hierarchy -> Graded Pairing of Hierarchy Steps with Relaxation",
    ["Construction of Hierarchy -> Electroconvulsive Shock -> Hypnotic Trance", "Flooding -> Free Association -> Interpretation of Transference", "Token Economy -> Aversive Stimulus -> Dream Analysis"],
    "D", "Systematic Desensitization proceeds through: (1) Relaxation training, (2) Constructing a graded anxiety hierarchy, and (3) Desensitization pairing (gradual exposure while deeply relaxed).",
    "Therapeutic Approaches", "Behaviour Therapy")

add_pq("Passage 14", P14_TEXT, "In the adjacent psychiatric ward, the use of plastic chips exchangeable for canteen snacks exemplifies which behavioral procedure?",
    "Token Economy (Operant Conditioning based on Secondary Reinforcement)",
    ["Classical Pavlovian Conditioning", "Systematic Desensitization", "Vicarious Modelling"],
    "A", "A Token Economy is an operant conditioning system where desired behaviors are reinforced with immediate conditioned reinforcers ('tokens' or chips) exchangeable for backup reinforcers (privileges, snacks).",
    "Therapeutic Approaches", "Behaviour Therapy")

add_pq("Passage 14", P14_TEXT, "If the therapist had instead immediately forced Ananya to sit in a vibrating dental chair with a drill running for two hours until her anxiety naturally subsided, which technique would be used?",
    "Flooding (In Vivo Prolonged Exposure)",
    ["Systematic Desensitization", "Token Economy", "Biofeedback"],
    "B", "Flooding exposes the phobic patient directly to the most terrifying feared stimulus at maximum intensity without relaxation training, keeping them in the situation until autonomic panic habituates and extinguishes.",
    "Therapeutic Approaches", "Behaviour Therapy")

# --- PASSAGE 15: Bystander Intervention & Social Inaction (M8, P1, Q41-45) ---
P15_TEXT = (
    "During peak morning rush hour at an overcrowded metropolitan railway terminal, an elderly passenger slipped, fell heavily between "
    "the platform and train footboard, and began groaning loudly in pain. Over 80 commuters stood on the platform waiting for the train. "
    "Despite hearing the victim's cries, nobody stepped forward to offer assistance for over six minutes. "
    "Commuters glanced at one another; seeing that other passengers appeared unhurried and calm, each individual assumed the situation was "
    "not an urgent life-threatening emergency, or assumed that railway police staff were already handling it. "
    "Only when a young college student shouted, 'He is bleeding, help me pull him up!' did five nearby passengers immediately rush forward to pull the victim to safety."
)

add_pq("Passage 15", P15_TEXT, "The commuters' failure to assist the fallen victim in the presence of 80 onlookers is classic evidence of:",
    "The Bystander Effect (John Darley and Bibb Latané)",
    ["Social Loafing", "Groupthink", "The Hawthorne Effect"],
    "C", "The Bystander Effect (Darley & Latané) demonstrates that an individual's likelihood of intervening to help in an emergency decreases significantly when other passive bystanders are present.",
    "Attitude and Social Cognition", "Explaining Social Behaviour")

add_pq("Passage 15", P15_TEXT, "When commuters looked at each other's calm expressions and concluded that no real crisis existed, they succumbed to:",
    "Pluralistic Ignorance",
    ["Diffusion of Responsibility", "Evaluation Apprehension", "Fundamental Attribution Error"],
    "D", "Pluralistic ignorance occurs when bystanders in an ambiguous situation look to others' outwardly calm reactions to interpret the event, falsely concluding that no emergency exists because nobody else appears alarmed.",
    "Attitude and Social Cognition", "Explaining Social Behaviour")

add_pq("Passage 15", P15_TEXT, "Each individual passenger's assumption that 'someone else on the platform or the railway police will handle it' exemplifies:",
    "Diffusion of Responsibility",
    ["Pluralistic Ignorance", "Deindividuation", "Self-Serving Bias"],
    "A", "Diffusion of responsibility is the psychological belief that when others are present, personal accountability is shared or diluted, reducing individual moral urgency to act.",
    "Attitude and Social Cognition", "Explaining Social Behaviour")

add_pq("Passage 15", P15_TEXT, "According to Darley and Latané's five-step model of bystander intervention, what critical hurdle did the college student overcome by shouting 'He is bleeding, help me pull him up!'?",
    "Interpreting the event unambiguously as an emergency and modeling clear action, resolving ambiguity for others",
    ["Giving everyone monetary cash prizes to help", "Arresting all bystanders for criminal negligence", "Inducing deep hypnotic trance states across the crowd"],
    "B", "By defining the ambiguous scene unambiguously as an emergency ('He is bleeding') and initiating explicit action, the student shattered pluralistic ignorance and prompted collective helping.",
    "Attitude and Social Cognition", "Explaining Social Behaviour")

add_pq("Passage 15", P15_TEXT, "If a solitary commuter had been standing on an empty rural railway platform when the passenger fell, psychological research predicts:",
    "The commuter would be significantly faster and more likely to provide immediate help",
    ["The commuter would definitely ignore the victim and walk away", "The commuter would suffer an immediate stroke", "The commuter's helping probability would be identical to a crowd of 500"],
    "C", "Darley and Latané proved that solitary bystanders intervene far more rapidly and reliably (often over 85% of cases) because the entire weight of personal responsibility rests squarely on them alone.",
    "Attitude and Social Cognition", "Explaining Social Behaviour")

# --- PASSAGE 16: Intergroup Conflict & Robbers Cave Paradigm (M8, P2, Q46-50) ---
P16_TEXT = (
    "At a university summer youth camp, 40 incoming students were randomly divided into two residential barracks: Barrack North ('Tigers') "
    "and Barrack South ('Panthers'). During Week 1, each barrack engaged in internal cooking, hiking, and emblem designing, developing high esprit de corps. "
    "During Week 2, camp organizers arranged an intense competitive sports tournament (tug-of-war, football, quiz) where only the winning barrack "
    "would receive an exclusive silver trophy and gourmet banquet. Hostility erupted rapidly: Tigers raided the Panthers' barrack, stole their flag, "
    "and Panthers retaliated with food fights and derogatory graffiti. Bringing both groups together for joint dining hall meals merely escalated "
    "insults. During Week 3, the organizers engineered a water crisis: the main camp drinking water pipeline broke, threatening camp closure. "
    "Tigers and Panthers worked side-by-side for six hours to repair the pipeline, dissolving their mutual hostility."
)

add_pq("Passage 16", P16_TEXT, "The summer camp simulation accurately replicates which classic social psychology investigation?",
    "Muzafer Sherif's Robbers Cave Experiment",
    ["Philip Zimbardo's Stanford Prison Experiment", "Stanley Milgram's Yale Obedience Study", "Solomon Asch's Line Judgment Experiment"],
    "D", "Muzafer Sherif et al. (1954/1961) conducted the Robbers Cave experiment demonstrating ingroup formation, intergroup conflict through zero-sum competition, and resolution via superordinate goals.",
    "Social Influence and Group Processes", "Intergroup Conflict")

add_pq("Passage 16", P16_TEXT, "Why did competitive sports tournaments in Week 2 immediately produce intergroup hostility and prejudice?",
    "The tournament created a zero-sum, contrient interdependence where one group's victory required the other group's loss (Realistic Group Conflict)",
    ["Students were suffering from biological hormonal imbalances", "The silver trophy was made of poisonous chemicals", "Students were hypnotized by camp counselors"],
    "A", "Realistic Group Conflict Theory asserts that when groups compete for real, scarce, zero-sum resources or rewards, prejudice, stereotyping, and hostile discriminatory behaviors inevitably emerge.",
    "Social Influence and Group Processes", "Intergroup Conflict")

add_pq("Passage 16", P16_TEXT, "Why was mere pleasant contact in the dining hall during Week 2 completely ineffective in resolving the conflict?",
    "Mere contact without cooperative interdependence does not dismantle prejudice and provides fertile ground for hostile escalation",
    ["The food served in the dining hall was poisoned", "Students were forbidden from looking at each other", "Contact hypothesis works only in foreign countries"],
    "B", "Sherif proved that mere non-competitive contact (eating meals or watching movies together) fails to reduce friction when intergroup animosity already exists; it merely triggers renewed clashes.",
    "Social Influence and Group Processes", "Intergroup Conflict")

add_pq("Passage 16", P16_TEXT, "The joint repair of the broken drinking water pipeline is an example of:",
    "A Superordinate Goal",
    ["A Distributive Bargaining Tactic", "A Token Economy", "A Projective Assessment"],
    "C", "Superordinate goals are compelling, shared objectives that are mutually desirable for both conflicting groups but cannot be achieved by either group alone, necessitating cooperative interdependence.",
    "Social Influence and Group Processes", "Intergroup Conflict")

add_pq("Passage 16", P16_TEXT, "According to the Common Ingroup Identity Model, why did repairing the water pipe reduce intergroup hostility?",
    "It transformed the psychological cognitive boundary from 'Us versus Them' into an inclusive, shared 'We'",
    ["It proved that Tigers were physically superior to Panthers", "It allowed students to earn cash salaries from the camp", "It erased all memories of childhood from their brains"],
    "D", "Gaertner and Dovidio's Common Ingroup Identity Model shows that working toward superordinate goals recategorizes formerly opposing subgroups into a single, unified, inclusive superordinate group identity.",
    "Social Influence and Group Processes", "Resolution of Intergroup Conflict")

# --- PASSAGE 17: Observational Learning & Media Violence (M9, P1, Q41-45) ---
P17_TEXT = (
    "A developmental psychologist investigated the impact of violent video games on 10-year-old boys in an urban elementary school. "
    "Group A played a first-person shooter game where players were rewarded with points and digital trophies for executing graphic physical assaults. "
    "Group B played an engaging non-violent cooperative puzzle game. Immediately following the 45-minute gaming session, all boys were "
    "placed in a free-play playroom equipped with both aggressive toys (toy guns, punching bags) and non-aggressive toys (construction blocks, books). "
    "Boys from Group A displayed significantly higher physical aggression, actively imitating specific combat moves seen in the video game, "
    "and were far slower to intervene when a confederate child dropped their art project and began crying in frustration."
)

add_pq("Passage 17", P17_TEXT, "The aggressive imitation displayed by Group A boys directly supports which major psychological theory?",
    "Albert Bandura's Social Learning Theory (Observational Learning)",
    ["Jean Piaget's Cognitive Developmental Theory", "Sigmund Freud's Psychosexual Stage Theory", "Carl Rogers' Humanistic Theory"],
    "A", "Albert Bandura's Social Learning Theory posits that complex behaviors (including novel violent tactics) are acquired through observation, modeling, and vicarious reinforcement.",
    "Psychology and Life", "Aggression and Violence")

add_pq("Passage 17", P17_TEXT, "The digital points and trophies awarded in the shooter game functioned psychologically as:",
    "Vicarious / Direct Reinforcement strengthening aggressive scripts",
    ["Negative punishment extinguishing behavior", "Aversive conditioning", "Systematic desensitization"],
    "B", "Reinforcing aggressive behavior with points and praise validates and strengthens aggressive behavioral scripts, increasing the probability that observed actions will be reproduced in real life.",
    "Psychology and Life", "Aggression and Violence")

add_pq("Passage 17", P17_TEXT, "Group A boys' failure to assist the crying child reflects which psychological consequence of violent media exposure?",
    "Desensitization and diminished emotional empathy toward victims of distress",
    ["Acute intellectual disability", "Temporary physical auditory deafness", "Bystander intervention enhancement"],
    "C", "Prolonged exposure to media violence induces emotional desensitization—dulling autonomic emotional reactivity to real-world suffering and reducing pro-social empathetic helping behavior.",
    "Psychology and Life", "Aggression and Violence")

add_pq("Passage 17", P17_TEXT, "What did Bandura's classic 'Bobo Doll' experiment prove regarding the acquisition versus performance of aggression?",
    "Children can acquire aggressive repertoires through pure observation without direct reinforcement, but actual performance depends on anticipated rewards or punishments",
    ["Children are born with an unchangeable genetic violent instinct", "Aggression cannot be learned unless children are physically beaten", "Watching aggressive models completely purges anger from the brain (catharsis)"],
    "D", "Bandura demonstrated the distinction between learning and performance: observing models allows acquisition of aggressive behaviors, while reward/punishment expectations govern whether those behaviors are performed.",
    "Psychology and Life", "Aggression and Violence")

add_pq("Passage 17", P17_TEXT, "Which non-violent parental and educational intervention is most effective in counteracting aggressive modeling in children?",
    "Providing proactive prosocial role models, media literacy discussions, and reinforcing empathetic conflict resolution",
    ["Beating children severely whenever they express anger", "Banning children from attending school or speaking to friends", "Forcing children to watch 10 hours of boxing to achieve catharsis"],
    "A", "Research proves that parental mediation, exposure to prosocial media models, explicit instruction in empathy, and positive reinforcement of non-violent negotiation effectively counteract violent media effects.",
    "Psychology and Life", "Aggression and Violence")

# --- PASSAGE 18: Counselling Ethics & Tarasoff Ruling (M9, P2, Q46-50) ---
P18_TEXT = (
    "Dr. Radhika, a licensed university psychologist, was providing psychotherapy to Tarun, a 21-year-old engineering student. "
    "Tarun was severely distressed following an acrimonious breakup with his classmate, Sneha. "
    "During their fourth session, Tarun became intensely agitated, clenched his fists, and stated: 'Sneha betrayed me and humiliated my family. "
    "I have purchased an unlicensed firearm and three rounds of ammunition. Tomorrow after our physics lab at 4:00 PM, I am going to shoot "
    "her in the parking lot and then end my own life.' Dr. Radhika attempted to de-escalate Tarun, but he abruptly walked out of the clinic. "
    "Dr. Radhika faced an urgent ethical and legal dilemma regarding the boundary of client confidentiality versus the preservation of human life."
)

add_pq("Passage 18", P18_TEXT, "In light of the landmark Tarasoff legal ruling and professional ethical codes, what is Dr. Radhika's mandatory legal and ethical obligation?",
    "Immediately notify university security/police and warn the identifiable potential victim (Sneha) to prevent lethal harm (Duty to Warn / Protect)",
    ["Maintain absolute confidentiality and refrain from contacting anyone under all circumstances", "Send an anonymous email to the student union discussion forum", "Wait until the next scheduled session next week to ask Tarun if he carried out the act"],
    "B", "The landmark Tarasoff v. Regents of the University of California ruling established that therapists have a 'Duty to Protect': when a client poses an imminent, serious threat of violence to a foreseeable victim, confidentiality must be breached to warn the victim and alert law enforcement.",
    "Developing Psychological Skills", "Ethics in Psychology")

add_pq("Passage 18", P18_TEXT, "Which fundamental ethical principle of psychological practice justifies breaching confidentiality to protect an innocent third party?",
    "Beneficence and Non-Maleficence (Duty to do no harm and protect human life)",
    ["Consumer Autonomy and Hedonism", "Institutional Profit Maximization", "Observer Subjectivity"],
    "C", "Non-maleficence ('do no harm') and beneficence obligate psychologists to preserve human life; the right of an innocent person to life fundamentally supersedes a client's right to confidentiality.",
    "Developing Psychological Skills", "Ethics in Psychology")

add_pq("Passage 18", P18_TEXT, "Under standard ethical guidelines, which of the following scenarios does NOT permit a breach of clinical confidentiality?",
    "A client confesses that they cheated on an academic college examination three years ago",
    ["A client reveals credible plans and means to commit suicide that evening", "A client discloses active, ongoing physical abuse of an 8-year-old child", "A client makes an explicit threat of murder against an identifiable individual"],
    "D", "Confidentiality exceptions are restricted to imminent physical harm to self/others, child abuse, elder abuse, or court subpoenas; past academic cheating or minor indiscretions do not justify breaking confidentiality.",
    "Developing Psychological Skills", "Ethics in Psychology")

add_pq("Passage 18", P18_TEXT, "In professional ethics, the rule prohibiting a psychologist from entering into a business partnership or romantic relationship with a client is termed:",
    "Prohibition of Dual (Multiple) Relationships",
    ["The Hawthorne Limitation", "The Reciprocal Inhibition Rule", "The Fundamental Attribution Principle"],
    "A", "Ethical standards strictly prohibit dual relationships—combining professional therapeutic roles with personal, commercial, or romantic ties—because they inherently impair objectivity and risk exploitation.",
    "Developing Psychological Skills", "Ethics in Psychology")

add_pq("Passage 18", P18_TEXT, "What documentation must Dr. Radhika immediately complete following this emergency crisis intervention?",
    "Maintain meticulous, objective clinical case notes recording Tarun's exact statements, risk assessment findings, steps taken to warn the victim, and police notifications",
    ["Destroy all counseling records to protect the university from lawsuits", "Post Tarun's clinical transcript on social media to alert the public", "Send the session audio recording to commercial news channels"],
    "B", "In crisis situations, psychologists must maintain thorough, contemporaneous clinical records documenting the assessment of risk, consultations sought, and specific actions taken to safeguard potential victims and notify authorities.",
    "Developing Psychological Skills", "Ethics in Psychology")

# --- PASSAGE 19: Schizophrenia Symptom Classification (M10, P1, Q41-45) ---
P19_TEXT = (
    "Suraj, a 24-year-old clerk, was brought to a psychiatric hospital by his family after six months of deteriorating functioning. "
    "He stated that the Central Intelligence Agency had implanted an electronic radio chip behind his ear that constantly broadcasted "
    "critical commentary about his thoughts ('He is incompetent; he will fail today'). Suraj insisted that the local television news anchors "
    "were speaking in coded messages specifically aimed at him. His speech was disorganized and riddled with neologisms (inventing nonsensical words "
    "like 'flurpatron'). During hospital rounds, Suraj sat motionless in an awkward, rigid posture for eight hours without blinking or responding "
    "to questions, resisting any attempt to move his limbs (waxy flexibility). When not rigid, he displayed flat affect, speaking in a monotone "
    "voice devoid of emotional warmth, and showed complete avolition."
)

add_pq("Passage 19", P19_TEXT, "Suraj's conviction that the CIA implanted a radio chip behind his ear and is broadcasting his thoughts exemplifies which specific type of delusion?",
    "Delusion of Persecution and Thought Insertion",
    ["Delusion of Grandeur", "Delusion of Reference only", "Somatic Symptom Delusion"],
    "C", "Suraj exhibits Delusions of Persecution (believing he is being plotted against/spied on by the CIA) combined with Thought Insertion/broadcasting (belief that alien thoughts or devices are implanted into his mind).",
    "Psychological Disorders", "Schizophrenia")

add_pq("Passage 19", P19_TEXT, "The critical voices Suraj hears running a continuous commentary on his thoughts are classified diagnostically as:",
    "Auditory Hallucinations (a Positive Symptom of Schizophrenia)",
    ["Visual Illusions", "Negative Symptoms of Schizophrenia", "Dissociative Fugue"],
    "D", "Auditory hallucinations—hearing voices commenting on one's actions or conversing with each other—are classic positive symptoms (excesses or distortions of normal perception) in Schizophrenia.",
    "Psychological Disorders", "Schizophrenia")

add_pq("Passage 19", P19_TEXT, "Suraj's eight hours of motionless, rigid posturing and resistance to movement represents which motor manifestation?",
    "Catatonic Posturing / Waxy Flexibility (Catatonia)",
    ["Tardive Dyskinesia", "Manic Hyperactivity", "Panic Attack"],
    "A", "Catatonia in schizophrenia encompasses catatonic stupor (complete immobility and unresponsiveness), catatonic posturing (maintaining rigid awkward postures for hours), and waxy flexibility.",
    "Psychological Disorders", "Schizophrenia")

add_pq("Passage 19", P19_TEXT, "Suraj's flat affect (monotone voice, lack of facial emotion) and avolition (inability to initiate goal-directed action) represent:",
    "Negative Symptoms of Schizophrenia (deficits or absences of normal behaviors)",
    ["Positive Symptoms of Schizophrenia", "Agoraphobic Avoidance", "Bipolar Manic Symptoms"],
    "B", "Negative symptoms reflect a deficit or reduction in normal behavioral repertoire, including: alogia (poverty of speech), avolition (lack of drive), anhedonia (loss of pleasure), and flat/blunted affect.",
    "Psychological Disorders", "Schizophrenia")

add_pq("Passage 19", P19_TEXT, "According to the Neurotransmitter Hypothesis, which biological mechanism is predominantly linked to the positive symptoms of schizophrenia?",
    "Excessive dopamine activity in the mesolimbic neural pathways",
    ["Deficiency of acetylcholine in the neuromuscular junction", "Excessive insulin secretion from the pancreas", "Destruction of myelin sheaths in peripheral sensory nerves"],
    "C", "The Dopamine Hypothesis posits that positive symptoms (delusions, hallucinations) are driven by hyperactivity and hyper-reactivity of dopamine neurotransmission at D2 receptors in the mesolimbic pathway.",
    "Psychological Disorders", "Schizophrenia")

# --- PASSAGE 20: Cattell's 16PF & Rorschach Inkblot (M10, P2, Q46-50) ---
P20_TEXT = (
    "Neha, a candidate for an elite corporate diplomatic assignment, underwent a comprehensive psychological personality assessment. "
    "The organizational psychologist first administered Raymond Cattell's Sixteen Personality Factor Questionnaire (16PF). "
    "Neha scored exceptionally high on Factor H (Boldness/Venturesome), Factor C (Emotional Stability), and Factor Q3 (High Self-Control), "
    "while scoring low on Factor O (Apprehensiveness/Insecurity). To uncover unconscious motives and personality dynamics, the psychologist "
    "then administered the Rorschach Inkblot Test consisting of 10 standardized bilateral symmetrical cards (5 black-and-white, 2 black-and-red, "
    "and 3 multicolored). During the inquiry phase, the psychologist scored Neha's responses across location, determinants (form, color, movement), "
    "and popular vs unique content, finding high whole responses (W) and robust human movement (M) responses."
)

add_pq("Passage 20", P20_TEXT, "In Raymond Cattell's trait theory, what is the conceptual distinction between 'Surface Traits' and 'Source Traits'?",
    "Surface traits are observable clusters of behavior; Source traits are the underlying, fundamental structural dimensions discovered via factor analysis",
    ["Surface traits are genetic; Source traits are linguistic", "Surface traits are unconscious; Source traits are conscious", "Surface traits are found in animals; Source traits are found in humans"],
    "D", "Cattell distinguished Surface Traits (visible behavioral clusters that fluctuate) from Source Traits (deeper, stable underlying structural dimensions derived through factor analysis, as measured by the 16PF).",
    "Self and Personality", "Trait Approaches to Personality")

add_pq("Passage 20", P20_TEXT, "Which statistical mathematical methodology did Raymond Cattell employ to reduce thousands of personality adjectives down to 16 source factors?",
    "Factor Analysis",
    ["Analysis of Variance (ANOVA)", "Multiple Regression", "Chi-Square Test of Independence"],
    "A", "Cattell utilized Factor Analysis, a complex statistical technique that analyzes correlations among large sets of variables to discover underlying latent factors (source traits).",
    "Self and Personality", "Trait Approaches to Personality")

add_pq("Passage 20", P20_TEXT, "The Rorschach Inkblot Test administered to Neha belongs to which broad category of personality assessment instruments?",
    "Projective Techniques",
    ["Self-Report Questionnaires", "Behavioral Direct Observation", "Sociometric Peer Nominations"],
    "B", "The Rorschach Inkblot Test is a classic projective assessment: presenting ambiguous stimuli allows the individual to project unconscious feelings, conflicts, and perceptual organizing styles onto the cards.",
    "Self and Personality", "Assessment of Personality")

add_pq("Passage 20", P20_TEXT, "In scoring the Rorschach Inkblot Test, what does the 'Location' dimension specifically refer to?",
    "Whether the respondent used the whole blot (W), a common detail (D), or an unusual white-space detail (Dd/S)",
    ["Whether the testing occurred in New Delhi or Mumbai", "The physical geographical location of the inkblot card factory", "Whether the response was delivered quickly or slowly"],
    "C", "In Rorschach scoring (Exner Comprehensive System), Location indicates which part of the inkblot was used: Whole inkblot (W), Common large detail (D), Tiny unusual detail (Dd), or White space (S).",
    "Self and Personality", "Assessment of Personality")

add_pq("Passage 20", P20_TEXT, "In Rorschach interpretation, a predominance of 'Human Movement' (M) responses alongside 'Whole' (W) responses typically indicates:",
    "High intellectual capacity, constructive imagination, and mature internal emotional control",
    ["Severe acute catatonia and complete intellectual disability", "Extreme violent psychopathy and lack of empathy", "Complete inability to perceive visual shapes and colors"],
    "D", "In Rorschach psychodiagnostics, W responses indicate integrative capacity and abstract cognitive ambition, while Human Movement (M) reflects creative imagination, internal mental stability, and emotional maturity.",
    "Self and Personality", "Assessment of Personality")

print(f"Total Part 1 questions: {len(part1_qs)} across 20 passages (100 questions).")
assert len(part1_qs) == 100, f"Expected 100 questions, got {len(part1_qs)}"

os.makedirs("mock/psy_units", exist_ok=True)
with open("mock/psy_units/passages_part1.json", "w", encoding="utf-8") as f:
    json.dump(part1_qs, f, indent=2, ensure_ascii=False)
print("Saved mock/psy_units/passages_part1.json successfully!")
