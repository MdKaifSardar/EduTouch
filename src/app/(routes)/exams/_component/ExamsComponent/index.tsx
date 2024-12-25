"use client";

import AboutHeading from "@/components/AboutHeading";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useFetchExams } from "@/hooks/DisplayAllExams";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const ExamsComponent: React.FC = () => {
  const { exams, fetchExams, loading } = useFetchExams();

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-[2rem]">
      <AboutHeading text="Upcoming Exams" />
      {loading ? (
        <LoadingSpinner text="Loading Exams" />
      ) : exams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto w-[90%] md:w-full h-fit gap-y-[3rem] gap-x-[3rem] xl:gap-x-[10rem]">
          {exams.map((exam) => (
            <div
              className="rounded-xl gap-[1rem] md:gap-[3rem] px-[2rem] md:px-[3rem] flex flex-col justify-center items-start w-full h-full py-[1rem] md:py-[3rem] bg-[#D9D9D9FF]"
              key={exam._id}
            >
              <span className="w-full text-4xl font-semibold font-sans text-center">
                {exam.examName}
              </span>
              <div className="w-full h-fit flex flex-col justify-center items-start">
                <span className="text-xl">
                  Date: <strong>{exam.examDate}</strong>
                </span>
                <Link
                  href={exam.officialSiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-xl font-normal font-sans underline"
                >
                  Official Website
                </Link>
                <div className="pt-[.5rem] gap-[.5rem] flex flex-col justify-center items-start">
                  <span className="text-xl font-semibold font-sans">
                    Syllabus Covered:
                  </span>
                  <span className="font-normal pl-[.3rem]">
                    {exam.courseSyllabus}
                  </span>
                </div>
                <p className="pt-[.5rem]">{exam.description}</p>
              </div>
              <div className="flex flex-row justify-between items-center w-full h-fit">
                <button className="bg-[#FF9700] text-white p-[1rem] rounded-lg text-center font-semibold font-sans text-xl">
                  Enroll Now
                </button>
                <Image
                  width={300}
                  height={200}
                  src={exam.image}
                  alt={exam.examName}
                  className="object-cover w-[30%] h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No exams available.</p>
      )}
    </div>
  );
};

export default ExamsComponent;
