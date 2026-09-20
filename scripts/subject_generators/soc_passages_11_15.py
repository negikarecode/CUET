import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# Mock 11
P1_M11_TXT = (
    "Read the following excerpt on 19th-century social reform in Bengal:\n\n"
    "Ishwar Chandra Vidyasagar stands as a towering luminary of the 19th-century Bengal Renaissance. "
    "Unlike many contemporaries who relied exclusively on Western rationalism, Vidyasagar meticulously combated orthodox Brahminical "
    "pundits on their own scriptural terrain. He marshaled ancient Vedic and Smriti texts (most notably the Parashara Samhita) to establish "
    "that widow remarriage had Vedic sanction and was permissible for Hindu widows. Confronting fierce death threats and social ostracism "
    "from orthodox society, Vidyasagar submitted a mass petition with nearly a thousand signatures to the British colonial government. "
    "His relentless agitation bore fruit in the passing of the Hindu Widows' Remarriage Act (Act XV of 1856) by Lord Dalhousie's administration. "
    "Vidyasagar did not stop with legislative reform; he financed dozens of widow remarriages with his personal income, opened over thirty-five "
    "pioneering schools for girls across rural Bengal, and campaigned against the oppressive custom of Kulin polygamy."
)
P1_M11_QS = [
    case_q("Cultural Change", "Vidyasagar's Reform Strategy",
           "How did Ishwar Chandra Vidyasagar uniquely challenge orthodox opposition to widow remarriage?",
           "By citing ancient Sanskrit scriptures (such as the Parashara Samhita) to prove that widow remarriage was permissible in Hinduism",
           ["By demanding that the British army arrest all Hindu temple priests", "By translating Shakespeare's tragedies into colloquial Bengali", "By advising widows to renounce family life and live in Himalayan caves"],
           "Vidyasagar used scriptural authority to refute conservative dogmas from within the Hindu tradition."),
    case_q("Cultural Change", "Legislative Victory",
           "Which landmark legislation was enacted in 1856 due to Vidyasagar's dedicated campaign?",
           "Hindu Widows' Remarriage Act (Act XV of 1856)",
           ["Abolition of Sati Regulation", "Child Marriage Restraint Act (Sarda Act)", "Special Marriage Act"],
           "The Hindu Widows' Remarriage Act was passed in July 1856 under Lord Dalhousie."),
    case_q("Cultural Change", "Opposition Faced",
           "What hostile reaction did Vidyasagar encounter from orthodox conservative society according to the passage?",
           "Intense social ostracism, slanderous abuse, and direct threats to his physical life",
           ["Complete silence and total indifference from the public", "An official royal banquet organized by conservative orthodox scholars", "A unanimous resolution supporting all his educational proposals"],
           "Orthodox society fiercely opposed his reforms with insults, social boycott, and assassination threats."),
    case_q("Cultural Change", "Girls' Education Initiative",
           "Besides widow remarriage, what major educational initiative did Vidyasagar champion in rural Bengal?",
           "Establishing over thirty-five pioneering model schools dedicated to girls' education",
           ["Opening military academies exclusively for British naval cadets", "Closing down all primary schools in rural villages to cut government costs", "Banning the use of the Bengali vernacular in all classrooms"],
           "Vidyasagar worked tirelessly as government school inspector to set up model girls' schools across Bengal."),
    case_q("Cultural Change", "Campaign against Kulin Polygamy",
           "Which oppressive marriage custom practiced among upper-caste Brahmins in Bengal was actively opposed by Vidyasagar?",
           "Kulin polygamy, where elderly men married dozens of young girls for dowry prestige",
           ["Inter-caste dining among university students", "Matrilineal inheritance among tribal communities", "Voluntary donations to public libraries"],
           "Kulinism permitted elderly Kulin Brahmins to marry scores of young girls, leaving them in lifelong neglected widowhood.")
]

