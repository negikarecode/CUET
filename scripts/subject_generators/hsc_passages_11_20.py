import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 11 PASSAGES
# ==============================================================================
P1_M11_TXT = (
    "Read the following food preservation and dehydration case study and answer the questions that follow:\n\n"
    "NutriBaby Foods, a commercial baby food manufacturing plant, produces premium instant infant cereals and dehydrated fruit powders. "
    "To manufacture infant cereal slurries into instant dissolving flakes, the plant utilizes industrial steam-heated Drum Dryers. "
    "For heat-sensitive strawberry and banana purees, however, thermal drum drying is rejected because high heat destroys vitamin C, beta-carotene, "
    "and delicate natural aromatic flavor compounds. "
    "Instead, the plant installs a state-of-the-art Freeze-Drying (Lyophilization) unit. "
    "The fruit puree is first blast-frozen into solid ice blocks at -40°C. "
    "Next, it is transferred into high-vacuum drying chambers where pressure is reduced below the triple point of water (0.006 atm). "
    "Under gentle radiant heating, ice crystals sublime directly into water vapor without melting into liquid water, preserving 98% of original nutrients, "
    "natural color, and creating a porous spongy structure that rehydrates instantaneously in cold water."
)
P1_M11_QS = [
    case_q("Food Processing and Technology", "Physical Principle of Freeze Drying",
           "What is the foundational physical phase change mechanism utilized in Freeze Drying (Lyophilization)?",
           "Sublimation: frozen ice converts directly into water vapor under deep vacuum without passing through a liquid water phase",
           ["Evaporation: boiling liquid water at 100°C under high pressure", "Condensation: converting water vapor into liquid water", "Precipitation: settling solid particles at the bottom of a tank"],
           "Freeze drying relies on ice sublimation under deep vacuum (below water's triple point), preventing heat damage and shrinkage."),
    case_q("Food Processing and Technology", "Nutrient and Sensory Preservation in Lyophilization",
           "Why is Freeze Drying vastly superior to thermal air-drying for fruit purees and baby foods?",
           "Absence of high heat and liquid water prevents thermal degradation of vitamins, preserves volatile aroma compounds, and prevents structural shrinkage",
           ["Freeze drying adds synthetic chemical vitamins automatically", "Freeze drying turns fruit puree into milk powder", "Freeze drying is the cheapest possible drying method"],
           "Sublimation preserves cellular structure, delicate vitamins (C, A), and volatile aromatics, yielding a porous, instant-rehydrating matrix."),
    case_q("Food Processing and Technology", "Drum Drying Application",
           "Why is industrial Drum Drying appropriate for infant precooked starches and potato flakes?",
           "Quickly cooks and dehydrates thick starchy slurries simultaneously on steam-heated rotating metal cylinders into thin dry sheets",
           ["It keeps foods frozen at -40°C", "It works exclusively on whole raw apples", "It replaces pasteurization of liquid milk"],
           "Drum drying simultaneously gelatinizes and rapidly dehydrates viscous starches on steam-heated revolving drums into dry flake films."),
    case_q("Food Processing and Technology", "Water Activity in Dehydrated Foods",
           "What Water Activity (aw) level is achieved in properly freeze-dried baby foods to guarantee microbial stability at room temperature?",
           "Water Activity below 0.30 (well below the 0.60 minimum threshold required for mold or bacterial growth)",
           ["Water Activity of 0.95", "Water Activity of 1.00 (identical to pure water)", "Water Activity above 0.85"],
           "Commercial dehydrated foods achieve aw < 0.30, completely arresting bacterial, yeast, and mold metabolic proliferation."),
    case_q("Food Processing and Technology", "Moisture-Proof Packaging for Freeze-Dried Foods",
           "Why must freeze-dried powders be packaged immediately in hermetically sealed, multi-layer aluminum foil pouches under nitrogen flush?",
           "Their porous spongy structure is extremely hygroscopic, rapidly absorbing ambient humidity and oxygen, causing sogginess and oxidative rancidity",
           ["Because freeze-dried food glows in the dark if exposed to light", "Because foil pouches make food taste sweeter", "Because paper bags are illegal in India"],
     "Porous lyophilized foods are intensely hygroscopic; hermetic barrier foil pouches protect against moisture re-absorption and lipid oxidation.")
]

P2_M11_TXT = (
    "Read the following consumer protection and regulatory enforcement case study and answer the questions that follow:\n\n"
    "A commercial health supplement brand, 'MaxiHeight Pro', launches an aggressive multi-media advertising campaign on national television and social media. "
    "The advertisements feature a celebrity sports star claiming that consuming their powder guarantees a height increase of 6 inches in adults aged 20 to 35 within 90 days. "
    "A coalition of consumer activists and pediatrician associations lodges a formal complaint before the Central Consumer Protection Authority (CCPA). "
    "The CCPA's Investigation Wing, headed by a Director-General, conducts an inquiry and establishes that the claim is biologically impossible, scientifically bogus, "
    "and constitutes a 'Misleading Advertisement' under Section 2(28) of the Consumer Protection Act, 2019. "
    "The CCPA exercises its statutory powers: ordering immediate discontinuation of the advertisements, imposing a financial penalty of Rs. 10 lakhs on the manufacturer, "
    "directing full refund to all purchasers, and prohibiting the celebrity endorser from endorsing any product for a period of one year."
)
P2_M11_QS = [
    case_q("Consumer Education and Protection", "Definition of Misleading Advertisement",
           "Under Section 2(28) of the Consumer Protection Act, 2019, what legally constitutes a 'Misleading Advertisement'?",
           "An advertisement that falsely describes a product, gives false guarantees, or deliberately conceals vital material information, deceiving consumers",
           ["An advertisement that offers discounts during Diwali", "An advertisement printed in black and white ink", "An advertisement that appears on billboards"],
           "Misleading ads make false efficacy claims, exaggerate performance, or conceal critical side effects, manipulating consumer decisions."),
    case_q("Consumer Education and Protection", "Central Consumer Protection Authority (CCPA) Powers",
           "What decisive statutory action can the CCPA take against deceptive manufacturers under CPA 2019?",
           "Issue directions to discontinue misleading ads, impose fines up to Rs. 10-50 lakhs, order product recalls, and mandate price refunds to consumers",
           ["Sentence corporate executives to death without court trial", "Confiscate all television sets in the country", "Close down all post offices"],
           "CCPA has executive power to investigate class-action consumer harms, mandate ad retractions, order recalls, and levy severe financial penalties."),
    case_q("Consumer Education and Protection", "Legal Liability of Celebrity Endorsers",
     "Why was the celebrity sports star penalized under CPA 2019 for endorsing 'MaxiHeight Pro'?",
     "CPA 2019 holds celebrity endorsers legally accountable for false claims unless they can prove they performed thorough due diligence to verify product efficacy",
     ["Celebrities are prohibited from appearing on television", "Celebrities must pay income tax directly to consumers", "Celebrities cannot drink health supplements"],
     "CPA 2019 imposes statutory accountability on endorsers, mandating independent due diligence before lending personal credibility to commercial claims."),
    case_q("Consumer Education and Protection", "Class Action Consumer Rights Protection",
     "How did the CCPA's intervention benefit the entire public as a 'Class' rather than an individual complainant?",
     "By issuing a universal discontinuance order, imposing manufacturer fines, and mandating general consumer refunds across the entire national market",
     ["By giving money only to the two doctors who filed the petition", "By increasing the price of milk in stores", "By banning all sports competitions"],
     "CCPA acts as a class-action guardian, taking executive action to protect the collective public interest rather than settling isolated disputes."),
    case_q("Consumer Education and Protection", "Consumer Redressal Redirection: National Commission",
     "If the manufacturer wishes to appeal against the punitive order passed by the CCPA, before which judicial forum can an appeal be filed within 30 days?",
     "National Consumer Disputes Redressal Commission (NCDRC)",
     ["Local Police Station", "District Consumer Forum", "State Legislative Assembly"],
     "Under Section 24 of CPA 2019, any person aggrieved by an order of the CCPA may file an appeal before the National Commission (NCDRC) within 30 days.")
]

# ==============================================================================
# MOCK 12 PASSAGES
# ==============================================================================
P1_M12_TXT = (
    "Read the following case study on daycare infrastructure and early childhood safety and answer the questions that follow:\n\n"
    "A multinational corporate IT park in Bengaluru establishes an on-site corporate Daycare Centre, 'Kilkari', for children of working employees (ages 6 months to 6 years). "
    "The centre's Director, a specialist in Early Childhood Care and Education (ECCE), ensures that physical infrastructure and policies adhere to national regulatory standards:\n"
    "1. Architectural Safety: Located on the ground floor, featuring padded soft flooring, rounded furniture corners, covered tamper-proof electrical sockets at adult height, "
    "and dedicated fire safety exits with fire extinguishers.\n"
    "2. Age-Segregated Rooms: Infant room (6-12 months) with sanitized cots and 1:3 caregiver ratio; Toddler room (1-3 years) with 1:6 ratio; Preschool room (3-6 years) with 1:10 ratio.\n"
    "3. Health and Sanitation: Dedicated diaper-changing stations with touchless handwash taps, isolated sick-bay room for unwell children, and background-verified, CPR-certified staff.\n"
    "4. Parent Engagement: Live CCTV access for nursing mothers, daily communication logs, and open-door policies allowing mothers to breastfeed during statutory work intervals."
)
P1_M12_QS = [
    case_q("Early Childhood Care and Education", "Mandatory Daycare Statutory Requirement",
     "Under the Maternity Benefit (Amendment) Act 2017, establishments employing how many workers are legally mandated to provide a crèche/daycare facility?",
     "50 or more employees",
     ["10 employees", "100 employees", "500 employees"],
     "The Maternity Benefit Amendment Act 2017 mandates a crèche facility in every establishment employing 50 or more employees within prescribed proximity."),
    case_q("Early Childhood Care and Education", "Caregiver-to-Child Ratio Significance",
     "Why is a strict caregiver-to-child ratio of 1:3 enforced in the Infant Room (6 to 12 months)?",
     "Infants require continuous responsive supervision, immediate diapering hygiene, individualized feeding, and emotional bonding to ensure survival and security",
     ["Because infants run faster than older children", "To reduce the cost of running the daycare", "Because infant rooms are too small for more children"],
     "Infant safety and emotional security demand low adult-child ratios for responsive, individualized care, feeding, and sensory monitoring."),
    case_q("Early Childhood Care and Education", "Environmental Child-Proofing Essentials",
     "Which architectural feature directly prevents accidental pediatric head trauma and electrocution in the toddler room?",
     "Rounded furniture edges, cushioned non-skid flooring, and elevated tamper-proof electrical outlets with safety covers",
     ["Polished glass tables with sharp corners", "Exposed wiring on the floor", "Steep open staircases without railings"],
     "Child-proofing mitigates predictable physical hazards: rounded corners soften collisions, and elevated covered sockets prevent fatal electrocution."),
    case_q("Early Childhood Care and Education", "Infection Control via Sick-Bay Isolation",
     "Why must a high-quality daycare centre maintain a dedicated 'Sick-Bay' room?",
     "To temporarily isolate and comfortably care for a child who develops acute fever, vomiting, or infectious symptoms until parents arrive, preventing disease outbreak",
     ["To punish children who misbehave in class", "To store old broken toys", "To lock up children during naptime"],
     "Sick-bays provide comfortable, infection-controlled isolation for unwell children, safeguarding the broader daycare population from contagion."),
    case_q("Early Childhood Care and Education", "Supporting Maternal Breastfeeding in Corporate Settings",
     "Under statutory maternity provisions, how many visits to the crèche per day (including rest intervals) is an employed mother legally permitted?",
     "Four visits per day",
     ["Only one visit per week", "Two visits per day", "Zero visits during office hours"],
     "The law mandates four daily visits to the crèche (including rest intervals), protecting maternal-infant attachment and sustained breastfeeding.")
]

