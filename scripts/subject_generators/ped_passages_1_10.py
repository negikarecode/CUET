import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# Mock 1
P1_M1_TXT = (
    "Read the following case excerpt on school fitness assessment and answer the questions that follow:\n\n"
    "The Sports Authority of India (SAI) rolled out the national 'Khelo India Fitness Assessment in Schools' to identify "
    "baseline physical fitness indicators across Indian youth. In Model Senior Secondary School, physical education teachers "
    "assessed Class 2 students (aged 7) using Tier 1 protocols, and Class 10 students (aged 15) using Tier 2 protocols. "
    "For the primary children, teachers administered Body Mass Index (BMI) screening, the Flamingo Balance Test to measure static balance, "
    "and the Plate Tapping Test to gauge limb movement speed and coordination. In Class 10, the battery included the 50m sprint, "
    "600m run/walk, sit and reach box test, partial curl-ups, and push-ups (standard for boys and modified kneeling push-ups for girls). "
    "The assessment data was uploaded directly to the national Khelo India portal, establishing individual fitness report cards."
)
P1_M1_QS = [
    case_q("Test and Measurement in Sports", "Tier 1 Target Age Group",
           "According to the passage, which age category and class tier were tested using BMI, Flamingo Balance, and Plate Tapping?",
           "Primary students aged 5 to 8 years (Classes 1 to 3)",
           ["Senior secondary students aged 16 to 18 years", "Only university collegiate athletes", "Adult teachers and administrative staff"],
           "Khelo India Tier 1 tests (BMI, Flamingo Balance, Plate Tapping) are designated specifically for children aged 5 to 8 years."),
    case_q("Test and Measurement in Sports", "Plate Tapping Function",
           "What specific motor fitness quality does the Plate Tapping Test measure according to standard Khelo India guidelines?",
           "Speed and coordination of upper limb movement",
           ["Aerobic lung capacity", "Maximum jumping power", "Static hamstring flexibility"],
           "The Plate Tapping Test evaluates limb speed and coordination across rapid back-and-forth hand movements."),
    case_q("Test and Measurement in Sports", "Aerobic Testing for Adolescents",
           "Which test item from the Class 10 battery evaluated cardiorespiratory aerobic endurance?",
           "The 600 Metre Run or Walk Test",
           ["The 50 Metre Dash", "The Sit and Reach Test", "The Partial Curl-Up Test"],
           "The 600m run/walk challenges the heart and lungs to deliver sustained oxygen, assessing aerobic endurance."),
    case_q("Test and Measurement in Sports", "Gender Specificity in Push-Up Test",
           "How was the upper body muscular endurance test adapted for adolescent girls in the described testing session?",
           "Girls performed modified push-ups supported on their knees rather than standard toe-supported push-ups",
           ["Girls were excused from all physical fitness testing", "Girls performed standard pull-ups on an Olympic high bar", "Girls used 10-kg dumbbells instead of body weight"],
           "Under Khelo India norms, girls execute modified push-ups resting on knees to balance muscular load appropriately."),
    case_q("Test and Measurement in Sports", "National Digital Integration",
           "What was the primary administrative purpose of uploading school fitness results to the Khelo India digital portal?",
           "To build nationwide student fitness report cards and identify emerging sporting talent across schools",
           ["To publish names of failing students in daily newspapers", "To calculate property taxes for school sports grounds", "To permanently disqualify non-athletes from school"],
           "The portal aggregates youth fitness metrics to monitor national health indicators and spot prospective athletic talent.")
]

P2_M1_TXT = (
    "Read the following case study on tournament fixtures and answer the questions that follow:\n\n"
    "The District Sports Officer organized an inter-school volleyball championship featuring 19 participating teams. "
    "Due to time and budget limitations, the tournament committee chose a Single Knockout (Elimination) tournament format. "
    "To structure the bracket, the technical committee calculated the total number of matches as N - 1 = 18 matches. "
    "Because 19 is not an exact power of 2, Byes were calculated using the next higher power of 2 (32 - 19 = 13 Byes). "
    "The 19 teams were divided into two halves: Upper Half receiving (19 + 1)/2 = 10 teams, and Lower Half receiving (19 - 1)/2 = 9 teams. "
    "The 13 Byes were distributed systematically: 6 Byes in the Upper Half and 7 Byes in the Lower Half according to standard bye-allotment rules."
)
P2_M1_QS = [
    case_q("Management of Sporting Events", "Total Matches in Single Knockout",
           "For 19 participating teams in a single elimination tournament, how many total matches are played to determine the champion?",
           "18 matches (calculated as N - 1)",
           ["19 matches", "38 matches", "9 matches"],
           "In a single knockout tournament, the total number of matches equals N - 1 (19 - 1 = 18 matches)."),
    case_q("Management of Sporting Events", "Calculation of Total Byes",
           "How was the total number of Byes (13 Byes) mathematically calculated for 19 teams?",
           "Subtracting the number of teams from the next higher power of two (32 - 19 = 13)",
           ["Dividing 19 by 2 and adding 3", "Multiplying 19 by 2 and subtracting 20", "Taking the square root of 19"],
           "Total byes equal next higher power of 2 minus N: 2^5 = 32; 32 - 19 = 13 Byes."),
    case_q("Management of Sporting Events", "Division of Teams into Halves",
           "How many teams were allotted to the Upper Half and Lower Half respectively?",
           "10 teams in the Upper Half and 9 teams in the Lower Half",
           ["9 teams in the Upper Half and 10 teams in the Lower Half", "12 teams in Upper and 7 in Lower", "11 teams in Upper and 8 in Lower"],
           "For odd N, Upper Half = (N + 1)/2 = (19+1)/2 = 10; Lower Half = (N - 1)/2 = (19-1)/2 = 9."),
    case_q("Management of Sporting Events", "Distribution of Byes Across Halves",
           "How were the 13 total Byes divided between the Upper Half (NB_U) and Lower Half (NB_L)?",
           "6 Byes in the Upper Half and 7 Byes in the Lower Half",
           ["7 Byes in Upper Half and 6 in Lower Half", "10 Byes in Upper and 3 in Lower", "Equal 6.5 Byes in each half"],
           "For odd Byes, Upper Half = (NB - 1)/2 = (13-1)/2 = 6; Lower Half = (NB + 1)/2 = (13+1)/2 = 7."),
    case_q("Management of Sporting Events", "First Bye Assignment Rule",
           "According to standard tournament fixture rules, which team receives the very first Bye in the draw?",
           "The bottom-most team of the Lower Half",
           ["The top-most team of the Upper Half", "The center team of the Upper Half", "The winner of the previous year's toss"],
           "The first bye is always awarded to the last team of the lower half; second bye to first team of upper half.")
]

# Mock 2
P1_M2_TXT = (
    "Read the following excerpt on postural deformities in young athletes and answer the questions that follow:\n\n"
    "During an annual health screening at an athletic training center, coaches identified various postural deformities among trainees. "
    "Several junior badminton players exhibited 'Kyphosis' (an abnormal posterior curvature of the thoracic spine resulting in hunchback), "
    "often accompanied by 'Round Shoulders'. A few adolescent gymnasts presented with 'Lordosis', characterized by excessive inward curvature "
    "of the lumbar spine resulting from weak abdominal muscles and tight hip flexors. In the lower limbs, coaches screened for 'Genu Valgum' "
    "(Knock Knees) where the knees touch while ankles remain wide apart, and 'Genu Varum' (Bow Legs) where the knees remain wide apart when ankles touch. "
    "The sports physiotherapist prescribed Dhanurasana and Chakrasana for Kyphosis, and Halasana and Paschimottanasana for Lordosis."
)
P1_M2_QS = [
    case_q("Children and Women in Sports", "Kyphosis Spinal Location",
     "Kyphosis is an abnormal postural curvature specifically located in which anatomical region of the spine?",
     "The thoracic spine (dorsal upper back)",
     ["The lumbar lower spine", "The cervical neck spine", "The sacral bone"],
     "Kyphosis is an abnormal hyper-convexity of the thoracic vertebrae, creating a hunched upper back."),
    case_q("Children and Women in Sports", "Lordosis Etiology",
     "According to the excerpt, which muscular imbalance primarily contributes to lumbar Lordosis?",
     "Weak abdominal muscles paired with tight hip flexors and back extensor contracture",
     ["Weak neck muscles and short collarbones", "Excessive strength of the quadriceps tendons", "Fractures in the foot bones"],
     "Lumbar lordosis (swayback) stems from lax abdominals failing to stabilize the pelvis against tight hip flexors."),
    case_q("Children and Women in Sports", "Genu Valgum Clinical Sign",
     "How is 'Genu Valgum' (Knock Knees) clinically diagnosed during an upright standing postural assessment?",
     "The knees touch or overlap each other while the medial malleoli of the ankles remain separated",
     ["The knees remain wide apart while the ankles touch", "The feet are permanently bent backwards", "The toes touch while knees are separated by 30 cm"],
     "Genu valgum manifests when medial knees touch while medial malleoli at the ankles cannot touch."),
    case_q("Children and Women in Sports", "Corrective Asana for Kyphosis",
     "Which backward-bending yogic postures were recommended by the physiotherapist to correct thoracic Kyphosis?",
     "Dhanurasana (Bow Pose) and Chakrasana (Wheel Pose)",
     ["Paschimottanasana and Halasana", "Shavasana and Makarasana", "Sukhasana and Padmasana"],
     "Backward spinal extensions like Dhanurasana, Bhujangasana, and Chakrasana counteract thoracic flexion."),
    case_q("Children and Women in Sports", "Corrective Asana for Lordosis",
     "Why are forward-bending asanas like Paschimottanasana and Halasana prescribed for Lordosis?",
     "They flex the lumbar spine, stretch tight lower back extensors, and strengthen anterior abdominal core muscles",
     ["They force the knees to separate further", "They cause the thoracic spine to curve into a hunchback", "They increase the inward hollow of the lower back"],
     "Forward bending stretches hypertonic lumbar muscles and tilts the anteriorly tilted pelvis back toward neutral.")
]

