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
unit4_seen = set()
unit4_qs = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in unit4_seen:
        raise ValueError(f"Duplicate in Unit 4: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in Unit 4: {q['questionText'][:80]}")
    unit4_seen.add(norm)
    assert len(q["options"]) == 4, f"Options length error: {q['questionText'][:40]}"
    assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option: {q['questionText'][:40]}"
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"], f"Missing solution: {q['questionText'][:40]}"
    unit4_qs.append(q)

CHAPTER = "Psychological Disorders"

# --- SECTION 1: CONCEPTS, HISTORICAL VIEWS, ANXIETY & SOMATOFORM (Q1 - Q60) ---

# Q1: The 4 Ds of Abnormality
opts, c, s = rotate_options(
    "Deviance (violating norms), Distress (unpleasant to individual), Dysfunction (interfering with daily life), and Danger (hazard to self or others)",
    ["Delusion, Depression, Dementia, and Dissociation", "Diathesis, Dominance, Deficiency, and Dependence", "Desire, Denial, Displacement, and Defense"],
    "A",
    "Psychological abnormality is commonly conceptualized through the '4 Ds': Deviance (atypical/bizarre behaviour), Distress (subjectively unpleasant and upsetting), Dysfunction (impairing constructive daily functioning), and Danger (posing physical harm to self or others).\nHence, Option {{CORR}} is correct.",
    "Lists the four Ds of abnormality."
)
add_q(make_question(CHAPTER, "Concepts of Abnormality", "Which four criteria, commonly referred to as the '4 Ds', are utilized by mental health professionals to identify psychological abnormality?", opts, c, s, 1))

# Q2: Ancient and Supernatural Approach to Abnormality
opts, c, s = rotate_options(
    "Attributed abnormal behaviour to demonic possession, evil spirits, and celestial curses, treating them with exorcism or trephining",
    ["Diagnosed chemical imbalances in cerebral neurotransmitters using blood tests", "Prescribed progressive muscle relaxation and cognitive behaviour therapy", "Administered standardized intelligence tests to measure cognitive decline"],
    "B",
    "The ancient supernatural model viewed mental disorders as the result of malevolent spirits, demons, or divine retribution, attempting cures through counter-magic, religious exorcisms, or trephining (drilling holes in the skull).\nHence, Option {{CORR}} is correct.",
    "Describes the supernatural historical approach to abnormality."
)
add_q(make_question(CHAPTER, "Historical Background of Abnormality", "How did the ancient supernatural perspective conceptualize the etiology and treatment of abnormal behaviour?", opts, c, s, 2))

# Q3: Biological Approach (Hippocrates)
opts, c, s = rotate_options(
    "Viewed mental illness as natural physical diseases arising from internal bodily pathology, particularly an imbalance of four humours",
    ["Viewed mental illness as legal criminal disobedience against political monarchs", "Viewed mental illness as caused by reading foreign philosophical literature", "Asserted that mental illness only affects people who refuse to eat meat"],
    "C",
    "Greek physician Hippocrates spearheaded the biological approach, arguing that psychological disorders arise from natural somatic disease and internal organ imbalances, specifically the balance of bodily fluids (blood, black bile, yellow bile, phlegm).\nHence, Option {{CORR}} is correct.",
    "Explains Hippocrates' biological humoral approach to mental illness."
)
add_q(make_question(CHAPTER, "Historical Background of Abnormality", "Hippocrates contributed a major paradigm shift in ancient psychopathology by asserting that abnormal behaviour was caused by:", opts, c, s, 3))

# Q4: Asylum Reforms (Philippe Pinel)
opts, c, s = rotate_options(
    "Championed 'moral treatment', unchaining mental patients in Paris asylums and treating them with kindness, dignity, and clean conditions",
    ["Introduced surgical lobotomies to silence violent institutional patients", "Locked mentally ill individuals in dark dungeons without food", "Expelled all psychiatric patients into remote desert wilderness areas"],
    "D",
    "During the French Revolution, physician Philippe Pinel initiated the humanitarian 'moral treatment' movement at the Bicêtre asylum in Paris, ordering the unchaining of patients and providing humane, compassionate clinical care.\nHence, Option {{CORR}} is correct.",
    "Identifies Philippe Pinel's moral treatment reform."
)
add_q(make_question(CHAPTER, "Historical Background of Abnormality", "Philippe Pinel is celebrated in the history of clinical psychiatry for which humanitarian reform?", opts, c, s, 4))

# Q5: Diathesis-Stress Model
opts, c, s = rotate_options(
    "A psychological disorder develops when an underlying biological or psychological vulnerability (diathesis) is triggered by environmental stress",
    ["Disorders are caused 100% by pure genetics with environmental stress playing zero role", "Disorders are caused 100% by bad weather with human biology playing zero role", "Disorders only occur in individuals who lack formal school education"],
    "A",
    "The Diathesis-Stress model posits that a psychological disorder develops when an individual possessing a predisposition or vulnerability (diathesis—genetic, neurobiological, or cognitive) encounters significant environmental stressors that activate the vulnerability.\nHence, Option {{CORR}} is correct.",
    "Defines the diathesis-stress model."
)
add_q(make_question(CHAPTER, "Concepts of Abnormality", "What is the core proposition of the 'Diathesis-Stress Model' of psychopathology?", opts, c, s, 5))

# Q6: Major Diagnostic Classification Systems: DSM-5 and ICD-11
opts, c, s = rotate_options(
    "DSM-5 is published by the American Psychiatric Association (APA); ICD-11 is published by the World Health Organization (WHO)",
    ["DSM-5 is published by the United Nations; ICD-11 is published by Harvard University", "DSM-5 is published by the British Red Cross; ICD-11 is published by UNESCO", "Both manuals are published by corporate pharmaceutical marketing companies"],
    "B",
    "The two globally recognized official classification systems for mental disorders are the DSM-5 (Diagnostic and Statistical Manual of Mental Disorders, 5th Edition, by the APA) and ICD-11 (International Classification of Diseases, 11th Revision, by the WHO).\nHence, Option {{CORR}} is correct.",
    "Attributes DSM-5 to APA and ICD-11 to WHO."
)
add_q(make_question(CHAPTER, "Classification of Disorders", "Which authoritative international bodies publish the DSM-5 and ICD-11 diagnostic classification manuals respectively?", opts, c, s, 6))

# Q7: Generalized Anxiety Disorder (GAD)
opts, c, s = rotate_options(
    "Prolonged, diffuse, persistent, free-floating anxiety and worry not focused on any specific object or threat, lasting for months",
    ["Sudden acute terror attacks lasting two minutes triggered by seeing heights", "Compulsive urge to wash hands twenty times after touching a door handle", "Feeling detached from one's own arms and legs during social gatherings"],
    "C",
    "Generalized Anxiety Disorder (GAD) is characterized by chronic, excessive, and uncontrollable worry about everyday matters across multiple domains ('free-floating anxiety'), accompanied by motor tension, hypervigilance, and autonomic hyperactivity.\nHence, Option {{CORR}} is correct.",
    "Defines Generalized Anxiety Disorder (GAD)."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "A clinical diagnosis of Generalized Anxiety Disorder (GAD) is indicated when an individual displays:", opts, c, s, 7))

# Q8: Panic Disorder and Panic Attack
opts, c, s = rotate_options(
    "Recurrent, unexpected panic attacks of sudden intense terror, heart palpitations, breathlessness, dizziness, and dread of dying or losing control",
    ["Chronic low-grade feelings of sadness lasting for five consecutive years", "Uncontrollable manic spending sprees combined with euphoric laughter", "Hearing phantom voices commanding the individual to write poetry"],
    "D",
    "Panic Disorder involves recurrent, unexpected panic attacks—intense surges of overwhelming terror and autonomic hyperarousal (tachycardia, sweating, chest pain, choking sensations, fear of dying or going crazy) peaking within minutes.\nHence, Option {{CORR}} is correct.",
    "Identifies clinical features of Panic Disorder and panic attacks."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "What symptoms characterize a 'panic attack' occurring in Panic Disorder?", opts, c, s, 8))

# Q9: Specific Phobia definition
opts, c, s = rotate_options(
    "Irrational, intense, persistent, and debilitating fear of a specific object, animal, or situation (e.g. snakes, heights, flying, injections)",
    ["A generalized vague worry about world economic inflation", "An obsession with checking whether stoves are turned off", "A complete lack of fear when handling venomous scorpions"],
    "A",
    "A Specific Phobia is marked by an intense, persistent, and irrational fear triggered by the presence or anticipation of a specific object or situation (e.g. dogs, enclosed spaces, blood), leading to active avoidance.\nHence, Option {{CORR}} is correct.",
    "Defines specific phobia."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "In psychopathology, a 'Specific Phobia' is formally characterized as:", opts, c, s, 9))

# Q10: Social Anxiety Disorder (Social Phobia)
opts, c, s = rotate_options(
    "Intense, persistent fear of social or performance situations where the individual might be scrutinized, judged, or humiliated by others",
    ["Fear of entering elevator shafts due to mechanical elevator failure", "Fear of touching contaminated surfaces due to bacterial infection", "Fear of open public plazas where escape might be difficult"],
    "B",
    "Social Anxiety Disorder (Social Phobia) is characterized by overwhelming fear and avoidance of social or performance situations (e.g. public speaking, eating in public, conversing with strangers) due to deep fear of negative evaluation or embarrassment.\nHence, Option {{CORR}} is correct.",
    "Defines Social Anxiety Disorder."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "An individual who experiences overwhelming anxiety and actively avoids public speaking, eating in restaurants, or meeting strangers due to fear of humiliation suffers from:", opts, c, s, 10))

# Q11: Agoraphobia definition
opts, c, s = rotate_options(
    "Fear of entering unfamiliar or crowded public situations, open spaces, or transit where escape might be difficult or help unavailable during panic",
    ["Fear of domestic feline housecats inside private homes", "Fear of looking at one's own reflection in bedroom mirrors", "Fear of writing words with pencil on white paper"],
    "C",
    "Agoraphobia is the intense fear and avoidance of entering open spaces, public markets, crowds, or public transportation, driven by the dread that escape might be impossible or help unavailable should panic-like symptoms occur.\nHence, Option {{CORR}} is correct.",
    "Defines agoraphobia."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "Agoraphobia involves an intense, disabling fear and avoidance of:", opts, c, s, 11))

# Q12: Separation Anxiety Disorder
opts, c, s = rotate_options(
    "Excessive, developmentally inappropriate anxiety concerning separation from attachment figures, fearing harm will befall them",
    ["Fear of being infected with influenza from touching doorknobs", "Chronic inability to recall one's home address after a motor crash", "Extreme distress when forced to solve multi-step geometry theorems"],
    "D",
    "Separation Anxiety Disorder is marked by developmentally excessive and unrealistic fear concerning separation from primary attachment figures (parents/caregivers), fearing harm, kidnapping, or illness will permanently separate them.\nHence, Option {{CORR}} is correct.",
    "Defines separation anxiety disorder."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "A seven-year-old child who panics uncontrollably, throws tantrums when separated from parents, and refuses to attend school for fear parents will die demonstrates:", opts, c, s, 12))

# Q13: Obsessions vs Compulsions in OCD
opts, c, s = rotate_options(
    "Obsessions are persistent, intrusive, distressing thoughts or images; compulsions are repetitive ritualistic behaviours performed to neutralize the anxiety",
    ["Obsessions are repetitive physical actions; compulsions are unconscious dreams", "Obsessions are auditory hallucinations; compulsions are persecutory delusions", "Both terms are identical medical synonyms referring to hand-washing only"],
    "A",
    "In Obsessive-Compulsive Disorder (OCD): Obsessions are persistent, recurrent, intrusive, and involuntary thoughts, urges, or impulses that provoke anxiety; Compulsions are repetitive, purposeful behaviors or mental rituals performed to alleviate the distress.\nHence, Option {{CORR}} is correct.",
    "Distinguishes obsessions from compulsions."
)
add_q(make_question(CHAPTER, "Obsessive-Compulsive Disorder", "In Obsessive-Compulsive Disorder (OCD), how are 'obsessions' fundamentally differentiated from 'compulsions'?", opts, c, s, 13))

# Q14: Clinical Example of OCD
opts, c, s = rotate_options(
    "Persistent intrusive dread of germ contamination (obsession) followed by repeated washing of hands fifty times an hour until skin bleeds (compulsion)",
    ["Enjoying washing dishes after dinner to keep the kitchen clean", "Checking a calendar once a week to confirm the date of an exam", "Singing songs in the shower to practice vocal harmony"],
    "B",
    "A hallmark presentation of OCD involves an intrusive obsession (contamination fears) compelling the individual to engage in time-consuming, distressing, ritualistic behaviors (excessive repetitive washing) that impair daily functioning.\nHence, Option {{CORR}} is correct.",
    "Identifies a prototypical clinical manifestation of OCD."
)
add_q(make_question(CHAPTER, "Obsessive-Compulsive Disorder", "Which clinical presentation best illustrates an Obsessive-Compulsive Disorder (OCD)?", opts, c, s, 14))

