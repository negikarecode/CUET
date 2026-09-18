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
unit8_seen = set()
unit8_qs = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in unit8_seen:
        raise ValueError(f"Duplicate in Unit 8: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in Unit 8: {q['questionText'][:80]}")
    unit8_seen.add(norm)
    assert len(q["options"]) == 4, f"Options length error: {q['questionText'][:40]}"
    assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option: {q['questionText'][:40]}"
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"], f"Missing solution: {q['questionText'][:40]}"
    unit8_qs.append(q)

CHAPTER = "Psychology and Life"

# --- HUMAN-ENVIRONMENT RELATIONSHIPS (Q1 - Q15) ---

# Q1: Three Perspectives on Human-Environment Relationship
opts, c, s = rotate_options(
    "Instrumentalist perspective, Spiritual perspective, and Transactional perspective",
    ["Behaviorist, Psychoanalytic, and Humanistic perspectives", "Biological, Cognitive, and Sociocultural perspectives", "Forming, Storming, and Norming perspectives"],
    "A",
    "NCERT identifies three fundamental perspectives on the human-environment relationship: (1) Instrumentalist (nature exists solely for human utility/exploitation), (2) Spiritual (reverence and sacred interdependence), and (3) Transactional (mutual interdependence and reciprocal influence).\nHence, Option {{CORR}} is correct.",
    "Lists the three perspectives on the human-environment relationship."
)
add_q(make_question(CHAPTER, "Human-Environment Relationship", "According to NCERT, what are the three major philosophical perspectives describing the human-environment relationship?", opts, c, s, 1))

# Q2: Instrumentalist Perspective
opts, c, s = rotate_options(
    "Views the physical environment and natural resources solely as commodities meant for human consumption, exploitation, and economic comfort",
    ["Views the physical environment as a sacred living deity requiring worship", "Views humans and nature as equal ecological partners with reciprocal duties", "Views the environment as an illusion created by human sensory organs"],
    "B",
    "The Instrumentalist perspective considers the physical environment purely as an instrument or resource to be used, exploited, and dominated for human survival, material comfort, and commercial profit.\nHence, Option {{CORR}} is correct.",
    "Defines the instrumentalist perspective."
)
add_q(make_question(CHAPTER, "Human-Environment Relationship", "What is the core assumption of the 'Instrumentalist Perspective' on the environment?", opts, c, s, 2))

# Q3: Spiritual Perspective
opts, c, s = rotate_options(
    "Views nature as sacred and reverential, emphasizing harmony, respect, and non-exploitative coexistence between humans and the natural cosmos",
    ["Views nature as a dangerous enemy that must be conquered with machinery", "Views natural resources as private financial investments on the stock market", "Considers trees and rivers to be biological errors in evolution"],
    "C",
    "The Spiritual perspective (deeply rooted in traditional Indian philosophy) regards the physical environment with profound reverence, recognizing that humans are part of nature and must preserve its sanctity rather than exploit it.\nHence, Option {{CORR}} is correct.",
    "Defines the spiritual perspective."
)
add_q(make_question(CHAPTER, "Human-Environment Relationship", "How is the 'Spiritual Perspective' on human-environment relationship characterized?", opts, c, s, 3))

# Q4: Transactional Perspective
opts, c, s = rotate_options(
    "Posits that humans and the environment are interdependent, constantly influencing, modifying, and being shaped by each other over time",
    ["Posits that humans should buy and sell land through real estate transactions", "Asserts that the environment has zero impact on human psychology", "Claims that humans and nature never interact or share physical space"],
    "D",
    "The Transactional perspective views humans and the physical environment as parts of an interconnected, dynamic system where both interact continuously, mutually shaping and transforming each other.\nHence, Option {{CORR}} is correct.",
    "Defines the transactional perspective."
)
add_q(make_question(CHAPTER, "Human-Environment Relationship", "What is the primary premise of the 'Transactional Perspective' in environmental psychology?", opts, c, s, 4))

# Q5: Match Human-Environment Perspectives
add_q(make_match_question(
    CHAPTER, "Human-Environment Relationship",
    "Match List I (Perspective) with List II (Core Orientation):",
    [("A", "Instrumentalist Perspective"), ("B", "Spiritual Perspective"), ("C", "Transactional Perspective"), ("D", "Pro-environmental Behaviour")],
    [("I", "Dynamic reciprocal interdependence and mutual modification between humans and environment"), ("II", "Viewing nature with reverence, sacredness, and non-exploitative coexistence"), ("III", "Voluntary actions aimed at conserving resources and minimizing ecological degradation"), ("IV", "Viewing the physical environment solely as a material resource for human exploitation")],
    "A-IV, B-II, C-I, D-III", "A",
    "Instrumentalist: nature as resource for exploitation (A-IV); Spiritual: nature as sacred with reverential coexistence (B-II); Transactional: dynamic reciprocal interdependence (C-I); Pro-environmental: actions conserving resources (D-III).",
    "Matches human-environment perspectives to core orientations."
))

# Q6: Environmental Stressor: Noise Characteristics
opts, c, s = rotate_options(
    "Intensity (loudness), Predictability (whether it occurs predictably), and Controllability (whether one can terminate or reduce it)",
    ["Color, weight, and geographical latitude", "Vocabulary, grammar, and pronunciation", "Taste, smell, and visual brightness"],
    "B",
    "The psychological impact of noise as a stressor depends heavily on three key parameters: (1) Intensity (decibel level), (2) Predictability (unpredictable bursts are more distressing), and (3) Controllability (feeling able to stop or escape the noise buffers stress).\nHence, Option {{CORR}} is correct.",
    "Lists characteristics determining the stressful impact of noise."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "Which three physical and psychological dimensions determine how severely 'Noise' impairs human cognitive functioning and well-being?", opts, c, s, 6))

# Q7: Glass and Singer's Classic Noise Experiment
opts, c, s = rotate_options(
    "Unpredictable and uncontrollable noise produced significantly higher cognitive errors and lower frustration tolerance during post-noise tasks",
    ["Predictable noise caused immediate permanent physical deafness in all subjects", "Controllable noise was ten times more stressful than uncontrollable noise", "Noise had zero effect on cognitive tasks regardless of volume or predictability"],
    "C",
    "David Glass and Jerome Singer demonstrated that unpredictable, uncontrollable noise caused severe after-effects: lower task persistence, higher error rates on proofreading, and reduced frustration tolerance, even after the noise had ceased.\nHence, Option {{CORR}} is correct.",
    "Summarizes Glass and Singer's noise research findings."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "In David Glass and Jerome Singer's classic experiments on noise, what did they discover regarding the psychological after-effects of uncontrollable noise?", opts, c, s, 7))

