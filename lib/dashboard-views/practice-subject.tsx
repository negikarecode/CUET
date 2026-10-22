import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserEntitlement } from "@/lib/payments/entitlements";
import SubjectPracticeClient from "@/components/dashboard/practice/SubjectPracticeClient";
import { getSubjectMetadata } from "@/lib/config/subjectRegistry";


interface PageProps {
  params: {
    subject: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decoded = decodeURIComponent(params.subject).toLowerCase().trim();
  const meta = getSubjectMetadata(decoded);
  const name = meta?.name || (decoded.charAt(0).toUpperCase() + decoded.slice(1).replace(/-/g, " "));

  return {
    title: `${name} CUET Practice Tests | Unit-wise Drills`,
    description: `Targeted unit-wise topic practice tests for ${name} covering authentic CUET UG syllabus with negative marking simulation.`,
  };
}

export default async function SubjectPracticeDetailPage({ params }: PageProps) {
  let isPremium = false;
  let isVerified = false;
  let userId: string | undefined;

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
    }
  } catch (err) {
    console.warn("[SubjectPracticeDetailPage] Server entitlement check notice:", err);
  }

  return (
    <SubjectPracticeClient
      subject={params.subject}
      initialIsPremium={isPremium}
      initialIsVerified={isVerified}
      initialUserId={userId}
    />
  );
}
