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
unit2_seen = set()
unit2_qs = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in unit2_seen:
        raise ValueError(f"Duplicate in Unit 2: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in Unit 2: {q['questionText'][:80]}")
    unit2_seen.add(norm)
    assert len(q["options"]) == 4, f"Options length error: {q['questionText'][:40]}"
    assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option: {q['questionText'][:40]}"
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"], f"Missing solution: {q['questionText'][:40]}"
    unit2_qs.append(q)

CHAPTER = "Self and Personality"

# --- SECTION 1: SELF, CULTURE & PERSONALITY TYPES (Q1 - Q40) ---

# Q1: Personal vs Social Identity
opts, c, s = rotate_options(
    "Personal identity refers to attributes that make a person unique, while social identity refers to aspects that link a person to social or cultural groups",
    ["Personal identity refers to physical fingerprints only, while social identity refers to genetic blood group", "Personal identity is acquired after age 60, while social identity is present in infancy", "Personal identity is public gossip, while social identity is private dreaming"],
    "A",
    "Personal identity comprises attributes that make an individual distinct from others (e.g. 'I am honest, I am an artist'), whereas social identity links an individual to a social group (e.g. 'I am a Hindu, I am a doctor').\nHence, Option {{CORR}} is correct.",
    "Distinguishes personal identity from social identity."
)
add_q(make_question(CHAPTER, "Concept of Self", "In the psychological analysis of the self, how are personal identity and social identity differentiated?", opts, c, s, 1))

# Q2: Self-Concept definition
opts, c, s = rotate_options(
    "The way an individual perceives, conceptualizes, and evaluates their own competencies and attributes",
    ["The total amount of wealth and physical property an individual inherits from ancestors", "The reputation an individual has in foreign international newspapers", "An unconscious biological reflex controlled by the cerebellum"],
    "B",
    "Self-concept is defined as the totality of an individual's thoughts, perceptions, and beliefs concerning who they are, their competencies, and their attributes.\nHence, Option {{CORR}} is correct.",
    "Defines self-concept correctly according to NCERT."
)
add_q(make_question(CHAPTER, "Concept of Self", "Self-concept is formally defined in psychological literature as:", opts, c, s, 2))

# Q3: Self-Esteem definition
opts, c, s = rotate_options(
    "The value judgement or subjective worth an individual places on themselves",
    ["The number of friends an individual has on digital social media", "An individual's score on a formal timed calculus examination", "The speed at which an individual can run a hundred-meter sprint"],
    "C",
    "Self-esteem represents the evaluative dimension of the self, referring to the value judgment, positive or negative feelings, and overall self-worth an individual holds regarding themselves.\nHence, Option {{CORR}} is correct.",
    "Identifies self-esteem as the evaluative dimension of self."
)
add_q(make_question(CHAPTER, "Concept of Self", "Which psychological construct refers specifically to the evaluative value judgment of self-worth that an individual makes about themselves?", opts, c, s, 3))

# Q4: Parental style and Self-Esteem
opts, c, s = rotate_options(
    "Warm, supportive, and acceptant parenting where children feel unconditionally accepted and valued",
    ["Strict punitive parenting where physical punishment is inflicted for minor errors", "Cold, indifferent parenting where children's emotional needs are ignored", "Permissive neglect where parents provide zero guidance or emotional affection"],
    "D",
    "Psychological studies consistently show that warm, supportive, and accepting parenting fosters high, resilient self-esteem in children, allowing them to feel competent and valued.\nHence, Option {{CORR}} is correct.",
    "Identifies warm and supportive parenting as fostering high self-esteem."
)
add_q(make_question(CHAPTER, "Concept of Self", "Which parental practice is most strongly associated with the development of high self-esteem in developing children?", opts, c, s, 4))

# Q5: Self-Efficacy (Albert Bandura)
opts, c, s = rotate_options(
    "An individual's belief in their own capability to execute behaviours necessary to produce specific performance attainments",
    ["An individual's physical muscular power during athletic weightlifting", "The unconscious Freudian desire to satisfy instinctual sexual impulses", "The genetic inheritance of biological blood type from maternal grandparents"],
    "A",
    "Albert Bandura introduced self-efficacy, defining it as an individual's conviction or subjective belief in their capability to organize and execute courses of action required to attain designated goals.\nHence, Option {{CORR}} is correct.",
    "Identifies Bandura's definition of self-efficacy."
)
add_q(make_question(CHAPTER, "Concept of Self", "Psychologist Albert Bandura formulated the concept of 'self-efficacy' to describe:", opts, c, s, 5))

# Q6: Self-Regulation and Delayed Gratification
opts, c, s = rotate_options(
    "The capacity to postpone immediate gratification of desires to achieve long-term valuable rewards",
    ["The immediate impulsive consumption of whatever tempting item is present", "The total surrender of personal self-control to external group pressures", "The suppression of all thoughts through pharmaceutical sedatives"],
    "B",
    "Self-regulation involves monitoring and adapting one's own behaviour; a cornerstone of self-regulation is delayed gratification—the ability to postpone immediate rewards in pursuit of larger future goals.\nHence, Option {{CORR}} is correct.",
    "Explains delayed gratification as a cornerstone of self-regulation."
)
add_q(make_question(CHAPTER, "Concept of Self", "In the psychological analysis of self-regulation, 'delayed gratification' refers to:", opts, c, s, 6))

# Q7: Walter Mischel Marshmallow Test
opts, c, s = rotate_options(
    "Children who resisted eating one marshmallow immediately received two marshmallows later, predicting superior academic and social competence in adulthood",
    ["Children who ate the marshmallow immediately grew up to be professional athletes", "Children were placed in dark rooms to measure fear of animals", "Children were administered electroconvulsive shocks to measure pain tolerance"],
    "C",
    "Walter Mischel's famous Stanford marshmallow experiment demonstrated delayed gratification; children who successfully waited to receive two treats showed significantly higher academic success, self-control, and resilience later in life.\nHence, Option {{CORR}} is correct.",
    "Summarizes Walter Mischel's marshmallow study on delayed gratification."
)
add_q(make_question(CHAPTER, "Concept of Self", "Walter Mischel's renowned 'marshmallow test' provided foundational empirical evidence regarding:", opts, c, s, 7))

# Q8: Techniques of Self-Control
opts, c, s = rotate_options(
    "Observation of own behaviour, Self-instruction, and Self-reinforcement",
    ["Aggressive projection, Subconscious repression, and Hypnotic trance", "Rote memorization, Physical fatigue, and Fasting for days", "External punishment, Physical isolation, and Humiliation in public"],
    "D",
    "Psychological techniques for developing self-control include: (1) Observation of own behaviour (self-monitoring), (2) Self-instruction (guiding oneself with internal verbal cues), and (3) Self-reinforcement (rewarding positive outcomes).\nHence, Option {{CORR}} is correct.",
    "Identifies the three psychological techniques of self-control."
)
add_q(make_question(CHAPTER, "Concept of Self", "Which set comprises the primary psychological techniques used for developing and enhancing self-control?", opts, c, s, 8))

# Q9: Western vs Indian Concept of Self
opts, c, s = rotate_options(
    "The Western self is discrete, individualistic, with clear sharp boundaries from the group, whereas the Indian self is relational, interdependent, with shifting flexible boundaries",
    ["The Western self has no boundaries at all, whereas the Indian self is completely isolated from all humans", "The Western self rejects all technology, whereas the Indian self rejects all family traditions", "Both cultures have completely identical views of self with zero difference in boundaries"],
    "A",
    "The Western perspective views the self as discrete, autonomous, with rigid boundaries separating individual from society; the Indian perspective emphasizes an interdependent self where boundaries between individual, group, and nature are flexible and shifting.\nHence, Option {{CORR}} is correct.",
    "Contrasts the Western and Indian notions of self."
)
add_q(make_question(CHAPTER, "Culture and Self", "How do the Western and Indian psychological conceptualizations of the 'self' primarily differ regarding boundaries?", opts, c, s, 9))

# Q10: Personality Definition (Allport)
opts, c, s = rotate_options(
    "The dynamic organisation within the individual of those psychophysical systems that determine their unique adjustments to the environment",
    ["The superficial external makeup and fashionable clothing an individual wears to a social banquet", "An unchangeable genetic code inscribed in blood cells that never interacts with experience", "The reputation and financial wealth left behind by an individual after death"],
    "A",
    "Gordon Allport proposed the classic definition: 'Personality is the dynamic organisation within the individual of those psychophysical systems that determine his unique adjustments to his environment.'\nHence, Option {{CORR}} is correct.",
    "Accurately quotes Gordon Allport's famous definition of personality."
)
add_q(make_question(CHAPTER, "Concept of Personality", "Gordon Allport famously defined personality as:", opts, c, s, 10))

# Q11: Characteristics of Personality
opts, c, s = rotate_options(
    "It has both physical and psychological components, its expression in terms of behaviour is fairly stable across time, and it is unique to each individual",
    ["It changes completely every hour depending on what meal a person eats", "It consists exclusively of an individual's external facial bone structure", "It is identical across all members of a family regardless of individual experience"],
    "B",
    "Key characteristics of personality in NCERT: (1) physical and psychological components, (2) relatively stable and enduring over time, (3) unique to each individual, and (4) dynamic in adapting to situational demands.\nHence, Option {{CORR}} is correct.",
    "Lists the core characteristics of personality."
)
add_q(make_question(CHAPTER, "Concept of Personality", "Which of the following statements accurately summarizes the fundamental characteristics of human personality?", opts, c, s, 11))

# Q12: Type vs Trait Approaches
opts, c, s = rotate_options(
    "Type approaches categorize personalities into broad distinct qualitative classes, whereas trait approaches view personality as specific building blocks or dimensions along a continuous spectrum",
    ["Type approaches use statistical factor analysis, while trait approaches use ancient horoscopes", "Type approaches only apply to animals, while trait approaches only apply to infants", "Type approaches assess unconscious dreams, while trait approaches assess body weight"],
    "C",
    "Type approaches place individuals into distinct qualitative personality types based on pattern similarities (e.g. Type A or Introvert), whereas trait approaches measure stable specific psychological characteristics along continuous quantitative dimensions.\nHence, Option {{CORR}} is correct.",
    "Accurately contrasts type and trait approaches."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "What is the primary conceptual distinction between 'type approaches' and 'trait approaches' to personality?", opts, c, s, 12))

# Q13: Hippocrates Four Humours
opts, c, s = rotate_options(
    "Sanguine (cheerful/optimistic), Phlegmatic (calm/lethargic), Choleric (irritable/hot-tempered), and Melancholic (depressed/sad)",
    ["Oral, Anal, Phallic, and Genital", "Endomorphic, Mesomorphic, Ectomorphic, and Dysplastic", "Sattva, Rajas, Tamas, and Moksha"],
    "D",
    "Greek physician Hippocrates proposed four personality types based on fluid humours: Sanguine (blood: cheerful/enthusiastic), Phlegmatic (phlegm: calm/lethargic), Choleric (yellow bile: irritable/angry), and Melancholic (black bile: depressed/sad).\nHence, Option {{CORR}} is correct.",
    "Lists Hippocrates' four humoral personality types."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "Greek physician Hippocrates classified human personality into which four temperaments based on bodily fluids (humours)?", opts, c, s, 13))

# Q14: William Sheldon Somatotypes
opts, c, s = rotate_options(
    "Endomorphic (round, soft, viscerotonic), Mesomorphic (strong, muscular, somatotonic), and Ectomorphic (thin, fragile, cerebrotonic)",
    ["Introverted, Extraverted, and Ambiverted", "Cardinally dominant, Centrally organized, and Secondarily expressive", "Oral receptive, Anal aggressive, and Phallic narcissistic"],
    "A",
    "William Sheldon proposed three somatotypes linking body build to temperament: Endomorphic (round/soft, relaxed, sociable - viscerotonic), Mesomorphic (muscular/strong, energetic, assertive - somatotonic), and Ectomorphic (thin/delicate, brainy, introverted - cerebrotonic).\nHence, Option {{CORR}} is correct.",
    "Identifies Sheldon's three somatotypes."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "William Sheldon classified human personality based on body build (somatotypes) into which three categories?", opts, c, s, 14))

