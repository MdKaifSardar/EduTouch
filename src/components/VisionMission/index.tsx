import { VisionMissionImage, VisionMissionText } from "@/utility/VisionMission";
import Image from "next/image";
import React from "react";
import AnimateHorizontal from "../AnimateHorizontal";

const VisionMission = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-[1rem] w-full">
      <AnimateHorizontal delay={0} duration={0.5} direction="left">
        <div className="uppercase block lg:hidden text-[2.5rem] sm:text-5xl font-semibold text-right w-full">
          Vision Mission
        </div>
      </AnimateHorizontal>
      <Image
        src={VisionMissionImage}
        alt="about image"
        className="w-[100%] lg:w-[40%] h-auto object-cover"
      />
      <div className="flex flex-col justify-center items-center lg:items-end gap-[1rem]">
        <AnimateHorizontal delay={0} duration={0.5} direction="left">
          <div className="uppercase font-semibold hidden lg:block text-[2.5rem] sm:text-5xl text-center lg:text-right w-full">
            Vision Mission
          </div>
        </AnimateHorizontal>
        <AnimateHorizontal duration={0.8} delay={0.3} direction="left">
          <div className="leading-tight text-center lg:text-right text-lg lg:text-xl flex flex-col justify-center items-end">
            {VisionMissionText}
          </div>
        </AnimateHorizontal>
      </div>
    </div>
  );
};

export default VisionMission;