# Q8: Noise Impact on Simple vs Complex Tasks
opts, c, s = rotate_options(
    "Noise has little to no impairing effect on simple or well-learned tasks, but significantly degrades performance on complex, novel, or attentional tasks",
    ["Noise improves complex performance by 500% while destroying simple reflexes", "Noise destroys simple motor reflexes while leaving complex calculus unaffected", "Noise has exactly identical impairment across every possible task domain"],
    "D",
    "Research shows that simple, repetitive, or well-practiced tasks are relatively resistant to noise disruption; in contrast, complex tasks requiring sustained attention, working memory, and vigilance suffer substantial degradation.\nHence, Option {{CORR}} is correct.",
    "Contrasts noise effects on simple vs complex tasks."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "How does environmental noise differential affect performance on 'Simple' versus 'Complex' cognitive tasks?", opts, c, s, 8))

# Q9: Crowding vs Density Distinction (Stokols)
opts, c, s = rotate_options(
    "Density is an objective physical measure (people per square meter); Crowding is a subjective psychological feeling of cramped restriction and lack of privacy",
    ["Density is an emotion; Crowding is a physical mathematical equation", "Density applies to animals; Crowding applies exclusively to plants", "Both terms are completely identical physical measurements with zero difference"],
    "A",
    "Daniel Stokols differentiated: Density (an objective, physical condition measuring the number of individuals within a given geographical space) vs Crowding (a subjective, negative psychological experience characterized by feelings of restriction, spatial infringement, and lack of privacy).\nHence, Option {{CORR}} is correct.",
    "Distinguishes physical density from psychological crowding."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "How did Daniel Stokols conceptually distinguish between 'Density' and 'Crowding'?", opts, c, s, 9))

# Q10: Psychological Effects of Crowding
opts, c, s = rotate_options(
    "Increased physiological arousal, irritability, elevated aggression, social withdrawal, and reduced frustration tolerance",
    ["Complete relaxation, enhanced deep sleep, and miraculous memory recall", "Permanent loss of spoken language and total biological blindness", "Euphoric joy, boundless altruistic generosity, and photographic memory"],
    "B",
    "Chronic crowding leads to negative psychological outcomes: elevated sympathetic nervous system arousal, heightened feelings of stress, increased interpersonal hostility/aggression, social withdrawal, and reduced performance on complex tasks.\nHence, Option {{CORR}} is correct.",
    "Lists psychological effects of crowding."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "What are the primary psychological and behavioral consequences of chronic exposure to 'Crowding'?", opts, c, s, 10))

# Q11: Calhoun's Behavioral Sink in Overcrowded Animals
opts, c, s = rotate_options(
    "John B. Calhoun discovered that extreme overcrowding in laboratory rats led to severe social pathology, hyper-aggression, infant neglect, and reproductive collapse",
    ["Calhoun observed that rats became democratic philosophers in crowded cages", "Calhoun proved that rats reproduce ten times faster when space is eliminated", "Calhoun found that overcrowded rats developed flawless mathematical problem-solving"],
    "C",
    "John B. Calhoun placed colonies of rats in severely crowded environments and observed a 'behavioral sink': complete breakdown of normal social structure, aberrant sexual behavior, hyper-aggression, cannibalism, maternal neglect, and population collapse.\nHence, Option {{CORR}} is correct.",
    "Summarizes Calhoun's behavioral sink experiment."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "In animal behavioral research, what did John B. Calhoun describe as the 'Behavioral Sink' resulting from extreme spatial overcrowding?", opts, c, s, 11))

# Q12: Environmental Pollution and Psychological Deficits
opts, c, s = rotate_options(
    "Exposure to heavy metals like lead impairs cognitive development, IQ, and impulse control in growing children",
    ["Air pollution increases human intelligence by supplying carbon minerals to brain cells", "Water pollution permanently cures clinical schizophrenia and bipolar disorder", "Pollution has zero measurable effect on human psychology or cognitive organs"],
    "D",
    "Environmental pollutants have profound psychological effects: chronic lead toxicity directly impairs neurological development, lowering childhood IQ, attention span, and impulse regulation; carbon monoxide exposure impairs psychomotor and cognitive coordination.\nHence, Option {{CORR}} is correct.",
    "Explains psychological deficits caused by environmental pollution."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "What does neuropsychological research reveal regarding the impact of heavy metal pollution (such as lead) on developing children?", opts, c, s, 12))

# Q13: Natural Disasters and Psychological Trauma
opts, c, s = rotate_options(
    "Post-Traumatic Stress Disorder (PTSD), severe grief, survivor guilt, disorientation, and depressive episodes",
    ["Spontaneous acquisition of foreign spoken languages", "Instant biological immunity to physical viral diseases", "Complete permanent elimination of all fear reflexes"],
    "A",
    "Natural disasters (earthquakes, tsunamis, floods) trigger severe psychological trauma: Acute Stress Disorder, Post-Traumatic Stress Disorder (PTSD), numbness, flashbacks, profound grief, survivor guilt, and feelings of existential helplessness.\nHence, Option {{CORR}} is correct.",
    "Identifies psychological reactions to natural disasters."
)
add_q(make_question(CHAPTER, "Natural Disasters", "Which cluster of psychological symptoms commonly arises in the aftermath of catastrophic natural disasters like earthquakes or tsunamis?", opts, c, s, 13))

# Q14: Sequence of Disaster Response Phases
add_q(make_sequence_question(
    CHAPTER, "Natural Disasters",
    "Arrange the sequential phases of human disaster response and crisis intervention in their correct chronological order:",
    [
        ("A", "Warning Phase (anticipation and preparatory evacuation alerts)"),
        ("B", "Impact Phase (experiencing the immediate physical destruction)"),
        ("C", "Rescue Phase (immediate search, medical triage, and emergency shelter)"),
        ("D", "Rehabilitation / Recovery Phase (long-term psychological counseling, rebuilding homes, and restoring community livelihood)")
    ],
    "A, B, C, D",
    "A",
    "Disaster intervention follows four sequential phases: (1) Warning Phase (alerts and readiness), (2) Impact Phase (survival during catastrophe), (3) Rescue Phase (first aid, basic supplies, saving lives), and (4) Recovery/Rehabilitation Phase (restoring infrastructure and long-term trauma counseling).",
    "Sequences the phases of disaster response."
))

# Q15: Psychological First Aid in Disaster Management
opts, c, s = rotate_options(
    "Providing immediate emotional comfort, ensuring basic safety and physical needs, active listening, and connecting survivors with social support networks",
    ["Conducting deep psychoanalytic dream interpretation during the active flood", "Giving electroconvulsive shock therapy to all crying survivors in tents", "Forcing trauma victims to take difficult written mathematical intelligence tests"],
    "B",
    "Psychological First Aid (PFA) is a humane, supportive response to a fellow human being who is suffering: it entails assessing immediate safety/needs, offering practical care and comfort without forcing conversation, listening compassionately, and linking victims to loved ones and resources.\nHence, Option {{CORR}} is correct.",
    "Defines Psychological First Aid in disaster management."
)
add_q(make_question(CHAPTER, "Natural Disasters", "What constitutes 'Psychological First Aid' (PFA) delivered to survivors immediately following a traumatic natural disaster?", opts, c, s, 15))

