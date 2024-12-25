"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute =
    pathname.startsWith("/admin-dashboard/admin-routes") || pathname === "/admin-login";

  return (
    <div>
      {/* Don't render Navbar and Footer for admin routes or admin login */}
      {!isAdminRoute && <Navbar />}
      <div className="gap-[2rem] w-full flex flex-col justify-center items-center">
        {children}
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
