export const csUnit2 = {
  id: "computer_science_u2_t1",
  slug: "data-structures-stacks-and-queues-searching-and-sorting-understanding-data-societal-impacts",
  subject: "computer_science",
  subjectName: "Computer Science",
  subjectCode: "308",
  unitNumber: 2,
  unitTitle: "Section B1: Computer Science Core",
  topicTitle: "Data Structures: Stacks and Queues, Searching and Sorting, Understanding Data, Societal Impacts",
  ncertReference: {
    class: "12",
    book: "Computer Science NCERT Class XII",
    chapterNumber: 3,
    chapterName: "Data Structures & Societal Impacts",
    sections: ["3.1 Stacks (LIFO) and Queues (FIFO)", "3.2 Searching (Linear & Binary) & Sorting Algorithms", "3.3 Understanding Data & Analytics", "3.4 Societal Impacts, Digital Footprints & Cyber Laws"]
  },
  cuetRelevance: {
    level: "High",
    pyqFrequency: "Section B1 core. High frequency of stack push/pop trace questions and time complexity evaluations.",
    totalPyqsInRepo: 0,
    weightagePercentage: 35
  },
  summary30Seconds: [
    "Stack is a LIFO (Last In, First Out) linear structure; implemented in Python lists using append() as PUSH and pop() as POP (underflow if empty).",
    "Queue is a FIFO (First In, First Out) structure; enqueue using append() and dequeue using pop(0); front removes, rear inserts.",
    "Linear Search is O(n) on unordered/ordered lists; Binary Search is O(log n) strictly requiring a sorted array.",
    "Sorting: Bubble Sort compares adjacent pairs (O(n²)), Insertion Sort inserts into sorted sublist (best O(n), worst O(n²)).",
    "Cyber ethics: IT Act 2000 (amended 2008), Section 66 (hacking, identity theft), GPL/Creative Commons licenses, and active vs passive digital footprints."
  ],
  coreConcepts: [
    {
      title: "1. Linear Data Structures: Stacks and Queues",
      content: "A Stack is a restricted linear data structure that follows the LIFO (Last In First Out) or FILO (First In Last Out) principle. All insertions and deletions take place at a single end called TOP. Key operations: PUSH (inserting element at TOP; raises Overflow if fixed size), POP (deleting element from TOP; raises Underflow if stack is empty), PEEK/INSPECT (examining TOP element without removing it). In Python, a dynamic list is used: `stack.append(val)` simulates PUSH, while `stack.pop()` removes the top element.\n\nA Queue is a linear data structure following FIFO (First In First Out). Insertion takes place at the REAR end (Enqueue) and deletion takes place at the FRONT end (Dequeue). In Python lists: `queue.append(val)` for enqueue and `queue.pop(0)` for dequeue.",
      ncertPointers: [
        "Stack Underflow condition: len(stack) == 0 when a pop or peek is attempted.",
        "Applications of Stacks: Function call recursion management, undo mechanisms in text editors, expression evaluation (Infix to Postfix), parenthesis matching.",
        "Applications of Queues: Print spooling, CPU task scheduling, breadth-first search."
      ]
    },
    {
      title: "2. Searching and Sorting Algorithms with Time Complexity",
      content: "Linear Search traverses the list element by element from index 0 to n-1. Works on both sorted and unsorted sequences. Best case: O(1) (target at first index), Worst & Average case: O(n).\nBinary Search works on the Divide-and-Conquer strategy and strictly requires the collection to be SORTED. In each iteration, it compares the target with the middle element `mid = (low + high) // 2`. If target is smaller, search space reduces to `high = mid - 1`; if larger, `low = mid + 1`. Time complexity: Best O(1), Worst O(log₂ n).\n\nBubble Sort repeatedly swaps adjacent inverted pairs. After k passes, the k largest elements bubble to the end. Total comparisons = n(n-1)/2, time complexity O(n²).\nInsertion Sort maintains a sorted left sub-array and repeatedly inserts the next unsorted element into its correct relative position. Best case (already sorted): O(n); Worst case (reverse sorted): O(n²).",
      ncertPointers: [
        "Number of passes in Bubble Sort for n elements is (n - 1).",
        "Binary Search requires fewer comparisons: for 1024 elements, linear search takes up to 1024 comparisons, while binary search takes at most log₂(1024) = 10 comparisons.",
        "Space complexity: Both Linear/Binary Search and Bubble/Insertion Sort operate in-place with O(1) auxiliary memory."
      ]
    },
    {
      title: "3. Understanding Data, Big Data, and Data Processing Life Cycle",
      content: "Data refers to raw, unorganized facts, figures, and symbols. Information is processed, structured data that carries meaning and context. Big Data is characterized by the 5 Vs: Volume (sheer quantity of data generated), Velocity (speed at which new data is generated and transmitted), Variety (structured, semi-structured like JSON/XML, and unstructured like video/audio), Veracity (trustworthiness and quality), and Value (business usefulness). Data processing lifecycle: Collection -> Preparation/Cleaning -> Input -> Processing -> Output/Visualization -> Storage.",
      ncertPointers: [
        "Structured data fits strictly in relational tables with fixed schemas (e.g. SQL databases).",
        "Unstructured data lacks a predefined format or model (e.g. tweets, images, blog comments).",
        "Data privacy ensures individuals have control over how their personal data is collected, stored, and shared."
      ]
    },
    {
      title: "4. Societal Impacts, Cyber Law, and Digital Ethics",
      content: "Digital Footprint is the trail of identifiable data left behind by users online. Active Footprints: intentionally shared data (social media posts, filling online forms, blog comments). Passive Footprints: collected without active user awareness (IP logs, browser cookies, search history, geolocation tracking).\nCyber Crimes: Phishing (fraudulent emails imitating legitimate organizations to steal credentials), Pharming (redirecting website traffic to bogus spoofed IP addresses via DNS poisoning), Identity Theft, Cyber Bullying, Plagiarism (using another's intellectual work without attribution).\nOpen Source Licenses: GNU GPL (copyleft; derivatives must remain open), Creative Commons (CC-BY, CC-NC, CC-SA), Proprietary software (closed source, licensed per user).\nCyber Law: Information Technology (IT) Act 2000 (and 2008 amendment). Section 43 (penalty for damage to computer system), Section 66 (computer related offenses, hacking), Section 66A (struck down by Supreme Court in Shreya Singhal case), Section 66C (identity theft), Section 66D (cheating by impersonation using computer resources).",
      ncertPointers: [
        "E-Waste (Electronic Waste) contains toxic heavy metals (lead, mercury, cadmium) that contaminate groundwater if dumped in landfills; requires certified recycling.",
        "Net Neutrality: Principle that ISPs must treat all Internet traffic equally without throttling or charging different rates based on user, content, or platform.",
        "Intellectual Property Rights (IPR): Patents (inventions/processes), Copyrights (literary/artistic/code works), Trademarks (logos/brand identities)."
      ]
    }
  ],
  keyFormulasAndTables: [
    {
      name: "Algorithm Time & Space Complexity Table",
      formula: "Binary Search: O(log n); Bubble/Insertion: O(n²)",
      symbols: "n = number of elements",
      siUnits: "Asymptotic notation",
      applicationCondition: "Comparison-based searching and sorting",
      notes: "Insertion sort achieves linear time O(n) on pre-sorted arrays."
    },
    {
      name: "Binary Search Middle Index Calculation",
      formula: "mid = low + (high - low) // 2",
      symbols: "low = start index, high = end index",
      siUnits: "Index integer",
      applicationCondition: "Sorted linear arrays or Python lists",
      notes: "Prevents integer overflow in low-level languages compared to (low + high)//2."
    },
    {
      name: "IT Act Key Legal Provisions",
      formula: "Sec 43 (Data Damage), Sec 66 (Hacking), Sec 66C (Identity Theft), Sec 66D (Impersonation)",
      symbols: "Indian IT Act 2000 / 2008",
      siUnits: "Legal Sections",
      applicationCondition: "Indian cyber law offenses and cyber security regulations",
      notes: "Section 66A was declared unconstitutional by Supreme Court in 2015."
    }
  ],
  diagramSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="100%">
  <defs>
    <linearGradient id="cs2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e1e38"/>
    </linearGradient>
    <linearGradient id="stackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="queueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#be185d"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="12" fill="url(#cs2Grad)"/>
  <text x="400" y="32" fill="#60a5fa" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">CUET Computer Science: Core Data Structures &amp; Cyber Ethics</text>
  
  <!-- Stack Diagram -->
  <g transform="translate(40, 65)">
    <rect width="210" height="310" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="105" y="25" fill="#93c5fd" font-size="14" font-weight="bold" text-anchor="middle">Stack (LIFO)</text>
    
    <!-- Stack container -->
    <path d="M 50 60 L 50 250 L 160 250 L 160 60" fill="none" stroke="#60a5fa" stroke-width="3"/>
    
    <!-- Stack Elements -->
    <rect x="55" y="205" width="100" height="40" rx="4" fill="url(#stackGrad)"/>
    <text x="105" y="230" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Item 1 (Bottom)</text>
    
    <rect x="55" y="160" width="100" height="40" rx="4" fill="url(#stackGrad)"/>
    <text x="105" y="185" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Item 2</text>
    
    <rect x="55" y="115" width="100" height="40" rx="4" fill="url(#stackGrad)"/>
    <text x="105" y="140" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Item 3 [TOP]</text>
    
    <!-- Arrows -->
    <path d="M 30 90 Q 70 70 85 110" fill="none" stroke="#34d399" stroke-width="2"/>
    <text x="15" y="80" fill="#34d399" font-size="10" font-weight="bold">PUSH (append)</text>
    
    <path d="M 125 110 Q 140 70 180 85" fill="none" stroke="#f87171" stroke-width="2"/>
    <text x="145" y="80" fill="#f87171" font-size="10" font-weight="bold">POP (pop())</text>
    
    <text x="105" y="280" fill="#94a3b8" font-size="10" text-anchor="middle">Underflow if len == 0</text>
    <text x="105" y="295" fill="#cbd5e1" font-size="9" text-anchor="middle">Recursion, Infix/Postfix</text>
  </g>

  <!-- Queue & Search/Sort Diagram -->
  <g transform="translate(290, 65)">
    <rect width="230" height="310" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="115" y="25" fill="#6ee7b7" font-size="14" font-weight="bold" text-anchor="middle">Queue (FIFO) &amp; Search</text>
    
    <!-- Queue schematic -->
    <text x="15" y="55" fill="#cbd5e1" font-size="11" font-weight="bold">Queue Structure:</text>
    <path d="M 25 70 L 195 70 M 25 105 L 195 105" stroke="#10b981" stroke-width="2"/>
    <rect x="40" y="73" width="32" height="29" fill="url(#queueGrad)" rx="2"/>
    <text x="56" y="92" fill="#fff" font-size="10" text-anchor="middle">1st</text>
    <rect x="75" y="73" width="32" height="29" fill="url(#queueGrad)" rx="2"/>
    <text x="91" y="92" fill="#fff" font-size="10" text-anchor="middle">2nd</text>
    <rect x="110" y="73" width="32" height="29" fill="url(#queueGrad)" rx="2"/>
    <text x="126" y="92" fill="#fff" font-size="10" text-anchor="middle">3rd</text>
    <rect x="145" y="73" width="32" height="29" fill="url(#queueGrad)" rx="2"/>
    <text x="161" y="92" fill="#fff" font-size="10" text-anchor="middle">4th</text>
    
    <text x="35" y="125" fill="#f87171" font-size="10">FRONT: pop(0)</text>
    <text x="140" y="125" fill="#34d399" font-size="10">REAR: append()</text>
    
    <line x1="15" y1="140" x2="215" y2="140" stroke="#334155" stroke-width="1"/>
    
    <!-- Searching & Sorting Table -->
    <text x="15" y="160" fill="#fcd34d" font-size="11" font-weight="bold">Complexity Matrix:</text>
    <text x="15" y="180" fill="#cbd5e1" font-size="10">• Linear Search: O(n)</text>
    <text x="15" y="198" fill="#cbd5e1" font-size="10">• Binary Search: O(log n) [Sorted!]</text>
    <text x="15" y="216" fill="#cbd5e1" font-size="10">• Bubble Sort: O(n²) [Swaps adjacent]</text>
    <text x="15" y="234" fill="#cbd5e1" font-size="10">• Insertion Sort: Best O(n), Worst O(n²)</text>
    
    <rect x="15" y="255" width="200" height="40" rx="4" fill="#047857" opacity="0.3"/>
    <text x="115" y="272" fill="#6ee7b7" font-size="10" text-anchor="middle">Binary search halves space</text>
    <text x="115" y="287" fill="#cbd5e1" font-size="9" text-anchor="middle">Passes in Bubble Sort = n - 1</text>
  </g>

  <!-- Cyber Law & Societal Impacts -->
  <g transform="translate(560, 65)">
    <rect width="200" height="310" rx="8" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
    <text x="100" y="25" fill="#f472b6" font-size="14" font-weight="bold" text-anchor="middle">Societal &amp; Cyber Law</text>
    
    <text x="15" y="60" fill="#fbcfe8" font-size="11" font-weight="bold">Digital Footprints:</text>
    <text x="20" y="78" fill="#cbd5e1" font-size="10">• Active: Emails, Posts</text>
    <text x="20" y="95" fill="#cbd5e1" font-size="10">• Passive: Cookies, IP log</text>
    
    <text x="15" y="125" fill="#fbcfe8" font-size="11" font-weight="bold">Cyber Crimes:</text>
    <text x="20" y="143" fill="#cbd5e1" font-size="10">• Phishing: Fake identity</text>
    <text x="20" y="160" fill="#cbd5e1" font-size="10">• Pharming: DNS hijack</text>
    <text x="20" y="177" fill="#cbd5e1" font-size="10">• Plagiarism: Copied code</text>
    
    <text x="15" y="205" fill="#fbcfe8" font-size="11" font-weight="bold">IT Act 2000 Sections:</text>
    <text x="20" y="223" fill="#cbd5e1" font-size="10">• Sec 43: System Damage</text>
    <text x="20" y="240" fill="#cbd5e1" font-size="10">• Sec 66: Hacking offence</text>
    <text x="20" y="257" fill="#cbd5e1" font-size="10">• Sec 66C: Identity Theft</text>
    <text x="20" y="274" fill="#cbd5e1" font-size="10">• Sec 66D: Impersonation</text>
    
    <rect x="15" y="285" width="170" height="18" rx="3" fill="#be185d" opacity="0.3"/>
    <text x="100" y="298" fill="#fbcfe8" font-size="9" text-anchor="middle">GPL: Copyleft | BSD/MIT: Permissive</text>
  </g>

  <text x="400" y="405" fill="#64748b" font-size="11" text-anchor="middle">Section B1 Computer Science Core • Class 12 Syllabus • CUET Precision</text>
</svg>`,
  workedExamples: [
    {
      questionNumber: 1,
      question: "Given an initially empty stack S, trace the following operations:\nS.push(10)\nS.push(20)\nx = S.pop()\nS.push(30)\nS.push(40)\ny = S.pop()\nS.push(x + y)\n\nWhat is the element at the TOP of the stack after these operations?",
      options: [
        { id: "A", text: "30" },
        { id: "B", text: "60" },
        { id: "C", text: "50" },
        { id: "D", text: "10" }
      ],
      correctOption: "B",
      solutionSteps: [
        "Step 1: S = [10]. Top is 10.",
        "Step 2: S = [10, 20]. Top is 20.",
        "Step 3: x = S.pop() removes 20. S = [10], x = 20.",
        "Step 4: S = [10, 30].",
        "Step 5: S = [10, 30, 40]. Top is 40.",
        "Step 6: y = S.pop() removes 40. S = [10, 30], y = 40.",
        "Step 7: x + y = 20 + 40 = 60. S.push(60) results in S = [10, 30, 60].",
        "Step 8: The element at the TOP of the stack is 60."
      ],
      cuetTip: "Keep a clear trace column for the stack list and separate variables x and y. Notice that pop() retrieves the most recently pushed item!"
    },
    {
      questionNumber: 2,
      question: "How many maximum comparisons are required to search for an element in an array of 64 sorted numbers using Binary Search in the worst case?",
      options: [
        { id: "A", text: "64" },
        { id: "B", text: "32" },
        { id: "C", text: "7" },
        { id: "D", text: "6" }
      ],
      correctOption: "C",
      solutionSteps: [
        "Step 1: The maximum number of comparisons in Binary Search for n elements in the worst case is ⌊log₂ n⌋ + 1.",
        "Step 2: Here n = 64. log₂(64) = 6.",
        "Step 3: The maximum comparisons = 6 + 1 = 7 (or 6 if target is present, 7 if target is absent / complete failure).",
        "Step 4: For any sorted array of size 64, after 6 divisions the interval reduces to 1 element, and 1 final comparison confirms presence/absence."
      ],
      cuetTip: "Worst case binary search comparisons = ⌊log₂ n⌋ + 1. For 64, it is 7 comparisons to confirm absence or find at leaf."
    },
    {
      questionNumber: 3,
      question: "Which section of the Information Technology Act, 2000 specifically penalizes identity theft, such as fraudulently making use of the electronic signature, password, or other unique identification feature of any other person?",
      options: [
        { id: "A", text: "Section 43" },
        { id: "B", text: "Section 66C" },
        { id: "C", text: "Section 66D" },
        { id: "D", text: "Section 67" }
      ],
      correctOption: "B",
      solutionSteps: [
        "Step 1: Section 43 deals with civil penalties for unauthorized access and damage to computer systems.",
        "Step 2: Section 66 covers general hacking and dishonestly causing computer damage.",
        "Step 3: Section 66C specifically prescribes punishment for identity theft (using electronic signatures, passwords, or biometrics of another person).",
        "Step 4: Section 66D penalizes cheating by personation by using computer resources."
      ],
      cuetTip: "Mnemonic: 66C = Credentials/Identity theft; 66D = Disguise/Cheating by personation."
    }
  ],
  howCuetAsksThis: [
    {
      type: "Algorithm Step Trace",
      frequency: "High (3 questions)",
      typicalStem: "Given list L = [12, 35, 8, 44, 2], what will be the state of the list after the 2nd pass of Bubble Sort in ascending order?",
      strategy: "Trace pass 1 (largest element moves to end) and pass 2 (second largest moves to second to last position)."
    },
    {
      type: "Match The Following",
      frequency: "High (2 questions)",
      typicalStem: "Match Data Structure operation (Push, Enqueue, Pop, Dequeue) with corresponding Python list operation.",
      strategy: "Push = append(), Pop = pop(), Enqueue = append(), Dequeue = pop(0)."
    },
    {
      type: "Assertion-Reason",
      frequency: "Medium (2 questions)",
      typicalStem: "Assertion (A): Binary search cannot be performed directly on a randomly ordered unsorted array.\nReason (R): Binary search relies on the sorted order to discard half of the search space in every comparison.",
      strategy: "Both are true, and R is the foundational operational logic of binary search."
    }
  ],
  commonTraps: [
    {
      misconception: "Using pop() instead of pop(0) for queue dequeue in a Python list.",
      whyWrong: "pop() removes from the end (index -1), behaving like a stack (LIFO). Queue dequeue must remove from the front (index 0).",
      correctUnderstanding: "Queue dequeue in Python lists is implemented via pop(0).",
      trapOptionExample: "Writing my_queue.pop() to dequeue an element."
    },
    {
      misconception: "Thinking insertion sort always takes O(n²) time.",
      whyWrong: "When the array is already sorted, insertion sort makes only (n - 1) comparisons and zero shifts, taking O(n) time.",
      correctUnderstanding: "Best-case time complexity of insertion sort is linear O(n).",
      trapOptionExample: "Claiming insertion sort is O(n²) in all cases."
    },
    {
      misconception: "Believing browser cookies are an active digital footprint.",
      whyWrong: "Cookies are downloaded and tracked automatically by web servers without intentional user content submission.",
      correctUnderstanding: "Cookies, IP address logs, and server logs are PASSIVE digital footprints.",
      trapOptionExample: "Classifying HTTP cookies as an active digital footprint."
    }
  ],
  mnemonicsAndShortcuts: [
    {
      title: "Queue Ends Rule",
      mnemonic: "FED-REP",
      shortcut: "Front for Exit / Dequeue, Rear for Entry / Push.",
      whenToApply: "Queue operations questions.",
      explanation: "Remember FED (Front Exit Dequeue) and REP (Rear Entry Push)."
    },
    {
      title: "IT Act Sections: C & D",
      mnemonic: "C = Credentials, D = Disguise",
      shortcut: "Sec 66C: Credential/Identity theft; Sec 66D: Disguise/Personation cheating.",
      whenToApply: "Cyber law questions in Section B1 & B2.",
      explanation: "Prevents confusing 66C and 66D in multiple choice questions."
    }
  ],
  quickRevisionCard: {
    title: "CS Core Data Structures & Cyber Ethics — Flash Card",
    bulletPoints: [
      "Stack: LIFO linear data structure; PUSH = list.append(x), POP = list.pop().",
      "Stack Underflow: Attempting to POP/PEEK from an empty stack (len(s) == 0).",
      "Queue: FIFO linear data structure; Enqueue = list.append(x), Dequeue = list.pop(0).",
      "Linear Search: O(n) worst/avg, O(1) best; works on sorted and unsorted collections.",
      "Binary Search: O(log n) worst, O(1) best; STRICTLY requires a sorted collection.",
      "Bubble Sort: Swaps adjacent inversions; takes n-1 passes; comparisons = n(n-1)/2; O(n²).",
      "Insertion Sort: Inserts into sorted subarray; best case O(n) on sorted list, worst O(n²).",
      "5 Vs of Big Data: Volume, Velocity, Variety, Veracity, Value.",
      "Digital Footprint: Active (deliberate posts, emails), Passive (server logs, cookies, IP tracking).",
      "IT Act 2000: Sec 43 (System damage), Sec 66 (Hacking), Sec 66C (Identity theft), Sec 66D (Personation).",
      "FOSS Licenses: GNU GPL is Copyleft (derivatives must be free); Apache/MIT are permissive.",
      "E-Waste: Contains hazardous Lead, Mercury, Cadmium; requires authorized formal recyclers."
    ]
  },
  practiceQuestions: [
    {
      id: "cs_u2_q1",
      question: "What error/condition occurs if an algorithm attempts to remove an element from a stack that has no elements stored in it?",
      type: "standard",
      questionType: "Direct Conceptual",
      difficulty: "easy",
      options: [
        { id: "A", text: "Stack Overflow" },
        { id: "B", text: "Stack Underflow" },
        { id: "C", text: "Index Inversion" },
        { id: "D", text: "Segmentation Fault" }
      ],
      correctOption: "B",
      explanation: "Stack Underflow refers to the run-time condition or error of trying to pop or access an item from an empty stack."
    },
    {
      id: "cs_u2_q2",
      question: "Which of the following data structures is most suitable for evaluating arithmetic expressions written in Postfix notation (Reverse Polish Notation)?",
      type: "standard",
      questionType: "Application Direct",
      difficulty: "easy",
      options: [
        { id: "A", text: "Queue" },
        { id: "B", text: "Tree" },
        { id: "C", text: "Stack" },
        { id: "D", text: "Graph" }
      ],
      correctOption: "C",
      explanation: "A Stack is universally used for postfix expression evaluation: operands are pushed onto the stack, and when an operator is encountered, operands are popped, evaluated, and the result is pushed back."
    },
    {
      id: "cs_u2_q3",
      question: "How many passes of Bubble Sort are required to completely sort an array of 8 integers in the worst-case scenario?",
      type: "standard",
      questionType: "Algorithm Metrics",
      difficulty: "medium",
      options: [
        { id: "A", text: "8" },
        { id: "B", text: "7" },
        { id: "C", text: "28" },
        { id: "D", text: "64" }
      ],
      correctOption: "B",
      explanation: "For an array of n elements, Bubble Sort requires exactly (n - 1) passes to guarantee sorted order. For n = 8, passes = 8 - 1 = 7."
    },
    {
      id: "cs_u2_q4",
      question: "What is the best-case time complexity of Insertion Sort when the input array of size n is already sorted in the desired order?",
      type: "standard",
      questionType: "Complexity Analysis",
      difficulty: "medium",
      options: [
        { id: "A", text: "O(n²)" },
        { id: "B", text: "O(n log n)" },
        { id: "C", text: "O(n)" },
        { id: "D", text: "O(1)" }
      ],
      correctOption: "C",
      explanation: "When an array is already sorted, Insertion Sort makes only 1 comparison per element with no shifts required, yielding a linear best-case time complexity of O(n)."
    },
    {
      id: "cs_u2_q5",
      question: "In Python list implementation of a Queue, which combination of functions correctly implements Enqueue (insert at rear) and Dequeue (delete from front)?",
      type: "standard",
      questionType: "Implementation Syntax",
      difficulty: "medium",
      options: [
        { id: "A", text: "Enqueue: list.append(), Dequeue: list.pop()" },
        { id: "B", text: "Enqueue: list.append(), Dequeue: list.pop(0)" },
        { id: "C", text: "Enqueue: list.insert(0), Dequeue: list.pop(0)" },
        { id: "D", text: "Enqueue: list.pop(), Dequeue: list.append()" }
      ],
      correctOption: "B",
      explanation: "In a list-based queue, elements enter at the rear using append(x) and exit from the front using pop(0) to maintain First-In First-Out (FIFO) semantics."
    },
    {
      id: "cs_u2_q6",
      question: "Which of the following is an example of an 'Active Digital Footprint'?",
      type: "standard",
      questionType: "Societal Application",
      difficulty: "easy",
      options: [
        { id: "A", text: "Web server recording your client IP address and user agent" },
        { id: "B", text: "An e-commerce website saving tracking cookies on your device" },
        { id: "C", text: "Posting an article or comment on an online forum or social media" },
        { id: "D", text: "A search engine logging search keywords without user login" }
      ],
      correctOption: "C",
      explanation: "Active digital footprints are deliberately and knowingly created by the user (posting photos, writing blogs, publishing comments). Server logs and cookies are passive."
    },
    {
      id: "cs_u2_q7",
      question: "A cyber attacker redirects visitors of a genuine banking site to a fraudulent clone site by corrupting DNS host records on the server. What type of attack is this?",
      type: "standard",
      questionType: "Cyber Security Classification",
      difficulty: "medium",
      options: [
        { id: "A", text: "Phishing" },
        { id: "B", text: "Pharming" },
        { id: "C", text: "Spamming" },
        { id: "D", text: "Plagiarism" }
      ],
      correctOption: "B",
      explanation: "Pharming involves manipulating DNS entries or host files so that users typing a legitimate URL are automatically redirected to a bogus fraudulent website without their knowledge."
    },
    {
      id: "cs_u2_q8",
      question: "Assertion (A): Binary search is significantly more efficient than linear search for large datasets.\nReason (R): Binary search halves the remaining search space in every single iteration, requiring at most ⌈log₂ n⌉ comparisons.",
      type: "assertion-reason",
      questionType: "Assertion-Reason",
      difficulty: "medium",
      options: [
        { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
        { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
        { id: "C", text: "(A) is true, but (R) is false." },
        { id: "D", text: "(A) is false, but (R) is true." }
      ],
      correctOption: "A",
      explanation: "Both (A) and (R) are true. The logarithmic reduction of the search space by halving at each step is the exact reason why binary search scales so well (O(log n) vs O(n))."
    },
    {
      id: "cs_u2_q9",
      question: "Assertion (A): Software released under the GNU General Public License (GPL) allows commercial redistribution with proprietary closed-source modifications.\nReason (R): GNU GPL contains a strict 'copyleft' clause requiring any modified derivative work to be distributed under the same open-source terms.",
      type: "assertion-reason",
      questionType: "Assertion-Reason",
      difficulty: "hard",
      options: [
        { id: "A", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A)." },
        { id: "B", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A)." },
        { id: "C", text: "(A) is false, but (R) is true." },
        { id: "D", text: "(A) is true, but (R) is false." }
      ],
      correctOption: "C",
      explanation: "Assertion (A) is false because GPL strictly prohibits turning derivative works into closed proprietary software. Reason (R) is true; the copyleft clause mandates that derivatives remain open source."
    },
    {
      id: "cs_u2_q10",
      question: "Match the Indian IT Act 2000 / 2008 Sections in List I with the Offence in List II:\nList I:\n(P) Section 43\n(Q) Section 66\n(R) Section 66C\n(S) Section 66D\n\nList II:\n(1) Punishment for identity theft\n(2) Penalty and compensation for damage to computer system\n(3) Cheating by personation using computer resource\n(4) Hacking with computer system / dishonest computing",
      type: "match-the-following",
      questionType: "Match The Following",
      difficulty: "medium",
      options: [
        { id: "A", text: "P-2, Q-4, R-1, S-3" },
        { id: "B", text: "P-4, Q-2, R-3, S-1" },
        { id: "C", text: "P-2, Q-1, R-4, S-3" },
        { id: "D", text: "P-1, Q-3, R-2, S-4" }
      ],
      correctOption: "A",
      explanation: "Section 43 covers civil damage compensation (P-2); Section 66 covers hacking (Q-4); Section 66C covers identity theft (R-1); Section 66D covers personation cheating (S-3). Matches A."
    }
  ]
};
