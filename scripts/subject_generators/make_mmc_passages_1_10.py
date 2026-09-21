#!/usr/bin/env python3
"""
make_mmc_passages_1_10.py
Generates mmc_passages_1_10.py containing Mocks 1 to 10 passage pairs (100 questions).
"""

import sys, os

out_path = "scripts/subject_generators/mmc_passages_1_10.py"

header = '''import sys, os
sys.path.insert(0, os.getcwd())
sys.path.insert(0, os.path.dirname(__file__))
from slot_helpers import case_q

# ==============================================================================
# MOCK 1 PASSAGES
# ==============================================================================
P1_M1_TXT = (
    "Read the following case scenario on communication engineering and signal fidelity and answer the questions that follow:\\n\\n"
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
    "Read the following historical excerpt on Indian print media and answer the questions that follow:\\n\\n"
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
    "Read the following case scenario on electoral communication and political sociology and answer the questions that follow:\\n\\n"
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
    "Read the following case review on Indian media policy and institutional regulation and answer the questions that follow:\\n\\n"
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
    "Read the following historical account of broadcast panic and media psychology and answer the questions that follow:\\n\\n"
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
    "Read the following case review on investigative journalism and constitutional accountability and answer the questions that follow:\\n\\n"
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
    "Read the following theoretical analysis on media effects and audience psychology and answer the questions that follow:\\n\\n"
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
    "Read the following case review on satellite communication and rural development in India and answer the questions that follow:\\n\\n"
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
    "Read the following theoretical excerpt on cultural studies and semiotics and answer the questions that follow:\\n\\n"
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
    "Read the following investigative report on media ethics and electoral corruption in India and answer the questions that follow:\\n\\n"
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
'''
with open(out_path, "w", encoding="utf-8") as f:
    f.write(header)

print(f"Written first 5 mock pairs to {out_path}")