# Q15: Match Sheldon Somatotypes with Temperament
add_q(make_match_question(
    CHAPTER, "Major Approaches to Personality",
    "Match List I (Sheldon's Somatotype) with List II (Associated Physical and Temperament Characteristics):",
    [("A", "Endomorphic"), ("B", "Mesomorphic"), ("C", "Ectomorphic"), ("D", "Cerebrotonic")],
    [("I", "Muscular, strong body build; adventurous, assertive, bold temperament"), ("II", "Thin, long body build; sensitive, intellectual, artistic temperament"), ("III", "Round, soft body build; relaxed, sociable, fond of food temperament"), ("IV", "Mental and nervous temperament associated with ectomorphic physique")],
    "A-III, B-I, C-II, D-IV", "A",
    "Endomorphic is round/soft/sociable (A-III); Mesomorphic is muscular/assertive (B-I); Ectomorphic is thin/delicate (C-II); Cerebrotonic represents ectomorphic temperament (D-IV).",
    "Correctly links Sheldon's body types to psychological traits."
))

# Q16: Carl Jung Introverts vs Extraverts
opts, c, s = rotate_options(
    "Introverts direct psychic energy inward, preferring solitude and reflection, whereas extraverts direct psychic energy outward, enjoying social engagement and active interaction",
    ["Introverts are clinically insane, while extraverts are medically normal", "Introverts cannot speak any language, while extraverts speak ten languages", "Introverts have high blood pressure, while extraverts have low blood pressure"],
    "B",
    "Carl Jung classified individuals into Introverts (orienting psychic energy inward, introspective, comfortable alone) and Extraverts (orienting psychic energy outward, socially gregarious, comfortable in external action).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Jung's introverts from extraverts."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "In Carl Jung's personality typology, how are introverts and extraverts differentiated?", opts, c, s, 16))

# Q17: Friedman and Rosenman Type A Personality
opts, c, s = rotate_options(
    "High competitiveness, impatience, constant sense of time urgency, and proneness to coronary heart disease (CHD)",
    ["Relaxed, easy-going, patient demeanour with low competitive drive", "Passive, unassertive, self-sacrificing disposition prone to cancer", "Chronic depressive withdrawal with complete social mutism"],
    "C",
    "Friedman and Rosenman identified the Type A personality pattern, characterized by intense competitiveness, time urgency, impatience, hostility, and a significantly heightened vulnerability to coronary heart disease (CHD).\nHence, Option {{CORR}} is correct.",
    "Identifies key traits of Type A personality."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "Which behavioral pattern characterizes Type A personality as described by cardiologists Friedman and Rosenman?", opts, c, s, 17))

# Q18: Type B Personality
opts, c, s = rotate_options(
    "Absence of Type A traits; individuals are relaxed, patient, unhurried, and enjoy activities without intense competitive tension",
    ["Aggressive hostility combined with explosive anger during driving", "Constant checking of clocks and extreme chronic hypertension", "Obsessive cleanliness combined with severe phobic panic"],
    "D",
    "Type B personality is characterized by the absence of Type A traits; Type B individuals are calm, patient, work steadily without time panic, and do not suffer from intense competitive stress.\nHence, Option {{CORR}} is correct.",
    "Describes Type B personality characteristics."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "How is Type B personality defined in relation to Type A personality?", opts, c, s, 18))

# Q19: Morris Type C Personality
opts, c, s = rotate_options(
    "Unassertive, patient, emotionally compliant, suppressing negative emotions (particularly anger), and prone to cancer",
    ["High athletic agility combined with extreme musical genius", "Paranoid suspicion of strangers combined with violent rage", "Extroverted sociability combined with reckless financial risk-taking"],
    "A",
    "Morris and colleagues described Type C personality, characterized by emotional repression (especially of anger and hurt), unassertiveness, cooperativeness, and compliance, predisposing individuals to cancer.\nHence, Option {{CORR}} is correct.",
    "Identifies Type C personality traits and illness vulnerability."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "Which characteristics define Type C personality, and to which medical illness are Type C individuals vulnerable?", opts, c, s, 19))

# Q20: Type D Personality (Denollet)
opts, c, s = rotate_options(
    "Distressed personality characterized by high negative affectivity and social inhibition, predisposing individuals to depression and cardiac events",
    ["Daring personality characterized by extreme thrill-seeking and skydiving", "Diplomatic personality characterized by exceptional political charisma", "Disorganized personality characterized by severe intellectual disability"],
    "B",
    "Type D (distressed) personality is marked by negative affectivity (tendency to experience negative emotions like worry, sadness) and social inhibition (avoiding self-expression in social interactions), predisposing to depression and cardiac mortality.\nHence, Option {{CORR}} is correct.",
    "Identifies Type D personality traits."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "What defines the 'Type D' personality pattern identified in health psychology?", opts, c, s, 20))

# Q21: Ayurvedic Triguna Model
opts, c, s = rotate_options(
    "Sattva (cleanliness, truth, wisdom), Rajas (passion, activity, ego), and Tamas (inertia, lethargy, ignorance)",
    ["Vata, Pitta, and Kapha", "Brahmana, Kshatriya, and Vaishya", "Dharma, Artha, and Kama"],
    "C",
    "The Triguna typology from Indian philosophy classifies personality based on three Gunas: Sattva Guna (purity, truth, cleanliness, wisdom), Rajas Guna (passion, intense activity, desire), and Tamas Guna (lethargy, darkness, ignorance).\nHence, Option {{CORR}} is correct.",
    "Identifies the three Gunas in Ayurvedic Triguna theory."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "The ancient Indian Triguna theory classifies personality according to which three core qualities (Gunas)?", opts, c, s, 21))

# Q22: Sattva Guna Behavioral Traits
opts, c, s = rotate_options(
    "Truthfulness, cleanliness, wisdom, detachment, compassion, and discipline",
    ["Envy, aggressive ambition, restlessness, and excessive materialism", "Laziness, chronic sleepiness, ignorance, and depression", "Deceitfulness, exploitation of friends, and chronic gambling"],
    "A",
    "Sattva Guna is associated with truthfulness, moral cleanliness, intellectual clarity, selfless service, compassion, and inner peace.\nHence, Option {{CORR}} is correct.",
    "Lists behavioral manifestations of Sattva Guna."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "An individual dominated by 'Sattva Guna' exhibits which behavioral characteristics?", opts, c, s, 22))

# Q23: Rajas Guna Behavioral Traits
opts, c, s = rotate_options(
    "Intense desire for sensual pleasures, restlessness, ambition, and aggressive striving for power",
    ["Complete mental tranquility, spiritual renunciation, and deep wisdom", "Complete physical paralysis, inability to eat, and mutism", "Profound intellectual giftedness in abstract mathematics"],
    "B",
    "Rajas Guna is characterized by burning passion, intense ambition, desire for fame and sensory gratification, restlessness, and aggressive competitive striving.\nHence, Option {{CORR}} is correct.",
    "Lists behavioral manifestations of Rajas Guna."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "Which characteristics are predominant in an individual whose personality is dominated by 'Rajas Guna'?", opts, c, s, 23))

# Q24: Tamas Guna Behavioral Traits
opts, c, s = rotate_options(
    "Lethargy, inertia, sloth, ignorance, depression, and darkness",
    ["High energy, intellectual productivity, and athletic stamina", "Unselfish devotion to social welfare and charitable service", "Artistic creative innovation and philosophical publication"],
    "C",
    "Tamas Guna manifests as lethargy, mental dullness, indolence, sloth, attachment to ignorance, and depressive passivity.\nHence, Option {{CORR}} is correct.",
    "Lists behavioral manifestations of Tamas Guna."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "What behavioral traits are typical of a person characterized predominantly by 'Tamas Guna'?", opts, c, s, 24))

# Q25: Gordon Allport's Trait Hierarchy
opts, c, s = rotate_options(
    "Cardinal traits, Central traits, and Secondary traits",
    ["Id traits, Ego traits, and Superego traits", "Extraverted traits, Neurotic traits, and Psychotic traits", "Surface traits, Source traits, and Dynamic traits"],
    "D",
    "Gordon Allport organized personality traits into a threefold hierarchy: Cardinal traits (pervasive dominant traits), Central traits (major building blocks of personality), and Secondary traits (narrow situational tendencies).\nHence, Option {{CORR}} is correct.",
    "Identifies Gordon Allport's three levels of traits."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "Gordon Allport organized personality traits into which hierarchical categorization?", opts, c, s, 25))

# Q26: Cardinal Traits (Allport)
opts, c, s = rotate_options(
    "A pervasive trait so dominant that virtually all of a person's life activities are guided by it (e.g., Gandhian non-violence, Christ-like altruism)",
    ["A minor preference for specific food spices or clothing colors", "A core group of 5 to 10 traits listed in a letter of recommendation", "An unconscious defense mechanism developed during the oral psychosexual stage"],
    "A",
    "Cardinal traits are so pervasive and dominant that an individual's entire life revolves around them; historical examples include Mahatma Gandhi (non-violence) and Mother Teresa (humanitarian service).\nHence, Option {{CORR}} is correct.",
    "Defines Allport's cardinal traits."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "According to Gordon Allport, what characterizes a 'cardinal trait'?", opts, c, s, 26))

# Q27: Central Traits (Allport)
opts, c, s = rotate_options(
    "The 5 to 10 major building block traits that characterize everyday functioning and are commonly listed in letters of recommendation (e.g., honesty, diligence)",
    ["A single overriding passion that makes a person world-famous", "Temporary preferences for drinking tea instead of coffee", "Biological reflexes such as pupillary contraction to light"],
    "B",
    "Central traits are the primary building blocks of an individual's personality (typically 5 to 10 traits like honesty, warm-heartedness, assertiveness) that someone would mention when writing a character reference.\nHence, Option {{CORR}} is correct.",
    "Defines Allport's central traits."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "In Gordon Allport's framework, 'central traits' are best described as:", opts, c, s, 27))

# Q28: Secondary Traits (Allport)
opts, c, s = rotate_options(
    "Less consistent, situational preferences such as food choices, musical tastes, or clothing styles",
    ["The dominant life mission of a person such as Machiavellian political ruthlessness", "Core moral conscience that generates severe feelings of neurotic guilt", "Inborn biological drives for survival and reproduction"],
    "C",
    "Secondary traits are narrow, situational preferences and habits (e.g. preference for jazz music, specific dressing style, or reluctance to travel by air) that are less consistent and less influential than central traits.\nHence, Option {{CORR}} is correct.",
    "Defines Allport's secondary traits."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "What constitutes 'secondary traits' according to Gordon Allport?", opts, c, s, 28))

# Q29: Raymond Cattell: Surface vs Source Traits
opts, c, s = rotate_options(
    "Surface traits are observable behavioural manifestations, whereas source traits are the underlying, basic building blocks identified through factor analysis",
    ["Surface traits are genetic, while source traits are learned in nursery school", "Surface traits only appear during sleep, while source traits appear while awake", "Surface traits are completely absent in normal human beings"],
    "D",
    "Cattell distinguished between surface traits (observable patterns of behavior like sociability or irritability) and source traits (the underlying, fundamental dimensions identified through factor analysis that give rise to surface traits).\nHence, Option {{CORR}} is correct.",
    "Differentiates Cattell's surface traits from source traits."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "In Raymond Cattell's trait theory, how are 'surface traits' and 'source traits' distinguished?", opts, c, s, 29))

# Q30: Cattell's 16 PF Questionnaire
opts, c, s = rotate_options(
    "Sixteen primary source traits measured through a standardized self-report personality inventory",
    ["Sixteen projective inkblots requiring free-association stories", "Sixteen physiological electrodes measuring autonomic skin conductance", "Sixteen ethical moral commandments tested in judicial courts"],
    "A",
    "Raymond Cattell developed the Sixteen Personality Factor Questionnaire (16 PF), a renowned psychometric self-report test measuring 16 basic source traits discovered through factor analysis.\nHence, Option {{CORR}} is correct.",
    "Identifies Cattell's 16 PF questionnaire."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "Raymond Cattell developed the 16 PF (Sixteen Personality Factor) Questionnaire to evaluate:", opts, c, s, 30))

