import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import case_q

# ==============================================================================
# MOCK 1 PASSAGES
# ==============================================================================
P1_M1_TXT = (
    "Read the following case scenario on communication engineering and signal fidelity and answer the questions that follow:\n\n"
    "During a severe coastal tropical cyclone warning, an emergency district disaster management team attempts to broadcast life-saving "
    "evacuation alerts to fishing vessels at sea using high-frequency marine radio. The meteorologist at the control center acts as the "
    "information source, drafting an urgent 50-word evacuation bulletin. The radio transmitter converts the text message into an analog radio "
    "frequency signal. However, intense atmospheric lightning discharges and torrential rain introduce severe electrical static into the physical "
    "transmission channel. As a result, the captain of a motorized trawler receives heavily distorted audio with intermittent crackling hiss. "
    "Applying Claude Shannon and Warren Weaver's Mathematical Theory of Communication (1949), the disaster communications engineer recognizes "
    "that the rate of transmission has exceeded the noisy channel's capacity, increasing entropy (unpredictability). To overcome this channel noise, "
    "the engineer introduces structured linguistic redundancy by repeating critical geographic coordinates three times and spelling phonetically "
    "using the standard NATO phonetic alphabet (e.g., 'Alpha, Bravo, Charlie'), allowing the trawler crew to faithfully decode the message."
)
P1_M1_QS = [
    case_q("Communication Theory", "Shannon-Weaver Components",
           "In the coastal cyclone alert scenario, what entity functions as the 'Transmitter' in Shannon and Weaver's model?",
           "The marine radio equipment that converts the drafted message into an analog radio signal",
           ["The meteorologist who conceptualized the evacuation bulletin",
            "The fishing boat captain listening to the loudspeaker",
            "The ocean storm clouds and lightning discharges"],
           "In Shannon-Weaver, the transmitter encodes the message into a transmitted signal suitable for the channel."),
    case_q("Communication Theory", "Nature of Noise",
           "The crackling static caused by lightning discharges and torrential rain represents which category of noise?",
           "Physical / Channel noise",
           ["Semantic noise", "Psychological bias noise", "Syntactic ambiguity noise"],
           "Atmospheric electrical interference is physical/environmental noise that corrupts the signal in the transmission medium."),
    case_q("Communication Theory", "Entropy in Information Theory",
           "According to Claude Shannon, how does the severe static distortion affect the 'Entropy' of the received signal?",
           "It increases entropy by raising the uncertainty and unpredictability regarding the original message",
           ["It reduces entropy to absolute zero",
            "It converts all words into musical melodies",
            "It eliminates all need for audio decoding"],
           "Entropy in information theory measures uncertainty; high noise increases ambiguity and unpredictability in the signal."),
    case_q("Communication Theory", "Function of Redundancy",
           "Why did the engineer repeat the coordinates three times and use phonetic spelling?",
           "To add deliberate redundancy to counteract channel noise and ensure accurate message reconstruction",
           ["To confuse competing fishing vessels in the ocean",
            "To waste broadcast battery power unnecessarily",
            "To test the musical singing ability of the radio operator"],
           "Redundancy combats noise in degraded channels by providing repeated, predictable cues that facilitate error correction."),
    case_q("Communication Theory", "Critique of Mathematical Model",
           "Why is Shannon and Weaver's linear model considered insufficient for understanding human crisis communication?",
           "Because it treats communication as a mechanistic one-way transmission of electrical signals, omitting psychological trauma, panic, and interactive emotional feedback",
           ["Because radio transmitters cannot be used during storms",
            "Because Claude Shannon worked exclusively as an agricultural farmer",
            "Because fishing boats are legally forbidden from listening to radio sets"],
           "The Shannon-Weaver model was engineered for signal efficiency, omitting human emotional, social, and reciprocal relational dynamics.")
]

P2_M1_TXT = (
    "Read the following historical excerpt on Indian print media and answer the questions that follow:\n\n"
    "On January 29, 1780, James Augustus Hicky published the inaugural issue of 'Hicky's Bengal Gazette' (also titled the 'Calcutta General Advertiser') "
    "from a small printing press in Calcutta, marking the birth of printed journalism in India. Billed proudly in its masthead as 'A Weekly Political and "
    "Commercial Paper, Open to all Parties, but influenced by None', the two-sheet newspaper carried shipping schedules, market prices, letters, and "
    "social gossip. However, Hicky quickly transformed his journal into a fearless, irreverent watchdog targeting the colonial British East India Company. "
    "He published scathing exposés and satirical doggerel accusing Governor-General Warren Hastings of bribery, despotic abuse of power, and favoritism, "
    "while alleging corrupt collusion between Hastings and Supreme Court Chief Justice Sir Elijah Impey. Enraged by the defiance of an ordinary tradesman, "
    "Hastings retaliated by revoking Hicky's postal mailing privileges, followed by multiple criminal libel lawsuits. Despite being imprisoned and his printing "
    "types seized in 1782, Hicky established the enduring historical precedent of the press functioning as an independent, adversarial fourth estate in India."
)
P2_M1_QS = [
    case_q("Print Media History", "First Indian Newspaper",
        "When and by whom was the first printed newspaper in India published?",
        "January 29, 1780, by James Augustus Hicky in Calcutta",
        ["August 15, 1857, by the British East India Company in Delhi",
         "January 26, 1950, by Mahatma Gandhi in Ahmedabad",
         "July 1, 1822, by Fardunjee Marzban in Bombay"],
        "Hicky's Bengal Gazette debuted on January 29, 1780, in Calcutta, founded by James Augustus Hicky."),
    case_q("Print Media History", "Editorial Stance of Bengal Gazette",
        "What was the stated motto and editorial posture inscribed on the masthead of Hicky's Bengal Gazette?",
        "'Open to all Parties, but influenced by None'",
        ["'In Service of the British Crown Alone'",
         "'Only Commercial Cargo Announcements'",
         "'Official Mouthpiece of the Governor-General'"],
        "Hicky declared his newspaper open to all parties but influenced by none, establishing editorial independence."),
    case_q("Print Media History", "Colonial Retaliation Tactics",
        "What was the immediate administrative measure Governor-General Warren Hastings took to suppress Hicky's distribution?",
        "Revoking Hicky's postal transmission privileges through the General Post Office",
        ["Buying all printing paper across Bengal",
         "Ordering the immediate execution of Hicky's family",
         "Promoting Hicky to the Supreme Court bench"],
        "Hastings revoked postal privileges to cut off Hicky's circulation to subscribers outside Calcutta before filing lawsuits."),
    case_q("Print Media History", "Nature of Hicky's Exposés",
        "Which prominent colonial officials were the primary targets of Hicky's investigative satires and allegations of corruption?",
        "Governor-General Warren Hastings and Chief Justice Sir Elijah Impey",
        ["Lord Macaulay and Lord Ripon",
         "Lord Curzon and Lord Lytton",
         "Queen Victoria and Prince Albert"],
        "Hicky relentlessly attacked Warren Hastings and Chief Justice Elijah Impey, accusing them of bribery, tyranny, and corrupt collusion."),
    case_q("Print Media History", "Historical Legacy of Hicky",
        "Why is James Augustus Hicky revered in the history of Indian mass media despite his imprisonment?",
        "He established the foundational precedent of an independent, adversarial press willing to challenge the highest imperial state authority",
        ["He invented the electrical telegraph in Bombay",
         "He served as Viceroy of India for thirty years",
         "He was the first Indian to write poetry in Sanskrit"],
        "Hicky's rebellion against Hastings laid the historic tradition of journalism as a courageous public watchdog holding rulers accountable.")
]

# ==============================================================================
# MOCK 2 PASSAGES
# ==============================================================================
P1_M2_TXT = (
    "Read the following case scenario on electoral communication and political sociology and answer the questions that follow:\n\n"
    "During the 1940 US Presidential election between Franklin D. Roosevelt and Wendell Willkie, sociologists Paul Lazarsfeld, Bernard Berelson, "
    "and Hazel Gaudet conducted an intensive longitudinal panel study in Erie County, Ohio, published as 'The People's Choice' (1944). "
    "At the time, prevailing media orthodoxy assumed the 'Hypodermic Needle' model, expecting radio speeches and newspaper advertisements to "
    "directly inject political attitudes into voters. However, repeated interviews with 600 voters revealed that few individuals were directly converted "
    "by mass media campaigns. Instead, voting decisions were heavily anchored in primary social groups (family, religion, class) and mediated by "
    "'Opinion Leaders'—trusted local community members, shopkeepers, or church elders who consumed higher volumes of mass media, interpreted "
    "the information, and shared political guidance through personal face-to-face conversations. This landmark discovery gave birth to the "
    "'Two-Step Flow of Communication' theory, establishing that interpersonal social networks often exert far greater influence than mass media alone."
)
P1_M2_QS = [
    case_q("Media Effects", "Erie County Study Milestone",
        "Which classic 1944 book by Lazarsfeld, Berelson, and Gaudet established the Two-Step Flow of Communication?",
        "The People's Choice",
        ["Public Opinion", "Manufacturing Consent", "The Gutenberg Galaxy"],
        "The People's Choice (1944) documented the Erie County study, introducing the Two-Step Flow hypothesis."),
    case_q("Media Effects", "Refutation of Hypodermic Model",
        "What popular media belief did the findings of 'The People's Choice' study decisively refute?",
        "The Hypodermic Needle theory assumption that mass media produces direct, uniform, and irresistible conversion of voters",
        ["The belief that citizens use telephone lines to communicate",
         "The idea that newspapers print in black ink",
         "The theory that voters prefer democracy over dictatorship"],
        "The study showed media rarely converts voters directly; interpersonal networks and pre-existing group loyalties mediate effects."),
    case_q("Media Effects", "Attributes of Opinion Leaders",
        "According to Lazarsfeld and Katz, what distinguishes 'Opinion Leaders' within their social circles?",
        "They consume more media, are socially active, and are perceived as trusted, accessible peers within their local social strata",
        ["They are wealthy national cabinet ministers holding state office",
         "They never converse with other human beings",
         "They are appointed by the Supreme Court to monitor neighborhood votes"],
        "Opinion leaders exist across all socioeconomic groups, characterized by higher media consumption and peer trust."),
    case_q("Media Effects", "The Two-Step Flow Mechanism",
        "In the Two-Step Flow model, what is the exact pathway of information transmission?",
        "From mass media to opinion leaders first, and from opinion leaders to less engaged peers via interpersonal networks",
        ["From voters directly to the television camera lens",
         "From print newspapers straight into underground telegraph cables",
         "From telephone operators to military defense satellites"],
        "Information flows in two steps: mass media -> opinion leaders -> general public through interpersonal interaction."),
    case_q("Media Effects", "Why Interpersonal Influence Prevailed",
        "Why did interpersonal communication from opinion leaders prove more persuasive than radio campaign broadcasts?",
        "Because personal conversations allow two-way flexibility, social trust, personal pressure, and immediate answers to specific voter doubts",
        ["Because radio speeches were transmitted in complete silence",
         "Because listening to radio broadcasts was prohibited by federal law",
         "Because opinion leaders carried firearms during conversations"],
        "Face-to-face interaction offers dynamic adaptability, personal trust, and reciprocal feedback that mass media cannot provide.")
]

