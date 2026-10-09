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
    <div className="min-h-screen w-full max-w-full bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Left Sidebar (persistent on desktop, sticky) */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full max-w-full">
        {/* Top Horizontal Bar (sticky on desktop) */}
        <DashboardNavbar />

        {/* Main Content Container (natural document flow, single scroll surface, safe mobile bottom clearance) */}
        <main className="flex-1 min-w-0 w-full max-w-full pb-24 md:pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
