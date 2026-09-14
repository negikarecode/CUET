import { Question } from "@/types";
import physicsMock1 from "@/mock/physics/1.json";
import physicsMock2 from "@/mock/physics/2.json";
import physicsMock3 from "@/mock/physics/3.json";
import physicsMock4 from "@/mock/physics/4.json";
import physicsMock5 from "@/mock/physics/5.json";
import physicsMock6 from "@/mock/physics/6.json";
import physicsMock7 from "@/mock/physics/7.json";
import physicsMock8 from "@/mock/physics/8.json";
import physicsMock9 from "@/mock/physics/9.json";
import physicsMock10 from "@/mock/physics/10.json";
import physicsMock11 from "@/mock/physics/11.json";
import physicsMock12 from "@/mock/physics/12.json";
import physicsMock13 from "@/mock/physics/13.json";
import physicsMock14 from "@/mock/physics/14.json";
import physicsMock15 from "@/mock/physics/15.json";
import physicsMock16 from "@/mock/physics/16.json";
import physicsMock17 from "@/mock/physics/17.json";
import physicsMock18 from "@/mock/physics/18.json";
import physicsMock19 from "@/mock/physics/19.json";
import physicsMock20 from "@/mock/physics/20.json";
import chemistryMock1 from "@/mock/chemistry/1.json";
import chemistryMock2 from "@/mock/chemistry/2.json";
import chemistryMock3 from "@/mock/chemistry/3.json";
import chemistryMock4 from "@/mock/chemistry/4.json";
import chemistryMock5 from "@/mock/chemistry/5.json";
import chemistryMock6 from "@/mock/chemistry/6.json";
import chemistryMock7 from "@/mock/chemistry/7.json";
import chemistryMock8 from "@/mock/chemistry/8.json";
import chemistryMock9 from "@/mock/chemistry/9.json";
import chemistryMock10 from "@/mock/chemistry/10.json";
import chemistryMock11 from "@/mock/chemistry/11.json";
import chemistryMock12 from "@/mock/chemistry/12.json";
import chemistryMock13 from "@/mock/chemistry/13.json";
import chemistryMock14 from "@/mock/chemistry/14.json";
import chemistryMock15 from "@/mock/chemistry/15.json";
import chemistryMock16 from "@/mock/chemistry/16.json";
import chemistryMock17 from "@/mock/chemistry/17.json";
import chemistryMock18 from "@/mock/chemistry/18.json";
import chemistryMock19 from "@/mock/chemistry/19.json";
import chemistryMock20 from "@/mock/chemistry/20.json";
import mathsMock1 from "@/mock/maths/1.json";
import mathsMock2 from "@/mock/maths/2.json";
import mathsMock3 from "@/mock/maths/3.json";
import mathsMock4 from "@/mock/maths/4.json";
import mathsMock5 from "@/mock/maths/5.json";
import mathsMock6 from "@/mock/maths/6.json";
import mathsMock7 from "@/mock/maths/7.json";
import mathsMock8 from "@/mock/maths/8.json";
import mathsMock9 from "@/mock/maths/9.json";
import mathsMock10 from "@/mock/maths/10.json";
import mathsMock11 from "@/mock/maths/11.json";
import mathsMock12 from "@/mock/maths/12.json";
import mathsMock13 from "@/mock/maths/13.json";
import mathsMock14 from "@/mock/maths/14.json";
import mathsMock15 from "@/mock/maths/15.json";
import mathsMock16 from "@/mock/maths/16.json";
import mathsMock17 from "@/mock/maths/17.json";
import mathsMock18 from "@/mock/maths/18.json";
import mathsMock19 from "@/mock/maths/19.json";
import mathsMock20 from "@/mock/maths/20.json";
import bioMock1 from "@/mock/bio/1.json";
import bioMock2 from "@/mock/bio/2.json";
import bioMock3 from "@/mock/bio/3.json";
import bioMock4 from "@/mock/bio/4.json";
import bioMock5 from "@/mock/bio/5.json";
import bioMock6 from "@/mock/bio/6.json";
import bioMock7 from "@/mock/bio/7.json";
import bioMock8 from "@/mock/bio/8.json";
import bioMock9 from "@/mock/bio/9.json";
import bioMock10 from "@/mock/bio/10.json";
import bioMock11 from "@/mock/bio/11.json";
import bioMock12 from "@/mock/bio/12.json";
import bioMock13 from "@/mock/bio/13.json";
import bioMock14 from "@/mock/bio/14.json";
import bioMock15 from "@/mock/bio/15.json";
import bioMock16 from "@/mock/bio/16.json";
import bioMock17 from "@/mock/bio/17.json";
import bioMock18 from "@/mock/bio/18.json";
import bioMock19 from "@/mock/bio/19.json";
import bioMock20 from "@/mock/bio/20.json";
import accsMock1 from "@/mock/accountancy/1.json";
import accsMock2 from "@/mock/accountancy/2.json";
import accsMock3 from "@/mock/accountancy/3.json";
import accsMock4 from "@/mock/accountancy/4.json";
import accsMock5 from "@/mock/accountancy/5.json";
import accsMock6 from "@/mock/accountancy/6.json";
import accsMock7 from "@/mock/accountancy/7.json";
import accsMock8 from "@/mock/accountancy/8.json";
import accsMock9 from "@/mock/accountancy/9.json";
import accsMock10 from "@/mock/accountancy/10.json";
import accsMock11 from "@/mock/accountancy/11.json";
import accsMock12 from "@/mock/accountancy/12.json";
import accsMock13 from "@/mock/accountancy/13.json";
import accsMock14 from "@/mock/accountancy/14.json";
import accsMock15 from "@/mock/accountancy/15.json";
import accsMock16 from "@/mock/accountancy/16.json";
import accsMock17 from "@/mock/accountancy/17.json";
import accsMock18 from "@/mock/accountancy/18.json";
import accsMock19 from "@/mock/accountancy/19.json";
import accsMock20 from "@/mock/accountancy/20.json";