# --- POVERTY, DEPRIVATION & DISADVANTAGE (Q16 - Q30) ---

# Q16: Poverty vs Deprivation Distinction
opts, c, s = rotate_options(
    "Poverty is an economic state of lacking basic material necessities; Deprivation is a perceived psychological state of lacking resources relative to others",
    ["Poverty is a genetic disease; Deprivation is a geographic mountain climate", "Poverty only exists in cities; Deprivation only exists in farming villages", "Both terms are identical economic indicators measuring gross domestic product"],
    "C",
    "Poverty refers to an actual economic deficit where income falls below the minimum threshold required for basic survival necessities (food, shelter, clothing). Deprivation is a subjective psychological experience of perceived lack or disadvantage relative to a reference group or personal aspirations.\nHence, Option {{CORR}} is correct.",
    "Distinguishes poverty from deprivation."
)
add_q(make_question(CHAPTER, "Poverty and Deprivation", "In psychological theory, how are 'Poverty' and 'Deprivation' conceptually differentiated?", opts, c, s, 16))

# Q17: Psychological Effects of Chronic Poverty
opts, c, s = rotate_options(
    "Low self-efficacy, learned helplessness, present-time orientation, chronic stress, and perceived external locus of control",
    ["Boundless optimism, high financial risk-taking, and exceptional self-esteem", "Spontaneous acceleration of cognitive processing speed", "Total absence of biological anxiety and perpetual calmness"],
    "D",
    "Chronic poverty produces pervasive psychological consequences: diminished self-worth, feelings of powerlessness and learned helplessness, an external locus of control (believing life is dictated by fate), and a present-time survival orientation rather than long-term future planning.\nHence, Option {{CORR}} is correct.",
    "Lists psychological consequences of chronic poverty."
)
add_q(make_question(CHAPTER, "Poverty and Deprivation", "Which psychological profile is frequently associated with individuals living under conditions of chronic poverty and socio-economic deprivation?", opts, c, s, 17))

# Q18: Present-Time Orientation in Deprivation
opts, c, s = rotate_options(
    "Focusing cognitive resources almost exclusively on immediate daily survival needs rather than investing in deferred long-term future planning",
    ["The ability to read wall clocks with microsecond accuracy", "A philosophical belief that time does not physically exist in quantum mechanics", "A medical condition where patients can only remember events that happened at noon"],
    "A",
    "People enduring acute economic deprivation develop a 'present-time orientation': because immediate survival (procuring food and shelter today) consumes all cognitive bandwidth, they prioritize immediate coping over deferred long-term goals (such as higher education or savings).\nHence, Option {{CORR}} is correct.",
    "Defines present-time orientation in economic deprivation."
)
add_q(make_question(CHAPTER, "Poverty and Deprivation", "What does 'Present-Time Orientation' mean in the context of psychological adaptations to severe deprivation?", opts, c, s, 18))

# Q19: Culture of Poverty (Oscar Lewis)
opts, c, s = rotate_options(
    "A self-perpetuating value system characterized by marginality, helplessness, fatalism, and weak ego structure passed down across generations",
    ["A celebration of artistic cultural folklore among wealthy landowners", "An ancient agricultural festival celebrated with traditional music and dance", "A government welfare programme providing free textbooks to university scholars"],
    "B",
    "Anthropologist Oscar Lewis coined the 'Culture of Poverty' to describe how prolonged economic marginalization fosters internalized traits (fatalism, feelings of inferiority, inability to defer gratification) that are socialized into children, perpetuating poverty across generations.\nHence, Option {{CORR}} is correct.",
    "Defines Oscar Lewis's Culture of Poverty."
)
add_q(make_question(CHAPTER, "Poverty and Deprivation", "What did anthropologist Oscar Lewis propose in his controversial 'Culture of Poverty' thesis?", opts, c, s, 19))

# Q20: Relative Deprivation vs Absolute Deprivation
opts, c, s = rotate_options(
    "Absolute deprivation is lacking the biological minimum for survival; Relative deprivation is feeling deprived when comparing oneself to a more privileged group",
    ["Absolute deprivation is mental; Relative deprivation is purely financial", "Absolute deprivation applies to adults; Relative deprivation applies to infants", "Both concepts describe identical statistical poverty line measurements"],
    "C",
    "Absolute deprivation refers to falling below the physical survival line (caloric insufficiency, homelessness); Relative deprivation occurs when people compare their standard of living with a reference group and perceive an unfair gap, sparking social resentment and rebellion.\nHence, Option {{CORR}} is correct.",
    "Distinguishes absolute deprivation from relative deprivation."
)
add_q(make_question(CHAPTER, "Poverty and Deprivation", "How do social psychologists contrast 'Absolute Deprivation' with 'Relative Deprivation'?", opts, c, s, 20))

# Q21: Social Disadvantage and Discrimination
opts, c, s = rotate_options(
    "Denial of equal access to social, educational, and economic opportunities based on caste, class, gender, or community membership",
    ["A physical handicap caused by an automobile traffic accident", "An individual scoring below average on a standardized arithmetic test", "The preference of teenagers for modern pop music over classical songs"],
    "D",
    "Social disadvantage stems from systematic, institutional discrimination and historical marginalization (e.g. caste or gender bias) that deprives specific social groups of fair opportunities, resources, quality schooling, and dignity.\nHence, Option {{CORR}} is correct.",
    "Defines social disadvantage and systemic discrimination."
)
add_q(make_question(CHAPTER, "Poverty and Deprivation", "In Indian sociological and psychological research, what constitutes 'Social Disadvantage'?", opts, c, s, 21))

# Q22: Interventions to Break the Poverty Cycle
opts, c, s = rotate_options(
    "Early childhood cognitive enrichment, education, skill-building, micro-credit empowerment, and dismantling caste/class discriminatory barriers",
    ["Giving speeches commanding poor families to stop feeling poor", "Increasing taxes on basic food grains and essential clean drinking water", "Isolating disadvantaged children in institutions away from all society"],
    "A",
    "Psychological and socioeconomic interventions to interrupt the cycle of poverty require: early intellectual stimulation programs (Head Start / ICDS), vocational and life skills training, community empowerment, and affirmative social justice policies.\nHence, Option {{CORR}} is correct.",
    "Identifies interventions to break the cycle of poverty."
)
add_q(make_question(CHAPTER, "Poverty and Deprivation", "Which multi-pronged psychological and structural strategy is most effective in breaking the intergenerational cycle of poverty?", opts, c, s, 22))

