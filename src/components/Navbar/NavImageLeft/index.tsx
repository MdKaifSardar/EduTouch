import { NavLogo, NavPerson } from "@/utility/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavImageLeft = () => {
  return (
    <Link href="/" className="w-full h-fit">
      <div className="flex flex-row justify-between items-center z-[20] py-[2rem] sm:py-[3rem] absolute pl-0 md:pl-[1rem] bg-white w-[45%] md:w-[40%] lg:w-[30%] xl:w-[20%] rounded-br-full">
        <Image
          width={300}
          height={200}
          src={NavLogo}
          alt="nav logo"
          className="w-[60%] h-auto object-cover"
        />
        <Image
          className="absolute right-[2rem] sm:right-[2.5rem] bottom-[.5rem] sm:bottom-[1rem] h-[4rem] sm:h-[7rem] md:h-[7.5rem] w-auto object-contain "
          width={300}
          height={200}
          src={NavPerson}
          alt="Nav image"
        />
      </div>
    </Link>
  );
};

export default NavImageLeft;
