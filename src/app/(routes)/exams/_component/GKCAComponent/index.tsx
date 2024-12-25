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
      <div className="flex flex-col justify-center items-center gap-[2rem] w-[90%] md:w-full h-fit">
        <AboutHeading text="General Knowledge" />
        {loading && <LoadingSpinner text="Loading Content" />}
        {loading ? null : gkcaAllList.length > 0 ? (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-[2rem] xl:gap-[4rem]">
            {gkcaAllList.map((item, index) => (
              <AnimateComponent
                key={item._id}
                duration={0.5}
                delay={index * 0.1}
              >
                <div className="flex w-full h-full flex-col justify-center items-center gap-[3rem] rounded-md">
                  {/* Image Display */}
                  <Image
                    width={300}
                    height={200}
                    src={item.gkImage}
                    alt={`General Knowledge ${index + 1}`}
                    className="w-full h-[30rem] object-cover rounded-xl"
                  />
                  {/* Download Button for GK PDF */}
                  <Link
                    href={`/api/gkca/ca-download?id=${item._id}`}
                    className="px-5 py-2 text-xl bg-blue-500 text-white rounded hover:bg-blue-600"
                    download="current-affairs.pdf"
                  >
                    Download
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
      <div className="flex flex-col justify-center items-center gap-[2rem] w-[90%] md:w-full h-fit">
        <AboutHeading text="Current Affairs" />
        {loading && <LoadingSpinner text="Loading Content" />}
        {loading ? null : gkcaAllList.length > 0 ? (
          <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-[2rem] xl:gap-[4rem]">
            {gkcaAllList.map((item, index) => (
              <AnimateComponent
                key={item._id}
                delay={index * 0.1}
                duration={0.5}
              >
                <div className="flex w-full h-full flex-col justify-center items-center gap-[3rem] rounded-md">
                  {/* Image Display for Current Affairs */}
                  <Image
                    width={300}
                    height={200}
                    src={item.caImage}
                    alt={`Current Affairs ${index + 1}`}
                    className="w-full h-[30rem] object-cover rounded-xl"
                  />
                  {/* Download Button for Current Affairs PDF */}
                  <Link
                    href={`/api/gkca/ca-download?id=${item._id}`}
                    className="px-5 py-2 text-xl bg-blue-500 text-white rounded hover:bg-blue-600"
                    download="current-affairs.pdf"
                  >
                    Download
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