P2_M2_TXT = (
    "Read the following case report on female athlete health and answer the questions that follow:\n\n"
    "An 18-year-old elite collegiate cross-country runner presented to the sports medicine clinic with recurrent tibial stress fractures, "
    "persistent lethargy, and a body mass index of 16.5 kg/m². Her clinical history revealed secondary amenorrhea (cessation of menstrual periods "
    "for eight consecutive months) following a restrictive low-carbohydrate, low-fat diet. A dual-energy X-ray absorptiometry (DEXA) scan "
    "revealed severe osteopenia in her femoral neck and lumbar vertebrae. The sports physician diagnosed her with the 'Female Athlete Triad'. "
    "The clinical care team emphasized that the root driver of the triad is Low Energy Availability (LEA)—an imbalance between dietary energy intake "
    "and the energy expenditure required for exercise—which suppresses the hypothalamic-pituitary-ovarian axis and induces estrogen deficiency."
)
P2_M2_QS = [
    case_q("Children and Women in Sports", "Three Components of Female Athlete Triad",
     "What are the three interrelated clinical components comprising the Female Athlete Triad?",
     "Low Energy Availability (disordered eating), Menstrual Dysfunction (amenorrhea), and Low Bone Mineral Density (osteoporosis)",
     ["Asthma, Diabetes, and Hypertension", "Kyphosis, Lordosis, and Scoliosis", "Sprains, Strains, and Fractures"],
     "The triad triad consists of low energy availability (with/without eating disorders), amenorrhea, and osteoporosis/osteopenia."),
    case_q("Children and Women in Sports", "Primary Root Driver of Triad",
     "According to the medical excerpt, what is the primary underlying driver triggering the entire cascade of the Female Athlete Triad?",
     "Low Energy Availability (LEA) where dietary calorie intake fails to match athletic energy expenditure",
     ["Inhaling excessive oxygen during high-altitude runs", "Wearing tight running footwear during competition", "Drinking cold water after workouts"],
     "Energy deficiency leaves insufficient residual energy for basal physiological functions, down-regulating reproductive and bone health."),
    case_q("Children and Women in Sports", "Secondary Amenorrhea Definition",
     "How is 'Secondary Amenorrhea' clinically defined in post-menarche female athletes?",
     "The cessation of regular menstrual cycles for 3 or more consecutive months (or 6 months if irregular) after menarche",
     ["The first onset of menstruation during puberty", "A regular 28-day menstrual cycle with no pain", "A normal pregnancy cycle in adult women"],
     "Primary amenorrhea is absence of menarche by age 15; secondary amenorrhea is cessation of established menses for 3+ consecutive months."),
    case_q("Children and Women in Sports", "Mechanism of Bone Loss in LEA",
     "Why does low energy availability cause premature bone mineral density loss and stress fractures in female athletes?",
     "Estrogen deficiency accelerates osteoclastic bone resorption while suppression of metabolic hormones halts osteoblastic bone formation",
     ["Excess calcium crystallizes in the blood vessels", "Bone marrow turns completely into muscle tissue", "Bones become twice as dense and shatter from weight"],
     "Estrogen is vital for bone preservation; its deficit uncouples bone remodeling, driving rapid bone mineral density loss."),
    case_q("Children and Women in Sports", "First-Line Clinical Management of LEA",
     "What is the first and most critical intervention step in the clinical management of the Female Athlete Triad?",
     "Increasing dietary caloric intake and adjusting training loads to restore healthy energy availability",
     ["Immediate surgical removal of the runner's ovaries", "Prescribing high-dose thyroid stimulants and appetite suppressants", "Forcing the athlete to run 40 miles daily"],
     "The cornerstone of treatment is restoring energy balance by increasing nutritional intake and moderating training expenditure.")
]

# Mock 3
P1_M3_TXT = (
    "Read the following clinical case study on yogic therapy for lifestyle diseases and answer the questions that follow:\n\n"
    "In an urban corporate wellness study, 60 sedentary executive employees suffering from Stage 1 essential hypertension and obesity "
    "(average BMI 31.8 kg/m²) participated in a 12-week supervised yogic intervention. The protocol prohibited high-speed dynamic movements "
    "and rapid breath holds. Participants performed Tadasana, Katichakrasana, and Pavanmuktasana to stimulate abdominal peristalsis and lipid metabolism. "
    "For blood pressure reduction, participants practiced Shavasana (Corpse Pose), Bhujangasana (Cobra Pose), and slow Nadi Shodhana pranayama. "
    "At the conclusion of the trial, participants demonstrated an average reduction of 14 mmHg in systolic blood pressure and a 4.2 kg reduction "
    "in visceral adipose mass. The cardiologists attributed these improvements to enhanced parasympathetic vagal tone and reduced systemic vascular resistance."
)
P1_M3_QS = [
    case_q("Yoga as Preventive Measure for Lifestyle Disease", "Physiological Cause of Blood Pressure Drop",
     "According to the cardiologists in the study, what physiological mechanism mediated the drop in systolic blood pressure following yoga?",
     "Enhanced parasympathetic vagal tone and reduced systemic peripheral vascular resistance",
     ["Increased constriction of renal blood vessels", "Permanent destruction of red blood cells", "Massive release of adrenaline and cortisol"],
     "Slow yogic relaxation and pranayama stimulate vagal parasympathetic activity, inducing arterial vasodilation and lowering blood pressure."),
    case_q("Yoga as Preventive Measure for Lifestyle Disease", "Role of Pavanmuktasana in Obesity",
     "How does Pavanmuktasana (Wind Relieving Pose) assist in alleviating digestive sluggishness associated with obesity?",
     "The thigh-to-abdomen compression massages intra-abdominal organs, expels trapped gas, and stimulates digestive motility",
     ["It eliminates the need for consuming food", "It turns all stomach contents into liquid bone", "It freezes the colon into immobility"],
     "Pavanmuktasana gently compresses abdominal viscera, relieving flatulence, constipation, and stimulating metabolic organ activity."),
    case_q("Yoga as Preventive Measure for Lifestyle Disease", "Shavasana Clinical Role in Hypertension",
     "Why is Shavasana considered the premier yogic asana for individuals diagnosed with hypertension?",
     "It induces profound neuromuscular relaxation, down-regulates sympathetic nervous overdrive, and lowers cardiac workload",
     ["It elevates heart rate to 200 beats per minute", "It stretches the skull bones apart", "It forces the runner to sprint while lying down"],
     "Shavasana fosters conscious psychophysiological relaxation, dampening sympathetic tone and reducing arterial pressure."),
    case_q("Yoga as Preventive Measure for Lifestyle Disease", "Prohibited Yogic Practices in Severe Hypertension",
     "Which category of yogic practices should be strictly avoided by individuals with severe hypertension?",
     "Vigorous inversions like Shirshasana (Headstand) and forceful breath retention (Kumbhaka)",
     ["Gentle supine relaxation in Shavasana", "Slow diaphragmatic abdominal breathing", "Sitting in Sukhasana with eyes closed"],
     "Inverted postures and breath-holding significantly spike intracranial and arterial blood pressure, posing severe cardiovascular risks."),
    case_q("Yoga as Preventive Measure for Lifestyle Disease", "Katichakrasana Movement Pattern",
     "What movement dynamic characterizes Katichakrasana (Standing Spinal Twist Pose) in managing abdominal obesity?",
     "Dynamic standing bilateral spinal twisting that tones the waist, obliques, and stimulates abdominal fat mobilization",
     ["Holding the breath while balancing on the head", "Lying completely motionless for two hours", "Jumping up and down touching the ceiling"],
     "Katichakrasana twists the trunk laterally, toning waistline obliques and promoting abdominal circulation.")
]