P2_M2_TXT = (
    "Read the following case review on Indian media policy and institutional regulation and answer the questions that follow:\n\n"
    "In September 1952, the Government of Independent India appointed the First Press Commission under the chairmanship of Justice G. S. Rajadhyaksha "
    "to conduct a comprehensive survey of the newspaper industry. Delivering its landmark report in 1954, the Commission observed that while the press "
    "enjoyed constitutional freedom under Article 19(1)(a), there was an urgent necessity to prevent monopolistic ownership concentration, protect small "
    "and regional language newspapers, and uphold high professional ethics. The Commission recommended a triad of institutional reforms: first, the "
    "creation of the statutory 'Press Council of India' (PCI) as an autonomous, self-regulatory watchdog; second, the establishment of the 'Registrar of "
    "Newspapers for India' (RNI) under the PRB Act to verify title registrations and track circulation; and third, the enactment of the Working "
    "Journalists Act (1955) to establish statutory Wage Boards and protect journalists from economic exploitation. The Commission also proposed the "
    "'Price-Page Schedule' to prevent predatory price wars by industrial press barons against independent local dailies."
)
P2_M2_QS = [
    case_q("Press Commissions", "First Press Commission Chair",
        "Who chaired the First Press Commission of India, which submitted its landmark report in 1954?",
        "Justice G. S. Rajadhyaksha",
        ["Justice K. K. Mathew", "Justice P. B. Sawant", "Justice Markandey Katju"],
        "The First Press Commission was chaired by Justice G. S. Rajadhyaksha from 1952 to 1954."),
    case_q("Press Commissions", "Press Council Statutory Nature",
        "What was the core rationale for recommending the creation of the Press Council of India (PCI)?",
        "To establish an autonomous, quasi-judicial self-regulatory body to preserve press freedom and maintain professional journalistic standards",
        ["To run a commercial newspaper syndicate owned by the central government",
         "To sentence opposition journalists to state penal imprisonment",
         "To monitor television satellite frequencies in outer space"],
        "PCI was conceived as a self-regulatory statutory guardian protecting press freedom while upholding ethics without government censorship."),
    case_q("Press Commissions", "Registrar of Newspapers (RNI)",
        "What statutory mandate was assigned to the Registrar of Newspapers for India (RNI) following the Commission's report?",
        "Verifying newspaper title availability, maintaining the official national register of newspapers, and monitoring newsprint allocations",
        ["Drafting editorial opinion columns for regional language papers",
         "Manufacturing mechanical printing press equipment in state factories",
         "Hiring all working journalists in private newsrooms"],
        "RNI verifies titles, registers all print periodicals published in India, and oversees newsprint distribution."),
    case_q("Press Commissions", "Working Journalists Act 1955",
        "Why did the First Press Commission recommend the enactment of the Working Journalists Act of 1955?",
        "To provide statutory job security, regulate working conditions, and institute Wage Boards to protect journalists from low wages and arbitrary dismissal",
        ["To prohibit journalists from ever joining labor unions",
         "To force journalists to work seventy continuous hours without sleep",
         "To make journalism an unpaid voluntary hobby"],
        "The 1955 Act instituted statutory Wage Boards and protected journalists from economic exploitation by proprietors."),
    case_q("Press Commissions", "Price-Page Schedule Purpose",
        "What was the economic purpose of the 'Price-Page Schedule' recommended by the Commission?",
        "To link the retail price of a newspaper to the number of pages published, preventing deep-pocketed newspaper chains from undercutting smaller independent papers",
        ["To ensure all newspapers are sold for exactly one thousand rupees",
         "To force all newspapers to print exactly one page per day",
         "To tax newspapers based on the color of ink used"],
        "The Price-Page Schedule aimed to prevent predatory pricing by large chain newspapers to protect small, independent publishers from monopoly.")
]

# ==============================================================================
# MOCK 3 PASSAGES
# ==============================================================================
P1_M3_TXT = (
    "Read the following historical account of broadcast panic and media psychology and answer the questions that follow:\n\n"
    "On the evening of Halloween, October 30, 1938, Orson Welles and his Mercury Theatre on the Air broadcast a radio adaptation of H. G. Wells's "
    "'The War of the Worlds' over the CBS radio network. To modernize the Victorian novel, Welles staged the radio drama as a series of realistic, "
    "urgent breaking news bulletins interrupting an evening of dance band music. Announcers with trembling voices reported catastrophic meteoric explosions "
    "in Grover's Mill, New Jersey, followed by simulated eyewitness interviews describing towering Martian war machines incinerating state troopers with heat-rays. "
    "Despite four explicit on-air disclaimers stating the program was fictional drama, over a million listeners across the United States experienced acute panic. "
    "Families fled their homes in cars with wet towels over their faces to protect against 'poisonous Martian gas', while police switchboards were jammed. "
    "In 'The Invasion from Mars' (1940), psychologist Hadley Cantril analyzed the panic, discovering that listeners who tuned in late missed the introductory "
    "announcement, and individuals with lower formal education lacked the 'critical ability' to cross-check the claims on other stations, highlighting the "
    "immense psychological power of realistic radio news simulation."
)
P1_M3_QS = [
    case_q("Media Psychology", "War of the Worlds Dramatic Format",
        "What creative technique did Orson Welles use that caused thousands of listeners to mistake the radio drama for real news?",
        "Staging the drama as breaking live news bulletins and simulated on-scene eyewitness interviews interrupting ordinary music",
        ["Broadcasting exclusively in foreign Morse code",
         "Having the US President order everyone to leave their homes by telegram",
         "Hiring actors to physically knock on household front doors"],
        "Welles framed the drama as urgent breaking news bulletins, mimicking authentic disaster broadcasting formats."),
    case_q("Media Psychology", "Media Effect Paradigm Illustrated",
        "Historically, the mass panic provoked by the 1938 broadcast was cited by early media theorists as classic empirical evidence for:",
        "The Powerful Effects Paradigm (Hypodermic Needle / Magic Bullet theory)",
        ["The Minimal Effects / Limited Effects Paradigm",
         "The Uses and Gratifications active audience theory",
         "The Polysemic Cultural Studies theory"],
        "The panic was long cited as proof that broadcast media can inject instant, uniform terror into a passive, defenseless public."),
    case_q("Media Psychology", "Hadley Cantril's Research Finding",
        "In his landmark 1940 study, what did psychologist Hadley Cantril discover about the listeners who panicked?",
        "They lacked 'critical ability' to evaluate the claims, had high emotional susceptibility, and failed to check other radio stations",
        ["They had all visited planet Mars on space rockets earlier that morning",
         "They were all professional astronomers who saw real Martians through telescopes",
         "They had all read the script six months before the broadcast"],
        "Cantril found that panic correlated with lack of critical checking ability, late tuning-in, and pre-existing economic/war anxiety."),
    case_q("Media Psychology", "Role of Timeliness in Broadcast Panic",
        "Why did the late tune-in behavior of many listeners trigger the panic reaction?",
        "Because listeners who tuned in 10 minutes late missed the opening disclaimer stating the program was an artistic radio play",
        ["Because radio transmitters exploded 10 minutes after starting",
         "Because radio batteries only operated during the first half-hour",
         "Because Martian spaceships landed at the radio station"],
        "Listeners who tuned in mid-broadcast missed the fictional disclaimer and encountered realistic emergency news simulations."),
    case_q("Media Psychology", "Theatre of the Mind Application",
        "How does the War of the Worlds panic exemplify radio as the 'Theatre of the Mind'?",
        "Sound effects (heat-ray hisses, siren wails) and urgent spoken descriptions compelled listeners to vividly imagine alien monsters invading Earth",
        ["Listeners had to buy physical movie theatre tickets to hear the broadcast",
         "Actors wore physical monster masks inside the soundproof radio studio",
         "The broadcast caused television screens across New Jersey to display green aliens"],
        "Radio's acoustic cues prompted listeners' imaginations to paint catastrophic visual horrors in their own minds.")
]

