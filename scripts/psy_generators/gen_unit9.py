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
unit9_seen = set()
unit9_qs = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in unit9_seen:
        raise ValueError(f"Duplicate in Unit 9: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in Unit 9: {q['questionText'][:80]}")
    unit9_seen.add(norm)
    assert len(q["options"]) == 4, f"Options length error: {q['questionText'][:40]}"
    assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option: {q['questionText'][:40]}"
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"], f"Missing solution: {q['questionText'][:40]}"
    unit9_qs.append(q)

CHAPTER = "Developing Psychological Skills"

# --- PART 1: GENERAL SKILLS, OBSERVATION & COMMUNICATION (Q1 - Q20) ---

# Q1: Broad Categories of Psychological Skills
opts, c, s = rotate_options(
    "General skills (intellectual, personal, and sensitivity to diversity) and Specific skills (communication, interviewing, testing, and counselling)",
    ["Surgical skills, pharmaceutical skills, and veterinary skills", "Athletic skills, culinary skills, and musical skills", "Financial accounting skills, taxation skills, and auditing skills"],
    "A",
    "NCERT categorizes psychological skills into: (1) General skills (essential for all psychologists: intellectual competence, self-awareness, and sensitivity to sociocultural diversity), and (2) Specific skills (core applied competencies: communication, psychological testing, interviewing, and counselling).\nHence, Option {{CORR}} is correct.",
    "Lists the broad categories of psychological skills."
)
add_q(make_question(CHAPTER, "Developing Psychological Skills", "How does NCERT categorize the foundational skills required by professional psychologists?", opts, c, s, 1))

# Q2: Sensitivity to Diversity
opts, c, s = rotate_options(
    "Understanding, respecting, and appreciating individual differences arising from culture, gender, caste, socioeconomic status, and religion without imposing personal biases",
    ["Demanding that all clients speak identical languages and wear uniform clothing", "Insisting that Western psychological norms apply universally without modification", "Refusing to provide psychological assistance to individuals from foreign backgrounds"],
    "B",
    "Sensitivity to diversity requires psychologists to cultivate genuine respect for differences in culture, gender, religion, ethnicity, and economic background, ensuring interventions are culturally sensitive and free of ethnocentric prejudice.\nHence, Option {{CORR}} is correct.",
    "Defines sensitivity to diversity in psychological practice."
)
add_q(make_question(CHAPTER, "Developing Psychological Skills", "What does 'Sensitivity to Diversity' require of a professional psychologist?", opts, c, s, 2))

# Q3: Scientific vs Casual Day-to-Day Observation
opts, c, s = rotate_options(
    "Scientific observation is systematic, purposeful, objective, guided by specific hypotheses, and recorded accurately using standardized protocols",
    ["Scientific observation relies purely on casual gut feelings and personal rumors", "Casual day-to-day observation is mathematically superior to scientific protocols", "Scientific observation is always conducted by blindfolded researchers"],
    "C",
    "Casual observation is spontaneous, subjective, unrecorded, and prone to memory distortions. In contrast, scientific observation is deliberate, systematic, planned, objective, recorded meticulously, and subject to reliability checks.\nHence, Option {{CORR}} is correct.",
    "Contrasts scientific observation with casual observation."
)
add_q(make_question(CHAPTER, "Observational Skills", "What fundamental characteristic distinguishes 'Scientific Observation' from casual day-to-day observation?", opts, c, s, 3))

# Q4: Naturalistic vs Participant Observation
opts, c, s = rotate_options(
    "Naturalistic observation records behavior in its natural setting without researcher interference; Participant observation involves the observer actively joining the group being studied",
    ["Naturalistic observation is done in chemistry labs; Participant observation is done in forests", "Naturalistic observation is illegal; Participant observation is mandatory", "Both terms describe identical laboratory experiments with zero difference"],
    "D",
    "In Naturalistic Observation, the psychologist observes subjects unobtrusively in real-life environments without intervening. In Participant Observation, the psychologist actively immerses themselves into the group or community being studied to gain an insider's perspective.\nHence, Option {{CORR}} is correct.",
    "Distinguishes naturalistic from participant observation."
)
add_q(make_question(CHAPTER, "Observational Skills", "How do 'Naturalistic Observation' and 'Participant Observation' differ in psychological research?", opts, c, s, 4))

