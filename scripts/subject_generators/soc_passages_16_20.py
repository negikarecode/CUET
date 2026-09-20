import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# Mock 16
P1_M16_TXT = (
    "Read the following excerpt on sociological theories of social movements:\n\n"
    "Sociologists have developed various theoretical frameworks to explain why and how social movements emerge. "
    "An early influential paradigm was 'Relative Deprivation' theory, formulated by scholars like Ted Robert Gurr. This perspective posits that "
    "social discontent and rebellion do not stem from absolute poverty alone; rather, they arise when individuals perceive a painful discrepancy "
    "between their legitimate expectations (what they feel entitled to) and their actual value capabilities (what they actually attain). "
    "However, critics pointed out that grievances alone cannot explain collective action, as feelings of deprivation exist in all societies without "
    "necessarily sparking movements. To address this limitation, sociologists like John McCarthy and Mayer Zald developed 'Resource Mobilization' theory. "
    "This theory argues that grievances are ubiquitous; what determines the emergence and success of a social movement is its ability to aggregate, "
    "organize, and deploy tangible resources. These crucial resources include charismatic leadership, organizational infrastructure, funding, volunteer "
    "cadres, access to mass media, and political opportunity structures. Without systematic resource mobilization, collective outrage remains unorganized."
)
P1_M16_QS = [
    case_q("Social Movements", "Relative Deprivation Core Thesis",
           "According to Relative Deprivation theory, what is the primary spark that generates social discontent and rebellion?",
           "A perceived painful gap between what people believe they legitimately deserve and what they actually receive",
           ["The sudden increase in the price of imported foreign automobiles", "A complete biological exhaustion caused by extreme summer heatwaves", "The absence of gold medals distributed in primary schools"],
           "Relative deprivation highlights the subjective perception of injustice and unfulfilled entitlement relative to expectations."),
    case_q("Social Movements", "Critique of Relative Deprivation",
           "What is the major sociological limitation of Relative Deprivation theory according to the text?",
           "Grievances exist everywhere, but collective mobilization does not automatically happen without organization and resources",
           ["It proves that all human beings are 100% happy and satisfied at all times", "It requires mathematical equations that cannot be solved by computers", "It was written before the invention of the printing press"],
           "Critics showed that shared grievances are necessary but insufficient to explain why movements coalesce."),
    case_q("Social Movements", "Resource Mobilization Focus",
           "What central factor does Resource Mobilization theory emphasize as decisive for a movement's emergence and triumph?",
           "The ability to aggregate, organize, and strategically deploy resources like leadership, funds, networks, and communications",
           ["Waiting passively for astrological planets to align in a specific pattern", "The total absence of any formal organizational rules or leadership", "The immediate surrender of all weapons to local police stations"],
           "Resource Mobilization theory focuses on practical organizational capacity, logistics, funding, and media access."),
    case_q("Social Movements", "Examples of Movement Resources",
           "Which of the following constitutes an essential organizational resource according to Resource Mobilization theory?",
           "Charismatic leadership, volunteer cadres, financial capital, and access to communications media",
           ["A royal decree appointing monarchs as movement ambassadors", "The total prohibition of spoken or written communication among members", "Exemption from the physical laws of gravity and thermodynamics"],
           "Movements rely on leadership, dedicated volunteers, communications networks, and financial backing."),
    case_q("Social Movements", "Ubiquity of Grievances",
           "How do Resource Mobilization theorists view human grievances in human societies?",
           "Grievances are relatively ubiquitous and constant; it is the organizational infrastructure that turns grievances into action",
           ["Grievances exist only in extremely wealthy societies with high technology", "Grievances are completely invented by foreign intelligence agencies", "Grievances can be eliminated entirely by passing a single municipal traffic law"],
           "Because discontent is common, the emergence of a movement hinges on strategic resource mobilization.")
]

