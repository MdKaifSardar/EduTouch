"use client";

import { useEffect } from "react";
import { useFetchCourses } from "@/hooks/DisplayAllCourses";
import Image from "next/image";

const OurCourses = () => {
  const { courses, fetchCourses, loading } = useFetchCourses();
  const truncateText = (text: string, wordLimit: number): string => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ...";
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-[2rem]">
      <div className="text-5xl text-center w-full">Our Courses</div>

      {loading && (
        <div className="text-xl text-blue-500">Loading Courses...</div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[2rem] grid-rows-auto w-full h-fit">
          {courses.map((course, index) => (
            <div
              key={index}
              className="pl-[1rem] md:pl-[2rem] relative bg-[#ffe8ba] gap-0 sm:gap-[1rem] lg:gap-[2rem] rounded-lg w-full flex flex-row justify-between items-center"
            >
              <div className="py-[1rem] w-full flex flex-col gap-[1rem] justify-center items-start">
                <div className="flex flex-col justify-start items-start">
                  <span className="text-left text-xl md:text-3xl font-semibold">
                    {course.courseName}
                  </span>
                  <span className="underline text-left text-lg font-normal">
                    View Course Curriculum
                  </span>
                  <span className="text-left text-lg font-semibold">
                    <span className="underline">Course Time:</span>{" "}
                    {course.courseDuration}
                  </span>
                </div>
                <p className="leading-none text-lg text-left">
                  {truncateText(course.courseDescription, 20)}
                </p>
              </div>
              <div className="relative overflow-hidden flex flex-col justify-center items-center rounded-l-[10rem] w-full h-full">
                <Image
                  src={course.image}
                  alt={course.courseName}
                  width={300}
                  height={200}
                  className="object-cover w-full h-[25rem] md:h-[20rem]"
                />
                <button className="absolute rounded-xl text-xl text-white bg-[#3554bb] text-center p-2">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OurCourses;