# Q23: Learned Helplessness in Deprivation (Martin Seligman)
opts, c, s = rotate_options(
    "Repeated exposure to inescapable socioeconomic hardships leads individuals to believe that their actions have zero efficacy, causing passive resignation",
    ["Learning how to swim in swimming pools without lifeguard assistance", "A medical condition where patients forget how to tie their shoes", "The ability to master computer programming without formal instruction"],
    "B",
    "Martin Seligman's concept of 'Learned Helplessness' applies directly to chronic poverty: when repeated efforts to improve one's life are systematically crushed by institutional barriers, individuals generalize the belief that outcomes are uncontrollable, resulting in passivity and depression.\nHence, Option {{CORR}} is correct.",
    "Connects learned helplessness to chronic poverty."
)
add_q(make_question(CHAPTER, "Poverty and Deprivation", "How does Martin Seligman's theory of 'Learned Helplessness' illuminate the psychological defeat experienced by chronically impoverished populations?", opts, c, s, 23))

# Q24: Malnutrition and Childhood Cognitive Development
opts, c, s = rotate_options(
    "Early severe protein-energy malnutrition causes irreversible reductions in brain growth, dendritic arborization, working memory, and IQ",
    ["Malnutrition enhances abstract philosophical reasoning in adolescents", "Malnutrition increases physical height by accelerating bone elongation", "Malnutrition has zero impact on intellectual or neurological development"],
    "C",
    "Neuropsychological evidence demonstrates that severe infant and childhood malnutrition stunts brain development (reducing neuronal connectivity and myelination), leading to enduring deficits in executive function, attention, and scholastic achievement.\nHence, Option {{CORR}} is correct.",
    "Details cognitive consequences of early childhood malnutrition."
)
add_q(make_question(CHAPTER, "Poverty and Deprivation", "What impact does chronic early childhood malnutrition exert on neurocognitive development?", opts, c, s, 24))

# Q25: Statement: Poverty and Locus of Control
add_q(make_statement_question(
    CHAPTER, "Poverty and Deprivation",
    "Individuals who experience prolonged socio-economic poverty frequently develop a strong external locus of control.",
    "A strong external locus of control empowers individuals to proactively overcome structural disadvantages through assertive personal initiative.",
    3, "C",
    "Statement I is correct because persistent uncontrollable hardships lead people to attribute outcomes to external fate, luck, or powerful others. Statement II is incorrect because an external locus of control typically breeds passivity, fatalism, and learned helplessness, not proactive assertive initiative.",
    "Evaluates locus of control in poverty."
))

# --- AGGRESSION AND VIOLENCE (Q26 - Q45) ---

# Q26: Hostile Aggression vs Instrumental Aggression
opts, c, s = rotate_options(
    "Hostile aggression is driven by anger with the primary goal of inflicting pain; Instrumental aggression uses harm as a secondary means to achieve another goal (e.g. robbery)",
    ["Hostile aggression is accidental; Instrumental aggression is intentional", "Hostile aggression is legal; Instrumental aggression is illegal", "Hostile aggression is verbal only; Instrumental aggression is physical only"],
    "D",
    "Social psychologists distinguish: Hostile Aggression (hot, emotionally driven, where causing suffering to the victim is the end in itself) vs Instrumental Aggression (cool, calculated behavior where causing harm is merely a means to secure a separate objective, like stealing cash or winning a match).\nHence, Option {{CORR}} is correct.",
    "Distinguishes hostile from instrumental aggression."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "What is the key distinction between 'Hostile Aggression' and 'Instrumental Aggression'?", opts, c, s, 26))

# Q27: Frustration-Aggression Hypothesis (Dollard & Miller)
opts, c, s = rotate_options(
    "Frustration always leads to some form of aggression, and aggression is always a consequence of prior frustration",
    ["Frustration always leads to deep joyful meditation and peaceful forgiveness", "Frustration is caused entirely by consuming spicy dietary foods", "Aggression occurs exclusively when people are awarded monetary prizes"],
    "A",
    "John Dollard, Neal Miller et al. (1939) proposed the classic Frustration-Aggression Hypothesis: blocking a goal-directed behavior produces frustration, which inevitably instigates an aggressive drive to injure the obstacle.\nHence, Option {{CORR}} is correct.",
    "States the classic Dollard and Miller Frustration-Aggression hypothesis."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "What was the fundamental premise of John Dollard and Neal Miller's original 'Frustration-Aggression Hypothesis'?", opts, c, s, 27))

# Q28: Leonard Berkowitz's Modification of Frustration-Aggression
opts, c, s = rotate_options(
    "Frustration creates negative affect and emotional readiness to aggress, but actual aggression occurs only in the presence of aggressive situational cues (e.g. presence of weapons)",
    ["Frustration eliminates all aggressive tendencies permanently from the human mind", "Aggressive cues like guns always calm people down and promote peaceful dialogue", "Frustration and aggression have zero psychological connection in modern neuroscience"],
    "B",
    "Leonard Berkowitz revised the hypothesis: frustration generates general negative affect and a readiness to act aggressively, but overt violent action requires triggering situational cues associated with aggression (the 'weapons effect').\nHence, Option {{CORR}} is correct.",
    "Explains Berkowitz's weapons effect and modification of frustration-aggression."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "How did Leonard Berkowitz modify the Frustration-Aggression Hypothesis to include situational aggressive cues (the 'weapons effect')?", opts, c, s, 28))

# Q29: Albert Bandura's Social Learning Theory of Aggression
opts, c, s = rotate_options(
    "Aggression is learned through observational modeling of aggressive role models and reinforced by observed or experienced rewards",
    ["Aggression is an inevitable hydraulic steam pressure in the biological bloodstream", "Aggression is transmitted through airborne bacterial infections", "Children are born with fully completed scripts of all violent martial arts"],
    "C",
    "Albert Bandura's classic Bobo Doll experiments demonstrated that children who observed an adult physically assaulting an inflated clown doll actively reproduced the novel violent actions and verbal insults, proving aggression is acquired through observational learning.\nHence, Option {{CORR}} is correct.",
    "Explains Bandura's social learning theory of aggression."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "What did Albert Bandura's landmark 'Bobo Doll' experiments establish regarding the acquisition of aggressive behavior in children?", opts, c, s, 29))

# Q30: The Myth of Catharsis in Aggression
opts, c, s = rotate_options(
    "Engaging in aggressive actions or watching violence does not reduce anger; research shows it actually increases subsequent aggressive behavior",
    ["Punching pillows permanently purges anger and cures all emotional distress", "Screaming at family members makes individuals extraordinarily calm and loving", "Catharsis is a biological reflex that completely eliminates testosterone"],
    "D",
    "While Aristotle and Freud suggested that 'venting' anger (catharsis) purges emotional tension, contemporary empirical research conclusively disproves this: expressing aggression (hitting punching bags, venting rage) primes aggressive cognitions and actually escalates subsequent hostility.\nHence, Option {{CORR}} is correct.",
    "Refutes the catharsis hypothesis in aggression."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "What does contemporary empirical psychology conclude regarding the popular belief in 'Catharsis' (venting anger to relieve aggression)?", opts, c, s, 30))