P2_M11_TXT = (
    "Read the following excerpt on legal safeguards against caste violence:\n\n"
    "The Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act, 1989 (commonly known as the PoA Act) was enacted to check "
    "and deter the rising incidence of violent crimes, systemic humiliations, and structural atrocities committed against Dalits and Adivasis. "
    "Recognizing that conventional provisions of the Indian Penal Code were insufficient to address deeply entrenched caste malice, the PoA Act "
    "specifically criminalized a wide array of caste-based offenses. These include forcing a Scheduled Caste person to consume obnoxious substances, "
    "parading them naked, forcibly occupying their agricultural lands, interfering with their constitutional voting rights, and verbal caste abuse "
    "in public view. Crucially, the Act denies anticipatory bail to the accused, mandates the establishment of Special Courts for speedy trials, "
    "and provides for immediate economic relief, legal aid, and rehabilitation for atrocity victims. Despite statutory stringency, sociologists "
    "note that low conviction rates, police apathy, and social pressure from dominant castes frequently obstruct genuine justice."
)
P2_M11_QS = [
    case_q("Patterns of Social Inequality and Exclusion", "Objective of the PoA Act 1989",
           "What was the primary legislative objective behind enacting the SC/ST (Prevention of Atrocities) Act in 1989?",
           "To specifically deter, punish, and prevent violent crimes, indignities, and structural humiliations inflicted on Dalits and Adivasis",
           ["To abolish all constitutional reservations in government employment", "To require all citizens to change their religious faith annually", "To construct international airports in remote forest districts"],
           "The PoA Act was enacted to provide robust legal shields against caste-motivated violence and humiliation."),
    case_q("Patterns of Social Inequality and Exclusion", "Specific Criminalized Offenses",
           "Which of the following offenses is explicitly recognized as a punishable atrocity under the PoA Act according to the text?",
           "Forcing an SC/ST person to eat obnoxious substances, parading them naked, or forcibly seizing their land",
           ["Inviting an SC person to attend a public wedding banquet", "Donating modern books to a community library", "Speaking a regional language during school hours"],
           "The PoA Act explicitly identifies customary caste indignities, land dispossession, and physical humiliation as atrocities."),
    case_q("Patterns of Social Inequality and Exclusion", "Stringent Legal Feature",
           "What distinctive procedural measure was included in the PoA Act to protect vulnerable victims from intimidation?",
           "Barring anticipatory bail to the accused and setting up Special Courts for speedy trials",
           ["Granting unconditional pardons to all convicted offenders", "Requiring victims to pay heavy court fines before filing a complaint", "Banning defense lawyers from participating in trials"],
           "Section 18 of the PoA Act excluded anticipatory bail to prevent influential perpetrators from coercing victims."),
    case_q("Patterns of Social Inequality and Exclusion", "Victim Rehabilitation",
           "What mandatory support does the Act provide to victims of caste atrocities besides criminal prosecution?",
           "Immediate financial compensation, free legal aid, medical care, and economic rehabilitation",
           ["Compulsory exile from their home country", "Mandatory recruitment into commercial shipping corporations", "Permanent forfeiture of their agricultural landholdings"],
           "The statutory scheme mandates prompt relief, medical treatment, and socioeconomic rehabilitation for victims."),
    case_q("Patterns of Social Inequality and Exclusion", "Implementation Bottlenecks",
           "What systemic institutional challenges hinder the effective realization of justice under the PoA Act according to sociologists?",
           "Low conviction rates, police reluctance to register FIRs under the Act, and intimidation from dominant local castes",
           ["Excessive financial resources allocated to rural public prosecutors", "Too many police stations being opened in tribal districts", "An overwhelming surplus of high-speed electronic courtrooms"],
           "Police bias, procedural delays, and dominant caste pressure often result in poor enforcement and low convictions.")
]

# Mock 12
P1_M12_TXT = (
    "Read the following excerpt on urban spatial inequality in India:\n\n"
    "Rapid urbanisation in contemporary India has produced sharp spatial polarization and structural contradictions. "
    "In megacities like Mumbai, Delhi, Bengaluru, and Kolkata, glossy high-rise corporate towers and luxury gated residential enclaves "
    "coexist alongside vast, sprawling informal settlements known as 'slums' (such as Dharavi in Mumbai). Slums are not merely sites of poverty; "
    "they are dynamic centers of informal manufacturing, recycling, and artisanal enterprise that produce billions in economic value. "
    "However, urban planners and state authorities frequently view slums as 'eyesores' or 'illegal encroachments'. Slum dwellers endure precarious "
    "living conditions characterized by severe overcrowding, lack of piped drinking water, inadequate sanitation, and the perpetual threat of forced "
    "eviction. Middle-class Resident Welfare Associations (RWAs) increasingly mobilize municipal authorities to sanitize public spaces, privatizing parks "
    "and pavements while pushing informal street vendors and slum residents to the hazardous peripheries of the metropolis."
)
P1_M12_QS = [
    case_q("Structural Change", "Spatial Polarization in Megacities",
           "How is spatial inequality visibly manifested in modern Indian metropolitan cities according to the text?",
           "The stark physical coexistence of luxury gated communities and glass corporate towers alongside sprawling informal slums",
           ["The complete absence of any buildings taller than two storeys", "All citizens residing in identical, publicly owned rural cottages", "A total ban on private ownership of automobiles"],
           "Megacity landscapes exhibit intense polarization: affluent enclaves adjacent to underserved informal settlements."),
    case_q("Structural Change", "Economic Reality of Slums",
           "Contrary to common stereotypes of pure destitution, how does the passage describe the economic nature of slums like Dharavi?",
           "As vibrant, highly productive centers of informal manufacturing, recycling, leather work, and petty enterprise",
           ["As completely deserted wasteland areas where no human beings reside", "As military training grounds for international armed forces", "As quiet agricultural pastures where wheat is cultivated without tools"],
           "Informal settlements like Dharavi generate immense economic output through recycling, pottery, and garments."),
    case_q("Structural Change", "Deprivations Faced by Residents",
           "What acute daily deprivations do slum residents face according to the excerpt?",
           "Severe overcrowding, absence of clean piped drinking water, inadequate sanitation, and constant anxiety of forced eviction",
           ["Mandatory free international air travel paid by the municipal corporation", "Over-consumption of imported gourmet foods and pastries", "Too many swimming pools and golf courses inside the settlement"],
           "Slum dwellers suffer from lack of tenure security, precarious basic infrastructure, and sanitary hazards."),
    case_q("Structural Change", "Official State Perspective",
           "How do municipal authorities and urban planners often prejudicially view informal settlements according to the text?",
           "As illegal encroachments and civic eyesores requiring demolition or beautification evictions",
           ["As sacred historic monuments entitled to total sovereign autonomy", "As the primary diplomatic headquarters of the United Nations", "As protected environmental biodiversity reserves"],
           "Neoliberal urbanism treats slums as encroachments rather than housing solutions created by working-class migrants."),
    case_q("Structural Change", "Role of Middle-Class RWAs",
           "How do middle-class Resident Welfare Associations (RWAs) contribute to urban exclusion according to the passage?",
           "By lobbying municipal bodies to sanitize public spaces, fencing off parks, and driving out informal hawkers and the poor",
           ["By donating all their personal income to build free housing for slum dwellers", "By demanding that all cars be banned and replaced with bullock carts", "By inviting street vendors to run corporate administrative offices"],
           "Middle-class civic groups often push for 'bourgeois environmentalism', excluding hawkers and the urban poor from public spaces.")
]

