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
unit3_seen = set()
unit3_qs = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in unit3_seen:
        raise ValueError(f"Duplicate in Unit 3: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in Unit 3: {q['questionText'][:80]}")
    unit3_seen.add(norm)
    assert len(q["options"]) == 4, f"Options length error: {q['questionText'][:40]}"
    assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option: {q['questionText'][:40]}"
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"], f"Missing solution: {q['questionText'][:40]}"
    unit3_qs.append(q)

CHAPTER = "Meeting Life Challenges"

# --- SECTION 1: NATURE OF STRESS, TYPES & APPRAISAL (Q1 - Q50) ---

# Q1: Hans Selye definition of stress
opts, c, s = rotate_options(
    "The non-specific response of the body to any demand made upon it",
    ["A specific neurological disease caused exclusively by bacterial infections", "A genetic mental disorder characterized by complete memory loss", "An imaginary state of mind that has zero physiological effects"],
    "A",
    "Hans Selye, known as the father of modern stress research, defined stress as 'the non-specific response of the body to any demand made upon it.'\nHence, Option {{CORR}} is correct.",
    "Identifies Hans Selye's classic definition of stress."
)
add_q(make_question(CHAPTER, "Nature of Stress", "How did endocrinologist Hans Selye formally define 'stress'?", opts, c, s, 1))

# Q2: Eustress vs Distress
opts, c, s = rotate_options(
    "Eustress is positive, motivating stress that enhances performance, whereas distress is negative stress that causes physical and mental wear and tear",
    ["Eustress causes heart attacks, while distress promotes athletic health", "Eustress is experienced only by infants, while distress is experienced only by adults", "Both terms refer exclusively to financial bankruptcy"],
    "B",
    "Selye distinguished between Eustress (beneficial, positive stress of optimal level that motivates growth and peak performance) and Distress (harmful, debilitating stress that drains resources and damages health).\nHence, Option {{CORR}} is correct.",
    "Contrasts eustress with distress."
)
add_q(make_question(CHAPTER, "Nature of Stress", "In stress literature, what is the crucial distinction between 'eustress' and 'distress'?", opts, c, s, 2))

# Q3: Cognitive Theory of Stress (Lazarus and Folkman)
opts, c, s = rotate_options(
    "Stress is determined by an individual's cognitive appraisal of the situation and their assessment of coping resources",
    ["Stress is determined strictly by the physical decibel level of environmental noise", "Stress only occurs when a person is deprived of physical food and water", "Stress is an unalterable biological reflex that bypasses the human brain completely"],
    "C",
    "Richard Lazarus and Susan Folkman formulated the Cognitive Theory of Stress, emphasizing that stress is not merely in the external event itself, but in the individual's cognitive appraisal of the threat and available coping resources.\nHence, Option {{CORR}} is correct.",
    "Summarizes Lazarus and Folkman's cognitive theory of stress."
)
add_q(make_question(CHAPTER, "Cognitive Appraisal of Stress", "According to Richard Lazarus and Susan Folkman, what primarily determines whether an event is experienced as stressful?", opts, c, s, 3))

# Q4: Primary Appraisal Categories
opts, c, s = rotate_options(
    "Positive, Neutral, or Negative; if negative, appraised as Harm, Threat, or Challenge",
    ["Oral, Anal, Phallic, or Genital", "Physical, Chemical, Biological, or Geological", "Alarm, Resistance, Exhaustion, or Recovery"],
    "D",
    "In Lazarus's model, Primary Appraisal evaluates whether an event is positive, neutral, or negative. Negative events are further appraised as: Harm (damage already incurred), Threat (anticipated future harm), or Challenge (confident anticipation of mastery).\nHence, Option {{CORR}} is correct.",
    "Lists primary appraisal categories and negative event appraisals."
)
add_q(make_question(CHAPTER, "Cognitive Appraisal of Stress", "In Richard Lazarus's model, what does 'Primary Appraisal' evaluate regarding an incoming life event?", opts, c, s, 4))

# Q5: Harm, Threat, and Challenge in Primary Appraisal
opts, c, s = rotate_options(
    "Harm is damage already sustained; Threat is anticipated future damage; Challenge is expectations of growth and mastery",
    ["Harm is future expectation; Threat is past damage; Challenge is complete surrender", "Harm, threat, and challenge are identical synonyms with zero distinction", "Harm is biological illness; Threat is a computer virus; Challenge is an athletic game"],
    "A",
    "In primary appraisal of negative events: Harm refers to assessment of damage already inflicted; Threat refers to anticipated potential damage in the future; Challenge refers to an opportunity for mastery, growth, and gain.\nHence, Option {{CORR}} is correct.",
    "Differentiates harm, threat, and challenge in cognitive appraisal."
)
add_q(make_question(CHAPTER, "Cognitive Appraisal of Stress", "How does Lazarus differentiate between 'harm', 'threat', and 'challenge' during primary appraisal?", opts, c, s, 5))

# Q6: Secondary Appraisal
opts, c, s = rotate_options(
    "Assessment of one's available coping options, resources, and whether they are sufficient to meet the demand",
    ["Deciding what meal to cook for dinner after work", "Calculating the arithmetic sum of financial taxes", "Observing the physical color of the surrounding furniture"],
    "B",
    "Secondary appraisal involves evaluating one's coping abilities and available resources (mental, physical, personal, social) and determining whether they are sufficient to overcome or mitigate the stressor.\nHence, Option {{CORR}} is correct.",
    "Defines secondary appraisal in Lazarus's model."
)
add_q(make_question(CHAPTER, "Cognitive Appraisal of Stress", "What is the primary psychological function of 'Secondary Appraisal' in Lazarus's theory?", opts, c, s, 6))

# Q7: Match Appraisal Components
add_q(make_match_question(
    CHAPTER, "Cognitive Appraisal of Stress",
    "Match List I (Cognitive Appraisal Phase/Type) with List II (Core Psychological Focus):",
    [("A", "Primary Appraisal"), ("B", "Secondary Appraisal"), ("C", "Threat Appraisal"), ("D", "Challenge Appraisal")],
    [("I", "Anticipated potential future damage or loss"), ("II", "Expectation of positive mastery, gain, and competence"), ("III", "Evaluating whether an event is benign, irrelevant, or harmful"), ("IV", "Assessing available coping resources and strategies to meet demands")],
    "A-III, B-IV, C-I, D-II", "A",
    "Primary: evaluating event meaning (A-III); Secondary: assessing coping resources (B-IV); Threat: anticipated future damage (C-I); Challenge: expectation of mastery (D-II).",
    "Accurately links cognitive appraisal concepts with descriptions."
))

# Q8: Signs and Symptoms of Stress - Physical
opts, c, s = rotate_options(
    "Headaches, hypertension, gastrointestinal upsets, muscle tension, and rapid heart rate",
    ["Increased bone density and superhuman physical strength", "Immediate cure of all existing viral and bacterial infections", "Total permanent physical paralysis of the vocal cords"],
    "A",
    "Physical symptoms of stress include chronic tension headaches, elevated blood pressure (hypertension), gastrointestinal disturbances, rapid shallow breathing, and persistent muscular tension.\nHence, Option {{CORR}} is correct.",
    "Lists physical signs and symptoms of stress."
)
add_q(make_question(CHAPTER, "Signs and Symptoms of Stress", "Which of the following constitutes typical physiological/physical symptoms of chronic stress?", opts, c, s, 8))

# Q9: Signs and Symptoms of Stress - Emotional
opts, c, s = rotate_options(
    "Mood swings, persistent irritability, anxiety, feelings of helplessness, and depression",
    ["Uncontrollable joyful laughter at all hours of the day", "Complete spiritual enlightenment with zero personal desires", "Total inability to feel any physical pain from pinpricks"],
    "B",
    "Emotional symptoms of stress include irritability, volatile mood swings, chronic anxiety, feelings of being overwhelmed, emotional numbness, and depressive episodes.\nHence, Option {{CORR}} is correct.",
    "Identifies emotional symptoms of stress."
)
add_q(make_question(CHAPTER, "Signs and Symptoms of Stress", "Which group of symptoms represents emotional manifestations of stress?", opts, c, s, 9))

# Q10: Signs and Symptoms of Stress - Cognitive
opts, c, s = rotate_options(
    "Poor concentration, memory lapses, intrusive worrying thoughts, and impaired decision-making",
    ["Instant photographic memory of every dictionary page", "Speaking multiple foreign languages fluently without studying", "Mathematical calculation of prime numbers at computer speed"],
    "C",
    "Cognitive symptoms of stress include difficulty concentrating, mental confusion, reduced attention span, frequent memory lapses, intrusive worry, and indecisiveness.\nHence, Option {{CORR}} is correct.",
    "Identifies cognitive symptoms of stress."
)
add_q(make_question(CHAPTER, "Signs and Symptoms of Stress", "Which psychological changes reflect cognitive symptoms of stress?", opts, c, s, 10))

# Q11: Signs and Symptoms of Stress - Behavioural
opts, c, s = rotate_options(
    "Disrupted sleep patterns, appetite changes (overeating/undereating), increased substance use (smoking/alcohol), and social withdrawal",
    ["Running forty miles every morning without feeling tired", "Writing twenty scholarly books in a single weekend", "Cleaning the entire city's public parks every night"],
    "D",
    "Behavioural symptoms of stress include disrupted sleep (insomnia/hypersomnia), altered eating habits, increased consumption of alcohol or nicotine, absenteeism, and social withdrawal.\nHence, Option {{CORR}} is correct.",
    "Identifies behavioural symptoms of stress."
)
add_q(make_question(CHAPTER, "Signs and Symptoms of Stress", "Which of the following behavioral changes is typically observed in an individual experiencing high chronic stress?", opts, c, s, 11))

# Q12: Psychological Stress Types
opts, c, s = rotate_options(
    "Frustration, Conflict, Internal pressure, and Social pressure",
    ["Sattva, Rajas, Tamas, and Moksha", "Oral, Anal, Phallic, and Genital", "Operations, Contents, Products, and Cells"],
    "A",
    "Psychological stress originates internally and includes four major categories: Frustration (blocking of goals), Conflict (competing incompatible motives), Internal pressure (unrealistic self-demands), and Social pressure (demands from others).\nHence, Option {{CORR}} is correct.",
    "Lists the four major types of psychological stress."
)
add_q(make_question(CHAPTER, "Types of Stress", "Which set comprises the four major types of psychological stress identified in NCERT?", opts, c, s, 12))