P2_M12_TXT = (
    "Read the following commercial textile spotting and dry cleaning case study and answer the questions that follow:\n\n"
    "The Chief Spotter at an elite five-star hotel valet laundry inspects high-end guest garments presenting challenging localized stains:\n"
    "1. Garment A (White Silk Blouse): Exhibiting dark brown dried blood stains on the cuffs. The spotter rejects hot water, knowing heat coagulates hemoglobin. "
    "He treats the spot from the reverse over an absorbent blotter using cold water and a dilute enzymatic Protease spotting solution, followed by dilute ammonia.\n"
    "2. Garment B (Linen Tablecloth): Displaying stubborn orange rust spots from an iron service trolley. The spotter applies warm 5% Oxalic Acid solution, "
    "converting insoluble ferric oxide into soluble colorless iron oxalate complexes, followed by thorough water rinsing.\n"
    "3. Garment C (Pure Woolen Tuxedo): Soiled with buttery gravy. Because wool fibers swell and shrink in water, the spotter treats the grease spot with "
    "Perchloroethylene (Perc) solvent in a closed spotting board with steam-gun feathering, avoiding watermarks."
)
P2_M12_QS = [
    case_q("Care and Maintenance of Fabrics in Institutions", "Protein Stain Thermal Coagulation Danger",
     "Why did the spotter strictly avoid using hot water on the blood stains of Garment A?",
     "Hot water thermally denatures and coagulates hemoglobin and serum proteins, permanently setting them into insoluble bonds within the silk fibers",
     ["Hot water dissolves silk instantly into liquid", "Hot water turns blood stains into sugar crystals", "Hot water makes the fabric freeze"],
     "Heat coagulates proteinaceous stains (blood, egg, milk), binding them permanently into insoluble protein-fiber matrix networks."),
    case_q("Care and Maintenance of Fabrics in Institutions", "Enzymatic Digestion Mechanism",
     "What biochemical action did the Protease enzyme solution perform on the blood stain?",
     "Enzymatically hydrolyzed peptide bonds in the blood protein molecules, breaking them down into soluble, easily rinsable amino acid fragments",
     ["Bleached the entire blouse with chlorine gas", "Painted the spot with white fabric dye", "Burned a hole through the fabric"],
     "Protease enzymes selectively cleave peptide bonds in stubborn protein stains under fiber-safe temperatures, facilitating gentle removal."),
    case_q("Care and Maintenance of Fabrics in Institutions", "Oxalic Acid Chemistry in Rust Removal",
     "How does Oxalic Acid chemically eliminate stubborn iron rust stains on Garment B?",
     "Acts as a reducing and chelating agent, converting insoluble reddish-brown ferric oxide into soluble, colorless iron oxalate complexes that rinse away",
     ["Adds yellow paint to hide the rust", "Scratches the rust off using wire brushes", "Freezes the rust into ice"],
     "Oxalic acid reduces and chelates insoluble ferric ions into water-soluble iron oxalate, cleanly erasing rust discolorations."),
    case_q("Care and Maintenance of Fabrics in Institutions", "Dry Cleaning Solvent Suitability for Wool",
     "Why was Perchloroethylene (Perc) organic solvent chosen over water laundering for the pure woolen tuxedo (Garment C)?",
     "Perc dissolves oily grease soils without penetrating hydrophilic wool fibers, avoiding the felting, shrinkage, and dimensional distortion caused by water",
     ["Water is completely illegal on woolen fabrics", "Perc makes wool fabric shiny like plastic", "Wool dissolves in plain tap water"],
     "Non-aqueous organic solvents dissolve lipid greases without wetting or swelling protein fibers, preventing irreversible wool shrinkage and felting."),
    case_q("Care and Maintenance of Fabrics in Institutions", "Working from the Reverse Side Rule",
     "Why must localized stain spotting always be executed by applying reagents from the reverse (backside) of the fabric over an absorbent pad?",
     "It pushes the dissolved stain particles outward onto the receiving absorbent pad, preventing the stain from being forced deeper through the fabric face",
     ["Because the front of the fabric has no color", "Because the back of the fabric is made of plastic", "To hide the process from the customer"],
     "Flushing from the reverse ejects soil directly into the receiving blotter, avoiding driving the stain deeper into the weave.")
]

# ==============================================================================
# MOCK 13 PASSAGES
# ==============================================================================
P1_M13_TXT = (
    "Read the following case study on youth community mobilization and social development and answer the questions that follow:\n\n"
    "A contingent of 50 college student volunteers from the National Service Scheme (NSS) organizes a 7-day residential community camp in an adopted rural village. "
    "Embodying the foundational NSS motto, 'NOT ME BUT YOU', the student volunteers collaborate with the local Gram Panchayat to address village development needs:\n"
    "1. Shramdaan (Voluntary Physical Labor): Volunteers construct soak pits to manage stagnant wastewater around communal handpumps, preventing mosquito breeding.\n"
    "2. Health and Nutrition Awareness: Volunteers conduct door-to-door surveys, screen children for growth faltering, and organize a street play (Nukkad Natak) on anemia.\n"
    "3. Digital Literacy: Training rural women and farmers to operate UPI mobile payments and access Kisan Call Centre agronomic advisories.\n"
    "4. Tree Plantation: Planting 500 indigenous fruit-bearing trees (neem, amla, jamun) along school boundaries. "
    "Through democratic teamwork, empathetic rural immersion, and civic service, student volunteers develop leadership resilience and social sensitivity."
)
P1_M13_QS = [
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "NSS Foundational Motto Meaning",
     "What core ethical philosophy is expressed by the National Service Scheme (NSS) motto: 'NOT ME BUT YOU'?",
     "Selfless community service, democratic egalitarianism, empathy for fellow human beings, and placing community welfare above selfish individual interest",
     ["Refusing to take personal responsibility for any mistakes", "Demanding that others do all the work in the village", "Competing aggressively against classmates"],
     "The NSS motto 'Not Me But You' reflects selfless community service, social responsibility, and empathetic solidarity with fellow citizens."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "NSS Service Hours Requirement",
     "How many total hours of regular community service over two academic years must an NSS volunteer complete to earn the official NSS Certificate?",
     "240 hours (120 hours per academic year) plus participation in one 7-day special residential camp",
     ["10 hours only", "1,000 hours per month", "50 hours in four years"],
     "NSS volunteers complete 120 hours of community service per year for two consecutive years (240 hours total) and attend one 7-day special camp."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Shramdaan Concept in Rural Development",
     "What is 'Shramdaan' and how did it benefit the adopted village in the case study?",
     "Voluntary contribution of manual physical labor for community infrastructure (constructing soak pits to eliminate vector-borne disease hazards)",
     ["Paying commercial taxes to the village head", "Selling agricultural seeds to farmers for profit", "Organizing political election rallies"],
     "Shramdaan is the voluntary donation of physical labor for public community assets, fostering civic ownership, sanitation, and shared dignity of labor."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Impact of Rural Immersion on Youth Volunteers",
     "How does living and working in a rural village camp transform the personality and worldview of urban college students?",
     "Dismantles urban elitism, cultivates deep social empathy, builds resilience and leadership, and exposes students to grassroots developmental challenges",
     ["Teaches students how to abandon academic studies permanently", "Forces students to become professional farmers", "Encourages students to move to foreign countries"],
     "Rural immersion bridges the urban-rural divide, nurturing empathetic, socially conscious youth leaders attuned to national development priorities."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Institutional Umbrella of Youth Services",
     "Under which central ministry of the Government of India do the National Service Scheme (NSS) and Nehru Yuva Kendra Sangathan (NYKS) function?",
     "Ministry of Youth Affairs and Sports",
     ["Ministry of Defense", "Ministry of Heavy Industries", "Ministry of External Affairs"],
     "The Ministry of Youth Affairs and Sports governs national youth development schemes including NSS, NYKS, and the National Youth Policy.")
]

