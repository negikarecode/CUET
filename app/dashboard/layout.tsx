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
    <div className="min-h-screen w-full max-w-full bg-[#F8FAFC]">
      {/* Left Sidebar (fixed on desktop, stays fixed while scrolling) */}
      <DashboardSidebar />

      {/* Main Content Area (offset by fixed sidebar width on desktop) */}
      <div className="md:pl-64 lg:pl-72 flex flex-col min-w-0 w-full max-w-full">
        {/* Top Horizontal Bar (sticky on desktop) */}
        <DashboardNavbar />

        {/* Main Content Container (no extra padding in end) */}
        <main className="flex-1 min-w-0 w-full max-w-full pb-16 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