# Q15: Post-Traumatic Stress Disorder (PTSD) Symptoms
opts, c, s = rotate_options(
    "Recurrent intrusive flashbacks, nightmares of the traumatic event, emotional numbing, avoidance of trauma cues, and persistent hyperarousal",
    ["Episodes of manic laughing, boundless energy, and grandiosity", "Preoccupation with acquiring a physical illness despite clean medical scans", "Glove anesthesia and voluntary mutism following family disagreements"],
    "C",
    "PTSD arises following exposure to a life-threatening trauma and is diagnosed when an individual exhibits: (1) intrusive memories/flashbacks, (2) avoidance of trauma-related stimuli, (3) negative alterations in mood/cognition, and (4) marked hypervigilance.\nHence, Option {{CORR}} is correct.",
    "Lists core diagnostic clusters of PTSD."
)
add_q(make_question(CHAPTER, "Trauma-Related Disorders", "An army veteran who survived a bomb explosion experiences recurrent terrifying flashbacks, night sweats, emotional numbness, and extreme startle reflexes. The diagnosis is:", opts, c, s, 15))

# Q16: Somatic Symptom Disorder
opts, c, s = rotate_options(
    "Persistent, distressing physical bodily symptoms accompanied by disproportionate and excessive thoughts, feelings, and behaviours related to the symptoms",
    ["Sudden acute paralysis caused by a severed spinal cord in an automobile accident", "Severe chest pain caused by confirmed myocardial infarction in an emergency room", "An imaginary story told to police officers to claim insurance compensation"],
    "D",
    "Somatic Symptom Disorder involves having significant physical symptoms (pain, fatigue) that disrupt daily life, accompanied by disproportionately excessive anxiety, worry, and time devoted to health concerns, where medical tests reveal no adequate organic basis.\nHence, Option {{CORR}} is correct.",
    "Defines Somatic Symptom Disorder."
)
add_q(make_question(CHAPTER, "Somatic Symptom Disorders", "What characterizes 'Somatic Symptom Disorder' in the modern psychiatric classification?", opts, c, s, 16))

# Q17: Illness Anxiety Disorder (Hypochondriasis)
opts, c, s = rotate_options(
    "Persistent preoccupation with having or acquiring a serious undiagnosed medical illness, despite repeated negative medical tests and physician reassurance",
    ["Sudden loss of motor movement in both legs after an emotional quarrel", "Feeling that one's body is floating outside oneself in a dreamlike fog", "Excessive worry about world political events and climate change"],
    "A",
    "Illness Anxiety Disorder (formerly hypochondriasis) is defined by a persistent, high-anxiety preoccupation with having or contracting a severe, life-threatening medical illness, where somatic symptoms are minimal or absent and medical reassurance fails.\nHence, Option {{CORR}} is correct.",
    "Defines Illness Anxiety Disorder."
)
add_q(make_question(CHAPTER, "Somatic Symptom Disorders", "An individual constantly checks their pulse, consults multiple cardiologists, and remains terrified of dying from heart cancer despite repeatedly normal medical test results. This indicates:", opts, c, s, 17))

# Q18: Conversion Disorder (Functional Neurological Symptom Disorder)
opts, c, s = rotate_options(
    "Loss or alteration in voluntary motor or sensory function (e.g. paralysis, blindness, seizures) that cannot be explained by known neurological pathology",
    ["Gradual memory loss over ten years in an elderly Alzheimer's patient", "Physical skin burns caused by direct exposure to boiling water", "Genetic intellectual deficiency present continuously since early birth"],
    "B",
    "Conversion Disorder presents with genuine neurological symptoms (such as sudden blindness, mutism, or limb paralysis) without corresponding organic neurological damage, typically triggered by acute psychosocial stressors or intrapsychic conflict.\nHence, Option {{CORR}} is correct.",
    "Defines Conversion Disorder."
)
add_q(make_question(CHAPTER, "Somatic Symptom Disorders", "Conversion Disorder is clinically identified by the presence of:", opts, c, s, 18))

# Q19: Glove Anesthesia
opts, c, s = rotate_options(
    "A classic conversion symptom where total loss of sensation occurs neatly in the hand up to the wrist, which contradicts actual biological anatomical nerve pathways",
    ["A clinical fungal infection affecting surgeons who wear rubber gloves", "A medical condition where fingers become frostbitten during arctic expeditions", "A skin allergy caused by touching latex rubber examination gloves"],
    "C",
    "Glove anesthesia is a classic conversion symptom where a patient loses feeling in the entire hand like a glove up to the wrist. Because radial, median, and ulnar nerves innervate longitudinal sections of the hand and forearm, this glove pattern is anatomically impossible, confirming psychological etiology.\nHence, Option {{CORR}} is correct.",
    "Explains the anatomical impossibility of glove anesthesia as a conversion symptom."
)
add_q(make_question(CHAPTER, "Somatic Symptom Disorders", "Why is 'glove anesthesia' recognized by clinical neurologists as definitive evidence of Conversion Disorder?", opts, c, s, 19))

# Q20: La Belle Indifférence
opts, c, s = rotate_options(
    "A striking, casual lack of concern or emotional distress displayed by a conversion patient toward their own severe physical symptom (e.g. calm indifference to sudden blindness)",
    ["An intense panic attack with fear of dying triggered by physical pain", "A chronic manic state characterized by reckless financial spending", "A severe depressive state where the patient refuses to get out of bed"],
    "D",
    "'La belle indifférence' (beautiful indifference) is a classic clinical feature in Conversion Disorder where the patient displays an astonishing lack of worry, alarm, or emotional distress regarding their sudden debilitating physical symptom (e.g. paralysis).\nHence, Option {{CORR}} is correct.",
    "Defines la belle indifférence."
)
add_q(make_question(CHAPTER, "Somatic Symptom Disorders", "What does the psychological phenomenon of 'la belle indifférence' signify in patients with Conversion Disorder?", opts, c, s, 20))

# Q21: Dissociative Amnesia
opts, c, s = rotate_options(
    "Inability to recall important autobiographical information, usually of a traumatic or stressful nature, that cannot be explained by ordinary forgetfulness",
    ["Memory loss caused by a heavy direct blow to the skull causing physical brain damage", "Forgetting the names of world capitals learned in fourth grade geography", "The inability to remember any memories prior to the age of three (infantile amnesia)"],
    "A",
    "Dissociative Amnesia involves an extensive inability to recall important personal autobiographical memories (often surrounding a traumatic or catastrophic event like combat or abuse) that is psychological in origin and too pervasive to be normal forgetting.\nHence, Option {{CORR}} is correct.",
    "Defines Dissociative Amnesia."
)
add_q(make_question(CHAPTER, "Dissociative Disorders", "Dissociative Amnesia is distinguished from normal forgetfulness and organic brain injury by:", opts, c, s, 21))

# Q22: Dissociative Fugue
opts, c, s = rotate_options(
    "Sudden, unexpected travel away from home accompanied by inability to recall past identity and often the assumption of a new identity",
    ["Going on a planned holiday with family members to a beach hotel", "Escaping from a burning building during a physical fire alarm", "Walking to the local grocery shop to buy bread and milk"],
    "B",
    "Dissociative Fugue (a subtype of dissociative amnesia) involves sudden, purposeful, unexpected travel away from one's customary home or work, accompanied by complete amnesia for one's previous identity and sometimes the adoption of an entirely new persona.\nHence, Option {{CORR}} is correct.",
    "Defines Dissociative Fugue."
)
add_q(make_question(CHAPTER, "Dissociative Disorders", "A bank manager mysteriously disappears from Mumbai and is discovered months later working as a cook in Kolkata under a new name with zero memory of his past life. What disorder does this exemplify?", opts, c, s, 22))

# Q23: Depersonalization / Derealization Disorder
opts, c, s = rotate_options(
    "Persistent feelings of detachment from one's own mental processes or body (depersonalisation) or feeling that the external world is dreamlike, artificial, and unreal (derealisation)",
    ["Believing that one is an ancient Egyptian pharaoh with cosmic powers", "Hearing voices commanding the individual to destroy household furniture", "Washing one's hands fifty times due to irrational fear of bacterial germs"],
    "C",
    "Depersonalization/Derealization Disorder involves recurrent episodes where the individual feels like an outside observer of their own body/thoughts (depersonalization) or experiences external surroundings as dreamlike, distant, or foggy (derealization).\nHence, Option {{CORR}} is correct.",
    "Distinguishes depersonalization from derealization."
)
add_q(make_question(CHAPTER, "Dissociative Disorders", "What characterizes 'Depersonalization/Derealization Disorder'?", opts, c, s, 23))

# Q24: Dissociative Identity Disorder (DID)
opts, c, s = rotate_options(
    "The presence of two or more distinct personality states (alters) that alternate in controlling behaviour, accompanied by amnesia for the other states",
    ["An individual having mood swings between happy and sad within one hour", "An individual playing different acting roles in a professional theater drama", "A person who is introverted at home but extraverted at work"],
    "D",
    "Dissociative Identity Disorder (DID, previously Multiple Personality Disorder) involves the disruption of identity marked by two or more distinct personality states (alters) with distinct names, voices, and memories recurrently taking control of behavior.\nHence, Option {{CORR}} is correct.",
    "Defines Dissociative Identity Disorder (DID)."
)
add_q(make_question(CHAPTER, "Dissociative Disorders", "Dissociative Identity Disorder (DID, formerly Multiple Personality Disorder) is diagnosed when:", opts, c, s, 24))

# Q25: Major Depressive Disorder (MDD) Criteria
opts, c, s = rotate_options(
    "Persistent depressed mood, anhedonia (loss of interest), fatigue, worthlessness, sleep/appetite disturbances, and suicidal thoughts lasting at least two weeks",
    ["Feeling temporary disappointment for one hour after a favorite sports team loses", "Chronic manic excitement and racing thoughts combined with grandiosity", "Sudden motor seizures and glove anesthesia following domestic arguments"],
    "A",
    "Major Depressive Disorder requires the presence of depressed mood and/or anhedonia (profound loss of interest/pleasure) alongside vegetative symptoms (weight loss/gain, insomnia/hypersomnia, fatigue, psychomotor changes) lasting for at least 2 consecutive weeks.\nHence, Option {{CORR}} is correct.",
    "Identifies diagnostic criteria and duration for Major Depressive Disorder."
)
add_q(make_question(CHAPTER, "Depressive Disorders", "Which constellation of symptoms, persisting continuously for at least two weeks, meets diagnostic criteria for Major Depressive Disorder (MDD)?", opts, c, s, 25))

# Q26: Anhedonia in Major Depression
opts, c, s = rotate_options(
    "The profound inability to experience pleasure, joy, or interest in activities previously found enjoyable",
    ["An intense uncontrollable craving for sweet sugary food products", "A severe phobic fear of entering enclosed elevator shafts", "A physical loss of sensation in the fingertips and toes"],
    "B",
    "Anhedonia is a cardinal symptom of Major Depressive Disorder, defined as the marked loss of interest or pleasure in all, or almost all, activities that the individual previously enjoyed (food, hobbies, socializing).\nHence, Option {{CORR}} is correct.",
    "Defines anhedonia."
)
add_q(make_question(CHAPTER, "Depressive Disorders", "In clinical depression, the symptom termed 'anhedonia' specifically denotes:", opts, c, s, 26))

# Q27: Persistent Depressive Disorder (Dysthymia)
opts, c, s = rotate_options(
    "A chronic, low-grade depressed mood persisting for most of the day, for more days than not, for at least two years",
    ["A brief acute depressive episode that completely resolves in forty-eight hours", "Episodes of mania alternating with episodes of schizophrenia every week", "Sudden memory loss of autobiographical identity following an accident"],
    "C",
    "Persistent Depressive Disorder (Dysthymia) is a chronic form of depression lasting for at least two years in adults (one year in children/adolescents), where depressive symptoms are less severe than full MDD but persistently continuous.\nHence, Option {{CORR}} is correct.",
    "Defines Persistent Depressive Disorder (Dysthymia)."
)
add_q(make_question(CHAPTER, "Depressive Disorders", "What distinguishes Persistent Depressive Disorder (Dysthymia) from Major Depressive Disorder regarding duration and severity?", opts, c, s, 27))

# Q28: Bipolar I Disorder
opts, c, s = rotate_options(
    "Alternating episodes of mania (elation, grandiosity, hyperactivity) and major depression, occasionally separated by normal mood periods",
    ["Chronic low-grade anxiety about daily financial budgets lasting six months", "Recurrent panic attacks triggered by crossing wide open public plazas", "Hearing voices commanding the person to wash hands fifty times"],
    "D",
    "Bipolar I Disorder is characterized by the occurrence of at least one full manic episode, typically alternating with episodes of major depression, causing severe disruption in vocational and social functioning.\nHence, Option {{CORR}} is correct.",
    "Defines Bipolar I Disorder."
)
add_q(make_question(CHAPTER, "Bipolar Disorders", "Bipolar I Disorder is diagnosed when an individual's clinical history displays:", opts, c, s, 28))

# Q29: Manic Episode Symptoms
opts, c, s = rotate_options(
    "Elevated or euphoric mood, grandiosity, decreased need for sleep (e.g. 2 hours), pressured speech, racing thoughts, and reckless impulsive activities",
    ["Profound sadness, lethargy, hypersomnia, and continuous crying spells", "Complete mutism and waxy flexibility where limbs stay frozen for hours", "Obsessions regarding bacterial germs combined with compulsive handwashing"],
    "A",
    "A manic episode involves an abnormally elevated, irritable, or expansive mood accompanied by inflated self-esteem (grandiosity), flight of ideas, rapid pressured speech, drastically decreased need for sleep, and reckless hedonic behaviors.\nHence, Option {{CORR}} is correct.",
    "Lists clinical symptoms of a manic episode."
)
add_q(make_question(CHAPTER, "Bipolar Disorders", "Which of the following describes the symptoms of a 'manic episode'?", opts, c, s, 29))

