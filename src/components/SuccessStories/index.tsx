"use client";

import { useEffect } from "react";
import Image from "next/image";
import AboutHeading from "../AboutHeading";
import { Quotaion } from "@/utility/SuccessStories";
import { useFetchTestimonials } from "@/hooks/DisplayAllTest";

interface SuccessStoriesProps {
  limit?: number; // Optional limit prop
}

const SuccessStories = ({ limit = 4 }: SuccessStoriesProps) => {
  const { testimonials, fetchTestimonials, loading } = useFetchTestimonials();

  // Fetch testimonials when the component mounts
  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Apply the limit to testimonials if provided
  // const testimonialsToDisplay = testimonials.slice(0, limit);

  return (
    <div className="w-full flex flex-col justify-center gap-[2rem] items-center">
      <AboutHeading text="Success Stories" />

      {loading && (
        <div className="text-xl text-blue-500">Loading Testimonials...</div>
      )}

      {!loading && (
        <div className="grid gap-x-5 gap-y-[6rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-auto">
          {testimonials && testimonials.map(
            (stories, index) =>
              index < limit && (
                <div
                  key={index}
                  className="flex gap-[1rem] flex-col justify-center items-center"
                >
                  <div className="border-[4px] border-yellow-500 overflow-hidden rounded-full flex flex-col justify-center items-center w-fit h-fit">
                    <Image
                      alt={stories.studentName}
                      src={stories.image}
                      width={300}
                      height={300}
                      className="w-[7rem] h-[7rem] object-cover"
                    />
                  </div>
                  <div className="relative gap-[1.3rem] bg-[#d9d9d9] px-5 py-10 flex flex-col justify-center items-center rounded-md">
                    <Image
                      src={Quotaion}
                      alt="quotation"
                      className="absolute top-[-1.8rem] left-[0.9rem] w-[3rem] h-[3rem] text-center"
                    />
                    <div className="flex flex-col justify-center items-center gap-[.4rem]">
                      <span className="text-center text-xl font-sans font-semibold">
                        {stories.studentName}
                      </span>
                      <span className="text-center">{stories.testimonial}</span>
                    </div>
                    <div className="underline gap-[.3rem] flex flex-row justify-center items-center">
                      <span className="text-center">Rank: {stories.rank}</span>
                      <span>|</span>
                      <span className="text-center">{stories.examName}</span>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