P2_M13_TXT = (
    "Read the following food and beverage service and banquet management case study and answer the questions that follow:\n\n"
    "The Banquet and Restaurant Manager at an upscale convention hotel oversees a high-profile corporate conference dinner for 250 delegates. "
    "Operations are coordinated with military precision across two distinct dining areas:\n"
    "1. In the Main Banquet Hall, a formal Table d'Hôte (set multi-course) dinner is executed using Silver Service (English Service): "
    "trained waitstaff present food on gleaming silver platters to guests from the left side, portioning meat and vegetables onto guest plates using a service spoon and fork.\n"
    "2. In the adjacent Specialty Restaurant, evening diners enjoy an À la Carte menu where dishes are individually priced and cooked to order, "
    "served via American Plate Service from the right side.\n"
    "3. At Table 12, a guest orders Crepe Suzette; the restaurant captain executes Gueridon Service, wheeling a mobile flambé cooking trolley table-side, "
    "caramelizing sugar, butter, and orange zest, and dramatically flambéing the dessert with Grand Marnier liqueur in full view of the delighted guests."
)
P2_M13_QS = [
    case_q("Food and Beverage Service and Catering", "Silver Service (English Service) Mechanics",
     "What service protocol defines 'Silver Service' executed in the banquet hall?",
     "Food is presented on silver platters to the seated guest from the left side and served onto the guest's plate using a service spoon and fork in the server's right hand",
     ["Plates are pre-assembled in the kitchen and dropped from the ceiling", "Guests walk into the kitchen to pick up food", "Food is served on disposable paper plates"],
     "In Silver (English) Service, platters are presented from the guest's left side and skillfully served onto plates using service cutlery."),
    case_q("Food and Beverage Service and Catering", "Table d'Hôte vs À la Carte Distinction",
     "What is the operational and pricing difference between the banquet's 'Table d'Hôte' menu and the restaurant's 'À la Carte' menu?",
     "Table d'hôte offers a pre-set multi-course meal at a fixed overall price for all guests; À la carte offers diverse dishes individually priced and cooked to order",
     ["Table d'hôte has no food; à la carte has only drinks", "À la carte is completely free of cost", "Table d'hôte is served only in morning breakfast"],
     "Table d'hôte is a set multi-course meal at a fixed inclusive price; À la carte offers independent choices priced separately."),
    case_q("Food and Beverage Service and Catering", "Gueridon Service Characteristics",
     "What characterizes 'Gueridon Service' demonstrated during the preparation of Crepe Suzette at Table 12?",
     "Food is prepared, carved, finished, or dramatically flambéed table-side in front of the guests using a specialized mobile cooking trolley (gueridon)",
     ["Food is delivered through pneumatic tubes inside walls", "Food is served from an outdoor truck in the parking lot", "Food is served cold without cooking"],
     "Gueridon service offers culinary showmanship: finishing, carving, or flambéing gourmet dishes directly table-side on a mobile burner trolley."),
    case_q("Food and Beverage Service and Catering", "American (Plate) Service Protocol",
     "In American Plate Service utilized in the specialty restaurant, from which side is food standardly served and cleared?",
     "Food is pre-plated in the kitchen and served from the guest's right side, and soiled plates are cleared from the right side",
     ["Food is thrown from across the dining room", "Food is served from underneath the table", "Food is served exclusively from the left"],
     "In American plate service, dishes are portioned in the kitchen and served from the guest's right, minimizing dining room disturbance."),
    case_q("Food and Beverage Service and Catering", "Mise-en-place for Banquet Execution",
     "Why was meticulous 'Mise-en-place' (polishing 1,500 pieces of cutlery, folding napkins, arranging covers) executed hours before the 250 delegates arrived?",
     "Ensures that all physical table appointments and service stations are fully prepared, enabling smooth, rapid, and flawless service delivery during peak dining hours",
     ["To allow the restaurant manager to leave the hotel early", "Because guests are not allowed to sit on clean chairs", "Mise-en-place is a legal requirement for paying taxes"],
     "Mise-en-place eliminates chaos during active service, ensuring that sideboards, glassware, and tableware are fully staged for rapid banquet execution.")
]

# ==============================================================================
# MOCK 14 PASSAGES
# ==============================================================================
P1_M14_TXT = (
    "Read the following case study on managing Severe Acute Malnutrition (SAM) in an inpatient facility and answer the questions that follow:\n\n"
    "Two-year-old Meena is brought to a district hospital Nutrition Rehabilitation Centre (NRC) in a state of severe emaciation. "
    "Clinical assessment reveals severe wasting (Weight-for-Height Z-score < -3 SD), Mid-Upper Arm Circumference (MUAC) of 10.8 cm, "
    "hypoglycemia, and hypothermia (body temperature 35.2°C). "
    "The medical officer and clinical nutritionist implement the 10-step WHO protocol for the management of Severe Acute Malnutrition:\n"
    "1. Phase 1 (Stabilization, Days 1-2): Rewarming the child, administering 10% glucose to correct hypoglycemia, providing ReSoMal for dehydration, "
    "broad-spectrum antibiotics, and cautious 2-hourly feeding with F-75 starter formula (75 kcal and 0.9 g protein/100 mL).\n"
    "2. Phase 2 (Transition & Rehabilitation, Days 3-14): As appetite returns and infections subside, Meena transitions to F-100 catch-up formula "
    "(100 kcal and 2.9 g protein/100 mL) and Ready-to-Use Therapeutic Food (RUTF), achieving rapid catch-up growth (> 10 g/kg/day weight gain).\n"
    "3. Maternal Counseling: Educating the mother on energy-dense complementary feeding using locally available sprouted lentils and groundnuts before discharge."
)
P1_M14_QS = [
    case_q("Public Nutrition and Health", "Rationale for F-75 Starter Formula in SAM",
     "Why must a severely malnourished child initially be fed F-75 formula rather than high-protein F-100 or adult food during Phase 1 Stabilization?",
     "Malnourished tissues have fragile liver and kidney function; F-75 has lower protein (0.9g/100mL) and sodium, preventing lethal metabolic and cardiac overload",
     ["Because F-75 is a bitter medicine that cures diarrhea", "Because F-75 contains high chili powder to stimulate appetite", "Because F-100 is legally banned for girls"],
     "F-75 is designed for stabilization, not weight gain: high protein or sodium during early SAM management causes fatal liver failure and heart overload."),
    case_q("Public Nutrition and Health", "ReSoMal Composition Distinction",
     "Why is specialized ReSoMal (Rehydration Solution for Malnutrition) utilized instead of standard adult ORS for children with SAM?",
     "ReSoMal contains lower sodium and higher potassium and magnesium, preventing fatal sodium water-overload and heart failure in fragile SAM children",
     ["ReSoMal is completely sugar-free", "Standard ORS contains antibiotics that are toxic", "ReSoMal is injected directly into veins"],
     "Children with SAM have impaired cellular sodium-potassium pumps; standard high-sodium ORS precipitates fatal congestive heart failure."),
    case_q("Public Nutrition and Health", "Ready-to-Use Therapeutic Food (RUTF) Profile",
     "What is Ready-to-Use Therapeutic Food (RUTF, e.g. Plumpy'Nut) used in the rehabilitation of SAM children?",
     "A lipid-based, energy-dense, micronutrient-fortified peanut-milk paste that requires no water mixing and resists bacterial contamination",
     ["A dry biscuit that must be boiled in river water for 2 hours", "A liquid fruit juice that spoils within 10 minutes", "A commercial baby candy with artificial colors"],
     "RUTF is an energy-dense paste (peanut butter, milk powder, oil, sugar, micronutrients) with low water activity, allowing safe home feeding without water dilution."),
    case_q("Public Nutrition and Health", "Catch-Up Growth Target in NRC",
     "What rate of daily weight gain signifies excellent catch-up growth during the rehabilitation phase in an NRC?",
     "Weight gain exceeding 10 grams per kilogram of body weight per day (> 10 g/kg/day)",
     ["Weight gain of 1 gram per week", "Weight gain of 5 kilograms per day", "Zero weight gain"],
     "Weight gain >= 10 g/kg/day indicates rapid, successful catch-up growth on high-energy therapeutic feeding (F-100/RUTF)."),
    case_q("Public Nutrition and Health", "Hypothermia and Hypoglycemia Lethality",
     "Why are hypothermia and hypoglycemia treated as acute medical emergencies immediately upon admission of a SAM child?",
     "Malnourished children lack glycogen reserves and insulating body fat; hypoglycemia and hypothermia cause sudden catastrophic cardiac and metabolic arrest",
     ["Because cold body temperature makes children sneeze", "Because hypoglycemia makes children grow taller too quickly", "They are not considered emergencies"],
     "Depleted liver glycogen and loss of subcutaneous fat make SAM children susceptible to lethal drops in glucose and core temperature, requiring emergency warming and sugar.")
]

P2_M14_TXT = (
    "Read the following bridal couture design case study and answer the questions that follow:\n\n"
    "Celebrity fashion designer Rohit is creating an exclusive bridal lehenga ensemble for an Indian royal wedding. "
    "Rohit synthesizes historical craftsmanship with timeless design principles:\n"
    "1. Proportion: The lehenga skirt flare (ghera), blouse (choli), and veil (dupatta) adhere to the Golden Mean Ratio (approximately 1:1.618), "
    "ensuring that the heavily embellished skirt remains the dominant structural element while the choli balances the torso elegantly.\n"
    "2. Balance: The front panel of the lehenga exhibits Formal Symmetrical Balance, where intricate mirror-work and gold zardozi motifs mirror "
    "each other across the central vertical axis, evoking regal dignity and poise.\n"
    "3. Rhythm: Achieved through rhythmic Gradation of embroidered border bands that expand progressively from 2 inches at the waist to 10 inches at the sweeping hem.\n"
    "4. Color Harmony: The ensemble utilizes an Analogous Harmony of crimson red, scarlet, and ruby, complemented by antique gold bullion thread."
)
P2_M14_QS = [
    case_q("Design for Fabric and Apparel", "Formal Symmetrical Balance in Royal Attire",
     "Why did Rohit choose Formal (Symmetrical) Balance for the front panel of the bridal lehenga?",
     "Symmetrical balance conveys traditional dignity, stately authority, regal composure, and timeless ceremonial stability",
     ["Because symmetrical balance makes clothes 50% cheaper to produce", "Because asymmetrical clothes are banned in traditional weddings", "Because the tailor could only embroider one motif"],
     "Formal symmetry communicates order, composure, majestic dignity, and solemn grandeur, making it ideal for ceremonial royal couture."),
    case_q("Design for Fabric and Apparel", "Analogous Color Harmony Definition",
     "What defines the 'Analogous' color harmony selected for the bridal ensemble?",
     "Combining hues that sit immediately adjacent to each other on the color wheel (e.g. red, red-orange, and red-violet)",
     ["Using two colors from opposite sides of the color wheel", "Using three colors that form an equilateral triangle", "Using only white, grey, and black"],
     "Analogous schemes feature adjacent color wheel neighbors, creating rich, visually harmonious, and unified color transitions."),
    case_q("Design for Fabric and Apparel", "Rhythmic Gradation on Lehenga Ghera",
     "How does expanding the embroidered border bands progressively from 2 inches at the waist to 10 inches at the hem create 'Rhythm by Gradation'?",
     "The progressive scaling of border widths guides the eye in an organized visual descent, accentuating the volume and grandeur of the flared skirt",
     ["It makes the skirt physically weigh less", "It prevents the bride from tripping on her feet", "It makes the skirt look completely flat"],
     "Rhythmic gradation uses proportional progression in scale, creating fluid visual motion that anchors the hemline dramatically."),
    case_q("Design for Fabric and Apparel", "Golden Mean in Apparel Proportions",
     "Why does adhering to the Golden Mean ratio (approx. 1:1.618) produce superior aesthetic proportions in garments?",
     "It introduces subtle, mathematically pleasing unequal spatial relationships found in nature, avoiding static, boring 50-50 splits",
     ["Because Greek laws mandate it for all clothing worldwide", "Because it guarantees that garments will never fade", "Because it makes fabrics water-resistant"],
     "The Golden Mean represents nature's aesthetic proportion (dividing space into ~3:5 or 5:8), creating natural elegance and vertical balance."),
    case_q("Design for Fabric and Apparel", "Emphasis / Focal Point Strategy",
     "How does the lavishly encrusted zardozi hem border establish 'Emphasis' in the ensemble?",
     "It acts as the primary Center of Interest through overwhelming contrast of gold metallic texture, scale, and sparkle against the red silk",
     ["By hiding the bride's shoes completely", "By making the lehenga glow in the dark", "By turning the silk fabric into metal"],
     "Emphasis commands visual dominance through intense contrast, scale, and craftsmanship, anchoring the eye to the key design statement.")
]