# Q30: Match Mood Disorders with Clinical Descriptions
add_q(make_match_question(
    CHAPTER, "Mood Disorders",
    "Match List I (Mood Disorder) with List II (Hallmark Diagnostic Profile):",
    [("A", "Major Depressive Disorder"), ("B", "Bipolar I Disorder"), ("C", "Persistent Depressive Disorder (Dysthymia)"), ("D", "Manic Episode")],
    [("I", "Elevated, euphoric mood with decreased need for sleep and racing ideas"), ("II", "Alternating cycles of manic episodes and major depressive episodes"), ("III", "Chronic low-grade depressed mood lasting continuously for at least two years"), ("IV", "Severe depressed mood and anhedonia lasting continuously for at least two weeks")],
    "A-IV, B-II, C-III, D-I", "A",
    "MDD: severe depressed mood/anhedonia 2 weeks (A-IV); Bipolar I: alternating mania and depression (B-II); Dysthymia: chronic low-grade depression 2 years (C-III); Mania: euphoric mood/racing ideas (D-I).",
    "Correctly matches mood disorders with diagnostic profiles."
))

# Q31: Schizophrenia Positive vs Negative Symptoms
opts, c, s = rotate_options(
    "Positive symptoms are excesses or distortions of normal behaviour (delusions, hallucinations), while negative symptoms are deficits (avolition, flat affect, alogia)",
    ["Positive symptoms are good and healthy, while negative symptoms are evil", "Positive symptoms occur only in adults, while negative symptoms occur only in infants", "Positive symptoms refer to high IQ, while negative symptoms refer to physical blindness"],
    "B",
    "In schizophrenia: Positive symptoms represent an excess or distortion of normal psychological functioning (e.g. delusions, hallucinations, disorganized speech); Negative symptoms represent deficits or absences of normal functions (e.g. alogia, avolition, flat affect).\nHence, Option {{CORR}} is correct.",
    "Distinguishes positive from negative symptoms in schizophrenia."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "In schizophrenia, what is the fundamental conceptual difference between 'positive symptoms' and 'negative symptoms'?", opts, c, s, 31))

# Q32: Delusion definition
opts, c, s = rotate_options(
    "A false, unshakeable belief firmly held on inadequate grounds despite clear contradictory evidence and consensus of others",
    ["An unprovoked sensory perception occurring in the absence of any external stimulus", "A temporary slip of the tongue while delivering a public speech", "An artistic metaphor used by a poet in a published sonnet"],
    "C",
    "A delusion is a fixed, false personal belief firmly held despite indisputable proof or consensus to the contrary, not shared by other members of the individual's culture or subculture.\nHence, Option {{CORR}} is correct.",
    "Defines delusion."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "A 'delusion' in psychotic psychopathology is formally defined as:", opts, c, s, 32))

# Q33: Delusions of Persecution
opts, c, s = rotate_options(
    "Believing that one is being plotted against, spied upon, poisoned, slandered, or deliberately harassed by enemies",
    ["Believing that one has supreme god-like cosmic powers to save humanity", "Believing that everyday radio commercials contain secret romantic love messages for oneself", "Believing that one's body has been turned into a mechanical steam engine"],
    "D",
    "Delusions of persecution are the most common delusions in schizophrenia, wherein the person firmly believes that hostile conspiracies, secret agents, or enemies are spying on them, trying to poison them, or plotting their destruction.\nHence, Option {{CORR}} is correct.",
    "Identifies delusions of persecution."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "A patient insists that secret police agents have placed hidden microphones in his apartment walls and are poisoning his drinking water. This exemplifies:", opts, c, s, 33))

# Q34: Delusions of Reference
opts, c, s = rotate_options(
    "Believing that neutral, trivial everyday events or public broadcasts have a special personal meaning directed specifically at oneself",
    ["Believing that one is the biological incarnation of Napoleon Bonaparte", "Believing that one's thoughts are being physically extracted by alien spaceships", "Believing that one has no internal organs and is biologically dead"],
    "A",
    "In delusions of reference, an individual attaches personal and special significance to innocuous everyday occurrences (e.g. believing a television news anchor's casual cough was a coded signal meant for them).\nHence, Option {{CORR}} is correct.",
    "Defines delusions of reference."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "A patient watching the evening news believes that the newscaster is transmitting secret personal messages specifically coded for her. Which delusion is demonstrated?", opts, c, s, 34))

# Q35: Delusions of Grandeur
opts, c, s = rotate_options(
    "Believing that one possesses extraordinary supernatural powers, supreme divine authority, or is an acclaimed historical emperor or savior",
    ["Believing that neighbors are plotting to steal one's clothes from the laundry", "Believing that one has cancer despite clean medical body scans", "Believing that one is an insignificant speck of dust that should be destroyed"],
    "B",
    "Delusions of grandeur involve inflated, fantastic beliefs that one possesses exceptional divine powers, cosmic importance, unique prophetic missions, or identity as a legendary figure (e.g. believing one is the Messiah).\nHence, Option {{CORR}} is correct.",
    "Defines delusions of grandeur."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "A psychotic patient loudly declares that he is an immortal cosmic emperor chosen by divine beings to rule the solar system. This illustrates:", opts, c, s, 35))

# Q36: Delusions of Control: Thought Insertion, Withdrawal, Broadcasting
opts, c, s = rotate_options(
    "Believing that one's thoughts, feelings, and actions are controlled by external forces; thoughts are placed in mind, stolen, or transmitted to everyone",
    ["Believing that physical exercise is healthy for the human cardiovascular system", "Believing that studying for an examination will produce high academic grades", "Believing that washing hands removes dangerous pathogenic bacteria"],
    "C",
    "Delusions of control involve beliefs that one's mind is manipulated by external agencies: Thought Insertion (external thoughts placed inside one's mind), Thought Withdrawal (thoughts stolen), or Thought Broadcasting (thoughts broadcast aloud to the public).\nHence, Option {{CORR}} is correct.",
    "Defines delusions of control including thought insertion, withdrawal, and broadcasting."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "Believing that an external satellite is beaming foreign thoughts directly into one's brain (thought insertion) or broadcasting them aloud is an example of:", opts, c, s, 36))

# Q37: Hallucination definition
opts, c, s = rotate_options(
    "A sensory perception that occurs in the absence of any real external sensory stimulus (e.g. hearing voices when room is silent)",
    ["A misinterpretation of an actual real external stimulus (such as mistaking a rope for a snake)", "A fixed false intellectual belief held despite contradictory factual evidence", "An inability to remember autobiographical identity following severe trauma"],
    "D",
    "A hallucination is a false sensory perception that has the vividness and impact of an actual perception, but occurs without any external stimulation of the relevant sensory organ.\nHence, Option {{CORR}} is correct.",
    "Defines hallucination."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "A 'hallucination' in psychotic disorders is defined as:", opts, c, s, 37))

# Q38: Most Common Type of Hallucination in Schizophrenia
opts, c, s = rotate_options(
    "Auditory hallucinations, where the individual hears phantom voices talking to or about them",
    ["Gustatory hallucinations, tasting sour lemons when drinking plain water", "Olfactory hallucinations, smelling phantom burnt rubber in the air", "Tactile hallucinations, feeling electrical tingling on the fingertips"],
    "A",
    "Auditory hallucinations are by far the most frequent type in schizophrenia; patients hear voices that converse with them, give running commentaries on their actions, or issue direct commands.\nHence, Option {{CORR}} is correct.",
    "Identifies auditory hallucinations as the most common in schizophrenia."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "Which sensory modality of hallucination is most frequently experienced by individuals diagnosed with schizophrenia?", opts, c, s, 38))

# Q39: Formal Thought Disorder in Schizophrenia
opts, c, s = rotate_options(
    "Loose associations (derailment), Neologisms (made-up words), Perseveration, and Clang associations",
    ["High arithmetic speed, photographic memory, and linguistic translation", "Clear grammatical logic, deductive reasoning, and academic eloquence", "Silent meditation, spiritual contemplation, and philosophical debate"],
    "B",
    "Formal thought disorder in schizophrenia disrupts the communication process: Loose associations (jumping derailment between unrelated thoughts), Neologisms (coining nonsensical words), and Perseveration (inappropriate repetition of words/phrases).\nHence, Option {{CORR}} is correct.",
    "Lists signs of formal thought disorder in schizophrenia."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "Which cognitive-linguistic disruptions characterize 'formal thought disorder' in schizophrenia?", opts, c, s, 39))

# Q40: Match Schizophrenia Thought Disruptions
add_q(make_match_question(
    CHAPTER, "Schizophrenia Spectrum",
    "Match List I (Schizophrenic Speech Disruption) with List II (Operational Description):",
    [("A", "Loose Associations (Derailment)"), ("B", "Neologisms"), ("C", "Perseveration"), ("D", "Clang Associations")],
    [("I", "Inventing completely new made-up words that have meaning only to the patient"), ("II", "Connecting words based solely on rhyming sounds rather than semantic meaning"), ("III", "Shifting rapidly from one topic to another with zero logical connection"), ("IV", "Inappropriately repeating the same word, phrase, or idea over and over again")],
    "A-III, B-I, C-IV, D-II", "A",
    "Loose associations: jumping unrelated topics (A-III); Neologisms: invented words (B-I); Perseveration: repeating same phrase (C-IV); Clang associations: rhyming speech (D-II).",
    "Accurately pairs thought disorder terms with definitions."
))

# Q41: Catatonic Posturing and Catatonic Rigidity
opts, c, s = rotate_options(
    "Assuming bizarre, awkward physical postures for hours (posturing) or maintaining a rigid upright posture and resisting all efforts to be moved (rigidity)",
    ["Dancing energetically in circles to rhythmic drum music", "Running at maximum sprint speed across hospital corridors", "Sleeping peacefully in a comfortable horizontal bed posture"],
    "A",
    "Catatonic posturing involves voluntarily assuming awkward, bizarre postures and holding them motionless for extended hours; catatonic rigidity involves maintaining a rigid, statue-like posture, actively resisting any effort to reposition limbs.\nHence, Option {{CORR}} is correct.",
    "Explains catatonic posturing and rigidity."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "In catatonic schizophrenia, what do 'catatonic posturing' and 'catatonic rigidity' involve?", opts, c, s, 41))

# Q42: Waxy Flexibility (Cerea Flexibilitas)
opts, c, s = rotate_options(
    "A catatonic state where an individual's limbs can be molded and positioned by an examiner like soft wax, maintaining that position indefinitely",
    ["A condition where physical bones become soft and bendable due to calcium deficiency", "A personality trait involving extreme submissive compliance to social peer pressure", "A physical gymnastics skill where an athlete performs double backflips"],
    "B",
    "Waxy flexibility (cerea flexibilitas) is a catatonic sign where an examiner can sculpt the patient's limbs into awkward positions, and the patient will hold that exact posture for hours as if made of malleable wax.\nHence, Option {{CORR}} is correct.",
    "Defines waxy flexibility."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "What is the clinical phenomenon of 'waxy flexibility' observed in catatonic schizophrenia?", opts, c, s, 42))

# Q43: Negative Symptoms: Alogia, Avolition, Anhedonia, Flat Affect
opts, c, s = rotate_options(
    "Alogia is poverty of speech; Avolition is lack of goal-directed initiative; Anhedonia is loss of pleasure; Flat affect is blunted emotional expression",
    ["Alogia is singing opera; Avolition is marathon running; Anhedonia is overeating; Flat affect is laughter", "All four terms describe types of visual hallucinations seen in schizophrenia", "All four terms describe delusions of being royal royalty"],
    "C",
    "Negative symptoms in schizophrenia reflect functional deficits: Alogia (poverty of speech/content), Avolition (apathy, inability to initiate tasks), Anhedonia (inability to experience pleasure), and Flat Affect (diminished emotional expression in voice/face).\nHence, Option {{CORR}} is correct.",
    "Accurately defines the four cardinal negative symptoms of schizophrenia."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "How are the four negative symptoms of schizophrenia (Alogia, Avolition, Anhedonia, Flat Affect) defined?", opts, c, s, 43))

# Q44: Dopamine Hypothesis of Schizophrenia
opts, c, s = rotate_options(
    "Excessive or hyperactive dopamine neurotransmission (particularly at D2 receptors) in specific cerebral pathways contributes to psychotic symptoms",
    ["Total absence of all dopamine in the brain causing physical muscle spasms", "Excessive insulin in the pancreas causing low blood sugar levels", "Excessive melatonin production by the pineal gland causing chronic sleep"],
    "D",
    "The Dopamine Hypothesis posits that schizophrenia is linked to hyperactivity of dopamine systems in the limbic areas of the brain; supported by findings that antipsychotic drugs block D2 dopamine receptors to reduce hallucinations and delusions.\nHence, Option {{CORR}} is correct.",
    "Explains the dopamine hypothesis of schizophrenia."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "What is the foundational premise of the 'Dopamine Hypothesis' in the neurobiology of schizophrenia?", opts, c, s, 44))

# Q45: Attention-Deficit/Hyperactivity Disorder (ADHD)
opts, c, s = rotate_options(
    "A neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity that impair academic and social functioning",
    ["A degenerative disorder of elderly adults leading to complete loss of long-term memory", "A genetic muscle disease characterized by total physical paralysis of limbs", "An acute bacterial infection of the inner ear causing loss of balance"],
    "A",
    "ADHD is a neurodevelopmental disorder marked by developmentally inappropriate levels of inattention (distractibility, disorganization), hyperactivity (fidgeting, restlessness), and impulsivity (difficulty waiting turn, blurting answers).\nHence, Option {{CORR}} is correct.",
    "Defines ADHD."
)
add_q(make_question(CHAPTER, "Neurodevelopmental Disorders", "Attention-Deficit/Hyperactivity Disorder (ADHD) is defined in psychopathology by which triad of symptoms?", opts, c, s, 45))

