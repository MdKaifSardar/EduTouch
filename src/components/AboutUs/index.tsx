import { AboutImage, para } from "@/utility/AboutUs";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="mt-[10rem] lg:mt-[13rem] flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-[2rem] lg:gap-[4rem] w-full py-[2rem]">
      <div className="lg:hidden block text-5xl text-left w-full">About Us</div>
      <Image
        src={AboutImage}
        alt="about image"
        className="lg:hidden block w-full h-auto object-cover"
      />
      <div className="flex flex-col justify-center items-start gap-[1rem] w-full">
        <div className="lg:block hidden text-5xl text-left w-full">
          About Us
        </div>
        <div className="text-lg leading-tight flex flex-col justify-center items-start gap-[2rem]">
          {para.map((para, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-start"
            >
              {para}
            </div>
          ))}
        </div>
      </div>
      <Image
        src={AboutImage}
        alt="about image"
        className="lg:block hidden w-[40%] h-auto object-cover"
      />
    </div>
  );
};

export default AboutUs;
