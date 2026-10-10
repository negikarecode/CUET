"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell manages root-level layout composition.
 * - Authenticated Dashboard routes (/dashboard and subroutes) manage their own
 *   dedicated navigation (DashboardNavbar), left sidebar (DashboardSidebar),
 *   and internal scrollable viewport without the legacy root navbar or footer.
 *   Mobile devices receive the fixed BottomNav for one-tap navigation.
 * - Computer-Based Test (CBT) simulator routes (/test/*) render in full-screen exam mode
 *   with zero external navbars, footers, or bottom bars.
 * - Public marketing and utility routes receive the global Navbar, main wrapper, Footer, and BottomNav.
 */
export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const isDashboardRoute = Boolean(
    pathname && (pathname === "/dashboard" || pathname.startsWith("/dashboard/"))
  );

  const isCbtTestRoute = Boolean(
    pathname && pathname.startsWith("/test/")
  );

  const isLandingRoute = pathname === "/";

  // If on CBT simulator, full screen with no navbars or bottom navs
  if (isCbtTestRoute) {
    return <>{children}</>;
  }

  // Landing page route: clean viewport without dashboard bottom tab bar or legacy navs
  if (isLandingRoute) {
    return <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>;
  }

  // If on authenticated dashboard, no duplicate upper navbar or footer, but mount mobile BottomNav
  if (isDashboardRoute) {
    return (
      <>
        {children}
        <BottomNav />
      </>
    );
  }

  // Other public marketing & utility routes
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-16 md:pb-0">{children}</main>
      <Footer />
      <BottomNav />
    </>
  );
}
