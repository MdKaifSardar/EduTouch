import { Services } from "@/utility/SrvicesSec";
import Image from "next/image";
import React from "react";

const ServicesSec = () => {
  return (
    <div className="px-[.5rem] py-[5rem] md:py-[7rem] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-0 md:gap-2 w-full bg-gradient-to-tl to-[#1481ab] from-[#18244d]">
      {Services.map((service, index) => (
        <div
          key={index}
          className="h-full flex flex-row md:justify-center justify-start items-center p-3"
        >
          <Image
            alt={service.title}
            src={service.image}
            className="w-[3rem] h-[3rem]"
          />
          <div className="text-white font-sans font-semibold text-xl">
            {service.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesSec;
