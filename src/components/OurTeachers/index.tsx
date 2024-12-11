"use client"; // Add this to make it a client-side component

import React, { useEffect } from "react";
import Image from "next/image";
import AboutHeading from "../AboutHeading";
import { useFetchTeachers } from "@/hooks/DisplayAllTeachers";

const OurTeachers = () => {
  const { teachers, fetchTeachers, loading } = useFetchTeachers();

  // Fetch teachers when the component mounts
  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return (
    <div className="py-[5rem] w-full flex gap-[8rem] flex-col justify-center items-center">
      <AboutHeading text="Our Teachers" />
      <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-auto justify-center items-center gap-y-[9rem] gap-x-[2rem]">
        {loading && <div>Loading Teachers...</div>}{" "}
        {/* Display loading message */}
        {!loading && teachers.length === 0 && (
          <div>No teachers found.</div> // In case there are no teachers
        )}
        {!loading &&
          teachers.map((teacher, index) => (
            <div
              key={index}
              className="w-full relative flex flex-col justify-center items-center"
            >
              <Image
                width={300}
                height={200}
                src={teacher.image}
                alt={teacher.teacherName}
                className="h-[8rem] w-[8rem] object-cover rounded-full border-[5px] border-yellow-600 overflow-hidden absolute top-[-5rem]"
              />
              <div className="pt-[4rem] pb-5 rounded-t-[2rem] bg-[#efeded] flex flex-col justify-center items-center w-full">
                <span className="text-lg font-sans font-semibold text-center">
                  {teacher.teacherName}
                </span>
                <span className="text-lg font-sans font-thin text-center">
                  {teacher.subject}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OurTeachers;
