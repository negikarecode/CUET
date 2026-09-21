#!/usr/bin/env python3
"""
append_mmc_passages_16_20.py
Appends Mocks 16 to 20 passage pairs and defines PASSAGES_11_20 in mmc_passages_11_20.py.
"""

import sys, os

out_path = "scripts/subject_generators/mmc_passages_11_20.py"

content = '''
# ==============================================================================
# MOCK 16 PASSAGES
# ==============================================================================
P1_M16_TXT = (
    "Read the following case review on digital media convergence and audio storytelling and answer the questions that follow:\\n\\n"
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
    "Read the following constitutional case analysis on press freedom and print regulation in India and answer the questions that follow:\\n\\n"
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
    "Read the following theoretical analysis on film editing and Soviet montage cinema and answer the questions that follow:\\n\\n"
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
    "Read the following case review on media framing and financial news coverage and answer the questions that follow:\\n\\n"
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
    "Read the following case review on corporate crisis public relations and ethical leadership and answer the questions that follow:\\n\\n"
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
    "Read the following technical case review on broadcast audience analytics and electronic ratings measurement in India and answer the questions that follow:\\n\\n"
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
    "Read the following case review on citizen journalism and disaster communication in India and answer the questions that follow:\\n\\n"
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
    "Read the following historical analysis on early Indian social cinema and the studio era and answer the questions that follow:\\n\\n"
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
    "Read the following regulatory case review on digital telecommunications and cyber policy in India and answer the questions that follow:\\n\\n"
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
    "Read the following investigative journalism case analysis on sting operations and journalistic ethics in India and answer the questions that follow:\\n\\n"
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
'''

with open(out_path, "a", encoding="utf-8") as f:
    f.write(content)

print(f"Appended Mocks 16 to 20 to {out_path}")
