import { NavLogo } from "@/utility/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavImageLeft = () => {
  return (
    <Link href="/" className="w-full h-fit">
      <div className="flex flex-row justify-between items-center z-[20] absolute w-[50%] md:w-[40%] lg:w-[30%] xl:w-[25%]">
        <Image
          width={300}
          height={200}
          src={NavLogo}
          alt="nav logo"
          className="w-full h-auto object-cover"
        />
      </div>
    </Link>
  );
};

export default NavImageLeft;