P2_M16_TXT = (
    "Read the following excerpt on the Right to Information movement:\n\n"
    "The enactment of the Right to Information (RTI) Act in 2005 represents a monumental triumph of grassroots citizen mobilisation in India. "
    "The movement was spearheaded by the Mazdoor Kisan Shakti Sangathan (MKSS), a grassroots mass organisation founded in 1990 by Aruna Roy, "
    "Nikhil Dey, and Shankar Singh in central Rajasthan. The struggle began not in metropolitan universities, but among impoverished rural labourers "
    "who were routinely denied statutory minimum wages for relief work during catastrophic droughts. When workers demanded their rightful wages, "
    "corrupt local block officials claimed the funds were exhausted, refusing to reveal official records under the pretext of bureaucratic secrecy. "
    "MKSS recognized that the struggle for wages was inseparable from the struggle for truth, coining the historic slogan: 'Hamara Paisa, Hamara Hisab' "
    "(Our Money, Our Accounts). MKSS pioneered 'Jan Sunwais' (Public Hearings), where official development muster rolls, vouchers, and bills were read "
    "aloud in village squares. Dead persons listed as working laborers ('ghost workers') and fictitious construction projects were exposed publicly. "
    "This grassroots campaign evolved into a national movement that ultimately forced Parliament to pass the transparency-enforcing RTI Act."
)
P2_M16_QS = [
    case_q("The Story of Indian Democracy", "Grassroots Origin of RTI",
           "Where did the historic grassroots struggle that culminated in the Right to Information Act originate according to the passage?",
           "In rural central Rajasthan through the Mazdoor Kisan Shakti Sangathan (MKSS) fighting for drought-relief wages",
           ["In the corporate boardrooms of multinational commercial banks in Mumbai", "In the diplomatic embassies of foreign European powers in New Delhi", "In the naval shipyards along the southern coastline of Kerala"],
           "The RTI movement originated among poor rural workers in Rajasthan organized by MKSS."),
    case_q("The Story of Indian Democracy", "Historic MKSS Slogan",
           "What historic slogan was coined by the MKSS to encapsulate their fight for transparency and wage rights?",
           "'Hamara Paisa, Hamara Hisab' (Our Money, Our Accounts)",
           ["'Workers of the World, Disarm and Sleep'", "'Back to the Forest and Caves'", "'Abolish All Schools and Roads'"],
           "'Hamara Paisa, Hamara Hisab' linked public fund accountability directly to workers' democratic survival."),
    case_q("The Story of Indian Democracy", "The Jan Sunwai Method",
           "What innovative democratic tool was pioneered by MKSS to publicly expose grassroots corruption in panchayats?",
           "'Jan Sunwais' (Public Hearings), where muster rolls and expenditure vouchers were read aloud before the village community",
           ["Secret midnight court trials conducted in closed police vans", "Writing anonymous complaint letters to the British monarchy in London", "Refusing to allow any government development schemes in the district"],
           "Jan Sunwais brought administrative records into the village square, enabling public social audits."),
    case_q("The Story of Indian Democracy", "Nature of Exposed Corruption",
           "What specific fraudulent practices were uncovered during the public Jan Sunwais according to the text?",
           "Fictitious 'ghost workers' (including deceased individuals) listed on muster rolls and non-existent construction works",
           ["Workers being paid ten times higher wages than allowed by law", "Government officials distributing personal land to all landless peasants", "Excessive quantities of gold buried inside village community wells"],
           "Social audits revealed ghost names on payrolls and siphonage of famine relief funds."),
    case_q("The Story of Indian Democracy", "National Legislative Culmination",
           "Which milestone legislation was enacted by Parliament in 2005 as the direct fruit of this grassroots mass campaign?",
           "Right to Information (RTI) Act, 2005",
           ["Factories Act, 1948", "Panchayati Raj 73rd Amendment Act, 1992", "Special Marriage Act, 1954"],
           "The MKSS grassroots campaign spurred the National Campaign for People's Right to Information, leading to the 2005 RTI Act.")
]

# Mock 17
P1_M17_TXT = (
    "Read the following excerpt on cultural change and middle-class consumerism:\n\n"
    "The post-1991 economic reforms inaugurated a profound transformation in the cultural orientation of the Indian urban middle class. "
    "In the early decades of independence, the Nehruvian era fostered an ethos of austerity, frugality, and state-sponsored public sector self-reliance. "
    "Excessive consumption and luxury spending were socially discouraged. However, with economic liberalisation, the reduction of import tariffs, "
    "and the influx of global consumer brands, this traditional frugality was replaced by an unapologetic 'Culture of Consumption'. "
    "Sociologists note that modern identity is no longer defined solely by hereditary caste or productive occupation, but by the lifestyle goods "
    "one displays. The shopping mall, the multiplex cinema, high-end branded apparel, consumer electronics, and foreign holidays have become the new "
    "markers of social status and middle-class respectability. Yet, this consumerist modern lifestyle remains deeply paradoxical: while enthusiastically "
    "embracing Western commercial goods and digital technologies, the new middle class frequently asserts cultural conservatism, fiercely defending "
    "traditional patriarchal family values, caste-endogamous matrimonial alliances, and religious rituals."
)
P1_M17_QS = [
    case_q("Cultural Change", "Nehruvian vs Post-1991 Cultural Ethos",
           "How did the cultural ethos of the Nehruvian era differ from the post-1991 middle-class orientation according to the text?",
           "The Nehruvian era emphasized frugality, austerity, and public savings, whereas the post-1991 era celebrates an unabashed culture of consumption",
           ["The Nehruvian era banned all forms of farming and agriculture", "The post-1991 era completely outlawed the purchase of any consumer commodities", "There was zero difference; consumer spending was identical in both periods"],
           "Liberalisation shifted middle-class norms from state-backed socialist thrift to open consumerist display."),
    case_q("Cultural Change", "Markers of Modern Middle-Class Status",
           "What are the prominent contemporary symbols used to project social status and middle-class respectability according to the excerpt?",
           "Branded luxury apparel, consumer electronics, shopping mall leisure, and foreign vacation travel",
           ["The number of bullock carts parked outside one's village home", "Exclusive proficiency in translating 15th-century Sanskrit manuscripts", "Surrendering all personal salary to the central railway department"],
           "Status in consumer culture is signaled through branded commodities, electronics, and lifestyle leisure spaces."),
    case_q("Cultural Change", "Paradox of the New Middle Class",
           "What cultural paradox characterizes the contemporary Indian urban middle class according to sociologists?",
           "Enthusiastically embracing Western consumerism and modern gadgets while fiercely asserting traditional patriarchy, caste endogamy, and religious conservatism",
           ["Living completely without clothes or modern shelter", "Refusing to touch any electronic smartphone or computer", "Migrating permanently to unpopulated Arctic icebergs"],
           "The new middle class combines high-tech Western consumerism with social conservatism and caste endogamy."),
    case_q("Cultural Change", "Shift in Identity Construction",
           "According to the passage, how has the construction of personal and social identity shifted under consumer capitalism?",
           "Identity is increasingly shaped and communicated through lifestyle commodities and consumer displays rather than purely hereditary occupation",
           ["Identity is assigned exclusively by military generals based on physical height", "Identity is determined purely by the color of one's footwear", "Identity has completely ceased to exist in human psychology"],
           "Commodities and aesthetic consumption have become primary vehicles for communicating social standing."),
    case_q("Cultural Change", "Shopping Malls as Social Spaces",
           "In urban sociology, the modern shopping mall is analyzed not just as a retail store, but as:",
           "A privatized, sanitized public space designed for class exclusion and sensory consumer lifestyle entertainment",
           ["A sacred religious pilgrimage temple dedicated to ancient deities", "A government welfare camp distributing free wheat rations to the poor", "A high-security defense compound for storing nuclear weapons"],
           "Shopping malls function as privatized lifestyle enclaves that screen out the poor and promote commercial leisure.")
]

