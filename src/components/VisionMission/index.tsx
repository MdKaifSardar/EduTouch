import { VisionMissionImage, VisionMissionText } from "@/utility/VisionMission";
import Image from "next/image";
import React from "react";

const VisionMission = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-[2rem] lg:gap-[4rem] w-full py-[2rem]">
      <div className="block lg:hidden text-5xl text-right w-full">
        Vision Mission
      </div>
      <Image
        src={VisionMissionImage}
        alt="about image"
        className="w-[100%] lg:w-[40%] h-auto object-cover"
      />
      <div className="flex flex-col justify-center items-end gap-[1rem]">
        <div className="hidden lg:block text-5xl text-right w-full">
          Vision Mission
        </div>
        <div className="leading-tight text-right text-lg flex flex-col justify-center items-end gap-[2rem]">
          {VisionMissionText}
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
