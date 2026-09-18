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
unit5_seen = set()
unit5_qs = []

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in unit5_seen:
        raise ValueError(f"Duplicate in Unit 5: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"PYQ duplicate in Unit 5: {q['questionText'][:80]}")
    unit5_seen.add(norm)
    assert len(q["options"]) == 4, f"Options length error: {q['questionText'][:40]}"
    assert q["correctOption"] in ["A", "B", "C", "D"], f"Invalid correct option: {q['questionText'][:40]}"
    assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
    assert q["detailedSolution"], f"Missing solution: {q['questionText'][:40]}"
    unit5_qs.append(q)

CHAPTER = "Therapeutic Approaches"

# --- SECTION 1: NATURE OF THERAPY, PSYCHODYNAMIC & BEHAVIOURAL (Q1 - Q50) ---

# Q1: Definition of Psychotherapy
opts, c, s = rotate_options(
    "A voluntary, confidential relationship between a trained professional and a person seeking help to modify maladaptive behaviours and foster personal growth",
    ["A court-ordered criminal punishment involving forced physical labor in prisons", "A commercial financial transaction purchasing luxury consumer products", "A biological surgical operation removing damaged cerebral tissue"],
    "A",
    "Psychotherapy is formally defined as a voluntary, systematic, and confidential interpersonal relationship between a trained clinical therapist and a client seeking assistance to alleviate psychological distress, modify maladaptive habits, and foster personal growth.\nHence, Option {{CORR}} is correct.",
    "Defines psychotherapy."
)
add_q(make_question(CHAPTER, "Nature of Psychotherapy", "What is the formal definition of 'psychotherapy' in clinical psychology?", opts, c, s, 1))

# Q2: Therapeutic Alliance
opts, c, s = rotate_options(
    "The warm, trusting, collaborative, and strictly confidential bond established between the therapist and the client",
    ["A formal legal contract guaranteeing 100% financial profit to the therapist", "A political pact signed between rival nations to terminate a military war", "A competitive athletic rivalry between coach and player"],
    "B",
    "The therapeutic alliance is the foundational collaborative partnership between therapist and client characterized by mutual trust, warmth, respect, confidentiality, and shared commitment to therapeutic goals.\nHence, Option {{CORR}} is correct.",
    "Defines the therapeutic alliance."
)
add_q(make_question(CHAPTER, "Nature of Psychotherapy", "The special relationship formed between a client and a therapist, known as the 'therapeutic alliance', is characterized by:", opts, c, s, 2))

# Q3: Goals of Psychotherapy
opts, c, s = rotate_options(
    "Reinforcing client's resolve for change, reducing emotional pressure, modifying maladaptive behaviours, and facilitating positive growth",
    ["Forcing the client to change their religious beliefs to match the therapist's religion", "Prescribing heavy narcotics so the client remains permanently unconscious", "Convincing the client that they are completely helpless and must remain in therapy forever"],
    "C",
    "Key goals of psychotherapy include: strengthening motivation for change, reducing emotional pressure and distress, unlearning maladaptive habits, improving interpersonal relationships, and facilitating self-awareness and personal growth.\nHence, Option {{CORR}} is correct.",
    "Lists the primary goals of psychotherapy."
)
add_q(make_question(CHAPTER, "Nature of Psychotherapy", "Which set comprises the primary therapeutic goals common to most systems of psychotherapy?", opts, c, s, 3))

# Q4: Psychodynamic Therapy Origin
opts, c, s = rotate_options(
    "Sigmund Freud, focusing on bringing repressed unconscious conflicts into conscious awareness to achieve emotional insight",
    ["B.F. Skinner, focusing on reinforcing observable animal lever-pressing", "Carl Rogers, focusing on client-directed self-actualisation", "Albert Ellis, focusing on disputing irrational cognitive beliefs"],
    "D",
    "Psychodynamic therapy originated with Sigmund Freud's psychoanalysis; its central objective is to uncover intrapsychic conflicts, repressed childhood memories, and instinctual desires buried in the unconscious to achieve emotional and intellectual insight.\nHence, Option {{CORR}} is correct.",
    "Attributes psychodynamic therapy to Sigmund Freud and explains its core objective."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "Psychodynamic psychotherapy, originated by Sigmund Freud, is founded on the premise that mental distress is resolved by:", opts, c, s, 4))

# Q5: Free Association Technique
opts, c, s = rotate_options(
    "The client relaxes on a couch and speaks aloud whatever thoughts, feelings, or memories come to mind without any censorship or screening",
    ["The therapist interrogates the client with aggressive cross-examination questions", "The client is hypnotized and made to perform comedic stage tricks", "The client completes a standardized multiple-choice mathematics examination"],
    "A",
    "Free association is a cardinal technique of psychoanalysis where the client lies comfortably on a couch, relaxes conscious censorship, and verbalizes every fleeting thought, image, or feeling exactly as it arises.\nHence, Option {{CORR}} is correct.",
    "Defines free association."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "In classical Freudian psychoanalysis, the technique of 'Free Association' requires the client to:", opts, c, s, 5))

# Q6: Dream Analysis: Manifest vs Latent Content
opts, c, s = rotate_options(
    "Manifest content is the literal, recalled storyline of the dream; Latent content is the hidden, symbolic unconscious meaning and repressed desires",
    ["Manifest content is unconscious; Latent content is conscious waking thoughts", "Manifest content is black-and-white; Latent content is in vivid color", "Both terms refer to the physical duration of rapid eye movement sleep"],
    "B",
    "In dream analysis ('the royal road to the unconscious'): Manifest content is the surface, conscious narrative of the dream remembered upon waking; Latent content is the underlying, disguised unconscious wish revealed through therapeutic interpretation.\nHence, Option {{CORR}} is correct.",
    "Distinguishes manifest content from latent content in dream analysis."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "In psychoanalytic dream analysis, how did Freud distinguish between 'manifest content' and 'latent content'?", opts, c, s, 6))

# Q7: Transference in Psychodynamic Therapy
opts, c, s = rotate_options(
    "The client projects and redirects feelings, desires, and unresolved conflicts from significant childhood figures (parents) onto the therapist",
    ["The therapist transfers monetary cash funds directly into the client's bank account", "The client transfers physical furniture from home into the therapist's office", "The therapist reveals personal private marital problems to the client"],
    "C",
    "Transference occurs when the client unconsciously reenacts past interpersonal dynamics by displacing feelings, expectations, and attitudes originally felt toward parents or authority figures onto the therapist.\nHence, Option {{CORR}} is correct.",
    "Defines transference in psychoanalysis."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "What does the phenomenon of 'transference' involve in psychodynamic therapy?", opts, c, s, 7))

# Q8: Positive vs Negative Transference
opts, c, s = rotate_options(
    "Positive transference involves feelings of love, admiration, and dependency toward the therapist; Negative transference involves hostility, resentment, and anger",
    ["Positive transference is healthy; Negative transference results in immediate patient arrest", "Positive transference occurs during day sessions; Negative transference occurs at night", "Both terms describe types of physical neurological muscle twitches"],
    "D",
    "In transference: Positive transference manifests as intense affection, praise, idealization, and romantic longing toward the therapist; Negative transference manifests as hostility, cynicism, jealousy, and anger.\nHence, Option {{CORR}} is correct.",
    "Distinguishes positive from negative transference."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "How is 'positive transference' distinguished from 'negative transference' in psychoanalysis?", opts, c, s, 8))

# Q9: Transference Neurosis
opts, c, s = rotate_options(
    "The full-blown reenactment of the client's original childhood neurosis within the therapeutic relationship, with the therapist at the center of the conflict",
    ["An acute bacterial infection contracted inside a clinical psychiatric office", "A sudden loss of memory for one's own name following an electrical shock", "A clinical eating disorder characterized by extreme fear of gaining weight"],
    "A",
    "Transference neurosis occurs during intensive psychoanalysis when the client's original childhood neurotic conflicts become fully revived, focused upon, and reenacted within the therapeutic relationship, enabling direct clinical working-through.\nHence, Option {{CORR}} is correct.",
    "Defines transference neurosis."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "In psychoanalysis, 'transference neurosis' develops when:", opts, c, s, 9))

# Q10: Resistance in Psychoanalysis
opts, c, s = rotate_options(
    "The client's conscious or unconscious opposition to uncovering repressed threatening material (e.g. coming late, falling silent, missing sessions)",
    ["Physical electrical resistance measured by electrodes on the palm of the hand", "The client's ability to resist physical infections like the common cold", "The client refusing to pay the therapist's agreed consultation invoice"],
    "B",
    "Resistance refers to any individual attempt—conscious or unconscious—to impede the progress of therapy and avoid confronting painful, anxiety-provoking repressed material (e.g. changing topics, silence, tardiness, forgetting dreams).\nHence, Option {{CORR}} is correct.",
    "Defines clinical resistance."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "What constitutes 'resistance' in psychodynamic psychotherapy?", opts, c, s, 10))

# Q11: Confrontation, Clarification, Interpretation, and Working Through
opts, c, s = rotate_options(
    "Confrontation points out discrepancies; Clarification brings vague details into focus; Interpretation uncovers meaning; Working through integrates insight into life",
    ["Confrontation is shouting; Clarification is whisper; Interpretation is singing; Working through is dancing", "All four terms describe stages of infant toilet training in the anal stage", "All four terms describe physical diagnostic blood tests for schizophrenia"],
    "C",
    "The process of psychoanalytic interpretation: (1) Confrontation points out inconsistencies, (2) Clarification sharpens and organizes vague verbalizations, (3) Interpretation explains the unconscious meaning, and (4) Working through involves repeatedly applying insight to achieve permanent personality restructuring.\nHence, Option {{CORR}} is correct.",
    "Details the four steps of psychoanalytic interpretation and working through."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "Which sequence accurately describes the four progressive steps involved in psychoanalytic interpretation?", opts, c, s, 11))

# Q12: Emotional Insight vs Intellectual Insight
opts, c, s = rotate_options(
    "Intellectual insight is mere factual understanding of conflict; Emotional insight involves deep experiential feeling and affective resolution of the trauma",
    ["Intellectual insight is remembering multiplication tables; Emotional insight is crying at a movie", "Intellectual insight occurs only in animals; Emotional insight occurs only in robots", "Both terms are completely identical with zero psychological difference"],
    "D",
    "Intellectual insight is an academic, cognitive recognition of the conflict ('I know I resent my father'), but true therapeutic cure requires emotional insight—the deep, felt affective reliving and cathartic resolution of the repressed emotion.\nHence, Option {{CORR}} is correct.",
    "Differentiates intellectual insight from emotional insight."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "In psychodynamic psychotherapy, why is 'emotional insight' considered superior to mere 'intellectual insight'?", opts, c, s, 12))

