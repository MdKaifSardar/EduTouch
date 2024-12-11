import { leftStats, rightStats } from "@/utility/StatsSec";
import Image from "next/image";
import React from "react";

const StatsSec = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between items-center w-full gap-5 h-fit">
      <div className=" w-full gap-[1rem] md:gap-[3rem] flex flex-col justify-center items-start h-fit">
        <div className="flex flex-col justify-center items-start gap-2">
          <span className="text-5xl font-sans font-semibold">
            Empowering Dreams Ensuring Success
          </span>
          <span className="leading-tight text-lg font-sans ">
            Transforming ambitions into achievements with expert guidance,
            tailored support, and unwavering dedication. Empower your future,
            achieve unparalleled success today
          </span>
        </div>
        <button className="bg-[#ff9700] text-white px-5 rounded-lg py-2 text-2xl">
          Get Started
        </button>
      </div>
      <div className="w-full h-full flex flex-row justify-center items-center gap-[.5rem]">
        <div className="w-full h-full rounded-l-[2rem] gap-[.5rem] flex flex-col justify-center overflow-hidden items-center">
          {leftStats.map((stat, index) => (
            <div
              key={index}
              className="relative w-full py-[4rem] h-fit bg-[#f0f0f0] flex flex-col justify-center items-center"
            >
              <div className="absolute top-[1rem] left-[1rem] flex flex-col justify-center items-start text-left">
                <span>{stat.title}</span>
                <span>
                  {stat.count}{" "}
                  <span className="text-yellow-500 text-center font-semibold">
                    +
                  </span>
                </span>
              </div>
              <Image
                src={stat.icon}
                alt="Icon"
                width={300}
                height={300}
                className="absolute bottom-0 right-0 w-[3rem] h-[3rem] object-contain"
              />
            </div>
          ))}
        </div>
        <div className="w-full h-fit rounded-r-[2rem] overflow-hidden gap-[.5rem] flex flex-col justify-center items-center">
          {rightStats.map((stat, index) => (
            <div
              key={index}
              className="relative w-full py-[4rem] bg-[#f0f0f0] flex h-fit flex-col justify-center items-center"
            >
              <div className="absolute top-[1rem] left-[1rem] flex flex-col justify-center items-start text-left">
                <span>{stat.title}</span>
                <span>
                  {stat.count}{" "}
                  <span className="text-yellow-500 text-center font-semibold">
                    +
                  </span>
                </span>
              </div>
              <Image
                src={stat.icon}
                alt="Icon"
                width={300}
                height={300}
                className="absolute bottom-0 right-0 w-[3rem] h-[3rem] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSec;