# Q31: Hans Eysenck's Personality Dimensions
opts, c, s = rotate_options(
    "Extraversion vs Introversion, Neuroticism vs Emotional Stability, and Psychoticism vs Sociability",
    ["Id, Ego, and Superego", "Orality, Anality, and Phallicity", "Sattva, Rajas, and Tamas"],
    "A",
    "Hans Eysenck proposed that personality is biologically based and structured across three fundamental dimensions: Extraversion vs Introversion, Neuroticism vs Emotional Stability, and Psychoticism vs Sociability (EPQ).\nHence, Option {{CORR}} is correct.",
    "Lists Eysenck's three dimensions of personality."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "Hans Eysenck proposed that personality dimensions are biologically rooted and organized into which three dimensions?", opts, c, s, 31))

# Q32: Neuroticism vs Emotional Stability (Eysenck)
opts, c, s = rotate_options(
    "Neuroticism involves emotional instability, anxiety, moodiness, and touchiness, while stability involves calm, even-tempered control",
    ["Neuroticism involves high physical muscular strength, while stability involves intellectual blindness", "Neuroticism is identical to sociability, while stability is identical to extraversion", "Neuroticism only occurs after age 75, while stability occurs during adolescence"],
    "B",
    "On Eysenck's Neuroticism vs Emotional Stability axis: high neuroticism denotes emotional instability, anxiety, irritability, and difficulty recovering from stress, whereas emotional stability denotes calm, poised resilience.\nHence, Option {{CORR}} is correct.",
    "Explains Eysenck's Neuroticism vs Emotional Stability dimension."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "In Hans Eysenck's framework, what distinguishes an individual high on 'Neuroticism' from one high on 'Emotional Stability'?", opts, c, s, 32))

# Q33: Psychoticism vs Sociability (Eysenck)
opts, c, s = rotate_options(
    "High psychoticism denotes hostility, egocentrism, tough-mindedness, and disregard for others, while sociability denotes warmth, cooperation, and empathy",
    ["Psychoticism denotes artistic genius, while sociability denotes mathematical speed", "Psychoticism denotes high biological blood sugar, while sociability denotes low cholesterol", "Psychoticism denotes physical height, while sociability denotes visual acuity"],
    "C",
    "Eysenck's Psychoticism vs Sociability dimension contrasts individuals who are aggressive, antisocial, egocentric, and tough-minded (high psychoticism) with individuals who are warm, cooperative, and empathetic.\nHence, Option {{CORR}} is correct.",
    "Explains Eysenck's Psychoticism dimension."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "According to Hans Eysenck, a person scoring high on the 'Psychoticism' dimension is characterized by:", opts, c, s, 33))

# Q34: Five Factor Model (Big Five) Authors
opts, c, s = rotate_options(
    "Paul Costa and Robert McCrae",
    ["Sigmund Freud and Carl Jung", "Alfred Binet and Theodore Simon", "John Watson and B.F. Skinner"],
    "D",
    "The Five Factor Model of personality, commonly referred to as the 'Big Five', was developed and empirically validated by Paul Costa and Robert McCrae (NEO-PI).\nHence, Option {{CORR}} is correct.",
    "Attributes the Big Five model to Costa and McCrae."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "The Five-Factor Model of personality (popularly termed the 'Big Five') was developed by:", opts, c, s, 34))

# Q35: The Big Five Traits (OCEAN acronym)
opts, c, s = rotate_options(
    "Openness to experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism",
    ["Optimism, Courage, Empathy, Assertiveness, and Nobility", "Orderliness, Creativity, Energy, Altruism, and Normalcy", "Originality, Competence, Enthusiasm, Affability, and Non-violence"],
    "A",
    "The Big Five personality traits are encapsulated by the acronym OCEAN: Openness to experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.\nHence, Option {{CORR}} is correct.",
    "Lists all five traits of the Big Five model correctly."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "Which five personality traits constitute the Five-Factor Model (OCEAN) proposed by Costa and McCrae?", opts, c, s, 35))

# Q36: Match Big Five Traits with Behavioral Definitions
add_q(make_match_question(
    CHAPTER, "Trait Approaches to Personality",
    "Match List I (Big Five Trait) with List II (Key Behavioral Marker):",
    [("A", "Openness to Experience"), ("B", "Conscientiousness"), ("C", "Agreeableness"), ("D", "Neuroticism")],
    [("I", "Helpful, trusting, cooperative, and empathetic toward others"), ("II", "Curious, imaginative, creative, and receptive to new ideas"), ("III", "Organized, disciplined, responsible, and goal-directed"), ("IV", "Anxious, emotionally unstable, irritable, and vulnerable to distress")],
    "A-II, B-III, C-I, D-IV", "A",
    "Openness: imaginative/curious (A-II); Conscientiousness: organized/disciplined (B-III); Agreeableness: helpful/cooperative (C-I); Neuroticism: anxious/emotionally unstable (D-IV).",
    "Accurately maps the Big Five dimensions to behavioral descriptions."
))

# Q37: Conscientiousness characteristics
opts, c, s = rotate_options(
    "Being organized, dependable, disciplined, achievement-oriented, and thorough in fulfilling obligations",
    ["Being impulsive, disorganized, careless, and habitually tardy", "Seeking constant stimulation through loud noisy nightclubs", "Experiencing severe panic attacks when speaking in public"],
    "A",
    "High conscientiousness in the Big Five model represents self-discipline, careful organization, planfulness, responsibility, and perseverance in achieving goals.\nHence, Option {{CORR}} is correct.",
    "Identifies conscientiousness traits in the Big Five."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "An individual who scores high on 'Conscientiousness' in the Big Five model is characteristically:", opts, c, s, 37))

# Q38: Agreeableness characteristics
opts, c, s = rotate_options(
    "Helpful, empathetic, warm, trusting, forgiving, and cooperative",
    ["Cold, cynical, suspicious, argumentative, and antagonistic", "Inventing new abstract mathematical theories in isolation", "Obsessively organizing bookshelves in alphabetical order"],
    "B",
    "Agreeableness reflects individual differences in prosocial orientation: high scorers are trusting, helpful, empathetic, generous, and cooperative, whereas low scorers are cynical and hostile.\nHence, Option {{CORR}} is correct.",
    "Identifies agreeableness traits in the Big Five."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "Which set of attributes best exemplifies a person high on 'Agreeableness' in the Five-Factor Model?", opts, c, s, 38))

# Q39: Openness to Experience characteristics
opts, c, s = rotate_options(
    "Imaginative, intellectually curious, appreciative of art, and open to novel perspectives",
    ["Rigid, conventional, narrow-minded, and resistant to any lifestyle changes", "Intensely hostile toward competitors and exhibiting chronic road rage", "Chronically anxious about imaginary bacterial contamination"],
    "C",
    "Openness to experience involves intellectual curiosity, aesthetic sensitivity, rich fantasy life, active imagination, and willingness to embrace novel, unconventional ideas.\nHence, Option {{CORR}} is correct.",
    "Identifies openness to experience traits."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "In the Big Five framework, high 'Openness to Experience' is manifested through:", opts, c, s, 39))

# Q40: Statement on Trait Consistency across Situations
add_q(make_statement_question(
    CHAPTER, "Trait Approaches to Personality",
    "Traits represent relatively stable and enduring psychological characteristics that influence behaviour across diverse situations.",
    "Interactionism posits that situational factors interact with internal personality traits to determine an individual's actual behaviour.",
    1, "A",
    "Both statements are correct. Personality traits reflect enduring tendencies across time and situations, but modern psychologists recognize interactionism: actual behavior is a product of the dynamic interaction between personality traits and situational contexts.",
    "Validates the concept of personality consistency and interactionism."
))

print(f"Unit 2 Section 1 complete: {len(unit2_qs)} questions generated.")

# --- SECTION 2: PSYCHODYNAMIC THEORY & DEFENSE MECHANISMS (Q41 - Q80) ---

# Q41: Freud's Iceberg Analogy
opts, c, s = rotate_options(
    "The conscious mind represents the small visible tip above the water, while the vast unconscious mind lies submerged beneath the surface",
    ["The conscious mind represents the vast ocean, while the unconscious is an empty iceberg", "The ego is entirely frozen and unable to think, while the id is hot boiling steam", "The superego represents the north pole, while the id represents the south pole"],
    "A",
    "Sigmund Freud compared the human mind to an iceberg where the conscious mind is only the small visible tip above the surface, while the vast unconscious mind, containing instinctual drives and repressed memories, remains submerged below.\nHence, Option {{CORR}} is correct.",
    "Explains Freud's iceberg metaphor of consciousness."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "Sigmund Freud used the metaphor of an iceberg to illustrate that:", opts, c, s, 41))

# Q42: Three Levels of Consciousness
opts, c, s = rotate_options(
    "Conscious (active awareness), Preconscious (easily retrievable memories), and Unconscious (repressed instincts and desires)",
    ["Sensory memory, Short-term memory, and Long-term memory", "Operations, Contents, and Products", "Alpha state, Theta state, and Delta state"],
    "B",
    "Freud's topographical model of mind comprises the Conscious (ideas and feelings we are actively aware of), Preconscious (materials outside awareness that can easily be brought into consciousness), and Unconscious (repressed, inaccessible instincts and conflicts).\nHence, Option {{CORR}} is correct.",
    "Lists Freud's three levels of consciousness."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "Freud's topographical model of the mind divides mental activity into which three levels of consciousness?", opts, c, s, 42))

# Q43: The Id and Pleasure Principle
opts, c, s = rotate_options(
    "Operates on the pleasure principle, demanding immediate gratification of instinctual biological impulses without moral or realistic delay",
    ["Operates on the moral principle, enforcing strict societal laws and guilt", "Operates on the reality principle, delaying gratification through realistic planning", "Operates on the logical principle, deducing mathematical theorems"],
    "C",
    "The Id is the primitive, instinctual component of personality, operating entirely on the pleasure principle—seeking immediate satisfaction of biological drives (hunger, sex, aggression) without regard for reality or ethics.\nHence, Option {{CORR}} is correct.",
    "Defines the Id and the pleasure principle."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "In Sigmund Freud's structural model of personality, the 'Id' is characterized by:", opts, c, s, 43))

# Q44: Primary Process Thinking
opts, c, s = rotate_options(
    "Illogical, irrational, wish-fulfilling mental activity aimed at generating mental images of desired objects to discharge instinctual tension",
    ["Logical, realistic deduction used by scientists in laboratory research", "Conscious grammatical verbal communication in corporate meetings", "Moral deliberations regarding religious commandments"],
    "D",
    "Primary process thinking is the mode of cognitive operation characteristic of the Id; it is primitive, irrational, fantasy-oriented, and seeks tension reduction through wish-fulfillment (e.g. dreaming or imagining food when starving).\nHence, Option {{CORR}} is correct.",
    "Explains primary process thinking in Freud's theory."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "In psychoanalytic theory, 'primary process thinking' refers to:", opts, c, s, 44))

# Q45: The Ego and Reality Principle
opts, c, s = rotate_options(
    "Operates on the reality principle, acting as the executive mediator that balances the instinctual demands of the id, the moral ideals of the superego, and the constraints of the external world",
    ["Demands immediate sexual gratification without considering legal consequences", "Inflicts severe self-destructive guilt for having normal human desires", "Directs physical blood circulation through the cardiovascular chambers"],
    "A",
    "The Ego operates on the reality principle, utilizing secondary process (logical, rational) thinking to mediate realistically between the impulsive demands of the Id, the moralistic censorship of the Superego, and external reality.\nHence, Option {{CORR}} is correct.",
    "Defines the Ego and the reality principle."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "The 'Ego' in Freud's structural model operates on which principle, and what is its primary function?", opts, c, s, 45))

# Q46: The Superego and Moral Principle
opts, c, s = rotate_options(
    "Internalized moral standards, ethical values, and parental prohibitions, consisting of the conscience and the ego-ideal",
    ["Biological hunger drives originating in the digestive tract", "Subconscious fear of mathematical examinations in school", "Motor coordination centers located in the brainstem"],
    "B",
    "The Superego represents the moral arm of personality, internalizing societal and parental rules; it comprises the conscience (which punishes with guilt) and the ego-ideal (which rewards with pride).\nHence, Option {{CORR}} is correct.",
    "Defines the Superego and its components."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "What constitutes the 'Superego' in Sigmund Freud's structural theory of personality?", opts, c, s, 46))