P2_M3_TXT = (
    "Read the following case review on investigative journalism and constitutional accountability and answer the questions that follow:\n\n"
    "In June 1972, five men were arrested while breaking into the Democratic National Committee headquarters at the Watergate complex in Washington, D.C. "
    "Two young metro reporters for The Washington Post, Bob Woodward and Carl Bernstein, refused to dismiss the break-in as a third-rate burglary. "
    "Through relentless shoe-leather reporting, forensic audits of secret campaign finance slush funds, and confidential guidance from a high-level executive "
    "insider codenamed 'Deep Throat' (later revealed to be FBI Associate Director Mark Felt), the reporters exposed a systemic web of political espionage, "
    "illegal wiretapping, and perjury directed from the White House. Backed by executive editor Ben Bradlee and publisher Katharine Graham against intense "
    "subpoena threats and public attacks from the Nixon administration, The Washington Post rigorously corroborated every allegation with multiple independent "
    "sources before publication. The investigation sparked Congressional hearings, the revelation of secret Oval Office audio recordings, and culminated "
    "in the historic resignation of President Richard Nixon in August 1974, establishing investigative journalism as a formidable pillar of democratic accountability."
)
P2_M3_QS = [
    case_q("Investigative Journalism", "Watergate Key Reporters",
        "Which two Washington Post journalists conducted the landmark investigative investigation exposing the Watergate scandal?",
        "Bob Woodward and Carl Bernstein",
        ["Seymour Hersh and Neil Sheehan",
         "Joseph Pulitzer and William Randolph Hearst",
         "James Augustus Hicky and Warren Hastings"],
        "Woodward and Bernstein unraveled the Watergate conspiracy through relentless investigative reporting for The Washington Post."),
    case_q("Investigative Journalism", "Deep Throat's Real Identity",
        "Who was the confidential whistleblower source codenamed 'Deep Throat', revealed decades later in 2005?",
        "Mark Felt, Associate Director of the Federal Bureau of Investigation (FBI)",
        ["Henry Kissinger, US Secretary of State",
         "Richard Nixon, US President",
         "John Mitchell, Attorney General"],
        "In 2005, Mark Felt revealed he was Deep Throat, guiding Woodward to follow the money trail to the Oval Office."),
    case_q("Investigative Journalism", "Core Verification Methodology",
        "What rigorous journalistic rule did Ben Bradlee enforce before allowing Woodward and Bernstein to publish controversial allegations?",
        "Every single factual allegation had to be independently corroborated on-the-record by at least two separate sources",
        ["Reporters were required to guess facts using tarot cards",
         "Stories were published immediately based on anonymous internet rumors",
         "Reporters paid cash bribes to burglars for exclusive quotes"],
        "The Post enforced the gold standard rule: no confidential claim was published without independent verification from two separate sources."),
    case_q("Investigative Journalism", "Institutional Backing",
        "Why was publisher Katharine Graham's courageous stance vital to the success of the Watergate investigation?",
        "She withstood severe financial threats, legal intimidation, and license challenges from the White House, defending editorial independence",
        ["She wrote all news headlines in place of the editors",
         "She personally arrested the burglars inside the Watergate building",
         "She banned all reporters from entering the newspaper office"],
        "Katharine Graham's courage in shielding her newsroom against immense presidential pressure preserved editorial integrity."),
    case_q("Investigative Journalism", "Constitutional Impact of Watergate",
        "What was the ultimate historic outcome of the Watergate investigation in August 1974?",
        "The resignation of US President Richard Nixon, demonstrating that the press functions as a vital democratic watchdog holding rulers accountable",
        ["The permanent closure of The Washington Post by presidential decree",
         "The abolition of the United States Constitution",
         "The declaration of war against the Soviet Union"],
        "Watergate led to Nixon's resignation, standing as the supreme benchmark of investigative journalism holding executive power accountable.")
]

# ==============================================================================
# MOCK 4 PASSAGES
# ==============================================================================
P1_M4_TXT = (
    "Read the following theoretical analysis on media effects and audience psychology and answer the questions that follow:\n\n"
    "Beginning in the late 1960s at the University of Pennsylvania's Annenberg School for Communication, George Gerbner directed the landmark "
    "'Cultural Indicators Project', formulating 'Cultivation Theory'. Gerbner sought to track the long-term cumulative effects of heavy television "
    "viewing on public perceptions of social reality. Distinguishing 'Light Viewers' (under 2 hours daily) from 'Heavy Viewers' (4 or more hours daily), "
    "Gerbner's surveys revealed that heavy viewers consistently overestimated their chances of being involved in violent crime, believed police officers "
    "fire guns daily, and exhibited cynical, fearful mistrust of fellow citizens. Gerbner labeled this cognitive distortion 'Mean World Syndrome'—a "
    "deep-seated belief that the world is a dangerous, predatory jungle where 'most people would take advantage of you if they got the chance'. "
    "Gerbner demonstrated two core cultivation mechanisms: 'Mainstreaming', where heavy viewing blurs, bends, and blends diverse socioeconomic differences "
    "into a standardized television worldview; and 'Resonance', where real-world exposure to neighborhood adversity provides a double-dose of fear "
    "amplifying television portrayals."
)
P1_M4_QS = [
    case_q("Audience Theories", "Cultivation Theory Architect",
        "Who founded Cultivation Theory and directed the Cultural Indicators Project?",
        "George Gerbner",
        ["Marshall McLuhan", "Wilbur Schramm", "Harold Lasswell"],
        "George Gerbner pioneered Cultivation Theory at the University of Pennsylvania examining long-term television effects."),
    case_q("Audience Theories", "Mean World Syndrome Definition",
        "What is the 'Mean World Syndrome' identified by George Gerbner?",
        "A cynical, fearful cognitive bias among heavy TV viewers who perceive the world as significantly more dangerous, violent, and hostile than it actually is",
        ["A medical virus transmitted through television screens",
         "An international treaty signed between broadcasting corporations",
         "A psychological condition where people refuse to watch television"],
        "Heavy television exposure to violence cultivates an exaggerated perception of real-world menace and interpersonal mistrust."),
    case_q("Audience Theories", "Heavy vs Light Viewers",
        "How did Gerbner's methodology differentiate 'Heavy Viewers' from 'Light Viewers'?",
        "Light viewers consume under 2 hours of TV daily, while heavy viewers consume 4 or more hours daily",
        ["Heavy viewers weigh over 100 kilograms; light viewers weigh under 50 kilograms",
         "Heavy viewers watch television in total darkness; light viewers watch in sunlight",
         "Heavy viewers own five television sets; light viewers own none"],
        "Gerbner categorized viewers by daily viewing hours: light (under 2 hours) versus heavy (4+ hours) to isolate cultivation differentials."),
    case_q("Audience Theories", "Concept of Mainstreaming",
        "In Cultivation Theory, what is 'Mainstreaming'?",
        "The process by which heavy television viewing blurs diverse cultural, political, and regional differences into a common, standardized television reality",
        ["A method of building canals to float boats",
         "A technique for cleaning television camera lenses",
         "Broadcasting news exclusively in metropolitan capital cities"],
        "Mainstreaming occurs when heavy TV viewing overrides disparate socio-cultural backgrounds, cultivating a homogenized worldview."),
    case_q("Audience Theories", "Concept of Resonance",
        "What does 'Resonance' mean in Cultivation Theory?",
        "When real-life experiences match the fictional portrayals on television, giving the viewer a 'double dose' of cultivation that intensifies perceived threat",
        ["A sound wave that shatters glass windows during an explosion",
         "An echo produced when shouting inside a large empty cathedral",
         "A mechanical failure in television broadcast towers"],
        "Resonance amplifies cultivation when everyday environment mirrors television messages (e.g. high-crime urban viewers).")
]

P2_M4_TXT = (
    "Read the following case review on satellite communication and rural development in India and answer the questions that follow:\n\n"
    "On August 1, 1975, India launched the 'Satellite Instructional Television Experiment' (SITE), hailed globally as the most ambitious techno-social mass "
    "communication experiment ever conducted in the developing world. Spearheaded by visionary scientist Dr. Vikram Sarabhai, founder of the Indian Space "
    "Research Organisation (ISRO), in collaboration with NASA, SITE leased the American ATS-6 satellite for one year. Direct Reception System (DRS) television "
    "sets equipped with 3-meter chicken-mesh parabolic antennas were installed in community centers across 2,400 backward villages in six states (Andhra Pradesh, "
    "Bihar, Karnataka, Madhya Pradesh, Orissa, and Rajasthan). Every evening, hundreds of rural villagers gathered around the village television set to watch "
    "locally produced educational programs broadcast in four regional languages. Programs focused on modern agricultural practices (high-yielding seeds, "
    "pesticides, irrigation), family planning, hygiene, nutrition, and national integration. Coordinated research by social scientists proved that SITE "
    "substantially improved agricultural knowledge, accelerated adoption of health practices among rural women, and laid the technological foundation for the "
    "Indian National Satellite (INSAT) system."
)
P2_M4_QS = [
    case_q("Television History", "SITE Operational Dates",
        "During which period was the Satellite Instructional Television Experiment (SITE) conducted across India?",
        "August 1975 to July 1976",
        ["January 1950 to January 1951", "August 1947 to August 1948", "October 1982 to October 1983"],
        "SITE was executed for exactly one year from August 1, 1975, to July 31, 1976."),
    case_q("Television History", "Visionary Leader behind SITE",
        "Which visionary scientist conceptualized SITE and mobilized satellite television for accelerated national development in India?",
        "Dr. Vikram Sarabhai",
        ["Dr. Homi Bhabha", "Dr. A. P. J. Abdul Kalam", "Sir C. V. Raman"],
        "Dr. Vikram Sarabhai conceived SITE as a developmental leapfrog technology to bypass terrestrial infrastructure deficits."),
    case_q("Television History", "Satellite Utilized in SITE",
        "Which satellite was provided by the United States space agency NASA for the duration of the SITE experiment?",
        "ATS-6 (Applications Technology Satellite-6)",
        ["Sputnik 1", "Apollo 11", "Hubble Space Telescope"],
        "NASA provided the ATS-6 satellite with its powerful transponder to beam direct broadcasts to rural India."),
    case_q("Television History", "Village Reception Technology",
        "How were television signals received in remote Indian villages without existing cable or broadcast relay towers during SITE?",
        "Direct Reception System (DRS) television sets connected to 3-meter chicken-mesh parabolic satellite dish antennas",
        ["Underground fiber-optic broadband cables laid by state contractors",
         "Transistor pocket radios receiving AM audio broadcasts",
         "Physical 16mm movie film reels delivered by postal trucks"],
        "DRS units with chicken-mesh dish antennas received satellite signals directly from space in community viewing centers."),
    case_q("Television History", "Primary Curricular Focus of SITE",
        "What were the core developmental subjects broadcast to rural audiences during the daily SITE transmissions?",
        "Modern agricultural techniques, family planning, maternal health, child nutrition, and village sanitation",
        ["Foreign stock market bond investments and hedge funds",
         "Hollywood celebrity fashion gossip and disco music",
         "Advanced calculus and theoretical quantum mechanics"],
        "SITE prioritized rural socio-economic development: agriculture, public health, nutrition, and primary education.")
]

