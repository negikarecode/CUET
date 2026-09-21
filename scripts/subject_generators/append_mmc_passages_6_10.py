#!/usr/bin/env python3
"""
append_mmc_passages_6_10.py
Appends Mocks 6 to 10 passage pairs to mmc_passages_1_10.py.
"""

import sys, os

out_path = "scripts/subject_generators/mmc_passages_1_10.py"

content = '''
# ==============================================================================
# MOCK 6 PASSAGES
# ==============================================================================
P1_M6_TXT = (
    "Read the following theoretical analysis on political communication and public opinion and answer the questions that follow:\\n\\n"
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
    "Read the following case study on grassroots communication and social empowerment in India and answer the questions that follow:\\n\\n"
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
    "Read the following case review on breaking news reporting and crisis journalism and answer the questions that follow:\\n\\n"
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
    "Read the following historical review on the modernization of television broadcasting in India and answer the questions that follow:\\n\\n"
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
    "Read the following case review on advertising self-regulation and consumer protection in India and answer the questions that follow:\\n\\n"
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
    "Read the following case analysis on cinematic realism and Indian film history and answer the questions that follow:\\n\\n"
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
    "Read the following critical analysis on media law and constitutional fair trial rights and answer the questions that follow:\\n\\n"
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
    "Read the following technical case analysis on cinematography and camera stabilization and answer the questions that follow:\\n\\n"
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
    "Read the following case review on cyber law and digital free speech in India and answer the questions that follow:\\n\\n"
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
    "Read the following case scenario on radio engineering and commercial broadcast programming and answer the questions that follow:\\n\\n"
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
'''

with open(out_path, "a", encoding="utf-8") as f:
    f.write(content)

print(f"Appended Mocks 6 to 10 to {out_path}")