P2_M3_TXT = (
    "Read the following excerpt on adapted physical education and answer the questions that follow:\n\n"
    "Inclusive physical education mandates that Children with Special Needs (CWSN) participate meaningfully in sports alongside peers. "
    "At a district sports conclave, educators emphasized the distinction between 'Disability' (an objective anatomical impairment of body structure or function) "
    "and 'Disorder' (a medical condition that disrupts normal mental, emotional, or physiological functioning, such as ADHD, ASD, or ODD). "
    "The sports director showcased adapted games where rules, court dimensions, and equipment were customized—such as using beeper balls in blind football, "
    "lowering basketball rims, and implementing peer-assisted running. Furthermore, the committee highlighted the distinct missions of the Special Olympics "
    "(for individuals with intellectual disabilities) and the Paralympic Games (for athletes with physical and visual impairments)."
)
P2_M3_QS = [
    case_q("Physical Education and Sports for CWSN", "Disability vs Disorder Distinction",
     "Based on the excerpt, how does a 'Disability' fundamentally differ from a 'Disorder'?",
     "A Disability is an anatomical or physiological impairment limiting functional mobility, whereas a Disorder is a disruption of mental, behavioral, or metabolic functions",
     ["A Disability is always temporary, whereas a Disorder lasts only 24 hours", "A Disability occurs only in senior citizens, whereas a Disorder affects only infants", "There is no difference between them"],
     "Disabilities are functional/physical limitations; disorders are disruptions of emotional, cognitive, or physiological processing."),
    case_q("Physical Education and Sports for CWSN", "Equipment Adaptation Example",
     "Which practical modification cited in the passage illustrates adaptive sports equipment for visually impaired athletes?",
     "Beeper balls that emit auditory beeps so players can track the ball by sound",
     ["Transparent clear plastic balls that make no sound", "Solid lead balls weighing 15 kg", "Square balls that cannot roll across turf"],
     "Audible beeper balls enable athletes with visual impairments to track and intercept the ball via auditory localization."),
    case_q("Physical Education and Sports for CWSN", "Special Olympics Mission Target",
     "The Special Olympics movement caters specifically to athletes who possess which category of challenges?",
     "Intellectual and developmental disabilities",
     ["Physical amputations and spinal cord lesions", "Severe dental cavities", "Normal athletes who prefer not to run"],
     "Special Olympics empowers individuals with intellectual disabilities; Paralympics caters primarily to physical/visual impairments."),
    case_q("Physical Education and Sports for CWSN", "ADHD Behavior Profile",
     "What clinical behavioral triad characterizes Attention Deficit Hyperactivity Disorder (ADHD) in school physical education settings?",
     "Developmentally inappropriate inattention, hyperactivity, and impulsive motor behaviors",
     ["An inability to feel physical pain or touch", "Extreme muscular stiffness and bone brittleness", "Total loss of memory after eating lunch"],
     "ADHD manifests through chronic inattention, motor restlessness, and impulsivity requiring structured, engaging physical tasks."),
    case_q("Physical Education and Sports for CWSN", "Philosophy of Inclusive Education",
     "What is the foundational philosophy behind 'Inclusive Physical Education' for CWSN?",
     "Ensuring that students of all physical abilities learn and play together in the general educational environment with appropriate adaptations",
     ["Confining children with disabilities to locked, isolated rooms away from schools", "Forcing children with disabilities to watch sports without participating", "Banning all competitive sports from school campuses"],
     "Inclusion guarantees equal access, dismantling segregation by adapting rules and equipment so diverse abilities thrive together.")
]

# Mock 4
P1_M4_TXT = (
    "Read the following excerpt on sports nutrition and answer the questions that follow:\n\n"
    "To prepare for the National Marathon Championship, an elite running team implemented a structured dietary periodization plan. "
    "The sports dietitian explained that carbohydrates serve as the primary fuel for high-intensity sustained exercise, stored as glycogen "
    "in skeletal muscle (~400–500 grams) and the liver (~80–100 grams). During the final three days before the race, the runners practiced "
    "'Carbohydrate Loading' (consuming 8–10 g/kg of body weight daily of complex starches) to maximize intramuscular glycogen saturation. "
    "During the race, athletes ingested isotonic electrolyte beverages containing 6% to 8% carbohydrate solutions to maintain blood glucose "
    "and replace sodium lost through sweat. Post-race recovery emphasized the '4:1 carbohydrate-to-protein ratio' within the first 45 minutes "
    "to accelerate glycogen re-synthesis and initiate muscle protein repair."
)
P1_M4_QS = [
    case_q("Sports and Nutrition", "Primary Storage Sites of Glycogen",
     "According to the excerpt, where are the primary anatomical reservoirs of glycogen stored in the human body?",
     "Skeletal muscle tissue and the liver",
     ["The stomach wall and bladder", "The fingernails and hair follicles", "The skull bones and dental enamel"],
     "Endogenous carbohydrates are stored primarily as intramyocellular glycogen in skeletal muscle and hepatic glycogen in the liver."),
    case_q("Sports and Nutrition", "Carbohydrate Loading Objective",
     "What is the primary physiological objective of practicing 'Carbohydrate Loading' before a marathon?",
     "To supersaturate muscle and liver glycogen stores, delaying the onset of glycogen depletion and fatigue ('hitting the wall')",
     ["To double the runner's body fat percentage before the start", "To dehydrate the body so the runner feels lighter", "To stop the heart from beating too fast"],
     "Carb loading maximizes pre-race glycogen reservoirs, postponing glycogen exhaustion during prolonged endurance events."),
    case_q("Sports and Nutrition", "Optimal Carbohydrate Beverage Concentration",
     "What is the scientifically recommended carbohydrate concentration for sports hydration drinks during running?",
     "6% to 8% carbohydrate solution",
     ["50% to 60% thick sugary syrup", "0.01% with zero electrolytes", "95% pure alcohol solution"],
     "A 6-8% carbohydrate solution provides rapid gastric emptying and intestinal fluid absorption without causing osmotic gastrointestinal distress."),
    case_q("Sports and Nutrition", "Electrolyte Replacement Need",
     "Why is sodium replacement critical in fluid hydration beverages consumed during prolonged endurance races in hot conditions?",
     "To prevent 'Hyponatremia' (water intoxication / low blood sodium) and sustain fluid retention and plasma osmolarity",
     ["To make the runner feel thirsty so they stop running", "To turn sweat into solid salt crystals on the skin", "To increase core body temperature"],
     "Replacing sodium lost in sweat maintains serum osmolarity, prevents cellular swelling/hyponatremia, and aids voluntary rehydration."),
    case_q("Sports and Nutrition", "Post-Exercise Recovery Nutrient Ratio",
     "What nutrient ratio consumed within 45 minutes post-exercise optimizes glycogen resynthesis and muscle repair?",
     "A 4:1 (or 3:1) ratio of Carbohydrates to Protein",
     ["A 10:1 ratio of Saturated Fat to Protein", "100% pure protein with zero carbohydrates", "A 1:10 ratio of Carbohydrate to Fat"],
     "Combining 3-4 parts carbohydrates with 1 part protein spikes insulin, maximizing muscle glycogen re-synthesis and cellular protein remodeling.")
]

P2_M4_TXT = (
    "Read the following case report on disordered eating and dietary pitfalls in sports and answer the questions that follow:\n\n"
    "A 19-year-old competitive artistic gymnast was admitted to a sports rehabilitation clinic exhibiting severe weight loss, "
    "amenorrhea, and bradycardia (resting heart rate 38 bpm). Her coach had subjected her to daily public weigh-ins and restrictive calorie goals. "
    "Psychiatric evaluation revealed an intense, irrational fear of gaining weight and a severely distorted body image, diagnosing 'Anorexia Nervosa'. "
    "The sports dietitian noted that athletes frequently fall prey to dangerous dietary fads and 'food myths'—such as completely cutting out healthy dietary fats, "
    "skipping breakfast to 'burn fat faster', or believing that protein supplements automatically build muscle without mechanical resistance training. "
    "The clinical protocol mandated an immediate cessation of weigh-ins, supportive nutritional therapy, and cognitive-behavioral counseling."
)
P2_M4_QS = [
    case_q("Sports and Nutrition", "Anorexia Nervosa Core Characteristics",
     "What are the central diagnostic hallmarks of Anorexia Nervosa as described in the case report?",
     "Severe self-induced starvation, distorted body image, intense fear of gaining weight, and extreme emaciation",
     ["Episodes of uncontrollable binge eating followed by sleeping", "An addiction to drinking 10 liters of milk daily", "Eating only non-food objects like paper and glass"],
     "Anorexia nervosa is an eating disorder characterized by calorie restriction, morbid dread of fatness, and distorted body perception."),
    case_q("Sports and Nutrition", "Public Weigh-In Hazards in Coaching",
     "Why are punitive coaching practices like mandatory public weigh-ins condemned by sports psychologists?",
     "They trigger body dissatisfaction, intense anxiety, shame, and foster pathogenic disordered eating behaviors",
     ["They take too much time away from watching television", "They cause scales to break down mechanically", "They make athletes grow taller than the coach"],
     "Public weigh-ins induce shame and psychological trauma, significantly escalating risks of clinical eating disorders."),
    case_q("Sports and Nutrition", "Food Myth: Skipping Breakfast",
     "Why is the common weight-loss myth that 'skipping breakfast accelerates athletic fat loss' scientifically flawed?",
     "Skipping meals lowers resting metabolic rate, causes daytime cognitive fatigue, and triggers compensatory binge-eating later in the day",
     ["Breakfast is the only meal of the day that contains vitamins", "Skipping breakfast causes instant cardiac arrest", "Breakfast foods turn directly into bone marrow"],
     "Skipping breakfast disrupts metabolic homeostasis, impairs morning training quality, and often leads to evening hyperphagia."),
    case_q("Sports and Nutrition", "Protein Myth Fallacy",
     "Why is the belief that 'consuming massive excess protein automatically produces large muscles without weightlifting' false?",
     "Muscle protein synthesis requires progressive resistance overload stimulus; unneeded excess protein is deaminated and metabolized or stored as fat",
     ["The human digestive system is incapable of digesting protein", "Protein turns into poisonous acids in the stomach", "Protein prevents muscle fibers from contracting"],
     "Muscles hypertrophy in response to mechanical tension; excess protein beyond synthesis requirements is simply oxidized or stored as fat."),
    case_q("Sports and Nutrition", "Essential Role of Dietary Fats",
     "Why is the complete elimination of dietary fat dangerous for competitive athletes?",
     "Fats are essential for steroid hormone synthesis (testosterone, estrogen), absorption of fat-soluble vitamins (A, D, E, K), and cellular membrane integrity",
     ["Fats provide the only fuel for 100-meter sprints", "Fats prevent the skull from shrinking", "Fats make the body completely waterproof"],
     "Lipids provide essential fatty acids, enable absorption of fat-soluble vitamins, and supply substrates for endocrine hormone production.")
]

