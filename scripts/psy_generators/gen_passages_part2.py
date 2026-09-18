import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.psy_generators.common import (
    make_question, rotate_options, normalize_text, get_pyq_normalized_set
)

pyq_seen = get_pyq_normalized_set()
passages_seen = set()
part2_qs = []

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
    part2_qs.append(make_question(chapter, topic, full_q_text, opts, corr, sol))

# --- PASSAGE 21: Sternberg's Triarchic Theory & Practical Intelligence (M11, P1, Q41-45) ---
P21_TEXT = (
    "Rajesh, a 30-year-old entrepreneur, dropped out of formal schooling at age 16 after consistently scoring in the bottom quartile "
    "on standardized written academic examinations. However, upon entering the bustling wholesale textile market of Surat, Rajesh displayed "
    "exceptional acumen: he rapidly learned how to negotiate favorable credit terms with cautious suppliers, read unspoken micro-expressions "
    "of buyers to close deals, and adapted fluidly to unexpected shifts in market regulations. Within eight years, he built a multi-crore "
    "export business. When tested by an industrial psychologist, Rajesh scored an average IQ of 98 on traditional psychometric tests, "
    "yet demonstrated extraordinary tacit knowledge and practical problem-solving capability."
)

add_pq("Passage 21", P21_TEXT, "According to Robert Sternberg's Triarchic Theory of Intelligence, which dimension of intelligence is Rajesh predominantly exhibiting?",
    "Contextual / Practical Intelligence ('Street Smarts' and environmental adaptation)",
    ["Componential / Analytical Intelligence", "Experiential / Creative Intelligence", "Musical Intelligence"],
    "A", "Sternberg's Contextual (Practical) intelligence involves the ability to adapt, shape, and select real-world environments to achieve personal goals, often referred to as street smarts.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 21", P21_TEXT, "The informal, action-oriented procedural knowledge Rajesh acquired without direct formal instruction is termed by Sternberg as:",
    "Tacit Knowledge",
    ["Explicit Crystallized Knowledge", "Rote Semantic Association", "Projective Transference"],
    "B", "Tacit knowledge is knowledge that is practically learned through experience, action-oriented, and acquired without direct formal teaching or articulation.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 21", P21_TEXT, "Why did traditional standardized IQ tests fail to capture Rajesh's remarkable real-world entrepreneurial capabilities?",
    "Traditional psychometric tests measure primarily componential analytical ability and academic verbal reasoning rather than contextual practical intelligence",
    ["Standardized tests are biologically invalid for adults over 25", "Rajesh was suffering from acute sensory blindness during testing", "Entrepreneurial success is entirely determined by physical body height"],
    "C", "Traditional IQ tests assess analytical, academic, and linguistic competencies, neglecting practical, social, and contextual problem-solving skills required for real-world vocational success.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 21", P21_TEXT, "According to Sternberg, when Rajesh alters his business negotiation strategy to fit unexpected changes in government export laws, he is engaging in:",
    "Environmental Adaptation",
    ["Environmental Shaping", "Environmental Selection", "Cognitive Regression"],
    "D", "In Sternberg's triarchic framework, environmental adaptation occurs when an individual modifies their own internal behaviors or strategies to adjust successfully to prevailing environmental demands.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 21", P21_TEXT, "If Rajesh invents a novel, unprecedented algorithm to manufacture eco-friendly fabrics from organic waste, which intelligence would he be displaying?",
    "Experiential / Creative Intelligence",
    ["Contextual Intelligence", "Componential Intelligence", "Bodily-Kinesthetic Intelligence"],
    "A", "Experiential (Creative) intelligence involves the capacity to invent novel solutions, combine seemingly unrelated facts, and deal effectively with unprecedented novel situations.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

# --- PASSAGE 22: Carl Rogers: Self-Concept & Incongruence (M11, P2, Q46-50) ---
P22_TEXT = (
    "Shalini, a 20-year-old college student, was raised by perfectionist parents who offered affection and approval only when she scored "
    "the highest grades and pursued medical studies ('Conditions of Worth'). Deep within, Shalini possessed a profound passion for classical "
    "sculpting and painting, but viewed these desires as shameful and ungrateful. While studying biochemistry, she suffered from chronic low "
    "self-esteem, persistent anxiety, and emotional emptiness. Her therapist, practicing Person-Centred Therapy, noted that Shalini's "
    "'Real Self' (her genuine feelings, interests, and artistic inclinations) was vastly contradictory to her 'Ideal Self' (the dutiful, "
    "flawless doctor she believed she ought to be). This chronic discrepancy was causing severe psychological maladjustment."
)

add_pq("Passage 22", P22_TEXT, "According to Carl Rogers, the significant discrepancy between Shalini's 'Real Self' and 'Ideal Self' is termed:",
    "Incongruence",
    ["Cognitive Dissonance", "Pluralistic Ignorance", "Catatonic Stupor"],
    "B", "Carl Rogers described Incongruence as the gap or mismatch between an individual's real self (actual subjective experience) and ideal self (the self one feels one should be), which generates anxiety and neurosis.",
    "Self and Personality", "Humanistic Approach to Personality")

add_pq("Passage 22", P22_TEXT, "The conditional affection provided by Shalini's parents ('we love you only if you become a doctor') is defined by Rogers as:",
    "Conditions of Worth",
    ["Unconditional Positive Regard", "Operant Extinction", "Aversive Conditioning"],
    "C", "Conditions of worth are stipulations placed on an individual's value and love, teaching the person that they are acceptable only when they think, feel, or act in ways prescribed by significant others.",
    "Self and Personality", "Humanistic Approach to Personality")

add_pq("Passage 22", P22_TEXT, "According to Rogers, how can the therapist facilitate psychological harmony and congruence in Shalini?",
    "By providing Unconditional Positive Regard, empathy, and an accepting atmosphere free of evaluative conditions",
    ["By advising Shalini to abandon all art and study medicine 20 hours a day", "By administering electroconvulsive shock therapy to erase her artistic memories", "By providing monetary cash rewards for passing chemistry exams"],
    "D", "Rogers posited that experiencing unconditional positive regard and empathetic understanding in therapy enables the client to dismantle rigid conditions of worth, accept their genuine self, and restore congruence.",
    "Self and Personality", "Humanistic Approach to Personality")

add_pq("Passage 22", P22_TEXT, "When Shalini resolves her inner conflict, accepts her authentic artistic identity, and functions with openness to experience, Rogers characterizes her as a:",
    "Fully Functioning Person",
    ["Self-Actualized Bureaucrat", "Fixated Anal Personality", "Socially Loafing Individual"],
    "A", "Carl Rogers defined the 'Fully Functioning Person' as an individual who is congruent, open to experience, lives fully in the present moment, trusts their organismic feelings, and embraces personal growth.",
    "Self and Personality", "Humanistic Approach to Personality")

add_pq("Passage 22", P22_TEXT, "How does Rogers' view of human nature contrast fundamentally with Sigmund Freud's psychoanalytic perspective?",
    "Rogers views human nature as innately positive, forward-moving, and self-actualizing; Freud viewed human nature as driven by irrational unconscious sexual and aggressive instincts",
    ["Rogers believes humans are biological machines; Freud believed humans are spiritual deities", "Rogers views human nature as entirely evil; Freud viewed humans as angelic saints", "There is zero philosophical difference between the two theorists"],
    "B", "Humanistic psychology (Rogers, Maslow) holds an optimistic view of humans as inherently good with an innate drive toward growth and fulfillment, contrasting with Freud's pessimistic instinctual drive theory.",
    "Self and Personality", "Humanistic Approach to Personality")

# --- PASSAGE 23: Psychoneuroimmunology & Caregiver Stress (M12, P1, Q41-45) ---
P23_TEXT = (
    "A medical research institute conducted a clinical study investigating family caregivers of patients suffering from severe Alzheimer's disease. "
    "The caregivers had provided round-the-clock intensive assistance for over five years without external support. "
    "Blood assays revealed that caregivers exhibited chronically elevated levels of cortisol and adrenocorticotropic hormone (ACTH). "
    "Furthermore, their immunological profiles showed significant reductions in T-lymphocyte cell proliferation and Natural Killer (NK) cell "
    "cytotoxicity compared to age-matched non-caregiver controls. When administered standard influenza vaccinations, caregivers produced "
    "substantially lower antibody titers and took 40% longer to heal from standardized cutaneous punch-biopsy wounds."
)

add_pq("Passage 23", P23_TEXT, "The interdisciplinary scientific field examining how psychological stress interacts with the central nervous system and immune functioning is:",
    "Psychoneuroimmunology (PNI)",
    ["Psychoanalytic Phrenology", "Neurodevelopmental Sociometry", "Industrial ergonomics"],
    "C", "Psychoneuroimmunology (PNI) is the interdisciplinary field studying the complex interactions between psychological processes (stress, cognition, emotion), the nervous system, and the immune system.",
    "Meeting Life Challenges", "Stress and Health")

add_pq("Passage 23", P23_TEXT, "The biological mechanism responsible for suppressing the caregivers' T-cell and Natural Killer (NK) cell function is:",
    "Chronic hypersecretion of cortisol and glucocorticoids from the adrenal cortex via the HPA axis",
    ["Total physical destruction of red blood cell hemoglobin", "Complete cessation of cerebral spinal fluid flow", "Spontaneous mutation of biological auditory neurons"],
    "D", "Chronic activation of the Hypothalamic-Pituitary-Adrenal (HPA) axis results in sustained secretion of cortisol, which directly binds to glucocorticoid receptors on white blood cells, inhibiting T and NK cell activity.",
    "Meeting Life Challenges", "Stress and Health")

add_pq("Passage 23", P23_TEXT, "What is the primary physiological function of 'Natural Killer (NK) Cells' in the human immune system?",
    "Detecting and destroying viral-infected body cells and developing neoplastic tumor cells",
    ["Transporting dietary calcium minerals to skeletal leg bones", "Pumping oxygenated arterial blood through cardiac chambers", "Conducting motor electrical impulses to voluntary muscles"],
    "A", "Natural Killer (NK) cells are cytotoxic lymphocytes of the innate immune system that provide rapid defense against virus-infected cells and detect and eliminate nascent cancer/tumor cells.",
    "Meeting Life Challenges", "Stress and Health")

add_pq("Passage 23", P23_TEXT, "The caregivers' prolonged wound healing and low vaccination antibody titers demonstrate that chronic stress produces:",
    "Immunosuppression and heightened vulnerability to physical infectious diseases",
    ["Spontaneous biological super-immunity to all bacterial pathogens", "Instant physical regeneration of injured bodily tissues", "Complete physical immunity to cardiovascular disease"],
    "B", "Chronic stress suppresses both cellular and humoral immunity, resulting in slower wound epithelialization, blunted vaccine antibody responses, and heightened susceptibility to opportunistic infections.",
    "Meeting Life Challenges", "Stress and Health")

add_pq("Passage 23", P23_TEXT, "Which non-pharmacological support intervention would most directly alleviate caregiver allostatic load and restore immune resilience?",
    "Providing respite care assistance combined with mindfulness-based stress reduction and cognitive restructuring",
    ["Isolating the caregivers in locked hospital quarantine rooms", "Administering electroconvulsive shock therapy to eliminate all memories", "Forcing caregivers to perform 10 hours of heavy manual agricultural labor"],
    "C", "Respite care (temporary relief from caregiving duties) combined with social support networks, mindfulness meditation, and cognitive coping strategies effectively dampens HPA axis overactivity and enhances immune function.",
    "Meeting Life Challenges", "Stress Management Techniques")

# --- PASSAGE 24: Somatoform Disorders: Conversion & Glove Anesthesia (M12, P2, Q46-50) ---
P24_TEXT = (
    "Meenakshi, a 25-year-old concert pianist, was forced by her parents into an arranged marriage with an abusive partner. "
    "Two days before the scheduled wedding ceremony, she suddenly woke up with complete physical paralysis and total loss of sensation "
    "in her right hand and wrist, extending exactly up to the wrist crease in the shape of a glove ('Glove Anesthesia'). "
    "Neurologists noted that true sensory innervation of the hand is supplied by three distinct longitudinal nerve tracks (radial, median, and ulnar); "
    "hence, a sharp circular cutoff at the wrist is neuroanatomically impossible. Furthermore, despite losing her ability to play the piano "
    "on the eve of her wedding, Meenakshi appeared curiously unconcerned, calm, and serene about her severe handicap ('la belle indifférence')."
)

add_pq("Passage 24", P24_TEXT, "Meenakshi's sudden neurological motor and sensory loss without any organic neurological pathology meets the diagnostic criteria for:",
    "Conversion Disorder (Functional Neurological Symptom Disorder)",
    ["Illness Anxiety Disorder (Hypochondriasis)", "Obsessive-Compulsive Disorder", "Generalized Anxiety Disorder"],
    "D", "Conversion Disorder involves motor or sensory deficits (paralysis, blindness, anesthesia) that suggest a neurological condition but cannot be explained by any organic medical pathology, typically precipitated by acute stress.",
    "Psychological Disorders", "Somatic Symptom and Related Disorders")

add_pq("Passage 24", P24_TEXT, "The circular pattern of sensory loss ending abruptly at the wrist cuff demonstrates:",
    "Glove Anesthesia (a medically impossible sensory deficit based on a layperson's anatomical concept of a glove)",
    ["Genuine anatomical radial nerve transection", "Biological spinal cord infarction", "Diabetic peripheral polyneuropathy"],
    "A", "Glove anesthesia is classic evidence of psychogenic conversion: sensory loss covers the exact area a glove would cover, which violates real anatomical dermatome nerve pathways (radial, median, and ulnar distributions).",
    "Psychological Disorders", "Somatic Symptom and Related Disorders")

add_pq("Passage 24", P24_TEXT, "Meenakshi's paradoxical, serene lack of emotional distress regarding her sudden hand paralysis is known clinically as:",
    "La belle indifférence ('Beautiful Indifference')",
    ["Catatonic Stupor", "Avolition", "Pluralistic Ignorance"],
    "B", "La belle indifférence is a classic clinical feature observed in conversion disorder where the patient exhibits a calm, serene unconcern about the apparent severity of their physical disability.",
    "Psychological Disorders", "Somatic Symptom and Related Disorders")

add_pq("Passage 24", P24_TEXT, "In psychodynamic theory, Meenakshi's hand paralysis provides 'Primary Gain' because:",
    "It unconsciously shields her from the overwhelming anxiety of marrying the abusive partner by making the wedding impossible",
    ["It allows her to receive large monetary disability insurance checks", "It enables her to win international musical piano competitions", "It forces doctors to prescribe heavy antibiotic medications"],
    "C", "Primary gain in conversion disorder refers to the direct internal alleviation of intrapsychic conflict and anxiety: the symptom unconsciously prevents an unbearable action or resolves an intolerable dilemma.",
    "Psychological Disorders", "Somatic Symptom and Related Disorders")

add_pq("Passage 24", P24_TEXT, "How does Conversion Disorder differ fundamentally from 'Factitious Disorder' (or Malingering)?",
    "In Conversion Disorder, symptoms are genuinely experienced and not intentionally feigned; in Malingering/Factitious Disorder, symptoms are consciously faked",
    ["Conversion Disorder only occurs in animals; Malingering occurs in humans", "Conversion Disorder is treated with surgery; Malingering is treated with antibiotics", "There is zero clinical difference between the two terms"],
    "D", "Conversion symptoms are involuntary and genuinely experienced by the patient without conscious awareness or intentional deceit; malingering involves deliberate, conscious feigning of symptoms for external incentives.",
    "Psychological Disorders", "Somatic Symptom and Related Disorders")

# --- PASSAGE 25: Albert Ellis's REBT & Exam Anxiety (M13, P1, Q41-45) ---
P25_TEXT = (
    "Siddharth, a final-year engineering student, experienced severe debilitating exam panic. "
    "Whenever an examination approached, Siddharth repeated to himself: 'I must score 99 percentile. If I do not get the highest score, "
    "it will be an absolute catastrophe, and it proves that I am totally worthless as a human being.' "
    "During tests, his heart pounded, his hands trembled, and his mind went blank. "
    "He consulted a cognitive-behavioral therapist practicing Albert Ellis's Rational Emotive Behaviour Therapy (REBT). "
    "The therapist analyzed Siddharth's crisis using the ABCDE model: Activating event (A), Beliefs (B), Consequences (C), "
    "Disputing irrational beliefs (D), and Effective new philosophical outlook (E). "
    "The therapist vigorously challenged Siddharth's rigid 'musts' and 'shoulds' (musterbation) and catastrophizing (awfulizing)."
)

add_pq("Passage 25", P25_TEXT, "In Albert Ellis's REBT framework, what constitutes the true, primary cause of Siddharth's debilitating exam panic (Consequence - C)?",
    "His rigid, irrational belief system (B) that he 'must' score top marks and that failure makes him worthless",
    ["The physical written examination paper on the table (Activating Event - A)", "The ink color of the fountain pen he used", "The physical temperature recorded inside the examination hall"],
    "A", "Ellis emphasized that emotional consequences (C) are not caused directly by activating events (A), but by the irrational beliefs (B) people hold about those events ('A does not cause C; B causes C').",
    "Therapeutic Approaches", "Rational Emotive Behaviour Therapy")

add_pq("Passage 25", P25_TEXT, "Siddharth's cognitive conviction that 'I must score 99 percentile' is an example of what Ellis famously termed:",
    "Musterbation (demanding that reality must conform to one's rigid expectations)",
    ["Glove Anesthesia", "La belle indifférence", "Sublimation"],
    "B", "Ellis coined 'musterbation' to describe rigid, absolutist demands and dogmatic 'musts', 'shoulds', and 'oughts' that individuals impose on themselves, others, and the world.",
    "Therapeutic Approaches", "Rational Emotive Behaviour Therapy")

add_pq("Passage 25", P25_TEXT, "In the ABCDE framework, what occurs during stage 'D' (Disputation)?",
    "The therapist actively, logically, and empirically challenges the client's irrational beliefs and demands proof",
    ["The client is placed in a deep hypnotic trance to forget the exam", "The therapist delivers an electroconvulsive shock to eliminate panic", "The client is given monetary prizes for avoiding the exam"],
    "C", "Stage D (Disputing) is the core therapeutic intervention in REBT: the therapist vigorously questions, challenges, and debates the client's irrational premises ('Where is the evidence that you MUST score top marks?').",
    "Therapeutic Approaches", "Rational Emotive Behaviour Therapy")

add_pq("Passage 25", P25_TEXT, "What is the ultimate goal of stage 'E' (Effective New Philosophy) in REBT for Siddharth?",
    "Replacing rigid demands with flexible preferences ('I strongly desire top marks, but if I do not get them, it is disappointing, not catastrophic')",
    ["Believing that all engineering examinations are completely illegal", "Deciding to never take another examination for the rest of his life", "Developing an illusion of invulnerability and narcissism"],
    "D", "The desired outcome of REBT (Stage E) is acquiring an effective, flexible, and rational philosophy of life: shifting from absolutist demands ('I must') to realistic preferences ('I prefer to do well, but failure does not make me worthless').",
    "Therapeutic Approaches", "Rational Emotive Behaviour Therapy")

add_pq("Passage 25", P25_TEXT, "Siddharth's belief that failing an exam proves 'I am totally worthless' exemplifies which irrational thought pattern in REBT?",
    "Global Self-Rating / Self-Downing (rating one's entire worth based on a single performance)",
    ["Systematic Desensitization", "Aversive Conditioning", "Reaction Formation"],
    "A", "Global self-downing or self-rating is an irrational belief where an individual measures their entire human worth on the basis of a single failure, rather than evaluating only the specific performance.",
    "Therapeutic Approaches", "Rational Emotive Behaviour Therapy")

print(f"Passages Part 2 generated: {len(part2_qs)} questions across 5 passages (25 questions so far).")

# --- PASSAGE 26: Cognitive Dissonance in Pro-Environmental Action (M13, P2, Q46-50) ---
P26_TEXT = (
    "A university campus launched a 'Green Campus' sustainability initiative. "
    "A survey revealed that 95% of students held strongly positive attitudes toward environmental conservation. "
    "However, researchers observed that in the dining halls, students routinely discarded single-use plastic cutlery and soda cans into "
    "landfill waste bins rather than walking 20 feet to recycling receptacles. "
    "The environmental psychology department conducted an intervention: student volunteers who admitted to throwing plastic in trash bins "
    "were asked to sign a public, videotaped pledge advocating recycling to incoming freshmen. "
    "Upon realizing the stark contradiction between their public advocacy and their personal wasteful habits, the students experienced "
    "intense psychological discomfort (cognitive dissonance). Over the subsequent semester, their personal recycling rates surged to 88%."
)

add_pq("Passage 26", P26_TEXT, "The psychological tension experienced by students when their private behavior contradicted their public advocacy is known as:",
    "Cognitive Dissonance (Leon Festinger)",
    ["Pluralistic Ignorance", "Deindividuation", "Glove Anesthesia"],
    "B", "Leon Festinger's Cognitive Dissonance Theory posits that holding two contradictory cognitions, or acting contrary to an attitude, produces an uncomfortable state of psychological tension driving attitude or behavior change.",
    "Attitude and Social Cognition", "Attitude Change")

add_pq("Passage 26", P26_TEXT, "Why did the intervention prompt a dramatic surge in actual recycling behavior rather than a change in environmental beliefs?",
    "Because changing behavior to conform with deeply held pro-environmental values was the most direct route to eliminate dissonance",
    ["Because students were threatened with expulsion by university authorities", "Because students were given cash bonuses for every plastic fork recycled", "Because recycling is a biological reflex that cannot be consciously controlled"],
    "C", "When attitudes are central and socially approved, reducing cognitive dissonance is achieved most readily by bringing one's overt behavior into alignment with those attitudes.",
    "Attitude and Social Cognition", "Attitude Change")

add_pq("Passage 26", P26_TEXT, "In Festinger and Carlsmith's famous $1 vs $20 experiment, why did participants paid $1 experience higher dissonance than those paid $20?",
    "Participants paid $1 lacked sufficient external justification for lying, forcing an internal attitude change to resolve dissonance",
    ["Participants paid $1 became violently angry and attacked the experimenters", "Participants paid $20 loved the boring task because the pay was high", "Both groups experienced zero cognitive dissonance"],
    "D", "The $1 condition offered 'insufficient justification': participants could not explain away their lie for a trivial dollar, generating intense dissonance that compelled them to change their private evaluation of the task.",
    "Attitude and Social Cognition", "Attitude Change")

add_pq("Passage 26", P26_TEXT, "If a student who refused to recycle resolved dissonance by claiming 'one plastic fork makes zero difference to global warming', which strategy was used?",
    "Trivialization / Adding Consonant Cognitions to rationalize behavior",
    ["Incongruent Attitude Shift", "Systematic Desensitization", "Aversive Conditioning"],
    "A", "Individuals can resolve cognitive dissonance without changing behavior by minimizing the importance of the inconsistency (trivialization) or generating supportive rationalizations.",
    "Attitude and Social Cognition", "Attitude Change")

add_pq("Passage 26", P26_TEXT, "The initial discrepancy where students professed love for nature yet littered plastic illustrates which classic finding in social psychology?",
    "Attitude-Behavior Inconsistency (as documented by Richard LaPiere)",
    ["The Fundamental Attribution Error", "The Sleeper Effect", "The Ringelmann Effect"],
    "B", "Richard LaPiere's classic 1934 study demonstrated that verbally expressed attitudes do not consistently or automatically predict actual overt behavior in real-world settings.",
    "Attitude and Social Cognition", "Attitude-Behaviour Relationship")

# --- PASSAGE 27: Compliance Techniques in Blood Donation (M14, P1, Q41-45) ---
P27_TEXT = (
    "The Red Cross conducted an empirical test of sequential compliance techniques to recruit voluntary blood donors on a college campus. "
    "In Condition 1, organizers approached students asking them to wear a small 1-inch paper lapel pin promoting blood donation for a day (minor request). "
    "Almost 90% agreed. Two days later, organizers approached these same students asking them to donate a pint of blood (major target request); "
    "over 55% agreed to donate. In Condition 2, organizers began by asking students to commit to a rigorous 2-year weekly volunteer program "
    "at the hospital blood bank (an extreme request). When students predictably refused, organizers immediately scaled back to: "
    "'Well, if you cannot do that, would you at least donate a single unit of blood today?' Nearly 50% agreed. "
    "In Condition 3, students were told donation took only 15 minutes and gave a free movie ticket, but after agreeing, were informed the ticket "
    "was out of stock; yet over 40% still completed the donation."
)

add_pq("Passage 27", P27_TEXT, "The strategy used in Condition 1—securing agreement to a small lapel pin before requesting a blood donation—is known as:",
    "Foot-in-the-Door Technique (Jonathan Freedman & Scott Fraser)",
    ["Door-in-the-Face Technique", "Low-Ball Technique", "That's-Not-All Technique"],
    "C", "The Foot-in-the-Door technique secures agreement to a small, trivial favor first, which establishes a self-perception of helpfulness, making the individual far more compliant with a subsequent large target request.",
    "Social Influence and Group Processes", "Social Influence Processes")

add_pq("Passage 27", P27_TEXT, "The strategy in Condition 2—starting with an extreme volunteer request that is refused, followed by the moderate blood donation request—is:",
    "Door-in-the-Face Technique (Robert Cialdini)",
    ["Foot-in-the-Door Technique", "Low-Ball Technique", "Deindividuation"],
    "D", "The Door-in-the-Face technique begins with an extreme request sure to be rejected, followed by a concession to the smaller target request, triggering reciprocal concessions from the target.",
    "Social Influence and Group Processes", "Social Influence Processes")

add_pq("Passage 27", P27_TEXT, "What psychological mechanism drives the effectiveness of the Door-in-the-Face technique?",
    "The Norm of Reciprocal Concessions (the target feels obligated to make a concession when the requester scales down their demand)",
    ["Fear of criminal prosecution by police", "Hypnotic suggestion induced by the Red Cross logo", "Neurosurgical habituation of auditory nerves"],
    "A", "Robert Cialdini demonstrated that the Door-in-the-Face technique functions via the social norm of reciprocity: when the requester appears to make a concession by retreating from a large to a small demand, the target feels reciprocal pressure to concede.",
    "Social Influence and Group Processes", "Social Influence Processes")

add_pq("Passage 27", P27_TEXT, "The procedure in Condition 3—gaining commitment with an attractive movie ticket before revealing its unavailability—exemplifies:",
    "Low-Ball Technique (Robert Cialdini)",
    ["Foot-in-the-Door Technique", "Door-in-the-Face Technique", "That's-Not-All Technique"],
    "B", "The Low-Ball technique secures initial psychological commitment to an attractive proposal; even when terms worsen or hidden costs appear, individuals adhere to the decision due to post-decisional commitment.",
    "Social Influence and Group Processes", "Social Influence Processes")

add_pq("Passage 27", P27_TEXT, "How does Herbert Kelman classify the social influence operating when a student donates blood simply to receive social praise from peers?",
    "Compliance (external acquiescence without deep private value integration)",
    ["Internalization", "Identification", "Obedience"],
    "C", "Herbert Kelman defined Compliance as yielding to social influence solely to obtain positive external rewards or avoid disapproval, without genuine private acceptance.",
    "Social Influence and Group Processes", "Social Influence Processes")

# --- PASSAGE 28: Flood Disaster, Trauma & PFA (M14, P2, Q46-50) ---
P28_TEXT = (
    "A devastating monsoon flood breached river embankments in a low-lying agrarian district, submerging 40 villages within three hours. "
    "Over 10,000 residents lost their homes, livestock, and standing crops, and 45 casualties were reported. "
    "A team of disaster mental health professionals arrived during the rescue and rehabilitation phase. "
    "They observed widespread acute stress reactions: villagers were in daze, disoriented, hypervigilant to the sound of rain, and grieving. "
    "Many elderly survivors exhibited intense 'Survivor Guilt', asking why God spared them while their grandchildren drowned. "
    "The mental health team prioritized Psychological First Aid (PFA): establishing physical safety, distributing dry rations, "
    "reuniting separated families, providing non-intrusive emotional comfort, and actively avoiding premature forced catharsis."
)

add_pq("Passage 28", P28_TEXT, "The disoriented numbness, hypervigilance, and trauma responses exhibited by villagers immediately following the catastrophe are classified as:",
    "Acute Stress Reaction / Acute Stress Disorder (precursor to PTSD)",
    ["Schizophrenia, Disorganized Type", "Bipolar Manic Episode", "Generalized Amnesia"],
    "D", "Acute Stress Disorder encompasses intrusive memories, dissociative numbness, hyperarousal, and disorientation occurring within one month following exposure to an overwhelming traumatic event.",
    "Psychology and Life", "Natural Disasters")

add_pq("Passage 28", P28_TEXT, "The distressing psychological agony experienced by elderly survivors for having outlived their deceased grandchildren is termed:",
    "Survivor Guilt",
    ["Learned Helplessness", "Illusion of Invulnerability", "La belle indifférence"],
    "A", "Survivor guilt is a profound symptom of traumatic bereavement where individuals feel agonizing guilt and unworthiness for surviving a catastrophe that took the lives of others.",
    "Psychology and Life", "Natural Disasters")

add_pq("Passage 28", P28_TEXT, "What is the primary operational objective of 'Psychological First Aid' (PFA) in disaster zones?",
    "Providing practical humane care, ensuring physical safety, stabilizing emotions, and linking survivors to basic resources without psychological probing",
    ["Conducting deep psychoanalytic dream analysis on the flood banks", "Administering electroconvulsive therapy to all grieving villagers", "Forcing survivors to take standardized written mathematical IQ tests"],
    "B", "Psychological First Aid focuses on immediate humane assistance: ensuring safety, meeting basic physical needs, offering comfort, listening actively, and connecting survivors to support systems without forcing trauma narration.",
    "Psychology and Life", "Natural Disasters")

add_pq("Passage 28", P28_TEXT, "Why did the mental health team deliberately avoid 'forced psychological debriefing' (forcing survivors to recount graphic trauma details immediately)?",
    "Clinical research indicates that forced debriefing can retraumatize vulnerable survivors and interfere with natural psychological coping",
    ["Because talking about water in floods causes physical pneumonia", "Because psychological counseling is illegal during monsoons", "Because survivors preferred to play competitive sports"],
    "C", "Controlled clinical trials prove that mandatory or forced psychological debriefing immediately following trauma can disrupt natural resilience, elevate distress, and increase the risk of developing chronic PTSD.",
    "Psychology and Life", "Natural Disasters")

add_pq("Passage 28", P28_TEXT, "Which sequential phase of disaster response involves long-term trauma counseling, rebuilding destroyed housing, and economic livelihood restoration?",
    "Rehabilitation / Recovery Phase",
    ["Warning Phase", "Impact Phase", "Rescue Phase"],
    "D", "The disaster response trajectory concludes with the Rehabilitation/Recovery phase, which focuses on long-term infrastructure reconstruction, community empowerment, and mental health rehabilitation.",
    "Psychology and Life", "Natural Disasters")

# --- PASSAGE 29: Clinical Interviewing Skills & Bias (M15, P1, Q41-45) ---
P29_TEXT = (
    "Dr. Arvind, an experienced clinical psychologist, conducted a diagnostic evaluation of Rohini, an 18-year-old student referred for chronic fatigue. "
    "In the opening stage, Dr. Arvind greeted Rohini warmly, explained the assessment purpose, established ground rules, and built rapport. "
    "In the substantive body of the interview, he utilized open-ended questions: 'Tell me about how your daily routine has changed over the past three months.' "
    "When Rohini hesitated, he employed probing prompts: 'Can you describe what you were feeling when you woke up this morning?' "
    "Importantly, Dr. Arvind avoided leading questions such as 'You feel depressed because of your parents' divorce, don't you?' "
    "He observed non-verbal cues: Rohini avoided eye contact, spoke in a slow monotone (paralanguage), and displayed slouched posture (kinesics). "
    "In the closing stage, he summarized the key discussion points and outlined diagnostic next steps collaboratively."
)

add_pq("Passage 29", P29_TEXT, "Why did Dr. Arvind deliberately choose to ask 'Tell me about how your daily routine has changed...' rather than closed yes/no questions?",
    "Open-ended questions encourage the client to provide rich, narrative self-exploration and descriptive contextual information",
    ["Open-ended questions can be scored by computer optical scanning machines", "Open-ended questions are whispered while closed questions are shouted", "Open-ended questions take exactly two seconds to answer"],
    "A", "Open-ended questions provide freedom for the client to express thoughts and emotional context in their own words, uncovering authentic clinical detail that closed questions stifle.",
    "Developing Psychological Skills", "Interviewing Skills")

add_pq("Passage 29", P29_TEXT, "Why did Dr. Arvind strictly avoid asking leading questions like 'You feel depressed because of your parents' divorce, don't you?'",
    "Leading questions introduce interviewer bias, contaminate client responses, and pressure the client to agree with preconceived hypotheses",
    ["Leading questions are forbidden by civil corporate commercial law", "Leading questions can only be asked in French", "Leading questions cause immediate physical amnesia"],
    "B", "Leading questions lead or nudge the respondent toward a particular answer, potentially planting false memories or eliciting false agreement to satisfy interviewer expectations.",
    "Developing Psychological Skills", "Interviewing Skills")

add_pq("Passage 29", P29_TEXT, "Rohini's slow monotone voice, low volume, and frequent pauses are categorized within non-verbal communication as:",
    "Paralanguage (Vocalics)",
    ["Kinesics (Body Language)", "Proxemics (Spatial Distance)", "Haptics (Touch)"],
    "C", "Paralanguage refers to the vocal characteristics that accompany spoken communication: tone, pitch, volume, rate of speech, and pauses, which provide critical diagnostic clues to emotional state.",
    "Developing Psychological Skills", "Communication Skills")

add_pq("Passage 29", P29_TEXT, "What was the primary clinical purpose of Dr. Arvind's activities during the 'Opening Stage' of the interview?",
    "Establishing rapport, defining mutual expectations, ensuring confidentiality, and reducing client anxiety",
    ["Administering an electroconvulsive shock to evaluate brain activity", "Issuing a final legal prescription for psychiatric medications", "Concluding the session and demanding immediate financial payment"],
    "D", "The opening stage of an interview is dedicated to establishing rapport, clarifying objectives and boundaries of confidentiality, and creating a supportive emotional climate.",
    "Developing Psychological Skills", "Interviewing Skills")

add_pq("Passage 29", P29_TEXT, "When Dr. Arvind summarizes the main themes during the 'Closing Stage' and outlines next steps, what counselling skill is he demonstrating?",
    "Summarizing and Structuring",
    ["Free Association", "Systematic Desensitization", "Token Economy Reinforcement"],
    "A", "Summarizing ties together multiple conversational threads into an organized synthesis, verifying accurate understanding and setting a clear roadmap for subsequent sessions.",
    "Developing Psychological Skills", "Interviewing Skills")

# --- PASSAGE 30: Gardner's Multiple Intelligences in Education (M15, P2, Q46-50) ---
P30_TEXT = (
    "A progressive international academy redesigned its secondary school curriculum around Howard Gardner's Theory of Multiple Intelligences. "
    "Rather than defining intelligence solely through linguistic and logical-mathematical tests, the school recognized eight distinct intelligences. "
    "Student Tanvi excelled in classical Kathak dance and athletics, exhibiting extraordinary coordination and muscle memory (high Bodily-Kinesthetic intelligence). "
    "Her classmate Sameer composed symphonies and identified subtle changes in acoustic frequencies (high Musical intelligence). "
    "A third student, Farhan, had exceptional skill in mediating peer conflicts, reading group dynamics, and motivating others (high Interpersonal intelligence). "
    "The school's pedagogical philosophy asserted that each intelligence has its own developmental trajectory and biological neurological localization."
)

add_pq("Passage 30", P30_TEXT, "Howard Gardner's Theory of Multiple Intelligences posits that intelligence is:",
    "Composed of eight relatively autonomous, distinct cognitive modalities rather than a single general 'g' factor",
    ["A single unitary inherited biological trait measured entirely by IQ tests", "A collection of three physical sensory reflexes in the eye", "A mystical spiritual energy that cannot be scientifically assessed"],
    "B", "Gardner rejected Spearman's unitary 'g' factor, proposing that individuals possess at least eight distinct, independent intelligences operating as modular cognitive systems.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 30", P30_TEXT, "Tanvi's exceptional mastery over fine and gross motor movements, bodily rhythm, and dance exemplifies which Gardnerian intelligence?",
    "Bodily-Kinesthetic Intelligence",
    ["Spatial Intelligence", "Naturalistic Intelligence", "Intrapersonal Intelligence"],
    "C", "Bodily-Kinesthetic intelligence is the ability to use one's whole body or parts of the body (hands, limbs) with precision, coordination, and agility to solve problems or create products, as seen in dancers, athletes, and surgeons.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 30", P30_TEXT, "Farhan's acute sensitivity to other people's motives, feelings, and social dynamics reflects which intelligence?",
    "Interpersonal Intelligence",
    ["Intrapersonal Intelligence", "Linguistic Intelligence", "Logical-Mathematical Intelligence"],
    "D", "Interpersonal intelligence is the capacity to understand, perceive, and respond effectively to the moods, motivations, temperaments, and desires of other people.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 30", P30_TEXT, "In contrast to Farhan, an individual with high 'Intrapersonal Intelligence' would characteristically demonstrate:",
    "Deep self-awareness, understanding of one's own complex emotions, strengths, vulnerabilities, and existential purpose",
    ["Superior ability to win track and field athletic sprints", "The capacity to design high-rise concrete skyscrapers", "The ability to speak 12 foreign spoken languages fluently"],
    "A", "Intrapersonal intelligence is the ability to understand oneself—accessing one's inner feelings, personal values, self-regulation, and awareness of one's identity and capabilities.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

add_pq("Passage 30", P30_TEXT, "Which eighth intelligence was later incorporated by Howard Gardner to explain our capacity to identify and classify flora, fauna, and natural features?",
    "Naturalistic Intelligence",
    ["Spiritual Intelligence", "Emotional Intelligence", "Contextual Intelligence"],
    "B", "Gardner added Naturalistic Intelligence: the ability to recognize, categorize, and draw upon features of the natural environment, flora, fauna, weather, and ecosystems.",
    "Variations in Psychological Attributes", "Theories of Intelligence")

# --- PASSAGE 31: Indian Triguna Theory & Pancha Kosha (M16, P1, Q41-45) ---
P31_TEXT = (
    "In traditional Indian psychological thought, personality and character are conceptualized through the Triguna framework rooted in the Samkhya philosophy. "
    "The three gunas—Sattva, Rajas, and Tamas—are inherent qualities of Prakriti (nature) that exist in varying proportions within every individual. "
    "A holistic wellness center evaluated three corporate clients: "
    "Client 1 displayed truthfulness, emotional serenity, self-discipline, compassion, and pursuit of wisdom (predominantly Sattvic). "
    "Client 2 exhibited intense restless ambition, burning desire for material prestige, aggressive competition, and perpetual activity (predominantly Rajasic). "
    "Client 3 demonstrated persistent lethargy, procrastination, chronic pessimism, emotional depression, and dullness (predominantly Tamasic). "
    "The center also utilized the Taittiriya Upanishad's Pancha Kosha model (Annamaya, Pranamaya, Manomaya, Vijnanamaya, and Anandamaya koshas) "
    "to prescribe holistic yogic lifestyle modifications."
)

add_pq("Passage 31", P31_TEXT, "In the Indian Triguna typology, which guna is characterized by purity, wisdom, emotional equanimity, and ethical conscientiousness?",
    "Sattva Guna",
    ["Rajas Guna", "Tamas Guna", "Ahankara Guna"],
    "C", "Sattva represents light, purity, truthfulness, clarity, harmony, and mental serenity, fostering wisdom and spiritual elevation.",
    "Self and Personality", "Indian Concept of Personality")

add_pq("Passage 31", P31_TEXT, "Client 2's intense restlessness, burning passion for prestige, and hyper-competitive drive indicate the dominance of which guna?",
    "Rajas Guna",
    ["Sattva Guna", "Tamas Guna", "Prakriti Guna"],
    "D", "Rajas is characterized by intense passion, restless physical and mental activity, desire for power, sensory indulgence, and burning ambition.",
    "Self and Personality", "Indian Concept of Personality")

add_pq("Passage 31", P31_TEXT, "Client 3's pervasive lethargy, procrastination, mental dullness, and ignorance stem from the predominance of:",
    "Tamas Guna",
    ["Sattva Guna", "Rajas Guna", "Manas Guna"],
    "A", "Tamas embodies darkness, inertia, ignorance, lethargy, sluggishness, and mental confusion, obstructing growth and constructive action.",
    "Self and Personality", "Indian Concept of Personality")

add_pq("Passage 31", P31_TEXT, "Arrange the five sheaths (Pancha Koshas) of the human personality from the grossest physical layer to the subtlest spiritual core:",
    "Annamaya (food) -> Pranamaya (vital breath) -> Manomaya (mental) -> Vijnanamaya (wisdom) -> Anandamaya (bliss)",
    ["Anandamaya -> Vijnanamaya -> Manomaya -> Pranamaya -> Annamaya", "Pranamaya -> Annamaya -> Vijnanamaya -> Manomaya -> Anandamaya", "Manomaya -> Pranamaya -> Annamaya -> Anandamaya -> Vijnanamaya"],
    "B", "The Pancha Kosha hierarchy in the Taittiriya Upanishad: (1) Annamaya (physical food sheath), (2) Pranamaya (vital energy/prana), (3) Manomaya (mental/emotional), (4) Vijnanamaya (intellect/wisdom), and (5) Anandamaya (bliss sheath).",
    "Self and Personality", "Indian Concept of Personality")

add_pq("Passage 31", P31_TEXT, "How does the Indian concept of the 'Self' differ fundamentally from the traditional Western psychological concept of self?",
    "The Western self is bounded, individualistic, and isolated; the Indian self is relational, holistic, shifting, and interconnected with the cosmos",
    ["The Western self is spiritual; the Indian self is purely material", "The Western self believes in rebirth; the Indian self believes in mechanical physics", "Both conceptualizations are completely identical with zero philosophical divergence"],
    "C", "Western psychology views the self as autonomous, self-contained, and distinct with clear boundaries. In contrast, Indian psychology views the self as fluid, contextual, interconnected with family, nature, and the ultimate cosmic consciousness (Brahman).",
    "Self and Personality", "Concept of Self")

# --- PASSAGE 32: Adolescent Life Skills & PMR (M16, P2, Q46-50) ---
P32_TEXT = (
    "A state education board implemented a mandatory 'Life Skills Education Program' for 5,000 secondary school students. "
    "Surveys prior to the program indicated high adolescent distress: 65% struggled with chronic procrastination, severe exam anxiety, "
    "and inability to refuse peer pressure regarding substance experimentation. "
    "The curriculum trained students in: (1) Assertiveness training (saying 'No' clearly without aggression or guilt), "
    "(2) Time management techniques (prioritizing tasks via the Urgent-Important matrix), (3) Cognitive reframing, and "
    "(4) Progressive Muscle Relaxation (PMR) developed by Edmund Jacobson. "
    "Post-intervention assessments after six months demonstrated a 50% drop in reported exam anxiety, improved scholastic achievement, "
    "and significantly enhanced subjective well-being."
)

add_pq("Passage 32", P32_TEXT, "In life skills training, how is 'Assertive Communication' distinguished from passive and aggressive communication?",
    "Expressing one's rights, opinions, and boundaries clearly and respectfully without violating the rights of others",
    ["Insulting and physically threatening peers until they surrender", "Quietly agreeing with peer demands while privately weeping in secret", "Refusing to ever communicate with other human beings"],
    "D", "Assertiveness is the healthy middle ground: standing up for personal rights, communicating needs honestly and firmly, while maintaining respect for the rights and dignity of others.",
    "Meeting Life Challenges", "Stress Management Techniques")

add_pq("Passage 32", P32_TEXT, "How does Edmund Jacobson's Progressive Muscle Relaxation (PMR) induce physiological calmness in anxious students?",
    "Systematically tensing and then relaxing specific muscle groups throughout the body, heightening awareness of somatic tension and releasing autonomic arousal",
    ["Injecting chemical sedative anesthetics into arm muscles", "Performing 100 fast sprint push-ups until physical exhaustion", "Hypnotizing students into total sensory numbness"],
    "A", "Jacobson's PMR teaches individuals to deliberately contract and then release major muscle groups, cultivating somatic awareness and triggering the parasympathetic relaxation response.",
    "Meeting Life Challenges", "Stress Management Techniques")

add_pq("Passage 32", P32_TEXT, "When students learn to categorize study tasks into 'urgent versus important' and eliminate time-wasting habits, which life skill are they mastering?",
    "Time Management",
    ["Systematic Desensitization", "Aversive Conditioning", "Reaction Formation"],
    "B", "Time management involves prioritizing activities, allocating dedicated blocks of time, minimizing procrastination, and setting realistic daily milestones to minimize chronic academic stress.",
    "Meeting Life Challenges", "Stress Management Techniques")

add_pq("Passage 32", P32_TEXT, "Which psychological buffer is nurtured when students transform catastrophic self-talk ('I will fail') into constructive self-talk ('I have prepared well and will do my best')?",
    "Positive Cognitive Reframing / Rational Self-Talk",
    ["Dissociative Amnesia", "Learned Helplessness", "Catatonia"],
    "C", "Cognitive reframing replaces irrational, catastrophic, and self-defeating thoughts with realistic, encouraging, and task-focused rational self-statements.",
    "Meeting Life Challenges", "Stress Management Techniques")

add_pq("Passage 32", P32_TEXT, "According to the World Health Organization (WHO), why are 'Life Skills' indispensable for modern youth?",
    "They build psychosocial competence that enables individuals to deal effectively with the demands and challenges of everyday life",
    ["They replace the need for physical doctors and medical hospitals", "They allow students to pass all exams without ever reading textbooks", "They are designed exclusively to train military soldiers"],
    "D", "The WHO defines life skills as adaptive and positive behavioral competencies that enable individuals to manage daily life pressures, navigate relationships, and maintain mental well-being.",
    "Meeting Life Challenges", "Developing Life Skills")

# --- PASSAGE 33: Bipolar I Disorder: Mania & Depression (M17, P1, Q41-45) ---
P33_TEXT = (
    "Kunal, a 29-year-old architect, was admitted to a psychiatric facility following a dramatic behavioral episode. "
    "For two weeks, Kunal slept only two hours a night, yet declared he had 'infinite cosmic energy'. "
    "He spoke with extraordinary rapidity (pressured speech), jumped wildly from one topic to another (flight of ideas), "
    "and emptied his family savings account to buy 15 luxury sports cars, claiming God had chosen him to design cities on Mars (grandiosity). "
    "Prior to this episode, Kunal had spent four months confined to his bed suffering from severe melancholic depression, profound anhedonia, "
    "and suicidal ideation. His family history revealed that his paternal uncle had experienced similar severe cyclical mood oscillations. "
    "The psychiatrist initiated mood-stabilizing pharmacotherapy using Lithium carbonate alongside psychoeducation."
)

add_pq("Passage 33", P33_TEXT, "Kunal's clinical presentation of distinct episodes of mania alternating with major depressive episodes meets DSM-5 criteria for:",
    "Bipolar I Disorder",
    ["Major Depressive Disorder (Unipolar)", "Generalized Anxiety Disorder", "Schizophrenia, Catatonic Type"],
    "A", "Bipolar I Disorder is characterized by at least one manic episode (marked by grandiosity, decreased need for sleep, pressured speech, impulsivity), typically alternating with episodes of major depression.",
    "Psychological Disorders", "Mood Disorders")

add_pq("Passage 33", P33_TEXT, "Kunal's rapid shifting between unrelated topics during manic conversations is known clinically as:",
    "Flight of Ideas",
    ["Thought Withdrawal", "Avolition", "La belle indifférence"],
    "B", "Flight of ideas is a cardinal feature of mania: an accelerated flow of thoughts characterized by rapid topic transitions, abrupt shifts, and loose associations driven by cognitive hyper-arousal.",
    "Psychological Disorders", "Mood Disorders")

add_pq("Passage 33", P33_TEXT, "Kunal's belief that 'God chose me to design cities on Mars' exemplifies which specific psychotic symptom of mania?",
    "Delusion of Grandeur (Grandiosity)",
    ["Delusion of Persecution", "Auditory Hallucination", "Conversion Glove Anesthesia"],
    "C", "Delusions of grandeur are false, fixed, idiosyncratic beliefs involving exaggerated ideas of one's own importance, power, wealth, knowledge, or divine special identity.",
    "Psychological Disorders", "Mood Disorders")

add_pq("Passage 33", P33_TEXT, "Why is Kunal's diagnosis Bipolar I Disorder rather than Bipolar II Disorder?",
    "Bipolar I involves at least one fully developed Manic episode with marked impairment; Bipolar II involves Hypomania and major depression without full mania",
    ["Bipolar I occurs only in children; Bipolar II occurs only in adults", "Bipolar I is treated with vitamins; Bipolar II is treated with surgery", "Both disorders are completely identical in DSM-5"],
    "D", "Bipolar I Disorder requires the presence of a full-blown manic episode (often requiring hospitalization); Bipolar II requires hypomanic episodes (less severe, no hospitalization/psychosis) accompanied by major depressive episodes.",
    "Psychological Disorders", "Mood Disorders")

add_pq("Passage 33", P33_TEXT, "Which pharmacological agent prescribed to Kunal represents the classic gold standard mood stabilizer for preventing manic and depressive recurrences?",
    "Lithium Carbonate",
    ["Aspirin", "Penicillin", "Insulin"],
    "A", "Lithium carbonate is the established gold-standard mood-stabilizing medication utilized for the acute treatment of mania and long-term prophylactic maintenance in Bipolar I disorder.",
    "Therapeutic Approaches", "Biomedical Therapy")

# --- PASSAGE 34: Frankl's Logotherapy & Existential Meaning (M17, P2, Q46-50) ---
P34_TEXT = (
    "Dr. Arvind, an existential psychotherapist, worked with patients in an advanced oncology palliative ward. "
    "Many patients experienced what Viktor Frankl termed the 'Existential Vacuum'—a profound sense of meaninglessness, spiritual emptiness, "
    "and despair upon confronting terminal illness. One patient, Ramesh, a 52-year-old teacher, lamented: 'My life has been completely useless; "
    "suffering in this hospital bed has zero purpose.' Dr. Arvind utilized Viktor Frankl's Logotherapy. "
    "Rather than treating Ramesh's despair as a mental illness, he facilitated the discovery of meaning through three pathways: "
    "(1) Creating a work or doing a deed (recording video life lessons for his students), (2) Experiencing something or encountering someone "
    "(connecting deeply with his daughter), and (3) The attitude one takes toward unavoidable suffering (bearing terminal illness with dignity)."
)

add_pq("Passage 34", P34_TEXT, "Viktor Frankl's psychotherapeutic framework is formally known as:",
    "Logotherapy (Existential Analysis)",
    ["Client-Centred Therapy", "Rational Emotive Therapy", "Psychoanalysis"],
    "B", "Viktor Frankl, an Austrian psychiatrist and Holocaust survivor, founded Logotherapy, derived from the Greek word 'logos' (meaning), premised on the human 'will to meaning'.",
    "Therapeutic Approaches", "Existential Therapy")

add_pq("Passage 34", P34_TEXT, "In Frankl's framework, the feeling of total spiritual emptiness, boredom, and meaninglessness experienced by modern individuals is called:",
    "The Existential Vacuum",
    ["Cognitive Dissonance", "The Libidinal Fixation", "The Behavioral Sink"],
    "C", "Frankl coined the term 'Existential Vacuum' to describe the widespread modern psychological condition characterized by inner emptiness, aimlessness, and lack of perceived purpose.",
    "Therapeutic Approaches", "Existential Therapy")

add_pq("Passage 34", P34_TEXT, "According to Viktor Frankl, when facing unavoidable, terminal suffering that cannot be changed, how can an individual still discover meaning?",
    "By choosing one's personal attitude toward the suffering and bearing unavoidable adversity with courage and dignity",
    ["By denying that the physical disease exists through psychotic delusion", "By paying monetary bribes to hospital administrative directors", "By engaging in violent hostile aggression against medical nurses"],
    "D", "Frankl asserted that even when confronted with inescapable suffering and death, humans retain the ultimate freedom to choose their attitude—transforming personal tragedy into a triumph of human dignity.",
    "Therapeutic Approaches", "Existential Therapy")

add_pq("Passage 34", P34_TEXT, "What is the primary driving human motivational force in Frankl's Logotherapy, contrasting with Freud's 'Will to Pleasure' and Adler's 'Will to Power'?",
    "The Will to Meaning (finding a unique, personal purpose in existence)",
    ["The Will to Pleasure (Hedonism)", "The Will to Power (Superiority)", "The Genetic Survival Instinct"],
    "A", "Logotherapy identifies the 'Will to Meaning' as the primary motivational drive in human life, distinct from Freud's pleasure principle (id) and Adler's drive for superiority.",
    "Therapeutic Approaches", "Existential Therapy")

add_pq("Passage 34", P34_TEXT, "Which specific Logotherapeutic technique involves shifting the patient's obsessive self-focus away from personal symptoms toward meaningful external goals or relationships?",
    "Dereflection",
    ["Paradoxical Intention", "Systematic Desensitization", "Free Association"],
    "B", "Dereflection is a key Logotherapeutic technique that redirects the patient's hyper-reflective, obsessive self-absorption away from symptom distress toward external creative activities and meaningful human encounters.",
    "Therapeutic Approaches", "Existential Therapy")

# --- PASSAGE 35: Kelley's Covariation Model & Attribution Biases (M18, P1, Q41-45) ---
P35_TEXT = (
    "In a multinational technology corporation, project team leader Alok was evaluating his subordinate, Rohan, who failed to deliver "
    "a crucial software module on time. Alok immediately yelled: 'Rohan is lazy, irresponsible, and incompetent' (dispositional attribution). "
    "However, when Alok himself missed an executive deadline the previous month, he attributed it entirely to 'a sudden server crash and "
    "unreasonable client demands' (situational attribution). An organizational psychologist reviewed the incident using Harold Kelley's "
    "Covariation Model: she checked whether other developers also missed the deadline (Consensus: high, three other coders failed due to "
    "the same server glitch), whether Rohan missed deadlines across other projects (Distinctiveness: high, he had never missed a deadline on other projects), "
    "and whether Rohan missed deadlines on this project previously (Consistency: low, this was his first delay)."
)

add_pq("Passage 35", P35_TEXT, "Alok's immediate judgment that Rohan's delay was caused by his 'lazy and irresponsible character'—ignoring situational factors—exemplifies:",
    "Fundamental Attribution Error (Lee Ross)",
    ["Self-Serving Bias", "Actor-Observer Effect only", "Halo Effect"],
    "C", "The Fundamental Attribution Error (FAE) is the pervasive tendency to overestimate internal dispositional factors and underestimate external situational influences when judging others' behavior.",
    "Attitude and Social Cognition", "Attribution of Causality")

add_pq("Passage 35", P35_TEXT, "Alok's tendency to blame his own missed deadline on external server crashes while blaming Rohan's missed deadline on internal personality flaws exemplifies:",
    "The Actor-Observer Effect",
    ["The Sleeper Effect", "The Ringelmann Effect", "Pluralistic Ignorance"],
    "D", "The Actor-Observer Effect occurs when people attribute their own actions (as actor) to external situational constraints, while attributing others' identical actions (as observer) to internal character flaws.",
    "Attitude and Social Cognition", "Attribution of Causality")

add_pq("Passage 35", P35_TEXT, "According to Harold Kelley's Covariation Model, when Consensus is High, Distinctiveness is High, and Consistency is Low, what attribution is logically warranted?",
    "External / Situational Attribution (the delay was caused by the server glitch and external circumstances)",
    ["Internal / Dispositional Attribution (Rohan is lazy)", "Both internal and genetic biological attribution", "No attribution can ever be made"],
    "A", "In Kelley's Covariation Model, the combination of High Consensus (others did the same), High Distinctiveness (occurs only with this task), and Low Consistency points clearly to an External (Situational) attribution.",
    "Attitude and Social Cognition", "Attribution of Causality")

add_pq("Passage 35", P35_TEXT, "If Alok takes sole personal credit for a successful project launch ('I am brilliant') but blames a failed launch on his team ('They are incompetent'), which bias is he showing?",
    "Self-Serving Bias",
    ["Halo Effect", "Hawthorne Effect", "Just-World Phenomenon"],
    "B", "The Self-Serving Bias is the tendency to protect and enhance self-esteem by taking personal credit for positive outcomes (success) while blaming external circumstances for negative outcomes (failure).",
    "Attitude and Social Cognition", "Attribution of Causality")

add_pq("Passage 35", P35_TEXT, "What are the three diagnostic dimensions evaluated in Harold Kelley's Covariation Model?",
    "Consensus, Consistency, and Distinctiveness",
    ["Commitment, Control, and Challenge", "Orality, Anality, and Phallicity", "Sattva, Rajas, and Tamas"],
    "C", "Harold Kelley's Covariation Model uses three dimensions: Consensus (do other people behave the same?), Consistency (does the person behave the same across time?), and Distinctiveness (does the person behave differently toward different stimuli?).",
    "Attitude and Social Cognition", "Attribution of Causality")

# --- PASSAGE 36: Milgram's Obedience & Authority Dynamics (M18, P2, Q46-50) ---
P36_TEXT = (
    "A corporate compliance firm conducted a training seminar reviewing Stanley Milgram's classic 1963 Yale University obedience experiments. "
    "Participants were reminded that ordinary citizens, assigned the role of 'Teacher', delivered what they believed were escalating, "
    "painful electric shocks (from 15 to 450 volts) to an innocent 'Learner' strapped to a chair whenever errors were made. "
    "Despite hearing the learner scream in agony and eventually fall silent, 65% of participants delivered the maximum 450-volt lethal shock "
    "under the firm prods of an authority figure in a grey lab coat ('The experiment requires that you continue'). "
    "The seminar examined subsequent experimental variations: when the authority gave orders via telephone, obedience plummeted to 20%; "
    "when the teacher was forced to physically hold the learner's hand onto a shock plate, obedience dropped to 30%; "
    "and when two rebellious confederate teachers refused to obey, compliance collapsed to 10%."
)

add_pq("Passage 36", P36_TEXT, "What fundamental social influence process was Stanley Milgram investigating in his landmark Yale experiments?",
    "Obedience to Authority",
    ["Conformity to Peer Majority", "Informational Social Influence", "Altruistic Bystander Intervention"],
    "D", "Stanley Milgram investigated Obedience—the yielding to explicit direct commands issued by an individual perceived to possess legitimate institutional authority.",
    "Social Influence and Group Processes", "Social Influence Processes")

add_pq("Passage 36", P36_TEXT, "What percentage of normal adult participants complied fully up to the maximum 450-volt shock in Milgram's baseline condition?",
    "65%",
    ["1%", "15%", "100%"],
    "A", "In the baseline condition of Milgram's study, 26 out of 40 participants (65%) fully obeyed the experimenter's prods to deliver the maximum 450-volt shock.",
    "Social Influence and Group Processes", "Social Influence Processes")

add_pq("Passage 36", P36_TEXT, "Why did obedience plummet drastically to 10% when two rebellious confederate peers refused to administer shocks?",
    "The presence of disobedient peers shattered the perceived consensus and validated personal moral resistance (social support for defiance)",
    ["Participants ran out of electrical batteries", "The experimenter was arrested by police officers", "The learner broke the shock generator"],
    "B", "Having defiant peers provides social modeling and validation, drastically diminishing the psychological pressure of authority and liberating individuals to assert their moral independence.",
    "Social Influence and Group Processes", "Social Influence Processes")

add_pq("Passage 36", P36_TEXT, "Milgram described the psychological shift where an individual ceases to view themselves as personally accountable and regards themselves merely as an instrument executing an authority's wishes as:",
    "The Agentic State",
    ["The Autonomic State", "The Catatonic State", "The Deindividuated Sink"],
    "C", "Milgram formulated the concept of the 'Agentic State': a mental state where an individual sees themselves as an agent carrying out another person's wishes, relinquishing personal moral responsibility to the authority.",
    "Social Influence and Group Processes", "Social Influence Processes")

add_pq("Passage 36", P36_TEXT, "How does 'Obedience' differ conceptually from 'Conformity' in social psychology?",
    "Obedience involves following a direct command from a perceived authority figure of higher status; Conformity involves yielding to peer group pressure without explicit commands",
    ["Obedience occurs only in children; Conformity occurs only in adults", "Obedience is voluntary; Conformity is enforced by criminal police", "Both concepts describe identical psychological phenomena with zero distinction"],
    "D", "Obedience occurs within a hierarchical structure where an explicit command is issued by a higher-status authority; Conformity occurs among peers of equal status where individuals alter behavior to match implicit group norms.",
    "Social Influence and Group Processes", "Social Influence Processes")

# --- PASSAGE 37: Poverty, Deprivation & Learned Helplessness (M19, P1, Q41-45) ---
P37_TEXT = (
    "A rural development foundation conducted a multi-year ethnographic and psychological survey in a drought-prone district of Bundelkhand. "
    "Generations of landless agricultural laborers lived below the extreme poverty line, burdened by intergenerational debt to feudal moneylenders. "
    "Interviews revealed marked psychological characteristics: adult laborers exhibited an external locus of control, believing their suffering "
    "was dictated by 'Karma and unalterable fate'. They demonstrated learned helplessness: despite a new government irrigation scheme "
    "offering subsidized tubewell loans, few applied, stating: 'Nothing we try ever succeeds; the rich will just seize the water anyway.' "
    "Furthermore, they displayed a present-time survival orientation, spending seasonal wage spikes on immediate rituals rather than saving for education. "
    "Psychological testing of children revealed significant working memory and attention deficits exacerbated by early protein malnutrition."
)

add_pq("Passage 37", P37_TEXT, "The laborers' belief that their lives are governed entirely by unalterable fate and external moneylenders reflects:",
    "A strong External Locus of Control",
    ["A strong Internal Locus of Control", "High Self-Efficacy", "Bipolar Manic Thinking"],
    "A", "Locus of control refers to an individual's belief about the causes of life outcomes: an external locus of control attributes successes and failures to luck, fate, karma, or powerful others beyond personal control.",
    "Psychology and Life", "Poverty and Deprivation")

add_pq("Passage 37", P37_TEXT, "The laborers' passivity and refusal to apply for irrigation subsidies—stemming from repeated historical failures—exemplifies:",
    "Learned Helplessness (Martin Seligman)",
    ["Group Polarization", "Social Loafing", "The Ringelmann Effect"],
    "B", "Martin Seligman's Learned Helplessness occurs when organisms subjected to repeated, inescapable negative events develop the expectation that their actions cannot change outcomes, resulting in motivational passivity and depression.",
    "Psychology and Life", "Poverty and Deprivation")

add_pq("Passage 37", P37_TEXT, "The laborers' prioritization of immediate consumption over deferred educational savings is defined in deprivation psychology as:",
    "Present-Time Orientation",
    ["Future-Time Perspective", "Catatonic Stupor", "Systematic Desensitization"],
    "C", "Under conditions of chronic economic instability and deprivation, individuals adopt a 'present-time orientation' focused on immediate survival and coping, because the future is perceived as highly unpredictable and insecure.",
    "Psychology and Life", "Poverty and Deprivation")

add_pq("Passage 37", P37_TEXT, "The subjective feeling of deprivation experienced by landless laborers when comparing their destitution to the opulent lifestyle of landlords is termed:",
    "Relative Deprivation",
    ["Absolute Deprivation", "Biological Malnutrition", "Sensory Overload"],
    "D", "Relative deprivation is the psychological perception that one's group is unfairly deprived of resources, rights, or status in comparison to a salient, privileged reference group.",
    "Psychology and Life", "Poverty and Deprivation")

add_pq("Passage 37", P37_TEXT, "Which holistic intervention is most critical for breaking this intergenerational cycle of poverty and helplessness?",
    "Combining child nutritional and early cognitive enrichment (ICDS) with adult vocational skill building, microcredit access, and legal land rights",
    ["Giving lectures commanding the poor to work harder without providing resources", "Imposing heavy financial fines on families who fail to save money", "Isolating the villagers behind concrete walls away from society"],
    "A", "Dismantling the poverty trap requires a multi-pronged approach: early childhood nutrition and cognitive stimulation, functional literacy, microcredit empowerment, and structural legal reforms that restore personal agency.",
    "Psychology and Life", "Poverty and Deprivation")

# --- PASSAGE 38: Non-Verbal Attending & Crisis Helpline (M19, P2, Q46-50) ---
P38_TEXT = (
    "Aisha, a volunteer at a nationwide suicide prevention helpline, underwent rigorous training in active listening and crisis intervention. "
    "During training, instructors emphasized that effective counseling requires disciplined mastery over non-verbal attending behaviors (SOLER). "
    "On her first night shift, Aisha received a call from Varun, a 19-year-old student who was weeping uncontrollably and holding a lethal "
    "dose of pesticide. Although the interaction was telephonic, Aisha maintained an open, upright posture, leaned forward toward the headset, "
    "and attuned her paralanguage: she lowered her vocal pitch, slowed her speech tempo, and used gentle, warm vocal inflections. "
    "She reflected: 'Varun, I hear how deeply exhausted and terrified you are feeling right now, and I am right here with you.' "
    "She maintained unbroken presence, avoided giving hasty advice or minimizing his pain, and successfully de-escalated the crisis over 45 minutes."
)

add_pq("Passage 38", P38_TEXT, "Aisha's lowering of her vocal pitch, slowing of her speech rate, and soothing vocal tone are elements of:",
    "Paralanguage (Vocalics)",
    ["Kinesics", "Proxemics", "Haptics"],
    "B", "Paralanguage encompasses non-verbal vocal qualities: pitch, tone, tempo, volume, and speech pauses, which convey empathy, calmness, and presence even in telephonic counseling.",
    "Developing Psychological Skills", "Communication Skills")

add_pq("Passage 38", P38_TEXT, "Aisha's statement ('Varun, I hear how deeply exhausted and terrified you are feeling right now...') demonstrates which counselling skill?",
    "Reflection of Feelings and Empathetic Attunement",
    ["Direct disputation of irrational beliefs", "Free association and dream interpretation", "Behavioral token economy reinforcement"],
    "C", "Reflection of feelings verbalizes the client's underlying emotional state without judgment, demonstrating empathetic resonance and establishing a safe emotional connection.",
    "Developing Psychological Skills", "Counselling Skills")

add_pq("Passage 38", P38_TEXT, "In Gerard Egan's SOLER framework for non-verbal attending, what does the letter 'L' represent?",
    "Lean slightly forward toward the client (communicating engagement and attentiveness)",
    ["Listen silently without speaking", "Laugh frequently to lighten the mood", "Lock eye contact for twenty continuous minutes"],
    "D", "In Egan's SOLER acronym: S (Squarely face client), O (Open posture), L (Lean slightly forward), E (Eye contact), and R (Relaxed demeanor). Leaning forward communicates active psychological presence.",
    "Developing Psychological Skills", "Counselling Skills")

add_pq("Passage 38", P38_TEXT, "Why did Aisha deliberately avoid giving hasty advice ('Just think positive and go to sleep') during the acute crisis?",
    "Giving hasty advice trivializes the client's profound agony, shuts down communication, and communicates that the counselor is uncomfortable with the distress",
    ["Giving advice is illegal under all telecommunications laws", "Giving advice causes immediate auditory hearing loss in telephone callers", "Aisha was not paid enough money to give advice"],
    "A", "In crisis counseling, giving premature advice or dismissing distress alienates the caller, invalidates their genuine despair, and blocks authentic emotional catharsis.",
    "Developing Psychological Skills", "Counselling Skills")

add_pq("Passage 38", P38_TEXT, "Once Varun had safely set the pesticide bottle aside, what was Aisha's mandatory ethical and safety procedure?",
    "Collaboratively formulate an immediate safety plan, identify emergency contacts, and connect Varun with local emergency medical and psychological crisis teams",
    ["Hang up the telephone immediately and forget the conversation", "Post Varun's phone number on public internet forums", "Tell Varun that he will be arrested by police for making the call"],
    "B", "Crisis de-escalation must conclude with a concrete safety plan: establishing immediate support, removing lethal means, identifying protective contacts, and facilitating direct linkage to local mental health resources.",
    "Developing Psychological Skills", "Ethics in Psychology")

# --- PASSAGE 39: Eating Disorders: Anorexia vs Bulimia (M20, P1, Q41-45) ---
P39_TEXT = (
    "Divya, a 16-year-old competitive artistic gymnast, experienced an intense, irrational dread of becoming obese. "
    "Despite standing 5 feet 4 inches tall and weighing a dangerously emaciated 34 kilograms (BMI 12.8), Divya looked in the mirror "
    "and insisted she was 'disgustingly fat around my thighs' (severe body image distortion). "
    "She restricted her daily intake to a single cucumber and 50 ml of skimmed milk, while exercising relentlessly for five hours every day. "
    "Her medical evaluation revealed severe hypothermia, amenorrhea (cessation of menstruation), and cardiac bradycardia. "
    "Her teammate Ritu exhibited a different pattern: Ritu consumed 4,000 calories of pastries and chips in private two-hour bingeing episodes, "
    "accompanied by feeling completely out of control, followed immediately by self-induced vomiting and abuse of laxatives, maintaining normal body weight."
)

add_pq("Passage 39", P39_TEXT, "Divya's severe food restriction, dangerously low body weight, intense fear of gaining weight, and distorted body perception meet DSM-5 criteria for:",
    "Anorexia Nervosa (Restricting Type)",
    ["Bulimia Nervosa", "Binge Eating Disorder", "Somatic Symptom Disorder"],
    "C", "Anorexia Nervosa is characterized by restriction of energy intake leading to significantly low body weight, intense fear of gaining weight or becoming fat, and disturbance in self-perceived body weight or shape.",
    "Psychological Disorders", "Feeding and Eating Disorders")

add_pq("Passage 39", P39_TEXT, "Ritu's recurrent episodes of uncontrollable binge eating followed by compensatory purging (vomiting and laxatives) while maintaining normal weight characterize:",
    "Bulimia Nervosa",
    ["Anorexia Nervosa", "Binge Eating Disorder without purging", "Catatonic Stupor"],
    "D", "Bulimia Nervosa involves recurrent episodes of binge eating accompanied by a sense of lack of control, followed by recurrent inappropriate compensatory behaviors (purging, fasting, excessive exercise) to prevent weight gain.",
    "Psychological Disorders", "Feeding and Eating Disorders")

add_pq("Passage 39", P39_TEXT, "What is the primary diagnostic differentiator between Anorexia Nervosa (Binge-Eating/Purging type) and Bulimia Nervosa?",
    "Body weight: individuals with Anorexia Nervosa are significantly underweight (emaciated), whereas individuals with Bulimia Nervosa typically maintain normal or slightly above-normal weight",
    ["Anorexia occurs only in males; Bulimia occurs only in females", "Anorexia is genetic; Bulimia is caused by bacterial viruses", "There is zero diagnostic difference between the two disorders"],
    "A", "The crucial diagnostic boundary is significantly low body weight: if an individual engages in binging and purging but is emaciated (below minimal normal weight/BMI), the diagnosis is Anorexia Nervosa, Binge-eating/purging type.",
    "Psychological Disorders", "Feeding and Eating Disorders")

add_pq("Passage 39", P39_TEXT, "Divya's biological symptom of amenorrhea (cessation of menstrual cycles) in Anorexia Nervosa is caused by:",
    "Severe caloric deprivation and body fat loss shutting down the hypothalamic-pituitary-gonadal endocrine axis",
    ["Bacterial infection of the kidneys", "Physical fracture of pelvic bones from gymnastics", "Spontaneous mutation of the 21st chromosome"],
    "B", "Severe malnutrition and depletion of critical adipose tissue trigger severe endocrine disruption: the hypothalamus ceases secreting gonadotropin-releasing hormone (GnRH), halting luteinizing hormone and estrogen, causing amenorrhea.",
    "Psychological Disorders", "Feeding and Eating Disorders")

add_pq("Passage 39", P39_TEXT, "Which multifaceted therapeutic regimen is recognized as most effective for treating adolescent Anorexia Nervosa?",
    "Medical nutritional restoration and stabilization combined with Family-Based Therapy (Maudsley model) and Cognitive Behavioural Therapy (CBT-E)",
    ["Solitary confinement in an asylum without food", "Administering electroconvulsive shock therapy to erase body memories", "Forcing the patient to take written arithmetic exams"],
    "C", "Adolescent Anorexia Nervosa requires urgent medical weight restoration, coupled with Family-Based Treatment (FBT / Maudsley Approach) empowering parents to support refeeding, and Enhanced CBT targeting body image distortion.",
    "Psychological Disorders", "Feeding and Eating Disorders")

# --- PASSAGE 40: Aronson's Jigsaw Classroom & Prejudice Reduction (M20, P2, Q46-50) ---
P40_TEXT = (
    "Following communal riots in an industrial town, a newly integrated municipal secondary school experienced severe ethnic polarization. "
    "Students segregated themselves into hostile factions, hurling slurs in hallways and erupting into fistfights during recess. "
    "A school psychologist intervened by implementing Elliot Aronson's 'Jigsaw Classroom' technique across all Class 9 social science classes. "
    "The 30-student classes were divided into 5-member diverse teams combining students from rival ethnic groups. "
    "The day's lesson on Indian Independence was divided into five distinct components (e.g. Non-Cooperation Movement, Dandi March, Subhash Chandra Bose). "
    "Each student in a team was assigned one unique component to master, met with 'expert peers' from other teams holding the same topic, "
    "and then returned to teach their specific piece to their teammates. "
    "Because the upcoming test required knowledge of all five parts, students could succeed only if they listened to and helped one another."
)

add_pq("Passage 40", P40_TEXT, "The cooperative learning methodology implemented by the school psychologist is formally known as:",
    "The Jigsaw Classroom Technique (Elliot Aronson)",
    ["The Robbers Cave Tournament", "The Minimal Group Paradigm", "The Token Economy"],
    "D", "Elliot Aronson developed the Jigsaw Classroom technique in 1971 in newly desegregated Texas schools to dismantle racial prejudice through cooperative, interdependent learning.",
    "Social Influence and Group Processes", "Resolution of Intergroup Conflict")

add_pq("Passage 40", P40_TEXT, "What psychological mechanism makes the Jigsaw Classroom extraordinarily effective in dismantling intergroup prejudice?",
    "It creates cooperative interdependence where students must rely on each other to succeed, transforming former outgroup rivals into indispensable teammates",
    ["It forces students to take physical boxing lessons together", "It pays students cash salaries for memorizing history dates", "It hypnotizes students into forgetting their ethnic identities"],
    "A", "The Jigsaw design creates promotive interdependence: each student holds a vital piece of the puzzle, forcing mutual listening, empathy, respect, and breaking down outgroup stereotypes into individualized perceptions.",
    "Social Influence and Group Processes", "Resolution of Intergroup Conflict")

add_pq("Passage 40", P40_TEXT, "In Gordon Allport's Contact Hypothesis, which key condition is fulfilled by the Jigsaw Classroom?",
    "Equal status within the contact situation, cooperative interaction, and shared superordinate goals supported by institutional norms",
    ["Competitive zero-sum tournaments with a single gold trophy", "Unequal power where dominant groups dictate lessons", "Anonymous contact without any face-to-face communication"],
    "B", "The Jigsaw Classroom fulfills all four of Allport's conditions: (1) equal status within the learning team, (2) cooperative interdependence, (3) common goal of academic success, and (4) official institutional sanction.",
    "Social Influence and Group Processes", "Resolution of Intergroup Conflict")

add_pq("Passage 40", P40_TEXT, "In the Jigsaw Classroom procedure, what happens during the 'Expert Groups' phase?",
    "Students from different teams who were assigned the same topic meet together to study, master, and rehearse how to teach their lesson",
    ["Students are given an electroconvulsive shock test", "Students compete in a physical sprint race", "Students write essays in total silence without speaking"],
    "C", "In the Jigsaw method, students first meet in 'expert groups' with peers studying the same subtopic to master the content and plan teaching strategies before returning to their home teams.",
    "Social Influence and Group Processes", "Resolution of Intergroup Conflict")

add_pq("Passage 40", P40_TEXT, "Longitudinal evaluations of the Jigsaw Classroom demonstrate which empirical outcomes among students?",
    "Significant reductions in prejudice, increased empathy for peers, improved self-esteem, and higher academic test performance",
    ["Increased ethnic rioting and complete school failure", "Severe catatonia and loss of spoken language", "Immediate drop in student IQ scores by 50 points"],
    "D", "Decades of research across diverse classrooms show that the Jigsaw technique dramatically reduces prejudice, elevates cross-ethnic friendships, increases perspective-taking/empathy, and boosts academic achievement.",
    "Social Influence and Group Processes", "Resolution of Intergroup Conflict")

print(f"Total Part 2 questions: {len(part2_qs)} across 20 passages (100 questions).")
assert len(part2_qs) == 100, f"Expected 100 questions, got {len(part2_qs)}"

os.makedirs("mock/psy_units", exist_ok=True)
with open("mock/psy_units/passages_part2.json", "w", encoding="utf-8") as f:
    json.dump(part2_qs, f, indent=2, ensure_ascii=False)
print("Saved mock/psy_units/passages_part2.json successfully!")
