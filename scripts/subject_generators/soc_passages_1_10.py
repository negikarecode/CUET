import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# Mock 1
P1_M1_TXT = (
    "Read the following excerpt on social stratification and answer the questions that follow:\n\n"
    "Sociologist M.N. Srinivas introduced the concept of the 'Dominant Caste' to explain power dynamics in rural India. "
    "According to Srinivas, a caste may be said to be dominant when it yields a preponderance of numerical strength over the other castes, "
    "and when it also wields preponderant economic and political power. A large and powerful caste group can easily dominate if it is placed "
    "high in the traditional caste hierarchy, but intermediate peasant castes with significant landownership often exercise decisive local influence. "
    "In many parts of India, land reforms and adult franchise enabled intermediate peasant castes like the Jats in Punjab and Haryana, "
    "Vokkaligas and Lingayats in Karnataka, Kammas and Reddys in Andhra Pradesh, and Marathas in Maharashtra to consolidate their position as dominant castes. "
    "They mediate disputes, control village panchayats, and act as vital vote banks in democratic electoral mobilizations."
)
P1_M1_QS = [
    case_q("Social Institutions: Continuity and Change", "Dominant Caste Definition",
           "According to M.N. Srinivas in the passage, which of the following is an essential criterion for a caste to be considered 'dominant'?",
           "Preponderance of numerical strength combined with decisive economic (land) and political power",
           ["Exclusive mastery of classical Sanskrit scriptures", "Hereditary appointment as British district magistrates", "Complete absence of any agricultural landholdings"],
           "Srinivas identified numerical strength, land ownership, and local political influence as key criteria for caste dominance."),
    case_q("Social Institutions: Continuity and Change", "Caste Hierarchy Placement",
           "Based on the passage, what type of castes were historically able to consolidate local dominance despite not being at the very top of the traditional varna hierarchy?",
           "Intermediate peasant and cultivating castes with extensive landholdings",
           ["Ascetic wandering mendicants without families", "Urban westernized factory managers living in presidency cities", "Impoverished landless bonded labourers"],
           "Intermediate cultivating castes leveraged their agrarian landholdings to attain local socio-political dominance."),
    case_q("Social Institutions: Continuity and Change", "Examples of Dominant Castes",
           "Which of the following regional caste groups is explicitly cited in the passage as an example of a dominant caste in southern India?",
           "Vokkaligas and Lingayats in Karnataka",
           ["Kayasthas in Bengal", "Khatris in Punjab", "Nambudiris in Kerala"],
           "The passage explicitly names Vokkaligas and Lingayats in Karnataka as prominent dominant castes."),
    case_q("Social Institutions: Continuity and Change", "Democratic Empowerment",
           "According to the text, which post-independence constitutional and policy mechanisms enabled these intermediate castes to solidify their dominance?",
           "Land reforms and the introduction of universal adult franchise",
           ["The restoration of the British East India Company monopoly", "The mandatory conversion of rural villages into industrial factory townships", "The complete abolition of state assembly elections"],
           "Land reforms granted them ownership rights, and universal adult franchise leveraged their numerical strength into political power."),
    case_q("Social Institutions: Continuity and Change", "Political Role of Dominant Castes",
           "How do dominant castes function in contemporary rural democracy according to the excerpt?",
           "They mediate local disputes, control village panchayats, and operate as powerful electoral vote banks",
           ["They refuse to participate in any state or national elections", "They surrender all their wealth voluntarily to central government treasuries", "They ban all agriculture and enforce hunting-gathering livelihoods"],
           "Dominant castes exercise local administrative control and bargain collectively with political parties as vote banks.")
]

P2_M1_TXT = (
    "Read the following excerpt on demographic dynamics and answer the questions that follow:\n\n"
    "The demographic transition theory suggests that population growth is linked to overall levels of economic development. "
    "Every society typically transitions from a high birth rate and high death rate regime to a low birth rate and low death rate stage. "
    "In between these two stages lies the phase of 'population explosion', where death rates plummet rapidly due to modern disease control "
    "and healthcare, while birth rates remain stubbornly high due to traditional social values. "
    "Currently, India is experiencing a unique 'demographic dividend' because the proportion of the working-age population (15–64 years) "
    "is significantly higher than the dependent population of children and elderly. "
    "However, demographers caution that this window of demographic dividend is temporary. If India fails to provide quality education, "
    "healthcare, and productive employment for this burgeoning young population, the dividend risks degenerating into a demographic disaster."
)
P2_M1_QS = [
    case_q("The Demographic Structure of the Indian Society", "Demographic Transition Theory",
           "According to the passage, what causes the 'population explosion' phase during the demographic transition?",
           "A rapid drop in death rates due to modern medicine while birth rates remain persistently high",
           ["A sudden increase in infant mortality coupled with a complete cessation of births", "Mass emigration of elderly citizens to foreign continents", "A decline in the supply of food grains caused by severe volcanic eruptions"],
           "The explosion occurs because death rates fall dramatically while birth rates take much longer to decline."),
    case_q("The Demographic Structure of the Indian Society", "Demographic Dividend Defined",
           "How is the 'demographic dividend' characterized in the passage?",
           "A condition where the proportion of the working-age population (15–64 years) is larger than the dependent population",
           ["A financial cash bonus distributed by the Reserve Bank of India to every newborn infant", "A state where over 80% of the population is over seventy-five years of age", "The total replacement of human labor with automated artificial intelligence"],
           "The demographic dividend refers to a favorable age structure with a high ratio of productive working-age people."),
    case_q("The Demographic Structure of the Indian Society", "Working Age Span",
           "What specific age bracket is identified in the text as representing the productive 'working-age population'?",
           "15 to 64 years",
           ["0 to 14 years", "65 years and above", "Only individuals between 25 and 30 years"],
           "Demographers classify the working-age cohort as those aged between 15 and 64 years."),
    case_q("The Demographic Structure of the Indian Society", "Conditions for Success",
           "To effectively harness the demographic dividend, what crucial policy investments are highlighted in the excerpt?",
           "Providing quality education, comprehensive healthcare, and productive employment opportunities",
           ["Closing down all colleges and universities to save public budget", "Mandating that all young people engage solely in subsistence agriculture", "Imposing strict legal bans on foreign trade and internet communications"],
           "Education, health, and productive jobs are essential to convert youth numbers into economic growth."),
    case_q("The Demographic Structure of the Indian Society", "Demographic Hazard",
           "What is the warned consequence if the state fails to absorb this expanding youth bulge productively?",
           "The demographic dividend will turn into a demographic disaster of unemployment and social unrest",
           ["The immediate collapse of all global computer satellites", "A permanent rise in the temperature of the oceans", "The spontaneous conversion of the entire workforce into royal courtiers"],
           "Without employment and training, large youth cohorts face frustration, despair, and social distress.")
]

# Mock 2
P1_M2_TXT = (
    "Read the following excerpt on social justice and answer the questions that follow:\n\n"
    "Dr. B.R. Ambedkar was the foremost intellectual and political leader of the Dalit movement in 20th-century India. "
    "Ambedkar challenged the romanticized Gandhian view of the self-sufficient Indian village as a 'republic'. Instead, "
    "Ambedkar famously characterized the Indian village as 'a sink of localism, a den of ignorance, narrow-mindedness and communalism'. "
    "For Dalits, the village represented a site of brutal caste tyranny, spatial segregation into untouchable quarters on the village periphery, "
    "and daily economic servitude under landed patrons. Ambedkar insisted that Dalits could achieve emancipation only through modern education, "
    "urban migration, industrial wage employment, and rigorous legal-constitutional protections. In his seminal address 'Annihilation of Caste' (1936), "
    "he asserted that political democracy would remain a hollow farce unless grounded in social and economic democracy."
)
P1_M2_QS = [
    case_q("Patterns of Social Inequality and Exclusion", "Ambedkar's View of Villages",
           "How did Dr. B.R. Ambedkar famously characterize the Indian village in contrast to Mahatma Gandhi's romanticized ideal?",
           "As 'a sink of localism, a den of ignorance, narrow-mindedness and communalism'",
           ["As an egalitarian socialist paradise where all citizens live in perfect harmony", "As a high-tech modern industrial research township", "As a spiritually enlightened kingdom free of any social prejudice"],
           "Ambedkar rejected the idyllic image of villages, highlighting them as epicenters of caste cruelty."),
    case_q("Patterns of Social Inequality and Exclusion", "Spatial Segregation",
           "According to the passage, how was caste oppression physically and spatially organized within traditional Indian villages?",
           "Through forced segregation of Dalits into separate quarters on the peripheral margins of the settlement",
           ["By requiring all upper-caste landlords to live in underground caves", "By housing all community members in identical communal dormitory blocks", "By rotating residential homes between families on a monthly lottery system"],
           "Dalits were forcibly pushed to village peripheries, segregated from common wells and public streets."),
    case_q("Patterns of Social Inequality and Exclusion", "Emancipation Pathways",
           "What pathways did Ambedkar advocate as essential for the liberation of Dalits from traditional village servitude?",
           "Modern education, migration to urban industrial centers, and constitutional-legal rights",
           ["Strict adherence to hereditary caste occupations and performing unpaid village begar", "Surrendering all voting rights to village headmen", "Permanent withdrawal from all modern schooling and literature"],
           "Ambedkar saw urban anonymity, education, and legal rights as keys to escaping rural caste traps."),
    case_q("Patterns of Social Inequality and Exclusion", "Annihilation of Caste",
           "In which seminal 1936 text did Ambedkar assert that political democracy is incomplete without social and economic democracy?",
           "Annihilation of Caste",
           ["Discovery of India", "Hind Swaraj", "Gulamgiri"],
           "Ambedkar argued in 'Annihilation of Caste' that democracy must include equality in social life."),
    case_q("Patterns of Social Inequality and Exclusion", "Democracy's Foundation",
           "According to Ambedkar in the passage, why is political democracy alone insufficient for true national freedom?",
           "Because without social and economic equality, formal political rights cannot prevent the oppression of marginalized majorities",
           ["Because parliamentary elections are too expensive to conduct annually", "Because only monarchs possess the divine right to pass legislation", "Because political democracy bans citizens from owning personal books"],
           "Political equality (one man, one vote) is empty if society maintains structural social inequality (one man, one value).")
]

