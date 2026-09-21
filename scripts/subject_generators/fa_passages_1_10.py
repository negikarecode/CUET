import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import case_q

# ==============================================================================
# MOCK 1 PASSAGES
# ==============================================================================
P1_M1_TXT = (
    "Read the following excerpt on the Mewar school masterpiece 'Maru-Ragini' and answer the questions that follow:\n\n"
    "The celebrated miniature 'Maru-Ragini' (c. 1628 A.D.) was painted by master artist Sahibdin during the golden age of Mewar "
    "painting under Maharana Jagat Singh I. The painting illustrates the popular Rajasthani desert folk romance of Dhola and Maru. "
    "In this vivid folio from a Ragamala series, prince Dhola and princess Maru are depicted eloping on the back of a magnificently "
    "caparisoned royal camel racing across the desert. The camel is rendered with rhythmic vigor, adorned with colorful tassels, bells, "
    "and embroidered saddle-cloths. Two male attendants bearing swords and shields run alongside on foot, accompanied by a loyal "
    "hunting hound leading the way. The entire dramatic composition is set against an unmodulated, glowing yellow background, "
    "topped by a narrow strip of dark blue sky with a curved white line representing the horizon, currently conserved in the National Museum, New Delhi."
)
P1_M1_QS = [
    case_q("The Rajasthani School of Miniature Painting", "Maru-Ragini Master Artist",
           "Who painted the iconic Mewar miniature 'Maru-Ragini' around 1628 A.D.?",
           "Sahibdin",
           ["Nihal Chand", "Nainsukh", "Utkal Ram"],
           "Maru-Ragini was painted by master Sahibdin of the Mewar court atelier in 1628 A.D."),
    case_q("The Rajasthani School of Miniature Painting", "Maru-Ragini Literary Ballad",
           "The romantic narrative illustrated in 'Maru-Ragini' is derived from which traditional desert legend?",
           "The folk ballad of Dhola and Maru",
           ["The romance of Laila and Majnu", "The epic of Heer and Ranjha", "The legend of Sohni and Mahiwal"],
           "Maru-Ragini illustrates the legendary Rajasthani love ballad of Prince Dhola and Princess Maru."),
    case_q("The Rajasthani School of Miniature Painting", "Maru-Ragini Background Color",
           "What dominant color is used as the unshaded flat ground in the central field of 'Maru-Ragini'?",
           "A luminous, flat brilliant yellow",
           ["A solid pitch black", "A dark stormy green", "A pale snow-white"],
           "The central scene is set against an unmodulated, luminous yellow background that highlights the galloping camel."),
    case_q("The Rajasthani School of Miniature Painting", "Royal Patron of Sahibdin",
           "Under the royal patronage of which Mewar ruler did Sahibdin paint this landmark Ragamala suite?",
           "Maharana Jagat Singh I",
           ["Maharana Pratap", "Maharana Kumbha", "Rana Sanga"],
           "Jagat Singh I of Mewar (1628–1652) was Sahibdin's greatest royal patron during Mewar's artistic golden age."),
    case_q("The Rajasthani School of Miniature Painting", "Animals Accompanying the Camel",
           "Besides the royal riding camel, which animal is depicted accompanying the riders in 'Maru-Ragini'?",
           "A loyal hunting hound running ahead of the camel",
           ["A trained cheetah sitting on the camel", "A falcon perched on Dhola's wrist", "An elephant in the distance"],
           "A swift hunting hound runs ahead of the attendants, guiding the fleeing lovers across the desert terrain.")
]

P2_M1_TXT = (
    "Read the following excerpt on the Akbari masterpiece 'Krishna Lifting Mount Govardhana' and answer the questions that follow:\n\n"
    "Painted between 1585 and 1590 A.D. for Emperor Akbar's imperial Harivamsa manuscript, 'Krishna Lifting Mount Govardhana' is one of "
    "the crowning achievements of master artist Miskin. The miniature illustrates the mythological episode where Lord Krishna lifts the "
    "colossal Mount Govardhana on the little finger of his left hand to shelter the cowherds, milkmaids, and cattle of Braj from the furious "
    "torrential storm unleashed by King Indra. Miskin demonstrates exceptional compositional mastery: the rocky mountain rises as a "
    "towering vertical mass of craggy, multi-hued Persianate rock formations populated by lively spotted deer, monkeys, and peacocks. "
    "Beneath this rocky canopy, Krishna stands serenely at the center, surrounded by an anxious yet awe-struck assembly of villagers and "
    "naturalistically modeled cattle. The top of the page shows swirling dark storm clouds illuminated by lightning, capturing a sublime "
    "synthesis of Persian landscape conventions, European drapery volume, and Hindu devotional narrative."
)
P2_M1_QS = [
    case_q("The Mughal School of Miniature Painting", "Mount Govardhana Master Artist",
           "Which celebrated court painter of Akbar's atelier created 'Krishna Lifting Mount Govardhana'?",
           "Miskin",
           ["Basawan", "Ustad Mansur", "Abdus Samad"],
           "The masterpiece was executed by master Miskin for Akbar's royal Harivamsa manuscript."),
    case_q("The Mughal School of Miniature Painting", "Support Finger of Krishna",
           "On which finger does Lord Krishna effortlessly balance the immense mountain in Miskin's painting?",
           "The little finger (pinky) of his left hand",
           ["The thumb of his right hand", "His right index finger", "Between both palms"],
           "In accordance with classical mythology, Krishna balances the massive peak on the little finger of his left hand."),
    case_q("The Mughal School of Miniature Painting", "Stylistic Origin of the Rocky Peaks",
           "The craggy, multi-tiered, swirling rocky formations of Mount Govardhana reveal strong stylistic influence from:",
           "Persian Timurid and Safavid miniature painting conventions",
           ["Ancient Roman mosaic tiling", "Egyptian wall reliefs", "Chinese monochrome ink scrolls"],
           "The sponge-like craggy rock formations populated by wildlife are derived directly from the Persian Safavid tradition."),
    case_q("The Mughal School of Miniature Painting", "Cause of the Tempest",
           "In the narrative context of the painting, why did Indra unleash the violent storm on the people of Braj?",
           "Because Krishna persuaded the villagers to worship Mount Govardhana and nature instead of Indra",
           ["Because the villagers refused to pay taxes", "Because the villagers stole Indra's divine chariot", "Because a demon invaded heaven"],
           "Indra was enraged when Krishna taught the people to worship the mountain and cows that sustain them rather than conducting sacrifices to Indra."),
    case_q("The Mughal School of Miniature Painting", "National Conservation Repository",
           "Miskin's original imperial masterpiece 'Krishna Lifting Mount Govardhana' is preserved in:",
           "National Museum, New Delhi",
           ["Victoria and Albert Museum, London", "Metropolitan Museum of Art, New York", "Indian Museum, Kolkata"],
           "This supreme Akbari treasure is conserved in the National Museum, New Delhi.")
]

# ==============================================================================
# MOCK 2 PASSAGES
# ==============================================================================
P1_M2_TXT = (
    "Read the following excerpt on the Kishangarh masterpiece 'Radha (Bani Thani)' and answer the questions that follow:\n\n"
    "Widely celebrated as the 'Indian Mona Lisa', 'Radha (Bani Thani)' was painted around 1750 A.D. by master artist Nihal Chand under "
    "the direct spiritual and poetic patronage of Raja Sawant Singh of Kishangarh. Sawant Singh, a passionate devotee of Krishna who wrote "
    "sublime devotional verses under the pen-name 'Nagari Das', immortalized his beloved poetess-singer Bani Thani as the embodiment of Radha. "
    "Nihal Chand transformed her likeness into an extraordinary aesthetic archetype of divine feminine beauty: featuring elongated, bow-like "
    "lotus eyes (khanjanakshi), high arched eyebrows, an aristocratic aquiline nose, and a delicately pointed chin. She is draped in an "
    "exquisitely sheer, transparent gossamer odhani decorated with golden floral sprigs that gracefully reveals her long black tresses. "
    "In her left hand, she holds two unopened pink lotus buds, symbolizing spiritual purity, currently in the National Museum, New Delhi."
)
P1_M2_QS = [
    case_q("The Rajasthani School of Miniature Painting", "Bani Thani Master Painter",
           "Who painted the iconic Kishangarh masterpiece 'Radha (Bani Thani)'?",
           "Nihal Chand",
           ["Sahibdin", "Utkal Ram", "Manaku"],
           "Radha (Bani Thani) was painted by Nihal Chand around 1750 A.D. at Kishangarh."),
    case_q("The Rajasthani School of Miniature Painting", "Nom de Plume of the Patron",
           "Under what poetic nom de plume did Raja Sawant Singh of Kishangarh compose his devotional verses?",
           "Nagari Das",
           ["Bihari Lal", "Rasikendra", "Surdas"],
           "Raja Sawant Singh wrote hundreds of Vaishnavite devotional songs under the name 'Nagari Das'."),
    case_q("The Rajasthani School of Miniature Painting", "Facial Archetype Features",
           "Which distinctive anatomical feature characterizes Nihal Chand's Kishangarh profile in 'Bani Thani'?",
           "Elongated curved lotus eyes, dramatically arched eyebrows, and a sharp pointed chin",
           ["A round moon face with thick bushy brows", "A broad square jaw with small circular eyes", "A flat button nose with short eyelashes"],
           "Nihal Chand's iconic archetype features elongated lotus eyes, arched brows, a sharp nose, and a pointed chin."),
    case_q("The Rajasthani School of Miniature Painting", "Objects in Radha's Left Hand",
           "What delicate symbolic objects does Radha hold between the slender fingers of her left hand?",
           "Two unopened pink lotus buds",
           ["A golden flute", "A pair of betel leaves", "A jeweled dagger"],
           "Radha holds two delicate lotus buds, symbolizing spiritual purity and beauty."),
    case_q("The Rajasthani School of Miniature Painting", "Indian Mona Lisa Accolade",
           "Why did art historian Eric Dickinson famously refer to 'Radha (Bani Thani)' as the 'Mona Lisa of India'?",
           "Because of its mysterious, enigmatic smile, ethereal grace, and supreme aesthetic idealization",
           ["Because it was painted in Italy", "Because Leonardo da Vinci helped paint it", "Because it was stolen from a museum"],
           "Dickinson bestowed the title due to the painting's subtle enigmatic smile, aristocratic posture, and timeless feminine mystique.")
]

