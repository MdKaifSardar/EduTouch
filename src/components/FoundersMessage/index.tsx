import { founder, FoundersMessagePara } from "@/utility/FoundersMessage";
import Image from "next/image";
import React from "react";
import AnimateComponent from "../AnimateComponent";
import AnimateHorizontal from "../AnimateHorizontal";

const FoundersMessage = () => {
  return (
    <div className="w-full flex flex-col gap-[2rem] justify-center py-[5rem] items-center">
      <AnimateComponent duration={0.5} delay={0}>
        <div className="bg-[#182c6f] py-3 px-6 rounded-full text-center  text-white ml-auto mr-auto w-fit text-4xl">
          Founder’s Message
        </div>
      </AnimateComponent>
      <div className="gap-[1.4rem] w-[50%] md:w-[40%] h-full lg:hidden flex flex-col justify-center items-center">
        <Image
          className="w-full h-auto"
          alt={founder.name}
          src={founder.image}
        />
        <div className="flex flex-col justify-center items-center">
          <span className="text-xl font-sans font-semibold">
            {founder.name}
          </span>
          <span className="text-lg font-sans text-center">
            {founder.status}
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-row justify-between items-start">
        <div className="flex flex-col justify-center items-center gap-[2rem] w-[100%] lg:w-[60%]">
          <AnimateHorizontal direction="right" duration={0.5} delay={0}>
            {FoundersMessagePara.map((para, index) => (
              <div
                key={index}
                className="leading-tight text-left font-sans text-lg lg:text-xl"
              >
                {para}
              </div>
            ))}
          </AnimateHorizontal>
        </div>
        <div className="gap-[1.4rem] w-[30%] h-auto hidden lg:flex flex-col justify-center items-center">
          <Image
            className="w-full h-auto"
            alt={founder.name}
            src={founder.image}
          />
          <div className="flex flex-col justify-center items-center">
            <span className="text-xl font-sans font-semibold">
              {founder.name}
            </span>
            <span className="text-lg font-sans">{founder.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersMessage;