# ==============================================================================
# MOCK 5 PASSAGES
# ==============================================================================
P1_M5_TXT = (
    "Read the following theoretical excerpt on cultural studies and semiotics and answer the questions that follow:\n\n"
    "In his foundational 1973 essay 'Encoding and Decoding in the Television Discourse', cultural studies pioneer Stuart Hall shattered traditional "
    "linear transmission models by proposing that media communication is a complex, negotiated loop governed by socio-cultural power relations. "
    "Hall posited that media institutions 'encode' texts with a 'Preferred Reading' that naturalizes dominant-hegemonic ideologies. However, because "
    "media texts are inherently 'Polysemic' (capable of generating multiple meanings), audiences do not decode messages passively. Hall identified three "
    "distinct decoding positions adopted by viewers: First, the 'Dominant-Hegemonic Position', where the viewer decodes the message within the exact "
    "preferred ideological framework intended by the producer; Second, the 'Negotiated Position', where the viewer accepts the general dominant ideology "
    "at an abstract level but modifies or resists it when applying it to their own local socio-economic circumstances; and Third, the 'Oppositional "
    "Position', where the viewer fully understands the preferred framing but critically deconstructs and rejects it, reinterpreting the discourse through "
    "an alternative, counter-hegemonic framework."
)
P1_M5_QS = [
    case_q("Cultural Studies", "Encoding/Decoding Essay Author",
        "Who authored the landmark 1973 essay 'Encoding and Decoding in the Television Discourse'?",
        "Stuart Hall",
        ["Raymond Williams", "Marshall McLuhan", "Theodor Adorno"],
        "Stuart Hall formulated the Encoding/Decoding model at the Centre for Contemporary Cultural Studies (CCCS), Birmingham."),
    case_q("Cultural Studies", "Polysemy in Media Texts",
        "What does Stuart Hall mean by the concept of 'Polysemy' in media texts?",
        "Media texts are open to multiple, diverse interpretations and cannot enforce a single fixed, univocal meaning across all audiences",
        ["Media texts are written exclusively in polytechnic mathematical symbols",
         "Media texts can only be printed on synthetic polyester fabrics",
         "Media texts are completely devoid of any ideological meaning"],
        "Polysemy recognizes that audiences decode signs differently based on their lived social experiences, producing multiple readings."),
    case_q("Cultural Studies", "Dominant-Hegemonic Stance",
        "Which of the following describes a viewer adopting Stuart Hall's 'Dominant-Hegemonic' decoding position?",
        "A viewer who uncritically accepts the news broadcast's preferred framing, regarding government economic policy as natural, unquestioned truth",
        ["A viewer who turns off the television in disgust",
         "A viewer who misinterprets the spoken language as foreign gibberish",
         "A viewer who rewrites the news script for a satirical comedy show"],
        "The dominant-hegemonic reader operates inside the dominant code, accepting the encoded preferred meaning unreservedly."),
    case_q("Cultural Studies", "Negotiated Decoding Stance",
        "How does a viewer operating from a 'Negotiated' position respond to a television program about corporate workplace efficiency?",
        "They agree that workplace efficiency is generally good for the national economy, but reject wage cuts or longer hours in their own factory",
        ["They burn their television set in protest",
         "They believe that corporations do not exist in reality",
         "They agree with 100% of every instruction without qualification"],
        "Negotiated reading accepts the overarching ideological rule while creating pragmatic exceptions and contradictions for local conditions."),
    case_q("Cultural Studies", "Oppositional Decoding Stance",
        "What characterizes the 'Oppositional' decoding position in Stuart Hall's taxonomy?",
        "The viewer decodes the message within an alternative, critical framework, directly deconstructing and rejecting the dominant ideological spin",
        ["The viewer fails to understand the vocabulary of the news anchor",
         "The viewer falls asleep during the broadcast",
         "The viewer files a copyright lawsuit against the television station"],
        "The oppositional reader understands the preferred meaning perfectly, but consciously decodes it through a contrary, critical lens.")
]

P2_M5_TXT = (
    "Read the following investigative report on media ethics and electoral corruption in India and answer the questions that follow:\n\n"
    "In 2010, a sub-committee of the Press Council of India (PCI) comprising senior journalists Paranjoy Guha Thakurta and K. Sreenivas Reddy authored "
    "a damning report exposing the systemic menace of 'Paid News' during the 2009 Indian General Elections and State Assembly polls. The report documented "
    "how established newspapers and television news channels entered into covert commercial contracts with political candidates. In exchange for cash "
    "payments running into crores of rupees, media outlets published fabricated interviews, glowing feature articles, and biased opinion polls praising the "
    "paying candidate while smearing or completely blacking out their electoral rivals. This coverage was deceptively masqueraded as authentic, objective "
    "editorial news without any advertising disclaimer. The PCI and the Election Commission of India (ECI) condemned Paid News as a fraudulent malpractice "
    "that undermines democratic elections, deceives voters, circumvents statutory campaign expenditure limits, and destroys the credibility of the fourth estate."
)
P2_M5_QS = [
    case_q("Media Ethics", "Paid News Definition",
        "How is 'Paid News' officially defined by the Press Council of India and the Election Commission of India?",
        "Any news coverage, feature, or analysis published in print or broadcast media in exchange for financial consideration or cash, masquerading as objective reporting",
        ["A newspaper subscription purchased by a reader at a newsstand for five rupees",
         "The monthly salary paid by a media company to its staff reporters",
         "A government subsidy awarded to small regional language publications"],
        "Paid news is the deceptive practice of accepting monetary payment to publish promotional or biased coverage disguised as authentic news."),
    case_q("Media Ethics", "Authors of Landmark 2010 PCI Report",
        "Who were the members of the PCI sub-committee who authored the groundbreaking 2010 investigative report on Paid News?",
        "Paranjoy Guha Thakurta and K. Sreenivas Reddy",
        ["Bob Woodward and Carl Bernstein",
         "N. Ram and Arun Shourie",
         "James Augustus Hicky and Warren Hastings"],
        "Paranjoy Guha Thakurta and K. Sreenivas Reddy investigated and drafted the comprehensive PCI sub-committee report on paid news in 2010."),
    case_q("Media Ethics", "Subversion of Electoral Democracy",
        "Why does Paid News constitute a catastrophic subversion of the democratic electoral process?",
        "It deceives voters by disguising paid political propaganda as independent journalistic assessment, destroying the basis for an informed vote",
        ["It causes electronic voting machines to lose electrical power",
         "It forces all political candidates to retire from public life",
         "It increases the cost of printing ballot papers"],
        "Voters trust editorial news as unbiased; presenting paid advertisements as objective reporting defrauds the electorate."),
    case_q("Media Ethics", "Evasion of Election Spending Laws",
        "How does the practice of Paid News facilitate the violation of statutory election campaign laws?",
        "Candidates pay under-the-table unaccounted cash (black money) to media houses, evading the statutory campaign expenditure caps monitored by the ECI",
        ["Candidates report all media expenses transparently on national television",
         "The ECI forces candidates to buy television stations",
         "Candidates are forbidden from spending any money on campaign posters"],
        "Paid news transactions are covertly settled in cash, hiding massive illegal electoral spending from the Election Commission of India."),
    case_q("Media Ethics", "Regulatory Action against Paid News",
        "What measure has the Election Commission of India (ECI) instituted to detect and penalize Paid News during elections?",
        "Establishing District and State Media Certification and Monitoring Committees (MCMC) to scrutinize news and issue notices to offending candidates",
        ["Abolishing all private newspapers during election months",
         "Arresting all newspaper delivery boys on polling day",
         "Ordering all television channels to broadcast exclusively in Sanskrit"],
        "The ECI formed Media Certification and Monitoring Committees (MCMCs) at district and state levels to track paid news and add costs to candidate accounts.")
]

# (Mocks 6 to 10 follow...)