# Mock 5
P1_M5_TXT = (
    "Read the following excerpt on motor fitness testing and answer the questions that follow:\n\n"
    "To evaluate the physical literacy and general motor capacity of incoming high school athletes, a state sports academy administered "
    "the Barrow Three-Item General Motor Ability Test. Devised by Dr. Harold M. Barrow in 1953, the test assesses explosive power, agility, "
    "and arm-shoulder strength using three standardized items: the Standing Broad Jump, the Zig-Zag Run, and the 6-lb Medicine Ball Put. "
    "In the Standing Broad Jump, athletes were given three trials to jump horizontally from behind a scratch line, with the farthest mark "
    "of the rear heel recorded. In the Zig-Zag Run, runners navigated a 16 × 10 ft course weaving around five cones for three complete laps. "
    "In the Medicine Ball Put, boys thrust a 6-lb medicine ball from the shoulder behind a restraining line. "
    "Statistical correlation proved this 3-item battery reliably predicted overall motor performance."
)
P1_M5_QS = [
    case_q("Test and Measurement in Sports", "Barrow Battery Item Composition",
     "Which three standardized test items constitute the Barrow Three-Item Motor Ability battery?",
     "Standing Broad Jump, Zig-Zag Run, and 6-lb Medicine Ball Put",
     ["50m Dash, 600m Run, and Sit and Reach Test", "Harvard Step Test, Push-ups, and Curl-ups", "Flamingo Balance, Plate Tapping, and BMI"],
     "Harold Barrow's three-item battery consists of standing broad jump, zig-zag run, and medicine ball put."),
    case_q("Test and Measurement in Sports", "Standing Broad Jump Parameter",
     "What primary motor fitness component is evaluated by the Standing Broad Jump?",
     "Explosive power and horizontal force of the lower extremities",
     ["Static hamstring flexibility", "Aerobic cardiorespiratory endurance", "Fine motor finger dexterity"],
     "The standing broad jump measures explosive leg extensor power generated during a stationary two-footed take-off."),
    case_q("Test and Measurement in Sports", "Measurement Point in Broad Jump",
     "From what anatomical point of contact is distance measured in the Barrow Standing Broad Jump?",
     "From the take-off line to the nearest point of contact made by the rear heel (or any body part closest to the line)",
     ["To the farthest fingertip mark on the sand", "To the front of the toes of the leading foot", "To the athlete's center of gravity in mid-air"],
     "Distance is measured perpendicular from the take-off board to the contact mark closest to the take-off line."),
    case_q("Test and Measurement in Sports", "Zig-Zag Run Course Dimensions",
     "What are the standardized dimensions and lap requirements of the Barrow Zig-Zag Run course?",
     "A 16 × 10 foot rectangle with 5 cones, completed for 3 continuous circuits",
     ["A 100 × 50 meter field completed for 1 lap", "A circular 400-meter track with hurdles", "A 5 × 5 foot square completed for 10 laps"],
     "Barrow zig-zag setup uses a 16x10 ft rectangle with 4 corner cones and 1 center cone, run for 3 complete laps."),
    case_q("Test and Measurement in Sports", "Medicine Ball Put Weight for High School Boys",
     "What is the standardized weight of the medicine ball used in the Barrow test for high school boys?",
     "6 pounds (approx. 2.72 kg to 3 kg)",
     ["16 pounds", "1 pound", "25 pounds"],
     "High school boys throw a 6-lb medicine ball from the shoulder behind a restraining line.")
]

P2_M5_TXT = (
    "Read the following excerpt on cardiovascular endurance testing and answer the questions that follow:\n\n"
    "During a pre-season physiological screening, 30 collegiate basketball players took the Harvard Step Test to evaluate cardiorespiratory fitness. "
    "Developed in 1943 by Lucien Brouha at the Harvard Fatigue Laboratory, the test requires participants to step up and down on a 20-inch wooden bench "
    "at a cadence of 30 steps per minute (120 metronome beats/min) for up to 5 minutes (300 seconds). "
    "Immediately after stepping, athletes sat down, and technicians counted recovery heartbeats across three 30-second windows: 1–1.5 min, 2–2.5 min, "
    "and 3–3.5 minutes. Using Brouha's Long Form formula: Fitness Index = (100 × Duration in sec) / [2 × (P1 + P2 + P3)], athletes scoring above 90 "
    "were rated 'Excellent', while those below 55 were classified as having poor aerobic conditioning. "
    "A rapid Short Form was also calculated: Fitness Index = (100 × Duration in sec) / (5.5 × P1)."
)
P2_M5_QS = [
    case_q("Test and Measurement in Sports", "Standard Bench Height for Males",
     "What is the standardized bench height used for adult males in the classic Harvard Step Test?",
     "20 inches (approx. 50.8 cm)",
     ["12 inches", "30 inches", "8 inches"],
     "Lucien Brouha standardized the male stepping bench at 20 inches (approx. 50.8 cm)."),
    case_q("Test and Measurement in Sports", "Stepping Cadence and Metronome Setting",
     "What stepping frequency and metronome beat rate are required during the Harvard Step Test?",
     "30 steps per minute, with metronome set at 120 beats per minute (4 beats per complete step cycle)",
     ["60 steps per minute at 60 bpm", "15 steps per minute at 30 bpm", "50 steps per minute at 200 bpm"],
     "The four-count stepping cadence (up-up-down-down) at 30 cycles/min requires a 120 bpm metronome setting."),
    case_q("Test and Measurement in Sports", "Long Form Recovery Pulse Windows",
     "Across which three post-exercise intervals are recovery pulses counted in the Long Form Fitness Index?",
     "1 to 1.5 minutes, 2 to 2.5 minutes, and 3 to 3.5 minutes",
     ["0 to 1 minute, 1 to 2 minutes, and 2 to 3 minutes", "5 to 6 minutes, 10 to 11 minutes, and 15 to 16 minutes", "During the actual stepping phase"],
     "Long form pulse counts are logged for 30 seconds at 1:00-1:30, 2:00-2:30, and 3:00-3:30 post-exercise."),
    case_q("Test and Measurement in Sports", "Fitness Index Calculation Example",
     "If an athlete completes the full 300 seconds and registers pulse counts of 60, 50, and 40 (sum = 150), what is their Long Form Fitness Index?",
     "100.0 (Excellent Aerobic Fitness)",
     ["50.0 (Poor)", "75.0 (Average)", "30.0 (Very Poor)"],
     "Fitness Index = (100 × 300) / (2 × 150) = 30000 / 300 = 100.0, indicating excellent cardiorespiratory capacity."),
    case_q("Test and Measurement in Sports", "Physiological Rationale of Fast Recovery",
     "Why does a rapid deceleration of heart rate during the recovery phase indicate superior cardiorespiratory fitness?",
     "Trained athletes exhibit high stroke volumes and vigorous parasympathetic vagal reactivation, clearing metabolic strain rapidly",
     ["Their hearts stop beating completely between tests", "They produce zero body heat during exercise", "They have no blood vessels in their extremities"],
     "Conditioned hearts generate higher stroke volumes and prompt vagal reactivation, restoring basal heart rate quickly.")
]

