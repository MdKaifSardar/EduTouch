"use client"; // Add this to make it a client-side component

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import AboutHeading from "../AboutHeading";
import { useFetchTeachers } from "@/hooks/DisplayAllTeachers";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingSpinner from "../LoadingSpinner";

const OurTeachers = () => {
  const { teachers, fetchTeachers, loading } = useFetchTeachers();
  const sliderRef = useRef<Slider | null>(null);

  // Fetch teachers when the component mounts
  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
    <div className="py-[1rem] w-full flex flex-col justify-center items-center gap-[1rem] overflow-hidden">
      <AboutHeading text="Our Teachers" />
      {loading && <LoadingSpinner text="Loading Teachers" />}
      {/* Display loading message */}
      {!loading && teachers.length === 0 && (
        <div>No teachers found.</div> // In case there are no teachers
      )}
      {!loading && teachers.length > 0 && (
        <div className="relative w-full">
          <Slider {...settings} ref={sliderRef} className="w-full">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="w-full relative flex flex-col justify-center items-center px-4"
              >
                {/* Center the images and set z-index */}
                <div className="flex justify-center items-center z-10">
                  <Image
                    width={300}
                    height={200}
                    src={teacher.image}
                    alt={teacher.teacherName}
                    className="h-[8rem] w-[8rem] object-cover rounded-full border-[5px] border-yellow-600 overflow-hidden"
                  />
                </div>
                <div className="pt-[4rem] pb-5 rounded-t-[2rem] bg-[#efeded] flex flex-col justify-center items-center w-full mt-[-2rem]">
                  <span className="text-lg font-sans font-semibold text-center">
                    {teacher.teacherName}
                  </span>
                  <span className="text-lg font-sans font-thin text-center">
                    {teacher.subject}
                  </span>
                </div>
              </div>
            ))}
          </Slider>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
            <button
              onClick={handlePrev}
              className="border-[1px] border-black bg-white text-black p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition"
            >
              <FaArrowLeft className="text-2xl" />
            </button>
            <button
              onClick={handleNext}
              className="border-[1px] border-black bg-white text-black p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition"
            >
              <FaArrowRight className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurTeachers;