# Q47: Match Id, Ego, and Superego
add_q(make_match_question(
    CHAPTER, "Psychodynamic Approach",
    "Match List I (Structural Component of Personality) with List II (Guiding Principle / Operation):",
    [("A", "Id"), ("B", "Ego"), ("C", "Superego"), ("D", "Libido")],
    [("I", "Reality Principle and Secondary Process Thinking"), ("II", "Moral Principle, Conscience, and Guilt"), ("III", "Pleasure Principle and Primary Process Thinking"), ("IV", "Instinctual psychic sexual energy fueling life drives")],
    "A-III, B-I, C-II, D-IV", "A",
    "Id: Pleasure principle (A-III); Ego: Reality principle (B-I); Superego: Moral principle (C-II); Libido: psychic sexual energy (D-IV).",
    "Correctly pairs Freud's structural components with their operating principles."
))

# Q48: Concept of Ego Defense Mechanisms
opts, c, s = rotate_options(
    "Unconscious psychological strategies employed by the ego to protect itself against overwhelming anxiety generated by intrapsychic conflicts",
    ["Conscious plans written in a notebook to budget financial investments", "Biological antibodies created by white blood cells to neutralize bacteria", "Physical martial arts techniques used to defend against street muggers"],
    "A",
    "Ego defense mechanisms are unconscious psychological strategies used by the ego to distort reality and reduce intrapsychic anxiety caused by conflicts between id impulses and superego demands.\nHence, Option {{CORR}} is correct.",
    "Defines ego defense mechanisms."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "In Freudian theory, what is the core purpose of ego defense mechanisms?", opts, c, s, 48))

# Q49: Repression (Primary Defense Mechanism)
opts, c, s = rotate_options(
    "Pushing unacceptable, anxiety-provoking thoughts, impulses, and memories deep into the unconscious mind so they are completely forgotten from conscious awareness",
    ["Blaming others for one's own mistakes and emotional failures", "Expressing intense opposite feelings to conceal true hatred", "Engaging in vigorous athletic exercise to vent sexual tension"],
    "B",
    "Repression is the fundamental defense mechanism whereby unacceptable desires, traumatic memories, or dangerous impulses are pushed down into the unconscious, completely excluded from conscious awareness.\nHence, Option {{CORR}} is correct.",
    "Identifies repression as burying unacceptable thoughts into the unconscious."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "Which defense mechanism is regarded as the primary and most fundamental defense, involving the unconscious expulsion of threatening ideas from awareness?", opts, c, s, 49))

# Q50: Projection
opts, c, s = rotate_options(
    "Attributing one's own unacceptable impulses, desires, or hostile motives onto other people (e.g. a person with hostile feelings accuses others of hating them)",
    ["Refusing to acknowledge the reality of a diagnosed terminal medical illness", "Acting in an infantile manner by crying and sucking one's thumb during an adult argument", "Making logical excuses to justify failing an academic examination"],
    "C",
    "Projection occurs when an individual protects the ego by attributing their own unacceptable impulses, feelings, or shortcomings onto others (e.g., 'I hate him' becomes projected as 'He hates me').\nHence, Option {{CORR}} is correct.",
    "Defines projection with a psychological example."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "When an individual attributes their own unacceptable impulses, traits, or motives onto others, which defense mechanism are they displaying?", opts, c, s, 50))

# Q51: Denial
opts, c, s = rotate_options(
    "Refusing to acknowledge or accept the existence of an anxiety-provoking external reality (e.g. refusing to believe a loved one has died)",
    ["Transforming sexual impulses into classical oil painting", "Transferring anger from a shouting boss onto an innocent family pet", "Explaining that failing a test was due to an unfair printing font"],
    "D",
    "Denial is a defense mechanism wherein the individual completely refuses to accept or acknowledge an unpleasant reality or external fact (e.g. a patient refusing to accept a positive cancer diagnosis).\nHence, Option {{CORR}} is correct.",
    "Defines denial accurately."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "Which defense mechanism involves a total refusal to accept or consciously acknowledge an obvious, anxiety-provoking external reality?", opts, c, s, 51))

# Q52: Reaction Formation
opts, c, s = rotate_options(
    "Adopting and expressing conscious attitudes and behaviours that are the exact opposite of one's true unacceptable unconscious feelings (e.g. smothering a disliked sibling with excessive affection)",
    ["Channeling violent aggressive impulses into professional boxing matches", "Regressing to childhood bed-wetting following the birth of a baby brother", "Blaming a teacher for failing an exam that was never studied for"],
    "A",
    "Reaction formation occurs when an individual conceals an unacceptable unconscious impulse by adopting and vehemently displaying the exact opposite conscious behavior (e.g., concealing intense hostility behind an exaggerated facade of sweet affection).\nHence, Option {{CORR}} is correct.",
    "Defines reaction formation with an illustrative example."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "When a person disguises an unacceptable unconscious impulse by adopting and expressing the exact opposite conscious attitude, which defense mechanism is at work?", opts, c, s, 52))

# Q53: Rationalization
opts, c, s = rotate_options(
    "Inventing plausible, socially acceptable reasons or excuses to justify unacceptable behaviors or disappointed outcomes (e.g. 'sour grapes' reasoning)",
    ["Attributing one's own jealousy to one's innocent spouse", "Completely forgetting the anniversary date of a traumatic car crash", "Painting expressive watercolors to release pent-up romantic grief"],
    "B",
    "Rationalization occurs when a person devises plausible, logical, and socially acceptable explanations to justify unacceptable thoughts or actions, protecting self-esteem (e.g. Aesop's fox declaring unreachable grapes to be sour).\nHence, Option {{CORR}} is correct.",
    "Defines rationalization."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "Which defense mechanism involves fabricating logical, plausible, and socially acceptable explanations to justify irrational or failed behaviour?", opts, c, s, 53))

# Q54: Displacement
opts, c, s = rotate_options(
    "Redirecting an unacceptable impulse or emotional response from a dangerous or threatening target to a safer, less threatening substitute (e.g. an employee scolded by his boss comes home and kicks the dog)",
    ["Channeling aggressive impulses into charitable medical surgery", "Refusing to acknowledge that a marriage has ended in legal divorce", "Believing that all colleagues are secretly plotting corporate espionage"],
    "C",
    "Displacement is the redirection of an impulse or emotion (such as anger or fear) from the real threatening source toward an innocent, safer substitute target.\nHence, Option {{CORR}} is correct.",
    "Defines displacement with standard psychological example."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "An employee who is severely reprimanded by their boss at work refrains from arguing, but returns home and yells angrily at their child. Which defense mechanism is demonstrated?", opts, c, s, 54))

# Q55: Sublimation
opts, c, s = rotate_options(
    "Channeling unacceptable instinctual sexual or aggressive impulses into socially valued and culturally productive activities (e.g. art, literature, athletics)",
    ["Acting out aggressive desires through violent street assaults", "Escaping anxiety by regressing to adolescent thumb-sucking", "Claiming that everyone else in the city is corrupt and deceitful"],
    "D",
    "Sublimation is considered the most mature defense mechanism, wherein unacceptable primitive drives (libido or aggression) are transformed and redirected into socially constructive, culturally revered pursuits like fine art, scientific research, or sports.\nHence, Option {{CORR}} is correct.",
    "Defines sublimation as channeling impulses into socially valued activities."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "Which defense mechanism is regarded by Freud as the healthiest and most socially productive, transforming primitive impulses into creative and culturally valuable achievements?", opts, c, s, 55))

# Q56: Regression
opts, c, s = rotate_options(
    "Retreating to an earlier, more immature developmental stage characterized by primitive behavioral responses when confronted with severe stress",
    ["Channeling sexual tension into marathon running", "Falsely claiming to have graduated from an elite university", "Projecting one's greed onto business competitors"],
    "A",
    "Regression involves psychological retreat under severe stress to behavioral patterns characteristic of an earlier psychosexual or developmental stage (e.g., an adult throwing a temper tantrum or a toilet-trained child wetting the bed after sibling birth).\nHence, Option {{CORR}} is correct.",
    "Defines regression."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "When an adult throws an uncontrolled temper tantrum or curls up in bed weeping like an infant after encountering occupational stress, which defense mechanism is being exhibited?", opts, c, s, 56))

# Q57: Match Defense Mechanisms with Behavioral Scenarios
add_q(make_match_question(
    CHAPTER, "Psychodynamic Approach",
    "Match List I (Defense Mechanism) with List II (Behavioral Example):",
    [("A", "Projection"), ("B", "Reaction Formation"), ("C", "Displacement"), ("D", "Sublimation")],
    [("I", "A person with aggressive urges becomes an acclaimed competitive martial arts champion"), ("II", "A student who is furious at a strict professor goes home and slams the bedroom door"), ("III", "An intensely jealous individual accuses everyone else in the office of being jealous of them"), ("IV", "A person who harbors unconscious resentment toward an elder treats them with smothering polite deference")],
    "A-III, B-IV, C-II, D-I", "A",
    "Projection: accusing others of own jealousy (A-III); Reaction formation: smothering polite deference for hidden resentment (B-IV); Displacement: slamming bedroom door after professor scolding (C-II); Sublimation: aggressive urges channeled into martial arts (D-I).",
    "Accurately maps defense mechanisms to behavioral vignettes."
))

# Q58: Psychosexual Stages of Development Chronological Order
add_q(make_sequence_question(
    CHAPTER, "Psychodynamic Approach",
    "Arrange Sigmund Freud's psychosexual stages of development in correct chronological developmental order:",
    [
        ("A", "Oral Stage"),
        ("B", "Anal Stage"),
        ("C", "Phallic Stage"),
        ("D", "Latency Stage"),
        ("E", "Genital Stage")
    ],
    "A, B, C, D, E", "A",
    "Freud's five psychosexual stages occur in invariant developmental sequence: Oral stage (birth to 1 yr) -> Anal stage (1 to 3 yrs) -> Phallic stage (3 to 6 yrs) -> Latency stage (6 yrs to puberty) -> Genital stage (puberty onward).",
    "Chronologically sequences Freud's five psychosexual stages."
))

# Q59: Oral Stage characteristics and Fixation
opts, c, s = rotate_options(
    "Erogenous zone is the mouth (sucking, biting); fixation can lead to adult traits such as smoking, overeating, sarcasm, and excessive dependency",
    ["Erogenous zone is the feet; fixation leads to buying expensive running shoes", "Erogenous zone is the eyes; fixation leads to visual painting and birdwatching", "Erogenous zone is the ears; fixation leads to listening to orchestral classical symphonies"],
    "B",
    "During the Oral stage (0 to 1 yr), the mouth is the primary pleasure center. Fixation caused by under- or over-gratification can manifest in adulthood as smoking, nail-biting, overeating, sarcasm, and extreme dependency.\nHence, Option {{CORR}} is correct.",
    "Identifies oral stage characteristics and adult fixation traits."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "In Freud's theory of psychosexual development, which erogenous zone is central during the first year of life, and what adult traits can oral fixation produce?", opts, c, s, 59))

# Q60: Anal Stage: Anal-Retentive vs Anal-Expulsive
opts, c, s = rotate_options(
    "Anal-retentive traits include obstinate orderliness, perfectionism, and stinginess, whereas anal-expulsive traits include messiness, disorganization, and carelessness",
    ["Anal-retentive traits include writing long poetry, while anal-expulsive traits include singing opera", "Anal-retentive traits are purely physical bone fractures, while anal-expulsive traits are muscle spasms", "Both traits are identical with zero behavioural difference in adulthood"],
    "C",
    "During the Anal stage (1 to 3 yrs), toilet training conflict can lead to fixation: anal-retentive (overly strict training -> obstinate, excessively neat, stingy) or anal-expulsive (lenient training -> messy, disorganized, rebellious).\nHence, Option {{CORR}} is correct.",
    "Contrasts anal-retentive and anal-expulsive personality traits."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "How did Freud differentiate between 'anal-retentive' and 'anal-expulsive' adult personality outcomes resulting from toilet-training fixations?", opts, c, s, 60))

# Q61: Phallic Stage and Oedipus Complex
opts, c, s = rotate_options(
    "A young boy develops unconscious sexual desire for his mother, views his father as a rival, experiences castration anxiety, and ultimately resolves it by identifying with the father",
    ["A young boy desires to become a professional military pilot like his grandfather", "A young girl rejects all dolls to play with mechanical toy trains", "A child develops severe phobia of school classrooms during kindergarten"],
    "D",
    "In the Phallic stage (ages 3 to 6), the Oedipus complex involves a boy's romantic longing for his mother, hostility toward his rival father, castration anxiety, and resolution through psychological identification with the father.\nHence, Option {{CORR}} is correct.",
    "Defines the Oedipus complex."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "What does the 'Oedipus complex' during the phallic stage of psychosexual development entail according to Sigmund Freud?", opts, c, s, 61))

