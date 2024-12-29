import React from "react";
import { WhyChooseUsContent } from "@/utility/WhyChooseUs";
import Image from "next/image";

const WhyChooseUsComp = () => {
  return (
    <div className="gap-[2rem] flex flex-col justify-center items-center w-full h-fit">
      <div className="gap-[1rem] flex flex-col justify-center items-center">
        <div className="text-[2.5rem] sm:text-5xl text-left w-full font-bold">
          {WhyChooseUsContent.mainTitle}
        </div>
        <div className="text-xl">{WhyChooseUsContent.FirstText}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 grid-rows-auto gap-[1rem] w-full h-fit">
        {WhyChooseUsContent.WhyChooseUsTextArray.map((element, index) => (
          <div
            key={index}
            className="p-[1rem] w-full h-full flex flex-col justify-center items-start gap-[.3rem] "
          >
            <Image
              src={element.image}
              alt={element.title}
              className="object-contain w-[5rem] h-auto"
            />
            <div className="font-bold text-blue-400 text-xl md:text-2xl font-sans">
              {element.title}
            </div>
            <div className="text-lg lg:text-xl font-sans font-semibold">
              {element.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUsComp;