# Q31: Environmental Determinants of Aggression: The Heat Effect
opts, c, s = rotate_options(
    "Uncomfortably high ambient temperatures increase physiological arousal, irritability, and violent crime rates",
    ["Extreme heat makes all humans fall into deep twelve-hour sleep states", "High temperatures completely eliminate all forms of domestic conflict", "Ambient temperature has zero statistical correlation with aggressive behavior"],
    "A",
    "Extensive archival and experimental research shows a strong positive correlation between uncomfortably high ambient temperatures and aggressive outbursts (violent crimes, road rage, riots), as heat intensifies hostile affect and irritability.\nHence, Option {{CORR}} is correct.",
    "Details the heat effect in aggression."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "How does extreme environmental heat influence human aggressive behavior according to social psychological research?", opts, c, s, 31))

# Q32: Impact of Media Violence and Video Games
opts, c, s = rotate_options(
    "Desensitizes viewers to real-world suffering, provides observational models for violent actions, and fosters hostile attributional schemas",
    ["Cures childhood ADHD and dramatically accelerates foreign language fluency", "Causes children to become completely terrified of all physical movement", "Media violence has zero measurable psychological influence on human adolescents"],
    "B",
    "Longitudinal and experimental studies demonstrate that prolonged exposure to violent television and video games: (1) desensitizes viewers to pain and violence, (2) models novel aggressive tactics, (3) primes hostile attributions, and (4) decreases empathy and helping.\nHence, Option {{CORR}} is correct.",
    "Identifies effects of media violence on children."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "What are the primary psychological mechanisms through which exposure to violent media increases aggression in developing youths?", opts, c, s, 32))

# Q33: Displacement of Aggression
opts, c, s = rotate_options(
    "Redirecting aggressive impulses away from the true, threatening source of frustration onto a safer, less powerful, innocent substitute target",
    ["Throwing a sports ball across a physical athletic field", "Relocating one's family to a different geographic residential apartment", "Replacing an old computer with a newly purchased laptop"],
    "C",
    "Displacement is an aggressive defense mechanism: when the real instigator of frustration is too dangerous, authoritative, or unavailable to attack (e.g. a harsh boss), the angry individual redirects hostility onto a vulnerable scapegoat (e.g. spouse, child, pet).\nHence, Option {{CORR}} is correct.",
    "Defines displacement of aggression."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "In psychodynamic and social learning frameworks, what constitutes 'Displacement' of aggression?", opts, c, s, 33))

# Q34: Strategies for Reducing Aggression
opts, c, s = rotate_options(
    "Promoting parental warmth, providing non-aggressive cooperative models, cultivating empathy, anger-management training, and cognitive restructuring",
    ["Subjecting angry children to severe physical corporal beatings in public", "Encouraging angry adolescents to practice competitive knife fighting", "Isolating frustrated students in dark solitary confinement rooms"],
    "D",
    "Evidence-based methods to reduce aggression include: (1) authoritative parenting with warmth and non-punitive discipline, (2) modeling cooperative conflict resolution, (3) developing empathy for victims, (4) self-regulation / anger-management training, and (5) teaching alternative problem-solving skills.\nHence, Option {{CORR}} is correct.",
    "Lists evidence-based strategies for reducing aggression."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "Which combination of psychological interventions has proven most effective in mitigating chronic aggressive behavior in children and adolescents?", opts, c, s, 34))

# Q35: Assertion-Reason: Media Violence and Desensitization
add_q(make_assertion_question(
    CHAPTER, "Aggression and Violence",
    "Repeated exposure to graphic violence in movies and video games leads to psychological desensitization.",
    "Chronic exposure reduces physiological arousal (e.g. galvanic skin response and heart rate) when witnessing real-life human distress and violence.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Desensitization is an emotional numbing process: repeated viewing of graphic violence habituates autonomic nervous system responses, resulting in diminished emotional sensitivity and reduced empathy toward victims of actual violence.",
    "Explains desensitization mechanism from violent media."
))

# --- PRO-ENVIRONMENTAL BEHAVIOUR & HEALTH (Q36 - Q60) ---

# Q36: Pro-Environmental Behaviour: Definition
opts, c, s = rotate_options(
    "Actions undertaken consciously by individuals or groups aimed at preserving natural resources, minimizing ecological harm, and promoting sustainability",
    ["Purchasing luxury consumer goods that consume enormous electrical wattage", "Cutting down virgin rainforests to build industrial concrete parking lots", "Pouring industrial chemical waste into public freshwater drinking reservoirs"],
    "B",
    "Pro-environmental behaviour refers to deliberate actions taken to protect the natural environment and promote sustainable living, including recycling, conserving water/energy, reducing waste, using public transit, and planting trees.\nHence, Option {{CORR}} is correct.",
    "Defines pro-environmental behaviour."
)
add_q(make_question(CHAPTER, "Promoting Pro-environmental Behaviour", "In environmental psychology, how is 'Pro-Environmental Behaviour' formally defined?", opts, c, s, 36))

# Q37: Promoting Pro-Environmental Actions: Key Strategies
opts, c, s = rotate_options(
    "Environmental education, community participation, behavioral nudges, financial incentives/penalties, and providing accessible recycling infrastructure",
    ["Mandating that citizens stop using all electricity and return to pre-historic living", "Arresting anyone who walks outdoors during daylight hours", "Banning all scientific research on climate change and biology"],
    "C",
    "Techniques to foster pro-environmental actions include: (1) environmental literacy and awareness campaigns, (2) convenient recycling and disposal infrastructure, (3) prompt feedback on energy consumption, (4) economic incentives (rebates) and disincentives (plastic taxes), and (5) social modeling.\nHence, Option {{CORR}} is correct.",
    "Lists strategies to promote pro-environmental actions."
)
add_q(make_question(CHAPTER, "Promoting Pro-environmental Behaviour", "Which multifaceted approach is most effective in persuading citizens to adopt sustainable pro-environmental habits?", opts, c, s, 37))

# Q38: Chipko Movement: Environmental Action in India
opts, c, s = rotate_options(
    "A grassroots non-violent ecological movement in the Uttarakhand Himalayas where villagers hugged forest trees to prevent commercial logging",
    ["An industrial mining corporation that built coal plants across Indian rivers", "A political election campaign held to elect forest ministers in New Delhi", "A military regiment formed to guard national international border checkpoints"],
    "D",
    "The historic Chipko Movement (started in Reni village, Uttarakhand in the 1970s led by Gaura Devi, Sunderlal Bahuguna, and Chandi Prasad Bhatt) exemplifies collective pro-environmental action: villagers literally hugged forest trees, preventing commercial loggers from felling them.\nHence, Option {{CORR}} is correct.",
    "Summarizes the Chipko Movement."
)
add_q(make_question(CHAPTER, "Promoting Pro-environmental Behaviour", "What was the significance of the 'Chipko Movement' in India's environmental history?", opts, c, s, 38))

