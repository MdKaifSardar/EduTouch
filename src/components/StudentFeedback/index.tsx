"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useFetchFeedback } from "@/hooks/DisplayAllFeedback";
import AboutHeading from "../AboutHeading";

const StudentFeedback = () => {
  const { feedbackItems, fetchFeedbackItems, loading } = useFetchFeedback();

  useEffect(() => {
    fetchFeedbackItems(); // Fetch feedback data when the component mounts
  }, [fetchFeedbackItems]);

  return (
    <div className="flex gap-[1rem] md:gap-[2rem] flex-col justify-center items-center w-full h-fit">
      <AboutHeading text="Feedback From Our Students" />
      {loading ? (
        <div>Loading feedback...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-[.5rem] md:gap-[3rem] w-full">
          {feedbackItems.length > 0 ? (
            feedbackItems.map((feedback) => (
              <div
                key={feedback._id}
                className="w-full h-full gap-[1rem] bg-white border flex flex-col shadow-md justify-center items-center rounded-lg"
              >
                <Image
                  src={feedback.imageNew}
                  alt={`Feedback Banner for ${feedback.name}`}
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover bg-red-400"
                />
                <div className="p-4 w-full flex md:flex-row flex-col justify-center items-center gap-[0rem] md:gap-[1rem]">
                  <span className="font-semibold text-xl">Name: {feedback.name}</span>
                  <span className="text-gray-600 text-xl">Batch: {feedback.batch}</span>
                </div>
              </div>
            ))
          ) : (
            <div>No feedback available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentFeedback;