# Q62: Electra Complex (Carl Jung / Neo-Freudian elaboration)
opts, c, s = rotate_options(
    "A young girl develops unconscious attraction to her father, resentment toward her mother, experiences penis envy, and resolves it by identifying with her mother",
    ["A young girl decides to become a medical physician to treat elderly patients", "A girl experiences severe panic when separated from household pets", "A child refuses to eat solid vegetables during elementary school lunches"],
    "A",
    "The Electra complex (elaborated by Carl Jung) posits that in the phallic stage, a girl experiences romantic attachment to her father, resentment toward her mother, penis envy, and resolves the conflict by identifying with her mother.\nHence, Option {{CORR}} is correct.",
    "Defines the Electra complex."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "The concept of the 'Electra complex' in psychoanalytic theory refers to:", opts, c, s, 62))

# Q63: Latency Stage characteristics
opts, c, s = rotate_options(
    "Sexual urges remain dormant while psychic energy is channeled into schoolwork, peer friendships, hobbies, and social skill development",
    ["Sexual drives are intensely active and dominate all waking conscious activities", "The child regresses to infantile suckling and cannot speak any language", "The child experiences continuous hallucinations of terrifying mythical monsters"],
    "B",
    "During the Latency stage (age 6 to puberty), psychosexual energy becomes dormant; children channel their energy into intellectual learning, school achievement, athletics, and same-sex friendships.\nHence, Option {{CORR}} is correct.",
    "Identifies the latency stage characteristics."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "Which developmental characteristics define the 'Latency stage' of Freud's psychosexual theory?", opts, c, s, 63))

# Q64: Genital Stage characteristics
opts, c, s = rotate_options(
    "Emerges at puberty with physical sexual maturation, marked by genuine adult capacity for mature sexual love, deep emotional intimacy, and productive work",
    ["Total loss of all interest in human social contact and romantic relationships", "Retreat to the pleasure of infant thumb-sucking and complete mutism", "Fixation on accumulating physical paper money inside bank vaults"],
    "C",
    "The Genital stage begins at puberty with biological maturity; sexual impulses awaken in an adult form, and individuals who successfully navigate earlier stages attain mature romantic intimacy, unselfish love, and productive societal contributions.\nHence, Option {{CORR}} is correct.",
    "Defines the genital stage."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "What marks the culmination of healthy psychosexual development during the 'Genital stage'?", opts, c, s, 64))

# Q65: Fixation and Regression in Psychosexual Development
opts, c, s = rotate_options(
    "Fixation is the arrest of psychosexual development at an earlier stage due to over- or under-gratification, while regression is a return to an earlier stage under stress",
    ["Fixation is physical blindness, while regression is muscular paralysis", "Fixation occurs in old age, while regression occurs before conception", "Fixation only affects animals, while regression only affects computers"],
    "D",
    "Fixation refers to psychosexual development becoming permanently arrested at an unresolved stage due to excessive deprivation or gratification; regression is a temporary psychological retreat to an earlier stage under stress.\nHence, Option {{CORR}} is correct.",
    "Distinguishes fixation from regression."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "In Freud's developmental framework, how are 'fixation' and 'regression' conceptually distinguished?", opts, c, s, 65))

# Q66: Carl Jung: Analytical Psychology & Collective Unconscious
opts, c, s = rotate_options(
    "A deeper layer of the unconscious shared by all human beings, containing evolutionary memories and ancestral archetypes",
    ["A personal diary kept by an individual during high school years", "A collection of mathematical algorithms programmed into computers", "An individual's personal repressed childhood embarrassments"],
    "A",
    "Carl Jung established Analytical Psychology, proposing the 'collective unconscious'—a deep, transpersonal layer of the psyche inherited across human evolutionary history, populated by universal primordial images called archetypes.\nHence, Option {{CORR}} is correct.",
    "Defines Carl Jung's collective unconscious."
)
add_q(make_question(CHAPTER, "Post-Freudian Approaches", "What did Carl Jung mean by the term 'collective unconscious' in his Analytical Psychology?", opts, c, s, 66))

# Q67: Archetypes in Carl Jung's Theory
opts, c, s = rotate_options(
    "Inherited, universal primordial thought forms or symbolic images found across human cultures, myths, and dreams (e.g. Persona, Shadow, Anima, Animus)",
    ["Biological genes determining eye color and blood type", "Written legal statutes passed by parliamentary legislatures", "Standardized questions on an intelligence examination"],
    "B",
    "Archetypes are universal, archaic patterns and primordial images residing in the collective unconscious, manifested across world mythologies, religions, and dreams (prominent archetypes include Persona, Shadow, Anima, and Animus).\nHence, Option {{CORR}} is correct.",
    "Defines Jungian archetypes."
)
add_q(make_question(CHAPTER, "Post-Freudian Approaches", "In Carl Jung's theory, 'archetypes' are defined as:", opts, c, s, 67))

# Q68: Match Jung's Archetypes with Meanings
add_q(make_match_question(
    CHAPTER, "Post-Freudian Approaches",
    "Match List I (Jungian Archetype) with List II (Symbolic Psychological Representation):",
    [("A", "Persona"), ("B", "Shadow"), ("C", "Anima"), ("D", "Animus")],
    [("I", "The dark, animalistic, repressed instincts of the human psyche"), ("II", "The social mask or public facade an individual presents to the world"), ("III", "The masculine archetype or unconscious male side of a female"), ("IV", "The feminine archetype or unconscious female side of a male")],
    "A-II, B-I, C-IV, D-III", "A",
    "Persona: social mask (A-II); Shadow: dark animalistic instincts (B-I); Anima: feminine archetype in male (C-IV); Animus: masculine archetype in female (D-III).",
    "Correctly links Jungian archetypes to their definitions."
))

# Q69: Alfred Adler: Individual Psychology & Inferiority Complex
opts, c, s = rotate_options(
    "Human behaviour is motivated by the drive to overcome feelings of inferiority and strive for superiority and personal competence",
    ["Human behaviour is exclusively driven by biological sexual libido and death instincts", "Humans have zero agency and are entirely conditioned like laboratory animals", "Human personality is determined by the positions of astrological planets"],
    "A",
    "Alfred Adler founded Individual Psychology, emphasizing that every individual experiences feelings of inferiority originating in childhood vulnerability; the primary motivating force in human life is striving for superiority and mastery.\nHence, Option {{CORR}} is correct.",
    "Identifies Adler's core concept of striving for superiority to overcome inferiority."
)
add_q(make_question(CHAPTER, "Post-Freudian Approaches", "Alfred Adler's 'Individual Psychology' posited that the foremost driving force behind human personality development is:", opts, c, s, 69))

# Q70: Karen Horney: Basic Anxiety and Social Relationships
opts, c, s = rotate_options(
    "Basic anxiety originates from disturbed interpersonal relationships during childhood (parental indifference, rejection), rather than biological sexual instincts",
    ["Anxiety is caused strictly by genetic mutations on chromosome 21", "Anxiety is caused exclusively by low physical blood pressure", "Anxiety only occurs in individuals who fail college examinations"],
    "B",
    "Karen Horney challenged Freud's biological determinism, asserting that psychological difficulties stem from 'basic anxiety'—a feeling of being isolated and helpless in a hostile world, resulting from faulty childhood interpersonal relations.\nHence, Option {{CORR}} is correct.",
    "Explains Karen Horney's concept of basic anxiety."
)
add_q(make_question(CHAPTER, "Post-Freudian Approaches", "Karen Horney diverged from Sigmund Freud by asserting that 'basic anxiety' and personality disturbances arise primarily from:", opts, c, s, 70))

# Q71: Karen Horney's Interpersonal Orientations
opts, c, s = rotate_options(
    "Moving toward people (compliance/affection), Moving against people (aggression/power), and Moving away from people (detachment/withdrawal)",
    ["Oral fixation, Anal expulsion, and Phallic narcissism", "Introversion, Extraversion, and Ambiversion", "Sattva, Rajas, and Tamas"],
    "C",
    "Karen Horney described three primary interpersonal orientations individuals use to cope with basic anxiety: (1) Moving toward people (seeking affection and compliance), (2) Moving against people (seeking power and dominance), and (3) Moving away from people (seeking independence and detachment).\nHence, Option {{CORR}} is correct.",
    "Lists Horney's three interpersonal coping styles."
)
add_q(make_question(CHAPTER, "Post-Freudian Approaches", "According to Karen Horney, what three interpersonal orientations do individuals adopt to cope with basic anxiety?", opts, c, s, 71))

# Q72: Karen Horney's Critique of Penis Envy
opts, c, s = rotate_options(
    "Women envy the social power, privileges, and cultural status afforded to men in patriarchal societies, rather than the male biological anatomy itself",
    ["Women have an inherent biological desire to physically transform into men", "Men suffer from severe intellectual deficiency compared to women", "Childhood development is completely identical across all animal species"],
    "D",
    "Karen Horney rejected Freud's anatomical concept of 'penis envy', arguing that what women actually envy is the social status, authority, and economic privileges historically monopolized by men in patriarchal cultures.\nHence, Option {{CORR}} is correct.",
    "Explains Karen Horney's cultural reinterpretation of penis envy."
)
add_q(make_question(CHAPTER, "Post-Freudian Approaches", "How did Karen Horney critically reinterpret Sigmund Freud's concept of 'penis envy' in women?", opts, c, s, 72))

# Q73: Erik Erikson's Psychosocial Stages
opts, c, s = rotate_options(
    "Development spans across eight lifelong psychosocial stages, each marked by a specific psychosocial crisis (e.g. Trust vs Mistrust, Identity vs Role Confusion)",
    ["Development terminates permanently at age five following the phallic stage", "Development consists of three biological stages based on dietary transitions", "Development is purely genetic and involves zero social or emotional interaction"],
    "A",
    "Erik Erikson formulated an eight-stage psychosocial development theory spanning the entire human lifespan, where each stage presents a critical developmental crisis (e.g. Identity vs Role Confusion in adolescence).\nHence, Option {{CORR}} is correct.",
    "Characterizes Erikson's psychosocial developmental model."
)
add_q(make_question(CHAPTER, "Post-Freudian Approaches", "In contrast to Freud's psychosexual model, Erik Erikson's theory emphasized:", opts, c, s, 73))

# Q74: Carl Rogers: Humanistic Approach & Self-Concept
opts, c, s = rotate_options(
    "People are inherently good, possess an innate drive toward self-actualisation, and develop harmony when their Real Self and Ideal Self are congruent",
    ["People are born savage monsters driven exclusively by animalistic death drives", "Human behavior is entirely determined by unconscious childhood sexual fixations", "Personality can only be understood by conducting surgical animal experiments"],
    "B",
    "Carl Rogers championed the humanistic approach, postulating that human nature is fundamentally positive, forward-moving, and self-actualizing; healthy personality requires congruence between the perceived Real Self and the Ideal Self.\nHence, Option {{CORR}} is correct.",
    "Summarizes Carl Rogers' humanistic view of self and congruence."
)
add_q(make_question(CHAPTER, "Humanistic Approach", "The humanistic perspective on personality developed by Carl Rogers is founded upon which core premise?", opts, c, s, 74))

# Q75: Congruence vs Incongruence (Carl Rogers)
opts, c, s = rotate_options(
    "Congruence occurs when the Real Self matches the Ideal Self leading to psychological adjustment, whereas incongruence leads to anxiety and neurosis",
    ["Congruence occurs when an individual sleeps ten hours a day, while incongruence causes insomnia", "Congruence is identical to extraversion, while incongruence is identical to neuroticism", "Congruence only occurs in childhood, while incongruence only occurs in old age"],
    "C",
    "Rogers maintained that congruence—a high degree of consistency between an individual's real self-image and ideal self—produces psychological health, whereas a large discrepancy (incongruence) generates deep anxiety and maladjustment.\nHence, Option {{CORR}} is correct.",
    "Explains Rogers' concepts of congruence and incongruence."
)
add_q(make_question(CHAPTER, "Humanistic Approach", "In Carl Rogers' self theory, what consequences arise from 'congruence' versus 'incongruence' between the Real Self and Ideal Self?", opts, c, s, 75))

