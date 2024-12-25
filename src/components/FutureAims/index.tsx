import {
  FutueAimsImage,
  FutueAimsPara,
  FutueAimsPoints,
} from "@/utility/FutureAims";
import Image from "next/image";
import React from "react";
import AboutHeading from "../AboutHeading";
import AnimateComponent from "../AnimateComponent";
import AnimateHorizontal from "../AnimateHorizontal";

const FutureAims = () => {
  return (
    <div className="w-full flex gap-[2rem] flex-col justify-center items-center">
      <AboutHeading text="Our Future Aims" />
      <div className="flex flex-col justify-center text-lg items-center gap-[1.3rem] ">
        <AnimateComponent duration={0.5} delay={0}>
          {FutueAimsPara.map((para, index) => (
            <div className="leading-tight text-center" key={index}>
              {para}
            </div>
          ))}
        </AnimateComponent>
      </div>
      <div className="flex flex-col lg:flex-row gap-[2rem] justify-between items-center">
        <Image
          src={FutueAimsImage}
          alt="image future"
          className="w-[100%] lg:w-[40%] h-auto object-cover"
        />
        <AnimateHorizontal delay={0} duration={0.5} direction="right">
          <div className="flex flex-col gap[.3rem] justify-center items-start">
            {FutueAimsPoints.map((points, index) => (
              <div
                key={index}
                className="leading-tight gap-[.5rem] flex flex-row justify-center items-center"
              >
                <span className="rounded-full w-[.5rem] h-[.5rem] bg-black" />
                <span className="text-left w-fit h-fit text-lg">{points}</span>
              </div>
            ))}
          </div>
        </AnimateHorizontal>
      </div>
    </div>
  );
};

export default FutureAims;
