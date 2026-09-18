import { LanguageDetected } from './types';

// Common Hinglish / Romanized Hindi indicator words
const HINGLISH_KEYWORDS = new Set([
  'kya', 'hai', 'hain', 'mujhe', 'samajh', 'samjha', 'samjhao', 'nahi', 'nahin', 
  'aaya', 'aayi', 'kaise', 'batao', 'bataiye', 'karo', 'karein', 'kare', 'pe', 
  'par', 'hota', 'hoti', 'hote', 'wali', 'wala', 'wale', 'padhna', 'padhe', 
  'tayyari', 'kitna', 'kitne', 'kab', 'kyun', 'kyu', 'sir', 'bhaiya', 'didi', 
  'accha', 'achha', 'theek', 'thik', 'bhi', 'yeh', 'ye', 'woh', 'wo', 'isko', 
  'usko', 'iske', 'uske', 'chahiye', 'bolte', 'dost', 'mera', 'meri', 'mere', 
  'hum', 'aap', 'tum', 'kuch', 'kuchh', 'kaun', 'kaunsa', 'kaunsi', 'kaise', 
  'kaunsa', 'sirf', 'toh', 'to', 'lekin', 'magar', 'kyunki', 'isliye', 'baad', 
  'pehle', 'sakte', 'sakta', 'sakti', 'hoga', 'hogi', 'honge', 'rakhna', 'yaad',
  'karna', 'karne', 'karte', 'pucho', 'sawal', 'uttar', 'prashna', 'samajhayein'
]);

export interface LanguageDetectionResult {
  language: LanguageDetected;
  confidence: number;
  devanagariRatio: number;
  hinglishRatio: number;
  script: 'devanagari' | 'latin' | 'mixed';
}

export function detectLanguage(text: string): LanguageDetected {
  const result = analyzeLanguage(text);
  return result.language;
}

export function analyzeLanguage(rawText: string): LanguageDetectionResult {
  if (!rawText || !rawText.trim()) {
    return {
      language: 'english',
      confidence: 1.0,
      devanagariRatio: 0,
      hinglishRatio: 0,
      script: 'latin',
    };
  }

  const text = rawText.trim();
  
  // Count Devanagari characters: Unicode \u0900 to \u097F
  const devanagariMatches = text.match(/[\u0900-\u097F]/g) || [];
  // Count Latin alphabetic characters: [A-Za-z]
  const latinMatches = text.match(/[A-Za-z]/g) || [];
  
  const totalChars = devanagariMatches.length + latinMatches.length;

  if (totalChars === 0) {
    return {
      language: 'english',
      confidence: 0.5,
      devanagariRatio: 0,
      hinglishRatio: 0,
      script: 'latin',
    };
  }

  const devanagariRatio = devanagariMatches.length / totalChars;
  const latinRatio = latinMatches.length / totalChars;

  // If > 40% Devanagari and > 25% Latin -> Mixed
  if (devanagariRatio >= 0.25 && latinRatio >= 0.25) {
    return {
      language: 'mixed',
      confidence: 0.85,
      devanagariRatio,
      hinglishRatio: 0,
      script: 'mixed',
    };
  }

  // Pure or predominantly Devanagari
  if (devanagariRatio > 0.4) {
    return {
      language: 'hindi',
      confidence: Math.min(1.0, devanagariRatio + 0.2),
      devanagariRatio,
      hinglishRatio: 0,
      script: 'devanagari',
    };
  }

  // Latin script: Check for Hinglish words
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return {
      language: 'english',
      confidence: 0.8,
      devanagariRatio: 0,
      hinglishRatio: 0,
      script: 'latin',
    };
  }

  let hinglishWordCount = 0;
  for (const word of words) {
    if (HINGLISH_KEYWORDS.has(word)) {
      hinglishWordCount++;
    }
  }

  const hinglishRatio = hinglishWordCount / words.length;

  // Threshold: If at least 15% of words or >= 2 words match Hinglish dictionary
  if (hinglishWordCount >= 2 || (words.length <= 4 && hinglishWordCount >= 1) || hinglishRatio >= 0.15) {
    return {
      language: 'hinglish',
      confidence: Math.min(1.0, 0.6 + hinglishRatio * 0.4),
      devanagariRatio,
      hinglishRatio,
      script: 'latin',
    };
  }

  return {
    language: 'english',
    confidence: 0.9,
    devanagariRatio,
    hinglishRatio,
    script: 'latin',
  };
}