# Q5: Observer Bias and Reactivity (Hawthorne Effect)
opts, c, s = rotate_options(
    "Observer bias occurs when researcher expectations distort observations; Reactivity occurs when participants alter behavior because they know they are being observed",
    ["Observer bias occurs in subjects; Reactivity occurs exclusively in microscopes", "Reactivity cures mental illness; Observer bias enhances mathematical IQ", "Both terms describe physical chemical reactions in neurological synapses"],
    "A",
    "In observational methodology: Observer Bias occurs when the researcher's preconceptions influence what is seen or recorded; Reactivity (Hawthorne Effect) occurs when awareness of being watched alters the natural behavior of participants.\nHence, Option {{CORR}} is correct.",
    "Defines observer bias and reactivity."
)
add_q(make_question(CHAPTER, "Observational Skills", "In psychological observation, how are 'Observer Bias' and 'Participant Reactivity' (Hawthorne Effect) differentiated?", opts, c, s, 5))

# Q6: The Communication Process Components
opts, c, s = rotate_options(
    "Sender (encoding), Message, Channel (medium), Receiver (decoding), Feedback, and Noise",
    ["Sattva, Rajas, Tamas, Ahankara, Manas, and Buddhi", "Oral, Anal, Phallic, Latency, and Genital stages", "Sensory, Short-term, Working, Long-term, and Semantic memory"],
    "B",
    "The linear/transactional communication model consists of: Sender (encodes thought into symbols), Message (verbal/nonverbal content), Channel (vehicle of transmission), Receiver (decodes message into meaning), Feedback (response back to sender), and Noise (interference).\nHence, Option {{CORR}} is correct.",
    "Lists components of the communication process."
)
add_q(make_question(CHAPTER, "Communication Skills", "Which set represents the essential components of the human 'Communication Process'?", opts, c, s, 6))

# Q7: Levels of Communication: Intrapersonal, Interpersonal, and Public
opts, c, s = rotate_options(
    "Intrapersonal: communicating with oneself (internal monologue); Interpersonal: between two or more people; Public: addressing a large gathering",
    ["Intrapersonal: speaking to dogs; Interpersonal: speaking to cats; Public: speaking to birds", "Intrapersonal: shouting; Interpersonal: whispering; Public: writing emails", "Intrapersonal: illegal; Interpersonal: commercial; Public: mandatory"],
    "C",
    "Communication occurs across distinct levels: Intrapersonal (internal dialogue, self-reflection), Interpersonal (direct interaction between two individuals or small groups), and Public communication (transmitting a message to a large live audience).\nHence, Option {{CORR}} is correct.",
    "Distinguishes intrapersonal, interpersonal, and public communication."
)
add_q(make_question(CHAPTER, "Communication Skills", "How are 'Intrapersonal', 'Interpersonal', and 'Public' levels of communication differentiated?", opts, c, s, 7))

# Q8: Hearing vs Listening: Active Listening
opts, c, s = rotate_options(
    "Hearing is an involuntary biological auditory sensation; Listening is an active, voluntary psychological process requiring attention, interpretation, and meaning-making",
    ["Hearing requires conscious mental effort; Listening is an automatic physical ear reflex", "Hearing occurs only while sleeping; Listening occurs only while running", "Both terms are completely identical physiological acoustic reflexes"],
    "D",
    "Hearing is the passive biological reception of sound waves by the eardrum; Listening is an active, cognitive, and intentional psychological process involving focused attention, comprehension, emotional appraisal, and thoughtful response.\nHence, Option {{CORR}} is correct.",
    "Contrasts hearing with active listening."
)
add_q(make_question(CHAPTER, "Communication Skills", "In the psychology of communication, what is the crucial distinction between 'Hearing' and 'Listening'?", opts, c, s, 8))

# Q9: Four Stages of Active Listening
add_q(make_sequence_question(
    CHAPTER, "Communication Skills",
    "Arrange the four sequential stages of Active Listening in their correct chronological order:",
    [
        ("A", "Receiving (attending to verbal messages and visual non-verbal cues)"),
        ("B", "Understanding (decoding and interpreting the speaker's meaning)"),
        ("C", "Evaluating (analyzing, assessing evidence, and distinguishing fact from opinion)"),
        ("D", "Responding (providing verbal and non-verbal feedback to confirm comprehension)")
    ],
    "A, B, C, D",
    "A",
    "The 4 stages of active listening proceed sequentially: (1) Receiving (sensory intake of words and body language), (2) Understanding (comprehending the message's true intent), (3) Evaluating (judging context and distinguishing feelings from facts), and (4) Responding (giving clear, constructive feedback).",
    "Sequences the four stages of active listening."
))

