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
    pathname === "/admin-dashboard" || pathname?.startsWith("/admin-login");
    

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div className="gap-[2rem] w-full flex flex-col justify-center items-center">
        {children}
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}
