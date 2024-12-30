import React from "react";
import { WhyChooseUsContent } from "@/utility/WhyChooseUs";
import Image from "next/image";
import AnimateComponent from "../AnimateComponent";

const WhyChooseUsComp = () => {
  return (
    <div className="gap-[1rem] flex flex-col justify-center items-center w-full h-fit">
      <div className="gap-[1rem] flex flex-col justify-center items-center">
        <AnimateComponent delay={0} duration={0.3}>
          <div className="text-[2.5rem] sm:text-5xl text-left w-full font-bold">
            {WhyChooseUsContent.mainTitle}
          </div>
        </AnimateComponent>
        <AnimateComponent delay={0.2} duration={0.3}>
          <div className="text-xl">{WhyChooseUsContent.FirstText}</div>
        </AnimateComponent>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-auto gap-[1rem] w-full h-fit">
        {WhyChooseUsContent.WhyChooseUsTextArray.map((element, index) => (
          <AnimateComponent key={index} delay={0.05*index} duration={0.3}>
            <div className="p-[1rem] w-full h-full flex flex-col justify-center items-start gap-[.3rem] ">
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
          </AnimateComponent>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUsComp;