P2_M2_TXT = (
    "Read the following excerpt on Ustad Mansur's 'Falcon on a Bird-Rest' and answer the questions that follow:\n\n"
    "Executed around 1618–1619 A.D., 'Falcon on a Bird-Rest' is an incomparable masterpiece of Mughal scientific naturalism painted "
    "by Ustad Mansur, who was honored by Emperor Jahangir with the title 'Nadir-ul-Asr' (Wonder of the Age). In his royal memoirs, "
    "Tuzuk-i-Jahangiri, Jahangir records that Shah Abbas I of Persia sent a rare, magnificent white hunting falcon as an imperial gift. "
    "Tragically, soon after its arrival, the prized royal raptor was mauled to death by a palace cat. Overcome with grief, Jahangir "
    "commanded Ustad Mansur to paint its likeness so that its peerless beauty would be preserved for posterity. Mansur painted the royal falcon "
    "tethered with thin red cords to a cushioned wooden crossbar against a quiet, unmodulated pale yellow ground. The bird's alert, golden-ringed "
    "eye, razor-sharp curved beak, powerful talons, and meticulously observed speckled plumage convey predatory energy held in quiet poise."
)
P2_M2_QS = [
    case_q("The Mughal School of Miniature Painting", "Falcon Master Artist and Title",
     "What imperial title was conferred upon Ustad Mansur by Emperor Jahangir for his scientific animal paintings?",
     "Nadir-ul-Asr (Wonder of the Age)",
     ["Nadir-uz-Zaman (Wonder of the Epoch)", "Shirin-Qalam (Sweet Pen)", "Khan-i-Khanan"],
     "Jahangir honored Ustad Mansur with 'Nadir-ul-Asr' for his incomparable mastery of birds and flora."),
    case_q("The Mughal School of Miniature Painting", "Diplomatic Gift Source",
     "Which Persian ruler sent the rare hunting falcon as a diplomatic present to Jahangir?",
     "Shah Abbas I of Persia",
     ["Shah Tahmasp", "Shah Ismail", "Nader Shah"],
     "The rare hunting falcon was sent to Jahangir by Shah Abbas I of Persia via royal envoy Pari Beg."),
    case_q("The Mughal School of Miniature Painting", "Tragic Fate of the Royal Pet",
     "What tragic domestic event prompted Jahangir to order Ustad Mansur to paint the falcon?",
     "The falcon was mauled to death by an imperial palace cat",
     ["The falcon escaped into the high Himalayas", "The falcon was shot by an enemy archer", "The falcon died of extreme old age"],
     "Jahangir records with sorrow that a palace cat killed the prized hunting falcon, prompting its immortalization in paint."),
    case_q("The Mughal School of Miniature Painting", "Depiction of the Falcon's Eye",
     "How did Ustad Mansur capture the intense predatory alertness of the falcon?",
     "By painting a sharp black pupil encircled by a luminous golden-yellow iris with fine black outlines",
     ["By leaving the eye socket completely empty", "By painting human eyelashes on the bird", "By covering the eye with a leather hood"],
     "Mansur rendered the raptor's fierce predatory gaze with a piercing black pupil encircled by a bright golden-yellow iris."),
    case_q("The Mughal School of Miniature Painting", "Primary Museum Collections",
     "Premier historical folios and versions of Jahangir's falcon portraits are conserved in the National Museum and:",
     "Maharaja Sawai Man Singh II Museum (City Palace, Jaipur)",
     ["Salar Jung Museum, Hyderabad", "Victoria Memorial, Kolkata", "Indian Museum, Kolkata"],
     "The iconic 'Falcon on a Bird-Rest' is preserved in the City Palace Museum in Jaipur, with sister folios in the National Museum, New Delhi.")
]

# ==============================================================================
# MOCK 3 PASSAGES
# ==============================================================================
P1_M3_TXT = (
    "Read the following excerpt on the Basohli masterpiece 'Krishna with Gopis' and answer the questions that follow:\n\n"
    "Dated to 1730 A.D., 'Krishna with Gopis' is an explosive, vibrant masterpiece of the Basohli school of Pahari painting, created by "
    "master artist Manaku from an illuminated series of Jayadeva's Geet Govinda. The painting illustrates the divine romance on the verdant "
    "banks of the river Yamuna. Basohli painting is celebrated for its fierce, unrestrained emotional vigor and intense primary colors. "
    "Krishna, dressed in his radiant yellow pitambar and crowned with peacock feathers, stands at the center, surrounded by adoring cowherd "
    "maidens who embrace him, whisper in his ear, offer betel leaves, and touch his feet with deep devotional intimacy. The entire group is "
    "framed against an intense, unshaded monochrome yellow background, topped by a high, narrow horizon strip of blue and white sky. "
    "A unique technical hallmark of this school was the application of tiny cut pieces of iridescent emerald-green beetle-wing cases "
    "(elytra) onto the jewelry to simulate sparkling emeralds, currently in the National Museum, New Delhi."
)
P1_M3_QS = [
    case_q("The Pahari School of Miniature Painting", "Basohli Master Artist",
           "Who painted the landmark 1730 Basohli Geet Govinda folio 'Krishna with Gopis'?",
           "Manaku",
           ["Nainsukh", "Sahibdin", "Mola Ram"],
           "Krishna with Gopis was executed by master Manaku at Basohli in 1730 A.D."),
    case_q("The Pahari School of Miniature Painting", "Unique Beetle-Wing Technique",
           "What extraordinary material did Basohli artists use to simulate glistening emeralds on crowns and jewelry?",
           "Tiny cut shards of iridescent green beetle-wing cases (elytra)",
           ["Crushed green glass beads", "Powdered malachite stone paste", "Imported green oil enamel"],
           "Basohli painters pasted cut pieces of shiny Buprestid jewel-beetle wings to simulate sparkling emeralds."),
    case_q("The Pahari School of Miniature Painting", "Basohli Background Palette",
           "What striking background color dominates 'Krishna with Gopis', amplifying its warm emotional intensity?",
           "An intense, unmodulated glowing monochrome yellow",
           ["A cold, snowy white mountain peak", "A dark gloomy charcoal wash", "A pale washed-out blue"],
           "The intense, solid yellow ground radiates the warmth of spring (Vasanta) and divine love (Shringara)."),
    case_q("The Pahari School of Miniature Painting", "Textual Source of the Painting",
           "Which 12th-century Sanskrit devotional text served as the source for 'Krishna with Gopis'?",
           "Geet Govinda by Jayadeva",
           ["Rasikapriya by Keshavdas", "Bihari Satsai by Bihari", "Ramcharitmanas by Tulsidas"],
           "The painting illustrates Jayadeva's 12th-century lyric poem Geet Govinda celebrating divine love."),
    case_q("The Pahari School of Miniature Painting", "River Bank Setting",
           "Along the banks of which sacred river is the pastoral encounter staged in 'Krishna with Gopis'?",
           "River Yamuna",
           ["River Ganga", "River Saraswati", "River Godavari"],
           "The romantic encounter takes place along the blooming, verdant banks of the holy river Yamuna.")
]

