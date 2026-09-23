import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

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
      {/* Persistent Left Navbar Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area (Offset on Desktop to accommodate Left Navbar) */}
      <main className="flex-1 md:pl-64 lg:pl-72 min-w-0 transition-all w-full max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