# Q10: Paraphrasing in Active Listening
opts, c, s = rotate_options(
    "Restating the speaker's core thoughts and emotional essence in the listener's own words to ensure accurate mutual comprehension",
    ["Repeating the client's exact words like a mechanical tape recorder", "Interrupting the speaker to deliver personal advice and life stories", "Criticizing the grammatical pronunciation used by the speaker"],
    "B",
    "Paraphrasing is a cornerstone active listening skill where the listener expresses the speaker's ideas and underlying feelings in their own concise words, proving attentiveness and verifying that the message was correctly understood without distortion.\nHence, Option {{CORR}} is correct.",
    "Defines paraphrasing in active listening."
)
add_q(make_question(CHAPTER, "Communication Skills", "What is the primary function of 'Paraphrasing' during active interpersonal communication?", opts, c, s, 10))

# Q11: Non-Verbal Communication: Kinesics (Body Language)
opts, c, s = rotate_options(
    "The study of communication conveyed through bodily movements, posture, gestures, eye contact, and facial expressions",
    ["The physical measurement of speed and kinetic energy of moving automobiles", "The surgical medical examination of human skeletal bone fractures", "The study of foreign spoken languages and ancient written scripts"],
    "C",
    "Kinesics refers to the communication of meaning through bodily gestures, postures, facial expressions, eye movements (oculesics), and physical head tilts, providing vital emotional context that complements or contradicts verbal messages.\nHence, Option {{CORR}} is correct.",
    "Defines kinesics in non-verbal communication."
)
add_q(make_question(CHAPTER, "Communication Skills", "In non-verbal communication, what does 'Kinesics' encompass?", opts, c, s, 11))

# Q12: Non-Verbal Communication: Paralanguage
opts, c, s = rotate_options(
    "Vocal cues accompanying spoken words, including pitch, tone, volume, speech tempo, rhythm, and hesitation pauses",
    ["Physical printed signboards displayed on commercial highways", "Sign language used exclusively by hearing-impaired communities", "A foreign dialect spoken in isolated geographical island valleys"],
    "D",
    "Paralanguage (vocalics) refers to how something is said rather than what is said: vocal characteristics such as pitch, volume, modulation, rate of speech, sighs, and strategic pauses that reveal emotional states and unspoken attitudes.\nHence, Option {{CORR}} is correct.",
    "Defines paralanguage in non-verbal communication."
)
add_q(make_question(CHAPTER, "Communication Skills", "What is meant by 'Paralanguage' in non-verbal communicative interaction?", opts, c, s, 12))

# Q13: Match Non-Verbal Communication Modalities
add_q(make_match_question(
    CHAPTER, "Communication Skills",
    "Match List I (Modality) with List II (Communicative Manifestation):",
    [("A", "Kinesics"), ("B", "Proxemics"), ("C", "Paralanguage"), ("D", "Haptics")],
    [("I", "Maintaining physical interpersonal distance during a formal interview"), ("II", "Vocal tone, pitch inflections, speech rate, and hesitation pauses"), ("III", "Facial expressions, eye contact, head nods, and hand gestures"), ("IV", "Communicating empathy through a comforting pat on the shoulder or handshake")],
    "A-III, B-I, C-II, D-IV", "A",
    "Kinesics: facial expressions and body gestures (A-III); Proxemics: interpersonal physical distance (B-I); Paralanguage: vocal pitch and rate (C-II); Haptics: communication via physical touch (D-IV).",
    "Matches non-verbal communication modalities to manifestations."
))

# Q14: Psychological Testing: Standardized Administration
opts, c, s = rotate_options(
    "Following strictly uniform testing procedures, instructions, time limits, and environmental conditions to ensure objective and comparable results",
    ["Allowing each participant to choose their own personal time limits and answer keys", "Giving test answers to participants in advance to boost their self-esteem", "Administering tests in noisy street markets without standardized scoring"],
    "B",
    "Standardization in psychological testing mandates that the test administration, physical testing environment, explicit instructions, time constraints, and scoring rubrics are identical for all examinees, ensuring objective reliability and valid norm comparison.\nHence, Option {{CORR}} is correct.",
    "Defines standardized administration in psychological testing."
)
add_q(make_question(CHAPTER, "Psychological Testing Skills", "What does 'Standardized Administration' require when conducting psychological assessments?", opts, c, s, 14))

# Q15: Ethics in Psychological Testing: Informed Consent
opts, c, s = rotate_options(
    "Informing the client about the test's purpose, procedures, potential risks, and data usage, allowing them to participate voluntarily without coercion",
    ["Forcing participants to take tests under threat of judicial imprisonment", "Secretly administering psychological personality tests without the person's knowledge", "Publishing client test scores on public commercial internet websites"],
    "C",
    "Informed consent is a foundational ethical requirement: the test-taker must be thoroughly briefed regarding the nature, purpose, intended use of results, and limits of confidentiality, granting voluntary written permission before testing begins.\nHence, Option {{CORR}} is correct.",
    "Defines informed consent in psychological testing."
)
add_q(make_question(CHAPTER, "Psychological Testing Skills", "What is the primary objective of obtaining 'Informed Consent' prior to psychological testing?", opts, c, s, 15))