P2_M12_TXT = (
    "Read the following excerpt on sociological theories of modernization in India:\n\n"
    "In his monumental work 'Modernization of Indian Tradition' (1973), sociologist Yogendra Singh provided a comprehensive theoretical framework "
    "for understanding social change in India. Singh challenged the simplistic Western modernization perspective which assumed that the spread of modern "
    "science and democracy would lead to the total collapse and disappearance of Indian tradition. Instead, Singh demonstrated that modernisation "
    "in India involves a dynamic synthesis between 'orthogenetic' sources of change (originating from within the indigenous cultural system, such as "
    "the Bhakti movement or internal reform) and 'heterogenetic' sources of change (introduced from external contacts, such as Western education, "
    "British colonial law, and industrialisation). Rather than tradition and modernity being irreconcilable opposites, Indian tradition has proved "
    "remarkably resilient, flexible, and adaptive. Traditional institutions like the joint family, caste associations, and religious rituals have modernized "
    "their operational strategies without losing their underlying cultural identity."
)
P2_M12_QS = [
    case_q("Cultural Change", "Yogendra Singh's Key Thesis",
           "What was Yogendra Singh's seminal argument regarding modernization in 'Modernization of Indian Tradition'?",
           "Modernization does not destroy Indian tradition; it produces a dynamic synthesis of internal tradition and external modern influences",
           ["Indian tradition completely disappeared within six months of British rule", "Modern technology can only function if all traditional languages are abandoned", "Indian society has never experienced any change throughout human history"],
           "Yogendra Singh demonstrated that tradition modernizes through an internal synthesis with external modernity."),
    case_q("Cultural Change", "Orthogenetic Sources of Change",
           "In Yogendra Singh's theoretical schema, what are 'orthogenetic' sources of social change?",
           "Processes of change generated from within the indigenous cultural and social system (e.g., Bhakti movement)",
           ["Imported foreign legal frameworks imposed by colonial governors", "The installation of telegraph cables by international companies", "The migration of foreign merchants across coastal seaports"],
           "Orthogenetic changes arise internally from within the endogenous cultural matrix of the society."),
    case_q("Cultural Change", "Heterogenetic Sources of Change",
           "What are 'heterogenetic' sources of change according to Yogendra Singh?",
           "External influences introduced through contact with outside civilizations, such as Western law, English schooling, and modern industry",
           ["Ancient oral folklore passed down across generations of village elders", "Traditional joint family dining customs practiced during festivals", "Spiritual meditation techniques learned inside domestic prayer rooms"],
           "Heterogenetic changes are exogenous transformations triggered by contact with external systems (like Westernisation)."),
    case_q("Cultural Change", "Critique of Western Modernization Theory",
     "Why did Yogendra Singh critique early Eurocentric modernization theory according to the excerpt?",
           "Because it wrongly assumed a unilinear model where modernization inevitably obliterates indigenous tradition",
           ["Because it argued that India had invented steam engines before England", "Because it proved that all Western nations were completely agrarian", "Because it banned Indian students from enrolling in overseas universities"],
           "Western modernization theory assumed an erroneous binary where modernity completely displaces tradition."),
    case_q("Cultural Change", "Adaptability of Traditional Institutions",
           "How have traditional institutions like caste associations adapted to modern democratic conditions according to the text?",
           "They modernized their strategies, organizing as political interest lobbies and vote banks while retaining cultural identity",
           ["They legally dissolved themselves and destroyed all kinship genealogies", "They converted all their members into celibate monks living in forests", "They prohibited their youth from using modern electricity and computers"],
           "Traditional structures adapt instrumentally to modern conditions, harnessing democracy and media for collective goals.")
]