# Q76: Unconditional Positive Regard (Rogers)
opts, c, s = rotate_options(
    "Providing total acceptance, warmth, and non-judgmental respect to an individual regardless of their specific behaviours or flaws",
    ["Rewarding a child with physical gifts only when they score 100% on school examinations", "Subjecting an individual to silent isolation whenever they make a minor mistake", "Insisting that an individual must change their core identity to earn parental love"],
    "D",
    "Unconditional positive regard involves showing total, genuine acceptance and valuing of a person for who they are, without imposing conditions of worth (demanding specific accomplishments to earn love).\nHence, Option {{CORR}} is correct.",
    "Defines unconditional positive regard."
)
add_q(make_question(CHAPTER, "Humanistic Approach", "What did Carl Rogers mean by the therapeutic condition of 'unconditional positive regard'?", opts, c, s, 76))

# Q77: Abraham Maslow Hierarchy of Needs
add_q(make_sequence_question(
    CHAPTER, "Humanistic Approach",
    "Arrange Abraham Maslow's hierarchy of human needs in ascending order from basic physiological deficiency needs to growth needs:",
    [
        ("A", "Physiological Needs"),
        ("B", "Safety Needs"),
        ("C", "Belongingness and Love Needs"),
        ("D", "Esteem Needs"),
        ("E", "Self-Actualisation Needs")
    ],
    "A, B, C, D, E", "A",
    "Maslow's pyramid progresses from lower deficiency needs to highest growth need: (1) Physiological -> (2) Safety -> (3) Belongingness and Love -> (4) Esteem -> (5) Self-Actualisation.",
    "Sequences Maslow's hierarchy of needs from base to pinnacle."
))

# Q78: Self-Actualised Person Characteristics (Maslow)
opts, c, s = rotate_options(
    "Accurate perception of reality, self-acceptance, spontaneity, autonomy, deep interpersonal relationships, and peak experiences",
    ["Egocentric arrogance, intolerance of others' opinions, and obsession with wealth", "Chronic severe panic attacks combined with severe phobic avoidance of outdoors", "Total emotional numbness combined with inability to experience joy or sorrow"],
    "B",
    "Self-actualized individuals in Maslow's research perceive reality accurately, accept themselves and others, exhibit spontaneity and humor, value privacy, maintain deep friendships, and frequently report peak experiences.\nHence, Option {{CORR}} is correct.",
    "Identifies qualities of a self-actualized individual."
)
add_q(make_question(CHAPTER, "Humanistic Approach", "Which set of characteristics distinguishes 'self-actualised' individuals in Abraham Maslow's framework?", opts, c, s, 78))

# Q79: Statement on Self-Report Tests Limitations
add_q(make_statement_question(
    CHAPTER, "Assessment of Personality",
    "Self-report personality inventories are vulnerable to social desirability bias, where respondents choose answers to appear socially favorable.",
    "Acquiescence bias is the tendency of a respondent to agree with statements regardless of content.",
    1, "A",
    "Both statements are correct. Two major psychometric limitations of self-report inventories are social desirability (tendency to present oneself in a positive light) and acquiescence (tendency to answer 'yes' or 'agree' indiscriminately).",
    "Validates psychometric limitations of self-report inventories."
))

# Q80: Minnesota Multiphasic Personality Inventory (MMPI)
opts, c, s = rotate_options(
    "Hathaway and McKinley, consisting of 567 True/False items assessing psychiatric diagnostic scales and validity scales",
    ["Carl Jung, consisting of 100 inkblot pictures scored on emotional reactions", "Gordon Allport, consisting of 16 source trait dimensions scored on scales of 1 to 10", "Alfred Binet, consisting of 30 mental age puzzles for elementary school pupils"],
    "B",
    "The Minnesota Multiphasic Personality Inventory (MMPI) was developed by Starke Hathaway and J.C. McKinley; it contains 567 True/False items assessing clinical scales (e.g., depression, paranoia, schizophrenia) and validity scales.\nHence, Option {{CORR}} is correct.",
    "Identifies authors, item count, and structure of the MMPI."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "The Minnesota Multiphasic Personality Inventory (MMPI) was developed by whom, and what is its operational design?", opts, c, s, 80))

print(f"Unit 2 Section 2 complete: {len(unit2_qs)} questions generated.")

# --- SECTION 3: PROJECTIVE TECHNIQUES & BEHAVIOURAL ASSESSMENT (Q81 - Q120) ---

# Q81: Projective Techniques Rationale
opts, c, s = rotate_options(
    "By presenting ambiguous, unstructured stimuli, the individual unconsciously projects their internal motives, conflicts, and desires onto the material",
    ["By asking simple mathematical arithmetic questions, the psychologist tests logical memory speed", "By testing physical muscular reflexes, the examiner diagnoses spinal nerve damage", "By administering electrical shocks, the experimenter measures physical skin conductivity"],
    "A",
    "Projective techniques are rooted in psychodynamic theory; because the stimulus materials are ambiguous and unstructured, respondents cannot easily discern the 'correct' answer and unconsciously project their hidden feelings, conflicts, and needs onto the stimuli.\nHence, Option {{CORR}} is correct.",
    "Explains the psychodynamic rationale of projective techniques."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "What is the foundational theoretical rationale underlying projective techniques of personality assessment?", opts, c, s, 81))

# Q82: Hermann Rorschach Inkblot Test Composition
opts, c, s = rotate_options(
    "Ten standardized inkblot cards: five in black and white (achromatic), two in black and red, and three in multicolored pastel shades",
    ["Thirty black-and-white photographs of famous world political leaders", "Twelve geometric puzzle boxes requiring physical assembly without glue", "One hundred multiple-choice questions assessing psychiatric symptoms"],
    "B",
    "The Rorschach Inkblot Test, developed by Swiss psychiatrist Hermann Rorschach, consists of 10 standardized symmetrical inkblot cards: 5 are black and white (achromatic), 2 are black and red, and 3 are multicolored.\nHence, Option {{CORR}} is correct.",
    "Identifies the exact composition of the 10 Rorschach inkblot cards."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "The Rorschach Inkblot Test consists of ten standardized inkblot cards distributed in which color arrangement?", opts, c, s, 82))

# Q83: Rorschach Administration Phases
opts, c, s = rotate_options(
    "Performance Proper (examinee states what they see in each card) followed by the Inquiry Phase (examiner asks where and why the examinee saw those things)",
    ["Timed written essay followed by rapid multiple-choice oral examination", "Hypnotic induction followed by electrical galvanic skin measurement", "Silent observation through a one-way mirror without asking any questions"],
    "C",
    "The Rorschach is administered in two distinct phases: (1) Performance Proper, where cards are presented and the subject reports what they see, and (2) The Inquiry, where the examiner inquires where on the card the percept was seen and what features determined the response.\nHence, Option {{CORR}} is correct.",
    "Describes the two administration phases of the Rorschach test."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "What are the two standard sequential phases involved in administering the Rorschach Inkblot Test?", opts, c, s, 83))

# Q84: Rorschach Scoring Categories
opts, c, s = rotate_options(
    "Location (where on the blot), Determinants (what features like form, color, shading, movement), and Content (what was perceived like human, animal, object)",
    ["Speed of reaction, Number of words spoken, and Volume of vocal pitch", "Handwriting slant, Pressure of pencil on paper, and Eraser marks", "Heart rate acceleration, Blood pressure elevation, and Pupil dilation"],
    "D",
    "Responses on the Rorschach are systematically coded across three primary criteria: Location (whole blot W, detail D, space S), Determinants (form F, color C, movement M, shading), and Content (human figures H, animals A, nature, inanimate objects).\nHence, Option {{CORR}} is correct.",
    "Lists the primary scoring categories of the Rorschach Inkblot Test."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "On the Rorschach Inkblot Test, examinee responses are systematically scored and classified according to which three primary dimensions?", opts, c, s, 84))

# Q85: Match Rorschach Scoring Codes
add_q(make_match_question(
    CHAPTER, "Assessment of Personality",
    "Match List I (Rorschach Scoring Dimension) with List II (Specific Scoring Symbol/Category):",
    [("A", "Location: Whole blot"), ("B", "Location: Common Detail"), ("C", "Determinant: Human Movement"), ("D", "Determinant: Form alone")],
    [("I", "Code 'D'"), ("II", "Code 'M'"), ("III", "Code 'W'"), ("IV", "Code 'F'")],
    "A-III, B-I, C-II, D-IV", "A",
    "Whole blot: 'W' (A-III); Common detail: 'D' (B-I); Human movement: 'M' (C-II); Form alone: 'F' (D-IV).",
    "Correctly matches Rorschach scoring symbols with their criteria."
))

# Q86: Thematic Apperception Test (TAT) Developers
opts, c, s = rotate_options(
    "Christiana Morgan and Henry Murray",
    ["Hermann Rorschach and Carl Jung", "Alfred Binet and Theodore Simon", "Raymond Cattell and Hans Eysenck"],
    "A",
    "The Thematic Apperception Test (TAT) was developed in 1935 by American psychologists Christiana Morgan and Henry Murray at Harvard University.\nHence, Option {{CORR}} is correct.",
    "Attributes the TAT to Morgan and Murray."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "The Thematic Apperception Test (TAT) was constructed by which psychologists?", opts, c, s, 86))

# Q87: TAT Card Materials and Administration
opts, c, s = rotate_options(
    "Thirty picture cards depicting diverse interpersonal situations involving individuals and one completely blank card",
    ["Ten cards with ambiguous symmetrical ink splatters", "Fifty-two playing cards used to assess mathematical probability skills", "Five wooden puzzle boards requiring rapid hand-eye coordination"],
    "B",
    "The standard TAT materials consist of 30 picture cards depicting individuals in ambiguous interpersonal situations and 1 blank card (some cards are suitable for adult males, females, boys, or girls; typically 20 cards are administered).\nHence, Option {{CORR}} is correct.",
    "Describes the physical materials of the TAT."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "What materials comprise the standard set of the Thematic Apperception Test (TAT)?", opts, c, s, 87))

# Q88: TAT Story Construction Instructions
opts, c, s = rotate_options(
    "Telling a complete story explaining: What led up to the event, What is happening now, What the characters are feeling and thinking, and What the final outcome will be",
    ["Writing a grammatical spelling translation of the title printed on the card", "Critiquing the artistic brushstroke technique used by the painter of the card", "Calculating the exact mathematical perspective ratio of the drawn background"],
    "C",
    "In the TAT, the examinee is instructed to construct a dramatic story about each picture covering four aspects: (1) what led up to the situation, (2) what is happening at the moment, (3) what the characters are feeling and thinking, and (4) what the final outcome will be.\nHence, Option {{CORR}} is correct.",
    "Specifies the four elements required in a TAT story."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "When taking the Thematic Apperception Test (TAT), what four narrative elements is the subject instructed to include in their story?", opts, c, s, 88))

# Q89: Indian Adaptation of TAT
opts, c, s = rotate_options(
    "Uma Choudhury",
    ["C.M. Bhatia", "J.M. Ojha", "Udai Pareek"],
    "D",
    "An acclaimed standardized Indian adaptation of the Thematic Apperception Test (TAT) was developed by Uma Choudhury, depicting culturally familiar Indian figures, clothing, and settings.\nHence, Option {{CORR}} is correct.",
    "Identifies Uma Choudhury as developer of the Indian adaptation of the TAT."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "Who developed the standardized Indian adaptation of the Thematic Apperception Test (TAT)?", opts, c, s, 89))

# Q90: Rosenzweig Picture-Frustration Study (P-F Study)
opts, c, s = rotate_options(
    "Saul Rosenzweig, assessing how an individual reacts to frustrating situations using cartoon drawings with speech captions",
    ["Hermann Rorschach, assessing visual memory of symmetrical ink blots", "Henry Murray, assessing unconscious needs for power and achievement", "Karen Machover, assessing body-image conflicts through human figure drawings"],
    "A",
    "The Rosenzweig Picture-Frustration Study (P-F Study) was created by Saul Rosenzweig to assess an individual's characteristic patterns of reaction when confronted with frustrating interpersonal situations.\nHence, Option {{CORR}} is correct.",
    "Identifies Saul Rosenzweig and the purpose of the P-F study."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "The Picture-Frustration Study was developed by Saul Rosenzweig to assess:", opts, c, s, 90))

