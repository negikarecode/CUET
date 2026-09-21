import sys, os

out_path = "scripts/subject_generators/fa_passages_11_20.py"

p11_15 = '''import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 11 PASSAGES
# ==============================================================================
P1_M11_TXT = (
    "Read the following excerpt on Nandalal Bose's masterpiece 'Parthasarthi' and answer the questions that follow:\\n\\n"
    "Painted in 1912 by master artist Nandalal Bose using watercolor and tempera on paper, 'Parthasarthi' (Charioteer of Partha) is a "
    "defining masterpiece of modern Indian mythological art. Set in the apocalyptic prelude to the Kurukshetra war from the Mahabharata, "
    "the painting portrays Lord Krishna acting as the divine charioteer for the Pandava warrior Arjuna. Krishna is depicted at the front of the "
    "war chariot, holding the reins of four spirited white horses with his left hand while raising and blowing the sacred conch shell "
    "Panchajanya with his right hand to declare the righteous battle. His celestial face radiates divine composure and majestic authority. "
    "Seated reverently behind Krishna in the chariot is warrior prince Arjuna, his mighty bow Gandiva resting beside him, gazing with complete "
    "faith and surrender at his divine charioteer. Nandalal uses sweeping calligraphic contours influenced by the Ajanta cave murals to create "
    "an atmosphere of heroic righteousness and cosmic destiny, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P1_M11_QS = [
    case_q("The Bengal School of Painting", "Parthasarthi Master Painter",
           "Who painted the epic mythological masterpiece 'Parthasarthi' in 1912?",
           "Nandalal Bose",
           ["Abanindranath Tagore", "Raja Ravi Varma", "Jamini Roy"],
           "Parthasarthi was painted by Nandalal Bose in 1912, illustrating Krishna as Arjuna's charioteer."),
    case_q("The Bengal School of Painting", "Meaning of the Title Parthasarthi",
           "What does the Sanskrit title 'Parthasarthi' literally mean?",
           "The Charioteer of Partha (Arjuna)",
           ["The King of the Pandavas", "The Slayer of Ravana", "The Lord of the Universe"],
           "Partha is another name for Arjuna (son of Pritha/Kunti); Parthasarthi means the divine charioteer of Arjuna."),
    case_q("The Bengal School of Painting", "Sacred Conch Shell Blown by Krishna",
           "Which sacred conch shell is Lord Krishna depicted blowing to inaugurate the battle of Kurukshetra?",
           "Panchajanya",
           ["Devadatta", "Anantavijaya", "Paundra"],
           "Krishna blows his divine conch shell Panchajanya, sounding the call of righteous war (Dharma Yuddha)."),
    case_q("The Bengal School of Painting", "Symbolism of the Four White Horses",
           "In Indian philosophical allegories of the chariot (Kathopanishad), what do the four horses represent?",
           "The human senses (Indriyas) guided and controlled by the divine intellect",
           ["Four physical elements of earth, water, fire, air", "Four directions of the world", "Four seasons of the year"],
           "The chariot allegory represents the body as a chariot, horses as senses, reins as mind, and Krishna as the divine intellect."),
    case_q("The Bengal School of Painting", "Ajanta Mural Line Influence",
           "The fluid, sweeping contours of the figures and drapery in 'Parthasarthi' were directly inspired by Nandalal's study of:",
           "The classical Buddhist frescoes of the Ajanta Caves",
           ["Persian miniature carpet patterns", "European Renaissance oil glazes", "Greek marble statues in Athens"],
           "Nandalal's mastery of continuous, rhythmic, calligraphic brush line was forged by copying the ancient murals of Ajanta.")
]

P2_M11_TXT = (
    "Read the following excerpt on Nandalal Bose and the illumination of the Indian Constitution and answer the questions:\\n\\n"
    "When the Constituent Assembly of India completed drafting the Constitution of the Republic of India, Prime Minister Jawaharlal Nehru "
    "personally invited Nandalal Bose and his master students from Kala Bhavana, Santiniketan, to illustrate the original calligraphed "
    "manuscript. Working between 1949 and 1950, Nandalal executed 22 monumental header panels for the 22 parts of the Constitution, visually "
    "chronicling 5,000 years of Indian civilizational history. Each illustration was carefully chosen to reflect the spirit of the corresponding "
    "constitutional text: Part III on Fundamental Rights is headed by Lord Rama, Sita, and Lakshmana returning victoriously to Ayodhya; "
    "Part IV on Directive Principles of State Policy depicts Lord Krishna preaching the Bhagavad Gita to Arjuna on the battlefield; "
    "and other sections feature seals from the Indus Valley Civilization, the Vedic ashram, Gautam Buddha, Lord Mahavira, Emperor Ashoka, "
    "Emperor Akbar, Chhatrapati Shivaji, Rani Lakshmibai, Mahatma Gandhi's Dandi March, and Netaji Subhas Chandra Bose."
)
P2_M11_QS = [
    case_q("The Bengal School of Painting", "Constitutional Art Director",
           "Which legendary artist was invited by Jawaharlal Nehru to direct the illumination of the original Indian Constitution?",
           "Nandalal Bose",
           ["Abanindranath Tagore", "Jamini Roy", "Amrita Sher-Gil"],
           "Nandalal Bose of Santiniketan was entrusted with illustrating the original calligraphed Constitution of India."),
    case_q("The Bengal School of Painting", "Number of Illustrated Header Panels",
           "How many major historical and civilizational header panels were painted for the parts of the Constitution?",
           "Twenty-two (22) panels",
           ["Ten (10) panels", "Twelve (12) panels", "Fifty (50) panels"],
           "Nandalal Bose created 22 distinct header panels for the 22 original parts of the Constitution."),
    case_q("The Bengal School of Painting", "Illustration for Fundamental Rights (Part III)",
           "Which iconic scene heads Part III (Fundamental Rights) of the Constitution of India?",
           "Lord Rama, Sita, and Lakshmana returning victoriously to Ayodhya in the Pushpaka Vimana",
           ["Lord Krishna preaching the Bhagavad Gita", "Gautam Buddha attaining enlightenment", "Mahatma Gandhi on the Dandi March"],
           "Part III (Fundamental Rights) is adorned with Rama's return to Ayodhya, symbolizing the triumph of justice and righteous governance."),
    case_q("The Bengal School of Painting", "Illustration for Directive Principles (Part IV)",
           "Which philosophical scene heads Part IV (Directive Principles of State Policy)?",
           "Lord Krishna imparting the sacred teachings of the Bhagavad Gita to Arjuna on the chariot",
           ["Emperor Ashoka inscribing rock edicts", "Akbar in his court at Fatehpur Sikri", "Shivaji Maharaj riding a horse"],
           "Part IV (Directive Principles) is headed by Krishna preaching the Gita, symbolizing selfless duty and moral statecraft."),
    case_q("The Bengal School of Painting", "Freedom Movement Scenes in Constitution",
           "Which two towering leaders of the modern Indian freedom struggle are illustrated in the Constitution by Nandalal Bose?",
           "Mahatma Gandhi on the Salt March (Dandi) and Netaji Subhas Chandra Bose leading the INA",
           ["Raja Ram Mohan Roy and Ishwar Chandra Vidyasagar", "Bal Gangadhar Tilak and Lala Lajpat Rai", "Dadabhai Naoroji and Gokhale"],
           "The historical continuum culminates in the modern freedom movement, depicting Gandhi's Dandi March and Netaji Subhas Chandra Bose.")
]

# ==============================================================================
# MOCK 12 PASSAGES
# ==============================================================================
P1_M12_TXT = (
    "Read the following excerpt on Kshitindranath Majumdar's masterpiece 'Rasa-Lila' and answer the questions that follow:\\n\\n"
    "Painted in 1926 by Kshitindranath Majumdar, 'Rasa-Lila' is one of the most spiritually radiant and lyrical achievements of the Bengal "
    "School wash tradition. Majumdar, who was revered as a 'Bhakta-Shilpi' (Saint-Artist) for his lifelong devotional immersion in the "
    "Chaitanya Mahaprabhu Vaishnava faith, translates the mystical Maha-Rasa of Vrindavana into a celestial visual reverie. In the painting, "
    "Lord Krishna dances in a harmonious ring with the cowherd maidens (Gopis) in a sacred grove under the silvery glow of the full moon. "
    "Majumdar's figures are distinguished by their extraordinary elongated grace, slender willow-like waists, and sinuous undulating lines "
    "that sway with musical cadence. The flowering branches of Kadamba trees drape over the dancers, framing the ecstatic circular dance "
    "against translucent, pastel washes of pale mauve, soft saffron, and dusky blue, conserved in the National Gallery of Modern Art, New Delhi."
)
P1_M12_QS = [
    case_q("The Bengal School of Painting", "Rasa-Lila Master Painter",
           "Who painted the devotional Vaishnavite wash masterpiece 'Rasa-Lila' in 1926?",
           "Kshitindranath Majumdar",
           ["Nandalal Bose", "M.A.R. Chughtai", "Ramgopal Vijaivargiya"],
           "Rasa-Lila was painted by Kshitindranath Majumdar, the celebrated saint-painter of the Bengal School."),
    case_q("The Bengal School of Painting", "Anatomical Hallmark of Majumdar's Figures",
           "What anatomical characteristic instantly distinguishes Kshitindranath Majumdar's human figures?",
           "Extremely tall, elongated slender bodies with supple waists and delicate musical gestures",
           ["Short muscular physiques resembling Greco-Roman gladiators", "Robotic square geometries with straight lines", "Heavy dark silhouettes without limbs"],
           "Majumdar is famous for his elongated, lyrical, and supple figures that seem to sway like reeds in divine melody."),
    case_q("The Bengal School of Painting", "Devotional Tradition of the Artist",
           "Which spiritual Bhakti movement profoundly influenced Kshitindranath Majumdar's life and art?",
           "Gaudiya Vaishnavism inspired by Sri Chaitanya Mahaprabhu",
           ["Shaiva Siddhanta of South India", "Tantric Buddhism of Ladakh", "Advaita Vedanta of Sringeri"],
           "Majumdar was a devout Gaudiya Vaishnava whose paintings of Krishna and Chaitanya were acts of devotional prayer."),
    case_q("The Bengal School of Painting", "Sacred Tree Framing the Dance",
           "Which blooming tree sacred to Krishna's romance drapes its fragrant flowering boughs over the dancers?",
           "The Kadamba tree",
           ["The Banyan tree", "The Eucalyptus tree", "The Pine tree"],
           "The flowering Kadamba tree, sacred to Krishna's divine sports, arches over the dancing lovers in Vrindavana."),
    case_q("The Bengal School of Painting", "National Conservation Repository",
           "The original wash painting 'Rasa-Lila' by Kshitindranath Majumdar is permanently conserved in:",
           "National Gallery of Modern Art (NGMA), New Delhi",
           ["Bharat Kala Bhavan, Varanasi", "Indian Museum, Kolkata", "Victoria Memorial, Kolkata"],
           "Rasa-Lila is preserved as a prized treasure in the National Gallery of Modern Art (NGMA), New Delhi.")
]

P2_M12_TXT = (
    "Read the following excerpt on M.A.R. Chughtai's 'Radhika' and answer the questions that follow:\\n\\n"
    "Created around 1940 by master artist Muhammad Abdur Rahman (M.A.R.) Chughtai, 'Radhika' is a peerless triumph of calligraphic delicacy "
    "and wash painting. Tracing his lineage to a celebrated family of imperial Mughal court architects, Chughtai synthesized the Bengal wash "
    "technique with the refined linear elegance of Persian and Mughal miniatures and the whiplash curves of Art Nouveau. In 'Radhika', the "
    "heroine is depicted walking gracefully away from her chamber carrying a burning earthen lamp (diya) in her hand. Her head is tilted down "
    "in modest reverie (lajja), her serene countenance illuminated by the warm golden glow of the flame. Fluttering around the burning wick "
    "are moths, visualising the classical Persian and Urdu poetic metaphor of the moth (parwana) selflessly drawn to the flame (shama)—an "
    "allegory of Radha's all-consuming, self-surrendering love for Krishna. Her dress cascades in razor-sharp, calligraphic folds that flow "
    "with musical grace against the quiet nocturnal dusk, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P2_M12_QS = [
    case_q("The Bengal School of Painting", "Radhika Master Artist",
           "Who painted the calligraphic wash masterpiece 'Radhika' around 1940?",
           "M.A.R. Chughtai",
           ["Kshitindranath Majumdar", "Abanindranath Tagore", "Nandalal Bose"],
           "Radhika was painted by M.A.R. Chughtai, synthesizing Persian calligraphy and Bengal wash technique."),
    case_q("The Bengal School of Painting", "Moth and Flame Allegory (Shama-Parwana)",
           "What poetic metaphor is visualised by the moths fluttering around Radhika's earthen lamp?",
           "The Shama-Parwana metaphor: the lover selflessly drawn to the divine light of the beloved",
           ["An agricultural insect pest warning", "A scientific biological study of moth anatomy", "A warning against fire hazards in homes"],
           "Chughtai weaves the Persian Shama-Parwana metaphor into Vaishnavite lore: Radha is drawn irresistibly to Krishna's divine light."),
    case_q("The Bengal School of Painting", "Linear Quality of Chughtai's Brush",
           "The delicate, swooping, and razor-sharp contour lines in 'Radhika' are celebrated for resembling:",
           "Classical Nasta'liq Persian calligraphy and Art Nouveau linear curves",
           ["Rough charcoal smudges drawn with a stick", "Strictly straight lines drawn with an iron ruler", "Mechanical woodcut stampings"],
           "Chughtai's line possesses the sublime rhythm of classical Nasta'liq calligraphy, tapering with exquisite precision."),
    case_q("The Bengal School of Painting", "Radhika's Emotional Countenance",
           "What delicate emotion is conveyed by Radhika's slightly tilted head and downcast eyes?",
           "Lajja (modesty, maidenly shyness, and sweet romantic longing for Krishna)",
           ["Violent rage and anger towards an enemy", "Fear of darkness and wild animals", "Exhaustion and physical illness"],
           "Radhika's downcast eyes and veiled countenance embody classical Indian feminine modesty (Lajja) and sweet romantic anticipation."),
    case_q("The Bengal School of Painting", "National Conservation Repository",
           "M.A.R. Chughtai's masterpiece 'Radhika' is permanently conserved and displayed in the:",
           "National Gallery of Modern Art (NGMA), New Delhi",
           ["British Museum, London", "Lahore Museum, Pakistan", "Victoria and Albert Museum, London"],
           "This iconic masterpiece of modern Indian wash painting is proudly displayed in the NGMA, New Delhi.")
]

# ==============================================================================
# MOCK 13 PASSAGES
# ==============================================================================
P1_M13_TXT = (
    "Read the following excerpt on Ramgopal Vijaivargiya's 'Meghdoot' and answer the questions that follow:\\n\\n"
    "Painted in 1940 by Ramgopal Vijaivargiya using watercolor on paper, 'Meghdoot' is a celebrated masterpiece inspired by the immortal "
    "Sanskrit lyric poem Meghadutam (The Cloud Messenger) composed by classical poet Kalidasa. A student of Shailendranath Dey at the "
    "Jaipur Art School, Vijaivargiya transplanted the lyrical Bengal wash style into Rajasthan, fusing it with classical Sanskrit literature. "
    "The painting portrays the exiled Yaksha, banished by Lord Kubera to Mount Ramgiri for neglecting his duties. Seated on a high rocky "
    "crag, the Yaksha is depicted pleading with a billowing, dark monsoon cloud to carry his message of eternal love and fidelity across the "
    "plains of India to his pining wife in the distant Himalayan city of Alakapuri. In his hands, the Yaksha reverently holds fresh wild "
    "Kutaja blossoms as an offering to the cloud, while a flock of white cranes (balaka) soars gracefully against the slate-blue rain clouds, "
    "heralding the joyous onset of the monsoon, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P1_M13_QS = [
    case_q("The Bengal School of Painting", "Meghdoot Master Artist and Medium",
           "Who painted the lyrical composition 'Meghdoot' in 1940 using watercolor on paper?",
           "Ramgopal Vijaivargiya",
           ["Kshitindranath Majumdar", "Nandalal Bose", "Jamini Roy"],
           "Meghdoot was painted by Ramgopal Vijaivargiya in 1940, inspired by Kalidasa's classical Sanskrit poetry."),
    case_q("The Bengal School of Painting", "Sanskrit Poetic Masterpiece Source",
           "Which classical Sanskrit masterpiece authored by Kalidasa served as the direct inspiration for this painting?",
           "Meghadutam (The Cloud Messenger)",
           ["Abhijnanasakuntalam", "Kumarasambhavam", "Raghuvamsham"],
           "The painting illustrates Kalidasa's celebrated lyric poem Meghadutam, where a cloud acts as an envoy of love."),
    case_q("The Bengal School of Painting", "The Banished Yaksha's Condition",
           "Why was the Yaksha banished to Mount Ramgiri according to Kalidasa's narrative?",
           "He was cursed by King Kubera for neglecting his duties while lost in romantic daydreaming of his wife",
           ["He stole gold from the treasury of heaven", "He fought in a rebellion against the gods", "He failed to pay taxes"],
           "Kubera cursed the Yaksha to a year of exile for neglecting his duty of gathering morning lotuses due to love-sickness."),
    case_q("The Bengal School of Painting", "Destination of the Cloud Messenger",
           "Where did the Yaksha direct the cloud messenger to deliver his message of love?",
           "Alakapuri (the celestial city near Mount Kailash in the Himalayas)",
           ["Lanka across the southern ocean", "Mathura on the Yamuna", "Ayodhya on the Sarayu"],
           "The cloud's aerial journey leads northward across India to the mythical city of Alakapuri near Mount Kailash."),
    case_q("The Bengal School of Painting", "Symbolism of the Flying Cranes",
           "Why are white cranes (balaka) depicted flying across the dark monsoon clouds?",
           "In Sanskrit poetics, flying cranes rejoicing in the cool rain are classical harbingers of romantic joy and fidelity",
           ["They are hunting field mice in the grass", "They are fleeing an attack by hawks", "They are made of wood to support the cloud"],
           "Flying cranes against dark monsoon clouds are classical Indian poetic motifs symbolizing the joy and fidelity of love in the rainy season.")
]

P2_M13_TXT = (
    "Read the following excerpt on Raja Ravi Varma's 'Rama Vanquishing the Pride of the Ocean' and answer the questions that follow:\\n\\n"
    "Painted around 1900 in oil on canvas by Raja Ravi Varma, 'Rama Vanquishing the Pride of the Ocean' is an epic landmark of modern "
    "Indian academic realism. Based on the Yuddha Kanda of Valmiki's Ramayana, the painting depicts Lord Rama standing upon dark, storm-tossed "
    "coastal rocks, fiercely aiming his celestial bow Kodanda with the fiery Agneyastra missile to evaporate the ocean after Varuna failed to "
    "grant passage to Lanka. Ravi Varma captures intense kinetic drama: Rama's red dhoti billows violently in the oceanic gale, while his "
    "powerful muscular stance radiates righteous fury. In the churning background, translucent green waves crash in frothing white surf "
    "against dark boulders, as the terrified ocean god Varuna rises with his entourage of sea nymphs with folded hands, pleading for divine "
    "mercy. Through the Ravi Varma Lithographic Press established in 1894, such dramatic mythological visions were mass-produced as color "
    "oleographs, transforming the visual consciousness of modern India, conserved in the Sri Chitra Art Gallery, Thiruvananthapuram."
)
P2_M13_QS = [
    case_q("Modern Trends in Indian Art: Paintings", "Rama Vanquishing the Ocean Artist and Medium",
           "Who painted 'Rama Vanquishing the Pride of the Ocean' (c. 1900) in oil on canvas?",
           "Raja Ravi Varma",
           ["Nandalal Bose", "Jamini Roy", "Abanindranath Tagore"],
           "The masterpiece was painted in oil on canvas by Raja Ravi Varma around 1900."),
    case_q("Modern Trends in Indian Art: Paintings", "Epic Episode Depicted",
           "From which section of the Ramayana does the episode depicted in the painting originate?",
           "The Yuddha Kanda (Rama seeking passage to Lanka to rescue Sita)",
           ["The Bal Kanda", "The Ayodhya Kanda", "The Aranya Kanda"],
           "The dramatic confrontation takes place on the seashore as Rama prepares to build the bridge (Setu) to Lanka."),
    case_q("Modern Trends in Indian Art: Paintings", "Response of Ocean God Varuna",
           "How is the ocean god Varuna depicted responding to Lord Rama's wrath?",
           "Rising from the crashing waves with sea creatures, folding his hands in terror and pleading for mercy",
           ["Firing flaming arrows back at Rama", "Sleeping soundly on a coral reef", "Commanding sea monsters to attack"],
           "Varuna emerges from the foaming waves, folding his hands in submission and agreeing to support the causeway across the ocean."),
    case_q("Modern Trends in Indian Art: Paintings", "Democratization through Oleographs",
           "What historical institution did Raja Ravi Varma establish in 1894 to bring sacred art into ordinary homes?",
           "The Ravi Varma Lithographic Press (at Ghatkopar/Malavli near Bombay)",
           ["The Bengal National College of Art", "The Indian Society of Oriental Art", "The National Gallery of Modern Art"],
           "Ravi Varma founded the Lithographic Press to print affordable color oleographs of Hindu deities for millions of Indian households."),
    case_q("Modern Trends in Indian Art: Paintings", "Permanent Museum Repository",
           "The original monumental oil painting 'Rama Vanquishing the Pride of the Ocean' is preserved in:",
           "Sri Chitra Art Gallery, Thiruvananthapuram (Kerala)",
           ["National Museum, New Delhi", "Victoria Memorial, Kolkata", "Salar Jung Museum, Hyderabad"],
           "The painting is preserved in the Sri Chitra Art Gallery in Thiruvananthapuram, Kerala.")
]

# ==============================================================================
# MOCK 14 PASSAGES
# ==============================================================================
P1_M14_TXT = (
    "Read the following excerpt on Jamini Roy's 'Mother and Child' and answer the questions that follow:\\n\\n"
    "Created around 1940 by master artist Jamini Roy, 'Mother and Child' is a seminal monument of modern Indian folk revivalism. "
    "Trained initially in British academic realism and having experimented with the Bengal wash style, Roy made a radical break around 1921 "
    "to return to the living folk craft traditions of his native Bankura district in rural Bengal. Drawing inspiration from Kalighat scroll "
    "paintings (patuas) and village terracotta toys, Roy eliminated academic photographic shading and perspective. In 'Mother and Child', "
    "the mother tenderly cradles her infant in a sweeping protective embrace. Both figures are rendered with bold, fluid, unbroken black "
    "contour lines and oversized, expressive almond-shaped eyes that dominate their serene faces. Roy rejected expensive imported oil paints, "
    "grinding his own natural pigments from alluvial river clay, turmeric, chalk, and soot mixed with tree gum, creating a flat, democratic, "
    "and universally accessible art form, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P1_M14_QS = [
    case_q("Modern Trends in Indian Art: Paintings", "Mother and Child Master Artist",
           "Who painted the iconic folk modernist masterpiece 'Mother and Child' around 1940?",
           "Jamini Roy",
           ["Amrita Sher-Gil", "Raja Ravi Varma", "M.F. Husain"],
           "Mother and Child was created by Jamini Roy, the pioneer of modern Indian folk-based art."),
    case_q("Modern Trends in Indian Art: Paintings", "Indigenous Folk Inspiration",
           "Which rural Bengal artistic tradition inspired Jamini Roy's radical break from Western academic art?",
           "Kalighat patua scroll paintings and Bankura village terracotta toys",
           ["Mughal court miniature portraits", "Ajanta Buddhist fresco copies", "European academic oil painting"],
           "Roy drew direct inspiration from the flat simplicity and sweeping lines of Kalighat patua scrolls and village clay toys."),
    case_q("Modern Trends in Indian Art: Paintings", "Stylistic Hallmark of the Eyes",
           "What anatomical feature is famously exaggerated in Jamini Roy's 'Mother and Child'?",
           "Massive, elongated, almond-shaped eyes extending dramatically across the face",
           ["Tiny circular dots without pupils", "Narrow squinting eyes hidden under veils", "Photographic eyes with painted eyeglasses"],
           "Jamini Roy's figures feature iconic, oversized almond-shaped eyes that radiate innocence, maternal love, and spiritual presence."),
    case_q("Modern Trends in Indian Art: Paintings", "Preparation of Indigenous Pigments",
           "What natural local substances did Jamini Roy use to formulate his tempera colors?",
           "Alluvial clay, turmeric, chalk, and lampblack soot mixed with tamarind-seed gum",
           ["Imported French oil paints and turpentine", "Chemical synthetic spray paints", "Melted plastic dyes"],
           "Roy formulated his own pigments from local Bankura clays, soot, chalk, and turmeric, mixed with natural tree gums."),
    case_q("Modern Trends in Indian Art: Paintings", "National Treasure Classification",
           "In 1976, the Government of India declared Jamini Roy's artworks to be:",
           "National Art Treasures (prohibited by law from being exported out of India)",
           ["Public domain commercial clip-art", "State property of the British Crown", "Temporary museum loans"],
           "Jamini Roy's art was officially classified as a non-exportable National Art Treasure of India in 1976.")
]

P2_M14_TXT = (
    "Read the following excerpt on Amrita Sher-Gil's 'Haldi Grinders' and answer the questions that follow:\\n\\n"
    "Painted in 1940 at Saraya (Gorakhpur) using oil on canvas, 'Haldi Grinders' is one of the most poignant and celebrated mature "
    "masterpieces of Amrita Sher-Gil. Born to an Indian Sikh father and a Hungarian mother, Sher-Gil received elite academic training at the "
    "École des Beaux-Arts in Paris before returning to India in 1934, declaring it her artistic destiny to interpret the life and silent "
    "melancholy of the Indian people. In 'Haldi Grinders', three rural women are depicted sitting upon the red earth under the shade of "
    "massive, curving tree trunks, grinding bright yellow turmeric using heavy stone pestles. Sher-Gil synthesizes European Post-Impressionism "
    "(Paul Gauguin) with the monumental dignity of Ajanta frescoes and the fiery color planes of Basohli miniatures. The glowing golden turmeric "
    "acts as an intense chromatic jewel against the deep terracotta red ground and dark tree trunks, capturing the silent endurance, tragic "
    "beauty, and timeless dignity of Indian village womanhood, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P2_M14_QS = [
    case_q("Modern Trends in Indian Art: Paintings", "Haldi Grinders Master Artist and Year",
           "Who painted the modern oil masterpiece 'Haldi Grinders' in 1940?",
           "Amrita Sher-Gil",
           ["Jamini Roy", "Anupam Sud", "M.F. Husain"],
           "Haldi Grinders was painted in oil on canvas by Amrita Sher-Gil in 1940 at Saraya, Gorakhpur."),
    case_q("Modern Trends in Indian Art: Paintings", "Artistic Synthesis of East and West",
           "What dual aesthetic traditions were seamlessly synthesized in Amrita Sher-Gil's mature style?",
           "European Post-Impressionism (Gauguin/Cézanne) and classical Indian art (Ajanta frescoes and Basohli miniatures)",
           ["Chinese calligraphy and British academic watercolours", "Ancient Greek sculpture and Persian court carpets", "American pop art and Japanese prints"],
           "Sher-Gil bridged East and West, fusing modern European structural color with ancient Indian spiritual and decorative grandeur."),
    case_q("Modern Trends in Indian Art: Paintings", "Domestic Chore Depicted",
           "What everyday rural domestic activity are the women engaged in performing in the painting?",
           "Grinding raw turmeric (haldi) with stone grinding pestles under the trees",
           ["Weaving cotton cloth on a handloom", "Milking cows inside a wooden shed", "Harvesting wheat with iron sickles"],
           "The women are depicted in silent camaraderie, crushing bright yellow turmeric roots on traditional stone grinders."),
    case_q("Modern Trends in Indian Art: Paintings", "The Mood of Indian Melancholy",
           "What psychological atmosphere pervades the figures in 'Haldi Grinders'?",
           "Profound stillness, silent endurance, and the tragic, quiet dignity of rural Indian life",
           ["Boisterous comedy and laughter", "Violent military anger and hatred", "Frenzied athletic excitement"],
           "Sher-Gil captured the quiet sorrow and enduring spiritual dignity of rural Indian people, reflected in their meditative stillness."),
    case_q("Modern Trends in Indian Art: Paintings", "National Gallery of Modern Art (NGMA) Collection",
           "The world's largest public collection of Amrita Sher-Gil's paintings, including 'Haldi Grinders', is housed in:",
           "National Gallery of Modern Art (NGMA), New Delhi",
           ["Louvre Museum, Paris", "Tate Modern, London", "Indian Museum, Kolkata"],
           "The NGMA in New Delhi holds the preeminent world repository of Amrita Sher-Gil's paintings in a dedicated permanent memorial wing.")
]

# ==============================================================================
# MOCK 15 PASSAGES
# ==============================================================================
P1_M15_TXT = (
    "Read the following excerpt on M.F. Husain's 'Mother Teresa' and the Progressive Artists' Group and answer the questions:\\n\\n"
    "Painted in 1988 in oil on canvas, 'Mother Teresa' by Maqbool Fida (M.F.) Husain is a monumental modern tribute to universal compassion. "
    "Husain, who co-founded the revolutionary Progressive Artists' Group (PAG) in Bombay in December 1947 alongside Souza, Raza, and Ara, "
    "sought to create an aggressive, internationally relevant modern Indian art free from colonial academicism. In 'Mother Teresa', Husain "
    "deliberately renders the saint's face as a dark, featureless void: she is identified solely by the iconic white cotton saree with three "
    "blue borders worn by the Missionaries of Charity in Calcutta. The drape of the saree curves across the composition like a monumental "
    "cathedral arch, cradling an abandoned, sick child across her lap in a powerful visual echo of Michelangelo's 'Pietà'. By omitting "
    "her physical features, Husain elevated Mother Teresa from an individual historical nun into a timeless, universal embodiment of selfless "
    "motherhood, divine grace, and compassionate sanctuary, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P1_M15_QS = [
    case_q("Modern Trends in Indian Art: Paintings", "Mother Teresa Master Artist",
           "Who painted the iconic modern canvas 'Mother Teresa' in 1988?",
           "M.F. Husain (Maqbool Fida Husain)",
           ["F.N. Souza", "S.H. Raza", "Tyeb Mehta"],
           "Mother Teresa was painted by M.F. Husain in 1988, celebrating the saint's universal compassion."),
    case_q("Modern Trends in Indian Art: Paintings", "Founding of the Progressive Artists' Group (PAG)",
           "In which historic year and city was the Progressive Artists' Group (PAG) co-founded by Husain, Souza, and Raza?",
           "December 1947 in Bombay (Mumbai)",
           ["1905 in Calcutta", "1938 in Haripura", "1960 in Baroda"],
           "The PAG was founded in Bombay in December 1947, immediately following India's independence and partition."),
    case_q("Modern Trends in Indian Art: Paintings", "The Faceless Saint Symbolism",
           "Why did M.F. Husain deliberately omit Mother Teresa's facial features in the painting?",
           "To transcend individual portraiture and elevate her into a universal symbol of selfless maternal love and divine grace",
           ["Because Husain did not know how to draw faces", "Because he ran out of flesh-toned paint", "Because Mother Teresa wore an iron veil"],
           "By rendering her face as a void, Husain made her universal: she represents the spirit of selfless motherhood embracing suffering humanity."),
    case_q("Modern Trends in Indian Art: Paintings", "The Blue-Bordered Saree Identity",
           "The white saree with three blue stripes in Husain's painting is the official habit of which order?",
           "The Missionaries of Charity (founded by Mother Teresa in Calcutta in 1950)",
           ["The Ramakrishna Mission", "The Indian Red Cross Society", "The Salvation Army"],
           "The blue-bordered white saree is the globally recognized habit of Mother Teresa's Missionaries of Charity."),
    case_q("Modern Trends in Indian Art: Paintings", "Classical European Art Resonance",
           "The sick child resting across Mother Teresa's lap visually echoes which classical European masterpiece motif?",
           "The Pietà (Mother Mary cradling the body of Christ)",
           ["The Mona Lisa", "The Last Supper", "The Birth of Venus"],
           "Husain translated the classical Christian Pietà motif into the modern Indian context of Mother Teresa comforting destitute orphans.")
]

P2_M15_TXT = (
    "Read the following excerpt on K.K. Hebbar's 'Birth of Poetry' and answer the questions that follow:\\n\\n"
    "Painted in 1980 in oil on canvas, 'Birth of Poetry' by K.K. Hebbar (Kattingeri Krishna Hebbar) is a profound modern visual meditation "
    "on the genesis of classical Indian literary creation. The painting illustrates the foundational episode from Valmiki's Ramayana where "
    "the sage witnesses a cruel hunter's arrow strike down a male Krauncha (heron/crane) bird dancing with its mate in the forest. "
    "Overwhelmed by the agonizing wailing of the female bird, Valmiki experiences profound divine sorrow (Shoka), which spontaneously "
    "crystallizes into the first metered Sanskrit verse (Shloka)—asserting the profound aesthetic principle that 'Shoka' (grief) transforms "
    "into 'Shloka' (poetry). Hebbar, who studied classical dance forms like Kathakali and Yakshagana, translates this spiritual awakening "
    "through singing, rhythmic, calligraphic brushstrokes and radiant warm colors, bridging visual painting, poetic verse, and classical dance, "
    "conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P2_M15_QS = [
    case_q("Modern Trends in Indian Art: Paintings", "Birth of Poetry Master Painter",
           "Who painted the modern masterpiece 'Birth of Poetry' in 1980?",
           "K.K. Hebbar (Kattingeri Krishna Hebbar)",
           ["N.S. Bendre", "M.F. Husain", "Somnath Hore"],
           "Birth of Poetry was painted in oil on canvas by K.K. Hebbar in 1980."),
    case_q("Modern Trends in Indian Art: Paintings", "Literary Genesis Episode",
           "Which classical sage's grief at the death of the Krauncha bird inspired the 'Birth of Poetry'?",
           "Sage Valmiki (composing the opening shloka of the Ramayana)",
           ["Sage Vyasa", "Sage Vasishtha", "Sage Vishwamitra"],
           "The painting illustrates Sage Valmiki's sorrow witnessing the killing of the krauncha bird, giving birth to the first Sanskrit shloka."),
    case_q("Modern Trends in Indian Art: Paintings", "Shoka Becomes Shloka Principle",
           "What aesthetic truth of classical Indian poetics is illustrated in Hebbar's painting?",
           "That profound compassion and grief (Shoka) when sublimated transforms into sublime poetry (Shloka)",
           ["That poetry is created only by military commanders", "That poetry can only be written in gold ink", "That grief destroys all creativity"],
           "Valmiki's insight 'Shokah shlokatvam agamat' (Grief became poetry) asserts that empathy is the sacred root of artistic creation."),
    case_q("Modern Trends in Indian Art: Paintings", "Hebbar's Singing Line Inspiration",
           "Hebbar's dynamic, singing brush lines were directly influenced by his deep lifelong study of which Indian performing art?",
           "Classical Indian dance (Kathakali and Yakshagana)",
           ["Western classical ballet", "Military parade marching", "Modern rock music"],
           "Hebbar translated the rhythmic mudras, leaps, and kinetic energy of Yakshagana and Kathakali into his singing brush contours."),
    case_q("Modern Trends in Indian Art: Paintings", "Leadership of Lalit Kala Akademi",
           "K.K. Hebbar served with distinction as Chairman of which premier national cultural body from 1980 to 1984?",
           "Lalit Kala Akademi (National Academy of Art), New Delhi",
           ["Sangeet Natak Akademi", "Sahitya Akademi", "Archaeological Survey of India"],
           "Hebbar served as Chairman of the Lalit Kala Akademi, championing modern Indian art education and international triennales.")
]
'''

