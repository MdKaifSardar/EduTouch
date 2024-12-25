import React from "react";
import { NavLinks } from "@/utility/Navbar";
import Link from "next/link";

interface MobileNavMenuProps {
  toggleMenu: () => void;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ toggleMenu }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm">
      <div className="fixed left-0 top-0 h-full w-[70%] bg-gradient-to-r from-[white] to-[#d9d9d9] z-[200] shadow-lg p-5 flex flex-col gap-5">
        <button
          onClick={toggleMenu}
          className="text-black text-2xl font-bold self-end"
        >
          &times;
        </button>

        <div className="flex flex-col gap-4 mt-4">
          <Link href="/courses" className="w-fit text-center hover:bg-[#597af0] bg-[#243674] rounded-lg px-[1.4rem] text-lg text-white font-sans font-semibold py-[.5rem]">
            Courses
          </Link>
          {NavLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-xl font-semibold text-[#243674] hover:underline"
              onClick={toggleMenu}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNavMenu;