# Mock 6
P1_M6_TXT = (
    "Read the following excerpt on senior citizen functional assessment and answer the questions that follow:\n\n"
    "A geriatric physical therapy center implemented the Rikli and Jones Senior Citizen Fitness Test (Fullerton Functional Test) "
    "to evaluate 80 community-dwelling older adults (aged 65–78). Developed by Roberta Rikli and C. Jessie Jones, this battery evaluates "
    "functional capacities required for independent daily living. The assessment included: the Chair Stand Test (30 seconds of sit-to-stand repetitions "
    "evaluating lower body strength), the Arm Curl Test (30 seconds curling 5-lb dumbbells for women and 8-lb for men to evaluate upper body strength), "
    "the Chair Sit and Reach Test (hamstring flexibility), the Back Scratch Test (shoulder range of motion), the Eight-Foot Up and Go Test "
    "(measuring agility and dynamic balance to gauge fall risk), and the Six-Minute Walk Test (aerobic functional endurance)."
)
P1_M6_QS = [
    case_q("Test and Measurement in Sports", "Target Population of Rikli & Jones Battery",
     "The Rikli and Jones fitness test battery was specifically developed for which target demographic?",
     "Older adults and senior citizens (aged 60 and above) to evaluate functional independence",
     ["Infants learning to crawl", "Olympic sprinters training for 100-meter events", "Undergraduate university athletes"],
     "Rikli and Jones formulated the test battery specifically for older adults to maintain functional autonomy in daily life."),
    case_q("Test and Measurement in Sports", "Arm Curl Dumbbell Weight Standards",
     "What are the standardized dumbbell weights utilized in the 30-second Arm Curl Test for men and women?",
     "8 pounds (3.6 kg) for men, and 5 pounds (2.3 kg) for women",
     ["20 pounds for men, and 15 pounds for women", "2 pounds for men, and 1 pound for women", "Identical 10-kg iron barbells for both sexes"],
     "The standardized protocol prescribes 8 lbs for men and 5 lbs for women during the 30-second arm curl."),
    case_q("Test and Measurement in Sports", "Eight-Foot Up and Go Distance and Objective",
     "What is the cone distance and functional objective of the Eight-Foot Up and Go Test?",
     "8 feet (2.44 meters); evaluates dynamic balance, agility, and fall risk during locomotion",
     ["80 meters; evaluates maximal sprinting speed", "8 inches; evaluates toe-touch flexibility", "8 yards; evaluates throwing power"],
     "The 8-foot up and go assesses agility and dynamic balance around an 8-ft (2.44 m) cone to screen for fall hazards."),
    case_q("Test and Measurement in Sports", "Chair Sit and Reach Alignment",
     "During the Chair Sit and Reach Test, what is the mandatory position of the tested leg?",
     "The tested leg is extended straight with heel on the floor and ankle flexed at 90 degrees, while knee remains fully extended",
     ["The knee is bent at 90 degrees touching the chest", "The leg is lifted high into the air above the head", "The ankle is rotated in continuous circles"],
     "The tested leg must remain straight with heel on the floor and ankle dorsiflexed at 90 degrees to isolate hamstring flexibility."),
    case_q("Test and Measurement in Sports", "Indoor Alternative to Six-Minute Walk",
     "When physical space or bad weather prevents administering the Six-Minute Walk Test, what alternative test is prescribed?",
     "The Two-Minute Step-in-Place Test",
     ["The Cooper 12-minute track run", "The 100-meter sprint hurdle race", "The Harvard Step Test on a 20-inch bench"],
     "The 2-Minute Step-in-Place test serves as the standardized indoor substitute for the 6-minute walk test in seniors.")
]

P2_M6_TXT = (
    "Read the following excerpt on cardiovascular exercise adaptations and answer the questions that follow:\n\n"
    "In an exercise physiology laboratory, sports scientists examined cardiovascular remodeling in elite endurance cyclists compared to sedentary controls. "
    "The cyclists exhibited classical features of 'Athlete's Heart': eccentric left ventricular hypertrophy with increased chamber cavity volume and wall thickness. "
    "At rest, the cyclists demonstrated marked resting bradycardia (resting heart rates between 38 and 44 bpm) compared to the controls (72 bpm). "
    "Echocardiograms revealed that the resting stroke volume in the cyclists averaged 125 mL/beat compared to 70 mL/beat in controls. "
    "During maximal treadmill exercise, the cyclists' cardiac output ($Q = SV \times HR$) expanded to 35 Liters/minute, whereas the controls plateaued at 20 L/min. "
    "The physiologists explained that high resting stroke volume preserves normal basal resting cardiac output (~5 L/min) while drastically reducing resting cardiac workload."
)
P2_M6_QS = [
    case_q("Physiology and Injuries in Sports", "Athlete's Heart Structural Features",
     "According to the excerpt, what structural remodeling characterizes the physiological 'Athlete's Heart' in endurance athletes?",
     "Benign left ventricular eccentric hypertrophy with increased ventricular cavity volume and wall thickness",
     ["Narrowing of all four heart valves causing congestive heart failure", "Shrinkage of the heart muscle into connective scar tissue", "Severe atherosclerotic calcification of the aorta"],
     "Athlete's heart features physiological left ventricular dilation and wall hypertrophy, accommodating high stroke volumes."),
    case_q("Physiology and Injuries in Sports", "Mechanism of Resting Bradycardia",
     "Why do elite endurance athletes maintain a resting heart rate below 50 beats per minute (resting bradycardia)?",
     "Substantially increased stroke volume pumps the required resting cardiac output (~5 L/min) with far fewer beats, driven by high vagal tone",
     ["Their blood circulation stops completely when sitting down", "They suffer from severe hypothermia during resting hours", "Their lungs take over the function of pumping blood"],
     "High stroke volume allows the heart to maintain normal 5 L/min basal output at a much lower resting heart rate."),
    case_q("Physiology and Injuries in Sports", "Cardiac Output Formula",
     "How is Cardiac Output ($Q$) mathematically defined and calculated in exercise physiology?",
     "Cardiac Output = Stroke Volume multiplied by Heart Rate ($Q = SV \times HR$)",
     ["Cardiac Output = Blood Pressure divided by Body Weight", "Cardiac Output = Tidal Volume multiplied by Vital Capacity", "Cardiac Output = Heart Rate divided by Stroke Volume"],
     "Cardiac output ($Q$) is the product of Stroke Volume (volume per beat) and Heart Rate (beats per minute)."),
    case_q("Physiology and Injuries in Sports", "Peak Exercise Cardiac Output",
     "What peak cardiac output did the elite endurance cyclists achieve during maximal exertion according to the passage?",
     "Approximately 35 Liters per minute (compared to ~20 L/min in untrained controls)",
     ["5 Liters per minute", "100 Liters per minute", "1 Liter per minute"],
     "Elite endurance athletes can expand cardiac output from ~5 L/min at rest up to 35–40 L/min during maximal exercise."),
    case_q("Physiology and Injuries in Sports", "Clinical Nature of Athlete's Heart",
     "How does sports cardiology classify 'Athlete's Heart' in conditioned athletes?",
     "A benign, healthy physiological adaptation that regresses naturally with detraining, possessing normal diastolic and systolic function",
     ["A deadly genetic mutation requiring immediate open-heart surgery", "An infectious disease caused by dirty swimming pool water", "A permanent deformity that makes normal life impossible"],
     "Athlete's heart is a benign physiological adaptation with normal or enhanced cardiac function that regresses upon cessation of training.")
]

# Mock 7
P1_M7_TXT = (
    "Read the following excerpt on skeletal muscle fiber physiology and answer the questions that follow:\n\n"
    "Muscle biopsy samples taken from national sprinters and marathon runners revealed striking physiological differences in fiber architecture. "
    "The 100m sprinters possessed over 75% Fast-Twitch (Type IIx and IIa) muscle fibers. These fibers exhibit high myosin ATPase activity, "
    "abundant phosphagen and glycolytic enzymes, rapid contraction velocity, and generate explosive force, but fatigue rapidly due to low mitochondrial content. "
    "Conversely, the elite marathoners possessed over 80% Slow-Twitch (Type I) muscle fibers. Type I fibers are rich in myoglobin, surrounded by dense capillary "
    "networks, and packed with mitochondria, making them highly resistant to fatigue during prolonged aerobic metabolism. "
    "Physiologists noted that while training optimizes fiber size and metabolic enzyme capacity, the baseline fiber distribution is predominantly genetically determined."
)
P1_M7_QS = [
    case_q("Physiology and Injuries in Sports", "Type I Muscle Fiber Characteristics",
     "What structural and biochemical features characterize Slow-Twitch (Type I) muscle fibers?",
     "Dense capillary networks, high myoglobin concentration, abundant mitochondria, and high fatigue resistance",
     ["Low blood supply, absence of mitochondria, and instantaneous fatigue", "White color, zero myoglobin, and extreme contraction velocity", "Inability to contract in the presence of oxygen"],
     "Type I fibers are built for oxidative endurance: rich in myoglobin, capillaries, and oxidative mitochondria."),
    case_q("Physiology and Injuries in Sports", "Type IIx Fast-Twitch Properties",
     "Why are Fast-Twitch (Type IIx) fibers ideally suited for 100-meter sprinting?",
     "They possess high glycolytic enzyme capacity and rapid cross-bridge cycling velocity to generate maximal explosive power",
     ["They burn body fat for 10 consecutive hours without stopping", "They do not require any blood or ATP to contract", "They are made of cartilage instead of muscle protein"],
     "Type IIx fibers contract at maximum velocity with high anaerobic glycolytic throughput, generating explosive sprint power."),
    case_q("Physiology and Injuries in Sports", "Genetic Determinism of Fiber Ratio",
     "According to exercise physiologists, to what degree can training alter an athlete's basic Type I vs Type II fiber percentage?",
     "The overall proportion is predominantly genetically inherited and cannot be completely converted from pure Type I to pure Type II",
     ["Training can turn 100% of slow fibers into fast fibers within one week", "Fiber composition is determined purely by the brand of shoes worn", "All human beings are born with identical muscle fibers"],
     "Baseline fiber distribution is genetically set; training alters fiber cross-sectional area and metabolic enzyme profiles within types."),
    case_q("Physiology and Injuries in Sports", "Function of Myoglobin in Type I Fibers",
     "What is the specific physiological role of myoglobin in slow-twitch oxidative muscle fibers?",
     "It binds and stores oxygen within muscle cells and accelerates oxygen diffusion to mitochondria for aerobic energy production",
     ["It stores glucose in the liver", "It dissolves bone spurs in knee joints", "It contracts the biceps during sprint acceleration"],
     "Myoglobin acts as an intramuscular oxygen reservoir, facilitating rapid O2 transport to mitochondria."),
    case_q("Physiology and Injuries in Sports", "Fatigue Resistance in Marathoners",
     "Why can elite marathoners with 80% Type I fibers maintain running pace for over two hours without muscular failure?",
     "Abundant mitochondria and capillary density allow sustained aerobic ATP production via oxidative phosphorylation without lactic acidosis",
     ["They consume zero oxygen while running", "Their muscles do not contain any sensory nerves", "They run with their eyes closed to save energy"],
     "Dense mitochondria and capillaries supply continuous aerobic ATP from fat and carbohydrate oxidation, preventing acidosis.")
]

