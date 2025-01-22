"use client";

import AboutHeading from "@/components/AboutHeading";
import AnimateComponent from "@/components/AnimateComponent";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useFetchGKCA } from "@/hooks/DisplayAllGkca";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const GKCAomponent: React.FC = () => {
  const { gkcaAllList, fetchGKCA, loading } = useFetchGKCA();

  useEffect(() => {
    fetchGKCA();
  }, [fetchGKCA]);

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center gap-[2rem]">
      {/* General Knowledge Section */}
      <div
        id="genk-id"
        className="flex flex-col justify-center items-center gap-[2rem] w-full md:w-full h-fit"
      >
        <AboutHeading text="General Knowledge" />
        {loading && <LoadingSpinner text="Loading Content" />}
        {loading ? null : gkcaAllList.length > 0 ? (
          <div className="place-items-center w-[85%] md:w-[70%] h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-[2rem] xl:gap-[2rem]">
            {gkcaAllList.map((item, index) => (
              <AnimateComponent
                key={item._id}
                duration={0.5}
                delay={index * 0.1}
              >
                <div className="flex w-full h-full flex-col justify-center items-center gap-[1rem] rounded-md">
                  {/* Image Display */}
                  <Image
                    width={300}
                    height={200}
                    src={item.gkImage}
                    alt={`General Knowledge ${index + 1}`}
                    className="w-full lg:w-full h-[25rem] object-cover rounded-xl"
                  />
                  {/* Title */}
                  <p className="text-xl text-center font-semibold">
                    {item.gkTitle}
                  </p>
                  {/* Link */}
                  <Link
                    href={item.gkLink}
                    className="text-xl text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </Link>
                </div>
              </AnimateComponent>
            ))}
          </div>
        ) : (
          <p>No General Knowledge PDFs available.</p>
        )}
      </div>

      {/* Current Affairs Section */}
      <div
        id="curra-id"
        className="flex flex-col justify-center items-center gap-[2rem] w-full md:w-full h-fit"
      >
        <AboutHeading text="Current Affairs" />
        {loading && <LoadingSpinner text="Loading Content" />}
        {loading ? null : gkcaAllList.length > 0 ? (
          <div className="place-items-center w-[85%] md:w-[70%] h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-[2rem] xl:gap-[2rem]">
            {gkcaAllList.map((item, index) => (
              <AnimateComponent
                key={item._id}
                delay={index * 0.1}
                duration={0.5}
              >
                <div className="flex w-full h-full flex-col justify-center items-center gap-[1rem] rounded-md">
                  {/* Image Display for Current Affairs */}
                  <Image
                    width={300}
                    height={200}
                    src={item.caImage}
                    alt={`Current Affairs ${index + 1}`}
                    className="w-full lg:w-full h-[25rem] object-cover rounded-xl"
                  />
                  {/* Title */}
                  <p className="text-xl text-center font-semibold">
                    {item.caTitle}
                  </p>
                  {/* Link */}
                  <Link
                    href={item.caLink}
                    className="text-xl text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </Link>
                </div>
              </AnimateComponent>
            ))}
          </div>
        ) : (
          <p>No Current Affairs PDFs available.</p>
        )}
      </div>
    </div>
  );
};

export default GKCAomponent;