# ==============================================================================
# MOCK 15 PASSAGES
# ==============================================================================
P1_M15_TXT = (
    "Read the following case study on women's self-help groups and grassroots economic empowerment and answer the questions that follow:\n\n"
    "In a drought-prone district of Maharashtra, an NGO mobilizes 15 rural women agricultural laborers to form 'Pragati Mahila Bachat Gat' (Self-Help Group - SHG). "
    "The SHG operates on structured micro-finance and livelihood principles inspired by SEWA and Kudumbashree:\n"
    "1. Financial Discipline: Members meet weekly, each depositing a mandatory small savings of Rs. 100 into a pooled bank account. "
    "Members access low-interest internal loans for family emergencies, freeing themselves from local moneylenders charging 60% annual usury.\n"
    "2. Enterprise Development: Under the National Rural Livelihoods Mission (NRLM - Aajeevika), the group receives a Revolving Fund and a bank credit linkage loan of Rs. 3 lakhs. "
    "The women establish a collective food processing enterprise: producing vacuum-packed organic dehydrated onion flakes, turmeric powder, and traditional pickles.\n"
    "3. Quality and Marketing: The women secure FSSAI registration, obtain an AGMARK quality seal for their spices, and market products through district Mahila E-Haat fairs, "
    "quadrupling their monthly household earnings and gaining decisive voices in village gram sabhas."
)
P1_M15_QS = [
    case_q("Work, Livelihood and Career", "Self-Help Groups (SHGs) Core Operational Model",
     "How do micro-finance linked Self-Help Groups (SHGs) foster economic resilience among marginalized rural women?",
     "By pooling small regular savings, providing collateral-free emergency loans, building creditworthiness, and initiating collective income-generating enterprises",
     ["By distributing free lottery tickets to villagers", "By borrowing money from predatory private moneylenders", "By prohibiting women from working outside the house"],
     "SHGs build community solidarity, collective savings, mutual financial buffers, and access to formal institutional bank credit."),
    case_q("Work, Livelihood and Career", "Liberation from Usurious Moneylending",
     "What immediate socio-economic protection did the SHG provide to the members' families?",
     "Liberated families from crippling debt traps of informal moneylenders by providing affordable, low-interest internal emergency credit",
     ["Provided free luxury sports cars to every family", "Eliminated the need to buy any food for life", "Exempted families from following national laws"],
     "Affordable micro-credit from pooled savings breaks the generational debt traps imposed by informal village usurers."),
    case_q("Work, Livelihood and Career", "National Rural Livelihoods Mission (NRLM / Aajeevika)",
     "What is the primary mandate of the National Rural Livelihoods Mission (NRLM / Aajeevika)?",
     "Poverty reduction through building strong grassroots institutions of poor women, facilitating diversified livelihoods, and securing formal bank credit",
     ["Building express railway tracks across mountains", "Manufacturing heavy military weapons", "Managing international foreign stock exchanges"],
     "NRLM mobilizes rural BPL households into universal self-managed SHGs, supporting them with revolving funds, skills, and bank credit linkages."),
    case_q("Work, Livelihood and Career", "AGMARK Quality Seal Value for SHG Products",
     "Why did the SHG secure an AGMARK quality certification for their turmeric and spice powders?",
     "To provide verified third-party proof of purity and quality, building consumer trust and enabling entry into competitive retail supermarkets",
     ["To avoid paying electricity bills for their workshop", "Because AGMARK allows food to be sold without packaging", "AGMARK turns spices into medicine"],
     "AGMARK certification validates agricultural product purity against national laboratory standards, commanding premium market trust."),
    case_q("Work, Livelihood and Career", "Empowerment Beyond Economics",
     "How did economic independence through the SHG translate into broader social empowerment for the women members?",
     "Enhanced self-confidence, boosted decision-making authority within households, and empowered active vocal participation in village Gram Sabhas",
     ["Caused women to stop speaking to their families", "Made women abandon their village homes", "It had zero social impact"],
     "Economic autonomy translates directly into social agency: elevating status within families and empowering women to influence local civic governance.")
]

P2_M15_TXT = (
    "Read the following special education and visual impairment case study and answer the questions that follow:\n\n"
    "Anand, a 10-year-old student with congenital total blindness, is enrolled in Class 5 of an inclusive neighborhood school. "
    "The school management collaborates with a certified Vision Special Educator to establish an accessible learning environment:\n"
    "1. Literacy Access: Anand is proficient in standard Louis Braille script, using a Perkins Brailler for writing and an electronic refreshable Braille display for digital text.\n"
    "2. ICT Assistive Technology: The computer lab installs JAWS and NVDA screen-reading software on computers, converting digital documents and internet websites "
    "into synthetic human speech via audio headphones.\n"
    "3. Tactile and Sensory Learning: Geometry and geography lessons utilize raised-line tactile diagram kits, thermoform relief maps, and embossed abacuses (Taylor Frame).\n"
    "4. Orientation and Mobility (O&M): An O&M specialist trains Anand in white cane techniques (touch technique, shore-lining) to navigate corridors, stairs, "
    "and playground areas independently and safely."
)
P2_M15_QS = [
    case_q("Special Education and Support Services", "Braille Script Mechanics",
     "How is written literacy represented in the Louis Braille tactile script system used by Anand?",
     "A 6-dot cell matrix arranged in two vertical columns of three dots each, forming 64 distinct embossed tactile combinations for letters, numbers, and signs",
     ["Large black letters carved onto wooden blocks", "Grooves cut into plastic sheets with razor blades", "Chemical smells associated with different words"],
     "Braille utilizes a standardized 6-dot cell (2x3 matrix), generating 64 unique embossed dot configurations for tactile reading by touch."),
    case_q("Special Education and Support Services", "Screen Reader Software (JAWS / NVDA) Function",
     "What essential function does screen-reading software (e.g. JAWS, NVDA) perform for visually impaired students?",
     "Interprets and translates on-screen digital text, menus, and web pages into synthetic auditory speech or refreshable Braille output",
     ["Magnifies text by 1,000 times on wall projectors", "Translates spoken speech into video graphics", "Scans paper documents and throws them away"],
     "Screen readers vocalize operating system interfaces and digital text via synthetic speech engines, enabling full computer autonomy."),
    case_q("Special Education and Support Services", "Tactile Diagrams in Visual Subjects",
     "How are abstract visual subjects (geography maps, biological cell anatomy) made accessible to blind students?",
     "Using thermoform embossed tactile diagram sheets with raised relief contours, textures, and Braille legends for tactile exploration",
     ["Exempting blind students from learning science or geography permanently", "Reading a 50-page text description without any tactile aids", "Showing video documentaries without audio"],
     "Tactile graphics translate visual maps, organs, and geometric figures into raised relief lines and textures for tactile spatial comprehension."),
    case_q("Special Education and Support Services", "Orientation and Mobility (O&M) Training Scope",
     "What is the objective of 'Orientation and Mobility' (O&M) training featuring the white cane?",
     "Teaching spatial awareness of one's environment (orientation) and safe, independent physical locomotion and travel (mobility) using sensory cues and cane techniques",
     ["Training students to run Olympic track races without shoes", "Teaching students how to repair broken canes", "Guiding students exclusively while holding their hands forever"],
     "O&M training imparts spatial orientation skills and cane travel techniques, enabling blind individuals to navigate environments safely and independently."),
    case_q("Special Education and Support Services", "RPwD Act 2016 Benchmark Disability Provision",
     "Under the Rights of Persons with Disabilities Act, 2016, what minimum degree of visual impairment qualifies an individual for official disability reservations and benefits?",
     "A certified benchmark disability of not less than 40% (40% benchmark disability)",
     ["Any minor need for reading spectacles", "100% total blindness only", "5% temporary eye fatigue"],
     "The RPwD Act 2016 defines a person with benchmark disability as someone with not less than 40% of a certified permanent impairment.")
]