# Q13: Frustration definition
opts, c, s = rotate_options(
    "Results from the blocking of needs, motives, and goal-directed behaviour by external barriers or personal limitations",
    ["Occurs when an individual receives an unexpected cash prize", "Occurs when an individual completes a puzzle with ease", "Occurs during deep stage-4 non-REM sleep"],
    "A",
    "Frustration results from the blocking or thwarting of needs and motives by something or someone that prevents an individual from reaching a desired goal (e.g. discrimination, delays, lack of resources).\nHence, Option {{CORR}} is correct.",
    "Defines psychological frustration."
)
add_q(make_question(CHAPTER, "Types of Stress", "In the psychology of stress, 'frustration' arises specifically when:", opts, c, s, 13))

# Q14: Conflict of Motives (Types of Conflict)
opts, c, s = rotate_options(
    "Approach-approach conflict, Avoidance-avoidance conflict, and Approach-avoidance conflict",
    ["Conscious conflict, Preconscious conflict, and Subconscious conflict", "Verbal conflict, Non-verbal conflict, and Performance conflict", "Physical conflict, Chemical conflict, and Biological conflict"],
    "B",
    "Conflict arises from incompatible motives, categorized as: Approach-approach (choosing between two desirable goals), Avoidance-avoidance (choosing between two undesirable goals), and Approach-avoidance (a single goal has both positive and negative qualities).\nHence, Option {{CORR}} is correct.",
    "Identifies the three types of motivational conflict."
)
add_q(make_question(CHAPTER, "Types of Stress", "Which three classic types of motivational conflict were formulated in psychological literature?", opts, c, s, 14))

# Q15: Internal Pressure vs Social Pressure
opts, c, s = rotate_options(
    "Internal pressure stems from unrealistic personal beliefs and high expectations of oneself, while social pressure stems from external demands imposed by family, peers, and society",
    ["Internal pressure is physical blood pressure, while social pressure is atmospheric weather pressure", "Internal pressure only affects elderly people, while social pressure only affects infants", "Internal pressure is identical to eustress, while social pressure is identical to distress"],
    "C",
    "Internal pressures stem from an individual's own high self-expectations and perfectionist beliefs ('I must succeed at everything'), whereas social pressures arise from external expectations of parents, teachers, and peer groups.\nHence, Option {{CORR}} is correct.",
    "Differentiates internal pressure from social pressure."
)
add_q(make_question(CHAPTER, "Types of Stress", "How is 'internal pressure' distinguished from 'social pressure' in stress psychology?", opts, c, s, 15))

# Q16: Sources of Stress: Life Events, Hassles, Traumatic Events
opts, c, s = rotate_options(
    "Life Events (major disruptions like divorce), Everyday Hassles (daily minor irritants like traffic), and Traumatic Events (extreme disasters like earthquakes)",
    ["Biological drives, Sensory reflexes, and Motor habits", "Introversion, Extraversion, and Neuroticism", "Somatic conversion, Dissociative fugue, and Depersonalisation"],
    "D",
    "The three recognized sources of stress are: (1) Major Life Events (divorce, bereavement, job loss), (2) Everyday Hassles (daily minor frustrations, traffic, arguments), and (3) Traumatic Events (terrorist attacks, tsunamis, serious accidents).\nHence, Option {{CORR}} is correct.",
    "Categorizes the three sources of stress."
)
add_q(make_question(CHAPTER, "Sources of Stress", "What are the three primary sources of stress categorized according to their severity and duration?", opts, c, s, 16))

# Q17: Holmes and Rahe Social Readjustment Rating Scale (SRRS)
opts, c, s = rotate_options(
    "A standardized scale assigning numerical Life Change Units (LCUs) to major life events, measuring cumulative stress and illness risk",
    ["An intelligence test measuring abstract spatial reasoning skills", "A projective inkblot test measuring unconscious hostile aggression", "A clinical diagnostic checklist for diagnosing severe schizophrenia"],
    "A",
    "Holmes and Rahe developed the Social Readjustment Rating Scale (SRRS), which assigns numerical weights (Life Change Units) to events (e.g. Death of a spouse = 100 LCUs) to measure vulnerability to physical illness.\nHence, Option {{CORR}} is correct.",
    "Describes the Holmes and Rahe SRRS."
)
add_q(make_question(CHAPTER, "Sources of Stress", "The Social Readjustment Rating Scale (SRRS) constructed by Holmes and Rahe measures:", opts, c, s, 17))

# Q18: Everyday Hassles Impact
opts, c, s = rotate_options(
    "Daily minor irritants, traffic jams, and small arguments can accumulate over time and cause significant psychological and physical health damage",
    ["Everyday hassles have zero biological impact and are completely forgotten in seconds", "Everyday hassles only affect individuals who have severe intellectual disability", "Everyday hassles immediately cause schizophrenia within twenty-four hours"],
    "B",
    "Research indicates that the continuous accumulation of everyday hassles (commuting stress, quarrels, petty delays) can wear down physiological resistance and often exerts a greater cumulative toll on daily health than rare major life events.\nHence, Option {{CORR}} is correct.",
    "Explains the cumulative toll of everyday hassles."
)
add_q(make_question(CHAPTER, "Sources of Stress", "What does psychological research reveal regarding the impact of 'everyday hassles' on human health?", opts, c, s, 18))

# Q19: Burnout definition
opts, c, s = rotate_options(
    "A state of physical, emotional, and mental exhaustion resulting from long-term involvement in emotionally demanding situations",
    ["A temporary state of physical sleepiness after eating a heavy meal", "A biological injury resulting from physical fire burns on the skin", "A sudden acute panic attack triggered by seeing a venomous snake"],
    "C",
    "Burnout is defined as a state of chronic physical, emotional, and mental exhaustion produced by sustained engagement in emotionally demanding work, characterized by emotional exhaustion, depersonalization, and reduced personal accomplishment.\nHence, Option {{CORR}} is correct.",
    "Defines burnout."
)
add_q(make_question(CHAPTER, "Effects of Stress", "In occupational health psychology, 'burnout' is characterized as:", opts, c, s, 19))

# Q20: Three Dimensions of Burnout (Maslach)
opts, c, s = rotate_options(
    "Emotional Exhaustion, Depersonalisation (cynicism), and Reduced Personal Accomplishment",
    ["Physical paralysis, Visual blindness, and Auditory mutism", "Delusions, Hallucinations, and Catatonic posturing", "Id impulses, Ego defenses, and Superego guilt"],
    "D",
    "Christina Maslach conceptualized burnout as comprising three interrelated dimensions: Emotional Exhaustion (feeling drained), Depersonalization (cynical, detached attitude toward clients/work), and Reduced Personal Accomplishment (feeling ineffective).\nHence, Option {{CORR}} is correct.",
    "Identifies Maslach's three dimensions of burnout."
)
add_q(make_question(CHAPTER, "Effects of Stress", "According to Christina Maslach, burnout is multidimensionally structured around which three components?", opts, c, s, 20))

# Q21: Hans Selye's General Adaptation Syndrome (GAS) Stages
add_q(make_sequence_question(
    CHAPTER, "General Adaptation Syndrome",
    "Arrange the three sequential stages of Hans Selye's General Adaptation Syndrome (GAS) in correct order:",
    [
        ("A", "Alarm Reaction Stage"),
        ("B", "Resistance Stage"),
        ("C", "Exhaustion Stage")
    ],
    "A, B, C", "A",
    "Hans Selye's General Adaptation Syndrome (GAS) progresses through three invariant stages: (1) Alarm Reaction stage (activation of fight-or-flight mechanisms) -> (2) Resistance stage (body adapts to ongoing stress) -> (3) Exhaustion stage (depletion of bodily reserves).",
    "Sequences the three stages of the General Adaptation Syndrome."
))

# Q22: Alarm Reaction Stage (GAS)
opts, c, s = rotate_options(
    "The initial fight-or-flight response triggered by the sympathetic nervous system and adrenal glands, releasing adrenaline and cortisol",
    ["The complete collapse of physical body systems leading to death", "The phase where the body's resources return completely to resting baseline", "The phase of unconscious dreaming during non-REM sleep"],
    "A",
    "In the Alarm Reaction stage of GAS, the presence of a stressor triggers immediate fight-or-flight activation via the sympathetic-adrenal-medullary axis, releasing adrenaline and glucocorticoids (cortisol) to mobilize energy.\nHence, Option {{CORR}} is correct.",
    "Describes the alarm reaction stage of GAS."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "What physiological processes characterize the 'Alarm Reaction stage' in Hans Selye's General Adaptation Syndrome?", opts, c, s, 22))

# Q23: Resistance Stage (GAS)
opts, c, s = rotate_options(
    "The body attempts to adapt to the prolonged stressor; physiological arousal remains elevated while coping mechanisms are maintained",
    ["The immediate sudden cessation of all heartbeats and breathing", "The complete elimination of all hormones from the bloodstream", "The individual experiences zero physical sensations and enters a coma"],
    "B",
    "If the stressor continues, the body enters the Resistance stage; physiological symptoms of the alarm reaction disappear, but internal resistance remains well above normal as the body uses resources to cope with the ongoing demand.\nHence, Option {{CORR}} is correct.",
    "Describes the resistance stage of GAS."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "What occurs during the 'Resistance stage' of the General Adaptation Syndrome?", opts, c, s, 23))

# Q24: Exhaustion Stage (GAS)
opts, c, s = rotate_options(
    "Prolonged exposure to the stressor drains the body's physiological reserves, leading to breakdown and 'diseases of adaptation' (e.g. ulcers, cardiac disease)",
    ["The body develops permanent biological immunity to all human illnesses", "The individual acquires superior photographic memory and high IQ", "The endocrine system permanently shuts down without causing any harm"],
    "C",
    "If stress continues unabated, the body reaches the Exhaustion stage; adaptive energy reserves are completely depleted, susceptibility to physical collapse increases, and 'diseases of adaptation' (hypertension, ulcers, heart disease) manifest.\nHence, Option {{CORR}} is correct.",
    "Describes the exhaustion stage of GAS."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "In Hans Selye's GAS model, what characterizes the 'Exhaustion stage'?", opts, c, s, 24))

# Q25: Diseases of Adaptation (Selye)
opts, c, s = rotate_options(
    "High blood pressure, peptic ulcers, heart disease, and rheumatoid arthritis caused by chronic physiological stress arousal",
    ["Viral influenza, common cold, and bacterial throat infections", "Genetic chromosomal disorders like Down syndrome", "Physical bone fractures caused by motor vehicle collisions"],
    "D",
    "Selye coined the term 'diseases of adaptation' to describe chronic illnesses (such as hypertension, ulcers, coronary disease, and asthma) that develop as a direct consequence of prolonged stress-induced physiological exhaustion.\nHence, Option {{CORR}} is correct.",
    "Lists diseases of adaptation identified by Selye."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "Which medical conditions were termed 'diseases of adaptation' by Hans Selye?", opts, c, s, 25))