# ==============================================================================
# MOCK 6 PASSAGES
# ==============================================================================
P1_M6_TXT = (
    "Read the following theoretical analysis on political communication and public opinion and answer the questions that follow:\n\n"
    "During the 1968 US Presidential election in Chapel Hill, North Carolina, Maxwell McCombs and Donald Shaw conducted a groundbreaking empirical "
    "study that formulated 'Agenda Setting Theory'. Rather than asking whether media directly tells voters which candidate to support, McCombs and Shaw "
    "hypothesized that mass media influences the perceived importance or salience of issues in the public mind. Analyzing local newspapers, news magazines, "
    "and television news broadcasts alongside surveys of undecided voters, they discovered an astounding statistical correlation (+0.97) between the volume "
    "and prominence of media coverage devoted to specific issues (foreign policy, inflation, civil rights) and the issues voters judged to be the most "
    "critical problems facing the nation. The core premise was famously encapsulated by Bernard Cohen: the press 'may not be successful much of the time "
    "in telling people what to think, but it is stunningly successful in telling its readers what to think about'. Subsequent scholarship developed "
    "'Second-Level Agenda Setting' (attribute agenda setting or framing), exploring how highlighting specific traits of an issue shapes public evaluation."
)
P1_M6_QS = [
    case_q("Agenda Setting", "Founders of Agenda Setting",
        "Which communication scholars formulated Agenda Setting Theory in their landmark 1968 Chapel Hill study?",
        "Maxwell McCombs and Donald Shaw",
        ["Paul Lazarsfeld and Elihu Katz",
         "Harold Lasswell and Warren Weaver",
         "Wilbur Schramm and David Berlo"],
        "Maxwell McCombs and Donald Shaw published their seminal Chapel Hill agenda setting findings in 1972."),
    case_q("Agenda Setting", "Bernard Cohen's Classic Dictum",
        "Which famous aphorism by political scientist Bernard Cohen encapsulates the core thesis of Agenda Setting Theory?",
        "The press 'may not be successful much of the time in telling people what to think, but it is stunningly successful in telling its readers what to think about'",
        ["'All news is commercial advertising in disguise'",
         "'Television destroys human memory in thirty days'",
         "'The media only tells lies to innocent citizens'"],
        "Cohen's dictum emphasizes that the media establishes issue salience (what to think about) rather than dictating opinions."),
    case_q("Agenda Setting", "First-Level vs Second-Level Agenda Setting",
        "How is 'Second-Level Agenda Setting' (Attribute Agenda Setting) distinguished from First-Level Agenda Setting?",
        "First-level tells us WHAT issues are important; second-level highlights specific ATTRIBUTES and frames through which those issues should be viewed",
        ["First-level applies only to print; second-level applies only to television",
         "First-level is legal; second-level is illegal",
         "First-level is for children; second-level is for adults"],
        "First-level establishes topic salience; second-level (attribute agenda setting/framing) guides how people evaluate the topic."),
    case_q("Agenda Setting", "Correlation Finding in Chapel Hill",
        "What empirical evidence did McCombs and Shaw discover in their 1968 Chapel Hill survey?",
        "An extraordinarily high correlation (+0.97) between the media's issue priorities and the public's judgment of issue importance",
        ["Zero correlation whatsoever between news and public priorities",
         "A negative correlation proving voters hate the news",
         "Proof that voters only care about sports entertainment"],
        "McCombs and Shaw found a near-perfect statistical correlation (+0.97) between media issue volume and public issue concern."),
    case_q("Agenda Setting", "Media Priming Connection",
        "How does media agenda setting directly trigger 'Priming' in political elections?",
        "By making certain issues (e.g. national security or inflation) top-of-mind, media primes voters to judge political leaders using those specific criteria",
        ["By forcing voters to paint their ballots with primer paint",
         "By preventing political leaders from giving speeches",
         "By requiring voting booths to be painted green"],
        "Priming occurs when issue salience established by the media becomes the benchmark by which voters evaluate political leaders.")
]

P2_M6_TXT = (
    "Read the following case study on grassroots communication and social empowerment in India and answer the questions that follow:\n\n"
    "In the semi-arid rural district of Sangareddy (Telangana), 'Sangham Radio' operates as a celebrated beacon of community broadcasting. Established in "
    "2008 by the Deccan Development Society (DDS), an NGO working with impoverished rural women, Sangham Radio is recognized as India's first community "
    "radio station owned, managed, and programmed entirely by non-literate Dalit women farmers. Broadcasting on 90.4 MHz with a low-power 100-Watt "
    "transmitter covering a localized radius of 15 kilometers across dozens of villages, the station is run by village women like General Narsamma and "
    "Algole Narsamma. Using simple digital audio recorders, these barefoot journalists travel between hamlets collecting folk songs, oral histories, "
    "and discussions in the local Telugu dialect on traditional organic farming, dryland millet cultivation, indigenous seed sovereignty, public health, "
    "and village gender struggles. Sangham Radio rejects all commercial advertising, embodying the authentic non-commercial, participatory ethos of "
    "community broadcasting 'of the community, for the community, and by the community'."
)
P2_M6_QS = [
    case_q("Community Radio", "Sangham Radio Historical Milestone",
        "Why is Sangham Radio celebrated as a historic milestone in Indian broadcasting?",
        "It was India's first community radio station owned, operated, and programmed entirely by rural Dalit women farmers",
        ["It was the first private commercial FM channel launched in Mumbai",
         "It was the first radio station to broadcast in Classical Latin",
         "It generated the highest commercial profit of any broadcaster in Asia"],
        "Sangham Radio made history by placing broadcasting technology in the hands of non-literate rural marginalized Dalit women."),
    case_q("Community Radio", "Parent Civil Society Organization",
        "Which non-governmental development organization spearheaded the establishment of Sangham Radio in Pastapur/Machnoor?",
        "Deccan Development Society (DDS)",
        ["Pratham Educational Trust", "Sulabh International", "SEWA (Self Employed Women's Association)"],
        "The Deccan Development Society (DDS) facilitated Sangham Radio, promoting ecological farming and rural women's empowerment."),
    case_q("Community Radio", "Transmitter Power & Range",
        "In accordance with Indian community radio guidelines, what transmitter specifications does Sangham Radio employ?",
        "A low-power 100-Watt Effective Radiated Power (ERP) transmitter serving a localized geographic radius of around 15 km",
        ["A 500-kilowatt shortwave military transmitter broadcasting across continents",
         "An international satellite beaming broadcasts to North America",
         "A 5-watt transmitter that reaches only two houses"],
        "Community radio guidelines cap transmitter power at 100W ERP to serve compact localized communities within a 10-15 km radius."),
    case_q("Community Radio", "Primary Content Focus",
        "What are the primary thematic subjects broadcast on Sangham Radio in the local Telugu dialect?",
        "Traditional organic agriculture, millet seed conservation, indigenous health practices, and marginalized women's rights",
        ["Bollywood celebrity gossip and foreign movie reviews",
         "Stock market commodities futures and foreign exchange speculation",
         "Luxury automobile maintenance guides"],
        "Sangham Radio addresses rural realities: dryland millet farming, seed sovereignty, maternal health, and local folklore."),
    case_q("Community Radio", "Authentic Ethos of Community Radio",
        "Which philosophical principle distinguishes Sangham Radio from commercial FM stations in nearby Hyderabad?",
        "It is strictly non-commercial and non-profit, operating as broadcasting 'of the community, by the community, and for the community'",
        ["It plays 45 minutes of commercial corporate advertisements every hour",
         "It employs professional radio jockeys from London",
         "It broadcasts exclusively in foreign languages"],
        "Community radio is non-commercial, non-sectarian, and participatory, serving community welfare over private profit.")
]

# ==============================================================================
# MOCK 7 PASSAGES
# ==============================================================================
P1_M7_TXT = (
    "Read the following case review on breaking news reporting and crisis journalism and answer the questions that follow:\n\n"
    "On the morning of December 26, 2004, an unprecedented magnitude 9.1 undersea earthquake off northern Sumatra unleashed the devastating "
    "Indian Ocean Tsunami, obliterating coastal communities across Indonesia, Sri Lanka, India, and Thailand. At the news desk of a major news wire "
    "agency, sub-editors and correspondents faced an onslaught of fragmented, chaotic reports. To communicate the catastrophe with speed, accuracy, "
    "and clarity, the agency deployed the classic 'Inverted Pyramid' news structure. The urgent opening lead paragraph answered the essential "
    "5 Ws and 1 H: Who (thousands of coastal residents), What (killed by massive tsunami waves), Where (across South and Southeast Asian coasts), "
    "When (Sunday morning following a massive earthquake), and Why/How (triggered by an undersea tectonic rupture). Supporting paragraphs elaborated "
    "death tolls by country, quoting official seismologists and disaster authorities, while contextual historical background was placed at the bottom. "
    "This inverted hierarchy enabled frantic newspaper editors worldwide to grasp the vital facts immediately and trim paragraphs from the bottom "
    "up to fit shifting front-page print deadlines without losing critical facts."
)
P1_M7_QS = [
    case_q("News Structure", "Inverted Pyramid Lead Role",
        "In the 2004 Tsunami wire report, what was the primary function of the opening lead paragraph?",
        "To immediately deliver the core 5 Ws and 1 H of the catastrophe upfront so readers and editors grasped the vital facts at a glance",
        ["To describe the reporter's personal breakfast menu",
         "To publish advertisements for swimming goggles",
         "To conceal the death toll until the final sentence of the story"],
        "The lead delivers the most consequential news facts immediately upfront in the Inverted Pyramid format."),
    case_q("News Structure", "Historical Origin of Inverted Pyramid",
        "Which historical communication technology originally catalyzed the widespread journalistic adoption of the Inverted Pyramid structure?",
        "The electric telegraph, where fragile wires risked snapping during wartime transmissions, necessitating vital facts first",
        ["The invention of color television in the 1950s",
         "The launch of the internet World Wide Web in the 1990s",
         "The invention of the fountain pen in the 1880s"],
        "Military telegraphers during the American Civil War transmitted vital facts first in case the telegraph line broke mid-dispatch."),
    case_q("News Structure", "Trimming Utility for Print Editors",
        "Why is the Inverted Pyramid format exceptionally valuable for print newspaper sub-editors under tight layout deadlines?",
        "It allows editors to cut paragraphs safely from the bottom up to fit page space without destroying the essential news facts",
        ["It requires editors to read every article backwards from right to left",
         "It guarantees that every article fills exactly five broadsheet pages",
         "It eliminates the necessity for headline writing"],
        "Because least important background details reside at the bottom, stories can be trimmed from the bottom up without losing core news."),
    case_q("News Structure", "Attribution in Disaster Reporting",
        "Why was explicit attribution (e.g. 'according to the Indian Meteorological Department') critical in the tsunami report?",
        "To establish factual verification, lend credibility, and prevent the spread of unverified rumors during a catastrophic emergency",
        ["To fill empty column space with bureaucratic titles",
         "To ensure government officials received cash bonuses",
         "To avoid naming the reporter who wrote the dispatch"],
        "Attribution establishes authenticity and accountability, indispensable during chaotic disaster situations."),
    case_q("News Structure", "Nut Graph Function in Catastrophe Coverage",
        "If a feature reporter opened the tsunami story with a poignant anecdotal lead about a single child's lost shoe on the beach, what would the subsequent 'Nut Graph' do?",
        "It would immediately contextualize the single shoe, explaining that it represents one of over 230,000 lives claimed by the regional ocean catastrophe",
        ["It would provide instructions on how to manufacture leather shoes",
         "It would name the brand of the child's shoe for commercial advertising",
         "It would end the article immediately without further discussion"],
        "The nut graph bridges an anecdotal hook to the macro substantive reality, explaining the broader scale and stakes in a nutshell.")
]