P2_M3_TXT = (
    "Read the following excerpt on Ustad Faquirullah Khan's 'Kabir and Raidas' and answer the questions that follow:\n\n"
    "Painted around 1640 A.D. during the reign of Emperor Shah Jahan, 'Kabir and Raidas' is one of the most serene and profound spiritual "
    "masterpieces of Mughal art, created by the head of the imperial atelier, Ustad Faquirullah Khan. Reflecting the syncretic intellectual "
    "and philosophical atmosphere patronized by Prince Dara Shikoh, the painting depicts two towering saints of the Bhakti movement engaged "
    "in quiet spiritual communion. Saint Kabir, an elderly weaver, is seated outside his humble thatch-and-mud hut, actively weaving cloth "
    "on a wooden pit-loom. Sitting opposite him on the bare earth is Saint Raidas (Ravidas), the revered cobbler-saint, holding a rosary "
    "and listening in deep contemplative absorption. The painting deliberately eschews the pomp, gold brocades, and ceremonial splendor "
    "of the imperial court, adopting an austere, subdued monochromatic palette of earthy browns, beiges, and soft ochres to celebrate the "
    "supreme dignity of honest labor, humility, and spiritual brotherhood, conserved in the National Museum, New Delhi."
)
P2_M3_QS = [
    case_q("The Mughal School of Miniature Painting", "Kabir and Raidas Master Artist",
           "Who painted the spiritual Mughal masterpiece 'Kabir and Raidas' around 1640 A.D.?",
           "Ustad Faquirullah Khan",
           ["Miskin", "Ustad Mansur", "Bichitr"],
           "The painting was created by Ustad Faquirullah Khan, head of Shah Jahan's imperial painting atelier."),
    case_q("The Mughal School of Miniature Painting", "Saint Kabir's Activity",
           "What traditional manual craft is Saint Kabir depicted performing in the painting?",
           "Weaving cloth on a simple wooden pit-loom outside his hut",
           ["Carving a stone idol of Vishnu", "Forging an iron sword at an anvil", "Writing verses on palm leaves at a desk"],
           "Kabir sits at his pit-loom, actively operating the foot-treadles and shuttle while in spiritual communion."),
    case_q("The Mughal School of Miniature Painting", "Spiritual Patron at Court",
           "Which enlightened Mughal prince's philosophical bridge between Sufism and Vedanta inspired this painting?",
           "Prince Dara Shikoh",
           ["Prince Aurangzeb", "Prince Murad Bakhsh", "Prince Shuja"],
           "Dara Shikoh's passionate search for spiritual synthesis between Hindu Bhakti and Islamic Sufism fostered paintings of saints."),
    case_q("The Mughal School of Miniature Painting", "Subdued Color Harmony",
           "What color harmony did Faquirullah Khan employ to convey spiritual tranquility in 'Kabir and Raidas'?",
           "An austere, subdued monochromatic palette of earthy browns, beiges, ochres, and muted greys",
           ["Bright neon colors and multi-colored glitters", "Dazzling layers of solid burnished gold leaf", "Solid black ink with no contrast"],
           "The muted, earthy palette reflects the saints' ascetic simplicity, inner peace, and detachment from worldly luxury."),
    case_q("The Mughal School of Miniature Painting", "Dignity of Labor Philosophical Message",
     "What profound social and ethical message is visually conveyed by depicting Kabir working at the loom during discourse?",
     "That true spiritual realization is seamlessly united with honest manual labor, not worldly renunciation",
     ["That weaving is the only road to political power", "That saints must not speak to weavers", "That machines are superior to human hands"],
     "The painting sanctifies daily labor: showing that highest divine wisdom is fully realized through humble, honest manual work.")
]

# ==============================================================================
# MOCK 4 PASSAGES
# ==============================================================================
P1_M4_TXT = (
    "Read the following excerpt on the Bundi equestrian masterpiece 'Raja Aniruddha Singh Hara' and answer the questions that follow:\n\n"
    "Painted between 1680 and 1700 A.D. by master artist Utkal Ram, 'Raja Aniruddha Singh Hara' is one of the most celebrated equestrian "
    "portraits in the history of Rajput art. The painting depicts the young Hada Rajput ruler of Bundi mounted on a magnificent, spirited "
    "white stallion galloping vigorously in mid-air. Utkal Ram achieves breathtaking dynamic contrast: while the powerful warhorse surges "
    "forward with coiled muscular energy, raised forelegs, and a flowing decorative tail, the young king sits with serene royal poise, "
    "dressed in immaculate white robes. In his right hand, rather than holding a sword or battle spear, Aniruddha Singh holds a delicate, "
    "fragile flower, epitomizing the aristocratic Rajput ideal of martial valour blended with poetic grace. The entire dynamic equestrian group "
    "is silhouetted against a plain, deep brownish-ochre monochromatic background, focusing total optical attention on the rider and steed, "
    "preserved in the permanent collection of the National Museum, New Delhi."
)
P1_M4_QS = [
    case_q("The Rajasthani School of Miniature Painting", "Aniruddha Singh Hara Master Painter",
           "Which master artist painted the celebrated Bundi portrait 'Raja Aniruddha Singh Hara'?",
           "Utkal Ram",
           ["Sahibdin", "Nihal Chand", "Dana"],
           "The equestrian masterpiece was executed by painter Utkal Ram in the Bundi court atelier."),
    case_q("The Rajasthani School of Miniature Painting", "Object in the King's Hand",
           "What delicate object is Raja Aniruddha Singh Hara holding gracefully in his right hand while galloping?",
           "A small, delicate flower",
           ["A curved steel talwar (sword)", "A hunting hawk", "A golden wine cup"],
           "In poetic contrast to the fierce galloping horse, the king gently holds a delicate flower, symbolizing refined sensitivity."),
    case_q("The Rajasthani School of Miniature Painting", "Color and Posture of the Steed",
           "What is the appearance of the royal horse in Utkal Ram's composition?",
           "A magnificent white stallion galloping in mid-air with raised forelegs and coiled energy",
           ["A black mare grazing calmly beside a pond", "A brown camel walking across sand", "An armored war elephant charging forward"],
           "The horse is a majestic white charger depicted rearing forward in mid-gallop with coiled kinetic power."),
    case_q("The Rajasthani School of Miniature Painting", "Monochromatic Background Function",
           "Why did Utkal Ram choose a plain, deep monochromatic background for this portrait?",
           "To eliminate visual distractions and focus dramatic attention entirely on the horse and royal rider",
           ["Because he ran out of green and blue pigments", "Because Bundi was covered in smoke", "Because the king ordered him to paint in 5 minutes"],
           "The flat, dark monochromatic ground dramatizes the silhouette of the white steed and the white-clad ruler."),
    case_q("The Rajasthani School of Miniature Painting", "Geographical Region of Bundi",
           "Bundi, along with its sister state Kotah, forms which historic cultural and geographic region of Rajasthan?",
           "Hadoti (territory of the Hada Rajputs)",
           ["Marwar", "Mewar", "Shekhawati"],
           "Bundi and Kotah belong to the Hadoti region, ruled by the martial and culturally refined Hada clan of Rajputs.")
]

P2_M4_TXT = (
    "Read the following excerpt on 'Chand Bibi Playing Polo' and answer the questions that follow:\n\n"
    "Dating to around 1750 A.D., the dynamic Deccani miniature 'Chand Bibi Playing Polo (Chaugan)' was created in the opulent court atelier "
    "of Golconda. The painting immortalizes Queen Chand Sultana (Chand Bibi), the legendary warrior-queen regent of Bijapur and Ahmednagar "
    "who famously led the defense of Ahmednagar Fort against Mughal armies in the 16th century. In this exuberant equestrian painting, "
    "Chand Bibi and three other noble court women are depicted mounted on galloping steeds playing polo on a wide, sloping green turf. "
    "Mounted on an energetic white stallion, Chand Bibi guides the reins with royal poise while swinging her curved polo mallet to strike "
    "the ball. The composition is charged with kinetic rhythm, showing horses of contrasting colors (white, chestnut, grey) converging "
    "dynamically. In the background, a high curved horizon reveals a distant white fortress, a tranquil lotus pond with swimming waterbirds, "
    "and an umpire standing at the boundary, currently conserved in the National Museum, New Delhi."
)
P2_M4_QS = [
    case_q("The Deccani School of Miniature Painting", "Chand Bibi Playing Polo Sub-School",
           "Which Deccani artistic center produced the iconic painting 'Chand Bibi Playing Polo (Chaugan)'?",
           "Golconda",
           ["Ahmednagar", "Bijapur", "Hyderabad"],
           "The equestrian miniature Chand Bibi Playing Polo was executed in the Golconda atelier c. 1750 A.D."),
    case_q("The Deccani School of Miniature Painting", "Historical Renown of Chand Bibi",
           "Who was Chand Bibi in medieval Indian history?",
           "The heroic queen regent who valiantly defended Ahmednagar against Akbar's Mughal forces",
           ["A Mughal princess imprisoned in Agra Fort", "A Persian poetess who never visited India", "A European queen in Goa"],
           "Chand Bibi was the celebrated Deccani queen regent renowned for her military courage, diplomacy, and athletic mastery."),
    case_q("The Deccani School of Miniature Painting", "Equestrian Action Depicted",
           "What royal sport are the four noble women actively engaged in playing on horseback?",
           "Chaugan (the traditional royal equestrian predecessor of modern polo)",
           ["Horse archery at wooden targets", "A cavalry sword duel", "A horse racing contest across hurdles"],
           "The ladies are playing Chaugan (polo), swinging curved mallets to strike the ball on the galloping turf."),
    case_q("The Deccani School of Miniature Painting", "Color of Chand Bibi's Mount",
           "What is the color of the horse ridden by Chand Bibi in the painting?",
           "A spirited white horse adorned with decorative royal trappings",
           ["A jet-black war mare", "A spotted leopard-pattern pony", "A golden-painted camel"],
           "Chand Bibi rides a majestic white stallion, guiding the reins with royal composure amidst the fast-paced game."),
    case_q("The Deccani School of Miniature Painting", "Background Landscape Features",
           "What landscape elements are visible along the upper horizon of the polo field?",
           "A curved green horizon with a distant fortress, a lotus pond with aquatic birds, and an umpire",
           ["An erupting volcano with red lava", "An ocean harbor with sailing ships", "A dense industrial city with smokestacks"],
           "The field rises to a high horizon featuring an architectural fort, a lotus pond with swimming birds, and an umpire.")
]