export interface FullTestMeta {
  id: string;
  title: string;
  subject: string;
  code: string;
  totalQuestions: number;
  durationMinutes: number;
}

interface QuestionOption {
  id: "A" | "B" | "C" | "D";
  text: string;
  isCorrect?: boolean;
  studentSelectionTrap?: string | null;
  mistakeAnalysis?: string;
}

interface RawQuestion {
  questionNumber: number;
  chapter: string;
  topic: string;
  questionText: string;
  hasDiagram?: boolean;
  diagramDescription?: string | null;
  options: QuestionOption[];
  correctOption: "A" | "B" | "C" | "D";
  detailedSolution: string;
}

function mapQuestionsFromDataset(
  testId: string,
  subjectId: string,
  sourceLabel: string,
  notesPrefix: string,
  data: RawQuestion[]
): Question[] {
  const questions: Question[] = [];

  data.forEach((q) => {
    const mappedOptions = q.options.map((opt) => ({
      id: opt.id,
      text: opt.text,
    }));

    const difficulty: "easy" | "medium" | "hard" =
      q.questionNumber <= 15
        ? "easy"
        : q.questionNumber <= 35
          ? "medium"
          : "hard";

    questions.push({
      id: `${testId}_q_${q.questionNumber.toString().padStart(2, "0")}`,
      subjectId,
      questionNumber: q.questionNumber,
      prompt: q.questionText,
      chapter: q.chapter,
      options: mappedOptions,
      correctOptionId: q.correctOption,
      explanation: q.detailedSolution,
      topic: q.topic,
      difficulty,
      pyqSource: sourceLabel,
      aiDiagnosisNotes: `${notesPrefix}: ${q.chapter} - ${q.topic}. Common error trap: ${
        q.options.find((opt) => opt.isCorrect === false)?.studentSelectionTrap || "See detailed solution"
      }`,
    });
  });

  return questions;
}

const PHYSICS_MOCK_DATASETS: Record<number, RawQuestion[]> = {
  1: physicsMock1 as RawQuestion[],
  2: physicsMock2 as RawQuestion[],
  3: physicsMock3 as RawQuestion[],
  4: physicsMock4 as RawQuestion[],
  5: physicsMock5 as RawQuestion[],
  6: physicsMock6 as RawQuestion[],
  7: physicsMock7 as RawQuestion[],
  8: physicsMock8 as RawQuestion[],
  9: physicsMock9 as RawQuestion[],
  10: physicsMock10 as RawQuestion[],
  11: physicsMock11 as RawQuestion[],
  12: physicsMock12 as RawQuestion[],
  13: physicsMock13 as RawQuestion[],
  14: physicsMock14 as RawQuestion[],
  15: physicsMock15 as RawQuestion[],
  16: physicsMock16 as RawQuestion[],
  17: physicsMock17 as RawQuestion[],
  18: physicsMock18 as RawQuestion[],
  19: physicsMock19 as RawQuestion[],
  20: physicsMock20 as RawQuestion[],
};

