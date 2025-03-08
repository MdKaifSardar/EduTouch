"use client";

import React, { useEffect, useState } from "react";
import { useFetchCourses } from "@/hooks/DisplayAllCourses";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner";

const OurCourses = () => {
  const { courses, fetchCourses, loading } = useFetchCourses();
  const [showPopup, setShowPopup] = useState(false);

  const truncateText = (text: string, wordLimit: number): string => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " ...";
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-[1rem]">
      <div className="text-5xl font-semibold text-center w-full">
        Our Courses
      </div>

      {loading && <LoadingSpinner text="Loading Courses" />}

      {!loading && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[3rem] grid-rows-auto w-[90%] md:w-[75%] h-fit">
          {courses &&
            courses.map((course) => (
              <div
                key={course._id}
                className="shadow-lg pl-[1rem] md:pl-[1rem] relative bg-[#ffe8ba] gap-[.3rem] sm:gap-[1rem] lg:gap-[2rem] rounded-lg w-full flex flex-row justify-between items-center"
              >
                <div className="py-[1rem] w-full flex flex-col gap-[1rem] justify-center items-start">
                  <div className="flex flex-col justify-start items-start">
                    <span className="text-left text-xl md:text-3xl font-semibold">
                      {course.courseName}
                    </span>
                    <a
                      href={`/api/course/course-download?id=${course._id}`}
                      className="underline text-left text-lg font-normal text-blue-600 hover:text-blue-800"
                      download="gk.pdf"
                    >
                      View Course Curriculum
                    </a>
                    <span className="w-full flex flex-row justify-start gap-[.3rem] items-center">
                      <span className="text-left text-sm font-semibold">
                        Course Duration: {course.courseDuration}
                      </span>
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
                    className="object-cover w-full h-[25rem] md:h-[30rem]"
                  />

                  <button
                    onClick={() => setShowPopup(true)}
                    className="absolute rounded-xl text-xl text-white hover:bg-blue-600 bg-[#3554bb] text-center p-2"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[30%] shadow-lg flex flex-col gap-4 relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-2xl font-bold"
            >
              &times;
            </button>
            <p className="text-center">Choose your mode of enrollment:</p>
            <div className="flex justify-around mt-4">
              <Link
                href="/contact"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              >
                Offline
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=co.thanos.arsgp&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
              >
                Online
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurCourses;