P2_M7_TXT = (
    "Read the following historical review on the modernization of television broadcasting in India and answer the questions that follow:\n\n"
    "In November 1982, New Delhi hosted the IX Asian Games (Asiad '82), an international sporting spectacle that served as the catalyst for the "
    "transformation of Indian television. Prior to 1982, television in India was an austere black-and-white medium, restricted to seven major cities "
    "broadcasting localized educational and civic programs for a few hours daily. Under the leadership of Prime Minister Indira Gandhi and Information & "
    "Broadcasting Minister Vasant Sathe, the Government made the historic policy decision to introduce Color Television in time for the Games. "
    "Doordarshan imported high-definition color outdoor broadcast (OB) vans, color studio cameras, and commissioned the newly launched INSAT-1A "
    "satellite. Through satellite networking, live color coverage of the Asiad was beamed simultaneously across the nation to dozens of newly installed "
    "Low Power Transmitters (LPTs). This monumental modernization created an insatiable public demand for color television sets, established the "
    "'National Programme', and laid the infrastructural foundation for the commercial sponsored entertainment revolution of the 1980s."
)
P2_M7_QS = [
    case_q("Television History", "Catalyst for Color TV in India",
        "Which major international event in 1982 served as the catalyst for the nationwide introduction of Color Television in India?",
        "The IX Asian Games (Asiad '82) held in New Delhi",
        ["The Cricket World Cup in England", "The Olympic Games in Los Angeles", "The Non-Aligned Movement Summit"],
        "The 1982 Asian Games in New Delhi catalyzed the modernization, color transition, and national networking of Indian television."),
    case_q("Television History", "Technological Transformation of Doordarshan",
        "What critical broadcast technologies were introduced by Doordarshan during the 1982 Asian Games transition?",
        "Color studio production equipment, color OB vans, and satellite networking via INSAT-1A",
        ["Black-and-white 16mm celluloid film cameras and silent projectors",
         "Mechanical telegraph transmitters and Morse code teleprinters",
         "Underground pneumatic tubes carrying paper news dispatches"],
        "Doordarshan acquired color cameras, color OB production vans, and INSAT satellite links to broadcast live color sports."),
    case_q("Television History", "Low Power Transmitter (LPT) Strategy",
        "How did the Government rapidly expand television coverage to smaller towns during the 1982 modernization drive?",
        "By rapidly deploying a vast network of Low Power Transmitters (LPTs) and VLPTs relaying the central satellite signal from Delhi",
        ["By laying physical copper telephone wires to every household in India",
         "By ordering citizens to travel to New Delhi to watch television",
         "By dropping television sets from military airplanes into rural fields"],
        "The 'transmitter a day' LPT rollout connected smaller Indian towns to the national satellite television grid in the 1980s."),
    case_q("Television History", "Launch of the National Programme",
        "What programming innovation was inaugurated by Doordarshan in August 1982 alongside satellite networking?",
        "The 'National Programme', broadcasting simultaneous common news bulletins and cultural programs across all Kendras from 8:30 PM",
        ["A 24-hour channel dedicated exclusively to foreign cartoons",
         "A radio broadcast that replaced all television screens with audio static",
         "An unedited continuous broadcast of parliament debates in Latin"],
        "INSAT networking allowed Doordarshan to launch the National Programme, unifying regional Kendras for common prime-time broadcasts."),
    case_q("Television History", "Economic Impact on Indian TV Industry",
        "How did the 1982 color expansion pave the way for the 1980s golden age of Indian television serials (like Hum Log and Buniyaad)?",
        "It created a massive nationwide consumer audience that attracted corporate commercial advertising, financing large-scale private serials",
        ["It caused all private companies to go bankrupt",
         "It eliminated the necessity for television scriptwriters",
         "It made television sets completely illegal for private citizens"],
        "Color expansion and mass viewership drew corporate sponsors (Colgate, Maggi, Bajaj), funding the 1980s golden age of TV drama.")
]

# ==============================================================================
# MOCK 8 PASSAGES
# ==============================================================================
P1_M8_TXT = (
    "Read the following case review on advertising self-regulation and consumer protection in India and answer the questions that follow:\n\n"
    "In 2021, the Consumer Complaints Council (CCC) of the Advertising Standards Council of India (ASCI) upheld multiple complaints against a high-profile "
    "television and digital advertising campaign launched by a leading cosmetic conglomerate. The advertisement featured an A-list Bollywood celebrity "
    "endorsing a 'Skin Brightening & Fairness Serum', claiming it delivered 'guaranteed 3 shades lighter skin in 7 days' based on 'Swiss dermal stem-cell "
    "nanotechnology'. A public interest consumer advocacy NGO challenged the advertisement, submitting dermatologist evidence proving that skin "
    "pigmentation cannot be medically altered by 3 shades in 7 days by a topical cream, violating Chapter I (Truthful and Honest Representations) of the "
    "ASCI Code. Furthermore, the complaint alleged that depicting darker skin as a social disability and lighter skin as the key to professional success "
    "promoted toxic colorism and violated Chapter II (Decency). ASCI directed the company to withdraw or modify the campaign immediately. Under the "
    "Consumer Protection Act (CPA) 2019, the Central Consumer Protection Authority (CCPA) also issued notices to the celebrity endorser for failing to "
    "exercise due diligence before promoting misleading claims."
)
P1_M8_QS = [
    case_q("Advertising Regulation", "ASCI Consumer Complaints Council",
        "What is the Consumer Complaints Council (CCC) of ASCI that adjudicated the cosmetic advertisement?",
        "The specialized adjudicatory committee of ASCI comprising civil society members and advertising professionals that evaluates consumer complaints",
        ["A criminal enforcement court that arrests company managers",
         "A marketing team that writes scripts for cosmetic advertisements",
         "A government ministry department that sets the retail price of cosmetics"],
        "The CCC is ASCI's independent adjudication panel that investigates consumer complaints against deceptive advertising."),
    case_q("Advertising Regulation", "ASCI Code Chapter I Violation",
        "Why did the cosmetic company's claims violate Chapter I of the ASCI Code?",
        "Because the claim of '3 shades lighter skin in 7 days' was scientifically unsubstantiated and objectively misleading to consumers",
        ["Because the advertisement was broadcast during daytime hours",
         "Because the background music was played too softly",
         "Because the product packaging was colored blue instead of pink"],
        "Chapter I mandates honesty and truthfulness; making unproven scientific claims violates the core code of advertising honesty."),
    case_q("Advertising Regulation", "Colorism and Decency Violation",
        "Under Chapter II of the ASCI Code, why was the portrayal of dark skin as inferior condemned?",
        "It entrenched discriminatory social biases and colorism, violating public decency by portraying darker skin tones as socially disadvantageous",
        ["It failed to show enough computer graphics of snowstorms",
         "It used English subtitles instead of Hindi audio",
         "It omitted the manufacturer's postal pin code"],
        "ASCI guidelines strictly prohibit ads that depict dark skin tones as inferior, socially unacceptable, or disadvantageous."),
    case_q("Advertising Regulation", "Celebrity Endorser Liability under CPA 2019",
        "What legal liability does the Consumer Protection Act 2019 impose on celebrity endorsers promoting misleading advertisements?",
        "Celebrities must exercise due diligence to verify claims; failure can result in hefty monetary penalties and temporary bans on endorsements",
        ["Celebrities have absolute legal immunity to endorse fraudulent products without penalty",
         "Celebrities must spend ten years in solitary confinement for minor errors",
         "Celebrities are legally required to buy all unsold bottles of the cream"],
        "CPA 2019 established strict due-diligence liabilities, empowering the CCPA to fine and ban celebrities who endorse false claims."),
    case_q("Advertising Regulation", "ASCI Regulatory Nature",
        "What is the institutional character of the Advertising Standards Council of India (ASCI)?",
        "A voluntary, non-statutory self-regulatory body established by the advertising, media, and corporate industry in 1985",
        ["A military tribunal operating under the Ministry of Defence",
         "An international agency headquartered at the United Nations in Geneva",
         "A commercial trade union representing print newspaper printers"],
        "ASCI is the premier self-regulatory watchdog of the Indian advertising industry, established in 1985.")
]

