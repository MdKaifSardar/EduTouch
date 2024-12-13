import React from "react";
import ExamsComponent from "./_component/ExamsComponent";
import GKCAomponent from "./_component/GKCAComponent";

const page = () => {
  return (
    <div className="mb-[3rem] mt-[12rem] md:mt-[10rem] gap-[2rem] md:gap-[3rem] w-[95%] md:w-[85%] h-fit flex flex-col justify-center items-center">
      <ExamsComponent />
      <GKCAomponent />
    </div>
  );
};

export default page;