# Q13: Behaviour Therapy Core Premise
opts, c, s = rotate_options(
    "Psychological disorders and maladaptive behaviours are learned through conditioning and can be unlearned and modified by applying principles of learning theory",
    ["Disorders are caused by evil demons and can only be cured through religious exorcism", "Disorders are fixed genetic mutations that can never be altered by any learning", "Disorders represent chemical poisons that must be removed by bloodletting"],
    "A",
    "Behaviour therapy is founded on the core premise that abnormal behaviours are learned through classical conditioning, operant conditioning, and observational learning; consequently, therapeutic intervention involves unlearning faulty behaviours and learning adaptive responses.\nHence, Option {{CORR}} is correct.",
    "States the core premise of behaviour therapy."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "The fundamental premise of Behaviour Therapy is that maladaptive behaviours are:", opts, c, s, 13))

# Q14: Functional Analysis in Behaviour Therapy (ABC Analysis)
opts, c, s = rotate_options(
    "Antecedents (triggers that elicit behavior), Behaviour itself (observable response), and Consequences (reinforcements that maintain behavior)",
    ["Aptitude, Beliefs, and Creativity", "Anxiety, Bipolar, and Conversion", "Affect, Body build, and Consciousness"],
    "B",
    "Behavioural assessment uses Functional (ABC) Analysis to identify: Antecedent factors (environmental cues triggering behavior), the target Behaviour (frequency and duration), and Consequent factors (rewards/punishments sustaining the behavior).\nHence, Option {{CORR}} is correct.",
    "Explains Functional (ABC) Analysis in behaviour therapy."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "In behavioural assessment, what does 'Functional Analysis' (or ABC analysis) systematically examine?", opts, c, s, 14))

# Q15: Token Economy Technique
opts, c, s = rotate_options(
    "An operant conditioning system where clients earn tokens for exhibiting desirable behaviours, which can later be exchanged for backup reinforcers (privileges, rewards)",
    ["A clinical financial system where clients pay tokens to consult with psychiatrists", "A projective testing method where clients arrange plastic chips on an inkblot card", "An economic stock market simulation used to evaluate business management aptitude"],
    "C",
    "A Token Economy is a behavioral modification system based on operant conditioning; patients earn conditioned tokens (stickers, points, poker chips) for performing target adaptive behaviors, redeemable for desired rewards (television time, outings, treats).\nHence, Option {{CORR}} is correct.",
    "Defines the token economy technique."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "What is the operational mechanism of a 'Token Economy' in institutional behaviour modification?", opts, c, s, 15))

# Q16: Systematic Desensitization Developer
opts, c, s = rotate_options(
    "Joseph Wolpe",
    ["Sigmund Freud", "Aaron Beck", "Carl Rogers"],
    "D",
    "Systematic Desensitization was developed by psychiatrist Joseph Wolpe in 1958 based on the principle of reciprocal inhibition to treat phobias and severe anxiety disorders.\nHence, Option {{CORR}} is correct.",
    "Attributes Systematic Desensitization to Joseph Wolpe."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "Systematic Desensitization, a cornerstone behavioural technique for treating phobias, was devised by:", opts, c, s, 16))

# Q17: Principle of Reciprocal Inhibition (Wolpe)
opts, c, s = rotate_options(
    "Two mutually incompatible physiological responses (such as deep muscle relaxation and acute anxiety) cannot coexist simultaneously",
    ["Two foreign languages cannot be spoken simultaneously by the same person", "A person cannot eat food while simultaneously walking across a street", "An individual cannot experience hunger and thirst at the exact same hour"],
    "A",
    "Wolpe's principle of reciprocal inhibition states that if a response incompatible with anxiety (e.g. deep muscular relaxation) can be made to occur in the presence of anxiety-evoking stimuli, it will weaken the bond between those stimuli and the anxiety response.\nHence, Option {{CORR}} is correct.",
    "Explains the principle of reciprocal inhibition."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "On which foundational psychological principle does Systematic Desensitization operate?", opts, c, s, 17))

# Q18: Systematic Desensitization Sequence of Steps
add_q(make_sequence_question(
    CHAPTER, "Behaviour Therapy",
    "Arrange the progressive steps of Systematic Desensitization in correct operational sequence:",
    [
        ("A", "Client is trained in progressive deep muscle relaxation techniques"),
        ("B", "Client and therapist construct a graded hierarchy of anxiety-provoking situations from mild to severe"),
        ("C", "Client imagines the least anxiety-provoking scene while remaining deeply relaxed"),
        ("D", "Client systematically progresses up the hierarchy until the most terrifying stimulus can be imagined without anxiety")
    ],
    "A, B, C, D", "A",
    "The operational sequence of Systematic Desensitization: (1) Relaxation training -> (2) Construction of anxiety hierarchy -> (3) Imagining lowest hierarchy scene while relaxed -> (4) Gradual progression up the hierarchy until desensitization is complete.",
    "Sequences the steps of Systematic Desensitization."
))

# Q19: Flooding Technique (In Vivo Exposure)
opts, c, s = rotate_options(
    "The client is immediately and continuously exposed to the full-strength anxiety-provoking stimulus in real life without opportunity to escape, until extinction occurs",
    ["Gradually showing pictures of small harmless kittens over six months", "Administering relaxing warm water baths to induce peaceful sleep", "Injecting chemical vaccines into the blood to cure viral infections"],
    "B",
    "Flooding involves in vivo (real-life) exposure to the actual feared stimulus at maximum intensity without relaxation or escape; because no actual catastrophe occurs, autonomic exhaustion sets in and the conditioned fear response extinguishes.\nHence, Option {{CORR}} is correct.",
    "Defines flooding / in vivo exposure."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "What does the behavioural technique of 'Flooding' entail?", opts, c, s, 19))

# Q20: Implosive Therapy
opts, c, s = rotate_options(
    "Prolonged and intense exposure to the feared object or trauma conducted entirely through vivid mental imagination rather than in real life",
    ["Exposing a patient to physical electric shocks in a laboratory room", "Teaching a client to speak in complete grammatically correct sentences", "Constructing a wooden scale model of an apartment building"],
    "C",
    "Implosive therapy (or imaginal flooding) exposes the client to prolonged, highly exaggerated, and vivid mental imagery of their worst feared scenarios in imagination until the conditioned anxiety response extinguishes.\nHence, Option {{CORR}} is correct.",
    "Defines implosive therapy."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "How does 'Implosive Therapy' differ from in vivo Flooding?", opts, c, s, 20))

# Q21: Aversive Conditioning
opts, c, s = rotate_options(
    "Pairing an undesirable maladaptive behavior (e.g. alcohol drinking) with an intensely unpleasant noxious stimulus (e.g. nausea-inducing drug or electric shock)",
    ["Rewarding positive behaviours with gold stars and verbal praise", "Hypnotizing a client to forget all unpleasant childhood memories", "Teaching an individual deep diaphragmatic breathing exercises"],
    "D",
    "Aversive conditioning pairs an unwanted target behavior (such as alcohol consumption) with an unpleasant unconditioned stimulus (such as administering disulfiram causing violent nausea), establishing a conditioned aversion to the behavior.\nHence, Option {{CORR}} is correct.",
    "Defines aversive conditioning."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "In which clinical technique is an undesirable habit systematically paired with an unpleasant, noxious stimulus?", opts, c, s, 21))

# Q22: Modelling (Albert Bandura / Observational Learning)
opts, c, s = rotate_options(
    "The client learns adaptive behaviours or overcomes fears by observing a live or filmed model successfully performing the desired behaviour without adverse consequences",
    ["The client is painted with oil colors like a fashion runway model", "The client is rewarded with plastic tokens for cleaning their bedroom", "The client lies on a couch free-associating about childhood dreams"],
    "A",
    "Modelling (vicarious learning) utilizes Albert Bandura's observational learning principles: clients observe a model interact calmly with a feared object (e.g. a model petting a dog), acquiring adaptive coping responses through vicarious reinforcement.\nHence, Option {{CORR}} is correct.",
    "Defines modelling in behaviour therapy."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "How does the technique of 'Modelling' operate in behaviour therapy?", opts, c, s, 22))

# Q23: Assertiveness Training
opts, c, s = rotate_options(
    "Behavioural coaching, role-playing, and rehearsal to help passive individuals express thoughts, feelings, and boundaries openly without aggressive anger",
    ["Training military soldiers to engage in hand-to-hand combat during war", "Teaching individuals how to manipulate business colleagues for financial gain", "Instructing students to memorize encyclopedias word for word"],
    "B",
    "Assertiveness training is a structured behavioural intervention using role-playing and behavioral rehearsal to teach shy, passive individuals to stand up for their rights and express feelings directly without aggression.\nHence, Option {{CORR}} is correct.",
    "Defines assertiveness training."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "What is the primary objective of 'Assertiveness Training' in behaviour therapy?", opts, c, s, 23))

# Q24: Differential Reinforcement
opts, c, s = rotate_options(
    "Positively reinforcing desirable alternative behaviours while simultaneously ignoring (extinguishing) the undesirable maladaptive behaviour",
    ["Punishing all behaviours equally with physical confinement", "Reinforcing the maladaptive behaviour every time it occurs", "Providing zero rewards or feedback under any circumstance"],
    "C",
    "Differential Reinforcement involves reinforcing a desirable target behavior that is incompatible with the unwanted behavior, while simultaneously putting the undesirable behavior on extinction by withholding all reinforcement.\nHence, Option {{CORR}} is correct.",
    "Defines differential reinforcement."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "In operant behaviour therapy, what does 'Differential Reinforcement' involve?", opts, c, s, 24))

# Q25: Match Behaviour Therapy Techniques with Mechanisms
add_q(make_match_question(
    CHAPTER, "Behaviour Therapy",
    "Match List I (Behaviour Therapy Technique) with List II (Core Conditioning Principle):",
    [("A", "Token Economy"), ("B", "Systematic Desensitization"), ("C", "Aversive Conditioning"), ("D", "Modelling")],
    [("I", "Reciprocal inhibition and counter-conditioning of phobias"), ("II", "Observational learning and vicarious reinforcement"), ("III", "Operant conditioning using positive conditioned reinforcers"), ("IV", "Classical conditioning pairing unwanted habits with noxious stimuli")],
    "A-III, B-I, C-IV, D-II", "A",
    "Token economy: operant reinforcement (A-III); Systematic desensitization: reciprocal inhibition (B-I); Aversive conditioning: noxious pairing (C-IV); Modelling: observational learning (D-II).",
    "Accurately pairs behaviour therapy techniques with their conditioning principles."
))

# Q26: Cognitive Therapy Pioneer (Aaron Beck)
opts, c, s = rotate_options(
    "Aaron Beck, who demonstrated that psychological distress stems from negative automatic thoughts, cognitive distortions, and dysfunctional core schemas",
    ["Sigmund Freud, who argued that distress stems from repressed sexual libido", "B.F. Skinner, who argued that distress stems from lack of food pellets", "Carl Jung, who argued that distress stems from lack of archetypes"],
    "A",
    "Aaron T. Beck founded Cognitive Therapy, demonstrating that emotional disorders (like depression and anxiety) are maintained by systematic cognitive distortions and automatic negative thoughts that misinterpret reality.\nHence, Option {{CORR}} is correct.",
    "Attributes Cognitive Therapy to Aaron Beck and explains its foundation."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "Cognitive Therapy was formulated by Aaron Beck based on the premise that psychological distress is caused by:", opts, c, s, 26))