# Q16: Ethics in Psychological Testing: Confidentiality and Its Limits
opts, c, s = rotate_options(
    "Safeguarding test results and client disclosures from unauthorized disclosure, except in mandated cases of imminent physical harm to self or others",
    ["Sharing client test results with commercial marketing advertisers for cash", "Confidentiality can never be breached under any circumstance, even during active murder", "Displaying client diagnostic profiles on office waiting room bulletin boards"],
    "D",
    "Psychologists are bound to maintain strict confidentiality regarding all assessment data; however, legal and ethical codes specify clear exceptions (duty to warn/protect): when a client presents clear, imminent danger of suicide, homicide, or child/elder abuse.\nHence, Option {{CORR}} is correct.",
    "Explains confidentiality and its legal/ethical limits."
)
add_q(make_question(CHAPTER, "Psychological Testing Skills", "What is the ethical rule regarding 'Confidentiality' of psychological test data, and under what rare condition may it be breached?", opts, c, s, 16))

# Q17: Interviewing: Structured vs Unstructured Interviews
opts, c, s = rotate_options(
    "Structured interviews use a predetermined set of identical questions in a fixed order; Unstructured interviews allow flexible, open-ended exploration guided by client responses",
    ["Structured interviews are conducted online; Unstructured interviews are conducted outdoors", "Structured interviews are illegal; Unstructured interviews are mandatory in courts", "Both types follow identical rigid standardized computer scripts"],
    "A",
    "In a structured interview, questions and sequences are standardized in advance, providing high reliability and easy comparability; in an unstructured interview, the interviewer follows a broad agenda with flexible, conversational questions allowing deep personalized probing.\nHence, Option {{CORR}} is correct.",
    "Distinguishes structured from unstructured interviews."
)
add_q(make_question(CHAPTER, "Interviewing Skills", "How do psychologists differentiate between 'Structured' and 'Unstructured' interviews?", opts, c, s, 17))

# Q18: Types of Interview Questions: Open vs Closed-Ended
opts, c, s = rotate_options(
    "Open-ended questions encourage elaborate, narrative personal responses (e.g. 'How did that feel?'); Closed-ended questions elicit brief, specific factual answers (e.g. 'Yes/No')",
    ["Open-ended questions are whispered; Closed-ended questions are shouted", "Open-ended questions are multiple-choice; Closed-ended questions are essays", "Both question types produce identical one-word answers"],
    "B",
    "Open-ended questions give the interviewee freedom to describe thoughts and feelings expansively ('Tell me about your relationship with your siblings'); Closed-ended questions restrict responses to specific facts, ratings, or yes/no choices ('Are you currently employed?').\nHence, Option {{CORR}} is correct.",
    "Distinguishes open-ended from closed-ended interview questions."
)
add_q(make_question(CHAPTER, "Interviewing Skills", "What is the diagnostic difference between 'Open-Ended' and 'Closed-Ended' interview questions?", opts, c, s, 18))

# Q19: Leading vs Mirror Questions in Interviewing
opts, c, s = rotate_options(
    "Leading questions suggest or bias the expected answer (e.g. 'You were angry, weren't you?'); Mirror questions reflect the interviewee's prior response to prompt further elaboration",
    ["Leading questions are spoken in French; Mirror questions are spoken in English", "Mirror questions are asked in front of glass mirrors; Leading questions are asked in dark rooms", "Both types are strictly forbidden in all psychological interviews"],
    "C",
    "A leading question guides or pressures the respondent toward a particular answer, potentially introducing bias. A mirror (reflective) question non-judgmentally feeds back the client's own key phrases to stimulate deeper reflection ('So you felt completely ignored by your colleagues?').\nHence, Option {{CORR}} is correct.",
    "Distinguishes leading from mirror questions."
)
add_q(make_question(CHAPTER, "Interviewing Skills", "In clinical interviewing, how are 'Leading Questions' and 'Mirror Questions' differentiated?", opts, c, s, 19))