P2_M17_TXT = (
    "Read the following excerpt on structural transformations in the Indian family system:\n\n"
    "Sociological investigations into the Indian family system reveal complex structural adaptations under the pressures of modernisation, "
    "urbanisation, and spatial migration. Early Western modernization theorists predicted that industrialisation would inevitably destroy the traditional "
    "Indian 'joint family' and replace it universally with the isolated Western 'nuclear family'. However, empirical studies by Indian sociologists "
    "(such as A.M. Shah and I.P. Desai) dismantled this oversimplified thesis. While the joint family as a single residential commensal unit—where multiple "
    "generations cook and eat at a common hearth—has indeed declined in metropolitan cities due to cramped housing and job mobility, the joint family "
    "endures as a vital functional, emotional, and economic network. Even when nuclear households live in separate urban apartments, they maintain "
    "close daily contact via telecommunications, pool finances for medical emergencies and property purchases, observe shared lifecycle rituals (sanskaras), "
    "and rely on grandparents for child-rearing. Sociologists term this resilient contemporary adaptation the 'joint family in spirit' or the 'modified extended family'."
)
P2_M17_QS = [
    case_q("Social Institutions: Continuity and Change", "Flaw of Western Modernization Theory",
           "What erroneous prediction did early Western modernization theorists make regarding the Indian joint family?",
           "That industrialisation and modernisation would completely eliminate the joint family, replacing it universally with the isolated nuclear unit",
           ["That Indian families would all adopt matrilineal clan inheritance within ten days", "That marriage would be legally abolished across all Indian provinces", "That all human beings would reside in solitary forest hermitages"],
           "The unilinear theory wrongly assumed the total demise of extended family ties in favor of isolated nuclear units."),
    case_q("Social Institutions: Continuity and Change", "Residential vs Functional Jointness",
           "According to sociologists like A.M. Shah, what crucial distinction must be made when analyzing the modern Indian family?",
           "The distinction between jointness of residence (living under one roof) and functional/emotional jointness (kinship solidarity and mutual aid)",
           ["The distinction between those who speak English and those who speak regional languages", "The distinction between families owning cars and those owning bicycles", "The distinction between those living in coastal plains and those on mountain peaks"],
           "Families may live in separate nuclear apartments while remaining deeply unified in financial, emotional, and ritual support."),
    case_q("Social Institutions: Continuity and Change", "Reasons for Residential Nuclearisation",
           "What material factors have driven the physical separation of families into separate nuclear households in modern cities?",
           "Cramped urban residential housing, occupational geographic mobility, and differing work routines",
           ["A constitutional law declaring joint family living illegal", "A total ban on the construction of multi-bedroom houses", "The refusal of grocery shops to sell food to extended families"],
           "Urban real estate costs, employment transfers, and lifestyle differences encourage nuclear living quarters."),
    case_q("Social Institutions: Continuity and Change", "Functional Solidarity Examples",
           "How do physically separated family members maintain functional jointness according to the passage?",
           "By pooling financial resources for emergencies, performing common life-cycle rituals, and sharing child-care responsibilities",
           ["By communicating exclusively through secret coded letters delivered by carrier pigeons", "By legally disowning each other through newspaper advertisements", "By refusing to attend any family weddings or funerals"],
           "Mutual economic aid, shared ancestral rituals, and grandparental support sustain functional extended networks."),
    case_q("Social Institutions: Continuity and Change", "Sociological Nomenclature",
           "What term do contemporary sociologists use to describe this enduring, adaptive family network in urban India?",
           "The 'Modified Extended Family' or 'Joint Family in Spirit'",
           ["The Primitive Matriarchal Horde", "The Corporate Conglomerate Clan", "The Totalitarian Domestic Commune"],
           "Sociologists call this the 'modified extended family': geographically dispersed nuclear units bound by strong reciprocal ties.")
]