# Q46: Autism Spectrum Disorder (ASD)
opts, c, s = rotate_options(
    "Severe deficits in social communication and social interaction across contexts, accompanied by restricted, repetitive patterns of behaviour, interests, or activities",
    ["An intense fear of being trapped in public markets or transit plazas", "Recurrent unexpected panic attacks peaking within five minutes", "Loss of physical sensation in both hands following a domestic argument"],
    "B",
    "Autism Spectrum Disorder (ASD) involves persistent impairments in reciprocal social communication and interaction (e.g. lack of eye contact, lack of shared emotion) alongside restricted, repetitive motor movements, insistence on sameness, and fixated interests.\nHence, Option {{CORR}} is correct.",
    "Defines Autism Spectrum Disorder."
)
add_q(make_question(CHAPTER, "Neurodevelopmental Disorders", "Which behavioral profile characterizes a child diagnosed with Autism Spectrum Disorder (ASD)?", opts, c, s, 46))

# Q47: Specific Learning Disorder (SLD) - Dyslexia, Dyscalculia, Dysgraphia
opts, c, s = rotate_options(
    "Dyslexia involves reading/phonological deficits; Dyscalculia involves mathematics/arithmetic difficulty; Dysgraphia involves written expression difficulty",
    ["Dyslexia is hearing loss; Dyscalculia is blindness; Dysgraphia is physical mutism", "Dyslexia only affects adults; Dyscalculia affects infants; Dysgraphia affects animals", "All three terms are completely identical types of childhood sleepwalking"],
    "C",
    "Specific Learning Disorders involve difficulties in learning and using foundational academic skills: Dyslexia (inaccurate or slow reading and poor decoding), Dyscalculia (difficulty mastering number sense and calculations), and Dysgraphia (impaired written expression).\nHence, Option {{CORR}} is correct.",
    "Differentiates Dyslexia, Dyscalculia, and Dysgraphia."
)
add_q(make_question(CHAPTER, "Neurodevelopmental Disorders", "How are Dyslexia, Dyscalculia, and Dysgraphia differentiated within Specific Learning Disorders?", opts, c, s, 47))

# Q48: Anorexia Nervosa
opts, c, s = rotate_options(
    "Severe restriction of energy intake leading to significantly low body weight, an intense fear of gaining weight, and a distorted perception of one's own body shape",
    ["Recurrent episodes of uncontrolled binge eating without any compensatory purging", "Loss of memory for personal autobiographical identity following an accident", "Eating non-nutritive, non-food substances like paint, dirt, and chalk"],
    "D",
    "Anorexia Nervosa is an eating disorder marked by refusal to maintain a minimally normal body weight, self-starvation, an intense irrational dread of becoming obese, and a grossly distorted body image (seeing oneself as fat despite being emaciated).\nHence, Option {{CORR}} is correct.",
    "Defines Anorexia Nervosa."
)
add_q(make_question(CHAPTER, "Feeding and Eating Disorders", "Which diagnostic criteria define Anorexia Nervosa?", opts, c, s, 48))

# Q49: Bulimia Nervosa
opts, c, s = rotate_options(
    "Recurrent episodes of binge eating followed by inappropriate compensatory behaviours (self-induced vomiting, misuse of laxatives, excessive fasting or exercise)",
    ["A complete refusal to eat any food, leading to severe starvation and emaciation", "Chewing and spitting out food without swallowing for hours", "An uncontrollable urge to sleep twenty hours every day"],
    "A",
    "Bulimia Nervosa is characterized by recurrent binges (consuming large quantities of food with a sense of lack of control) followed by compensatory purging behaviors (vomiting, laxatives, extreme fasting) to prevent weight gain, typically maintaining near-normal weight.\nHence, Option {{CORR}} is correct.",
    "Defines Bulimia Nervosa."
)
add_q(make_question(CHAPTER, "Feeding and Eating Disorders", "What distinguishes Bulimia Nervosa from Anorexia Nervosa?", opts, c, s, 49))

# Q50: Binge-Eating Disorder
opts, c, s = rotate_options(
    "Recurrent episodes of eating large amounts of food rapidly with a sense of lack of control, but without regular compensatory purging behaviours",
    ["Restricting food intake to less than 200 calories per day to maintain thinness", "Obsessively checking pulse and blood pressure after every single meal", "Hearing voices commanding the individual to destroy grocery food items"],
    "B",
    "Binge-Eating Disorder involves recurrent episodes of eating objectively large amounts of food accompanied by marked distress and feelings of guilt or disgust, but unlike bulimia, is NOT accompanied by compensatory purging behaviors.\nHence, Option {{CORR}} is correct.",
    "Defines Binge-Eating Disorder."
)
add_q(make_question(CHAPTER, "Feeding and Eating Disorders", "How does Binge-Eating Disorder differ from Bulimia Nervosa?", opts, c, s, 50))

# Q51: Substance Use Disorders: Tolerance and Withdrawal
opts, c, s = rotate_options(
    "Tolerance requires increasing doses to achieve the desired effect; Withdrawal involves distressing physical/psychological symptoms when substance use is stopped",
    ["Tolerance is an allergy to a drug; Withdrawal is an overdose resulting in death", "Tolerance occurs only in children; Withdrawal occurs only in elderly adults", "Both terms refer to the financial price charged by illegal drug dealers"],
    "C",
    "In substance dependence: Tolerance is the physiological state where larger amounts of a substance are required to achieve intoxication; Withdrawal consists of unpleasant and dangerous physiological/cognitive symptoms when substance concentration drops.\nHence, Option {{CORR}} is correct.",
    "Distinguishes substance tolerance from withdrawal."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "In addiction psychopathology, what is the clinical distinction between 'tolerance' and 'withdrawal'?", opts, c, s, 51))

# Q52: Depressants: Alcohol, Barbiturates, Opioids
opts, c, s = rotate_options(
    "Substances that slow down the activity of the central nervous system, reducing tension and inhibitions, but impairing motor coordination and judgment",
    ["Substances that dramatically accelerate brain activity, causing manic excitement", "Substances that produce vivid kaleidoscope visual hallucinations in bright colors", "Substances that cure bacterial infections in the pulmonary lungs"],
    "D",
    "Depressants (such as alcohol, barbiturates, sedatives, and opioids) depress central nervous system activity, facilitating GABA neurotransmission, reducing anxiety and behavioral inhibitions, while slowing reaction time and judgment.\nHence, Option {{CORR}} is correct.",
    "Defines central nervous system depressants."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "Which of the following describes the pharmacological and behavioral effects of central nervous system 'depressants' (e.g. alcohol, sedatives)?", opts, c, s, 52))

# Q53: Stimulants: Cocaine, Amphetamines, Nicotine, Caffeine
opts, c, s = rotate_options(
    "Substances that increase the activity of the central nervous system, elevating heart rate, blood pressure, alertness, and energy",
    ["Substances that induce immediate deep coma and respiratory paralysis", "Substances that eliminate all memory of an individual's past identity", "Substances that reduce body temperature and cause profound muscular weakness"],
    "A",
    "Stimulants (including cocaine, amphetamines, nicotine, and caffeine) stimulate central nervous system activity by boosting dopamine and norepinephrine, increasing physiological arousal, alertness, and suppressing appetite.\nHence, Option {{CORR}} is correct.",
    "Defines central nervous system stimulants."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "What physiological and psychological effects characterize central nervous system 'stimulants'?", opts, c, s, 53))

# Q54: Hallucinogens: LSD, Cannabis, Mescaline
opts, c, s = rotate_options(
    "Substances that produce profound distortions in sensory perceptions, alter thought processes, and induce hallucinations or synesthesia",
    ["Substances that reduce blood pressure and put individuals into deep sleep", "Substances that accelerate arithmetic calculation speed on math exams", "Substances that cure diabetes and normalize insulin production"],
    "B",
    "Hallucinogens (psychedelics like LSD, psilocybin, and in high doses cannabis) alter sensory perception, causing synesthesia (crossing of senses, e.g. 'seeing sounds'), vivid kaleidoscopic hallucinations, and altered states of consciousness.\nHence, Option {{CORR}} is correct.",
    "Defines hallucinogens."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "Hallucinogenic substances (such as LSD or mescaline) produce which psychological effects?", opts, c, s, 54))

# Q55: Alcohol-Related Disorders: Cirrhosis, Korsakoff's Syndrome
opts, c, s = rotate_options(
    "Chronic alcohol abuse damages the liver (cirrhosis) and causes thiamine (vitamin B1) deficiency leading to severe memory loss (Korsakoff's syndrome)",
    ["Alcohol abuse permanently strengthens heart arteries and increases life span", "Alcohol abuse causes physical growth of additional bone tissue in fingers", "Alcohol abuse eliminates all risk of cancer and bacterial pneumonia"],
    "C",
    "Prolonged heavy alcohol dependence causes physical liver cirrhosis and severe nutritional thiamine (vitamin B1) deficiency, culminating in Wernicke-Korsakoff syndrome, marked by profound anterograde amnesia and confabulation.\nHence, Option {{CORR}} is correct.",
    "Explains medical consequences of chronic alcoholism including Korsakoff's syndrome."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "Chronic heavy alcohol dependence can cause a devastating cognitive disorder marked by profound amnesia and confabulation known as:", opts, c, s, 55))

# Q56: Opioids (Morphine, Heroin, Codeine)
opts, c, s = rotate_options(
    "Narcotic analgesics derived from the opium poppy that relieve severe pain, induce euphoria and drowsiness, with exceptionally high addiction potential",
    ["Non-addictive vitamins that stimulate rapid hair growth", "Chemical gases used in fire extinguishers to extinguish electrical fires", "Stimulant powders that prevent sleep for weeks without any fatigue"],
    "D",
    "Opioids (morphine, heroin, codeine, synthetic opioids) act on the body's endorphin receptors to alleviate physical pain and induce tranquil euphoria, carrying severe risk of rapid physiological tolerance, withdrawal, and lethal overdose.\nHence, Option {{CORR}} is correct.",
    "Defines opioids."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "What defines 'opioids' (such as morphine and heroin) in psychopharmacology?", opts, c, s, 56))

# Q57: Cannabis (Marijuana, Hashish, Bhang, Ganja)
opts, c, s = rotate_options(
    "Produced from the Cannabis sativa plant; active ingredient THC produces mild euphoria, altered time perception, increased appetite, and relaxation",
    ["A synthetic barbiturate that eliminates all visual dreams during sleep", "A toxic chemical pesticide used exclusively to spray agricultural crops", "An antibiotic medicine used to treat bacterial meningitis"],
    "A",
    "Cannabis preparations (bhang, ganja, charas, hashish) derived from Cannabis sativa contain the psychoactive chemical THC (delta-9-tetrahydrocannabinol), inducing mild euphoria, heightened sensory awareness, and altered perception of time.\nHence, Option {{CORR}} is correct.",
    "Describes cannabis and its active chemical THC."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "Which psychoactive substance is derived from the hemp plant Cannabis sativa, with THC as its primary active ingredient?", opts, c, s, 57))

# Q58: Match Substance Categories with Examples
add_q(make_match_question(
    CHAPTER, "Substance-Related Disorders",
    "Match List I (Pharmacological Substance Class) with List II (Representative Example):",
    [("A", "Depressant"), ("B", "Stimulant"), ("C", "Opioid / Narcotic"), ("D", "Hallucinogen")],
    [("I", "Cocaine and Amphetamines"), ("II", "Heroin and Morphine"), ("III", "Alcohol and Barbiturates"), ("IV", "LSD and Mescaline")],
    "A-III, B-I, C-II, D-IV", "A",
    "Depressant: alcohol/barbiturates (A-III); Stimulant: cocaine/amphetamines (B-I); Opioid: heroin/morphine (C-II); Hallucinogen: LSD/mescaline (D-IV).",
    "Correctly matches substance classes to specific drug examples."
))

# Q59: Delirium Tremens in Alcohol Withdrawal
opts, c, s = rotate_options(
    "A severe, life-threatening withdrawal state characterized by profound mental confusion, terrifying visual hallucinations, tremors, and autonomic hyperarousal",
    ["A mild temporary headache following a late night of studying", "A state of supreme athletic energy and boundless happiness", "A pleasant dream state experienced during peaceful non-REM sleep"],
    "B",
    "Delirium Tremens (DTs) is an acute, severe medical emergency resulting from abrupt alcohol withdrawal in dependent individuals, marked by profound disorientation, autonomic storm (fever, tachycardia), terrifying hallucinations (bugs crawling), and tremors.\nHence, Option {{CORR}} is correct.",
    "Defines Delirium Tremens."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "What is 'Delirium Tremens' in the clinical pathology of alcohol dependence?", opts, c, s, 59))

# Q60: Statement on Stigma of Mental Illness
add_q(make_statement_question(
    CHAPTER, "Concepts of Abnormality",
    "Stigmatization of mental illness prevents many individuals from seeking timely professional psychiatric and psychological help.",
    "Modern scientific psychopathology emphasizes that psychological disorders result from a complex interplay of biological, psychological, and sociocultural factors.",
    1, "A",
    "Both statements are correct. Social stigma attached to mental health problems remains a formidable barrier preventing people from seeking help, and modern science conceptualizes psychopathology through the biopsychosocial framework.",
    "Validates the impact of stigma and the biopsychosocial model."
))

print(f"Unit 4 Section 1 complete: {len(unit4_qs)} questions generated.")

# --- SECTION 2: ETIOLOGY, MOOD, SCHIZOPHRENIA & CHILDHOOD DISORDERS (Q61 - Q120) ---