# ==============================================================================
# MOCK 5 PASSAGES
# ==============================================================================
P1_M5_TXT = (
    "Read the following excerpt on the Jodhpur school painting 'Chaugan Players' by Dana and answer the questions that follow:\n\n"
    "Painted around 1800 A.D. by master artist Dana, 'Chaugan Players' is an energetic, celebrated miniature from the Jodhpur (Marwar) "
    "school of Rajasthani painting. The painting portrays noble women actively engaged in the royal equestrian sport of polo (Chaugan). "
    "The composition is brilliantly balanced: two royal princesses mounted on dark brown and white horses face each other in the center of the "
    "polo ground, while four female attendants on spirited galloping steeds flank them from the sides, waving their sticks to control the ball. "
    "The horses are rendered with sweeping, exaggerated curves, high arched necks, and animated tails, galloping over a wide, sweeping pale "
    "green field. The noblewomen wear vibrant Rajput peshwaj (court robes), turbans, and fluttering transparent veils (odhanis) that trail "
    "in the rushing wind, creating a magnificent spectacle of feminine athletic vigor, conserved in the National Museum, New Delhi."
)
P1_M5_QS = [
    case_q("The Rajasthani School of Miniature Painting", "Chaugan Players Master Artist",
           "Who painted the dynamic Jodhpur equestrian scene 'Chaugan Players' around 1800 A.D.?",
           "Dana",
           ["Sahibdin", "Nuruddin", "Utkal Ram"],
           "Chaugan Players was executed by master artist Dana of the Jodhpur (Marwar) court atelier."),
    case_q("The Rajasthani School of Miniature Painting", "Number of Mounted Players",
           "How many female riders are depicted participating in the polo match in Dana's composition?",
           "Six female players (two central princesses and four flanking attendants)",
           ["Two players only", "Twelve players in two military teams", "Four players with fifty spectators"],
           "Dana composed the scene with six noble women mounted on galloping steeds converging on the ball."),
    case_q("The Rajasthani School of Miniature Painting", "Costumes of the Polo Players",
           "What traditional royal court garments are worn by the noblewomen in 'Chaugan Players'?",
           "Rajput peshwaj (flowing court robes), tight pajamas, turbans, and fluttering transparent odhanis",
           ["Modern European equestrian jackets and boots", "Traditional white temple sarees", "Heavy iron coats of mail"],
           "The noble riders wear vibrant Rajput hunting robes (peshwaj), turbans, and sheer veils trailing in the wind."),
    case_q("The Rajasthani School of Miniature Painting", "Polo Field Color Treatment",
           "How is the polo turf represented across the vast background in 'Chaugan Players'?",
           "As a flat, sweeping expanse of light green field rising toward a gentle horizon",
           ["A paved stone mosaic courtyard with fountains", "A dry yellow sand desert without grass", "A dark blue riverbed"],
           "The polo ground is rendered as a wide expanse of pale green that accentuates the spirited silhouettes of horses and riders."),
    case_q("The Rajasthani School of Miniature Painting", "National Conservation Repository",
           "Dana's original masterpiece 'Chaugan Players' is permanently preserved in the:",
           "National Museum, New Delhi",
           ["Mehrangarh Fort Museum, Jodhpur", "City Palace Museum, Jaipur", "Indian Museum, Kolkata"],
           "The original Jodhpur painting Chaugan Players is conserved in the National Museum, New Delhi.")
]

P2_M5_TXT = (
    "Read the following excerpt on 'Marriage Procession of Dara Shikoh' and answer the questions that follow:\n\n"
    "Painted around 1740–1750 A.D. by master artist Haji Madani, 'Marriage Procession of Dara Shikoh' is a spectacular retrospective "
    "masterpiece of the provincial/late Mughal school. The painting immortalizes the legendary royal wedding of Emperor Shah Jahan's "
    "eldest son, Prince Dara Shikoh, to Nadira Banu Begum in 1633 A.D.—an event celebrated as the most magnificent wedding in Mughal history. "
    "Haji Madani orchestrates an extraordinary panoramic nocturnal cavalcade: Dara Shikoh is mounted on a spirited brown steed, his face "
    "veiled by a dazzling bridal sehra composed of cascading strings of pearls and jewels. Riding immediately behind him on a white horse is "
    "his father, Emperor Shah Jahan, crowned by a radiant golden nimbus. The procession is packed with caparisoned elephants carrying royal "
    "guests in howdahs, musicians playing kettle-drums (naqqara) and trumpets, dancing girls, and commoners, while the nocturnal sky explodes "
    "with sparkling fireworks (aatishbazi), conserved in the National Museum, New Delhi."
)
P2_M5_QS = [
    case_q("The Mughal School of Miniature Painting", "Marriage Procession Master Artist",
           "Who painted the panoramic nocturnal masterpiece 'Marriage Procession of Dara Shikoh'?",
           "Haji Madani",
           ["Ustad Faquirullah Khan", "Miskin", "Ustad Mansur"],
           "The painting was created by late Mughal master artist Haji Madani around 1740–1750 A.D."),
    case_q("The Mughal School of Miniature Painting", "The Groom's Pearl Veil",
           "What traditional bridal adornment covers the face of Prince Dara Shikoh in the painting?",
           "A luxurious bridal Sehra made of cascading strings of natural pearls and gems",
           ["A solid iron knight's helmet", "A white silk handkerchief with eyeholes", "A floral garland of red roses only"],
           "Dara Shikoh wears an opulent bridal sehra composed of strings of pearls cascading down from his turban."),
    case_q("The Mughal School of Miniature Painting", "Identification of Shah Jahan",
           "How is Emperor Shah Jahan identified in the midst of the crowded wedding cavalcade?",
           "Riding just behind Dara Shikoh on a white horse, distinguished by a radiant golden halo",
           ["Sitting inside an iron carriage in the corner", "Walking on foot disguised as a common peasant", "Sitting in a tree with a telescope"],
           "Shah Jahan rides behind his son on a white horse, distinguished by his royal golden nimbus and majestic white beard."),
    case_q("The Mughal School of Miniature Painting", "Nocturnal Sky Illumination",
           "What visual spectacle illuminates the dark night sky in Haji Madani's composition?",
           "Dazzling fireworks (aatishbazi), starbursts, rockets, and smoking sparklers",
           ["A quiet daytime rainbow across clouds", "Falling snowflakes during a winter storm", "A total solar eclipse with no light"],
     "The night sky explodes with festive Mughal pyrotechnics (aatishbazi), lighting the darkness with showers of golden sparks."),
    case_q("The Mughal School of Miniature Painting", "Historical Status of the Painting",
     "Why did 18th-century artists like Haji Madani paint historical scenes from Shah Jahan's 17th-century reign?",
     "To celebrate the peak cultural magnificence, tolerance, and romance of the Mughal golden age with nostalgic pride",
     ["Because they were legally forbidden from painting living people", "Because they had no modern paper to paint on", "Because they wanted to cause wars"],
     "In the turbulent 18th century, court artists looked back to the golden age of Shah Jahan as an ideal of harmony, romance, and imperial glory.")
]