const CHEMISTRY_MOCK_DATASETS: Record<number, RawQuestion[]> = {
  1: chemistryMock1 as RawQuestion[],
  2: chemistryMock2 as RawQuestion[],
  3: chemistryMock3 as RawQuestion[],
  4: chemistryMock4 as RawQuestion[],
  5: chemistryMock5 as RawQuestion[],
  6: chemistryMock6 as RawQuestion[],
  7: chemistryMock7 as RawQuestion[],
  8: chemistryMock8 as RawQuestion[],
  9: chemistryMock9 as RawQuestion[],
  10: chemistryMock10 as RawQuestion[],
  11: chemistryMock11 as RawQuestion[],
  12: chemistryMock12 as RawQuestion[],
  13: chemistryMock13 as RawQuestion[],
  14: chemistryMock14 as RawQuestion[],
  15: chemistryMock15 as RawQuestion[],
  16: chemistryMock16 as RawQuestion[],
  17: chemistryMock17 as RawQuestion[],
  18: chemistryMock18 as RawQuestion[],
  19: chemistryMock19 as RawQuestion[],
  20: chemistryMock20 as RawQuestion[],
};

const MATHS_MOCK_DATASETS: Record<number, RawQuestion[]> = {
  1: mathsMock1 as RawQuestion[],
  2: mathsMock2 as RawQuestion[],
  3: mathsMock3 as RawQuestion[],
  4: mathsMock4 as RawQuestion[],
  5: mathsMock5 as RawQuestion[],
  6: mathsMock6 as RawQuestion[],
  7: mathsMock7 as RawQuestion[],
  8: mathsMock8 as RawQuestion[],
  9: mathsMock9 as RawQuestion[],
  10: mathsMock10 as RawQuestion[],
  11: mathsMock11 as RawQuestion[],
  12: mathsMock12 as RawQuestion[],
  13: mathsMock13 as RawQuestion[],
  14: mathsMock14 as RawQuestion[],
  15: mathsMock15 as RawQuestion[],
  16: mathsMock16 as RawQuestion[],
  17: mathsMock17 as RawQuestion[],
  18: mathsMock18 as RawQuestion[],
  19: mathsMock19 as RawQuestion[],
  20: mathsMock20 as RawQuestion[],
};

const BIO_MOCK_DATASETS: Record<number, RawQuestion[]> = {
  1: bioMock1 as RawQuestion[],
  2: bioMock2 as RawQuestion[],
  3: bioMock3 as RawQuestion[],
  4: bioMock4 as RawQuestion[],
  5: bioMock5 as RawQuestion[],
  6: bioMock6 as RawQuestion[],
  7: bioMock7 as RawQuestion[],
  8: bioMock8 as RawQuestion[],
  9: bioMock9 as RawQuestion[],
  10: bioMock10 as RawQuestion[],
  11: bioMock11 as RawQuestion[],
  12: bioMock12 as RawQuestion[],
  13: bioMock13 as RawQuestion[],
  14: bioMock14 as RawQuestion[],
  15: bioMock15 as RawQuestion[],
  16: bioMock16 as RawQuestion[],
  17: bioMock17 as RawQuestion[],
  18: bioMock18 as RawQuestion[],
  19: bioMock19 as RawQuestion[],
  20: bioMock20 as RawQuestion[],
};