# Mock 18
P1_M18_TXT = (
    "Read the following excerpt on the intellectual debates surrounding secularism in India:\n\n"
    "The nature and viability of secularism in India have been the subject of profound debate among social scientists and political philosophers. "
    "A major intellectual challenge to Indian secularism was mounted by scholars like T.N. Madan and Ashis Nandy. Madan argued that secularism is a Western "
    "Enlightenment concept that is culturally alien and unworkable in South Asia, where religion permeates everyday social life. Nandy asserted that "
    "modern state-sponsored secularism, by seeking to banish religion from the public sphere, actually breeds intolerant religious fundamentalism. "
    "Nandy advocated returning to traditional, indigenous modes of religious tolerance and pluralism found in folk traditions (such as Bhakti and Sufism). "
    "Conversely, political theorists like Rajeev Bhargava and economist Amartya Sen vigorously defended Indian secularism. Bhargava conceptualized "
    "Indian secularism as maintaining a 'principled distance'—an approach that does not require absolute separation between state and religion, "
    "but allows the democratic state to intervene when necessary to reform regressive religious practices (such as untouchability or gender discrimination) "
    "while guaranteeing equal respect, protection, and autonomy to minority faiths."
)
P1_M18_QS = [
    case_q("The Challenges of Cultural Diversity", "Critique of Secularism by Madan and Nandy",
           "What was the core critique of secularism advanced by scholars like T.N. Madan and Ashis Nandy?",
           "That Western secularism is culturally alien to deeply religious South Asian society and its rigid application sparks religious fundamentalism",
           ["That secularism is too ancient to be understood by modern university graduates", "That secularism requires the government to demolish all scientific research centers", "That secularism was invented by tribal hunter-gatherers in Central India"],
           "Madan and Nandy argued that modern secularism is an alienated elite ideology that paradoxically fuels communal bigotry."),
    case_q("The Challenges of Cultural Diversity", "Nandy's Alternative Model",
           "What alternative basis for inter-community harmony did Ashis Nandy champion instead of state-imposed secularism?",
           "Traditional, indigenous folk traditions of mutual tolerance and syncretic pluralism (such as Bhakti and Sufism)",
           ["A totalitarian military regime enforcing mandatory atheism", "Dividing the subcontinent into fifty isolated theocratic mini-states", "Banning all religious festivals and musical traditions by law"],
           "Nandy argued that organic religious traditions (Bhakti, Sufism) historically provided far more tolerant coexistence than modern states."),
    case_q("The Challenges of Cultural Diversity", "Bhargava's Principled Distance",
           "How does Rajeev Bhargava conceptualize the distinctive model of Indian secularism?",
           "As 'principled distance', allowing strategic state intervention to reform social evils while upholding equal respect for all religions",
           ["As strict mutual exclusion where the state cannot even acknowledge the existence of religion", "As the complete subservience of the state to a single dominant church", "As the mandatory conversion of all citizens to an official state faith"],
           "Principled distance permits state intervention for equality (e.g., untouchability ban) without abandoning neutral benevolence."),
    case_q("The Challenges of Cultural Diversity", "Justification for State Intervention",
           "Under the Indian constitutional model of secularism, why is state intervention in religious practices permitted?",
           "To uphold fundamental human rights, eliminate internal caste oppression (e.g., Article 17), and protect gender dignity",
           ["To force all places of worship to pay 90% of their donations as tax to commercial banks", "To require all citizens to perform identical daily physical exercises", "To confiscate all historical religious art and sell it abroad"],
           "The Indian state intervenes selectively to eradicate regressive social evils that violate constitutional fundamental rights."),
    case_q("The Challenges of Cultural Diversity", "Sen and Bhargava's Defense",
           "Why is Indian secularism deemed indispensable for a plural democracy like India according to Amartya Sen and Bhargava?",
           "Because in an immensely diverse society, only a secular state guaranteeing equal non-discrimination can protect minorities and sustain unity",
           ["Because secularism allows the government to avoid paying any salaries to public servants", "Because secularism ensures that only foreign corporations can own industrial factories", "Because secularism guarantees that no elections need ever be conducted"],
           "In a deeply plural multi-religious society, secularism is an existential safeguard for minority survival and constitutional equality.")
]