# Q61: Beck's Cognitive Triad in Depression
opts, c, s = rotate_options(
    "Negative, distorted automatic thoughts concerning: The Self ('I am worthless'), The World ('Everyone hates me'), and The Future ('Nothing will ever improve')",
    ["Negative beliefs about arithmetic, algebra, and geometry", "Negative memories of physical food meals eaten in childhood", "Negative beliefs about the speed of train transit systems"],
    "A",
    "Aaron Beck formulated the 'Cognitive Triad' of depression, postulating that depressed individuals maintain automatic, rigid, negative cognitive schemas regarding: (1) The Self, (2) The World/Ongoing experiences, and (3) The Future.\nHence, Option {{CORR}} is correct.",
    "Identifies the three components of Beck's Cognitive Triad."
)
add_q(make_question(CHAPTER, "Depressive Disorders", "According to Aaron Beck's cognitive theory of depression, the 'Cognitive Triad' consists of negative automatic thoughts regarding:", opts, c, s, 61))

# Q62: Learned Helplessness (Martin Seligman)
opts, c, s = rotate_options(
    "Organisms exposed to uncontrollable negative events learn that their actions have no effect, developing passivity, helplessness, and depression",
    ["Organisms learn to swim across rivers by observing adult animals", "Organisms develop superhuman athletic reflexes under cold weather", "Organisms learn to speak human language through conditioned reward"],
    "B",
    "Martin Seligman's Learned Helplessness model demonstrates that when animals or humans experience traumatic, inescapable negative events, they learn that outcomes are uncontrollable, resulting in cognitive deficits, passivity, and depression.\nHence, Option {{CORR}} is correct.",
    "Defines learned helplessness."
)
add_q(make_question(CHAPTER, "Depressive Disorders", "Martin Seligman's theory of 'Learned Helplessness' explains depression as resulting from:", opts, c, s, 62))

# Q63: Depressive Explanatory Style (Attributional Reformulation)
opts, c, s = rotate_options(
    "Internal ('It's entirely my fault'), Stable ('I will always be a failure'), and Global ('I am incompetent at everything in life')",
    ["External, Unstable, and Specific attributions for personal failure", "Sattvic, Rajasic, and Tamasic explanations for physical weather", "Conscious, Preconscious, and Unconscious explanations for sleep"],
    "C",
    "The reformulated learned helplessness theory posits that individuals prone to depression explain negative life events with a pessimistic explanatory style: Internal (attributing blame to self), Stable (believing it will never change), and Global (generalizing failure to all areas of life).\nHence, Option {{CORR}} is correct.",
    "Identifies internal, stable, and global attributions in depressive explanatory style."
)
add_q(make_question(CHAPTER, "Depressive Disorders", "Which attributional explanatory style for negative events predisposes an individual to severe clinical depression?", opts, c, s, 63))

# Q64: Neurotransmitters in Mood Disorders
opts, c, s = rotate_options(
    "Depression is linked to low levels of serotonin and norepinephrine; mania is linked to elevated norepinephrine activity",
    ["Depression is caused by excessive insulin; mania is caused by low thyroid hormone", "Depression is caused by low red blood cells; mania is caused by high white blood cells", "Mood disorders are completely independent of any biological brain chemicals"],
    "D",
    "Biological research links depression to depleted activity of monoamine neurotransmitters (principally serotonin and norepinephrine), whereas manic states are associated with hyperactivity of norepinephrine systems.\nHence, Option {{CORR}} is correct.",
    "Identifies the role of serotonin and norepinephrine in mood disorders."
)
add_q(make_question(CHAPTER, "Mood Disorders", "Which neurochemical imbalances are primarily implicated in the etiology of depression and mania?", opts, c, s, 64))

# Q65: Suicide Warning Signs and Risk Factors
opts, c, s = rotate_options(
    "Expressing explicit suicidal wishes, profound hopelessness, social withdrawal, giving away valued possessions, and sudden calm after deep depression",
    ["Energetically signing up for marathon athletic races and gym memberships", "Purchasing new professional office furniture for a corporate job promotion", "Enrolling in advanced university language courses with close friends"],
    "A",
    "Critical suicide warning signs include verbal threats of self-harm, pervasive feelings of hopelessness, giving away prized personal possessions, social isolation, and a sudden deceptive calm (which often occurs when a suicide plan has been decided upon).\nHence, Option {{CORR}} is correct.",
    "Identifies critical warning signs and risk factors for suicide."
)
add_q(make_question(CHAPTER, "Depressive Disorders", "Which behavioural and verbal signs are recognized as critical indicators of imminent suicide risk?", opts, c, s, 65))

# Q66: Schizophrenia Genetic Concordance Rates in Twins
opts, c, s = rotate_options(
    "Approximately 48% for identical (monozygotic) twins and approximately 17% for fraternal (dizygotic) twins",
    ["Exactly 100% for identical twins and exactly 0% for fraternal twins", "Approximately 5% for identical twins and 50% for fraternal twins", "Zero genetic concordance across all twin pairs in biological studies"],
    "B",
    "Genetic studies of schizophrenia demonstrate that the concordance rate for identical (monozygotic) twins is approximately 48%, compared to approximately 17% for fraternal (dizygotic) twins, confirming a powerful genetic vulnerability alongside environmental factors.\nHence, Option {{CORR}} is correct.",
    "Recalls concordance rates of schizophrenia in monozygotic vs dizygotic twins."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "In psychiatric genetics, what are the observed concordance rates for schizophrenia between identical (monozygotic) versus fraternal (dizygotic) twins?", opts, c, s, 66))

# Q67: Brain Structural Abnormalities in Schizophrenia
opts, c, s = rotate_options(
    "Enlarged lateral and third cerebral ventricles, with reduced cortical gray matter volume in prefrontal and temporal lobes",
    ["Shrinkage of skull bones and loss of primary dentition teeth", "Excessive growth of secondary brain hemispheres inside the ear canal", "Complete absence of the cerebellum and motor cortex since birth"],
    "C",
    "Neuroimaging studies consistently document that patients with schizophrenia frequently exhibit enlarged cerebral ventricles (reflecting atrophy of surrounding brain parenchyma) and reduced volume in the prefrontal cortex and temporal limbic structures.\nHence, Option {{CORR}} is correct.",
    "Identifies structural neuroanatomical abnormalities in schizophrenia."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "Which structural neuroanatomical abnormality is most frequently revealed by CT and MRI scans of patients with schizophrenia?", opts, c, s, 67))

# Q68: Expressed Emotion (EE) and Schizophrenia Relapse
opts, c, s = rotate_options(
    "Families characterized by high criticism, hostility, and emotional over-involvement create high emotional stress, significantly increasing the rate of patient relapse",
    ["Families that provide warm supportive encouragement cause immediate psychotic death", "Family emotional climate has zero measurable impact on schizophrenic symptoms", "High expressed emotion families permanently cure schizophrenia without medications"],
    "D",
    "Expressed Emotion (EE) refers to the emotional climate of a family: patients with schizophrenia who return to families high in criticism, overt hostility, and intrusive emotional over-involvement experience significantly higher relapse rates.\nHence, Option {{CORR}} is correct.",
    "Explains the impact of family Expressed Emotion on schizophrenia relapse."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "In clinical psychiatry, what role does a family's 'Expressed Emotion' (EE) play in the course of schizophrenia?", opts, c, s, 68))

# Q69: Oppositional Defiant Disorder (ODD)
opts, c, s = rotate_options(
    "An enduring pattern of angry/irritable mood, argumentative/defiant behaviour, and vindictiveness directed toward parents and authority figures",
    ["Physical destruction of property, stealing, and cruelty to animals", "Severe inattention combined with inability to sit still in classrooms", "Complete mutism and refusal to speak language with any humans"],
    "A",
    "Oppositional Defiant Disorder (ODD) is a childhood disorder characterized by age-inappropriate hostility, frequent temper tantrums, active defiance of adult requests, deliberate annoyance of others, and spitefulness, without violating major social laws.\nHence, Option {{CORR}} is correct.",
    "Defines Oppositional Defiant Disorder (ODD)."
)
add_q(make_question(CHAPTER, "Childhood and Developmental Disorders", "What behavioral patterns define Oppositional Defiant Disorder (ODD) in children?", opts, c, s, 69))

# Q70: Conduct Disorder (CD)
opts, c, s = rotate_options(
    "A repetitive and persistent pattern of behaviour in which the basic rights of others or major age-appropriate societal norms are violated (e.g. aggression to people/animals, property destruction, theft)",
    ["A mild temporary disagreement with a teacher about an art grade", "A child who loves collecting stamps and arranging them neatly in albums", "A child who is shy and uncomfortable singing in front of large audiences"],
    "B",
    "Conduct Disorder (CD) is significantly more severe than ODD, involving persistent violations of societal rules and others' rights, including physical aggression toward people/animals, destruction of property, theft, and serious rule violations (truancy, running away).\nHence, Option {{CORR}} is correct.",
    "Defines Conduct Disorder."
)
add_q(make_question(CHAPTER, "Childhood and Developmental Disorders", "How does Conduct Disorder (CD) differ in severity from Oppositional Defiant Disorder (ODD)?", opts, c, s, 70))

# Q71: ADHD Subtypes
opts, c, s = rotate_options(
    "Predominantly Inattentive presentation, Predominantly Hyperactive-Impulsive presentation, and Combined presentation",
    ["Oral presentation, Anal presentation, and Phallic presentation", "Sattvic presentation, Rajasic presentation, and Tamasic presentation", "Mild presentation, Moderate presentation, and Profound presentation"],
    "C",
    "Diagnostic manuals classify ADHD into three presentations based on symptom predominance: (1) Predominantly Inattentive, (2) Predominantly Hyperactive-Impulsive, and (3) Combined presentation (meeting criteria for both).\nHence, Option {{CORR}} is correct.",
    "Lists the three diagnostic presentations of ADHD."
)
add_q(make_question(CHAPTER, "Neurodevelopmental Disorders", "What are the three recognized diagnostic presentations of Attention-Deficit/Hyperactivity Disorder (ADHD)?", opts, c, s, 71))

# Q72: Autism Spectrum Disorder: Social Communication Deficits
opts, c, s = rotate_options(
    "Impairments in social-emotional reciprocity, nonverbal communicative behaviours (eye contact, gestures), and developing peer relationships",
    ["Superior ability to persuade large political crowds during elections", "Flawless empathic understanding of subtle facial expressions in strangers", "Compulsive urge to clean and wash hands fifty times every morning"],
    "D",
    "Core social deficits in ASD include lack of shared enjoyment (joint attention), poor or absent eye-to-eye gaze, deficits in non-verbal communicative gestures, difficulty initiating conversations, and inability to form age-appropriate friendships.\nHence, Option {{CORR}} is correct.",
    "Identifies social communication deficits in Autism Spectrum Disorder."
)
add_q(make_question(CHAPTER, "Neurodevelopmental Disorders", "Which of the following demonstrates the hallmark 'social communication deficit' characteristic of Autism Spectrum Disorder (ASD)?", opts, c, s, 72))

# Q73: Autism: Restricted and Repetitive Behaviours
opts, c, s = rotate_options(
    "Stereotyped motor movements (hand flapping, rocking), rigid adherence to routines, highly fixated restricted interests, and sensory hyper- or hypo-reactivity",
    ["Reckless spending sprees and grand delusions of divine royalty", "Glove anesthesia and hysterical blindness following an emotional quarrel", "Alternating between full manic excitement and severe unipolar depression"],
    "A",
    "The second major diagnostic domain of ASD involves repetitive, stereotyped motor mannerisms (flapping hands, spinning objects), inflexible insistence on sameness, distressed reactions to minor schedule changes, and unusual sensory responses.\nHence, Option {{CORR}} is correct.",
    "Lists restricted and repetitive behaviors in Autism Spectrum Disorder."
)
add_q(make_question(CHAPTER, "Neurodevelopmental Disorders", "Which cluster of behaviors exemplifies the 'restricted, repetitive patterns of behaviour' diagnostic criterion for Autism Spectrum Disorder?", opts, c, s, 73))

# Q74: Echolalia in Autism
opts, c, s = rotate_options(
    "The precise, parroted repetition of words, phrases, or dialogue spoken by others, often with identical intonation",
    ["The creative invention of new poetic metaphors in published books", "The complete physical inability to hear sounds due to ruptured eardrums", "The continuous whispering of secret delusions to imaginary companions"],
    "B",
    "Echolalia is a common speech pattern in children with autism where they mechanically echo or parrot words, questions, or television phrases heard from others rather than using spontaneous communicative language.\nHence, Option {{CORR}} is correct.",
    "Defines echolalia in Autism Spectrum Disorder."
)
add_q(make_question(CHAPTER, "Neurodevelopmental Disorders", "What does the linguistic phenomenon of 'echolalia' observed in autistic children refer to?", opts, c, s, 74))

# Q75: Somatic Conversion vs Malingering vs Factitious Disorder
opts, c, s = rotate_options(
    "In Conversion Disorder symptoms are genuine and unconscious; in Factitious Disorder symptoms are intentionally feigned to assume the sick role; in Malingering symptoms are feigned for external tangible gain (money, avoiding trial)",
    ["All three conditions are medically identical organic viral infections", "In Conversion Disorder symptoms are feigned for cash; in Malingering they are unconscious", "All three conditions only affect professional athletes during competitive tournaments"],
    "C",
    "In Conversion Disorder, symptoms are experienced as genuine loss of function without conscious intent. In Factitious Disorder, symptoms are intentionally feigned for internal psychological rewards (sick role). In Malingering, symptoms are faked for obvious external secondary gains (avoiding military draft, insurance money).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Conversion Disorder from Factitious Disorder and Malingering."
)
add_q(make_question(CHAPTER, "Somatic Symptom Disorders", "How are Conversion Disorder, Factitious Disorder, and Malingering differentiated regarding conscious intent and external motivation?", opts, c, s, 75))

