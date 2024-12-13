"use client";

import { useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AboutHeading from "../AboutHeading";
import { Quotaion } from "@/utility/SuccessStories";
import { useFetchTestimonials } from "@/hooks/DisplayAllTest";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SuccessStories = () => {
  const { testimonials, fetchTestimonials, loading } = useFetchTestimonials();
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Slick settings for responsive carousel
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

  // Handlers for custom navigation buttons
  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-[2rem]">
      <AboutHeading text="Success Stories" />

      {loading && <div className="text-xl">Loading Testimonials...</div>}

      {!loading && testimonials.length > 0 && (
        <div className="relative w-full">
          <Slider {...settings} ref={sliderRef}>
            {testimonials.map((stories, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center px-2"
              >
                {/* Center the image */}
                <div className="mb-[1rem] flex justify-center w-full">
                  <div className="border-[4px] border-yellow-500 overflow-hidden rounded-full w-fit h-fit">
                    <Image
                      alt={stories.studentName}
                      src={stories.image}
                      width={300}
                      height={300}
                      className="w-[7rem] h-[7rem] object-cover"
                    />
                  </div>
                </div>
                <div className="relative bg-[#d9d9d9] px-5 py-10 flex flex-col justify-center items-center gap-4 rounded-md">
                  <Image
                    src={Quotaion}
                    alt="quotation"
                    className="absolute top-[-1.8rem] left-[0.9rem] w-[3rem] h-[3rem]"
                  />
                  <div className="flex flex-col justify-center items-center gap-2">
                    <span className="text-center text-xl font-sans font-semibold">
                      {stories.studentName}
                    </span>
                    <span className="text-center">{stories.testimonial}</span>
                  </div>
                  <div className="underline flex justify-center items-center gap-2">
                    <span className="text-center">Rank: {stories.rank}</span>
                    <span>|</span>
                    <span className="text-center">{stories.examName}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Prev and Next buttons */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2">
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
      )}
    </div>
  );
};

export default SuccessStories;