# Q26: Psychoneuroimmunology (PNI) Definition
opts, c, s = rotate_options(
    "The scientific field studying the complex interactions between the brain (psycho/neuro), the endocrine system, and the immune system",
    ["The study of ancient surgical tools used in prehistoric societies", "The branch of botany classifying medicinal plants in rainforests", "The mathematical calculation of actuarial life insurance tables"],
    "A",
    "Psychoneuroimmunology (PNI) is the interdisciplinary field investigating the reciprocal links between psychological processes, the central nervous system, endocrine hormones, and immune functioning.\nHence, Option {{CORR}} is correct.",
    "Defines psychoneuroimmunology."
)
add_q(make_question(CHAPTER, "Stress and Immune System", "What does the scientific discipline of 'Psychoneuroimmunology' (PNI) investigate?", opts, c, s, 26))

# Q27: How Stress Suppresses the Immune System
opts, c, s = rotate_options(
    "Chronic stress triggers sustained release of cortisol, which suppresses the production and activity of white blood cells (leukocytes) and natural killer cells",
    ["Stress physically destroys the bones of the skeletal ribcage", "Stress prevents oxygen from entering through the bronchial tubes", "Stress instantly kills all red blood cells in the femoral artery"],
    "B",
    "Chronic stress stimulates the hypothalamic-pituitary-adrenal (HPA) axis to release corticosteroids (cortisol); sustained elevated cortisol levels suppress leukocyte production, decrease antibody synthesis, and impair natural killer (NK) cell cytotoxicity.\nHence, Option {{CORR}} is correct.",
    "Explains physiological mechanism of stress-induced immunosuppression."
)
add_q(make_question(CHAPTER, "Stress and Immune System", "Through which biological pathway does chronic psychological stress impair immune system efficiency?", opts, c, s, 27))

# Q28: Immune System Cells: T-cells, B-cells, NK-cells
opts, c, s = rotate_options(
    "T-cells destroy infected cells; B-cells produce antibodies; Natural Killer (NK) cells attack tumor cells and virus-infected cells",
    ["T-cells digest food; B-cells pump blood; NK-cells filter urine", "T-cells transmit nerve impulses; B-cells store visual memories; NK-cells regulate balance", "All three cell types are identical red blood cells carrying oxygen"],
    "C",
    "Leukocytes include: T-cells (cell-mediated immunity, destroying infected cells), B-cells (humoral immunity, producing circulating antibodies), and Natural Killer (NK) cells (destroying viral infections and malignant tumor cells).\nHence, Option {{CORR}} is correct.",
    "Identifies functions of T-cells, B-cells, and Natural Killer cells."
)
add_q(make_question(CHAPTER, "Stress and Immune System", "In the human immune response, what are the primary protective functions of T-cells, B-cells, and Natural Killer (NK) cells?", opts, c, s, 28))

# Q29: Endler and Parker Coping Strategies
opts, c, s = rotate_options(
    "Task-oriented strategy, Emotion-oriented strategy, and Avoidance-oriented strategy",
    ["Oral strategy, Anal strategy, and Phallic strategy", "Extrapunitive strategy, Intropunitive strategy, and Impunitive strategy", "Sattvic strategy, Rajasic strategy, and Tamasic strategy"],
    "D",
    "Endler and Parker classified coping into three broad strategies: (1) Task-oriented strategy (focusing on solving the problem), (2) Emotion-oriented strategy (managing emotional distress), and (3) Avoidance-oriented strategy (denial, distraction).\nHence, Option {{CORR}} is correct.",
    "Lists Endler and Parker's three coping strategies."
)
add_q(make_question(CHAPTER, "Coping with Stress", "Psychologists Endler and Parker categorized human coping strategies into which three types?", opts, c, s, 29))

# Q30: Match Endler and Parker Coping Strategies with Examples
add_q(make_match_question(
    CHAPTER, "Coping with Stress",
    "Match List I (Endler & Parker Coping Strategy) with List II (Behavioral Illustration):",
    [("A", "Task-oriented strategy"), ("B", "Emotion-oriented strategy"), ("C", "Avoidance-oriented (Distraction)"), ("D", "Avoidance-oriented (Social Diversion)")],
    [("I", "Going to watch a movie or playing video games to forget about the examination"), ("II", "Analyzing the exam syllabus, creating a revision schedule, and studying systematically"), ("III", "Calling friends to chat and visit shopping malls to keep one's mind off test worries"), ("IV", "Venting anger, crying, and dwelling on feelings of helplessness and anxiety")],
    "A-II, B-IV, C-I, D-III", "A",
    "Task-oriented: studying/planning (A-II); Emotion-oriented: venting/crying (B-IV); Avoidance distraction: movie/games (C-I); Avoidance social: calling friends/shopping (D-III).",
    "Correctly matches Endler and Parker's coping categories with realistic behaviors."
))

# Q31: Lazarus and Folkman Coping Dimensions
opts, c, s = rotate_options(
    "Problem-focused coping (acting directly on the environment to alter the stressor) and Emotion-focused coping (regulating internal emotional distress)",
    ["Biological coping and Chemical coping", "Conscious coping and Unconscious coping", "Individual coping and Societal coping"],
    "A",
    "Lazarus and Folkman conceptualized coping into two broad categories: Problem-focused coping (direct actions aimed at altering, managing, or eliminating the stressor) and Emotion-focused coping (efforts to regulate emotional distress and anxiety).\nHence, Option {{CORR}} is correct.",
    "Distinguishes problem-focused from emotion-focused coping."
)
add_q(make_question(CHAPTER, "Coping with Stress", "How did Richard Lazarus and Susan Folkman classify coping mechanisms?", opts, c, s, 31))

# Q32: Problem-Focused Coping example
opts, c, s = rotate_options(
    "A student struggling in physics hires a tutor, establishes a daily study timetable, and solves past papers",
    ["A student feeling anxious about physics goes to sleep for fifteen hours", "A student cries in the bathroom and consumes three boxes of chocolates", "A student claims physics is an imaginary subject invented by aliens"],
    "B",
    "Problem-focused coping attacks the root cause of the stress directly through problem-solving, information seeking, time management, and action planning (e.g. hiring a tutor and studying).\nHence, Option {{CORR}} is correct.",
    "Identifies a concrete example of problem-focused coping."
)
add_q(make_question(CHAPTER, "Coping with Stress", "Which of the following scenarios demonstrates 'problem-focused coping'?", opts, c, s, 32))

# Q33: Emotion-Focused Coping example
opts, c, s = rotate_options(
    "Practicing deep breathing, reappraising an unavoidable flight delay positively, and talking to a friend for comfort",
    ["Confronting the airline pilot and demanding to take over the cockpit controls", "Revising a computer software code to fix an error", "Constructing an architectural scale model of an airport terminal"],
    "C",
    "Emotion-focused coping is aimed at mitigating internal emotional distress through cognitive reappraisal, acceptance, emotional expression, and relaxation techniques when the external stressor cannot be immediately altered.\nHence, Option {{CORR}} is correct.",
    "Identifies an example of emotion-focused coping."
)
add_q(make_question(CHAPTER, "Coping with Stress", "When an external stressful situation is entirely unalterable (such as bereavement), which coping approach is most adaptive?", opts, c, s, 33))

# Q34: Stress-Resistant Personality (Suzanne Kobasa)
opts, c, s = rotate_options(
    "Psychological Hardiness characterized by the '3 Cs': Commitment, Control, and Challenge",
    ["Type A personality characterized by intense hostility and time urgency", "Tamas Guna characterized by lethargy, sloth, and dark depression", "Extrapunitive personality characterized by blaming others for all failures"],
    "D",
    "Suzanne Kobasa identified the 'stress-resistant personality' (or Psychological Hardiness), finding that executives who stayed healthy under severe stress exhibited the '3 Cs': Commitment, Control, and Challenge.\nHence, Option {{CORR}} is correct.",
    "Identifies Suzanne Kobasa's 3 Cs of psychological hardiness."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "Suzanne Kobasa identified the 'stress-resistant personality' (Hardiness) as consisting of which three core components ('The 3 Cs')?", opts, c, s, 34))

# Q35: Commitment (The 3 Cs of Hardiness)
opts, c, s = rotate_options(
    "A deep sense of purpose, involvement, and dedication to one's work, family, values, and community",
    ["A commitment to avoid all human contact and live in total solitary isolation", "A legal contractual obligation enforced by police and criminal courts", "A commitment to consume high-calorie junk food during stressful examination weeks"],
    "A",
    "In Kobasa's hardiness model, Commitment represents an active engagement and deep sense of purpose in life; hardy people throw themselves enthusiastically into work, family, and relationships rather than feeling alienated.\nHence, Option {{CORR}} is correct.",
    "Defines commitment in psychological hardiness."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "Within Kobasa's framework of psychological hardiness, what does 'Commitment' mean?", opts, c, s, 35))

# Q36: Control (The 3 Cs of Hardiness)
opts, c, s = rotate_options(
    "An internal locus of control, believing that one can influence life events and outcomes rather than being helpless victims of fate",
    ["Dictating every movement of family members through tyrannical discipline", "Submitting completely to astrology and believing human choices have zero effect", "Allowing employers to dictate one's personal thoughts and moral beliefs"],
    "B",
    "Control in the hardiness model reflects an internal locus of control: the conviction that one's personal decisions and actions can substantially influence the course and outcome of events, rather than feeling like a passive victim.\nHence, Option {{CORR}} is correct.",
    "Defines control in psychological hardiness."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "How is 'Control' conceptualized as a dimension of psychological hardiness?", opts, c, s, 36))

# Q37: Challenge (The 3 Cs of Hardiness)
opts, c, s = rotate_options(
    "Viewing change and unexpected life transitions as stimulating opportunities for personal growth rather than as catastrophic threats",
    ["Challenging colleagues to physical street fights whenever a disagreement occurs", "Demanding that external life remain 100% unchanging and frozen in time", "Feeling overwhelmed with terrifying dread at the slightest daily alteration"],
    "C",
    "Challenge in hardiness means perceiving change, disruptions, and demands not as catastrophic threats to security, but as positive challenges that offer valuable opportunities for learning, growth, and development.\nHence, Option {{CORR}} is correct.",
    "Defines challenge in psychological hardiness."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "In Kobasa's theory of hardiness, an individual high on 'Challenge' typically perceives life changes as:", opts, c, s, 37))

