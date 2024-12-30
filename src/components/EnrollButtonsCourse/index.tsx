import Link from "next/link";
import React from "react";

const EnrollButtonsCourse = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-[1rem] md:gap-[5rem] w-full">
      <Link
        href="/contact"
        className="hover:bg-[#ffd277] text-center p-3 rounded-lg text-white bg-[#ffaa00]"
      >
        Schedule a Demo Class
      </Link>
      <Link
        href="/contact"
        className="hover:bg-[#ffd277] text-center p-3 rounded-lg text-white bg-[#ffaa00]"
      >
        Book a Consultation
      </Link>
    </div>
  );
};

export default EnrollButtonsCourse;