P2_M2_TXT = (
    "Read the following excerpt on agrarian change and answer the questions that follow:\n\n"
    "The Green Revolution of the mid-1960s fundamentally transformed the socio-economic landscape of rural north-western India. "
    "By introducing high-yielding varieties of wheat, tube-well irrigation, and chemical fertilizers, Punjab and Haryana became the 'granary of India'. "
    "However, this agricultural modernisation was deeply uneven. The massive capital requirements favored large farmers who owned extensive acreage "
    "and had access to institutional bank credit. Small and marginal peasants, unable to bear the rising costs of seeds and diesel pumps, "
    "were frequently pushed into debt. Traditional patron-client ties (such as the Jajmani system) rapidly dissolved as landlords replaced customary "
    "grain payments with monetized daily wage labor. To meet the peak labor demand during harvesting, farmers increasingly relied on millions of "
    "seasonal migrant workers travelling from poorer eastern states like Bihar and eastern Uttar Pradesh."
)
P2_M2_QS = [
    case_q("Change and Development in Rural Society", "Unequal Benefits of Modernisation",
           "Why did the Green Revolution disproportionately benefit large landowners over small peasants according to the text?",
           "Large farmers possessed the financial capital and credit access necessary to invest in expensive HYV seeds, fertilizers, and tube-wells",
           ["The government prohibited small peasants from purchasing agricultural tools", "Large farmers were the only ones who knew how to speak foreign languages", "Small peasants refused to allow water to touch their fields"],
           "High capital requirements favored large landowners with bank credit and extensive acreage."),
    case_q("Change and Development in Rural Society", "Disintegration of Customary Ties",
           "According to the excerpt, how did commercial farming affect traditional rural labour relations like the Jajmani system?",
           "It dissolved hereditary reciprocal obligations, replacing customary payments in kind with monetized cash wages",
           ["It made all farm workers permanent co-owners of the landlord's estate", "It forced landlords to perform all manual labour without any assistance", "It banned the use of Indian currency in rural grain transactions"],
     "Commercialisation replaced traditional patron-client grain reciprocity with contractual daily cash wages."),
    case_q("Change and Development in Rural Society", "Labour Mobility",
           "How did Punjab and Haryana meet their intense seasonal harvest labour shortages following the Green Revolution?",
           "By employing millions of impoverished seasonal migrant labourers travelling from Bihar and eastern Uttar Pradesh",
           ["By importing thousands of mechanical robotic harvesters from Japan", "By hiring European factory workers on temporary summer visas", "By requiring all school children to harvest wheat fields full-time"],
           "The Green Revolution generated heavy circular seasonal migration from eastern India to northwestern farms."),
    case_q("Change and Development in Rural Society", "Key Agricultural Inputs",
           "Which combination of agricultural inputs constituted the core technological package of the Green Revolution mentioned in the text?",
           "High-Yielding Variety (HYV) seeds, tube-well irrigation, and chemical fertilizers",
           ["Organic cow-dung compost and wooden handheld scythes only", "Traditional rain-fed millets cultivated without chemical inputs", "Genetically modified cotton seeds dependent solely on seawater"],
           "The modern package integrated dwarf HYV seeds, deep groundwater tube-wells, and chemical nutrients."),
    case_q("Change and Development in Rural Society", "Marginal Peasant Vulnerability",
           "What economic consequence did small and marginal farmers face due to the rising capital intensity of Green Revolution agriculture?",
           "They were burdened by rising input costs and forced into severe indebtedness",
           ["They immediately bought out all surrounding large plantations", "They were granted permanent lifetime pensions by international banks", "They completely stopped participating in any trade or commerce"],
           "Skyrocketing costs for machinery, seeds, and fuel pushed smallholders into debt traps.")
]

# Mock 3
P1_M3_TXT = (
    "Read the following excerpt on structural transformations under colonialism:\n\n"
    "Colonialism introduced far-reaching structural changes in the Indian subcontinent. British economic policies were designed "
    "to serve the industrial interests of the metropolitan power. As Britain underwent its Industrial Revolution, the British state "
    "systematically dismantled India's world-renowned artisanal handloom and handicraft sectors. Indian raw materials (such as raw cotton and jute) "
    "were extracted and exported cheaply to British factories, while finished British machine-made textiles from Manchester flooded the Indian market "
    "free of duty. This process, termed 'de-industrialisation' by economic historians, caused massive unemployment among traditional weavers and artisans. "
    "Deprived of their urban livelihoods and royal patronage, millions of displaced artisans were forced to migrate back into villages, "
    "creating acute pressure on agricultural land. Concurrently, the colonial administration developed coastal port cities like Calcutta, "
    "Bombay, and Madras to facilitate this imperial trade, while historic inland trading hubs and royal capitals suffered severe decline."
)
P1_M3_QS = [
    case_q("Structural Change", "De-industrialisation Process",
           "According to the passage, what specific economic process is referred to as 'de-industrialisation'?",
           "The destruction of traditional Indian artisanal handlooms and handicrafts by cheap British factory imports",
           ["The building of modern public sector steel plants in independent India", "The voluntary shutdown of British factories in Manchester", "The migration of British aristocrats to rural Indian villages"],
           "De-industrialisation describes the destruction of indigenous artisanal production by imperial imports."),
    case_q("Structural Change", "Colonial Trade Asymmetry",
           "How did the colonial state structure trade between India and Britain according to the text?",
           "Exporting cheap raw materials from India and flooding Indian markets with finished British manufactured goods",
           ["Importing Indian luxury silks into London completely tax-free", "Banning all British merchants from engaging in Indian commerce", "Paying Indian handloom weavers double the market price for textiles"],
           "Colonial extraction treated India as an exporter of cheap raw commodities and a captive market for finished industrial goods."),
    case_q("Structural Change", "Impact on Agriculture",
           "What was the direct consequence of the destruction of urban handicrafts on the rural agrarian economy?",
           "Displaced urban artisans migrated back to rural areas, creating intense population pressure on agricultural land",
           ["Villagers abandoned farming and moved into high-rise luxury apartment blocks", "All agricultural land was turned into wildlife sanctuaries", "Peasants received free mechanised tractors from the British government"],
           "Artisans ruined by industrial imports had no alternative but to revert to agriculture, worsening rural land pressure."),
    case_q("Structural Change", "Decline of Traditional Cities",
           "Why did traditional pre-colonial court cities and craft centers decline under British rule?",
           "They lost royal patronage and saw their trade routes diverted to colonial coastal port cities",
           ["They were submerged by giant man-made hydroelectric reservoirs", "They were destroyed by catastrophic volcanic eruptions", "Their residents voluntarily emigrated to North America"],
           "Loss of royal courts and re-routing of commerce to coastal presidency ports undermined inland artisanal centers."),
    case_q("Structural Change", "Presidency Port Cities",
           "Which coastal cities were developed by the British specifically to facilitate colonial import-export extraction?",
           "Calcutta, Bombay, and Madras",
           ["Murshidabad, Surat, and Thanjavur", "Varanasi, Haridwar, and Ujjain", "Agra, Delhi, and Lahore"],
           "Calcutta, Bombay, and Madras served as the primary coastal gateway ports of the British colonial empire.")
]

