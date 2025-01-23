"use client";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Arrow icons
import { useFetchKeyOfferings } from "@/hooks/DisplayAllKeyOfferings";
import Image from "next/image";
import Link from "next/link";

// Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AboutHeading from "../AboutHeading";
import LoadingSpinner from "../LoadingSpinner";

// TypeScript interface for key offering
interface KeyOffering {
  _id: string;
  title: string;
  image: string;
}

const Carousel: React.FC = () => {
  const { keyOfferings, fetchKeyOfferings, loading } = useFetchKeyOfferings();

  const sliderRef = useRef<Slider | null>(null); // Create a reference for the Slider component

  useEffect(() => {
    fetchKeyOfferings();
  }, [fetchKeyOfferings]);

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

  // Handlers for the next and previous buttons
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext(); // Manually go to next slide
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); // Manually go to previous slide
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-[2rem] overflow-hidden">
      {/* Show loading state */}
      <AboutHeading text="Admission Open" />
      {loading && <LoadingSpinner text="Loading Key Offerings"/>}

      {/* Carousel */}
      {!loading && keyOfferings.length > 0 && (
        <div className="relative w-full h-fit">
          <Slider {...settings} ref={sliderRef}>
            {keyOfferings.map((offering: KeyOffering) => (
              <div key={offering._id} className="px-2">
                <div className="overflow-hidden flex flex-col justify-center items-center bg-white rounded-lg shadow-lg">
                  <Image
                    width={300}
                    height={200}
                    src={offering.image}
                    alt={offering.title}
                    className="w-full h-auto object-cover"
                  />
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl hover:bg-gray-200/50 border-[1px] w-fit border-black p-[1rem] block mt-4 text-center"
                    href="https://play.google.com/store/apps/details?id=co.thanos.arsgp&hl=en_IN&pli=1"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Prev and Next buttons */}
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
      )}
    </div>
  );
};

export default Carousel;
