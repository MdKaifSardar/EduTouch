import { Services } from "@/utility/SrvicesSec";
import Image from "next/image";
import React from "react";
import AnimateComponent from "../AnimateComponent";

const ServicesSec = () => {
  return (
    <AnimateComponent duration={0.8} delay={0}>
      <div className="relative px-[.5rem] py-[5rem] md:py-[7rem] w-full bg-gradient-to-tl to-[#1481ab] from-[#18244d]">
        <div className="relative grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[0.5rem]">
          {Services.map((service, index) => (
            <div
              key={index}
              className="h-full flex flex-col gap-0 sm:gap-[.5rem] sm:flex-row md:justify-center justify-center sm:justify-start items-center p-3 bg-transparent"
            >
              <Image
                alt={service.title}
                src={service.image}
                className="w-[3rem] h-[3rem]"
              />
              <div className="text-center text-white font-sans font-semibold text-xl">
                {service.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateComponent>
  );
};

export default ServicesSec;
