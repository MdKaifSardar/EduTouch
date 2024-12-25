import EnrollButtonsCourse from "@/components/EnrollButtonsCourse";
import OurCourses from "@/components/OurCourses";
import React from "react";

const page = () => {
  return (
    <div className="mb-[4rem] mt-[8rem] md:mt-[8rem] gap-[2rem] md:gap-[3rem] w-[95%] md:w-[85%] h-fit flex flex-col justify-center items-center">
      <OurCourses />
      <EnrollButtonsCourse />
    </div>
  );
};

export default page;