# Q91: Directions of Aggression in Rosenzweig P-F Study
opts, c, s = rotate_options(
    "Extrapunitive (aggression directed outward at external persons/objects), Intropunitive (aggression turned inward against oneself), and Impunitive (aggression is evaded/minimized to make peace)",
    ["Oral aggressive, Anal aggressive, and Phallic aggressive", "Sattvic, Rajasic, and Tamasic", "Conscious aggression, Preconscious aggression, and Subconscious aggression"],
    "B",
    "The Rosenzweig P-F Study assesses three Directions of Aggression: Extrapunitive (blaming external world), Intropunitive (blaming oneself with guilt), and Impunitive (evading blame, glossing over frustration as trivial).\nHence, Option {{CORR}} is correct.",
    "Explains the three directions of aggression in the P-F study."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "In the Rosenzweig Picture-Frustration Study, what are the three 'directions of aggression'?", opts, c, s, 91))

# Q92: Match Directions of Aggression (P-F Study)
add_q(make_match_question(
    CHAPTER, "Assessment of Personality",
    "Match List I (Direction of Aggression in P-F Study) with List II (Operational Description):",
    [("A", "Extrapunitive"), ("B", "Intropunitive"), ("C", "Impunitive"), ("D", "Obstacle-Dominance")],
    [("I", "Aggression is turned inward upon oneself, expressing personal guilt or apology"), ("II", "Aggression is directed outward, blaming another person or external object"), ("III", "The frustrating barrier itself stands out and is continually highlighted"), ("IV", "Aggression is avoided, glossed over, or dismissed to maintain harmony")],
    "A-II, B-I, C-IV, D-III", "A",
    "Extrapunitive: blaming external world (A-II); Intropunitive: blaming oneself (B-I); Impunitive: glossing over frustration (C-IV); Obstacle-dominance: barrier highlighted (D-III).",
    "Correctly matches P-F study aggression directions with descriptions."
))

# Q93: Types of Aggression in P-F Study
opts, c, s = rotate_options(
    "Obstacle-Dominance (focus on barrier), Ego-Defense (focus on protecting oneself), and Need-Persistence (focus on finding a solution)",
    ["Physical assault, Verbal insult, and Cyber harassment", "Active fighting, Passive resistance, and Complete retreat", "Somatic conversion, Dissociative fugue, and Depersonalisation"],
    "C",
    "The Rosenzweig P-F Study measures three Types of Aggression: Obstacle-Dominance (barrier causing frustration is emphasized), Ego-Defense (the person's ego is defended against blame), and Need-Persistence (perseverance in solving the problem).\nHence, Option {{CORR}} is correct.",
    "Lists the three types of aggression in the Rosenzweig P-F study."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "Which three 'types of aggression' are scored on the Rosenzweig Picture-Frustration Study?", opts, c, s, 93))

# Q94: Indian Adaptation of Rosenzweig P-F Study
opts, c, s = rotate_options(
    "Udai Pareek",
    ["Uma Choudhury", "C.M. Bhatia", "J.M. Ojha"],
    "D",
    "The Indian adaptation of the Rosenzweig Picture-Frustration Study (for both adults and children) was developed by Indian psychologist Udai Pareek.\nHence, Option {{CORR}} is correct.",
    "Attributes the Indian adaptation of the P-F study to Udai Pareek."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "Who standardized the Indian adaptation of the Rosenzweig Picture-Frustration Study (P-F Study)?", opts, c, s, 94))

# Q95: Sentence Completion Test
opts, c, s = rotate_options(
    "Presents a series of incomplete sentence stems (e.g. 'My greatest fear is...') which the examinee ends with the first thought that comes to mind",
    ["Requires examinees to unscramble complex anagrams under strict stopwatch timing", "Asks examinees to spell long unfamiliar dictionary words correctly", "Presents a list of mathematical equations where plus and minus signs are missing"],
    "A",
    "Sentence Completion Tests utilize incomplete sentence stems (e.g., 'I feel happiest when...', 'My mother always...') that require subjects to complete the sentence, revealing unconscious attitudes and anxieties.\nHence, Option {{CORR}} is correct.",
    "Describes the Sentence Completion Test format."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "Which description characterizes the 'Sentence Completion Test' as a projective assessment tool?", opts, c, s, 95))

# Q96: Draw-A-Person Test (Karen Machover)
opts, c, s = rotate_options(
    "The subject is asked to draw a person on blank paper, then draw a person of the opposite sex, and answer questions about the drawn figures to reveal body image and self-concept",
    ["The subject is asked to copy an exact geometric blueprint of a bridge to test architectural talent", "The subject is asked to solve a multi-layered mechanical maze using colored pencils", "The subject is asked to identify grammatical spelling mistakes in a printed passage"],
    "B",
    "Developed by Karen Machover, the Draw-A-Person test is a projective drawing technique where the examinee draws a person, then a person of the opposite sex; psychological interpretation focuses on features like size, omission of body parts, facial emphasis, and line pressure.\nHence, Option {{CORR}} is correct.",
    "Describes the Draw-A-Person test procedure."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "In the Draw-A-Person test formulated by Karen Machover, what task does the subject perform?", opts, c, s, 96))

# Q97: Statement on Projective Tests Reliability and Validity
add_q(make_statement_question(
    CHAPTER, "Assessment of Personality",
    "Projective techniques help assess unconscious motives that are inaccessible through direct structured questionnaires.",
    "A recognized limitation of projective techniques is that scoring and interpretation require specialized clinical training and can be vulnerable to examiner subjectivity.",
    1, "A",
    "Both statements are correct. Projective techniques circumvent conscious defenses to reveal unconscious dynamics, but their psychometric limitations include complex scoring, lower inter-rater reliability, and subjective clinician bias.",
    "Evaluates advantages and limitations of projective tests accurately."
))

# Q98: Behavioural Analysis - Observation Method
opts, c, s = rotate_options(
    "Carefully observing and recording specific target behaviours in natural or controlled settings using systematic checklists",
    ["Guessing an individual's thoughts by reading tea leaves at breakfast", "Administering a multiple-choice chemistry examination", "Asking an individual to write an autobiography of their past lives"],
    "B",
    "Behavioural observation involves systematically watching, recording, and coding an individual's observable actions in natural environments (naturalistic observation) or laboratory setups (controlled observation).\nHence, Option {{CORR}} is correct.",
    "Defines behavioural observation."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "In behavioural analysis, the observational method relies upon:", opts, c, s, 98))

# Q99: Behavioural Ratings and Halo Effect
opts, c, s = rotate_options(
    "The rater's overall favourable or unfavourable general impression of an individual biases ratings across all specific personality traits",
    ["The tendency of a rater to assign everyone the middle score on a rating scale", "The examinee answering 'True' to every single question on a personality inventory", "The rater scoring physical height instead of psychological attributes"],
    "C",
    "The 'halo effect' is a common rating error where a rater's overall positive or negative global impression of a person influences their judgment, leading them to rate the individual uniformly high or low on all distinct traits.\nHence, Option {{CORR}} is correct.",
    "Defines the halo effect rating bias."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "What does the 'halo effect' refer to in behavioural rating scales?", opts, c, s, 99))

# Q100: Central Tendency Bias in Behavioural Ratings
opts, c, s = rotate_options(
    "The tendency of raters to avoid extreme scale scores and assign the vast majority of examinees middle or average ratings",
    ["The tendency of raters to give 100% of subjects the highest possible score", "The rater's unconscious desire to project their own hostility onto subjects", "The rater's inability to understand the English vocabulary of the rating form"],
    "D",
    "Central tendency bias occurs when raters avoid extreme ratings (very high or very low) and cluster their evaluations around the middle or average values on the rating scale.\nHence, Option {{CORR}} is correct.",
    "Defines the central tendency bias."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "In behavioural assessment, the 'central tendency bias' describes the phenomenon wherein raters:", opts, c, s, 100))

# Q101: Nomination Method (Sociometry)
opts, c, s = rotate_options(
    "Each group member is asked to name/nominate one or more peers with whom they would most like to collaborate, study, or play",
    ["A formal doctor appoints one patient to be the spokesperson for a hospital ward", "A teacher assigns randomized serial numbers to students to take attendance", "An examiner conducts an oral interview testing knowledge of world geography"],
    "A",
    "The nomination method (sociometry) involves asking members of a peer group to nominate people they would most like or dislike working with, sharing activities with, revealing interpersonal choices and social status.\nHence, Option {{CORR}} is correct.",
    "Defines the peer nomination method."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "What does the 'nomination method' in behavioural analysis involve?", opts, c, s, 101))

# Q102: Situational Stress Test
opts, c, s = rotate_options(
    "Placing an individual into an engineered stressful or frustrating real-life simulation (often with distracting confederates) to observe their behavioral response",
    ["Conducting a quiet multiple-choice test in a soundproof library", "Administering relaxing massage therapy to reduce tension", "Interviewing an individual's parents about their childhood sleeping habits"],
    "B",
    "A situational stress test evaluates an individual's coping capacity by placing them in an artificial, realistic high-stress task (such as a military or executive leadership task with confederates intentionally obstructing progress).\nHence, Option {{CORR}} is correct.",
    "Describes the situational stress test procedure."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "How is a 'situational stress test' conducted in behavioural assessment?", opts, c, s, 102))

# Q103: Eysenck Personality Questionnaire (EPQ)
opts, c, s = rotate_options(
    "Measures Extraversion-Introversion, Neuroticism-Stability, and Psychoticism-Sociability with a Lie Scale to detect faking",
    ["Measures 16 source traits using factor-analyzed multiple choice questions", "Measures intelligence quotient using non-verbal geometric matrix cards", "Measures aptitude for clerical typing and mechanical assembly"],
    "C",
    "The Eysenck Personality Questionnaire (EPQ) evaluates the three primary biological dimensions of personality (Extraversion, Neuroticism, Psychoticism) and includes a Lie Scale to identify dissimulation or faking good.\nHence, Option {{CORR}} is correct.",
    "Describes the scales of the EPQ."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "The Eysenck Personality Questionnaire (EPQ) is designed to evaluate which dimensions?", opts, c, s, 103))

# Q104: Assertion-Reason on Projective vs Self-Report
add_q(make_assertion_question(
    CHAPTER, "Assessment of Personality",
    "Projective tests are less susceptible to conscious faking and social desirability bias than self-report inventories.",
    "The stimulus material in projective tests is ambiguous and unstructured, so the respondent does not know which response is considered socially desirable.",
    1, "A",
    "Both (A) and (R) are true, and (R) is the correct explanation of (A). Because projective test stimuli are completely ambiguous, examinees cannot decipher what constitutes an 'ideal' answer, making it difficult to consciously fake responses compared to straightforward self-report questionnaires.",
    "Validates the comparative advantage of projective tests regarding response faking."
))

# Q105: Erich Fromm's Humanistic Psychoanalysis
opts, c, s = rotate_options(
    "Humans are fundamentally social beings shaped by psychological needs for relatedness, rootedness, and transcendence, struggling with freedom vs alienation",
    ["Human behavior is entirely determined by biological conditioning and food pellets", "Human personality is fixed permanently at birth by blood type and astrology", "Humans are purely individualistic creatures with zero need for human connection"],
    "A",
    "Erich Fromm blended psychoanalysis with social philosophy, asserting that humans are shaped by society and culture, striving to overcome alienation by seeking relatedness, rootedness, and productive love.\nHence, Option {{CORR}} is correct.",
    "Summarizes Erich Fromm's psychosocial view of human personality."
)
add_q(make_question(CHAPTER, "Post-Freudian Approaches", "What was Erich Fromm's primary focus in his social-psychological perspective on personality?", opts, c, s, 105))

# Q106: Harry Stack Sullivan Interpersonal Theory
opts, c, s = rotate_options(
    "Personality is the relatively enduring pattern of recurrent interpersonal situations that characterize human life",
    ["Personality is the structure of physical facial bones and scalp hair color", "Personality is the mathematical calculation of intelligence quotient", "Personality is the collection of conditioned Pavlovian salivary reflexes"],
    "B",
    "Harry Stack Sullivan formulated the Interpersonal Theory of Psychiatry, defining personality as 'the relatively enduring pattern of recurrent interpersonal situations that characterize a human life.'\nHence, Option {{CORR}} is correct.",
    "Quotes Sullivan's interpersonal definition of personality."
)
add_q(make_question(CHAPTER, "Post-Freudian Approaches", "Harry Stack Sullivan emphasized that human personality is primarily developed and expressed through:", opts, c, s, 106))