# ==============================================================================
# MOCK 16 PASSAGES
# ==============================================================================
P1_M16_TXT = (
    "Read the following case study on gold hallmarking and consumer quality standards and answer the questions that follow:\n\n"
    "Meenakshi visits a prominent jewellery showroom to purchase a 22-karat gold necklace for her daughter's wedding. "
    "Aware of past consumer complaints regarding gold under-carating, Meenakshi insists on purchasing certified Gold Hallmarked jewellery. "
    "She inspects the inner clasp of the necklace under a 10x magnifying loupe, looking for the mandatory hallmarking marks established by the Bureau of Indian Standards (BIS):\n"
    "1. The official triangular BIS Logo.\n"
    "2. The Purity and Fineness Mark: '22K916' (indicating 22 Karat gold having 91.6% pure gold content and 8.4% alloy metal).\n"
    "3. The Assaying and Hallmarking Centre's identification logo.\n"
    "4. The 6-digit alphanumeric Hallmark Unique Identification (HUID) code: 'AB1234'.\n"
    "Using her smartphone, Meenakshi opens the official 'BIS Care' mobile app and enters the 6-digit HUID code into the 'Verify HUID' feature, "
    "instantly validating the exact date of hallmarking, assaying centre name, jeweller registration, and certified weight."
)
P1_M16_QS = [
    case_q("Consumer Education and Protection", "Fineness of 22-Karat Gold",
     "What does the fineness number '916' signify in 22-karat hallmarked gold jewellery?",
     "916 parts per thousand (91.6%) pure gold content alloyed with 8.4% other metals (copper/silver) for strength",
     ["The gold was mined in the year 1916", "The necklace weighs exactly 916 grams", "The retail price is 916 rupees per gram"],
     "22 Karat equals 22/24 parts gold = 91.66% pure gold, represented by the fineness mark '916'."),
    case_q("Consumer Education and Protection", "Hallmark Unique Identification (HUID) Function",
     "What is the revolutionary consumer protection function of the 6-digit alphanumeric 'HUID' laser-etched on gold jewellery?",
     "Provides unique item-level traceability, authenticates assaying verification, and prevents forgery via the national BIS database",
     ["Acts as a microchip that records conversations", "Allows the jewellery to be traced by satellite if stolen", "Shows the phone number of the goldsmith"],
     "HUID is a unique alphanumeric identifier laser-stamped at assaying centers, ensuring complete traceability and anti-counterfeiting verification."),
    case_q("Consumer Education and Protection", "BIS Care Mobile Application Utility",
     "How does the 'BIS Care' mobile application empower consumers buying hallmarked jewellery?",
     "Enables real-time digital verification of the authenticity of HUID codes, ISI licenses, and direct filing of quality complaints with BIS",
     ["Provides free gold bullion to winning users", "Pays the customer's jewellery purchase bill automatically", "Discounts gold prices by 50%"],
     "The BIS Care app allows citizens to verify HUID authenticity and check BIS certification licenses instantly on their mobile devices."),
    case_q("Consumer Education and Protection", "Bureau of Indian Standards (BIS) Status",
     "What is the statutory role of the Bureau of Indian Standards (BIS) under the BIS Act, 2016?",
     "The National Standards Body of India, responsible for the formulation of Indian Standards, product certification, and hallmarking",
     ["A private trade association of gold merchants", "A commercial gold mining company", "A branch of the Reserve Bank of India"],
     "The BIS Act 2016 establishes BIS as the National Standards Body governing industrial standardization, testing, and hallmarking."),
    case_q("Consumer Education and Protection", "Under-Carating Consumer Fraud",
     "What consumer fraud is completely eliminated by mandatory BIS Gold Hallmarking?",
     "Selling inferior low-carat gold alloys (e.g. 18K or 14K) falsely labeled as 22-karat gold at premium 22K prices",
     ["Selling fake diamond plastic gems", "Overcharging on jewellery making charges", "Shopkeepers refusing to accept credit cards"],
     "Mandatory hallmarking guarantees chemical assay verification of gold purity, protecting consumers from widespread under-carating fraud.")
]

P2_M16_TXT = (
    "Read the following case study on investigative development journalism and agrarian reporting and answer the questions that follow:\n\n"
    "Veteran investigative journalist P. Sainath spends three decades documenting the agrarian crisis, peasant indebtedness, and water inequality "
    "across rural India, culminating in his landmark book 'Everybody Loves a Good Drought'. "
    "Sainath establishes the 'People's Archive of Rural India' (PARI), a decentralized digital journalism platform. "
    "Sainath's reporting methodology embodies core tenets of authentic Development Journalism:\n"
    "1. Focusing on the Bottom 70%: Centering stories on landless agricultural laborers, smallholders, rural artisans, and adivasis who constitute "
    "the vast majority of India's demographic reality, yet receive less than 2% of corporate mainstream news space.\n"
    "2. Structural Analysis: Investigating the systemic root causes of drought and farmer distress—such as predatory private credit, water diversion "
    "to luxury urban golf courses and sugarcane mills, and public investment collapse—rather than blaming nature or rain gods.\n"
    "3. Multilingual Archiving: Documenting dying rural dialects, oral folk songs, indigenous farming wisdom, and livelihoods across all 22 scheduled languages."
)
P2_M16_QS = [
    case_q("Development Communication and Journalism", "Mainstream Media Urban Bias Critique",
     "What systemic critique does P. Sainath level against mainstream corporate television and print journalism?",
     "Overwhelming urban, elite consumer bias that devotes over 95% of prime-time news to celebrity trivialities and political theater while ignoring rural agrarian crises",
     ["Mainstream media broadcasts too much news about poor farmers", "Mainstream media is printed exclusively in regional dialects", "Mainstream media charges zero money for subscriptions"],
     "Mainstream commercial media is hyper-concentrated on urban elite consumption, structurally marginalizing the realities of the rural 70%."),
    case_q("Development Communication and Journalism", "Structural Investigation in Development Reporting",
     "Why did Sainath's drought reporting investigate bank credit policies and sugarcane water diversions rather than just reporting rainfall deficits?",
     "To reveal that rural droughts and farmer distress are primarily man-made structural crises of inequitable resource distribution rather than mere natural weather calamities",
     ["Because weather forecasts are illegal to report in newspapers", "Because sugarcane requires zero water to grow", "Because rain never falls in India"],
     "Development journalism digs beneath surface phenomena, unmasking how policy choices, elite water diversions, and debt structures produce poverty."),
    case_q("Development Communication and Journalism", "People's Archive of Rural India (PARI) Role",
     "What is the cultural and journalistic mission of the People's Archive of Rural India (PARI)?",
     "A living, non-commercial digital archive documenting the rich occupational diversity, languages, arts, and struggles of rural India by rural voices",
     ["A commercial online shopping website for rural handicrafts", "A government database for collecting income taxes from farmers", "A travel tourism agency promoting luxury hotels"],
     "PARI is a public digital journalism platform archiving the labor, tongues, and lived histories of rural citizens across every Indian district."),
    case_q("Development Communication and Journalism", "Magsaysay Award Recognition",
     "For what pioneering contribution to journalism was P. Sainath awarded the prestigious Ramon Magsaysay Award?",
     "For his fearless, compassionate, and passionate investigative journalism championing the rights of India's rural poor and exposing agrarian distress",
     ["For hosting commercial cricket talk shows", "For writing romantic fiction novels", "For directing fashion runway shows"],
     "Sainath received the Ramon Magsaysay Award for Journalism for giving voice to the voiceless rural majority and investigating structural poverty."),
    case_q("Development Communication and Journalism", "Role of Rural Livelihood Documentation",
     "Why is documenting disappearing rural occupations (potters, weavers, nomadic pastoralists) a vital mandate of development journalism?",
     "Preserves invaluable indigenous knowledge systems, oral cultural heritage, and highlights economic displacement caused by uncritical industrialization",
     ["Because old jobs should be forgotten as fast as possible", "To prevent young people from learning modern computer skills", "Because rural artisans are legally required to stop working"],
     "Documenting endangered rural trades preserves cultural biodiversity, celebrates artisanal dignity, and critically audits economic displacement.")
]

# ==============================================================================
# MOCK 17 PASSAGES
# ==============================================================================
P1_M17_TXT = (
    "Read the following clinical dietetics and renal nutrition case study and answer the questions that follow:\n\n"
    "Mr. Sharma, a 60-year-old retired teacher with a 20-year history of poorly controlled hypertension and diabetes, is diagnosed with "
    "Chronic Kidney Disease (CKD - Stage 4, non-dialysis dependent). "
    "His laboratory investigations show elevated Serum Creatinine (4.2 mg/dL), Blood Urea Nitrogen (68 mg/dL), elevated Serum Potassium (5.6 mEq/L - hyperkalemia), "
    "and high Serum Phosphorus (6.2 mg/dL), accompanied by severe bilateral pedal edema. "
    "The nephrologist and clinical dietitian collaborate to formulate a Renal Therapeutic Diet:\n"
    "1. Protein Restriction: Prescribing a controlled low-protein diet of 0.6 g/kg body weight/day, ensuring at least 60% comes from High Biological Value (HBV) protein (eggs, milk).\n"
    "2. Electrolyte Restrictions: Restricting sodium to 1.5 g/day to relieve edema; restricting high-potassium foods to prevent fatal cardiac arrhythmias; "
    "and restricting high-phosphorus foods to prevent renal osteodystrophy.\n"
    "3. Culinary Technique: Teaching the patient's family the 'Leaching' technique to extract excess potassium from vegetables before cooking."
)
P1_M17_QS = [
    case_q("Clinical Nutrition and Dietetics", "Low-Protein Diet Rationale in Non-Dialysis CKD",
     "Why is dietary protein restricted to 0.6 g/kg/day in non-dialysis Chronic Kidney Disease Stage 4?",
     "Reduces the production and accumulation of toxic nitrogenous waste metabolites (urea, uric acid, creatinine) that failing kidneys cannot excrete, slowing disease progression",
     ["Because kidneys synthesize protein from water", "To cause rapid muscle wasting intentionally", "Because protein causes immediate blindness in diabetes"],
     "Protein breakdown produces nitrogenous uremic toxins; restricting protein mitigates glomerular hyperfiltration stress and uremic toxicity."),
    case_q("Clinical Nutrition and Dietetics", "High Biological Value (HBV) Protein Mandate",
     "Why must at least 60% of the restricted protein in a renal diet be composed of 'High Biological Value' (HBV) sources?",
     "HBV proteins provide all essential amino acids in optimal human ratios with minimal waste, maximizing tissue maintenance with minimal urea production",
     ["Because plant proteins contain zero amino acids", "Because HBV proteins contain no nitrogen", "Because animal proteins are free of calories"],
     "HBV proteins (egg white, dairy) are utilized efficiently with high net protein utilization (NPU), yielding fewer toxic nitrogen breakdown products."),
    case_q("Clinical Nutrition and Dietetics", "The 'Leaching' Culinary Technique for Potassium",
     "What is the culinary process of 'Leaching' taught by the dietitian to reduce potassium in vegetables for renal patients?",
     "Peeling, finely slicing vegetables, soaking them in warm water for 2-3 hours, discarding the soaking water, and boiling in fresh water before cooking",
     ["Deep frying vegetables in boiling mustard oil for 1 hour", "Freezing vegetables into solid ice blocks for 3 days", "Spraying raw vegetables with lemon juice"],
     "Potassium is water-soluble; soaking chopped vegetables in excess warm water leaches out up to 50% of potassium, preventing hyperkalemia."),
    case_q("Clinical Nutrition and Dietetics", "Hyperkalemia Danger in Renal Failure",
     "Why is elevated Serum Potassium (hyperkalemia > 5.5 mEq/L) treated as a life-threatening medical emergency in kidney disease?",
     "Excess extracellular potassium alters cardiac muscle cell membrane potentials, triggering lethal cardiac arrhythmias and sudden cardiac arrest",
     ["Causes sudden tooth decay", "Makes hair fall out within minutes", "Causes severe stomach heartburn only"],
     "Hyperkalemia disrupts myocardial conduction, causing peaked T-waves, ventricular arrhythmias, and sudden fatal cardiac standstill."),
    case_q("Clinical Nutrition and Dietetics", "High-Phosphorus Foods Restriction",
     "Which foods must be strictly curtailed in a renal diet due to high phosphorus content that triggers renal bone disease?",
     "Nuts, oilseeds, whole grain bran, organ meats, colas, processed cheeses, and dried beans",
     ["Refined white sugar and pure ghee", "Watermelon and cucumbers", "Boiled egg white"],
     "Failing kidneys cannot excrete phosphorus; high dietary phosphorus drives hyperparathyroidism and painful bone mineral demineralization.")
]

