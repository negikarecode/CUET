import os
import random
from .common import make_question, get_balanced_target_keys, validate_and_save_mock

def generate_vocational_mocks():
    print(">>> Generating Vocational & Applied Mocks (PE, CS, Home Science, Mass Media, EVS, Fine Arts, Agriculture, Anthropology)...")
    
    # -------------------------------------------------------------------------
    # 1. PHYSICAL EDUCATION (Mocks 22..50 = 29 mocks)
    # -------------------------------------------------------------------------
    pe_blueprints = [
        (
            "Management of Sporting Events", "Knockout Tournament Fixture Bye Formula",
            "In a single knockout tournament with $N=11$ teams, the total number of matches played and the number of byes awarded are, respectively:",
            "10 matches and 5 byes",
            ["11 matches and 6 byes", "10 matches and 4 byes", "12 matches and 5 byes"],
            "Number of matches in a knockout tournament is $N - 1 = 11 - 1 = 10$. The next higher power of 2 is $2^4 = 16$. Number of byes = $2^n - N = 16 - 11 = 5$ byes.",
            "direct-numerical", 1
        ),
        (
            "Children and Women in Sports", "Female Athlete Triad",
            "The 'Female Athlete Triad' is a syndrome characterized by the interrelated clinical triad of:",
            "Osteoporosis, Amenorrhea, and Disordered Eating (Low Energy Availability)",
            ["Hypertension, Hyperglycemia, and Obesity",
             "Anaemia, Arthritis, and Depression",
             "Lordosis, Scoliosis, and Flat Foot"],
            "The Female Athlete Triad consists of three interrelated components: (1) Low energy availability with or without disordered eating, (2) Menstrual dysfunction (amenorrhea), and (3) Low bone mineral density (osteoporosis).",
            "conceptual", 2
        ),
        (
            "Yoga as Preventive Measure for Lifestyle Disease", "Asanas for Diabetes",
            "Which of the following yogic asanas is especially recommended for stimulating the pancreas and managing Type-2 Diabetes Mellitus?",
            "Mandukasana and Bhujangasana",
            ["Shavasana and Tadasana", "Vrikshasana and Padmasana", "Garudasana and Sukhasana"],
            "Mandukasana (Frog Pose) exerts gentle compression on the abdominal organs, stimulating the pancreas to enhance insulin secretion, making it highly effective for diabetes management.",
            "conceptual", 1
        ),
        (
            "Physical Education and Sports for CWSN", "Special Olympics vs Paralympics",
            "Special Olympics differs fundamentally from the Paralympic Games in that Special Olympics specifically caters to athletes with:",
            "Intellectual disabilities",
            ["Visual impairments exclusively", "Spinal cord amputations and physical paraplegia", "Hearing impairments (Deaflympics)"],
            "Special Olympics is the world's largest sports organization for children and adults with intellectual disabilities. The Paralympic Games focus primarily on athletes with physical and visual disabilities.",
            "conceptual", 1
        ),
        (
            "Sports and Nutrition", "Micronutrients vs Macronutrients",
            "Which of the following dietary components is classified as an essential micronutrient required in minute quantities for cellular metabolism?",
            "Minerals (Iron, Calcium, Zinc) and Vitamins (A, B, C, D, E, K)",
            ["Carbohydrates (Starch and Glycogen)",
             "Proteins (Polypeptides and Amino acids)",
             "Fats and Triglycerides"],
            "Macronutrients (carbohydrates, proteins, fats) are consumed in large quantities and supply metabolic energy. Micronutrients (vitamins and minerals) are required in minute quantities for physiological regulation and enzyme co-factor functioning.",
            "conceptual", 1
        ),
        (
            "Test and Measurement in Sports", "Rikli and Jones Senior Citizen Fitness Test",
            "In the Rikli and Jones Senior Citizen Fitness Test, the 'Chair Stand Test' is administered to assess:",
            "Lower body muscular strength and endurance",
            ["Upper body shoulder flexibility", "Aerobic cardiovascular endurance", "Motor agility and dynamic balance"],
            "The 30-Second Chair Stand Test measures lower body strength and endurance in older adults, which is critical for daily tasks like climbing stairs, standing up from chairs, and walking.",
            "conceptual", 2
        ),
        (
            "Physiology and Injuries in Sports", "Soft Tissue Injury: Sprain vs Strain",
            "In sports medicine, a 'Sprain' is clinically defined as an injury to a:",
            "Ligament (fibrous tissue connecting bone to bone)",
            ["Tendon (fibrous tissue connecting muscle to bone)",
             "Skeletal muscle belly",
             "Articular cartilage surface"],
            "A sprain is an overstretching or tearing of ligaments (bands of fibrous tissue connecting bones together). A strain is an overstretching or tearing of muscles or tendons.",
            "conceptual", 1
        ),
        (
            "Biomechanics and Sports", "Newton's Second Law of Motion in Athletics",
            "According to Newton's Second Law of Motion ($F = ma$), a javelin thrower can maximize the acceleration of the javelin by:",
            "Applying the maximum possible force in the shortest release time against the javelin's fixed mass",
            ["Releasing the javelin with zero initial horizontal velocity",
             "Increasing the aerodynamic mass of the javelin by fifty percent",
             "Throwing the javelin at a 90-degree vertical angle"],
            "Newton's second law states $a = F/m$. For a javelin of fixed mass $m$, acceleration and subsequent release velocity are directly proportional to the applied muscular force $F$ exerted by the thrower.",
            "conceptual", 1
        ),
        (
            "Psychology and Sports", "Aggression in Sports: Hostile vs Instrumental",
            "'Instrumental Aggression' in sports is distinguished from hostile aggression because its primary objective is to:",
            "Achieve a tactical sports victory or gain competitive advantage rather than inflicting bodily harm for its own sake",
            ["Inflict severe physical injury driven by anger and malice",
             "Disobey the official referee's decisions deliberately",
             "Entertain spectators through unsporting verbal banter"],
            "Hostile aggression has the primary goal of inflicting injury or psychological harm on an opponent, driven by anger. Instrumental aggression uses forceful or aggressive play as a means to achieve a competitive goal (e.g., winning the ball, tackling firmly).",
            "conceptual", 2
        ),
        (
            "Training in Sports", "Fartlek Training Method",
            "The 'Fartlek Training' method developed by Gosta Holmer in Sweden is characterized by:",
            "Continuous running where the athlete varies the pace and intensity based on natural terrain (speed play)",
            ["High-intensity weight lifting with fixed 5-minute rest intervals",
             "Underwater sprint swimming with artificial oxygen tanks",
             "Isokinetic dynamometer contractions at constant angular velocity"],
            "Fartlek is a Swedish term meaning 'speed play'. It blends continuous running with varied interval bursts of sprinting, jogging, and walking over varied natural terrain (forests, hills, beaches), training both aerobic and anaerobic systems.",
            "conceptual", 1
        )
    ]

    pe_sub, pe_folder, pe_pref = 'physical_education', 'physical_education', 'PHYSICAL_EDU'
    for m in range(22, 51):
        target_keys = get_balanced_target_keys(seed=2200 + m, count=50)
        rng = random.Random(f"PE_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = pe_blueprints[(q_idx - 1) % len(pe_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                pe_sub, pe_folder, pe_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(pe_sub, pe_folder, pe_pref, m, questions)
        print(f"  [Physical Education] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 2. COMPUTER SCIENCE (Mocks 22..50 = 29 mocks)
    # -------------------------------------------------------------------------
    cs_blueprints = [
        (
            "Computer Networks", "Network Topologies: Star Topology",
            "In a Star network topology, all client workstation nodes are connected directly to:",
            "A central network hub, switch, or router",
            ["A single shared linear backbone coaxial bus cable",
             "Each other in a closed unidirectional circular ring",
             "Every single other node via dedicated point-to-point links (full mesh)"],
            "In star topology, all devices are connected to a central device (hub/switch) via point-to-point cables. Failure of one cable affects only that node; failure of the central switch disables the entire network.",
            "conceptual", 1
        ),
        (
            "Computer Networks", "TCP/IP vs OSI Protocol Stack",
            "Which layer of the OSI 7-layer reference model is responsible for logical IP addressing and end-to-end routing of data packets across heterogeneous networks?",
            "Network Layer (Layer 3)",
            ["Data Link Layer (Layer 2)", "Transport Layer (Layer 4)", "Physical Layer (Layer 1)"],
            "The Network layer (Layer 3) handles host-to-host logical addressing (IP addresses), packetization, path determination, and routing across multiple intermediate networks.",
            "conceptual", 1
        ),
        (
            "Data Structures: Stacks", "Stack LIFO Principle and Operations",
            "A Stack data structure operates on which fundamental sequencing principle?",
            "LIFO (Last In First Out)",
            ["FIFO (First In First Out)", "Priority Queue order", "Random Access File order"],
            "A Stack is a linear data structure following the LIFO (Last In, First Out) principle, where insertions (Push) and deletions (Pop) take place at the same end called the Top of the stack.",
            "conceptual", 1
        ),
        (
            "Data Structures: Stacks", "Infix to Postfix Conversion",
            "The postfix (Reverse Polish Notation) equivalent of the infix arithmetic expression `(A + B) * C` is:",
            "A B + C *",
            ["A B C + *", "* + A B C", "A + B C *"],
            "Evaluating with operator precedence: inner parentheses `(A + B)` becomes `AB+`. Multiplying by `C` yields `AB+ C *`.",
            "direct-numerical", 2
        ),
        (
            "Cyber Security, Cyber Crime and IT Law", "Phishing Attack Mechanism",
            "In cybersecurity, 'Phishing' is defined as a fraudulent social engineering technique where an attacker:",
            "Masquerades as a reputable entity (like a bank) via deceptive emails to steal confidential passwords and credentials",
            ["Floods a network server with millions of illegitimate requests to exhaust bandwidth (DoS)",
             "Infects a physical USB drive with self-replicating boot sector viruses",
             "Intercepts encrypted radio satellite telemetry signals"],
            "Phishing is a cyber attack that uses deceptive emails, websites, or messages masquerading as trusted institutions to trick individuals into disclosing sensitive personal information (usernames, passwords, credit card numbers).",
            "conceptual", 1
        ),
        (
            "Cyber Security, Cyber Crime and IT Law", "Information Technology Act 2000 Section 66D",
            "Under the Information Technology (IT) Act, 2000 of India, Section 66D prescribes punishment for:",
            "Cheating by personation through using any computer resource",
            ["Publishing obscenity in electronic form", "Identity theft without financial damage", "Hacking critical infrastructure systems"],
            "Section 66D of the IT Act penalizes cheating by personation using computer resources or communication devices, with imprisonment for up to 3 years and a fine of up to Rs. 1 lakh.",
            "conceptual", 2
        ),
        (
            "Data Handling using Pandas - I (Series and DataFrame Architecture)", "Pandas DataFrame Indexing with loc vs iloc",
            "In Python Pandas library, the fundamental operational difference between `df.loc[]` and `df.iloc[]` is that:",
            "`df.loc[]` is label-based indexing, whereas `df.iloc[]` is integer position-based indexing",
            ["`df.loc[]` can only modify integer columns, while `df.iloc[]` only modifies string columns",
             "`df.loc[]` deletes rows permanently, while `df.iloc[]` creates a shallow copy",
             "`df.loc[]` operates on NumPy arrays exclusively, while `df.iloc[]` operates on dictionaries"],
            "In Pandas: `.loc[]` selects data using row and column labels/names (e.g., `df.loc['row1', 'ColA']`). `.iloc[]` selects data based on integer zero-based positional coordinates (e.g., `df.iloc[0, 1]`).",
            "conceptual", 2
        ),
        (
            "Data Handling using Pandas - II (DataFrames, Operations and Analysis)", "SQL vs Pandas Query Equivalence",
            "In Pandas, the operation equivalent to the SQL query `SELECT * FROM students WHERE marks >= 90;` is:",
            "students[students['marks'] >= 90]",
            ["students.select('marks >= 90')", "students.filter(where='marks >= 90')", "students.where(marks >= 90)"],
            "Boolean indexing in Pandas allows filtering DataFrames using conditional statements on Series columns: `df[df['column_name'] >= value]`.",
            "conceptual", 1
        ),
        (
            "Database Concepts", "Relational Model: Candidate Key vs Primary Key",
            "In the Relational Database Model, a 'Candidate Key' is defined as:",
            "A minimal superkey that has the potential to uniquely identify each tuple in a relation",
            ["Any column that allows NULL values throughout the table",
             "A foreign key pointing to an external non-relational database",
             "A composite attribute containing only floating-point values"],
            "A candidate key is a minimal set of attributes that uniquely identifies tuples in a relation. The database designer selects one candidate key as the Primary Key, and the remaining candidate keys become Alternate Keys.",
            "conceptual", 1
        ),
        (
            "Structured Query Language (SQL)", "SQL Aggregate Functions and GROUP BY",
            "In SQL, to filter and restrict groups of records created by the `GROUP BY` clause, one must use the:",
            "HAVING clause",
            ["WHERE clause", "ORDER BY clause", "DISTINCT clause"],
            "The WHERE clause filters individual rows before grouping, whereas the HAVING clause filters groups formed by the GROUP BY clause based on aggregate function criteria.",
            "conceptual", 1
        ),
        (
            "File Handling in Python", "File Modes: 'w' vs 'a'",
            "When opening a text file in Python using `open('data.txt', 'a')`, the mode `'a'` specifies that:",
            "The file is opened for appending, and new data will be written at the end of the file without truncating existing content",
            ["The file is overwritten and all existing content is permanently erased immediately",
             "The file is opened for read-only access with binary decoding",
             "The file is locked in memory preventing other users from reading it"],
            "In Python: mode `'w'` truncates (erases) existing file contents before writing, while mode `'a'` (append) places the file pointer at the end of the file, preserving existing data.",
            "conceptual", 1
        )
    ]

    cs_sub, cs_folder, cs_pref = 'computer_science', 'computer_science', 'COMPUTER_SCI'
    for m in range(22, 51):
        target_keys = get_balanced_target_keys(seed=2200 + m, count=50)
        rng = random.Random(f"CS_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = cs_blueprints[(q_idx - 1) % len(cs_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                cs_sub, cs_folder, cs_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(cs_sub, cs_folder, cs_pref, m, questions)
        print(f"  [Computer Science] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 3. HOME SCIENCE (Mocks 23..50 = 28 mocks)
    # -------------------------------------------------------------------------
    hs_blueprints = [
        (
            "Clinical Nutrition and Dietetics", "Therapeutic Diet for Hypertension (DASH Diet)",
            "The dietary approach recommended in clinical nutrition for managing hypertension (DASH diet) emphasizes:",
            "High potassium, calcium, magnesium, and dietary fiber with restricted sodium intake",
            ["High saturated animal fats and refined table sugar with zero dietary fiber",
             "High sodium chloride intake with complete restriction of green vegetables",
             "Exclusive consumption of red processed meats without water"],
            "The DASH (Dietary Approaches to Stop Hypertension) diet emphasizes fruits, vegetables, whole grains, poultry, fish, and nuts, reducing sodium, red meats, sweets, and saturated fats to lower blood pressure.",
            "conceptual", 1
        ),
        (
            "Public Nutrition and Health", "Nutritional Deficiency: Kwashiorkor vs Marasmus",
            "In pediatric clinical assessment, Kwashiorkor is clinically distinguished from Marasmus by the prominent presence of:",
            "Oedema (fluid accumulation in legs and face) and enlarged fatty liver with adequate calorie intake but acute protein deficiency",
            ["Severe muscle wasting and subcutaneous fat depletion without oedema (skin and bone appearance)",
             "Vitamin C scurvy bleeding gums exclusively",
             "Excessive subcutaneous adipose tissue and childhood obesity"],
            "Kwashiorkor is caused by acute protein deficiency despite sufficient caloric intake, leading to generalized oedema, enlarged fatty liver, lethargy, and a 'moon face'. Marasmus is total protein-energy malnutrition characterized by severe wasting without oedema.",
            "conceptual", 2
        ),
        (
            "Food Processing and Technology", "Pasteurization of Milk (HTST Method)",
            "In industrial dairy technology, High-Temperature Short-Time (HTST) pasteurization of milk involves heating milk to:",
            "71.7°C (approx 72°C) for at least 15 seconds, followed by rapid cooling to below 4°C",
            ["100°C for two hours under boiling pressure",
             "63°C for fifteen seconds followed by storage at room temperature",
             "140°C for twenty minutes continuously"],
            "HTST pasteurization heats milk to $71.7^\\circ\\text{C}$ ($161^\\circ\\text{F}$) for 15 seconds, which destroys pathogenic vegetative microorganisms (e.g., Mycobacterium tuberculosis, Coxiella burnetii) without impairing milk flavor.",
            "conceptual", 1
        ),
        (
            "Early Childhood Care and Education", "Piaget's Preoperational Cognitive Stage",
            "According to Jean Piaget's stages of cognitive development, children aged 2 to 7 years in the 'Preoperational Stage' exhibit:",
            "Egocentrism, animism, and lack of conservation (inability to understand that quantity remains invariant despite perceptual changes)",
            ["Abstract propositional logic and hypothetico-deductive reasoning",
             "Mastery of reversible mathematical conservation operations",
             "Coordination of sensory motor reflexes with zero symbolic language"],
            "In Piaget's preoperational stage (2-7 years), symbolic play and language expand rapidly, but children's thinking remains egocentric (inability to see others' perspectives) and lacks conservation of volume, mass, and number.",
            "conceptual", 2
        ),
        (
            "Care and Maintenance of Fabrics in Institutions", "Stain Removal: Protein Stains",
            "When removing protein-based stains (such as blood or egg) from fabrics, one should strictly avoid using hot water because:",
            "Hot water coagulates the protein, setting the stain permanently into the fabric fibers",
            ["Hot water bleaches synthetic dyes instantly",
             "Protein stains dissolve only in boiling concentrated sulphuric acid",
             "Hot water transforms the protein into insoluble cellulose wax"],
            "Protein coagulates when heated. Washing blood or egg stains with hot water 'cooks' the protein into the yarns, fixing it permanently. Protein stains must always be treated first with cold or lukewarm water and mild enzymatic detergent.",
            "conceptual", 1
        ),
        (
            "Consumer Education and Protection", "Standardization Marks in India: AGMARK",
            "In India, the 'AGMARK' certification mark issued by the Directorate of Marketing and Inspection is mandatory for certifying the quality of:",
            "Agricultural food products and commodities (such as ghee, honey, butter, and spices)",
            ["Industrial manufactured electronics and household electrical appliances (ISI)",
             "Gold and precious silver jewellery items (Hallmark)",
             "Processed fruit juices, jams, and pickles (FPO/FSSAI)"],
            "AGMARK is a certification mark for agricultural products in India, assuring conformity to a set of standards approved by the Directorate of Marketing and Inspection (DMI).",
            "conceptual", 1
        ),
        (
            "Design for Fabric and Apparel", "Elements of Design: Optical Illusion Lines",
            "In apparel design, using prominent vertical lines in a garment visually creates the optical impression of:",
            "Increased height and a slimmer, elongated silhouette",
            ["Increased width and a shorter, broader appearance",
             "Unequal asymmetrical body distortion",
             "Rotating circular motion"],
            "Vertical lines lead the viewer's eye up and down, creating an illusion of added height and slender proportions. Horizontal lines draw the eye across, emphasizing width.",
            "conceptual", 1
        ),
        (
            "Development Communication and Journalism", "Community Radio Features",
            "A key defining characteristic of 'Community Radio' stations in rural development communication is that they:",
            "Are owned, managed, and programmed by and for the local community to address local grassroots issues in local dialects",
            ["Broadcast high-cost commercial advertisements for foreign multinational corporations",
             "Operate nationwide high-power satellite relays across all Indian states",
             "Are owned exclusively by private commercial media conglomerates"],
            "Community radio is a third tier of radio broadcasting (alongside public and commercial radio). It is low-power, non-profit, operated by local community groups or educational institutions, broadcasting content relevant to local farming, health, and development needs.",
            "conceptual", 1
        )
    ]

    hs_sub, hs_folder, hs_pref = 'home_science', 'home_science', 'HOME_SCIENCE'
    for m in range(23, 51):
        target_keys = get_balanced_target_keys(seed=2300 + m, count=50)
        rng = random.Random(f"HS_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = hs_blueprints[(q_idx - 1) % len(hs_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                hs_sub, hs_folder, hs_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(hs_sub, hs_folder, hs_pref, m, questions)
        print(f"  [Home Science] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 4. MASS MEDIA (Mocks 22..50 = 29 mocks)
    # -------------------------------------------------------------------------
    mm_blueprints = [
        (
            "Communication", "Shannon and Weaver Mathematical Model",
            "In Claude Shannon and Warren Weaver's Mathematical Model of Communication (1949), 'Noise' is defined as:",
            "Any extraneous interference or distortion in the transmission channel that degrades signal fidelity",
            ["The volume of spoken audio from the broadcast announcer",
             "The financial price of advertising slots on television",
             "The legal censorship applied by state broadcasting authorities"],
            "In Shannon and Weaver's model, noise refers to static, electrical interference, or acoustic disturbance in the channel between transmitter and receiver that alters or degrades the transmitted message.",
            "conceptual", 1
        ),
        (
            "Cinema History", "First Indian Indigenous Feature Film: Raja Harishchandra",
            "The landmark silent film 'Raja Harishchandra', recognized as the first full-length indigenous Indian feature film, was directed and produced in 1913 by:",
            "Dadasaheb Phalke (Dhundiraj Govind Phalke)",
            ["Satyajit Ray", "V. Shantaram", "Ardeshir Irani"],
            "Dadasaheb Phalke is celebrated as the Father of Indian Cinema. He wrote, directed, and produced 'Raja Harishchandra' (released on 3 May 1913 at Coronation Cinematograph in Bombay), founding the Indian film industry.",
            "conceptual", 1
        ),
        (
            "Advertising Fundamentals", "AIDA Model in Advertising",
            "The classic 'AIDA' marketing hierarchy of effects model outlines the stages a promotional advertisement must evoke in a consumer:",
            "Attention -> Interest -> Desire -> Action",
            ["Awareness -> Identification -> Discount -> Acquisition",
             "Appeal -> Inspiration -> Decision -> Assessment",
             "Attraction -> Investment -> Delivery -> Agreement"],
            "The AIDA model developed by E. St. Elmo Lewis outlines the four cognitive stages: attract Attention, maintain Interest, create Desire, and stimulate consumer Action (purchase).",
            "conceptual", 1
        ),
        (
            "Audience Theories", "Hypodermic Needle (Magic Bullet) Theory",
            "The 'Hypodermic Needle' or 'Magic Bullet' theory of media effects posited that mass media messages:",
            "Are injected directly into the minds of a passive audience, exerting immediate, uniform, and powerful behavioral influence",
            ["Are actively interpreted and resisted by media consumers based on cultural background",
             "Have zero measurable psychological impact on human perception",
             "Flow strictly through two-step opinion leaders before reaching the general public"],
            "Developed in the 1930s (following mass propaganda in WWI), the hypodermic needle model assumed the public was a passive, vulnerable audience directly and uniformly influenced by powerful media messages.",
            "conceptual", 2
        ),
        (
            "Advertising Regulation", "ASCI Regulatory Function",
            "The Advertising Standards Council of India (ASCI) functions as a self-regulatory voluntary organization with the mandate to:",
            "Ensure that advertisements conform to honesty, truthfulness, decency, and fair competition without misleading claims",
            ["Set mandatory minimum advertising tariffs for commercial television stations",
             "Impose criminal imprisonment on uncooperative graphic designers",
             "Censor political campaign broadcasts on behalf of the ruling party"],
            "ASCI (established in 1985) is a self-regulatory body committed to ensuring that advertisements in India are truthful, not offensive, fair to competitors, and safe for consumers.",
            "conceptual", 1
        ),
        (
            "Television and Radio Broadcasting", "Prasar Bharati Public Broadcaster",
            "Prasar Bharati, established under the Prasar Bharati Act 1990, is India's autonomous public service broadcaster comprising:",
            "Doordarshan (television) and All India Radio (Akashvani)",
            ["Press Trust of India and United News of India",
             "Central Board of Film Certification and NFDC",
             "Internet Service Providers Association of India"],
            "Prasar Bharati is the statutory autonomous body established in 1997 comprising All India Radio (AIR) and Doordarshan (DD) to provide balanced, comprehensive public broadcasting.",
            "conceptual", 1
        ),
        (
            "Digital Media and New Media Technologies", "Citizen Journalism Meaning",
            "The concept of 'Citizen Journalism' in modern digital mass media refers to:",
            "Public citizens playing an active role in collecting, reporting, analyzing, and disseminating news via social media and blogs",
            ["Accredited state journalists reporting from parliament",
             "Commercial corporate executives writing sponsored PR articles",
             "Government censors fact-checking international news cables"],
            "Citizen journalism (participatory journalism) involves ordinary citizens capturing video, eyewitness reporting, and sharing news online through smartphones, blogs, and social platforms.",
            "conceptual", 1
        ),
        (
            "Media Literacy", "Media Framing Theory",
            "In media literacy and communications analysis, 'Media Framing' refers to:",
            "How media outlets package, emphasize, and present information to construct a particular interpretation of reality",
            ["The physical wooden picture frame surrounding a television monitor",
             "The technical resolution and frame rate of a video camera",
             "The legal copyright ownership of a published newspaper column"],
            "Framing theory (Robert Entman) explores how media emphasizes certain aspects of an issue (selection, emphasis, exclusion) to promote a particular problem definition, causal interpretation, or moral evaluation.",
            "conceptual", 2
        )
    ]

    mm_sub, mm_folder, mm_pref = 'mass_media', 'mass_media', 'MASS_MEDIA'
    for m in range(22, 51):
        target_keys = get_balanced_target_keys(seed=2200 + m, count=50)
        rng = random.Random(f"MM_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = mm_blueprints[(q_idx - 1) % len(mm_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                mm_sub, mm_folder, mm_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(mm_sub, mm_folder, mm_pref, m, questions)
        print(f"  [Mass Media] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 5. ENVIRONMENTAL STUDIES (Mocks 23..50 = 28 mocks)
    # -------------------------------------------------------------------------
    evs_blueprints = [
        (
            "Biodiversity and Conservation", "Mega-Biodiversity Hotspots in India",
            "Which of the following geographical regions in India is recognized internationally as one of the world's 36 global biodiversity hotspots?",
            "Western Ghats and Indo-Burma / Eastern Himalayas",
            ["Thar Desert and Rann of Kutch", "Indo-Gangetic Plain", "Deccan Traps Black Soil Plateau"],
            "Four global biodiversity hotspots extend into India: (1) The Western Ghats and Sri Lanka, (2) The Himalayas, (3) Indo-Burma (Northeastern India), and (4) Sundaland (including Nicobar Islands).",
            "conceptual", 1
        ),
        (
            "Monitoring the Environment and Pollution", "Biochemical Oxygen Demand (BOD)",
            "High Biochemical Oxygen Demand (BOD) in a freshwater river ecosystem indicates that the water body is:",
            "Heavily polluted with organic waste, causing aerobic bacteria to deplete dissolved oxygen",
            ["Completely sterile with zero microbial populations",
             "Saturated with high levels of dissolved atmospheric oxygen suitable for trout",
             "Contaminated exclusively with insoluble non-biodegradable plastic polymers"],
            "BOD measures the amount of dissolved oxygen consumed by aerobic microorganisms to decompose organic matter present in a water sample. A higher BOD indicates higher organic sewage pollution and severe oxygen depletion.",
            "conceptual", 1
        ),
        (
            "International Environmental Treaties and Indian Policy", "Montreal Protocol on Ozone Depletion",
            "The historic Montreal Protocol (signed in September 1987) is an international treaty designed to protect the ozone layer by:",
            "Phasing out the production and consumption of chlorofluorocarbons (CFCs) and halons",
            ["Imposing international carbon emission trading quotas on coal power stations",
             "Banning commercial whaling in Antarctic waters",
             "Regulating cross-border trade in genetically modified agricultural seeds"],
            "The Montreal Protocol on Substances that Deplete the Ozone Layer (1987) is widely hailed as the most successful international environmental treaty, successfully phasing out CFCs and ozone-depleting halogenated hydrocarbons.",
            "conceptual", 1
        ),
        (
            "Population Ecology", "Bioaccumulation vs Biomagnification",
            "'Biomagnification' (biological magnification) is the ecological process whereby:",
            "The concentration of a toxic, non-biodegradable substance (like DDT or mercury) increases progressively at each successive trophic level",
            ["An individual organism absorbs chemicals faster than its metabolic excretory rate",
             "Nutrient enrichment triggers explosive growth of blue-green cyanobacteria",
             "Solar ultraviolet radiation breaks down plastic debris in ocean gyres"],
            "Biomagnification refers to the increase in concentration of a persistent toxicant at successively higher trophic levels of a food chain (e.g., DDT concentration rising from water to zooplankton to fish to fish-eating birds, causing eggshell thinning).",
            "conceptual", 2
        ),
        (
            "Environmental and Natural Resource Economics", "Tragedy of the Commons",
            "The 'Tragedy of the Commons' concept popularized by Garrett Hardin in 1968 demonstrates that:",
            "Individual users acting independently and rationally according to self-interest deplete shared, open-access resources, harming common welfare",
            ["Private market ownership leads to rapid resource preservation",
             "Agricultural productivity doubles when common pastures are unregulated",
             "Renewable solar energy can never experience technological obsolescence"],
            "Hardin's Tragedy of the Commons shows that when a resource is shared, open-access, and rival (like oceans, atmosphere, or common pastures), individual self-interest leads to over-exploitation and eventual collapse of the resource for all.",
            "conceptual", 2
        ),
        (
            "Human Beings and Nature", "Chipko Movement and Forest Conservation",
            "The historic grassroots 'Chipko Movement' originated in the 1970s in the Garhwal Himalayas (Uttarakhand) primarily as:",
            "A non-violent environmental movement where local villagers hugged trees to prevent commercial timber logging",
            ["An armed tribal revolt against municipal river dam building",
             "A religious pilgrimage demanding state funding for hill temples",
             "A commercial campaign promoting monoculture eucalyptus plantations"],
            "The Chipko Movement (started in 1973 in Chamoli district by local women under leaders like Sunderlal Bahuguna and Chandi Prasad Bhatt) involved villagers clinging to trees to prevent commercial loggers from felling forests, championing community forest rights.",
            "conceptual", 1
        ),
        (
            "Monitoring the Environment and Pollution", "Photochemical Smog Composition",
            "Photochemical smog (summer smog) is formed in sunny urban atmospheres through the photochemical reaction of sunlight with:",
            "Nitrogen oxides (NO_x) and Volatile Organic Compounds (VOCs), producing ozone (O_3) and peroxyacetyl nitrate (PAN)",
            ["Sulphur dioxide (SO_2) and damp coal smoke fog (London classical smog)",
             "Carbon dioxide (CO_2) and pure water vapor exclusively",
             "Methane gas and pure hydrogen sulfide"],
            "Photochemical smog is an oxidizing smog formed by solar UV-driven reactions between nitrogen oxides ($NO_x$) and unburnt hydrocarbons/VOCs from vehicle exhaust, generating ozone ($O_3$), formaldehyde, and peroxyacetyl nitrate (PAN).",
            "conceptual", 2
        )
    ]

    evs_sub, evs_folder, evs_pref = 'environmental_studies', 'environmental_studies', 'ENVIRONMENTA'
    for m in range(23, 51):
        target_keys = get_balanced_target_keys(seed=2300 + m, count=50)
        rng = random.Random(f"EVS_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = evs_blueprints[(q_idx - 1) % len(evs_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                evs_sub, evs_folder, evs_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(evs_sub, evs_folder, evs_pref, m, questions)
        print(f"  [Environmental Studies] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 6. FINE ARTS (Mocks 22..50 = 29 mocks)
    # -------------------------------------------------------------------------
    fa_blueprints = [
        (
            "The Rajasthani and Pahari Miniature Painting", "Nihal Chand and Radha of Kishangarh (Bani Thani)",
            "The iconic Rajasthani miniature painting 'Bani Thani' (often hailed as the Indian Mona Lisa), created during the reign of Raja Savant Singh of Kishangarh, was painted by master artist:",
            "Nihal Chand",
            ["Nainsukh", "Manaku", "Sahibdin"],
            "Bani Thani is the masterpiece of the Kishangarh school of Rajasthani painting, painted by Nihal Chand in the mid-18th century. It depicts Radha with elongated lotus eyes, arched eyebrows, sharp nose, and transparent odhni (veil).",
            "conceptual", 1
        ),
        (
            "The Deccani School of Miniature Painting", "Golconda and Bijapur Miniature Style",
            "The Deccani school of miniature painting (flourishing in Bijapur, Golconda, and Ahmadnagar) is renowned for:",
            "Rich jewel-like luminous colours, extensive use of gold leaf, and Persian-Ottoman poetic stylistic elegance",
            ["Monochromatic black-and-white ink sketches exclusively",
             "Strict adherence to Buddhist Ajanta fresco iconography without colour",
             "Rough folk terracotta engravings without gold"],
            "Deccani painting integrated indigenous Indian traditions with Persian, Turkish, and European influences, characterized by sensuous figures, lavish use of gold, lush exotic flora, and refined decorative borders.",
            "conceptual", 2
        ),
        (
            "The Bengal School of Painting", "Abanindranath Tagore: Bharat Mata (1905)",
            "The iconic painting 'Bharat Mata' (1905), depicting Mother India as a four-armed ascetic goddess holding Vedic manuscripts, white cloth, sheaf of paddy, and rudraksha japa-mala, was painted by:",
            "Abanindranath Tagore",
            ["Raja Ravi Varma", "Nandalal Bose", "Jamini Roy"],
            "Abanindranath Tagore painted 'Bharat Mata' during the Swadeshi movement (1905). The four objects in her hands symbolize the four essential gifts of the motherland: Shiksha (learning), Vastra (clothing), Anna (food), and Diksha (spiritual wisdom).",
            "conceptual", 1
        ),
        (
            "Modern Trends in Indian Art: Paintings", "Amrita Sher-Gil: Artistic Synthesis",
            "The pioneering modern Indian artist Amrita Sher-Gil created a revolutionary artistic aesthetic by:",
            "Synthesizing European post-impressionist techniques with traditional Indian miniature colours and compassionate depictions of rural Indian life",
            ["Imitating classical Italian Renaissance church frescoes without Indian themes",
             "Painting purely non-representational geometrical cubism in Paris",
             "Rejecting all human figures in favour of photographic landscape lithographs"],
            "Amrita Sher-Gil (1913-1941) blended Western academic and post-impressionist painterly techniques with deep emotional empathy for the impoverished villagers, women, and classical colors of India ('Three Girls', 'Bride's Toilet', 'Brahmacharis').",
            "conceptual", 2
        ),
        (
            "The Evolution of the Indian National Flag", "Pingali Venkayya Flag Design",
            "The initial design of the Indian National Flag presented to Mahatma Gandhi at the Vijayawada session of the Indian National Congress (1921) was created by:",
            "Pingali Venkayya",
            ["Rabindranath Tagore", "Madam Bhikaji Cama", "Sarojini Naidu"],
            "Pingali Venkayya from Andhra Pradesh designed the basic tricolour flag in 1921. Originally featuring red and green bands (symbolizing Hindu and Muslim communities) with a spinning wheel (charkha), Gandhi later added white to represent all other religious communities.",
            "conceptual", 1
        ),
        (
            "Modern Trends in Indian Art: Sculptures", "Ramkinkar Baij: Santhal Family (1938)",
            "The monumental modern Indian open-air cement-concrete sculpture 'Santhal Family' (1938) located at Santiniketan was sculpted by:",
            "Ramkinkar Baij",
            ["D.P. Roy Choudhury", "Prodosh Das Gupta", "Sankho Chaudhuri"],
            "Ramkinkar Baij, one of the pioneers of modern Indian sculpture, sculpted the 'Santhal Family' using local cement, river pebbles, and laterite gravel, portraying tribal laborers migrating with their dog and belongings with monumental vitality.",
            "conceptual", 2
        ),
        (
            "Modern Trends in Indian Art: Graphic Prints", "Somnath Hore: Wounds Series",
            "The celebrated modernist printmaker Somnath Hore created his acclaimed 'Wounds' series of white-on-white paper pulp prints to express:",
            "The raw visceral agony, human suffering, and trauma of peasant famines and political conflict",
            ["Celebration of royal coronation ceremonies",
             "Architectural floorplans of Mughal mausoleums",
             "Decorative ornamental floral motifs for commercial wallpapers"],
            "Somnath Hore (1921-2006) developed an innovative paper pulp casting method without pigments ('Wounds') where gashes and indentations in the white paper symbolized the physical and emotional scars of war, famine, and social injustice.",
            "conceptual", 2
        ),
        (
            "The Rajasthani and Pahari Miniature Painting", "Basohli School of Painting",
            "The Basohli school of Pahari miniature painting is visually distinguished by:",
            "Vibrant hot monochrome background colours, fierce expressive almond-shaped eyes, and beetle-wing fragments for emerald jewellery",
            ["Muted dull grey pastel shades with zero ornamentation",
             "Photographic perspective drawing under Dutch optical lens influence",
             "Linear geometric charcoal cross-hatching"],
            "Basohli was the earliest centre of Pahari painting, known for bold, intense colors (warm yellow, deep red), passionate facial profiles with large expressive eyes, and the unique use of shiny green beetle-wing cases to simulate emerald jewelry.",
            "conceptual", 2
        )
    ]

    fa_sub, fa_folder, fa_pref = 'fine_arts', 'fine_arts', 'FINE_ARTS'
    for m in range(22, 51):
        target_keys = get_balanced_target_keys(seed=2200 + m, count=50)
        rng = random.Random(f"FA_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = fa_blueprints[(q_idx - 1) % len(fa_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                fa_sub, fa_folder, fa_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(fa_sub, fa_folder, fa_pref, m, questions)
        print(f"  [Fine Arts] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 7. AGRICULTURE (Mocks 22..50 = 29 mocks)
    # -------------------------------------------------------------------------
    agr_blueprints = [
        (
            "Agronomy of Major Cereal Crops", "Rice Cultivation Water Management",
            "In wetland puddle rice (paddy) cultivation, maintaining a continuous shallow standing water depth of 2 to 5 cm during the critical tillering stage is beneficial because it:",
            "Suppresses weed germination and maintains uniform soil microclimate",
            ["Accelerates soil erosion and nutrient leaching",
             "Eliminates the need for nitrogen fertilizers completely",
             "Induces floral sterility and fungal blight"],
            "Puddling and maintaining a 2-5 cm water layer in rice fields creates anaerobic conditions that suppress weed seed germination and reduce deep percolation, conserving soil moisture during vegetative tillering.",
            "conceptual", 1
        ),
        (
            "Agrometeorology and Climate Change", "Greenhouse Gases in Agriculture: Methane",
            "In agricultural emissions, anaerobic decomposition of organic matter in flooded paddy soils and enteric fermentation in ruminant livestock are major sources of:",
            "Methane (CH_4)",
            ["Chlorofluorocarbons (CFCs)", "Sulfur hexafluoride (SF_6)", "Lead tetraethyl vapors"],
            "Methanogenic archaea in the anaerobic zone of flooded rice paddies and the rumen of cattle decompose cellulose, releasing methane ($CH_4$), a potent greenhouse gas with 28 times the global warming potential of $CO_2$.",
            "conceptual", 1
        ),
        (
            "Genetics and Plant Breeding", "Heterosis (Hybrid Vigour) Exploitation",
            "In plant breeding, 'Heterosis' or hybrid vigour refers to the genetic phenomenon where:",
            "The F_1 hybrid offspring exhibits superior phenotypic performance, yield, and vigor compared to both inbred parental lines",
            ["Continuous self-pollination leads to progressive reduction in biological fitness",
             "A diploid plant spontaneously doubles its chromosome number into a tetraploid",
             "A mutated recessive gene completely replaces all dominant alleles in the genome"],
            "Heterosis is the phenotypic superiority of heterozygous $F_1$ hybrids over both homozygous inbred parents with respect to biomass, grain yield, disease resistance, and environmental stress tolerance.",
            "conceptual", 1
        ),
        (
            "Biochemistry and Microbiology", "Rhizobium-Legume Symbiotic Nitrogen Fixation",
            "In legume root nodules, the red/pink pigment 'Leghemoglobin' plays an indispensable biological role by:",
            "Scavenging oxygen to protect the oxygen-sensitive Nitrogenase enzyme while providing oxygen for bacterial respiration",
            ["Synthesizing starch polymers from atmospheric carbon dioxide",
             "Absorbing blue light photons for root photosynthesis",
             "Transporting nitrogen gas directly into the phloem vessels"],
            "Nitrogenase, the enzyme catalyzing $N_2$ reduction to $NH_3$, is irreversibly inactivated by molecular oxygen. Leghemoglobin acts as an oxygen buffer, maintaining low free $O_2$ levels while delivering sufficient $O_2$ for bacteroid cellular respiration.",
            "conceptual", 2
        ),
        (
            "Breeds of Livestock and Poultry", "Indigenous Dairy Cattle Breeds: Sahiwal",
            "Which of the following indigenous zebu cattle breeds (Bos indicus) is recognized as the highest milk-producing dairy breed in India?",
            "Sahiwal (originating from Montgomery district)",
            ["Amritmahal", "Kangayam", "Hallikar"],
            "Sahiwal (native to the dry Punjab-Montgomery region) is the premier indigenous dairy breed of India, known for high milk yield (2,000-2,500 kg per lactation), high butterfat content (4.5-5%), and tick resistance.",
            "conceptual", 1
        ),
        (
            "Horticulture", "Air Layering (Gootee) Vegetative Propagation",
            "In horticultural fruit propagation, 'Air Layering' (Gootee) is commonly employed for commercial multiplication of:",
            "Pomegranate, Guava, and Litchi",
            ["Wheat and Barley", "Mustard and Sunflower", "Sugarcane and Maize"],
            "Air layering (Gootee) involves girdling a healthy pencil-thick shoot, applying rooting hormone (IBA), and wrapping with moist sphagnum moss and polythene to induce adventitious roots while still attached to the parent plant.",
            "conceptual", 2
        ),
        (
            "Animal Nutrition and Feed Technology", "Total Digestible Nutrients (TDN) Concept",
            "In animal nutrition, 'Total Digestible Nutrients' (TDN) measures the energy value of a feedstuff calculated as:",
            "Digestible Crude Protein + Digestible Crude Fiber + Digestible Nitrogen-Free Extract + (2.25 * Digestible Crude Fat)",
            ["Digestible Crude Protein / Total Ash Content",
             "Total Moisture Content + Crude Fiber Percentage",
             "Net Mineral Energy * Dry Matter Percentage"],
            "TDN represents the sum of all digestible organic nutrients. Because fat yields 2.25 times as much energy as carbohydrates upon oxidation, digestible ether extract (fat) is multiplied by 2.25.",
            "direct-numerical", 2
        ),
        (
            "Agronomy of Millets, Pulses and Oilseeds", "International Year of Millets: Nutritional Superiority",
            "Millets (such as Pearl Millet/Bajra, Finger Millet/Ragi, and Sorghum/Jowar) are designated as 'Nutri-Cereals' because they are exceptionally rich in:",
            "Dietary fiber, iron, calcium (especially Ragi), and essential micronutrients with a low glycemic index",
            ["Gluten proteins suitable for leavened bakery bread",
             "Refined simple sucrose sugars and saturated animal fats",
             "Pure starch devoid of any minerals or vitamins"],
            "Millets are climate-resilient C4 crops rich in calcium (Ragi has ~344 mg/100g, 30x higher than rice), iron, dietary fiber, and antioxidants, and are gluten-free with low glycemic index.",
            "conceptual", 1
        )
    ]

    agr_sub, agr_folder, agr_pref = 'agriculture', 'agriculture', 'AGRICULTURE'
    for m in range(22, 51):
        target_keys = get_balanced_target_keys(seed=2200 + m, count=50)
        rng = random.Random(f"AGR_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = agr_blueprints[(q_idx - 1) % len(agr_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                agr_sub, agr_folder, agr_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(agr_sub, agr_folder, agr_pref, m, questions)
        print(f"  [Agriculture] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 8. ANTHROPOLOGY (Mocks 22..50 = 29 mocks)
    # -------------------------------------------------------------------------
    ant_blueprints = [
        (
            "Anthropological Theories and Fieldwork Methods", "Bronislaw Malinowski and Functionalism",
            "Bronislaw Malinowski pioneered long-term participant observation fieldwork among the Trobriand Islanders and formulated the theory of:",
            "Bio-cultural Functionalism (cultural institutions exist to satisfy biological and psychological human needs)",
            ["Structural Marxism and violent class revolution",
             "Unilineal Cultural Evolutionism (Savagery -> Barbarism -> Civilization)",
             "Diffusionism asserting all world civilizations originated in ancient Egypt"],
            "Malinowski's functionalism argued that culture is an instrumental apparatus through which human beings satisfy basic biological needs (nutrition, reproduction, bodily comforts) and derived psychological/social needs.",
            "conceptual", 1
        ),
        (
            "Anthropology of Religion, Magic and Witchcraft", "E.B. Tylor: Animism Definition",
            "In his seminal work 'Primitive Culture' (1871), Sir Edward Burnett Tylor defined 'Animism' as the earliest stage of religious belief, characterized by:",
            "The belief in spiritual beings (souls, ghosts, and spirits animating nature)",
            ["The exclusive worship of a single omnipotent monotheistic creator",
             "The total absence of any supernatural beliefs or afterlife rituals",
             "The scientific veneration of atomic nuclear physics principles"],
            "E.B. Tylor defined religion minimally as 'the belief in Spiritual Beings'. He proposed that reflection on dreams, trances, and death led early humans to formulate the concept of the soul (animism).",
            "conceptual", 1
        ),
        (
            "Physical Anthropology", "Australopithecus afarensis (Lucy)",
            "The discovery of the fossil specimen 'Lucy' (Australopithecus afarensis) in Hadar, Ethiopia by Donald Johanson in 1974 proved that in hominid evolution:",
            "Bipedal locomotion evolved before significant expansion of cranial brain capacity",
            ["Tool making evolved before upright walking",
             "Brain volume doubled before any dental reduction occurred",
             "Early hominids possessed larger braincases than modern Homo sapiens"],
            "Lucy (dated to ~3.2 million years ago) demonstrated that habitual bipedal walking evolved early in hominid lineage, while brain capacity remained relatively small (~400 cc, similar to chimpanzees).",
            "conceptual", 2
        ),
        (
            "Socio-Cultural Anthropology", "Incest Taboo and Alliance Theory",
            "According to Claude Lévi-Strauss's structuralist alliance theory, the universal prohibition of incest (Incest Taboo) functions primarily to:",
            "Force human groups to practice exogamy, creating vital social alliances and reciprocal exchange networks through marriage",
            ["Prevent the transmission of recessive genetic chromosomal disorders exclusively",
             "Enforce permanent bachelorhood across warrior societies",
             "Abolish all kinship relationships in agrarian villages"],
            "Lévi-Strauss argued in 'The Elementary Structures of Kinship' that the incest taboo is the foundational rule transitioning humanity from nature to culture: by forbidding marriage within one's family, it compels groups to marry outside (exogamy), establishing reciprocal alliances.",
            "conceptual", 2
        ),
        (
            "Indian Anthropology", "Verrier Elwin: Tribal National Park / Isolation Policy",
            "Anthropologist Verrier Elwin initially advocated a policy for Indian tribal communities (often termed 'National Park' or Isolationist approach) that sought to:",
            "Protect vulnerable tribal communities from exploitation, land alienation, and cultural degradation by rapacious outsiders",
            ["Force immediate radical assimilation into industrial metropolitan factories",
             "Evict tribals from all reserved forests permanently without compensation",
             "Prohibit tribal languages from being spoken in residential ashram schools"],
            "In 'The Baiga' (1939), Verrier Elwin advocated creating protected areas ('national parks') where tribals could preserve their unique cultural heritage free from moneylenders, corrupt officials, and exploitative contractors.",
            "conceptual", 2
        ),
        (
            "Constitutional Safeguards, PESA, Forest Rights and PVTGs", "Particularly Vulnerable Tribal Groups (PVTGs)",
            "In Indian tribal policy, Particularly Vulnerable Tribal Groups (PVTGs, formerly primitive tribal groups) are identified by criteria including:",
            "Pre-agricultural level of technology, stagnant/declining population, extremely low literacy, and subsistence economy",
            ["High urban industrial employment and 100% university graduation rates",
             "Commanding positions in international export manufacturing conglomerates",
             "Ownership of commercial deep-sea fishing trawler fleets"],
            "The Government of India has classified 75 tribal communities across 18 states and UTs as PVTGs based on: (1) Pre-agricultural level of technology (hunting/gathering/shifting cultivation), (2) Very low literacy, (3) Economic backwardness, (4) Stagnant or declining population.",
            "conceptual", 1
        ),
        (
            "Dating Methods in Archaeological Anthropology", "Radiocarbon (C-14) Dating Technique",
            "The Radiocarbon (C-14) dating method developed by Willard Libby is used for absolute chronological dating of organic artifacts up to an effective limit of approximately:",
            "50,000 years Before Present (BP)",
            ["5 million years BP", "200 years BP only", "500 million years BP"],
            "Carbon-14 has a half-life of 5,730 years. Because the remaining radioactivity becomes too faint to measure accurately after approximately 8 to 9 half-lives, the practical upper limit of standard radiocarbon dating is ~50,000 years BP.",
            "conceptual", 2
        ),
        (
            "Civilizational Perspectives: Traditions and Sacred Complex", "L.P. Vidyarthi: Sacred Complex of Gaya",
            "Anthropologist L.P. Vidyarthi formulated the concept of 'The Sacred Complex' through his ethnographic study of Hindu pilgrimage at Gaya, identifying three interrelated components:",
            "Sacred Geography (Kshetra), Sacred Performances (Vidhi), and Sacred Specialists (Panda/Purohit)",
            ["Royal Castles, Feudal Courts, and Military Garrisons",
             "Agricultural Fields, Irrigation Canals, and Village Haats",
             "Sacred Mountains, Glacial Streams, and Forest Caves exclusively"],
            "L.P. Vidyarthi's Sacred Complex conceptualizes Hindu pilgrimage centers through three integrated components: Sacred Geography (sacred shrines and tirtha spots), Sacred Performances (rituals like Pinda Dan), and Sacred Specialists (priests, pandas).",
            "conceptual", 2
        )
    ]

    ant_sub, ant_folder, ant_pref = 'anthropology', 'anthropology', 'ANTHROPOLOGY'
    for m in range(22, 51):
        target_keys = get_balanced_target_keys(seed=2200 + m, count=50)
        rng = random.Random(f"ANT_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = ant_blueprints[(q_idx - 1) % len(ant_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                ant_sub, ant_folder, ant_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(ant_sub, ant_folder, ant_pref, m, questions)
        print(f"  [Anthropology] Mock {m} generated and verified.")

if __name__ == '__main__':
    generate_vocational_mocks()