# Q76: Etiology of Anxiety Disorders: Classical Conditioning
opts, c, s = rotate_options(
    "A previously neutral stimulus becomes associated with a traumatic, fear-inducing event, eliciting conditioned fear (as shown in Watson's Little Albert experiment)",
    ["Genetic mutations on chromosome 4 completely eliminate all fear reflexes", "Taking a written arithmetic test eliminates all future anxiety responses", "Eating specific fruits permanently immunizes an individual against all fears"],
    "D",
    "Behavioral theory demonstrates that phobias and anxiety can be acquired via classical conditioning: a neutral conditioned stimulus (CS) paired with a terrifying unconditioned stimulus (UCS) acquires the power to evoke a conditioned fear response (CR), maintained by operant avoidance.\nHence, Option {{CORR}} is correct.",
    "Explains classical conditioning etiology of phobias and anxiety."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "How does behavioral psychology explain the acquisition and maintenance of specific phobias?", opts, c, s, 76))

# Q77: Catatonic Stupor
opts, c, s = rotate_options(
    "A state of profound psychomotor immobility where the patient remains completely motionless, mute, and unresponsive to external environmental stimuli",
    ["An episode of violent aggressive destruction of hospital furniture", "A state of manic hyperactivity where the individual dances for three days", "A deep sleep state from which the patient awakens fully cured"],
    "A",
    "Catatonic stupor is marked by a dramatic reduction in psychomotor activity; the individual remains entirely motionless, silent (mutism), and oblivious or non-responsive to external events while maintaining full conscious awareness.\nHence, Option {{CORR}} is correct.",
    "Defines catatonic stupor."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "In schizophrenia, what characterizes 'catatonic stupor'?", opts, c, s, 77))

# Q78: Catatonic Rigidity vs Posturing
opts, c, s = rotate_options(
    "In rigidity the person resists attempts to be moved; in posturing the person voluntarily assumes and maintains bizarre, awkward bodily positions",
    ["In rigidity the person dances; in posturing the person sleeps on the floor", "In rigidity the person speaks twenty languages; in posturing the person is silent", "Both terms describe types of verbal auditory hallucinations"],
    "B",
    "In catatonic rigidity, the patient maintains a rigid posture and actively resists efforts to be moved; in catatonic posturing, the patient voluntarily assumes and holds an inappropriate or bizarre posture for extended periods.\nHence, Option {{CORR}} is correct.",
    "Differentiates catatonic rigidity from posturing."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "What is the distinction between 'catatonic rigidity' and 'catatonic posturing' in psychotic patients?", opts, c, s, 78))

# Q79: Bipolar II vs Bipolar I
opts, c, s = rotate_options(
    "Bipolar I requires at least one full manic episode, while Bipolar II requires hypomanic episodes (less severe) and at least one major depressive episode",
    ["Bipolar I only affects infants, while Bipolar II only affects retired adults", "Bipolar I involves auditory hallucinations, while Bipolar II involves physical blindness", "Both diagnoses are completely identical with zero clinical difference"],
    "C",
    "Bipolar I Disorder requires the presence of at least one full-blown manic episode (which may involve psychosis or hospitalization), whereas Bipolar II Disorder involves hypomania (milder elation without psychosis or hospitalization) and recurrent major depressive episodes.\nHence, Option {{CORR}} is correct.",
    "Contrasts Bipolar I with Bipolar II disorder."
)
add_q(make_question(CHAPTER, "Bipolar Disorders", "What is the crucial diagnostic difference between Bipolar I Disorder and Bipolar II Disorder?", opts, c, s, 79))

# Q80: Cyclothymic Disorder
opts, c, s = rotate_options(
    "A chronic mood disorder lasting at least two years involving numerous periods of hypomanic symptoms and depressive symptoms that do not meet full criteria for major episodes",
    ["An acute panic attack lasting twenty minutes triggered by entering an elevator", "A permanent genetic intellectual disability present since kindergarten", "A severe eating disorder marked by extreme starvation and body distortion"],
    "D",
    "Cyclothymic disorder is a chronic, fluctuating mood disturbance lasting for at least two years, involving numerous periods of hypomanic symptoms and mild depressive symptoms that are insufficient in severity to qualify as full manic or major depressive episodes.\nHence, Option {{CORR}} is correct.",
    "Defines Cyclothymic Disorder."
)
add_q(make_question(CHAPTER, "Bipolar Disorders", "What clinical course defines 'Cyclothymic Disorder'?", opts, c, s, 80))

# Q81: Medical Complications of Anorexia Nervosa
opts, c, s = rotate_options(
    "Severe electrolyte imbalances, cardiac arrhythmias, osteoporosis, amenorrhea (cessation of menstruation), and potential death from heart failure",
    ["Rapid growth of dense muscular tissue and superhuman strength", "Instant permanent cure of all dental cavities and eyesight defects", "Elevated blood pressure leading to excessive blood clots in veins"],
    "A",
    "Severe starvation in Anorexia Nervosa leads to dangerous medical sequelae: amenorrhea, bradycardia, severe hypotension, hypokalemia (potassium depletion triggering fatal cardiac arrhythmias), bone loss, and multi-organ failure.\nHence, Option {{CORR}} is correct.",
    "Lists critical medical complications of Anorexia Nervosa."
)
add_q(make_question(CHAPTER, "Feeding and Eating Disorders", "Which severe medical consequences can develop directly as a result of chronic starvation in Anorexia Nervosa?", opts, c, s, 81))

# Q82: Medical Complications of Bulimia Nervosa
opts, c, s = rotate_options(
    "Severe potassium and electrolyte depletion, dental enamel erosion from stomach acids, esophageal tears, and cardiac arrest",
    ["Complete immunity to all bacterial and viral throat infections", "Loss of all dental teeth replaced by permanent golden crowns", "Sudden irreversible loss of hearing in both eardrums"],
    "B",
    "Repeated purging via self-induced vomiting causes erosion of dental enamel from acidic gastric juices, salivary gland swelling ('chipmunk cheeks'), tears in the esophagus, and hypokalemic electrolyte imbalances leading to cardiac arrest.\nHence, Option {{CORR}} is correct.",
    "Identifies medical sequelae of chronic purging in Bulimia Nervosa."
)
add_q(make_question(CHAPTER, "Feeding and Eating Disorders", "Frequent self-induced vomiting in Bulimia Nervosa characteristically causes which specific physical health complications?", opts, c, s, 82))

# Q83: Body Dysmorphic Disorder (BDD)
opts, c, s = rotate_options(
    "Preoccupation with perceived defects or flaws in physical appearance that are unnoticeable or appear slight to others, causing severe distress and repetitive behaviours (mirror checking)",
    ["A severe refusal to eat any solid food leading to physical starvation", "A genuine neurological paralysis of facial muscles following a stroke", "A hallucination of smelling burning sulphur inside one's nostrils"],
    "C",
    "Body Dysmorphic Disorder (classified within OCD and related disorders) involves an obsessive preoccupation with an imagined or grossly exaggerated defect in physical appearance (e.g. nose shape, skin blemishes), driving compulsive mirror checking or grooming.\nHence, Option {{CORR}} is correct.",
    "Defines Body Dysmorphic Disorder (BDD)."
)
add_q(make_question(CHAPTER, "Obsessive-Compulsive Disorder", "In DSM-5, 'Body Dysmorphic Disorder' is characterized by:", opts, c, s, 83))

# Q84: Trichotillomania (Hair-Pulling Disorder)
opts, c, s = rotate_options(
    "Recurrent pulling out of one's own hair resulting in hair loss, accompanied by repeated attempts to decrease or stop the pulling",
    ["Compulsive washing of hands fifty times a day to kill bacteria", "Recurrent fear of being attacked by foreign stray dogs in the street", "Sudden memory amnesia regarding one's family name and address"],
    "D",
    "Trichotillomania (classified within OCD and related disorders) is characterized by the chronic, irresistible urge to pull out hair from one's scalp, eyebrows, or body, resulting in noticeable hair loss and functional impairment.\nHence, Option {{CORR}} is correct.",
    "Defines Trichotillomania."
)
add_q(make_question(CHAPTER, "Obsessive-Compulsive Disorder", "What is the defining clinical feature of 'Trichotillomania'?", opts, c, s, 84))

# Q85: Hoarding Disorder
opts, c, s = rotate_options(
    "Persistent difficulty discarding or parting with possessions, regardless of their actual value, leading to severe clutter that compromises living areas",
    ["Carefully collecting rare historical gold coins in a locked safe", "Organizing household library books in exact alphabetical sequence", "Throwing away all household furniture and sleeping on a bare floor"],
    "A",
    "Hoarding Disorder is characterized by persistent distress at the thought of getting rid of items, resulting in severe accumulation of clutter that congests and compromises active living areas.\nHence, Option {{CORR}} is correct.",
    "Defines Hoarding Disorder."
)
add_q(make_question(CHAPTER, "Obsessive-Compulsive Disorder", "Which behavioral pattern exemplifies 'Hoarding Disorder'?", opts, c, s, 85))

# Q86: Dissociative Identity Disorder Etiology
opts, c, s = rotate_options(
    "Severe, chronic physical, sexual, or emotional abuse during early childhood, leading the child to dissociate to psychologically escape trauma",
    ["A direct physical gunshot wound to the parietal brain cortex in adulthood", "Genetic mutations in the chromosomes inherited from grandparents", "Excessive consumption of caffeinated energy drinks during high school"],
    "B",
    "Clinical research overwhelmingly indicates that Dissociative Identity Disorder (DID) originates as an extreme psychological defense mechanism in response to severe, repetitive physical, sexual, or psychological abuse during early childhood.\nHence, Option {{CORR}} is correct.",
    "Explains the trauma etiology of Dissociative Identity Disorder."
)
add_q(make_question(CHAPTER, "Dissociative Disorders", "What is recognized by clinical psychologists as the primary developmental etiology of Dissociative Identity Disorder (DID)?", opts, c, s, 86))

# Q87: Acute Stress Disorder (ASD) vs PTSD
opts, c, s = rotate_options(
    "Acute Stress Disorder occurs between 3 days and 1 month following the trauma, whereas PTSD is diagnosed when symptoms persist beyond 1 month",
    ["Acute Stress Disorder occurs only in children, while PTSD occurs only in soldiers", "Acute Stress Disorder involves hallucinations, while PTSD involves physical blindness", "Both disorders are identical with zero diagnostic distinction in duration"],
    "C",
    "Acute Stress Disorder (ASD) and PTSD present similar trauma-related symptoms (flashbacks, avoidance, arousal), but ASD is diagnosed if symptoms last from 3 days up to 1 month post-trauma; if symptoms persist beyond 1 month, the diagnosis transitions to PTSD.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Acute Stress Disorder from PTSD by symptom duration."
)
add_q(make_question(CHAPTER, "Trauma-Related Disorders", "What is the critical diagnostic temporal distinction between Acute Stress Disorder and Post-Traumatic Stress Disorder (PTSD)?", opts, c, s, 87))

# Q88: Flat Affect vs Inappropriate Affect in Schizophrenia
opts, c, s = rotate_options(
    "Flat affect is the severe reduction in emotional expression (monotone voice, blank face), while inappropriate affect is displaying emotions unsuited to the situation (e.g. laughing at news of death)",
    ["Flat affect is laughing; inappropriate affect is crying silently", "Flat affect occurs only in mania; inappropriate affect occurs only in depression", "Both terms describe types of persecutory delusions regarding government agencies"],
    "D",
    "In schizophrenia: Flat affect refers to an almost complete absence of emotional expression (face remains immobile, voice monotone); Inappropriate affect refers to emotional responses that clash bizarrely with the context (e.g., laughing happily while describing a tragic accident).\nHence, Option {{CORR}} is correct.",
    "Contrasts flat affect with inappropriate affect."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "In the emotional psychopathology of schizophrenia, how are 'flat affect' and 'inappropriate affect' distinguished?", opts, c, s, 88))

# Q89: Neurodevelopmental Disorders Definition
opts, c, s = rotate_options(
    "Disabilities associated primarily with the functioning of the neurological system and brain that manifest early in development, typically before school entry",
    ["Psychological conditions that only develop after retirement at age 65", "Acute infections of the gastrointestinal system caused by contaminated water", "Temporary states of fatigue resulting from intense physical sports training"],
    "A",
    "Neurodevelopmental disorders (such as ADHD, Autism, Intellectual Disability, Specific Learning Disorders) are a group of conditions with onset in the developmental period, producing impairments of personal, social, academic, or occupational functioning.\nHence, Option {{CORR}} is correct.",
    "Defines neurodevelopmental disorders."
)
add_q(make_question(CHAPTER, "Neurodevelopmental Disorders", "What characterizes 'neurodevelopmental disorders' as a distinct diagnostic class?", opts, c, s, 89))

# Q90: Somatoform / Somatic Symptom Secondary Gain
opts, c, s = rotate_options(
    "Interpersonal benefits derived from being sick, such as receiving sympathy, attention, or being excused from unpleasant duties and responsibilities",
    ["Receiving a university academic gold medal for scholarly research", "Winning a financial lottery ticket at a municipal bank", "Earning an Olympic gold medal in swimming competitions"],
    "B",
    "Secondary gain refers to the interpersonal or social advantages an individual accrues from being sick (such as extra attention, emotional sympathy, release from onerous work or household obligations), which unconsciously reinforces somatic symptoms.\nHence, Option {{CORR}} is correct.",
    "Defines secondary gain in somatic symptom disorders."
)
add_q(make_question(CHAPTER, "Somatic Symptom Disorders", "In psychodynamic and behavioural formulations of Somatic Symptom Disorders, what does 'secondary gain' refer to?", opts, c, s, 90))