P2_M17_TXT = (
    "Read the following traditional puppetry and health communication case study and answer the questions that follow:\n\n"
    "The Health Department of Rajasthan partners with traditional 'Bhatt' puppeteers from Jaipur to promote child immunization and maternal health across remote desert hamlets. "
    "The puppeteers utilize traditional 'Kathputli' string puppetry, an art form celebrated for centuries in Rajasthani oral culture:\n"
    "1. Cultural Characterization: The master puppeteer manipulates carved wooden marionettes dressed in shimmering Rajasthani costumes, using strings tied to his fingers. "
    "He uses the characteristic high-pitched squeaking reed whistle ('boli') to create the puppets' speech, while the female singer (dholak player) interprets the dialogue in local Marwari.\n"
    "2. Storyline Adaptation: Instead of traditional Rajput historical ballads, the performance stars iconic folk characters (Amar Singh Rathore and the court jester Anokhilal). "
    "Anokhilal uses hilarious comedic satire to mock village superstitions about childhood vaccines, showing how immunizing children at the Anganwadi saves them from deadly illnesses.\n"
    "3. Community Acceptance: Over 400 villagers, including mothers who had previously resisted health workers, attend the evening show, leading to record turnout at the vaccination camp."
)
P2_M17_QS = [
    case_q("Development Communication and Journalism", "Kathputli Puppetry Cultural Origin and Form",
     "To which state of India does the traditional 'Kathputli' string puppetry belong, and what material is used for the puppets?",
     "Rajasthan; puppets are carved from mango wood (kath) and dressed in vibrant fabric stuffed with cotton (putli)",
     ["Kerala; made of buffalo leather", "Odisha; made of hollow bamboo rods", "West Bengal; made of cast iron"],
     "Kathputli (kath = wood, putli = doll) is the world-renowned traditional string puppetry of the Bhatt community of Rajasthan."),
    case_q("Development Communication and Journalism", "The 'Boli' Whistle in Kathputli Performance",
     "What is the unique auditory instrument used by the master Kathputli puppeteer to produce the puppets' distinctive speech?",
     "A small bamboo and rubber reed whistle called the 'Boli', producing sharp nasal squeaks interpreted by the accompanying singer/drummer",
     ["A large brass temple bell", "An electric synthesizer keyboard", "A military bugle"],
     "The boli is a tiny reed whistle held in the puppeteer's mouth that creates the magical squeaking speech of Kathputli puppets."),
    case_q("Development Communication and Journalism", "Overcoming Vaccine Hesitancy through Folk Humor",
     "Why did using the comedic folk character Anokhilal successfully dismantle entrenched superstitious fears against vaccination?",
     "Folk humor and trusted cultural characters defuse fear and suspicion without threatening village pride, allowing people to laugh at and reconsider foolish beliefs",
     ["Because Anokhilal threatened to arrest the villagers", "Because comedy is legally required in medical treatments", "Because villagers were forced to pay to enter"],
     "Humor through beloved folk archetypes bypasses psychological defenses, allowing communities to reflect critically on harmful superstitions without offense."),
    case_q("Development Communication and Journalism", "Interpersonal Trust of Indigenous Performers",
     "Why do traditional folk puppeteers often command higher communicative trust in rural hamlets than outside government health officers?",
     "Puppeteers share the community's language, cultural traditions, and socio-economic ethos, eliminating social distance and bureaucratic alienation",
     ["Because puppeteers carry medical doctor degrees", "Because puppeteers are government police officers", "Because outside doctors refuse to speak to anyone"],
     "Indigenous folk artists share cultural identity and vernacular idioms, bridging the social distance that often alienates external officialdom."),
    case_q("Development Communication and Journalism", "Classification of Indian Puppetry Genres",
     "Which classical genre of puppetry is exemplified by Kathputli of Rajasthan and Kundhei of Odisha?",
     "String Puppetry (Marionettes)",
     ["Shadow Puppetry", "Rod Puppetry", "Glove Puppetry"],
     "Kathputli and Kundhei belong to the String Puppetry family, where articulated wooden puppets are manipulated from above by strings.")
]

# ==============================================================================
# MOCK 18 PASSAGES
# ==============================================================================
P1_M18_TXT = (
    "Read the following case study on information communication technology in agriculture and rural development and answer the questions that follow:\n\n"
    "Ramesh, a smallholder soybean farmer in Madhya Pradesh, historically sold his crop to exploitative village middleman traders (arthiyas) at depressed prices. "
    "In 2002, the agribusiness conglomerate ITC established an 'e-Choupal' internet kiosk in his village, operated by a trained local farmer (Sanchalak). "
    "The e-Choupal initiative revolutionized Ramesh's agricultural livelihood:\n"
    "1. Information Access: Ramesh checks daily real-time spot prices of soybean across regional mandis and the Chicago Board of Trade on the internet kiosk computer, "
    "alongside localized weather forecasts and scientific crop advisories.\n"
    "2. Direct Procurement: Ramesh bypasses the middlemen, driving his tractor directly to the ITC rural procurement hub (Choupal Saagar), "
    "where automated weighbridges ensure accurate electronic weighing and immediate transparent digital bank payment.\n"
    "3. Expert Advisory via Kisan Call Centre: When his soybean leaves exhibit yellow mosaic virus, Ramesh dials the national toll-free number (1800-180-1551) "
    "to receive immediate agricultural extension advice in Hindi from agricultural university scientists."
)
P1_M18_QS = [
    case_q("Development Communication and Journalism", "e-Choupal Operational Innovation",
     "How did ITC's 'e-Choupal' model empower Indian farmers against traditional mandi exploitation?",
     "By placing internet connectivity and real-time market price discovery directly in villages, eliminating middleman information asymmetry and cartelization",
     ["By giving free foreign land to Indian farmers", "By forcing farmers to stop growing food", "By replacing tractors with computer games"],
     "e-Choupal empowered farmers with transparent real-time price discovery and direct procurement, bypassing exploitative mandi middlemen."),
    case_q("Development Communication and Journalism", "Role of the Sanchalak in e-Choupal",
     "Who is the 'Sanchalak' in the e-Choupal ecosystem and why was this role designed to be a local farmer?",
     "A respected, literate local farmer trained to operate the kiosk, providing trusted peer credibility and community access to digital tools",
     ["A government police officer monitoring internet searches", "A foreign software engineer who cannot speak Hindi", "A commercial banker who charges high interest"],
     "The Sanchalak is a trusted local peer farmer, ensuring cultural acceptance, community accessibility, and bridging the rural digital divide."),
    case_q("Development Communication and Journalism", "Kisan Call Centre (KCC) Mandate and Toll-Free Access",
     "What is the operational function of the Kisan Call Centre established by the Ministry of Agriculture across India?",
     "A nationwide toll-free telephone service (1800-180-1551) providing instant, localized expert agronomic advice in 22 regional languages to farmers",
     ["A commercial travel agency booking airline tickets for farmers", "A political party election hotline", "A paid entertainment radio show"],
     "Kisan Call Centres provide 24/7 toll-free tele-advisories in 22 languages, answering farmer inquiries on crop protection, seeds, and fertilizers."),
    case_q("Development Communication and Journalism", "Information Asymmetry Elimination",
     "What economic concept explains why farmers were historically cheated by mandi traders before the advent of digital price kiosks?",
     "Information Asymmetry (traders possessed monopolistic price information while isolated farmers were kept in the dark)",
     ["Monopolistic perfect competition", "Absolute zero economic profit", "Hyper-inflation of currency"],
     "Information asymmetry enabled cartels to manipulate prices; digital kiosks democratized price transparency across the rural supply chain."),
    case_q("Development Communication and Journalism", "e-NAM (National Agriculture Market) Evolution",
     "Building upon early kiosk models, what is the revolutionary scope of the Government of India's 'e-NAM' digital platform?",
     "A pan-India electronic trading portal that networks physical APMC mandis into a unified national digital market for transparent online commodity bidding",
     ["A smartphone app for ordering fast food", "An airline booking website for international tourists", "A social media app for video sharing"],
     "e-NAM unifies isolated APMC mandis into a single national digital marketplace, enabling farmers to sell to competitive online bidders nationwide.")
]