# Mock 13
P1_M13_TXT = (
    "Read the following excerpt on the agrarian class structure of India:\n\n"
    "Economist Daniel Thorner pioneered the sociological analysis of India's rural stratification in his classic work 'The Agrarian Prospect in India'. "
    "Rejecting simplistic two-class Marxist models or rigid caste-only classifications, Thorner proposed a tripartite classification of rural society "
    "based on three interlocking criteria: the type of income derived from the soil (rent, own cultivation, or wages), the nature of rights held in land "
    "(proprietary, tenancy, or none), and the actual extent of physical manual labor performed. Thorner categorized the agrarian population into: "
    "1. 'Malik' (the proprietor/landlord): who owns substantial land, derives income primarily through rent or by supervising hired laborers, and avoids "
    "manual field work; 2. 'Kisan' (the working peasant): who owns or leases a family-sized holding, cultivates the land primarily using family labor, "
    "and occasionally hires additional hands; and 3. 'Mazdur' (the landless labourer): who possesses no agricultural land, earns a precarious livelihood "
    "solely by selling daily manual labor for cash or kind wages, and remains at the bottom of the agrarian hierarchy."
)
P1_M13_QS = [
    case_q("Change and Development in Rural Society", "Thorner's Tripartite Model",
           "Which scholar formulated the classic tripartite agrarian class model of 'Malik, Kisan, and Mazdur'?",
           "Daniel Thorner in 'The Agrarian Prospect in India'",
           ["M.N. Srinivas in 'The Remembered Village'", "G.S. Ghurye in 'Caste and Race in India'", "Jan Breman in 'Beyond Patron and Client'"],
           "Daniel Thorner developed the influential Malik-Kisan-Mazdur classification of Indian agrarian structure."),
    case_q("Change and Development in Rural Society", "Classification Criteria",
           "What three criteria did Daniel Thorner use to distinguish between agrarian classes according to the passage?",
           "Type of income (rent, crop, wages), legal rights in land, and actual performance of manual physical field labor",
           ["The number of languages spoken, personal height, and religious pilgrimage frequency", "The brand of motorcycle owned, university degree, and blood type", "The amount of gold deposited in international commercial banks"],
           "Thorner based his categories on land rights, source of income, and whether one performs manual farm labour."),
    case_q("Change and Development in Rural Society", "The 'Malik' Category",
           "How does Thorner characterize the 'Malik' (landlord/proprietor) in his schema?",
           "Derives unearned income from rent or supervised hired labor, possesses substantial land, and shuns manual field cultivation",
           ["Works eighteen hours a day performing manual ploughing with his own hands", "Possesses no land and depends solely on daily wages paid in grain", "Lives as an ascetic hermit in a remote mountainous cave"],
           "The Malik owns land, extracts ground rent or uses hired hands, and considers manual field labour beneath his status."),
    case_q("Change and Development in Rural Society", "The 'Kisan' Category",
           "What defines the 'Kisan' (working peasant) in Thorner's agrarian classification?",
           "Owns or holds small to medium plots, cultivating them predominantly with family labor",
           ["An absentee city investor who has never seen a crop of wheat", "A landless bonded labourer tied to a landlord's courtyard", "A corporate CEO managing a multinational fertilizer manufacturing firm"],
           "Kisans are self-cultivating small or medium peasants relying primarily on domestic family labour."),
    case_q("Change and Development in Rural Society", "The 'Mazdur' Category",
           "What is the precarious socio-economic condition of the 'Mazdur' according to the excerpt?",
           "Possesses no land, earns survival solely by selling daily manual labour for wages, and occupies the bottom agrarian tier",
           ["Inherits large hereditary zamindari estates collecting fixed rent", "Governs the district revenue court as a magistrate", "Exports commercial cotton crops directly to overseas textile markets"],
           "The Mazdur is the dispossessed landless worker at the base of the rural pyramid, vulnerable and underpaid.")
]