# Q20: Three Sequential Stages of an Interview
add_q(make_sequence_question(
    CHAPTER, "Interviewing Skills",
    "Arrange the three sequential stages of a professional psychological interview in their correct chronological order:",
    [
        ("A", "Opening Stage (establishing rapport, creating a comfortable climate, explaining purpose and ground rules)"),
        ("B", "Body of the Interview (asking substantive diagnostic questions, exploring issues systematically)"),
        ("C", "Closing Stage (summarizing key points, answering client questions, outlining next steps, and ending gracefully)")
    ],
    "A, B, C",
    "A",
    "A structured interview proceeds through 3 phases: (1) Opening Stage (rapport building, defining objectives and confidentiality), (2) Body of Interview (substantive information gathering, exploring client concerns), and (3) Closing Stage (summarizing, agreeing on next steps, concluding warmly).",
    "Sequences the three stages of an interview."
))

# --- PART 2: COUNSELLING SKILLS, ROGERS' CORE CONDITIONS & ETHICS (Q21 - Q40) ---

# Q21: Definition of Counselling
opts, c, s = rotate_options(
    "A professional, collaborative helping relationship designed to facilitate personal growth, emotional healing, self-understanding, and effective problem-solving",
    ["Giving unsolicited moral lectures and commanding clients to obey cultural rules", "Prescribing heavy pharmaceutical psychiatric medications to all patients", "Conducting surgical operations to repair damaged neurological tissues"],
    "B",
    "Counselling is a structured, purposeful helping relationship where a trained professional uses psychological principles to empower clients to explore feelings, achieve greater self-awareness, cope with adversity, and make constructive life choices.\nHence, Option {{CORR}} is correct.",
    "Defines counselling."
)
add_q(make_question(CHAPTER, "Counselling Skills", "How is 'Counselling' formally defined in applied clinical psychology?", opts, c, s, 21))

# Q22: Counselling vs Giving Advice
opts, c, s = rotate_options(
    "Counselling empowers the client to discover their own solutions and autonomy; Advice-giving imposes the counselor's personal opinions and fosters client dependency",
    ["Counselling is giving advice very quickly; Advice is giving counselling very slowly", "Counselling is free of charge; Advice always costs thousands of dollars", "Both terms are identical synonyms with zero operational distinction"],
    "C",
    "Professional counselling is non-prescriptive: instead of dispensing advice ('You should quit your job'), the counsellor helps the client clarify their own values, explore alternatives, and make autonomous decisions, avoiding debilitating dependency.\nHence, Option {{CORR}} is correct.",
    "Distinguishes counselling from giving advice."
)
add_q(make_question(CHAPTER, "Counselling Skills", "What fundamental principle separates professional 'Counselling' from mere informal 'Advice-Giving'?", opts, c, s, 22))

# Q23: Carl Rogers' Three Core Conditions for Therapeutic Change
opts, c, s = rotate_options(
    "Empathy, Unconditional Positive Regard, and Congruence (Genuineness)",
    ["Reward, Punishment, and Extinction", "Hypnosis, Free Association, and Dream Analysis", "Sattva, Rajas, and Tamas"],
    "D",
    "Carl Rogers established that the essential and sufficient conditions for therapeutic personality growth are: (1) Empathy (experiencing client's world from within), (2) Unconditional Positive Regard (non-judgmental acceptance), and (3) Congruence/Genuineness (authenticity without a professional facade).\nHence, Option {{CORR}} is correct.",
    "Identifies Rogers' three core therapeutic conditions."
)
add_q(make_question(CHAPTER, "Counselling Skills", "According to Carl Rogers' Person-Centred Therapy, which three core conditions are essential for constructive psychological growth?", opts, c, s, 23))

# Q24: Empathy vs Sympathy: The Essential Distinction
opts, c, s = rotate_options(
    "Empathy is understanding and experiencing the client's internal world 'as if' it were one's own; Sympathy is feeling sorry or pity for the client from an external perspective",
    ["Empathy is pity; Sympathy is understanding", "Empathy occurs in hospitals; Sympathy occurs in schools", "Both terms mean identical things with zero psychological difference"],
    "A",
    "Empathy entails intellectual and emotional perspective-taking ('feeling with' the client, grasping their private emotional reality while retaining objective boundaries); Sympathy entails feeling compassion, pity, or sadness ('feeling sorry for' the client), which maintains emotional distance.\nHence, Option {{CORR}} is correct.",
    "Distinguishes empathy from sympathy."
)
add_q(make_question(CHAPTER, "Counselling Skills", "In the training of psychological counselors, what is the crucial distinction between 'Empathy' and 'Sympathy'?", opts, c, s, 24))