P2_M18_TXT = (
    "Read the following public health social marketing case study and answer the questions that follow:\n\n"
    "Launched on 2 October 2014, the Swachh Bharat Mission (Grameen) represented the largest behavioral change social marketing campaign in human history, "
    "aiming to eliminate open defecation across 600,000 Indian villages. "
    "Recognizing that previous programs failed because they treated sanitation merely as a civil engineering construction problem, SBM focused intensely on Behavioral Transformation:\n"
    "1. Product: Promoting the collective social norm of 'Open Defecation Free' (ODF) village status and the dignity, safety, and health of women and children.\n"
    "2. Promotion & Triggering: Community-Led Total Sanitation (CLTS) triggering by trained rural motivators ('Swachhagrahis'). "
    "Swachhagrahis walked through village open defecation sites, demonstrating fecal-oral contamination pathways, eliciting visceral feelings of disgust and collective pride.\n"
    "3. Mass Media Reinforcement: High-voltage multimedia campaigns including the 'Darwaza Band' campaign starring Amitabh Bachchan and Vidya Balan, "
    "making toilet usage aspirational and open defecation socially embarrassing."
)
P2_M18_QS = [
    case_q("Development Communication and Journalism", "Behavioral Transformation vs Infrastructure Construction",
     "Why was Swachh Bharat Mission (Grameen) structured primarily as a social marketing behavior change campaign rather than a mere toilet construction subsidy?",
     "Because historical toilet-building schemes failed when villagers used subsidised structures for storage while continuing open defecation due to entrenched habits",
     ["Because building toilets is illegal in India", "Because villagers do not need toilets", "Because concrete was unavailable in India"],
     "Toilets remain unused unless accompanied by deep socio-behavioral transformation that converts sanitation into an internalized social norm."),
    case_q("Development Communication and Journalism", "Community-Led Total Sanitation (CLTS) Triggering",
     "What is the primary psychological mechanism utilized in CLTS triggering walks conducted by Swachhagrahis?",
     "Confronting the community with the visual reality of feces near water sources, triggering collective feelings of disgust, shame, and sudden motivation to stop open defecation",
     ["Arresting village leaders who refuse to build toilets", "Giving gold coins to everyone who builds a toilet", "Teaching classical theater acting to farmers"],
     "CLTS triggering guides communities to map their own open defecation sites, igniting collective disgust and an immediate community pledge to achieve ODF status."),
    case_q("Development Communication and Journalism", "The 'Darwaza Band' Campaign Message",
     "What was the core social marketing message communicated by the 'Darwaza Band' (Shut the Door) multi-media campaign?",
     "Urged men and elders who had toilets at home to stop defecating in the open, framing toilet use as a matter of family honor, dignity, and modern hygiene",
     ["Told people to lock their house doors at night to prevent burglary", "Told schools to shut down during summer vacation", "Told car drivers to close car doors while driving"],
     "'Darwaza Band' directly addressed rural men who owned toilets but still defecated outdoors, branding open defecation as backward and unhygienic."),
    case_q("Development Communication and Journalism", "Role of Swachhagrahis in Grassroots Diffusion",
     "Who were the 'Swachhagrahis' in the Swachh Bharat Mission operational architecture?",
     "Trained local frontline community mobilizers who spearheaded interpersonal triggering, home visits, and monitored village toilet construction and daily usage",
     ["Corporate advertising executives based in big cities", "Foreign tourists visiting rural heritage sites", "Construction contractors selling cement"],
     "Swachhagrahis acted as local foot-soldiers of behavioral change, maintaining peer monitoring ('Nigrani Samitis') until open defecation stopped completely."),
    case_q("Development Communication and Journalism", "Health and Economic Dividends of ODF Status",
     "What significant public health and economic outcomes were documented following the achievement of Open Defecation Free (ODF) village status?",
     "Dramatic reductions in infant diarrheal episodes, lowered stunting rates, decreased family medical expenditures, and enhanced physical safety for women",
     ["Double the amount of rain fell from the sky", "All village crops turned into pure gold", "Villagers never had to sleep again"],
     "UNICEF and WHO studies confirmed that ODF environments dramatically slashed childhood diarrheal mortality, stunting, and annual medical debts.")
]

# ==============================================================================
# MOCK 19 PASSAGES
# ==============================================================================
P1_M19_TXT = (
    "Read the following case study on adolescent mental health and substance abuse prevention and answer the questions that follow:\n\n"
    "An epidemiological survey across high schools in an industrial township reveals a disturbing rise in substance experimentation among adolescents (ages 14 to 18). "
    "Students report experimenting with tobacco products, vape e-cigarettes, alcohol, and prescription opioid cough syrups. "
    "Psychological interviews identify key risk factors: academic exam stress, dysfunctional family conflicts, sensation-seeking, and intense peer pressure to conform. "
    "In response, the District Administration launches a multi-pronged intervention aligned with the national 'Nasha Mukt Bharat Abhiyaan' (NMBA):\n"
    "1. Peer Educators: Training respected senior student leaders as 'Peer Educators' to conduct interactive life-skills workshops on peer pressure resistance skills.\n"
    "2. Guidance and Counseling: Setting up confidential student counseling cells in schools offering CBT-based stress management and emotional regulation training.\n"
    "3. Community Enforcement: Strict enforcement of the Cigarettes and Other Tobacco Products Act (COTPA, 2003), strictly prohibiting the sale of tobacco products "
    "within a 100-yard radius of all educational institutions."
)
P1_M19_QS = [
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Cigarettes and Other Tobacco Products Act (COTPA) 2003",
     "What strict statutory spatial prohibition does COTPA 2003 enforce around all educational institutions in India?",
     "Strictly prohibits the sale of tobacco products within a radius of 100 yards (approximately 91 meters) of any school or educational campus",
     ["Prohibits students from wearing black shoes", "Bans books from being sold near schools", "Prohibits cars from driving on school roads"],
     "Section 6(b) of COTPA 2003 legally forbids the sale of any tobacco substance within a 100-yard perimeter of educational institutions."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Peer Pressure Resistance Skills Training",
     "Why is 'Refusal Skills Training' (Assertiveness Training) an essential component of adolescent substance prevention?",
     "Equips adolescents with practical verbal techniques to say 'NO' firmly to peer pressure without feeling socially awkward or isolated",
     ["Teaches students how to physically fight their classmates", "Forces students to stop talking to all friends forever", "Teaches students how to run away from school"],
     "Assertiveness training empowers adolescents to decline drug offers confidently, resisting negative peer conformity while preserving self-esteem."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Nasha Mukt Bharat Abhiyaan (NMBA) Strategy",
     "What is the strategic operational focus of the 'Nasha Mukt Bharat Abhiyaan' spearheaded by the Ministry of Social Justice and Empowerment?",
     "A community-wide multi-stakeholder campaign mobilizing youth, women, universities, and de-addiction centers across vulnerable districts to build drug-free communities",
     ["Selling alcoholic beverages at subsidized government rates", "Building commercial casinos in rural towns", "Exempting tobacco companies from corporate taxes"],
     "NMBA focuses on community mobilization, student awareness in colleges, targeted counseling, and strengthening rehabilitation facilities across 372 vulnerable districts."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Adolescent Brain Vulnerability to Addiction",
     "Why is the adolescent brain neurologically more vulnerable to chemical addiction than the adult brain?",
     "The prefrontal cortex (responsible for executive impulse control and risk assessment) is still developing, while the limbic reward system is hyper-reactive",
     ["The adolescent brain is made of different biological cells than adult brains", "Adolescents have zero brain cells", "The adolescent brain cannot feel pain"],
     "Neurodevelopmental mismatch: the emotional/reward limbic circuitry matures years before the cognitive inhibitory prefrontal cortex, heightening addiction vulnerability."),
    case_q("Management of Support Services, Programmes for Children, Youth and Elderly", "Role of WHO Life Skills in Youth Development",
     "Which core Life Skill defined by WHO helps adolescents analyze manipulative tobacco advertising and social media vaping trends objectively?",
     "Critical Thinking and Decision Making",
     ["Passive physical obedience", "Rote memorization of dates", "Aggressive verbal hostility"],
     "Critical thinking enables youth to deconstruct media manipulation, evaluate long-term health risks, and make autonomous, life-affirming choices.")
]

P2_M19_TXT = (
    "Read the following hotel housekeeping and eco-management case study and answer the questions that follow:\n\n"
    "The 500-room luxury resort 'Eco-Haven' in Goa transitions its housekeeping operations toward sustainable Green Hospitality practices. "
    "The Executive Housekeeper implements comprehensive operational reforms:\n"
    "1. Environmental Cleaning Chemistry: Eliminating harsh, toxic, non-biodegradable chemicals; replacing them with certified eco-friendly, enzyme-based biodegradable detergents.\n"
    "2. Linen Reuse Initiative: Placing attractive, polite guest tent-cards in bathrooms: 'Save Our Planet—rehanging your towel on the rack indicates you will reuse it; "
    "placing it in the bathtub signals you desire laundering'. This initiative slashes daily laundry wash loads by 35%, conserving thousands of liters of water and energy daily.\n"
    "3. Single-Use Plastic Elimination: Replacing small plastic disposable toiletry bottles with tamper-proof, wall-mounted refillable ceramic dispensers for shampoo and shower gel.\n"
    "4. Ergonomics and Microfiber: Transitioning room attendants to color-coded microfiber mops and lightweight ergonomic carts, reducing back injuries and eliminating cross-contamination."
)
P2_M19_QS = [
    case_q("Hospitality Management", "Linen and Towel Reuse Program Ecological Impact",
     "How does the guest towel reuse program in hotel rooms deliver massive environmental and operational savings?",
     "Dramatically reduces water consumption, commercial electricity, laundry detergent effluents, and extends the physical lifespan of hotel linens",
     ["Forces hotel guests to sleep without any bedsheets", "Increases hotel laundry costs by 100%", "Causes hotel rooms to become dirty"],
     "Reusing towels reduces commercial laundry cycles, conserving enormous quantities of fresh water, thermal boiler fuel, and detergent pollution."),
    case_q("Hospitality Management", "Eliminating Single-Use Plastic Toiletries",
     "What environmental advantage is achieved by replacing miniature single-use plastic shampoo bottles with wall-mounted refillable dispensers?",
     "Eliminates thousands of discarded non-biodegradable plastic bottles daily, drastically curbing plastic landfill pollution and amenity wastage",
     ["Makes hotel showers completely waterless", "Forces guests to bring their own plumbing pipes", "Bans guests from taking showers"],
     "Bulk refillable dispensers eliminate millions of miniature plastic bottles annually, advancing institutional circular economy goals."),
    case_q("Hospitality Management", "Microfiber Cleaning Technology Superiority",
     "Why are Microfiber cleaning cloths and mops far superior to traditional cotton cleaning rags in hotel housekeeping?",
     "Microscopic wedge-shaped polyester/polyamide fibers mechanically trap microscopic dust, grease, and bacteria using static charge with minimal chemical water usage",
     ["Microfiber cloths are made of edible cotton candy", "Microfiber cloths dissolve in water after one minute", "Microfiber cloths must be ironed every hour"],
     "Microfiber's split synthetic micro-strands physically trap fine dust and 99% of surface bacteria via electrostatic attraction without chemical drenching."),
    case_q("Hospitality Management", "Biodegradable Cleaning Chemicals Benefit",
     "Why did Eco-Haven switch to certified biodegradable, non-toxic cleaning chemicals in room sanitation?",
     "Prevents discharging toxic phosphates, chlorine, and nonylphenol ethoxylates into municipal water tables, protecting aquatic ecosystems and staff health",
     ["Because biodegradable chemicals smell like sweet candy", "Because non-toxic chemicals turn all carpets bright pink", "Because toxic chemicals are free of cost"],
     "Biodegradable detergents break down into harmless organic substances, preventing environmental water pollution and occupational respiratory illness among cleaners."),
    case_q("Hospitality Management", "Color-Coded Cleaning Cloths Hygiene Principle",
     "What fundamental hygiene principle is maintained by using color-coded microfiber dusters (e.g. red for WC/toilets, yellow for sink, blue for furniture)?",
     "Prevents dangerous biological cross-contamination between highly contaminated sanitary surfaces and high-touch guest bedroom furniture",
     ["Makes the housekeeping cart look fashionable", "Helps room attendants learn foreign languages", "Color coding is required only for television cameras"],
     "Strict color demarcation guarantees that rags used to disinfect toilets and urinals are never mistakenly wiped on drinking glasses or writing desks.")
]