# Q39: Bishnois of Rajasthan: Spiritual Environmental Conservation
opts, c, s = rotate_options(
    "A desert community whose religious tenets mandate absolute reverence, protection of Khejri trees, and sacred preservation of wildlife (such as blackbucks)",
    ["A nomadic tribe that specialized in hunting wild deer for fur trade", "A royal dynasty that clear-cut Rajasthan forests to build stone palaces", "A group of merchants who established commercial paper mills in Thar desert"],
    "A",
    "The Bishnois of Rajasthan adhere to 29 ecological rules formulated by Guru Jambheshwar, holding nature sacred: in 1730, Amrita Devi and 362 Bishnois sacrificed their lives protecting green Khejri trees from royal axes, demonstrating deep spiritual ecological stewardship.\nHence, Option {{CORR}} is correct.",
    "Details Bishnoi environmental conservation traditions."
)
add_q(make_question(CHAPTER, "Promoting Pro-environmental Behaviour", "How does the traditional philosophy of the 'Bishnoi Community' of Rajasthan illustrate the spiritual perspective on the environment?", opts, c, s, 39))

# Q40: Personal Space: Definition (Edward T. Hall)
opts, c, s = rotate_options(
    "The invisible, portable, psychological boundary surrounding an individual's body into which intrusion by others causes discomfort or anxiety",
    ["The physical square footage of a person's private real estate bedroom", "The geographical distance between a citizen's home and workplace office", "A legal permit allowing individuals to build private fences around farmland"],
    "B",
    "Anthropologist Edward T. Hall defined 'Personal Space' as an invisible, flexible bubble of space around the body that an individual claims as psychologically personal; unauthorized spatial intrusion induces autonomic stress, discomfort, and protective withdrawal.\nHence, Option {{CORR}} is correct.",
    "Defines personal space."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "In environmental psychology, what is meant by 'Personal Space'?", opts, c, s, 40))

# Q41: Hall's Four Interpersonal Distance Zones
opts, c, s = rotate_options(
    "Intimate distance, Personal distance, Social distance, and Public distance",
    ["Infancy distance, Childhood distance, Adulthood distance, and Elderly distance", "Microscopic distance, Centimeter distance, Kilometer distance, and Astronomical distance", "Oral distance, Anal distance, Phallic distance, and Genital distance"],
    "C",
    "Edward T. Hall categorized four spatial zones: (1) Intimate distance (0 to 18 inches, close physical touch/lovers), (2) Personal distance (1.5 to 4 feet, friendly conversations), (3) Social distance (4 to 12 feet, business interactions), and (4) Public distance (12 feet and beyond, public speaking).\nHence, Option {{CORR}} is correct.",
    "Lists Hall's four interpersonal distance zones."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "What are the four distinct interpersonal distance zones delineated by Edward T. Hall?", opts, c, s, 41))

# Q42: Match Hall's Spatial Zones
add_q(make_match_question(
    CHAPTER, "Environmental Stressors",
    "Match List I (Spatial Zone) with List II (Appropriate Social Context):",
    [("A", "Intimate Distance (0 - 18 inches)"), ("B", "Personal Distance (1.5 - 4 feet)"), ("C", "Social Distance (4 - 12 feet)"), ("D", "Public Distance (12 feet and beyond)")],
    [("I", "Formal business meetings, transactions with bank tellers, or professional discussions"), ("II", "Addressing a large audience from a podium during a public lecture"), ("III", "Whispering private secrets, comforting a distressed family member, or romantic embrace"), ("IV", "Casual conversations among close personal friends and acquaintances")],
    "A-III, B-IV, C-I, D-II", "A",
    "Intimate: comforting, whispering, embracing (A-III); Personal: casual conversation with friends (B-IV); Social: formal business transactions (C-I); Public: addressing large audience from podium (D-II).",
    "Matches Hall's spatial zones to appropriate social contexts."
))

# Q43: Territoriality in Environmental Psychology
opts, c, s = rotate_options(
    "A pattern of behavior and attitudes held by an individual or group based on perceived ownership and active defense of a physical geographic area",
    ["The biological process of animal hibernation during freezing winter seasons", "A government treaty delineating maritime ocean shipping boundaries", "The tendency of migrating birds to fly south toward warmer climates"],
    "B",
    "Territoriality refers to the human behavior of laying claim to, personalizing, and defending a specific physical space (primary territory like one's home, secondary territory like a regular desk in a library, or public territory like a park bench).\nHence, Option {{CORR}} is correct.",
    "Defines territoriality in environmental psychology."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "What is 'Territoriality' in human spatial behavior?", opts, c, s, 43))

# Q44: Types of Territories: Primary, Secondary, and Public
opts, c, s = rotate_options(
    "Primary: owned exclusively (home/bedroom); Secondary: regular semi-exclusive use (regular desk); Public: temporary open access (park bench/bus seat)",
    ["Primary: schools; Secondary: colleges; Public: universities", "Primary: food; Secondary: clothing; Public: shelter", "Primary: morning; Secondary: afternoon; Public: midnight"],
    "C",
    "Altman classified territories into: Primary territories (vital to owner's daily life, exclusive control, e.g. home, private bedroom), Secondary territories (semi-public, less central, e.g. favorite classroom seat), and Public territories (open to anyone temporarily, e.g. beach spot).\nHence, Option {{CORR}} is correct.",
    "Distinguishes primary, secondary, and public territories."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "How are 'Primary', 'Secondary', and 'Public' territories categorized in Irwin Altman's spatial taxonomy?", opts, c, s, 44))

# Q45: Impact of Television Viewing on Children: NCERT Findings
opts, c, s = rotate_options(
    "Promotes consumerism through persuasive advertising, fosters a sedentary lifestyle linked to obesity, and exposes children to aggressive models",
    ["Improves cardiovascular physical fitness and turns all children into Olympic sprinters", "Completely eliminates the desire to ever purchase toys or commercial confectionery", "Replaces the need for formal classroom school teachers entirely"],
    "D",
    "NCERT emphasizes that excessive television viewing among children: (1) exposes them to commercial consumerism and junk-food marketing, (2) encourages a sedentary lifestyle contributing to childhood obesity, (3) exposes them to unpunished aggressive models, and (4) reduces creative play and study time.\nHence, Option {{CORR}} is correct.",
    "Details negative impacts of excessive TV viewing on children."
)
add_q(make_question(CHAPTER, "Psychology and Life Concerns", "According to psychological research documented in NCERT, what are the primary adverse consequences of excessive television viewing on developing children?", opts, c, s, 45))