P2_M13_TXT = (
    "Read the following excerpt on the autonomous women's movement and legal reform:\n\n"
    "The late 1970s witnessed the resurgence of the contemporary women's movement in India, marked by the emergence of autonomous feminist groups "
    "that operated independently of formal male-dominated political parties. A crucial catalyst for this mobilisation was the infamous Mathura rape case. "
    "Mathura, a young adivasi girl, was raped in 1972 inside a police station in Chandrapur, Maharashtra, by two policemen on duty. In 1979, the Supreme Court "
    "of India overturned the High Court conviction and acquitted the accused constables, ruling that because Mathura did not have visible physical injuries, "
    "she must have 'consented' to the sexual act. Outraged by this egregious verdict, four eminent law professors—Upendra Baxi, Vasudha Dhagamwar, "
    "Lotika Sarkar, and Raghunath Kelkar—wrote an open letter to the Chief Justice of India denouncing the patriarchal callousness of the judicial reasoning. "
    "The letter triggered unprecedented nationwide mass mobilizations, protest marches, and street theater. This feminist outcry forced the government "
    "to introduce radical amendments to the Indian Penal Code in 1983, criminalizing custodial rape and shifting the burden of proof onto the accused."
)
P2_M13_QS = [
    case_q("Social Movements", "Catalyst for Contemporary Women's Movement",
           "Which judicial verdict served as the spark that catalyzed nationwide mobilizations by autonomous women's groups in 1979?",
           "The Supreme Court verdict acquitting the policemen accused of custodial rape in the Mathura case",
           ["The judgment striking down the national bank nationalization act", "The decision ordering the construction of the Narmada dam", "The verdict upholding the abolition of privy purses for princes"],
           "The shocking acquittal of custodial rapists in the Mathura case ignited the autonomous feminist movement."),
    case_q("Social Movements", "The Open Letter",
           "Who authored the historic open letter to the Chief Justice of India condemning the Supreme Court's reasoning in the Mathura case?",
           "Four eminent law professors including Upendra Baxi and Lotika Sarkar",
           ["A group of colonial British magistrates residing in London", "The board of directors of a commercial textile mill in Bombay", "The elected members of the Maharashtra legislative council"],
           "Baxi, Dhagamwar, Sarkar, and Kelkar wrote the open letter dissecting the patriarchal logic of the court."),
    case_q("Social Movements", "Judicial Flaw Denounced",
           "What judicial presumption in the Supreme Court verdict was fiercely criticized by feminist activists?",
           "The assumption that the absence of visible physical struggle proved that the young victim had 'consented' to custodial intercourse",
           ["The court's decision to conduct the trial in the Marathi language", "The ruling that bail amounts should be paid in physical silver coins", "The order directing the police station to be painted in white"],
           "Feminists challenged the patriarchal judicial equation of 'lack of physical marks' with voluntary consent in police custody."),
    case_q("Social Movements", "Legislative Reform Outcome",
           "What major statutory breakthrough resulted from the mass protests triggered by the Mathura case?",
           "Far-reaching amendments to the Indian Penal Code in 1983 criminalizing custodial rape and shifting the burden of proof to the accused",
           ["The complete dissolution of all police departments across India", "A total constitutional ban on women entering public government offices", "The abolition of the Supreme Court and all state High Courts"],
           "The 1983 criminal law amendments redefined rape laws, created the specific crime of custodial rape, and recognized unequal power dynamics."),
    case_q("Social Movements", "Nature of Autonomous Women's Groups",
           "Why were these feminist groups in the late 1970s termed 'autonomous'?",
           "Because they organized independently of the control, agendas, and electoral discipline of male-dominated political parties",
           ["Because they were funded exclusively by foreign royal monarchies", "Because they operated entirely as underground military battalions", "Because they had no members, offices, or spoken language"],
           "Autonomous groups maintained independence from political party apparatuses, prioritizing gender violence and rights directly.")
]

