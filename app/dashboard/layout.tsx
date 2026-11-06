import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let initialIsPremium = false;
  let initialUserId: string | undefined = undefined;
  let initialUserEmail: string | undefined = undefined;
  let initialUserName: string | undefined = undefined;

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      initialUserId = user.id;
      initialUserEmail = user.email;
      initialUserName = user.user_metadata?.full_name || user.user_metadata?.name;
      const { getUserEntitlement } = await import("@/lib/payments/entitlements");
      const ent = await getUserEntitlement(user.id);
      initialIsPremium = Boolean(ent.isPremium);
    }
  } catch {}

  return (
    <div className="min-h-screen w-full max-w-full bg-[var(--bg)]">
      {/* Left Sidebar (fixed on desktop, 240px) */}
      <DashboardSidebar
        initialIsPremium={initialIsPremium}
        initialUserId={initialUserId}
        initialUserEmail={initialUserEmail}
        initialUserName={initialUserName}
      />

      {/* Main Content Area (offset by fixed 240px sidebar on desktop) */}
      <div className="md:pl-[240px] flex flex-col min-w-0 w-full max-w-full">
        {/* Top Horizontal Bar (56px) */}
        <DashboardNavbar
          initialIsPremium={initialIsPremium}
          initialUserId={initialUserId}
          initialUserEmail={initialUserEmail}
          initialUserName={initialUserName}
        />

        {/* Main Content Container */}
        <main className="flex-1 min-w-0 w-full max-w-full pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