# ==============================================================================
# MOCK 6 PASSAGES
# ==============================================================================
P1_M6_TXT = (
    "Read the following excerpt on the Kangra masterpiece 'Nand, Yashoda and Krishna with Kinsmen going to Vrindavana' and answer the questions that follow:\n\n"
    "Painted between 1785 and 1790 A.D. by master artist Nainsukh (or master painters of the Seu-Nainsukh family atelier), 'Nand, Yashoda "
    "and Krishna with Kinsmen going to Vrindavana' is universally regarded as one of the supreme crowning achievements of the Kangra school. "
    "Illustrating an episode from the Tenth Canto of the Bhagavata Purana, the painting portrays the pastoral migration of the cowherd "
    "community of Gokul across the sacred river Yamuna to seek safety and greener pastures in the idyllic groves of Vrindavana, escaping the "
    "demons sent by tyrant King Kamsa. The monumental folio is a breathtaking triumph of lyrical naturalism: covered bullock carts carry "
    "household possessions, women, and infants, while cowherd youths herd cattle through the shallow river waters. Young Krishna stands "
    "excitedly inside a bullock cart beside mother Yashoda and brother Balarama, turning to point towards their new home near Mount Govardhana, "
    "conserved in the National Museum, New Delhi."
)
P1_M6_QS = [
    case_q("The Pahari School of Miniature Painting", "Going to Vrindavana Master Painter",
           "Which master painter (or family atelier) created the Kangra masterpiece 'Going to Vrindavana'?",
           "Nainsukh (and the master artists of the Seu-Nainsukh family atelier)",
           ["Sahibdin", "Nihal Chand", "Dana"],
           "The masterpiece was executed by Nainsukh or his immediate family atelier in the Kangra court c. 1785–1790 A.D."),
    case_q("The Pahari School of Miniature Painting", "Reason for Pastoral Migration",
           "Why are Nanda, Yashoda, and the cowherd kinsmen migrating from Gokul to Vrindavana?",
           "To escape the constant attacks of demons sent by King Kamsa and find safer, greener pastures",
           ["Because their houses were destroyed by fire", "To attend a royal military festival in Mathura", "Because they were expelled by a flood"],
           "The elders decided to relocate to Vrindavana's lush groves to protect young Krishna from Kamsa's demonic assaults."),
    case_q("The Pahari School of Miniature Painting", "River Depicted in the Crossing",
           "Which sacred river is crossed by the pastoral caravan of carts, villagers, and cattle?",
           "River Yamuna",
           ["River Ganga", "River Saraswati", "River Narmada"],
           "The caravan of bullock carts and swimming cattle crosses the gentle waters of the sacred River Yamuna."),
    case_q("The Pahari School of Miniature Painting", "Krishna's Action in the Cart",
           "What is young Krishna depicted doing inside the bullock cart?",
           "Standing beside mother Yashoda and Balarama, turning back eagerly to point towards Vrindavana",
           ["Sleeping peacefully under a cotton quilt", "Driving the bullocks himself with a whip", "Swimming underwater in the river"],
           "Young Krishna stands in the cart, excitedly pointing forward to Mount Govardhana and their new forest home."),
    case_q("The Pahari School of Miniature Painting", "Royal Golden Patron of Kangra",
           "Under the royal patronage of which famous Kangra ruler did this lyrical, pastoral art reach its highest zenith?",
           "Maharaja Sansar Chand",
           ["Raja Kirpal Pal", "Raja Govardhan Chand", "Raja Man Singh"],
           "Maharaja Sansar Chand of Kangra (1775–1823) was the munificent Vaishnava patron whose court studio produced this masterpiece.")
]

P2_M6_TXT = (
    "Read the following excerpt on 'Hazrat Nizamuddin Auliya and Amir Khusro' and answer the questions that follow:\n\n"
    "Painted around 1750–1770 A.D. during the Asaf Jahi era, 'Hazrat Nizamuddin Auliya and Amir Khusro' is a serene, spiritually luminous "
    "masterpiece of the Hyderabad sub-school of Deccani painting. The miniature pays retrospective homage to the immortal 13th–14th century "
    "spiritual bond between the supreme Chishti Sufi saint Hazrat Nizamuddin Auliya and his beloved disciple, the legendary poet-musician "
    "Amir Khusro. Set on an immaculate, spotless white courtyard terrace enclosed by a low red wooden balustrade, the venerable saint sits "
    "dignified in a green robe, his serene bearded countenance framed by a radiant golden nimbus. Seated reverently before him on his knees, "
    "young Amir Khusro plucks a slender stringed musical instrument (tanpura/dambura), singing his divine verses of mystical love. "
    "In the background, lush flowering mango trees laden with blossoms and resting birds stand against a calm blue sky, evoking a sacred "
    "sanctuary of divine music, contemplation, and unconditional love, conserved in the National Museum, New Delhi."
)
P2_M6_QS = [
    case_q("The Deccani School of Miniature Painting", "Hyderabad Painting Sub-School",
           "Which Deccani sub-school produced the spiritual miniature 'Hazrat Nizamuddin Auliya and Amir Khusro'?",
           "Hyderabad (Asaf Jahi dynasty)",
           ["Ahmednagar", "Bijapur", "Golconda"],
           "The painting was created in Hyderabad during the 18th century under the Asaf Jahi dynasty."),
    case_q("The Deccani School of Miniature Painting", "Sufi Order of Hazrat Nizamuddin",
           "To which prominent Sufi order (silsila) did Hazrat Nizamuddin Auliya belong?",
           "Chishti Order (Chishti Silsila)",
           ["Suhrawardi Order", "Qadiri Order", "Naqshbandi Order"],
           "Hazrat Nizamuddin Auliya was the premier 14th-century master of the Chishti order, preaching universal love and musical devotion (Sama)."),
    case_q("The Deccani School of Miniature Painting", "Amir Khusro's Musical Act",
           "What is poet-disciple Amir Khusro depicted doing in the presence of his spiritual master?",
           "Kneeling reverently and playing a stringed musical instrument to accompany songs of divine love",
           ["Writing a legal petition with an iron pen", "Serving food to visiting royal soldiers", "Sleeping on a wooden bench"],
           "Khusro kneels with deep reverence, plucking a stringed instrument and singing verses of divine love to his master."),
    case_q("The Deccani School of Miniature Painting", "The Golden Nimbus (Halo) Meaning",
           "Why is Hazrat Nizamuddin Auliya portrayed with a radiant golden halo around his head?",
           "To symbolize his exalted spiritual status as an enlightened saint (Wali Allah) and friend of God",
           ["To indicate that he was a ruling monarch with an army", "Because the painter made an accidental yellow smudge", "To show the reflection of an electric light"],
           "The golden halo symbolizes spiritual enlightenment, divine light, and the saint's exalted status in Islamic mysticism."),
    case_q("The Deccani School of Miniature Painting", "National Conservation Repository",
           "The revered Deccani miniature 'Hazrat Nizamuddin Auliya and Amir Khusro' is permanently conserved in the:",
           "National Museum, New Delhi",
           ["Salar Jung Museum, Hyderabad", "Indian Museum, Kolkata", "Victoria and Albert Museum, London"],
           "This sacred Deccani masterpiece is proudly conserved in the National Museum, New Delhi.")
]

# ==============================================================================
# MOCK 7 PASSAGES
# ==============================================================================
P1_M7_TXT = (
    "Read the following excerpt on the traditional materials and techniques of Indian miniature painting and answer the questions:\n\n"
    "The creation of traditional Indian miniature paintings across Rajasthani, Pahari, Mughal, and Deccani studios was an extraordinarily "
    "disciplined, multi-stage artisanal craft. Miniature painters worked on 'Wasli'—a specialized support engineered by laminating multiple "
    "sheets of handmade paper together with cooked starch glue mixed with copper sulphate (nila thotha) to deter insects, which was then "
    "burnished smooth using an agate stone (aqiq/ghonta). The artist executed the preliminary sketch (tarh) in light red or sepia ink "
    "using fine brushes (kalam) made from hairs plucked from the tails of squirrels mounted into bird quills. Pigments were sourced "
    "exclusively from nature: lapis lazuli for ultramarine blue, cinnabar (hinglu) for brilliant scarlet, orpiment (hartal) for lemon yellow, "
    "malachite for green, and lampblack soot (kajal) for deep black, all ground by hand and bound with water-soluble Gum Arabic (babool gond). "
    "Delicate three-dimensional volume was built using fine feather-like shading strokes known as 'Pardaz', and pure gold leaf (vark/hilkari) "
    "was applied to royal garments and burnished to an enamel-like metallic luster."
)
P1_M7_QS = [
    case_q("The Rajasthani School of Miniature Painting", "Wasli Paper Preparation",
           "What was 'Wasli' in the context of traditional Indian miniature painting?",
           "A multi-layered sheet of handmade paper glued together with starch paste and burnished smooth",
           ["A canvas woven from pure sheep wool", "A sheet of beaten animal parchment", "A wooden panel coated with white gesso"],
           "Wasli was handmade paper crafted by laminating several paper sheets together with starch glue and burnishing with agate."),
    case_q("The Rajasthani School of Miniature Painting", "Kalam Squirrel Hair Brushes",
           "From which animal were the finest hairs extracted to fashion the fine miniature detailing brushes (kalam)?",
           "Tails of squirrels",
           ["Manes of horses", "Whiskers of tigers", "Feathers of peacocks"],
           "Squirrel tail hairs mounted into pigeon or eagle quills provided the supple, resilient point required for microscopic line work."),
    case_q("The Rajasthani School of Miniature Painting", "Cinnabar (Hinglu) Pigment Color",
           "Which vibrant natural mineral pigment was ground to produce the deep, brilliant scarlet red in miniatures?",
           "Cinnabar (Hinglu / mercuric sulfide)",
           ["Lapis lazuli", "Orpiment (Hartal)", "Malachite"],
           "Cinnabar (natural mercuric sulfide, known locally as Hinglu) yielded the radiant, permanent vermilion red of Indian miniatures."),
    case_q("The Rajasthani School of Miniature Painting", "Agate Stone Burnishing Purpose",
           "Why did artists rub an agate burnisher (ghonta) vigorously on the finished miniature?",
           "To compact pigment particles into the paper fibers and produce a radiant, glowing enamel sheen",
           ["To erase mistakes in the drawing", "To scrape away gold leaf", "To tear the paper into small pieces"],
           "Burnishing with an agate stone compacts the mineral layers, creating an unblemished, luminous, and durable enamel-like sheen."),
    case_q("The Rajasthani School of Miniature Painting", "Pardaz Shading Technique",
           "What was the delicate miniature technique of building volume through fine strokes and stippling called?",
           "Pardaz (Khat-Pardaz and Gudad-Pardaz)",
           ["Impasto", "Fresco Buono", "Sfumato"],
           "Pardaz was the traditional Indian shading method using microscopic brush hatching or stippling to achieve lifelike modeling.")
]