# Mock 14
P1_M14_TXT = (
    "Read the following excerpt on the traditional jajmani system and its decline:\n\n"
    "The 'Jajmani system' was an institutionalized socio-economic network of hereditary patron-client relationships that structured the division "
    "of labor in traditional rural India. Under this system, landowning patron families (known as 'jajmans', typically drawn from dominant castes) "
    "received specialized artisanal and ritual services from servicing caste families (known as 'kamin' or 'prajans', such as carpenters, blacksmiths, "
    "barbers, washermen, and sweepers). The relationship was neither a modern commercial contract nor an open-market wage transaction. It was enduring, "
    "hereditary, and characterized by multi-stranded obligations. In exchange for customary services throughout the year, the jajman provided the kamins "
    "with a fixed share of agricultural produce at harvest time, clothing, free homestead sites, and emergency credit. While functionalist anthropologists "
    "viewed jajmani as a harmonious system of mutual interdependence, critical sociologists highlighted its deeply coercive nature. It legitimized "
    "caste hierarchy, undercompensated menial labor, and locked lower castes into hereditary subservience. In post-independence India, the expansion of "
    "a cash economy, modern factory goods, and alternative urban employment led to the rapid disintegration of the jajmani system."
)
P1_M14_QS = [
    case_q("Social Institutions: Continuity and Change", "The Jajmani System Defined",
           "What was the 'Jajmani system' in traditional village India according to the passage?",
           "A hereditary, institutionalized network of patron-client relationships exchanging artisanal/ritual services for customary agricultural shares",
           ["A modern stock exchange operating in rural districts", "A system of forced military conscription for foreign imperial wars", "A recreational music festival celebrated once every century"],
           "The Jajmani system organized rural division of labour through hereditary patron (jajman) and servicing (kamin) ties."),
    case_q("Social Institutions: Continuity and Change", "The Role of the Jajman",
           "Who were the 'jajmans' in this traditional socio-economic framework?",
           "Landowning patron families, usually from dominant peasant or high castes, who received specialized services",
           ["Landless manual sweepers who owned no fields", "Foreign European merchants traveling along coastal trade ports", "Nomadic pastoralists herding camels across deserts"],
           "Jajmans were the landed patrons commanding economic resources and receiving customary services."),
    case_q("Social Institutions: Continuity and Change", "Mode of Compensation",
           "How were servicing castes (kamins) traditionally compensated by the jajman?",
           "Through fixed customary shares of harvest grain, clothing, homestead rights, and ritual gifts rather than cash wages",
           ["Through electronic bank wire transfers and stock options", "Through gold coins stamped with the face of the British king", "They received zero food or compensation under any circumstances"],
           "Transactions were non-monetized: kamins received crop shares at harvest, food rations, and customary perquisites."),
    case_q("Social Institutions: Continuity and Change", "Sociological Critique",
           "Why did critical sociologists challenge the idealized view of the jajmani system as harmonious mutual cooperation?",
           "Because it masked intense exploitation, coerced hereditary subordination, and reinforced unequal caste hierarchy",
           ["Because it made village barbers and potters wealthier than kings", "Because it banned all forms of religious temple worship in villages", "Because it required everyone to wear identical military uniforms"],
           "Critical scholars showed that Jajmani was structurally asymmetrical, locking servicing castes into permanent deprivation."),
    case_q("Social Institutions: Continuity and Change", "Causes of Disintegration",
           "What factors led to the breakdown of the Jajmani system in contemporary India according to the text?",
           "The penetration of a monetized cash economy, availability of factory-made consumer goods, and alternative urban wage employment",
           ["A sudden cooling of the sun causing all crops to freeze", "A statutory law passed in 1950 banning the manufacture of wooden ploughs", "The complete migration of all landowning families to Antarctica"],
           "Monetisation, cheap factory goods, and urban job alternatives eroded customary reciprocal servitude.")
]

P2_M14_TXT = (
    "Read the following excerpt on mass communication and educational television:\n\n"
    "The Satellite Instructional Television Experiment (SITE), conducted between August 1975 and July 1976, is celebrated as one of the most ambitious "
    "technological and developmental communications experiments in human history. Conceived by visionary scientist Dr. Vikram Sarabhai and implemented "
    "by the Indian Space Research Organisation (ISRO) in collaboration with the American space agency NASA, SITE utilized the Application Technology "
    "Satellite (ATS-6) to broadcast direct television signals to 2,400 backward and remote rural villages across six Indian states (Rajasthan, Bihar, "
    "Odisha, Madhya Pradesh, Andhra Pradesh, and Karnataka). Specially designed community television sets were installed in village school buildings. "
    "The daily broadcasts were divided into two educational modules: morning telecasts for primary school children focusing on science and hygiene, "
    "and evening telecasts for adult villagers on modern agricultural practices, family planning, and national integration. SITE proved that satellite "
    "telecommunications could effectively bypass decades of infrastructural backwardness, demonstrating the transformative potential of mass media for rural education."
)
P2_M14_QS = [
    case_q("Mass Media and Communications", "The SITE Milestone",
           "What was the 'Satellite Instructional Television Experiment' (SITE) conducted in 1975-1976?",
           "A pioneering developmental experiment using satellite broadcasting to beam educational programs directly to 2,400 remote rural villages",
           ["A commercial cable network broadcasting Hollywood action movies to urban elites", "A military communications exercise conducted during international wartime", "An experimental transmission of weather data to Antarctic scientific bases"],
           "SITE leveraged satellite technology to transmit educational and agricultural knowledge to remote rural communities."),
    case_q("Mass Media and Communications", "Key Visionary Behind SITE",
           "Which renowned Indian scientist conceptualized the deployment of satellite television for mass rural development?",
           "Dr. Vikram Sarabhai",
           ["Dr. Homi Bhabha", "Dr. A.P.J. Abdul Kalam", "Sir C.V. Raman"],
           "Dr. Vikram Sarabhai envisioned using space technology directly for national educational and social development."),
    case_q("Mass Media and Communications", "Satellite Used",
           "Which international satellite was loaned by NASA for the SITE experiment?",
           "ATS-6 (Application Technology Satellite-6)",
           ["Sputnik 1", "Hubble Space Telescope", "Voyager 2"],
           "NASA loaned the ATS-6 satellite to ISRO for the landmark one-year instructional experiment."),
    case_q("Mass Media and Communications", "Target Audience and Content",
           "How was the daily instructional broadcasting scheduled under SITE?",
           "Morning programs for school children on science and hygiene, and evening modules for adults on modern agriculture and health",
           ["Twenty-four hours of continuous silent religious rituals", "Live broadcasts of European stock market prices throughout the night", "Only musical film songs with zero developmental information"],
           "SITE delivered curated educational content: children's lessons by day, adult agricultural and civic instruction by night."),
    case_q("Mass Media and Communications", "Long-Term Impact",
           "What crucial technological and sociological lesson was established by the success of SITE?",
           "That modern satellite media could leapfrog ground infrastructural backwardness to deliver mass rural education and development",
           ["That television sets should never be placed inside village school buildings", "That rural villagers refused to watch educational programs", "That space technology is useless for developing nations"],
           "SITE established the viability of satellite communication as a powerful catalyst for rural literacy and social modernisation.")
]