P2_M3_TXT = (
    "Read the following excerpt on tribal communities in India:\n\n"
    "In sociological and anthropological discourse, tribal societies in India have historically been defined by their distinctive social organization. "
    "Unlike the stratified caste society governed by hierarchy and ritual purity, tribal communities generally possessed more egalitarian "
    "social structures, based on kinship and community ownership of resources. However, during British colonial rule, the isolation of tribal areas "
    "was violently shattered. The colonial administration asserted state monopoly over forests through stringent Forest Acts, categorizing forests "
    "as state property for timber exploitation. This process alienated adivasis from their customary rights over minor forest produce and shifting cultivation. "
    "Concurrently, the entry of moneylenders, traders, and revenue contractors—collectively referred to as 'dikus' (outsiders)—reduced tribals "
    "to bonded laborers and landless tenants, sparking widespread tribal uprisings such as the Santhal Hul and Birsa Munda's Ulgulan."
)
P2_M3_QS = [
    case_q("Social Institutions: Continuity and Change", "Tribal vs Caste Society",
           "According to the passage, how did traditional tribal social organization fundamentally differ from mainstream caste society?",
           "Tribal societies were generally more egalitarian, organized around kinship and community resources rather than ritual hierarchy",
           ["Tribal societies were ruled by hereditary Brahminical royal councils", "Tribal groups lived exclusively in large brick-built metropolitan cities", "Tribals possessed no language, art, or religious beliefs whatsoever"],
           "Tribal communities were characterized by kinship egalitarianism and collective resources, lacking hierarchical caste ranking."),
    case_q("Social Institutions: Continuity and Change", "Forest Acts Impact",
           "What was the devastating consequence of colonial Forest Acts on adivasi communities according to the text?",
           "They established state monopoly over forests, alienating adivasis from customary rights to forest produce and shifting cultivation",
           ["They distributed free ownership of all state forests to tribal families", "They exempted all tribal villages from paying taxes forever", "They constructed high-speed electric trains across all mountain ranges"],
           "Forest Acts stripped tribals of traditional access to timber, grazing, and food, turning forests into state property."),
    case_q("Social Institutions: Continuity and Change", "The Concept of 'Diku'",
           "In tribal discourse, what did the term 'diku' signify?",
           "Outsiders, including exploitative traders, moneylenders, and revenue agents who expropriated tribal lands",
           ["The sacred forest deities worshipped during harvest festivals", "The traditional wooden plough used in mountain terraces", "The royal European governors visiting tribal villages on vacation"],
           "Dikus were the exploitative non-tribal outsiders (moneylenders, landlords, officials) who colonized tribal belts."),
    case_q("Social Institutions: Continuity and Change", "Historic Tribal Uprisings",
           "Which famous tribal rebellion mentioned in the passage was led by Birsa Munda against colonial rule and landlord exploitation?",
           "Birsa Munda's Ulgulan (The Great Tumult)",
           ["The Champaran Indigo Satyagraha", "The Tebhaga Sharecroppers Movement", "The Bardoli Peasant Satyagraha"],
           "Birsa Munda led the historic 'Ulgulan' (Great Tumult) in the Chota Nagpur region in the late 1890s."),
    case_q("Social Institutions: Continuity and Change", "Economic Alienation of Tribals",
           "How did the influx of dikus transform the socio-economic status of indigenous tribals?",
           "It expropriated their lands, reducing independent tribal cultivators into debt-bonded labourers and dispossessed tenants",
           ["It made every tribal person a wealthy corporate shareholder", "It allowed tribals to govern the British Parliament in London", "It eliminated all forms of moneylending and debt across central India"],
           "Moneylenders and contractors trapped adivasis in debt peonage, dispossessing them of ancestral lands.")
]

# Mock 4
P1_M4_TXT = (
    "Read the following excerpt on cultural mobility in India:\n\n"
    "Cultural change in modern India is characterized by complex interactions between tradition and modernity. "
    "M.N. Srinivas formulated the concept of 'Sanskritisation' to analyze the process through which lower castes sought to improve their social standing. "
    "By adopting the rituals, dietary habits (such as vegetarianism), dress codes, and social practices of the twice-born (dwija) castes, "
    "a lower caste attempted to claim a higher ritual status within the varna hierarchy. However, Sanskritisation was rarely an effortless process. "
    "It required the claiming caste to already possess substantial economic wealth or demographic strength to withstand the hostility of entrenched upper castes. "
    "Furthermore, Sanskritisation has been critically scrutinized by contemporary sociologists and Dalit intellectuals. They emphasize that Sanskritisation "
    "does not challenge the unjust foundation of caste inequality; rather, it legitimizes the superiority of Brahminical cultural hegemony and often "
    "leads to the erosion of rich, egalitarian folk traditions and tighter patriarchal restrictions on women."
)
P1_M4_QS = [
    case_q("Cultural Change", "Sanskritisation Mechanism",
           "According to the text, how do lower castes attempt to elevate their ritual status through Sanskritisation?",
           "By adopting the rituals, vegetarianism, dress codes, and social practices of the twice-born (dwija) castes",
           ["By burning all traditional religious scriptures and abandoning village life", "By emigrating permanently to Western industrialized nations", "By establishing heavy manufacturing automobile factories in villages"],
           "Sanskritisation involves mimicking the rituals, dietary taboos, and customs of higher twice-born castes."),
    case_q("Cultural Change", "Prerequisites for Sanskritisation",
           "What material conditions does the passage identify as necessary for a caste to successfully claim higher status through Sanskritisation?",
           "Possession of substantial economic wealth or numerical demographic strength to resist upper-caste opposition",
           ["A formal written decree issued by the British monarch", "Complete lack of any agricultural land or financial resources", "Ownership of steamship shipping lines across international waters"],
           "Without economic leverage or numerical weight, upper castes would suppress lower-caste ritual mobility claims."),
    case_q("Cultural Change", "Dalit Critique of Sanskritisation",
           "Why do Dalit intellectuals critically evaluate Sanskritisation according to the passage?",
           "Because it accepts and legitimizes Brahminical caste hierarchy instead of overthrowing structural caste injustice",
           ["Because it makes religious rituals too short and inexpensive", "Because it forces everyone to speak English exclusively", "Because it bans the construction of brick houses in rural areas"],
           "Dalit thinkers argue that Sanskritisation buys into upper-caste superiority rather than annihilating caste."),
    case_q("Cultural Change", "Impact on Women",
           "What adverse social consequence on women is frequently associated with Sanskritisation according to the text?",
           "Imposition of tighter patriarchal controls, purdah, and restrictions on female autonomy to emulate upper-caste norms",
           ["Granting women total legal ownership of all community agricultural property", "Abolishing all forms of marriage and family life", "Mandatory recruitment of women into naval military academies"],
           "Emulating twice-born norms frequently involves adopting upper-caste patriarchal practices like dowry and female seclusion."),
    case_q("Cultural Change", "Cultural Cost of Sanskritisation",
           "What cultural loss occurs among lower castes when they undergo Sanskritisation according to the passage?",
           "Erosion of rich, indigenous, and egalitarian folk cultural expressions and artisanal traditions",
           ["Loss of the ability to cultivate agricultural crops", "The complete disappearance of spoken regional languages", "The destruction of modern electronic household appliances"],
           "Mimicking Brahminical orthodoxy leads to the devaluation and abandonment of vibrant local folk culture.")
]

P2_M4_TXT = (
    "Read the following excerpt on grassroots democracy in India:\n\n"
    "The 73rd and 74th Constitutional Amendment Acts of 1992 marked a historic watershed in India's democratic journey by providing "
    "constitutional status to local self-government institutions in rural and urban areas. The 73rd Amendment institutionalized a three-tier "
    "Panchayati Raj system comprising Gram Panchayats at the village level, Panchayat Samitis at the intermediate/block level, and Zilla Parishads "
    "at the district level. Crucially, it mandated that all registered adult voters in a village constitute the 'Gram Sabha', creating a platform "
    "for participatory deliberative democracy. To promote social justice, the amendment introduced mandatory reservations for Scheduled Castes "
    "and Scheduled Tribes in proportion to their population, and reserved not less than one-third of all seats and leadership positions for women. "
    "While entrenched rural power structures and issues like proxy governance ('Sarpanch Pati') initially hindered smooth functioning, "
    "electoral reservations have progressively empowered marginalized communities, fostering a new cadre of assertive women grassroots leaders."
)
P2_M4_QS = [
    case_q("The Story of Indian Democracy", "73rd Amendment Milestone",
           "What historic constitutional milestone was accomplished by the 73rd and 74th Constitutional Amendment Acts of 1992?",
           "Granting constitutional status and institutional backing to local self-governments in rural and urban areas",
           ["Dissolving the Parliament of India in favor of a military junta", "Abolishing all state legislative assemblies permanently", "Restricting the right to vote solely to property-owning urban citizens"],
           "The 1992 amendments gave constitutional entrenchment to Panchayati Raj and urban local governance."),
    case_q("The Story of Indian Democracy", "Three-Tier Structure",
           "What are the three tiers of the Panchayati Raj system established under the 73rd Constitutional Amendment?",
           "Gram Panchayat (village), Panchayat Samiti (block), and Zilla Parishad (district)",
           ["Municipal Corporation, Rajya Sabha, and Lok Sabha", "Gram Sabha, Supreme Court, and High Court", "Cantonment Board, Port Trust, and Town Area Committee"],
           "The statutory three tiers are village (Gram Panchayat), block (Panchayat Samiti), and district (Zilla Parishad)."),
    case_q("The Story of Indian Democracy", "Gram Sabha Composition",
           "According to the excerpt, who comprises the 'Gram Sabha'?",
           "All adult registered voters residing within the village panchayat jurisdiction",
           ["Only the elected male elders who own more than fifty acres of land", "A group of retired military officers appointed by the Governor", "Government revenue officers and police constables on duty"],
           "The Gram Sabha is the assembly of all adult registered voters in the village."),
    case_q("The Story of Indian Democracy", "Mandatory Reservation for Women",
           "What minimum percentage of total seats and sarpanch leadership posts is constitutionally reserved for women in Panchayats?",
           "Not less than one-third (33%)",
           ["Exactly 10%", "50% in the original 1992 text", "Zero; women reservations are purely optional"],
           "Article 243D(3) mandated that at least one-third of all seats be reserved for women."),
    case_q("The Story of Indian Democracy", "Sarpanch Pati Challenge",
           "What phenomenon is described in the text as an initial hurdle to women's genuine empowerment in local bodies?",
           "The 'Sarpanch Pati' phenomenon, where male spouses exercise actual executive authority on behalf of elected women",
           ["Women refusing to allow men to enter village borders", "The total absence of elections in rural districts", "A constitutional ban on women speaking in public village meetings"],
           "The informal usurpation of power by male relatives (Sarpanch Pati) historically undermined women's leadership autonomy.")
]