const ACCS_MOCK_DATASETS: Record<number, RawQuestion[]> = {
  1: accsMock1 as RawQuestion[],
  2: accsMock2 as RawQuestion[],
  3: accsMock3 as RawQuestion[],
  4: accsMock4 as RawQuestion[],
  5: accsMock5 as RawQuestion[],
  6: accsMock6 as RawQuestion[],
  7: accsMock7 as RawQuestion[],
  8: accsMock8 as RawQuestion[],
  9: accsMock9 as RawQuestion[],
  10: accsMock10 as RawQuestion[],
  11: accsMock11 as RawQuestion[],
  12: accsMock12 as RawQuestion[],
  13: accsMock13 as RawQuestion[],
  14: accsMock14 as RawQuestion[],
  15: accsMock15 as RawQuestion[],
  16: accsMock16 as RawQuestion[],
  17: accsMock17 as RawQuestion[],
  18: accsMock18 as RawQuestion[],
  19: accsMock19 as RawQuestion[],
  20: accsMock20 as RawQuestion[],
};

// 50 Questions Loader for CUET Physics Full Mocks (Mocks 1-20)
export function get50PhysicsMockQuestions(mockNumber: number, testId: string): Question[] {
  const dataset = PHYSICS_MOCK_DATASETS[mockNumber] || PHYSICS_MOCK_DATASETS[1] || [];
  return mapQuestionsFromDataset(
    testId,
    "physics",
    `CUET UG Physics Mock Test ${mockNumber}`,
    `Physics CBT Mock ${mockNumber} Diagnostic`,
    dataset
  );
}

// 50 Questions Loader for CUET Chemistry Full Mocks (Mocks 1-20)
export function get50ChemistryMockQuestions(mockNumber: number, testId: string): Question[] {
  const dataset = CHEMISTRY_MOCK_DATASETS[mockNumber] || CHEMISTRY_MOCK_DATASETS[1] || [];
  return mapQuestionsFromDataset(
    testId,
    "chemistry",
    `CUET UG Chemistry Mock Test ${mockNumber}`,
    `Chemistry CBT Mock ${mockNumber} Diagnostic`,
    dataset
  );
}

// 50 Questions Loader for CUET Mathematics Full Mocks (Mocks 1-20)
export function get50MathsMockQuestions(mockNumber: number, testId: string): Question[] {
  const dataset = MATHS_MOCK_DATASETS[mockNumber] || MATHS_MOCK_DATASETS[1] || [];
  return mapQuestionsFromDataset(
    testId,
    "mathematics",
    `CUET UG Mathematics Mock Test ${mockNumber}`,
    `Mathematics CBT Mock ${mockNumber} Diagnostic`,
    dataset
  );
}

// 50 Questions Loader for CUET Biology Full Mocks (Mocks 1-20)
export function get50BiologyMockQuestions(mockNumber: number, testId: string): Question[] {
  const dataset = BIO_MOCK_DATASETS[mockNumber] || BIO_MOCK_DATASETS[1] || [];
  return mapQuestionsFromDataset(
    testId,
    "biology",
    `CUET UG Biology Mock Test ${mockNumber}`,
    `Biology CBT Mock ${mockNumber} Diagnostic`,
    dataset
  );
}

// 50 Questions Loader for CUET Accountancy Full Mocks (Mocks 1-20)
export function get50AccountancyMockQuestions(mockNumber: number, testId: string): Question[] {
  const dataset = ACCS_MOCK_DATASETS[mockNumber] || ACCS_MOCK_DATASETS[1] || [];
  return mapQuestionsFromDataset(
    testId,
    "accountancy",
    `CUET UG Accountancy Mock Test ${mockNumber}`,
    `Accountancy CBT Mock ${mockNumber} Diagnostic`,
    dataset
  );
}