# Mock 15
P1_M15_TXT = (
    "Read the following excerpt on the debate over tribal development in India:\n\n"
    "During the colonial era and the drafting of the Indian Constitution, an intense intellectual and policy debate erupted regarding the future "
    "of India's tribal communities. This controversy centered on two diametrically opposed perspectives: the 'Isolationist' approach and the 'Integrationist' "
    "approach. The isolationist perspective was famously articulated by British anthropologist Verrier Elwin. Elwin argued that unregulated contact with "
    "mainstream Hindu society had devastating consequences for adivasis: it exposed them to predatory moneylenders and traders, reduced them to impoverished "
    "low-caste menial laborers, and corrupted their pristine egalitarian culture. Elwin initially advocated creating protected 'National Parks' or reserves "
    "to shield tribals from external exploitation. Conversely, the integrationist position, championed by Indian sociologist G.S. Ghurye, argued that tribals "
    "were not fundamentally distinct groups but merely 'imperfectly integrated classes of Hindu society' or 'backward Hindus'. Ghurye asserted that isolation "
    "would freeze tribals in perpetual backwardness and insisted on their complete economic and cultural integration into the national mainstream. "
    "Ultimately, Jawaharlal Nehru formulated the 'Tribal Panchsheel', seeking a middle path that fostered development without destroying indigenous tribal culture."
)
P1_M15_QS = [
    case_q("Social Institutions: Continuity and Change", "The Tribal Debate Dichotomy",
           "What were the two opposing viewpoints in the classic debate over tribal policy in 20th-century India?",
           "The 'Isolationist' approach (Verrier Elwin) versus the 'Integrationist' approach (G.S. Ghurye)",
           ["The Feudalist approach versus the Monarchist approach", "The Capitalist approach versus the Mercantile approach", "The Imperialist approach versus the Anarchist approach"],
           "The debate pitted Elwin's protectionist isolationism against Ghurye's assimilationist integrationism."),
    case_q("Social Institutions: Continuity and Change", "Verrier Elwin's Argument",
           "Why did Verrier Elwin initially advocate shielding tribal communities in protected zones?",
           "Because unregulated contact with mainstream society exposed tribals to debt bondage, exploitation, and cultural destruction",
           ["Because he believed that adivasis possessed secret nuclear weapons", "Because he wanted to convert all tribal areas into private tea plantations", "Because adivasis refused to speak any spoken language"],
           "Elwin observed that outside contact pauperized adivasis, transforming independent tribes into exploited bonded coolies."),
    case_q("Social Institutions: Continuity and Change", "G.S. Ghurye's Characterisation",
           "How did sociologist G.S. Ghurye famously characterize India's tribal populations in his integrationist critique?",
           "As 'backward Hindus' who were imperfectly integrated into mainstream Hindu society",
           ["As completely alien populations originating from another planet", "As the supreme ruling aristocracy of ancient India", "As foreign European settlers who migrated across the sea"],
           "Ghurye viewed tribes as 'backward Hindus' whose social customs overlapped with lower-caste rural folk Hinduism."),
    case_q("Social Institutions: Continuity and Change", "Integrationist Critique of Isolation",
           "What was the main danger of the isolationist policy according to critics like Ghurye?",
           "It would treat tribals as exotic museum specimens and lock them into permanent economic and technological stagnation",
           ["It would make tribal communities wealthier than urban industrial industrialists", "It would force all non-tribal citizens to abandon modern cities", "It would cause the complete drying up of all Indian rivers"],
           "Critics argued that isolating tribals denied them access to modern medicine, education, and economic advancement."),
    case_q("Social Institutions: Continuity and Change", "Nehru's Tribal Panchsheel",
           "How did Prime Minister Jawaharlal Nehru reconcile these conflicting perspectives in his 'Tribal Panchsheel'?",
           "By advocating development along the lines of tribals' own indigenous genius, respecting their land rights and avoiding cultural imposition",
           ["By ordering the complete military occupation of all forest districts", "By forcing all adivasis to change their names to European surnames", "By declaring all tribal forests as private corporate concessions"],
           "Nehru's Panchsheel emphasized gradual development respecting tribal traditions, arts, and customary land tenure.")
]