# ==============================================================================
# MOCK 20 PASSAGES
# ==============================================================================
P1_M20_TXT = (
    "Read the following case study on integrated community early childhood development and answer the questions that follow:\n\n"
    "In a rural block of Odisha, an upgraded Anganwadi Centre functions as a vibrant community hub under the national POSHAN Abhiyaan (National Nutrition Mission). "
    "The Anganwadi Worker (AWW), assisted by the local ASHA, delivers the six integrated services of ICDS with tech-driven efficiency:\n"
    "1. Digital Tracking: The AWW uses the 'Poshan Tracker' smartphone application to register pregnant women, track antenatal checkups, and record monthly child growth metrics.\n"
    "2. Growth Monitoring: Every month on Village Health, Sanitation and Nutrition Day (VHND), all under-five children are weighed on digital scales and measured on stadiometers. "
    "The AWW plots weight-for-age on the Mother and Child Protection (MCP) card, immediately identifying growth faltering when curves flatten.\n"
    "3. Supplementary Feeding: Distributing Take-Home Rations (THR) fortified with micronutrients, and serving hot, freshly cooked morning snacks and lunches to preschool children.\n"
    "4. Pre-school Non-Formal Education: Organizing interactive play-based learning using local clay, counting seeds, singing cultural rhymes, and storytelling."
)
P1_M20_QS = [
    case_q("Public Nutrition and Health", "Poshan Tracker Mobile Application Mandate",
     "What operational governance breakthrough is delivered by the 'Poshan Tracker' application used by Anganwadi Workers?",
     "Enables real-time digital monitoring and transparent tracking of child growth curves, supplementary nutrition delivery, and service coverage across all Anganwadis",
     ["Allows Anganwadi workers to buy private movie tickets", "Replaces doctors in performing hospital surgeries", "Tracks the speed of commercial transport trucks"],
     "Poshan Tracker digitizes maternal-child records, providing dynamic growth tracking, automated stunting/wasting alerts, and administrative transparency."),
    case_q("Public Nutrition and Health", "Significance of Flattening Growth Curve",
     "When the AWW plots a child's weight on the MCP growth chart, what does a flat (horizontal) line signify?",
     "Growth Faltering / Stagnation: the child has failed to gain weight, signaling early nutritional failure or underlying chronic illness requiring prompt intervention",
     ["The child is growing at a superior healthy rate", "The child has reached adult height and weight", "The weighing scale is broken"],
     "A horizontal growth trajectory indicates weight stagnation—the earliest clinical warning sign of nutritional failure before physical wasting appears."),
    case_q("Public Nutrition and Health", "Village Health Sanitation and Nutrition Day (VHND)",
     "How frequently is the Village Health, Sanitation and Nutrition Day (VHND) convened, and who conducts it?",
     "Once every month at the Anganwadi Centre, jointly convened by the Anganwadi Worker (AWW), ASHA, and Auxiliary Nurse Midwife (ANM)",
     ["Once every 10 years by the village head", "Daily in the evening by school teachers", "Only during national general elections"],
     "VHND is convened monthly at the Anganwadi, uniting frontline health workers (AWW, ASHA, ANM) for immunizations, checkups, and nutrition counseling."),
    case_q("Public Nutrition and Health", "ICDS Caloric and Protein Norms for Preschoolers",
     "Under statutory ICDS supplementary nutrition norms, what daily nutritional provision must be delivered to children aged 6 to 72 months?",
     "500 kcal of energy and 12 to 15 grams of protein per day",
     ["100 kcal and 1 gram of protein", "2,000 kcal and 80 grams of protein", "Zero calories (preschooling only)"],
     "Standard ICDS supplementary food for normal children (6-72 months) provides 500 calories and 12-15 grams of protein (enhanced to 800 kcal/20-25g for SAM)."),
    case_q("Public Nutrition and Health", "Six Integrated Services Package of ICDS",
     "Which six integrated services constitute the holistic developmental package delivered through the Anganwadi platform?",
     "Supplementary Nutrition, Pre-school Non-formal Education, Nutrition & Health Education, Immunization, Health Checkups, and Referral Services",
     ["Surgery, Radiotherapy, Dialysis, Organ transplant, Chemotherapy, and ICU", "Banking, Stock trading, Real estate, Commercial insurance, Mutual funds, and Auditing", "Civil engineering, Road construction, Mining, Aviation, Navigation, and Telecommunications"],
     "The six pillars of ICDS are supplementary feeding, preschooling, health education, immunization, health checkups, and referral services.")
]

P2_M20_TXT = (
    "Read the following apparel styling and optical illusion case study and answer the questions that follow:\n\n"
    "A professional fashion image consultant conducts an apparel styling workshop for corporate executives seeking to project confidence and poise. "
    "The consultant demonstrates how elements of design can be strategically deployed to create powerful optical illusions that balance different body figures:\n"
    "1. For a Short and Plump Figure: Recommending vertical unbroken lines, vertical princess seams, monochromatic low-value color schemes, "
    "deep V-necklines that elongate the neck, and flat matte fabrics while avoiding horizontal stripes and heavy tweeds.\n"
    "2. For a Pear-Shaped Figure (Narrow Shoulders, Broad Hips): Recommending wide horizontal boat (Bateau) necklines or structured padded shoulders "
    "paired with bright, patterned blouses and dark, A-line skirts that flare gently over the hips without clinging.\n"
    "3. For a Tall and Extremely Thin Figure: Recommending horizontal color blocking, wide belts, contrasting layered textures, and bold horizontal prints "
    "that visually segment vertical height and introduce soft dimensional volume."
)
P2_M20_QS = [
    case_q("Design for Fabric and Apparel", "Styling Strategy for Short and Plump Figures",
     "Why are unbroken vertical princess seams and monochromatic dark colors recommended for shorter, fuller figures?",
     "Continuous vertical lines direct the observer's gaze in an uninterrupted vertical path, while dark receding colors minimize volume, creating a taller, slimmer illusion",
     ["They make the wearer look shorter and wider", "They force the person to wear three coats simultaneously", "They make clothes glow brightly under lights"],
     "Vertical lines lead the eye upward, elongating the silhouette, while dark matte colors visually recede and slenderize."),
    case_q("Design for Fabric and Apparel", "Balancing Pear-Shaped Figures with Boat Necklines",
     "How does a wide horizontal Boat (Bateau) neckline visually balance a pear-shaped figure with wide hips?",
     "Draws visual attention horizontally across the collarbones, optically broadening narrow shoulders to create proportional harmony with wider hips",
     ["Makes the shoulders look extremely narrow", "Lengthens the neck to twice its size", "Hides the wearer's face"],
     "Horizontal neckline lines expand shoulder breadth, establishing visual equilibrium with wider lower body proportions."),
    case_q("Design for Fabric and Apparel", "Styling Principles for Tall and Thin Figures",
     "Why do horizontal color-blocked bands, wide belts, and textured fabrics flatter tall, extremely thin figures?",
     "They create horizontal visual breaks that cut continuous vertical height, while dimensional textures add visual fullness and softness",
     ["They make the person look 10 feet taller", "They turn the clothing completely black", "They make clothes weigh 50 kilograms"],
     "Horizontal lines and contrasting blocks segment vertical flow, reducing perceived height, while textured weaves add flattering bulk."),
    case_q("Design for Fabric and Apparel", "V-Neckline Elongation Mechanism",
     "What optical illusion is produced by a tailored V-neckline in dress shirts and blouses?",
     "Diagonal converging downward lines lead the gaze vertically, giving a longer, more slender appearance to the neck and jawline",
     ["Makes the neck look short and thick", "Broadens the shoulders by 5 inches", "Makes the collar completely invisible"],
     "Converging diagonal V-angles draw visual movement downward, creating an optical elongation of the cervical and facial axis."),
    case_q("Design for Fabric and Apparel", "Visual Weight of Shiny vs Matte Fabrics",
     "Why should individuals wishing to camouflage body fullness avoid shiny silk satins and clingy lycra?",
     "Shiny fabrics reflect ambient light intensely, accentuating every surface contour and visually expanding apparent body dimensions",
     ["Shiny fabrics absorb all light and turn black", "Shiny fabrics tear immediately when worn", "Shiny fabrics make the wearer invisible"],
     "Luster reflects highlights, drawing immediate focus and visually expanding volume; matte textures absorb light and slenderize.")
]

# ==============================================================================
# PASSAGES COMPILATION
# ==============================================================================
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
for idx, (p1, p2) in enumerate(PASSAGES_11_20, 11):
    assert len(p1[1]) == 5, f"Mock {idx} P1 has {len(p1[1])} questions instead of 5"
    assert len(p2[1]) == 5, f"Mock {idx} P2 has {len(p2[1])} questions instead of 5"

print(f"Home Science Passages 11 to 20 compiled successfully: {len(PASSAGES_11_20)} pairs (20 passages, 100 questions).")
