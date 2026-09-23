import { NextResponse } from "next/server";
import { WeaknessDashboard, WeaknessScore, Topic } from "@/lib/types";
import { AppDataStore, SEED_TOPICS } from "@/lib/data-store";
import {
  calculateOverallHealthScore,
  getWeaknessLevel,
  getTopRecommendations,
  calculateWeaknessFromPacingSummary,
} from "@/lib/weakness-engine";
import { generateSmartAlerts } from "@/lib/alerts";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET() {
  try {
    AppDataStore.initialize();

    let student = AppDataStore.student;
    let scores = Array.from(AppDataStore.weaknessScores.values());

    // Connect directly to public.pacing_analytics_summary and public.profiles
    if (isSupabaseConfigured()) {
      try {
        const { data: authData } = await supabase.auth.getUser();
        const currentUserId = authData?.user?.id || student.id;

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUserId)
          .maybeSingle();

        if (profile) {
          student = {
            ...student,
            id: profile.id,
            name: profile.full_name || student.name,
            target_college: profile.target_college || student.target_college,
          };
        }

        const { data: pacingRows } = await supabase
          .from("pacing_analytics_summary")
          .select("*")
          .eq("user_id", currentUserId);

        if (pacingRows && pacingRows.length > 0) {
          scores = calculateWeaknessFromPacingSummary(pacingRows as any, currentUserId);
        }
      } catch (err) {
        console.warn("Pacing analytics summary fetch fallback:", err);
      }
    }

    // Tested topic IDs
    const testedTopicIds = new Set(scores.map((s) => s.topic_id));

    // Untested topics
    const untested: Topic[] = SEED_TOPICS.filter((t) => !testedTopicIds.has(t.id));

    // Grouping by level
    const critical: WeaknessScore[] = scores.filter((s) => s.weakness_level === "critical");
    const weak: WeaknessScore[] = scores.filter((s) => s.weakness_level === "weak");
    const average: WeaknessScore[] = scores.filter((s) => s.weakness_level === "average");
    const strong: WeaknessScore[] = scores.filter((s) => s.weakness_level === "strong");
    const excellent: WeaknessScore[] = scores.filter((s) => s.weakness_level === "excellent");

    // Overall score calculation
    const overallScore = calculateOverallHealthScore(scores);
    const overallLevel = getWeaknessLevel(overallScore);

    // Top 3 recommendations
    const rawRecommendations = getTopRecommendations(scores, 3);

    // If fewer than 3 recommendations from weak/critical, add from untested
    if (rawRecommendations.length < 3 && untested.length > 0) {
      for (const unt of untested) {
        if (rawRecommendations.length >= 3) break;
        rawRecommendations.push({
          topic_id: unt.id,
          topic_name: unt.topic_name,
          subject_name: "Political Science",
          weakness_score: 0,
          weakness_level: "untested",
          questions_ready: 20,
          estimated_minutes: unt.estimated_time || 25,
          priority: rawRecommendations.length + 1,
        });
      }
    }

    // Check if topics have AI content chunks available
    const availableTopicIdsWithChunks = new Set(
      (AppDataStore.contentChunks || []).map((c) => c.topic_id)
    );

    const topRecommendations = rawRecommendations.map((rec) => ({
      ...rec,
      has_ai_content: availableTopicIdsWithChunks.has(rec.topic_id),
    }));


    // Smart Alerts
    const alerts = generateSmartAlerts(scores);

    const dashboard: WeaknessDashboard = {
      student,
      overall_score: overallScore,
      overall_level: overallLevel,
      total_topics: SEED_TOPICS.length,
      topics_by_level: {
        critical,
        weak,
        average,
        strong,
        excellent,
        untested,
      },
      top_3_recommendations: topRecommendations,
      recent_alerts: alerts,
    };

    return NextResponse.json(dashboard);
  } catch (error: unknown) {
    console.error("Failed to assemble weakness dashboard:", error);
    return NextResponse.json(
      { error: "Internal server error retrieving dashboard" },
      { status: 500 }
    );
  }
}
