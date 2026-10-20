import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserEntitlement } from "@/lib/payments/entitlements";
import SubjectPYQClient from "@/components/dashboard/pyqs/SubjectPYQClient";
import { normalizeSubject } from "@/lib/analytics";

export const dynamic = "force-dynamic";

interface SubjectPYQPageProps {
  params: {
    subject: string;
  };
}

export async function generateMetadata({ params }: SubjectPYQPageProps): Promise<Metadata> {
  const subjectKey = decodeURIComponent(params.subject).toLowerCase().trim();
  const normalized = normalizeSubject(subjectKey);

  return {
    title: `${normalized.name} CUET Previous Year Questions (PYQs) | Official Shift Papers`,
    description: `Practice official past year CUET UG question papers for ${normalized.name} with real CBT test interface, instant scoring, and NCERT solutions.`,
  };
}

export default async function SubjectPYQListPage({ params }: SubjectPYQPageProps) {
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
    console.warn("[SubjectPYQListPage] Server entitlement check notice:", err);
  }

  return (
    <SubjectPYQClient
      subject={params.subject}
      initialIsPremium={isPremium}
      initialIsVerified={isVerified}
      initialUserId={userId}
    />
  );
}