# Q38: Life Skills for Stress Management
opts, c, s = rotate_options(
    "Assertiveness, Time Management, Rational Thinking, Relationships, Self-Care, and Overcoming Unhelpful Habits",
    ["Aggressive fighting, Manipulation, Gambling, and Silent isolation", "Passive compliance, Social withdrawal, Procrastination, and Smoking", "Hypnotic trance, Astrological forecasting, and Rote memorization"],
    "D",
    "NCERT identifies key life skills for stress resistance: Assertiveness, Time Management, Rational Thinking, Building positive relationships, Self-care, and Overcoming unhelpful habits.\nHence, Option {{CORR}} is correct.",
    "Lists essential life skills for stress management."
)
add_q(make_question(CHAPTER, "Life Skills", "Which of the following constitutes essential 'Life Skills' advocated for coping with life challenges and fostering positive health?", opts, c, s, 38))

# Q39: Assertiveness Life Skill
opts, c, s = rotate_options(
    "Expressing one's feelings, needs, opinions, and rights clearly, honestly, and confidently without being aggressive or passive",
    ["Shouting violently and bullying colleagues to force submission", "Silently agreeing to every unreasonable demand while feeling resentful inside", "Lying about one's credentials to win an employment promotion"],
    "A",
    "Assertiveness is a core life skill involving expressing one's thoughts, emotions, and boundaries directly, honestly, and respectfully, maintaining self-respect without violating the rights of others.\nHence, Option {{CORR}} is correct.",
    "Defines assertiveness."
)
add_q(make_question(CHAPTER, "Life Skills", "In life skills education, 'assertiveness' is formally defined as:", opts, c, s, 39))

# Q40: Time Management Life Skill
opts, c, s = rotate_options(
    "Prioritizing tasks, organizing activities, delegating when appropriate, and setting realistic schedules to reduce crisis deadlines",
    ["Doing all tasks simultaneously at the final minute under panic", "Spending ten hours daily checking smartphone notifications", "Never writing down deadlines and relying on random luck"],
    "B",
    "Effective time management involves realistic scheduling, distinguishing urgent from important tasks, setting realistic goals, and organizing time to avoid panic deadlines and chronic stress.\nHence, Option {{CORR}} is correct.",
    "Identifies effective time management principles."
)
add_q(make_question(CHAPTER, "Life Skills", "What are the core principles of effective 'Time Management' as a stress reduction skill?", opts, c, s, 40))

# Q41: Rational Thinking (Albert Ellis basis)
opts, c, s = rotate_options(
    "Challenging and replacing irrational, distorted beliefs ('I must be loved by everyone') with realistic, objective evaluations",
    ["Believing that one minor setback proves one is a total lifetime failure", "Conforming mindlessly to superstition and black magic rituals", "Suppressing all logical reasoning and acting on instant impulse"],
    "C",
    "Rational thinking involves monitoring internal self-talk, disputing irrational automatic beliefs (e.g. catastrophizing, black-and-white thinking), and replacing them with flexible, reality-based assessments.\nHence, Option {{CORR}} is correct.",
    "Explains rational thinking as a life skill."
)
add_q(make_question(CHAPTER, "Life Skills", "As a stress management life skill, 'rational thinking' involves:", opts, c, s, 41))

# Q42: Social Support Types
opts, c, s = rotate_options(
    "Tangible support (material aid, money, goods), Informational support (advice, guidance), and Emotional support (empathy, listening, reassurance)",
    ["Physical support, Chemical support, and Geological support", "Oral support, Anal support, and Phallic support", "Conscious support, Subconscious support, and Unconscious support"],
    "D",
    "Social support operates through three primary modes: Tangible support (financial aid, goods, material services), Informational support (guidance, feedback, factual advice), and Emotional support (comfort, empathy, unconditional affection).\nHence, Option {{CORR}} is correct.",
    "Categorizes the three forms of social support."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "Social support that buffers against stress is typically categorized into which three forms?", opts, c, s, 42))

# Q43: Match Forms of Social Support with Examples
add_q(make_match_question(
    CHAPTER, "Promoting Positive Health",
    "Match List I (Type of Social Support) with List II (Practical Behavioral Example):",
    [("A", "Tangible Support"), ("B", "Informational Support"), ("C", "Emotional Support"), ("D", "Network Support")],
    [("I", "A senior teacher advises a student on study methods and recommended reference books"), ("II", "A close friend listens attentively to distress and provides comfort and warmth"), ("III", "A relative lends financial funds and transport vehicles during an emergency"), ("IV", "Belonging to a sports club or community group that fosters a sense of social belonging")],
    "A-III, B-I, C-II, D-IV", "A",
    "Tangible: lending money/vehicles (A-III); Informational: study advice/guidance (B-I); Emotional: listening/warmth (C-II); Network: belonging to club/community (D-IV).",
    "Correctly matches forms of social support to practical illustrations."
))

# Q44: Relaxation Techniques (Progressive Muscle Relaxation)
opts, c, s = rotate_options(
    "Systematically tensing and then relaxing specific muscle groups throughout the body to achieve deep muscular and autonomic calmness",
    ["Drinking five cups of double-espresso coffee in rapid succession", "Engaging in explosive shouting matches to vent vocal energy", "Running up five flights of stairs carrying heavy backpacks"],
    "A",
    "Progressive Muscle Relaxation (PMR), developed by Edmund Jacobson, trains individuals to sequentially tense and consciously release distinct muscle groups, inducing profound physical and autonomic relaxation.\nHence, Option {{CORR}} is correct.",
    "Describes Progressive Muscle Relaxation."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "What does 'Progressive Muscle Relaxation' as a stress reduction technique involve?", opts, c, s, 44))

# Q45: Biofeedback Technique
opts, c, s = rotate_options(
    "Using electronic instruments to monitor physiological responses (e.g. heart rate, muscle tension) and training individuals to gain voluntary control over them",
    ["Administering psychoactive pharmaceutical tranquilizers to sedate patients", "Observing the movement of live bacterial cultures under high-power optical microscopes", "Answering standardized multiple-choice personality questions on a computer"],
    "B",
    "Biofeedback uses sensitive electronic monitoring equipment to provide real-time physiological feedback (e.g., EMG for muscle tension, skin conductance, heart rate), teaching individuals voluntary control over involuntary bodily processes.\nHence, Option {{CORR}} is correct.",
    "Defines biofeedback."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "In clinical stress management, what does the technique of 'Biofeedback' entail?", opts, c, s, 45))

# Q46: Creative Visualization
opts, c, s = rotate_options(
    "Using guided imagery to mentally visualize peaceful, tranquil scenes or successful problem outcomes to induce relaxation",
    ["Drawing abstract sketches on canvas using acrylic paints", "Watching television crime dramas late at night", "Memorizing long sequences of random numbers"],
    "C",
    "Creative visualization is a subjective relaxation technique where individuals close their eyes and vividly imagine serene, tranquil settings (e.g., a quiet beach or mountain meadow), reducing physiological tension.\nHence, Option {{CORR}} is correct.",
    "Explains creative visualization."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "How does 'Creative Visualization' operate as a stress reduction technique?", opts, c, s, 46))

# Q47: Stress Inoculation Training (Donald Meichenbaum)
opts, c, s = rotate_options(
    "A cognitive-behavioural technique comprising three phases: Assessment, Stress reduction techniques, and Application/Follow-through",
    ["Injecting biological vaccines into the bloodstream to kill viruses", "Subjecting individuals to severe electrical shocks to build pain endurance", "Hypnotizing individuals to erase memories of early childhood"],
    "D",
    "Donald Meichenbaum developed Stress Inoculation Training (SIT), a CBT approach that inoculates individuals against future stress through three phases: (1) Cognitive Assessment, (2) Acquiring stress reduction skills, and (3) Application and follow-through in real-life simulations.\nHence, Option {{CORR}} is correct.",
    "Describes Stress Inoculation Training (SIT)."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "Stress Inoculation Training (SIT) developed by Donald Meichenbaum is structured across which three phases?", opts, c, s, 47))

# Q48: Aerobic Exercise and Stress Reduction
opts, c, s = rotate_options(
    "Improves cardiovascular efficiency, releases mood-enhancing endorphins, and lowers chronic physiological stress reactivity",
    ["Increases levels of toxic cortisol and permanently elevates resting heart rate", "Destroys muscle tissue and impairs pulmonary lung capacity", "Has zero documented physiological or psychological benefit"],
    "A",
    "Regular aerobic exercise (e.g. brisk walking, swimming, cycling) strengthens the cardiovascular system, stimulates the release of mood-elevating neurotransmitters (endorphins), and reduces physiological arousal to stressors.\nHence, Option {{CORR}} is correct.",
    "Explains benefits of aerobic exercise in stress reduction."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "Why is regular aerobic physical exercise strongly recommended for stress management?", opts, c, s, 48))

# Q49: Resilience Concept
opts, c, s = rotate_options(
    "The capacity to bounce back, adapt successfully, and thrive despite experiencing severe adversity, trauma, or ongoing hardship",
    ["The total avoidance of any challenging or unfamiliar life situations", "The suppression of all emotional reactions using heavy narcotics", "A genetic inability to feel physical pain or fatigue"],
    "B",
    "Resilience is defined as the human capacity to adapt positively, withstand stress, and 'bounce back' effectively in the face of significant trauma, adversity, or environmental crisis.\nHence, Option {{CORR}} is correct.",
    "Defines psychological resilience."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "In developmental and health psychology, 'resilience' is formally defined as:", opts, c, s, 49))

# Q50: Diet and Positive Health
opts, c, s = rotate_options(
    "A balanced nutritional diet supports neurotransmitter synthesis, maintains energy levels, and protects immune functioning during stress",
    ["Consuming large quantities of refined sugar and caffeinated energy drinks eliminates all stress", "Fasting completely for weeks at a time cures all mental health disorders", "Diet has zero relationship to brain chemistry or psychological well-being"],
    "A",
    "Proper nutrition provides essential nutrients required for neurotransmitter synthesis, stabilizes blood sugar levels, and supports immune vitality, protecting against the physiological depletion of stress.\nHence, Option {{CORR}} is correct.",
    "Highlights the role of nutrition in positive health and stress resilience."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "What is the psychological and physiological significance of a balanced diet in managing stress?", opts, c, s, 50))

print(f"Unit 3 Section 1 complete: {len(unit3_qs)} questions generated.")

# --- SECTION 2: HEALTH, IMMUNITY, COPING & RESILIENCE (Q51 - Q100) ---

