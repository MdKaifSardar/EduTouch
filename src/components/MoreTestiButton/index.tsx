import Link from "next/link";
import React from "react";

const MoreTestiButton = () => {
  return (
    <div className="mt-[2rem] md:text-2xl text-xl bg-transparent text-blue-400">
      <Link href="/courses">View more Testimonials</Link>
    </div>
  );
};

export default MoreTestiButton;