# Q27: Core Schemas and Automatic Thoughts (Beck)
opts, c, s = rotate_options(
    "Core schemas are deeply ingrained underlying cognitive structures developed in childhood; automatic thoughts are fleeting, reflex-like negative thoughts triggered by events",
    ["Core schemas are physical brain cells; automatic thoughts are muscular twitches", "Core schemas occur only during sleep; automatic thoughts occur only while eating", "Both terms describe types of unconscious Freudian defense mechanisms"],
    "B",
    "In Beck's model: Core schemas are deep, enduring beliefs about self, world, and others formed early in life (e.g. 'I am unlovable'); Automatic thoughts are rapid, unexamined, situation-specific negative evaluations triggered by external events.\nHence, Option {{CORR}} is correct.",
    "Distinguishes core schemas from automatic thoughts."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "In Aaron Beck's cognitive architecture, how are 'core schemas' distinguished from 'automatic thoughts'?", opts, c, s, 27))

# Q28: Dysfunctional Thought Record (DTR)
opts, c, s = rotate_options(
    "A structured client worksheet used to log the situation, negative automatic thoughts, associated emotions, objective evidence, and balanced rational alternatives",
    ["A medical EEG record tracking cerebral electrical microvolts during anesthesia", "A financial budget sheet tracking client expenditure on psychiatric appointments", "A projective drawing card where clients paint their dreams in watercolors"],
    "C",
    "The Dysfunctional Thought Record (DTR) is a central homework tool in Cognitive Therapy where clients systematically record: the triggering event, negative automatic thoughts, emotional intensity, evidence for/against the thought, and a rational, balanced replacement.\nHence, Option {{CORR}} is correct.",
    "Describes the Dysfunctional Thought Record (DTR)."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "What is a 'Dysfunctional Thought Record' (DTR) utilized for in Cognitive Therapy?", opts, c, s, 28))

# Q29: Collaborative Empiricism (Beck)
opts, c, s = rotate_options(
    "Therapist and client work together as co-investigators, treating the client's automatic thoughts as hypotheses to be tested against real-world evidence",
    ["The therapist acts as an all-knowing supreme authority who orders the client to obey", "The therapist hypnotizes the client to erase all memories of childhood trauma", "The client dictates all medical prescriptions to the certified psychiatrist"],
    "D",
    "Collaborative Empiricism is the therapeutic stance in Beck's CBT: the therapist and client form a collaborative scientific partnership, treating the client's beliefs not as absolute truths, but as testable hypotheses subjected to empirical reality-testing.\nHence, Option {{CORR}} is correct.",
    "Defines collaborative empiricism."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "In Aaron Beck's Cognitive Therapy, the term 'Collaborative Empiricism' refers to:", opts, c, s, 29))

# Q30: Albert Ellis: Rational Emotive Behaviour Therapy (REBT)
opts, c, s = rotate_options(
    "Psychological distress is caused by irrational beliefs ('musts', 'shoulds', 'demands') about activating events, rather than the activating events themselves",
    ["Psychological distress is caused by chemical toxins in drinking water", "Psychological distress is caused by unexpressed sexual libido in dreams", "Psychological distress is caused by lack of physical aerobic exercise"],
    "A",
    "Albert Ellis founded Rational Emotive Behaviour Therapy (REBT), famously summarizing Epictetus's philosophy: 'People are not disturbed by things, but by the view which they take of them.' Distress stems from dogmatic irrational beliefs (musturbatory thinking).\nHence, Option {{CORR}} is correct.",
    "Explains the core premise of Ellis's REBT."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "Albert Ellis formulated Rational Emotive Behaviour Therapy (REBT) around which central philosophical premise?", opts, c, s, 30))

# Q31: The ABCDE Model in REBT
opts, c, s = rotate_options(
    "A: Activating Event, B: Beliefs (rational/irrational), C: Consequences (emotional/behavioural), D: Disputing irrational beliefs, E: Effective new philosophy",
    ["A: Anxiety, B: Brain, C: Catatonia, D: Depression, E: Exhaustion", "A: Aptitude, B: Behavior, C: Conditioning, D: Desensitization, E: Evaluation", "A: Alarm, B: Barrier, C: Conflict, D: Distress, E: Eustress"],
    "B",
    "The ABCDE framework of REBT: Activating event (A) triggers Beliefs (B), which produce emotional and behavioural Consequences (C). Therapy focuses on actively Disputing (D) irrational beliefs to cultivate an Effective, rational new philosophy of life (E).\nHence, Option {{CORR}} is correct.",
    "Details the ABCDE model of REBT."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "What do the components of Albert Ellis's ABCDE framework represent in REBT?", opts, c, s, 31))

# Q32: 'Musturbatory Thinking' in REBT
opts, c, s = rotate_options(
    "Dogmatic, absolutist, rigid demands expressed as 'I must perform perfectly', 'Others must treat me fairly', and 'The world must be comfortable'",
    ["Creative divergent thinking used by artists to compose symphony concertos", "Unconscious fantasy thinking occurring during non-REM delta wave sleep", "Logical deductive reasoning used by mathematicians to solve theorems"],
    "C",
    "Albert Ellis termed irrational beliefs 'musturbatory thinking': absolutistic, rigid demands (e.g. 'I must succeed at all costs', 'You must treat me kindly', 'Conditions must be easy'), which inevitably lead to depression, anxiety, and rage when unmet.\nHence, Option {{CORR}} is correct.",
    "Defines musturbatory thinking in REBT."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "What did Albert Ellis mean by the clinical term 'musturbatory thinking' in REBT?", opts, c, s, 32))

# Q33: Disputing (D) in REBT
opts, c, s = rotate_options(
    "Vigorously questioning, challenging, and refuting the empirical, logical, and practical validity of the client's irrational beliefs",
    ["Arguing aggressively with client about international political elections", "Disputing the price of the therapist's medical consultation invoice", "Telling the client that they are legally insane and must be hospitalized"],
    "D",
    "Disputing (D) in REBT involves the therapist challenging irrational beliefs through philosophical, logical, empirical, and pragmatic questioning (e.g., 'Where is the evidence that you MUST always succeed? Why would failing make you totally worthless?').\nHence, Option {{CORR}} is correct.",
    "Explains the disputing process in REBT."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "In REBT, what does the therapist do during the 'Disputing' (D) phase?", opts, c, s, 33))

# Q34: Humanistic-Existential Therapy: Carl Rogers
opts, c, s = rotate_options(
    "Client-Centred Therapy, viewing the individual as possessing an inherent drive toward self-actualisation within a non-directive, warm environment",
    ["Rational Emotive Therapy, viewing the individual as an irrational thinking machine", "Classical Psychoanalysis, viewing the individual as an animal controlled by libido", "Operant Conditioning, viewing the individual as a mechanical organism"],
    "A",
    "Carl Rogers developed Client-Centred (Person-Centred) Therapy, based on humanistic principles: clients have vast internal resources for self-understanding and constructive change, which unlock in a non-directive, empathic therapeutic climate.\nHence, Option {{CORR}} is correct.",
    "Identifies Carl Rogers' Client-Centred Therapy."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "Carl Rogers founded Client-Centred Therapy on which humanistic viewpoint?", opts, c, s, 34))

# Q35: Three Core Therapeutic Conditions in Client-Centred Therapy
opts, c, s = rotate_options(
    "Empathy, Unconditional Positive Regard, and Congruence (Genuineness)",
    ["Confrontation, Free association, and Dream analysis", "Desensitization, Flooding, and Aversive conditioning", "Disputing, Rationalization, and Token economy"],
    "B",
    "Carl Rogers posited three necessary and sufficient conditions for therapeutic growth: (1) Empathy (experiencing client's internal frame of reference), (2) Unconditional Positive Regard (non-judgmental acceptance), and (3) Congruence/Genuineness (authenticity).\nHence, Option {{CORR}} is correct.",
    "Lists Rogers' three core therapeutic conditions."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "Which three necessary and sufficient conditions for therapeutic personality change were identified by Carl Rogers?", opts, c, s, 35))

# Q36: Empathy vs Sympathy in Therapy
opts, c, s = rotate_options(
    "Empathy is understanding the client's experience from their internal frame of reference while remaining objective; sympathy is feeling sorrow or pity from outside",
    ["Empathy is pitying the client; sympathy is crying with the client", "Empathy is physical medicine; sympathy is surgical intervention", "Both terms are completely identical synonyms in clinical practice"],
    "C",
    "Empathy means accurately sensing the client's private world as if it were one's own, without losing the 'as if' boundary, whereas sympathy involves pitying or feeling sorry for the person from an external perspective.\nHence, Option {{CORR}} is correct.",
    "Distinguishes empathy from sympathy in counselling."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "In clinical counseling, how is 'empathy' critically distinguished from 'sympathy'?", opts, c, s, 36))

# Q37: Non-Directive Stance in Client-Centred Therapy
opts, c, s = rotate_options(
    "The therapist does not give advice, pass judgments, or direct topics; instead, the client leads the session while the therapist reflects feelings and clarifies",
    ["The therapist orders the client to complete fifty push-ups every morning", "The therapist chooses what job the client must apply for after therapy", "The therapist hypnotizes the client to answer all questions with 'yes'"],
    "D",
    "In person-centered therapy, the therapist adopts a strictly non-directive stance: rather than prescribing solutions or giving advice, the therapist reflects feelings, validates emotions, and trusts the client to direct their own growth.\nHence, Option {{CORR}} is correct.",
    "Defines the non-directive stance in Client-Centred Therapy."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "What does the 'non-directive' stance of the therapist in Client-Centred Therapy entail?", opts, c, s, 37))

# Q38: Viktor Frankl's Logotherapy
opts, c, s = rotate_options(
    "Finding meaning in life and existence, asserting that the primary human motivation is the 'will to meaning', even in suffering",
    ["Conditioning animals with food pellets to modify salivary reflexes", "Analyzing childhood psychosexual fixations and Oedipal desires", "Administering electroconvulsive shocks to eliminate memory of trauma"],
    "A",
    "Viktor Frankl (holocaust survivor) founded Logotherapy (from Greek 'logos' meaning meaning), asserting that human life is guided by a primary 'will to meaning'; neurosis ('noögenic neurosis') arises from existential frustration and lack of purpose.\nHence, Option {{CORR}} is correct.",
    "Defines Viktor Frankl's Logotherapy."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "What is the central focus of 'Logotherapy' developed by Viktor Frankl?", opts, c, s, 38))

# Q39: Noögenic Neurosis (Frankl)
opts, c, s = rotate_options(
    "Psychological distress and despair arising from spiritual or existential emptiness, feeling that life has no meaning or purpose",
    ["Neurological paralysis caused by physical damage to spinal cords", "Severe dental tooth decay caused by drinking sugary carbonated beverages", "A genetic chromosomal disorder present continuously since birth"],
    "B",
    "Frankl coined the term 'noögenic neurosis' to describe spiritual and existential frustration, meaninglessness, and existential vacuum, distinguishing it from conventional somatic or psychogenic neuroses.\nHence, Option {{CORR}} is correct.",
    "Defines noögenic neurosis."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "In Viktor Frankl's logotherapy, what does 'noögenic neurosis' refer to?", opts, c, s, 39))