# Q51: Examination Anxiety
opts, c, s = rotate_options(
    "Evaluative stress involving debilitating fear of failing, test anxiety, cognitive worry, and somatic arousal before or during exams",
    ["A genetic inability to hold a pen due to muscular paralysis", "A state of utter joy and euphoria when solving arithmetic tests", "A clinical eating disorder involving continuous chewing of paper"],
    "A",
    "Examination anxiety is a form of evaluative stress characterized by anticipatory worry, fear of failure, mental blocking, and heightened physiological arousal (sweaty palms, tachycardia) during academic evaluations.\nHence, Option {{CORR}} is correct.",
    "Defines examination anxiety."
)
add_q(make_question(CHAPTER, "Examination Anxiety", "Which description accurately portrays 'examination anxiety' experienced by students?", opts, c, s, 51))

# Q52: Symptoms of Examination Anxiety
opts, c, s = rotate_options(
    "High cognitive worry, racing thoughts, mental blanking, rapid heartbeat, nausea, and trembling",
    ["Profound muscular strength and visual night vision", "Instant recall of all textbook chapters without studying", "Sleeping peacefully for twenty continuous hours"],
    "B",
    "Symptoms of examination anxiety include cognitive interference (worry, catastrophizing, mental blanks) and autonomic physiological hyperarousal (palpitations, stomach cramps, tremors).\nHence, Option {{CORR}} is correct.",
    "Identifies cognitive and somatic symptoms of examination anxiety."
)
add_q(make_question(CHAPTER, "Examination Anxiety", "What are the common cognitive and somatic manifestations of acute examination anxiety?", opts, c, s, 52))

# Q53: Strategies to Overcome Examination Anxiety
opts, c, s = rotate_options(
    "Adequate preparation, systematic time-management, cognitive reappraisal of irrational fears, and progressive relaxation techniques",
    ["Staying awake for three consecutive nights consuming caffeine pills", "Avoiding the examination hall completely and running away", "Refusing to study any textbooks and relying on astrological charms"],
    "C",
    "Effective coping with examination anxiety includes structured study habits, realistic goal setting, cognitive disputation of catastrophizing thoughts, and deep breathing relaxation.\nHence, Option {{CORR}} is correct.",
    "Identifies effective strategies to manage exam anxiety."
)
add_q(make_question(CHAPTER, "Examination Anxiety", "Which combination of strategies is psychologically recommended to alleviate examination anxiety?", opts, c, s, 53))

# Q54: Selye's Triad of Stress Responses in Animals
opts, c, s = rotate_options(
    "Adrenal cortex enlargement, shrinkage of thymus/lymphatic tissue, and development of bleeding gastric ulcers",
    ["Growth of additional skeletal bones, loss of teeth, and retinal blindness", "Immediate tripling of brain size and enhanced memory", "Total immunity to bacterial infections and elimination of sleep needs"],
    "D",
    "In Hans Selye's laboratory experiments on rats exposed to prolonged noxious stressors, he observed a classic physiological triad: (1) enlargement of the adrenal cortex, (2) atrophy/shrinkage of thymus and lymph nodes, and (3) bleeding stomach and duodenal ulcers.\nHence, Option {{CORR}} is correct.",
    "Identifies Selye's classic physiological stress triad in animals."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "In his pioneering stress experiments on animals, what physiological triad of bodily changes did Hans Selye discover?", opts, c, s, 54))

# Q55: Adrenal Glands Role in Stress
opts, c, s = rotate_options(
    "Adrenal medulla secretes adrenaline (epinephrine) and noradrenaline; adrenal cortex secretes cortisol (corticosteroids)",
    ["Adrenal medulla secretes insulin; adrenal cortex secretes digestive bile", "Adrenal medulla secretes growth hormone; adrenal cortex secretes melatonin", "Adrenal glands filter urine and produce red blood cells"],
    "A",
    "During stress, the adrenal medulla secretes catecholamines (epinephrine/adrenaline and norepinephrine) for immediate fight-or-flight energy, while the adrenal cortex secretes corticosteroids (cortisol) for sustained metabolic mobilization.\nHence, Option {{CORR}} is correct.",
    "Distinguishes secretions of the adrenal medulla and adrenal cortex."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "How do the two sections of the adrenal gland respond physiologically during the stress response?", opts, c, s, 55))

# Q56: Sympathetic vs Parasympathetic Nervous System
opts, c, s = rotate_options(
    "The sympathetic nervous system accelerates heart rate, dilates bronchi, and mobilizes energy, while the parasympathetic system conserves energy and restores resting homeostasis",
    ["The sympathetic system induces sleep, while the parasympathetic system causes panic", "Both systems perform identical functions with zero physiological difference", "The sympathetic system digests food, while the parasympathetic system causes heart attacks"],
    "B",
    "The autonomic nervous system has two branches: Sympathetic (arousal, energy mobilization, fight-or-flight) and Parasympathetic (calming, resting, energy conservation, digestion, returning body to homeostasis).\nHence, Option {{CORR}} is correct.",
    "Contrasts the sympathetic and parasympathetic nervous systems."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "In the autonomic regulation of stress, what roles are performed by the sympathetic and parasympathetic nervous systems respectively?", opts, c, s, 56))

# Q57: Cytokines and Inflammation in Stress
opts, c, s = rotate_options(
    "Chemical messenger molecules released by immune cells that coordinate inflammation and immune defense, which become dysregulated under chronic stress",
    ["Digestive enzymes in the stomach that break down dietary carbohydrates", "Hormones produced by the thyroid gland that regulate bone growth", "Pigments in the iris that determine human eye color"],
    "C",
    "Cytokines are signaling proteins secreted by immune cells that regulate immune responses and inflammation; chronic psychological stress dysregulates cytokine production, leading to persistent systemic inflammation and elevated disease risk.\nHence, Option {{CORR}} is correct.",
    "Explains the role of cytokines in stress-induced immune dysregulation."
)
add_q(make_question(CHAPTER, "Stress and Immune System", "In Psychoneuroimmunology, what are 'cytokines' and how are they affected by chronic stress?", opts, c, s, 57))

# Q58: White Blood Cells (Leukocytes) Types
opts, c, s = rotate_options(
    "T-cells (matured in thymus), B-cells (produce antibodies), and Natural Killer (NK) cells (attack viruses and tumors)",
    ["Platelets, Hemoglobin, and Plasma", "Estrogen, Progesterone, and Testosterone", "Thyroxine, Insulin, and Glucagon"],
    "D",
    "White blood cells (leukocytes) include T-cells (cell-mediated immunity matured in the thymus), B-cells (produce specific circulating antibodies), and Natural Killer (NK) cells (patrol the bloodstream attacking virus-infected cells and neoplasias).\nHence, Option {{CORR}} is correct.",
    "Lists the primary functional types of leukocytes."
)
add_q(make_question(CHAPTER, "Stress and Immune System", "Which types of white blood cells (leukocytes) form the primary cellular defenses of the human immune system?", opts, c, s, 58))

# Q59: Natural Killer (NK) Cells Vulnerability
opts, c, s = rotate_options(
    "Chronic stress significantly reduces Natural Killer cell cytotoxicity, decreasing the body's defense against viral infections and cancerous cell proliferation",
    ["Stress triples NK cell cytotoxicity, granting absolute immunity to all illnesses", "NK cells are unaffected by cortisol, adrenaline, or nervous stimulation", "NK cells only exist in laboratory rodents and are completely absent in humans"],
    "A",
    "Numerous empirical studies in psychoneuroimmunology show that chronic stress (e.g., caring for an Alzheimer's spouse, academic exams) dramatically depresses NK cell cytotoxic activity, lowering resistance to viral infections and tumor growth.\nHence, Option {{CORR}} is correct.",
    "Explains the impact of chronic stress on Natural Killer cell cytotoxicity."
)
add_q(make_question(CHAPTER, "Stress and Immune System", "What consequence does prolonged psychological stress exert upon Natural Killer (NK) cells?", opts, c, s, 59))

# Q60: Stress and Cardiovascular Disorders
opts, c, s = rotate_options(
    "Prolonged sympathetic arousal elevates blood pressure, accelerates heart rate, causes arterial constriction, and accelerates plaque buildup leading to heart attacks",
    ["Stress strengthens coronary arteries, permanently curing all forms of heart disease", "Stress has zero physiological effect on blood pressure or cardiovascular vessels", "Stress prevents blood clotting, causing continuous unprovoked bleeding in muscles"],
    "B",
    "Chronic stress overactivates the cardiovascular system, raising blood pressure, damaging arterial endothelium, and fostering atherosclerosis, dramatically increasing the risk of coronary heart disease (CHD) and myocardial infarction.\nHence, Option {{CORR}} is correct.",
    "Explains the cardiovascular pathophysiology of chronic stress."
)
add_q(make_question(CHAPTER, "Effects of Stress", "How does chronic psychological stress contribute to the development of coronary heart disease (CHD)?", opts, c, s, 60))

# Q61: Stress and Gastrointestinal Ulcers
opts, c, s = rotate_options(
    "Stress increases gastric acid secretion while reducing protective stomach mucus and impairing blood flow to the gastric lining",
    ["Stress eliminates all stomach acids, preventing digestion of food completely", "Stress turns stomach contents into alkaline mineral water", "Stress causes the stomach to double in size every twelve hours"],
    "C",
    "Under prolonged stress, sympathetic activation reduces blood flow to the gut, suppresses protective mucosal secretions, and triggers excessive rebound stomach acid, leaving the lining vulnerable to ulceration (often exacerbated by H. pylori bacteria).\nHence, Option {{CORR}} is correct.",
    "Explains the development of peptic ulcers under prolonged stress."
)
add_q(make_question(CHAPTER, "Effects of Stress", "Through what physiological mechanism does severe chronic stress contribute to the formation of peptic ulcers?", opts, c, s, 61))

# Q62: Approach-Approach Conflict
opts, c, s = rotate_options(
    "Choosing between two equally attractive, desirable goals (e.g. choosing between two prestigious job offers)",
    ["Choosing between two equally painful, repulsive choices (e.g. facing surgery vs chronic illness)", "Being attracted to and repelled by the exact same goal simultaneously", "Having no goals or choices whatsoever in life"],
    "D",
    "Approach-approach conflict occurs when an individual must select between two equally appealing, desirable options (e.g. choosing between admission to two elite colleges).\nHence, Option {{CORR}} is correct.",
    "Defines approach-approach conflict."
)
add_q(make_question(CHAPTER, "Types of Stress", "Which scenario illustrates an 'Approach-approach conflict'?", opts, c, s, 62))

