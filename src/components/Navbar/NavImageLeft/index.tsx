import { NavLogo, NavPerson } from "@/utility/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavImageLeft = () => {
  return (
    <Link href="/" className="w-full h-fit">
      <div className="flex flex-row justify-between items-center z-[20] md:py-[.5rem] py-[1rem] absolute pl-0 md:pl-[1rem] bg-white w-[45%] lg:w-[30%] xl:w-[20%] rounded-br-full">
        <div className="flex flex-col justify-center items-start md:items-center">
          <Image
            width={300}
            height={200}
            src={NavLogo}
            alt="nav logo"
            className=" w-full] h-auto object-cover"
          />
          <span className="pl-[1rem] md:font-normal font-semibold w-full h-full text-xs md:text-[.9rem] text-left">
            Coaching Institute
          </span>
          <span className="pl-[1rem] hidden font-semibold md:block w-full h-full text-xs md:text-[.9rem] text-left">
            Your Success Is Our Goal
          </span>
        </div>
        <Image
          className="h-[5rem] md:h-[8rem] w-auto object-contain md:pr-[2.5rem] pr-[1.4rem]"
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
