export interface QuickReplyOption {
  id: string;
  label: string;
  query: string;
  icon?: string;
  category?: 'doubt' | 'quiz' | 'strategy' | 'pyq';
  topicId?: number;
}

export const STARTER_QUICK_REPLIES: QuickReplyOption[] = [
  {
    id: 'starter_1',
    label: 'Fundamental Rights summary',
    query: 'Bhaiya, Fundamental Rights ke main articles ek baar quick bullet points me samjha do na?',
    icon: '⚖️',
    category: 'doubt',
    topicId: 4,
  },
  {
    id: 'starter_2',
    label: 'Article 32 & 5 Writs',
    query: 'What are the 5 types of writs under Article 32 and how to remember them?',
    icon: '📜',
    category: 'doubt',
    topicId: 4,
  },
  {
    id: 'starter_3',
    label: 'DU North Campus Safe Score',
    query: 'DU North Campus (SRCC/Hindu) ke liye CUET me safe score kitna chahiye?',
    icon: '🎯',
    category: 'strategy',
  },
  {
    id: 'starter_4',
    label: 'Practice MCQ',
    query: 'Mujhe Fundamental Rights pe ek tough CUET level MCQ pucho test karne ke liye!',
    icon: '⚡',
    category: 'quiz',
    topicId: 4,
  },
  {
    id: 'starter_5',
    label: 'DPSP vs Fundamental Rights',
    query: 'Fundamental Rights aur DPSP me main difference kya hai CUET point of view se?',
    icon: '🔍',
    category: 'doubt',
    topicId: 5,
  },
];

export function getContextualQuickReplies(topicId?: number, lastIntent?: string): QuickReplyOption[] {
  if (topicId === 4) {
    return [
      {
        id: 'fr_1',
        label: 'Article 19 six freedoms',
        query: 'Article 19 ke 6 freedoms yaad rakhne ki koi shortcut trick hai?',
        icon: '💡',
        category: 'doubt',
      },
      {
        id: 'fr_2',
        label: 'Article 21 vs 21A',
        query: 'Article 21 aur Article 21A me kya farq hai aur 86th amendment ka kya role tha?',
        icon: '📖',
        category: 'doubt',
      },
      {
        id: 'fr_3',
        label: 'Test me on this topic',
        query: 'Ek high-difficulty CUET MCQ pucho is topic se!',
        icon: '⚡',
        category: 'quiz',
      },
    ];
  }

  if (topicId === 5) {
    return [
      {
        id: 'dpsp_1',
        label: 'Uniform Civil Code (Art 44)',
        query: 'Article 44 Uniform Civil Code ke bare me CUET me kya questions aate hain?',
        icon: '🏛️',
        category: 'doubt',
      },
      {
        id: 'dpsp_2',
        label: 'Article 40 Panchayats',
        query: 'Article 40 Panchayati Raj aur 73rd amendment ka relation samjha do.',
        icon: '🌾',
        category: 'doubt',
      },
      {
        id: 'dpsp_3',
        label: 'Quiz on DPSPs',
        query: 'DPSP pe ek tricky CUET practice question do!',
        icon: '⚡',
        category: 'quiz',
      },
    ];
  }

  if (lastIntent === 'frustration') {
    return [
      {
        id: 'frust_1',
        label: '30-day revision plan',
        query: 'Bhaiya, agar abhi se start karein toh CUET 30-day plan kaise banayein?',
        icon: '📅',
        category: 'strategy',
      },
      {
        id: 'frust_2',
        label: 'How to avoid negative marking',
        query: 'Negative marking se bachne ke liye elimination trick kaise use karein?',
        icon: '🛡️',
        category: 'strategy',
      },
    ];
  }

  return STARTER_QUICK_REPLIES.slice(0, 4);
}