p16_20 = '''
# ==============================================================================
# MOCK 16 PASSAGES
# ==============================================================================
P1_M16_TXT = (
    "Read the following excerpt on N.S. Bendre's 'Gossip' and answer the questions that follow:\\n\\n"
    "Painted in 1969 in oil on canvas, 'Gossip' by Narayan Shridhar (N.S.) Bendre is a radiant, luminous triumph of post-independence "
    "Indian figurative modernism. Bendre, who played an instrumental role in shaping the modern visual pedagogy of the Faculty of Fine "
    "Arts at M.S. University of Baroda, employed a personalized adaptation of Pointillism and Divisionism to capture the dazzling brilliance "
    "of Indian sunlight. In 'Gossip', three rural women clad in vibrant sarees of warm marigold yellow, vermilion red, and magenta are "
    "seated intimately together in an enclosure of shared confidences. Bendre simplifies their bodies and facial features into broad, "
    "harmonious color planes without academic photographic detailing, letting the tilt of their heads, the angle of their shoulders, and "
    "the warmth of the glowing daylight convey their lively village camaraderie, conserved in the National Gallery of Modern Art, New Delhi."
)
P1_M16_QS = [
    case_q("Modern Trends in Indian Art: Paintings", "Gossip Master Artist",
           "Who painted the luminous modern canvas 'Gossip' in 1969?",
           "N.S. Bendre (Narayan Shridhar Bendre)",
           ["K.K. Hebbar", "M.F. Husain", "Jamini Roy"],
           "Gossip was painted in oil on canvas by N.S. Bendre in 1969, celebrating rural women's camaraderie."),
    case_q("Modern Trends in Indian Art: Paintings", "Modernist Technique Adapted",
           "Which European modernist technique did N.S. Bendre adapt to depict blazing Indian sunlight?",
           "Pointillism and Divisionism (breaking color into flat, vibrant mosaic-like planes and dots)",
           ["Action drip painting", "Futurist speed lines", "Constructivist wire framing"],
           "Bendre modified Pointillism and Divisionism into large, glowing planar surfaces that capture radiant Indian light."),
    case_q("Modern Trends in Indian Art: Paintings", "Academic Leadership at Baroda",
           "N.S. Bendre served as the pioneering foundational Dean and Professor of Painting at which premier art institution?",
           "Faculty of Fine Arts, M.S. University of Baroda",
           ["Sir J.J. School of Art, Bombay", "Kala Bhavana, Santiniketan", "Government College of Art, Calcutta"],
           "Bendre built the Faculty of Fine Arts at M.S. University of Baroda into the leading academy of modern Indian art."),
    case_q("Modern Trends in Indian Art: Paintings", "Compositional Arrangement of the Women",
           "How are the three village women composed in 'Gossip'?",
           "In an intimate, protective triangle, leaning towards each other in warm, confidential conversation",
           ["Standing in a military line facing forward", "Scattered far apart across a field", "Sitting with their backs completely turned"],
           "Bendre arranged the three women in a tight, affectionate human circle, visually capturing the intimacy of their conversation."),
    case_q("Modern Trends in Indian Art: Paintings", "Color Palette of Gossip",
           "What dominant color harmony characterizes N.S. Bendre's 'Gossip'?",
           "Luminous marigold yellow, brilliant warm vermilion, magenta, and leaf green bathed in pure sunlight",
           ["Dark muddy charcoal and black soot", "Pale monochromatic winter blue", "Pure unpainted grey"],
           "The palette is bathed in warm Indian daylight, dominated by radiant yellow, vermilion, and magenta.")
]

P2_M16_TXT = (
    "Read the following excerpt on Krishna Reddy's 'Whirlpool' and viscosity printmaking and answer the questions:\\n\\n"
    "Created in 1963, 'Whirlpool' by Krishna Reddy is universally acclaimed as a global milestone in 20th-century graphic art. "
    "Working as co-director alongside Stanley William Hayter at the renowned 'Atelier 17' printmaking workshop in Paris, Reddy revolutionized "
    "the medium by inventing the process of simultaneous multi-color viscosity printing on a single metal intaglio plate. In 'Whirlpool', "
    "Reddy treated the copper plate as a three-dimensional sculptural matrix, deeply etching multiple relief levels and carving microscopic "
    "grooves. By controlling the viscosity (stickiness and fluidity) of oil-based inks and using rollers of varying hardness, Reddy was "
    "able to apply multiple contrasting colors to different plate depths and print them in a single pass through the etching press. "
    "The resulting print is an awe-inspiring vision of a dynamic, swirling aquatic vortex radiating cosmic and organic energy, conserved in "
    "the permanent collection of the National Gallery of Modern Art (NGMA), New Delhi."
)
P2_M16_QS = [
    case_q("Modern Trends in Indian Art: Graphic Prints", "Whirlpool Master Artist and Year",
           "Who created the revolutionary multi-color print 'Whirlpool' in 1963?",
           "Krishna Reddy",
           ["Somnath Hore", "Jyoti Bhatt", "Anupam Sud"],
           "Whirlpool was created by master sculptor and printmaker Krishna Reddy in 1963 at Atelier 17 in Paris."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Technique Revolutionized by Reddy",
           "What groundbreaking printmaking process was invented and perfected by Krishna Reddy?",
           "Simultaneous multi-color viscosity printing from a single metal plate in a single pass",
           ["Single-color woodblock relief stamping", "Stone lithography with black crayon", "Photographic screen printing"],
           "Reddy invented viscosity printing, allowing multiple colors to be printed from one deeply etched plate in a single press pass."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Legendary Paris Print Workshop",
           "At which historic printmaking workshop in Paris did Krishna Reddy collaborate with Stanley William Hayter?",
           "Atelier 17",
           ["Bauhaus Workshop", "Black Mountain College", "Royal Academy Workshop"],
           "Krishna Reddy served as associate director at Atelier 17 in Paris, experimenting with ink chemistry and metal etching."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Scientific Principle of Viscosity",
           "What physical law enables viscosity printing to function without colors muddying together?",
           "Inks of different viscosities and densities naturally accept or repel each other when rolled across varying plate depths",
           ["The paper is heated to 500 degrees Celsius", "Different colors are stamped with wooden hammers", "The plate is dipped in liquid plastic"],
           "Viscosity printing relies on ink chemistry: a stiff, viscous ink repels a more fluid, low-viscosity ink applied over it."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Visual Imagery of Whirlpool",
           "What cosmic and natural phenomenon is visually evoked by Reddy's 'Whirlpool'?",
           "A dynamic spiraling aquatic vortex radiating light, matter, and cosmic energy into a central vortex",
           ["A static brick wall in a modern city", "A portrait of a royal king on a horse", "A mechanical blueprint of an automobile engine"],
           "Whirlpool captures a spinning vortex of water and energy, evoking both oceanic currents and rotating spiral galaxies.")
]

# ==============================================================================
# MOCK 17 PASSAGES
# ==============================================================================
P1_M17_TXT = (
    "Read the following excerpt on Somnath Hore's 'Children' and the 'Wounds' series and answer the questions:\\n\\n"
    "Created around 1970 by master sculptor and printmaker Somnath Hore, 'Children' from the celebrated 'Wounds' series is one of the most "
    "heartbreaking and ethically uncompromising humanist statements in modern world art. Hore's artistic consciousness was indelibly "
    "shaped by his firsthand witness of human agony during the man-made 1943 Bengal Famine and the 1946 Tebhaga peasant uprising. "
    "In 'Children', Hore abandoned conventional ink and printing presses entirely, pioneering his radical technique of casting raw, wet "
    "paper pulp directly onto a scarred cement matrix. The resulting artwork is an inkless, pure white-on-white relief: the raised paper pulp "
    "presents gashes, scars, and skeletal, hollowed contours of starving infants. Hore deliberately refused to use color, asserting that "
    "pretty colored inks would only decorative-ize and betray the raw, unadorned tragedy of human suffering, conserved in the NGMA, New Delhi."
)
P1_M17_QS = [
    case_q("Modern Trends in Indian Art: Graphic Prints", "Children Master Artist",
           "Who created the tragic white-on-white paper pulp print 'Children' from the 'Wounds' series?",
           "Somnath Hore",
           ["Krishna Reddy", "Jyoti Bhatt", "Anupam Sud"],
           "Children was created by Somnath Hore, renowned for his tragic and profound 'Wounds' series."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Medium and Technical Invention",
           "What unique, inkless medium did Somnath Hore invent for creating 'Children'?",
           "Casting raw, wet handmade paper pulp directly onto a scarred cement and clay matrix",
           ["Carving marble stone with chisels", "Painting with oil on canvas", "Screen printing with plastic inks"],
           "Hore pioneered the technique of pouring wet paper pulp into scarred cement moulds, creating inkless white relief sculptures in paper."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Historical Traumas Shaping Hore's Art",
           "Which two historical catastrophes seared the memory of human suffering into Somnath Hore's soul?",
           "The 1943 Bengal Famine and the 1946 Tebhaga peasant movement",
           ["The American Civil War and the French Revolution", "The building of the Suez Canal", "The industrial revolution in England"],
           "Hore's art was born from witnessing the horror of three million dying in the Bengal Famine and the bloody Tebhaga struggle."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Why Ink and Color Were Rejected",
           "Why did Somnath Hore deliberately refuse to apply colored inks to his 'Wounds' paper casts?",
           "Because he believed colored ink would make human agony look decorative, whereas raw white paper revealed suffering in its pure truth",
           ["Because colored ink was too expensive to buy", "Because printing ink was banned by the government", "Because he forgot how to mix ink"],
           "Hore refused to turn pain into pretty decoration; white-on-white pulp forced the viewer to confront the stark wound itself."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Ethical and Humanist Status",
           "Art critics globally rank Somnath Hore's 'Wounds' series alongside which masterpieces of world anti-war art?",
           "Goya's Disasters of War and Picasso's Guernica",
           ["Monet's Water Lilies", "Andy Warhol's Soup Cans", "Leonardo's Mona Lisa"],
           "Hore's Wounds series is revered as one of the supreme humanist cries of conscience against violence and famine in world art.")
]

P2_M17_TXT = (
    "Read the following excerpt on Jyoti Bhatt's 'Devi' and answer the questions that follow:\\n\\n"
    "Created in 1970 using etching and intaglio on paper, 'Devi' by Jyoti Bhatt is an iconic synthesis of modern graphic printmaking and "
    "the living folk and tribal traditions of India. A foundational master at the Faculty of Fine Arts, M.S. University of Baroda, "
    "Bhatt spent decades traveling across the villages of Gujarat, Rajasthan, and Madhya Pradesh, photographically documenting endangered "
    "indigenous art forms. In 'Devi', Bhatt constructs a monumental, iconic frontal face of the divine feminine. Her forehead is crowned "
    "by a radiant Third Eye (Trinetra) symbolizing cosmic awareness, while her countenance and chin are adorned with traditional 'Godna' "
    "(folk tattoo marks). Surrounding the goddess are intricate border panels filled with traditional rangoli, mandana, floral motifs, "
    "and sacred folk typography, transforming rural ritual symbols into a sophisticated modern celebration of universal Shakti, conserved in "
    "the permanent collection of the National Gallery of Modern Art (NGMA), New Delhi."
)
P2_M17_QS = [
    case_q("Modern Trends in Indian Art: Graphic Prints", "Devi Master Printmaker",
           "Who created the iconic modern etching and intaglio print 'Devi' in 1970?",
           "Jyoti Bhatt",
           ["Somnath Hore", "Krishna Reddy", "K. Laxma Goud"],
           "Devi was created in etching and intaglio by master printmaker Jyoti Bhatt in 1970."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Third Eye (Trinetra) Meaning",
           "What does the stylized Third Eye situated prominently on Devi's forehead symbolize?",
           "Cosmic awareness, spiritual insight, and divine intuition (Shakti)",
           ["A wound from an arrow in battle", "A pair of sunglasses", "An eye injury"],
           "The third eye symbolizes divine intuition, supreme spiritual consciousness, and the cosmic power of Goddess Shakti."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Folk Tattoo Tradition (Godna)",
           "The delicate decorative marks on Devi's chin and cheeks are inspired by which indigenous Indian folk tradition?",
           "Godna (traditional tribal and village body tattooing)",
           ["Modern cosmetic surgery stitches", "European carnival face paint", "Industrial barcode stamping"],
           "Bhatt incorporated the ancient Indian village art of Godna tattooing, celebrating rural women's sacred body adornment."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Documentation of Living Traditions",
           "Alongside printmaking, Jyoti Bhatt is celebrated for creating a monumental national archive of:",
           "Photographs documenting vanishing rural and tribal wall murals, floor rangolis, and domestic crafts",
           ["Audio recordings of European opera", "Films of commercial textile factories in Manchester", "Photographs of industrial ships"],
           "Bhatt dedicated decades to traveling across Indian villages to photograph and document endangered folk and tribal visual arts."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "National Gallery of Modern Art Repository",
           "Jyoti Bhatt's master print 'Devi' (1970) is permanently conserved in:",
           "National Gallery of Modern Art (NGMA), New Delhi",
           ["Indian Museum, Kolkata", "Victoria and Albert Museum, London", "Salar Jung Museum, Hyderabad"],
           "Devi is proudly preserved and exhibited in the modern graphic print gallery of the NGMA, New Delhi.")
]

# ==============================================================================
# MOCK 18 PASSAGES
# ==============================================================================
P1_M18_TXT = (
    "Read the following excerpt on Anupam Sud's 'Of Walls' and answer the questions that follow:\\n\\n"
    "Executed in 1982 using etching and aquatint on paper, 'Of Walls' by Anupam Sud is a profound psychological and feminist masterpiece "
    "of modern Indian printmaking. Sud, who co-founded the pioneering 'Group 8' printmakers' collective in Delhi, is renowned for using the "
    "human figure to probe existential themes of social alienation, institutional barriers, and psychological vulnerability. In 'Of Walls', "
    "a solitary, partially clad human figure sits on the ground with drawn-up knees, marooned against the colossal expanse of a crumbling, "
    "decrepit brick wall. Sud uses the aquatint technique with dazzling virtuosity to build velvety, photographic gradations of charcoal, "
    "grey, and shadow, capturing the weathered texture of peeling plaster and exposed bricks. The wall functions as a multi-layered metaphor: "
    "it represents the unyielding patriarchal structures, urban isolation, and psychological barriers that trap and alienate the human "
    "spirit in modern society, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P1_M18_QS = [
    case_q("Modern Trends in Indian Art: Graphic Prints", "Of Walls Master Printmaker",
           "Who created the psychological etching and aquatint masterpiece 'Of Walls' in 1982?",
           "Anupam Sud",
           ["Jyoti Bhatt", "Krishna Reddy", "Somnath Hore"],
           "Of Walls was created by preeminent Indian printmaker Anupam Sud in 1982."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Aquatint Technique Role",
           "What visual effect did the aquatint technique allow Anupam Sud to achieve on the crumbling wall?",
           "Rich, velvety tonal gradations of light and shadow capturing the rough texture of aged bricks and peeling plaster",
           ["Bright neon colors that glow in the dark", "A perfectly smooth glassy surface with no texture", "A mechanical printed barcode"],
           "Aquatint etching allowed Sud to achieve velvety, painterly gradations of dark tone, rendering the tactile decay of the wall."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Metaphorical Meaning of the Wall",
           "In Anupam Sud's visual vocabulary, what does the crumbling brick wall represent?",
           "Rigid social, institutional, and gender barriers that isolate and alienate human beings in modern society",
           ["A sports climbing wall in a gymnasium", "A fortress wall defending against military invaders", "A wall built to display commercial posters"],
           "The wall represents emotional isolation, patriarchal restrictions, and the insurmountable barriers dividing people in urban life."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Group 8 Printmakers Collective",
           "Anupam Sud co-founded which influential printmakers' collective in New Delhi in 1968?",
           "Group 8 (dedicated to establishing printmaking as an autonomous fine art)",
           ["Progressive Artists' Group", "The Calcutta Group", "Chola Artists' Village"],
           "Anupam Sud co-founded Group 8 in Delhi, championing graphic printmaking as an independent, major fine art medium."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Vulnerability of the Human Figure",
           "How is the solitary figure positioned in front of the wall in 'Of Walls'?",
           "Seated on the ground with knees pulled to the chest, exuding introspection, vulnerability, and silent endurance",
           ["Standing on top of the wall waving a flag", "Climbing the wall with an iron ladder", "Running away in wild athletic joy"],
           "The solitary seated figure radiates vulnerability and quiet contemplation, confronting the silent finality of the wall.")
]

P2_M18_TXT = (
    "Read the following excerpt on K. Laxma Goud's 'Man, Woman and Tree' and answer the questions that follow:\\n\\n"
    "Created in the 1970s using etching and aquatint on paper, 'Man, Woman and Tree' by K. Laxma Goud is an electrifying celebration of the "
    "raw, earthy vitality of rural India. Growing up in the agrarian village of Nizampur in Telangana and later training under K.G. Subramanyan "
    "at Baroda, Goud developed a graphic language steeped in tribal memory, peasant sexuality, and the symbiotic bond between human beings and "
    "nature. In 'Man, Woman and Tree', male and female figures are rendered with sharp, nervous, tactile lines, their limbs and bodies "
    "intimately intertwined with the twisting trunk and foliage of a sacred tree. Animals like goats and birds accompany the figures, "
    "visualising a world where human passion, animal instinct, and botanical growth share the same primal sap and cosmic fertility. Goud's "
    "incisive etching needle creates rich, dense textures of skin, hair, bark, and soil, capturing the uninhibited sensual pulse of the rural "
    "Deccan, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P2_M18_QS = [
    case_q("Modern Trends in Indian Art: Graphic Prints", "Man, Woman and Tree Master Artist",
           "Who created the rustic, sensually vibrant etching 'Man, Woman and Tree' in the 1970s?",
           "K. Laxma Goud",
           ["Anupam Sud", "Jyoti Bhatt", "Krishna Reddy"],
           "Man, Woman and Tree was etched by K. Laxma Goud, renowned for his raw, vital depictions of rural Telangana."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Rural Milieu and Childhood Roots",
           "From which historical rural region did K. Laxma Goud draw his imagery of primal vitality and tribal memory?",
           "Nizampur and the rural Telangana countryside of the Deccan",
           ["The industrial docks of London", "The Himalayan snowfields of Ladakh", "The tea estates of Assam"],
           "Goud drew lifelong inspiration from his village childhood in Nizampur, Telangana, celebrating peasant life and fertility lore."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Symbiotic Union with Nature",
           "In 'Man, Woman and Tree', how is the relationship between humanity and the tree portrayed?",
           "Human limbs, tree branches, and animal forms are intimately intertwined in a shared cycle of organic fertility",
           ["Humans are chopping down the tree with iron axes", "The tree is falling onto the humans in a storm", "The tree is a dead wooden telephone pole"],
           "Goud depicts humanity as an organic extension of nature, sharing the same life force, desire, and fertility as the living tree."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Tactile Quality of Goud's Line",
           "How do art critics describe the drawing line in K. Laxma Goud's etchings?",
           "Sharp, incisive, bristling with nervous energy, and packed with microscopic textures of skin and bark",
           ["Blurry and faint like light watercolor", "Drawn with a mechanical ruler with no curves", "A blank unetched line"],
           "Goud's etching needle bites into the plate with tactile ferocity, capturing the rough textures of bark, skin, and animal hair."),
    case_q("Modern Trends in Indian Art: Graphic Prints", "Mentorship under K.G. Subramanyan",
           "At the Faculty of Fine Arts in Baroda, K. Laxma Goud refined his graphic vision under the mentorship of:",
           "K.G. Subramanyan (Manida)",
           ["Raja Ravi Varma", "Jamini Roy", "Abanindranath Tagore"],
           "Goud flourished under the guidance of K.G. Subramanyan at Baroda, learning to synthesize folk vitality with modern draftsmanship.")
]

# ==============================================================================
# MOCK 19 PASSAGES
# ==============================================================================
P1_M19_TXT = (
    "Read the following excerpt on D.P. Roy Chowdhury's 'Triumph of Labour' and answer the questions that follow:\\n\\n"
    "Unveiled on Marina Beach in Madras (Chennai) on May Day in 1954, 'Triumph of Labour' by Devi Prasad (D.P.) Roy Chowdhury is a towering "
    "monument of modern Indian heroic sculpture. Cast in bronze, the monumental sculpture portrays four muscular, bare-chested laborers "
    "straining every sinew of their bodies to dislodge a massive, immovable rock using heavy wooden levers. Roy Chowdhury, who was the first "
    "Indian Principal of the Madras School of Arts and an accomplished wrestler and painter, combined Auguste Rodin's muscular realism with "
    "a deep socialist commitment to the working class. Every anatomical detail—taut neck tendons, swollen veins, and flexing calf muscles—"
    "radiates immense physical exertion and collective solidarity. Erected on the very beach where India's first May Day rally was held in "
    "1923, the statue stands as an eternal monument to the dignity of manual labor and human perseverance over unyielding nature, with a "
    "full-size cast prominently installed at the National Gallery of Modern Art (NGMA), New Delhi."
)
P1_M19_QS = [
    case_q("Modern Trends in Indian Art: Sculptures", "Triumph of Labour Master Sculptor",
           "Who created the monumental heroic bronze sculpture 'Triumph of Labour' in 1954?",
           "D.P. Roy Chowdhury (Devi Prasad Roy Chowdhury)",
           ["Ramkinkar Baij", "Amar Nath Sehgal", "P.V. Jankiram"],
           "Triumph of Labour was sculpted in bronze by D.P. Roy Chowdhury in 1954."),
    case_q("Modern Trends in Indian Art: Sculptures", "Action Depicted by the Four Men",
           "What difficult physical task are the four muscular laborers engaged in performing?",
           "Straining together with wooden poles to pry and dislodge a colossal, immovable boulder",
           ["Carrying a wounded soldier from a battlefield", "Pulling a royal golden chariot", "Constructing an iron bridge across a river"],
           "The four laborers are locked in collective struggle, using wooden levers to move a massive rock obstructing human progress."),
    case_q("Modern Trends in Indian Art: Sculptures", "European Sculptural Influence",
           "Which European master sculptor's rough, muscular realism profoundly influenced D.P. Roy Chowdhury?",
           "Auguste Rodin (creator of The Thinker)",
           ["Michelangelo", "Donatello", "Gian Lorenzo Bernini"],
           "Roy Chowdhury was hailed as the 'Rodin of India' for his mastery of muscular bronze modeling and heroic human struggle."),
    case_q("Modern Trends in Indian Art: Sculptures", "Historic May Day Connection",
           "Why was 'Triumph of Labour' unveiled on Marina Beach specifically on May 1st?",
           "To celebrate International Workers' Day (May Day) at the site of India's first May Day rally in 1923",
           ["Because it was the birthday of the British Governor", "Because the beach was opening for tourist swimming", "Because the bronze had just arrived from London"],
           "Marina Beach was where Singaravelu Chettiar held India's first May Day rally in 1923; the sculpture commemorates workers' dignity."),
    case_q("Modern Trends in Indian Art: Sculptures", "Capital Installation Location",
           "A prominent full-size bronze cast of 'Triumph of Labour' greets visitors in the garden of:",
           "National Gallery of Modern Art (NGMA), New Delhi",
           ["Rashtrapati Bhavan", "Parliament House", "Red Fort"],
           "A full-scale cast of Triumph of Labour is installed in the entrance gardens of the NGMA at Jaipur House, New Delhi.")
]

P2_M19_TXT = (
    "Read the following excerpt on Ramkinkar Baij's 'Santhal Family' and answer the questions that follow:\\n\\n"
    "Created in 1938 at Santiniketan, 'Santhal Family' by Ramkinkar Baij is universally recognized as the foundational monument of modern "
    "Indian sculpture. Breaking completely free from the colonial academic tradition of casting polished salon bronzes on indoor pedestals, "
    "Baij created the first monumental public modernist sculpture in India directly in the open air, utilizing humble, local materials: "
    "cement and river sand mixed with coarse gravel and river pebbles. The sculpture portrays an indigenous Santhal peasant family migrating "
    "in search of work during difficult economic times: the muscular father carries two children seated in baskets balanced on a shoulder "
    "pole (bahangi); the mother walks beside him balancing a bundle upon her head; and their faithful pet dog trots energetically alongside. "
    "Baij treats the surface with rugged, raw textural honesty, allowing the coarse pebbles to catch the sunlight and rain, integrating the "
    "monumental figures organically into the red laterite soil of Santiniketan."
)
P2_M19_QS = [
    case_q("Modern Trends in Indian Art: Sculptures", "Santhal Family Master Sculptor",
           "Who created the pioneering open-air modern sculpture 'Santhal Family' in 1938?",
           "Ramkinkar Baij",
           ["D.P. Roy Chowdhury", "Amar Nath Sehgal", "P.V. Jankiram"],
           "Santhal Family was created by Ramkinkar Baij, celebrated as the Father of Modern Indian Sculpture."),
    case_q("Modern Trends in Indian Art: Sculptures", "Revolutionary Materials Used",
           "What unconventional local materials did Ramkinkar Baij use to build 'Santhal Family' in open air?",
           "Cement, river sand, concrete, and coarse local gravel and river pebbles",
           ["Imported Italian Carrara white marble", "Cast bronze imported from France", "Carved teak wood with gold leaf"],
           "Ramkinkar rejected expensive imported salon materials, pioneering modern sculpture in rough local cement and river gravel."),
    case_q("Modern Trends in Indian Art: Sculptures", "Figures Comprising the Sculpture",
           "Who are the figures represented in Ramkinkar Baij's 'Santhal Family'?",
           "A Santhal father carrying children in baskets on a pole, the mother carrying a bundle, and their trotting dog",
           ["A king, a queen, a royal priest, and a pet tiger", "Three foreign soldiers marching with rifles", "A mother with five daughters singing"],
           "The sculpture depicts a migrating tribal family: father with children on a shoulder pole, mother with a head load, and their dog."),
    case_q("Modern Trends in Indian Art: Sculptures", "Father of Modern Indian Sculpture",
           "Ramkinkar Baij is universally celebrated in Indian art history as:",
           "The Father of Modern Indian Sculpture",
           ["The first Governor-General of India", "The inventor of cement manufacturing", "The founder of the Calcutta Art School"],
           "Ramkinkar is revered as the Father of Modern Indian Sculpture for liberating sculpture into monumental, open-air modernism."),
    case_q("Modern Trends in Indian Art: Sculptures", "Social Significance of the Tribal Subject",
           "What was socially revolutionary about Ramkinkar's choice of the Santhal family as a monumental monument?",
           "He elevated dispossessed, marginalized indigenous tribal laborers to monumental heroic stature in modern world art",
           ["He argued that tribal people should be locked in museums", "He made a comic caricature of village life", "He wanted to sell souvenirs to British tourists"],
           "Ramkinkar elevated humble tribal migrants into monumental heroes, celebrating their resilience and intimate harmony with nature.")
]

# ==============================================================================
# MOCK 20 PASSAGES
# ==============================================================================
P1_M20_TXT = (
    "Read the following excerpt on Amar Nath Sehgal's 'Cries Un-heard' and the moral rights battle and answer the questions:\\n\\n"
    "Sculpted in 1958 in bronze, 'Cries Un-heard' by Amar Nath Sehgal is a searing monument to human suffering and the trauma of the 1947 "
    "Partition of India. Having witnessed the horrific communal butchery, refugee flight, and butchered trains in Punjab during Partition, "
    "Sehgal channeled his anguish into sculpture. In 'Cries Un-heard', three elongated, emaciated bronze figures (a father, mother, and child) "
    "throw their heads back and thrust their attenuated arms toward the heavens in an agonizing, silent scream against cruelty. "
    "Beyond his art, Sehgal fought an epic 13-year legal battle against the Government of India (Amar Nath Sehgal v. Union of India, 2005) "
    "after his monumental 140-foot bronze mural at Vigyan Bhavan was carelessly dismantled and damaged during renovations. The landmark Delhi "
    "High Court judgment upheld Section 57 of the Indian Copyright Act, establishing that an artist possesses inalienable 'Moral Rights' "
    "(integrity and paternity) to protect their creation from mutilation, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P1_M20_QS = [
    case_q("Modern Trends in Indian Art: Sculptures", "Cries Un-heard Master Sculptor",
           "Who sculpted the poignant modern bronze masterpiece 'Cries Un-heard' in 1958?",
           "Amar Nath Sehgal",
           ["P.V. Jankiram", "D.P. Roy Chowdhury", "Ramkinkar Baij"],
           "Cries Un-heard was sculpted in bronze by Amar Nath Sehgal in 1958."),
    case_q("Modern Trends in Indian Art: Sculptures", "Historical Tragedy Inspiring the Work",
           "What traumatic historical event personally witnessed by Sehgal inspired 'Cries Un-heard'?",
           "The horrific communal violence and refugee agony of the 1947 Partition of India",
           ["The First World War in Europe", "The Great Depression in America", "The plague epidemic of Surat"],
           "Uprooted from West Punjab during Partition, Sehgal dedicated his art to mourning the innocent victims of hatred and displacement."),
    case_q("Modern Trends in Indian Art: Sculptures", "Expressive Elongation of Figures",
           "How are the three human figures depicted in 'Cries Un-heard'?",
           "Elongated, emaciated bodies with hands thrown to the heavens in a desperate, unheard scream",
           ["Smiling acrobats performing circus leaps", "Three classical kings sitting on thrones", "Muscular athletes lifting iron weights"],
           "The three figures raise attenuated, stretching arms in raw agony, their open mouths frozen in an eternal, unanswered scream."),
    case_q("Modern Trends in Indian Art: Sculptures", "Landmark Moral Rights Legal Victory",
           "In the landmark case Amar Nath Sehgal v. Union of India (2005), what fundamental legal right of artists was upheld by the Delhi High Court?",
           "The artist's inalienable Moral Rights (to protect their artwork from mutilation, distortion, or damage even after sale)",
           ["The right to print government currency", "The right to demolish public buildings", "The right to never pay income tax"],
           "Justice Nandrajog ruled that an artist's moral rights are perpetual: the integrity of an artwork must be protected from mutilation."),
    case_q("Modern Trends in Indian Art: Sculptures", "Vigyan Bhavan Mural Material",
           "What monumental public artwork of Sehgal's was dismantled at Vigyan Bhavan, prompting the historic legal battle?",
           "A monumental 140-foot bronze relief mural depicting rural Indian life and freedom struggle",
           ["A giant marble statue of Queen Victoria", "A stained glass window from France", "A wooden carved temple chariot"],
           "Sehgal's 140-foot bronze mural in Vigyan Bhavan was damaged during renovations, leading to the landmark 13-year court triumph.")
]

P2_M20_TXT = (
    "Read the following excerpt on P.V. Jankiram's 'Ganesha' and sheet metal sculpture and answer the questions that follow:\\n\\n"
    "Created in 1970 using oxidized copper sheet metal, brass wires, and repoussé techniques, 'Ganesha' by P.V. Jankiram is a defining "
    "masterpiece of the 'Madras Movement' in modern Indian sculpture. Working at the Government College of Arts and Crafts in Madras and the "
    "Cholamandal Artists' Village under the mentorship of K.C.S. Paniker, Jankiram rejected both traditional stone carving and European "
    "academic bronze modeling. Instead, he drew inspiration from traditional South Indian temple craft, specifically 'Kavacham'—the sacred "
    "embossed sheet-metal casings placed over stone deities in sanctums. In 'Ganesha', Jankiram constructs a monumental, predominantly "
    "two-dimensional frontal sheet of oxidized copper. Across this planar surface, he solders delicate brass wires and textured metal strips "
    "to delineate Ganesha's crown, ears, trunk, and ornaments, while the deity gracefully plays a stringed veena, seamlessly fusing traditional "
    "temple ritual craft with modern linear constructivism, conserved in the National Gallery of Modern Art (NGMA), New Delhi."
)
P2_M20_QS = [
    case_q("Modern Trends in Indian Art: Sculptures", "Ganesha Master Sculptor and Medium",
           "Who created the modern linear sculpture 'Ganesha' (1970) using oxidized copper sheet metal and brass wires?",
           "P.V. Jankiram",
           ["Amar Nath Sehgal", "Ramkinkar Baij", "D.P. Roy Chowdhury"],
           "Ganesha was sculpted by P.V. Jankiram in 1970 using oxidized copper sheet metal and soldered brass wires."),
    case_q("Modern Trends in Indian Art: Sculptures", "Indigenous Temple Craft Source (Kavacham)",
           "Which traditional South Indian metalcraft inspired Jankiram's flat, frontal sheet-metal technique?",
           "Kavacham (embossed sheet-metal and repoussé deity coverings in South Indian temples)",
           ["Lost-wax Dokra tribal casting of Bastar", "Bidri silver inlay on zinc alloy", "Tanjore glass painting"],
           "Jankiram adapted the temple craft of Kavacham (repoussé sheet metal deity casings) into modern open-work linear sculpture."),
    case_q("Modern Trends in Indian Art: Sculptures", "Musical Instrument Played by Ganesha",
           "What musical instrument is Lord Ganesha depicted playing in Jankiram's sculpture?",
           "A stringed musical Veena",
           ["A pair of kettle-drums", "A brass trumpet", "A wooden flute"],
           "Ganesha is portrayed as a divine musician, holding and playing a veena formed with delicate brass wires."),
    case_q("Modern Trends in Indian Art: Sculptures", "Madras Movement and Cholamandal Village",
           "P.V. Jankiram was a key pioneer of which major modern regional art movement in South India?",
           "The Madras Movement (associated with K.C.S. Paniker and Cholamandal Artists' Village)",
           ["The Bengal Revivalist Movement", "The Progressive Artists' Group of Bombay", "The Delhi Silpi Chakra"],
           "Jankiram was a core pioneer of the Madras Movement at Cholamandal, synthesizing indigenous craft with modernist linear form."),
    case_q("Modern Trends in Indian Art: Sculptures", "National Conservation Repository",
           "P.V. Jankiram's iconic modern sculpture 'Ganesha' is permanently conserved and displayed in:",
           "National Gallery of Modern Art (NGMA), New Delhi",
           ["Government Museum, Chennai", "Salar Jung Museum, Hyderabad", "Indian Museum, Kolkata"],
           "Ganesha is preserved in the modern Indian sculpture collection of the National Gallery of Modern Art (NGMA), New Delhi.")
]

PASSAGES_11_20 = [
    ( (P1_M11_TXT, P1_M11_QS), (P2_M11_TXT, P2_M11_QS) ),
    ( (P1_M12_TXT, P1_M12_QS), (P2_M12_TXT, P2_M12_QS) ),
    ( (P1_M13_TXT, P1_M13_QS), (P2_M13_TXT, P2_M13_QS) ),
    ( (P1_M14_TXT, P1_M14_QS), (P2_M14_TXT, P2_M14_QS) ),
    ( (P1_M15_TXT, P1_M15_QS), (P2_M15_TXT, P2_M15_QS) ),
    ( (P1_M16_TXT, P1_M16_QS), (P2_M16_TXT, P2_M16_QS) ),
    ( (P1_M17_TXT, P1_M17_QS), (P2_M17_TXT, P2_M17_QS) ),
    ( (P1_M18_TXT, P1_M18_QS), (P2_M18_TXT, P2_M18_QS) ),
    ( (P1_M19_TXT, P1_M19_QS), (P2_M19_TXT, P2_M19_QS) ),
    ( (P1_M20_TXT, P1_M20_QS), (P2_M20_TXT, P2_M20_QS) )
]

assert len(PASSAGES_11_20) == 10, f"Expected 10 pairs in PASSAGES_11_20, got {len(PASSAGES_11_20)}"
for m_idx, (p1, p2) in enumerate(PASSAGES_11_20, start=11):
    assert len(p1[1]) == 5, f"Mock {m_idx} P1 has {len(p1[1])} Qs"
    assert len(p2[1]) == 5, f"Mock {m_idx} P2 has {len(p2[1])} Qs"

print("Fine Arts Passages 11 to 20 compiled successfully: 10 pairs (20 passages, 100 questions).")
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(p11_15 + p16_20)

print(f"Generated complete {out_path} ({len(p11_15 + p16_20)} bytes)")