# Q63: Avoidance-Avoidance Conflict
opts, c, s = rotate_options(
    "Choosing between two equally undesirable, painful alternatives (e.g. staying in a miserable job vs facing prolonged unemployment)",
    ["Choosing between two luxury holiday resorts in the Caribbean", "Wanting to eat delicious cake while fearing weight gain", "Enjoying playing guitar while disliking practicing scales"],
    "A",
    "Avoidance-avoidance conflict arises when an individual is trapped between two negative, repulsive alternatives ('between the devil and the deep blue sea'), both of which they wish to avoid.\nHence, Option {{CORR}} is correct.",
    "Defines avoidance-avoidance conflict."
)
add_q(make_question(CHAPTER, "Types of Stress", "An 'Avoidance-avoidance conflict' occurs when an individual must:", opts, c, s, 63))

# Q64: Approach-Avoidance Conflict
opts, c, s = rotate_options(
    "A single goal or choice has both highly attractive positive aspects and strongly repulsive negative aspects (e.g. wanting a high-paying job in a dangerous war zone)",
    ["Choosing between two completely identical bottles of milk at a grocery store", "Refusing to make any decisions and going to sleep for ten days", "Selecting between two delicious desserts at a wedding banquet"],
    "B",
    "Approach-avoidance conflict occurs when a single goal possesses both desirable features attracting the person and undesirable features repelling the person (e.g. proposing marriage involves romantic love but fear of commitment).\nHence, Option {{CORR}} is correct.",
    "Defines approach-avoidance conflict."
)
add_q(make_question(CHAPTER, "Types of Stress", "What characterizes an 'Approach-avoidance conflict'?", opts, c, s, 64))

# Q65: Environmental Stressors: Noise, Crowding, Heat
opts, c, s = rotate_options(
    "High intensity, unpredictability, and uncontrollability of environmental noise or crowding significantly increase stress levels",
    ["Environmental stressors are completely harmless if an individual wears a wristwatch", "Crowding only causes stress when temperatures are below freezing point", "Noise causes zero physiological arousal in human beings"],
    "C",
    "Environmental stressors (loud noise, severe crowding, extreme heat) are most debilitating when they are intense, unpredictable, and outside the individual's perceived control.\nHence, Option {{CORR}} is correct.",
    "Identifies features that make environmental stressors harmful."
)
add_q(make_question(CHAPTER, "Types of Stress", "Which characteristics of environmental stressors (such as noise or air pollution) maximize their harmful psychological impact?", opts, c, s, 65))

# Q66: Statement on Catastrophic Traumatic Events
add_q(make_statement_question(
    CHAPTER, "Sources of Stress",
    "Traumatic events such as natural disasters, terrorist bombings, and severe vehicle crashes can produce Post-Traumatic Stress Disorder (PTSD).",
    "Symptoms of PTSD include recurrent intrusive flashbacks, emotional numbing, avoidance of trauma reminders, and heightened hyperarousal.",
    1, "A",
    "Both statements are correct. Catastrophic traumatic events shatter an individual's sense of security and can lead to PTSD, marked by vivid intrusive flashbacks, nightmares, emotional detachment, and chronic autonomic hypervigilance.",
    "Validates PTSD etiology and symptoms."
))

# Q67: Suzanne Kobasa's Classic Executive Study
opts, c, s = rotate_options(
    "Studied corporate executives under extreme work pressure and found that those who stayed healthy scored high on hardiness (commitment, control, challenge)",
    ["Studied prison inmates and found that punishment eliminates criminal tendencies", "Studied kindergarten children and found that IQ is 100% determined by diet", "Studied professional athletes and found that aerobic exercise causes heart attacks"],
    "B",
    "Suzanne Kobasa studied hundreds of high-stress corporate executives over several years, discovering that executives who remained physically and emotionally resilient exhibited high psychological hardiness.\nHence, Option {{CORR}} is correct.",
    "Summarizes Kobasa's empirical study on corporate executives."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "Suzanne Kobasa's landmark research investigating psychological hardiness was conducted on which group of subjects?", opts, c, s, 67))

# Q68: Internal vs External Locus of Control in Health
opts, c, s = rotate_options(
    "Individuals with an internal locus of control believe their own actions determine health outcomes, leading to proactive coping, while an external locus fosters passive helplessness",
    ["An internal locus causes severe anxiety, while an external locus produces athletic genius", "Locus of control has zero relationship to stress coping or illness vulnerability", "An external locus indicates that the person has three separate biological brains"],
    "C",
    "Individuals with an internal locus of control (believing health and life outcomes are influenced by personal actions) practice healthier habits and cope actively with stress, whereas an external locus (attributing outcomes to luck or fate) breeds fatalism and passivity.\nHence, Option {{CORR}} is correct.",
    "Contrasts internal and external locus of control in stress coping."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "How does an 'internal locus of control' benefit an individual confronted with health challenges compared to an 'external locus of control'?", opts, c, s, 68))

# Q69: Unhelpful Habits and Lifestyle Risks
opts, c, s = rotate_options(
    "Smoking, excessive alcohol intake, consumption of addictive drugs, sedentary physical inactivity, and poor sleep hygiene",
    ["Reading classical literature, meditating daily, and drinking clean water", "Practicing yoga postures, gardening, and walking in municipal parks", "Attending university lectures on time and completing assignments early"],
    "D",
    "Unhelpful, health-impairing habits (often adopted as maladaptive coping mechanisms during stress) include tobacco smoking, heavy alcohol use, drug dependence, sedentary lifestyle, and erratic sleep schedules.\nHence, Option {{CORR}} is correct.",
    "Lists unhelpful health-impairing lifestyle habits."
)
add_q(make_question(CHAPTER, "Life Skills", "Which of the following represents unhelpful, maladaptive lifestyle habits that compound stress and undermine positive health?", opts, c, s, 69))

# Q70: Positive Attitude and Cognitive Reframing
opts, c, s = rotate_options(
    "Focusing on constructive solutions, maintaining realistic optimism, and reframing adverse situations as learning opportunities",
    ["Pretending that severe cancer or heart disease does not exist biologically", "Expressing arrogant superiority over colleagues at all social gatherings", "Refusing to seek medical treatment when experiencing a physical heart attack"],
    "A",
    "A positive attitude in stress psychology does not mean blind denial of reality; it involves realistic optimism, cognitive reframing of setbacks as manageable challenges, and focusing mental energy on proactive solutions.\nHence, Option {{CORR}} is correct.",
    "Defines positive attitude and cognitive reframing."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "In cognitive stress management, what does maintaining a 'positive attitude' and practicing 'cognitive reframing' involve?", opts, c, s, 70))

# Q71: Martin Seligman and Positive Psychology
opts, c, s = rotate_options(
    "Shifted psychological focus from diagnosing pathology and illness toward cultivating human strengths, virtues, optimism, and well-being",
    ["Pioneered surgical prefrontal lobotomies to cure schizophrenia in psychiatric wards", "Constructed the first standardized projective test using animal photographs", "Asserted that human beings have zero capacity for happiness or flourishing"],
    "B",
    "Martin Seligman pioneered the Positive Psychology movement, advocating that psychology should not solely treat psychological distress, but must actively investigate and cultivate positive human traits, virtues, resilience, and subjective well-being.\nHence, Option {{CORR}} is correct.",
    "Identifies Martin Seligman's contribution to Positive Psychology."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "Psychologist Martin Seligman is internationally renowned for initiating which major theoretical movement in psychology?", opts, c, s, 71))

# Q72: Subjective Well-Being (SWB)
opts, c, s = rotate_options(
    "An individual's personal cognitive and emotional evaluation of their own life, encompassing life satisfaction, positive affect, and low negative affect",
    ["An individual's physical blood pressure and cholesterol level scored by a physician", "The market cash value of a person's real estate holdings and bank deposits", "The number of academic degrees printed on a university diploma"],
    "C",
    "Subjective Well-Being (SWB) is the scientific term for happiness, comprising an individual's self-evaluation of life satisfaction along with high frequency of positive emotions and low frequency of negative emotions.\nHence, Option {{CORR}} is correct.",
    "Defines subjective well-being."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "What does 'Subjective Well-Being' (SWB) encompass in positive health psychology?", opts, c, s, 72))

# Q73: Assertion-Reason on Social Support as a Buffer
add_q(make_assertion_question(
    CHAPTER, "Promoting Positive Health",
    "Individuals with strong, caring social support networks exhibit lower vulnerability to stress-related physical illnesses.",
    "Social support provides practical resources, reduces perceived threat, and buffers against physiological overactivation during stress.",
    1, "A",
    "Both (A) and (R) are true, and (R) is the correct explanation of (A). The buffering hypothesis of social support establishes that friends and family mitigate the adverse impact of stress by offering emotional reassurance, tangible assistance, and lowering cardiovascular reactivity.",
    "Validates the buffering role of social support in health."
))

# Q74: Meditation as Stress Management
opts, c, s = rotate_options(
    "A self-regulatory mental practice that focuses attention, quietens the mind, and produces a state of deep physical calmness and reduced sympathetic arousal",
    ["A physical surgical procedure removing the adrenal medulla glands", "A high-intensity competitive athletic race testing aerobic endurance", "A method of rapidly memorizing commercial telephone numbers"],
    "A",
    "Meditation involves refocusing attention (through breath awareness, mantras, or mindfulness) to cultivate mental stillness, which down-regulates sympathetic nervous system arousal and promotes autonomic recovery.\nHence, Option {{CORR}} is correct.",
    "Defines meditation in stress management."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "How does the practice of meditation facilitate stress reduction and physiological equilibrium?", opts, c, s, 74))

# Q75: Guided Imagery / Creative Visualization steps
opts, c, s = rotate_options(
    "Closing eyes, entering relaxation, vividly visualizing a tranquil multi-sensory scene (sights, sounds, smells), and absorbing positive calming sensations",
    ["Running at maximum speed while shouting affirmations loudly in public", "Writing down a list of one hundred personal enemies and plotting revenge", "Consuming sleep-inducing pharmaceutical drugs in heavy doses"],
    "B",
    "In guided imagery, the practitioner enters a relaxed physical posture, closes their eyes, and engages all sensory modalities to vividly imagine a safe, peaceful natural environment, eliciting the relaxation response.\nHence, Option {{CORR}} is correct.",
    "Describes the operational process of guided imagery."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "What sequence of mental procedures is followed during a session of creative visualization / guided imagery?", opts, c, s, 75))

