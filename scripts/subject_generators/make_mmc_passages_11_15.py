#!/usr/bin/env python3
"""
make_mmc_passages_11_15.py
Generates Mocks 11 to 15 passage pairs for mmc_passages_11_20.py.
"""

import sys, os

out_path = "scripts/subject_generators/mmc_passages_11_20.py"

header = '''import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import case_q

# ==============================================================================
# MOCK 11 PASSAGES
# ==============================================================================
P1_M11_TXT = (
    "Read the following case review on public health communication and campaign planning and answer the questions that follow:\\n\\n"
    "In the late 1990s, the Government of India, in partnership with UNICEF, WHO, and Rotary International, launched the monumental "
    "'Pulse Polio Immunization' social marketing campaign. Facing stubborn vaccine hesitancy and apathy in high-density rural and urban "
    "slum clusters, campaign planners integrated Russell Colley's DAGMAR model with the classic AIDA consumer response hierarchy. "
    "To capture nationwide 'Attention' and build 'Awareness', the campaign enlisted Bollywood superstar Amitabh Bachchan as the authoritative "
    "spokesperson. In television and radio commercials, his commanding, baritone persona sternly warned parents that failing to administer drops "
    "risked paralyzing their child, coining the iconic national catchphrase: 'Do Boond Zindagi Ki' (Two Drops of Life). This provoked intense "
    "'Interest' and stimulated 'Desire' by transforming a routine medical immunization into an emotional moral duty of parental love. Measurable "
    "communication benchmarks were set under DAGMAR: achieving 95% awareness of National Immunization Days (Polio Sundays) across priority districts "
    "and converting passive awareness into immediate physical 'Action'. By mobilizing booth drives, mobile vans, and community health workers (ASHAs), "
    "the campaign successfully eradicated wild poliovirus transmission, leading to WHO declaring India polio-free in 2014."
)
P1_M11_QS = [
    case_q("Campaign Planning", "AIDA Model in Pulse Polio",
        "How did the Pulse Polio campaign execute the 'Attention' and 'Interest' stages of the AIDA model?",
        "By enlisting Amitabh Bachchan's authoritative persona and coining the emotive catchphrase 'Do Boond Zindagi Ki'",
        ["By sending private telegrams to international airline pilots",
         "By broadcasting classical violin sonatas at midnight",
         "By painting hospital ambulances purple"],
        "Amitabh Bachchan's baritone persona and the 'Do Boond Zindagi Ki' slogan captured immediate nationwide attention and emotional interest."),
    case_q("Campaign Planning", "DAGMAR Communication Task Application",
        "How did campaign planners apply Russell Colley's DAGMAR principles to the polio eradication drive?",
        "By defining measurable communication goals (e.g. 95% awareness of Polio Sunday dates) rather than vague aspirations",
        ["By requiring parents to pass a written medical examination",
         "By selling polio drops in commercial luxury shopping malls",
         "By firing all doctors who worked in government clinics"],
        "DAGMAR requires defining specific, measurable communication tasks (awareness of dates/booths) with concrete target benchmarks."),
    case_q("Campaign Planning", "Celebrity Endorsement Psychology",
        "Why was Amitabh Bachchan's 'Angry Older Man' scolding tone effective in motivating parental compliance?",
        "It leveraged his immense cultural credibility (Ethos) and moral authority to treat immunization as an urgent parental duty rather than an option",
        ["It made children believe he was an astronaut from Mars",
         "It reduced the cost of polio vaccine manufacturing",
         "It allowed the government to cancel all national holidays"],
        "Bachchan's emotional authority (Ethos/Pathos) commanded deep respect, framing vaccination as a non-negotiable moral responsibility."),
    case_q("Campaign Planning", "Action Stage Conversion",
        "How was the final 'Action' stage in the AIDA hierarchy facilitated on the ground?",
        "By setting up accessible local polio booths, yellow booth markers, and mobilizing ASHA community health workers for house-to-house visits",
        ["By forcing parents to purchase lottery tickets",
         "By dropping medical leaflets from military helicopters",
         "By shutting down electrical grids on Sundays"],
        "Action was made effortless by widespread neighborhood polio booths, mobile teams, and ASHA worker tracking."),
    case_q("Campaign Planning", "Historic Public Health Outcome",
        "What historic public health triumph did the integrated Pulse Polio social marketing campaign achieve in 2014?",
        "The World Health Organization (WHO) officially certified India as completely free of wild poliovirus transmission",
        ["India declared polio to be an incurable disease",
         "The government banned all pharmaceutical vaccinations",
         "The United Nations moved its headquarters to New Delhi"],
        "India achieved official WHO certification as a polio-free nation in March 2014, a landmark public health communication victory.")
]

P2_M11_TXT = (
    "Read the following historical case study on participatory development broadcasting and answer the questions that follow:\\n\\n"
    "In 1956, UNESCO and All India Radio conducted a landmark communication experiment in 150 villages across the Pune (Poona) district of "
    "Maharashtra, establishing the 'Radio Rural Forum' (Radio Farm Forum). Designed to overcome mass rural illiteracy and top-down bureaucratic apathy, "
    "each participating village formed a listening-cum-discussion group consisting of 20 active villagers, led by a local convener and chairman. "
    "Twice a week, All India Radio's Pune station broadcast a specialized 30-minute agricultural program focusing on practical farming problems: "
    "rat extermination, compost pits, poultry farming, and women's health. The foundational methodology followed a disciplined tripartite cycle: "
    "'Listen, Discuss, Act'. Immediately following the broadcast, the forum members engaged in animated collective discussions, debating how to adapt "
    "the advice to local village realities. Questions and local feedback were recorded by the convener and dispatched back to the AIR Pune station, "
    "which answered them in subsequent broadcasts. Independent evaluations by social scientists proved that the forums stimulated unprecedented "
    "communal action, agricultural modernization, and democratic village decision-making."
)
P2_M11_QS = [
    case_q("Development Communication", "Pune Radio Rural Forum Year & Sponsor",
        "When and with which international agency's support was the historic Radio Rural Forum experiment conducted in Pune?",
        "In 1956, sponsored by UNESCO in collaboration with All India Radio",
        ["In 1927, sponsored by the British Broadcasting Corporation (BBC)",
         "In 1982, sponsored by the International Olympic Committee",
         "In 2000, sponsored by the World Bank"],
        "The Pune Radio Rural Forum was launched in 1956 as a collaborative developmental experiment between UNESCO and All India Radio."),
    case_q("Development Communication", "Core Operational Methodology",
        "What was the tripartite operational cycle followed by the village listening forums during the Pune experiment?",
        "'Listen, Discuss, Act'",
        ["'Hear, Forget, Disregard'", "'Transmit, Record, Broadcast'", "'Command, Obey, Punish'"],
        "The Radio Rural Forum formula was anchored in 'Listen, Discuss, Act'—turning broadcast listening into communal participatory action."),
    case_q("Development Communication", "Overcoming the Literacy Barrier",
        "How did the Radio Rural Forum overcome the profound barrier of rural illiteracy in 1950s India?",
        "By utilizing the oral broadcast medium of radio and facilitating group interpersonal discussions in the local Marathi dialect",
        ["By forcing all villagers to learn written English in two weeks",
         "By printing technical scientific encyclopedias for every home",
         "By distributing computerized laptop computers to farmers"],
        "Radio's oral nature bypassed illiteracy, allowing villagers to absorb expert advice and debate decisions in their native dialect."),
    case_q("Development Communication", "Feedback Loop Mechanism",
        "How did the Pune Radio Rural Forum establish two-way symmetrical communication between farmers and broadcasters?",
        "Villagers sent written questions and local feedback via postal letters back to AIR Pune, which answered them in subsequent broadcasts",
        ["Broadcasters flew to Paris to discuss farming with European professors",
         "Farmers communicated with the studio using laser satellite beams",
         "Feedback was prohibited to ensure government commands were obeyed"],
        "The postal feedback loop between village conveners and AIR producers created a dynamic two-way dialogue rather than top-down propaganda."),
    case_q("Development Communication", "Historical Legacy of Radio Forums",
        "What lasting impact did the 1956 Pune experiment leave on international development communication theory?",
        "It proved globally that mass media achieves maximum developmental adoption when integrated with organized interpersonal peer group discussion",
        ["It proved that radio is completely useless in agricultural villages",
         "It proved that television should immediately replace all radio stations",
         "It proved that farmers prefer listening to classical opera"],
        "The Pune experiment demonstrated that combining mass broadcast media with organized interpersonal peer discussion accelerates social change.")
]

# ==============================================================================
# MOCK 12 PASSAGES
# ==============================================================================
P1_M12_TXT = (
    "Read the following theoretical analysis on relational communication and balance theory and answer the questions that follow:\\n\\n"
    "In 1953, social psychologist Theodore Newcomb published 'An Approach to the Study of Communicative Acts', formulating the ABX Model of "
    "Communication. Rooted in Fritz Heider's balance theory, Newcomb shifted focus away from linear transmission efficiency toward the relational "
    "dynamics between two communicators (A and B) regarding an external object, topic, or third person (X). Newcomb hypothesized that humans have an "
    "inherent psychological drive toward 'Symmetry' (cognitive balance). When Person A and Person B share strong mutual positive regard, but discover "
    "they hold diametrically opposing attitudes toward topic X (e.g. two close political allies disagreeing over a proposed coalition policy), "
    "'Strain toward Symmetry' occurs. This psychological discomfort compels A and B to communicate intensively—exchanging information, negotiating "
    "meaning, and attempting to persuade one another—to either align their attitudes on X, modify their mutual attraction, or agree to disagree. "
    "Jack McLeod and Steven Chaffee later expanded Newcomb's model into 'Co-Orientation Theory', introducing quantitative metrics for Agreement, "
    "Congruency, and Accuracy in public communication."
)
P1_M12_QS = [
    case_q("Relational Models", "Newcomb's ABX Model Pioneer",
        "Who formulated the ABX Model of Communication in 1953 based on balance theory?",
        "Theodore Newcomb",
        ["David Berlo", "Wilbur Schramm", "Claude Shannon"],
        "Theodore Newcomb introduced the ABX balance model of communicative acts in 1953."),
    case_q("Relational Models", "Core Components of ABX",
        "In Newcomb's model, what do the three nodes 'A', 'B', and 'X' represent?",
        "A and B represent the two communicating individuals; X represents the external object, issue, topic, or third person in their social environment",
        ["A represents the Antenna; B represents the Battery; X represents the Transmitter",
         "A represents Advertising; B represents Broadcasting; X represents Xerox printing",
         "A represents the Actor; B represents the Director; X represents the Movie Box Office"],
        "Newcomb's triad maps the orientations of two communicators (A and B) toward each other and toward a mutual topic (X)."),
    case_q("Relational Models", "Strain toward Symmetry Engine",
        "What triggers 'Strain toward Symmetry' in Newcomb's communicative framework?",
        "When two individuals with strong mutual affection discover they hold sharply conflicting attitudes toward an important issue (X)",
        ["When an electrical cable snaps during a thunderstorm",
         "When a printer runs out of colored ink",
         "When two individuals who hate each other ignore each other completely"],
        "Asymmetry on an important topic between close peers creates psychological cognitive strain that motivates communication to restore balance."),
    case_q("Relational Models", "Function of Communication in ABX",
        "What is the primary psychological function of communication according to Theodore Newcomb?",
        "To serve as the mechanism through which communicators exchange information and persuade each other to restore cognitive symmetry and balance",
        ["To transmit binary mathematical digits at maximum speed",
         "To broadcast propaganda commands to passive crowds",
         "To record audio files on magnetic tape reels"],
        "Communication is the adaptive tool humans use to negotiate common orientation and maintain social-cognitive equilibrium."),
    case_q("Relational Models", "Co-Orientation Model Expansion",
        "How did McLeod and Chaffee expand Newcomb's ABX model into Co-Orientation Theory?",
        "By developing empirical measurement tools to evaluate Agreement, Congruency, and Accuracy in interpersonal and public opinion relationships",
        ["By inventing computerized social media algorithms",
         "By measuring the radio frequency modulation index in decibels",
         "By counting the number of letters printed on a newspaper page"],
        "McLeod and Chaffee formalized co-orientation into measurable variables: Agreement (actual similarity), Congruency (perceived similarity), and Accuracy.")
]

P2_M12_TXT = (
    "Read the following critical analysis on cinema studies and socio-political screenplays and answer the questions that follow:\\n\\n"
    "In the early 1970s, the Indian cinematic landscape was radically disrupted by the legendary screenwriting duo Salim Khan and Javed Akhtar "
    "(Salim-Javed). Responding to the turbulent socio-political realities of post-colonial India—marked by high unemployment, inflation, youth unrest, "
    "and rampant systemic corruption—Salim-Javed created the archetype of the 'Angry Young Man', immortalized by Amitabh Bachchan. Beginning with "
    "Prakash Mehra's 'Zanjeer' (1973) and culminating in Yash Chopra's 'Deewaar' (1975), the duo shattered the romantic, soft-spoken hero tradition "
    "of the 1960s (personified by Rajesh Khanna). In Deewaar, Amitabh Bachchan played Vijay Verma, an impoverished dockworker who turns to smuggling "
    "after the legal establishment fails his family, contrasting with his righteous police officer brother Ravi (Shashi Kapoor). The film brilliantly "
    "externalized working-class rage against moralistic bourgeois hypocrisies, highlighted by iconic dialogue confrontations ('Mere paas maa hai'). "
    "The Angry Young Man functioned as a potent cultural safety valve, channeling the profound public disillusionment with the promises of the post-independence state."
)
P2_M12_QS = [
    case_q("Cinema Studies", "Screenwriting Architects of Angry Young Man",
        "Which legendary screenwriting duo conceptualized and penned the 'Angry Young Man' archetype in 1970s Hindi cinema?",
        "Salim Khan and Javed Akhtar (Salim-Javed)",
        ["K. A. Abbas and Sahir Ludhianvi",
         "Gulzar and Bimal Roy",
         "Raj Kapoor and Shankar-Jaikishan"],
        "Salim-Javed revolutionized commercial screenwriting, creating the Angry Young Man persona for Amitabh Bachchan."),
    case_q("Cinema Studies", "Breakthrough Film of the Persona",
        "Which 1973 film, directed by Prakash Mehra, inaugurated Amitabh Bachchan's breakthrough as the Angry Young Man Inspector Vijay?",
        "Zanjeer",
        ["Anand", "Sholay", "Don"],
        "Zanjeer (1973) launched the Angry Young Man persona, shattering romantic conventions with raw, brooding moral fury."),
    case_q("Cinema Studies", "Socio-Political Resonance in the 1970s",
        "What broader historical and political context in 1970s India gave the Angry Young Man immense cultural resonance?",
        "Widespread socio-economic crises: acute youth unemployment, soaring inflation, and disillusionment with corrupt institutional governance",
        ["The arrival of the internet in rural villages",
         "The invention of color television broadcasting across India",
         "The establishment of the first radio club in Bombay"],
        "The Angry Young Man resonated because he channeled working-class fury against systemic state failures and economic hardship."),
    case_q("Cinema Studies", "Deewaar (1975) Moral Conflict",
        "In Yash Chopra's 'Deewaar' (1975), what foundational conflict forms the dramatic core between brothers Vijay and Ravi?",
        "The clash between the outlaw smuggler who rejects systemic hypocrisy (Vijay) and the righteous police officer upholding legal duty (Ravi)",
        ["A rivalry over who can compose the best classical sitar music",
         "A legal dispute regarding ownership of a cricket stadium",
         "A competition to win an Olympic gold medal in sprinting"],
        "Deewaar dramatizes the moral rift between the extra-legal outlaw serving his family and the state police officer serving constitutional law."),
    case_q("Cinema Studies", "Iconic Dialogue Exchange",
        "In Deewaar's legendary confrontation scene, what iconic counter-line does Ravi (Shashi Kapoor) deliver to Vijay's boast of wealth?",
        "'Mere paas maa hai.' ('I have mother.')",
        ["'I have five million dollars.'",
         "'The law will never catch you.'",
         "'I own five luxury sports cars.'"],
        "The line 'Mere paas maa hai' is celebrated as the supreme emotional punchline in Indian cinematic screenwriting history.")
]

# ==============================================================================
# MOCK 13 PASSAGES
# ==============================================================================
P1_M13_TXT = (
    "Read the following investigative journalism case analysis and answer the questions that follow:\\n\\n"
    "In April 1987, Swedish public radio (Dagens Eko) broadcast a shocking investigative dispatch alleging that Swedish arms manufacturer AB Bofors "
    "had paid massive kickbacks into secret Swiss bank accounts to secure a Rs. 1,437-crore contract to supply 410 Howitzer field guns to the Indian Army. "
    "In India, investigative journalist Chitra Subramaniam, based in Geneva, working alongside N. Ram, associate editor of 'The Hindu', pursued an "
    "extraordinary document-based investigation. Over two years, Subramaniam cultivated European whistleblowers and obtained thousands of leaked banking "
    "records, coded telexes, diary notes, and secret commission agreements proving that Bofors had paid over Rs. 64 crores in bribes to influential "
    "middlemen (such as Ottavio Quattrocchi and Win Chadha) linked to Prime Minister Rajiv Gandhi's political circle. Despite immense government intimidation, "
    "official denials, and threats under the Official Secrets Act, The Hindu systematically published facsimile reproductions of the incriminating "
    "documents. The Bofors scandal transformed Indian political history, proving the decisive power of document-driven investigative journalism to shake "
    "national governments and alter general elections (the 1989 defeat of the Congress government)."
)
P1_M13_QS = [
    case_q("Investigative Journalism", "Original Whistleblower Broadcast",
        "Which international media outlet originally broke the news of the Bofors defense kickbacks in April 1987?",
        "Swedish Public Radio (Dagens Eko)",
        ["The Washington Post", "BBC World Service", "All India Radio"],
        "Swedish public radio (Dagens Eko) broke the initial story regarding Bofors kickbacks in April 1987."),
    case_q("Investigative Journalism", "Key Indian Investigative Journalists",
        "Which investigative reporters led the relentless document-based investigation for 'The Hindu' that exposed the Bofors money trails?",
        "Chitra Subramaniam and N. Ram",
        ["Bob Woodward and Carl Bernstein",
         "James Augustus Hicky and Warren Hastings",
         "Ameen Sayani and Melville de Mellow"],
        "Chitra Subramaniam (in Geneva) and N. Ram (in Chennai) spearheaded the landmark Bofors documentary investigation for The Hindu."),
    case_q("Investigative Journalism", "Documentary Proof Strategy",
        "Why was The Hindu's decision to publish facsimile photocopies of secret Swiss banking telexes and payment agreements legally decisive?",
        "Because documentary proof provided incontrovertible, undeniable evidence that refuted the government's official claims of zero kickbacks",
        ["Because photocopies filled empty column space quickly",
         "Because Swedish banking laws require all telexes to be published on front pages",
         "Because the newspaper was testing its new offset printing press"],
        "Publishing documentary facsimiles provided unassailable primary evidence that withstood legal denial and government stonewalling."),
    case_q("Investigative Journalism", "Official Secrets Act Intimidation",
        "What legal challenge did investigative journalists confront when reporting on sensitive defense procurement contracts?",
        "Threats of criminal prosecution under the colonial-era Official Secrets Act (OSA) 1923 for possessing unauthorized defense documents",
        ["Copyright lawsuits filed by Swedish textbook publishers",
         "Penalties for writing in the English language",
         "Loss of driving licenses under the Motor Vehicles Act"],
        "Governments weaponized the 1923 Official Secrets Act to threaten journalists reporting on defense corruption."),
    case_q("Investigative Journalism", "Democratic Political Impact",
        "What was the monumental political fallout of the Bofors investigative disclosures in the 1989 Indian General Elections?",
        "It decimated the incumbent Rajiv Gandhi government's massive parliamentary majority, ushering in the National Front government under V. P. Singh",
        ["It caused the permanent abolition of the Indian Army",
         "It resulted in the immediate shutdown of all Indian newspapers",
         "It forced Sweden to become a state of the Republic of India"],
        "The Bofors revelations turned political corruption into the central election issue, leading to the defeat of the Rajiv Gandhi administration in 1989.")
]

P2_M13_TXT = (
    "Read the following technical case review on television studio engineering and live production direction and answer the questions that follow:\\n\\n"
    "Inside the Production Control Room (PCR) of a 24-hour national news network, a live prime-time news broadcast is in progress. The control room "
    "is dimly lit, dominated by a massive multi-viewer monitor wall displaying feeds from studio cameras (Cameras 1, 2, and 3), video playback servers, "
    "remote LiveU field units, and character generator (CG) graphic templates. The Television Director sits alongside the Technical Director (Vision Mixer), "
    "leading the show. Wearing an intercom headset, the Director monitors the scrolling rundown software and calls the cuts: 'Ready Camera One, Ready "
    "Lower Third Super... Take One, Cue Anchor!'. The Vision Mixer instantly depresses the cross-point buttons on the switcher console, cutting seamlessly "
    "to the anchor. In the sound-insulated studio, Camera 1's red 'Tally Light' illuminates, alerting the anchor to face the lens, while the Floor Manager "
    "delivers a decisive non-verbal hand cue. When an unexpected breaking crisis occurs, the Producer uses the 'IFB' (Interruptible Foldback) to speak "
    "directly into the anchor's discrete earpiece, while the Master Control Room (MCR) downstream ensures uninterrupted playout to the satellite uplink."
)
P2_M13_QS = [
    case_q("Studio Operations", "Multi-Viewer Wall Function",
        "What is the operational function of the 'Multi-Viewer' monitor wall in the Production Control Room?",
        "To display simultaneous real-time visual feeds from all studio cameras, video servers, graphics engines, and remote lines on a single unified display",
        ["To play commercial cinema movies for control room employees to enjoy",
         "To provide electrical heat to the studio building during winter",
         "To test the color calibration of domestic consumer television sets"],
        "The multi-viewer lets the director and vision mixer preview all available visual inputs simultaneously to choose the next shot."),
    case_q("Studio Operations", "Division of Labor: Director vs Vision Mixer",
        "What is the operational division of labor between the Television Director and the Vision Mixer (Technical Director)?",
        "The Director calls the pacing, shot choices, and leads execution; the Vision Mixer physically operates the switcher console buttons to execute the cuts",
        ["The Director sweeps the floor; the Vision Mixer acts as the news anchor",
         "The Director fixes electrical wiring; the Vision Mixer writes the news script",
         "The Director drives the news van; the Vision Mixer manages commercial ads"],
        "The Director calls the creative commands ('Take Camera Two'); the Vision Mixer pushes the physical switcher console buttons to execute."),
    case_q("Studio Operations", "Role of the Camera Tally Light",
        "Why is the illuminated red 'Tally Light' atop Camera 1 essential for the news anchor during a multi-camera shoot?",
        "It signals to the anchor exactly which camera is currently live on air transmitting to viewers, ensuring eye contact with the active lens",
        ["It warns that the camera is overheating and about to shut down",
         "It indicates that the commercial break has begun",
         "It prompts the anchor to stop speaking immediately"],
        "Tally lights provide immediate visual feedback so presenters know precisely which camera to look at when cameras switch."),
    case_q("Studio Operations", "IFB System in Live Breaking News",
        "How does the 'IFB' (Interruptible Foldback) earpiece enable the producer to manage breaking news smoothly?",
        "It allows the producer in the PCR to talk directly into the anchor's ear while on air without the television audience hearing the instructions",
        ["It plays loud classical music to keep the anchor awake during night hours",
         "It translates the anchor's speech into foreign languages automatically",
         "It measures the anchor's body temperature and blood pressure"],
        "The IFB system provides a private audio channel for real-time producer-to-anchor directions during live broadcasts."),
    case_q("Studio Operations", "PCR vs MCR Boundary",
        "How does the operational mandate of the Master Control Room (MCR) differ from the Production Control Room (PCR)?",
        "The PCR directs the live studio show; the MCR manages overall 24/7 channel transmission playout, automated ad insertion, and satellite uplink feeds",
        ["The PCR handles digital web portals; the MCR prints paper newspapers",
         "The PCR is located on an airplane; the MCR is underground",
         "The PCR is operated by police; the MCR is operated by university students"],
        "PCR creates the program in the studio; MCR handles 24/7 master playout, commercial integration, and transmission to broadcast networks.")
]

# ==============================================================================
# MOCK 14 PASSAGES
# ==============================================================================
P1_M14_TXT = (
    "Read the following theoretical analysis on public opinion dynamics and digital communication and answer the questions that follow:\\n\\n"
    "In 1974, German political scientist Elisabeth Noelle-Neumann formulated the 'Spiral of Silence' theory to explain how public opinion is formed "
    "and perceived. Rooted in social psychology, the theory posits that human beings have an innate, subconscious fear of social isolation. To avoid "
    "ostracism, individuals possess a 'Quasi-Statistical Sense'—an internal cognitive radar that continuously scans their social environment and the mass "
    "media to gauge the prevailing opinion climate. When people perceive that their personal viewpoint is shared by the majority or is on the rise, they "
    "speak out confidently. Conversely, when individuals perceive that their viewpoint is in the minority or losing public support, they choose to remain "
    "silent. The mass media accelerates this spiral by granting disproportionate, vocal coverage to one dominant perspective, making it appear as the "
    "overwhelming social consensus. As dissenters self-censor and fall silent, the projected consensus appears even more unassailable, causing further "
    "silence to spiral downward. Only two groups consistently resist this silencing pressure: the 'Hard Core' (dogmatic believers immune to isolation) "
    "and the 'Avant-Garde' (artists and intellectuals committed to pioneering emergent future ideas)."
)
P1_M14_QS = [
    case_q("Public Opinion Theories", "Spiral of Silence Architect",
        "Who formulated the Spiral of Silence theory in 1974?",
        "Elisabeth Noelle-Neumann",
        ["Paul Lazarsfeld", "Harold Lasswell", "George Gerbner"],
        "Elisabeth Noelle-Neumann pioneered the Spiral of Silence theory at the University of Mainz in Germany."),
    case_q("Public Opinion Theories", "Psychological Engine of the Spiral",
        "What fundamental human psychological fear drives the Spiral of Silence?",
        "The innate fear of social isolation and public ostracism by one's peer community",
        ["The fear of physical darkness inside movie theatres",
         "The fear of electrical power outages during storms",
         "The fear of traveling on passenger airplanes"],
        "Noelle-Neumann identified the fear of isolation as the social engine prompting people to monitor consensus and self-censor."),
    case_q("Public Opinion Theories", "Quasi-Statistical Sense Definition",
        "What did Noelle-Neumann mean by the human 'Quasi-Statistical Sense'?",
        "The subconscious ability of individuals to estimate the distribution and momentum of public opinion in their society",
        ["A mathematical talent for calculating complex calculus equations in memory",
         "A skill possessed exclusively by university mathematics professors",
         "A computer software program installed in polling booths"],
        "Humans continually scan the media and social cues with a quasi-statistical sense to gauge prevailing opinion climates."),
    case_q("Public Opinion Theories", "Media Role in Accelerating Silence",
        "How does mass media coverage actively accelerate the Spiral of Silence?",
        "By providing vocal, ubiquitous coverage to one dominant viewpoint, creating the powerful illusion of a unanimous social consensus",
        ["By refusing to print any newspapers for six months",
         "By turning off all television broadcast towers at midnight",
         "By publishing articles exclusively in upside-down print"],
        "Media agenda setting and consensus projection amplify dominant viewpoints, intimidating dissenters into deeper self-censorship."),
    case_q("Public Opinion Theories", "The Hard Core and Avant-Garde",
        "Which two exceptional groups refuse to be silenced by the fear of social isolation in Noelle-Neumann's theory?",
        "The 'Hard Core' (uncompromising dogmatists) and the 'Avant-Garde' (visionary artists and reformist intellectuals)",
        ["Commercial advertising executives and fashion models",
         "Primary school children and retired military generals",
         "Television technicians and camera operators"],
        "The Hard Core (past-oriented dogmatists) and Avant-Garde (future-oriented visionaries) speak out regardless of isolation penalties.")
]

P2_M14_TXT = (
    "Read the following legal case analysis on film censorship and constitutional freedom of expression in India and answer the questions that follow:\\n\\n"
    "In India, the exhibition of cinematographic films is statutorily regulated by the 'Central Board of Film Certification' (CBFC), established under "
    "the Cinematograph Act, 1952. In the landmark constitutional challenge 'K. A. Abbas v. Union of India' (1970), celebrated director K. A. Abbas "
    "challenged the CBFC's demand for multiple cuts in his documentary 'A Tale of Four Cities', which depicted extreme economic contrasts between the wealthy "
    "and impoverished red-light districts of Bombay. Chief Justice M. Hidayatullah delivered a historic ruling upholding the constitutional validity of "
    "film censorship, reasoning that motion pictures possess a unique, immediate visual and acoustic impact on human emotions that differentiates cinema "
    "from static printed literature. However, the Supreme Court emphatically ruled that censorship guidelines must not be applied with prudish Victorian "
    "morality; artistic works must be judged in their entirety as a coherent whole rather than picking out isolated words or scenes out of context. "
    "Any restriction on cinema must strictly conform to the reasonable restrictions enumerated under Article 19(2) of the Constitution."
)
P2_M14_QS = [
    case_q("Film Law & Censorship", "Parent Statute of the CBFC",
        "Under which statutory enactment is the Central Board of Film Certification (CBFC) constituted in India?",
        "The Cinematograph Act, 1952",
        ["The Press Council Act, 1978", "The Copyright Act, 1957", "The Contempt of Courts Act, 1971"],
        "The CBFC is a statutory regulatory body operating under the Ministry of Information and Broadcasting pursuant to the Cinematograph Act 1952."),
    case_q("Film Law & Censorship", "K. A. Abbas Case Milestone (1970)",
        "Why is K. A. Abbas v. Union of India (1970) celebrated as the foundational judicial precedent on Indian film censorship?",
        "The Supreme Court upheld the constitutional validity of pre-censorship for cinema under Article 19(2) while mandating that artistic works be judged in their entirety",
        ["The court ordered all movie theatres in India to be permanently demolished",
         "The court declared that all documentary films must be banned across India",
         "The court abolished the Central Board of Film Certification completely"],
        "K. A. Abbas established that cinema can be pre-censored due to its visceral impact, but artistic works must be evaluated as an organic whole."),
    case_q("Film Law & Censorship", "Why Cinema is Treated Differently from Print",
        "According to Chief Justice Hidayatullah, why does motion picture cinema justify greater regulatory scrutiny than printed books?",
        "Because motion pictures combine moving visual imagery and synchronized sound, exerting a far more visceral, immediate emotional impact on viewers",
        ["Because movie tickets cost more money than printed newspapers",
         "Because film celluloid plastic is flammable and dangerous",
         "Because cinema audiences are forbidden from wearing eyeglasses"],
        "The court held that motion pictures exert a profound, instantaneous emotional hold on the human senses, distinguishing film from print."),
    case_q("Film Law & Censorship", "The 'Work as a Whole' Doctrine",
        "What did the Supreme Court mandate regarding how censorship authorities must evaluate controversial scenes or dialogue?",
        "The film must be judged as a coherent aesthetic whole in its broader artistic context, rather than extracting isolated scenes or phrases out of context",
        ["Inspectors must count the exact number of vowels spoken in the script",
         "Censors must cut every scene where an actor raises their voice",
         "Censors must only watch the film with the sound turned completely off"],
        "Censorship cannot judge films by isolated fragments; the overall social, moral, and artistic message of the entire work must govern."),
    case_q("Film Law & Censorship", "Constitutional Anchorage of Censor Grounds",
        "Under what constitutional provision must all CBFC film certification guidelines strictly anchor their restrictions?",
        "Article 19(2) of the Indian Constitution (reasonable restrictions on freedom of speech and expression)",
        ["Article 356 (President's Rule in States)",
         "Article 370 (Temporary Provisions)",
         "Article 110 (Definition of Money Bills)"],
        "The Supreme Court ruled that CBFC guidelines are valid only to the extent that they strictly mirror the permissible restrictions of Article 19(2).")
]

# ==============================================================================
# MOCK 15 PASSAGES
# ==============================================================================
P1_M15_TXT = (
    "Read the following technical case review on audio engineering and field sound recording and answer the questions that follow:\\n\\n"
    "During an outdoor investigative field assignment covering a monsoon flood rescue in a torrential rainstorm, a television sound recordist must "
    "make critical acoustic hardware choices. The reporter carries a rugged 'Dynamic Microphone' with a cardioid polar pattern for stand-up reporting. "
    "Unlike delicate studio condenser microphones, the dynamic mic utilizes a moving coil inside a magnetic field that requires no external phantom power "
    "and withstands extreme humidity, water splashes, and high sound pressure levels without overloading. However, powerful gusting wind generates "
    "turbulent air pressure across the microphone diaphragm, producing massive low-frequency rumble. To eliminate this, the sound engineer slips a "
    "specialized multi-layered faux-fur windscreen (colloquially called a 'Deadcat' or Windjammer) over the microphone blimp and engages an 80-Hz "
    "'High-Pass Filter' (Low-Cut filter) on the audio mixer. To connect the microphone to the field recorder over a 20-meter cable run alongside electrical "
    "generator cables, the engineer uses a three-pin 'Balanced XLR Cable', relying on differential signaling and common-mode rejection to phase-cancel "
    "any electromagnetic hum induced along the cable."
)
P1_M15_QS = [
    case_q("Sound Engineering", "Dynamic vs Condenser in Field Work",
        "Why did the sound recordist select a Dynamic Microphone rather than a studio Condenser Microphone for the storm assignment?",
        "Dynamic microphones are rugged, passive (no phantom power required), and highly resistant to moisture, physical shocks, and overloading",
        ["Dynamic microphones are made of pure gold and float on water",
         "Condenser microphones can only record sounds that occur in outer space",
         "Dynamic microphones record audio exclusively in ultrasound frequencies"],
        "Dynamic moving-coil microphones are famously durable, tolerating extreme weather, moisture, and high decibels without needing power."),
    case_q("Sound Engineering", "Cardioid Polar Pattern Advantage",
        "Why was a Cardioid (Unidirectional) polar pattern chosen for the reporter's handheld microphone?",
        "It picks up the reporter's voice cleanly from the front while rejecting ambient wind and rain noise arriving from the rear",
        ["It captures sound equally from all 360-degree directions",
         "It only records audio when pointed directly at the sky",
         "It turns the microphone into a wireless television camera"],
        "The heart-shaped cardioid pickup isolates the speaker's vocal frequencies while rejecting 180-degree rear environmental noise."),
    case_q("Sound Engineering", "Wind Noise Countermeasure (Deadcat)",
        "What is the acoustic function of the faux-fur 'Deadcat' windscreen slipped over the microphone?",
        "The fur fibers diffuse and disrupt high-velocity turbulent wind gusts before they strike the diaphragm, preventing low-frequency wind thumps",
        ["It acts as a decorative pet for the reporter during stressful assignments",
         "It amplifies the reporter's voice by five hundred decibels",
         "It changes the language of the interview into French"],
        "Faux-fur windjammers create an acoustic boundary layer that dissipates wind turbulence before air velocity can strike the diaphragm."),
    case_q("Sound Engineering", "High-Pass Filter (Low-Cut) Role",
        "Why did the audio engineer engage an 80-Hz 'High-Pass Filter' on the field mixer?",
        "To cut off deep sub-audible low-frequency rumble (caused by wind, motor rumbles, and handling noise) while allowing human vocal frequencies to pass",
        ["To mute all human vocal speech completely",
         "To boost the treble frequencies until the audio screeches",
         "To convert the audio recording into a digital photograph"],
        "High-pass filters eliminate sub-bass rumbles (below 80 Hz) generated by handling and wind without damaging vocal frequencies."),
    case_q("Sound Engineering", "Balanced XLR Common-Mode Rejection",
        "How does a Balanced XLR three-pin cable eliminate electromagnetic interference along long field cable runs?",
        "It carries two identical audio signals with inverted polarity; when combined at the receiver, electromagnetic noise picked up along the cable is phase-cancelled",
        ["It uses three thick steel wires that physically block radio waves",
         "It runs on 10,000 volts of commercial alternating electric current",
         "It transmits sound through pressurized mineral water"],
        "Balanced XLR lines use differential signaling: subtracting inverted signals at the preamp cancels common-mode electromagnetic hum completely.")
]

P2_M15_TXT = (
    "Read the following case review on corporate communication and stakeholder relations and answer the questions that follow:\\n\\n"
    "In 2013, India made history by enacting Section 135 of the Companies Act 2013, becoming the first country in the world to statutorily mandate "
    "'Corporate Social Responsibility' (CSR) for qualifying profitable corporations. Under the statute, companies meeting specific financial thresholds "
    "(net worth >= Rs. 500 crore, turnover >= Rs. 1,000 crore, or net profit >= Rs. 5 crore) must establish a dedicated CSR Board Committee and spend at "
    "least 2% of their average net profits over the past three preceding financial years on approved social development activities listed in Schedule VII "
    "(eradicating poverty, rural education, maternal health, gender equality, environmental sustainability). A leading automotive conglomerate aligned "
    "its public relations strategy with its statutory CSR programs, establishing solar-powered skill training academies for rural women across backward "
    "districts. Through transparent annual CSR reporting, open stakeholder consultations, and third-party social impact audits, the company built profound "
    "reputational capital and community goodwill, demonstrating that authentic CSR is not mere promotional PR spin or corporate window-dressing, but a "
    "strategic imperative for long-term corporate citizenship and shared stakeholder value."
)
P2_M15_QS = [
    case_q("Public Relations & CSR", "Indian Statutory CSR Mandate",
        "Under Section 135 of the Companies Act 2013, what minimum statutory percentage of net profit must eligible Indian companies spend on CSR?",
        "At least 2% of the average net profits made during the three preceding financial years",
        ["At least 20% of gross annual corporate turnover",
         "At least 50% of the company's total stock market valuation",
         "Zero percentage (CSR in India is entirely voluntary)"],
        "Section 135 of the Indian Companies Act 2013 mandates a minimum 2% spend of average net profits on approved CSR activities."),
    case_q("Public Relations & CSR", "Schedule VII Permissible Activities",
        "Which of the following domains is an approved CSR activity under Schedule VII of the Indian Companies Act?",
        "Promoting rural education, gender equality, maternal healthcare, sanitation, and ecological sustainability",
        ["Financing election campaigns for partisan political parties",
         "Paying cash dividends to private corporate shareholders",
         "Purchasing luxury holiday homes for company directors"],
        "Schedule VII explicitly lists social development causes: poverty eradication, education, health, gender equity, and ecology."),
    case_q("Public Relations & CSR", "CSR vs Mere Promotional PR",
        "How is strategic, authentic Corporate Social Responsibility distinguished from superficial promotional PR (window-dressing)?",
        "Authentic CSR creates sustainable, measurable socio-economic value for community stakeholders; promotional PR merely seeks short-term publicity headlines",
        ["Authentic CSR is conducted solely in outer space",
         "Promotional PR requires companies to burn their profits",
         "Authentic CSR is illegal under international trade agreements"],
        "Authentic CSR delivers lasting community impact and shared value, unlike superficial PR spin that treats social causes as advertising gimmicks."),
    case_q("Public Relations & CSR", "Stakeholder Goodwill Benefit",
        "How does authentic CSR strengthen an organization's public relations resilience during times of unexpected operational crises?",
        "It builds an institutional reservoir of trust, public credibility, and stakeholder goodwill that cushions the brand's reputation during adversity",
        ["It guarantees that the company will never pay taxes again",
         "It prevents journalists from ever asking questions about the company",
         "It allows the company to double the retail prices of its products"],
        "A strong CSR track record earns emotional goodwill and public trust, creating a reputational buffer when crises strike."),
    case_q("Public Relations & CSR", "Governance and Transparency",
        "What governance requirement does Section 135 mandate to ensure corporate transparency and board oversight of CSR spending?",
        "Forming a dedicated Board-level CSR Committee and disclosing an itemized CSR Policy and annual report in the public Annual General Report",
        ["Hiring a foreign advertising agency to manage all company finances",
         "Keeping all CSR projects completely secret from the public and government",
         "Conducting CSR voting in municipal street elections"],
        "Section 135 mandates a Board CSR Committee and full public disclosure of CSR policies and spending in the annual report.")
]

# (Mocks 16 to 20 follow in part 2...)
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(header)

print(f"Written Mocks 11 to 15 to {out_path}")