# Mock 5
P1_M5_TXT = (
    "Read the following excerpt on ecological movements in India:\n\n"
    "The Chipko movement, which originated in the early 1970s in the Garhwal Himalayas of Uttarakhand, stands as one of India's most celebrated "
    "ecological struggles. The movement began as a local protest when the state forest department denied local villagers ash trees to make agricultural tools, "
    "while awarding a commercial logging contract for the same forest to a sports goods manufacturer from the plains. Under the leadership of figures "
    "like Chandi Prasad Bhatt, Sundarlal Bahuguna, and Gaura Devi, village women embraced (chipko) trees, physically shielding them from loggers' axes. "
    "Chipko was not merely an environmental protest against tree felling; it was an eco-feminist movement for economic survival. Mountain women "
    "bore the daily brunt of walking miles for firewood, fodder, and clean drinking water, and they understood that deforestation directly triggered "
    "lethal landslides and flash floods. Chipko transformed global environmental consciousness, demonstrating that poor rural communities are the foremost "
    "guardians of ecology because their survival is inextricably linked to the health of natural forests."
)
P1_M5_QS = [
    case_q("Social Movements", "Immediate Spark for Chipko",
           "What immediate event provoked local villagers to initiate the Chipko protest in the Garhwal Himalayas?",
           "The state forest department denying local villagers wood for farming tools while awarding commercial logging rights to a sports goods company",
           ["A total ban on Himalayan pilgrimages imposed by the central government", "The construction of a giant nuclear power station in the mountain forest", "The sudden arrival of commercial tea planters from Great Britain"],
           "Chipko began when the state favored a commercial sports company over local subsistence tool needs."),
    case_q("Social Movements", "Protest Technique",
           "What distinctive non-violent protest tactic gave the Chipko movement its iconic name?",
           "Villagers (predominantly women) physically hugging the tree trunks to shield them from commercial axes",
           ["Setting fire to government administrative headquarters in the valley", "Blocking railway tracks with herds of wild mountain goats", "Boycotting the consumption of all salt and grain"],
           "'Chipko' means to hug or cling; women encircled trees to physically protect them from being felled."),
    case_q("Social Movements", "Women's Central Role",
           "Why did hill women take the vanguard leadership role in the Chipko movement according to the passage?",
           "Because deforestation directly destroyed their everyday access to firewood, fodder, and clean water, increasing their daily survival burden",
           ["Because men were legally banned from residing in Himalayan mountain villages", "Because women were employed as corporate executives of the logging firm", "Because the local forest deities exclusively permitted women to enter forests"],
           "Deforestation forced women to walk hours for fuel and fodder and exposed them to deadly landslides."),
    case_q("Social Movements", "Eco-Feminism Connection",
           "In sociological analysis, why is the Chipko movement widely analyzed through the framework of 'Eco-Feminism'?",
           "It demonstrated the intimate connection between the survival of rural women and the conservation of natural ecosystems",
           ["It advocated the total replacement of all natural trees with synthetic plastic poles", "It demanded that only men be permitted to collect water from mountain streams", "It called for the privatization of all Himalayan rivers into commercial water parks"],
           "Eco-feminism links the patriarchal exploitation of nature with the disproportionate hardships inflicted on women."),
    case_q("Social Movements", "Broader Significance",
           "How did the Chipko movement alter the global perspective on environmental protection?",
           "It showed that poor rural communities are natural conservationists whose survival depends directly on forest ecological health",
           ["It proved that environmentalism is only a luxury concern for wealthy Western tourists", "It argued that all commercial sports must be permanently banned worldwide", "It proved that tree felling is essential for controlling mountain rainfall"],
           "Chipko established that Third World environmentalism is a struggle for basic survival and livelihood justice.")
]

P2_M5_TXT = (
    "Read the following excerpt on 19th-century social reform in India:\n\n"
    "The 19th-century social reform movement in western India produced radical critiques of patriarchal gender norms. "
    "In 1882, Tarabai Shinde published 'Stri Purush Tulana' (A Comparison between Women and Men), which is considered one of the earliest "
    "indigenous feminist texts in modern Indian history. Shinde wrote the tract in response to the intense public condemnation of a young Brahmin widow, "
    "Vijayalakshmi, who was sentenced to death for infanticide after terminating an unwanted pregnancy. Shinde ruthlessly exposed the double standards "
    "of a male-dominated society that preached absolute chastity and seclusion for widows while permitting upper-caste men unrestrained moral laxity. "
    "Simultaneously, Pandita Ramabai challenged orthodox patriarchy through her erudite scholarship and institutional activism. Ramabai founded "
    "the 'Sharada Sadan' in 1889 to educate and economically rehabilitate high-caste child widows. In her groundbreaking English work, 'The High-Caste "
    "Hindu Woman' (1887), Ramabai laid bare the systemic physical and psychological violence inflicted on upper-caste Hindu women throughout their life cycle."
)
P2_M5_QS = [
    case_q("Cultural Change", "Stri Purush Tulana Publication",
           "Who authored the radical feminist text 'Stri Purush Tulana' published in 1882?",
           "Tarabai Shinde",
           ["Pandita Ramabai", "Savitribai Phule", "Begum Rokeya Sakhawat Hossain"],
           "Tarabai Shinde authored 'Stri Purush Tulana' in Marathi in 1882."),
    case_q("Cultural Change", "Direct Catalyst for Shinde's Work",
           "What specific incident prompted Tarabai Shinde to write 'Stri Purush Tulana' according to the passage?",
           "The harsh trial and public condemnation of a young Brahmin widow for infanticide following an unwanted pregnancy",
           ["The passing of the British Vernacular Press Act", "The introduction of railways connecting Pune to Bombay", "The foundation of the Indian National Congress in Bombay"],
           "The Vijayalakshmi case exposed societal misogyny, prompting Shinde to write her biting feminist defense."),
    case_q("Cultural Change", "Core Argument of Shinde",
           "What was the central ideological critique advanced by Tarabai Shinde in her essay?",
           "Exposing the hypocritical double standards of male-dominated society that policed women's chastity while excusing male vices",
           ["Demanding that British colonizers be given total ownership over Indian temples", "Advocating that women completely withdraw from reading and writing", "Arguing that men and women should live in separate sovereign nations"],
           "Shinde dismantled patriarchal double standards regarding virtue, fidelity, and moral judgment."),
    case_q("Cultural Change", "Pandita Ramabai's Institution",
           "Which institution was established by Pandita Ramabai in 1889 to support and educate destitute high-caste widows?",
           "Sharada Sadan",
           ["Satyashodhak Samaj", "Brahmo Samaj", "Seva Sadan"],
           "Ramabai established Sharada Sadan (Home for Learning) to provide shelter and education to young widows."),
    case_q("Cultural Change", "The High-Caste Hindu Woman",
           "What was the main theme of Pandita Ramabai's English treatise 'The High-Caste Hindu Woman' (1887)?",
           "Exposing the systemic physical, emotional, and social oppression suffered by high-caste Hindu women under strict patriarchal dogmas",
           ["A statistical analysis of colonial railway passenger revenues", "A compilation of classical Sanskrit hymns dedicated to ancient kings", "A travel memoir celebrating the royal palaces of Europe"],
           "Ramabai documented the oppressive life cycle of high-caste women: child marriage, subjugation, and widowhood.")
]

