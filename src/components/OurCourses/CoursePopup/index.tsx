"use client";

import Link from "next/link";
import React from "react";

interface CoursePopupProps {
  courseName: string;
  courseDescription: string;
  courseHighlights: string;
  courseSyllabus: string;
  onClose: () => void;
}

const CoursePopup: React.FC<CoursePopupProps> = ({
  courseName,
  courseDescription,
  courseHighlights,
  courseSyllabus,
  onClose,
}) => {
  const parseItems = (text: string): string[] =>
    text.split(",").map((item) => item.trim());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex w-full justify-center items-end z-50 lg:items-center">
      <div className="relative bg-gradient-to-b bg-opacity-100 from-[rgba(255,198,116,1)] via-[rgba(255,198,116,1)] to-white md:rounded-lg px-[1rem] md:px-[4rem] py-[1rem] md:py-[2rem] flex flex-col gap-2 h-auto w-full lg:w-[70%] 2xl:w-[50%] rounded-t-2xl overflow-y-auto">
        <button
          className="absolute top-[1rem] right-[1rem] z-[10] text-md font-bold flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <div className="flex flex-row justify-center items-center h-fit w-full">
          <h2 className="text-2xl text-center font-bold">{courseName}</h2>
        </div>
        <p className="text-sm text-center">{courseDescription}</p>
        <div className="w-full flex flex-row justify-between items-start">
          <div className="flex flex-col justify-center items-start md:leading-[1.4rem] leading-none">
            <h3 className="text-lg font-semibold mb-0 md:mb-1">Highlights</h3>
            <ul className="list-disc list-inside">
              {parseItems(courseHighlights).map(
                (highlight, index) =>
                  index < 4 && <li key={index}>{highlight}</li>
              )}
            </ul>
          </div>
          <div className="flex flex-col justify-center items-start md:leading-[1.4rem] leading-none">
            <h3 className="text-lg font-semibold mb-0 md:mb-1">Syllabus</h3>
            <ul className="list-disc list-inside">
              {parseItems(courseSyllabus).map(
                (syllabus, index) =>
                  index < 4 && <li key={index}>{syllabus}</li>
              )}
            </ul>
          </div>
        </div>
        <Link
          href="https://play.google.com/store/apps/details?id=co.thanos.arsgp&hl=en_IN"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 self-center px-12 py-3 text-md text-white bg-[rgba(255,151,0,1)] rounded-lg hover:bg-orange-600"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
};

export default CoursePopup;