P2_M18_TXT = (
    "Read the following excerpt on the ecological aftermath of the Green Revolution:\n\n"
    "While the Green Revolution succeeded in its immediate objective of achieving national food grain self-sufficiency, its long-term ecological "
    "and environmental fallout has raised alarming concerns among scientists and rural sociologists. The intensive monoculture of high-yielding "
    "wheat and paddy varieties required unprecedented volumes of groundwater. In Punjab and Haryana, the unchecked subsidised use of electric tube-wells "
    "led to a catastrophic plummeting of water tables, turning once-fertile aquifer zones into 'dark zones' facing acute water exhaustion. Furthermore, "
    "the excessive, unscientific application of chemical nitrogenous fertilizers (such as urea) and toxic pesticides has severely degraded soil biology, "
    "leading to micro-nutrient depletion, increased soil salinity, and the contamination of drinking water aquifers. Heavy pesticide run-off has entered "
    "the human food chain, causing a frightening surge in cancer rates and neurological disorders in rural communities—a tragic reality epitomized by the "
    "infamous 'Cancer Train' traveling from Bathinda in Punjab to Bikaner in Rajasthan. Scientists now urge an urgent transition towards agro-ecological "
    "farming, crop diversification, and indigenous water conservation."
)
P2_M18_QS = [
    case_q("Change and Development in Rural Society", "Groundwater Depletion Crisis",
           "What major hydrological crisis resulted from the intensive cultivation of Green Revolution crops in Punjab and Haryana?",
           "Catastrophic depletion of the groundwater table due to unchecked tube-well pumping, creating critical 'dark zones'",
           ["The sudden permanent rise of sea levels over the Himalayas", "The freezing of all underground groundwater into solid ice", "A total cessation of all rainfall across northern India for fifty years"],
           "Over-extraction of groundwater for water-guzzling paddy-wheat cycles severely depleted aquifers in northwestern India."),
    case_q("Change and Development in Rural Society", "Soil Degradation Causes",
           "According to the excerpt, what agricultural practices caused widespread soil degradation and toxicity?",
           "Heavy, unscientific application of chemical nitrogen fertilizers (urea) and toxic pesticides leading to salinity and nutrient loss",
           ["Allowing cattle to graze naturally on fallow pasture land", "Planting traditional drought-resistant indigenous legumes", "Using solar panels to power agricultural cold storage facilities"],
           "Excessive chemical inputs poisoned soil microbiota, disrupted nutrient balances, and accelerated soil salinisation."),
    case_q("Change and Development in Rural Society", "Health Fallout (Cancer Train)",
           "What terrifying public health crisis in rural Punjab is highlighted in the text by the mention of the 'Cancer Train' from Bathinda?",
           "Heavy pesticide contamination of drinking aquifers entering the food chain and causing an alarming surge in cancer incidence",
           ["A sudden outbreak of tropical malaria among high-altitude mountain climbers", "A genetic mutation causing people to lose the ability to speak", "A seasonal epidemic of frostbite caused by winter blizzards"],
           "Carcinogenic pesticide residues in water and food triggered severe health crises, necessitating the medical train to Bikaner."),
    case_q("Change and Development in Rural Society", "Ecological Monoculture Hazard",
           "Why is the widespread monoculture of uniform hybrid seeds ecologically hazardous?",
           "It eliminates genetic biodiversity, rendering entire crop belts vulnerable to catastrophic pest attacks and soil exhaustion",
           ["It makes crops taste so delicious that wild animals eat the entire harvest in one night", "It causes all agricultural fields to turn permanently into solid gold", "It prevents farmers from using cellphones to check weather forecasts"],
           "Monoculture wipes out diverse native gene pools, leaving agriculture susceptible to pest epidemics and climate shocks."),
    case_q("Change and Development in Rural Society", "Recommended Sustainable Shift",
           "What ecological remedies do scientists and environmentalists urge to reverse the agrarian crisis?",
           "Transition to agro-ecological natural farming, crop diversification away from water-heavy paddy, and rainwater harvesting",
           ["Tripling the quantity of synthetic chemical pesticides sprayed per acre", "Digging tube-wells five times deeper into the earth's core", "Banning all organic agriculture and composting across India"],
           "Restoring sustainability requires crop diversification, organic natural farming, and traditional water management.")
]