# Q46: Impact of Television on Social Cognition: Cultivation Theory (Gerbner)
opts, c, s = rotate_options(
    "Heavy viewers cultivate the perception that the real world is significantly more dangerous, violent, and untrustworthy than it actually is ('mean world syndrome')",
    ["Heavy viewers believe that everyone in the real world is a saintly peaceful monk", "Heavy viewers develop flawless mathematical photographic memory recall", "Television viewing has zero effect on beliefs about crime or danger in society"],
    "A",
    "George Gerbner's Cultivation Theory established that individuals who consume large amounts of television systematically overestimate crime rates, fear victimization, and view the world as a hostile, frightening place ('Mean World Syndrome').\nHence, Option {{CORR}} is correct.",
    "Explains Gerbner's Cultivation Theory and Mean World Syndrome."
)
add_q(make_question(CHAPTER, "Psychology and Life Concerns", "What does George Gerbner's 'Cultivation Theory' demonstrate regarding the effect of heavy television consumption on social perception?", opts, c, s, 46))

# Q47: Health-Compromising Behaviours: Smoking and Substance Abuse
opts, c, s = rotate_options(
    "Addictive habits driven by peer pressure, stress-relief rationalizations, and pharmacological dependence that cause major chronic organ damage",
    ["Nutritious dietary practices that strengthen cardiovascular heart functioning", "Mandatory legal medications prescribed by all pediatric hospitals", "Reflexive biological twitches that occur during early infancy"],
    "B",
    "Health-compromising behaviors such as smoking, alcohol consumption, and drug abuse typically begin during adolescence due to peer modeling, curiosity, and maladaptive coping with stress, resulting in severe physical disease and chemical addiction.\nHence, Option {{CORR}} is correct.",
    "Defines health-compromising behaviours."
)
add_q(make_question(CHAPTER, "Health and Well-being", "How are 'Health-Compromising Behaviours' characterized in behavioral health psychology?", opts, c, s, 47))

# Q48: Lifestyle Diseases and Stress
opts, c, s = rotate_options(
    "Hypertension, coronary heart disease, type-2 diabetes, and gastrointestinal ulcers exacerbated by chronic distress and sedentary habits",
    ["Bacterial tuberculosis and physical bone fractures caused by falling from trees", "Genetic color blindness and sickle cell anemia inherited from grandparents", "Viral influenza and acute bacterial pneumonia caught during rainstorms"],
    "C",
    "Lifestyle diseases (such as hypertension, cardiovascular disease, obesity, and diabetes) are directly linked to prolonged physiological stress (allostatic overload), sedentary desk-bound routines, poor nutrition, and lack of exercise.\nHence, Option {{CORR}} is correct.",
    "Lists lifestyle diseases exacerbated by chronic stress."
)
add_q(make_question(CHAPTER, "Health and Well-being", "Which medical conditions are primarily classified as 'Lifestyle Diseases' deeply influenced by psychological stress and behavioral habits?", opts, c, s, 48))

# Q49: Promoting Health: Life Skills Training
opts, c, s = rotate_options(
    "Assertiveness, stress management, balanced nutrition, regular physical exercise, and maintaining supportive social networks",
    ["Working 100 hours per week without taking any rest or weekend breaks", "Consuming energy drinks and sleeping only two hours per night", "Avoiding all human communication and living in total solitary confinement"],
    "D",
    "Life skills training promotes positive health by equipping individuals with: assertiveness (resisting peer pressure), positive coping skills, regular aerobic exercise, healthy diet, and strong social support systems.\nHence, Option {{CORR}} is correct.",
    "Outlines life skills promoting positive health."
)
add_q(make_question(CHAPTER, "Health and Well-being", "Which collection of behavioral competencies constitutes effective 'Life Skills' for fostering positive physical and psychological health?", opts, c, s, 49))

# Q50: Statement: Crowding in Indian Cultural Context
add_q(make_statement_question(
    CHAPTER, "Environmental Stressors",
    "Tolerance for physical density is often higher in traditional Indian collective culture compared to Western individualistic societies.",
    "High physical density in India completely eliminates all negative psychological consequences of crowding across all settings.",
    3, "C",
    "Statement I is correct because collective cultural socialization in India fosters greater acceptance of close interpersonal physical proximity in festivals, joint families, and markets. Statement II is incorrect because excessive density still produces adverse psychological stress, sensory overload, and task impairment when spatial resources are severely compromised.",
    "Evaluates cultural differences in tolerance for density."
))

# Q51: Environmental Degradation: Tragedy of the Commons
opts, c, s = rotate_options(
    "Short-term individual self-interest leads people to overexploit and destroy shared communal resources, leaving everyone worse off",
    ["Governments providing free botanical garden parks to all citizens", "Industrial companies giving 50% discounts on recycled glass jars", "Scientists discovering new renewable solar energy technologies"],
    "A",
    "The Tragedy of the Commons exemplifies environmental degradation: when individuals act independently and unconstrained in their own self-interest, they deplete shared open-access resources (forests, clean air, groundwater), precipitating collective ecological collapse.\nHence, Option {{CORR}} is correct.",
    "Applies the tragedy of the commons to environmental degradation."
)
add_q(make_question(CHAPTER, "Promoting Pro-environmental Behaviour", "How does the 'Tragedy of the Commons' explain ongoing environmental degradation such as deforestation and groundwater depletion?", opts, c, s, 51))

# Q52: Feedback Mechanisms in Energy Conservation
opts, c, s = rotate_options(
    "Providing households with immediate, visible, and comparative data on their daily energy consumption reliably motivates significant reductions in usage",
    ["Hiding electricity bills from citizens so they do not worry about financial costs", "Sending utility bills ten years after the electricity was consumed", "Banning the use of electrical smart meters in urban residential apartments"],
    "B",
    "Environmental psychology research shows that providing clear, immediate, and comparative feedback (e.g. smart meters showing real-time power consumption and comparisons with energy-efficient neighbors) significantly cuts electricity and water waste.\nHence, Option {{CORR}} is correct.",
    "Explains feedback mechanisms in energy conservation."
)
add_q(make_question(CHAPTER, "Promoting Pro-environmental Behaviour", "What does experimental research demonstrate regarding the role of 'Prompt Feedback' in promoting household energy conservation?", opts, c, s, 52))

# Q53: Assertion-Reason: Predictability of Noise and Stress
add_q(make_assertion_question(
    CHAPTER, "Environmental Stressors",
    "Unpredictable intermittent noise bursts cause significantly greater cognitive disruption than continuous or predictable noise of the same decibel volume.",
    "Predictable noise allows individuals to psychologically habituate and mobilize attentional resources in advance, whereas unpredictable noise repeatedly triggers an orienting/alarm response.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). As demonstrated by Glass and Singer, unpredictable stressors prevent cognitive adaptation and keep the central nervous system in a state of chronic defensive vigilance, leading to cognitive fatigue and lower task persistence.",
    "Explains why unpredictable noise is more stressful than predictable noise."
))

