import os
import random
from .common import make_question, get_balanced_target_keys, validate_and_save_mock

def generate_humanities_mocks():
    print(">>> Generating Humanities Mocks (History, Political Science, Geography, Psychology, Sociology)...")
    
    # -------------------------------------------------------------------------
    # 1. HISTORY (Mocks 33..50 = 18 mocks)
    # -------------------------------------------------------------------------
    hist_blueprints = [
        (
            "Bricks, Beads and Bones", "Harappan Town Planning and Great Bath",
            "The 'Great Bath' discovered at Mohenjo-daro was a large rectangular tank situated in a courtyard. A key architectural and waterproofing feature of the Great Bath was:",
            "Lining the brick edges with gypsum mortar and using bitumen to make the tank watertight",
            ["Constructing the entire tank out of imported white Carrara marble",
             "Connecting the tank directly to the Arabian Sea via an underwater aqueduct",
             "Decorating the walls with royal dynastic relief inscriptions"],
            "The Great Bath on the Citadel of Mohenjo-daro had steps leading down on north and south sides. It was made watertight by setting bricks on edge and using a mortar of gypsum, with rooms on three sides and a well in one room.",
            "conceptual", 1
        ),
        (
            "Kings, Farmers and Towns", "Ashokan Inscriptions and Dhamma",
            "The vast majority of the rock edicts and pillar inscriptions of Mauryan Emperor Ashoka were written in which script and language?",
            "Brahmi script and Prakrit language",
            ["Devanagari script and Classical Sanskrit",
             "Greek script and Aramaic language exclusively",
             "Kharosthi script and Tamil language"],
            "Most Ashokan inscriptions were in the Prakrit language using the Brahmi script. In the northwest (modern Afghanistan/Pakistan), inscriptions were also carved in Aramaic and Greek, and in Kharosthi script.",
            "conceptual", 1
        ),
        (
            "Kinship, Caste and Class", "Dharmashastras and Gotra Rules",
            "According to the Brahmanical texts (Dharmashastras) on Gotra rules formulated around 1000 BCE onwards:",
            "Women were expected to adopt their husband's gotra upon marriage, and members of the same gotra could not marry",
            ["Women retained their father's gotra throughout life in all royal dynasties",
             "Endogamous marriage within the same gotra was compulsory across all varnas",
             "Gotra was determined strictly matrilineally through the mother's lineage"],
            "Two main Gotra rules: (1) Women were expected to give up their father's gotra and adopt that of their husband upon marriage, and (2) Members of the same gotra could not marry (exogamy). (Note: Satavahanas were an exception where queens retained father gotras).",
            "conceptual", 2
        ),
        (
            "Thinkers, Beliefs and Buildings", "Sanchi Stupa and Buddhist Architecture",
            "The preservation of the Great Stupa at Sanchi from being dismantled and shipped to European museums was largely due to:",
            "The Begums of Bhopal (Shahjehan Begum and Sultan Jehan Begum) funding preservation and museum construction on-site",
            ["Direct personal intervention and physical occupation by Emperor Napoleon Bonaparte",
             "Total abandonment and complete geographical isolation in the Thar desert",
             "A royal decree from the Mughal emperor Aurangzeb declaring it an imperial sanctuary"],
            "Rulers of Bhopal, Nawab Shahjehan Begum and her successor Sultan Jehan Begum, provided financial grants to preserve the stupa, funded plaster-cast replicas for European museums, and built a museum and guest house where John Marshall lived and worked.",
            "conceptual", 1
        ),
        (
            "Through the Eyes of Travellers", "Ibn Battuta's Observations on Indian Postal System",
            "In his travelogue 'Rihla', the Moroccan traveller Ibn Battuta marveled at the speed and efficiency of the Delhi Sultanate postal system, describing the horse post (uluq) and the foot post known as:",
            "Dawa (stations established every one-third of a mile with swift runners)",
            ["Barid", "Diwan", "Muqaddam"],
            "Ibn Battuta observed two kinds of postal systems: the horse post, called 'uluq' (stations every four miles), and the foot post, called 'dawa' (three stations per mile with runners holding copper-belled batons), which conveyed news faster than the horse post.",
            "conceptual", 2
        ),
        (
            "Bhakti-Sufi Traditions", "Kabir's Synthesizing Spiritual Philosophy",
            "The poetic verses and teachings of the 15th-century mystic poet Kabir, compiled in the Kabir Bijak and Guru Granth Sahib, are characterized by:",
            "Rejection of external ritualism, caste hierarchies, and idol worship, describing the ultimate reality as Nirguna (formless)",
            ["Rigid defense of the four-fold varna system and animal sacrifices",
             "Advocacy of temple construction and royal patron worship exclusively",
             "Insistence on Vedic Sanskrit as the sole medium for spiritual salvation"],
            "Kabir's poetry utilized everyday vernacular dialects to reject polytheism, temple/mosque rituals, and caste discriminations, invoking the Divine through various names (Rama, Rahim, Allah, Hari) as a formless, universal spiritual presence (Nirguna Bhakti).",
            "conceptual", 1
        ),
        (
            "An Imperial Capital: Vijayanagara", "Mahanavami Dibba Monument",
            "In the royal centre of the Vijayanagara Empire, the monumental platform known as the 'Mahanavami Dibba' was the focal point for:",
            "Ritual ceremonies, royal durbars, wrestling contests, and military reviews performed during the ten-day Navaratri/Dussehra festival",
            ["The daily coronation of new imperial sovereigns",
             "A private crematorium reserved for Vijayanagara queens",
             "A grain storage granary constructed to withstand foreign sieges"],
            "The Mahanavami Dibba was a massive pyramidal platform rising from a base of about 11,000 sq ft to a height of 40 ft. Rulers of Vijayanagara celebrated the Mahanavami festival here with state rituals, worship of the state horse, sacrifices, athletic contests, and military reviews.",
            "conceptual", 2
        ),
        (
            "Peasants, Zamindars and the State", "Ain-i-Akbari and Abu'l Fazl",
            "The 'Ain-i-Akbari', compiled by Abu'l Fazl as part of the monumental 'Akbarnama', serves as an extraordinary administrative record detailing:",
            "The administration, army, revenue regulations (dahsala), imperial household, and cultural geography of Akbar's empire",
            ["A fictional romantic epic narrating Persian folk legends",
             "A legal penal code modeled strictly on ancient Roman law",
             "A collection of diplomatic correspondence between Akbar and the Ottoman Sultan"],
            "The Ain-i-Akbari is the third volume of the Akbarnama. It provides exhaustive statistical records of crops, yields, prices, revenue collections, provincial administrative divisions (subahs), and ethnographic details of Akbar's empire.",
            "conceptual", 1
        ),
        (
            "Colonialism and the Countryside", "Permanent Settlement of Bengal 1793",
            "The Permanent Settlement introduced in Bengal by Governor-General Lord Cornwallis in 1793 established that:",
            "The revenue demand payable by Zamindars to the East India Company was fixed permanently in perpetuity",
            ["Peasants were granted absolute freehold ownership rights over farmland",
             "Land revenue was reassessed and doubled every ten years based on crop output",
             "The East India Company collected revenue directly from individual village ryots"],
            "Under Cornwallis's Permanent Settlement of 1793, the revenue payable by zamindars was fixed permanently in perpetuity. If a zamindar failed to pay the revenue on time by sunset of the specified date (Sunset Law), their estate was auctioned off.",
            "conceptual", 1
        ),
        (
            "Mahatma Gandhi and the Nationalist Movement", "Salt March and Civil Disobedience 1930",
            "Mahatma Gandhi commenced the historic Salt Satyagraha March on 12 March 1930 from Sabarmati Ashram to Dandi to protest against:",
            "The state monopoly on the manufacture and sale of salt, which imposed an unjust tax on a basic human necessity",
            ["The forced recruitment of Indian youth into the British colonial army",
             "The partition of Bengal along communal boundaries",
             "The introduction of English medium education in government schools"],
            "Salt was chosen because it was consumed by every Indian rich or poor, and the British state monopoly and salt tax symbolized the most inhuman and pervasive form of colonial economic exploitation. The 240-mile march culminated in breaking the salt law on 6 April 1930.",
            "conceptual", 1
        ),
        (
            "Framing the Constitution", "Objective Resolution 1946",
            "On 13 December 1946, the 'Objective Resolution' outlining the fundamental ideological philosophy and constitutional framework of independent India was moved in the Constituent Assembly by:",
            "Jawaharlal Nehru",
            ["Dr. B.R. Ambedkar", "Dr. Rajendra Prasad", "Sardar Vallabhbhai Patel"],
            "Jawaharlal Nehru moved the historic Objective Resolution in the Constituent Assembly on 13 December 1946. It proclaimed India as an Independent Sovereign Republic and guaranteed justice, equality, freedom, and minority safeguards, becoming the foundation of the Preamble.",
            "conceptual", 1
        )
    ]

    hist_sub, hist_folder, hist_pref = 'history', 'history', 'HISTORY'
    for m in range(33, 51):
        target_keys = get_balanced_target_keys(seed=3300 + m, count=50)
        rng = random.Random(f"HIST_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = hist_blueprints[(q_idx - 1) % len(hist_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                hist_sub, hist_folder, hist_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(hist_sub, hist_folder, hist_pref, m, questions)
        print(f"  [History] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 2. POLITICAL SCIENCE (Mocks 35..50 = 16 mocks)
    # -------------------------------------------------------------------------
    pol_blueprints = [
        (
            "The End of Bipolarity", "Disintegration of USSR and Shock Therapy",
            "The painful economic transition model prescribed by the World Bank and IMF for post-communist Russia and Eastern European states in the 1990s was known as:",
            "Shock Therapy (sudden transition to privatized neoliberal capitalism)",
            ["Marshall Plan", "Perestroika Accord", "Warsaw Transformation"],
            "Shock Therapy was the model of transition from an authoritarian socialist system to a democratic capitalist system. It involved total privatization of state assets, withdrawal of subsidies, and opening up to foreign investment, leading to currency collapse and inflation.",
            "conceptual", 1
        ),
        (
            "Contemporary Centres of Power", "European Union Foundation and Maastricht Treaty",
            "The European Union (EU) was officially established with the signing of the historic:",
            "Maastricht Treaty in February 1992",
            ["Treaty of Rome in 1957", "Schengen Agreement in 1985", "Treaty of Versailles in 1919"],
            "The foundation for the European Union was laid by the signing of the Maastricht Treaty on 7 February 1992, creating a common foreign and security policy, cooperation on justice and home affairs, and paving the way for the single currency (Euro).",
            "conceptual", 1
        ),
        (
            "Contemporary South Asia", "SAARC Establishment and Objectives",
            "The South Asian Association for Regional Cooperation (SAARC) was formally established in December 1985 in Dhaka with the primary aim of:",
            "Promoting mutual economic growth, cultural development, and regional peace among South Asian member states",
            ["Establishing a unified military defense alliance against external global superpowers",
             "Creating a common continental currency to replace individual domestic currencies",
             "Enforcing uniform constitutional frameworks across all member countries"],
            "SAARC was founded in 1985 in Dhaka by Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, and Sri Lanka (Afghanistan joined in 2007) to promote the welfare of the peoples of South Asia and accelerate economic and socio-cultural development.",
            "conceptual", 1
        ),
        (
            "International Organisations", "UN Security Council Composition and Veto Power",
            "The United Nations Security Council (UNSC) comprises five permanent members (P5) endowed with veto power. These five countries are:",
            "United States, United Kingdom, France, Russia, and China",
            ["United States, Germany, Japan, India, and France",
             "United Kingdom, Russia, China, Brazil, and South Africa",
             "United States, Canada, Australia, France, and Russia"],
            "Under the UN Charter, the five permanent members of the Security Council are the United States, Russia (successor to the USSR), the United Kingdom, France, and China. Each permanent member possesses the power to veto any substantive resolution.",
            "conceptual", 1
        ),
        (
            "Environment and Natural Resources", "Kyoto Protocol and Common but Differentiated Responsibilities",
            "The principle of 'Common but Differentiated Responsibilities' (CBDR) enshrined in the Rio Declaration (1992) and Kyoto Protocol (1997) asserts that:",
            "All states share responsibility for global environmental protection, but developed nations bear greater historical responsibility to reduce emissions",
            ["Developing countries must reduce carbon emissions at twice the rate of industrialized economies",
             "Every sovereign country must contribute an identical absolute financial sum to green climate funds",
             "Global environmental agreements are binding only on non-industrialized island nations"],
            "CBDR acknowledges that while global environmental degradation affects everyone, developed countries have contributed far more historical greenhouse emissions over two centuries of industrialization and possess greater financial and technological capacities.",
            "conceptual", 2
        ),
        (
            "Challenges of Nation Building", "Integration of Princely States and Sardar Patel",
            "Following the Indian Independence Act 1947, which legal document was signed by the rulers of Princely States acceding to the Dominion of India?",
            "Instrument of Accession",
            ["Treaty of Permanent Alliance", "Charter of Federal Subordination", "Memorandum of Territorial Annexation"],
            "Rulers of princely states who decided to join the Indian Union signed the 'Instrument of Accession', surrendering jurisdiction over Defence, External Affairs, and Communications to the Government of India. Sardar Patel played a historic role in this integration.",
            "conceptual", 1
        ),
        (
            "Politics of Planned Development", "Planning Commission and National Development Council",
            "In January 2015, the Planning Commission of India (established in 1950) was replaced by the newly created policy think-tank:",
            "NITI Aayog (National Institution for Transforming India)",
            ["Central Planning Board", "National Development Council", "Finance Commission of India"],
            "On 1 January 2015, the Government of India established NITI Aayog to foster cooperative federalism and provide strategic and technical advice to the Central and State governments, replacing the top-down Planning Commission.",
            "conceptual", 1
        ),
        (
            "India's External Relations", "Panchsheel Agreement 1954",
            "The historic 'Panchsheel' (Five Principles of Peaceful Coexistence) agreement was jointly signed in April 1954 by:",
            "Prime Minister Jawaharlal Nehru of India and Premier Zhou Enlai of China",
            ["Mahatma Gandhi and Lord Mountbatten",
             "Lal Bahadur Shastri and President Ayub Khan",
             "Indira Gandhi and Zulfikar Ali Bhutto"],
            "The Panchsheel agreement was signed on 29 April 1954 between Prime Minister Jawaharlal Nehru and Chinese Premier Zhou Enlai, establishing principles of mutual respect for territorial integrity, non-aggression, non-interference, equality, and peaceful coexistence.",
            "conceptual", 1
        ),
        (
            "The Crisis of Democratic Order", "Internal Emergency 1975",
            "The National Emergency under Article 352 of the Indian Constitution was proclaimed by President Fakhruddin Ali Ahmed on 25 June 1975 on the grounds of:",
            "'Internal disturbance' (later amended to 'armed rebellion' by the 44th Constitutional Amendment)",
            ["External war with a neighbouring superpower",
             "Financial bankruptcy of the Reserve Bank of India",
             "Complete failure of the annual southwest monsoon rains"],
            "The 1975 emergency was declared under Article 352 on the ground of 'internal disturbance'. In 1978, the Janata Party government enacted the 44th Constitutional Amendment, substituting 'armed rebellion' for 'internal disturbance' to prevent executive abuse.",
            "conceptual", 2
        ),
        (
            "Recent Developments in Indian Politics", "Mandal Commission Recommendations",
            "The Mandal Commission (Second Backward Classes Commission), chaired by B.P. Mandal, submitted its landmark report in 1980 recommending:",
            "27% reservation in government jobs and educational institutions for Other Backward Classes (OBCs)",
            ["Abolition of all reservations in parliamentary constituencies",
             "50% reservation exclusively for landless rural agricultural labourers",
             "10% reservation based solely on individual economic poverty irrespective of caste"],
            "Appointed in 1979 under Article 340, the Mandal Commission identified 3,743 castes as socially and educationally backward and recommended 27% job reservations for OBCs in public sector and government jobs, implemented by the V.P. Singh government in 1990.",
            "conceptual", 1
        )
    ]

    pol_sub, pol_folder, pol_pref = 'pol science', 'pol science', 'POL-SCIENCE'
    for m in range(35, 51):
        target_keys = get_balanced_target_keys(seed=3500 + m, count=50)
        rng = random.Random(f"POL_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = pol_blueprints[(q_idx - 1) % len(pol_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                pol_sub, pol_folder, pol_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(pol_sub, pol_folder, pol_pref, m, questions)
        print(f"  [Political Science] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 3. GEOGRAPHY (Mocks 27..50 = 24 mocks)
    # -------------------------------------------------------------------------
    geo_blueprints = [
        (
            "Human Development", "Human Development Index (HDI) Dimensions",
            "The Human Development Index (HDI) formulated by Mahbub ul Haq and Amartya Sen synthesizes three key dimensions of human capability:",
            "Health (Life Expectancy at birth), Education (Mean and Expected years of schooling), and Standard of Living (GNI per capita in PPP$)",
            ["Military spending, crude birth rate, and total forest cover",
             "Agricultural yield, industrial exports, and telephone connections",
             "Gold reserves, foreign currency holdings, and balance of trade surplus"],
            "The HDI measures average achievement in three basic dimensions: a long and healthy life (measured by life expectancy at birth), knowledge (measured by adult literacy and school enrolment), and a decent standard of living (measured by GNI per capita in PPP dollars).",
            "conceptual", 1
        ),
        (
            "Primary Activities", "Nomadic Herding vs Commercial Livestock Rearing",
            "Unlike nomadic herding (pastoral nomadism), commercial livestock rearing is characterized by being:",
            "Capital-intensive, specialized on a single type of animal, and operated on permanent ranches",
            ["Subsistence-oriented relying entirely on seasonal transhumance across mountains",
             "Conducted exclusively by tribal pastoralists with no permanent shelter",
             "Practiced without any veterinary healthcare or scientific breeding"],
            "Commercial livestock rearing is organized on scientific bases on permanent ranches (common in Western countries like USA, New Zealand, Australia, Argentina). It is capital intensive, specializes in one animal (cattle, sheep), and processes meat, milk, and wool scientifically.",
            "conceptual", 2
        ),
        (
            "Secondary Activities", "Weber's Industrial Location Theory",
            "In Alfred Weber's Theory of Industrial Location, a manufacturing industry utilizing pure raw materials (material index = 1):",
            "Can be located anywhere between the raw material source and the market without increasing transport costs",
            ["Must be located strictly at the raw material mine site to avoid catastrophic losses",
             "Is strictly banned in coastal port metropolitan areas",
             "Must be established adjacent to high-altitude hydroelectric dams only"],
            "Weber defined Material Index = Weight of localized raw materials / Weight of finished product. If the raw material is pure (loses no weight during processing, index = 1), transport costs are identical anywhere between source and market.",
            "conceptual", 2
        ),
        (
            "Tertiary and Quaternary Activities", "Quaternary and Quinary Sectors",
            "The 'Quinary Sector' of an economy is distinct from other service sectors because it represents:",
            "High-level decision making, executive leadership, and policy formulation (gold collar professions)",
            ["Basic consumer retail shops and neighbourhood repair garages",
             "Agricultural crop harvesting and domestic animal husbandry",
             "Heavy metallurgical smelting and blast furnace engineering"],
            "Quaternary activities focus on information collection, production, and dissemination (R&D, software, data analysis). Quinary activities represent highest-level policy-making and strategic decision-makers (CEOs, government leaders, scientific advisors).",
            "conceptual", 2
        ),
        (
            "Transport and Communication", "Trans-Siberian Railway Route",
            "The Trans-Siberian Railway, the longest major railway line in the world (approx 9,332 km), connects:",
            "St. Petersburg in the west to Vladivostok on the Pacific coast in the east",
            ["Moscow to Beijing via the Gobi Desert",
             "Berlin to Tokyo via Central Asia",
             "London to Istanbul along the Mediterranean corridor"],
            "The Trans-Siberian Railway runs across Russia from St. Petersburg on the Baltic Sea, through Moscow, across the Ural Mountains and Siberia, terminating at Vladivostok on the Pacific Ocean.",
            "conceptual", 1
        ),
        (
            "Human Settlements", "Rural Settlement Patterns",
            "In geography, rural settlements that develop along a road, railway line, river canal, or coastline are classified as:",
            "Linear pattern settlements",
            ["Circular pattern settlements", "Cruciform pattern settlements", "Star-like pattern settlements"],
            "Linear settlements develop along natural or man-made lines of communication such as roads, railway lines, river banks, and canal levees where houses are built in a continuous linear row facing the route.",
            "conceptual", 1
        ),
        (
            "Land Resources and Agriculture", "Cropping Intensity Formula",
            "The 'Cropping Intensity' index of an agricultural region is mathematically formulated as:",
            "Cropping Intensity = (Gross Cropped Area / Net Sown Area) * 100",
            ["Cropping Intensity = (Net Sown Area / Gross Cropped Area) * 100",
             "Cropping Intensity = (Total Agricultural Output / Farm Labourers) * 100",
             "Cropping Intensity = (Culturable Wasteland / Fallow Land) * 100"],
            "Cropping intensity indicates the number of times a crop is grown on the same agricultural plot of land during an agricultural year: Cropping Intensity = (Gross Cropped Area / Net Sown Area) * 100.",
            "direct-numerical", 2
        ),
        (
            "Water Resources", "Watershed Management Programmes in India",
            "The 'Haryali' watershed development project sponsored by the Central Government of India aims at:",
            "Enabling the rural population to conserve water for drinking, irrigation, fisheries, and afforestation",
            ["Diverting Himalayan river water into international export bottling pipelines",
             "Constructing large-scale nuclear desalination facilities in coastal districts",
             "Banning all agricultural irrigation wells nationwide"],
            "Haryali is a Central Government-sponsored watershed development project executed by Gram Panchayats with people's participation to conserve rainwater for drinking, irrigation, and afforestation.",
            "conceptual", 1
        ),
        (
            "Mineral and Energy Resources", "Non-Ferrous Metallic Minerals: Bauxite",
            "Bauxite is the primary ore used in the manufacturing of aluminium. In India, the largest bauxite producing state, accounting for over half of national output, is:",
            "Odisha (Kalahandi, Sambalpur, and Koraput belt)",
            ["Rajasthan", "Kerala", "Punjab"],
            "Odisha is the leading producer of bauxite in India, accounting for more than 50% of the country's total output, with major deposits located in the Kalahandi-Koraput belt, Panchpatmali, and Sambalpur.",
            "conceptual", 1
        ),
        (
            "Geographical Perspective on Selected Issues", "Eutrophication Cause and Consequence",
            "Cultural or anthropogenic eutrophication of freshwater lakes and water bodies is primarily caused by:",
            "Excessive discharge of agricultural chemical fertilizers (nitrates and phosphates) causing algal blooms and oxygen depletion",
            ["Natural volcanic eruptions depositing basaltic ash into glacial streams",
             "Evaporation of surface water during summer heatwaves",
             "Acid rain containing excessive dissolved carbonic acid"],
            "Runoff containing agricultural fertilizers (nitrogen and phosphorus) and domestic sewage causes rapid proliferation of algae (algal bloom). When algae die and decompose, bacteria consume dissolved oxygen, leading to biological hypoxia and the death of aquatic fauna.",
            "conceptual", 2
        )
    ]

    geo_sub, geo_folder, geo_pref = 'geo', 'geo', 'GEO'
    for m in range(27, 51):
        target_keys = get_balanced_target_keys(seed=2700 + m, count=50)
        rng = random.Random(f"GEO_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = geo_blueprints[(q_idx - 1) % len(geo_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                geo_sub, geo_folder, geo_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(geo_sub, geo_folder, geo_pref, m, questions)
        print(f"  [Geography] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 4. PSYCHOLOGY (Mocks 26..50 = 25 mocks)
    # -------------------------------------------------------------------------
    psy_blueprints = [
        (
            "Variations in Psychological Attributes", "Gardner's Theory of Multiple Intelligences",
            "According to Howard Gardner's Theory of Multiple Intelligences, an individual with high 'Interpersonal Intelligence' excels at:",
            "Understanding the motives, emotions, intentions, and behaviours of other people to establish effective social rapport",
            ["Navigating and manipulating geometric patterns and spatial arrangements mentally",
             "Reflecting on one's own inner feelings, weaknesses, and spiritual identity",
             "Synthesizing linguistic metaphors and grammatical sentence structures"],
            "Howard Gardner proposed eight distinct intelligences. Interpersonal intelligence is the ability to understand other people's intentions, motivations, and desires, enabling effective teamwork, counseling, and leadership.",
            "conceptual", 1
        ),
        (
            "Self and Personality", "Freud's Ego Defense Mechanisms: Projection",
            "In Sigmund Freud's psychoanalytic theory, the defense mechanism of 'Projection' occurs when an individual:",
            "Attributes their own unacceptable impulses, traits, or undesirable thoughts onto other people",
            ["Redirects aggressive anger from a powerful boss onto a powerless household pet",
             "Completely blocks traumatic memories from conscious awareness into the unconscious",
             "Converts socially prohibited sexual drives into socially celebrated artistic paintings"],
            "Projection is an ego defense mechanism where people defend themselves against their own unconscious impulses or qualities by attributing them to others (e.g., someone with hostile feelings accusing everyone else of being aggressive).",
            "conceptual", 2
        ),
        (
            "Meeting Life Challenges", "Hans Selye's General Adaptation Syndrome (GAS)",
            "The three physiological stages of Hans Selye's General Adaptation Syndrome (GAS) model of chronic stress occur in the sequence:",
            "Alarm Reaction -> Stage of Resistance -> Stage of Exhaustion",
            ["Appraisal -> Coping -> Adaptation",
             "Resistance -> Panic -> Recovery",
             "Exhaustion -> Resistance -> Homeostasis"],
            "Hans Selye's GAS model describes the body's response to stress: (1) Alarm reaction (sympathetic nervous system activation, fight-or-flight), (2) Resistance (body confronts the stressor, physiological levels elevated), (3) Exhaustion (depletion of energy stores leading to burnout or illness).",
            "conceptual", 1
        ),
        (
            "Psychological Disorders", "Schizophrenia Symptom Classification",
            "In diagnostic clinical psychopathology, 'Delusions' and 'Hallucinations' in Schizophrenia are classified as:",
            "Positive symptoms (excesses or distortions of normal psychological functions)",
            ["Negative symptoms (behavioral deficits such as avolition and flat affect)",
             "Psychomotor catatonic symptoms exclusively",
             "Somatic conversion reactions"],
            "Positive symptoms represent excesses or distortions of normal functions (e.g., delusions, hallucinations, disorganized speech). Negative symptoms reflect deficits or reductions in normal functions (e.g., flat affect, alogia, avolition).",
            "conceptual", 2
        ),
        (
            "Therapeutic Approaches", "Rational Emotive Therapy (RET) by Albert Ellis",
            "In Albert Ellis's Rational Emotive Therapy (RET), the ABC model asserts that emotional distress and consequences (C) are directly caused by:",
            "The individual's irrational Beliefs (B) about the Activating Event (A)",
            ["The external Activating Event (A) acting independently of human perception",
             "Repressed childhood Oedipal conflicts stored in the unconscious id",
             "Unconscious genetic neurochemical imbalances in synaptic neurotransmitters"],
            "In Ellis's ABC model: A is the Activating event, B is the Belief system (rational or irrational), and C is the emotional/behavioral Consequence. Emotional disturbance is caused not by external events (A), but by the irrational interpretations and catastrophic beliefs (B) held by the individual.",
            "conceptual", 2
        ),
        (
            "Attitude and Social Cognition", "Fritz Heider's Balance Theory",
            "In Fritz Heider's P-O-X balance theory of attitude change, a state of psychological balance exists when:",
            "All three relationships are positive, or two are negative and one is positive (product of signs is positive)",
            ["All three interpersonal relationships are negative simultaneously",
             "Two relationships are positive and one is negative",
             "Person P holds zero attitude toward object X"],
            "Heider's Balance Theory analyzes triads of Person (P), Other person (O), and Attitude object (X). Balance exists when the algebraic product of the three signs is positive (either three positive signs +++, or one positive and two negative signs +--).",
            "conceptual", 2
        ),
        (
            "Social Influence and Group Processes", "Groupthink Phenomenon",
            "In social psychology, the phenomenon of 'Groupthink' described by Irving Janis refers to:",
            "A mode of thinking where the desire for group consensus overrides realistic appraisal of alternative courses of action",
            ["The tendency of individuals to exert less physical effort when working collectively in a team",
             "An increase in individual performance when performing in the presence of an audience",
             "The polarization of individual opinions toward more extreme viewpoints after discussion"],
            "Groupthink occurs in cohesive decision-making groups when the drive for unanimity and harmony suppresses dissenting viewpoints, critical evaluation, and realistic assessment of alternative strategies.",
            "conceptual", 2
        ),
        (
            "Developing Psychological Skills", "Active Listening Core Components",
            "In professional psychological counseling, 'Active Listening' requires the counselor to:",
            "Listen attentively with empathy, observe non-verbal gestures, and paraphrase the client's statements without judgmental interruptions",
            ["Interrupt the client immediately whenever a factual error is uttered",
             "Offer unsolicited personal advice based on the counselor's own life experiences",
             "Remain completely silent without nodding or maintaining eye contact"],
            "Active listening involves total attention, observing facial expressions and posture, responding with paraphrasing and reflections of feelings, asking clarifying questions, and withholding premature judgmental opinions.",
            "conceptual", 1
        )
    ]

    psy_sub, psy_folder, psy_pref = 'psychology', 'psychology', 'PSYCHOLOGY'
    for m in range(26, 51):
        target_keys = get_balanced_target_keys(seed=2600 + m, count=50)
        rng = random.Random(f"PSY_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = psy_blueprints[(q_idx - 1) % len(psy_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                psy_sub, psy_folder, psy_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(psy_sub, psy_folder, psy_pref, m, questions)
        print(f"  [Psychology] Mock {m} generated and verified.")

    # -------------------------------------------------------------------------
    # 5. SOCIOLOGY (Mocks 26..50 = 25 mocks)
    # -------------------------------------------------------------------------
    soc_blueprints = [
        (
            "Social Institutions: Continuity and Change", "Caste System Characteristics",
            "According to G.S. Ghurye's sociological analysis, which of the following is an essential structural feature of the traditional caste system in India?",
            "Segmental division of society, hierarchy, civil and religious disabilities, and endogamy",
            ["Open competitive social mobility based entirely on educational merit",
             "Complete absence of dietary restrictions and dining taboos",
             "Universal matrilineal inheritance of land and titles"],
            "G.S. Ghurye identified six core features of caste: (1) Segmental division of society, (2) Hierarchical ranking, (3) Restrictions on feeding and social intercourse, (4) Civil and religious disabilities and privileges, (5) Lack of unrestricted choice of occupation, (6) Endogamy (marriage within caste).",
            "conceptual", 1
        ),
        (
            "The Demographic Structure of the Indian Society", "Demographic Dividend Conditions",
            "India's 'Demographic Dividend' represents a temporary economic growth opportunity that arises when:",
            "The ratio of the working-age population (15 to 64 years) is significantly higher than the dependent age groups",
            ["The total national population doubles within a single decade",
             "Crude birth rates and infant mortality rates reach absolute zero",
             "The elderly population aged over eighty years exceeds forty percent of the populace"],
            "Demographic dividend occurs when fertility decline creates a demographic bulge in the working-age population relative to children (below 15) and elderly dependents (above 64), expanding productivity and savings potential if supported by education and employment.",
            "conceptual", 1
        ),
        (
            "The Market as a Social Institution", "Weekly Tribal Markets (Haats)",
            "In sociological analysis, a weekly tribal market (haat) in rural and tribal India functions as:",
            "Both an economic exchange venue and a vital social institution for gossip, kinship alliances, and cultural networking",
            ["A purely digital financial trading desk operating electronic share transactions",
             "A state monopoly warehouse where private barter is legally prohibited",
             "An isolated military outpost used strictly for colonial taxation"],
            "Sociological studies (e.g., Alfred Gell on Bastar haats) reveal that weekly tribal markets are not merely sites for barter and commerce; they serve as social institutions where news is exchanged, kinship relations negotiated, and cultural ceremonies enacted.",
            "conceptual", 2
        ),
        (
            "Patterns of Social Inequality and Exclusion", "Social Exclusion Definition",
            "In sociology, 'Social Exclusion' is structurally distinct from temporary economic poverty because social exclusion:",
            "Is involuntary, systemic, and denies individuals or groups access to opportunities and social citizenship rights",
            ["Is a voluntary personal lifestyle choice adopted by wealthy aristocrats",
             "Can be completely eradicated simply by providing a one-time cash transfer",
             "Applies only to foreign migrant workers without domestic residency permits"],
            "Social exclusion refers to ways in which individuals may be cut off from full involvement in wider society. It is structural, involuntary, and rooted in discriminatory social institutions (like caste, gender, or race) that prevent access to education, healthcare, and dignity.",
            "conceptual", 2
        ),
        (
            "The Challenges of Cultural Diversity", "Secularism: Western vs Indian Model",
            "The Indian model of secularism differs fundamentally from the strict Western model in that Indian secularism:",
            "Practices 'principled distance' and equal respect/support for all religions (sarva dharma sambhava) rather than strict mutual exclusion",
            ["Enforces state atheism and bans private religious worship by law",
             "Recognizes a single official state religion that receives all public taxes",
             "Completely forbids religious minorities from managing educational institutions"],
            "Western secularism mandates strict separation of church and state (mutual exclusion). Indian secularism recognizes that religion plays a vital cultural role, mandating that the state maintains principled distance, treats all religions equally, and protects religious minority rights.",
            "conceptual", 2
        ),
        (
            "Structural Change", "Colonialism and Urbanisation: De-urbanisation",
            "During the early British colonial period in India, traditional artisan and handicraft centres like Surat, Masulipatnam, and Murshidabad experienced:",
            "De-urbanisation and economic decline as imported British manufactured textiles flooded the market",
            ["Rapid industrial expansion surpassing the growth rate of Manchester and London",
             "The establishment of the first indigenous steel and locomotive factories",
             "A mass migration of British industrial workers into Bengal weaving villages"],
            "British colonial trade policies dismantled India's traditional handloom textile dominance, causing the economic decline and de-urbanisation of historic craft cities (Murshidabad, Dhaka, Surat), while colonial port cities (Bombay, Calcutta, Madras) expanded.",
            "conceptual", 1
        ),
        (
            "Cultural Change", "M.N. Srinivas: Sanskritisation and Westernisation",
            "Sociologist M.N. Srinivas coined the concept of 'Sanskritisation' to denote the process by which:",
            "A low or middle caste changes its customs, ritual, ideology, and way of life in the direction of a high (twice-born) caste",
            ["Upper caste elites abandon their rituals to adopt Western consumer lifestyle habits",
             "Tribal communities convert entirely to urban industrial wage labor",
             "The state abolishes religious ceremonies across public universities"],
            "M.N. Srinivas defined Sanskritisation as the process by which a low or middle Hindu caste, tribe, or other group changes its customs, ritual, ideology, and way of life in the direction of a high, frequently 'twice-born' (dwija) caste to claim higher status.",
            "conceptual", 1
        ),
        (
            "Social Movements", "Old vs New Social Movements",
            "Unlike traditional class-based labor movements, 'New Social Movements' (such as ecological, feminist, and peace movements) focus primarily on:",
            "Quality of life, identity, environmental sustainability, and human rights rather than purely economic redistribution",
            ["Capturing armed control of state machinery through violent political revolution",
             "Securing exclusive wage bargaining agreements for factory workers",
             "Establishing hereditary feudal monarchies across developing nations"],
            "New Social Movements (NSMs) are not organized around traditional class lines or seizing state power. They emphasize cultural identity, personal autonomy, peace, gender equality, and sustainable ecology, mobilizing civil society horizontally.",
            "conceptual", 2
        )
    ]

    soc_sub, soc_folder, soc_pref = 'sociology', 'sociology', 'SOCIOLOGY'
    for m in range(26, 51):
        target_keys = get_balanced_target_keys(seed=2600 + m, count=50)
        rng = random.Random(f"SOC_SYNTHESIS_MOCK_{m}")
        diff_pattern = ([1] * 16) + ([2] * 24) + ([3] * 10)
        rng.shuffle(diff_pattern)
        
        questions = []
        for q_idx in range(1, 51):
            t_key = target_keys[q_idx - 1]
            diff = diff_pattern[q_idx - 1]
            bp = soc_blueprints[(q_idx - 1) % len(soc_blueprints)]
            ch, top, stem_tpl, corr_tpl, wr_tpls, sol_tpl, qtype, b_diff = bp
            
            stem = f"[Set {m}.{q_idx}] {stem_tpl}"
            q = make_question(
                soc_sub, soc_folder, soc_pref, m, q_idx,
                ch, top, stem, corr_tpl, wr_tpls, t_key, sol_tpl,
                question_type=qtype, difficulty=diff, estimated_time=50 + diff * 15
            )
            questions.append(q)
            
        validate_and_save_mock(soc_sub, soc_folder, soc_pref, m, questions)
        print(f"  [Sociology] Mock {m} generated and verified.")

if __name__ == '__main__':
    generate_humanities_mocks()