# Q40: Fritz Perls' Gestalt Therapy
opts, c, s = rotate_options(
    "Increasing here-and-now awareness, integrating fragmented and disowned parts of the personality, and resolving unfinished business",
    ["Analyzing childhood dreams from thirty years ago in silent isolation", "Teaching clients to avoid all human contact and practice solitude", "Measuring autonomic skin resistance using galvanic electronic meters"],
    "C",
    "Fritz Perls founded Gestalt Therapy, emphasizing present moment ('here and now') awareness, personal responsibility, bodily awareness, and integrating disowned parts of the self (e.g. through the empty-chair technique).\nHence, Option {{CORR}} is correct.",
    "Summarizes Gestalt Therapy by Fritz Perls."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "What is the primary therapeutic aim of 'Gestalt Therapy' developed by Fritz Perls?", opts, c, s, 40))

# Q41: Empty-Chair Technique (Gestalt Therapy)
opts, c, s = rotate_options(
    "The client has a dialogue with an imaginary person or an internal conflicting part of themselves seated in an opposite empty chair, switching chairs to speak for each",
    ["The therapist sits on an empty chair while the client cleans the office room", "The client is forced to stand for five hours while looking at an empty chair", "An empty chair is thrown out the window to symbolize destroying past anger"],
    "D",
    "In Gestalt therapy's empty-chair technique, the client speaks directly to an imagined significant other (e.g. deceased parent) or an internal part of the self seated in an empty chair, switching positions to externalize and integrate the conflict.\nHence, Option {{CORR}} is correct.",
    "Describes the empty-chair technique in Gestalt therapy."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "In Fritz Perls' Gestalt Therapy, how is the 'Empty-Chair Technique' conducted?", opts, c, s, 41))

# Q42: Biomedical Therapy: Psychopharmacology
opts, c, s = rotate_options(
    "The treatment of psychological disorders through the prescription of pharmaceutical medications that alter neurochemical brain activity",
    ["Treating disorders through free association and dream interpretation", "Treating disorders through systematic desensitization and flooding", "Treating disorders through client-centred reflection of feelings"],
    "A",
    "Psychopharmacotherapy is a biomedical intervention that utilizes psychiatric medications (such as antidepressants, anxiolytics, and antipsychotics) to correct neurochemical imbalances in cerebral neurotransmitter systems.\nHence, Option {{CORR}} is correct.",
    "Defines psychopharmacotherapy."
)
add_q(make_question(CHAPTER, "Biomedical Therapy", "In clinical psychiatry, 'psychopharmacotherapy' is defined as:", opts, c, s, 42))

# Q43: Major Classes of Psychotropic Drugs
opts, c, s = rotate_options(
    "Antianxiety drugs (anxiolytics), Antidepressant drugs, Mood stabilizers, and Antipsychotic drugs (neuroleptics)",
    ["Antibiotics, Antifungals, Antivirals, and Antihistamines", "Analgesics, Anesthetics, Antacids, and Antiseptics", "Vitamins, Minerals, Proteins, and Carbohydrates"],
    "B",
    "The four primary classes of psychotropic medications are: (1) Antianxiety drugs (e.g. benzodiazepines), (2) Antidepressants (SSRIs, TCAs), (3) Mood stabilizers (lithium), and (4) Antipsychotics (dopamine antagonists).\nHence, Option {{CORR}} is correct.",
    "Lists the four major classes of psychiatric medications."
)
add_q(make_question(CHAPTER, "Biomedical Therapy", "Which four major classes constitute the standard psychotropic medications prescribed for mental disorders?", opts, c, s, 43))

# Q44: Antianxiety Drugs (Benzodiazepines)
opts, c, s = rotate_options(
    "Enhance the inhibitory action of the neurotransmitter GABA, calming the central nervous system and reducing acute anxiety (e.g. diazepam, alprazolam)",
    ["Block dopamine receptors in the limbic system to cure visual hallucinations", "Increase metabolic heart rate and elevate adrenaline for athletic energy", "Destroy all white blood cells in the lymphatic system to cure depression"],
    "C",
    "Benzodiazepines (antianxiety medications like diazepam, alprazolam) bind to GABA-A receptor complexes, enhancing the inhibitory potency of GABA, thereby damping down neuronal firing and reducing acute autonomic anxiety.\nHence, Option {{CORR}} is correct.",
    "Explains mechanism of antianxiety benzodiazepines."
)
add_q(make_question(CHAPTER, "Biomedical Therapy", "Through which neurochemical mechanism do antianxiety medications (such as benzodiazepines) alleviate anxiety?", opts, c, s, 44))

# Q45: Antidepressant Drugs (SSRIs)
opts, c, s = rotate_options(
    "Selective Serotonin Reuptake Inhibitors (SSRIs) selectively block the reabsorption of serotonin into presynaptic neurons, increasing serotonin availability in synapses",
    ["Completely eliminate all serotonin from the human brain", "Paralyze the muscles of the chest wall to prevent breathing", "Turn blood plasma into a thick dark brown liquid"],
    "D",
    "Selective Serotonin Reuptake Inhibitors (SSRIs, such as fluoxetine, sertraline) selectively inhibit the presynaptic reuptake transporter for serotonin, allowing serotonin to remain longer in the synaptic cleft to stimulate postsynaptic receptors.\nHence, Option {{CORR}} is correct.",
    "Explains the mechanism of Selective Serotonin Reuptake Inhibitors (SSRIs)."
)
add_q(make_question(CHAPTER, "Biomedical Therapy", "What is the pharmacological mechanism of Selective Serotonin Reuptake Inhibitors (SSRIs) prescribed for depression?", opts, c, s, 45))

# Q46: Antipsychotic Medications (Neuroleptics)
opts, c, s = rotate_options(
    "Block post-synaptic dopamine D2 receptors in the brain, reducing positive symptoms like hallucinations and delusions in schizophrenia",
    ["Stimulate massive releases of adrenaline to produce manic euphoria", "Paralyze vocal cords so patients can never speak words again", "Dissolve stomach ulcers using alkaline mineral water"],
    "A",
    "Antipsychotic drugs (neuroleptics, e.g. chlorpromazine, haloperidol, risperidone) act predominantly by antagonizing post-synaptic dopamine D2 receptors, effectively reducing positive psychotic symptoms like delusions and hallucinations.\nHence, Option {{CORR}} is correct.",
    "Explains the mechanism of antipsychotic neuroleptic medications."
)
add_q(make_question(CHAPTER, "Biomedical Therapy", "How do antipsychotic medications (neuroleptics) primarily function to alleviate psychotic symptoms in schizophrenia?", opts, c, s, 46))

# Q47: Mood Stabilizers (Lithium Carbonate)
opts, c, s = rotate_options(
    "Lithium carbonate is the classic mood stabilizer used to prevent and treat manic episodes and mood swings in Bipolar Disorder",
    ["Lithium is a vitamin prescribed to children to accelerate physical height", "Lithium is an antibiotic used to cure bacterial throat infections", "Lithium is a sleeping tablet prescribed to eliminate visual dreaming"],
    "B",
    "Lithium carbonate is the gold-standard mood stabilizer in psychiatry, remarkably effective in dampening manic excitement and preventing recurrent mood swings in Bipolar Disorder.\nHence, Option {{CORR}} is correct.",
    "Identifies lithium carbonate as the classic mood stabilizer for Bipolar Disorder."
)
add_q(make_question(CHAPTER, "Biomedical Therapy", "Which metallic salt is widely prescribed as a mood stabilizer to treat and prevent manic episodes in Bipolar Disorder?", opts, c, s, 47))

# Q48: Electroconvulsive Therapy (ECT)
opts, c, s = rotate_options(
    "An electric current is applied across the brain to induce a brief controlled therapeutic seizure, used primarily for severe, treatment-resistant depression with acute suicide risk",
    ["Continuous electrical current applied to fingers to punish criminal behavior", "An electrical machine used to measure athletic muscle strength in limbs", "A handheld device used to measure hearing loss in school pupils"],
    "C",
    "Electroconvulsive Therapy (ECT) involves applying a brief, controlled electrical current to the scalp under general anesthesia and muscle relaxants to induce a generalized cerebral seizure, reserved for severe, medication-resistant depression with acute suicide risk.\nHence, Option {{CORR}} is correct.",
    "Describes Electroconvulsive Therapy (ECT)."
)
add_q(make_question(CHAPTER, "Biomedical Therapy", "What is Electroconvulsive Therapy (ECT), and for which clinical indication is it primarily utilized?", opts, c, s, 48))

# Q49: Alternative Therapies: Yoga and Meditation
opts, c, s = rotate_options(
    "Practices like Asanas, Pranayama, and Vipassana meditation regulate autonomic balance, lower cortisol, and alleviate anxiety and depressive symptoms",
    ["Alternative therapies require surgical extraction of the adrenal glands", "Alternative therapies are illegal practices that have zero scientific research", "Alternative therapies cause severe psychotic schizophrenia in healthy adults"],
    "D",
    "Alternative therapeutic systems—such as Yoga (Asanas, Pranayama) and Mindfulness/Vipassana meditation—are scientifically documented to balance the autonomic nervous system, enhance vagal tone, and relieve stress, anxiety, and depression.\nHence, Option {{CORR}} is correct.",
    "Explains the therapeutic value of Yoga and meditation."
)
add_q(make_question(CHAPTER, "Alternative Therapies", "What clinical benefits do integrative practices like Yoga (Pranayama, Asanas) and meditation provide according to research?", opts, c, s, 49))

# Q50: Sudarshan Kriya Yoga (SKY) Research (NIMHANS)
opts, c, s = rotate_options(
    "A rhythmic breathing practice researched at NIMHANS (Bengaluru) that significantly alleviates clinical depression, anxiety, and stress disorders",
    ["A martial arts technique practiced by military commando units", "A chemical pharmaceutical injection developed to cure bacterial fever", "A surgery removing prefrontal cortex tissue to cure panic attacks"],
    "A",
    "Extensive psychiatric research at NIMHANS (National Institute of Mental Health and Neurosciences, Bengaluru) has demonstrated that Sudarshan Kriya Yoga (SKY)—a standardized rhythmic breathing technique—exerts potent antidepressant and anxiolytic effects.\nHence, Option {{CORR}} is correct.",
    "Cites NIMHANS research on Sudarshan Kriya Yoga (SKY)."
)
add_q(make_question(CHAPTER, "Alternative Therapies", "Sudarshan Kriya Yoga (SKY), a rhythmic breathing technique evaluated extensively in Indian psychiatric research at NIMHANS, is effective in treating:", opts, c, s, 50))

print(f"Unit 5 Section 1 complete: {len(unit5_qs)} questions generated.")