# Mock 6 to 10 will be defined below
# Mock 6
P1_M6_TXT = (
    "Read the following excerpt on the informal economy and footloose labour:\n\n"
    "Sociologist Jan Breman's extensive fieldwork in southern Gujarat provides deep insights into the condition of informal and migrant labour. "
    "Breman introduced the concept of 'Footloose Labour' to describe the precarious existence of millions of landless rural workers who are forced "
    "to circulate continuously between agricultural fields, brick kilns, sugarcane cutting, and urban construction sites. These migrant workers "
    "are neither purely rural peasants nor secure urban factory workers. They are denied written employment contracts, health benefits, minimum wages, "
    "or statutory social security. Employers deliberately prefer migrant workers over local labor because migrants are socially isolated, have no local "
    "political connections, and lack the bargaining power to unionize. Trapped in a vicious cycle of seasonal migration and debt bondage mediated by "
    "labor contractors (mukadams), footloose laborers remain disposable cogs in India's capitalist growth engine."
)
P1_M6_QS = [
    case_q("Change and Development in Industrial Society", "Footloose Labour Concept",
           "Who introduced the sociological concept of 'Footloose Labour' to analyze precarious migrant workers in India?",
           "Jan Breman",
           ["M.N. Srinivas", "G.S. Ghurye", "Louis Dumont"],
           "Jan Breman coined 'Footloose Labour' through his landmark ethnographic research in Gujarat."),
    case_q("Change and Development in Industrial Society", "Defining Characteristics",
           "How does the text characterize the working life of 'footloose labour'?",
           "Circulating continuously between informal seasonal jobs (brick kilns, farm harvesting, construction) without written contracts or security",
           ["Holding permanent government bureaucratic posts with guaranteed lifetime pensions", "Managing multinational corporate software subsidiaries in technology parks", "Living as self-sufficient organic farmers who never leave their home village"],
           "Footloose workers circulate between precarious informal jobs without stability or statutory rights."),
    case_q("Change and Development in Industrial Society", "Employer Preference for Migrants",
           "Why do capitalist employers and contractors prefer hiring migrant laborers over local workers according to Breman?",
           "Migrants are socially isolated, lack local roots or political backing, and cannot easily organize or demand higher wages",
           ["Migrants demand to be paid five times more than local workers", "Migrants refuse to work more than two hours per day", "Local laws mandate that only migrants can operate modern machinery"],
           "Employers exploit migrants' vulnerability, lack of local networks, and weak bargaining capacity."),
    case_q("Change and Development in Industrial Society", "Role of Mukadams",
           "What role is played by 'mukadams' (labor contractors) in the lives of footloose migrant workers?",
           "They recruit workers through advance cash loans, mediating seasonal migration and perpetuating debt peonage",
           ["They provide free university scholarships to all migrant children", "They represent workers as defense lawyers in international human rights courts", "They distribute free agricultural land to all landless peasants"],
           "Mukadams advance loans to destitute families, binding them to grueling seasonal work contracts."),
    case_q("Change and Development in Industrial Society", "Informal Sector Vulnerability",
           "What systemic deprivation do footloose workers endure in the informal economy according to the passage?",
           "Complete absence of written contracts, statutory minimum wages, occupational health safety, and social security",
           ["Compulsory annual luxury vacations paid by corporate owners", "Automatic ownership of factory equity shares after one month of work", "Exemption from paying any price for food and consumer commodities"],
           "Informalization denies workers legal standing, safety nets, minimum wages, or health insurance.")
]

P2_M6_TXT = (
    "Read the following excerpt on globalisation and cultural change:\n\n"
    "Globalisation has dramatically accelerated cultural and economic integration worldwide. In the sphere of culture, scholars debate whether "
    "globalisation produces cultural homogenization or cultural heterogenization. Cultural homogenization suggests that global capitalism promotes "
    "a standardized, Western-centric consumer culture—frequently described as 'McDonaldisation' or 'Americanisation'—which threatens to drown local traditions. "
    "Conversely, cultural heterogenization highlights the emergence of 'Glocalisation', where global cultural products are creatively reworked and "
    "hybridized by local populations. In India, multinational corporations quickly realized that universal products cannot succeed without adapting to "
    "local cultural sensitivities. Fast-food chains introduced vegetarian and spicy menus (such as McAloo Tikki), satellite television channels broadcast "
    "regional-language soap operas, and music producers popularized 'Indipop' and 'Bhangra remix'. Thus, rather than wiping out local identities, "
    "globalisation often revitalizes and re-articulates cultural forms for commercial markets."
)
P2_M6_QS = [
    case_q("Globalisation and Social Change", "Homogenization vs Heterogenization",
           "What is the core argument of 'cultural homogenization' in the globalisation debate?",
           "Global capitalism spreads a uniform, standardized Western consumer lifestyle that threatens diverse local traditions",
           ["Every country in the world adopts an entirely different ancient tribal dialect", "The total abolition of all international trade and air travel", "The worldwide ban on using television, cinema, and music"],
           "Cultural homogenization fears the loss of local diversity under a standardized corporate culture."),
    case_q("Globalisation and Social Change", "Concept of Glocalisation",
           "In sociological analysis, what does the term 'Glocalisation' refer to?",
           "The mutual adaptation and blending of global cultural products with specific local tastes, values, and traditions",
           ["The complete shutdown of all global internet communication lines", "A legal mandate requiring all citizens to purchase only locally hand-woven textiles", "The relocation of all world corporate headquarters to rural desert villages"],
           "Glocalisation describes how global brands tailor products to match local cultural preferences."),
    case_q("Globalisation and Social Change", "Corporate Adaptation Example",
           "Which example is provided in the passage to demonstrate glocalisation in the Indian food industry?",
           "Global fast-food chains creating specialized vegetarian and spicy items like the McAloo Tikki burger",
           ["Banning the sale of any agricultural produce in metropolitan cities", "Requiring all restaurant customers to eat only boiled potatoes without salt", "Serving European frozen bread exclusively across all Indian villages"],
           "Fast-food giants modified menus to accommodate Indian vegetarianism and spicy flavour profiles."),
    case_q("Globalisation and Social Change", "Media Glocalisation",
           "How did international satellite television channels adapt to the Indian market according to the excerpt?",
           "By launching regional-language broadcasts and producing Indianized soap operas and game shows",
           ["By broadcasting only silent documentaries in black-and-white", "By banning all regional Indian languages from television screens", "By airing 24-hour live coverage of Antarctic snowstorms exclusively"],
           "Media conglomerates localized content into Hindi and regional languages to capture domestic audiences."),
    case_q("Globalisation and Social Change", "Overall Cultural Impact",
           "What does the passage conclude regarding the relationship between globalisation and local cultural identities?",
           "Globalisation does not simply erase local identities; it often hybridizes and re-articulates them within commercial markets",
           ["Local cultural identities have been 100% annihilated across all human societies", "No foreign product or technology has ever entered the Indian subcontinent", "People have completely stopped celebrating festivals and listening to music"],
           "Global cultural flows interact dialectically with local contexts, producing innovative hybrid cultural forms.")
]

# Mock 7
P1_M7_TXT = (
    "Read the following excerpt on communalism and secularism in India:\n\n"
    "In Indian sociology, 'Communalism' refers to an aggressive political ideology that constructs religious identity as the primary basis "
    "for political and socio-economic allegiance. Communalism asserts that people of the same religion share identical political, economic, "
    "and cultural interests, which are inherently antagonistic to the interests of people practicing other religions. Sociologists distinguish "
    "communalism from mere personal piety or religious devotion. While religiosity is an individual's private spiritual faith, communalism is "
    "a modern political phenomenon that weaponizes religious symbols to mobilize masses, capture state power, and suppress democratic pluralism. "
    "To counter this divisive ideology, the Indian Constitution adopted a distinctive model of 'Secularism'. Unlike the rigid Western secular model "
    "of strict separation between Church and State, Indian secularism is characterized by 'principled distance', ensuring equal respect for all "
    "religions (Sarva Dharma Sambhava) and positive state intervention to protect the fundamental rights and cultural autonomy of religious minorities."
)
P1_M7_QS = [
    case_q("The Challenges of Cultural Diversity", "Communalism Sociological Definition",
           "How does sociology define 'Communalism' in the Indian context?",
           "An aggressive political ideology that treats religious identity as the sole basis of collective political loyalty and conflict",
           ["A peaceful community gathering to celebrate harvest festivals", "A scientific method for measuring atmospheric air pressure", "An architectural style used exclusively for constructing suspension bridges"],
           "Communalism politicizes religion, asserting irreconcilable conflict between different religious communities."),
    case_q("The Challenges of Cultural Diversity", "Religiosity vs Communalism",
           "According to the passage, what is the crucial distinction between 'religiosity' and 'communalism'?",
           "Religiosity is an individual's private spiritual faith, whereas communalism is a modern political tool used to capture power",
           ["Religiosity is illegal under the Constitution, while communalism is legally mandatory", "Religiosity is practiced only by foreign visitors, while communalism is practiced only by children", "There is zero difference; sociology treats them as identical"],
           "Personal religious faith is distinct from communalism, which is the political manipulation of religious identities."),
    case_q("The Challenges of Cultural Diversity", "Antagonistic Assumption",
           "What erroneous foundational premise does communal ideology propagate according to the text?",
           "That individuals belonging to the same religion share identical interests that are inherently hostile to other religious groups",
           ["That all human beings share identical biological DNA across all continents", "That learning modern mathematics is necessary for agricultural prosperity", "That universal adult franchise should be granted to all citizens"],
           "Communalism falsely assumes monolithic internal solidarity and inevitable hostility toward out-groups."),
    case_q("The Challenges of Cultural Diversity", "Indian vs Western Secularism",
           "How does Indian constitutional secularism differ from the classical Western secular model according to the excerpt?",
           "Indian secularism maintains 'principled distance' and equal respect for all faiths, rather than absolute mutual exclusion between Church and State",
           ["Indian secularism mandates that all citizens must renounce their religious faith", "Western secularism requires the state to build places of worship for all citizens", "Indian secularism recognizes only one single religion as the official state church"],
           "Indian secularism provides equal tolerance, non-discrimination, and minority protections rather than strict separation."),
    case_q("The Challenges of Cultural Diversity", "Minority Protections",
           "Why does the Indian constitutional model permit state intervention in religious affairs?",
           "To safeguard minority cultural rights, uphold social justice (such as abolishing untouchability), and guarantee non-discrimination",
           ["To force all citizens to change their religious beliefs every five years", "To confiscate all religious books and burn them in public squares", "To prevent citizens from speaking their native languages"],
           "The Indian state intervenes to reform internal social inequalities (e.g., untouchability) and protect minority liberties.")
]

