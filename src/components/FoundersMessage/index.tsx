import { founder, FoundersMessagePara } from "@/utility/FoundersMessage";
import Image from "next/image";
import React from "react";

const FoundersMessage = () => {
  return (
    <div className="w-full flex flex-col gap-[2rem] justify-center py-[5rem] items-center">
      <div className="bg-[#182c6f] py-4 px-6 rounded-full text-center  text-white text-4xl">
        Founder’s Message
      </div>
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
          <span className="text-lg font-sans text-center">{founder.status}</span>
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col justify-center items-center gap-[2rem] w-[100%] lg:w-[60%]">
          {FoundersMessagePara.map((para, index) => (
            <div key={index} className="leading-tight text-left font-sans text-lg">
              {para}
            </div>
          ))}
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