P2_M15_TXT = (
    "Read the following excerpt on industrial restructuring and changing labour regimes:\n\n"
    "The trajectory of industrial relations in India underwent a tectonic shift following the economic liberalisation of 1991. "
    "In the Nehruvian planned economy, public sector enterprises (PSUs) were envisioned as model employers, providing workers with permanent job tenure, "
    "statutory provident funds, medical benefits, and recognized trade union rights. However, under post-1991 structural adjustment policies, "
    "the state prioritized disinvestment, fiscal austerity, and enterprise efficiency. Public sector companies were subjected to downsizing through "
    "Voluntary Retirement Schemes (VRS)—popularly dubbed the 'Golden Handshake'. Millions of experienced industrial workers accepted lump-sum payouts "
    "and exited formal employment, only to discover that post-retirement entrepreneurial ventures frequently collapsed. Concurrently, private manufacturing "
    "firms aggressively restructured shop floors by replacing permanent, unionized workforces with precarious contract laborers hired through third-party "
    "agencies. Contract workers receive a fraction of permanent workers' wages for identical arduous work, are denied social security, and can be retrenched "
    "summarily without legal recourse, inaugurating an era of intense labor informalisation."
)
P2_M15_QS = [
    case_q("Change and Development in Industrial Society", "PSUs as Model Employers",
           "How were public sector enterprises (PSUs) originally envisioned during the Nehruvian planned era according to the text?",
           "As model employers providing permanent job security, provident funds, health benefits, and collective bargaining rights",
           ["As temporary workshops operated entirely by unpaid convict laborers", "As private real estate trading ventures seeking quick land profits", "As military armories closed to all civilian employment"],
           "In post-1947 planning, the public sector was tasked with setting national benchmarks for fair wages, safety, and security."),
    case_q("Change and Development in Industrial Society", "Voluntary Retirement Scheme (VRS)",
           "What was the primary corporate and state mechanism used to downsize permanent industrial workforces post-1991?",
           "Voluntary Retirement Schemes (VRS) or the 'Golden Handshake', offering lump-sum financial packages for voluntary exit",
           ["Mandatory lifelong exile to foreign industrial territories", "Promoting all manual workers to managing directors of commercial banks", "Forbidding employees from ever leaving factory premises"],
     "VRS downsized workforces by inducing voluntary resignation through financial severance packages."),
    case_q("Change and Development in Industrial Society", "Post-VRS Worker Reality",
           "What grim socio-economic reality often awaited industrial workers who took the 'Golden Handshake' payout?",
           "Their lump-sum severance money was quickly exhausted, and informal entrepreneurial ventures frequently collapsed, leaving them destitute",
           ["They automatically became billionaire corporate shareholders in overseas tech firms", "They received lifetime pensions guaranteeing continuous luxury living", "They were immediately re-hired at triple their original salaries"],
           "Sociological studies revealed that VRS money evaporated quickly into debts or failed petty businesses, impoverishing older workers."),
    case_q("Change and Development in Industrial Society", "Contractualisation of Labour",
           "How did private manufacturing enterprises restructure their shop-floor workforces post-liberalisation?",
           "By replacing permanent, unionized employees with precarious contract workers hired through intermediary agencies",
           ["By handing over 100% of factory ownership to labor trade unions", "By banning the use of all electricity and machinery in production", "By hiring only foreign university professors to operate assembly lines"],
           "Employers casualized production, utilizing contract labor to cut fixed wage bills and evade trade union resistance."),
    case_q("Change and Development in Industrial Society", "Condition of Contract Workers",
           "What stark disparity defines the relationship between contract workers and permanent workers in modern factories?",
           "Contract workers earn significantly lower wages for identical tasks and lack health insurance, pensions, or job security",
           ["Contract workers work only ten minutes a day while permanent workers work twelve hours", "Contract workers are legally exempt from taking orders from factory managers", "There is zero difference; both receive identical lifetime benefits"],
           "Contract workers perform the same arduous labor as permanent staff but at a fraction of the pay and with zero security.")
]

# Mock 16 to 20 will follow in soc_passages_16_20.py
PASSAGES_11_15 = [
    ((P1_M11_TXT, P1_M11_QS), (P2_M11_TXT, P2_M11_QS)),
    ((P1_M12_TXT, P1_M12_QS), (P2_M12_TXT, P2_M12_QS)),
    ((P1_M13_TXT, P1_M13_QS), (P2_M13_TXT, P2_M13_QS)),
    ((P1_M14_TXT, P1_M14_QS), (P2_M14_TXT, P2_M14_QS)),
    ((P1_M15_TXT, P1_M15_QS), (P2_M15_TXT, P2_M15_QS))
]

print(f"Passages 11 to 15 compiled successfully: {len(PASSAGES_11_15)} pairs.")
