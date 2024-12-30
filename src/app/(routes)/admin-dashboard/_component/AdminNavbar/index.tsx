"use client";
import React, { useState } from "react";
import Link from "next/link";
import { dashboardsFields } from "@/utility/AdminDashboard";
import { HiOutlineMenuAlt1, HiOutlineX, HiOutlineLogout } from "react-icons/hi"; // Import Logout icon

const AdminNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Delete the token from cookies
    document.cookie =
      "token=; path=/; SameSite=Strict; Secure; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // Redirect to the admin dashboard
    window.location.href = "/admin-login";
  };

  return (
    <>
      {/* Top Navbar */}
      <div
        className={`w-full bg-[#182C6F] z-100 px-4 py-3 flex flex-col lg:flex-row justify-between items-center ${
          isSidebarOpen ? "lg:hidden" : ""
        }`}
      >
        <div className="hidden lg:flex flex-wrap justify-start items-center gap-[.5rem] w-full lg:w-auto">
          <Link
            href="/admin-dashboard"
            className="text-white px-[.5rem] py-0 md:py-[.3rem] bg-[#182C6F] rounded-lg text-center hover:bg-[#3A5B9C]"
          >
            Dashboard
          </Link>
          {dashboardsFields.map((field, index) => (
            <Link
              key={index}
              href={field.url}
              className="text-white px-[.5rem] py-0 md:py-[.3rem] bg-[#182C6F] rounded-lg text-center hover:bg-[#3A5B9C]"
            >
              {field.title}
            </Link>
          ))}
        </div>

        {/* This div will contain the logout button below the links area */}
        <div className="w-full lg:w-auto hidden lg:flex justify-end mt-2 lg:mt-0">
          <button
            className="text-white flex items-center gap-2 px-4 py-2 rounded-lg mb-2 bg-red-600 hover:bg-red-700"
            onClick={handleLogout}
          >
            <HiOutlineLogout />
            Logout
          </button>
        </div>

        {/* Menu Icon for smaller screens */}
        <button
          className="lg:hidden text-white text-2xl ml-auto"
          onClick={toggleSidebar}
        >
          <HiOutlineMenuAlt1 />
        </button>
      </div>

      {/* Sidebar for smaller screens */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-80"
            onClick={toggleSidebar}
          ></div>

          {/* Sidebar with Gradient */}
          <div className="w-[80%] h-full p-4 flex flex-col relative z-10 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900">
            {/* Close Button */}
            <button
              className="text-white text-3xl mb-4 self-end"
              onClick={toggleSidebar}
            >
              <HiOutlineX />
            </button>
            <Link
              href="/admin-dashboard"
              className="text-white pb-[.5rem] px-4 rounded-lg hover:bg-[#3A5B9C]"
              onClick={toggleSidebar}
            >
              Dashboard
            </Link>
            {dashboardsFields.map((field, index) => (
              <Link
                key={index}
                href={field.url}
                className="text-white py-[.5rem] px-4 rounded-lg hover:bg-[#3A5B9C]"
                onClick={toggleSidebar}
              >
                {field.title}
              </Link>
            ))}
            {/* Logout Button (At the very bottom of Sidebar) */}
            <button
              className="text-white w-fit flex items-center gap-2 mt-auto px-4 py-2 rounded-lg mb-2 bg-red-600 hover:bg-red-700"
              onClick={handleLogout}
            >
              <HiOutlineLogout />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
