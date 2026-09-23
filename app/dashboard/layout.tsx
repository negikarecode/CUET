import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
