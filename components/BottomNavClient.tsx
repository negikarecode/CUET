"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function BottomNavClient() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  if (!isHomepage) {
    return null;
  }

  return <BottomNav />;
}