# Q76: Meichenbaum's SIT Phase 1: Cognitive Assessment
opts, c, s = rotate_options(
    "The client learns to identify their negative self-talk, automatic catastrophic thoughts, and misconceptions about stress",
    ["The client is exposed to real physical danger without any warning", "The client undergoes surgical installation of brain electrodes", "The client is given a multiple-choice calculus test to fail"],
    "C",
    "In the first phase (Conceptualization / Cognitive Assessment) of Stress Inoculation Training, the client is educated about the nature of stress and learns to identify self-defeating internal dialogue and cognitive distortions.\nHence, Option {{CORR}} is correct.",
    "Describes Phase 1 of Stress Inoculation Training."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "In Phase 1 (Cognitive Assessment) of Donald Meichenbaum's Stress Inoculation Training, what does the client learn?", opts, c, s, 76))

# Q77: Meichenbaum's SIT Phase 2: Stress Reduction Techniques
opts, c, s = rotate_options(
    "Learning specific behavioral and cognitive coping skills such as relaxation, positive self-instruction, and problem-solving",
    ["Hypnotizing the client so they become totally unresponsive to all sound", "Administering electroconvulsive shock therapy to induce amnesia", "Isolating the client in solitary confinement for thirty days"],
    "D",
    "In Phase 2 (Skills Acquisition and Rehearsal) of SIT, the individual learns and rehearses specific coping techniques, including progressive relaxation, coping self-statements, cognitive restructuring, and time management.\nHence, Option {{CORR}} is correct.",
    "Describes Phase 2 of Stress Inoculation Training."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "What occurs during Phase 2 (Skills Acquisition and Rehearsal) of Stress Inoculation Training?", opts, c, s, 77))

# Q78: Meichenbaum's SIT Phase 3: Application and Follow-Through
opts, c, s = rotate_options(
    "Applying newly mastered coping skills in simulated role-plays and real-life increasingly stressful situations",
    ["Taking a written final exam on the history of clinical psychiatry", "Receiving a monetary prize for attending all therapy appointments", "Quitting therapy permanently and avoiding all future human challenges"],
    "A",
    "In Phase 3 (Application and Follow-Through) of SIT, clients practice applying their coping skills under simulated stress conditions (role-plays, imagery) and gradually transfer them to real-world stressful challenges.\nHence, Option {{CORR}} is correct.",
    "Describes Phase 3 of Stress Inoculation Training."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "During Phase 3 (Application and Follow-Through) of Stress Inoculation Training, what is the client expected to do?", opts, c, s, 78))

# Q79: Multi-statement question on Selye's GAS
add_q(make_multi_statement_question(
    CHAPTER, "General Adaptation Syndrome",
    "Which of the following statements concerning Hans Selye's General Adaptation Syndrome (GAS) are accurate?",
    [
        ("A", "The Alarm Reaction stage involves activation of the sympathetic-adrenal system and fight-or-flight response"),
        ("B", "During the Resistance stage, the body maintains elevated physiological defense against the ongoing stressor"),
        ("C", "The Exhaustion stage occurs when prolonged stress depletes adaptive bodily reserves, fostering physical illness"),
        ("D", "Selye believed that stress produces entirely different, specialized bodily reactions for every distinct psychological problem")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements (A), (B), and (C) correctly describe the stages of GAS. Statement (D) is incorrect; Selye's core premise was that stress is non-specific, eliciting the same general physiological adaptation syndrome regardless of the stressor's nature.",
    "Accurately evaluates statements on Selye's General Adaptation Syndrome."
))

# Q80: Cortisol as the 'Stress Hormone'
opts, c, s = rotate_options(
    "A glucocorticoid hormone secreted by the adrenal cortex that increases blood glucose and modulates metabolism during prolonged stress",
    ["A neurotransmitter in the reticular formation that induces sleep paralysis", "An enzyme secreted by the pancreas that digests dietary proteins", "A mineral produced in bone marrow that creates white blood cells"],
    "B",
    "Cortisol is the primary glucocorticoid hormone released by the adrenal cortex under stimulation by ACTH from the pituitary gland; it mobilizes glucose reserves, suppresses non-essential systems, and modulates immune responses during sustained stress.\nHence, Option {{CORR}} is correct.",
    "Defines cortisol and its endocrine role in stress."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "What is cortisol, and what physiological role does it perform during prolonged stress?", opts, c, s, 80))

# Q81: Psychological Resilience Determinants
opts, c, s = rotate_options(
    "Self-efficacy, realistic optimism, strong social support networks, problem-solving skills, and emotional regulation",
    ["Avoidant denial, substance abuse, chronic passivity, and emotional outbursts", "Low intelligence, poor physical health, and social isolation from peers", "Severe obsessive perfectionism combined with chronic road rage"],
    "C",
    "Psychological resilience is fostered by robust internal assets (high self-efficacy, emotional self-regulation, cognitive flexibility) and external protective factors (secure attachment, supportive relationships, positive mentorship).\nHence, Option {{CORR}} is correct.",
    "Identifies protective determinants of psychological resilience."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "Which combination of psychological and social factors significantly fosters resilience in the face of adversity?", opts, c, s, 81))

# Q82: Chronic Stress vs Acute Stress
opts, c, s = rotate_options(
    "Acute stress is short-term and demands immediate response (e.g. avoiding a car collision), whereas chronic stress is persistent and long-lasting (e.g. chronic caregiving, poverty)",
    ["Acute stress is experienced only by doctors, while chronic stress is experienced only by artists", "Acute stress causes permanent death, while chronic stress produces superior athletic speed", "There is zero physiological difference between acute and chronic stress"],
    "D",
    "Acute stress is brief, immediate, and adaptive for survival (resolving once the acute event ends), whereas chronic stress persists over months or years, leading to allostatic overload, immune compromise, and chronic illnesses.\nHence, Option {{CORR}} is correct.",
    "Contrasts acute and chronic stress."
)
add_q(make_question(CHAPTER, "Nature of Stress", "How does 'acute stress' differ fundamentally from 'chronic stress'?", opts, c, s, 82))

# Q83: Fight-or-Flight Response Pioneer
opts, c, s = rotate_options(
    "Walter Cannon in 1915",
    ["Sigmund Freud in 1900", "B.F. Skinner in 1953", "Carl Rogers in 1951"],
    "A",
    "The emergency 'fight-or-flight' response was originally identified and described by American physiologist Walter Cannon in 1915, explaining how the sympathetic nervous system primes organisms to fight or flee predators.\nHence, Option {{CORR}} is correct.",
    "Attributes the fight-or-flight response to Walter Cannon."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "Who originally formulated the physiological concept of the emergency 'fight-or-flight' response?", opts, c, s, 83))

# Q84: Allostatic Load Concept
opts, c, s = rotate_options(
    "The cumulative wear and tear on the body and brain resulting from chronic physiological stress responses and repeated adaptation efforts",
    ["The physical weight of heavy backpacks carried by mountain climbers", "The total amount of oxygen consumed by skeletal muscles during sleep", "The financial debt accumulated by university college graduates"],
    "B",
    "Allostatic load (introduced by Bruce McEwen) refers to the cumulative biological cost and physiological wear and tear inflicted on tissues and organs when chronic stress forces sustained physiological overactivity.\nHence, Option {{CORR}} is correct.",
    "Defines allostatic load."
)
add_q(make_question(CHAPTER, "Effects of Stress", "What does the physiological concept of 'allostatic load' signify in stress research?", opts, c, s, 84))

# Q85: Positive Health definition
opts, c, s = rotate_options(
    "A state of complete physical, mental, social, and spiritual well-being, and not merely the absence of disease or infirmity",
    ["The physical capability to lift two hundred kilograms in an athletic gymnasium", "Never visiting a medical hospital or consulting a certified doctor", "The complete absence of all biological thoughts and feelings"],
    "C",
    "Positive health (conforming to the WHO definition and NCERT) is not merely the negative absence of physical symptoms, but a positive, dynamic state of total physical, mental, social, and spiritual well-being and flourishing.\nHence, Option {{CORR}} is correct.",
    "Defines positive health."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "Positive health is conceptualized by health psychologists and the WHO as:", opts, c, s, 85))

# Q86: Sleep Hygiene and Stress
opts, c, s = rotate_options(
    "Consistent sleep schedules, a dark quiet environment, and avoiding evening screens promote restorative sleep and emotional resilience",
    ["Sleeping for only two hours per night stimulates cerebral productivity", "Consuming heavy fried meals immediately before bed prevents nightmares", "Checking bright smartphone social media screens throughout the night enhances calmness"],
    "D",
    "Good sleep hygiene (regular bedtimes, cool dark bedroom, avoiding electronic blue light and caffeine before sleep) ensures deep restorative slow-wave sleep, which regulates cortisol and enhances cognitive resilience.\nHence, Option {{CORR}} is correct.",
    "Identifies effective sleep hygiene practices for stress reduction."
)
add_q(make_question(CHAPTER, "Life Skills", "Which sleep hygiene practices are scientifically validated to mitigate stress and restore cognitive functioning?", opts, c, s, 86))

# Q87: Laughter and Humor as Stress Busters
opts, c, s = rotate_options(
    "Laughter lowers cortisol, stimulates endorphins, relaxes skeletal muscles, and provides positive cognitive reappraisal",
    ["Laughter causes severe cardiovascular rupture and should be banned medically", "Laughter has zero psychological or physiological effect on human stress", "Laughter causes acute panic attacks in healthy adults"],
    "A",
    "Laughter down-regulates cortisol and adrenaline secretion, triggers the release of endorphins, relaxes arterial blood vessels, decreases muscle tension, and reframes stressful situations into humorous, manageable events.\nHence, Option {{CORR}} is correct.",
    "Explains the physiological and cognitive benefits of humor in stress reduction."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "How does genuine laughter and humor act as an effective buffer against stress?", opts, c, s, 87))

# Q88: Self-Care in Stress Management
opts, c, s = rotate_options(
    "Actively prioritizing one's physical, emotional, and psychological well-being through balanced rest, nutrition, recreation, and setting boundaries",
    ["Selfishly exploiting coworkers to perform all of one's professional job duties", "Indulging in continuous uncontrolled retail shopping using credit cards", "Ignoring all familial and ethical responsibilities to watch television"],
    "B",
    "Self-care involves deliberate, healthy practices to preserve and restore emotional and physical energy: eating well, getting restorative rest, engaging in joyful hobbies, and setting healthy boundaries against over-commitment.\nHence, Option {{CORR}} is correct.",
    "Defines self-care."
)
add_q(make_question(CHAPTER, "Life Skills", "In the context of health psychology and life skills, what does genuine 'self-care' entail?", opts, c, s, 88))