# --- SECTION 2: REHABILITATION, ETHICS, COMPARATIVE THERAPY & ADVANCED CBT (Q51 - Q100) ---

# Q51: Rehabilitation of the Mentally Ill Definition
opts, c, s = rotate_options(
    "Restoring an individual recovering from severe mental illness to the highest attainable level of independent social, vocational, and personal functioning",
    ["Locking recovering patients inside permanent institutional solitary cells", "Forcing individuals to change their biological names and legal citizenship", "Discontinuing all medical support and abandoning patients on the streets"],
    "A",
    "Psychiatric rehabilitation aims to empower recovering patients to achieve optimal independent functioning, self-sufficiency, social integration, and quality of life in their community.\nHence, Option {{CORR}} is correct.",
    "Defines psychiatric rehabilitation."
)
add_q(make_question(CHAPTER, "Rehabilitation of the Mentally Ill", "What is the primary objective of 'psychiatric rehabilitation' for individuals recovering from mental illness?", opts, c, s, 51))

# Q52: Occupational Therapy in Rehabilitation
opts, c, s = rotate_options(
    "Training patients in basic daily living skills, self-care, craft activities, and motor coordination to build practical autonomy",
    ["Administering timed multiple-choice corporate employment examinations", "Requiring patients to perform heavy manual ditch digging for fourteen hours daily", "Training patients to pilot commercial airline jet aircraft"],
    "B",
    "Occupational therapy helps recovering individuals develop practical physical and cognitive daily living skills (cooking, grooming, basic crafts, money handling) to re-establish independence in everyday life.\nHence, Option {{CORR}} is correct.",
    "Describes the focus of occupational therapy in rehabilitation."
)
add_q(make_question(CHAPTER, "Rehabilitation of the Mentally Ill", "What is the specific focus of 'Occupational Therapy' in psychiatric rehabilitation programs?", opts, c, s, 52))

# Q53: Vocational Training in Rehabilitation
opts, c, s = rotate_options(
    "Teaching marketable trade skills (e.g. printing, candle making, computer data entry) to help recovering individuals achieve financial self-reliance",
    ["Training patients to run for high political office in parliament", "Teaching patients how to forge legal monetary banknotes", "Instructing patients to invest all their savings in speculative cryptocurrency"],
    "C",
    "Vocational rehabilitation trains patients in practical, productive vocational skills (carpentry, tailoring, packaging, typing) suited to their abilities, enabling gainful employment and economic independence.\nHence, Option {{CORR}} is correct.",
    "Defines vocational training in rehabilitation."
)
add_q(make_question(CHAPTER, "Rehabilitation of the Mentally Ill", "In rehabilitation centers, 'Vocational Training' is provided primarily to:", opts, c, s, 53))

# Q54: Social Skills Training
opts, c, s = rotate_options(
    "Teaching effective interpersonal communication, active listening, conversational skills, and assertiveness through role-play and feedback",
    ["Instructing clients on how to avoid all human conversation permanently", "Teaching clients how to deceive and manipulate friends for cash", "Requiring clients to memorize foreign language dictionaries"],
    "D",
    "Social Skills Training (SST) utilizes behavioral modeling, role-play, and constructive feedback to help individuals with severe disorders (like chronic schizophrenia) learn basic conversational skills, express needs, and interact effectively.\nHence, Option {{CORR}} is correct.",
    "Defines social skills training."
)
add_q(make_question(CHAPTER, "Rehabilitation of the Mentally Ill", "How does 'Social Skills Training' function within rehabilitation programs?", opts, c, s, 54))

# Q55: Halfway Homes
opts, c, s = rotate_options(
    "Transitional residential facilities that provide a supportive, semi-independent living environment between psychiatric hospital discharge and full community return",
    ["Permanent maximum-security correctional prisons for violent criminals", "Emergency hospital rooms designed strictly for surgical operations", "Boarding schools for intellectually gifted child prodigies"],
    "A",
    "Halfway homes provide a transitional step-down residential setting where individuals recovering from mental hospitalizations live in a supportive community, practicing independent living skills before returning home.\nHence, Option {{CORR}} is correct.",
    "Defines halfway homes."
)
add_q(make_question(CHAPTER, "Rehabilitation of the Mentally Ill", "What purpose do 'Halfway Homes' serve in the continuum of mental health rehabilitation?", opts, c, s, 55))

# Q56: Sheltered Workshops
opts, c, s = rotate_options(
    "Supervised, non-competitive work environments where individuals with chronic mental or developmental disabilities perform paid productive work at their own pace",
    ["Unsupervised high-pressure corporate trading floors with rigid sales targets", "Heavy industrial metal factories operating high-voltage machinery without safety gear", "Classrooms where students take six-hour competitive entrance tests"],
    "B",
    "Sheltered workshops provide a protective, structured, and accommodating work environment where individuals with lasting disabilities can engage in productive, remunerated labor suited to their capacities without market competition.\nHence, Option {{CORR}} is correct.",
    "Defines sheltered workshops."
)
add_q(make_question(CHAPTER, "Rehabilitation of the Mentally Ill", "In vocational rehabilitation, 'Sheltered Workshops' are designed to:", opts, c, s, 56))

# Q57: Factors Contributing to Healing in Psychotherapy
opts, c, s = rotate_options(
    "Techniques specific to the therapy, nonspecific common factors (therapeutic alliance, client motivation, empathy), and catharsis",
    ["Surgical removal of brain tumors and administration of physical vitamins", "Forcing the client to pay exorbitant consultation fees to build respect", "Hypnotizing the client into becoming completely obedient to the therapist"],
    "C",
    "Research indicates that therapeutic healing arises from: (1) specific therapeutic techniques, (2) nonspecific common factors (the warmth, empathy, and genuine alliance provided by the therapist), (3) client hope and motivation, and (4) emotional catharsis.\nHence, Option {{CORR}} is correct.",
    "Lists major factors contributing to healing in psychotherapy."
)
add_q(make_question(CHAPTER, "Factors Contributing to Healing", "Which combination of elements contributes most substantially to therapeutic improvement in psychotherapy?", opts, c, s, 57))

# Q58: Catharsis in Psychotherapy
opts, c, s = rotate_options(
    "The emotional release and venting of pent-up feelings and suppressed emotional distress, bringing relief to the client",
    ["The physical administration of electric currents across cerebral lobes", "A standardized test measuring verbal reasoning and reading comprehension", "A biological chemical reaction occurring in liver hepatocytes during digestion"],
    "D",
    "Catharsis refers to the emotional purging and profound relief experienced when an individual openly vents, expresses, and releases long-suppressed painful emotions, grief, or anger in a safe therapeutic environment.\nHence, Option {{CORR}} is correct.",
    "Defines catharsis."
)
add_q(make_question(CHAPTER, "Factors Contributing to Healing", "In psychotherapy, the term 'catharsis' signifies:", opts, c, s, 58))

# Q59: Ethics in Psychotherapy: Confidentiality
opts, c, s = rotate_options(
    "The therapist's ethical and legal obligation to keep all information shared by the client private and secret, except in cases of imminent danger to self or others",
    ["Publishing the client's personal diary in public national newspapers", "Sharing the client's private confessions with neighborhood gossip groups", "Refusing to reveal the client's medical records to certified emergency surgeons"],
    "A",
    "Confidentiality is a sacred ethical pillar of psychotherapy: all client disclosures, personal details, and clinical notes must be kept strictly private, broken only under legal mandates of imminent suicide, child abuse, or danger to others.\nHence, Option {{CORR}} is correct.",
    "Defines the ethical principle of confidentiality in psychotherapy."
)
add_q(make_question(CHAPTER, "Ethics in Psychotherapy", "What does the ethical mandate of 'confidentiality' require of a practicing psychotherapist?", opts, c, s, 59))

# Q60: Ethics in Psychotherapy: Informed Consent
opts, c, s = rotate_options(
    "Providing clients with clear, comprehensible information regarding the nature, procedures, risks, costs, and limits of therapy before treatment begins",
    ["Forcing the client to sign a contract surrendering all their personal wealth", "Starting therapy without telling the client what therapy is or how much it costs", "Hypnotizing the client before asking if they want to participate in therapy"],
    "B",
    "Informed consent requires that the client is educated about the therapy's goals, techniques, potential risks, confidentiality boundaries, financial fees, and voluntary right to withdraw before therapy commences.\nHence, Option {{CORR}} is correct.",
    "Defines informed consent in psychotherapy."
)
add_q(make_question(CHAPTER, "Ethics in Psychotherapy", "In clinical practice, 'informed consent' ensures that the client:", opts, c, s, 60))

# Q61: Dual Relationships in Therapy Ethics
opts, c, s = rotate_options(
    "Therapists must avoid dual relationships (e.g. entering romantic, financial, or personal friendships with clients) to prevent exploitation and impaired objectivity",
    ["Therapists should marry their clients to build stronger emotional bonds", "Therapists should borrow large financial loans from wealthy psychiatric clients", "Therapists should hire their clients as domestic house servants"],
    "C",
    "Ethical standards strictly prohibit dual relationships (simultaneous professional and personal, romantic, or business entanglements) because they compromise clinical objectivity and risk exploiting the vulnerable client.\nHence, Option {{CORR}} is correct.",
    "Explains the ethical prohibition of dual relationships in psychotherapy."
)
add_q(make_question(CHAPTER, "Ethics in Psychotherapy", "Why do professional ethical guidelines strictly prohibit therapists from entering 'dual relationships' with their clients?", opts, c, s, 61))

# Q62: Match Therapy Systems with Core Cause of Problem
add_q(make_match_question(
    CHAPTER, "Comparative Analysis of Therapies",
    "Match List I (Therapy System) with List II (Postulated Core Cause of Psychological Distress):",
    [("A", "Psychodynamic Therapy"), ("B", "Behaviour Therapy"), ("C", "Cognitive Therapy (Beck)"), ("D", "Existential Therapy (Frankl)")],
    [("I", "Faulty conditioning and learning of maladaptive behavioural responses"), ("II", "Negative automatic thoughts, cognitive distortions, and dysfunctional schemas"), ("III", "Unresolved childhood intrapsychic conflicts and repressed unconscious impulses"), ("IV", "Existential frustration, meaninglessness, and lack of life purpose")],
    "A-III, B-I, C-II, D-IV", "A",
    "Psychodynamic: intrapsychic conflict/unconscious (A-III); Behaviour: faulty learning/conditioning (B-I); Cognitive: cognitive distortions/schemas (C-II); Existential: meaninglessness/lack of purpose (D-IV).",
    "Accurately links therapy systems to their theoretical causes of distress."
))