# Q91: Physical vs Psychological Dependence
opts, c, s = rotate_options(
    "Physical dependence involves biological tolerance and painful withdrawal symptoms upon cessation, while psychological dependence involves an intense emotional craving to use the drug",
    ["Physical dependence is purely mental, while psychological dependence is bodily", "Physical dependence only occurs with coffee, while psychological dependence occurs with water", "Both terms refer exclusively to tobacco cigarette smoking"],
    "C",
    "Physical dependence is a physiological state of neuroadaptation manifested by tolerance and physical withdrawal syndrome upon stopping the drug; psychological dependence is a subjective compulsion and emotional craving to experience the drug's effects.\nHence, Option {{CORR}} is correct.",
    "Distinguishes physical dependence from psychological dependence."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "How does 'physical dependence' on a psychoactive drug differ from 'psychological dependence'?", opts, c, s, 91))

# Q92: Korsakoff's Syndrome Confabulation
opts, c, s = rotate_options(
    "Inventing fabricated, plausible stories to fill in gaps in memory without any conscious intent to deceive",
    ["Deliberately lying to police officers to escape criminal prosecution", "Recalling vivid memories of a past life during hypnotic regression", "Reciting long classical poems from memory in front of an audience"],
    "D",
    "In alcohol-induced Korsakoff's syndrome, patients exhibit 'confabulation': creating fabricated, imaginary accounts to fill in severe memory gaps, genuinely believing their fabricated stories to be true without any conscious intention to lie.\nHence, Option {{CORR}} is correct.",
    "Defines confabulation in Korsakoff's syndrome."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "In alcohol-induced Korsakoff's syndrome, what does the cognitive symptom of 'confabulation' involve?", opts, c, s, 92))

# Q93: Cultural Relativity of Abnormality
opts, c, s = rotate_options(
    "Behaviours considered abnormal in one culture may be accepted as normal, sacred, or adaptive in another cultural context",
    ["All cultures worldwide have identical legal definitions of abnormal behavior", "Abnormal behavior is purely genetic and never influenced by cultural norms", "Cultural values have zero relevance to psychological diagnosis"],
    "A",
    "The cultural-relativist perspective emphasizes that definitions of abnormality are deeply embedded within cultural norms; what is considered pathological in an urban Western culture (e.g. trance states) may be socially revered in traditional tribal cultures.\nHence, Option {{CORR}} is correct.",
    "Explains cultural relativity in psychopathology."
)
add_q(make_question(CHAPTER, "Concepts of Abnormality", "What is the core insight provided by the 'cultural-relativist perspective' on psychological disorders?", opts, c, s, 93))

# Q94: Statement on DSM-5 Evolution
add_q(make_statement_question(
    CHAPTER, "Classification of Disorders",
    "DSM-5 removed the multiaxial classification system and integrated disorders into a unified developmental and dimensional framework.",
    "In DSM-5, Obsessive-Compulsive Disorder is classified as a specific phobia under Anxiety Disorders.",
    3, "C",
    "Statement I is correct: DSM-5 discontinued the multiaxial system used in DSM-IV-TR. Statement II is incorrect: In DSM-5, Obsessive-Compulsive Disorder was removed from Anxiety Disorders and placed into its own distinct diagnostic chapter ('Obsessive-Compulsive and Related Disorders').",
    "Evaluates modern DSM-5 organizational changes."
))

# Q95: Somatic Symptom Disorder vs Illness Anxiety Disorder
opts, c, s = rotate_options(
    "In Somatic Symptom Disorder prominent distressing bodily symptoms are physically present; in Illness Anxiety Disorder somatic symptoms are absent or minimal, and anxiety focuses on having a disease",
    ["Somatic Symptom Disorder involves hallucinations, while Illness Anxiety involves amnesia", "Somatic Symptom Disorder occurs only in children, while Illness Anxiety occurs only in adults", "Both disorders are identical with zero diagnostic distinction in modern manuals"],
    "A",
    "The critical distinction: In Somatic Symptom Disorder, the patient has actual, distressing somatic symptoms (pain, fatigue) around which excessive worry revolves; in Illness Anxiety Disorder, physical symptoms are minimal or absent, and the person's primary distress is the cognitive terror of having a deadly undiagnosed disease.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Somatic Symptom Disorder from Illness Anxiety Disorder."
)
add_q(make_question(CHAPTER, "Somatic Symptom Disorders", "What is the key clinical distinction between Somatic Symptom Disorder and Illness Anxiety Disorder?", opts, c, s, 95))

# Q96: Panic Disorder with Agoraphobia
opts, c, s = rotate_options(
    "Experiencing recurrent unexpected panic attacks and consequently developing fear and avoidance of places from which escape might be difficult",
    ["Experiencing sudden limb paralysis followed by casual emotional indifference", "Preoccupation with imagining that one's facial nose is grossly disfigured", "Pulling out hair from eyebrows whenever studying for school examinations"],
    "B",
    "Panic Disorder frequently leads to Agoraphobia: after experiencing sudden, terrifying panic attacks in public places (e.g. subways, shopping malls), the individual begins fearing and avoiding those environments to escape future attacks.\nHence, Option {{CORR}} is correct.",
    "Explains the co-occurrence of Panic Disorder and Agoraphobia."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "How does Agoraphobia frequently develop as a complication of Panic Disorder?", opts, c, s, 96))

# Q97: Neurotransmitter Implicated in Anxiety Disorders (GABA)
opts, c, s = rotate_options(
    "Gamma-Aminobutyric Acid (GABA), the major inhibitory neurotransmitter in the brain that reduces neural excitability",
    ["Melatonin, which induces skin pigmentation during sunbathing", "Insulin, which metabolizes carbohydrates in the pancreas", "Hemoglobin, which carries oxygen through cardiovascular capillaries"],
    "C",
    "GABA (Gamma-Aminobutyric Acid) is the brain's primary inhibitory neurotransmitter; deficiencies in GABA receptors or hypoactive GABAergic signaling lead to excessive neuronal excitability, contributing directly to anxiety and panic states.\nHence, Option {{CORR}} is correct.",
    "Identifies GABA as the key inhibitory neurotransmitter in anxiety."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "Which neurotransmitter system, serving as the brain's primary inhibitory regulator of neuronal firing, is heavily implicated in anxiety disorders?", opts, c, s, 97))

# Q98: Major Depressive Disorder Cognitive Distortions
opts, c, s = rotate_options(
    "Catastrophizing, Overgeneralization, Black-and-white thinking, and Selective abstraction",
    ["Divergent creativity, Fluency, Flexibility, and Elaboration", "Arousal, Attention, Simultaneous processing, and Successive processing", "Sensory registration, Short-term rehearsal, and Long-term retrieval"],
    "D",
    "Aaron Beck identified cognitive distortions characteristic of depression: Overgeneralization (drawing sweeping negative conclusions from a single event), Black-and-white thinking (all-or-none evaluations), and Selective abstraction (focusing exclusively on negative details).\nHence, Option {{CORR}} is correct.",
    "Lists Beck's cognitive distortions in depression."
)
add_q(make_question(CHAPTER, "Depressive Disorders", "In Aaron Beck's cognitive model of depression, which systematic cognitive distortions consistently bias the patient's thinking?", opts, c, s, 98))

# Q99: Catatonic Excitement
opts, c, s = rotate_options(
    "Purposeless, uncontrolled, frenzied, and excessive motor activity that is completely uninfluenced by external stimuli",
    ["A quiet peaceful state where the patient sits motionless for twelve hours", "An intense craving to eat large quantities of chocolate cake", "A physical loss of sensation in both arms and hands"],
    "A",
    "Catatonic excitement is the opposite extreme of catatonic stupor; it involves intense, frenzied, purposeless, and erratic motor activity, where the patient paces uncontrollably, shouts, or flails limbs, posing risks of exhaustion or self-injury.\nHence, Option {{CORR}} is correct.",
    "Defines catatonic excitement."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "What characterizes 'catatonic excitement' in schizophrenia?", opts, c, s, 99))

# Q100: Persistent Depressive Disorder (Dysthymia) Duration in Children
opts, c, s = rotate_options(
    "At least one year in children and adolescents, compared to two years in adults",
    ["At least ten years in children and adolescents, compared to one year in adults", "At least twenty-four hours in children, compared to twenty-four hours in adults", "Dysthymia can never be diagnosed in children under any circumstances"],
    "B",
    "In diagnostic manuals (DSM-5), Persistent Depressive Disorder (Dysthymia) requires a minimum duration of 2 years in adults, but only 1 year in children and adolescents, where mood can be irritable rather than depressed.\nHence, Option {{CORR}} is correct.",
    "Identifies duration criteria for dysthymia in children vs adults."
)
add_q(make_question(CHAPTER, "Depressive Disorders", "What is the minimum duration required to diagnose Persistent Depressive Disorder (Dysthymia) in children and adolescents?", opts, c, s, 100))

# Q101: Substance Withdrawal - Alcohol
opts, c, s = rotate_options(
    "Autonomic hyperactivity (sweating, fast pulse), hand tremors, insomnia, nausea, transient hallucinations, anxiety, and psychomotor agitation",
    ["Immediate deep peaceful sleep lasting seventy-two hours", "Complete loss of hearing and total loss of physical taste", "Excessive growth of hair and rapid drop in body weight"],
    "C",
    "Alcohol withdrawal syndrome is marked by compensatory autonomic hyperactivity (tachycardia, diaphoresis, hypertension), gross tremors ('shakes'), severe insomnia, nausea, psychomotor agitation, and in severe cases seizures or delirium tremens.\nHence, Option {{CORR}} is correct.",
    "Lists clinical symptoms of alcohol withdrawal."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "Which constellation of symptoms characterizes the clinical syndrome of alcohol withdrawal in physically dependent individuals?", opts, c, s, 101))

# Q102: Substance Dependence vs Substance Abuse
opts, c, s = rotate_options(
    "Dependence involves physiological tolerance and withdrawal, whereas abuse involves recurrent adverse consequences (legal, occupational, interpersonal) without physical tolerance",
    ["Dependence only involves smoking tobacco, while abuse only involves drinking water", "Dependence only affects adolescents, while abuse only affects elderly people", "Both concepts are identical synonyms with zero pharmacological difference"],
    "D",
    "Historically and conceptually: Substance abuse involves recurrent maladaptive use resulting in functional failure, hazardous situations, or legal problems; Substance dependence involves biological neuroadaptation characterized by tolerance, withdrawal, and compulsive craving.\nHence, Option {{CORR}} is correct.",
    "Distinguishes substance dependence from substance abuse."
)
add_q(make_question(CHAPTER, "Substance-Related Disorders", "Historically, how was 'substance dependence' clinically distinguished from 'substance abuse'?", opts, c, s, 102))

# Q103: Agoraphobia Etymology and Origin
opts, c, s = rotate_options(
    "Derived from Greek 'agora' meaning marketplace; literally 'fear of the marketplace' or public open gathering places",
    ["Derived from Latin 'aqua' meaning water; literally fear of swimming pools", "Derived from Greek 'arachne' meaning spider; literally fear of arachnids", "Derived from Sanskrit 'agni' meaning fire; literally fear of flame"],
    "A",
    "The word Agoraphobia is derived from the Greek 'agora' (marketplace or public assembly place) and 'phobos' (fear), reflecting the fundamental dread of open, crowded public gathering areas.\nHence, Option {{CORR}} is correct.",
    "Identifies etymology of the term agoraphobia."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "The term 'Agoraphobia' originates etymologically from the Greek word 'agora', which refers to:", opts, c, s, 103))

# Q104: Separation Anxiety Disorder in Adults
opts, c, s = rotate_options(
    "Excessive anxiety concerning separation from spouses, children, or romantic partners, fearing catastrophic harm to them when separated",
    ["An obsessive urge to discard all household furniture on the street", "A psychotic delusion that one's spouse has been replaced by an alien impostor", "A sudden loss of speech following an argument with an employer"],
    "B",
    "Although commonly recognized in childhood, Separation Anxiety Disorder can also be diagnosed in adults in DSM-5, manifesting as disabling anxiety, panic, and distress when separated from spouses or children.\nHence, Option {{CORR}} is correct.",
    "Identifies adult manifestation of Separation Anxiety Disorder."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "How does Separation Anxiety Disorder manifest when diagnosed in adult populations in DSM-5?", opts, c, s, 104))

# Q105: Assertion-Reason on Diathesis-Stress in Schizophrenia
add_q(make_assertion_question(
    CHAPTER, "Schizophrenia Spectrum",
    "An individual carrying genetic susceptibility for schizophrenia may never develop the disorder if raised in a supportive, low-stress environment.",
    "The Diathesis-Stress model demonstrates that environmental stressors are necessary to trigger genetic vulnerabilities into clinical psychopathology.",
    1, "A",
    "Both (A) and (R) are true, and (R) is the correct explanation of (A). The Diathesis-Stress model proves that carrying a genetic predisposition (diathesis) is not alone sufficient to produce schizophrenia; environmental protective factors can buffer against its phenotypic expression, whereas severe stressors trigger it.",
    "Validates the Diathesis-Stress model applied to schizophrenia."
))

