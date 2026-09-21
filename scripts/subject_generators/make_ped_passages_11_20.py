import sys, os

out_path = "scripts/subject_generators/ped_passages_11_20.py"

content = '''import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# Mock 11
P1_M11_TXT = (
    "Read the following excerpt on personality typology in sports psychology and answer the questions that follow:\\n\\n"
    "Sports psychologists utilize psychological profiling to understand athletic behavior and optimize coaching strategies. "
    "Under Carl Jung's personality typology, athletes are characterized along an introversion-extraversion spectrum. "
    "Introverted athletes tend to be reflective, internally focused, and thrive in solitary, closed-skill sports requiring high concentration, "
    "such as Olympic archery, target shooting, and marathon running. Conversely, extroverted athletes are energetic, sociable, and stimulated "
    "by high-arousal team environments like football, basketball, and rugby. In contemporary sports science, the Big Five Personality model "
    "(OCEAN: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism) is widely used. Researchers consistently find that elite "
    "competitors score exceptionally high in Conscientiousness (meticulous discipline and training adherence) and low in Neuroticism (high emotional stability "
    "and calmness under high-stakes competitive pressure)."
)
P1_M11_QS = [
    case_q("Psychology and Sports", "Jungian Introvert Athletic Traits",
     "According to the excerpt, which sporting environments are best suited to Introverted athletes?",
     "Closed-skill, solitary sports demanding sustained internal concentration (e.g., archery, shooting, marathon running)",
     ["Loud, high-contact team sports with non-stop chaotic interaction", "Performing solo synchronized swimming routines in front of 100,000 shouting fans", "Acting as a football stadium announcer"],
     "Introverted athletes thrive in internally focused, individual, self-paced sports requiring intense concentration."),
    case_q("Psychology and Sports", "Big Five Traits in Elite Champions",
     "Which two Big Five personality traits are consistently observed at exceptional levels in elite international champions?",
     "High Conscientiousness (rigorous discipline) and Low Neuroticism (high emotional stability)",
     ["High Neuroticism and Low Conscientiousness", "Zero Openness and High Aggressiveness", "High Extraversion with complete absence of Agreeableness"],
     "Elite athletic excellence requires high conscientiousness for rigorous training and low neuroticism to stay calm under intense pressure."),
    case_q("Psychology and Sports", "Extrovert Athlete Stimulation Preference",
     "Why do highly Extroverted athletes excel in dynamic team sports like rugby and basketball?",
     "They are energized by social interaction, rapid verbal communication, and elevated sensory arousal from teammates and crowds",
     ["They require total silence to breathe properly", "They refuse to share the ball with any other player", "They prefer running in empty forests at midnight alone"],
     "Extroverts draw motivational energy from interpersonal dynamics and stimulating team sports environments."),
    case_q("Psychology and Sports", "Carl Jung's Ambivert Concept",
     "How is an 'Ambivert' defined in sports personality assessment?",
     "An adaptable athlete possessing a balanced mixture of introverted and extroverted characteristics",
     ["A person who suffers from complete loss of physical coordination", "An athlete who can play only while asleep", "A player who is permanently disqualified from sports"],
     "Ambiverts combine introverted focus with extroverted social fluency, exhibiting flexible adaptability across sporting roles."),
    case_q("Psychology and Sports", "Conscientiousness Role in Diet and Training",
     "How does high 'Conscientiousness' directly manifest in an athlete's everyday lifestyle?",
     "Meticulous adherence to prescribed nutrition, structured sleep hygiene, punctuality, and unwavering dedication to training drills",
     ["Constantly breaking team rules and skipping practice", "Refusing to train unless paid cash daily", "Relying purely on genetic luck without practicing"],
     "Conscientiousness drives daily diligence, dietary discipline, organized preparation, and consistent work ethic.")
]

P2_M11_TXT = (
    "Read the following excerpt on athletic motivation and goal setting and answer the questions that follow:\\n\\n"
    "Motivation is the internal psychological force that energizes, directs, and sustains human athletic behavior. "
    "Deci and Ryan's Self-Determination Theory distinguishes between 'Intrinsic Motivation' (engaging in sports for inherent joy, challenge, "
    "and self-actualization) and 'Extrinsic Motivation' (participating to obtain external rewards like prize money, trophies, fame, or to avoid coach punishment). "
    "While extrinsic incentives can boost short-term effort, intrinsic motivation is the essential foundation for lifelong sports adherence and resilience. "
    "To structure motivation effectively, sports psychologists implement SMART goal-setting (Specific, Measurable, Achievable, Relevant, and Time-bound). "
    "Furthermore, athletes are coached to prioritize 'Process Goals' (executing specific mechanical techniques) and 'Performance Goals' (achieving personal time standards) "
    "over 'Outcome Goals' (winning the match), because outcome goals depend partly on opponent capability and cause excessive competitive anxiety."
)
P2_M11_QS = [
    case_q("Psychology and Sports", "Intrinsic Motivation Defining Hallmark",
     "What is the foundational hallmark of 'Intrinsic Motivation' in sports?",
     "Participating purely for the inherent enjoyment, personal mastery, challenge, and love of the activity itself",
     ["Competing exclusively to win luxury sports cars and cash prizes", "Playing only because parents threaten severe punishment", "Training only when television cameras are filming"],
     "Intrinsic motivation is self-determined, driven by internal joy, competence, and passion for the sport."),
    case_q("Psychology and Sports", "Hazard of Relying Exclusively on Extrinsic Rewards",
     "What psychological drawback occurs when an athlete is driven solely by Extrinsic Motivation?",
     "Motivation collapses when rewards are removed, and vulnerability to competitive anxiety and burnout increases",
     ["The athlete runs 50% faster in every race", "The athlete becomes immune to all physical injuries", "The athlete forgets their own name"],
     "Pure extrinsic motivation is fragile; if trophies or praise cease, participation wanes and anxiety surges."),
    case_q("Psychology and Sports", "SMART Goal Framework Meaning",
     "In scientific athletic goal-setting, what do the letters in the acronym 'SMART' stand for?",
     "Specific, Measurable, Achievable, Relevant, and Time-bound",
     ["Simple, Moderate, Aggressive, Radical, and Tough", "Speed, Muscle, Agility, Power, and Reaction", "Secret, Meaningful, Ancient, Rigid, and Timeless"],
     "SMART establishes specific targets, measurable metrics, achievable scope, relevant purpose, and a definite timeframe."),
    case_q("Psychology and Sports", "Process Goals Superiority Over Outcome Goals",
     "Why do sports psychologists recommend focusing primarily on 'Process Goals' rather than 'Outcome Goals'?",
     "Process goals are 100% under the athlete's direct control and reduce competitive anxiety by focusing attention on technical execution",
     ["Outcome goals are strictly illegal under Olympic regulations", "Process goals guarantee that the athlete will never lose a match", "Outcome goals cannot be measured with numbers"],
     "Outcome goals depend on opponents and referees, elevating stress; process goals focus purely on controllable personal technique."),
    case_q("Psychology and Sports", "Example of a Process Goal in Tennis",
     "Which of the following represents an authentic 'Process Goal' for a tennis player?",
     "'Tuck the chin, bend knees to 90 degrees, and follow through high on every first serve'",
     ["'Win the Wimbledon Championship trophy this afternoon'", "'Defeat the opponent 6-0, 6-0 in under 30 minutes'", "'Become the wealthiest tennis player in the world"],
     "Process goals focus on precise biomechanical execution cues under direct personal control during play.")
]

# Mock 12
P1_M12_TXT = (
    "Read the following excerpt on aggression in competitive athletics and answer the questions that follow:\\n\\n"
    "Aggression in sports is a complex psychological construct requiring clear differentiation between harmful violence and assertive play. "
    "Sports psychologists categorize aggressive behavior into three distinct forms: (1) 'Hostile Aggression', where the primary intention is to cause "
    "physical or psychological injury to an opponent, driven by anger and accompanied by emotional arousal (e.g., throwing a punch after a foul); "
    "(2) 'Instrumental Aggression', where forceful behavior is used as a pragmatic instrument to achieve a non-injurious goal, such as securing the ball "
    "through a bone-jarring legal tackle in rugby, without the primary intent to injure; and (3) 'Assertive Behavior', which involves high-energy, "
    "forceful, and vigorous play strictly within the rules of the sport with zero intent to harm. "
    "The Frustration-Aggression hypothesis posits that goal blockage breeds frustration, which instigates aggressive drives. "
    "Conversely, Bandura's Social Learning Theory proves aggression is acquired through observing violent role models and seeing aggressive play rewarded."
)
P1_M12_QS = [
    case_q("Psychology and Sports", "Hostile vs Instrumental Primary Intent",
     "What is the key difference in 'intent' between Hostile Aggression and Instrumental Aggression?",
     "Hostile aggression has the primary intent to cause physical or psychological injury, whereas Instrumental aggression uses force to achieve a game objective",
     ["Hostile aggression is always legal, while Instrumental is banned", "Hostile aggression occurs only in water polo, while Instrumental occurs in tennis", "There is zero difference between them"],
     "Hostile aggression aims to harm accompanied by anger; instrumental aggression uses forceful means to win the ball or achieve a goal."),
    case_q("Psychology and Sports", "Assertive Behavior Boundaries",
     "What defines 'Assertive Behavior' on the playing field according to sports psychology?",
     "Forceful, determined, highly physical play executed strictly within the rules with no intent to cause harm",
     ["Intentionally kicking an opponent while the referee is looking away", "Refusing to touch the ball during the game", "Shouting verbal abuse at the opposing coach"],
     "Assertion is legitimate, spirited physical effort complying fully with rules and devoid of malicious intent to injure."),
    case_q("Psychology and Sports", "Frustration-Aggression Hypothesis Mechanism",
     "According to Dollard and Miller's Frustration-Aggression Hypothesis, what triggers the instigation to aggressive behavior?",
     "The blockage or thwarting of an athlete's goal-directed efforts (e.g., bad referee calls, trailing on scoreboard)",
     ["Drinking cold water during half-time", "Sleeping eight hours the night before the game", "Winning a championship trophy"],
     "Frustration results when goal attainment is blocked, generating emotional readiness for aggressive outbursts."),
    case_q("Psychology and Sports", "Social Learning Theory of Sports Violence",
     "According to Albert Bandura, how do young athletes acquire aggressive sporting behaviors?",
     "By observing televised professional athletes rewarded for violent tactics and being praised by coaches for aggressive play",
     ["Aggression is an infectious disease carried by mosquitoes", "Aggression is determined by the color of the jersey worn", "Aggression occurs only when an athlete has zero muscle mass"],
     "Social learning theory shows that violence is modeled from admired peers/pros and reinforced through competitive rewards."),
    case_q("Psychology and Sports", "Fallacy of the Catharsis Myth",
     "Why has the 'Catharsis Theory' (that acting aggressively vents pent-up aggression) been discredited in sports science?",
     "Empirical research proves that acting aggressively reinforces aggressive neural schemas, increasing future aggressive behaviors rather than draining them",
     ["Because humans have no physical emotions", "Because aggression makes athletes run 200% faster", "Because all sports rules ban physical contact"],
     "Engaging in aggression validates and reinforces aggressive habits, disproving the psychoanalytic idea of cathartic release.")
]

P2_M12_TXT = (
    "Read the following excerpt on psychological coping mechanisms and mental skills in sports and answer the questions that follow:\\n\\n"
    "Elite athletes implement structured mental skills training to manage acute competitive anxiety and prevent 'choking under pressure'. "
    "Choking occurs when high performance anxiety forces an athlete to revert from automated, fluid motor execution to conscious, step-by-step cognitive control. "
    "To counter this, athletes practice Robert Nideffer's 'Centering Technique', combining deep diaphragmatic abdominal breathing with muscle relaxation "
    "and directing attention to the physical center of gravity. Cognitive restructuring replaces debilitating negative self-talk ('I am going to fail') "
    "with instructional and constructive cues ('Smooth rhythm, follow through'). Furthermore, 'Mental Imagery' (neuromuscular visualization) primes motor pathways "
    "by mentally rehearsing perfect skill execution in vivid detail. Finally, Edmund Jacobson's Progressive Muscle Relaxation (PMR) trains athletes "
    "to systematically tense and relax muscle groups, fostering somatic awareness and eliminating excessive tension."
)
P2_M12_QS = [
    case_q("Psychology and Sports", "Mechanism of Choking Under Pressure",
     "What cognitive shift causes the phenomenon known as 'Choking under Pressure'?",
     "High anxiety shifts motor control from automated procedural memory to disruptive, conscious step-by-step cognitive monitoring",
     ["A sudden physical contraction of the windpipe preventing breathing", "A loss of 50% of the athlete\'s body weight in seconds", "The sports equipment breaking apart spontaneously"],
     "Choking occurs when pressure induces conscious reinvestment in automated movements, destroying motor fluency."),
    case_q("Psychology and Sports", "Centering Technique Execution",
     "What are the core operational components of Robert Nideffer's 'Centering Technique'?",
     "Deep diaphragmatic breathing, somatic muscle relaxation, and focusing conscious attention on the physical center of gravity",
     ["Sitting in the exact center of the field during live play", "Running backwards around the perimeter track", "Shouting loudly at the opposing bench"],
     "Centering grounds the athlete via deep abdominal breaths and directing internal awareness to the center of mass."),
    case_q("Psychology and Sports", "Mental Imagery Neuromuscular Basis",
     "Why does mental visualization of a motor skill enhance subsequent physical execution?",
     "Vivid mental rehearsal activates identical motor cortex pathways and elicits sub-threshold neuromuscular firing patterns in the target muscles",
     ["It alters the physical weight of sports equipment", "It eliminates the need for any physical practice on the field", "It freezes the opposing team in their tracks"],
     "Mental rehearsal activates the cortical motor schema and fires minute EMG potentials matching the imagined movement."),
    case_q("Psychology and Sports", "Progressive Muscle Relaxation (PMR) Protocol",
     "How does Edmund Jacobson's Progressive Muscle Relaxation protocol train somatic control?",
     "By systematically tensing specific muscle groups for 5–7 seconds followed by conscious, complete relaxation for 15–20 seconds",
     ["By lifting maximal barbells until the muscles tear", "By freezing the body in ice baths for two hours", "By holding breath until fainting"],
     "PMR cultivates discrimination between muscular contraction and relaxation, enabling voluntary release of excess tension."),
    case_q("Psychology and Sports", "Instructional Self-Talk Role",
     "When is 'Instructional Self-Talk' (e.g., 'smooth follow-through, eyes on the ball') most beneficial in sports?",
     "During the execution of complex technical motor tasks requiring precision, attentional focus, and movement coordination",
     ["Only while celebrating a victory after the match", "Only during deep nighttime sleep", "Never, because talking to oneself is strictly illegal"],
     "Instructional cues guide attentional focus and technical sequencing during fine motor tasks.")
]

# Mock 13
P1_M13_TXT = (
    "Read the following excerpt on Talent Identification and youth athlete development and answer the questions that follow:\\n\\n"
    "National sports development frameworks employ scientific Talent Identification (TID) to screen and nurture prospective athletic prodigies. "
    "TID batteries assess four primary pillars: anthropometric dimensions (height, arm span, somatotype), physiological capacities (aerobic power, speed, power), "
    "motor coordination, and psychological resilience. Sports scientists emphasize that scouts must evaluate 'Biological Age' (skeletal and somatic maturity) "
    "rather than relying strictly on 'Chronological Age'. During puberty, adolescents experience 'Peak Height Velocity' (PHV)—the phase of rapid longitudinal bone growth—"
    "which temporarily alters leverage, reduces flexibility, and induces temporary motor clumsiness ('adolescent awkwardness'). "
    "Furthermore, contemporary Long-Term Athlete Development (LTAD) models advocate 'Multi-Sport Sampling' rather than early single-sport specialization before age 12, "
    "fostering broad physical literacy and minimizing overuse injuries and emotional burnout."
)
P1_M13_QS = [
    case_q("Training in Sports", "Biological vs Chronological Age in TID",
     "Why must talent scouts evaluate 'Biological Age' rather than solely 'Chronological Age' in adolescent sports?",
     "Early-maturing youths often dominate competitions temporarily due to pubertal size and strength advantages, obscuring long-term talent in late bloomers",
     ["Chronological age determines what jersey number a player must wear", "Biological age can only be measured after an athlete turns 40", "Late-maturing children are legally barred from physical education"],
     "Somatic maturity varies widely; assessing biological age ensures late-maturing athletes with high long-term ceilings are not discarded."),
    case_q("Training in Sports", "Peak Height Velocity (PHV) Impact",
     "What physical phenomenon frequently accompanies 'Peak Height Velocity' in adolescent athletes?",
     "Rapid bone elongation altering biomechanical levers, tight tendons, and temporary motor clumsiness ('adolescent awkwardness')",
     ["An immediate 10-fold increase in running speed overnight", "Permanent ossification of all joint spaces", "The complete loss of lung capacity"],
     "During PHV, rapid trunk and limb growth outpaces muscular adaptation, causing transient deficits in coordination and flexibility."),
    case_q("Training in Sports", "Multi-Sport Sampling Before Age 12",
     "Why do modern Long-Term Athlete Development (LTAD) models promote multi-sport participation over early specialization?",
     "It builds diverse motor foundational skills, prevents chronic overuse injuries, and dramatically reduces psychological burnout",
     ["It makes athletes too tired to ever compete professionally", "Early specialization is prohibited by international sports law", "Multi-sport athletes never require sleep"],
     "Early diversification develops broad neuromuscular literacy, mitigates repetitive tissue stress, and sustains intrinsic motivation."),
    case_q("Training in Sports", "Anthropometric Profiling in TID",
     "Why are structural anthropometric measurements (such as arm span and limb ratios) heavily weighted in TID for swimming and basketball?",
     "Skeletal levers and proportions provide immutable biomechanical advantages that cannot be developed through training alone",
     ["Arm span indicates the intelligence quotient of the athlete", "Tall athletes always have better handwriting than short athletes", "Anthropometric data is used to calculate shoe prices"],
     "Skeletal dimensions (e.g., wide arm span, high leg-to-torso ratio) provide non-trainable mechanical leverage advantages in specific sports."),
    case_q("Training in Sports", "Psychological Resilience in Talent ID",
     "Why is psychological 'grit' and coachability increasingly recognized as a vital pillar in Talent Identification?",
     "Long-term elite progression requires enduring rigorous training plateaus, severe competitive setbacks, and rehabilitation from injuries",
     ["Grit allows athletes to play without drinking water", "Psychological grit replaces the need for physical strength", "Coachable athletes do not have to practice physical drills"],
     "Genetic physical talent without perseverance, resilience, and emotional stability rarely survives the grueling journey to elite international mastery.")
]

P2_M13_TXT = (
    "Read the following excerpt on annual training periodization and answer the questions that follow:\\n\\n"
    "Periodization is the systematic planning of athletic training to achieve peak competitive performance at designated major championships. "
    "Formulated by Soviet sports scientist Lev Pavlovich Matveyev, the annual periodized plan (Macrocycle) is divided into three major sequential phases: "
    "(1) Preparatory Phase (divided into General Preparatory, which emphasizes high training volume and low intensity to build aerobic and structural work capacity, "
    "and Specific Preparatory, which reduces volume and elevates intensity with sport-specific drills); (2) Competition Phase (focusing on tactical precision, "
    "low volume, maximum intensity, and a planned 1-to-3 week taper to dissipate accumulated fatigue); and (3) Transition Phase (3 to 4 weeks of active recovery, "
    "recreational cross-training, and psychological decompression). Within the macrocycle, training is organized into Mesocycles (3–6 weeks) and Microcycles (3–7 days)."
)
P2_M13_QS = [
    case_q("Training in Sports", "Three Major Phases of Macrocycle",
     "What are the three classical sequential phases comprising an annual sports periodization plan (Macrocycle)?",
     "Preparatory Phase, Competition Phase, and Transition Phase",
     ["Breakfast Phase, Lunch Phase, and Dinner Phase", "Warm-Up Phase, Workout Phase, and Cool-Down Phase", "Spring Phase, Summer Phase, and Winter Phase"],
     "Matveyev\'s annual macrocycle is divided into Preparatory (general and specific), Competition, and Transition phases."),
    case_q("Training in Sports", "General Preparatory Volume and Intensity",
     "What characterizes the volume and intensity dynamics during the General Preparatory Phase?",
     "High training volume with low-to-moderate training intensity to build broad physiological work capacity",
     ["Minimal training volume with 100% maximal competitive intensity", "Zero physical training with total bed rest", "High intensity sprinting with zero aerobic conditioning"],
     "General prep builds the physiological base through high volume and moderate intensity before high-intensity sport drills begin."),
    case_q("Training in Sports", "Tapering Objective in Competition Phase",
     "What is the primary physiological purpose of 'Tapering' during the pre-competition phase?",
     "Reducing training volume while maintaining intensity to dissipate cumulative fatigue and unmask peak athletic performance",
     ["Doubling the training load the night before the race to induce exhaustion", "Stopping all water and food intake before the match", "Sleeping for 72 hours continuously in a dark room"],
     "Tapering allows physiological recovery while maintaining adaptations, elevating competitive readiness to its peak."),
    case_q("Training in Sports", "Transition Phase Purpose",
     "What is the correct protocol and purpose of the Transition Phase following a major sports season?",
     "Active recovery and recreational cross-training to restore physical tissues and provide psychological regeneration",
     ["Complete sedentary bed rest without standing up for two months", "Immediately beginning another maximal competition schedule", "Fasting for three weeks without nutrition"],
     "Transition facilitates physical and psychological regeneration through active, low-stress recreational cross-training."),
    case_q("Training in Sports", "Microcycle Standard Duration",
     "What is the standard time duration of a 'Microcycle' in sports periodization science?",
     "3 to 7 days (typically 1 week)",
     ["1 month to 3 months", "Several months to a full calendar year", "1 hour of workout time"],
     "A microcycle is the shortest periodization block, traditionally spanning 3 to 7 days (usually a 1-week training unit).")
]

# Mock 14
P1_M14_TXT = (
    "Read the following excerpt on methods of developing muscular strength and answer the questions that follow:\\n\\n"
    "Strength conditioning science classifies exercise modalities into Isometric, Isotonic, and Isokinetic training based on muscle contraction dynamics. "
    "In 'Isometric Exercise' (developed by Hettinger and Müller in 1953), muscle tension increases without any visible change in muscle length or joint angle "
    "(static contraction, such as pushing against an immovable wall or holding a plank). Isometric training develops strength primarily at the specific angle trained. "
    "In 'Isotonic Exercise' (pioneered by Thomas De Lorme in 1945), muscle tension produces joint movement through changing muscle lengths, divided into Concentric "
    "(muscle shortens while overcoming load) and Eccentric (muscle lengthens under tension to decelerate load). Eccentric contractions produce greater muscle micro-damage "
    "and potent hypertrophic signaling. In 'Isokinetic Exercise' (invented by J.J. Perrine in 1968), specialized electromechanical dynamometers (Cybex, Biodex) "
    "provide accommodating resistance at a constant, fixed angular velocity throughout the full range of motion."
)
P1_M14_QS = [
    case_q("Training in Sports", "Isometric Contraction Defining Feature",
     "What defines an 'Isometric' muscle contraction according to exercise science?",
     "Muscular tension is generated without any change in muscle length or joint displacement (static hold)",
     ["The muscle contracts while spinning in 360-degree circles", "The muscle lengthens rapidly under zero load", "The joint angle changes continuously at constant speed"],
     "Isometric exercise involves static tension where internal muscle force balances external resistance with zero joint motion."),
    case_q("Training in Sports", "Isokinetic Accommodating Speed Mechanism",
     "How does 'Isokinetic Exercise' differ fundamentally from Isotonic and Isometric training?",
     "It maintains a constant, pre-set angular velocity throughout the full range of motion using accommodating machine resistance",
     ["It involves holding an immovable wall for ten minutes", "It is performed purely underwater without any equipment", "It requires lifting weights that change weight every second"],
     "Isokinetic machines maintain constant angular speed, matching resistance dynamically to the athlete\'s exerted force across ROM."),
    case_q("Training in Sports", "Concentric vs Eccentric Actions",
     "In isotonic weightlifting, what occurs during the 'Concentric' phase compared to the 'Eccentric' phase?",
     "Concentric action shortens the muscle while generating force; Eccentric action lengthens the muscle under tension",
     ["Concentric action occurs only during sleep; Eccentric occurs during sprint", "Concentric action freezes the joint; Eccentric dissolves the bone", "There is zero difference between them"],
     "Concentric action overcomes load by shortening; eccentric action resists and decelerates load while lengthening under tension."),
    case_q("Training in Sports", "Hettinger and Müller Isometric Angle Specificity",
     "What key physiological limitation did Hettinger and Müller identify regarding Isometric strength development?",
     "Strength gains are largely angle-specific, occurring within ±15 degrees of the specific joint angle held during training",
     ["Isometrics cause the heart to stop beating permanently", "Isometrics turn muscle fibers into liquid adipose fat", "Isometrics work only on children under 5 years of age"],
     "Isometric strength adaptations are confined to the trained joint angle, necessitating multi-angle holds to develop full-range strength."),
    case_q("Training in Sports", "Eccentric Contractions and Hypertrophy",
     "Why do eccentric muscle actions (e.g., lowering phase of a squat or bicep curl) trigger potent muscle hypertrophy?",
     "High mechanical tension per active cross-bridge causes structural sarcomere micro-tears, triggering satellite cell proliferation and protein remodeling",
     ["Eccentric contractions produce zero force in the muscle", "Eccentric contractions freeze blood flow completely", "Eccentric contractions convert bones into muscle fibers"],
     "Forced lengthening under load produces mechanical micro-trauma, driving robust satellite cell activation and hypertrophic supercompensation.")
]

P2_M14_TXT = (
    "Read the following excerpt on endurance conditioning methods in distance running and answer the questions that follow:\\n\\n"
    "Athletic endurance is developed through three classical methodologies: Continuous Training, Interval Training, and Fartlek Training. "
    "'Continuous Training' involves unbroken physical activity sustained for 30 to 120+ minutes at a steady heart rate (140–160 bpm) without rest, "
    "maximizing mitochondrial density, capillary angiogenesis, and lipid oxidation. "
    "'Interval Training', standardized by Dr. Woldemar Gerschler and cardiologist Dr. Herbert Reindell, alternates structured high-intensity work bouts "
    "with incomplete rest intervals. Gerschler established that the critical cardiovascular adaptation occurs during the incomplete rest interval: "
    "as the runner stops, venous return surges, stretching the left ventricle and expanding stroke volume. The subsequent bout is initiated when heart rate "
    "recovers to 120–130 bpm. 'Fartlek Training', created by Gösta Holmér of Sweden in 1937 ('speed play'), blends continuous running with spontaneous bursts "
    "of speed across natural undulating cross-country terrain (forest trails, sandy slopes) guided by the runner's subjective sensations."
)
P2_M14_QS = [
    case_q("Training in Sports", "Continuous Training Parameters",
     "What training parameters define the standard 'Continuous Training' method for developing aerobic endurance?",
     "Sustained, unbroken exercise for 30 to 120+ minutes at a steady heart rate of 140 to 160 beats per minute",
     ["Sprinting at 100% effort for 10 seconds followed by 2 hours of sleep", "Lifting a maximal barbell once every 24 hours", "Walking 5 paces, resting for 10 minutes, and repeating twice"],
     "Continuous training maintains steady submaximal locomotion without rest intervals, expanding aerobic mitochondrial capacity."),
    case_q("Training in Sports", "Gerschler Interval Training Rest Mechanism",
     "Why did Gerschler and Reindell emphasize that the primary cardiac training effect in Interval Training occurs during the REST interval?",
     "Sudden cessation of intense work surges venous return, stretching the relaxed left ventricle and stimulating stroke volume enlargement",
     ["The heart stops beating completely during the rest interval", "Muscles burn body fat only when sitting down", "The rest interval has no physiological significance whatsoever"],
     "Post-work venous return momentarily overfills the left ventricle, applying Frank-Starling stretch that expands stroke volume."),
    case_q("Training in Sports", "Heart Rate Recovery Benchmark in Intervals",
     "In scientific interval training, what heart rate benchmark indicates the completion of the recovery interval before starting the next repetition?",
     "When the athlete's heart rate drops down to approximately 120 to 130 beats per minute",
     ["When the heart rate drops to zero beats per minute", "When the heart rate climbs to 220 beats per minute", "When the athlete stops breathing for three minutes"],
     "Gerschler established that restarting work at 120-130 bpm provides incomplete recovery, maintaining elevated cardiovascular stimulus."),
    case_q("Training in Sports", "Fartlek Training Meaning and Pioneer",
     "Who originated the Fartlek Training method in 1937, and what does the Swedish word 'Fartlek' translate to?",
     "Gösta Holmér of Sweden; translates literally as 'Speed Play'",
     ["Lucien Brouha; translates as 'Bench Stepping'", "Dr. Harold Barrow; translates as 'Three Items'", "Sir Isaac Newton; translates as 'Motion Laws'"],
     "Gösta Holmér developed Fartlek ('speed play') in Sweden, blending continuous running with spontaneous speed bursts over natural terrain."),
    case_q("Training in Sports", "Fartlek Natural Terrain Advantage",
     "What unique advantage does running on natural cross-country terrain (forests, hills) provide during Fartlek training?",
     "Varying terrain challenges stabilizing musculature, enhances joint proprioception, and eliminates psychological monotony",
     ["It eliminates all friction between shoes and dirt", "It makes running completely effortless with zero energy expenditure", "Forest air has zero oxygen, forcing the runner to hold their breath"],
     "Undulating natural terrain recruits varied stabilizing muscle groups, trains proprioceptive balance, and reduces track monotony.")
]

# Mock 15
P1_M15_TXT = (
    "Read the following excerpt on flexibility development and neuromuscular stretching mechanics and answer the questions that follow:\\n\\n"
    "Flexibility is the anatomical range of motion (ROM) available at a joint or group of joints, categorized into Active flexibility "
    "(achieved by voluntary agonist muscular contraction) and Passive flexibility (achieved with external assistance from a partner, gravity, or apparatus). "
    "Methods to develop flexibility include: (1) Static Stretching, where a muscle is slowly elongated to mild discomfort and held steadily for 15 to 30 seconds "
    "(the safest and most reliable technique); (2) Dynamic Stretching, using controlled sport-specific movements through active ROM without bouncing; "
    "(3) Ballistic Stretching, utilizing rapid bouncing or bobbing movements (which triggers the protective muscle spindle stretch reflex, causing reflex contraction "
    "and increasing injury risk); and (4) Proprioceptive Neuromuscular Facilitation (PNF). PNF stretching exploits 'Autogenic Inhibition': an isometric contraction "
    "of the stretched muscle stimulates Golgi Tendon Organs (GTOs), which reflexively inhibit motor neuron discharge, allowing deeper subsequent muscle relaxation and elongation."
)
P1_M15_QS = [
    case_q("Training in Sports", "Active vs Passive Flexibility Distinction",
     "How does 'Active Flexibility' differ from 'Passive Flexibility' in sports training?",
     "Active flexibility is achieved using only one's own voluntary muscle contraction, whereas Passive flexibility utilizes an external force or partner",
     ["Active flexibility is used only by male athletes, while Passive is used only by females", "Active flexibility requires holding breath, while Passive requires shouting", "Active flexibility applies only to the neck, while Passive applies only to feet"],
     "Active ROM is produced by agonist muscular effort; passive ROM relies on external assistance (partner, strap, gravity)."),
    case_q("Training in Sports", "Ballistic Stretching Hazard",
     "Why do modern sports medicine authorities caution against 'Ballistic Stretching' (rhythmic bouncing)?",
     "Rapid bouncing triggers the muscle spindle stretch reflex, causing the muscle to contract while being stretched and risking tissue tearing",
     ["Ballistic stretching causes high fever", "Ballistic stretching permanently dissolves joint bones", "Ballistic stretching makes athletes lose their balance forever"],
     "Sudden rapid lengthening excites muscle spindle myotatic reflexes, contracting the stretched muscle and causing micro-trauma."),
    case_q("Training in Sports", "Static Stretching Hold Duration",
     "What is the scientifically recommended hold time for a 'Static Stretch' to induce safe and effective tissue relaxation?",
     "15 to 30 seconds held steadily without bouncing",
     ["0.5 seconds held rapidly", "10 minutes held without breathing", "Two hours held continuously"],
     "A 15-30 second static hold allows stress relaxation and desensitizes stretch receptors, promoting safe elongation."),
    case_q("Training in Sports", "PNF Autogenic Inhibition Mechanism",
     "In PNF stretching, what sensory organ and neurophysiological mechanism permit deeper muscle relaxation following an isometric contraction?",
     "Golgi Tendon Organs (GTOs) detect high tension and trigger 'Autogenic Inhibition', reflexively relaxing the stretched muscle",
     ["Muscle spindles trigger the myotatic reflex", "Pacinian corpuscles detect cold temperature", "Nociceptors induce immediate joint dislocation"],
     "GTOs sense isometric tension at the tendon junction and discharge inhibitory signals that relax the muscle (autogenic inhibition)."),
    case_q("Training in Sports", "PNF Contract-Relax Sequential Phases",
     "What is the operational sequence of the classical PNF (Contract-Relax) stretching protocol?",
     "Passive stretch (10s) -> Isometric contraction against resistance (6s) -> Conscious relaxation (2-3s) -> Deeper passive stretch (20-30s)",
     ["Sprinting 100 meters -> Jumping over a hurdle -> Sitting down -> Sleeping", "Bouncing violently 50 times -> Freezing in ice -> Running", "Holding breath for one minute -> Shouting -> Stretching"],
     "PNF contract-relax follows: initial passive stretch, 6-second isometric push, brief relaxation, and an assisted deeper passive hold.")
]

P2_M15_TXT = (
    "Read the following excerpt on the design and organization of Circuit Training and answer the questions that follow:\\n\\n"
    "Circuit Training was developed in 1953 by R.E. Morgan and G.T. Adamson at the University of Leeds as an efficient conditioning method "
    "to develop muscular strength, muscular endurance, and cardiorespiratory fitness simultaneously. "
    "A standard circuit comprises 6 to 12 exercise stations arranged systematically in a circular layout. "
    "Participants progress from station to station, performing exercises for a designated time interval (typically 30–45 seconds) or repetition target, "
    "followed by brief rest intervals (15–30 seconds) to rotate to the next station. "
    "The fundamental organizational rule of Circuit Training is 'muscle group alternation': consecutive stations must never target the same muscle group "
    "(e.g., Station 1: Push-ups for chest/triceps; Station 2: Squats for legs; Station 3: Sit-ups for core; Station 4: Pull-ups for back). "
    "This prevents localized muscular fatigue while maintaining elevated heart rates throughout the entire circuit."
)
P2_M15_QS = [
    case_q("Training in Sports", "Circuit Training Pioneers and Year",
     "Who originated Circuit Training and in what year was it formulated?",
     "R.E. Morgan and G.T. Adamson at the University of Leeds in 1953",
     ["Lucien Brouha at Harvard in 1943", "Harold Barrow in 1953", "Gösta Holmér in 1937"],
     "Morgan and Adamson created circuit training in 1953 at the University of Leeds as a multi-component conditioning system."),
    case_q("Training in Sports", "Standard Number of Stations",
     "How many exercise stations are typically arranged in a classical Circuit Training setup?",
     "6 to 12 stations",
     ["1 to 2 stations only", "50 to 100 stations", "Over 200 stations"],
     "Standard conditioning circuits incorporate 6 to 12 stations to provide balanced whole-body muscular and aerobic stimulus."),
    case_q("Training in Sports", "Muscle Group Alternation Rule",
     "What is the foundational architectural rule governing the sequence of stations in Circuit Training?",
     "Consecutive stations must alternate between different muscle groups (e.g., upper body, lower body, core) to avoid premature local fatigue",
     ["Every station must perform heavy bench presses repeatedly", "All stations must involve running backwards in a circle", "Stations must be organized strictly according to athlete shoe size"],
     "Alternating target muscle groups allows local muscular recovery while keeping overall metabolic and cardiac demand continuously elevated."),
    case_q("Training in Sports", "Fitness Components Developed Concurrently",
     "Which trio of fitness qualities does Circuit Training develop simultaneously?",
     "Muscular strength, muscular endurance, and cardiorespiratory aerobic fitness",
     ["Only fine motor handwriting skills", "Static flexibility without muscular engagement", "Pure maximum sprinting speed only"],
     "Circuit training challenges muscular strength-endurance and cardiovascular transport systems concurrently."),
    case_q("Training in Sports", "Work-to-Rest Parameters in Circuit Training",
     "What are typical work and transition intervals used in a standard general conditioning circuit?",
     "30 to 45 seconds of work at each station, with 15 to 30 seconds of transition/rest between stations",
     ["10 minutes of work with 1 hour of sleep between stations", "1 second of work with 10 minutes of rest", "5 hours of non-stop work with zero rest"],
     "Standard circuits balance 30-45 seconds of exercise with 15-30 seconds of station transition, maintaining target heart rate.")
]

# Mock 16
P1_M16_TXT = (
    "Read the following excerpt on high-altitude training and environmental sports physiology and answer the questions that follow:\\n\\n"
    "Endurance athletes frequently travel to high-altitude training centers (elevated above 2,000 meters / 6,500 feet) to stimulate physiological adaptations. "
    "At high altitude, while the fraction of oxygen in the atmosphere remains constant (~20.93%), the barometric atmospheric pressure drops significantly, "
    "reducing the partial pressure of oxygen ($P_{O2}$) and inducing 'environmental hypoxia'. "
    "In response to renal tissue hypoxia, the kidneys secrete the hormone Erythropoietin (EPO), which stimulates bone marrow stem cells to accelerate "
    "erythropoiesis (red blood cell production). Over 3 to 4 weeks of hypoxic acclimatization, circulating red blood cell mass, hemoglobin concentration, "
    "and hematocrit expand substantially, enhancing blood oxygen-carrying capacity. "
    "Sports scientists developed the 'Live-High, Train-Low' (LHTL) paradigm: athletes live and sleep at moderate altitude (~2,200–2,500 m) to stimulate EPO, "
    "but descend to lower elevations (<1,200 m) for high-intensity training workouts, avoiding the reduction in training speed caused by hypoxic fatigue."
)
P1_M16_QS = [
    case_q("Physiology and Injuries in Sports", "High-Altitude Hypoxia Cause",
     "What causes environmental hypoxia at high altitudes above 2,000 meters?",
     "Reduced barometric atmospheric pressure, which lowers the partial pressure of oxygen ($P_{O2}$) despite a constant 21% oxygen fraction",
     ["The complete absence of all oxygen gas in the atmosphere", "The air becoming too hot for human lungs to breathe", "High altitude causing atmospheric nitrogen to turn into liquid"],
     "Barometric pressure falls with altitude; the reduced pressure gradient lowers the partial pressure of oxygen, driving hypoxia."),
    case_q("Physiology and Injuries in Sports", "Kidney Hormone Stimulating Erythropoiesis",
     "Which hormone is secreted by the kidneys in response to altitude-induced hypoxia to stimulate red blood cell production?",
     "Erythropoietin (EPO)",
     ["Insulin", "Human Growth Hormone (HGH)", "Thyroxine"],
     "Renal hypoxia upregulates hypoxia-inducible factor (HIF-1), triggering Erythropoietin (EPO) release to drive erythropoiesis."),
    case_q("Physiology and Injuries in Sports", "Primary Hematological Adaptation",
     "What hematological adaptation occurs following 3 to 4 weeks of high-altitude acclimatization?",
     "Increased red blood cell mass, elevated hemoglobin concentration, and expanded oxygen-carrying capacity of the blood",
     ["A complete elimination of white blood cells", "The conversion of blood into pure water", "A 50% decrease in total blood volume"],
     "Altitude acclimatization elevates total red cell volume and hemoglobin mass, augmenting arterial oxygen content."),
    case_q("Physiology and Injuries in Sports", "Live-High Train-Low (LHTL) Concept",
     "Why is the 'Live-High, Train-Low' (LHTL) altitude paradigm preferred by world-class distance runners?",
     "Living high stimulates EPO secretion and red blood cell gains, while training low allows athletes to maintain maximal workout speed and power",
     ["Living high makes athletes sleep less, while training low allows sleeping all day", "Training high is illegal under Olympic rules", "Living low makes athletes too cold to run"],
     "LHTL reaps the hematological benefits of hypoxic living while avoiding the neuromuscular and pace deconditioning of training in thin air."),
    case_q("Physiology and Injuries in Sports", "Acute Mountain Sickness (AMS) Symptoms",
     "Which symptoms indicate an athlete is suffering from Acute Mountain Sickness (AMS) following rapid altitude ascent?",
     "Headache, nausea, dizziness, insomnia, fatigue, and loss of appetite",
     ["Severe hunger and craving for spicy food", "Immediate doubling of sprinting speed", "Sudden growth of extra teeth in the gums"],
     "Rapid ascent without acclimatization triggers AMS, characterized by hypoxemic headache, nausea, vertigo, and sleep disruption.")
]

P2_M16_TXT = (
    "Read the following excerpt on intramural and extramural sports organization in educational institutions and answer the questions that follow:\\n\\n"
    "Physical education departments organize sports competitions under two primary umbrellas: 'Intramural' and 'Extramural' programs. "
    "Intramural sports (derived from the Latin 'intra muros', meaning 'within the walls') are athletic competitions conducted exclusively among students "
    "enrolled within the same school or institution. Their core objectives are mass participation, recreational enjoyment, health promotion, house spirit, "
    "and leadership development, regardless of elite athletic prowess. "
    "Conversely, 'Extramural' sports involve inter-school, zonal, district, or national competitions where school varsity teams compete against other institutions. "
    "Extramurals focus on competitive excellence, sportsmanship, and showcasing institutional athletic standards. "
    "To manage these events successfully, school authorities establish functional sub-committees: the Publicity Committee, Boarding and Lodging Committee, "
    "Reception Committee, Ground and Equipment Committee, Technical Committee, and First Aid Committee, operating under the General Organizing Director."
)
P2_M16_QS = [
    case_q("Management of Sporting Events", "Intramural Meaning and Target",
     "What is the literal meaning and primary purpose of 'Intramural' sports competitions?",
     "Competitions conducted 'within the walls' of a single institution, promoting mass participation, recreation, and house spirit for all students",
     ["Professional international championships between Olympic nations", "Athletic events conducted exclusively for school teachers", "Commercial sports leagues designed to sell tickets to the general public"],
     "Intramural ('within the walls') engages all students in recreational and competitive sports within their own school."),
    case_q("Management of Sporting Events", "Extramural Purpose",
     "How do 'Extramural' sports competitions fundamentally differ from Intramural events?",
     "Extramurals involve representative school teams competing against other external schools, colleges, or districts for athletic excellence",
     ["Extramurals take place exclusively inside a school classroom", "Extramurals are held without any referees or scoreboards", "Extramurals allow only students who fail their exams to participate"],
     "Extramurals ('outside the walls') pit institutional varsity squads against external opponents to test elite performance."),
    case_q("Management of Sporting Events", "Technical Committee Role",
     "What is the designated responsibility of the Technical Committee in sports event management?",
     "Appointing qualified officials, referees, umpires, timekeepers, and ensuring matches follow official rules",
     ["Cooking meals for outstation athletes in the hostel", "Selling advertising billboards to corporate sponsors", "Cleaning the dormitory beds after the event"],
     "The technical committee oversees officiating, rules compliance, protest juries, and competitive integrity."),
    case_q("Management of Sporting Events", "Ground and Equipment Committee Duties",
     "Which duties are assigned to the Ground and Equipment Committee prior to tournament commencement?",
     "Marking playing courts, preparing running tracks, inspecting sports gear for safety compliance, and maintaining playing surfaces",
     ["Writing newspaper press releases and holding television interviews", "Awarding gold medals to winners on the podium", "Checking the passports of visiting spectators"],
     "The grounds committee marks boundaries, prepares playing fields, and secures standardized, safe equipment."),
    case_q("Management of Sporting Events", "First Aid Committee Essential Mandate",
     "Why is the presence of an active First Aid Committee mandatory at all inter-school sports meets?",
     "To provide immediate emergency triage, first aid, and medical transportation for athletes sustaining acute injuries",
     ["To provide musical entertainment between matches", "To sell sports shoes to participating runners", "To grade students on their academic homework"],
     "First aid personnel provide rapid acute sideline treatment, stabilizing injuries and safeguarding participant welfare.")
]

# Mock 17
P1_M17_TXT = (
    "Read the following excerpt on exercise and biological aging and answer the questions that follow:\\n\\n"
    "Biological senescence involves gradual degenerative changes across the musculoskeletal, cardiovascular, and endocrine systems. "
    "A prominent hallmark of aging is 'Sarcopenia'—the progressive, involuntary loss of skeletal muscle mass, quality, and strength, "
    "characterized by preferential denervation and atrophy of fast-twitch Type II muscle fibers. "
    "In the skeletal system, aging induces 'Osteopenia' and 'Osteoporosis' (loss of bone mineral density and microarchitectural deterioration), "
    "elevating fracture risk from minor falls. Geriatric exercise physiology proves that progressive resistance training and weight-bearing exercises "
    "powerfully counteract these declines. According to 'Wolff's Law', mechanical loading and muscular contractions exert compressive and tensile strain on bones, "
    "stimulating osteoblastic bone deposition and thickening cortical bone. Furthermore, resistance training stimulates muscle protein synthesis, "
    "preserves motor unit integrity, improves functional mobility, and significantly reduces fall incidence in older adults."
)
P1_M17_QS = [
    case_q("Physiology and Injuries in Sports", "Sarcopenia Clinical Definition",
     "What is 'Sarcopenia' as defined in geriatric exercise physiology?",
     "Age-related involuntary loss of skeletal muscle mass, strength, and fast-twitch fiber quality",
     ["A disease where bones turn into liquid cartilage", "Loss of memory after age 50", "Severe tooth decay caused by eating fruit"],
     "Sarcopenia denotes age-associated muscle wasting and contractile strength loss, especially affecting Type II motor units."),
    case_q("Physiology and Injuries in Sports", "Selective Fiber Atrophy in Aging",
     "Which muscle fiber type suffers the most severe selective atrophy and loss during the aging process?",
     "Fast-Twitch Type II fibers (leading to prominent losses in explosive power, speed, and balance)",
     ["Slow-Twitch Type I fibers exclusively", "Smooth muscle fibers in the digestive tract only", "Cardiac muscle fibers in heart valves"],
     "Senescence disproportionately denervates and shrinks fast-twitch Type II fibers, degrading rapid balance recovery."),
    case_q("Physiology and Injuries in Sports", "Wolff's Law Mechanism in Bone Preservation",
     "According to Wolff's Law, how does physical resistance training increase bone mineral density in older adults?",
     "Bone remodels and deposits new mineral matrix along lines of mechanical strain and gravitational loading exerted by muscles",
     ["Bone grows only when an athlete drinks ten cups of coffee daily", "Bone density increases when lying motionless in bed", "Bones absorb calcium directly from the air through skin"],
     "Wolff\'s law establishes that bone tissue adapts dynamically to applied mechanical loads by stimulating osteoblastic bone matrix synthesis."),
    case_q("Physiology and Injuries in Sports", "Cardiovascular Decline in Sedentary Aging",
     "How does sedentary aging alter arterial blood vessels and blood pressure?",
     "Arterial walls lose elastin and accumulate collagen and calcium, increasing arterial stiffness and elevating systolic blood pressure",
     ["Arteries become as loose as water balloons, dropping blood pressure to zero", "Veins completely disappear from the arms and legs", "Blood circulation stops completely at age 65"],
     "Vascular stiffening and loss of arterial compliance elevate pulse wave velocity and systolic pressure in older adults."),
    case_q("Physiology and Injuries in Sports", "Fall Prevention Through Resistance Training",
     "Why does lower-body resistance exercise (e.g., squats, leg presses) reduce fall risk in senior citizens?",
     "It strengthens the quadriceps, gluteals, and core stabilizers, preserving dynamic balance, gait stability, and rapid trip recovery",
     ["It makes the ground underneath the senior softer like a pillow", "It prevents seniors from ever leaving their homes", "It makes shoes permanently stick to the floor"],
     "Strengthened lower limb musculature improves postural equilibrium and enables rapid corrective stepping to arrest falls.")
]

P2_M17_TXT = (
    "Read the following excerpt on kicking and running biomechanics in sports and answer the questions that follow:\\n\\n"
    "Biomechanists analyze athletic locomotion and striking through multi-segment kinetic chains. In kicking a soccer ball, "
    "the movement operates as a proximal-to-distal kinetic chain: forceful hip flexion powered by the iliopsoas and rectus femoris accelerates "
    "the thigh forward; as the thigh decelerates, angular momentum is transferred forward to the lower leg, whipping the knee into explosive extension "
    "powered by the quadriceps to strike the ball with high tangential foot velocity. "
    "In sprint running, locomotion is broken into the 'Stance Phase' (foot contact, braking, and propulsive push-off) and the 'Flight Phase' (swing and recovery). "
    "Maximal running velocity is the mathematical product of Stride Length and Stride Frequency ($v = SL \\times SF$). "
    "Elite sprinters do not achieve top velocity by taking abnormally long over-strides (which induces a braking impulse ahead of the center of gravity), "
    "but by exerting massive vertical Ground Reaction Forces into the track in minimal ground contact time (~0.08 to 0.09 seconds)."
)
P2_M17_QS = [
    case_q("Biomechanics and Sports", "Soccer Kick Kinetic Chain Sequence",
     "What movement sequence characterizes the proximal-to-distal kinetic chain during a soccer instep kick?",
     "Pelvic rotation -> forward thigh hip flexion -> deceleration of thigh with explosive knee extension -> high-velocity foot impact",
     ["Foot impacts ball -> knee bends backward -> hip extends -> pelvis stops", "Knee extends first -> foot rotates -> hip flexes afterwards", "The entire leg moves like a rigid solid iron rod without joint bending"],
     "Proximal-to-distal sequencing transfers segment momentum from larger proximal hips to distal high-speed extremities."),
    case_q("Biomechanics and Sports", "Running Velocity Formula",
     "What mathematical relationship determines an athlete's sprinting velocity?",
     "Running Velocity = Stride Length multiplied by Stride Frequency ($v = SL \\times SF$)",
     ["Running Velocity = Body Weight divided by Stride Length", "Running Velocity = Stride Frequency divided by Shoe Size", "Running Velocity = Height multiplied by Arm Length"],
     "Sprinting speed is the mathematical product of the distance covered per step (stride length) and step cadence (stride frequency)."),
    case_q("Biomechanics and Sports", "Hazard of Over-Striding in Sprinting",
     "Why do sprint coaches warn athletes against 'over-striding' (planting the foot far ahead of the body's center of gravity)?",
     "It generates a severe backward braking ground reaction force that decelerates the runner and spikes hamstring injury risk",
     ["It makes the runner fly into the air and land in the stands", "It causes the running shoes to melt from track heat", "Over-striding is strictly banned by stadium referees"],
     "Landing with the foot far ahead of the center of mass produces a braking impulse, slowing forward momentum and straining hamstrings."),
    case_q("Biomechanics and Sports", "Ground Contact Time of Elite Sprinters",
     "How do Olympic 100m sprinters generate extreme speed during the ground contact phase?",
     "By applying massive vertical ground reaction forces in ultra-short contact times (under 0.09 seconds) with high ankle stiffness",
     ["By keeping their feet on the ground for two full seconds per step", "By sliding their feet across the track like cross-country skis", "By running on their knees instead of their feet"],
     "Elite sprinters deliver massive ground reaction force within ultra-short contact windows (~80-90 ms) through stiff spring-like tendons."),
    case_q("Biomechanics and Sports", "Phases of the Running Stride",
     "What are the two cardinal alternating phases comprising a complete human running gait cycle?",
     "The Stance Phase (ground contact, braking, and propulsion) and the Flight / Swing Phase (non-support airborne transit)",
     ["The Walking Phase and the Sleeping Phase", "The Left Foot Phase and the Sitting Phase", "The Backward Phase and the Sideways Phase"],
     "Running consists of alternating stance support phases and airborne flight (swing) phases.")
]

# Mock 18
P1_M18_TXT = (
    "Read the following excerpt on thermoregulation and heat illness in athletes and answer the questions that follow:\\n\\n"
    "During vigorous exercise in hot and humid conditions, metabolic heat production in contracting skeletal muscles increases by 15- to 20-fold. "
    "The body relies on four physical mechanisms to dissipate heat: conduction, convection, radiation, and evaporation. "
    "In warm environments, 'Evaporation' of sweat from the skin surface is the primary physiological avenue for heat loss; each liter of evaporated sweat "
    "dissipates approximately 580 kilocalories of heat. However, high ambient humidity impairs sweat evaporation, causing sweat to roll off the body without cooling. "
    "Dehydration (loss of >2% body weight in fluid) reduces blood volume, elevates heart rate (cardiovascular drift), and impairs thermoregulatory sweating. "
    "This can trigger a spectrum of heat illnesses: 'Heat Cramps' (painful spasms from sodium depletion), 'Heat Exhaustion' (profuse sweating, hypotension, "
    "pallor, core temperature 38°–40°C), and life-threatening 'Heat Stroke' (core temperature exceeding 40.5°C / 105°F, central nervous system dysfunction, "
    "hot dry or sweaty skin, and multiorgan failure), requiring immediate whole-body cold-water immersion."
)
P1_M18_QS = [
    case_q("Physiology and Injuries in Sports", "Primary Heat Dissipation Mechanism",
     "What is the primary physiological mechanism of heat dissipation during vigorous athletic exertion in hot ambient temperatures?",
     "Evaporation of sweat from the skin surface into the surrounding air",
     ["Conductive transfer of heat into running shoes", "Radiation of heat into stadium floodlights", "Convective cooling from drinking iced water"],
     "Evaporative vaporization of sweat is the primary physiological means of cooling during exercise in hot environments."),
    case_q("Physiology and Injuries in Sports", "Impact of High Humidity on Cooling",
     "Why does high relative humidity increase the danger of heat stroke in athletes?",
     "High water vapor pressure in ambient air prevents sweat from evaporating, causing sweat to drip off uselessly without cooling the body",
     ["Humidity freezes the sweat glands shut", "Humidity turns sweat into toxic acid", "Humidity eliminates all oxygen from the air"],
     "When ambient vapor pressure is high, the evaporative gradient vanishes; sweat rolls off without phase change, failing to dissipate heat."),
    case_q("Physiology and Injuries in Sports", "Heat Stroke Core Diagnostic Criteria",
     "What clinical triad identifies life-threatening Exertional Heat Stroke?",
     "Core body temperature > 40.5°C (105°F), profound Central Nervous System dysfunction (confusion, coma, seizure), and thermoregulatory failure",
     ["Core temperature below 35°C with severe shivering", "Normal body temperature with a mild headache", "Sprained ankle with localized joint swelling"],
     "Exertional heat stroke is an emergency defined by hyperthermia (>40.5°C) and profound CNS neuro-cognitive collapse."),
    case_q("Physiology and Injuries in Sports", "First-Line Treatment for Heat Stroke",
     "What is the gold standard immediate on-site emergency treatment for an athlete suffering from Exertional Heat Stroke?",
     "Immediate rapid whole-body Cold Water Immersion (CWI) in an ice tub before hospital transport ('cool first, transport second')",
     ["Wrapping the athlete in five wool blankets to sweat out the heat", "Making the athlete run 5 laps to burn off excess temperature", "Giving the athlete hot soup to drink"],
     "Cold water immersion provides rapid conductive cooling, dropping core temperature safely before transport to prevent fatal organ damage."),
    case_q("Physiology and Injuries in Sports", "Cardiovascular Drift in Dehydration",
     "What is 'Cardiovascular Drift' observed during prolonged exercise in the heat with progressive dehydration?",
     "A progressive decline in stroke volume accompanied by a compensatory rise in heart rate to maintain cardiac output as blood volume shrinks",
     ["The heart drifting from the left side of the chest to the right side", "Heart rate dropping to zero beats per minute", "Blood pressure skyrocketing to 300 mmHg"],
     "Dehydration reduces central blood volume and ventricular filling, forcing heart rate upward to sustain cardiac output.")
]

P2_M18_TXT = (
    "Read the following excerpt on sudden cardiac arrest and emergency sports action plans and answer the questions that follow:\\n\\n"
    "Sudden Cardiac Arrest (SCA) is the leading cause of non-traumatic death in young competitive athletes during sports participation. "
    "Occult structural etiologies include Hypertrophic Cardiomyopathy (HCM) and anomalous coronary arteries, while blunt non-penetrating chest impacts "
    "directly over the heart during a vulnerable 20-millisecond window of ventricular repolarization (T-wave peak) can induce 'Commotio Cordis', "
    "triggering instantaneous ventricular fibrillation. Survival is strictly time-dependent: each minute of delay in defibrillation reduces survival by 7% to 10%. "
    "Sports organizations mandate a comprehensive Emergency Action Plan (EAP). The immediate response chain includes: (1) immediate recognition of collapse "
    "and absent breathing; (2) activating emergency medical services (call 112 / ambulance); (3) starting high-quality Cardiopulmonary Resuscitation "
    "(CPR at 100–120 chest compressions/min, 2 inches deep); and (4) rapid deployment of an Automated External Defibrillator (AED) to deliver early defibrillation."
)
P2_M18_QS = [
    case_q("Physiology and Injuries in Sports", "Leading Medical Cause of SCA in Young Athletes",
     "What occult congenital cardiovascular condition is the leading pathological cause of sudden cardiac death in young competitive athletes?",
     "Hypertrophic Cardiomyopathy (HCM) (asymmetrical left ventricular septal hypertrophy)",
     ["Type 1 Diabetes Mellitus", "Asthma induced by cold weather", "Severely sprained ankle ligaments"],
     "Hypertrophic cardiomyopathy is the most frequent congenital etiology underlying sudden cardiac arrest in young competitors."),
    case_q("Physiology and Injuries in Sports", "Commotio Cordis Biomechanics",
     "What is 'Commotio Cordis' in sports trauma?",
     "Blunt impact to the precordium over the heart during the vulnerable T-wave repolarization window triggering instantaneous ventricular fibrillation",
     ["A fracture of the breastbone caused by heavy bench pressing", "A concussion of the brain from heading a soccer ball", "A tear of the biceps tendon during throwing"],
     "Commotio cordis is blunt chest impact at a specific electrophysiological cardiac phase, provoking sudden ventricular fibrillation."),
    case_q("Physiology and Injuries in Sports", "Defibrillation Survival Time Dependency",
     "By what percentage does the likelihood of survival decrease for every minute of delay in defibrillating an athlete in cardiac arrest?",
     "7% to 10% per minute of delay",
     ["1% per hour of delay", "Survival never changes regardless of time", "50% per second"],
     "Each minute without CPR and defibrillation reduces survival odds by roughly 7-10%, underscoring rapid AED deployment."),
    case_q("Physiology and Injuries in Sports", "Automated External Defibrillator (AED) Function",
     "What is the clinical function of an Automated External Defibrillator (AED)?",
     "It analyzes cardiac rhythm and delivers a controlled electrical shock to depolarize the heart and terminate ventricular fibrillation",
     ["It pumps blood mechanically through the athlete\'s legs", "It inflates the lungs with pure oxygen gas", "It measures body fat percentage"],
     "An AED analyzes cardiac rhythm and delivers an electrical countershock to stun chaotic fibrillation, allowing the sinus node to resume control."),
    case_q("Physiology and Injuries in Sports", "High-Quality CPR Chest Compression Parameters",
     "What are the standardized adult CPR chest compression rate and depth according to resuscitation guidelines?",
     "A rate of 100 to 120 compressions per minute at a depth of at least 2 inches (5 cm), allowing full chest recoil",
     ["A rate of 20 compressions per minute at a depth of 10 inches", "A rate of 300 compressions per minute at a depth of 0.1 inches", "Compressing only the stomach once every minute"],
     "Resuscitation guidelines prescribe 100-120 compressions/min, at least 2 inches deep, with complete chest recoil between compressions.")
]

# Mock 19
P1_M19_TXT = (
    "Read the following excerpt on anti-doping regulations and pharmacological violations in sports and answer the questions that follow:\\n\\n"
    "The World Anti-Doping Agency (WADA) establishes and monitors the World Anti-Doping Code to safeguard athlete health and ensure fair play. "
    "A substance or method is considered for inclusion on WADA's Prohibited List if it meets at least two of three criteria: (1) it enhances or has the potential "
    "to enhance sports performance; (2) it represents an actual or potential health risk to the athlete; and (3) it violates the spirit of sport. "
    "Prohibited classes include: Anabolic Androgenic Steroids (AAS, synthetic derivatives of testosterone promoting protein synthesis and muscle hypertrophy, "
    "which cause liver toxicity, cardiovascular pathology, and endocrine suppression); Peptide Hormones (Erythropoietin [EPO], which increases hematocrit "
    "and blood viscosity, risking stroke and pulmonary embolism, and Human Growth Hormone [HGH]); Beta-2 Agonists; Hormone and Metabolic Modulators; "
    "and Diuretics (used as masking agents to dilute urine and rapidly drop weight in combat sports). "
    "WADA also operates the 'Athlete Biological Passport' (ABP) to track hematological and steroidal markers over time, detecting doping indirectly."
)
P1_M19_QS = [
    case_q("Training in Sports", "WADA Prohibited List Inclusion Criteria",
     "What are the three criteria defined by WADA, of which a substance must satisfy at least two to be placed on the Prohibited List?",
     "Enhances sports performance, poses actual or potential health risk, and violates the spirit of sport",
     ["Costs more than $100, is sold in pharmacies, and tastes bitter", "Is manufactured outside Europe, requires a prescription, and is liquid", "Causes hair to turn gray, improves vision, and smells like pine"],
     "WADA criteria mandate meeting 2 of 3: performance enhancement, health hazard, and violation of the spirit of sport."),
    case_q("Training in Sports", "Anabolic Steroids Adverse Health Risks",
     "What severe clinical health risks are associated with the illicit abuse of Anabolic Androgenic Steroids (AAS)?",
     "Severe liver hepatotoxicity, cardiovascular hypertrophy, elevated LDL cholesterol, hypertension, and suppression of endogenous testosterone",
     ["Loss of all body hair and doubling of height", "Permanent loss of fingernails and teeth", "Immediate cure of all viral infections"],
     "AAS abuse induces severe cardiac hypertrophy, atherogenic lipid profiles, liver peliosis/tumors, and endocrine axis shutdown."),
    case_q("Training in Sports", "Diuretics Mechanism of Violation",
     "Why are Diuretics strictly banned in sports competitions by anti-doping authorities?",
     "They accelerate urinary fluid excretion to rapidly make weight in weight-class sports and act as masking agents to dilute prohibited substances in urine",
     ["They make athletes sleep for 20 hours a day", "They increase muscle mass by 500% in one day", "They turn the urine bright neon blue"],
     "Diuretics flush water weight rapidly for weigh-ins and dilute urine, masking banned substances and metabolites from laboratory detection."),
    case_q("Training in Sports", "Dangers of Blood Doping and Synthetic EPO",
     "What life-threatening cardiovascular complication is provoked by blood doping or synthetic Erythropoietin (EPO) abuse?",
     "Excessive elevation of hematocrit and blood viscosity, drastically increasing the risk of thrombotic stroke, heart attack, and pulmonary embolism",
     ["Severe anemia and loss of all red blood cells", "The complete liquefaction of arterial walls", "The brain shrinking to half size"],
     "Excessive red cell mass thickens blood into sludge, generating fatal arterial thrombosis, pulmonary emboli, and strokes."),
    case_q("Training in Sports", "Athlete Biological Passport (ABP) Function",
     "How does the Athlete Biological Passport (ABP) detect doping without directly identifying a specific foreign chemical in the sample?",
     "By continuously monitoring individual biological biomarkers (e.g., reticulocyte count, hemoglobin, testosterone ratios) over time to detect abnormal physiological deviations",
     ["By checking the athlete\'s social media accounts for illegal photos", "By scanning the athlete\'s travel passport for flights to other countries", "By taking fingerprints at the Olympic stadium entrance"],
     "The ABP tracks an athlete\'s longitudinal biological profile, identifying indirect deviations caused by doping agents.")
]

P2_M19_TXT = (
    "Read the following excerpt on overuse injuries and specialization hazards in youth sports and answer the questions that follow:\\n\\n"
    "Overuse injuries account for nearly 50% of all sports injuries among adolescent athletes, driven by excessive training volume, insufficient recovery, "
    "and premature single-sport specialization. Because adolescent bones, tendons, and cartilage are growing rapidly, they are uniquely vulnerable at traction apophyses. "
    "A common traction apophysitis is 'Osgood-Schlatter Disease'—repetitive micro-trauma from the patellar tendon pulling on the unossified tibial tuberosity "
    "during running and jumping in basketball or soccer, causing pain, swelling, and a prominent bony bump below the knee. "
    "In the foot, 'Sever's Disease' (calcaneal apophysitis) involves repetitive Achilles tendon traction on the posterior heel growth plate in young runners. "
    "In youth baseball pitchers, 'Little League Elbow' (medial epicondylar apophysitis) results from repetitive valgus stress during overhead throwing. "
    "Sports pediatricians advise that weekly sports training hours should not exceed an adolescent's chronological age in years."
)
P2_M19_QS = [
    case_q("Physiology and Injuries in Sports", "Osgood-Schlatter Disease Anatomical Site",
     "Where is 'Osgood-Schlatter Disease' localized, and what anatomical structure is irritated?",
     "The tibial tuberosity below the knee, where repetitive quadriceps traction through the patellar tendon strains the developing apophysis",
     ["The shoulder joint rotator cuff tendons", "The bottom sole of the foot underneath the heel", "The wrist joint carpal bones"],
     "Osgood-Schlatter is a traction apophysitis of the tibial tuberosity where the patellar tendon attaches in growing adolescents."),
    case_q("Physiology and Injuries in Sports", "Sever's Disease Pathology",
     "What anatomical structure is inflamed in 'Sever's Disease' (calcaneal apophysitis) in active children?",
     "The growth plate at the posterior calcaneus (heel bone), irritated by repetitive traction from the Achilles tendon",
     ["The cartilage inside the ear canal", "The growth plates of the skull bones", "The knee meniscus cartilage"],
     "Sever\'s disease is traction apophysitis of the calcaneus caused by repetitive pull of the Achilles tendon during running/jumping."),
    case_q("Physiology and Injuries in Sports", "Little League Elbow Biomechanics",
     "What pitching biomechanical stress causes 'Little League Elbow' in adolescent baseball pitchers?",
     "Repetitive valgus tensile stress on the medial epicondyle paired with lateral compression during overhead throwing",
     ["Throwing the baseball underhand like a bowling ball", "Holding the bat with two hands", "Catching the ball with a leather glove"],
     "Repetitive forceful cocking and acceleration impart extreme valgus tension on the immature medial epicondyle growth plate."),
    case_q("Physiology and Injuries in Sports", "Adolescent Vulnerability to Apophysitis",
     "Why are traction apophyses in children and adolescents more vulnerable to overuse injury than adult tendons?",
     "The cartilaginous growth plate at the tendon-bone junction is mechanically weaker than both the adjacent muscle-tendon unit and mature bone",
     ["Children do not have any collagen in their tendons", "Adults do not have any bones in their arms", "Children produce five times more muscle force than adults"],
     "In adolescents, the cartilaginous apophyseal growth plate is the biomechanical 'weak link' that fails under repetitive tensile traction."),
    case_q("Physiology and Injuries in Sports", "Youth Training Volume Guideline",
     "What safe training volume guideline do sports pediatricians recommend to prevent chronic overuse injuries in youth athletes?",
     "A child should not train in organized sports for more hours per week than their chronological age in years (e.g., maximum 12 hours/week for a 12-year-old)",
     ["Every child should train at least 50 hours per week regardless of age", "Children should train only 10 minutes per month", "Children should lift maximal weights twice a day"],
     "A recognized pediatric sports guideline recommends capping weekly organized sports hours at the child\'s chronological age in years.")
]

# Mock 20
P1_M20_TXT = (
    "Read the following excerpt on the Paralympic Movement and adapted sports classification and answer the questions that follow:\\n\\n"
    "The Paralympic Games originated from the visionary work of German neurologist Dr. Ludwig Guttmann at Stoke Mandeville Hospital in 1944, "
    "who utilized archery and wheelchair sports to rehabilitate British World War II veterans with spinal cord injuries. "
    "Today, the International Paralympic Committee (IPC) governs elite competitions for athletes with ten eligible impairment types, "
    "spanning impaired muscle power, limb deficiency, hypertonia, ataxia, athetosis, visual impairment, and intellectual impairment. "
    "To ensure fair and equitable competition, the IPC implements 'Functional Classification'. Unlike medical classification (which groups athletes "
    "solely by medical diagnosis), functional classification evaluates the actual biomechanical impact of the impairment on specific sport performance. "
    "For example, in Para-athletics, track athletes with visual impairments run in classes T11 to T13 (with T11 athletes running tethered to sighted guide runners), "
    "while seated throwing athletes compete in classes F51 to F57 from anchored throwing frames."
)
P1_M20_QS = [
    case_q("Physical Education and Sports for CWSN", "Father of Paralympic Movement",
     "Who is universally recognized as the founding father of the Paralympic Movement?",
     "Dr. Ludwig Guttmann at Stoke Mandeville Hospital (1944)",
     ["Pierre de Coubertin", "Dr. Harold Barrow", "Lucien Brouha"],
     "Dr. Ludwig Guttmann pioneered competitive wheelchair sports for spinal injury rehabilitation at Stoke Mandeville, launching the Paralympics."),
    case_q("Physical Education and Sports for CWSN", "Functional vs Medical Classification",
     "How does IPC 'Functional Classification' differ from traditional medical classification in Paralympic sport?",
     "Functional classification groups athletes based on the biomechanical impact of their impairment on sports performance rather than medical diagnosis alone",
     ["Functional classification groups athletes according to their financial income", "Functional classification groups athletes purely by their chronological age", "There is zero difference between them"],
     "Functional classification assesses how an impairment affects specific sports skills, ensuring competitive parity."),
    case_q("Physical Education and Sports for CWSN", "T11 Para-Athletics Classification Protocol",
     "In Para-athletics track events, what running protocol is mandatory for athletes competing in the T11 visual impairment class?",
     "They compete wearing opaque blackened eye shades and run tethered to a sighted guide runner who coordinates stride cadence",
     ["They run on an empty track alone without any guide", "They compete using motorized wheelchairs", "They are guided by automated flying drones"],
     "T11 runners have near-total visual impairment; they wear light-proof shades and run tethered to matched sighted guide runners."),
    case_q("Physical Education and Sports for CWSN", "Seated Throwing Field Classes (F51-F57)",
     "How do Para-athletes with lower-limb paralysis or amputation compete in throwing events (shot put, javelin, discus)?",
     "From customized throwing frames securely anchored to the concrete throwing circle with tie-down straps",
     ["Standing balanced on one leg on a wooden box", "Thrown from a moving vehicle down the track", "Sitting on the ground in loose sand"],
     "Seated field athletes (F51-F57) compete from rigid throwing chairs anchored with steel straps into the circle for stability."),
    case_q("Physical Education and Sports for CWSN", "Ten Eligible Impairment Types",
     "Which of the following is an officially recognized eligible impairment category under International Paralympic Committee rules?",
     "Impaired muscle power, limb deficiency, hypertonia, and visual impairment",
     ["Mild nearsightedness corrected with contact lenses", "Temporary muscle soreness after running", "A broken fingernail sustained during warmup"],
     "The IPC recognizes permanent impairments: impaired muscle power, limb deficiency, ataxia, hypertonia, visual impairment, etc.")
]

P2_M20_TXT = (
    "Read the following excerpt on psychological Flow State and peak performance in athletics and answer the questions that follow:\\n\\n"
    "Peak athletic performance is frequently described by elite competitors as entering 'The Zone' or experiencing 'Flow State'. "
    "Formulated by psychologist Mihaly Csikszentmihalyi, Flow is a state of supreme psychological immersion, optimal focus, and effortless execution. "
    "The primary prerequisite for flow is the 'Challenge-Skill Balance': the perceived challenge of the competitive task must closely match "
    "the high personal skill capability of the athlete. If the challenge dwarfs the athlete's skill, severe anxiety and paralysis result; "
    "if skill greatly exceeds the challenge, boredom and complacency ensue. "
    "During flow, athletes experience: (1) complete merging of action and awareness; (2) total concentration on the task at hand; "
    "(3) loss of reflective self-consciousness and fear of failure; (4) an altered perception of time (time appears to slow down, allowing precise execution); "
    "and (5) an autotelic experience where participation is intrinsically rewarding in itself."
)
P2_M20_QS = [
    case_q("Psychology and Sports", "Psychological Flow State Pioneer",
     "Which prominent psychologist formulated the foundational scientific theory of 'Flow State' (The Zone)?",
     "Mihaly Csikszentmihalyi",
     ["Sigmund Freud", "Carl Jung", "Albert Bandura"],
     "Mihaly Csikszentmihalyi conceptualized Flow as an optimal psychological state of deep absorption and peak performance."),
    case_q("Psychology and Sports", "Challenge-Skill Balance Prerequisite",
     "According to Csikszentmihalyi, what delicate equilibrium is the primary prerequisite for entering Flow State?",
     "A precise balance where high situational challenge matches the high personal skill level of the athlete",
     ["A situation where the challenge is zero and the athlete has no skill", "When the athlete is paid ten million dollars before the match", "When the opponent refuses to play the match"],
     "Flow emerges in the sweet spot where perceived task challenge is matched perfectly against high personal athletic mastery."),
    case_q("Psychology and Sports", "Time Transformation in The Zone",
     "How do athletes frequently describe the subjective perception of 'Time' while performing in Flow State?",
     "Time appears to slow down dramatically, giving the athlete a sensation of having ample time to anticipate and execute complex motor responses",
     ["Time stops for three days", "Time spins backwards into the previous century", "Time is measured only in temperature units"],
     "Altered time perception (slowing down of game speed) allows hyper-lucid decision-making and fluid motor anticipation."),
    case_q("Psychology and Sports", "Loss of Self-Consciousness in Flow",
     "What happens to an athlete's internal self-talk and fear of failure during Flow State?",
     "Reflective self-consciousness and fear of evaluation vanish, allowing automated procedural programs to execute without cognitive interference",
     ["The athlete becomes terrified of every spectator in the stands", "The athlete stops to write a diary during the match", "The athlete forgets the rules of the sport"],
     "Flow dissolves ego threat and anxious self-monitoring, unleashing uninhibited automated motor programs."),
    case_q("Psychology and Sports", "Autotelic Nature of Flow",
     "What does the 'Autotelic' characteristic of Flow State signify?",
     "The activity is so intrinsically rewarding, enjoyable, and fulfilling that the experience itself is the primary reward",
     ["The athlete receives a luxury automobile after the match", "The athlete requires an automatic timer to play", "The sport is played exclusively on automatic machines"],
     "Autotelic (from Greek 'auto' = self, 'telos' = goal) means the activity contains its own intrinsic fulfillment and joy.")
]

PASSAGES_11_20 = [
    ((P1_M11_TXT, P1_M11_QS), (P2_M11_TXT, P2_M11_QS)),
    ((P1_M12_TXT, P1_M12_QS), (P2_M12_TXT, P2_M12_QS)),
    ((P1_M13_TXT, P1_M13_QS), (P2_M13_TXT, P2_M13_QS)),
    ((P1_M14_TXT, P1_M14_QS), (P2_M14_TXT, P2_M14_QS)),
    ((P1_M15_TXT, P1_M15_QS), (P2_M15_TXT, P2_M15_QS)),
    ((P1_M16_TXT, P1_M16_QS), (P2_M16_TXT, P2_M16_QS)),
    ((P1_M17_TXT, P1_M17_QS), (P2_M17_TXT, P2_M17_QS)),
    ((P1_M18_TXT, P1_M18_QS), (P2_M18_TXT, P2_M18_QS)),
    ((P1_M19_TXT, P1_M19_QS), (P2_M19_TXT, P2_M19_QS)),
    ((P1_M20_TXT, P1_M20_QS), (P2_M20_TXT, P2_M20_QS))
]

assert len(PASSAGES_11_20) == 10, f"Expected 10 passage pairs, got {len(PASSAGES_11_20)}"
print("PED Passages 11 to 20 compiled successfully.")
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Generated {out_path} ({len(content)} bytes)")
