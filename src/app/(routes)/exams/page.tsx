import React from "react";
import ExamsComponent from "./_component/ExamsComponent";
// import GKCAComponent from "./_component/GKCAComponent";

const page = () => {
  return (
    <div className="mt-[6.5rem] sm:mt-[8rem] lg:mt-[10rem] gap-[2rem] md:gap-[3rem] w-[95%] md:w-[85%] h-fit flex flex-col justify-center items-center">
      <ExamsComponent />
      {/* <GKCAComponent /> */}
    </div>
  );
};

export default page;