P2_M7_TXT = (
    "Read the following excerpt on regionalism and linguistic reorganization:\n\n"
    "Following independence, the Indian state confronted the formidable challenge of integrating hundreds of princely states and diverse ethno-linguistic "
    "regions into a cohesive democratic union. The demand for reorganizing states along linguistic lines gained unstoppable momentum with the martyrdom "
    "of Potti Sreeramulu in 1952, who died after a 56-day hunger strike demanding a separate Telugu-speaking state. In response, Prime Minister Jawaharlal "
    "Nehru conceded the creation of Andhra State in 1953 and appointed the States Reorganisation Commission (SRC), chaired by Justice Fazal Ali. "
    "The SRC's recommendations resulted in the States Reorganisation Act of 1956, which dismantled the colonial administrative map and redrew state "
    "boundaries based primarily on shared language and cultural cohesion. While critics initially feared that linguistic federalism would Balkanize "
    "the country, historical evidence has proven the opposite: accommodating regional linguistic identities strengthened democratic participation, "
    "deepened federal unity, and defused violent secessionist tensions."
)
P2_M7_QS = [
    case_q("The Challenges of Cultural Diversity", "Catalyst for Linguistic States",
           "Which tragic event acted as the immediate catalyst forcing the government to concede linguistic state reorganization?",
           "The death of Potti Sreeramulu after a 56-day hunger strike demanding a separate Andhra state for Telugu speakers",
           ["The signing of the Treaty of Versailles in France", "The outbreak of the First World War in Europe", "The collapse of the Bombay Stock Exchange"],
           "Potti Sreeramulu's supreme sacrifice sparked massive protests that forced the immediate formation of Andhra."),
    case_q("The Challenges of Cultural Diversity", "States Reorganisation Commission",
           "Who served as the Chairman of the landmark States Reorganisation Commission (SRC) appointed in 1953?",
           "Justice Fazal Ali",
           ["Sardar Vallabhbhai Patel", "Dr. B.R. Ambedkar", "Jawaharlal Nehru"],
           "Justice Fazal Ali chaired the SRC, alongside members H.N. Kunzru and K.M. Panikkar."),
    case_q("The Challenges of Cultural Diversity", "States Reorganisation Act 1956",
           "What fundamental principle guided the redrawing of state boundaries under the States Reorganisation Act of 1956?",
           "Common regional language and socio-cultural cohesion",
           ["Annual average rainfall and temperature measurements", "The personal preference of colonial British district collectors", "The alphabetical order of the names of capital cities"],
           "The 1956 Act reorganized state boundaries primarily along linguistic lines."),
    case_q("The Challenges of Cultural Diversity", "Critics' Initial Fears",
           "What apprehension did political critics voice regarding the division of India into linguistic states?",
           "They feared that linguistic federalism would encourage sub-nationalism and lead to the balkanization/disintegration of India",
           ["They worried that citizens would refuse to eat food grown in neighboring provinces", "They feared that trains would be unable to travel across state borders", "They thought that all written literature would be permanently forgotten"],
           "Critics feared that linguistic states would fracture national unity and provoke regional secessionism."),
    case_q("The Challenges of Cultural Diversity", "Long-Term Democratic Impact",
           "What has been the actual long-term sociological outcome of linguistic state reorganization in India?",
           "It strengthened national unity, expanded democratic participation, and successfully defused regional secessionist tensions",
           ["It caused the total economic collapse of the Indian union", "It led to India being partitioned into fifty independent sovereign kingdoms", "It eliminated all regional languages in favor of classical Latin"],
           "Linguistic federalism reinforced national integrity by democratically accommodating regional linguistic pride.")
]

# Mock 8
P1_M8_TXT = (
    "Read the following excerpt on mass media and the print boom in India:\n\n"
    "In his influential study 'India's Newspaper Revolution', political scientist Robin Jeffrey examined the phenomenal expansion of the Indian "
    "regional-language press from the late 1970s onwards. While newspaper circulations were steadily plummeting across North America and Europe "
    "due to television and digital media, the vernacular print media in India experienced explosive, unprecedented growth. Jeffrey identified "
    "several interlocking structural drivers behind this boom: rising literacy rates in rural areas, the deepening of democratic awareness among "
    "intermediate and lower castes, aggressive doorstep distribution networks, and the decentralization of printing technology using computerized "
    "typesetting. Dailies like Dainik Jagran and Amar Ujala in the Hindi heartland, Eenadu in Andhra Pradesh, and Malayala Manorama in Kerala "
    "transformed journalism by launching hyper-local district and taluk pull-out editions. By reporting local village news, municipal corruption, "
    "and agricultural commodity prices, regional newspapers created a vibrant, localized public sphere."
)
P1_M8_QS = [
    case_q("Mass Media and Communications", "Robin Jeffrey's Landmark Study",
           "What unique global media paradox did Robin Jeffrey analyze in 'India's Newspaper Revolution'?",
           "The phenomenal growth of regional vernacular newspapers in India at a time when newspaper circulations were declining in the West",
           ["The complete disappearance of all written languages across Asia", "A worldwide ban on the purchase of television sets and radio receivers", "The total replacement of printed books with stone inscriptions"],
           "Jeffrey examined the unique Indian print boom that defied global trends of print decline."),
    case_q("Mass Media and Communications", "Key Drivers of Print Boom",
           "According to Jeffrey in the passage, which factor contributed significantly to the surge in vernacular newspaper readership?",
           "Rising rural literacy rates, democratic consciousness, and computerized printing technology enabling hyper-local editions",
           ["A statutory ban prohibiting citizens from watching television news", "The distribution of free gold coins inside daily newspapers", "A law requiring every citizen to memorize five editorial columns daily"],
           "Rising literacy, local political awareness, and computerized printing fueled the regional newspaper explosion."),
    case_q("Mass Media and Communications", "Hyper-local Reporting Strategy",
           "How did regional newspapers like Eenadu and Dainik Jagran transform daily journalism?",
           "By launching localized district and taluk editions that reported hyper-local village issues, grievances, and prices",
           ["By publishing only international cricket match scores from Australia", "By printing all stories exclusively in 18th-century French", "By refusing to cover any political or economic events in India"],
           "Decentralized pull-outs covering local grassroots news deeply connected newspapers with rural readers."),
    case_q("Mass Media and Communications", "Democratic Impact of Vernacular Press",
           "What was the broader sociological impact of the vernacular newspaper boom on rural society?",
           "It nurtured an informed, assertive grassroots public sphere and deepened democratic engagement among non-elites",
           ["It forced all villagers to abandon their agricultural land and move to cities", "It caused the complete collapse of all local village panchayats", "It banned women from participating in local educational institutions"],
           "Vernacular dailies broadened the democratic public sphere, giving voice to regional concerns and subaltern groups."),
    case_q("Mass Media and Communications", "Contrast with Western Trends",
           "Why did newspaper readership continue to expand in India while shrinking in Western nations during the 1980s and 1990s?",
           "Because India had an expanding base of newly literate first-generation readers entering political democracy, unlike saturated Western markets",
           ["Because Western nations ran out of printing paper and ink completely", "Because the Indian Constitution made reading newspapers legally compulsory for all adults", "Because internet technology was completely banned throughout Europe and America"],
           "Expanding mass literacy and rising democratic aspiration created vast new first-generation readerships in India.")
]

