import Link from "next/link";
import React from "react";

const EnrollButtonsCourse = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-[1rem] md:gap-[5rem] w-full">
      <Link
        href="https://play.google.com/store/apps/details?id=co.thanos.arsgp&hl=en_IN"
        target="_blank"
        rel="noopener noreferrer" // Important for security reasons
        className="hover:bg-[#ffba52] bg-[#FF9700] text-white p-[1rem] rounded-lg text-center font-semibold font-sans text-xl"
      >
        Schedule a Demo Class
      </Link>
      <Link
        href="https://play.google.com/store/apps/details?id=co.thanos.arsgp&hl=en_IN"
        target="_blank"
        rel="noopener noreferrer" // Important for security reasons
        className="hover:bg-[#ffba52] bg-[#FF9700] text-white p-[1rem] rounded-lg text-center font-semibold font-sans text-xl"
      >
        Book a Consultation
      </Link>
    </div>
  );
};

export default EnrollButtonsCourse;
