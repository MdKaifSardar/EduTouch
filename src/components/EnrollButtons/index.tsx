import Link from "next/link";
import React from "react";

const EnrollButtons = () => {
  return (
    <div className="w-full gap-[1rem] md:gap-[2rem] h-[30vh] md:h-[10vh] flex flex-col md:flex-row justify-center items-center">
      <Link
        href="/"
        className="text-center px-[1rem] flex flex-col justify-center items-center font-sans font-semibold text-white h-full rounded-lg bg-[#ffaa00]"
      >
        Schedule a Demo Class
      </Link>
      <Link
        href="/"
        className="text-center px-[1rem] flex flex-col justify-center items-center font-sans font-semibold text-white h-full rounded-lg bg-[#3554bb]"
      >
        Enroll Now
      </Link>
      <Link
        href="/"
        className="text-center px-[1rem] flex flex-col justify-center items-center font-sans font-semibold text-white h-full rounded-lg bg-[#ffaa00]"
      >
        Book a Consultation
      </Link>
    </div>
  );
};

export default EnrollButtons;
