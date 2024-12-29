import { AboutImage, para } from "@/utility/AboutUs";
import Image from "next/image";
import React from "react";
import AnimateHorizontal from "../AnimateHorizontal";

const AboutUs = () => {
  return (
    <div className="mt-[10rem] lg:mt-[13rem] flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-[2rem] lg:gap-[4rem] w-full py-[2rem]">
      <AnimateHorizontal delay={0} duration={0.5} direction="right">
        <div className="lg:hidden block text-[2.5rem] sm:text-5xl text-left w-full">
          About Us
        </div>
      </AnimateHorizontal>
      <Image
        src={AboutImage}
        alt="about image"
        className="lg:hidden block w-full h-auto object-cover"
      />
      <div className="flex flex-col justify-center items-start gap-[1rem] w-full">
        <AnimateHorizontal delay={0} duration={0.5} direction="right">
          <div className="lg:block hidden text-5xl text-left w-full">
            About Us
          </div>
        </AnimateHorizontal>
        <AnimateHorizontal duration={0.8} delay={0.3} direction="right">
          <div className="text-lg leading-tight flex flex-col justify-center items-start gap-[2rem]">
            {para.map((para, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-start text-lg lg:text-xl"
              >
                {para}
              </div>
            ))}
          </div>
        </AnimateHorizontal>
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