P2_M7_TXT = (
    "Read the following clinical case report on acute sports injury management and answer the questions that follow:\n\n"
    "During an inter-collegiate football match, a defender suffered a severe inversion trauma of the right ankle while contesting a header. "
    "The team physiotherapist observed immediate swelling, localized tenderness over the anterior talofibular ligament, and inability to bear weight, "
    "diagnosing an acute Grade II ankle sprain. The medical staff implemented the PRICE protocol on the sideline. "
    "First, they Protected the ankle with a rigid stirrup splint, and Rested the player, forbidding any weight-bearing. "
    "They applied crushed Ice in a damp towel for 20 minutes to constrict damaged capillaries and minimize secondary hypoxic tissue injury. "
    "An elastic bandage was applied for Compression from the toes upward toward the calf, and the leg was Elevated above heart level. "
    "The player was explicitly warned to avoid 'HARM' (Heat, Alcohol, Running, and Massage) during the acute 48-hour inflammatory phase."
)
P2_M7_QS = [
    case_q("Physiology and Injuries in Sports", "Anatomical Tissue Injured in Sprain",
     "In an ankle sprain, which specific anatomical structure sustains stretching or tearing damage?",
     "Ligaments (fibrous connective tissue connecting bone to bone)",
     ["Tendons connecting muscle to bone", "The femur and tibia bone shafts", "The epithelial skin epidermis only"],
     "A sprain specifically involves traumatic injury to ligaments connecting articulating bones."),
    case_q("Physiology and Injuries in Sports", "Physiological Rationale for Sideline Ice",
     "Why is ice (cryotherapy) applied immediately to an acute sprain or contusion?",
     "It causes vasoconstriction, reducing capillary hemorrhaging, inflammatory swelling, and cellular metabolic demand",
     ["It heats the muscles up to boiling temperature", "It glues torn ligament ends back together instantly", "It freezes the bone solid to prevent fractures"],
     "Cryotherapy constricts local blood vessels, curbing hemorrhage, swelling, and secondary ischemic injury."),
    case_q("Physiology and Injuries in Sports", "Distal-to-Proximal Compression Wrapping",
     "Why must an elastic compression wrap be applied starting from the toes and moving upward toward the calf?",
     "To encourage venous and lymphatic fluid return toward the heart, preventing pooling of edema in the distal extremity",
     ["To force all blood down into the toes to increase foot warmth", "To prevent the athlete from taking off their socks", "To make the shoe fit more tightly"],
     "Wrapping from distal to proximal supports the natural lymphatic and venous drainage gradient toward the heart."),
    case_q("Physiology and Injuries in Sports", "Elevation Physiological Rule",
     "What is the mandatory positioning requirement for effective 'Elevation' in the PRICE protocol?",
     "The injured extremity must be elevated above the level of the athlete's heart",
     ["The limb should hang down toward the floor", "The limb should be buried in warm sand", "The limb should be placed behind the athlete's neck"],
     "Elevating above heart level utilizes gravity to decrease hydrostatic pressure and drain inflammatory fluid."),
    case_q("Physiology and Injuries in Sports", "HARM Protocol Prohibition",
     "What harmful factors are represented by the acronym 'HARM' that must be avoided in the acute 48 hours post-injury?",
     "Heat, Alcohol, Running (premature exercise), and vigorous Massage",
     ["Hospitals, Ambulances, Radiographs, and Medicine", "Hydration, Apples, Rest, and Minerals", "Helmets, Anklets, Rib-guards, and Mouthpieces"],
     "Heat, alcohol, running, and massage promote bleeding and vasodilation, worsening acute tissue swelling.")
]

# Mock 8
P1_M8_TXT = (
    "Read the following excerpt on skeletal sports trauma and answer the questions that follow:\n\n"
    "In collision sports such as rugby, ice hockey, and kabaddi, high-velocity impacts can cause severe bone and joint trauma. "
    "Sports medicine physicians classify fractures into distinct categories based on bone displacement and structural integrity. "
    "A 'Simple (Closed) Fracture' leaves the overlying skin intact, whereas a 'Compound (Open) Fracture' occurs when jagged bone ends puncture "
    "the skin, creating an open wound with severe risk of deep osteomyelitis infection. Pediatric athletes frequently present with 'Greenstick Fractures', "
    "where the flexible bone breaks on one cortex and bends on the other without completely snapping. High-energy vehicular or collision accidents "
    "can cause 'Comminuted Fractures', shattering the bone into three or more fragments. For joint injuries, a 'Dislocation' represents complete separation "
    "of articulating bones from their socket. First responders are taught never to attempt manual reduction on the field, but to immobilize and refer."
)
P1_M8_QS = [
    case_q("Physiology and Injuries in Sports", "Defining Hazard of Compound Fracture",
     "What primary medical danger distinguishes a Compound (Open) fracture from a Simple (Closed) fracture?",
     "The broken bone pierces the skin, exposing deep osseous tissue to external pathogens and severe osteomyelitis infection risk",
     ["The bone heals automatically within five minutes", "There is zero pain or hemorrhaging", "The injury occurs only in the hair and nails"],
     "Compound fractures breach skin integrity, creating direct exposure of bone marrow to bacteria and high infection risk."),
    case_q("Physiology and Injuries in Sports", "Greenstick Fracture Vulnerability",
     "Why do Greenstick fractures occur almost exclusively in young children rather than older adults?",
     "Pediatric bones possess high organic collagen content, thick periosteum, and pliable flexibility that bends before snapping completely",
     ["Children do not have any bones in their arms", "Children have bones made of solid iron", "Children are immune to sports collisions"],
     "Supple pediatric bones with thick periosteum bend on the compressive side while breaking incompletely on the tensile cortex."),
    case_q("Physiology and Injuries in Sports", "Comminuted Fracture Pathology",
     "What anatomical structural damage characterizes a 'Comminuted Fracture'?",
     "The bone is shattered, splintered, or crushed into three or more distinct fragments",
     ["The bone ends are bent without any crack", "A single microscopic crack in the foot bone", "A temporary sprain of a joint ligament"],
     "Comminuted fractures involve high-energy trauma breaking the bone into multiple separate fragments."),
    case_q("Physiology and Injuries in Sports", "On-Field Rule for Joint Dislocations",
     "What is the universal first-aid protocol when encountering a dislocated shoulder or elbow on the field?",
     "Do not attempt to force the joint back into the socket; splint and immobilize in the presenting position and arrange urgent medical referral",
     ["Pull the arm as violently as possible until a loud pop is heard", "Force the athlete to continue playing the match", "Apply boiling water directly to the joint"],
     "Forcible field reduction risks severing nerves or brachial arteries; immobilization and medical referral are mandatory."),
    case_q("Physiology and Injuries in Sports", "Splinting Rule Across Joints",
     "Why must a rigid fracture splint immobilize both the joint above AND the joint below the suspected fracture site?",
     "To eliminate muscular movement and rotation that could displace bone fragments and lacerate adjacent neurovascular bundles",
     ["To cover as much skin as possible to prevent sunburn", "To make the splint heavy so the athlete cannot run", "Because splints are made only in one size"],
     "Immobilizing the joint above and below neutralizes muscular torque across the fracture line, preventing fragment displacement.")
]