# Q89: Progressive Relaxation Sequence
add_q(make_sequence_question(
    CHAPTER, "Stress Management Techniques",
    "Arrange the fundamental steps of Progressive Muscle Relaxation in correct operational sequence:",
    [
        ("A", "Focus attention on a specific muscle group (e.g. feet or hands)"),
        ("B", "Tense the muscle group firmly for 5 to 7 seconds"),
        ("C", "Consciously release all tension abruptly and experience the sensation of relaxation"),
        ("D", "Notice the distinct contrast between tension and deep relaxation")
    ],
    "A, B, C, D", "A",
    "The operational sequence of Progressive Muscle Relaxation: (1) Focus on muscle group -> (2) Tense firmly for 5-7 seconds -> (3) Release tension completely -> (4) Pay mindful attention to the contrast between tension and relaxation.",
    "Sequences the operational steps of Progressive Muscle Relaxation."
))

# Q90: Autogenic Training
opts, c, s = rotate_options(
    "A self-relaxation technique utilizing passive verbal autosuggestions of warmth and heaviness in the limbs to induce parasympathetic calmness",
    ["A high-speed sprint training program used by Olympic athletes", "An electric shock conditioning procedure used to cure phobias", "A surgical procedure altering the vocal cords to change vocal pitch"],
    "B",
    "Autogenic training, developed by Johannes Schultz, is a relaxation technique where individuals repeat self-suggestions of bodily heaviness and warmth (e.g. 'My arms are heavy and warm'), promoting vasodilation and deep relaxation.\nHence, Option {{CORR}} is correct.",
    "Defines autogenic training."
)
add_q(make_question(CHAPTER, "Stress Management Techniques", "What is 'Autogenic Training' as utilized in stress management?", opts, c, s, 90))

# Q91: Conflict Resolution - Compromise vs Withdrawal
opts, c, s = rotate_options(
    "Compromise involves mutual concessions where both parties gain partial satisfaction, whereas withdrawal involves physical or psychological retreat from the conflict",
    ["Compromise causes violent street fights, while withdrawal leads to criminal arrest", "Compromise only applies to international wars, while withdrawal only applies to chess", "Both terms refer to the exact same surgical operation"],
    "C",
    "In interpersonal conflict resolution: compromise entails both parties negotiating and making mutual concessions to find workable common ground, while withdrawal involves physically or emotionally retreating from the stressful conflict.\nHence, Option {{CORR}} is correct.",
    "Differentiates compromise from withdrawal in conflict resolution."
)
add_q(make_question(CHAPTER, "Types of Stress", "In managing interpersonal conflict, how is 'compromise' distinguished from 'withdrawal'?", opts, c, s, 91))

# Q92: Social Readjustment Rating Scale Highest LCU Event
opts, c, s = rotate_options(
    "Death of a spouse (assigned 100 Life Change Units)",
    ["Failing a driving license test (assigned 50 Life Change Units)", "Buying a new bicycle (assigned 80 Life Change Units)", "Going on a weekend holiday (assigned 90 Life Change Units)"],
    "D",
    "On Holmes and Rahe's Social Readjustment Rating Scale (SRRS), the single life event with the highest score is 'Death of a spouse', weighted with 100 Life Change Units (LCUs).\nHence, Option {{CORR}} is correct.",
    "Identifies death of a spouse as the highest weighted event on the SRRS."
)
add_q(make_question(CHAPTER, "Sources of Stress", "Which life event is assigned the maximum value of 100 Life Change Units (LCUs) on the Holmes and Rahe SRRS?", opts, c, s, 92))

# Q93: Role of Optimism in Physical Health
opts, c, s = rotate_options(
    "Optimistic individuals employ active problem-focused coping, seek social support, adhere to medical advice, and exhibit superior immune markers",
    ["Optimism causes patients to refuse all prescribed medical medications", "Optimism causes genetic mutations that eliminate red blood cells", "Optimism guarantees 100% immortality with zero physical illness"],
    "A",
    "Studies consistently reveal that dispositional optimists experience lower stress reactivity, practice active health habits, adhere better to medical treatments, and display stronger immune competence than pessimists.\nHence, Option {{CORR}} is correct.",
    "Explains how optimism benefits physical health and immunity."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "Why do dispositional optimists consistently experience better health outcomes when confronted with severe illnesses?", opts, c, s, 93))

# Q94: Statement on Biofeedback Applications
add_q(make_statement_question(
    CHAPTER, "Stress Management Techniques",
    "Biofeedback is clinically effective in treating tension headaches, migraine headaches, and high blood pressure.",
    "Biofeedback works by providing continuous sensory feedback regarding physiological functions that are usually involuntary.",
    1, "A",
    "Both statements are correct. Biofeedback translates involuntary physiological processes (muscle contraction, blood vessel diameter) into visual or auditory cues, allowing patients to learn voluntary control to treat headaches and hypertension.",
    "Validates clinical efficacy and operating mechanism of biofeedback."
))

# Q95: Stress and Infectious Illness Vulnerability
opts, c, s = rotate_options(
    "Elevated cortisol dampens leukocyte response, making stressed individuals significantly more vulnerable to viral infections like the common cold",
    ["Stress completely destroys all viruses before they enter the nostrils", "Stressed individuals can never catch the common cold or influenza", "Cortisol acts as an antibiotic that cures bacterial pneumonia"],
    "B",
    "Classic studies by Sheldon Cohen demonstrated that individuals experiencing chronic psychological stress are significantly more susceptible to developing the common cold when exposed to cold viruses, due to stress-induced immunosuppression.\nHence, Option {{CORR}} is correct.",
    "Cites Sheldon Cohen's research linking stress to viral infection susceptibility."
)
add_q(make_question(CHAPTER, "Stress and Immune System", "What did empirical research by Sheldon Cohen and colleagues reveal regarding stress and susceptibility to the common cold?", opts, c, s, 95))

# Q96: Positive Relationships as a Life Skill
opts, c, s = rotate_options(
    "Building and maintaining supportive, mutually respectful interpersonal relationships that provide emotional security and practical aid during crises",
    ["Accumulating five thousand anonymous followers on digital social media", "Controlling friends through emotional manipulation and financial loans", "Refusing to ever share personal thoughts or vulnerabilities with anyone"],
    "C",
    "Cultivating positive relationships is a vital life skill: warm, reciprocal friendships and familial bonds provide emotional validation, tangible help during emergencies, and reduce loneliness.\nHence, Option {{CORR}} is correct.",
    "Defines positive relationships as a life skill."
)
add_q(make_question(CHAPTER, "Life Skills", "In the context of stress management and mental health, what does cultivating 'positive relationships' involve?", opts, c, s, 96))

# Q97: HPA Axis in Stress (Hypothalamic-Pituitary-Adrenal)
opts, c, s = rotate_options(
    "Hypothalamus releases CRH -> Pituitary releases ACTH -> Adrenal cortex releases Cortisol",
    ["Pituitary releases insulin -> Hypothalamus releases saliva -> Adrenal medulla releases bile", "Adrenal cortex releases melatonin -> Hypothalamus releases adrenaline -> Pituitary stops breathing", "Hypothalamus produces white blood cells -> Pituitary produces platelets -> Adrenal filters urine"],
    "D",
    "The physiological endocrine cascade of the HPA axis: Hypothalamus secretes Corticotropin-Releasing Hormone (CRH) -> stimulates anterior Pituitary to secrete Adrenocorticotropic Hormone (ACTH) -> stimulates Adrenal Cortex to release Cortisol.\nHence, Option {{CORR}} is correct.",
    "Details the neuroendocrine sequence of the HPA axis during stress."
)
add_q(make_question(CHAPTER, "General Adaptation Syndrome", "What is the correct biological sequence of the Hypothalamic-Pituitary-Adrenal (HPA) axis activated during stress?", opts, c, s, 97))

# Q98: Overcoming Unhelpful Habits (Life Skill)
opts, c, s = rotate_options(
    "Recognizing triggers, modifying environmental cues, substituting positive alternative actions, and self-reinforcing small steps of progress",
    ["Punishing oneself with severe physical pain whenever an old habit recurs", "Denying that the habit exists and continuing the destructive behavior in secret", "Surrendering all self-control and accepting that habits are genetically unchangeable"],
    "A",
    "Overcoming unhelpful habits (such as smoking, overeating, or procrastination) requires identifying cues that trigger the behavior, altering the environment, substituting healthy replacement behaviors, and using self-reinforcement.\nHence, Option {{CORR}} is correct.",
    "Identifies behavioural principles for overcoming unhelpful habits."
)
add_q(make_question(CHAPTER, "Life Skills", "Which approach represents the most effective psychological strategy for 'overcoming unhelpful habits' like procrastination or stress-eating?", opts, c, s, 98))

# Q99: Holistic Health Model
opts, c, s = rotate_options(
    "Integrates biological physical health, psychological mental well-being, healthy social relationships, and spiritual harmony into a unified living system",
    ["Focuses exclusively on prescribing surgical operations and pharmaceutical pills", "Ignores all medical science and relies entirely on superstition", "Separates mind and body as completely independent entities that never interact"],
    "B",
    "The holistic model of health views the human being as an integrated biological, psychological, social, and spiritual whole, recognizing that disruptions in emotional or social spheres reverberate throughout physical health.\nHence, Option {{CORR}} is correct.",
    "Defines the holistic model of health."
)
add_q(make_question(CHAPTER, "Promoting Positive Health", "What is the core premise of the 'holistic model of health' advocated in modern health psychology?", opts, c, s, 99))

# Q100: Comprehensive Coping Synthesis
opts, c, s = rotate_options(
    "Effective coping is dynamic and flexible, matching problem-focused strategies to controllable stressors and emotion-focused strategies to uncontrollable stressors",
    ["Individuals should use only one rigid coping response for every single event throughout their lifetime", "Coping should always be avoided because stress resolves itself automatically without any action", "Emotion-focused coping is always sinful, while problem-focused coping is always perfect"],
    "A",
    "Optimal stress management requires coping flexibility: using problem-focused strategies when situations are controllable and changeable, and emotion-focused strategies (acceptance, cognitive reframing, relaxation) when stressors are unalterable.\nHence, Option {{CORR}} is correct.",
    "Synthesizes adaptive coping flexibility."
)
add_q(make_question(CHAPTER, "Coping with Stress", "What represents the hallmark of 'coping flexibility' in managing diverse life challenges?", opts, c, s, 100))

# Validate and dump
assert len(unit3_qs) == 100, f"Expected 100 questions for Unit 3, got {len(unit3_qs)}"
os.makedirs("mock/psy_units", exist_ok=True)
out_path = "mock/psy_units/unit3.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(unit3_qs, f, indent=2, ensure_ascii=False)

print(f"Successfully generated and saved all 100 questions for Unit 3 to {out_path}!")

