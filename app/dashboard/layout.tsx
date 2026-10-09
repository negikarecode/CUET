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
    <div className="h-screen w-full max-w-full bg-[#F8FAFC] flex flex-col md:flex-row overflow-hidden">
      {/* Left Sidebar (fixed height h-screen, persistent on desktop) */}
      <DashboardSidebar />

      {/* Main Content Area (flex-1 column with sticky navbar and scrollable main content) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden w-full max-w-full">
        {/* Top Horizontal Bar */}
        <DashboardNavbar />

        {/* Scrollable Main Content Container */}
        <main className="flex-1 min-w-0 overflow-y-auto w-full max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
