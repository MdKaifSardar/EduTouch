"use client";

import React, { useEffect, useState } from "react";
import { useFetchCourses } from "@/hooks/DisplayAllCourses";
import Image from "next/image";
import CoursePopup from "./CoursePopup";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner";

interface Course {
  _id: string;
  courseName: string;
  courseHighlights: string;
  courseSyllabus: string;
  courseDescription: string;
  courseDuration: string;
  image: string;
}

const OurCourses = () => {
  const { courses, fetchCourses, loading } = useFetchCourses();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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

      {loading && <LoadingSpinner text="Loading Courses" />}

      {!loading && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[2rem] grid-rows-auto w-full h-fit">
          {courses &&
            courses.map((course) => (
              <div
                key={course._id}
                className="pl-[1rem] md:pl-[2rem] relative bg-[#ffe8ba] gap-0 sm:gap-[1rem] lg:gap-[2rem] rounded-lg w-full flex flex-row justify-between items-center"
              >
                <div className="py-[1rem] w-full flex flex-col gap-[1rem] justify-center items-start">
                  <div className="flex flex-col justify-start items-start">
                    <span className="text-left text-xl md:text-3xl font-semibold">
                      {course.courseName}
                    </span>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="underline text-left text-lg font-normal text-blue-600 hover:text-blue-800"
                    >
                      View Course Curriculum
                    </button>
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

                  <Link
                    href="https://play.google.com/store/apps/details?id=co.thanos.arsgp&hl=en_IN&pli=1"
                    className="absolute rounded-xl text-xl text-white hover:bg-blue-600 bg-[#3554bb] text-center p-2"
                    target="_blank"
                    rel="noopener noreferrer" // Adds security when using target="_blank"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Render the popup if a course is selected */}
      {selectedCourse && (
        <CoursePopup
          courseName={selectedCourse.courseName}
          courseDescription={selectedCourse.courseDescription}
          courseHighlights={selectedCourse.courseHighlights}
          courseSyllabus={selectedCourse.courseSyllabus}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default OurCourses;
