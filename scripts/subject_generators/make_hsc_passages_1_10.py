import sys, os

out_path = "scripts/subject_generators/hsc_passages_1_10.py"

content = '''import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 1 PASSAGES
# ==============================================================================
P1_M1_TXT = (
    "Read the following case study on clinical dietetics and answer the questions that follow:\\n\\n"
    "Mr. Verma, a 52-year-old bank manager, is referred to a hospital clinical dietitian following an executive health checkup. "
    "His clinical records reveal a Body Mass Index (BMI) of 29.2 kg/m^2 (Asian Indian Obese), elevated blood pressure (148/94 mmHg), "
    "fasting blood glucose of 165 mg/dL, and HbA1c of 8.2% (confirming Type 2 Diabetes Mellitus). "
    "The clinical dietitian conducts a thorough ABCD nutritional assessment: measuring waist circumference (98 cm), evaluating serum lipids, "
    "inspecting for acanthosis nigricans on the neck, and recording a 24-hour dietary recall that shows excessive intake of refined carbohydrates, "
    "fried snacks, and high sodium pickles with negligible dietary fiber. "
    "The dietitian designs an individualized Medical Nutrition Therapy (MNT) plan: replacing high-glycemic white rice and refined flour with "
    "low-glycemic whole millets (ragi, bajra), oats, and legumes; restricting sodium intake to under 2 grams/day (5 grams salt) to control hypertension; "
    "and incorporating regular physical activity with split small-frequent meals."
)
P1_M1_QS = [
    case_q("Clinical Nutrition and Dietetics", "Nutritional Status Classification",
           "According to consensus guidelines for Asian Indians, how is Mr. Verma's BMI of 29.2 kg/m^2 classified?",
           "Obese (Grade I / Overweight category for Asian Indians starts at >= 23 kg/m^2 and Obesity at >= 25 kg/m^2)",
           ["Underweight", "Normal healthy weight", "Severely undernourished"],
           "For Asian Indians, normal BMI is 18.0-22.9; overweight is 23.0-24.9; and obesity is defined as BMI >= 25.0 kg/m^2."),
    case_q("Clinical Nutrition and Dietetics", "Dietary Fiber and Glycemic Control",
           "Why did the clinical dietitian substitute refined flour with whole millets, oats, and legumes?",
           "Soluble dietary fiber in whole grains slows carbohydrate digestion and glucose absorption, preventing sharp postprandial blood sugar spikes",
           ["Millets contain zero calories and cause instant starvation", "Refined flour is legally banned for adults", "Whole grains convert immediately into protein in the stomach"],
           "Complex dietary fiber and low-GI foods produce gradual, blunted postprandial glucose curves, enhancing insulin sensitivity."),
    case_q("Clinical Nutrition and Dietetics", "Sodium Restriction Mechanism in Hypertension",
           "What physiological benefit is achieved by restricting Mr. Verma's daily salt intake to under 5 grams (2g sodium)?",
           "Reduces extracellular fluid volume and vascular resistance, helping lower systemic blood pressure",
           ["Increases blood cholesterol levels", "Eliminates all calcium from the bones", "Causes sudden digestive paralysis"],
           "Sodium draws water osmotically into the bloodstream; restricting sodium lowers blood volume and arterial vascular pressure."),
    case_q("Clinical Nutrition and Dietetics", "ABCD Assessment Identification",
           "In Mr. Verma's consultation, which parameter represents the 'Biochemical' component of the ABCD assessment?",
           "Fasting blood glucose (165 mg/dL), HbA1c (8.2%), and serum lipid levels",
           ["Waist circumference (98 cm)", "Acanthosis nigricans skin inspection", "24-hour dietary recall interview"],
           "Laboratory tests of blood, serum, and urine markers (glucose, HbA1c, lipids) constitute the Biochemical (B) dimension of ABCD assessment."),
    case_q("Clinical Nutrition and Dietetics", "Small Frequent Meals Strategy",
           "Why are split, small-frequent meals (5-6 meals daily) recommended over two large heavy banquets for diabetic patients?",
           "Distributes carbohydrate load evenly throughout the day, preventing both hyperglycemia spikes and hypoglycemic crashes",
           ["Doubles the total calories consumed each day", "Allows the patient to eat high-sugar desserts safely", "Eliminates the need for any water"],
           "Evenly spaced small meals balance metabolic glucose influx, matching exogenous and endogenous insulin availability.")
]

P2_M1_TXT = (
    "Read the following consumer rights case study and answer the questions that follow:\\n\\n"
    "Sunita purchased an electric water geyser from a local home appliance store for Rs. 12,500. "
    "She paid the full amount in cash and received a printed cash memo. "
    "Within two weeks of installation, the geyser malfunctioned due to defective heating element insulation, giving her a severe electric shock. "
    "Upon examining the appliance closely, Sunita noticed that the geyser did not bear the mandatory ISI standardisation mark from the Bureau of Indian Standards (BIS). "
    "When she approached the retail store owner demanding a replacement or full refund, the retailer flatly refused, pointing to a handwritten "
    "note on the receipt stating 'Goods once sold will not be taken back or exchanged'. "
    "Sunita consulted a Voluntary Consumer Organization (VCO) and filed an online consumer complaint on the e-Daakhil portal under the Consumer Protection Act, 2019, "
    "claiming refund and compensation under Product Liability for mental agony and injury."
)
P2_M1_QS = [
    case_q("Consumer Education and Protection", "Mandatory Certification Mark on Geysers",
     "Why is the ISI mark from the Bureau of Indian Standards (BIS) legally mandatory on domestic electric water geysers?",
     "Electric geysers are safety-critical appliances involving high voltage and water; mandatory ISI certification guarantees electrical safety against shocks and fires",
     ["The ISI mark indicates the appliance is an imported luxury item", "The ISI mark doubles the electricity consumption of the geyser", "The ISI mark is used only on toys"],
     "Electrical water heaters pose electrocution and burst hazards; national law mandates certified ISI testing before commercial sale."),
    case_q("Consumer Education and Protection", "Legality of 'Goods Once Sold Will Not Be Taken Back'",
     "What is the legal validity of the disclaimer 'Goods once sold will not be taken back' under the Consumer Protection Act, 2019?",
     "It is an illegal and void unfair trade practice that cannot restrict consumer statutory rights against defective products",
     ["It is completely legal and legally binds all consumers", "It allows shopkeepers to arrest customers who complain", "It is mandatory under the Indian Constitution"],
     "Unilateral disclaimers denying refunds or returns for defective goods are null and void unfair trade practices under CPA 2019."),
    case_q("Consumer Education and Protection", "Product Liability Claim under CPA 2019",
     "On what legal grounds can Sunita claim compensation under 'Product Liability' against the manufacturer and seller?",
     "For harm, physical shock injury, and defect in design/manufacturing that caused the product to be unsafe for its intended use",
     ["Because the geyser was not painted pink", "Because the geyser took 10 minutes to heat water", "Because the retailer was impolite"],
     "Product liability under Chapter VI holds manufacturers and sellers financially liable to compensate consumers for injury caused by defective products."),
    case_q("Consumer Education and Protection", "Appropriate Consumer Forum Jurisdiction",
     "Before which Consumer Disputes Redressal Commission should Sunita file her claim of Rs. 12,500 plus compensation?",
     "District Consumer Disputes Redressal Commission (DCDRC), which has pecuniary jurisdiction over claims up to Rs. 50 lakhs",
     ["State Consumer Commission (claims between 50 lakhs and 2 crores)", "National Consumer Commission in New Delhi (claims above 2 crores)", "International Court of Justice at The Hague"],
     "Claims where consideration paid does not exceed Rs. 50 lakhs fall under the original pecuniary jurisdiction of the District Commission."),
    case_q("Consumer Education and Protection", "e-Daakhil Portal Advantage",
     "What revolutionary convenience did Sunita utilize by filing her complaint through the 'e-Daakhil' portal?",
     "She was able to file the consumer petition, upload documents, pay statutory fees, and track case progress digitally from home without visiting court",
     ["She was able to get free electricity for her entire house", "The portal sent police to demolish the retail shop immediately", "The portal bought her a new car"],
     "e-Daakhil enables seamless electronic filing, online fee payment, and digital case management for consumers nationwide.")
]

# ==============================================================================
# MOCK 2 PASSAGES
# ==============================================================================
P1_M2_TXT = (
    "Read the following case study on food processing and safety and answer the questions that follow:\\n\\n"
    "An agri-business cooperative in Himachal Pradesh establishes a commercial apple processing unit to produce apple juice, applesauce, and fruit jam. "
    "To ensure high product quality and consumer safety, the food technologist institutes a Hazard Analysis Critical Control Point (HACCP) system. "
    "During hazard analysis, three major hazards are identified:\\n"
    "1. Biological hazard: Presence of patulin (a mycotoxin produced by Penicillium mold in bruised apples) and acid-tolerant spoilage yeasts.\\n"
    "2. Chemical hazard: Pesticide spray residues on apple skins.\\n"
    "3. Physical hazard: Stones, twigs, and metal filings from sorting machinery.\\n"
    "The plant designates Pasteurization (heating juice to 85°C for 30 seconds) as a primary Critical Control Point (CCP-1) with a strict Critical Limit. "
    "Furthermore, jars are hermetically sealed and inspected under in-line metal detectors (CCP-2). "
    "The facility complies with statutory FSSAI regulations, displaying the FSSAI license number and vegetarian green dot logo on all packaging."
)
P1_M2_QS = [
    case_q("Food Quality and Food Safety", "Hazard Classification: Patulin",
           "Under which hazard category does the fungal mycotoxin 'Patulin' found in damaged apples fall?",
           "Biological / Microbiological Hazard",
           ["Physical Hazard", "Chemical pesticide residue", "Allergenic trace metal"],
           "Patulin is a toxic fungal metabolite (mycotoxin) produced by Penicillium molds, classifying it as a biological hazard."),
    case_q("Food Quality and Food Safety", "Critical Control Point (CCP) Identification",
           "Why is thermal pasteurization (85°C for 30 seconds) designated as a Critical Control Point (CCP)?",
           "It is the specific processing step at which heat destroys pathogenic microorganisms and inactivates pectinolytic enzymes, eliminating the hazard",
           ["It is the point where food is loaded into delivery trucks", "It is the office where bills are printed", "It makes the juice taste like chocolate"],
     "A CCP is an essential manufacturing step where control can be applied to prevent, eliminate, or reduce a safety hazard to acceptable levels."),
    case_q("Food Quality and Food Safety", "Critical Limit Definition",
           "In the apple juice line, what serves as the 'Critical Limit' for the pasteurization CCP?",
           "Maintaining an internal juice temperature of at least 85°C for a continuous holding time of at least 30 seconds",
           ["The selling price of Rs. 100 per bottle", "The total number of bottles produced per day", "The green color of the bottle label"],
           "Critical limits are measurable boundary criteria (85°C for 30 s) that separate safe from unsafe processing at a CCP."),
    case_q("Food Quality and Food Safety", "Physical Hazard Control via Metal Detection",
           "What is the operational function of the in-line metal detector (CCP-2) on the packaging line?",
           "Detects and automatically rejects jars containing physical metal fragments from machinery or processing equipment",
           ["Checks if the glass jar has printed labels", "Measures the weight of the sugar inside the jar", "Heats the jar to room temperature"],
           "In-line metal detectors prevent physical hazards by identifying and rejecting packages contaminated with metallic debris."),
    case_q("Food Quality and Food Safety", "Mandatory FSSAI Label Display",
           "What statutory mark must be displayed on the apple jam jars to confirm licensing by India's national food regulator?",
           "The FSSAI logo along with the manufacturer's 14-digit license number",
           ["The ISI mark only", "The Hallmark logo with 6-digit HUID", "The Woolmark emblem"],
           "All commercial food business operators in India must display the standardized FSSAI logo alongside their 14-digit license number.")
]

P2_M2_TXT = (
    "Read the following case study on early childhood care and education and answer the questions that follow:\\n\\n"
    "Asha is appointed as a lead ECCE educator at a newly upgraded model Anganwadi Centre in a semi-urban community. "
    "She has 25 children aged between 3 and 6 years. "
    "Rather than forcing toddlers to memorize the alphabet and copy letters into notebooks for hours, Asha designs a child-centred, play-based environment. "
    "She sets up four functional learning corners in the room: a Book and Reading Corner, a Block and Construction Corner, a Dramatic Play Corner, "
    "and a Sand/Clay and Sensory Table. "
    "Understanding Piaget's Pre-Operational cognitive stage (ages 2-7), Asha knows that young children think in concrete, intuitive terms and exhibit "
    "centration and egocentrism. She utilizes indigenous, low-cost learning materials (pebbles, leaves, bottle caps, wooden blocks, puppets) "
    "and implements a balanced daily schedule integrating circle time, active outdoor gross-motor play, storytelling, and nutritious mid-day meals."
)
P2_M2_QS = [
    case_q("Early Childhood Care and Education", "Child-Centred Pedagogy vs Rote Drilling",
           "Why did Asha reject rigid textbook drilling in favor of play-based learning corners?",
           "Young children naturally learn through sensory exploration, active hands-on manipulation, and self-directed play rather than abstract rote memorization",
           ["Because notebooks are completely banned in all schools", "Because children should never learn to read or write", "Because play-based learning is cheaper for the government"],
           "ECCE principles mandate experiential, play-based pedagogy aligned with how the developing child constructs cognitive understanding."),
    case_q("Early Childhood Care and Education", "Developmental Role of Block Building",
     "What specific developmental domains are stimulated when children build towers and bridges in the Block Construction Corner?",
     "Spatial reasoning, hand-eye coordination, balance concepts, fine motor grasp, and creative problem solving",
     ["Language grammar translation only", "Cardiovascular long-distance running", "Cooking skills"],
     "Block manipulation fosters spatial-mathematical awareness, balance intuition, fine motor coordination, and cooperative teamwork."),
    case_q("Early Childhood Care and Education", "Piaget's Pre-Operational Stage Feature: Centration",
     "What does Jean Piaget's concept of 'Centration' observed in preschool children mean?",
     "Focusing attention on only one salient perceptual feature of an object while ignoring all other relevant dimensions",
     ["The ability to concentrate for 10 hours without moving", "Drawing circles on paper with compasses", "Memorizing phone numbers easily"],
     "Centration is the cognitive tendency to fixate on a single noticeable attribute (e.g. height) while ignoring other dimensions (e.g. width)."),
    case_q("Early Childhood Care and Education", "Dramatic Play Corner Significance",
     "Why is the Dramatic / Doll Play Corner vital for preschool socio-emotional growth?",
     "Allows children to role-play real-world roles (doctors, parents), express feelings, practice empathy, and resolve emotional conflicts symbolically",
     ["Teaches children how to become commercial actors in television serials", "Forces children to stay completely silent", "Eliminates all imagination"],
     "Socio-dramatic pretend play allows children to step into others' perspectives, negotiate social roles, and externalize emotional themes."),
    case_q("Early Childhood Care and Education", "Low-Cost, No-Cost Learning Materials Value",
     "What educational advantage do indigenous, low-cost, natural materials (pebbles, leaves, clay) offer in an ECCE classroom?",
     "They are open-ended, culturally familiar, spark creative imagination, and can be explored in multiple inventive ways without financial barrier",
     ["They break immediately when touched by children", "They teach children how to clean outdoor streets", "They replace the teacher completely"],
     "Low-cost, open-ended natural materials invite flexible creative transformation, fostering curiosity far more effectively than rigid single-purpose toys.")
]

# ==============================================================================
# MOCK 3 PASSAGES
# ==============================================================================
P1_M3_TXT = (
    "Read the following community nutrition survey case study and answer the questions that follow:\\n\\n"
    "A team of public health nutritionists conducts an epidemiological survey across 500 under-five children in an aspirational tribal district. "
    "Using calibrated infantometers, stadiometers, and electronic scales, the team computes anthropometric Z-scores against WHO Child Growth Standards. "
    "The survey uncovers startling data:\\n"
    "1. Stunting (Low Height-for-Age < -2 SD): 44% of children suffer from chronic linear growth faltering.\\n"
    "2. Wasting (Low Weight-for-Height < -2 SD): 22% suffer from acute undernutrition, with 6% classified as Severe Acute Malnutrition (SAM, < -3 SD).\\n"
    "3. Clinical examination reveals Bitot spots in 4.2% of children, and pallor indicative of Iron Deficiency Anemia in 68% of children.\\n"
    "The nutrition team presents an urgent action blueprint: revitalizing local Anganwadi supplementary feeding, establishing a hospital-based "
    "Nutritional Rehabilitation Centre (NRC) for complicated SAM cases, administering megadose Vitamin A prophylaxis, and distributing "
    "Double Fortified Salt (DFS) alongside Weekly Iron and Folic Acid Supplementation (WIFAS)."
)
P1_M3_QS = [
    case_q("Public Nutrition and Health", "Stunting vs Wasting Significance",
           "What is the physiological difference between 'Stunting' (44%) and 'Wasting' (22%) in the surveyed children?",
           "Stunting indicates chronic long-term undernutrition affecting linear height; Wasting indicates acute, recent starvation or illness causing rapid weight loss",
           ["Stunting is caused by eating too much fruit; wasting is caused by lack of sleep", "Stunting can be cured in 2 days while wasting lasts 50 years", "There is no difference"],
           "Low height-for-age (stunting) reflects sustained chronic nutrient deprivation; low weight-for-height (wasting) reflects acute recent deficit."),
    case_q("Public Nutrition and Health", "Severe Acute Malnutrition (SAM) Diagnostic Criteria",
           "Besides a Weight-for-Height Z-score < -3 SD, which clinical sign or anthropometric measure confirms Severe Acute Malnutrition?",
           "Bilateral pitting edema of nutritional origin, or Mid-Upper Arm Circumference (MUAC) < 11.5 cm in children aged 6 to 59 months",
           ["A child having a runny nose", "High body temperature above 100°F", "Weight-for-age exactly at 0 SD"],
           "WHO defines SAM as Weight-for-Height < -3 SD, or MUAC < 11.5 cm, or the presence of bilateral nutritional pitting edema."),
    case_q("Public Nutrition and Health", "Clinical Indicator: Bitot's Spots",
           "What specific nutritional deficiency is pathognomonically signaled by the presence of Bitot's spots on the conjunctiva in 4.2% of children?",
           "Clinical Vitamin A Deficiency (VAD)",
           ["Severe Calcium deficiency", "Dietary Iodine deficiency", "Vitamin C deficiency (Scurvy)"],
           "Bitot's spots (foamy, triangular keratinized plaques on the sclera) are direct clinical markers of ocular Vitamin A deficiency."),
    case_q("Public Nutrition and Health", "Role of Nutritional Rehabilitation Centre (NRC)",
           "Which children identified in the survey require inpatient admission to a Nutritional Rehabilitation Centre (NRC)?",
           "Children with Severe Acute Malnutrition (SAM) who exhibit medical complications (hypoglycemia, hypothermia, sepsis) or lack of appetite",
           ["Children with normal healthy weight", "All children suffering from mild fever", "Children who refuse to go to school"],
     "NRCs are hospital-based units treating complicated SAM children through supervised therapeutic formulas (F-75, F-100) and medical stabilization."),
    case_q("Public Nutrition and Health", "Double Fortified Salt (DFS) Function",
           "Why did the team recommend Double Fortified Salt (DFS) for community distribution?",
           "It simultaneously delivers bioavailable iron (combating anemia) and iodine (combating goitre and mental impairment) through a single daily staple",
           ["It contains calcium and vitamin D for bones", "It makes salt taste sweet like sugar", "It prevents malaria infections"],
           "DFS co-fortifies everyday edible salt with both iodine and microencapsulated iron, attacking two pervasive micronutrient deficiencies concurrently.")
]

P2_M3_TXT = (
    "Read the following apparel design and entrepreneurship case study and answer the questions that follow:\\n\\n"
    "Ananya, a Home Science graduate specializing in Fabric and Apparel Design, launches an eco-friendly boutique, 'Prakriti Weaves'. "
    "She curates contemporary women's wear crafted from hand-spun, hand-woven Khadi and organic cotton dyed with natural botanical dyes. "
    "In her inaugural collection, Ananya applies aesthetic design principles meticulously:\\n"
    "1. She uses Monochromatic color harmonies—combining tints of seafoam green, sage, and deep olive to convey serenity and environmental connection.\\n"
    "2. She applies the Greek Golden Mean Ratio (3:5 / 5:8) in proportioning short embroidered waistcoats paired with long flowing skirts.\\n"
    "3. She creates a striking Center of Interest (Emphasis) on an A-line tunic by placing intricate Kantha hand embroidery exclusively around the boat neckline.\\n"
    "4. She incorporates Rhythm through Gradation by arranging rows of wooden buttons that decrease progressively in diameter from hem to collar."
)
P2_M3_QS = [
    case_q("Design for Fabric and Apparel", "Monochromatic Color Harmony Definition",
     "What defines the 'Monochromatic' color harmony used by Ananya in her collection?",
     "Using different tints, tones, and shades of a single base hue (green)",
     ["Combining two complementary colors from opposite sides of the wheel", "Using three colors that form an equilateral triangle", "Using only black and white"],
     "Monochromatic color schemes explore value and chroma variations (tints, shades, tones) within a single color family."),
    case_q("Design for Fabric and Apparel", "Golden Mean Proportion Application",
     "Why did Ananya proportion the waistcoat and skirt in a 3:5 / 5:8 ratio rather than cutting them into equal halves (1:1)?",
     "Unequal, mathematically harmonious divisions (Golden Mean) are visually dynamic, pleasing, and naturally flattering to the human eye",
     ["Equal halves make clothing fall apart at the seams", "Because the tailor had only a small amount of fabric", "Because 1:1 proportion is legally prohibited"],
     "The Golden Mean Ratio (approx. 3:5 or 1:1.618) avoids static, monotonous equal halving, introducing elegant vertical visual flow."),
    case_q("Design for Fabric and Apparel", "Emphasis via Neckline Embroidery",
     "What is the aesthetic outcome of concentrating intricate Kantha embroidery exclusively around the boat neckline?",
     "Creates a dominant focal point (Emphasis) that draws the observer's attention upward to frame the wearer's face",
     ["Makes the waist appear three times wider", "Hides the entire garment under heavy shadows", "Makes the hem of the dress look crooked"],
     "Placing high-contrast decorative embellishments around the neckline creates an intentional focal point that highlights the wearer's face."),
    case_q("Design for Fabric and Apparel", "Rhythm by Gradation Example",
     "How does the arrangement of wooden buttons decreasing in diameter from hem to collar exemplify 'Rhythm by Gradation'?",
     "The gradual, progressive change in size leads the observer's eye in a smooth, sequential vertical ascent up the garment",
     ["The buttons make musical sounds when pressed", "The buttons change color when washed", "The buttons weigh 5 kilograms each"],
     "Gradation generates rhythmic visual movement through ordered, progressive transitions in size, scale, or color value."),
    case_q("Design for Fabric and Apparel", "A-Line Silhouette Flattery",
     "Why is the 'A-Line' silhouette chosen for the tunics universally popular across diverse body shapes?",
     "It fits gently over the bust and shoulders and widens gradually toward the hem, gracefully skimming over fuller hips and thighs",
     ["It is skin-tight from neck to ankles like a bodysuit", "It is shaped like a giant square cardboard box", "It is worn only by children under 5 years"],
     "The A-line silhouette skims over hips and lower body curves gracefully, offering structural comfort and universal aesthetic balance.")
]

# ==============================================================================
# MOCK 4 PASSAGES
# ==============================================================================
P1_M4_TXT = (
    "Read the following hospitality management case study and answer the questions that follow:\\n\\n"
    "The Grand Palace Hotel, a 300-room luxury hotel in Jaipur, prides itself on exceptional guest service rooted in 'Atithi Devo Bhava'. "
    "A newly recruited Management Trainee observes operations across the Front Office and Housekeeping departments:\\n"
    "1. Front Office operations are managed through a centralized Property Management System (PMS). "
    "The trainee observes the Four Stages of the Guest Cycle: Pre-Arrival (reservation), Arrival (registration, keycard issue), "
    "Occupancy (concierge recommendations, room service), and Departure (folio settlement, luggage assist, checkout).\\n"
    "2. At the Concierge desk, the concierge arranges bespoke cultural excursions and palace dinner bookings for international guests.\\n"
    "3. In the Housekeeping department, the Executive Housekeeper oversees room attendants executing systematic room servicing: "
    "stripping soiled bedsheets, making beds with crisp hospital mitered corners, sanitizing bathrooms, and providing evening Turn-Down Service.\\n"
    "4. The linen room supervisor maintains a strict Linen Par Level of 3 to ensure uninterrupted operational rotation."
)
P1_M4_QS = [
    case_q("Hospitality Management", "Guest Cycle Chronological Order",
     "What is the correct chronological sequence of the four phases in the hotel Guest Cycle?",
     "Pre-Arrival -> Arrival -> Occupancy -> Departure",
     ["Arrival -> Pre-Arrival -> Departure -> Occupancy", "Occupancy -> Arrival -> Departure -> Pre-Arrival", "Departure -> Pre-Arrival -> Arrival -> Occupancy"],
     "The guest cycle progresses sequentially from reservation inquiry (Pre-arrival) to check-in (Arrival), stay (Occupancy), and check-out (Departure)."),
    case_q("Hospitality Management", "Concierge Specialized Function",
     "What specialized responsibilities distinguish the hotel 'Concierge' from a general reception desk agent?",
     "Providing expert local city knowledge, booking theatre/palace tickets, arranging specialized transportation, and curating personalized guest itineraries",
     ["Auditing hotel daily tax records", "Washing sheets in the laundry basement", "Guarding the hotel swimming pool"],
     "The Concierge handles personalized off-site guest assistance, cultural itineraries, reservations, and VIP travel logistics."),
    case_q("Hospitality Management", "Linen Par Level of 3 Meaning",
     "What does maintaining a 'Par Level of 3' (3 Par) mean for hotel bed and bath linen inventory?",
     "The hotel stocks three complete sets of linen per guest room: one in active use in rooms, one circulating in laundry, and one resting in store reserve",
     ["The hotel has only 3 bedsheets in the entire property", "Linens are washed only 3 times per year", "Guests are permitted to stay for 3 days only"],
     "Par stocks ensure operational resilience: 1 par on beds, 1 par in laundering transit, and 1 par resting clean on linen closet shelves."),
    case_q("Hospitality Management", "Turn-down Service Purpose",
     "What is the primary objective of providing evening 'Turn-down Service' in luxury hotel bedrooms?",
     "Preparing the bed for sleeping (drawing curtains, turning down the duvet at a 45-degree angle, fluffing pillows) and leaving a bedtime amenity",
     ["Demanding that the guest check out of the hotel immediately", "Vacuuming the carpet with loud machines at midnight", "Removing all pillows from the bed"],
     "Evening turn-down transforms the daytime room into a restful sleeping sanctuary, replenishing towels and placing nighttime amenities."),
    case_q("Hospitality Management", "Property Management System (PMS) Role",
     "How does a Property Management System (PMS) integrate hotel departmental operations?",
     "Coordinates real-time room availability, guest check-in/out, restaurant charge postings, housekeeping room cleaning statuses, and final billing folios",
     ["Controls the speed of elevators in the building", "Cooks breakfast in the kitchen automatically", "Prints airline boarding passes for everyone in the city"],
     "PMS software serves as the technological backbone synchronizing front desk, housekeeping, F&B point-of-sale, and accounting.")
]

P2_M4_TXT = (
    "Read the following development journalism case study and answer the questions that follow:\\n\\n"
    "In the semi-arid region of Bundelkhand, a grassroots women's collective runs 'Khabar Lahariya', an independent rural news network. "
    "Trained rural women from Dalit, Adivasi, and minority communities work as video journalists and reporters. "
    "Armed with smartphones, the journalists report in local dialects (Bundeli and Awadhi) on issues systematically ignored by mainstream corporate media: "
    "cracked village borewells, systemic caste discrimination, delayed MGNREGA wages, domestic violence, and lack of sanitary pads in rural schools. "
    "Their reports are published as print newspapers and broadcast digitally on YouTube. "
    "When a report on broken village handpumps goes viral, district officials are compelled to inspect the site and restore clean drinking water within 48 hours."
)
P2_M4_QS = [
    case_q("Development Communication and Journalism", "Development Journalism Contrast with Commercial Media",
     "How does 'Development Journalism' exemplified by Khabar Lahariya contrast fundamentally with mainstream commercial television journalism?",
     "Focuses on investigative reporting of grassroots socio-economic realities, poverty, and governance failures rather than sensational celebrity gossip",
     ["Focuses exclusively on commercial stock market share prices", "Reports only foreign Hollywood entertainment news", "Broadcasts paid political advertisements 24 hours a day"],
     "Development journalism investigates systemic social struggles, rural human rights, and governance accountability rather than sensational trivia."),
    case_q("Development Communication and Journalism", "Impact of Vernacular Dialects in Grassroots Reporting",
     "Why is reporting in local regional dialects (Bundeli/Awadhi) exceptionally potent for community mobilization?",
     "Bypasses language barriers, resonates deeply with rural villagers' lived reality, and enables ordinary women to voice grievances directly",
     ["Because national television channels ban all Indian languages", "Because English is the only language spoken in villages", "Because dialects cannot be understood by anyone"],
     "Local vernacular reporting fosters authentic trust, cultural intimacy, and democratic participation among populations excluded from English media."),
    case_q("Development Communication and Journalism", "Citizen Journalism Empowerment through Smartphones",
     "How has mobile smartphone technology transformed grassroots citizen journalism in rural development?",
     "Democratized media production, enabling marginalized reporters to record video evidence, verify field facts, and broadcast directly to global audiences",
     ["Made all printing presses illegal", "Eliminated the need for any news reporting", "Forced all journalists to work in television studios"],
     "Smartphones put camera and broadcast capability directly into community hands, enabling real-time documentation of local realities."),
    case_q("Development Communication and Journalism", "Advocacy and Administrative Redressal Loop",
     "How did Khabar Lahariya's reporting on broken village handpumps achieve immediate governance accountability?",
     "Exposing the issue with video evidence created public transparency, prompting district administrators to act swiftly to avoid public embarrassment",
     ["By paying money to the government water department", "By demolishing the village water tank", "By arresting the village head directly"],
     "Investigative journalism creates transparency loops: factual visual exposure compels administrative machinery to redress public service failures."),
    case_q("Development Communication and Journalism", "Amplifying Marginalized Voices in Media",
     "Why is the active leadership of Dalit and Adivasi women journalists in Khabar Lahariya groundbreaking in Indian media?",
     "It dismantles upper-caste, urban-male hegemony in newsrooms, presenting authentic, intersectional feminist perspectives from the ground up",
     ["Because women are legally required to own all newspapers in India", "Because men are banned from reporting news", "It has zero social significance"],
     "Community-owned feminist journalism centers the perspectives of marginalized women who bear the brunt of structural inequality.")
]

# ==============================================================================
# MOCK 5 PASSAGES
# ==============================================================================
P1_M5_TXT = (
    "Read the following case study on special education and inclusive schooling and answer the questions that follow:\\n\\n"
    "Rohan is an 8-year-old boy enrolled in Class 3 of an inclusive primary school. "
    "His teachers observe that while Rohan is intellectually curious, verbally articulate, and excels in oral discussions, "
    "he struggles severely with reading written text, frequently reverses letters (confusing 'b' and 'd', 'was' and 'saw'), "
    "reads at a very slow, halting pace, and experiences intense anxiety during written spelling tests. "
    "A formal psycho-educational assessment by a clinical child psychologist confirms a diagnosis of 'Dyslexia' (Specific Learning Disability). "
    "The school's Special Educator collaborates with Rohan's general classroom teacher to formulate an Individualized Education Programme (IEP). "
    "The IEP incorporates multi-sensory phonics instruction (Orton-Gillingham approach), text-to-speech audiobooks, extra time during examinations, "
    "and oral examination accommodations as mandated under the Rights of Persons with Disabilities (RPwD) Act, 2016."
)
P1_M5_QS = [
    case_q("Special Education and Support Services", "Dyslexia Diagnostic Manifestation",
     "What specific developmental learning disability is manifested by Rohan's reading and letter-reversal difficulties despite normal intelligence?",
     "Dyslexia (Specific Learning Disability in reading and phonological processing)",
     ["Dyscalculia (mathematics disability)", "Locomotor physical disability", "Profound intellectual disability (mental retardation)"],
     "Dyslexia is a neurodevelopmental learning disability characterized by difficulties with accurate and fluent word recognition, spelling, and decoding."),
    case_q("Special Education and Support Services", "Inclusive Education vs Segregation",
     "What is the foundational philosophy of 'Inclusive Education' implemented by Rohan's school?",
     "Educating children with diverse learning needs and disabilities alongside typically developing peers in regular classrooms with appropriate adaptations",
     ["Isolating disabled children in separate asylum institutions forever", "Forcing children with disabilities to drop out of school", "Ignoring all learning difficulties"],
     "Inclusion restructures classroom culture and pedagogy to welcome all diverse learners equitably within general education settings."),
    case_q("Special Education and Support Services", "Individualized Education Programme (IEP) Role",
     "What is the core function of an 'Individualized Education Programme' (IEP) in special education?",
     "A customized, legally binding written document tailored to the child's specific learning profile, detailing measurable goals, accommodations, and support services",
     ["A commercial invoice for school tuition fees", "A medical prescription for psychiatric drugs", "A formal expulsion letter from school"],
     "An IEP maps current performance, establishes individualized short/long-term learning goals, and delineates specific classroom accommodations."),
    case_q("Special Education and Support Services", "Multi-sensory Pedagogical Approach",
     "Why is a 'Multi-Sensory' instructional approach (combining visual, auditory, kinesthetic, and tactile pathways) effective for children with Dyslexia?",
     "Engages multiple sensory neural pathways simultaneously, helping the brain reinforce letter-sound associations through tracing, hearing, and seeing",
     ["Because it eliminates the need for any teachers", "Because it forces children to stay silent for hours", "Multi-sensory learning has zero scientific validity"],
     "Simultaneous multi-sensory stimulation (VAKT) reinforces phonological neural pathways by linking visual letters with speech sounds and tactile tracing."),
    case_q("Special Education and Support Services", "Reasonable Accommodations under RPwD Act 2016",
     "Which examination accommodation is legally guaranteed to students with Dyslexia under the Rights of Persons with Disabilities Act, 2016?",
     "Extra time (compensatory time), provision of a reader/scribe, and disregarding minor spelling errors in non-language subjects",
     ["Exempting the student from attending school permanently", "Giving the student 100% marks automatically without taking tests", "Banning the student from entering the library"],
     "The RPwD Act 2016 mandates reasonable accommodations (compensatory time, alternative questions, scribes/readers, spelling waivers).")
]

P2_M5_TXT = (
    "Read the following hospital laundry management case study and answer the questions that follow:\\n\\n"
    "City Care Multispecialty Hospital operates an in-house commercial laundry processing 2,500 kg of linen daily from intensive care units, "
    "operating theatres, and patient wards. "
    "The laundry manager enforces strict biohazard infection control protocols:\\n"
    "1. Soiled linen from general wards is collected in white canvas hampers, while foul and infectious linen contaminated with blood or body fluids "
    "is isolated at bedside into leak-proof yellow biohazard bags.\\n"
    "2. Linen is loaded into industrial Barrier Washer-Extractors built directly through a physical dividing wall, ensuring soiled linen loading doors "
    "and clean linen unloading doors remain completely physically separated in different rooms.\\n"
    "3. Thermal disinfection is achieved by maintaining wash cycles at 71°C for 3 minutes, followed by an oxygen-bleach cycle and an acidic sour rinse (pH 6.0).\\n"
    "4. Clean bedsheets and drawsheets are dried and pressed continuously on massive steam-heated Flatwork Ironers (Calenders)."
)
P2_M5_QS = [
    case_q("Care and Maintenance of Fabrics in Institutions", "Barrier Washer Infection Control Mechanism",
     "Why are 'Barrier Washers' built through a physical dividing wall in hospital commercial laundries?",
     "To maintain complete physical separation between the soiled receiving area and clean finishing area, preventing airborne microbial cross-contamination",
     ["To prevent hospital staff from talking to each other", "To make the machines look futuristic", "Because washing machines are too heavy for one room"],
     "Barrier washers partition dirty sorting from clean folding, guaranteeing that clean disinfected linen is never re-exposed to contaminated air."),
    case_q("Care and Maintenance of Fabrics in Institutions", "Thermal Disinfection Standards",
     "What wash temperature and duration standardly guarantee thermal eradication of vegetative pathogens in healthcare laundering?",
     "Washing at a minimum of 71°C for at least 3 minutes (or 65°C for 10 minutes)",
     ["Washing in cold tap water at 15°C for 30 seconds", "Boiling linen at 500°C until the cloth catches fire", "Washing in salt water without heat"],
     "Healthcare standards mandate thermal disinfection cycles of >=71°C for 3 minutes (or >=65°C for 10 min) to destroy pathogenic vegetative bacteria."),
    case_q("Care and Maintenance of Fabrics in Institutions", "Laundry Sour (Acidic Rinse) Purpose",
     "Why is an acidic 'Sour' rinse applied during the final rinse cycle of commercial hospital laundering?",
     "Neutralizes residual alkaline detergent residues, prevents fabric yellowing during pressing, and adjusts fabric pH to skin-friendly levels (pH 5.5-6.5)",
     ["Adds sweet lemon perfume to hospital sheets", "Turns white bedsheets into bright red colors", "Stiffens sheets so they cannot bend"],
     "Laundry sour neutralizes harsh alkaline residues, preventing chemical skin irritation for bedridden patients and scorched yellowing on ironers."),
    case_q("Care and Maintenance of Fabrics in Institutions", "Yellow Biohazard Bag Protocol",
     "Why must linen soaked with blood or infectious bodily fluids be sealed into yellow biohazard bags at patient bedside?",
     "To alert laundry personnel to handle the load with extreme biohazard precautions without opening or manually sorting it prior to washing",
     ["Because yellow bags are the cheapest plastic bags available", "To throw the linen into municipal garbage dumps", "Because patients prefer yellow colors"],
     "Isolating infectious linen in biohazard-coded bags alerts staff to transfer bags directly into washers without manual sorting, preventing disease transmission."),
    case_q("Care and Maintenance of Fabrics in Institutions", "Flatwork Ironer (Calender) Function",
     "What commercial efficiency is delivered by the steam-heated Flatwork Ironer (Calender)?",
     "Simultaneously dries, flattens, and irons large flat linens (bedsheets, pillowcases) at high linear speeds through heated rotating rollers",
     ["Dyeing white fabrics with chemical paints", "Cutting large fabrics into tiny pieces with knives", "Washing shoes and leather bags"],
     "Calenders utilize revolving steam-heated rollers to dry and press damp flatwork linens continuously in a single rapid pass.")
]

# ==============================================================================
# MOCK 6 PASSAGES
# ==============================================================================
P1_M6_TXT = (
    "Read the following case study on adolescent public health nutrition and answer the questions that follow:\\n\\n"
    "During an annual health screening at a government girls' senior secondary school, the medical team tests hemoglobin levels across 300 adolescent girls. "
    "The screening reveals that 62% of the girls suffer from Nutritional Anemia (hemoglobin < 12.0 g/dL), with 15% categorized as moderately to severely anemic (< 10.0 g/dL). "
    "Teachers report that many anemic students experience chronic lethargy, difficulty concentrating in class, frequent headaches, and poor academic scores. "
    "Physical inspection demonstrates conjunctival pallor and pale nail beds. "
    "The school implements the national 'Anemia Mukt Bharat' protocol:\\n"
    "1. Administering Weekly Iron and Folic Acid Supplementation (WIFAS) using blue IFA tablets (100 mg elemental iron + 500 mcg folic acid) on fixed days (Wednesdays).\\n"
    "2. Conducting biannual deworming with Albendazole (400 mg) tablets on National Deworming Day.\\n"
    "3. Counseling students to consume iron-rich dietary sources (green leafy vegetables, jaggery, sprouted pulses) paired with Vitamin C rich amla and guava, "
    "while avoiding tea and coffee immediately before or after meals."
)
P1_M6_QS = [
    case_q("Public Nutrition and Health", "Anemia Threshold for Adolescent Girls",
     "According to WHO and national standards, what hemoglobin threshold defines anemia in non-pregnant adolescent girls (aged 12-19)?",
     "Hemoglobin level below 12.0 g/dL",
     ["Hemoglobin level below 15.0 g/dL", "Hemoglobin level below 7.0 g/dL only", "Hemoglobin level above 18.0 g/dL"],
     "Non-pregnant adolescent girls and adult women are clinically categorized as anemic when blood hemoglobin drops below 12.0 g/dL."),
    case_q("Public Nutrition and Health", "Cognitive and Educational Impact of Anemia",
     "Why does iron deficiency anemia directly cause poor academic attention and classroom lethargy in adolescents?",
     "Iron is an essential constituent of hemoglobin needed to transport oxygen to the brain, and acts as a cofactor in neuro-cognitive neurotransmitter synthesis",
     ["Anemia causes excessive bone growth that distracts students", "Anemia makes students speak foreign languages", "Anemia has zero cognitive effect on humans"],
     "Reduced hemoglobin compromises cerebral oxygenation, while iron depletion impairs dopamine and brain enzyme function, inducing cognitive fatigue."),
    case_q("Public Nutrition and Health", "Weekly Iron Folic Acid Supplementation (WIFAS) Norms",
     "What is the exact prophylactic composition of the blue IFA tablet distributed to school adolescents under WIFAS?",
     "100 mg elemental iron and 500 mcg (0.5 mg) folic acid administered once weekly",
     ["10 mg iron and 100 mg vitamin C daily", "500 mg iron and 10 mg calcium twice daily", "Folic acid only with zero iron"],
     "WIFAS provides a weekly blue tablet containing 100 mg elemental iron and 500 micrograms folic acid throughout the school academic year."),
    case_q("Public Nutrition and Health", "Dietary Synergy: Vitamin C and Iron",
     "Why did the health team instruct students to consume amla, guava, or lemon juice alongside iron-rich meals?",
     "Ascorbic acid (Vitamin C) reduces ferric iron (Fe3+) to soluble ferrous iron (Fe2+), vastly enhancing non-heme iron absorption in the intestine",
     ["Vitamin C turns iron into protein", "Vitamin C makes food look green", "Vitamin C eliminates all calories from the meal"],
     "Ascorbic acid prevents the formation of insoluble iron compounds, converting plant non-heme iron into readily absorbable ferrous complexes."),
    case_q("Public Nutrition and Health", "Inhibitory Effect of Tea and Coffee",
     "Why must students strictly avoid drinking black tea or coffee immediately after taking iron supplements or meals?",
     "Tannins and polyphenols in tea/coffee bind dietary iron into insoluble chelate complexes, severely suppressing iron absorption",
     ["Tea turns iron into poisonous lead", "Tea causes iron tablets to explode in the stomach", "Coffee dissolves all hemoglobin in the blood"],
     "Tannins and polyphenols in tea/coffee are potent iron chelators that precipitate iron into non-absorbable complexes.")
]

P2_M6_TXT = (
    "Read the following social marketing campaign case study and answer the questions that follow:\\n\\n"
    "To curb diarrheal mortality among infants, a state health department launches a comprehensive Social Marketing campaign promoting "
    "'Handwashing with Soap at Critical Times' (after defecation, after cleaning a child's bottom, and before preparing or eating food). "
    "The campaign strategists apply the commercial marketing mix (the 4 Ps) creatively:\\n"
    "1. Product: The primary product is the intangible healthy behavior (handwashing with soap for 20 seconds), alongside the tangible enabling product "
    "(affordable bar soap or liquid soap dispenser).\\n"
    "2. Price: The non-monetary price is addressed—the effort of walking to a water tap, taking 20 seconds, and the monetary cost of soap.\\n"
    "3. Place: Establishing handwashing stations with running water and soap at school toilets, anganwadis, and community markets.\\n"
    "4. Promotion: A dynamic multi-channel campaign featuring emotional triggers of disgust (invisible fecal germs on hands) and maternal protective pride, "
    "popularized through street plays, school jingles, and television ads. "
    "Formative pre-testing of prototype slogans ensured the messaging resonated deeply with rural mothers before statewide launch."
)
P2_M6_QS = [
    case_q("Development Communication and Journalism", "Social Marketing Primary Product",
     "In this campaign, what constitutes the primary 'Product' being marketed to the community?",
     "The intangible pro-social behavior of washing hands with soap at critical times for child health and infection prevention",
     ["A commercial brand of expensive imported perfume", "A new brand of television sets", "A paid private medical insurance policy"],
     "In social marketing, the primary product is predominantly an intangible pro-social behavior, idea, or life-saving habit."),
    case_q("Development Communication and Journalism", "The Concept of 'Price' in Social Marketing",
     "What represents the true 'Price' that target mothers must pay to adopt the handwashing behavior?",
     "Overcoming longstanding habits, the physical effort of fetching water, allocating 20 seconds during busy chores, and soap expenditure",
     ["Paying a monthly tax to the health ministry", "The cost of buying luxury clothing", "A penalty fee for walking into a school"],
     "Social marketing 'Price' captures the friction costs: time, cognitive effort, physical labor of fetching water, and economic cost of soap."),
    case_q("Development Communication and Journalism", "Place Strategy in Social Marketing",
     "How does the campaign optimize the 'Place' dimension of the marketing mix?",
     "By establishing convenient, accessible handwashing stations with water and soap right next to latrines, kitchens, and school canteens",
     ["By hiding soap inside locked school closets", "By selling soap only in distant airports", "By broadcasting television ads at midnight"],
     "'Place' ensures that the physical enabling environment (water, soap dispensers) is immediately available at the exact point of behavioral decision."),
    case_q("Development Communication and Journalism", "Emotional Triggers over Abstract Information",
     "Why did the campaign utilize visceral emotional triggers (disgust regarding fecal contamination and maternal pride) rather than dry germ statistics?",
     "Human behavior is propelled far more powerfully by deep emotional drivers (disgust, protection, social status) than by abstract intellectual data",
     ["Because villagers cannot see numbers", "Because emotions are legally required in advertising", "Because abstract data is too expensive to print"],
     "Behavioral science demonstrates that visceral emotions (e.g. disgust at fecal-oral ingestion) are far more potent drivers of habit change than dry logic."),
    case_q("Development Communication and Journalism", "Formative Pre-testing Value",
     "What critical risk was averted by pre-testing the prototype campaign materials with sample rural mothers before mass production?",
     "Prevented the broadcast of confusing, culturally offensive, or ineffective slogans, ensuring maximum clarity and emotional resonance",
     ["Saved money on painting government buildings", "Tested whether paper tears in rain", "Prevented the need for any radio broadcasting"],
     "Pre-testing reveals hidden cultural misunderstandings, offensive taboos, and communicative flaws before committing massive public broadcast funds.")
]

# ==============================================================================
# MOCK 7 PASSAGES
# ==============================================================================
P1_M7_TXT = (
    "Read the following case study on elderly care and gerontological services and answer the questions that follow:\\n\\n"
    "In an urban neighborhood experiencing rapid nuclearization of families, an NGO establishes 'Aanand Day Care Centre for Senior Citizens'. "
    "The centre operates Monday through Friday from 9 AM to 5 PM, catering to 40 older adults (aged 65 to 84 years) whose adult children work in offices. "
    "A gerontological social worker and a physiotherapist design holistic daily routines:\\n"
    "1. Physical adaptations: The facility is barrier-free, featuring non-skid floors, grab bars in restrooms, well-lit corridors, and ramp entrances to mitigate fall risks.\\n"
    "2. Health monitoring: Regular screening of blood pressure, blood glucose, and medication compliance, paired with low-impact seated yoga and joint mobility exercises.\\n"
    "3. Cognitive and socio-emotional stimulation: Group music therapy, memory games, storytelling, and an 'Intergenerational Reading Club' where senior citizens "
    "tutor primary school children in reading.\\n"
    "4. Legal and counseling aid: Educating elders on their statutory rights under the Maintenance and Welfare of Parents and Senior Citizens Act, 2007."
)
P1_M7_QS = [
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Day Care Centre Benefit over Institutionalization",
     "What major psychological advantage does a Senior Citizen Day Care Centre offer compared to permanent placement in an old age home?",
     "Elders enjoy daytime peer socialization and mental stimulation while continuing to live with their families in their own homes every evening and weekend",
     ["Elders are isolated completely from their family forever", "Elders are required to perform 8 hours of factory labor daily", "Day care centers cost zero rupees to operate"],
     "Day care centers provide socialization and activities during working hours while preserving the elder's continuous integration within family homes."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Intergenerational Solidarity Impact",
     "How does the 'Intergenerational Reading Club' (seniors tutoring young children) benefit both demographic groups?",
     "Restores a sense of purpose, self-worth, and cognitive vitality to older adults, while providing children with patient mentors and positive attitudes toward aging",
     ["Teaches children how to become elderly faster", "Forces seniors to complete primary school homework", "Eliminates the need for classroom teachers"],
     "Intergenerational programs foster reciprocal psychosocial benefits: giving elders meaningful social roles while dismantling ageist stereotypes in children."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Environmental Fall Prevention Measures",
     "Why are non-skid flooring, wall grab bars, and eliminating raised floor thresholds critical architectural safety features in senior centres?",
     "Age-related osteoporosis, slower reflexes, and diminished balance make falls a primary cause of debilitating fractures (e.g. hip fractures) in the elderly",
     ["To make the building look like a modern gymnasium", "To prevent elderly people from walking", "Because smooth floors are illegal in India"],
     "Falls are a leading cause of geriatric mortality and permanent immobility; environmental modifications eliminate physical slip and trip hazards."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Legal Redress under Maintenance Act 2007",
     "What enforceable legal protection does the Maintenance and Welfare of Parents and Senior Citizens Act, 2007 provide to neglected elderly parents?",
     "Empowers parents to claim mandatory monthly maintenance allowances from adult children/heirs through fast-track Maintenance Tribunals",
     ["Sends all adult children to prison automatically without hearing", "Forces parents to surrender all bank accounts to the government", "Provides free luxury foreign vacations to seniors"],
     "The 2007 Act establishes fast-track administrative tribunals where senior citizens can claim legally enforceable monthly maintenance from children."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Active Ageing Concept Realization",
     "How does Aanand Day Care Centre embody the World Health Organization's (WHO) policy framework of 'Active Ageing'?",
     "By optimizing opportunities for physical health, continuous mental engagement, social participation, and dignity as individuals age",
     ["By forcing 80-year-olds to run 10-kilometer marathons daily", "By keeping seniors locked in quiet dark rooms all day", "By eliminating all recreational activities"],
     "Active ageing recognizes that older adults thrive when supported with continuous healthcare, social participation, lifelong learning, and emotional security.")
]

P2_M7_TXT = (
    "Read the following food safety and adulteration detection case study and answer the questions that follow:\\n\\n"
    "During the festive Diwali season, a district Food Safety Officer (FSO) accompanied by mobile food testing lab staff inspects wholesale markets. "
    "The team draws food samples for rapid chemical and qualitative assay testing:\\n"
    "1. Milk Sample: Adding a few drops of iodine solution turns the milk sample deep blue, confirming adulteration with Starch. "
    "Testing with a commercial strip reveals elevated pH and detergent presence.\\n"
    "2. Turmeric Powder: Adding concentrated hydrochloric acid (HCl) turns the sample intense pink-magenta, which persists without fading when diluted with water, "
    "confirming illegal adulteration with carcinogenic Metanil Yellow dye.\\n"
    "3. Mustard Oil: Testing with nitric acid produces a crimson-red ring at the interface, confirming adulteration with toxic Argemone mexicana seed oil.\\n"
    "4. Black Pepper: Immersing pepper berries in water causes light seeds to float, which on inspection are identified as dried Papaya seeds.\\n"
    "The FSO seizes the adulterated batches under the Food Safety and Standards Act, 2006, sealing the premises and initiating prosecution."
)
P2_M7_QS = [
    case_q("Food Quality and Food Safety", "Detection of Starch in Milk",
     "Why did the milk sample turn deep blue upon the addition of iodine solution?",
     "Iodine reacts specifically with amylose starch molecules to form a characteristic deep blue inclusion complex, proving starch adulteration",
     ["Pure cow milk naturally turns blue with iodine", "The milk was frozen into ice", "The test tube was dirty with blue ink"],
     "Starch is a common milk adulterant used to artificially inflate solid-not-fat (SNF) readings; iodine testing yields a pathognomonic blue color."),
    case_q("Food Quality and Food Safety", "Metanil Yellow Adulteration Toxicity",
     "Why is the presence of Metanil Yellow in turmeric powder and sweets severely dangerous to public health?",
     "Metanil yellow is a non-permitted industrial coal-tar dye that is neurotoxic, hepatotoxic, and highly carcinogenic upon chronic ingestion",
     ["It makes turmeric lose its natural smell only", "It turns cooked curry completely black", "It causes minor hiccups only"],
     "Metanil yellow is an illegal industrial azo dye causing testicular degeneration, neurotoxicity, and cancer upon cumulative ingestion."),
    case_q("Food Quality and Food Safety", "Argemone Oil and Epidemic Dropsy",
     "What severe epidemic clinical syndrome is caused by consuming mustard oil adulterated with Argemone mexicana seed oil?",
     "Epidemic Dropsy (manifested by severe bilateral pitting edema of limbs, gastrointestinal distress, cardiac failure, and glaucoma)",
     ["Lathyrism spastic leg paralysis", "Scurvy and bleeding gums", "Dental fluorosis"],
     "Argemone oil contains toxic sanguinarine alkaloids that disrupt capillary permeability, triggering severe systemic dropsy and cardiac failure."),
    case_q("Food Quality and Food Safety", "Physical Separation of Papaya Seeds from Black Pepper",
     "Why do dried papaya seeds float when immersed in water, while authentic black pepper berries sink?",
     "Dried papaya seeds have low physical density and porous cellular structure, causing them to float, unlike dense dried black peppercorns",
     ["Because papaya seeds are made of solid iron", "Because black pepper berries are covered in cooking oil", "Because water dissolves black pepper instantly"],
     "Physical flotation is a rapid screening test: genuine peppercorns sink in water or alcohol, whereas hollow dried papaya seeds float."),
    case_q("Food Quality and Food Safety", "Statutory Powers of Food Safety Officers",
     "Under the Food Safety and Standards Act, 2006, what statutory powers does a Food Safety Officer (FSO) possess during inspection?",
     "Power to enter premises, inspect food operations, seize adulterated food stocks, draw samples for accredited lab analysis, and initiate prosecution",
     ["Power to execute food vendors on the spot without trial", "Power to keep all seized food items for personal home consumption", "Power to pass new constitutional amendments"],
     "The FSS Act empowers FSOs to inspect, seize hazardous food lots, send samples to Food Analysts, and file criminal/civil complaints before Adjudicating Officers.")
]

# ==============================================================================
# MOCK 8 PASSAGES
# ==============================================================================
P1_M8_TXT = (
    "Read the following guidance and psychological counselling case study and answer the questions that follow:\\n\\n"
    "Priya, a 17-year-old Class 12 student preparing for engineering entrance examinations, approaches the school guidance counsellor. "
    "She exhibits severe academic distress: chronic insomnia, panic attacks before mock tests, crying spells, and deep feelings of worthlessness. "
    "She expresses that her parents expect her to secure a top rank, and she catastrophizes: 'If I don't get into IIT, my entire life is destroyed.'\\n"
    "The counsellor implements a structured therapeutic protocol rooted in Carl Rogers' Person-Centred Counselling and Cognitive Behavioral Therapy (CBT):\\n"
    "1. Rapport Building: Providing unconditional positive regard, empathetic listening, and assuring Priya of strict confidentiality.\\n"
    "2. Exploration: Actively listening to Priya's fears without judgment, reflecting her emotions, and identifying her irrational cognitive distortions.\\n"
    "3. Cognitive Reframing: Guiding Priya to challenge her catastrophic 'all-or-nothing' thinking and reframe failure as a learning opportunity.\\n"
    "4. Relaxation Training: Teaching diaphragmatic deep-breathing and Progressive Muscle Relaxation (PMR) to manage acute somatic panic."
)
P1_M8_QS = [
    case_q("Guidance and Counselling", "Unconditional Positive Regard in Counselling",
     "What does the counsellor's provision of 'Unconditional Positive Regard' signify in Carl Rogers' person-centred framework?",
     "Accepting and respecting Priya warmly as a human being of intrinsic worth without conditions, moral criticism, or judgment",
     ["Agreeing that Priya should drop out of high school immediately", "Promising that Priya will score 100% in all engineering exams", "Telling Priya that her parents are completely evil"],
     "Unconditional positive regard provides psychological safety, validating the client's human dignity regardless of academic performance."),
    case_q("Guidance and Counselling", "Cognitive Distortion: All-or-Nothing Thinking",
     "In cognitive therapy, what distorted cognitive pattern is represented by Priya's statement: 'If I don't get into IIT, my entire life is destroyed'?",
     "Catastrophizing / All-or-Nothing (Dichotomous) Thinking",
     ["Superior logical reasoning", "Paranoid hallucination", "Photographic memory recall"],
     "Catastrophizing magnifies setbacks into total existential ruin, evaluating life in rigid black-and-white extremes."),
    case_q("Guidance and Counselling", "Cognitive Reframing Technique Function",
     "How does the technique of 'Cognitive Reframing' assist Priya in reducing her test panic?",
     "Helps her identify distorted irrational thoughts, test their objective evidence, and construct balanced, realistic alternative beliefs",
     ["Hypnotizes her so she forgets that exams exist", "Writes the entrance examination on her behalf", "Forces her to study 20 hours continuously"],
     "Cognitive reframing dismantles catastrophic cognitive distortions, replacing them with rational, self-efficacious coping perspectives."),
    case_q("Guidance and Counselling", "Progressive Muscle Relaxation (PMR) Role",
     "What physiological effect does Progressive Muscle Relaxation (PMR) produce to counteract acute anxiety?",
     "Activates the parasympathetic nervous system, lowering heart rate, reducing muscle tension, and blunting the sympathetic fight-or-flight response",
     ["Raises adrenaline to maximum danger levels", "Makes the muscles completely paralyzed for 24 hours", "Turns off all brain activity"],
     "PMR systematically tenses and releases muscle groups, inducing reciprocal physiological relaxation and dampening autonomic arousal."),
    case_q("Guidance and Counselling", "Ethical Boundary of Confidentiality",
     "Under what circumstance would the school counsellor be ethically obligated to breach confidentiality regarding Priya's disclosures?",
     "If Priya discloses active, imminent suicidal intent or explicit plans to cause severe physical harm to herself or others",
     ["If her parents ask to see her personal diary notes", "If her class teacher asks why she was crying in class", "If her grades drop in mathematics"],
     "The 'Duty to Warn and Protect' legally and ethically supersedes confidentiality only when there is clear, imminent danger of self-harm or violence.")
]

P2_M8_TXT = (
    "Read the following case study on the fashion lifecycle and retail merchandising and answer the questions that follow:\\n\\n"
    "An apparel retail chain, Trendz India, prepares its commercial spring merchandise plan. "
    "The fashion merchandiser analyzes how diverse fashion trends move through the five stages of the classic 'Fashion Cycle':\\n"
    "1. Introduction: Avant-garde metallic cargo skirts debut on Paris luxury runways; worn by celebrity fashion innovators and photographed in Vogue.\\n"
    "2. Rise: High-end ready-to-wear brands adapt the concept with wearable cotton blends; early adopters purchase the look, and social media influencers showcase it.\\n"
    "3. Peak: Mass-market fashion brands manufacture cargo skirts in massive volumes across diverse price tiers; the style reaches peak retail sales and ubiquity.\\n"
    "4. Decline: The market becomes oversaturated; fashion-forward consumers reject the ubiquitous style; retailers introduce 30-50% promotional markdowns.\\n"
    "5. Obsolescence: The style is abandoned, discontinued from production, and relegated to final clearance discount bins."
)
P2_M8_QS = [
    case_q("Fashion Design and Merchandising", "Fashion Cycle Peak Stage Characteristics",
     "What market conditions characterize the 'Peak / Culmination' stage of the Fashion Cycle?",
     "Maximum mass-market popularity, widespread public adoption, mass manufacturing across multiple price tiers, and ubiquitous retail availability",
     ["The style is worn only by two models in Paris", "The style is completely rejected and thrown into garbage bins", "Prices are at their highest luxury level with zero sales"],
     "The peak stage represents maximum volume saturation: the trend is produced and consumed across mainstream consumer demographics."),
    case_q("Fashion Design and Merchandising", "Trickle-Down Fashion Adoption Theory",
     "How does the journey of the cargo skirt from Paris runways to mass department stores exemplify the 'Trickle-Down Theory'?",
     "The style originated among luxury couture designers and elite trendsetters, and gradually cascaded downward to mass-market commercial consumers",
     ["The style originated among rural factory workers and rose to royalty", "The style spread horizontally across all classes on day one", "The style was invented by a computer algorithm"],
     "Trickle-down theory posits that styles originate with wealthy fashion leaders and filter down sequentially through social classes."),
    case_q("Fashion Design and Merchandising", "Markdown Strategy during Decline Phase",
     "Why do apparel retailers implement aggressive 'Markdowns' as a fashion enters the Decline stage?",
     "To rapidly liquidate excess stock, clear retail shelf space, and recover working capital before the style becomes completely unsellable (obsolete)",
     ["To force the designer to resign from the company", "Because the fabric has become physically toxic", "To pay higher sales taxes to the government"],
     "Retail markdowns accelerate inventory clearance during waning consumer demand, freeing store floor space and capital for new trends."),
    case_q("Fashion Design and Merchandising", "Fashion Innovators vs Early Adopters",
     "Who are 'Fashion Innovators' in the demographic adoption of new trends?",
     "The adventurous first 2.5% of consumers who eagerly purchase and wear unproven, avant-garde styles during the initial introduction phase",
     ["The last group of consumers who buy clothes on final clearance", "People who refuse to wear clothes", "Factory workers who weave textiles"],
     "Fashion innovators embrace high aesthetic risk, purchasing experimental runway styles before general market validation."),
    case_q("Fashion Design and Merchandising", "Fad vs Fashion Cycle Duration",
     "How would the fashion cycle differ if the cargo skirt were a short-lived 'Fad' rather than a standard fashion trend?",
     "A fad would experience an almost vertical surge in popularity over a few weeks and vanish abruptly within a single season, lacking a sustained peak",
     ["A fad lasts for 100 years without changing", "A fad is worn only by senior citizens", "A fad never sells in stores"],
     "Fads feature steep, compressed lifecycles: explosive rapid adoption followed by swift collapse without a prolonged peak or transition.")
]

# ==============================================================================
# MOCK 9 PASSAGES
# ==============================================================================
P1_M9_TXT = (
    "Read the following case study on traditional folk media and street theatre and answer the questions that follow:\\n\\n"
    "An activist cultural troupe, 'Lok Chetna Manch', is commissioned by an NGO to combat widespread child labor in a cluster of brick kilns and glass factories. "
    "Knowing that literacy rates among the migrant worker families are below 30%, the troupe rejects printed leaflets and chooses Street Theatre (Nukkad Natak).\\n"
    "1. Audience Mobilization: Performers gather in the dusty central bazaar; a loud, rhythmic dholak beat, clashing brass cymbals, and energetic chorus singing "
    "attract hundreds of laborers, mothers, and children into a wide open circle within five minutes.\\n"
    "2. Performance Aesthetics: The actors wear simple black kurtas with colorful dupattas, utilizing zero expensive stage sets or microphones. "
    "They use sharp satire, comedic mime, rhyming folk couplets, and local dialects to dramatize the tragic story of a young boy trapped in a glass furnace.\\n"
    "3. Spect-Actor Participation: At the climax, the lead actor breaks the theatrical fourth wall, turns to the audience, and invites a village elder into the circle "
    "to discuss practical ways to enroll kiln children in the local bridge school."
)
P1_M9_QS = [
    case_q("Development Communication and Journalism", "Street Theatre over Print Media in Low-Literacy Settings",
     "Why was Street Theatre (Nukkad Natak) vastly more effective than printed pamphlets for the migrant worker community?",
     "It completely transcends illiteracy barriers, communicates through spoken local idioms and emotional performance, and requires no reading skills",
     ["Because printed paper is legally prohibited in brick kilns", "Because street theatre actors pay money to the audience", "Because books are too heavy to carry"],
     "Street theatre communicates directly via oral-visual performance, local humor, and music, bypassing print literacy barriers completely."),
    case_q("Development Communication and Journalism", "Dholak and Chorus Function in Nukkad Natak",
     "What is the operational purpose of the rhythmic dholak drumming, cymbal clashing, and loud chorus singing at the start of a street play?",
     "To attract public attention, cut through ambient street noise, and gather a concentrated audience circle in an open public space",
     ["To collect religious donations from travelers", "To signal the police to arrive", "To frighten children away from the market"],
     "Street performers rely on loud percussive instruments and stirring chants to command auditory attention and assemble a crowd in busy public squares."),
    case_q("Development Communication and Journalism", "Minimalist Aesthetics and Portability",
     "Why does street theatre traditionally utilize uniform simple costumes (black kurtas) and zero elaborate stage sets?",
     "Maximizes physical portability, allows rapid impromptu staging in any public space, and focuses audience attention entirely on acting and message",
     ["Because actors are not allowed to wear colorful clothes", "Because stage sets are too heavy for airplanes", "Because theater laws mandate black clothes"],
     "Minimalist props and attire allow troupes to travel lightly, adapt to any open clearing, and prioritize expressive message delivery over spectacle."),
    case_q("Development Communication and Journalism", "Breaking the Fourth Wall for Empowerment",
     "What is the communicative purpose of an actor 'breaking the fourth wall' and speaking directly to the spectators at the end of the play?",
     "Transforms passive spectators into active critical thinkers ('Spect-Actors'), provoking reflection, dialogue, and community ownership of solutions",
     ["To insult the audience members individually", "To end the play abruptly because the actor forgot their lines", "To tell the audience to go home immediately"],
     "Breaking the fourth wall shatters theatrical illusion, transitioning the drama into participatory community consciousness-raising and collective action."),
    case_q("Development Communication and Journalism", "Augusto Boal's Theatre of the Oppressed Legacy",
     "Which revolutionary theatrical framework pioneered by Augusto Boal directly inspired participatory interactive street theatre worldwide?",
     "Theatre of the Oppressed (Forum Theatre)",
     ["Classical Greek Tragedy", "Broadway Musical Entertainment", "Victorian Melodrama"],
     "Augusto Boal pioneered 'Theatre of the Oppressed', transforming spectators into active 'Spect-Actors' who rehearse real-world liberation on stage.")
]

P2_M9_TXT = (
    "Read the following clinical nutrition and specialized feeding case study and answer the questions that follow:\\n\\n"
    "Mr. Rajesh, a 45-year-old construction supervisor, is admitted to the Surgical Intensive Care Unit (SICU) with severe polytrauma, multiple rib fractures, "
    "and blunt abdominal injury following a building collapse. "
    "He undergoes emergency laparotomy and small bowel resection. "
    "During the immediate post-operative period (first 48 hours), paralytic ileus is present with absent bowel sounds, requiring temporary intravenous hydration. "
    "As hemodynamic stability is restored on Day 3, the clinical nutrition team evaluates the optimal nutritional support strategy:\\n"
    "1. The surgical fellow proposes keeping the patient on prolonged Total Parenteral Nutrition (TPN) through a central venous catheter.\\n"
    "2. The Chief Clinical Dietitian strongly advocates transitioning immediately to Enteral Nutrition via a Nasojejunal (NJ) feeding tube, "
    "emphasizing the clinical dictum: 'If the gut works, even partially, use it!'\\n"
    "The team initiates continuous trophic enteral feeding, gradually advancing caloric intake while closely monitoring serum electrolytes to prevent Refeeding Syndrome."
)
P2_M9_QS = [
    case_q("Clinical Nutrition and Dietetics", "Enteral Feeding Superiority over TPN",
     "Why did the Chief Clinical Dietitian advocate Enteral tube feeding over Total Parenteral Nutrition (TPN) as soon as the small bowel was functional?",
     "Enteral feeding maintains gut mucosal villous architecture, prevents bacterial translocation into blood, preserves immune barrier, and has lower infection risk",
     ["Enteral feeding is completely free of cost while TPN is banned by law", "Parenteral nutrition causes permanent kidney failure in all patients", "Enteral tubes do not require any medical supervision"],
     "Luminal nutrients nourish intestinal enterocytes directly; enteral feeding preserves gut mucosal integrity and prevents systemic sepsis."),
    case_q("Clinical Nutrition and Dietetics", "Nasojejunal (NJ) Feeding Tube Placement",
     "Why was a Nasojejunal (NJ) tube selected rather than a standard Nasogastric (NG) stomach tube for Mr. Rajesh?",
     "Bypasses the stomach and duodenum directly into the jejunum, preventing gastric aspiration and overcoming delayed gastric emptying post-laparotomy",
     ["Because jejunal tubes are placed through the ear", "Because the stomach was completely removed by surgery", "Because NJ tubes can only deliver whole solid food"],
     "Jejunal post-pyloric feeding delivers nutrients directly into the functional small intestine, minimizing pulmonary aspiration risks in critically ill patients."),
    case_q("Clinical Nutrition and Dietetics", "Total Parenteral Nutrition (TPN) Indication",
     "In which clinical scenario is Total Parenteral Nutrition (TPN) through a central vein truly mandatory?",
     "When the gastrointestinal tract is completely non-functional or inaccessible (e.g. massive bowel resection with short bowel syndrome, severe intractable ileus, high-output fistulas)",
     ["When a patient has a mild sore throat", "When a patient has a toothache and refuses to chew", "When a patient prefers intravenous food over eating"],
     "TPN is indicated exclusively when the GI tract is anatomical or functional failure: severe short bowel, total obstruction, or intractable vomiting."),
    case_q("Clinical Nutrition and Dietetics", "Pathology of Refeeding Syndrome",
     "What dangerous metabolic shift characterizes 'Refeeding Syndrome' during rapid nutritional replenishment in a catabolic patient?",
     "Rapid carbohydrate infusion stimulates massive insulin release, driving phosphate, potassium, and magnesium into cells, causing lethal hypophosphatemia and cardiac arrest",
     ["Blood sugar drops to zero permanently", "Bones dissolve into liquid calcium", "Stomach acid burns through the abdominal wall"],
     "Refeeding triggers surge in insulin, causing intracellular shifts of phosphorus, potassium, and magnesium, precipitating fatal cardiac failure."),
    case_q("Clinical Nutrition and Dietetics", "Biochemical Monitoring in Critical Illness",
     "Which circulating visceral protein is standardly monitored by clinical dietitians to track recovery from acute catabolic stress?",
     "Serum Prealbumin (Transthyretin) due to its short 2-day half-life",
     ["Serum Albumin (half-life 20 days)", "Blood hemoglobin only", "Serum cholesterol"],
     "Prealbumin has a rapid half-life of 2-3 days, making it an agile, responsive biomarker for tracking acute nutritional changes and recovery in ICU patients.")
]

# ==============================================================================
# MOCK 10 PASSAGES
# ==============================================================================
P1_M10_TXT = (
    "Read the following child welfare and statutory protection case study and answer the questions that follow:\\n\\n"
    "Railway police at a major railway terminal intercept an 8-year-old unaccompanied boy, Rahul, wandering on the platform in a distressed state. "
    "Rahul ran away from an abusive domestic labor situation in a distant state. "
    "The police immediately contact the 24-hour CHILDLINE emergency outreach service (1098). "
    "The statutory child protection machinery is activated under the Juvenile Justice (Care and Protection of Children) Act, 2015:\\n"
    "1. Production before CWC: Within 24 hours, CHILDLINE social workers produce Rahul before the district Child Welfare Committee (CWC).\\n"
    "2. Legal Categorization: The CWC classifies Rahul as a 'Child in Need of Care and Protection' (CNCP) under Section 2(14) of the JJ Act.\\n"
    "3. Safe Custody: CWC orders temporary placement in a licensed Children's Home / Open Shelter, directing a Social Investigation Report (SIR) by a Child Welfare Officer.\\n"
    "4. Rehabilitation: The Committee explores biological family tracing and repatriation; if unviable, non-institutional alternatives (foster care, legal adoption through CARA) are considered."
)
P1_M10_QS = [
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "CHILDLINE 1098 Mandate and Nature",
     "What is 'CHILDLINE 1098' in India's national child protection system?",
     "A 24-hour, toll-free, nationwide emergency telephone outreach service for children in need of immediate rescue, shelter, medical care, and protection",
     ["A private paid tutoring helpline for high school examinations", "A government service for reporting traffic accidents", "A telephone service for ordering train tickets"],
     "CHILDLINE 1098 is India's 24/7 toll-free crisis response helpline operational across districts to rescue children in distress."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Child Welfare Committee (CWC) Statutory Authority",
     "What is the statutory judicial status of the Child Welfare Committee (CWC) established under the Juvenile Justice Act?",
     "A district-level quasi-judicial bench having the powers of a Metropolitan Magistrate or Judicial Magistrate First Class regarding child welfare and protection",
     ["An informal advisory club with no legal powers", "A police department holding criminal trials", "A private adoption commercial business"],
     "CWC functions as a quasi-judicial body with magisterial powers to adjudicate care, protection, custody, and rehabilitation of vulnerable children."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Child in Need of Care and Protection (CNCP) Definition",
     "Why was Rahul classified by the CWC as a 'Child in Need of Care and Protection' (CNCP) rather than a 'Child in Conflict with Law'?",
     "Because Rahul was found destitute, working as an exploited child laborer, homeless, and without parental care, having committed no criminal offense",
     ["Because Rahul committed an armed robbery on the train", "Because Rahul refused to take school exams", "Because Rahul did not have a railway ticket"],
     "CNCP covers orphaned, abandoned, working, abused, or destitute children; Children in Conflict with Law refers to juveniles accused of offenses."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Mandatory Production Timeframe",
     "Under the Juvenile Justice Act, within what mandatory timeframe must a rescued child be produced before the Child Welfare Committee (CWC)?",
     "Within 24 hours of rescue (excluding travel time)",
     ["Within 30 days", "Within 1 year", "There is no statutory timeframe"],
     "The law strictly mandates producing any rescued child before the CWC within 24 hours to prevent unauthorized detention."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Central Adoption Resource Authority (CARA) Role",
     "If Rahul's biological parents cannot be traced after exhaustive investigation, through which nodal statutory authority can he be declared legally free for adoption?",
     "Central Adoption Resource Authority (CARA) via the Specialized Adoption Agency (SAA) and CWC certification",
     ["National Commission for Women", "Ministry of Finance", "Central Bureau of Investigation (CBI)"],
     "CARA is the statutory central authority regulating and monitoring transparent in-country and inter-country adoptions of orphaned/abandoned children.")
]

P2_M10_TXT = (
    "Read the following occupational ergonomics case study and answer the questions that follow:\\n\\n"
    "An occupational health audit at an export garment manufacturing factory reveals alarming health complaints among 200 sewing machine operators. "
    "Over 70% of female machine stitchers suffer from chronic Work-Related Musculoskeletal Disorders (WMSDs): lower back pain, neck stiffness, "
    "shoulder impingement, and Carpal Tunnel Syndrome in the wrists. "
    "An ergonomics expert inspects the workstations and identifies severe ergonomic design flaws:\\n"
    "1. Sewing chairs are rigid wooden stools without lumbar backrests, forcing operators into continuous forward-stooped static kyphotic postures.\\n"
    "2. Foot pedals are fixed at awkward high angles, straining ankle joints and impeding venous blood return.\\n"
    "3. Poor task illumination (dim, flickering tubes) creates severe visual glare and eye strain, forcing operators to crane their necks close to needles.\\n"
    "The factory management executes an ergonomic redesign: introducing adjustable ergonomic chairs with lumbar support, adjustable angled foot pedals, "
    "glare-free LED needle task lights, and instituting mandatory 3-minute hourly stretch breaks."
)
P2_M10_QS = [
    case_q("Work, Livelihood and Career", "Work-Related Musculoskeletal Disorders (WMSDs) Etiology",
     "What primary ergonomic risk factors in the garment factory induced chronic Musculoskeletal Disorders among the machine operators?",
     "Sustained awkward static postures, repetitive wrist-finger movements, lack of lumbar back support, and poorly designed workstations",
     ["Operators eating too much fresh fruit during lunch", "Sewing machines using blue thread instead of white", "Factory floors being painted green"],
     "WMSDs stem from mechanical stress: static sustained muscle loading, repetitive motions, unadjusted heights, and lack of ergonomic support."),
    case_q("Work, Livelihood and Career", "Ergonomic Chair Adjustability Features",
     "What essential adjustable features must the newly installed ergonomic chairs provide to relieve lumbar and spinal fatigue?",
     "Pneumatic height adjustment (allowing feet to rest flat with knees at 90 degrees), contoured lumbar backrest support, and padded seat pan",
     ["Spinning metal spikes on the seat pan", "A fixed wooden board tilted permanently backward at 60 degrees", "A chair with no backrest whatsoever"],
     "Ergonomic chairs must provide adjustable seat height (knees at 90°), seat depth, and dedicated lumbar support conforming to the lordotic curve."),
    case_q("Work, Livelihood and Career", "Carpal Tunnel Syndrome Biomechanics",
     "Why did repetitive manual fabric feeding and wrist bending cause Carpal Tunnel Syndrome in the stitchers' hands?",
     "Repetitive wrist flexion and extension inflames surrounding flexor tendon sheaths, compressing the Median Nerve inside the carpal tunnel",
     ["Compresses the sciatic nerve in the leg", "Destroys all bones in the elbow", "Causes blood to stop circulating in the heart"],
     "Repetitive awkward wrist deviation increases carpal tunnel pressure, compressing the median nerve and causing numbness, tingling, and motor weakness."),
    case_q("Work, Livelihood and Career", "Visual Ergonomics and Neck Posture",
     "How did inadequate, dim task lighting at the sewing needle directly exacerbate the operators' neck and upper spine pain?",
     "Forced operators to crane their heads and necks forward and downward into extreme cervical flexion to see fine stitching, overloading neck extensor muscles",
     ["Caused the sewing machine motor to burn out", "Made the fabric shrink under the needle", "Dim lighting has zero effect on human posture"],
     "Visual deficits force postural compensation: workers lean close to the work surface, generating massive biomechanical torque on cervical vertebrae."),
    case_q("Work, Livelihood and Career", "Ergonomic Stretch Breaks Physiology",
     "What physiological benefit is achieved by introducing 3-minute hourly micro-breaks and physical stretches during prolonged sewing shifts?",
     "Interrupts static muscle contractions, restores capillary blood circulation to fatigued tissues, clears lactic acid, and re-lubricates spinal discs",
     ["Wastes company working time and reduces profits", "Proves that the workers are lazy", "Allows workers to fall asleep on the floor"],
     "Micro-breaks relieve static intramuscular pressure, facilitating oxygenated blood perfusion and dissipating fatigue metabolites.")
]

# ==============================================================================
# PASSAGES COMPILATION
# ==============================================================================
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
for idx, (p1, p2) in enumerate(PASSAGES_1_10, 1):
    assert len(p1[1]) == 5, f"Mock {idx} P1 has {len(p1[1])} questions instead of 5"
    assert len(p2[1]) == 5, f"Mock {idx} P2 has {len(p2[1])} questions instead of 5"

print(f"Home Science Passages 1 to 10 compiled successfully: {len(PASSAGES_1_10)} pairs (20 passages, 100 questions).")
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Generated {out_path} ({len(content)} bytes)")
