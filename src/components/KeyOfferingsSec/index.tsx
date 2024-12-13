"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import React from "react";
import AboutHeading from "../AboutHeading";
import Link from "next/link";
import { useFetchKeyOfferings } from "@/hooks/DisplayAllKeyOfferings";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const KeyOfferingsSec = () => {
  const { keyOfferings, fetchKeyOfferings, loading } = useFetchKeyOfferings();

  useEffect(() => {
    fetchKeyOfferings();
  }, [fetchKeyOfferings]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselLength = keyOfferings.length;

  useEffect(() => {
    if (!loading) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          // Reset to the first element when we reach the end
          if (prevIndex === carouselLength - 3) {
            return 0;
          }
          return prevIndex + 1;
        });
      }, 3000); // Adjust the speed of auto-scroll as needed
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loading, carouselLength]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselLength) % carouselLength
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselLength);
  };

  // Clone the first and last elements for seamless transition
  const displayedKeyOfferings = [
    keyOfferings[keyOfferings.length - 1], // Clone the last element
    ...keyOfferings,
    // keyOfferings[0], // Clone the first element
  ];

  return (
    <div className="flex flex-col justify-center gap-[2rem] items-center w-full">
      <AboutHeading text="Key Offerings" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full h-fit flex flex-col justify-center items-center relative">
          <div className="flex overflow-hidden w-full gap-[1rem]">
            <div
              className="flex transition-transform duration-700"
              style={{
                transform: `translateX(-${(currentIndex + 1) * 33.33}%)`, // Adjust the index for seamless scrolling
              }}
            >
              {displayedKeyOfferings.map((offering, index) => (
                <div
                  key={index}
                  className="w-[33.33%] flex gap-3 flex-col justify-center items-center"
                  style={{ minWidth: "33.33%" }}
                >
                  <Image
                    src={offering.image}
                    alt="poster image"
                    className="object-cover w-full h-auto"
                    width={400}
                    height={300}
                  />
                  <Link
                    href="https://play.google.com/store/apps/details?id=co.thanos.arsgp&hl=en_IN&pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-[1px] border-black rounded-md text-black bg-white"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
      <div className="mt-[2rem] md:text-2xl text-xl bg-transparent text-blue-400">
        <a href="/courses">View more Courses</a>
      </div>
    </div>
  );
};

export default KeyOfferingsSec;