# Mock 19
P1_M19_TXT = (
    "Read the following excerpt on globalisation, intellectual property, and indigenous knowledge:\n\n"
    "In the contemporary global knowledge economy, the intersection of international intellectual property regimes and traditional knowledge "
    "has become a fierce battleground between the Global North and developing nations like India. Under the Trade-Related Aspects of Intellectual "
    "Property Rights (TRIPS) agreement enforced by the World Trade Organization (WTO), multinational corporations have aggressively patented biological "
    "resources and ancestral medical remedies. This practice is termed 'Biopiracy'—the commercial expropriation and monopolisation of indigenous "
    "biological knowledge without the authorization, acknowledgment, or benefit-sharing of the communities that developed and preserved that knowledge "
    "for generations. Landmark legal battles fought by Indian scientists and civil society include overturning American and European patents on the "
    "fungicidal properties of the Neem tree, the wound-healing qualities of Turmeric (Haldi), and the fragrant genetic strain of Basmati rice. "
    "In response to biopiracy, India created the 'Traditional Knowledge Digital Library' (TKDL) in 2001, documenting thousands of ancient Ayurvedic, "
    "Unani, and Siddha formulations in international languages to prevent predatory patent claims by foreign pharmaceutical conglomerates."
)
P1_M19_QS = [
    case_q("Globalisation and Social Change", "Concept of Biopiracy",
           "How is 'Biopiracy' defined in the sociological and legal analysis of globalisation?",
           "The commercial expropriation and unauthorized patenting of traditional indigenous biological knowledge and resources by corporations",
           ["The illegal downloading of digital Hollywood movies from the internet", "A physical naval pirate attack on commercial cargo ships in high seas", "The smuggling of physical gold bullion across sovereign mountain borders"],
           "Biopiracy involves corporations privatizing age-old community biological wisdom through intellectual property patents."),
    case_q("Globalisation and Social Change", "International Legal Framework",
           "Which international treaty agreement enforced by the WTO governs global intellectual property rights and patents?",
           "TRIPS (Trade-Related Aspects of Intellectual Property Rights)",
           ["GATT 1947", "Kyoto Protocol on Climate Change", "Geneva Convention on Prisoners of War"],
           "TRIPS established enforceable global standards for patents, copyrights, and intellectual property."),
    case_q("Globalisation and Social Change", "Indian Patent Battles",
           "Which indigenous Indian agricultural and medicinal resources were the subject of high-profile international patent battles mentioned in the text?",
           "Neem (fungicidal use), Turmeric (wound healing), and Basmati rice",
           ["Rubber, Coffee, and Vanilla", "Wheat, Rye, and Barley", "Apples, Grapes, and Peaches"],
           "India successfully challenged predatory patents claiming novel ownership over Neem, Turmeric, and Basmati strains."),
    case_q("Globalisation and Social Change", "Institutional Countermeasure (TKDL)",
           "What innovative institutional defense was launched by India in 2001 to safeguard traditional medical formulations?",
           "The Traditional Knowledge Digital Library (TKDL), documenting ancient Ayurvedic and Unani remedies in international languages",
           ["A permanent military blockade of all foreign seaports", "The total destruction of all ancient palm-leaf manuscripts", "A constitutional law banning citizens from using any foreign pharmaceutical drugs"],
           "TKDL translates and catalogs thousands of traditional formulations into digital databases accessible by global patent examiners."),
    case_q("Globalisation and Social Change", "North-South Asymmetry",
           "What fundamental global inequality is revealed by the struggle over biopiracy according to the passage?",
           "Multinational corporations in wealthy nations exploit collective, uncompensated community knowledge of the developing South for private monopoly profits",
           ["Southern nations are technologically superior in nuclear energy than Northern nations", "Developing nations refuse to allow any scientific research in their universities", "There is zero financial value associated with medicinal plant research"],
           "Biopiracy embodies neocolonial extraction: corporate privatization of communal wisdom nurtured by southern indigenous groups.")
]

