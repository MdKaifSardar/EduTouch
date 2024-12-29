import { VisionMissionImage, VisionMissionText } from "@/utility/VisionMission";
import Image from "next/image";
import React from "react";
import AnimateHorizontal from "../AnimateHorizontal";

const VisionMission = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-[2rem] lg:gap-[4rem] w-full py-[2rem]">
      <AnimateHorizontal delay={0} duration={0.5} direction="left">
        <div className="block lg:hidden text-[2.5rem] sm:text-5xl text-right w-full">
          Vision Mission
        </div>
      </AnimateHorizontal>
      <Image
        src={VisionMissionImage}
        alt="about image"
        className="w-[100%] lg:w-[40%] h-auto object-cover"
      />
      <div className="flex flex-col justify-center items-end gap-[1rem]">
        <AnimateHorizontal delay={0} duration={0.5} direction="left">
          <div className="hidden lg:block text-[2.5rem] sm:text-5xl text-right w-full">
            Vision Mission
          </div>
        </AnimateHorizontal>
        <AnimateHorizontal duration={0.8} delay={0.3} direction="left">
          <div className="leading-tight text-right text-lg lg:text-xl flex flex-col justify-center items-end gap-[2rem]">
            {VisionMissionText}
          </div>
        </AnimateHorizontal>
      </div>
    </div>
  );
};

export default VisionMission;