# Q106: Biological Marker of Anorexia Nervosa: Lanugo
opts, c, s = rotate_options(
    "Fine, downy soft hair growing on the face, arms, and back as the starved body attempts to conserve body heat",
    ["Excessive growth of dense fingernails and toenails", "Rapid development of multiple permanent dental teeth", "Skin turning bright yellow due to liver failure"],
    "C",
    "In severe Anorexia Nervosa, when subcutaneous fat reserves are depleted, the body develops 'lanugo'—fine, soft, downy hair across the limbs, face, and trunk—as a desperate physiological adaptation to insulate against hypothermia.\nHence, Option {{CORR}} is correct.",
    "Explains the physiological symptom of lanugo in Anorexia Nervosa."
)
add_q(make_question(CHAPTER, "Feeding and Eating Disorders", "In severe cases of Anorexia Nervosa, what does the physiological development of 'lanugo' represent?", opts, c, s, 106))

# Q107: Compensatory Behaviours in Bulimia Nervosa
opts, c, s = rotate_options(
    "Self-induced vomiting, abuse of laxatives, enemas, diuretics, severe fasting, or excessive compulsive exercise",
    ["Singing classical songs loudly in private rooms after meals", "Studying algebra textbooks for two hours after dinner", "Taking a warm bath and reading romantic literature"],
    "D",
    "In Bulimia Nervosa, compensatory behaviors are inappropriate actions undertaken to prevent weight gain following a binge: purging (vomiting, laxatives, diuretics) and non-purging methods (extreme fasting, compulsive exercise).\nHence, Option {{CORR}} is correct.",
    "Lists compensatory behaviors in Bulimia Nervosa."
)
add_q(make_question(CHAPTER, "Feeding and Eating Disorders", "Which compensatory mechanisms are characteristically employed by individuals diagnosed with Bulimia Nervosa to counteract binges?", opts, c, s, 107))

# Q108: Childhood Feeding Disorder: Pica
opts, c, s = rotate_options(
    "Persistent eating of non-nutritive, non-food substances such as dirt, clay, paint flakes, chalk, or plaster",
    ["Eating excessive quantities of fresh green vegetables and fruits", "Refusing to drink cow's milk due to lactose intolerance", "Eating large quantities of chocolate during stressful exams"],
    "A",
    "Pica is an eating disorder characterized by the persistent ingestion of non-nutritive, non-food substances (dirt, paint, plaster, hair, clay) for at least one month, developmentally inappropriate and culturally unapproved.\nHence, Option {{CORR}} is correct.",
    "Defines the childhood disorder Pica."
)
add_q(make_question(CHAPTER, "Feeding and Eating Disorders", "What is 'Pica' in childhood feeding and eating disorders?", opts, c, s, 108))

# Q109: Childhood Disorder: Enuresis vs Encopresis
opts, c, s = rotate_options(
    "Enuresis is involuntary or intentional repeated voiding of urine into bed or clothes; Encopresis is repeated passage of feces into inappropriate places",
    ["Enuresis is sleepwalking; Encopresis is sleeptalking", "Enuresis is reading difficulty; Encopresis is writing difficulty", "Both terms describe types of childhood stuttering"],
    "B",
    "Elimination disorders in childhood: Enuresis refers to repeated urination into bed or clothing (typically involuntary, after age 5); Encopresis refers to repeated defecation into inappropriate places (after age 4).\nHence, Option {{CORR}} is correct.",
    "Distinguishes Enuresis from Encopresis."
)
add_q(make_question(CHAPTER, "Childhood and Developmental Disorders", "In childhood elimination disorders, how are 'Enuresis' and 'Encopresis' clinically distinguished?", opts, c, s, 109))

# Q110: Tic Disorders: Tourette's Disorder
opts, c, s = rotate_options(
    "Characterized by multiple motor tics and at least one vocal tic persisting for more than a year, with onset before age 18",
    ["Involuntary loss of autobiographical identity following traumatic stress", "Severe panic attacks occurring strictly during deep non-REM sleep", "A severe phobic fear of entering open plazas or traveling alone"],
    "C",
    "Tourette's Disorder is a neurodevelopmental motor disorder characterized by the presence of both multiple motor tics (e.g. eye blinking, shoulder shrugging) and at least one vocal tic (grunts, throat clearing, coprolalia) persisting over 1 year.\nHence, Option {{CORR}} is correct.",
    "Defines Tourette's Disorder."
)
add_q(make_question(CHAPTER, "Childhood and Developmental Disorders", "What clinical criteria define 'Tourette's Disorder' in child and adolescent psychopathology?", opts, c, s, 110))

# Q111: Schizoaffective Disorder
opts, c, s = rotate_options(
    "A clinical condition where prominent psychotic symptoms of schizophrenia coexist alongside major mood episodes (major depression or mania)",
    ["A mild personality trait marked by unusual artistic creativity", "A physical loss of sensation in both arms caused by emotional stress", "A severe eating disorder marked by refusal to eat solid food"],
    "D",
    "Schizoaffective Disorder is diagnosed when an individual displays concurrent symptoms of schizophrenia (hallucinations, delusions) alongside a major depressive or manic mood episode, with delusions/hallucinations occurring for at least 2 weeks in the absence of a major mood episode.\nHence, Option {{CORR}} is correct.",
    "Defines Schizoaffective Disorder."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "What constitutes 'Schizoaffective Disorder'?", opts, c, s, 111))

# Q112: Delusional Disorder
opts, c, s = rotate_options(
    "The presence of one or more non-bizarre or bizarre delusions persisting for at least one month, without the other cardinal symptoms of schizophrenia (no hallucinations or disorganized speech)",
    ["Alternating episodes of severe manic excitement and deep unipolar depression", "Loss of physical motor movement in both legs with la belle indifférence", "Severe deficits in social communication combined with repetitive hand flapping"],
    "A",
    "Delusional Disorder is characterized by the presence of firm delusions (persecutory, jealous, erotomanic, somatic) lasting at least one month, where general functioning is not markedly impaired and behavior is not bizarre apart from the delusion.\nHence, Option {{CORR}} is correct.",
    "Defines Delusional Disorder."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "What distinguishes 'Delusional Disorder' from Schizophrenia?", opts, c, s, 112))

# Q113: Somatic Delusions
opts, c, s = rotate_options(
    "The false, unshakeable conviction that one's body is grossly diseased, rotting, infected with parasites, or physically misshapen, despite medical refutation",
    ["Believing that secret agents are tapping telephone calls in the apartment", "Believing that one has been appointed supreme political leader of the globe", "Hearing voices commanding the individual to wash hands sixty times"],
    "B",
    "Somatic delusions involve unshakeable false beliefs regarding bodily functioning or appearance (e.g. believing one's internal organs are rotting or that insects are crawling inside one's liver), which are psychotic in nature and impervious to medical proof.\nHence, Option {{CORR}} is correct.",
    "Defines somatic delusions."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "A psychotic patient insists that his stomach has completely dissolved into acid and his internal organs have rotted away. This exemplifies:", opts, c, s, 113))

# Q114: Erotomanic Delusions
opts, c, s = rotate_options(
    "The false, fixed belief that another person, usually someone of higher social status or celebrity, is deeply in love with the individual",
    ["The false belief that one is completely penniless and facing starvation", "The false belief that one has died and does not exist physically", "The false belief that family members are attempting to poison one's food"],
    "C",
    "In erotomanic delusions, the central theme is that another person (often a famous celebrity, politician, or superior) is secretly and passionately in love with the patient, interpreting innocuous media actions as coded declarations of love.\nHence, Option {{CORR}} is correct.",
    "Defines erotomanic delusions."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "When an individual firmly believes that a famous cinema celebrity is secretly in love with them and sending covert signals through television, which delusion is present?", opts, c, s, 114))

# Q115: Dissociative Identity Disorder 'Host' vs 'Alters'
opts, c, s = rotate_options(
    "The 'host' is the primary legal personality carrying the person's real name; 'alters' are the alternative identities with distinct ages, genders, and memories",
    ["The 'host' is a computer program; 'alters' are physical wires inside the brain", "The 'host' is an external therapist; 'alters' are family members attending therapy", "Both terms describe types of physical bone fractures caused by accidents"],
    "D",
    "In Dissociative Identity Disorder, the 'host personality' is usually the dominant, original identity seeking treatment, while the 'alters' (or sub-personalities) are distinct identity states possessing their own personal history, name, tone of voice, and psychological characteristics.\nHence, Option {{CORR}} is correct.",
    "Differentiates the host personality from alters in DID."
)
add_q(make_question(CHAPTER, "Dissociative Disorders", "In clinical descriptions of Dissociative Identity Disorder (DID), how are the 'host' and 'alters' differentiated?", opts, c, s, 115))

# Q116: Statement on Bulimia and Weight
add_q(make_statement_question(
    CHAPTER, "Feeding and Eating Disorders",
    "Individuals with Anorexia Nervosa are dangerously underweight and refuse to maintain minimally normal weight.",
    "Individuals with Bulimia Nervosa typically maintain a normal or slightly above-normal body weight.",
    1, "A",
    "Both statements are correct. A key clinical difference between the two eating disorders is that anorexic individuals are severely emaciated (significantly low body weight), whereas bulimic individuals typically fluctuate within a normal or slightly overweight BMI range.",
    "Contrasts weight profiles of Anorexia and Bulimia Nervosa."
))

# Q117: Neurotransmitters in Schizophrenia: Glutamate and Serotonin
opts, c, s = rotate_options(
    "In addition to dopamine hyperactivity, hypoactive NMDA glutamate receptors and serotonin dysregulation contribute to schizophrenic psychopathology",
    ["Schizophrenia is caused solely by excessive vitamin C in blood plasma", "Schizophrenia is caused by low insulin resulting from pancreas removal", "Schizophrenia involves zero neurochemical or brain alterations"],
    "B",
    "While dopamine hyperactivity at D2 receptors is central, modern neurobiology demonstrates that hypoactive NMDA glutamate receptors and serotonergic dysregulation play critical roles in the cognitive and negative symptoms of schizophrenia.\nHence, Option {{CORR}} is correct.",
    "Explains glutamate and serotonin involvement in schizophrenia."
)
add_q(make_question(CHAPTER, "Schizophrenia Spectrum", "Beyond the classic dopamine hypothesis, which other neurotransmitter systems are implicated in schizophrenia?", opts, c, s, 117))

# Q118: Panic Disorder Cognitive Model (David Clark)
opts, c, s = rotate_options(
    "Catastrophic misinterpretation of normal bodily sensations (e.g. interpreting a harmless heartbeat acceleration as an impending fatal heart attack)",
    ["Subconscious repression of sexual Oedipal desires during early infancy", "Conditioned salivary reflexes learned through Pavlovian bell ringing", "A genetic inability to understand mathematical multiplication tables"],
    "C",
    "David Clark's cognitive model of Panic Disorder demonstrates that panic attacks are triggered when individuals catastrophically misinterpret benign autonomic bodily sensations (palpitations, dizziness) as signs of imminent medical catastrophe (heart attack, insanity, death).\nHence, Option {{CORR}} is correct.",
    "Explains the cognitive model of panic attacks."
)
add_q(make_question(CHAPTER, "Anxiety Disorders", "According to David Clark's cognitive model, panic attacks develop and escalate primarily due to:", opts, c, s, 118))

# Q119: Obsessive-Compulsive Disorder Neurobiology
opts, c, s = rotate_options(
    "Hyperactivity in the cortico-striato-thalamo-cortical (CSTC) circuit (orbitofrontal cortex, caudate nucleus, and thalamus) and serotonin dysregulation",
    ["Severe damage to the occipital visual retina causing blindness", "Complete physical degeneration of the vocal cord larynx muscles", "Inability of bone marrow to synthesize red blood cells"],
    "D",
    "Neuroimaging and neurochemical studies link OCD to hyperactive metabolic looping within the cortico-striato-thalamo-cortical (CSTC) circuit (connecting the orbitofrontal cortex, basal ganglia/caudate nucleus, and thalamus) alongside serotonin dysfunction.\nHence, Option {{CORR}} is correct.",
    "Identifies CSTC circuit and serotonin in OCD neurobiology."
)
add_q(make_question(CHAPTER, "Obsessive-Compulsive Disorder", "Which neuroanatomical circuit and neurotransmitter system are most strongly implicated in the neurobiology of OCD?", opts, c, s, 119))

# Q120: Comprehensive Psychopathology Synthesis
opts, c, s = rotate_options(
    "Psychological disorders are complex multidimensional conditions requiring bio-psycho-social assessment and evidence-based clinical interventions",
    ["Psychological disorders are imaginary pretenses that should be punished with imprisonment", "Psychological disorders can be cured 100% by reading horoscopes and palmistry", "Psychological disorders are caused exclusively by cold weather in winter months"],
    "A",
    "Modern scientific psychopathology affirms that psychological disorders represent multi-determined conditions resulting from dynamic interactions between biological vulnerabilities, psychological processes, and sociocultural contexts, demanding comprehensive, compassionate clinical care.\nHence, Option {{CORR}} is correct.",
    "Synthesizes modern biopsychosocial psychopathology."
)
add_q(make_question(CHAPTER, "Concepts of Abnormality", "What represents the consensus view of modern clinical psychology regarding the nature of psychological disorders?", opts, c, s, 120))

# Validate and dump
assert len(unit4_qs) == 120, f"Expected 120 questions for Unit 4, got {len(unit4_qs)}"
os.makedirs("mock/psy_units", exist_ok=True)
out_path = "mock/psy_units/unit4.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(unit4_qs, f, indent=2, ensure_ascii=False)

print(f"Successfully generated and saved all 120 questions for Unit 4 to {out_path}!")