# Q63: Match Therapy Systems with Chief Method of Treatment
add_q(make_match_question(
    CHAPTER, "Comparative Analysis of Therapies",
    "Match List I (Therapeutic Approach) with List II (Chief Method of Treatment):",
    [("A", "Psychoanalysis"), ("B", "Client-Centred Therapy"), ("C", "Rational Emotive Behaviour Therapy"), ("D", "Behaviour Therapy")],
    [("I", "Unconditional positive regard, non-directive reflection, and empathy"), ("II", "Disputing irrational beliefs through ABCDE framework"), ("III", "Free association, dream analysis, and working through transference"), ("IV", "Systematic desensitization, token economy, and reinforcement contingencies")],
    "A-III, B-I, C-II, D-IV", "A",
    "Psychoanalysis: free association/transference (A-III); Client-centred: unconditional regard/empathy (B-I); REBT: disputing irrational beliefs (C-II); Behaviour therapy: desensitization/reinforcement (D-IV).",
    "Accurately pairs therapy systems with chief treatment methods."
))

# Q64: Duration of Psychotherapy Across Approaches
opts, c, s = rotate_options(
    "Classical psychoanalysis is long-term (years, multiple weekly sessions); CBT and Behaviour therapy are typically short-term (10 to 20 weekly sessions)",
    ["CBT lasts twenty years, while psychoanalysis lasts only twenty minutes", "All therapies worldwide are strictly required to terminate in exactly three hours", "Alternative yoga therapies can only be practiced for one single second"],
    "B",
    "Classical psychoanalysis is an intensive, long-term endeavor lasting several years with multiple weekly sessions, whereas contemporary Cognitive-Behavioural and Behaviour therapies are structured, goal-directed, and brief (typically 12 to 20 sessions).\nHence, Option {{CORR}} is correct.",
    "Contrasts the typical duration of psychoanalysis with CBT."
)
add_q(make_question(CHAPTER, "Comparative Analysis of Therapies", "How does the typical duration and frequency of classical psychoanalysis compare to contemporary Cognitive-Behavioural Therapy (CBT)?", opts, c, s, 64))

# Q65: Nature of Therapeutic Relationship Across Approaches
opts, c, s = rotate_options(
    "In Psychoanalysis the therapist is an interpretative expert; in Client-Centred therapy the therapist is an egalitarian facilitator; in CBT they are collaborative partners",
    ["In all therapies the therapist is an absolute dictator who punishes the client", "In all therapies the client dictates all medical diagnoses without therapist input", "There is zero therapeutic relationship in any modern psychological therapy"],
    "C",
    "The therapist's role varies: in psychoanalysis, an expert interpreter analyzing transference; in client-centered therapy, a genuine, non-directive facilitator; in CBT, a collaborative empirical investigator working alongside the client.\nHence, Option {{CORR}} is correct.",
    "Contrasts the therapeutic relationship across psychoanalysis, humanistic, and CBT."
)
add_q(make_question(CHAPTER, "Comparative Analysis of Therapies", "How does the nature of the therapist-client relationship differ across Psychoanalysis, Client-Centred Therapy, and Cognitive-Behavioural Therapy?", opts, c, s, 65))

# Q66: Decatastrophizing Technique in CBT
opts, c, s = rotate_options(
    "Helping the client evaluate the worst-case scenario objectively by asking 'What is the absolute worst that could happen, and how could you handle it?'",
    ["Telling the client that catastrophic disasters are guaranteed to happen every hour", "Hypnotizing the client to make them forget that natural disasters exist", "Administering high-voltage electroconvulsive shocks to eliminate panic"],
    "D",
    "Decatastrophizing (the 'what if' technique) in CBT helps clients confront catastrophic fears, examine objective probability, and realize that even the feared outcome is neither fatal nor unmanageable.\nHence, Option {{CORR}} is correct.",
    "Defines decatastrophizing in CBT."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "In Cognitive Therapy, what is the clinical procedure known as 'Decatastrophizing'?", opts, c, s, 66))

# Q67: Socratic Questioning in CBT
opts, c, s = rotate_options(
    "Using disciplined, guided questioning to help the client discover their own cognitive inconsistencies and arrive at balanced conclusions (guided discovery)",
    ["Asking rapid multiple-choice questions to test client's knowledge of Greek philosophy", "Interrogating the client with hostile accusations until they confess crimes", "Remaining completely silent for sixty minutes while the client sleeps"],
    "A",
    "Socratic questioning (guided discovery) is a core CBT method where the therapist asks open, thoughtful questions that prompt the client to critically examine their own assumptions, weigh evidence, and formulate rational alternatives.\nHence, Option {{CORR}} is correct.",
    "Defines Socratic questioning in CBT."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "What is the purpose of 'Socratic Questioning' in Cognitive-Behavioural Therapy?", opts, c, s, 67))

# Q68: Behavioural Experiments in CBT
opts, c, s = rotate_options(
    "Planned real-life experiential activities designed to directly test the empirical validity of a client's negative beliefs",
    ["Conducting surgical experiments on laboratory animals in clinical rooms", "Administering experimental unapproved psychiatric medications to clients", "Locking clients in experimental soundproof dungeons to test fear limits"],
    "B",
    "Behavioural experiments in CBT are collaborative real-world tests where clients actively test the validity of catastrophic beliefs (e.g. testing the belief 'If I speak to a stranger, they will mock me' by saying hello to a cashier).\nHence, Option {{CORR}} is correct.",
    "Defines behavioural experiments in CBT."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "In Cognitive-Behavioural Therapy, what are 'behavioural experiments' designed to accomplish?", opts, c, s, 68))

# Q69: Selective Abstraction (Beck Cognitive Distortion)
opts, c, s = rotate_options(
    "Focusing exclusively on a single negative detail taken out of context while ignoring all positive aspects of an event",
    ["Drawing broad universal conclusions that one failure means total failure at everything", "Attributing all personal success to external luck while blaming self for flaws", "Believing that one can read others' minds without speaking"],
    "C",
    "Selective abstraction is a cognitive distortion where an individual isolates a single negative detail, fixates upon it, and ignores all surrounding positive evidence (e.g., dwelling on one minor critique while ignoring fifty glowing compliments).\nHence, Option {{CORR}} is correct.",
    "Defines selective abstraction."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "A student who delivers a brilliant presentation receives nineteen praise comments and one constructive suggestion, but goes home feeling crushed, focusing exclusively on the one critique. Which cognitive distortion is this?", opts, c, s, 69))

# Q70: Overgeneralization (Beck Cognitive Distortion)
opts, c, s = rotate_options(
    "Drawing a sweeping, universal negative conclusion based on a single isolated event (e.g. 'I failed this quiz, so I will fail every exam in life')",
    ["Thinking strictly in black-and-white all-or-nothing terms", "Imagining that one is a divine cosmic being with supernatural powers", "Refusing to acknowledge the reality of a diagnosed medical illness"],
    "D",
    "Overgeneralization occurs when an individual takes a single negative event and views it as an unending pattern of defeat, using absolutist terms like 'always', 'never', or 'everyone' (e.g. 'One person rejected me, so everyone will always reject me').\nHence, Option {{CORR}} is correct.",
    "Defines overgeneralization."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "Which cognitive distortion involves making a sweeping, universal rule based on a single, isolated negative outcome?", opts, c, s, 70))

# Q71: All-or-None / Black-and-White Thinking
opts, c, s = rotate_options(
    "Viewing situations in rigid, absolute either-or categories with no middle ground (e.g. 'If I am not a total success, I am a complete failure')",
    ["Viewing situations through artistic colorful creative lenses", "Evaluating situations using complex statistical probability algorithms", "Experiencing auditory hallucinations of classical orchestral music"],
    "A",
    "All-or-none (dichotomous / black-and-white) thinking evaluates experiences in binary extremes: things are either perfect or worthless, brilliant or catastrophic, with zero tolerance for shades of gray.\nHence, Option {{CORR}} is correct.",
    "Defines all-or-none thinking."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "An employee tells herself: 'If my work is not 100% flawless, I am an absolute, worthless failure.' Which cognitive distortion does this statement demonstrate?", opts, c, s, 71))

# Q72: Flooding vs Systematic Desensitization Clinical Choice
opts, c, s = rotate_options(
    "Flooding produces rapid extinction but causes intense acute distress; Systematic Desensitization is gentler, more gradual, and better tolerated by phobic clients",
    ["Flooding is only used for depression, while Systematic Desensitization is for schizophrenia", "Flooding requires general anesthesia, while Systematic Desensitization requires surgery", "Both techniques are completely identical with zero difference in pacing or distress"],
    "B",
    "Clinically, Flooding is fast-acting but induces terrifying emotional distress that can lead to treatment dropout; Systematic Desensitization is gradual, gentle, paired with relaxation, and far more acceptable to patients.\nHence, Option {{CORR}} is correct.",
    "Compares clinical utility of flooding vs systematic desensitization."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "In clinical practice, why is Systematic Desensitization often preferred over in vivo Flooding for treating phobias?", opts, c, s, 72))

# Q73: Eclectic Psychotherapy
opts, c, s = rotate_options(
    "A flexible clinical approach where the therapist selects and integrates the best-suited techniques from diverse therapeutic systems tailored to the client's unique needs",
    ["A therapy where the therapist changes their physical clothes every fifteen minutes", "A therapy that rejects all science and relies entirely on ancient fortune-telling", "A therapy where the client is forced to take all existing psychiatric pills simultaneously"],
    "C",
    "Eclectic psychotherapy involves choosing and combining concepts and techniques from different therapeutic modalities (psychodynamic insight, behavioral conditioning, cognitive restructuring) to best fit the unique needs of a specific client.\nHence, Option {{CORR}} is correct.",
    "Defines eclectic psychotherapy."
)
add_q(make_question(CHAPTER, "Comparative Analysis of Therapies", "What is 'Eclectic Psychotherapy'?", opts, c, s, 73))

# Q74: Integrative Psychotherapy
opts, c, s = rotate_options(
    "A unified theoretical framework that synthesizes elements from different therapeutic models into a cohesive, holistic paradigm of human change",
    ["Randomly switching between different therapies without any plan or theory", "Administering medical surgery and psychiatric medications simultaneously", "Combining astrology with commercial corporate stock trading"],
    "D",
    "Unlike ad-hoc eclecticism, Integrative Psychotherapy blends concepts and methods from diverse systems (humanistic, cognitive, psychodynamic, behavioral) into an overarching, theoretically unified model of personality and psychological healing.\nHence, Option {{CORR}} is correct.",
    "Differentiates integrative psychotherapy from casual eclecticism."
)
add_q(make_question(CHAPTER, "Comparative Analysis of Therapies", "How does 'Integrative Psychotherapy' differ conceptually from casual eclecticism?", opts, c, s, 74))

# Q75: Statement on Electroconvulsive Therapy (ECT)
add_q(make_statement_question(
    CHAPTER, "Biomedical Therapy",
    "Modern Electroconvulsive Therapy (ECT) is administered under short-acting general anesthesia and muscle relaxants to prevent motor seizures and bone fractures.",
    "ECT is recognized as the fastest and most effective biological treatment for severe, life-threatening, medication-resistant depression with imminent suicide risk.",
    1, "A",
    "Both statements are correct. Modern modified ECT uses anesthesia and succinylcholine (muscle relaxant) to ensure patient safety and is clinically proven to be the most rapidly effective intervention for severe refractory depression and acute suicidal emergencies.",
    "Validates safety protocols and clinical indications of modern ECT."
))

