import AboutUs from "@/components/AboutUs";
import EnrollButtons from "@/components/EnrollButtons";
import FoundersMessage from "@/components/FoundersMessage";
import FutureAims from "@/components/FutureAims";
import Gallery from "@/components/Gallery";
import OurTeachers from "@/components/OurTeachers";
import SuccessStories from "@/components/SuccessStories";
import VisionMission from "@/components/VisionMission";
import React from "react";

const page = () => {
  return (
    <div className="mt-[6.5rem] sm:mt-[8rem] lg:mt-[10rem] gap-[2rem] md:gap-[3rem] w-[90%] md:w-[85%] h-fit flex flex-col justify-center items-center">
      <AboutUs />
      <VisionMission />
      <FoundersMessage />
      <FutureAims />
      <OurTeachers />
      <Gallery />
      <SuccessStories/>
      <EnrollButtons />
    </div>
  );
};

export default page;