P2_M7_TXT = (
    "Read the following excerpt on the Ahmednagar masterpiece 'Raga Hindola' and answer the questions that follow:\n\n"
    "Painted in Ahmednagar around 1590–1595 A.D. during the reign of Sultan Murtaza Nizam Shah, 'Raga Hindola' is an early jewel of the "
    "Deccani school of miniature painting. Belonging to a celebrated Ragamala suite, the painting personifies the classical Indian musical "
    "mode of Hindola (associated with the playful, romantic swing festival of spring). A handsome young prince, clad in an elegant pointed "
    "Deccani jama with a long sash (patka), sits serenely upon an ornate golden swing (hindola) suspended from a blossoming tree. "
    "He is attended by four graceful female companions: two maidens gently push the swing ropes, while two others play musical instruments "
    "(vina and cymbals) and fan the prince. The female figures exhibit the distinctive southern Deccani aesthetic: tall, voluptuous silhouettes, "
    "tight cholis, and hair tied in large circular chignons at the nape of the neck. The background radiates with a warm, glowing yellow "
    "ground topped by a narrow strip of deep blue sky animated by swirling golden flame-like clouds, conserved in the National Museum, New Delhi."
)
P2_M7_QS = [
    case_q("The Deccani School of Miniature Painting", "Raga Hindola Sub-School",
           "Which Deccani sultanate atelier produced the lyrical Ragamala masterpiece 'Raga Hindola'?",
           "Ahmednagar",
           ["Bijapur", "Golconda", "Hyderabad"],
           "Raga Hindola was painted in the Ahmednagar sultanate around 1590–1595 A.D."),
    case_q("The Deccani School of Miniature Painting", "The Central Object of Personification",
           "What central object forms the visual focal point of the melody personified in 'Raga Hindola'?",
           "An ornate golden swing (hindola) suspended from a blossoming tree",
           ["A war chariot drawn by eight horses", "A golden throne inside an iron fortress", "A marble fountain filled with fish"],
           "Raga Hindola personifies the swing melody, depicting the prince on a golden swing attended by maidens in spring."),
    case_q("The Deccani School of Miniature Painting", "Deccani Female Figure Style",
           "How are the female attendants characterized in this early Ahmednagar miniature?",
           "Tall, elongated slender waists, tight cholis, transparent odhanis, and hair tied in large chignons at the neck",
           ["Short, heavy physiques with woolen coats", "Strictly European Victorian dresses", "Faceless geometric silhouettes"],
           "Ahmednagar female figures combine South Indian voluptuousness with Persian grace: slender waists and large coiled buns."),
    case_q("The Deccani School of Miniature Painting", "Musical Season Associated with Hindola",
           "In Indian classical musicology, during which season is 'Raga Hindola' traditionally sung?",
           "Spring (Vasanta), celebrating youthful romance and the swing festival",
           ["Mid-winter during funeral rites", "Scorching midsummer to evoke drought", "Autumn during harvest feasts only"],
           "Raga Hindola is an auspicious spring melody celebrating love (Shringara) and the joyous festival of swings."),
    case_q("The Deccani School of Miniature Painting", "National Conservation Repository",
           "The original 16th-century Deccani miniature 'Raga Hindola' is permanently preserved in the:",
           "National Museum, New Delhi",
           ["Salar Jung Museum, Hyderabad", "Indian Museum, Kolkata", "Victoria and Albert Museum, London"],
           "Raga Hindola is preserved as a premier Deccani treasure in the National Museum, New Delhi.")
]

# ==============================================================================
# MOCK 8 PASSAGES
# ==============================================================================
P1_M8_TXT = (
    "Read the following excerpt on 'Bharat Meets Rama at Chitrakuta' by Guman and answer the questions that follow:\n\n"
    "Painted in the mid-to-late 18th century by master artist Guman, 'Bharat Meets Rama at Chitrakuta' is a monumental narrative "
    "masterpiece of the Jaipur school of Rajasthani painting. Based on the Ayodhya Kanda of the Ramayana, the painting depicts the emotional "
    "reconciliation between Lord Rama and his younger brother Bharata in the sacred forest hermitage of Chitrakuta. Guman employs the classical "
    "technique of 'continuous narration': multiple consecutive episodes of the narrative are depicted simultaneously across different "
    "clearings within a single unified landscape. The viewer follows the royal entourage arriving with sage Vasishtha, Bharata falling in "
    "grief at Rama's feet, Rama tenderly lifting his brother in tears, the grief of the three widowed queen mothers, and the solemn council "
    "under the forest canopy. The entire forest is painted with botanical richness—flowering trees, winding streams, and rolling green hillocks—"
    "reflecting the refined panoramic mastery of the Jaipur Suratkhana, conserved in the National Museum, New Delhi."
)
P1_M8_QS = [
    case_q("The Rajasthani School of Miniature Painting", "Chitrakuta Master Artist",
           "Who painted the epic Jaipur Ramayana narrative 'Bharat Meets Rama at Chitrakuta'?",
           "Guman",
           ["Sahibdin", "Nihal Chand", "Dana"],
           "Bharat Meets Rama at Chitrakuta was painted by master artist Guman of the Jaipur school in the 18th century."),
    case_q("The Rajasthani School of Miniature Painting", "Continuous Narration Technique",
           "What compositional method did Guman employ to tell the story across a single page?",
           "Continuous Narration (depicting multiple chronological episodes simultaneously across the landscape)",
           ["Single snapshot showing only two people", "A grid of comic squares with printed words", "Abstract geometric cubism"],
           "Continuous narration shows consecutive moments of the meeting happening in different clearings of the same forest."),
    case_q("The Rajasthani School of Miniature Painting", "Emotional Climax of the Brothers",
           "What intense emotional encounter is depicted in the primary clearing of the painting?",
           "Bharata falling to the ground in grief, and Rama compassionately rushing forward to raise and embrace his brother",
           ["The two brothers dueling with swords", "A coronation ceremony with a golden crown", "A feast with dancing courtiers"],
           "The painting captures the poignant moment when Bharata faints at Rama's feet and Rama tenderly lifts his younger brother."),
    case_q("The Rajasthani School of Miniature Painting", "Forest Setting of Reconciliation",
           "In which sacred forest hermitage did this emotional meeting take place according to the Ramayana?",
           "Chitrakuta",
           ["Dandakaranya", "Panchavati", "Kishkindha"],
           "The meeting took place in the idyllic hermitage forest of Chitrakuta during Rama's fourteen-year exile."),
    case_q("The Rajasthani School of Miniature Painting", "Jaipur Royal Atelier Name",
           "What was the royal department of painting in Jaipur called where masters like Guman and Sahib Ram worked?",
           "Suratkhana",
           ["Tasvir Khana", "Karkhana", "Chitrashala"],
           "The royal painting atelier and manuscript repository of the Jaipur court was designated as the Suratkhana.")
]