# Q76: Unilateral vs Bilateral ECT
opts, c, s = rotate_options(
    "Unilateral ECT applies electrodes to one side of the head (typically non-dominant hemisphere) to reduce memory side-effects; Bilateral ECT applies electrodes to both temples",
    ["Unilateral ECT uses cold water, while Bilateral ECT uses boiling water", "Unilateral ECT is for children only, while Bilateral ECT is for animals only", "Both procedures are completely identical with zero difference in electrode placement"],
    "A",
    "In modified ECT: Unilateral placement applies electrodes to the non-dominant (usually right) hemisphere to minimize post-ictal confusion and retrograde memory loss; Bilateral placement stimulates both hemispheres and is slightly more potent.\nHence, Option {{CORR}} is correct.",
    "Distinguishes unilateral from bilateral ECT."
)
add_q(make_question(CHAPTER, "Biomedical Therapy", "In administering Electroconvulsive Therapy (ECT), what is the difference between 'unilateral' and 'bilateral' electrode placement?", opts, c, s, 76))

# Q77: Vipassana Meditation in Psychotherapy
opts, c, s = rotate_options(
    "A mindfulness practice of non-judgmental observation of bodily sensations, thoughts, and emotions, cultivating detachment and equanimity",
    ["A high-speed verbal debating technique used to argue against political opponents", "A physical exercise involving holding heavy iron dumbbells for hours", "A method of rapidly memorizing long sequences of financial accounting digits"],
    "B",
    "Vipassana (insight meditation) is an ancient mindfulness practice where practitioners cultivate detached, non-judgmental awareness of fleeting physical sensations and thoughts, breaking habitual reactivity and fostering emotional equanimity.\nHence, Option {{CORR}} is correct.",
    "Describes Vipassana meditation."
)
add_q(make_question(CHAPTER, "Alternative Therapies", "In clinical and alternative therapy, what does the practice of 'Vipassana' meditation cultivate?", opts, c, s, 77))

# Q78: Pranayama and Autonomic Regulation
opts, c, s = rotate_options(
    "Yogic controlled breathing exercises (e.g. alternate nostril breathing) that enhance parasympathetic vagal tone and down-regulate sympathetic hyperarousal",
    ["Physical surgical cutting of nasal breathing passages to increase air speed", "Consuming hot spicy beverages to accelerate cardiac heart rate", "Holding breath until the individual faints from oxygen deprivation"],
    "C",
    "Pranayama consists of structured yogic breathing exercises (such as Nadi Shodhana / alternate nostril breathing) that stimulate the vagus nerve, increase heart rate variability, and reduce sympathetic anxiety.\nHence, Option {{CORR}} is correct.",
    "Explains the physiological mechanism of Pranayama."
)
add_q(make_question(CHAPTER, "Alternative Therapies", "How does the practice of 'Pranayama' (yogic breath regulation) impact autonomic nervous system activity?", opts, c, s, 78))

# Q79: Client-Centred Therapy: Reflection of Feelings
opts, c, s = rotate_options(
    "The therapist mirrors, paraphrases, and restates the emotional essence of what the client expressed, validating the client's internal experience",
    ["The therapist tells the client how foolish their emotions are", "The therapist reveals personal secrets from their own private marriage", "The therapist records the client's voice and plays it backwards"],
    "D",
    "Reflection of feelings is a hallmark skill in Rogerian person-centered therapy: the therapist listens deeply and mirrors back the emotional core of the client's statements (e.g. 'It sounds like you felt deeply betrayed and alone'), facilitating emotional self-acceptance.\nHence, Option {{CORR}} is correct.",
    "Defines reflection of feelings in Client-Centred Therapy."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "In Client-Centred Therapy, what does the technique of 'Reflection of Feelings' involve?", opts, c, s, 79))

# Q80: Transference as a Therapeutic Tool
opts, c, s = rotate_options(
    "It allows the therapist to directly observe and interpret the client's unconscious relational patterns and childhood conflicts as they are actively reenacted in the room",
    ["It enables the therapist to borrow money from the client without interest", "It provides an opportunity for the therapist to marry the client legally", "It allows the client to take over the psychiatric practice and prescribe drugs"],
    "A",
    "Transference is not an obstacle but the primary vehicle of psychoanalytic cure: because the client reenacts unconscious relational dynamics live with the therapist, the therapist can interpret and resolve these conflicts in real time.\nHence, Option {{CORR}} is correct.",
    "Explains why transference is the central therapeutic vehicle in psychoanalysis."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "Why is 'transference' considered the most vital therapeutic tool in psychoanalysis rather than a hindrance?", opts, c, s, 80))

# Q81: Countertransference
opts, c, s = rotate_options(
    "The therapist's unconscious emotional reactions, feelings, and projections toward the client, which must be recognized and managed through personal therapy",
    ["The client's refusal to attend therapy sessions on Monday mornings", "The physical electrical current that flows through an ECT machine", "The financial bill sent by an insurance company to a patient"],
    "B",
    "Countertransference refers to the therapist's own emotional reactions, biases, and projections directed toward the client; ethical practice demands that therapists undergo personal analysis and supervision to maintain clinical objectivity.\nHence, Option {{CORR}} is correct.",
    "Defines countertransference."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "In psychodynamic therapy, what does 'countertransference' refer to?", opts, c, s, 81))

# Q82: Rational Emotive Behaviour Therapy vs Beck's Cognitive Therapy
opts, c, s = rotate_options(
    "REBT is more confrontational, philosophical, and focuses on disputing irrational 'musts'; Beck's CBT is more collaborative, empirical, and tests automatic thoughts as hypotheses",
    ["REBT uses surgical operations, while Beck's CBT uses animal conditioning", "REBT only treats children, while Beck's CBT only treats retired adults", "Both therapies are completely identical with zero difference in style or theory"],
    "C",
    "While both are cognitive therapies: Ellis's REBT is highly direct, philosophical, and confronts core dogmatic 'musts'; Beck's Cognitive Therapy emphasizes collaborative empiricism, guided Socratic discovery, and hypothesis-testing of specific automatic thoughts.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Ellis's REBT from Beck's Cognitive Therapy."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "What is the primary difference in therapeutic style between Albert Ellis's REBT and Aaron Beck's Cognitive Therapy?", opts, c, s, 82))

# Q83: Existential Vacuum (Frankl)
opts, c, s = rotate_options(
    "A state of profound inner emptiness, boredom, and lack of life purpose, leading to apathy, depression, and addiction",
    ["A physical vacuum chamber used by astronauts to train for outer space", "A clinical state where an individual cannot breathe air through the nose", "A psychological condition where an individual forgets how to speak language"],
    "D",
    "Viktor Frankl described the 'existential vacuum' as an pervasive feeling of total meaninglessness, aimlessness, and emptiness in modern life, which frequently masquerades as depression, aggression, or substance addiction.\nHence, Option {{CORR}} is correct.",
    "Defines Frankl's existential vacuum."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "In Viktor Frankl's existential framework, what does the 'existential vacuum' refer to?", opts, c, s, 83))

# Q84: Here-and-Now Awareness in Gestalt Therapy
opts, c, s = rotate_options(
    "Focusing attention on immediate present sensations, bodily feelings, and current experiences rather than ruminating on past events or future worries",
    ["Calculating the exact mathematical time of day using an atomic clock", "Writing down a detailed autobiographical diary of early infant memories", "Reading classical historical accounts of ancient Greek military battles"],
    "A",
    "Gestalt therapy is rooted in the 'here and now': Fritz Perls maintained that psychological growth occurs only in present awareness; clients are encouraged to experience what they are feeling right now in their bodies rather than talking about the past.\nHence, Option {{CORR}} is correct.",
    "Explains here-and-now awareness in Gestalt therapy."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "Why does Fritz Perls' Gestalt Therapy place immense emphasis on 'here-and-now' awareness?", opts, c, s, 84))

# Q85: Assertion-Reason on Behaviour Therapy Efficacy
add_q(make_assertion_question(
    CHAPTER, "Behaviour Therapy",
    "Behaviour therapy is particularly effective in treating phobias, obsessive-compulsive rituals, and childhood conduct problems.",
    "Behavioural techniques target specific observable maladaptive responses directly through measurable conditioning procedures.",
    1, "A",
    "Both (A) and (R) are true, and (R) is the correct explanation of (A). Because behaviour therapy operates directly on modifying observable target behaviours through systematic empirical protocols (exposure, desensitization, reinforcement), it demonstrates exceptional efficacy in treating phobias and OCD.",
    "Validates the clinical efficacy and mechanism of behaviour therapy."
))

# Q86: Mindfulness-Based Cognitive Therapy (MBCT)
opts, c, s = rotate_options(
    "Integrates cognitive therapy principles with mindfulness meditation to help clients observe depressive thoughts without getting entangled in them, preventing depressive relapse",
    ["Administers high doses of tranquilizers to put patients into peaceful sleep", "Exposes patients to full-strength feared stimuli without any warning", "Analyzes childhood psychosexual dreams on a Freudian couch for five years"],
    "B",
    "Mindfulness-Based Cognitive Therapy (MBCT) combines cognitive restructuring with mindfulness practices, teaching individuals to relate mindfully to negative thoughts as passing mental events rather than absolute facts, dramatically reducing relapse in depression.\nHence, Option {{CORR}} is correct.",
    "Defines Mindfulness-Based Cognitive Therapy (MBCT)."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "What is the primary clinical objective of Mindfulness-Based Cognitive Therapy (MBCT)?", opts, c, s, 86))

# Q87: Disulfiram (Antabuse) in Aversive Conditioning
opts, c, s = rotate_options(
    "A drug that blocks the metabolism of alcohol, causing severe nausea, vomiting, and tachycardia if alcohol is ingested, establishing a conditioned aversion",
    ["A sleeping medication that cures insomnia within ten minutes", "A vitamin supplement that increases appetite in anorexic patients", "An antidepressant that selectively blocks serotonin reuptake"],
    "C",
    "Disulfiram (Antabuse) blocks acetaldehyde dehydrogenase; if a patient drinks alcohol while on disulfiram, acetaldehyde accumulates rapidly, producing violent nausea, flushing, and vomiting, creating a powerful aversive conditioning deterrent.\nHence, Option {{CORR}} is correct.",
    "Explains the pharmacological mechanism of Disulfiram in aversive conditioning."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "In the aversive conditioning of chronic alcoholism, how does the pharmacological agent Disulfiram (Antabuse) function?", opts, c, s, 87))

