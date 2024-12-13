import React from "react";
import { NavLinks } from "@/utility/Navbar";
import { IoMdMenu } from "react-icons/io";
import Link from "next/link";

interface NavLinksComponentProps {
  toggleMenu?: () => void; // Mark as optional
}

const NavLinksComponent: React.FC<NavLinksComponentProps> = ({
  toggleMenu,
}) => {
  return (
    <div className="px-10 py-[1.4rem] z-[10] h-fit absolute top-0 right-0 flex gap-[1rem] flex-row justify-end items-center bg-gradient-to-b from-[#ffedc9] to-[#ffffff] w-full rounded-br-[3rem]">
      {/* Hidden on smaller screens */}
      <div className="hidden lg:flex flex-row justify-center items-center gap-[.8rem]">
        {NavLinks.map((link, index) => (
          <div key={index}>
            <a href={link.url} className="">
              {link.title}
            </a>
          </div>
        ))}
      </div>
      <div className="w-[55%] sm:w-[50%] lg:w-fit gap-[.5rem] flex flex-row lg:justify-center justify-between items-center">
        <Link
          href="/courses"
          className="text-center bg-[#243674] rounded-lg px-[1rem] md:px-[1.5rem] text-lg md:text-xl text-white font-sans font-semibold py-[.3rem] md:py-[.5rem]"
        >
          Courses
        </Link>
        {/* Menu button for smaller screens */}
        <IoMdMenu
          onClick={toggleMenu}
          className="lg:hidden block text-[2.5rem] font-semibold text-black"
        />
      </div>
    </div>
  );
};

export default NavLinksComponent;
