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
    <div className="min-h-screen bg-[#FAF7EE] flex flex-col md:flex-row w-full max-w-full overflow-x-hidden">
      {/* Left Sidebar (sticky top-0 h-screen overflow-y-auto on desktop) */}
      <DashboardSidebar />

      {/* Main Content Area (flex-1 overflow-y-auto min-h-screen) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen w-full max-w-full">
        {/* Top Horizontal Bar (sticky top-0 z-30 with right-aligned student utilities & no logo) */}
        <DashboardNavbar />

        <main className="flex-1 min-w-0 w-full max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