# Q25: Unconditional Positive Regard (Rogers)
opts, c, s = rotate_options(
    "Accepting, valuing, and respecting the client as a fellow human being without any judgment, evaluation, or preconditions",
    ["Constantly praising and complimenting the client regardless of what they say", "Agreeing with all illegal or harmful actions committed by the client", "Giving clients expensive gifts to demonstrate unconditional affection"],
    "B",
    "Unconditional Positive Regard (UPR) is total, non-evaluative acceptance of the client's worth as a person, communicating that their feelings and thoughts are accepted without judgment or moralizing, creating a safe climate for vulnerability.\nHence, Option {{CORR}} is correct.",
    "Defines Unconditional Positive Regard."
)
add_q(make_question(CHAPTER, "Counselling Skills", "What does Carl Rogers mean by providing 'Unconditional Positive Regard' (UPR)?", opts, c, s, 25))

# Q26: Congruence (Genuineness / Authenticity) in Counselling
opts, c, s = rotate_options(
    "The counselor is authentic, real, transparent, and honest, matching their inner feelings with outward professional communication without hiding behind a facade",
    ["The counselor pretends to know the answers to all medical and scientific questions", "The counselor speaks only in complex psychoanalytic clinical jargon", "The counselor shares all intimate personal marital secrets with every client"],
    "C",
    "Congruence (genuineness) means the therapist is integrated, sincere, and fully present in the relationship, whose verbal and non-verbal communications accurately reflect their internal psychological reality rather than maintaining a stiff, detached clinical mask.\nHence, Option {{CORR}} is correct.",
    "Defines congruence/genuineness in counselling."
)
add_q(make_question(CHAPTER, "Counselling Skills", "In Person-Centred counselling, what characterizes the condition of 'Congruence' (or Genuineness)?", opts, c, s, 26))

# Q27: Match Rogers' Core Therapeutic Conditions
add_q(make_match_question(
    CHAPTER, "Counselling Skills",
    "Match List I (Rogers' Therapeutic Condition) with List II (Clinical Expression):",
    [("A", "Empathy"), ("B", "Unconditional Positive Regard"), ("C", "Congruence"), ("D", "Paraphrasing")],
    [("I", "Accepting the client's personal experiences without disapproval or moral judgment"), ("II", "Communicating an authentic, genuine human presence without clinical pretense"), ("III", "Restating the client's expressed feelings in concise words to confirm understanding"), ("IV", "Grasping the client's subjective emotional frame of reference 'as if' it were one's own")],
    "A-IV, B-I, C-II, D-III", "A",
    "Empathy: grasping subjective world 'as if' one's own (A-IV); Unconditional Positive Regard: non-judgmental acceptance (B-I); Congruence: authentic presence without pretense (C-II); Paraphrasing: restating feelings in concise words (D-III).",
    "Matches Rogers' core conditions to clinical expressions."
))

# Q28: Reflection of Feelings in Counselling
opts, c, s = rotate_options(
    "Identifying and explicitly verbalizing the underlying emotions and affective states expressed by the client during dialogue",
    ["Looking into a physical glass mirror while speaking to the client", "Telling the client that their emotional reactions are completely irrational", "Ignoring emotions and focusing strictly on mathematical dates"],
    "D",
    "Reflection of feelings is a core counselling microskill where the therapist mirrors the client's implicit or explicit emotional experience ('It sounds like you felt deeply betrayed when your trust was broken'), fostering deeper emotional awareness.\nHence, Option {{CORR}} is correct.",
    "Defines reflection of feelings in counselling."
)
add_q(make_question(CHAPTER, "Counselling Skills", "What is 'Reflection of Feelings' as practiced by skilled psychological counselors?", opts, c, s, 28))

# Q29: Ethical Principles in Psychological Practice: Beneficence and Non-Maleficence
opts, c, s = rotate_options(
    "Beneficence means actively promoting the client's welfare; Non-maleficence means doing no harm and preventing injury to the client",
    ["Beneficence means charging high financial fees; Non-maleficence means avoiding taxes", "Beneficence applies only to doctors; Non-maleficence applies only to police officers", "Both terms mean identical things with zero conceptual distinction"],
    "A",
    "Beneficence commands the psychologist to strive to benefit those with whom they work and protect client welfare; Non-maleficence ('primum non nocere') obligates the psychologist to take care to do no harm, avoiding exploitation and injury.\nHence, Option {{CORR}} is correct.",
    "Defines beneficence and non-maleficence in ethics."
)
add_q(make_question(CHAPTER, "Ethics in Psychology", "In professional psychological ethics, what do 'Beneficence' and 'Non-Maleficence' mandate?", opts, c, s, 29))