P2_M8_TXT = (
    "Read the following excerpt on Newtonian biomechanics in track and field and answer the questions that follow:\n\n"
    "Track and field events provide direct real-world demonstrations of Sir Isaac Newton's Three Laws of Motion. "
    "At the start of the 100m sprint, an athlete on the starting blocks is in a state of static equilibrium, demonstrating the Law of Inertia (First Law): "
    "the runner remains at rest until explosive muscular leg drive exerts an external unbalanced force to overcome that resting inertia. "
    "In the shot put, Newton's Second Law of Motion ($F = m \times a$) dictates that applying greater muscular force to the 7.26-kg shot produces "
    "a proportionally greater acceleration at release, resulting in higher launch velocity and greater distance. "
    "In the high jump take-off, Newton's Third Law (Action and Reaction) is paramount: the jumper drives the take-off foot downward and backward "
    "into the ground with extreme force, and the ground exerts an equal and opposite Ground Reaction Force (GRF) upward, propelling the athlete over the bar."
)
P2_M8_QS = [
    case_q("Biomechanics and Sports", "Starting Blocks and Newton's First Law",
     "How does a sprinter on the starting blocks illustrate Newton's First Law of Motion (Law of Inertia)?",
     "The sprinter remains motionless in resting inertia until external ground reaction force from muscular exertion overcomes that inertia",
     ["The starting gun physically blows the runner forward", "The runner accelerates automatically without muscular contraction", "The runner flies through the air due to magnetic fields"],
     "Newton's first law dictates that a stationary body remains at rest until an unbalanced external force initiates acceleration."),
    case_q("Biomechanics and Sports", "Second Law Acceleration Proportionality",
     "According to Newton's Second Law ($F = m \times a$), if a shot-putter doubles the net propulsive force applied to the shot during delivery:",
     "The acceleration of the shot put is doubled, yielding higher release velocity",
     ["The shot put becomes twice as heavy in the hand", "The acceleration drops to zero", "The distance thrown is cut in half"],
     "Acceleration is directly proportional to net applied force for a given constant mass ($a = F/m$)."),
    case_q("Biomechanics and Sports", "High Jump Take-Off Reaction Force",
     "In the high jump take-off, what constitutes the 'Reaction Force' according to Newton's Third Law?",
     "The upward and forward Ground Reaction Force exerted by the apron surface back onto the jumper's foot",
     ["The wind blowing against the jumper's back", "The gravitational pull of the moon", "The bending of the fiberglass crossbar"],
     "The athlete pushes down against the ground (action); the ground pushes back with an equal upward impulse (reaction) propelling the jump."),
    case_q("Biomechanics and Sports", "Momentum Transfer in Batting/Throwing",
     "Why do baseball batters or cricket batsmen swing with maximal bat speed to hit a ball for distance?",
     "Greater bat momentum ($p = m \times v$) transfers higher impulsive force during contact, producing maximum ball exit velocity",
     ["A fast bat makes the ball disappear from the stadium", "Slow bats violate the rules of professional cricket", "Swinging fast makes the bat weight zero grams"],
     "Transfer of linear momentum during elastic collisions maximizes the impulse (F * Delta_t) imparted to the ball."),
    case_q("Biomechanics and Sports", "Cricketer Soft Hands Catching Biomechanics",
     "Why does a cricketer draw their hands backward when catching a fast-moving cricket ball?",
     "To increase the impact duration (Delta_t), thereby reducing the rate of change of momentum and minimizing impact force on the hands",
     ["To show off athletic agility to spectators", "To speed up the ball into the glove", "To ensure the ball bounces back up into the air"],
     "Impulse equation (F * Delta_t = Delta_p): extending impact time reduces the peak contact force, preventing hand injury.")
]

# Mock 9
P1_M9_TXT = (
    "Read the following excerpt on equilibrium and stability in athletic performance and answer the questions that follow:\n\n"
    "Stability and equilibrium govern mechanical advantage in combat and artistic sports. Biomechanists classify equilibrium into two states: "
    "'Static Equilibrium' (maintaining balance in stationary poses, like a gymnast's handstand or an archer's shooting stance) and "
    "'Dynamic Equilibrium' (maintaining balance during locomotion, like tumbling, downhill skiing, or slalom skating). "
    "An athlete's stability is governed by four cardinal principles: (1) lowering the Centre of Gravity increases stability; "
    "(2) widening the Base of Support expands the stability perimeter; (3) the Line of Gravity must fall within the Base of Support; and "
    "(4) heavier body mass provides greater inertia against disturbing forces. In freestyle wrestling, athletes adopt a deep crouch "
    "with feet spread wide to resist takedowns. Conversely, in sprint starts, athletes deliberately shift their line of gravity forward outside "
    "the support base to convert instability into explosive forward acceleration."
)
P1_M9_QS = [
    case_q("Biomechanics and Sports", "Static vs Dynamic Equilibrium Distinction",
     "Based on the excerpt, what distinguishes 'Static' from 'Dynamic' equilibrium in sports?",
     "Static equilibrium refers to balance in stationary positions, while Dynamic equilibrium refers to balance during continuous motion",
     ["Static equilibrium is used only in water, while Dynamic is used only on land", "Static equilibrium requires closed eyes, while Dynamic requires running backwards", "There is no difference between them"],
     "Static balance governs stationary postures (handstand); dynamic balance governs moving bodies (skiing, tumbling)."),
    case_q("Biomechanics and Sports", "Four Factors Maximizing Stability",
     "Which combination of biomechanical factors produces maximum stability in an athlete?",
     "Lower Centre of Gravity, wide Base of Support, greater body mass, and Line of Gravity centered within the base",
     ["High Centre of Gravity, standing on one toe, and light body mass", "Leaning backward with eyes closed while jumping", "Standing on a narrow beam with feet crossed"],
     "Stability is maximized by lowering CG, widening BOS, increasing mass, and centering the line of gravity."),
    case_q("Biomechanics and Sports", "Wrestler Crouched Stance Rationale",
     "Why does a wrestler drop into a deep crouch with legs wide apart when defending against a takedown?",
     "Lowering the Centre of Gravity and widening the Base of Support dramatically enhances resistance against external tipping forces",
     ["To prepare to fall asleep on the mat", "To make the referee believe the match is finished", "To hide their shoes from the opponent"],
     "A crouched wide stance lowers the center of mass and widens the base, maximizing physical stability against takedown torque."),
    case_q("Biomechanics and Sports", "Deliberate Instability in Sprint Starts",
     "Why does a track sprinter elevate their hips and shift their weight forward in the 'Set' position?",
     "To position the Line of Gravity near the front boundary of the support base, converting instability into immediate forward drive upon gun release",
     ["To stretch their back muscles before sitting down", "To look taller than adjacent competitors", "To make it easier to run backwards"],
     "Controlled forward instability allows the runner to 'fall' forward into explosive acceleration without wasting upward force."),
    case_q("Biomechanics and Sports", "Human Centre of Gravity Location",
     "Where is the Centre of Gravity located in a standard adult standing in anatomical position?",
     "In the pelvic cavity, anterior to the second sacral vertebra (S2), approximately 55% to 57% of total standing height",
     ["At the level of the knees", "Inside the center of the brain", "Underneath the soles of the feet"],
     "In anatomical standing position, human center of gravity lies in the pelvis just anterior to the S2 vertebra.")
]

P2_M9_TXT = (
    "Read the following excerpt on friction and its modifications in sports and answer the questions that follow:\n\n"
    "Friction is the tangential contact force opposing relative sliding or rolling between two contacting surfaces. "
    "In sports, friction acts as both a necessary ally and a detrimental resistance. Static friction (preventing stationary surfaces from sliding) "
    "is always greater than kinetic/sliding friction, which is far greater than rolling friction. "
    "Athletes deliberately maximize friction where traction is paramount: sprinters wear track spikes to bite into synthetic tracks, "
    "footballers wear cleated boots to interlock with grass turf, gymnasts apply magnesium carbonate chalk to palms to absorb sweat and prevent slipping, "
    "and basketball shoes use herringbone rubber treads to maximize court grip. Conversely, athletes minimize friction where speed is required: "
    "cross-country skiers apply specialized waxes to glide across snow crystals, speed skaters polish steel blades to glide on ice, "
    "and road cyclists use low-friction ceramic ball bearings to eliminate drivetrain mechanical losses."
)
P2_M9_QS = [
    case_q("Biomechanics and Sports", "Frictional Magnitude Hierarchy",
     "What is the correct hierarchy of friction modes from highest to lowest resistive force between identical surfaces?",
     "Static Friction > Kinetic / Sliding Friction > Rolling Friction",
     ["Rolling Friction > Sliding Friction > Static Friction", "Sliding Friction > Rolling Friction > Static Friction", "All friction modes are identical in magnitude"],
     "Static friction (initiating motion) is greatest, followed by kinetic sliding friction, with rolling friction being the smallest."),
    case_q("Biomechanics and Sports", "Role of Track Spikes and Cleats",
     "Why do sprinters wear spiked shoes and football players wear studded cleats?",
     "To create mechanical interlocking traction with the ground, maximizing static friction for propulsion without slipping",
     ["To make the shoes heavier so the runner burns more calories", "To look fashionable for sports photography", "To prevent grass from growing on the playing pitch"],
     "Spikes and studs penetrate surfaces to provide mechanical traction, preventing slip and transferring horizontal propulsive force."),
    case_q("Biomechanics and Sports", "Gymnastic Chalk Function",
     "Why do gymnasts and weightlifters apply dry magnesium carbonate chalk to their hands?",
     "It absorbs perspiration moisture that acts as a slippery lubricant, restoring high friction and a secure grip on apparatus",
     ["It turns their skin into solid bone", "It makes the barbell weigh 50% less", "It cools the hands down to freezing point"],
     "Sweat acts as a liquid lubricant reducing grip friction; chalk absorbs moisture, ensuring a high coefficient of static friction."),
    case_q("Biomechanics and Sports", "Ski Waxing Friction Objective",
     "What is the objective of applying specialized wax to the base of snow skis?",
     "To minimize kinetic sliding friction across snow by optimizing the thin microscopic water film formed by frictional pressure",
     ["To glue the skis firmly to the mountain slope", "To freeze the snow into solid rock", "To prevent the skier from moving too fast"],
     "Wax creates a hydrophobic surface that minimizes sliding friction across the micro-layer of melted water on snow."),
    case_q("Biomechanics and Sports", "Ball Bearings Mechanical Role",
     "Why do roller skates, skateboards, and bicycles utilize precision ball bearings in their wheel hubs?",
     "To convert high sliding friction into ultra-low rolling friction, preserving velocity and mechanical energy",
     ["To make the wheels stop rotating completely", "To generate electrical power for headlights", "To make the skateboard heavier"],
     "Ball bearings replace sliding contact with rolling spheres, dramatically reducing friction torque in rotating axles.")
]

