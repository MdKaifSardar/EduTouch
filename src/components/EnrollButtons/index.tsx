import Link from "next/link";
import React from "react";

const EnrollButtons = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-[1rem] md:gap-[2rem] w-full">
      <Link
        href="/contact"
        className="hover:bg-[#ffd277] text-center p-3 rounded-lg text-white bg-[#ffaa00]"
      >
        Schedule a Demo Class
      </Link>
      <Link
        href="/contact"
        className="hover:bg-blue-500 text-center p-3 rounded-lg text-white bg-[#3554bb]"
      >
        Enroll Now
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

export default EnrollButtons;
