import React from "react";
import Link from "next/link"; // If you're using Next.js for routing
import { dashboardsFields } from "@/utility/AdminDashboard";

const AdminNavbar = () => {
  return (
    <div className="w-full bg-[#182C6F] z-100 px-[.5rem] py-3 flex flex-wrap justify-start items-center gap-[1rem]">
      <Link
        href="/admin-dashboard"
        className="text-white px-[.5rem] py-0 md:py-[.3rem] bg-[#182C6F] rounded-lg text-center hover:bg-[#3A5B9C] w-full sm:w-auto"
      >
        Dashboard
      </Link>
      {dashboardsFields.map((field, index) => (
        <Link
          key={index}
          href={field.url}
          className="text-white px-[.5rem] py-0 md:py-[.3rem] bg-[#182C6F] rounded-lg text-center hover:bg-[#3A5B9C] w-full sm:w-auto"
        >
          {field.title}
        </Link>
      ))}
    </div>
  );
};

export default AdminNavbar;