# Mock 10
P1_M10_TXT = (
    "Read the following excerpt on projectile motion and aerodynamics in sports and answer the questions that follow:\n\n"
    "Any object launched into the air and subjected only to gravity and aerodynamic forces is classified as a projectile. "
    "The parabolic flight path (trajectory) of a sporting projectile is governed by five factors: release velocity, angle of projection, "
    "height of release, gravity ($9.8 \\text{ m/s}^2$), and air resistance. Biomechanists emphasize that launch velocity is the most dominant factor "
    "governing horizontal distance (Range proportional to v^2). On flat ground where release and landing heights are identical, the theoretical optimal launch angle is 45°. "
    "However, in shot putting and javelin throwing where the projectile is released ~2 meters above the ground, the optimal release angle is less than 45° "
    "(typically 36°–38°). Furthermore, rotating projectiles experience the 'Magnus Effect': spinning balls create asymmetric airflow velocity. "
    "Topspin accelerates air over the top and creates high pressure above, driving the ball downward, whereas backspin generates upward aerodynamic lift."
)
P1_M10_QS = [
    case_q("Biomechanics and Sports", "Dominant Factor in Projectile Distance",
     "Which release parameter exerts the most powerful mathematical influence on the horizontal distance of a thrown projectile?",
     "Initial Release Velocity (because distance is proportional to velocity squared, Range proportional to v^2)",
     ["The color of the projectile", "The humidity of the air alone", "The length of the thrower\'s hair"],
     "Range scales quadratically with release speed (Range proportional to v^2); velocity gains produce the largest increases in throwing distance."),
    case_q("Biomechanics and Sports", "Optimal Launch Angle with Elevated Release",
     "Why is the real-world optimal release angle for shot putters roughly 36° to 38° rather than 45°?",
     "Because release height is ~2 meters above ground level, and human shoulder anatomy generates higher velocity at lower launch angles",
     ["Because 45 degrees is banned by World Athletics rules", "Because throwing at 45 degrees causes the shot put to burst", "Because gravity does not act on heavy shot puts"],
     "Elevated launch height geometrically shifts optimal trajectory below 45°, aligning with shoulder joint force-velocity mechanics (~36°-38°)."),
    case_q("Biomechanics and Sports", "Magnus Effect Topspin Mechanics",
     "In tennis and soccer, what aerodynamic trajectory change is produced by heavy 'Topspin'?",
     "It generates a downward Magnus force that causes the ball to dip sharply into the court and kick up high after bouncing",
     ["It causes the ball to float infinitely into outer space", "It makes the ball curve sideways into the stands", "It slows the ball to zero speed in mid-air"],
     "Topspin produces high pressure above and low pressure below, forcing the ball downward via the Magnus effect."),
    case_q("Biomechanics and Sports", "Backspin Aerodynamic Lift",
     "How does 'Backspin' alter the flight of a golf ball or sliced tennis shot?",
     "It creates upward aerodynamic Magnus lift, counteracting gravity to prolong flight time and increase carry distance",
     ["It drives the ball straight into the turf immediately", "It causes the ball to fly backwards toward the player", "It makes the ball weigh five times more in flight"],
     "Backspin accelerates air over the top, generating low pressure and upward aerodynamic lift that extends airborne carry."),
    case_q("Biomechanics and Sports", "Parabolic Arc Symmetry in Vacuum vs Real Air",
     "How does real atmospheric air resistance alter the shape of a projectile's trajectory compared to a theoretical vacuum parabola?",
     "It creates an asymmetrical flight path where the descending trajectory is steeper and shorter than the ascending arc",
     ["It makes the projectile fly in full 360-degree loops", "It makes the projectile fly in an exact straight horizontal line forever", "It eliminates the effect of gravity completely"],
     "Air drag continuously removes kinetic energy, making the descending trajectory noticeably steeper and shorter than the ascent.")
]

P2_M10_TXT = (
    "Read the following excerpt on levers and movement mechanics in the human musculoskeletal system and answer the questions that follow:\n\n"
    "The human skeletal framework functions as an intricate mechanical lever system. A lever consists of a rigid bar (bone) turning around a fulcrum "
    "(joint axis) under the action of an effort force (muscle contraction) to overcome a load or resistance. "
    "Levers are categorized into three classes based on the relative position of the Fulcrum, Effort, and Resistance. "
    "In a First Class Lever (FAR), the Fulcrum lies in the middle, exemplified by nodding the head at the atlanto-occipital joint or elbow extension by the triceps. "
    "In a Second Class Lever (ARF), the Load lies in the middle, seen when rising onto the balls of the toes (plantarflexion) powered by the calf muscles. "
    "Second class levers always operate with a Mechanical Advantage greater than 1 (force multiplier). "
    "In a Third Class Lever (AFR), the Effort is applied between the fulcrum and load, as in biceps elbow flexion or kicking a football. "
    "Third class levers are the most prevalent in the human body, operating with a Mechanical Advantage less than 1 to maximize movement speed and range of motion."
)
P2_M10_QS = [
    case_q("Biomechanics and Sports", "Most Prevalent Lever in Human Body",
     "Which anatomical lever class is the most common and widespread throughout the human musculoskeletal system?",
     "Third Class Lever (Effort applied between the Fulcrum and the Load, AFR)",
     ["First Class Lever (FAR)", "Second Class Lever (ARF)", "Fourth Class Rotary Lever"],
     "The human body is predominantly built of third class levers, optimizing extremity speed and displacement."),
    case_q("Biomechanics and Sports", "Second Class Lever Example in Body",
     "Which movement represents a Second Class Lever (Load in the middle) in human anatomy?",
     "Plantarflexion at the ankle joint (rising onto the toes) powered by the gastrocnemius and soleus",
     ["Biceps flexion holding a dumbbell at the elbow", "Nodding the head forward and backward at the neck", "Extending the elbow using the triceps"],
     "Rising on toes places body weight (load) between metatarsal fulcrum and calf tendon effort—a classic Class 2 lever."),
    case_q("Biomechanics and Sports", "Mechanical Advantage of Third Class Levers",
     "Why do human third class levers operate with a Mechanical Advantage of less than 1 (MA < 1)?",
     "Because the Effort Arm is shorter than the Resistance Arm, trading muscular force to gain magnified movement velocity and range of motion",
     ["Because human bones are made of hollow wood", "Because muscles do not produce any force during contraction", "Because gravity is zero inside human joints"],
     "MA < 1 requires muscles to pull with high force, but yields huge amplification of speed and distance at the hand or foot."),
    case_q("Biomechanics and Sports", "Biceps Curl Lever Component Identification",
     "During a dumbbell bicep curl, identify the Fulcrum, Effort, and Resistance:",
     "Fulcrum: Elbow joint; Effort: Biceps insertion on radial tuberosity; Resistance: Dumbbell held in hand",
     ["Fulcrum: Dumbbell; Effort: Shoulder; Resistance: Elbow", "Fulcrum: Wrist; Effort: Triceps; Resistance: Biceps", "Fulcrum: Floor; Effort: Knee; Resistance: Head"],
     "The elbow is the joint axis, biceps tendon insertion is the middle effort point, and the hand-held dumbbell is the distal load."),
    case_q("Biomechanics and Sports", "First Class Lever Anatomy",
     "What anatomical joint action exemplifies a First Class Lever (Fulcrum located between Effort and Load)?",
     "Atlanto-occipital joint extension/flexion (nodding head) or elbow extension by the triceps muscle",
     ["Rising on the tiptoes", "Hamstring knee flexion", "Lateral shoulder abduction by deltoid"],
     "In nodding the head or triceps extending the elbow, the joint fulcrum sits between muscle effort and distal resistance.")
]

PASSAGES_1_10 = [
    ((P1_M1_TXT, P1_M1_QS), (P2_M1_TXT, P2_M1_QS)),
    ((P1_M2_TXT, P1_M2_QS), (P2_M2_TXT, P2_M2_QS)),
    ((P1_M3_TXT, P1_M3_QS), (P2_M3_TXT, P2_M3_QS)),
    ((P1_M4_TXT, P1_M4_QS), (P2_M4_TXT, P2_M4_QS)),
    ((P1_M5_TXT, P1_M5_QS), (P2_M5_TXT, P2_M5_QS)),
    ((P1_M6_TXT, P1_M6_QS), (P2_M6_TXT, P2_M6_QS)),
    ((P1_M7_TXT, P1_M7_QS), (P2_M7_TXT, P2_M7_QS)),
    ((P1_M8_TXT, P1_M8_QS), (P2_M8_TXT, P2_M8_QS)),
    ((P1_M9_TXT, P1_M9_QS), (P2_M9_TXT, P2_M9_QS)),
    ((P1_M10_TXT, P1_M10_QS), (P2_M10_TXT, P2_M10_QS))
]

assert len(PASSAGES_1_10) == 10, f"Expected 10 passage pairs, got {len(PASSAGES_1_10)}"
print("PED Passages 1 to 10 compiled successfully.")