P2_M8_TXT = (
    "Read the following excerpt on 'Krishna on Swing' by Nuruddin and answer the questions that follow:\n\n"
    "Executed in 1683 A.D. by master painter Nuruddin, 'Krishna on Swing' is an acknowledged masterpiece of the Bikaner school of Rajasthani "
    "painting. Commissioned during the golden age of Bikaner under Maharaja Anup Singh, the miniature illustrates a verse from Keshavdas's "
    "famous Brajbhasha poetic treatise, the Rasikapriya. The composition is divided horizontally into two narrative registers: the upper "
    "register shows Lord Krishna seated comfortably on an ornate swing suspended from a flowering tree, gazing across at Radha who is seated "
    "under a canopy with her confidante (sakhi). In the lower register, the scene shifts to Radha seated alone in an arbor with her friend, "
    "pining in sweet romantic estrangement (Maan) and longing for reunion. Nuruddin, a member of the famous hereditary Usta artist family of "
    "Bikaner, exhibits exquisite technical refinement: delicate, soft pastel colors, finely stippled Pardaz modeling on faces, and slender, "
    "feathered trees blending Mughal court sophistication with Rajput lyrical devotion, conserved in the National Museum, New Delhi."
)
P2_M8_QS = [
    case_q("The Rajasthani School of Miniature Painting", "Krishna on Swing Master Artist",
           "Who painted the celebrated Bikaner miniature 'Krishna on Swing' in 1683 A.D.?",
           "Nuruddin",
           ["Sahibdin", "Guman", "Dana"],
           "Krishna on Swing was executed by master painter Nuruddin of the Bikaner school in 1683 A.D."),
    case_q("The Rajasthani School of Miniature Painting", "Two-Tiered Compositional Design",
           "How is the narrative organized in Nuruddin's 'Krishna on Swing'?",
           "Divided into two distinct horizontal registers depicting Krishna on a swing and Radha pining below",
           ["As a single vertical column with no background", "In four circular mandalas representing seasons", "As a continuous frieze of horses"],
           "The composition is divided into two panels: the upper showing Krishna on a swing, and the lower showing Radha pining with her confidante."),
    case_q("The Rajasthani School of Miniature Painting", "Literary Foundation Text",
           "Which classical Brajbhasha romantic treatise by court poet Keshavdas inspired this painting?",
           "Rasikapriya",
           ["Geet Govinda", "Bihari Satsai", "Sur Sagar"],
           "The painting illustrates a verse from Keshavdas's Rasikapriya exploring the psychological nuances of lovers' estrangement (Maan)."),
    case_q("The Rajasthani School of Miniature Painting", "Royal Bikaner Patron",
           "Which scholar-king of Bikaner patronized Nuruddin during this peak artistic era?",
           "Maharaja Anup Singh",
           ["Raja Rai Singh", "Maharaja Ganga Singh", "Rao Bika"],
           "Maharaja Anup Singh (1669–1698) was the visionary scholar-patron who built the grand Bikaner royal collection and atelier."),
    case_q("The Rajasthani School of Miniature Painting", "Hereditary Artist Community",
           "Nuruddin and his fellow Bikaner court artists belonged to which renowned hereditary artisan family?",
           "The Usta family (renowned for miniature painting and Usta Kala gold relief)",
           ["The Tarkhan carpenter guild of Kangra", "The Patua scroll makers of Bengal", "The Chitrashala guild of Bundi"],
           "Nuruddin belonged to the famed Usta master family of Bikaner, celebrated for delicate miniature painting and Usta Kala gold lacquer work.")
]

# ==============================================================================
# MOCK 9 PASSAGES
# ==============================================================================
P1_M9_TXT = (
    "Read the following excerpt on the historical evolution of the Indian National Flag and answer the questions:\n\n"
    "The journey of the Indian National Flag mirrors the historic struggle of the Indian people for freedom and sovereign unity. "
    "The first unofficial tricolour flag was hoisted on August 7, 1906, at Parsee Bagan Square (Greer Park) in Calcutta during the anti-partition "
    "Swadeshi movement. Designed by Sachindra Prasad Bose and Sukumar Mitra, it comprised three equal horizontal bands of green, yellow, and red. "
    "The green band bore eight half-opened white lotuses representing the eight provinces; the yellow band was inscribed with 'Vande Mataram' "
    "in Devanagari script; and the red band bore a white sun and crescent moon. A second historic flag was unfurled by Madame Bhikaji Cama in "
    "Stuttgart, Germany, in 1907. In 1921, at the Vijayawada session of the AICC, Pingali Venkayya presented a design with red and green bands. "
    "Mahatma Gandhi suggested adding a white band for minority communities and a spinning wheel (Charkha) to symbolize self-reliance (Swaraj). "
    "Finally, on July 22, 1947, the Constituent Assembly formally adopted the Sovereign National Flag, replacing the Charkha with the 24-spoke "
    "Ashoka Chakra from the Sarnath Lion Capital."
)
P1_M9_QS = [
    case_q("The Evolution of the Indian National Flag", "First Unofficial Flag Hoisting (1906)",
           "Where was the first unofficial tricolour flag of India hoisted on August 7, 1906?",
           "Parsee Bagan Square (Greer Park), Calcutta",
           ["Red Fort, Delhi", "Gateway of India, Bombay", "Marina Beach, Madras"],
           "The first unofficial tricolour was hoisted on August 7, 1906, at Parsee Bagan Square in Calcutta during an anti-partition rally."),
    case_q("The Evolution of the Indian National Flag", "Eight Lotuses Meaning on 1906 Flag",
           "What did the eight half-opened lotuses on the green band of the 1906 flag represent?",
           "The eight provinces of British India",
           ["Eight sacred rivers", "Eight prominent political leaders", "Eight ancient Vedic gods"],
           "The eight lotuses on the top green stripe symbolized the eight major administrative provinces of British India."),
    case_q("The Evolution of the Indian National Flag", "Designer of the Swaraj Flag Model",
           "Who designed the basic tricolour flag model presented to Mahatma Gandhi at Vijayawada in 1921?",
           "Pingali Venkayya",
           ["Sachindra Prasad Bose", "Madame Bhikaji Cama", "Dr. B.R. Ambedkar"],
           "Pingali Venkayya of Andhra Pradesh designed the basic flag that served as the foundation of the National Flag."),
    case_q("The Evolution of the Indian National Flag", "Gandhi's Addition to the 1921 Flag",
           "What two elements did Mahatma Gandhi recommend adding to Pingali Venkayya's 1921 red-and-green flag?",
           "A white stripe for minority communities and a spinning Charkha for economic self-reliance",
           ["A golden lion and a sword", "A blue circle and twenty-four stars", "A sun and crescent moon"],
           "Gandhi added the white band to represent all other religious faiths and the Charkha to symbolize economic self-reliance (Swaraj)."),
    case_q("The Evolution of the Indian National Flag", "Date of Formal Constitutional Adoption",
           "On which historic date did the Constituent Assembly of India formally adopt the National Flag?",
           "July 22, 1947",
           ["August 15, 1947", "January 26, 1950", "November 26, 1949"],
           "The National Flag of sovereign independent India was unanimously adopted by the Constituent Assembly on July 22, 1947.")
]

P2_M9_TXT = (
    "Read the following excerpt on the statutory Flag Code, proportions, and symbolism of the National Flag and answer the questions:\n\n"
    "The National Flag of India is a horizontal tricolour of three equal rectangular panels: India Saffron (Kesari) at the top, White in the "
    "middle, and India Green at the bottom. The ratio of the width (height) to the length of the flag is strictly 2 : 3. In the center of "
    "the white band is the Ashoka Chakra, rendered in navy blue, containing 24 equally spaced spokes. As explained by Dr. S. Radhakrishnan "
    "in the Constituent Assembly, Saffron denotes renunciation, courage, and dedication to service; White denotes the path of light, truth, "
    "purity, and non-violence; and Green denotes our connection to the soil, plant life, and material prosperity upon which all life depends. "
    "The Ashoka Chakra, adapted from the 3rd-century B.C. Sarnath Lion Capital of Emperor Ashoka, represents the eternal Wheel of the Law "
    "(Dharma Chakra), dynamic motion, and the peaceful progress of the nation, while its 24 spokes symbolize round-the-clock advancement "
    "and foundational ethical virtues."
)
P2_M9_QS = [
    case_q("The Evolution of the Indian National Flag", "National Flag Ratio Proportions",
           "What is the statutory ratio of the width (height) to the length of the National Flag of India?",
           "2 : 3",
           ["1 : 2", "3 : 4", "1 : 1"],
           "The statutory proportion mandated by the Flag Code of India for width to length is 2 : 3."),
    case_q("The Evolution of the Indian National Flag", "Ashoka Chakra Color and Spokes",
           "What is the exact color and number of spokes in the Ashoka Chakra on the National Flag?",
           "Navy blue with 24 equally spaced spokes",
           ["Jet black with 12 spokes", "Emerald green with 24 spokes", "Royal purple with 36 spokes"],
           "The Ashoka Chakra is rendered in deep navy blue with 24 equally spaced spokes."),
    case_q("The Evolution of the Indian National Flag", "Architectural Source of the Chakra",
           "From which ancient monumental Indian sculpture was the 24-spoke Chakra adapted?",
           "The Sarnath Lion Capital of Emperor Ashoka (3rd century B.C.)",
           ["The Great Stupa of Sanchi gateway", "The Iron Pillar of Delhi", "The Shore Temple at Mamallapuram"],
           "The Chakra was adapted from the abacus of the Lion Capital of Ashoka at Sarnath, representing the Wheel of Law."),
    case_q("The Evolution of the Indian National Flag", "Symbolism of the Saffron Color",
           "According to Dr. S. Radhakrishnan, what does the top India Saffron (Kesari) band signify?",
           "Renunciation of personal ego, dedicated service, valor, and courage",
           ["Commercial wealth and gold mining", "The heat of the Thar desert", "Military conquest of neighboring lands"],
           "Dr. Radhakrishnan explained that saffron signifies renunciation of ego, courage, and dedication to selfless service."),
    case_q("The Evolution of the Indian National Flag", "Dynamic Meaning of the Wheel",
           "What philosophical concept is embodied by the Wheel (Chakra) in the center of the flag?",
           "Dynamic motion, eternal righteousness (Dharma), and continuous peaceful progress (motion is life, stagnation is death)",
           ["A ticking bomb counting down to war", "A railway train wheel measuring speed", "A coin for paying government taxes"],
           "The Chakra signifies that life is in dynamic, righteous motion and progress; stagnation represents decline and death.")
]