export function getQuestionsForTest(testId: string): {
  testMeta: FullTestMeta;
  questions: Question[];
} {
  const lowerId = testId.toLowerCase();

  // Physics Mocks (physics-mock-1 to physics-mock-20 or any physics test)
  if (lowerId.includes("physics")) {
    const isMockTest = lowerId.includes("mock");
    const match = lowerId.match(/(\d+)/);
    const mockNumber = match && match[1] ? parseInt(match[1], 10) : 1;
    const validMockNumber = mockNumber >= 1 && mockNumber <= 20 ? mockNumber : 1;

    return {
      testMeta: {
        id: testId,
        title: isMockTest
          ? `CUET UG Physics Full Mock Paper ${validMockNumber} (50 Compulsory Qs)`
          : `CUET UG Physics Official Practice Paper ${validMockNumber} (50 Compulsory Qs)`,
        subject: "Physics",
        code: "312",
        totalQuestions: 50,
        durationMinutes: 60,
      },
      questions: get50PhysicsMockQuestions(validMockNumber, testId),
    };
  }

  // Chemistry Mocks (chemistry-mock-1 to chemistry-mock-20 or any chemistry test)
  if (lowerId.includes("chemistry")) {
    const isMockTest = lowerId.includes("mock");
    const match = lowerId.match(/(\d+)/);
    const mockNumber = match && match[1] ? parseInt(match[1], 10) : 1;
    const validMockNumber = mockNumber >= 1 && mockNumber <= 20 ? mockNumber : 1;

    return {
      testMeta: {
        id: testId,
        title: isMockTest
          ? `CUET UG Chemistry Full Mock Paper ${validMockNumber} (50 Compulsory Qs)`
          : `CUET UG Chemistry Official Practice Paper ${validMockNumber} (50 Compulsory Qs)`,
        subject: "Chemistry",
        code: "306",
        totalQuestions: 50,
        durationMinutes: 60,
      },
      questions: get50ChemistryMockQuestions(validMockNumber, testId),
    };
  }

  // Mathematics Mocks (maths-mock-1 to maths-mock-20 or any math test)
  if (lowerId.includes("math")) {
    const isMockTest = lowerId.includes("mock");
    const match = lowerId.match(/(\d+)/);
    const mockNumber = match && match[1] ? parseInt(match[1], 10) : 1;
    const validMockNumber = mockNumber >= 1 && mockNumber <= 20 ? mockNumber : 1;

    return {
      testMeta: {
        id: testId,
        title: isMockTest
          ? `CUET UG Mathematics Full Mock Paper ${validMockNumber} (50 Compulsory Qs)`
          : `CUET UG Mathematics Official Practice Paper ${validMockNumber} (50 Compulsory Qs)`,
        subject: "Mathematics",
        code: "319",
        totalQuestions: 50,
        durationMinutes: 60,
      },
      questions: get50MathsMockQuestions(validMockNumber, testId),
    };
  }

  // Biology Mocks (biology-mock-1 to biology-mock-20 or any bio test)
  if (lowerId.includes("bio")) {
    const isMockTest = lowerId.includes("mock");
    const match = lowerId.match(/(\d+)/);
    const mockNumber = match && match[1] ? parseInt(match[1], 10) : 1;
    const validMockNumber = mockNumber >= 1 && mockNumber <= 20 ? mockNumber : 1;

    return {
      testMeta: {
        id: testId,
        title: isMockTest
          ? `CUET UG Biology Full Mock Paper ${validMockNumber} (50 Compulsory Qs)`
          : `CUET UG Biology Official Practice Paper ${validMockNumber} (50 Compulsory Qs)`,
        subject: "Biology",
        code: "304",
        totalQuestions: 50,
        durationMinutes: 45,
      },
      questions: get50BiologyMockQuestions(validMockNumber, testId),
    };
  }

  // Accountancy Mocks (accountancy-mock-1 to accountancy-mock-20 or any accountancy/accounts/accs test)
  if (lowerId.includes("account") || lowerId.includes("accs")) {
    const isMockTest = lowerId.includes("mock");
    const match = lowerId.match(/(\d+)/);
    const mockNumber = match && match[1] ? parseInt(match[1], 10) : 1;
    const validMockNumber = mockNumber >= 1 && mockNumber <= 20 ? mockNumber : 1;

    return {
      testMeta: {
        id: testId,
        title: isMockTest
          ? `CUET UG Accountancy Full Mock Paper ${validMockNumber} (50 Compulsory Qs)`
          : `CUET UG Accountancy Official Practice Paper ${validMockNumber} (50 Compulsory Qs)`,
        subject: "Accountancy",
        code: "301",
        totalQuestions: 50,
        durationMinutes: 60,
      },
      questions: get50AccountancyMockQuestions(validMockNumber, testId),
    };
  }

  // Default fallback for unknown test IDs
  return {
    testMeta: {
      id: testId,
      title: "Test Not Available",
      subject: "N/A",
      code: "000",
      totalQuestions: 0,
      durationMinutes: 0,
    },
    questions: [],
  };
}
