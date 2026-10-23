import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserEntitlement } from "@/lib/payments/entitlements";
import SubjectMocksClient from "@/components/dashboard/mocks/SubjectMocksClient";
import { getSubjectMetadata } from "@/lib/config/subjectRegistry";
import { CUET_SUBJECTS } from "@/lib/data/subjects";
import { getUserProgress } from "@/lib/user-progress";
import { RecordedTestAttempt } from "@/types";


interface SubjectPageProps {
  params: {
    subject: string;
  };
}

export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const subjectKey = decodeURIComponent(params.subject).toLowerCase().trim();
  const metadata = getSubjectMetadata(subjectKey);
  const subjectConfig = CUET_SUBJECTS.find(
    (s) => s.id === subjectKey || s.name.toLowerCase() === subjectKey
  );
  const subjectName =
    metadata?.name ??
    subjectConfig?.name ??
    (subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1).replace(/[-_]/g, " "));

  return {
    title: `${subjectName} CUET Mock Exams | Full CBT Simulation Papers`,
    description: `Access official 50-question compulsory full-syllabus CUET UG CBT mock papers for ${subjectName} with instant score analysis and percentiles.`,
  };
}

export default async function SubjectMocksListPage({ params }: SubjectPageProps) {
  let isPremium = false;
  let isVerified = false;
  let userId: string | undefined;
  let initialServerAttempts: RecordedTestAttempt[] = [];

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.id) {
      userId = user.id;
      const entitlement = await getUserEntitlement(user.id);
      isPremium = entitlement.isPremium;
      isVerified = true;

      const progress = await getUserProgress(user.id, params.subject);
      initialServerAttempts = progress.serverAttempts;
    }
  } catch (err) {
    console.warn("[SubjectMocksListPage] Server entitlement check notice:", err);
  }

  return (
    <SubjectMocksClient
      subject={params.subject}
      initialIsPremium={isPremium}
      initialIsVerified={isVerified}
      initialUserId={userId}
      initialServerAttempts={initialServerAttempts}
    />
  );
}
