import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DashboardHomePage, { metadata as dashboardHomeMetadata } from "@/lib/dashboard-views/dashboard-home";
import StandingPage, { metadata as standingMetadata } from "@/lib/dashboard-views/standing";
import ProfilePage, { metadata as profileMetadata } from "@/lib/dashboard-views/profile";
import SessionsPage, { metadata as sessionsMetadata } from "@/lib/dashboard-views/sessions";
import WeaknessRadarPage, { metadata as radarMetadata } from "@/lib/dashboard-views/radar";
import SubjectMocksListPage, { generateMetadata as generateMocksSubjectMetadata } from "@/lib/dashboard-views/mocks-subject";
import MockAnalysisPage from "@/lib/dashboard-views/mock-analysis";
import SubjectPYQListPage, { generateMetadata as generatePYQSubjectMetadata } from "@/lib/dashboard-views/pyqs-subject";
import PYQAnalysisPage from "@/lib/dashboard-views/pyq-analysis";
import SubjectPracticeDetailPage, { generateMetadata as generatePracticeSubjectMetadata } from "@/lib/dashboard-views/practice-subject";
import NoteDetailPage, { generateMetadata as generateNotesDetailMetadata } from "@/lib/dashboard-views/notes-detail";

export const dynamic = "force-dynamic";

interface DashboardPageProps {
  params: {
    slug?: string[];
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: DashboardPageProps): Promise<Metadata> {
  const slug = params?.slug || [];

  if (slug.length === 0) {
    return dashboardHomeMetadata;
  }

  const [first, second, third] = slug;

  if (first === "standing") {
    return standingMetadata;
  }

  if (first === "profile") {
    return profileMetadata;
  }

  if (first === "sessions") {
    return sessionsMetadata;
  }

  if (first === "radar") {
    return radarMetadata;
  }

  if (first === "mocks") {
    if (second === "analysis" && third) {
      return {
        title: "Mock Exam Analysis | CUET AI-Prep",
        description: "Detailed test performance analysis, accuracy breakdown, and solution review.",
      };
    }
    if (second) {
      return generateMocksSubjectMetadata({ params: { subject: second } });
    }
  }

  if (first === "pyqs") {
    if (second === "analysis" && third) {
      return {
        title: "PYQ Exam Analysis | CUET AI-Prep",
        description: "Detailed past year paper performance analysis, accuracy breakdown, and solution review.",
      };
    }
    if (second) {
      return generatePYQSubjectMetadata({ params: { subject: second } });
    }
  }

  if (first === "practice") {
    if (second) {
      return generatePracticeSubjectMetadata({ params: { subject: second } });
    }
  }

  if (first === "notes") {
    if (second && third) {
      return generateNotesDetailMetadata({ params: { subject: second, slug: third } });
    }
  }

  return { title: "Dashboard | CUET AI-Prep" };
}

export default async function DashboardCatchAllPage({ params }: DashboardPageProps) {
  const slug = params?.slug || [];

  // Root /dashboard
  if (slug.length === 0) {
    return <DashboardHomePage />;
  }

  const [first, second, third] = slug;

  // /dashboard/standing
  if (first === "standing") {
    return <StandingPage />;
  }

  // /dashboard/profile
  if (first === "profile") {
    return <ProfilePage />;
  }

  // /dashboard/sessions
  if (first === "sessions") {
    return <SessionsPage />;
  }

  // /dashboard/radar
  if (first === "radar") {
    return <WeaknessRadarPage />;
  }

  // /dashboard/mocks/analysis/[attemptId]
  if (first === "mocks" && second === "analysis" && third) {
    return <MockAnalysisPage attemptId={third} />;
  }

  // /dashboard/mocks/[subject]
  if (first === "mocks" && second) {
    return <SubjectMocksListPage params={{ subject: second }} />;
  }

  // /dashboard/pyqs/analysis/[attemptId]
  if (first === "pyqs" && second === "analysis" && third) {
    return <PYQAnalysisPage attemptId={third} />;
  }

  // /dashboard/pyqs/[subject]
  if (first === "pyqs" && second) {
    return <SubjectPYQListPage params={{ subject: second }} />;
  }

  // /dashboard/practice/[subject]
  if (first === "practice" && second) {
    return <SubjectPracticeDetailPage params={{ subject: second }} />;
  }

  // /dashboard/notes/[subject]/[slug]
  if (first === "notes" && second && third) {
    return <NoteDetailPage params={{ subject: second, slug: third }} />;
  }

  notFound();
}