P2_M8_TXT = (
    "Read the following excerpt on agrarian distress and farmers' suicides:\n\n"
    "Over the past three decades, rural India has been engulfed by an acute agrarian crisis, manifested most tragically in the widespread suicides "
    "of over three lakh farmers. Extensive sociological investigations into suicide hotspots like Vidarbha in Maharashtra, the cotton belts of Telangana "
    "and Andhra Pradesh, and parts of Karnataka and Punjab reveal that this is not an individual psychological failure, but a structural systemic crisis. "
    "Under neoliberal economic reforms post-1991, the state progressively curtailed agricultural subsidies, reduced public extension services, "
    "and deregulated input markets. Small farmers were encouraged to shift from resilient subsistence food crops to highly capital-intensive commercial cash crops "
    "like Bt cotton and sugarcane. Farmers became dependent on expensive hybrid seeds, chemical fertilizers, and pesticides, purchased on credit at usurious interest "
    "rates from unregulated private moneylenders. When erratic monsoons, pest infestations, or global commodity price crashes struck, indebted farmers faced "
    "catastrophic losses, intense social dishonor, and predatory harassment, driving many to end their lives."
)
P2_M8_QS = [
    case_q("Change and Development in Rural Society", "Agrarian Crisis as Structural",
           "How do sociological studies characterize the epidemic of farmers' suicides in India?",
           "As a structural, systemic crisis rooted in agrarian policy changes and debt rather than individual psychological failure",
           ["As an accidental consequence of minor changes in seasonal bird migrations", "As a recreational pastime practiced by wealthy retired city dwellers", "As a fictitious myth invented by international travel bloggers"],
           "Sociology views farm suicides as symptomatic of structural distress: market vulnerability, input costs, and debt traps."),
    case_q("Change and Development in Rural Society", "Vulnerable Crop Sectors",
           "Which category of crops is most closely associated with the agrarian suicide crisis in Vidarbha and Telangana according to the text?",
           "Capital-intensive commercial cash crops like Bt cotton and sugarcane",
           ["Low-cost traditional subsistence millets like jowar and bajra", "Wild berries collected from remote Himalayan forests", "Medicinal herbs cultivated exclusively inside climate-controlled laboratories"],
           "High-risk, input-heavy commercial cash crops like hybrid cotton leave smallholders exposed to crippling losses."),
    case_q("Change and Development in Rural Society", "Role of Neoliberal Reforms",
           "What impact did post-1991 economic policies have on the agricultural sector according to the passage?",
           "Reduction of state subsidies, decline in public investment, and privatization/deregulation of agricultural inputs",
           ["A tripling of government price supports for all farm produce globally", "The nationalization of all private agricultural lands by the state", "The free distribution of imported tractors to every rural family"],
     "Neoliberal structural adjustment curtailed agricultural subsidies, extensions, and credit, leaving farmers to private markets."),
    case_q("Change and Development in Rural Society", "Debt and Private Moneylenders",
           "Why do cash-crop farmers fall into lethal debt traps with informal moneylenders?",
           "Expensive commercial inputs require large credit, and when formal bank loans are inaccessible, farmers borrow from private lenders at exorbitant interest",
           ["Moneylenders are legally required to forgive all loans every New Year's Day", "Private moneylenders provide interest-free charity to all villagers", "Banks refuse to accept Indian currency from agricultural cultivators"],
           "High input costs and inadequate formal bank credit drive farmers into predatory debt bondage with moneylenders."),
    case_q("Change and Development in Rural Society", "Triggers of Crisis",
           "Which combination of external shocks compounds indebtedness and triggers farm bankruptcies according to the text?",
           "Erratic monsoon failure, severe pest attacks, and volatile crashes in global agricultural commodity prices",
           ["Excessive government cash subsidies distributed directly to farmers' bank accounts", "An international ban on the consumption of cotton clothing", "Excessive snowfall across central Indian farmlands during summer"],
           "Crop failures combined with unregulated input costs and global commodity price swings precipitate catastrophic insolvency.")
]

# Mock 9
P1_M9_TXT = (
    "Read the following excerpt on industrialization and the working class:\n\n"
    "Industrial development in late 19th- and early 20th-century India transformed urban spaces and the organization of labor. "
    "In burgeoning industrial centers like Bombay and Ahmedabad, cotton textile mills became the epicenters of industrial wage work. "
    "To house the tens of thousands of rural migrants flocking from the Konkan and Deccan regions, private landlords and mill owners constructed 'chawls'—"
    "high-density, multi-storey tenements consisting of single-room units opening onto long common corridors. Entire families lived, cooked, and slept "
    "in cramped, poorly ventilated ten-by-ten-foot rooms, sharing common communal toilets on each floor. Inside the mills, work was organized under "
    "rigorous managerial regimes that anticipated Frederick Winslow Taylor's 'Scientific Management'. Work was fragmented into minute, repetitive tasks "
    "under the strict supervision of jobbers (sirdars). Despite squalid physical living conditions, the chawls fostered a vibrant, resilient working-class "
    "culture. Shared neighborhood spaces gave birth to collective community festivals, street theater (tamasha), physical akhadas, and formidable trade unions "
    "that launched historic general strikes like the 1982 Bombay Textile Strike."
)
P1_M9_QS = [
    case_q("Change and Development in Industrial Society", "The Bombay Chawls",
           "What were 'chawls' in early 20th-century Bombay according to the passage?",
           "High-density multi-storey tenements with single-room units and shared amenities built to house migrant textile mill workers",
           ["Spacious luxury beachfront bungalows reserved for colonial British governors", "Underground air-raid bunkers constructed during wartime emergencies", "Open-air cattle sheds used for breeding draught bullocks"],
           "Chawls were cramped working-class tenements built to house migrant cotton mill laborers."),
    case_q("Change and Development in Industrial Society", "Taylorism in the Mills",
           "How was mill floor labor organized in a manner reflecting 'Scientific Management' (Taylorism)?",
           "Work was fragmented into minute, repetitive, timed tasks under the intense oversight of jobbers and managers",
           ["Every mill worker was given complete artistic freedom to design their own fabrics", "Workers decided their own working hours and corporate profit shares", "All factory machines were operated entirely by solar power"],
           "Taylorism standardized and fragmented tasks to strip autonomy from workers and concentrate managerial supervision."),
    case_q("Change and Development in Industrial Society", "Role of the Jobber",
           "What crucial administrative and recruitment role did the 'jobber' (sirdar/mukadam) perform in colonial factories?",
           "Recruiting rural workers from villages, securing them factory jobs, housing, and exercising strict disciplinary surveillance on the mill floor",
           ["Serving as the elected mayor of Bombay Municipal Corporation", "Managing the foreign exchange reserves of the British Empire", "Designing modern steam turbines in university engineering labs"],
           "The jobber was a pivotal intermediary who recruited village labor, loaned money, and disciplined factory workers."),
    case_q("Change and Development in Industrial Society", "Working-Class Culture in Chawls",
           "What positive sociological phenomenon emerged from the shared residential life of the chawls despite physical hardships?",
           "A vibrant working-class solidarity expressed through community festivals, folk theater (tamasha), akhadas, and trade unions",
           ["The complete elimination of all human conversation and culture", "The total abandonment of all trade unions in favor of corporate management", "The voluntary emigration of all residents to Antarctica"],
           "Chawl life generated intense social solidarity, collective resistance, and rich working-class cultural institutions."),
    case_q("Change and Development in Industrial Society", "Historic Industrial Struggle",
           "Which momentous working-class industrial action mentioned in the text symbolized the pinnacle of Bombay's textile union movement?",
           "The 1982 Great Bombay Textile Strike led by Dr. Datta Samant",
           ["The Champaran Indigo Satyagraha of 1917", "The Royal Indian Navy Revolt of 1946", "The Tebhaga Movement in Bengal of 1946"],
           "The 1982 Bombay Textile Strike involved nearly 2.5 lakh workers and reshaped Mumbai's political and urban economy.")
]

P2_M9_TXT = (
    "Read the following excerpt on disability, stigma, and social rights:\n\n"
    "Sociological studies of disability have radically shifted the analytical lens from a 'medical model' to a 'social model'. "
    "Under the traditional medical model, disability is viewed as an individual biological pathology, a personal tragedy, or a medical deficit "
    "that requires curing or charitable pity. In contrast, the social model developed by disability rights activists asserts that disability "
    "is constructed by an exclusionary and discriminatory society. It is the built environment—lacking ramps, accessible public transport, "
    "and braille signage—combined with entrenched societal prejudice, that transforms a physical impairment into a disabling social handicap. "
    "In India, sociologists highlight the pervasive cultural stigma surrounding disability, often linked to superstitious beliefs about past karma. "
    "The Rights of Persons with Disabilities (RPWD) Act of 2016 marked a paradigm shift in Indian policy. Expanding the recognized categories "
    "of disabilities from 7 to 21, the Act legally mandated accessibility in all public infrastructure, reserved 4% of government jobs for persons "
    "with benchmark disabilities, and framed disability not as an object of patronizing charity, but as a matter of fundamental constitutional human rights."
)
P2_M9_QS = [
    case_q("Patterns of Social Inequality and Exclusion", "Medical vs Social Model",
           "What is the foundational difference between the 'medical model' and the 'social model' of disability?",
           "The medical model views disability as an individual biological deficit, while the social model views it as structural societal exclusion",
           ["The medical model operates only in rural clinics, while the social model operates only in luxury hotels", "The medical model has been outlawed by the United Nations, while the social model is a pharmaceutical drug", "There is zero conceptual difference between the two models"],
           "The social model locates disability not in impaired bodies, but in an unaccommodating and discriminatory society."),
    case_q("Patterns of Social Inequality and Exclusion", "Disabling Built Environment",
           "According to the social model in the text, what actually transforms a physical impairment into a debilitating social disability?",
           "Inaccessible public infrastructure (lack of ramps, accessible transit) combined with discriminatory social attitudes",
           ["A formal decree passed by the World Health Organization", "The absence of gold and silver in local banks", "The failure of seasonal monsoons in agricultural plains"],
           "Society disables individuals by creating physical and institutional barriers that prevent full civic participation."),
    case_q("Patterns of Social Inequality and Exclusion", "Cultural Stigma in India",
           "What deep-seated cultural stereotype regarding disability in traditional Indian society is cited in the passage?",
           "Superstitious fatalistic beliefs associating disability with past-life karma or divine retribution",
           ["The belief that persons with disabilities possess magical superpowers", "The practice of appointing only disabled individuals as monarchs", "The belief that disability is caused by reading modern books"],
           "Disability is frequently stigmatized through fatalistic karmic doctrines that blame individuals for their condition."),
    case_q("Patterns of Social Inequality and Exclusion", "RPWD Act 2016 Expansion",
           "How did the Rights of Persons with Disabilities (RPWD) Act of 2016 expand legal coverage for disabled persons in India?",
           "It expanded the recognized categories of disabilities from 7 to 21 and increased government job reservation to 4%",
           ["It reduced recognized disabilities to zero, declaring disability illegal", "It mandated the institutionalization of all disabled persons in remote asylum barracks", "It prohibited disabled citizens from attending schools and universities"],
           "The 2016 Act broadened coverage from 7 to 21 conditions and raised public employment quotas to 4%."),
    case_q("Patterns of Social Inequality and Exclusion", "Rights-based Paradigm Shift",
           "What profound conceptual transition does the RPWD Act of 2016 represent in Indian jurisprudence?",
           "A transition from patronizing medical charity and pity to an entitlement of fundamental constitutional human rights and dignity",
           ["A return to medieval banishment of disabled persons from settlements", "A requirement that all disabled persons surrender their personal property to the state", "The replacement of scientific medicine with traditional alchemy"],
           "The Act legally enshrines accessibility, non-discrimination, and autonomy as universal human rights.")
]