# Q88: Multi-statement question on Therapeutic Alliance
add_q(make_multi_statement_question(
    CHAPTER, "Nature of Psychotherapy",
    "Which of the following statements regarding the 'Therapeutic Alliance' are correct?",
    [
        ("A", "It is founded on mutual trust, warmth, and genuine commitment to therapeutic goals"),
        ("B", "It is strictly a contractual, confidential relationship with defined professional boundaries"),
        ("C", "Research shows the quality of the therapeutic alliance is a major predictor of therapy success across all modalities"),
        ("D", "It requires the therapist to become a close personal friend and business partner of the client")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements (A), (B), and (C) accurately describe the therapeutic alliance and its empirical importance in psychotherapy. Statement (D) is false and violates professional ethics against dual relationships.",
    "Evaluates statements on the therapeutic alliance."
))

# Q89: Relaxation Training in Systematic Desensitization
opts, c, s = rotate_options(
    "Acts as an unconditioned response incompatible with anxiety, physiologically inhibiting sympathetic hyperarousal during visualization",
    ["Hypnotizes the client so they become completely amnesic to all phobias", "Physically numbs the vocal cords so the client cannot scream", "Causes the client to fall asleep and dream about the feared stimulus"],
    "A",
    "In Wolpe's systematic desensitization, relaxation training (usually progressive muscle relaxation) provides a physiological state of parasympathetic dominance that actively counter-conditions and inhibits sympathetic anxiety arousal.\nHence, Option {{CORR}} is correct.",
    "Explains the role of relaxation training in systematic desensitization."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "Why is thorough training in progressive muscle relaxation an essential prerequisite in Joseph Wolpe's Systematic Desensitization?", opts, c, s, 89))

# Q90: Working Through in Psychoanalysis
opts, c, s = rotate_options(
    "The repeated, gradual process of examining how unconscious conflicts manifest across multiple areas of current life, transforming intellectual insight into permanent behavioral change",
    ["Forcing the client to perform heavy physical yard work at the therapist's house", "Taking a written final exam on the complete works of Sigmund Freud", "Hypnotizing the client every morning to ensure perfect moral conduct"],
    "B",
    "Working through is the lengthy, critical phase of psychoanalysis following initial insight, where patient and therapist repeatedly confront and resolve how unconscious resistances and defense mechanisms manifest across daily relationships.\nHence, Option {{CORR}} is correct.",
    "Defines working through in psychoanalysis."
)
add_q(make_question(CHAPTER, "Psychodynamic Therapy", "In classical psychoanalysis, what does the prolonged phase of 'Working Through' accomplish?", opts, c, s, 90))

# Q91: Token Economy Backup Reinforcers
opts, c, s = rotate_options(
    "The actual desirable goods, privileges, or activities (e.g. outings, games, special treats) that clients purchase with earned tokens",
    ["The physical plastic tokens themselves kept inside bank deposit boxes", "The punishment of being confined to solitary bedrooms for minor errors", "The clinical diagnostic report written by the consulting psychiatrist"],
    "C",
    "In a token economy, tokens have no intrinsic value; their reinforcing power comes entirely from their exchangeability for 'backup reinforcers'—real privileges, activities, or goods that the client genuinely values.\nHence, Option {{CORR}} is correct.",
    "Defines backup reinforcers in token economy."
)
add_q(make_question(CHAPTER, "Behaviour Therapy", "In an institutional Token Economy, what are 'backup reinforcers'?", opts, c, s, 91))

# Q92: Unconditional Positive Regard Non-Possessive Nature
opts, c, s = rotate_options(
    "The therapist accepts the client unconditionally as a worthy person without approving of every destructive behaviour or imposing personal control",
    ["The therapist legally adopts the client as a biological son or daughter", "The therapist agrees with and encourages criminal illegal actions committed by the client", "The therapist gives all their private financial savings to the client"],
    "D",
    "Carl Rogers emphasized that unconditional positive regard is 'non-possessive warmth': accepting the client's personhood unconditionally, without judging or controlling them, while distinguishing between valuing the person and evaluating their specific behaviors.\nHence, Option {{CORR}} is correct.",
    "Explains non-possessive warmth in unconditional positive regard."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "In Client-Centred Therapy, how is 'Unconditional Positive Regard' distinguished from endorsing or approving harmful behaviors?", opts, c, s, 92))

# Q93: Gestalt Therapy 'Unfinished Business'
opts, c, s = rotate_options(
    "Unexpressed emotional resentments, grief, or guilt from past relationships that linger in the background and interfere with present-day functioning",
    ["Unpaid monetary utility bills that have not been delivered by mail", "Uncompleted homework assignments in high school algebra classes", "Incomplete physical construction of an architectural brick house"],
    "A",
    "In Gestalt therapy, 'unfinished business' refers to unexpressed feelings (such as resentment, rage, grief, or unexpressed love) lingering from past relationships that clutter present awareness and prevent authentic contact.\nHence, Option {{CORR}} is correct.",
    "Defines unfinished business in Gestalt therapy."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "What does the concept of 'unfinished business' signify in Fritz Perls' Gestalt Therapy?", opts, c, s, 93))

# Q94: Rational Emotive Imagery in REBT
opts, c, s = rotate_options(
    "The client vividly imagines a worst-case stressful scenario, experiences intense unhealthy distress, and then consciously shifts their feelings into healthy negative emotions (e.g. from terror to concern)",
    ["The client paints pictures of relaxing mountain landscapes using oil colors", "The client is hypnotized into believing that exams do not exist physically", "The client takes an oral examination testing mathematical multiplication"],
    "B",
    "Rational Emotive Imagery (REI) is an emotive technique in REBT where clients imagine a catastrophic event, feel acute unhealthy emotions (panic, despair), and practice changing their internal self-talk to produce healthy negative emotions (concern, sadness).\nHence, Option {{CORR}} is correct.",
    "Describes Rational Emotive Imagery in REBT."
)
add_q(make_question(CHAPTER, "Cognitive Therapy", "How does the technique of 'Rational Emotive Imagery' operate in Albert Ellis's REBT?", opts, c, s, 94))

# Q95: Community-Based Mental Health Services
opts, c, s = rotate_options(
    "Delivering mental health care, crisis support, and rehabilitation within local community settings to avoid the dehumanization of long-term asylum confinement",
    ["Locking all psychiatric patients inside remote isolated island prisons", "Banning all psychiatric medications and relying entirely on fortune-telling", "Requiring all psychiatric patients to live in solitary hospital rooms permanently"],
    "C",
    "Community-based mental health emphasizes providing outpatient care, crisis hotlines, day-care centers, and rehabilitation within the client's home community, preventing institutionalization and promoting social reintegration.\nHence, Option {{CORR}} is correct.",
    "Defines community-based mental health."
)
add_q(make_question(CHAPTER, "Rehabilitation of the Mentally Ill", "What is the primary philosophy underlying 'Community-Based Mental Health' services?", opts, c, s, 95))

# Q96: Congruence / Genuineness in Rogers' Theory
opts, c, s = rotate_options(
    "The therapist is authentic, transparent, and integrated in the relationship, whose verbal statements match their true internal feelings",
    ["The therapist wears expensive formal suits to display professional authority", "The therapist pretends to be all-knowing and never admits any confusion", "The therapist behaves like an unfeeling neutral machine with zero emotion"],
    "D",
    "Congruence (genuineness) in person-centered therapy means the therapist is genuinely themselves during the session—open, transparent, and authentic, with no professional facade or phoniness.\nHence, Option {{CORR}} is correct.",
    "Defines congruence/genuineness in Client-Centred Therapy."
)
add_q(make_question(CHAPTER, "Humanistic-Existential Therapy", "In Client-Centred Therapy, what does the condition of therapist 'Congruence' (or Genuineness) demand?", opts, c, s, 96))

# Q97: Statement on Antidepressant Lag Time
add_q(make_statement_question(
    CHAPTER, "Biomedical Therapy",
    "Antidepressant medications typically require two to four weeks of continuous daily administration before therapeutic clinical improvement manifests.",
    "Antidepressant medications produce instant euphoria and cure major depression within fifteen minutes of swallowing the first tablet.",
    3, "C",
    "Statement I is correct: Antidepressants (SSRIs, TCAs) produce immediate neurochemical changes, but downstream neuroplastic adaptation takes 2 to 4 weeks for clinical mood elevation to emerge. Statement II is false; antidepressants do not act instantaneously like stimulants.",
    "Accurately evaluates pharmacological lag time in antidepressant treatment."
))

# Q98: Electroconvulsive Therapy Side Effects
opts, c, s = rotate_options(
    "Transient post-treatment confusion and temporary retrograde amnesia for events occurring shortly before and during the treatment period",
    ["Permanent loss of all long-term autobiographical memories from birth", "Physical blindness and permanent loss of the ability to speak any words", "Growth of additional skeletal bones in the fingers and toes"],
    "A",
    "The primary documented side effects of modern modified ECT are temporary post-ictal confusion, headache, and mild transient retrograde amnesia (usually resolving within weeks to months following treatment completion).\nHence, Option {{CORR}} is correct.",
    "Identifies typical side effects of modern modified ECT."
)
add_q(make_question(CHAPTER, "Biomedical Therapy", "What are the recognized transient side effects associated with modern modified Electroconvulsive Therapy (ECT)?", opts, c, s, 98))

# Q99: Transdiagnostic Factors in Psychotherapy
opts, c, s = rotate_options(
    "Underlying core cognitive and emotional mechanisms (e.g. emotional dysregulation, perfectionism, rumination) that span across multiple diagnostic categories",
    ["Specific genetic chromosomes that only cause physical skin freckles", "Standardized questions printed on commercial multiple-choice tests", "The legal financial fee charged by private counseling clinics"],
    "B",
    "Transdiagnostic approaches focus on underlying psychological mechanisms (such as rumination, perfectionism, avoidance, anxiety sensitivity) that cut across traditional diagnostic boundaries like anxiety, depression, and eating disorders.\nHence, Option {{CORR}} is correct.",
    "Defines transdiagnostic factors in clinical psychology."
)
add_q(make_question(CHAPTER, "Comparative Analysis of Therapies", "In contemporary psychotherapy research, what are 'transdiagnostic factors'?", opts, c, s, 99))

# Q100: Synthesis of Psychotherapeutic Efficacy
opts, c, s = rotate_options(
    "Evidence-based psychotherapy combines scientifically validated techniques tailored to the disorder with a strong, compassionate therapeutic alliance",
    ["Therapy should be conducted solely by guessing what medicines to prescribe randomly", "Therapy can only work if the client is subjected to severe physical punishment", "Psychotherapy has zero documented scientific efficacy and should be completely abolished"],
    "A",
    "Extensive clinical trials confirm that evidence-based psychotherapy combines specific validated protocols tailored to the condition with the potent nonspecific healing power of a genuine, empathic therapeutic alliance.\nHence, Option {{CORR}} is correct.",
    "Synthesizes evidence-based psychotherapy efficacy."
)
add_q(make_question(CHAPTER, "Nature of Psychotherapy", "What represents the consensus view of contemporary clinical science regarding the efficacy of psychotherapy?", opts, c, s, 100))

# Validate and dump
assert len(unit5_qs) == 100, f"Expected 100 questions for Unit 5, got {len(unit5_qs)}"
os.makedirs("mock/psy_units", exist_ok=True)
out_path = "mock/psy_units/unit5.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(unit5_qs, f, indent=2, ensure_ascii=False)

print(f"Successfully generated and saved all 100 questions for Unit 5 to {out_path}!")