# ==============================================================================
# MOCK 10 PASSAGES
# ==============================================================================
P1_M10_TXT = (
    "Read the following excerpt on the Swadeshi art movement and the genesis of the Bengal School and answer the questions:\n\n"
    "The Bengal School of Painting emerged in the first decade of the 20th century as the powerful visual wing of the anti-partition "
    "Swadeshi movement. Led by Ernest Binfield (E.B.) Havell, the visionary Principal of the Government School of Art, Calcutta, and "
    "Abanindranath Tagore, who became Vice-Principal in 1905, the movement launched a radical aesthetic rebellion against Western academic "
    "realism. Havell took the controversial step of removing European plaster casts from the school and exhibiting Mughal, Rajput, and "
    "Ajanta masterpieces, urging Indian students to draw spiritual inspiration from their own civilizational heritage. Supported by Sister "
    "Nivedita, Ananda K. Coomaraswamy, and Japanese philosopher Kakuzo Okakura (who proclaimed 'Asia is One'), Abanindranath synthesized "
    "indigenous miniature traditions with Japanese wash techniques to create a poetic, dream-like national visual language that restored "
    "cultural pride and laid the foundation for modern Indian art."
)
P1_M10_QS = [
    case_q("The Bengal School of Painting", "British Reformer of Art Education",
           "Which British Principal of the Government School of Art, Calcutta, spearheaded the Indian art revival with Abanindranath?",
           "E.B. Havell",
           ["Lord Curzon", "John Ruskin", "Percy Brown"],
           "E.B. Havell was the visionary Principal who reformed the Calcutta Art School curriculum to restore Indian indigenous art ideals."),
    case_q("The Bengal School of Painting", "Anti-Colonial Ideological Context",
           "In direct synchronization with which anti-colonial political movement did the Bengal School emerge in 1905?",
           "The Swadeshi Movement protesting the Partition of Bengal",
           ["The Non-Cooperation Movement of 1920", "The Quit India Movement of 1942", "The 1857 Revolt"],
           "The Bengal School was the visual embodiment of the 1905 Swadeshi movement, asserting cultural nationalism through art."),
    case_q("The Bengal School of Painting", "Father of Modern Indian Painting",
           "Who is universally celebrated in Indian art history as the 'Father of Modern Indian Painting'?",
           "Abanindranath Tagore",
           ["Raja Ravi Varma", "Nandalal Bose", "Jamini Roy"],
           "Abanindranath Tagore is revered as the Father of Modern Indian Painting for pioneering an autonomous national aesthetic."),
    case_q("The Bengal School of Painting", "Pan-Asian Philosophy Proclamation",
           "Which Japanese philosopher resided with the Tagores and authored 'The Ideals of the East' proclaiming 'Asia is One'?",
           "Count Kakuzo Okakura",
           ["Yokoyama Taikan", "Hishida Shunso", "Tenshin Okakura"],
           "Kakuzo Okakura stayed at Jorasanko, declaring 'Asia is One' and advocating an Asian cultural brotherhood against Western dominance."),
    case_q("The Bengal School of Painting", "Rejection of Colonial Academic Realism",
           "What specific Western artistic conventions did Bengal School painters consciously reject?",
           "Harsh photographic realism, oil paint impasto, scientific linear perspective, and excessive anatomical obsession",
           ["The use of brushes and paper", "Drawing human faces and trees", "Exhibiting paintings in public buildings"],
           "The revivalists rejected photographic realism and oil impasto, insisting that Indian art prioritizes inner spiritual emotion (Bhava).")
]

P2_M10_TXT = (
    "Read the following excerpt on Abanindranath Tagore's masterpiece 'Journey's End' and answer the questions that follow:\n\n"
    "Painted around 1913 using watercolor and wash on paper, 'Journey's End' by Abanindranath Tagore is universally recognized as one of "
    "the supreme masterpieces of pathos (Karuna Rasa) in modern world art. The painting depicts an overburdened, exhausted camel collapsing "
    "onto stony desert ground at sunset. Strained to the point of death by an unbearable bundle of cargo tied tightly to its back, the animal "
    "slumps forward on its front knees, its long neck stretched out painfully and its mouth half-open, gasping for breath. Its half-closed "
    "eye conveys profound weariness, quiet surrender, and release from lifelong suffering. In the background, a dramatic sunset burns with "
    "dusky red, ochre, and mauve tones, fading into the dark blue of approaching night. Abanindranath used his signature wash technique—"
    "repeatedly soaking the paper in water—to create a weeping, diffused twilight mist that envelops the dying creature, elevating the scene "
    "into a timeless universal allegory of exploited human labor and mortal death, conserved in the NGMA, New Delhi."
)
P2_M10_QS = [
    case_q("The Bengal School of Painting", "Journey's End Master Artist and Medium",
           "Who painted the moving masterpiece 'Journey's End' (c. 1913) in watercolor and wash on paper?",
           "Abanindranath Tagore",
           ["Nandalal Bose", "Jamini Roy", "Amrita Sher-Gil"],
           "Journey's End was painted in watercolor and wash on paper by Abanindranath Tagore around 1913."),
    case_q("The Bengal School of Painting", "Dominant Aesthetic Emotion (Rasa)",
           "Which classical Indian aesthetic emotion (Rasa) is profoundly evoked by 'Journey's End'?",
           "Karuna Rasa (pathos, grief, and universal compassion)",
           ["Roudra Rasa (furious rage)", "Vira Rasa (heroic courage)", "Hasya Rasa (comic amusement)"],
           "The painting is a supreme manifestation of Karuna Rasa, invoking deep sorrow and empathy for the dying beast."),
    case_q("The Bengal School of Painting", "Allegorical Interpretation of the Camel",
           "What universal human condition is allegorically symbolized by the collapsing beast of burden?",
           "The silent suffering, lifelong toil, and ultimate release of exploited human labor and the downtrodden",
           ["The glory of desert commercial trading companies", "A warning about military animal transportation", "The speed of animal caravans"],
           "The dying camel collapsing under an unyielding load is an allegory of oppressed humanity toiling silently until death."),
    case_q("The Bengal School of Painting", "Sunset Sky Symbolism in Journey's End",
           "What does the setting sun and approaching nocturnal darkness in the painting metaphorically signify?",
           "The setting of the sun of life, the approach of death, and the final cessation of earthly struggle",
           ["A hot sunny afternoon for farming", "A morning sunrise full of energy", "The arrival of an electric train"],
           "The sunset symbolizes the end of life's painful journey and the peaceful arrival of eternal rest."),
    case_q("The Bengal School of Painting", "National Conservation Repository",
           "The original masterpiece 'Journey's End' by Abanindranath Tagore is permanently conserved in:",
           "National Gallery of Modern Art (NGMA), New Delhi",
           ["Indian Museum, Kolkata", "Victoria Memorial, Kolkata", "National Museum, New Delhi"],
           "Journey's End is proudly preserved in the modern Indian art collection of the National Gallery of Modern Art (NGMA), New Delhi.")
]

PASSAGES_1_10 = [
    ( (P1_M1_TXT, P1_M1_QS), (P2_M1_TXT, P2_M1_QS) ),
    ( (P1_M2_TXT, P1_M2_QS), (P2_M2_TXT, P2_M2_QS) ),
    ( (P1_M3_TXT, P1_M3_QS), (P2_M3_TXT, P2_M3_QS) ),
    ( (P1_M4_TXT, P1_M4_QS), (P2_M4_TXT, P2_M4_QS) ),
    ( (P1_M5_TXT, P1_M5_QS), (P2_M5_TXT, P2_M5_QS) ),
    ( (P1_M6_TXT, P1_M6_QS), (P2_M6_TXT, P2_M6_QS) ),
    ( (P1_M7_TXT, P1_M7_QS), (P2_M7_TXT, P2_M7_QS) ),
    ( (P1_M8_TXT, P1_M8_QS), (P2_M8_TXT, P2_M8_QS) ),
    ( (P1_M9_TXT, P1_M9_QS), (P2_M9_TXT, P2_M9_QS) ),
    ( (P1_M10_TXT, P1_M10_QS), (P2_M10_TXT, P2_M10_QS) )
]

assert len(PASSAGES_1_10) == 10, f"Expected 10 pairs, got {len(PASSAGES_1_10)}"
for m_idx, (p1, p2) in enumerate(PASSAGES_1_10, start=1):
    assert len(p1[1]) == 5, f"Mock {m_idx} P1 has {len(p1[1])} Qs"
    assert len(p2[1]) == 5, f"Mock {m_idx} P2 has {len(p2[1])} Qs"

print("Fine Arts Passages 1 to 10 compiled successfully: 10 pairs (20 passages, 100 questions).")