# Q30: Dual Relationships in Counselling Ethics
opts, c, s = rotate_options(
    "Entering into secondary business, romantic, or personal social relationships with a client, which impairs professional objectivity and risks exploitation",
    ["Providing counselling to identical twin brothers in the same university clinic", "Holding two academic degrees in psychology from two different universities", "Working as a psychologist during both morning hours and evening hours"],
    "B",
    "Dual (multiple) relationships occur when a psychologist enters into a professional role with someone and simultaneously enters into another relationship (e.g. business partner, romantic involvement, close friend), which severely breaches ethical boundaries and invites exploitation.\nHence, Option {{CORR}} is correct.",
    "Defines dual relationships in counselling ethics."
)
add_q(make_question(CHAPTER, "Ethics in Psychology", "Why are 'Dual Relationships' strictly avoided and prohibited in professional counselling ethics?", opts, c, s, 30))

# Q31: Statement: Empathy vs Active Listening
add_q(make_statement_question(
    CHAPTER, "Communication Skills",
    "Active listening requires the listener to suspend personal judgments, maintain eye contact, and provide constructive feedback.",
    "Empathy is an innate biological reflex that requires zero cognitive effort or specialized training.",
    3, "C",
    "Statement I is correct because active listening demands disciplined attention, suspension of judgment, and feedback mechanisms. Statement II is incorrect because professional empathy requires deliberate perspective-taking, emotional resonance, and sophisticated communication training.",
    "Contrasts active listening discipline with professional empathy."
))

# Q32: Assertion-Reason: Confidentiality and the Duty to Warn
add_q(make_assertion_question(
    CHAPTER, "Ethics in Psychology",
    "A clinical psychologist is legally and ethically justified in breaking client confidentiality when a client makes a credible threat of imminent murder against an identifiable victim (Tarasoff ruling).",
    "The ethical duty to protect human life and warn third parties from lethal danger supersedes the obligation of client confidentiality.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). The landmark Tarasoff ruling established the 'duty to protect': confidentiality is vital, but when a client poses an imminent physical threat of harm to an identifiable individual or themselves, public safety and preservation of life override confidentiality.",
    "Explains legal and ethical exceptions to confidentiality (Tarasoff principle)."
))

# Q33: Rapport Building in the Interview
opts, c, s = rotate_options(
    "Establishing a warm, accepting, and trusting psychological relationship where the client feels comfortable sharing sensitive information",
    ["Demanding that the client sign financial loan guarantees before speaking", "Administering a difficult intelligence test during the first two minutes", "Forcing the client to sit in complete darkness to evaluate pupil dilation"],
    "B",
    "Rapport is the harmonious, trusting, and respectful connection established between interviewer and client during the opening stage, dissolving apprehension and enabling authentic self-disclosure.\nHence, Option {{CORR}} is correct.",
    "Defines rapport building in psychological interviewing."
)
add_q(make_question(CHAPTER, "Interviewing Skills", "What is the primary objective of 'Rapport Building' during the opening stage of a psychological interview?", opts, c, s, 33))

# Q34: Probing Questions in Clinical Interviews
opts, c, s = rotate_options(
    "Follow-up questions designed to elicit deeper clarification, details, and context regarding an ambiguous or incomplete statement made by the client",
    ["Questions testing the client's knowledge of atomic physics and chemistry", "Aggressive accusatory questions designed to make the client confess to crimes", "Questions asking the client for financial loans to support the clinic"],
    "C",
    "Probing questions are open, exploratory prompts used to uncover richer context when a client's initial response is vague or superficial ('Can you tell me more about what you were thinking at that moment?').\nHence, Option {{CORR}} is correct.",
    "Defines probing questions in clinical interviewing."
)
add_q(make_question(CHAPTER, "Interviewing Skills", "What is the purpose of employing 'Probing Questions' during the substantive body of an interview?", opts, c, s, 34))

# Q35: Competence in Psychological Assessment
opts, c, s = rotate_options(
    "Psychologists must only administer, score, and interpret assessment tools for which they have received formal specialized training and supervised experience",
    ["Psychologists may administer any medical or surgical procedure they choose", "Any individual who reads a psychology magazine is certified to interpret projective tests", "Competence is determined strictly by the psychologist's physical body weight"],
    "D",
    "The ethical standard of Competence requires professionals to practice only within the boundaries of their education, training, supervised experience, and professional credentials, ensuring assessments are not misinterpreted by unqualified practitioners.\nHence, Option {{CORR}} is correct.",
    "Defines the ethical standard of professional competence."
)
add_q(make_question(CHAPTER, "Ethics in Psychology", "What is mandated by the ethical standard of 'Competence' in psychological assessment and practice?", opts, c, s, 35))

