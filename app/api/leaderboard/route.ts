import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { StreamType } from "@/types";
import { calculateActiveStreak } from "@/lib/gamification";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const supabaseAdmin = createAdminClient();

    // 1. Identify current logged in user if any
    let currentUserId: string | null = null;
    try {
      const supabaseServer = createClient();
      const {
        data: { user },
      } = await supabaseServer.auth.getUser();
      if (user) {
        currentUserId = user.id;
      }
    } catch {
      // Guest or SSR without auth cookies
    }

    // 2. Fetch real student profiles from Supabase
    const { data: profiles, error: pErr } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, target_stream, target_college, target_university, current_streak, last_practice_date, xp, selected_subjects, avatar_url, created_at")
      .order("xp", { ascending: false });

    if (pErr) {
      console.error("[Leaderboard Profiles Query Error]:", pErr);
      return NextResponse.json({ error: pErr.message }, { status: 500 });
    }

    // 3. Fetch real user attempts with test metadata
    const { data: attempts, error: aErr } = await supabaseAdmin
      .from("user_attempts")
      .select("user_id, test_id, is_correct, created_at, tests(id, title, subject)");

    if (aErr) {
      console.warn("[Leaderboard Attempts Query Notice]:", aErr);
    }

    // 4. Calculate locked trophies per test for each user
    // Rule: marks = (correctCount * 5) - (incorrectCount * 1) [NTA authentic marking, no zero clamping]
    // trophies = marks. Locked per test (re-attempting same test adds 0 trophies).
    // Trophies are tracked separately for each subject.
    const userTestMap = new Map<string, {
      userId: string;
      testId: string;
      testTitle: string;
      subject: string;
      correctCount: number;
      incorrectCount: number;
      created_at: string;
    }>();

    (attempts || []).forEach((a: any) => {
      const key = `${a.user_id}_${a.test_id}`;
      if (!userTestMap.has(key)) {
        const rawSubject = a.tests?.subject || "General";
        const testTitle = a.tests?.title || `${rawSubject} Test`;
        userTestMap.set(key, {
          userId: a.user_id,
          testId: a.test_id,
          testTitle,
          subject: rawSubject,
          correctCount: 0,
          incorrectCount: 0,
          created_at: a.created_at || new Date().toISOString(),
        });
      }
      const entry = userTestMap.get(key)!;
      if (a.is_correct) {
        entry.correctCount += 1;
      } else {
        entry.incorrectCount += 1;
      }
    });

    // Aggregate user metrics
    const userAggregates = new Map<string, {
      totalTrophies: number;
      subjectTrophies: Record<string, number>;
      completedTestsCount: number;
      totalAttempted: number;
      totalCorrect: number;
      bestScore: number;
      bestScoreTest: string;
      lastActive: string;
    }>();

    userTestMap.forEach((testData) => {
      if (!userAggregates.has(testData.userId)) {
        userAggregates.set(testData.userId, {
          totalTrophies: 0,
          subjectTrophies: {},
          completedTestsCount: 0,
          totalAttempted: 0,
          totalCorrect: 0,
          bestScore: -Infinity,
          bestScoreTest: "Official Test",
          lastActive: testData.created_at,
        });
      }
      const agg = userAggregates.get(testData.userId)!;
      const testMarks = (testData.correctCount * 5) - (testData.incorrectCount * 1);
      
      agg.totalTrophies += testMarks;
      agg.completedTestsCount += 1;
      agg.totalAttempted += (testData.correctCount + testData.incorrectCount);
      agg.totalCorrect += testData.correctCount;

      if (testMarks > agg.bestScore) {
        agg.bestScore = testMarks;
        agg.bestScoreTest = testData.testTitle;
      }
      if (!agg.lastActive || new Date(testData.created_at).getTime() > new Date(agg.lastActive).getTime()) {
        agg.lastActive = testData.created_at;
      }

      const subj = testData.subject;
      agg.subjectTrophies[subj] = (agg.subjectTrophies[subj] || 0) + testMarks;
    });

    // 5. Build leader entries for all real users
    const allSubjectsSet = new Set<string>([
      "Physics",
      "Chemistry",
      "Mathematics",
      "Accountancy",
      "Economics",
      "Business Studies",
      "History",
      "Political Science",
      "Biology",
      "Computer Science",
      "English",
      "General Test",
    ]);

    // Also include any subjects found in attempts or user selected subjects
    userAggregates.forEach((agg) => {
      Object.keys(agg.subjectTrophies).forEach((s) => allSubjectsSet.add(s));
    });

    (profiles || []).forEach((p) => {
      if (Array.isArray(p.selected_subjects)) {
        p.selected_subjects.forEach((s: string) => allSubjectsSet.add(s));
      }
    });

    const entries = (profiles || []).map((p) => {
      const agg = userAggregates.get(p.id) || {
        totalTrophies: 0,
        subjectTrophies: {},
        completedTestsCount: 0,
        totalAttempted: 0,
        totalCorrect: 0,
        bestScore: 0,
        bestScoreTest: "Official Test",
        lastActive: p.last_practice_date || p.created_at || new Date().toISOString(),
      };

      const streamRaw = (p.target_stream || "science").toLowerCase();
      let stream: StreamType = "science";
      if (streamRaw.includes("comm")) stream = "commerce";
      else if (streamRaw.includes("hum") || streamRaw.includes("art")) stream = "humanities";

      const accuracy = agg.totalAttempted > 0
        ? Math.round((agg.totalCorrect / agg.totalAttempted) * 100)
        : 0;

      const isCurrentUser = Boolean(currentUserId && p.id === currentUserId);

      return {
        userId: isCurrentUser ? p.id : `student_${p.id.substring(0, 8)}`,
        name: p.full_name || "Aspirant",
        stream,
        targetCollege: p.target_college || "Central University",
        targetUniversity: p.target_university || "Delhi University",
        streak: calculateActiveStreak(p.current_streak ?? 0, p.last_practice_date),
        accuracyPercentage: accuracy,
        totalXp: p.xp || 0,
        totalTrophies: agg.totalTrophies,
        subjectTrophies: agg.subjectTrophies,
        completedTestsCount: agg.completedTestsCount,
        selectedSubjects: p.selected_subjects || [],
        isCurrentUser,
        bestScore: agg.bestScore === -Infinity ? 0 : agg.bestScore,
        bestScoreTest: agg.bestScoreTest,
        lastActive: agg.lastActive || p.last_practice_date || p.created_at || new Date().toISOString(),
      };
    });

    return NextResponse.json(
      {
        success: true,
        users: entries,
        currentUserId,
        availableSubjects: Array.from(allSubjectsSet),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    console.error("[Leaderboard Route Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
