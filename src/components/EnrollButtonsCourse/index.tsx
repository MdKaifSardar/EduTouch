import Link from "next/link";
import React from "react";

const EnrollButtonsCourse = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-[1rem] md:gap-[5rem] w-full">
      {/* import Link from "next/link"; */}
      <Link
        href="/#videoLessons"
        className="hover:bg-[#ffba52] bg-[#FF9700] text-white p-[1rem] rounded-lg text-center font-semibold font-sans text-xl"
      >
        Demo Class
      </Link>
      <Link
        href="/contact#contactForm"
        className="hover:bg-[#ffba52] bg-[#FF9700] text-white p-[1rem] rounded-lg text-center font-semibold font-sans text-xl"
      >
        Book a Consultation
      </Link>
    </div>
  );
};

export default EnrollButtonsCourse;
