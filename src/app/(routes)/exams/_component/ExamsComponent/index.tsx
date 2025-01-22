"use client";

import AboutHeading from "@/components/AboutHeading";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useFetchExams } from "@/hooks/DisplayAllExams";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ExamsComponent: React.FC = () => {
  const { exams, fetchExams, loading } = useFetchExams();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-[2rem]">
      <AboutHeading text="Upcoming Exams" />
      {loading ? (
        //message new
        <LoadingSpinner text="Loading Exams" />
      ) : exams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto w-[85%] md:w-[90%] h-fit gap-y-[2rem] gap-x-[2rem]">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="rounded-xl gap-[1rem] md:gap-[1rem] p-[1.5rem] flex flex-col justify-start items-start w-full h-full bg-[#D9D9D9FF]"
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
                <button
                  onClick={() => setShowPopup(true)}
                  className="hover:bg-[#ffba52] bg-[#FF9700] text-white p-[1rem] rounded-lg text-center font-semibold font-sans text-xl"
                >
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

export default ExamsComponent;