P2_M19_TXT = (
    "Read the following excerpt on the radical anti-caste movement of Mahatma Jyotirao Phule:\n\n"
    "In 19th-century Maharashtra, Mahatma Jyotirao Phule initiated an uncompromising intellectual and social revolution against Brahminical hegemony. "
    "In his monumental 1873 treatise 'Gulamgiri' (Slavery), Phule developed a radical counter-historical narrative of Indian civilization. "
    "He argued that the Aryans were foreign conquerors who subjugated the original indigenous inhabitants of India—the Shudras and Ati-Shudras—and "
    "concocted religious scriptures and the varna system to maintain their permanent enslavement under the guise of divine law. Significantly, Phule "
    "dedicated 'Gulamgiri' to the 'good people of the United States' who fought to abolish Negro slavery, drawing a powerful global solidarity link "
    "between the struggle against American racial slavery and the fight against caste oppression. In the same year (1873), Phule founded the "
    "'Satyashodhak Samaj' (Truth Seekers' Society). The Samaj promoted universal mass education, rejected Brahmin priests by conducting marriage "
    "ceremonies without rituals, advocated for gender equality, and organized the peasant masses against exploitative moneylenders and feudal landlords."
)
P2_M19_QS = [
    case_q("Cultural Change", "Phule's Seminal Treatise",
           "Which radical anti-caste treatise was authored by Jyotirao Phule in 1873?",
           "Gulamgiri (Slavery)",
           ["Satyarth Prakash", "Annihilation of Caste", "Stri Purush Tulana"],
           "Phule wrote 'Gulamgiri' (Slavery) in Marathi in 1873, attacking Brahminical domination."),
    case_q("Cultural Change", "Global Dedication of Gulamgiri",
           "To whom did Jyotirao Phule famously dedicate his book 'Gulamgiri'?",
           "To the good people of the United States who fought for the abolition of black African-American slavery",
           ["To the British Queen Victoria and the imperial royal court", "To the orthodox Brahmin pundits of Varanasi and Pune", "To the Emperor of China and the royal Qing dynasty"],
           "Phule drew an inspiring transatlantic parallel between American anti-slavery struggles and the Indian anti-caste movement."),
    case_q("Cultural Change", "Aryan Conquest Thesis",
           "How did Phule reinterpret Indian history in 'Gulamgiri' according to the passage?",
           "He asserted that Aryans were foreign invaders who subjugated the indigenous inhabitants (Shudras/Ati-Shudras) using religion as a tool of bondage",
           ["He claimed that caste was invented by European scientists during the Industrial Revolution", "He argued that Indian society had always been an egalitarian heaven without any social classes", "He stated that ancient kings lived on the moon"],
           "Phule turned colonial Orientalist race theories on their head, depicting Dalits and Shudras as the rightful indigenous masters of the soil."),
    case_q("Cultural Change", "Satyashodhak Samaj Founding",
           "What organization was established by Jyotirao Phule in 1873 to champion the rights of the marginalized?",
           "Satyashodhak Samaj (Truth Seekers' Society)",
           ["Arya Samaj", "Brahmo Samaj", "Prarthana Samaj"],
           "Phule founded the Satyashodhak Samaj in September 1873 to mobilize Shudras and Ati-Shudras."),
    case_q("Cultural Change", "Ritual Rebellion of Satyashodhak Samaj",
           "What radical social practice did the Satyashodhak Samaj introduce regarding marriage ceremonies?",
           "Conducting egalitarian marriages without Brahmin priests, Sanskrit mantras, or payment of dakshina",
           ["Mandating that weddings could only take place inside colonial military forts", "Requiring the bride's father to surrender all land to temple priests", "Banning all forms of marriage and declaring family life illegal"],
           "Satyashodhak marriages eliminated the mediating role of Brahmin priests, conducting ceremonies in the vernacular with secular pledges.")
]

# Mock 20
P1_M20_TXT = (
    "Read the following excerpt on the Backward Classes movement and affirmative action:\n\n"
    "The constitutional framework for social justice in India extends beyond Scheduled Castes and Scheduled Tribes to encompass the 'Other Backward Classes' (OBCs). "
    "Article 340 of the Indian Constitution empowered the President to appoint a Commission to investigate the conditions of socially and educationally "
    "backward classes. The First Backward Classes Commission was appointed in 1953 under the chairmanship of Kaka Kalelkar. However, its recommendations "
    "were not implemented due to lack of consensus. In 1979, the Janata Party government constituted the Second Backward Classes Commission, popularly "
    "known as the 'Mandal Commission', headed by B.P. Mandal. The Mandal Commission formulated eleven indicators encompassing social, educational, and "
    "economic criteria to identify backwardness. Concluding that OBCs constituted approximately 52% of India's population, the Commission recommended "
    "reserving 27% of central government jobs and educational seats for OBCs. In 1990, Prime Minister V.P. Singh announced the implementation of the Mandal "
    "recommendations, sparking intense political upheaval, student protests, and counter-mobilizations. The policy was legally validated by the Supreme "
    "Court in the historic Indra Sawhney judgment (1992), cementing the political empowerment of intermediate and backward castes in Indian democracy."
)
P1_M20_QS = [
    case_q("Patterns of Social Inequality and Exclusion", "Mandal Commission Head",
           "Who served as the Chairman of the Second Backward Classes Commission appointed in 1979?",
           "B.P. Mandal",
           ["Kaka Kalelkar", "Dr. B.R. Ambedkar", "Jawaharlal Nehru"],
           "Bindeshwari Prasad (B.P.) Mandal chaired the Second Backward Classes Commission."),
    case_q("Patterns of Social Inequality and Exclusion", "Constitutional Basis",
           "Under which Article of the Indian Constitution is the President empowered to appoint a commission for Backward Classes?",
           "Article 340",
           ["Article 14", "Article 21", "Article 370"],
           "Article 340 authorizes the President to investigate conditions of socially and educationally backward classes."),
    case_q("Patterns of Social Inequality and Exclusion", "Mandal Commission Recommendation",
           "What major affirmative action policy did the Mandal Commission recommend for OBCs?",
           "27% reservation in central government employment and public higher educational institutions",
           ["100% reservation of all parliamentary seats for intermediate castes", "Total abolition of all competitive entrance examinations in India", "Immediate privatization of all government departments and ministries"],
           "The Mandal Commission recommended a 27% reservation quota for OBCs within the 50% legal ceiling."),
    case_q("Patterns of Social Inequality and Exclusion", "Implementation Catalyst",
           "Which Prime Minister implemented the recommendations of the Mandal Commission in August 1990?",
           "V.P. Singh",
           ["Indira Gandhi", "Rajiv Gandhi", "Morarji Desai"],
           "Prime Minister V.P. Singh announced the implementation of the Mandal Commission report on August 7, 1990."),
    case_q("Patterns of Social Inequality and Exclusion", "Indra Sawhney Landmark Verdict",
           "Which historic Supreme Court judgment upheld the constitutional validity of 27% OBC reservation in 1992?",
           "Indra Sawhney v. Union of India (The Mandal Case)",
           ["Kesavananda Bharati v. State of Kerala", "Maneka Gandhi v. Union of India", "Shah Bano Case"],
           "In Indra Sawhney (1992), a nine-judge Supreme Court bench upheld the 27% reservation while introducing the 'creamy layer' exclusion.")
]