P2_M8_TXT = (
    "Read the following case analysis on cinematic realism and Indian film history and answer the questions that follow:\n\n"
    "In 1955, Satyajit Ray completed his directorial debut 'Pather Panchali' (Song of the Little Road), financed partly by a loan from the West Bengal "
    "government and pawned family jewelry. Screened at the 1956 Cannes Film Festival, the film stunned international critics and was awarded the "
    "prestigious 'Prix du Document Humain' (Best Human Document), catapulting Indian cinema onto the global auteur map. Adapted from Bibhutibhushan "
    "Bandopadhyay's novel, Pather Panchali revolutionized Indian film aesthetics. Rejecting the artificiality of Bombay film studios, painted sets, "
    "and formulaic song-and-dance interruptions, Ray embraced authentic Neo-Realism. He shot predominantly on location in the village of Boral, cast "
    "non-professional actors (including 80-year-old Chunibala Devi as the impoverished aunt Indir Thakrun), utilized natural available sunlight, and "
    "crafted iconic visual poetry—such as the breathless sequence of young Apu and Durga running through fields of swaying white Kash flowers to catch "
    "their first glimpse of a roaring steam railway train, scored to the brilliant sitar music of Pandit Ravi Shankar."
)
P2_M8_QS = [
    case_q("Cinema History", "Cannes Recognition for Pather Panchali",
        "Which prestigious award did Satyajit Ray's 'Pather Panchali' win at the 1956 Cannes Film Festival?",
        "Prix du Document Humain (Best Human Document)",
        ["Palme d'Or for Best Action Movie", "Oscar for Best Visual Effects", "Golden Lion for Best Animated Film"],
        "Pather Panchali won the 'Best Human Document' at Cannes 1956, announcing the arrival of Indian cinematic humanism to world cinema."),
    case_q("Cinema History", "Aesthetic Departure from Studio Gloss",
        "How did Pather Panchali aesthetically revolutionize Indian filmmaking compared to contemporary commercial cinema?",
        "By shooting on real village locations, casting non-professional actors, utilizing natural lighting, and eliminating melodramatic formulaic tropes",
        ["By introducing computerized 3D laser visual effects",
         "By recording actors singing in English with synthesizers",
         "By shooting entirely inside air-conditioned Hollywood soundstages"],
        "Ray rejected synthetic studio glamour, pioneering lyrical neo-realism on location with non-professional actors and natural light."),
    case_q("Cinema History", "Musical Score Composer",
        "Who composed the legendary sitar musical score that lent lyrical emotional resonance to Pather Panchali?",
        "Pandit Ravi Shankar",
        ["Ustad Bismillah Khan", "Pandit Shivkumar Sharma", "R. D. Burman"],
        "Pandit Ravi Shankar composed the immortal musical score in an intensive overnight recording session for Pather Panchali."),
    case_q("Cinema History", "Iconic Kash Flowers Sequence",
        "In the celebrated train sequence of Pather Panchali, what do Apu and Durga do that symbolizes the intrusion of modernity into rural innocence?",
        "They run through vast fields of swaying white Kash flowers to catch their first glimpse of a roaring steam locomotive train",
        ["They board an airplane to fly to London",
         "They dismantle a mechanical telegraph station with hammers",
         "They watch television inside a village temple"],
        "The Kash flower train sequence is cinema history's most celebrated lyrical visual metaphor of childhood curiosity encountering modernity."),
    case_q("Cinema History", "The Apu Trilogy Trilogy Formation",
        "Pather Panchali (1955) constitutes the opening chapter of which legendary cinematic trilogy directed by Satyajit Ray?",
        "The Apu Trilogy (comprising Pather Panchali, Aparajito, and Apur Sansar)",
        ["The Calcutta Trilogy", "The Feluda Trilogy", "The Tagore Trilogy"],
        "Pather Panchali, Aparajito (1956), and Apur Sansar (1959) form Ray's globally revered 'Apu Trilogy'.")
]

# ==============================================================================
# MOCK 9 PASSAGES
# ==============================================================================
P1_M9_TXT = (
    "Read the following critical analysis on media law and constitutional fair trial rights and answer the questions that follow:\n\n"
    "In recent decades, the aggressive rise of 24x7 commercial television news channels in India has triggered intense judicial scrutiny regarding the "
    "menace of 'Trial by Media'. In high-profile criminal investigations (such as the Aarushi Talwar case, the Jessica Lal murder case, and the Sushant "
    "Singh Rajput death), competing news channels transformed crime reporting into high-decibel prime-time courtroom drama. Anchors and invited panelists "
    "routinely pronounced suspects guilty, leaked selective fragments of police interrogation diaries, and manufactured sensational conspiracy theories "
    "months before the official trial began. The Supreme Court of India and the Law Commission of India (200th Report on Trial by Media, 2006) observed "
    "that while freedom of speech under Article 19(1)(a) protects investigative reporting, it is not absolute and must be balanced against the accused's "
    "fundamental right to a fair trial under Article 21 and the sacred legal doctrine of 'Presumption of Innocence until Proven Guilty'. Prejudicing the "
    "public mind or harassing witnesses through parallel media investigations constitutes criminal contempt under the Contempt of Courts Act 1971."
)
P1_M9_QS = [
    case_q("Media Law & Ethics", "Trial by Media Definition",
        "What characterizes 'Trial by Media' in contemporary television journalism?",
        "Aggressive, biased parallel media coverage that pronounces an accused person guilty in public opinion before a court delivers its verdict",
        ["A live broadcast of Supreme Court arguments authorized by law",
         "A television drama where actors play fictional judges",
         "An educational legal clinic conducted for law students"],
        "Trial by media usurps the judicial function, declaring guilt through sensational newsroom spectacles before trial completion."),
    case_q("Media Law & Ethics", "Constitutional Conflict Involved",
        "Trial by Media represents an acute constitutional conflict between which two fundamental rights in the Indian Constitution?",
        "Freedom of Speech and Expression (Article 19(1)(a)) versus Right to a Fair Trial and Personal Liberty (Article 21)",
        ["Right to Property (Article 300A) versus Freedom of Religion (Article 25)",
         "Right to Equality (Article 14) versus Cultural Rights (Article 29)",
         "Abolition of Untouchability (Article 17) versus Right to Education (Article 21A)"],
        "The conflict pits media speech freedom (19(1)(a)) against the fundamental right of an accused to an impartial, fair trial (Article 21)."),
    case_q("Media Law & Ethics", "Presumption of Innocence Doctrine",
        "Which foundational common law criminal justice doctrine is directly violated by sensational Trial by Media?",
        "The Presumption of Innocence ('An accused is presumed innocent until proven guilty beyond reasonable doubt')",
        ["The Doctrine of Caveat Emptor (Buyer Beware)",
         "The Doctrine of Res Ipsa Loquitur (The thing speaks for itself)",
         "The Doctrine of Absolute Sovereignty"],
        "Trial by media flips justice on its head, treating accused individuals as guilty, violating the presumption of innocence."),
    case_q("Media Law & Ethics", "Law Commission's 200th Report",
        "What did the Law Commission of India's landmark 200th Report (2006) recommend regarding Trial by Media?",
        "Enacting statutory provisions to prevent media from publishing prejudicial material from the time of arrest in criminal investigations",
        ["Abolishing all television news channels permanently across India",
         "Ordering police officers to host daily reality game shows",
         "Making judges write front-page newspaper editorials"],
        "The 200th Report recommended curbing prejudicial publications that interfere with fair trial rights starting from the moment of arrest."),
    case_q("Media Law & Ethics", "Contempt of Courts Act Invocation",
        "Under which statutory act can Indian courts initiate proceedings against television editors who publish prejudicial material during sub-judice trials?",
        "The Contempt of Courts Act, 1971 (under Criminal Contempt)",
        ["The Official Secrets Act, 1923", "The Indian Contract Act, 1872", "The Motor Vehicles Act, 1988"],
        "Publishing material that prejudices or interferes with pending judicial proceedings constitutes Criminal Contempt under the 1971 Act.")
]

P2_M9_TXT = (
    "Read the following technical case analysis on cinematography and camera stabilization and answer the questions that follow:\n\n"
    "In 1975, American cameraman Garrett Brown revolutionized visual grammar by inventing the 'Steadicam'. Prior to this breakthrough, cinematographers "
    "faced an intractable binary choice: either mount the camera on heavy, rigid metal tracks and wheeled dollies (silky-smooth but constrained by flat terrain "
    "and costly track-laying) or operate the camera handheld (nimble and portable but marred by erratic body shakes and tremors). Brown engineered a mechanical "
    "stabilization rig combining an articulated, spring-loaded iso-elastic arm, a lightweight vest distributing weight across the operator's torso, and a "
    "counterbalanced gimbal sled with a monitor. The Steadicam isolated the camera from the operator's physical footsteps and jolts. Stanley Kubrick "
    "famously harnessed the technology in 'The Shining' (1980), hiring Garrett Brown to navigate a Steadicam in 'Low Mode' just inches off the floor, "
    "gliding menacingly behind young Danny Torrance pedaling his tricycle through the labyrinthine carpeted hallways of the Overlook Hotel, creating an "
    "unprecedented visual sensation of ghostly, predatory tracking."
)
P2_M9_QS = [
    case_q("Cinematography", "Steadicam Inventor",
        "Who invented the Steadicam camera stabilization system in 1975?",
        "Garrett Brown",
        ["Thomas Edison", "Stanley Kubrick", "Orson Welles"],
        "Garrett Brown invented the Steadicam in 1975, transforming camera movement in cinema history."),
    case_q("Cinematography", "Core Mechanical Innovation",
        "How does the Steadicam mechanically isolate the camera from the walking operator's footsteps?",
        "Through an articulated, spring-loaded iso-elastic arm attached to an operator vest, counterbalanced on a precision gimbal",
        ["By filling the camera housing with pressurized water",
         "By tying the camera to helium weather balloons",
         "By locking the camera operator inside a rolling metal wheel"],
        "The iso-elastic arm and gimbal absorb body shocks and vertical stepping jolts, delivering fluid, floating camera movement."),
    case_q("Cinematography", "Dolly vs Steadicam Mobility",
        "What major operational advantage does the Steadicam hold over traditional dolly tracks?",
        "It allows continuous, fluid camera movements across uneven terrain, staircases, and tight corridors without laying rigid mechanical rails",
        ["It does not require any camera lenses to film",
         "It shoots footage without requiring any electricity",
         "It eliminates the need for camera operators"],
        "Steadicam combines the stability of rails with the freedom of handheld movement across stairs, doors, and uneven ground."),
    case_q("Cinematography", "The Shining Low-Mode Milestone",
        "How did Stanley Kubrick famously utilize Garrett Brown and the Steadicam in 'The Shining' (1980)?",
        "Using a 'Low Mode' bracket inches above the carpet, gliding relentlessly behind Danny's tricycle through hotel corridors",
        ["Mounting the camera on a helicopter flying over Paris",
         "Dropping the camera from the roof of a skyscraper",
         "Filming actors through optical microscopes"],
        "Kubrick used the Steadicam in Low Mode, skimming the hotel carpet to create an eerie, floating predatory perspective."),
    case_q("Cinematography", "Psychological Effect of Fluid Tracking",
        "What psychological atmosphere did the fluid Steadicam tracking shots impart to the Overlook Hotel in The Shining?",
        "An omniscient, ghostly sensation that the camera itself was a spectral presence stalking the characters through an endless maze",
        ["A lighthearted, slapstick comedic atmosphere",
         "A chaotic news documentary look resembling an earthquake",
         "The feeling that the camera operator was asleep"],
        "The smooth, relentless gliding shots gave the camera an uncanny supernatural sentience, heightening psychological terror.")
]