# Q107: Multi-statement question on Freud's Defense Mechanisms
add_q(make_multi_statement_question(
    CHAPTER, "Psychodynamic Approach",
    "Which of the following statements regarding Freud's ego defense mechanisms are correct?",
    [
        ("A", "Defense mechanisms operate unconsciously to protect the ego from anxiety"),
        ("B", "Sublimation involves transforming primitive drives into socially approved, creative achievements"),
        ("C", "Projection involves attributing one's own unacceptable impulses onto other people"),
        ("D", "Rationalization eliminates all emotional conflict by surgically excising brain tissue")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements (A), (B), and (C) are accurate textbook facts regarding ego defense mechanisms. Statement (D) is absurd and false; rationalization is an unconscious psychological excuse-making defense, not a medical surgical procedure.",
    "Identifies accurate characteristics of defense mechanisms."
))

# Q108: Libido definition in Psychoanalysis
opts, c, s = rotate_options(
    "The instinctual life-preserving and sexual psychic energy that fuels the human Id and drives developmental behavior",
    ["The physical electrical current flowing through medical electrocardiogram machines", "The conscious intellectual memory of mathematical multiplication tables", "The moral judgment of judicial courts determining legal punishment"],
    "A",
    "In Freud's theory, libido is the psychic energy associated with the life instinct (Eros), primarily sexual and survival-oriented, which energizes the Id and powers developmental progression through the psychosexual stages.\nHence, Option {{CORR}} is correct.",
    "Defines libido in Freudian psychoanalysis."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "In Freudian psychoanalytic theory, what does 'libido' refer to?", opts, c, s, 108))

# Q109: Eros vs Thanatos
opts, c, s = rotate_options(
    "Eros represents the life instinct (survival, pleasure, reproduction), while Thanatos represents the death instinct (aggression, destruction)",
    ["Eros represents sleep, while Thanatos represents waking consciousness", "Eros represents hunger, while Thanatos represents thirst", "Eros represents artistic poetry, while Thanatos represents prose"],
    "B",
    "Freud postulated two fundamental opposing instincts: Eros (the life instinct, seeking preservation, love, and reproduction) and Thanatos (the death instinct, expressed through hostility, aggression, and self-destruction).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Eros from Thanatos."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "How did Sigmund Freud contrast 'Eros' and 'Thanatos' in his instinct theory?", opts, c, s, 109))

# Q110: Castration Anxiety in Oedipus Complex
opts, c, s = rotate_options(
    "The young boy fears that his powerful rival father will punish his incestuous desires for his mother by castrating him",
    ["The child fears losing their favorite plastic toys during kindergarten", "The young girl fears failing her arithmetic school examination", "The infant fears drowning while bathing in warm water"],
    "C",
    "In the phallic stage of psychosexual development, a young boy experiencing the Oedipus complex develops 'castration anxiety'—the terrifying unconscious fear that his father will discover his lust for his mother and mutilate his genitals.\nHence, Option {{CORR}} is correct.",
    "Defines castration anxiety in the Oedipus complex."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "What is 'castration anxiety' within Freud's account of the phallic stage of development?", opts, c, s, 110))

# Q111: Identification with Same-Sex Parent
opts, c, s = rotate_options(
    "The boy adopts his father's values, mannerisms, and moral standards, resolving the Oedipus complex and establishing the Superego",
    ["The child runs away from home to live with grandparents in a remote village", "The child completely refuses to speak to either parent for several years", "The child undergoes hypnotic regression in a psychiatric clinic"],
    "D",
    "The resolution of the Oedipus complex occurs through 'identification': the boy overcomes castration fear by psychologically identifying with his father, internalizing paternal values, acquiring gender role identity, and solidifying the Superego.\nHence, Option {{CORR}} is correct.",
    "Explains the resolution of the Oedipus complex through identification."
)
add_q(make_question(CHAPTER, "Psychodynamic Approach", "How does a young boy successfully resolve the Oedipus complex according to Sigmund Freud?", opts, c, s, 111))

# Q112: Fully Functioning Person (Carl Rogers)
opts, c, s = rotate_options(
    "An individual who is open to experience, lives fully in the present moment, trusts their organismic feelings, feels free, and is creative",
    ["A person who has accumulated ten million dollars in private bank accounts", "An individual who experiences zero biological emotions and behaves like a machine", "A person who strictly obeys all social rules without ever questioning authority"],
    "A",
    "Carl Rogers described the 'fully functioning person' as an individual moving toward self-actualization, characterized by openness to experience, existential living, organismic trusting, experiential freedom, and creative living.\nHence, Option {{CORR}} is correct.",
    "Identifies qualities of a fully functioning person in Rogers' theory."
)
add_q(make_question(CHAPTER, "Humanistic Approach", "According to Carl Rogers, which characteristics typify a 'fully functioning person'?", opts, c, s, 112))

# Q113: Peak Experiences (Maslow)
opts, c, s = rotate_options(
    "Moments of intense ecstasy, deep wonder, awe, and interconnectedness where a person feels complete unity and transcendence",
    ["Acute clinical panic attacks accompanied by hyperventilation and dizziness", "Intense episodes of physical hunger after running a long marathon", "The experience of winning a high-stakes lottery ticket"],
    "B",
    "Abraham Maslow described 'peak experiences' as profound, transpersonal moments of intense joy, peace, awe, and unity with the cosmos frequently reported by self-actualizing individuals.\nHence, Option {{CORR}} is correct.",
    "Defines Maslow's peak experiences."
)
add_q(make_question(CHAPTER, "Humanistic Approach", "In Abraham Maslow's framework, what are 'peak experiences'?", opts, c, s, 113))

# Q114: Structured vs Unstructured Interview
opts, c, s = rotate_options(
    "Structured interviews follow predetermined specific questions and standardized procedures, whereas unstructured interviews are flexible and conversational",
    ["Structured interviews are conducted under water, while unstructured interviews are in airplanes", "Structured interviews only test singing voice, while unstructured test running speed", "Structured interviews have zero validity, while unstructured have 100% reliability"],
    "C",
    "Structured interviews employ carefully sequenced, predetermined questions and standardized scoring, enhancing reliability, whereas unstructured interviews use open-ended, flexible dialogue guided by the respondent's answers.\nHence, Option {{CORR}} is correct.",
    "Contrasts structured and unstructured interviews."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "In psychological assessment, how are structured interviews differentiated from unstructured interviews?", opts, c, s, 114))

# Q115: Cattell's 16 PF Source Traits
opts, c, s = rotate_options(
    "Warmth, Reasoning, Emotional Stability, Dominance, Liveliness, Rule-Consciousness, Social Boldness, Sensitivity, Vigilance, Abstractedness, Privateness, Apprehension, Openness to Change, Self-Reliance, Perfectionism, and Tension",
    ["Orality, Anality, Phallicity, Latency, Genitality, Conscious, Preconscious, and Unconscious", "Endomorphy, Mesomorphy, Ectomorphy, Somatotonia, Viscerotonia, and Cerebrotonia", "Sattva, Rajas, Tamas, Vata, Pitta, Kapha, Dharma, Artha, Kama, and Moksha"],
    "D",
    "Raymond Cattell identified 16 primary source traits (such as Warmth, Emotional Stability, Dominance, Rule-Consciousness, Perfectionism) through rigorous factor-analytic studies, measured by the 16 PF questionnaire.\nHence, Option {{CORR}} is correct.",
    "Recalls Cattell's 16 primary source traits."
)
add_q(make_question(CHAPTER, "Trait Approaches to Personality", "Raymond Cattell's 16 PF questionnaire is structured around evaluating which category of traits?", opts, c, s, 115))

# Q116: Cross-Cultural Differences in Self-Construal
opts, c, s = rotate_options(
    "Independent self-construal is characteristic of Western individualistic cultures, while interdependent self-construal is characteristic of Asian collectivist cultures",
    ["Independent self-construal is only found in infants, while interdependent is in animals", "Independent self-construal has zero personality traits, while interdependent has hundreds", "Both cultures have completely identical self-construals with zero cultural variation"],
    "A",
    "Cross-cultural psychology (e.g. Markus & Kitayama) shows that Western cultures foster an independent construal of self (focusing on autonomy and personal uniqueness), while Asian and collectivist cultures foster an interdependent construal (focusing on interpersonal connectedness).\nHence, Option {{CORR}} is correct.",
    "Distinguishes independent from interdependent self-construal."
)
add_q(make_question(CHAPTER, "Culture and Self", "How do Western and traditional Asian societies differ with regard to self-construal?", opts, c, s, 116))

# Q117: Behaviorist Approach to Personality (Skinner)
opts, c, s = rotate_options(
    "Personality is viewed as a collection of learned response tendencies conditioned through reinforcement and punishment history",
    ["Personality is the manifestation of ancestral archetypes inherited across centuries", "Personality is a biological somatotype determined by muscular thickness", "Personality is the fulfillment of spiritual karma from previous incarnations"],
    "B",
    "B.F. Skinner and behavioral theorists view personality not as internal traits or unobservable psychic structures, but as a consistent repertoire of learned response tendencies acquired through operant conditioning and environmental reinforcement.\nHence, Option {{CORR}} is correct.",
    "Summarizes the behaviorist conception of personality."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "According to the radical behaviorist perspective (B.F. Skinner), personality is fundamentally:", opts, c, s, 117))

# Q118: Bandura's Reciprocal Determinism
opts, c, s = rotate_options(
    "Personality is shaped by the reciprocal, continuous bidirectional interaction between cognitive factors, environmental influences, and overt behaviour",
    ["Personality is determined 100% by unconscious sexual drives with zero cognitive influence", "Environment is the sole master that dictates behavior with human thoughts playing zero role", "Genes are the only causal factor in personality with environment having zero impact"],
    "C",
    "Albert Bandura's concept of reciprocal determinism states that personality development results from the continuous triadic interaction between cognitive/personal factors, environmental influences, and overt behavior.\nHence, Option {{CORR}} is correct.",
    "Explains Bandura's reciprocal determinism."
)
add_q(make_question(CHAPTER, "Major Approaches to Personality", "Albert Bandura's model of 'reciprocal determinism' asserts that human personality results from:", opts, c, s, 118))

# Q119: Statement on Projective Card Administration
add_q(make_statement_question(
    CHAPTER, "Assessment of Personality",
    "The Rorschach Inkblot Test employs ten symmetrical inkblots presented in a standardized fixed order.",
    "The Thematic Apperception Test requires examinees to provide one-word True or False answers to printed cards.",
    3, "C",
    "Statement I is correct: Rorschach cards are numbered I to X and always presented in the same fixed order. Statement II is incorrect: The TAT requires examinees to construct detailed, narrative stories, not one-word True/False responses.",
    "Contrasts administration requirements of Rorschach and TAT."
))

# Q120: Synthesis of Personality Assessment in Applied Settings
opts, c, s = rotate_options(
    "Combining multiple assessment tools (self-reports, projective tests, behavioural observations, and clinical interviews) provides the most valid and comprehensive personality appraisal",
    ["Relying exclusively on a single five-minute self-report quiz is the only acceptable clinical practice", "Never assessing personality because human behavior is completely random and unpredictable", "Using only physiological blood pressure monitors to judge an individual's moral character"],
    "A",
    "Clinical and industrial psychologists agree that comprehensive personality assessment demands a battery of diverse assessment modalities (self-reports, projective measures, clinical interviews, and behavioural observations) to triangulate findings and minimize method bias.\nHence, Option {{CORR}} is correct.",
    "Affirms the gold-standard multi-method approach in personality assessment."
)
add_q(make_question(CHAPTER, "Assessment of Personality", "What represents the most professionally sound methodology for evaluating human personality in clinical and organizational settings?", opts, c, s, 120))

# Validate and dump
assert len(unit2_qs) == 120, f"Expected 120 questions for Unit 2, got {len(unit2_qs)}"
os.makedirs("mock/psy_units", exist_ok=True)
out_path = "mock/psy_units/unit2.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(unit2_qs, f, indent=2, ensure_ascii=False)

print(f"Successfully generated and saved all 120 questions for Unit 2 to {out_path}!")