# Q54: Vehicular Exhaust and Carbon Monoxide: Neuropsychological Effects
opts, c, s = rotate_options(
    "Reduces oxygen-carrying capacity of the blood, impairing psychomotor reaction time, visual vigilance, and decision-making speed",
    ["Dramatically accelerates sensory hearing acuity across all sound frequencies", "Stimulates the cerebral cortex to cure chronic depressive disorders", "Has zero biochemical or psychological consequence on human beings"],
    "C",
    "Inhaling carbon monoxide from vehicular exhaust binds with hemoglobin to form carboxyhemoglobin, depriving the brain of essential oxygen and causing headache, slowed reaction times, impaired visual vigilance, and cognitive fog.\nHence, Option {{CORR}} is correct.",
    "Details neuropsychological effects of carbon monoxide exposure."
)
add_q(make_question(CHAPTER, "Environmental Stressors", "What specific cognitive impairments are triggered by inhalation of carbon monoxide from vehicular emissions?", opts, c, s, 54))

# Q55: Survivor Guilt in Disaster Survivors
opts, c, s = rotate_options(
    "A deep, distressing psychological conflict where survivors feel intense guilt for having survived a disaster while family members or neighbors perished",
    ["A legal fine imposed by judges on people who evacuate disaster zones without authorization", "A medical condition causing survivors to suffer from physical limb paralysis", "The feeling of anger survivors direct toward emergency rescue workers"],
    "D",
    "Survivor guilt is a profound symptom of disaster trauma and PTSD: individuals experience agonizing feelings of unworthiness, questioning why they lived while others died, often feeling they should have done more to save perished loved ones.\nHence, Option {{CORR}} is correct.",
    "Defines survivor guilt."
)
add_q(make_question(CHAPTER, "Natural Disasters", "What is 'Survivor Guilt' frequently experienced by individuals following devastating catastrophes?", opts, c, s, 55))

# Q56: Multi-statement: Characteristics of Pro-Environmental Habits
add_q(make_multi_statement_question(
    CHAPTER, "Promoting Pro-environmental Behaviour",
    "Which of the following actions represent evidence-based pro-environmental behaviours?",
    [
        ("A", "Using public mass transportation and carpooling instead of individual private motor vehicles"),
        ("B", "Segregating household solid waste into biodegradable and non-biodegradable recyclable bins"),
        ("C", "Planting native trees and maintaining local community greenery"),
        ("D", "Harvesting rainwater and conserving municipal domestic water supplies")
    ],
    "(A), (B), (C) and (D)",
    ["(A) and (C) only", "(B) and (D) only", "(A), (B) and (D) only"],
    "A",
    "All four activities are recognized in NCERT and environmental psychology as actionable, high-impact pro-environmental behaviors that contribute to ecological sustainability and resource conservation.",
    "Identifies multiple validated pro-environmental behaviors."
))

# Q57: Frustration vs Deprivation as Roots of Aggression
opts, c, s = rotate_options(
    "Frustration is the acute blocking of an active goal; Deprivation is the prolonged, chronic state of lacking essential necessities",
    ["Frustration is financial; Deprivation is emotional only", "Frustration applies only to children; Deprivation applies only to elderly retirees", "Both terms mean identical things with zero distinction"],
    "B",
    "Frustration is an acute situational event where an ongoing goal-directed action is thwarted (e.g. missing a train because of a shut gate); Deprivation is a chronic, enduring condition of structural deficit and resource scarcity.\nHence, Option {{CORR}} is correct.",
    "Distinguishes acute frustration from chronic deprivation."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "How do psychologists differentiate between 'Frustration' and 'Deprivation' when analyzing roots of aggression?", opts, c, s, 57))

# Q58: Instrumental Aggression in Real-World Settings
opts, c, s = rotate_options(
    "An armed bank robber threatens a security guard with a weapon strictly to coerce the guard to surrender the bank vault keys",
    ["An individual punches a brick wall in private rage after receiving bad news", "A person weeps quietly in a bedroom after a tragic romantic breakup", "A customer politely says thank you to a retail grocery cashier"],
    "C",
    "Instrumental aggression is premeditated, goal-oriented harm used as a tool to obtain an external objective: an armed bank robber threatens violence not out of personal hatred for the guard, but as an instrument to access financial wealth.\nHence, Option {{CORR}} is correct.",
    "Applies the concept of instrumental aggression to a real-world scenario."
)
add_q(make_question(CHAPTER, "Aggression and Violence", "Which of the following scenarios best exemplifies 'Instrumental Aggression'?", opts, c, s, 58))

# Q59: Assertion-Reason: Empathy Training and Aggression Reduction
add_q(make_assertion_question(
    CHAPTER, "Aggression and Violence",
    "Cultivating empathy in children and adolescents significantly decreases aggressive behavior toward peers.",
    "Empathy enables individuals to take the emotional perspective of others, making it psychologically distressing to inflict suffering on another sentient human being.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Empathy is fundamentally incompatible with unprovoked aggression; when individuals vividly perceive and feel the distress of their potential victim, the cognitive and emotional barriers against causing harm are dramatically strengthened.",
    "Connects empathy cultivation to the prevention of aggressive behavior."
))

# Q60: Holistic Approach to Quality of Life
opts, c, s = rotate_options(
    "Balancing physical health, psychological well-being, harmonious social relationships, and sustainable ecological living",
    ["Maximizing personal financial wealth by exploiting environmental forests", "Spending eighteen hours per day playing online violent video games", "Living in solitary isolation without ever interacting with other human beings"],
    "A",
    "NCERT concludes that achieving true 'Quality of Life' demands an integrated, holistic perspective: physical fitness, emotional resilience, meaningful social bonds, social equity, and reverential stewardship of our shared ecological environment.\nHence, Option {{CORR}} is correct.",
    "Synthesizes the holistic perspective on quality of life."
)
add_q(make_question(CHAPTER, "Psychology and Life", "What constitutes a 'Holistic Approach' to enhancing the psychological and ecological Quality of Life according to NCERT?", opts, c, s, 60))

print(f"Total Unit 8 questions generated: {len(unit8_qs)}")
assert len(unit8_qs) == 60, f"Expected 60 questions, got {len(unit8_qs)}"

os.makedirs("mock/psy_units", exist_ok=True)
with open("mock/psy_units/unit8.json", "w", encoding="utf-8") as f:
    json.dump(unit8_qs, f, indent=2, ensure_ascii=False)
print("Saved mock/psy_units/unit8.json successfully!")