# Mock 10
P1_M10_TXT = (
    "Read the following excerpt on caste and electoral politics in India:\n\n"
    "In his classic treatise 'Caste in Indian Politics' (1970), political scientist Rajni Kothari challenged the conventional modernization theory "
    "which predicted that democratic institutions would rapidly dissolve the caste system. Instead, Kothari argued that democracy and caste engaged "
    "in a dynamic reciprocal relationship: 'politics uses caste and caste uses politics'. In the arena of mass democratic elections, caste undergoes "
    "a profound process of secularisation. Stripped of its traditional ritual taboos regarding commensality and ritual purity, caste transforms into "
    "an effective vehicle for political mobilization, interest articulation, and competitive electoral bargaining. Political parties construct "
    "social coalitions of caste groups (such as the KHAM alliance in Gujarat or the AJGAR coalition in northern India) to secure parliamentary majorities. "
    "Simultaneously, lower and backward castes utilize caste associations to challenge upper-caste hegemony, demanding their rightful share in "
    "state power, educational reservations, and bureaucratic employment. Thus, democratic politics has instrumentalized caste, turning an ancient "
    "instrument of graded inequality into an engine of subaltern empowerment."
)
P1_M10_QS = [
    case_q("Social Institutions: Continuity and Change", "Kothari's Core Thesis",
           "What is Rajni Kothari's seminal argument regarding the relationship between caste and modern democracy in India?",
           "Democracy did not destroy caste; rather, politics uses caste and caste uses politics in a dynamic reciprocal engagement",
           ["Caste was completely eliminated from Indian society the moment the Constitution took effect in 1950", "Caste operates exclusively as a secret society dedicated to overthrowing the government", "Democratic elections are banned whenever caste groups assemble"],
           "Kothari demonstrated that democratic politics instrumentalizes caste, transforming it into a political resource."),
    case_q("Social Institutions: Continuity and Change", "Secularisation of Caste",
           "What is meant by the 'secularisation of caste' in modern electoral politics according to the excerpt?",
           "Caste groups shed ancient ritual taboos of purity-pollution and organize as secular interest groups demanding power and reservations",
           ["All citizens are legally required to delete their caste names from birth certificates", "Caste leaders are prohibited by law from practicing their personal religion", "Caste councils are converted into commercial shopping mall boards"],
           "Caste operates not as a ritual hierarchy of pollution, but as an organized interest pressure group."),
    case_q("Social Institutions: Continuity and Change", "Electoral Coalitions Example",
           "Which of the following regional political alliances is mentioned in the text as an example of multi-caste electoral engineering?",
           "The KHAM alliance in Gujarat and the AJGAR coalition in northern India",
           ["The North Atlantic Treaty Organization (NATO)", "The European Economic Community", "The League of Nations"],
           "Parties engineer caste alliances (like KHAM: Kshatriya, Harijan, Adivasi, Muslim) to assemble winning vote coalitions."),
    case_q("Social Institutions: Continuity and Change", "Subaltern Empowerment",
           "How do marginalized and backward castes leverage caste associations in modern democracy according to Kothari?",
           "To organize collective resistance against upper-caste dominance and demand reservations and shares in state power",
           ["To surrender all their voting rights to traditional feudal monarchs", "To ban their youth from receiving modern school education", "To dismantle the Constitution of India and abolish parliamentary democracy"],
           "Subaltern castes use caste identity strategically to demand affirmative action, dignity, and political representation."),
    case_q("Social Institutions: Continuity and Change", "Paradox of Caste in Democracy",
           "What historical paradox about caste in modern India does the passage highlight?",
           "An ancient hierarchical system of graded inequality has been transformed into a powerful instrument of democratic subaltern empowerment",
           ["Caste has made India the wealthiest country in the world in gold bullion", "Caste has prevented any elections from taking place in independent India", "Caste exists only among foreign tourists who visit India"],
           "Democratic universal suffrage inverted caste, turning an instrument of feudal subjugation into a weapon of mass political assertion.")
]

P2_M10_TXT = (
    "Read the following excerpt on environmental movements and displacement:\n\n"
    "The Narmada Bachao Andolan (NBA), spearheaded by Medha Patkar and Baba Amte from the mid-1980s onwards, is one of independent India's "
    "most enduring and iconic environmental mass movements. The movement mobilized against the construction of a network of massive mega-dams—"
    "most prominently the Sardar Sarovar Dam in Gujarat—along the Narmada River basin. NBA brought to national and global prominence the catastrophic "
    "human and ecological costs of large development projects. The construction of the mega-dam submerged thousands of hectares of prime agricultural "
    "land and pristine deciduous forests, displacing over two lakh people, predominantly vulnerable adivasi and peasant communities across Madhya Pradesh, "
    "Maharashtra, and Gujarat. The movement exposed the hollow promises of official resettlement and rehabilitation (R&R) policies, highlighting how "
    "displaced families were pushed into squalid resettlement colonies without fertile land or clean water. NBA questioned the very paradigm of "
    "'development' that sacrifices marginalized tribal populations for the benefit of urban industries and affluent agribusinesses, championing the "
    "constitutional right to life, livelihood, and river valley ecological integrity."
)
P2_M10_QS = [
    case_q("Social Movements", "Focal Point of NBA Protest",
           "What was the central infrastructure project opposed by the Narmada Bachao Andolan (NBA)?",
           "The construction of large mega-dams, particularly the Sardar Sarovar Dam on the Narmada River",
           ["The construction of the Golden Quadrilateral highway network", "The expansion of Mumbai International Airport", "The installation of nuclear submarine docks along the Arabian Sea"],
           "NBA organized mass resistance against large dams in the Narmada valley, centering on Sardar Sarovar."),
    case_q("Social Movements", "Prominent Leadership",
           "Who are the prominent leaders of the Narmada Bachao Andolan mentioned in the passage?",
           "Medha Patkar and Baba Amte",
           ["Sundarlal Bahuguna and Gaura Devi", "Dr. Datta Samant and George Fernandes", "Vinoba Bhave and Jayaprakash Narayan"],
           "Medha Patkar and social worker Baba Amte were foremost leaders of the Narmada movement."),
    case_q("Social Movements", "Human and Ecological Costs",
           "What devastating consequences of the dam project were highlighted by the Narmada movement?",
           "Submergence of fertile lands and forests, and forced displacement of over two lakh predominantly adivasi and peasant people",
           ["A total freeze on all international commercial shipping lanes", "The sudden migration of all Himalayan birds to North America", "The destruction of historical stone monuments in Delhi"],
           "The dam inundated vast riverine valleys and forests, uprooting hundreds of thousands of adivasi families."),
    case_q("Social Movements", "Failure of Resettlement Policies",
           "What critical flaw in state rehabilitation and resettlement (R&R) policies did the NBA expose?",
           "Displaced families were not given equivalent land-for-land and were pushed into squalid colonies without basic civic amenities",
           ["Displaced families were given excessive amounts of gold bullion by the state", "The government appointed every displaced tribal as a high court judge", "Resettlement colonies were built exclusively in foreign European capitals"],
           "Official rehabilitation failed to provide viable agricultural land, leaving ousted adivasis destitute."),
    case_q("Social Movements", "Questioning the Development Paradigm",
           "What broader philosophical question did the Narmada movement raise regarding modern development in India?",
           "It questioned who truly benefits from development when vulnerable tribal populations are sacrificed for urban and corporate gains",
           ["It argued that human beings should never build houses or cook food", "It demanded that all modern medicine and electricity be banned forever", "It insisted that all rivers should be permanently drained into the sea"],
           "NBA challenged the dominant top-down development paradigm, asking 'development for whom and at whose cost?'.")
]

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

print(f"Passages 1 to 10 compiled successfully: {len(PASSAGES_1_10)} pairs.")
