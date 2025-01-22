"use client";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useFetchFeedback } from "@/hooks/DisplayAllFeedback";
import AboutHeading from "../AboutHeading";

// Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingSpinner from "../LoadingSpinner";

const StudentFeedback = () => {
  const { feedbackItems, fetchFeedbackItems, loading } = useFetchFeedback();
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay interval to 2 seconds
    responsive: [
      {
        breakpoint: 1024, // Medium (md) and larger screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Small (sm) screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center overflow-hidden gap-[2rem]">
      <AboutHeading text="Feedback From Our Students" />
      {loading ? (
        <LoadingSpinner text="Loading Feedbacks" />
      ) : feedbackItems.length > 0 ? (
        <div className="relative w-full">
          <Slider {...settings} ref={sliderRef}>
            {feedbackItems.map((feedback) => (
              <div key={feedback._id} className="px-2">
                <div className="w-full flex flex-col justify-center items-center bg-white border rounded-lg shadow-md">
                  <Image
                    src={feedback.imageNew}
                    alt={`Feedback Banner for ${feedback.name}`}
                    width={500}
                    height={300}
                    layout="intrinsic" // Ensure dimensions are correctly calculated
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4 w-full flex flex-col md:flex-row justify-center items-center gap-2">
                    <span className="font-semibold text-xl">
                      Name: {feedback.name}
                    </span>
                    {/* <span className="text-gray-600 text-xl">
                      Batch: {feedback.batch}
                    </span> */}
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <div className="absolute top-1/2 left-0 w-full flex flex-row items-center justify-between transform -translate-y-1/2">
            <button
              onClick={handlePrev}
              className="border-[1px] border-black bg-white text-black p-2 rounded-full"
            >
              <FaArrowLeft className="text-2xl" />
            </button>
            <button
              onClick={handleNext}
              className="border-[1px] border-black bg-white text-black p-2 rounded-full"
            >
              <FaArrowRight className="text-2xl" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl">No feedback available</div>
      )}
    </div>
  );
};

export default StudentFeedback;