# ==============================================================================
# MOCK 10 PASSAGES
# ==============================================================================
P1_M10_TXT = (
    "Read the following case review on cyber law and digital free speech in India and answer the questions that follow:\n\n"
    "In March 2015, the Supreme Court of India delivered a monumental constitutional verdict in 'Shreya Singhal v. Union of India', striking down "
    "Section 66A of the Information Technology Act 2000 in its entirety. Section 66A had criminalized sending any electronic message deemed 'grossly "
    "offensive' or of 'menacing character', punishable with up to three years imprisonment. The provision had been grossly misused by police authorities "
    "nationwide to arrest citizens, students, and cartoonists for posting benign political criticism, cartoons, or expressing peaceful dissent on social "
    "media (such as the arrest of two Mumbai college girls for a Facebook post questioning the citywide shutdown following a politician's funeral). "
    "Authoring the judgment, Justice Rohinton F. Nariman held that Section 66A suffered from the fatal vices of 'vagueness' and 'overbreadth'. Because "
    "nebulous terms like 'offensive' or 'annoyance' were not defined, citizens could not know what speech was lawful, creating a severe 'Chilling Effect' "
    "on free speech that exceeded the reasonable restrictions permitted under Article 19(2) of the Constitution."
)
P1_M10_QS = [
    case_q("Cyber Law", "Section 66A Invalidation Case",
        "Which landmark Supreme Court judgment struck down Section 66A of the Information Technology Act in March 2015?",
        "Shreya Singhal v. Union of India",
        ["Vishaka v. State of Rajasthan", "Maneka Gandhi v. Union of India", "Navtej Singh Johar v. Union of India"],
        "In Shreya Singhal (2015), the Supreme Court struck down Section 66A as unconstitutional under Article 19(1)(a)."),
    case_q("Cyber Law", "Core Defects in Section 66A",
        "On which fundamental constitutional doctrines did the Supreme Court invalidate Section 66A?",
        "Vagueness and Overbreadth, which failed the reasonable restriction test of Article 19(2) and chilled legitimate online speech",
        ["Failure to charge enough monetary court filing fees",
         "The fact that computers were declared illegal in India",
         "Because the statute was drafted in the English language"],
        "The court held Section 66A was unconstitutionally vague and overbroad, leaving ordinary citizens defenseless against arbitrary arrest."),
    case_q("Cyber Law", "The Chilling Effect Explained",
        "What is the 'Chilling Effect' identified by the Supreme Court in the Shreya Singhal ruling?",
        "The suppression of lawful, legitimate free expression caused by citizens self-censoring out of fear of arbitrary penal prosecution",
        ["A mechanical drop in temperature inside computerized server rooms",
         "The freezing of computer screen displays during winter",
         "The psychological relief experienced when shutting off the internet"],
        "When penal speech laws are vague, citizens avoid legitimate public debate to escape arrest, chilling the democratic public sphere."),
    case_q("Cyber Law", "Discussion vs Advocacy vs Incitement",
        "How did Justice Nariman differentiate free speech levels, noting that speech can only be restricted at the final stage?",
        "Discussion, Advocacy, and Incitement: mere discussion or advocacy of an unpopular cause cannot be banned until it reaches the level of Incitement",
        ["Whispering, Speaking, and Shouting",
         "Reading, Writing, and Typing",
         "Singing, Dancing, and Pantomime"],
        "The court held that discussion and advocacy are the heart of Article 19(1)(a); restriction is permissible only when advocacy becomes direct incitement."),
    case_q("Cyber Law", "Intermediary Safe Harbor (Section 79)",
        "In the same Shreya Singhal judgment, how did the Supreme Court protect online intermediaries under Section 79 of the IT Act?",
        "It ruled that intermediaries are required to take down content only upon receiving an actual court order or government direction, not mere private complaints",
        ["It ordered social media platforms to delete all user accounts every midnight",
         "It made social media executives personally liable for every user tweet",
         "It abolished all digital internet service providers in India"],
        "The court read down Section 79 to clarify that intermediaries lose safe harbor only if they fail to remove content upon receiving an official court or government order.")
]

P2_M10_TXT = (
    "Read the following case scenario on radio engineering and commercial broadcast programming and answer the questions that follow:\n\n"
    "In a fast-growing Indian metropolitan city, a private commercial radio network operates an FM broadcasting channel on 98.3 MHz in the VHF Band II "
    "(88-108 MHz). The station's broadcast engineer explains to student interns why commercial radio thrives on Frequency Modulation (FM) rather than "
    "traditional Amplitude Modulation (AM). In FM, the sound signal modulates the frequency of the carrier wave while keeping its amplitude constant, "
    "making FM signals virtually immune to electrical noise from automobile ignitions, lightning, and industrial motors, delivering sparkling high-fidelity "
    "stereo sound. However, because VHF waves propagate strictly along a 'Line-of-Sight' path without bouncing off the ionosphere, coverage is bounded to "
    "a 60-70 km radius. Commercial viability is maximized by the station's programming team through 'Dayparting': during the lucrative 'Morning Drive' "
    "(7 AM to 11 AM) and 'Evening Drive' (5 PM to 9 PM), Radio Jockeys deliver high-energy banter, real-time traffic alerts, and contemporary hit music "
    "tailored for millions of commuter motorists, allowing the sales desk to command peak advertising rates based on high Radio Audience Measurement (RAM) scores."
)
P2_M10_QS = [
    case_q("Radio Broadcasting", "FM Acoustic Advantage",
        "Why does Frequency Modulation (FM) deliver superior acoustic clarity compared to Amplitude Modulation (AM)?",
        "In FM, audio modulations vary carrier frequency while keeping amplitude constant, providing natural immunity against electrical static noise",
        ["FM signals travel through underground water pipes without air friction",
         "FM transmitters operate without using electrical current",
         "FM radio stations are legally required to hire only classical musicians"],
        "Because atmospheric static affects wave amplitude, FM's constant amplitude design eliminates static crackle, ensuring high fidelity."),
    case_q("Radio Broadcasting", "VHF Line-of-Sight Limitation",
        "Why is standard FM radio transmission bounded to a localized coverage radius of 60 to 70 kilometers?",
        "FM operates in the VHF band, where radio waves propagate along line-of-sight and do not reflect off the ionosphere to travel over the horizon",
        ["Because radio waves are legally forbidden from crossing city municipal borders",
         "Because radio signals are absorbed by green leaves on trees",
         "Because transmitter towers are dismantled every evening at sunset"],
        "VHF waves travel in straight line-of-sight paths; Earth's curvature naturally limits terrestrial reception to 60-80 km without repeaters."),
    case_q("Radio Broadcasting", "Drive-Time Commercial Value",
        "In commercial radio programming, why do 'Drive-Time' dayparts command the highest advertising rates?",
        "Because peak commuter hours assemble massive, captive audience listening inside cars, cabs, and transit vehicles",
        ["Because drivers are forced by police to listen to radio advertisements",
         "Because radio batteries only operate while automobiles are moving",
         "Because gasoline stations give away free radio sets to drivers"],
        "Morning and evening commuter traffic delivers peak captive listening demographics, driving peak commercial advertising rates."),
    case_q("Radio Broadcasting", "Dayparting Programming Strategy",
        "What does the programming strategy of 'Dayparting' entail in commercial FM radio?",
        "Segmenting the broadcast day into discrete time blocks and tailoring music tempo, RJ banter, and content to listeners' daily routines",
        ["Turning off the transmitter for twelve hours every day to save electricity",
         "Broadcasting exclusively in foreign languages during nighttime hours",
         "Playing only one song repeatedly for 24 hours continuously"],
        "Dayparting schedules high-energy hits and traffic during commute times and relaxed melodies at late night to match changing audience moods."),
    case_q("Radio Broadcasting", "Radio Audience Measurement (RAM)",
        "How do commercial FM stations utilize Radio Audience Measurement (RAM) data in their business operations?",
        "RAM data measures listenership ratings, reach, and Time Spent Listening (TSL), which the sales team uses to justify commercial advertising rates",
        ["RAM data determines the electrical voltage of the broadcast antenna",
         "RAM data records the personal home addresses of all radio listeners",
         "RAM data is used by the municipal tax department to tax radio listeners"],
        "RAM ratings provide verified audience metrics (reach and TSL) that determine advertising rates and campaign scheduling.")
]

# ==============================================================================
# PASSAGES_1_10 EXPORT LIST
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

assert len(PASSAGES_1_10) == 10, f"Expected 10 pairs, got {len(PASSAGES_1_10)}"
for idx, (p1, p2) in enumerate(PASSAGES_1_10, 1):
    assert len(p1[1]) == 5, f"Mock {idx} P1 has {len(p1[1])} Qs"
    assert len(p2[1]) == 5, f"Mock {idx} P2 has {len(p2[1])} Qs"

print(f"Mass Media Passages 1 to 10 compiled successfully: {len(PASSAGES_1_10)} pairs (20 passages, 100 questions).")