P2_M20_TXT = (
    "Read the following excerpt on the digital revolution, social media, and democracy:\n\n"
    "The rapid proliferation of smartphones and low-cost mobile internet has revolutionized communications in 21st-century India. "
    "Philosopher Jürgen Habermas famously analyzed the emergence of the 'Public Sphere' in 18th-century Europe as an arena of rational-critical debate "
    "nurtured by coffee houses, salons, and print newspapers, where citizens debated public policy free of state coercion. In contemporary India, "
    "digital platforms (WhatsApp, YouTube, Twitter/X, Instagram) have democratized media production, enabling ordinary citizens, subaltern groups, "
    "and regional languages to bypass traditional corporate and state gatekeepers. Citizen journalists can expose local police misconduct, farmers can "
    "coordinate tractor rallies, and Dalits can mobilize civil rights protests in real time. However, sociologists warn that the digital public sphere "
    "is deeply fraught. Commercial algorithms engineered to maximize user engagement prioritize sensationalism, emotional outrage, and polarising content. "
    "This breeds algorithmic 'echo chambers' and 'filter bubbles', facilitating the rampant spread of communal hate speech, fabricated misinformation, "
    "and targeted cyber-harassment that pose grave threats to deliberative democratic discourse."
)
P2_M20_QS = [
    case_q("Mass Media and Communications", "Habermas and the Public Sphere",
           "Which renowned sociologist and philosopher formulated the concept of the democratic 'Public Sphere'?",
           "Jürgen Habermas",
           ["Max Weber", "Émile Durkheim", "Karl Marx"],
           "Jürgen Habermas developed the theory of the Public Sphere in 'The Structural Transformation of the Public Sphere'."),
    case_q("Mass Media and Communications", "Democratic Empowerment of Digital Media",
           "How has social media democratized communications for marginalized and subaltern groups according to the text?",
           "By allowing ordinary citizens to produce and disseminate news in real time without corporate or state editorial gatekeepers",
           ["By providing free satellite televisions to all kindergarten students", "By requiring all citizens to speak English exclusively on the internet", "By legally prohibiting politicians from participating in elections"],
           "Smartphones and social platforms allow decentralized content creation and grassroots political mobilization."),
    case_q("Mass Media and Communications", "Algorithmic Echo Chambers",
           "In digital communications theory, what are 'echo chambers' and 'filter bubbles'?",
           "Environments where automated algorithms feed users content that reinforces existing cognitive biases, isolating them from differing viewpoints",
           ["Physical soundproof music recording studios built in urban centers", "Underground caves where radio signals cannot penetrate", "Computer software programs designed exclusively to teach classical poetry"],
           "Algorithms curate feeds based on past behavior, trapping users in polarized information bubbles."),
    case_q("Mass Media and Communications", "Sensationalism Drivers",
           "Why do commercial social media algorithms prioritize emotional outrage and sensationalist content?",
           "Because sensational and polarising content maximizes user screen time, engagement metrics, and corporate advertising profits",
           ["Because algorithms are legally mandated to promote world peace and meditation", "Because governments force social media companies to publish historical textbooks", "Because internet cables can only transmit emotionally angry words"],
           "Platform business models monetize human attention; provocative and polarising content generates higher engagement."),
    case_q("Mass Media and Communications", "Democratic Threats",
           "What grave societal dangers to democratic discourse are highlighted in the passage regarding unregulated digital spaces?",
           "The virulent spread of communal hate speech, fabricated disinformation (fake news), and algorithmic polarization",
           ["The complete disappearance of all electricity and computers", "A statutory law banning citizens from using smartphones after dark", "The voluntary return of all human populations to stone-age hunting"],
           "Echo chambers, targeted trolling, and viral fake news poison deliberative democracy and provoke communal friction.")
]

PASSAGES_16_20 = [
    ((P1_M16_TXT, P1_M16_QS), (P2_M16_TXT, P2_M16_QS)),
    ((P1_M17_TXT, P1_M17_QS), (P2_M17_TXT, P2_M17_QS)),
    ((P1_M18_TXT, P1_M18_QS), (P2_M18_TXT, P2_M18_QS)),
    ((P1_M19_TXT, P1_M19_QS), (P2_M19_TXT, P2_M19_QS)),
    ((P1_M20_TXT, P1_M20_QS), (P2_M20_TXT, P2_M20_QS))
]

print(f"Passages 16 to 20 compiled successfully: {len(PASSAGES_16_20)} pairs.")
