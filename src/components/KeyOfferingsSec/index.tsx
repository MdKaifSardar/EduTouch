import { KeyOfferingPosterImages } from "@/utility/KeyOfferings";
import Image from "next/image";
import React from "react";
import AboutHeading from "../AboutHeading";

const KeyOfferingsSec = () => {
  return (
    <div className="flex flex-col justify-center gap-[2rem] items-center w-full">
      <AboutHeading text="Key Offerings" />
      <div className="w-full h-fit flex flex-col md:flex-row justify-between items-center gap-[1rem]">
        {KeyOfferingPosterImages.map((image, index) => (
          <div
            className="w-full flex gap-3 flex-col justify-center items-center"
            key={index}
          >
            <Image
              src={image}
              alt="poster image"
              className="object-cover w-[60%] md:w-full h-auto"
            />
            <button className="p-2 border-[1px] border-black rounded-md text-black bg-white">
              Learn More
            </button>
          </div>
        ))}
      </div>
      <div className="mt-[2rem] md:text-2xl text-xl bg-transparent text-blue-400">
        <a href="/courses">View more Courses</a>
      </div>
    </div>
  );
};

export default KeyOfferingsSec;