# Q36: Multi-statement: Rogers' Necessary Conditions for Growth
add_q(make_multi_statement_question(
    CHAPTER, "Counselling Skills",
    "Which of the following constitute the necessary and sufficient therapeutic conditions for client personality change according to Carl Rogers?",
    [
        ("A", "Two persons must be in psychological contact"),
        ("B", "The therapist must experience empathetic understanding of the client's internal frame of reference"),
        ("C", "The therapist must experience unconditional positive regard for the client"),
        ("D", "The therapist must be congruent, genuine, and integrated in the relationship")
    ],
    "(A), (B), (C) and (D)",
    ["(A) and (C) only", "(B) and (D) only", "(B), (C) and (D) only"],
    "A",
    "All four conditions are explicitly specified in Carl Rogers' 1957 paper on the necessary and sufficient conditions for therapeutic personality change: psychological contact, empathy, unconditional positive regard, and congruence.",
    "Identifies Rogers' comprehensive set of therapeutic conditions."
))

# Q37: The S.O.L.E.R. Framework for Attending Behaviour (Gerard Egan)
opts, c, s = rotate_options(
    "Squarely face the client, Open posture, Lean toward the client, Eye contact, and Relaxed demeanor",
    ["Speak loudly, Order tests, Listen rarely, Evaluate rapidly, and Reject dissent", "Sit backward, Observe silently, Laugh frequently, Enter notes, and Rest", "Stand upright, Overrule client, Lock doors, Exit room, and Return later"],
    "A",
    "Gerard Egan formulated the SOLER acronym for effective physical attending in counselling: S (Squarely face client), O (adopt an Open posture), L (Lean slightly forward), E (maintain appropriate Eye contact), and R (remain Relaxed and natural).\nHence, Option {{CORR}} is correct.",
    "Defines Egan's SOLER framework for non-verbal attending."
)
add_q(make_question(CHAPTER, "Counselling Skills", "What does Gerard Egan's well-known 'S.O.L.E.R.' framework prescribe for non-verbal attending behavior in counselling?", opts, c, s, 37))

# Q38: Autonomy in Counselling Ethics
opts, c, s = rotate_options(
    "Respecting the client's right to self-determination, personal freedom of choice, and independent decision-making",
    ["The psychologist deciding what career and marriage partner the client must choose", "Forcing the client to remain in psychological therapy for twenty years", "Publishing client decisions in municipal legal gazettes"],
    "B",
    "Autonomy affirms the client's moral right to make their own choices and direct their own destiny; the counselor facilitates clarity and self-insight but never coerces or dictates the client's life decisions.\nHence, Option {{CORR}} is correct.",
    "Defines client autonomy in counselling ethics."
)
add_q(make_question(CHAPTER, "Ethics in Psychology", "In psychological ethics, what is meant by respecting 'Client Autonomy'?", opts, c, s, 38))

# Q39: Assertion-Reason: Paraphrasing vs Evaluative Judgment
add_q(make_assertion_question(
    CHAPTER, "Communication Skills",
    "Effective counselors avoid inserting personal evaluative judgments or moral lectures when paraphrasing a client's narrative.",
    "Evaluative judgments trigger defensive resistance and self-censorship, eroding the therapeutic alliance and inhibiting client disclosure.",
    1, "A",
    "Both (A) and (R) are true, and (R) correctly explains (A). Paraphrasing must remain neutral and client-centered; passing moral judgments creates an evaluative atmosphere where the client feels condemned, shutting down open exploration.",
    "Explains why evaluative judgments destroy therapeutic communication."
))

# Q40: Developing Intellectual and Personal Skills
opts, c, s = rotate_options(
    "Cultivating critical thinking, self-awareness, personal emotional maturity, and the capacity to examine one's own unconscious biases",
    ["Memorizing telephone directories to achieve world records in memory", "Avoiding all reading of scientific peer-reviewed psychological literature", "Focusing strictly on accumulating personal monetary wealth"],
    "C",
    "NCERT concludes that becoming an effective psychologist requires rigorous cultivation of intellectual and personal skills: critical analytical thinking, deep self-awareness, emotional self-regulation, empathy, and constant reflection on personal biases.\nHence, Option {{CORR}} is correct.",
    "Summarizes the cultivation of intellectual and personal psychological skills."
)
add_q(make_question(CHAPTER, "Developing Psychological Skills", "What is essential for the holistic development of 'Intellectual and Personal Skills' in a budding psychologist?", opts, c, s, 40))

print(f"Total Unit 9 questions generated: {len(unit9_qs)}")
assert len(unit9_qs) == 40, f"Expected 40 questions, got {len(unit9_qs)}"

os.makedirs("mock/psy_units", exist_ok=True)
with open("mock/psy_units/unit9.json", "w", encoding="utf-8") as f:
    json.dump(unit9_qs, f, indent=2, ensure_ascii=False)
print("Saved mock/psy_units/unit9.json successfully!")
