import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const cuetAuth = cookieStore.get("cuet_auth")?.value === "1";

  let hasAuthUser = false;
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    hasAuthUser = Boolean(user);
  } catch {
    // If Supabase check fails/offline, handled gracefully
  }

  if (!hasAuthUser && !cuetAuth) {
    redirect("/signup");
  }

  return (
    <div className="min-h-screen w-full max-w-full bg-[var(--bg)]">
      {/* Left Sidebar (fixed on desktop, 240px) */}
      <DashboardSidebar />

      {/* Main Content Area (offset by fixed 240px sidebar on desktop) */}
      <div className="md:pl-[240px] flex flex-col min-w-0 w-full max-w-full">
        {/* Top Horizontal Bar (56px) */}
        <DashboardNavbar />

        {/* Main Content Container */}
        <main className="flex-1 min-w-0 w-full max-w-full pb-20 md:pb-8">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
