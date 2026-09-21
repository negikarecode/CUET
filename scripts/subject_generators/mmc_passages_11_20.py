import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import case_q

# ==============================================================================
# MOCK 11 PASSAGES
# ==============================================================================
P1_M11_TXT = (
    "Read the following case review on public health communication and campaign planning and answer the questions that follow:\n\n"
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
    "Read the following historical case study on participatory development broadcasting and answer the questions that follow:\n\n"
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
    "Read the following theoretical analysis on relational communication and balance theory and answer the questions that follow:\n\n"
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
    "Read the following critical analysis on cinema studies and socio-political screenplays and answer the questions that follow:\n\n"
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
    "Read the following investigative journalism case analysis and answer the questions that follow:\n\n"
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
    "Read the following technical case review on television studio engineering and live production direction and answer the questions that follow:\n\n"
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
    "Read the following theoretical analysis on public opinion dynamics and digital communication and answer the questions that follow:\n\n"
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
    "Read the following legal case analysis on film censorship and constitutional freedom of expression in India and answer the questions that follow:\n\n"
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
    "Read the following technical case review on audio engineering and field sound recording and answer the questions that follow:\n\n"
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
    "Read the following case review on corporate communication and stakeholder relations and answer the questions that follow:\n\n"
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

# ==============================================================================
# MOCK 16 PASSAGES
# ==============================================================================
P1_M16_TXT = (
    "Read the following case review on digital media convergence and audio storytelling and answer the questions that follow:\n\n"
    "In the autumn of 2014, WBEZ Chicago and the creators of public radio's 'This American Life' launched 'Serial', an investigative audio "
    "documentary hosted by journalist Sarah Koenig. Re-examining the 1999 murder of high school student Hae Min Lee and the conviction of her ex-boyfriend "
    "Adnan Syed, Serial became an unprecedented global cultural phenomenon, surpassing 100 million downloads in record time and single-handedly "
    "propelling podcasting from a niche tech hobby into the cultural mainstream. The triumph of Serial highlighted the revolutionary features of the "
    "digital podcast medium. Unlike linear broadcast radio, which is bound by rigid program grids, fixed clocks, and regional transmitter towers, "
    "podcasting operates through decentralized RSS (Really Simple Syndication) feeds, allowing asynchronous on-demand streaming and downloads. "
    "Listeners consumed Serial predominantly through personal headphones, forging an intense, private parasocial intimacy with Sarah Koenig's "
    "conversational investigative monologue. Furthermore, the serialized week-by-week narrative cliffhangers stimulated massive viral community "
    "sleuthing on internet forums like Reddit, demonstrating the power of digital convergence and participatory culture."
)
P1_M16_QS = [
    case_q("Digital Audio & Convergence", "Breakthrough Podcast Phenomenon",
        "Which investigative podcast series hosted by Sarah Koenig ignited the global mainstream podcasting explosion in 2014?",
        "Serial",
        ["Radiolab", "The Daily", "Hardcore History"],
        "Serial (2014) became the cultural breakthrough that launched modern podcasting into global mass adoption."),
    case_q("Digital Audio & Convergence", "Asynchronous On-Demand Nature",
        "How does podcasting fundamentally diverge from traditional linear broadcast radio in terms of listener access?",
        "Podcasting is asynchronous and on-demand, allowing listeners to download and listen at their personal convenience rather than at a fixed broadcast hour",
        ["Podcasting can only be listened to while standing inside a post office",
         "Broadcast radio requires listeners to purchase satellite dishes",
         "Podcasting is legally forbidden from using human spoken voices"],
        "Podcasting untethers audio from fixed schedule clocks, enabling personalized, on-demand asynchronous listening."),
    case_q("Digital Audio & Convergence", "Role of RSS Feed Architecture",
        "What open digital protocol enables automated syndication and delivery of podcast audio files to subscriber app directories?",
        "RSS (Really Simple Syndication) feed containing media enclosure tags",
        ["AM radio amplitude modulation waves", "Analog copper telephone telegraphy", "Physical magnetic cassette tapes"],
        "RSS feeds containing audio media enclosures automate episode distribution across competing podcatcher platforms."),
    case_q("Digital Audio & Convergence", "Psychological Intimacy of Headphone Listening",
        "Why did Serial cultivate unprecedented emotional intimacy and listener engagement compared to traditional radio loudspeakers?",
        "Headphone delivery funnels the conversational, unpolished human voice directly into the listener's head, creating an intensely private personal bond",
        ["The host used hypnosis sound frequencies banned by medical science",
         "Listeners were required to sit in soundproof bank vaults",
         "The podcast was broadcast in complete silence"],
        "Consuming audio via earphones eliminates environmental distractions, fostering deep parasocial intimacy with the narrator."),
    case_q("Digital Audio & Convergence", "Participatory Culture on Reddit",
        "How did the online audience reaction to Serial exemplify Henry Jenkins's concept of 'Participatory Culture'?",
        "Listeners did not passively consume the audio, but actively analyzed trial transcripts, drew crime scene maps, and debated theories on Reddit forums",
        ["Listeners bought physical stock shares in the radio station",
         "Listeners refused to speak to anyone who had not listened to the show",
         "Listeners launched commercial advertising campaigns in newspapers"],
        "Audiences actively co-created community discourse, crowdsourced evidence, and debated theories on Reddit, embodying participatory fandom.")
]

P2_M16_TXT = (
    "Read the following constitutional case analysis on press freedom and print regulation in India and answer the questions that follow:\n\n"
    "In 1972, the Government of India introduced the 'Import Policy for Newsprint (1972-73)' under the Essential Commodities Act 1955 and the Newsprint "
    "Control Order, imposing a rigid 10-page ceiling on daily newspapers and restricting page-level increases regardless of circulation growth. "
    "A consortium of leading newspaper publishing companies, led by Bennett Coleman & Co. (publishers of The Times of India), challenged the policy in the "
    "Supreme Court in 'Bennett Coleman & Co. v. Union of India' (1973). The government argued that newsprint was an imported scarce commodity and the "
    "page ceiling was an equitable economic measure to prevent commercial monopolies by big newspaper chains and help small vernacular dailies. "
    "Rejecting the government's defense in a historic 4:1 verdict, the Constitution Bench ruled that freedom of the press under Article 19(1)(a) encompasses "
    "both the volume of circulation and the content and number of pages. The court established that the state cannot use newsprint rationing as a backdoor "
    "vehicle to control editorial expression, dictate newspaper size, or stifle the vitality of the press, establishing that indirect commercial restraints "
    "that restrict speech violate Article 19(1)(a)."
)
P2_M16_QS = [
    case_q("Constitutional Media Law", "Bennett Coleman Case Year & Subject",
        "What governmental regulatory policy was challenged in the landmark 'Bennett Coleman & Co. v. Union of India' (1973) case?",
        "The Newsprint Control Order imposing a rigid 10-page ceiling and quota restrictions on daily newspapers",
        ["A law banning all television broadcasts across India",
         "The nationalization of all cinema theatres in Mumbai",
         "A statutory ban on printing in the English language"],
        "Bennett Coleman (1973) challenged the government's newsprint import policy and 10-page ceiling on newspapers."),
    case_q("Constitutional Media Law", "Government Defense Rationale",
        "What economic justification did the Union Government argue in defense of the newsprint page restriction?",
        "That newsprint was a scarce imported commodity requiring equitable rationing to prevent big newspaper monopolies and protect small papers",
        ["That paper ink was poisonous to human fingertips",
         "That reading newspapers caused traffic accidents on highways",
         "That all newspapers should be replaced with state telegrams"],
        "The government claimed newsprint rationing was an economic regulatory measure under the Essential Commodities Act to foster equality."),
    case_q("Constitutional Media Law", "Supreme Court Constitutional Holding",
        "What did the Supreme Court rule regarding the relationship between newsprint quotas and Article 19(1)(a)?",
        "Freedom of the press includes both circulation volume and the number of pages; the state cannot use material rationing to restrict newspaper size or speech",
        ["The government has unlimited power to censor any newspaper at will",
         "Newspapers are purely commercial commodities with zero free speech protection",
         "The Supreme Court declared newsprint illegal throughout India"],
        "The court held that page limits curtail speech; the government cannot use newsprint allocation as a tool of editorial control."),
    case_q("Constitutional Media Law", "Direct Effect Test in Press Freedom",
        "Which constitutional doctrine did the Supreme Court apply to evaluate whether the newsprint policy violated fundamental rights?",
        "The 'Direct Effect and Consequence Test' (judging the law by its direct operational impact on speech rather than its purported statutory label)",
        ["The Doctrine of Sovereign Immunity", "The Doctrine of Colorable Legislation", "The Doctrine of Severability"],
        "The court held that the direct effect and consequence of the 10-page ceiling was to muzzle the press, rendering the policy unconstitutional."),
    case_q("Constitutional Media Law", "Protection against Indirect Censorship",
        "Why is the Bennett Coleman ruling considered an indispensable shield for independent print journalism in India?",
        "It established that the government cannot achieve indirect censorship through administrative resource bottlenecks (newsprint quotas, import duties, ad cuts)",
        ["It granted journalists immunity from paying income tax",
         "It allowed newspapers to print on metallic gold foil",
         "It forced all government offices to buy daily newspapers"],
        "The judgment barred the executive from using economic controls, newsprint quotas, or commercial levers to indirectly muzzle editorial freedom.")
]

# ==============================================================================
# MOCK 17 PASSAGES
# ==============================================================================
P1_M17_TXT = (
    "Read the following theoretical analysis on film editing and Soviet montage cinema and answer the questions that follow:\n\n"
    "In 1925, Soviet filmmaker and theoretician Sergei Eisenstein directed 'Battleship Potemkin', commissioned to commemorate the 1905 Russian "
    "Revolution. Eisenstein rejected the bourgeois Hollywood aesthetic of 'Continuity Editing' (which sought smooth, invisible storytelling). "
    "Drawing upon Marxist dialectics (thesis + antithesis = synthesis), Eisenstein formulated 'Montage of Attractions' and the theory of 'Collision Montage'. "
    "Eisenstein argued that cinematic meaning and intellectual shock are generated not by linking matching scenes smoothly, but through the violent, "
    "dynamic collision of opposing, conflicting shots (clashes of screen direction, graphic mass, light and dark, and tempo). This aesthetic reached its "
    "zenith in the legendary 'Odessa Steps' sequence: the mechanical, geometric downward march of imperial Tsarist soldiers with fixed bayonets is "
    "violently juxtaposed against the chaotic, frantic upward flight of panicked civilian mothers and children, punctuated by the agonizing, kinetic "
    "downward descent of a baby carriage bouncing out of control down the stone stairs, provoking intense visceral shock and ideological revolutionary sympathy."
)
P1_M17_QS = [
    case_q("Film Theory", "Architect of Collision Montage",
        "Which pioneering Soviet filmmaker and theoretician formulated the theory of 'Collision Montage' in Battleship Potemkin (1925)?",
        "Sergei Eisenstein",
        ["Lev Kuleshov", "Dziga Vertov", "Vsevolod Pudovkin"],
        "Sergei Eisenstein developed the revolutionary theory of montage as the collision of dialectical visual forces in cinema."),
    case_q("Film Theory", "Marxist Dialectical Foundation",
        "What philosophical concept formed the intellectual foundation of Eisenstein's collision montage theory?",
        "Marxist Hegelian dialectics: Thesis colliding with Antithesis to produce an entirely new intellectual Synthesis in the viewer's mind",
        ["Freudian dream psychoanalysis", "Aristotelian classical rhetorical unities", "Cartesian mathematical geometry"],
        "Eisenstein viewed montage dialectically: two conflicting shots collide to synthesize an abstract concept in the audience's consciousness."),
    case_q("Film Theory", "Rejection of Hollywood Continuity",
        "How did Eisenstein's montage aesthetic fundamentally oppose classical Hollywood editing?",
        "Hollywood continuity editing aimed for invisible, seamless spatial smoothness; Eisenstein used jarring, visible collisions to shock and provoke",
        ["Hollywood used color film; Eisenstein used black-and-white",
         "Hollywood used actors; Eisenstein used only animated drawings",
         "Hollywood films had sound; Eisenstein refused to use music"],
        "Eisenstein rejected Hollywood's invisible continuity, using sharp rhythmic collisions and graphic contrasts to shock viewers into ideological awareness."),
    case_q("Film Theory", "The Odessa Steps Masterpiece",
        "What iconic visual juxtaposition makes the 'Odessa Steps' sequence the definitive masterclass of rhythmic and metric montage?",
        "The rhythmic, mechanical march of Tsarist boots and rifles descending steadily, contrasted against the frantic, chaotic flight of civilians and an orphaned baby carriage",
        ["A quiet romantic conversation between two lovers inside a horse-drawn carriage",
         "A comedic slapstick chase involving police officers slipping on banana peels",
         "An unedited five-minute static shot of an empty ocean harbour"],
        "The Odessa Steps contrasts the ruthless, mechanical geometric march of soldiers against human terror and the hurtling baby carriage."),
    case_q("Film Theory", "Eisenstein's Intellectual Montage",
        "In Eisenstein's taxonomy of five montage methods, what is 'Intellectual Montage'?",
        "Juxtaposing disparate, non-narrative visual metaphors to spark an abstract socio-political idea (e.g. cutting striking workers with a slaughtered bull)",
        ["Editing shots based strictly on their physical mathematical frame count",
         "Editing shots based on the volume of actor shouting",
         "A cut that occurs only when an actor blinks their eyes"],
        "Intellectual montage uses metaphorical visual collisions to convey abstract conceptual or political ideas directly to the intellect.")
]

P2_M17_TXT = (
    "Read the following case review on media framing and financial news coverage and answer the questions that follow:\n\n"
    "In September 2008, the collapse of Wall Street investment banking titan Lehman Brothers triggered the catastrophic Global Financial Crisis (GFC), "
    "plunging world markets into a severe recession. Media sociologists analyzing news coverage across national television networks and elite financial dailies "
    "documented how news organizations deployed distinct 'Framing' and 'Priming' mechanisms to define the crisis for the public. Applying Robert Entman's "
    "framing paradigm—which posits that to frame is to select some aspects of a perceived reality and make them more salient in a communicating text to define "
    "problems, diagnose causes, and suggest remedies—corporate business news initially framed the multi-billion-dollar government bank bailouts through a "
    "'Systemic Rescue Frame'. This narrative warned that banks were 'Too Big to Fail' and public capital injections were a patriotic necessity to prevent "
    "total economic apocalypse. In contrast, alternative investigative and populist media framed the crisis through an 'Accountability and Moral Hazard Frame', "
    "highlighting predatory subprime mortgage lending, Wall Street greed, executive bonuses, and regulatory capture. These conflicting frames primed public "
    "blame, ultimately fueling socio-political mass movements like Occupy Wall Street and triggering global financial regulatory reforms."
)
P2_M17_QS = [
    case_q("Media Framing", "Robert Entman's Framing Definition",
        "According to communication scholar Robert Entman, what are the primary functional tasks performed by a media 'Frame'?",
        "Defining problems, diagnosing causal forces, making moral judgments, and suggesting remedies through selective salience",
        ["Printing newspapers on waterproof synthetic paper",
         "Measuring the decibel volume of news anchors during debates",
         "Calculating the corporate tax liability of television networks"],
        "Entman defined framing as selecting aspects of reality to define problems, diagnose causes, evaluate morally, and suggest remedies."),
    case_q("Media Framing", "The 'Too Big to Fail' Frame",
        "How did mainstream financial media utilize the 'Systemic Rescue' frame during the 2008 banking crisis?",
        "By presenting multi-billion-dollar bank bailouts as an inescapable national rescue necessary to prevent total economic collapse",
        ["By arguing that banking should be permanently outlawed in America",
         "By claiming that the financial crisis was caused by space aliens",
         "By advising all citizens to bury their paper money in backyard gardens"],
        "The systemic rescue frame portrayed emergency public bank bailouts as an existential necessity to avert systemic financial catastrophe."),
    case_q("Media Framing", "The 'Moral Hazard' Counter-Frame",
        "What was the diagnostic focus of the alternative 'Accountability and Moral Hazard' frame?",
        "Highlighting predatory subprime lending, reckless Wall Street speculation, executive greed, and the unfairness of bailing out irresponsible bankers",
        ["Praising investment bankers as heroic national saviors",
         "Encouraging citizens to take out ten mortgages simultaneously",
         "Arguing that the stock market should operate 24 hours without rules"],
        "The moral hazard counter-frame attributed the crisis to predatory deregulation and banker greed, questioning why taxpayers bore the losses."),
    case_q("Media Framing", "Framing vs Agenda Setting",
        "How does 'Framing' conceptually extend beyond traditional First-Level Agenda Setting?",
        "Agenda setting tells the audience WHAT issue to think about; Framing shapes HOW the audience perceives, interprets, and assigns blame regarding that issue",
        ["Framing only exists in print media; agenda setting only exists on radio",
         "Agenda setting is an illegal crime; framing is a legal marketing technique",
         "Framing requires photography; agenda setting requires only numbers"],
        "First-level agenda setting dictates topic salience; framing (second-level) contextualizes the angle, moral evaluation, and causality of the topic."),
    case_q("Media Framing", "Political Mobilization Outcome",
        "What real-world grassroots social movement was catalyzed in 2011 by the media's populist moral-hazard framing of Wall Street greed?",
        "The 'Occupy Wall Street' protest movement (slogan: 'We are the 99%')",
        ["The Temperance Prohibition Movement", "The Luddite Machine-Breaking Movement", "The Industrial Factory Workers Strike of 1886"],
        "Media exposure of corporate bailouts versus citizen foreclosures fueled the populist Occupy Wall Street movement across global cities.")
]

# ==============================================================================
# MOCK 18 PASSAGES
# ==============================================================================
P1_M18_TXT = (
    "Read the following case review on corporate crisis public relations and ethical leadership and answer the questions that follow:\n\n"
    "In autumn 1982, pharmaceutical giant Johnson & Johnson faced the ultimate corporate catastrophe when seven people in the Chicago area died after "
    "ingesting Extra-Strength Tylenol capsules covertly laced with lethal potassium cyanide by an unknown extortionist. With Tylenol accounting for 35% "
    "of company profits and media hysteria erupting nationwide, CEO James Burke executed what is universally celebrated as the gold standard of crisis "
    "management. Guided by the company's 1943 corporate 'Credo'—which explicitly placed responsibility to 'doctors, nurses, patients, and mothers' ahead "
    "of shareholder profits—Burke took immediate, decisive action. Ignoring advice from the FBI and company lawyers who urged a localized response, "
    "Burke ordered an immediate nationwide recall of 31 million bottles of Tylenol (valued at over $100 million) and halted all advertising. "
    "Burke established total transparency: holding daily media conferences, offering a $100,000 reward for the killer, and communicating through a single "
    "spokesperson team. Within ten weeks, Johnson & Johnson designed and introduced the world's first triple-seal 'Tamper-Evident Packaging' (foil seals, "
    "shrink-bands), winning back public trust and fully restoring Tylenol's market dominance within a year."
)
P1_M18_QS = [
    case_q("Crisis Public Relations", "The 1982 Tylenol Crisis Context",
        "What catastrophic emergency confronted Johnson & Johnson in Chicago in the autumn of 1982?",
        "Seven individuals died after ingesting Tylenol capsules laced with lethal potassium cyanide by an unknown criminal",
        ["A factory explosion that destroyed the company headquarters",
         "A corporate accounting fraud that bankrupted the management board",
         "A nationwide strike by pharmaceutical delivery truck drivers"],
        "Seven innocent consumers died from cyanide-tainted Tylenol capsules, creating acute nationwide terror and an existential brand crisis."),
    case_q("Crisis Public Relations", "The Corporate Credo as Ethical North Star",
        "What historical document guided CEO James Burke's decisive decision-making during the Tylenol crisis?",
        "The 1943 Johnson & Johnson 'Credo', which explicitly prioritized consumer safety and patient welfare ahead of corporate profits",
        ["A secret marketing manual purchased from an advertising agency",
         "A judicial injunction issued by the United States Supreme Court",
         "A commercial insurance contract guaranteeing cash payouts"],
        "The company's founding Credo placed moral duty to patients, mothers, and consumers above financial gain, guiding ethical crisis choices."),
    case_q("Crisis Public Relations", "The Nationwide Recall Decision",
        "What bold, unprecedented operational decision did James Burke execute despite massive financial loss?",
        "Ordering an immediate nationwide recall and incineration of 31 million Tylenol bottles valued at over $100 million",
        ["Denying that anyone had died and suing the grieving families",
         "Blaming the local pharmacy stores and doubling retail prices",
         "Selling the tainted bottles at a discount in overseas markets"],
        "Burke executed an immediate, nationwide product recall of 31 million bottles, prioritizing public safety over short-term profits."),
    case_q("Crisis Public Relations", "Packaging Innovation Solution",
        "What transformative manufacturing innovation did Johnson & Johnson pioneer to permanently resolve tamper vulnerabilities?",
        "Triple-seal 'Tamper-Evident Packaging' (glued carton, plastic shrink neck band, and inner foil seal)",
        ["Packaging medicine bottles in solid cast-iron metal safes",
         "Selling medicine exclusively in liquid glass tubes with corks",
         "Delivering capsules by armed military postal guards"],
        "Johnson & Johnson developed tamper-evident packaging (foil seals and shrink bands), establishing modern pharmaceutical packaging safety standards."),
    case_q("Crisis Public Relations", "Crisis Management Rule Illustrated",
        "Why does the Tylenol case remain the supreme textbook model of professional crisis public relations?",
        "It demonstrated that immediate, transparent action prioritizing human safety over profits salvages institutional credibility and restores long-term trust",
        ["It proved that corporate spokespersons should lie to journalists during emergencies",
         "It showed that ignoring a crisis causes public panic to disappear automatically",
         "It proved that advertising agencies should run pharmaceutical companies"],
        "Decisive transparency, genuine consumer empathy, and structural safety innovations restored public faith and salvaged the multi-billion-dollar brand.")
]

P2_M18_TXT = (
    "Read the following technical case review on broadcast audience analytics and electronic ratings measurement in India and answer the questions that follow:\n\n"
    "In the multi-billion-dollar Indian television industry, commercial advertising rates are determined by audience ratings published weekly by the "
    "'Broadcast Audience Research Council' (BARC) India. Established as a joint industry body uniting broadcasters (IBDF), advertisers (ISA), and advertising "
    "agencies (AAAI), BARC replaced older legacy systems with state-of-the-art electronic 'Peoplemeters'. Installed in a statistically representative sample "
    "of over 50,000 households across diverse demographic strata, the Peoplemeter utilizes proprietary 'Audio Watermarking' technology (BARC-O-Meter). "
    "Every licensed television broadcaster embeds an inaudible acoustic numeric code within the audio broadcast stream. When a television set is turned on, "
    "the Peoplemeter's acoustic microphone continuously detects and logs these watermarks. Individual household members press personal assigned buttons on a "
    "remote control to register their age and gender presence. Metered data is transmitted encrypted over cellular networks to central servers, where "
    "algorithms calculate 'Television Rating Points' (TRP), Reach, and Time Spent Listening/Viewing (TSV), providing the transparent currency used by media "
    "planners to buy commercial ad slots."
)
P2_M18_QS = [
    case_q("Audience Measurement", "BARC India Governance Structure",
        "Which three major industry stakeholders jointly founded and govern the Broadcast Audience Research Council (BARC) India?",
        "Broadcasters (IBDF), Advertisers (ISA), and Advertising Agencies (AAAI)",
        ["The Ministry of Defence, Police Departments, and Intelligence Bureaus",
         "Foreign film studios, streaming platforms, and cinema owners",
         "University professors, student unions, and print editors"],
        "BARC is an industry joint venture uniting the Indian Broadcasting and Digital Foundation, Indian Society of Advertisers, and AAAI."),
    case_q("Audience Measurement", "Audio Watermarking Technology Principle",
        "How does the BARC Peoplemeter electronically identify which television channel is being watched in a panel household?",
        "By detecting and decoding an inaudible acoustic numeric watermark embedded directly into the television channel's broadcast audio stream",
        ["By recording continuous video surveillance of the family living room",
         "By measuring the household electrical power bill at the end of the month",
         "By having field inspectors telephone the family every thirty minutes"],
        "Inaudible watermarks embedded in the channel's audio stream are automatically detected and decoded by the Peoplemeter hardware."),
    case_q("Audience Measurement", "Member Identification on Peoplemeter",
        "How does the Peoplemeter system capture demographic data regarding WHO in the household is watching a program?",
        "Household members register their presence by pressing their individually assigned demographic buttons on a dedicated remote control",
        ["The Peoplemeter uses facial recognition retina scans without consent",
         "The television refuses to turn on unless a passport is inserted",
         "A government clerk sits on the living room sofa taking written notes"],
        "Family members log in and out using personal remote control buttons, linking viewing durations to demographic profiles."),
    case_q("Audience Measurement", "TRP Definition & Commercial Role",
        "In television media buying, what is the operational significance of the 'Television Rating Point' (TRP)?",
        "It measures the percentage of a target demographic watching a program, serving as the trading currency that dictates commercial advertising rates",
        ["It measures the physical weight of a television screen in kilograms",
         "It calculates the annual income tax paid by television actors",
         "It determines the electrical wattage of the satellite dish"],
        "TRP measures target viewership percentages, serving as the commercial currency for pricing 10-second advertising spots."),
    case_q("Audience Measurement", "Vulnerability to Rating Manipulation",
        "Why have television rating systems faced intense controversies regarding sample tampering and rating rigging?",
        "Because panel sample sizes are small relative to the national population, bribing a tiny cluster of metered panel homes can artificially spike ratings",
        ["Because Peoplemeters are made of wood and break easily",
         "Because television sets only work during daylight hours",
         "Because satellites in space frequently lose their orbital trajectory"],
        "Tiny panel samples (tens of thousands of meters across a billion citizens) make systems vulnerable to corrupt bribery of panel homes.")
]

# ==============================================================================
# MOCK 19 PASSAGES
# ==============================================================================
P1_M19_TXT = (
    "Read the following case review on citizen journalism and disaster communication in India and answer the questions that follow:\n\n"
    "In August 2018, the southern Indian state of Kerala experienced its most catastrophic monsoon floods in nearly a century, with unprecedented "
    "rainfall filling 35 major dams and submerging entire towns under raging floodwaters. As conventional municipal telephone networks collapsed and "
    "mainstream television broadcast crews were trapped by landslides, 'Citizen Journalism' and crowdsourced social media coordination emerged as the "
    "primary emergency lifeline. Trapped citizens marooned on rooftops used smartphones to film harrowing first-person video dispatches, broadcasting "
    "their exact GPS coordinates and family distress calls over WhatsApp, Twitter, and Facebook Live. Tech-savvy citizen volunteer groups and university "
    "students across India built crowdsourced rescue portals (such as keralarescue.in), aggregating SOS coordinates, verifying medical emergencies, and "
    "routing verified distress data directly to Indian Navy helicopter pilots, military disaster relief teams, and the courageous fleet of coastal "
    "fishermen who mobilized 4,500 mechanized fishing boats to rescue over 65,000 marooned citizens, demonstrating the life-saving potential of participatory "
    "citizen media during extreme natural disasters."
)
P1_M19_QS = [
    case_q("Citizen Journalism", "Disaster Communication Lifeline",
        "How did citizen journalism function as a vital communication lifeline during the catastrophic 2018 Kerala floods?",
        "Marooned citizens used smartphones to broadcast live GPS coordinates, first-person distress videos, and SOS alerts when landlines collapsed",
        ["Citizens waited for government postal letters to arrive by foot",
         "Citizens used smoke signals and carrier pigeons to communicate",
         "Citizens shut off all mobile phones to save battery power"],
        "Smartphones and social platforms empowered stranded citizens to broadcast real-time GPS locations and visual distress evidence for rescue teams."),
    case_q("Citizen Journalism", "Crowdsourced Rescue Platforms",
        "What was the role of volunteer crowdsourced portals (such as keralarescue.in) during the flood disaster?",
        "Aggregating, filtering, and verifying raw citizen SOS distress calls, mapping GPS locations, and routing actionable data to rescue forces",
        ["Selling commercial advertising spots to international corporations",
         "Broadcasting comedy entertainment serials to flood victims",
         "Publishing fashion lifestyle blogs about rainwear"],
        "Crowdsourced volunteer platforms aggregated unstructured citizen social media cries into verified rescue coordination databases."),
    case_q("Citizen Journalism", "Fishermen as Grassroots Heroes",
        "Which traditional grassroots community was hailed as the 'Coastal Army' of Kerala, mobilizing 4,500 boats through social communication to rescue 65,000 people?",
        "Traditional coastal marine fishermen",
        ["Corporate advertising executives", "Television news anchors", "Commercial airline pilots"],
        "Kerala's coastal fishermen mobilized thousands of mechanized boats guided by citizen SOS coordinates to execute heroic mass rescues."),
    case_q("Citizen Journalism", "Verification Dilemma in Crisis UGC",
        "What major operational hazard confronted rescue coordinators evaluating raw citizen-generated social media reports?",
        "The viral spread of panic-inducing fake rumors, obsolete distress coordinates from days earlier, and fabricated SOS cries on WhatsApp",
        ["The refusal of rescue helicopters to operate during daylight",
         "The high cost of electricity inside university server rooms",
         "The absence of water in flooded rivers"],
        "User-generated crisis content often suffers from unverified rumors, panic, and expired distress coordinates requiring rigorous fact-checking."),
    case_q("Citizen Journalism", "Complementary Role to Mainstream Media",
        "How did citizen journalism interact with professional mainstream news organizations during the disaster?",
        "Citizen journalism provided raw, hyper-local, decentralized field footage from inaccessible locations, which mainstream media verified and broadcast nationally",
        ["Citizen journalists had all mainstream reporters arrested by police",
         "Mainstream newsrooms completely ignored the floods for three weeks",
         "Citizen journalists bought ownership of all satellite television networks"],
        "Citizen media complemented mainstream news by providing hyper-local first-person footage from zones cut off from professional crews.")
]

P2_M19_TXT = (
    "Read the following historical analysis on early Indian social cinema and the studio era and answer the questions that follow:\n\n"
    "In 1937, the celebrated Prabhat Film Company of Pune released 'Duniya Na Mane' (The Unexpected, made simultaneously in Marathi as 'Kunku'), directed "
    "by the visionary auteur V. Shantaram. Adapted from Narayan Hari Apte's novel 'Na Patnari Goshta', the film is hailed as a trailblazing masterpiece of "
    "early Indian social reform cinema and proto-feminist defiance. Rejecting the prevailing cinematic melodrama of submissive female victimhood, the film "
    "narrates the story of Nirmala (Shanta Apte), a spirited young orphan woman who is tricked by her greedy uncle into marrying Kakasaheb, a wealthy "
    "widower old enough to be her father. Upon discovering the patriarchal deception, Nirmala stages an unprecedented revolt: she refuses to consummate the "
    "marriage, defies traditional marital submissiveness, and confronts Kakasaheb with fearless moral dignity, compelling him to confront the moral "
    "grotesqueness of child-marriage and elder remarriage. Filmed with stark realism, acoustic naturalism without background mood music, and featuring "
    "Shanta Apte's fiery defiance—including her famous English song reciting Longfellow's 'A Psalm of Life'—the film stands as an enduring monument of "
    "courageous, progressive Indian cinema."
)
P2_M19_QS = [
    case_q("Early Cinema & Social Reform", "Director and Studio Milestone",
        "Who directed the 1937 social reform masterpiece 'Duniya Na Mane' (Kunku) at the Prabhat Film Company?",
        "V. Shantaram",
        ["Dadasaheb Phalke", "Ardeshir Irani", "Bimal Roy"],
        "V. Shantaram directed Duniya Na Mane (Kunku) in 1937, establishing Prabhat Film Company's reputation for fearless social realism."),
    case_q("Early Cinema & Social Reform", "Thematic Social Critique",
        "What regressive patriarchal social evil did Duniya Na Mane directly challenge and critique?",
        "The coercive practice of child-marriage, forced marriages of young women to elderly widowers, and systemic patriarchal oppression of orphans",
        ["The commercial export of Indian textiles to Europe",
         "The invention of steam-powered railway locomotives",
         "The high price of paper tickets at classical theatre plays"],
        "The film launched a blistering attack on elder-widower marriages, female subjugation, and the monetization of young women's lives."),
    case_q("Early Cinema & Social Reform", "Protagonist's Unprecedented Rebellion",
        "How does the young heroine Nirmala (Shanta Apte) radically break from contemporary melodramatic conventions of Indian cinema?",
        "She refuses to consummate the marriage, openly defies marital subservience, and asserts her autonomous moral dignity against patriarchal authority",
        ["She runs away to join a traveling circus troupe",
         "She poisons the entire village water reservoir in secret",
         "She accepts submissive victimhood and dies of consumption in silence"],
        "Nirmala's fierce refusal to consummate the forced marriage or bow to patriarchal authority was revolutionary in 1930s world cinema."),
    case_q("Early Cinema & Social Reform", "Acoustic Naturalism in Film Style",
        "What distinctive auditory aesthetic did V. Shantaram employ in Duniya Na Mane that broke with contemporary talkie tropes?",
        "Acoustic naturalism: eliminating artificial background orchestral mood music and relying strictly on realistic on-set sounds and natural silence",
        ["Recording all dialogue using electronic synthesizer synthesizers",
         "Having actors speak exclusively in rhyming Italian poetry",
         "Playing thirty loud movie songs in every single scene"],
        "Shantaram used acoustic realism without background melodrama music, letting spoken dialogue and environmental silences amplify dramatic tension."),
    case_q("Early Cinema & Social Reform", "Historic Cultural Significance",
        "Why is Duniya Na Mane celebrated as a foundational milestone of Indian progressive feminist cinema?",
        "It created cinema's first fiercely assertive, morally uncompromising female protagonist who challenges patriarchal hypocrisy without apologizing",
        ["It was the first Indian film to win five Academy Awards in America",
         "It was filmed entirely using underwater color photography",
         "It proved that silent cinema was superior to sound talkies"],
        "Duniya Na Mane gave Indian cinema an iconic feminist rebel who exposed marital hypocrisy, blazing a trail for progressive social cinema.")
]

# ==============================================================================
# MOCK 20 PASSAGES
# ==============================================================================
P1_M20_TXT = (
    "Read the following regulatory case review on digital telecommunications and cyber policy in India and answer the questions that follow:\n\n"
    "In 2015, social media giant Facebook (now Meta) launched 'Free Basics' (formerly Internet.org) in India in partnership with telecom operator Reliance "
    "Communications. Free Basics offered mobile smartphone users free, zero-rated data access to a curated, walled-garden bundle of select websites and "
    "services (including Facebook, Wikipedia, and AccuWeather), while charging standard data rates for accessing the rest of the open World Wide Web. "
    "The initiative ignited the fiercest digital policy debate in Indian history. Digital rights activists, startup entrepreneurs, and civil society groups "
    "(such as the SaveTheInternet.in coalition) mobilized millions of citizens, arguing that Free Basics fundamentally violated 'Net Neutrality'. "
    "Critics pointed out that zero-rating allowed telecom gatekeepers and tech monopolies to pick market winners and losers, creating a distorted, "
    "two-tiered internet where impoverished citizens were trapped inside Facebook's proprietary walled garden. In February 2016, the Telecom Regulatory "
    "Authority of India (TRAI) issued a historic regulatory order, 'Prohibition of Discriminatory Tariffs for Data Services Regulations, 2016', strictly "
    "forbidding telecom operators from offering differential pricing based on content, dealing a decisive global victory for the open, neutral internet."
)
P1_M20_QS = [
    case_q("Cyber Policy & Regulation", "Core Net Neutrality Battle (2015-16)",
        "Which proprietary zero-rated internet program launched by Facebook ignited India's historic Net Neutrality battle?",
        "Free Basics (Internet.org)",
        ["Google Fiber", "Airtel Broadband", "Doordarshan Digital"],
        "Facebook's Free Basics (Internet.org) proposed a curated, zero-rated suite of free websites, triggering the national net neutrality revolt."),
    case_q("Cyber Policy & Regulation", "Zero-Rating Concept Explained",
        "What is 'Zero-Rating' in mobile telecommunications pricing?",
        "The commercial practice where telecom operators exempt specific favored applications or websites from counting toward a user's data consumption limit",
        ["Charging consumers zero rupees for purchasing physical smartphones",
         "Reducing the speed of all internet connections to absolute zero",
         "A government tax imposed on zero-emission electrical vehicles"],
        "Zero-rating provides free data for select partnered websites while billing users for the rest of the open internet, distorting equal access."),
    case_q("Cyber Policy & Regulation", "The Walled Garden Threat",
        "Why did digital rights activists and Indian startups vigorously oppose Free Basics as a 'Walled Garden'?",
        "Because it positioned a single foreign tech monopoly as the gatekeeper of what information impoverished users could see, crushing independent startups",
        ["Because it required users to build physical brick walls around their homes",
         "Because it forced all computer screens to display floral garden flowers",
         "Because it banned the use of smartphones during nighttime hours"],
        "Critics argued Free Basics created a walled garden where tech monopolies controlled access, undermining open competition and digital sovereignty."),
    case_q("Cyber Policy & Regulation", "TRAI's Historic 2016 Regulatory Ruling",
        "What decisive regulatory order did the Telecom Regulatory Authority of India (TRAI) issue on February 8, 2016?",
        "Prohibition of Discriminatory Tariffs for Data Services Regulations, strictly banning differential pricing for data content",
        ["An order nationalizing all private social media platforms in India",
         "An order making internet usage illegal for citizens under thirty years of age",
         "An order allowing telecom operators to block all search engine websites"],
        "TRAI's 2016 landmark ruling barred telecom service providers from charging discriminatory data tariffs based on content, safeguarding Net Neutrality."),
    case_q("Cyber Policy & Regulation", "Global Significance of India's Ruling",
        "Why was India's TRAI Net Neutrality ruling celebrated internationally as a landmark triumph in global cyber governance?",
        "It established the strongest regulatory protection for an open, egalitarian internet in the developing world, rejecting corporate digital colonialism",
        ["It proved that India no longer needed electrical telecommunications cables",
         "It resulted in the immediate shutdown of all digital computers across Asia",
         "It made India the owner of the international satellite communications grid"],
        "India's ruling demonstrated that developing nations can resist Silicon Valley monopolies and defend an open, neutral, and competitive digital commons.")
]

P2_M20_TXT = (
    "Read the following investigative journalism case analysis on sting operations and journalistic ethics in India and answer the questions that follow:\n\n"
    "In March 2001, investigative journalism portal 'Tehelka.com', founded by Tarun Tejpal and Aniruddha Bahal, published 'Operation West End', a "
    "sensational undercover sting investigation that rocked the Indian political and defense establishment. Posing as representatives of a fictitious "
    "British defense manufacturing company ('West End International'), two Tehelka journalists spent eight months carrying concealed pinhole video cameras "
    "into military social clubs and political offices, seeking to sell non-existent thermal imaging equipment to the Indian Army. The sting captured "
    "explosive hidden-camera footage of senior army generals, defense ministry procurement officials, and the presidents of ruling political parties "
    "accepting bundles of cash bribes, gold chains, and liquor in exchange for promising defense procurement contracts. The exposé led to the resignation "
    "of Defense Minister George Fernandes and sparked parliamentary paralysis. However, the investigation triggered fierce ethical debates: critics "
    "accused Tehelka of active 'Entrapment'—manufacturing fake criminal temptations that would not have existed otherwise. In subsequent rulings, the "
    "Delhi High Court and the Press Council of India emphasized that sting operations involving undercover deception must be treated as an exceptional "
    "'Weapon of Last Resort', strictly justified only by overwhelming, genuine public interest where conventional investigative methods are impossible."
)
P2_M20_QS = [
    case_q("Journalistic Ethics", "Operation West End Investigators",
        "Which investigative news portal executed the historic 2001 defense procurement sting investigation 'Operation West End'?",
        "Tehelka.com (led by Tarun Tejpal and Aniruddha Bahal)",
        ["The Washington Post", "Doordarshan News", "All India Radio"],
        "Tehelka.com rocked the nation in 2001 by publishing Operation West End, exposing rampant corruption in defense procurement."),
    case_q("Journalistic Ethics", "Covert Sting Methodology Employed",
        "How did Tehelka journalists capture proof of corruption among senior army officers and political party presidents?",
        "By posing as fictitious defense equipment salesmen and recording bribe transactions using concealed pinhole spy video cameras",
        ["By hacking into military satellite computer servers from London",
         "By tapping official telephone lines without judicial warrants",
         "By interviewing defense ministers live on prime-time television"],
        "Reporters used undercover corporate disguises and concealed spy cameras to capture incriminating footage of bribe transactions."),
    case_q("Journalistic Ethics", "The Entrapment Ethical Dilemma",
        "What major ethical objection did critics and legal jurists raise against Tehelka's undercover sting tactics?",
        "The danger of 'Entrapment'—actively manufacturing artificial criminal temptations and inducements that might not have occurred organically",
        ["The fact that the cameras were made in Japan rather than India",
         "The complaint that the video footage was filmed in color rather than black-and-white",
         "The claim that journalists are legally required to wear military uniforms"],
        "Entrapment occurs when undercover reporters actively incite or tempt individuals into committing corrupt acts to capture them on camera."),
    case_q("Journalistic Ethics", "Press Council Norms on Sting Operations",
        "Under the Press Council of India's Norms of Journalistic Conduct, when is a clandestine sting operation ethically permissible?",
        "Only as an exceptional 'Weapon of Last Resort' where overwhelming public interest is at stake and all conventional investigative methods fail",
        ["Whenever a news channel needs higher TRP ratings on weekend evenings",
         "To spy on the private marital lives of ordinary private citizens",
         "To settle personal commercial disputes between business competitors"],
        "PCI norms strictly mandate that sting operations are permissible only as a last resort in grave matters of overriding public interest."),
    case_q("Journalistic Ethics", "Political Fallout of Operation West End",
        "What was the immediate political consequence of the Operation West End revelations in March 2001?",
        "The resignation of Union Defense Minister George Fernandes, party presidents, and the constitution of the Justice K. Venkataswami judicial inquiry",
        ["The immediate dissolution of the Indian Parliament for fifty years",
         "The permanent abolition of all commercial television news portals",
         "The declaration of an international military war against Britain"],
        "Operation West End forced the resignation of the Defense Minister, triggered major parliamentary upheaval, and led to a formal judicial commission of inquiry.")
]

# ==============================================================================
# PASSAGES_11_20 EXPORT LIST
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

assert len(PASSAGES_11_20) == 10, f"Expected 10 pairs, got {len(PASSAGES_11_20)}"
for idx, (p1, p2) in enumerate(PASSAGES_11_20, 11):
    assert len(p1[1]) == 5, f"Mock {idx} P1 has {len(p1[1])} Qs"
    assert len(p2[1]) == 5, f"Mock {idx} P2 has {len(p2[1])} Qs"

print(f"Mass Media Passages 11 to 20 compiled successfully: {len(PASSAGES_11_20)} pairs (20 passages, 100 questions).")
